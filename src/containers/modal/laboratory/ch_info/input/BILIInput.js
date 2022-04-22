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

const BILIInput = (props) => {
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
        return null;
    });

    referenceAvilable.map(referenceSelectionList => {
        return referenceSelection.push({ value: referenceSelectionList.referenceid, label: referenceSelectionList.name })
    });
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Total (Adult)</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.bili.totalAdult}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('bili', 'totalAdult', props.index)
                                    : props.handleChange('bili', 'totalAdult')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'umol/L'}</strong>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'5 - 21'}</strong>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Direct</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.bili.direct}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('bili', 'direct', props.index)
                                    : props.handleChange('bili', 'direct')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'umol/L'}</strong>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'0 - 6.9'}</strong>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Indirect</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.bili.indirect}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('bili', 'indirect', props.index)
                                    : props.handleChange('bili', 'indirect')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'umol/L'}</strong>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'5 - 14.1'}</strong>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
            <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.chemData.bili.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('bili', 'referenceLabId', props.index)
                                    : props.handleSelectChange('bili', 'referenceLabId')
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

export default BILIInput
