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

const LIPPInput = (props) => {
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


    let choleconv = '0.00'
    let trigconv = '0.00'
    let hdlconv = '0.00'
    let hdlratio = '0.00'
    let vldl = '0.00'
    let ldlvalue = '0.00'
    let ldlconv = '0.00'


    if (props.chemData.lipp.cholesterolConventional !== '') choleconv = props.chemData.lipp.cholesterolConventional
    if (props.chemData.lipp.triglyceridesConventional !== '') trigconv = props.chemData.lipp.triglyceridesConventional
    if (props.chemData.lipp.hdlConventional !== '') hdlconv = props.chemData.lipp.hdlConventional
    if (props.chemData.lipp.hdlRatio !== '') hdlratio = props.chemData.lipp.hdlRatio
    if (props.chemData.lipp.vldl !== '') vldl = props.chemData.lipp.vldl
    if (props.chemData.lipp.ldlResult !== '') ldlvalue = props.chemData.lipp.ldlResult
    if (props.chemData.lipp.ldlConventional !== '') ldlconv = props.chemData.lipp.ldlConventional

    let specificTest = "";
    if (props.chemData.specificTest !== undefined) {
        specificTest = props.chemData.specificTest
    } else {
        specificTest = props.chemData.itemDetails.specificTest
    }

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Cholesterol") ?
                        <>
                            <CCol md="3" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Cholesterol</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.lipp.cholesterolResult}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('lipp', 'cholesterolResult', props.index)
                                                : props.handleChange('lipp', 'cholesterolResult')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="2" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="2" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'< 5.17'}</strong>
                            </CCol>
                            <CCol md="3" className="p-1">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Conventional</CLabel><br />
                                <CLabel className={"mb-0 ml-2 font-weight-bold"}>{choleconv}</CLabel>
                                <CLabel className={"mb-0 ml-2"}>mg/dl</CLabel>
                            </CCol>
                            <CCol md="2" className="p-1 mt-3">
                                <strong className={clsx(classes.labelText)}>{'< 200'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Triglycerides") ?
                        <>
                            <CCol md="3" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Triglycerides</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.lipp.triglyceridesResult}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('lipp', 'triglyceridesResult', props.index)
                                                : props.handleChange('lipp', 'triglyceridesResult')
                                        }
                                    />
                                </FormControl>
                            </CCol>

                            <CCol md="2" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="2" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'0.3-1.7'}</strong>
                            </CCol>

                            <CCol md="3" className="p-1">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Conventional</CLabel><br />
                                <CLabel className={"mb-0 ml-2 font-weight-bold"}>{trigconv}</CLabel>
                                <CLabel className={"mb-0 ml-2"}>mg/dl</CLabel>
                            </CCol>
                            <CCol md="2" className="p-1 mt-3">
                                <strong className={clsx(classes.labelText)}>{' 26.54-150'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("HDL") ?
                        <>
                            <CCol md="3" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>HDL</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.lipp.hdlResult}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('lipp', 'hdlResult', props.index)
                                                : props.handleChange('lipp', 'hdlResult')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="2" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="2" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'0.9-2.21'}</strong>
                            </CCol>
                            <CCol md="3" className="p-1">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Conventional</CLabel><br />
                                <CLabel className={"mb-0 ml-2 font-weight-bold"}>{hdlconv}</CLabel>
                                <CLabel className={"mb-0 ml-2"}>mg/dl</CLabel>
                            </CCol>
                            <CCol md="2" className="p-1 mt-3">
                                <strong className={clsx(classes.labelText)}>{'34.6-85'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>LDL</CLabel><br />
                    <CLabel className={"mb-0 ml-2 font-weight-bold"}>{ldlvalue}</CLabel>
                    <CLabel className={"mb-0 ml-2"}>mmol/L</CLabel>
                </CCol>
                <CCol md="3" className="p-1 mt-3">
                    <strong className={clsx(classes.labelText)}>{'2.5-4.1'}</strong>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Conventional</CLabel><br />
                    <CLabel className={"mb-0 ml-2 font-weight-bold"}>{ldlconv}</CLabel>
                    <CLabel className={"mb-0 ml-2"}>mg/dl</CLabel>
                </CCol>
                <CCol md="3" className="p-1 mt-3">
                    <strong className={clsx(classes.labelText)}>{'96.15-157.70'}</strong>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>HDL Ratio</CLabel><br />
                    <CLabel className={"mb-0 ml-2 font-weight-bold"}>{hdlratio}</CLabel>
                    <CLabel className={"mb-0 ml-2"}>mmol/L</CLabel>
                </CCol>
                <CCol md="3" className="p-1 mt-3">
                    <strong className={clsx(classes.labelText)}>{'< 4.40'}</strong>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>VLDL</CLabel><br />
                    <CLabel className={"mb-0 ml-2 font-weight-bold"}>{vldl}</CLabel>
                    <CLabel className={"mb-0 ml-2"}>mmol/L</CLabel>
                </CCol>
                <CCol md="3" className="p-1 mt-3">
                    <strong className={clsx(classes.labelText)}>{'0.050-1.04'}</strong>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.chemData.lipp.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('lipp', 'referenceLabId', props.index)
                                    : props.handleSelectChange('lipp', 'referenceLabId')
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

export default LIPPInput
