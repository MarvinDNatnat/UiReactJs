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

const HIVInput = (props) => {
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
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Test 1</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.seroData.hiv.test1) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('hiv', 'test1', props.index)
                                    : props.handleSelectChange('hiv', 'test1')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.rnOptions.map(options =>
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Test 2</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.seroData.hiv.test2) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('hiv', 'test2', props.index)
                                    : props.handleSelectChange('hiv', 'test2')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.rnOptions.map(options =>
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
                            defaultValue={JSON.stringify(props.seroData.hiv.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('hiv', 'referenceLabId', props.index)
                                    : props.handleSelectChange('hiv', 'referenceLabId')
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

export default HIVInput
