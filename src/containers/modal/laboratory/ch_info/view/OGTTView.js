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

const OGTTView = (props) => {
    const classes = useStyles();

    let ogtt1hr = '-No Result-'
    let ogtt1hc = '-No Result-'
    let ogtt2hr = '-No Result-'
    let ogtt2hc = '-No Result-'

    if (props.chemData.ogtt.ogtt1HrResult !== '') ogtt1hr = props.chemData.ogtt.ogtt1HrResult + ' mmol/L'
    if (props.chemData.ogtt.ogtt1HrConventional !== '') ogtt1hc = props.chemData.ogtt.ogtt1HrConventional + ' mg/dl'
    if (props.chemData.ogtt.ogtt2HrResult !== '') ogtt2hr = props.chemData.ogtt.ogtt2HrResult + ' mmol/L'
    if (props.chemData.ogtt.ogtt2HrConventional !== '') ogtt2hc = props.chemData.ogtt.ogtt2HrConventional + ' mg/dl'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">OGTT 1Hr:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ogtt1hr}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'< 11.0'}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Conventional:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ogtt1hc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'< 200'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">OGTT 2Hr:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ogtt2hr}</CLabel>
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
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ogtt2hc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'< 140'}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default OGTTView
