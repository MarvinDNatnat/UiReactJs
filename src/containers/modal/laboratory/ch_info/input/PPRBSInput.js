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

const PPRBSInput = (props) => {
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

    let pprbsconv = '0.00'
    if (props.chemData.pprbs.conventional !== '') pprbsconv = props.chemData.pprbs.conventional

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.pprbs.result}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('pprbs', 'result', props.index)
                                    : props.handleChange('pprbs', 'result')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="2" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'mmol/L'}</strong>
                </CCol>
                <CCol md="2" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'< 7.7'}</strong>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Conventional</CLabel><br />
                    <CLabel className={"mb-0 ml-2 font-weight-bold"}>{pprbsconv}</CLabel>
                    <CLabel className={"mb-0 ml-2"}>mg/dl</CLabel>
                </CCol>
                <CCol md="2" className="p-1 mt-3">
                    <strong className={clsx(classes.labelText)}>{'< 140'}</strong>
                </CCol>

                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.chemData.rbs.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('rbs', 'referenceLabId', props.index)
                                    : props.handleSelectChange('rbs', 'referenceLabId')
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

export default PPRBSInput
