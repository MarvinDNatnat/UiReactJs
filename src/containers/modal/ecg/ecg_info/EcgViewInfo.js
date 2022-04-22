import React from 'react';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CRow, CCol
} from '@coreui/react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const EcgViewInfo = (props) => {
    const classes = useStyles();
    return (
        <div>
            <CCard className="mb-1">
                <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                    <span className="font-weight-bold">Electrocardiograph Results</span>
                </CCardHeader>

                <CCardBody>
                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Rhythm:</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ecgData.ecg.rhythm}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">PR Interval:</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ecgData.ecg.pr_interval}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Rate Atrial:</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ecgData.ecg.rate_atrial}</CLabel>
                        </CCol>
                    </CRow>

                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Axis:</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ecgData.ecg.axis}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">P-Wave:</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ecgData.ecg.p_wave}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Ventricular:</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ecgData.ecg.ventricular}</CLabel>
                        </CCol>
                    </CRow>

                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">INTERPRETATION:</CLabel>
                        </CCol>
                        <CCol md="10" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ecgData.ecg.interpretation}</CLabel>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default EcgViewInfo;