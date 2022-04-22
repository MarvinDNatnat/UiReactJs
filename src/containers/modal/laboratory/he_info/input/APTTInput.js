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
    FormControl, Select
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

const APTTInput = (props) => {
    const classes = useStyles();
    let referenceAvilable = [];
    let referenceSelection = []
    props.referenceLab.map(reference => {
        reference.collectionItems.map(items => {
            if (props.hemaData.itemId) {
                if (props.hemaData.itemId === items.referenceLabItems.itemid) {
                    referenceAvilable.push(reference);
                }
            } else {
                if (props.hemaData.itemDetails.itemid === items.referenceLabItems.itemid) {
                    referenceAvilable.push(reference);
                }
            }
            return null
        })
        return null
    });

    referenceAvilable.map(referenceSelectionList => {
        return referenceSelection.push({ value: referenceSelectionList.referenceid, label: referenceSelectionList.name })
    });
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="2" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Patient Time</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.aptt.patientTime}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('aptt', 'patientTime', props.index)
                                    : props.handleChange('aptt', 'patientTime')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>secs</strong>
                </CCol>
                <CCol md="2" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Normal Value</CLabel>
                        <CInput
                            value={props.hemaData.aptt.patientTimeNormalValue}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('aptt', 'patientTimeNormalValue', props.index)
                                    : props.handleChange('aptt', 'patientTimeNormalValue')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>secs</strong>
                </CCol>
                <CCol md="2" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Control</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.aptt.control}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('aptt', 'control', props.index)
                                    : props.handleChange('aptt', 'control')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>secs</strong>
                </CCol>
                <CCol md="2" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Normal Value</CLabel>
                        <CInput
                            value={props.hemaData.aptt.controlNormalValue}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('aptt', 'controlNormalValue', props.index)
                                    : props.handleChange('aptt', 'controlNormalValue')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>secs</strong>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
            <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.hemaData.aptt.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('aptt', 'referenceLabId', props.index)
                                    : props.handleSelectChange('aptt', 'referenceLabId')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                referenceSelection.map((options, index) =>
                                    <option key={index} value={JSON.stringify(options)}>{options.label}</option>
                                )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default APTTInput
