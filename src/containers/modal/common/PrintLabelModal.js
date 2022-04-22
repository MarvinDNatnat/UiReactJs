import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactSelect from 'react-select';

import {
    CButton,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CCol,
} from '@coreui/react';

import {
    FormControl,
    FormControlLabel,
    Checkbox, Switch
} from '@material-ui/core';

import { updateObject } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    }
}));

const PrintLabelModal = (props) => {
    const classes = useStyles();

    const [radTechSelect, setRadTechSelect] = useState([]);
    const [medTechSelect, setMedTechSelect] = useState([]);
    const [spaceControl, setSpaceControl] = useState(true)

    const spaceHandler = () => {
        setSpaceControl(!spaceControl)
    }

    const markerOptions = [
        { value: '11x14', label: '11x14' },
        { value: '10x12', label: '10x12' },
        { value: '14x17', label: '14x17' },
        { value: '8x10', label: '8x10' },
        { value: '14x14', label: '14x14' },
        { value: 'rtpcr', label: 'RTPCR' }
    ]

    const xrayTypes = [
        { value: 'CHEST PA', label: 'CHEST PA' },
        { value: 'APICOLORDOTIC', label: 'APICOLORDOTIC' },
        { value: 'FOOT AP/LAT', label: 'FOOT AP/LAT' },
        { value: 'KNEE JOINT', label: 'KNEE JOINT' },
        { value: 'PELVIS', label: 'PELVIS' },
        { value: 'HAND AP/O', label: 'HAND AP/O' },
        { value: 'WRIST AP/L', label: 'WRIST AP/L' },
        { value: 'RIBCAGE', label: 'RIBCAGE' },
        { value: 'FOREARM AP/L', label: 'FOREARM AP/L' },
        { value: 'PELVIMETRY', label: 'PELVIMETRY' },
        { value: 'ABDOMEN PLAIN', label: 'ABDOMEN PLAIN' },
        { value: 'SHOULDER', label: 'SHOULDER' },
        { value: 'LUMBO SACRAL', label: 'LUMBO SACRAL' },
        { value: 'CHEST AP/LAT', label: 'CHEST AP/LAT' },
        { value: 'THORACOLUMBAR', label: 'THORACOLUMBAR' },
        { value: 'ELBOW JOINT', label: 'ELBOW JOINT' },
        { value: 'CERVICAL SPINE', label: 'CERVICAL SPINE' },
        { value: 'SKULL AP/LAT', label: 'SKULL AP/LAT' },
        { value: 'CHEST BUCKY', label: 'CHEST BUCKY' },
        { value: 'RT-PCR', label: 'RT-PCR' },
        { value: 'RT-PCR TRAVELERS', label: 'RT-PCR TRAVELERS' },
        { value: 'ANKLE AP/LAT', label: 'ANKLE AP/LAT' },
        { value: 'LEFT FOOT AP/LAT', label: 'LEFT FOOT AP/LAT' },
        { value: 'RIGHT FOOT AP/LAT', label: 'RIGHT FOOT AP/LAT' },
        { value: 'LEFT SHOULDER AP', label: 'LEFT SHOULDER AP' },
        { value: 'RIGHT SHOULDER AP', label: 'RIGHT SHOULDER AP' },
        { value: 'LEFT HAND AP/LAT', label: 'LEFT HAND AP/LAT' },
        { value: 'RIGHT HAND AP/LAT', label: 'RIGHT HAND AP/LAT' },
        { value: 'FOREARM', label: 'FOREARM' },
        { value: 'PELVIC', label: 'PELVIC' },
        { value: 'CHEST PA/LATER', label: 'CHEST PA/LATER' },
        { value: 'CHEST AP VIEW', label: 'CHEST AP VIEW' },
        { value: 'LEFT SHOULDER', label: 'LEFT SHOULDER' },
        { value: 'RIGHT SHOULDER', label: 'RIGHT SHOULDER' },
    ]

    useEffect(() => {
        const radTechSelect = props.radTechList.map(radTech => ({
            value: radTech,
            label: radTech,
        }))
        setRadTechSelect(radTechSelect);

        const medTechSelect = props.medTechList.map(medTech => ({
            value: medTech,
            label: medTech,
        }))
        setMedTechSelect(medTechSelect);

    }, [props.radTechList, props.medTechList])

    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.printLabel(spaceControl);
        }
    }

    const handleCheckBox = (opt) => (event) => {
        const updateData = updateObject(props.printData, {
            [opt]: event.target.checked,
        });
        props.setTxnServicePrint(updateData);
    }

    const handleSelectChange = (prop) => (event) => {
        const updateData = updateObject(props.printData, {
            [prop]: event,
        });
        props.setTxnServicePrint(updateData);
    }


    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='lg'
        >
            <CModalHeader closeButton>
                <CModalTitle>Print Label</CModalTitle>
            </CModalHeader>

            <CModalBody>
                {
                    props.printData.title !== ''
                        ? <CRow>
                            <CCol md="12">
                                <strong>
                                    {props.printData.title}
                                </strong>
                            </CCol>
                        </CRow>
                        : null
                }
                <CRow>
                    <CCol md="2">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.printData.xray}
                                    onChange={handleCheckBox('xray')}
                                    name="checkedA"
                                    color="primary"
                                    className="p-0"
                                />
                            }
                            label="XRay"
                            className="m-0 mt-4"
                        />
                    </CCol>
                    <CCol md="3">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Radio Technician</CLabel>
                            <ReactSelect
                                className="basic-single"
                                placeholder="--"
                                value={props.printData.radTech}
                                onChange={handleSelectChange('radTech')}
                                isClearable={true}
                                isSearchable={false}
                                isLoading={false}
                                options={radTechSelect}
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="4">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>XRay Type</CLabel>
                            <ReactSelect
                                className="basic-single"
                                placeholder="--"
                                value={props.printData.xrayType}
                                onChange={handleSelectChange('xrayType')}
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false}
                                options={xrayTypes}
                            />
                        </FormControl>
                    </CCol>
                    <CCol md="3">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Film Size</CLabel>
                            <ReactSelect
                                className="basic-single"
                                placeholder="--"
                                value={props.printData.filmSize}
                                onChange={handleSelectChange('filmSize')}
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false}
                                options={markerOptions}
                            />
                        </FormControl>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="2">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.printData.specimen}
                                    onChange={handleCheckBox('specimen')}
                                    name="checkedB"
                                    color="primary"
                                    className="p-0"
                                />
                            }
                            label="Specimen"
                            className="m-0 mt-4"
                        />
                    </CCol>
                    <CCol md="4">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Laboratory Scientist</CLabel>
                            <ReactSelect
                                className="basic-single"
                                placeholder="--"
                                value={props.printData.medTech}
                                onChange={handleSelectChange('medTech')}
                                isClearable={true}
                                isSearchable={false}
                                isLoading={false}
                                options={medTechSelect}
                            />
                        </FormControl>
                    </CCol>
                </CRow>
            </CModalBody>

            <CModalFooter>
                <FormControlLabel
                    control={
                        <Switch
                            checked={spaceControl}
                            onChange={spaceHandler}
                            color="primary"
                        />
                    }
                    label="Print with Spacing"
                />
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={validateInputs}
                >Print</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default PrintLabelModal

