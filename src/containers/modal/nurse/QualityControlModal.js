import React from 'react';
import { doctorName } from 'src/store/utility';
// import Swal from 'sweetalert2';

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

const QualityControlModal = (props) => {
    const classes = useStyles();

    let defpatho = ''
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
                <CModalTitle className="font-weight-bold">Quality Control</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.nurseData}
                />

                <CCard className="mb-1">
                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                        <span className="font-weight-bold">Classification</span>
                    </CCardHeader>
                    {props.nurseData.classInfo.classType !== null
                        ? <CCardBody>
                            <CRow>
                                <CCol md="1" className="p-1">
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{props.nurseData.classInfo.classType.label}</CLabel>
                                </CCol>
                                <CCol md="9" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{props.nurseData.classInfo.classDesc}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol md="1" className="p-1">
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 ">Overall Findings: </CLabel>
                                </CCol>
                                <CCol md="9" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{props.nurseData.classInfo.overAllFindings}</CLabel>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol md="1" className="p-1">
                                </CCol>
                                <CCol md="2" className="p-1">
                                    <CLabel className="mb-0 ml-2 ">Physician: </CLabel>
                                </CCol>
                                <CCol md="9" className="p-1">
                                    <CLabel className="mb-0 ml-2 font-weight-bold">{defpatho !== undefined ? defpatho.label : ''}</CLabel>
                                </CCol>
                            </CRow>

                        </CCardBody>
                        : <CRow>
                            <CCol md="1" className="p-1">
                            </CCol>
                            <CCol md="9" className="p-1">
                                <CLabel className="mb-0 ml-2 font-weight-bold">Classification not yet available.</CLabel>
                            </CCol>
                        </CRow>
                    }
                </CCard>

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

                                    let xrremark
                                    if (itm.xray.remarks !== null) {
                                        let remarksvalue = null

                                        if (remarksOptionsMap.has(itm.xray.remarks) === true) {
                                            remarksvalue = {
                                                label: remarksOptionsMap.get(itm.xray.remarks)
                                            }
                                            xrremark = remarksvalue
                                        }
                                    }

                                    let xrtech
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

            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="warning"
                    onClick={() => props.onQualityControl(props.nurseData)}
                >Quality Control</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default QualityControlModal;