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

const UCHEMInput = (props) => {
   
    const classes = useStyles();

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>pH</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.ph) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'ph', props.index)
                                    : props.handleSelectChange('uchem', 'ph')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.phOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Sp. Gravity</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.spGravity) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'spGravity', props.index)
                                    : props.handleSelectChange('uchem', 'spGravity')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.spGravityOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Protein</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.protien) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'protien', props.index)
                                    : props.handleSelectChange('uchem', 'protien')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.uchemOptions.map(options =>
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Glucose</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.glucose) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'glucose', props.index)
                                    : props.handleSelectChange('uchem', 'glucose')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.uchemOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Leukocyte Esterase</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.leukocyteEsterase) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'leukocyteEsterase', props.index)
                                    : props.handleSelectChange('uchem', 'leukocyteEsterase')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.uchemOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Nitrite</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.nitrite) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'nitrite', props.index)
                                    : props.handleSelectChange('uchem', 'nitrite')
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
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Urobilinogen</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.urobilinogen) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'urobilinogen', props.index)
                                    : props.handleSelectChange('uchem', 'urobilinogen')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.uchemOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Blood</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.blood) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'blood', props.index)
                                    : props.handleSelectChange('uchem', 'blood')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.uchemOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Ketone</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.ketone) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'ketone', props.index)
                                    : props.handleSelectChange('uchem', 'ketone')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.uchemOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Bilirubin</CLabel>
                        <Select
                            native
                            value={JSON.stringify(props.cmData.uchem.bilirubin) || ''}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('uchem', 'bilirubin', props.index)
                                    : props.handleSelectChange('uchem', 'bilirubin')
                            }
                        >
                            <option value={JSON.stringify('')}>--</option>
                            {
                                props.uchemOptions.map(options => 
                                    <option key={options.value} value={JSON.stringify(options)}>{options.label}</option>
                                    )
                            }
                        </Select>
                    </FormControl>
                </CCol>
                <CCol md="6" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Notes</CLabel>
                        <CInput
                            value={props.cmData.uchem.otherNotes}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('uchem', 'otherNotes', props.index)
                                    : props.handleChange('uchem', 'otherNotes')
                            }
                        />
                    </FormControl>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default UCHEMInput
