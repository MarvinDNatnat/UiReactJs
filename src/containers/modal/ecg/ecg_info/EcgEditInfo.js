import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CInput,
    CRow, CCol
} from '@coreui/react';

import {
    FormControl,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(0)
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    rightAlign: {
        textAlign: 'right',
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const EcgEditInfo = (props) => {
    const classes = useStyles();
    return (
        <div>
            <CRow className="m-0 p-0">
                <CCol className="m-0 p-0">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Electrocardiograph Results</span>
                        </CCardHeader>

                        <CCardBody>
                            <CRow>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Rhythm</CLabel>
                                        <CInput
                                        value={props.ecgData.ecg.rhythm}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ecg', 'rhythm', props.index)
                                                : props.handleChange('ecg', 'rhythm')
                                        }
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>PR Interval</CLabel>
                                        <CInput
                                        value={props.ecgData.ecg.pr_interval}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ecg', 'pr_interval', props.index)
                                                : props.handleChange('ecg', 'pr_interval')
                                        }
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Rate Atrial</CLabel>
                                        <CInput
                                        value={props.ecgData.ecg.rate_atrial}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ecg', 'rate_atrial', props.index)
                                                : props.handleChange('ecg', 'rate_atrial')
                                        }
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Axis</CLabel>
                                        <CInput
                                        value={props.ecgData.ecg.axis}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ecg', 'axis', props.index)
                                                : props.handleChange('ecg', 'axis')
                                        }
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>P-Wave</CLabel>
                                        <CInput
                                        value={props.ecgData.ecg.p_wave}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ecg', 'p_wave', props.index)
                                                : props.handleChange('ecg', 'p_wave')
                                        }
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Ventricular</CLabel>
                                        <CInput
                                       value={props.ecgData.ecg.ventricular}
                                        onChange={
                                            props.index !== undefined && props.index !== null
                                                ? props.handleChange('ecg', 'ventricular', props.index)
                                                : props.handleChange('ecg', 'ventricular')
                                        }
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>INTERPRETATION</CLabel>
                                        <TextField
                                            multiline
                                            value={props.ecgData.ecg.interpretation}
                                            rows={2}
                                            variant="outlined"
                                            onChange={
                                                props.index !== undefined && props.index !== null
                                                    ? props.handleChange('ecg', 'interpretation', props.index)
                                                    : props.handleChange('ecg', 'interpretation')
                                            }
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>

                </CCol>

            </CRow>

        </div>
    )
}

export default EcgEditInfo;