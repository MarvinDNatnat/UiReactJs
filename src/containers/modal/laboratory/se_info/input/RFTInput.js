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

const RFTInput = (props) => {
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
                        <CCol md="7" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result 1</CLabel>
                                <Select
                                    native
                                    value={JSON.stringify(props.seroData.rft.first) || ''}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleSelectChange('rft', 'first', props.index)
                                            : props.handleSelectChange('rft', 'first')
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
                        </CCol>
                        <CCol md="5" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>1:1 (8.0 IU/L)</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="6" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="7" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result 2</CLabel>
                                <Select
                                    native
                                    value={JSON.stringify(props.seroData.rft.second) || ''}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleSelectChange('rft', 'second', props.index)
                                            : props.handleSelectChange('rft', 'second')
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
                        </CCol>
                        <CCol md="5" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>{'1:2 (16.0 IU/L)'}</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="6" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="7" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result 3</CLabel>
                                <Select
                                    native
                                    value={JSON.stringify(props.seroData.rft.third) || ''}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleSelectChange('rft', 'third', props.index)
                                            : props.handleSelectChange('rft', 'third')
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
                        </CCol>
                        <CCol md="5" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>1:4 (32.0 IU/L)</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="6" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="7" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result 4</CLabel>
                                <Select
                                    native
                                    value={JSON.stringify(props.seroData.rft.fourth) || ''}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleSelectChange('rft', 'fourth', props.index)
                                            : props.handleSelectChange('rft', 'fourth')
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
                        </CCol>
                        <CCol md="5" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>1:8 (64.0 IU/L)</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="6" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="7" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin="dense">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result 5</CLabel>
                                <Select
                                    native
                                    value={JSON.stringify(props.seroData.rft.fifth) || ''}
                                    onChange={
                                        props.index !== undefined && props.index !== null
                                            ? props.handleSelectChange('rft', 'fifth', props.index)
                                            : props.handleSelectChange('rft', 'fifth')
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
                        </CCol>
                        <CCol md="5" className="p-1 mt-4">
                            <strong className={clsx(classes.labelText)}>{'1:16 (128.0 IU/L)'}</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.seroData.rft.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('rft', 'referenceLabId', props.index)
                                    : props.handleSelectChange('rft', 'referenceLabId')
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

export default RFTInput
