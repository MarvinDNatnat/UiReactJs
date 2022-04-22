import React from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
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

const TPNInput = (props) => {
    const classes = useStyles();
    let referenceAvilable = [];
    let referenceSelection = []
    props.referenceLab.map(reference => {
        reference.collectionItems.map(items => {
            if (props.seroData.itemId) {
                if (props.seroData.itemId === items.referenceLabItems.itemid) {
                    referenceAvilable.push(reference);
                }
            } else {
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

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>TROPONIN I (QUALITATIVE)</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tpn.result) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tpn', 'result', props.index)
                                        : props.handleSelectChange('tpn', 'result')
                                }
                            >
                                <option value={JSON.stringify('')}>--</option>
                                {
                                    props.npOptions.map(options =>
                                        <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </CRow>
                </CCol>
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.seroData.tpn.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('tpn', 'referenceLabId', props.index)
                                    : props.handleSelectChange('tpn', 'referenceLabId')
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

export default TPNInput
