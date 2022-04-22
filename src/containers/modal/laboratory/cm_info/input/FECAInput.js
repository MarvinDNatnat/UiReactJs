import React from 'react'

import clsx from 'clsx';
import { makeStyles, Select} from '@material-ui/core';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
    CInput,
} from '@coreui/react';

import {
    FormControl
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

const FECAInput = (props) => {
    const classes = useStyles();
    
    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl className={clsx(classes.margin, "m-0 p-0")} fullWidth variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-0")}>Color</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.feca.color) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('feca', 'color', props.index)
                                    : props.handleSelectChange('feca', 'color')
                            }
                        >
                            <option value={JSON.stringify('')}> -- </option>
                            {
                                props.fecaColor.map(color =>
                                    <option key={color.value} value={JSON.stringify(color)}> {color.label}</option>
                                )}
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Consistency</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.feca.consistency) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('feca', 'consistency', props.index)
                                    : props.handleSelectChange('feca', 'consistency')
                            }
                        >
                            <option value={JSON.stringify('')}> -- </option>
                            {
                                props.fecaConsistency.map(consistency =>
                                <option key={consistency.value} value={JSON.stringify(consistency)}>{consistency.label}</option>
                            )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Microscopic Findings</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.feca.microscopicFindings) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('feca', 'microscopicFindings', props.index)
                                    : props.handleSelectChange('feca', 'microscopicFindings')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.microscopicFindings.map(findings =>
                                    <option key={findings.value} value={JSON.stringify(findings)}>{findings.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Notes</CLabel>
                        <CInput
                            value={props.cmData.feca.otherNotes}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('feca', 'otherNotes', props.index)
                                    : props.handleChange('feca', 'otherNotes')
                            }
                        />
                    </FormControl>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default FECAInput
