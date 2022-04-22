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

const PPRBSView = (props) => {
    const classes = useStyles();

    let pprbsr = '-No Result-'
    let pprbsc = '-No Result-'

    if (props.chemData.pprbs.result !== '') pprbsr = props.chemData.pprbs.result + ' mmol/L'
    if (props.chemData.pprbs.conventional !== '') pprbsc = props.chemData.pprbs.conventional + ' mg/dl'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Result:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{pprbsr}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'< 7.7'}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Conventional:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{pprbsc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'< 140'}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default PPRBSView
