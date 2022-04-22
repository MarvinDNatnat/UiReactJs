import React from 'react'

import clsx from 'clsx';
import { makeStyles, Select } from '@material-ui/core';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
    CInput,
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

const MICROInput = (props) => {
    const classes = useStyles();

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl error={props.cmData.uchem.isRCBError} fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>RBC</CLabel>
                        <CInput
                            value={props.cmData.uchem.rbc}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('uchem', 'rbc', props.index)
                                    : props.handleChange('uchem', 'rbc')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong>/hpf</strong>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong>0-3</strong>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl error={props.cmData.uchem.isWBCError} fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>WBC</CLabel>
                        <CInput
                            value={props.cmData.uchem.wbc}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('uchem', 'wbc', props.index)
                                    : props.handleChange('uchem', 'wbc')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong>/hpf</strong>
                </CCol>
                <CCol md="1" className="p-1 mt-4">
                    <strong>0-5</strong>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>E.Cells</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.ecells) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'ecells', props.index)
                                    : props.handleSelectChange('uchem', 'ecells')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.microOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>M.Threads</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.mtreads) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'mtreads', props.index)
                                    : props.handleSelectChange('uchem', 'mtreads')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.microOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Bacteria</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.bacteria) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'bacteria', props.index)
                                    : props.handleSelectChange('uchem', 'bacteria')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.microOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Amorphous</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.amorphous) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'amorphous', props.index)
                                    : props.handleSelectChange('uchem', 'amorphous')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.microOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>CaOX</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.caox) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'caox', props.index)
                                    : props.handleSelectChange('uchem', 'caox')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.microOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default MICROInput
