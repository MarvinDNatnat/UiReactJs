import React from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const useStyles = makeStyles((theme) => ({
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
}));

const AGENView = (props) => {
    const classes = useStyles();

    let prostateSpecificAntigen = '-No Result-'
    let alphaFetoprotein = '-No Result-'
    let carcenoembryonicAntigen = '-No Result-'
    let cancerAntigen125 = '-No Result-'
    let cancerAntigen199 = '-No Result-'
    let cancerAntigen153 = '-No Result-'

    if (props.seroData.agen.prostateSpecificAntigen !== '') prostateSpecificAntigen = props.seroData.agen.prostateSpecificAntigen + ' ng/mL'
    if (props.seroData.agen.alphaFetoprotein !== '') alphaFetoprotein = props.seroData.agen.alphaFetoprotein + ' IU/mL'
    if (props.seroData.agen.carcenoembryonicAntigen !== '') carcenoembryonicAntigen = props.seroData.agen.carcenoembryonicAntigen + ' ng/mL'
    if (props.seroData.agen.cancerAntigen125 !== '') cancerAntigen125 = props.seroData.agen.cancerAntigen125 + ' U/mL'
    if (props.seroData.agen.cancerAntigen199 !== '') cancerAntigen199 = props.seroData.agen.cancerAntigen199 + ' U/mL'
    if (props.seroData.agen.cancerAntigen153 !== '') cancerAntigen153 = props.seroData.agen.cancerAntigen153 + ' U/mL'
    
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-0 m-0">
                    <CRow className="p-0 m-0">
                        <CCol md="6" className="p-1">
                            <CLabel className="mb-0 ml-2">Prostate Specific Antigen (PSA):</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{prostateSpecificAntigen}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2 font-weight-bold")}>0-4</CLabel>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-0 m-0">
                    <CRow className="p-0 m-0">
                        <CCol md="6" className="p-1">
                            <CLabel className="mb-0 ml-2">Alpha-Fetoprotein:</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{alphaFetoprotein}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>0.5-5.5</CLabel>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-0 m-0">
                    <CRow className="p-0 m-0">
                        <CCol md="6" className="p-1">
                            <CLabel className="mb-0 ml-2">Carcenoembryonic Antigen:</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{carcenoembryonicAntigen}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>0 - 5</CLabel>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-0 m-0">
                    <CRow className="p-0 m-0">
                        <CCol md="6" className="p-1">
                            <CLabel className="mb-0 ml-2">Cancer Antigen 125:</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{cancerAntigen125}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>0 - 35</CLabel>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-0 m-0">
                    <CRow className="p-0 m-0">
                        <CCol md="6" className="p-1">
                            <CLabel className="mb-0 ml-2">Cancer Antigen 19-9:</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{cancerAntigen199}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>0 - 39</CLabel>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-0 m-0">
                    <CRow className="p-0 m-0">
                        <CCol md="6" className="p-1">
                            <CLabel className="mb-0 ml-2">Cancer Antigen 15-3:</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{cancerAntigen153}</CLabel>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>0 - 25</CLabel>
                        </CCol>
                    </CRow>
                </CCol>

            </CRow>
        </CCardBody>
    )
}

export default AGENView
