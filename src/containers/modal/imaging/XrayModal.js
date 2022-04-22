import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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

import XrayEditInfo from './xray_info/XrayEditInfo';
import XrayViewInfo from './xray_info/XrayViewInfo'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const XrayModal = (props) => {
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


    const errorSwal = (errorTitle, errorMsg) => {
        return Swal.fire({
            title: errorTitle,
            icon: 'error',
            text: errorMsg
        })
    }

    const validateInputs = () => {
        let hasError = false;

        if (props.xrayData.xray.findings === '' || props.xrayData.xray.findings === null) {
            errorSwal('Error in Findings', 'Please enter X-Ray findings.')
            hasError = true
        }

        if (props.xrayData.xray.impressions === '' || props.xrayData.xray.impressions === null) {
            errorSwal('Error in Impressions', 'Please enter X-Ray impressions.')
            hasError = true
        }

        if (props.xrayData.xray.radiologist === '' || props.xrayData.xray.radiologist === null) {
            errorSwal('Error in Radiologist', 'Please select Doctor.')
            hasError = true
        }

        if (props.xrayData.xray.remarks === '' || props.xrayData.xray.remarks === null) {
            errorSwal('Error saving information', 'Please select remarks.')
            hasError = true
        }

        if (!hasError) {
            props.saveClick();
        }
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
                            propData={props.xrayData}
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
                                        props.xrayData.requestName !== undefined && props.xrayData.requestName !== null
                                            ? props.xrayData.requestName.toUpperCase()
                                            : ''
                                    }
                                </strong>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>


                {props.editViewFlag === true
                    ? <XrayViewInfo
                        xrayData={props.xrayData}
                    />
                    : <XrayEditInfo
                        xrayData={props.xrayData}
                        setXrayData={props.setXrayData}
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
                        onClick={() => props.onPrintXray(props.xrayData.txnId, props.xrayData.id, 2, headerControl)}
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

                {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="warning"
                        onClick={() => props.onQualityControl(props.xrayData.txnId, props.xrayData.id)}
                    >
                        <i class="mfe-2 fas fa-clipboard-check" />
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

export default XrayModal;