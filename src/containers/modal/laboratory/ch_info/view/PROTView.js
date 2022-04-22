import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCol,
    CRow,
    CLabel,
    CCardBody
} from '@coreui/react';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    lockField: {
        pointerEvents: 'none',
    }
}));

const PROTView = (props) => {
    const classes = useStyles();

    let totalProtein = '-No Result-'
    let albumin = '-No Result-'
    let globulin = '-No Result-'
    let agRatio = '-No Result-'

    if (props.chemData.prot.totalProtein !== '') totalProtein = props.chemData.prot.totalProtein + ' g/L'
    if (props.chemData.prot.totalProtein !== '') albumin = props.chemData.prot.totalProtein + ' g/L'
    if (props.chemData.prot.totalProtein !== '') globulin = props.chemData.prot.totalProtein + ' g/L'
    if (props.chemData.prot.totalProtein !== '') agRatio = props.chemData.prot.totalProtein

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Total Protein:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{totalProtein}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'66-83'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Albumin:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{albumin}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'38-51'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Globulin:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{globulin}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'23-35'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CLabel className="mb-0 ml-2">Albumin - Globulin Ratio:</CLabel>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{agRatio}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>1.5 - 3.0</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default PROTView
