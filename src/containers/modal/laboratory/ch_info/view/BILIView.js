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

const BILIView = (props) => {
    const classes = useStyles();

    let totalAdult = '-No Result-'
    let direct = '-No Result-'
    let indirect = '-No Result-'

    if (props.chemData.bili.totalAdult !== '') totalAdult = props.chemData.bili.totalAdult + ' umol/L'
    if (props.chemData.bili.direct !== '') direct = props.chemData.bili.direct + ' umol/L'
    if (props.chemData.bili.indirect !== '') indirect = props.chemData.bili.indirect + ' umol/L'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Total (Adult):</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{totalAdult}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'5 - 21'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Direct:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{direct}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'0 - 6.9'}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Indirect:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{indirect}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'5 - 14.1'}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default BILIView
