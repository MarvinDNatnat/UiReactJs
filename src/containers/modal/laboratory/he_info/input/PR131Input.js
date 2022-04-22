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

const PR131Input = (props) => {
    const classes = useStyles();

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="12" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>PR 1.31</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.pr131.result}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('pr131', 'result', props.index)
                                    : props.handleChange('pr131', 'result')
                            }
                        />
                    </FormControl>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default PR131Input
