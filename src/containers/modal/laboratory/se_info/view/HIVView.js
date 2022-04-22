import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const HIVView = (props) => {
    let hiv1 = '-No Result-'
    let hiv2 = '-No Result-'

    if (props.seroData.hiv.test1 !== null) hiv1 = props.seroData.hiv.test1.label
    if (props.seroData.hiv.test2 !== null) hiv2 = props.seroData.hiv.test2.label
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Test 1:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hiv1}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Test 2:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hiv2}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default HIVView
