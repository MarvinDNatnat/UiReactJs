import React from 'react'

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const SERView = (props) => {

    let hbsag = '-No Result-'
    let anhav = '-No Result-'
    let vdrl = '-No Result-'
    let anhbs = '-No Result-'
    let hbeag = '-No Result-'
    let anhbe = '-No Result-'
    let anhbc = '-No Result-'
    let tppa = '-No Result-'
    let pregnancyTest = '-No Result-'

    if (props.seroData.ser.hbsag !== null) hbsag = props.seroData.ser.hbsag.label
    if (props.seroData.ser.antihav !== null) anhav = props.seroData.ser.antihav.label
    if (props.seroData.ser.vdrlrpr !== null) vdrl = props.seroData.ser.vdrlrpr.label
    if (props.seroData.ser.antihbs !== null) anhbs = props.seroData.ser.antihbs.label
    if (props.seroData.ser.hbeag !== null) hbeag = props.seroData.ser.hbeag.label
    if (props.seroData.ser.antihbe !== null) anhbe = props.seroData.ser.antihbe.label
    if (props.seroData.ser.antihbc !== null) anhbc = props.seroData.ser.antihbc.label
    if (props.seroData.ser.tppa !== null) tppa = props.seroData.ser.tppa.label
    if (props.seroData.ser.pregnancyTest !== null) pregnancyTest = props.seroData.ser.pregnancyTest.label

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">HBsAg:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hbsag}</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">Anti-HAV:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{anhav}</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">VDRL/RPR:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{vdrl}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">Anti-HBS:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{anhbs}</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">HBeAG:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hbeag}</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">Anti-Hbe:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{anhbe}</CLabel>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">Anti-Hbc:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{anhbc}</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">TPPA:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{tppa}</CLabel>
                </CCol>

                <CCol md="1" className="p-1">
                    <CLabel className="mb-0 ml-2">Pregnancy Test:</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{pregnancyTest}</CLabel>
                </CCol>
</CRow>
        </CCardBody>
    )
}

export default SERView
