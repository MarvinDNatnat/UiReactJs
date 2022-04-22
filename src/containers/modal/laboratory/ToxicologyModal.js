import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react';
import Swal from 'sweetalert2';

import {
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { doctorName, labPersonName, updateObject } from 'src/store/utility';

import PatientInformation from 'src/containers/common/PatientInformation';

import ToxicologyEditInfo from './toxicology_info/ToxicologyEditInfo';
import ToxicologyViewInfo from './toxicology_info/ToxicologyViewInfo';
import { makeStyles } from '@material-ui/core/styles';
import DoctorCard from 'src/containers/common/DoctorCard';
import MedTechCard from 'src/containers/common/MedTechCard';
import QualityControlCard from 'src/containers/common/QualityControlCard';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const ToxicologyModal = (props) => {
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

        if (props.toxiData.toxicology.pathologist === null) {
            errorSwal('Error in Pathologist', 'Please select Doctor.')
            hasError = true
            return
        }

        if (!hasError) {
            props.saveClick();
        }
    }

    const handleSelectChange = (opt, prop) => (event) => {
        const updateToxiData = updateObject(props.toxiData, {
            [opt]: updateObject(props.toxiData[opt], {
                [prop]: event,
            })
        });

        props.setToxiData(updateToxiData);
    }

    let defpatho = null
    const indDoct = props.toxiData.toxicology
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    let medtech = '---'
    if (props.toxiData.labPerson !== null) {
        medtech = labPersonName(props.toxiData.labPerson, false)
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="xl"
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton >
                <CModalTitle className="font-weight-bold">Toxicology</CModalTitle>
            </CModalHeader>

            <CModalBody>

                <PatientInformation
                    propData={props.toxiData}
                />

                {props.editViewFlag === true
                    ? <ToxicologyViewInfo
                        toxiData={props.toxiData}
                    />
                    : <ToxicologyEditInfo
                        toxiData={props.toxiData}
                        setToxiData={props.setToxiData}
                        doctorSelect={doctorSelect}
                    />
                }

                <CRow className="m-0 p-0">
                    <CCol md="4" className="p-1">
                        <MedTechCard medtech={medtech} />
                    </CCol>
                    <CCol md="4" className="p-1">
                        <QualityControlCard qualityControl={props.toxiData.qualityControl} />
                    </CCol>
                    <CCol md="4" className="p-1">
                        <DoctorCard
                            editViewFlag={props.editViewFlag}
                            doctorSelect={doctorSelect}
                            doctorState={defpatho}
                            handleSelectChange={handleSelectChange}
                            doctorTitle={'Pathologist'}
                            docProp={'toxicology'}
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
                        onClick={() => props.onPrintToxicology(props.toxiData.txnId, props.toxiData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                            Print Clinical Microsopy Report</CButton>
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
                        onClick={() => props.onQualityControl(props.toxiData.txnId, props.toxiData.id)}
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

export default ToxicologyModal;