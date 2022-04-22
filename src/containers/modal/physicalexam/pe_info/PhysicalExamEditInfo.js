import React from 'react';
import ReactSelect from 'react-select';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { updateObject } from 'src/store/utility';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CRow, CCol,
    CInput
} from '@coreui/react';

import {
    Radio,
    FormControl,
    RadioGroup,
    FormControlLabel,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(0),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    rightAlign: {
        textAlign: 'right',
    },
    rowHeight: {
        height: '34px'
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    }
}));

function StyledRadio(props) {
    const classes = useStyles();
    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const PhysicalExamEditInfo = (props) => {
    const classes = useStyles();

    const medicalhistory = props.peData.medicalHistory
    const vitalsign = props.peData.vitalSign
    const physicalexam = props.peData.physicalExam

    const handleRadioChange = (opt, prop) => (event) => {
        let radiovalue = false
        if (event.target.value === "true") radiovalue = true

        const updatePeData = updateObject(props.peData, {
            [opt]: updateObject(props.peData[opt], {
                [prop]: radiovalue,
            })
        });

        props.setPeData(updatePeData);
    }

    const handleChange = (opt, prop) => (event) => {
        let cm = vitalsign.height
        let bmi = vitalsign.bmi

        if (prop === 'feet' || prop === 'inch') {
            let feet = vitalsign.feet
            let inch = vitalsign.inch
            let weight = vitalsign.weight

            if (feet === '') feet = 0
            if (inch === '') inch = 0
            if (weight === '') weight = 0

            if (prop === 'feet') {
                feet = event.target.value
            } else if (prop === 'inch') {
                inch = event.target.value
            }

            cm = computeFtToCm(feet, inch).toFixed(2)

            if (weight !== 0) {
                bmi = computeBMI(cm, weight);
            }
        }

        if (prop === 'weight') {
            let height = vitalsign.height
            let weight = event.target.value
            if (height !== '' && weight !== '') {
                bmi = computeBMI(height, weight);
            }
        }

        const updatePeData = updateObject(props.peData, {
            [opt]: updateObject(props.peData[opt], {
                [prop]: event.target.value,
                bmi: bmi,
                height: cm
            })
        });

        props.setPeData(updatePeData);
    };

    const handleSelectChange = (opt, prop) => (event) => {
        const updatePeData = updateObject(props.peData, {
            [opt]: updateObject(props.peData[opt], {
                [prop]: event,
            })
        });

        props.setPeData(updatePeData);
    }

    const computeBMI = (height, weight) => {
        return ((weight / Math.pow(height, 2)) * 10000).toFixed(1);
    }

    const remarksOptions = [
        { value: true, label: 'For Recommendation' },
        { value: false, label: 'Normal' }
    ]

    const computeFtToCm = (feet, inch) => {
        let ft = (feet * 12);
        let cm = (parseInt(ft) + parseInt(inch));
        return cm * 2.54
    }

    return (
        <div>
            <CRow>
                <CCol md="5" className="pr-1">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Medical History</span>
                        </CCardHeader>
                        <CCardBody>

                            <CRow>
                                <CCol md="7">
                                    <CLabel className="font-weight-bold ">Significant Past Illness</CLabel>
                                </CCol>
                                <CCol>
                                    <CLabel className="font-weight-bold ">YES / NO</CLabel>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Asthma / Cold</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'asthma')}
                                            value={medicalhistory.asthma}
                                            aria-label="Asthma"
                                            name="asthma"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Tuberculosis / Cough</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'tuberculosis')}
                                            value={medicalhistory.tuberculosis}
                                            aria-label="Tuberculosis"
                                            name="tuberculosis"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Diabetes Mellitus</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'diabetesMellitus')}
                                            value={medicalhistory.diabetesMellitus}
                                            aria-label="Diabetes Mellitus"
                                            name="diabetesMellitus"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>High Blood Pressure</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'highBloodPressure')}
                                            value={medicalhistory.highBloodPressure}
                                            aria-label="High Blood Pressure"
                                            name="highBloodPressure"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Heart Problem</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'heartProblem')}
                                            value={medicalhistory.heartProblem}
                                            aria-label="Heart Problem"
                                            name="heartProblem"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Kidney Problem</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'kidneyProblem')}
                                            value={medicalhistory.kidneyProblem}
                                            aria-label="Kidney Problem"
                                            name="kidneyProblem"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Abdominal Hernia / LBM</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'abdominalHernia')}
                                            value={medicalhistory.abdominalHernia}
                                            aria-label="Abdominal Hernia"
                                            name="abdominalHernia"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Joint Back Scoliosis</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'jointBackScoliosis')}
                                            value={medicalhistory.jointBackScoliosis}
                                            aria-label="Joint Back Scoliosis"
                                            name="jointBackScoliosis"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Psychiatric Problem</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'psychiatricProblem')}
                                            value={medicalhistory.psychiatricProblem}
                                            aria-label="Psychiatric Problem"
                                            name="psychiatricProblem"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Migraine Headache / Sore Throat</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'migraineHeadache')}
                                            value={medicalhistory.migraineHeadache}
                                            aria-label="Migraine Headache"
                                            name="migraineHeadache"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Fainting Seizures</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'faintingSeizures')}
                                            value={medicalhistory.faintingSeizures}
                                            aria-label="Fainting Seizures"
                                            name="faintingSeizures"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Allergies</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'allergies')}
                                            value={medicalhistory.allergies}
                                            aria-label="Allergies"
                                            name="allergies"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Cancer Tumor</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'cancerTumor')}
                                            value={medicalhistory.cancerTumor}
                                            aria-label="Cancer Tumor"
                                            name="cancerTumor"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Hepatitis</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'hepatitis')}
                                            value={medicalhistory.hepatitis}
                                            aria-label="Hepatitis"
                                            name="hepatitis"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>STD / PLHIV</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'stdplhiv')}
                                            value={medicalhistory.stdplhiv}
                                            aria-label="STD / PLHIV"
                                            name="stdplhiv"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Travel History</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('medicalHistory', 'travelhistory')}
                                            value={medicalhistory.travelhistory}
                                            aria-label="Travel History"
                                            name="travelhistory"
                                        >
                                            <div className="row">
                                                <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md="7" className="pl-1">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Vital Signs</span>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="m-0 p-0">
                                <CCol md="1" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2 ")}>feet</CLabel>
                                        <CInput
                                            value={vitalsign.feet}
                                            onChange={handleChange('vitalSign', 'feet')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="1" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>inch</CLabel>
                                        <CInput
                                            value={vitalsign.inch}
                                            onChange={handleChange('vitalSign', 'inch')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>(cm)</CLabel>
                                        <CLabel className="ml-2 mt-1 font-weight-bold">
                                            {vitalsign.height}
                                        </CLabel>
                                    </FormControl>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Weight (kg)</CLabel>
                                        <CInput
                                            value={vitalsign.weight}
                                            onChange={handleChange('vitalSign', 'weight')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>BMI (Normal 18.5 - 24.9)</CLabel>
                                        <CLabel className="ml-2 mt-1 font-weight-bold">
                                            {vitalsign.bmi}
                                        </CLabel>

                                    </FormControl>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Blood Pressure</CLabel>
                                        <CInput
                                            value={vitalsign.bloodPressure}
                                            onChange={handleChange('vitalSign', 'bloodPressure')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Pulse Rate</CLabel>
                                        <CInput
                                            value={vitalsign.pulseRate}
                                            onChange={handleChange('vitalSign', 'pulseRate')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Respiratory Rate</CLabel>
                                        <CInput
                                            value={vitalsign.respiratoryRate}
                                            onChange={handleChange('vitalSign', 'respiratoryRate')}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0 mt-2">
                                <CCol md="4" className="m-0 p-0">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>Visual Activity Uncorrected</CLabel>
                                </CCol>
                                <CCol md="1"></CCol>

                                <CCol md="4" className="m-0 p-0">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>Visual Activity Corrected</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="2" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OD</CLabel>
                                        <CInput
                                            value={vitalsign.uncorrectedOD}
                                            onChange={handleChange('vitalSign', 'uncorrectedOD')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> OS</CLabel>
                                        <CInput
                                            value={vitalsign.uncorrectedOS}
                                            onChange={handleChange('vitalSign', 'uncorrectedOS')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="1"></CCol>

                                <CCol md="2" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OD</CLabel>
                                        <CInput
                                            value={vitalsign.correctedOD}
                                            onChange={handleChange('vitalSign', 'correctedOD')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}> OS</CLabel>
                                        <CInput
                                            value={vitalsign.correctedOS}
                                            onChange={handleChange('vitalSign', 'correctedOS')}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Ishihara Test</CLabel>
                                        <CInput
                                            value={vitalsign.ishihara}
                                            onChange={handleChange('vitalSign', 'ishihara')}
                                        />
                                    </FormControl>
                                </CCol>

                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Hearing</CLabel>
                                        <CInput
                                            value={vitalsign.hearing}
                                            onChange={handleChange('vitalSign', 'hearing')}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Hospitalization</CLabel>
                                        <CInput
                                            value={vitalsign.hospitalization}
                                            onChange={handleChange('vitalSign', 'hospitalization')}
                                        />
                                    </FormControl>
                                </CCol>

                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Operations</CLabel>
                                        <CInput
                                            value={vitalsign.opearations}
                                            onChange={handleChange('vitalSign', 'opearations')}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Medications</CLabel>
                                        <CInput
                                            value={vitalsign.medications}
                                            onChange={handleChange('vitalSign', 'medications')}
                                        />
                                    </FormControl>
                                </CCol>

                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Smoker</CLabel>
                                        <CInput
                                            value={vitalsign.smoker}
                                            onChange={handleChange('vitalSign', 'smoker')}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Are you pregnant?</CLabel>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            onChange={handleRadioChange('vitalSign', 'pregnant')}
                                            value={vitalsign.pregnant}
                                            aria-label="Pregnant"
                                            name="pregnant"
                                        >
                                            <div className="row pl-5">
                                                <div className="col p-0">
                                                    <FormControlLabel value={true} control={<StyledRadio />} />
                                                </div>
                                                <div className="col p-0 pr-5">
                                                    <CLabel>Yes</CLabel>
                                                </div>
                                                <div className="col p-0">
                                                    <FormControlLabel value={false} control={<StyledRadio />} />
                                                </div>
                                                <div className="col p-0">
                                                    <CLabel>No</CLabel>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </CCol>

                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Last Menstrual Period</CLabel>
                                        <CInput
                                            value={vitalsign.lastMenstrual}
                                            onChange={handleChange('vitalSign', 'lastMenstrual')}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Alcoholic</CLabel>
                                        <CInput
                                            value={vitalsign.alcoholic}
                                            onChange={handleChange('vitalSign', 'alcoholic')}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Notes/Temp/Loss of Smell/Taste:</CLabel>
                                        <CInput
                                            value={vitalsign.notes}
                                            onChange={handleChange('vitalSign', 'notes')}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Physical Exam</span>
                        </CCardHeader>
                        <CCardBody>

                            <CRow>
                                <CCol md="5">
                                    <CRow>
                                        <CCol md="6">
                                            <CLabel className="font-weight-bold ">Area (Normal)</CLabel>
                                        </CCol>
                                        <CCol>
                                            <CLabel className="font-weight-bold ">YES / NO</CLabel>
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                    <CCol md="6" className="pl-4">
                                            <CLabel>Abdomen</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    onChange={handleRadioChange('physicalExam', 'abdomen')}
                                                    value={physicalexam.abdomen}
                                                    aria-label="Abdomen"
                                                    name="abdomen"
                                                >
                                                    <div className="row">
                                                        <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                        <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </CCol>
                                        
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Head and Neck</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    onChange={handleRadioChange('physicalExam', 'headNeck')}
                                                    value={physicalexam.headNeck}
                                                    aria-label="Head and Neck"
                                                    name="headNeck"
                                                >
                                                    <div className="row">
                                                        <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                        <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Chest / Breast / Lungs</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    onChange={handleRadioChange('physicalExam', 'chestBreastLungs')}
                                                    value={physicalexam.chestBreastLungs}
                                                    aria-label="Chest / Breast / Lungs"
                                                    name="chestBreastLungs"
                                                >
                                                    <div className="row">
                                                        <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                        <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Cardiac / Heart</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    onChange={handleRadioChange('physicalExam', 'cardiacHeart')}
                                                    value={physicalexam.cardiacHeart}
                                                    aria-label="Cardiac / Heart"
                                                    name="cardiacHeart"
                                                >
                                                    <div className="row">
                                                        <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                        <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                    <CCol md="6" className="pl-4">
                                            <CLabel>Skin / Tattoo / Covid Rashes</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    onChange={handleRadioChange('physicalExam', 'skin')}
                                                    value={physicalexam.skin}
                                                    aria-label="Skin"
                                                    name="skin"
                                                >
                                                    <div className="row">
                                                        <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                        <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </CCol> 
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Extremities / Disc of fingers </CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    onChange={handleRadioChange('physicalExam', 'extremities')}
                                                    value={physicalexam.extremities}
                                                    aria-label="Extremities"
                                                    name="extremities"
                                                >
                                                    <div className="row">
                                                        <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                        <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Fatigue / Aches / Pains </CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    onChange={handleRadioChange('physicalExam', 'fatigueachespains')}
                                                    value={physicalexam.fatigueachespains}
                                                    aria-label="fatigueachespains"
                                                    name="fatigueachespains"
                                                >
                                                    <div className="row">
                                                        <FormControlLabel className="col p-0" value={true} control={<StyledRadio />} />
                                                        <FormControlLabel className="col p-0" value={false} control={<StyledRadio />} />
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </CCol>
                                    </CRow>
                                    
                                </CCol>

                                <CCol md="7">
                                    <CRow className="m-0 p-0">
                                        <CCol className="p-1">
                                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Findings:</CLabel>
                                                <CInput
                                                    value={physicalexam.findings}
                                                    onChange={handleChange('physicalExam', 'findings')}
                                                />
                                            </FormControl>
                                        </CCol>
                                    </CRow>

                                    <CRow className="m-0 p-0">
                                        <CCol className="p-1">
                                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Notes:</CLabel>
                                                <CInput
                                                    value={physicalexam.notes}
                                                    onChange={handleChange('physicalExam', 'notes')}
                                                />
                                            </FormControl>
                                        </CCol>
                                    </CRow>

                                    <CRow className="m-0 p-0">
                                        <CCol className="p-1">
                                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Doctor</CLabel>
                                                <ReactSelect
                                                    className="basic-single"
                                                    placeholder="--"
                                                    value={physicalexam.doctor}
                                                    onChange={handleSelectChange('physicalExam', 'doctor')}
                                                    isClearable={true}
                                                    isSearchable={false}
                                                    isLoading={false}
                                                    options={props.doctorSelect}
                                                    menuPlacement="bottom"
                                                />
                                            </FormControl>
                                        </CCol>
                                    </CRow>

                                    <CRow className="m-0 p-0">
                                        <CCol className="p-1">
                                            <FormControl className={clsx(classes.margin, "col-4  m-0 p-0")} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Remarks</CLabel>
                                                <ReactSelect
                                                    className="basic-single"
                                                    placeholder="--"
                                                    value={physicalexam.remarks}
                                                    onChange={handleSelectChange('physicalExam', 'remarks')}
                                                    isClearable={true}
                                                    isSearchable={false}
                                                    isLoading={false}
                                                    options={remarksOptions}
                                                />
                                            </FormControl>
                                        </CCol>
                                    </CRow>
                                </CCol>

                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default PhysicalExamEditInfo;