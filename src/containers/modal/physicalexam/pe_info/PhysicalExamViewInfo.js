import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CRow, CCol,
} from '@coreui/react';


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
    },
}));

const remarksOptionsMap = new Map([
    [true, 'For Recommendation'],
    [false, 'Normal'],
])

const PhysicalExamViewInfo = (props) => {
    const classes = useStyles();

    const medicalhistory = props.peData.medicalHistory
    const vitalsign = props.peData.vitalSign
    const physicalexam = props.peData.physicalExam

    let doctorName = physicalexam.doctor.label
    let remarks = physicalexam.remarks.label
    if (props.fromNurse === true) {
        doctorName = physicalexam.doctor.firstname + " " + (!physicalexam.doctor.middlename ? "" : physicalexam.doctor.middlename.charAt(0) + ". ") + physicalexam.doctor.lastname + ", " + physicalexam.doctor.suffix + " - " + physicalexam.doctor.licenseNumber

        remarks = remarksOptionsMap.get(physicalexam.remarks)
    }

    const ynHandler = (value) => {
        let ynvalue = (
            <CLabel className="font-weight-bold ">NO</CLabel>
        )

        if (value === true) {
            ynvalue = (
                <CLabel className="font-weight-bold ">YES</CLabel>
            )
        }

        return ynvalue
    }

    return (
        <div>
            <CRow>
                <CCol md="5" className="pr-1">
                    <CCard>
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
                                    <CLabel>Asthma</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.asthma)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Tuberculosis</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.tuberculosis)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Diabetes Mellitus</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.diabetesMellitus)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>High Blood Pressure</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.highBloodPressure)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Heart Problem</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.heartProblem)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Kidney Problem</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.kidneyProblem)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Abdominal Hernia</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.abdominalHernia)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Joint Back Scoliosis</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.jointBackScoliosis)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Psychiatric Problem</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.psychiatricProblem)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Migraine Headache</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.migraineHeadache)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Fainting Seizures</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.faintingSeizures)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Allergies</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.allergies)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Cancer Tumor</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.cancerTumor)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>Hepatitis</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.hepatitis)}
                                </CCol>
                            </CRow>
                            <CRow className={classes.rowHeight}>
                                <CCol md="7" className="pl-4">
                                    <CLabel>STD / PLHIV</CLabel>
                                </CCol>
                                <CCol className="ml-4">
                                    {ynHandler(medicalhistory.stdplhiv)}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md="7" className="pl-1">
                    <CCard>
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Vital Signs</span>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="m-0 p-0">
                                <CCol md="1" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Height</CLabel>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.feet}ft {vitalsign.inch}in / {vitalsign.height} cm</CLabel>
                                </CCol>

                                <CCol md="1" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Weight</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.weight} kg</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="1" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>BMI</CLabel>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.bmi} - {vitalsign.bmiCategory}</CLabel>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Blood Pressure</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.bloodPressure}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Pulse Rate</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.pulseRate}</CLabel>
                                </CCol>

                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Respiratory Rate</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.respiratoryRate}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0  p-0 border-top ">
                                <CCol md="5" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Visual Activity Uncorrected</CLabel>
                                </CCol>

                                <CCol md="1"></CCol>

                                <CCol md="5" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Visual Activity Corrected</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 border-bottom">
                                <CCol md="1" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OD</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.uncorrectedOD}</CLabel>
                                </CCol>

                                <CCol md="1" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OS</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.uncorrectedOS}</CLabel>
                                </CCol>

                                <CCol md="1" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OD</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.correctedOD}</CLabel>
                                </CCol>

                                <CCol md="1" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OS</CLabel>
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{vitalsign.correctedOS}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Ishihara Test:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.ishihara}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Hearing:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.hearing}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Hospitalization:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.hospitalization}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Operations:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.opearations}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Medications:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.medications}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Smoker:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.smoker}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Alcoholic:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.alcoholic}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Are you pregnant?</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    {ynHandler(vitalsign.pregnant)}
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Last Menstruation:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.lastMenstrual}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-1">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Notes:</CLabel>
                                </CCol>
                                <CCol className="p-1">
                                    <CLabel className="font-weight-bold ">{vitalsign.notes}</CLabel>
                                </CCol>
                            </CRow>

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <CCard>
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
                                            <CLabel>Skin / Tattoo</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            {ynHandler(physicalexam.skin)}
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Head and Neck</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            {ynHandler(physicalexam.headNeck)}
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Chest / Breast / Lungs</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            {ynHandler(physicalexam.chestBreastLungs)}
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Cardiac / Heart</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            {ynHandler(physicalexam.cardiacHeart)}
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Abdomen</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            {ynHandler(physicalexam.abdomen)}
                                        </CCol>
                                    </CRow>

                                    <CRow className={classes.rowHeight}>
                                        <CCol md="6" className="pl-4">
                                            <CLabel>Extremities</CLabel>
                                        </CCol>
                                        <CCol className="ml-4">
                                            {ynHandler(physicalexam.extremities)}
                                        </CCol>
                                    </CRow>
                                </CCol>

                                <CCol md="7">
                                    <CRow className="m-0 p-0">
                                        <CCol md="2" className="p-1">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Findings:</CLabel>
                                        </CCol>
                                        <CCol className="p-1">
                                            <CLabel className="font-weight-bold ">{physicalexam.findings}</CLabel>
                                        </CCol>
                                    </CRow>

                                    <CRow className="m-0 p-0">
                                        <CCol md="2" className="p-1">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Notes:</CLabel>
                                        </CCol>
                                        <CCol className="p-1">
                                            <CLabel className="font-weight-bold ">{physicalexam.notes}</CLabel>
                                        </CCol>
                                    </CRow>

                                    <CRow className="m-0 p-0">
                                        <CCol md="2" className="p-1">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Doctor:</CLabel>
                                        </CCol>
                                        <CCol className="p-1">
                                            <CLabel className="font-weight-bold ">{doctorName}</CLabel>
                                        </CCol>
                                    </CRow>

                                    <CRow className="m-0 p-0">
                                        <CCol md="2" className="p-1">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Remarks:</CLabel>
                                        </CCol>
                                        <CCol className="p-1">
                                            <CLabel className="font-weight-bold ">{remarks}</CLabel>
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

export default PhysicalExamViewInfo;