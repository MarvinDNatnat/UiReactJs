import React from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
    CInput,
} from '@coreui/react';

import {
    FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    lockField: {
        pointerEvents: 'none',
    }
}));

const AFBInput = (props) => {
    const classes = useStyles();

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className={clsx(classes.rightAlign, "p-1 mt-4")}>
                    <CLabel>Visual Appearance</CLabel>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Specimen 1</CLabel>
                        <CInput
                            value={props.cmData.afb.visualApperanceSpecimen1}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('afb', 'visualApperanceSpecimen1', props.index)
                                    : props.handleChange('afb', 'visualApperanceSpecimen1')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Specimen 2</CLabel>
                        <CInput
                            value={props.cmData.afb.visualApperanceSpecimen2}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('afb', 'visualApperanceSpecimen2', props.index)
                                    : props.handleChange('afb', 'visualApperanceSpecimen2')
                            }
                        />
                    </FormControl>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className={clsx(classes.rightAlign, "p-1 mt-4")}>
                    <CLabel>Reading</CLabel>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Specimen 1</CLabel>
                        <CInput
                            value={props.cmData.afb.readingSpecimen1}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('afb', 'readingSpecimen1', props.index)
                                    : props.handleChange('afb', 'readingSpecimen1')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Specimen 2</CLabel>
                        <CInput
                            value={props.cmData.afb.readingSpecimen2}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('afb', 'readingSpecimen2', props.index)
                                    : props.handleChange('afb', 'readingSpecimen2')
                            }
                        />
                    </FormControl>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="10" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Diagnosis</CLabel>
                        <CInput
                            value={props.cmData.afb.diagnosis}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('afb', 'diagnosis', props.index)
                                    : props.handleChange('afb', 'diagnosis')
                            }
                        />
                    </FormControl>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default AFBInput
