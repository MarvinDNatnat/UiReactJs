import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const MASMView = (props) => {
    let masm = '-No Result-'

    if (props.hemaData.masm.result !== null) masm = props.hemaData.masm.result.label

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Result:</CLabel>
                </CCol>
                <CCol md="5" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{masm}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default MASMView
