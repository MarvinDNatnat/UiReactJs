import React, { useState, useEffect } from 'react';
import { updateObject, doctorName } from 'src/store/utility';
import Swal from 'sweetalert2';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CLabel,
    CCard,
    CCardHeader,
    CCardBody,
    CRow, CCol
} from '@coreui/react';

import {
    FormControl,
    TextField
} from '@material-ui/core';

import ReactSelect from 'react-select';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


import PatientInformation from 'src/containers/common/PatientInformation';

import PhysicalExamViewInfo from 'src/containers/modal/physicalexam/pe_info/PhysicalExamViewInfo'

import displayClinicalMicroscopy from './display/displayCM'
import displayHematology from './display/displayHE'
import DisplayChemistry from './display/displayCH'
import displaySerology from './display/displaySE';
import displayToxicology from './display/displayTO'
import XrayViewInfo from '../imaging/xray_info/XrayViewInfo';
import DoctorCard from 'src/containers/common/DoctorCard';

const useStyles = makeStyles((theme) => ({
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
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const remarksOptionsMap = new Map([
    [true, 'For Recommendation'],
    [false, 'Normal'],
])

const ClassificationModal = (props) => {
    const classes = useStyles();

    const [doctorSelect, setDoctorSelect] = useState([])

    useEffect(() => {
        const docSelect = props.doctorList.map(doctor => ({
            value: doctor.doctorid,
            label: doctorName(doctor),
            license: doctor.licenseNumber
        }))
        setDoctorSelect(docSelect)

    }, [props.doctorList])

    const classOptions = [
        {
            value: 'A',
            label: 'CLASS A',
            classDesc: 'Fit to work.'
        },
        {
            value: 'B',
            label: 'CLASS B',
            classDesc: 'Physically fit but with minor condition curable within a short period of time, that will not adversely affect the workers efficiency.'
        },
        {
            value: 'C',
            label: 'CLASS C',
            classDesc: 'With abnormal findings generally not acceptable for employment.'
        },
        {
            value: 'D',
            label: 'CLASS D',
            classDesc: 'Unemployable'
        },
        {
            value: 'E',
            label: 'CLASS E',
            classDesc: 'Incomplete'
        },
        {
            value: 'F',
            label: 'CLASS F',
            classDesc: 'Pending with findings'
        },
        {
            value: 'P',
            label: 'PENDING',
            classDesc: 'These are cases that are equivocal as to the classification are being evaluated further.'
        },
    ]

    const handleClassChange = (opt, prop) => (event) => {
        if (event !== null) {
            const updateNurseData = updateObject(props.nurseData, {
                [opt]: updateObject(props.nurseData[opt], {
                    [prop]: event,
                    classDesc: event.classDesc
                })
            });

            props.setNurseData(updateNurseData);
        }
    }

    const handleChange = (opt, prop) => (event) => {
        const updateNurseData = updateObject(props.nurseData, {
            [opt]: updateObject(props.nurseData[opt], {
                [prop]: event.target.value,
            })
        });

        props.setNurseData(updateNurseData);
    };

    const handleSelectChange = (opt, prop) => (event) => {
        const updateNurseData = updateObject(props.nurseData, {
            [opt]: updateObject(props.nurseData[opt], {
                [prop]: event,
            })
        });

        props.setNurseData(updateNurseData);
    }

    const errorSwal = (errorTitle, errorMsg) => {
        return Swal.fire({
            title: errorTitle,
            icon: 'error',
            text: errorMsg
        })
    }

    const validateInputs = () => {
        let hasError = false;

        const classType = props.nurseData.classInfo.classType
        if (classType === null || classType === '') {
            errorSwal('Please select classification.', null)
            hasError = true
        }

        let classComplete = true
        props.nurseData.laboratoryRequest.forEach(labR => {
            if (labR.status < 2) {
                classComplete = false
            }
        })

        if (!hasError) {
            if (classType.value === 'P') {
                props.saveClick();
            } else if (classType.value !== 'P' && classComplete === false) {
                errorSwal('Please make sure that laboratory procedures are complete before saving.', null)
            } else {
                props.saveClick();
            }
        }
    }

    let defpatho = null
    const indDoct = props.nurseData.doctor
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='xl'
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle className="font-weight-bold">Classification</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.nurseData}
                />

                {   // PHYSICAL EXAM
                    [].concat(props.nurseData.laboratoryRequest)
                        .filter(i => i.itemLaboratory === 'PE')
                        // eslint-disable-next-line
                        .map((itm) => {
                            let display = null;
                            switch (itm.status) {
                                case 0:
                                    display = 'Not yet conducted.';
                                    break;

                                case 1:
                                    display = "Already conducted, please update patient's record.";
                                    break;

                                case 2:
                                case 3:
                                    display = <PhysicalExamViewInfo
                                        peData={itm.physicalExamination}
                                        fromNurse={true}
                                    />
                                    break;

                                default:
                                    break;
                            }

                            if (display !== null) {
                                return <CRow key={itm.id}>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                                <span className="font-weight-bold">PHYSICAL EXAMINATION</span>
                                            </CCardHeader>
                                            <CCardBody>
                                                {display}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                            } else return null;
                        })
                }

                {   // Hematology
                    [].concat(props.nurseData.laboratoryRequest)
                        .filter(i => i.itemDetails.itemLaboratoryProcedure === 'HE')
                        // eslint-disable-next-line
                        .map((itm) => {
                            let display = null;
                            switch (itm.status) {
                                case 0:
                                    display = 'No submitted specimen from the patient yet.';
                                    break;

                                case 1:
                                    display = "Already conducted, please update patient's record.";
                                    break;

                                case 2:
                                case 3:
                                    display = displayHematology(itm);
                                    break;

                                default:
                                    break;
                            }

                            if (display !== null) {
                                return <CRow key={itm.id}>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                                <span className="font-weight-bold">HEMATOLOGY: {itm.itemDetails.itemDescription}</span>
                                            </CCardHeader>
                                            <CCardBody>
                                                {display}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                            } else return null;
                        })
                }

                {   // Clinical Microscopy
                    [].concat(props.nurseData.laboratoryRequest)
                        .filter(i => i.itemDetails.itemLaboratoryProcedure === 'CM')
                        // eslint-disable-next-line
                        .map((itm) => {
                            let display = null;
                            switch (itm.status) {
                                case 0:
                                    display = 'No submitted specimen from the patient yet.';
                                    break;

                                case 1:
                                    display = "Already conducted, please update patient's record.";
                                    break;

                                case 2:
                                case 3:
                                    display = displayClinicalMicroscopy(itm);
                                    break;

                                default:
                                    break;
                            }

                            if (display !== null) {
                                return <CRow key={itm.id}>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                                <span className="font-weight-bold">CLINICAL MICROSCOPY: {itm.itemDetails.itemDescription}</span>
                                            </CCardHeader>
                                            <CCardBody>
                                                {display}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                            } else return null;
                        })
                }

                {   // Chemistry
                    [].concat(props.nurseData.laboratoryRequest)
                        .filter(i => i.itemDetails.itemLaboratoryProcedure === 'CH')
                        // eslint-disable-next-line
                        .map((itm) => {
                            let display = null;
                            switch (itm.status) {
                                case 0:
                                    display = 'No submitted specimen from the patient yet.';
                                    break;

                                case 1:
                                    display = "Already conducted, please update patient's record.";
                                    break;

                                case 2:
                                case 3:
                                    display = DisplayChemistry(itm);
                                    break;

                                default:
                                    break;
                            }

                            if (display !== null) {
                                return <CRow key={itm.id}>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                                <span className="font-weight-bold">CHEMISTRY: {itm.itemDetails.itemDescription}</span>
                                            </CCardHeader>
                                            <CCardBody>
                                                {display}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                            } else return null;
                        })
                }

                {   // Serology
                    [].concat(props.nurseData.laboratoryRequest)
                        .filter(i => i.itemDetails.itemLaboratoryProcedure === 'SE')
                        // eslint-disable-next-line
                        .map((itm) => {
                            let display = null;
                            switch (itm.status) {
                                case 0:
                                    display = 'No submitted specimen from the patient yet.';
                                    break;

                                case 1:
                                    display = "Already conducted, please update patient's record.";
                                    break;

                                case 2:
                                case 3:
                                    display = displaySerology(itm);
                                    break;

                                default:
                                    break;
                            }

                            if (display !== null) {
                                return <CRow key={itm.id}>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                                <span className="font-weight-bold">SEROLOGY: {itm.itemDetails.itemDescription}</span>
                                            </CCardHeader>
                                            <CCardBody>
                                                {display}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                            } else return null;
                        })
                }

                {   // Toxicology
                    [].concat(props.nurseData.laboratoryRequest)
                        .filter(i => i.itemDetails.itemLaboratoryProcedure === 'TO')
                        // eslint-disable-next-line
                        .map((itm) => {
                            let display = null;
                            switch (itm.status) {
                                case 0:
                                    display = 'No submitted specimen from the patient yet.';
                                    break;

                                case 1:
                                    display = "Already conducted, please update patient's record.";
                                    break;

                                case 2:
                                case 3:
                                    display = displayToxicology(itm);
                                    break;

                                default:
                                    break;
                            }

                            if (display !== null) {
                                return <CRow key={itm.id}>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                                <span className="font-weight-bold">TOXICOLOGY: {itm.itemDetails.itemDescription}</span>
                                            </CCardHeader>
                                            <CCardBody>
                                                {display}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                            } else return null;
                        })
                }

                {   // xray
                    [].concat(props.nurseData.laboratoryRequest)
                        .filter(i => i.itemLaboratory === 'XR')
                        // eslint-disable-next-line
                        .map((itm) => {
                            let display = null;
                            switch (itm.status) {
                                case 0:
                                    display = 'Not yet conducted.';
                                    break;

                                case 1:
                                    display = "Already conducted, please update patient's record.";
                                    break;

                                case 2:
                                case 3:
                                    let xrremark = null;
                                    if (itm.xray.remarks !== null) {
                                        let remarksvalue = null

                                        if (remarksOptionsMap.has(itm.xray.remarks) === true) {
                                            remarksvalue = {
                                                label: remarksOptionsMap.get(itm.xray.remarks)
                                            }
                                            xrremark = remarksvalue
                                        }
                                    }

                                    let xrtech = null;
                                    if (itm.xray.technician !== null) {
                                        xrtech = {
                                            label: itm.xray.username
                                        }
                                    }

                                    const xray = {
                                        xray: {
                                            findings: itm.xray.findings,
                                            impressions: itm.xray.impressions,
                                            radiologist: {
                                                label: doctorName(itm.xray.radiologist)
                                            },
                                            technician: xrtech,
                                            remarks: xrremark
                                        }
                                    }

                                    display = <XrayViewInfo xrayData={xray} />
                                    break;

                                default:
                                    break;
                            }

                            if (display !== null) {
                                return <CRow key={itm.id}>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                                <span className="font-weight-bold">RADIOLOGY REPORT: {itm.itemDetails.itemDescription}</span>
                                            </CCardHeader>
                                            <CCardBody>
                                                {display}
                                                {/* <pre>
                                                    {JSON.stringify(itm.xray, null, 2)}
                                                </pre> */}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                            } else return null;
                        })
                }

                <CCard className="mb-1">
                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                        <span className="font-weight-bold">Modify Classification</span>
                    </CCardHeader>
                    <CCardBody className="p-2">

                        <CRow>
                            <CCol md="3">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Classification</CLabel>
                                    <ReactSelect
                                        className="basic-single"
                                        placeholder="--"
                                        isLoading={false}
                                        value={props.nurseData.classInfo.classType}
                                        onChange={handleClassChange('classInfo', 'classType')}
                                        options={classOptions}
                                        menuPlacement='bottom'
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="8">
                                <CLabel className="mt-4">{props.nurseData.classInfo.classDesc}</CLabel>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol>
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                    <TextField
                                        name="overAllFindings"
                                        label="Overall Findings"
                                        value={props.nurseData.classInfo.overAllFindings}
                                        multiline
                                        rows={2}
                                        onChange={handleChange('classInfo', 'overAllFindings')}
                                        variant="outlined"
                                    />
                                </FormControl>
                            </CCol>

                            <CCol>
                                <DoctorCard
                                    editViewFlag={props.editViewFlag}
                                    doctorSelect={doctorSelect}
                                    doctorState={defpatho}
                                    handleSelectChange={handleSelectChange}
                                    doctorTitle={'Physician'}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>

            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={validateInputs}
                >Save</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default ClassificationModal;