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

const THYRInput = (props) => {
    const classes = useStyles();

    let referenceAvilable = [];
    let referenceSelection = []
    props.referenceLab.map(reference => {
        reference.collectionItems.map(items => {
            if (props.seroData.itemId) {
                if (props.seroData.itemId === items.referenceLabItems.itemid) {
                    referenceAvilable.push(reference);
                }
            }else {
                if (props.seroData.itemDetails.itemid === items.referenceLabItems.itemid) {
                    referenceAvilable.push(reference);
                }
            }
            return null
        })
        return null
    });
      
        referenceAvilable.map(referenceSelectionList => {
            return referenceSelection.push({value: referenceSelectionList.referenceid, label: referenceSelectionList.name})
        });

    let specificTest = "";

    if (props.seroData.specificTest !== undefined) {
        specificTest = props.seroData.specificTest
    } else {
        specificTest = props.seroData.itemDetails.specificTest
    }

    let tsh = false
    let ft3 = false
    let t3 = false
    let ft4 = false
    let t4 = false
    specificTest.split(":").forEach(sv => {
        switch (sv) {
            case 'TSH':
                tsh = true;
                break;
            case 'FT3':
                ft3 = true;
                break;
            case 'T3':
                t3 = true;
                break;
            case 'FT4':
                ft4 = true;
                break;
            case 'T4':
                t4 = true;
                break;
            default:
                break;
        }
    })

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                {
                    tsh === true ?
                        <>
                            <CCol md="4" className="p-1">
                                <CRow className="m-0 p-0">
                                    <CCol md="8" className="p-1">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>TSH</CLabel>
                                            <CInput
                                                type="number"
                                                value={props.seroData.thyr.tsh}
                                                onChange={
                                                    props.index !== undefined && props.index !== null
                                                        ? props.handleChange('thyr', 'tsh', props.index)
                                                        : props.handleChange('thyr', 'tsh')
                                                }
                                            />
                                        </FormControl>
                                    </CCol>

                                    <CCol md="4" className="p-1 mt-4">
                                        <strong className={clsx(classes.labelText)}>mIU/L 0.3 - 4.2</strong>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </> : null
                }
                {
                    ft3 === true ?
                        <>
                            <CCol md="4" className="p-1">
                                <CRow className="m-0 p-0">
                                    <CCol md="8" className="p-1">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>FT3</CLabel>
                                            <CInput
                                                type="number"
                                                value={props.seroData.thyr.ft3}
                                                onChange={
                                                    props.index !== undefined && props.index !== null
                                                        ? props.handleChange('thyr', 'ft3', props.index)
                                                        : props.handleChange('thyr', 'ft3')
                                                }
                                            />
                                        </FormControl>
                                    </CCol>
                                    <CCol md="4" className="p-1 mt-4">
                                        <strong className={clsx(classes.labelText)}>pmol/L 2.8 - 7.1</strong>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </> : null
                }
                {
                   ft4 === true ?
                        <>
                            <CCol md="4" className="p-1">
                                <CRow className="m-0 p-0">
                                    <CCol md="8" className="p-1">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>FT4</CLabel>
                                            <CInput
                                                type="number"
                                                value={props.seroData.thyr.ft4}
                                                onChange={
                                                    props.index !== undefined && props.index !== null
                                                        ? props.handleChange('thyr', 'ft4', props.index)
                                                        : props.handleChange('thyr', 'ft4')
                                                }
                                            />
                                        </FormControl>
                                    </CCol>
                                    <CCol md="4" className="p-1 mt-4">
                                        <strong className={clsx(classes.labelText)}>pmol/L  12 - 22</strong>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    t3 === true ?
                        <>
                            <CCol md="4" className="p-1">
                                <CRow className="m-0 p-0">
                                    <CCol md="8" className="p-1">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>T3</CLabel>
                                            <CInput
                                                type="number"
                                                value={props.seroData.thyr.t3}
                                                onChange={
                                                    props.index !== undefined && props.index !== null
                                                        ? props.handleChange('thyr', 't3', props.index)
                                                        : props.handleChange('thyr', 't3')
                                                }
                                            />
                                        </FormControl>
                                    </CCol>
                                    <CCol md="4" className="p-1 mt-4">
                                        <strong className={clsx(classes.labelText)}>nmol/L 1.23 - 3.07</strong>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </> : null
                }
                {
                    t4 === true ?
                        <>
                            <CCol md="4" className="p-1">
                                <CRow className="m-0 p-0">
                                    <CCol md="8" className="p-1">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>T4</CLabel>
                                            <CInput
                                                type="number"
                                                value={props.seroData.thyr.t4}
                                                onChange={
                                                    props.index !== undefined && props.index !== null
                                                        ? props.handleChange('thyr', 't4', props.index)
                                                        : props.handleChange('thyr', 't4')
                                                }
                                            />
                                        </FormControl>
                                    </CCol>
                                    <CCol md="4" className="p-1 mt-4">
                                        <strong className={clsx(classes.labelText)}>nmol/L 66 - 181</strong>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </> : null
                }
                 <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.seroData.thyr.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('thyr', 'referenceLabId', props.index)
                                    : props.handleSelectChange('thyr', 'referenceLabId')
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

export default THYRInput
