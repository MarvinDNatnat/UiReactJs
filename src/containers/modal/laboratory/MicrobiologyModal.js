import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCard,
    CCardHeader,
    CRow,
    CContainer,
} from '@coreui/react';
import Swal from 'sweetalert2';
import clsx from 'clsx';

import {
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { doctorName, updateObject } from 'src/store/utility';

import PatientInformation from 'src/containers/common/PatientInformation';

import { makeStyles } from '@material-ui/core/styles';
import DoctorCard from 'src/containers/common/DoctorCard';

import GSInput from './mb_info/input/GSInput';
const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));


const MicrobiologyModal = (props) => {
    const classes = useStyles();

    const [doctorSelect, setDoctorSelect] = useState([])
    const [headerControl, setHeaderControl] = useState(true)

    const [gsInfo, setGsInfo] = useState(null);

    const headerHandler = () => {
        setGsInfo(null);
        setHeaderControl(!headerControl)
    }



    useEffect(() => {


        const docSelect = props.doctorList.map(doctor => ({
            value: doctor.doctorid,
            label: doctorName(doctor),
            license: doctor.licenseNumber
        }))
        setDoctorSelect(docSelect)

    }, [props.doctorList])

    const handleChange = (opt, prop) => (event) => {
        const updateMicrobiologyData = updateObject(props.microbiologyData, {
            [opt]: updateObject(props.microbiologyData[opt], {
                [prop]: event.target.value,
            })
        });
        props.setMicrobiologyData(updateMicrobiologyData);
    };

    useEffect(() => {
        const serviceRequest = props.microbiologyData.serviceRequest;

        if (serviceRequest.length > 0) {
            serviceRequest.map((srv) => {
                switch (srv.laboratoryRequest) {
                    case 'GS':
                        const gsCard = (
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Gram Stain</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? null // <CBCView hemaData={props.hemaData} />
                                            : <GSInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                microbiologyData={props.microbiologyData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                        );
                        setGsInfo(gsCard);
                        break;
                        default:
                            break;
                }
                return null
            })
        }
    }, [props.microbiologyData])

   

    const errorSwal = (errorTitle, errorMsg) => {
        return Swal.fire({
            title: errorTitle,
            icon: 'error',
            text: errorMsg
        })
    }

    const validateInputs = () => {
        let hasError = false;

        if (props.microbiologyData.microbiology.pathologist === null) {
            errorSwal('Error in Pathologist', 'Please select Doctor.')
            hasError = true
            return
        }

        if (!hasError) {
            props.saveClick();
        }
    }

    const handleSelectChange = (opt, prop) => (event) => {
        const updateMicrobiologyData = updateObject(props.microbiologyData, {
            [opt]: updateObject(props.microbiologyData[opt], {
                [prop]: event,
            })
        });

        props.setMicrobiologyData(updateMicrobiologyData);
    }

    let defpatho = null
    const indDoct = props.microbiologyData.microbiology
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    // let medtech = '---'
    // if (props.toxiData.labPerson !== null) {
    //     medtech = labPersonName(props.toxiData.labPerson, false)
    // }


    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="xl"
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton >
                <CModalTitle className="font-weight-bold">Microbiology</CModalTitle>
            </CModalHeader>

            <CModalBody>

                <PatientInformation
                    propData={props.microbiologyData}
                />

                <CContainer>
                    <CRow>
                        {gsInfo}
                    </CRow>
                </CContainer>
                {/* {props.editViewFlag === true
                    ? <ToxicologyViewInfo
                        toxiData={props.toxiData}
                    />
                    : <ToxicologyEditInfo
                        toxiData={props.toxiData}
                        setToxiData={props.setToxiData}
                        doctorSelect={doctorSelect}
                    />
                } */}

                <CRow className="m-0 p-0">
                    <CCol md="4" className="p-1">
                        {/* <MedTechCard medtech={medtech} /> */}
                    </CCol>
                    <CCol md="4" className="p-1">
                        {/* <QualityControlCard qualityControl={props.toxiData.qualityControl} /> */}
                    </CCol>
                    <CCol md="4" className="p-1">
                        <DoctorCard
                            editViewFlag={props.editViewFlag}
                            doctorSelect={doctorSelect}
                            doctorState={defpatho}
                            handleSelectChange={handleSelectChange}
                            doctorTitle={'Pathologist'}
                            docProp={'microbiology'}
                        />
                    </CCol>
                </CRow>

            </CModalBody>
            <CModalFooter>
                {props.editViewFlag === true
                    ? <FormControlLabel
                        control={
                            <Switch
                                checked={headerControl}
                                onChange={headerHandler}
                                color="primary"
                            />
                        }
                        label="Print with Header"
                    />
                    : null}

                {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="secondary"
                    // onClick={() => props.onPrintToxicology(props.toxiData.txnId, props.toxiData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                        Print Microbiology Report</CButton>
                    : <CButton
                        className="border border-dark"
                        color="primary"
                    onClick={validateInputs}
                    >Save</CButton>
                }

                {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="warning"
                    onClick={() => props.onQualityControl(props.microbiologyData.txnId, props.microbiologyData.id)}
                    >
                        <i className="mfe-2 fas fa-clipboard-check" />
                        Quality Control</CButton>
                    : null
                }

                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default MicrobiologyModal;