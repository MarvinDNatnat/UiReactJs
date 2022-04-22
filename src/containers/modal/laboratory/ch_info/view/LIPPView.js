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

const LIPPView = (props) => {
    const classes = useStyles();

    let choler = '-No Result-'
    let cholec = '-No Result-'
    let trigr = '-No Result-'
    let trigc = '-No Result-'
    let hdlr = '-No Result-'
    let hdlc = '-No Result-'
    let ldlr = '-No Result-'
    let ldlc = '-No Result-'
    let hdlra = '-No Result-'
    let vldl = '-No Result-'

    if (props.chemData.lipp.cholesterolResult !== '') choler = props.chemData.lipp.cholesterolResult + ' mmol/L'
    if (props.chemData.lipp.cholesterolConventional !== '') cholec = props.chemData.lipp.cholesterolConventional + ' mg/dl'
    if (props.chemData.lipp.triglyceridesResult !== '') trigr = props.chemData.lipp.triglyceridesResult + ' mmol/L'
    if (props.chemData.lipp.triglyceridesConventional !== '') trigc = props.chemData.lipp.triglyceridesConventional + ' mg/dl'
    if (props.chemData.lipp.hdlResult !== '') hdlr = props.chemData.lipp.hdlResult + ' mmol/L'
    if (props.chemData.lipp.hdlConventional !== '') hdlc = props.chemData.lipp.hdlConventional + ' mg/dl'
    if (props.chemData.lipp.ldlResult !== '') ldlr = props.chemData.lipp.ldlResult + ' mmol/L'
    if (props.chemData.lipp.ldlConventional !== '') ldlc = props.chemData.lipp.ldlConventional + ' mg/dl'
    if (props.chemData.lipp.hdlRatio !== '') hdlra = props.chemData.lipp.hdlRatio + ' mmol/L'
    if (props.chemData.lipp.vldl !== '') vldl = props.chemData.lipp.vldl + ' mmol/L'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Cholesterol:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{choler}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'< 5.17'}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Conventional:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cholec}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'< 200'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Triglycerides:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{trigr}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'0.3-1.7'}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Conventional:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{trigc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{' 26.54-150'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">HDL:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hdlr}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'0.9-2.21'}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Conventional:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hdlc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'34.6-85'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">LDL:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ldlr}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'2.5-4.1'}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Conventional:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ldlc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'96.15-157.70'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">HDL Ratio:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hdlra}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'2.5-4.1'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">VLDL:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{vldl}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'0.050-1.04'}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default LIPPView
