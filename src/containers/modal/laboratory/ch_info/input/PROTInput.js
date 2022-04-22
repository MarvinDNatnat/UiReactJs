import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCol,
    CRow,
    CLabel,
    CInput, CCardBody
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

const PROTInput = (props) => {
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

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Total Protein</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.prot.totalProtein}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('prot', 'totalProtein', props.index)
                                    : props.handleChange('prot', 'totalProtein')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'g/L'}</strong>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'62-80'}</strong>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Albumin</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.prot.albumin}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('prot', 'albumin', props.index)
                                    : props.handleChange('prot', 'albumin')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'g/L'}</strong>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'35-50'}</strong>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Globulin</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.prot.globulin}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('prot', 'globulin', props.index)
                                    : props.handleChange('prot', 'globulin')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'g/L'}</strong>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>{'27-30'}</strong>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2 text-nowrap")}>Albumin - Globulin Ratio</CLabel>
                        <CInput
                            type="number"
                            value={props.chemData.prot.agRatio}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('prot', 'agRatio', props.index)
                                    : props.handleChange('prot', 'agRatio')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="6" className="p-1 mt-4">
                    <strong className={clsx(classes.labelText)}>1.24 - 1.67</strong>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
            <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.chemData.prot.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('prot', 'referenceLabId', props.index)
                                    : props.handleSelectChange('prot', 'referenceLabId')
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

export default PROTInput
