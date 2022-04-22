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

const ENZYView = (props) => {
    const classes = useStyles();

    let sgptalt = '-No Result-'
    let sgotast = '-No Result-'
    let amylase = '-No Result-'
    let lipase = '-No Result-'
    let ggtp = '-No Result-'
    let ldh = '-No Result-'
    let alp = '-No Result-'

    if (props.chemData.enzy.sgptalt !== '') sgptalt = props.chemData.enzy.sgptalt + ' U/L'
    if (props.chemData.enzy.sgotast !== '') sgotast = props.chemData.enzy.sgotast + ' U/L'
    if (props.chemData.enzy.amylase !== '') amylase = props.chemData.enzy.amylase + ' U/L'
    if (props.chemData.enzy.lipase !== '') lipase = props.chemData.enzy.lipase + ' U/L'
    if (props.chemData.enzy.ggtp !== '') ggtp = props.chemData.enzy.ggtp + ' U/L'
    if (props.chemData.enzy.ldh !== '') ldh = props.chemData.enzy.ldh + ' U/L'
    if (props.chemData.enzy.alp !== '') alp = props.chemData.enzy.alp + ' U/L'
    
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">SGPT/ALT:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{sgptalt}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>
                        {'M: 10 - 41'} <br />
                        {'F: 5 - 31'}
                    </CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">SGOT/AST:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{sgotast}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'0 - 40'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Amylase:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{amylase}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'22 - 80'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Lipase:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{lipase}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{' 0 - 62'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CLabel className="mb-0 ml-2">Gamma-Glutamyl Transferase (GGT):</CLabel>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ggtp}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'10-55'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CLabel className="mb-0 ml-2">Lactate Dehydrogenase (LDH):</CLabel>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ldh}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'225-450'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CLabel className="mb-0 ml-2">Alkaline Phosphatase (ALP):</CLabel>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{alp}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'25 - 140'}</CLabel>
                </CCol>
            </CRow>

        </CCardBody>
    )
}

export default ENZYView
