import React, { useState, useEffect } from 'react';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';

import {
    FormControlLabel,
    Switch,
} from '@material-ui/core';

import { doctorName } from 'src/store/utility';

import PatientInformation from '../../common/PatientInformation';
import PhysicalExamViewInfo from './pe_info/PhysicalExamViewInfo';
import PhysicalExamEditInfo from './pe_info/PhysicalExamEditInfo';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const PhysicalExamModal = (props) => {
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

        const vs = props.peData.vitalSign
        const pe = props.peData.physicalExam

        if (pe.remarks === '' || pe.remarks === null) {
            errorSwal('Error in Physical Exam', 'Please select remarks.')
            hasError = true
        }

        // if (vs.correctedOS === '') {
        //     errorSwal('Error in Vital Signs', 'Please enter corrected OS.')
        //     hasError = true
        // }

        // if (vs.correctedOD === '') {
        //     errorSwal('Error in Vital Signs', 'Please enter corrected OD.')
        //     hasError = true
        // }

        // if (vs.uncorrectedOS === '') {
        //     errorSwal('Error in Vital Signs', 'Please enter uncorrected OS.')
        //     hasError = true
        // }

        // if (vs.uncorrectedOD === '') {
        //     errorSwal('Error in Vital Signs', 'Please enter uncorrected OD.')
        //     hasError = true
        // }

        if (vs.respiratoryRate === '') {
            errorSwal('Error in Vital Signs', 'Please enter respiratory rate.')
            hasError = true
        }

        if (vs.pulseRate === '') {
            errorSwal('Error in Vital Signs', 'Please enter pulse rate.')
            hasError = true
        }

        if (vs.bloodPressure === '') {
            errorSwal('Error in Vital Signs', 'Please enter blood pressure.')
            hasError = true
        }

        if (vs.weight === '') {
            errorSwal('Error in Vital Signs', 'Please enter weight.')
            hasError = true
        }

        if (vs.height === 'NaN' || vs.height === '' || vs.height === '0.00') {
            errorSwal('Error in Vital Signs', 'Please enter height.')
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
                <CModalTitle className="font-weight-bold">Physical Examination</CModalTitle>
            </CModalHeader>

            <CModalBody>

                <PatientInformation
                    propData={props.peData}
                />

                {props.editViewFlag === true
                    ? <PhysicalExamViewInfo
                        peData={props.peData}
                    />
                    : <PhysicalExamEditInfo
                        peData={props.peData}
                        setPeData={props.setPeData}
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

                {props.editViewFlag === true && props.physicalExamInfo !== null
                    ? <CButton
                        className="border border-dark"
                        color="secondary"
                        onClick={() => props.onPrintPhysicalExam(props.peData.txnId, props.peData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                        Print Physical Examination Report
                        </CButton>
                    : <CButton
                        className="border border-dark"
                        color="primary"
                        onClick={validateInputs}
                    >
                        Save
                        </CButton>
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

export default PhysicalExamModal;