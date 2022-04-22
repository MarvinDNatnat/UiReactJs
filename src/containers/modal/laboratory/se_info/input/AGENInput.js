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

const AGENInput = (props) => {
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
        return referenceSelection.push({ value: referenceSelectionList.referenceid, label: referenceSelectionList.name })
    });
    const classes = useStyles();

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="8" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Prostate Specific Antigen (PSA)</CLabel>
                                <CInput
                                    type="number"
                                    value={props.seroData.agen.prostateSpecificAntigen}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleChange('agen', 'prostateSpecificAntigen', props.index)
                                            : props.handleChange('agen', 'prostateSpecificAntigen')
                                    }
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1 mt-2">
                            <strong className={clsx(classes.labelText)}>{'ng/mL'} <br /> {'0-4'}</strong>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="8" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Carcenoembryonic Antigen</CLabel>
                                <CInput
                                    type="number"
                                    value={props.seroData.agen.carcenoembryonicAntigen}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleChange('agen', 'carcenoembryonicAntigen', props.index)
                                            : props.handleChange('agen', 'carcenoembryonicAntigen')
                                    }
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>ng/mL 0 - 5</strong>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="8" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Alpha-Fetoprotein</CLabel>
                                <CInput
                                    type="number"
                                    value={props.seroData.agen.alphaFetoprotein}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleChange('agen', 'alphaFetoprotein', props.index)
                                            : props.handleChange('agen', 'alphaFetoprotein')
                                    }
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>IU/mL 0.5-5.5</strong>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="8" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Cancer Antigen 125</CLabel>
                                <CInput
                                    type="number"
                                    value={props.seroData.agen.cancerAntigen125}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleChange('agen', 'cancerAntigen125', props.index)
                                            : props.handleChange('agen', 'cancerAntigen125')
                                    }
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>U/mL 0 - 35</strong>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="8" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Cancer Antigen 19-9</CLabel>
                                <CInput
                                    type="number"
                                    value={props.seroData.agen.cancerAntigen199}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleChange('agen', 'cancerAntigen199', props.index)
                                            : props.handleChange('agen', 'cancerAntigen199')
                                    }
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>U/mL 0 - 39</strong>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol md="4" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="8" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Cancer Antigen 15-3</CLabel>
                                <CInput
                                    type="number"
                                    value={props.seroData.agen.cancerAntigen153}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleChange('agen', 'cancerAntigen153', props.index)
                                            : props.handleChange('agen', 'cancerAntigen153')
                                    }
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>U/mL 0 - 25</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.seroData.agen.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('agen', 'referenceLabId', props.index)
                                    : props.handleSelectChange('agen', 'referenceLabId')
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

export default AGENInput
