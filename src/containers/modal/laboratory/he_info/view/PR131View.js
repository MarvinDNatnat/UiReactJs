import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const PR131View = (props) => {
    let pr131 = '-No Result-'

    if (props.hemaData.pr131.result !== '') pr131 = props.hemaData.pr131.result

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">PR 1.31:</CLabel>
                </CCol>
                <CCol md="5" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{pr131}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default PR131View
