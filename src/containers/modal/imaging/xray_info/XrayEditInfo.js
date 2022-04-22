import React, { useState } from 'react';
import ReactSelect from 'react-select';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { updateObject } from 'src/store/utility';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CButton,
    CCollapse,
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

const docRamTemp = 'No abnormal densities seen in both lung parenchyma. The heart is normal in size and configuration. Aorta is unremarkable. The diaphragms, costrophrenic sulci and bony throrax are intact.'
const docPachTemp = 'Lung fields are clear. Heart is not enlarged. Diaphragm, its sulci visualized bone are intact.'

const XrayEditInfo = (props) => {
    const classes = useStyles();

    const remarksOptions = [
        { value: true, label: 'For Recommendation' },
        { value: false, label: 'Normal' }
    ]

    const handleChange = (opt, prop) => (event) => {
        const updateXrayData = updateObject(props.xrayData, {
            [opt]: updateObject(props.xrayData[opt], {
                [prop]: event.target.value,
            })
        });

        props.setXrayData(updateXrayData);
    };

    const handleRadioChange = (opt, prop) => (event) => {
        let xrTemp = ''
        let xrayImpression = ''
        if (event !== null) {
            if (event.value === 'fiTylOrxCL') xrTemp = docRamTemp
            if (event.value === 'Ym76l2G2Mx') xrTemp = docPachTemp
            if (event.value === 'Ym76l2G2Mx' || event.value === 'fiTylOrxCL') xrayImpression = 'NORMAL CHEST FINDINGS'
        }

        const updateXrayData = updateObject(props.xrayData, {
            [opt]: updateObject(props.xrayData[opt], {
                [prop]: event,
                findings: xrTemp,
                impressions: xrayImpression,
            })
        });

        props.setXrayData(updateXrayData);
    }

    const handleSelectChange = (opt, prop) => (event) => {

        
        const updateXrayData = updateObject(props.xrayData, {
            [opt]: updateObject(props.xrayData[opt], {
                [prop]: event,
            })
        });

        props.setXrayData(updateXrayData);
    }

    const [collapse, setCollapse] = useState(false);
    const toggle = (e) => {
        setCollapse(!collapse);
        e.preventDefault();
    }

    return (
        <div>
            <CRow className="m-0 p-0">
                <CCol className="m-0 p-0">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Radiology Results</span>
                        </CCardHeader>

                        <CCardBody>
                            <FormControl error={props.xrayData.xray.isFindingsError} fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                <TextField
                                    name="findings"
                                    label="Findings"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    value={props.xrayData.xray.findings}
                                    onChange={handleChange('xray', 'findings')}
                                />
                            </FormControl>

                            <FormControl error={props.xrayData.xray.isImpressionsError} fullWidth className={clsx(classes.margin, "m-0 p-0 mb-3")} variant="outlined">
                                <TextField
                                    name="impressions"
                                    label="Impressions"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    value={props.xrayData.xray.impressions}
                                    onChange={handleChange('xray', 'impressions')}
                                />
                            </FormControl>

                            <CRow>
                                <CCol>
                                    <CButton onClick={toggle} className="mb-1 border float-right">
                                        Normal Chest Findings Templates
                            </CButton>
                                </CCol>
                                <CCollapse show={collapse}>
                                    <CCol>
                                        <div className="font-weight-bold">DOC RAMIREZ NORMAL CHEST TEMPLATE</div>
                                        <p>
                                            No abnormal densities seen in both lung parenchyma.
                                            The heart is normal in size and configuration.
                                            Aorta is unremarkable. The diaphragms,
                                            costrophrenic sulci and bony throrax are intact.
                                </p>

                                        <div className="font-weight-bold">DOC PACHECO NORMAL CHEST TEMPLATE</div>
                                        <p>
                                            Lung fields are clear.
                                            Heart is not enlarged.
                                            Diaphragm, its sulci visualized bone are intact.
                                </p>
                                    </CCol>

                                </CCollapse>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow className="m-0 p-0">
                <CCol className="m-0 p-0">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Imaging Personnel</span>
                        </CCardHeader>

                        <CCardBody>
                            <FormControl error={props.xrayData.xray.isRadiologistError} className={clsx(classes.margin, "col-5 m-0 p-0 mr-1")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Radiologist</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.xrayData.xray.radiologist}
                                    onChange={handleRadioChange('xray', 'radiologist')}
                                    isClearable={true}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={props.doctorSelect}
                                    menuPlacement="bottom"
                                />
                            </FormControl>
                            <FormControl error={props.xrayData.xray.isRemarksError} className={clsx(classes.margin, "col-3  m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Remarks</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.xrayData.xray.remarks}
                                    onChange={handleSelectChange('xray', 'remarks')}
                                    isClearable={true}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={remarksOptions}
                                />
                            </FormControl>

                        </CCardBody>
                    </CCard>
                </CCol>

            </CRow>

        </div>
    )
}

export default XrayEditInfo;