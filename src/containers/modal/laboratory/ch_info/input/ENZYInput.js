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

const ENZYInput = (props) => {
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
                    specificTest.includes("SGPT") ?
                        <>
                            <CCol md="6" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>SGPT/ALT</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.enzy.sgptalt}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('enzy', 'sgptalt', props.index)
                                                : props.handleChange('enzy', 'sgptalt')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="6" className="p-1 mt-3">
                                <CRow className="m-0 p-0">
                                    <CCol md="5" className="p-0 mt-1">
                                        <strong className={clsx(classes.labelText)}>U/L</strong>
                                    </CCol>
                                    <CCol md="7" className="p-0">
                                        <CRow className="m-0 p-0">
                                            <strong className={clsx(classes.labelText)}>M: 10 - 41</strong>
                                        </CRow>
                                        <CRow className="m-0 p-0">
                                            <strong className={clsx(classes.labelText)}>F: 5 - 31</strong>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CCol>

                        </>
                        : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">

                {
                    specificTest.includes("SGOT") ?
                        <>
                            <CCol md="6" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>SGOT/AST</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.enzy.sgotast}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('enzy', 'sgotast', props.index)
                                                : props.handleChange('enzy', 'sgotast')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'U/L'}</strong>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'0 - 40'}</strong>
                            </CCol>
                        </> : null
                }
                <CRow className="ml-1 mr-1 p-0">
                    {
                        specificTest.includes("AMYLASE") ?
                            <>
                                <CCol md="6" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Amylase</CLabel>
                                        <CInput
                                            type="number"
                                            value={props.chemData.enzy.amylase}
                                            onChange={
                                                props.index !== undefined && props.index !== null
                                                    ? props.handleChange('enzy', 'amylase', props.index)
                                                    : props.handleChange('enzy', 'amylase')
                                            }
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className="p-1 mt-4">
                                    <strong className={clsx(classes.labelText)}>{'U/L'}</strong>
                                </CCol>
                                <CCol md="3" className="p-1 mt-4">
                                    <strong className={clsx(classes.labelText)}>{'22 - 80'}</strong>
                                </CCol>
                            </>
                            : null
                    }
                </CRow>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("LIPASE") ?
                        <>
                            <CCol md="6" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Lipase</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.enzy.lipase}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('enzy', 'lipase', props.index)
                                                : props.handleChange('enzy', 'lipase')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'U/L'}</strong>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'0 - 62'}</strong>
                            </CCol>
                        </>
                        : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Gamma-Glutamyl Transferase") ?
                        <>
                            <CCol md="6" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 text-nowrap")}>Gamma-Glutamyl Transferase (GGT)</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.enzy.ggtp}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('enzy', 'ggtp', props.index)
                                                : props.handleChange('enzy', 'ggtp')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'U/L'}</strong>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'10-55'}</strong>
                            </CCol>
                        </>
                        : null
                }

            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Lactate Dehydrogenase") ?
                        <>
                            <CCol md="6" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 text-nowrap")}>Lactate Dehydrogenase (LDH)</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.enzy.ldh}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('enzy', 'ldh', props.index)
                                                : props.handleChange('enzy', 'ldh')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'U/L'}</strong>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'225-450'}</strong>
                            </CCol>
                        </>
                        : null
                }

            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("Alkaline Phosphatase") ?
                        <>
                            <CCol md="6" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2 text-nowrap")}>Alkaline Phosphatase (ALP)</CLabel>
                                    <CInput
                                        type="number"
                                        value={props.chemData.enzy.alp}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('enzy', 'alp', props.index)
                                                : props.handleChange('enzy', 'alp')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'U/L'}</strong>
                            </CCol>
                            <CCol md="3" className="p-1 mt-4">
                                <strong className={clsx(classes.labelText)}>{'25 - 140'}</strong>
                            </CCol>
                        </>
                        : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.chemData.enzy.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('enzy', 'referenceLabId', props.index)
                                    : props.handleSelectChange('enzy', 'referenceLabId')
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

export default ENZYInput
