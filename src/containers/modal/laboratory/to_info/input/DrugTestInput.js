import React from 'react'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
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

const DrugTestInput = (props) => {
    const classes = useStyles();

    return (
        <CRow className="ml-1 mr-1 p-0">
            <CCol md="3" className="p-1">
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Methamphethamine</CLabel>
                    <Select
                        native
                        value={JSON.stringify(props.toxiData.toxi.metha) || ''}
                        onChange={
                            props.index !== undefined && props.index !== null
                                ? props.handleSelectChange('toxi', 'metha', props.index)
                                : props.handleSelectChange('toxi', 'metha')
                        }
                    >
                        <option value={JSON.stringify('')}> -- </option>
                        {
                            props.npOptions.map(options =>
                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                            )
                        }
                    </Select>
                </FormControl>
            </CCol>
            <CCol md="3" className="p-1">
                <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Tetrahydrocanabinol</CLabel>
                    <Select
                        native
                        value={JSON.stringify(props.toxiData.toxi.tetra) || ''}
                        onChange={
                            props.index !== undefined && props.index !== null
                                ? props.handleSelectChange('toxi', 'tetra', props.index)
                                : props.handleSelectChange('toxi', 'tetra')
                        }
                    >
                        <option value={JSON.stringify('')}> -- </option>
                        {
                            props.npOptions.map(options =>
                                <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                            )
                        }
                    </Select>
                </FormControl>
            </CCol>
        </CRow>
    )
}

export default DrugTestInput
