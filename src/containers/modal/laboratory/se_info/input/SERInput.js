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
    FormControl,
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

const SERInput = (props) => {
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
        return referenceSelection.push({ value: referenceSelectionList.referenceid, label: referenceSelectionList.name })
    });

    let specificTest = "";
    if (props.seroData.specificTest !== undefined) {
        specificTest = props.seroData.specificTest
    } else {
        specificTest = props.seroData.itemDetails.specificTest
    }
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("HBSAG") ?
                        <>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>HBsAg</CLabel>
                                    <Select
                                        native
                                        defaultValue={JSON.stringify(props.seroData.ser.hbsag) || ""}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'hbsag', props.index)
                                                : props.handleSelectChange('ser', 'hbsag')
                                        }
                                    >
                                        <option value={""}>--</option>
                                        {
                                            props.rnOptions.map(options =>
                                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </CCol>
                        </> : null
                }
                {
                    specificTest.includes("ANTIHAV") ?
                        <>
                        <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Patient's Abs</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.abs}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'abs', props.index)
                                                : props.handleChange('ser', 'abs')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>CUT OFF VALUE</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.cutOffValue}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'cutOffValue', props.index)
                                                : props.handleChange('ser', 'cutOffValue')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Anti-HAV</CLabel>
                                    <Select
                                        native
                                        defaultValue={JSON.stringify(props.seroData.ser.antihav) || ""}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'antihav', props.index)
                                                : props.handleSelectChange('ser', 'antihav')
                                        }
                                    >
                                        <option value={""}>--</option>
                                        {
                                            props.rnOptions.map(options =>
                                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </CCol>
                        </> : null
                }
                {
                    specificTest.includes("ANTIHCV") ?
                        <>
                        <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Patient's Abs</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.abs}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'abs', props.index)
                                                : props.handleChange('ser', 'abs')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>CUT OFF VALUE</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.cutOffValue}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'cutOffValue', props.index)
                                                : props.handleChange('ser', 'cutOffValue')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Anti-HCV</CLabel>
                                    <Select
                                        native
                                        defaultValue={JSON.stringify(props.seroData.ser.antihcv) || ""}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'antihcv', props.index)
                                                : props.handleSelectChange('ser', 'antihcv')
                                        }
                                    >
                                        <option value={""}>--</option>
                                        {
                                            props.rnOptions.map(options =>
                                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </CCol>
                        </> : null
                }
                {
                    specificTest.includes("VDRLRPR") ?
                        <>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>VDRL/RPR</CLabel>
                                    <Select
                                        native
                                        defaultValue={JSON.stringify(props.seroData.ser.vdrlrpr) || ""}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'vdrlrpr', props.index)
                                                : props.handleSelectChange('ser', 'vdrlrpr')
                                        }
                                    >
                                        <option value={""}>--</option>
                                        {
                                            props.rnOptions.map(options =>
                                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("ANTIHBS") ?
                        <>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Anti-HBS</CLabel>
                                    <Select
                                        native
                                        defaultValue={JSON.stringify(props.seroData.ser.antihbs) || ""}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'antihbs', props.index)
                                                : props.handleSelectChange('ser', 'antihbs')
                                        }
                                    >
                                        <option value={""}>--</option>
                                        {
                                            props.rnOptions.map(options =>
                                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </CCol>
                        </> : null
                }
                {
                    specificTest.includes("HBEAG") ?
                        <>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Patient's Abs</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.abs}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'abs', props.index)
                                                : props.handleChange('ser', 'abs')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>CUT OFF VALUE</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.cutOffValue}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'cutOffValue', props.index)
                                                : props.handleChange('ser', 'cutOffValue')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>RESULT</CLabel>
                                    <Select
                                        native
                                        defaultValue={JSON.stringify(props.seroData.ser.hbeag) || ""}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'hbeag', props.index)
                                                : props.handleSelectChange('ser', 'hbeag')
                                        }
                                    >
                                        <option value={""}>--</option>
                                        {
                                            props.rnOptions.map(options =>
                                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </CCol>
                        </> : null
                }
                {
                    specificTest.includes("ANTIHBE") ?
                        <>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Patient's Abs</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.abs}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'abs', props.index)
                                                : props.handleChange('ser', 'abs')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>CUT OFF VALUE</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.cutOffValue}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'cutOffValue', props.index)
                                                : props.handleChange('ser', 'cutOffValue')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>RESULT</CLabel>
                                    <Select
                                        native
                                        defaultValue={JSON.stringify(props.seroData.ser.antihbe) || ""}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'antihbe', props.index)
                                                : props.handleSelectChange('ser', 'antihbe')
                                        }
                                    >
                                        <option value={""}>--</option>
                                        {
                                            props.rnOptions.map(options =>
                                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </CCol>
                        </> : null
                }
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                {
                    specificTest.includes("ANTIHBC") ?
                        <>
                        <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Patient's Abs</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.abs}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'abs', props.index)
                                                : props.handleChange('ser', 'abs')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>CUT OFF VALUE</CLabel>
                                    <CInput
                                        type="text"
                                        value={props.seroData.ser.cutOffValue}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ser', 'cutOffValue', props.index)
                                                : props.handleChange('ser', 'cutOffValue')
                                        }
                                    />
                                </FormControl>
                            </CCol>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Anti-Hbc</CLabel>
                                    <Select
                                        native
                                        value={JSON.stringify(props.seroData.ser.antihbc) || ''}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'antihbc', props.index)
                                                : props.handleSelectChange('ser', 'antihbc')
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
                        </> : null
                }
                {
                    specificTest.includes("TPPA") ?
                        <>
                            <CCol md="4" className="p-1">
                                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>TPPA</CLabel>
                                    <Select
                                        native
                                        value={JSON.stringify(props.seroData.ser.tppa) || ''}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleSelectChange('ser', 'tppa', props.index)
                                                : props.handleSelectChange('ser', 'tppa')
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
                        </> : null
                }
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Pregnancy Test</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.seroData.ser.pregnancyTest) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('ser', 'pregnancyTest', props.index)
                                    : props.handleSelectChange('ser', 'pregnancyTest')
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
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.seroData.ser.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('ser', 'referenceLabId', props.index)
                                    : props.handleSelectChange('ser', 'referenceLabId')
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

export default SERInput
