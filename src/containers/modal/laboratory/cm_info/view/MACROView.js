import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const MACROView = (props) => {
    let uchemColor = '-No Result-'
    let uchemTrans = '-No Result-'

    if (props.cmData.uchem.color !== null) uchemColor = props.cmData.uchem.color.label
    if (props.cmData.uchem.transparency !== null) uchemTrans = props.cmData.uchem.transparency.label

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Color:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">
                        {uchemColor}
                    </CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Transparency:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">
                        {uchemTrans}
                    </CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default MACROView
