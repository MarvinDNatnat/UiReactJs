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

const ESRView = (props) => {
    const classes = useStyles();

    let esrrate = '-No Result'
    let esrmethod = '-No Result'

    if (props.hemaData.esr.rate !== '') esrrate = props.hemaData.esr.rate + ' mm/hr'
    if (props.hemaData.esr.esrMethod !== null) esrmethod = props.hemaData.esr.esrMethod.label

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Rate:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{esrrate}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>
                        {'M: 0~15 mm/hr'} <br />
                        {'F: 1~20 mm/hr'}
                    </CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">ESR Method:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{esrmethod}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default ESRView
