import React from 'react'

import clsx from 'clsx';
import { makeStyles, Select } from '@material-ui/core';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
    CInput
} from '@coreui/react';

import {
    FormControl
} from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.css';

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

const RCTInput = (props) => {
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
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.rct.result}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('rct', 'result', props.index)
                                    : props.handleChange('rct', 'result')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 mt-4">
                            <strong className={clsx(classes.labelText)}>0.5-1.5%</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.hemaData.rct.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('rct', 'referenceLabId', props.index)
                                    : props.handleSelectChange('rct', 'referenceLabId')
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

export default RCTInput
