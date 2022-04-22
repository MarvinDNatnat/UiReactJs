import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const BTYPView = (props) => {

    let btype = '-No Result-'
    let rhes = '-No Result-'

    if (props.hemaData.btyp.bloodType !== null) btype = props.hemaData.btyp.bloodType.label
    if (props.hemaData.btyp.rhesusFactor !== null) rhes = props.hemaData.btyp.rhesusFactor.label
    
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Blood Type:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{btype}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Rhesus (Rh) Factor:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{rhes}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default BTYPView
