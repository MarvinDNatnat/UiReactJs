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

const ELECInput = (props) => {
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
                    specificTest.includes("Sodium") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Sodium</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.sodium}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'sodium', props.index)
                                                : props.handleChange('elec', 'sodium')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'135 - 153'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Potassium") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Potassium</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.potassium}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'potassium', props.index)
                                                : props.handleChange('elec', 'potassium')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'3.50 - 5.30'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Chloride") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Chloride</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.chloride}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'chloride', props.index)
                                                : props.handleChange('elec', 'chloride')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'98-107'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Magnesium") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Magnesium</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.magnesium}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'magnesium', props.index)
                                                : props.handleChange('elec', 'magnesium')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'0.70-0.98'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Total Calcium") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Total Calcium</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.totalCalcium}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'totalCalcium', props.index)
                                                : props.handleChange('elec', 'totalCalcium')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'2.30-2.70'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Ionized Calcium") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 text-nowrap")}>Ionized Calcium</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.ionizedCalcium}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'ionizedCalcium', props.index)
                                                : props.handleChange('elec', 'ionizedCalcium')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'1.13-1.32'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Inorganic Phosphorous") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 text-nowrap")}>Inorganic Phosphorous</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.inorganicPhosphorus}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'inorganicPhosphorus', props.index)
                                                : props.handleChange('elec', 'inorganicPhosphorus')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'0.87-1.45'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Total Iron") ?
                        <>
                            <CCol md="5" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 text-nowrap")}>Total Iron(Fe)</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.elec.totalIron}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('elec', 'totalIron', props.index)
                                                : props.handleChange('elec', 'totalIron')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'umol/L'}</strong>
                            </CCol>
                            <CCol md="4" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'8.95-30.43'}</strong>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
            <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.chemData.elec.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('elec', 'referenceLabId', props.index)
                                    : props.handleSelectChange('elec', 'referenceLabId')
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

export default ELECInput
