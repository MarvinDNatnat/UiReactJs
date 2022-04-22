import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const AFBView = (props) => {
    let vasp1 = '-No Result-'
    let vasp2 = '-No Result-'
    let resp1 = '-No Result-'
    let resp2 = '-No Result-'
    let diag = '-No Result-'

    if (props.cmData.afb.visualApperanceSpecimen1 !== '') vasp1 = props.cmData.afb.visualApperanceSpecimen1
    if (props.cmData.afb.visualApperanceSpecimen2 !== '') vasp2 = props.cmData.afb.visualApperanceSpecimen2
    if (props.cmData.afb.readingSpecimen1 !== '') resp1 = props.cmData.afb.readingSpecimen1
    if (props.cmData.afb.readingSpecimen2 !== '') resp2 = props.cmData.afb.readingSpecimen2
    if (props.cmData.afb.diagnosis !== '') diag = props.cmData.afb.diagnosis
    
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Visual Appearance</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Specimen 1:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{vasp1}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Specimen 2:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{vasp2}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Reading</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0 border-bottom">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Specimen 1:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{resp1}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Specimen 2:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{resp2}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Diagnosis:</CLabel>
                </CCol>
                <CCol md="10" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{diag}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default AFBView
