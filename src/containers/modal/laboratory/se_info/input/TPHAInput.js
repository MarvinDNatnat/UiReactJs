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

const TPHAInput = (props) => {
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
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:80</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test1) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test1', props.index)
                                        : props.handleSelectChange('tphawt', 'test1')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:160</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test2) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test2', props.index)
                                        : props.handleSelectChange('tphawt', 'test2')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:320</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test3) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test3', props.index)
                                        : props.handleSelectChange('tphawt', 'test3')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:640</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test4) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test4', props.index)
                                        : props.handleSelectChange('tphawt', 'test4')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:1280</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test5) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test5', props.index)
                                        : props.handleSelectChange('tphawt', 'test5')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:2560</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test6) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test6', props.index)
                                        : props.handleSelectChange('tphawt', 'test6')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:5120</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test7) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test7', props.index)
                                        : props.handleSelectChange('tphawt', 'test7')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:10240</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test8) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test8', props.index)
                                        : props.handleSelectChange('tphawt', 'test8')
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
                    <CRow className="m-0 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>1:20480</CLabel>
                            <Select
                                native
                                value={JSON.stringify(props.seroData.tphawt.test9) || ''}
                                onChange={
                                    props.index !== undefined && props.index !== null
                                        ? props.handleSelectChange('tphawt', 'test9', props.index)
                                        : props.handleSelectChange('tphawt', 'test9')
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
                            defaultValue={JSON.stringify(props.seroData.tphawt.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('tphawt', 'referenceLabId', props.index)
                                    : props.handleSelectChange('tphawt', 'referenceLabId')
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

export default TPHAInput
