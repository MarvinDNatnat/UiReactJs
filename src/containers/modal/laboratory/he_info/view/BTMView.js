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

const BTMView = (props) => {
    const classes = useStyles();

    let bttime = '---'
    let btsec = '---'

    if (props.hemaData.btm.timeMin !== '') bttime = props.hemaData.btm.timeMin
    if (props.hemaData.btm.timeSec !== '') btsec = props.hemaData.btm.timeSec

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Time:</CLabel>
                </CCol>
                <CCol md="5" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{bttime} minutes, {btsec} seconds</CLabel>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1-5 Minutes</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default BTMView
