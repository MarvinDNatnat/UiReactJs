import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const COVIDView = (props) => {
    let covid1 = '-No Result-'
    let covid2 = '-No Result-'
    let purpose = '-No Result-'

    if (props.seroData.covid.sarscov2igg !== null ) covid1 = props.seroData.covid.sarscov2igg.label
    if (props.seroData.covid.sarscov2igm !== null ) covid2 = props.seroData.covid.sarscov2igm.label
    if (props.seroData.covid.purpose !== null ) purpose = props.seroData.covid.purpose
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">SARS-Cov2-IgG:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{covid1}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">SARS-Cov2 IgM:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{covid2}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Purpose:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{purpose}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default COVIDView
