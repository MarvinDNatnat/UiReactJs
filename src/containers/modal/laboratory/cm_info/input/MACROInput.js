import React from 'react'

import clsx from 'clsx';
import { makeStyles, Select } from '@material-ui/core';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
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

const MACROInput = (props) => {
    const classes = useStyles();

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl error={props.cmData.uchem.isColorError} fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Color</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.color) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'color', props.index)
                                    : props.handleSelectChange('uchem', 'color')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.macroColor.map(color => 
                                    <option key={color.value} value={JSON.stringify(color)}>{color.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl error={props.cmData.uchem.isTransparencyError} fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Transparency</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.transparency) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'transparency', props.index)
                                    : props.handleSelectChange('uchem', 'transparency')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.macroTransparency.map(transparency => 
                                    <option key={transparency.value} value={JSON.stringify(transparency)}>{transparency.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default MACROInput
