import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const UCHEMView = (props) => {
    let uchemph = '-No Result-'
    let uchemspg = '-No Result-'
    let uchemprot = '-No Result-'
    let uchemgluc = '-No Result-'
    let uchemleuk = '-No Result-'
    let uchemnitr = '-No Result-'
    let uchemurob = '-No Result-'
    let uchembld = '-No Result-'
    let uchemketo = '-No Result-'
    let uchembili = '-No Result-'
    let uchemotno = '-No Result-'

    if (props.cmData.uchem.ph !== null) uchemph = props.cmData.uchem.ph.label
    if (props.cmData.uchem.spGravity !== null) uchemspg = props.cmData.uchem.spGravity.label
    if (props.cmData.uchem.protien !== null) uchemprot = props.cmData.uchem.protien.label
    if (props.cmData.uchem.glucose !== null) uchemgluc = props.cmData.uchem.glucose.label
    if (props.cmData.uchem.leukocyteEsterase !== null) uchemleuk = props.cmData.uchem.leukocyteEsterase.label
    if (props.cmData.uchem.nitrite !== null) uchemnitr = props.cmData.uchem.nitrite.label
    if (props.cmData.uchem.urobilinogen !== null) uchemurob = props.cmData.uchem.urobilinogen.label
    if (props.cmData.uchem.blood !== null) uchembld = props.cmData.uchem.blood.label
    if (props.cmData.uchem.ketone !== null) uchemketo = props.cmData.uchem.ketone.label
    if (props.cmData.uchem.bilirubin !== null) uchembili = props.cmData.uchem.bilirubin.label
    if (props.cmData.uchem.otherNotes !== '') uchemotno = props.cmData.uchem.otherNotes

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">pH:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemph}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Nitrite:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemnitr}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Sp. Gravity:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemspg}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Urobilinogen:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemurob}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Protein:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemprot}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Blood:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchembld}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Glucose:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemgluc}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Ketone:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemketo}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Leukocyte Esterase:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemleuk}</CLabel>
                </CCol>

                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Bilirubin:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchembili}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2">Other Notes:</CLabel>
                </CCol>
                <CCol md="10" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{uchemotno}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default UCHEMView
