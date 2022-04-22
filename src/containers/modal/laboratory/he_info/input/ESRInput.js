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
    Select,
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

const ESRInput = (props) => {
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
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Rate</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.esr.rate}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('esr', 'rate', props.index)
                                    : props.handleChange('esr', 'rate')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 mt-4">
                            <strong className={clsx(classes.labelText)}>mm/hr</strong>
                        </CCol>
                        <CCol md="7" className="p-0 mt-3">
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>M: 0~15 mm/hr</strong>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>F: 1~20 mm/hr</strong>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>ESR Method</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.hemaData.esr.esrMethod) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('esr', 'esrMethod', props.index)
                                    : props.handleSelectChange('esr', 'esrMethod')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.esrMethod.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
            <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.hemaData.esr.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('esr', 'referenceLabId', props.index)
                                    : props.handleSelectChange('esr', 'referenceLabId')
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

export default ESRInput
