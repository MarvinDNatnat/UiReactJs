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
    Select
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

const OGTTInput = (props) => {
    const classes = useStyles();

    let referenceAvilable = [];
    let referenceSelection = []
    props.referenceLab.map(reference => {
        reference.collectionItems.map(items => {
            if (props.chemData.itemId) {
                if (props.chemData.itemId === items.referenceLabItems.itemid) {
                    referenceAvilable.push(reference);
                }
            } else {
                if (props.chemData.itemDetails.itemid === items.referenceLabItems.itemid) {
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

    let ogtt1conv = '0.00'
    let ogtt2conv = '0.00'
    if (props.chemData.ogtt.ogtt1HrConventional !== '') ogtt1conv = props.chemData.ogtt.ogtt1HrConventional
    if (props.chemData.ogtt.ogtt2HrConventional !== '') ogtt2conv = props.chemData.ogtt.ogtt2HrConventional

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OGTT 1Hr</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.ogtt.ogtt1HrResult}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('ogtt', 'ogtt1HrResult', props.index)
                                    : props.handleChange('ogtt', 'ogtt1HrResult')
                            }
                        />
                    </FormControl>
                </CCol>

                <CCol md="2" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                </CCol>
                <CCol md="2" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'< 11.0'}</strong>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Conventional</CLabel><br />
                    <CLabel className={"mb-0 ml-2 font-weight-bold"}>{ogtt1conv}</CLabel>
                    <CLabel className={"mb-0 ml-2"}>mg/dl</CLabel>
                </CCol>
                <CCol md="2" className="p-1 mt-3">
                    <strong className={clsx(classes.labelText)}>{'< 200'}</strong>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>OGTT 2Hr</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.ogtt.ogtt2HrResult}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('ogtt', 'ogtt2HrResult', props.index)
                                    : props.handleChange('ogtt', 'ogtt2HrResult')
                            }
                        />
                    </FormControl>
                </CCol>

                <CCol md="2" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                </CCol>
                <CCol md="2" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'< 7.7'}</strong>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Conventional</CLabel><br />
                    <CLabel className={"mb-0 ml-2 font-weight-bold"}>{ogtt2conv}</CLabel>
                    <CLabel className={"mb-0 ml-2"}>mg/dl</CLabel>
                </CCol>
                <CCol md="2" className="p-1 mt-3">
                    <strong className={clsx(classes.labelText)}>{'< 140'}</strong>
                </CCol>

                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.chemData.ogtt.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('ogtt', 'referenceLabId', props.index)
                                    : props.handleSelectChange('ogtt', 'referenceLabId')
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

export default OGTTInput
