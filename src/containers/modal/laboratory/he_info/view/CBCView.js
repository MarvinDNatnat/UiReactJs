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

const CBCView = (props) => {
    const classes = useStyles();

    let cbcwbc = '-No Result-'
    let cbcbaso = '-No Result-'
    let cbcneu = '-No Result-'
    let cbcrbc = '-No Result-'
    let cbclymp = '-No Result-'
    let cbchemo = '-No Result-'
    let cbcmono = '-No Result-'
    let cbchema = '-No Result-'
    let cbceosi = '-No Result-'
    let cbcplat = '-No Result-'

    if (props.hemaData.cbc.whiteBloodCells !== '') cbcwbc = props.hemaData.cbc.whiteBloodCells + ' % x10^9/L'
    if (props.hemaData.cbc.basophils !== '') cbcbaso = props.hemaData.cbc.basophils + ' %'
    if (props.hemaData.cbc.neutrophils !== '') cbcneu = props.hemaData.cbc.neutrophils + ' %'
    if (props.hemaData.cbc.redBloodCells !== '') cbcrbc = props.hemaData.cbc.redBloodCells + ' x10 ^6/L'
    if (props.hemaData.cbc.lymphocytes !== '') cbclymp = props.hemaData.cbc.lymphocytes + ' %'
    if (props.hemaData.cbc.hemoglobin !== '') cbchemo = props.hemaData.cbc.hemoglobin + ' g/L'
    if (props.hemaData.cbc.monocytes !== '') cbcmono = props.hemaData.cbc.monocytes + ' %'
    if (props.hemaData.cbc.hematocrit !== '') cbchema = props.hemaData.cbc.hematocrit + ' Vol. Fraction'
    if (props.hemaData.cbc.eosinophils !== '') cbceosi = props.hemaData.cbc.eosinophils + ' %'
    if (props.hemaData.cbc.platelet !== '') cbcplat = props.hemaData.cbc.platelet + ' x10^3/mm3'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">White Blood Cells:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbcwbc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>4.23~11.07</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Basophils:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbcbaso}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>0.00~1.00</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Neutrophils:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbcneu}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>34.00~71.00</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Red Blood Cells:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbcrbc}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>4.32~5.72</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Lymphocytes:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbclymp}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>22.00~53.00</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Hemoglobin:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbchemo}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>
                        {'M: 137.00~175.00'} <br />
                        {'F: 112.00~157.00'}
                    </CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Monocytes:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbcmono}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>5.00~12.00</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Hematocrit:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbchema}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>
                        {'M: 0.40~0.51'} <br/>
                        {'F: 0.34~0.45'}
                    </CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Eosinophils:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbceosi}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>1.00~7.00</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Platelet:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cbcplat}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>150~400</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default CBCView
