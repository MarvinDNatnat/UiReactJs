import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const RTANTIGENView = (props) => {
    let collectionDate = '-No Result-'
    let cov_ag = '-No Result-'
    let purpose = '-No Result-'

    if (props.seroData.rtantigen.collectionDate !== null ) collectionDate = props.seroData.rtantigen.collectionDate
    if (props.seroData.rtantigen.purpose !== null ) purpose = props.seroData.rtantigen.purpose
    if (props.seroData.rtantigen.cov_ag !== null ) cov_ag = props.seroData.rtantigen.cov_ag.label
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Collection Date</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{collectionDate}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">SARS-Cov2 Ag:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{cov_ag}</CLabel>
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

export default RTANTIGENView
