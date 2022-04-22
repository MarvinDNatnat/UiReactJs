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

const THYRView = (props) => {
    const classes = useStyles();

    let tsh = '-No Result-'
    let ft3 = '-No Result-'
    let ft4 = '-No Result-'
    let t3 = '-No Result-'
    let t4 = '-No Result-'

    if (props.seroData.thyr.tsh !== '') tsh = props.seroData.thyr.tsh + ' uIU/mL'
    if (props.seroData.thyr.ft3 !== '') ft3 = props.seroData.thyr.ft3 + ' pg/mL'
    if (props.seroData.thyr.ft4 !== '') ft4 = props.seroData.thyr.ft4 + ' ng/dL'
    if (props.seroData.thyr.t3 !== '') t3 = props.seroData.thyr.t3 + ' ng/dL'
    if (props.seroData.thyr.t4 !== '') t4 = props.seroData.thyr.t4 + ' ug/dL'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">TSH:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{tsh}</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>0.4 - 5.0</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">FT3:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ft3}</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>2.8 - 7.1</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">FT4:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ft4}</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>12 - 22</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">T3:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{t3}</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>81.0 - 178.0</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">T4:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{t4}</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>4.4 - 11.6</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default THYRView
