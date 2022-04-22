import React from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

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
    },

}));

const RTANTIGENInput = (props) => {
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
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Date Collection</CLabel>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DateTimePicker
                            value={props.seroData.rtantigen.collectionDate}
                            format={"YYYY-MM-DD HH:mm"}
                            inputVariant="outlined"
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleDateChangeHandler('rtantigen', 'collectionDate', props.index)
                                    : props.handleDateChangeHandler('rtantigen', 'collectionDate')
                            }
                            showTodayButton
                            disableFuture
                            size="small"
                        />
                    </MuiPickersUtilsProvider>
                    </FormControl>
                </CCol>
                 
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>SARS-Cov2 Ag</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.seroData.rtantigen.cov_ag) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('rtantigen', 'cov_ag', props.index)
                                    : props.handleSelectChange('rtantigen', 'cov_ag')
                            }
                        >
                            <option value={JSON.stringify('')}> -- </option>
                            {
                                props.rnOptions.map(options =>
                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                            )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Purpose</CLabel>
                        <CInput
                            value={props.seroData.rtantigen.purpose}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('rtantigen', 'purpose', props.index)
                                    : props.handleChange('rtantigen', 'purpose')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.seroData.rtantigen.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('rtantigen', 'referenceLabId', props.index)
                                    : props.handleSelectChange('rtantigen', 'referenceLabId')
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

export default RTANTIGENInput

