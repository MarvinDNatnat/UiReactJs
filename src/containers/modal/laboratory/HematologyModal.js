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

import CBCView from './he_info/view/CBCView';
import BTYPView from './he_info/view/BTYPView';
import CTMView from './he_info/view/CTMView';
import BTMView from './he_info/view/BTMView';
import PTMView from './he_info/view/PTMView';
import PR131View from './he_info/view/PR131View';
import APTTView from './he_info/view/APTTView';
import MASMView from './he_info/view/MASMView';
import ESRView from './he_info/view/ESRView';

import CBCInput from './he_info/input/CBCInput';
import BTYPInput from './he_info/input/BTYPInput';
import CTMInput from './he_info/input/CTMInput';
import BTMInput from './he_info/input/BTMInput';
import PTMInput from './he_info/input/PTMInput';
import PR131Input from './he_info/input/PR131Input';
import FERRITINInput from './he_info/input/FERRITINInput';
import RCTInput from './he_info/input/RCTInput';
import APTTInput from './he_info/input/APTTInput';
import MASMInput from './he_info/input/MASMInput';
import ESRInput from './he_info/input/ESRInput';
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
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const HematologyModal = (props) => {
    const classes = useStyles();
    const [headerControl, setHeaderControl] = useState(true)

    const headerHandler = () => {
        setHeaderControl(!headerControl)
    }

    const btOptions = [
        { value: 'A', label: 'A' },
        { value: 'O', label: 'O' },
        { value: 'B', label: 'B' },
        { value: 'AB', label: 'AB' },
    ]

    const npOptions = [
        { value: true, label: 'POSITIVE' },
        { value: false, label: 'NEGATIVE' },
    ]

    const esrMethod = [
        { value: 'WINTROBE', label: 'WINTROBE' },
        { value: 'WESTERGREN', label: 'WESTERGREN' },
    ]

    const [cbcInfo, setCbcInfo] = useState(null);
    const [btypInfo, setBtypInfo] = useState(null);
    const [ctmInfo, setCtmInfo] = useState(null);
    const [btmInfo, setBtmInfo] = useState(null);
    const [ptmInfo, setPtmInfo] = useState(null);
    const [pr131Info, setPr131Info] = useState(null);
    const [apttInfo, setApttInfo] = useState(null);
    const [masmInfo, setMasmInfo] = useState(null);
    const [esrInfo, setEsrInfo] = useState(null);
    const [ferrInfo, setFerrInfo] = useState(null);
    const [rctInfo, setRctInfo] = useState(null);

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
        const updateHemaData = updateObject(props.hemaData, {
            [opt]: updateObject(props.hemaData[opt], {
                [prop]: event.target.value,
            })
        });
        props.setHemaData(updateHemaData);
    };

    const handleSelectChange = (opt, prop) => (event) => {
        const updateHemaData = updateObject(props.hemaData, {
            [opt]: updateObject(props.hemaData[opt], {
                [prop]: JSON.parse(event.target.value),
            })
        });

        props.setHemaData(updateHemaData);
    }

    useEffect(() => {
        const serviceRequest = props.hemaData.serviceRequest;

        setCbcInfo(null);
        setBtypInfo(null);
        setCtmInfo(null);
        setBtmInfo(null);
        setPtmInfo(null);
        setPr131Info(null);
        setApttInfo(null);
        setMasmInfo(null);
        setEsrInfo(null);

        if (serviceRequest.length > 0) {
            serviceRequest.map((srv) => {
                switch (srv.laboratoryRequest) {
                    case 'CBC':
                        const cbcCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Complete Blood Count</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <CBCView hemaData={props.hemaData} />
                                            : <CBCInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setCbcInfo(cbcCard);
                        break;

                    case 'BTYP':
                        const btypCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Blood Typing</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <BTYPView hemaData={props.hemaData} />
                                            : <BTYPInput
                                                referenceLab={props.referenceLab}
                                                hemaData={props.hemaData}
                                                handleSelectChange={handleSelectChange}
                                                btOptions={btOptions}
                                                npOptions={npOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setBtypInfo(btypCard);
                        break;

                    case 'CTM':
                        const ctmCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Clotting Time</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <CTMView hemaData={props.hemaData} />
                                            : <CTMInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setCtmInfo(ctmCard);
                        break;

                    case 'BTM':
                        const btmCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Bleeding Time</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <BTMView hemaData={props.hemaData} />
                                            : <BTMInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setBtmInfo(btmCard);
                        break;

                    case 'PTM':
                        const ptmCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Prothrombin Time</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <PTMView hemaData={props.hemaData} />
                                            : <PTMInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setPtmInfo(ptmCard);
                        break;

                    case 'PR131':
                        const pr131Card = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">PR 1.31</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <PR131View hemaData={props.hemaData} />
                                            : <PR131Input
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setPr131Info(pr131Card);
                        break;

                    case 'APTT':
                        const apttCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Activated Partial Thromboplastin Time ( APTT )</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <APTTView hemaData={props.hemaData} />
                                            : <APTTInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setApttInfo(apttCard);
                        break;

                    case 'MASM':
                        const masmCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Malarial Smear</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <MASMView hemaData={props.hemaData} />
                                            : <MASMInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                npOptions={npOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setMasmInfo(masmCard);
                        break;

                    case 'ESR':
                        const esrCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Erythrocyte Sedimentation Rate ( ESR )</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <ESRView hemaData={props.hemaData} />
                                            : <ESRInput
                                                referenceLab={props.referenceLab}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                esrMethod={esrMethod}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setEsrInfo(esrCard);
                        break;

                        case 'FERR':
                        const ferrCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Ferritin</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <PR131View hemaData={props.hemaData} />
                                            : <FERRITINInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setFerrInfo(ferrCard);
                        break;

                        case 'RCT':
                        const rctCard = (
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Ferritin</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <PR131View hemaData={props.hemaData} />
                                            : <RCTInput
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange}
                                                hemaData={props.hemaData}
                                                handleChange={handleChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setRctInfo(rctCard);
                        break;

                        
                    default:
                        break;
                }
                return srv;
            });
        }
        // eslint-disable-next-line
    }, [props.hemaData]);

    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.saveClick();
        }
    }

    let defpatho = null
    const indDoct = props.hemaData.doctor
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    let medtech = '---'
    if (props.hemaData.labPerson !== null) {
        medtech = labPersonName(props.hemaData.labPerson, false)
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='xl'
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle>Hematology</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.hemaData}
                />

                <CContainer>
                    {cbcInfo}
                    <CRow className="m-0 p-0">
                        <CCol md="6">
                            {btypInfo}
                        </CCol>
                        <CCol md="6">
                            {ctmInfo}
                        </CCol>
                        <CCol md="6">
                            {btmInfo}
                        </CCol>
                        <CCol md="3">
                            {pr131Info}
                        </CCol>
                        <CCol md="3">
                            {masmInfo}
                        </CCol>
                        <CCol md="9">
                            {esrInfo}
                        </CCol>
                        <CCol md="9">
                            {ferrInfo}
                        </CCol>
                        <CCol md="9">
                            {rctInfo}
                        </CCol>
                    </CRow>
                    {ptmInfo}
                    {apttInfo}
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
                                                <CLabel className="mb-0 ml-2 font-weight-bold">{props.hemaData.otno.otherNotes}</CLabel>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                    : <CCardBody className="p-1">
                                        <CRow className="ml-1 mr-1 p-0">
                                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Notes</CLabel>
                                                <CInput
                                                    value={props.hemaData.otno.otherNotes}
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
                            <QualityControlCard qualityControl={props.hemaData.qualityControl} />
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
                        onClick={() => props.onPrintHematology(props.hemaData.txnId, props.hemaData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                        Print Hematology Report</CButton>
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
                        onClick={() => props.onQualityControl(props.hemaData.txnId, props.hemaData.id)}
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

export default HematologyModal
