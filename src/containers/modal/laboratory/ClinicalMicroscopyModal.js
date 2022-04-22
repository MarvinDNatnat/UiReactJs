import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { updateObject } from 'src/store/utility';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

    CCard,
    CCardHeader,
    CCardBody,
    CContainer,
    CCol,
    CRow,
    CLabel,
    CInput,
} from '@coreui/react';

import {
    FormControl,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { doctorName, labPersonName } from 'src/store/utility';

import PatientInformation from 'src/containers/common/PatientInformation';

import MACROView from './cm_info/view/MACROView';
import MICROView from './cm_info/view/MICROView';
import UCHEMView from './cm_info/view/UCHEMView';
import FECAView from './cm_info/view/FECAView';
import PREGTView from './cm_info/view/PREGTView';
import AFBView from './cm_info/view/AFBView';
import OBTView from './cm_info/view/OBTView';

import MACROInput from './cm_info/input/MACROInput';
import MICROInput from './cm_info/input/MICROInput';
import UCHEMInput from './cm_info/input/UCHEMInput';
import FECAInput from './cm_info/input/FECAInput';
import PREGTInput from './cm_info/input/PREGTInput';
import AFBInput from './cm_info/input/AFBInput';
import OBTInput from './cm_info/input/OBTInput';
import DoctorCard from 'src/containers/common/DoctorCard';
import MedTechCard from 'src/containers/common/MedTechCard';
import QualityControlCard from 'src/containers/common/QualityControlCard';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(0),
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

const ClinicalMicroscopyModal = (props) => {
    const classes = useStyles();
    const [headerControl, setHeaderControl] = useState(true)

    const headerHandler = () => {
        setHeaderControl(!headerControl)
    }

    const macroColor = [
        { value: 'STR', label: 'STRAW' },
        { value: 'LYW', label: 'LIGHT YELLOW' },
        { value: 'YLW', label: 'YELLOW' },
        { value: 'DYW', label: 'DARK YELLOW' },
        { value: 'RED', label: 'RED' },
        { value: 'ORG', label: 'ORANGE' },
        { value: 'AMB', label: 'AMBER' },
    ];
    const macroTransparency = [
        { value: 'CLR', label: 'CLEAR' },
        { value: 'HZY', label: 'HAZY' },
        { value: 'SLT', label: 'SL. TURBID' },
        { value: 'TBD', label: 'TURBID' },
    ];
    const microOptions = [
        { value: 'NON', label: 'NONE' },
        { value: 'RAR', label: 'RARE' },
        { value: 'FEW', label: 'FEW' },
        { value: 'MOD', label: 'MODERATE' },
        { value: 'MNY', label: 'MANY' },
    ];
    const phOptions = [
        { value: '5.0', label: '5.0' },
        { value: '5.5', label: '5.5' },
        { value: '6.0', label: '6.0' },
        { value: '6.5', label: '6.5' },
        { value: '7.0', label: '7.0' },
        { value: '7.5', label: '7.5' },
        { value: '8.0', label: '8.0' },
        { value: '8.5', label: '8.5' },
        { value: '9.0', label: '9.0' },
        { value: '9.5', label: '9.5' },
    ];
    const spGravityOptions = [
        { value: '1.000', label: '1.000' },
        { value: '1.005', label: '1.005' },
        { value: '1.010', label: '1.010' },
        { value: '1.015', label: '1.015' },
        { value: '1.020', label: '1.020' },
        { value: '1.025', label: '1.025' },
        { value: '1.030', label: '1.030' },
    ];
    const uchemOptions = [
        { value: 'NEG', label: 'NEGATIVE' },
        { value: 'TRA', label: 'TRACE' },
        { value: 'P1', label: '1+' },
        { value: 'P2', label: '2+' },
        { value: 'P3', label: '3+' },
        { value: 'P4', label: '4+' },
    ];
    const npOptions = [
        { value: true, label: 'POSITIVE' },
        { value: false, label: 'NEGATIVE' },
    ];
    const fecaColor = [
        { value: 'DBRN', label: 'DARK BROWN' },
        { value: 'BRN', label: 'BROWN' },
        { value: 'LBRN', label: 'LIGHT BROWN' },
        { value: 'YLW', label: 'YELLOW' },
        { value: 'GRN', label: 'GREEN' },
        { value: 'RED', label: 'RED' },
    ];
    const fecaConsistency = [
        { value: 'FRM', label: 'FORMED' },
        { value: 'SFRM', label: 'SEMI-FORMED' },
        { value: 'SFT', label: 'SOFT' },
        { value: 'WTR', label: 'WATERY' },
        { value: 'SMCD', label: 'SLIGHTLY MUCOID' },
        { value: 'MCD', label: 'MUCOID' },
    ];

    const microscopicFindings = [
        { value: 'N/A', label: 'N/A' },
        { value: 'NO OVA OR PARASITE SEEN', label: 'NO OVA OR PARASITE SEEN' },
        { value: 'PRESENCE OF:', label: 'PRESENCE OF:' },
    ];

    const [macroInfo, setMacroInfo] = useState(null);
    const [microInfo, setMicroInfo] = useState(null);
    const [uchemInfo, setUchemInfo] = useState(null);
    const [fecaInfo, setFecaInfo] = useState(null);
    const [pregInfo, setPregInfo] = useState(null);
    const [afbInfo, setAfbInfo] = useState(null);
    const [obtInfo, setObtInfo] = useState(null);

    const [doctorSelect, setDoctorSelect] = useState([])

    useEffect(() => {
        const docSelect = props.doctorList.map(doctor => ({
            value: doctor.doctorid,
            label: doctorName(doctor),
            license: doctor.licenseNumber
        }))
        setDoctorSelect(docSelect)

    }, [props.doctorList])

    const handleChange = (opt, prop) => (event) => {
        const updateCMData = updateObject(props.cmData, {
            [opt]: updateObject(props.cmData[opt], {
                [prop]: event.target.value,
            })
        });

        props.setCMData(updateCMData);
    };

    const handleSelectChange = (opt, prop) => (event) => {
        event.persist()
        let additional = {}
        let noteFeca = '';
        if (opt === 'feca') {
            if (prop === 'microscopicFindings') {
                if (event != null) {
                    if (JSON.parse(event.target.value).value === 'NO OVA OR PARASITE SEEN') {
                        noteFeca  = 'NORMAL'
                    } else {
                        noteFeca =  ''
                    }
                }
            }
            additional.otherNotes = noteFeca;
        }
        const updateCMData = updateObject(props.cmData, {
            [opt]: updateObject(props.cmData[opt], {
                [prop]: JSON.parse(event.target.value),
                ...additional
            })
        });

        props.setCMData(updateCMData);
    }

    useEffect(() => {
        const serviceRequest = props.cmData.serviceRequest;

        setMacroInfo(null)
        setMicroInfo(null)
        setUchemInfo(null)
        setFecaInfo(null)
        setPregInfo(null)
        setAfbInfo(null)
        setObtInfo(null)

        if (serviceRequest.length > 0) {
            serviceRequest.map((srv) => {
                switch (srv.laboratoryRequest) {
                    case 'UCHEM':
                        const macroCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Physical/Macroscopic</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <MACROView cmData={props.cmData} />
                                            : <MACROInput
                                                cmData={props.cmData}
                                                handleSelectChange={handleSelectChange}
                                                macroColor={macroColor}
                                                macroTransparency={macroTransparency}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setMacroInfo(macroCard);
                        const microCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Microscopic</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <MICROView cmData={props.cmData} />
                                            : <MICROInput
                                                cmData={props.cmData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                microOptions={microOptions}
                                            />
                                            //end microCard
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setMicroInfo(microCard);
                        const uchemCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Urine Chemical</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <UCHEMView cmData={props.cmData} />
                                            : <UCHEMInput
                                                cmData={props.cmData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                uchemOptions={uchemOptions}
                                                phOptions={phOptions}
                                                npOptions={npOptions}
                                                spGravityOptions={spGravityOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setUchemInfo(uchemCard);
                        break;

                    case 'FECA':
                        const fecaCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Fecalysis</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <FECAView cmData={props.cmData} />
                                            : <FECAInput
                                                cmData={props.cmData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                fecaColor={fecaColor}
                                                microscopicFindings={microscopicFindings}
                                                fecaConsistency={fecaConsistency}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setFecaInfo(fecaCard);
                        break;

                    case 'PREGT':
                        const pregCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Pregnancy Test ({props.cmData.laboratorySpecimen})</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <PREGTView cmData={props.cmData} />
                                            : <PREGTInput
                                                cmData={props.cmData}
                                                handleSelectChange={handleSelectChange}
                                                npOptions={npOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setPregInfo(pregCard);
                        break;

                    case 'AFB':
                        const afbCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Acid - Fast Bacilli ( AFB )</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <AFBView cmData={props.cmData} />
                                            : <AFBInput
                                                cmData={props.cmData}
                                                handleChange={handleChange}
                                            />

                                        }
                                    </CCard>
                                </CCol>

                            </CRow>
                        );
                        setAfbInfo(afbCard);
                        break;

                    case 'OBT':
                        const obtCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Occult Blood Test</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <OBTView cmData={props.cmData} />
                                            : <OBTInput
                                                cmData={props.cmData}
                                                handleSelectChange={handleSelectChange}
                                                npOptions={npOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setObtInfo(obtCard);
                        break;

                    default:
                        break;
                }
                return srv;
            });
        }
        // eslint-disable-next-line
    }, [props.cmData]);

    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.saveClick();
        }
    }

    let defpatho = null
    const indDoct = props.cmData.doctor
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    let medtech = '---'
    if (props.cmData.labPerson !== null) {
        medtech = labPersonName(props.cmData.labPerson, false)
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='xl'
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle className="font-weight-bold">Clinical Microscopy</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.cmData}
                />

                <CContainer>
                    {macroInfo}
                    {microInfo}
                    {uchemInfo}
                    {fecaInfo}
                    <CRow className="m-0 p-0">
                        <CCol md="3">
                            {pregInfo}
                        </CCol>
                        <CCol md="3">
                            {obtInfo}
                        </CCol>
                    </CRow>
                    {afbInfo}
                    <CRow>
                        <CCol md="12" className="p-1">
                            <CCard className="mb-1">
                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                    <h6 className="m-1">Other Notes/Findings</h6>
                                </CCardHeader>
                                {props.editViewFlag === true
                                    ? <CCardBody className="p-1">
                                        <CRow className="ml-1 mr-1 p-0">
                                            <CCol md="2" className="p-1">
                                                <CLabel className="mb-0 ml-2">Notes:</CLabel>
                                            </CCol>
                                            <CCol md="10" className="p-1">
                                                <CLabel className="mb-0 ml-2 font-weight-bold">{props.cmData.otno.otherNotes}</CLabel>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                    : <CCardBody className="p-1">
                                        <CRow className="ml-1 mr-1 p-0">
                                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Notes</CLabel>
                                                <CInput
                                                    value={props.cmData.otno.otherNotes}
                                                    onChange={handleChange('otno', 'otherNotes')}
                                                />
                                            </FormControl>
                                        </CRow>
                                    </CCardBody>
                                }
                            </CCard>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol md="4" className="p-1">
                            <MedTechCard medtech={medtech} />
                        </CCol>
                        <CCol md="4" className="p-1">
                            <QualityControlCard qualityControl={props.cmData.qualityControl} />
                        </CCol>
                        <CCol md="4" className="p-1">
                            <DoctorCard
                                editViewFlag={props.editViewFlag}
                                doctorSelect={doctorSelect}
                                doctorState={defpatho}
                                handleSelectChange={handleSelectChange}
                                doctorTitle={'Pathologist'}
                                docProp={'doctor'}
                            />
                        </CCol>
                    </CRow>

                </CContainer>
            </CModalBody>
            <CModalFooter>
                {props.editViewFlag === true
                    ? <FormControlLabel
                        control={
                            <Switch
                                checked={headerControl}
                                onChange={headerHandler}
                                color="primary"
                            />
                        }
                        label="Print with Header"
                    />
                    : null}

                {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="secondary"
                        onClick={() => props.onPrintClinicalMicroscopy(props.cmData.txnId, props.cmData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                            Print Clinical Microsopy Report</CButton>
                    : <CButton
                        className="border border-dark"
                        color="primary"
                        onClick={validateInputs}
                    >Save</CButton>
                }

                {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="warning"
                        onClick={() => props.onQualityControl(props.cmData.txnId, props.cmData.id)}
                    >
                        <i className="mfe-2 fas fa-clipboard-check" />
                            Quality Control</CButton>
                    : null
                }

                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default ClinicalMicroscopyModal
