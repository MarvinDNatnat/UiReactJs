import React from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const useStyles = makeStyles((theme) => ({
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
}));

const CRPView = (props) => {
    const classes = useStyles();

    let dilution = '-No Result-'
    let result = '-No Result-'

    if (props.seroData.crp.dilution !== '') dilution = props.seroData.crp.dilution + ' uIU/mL'
    if (props.seroData.crp.result !== '') result = props.seroData.crp.result + ' mg/L'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Dilution:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{dilution}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>0.4 - 5.0</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Result:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{result}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>{'< 6'}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default CRPView
