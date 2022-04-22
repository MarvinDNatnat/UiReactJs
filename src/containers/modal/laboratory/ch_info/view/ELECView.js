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

const ELECView = (props) => {
    const classes = useStyles();

    let sodium = '-No Result-'
    let potassium = '-No Result-'
    let chloride = '-No Result-'
    let magnesium = '-No Result-'
    let totalCalcium = '-No Result-'
    let ionizedCalcium = '-No Result-'
    let inorganicPhosphorus = '-No Result-'

    if (props.chemData.elec.sodium !== '') sodium = props.chemData.elec.sodium + ' mmol/L'
    if (props.chemData.elec.potassium !== '') potassium = props.chemData.elec.potassium + ' mmol/L'
    if (props.chemData.elec.chloride !== '') chloride = props.chemData.elec.chloride + ' mmol/L'
    if (props.chemData.elec.magnesium !== '') magnesium = props.chemData.elec.magnesium + ' mmol/L'
    if (props.chemData.elec.totalCalcium !== '') totalCalcium = props.chemData.elec.totalCalcium + ' mmol/L'
    if (props.chemData.elec.ionizedCalcium !== '') ionizedCalcium = props.chemData.elec.ionizedCalcium + ' mmol/L'
    if (props.chemData.elec.inorganicPhosphorus !== '') inorganicPhosphorus = props.chemData.elec.inorganicPhosphorus + ' mmol/L'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Sodium:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{sodium}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'135 - 153'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Potassium:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{potassium}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'3.50 - 5.30'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Chloride:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{chloride}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'98-107'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Magnesium:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{magnesium}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'0.70-0.98'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Total Calcium:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{totalCalcium}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'2.30-2.70'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CLabel className="mb-0 ml-2">Ionized Calcium:</CLabel>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4">
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ionizedCalcium}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'1.13-1.32'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CLabel className="mb-0 ml-2">Inorganic Phosphorous:</CLabel>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4">
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{inorganicPhosphorus}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{' 0.87-1.45'}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default ELECView
