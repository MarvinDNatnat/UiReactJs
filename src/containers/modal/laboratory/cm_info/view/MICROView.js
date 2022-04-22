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

const MICROView = (props) => {
    const classes = useStyles();

    let uchemrbc = '-No Result-'
    let uchemwbc = '-No Result-'
    let uchemecells = '-No Result-'
    let uchemmthreads = '-No Result-'
    let uchembact = '-No Result-'
    let uchemamor = '-No Result-'
    let uchemcaox = '-No Result-'

    if (props.cmData.uchem.rbc !== '') uchemrbc = props.cmData.uchem.rbc
    if (props.cmData.uchem.wbc !== '') uchemwbc = props.cmData.uchem.wbc
    if (props.cmData.uchem.ecells !== null) uchemecells = props.cmData.uchem.ecells.label
    if (props.cmData.uchem.mtreads !== null) uchemmthreads = props.cmData.uchem.mtreads.label
    if (props.cmData.uchem.bacteria !== null) uchembact = props.cmData.uchem.bacteria.label
    if (props.cmData.uchem.amorphous !== null) uchemamor = props.cmData.uchem.amorphous.label
    if (props.cmData.uchem.caox !== null) uchemcaox = props.cmData.uchem.caox.label

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2 ">RBC:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemrbc}</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>/hpf</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>0-3</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">WBC:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemwbc}</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>/hpf</CLabel>
                </CCol>
                <CCol md="1" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>0-5</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">E.Cells:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemecells}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">M.Threads:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemmthreads}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Bacteria:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchembact}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Amorphous:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemamor}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">CaOX:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemcaox}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default MICROView
