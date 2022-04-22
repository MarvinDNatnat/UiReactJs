import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const APTTView = (props) => {
    let ptime = '-No Result-'
    let ptnv = '-No Result-'
    let ctime = '-No Result-'
    let ctnv = '-No Result-'

    if (props.hemaData.aptt.patientTime !== '') ptime = props.hemaData.aptt.patientTime + ' seconds'
    if (props.hemaData.aptt.patientTimeNormalValue !== '') ptnv = props.hemaData.aptt.patientTimeNormalValue + ' seconds'
    if (props.hemaData.aptt.control !== '') ctime = props.hemaData.aptt.control + ' seconds'
    if (props.hemaData.aptt.controlNormalValue !== '') ctnv = props.hemaData.aptt.controlNormalValue + ' seconds'
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
        </CCardBody>
    )
}

export default APTTView
