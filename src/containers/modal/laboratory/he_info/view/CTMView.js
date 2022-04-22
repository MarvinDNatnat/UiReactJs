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

const CTMView = (props) => {
    const classes = useStyles();

    let cttime = '---'
    let ctsec = '---'

    if (props.hemaData.ctm.timeMin !== '') cttime = props.hemaData.ctm.timeMin
    if (props.hemaData.ctm.timeSec !== '') ctsec = props.hemaData.ctm.timeSec

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Time:</CLabel>
                </CCol>
                <CCol md="5" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cttime} minutes, {ctsec} seconds</CLabel>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>4-10 Minutes</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default CTMView
