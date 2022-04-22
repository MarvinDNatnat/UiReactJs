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
    Select
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

const CBCInput = (props) => {
    const classes = useStyles();

    let referenceAvilable = [];
    let referenceSelection = []
    props.referenceLab.map(reference => {
        reference.collectionItems.map(items => {
            if (props.hemaData.itemId) {
                if (props.hemaData.itemId === items.referenceLabItems.itemid) {
                    referenceAvilable.push(reference);
                }
            } else {
                if (props.hemaData.itemDetails.itemid === items.referenceLabItems.itemid) {
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
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>White Blood Cells</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.whiteBloodCells}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'whiteBloodCells', props.index)
                                    : props.handleChange('cbc', 'whiteBloodCells')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>% x10^9/L</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>4.23~11.07</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Basophils</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.basophils}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'basophils', props.index)
                                    : props.handleChange('cbc', 'basophils')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>%</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>0.00~1.00</strong>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Neutrophils</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.neutrophils}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'neutrophils', props.index)
                                    : props.handleChange('cbc', 'neutrophils')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>%</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>34.00~71.00</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Red Blood Cells</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.redBloodCells}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'redBloodCells', props.index)
                                    : props.handleChange('cbc', 'redBloodCells')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>x10 ^6/L</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>4.32~5.72</strong>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Lymphocytes</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.lymphocytes}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'lymphocytes', props.index)
                                    : props.handleChange('cbc', 'lymphocytes')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>%</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>22.00~53.00</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Hemoglobin</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.hemoglobin}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'hemoglobin', props.index)
                                    : props.handleChange('cbc', 'hemoglobin')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 mt-4">
                            <strong className={clsx(classes.labelText)}>g/L</strong>
                        </CCol>
                        <CCol md="7" className="p-0 mt-3">
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>M: 137.00~175.00</strong>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>F: 112.00~157.00</strong>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Monocytes</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.monocytes}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'monocytes', props.index)
                                    : props.handleChange('cbc', 'monocytes')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>%</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>5.00~12.00</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Hematocrit</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.hematocrit}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'hematocrit', props.index)
                                    : props.handleChange('cbc', 'hematocrit')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 mt-3">
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>Vol.</strong>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>Fraction</strong>
                            </CRow>
                        </CCol>
                        <CCol md="7" className="p-0 mt-3">
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>M: 0.40~0.51</strong>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <strong className={clsx(classes.labelText)}>F: 0.34~0.45</strong>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Eosinophils</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.eosinophils}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'eosinophils', props.index)
                                    : props.handleChange('cbc', 'eosinophils')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>%</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>1.00~7.00</strong>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md="3" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Platelet</CLabel>
                        <CInput
                            type="number"
                            value={props.hemaData.cbc.platelet}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleChange('cbc', 'platelet', props.index)
                                    : props.handleChange('cbc', 'platelet')
                            }
                        />
                    </FormControl>
                </CCol>
                <CCol md="3" className="p-1 mt-4">
                    <CRow className="m-0 p-0">
                        <CCol md="5" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>x10^3/mm3</strong>
                        </CCol>
                        <CCol md="7" className="p-0 m-0">
                            <strong className={clsx(classes.labelText)}>150~400</strong>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined" margin='dense'>
                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Reference Laboratory</CLabel>
                        <Select
                            native
                            defaultValue={JSON.stringify(props.hemaData.cbc.referenceLabId) || ""}
                            onChange={
                                props.index !== undefined && props.index !== null
                                    ? props.handleSelectChange('cbc', 'referenceLabId', props.index)
                                    : props.handleSelectChange('cbc', 'referenceLabId')
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

export default CBCInput
