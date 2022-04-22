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

const UltrasoundViewInfo = (props) => {
    const classes = useStyles();

    // let xraytech = '---'
    // if (props.xrayData.labPerson !== null) {
    //     xraytech = labPersonName(props.xrayData.labPerson, false)
    // }
   
    
    return (
        <div>
            <CCard className="mb-1">
                <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                    <span className="font-weight-bold">Radiology Results</span>
                </CCardHeader>

                <CCardBody>
                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Findings:</CLabel>
                        </CCol>
                        <CCol md="10" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ultrasoundData.ultrasound.findings}</CLabel>
                        </CCol>
                    </CRow>

                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="2" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Impressions:</CLabel>
                        </CCol>
                        <CCol md="10" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.ultrasoundData.ultrasound.impressions}</CLabel>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            <CCard className="mb-1">
                <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                    <span className="font-weight-bold">Ultrasound Personnel</span>
                </CCardHeader>

                <CCardBody>
                    {/* <CRow className="ml-1 mr-1 p-0">
                        <CCol md="3" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Xray Technician:</CLabel>
                        </CCol>
                        <CCol md="8" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">
                                {xraytech}
                            </CLabel>
                        </CCol>
                    </CRow> */}

                    {/* <CRow className="ml-1 mr-1 p-0">
                        <CCol md="3" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Quality Control:</CLabel>
                        </CCol>
                        <CCol md="8" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">
                                -- qc name here --
                            </CLabel>
                        </CCol>
                    </CRow> */}

                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="3" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Radiologist:</CLabel>
                        </CCol>
                        <CCol md="8" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">
                                {props.ultrasoundData.ultrasound.radiologist.label}
                            </CLabel>
                        </CCol>
                    </CRow>

                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="3" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Remarks:</CLabel>
                        </CCol>
                        <CCol md="8" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">
                                {/* {props.xrayData.xray.remarks.label} */}
                            </CLabel>
                        </CCol>
                    </CRow>

                </CCardBody>
            </CCard>
        </div>
    )
}

export default UltrasoundViewInfo;