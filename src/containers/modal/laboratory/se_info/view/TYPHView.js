import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const TYPHView = (props) => {

    let igm = '-No Result-'
    let igg = '-No Result-'

    if (props.seroData.typh.igm !== null) igm = props.seroData.typh.igm.label
    if (props.seroData.typh.igg !== null) igg = props.seroData.typh.igg.label

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">IgM:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{igm}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">IgG:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{igg}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default TYPHView
