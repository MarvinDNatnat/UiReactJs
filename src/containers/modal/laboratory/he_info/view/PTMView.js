import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const PTMView = (props) => {
    let ptime = '-No Result-'
    let ptnv = '-No Result-'
    let ctime = '-No Result-'
    let ctnv = '-No Result-'
    let pact = '-No Result-'
    let panv = '-No Result-'
    let inr = '-No Result-'
    let inrnv = '-No Result-'

    if (props.hemaData.ptm.patientTime !== '') ptime = props.hemaData.ptm.patientTime + ' seconds'
    if (props.hemaData.ptm.patientTimeNormalValue !== '') ptnv = props.hemaData.ptm.patientTimeNormalValue + ' seconds'
    if (props.hemaData.ptm.control !== '') ctime = props.hemaData.ptm.control + ' seconds'
    if (props.hemaData.ptm.controlNormalValue !== '') ctnv = props.hemaData.ptm.controlNormalValue + ' seconds'
    if (props.hemaData.ptm.percentActivity !== '') pact = props.hemaData.ptm.percentActivity + ' seconds'
    if (props.hemaData.ptm.percentActivityNormalValue !== '') panv = props.hemaData.ptm.percentActivityNormalValue + ' seconds'
    if (props.hemaData.ptm.inr !== '') inr = props.hemaData.ptm.inr + ' seconds'
    if (props.hemaData.ptm.inrNormalValue !== '') inrnv = props.hemaData.ptm.inrNormalValue + ' seconds'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Patient Time:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ptime}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Normal Value:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ptnv}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Control:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ctime}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Normal Value:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{ctnv}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">% Activity:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{pact}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Normal Value:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{panv}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">INR:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{inr}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Normal Value:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{inrnv}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default PTMView
