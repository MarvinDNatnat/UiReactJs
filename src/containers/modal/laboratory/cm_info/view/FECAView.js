import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const FECAView = (props) => {
    let fecacolor = '-No Result-'
    let fecaconst = '-No Result-'
    let fecamfind = '-No Result-'
    let fecaotno = ''

    if (props.cmData.feca.color !== null) fecacolor = props.cmData.feca.color.label
    if (props.cmData.feca.consistency !== null) fecaconst = props.cmData.feca.consistency.label
    if (props.cmData.feca.microscopicFindings !== null) fecamfind = props.cmData.feca.microscopicFindings.label
    if (props.cmData.feca.otherNotes !== '') fecaotno = props.cmData.feca.otherNotes
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Color:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{fecacolor}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Consistency:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{fecaconst}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Microscopic Findings:</CLabel>
                </CCol>
                <CCol md="10" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{fecamfind}</CLabel>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Other Notes:</CLabel>
                </CCol>
                <CCol md="10" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{fecaotno}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default FECAView
