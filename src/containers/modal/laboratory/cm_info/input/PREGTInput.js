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

const PREGTInput = (props) => {
    const classes = useStyles();

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="12" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Result</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.preg.result) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('preg', 'result', props.index)
                                    : props.handleSelectChange('preg', 'result')
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
            </CRow>
        </CCardBody>
    )
}

export default PREGTInput
