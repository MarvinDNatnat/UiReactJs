import React, { useState, useEffect } from 'react';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow, CCol,
    CCard,
    CCardHeader,
    CCardBody
} from '@coreui/react';

import {
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { doctorName } from 'src/store/utility';

import PatientInformation from 'src/containers/common/PatientInformation';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import UltrasoundEditInfo from 'src/containers/modal/Ultrasound/ultrasound_info/UltrasoundEditInfo'
import UltrasoundViewInfo from 'src/containers/modal/Ultrasound/ultrasound_info/UltrasoundViewInfo'

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const UltrasoundModal = (props) => {
    const classes = useStyles();

    const [doctorSelect, setDoctorSelect] = useState([])
    const [headerControl, setHeaderControl] = useState(true)

    const headerHandler = () => {
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




    const validateInputs = () => {
        props.saveClick();
    }
    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="xl"
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle>X-ray</CModalTitle>
            </CModalHeader>

            <CModalBody>
                <CRow>
                    <CCol md="7" className="pr-1">
                        <PatientInformation
                            propData={props.ultrasoundData}
                        />
                    </CCol>

                    <CCol md="5" className="pl-1">
                        <CCard>
                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                <span className="font-weight-bold">Request Name</span>
                            </CCardHeader>

                            <CCardBody>
                                <strong>
                                    {
                                        props.ultrasoundData.requestName !== undefined && props.ultrasoundData.requestName !== null
                                            ? props.ultrasoundData.requestName.toUpperCase()
                                            : ''
                                    }
                                </strong>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>


                {props.editViewFlag === true
                    ? 
                    <UltrasoundViewInfo
                        ultrasoundData={props.ultrasoundData}
                    /> 
                    : <UltrasoundEditInfo
                        ultrasoundData={props.ultrasoundData}
                        setUltrasoundData={props.setUltrasoundData}
                        doctorSelect={doctorSelect}
                    />
                }

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
                        onClick={() => props.onPrintUltrasound(props.ultrasoundData.txnId, props.ultrasoundData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                        Print Radiographic Report
                        </CButton>
                    : <CButton
                        className="border border-dark"
                        color="primary"
                        onClick={validateInputs}
                    >
                        Save
                        </CButton>
                }

                {/* {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="warning"
                        onClick={() => props.onQualityControl(props.ultrasoundData.txnId, props.ultrasoundData.id)}
                    >
                        <i className="mfe-2 fas fa-clipboard-check" />
                            Quality Control</CButton>
                    : null
                } */}

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

export default UltrasoundModal;