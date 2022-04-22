import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const PREGTView = (props) => {
    let preg = '-No Result-'

    if (props.cmData.preg.result !== null) preg = props.cmData.preg.result.label
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Result:</CLabel>
                </CCol>
                <CCol md="9" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{preg}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default PREGTView
