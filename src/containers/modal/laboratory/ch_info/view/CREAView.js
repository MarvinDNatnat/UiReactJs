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

const CREAView = (props) => {
    const classes = useStyles();

    let crear = '-No Result-'
    let creac = '-No Result-'

    if (props.chemData.crea.result !== '') crear = props.chemData.crea.result + ' umol/L'
    if (props.chemData.crea.conventional !== '') creac = props.chemData.crea.conventional + ' mg/dl'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Result:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{crear}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>
                        {'M: 71 - 115'} <br />
                        {'F: 53 - 106'}
                    </CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Conventional:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{creac}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>
                        {'M: 0.80 - 1.30'} <br />
                        {'F: 0.60 - 1.20'}
                    </CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default CREAView
