import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

    CCollapse,
    CCard,
    CCardBody,
    CCardHeader,

    CContainer,
    CRow,
    CCol,
    CLabel,
    CInput,
} from '@coreui/react';

import { updateObject, doctorName, computeChem, labPersonName } from 'src/store/utility';

import {
    FormControl,
} from '@material-ui/core';

import PatientInformation from 'src/containers/common/PatientInformation';

// HEMATOLOGY
import CBCInput from './he_info/input/CBCInput';
import BTYPInput from './he_info/input/BTYPInput';
import CTMInput from './he_info/input/CTMInput';
import BTMInput from './he_info/input/BTMInput';
import PTMInput from './he_info/input/PTMInput';
import PR131Input from './he_info/input/PR131Input';
import APTTInput from './he_info/input/APTTInput';
import MASMInput from './he_info/input/MASMInput';
import ESRInput from './he_info/input/ESRInput';

import CBCView from './he_info/view/CBCView';
import BTYPView from './he_info/view/BTYPView';
import CTMView from './he_info/view/CTMView';
import BTMView from './he_info/view/BTMView';
import PTMView from './he_info/view/PTMView';
import PR131View from './he_info/view/PR131View';
import APTTView from './he_info/view/APTTView';
import MASMView from './he_info/view/MASMView';
import ESRView from './he_info/view/ESRView';

// CLINICAL MICROSCOPY
import MACROInput from './cm_info/input/MACROInput';
import MICROInput from './cm_info/input/MICROInput';
import UCHEMInput from './cm_info/input/UCHEMInput';
import FECAInput from './cm_info/input/FECAInput';
import PREGTInput from './cm_info/input/PREGTInput';
import AFBInput from './cm_info/input/AFBInput';
import OBTInput from './cm_info/input/OBTInput';

import MACROView from './cm_info/view/MACROView'
import MICROView from './cm_info/view/MICROView';
import UCHEMView from './cm_info/view/UCHEMView';
import FECAView from './cm_info/view/FECAView';
import PREGTView from './cm_info/view/PREGTView';
import AFBView from './cm_info/view/AFBView';
import OBTView from './cm_info/view/OBTView';

// SEROLOGY
import SERInput from './se_info/input/SERInput';
import TYPHInput from './se_info/input/TYPHInput';
import THYRInput from './se_info/input/THYRInput';
import CRPInput from './se_info/input/CRPInput';
import HIVInput from './se_info/input/HIVInput';
import AGENInput from './se_info/input/AGENInput';
import COVIDInput from './se_info/input/COVIDInput';

import SERView from './se_info/view/SERView';
import TYPHView from './se_info/view/TYPHView';
import THYRView from './se_info/view/THYRView';
import CRPView from './se_info/view/CRPView';
import HIVView from './se_info/view/HIVView';
import AGENView from './se_info/view/AGENView';
import COVIDView from './se_info/view/COVIDView';

// CHEMISTRY
import FBSInput from './ch_info/input/FBSInput';
import RBSInput from './ch_info/input/RBSInput';
import PPRBSInput from './ch_info/input/PPRBSInput';
import URACInput from './ch_info/input/URACInput';
import BUNInput from './ch_info/input/BUNInput';
import CREAInput from './ch_info/input/CREAInput';
import HBA1CInput from './ch_info/input/HBA1CInput';
import LIPPInput from './ch_info/input/LIPPInput';
import OGTTInput from './ch_info/input/OGTTInput';
import OGCTInput from './ch_info/input/OGCTInput';
import ELECInput from './ch_info/input/ELECInput';
import ENZYInput from './ch_info/input/ENZYInput';
import CPKInput from './ch_info/input/CPKInput';
import BILIInput from './ch_info/input/BILIInput';
import PROTInput from './ch_info/input/PROTInput';

import FBSView from './ch_info/view/FBSView';
import RBSView from './ch_info/view/RBSView';
import PPRBSView from './ch_info/view/PPRBSView';
import URACView from './ch_info/view/URACView';
import BUNView from './ch_info/view/BUNView';
import CREAView from './ch_info/view/CREAView';
import HBA1CView from './ch_info/view/HBA1CView';
import LIPPView from './ch_info/view/LIPPView';
import OGTTView from './ch_info/view/OGTTView';
import OGCTView from './ch_info/view/OGCTView';
import ELECView from './ch_info/view/ELECView';
import ENZYView from './ch_info/view/ENZYView';
import CPKView from './ch_info/view/CPKView';
import BILIView from './ch_info/view/BILIView';
import PROTView from './ch_info/view/PROTView';

// TOXICOLOGY
import DrugTestInput from './to_info/input/DrugTestInput';

import DoctorCard from 'src/containers/common/DoctorCard';
import MedTechCard from 'src/containers/common/MedTechCard';
import DrugTestView from './to_info/view/DrugTestView';
import QualityControlCard from 'src/containers/common/QualityControlCard';
import RTANTIGENInput from './se_info/input/RTANTIGENInput';
import RTANTIGENView from './se_info/view/RTANTIGENView';

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
        color: 'white'
    }
}));

const IndustrialModal = (props) => {
    const classes = useStyles();

    const btOptions = [
        { value: 'A', label: 'A' },
        { value: 'O', label: 'O' },
        { value: 'B', label: 'B' },
        { value: 'AB', label: 'AB' },
    ];
    const npOptions = [
        { value: true, label: 'POSITIVE' },
        { value: false, label: 'NEGATIVE' },
    ];
    const esrMethod = [
        { value: 'WINTROBE', label: 'WINTROBE' },
        { value: 'WESTERGREN', label: 'WESTERGREN' },
    ];
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
        { value: 5.0, label: '5.0' },
        { value: 5.5, label: '5.5' },
        { value: 6.0, label: '6.0' },
        { value: 6.5, label: '6.5' },
        { value: 7.0, label: '7.0' },
        { value: 7.5, label: '7.5' },
        { value: 8.0, label: '8.0' },
        { value: 8.5, label: '8.5' },
        { value: 9.0, label: '9.0' },
        { value: 9.5, label: '9.5' },
    ];
    const spGravityOptions = [
        { value: 1.000, label: '1.000' },
        { value: 1.005, label: '1.005' },
        { value: 1.010, label: '1.010' },
        { value: 1.015, label: '1.015' },
        { value: 1.020, label: '1.020' },
        { value: 1.025, label: '1.025' },
        { value: 1.030, label: '1.030' },
    ];
    const uchemOptions = [
        { value: 'NEG', label: 'NEGATIVE' },
        { value: 'TRA', label: 'TRACE' },
        { value: 'P1', label: '1+' },
        { value: 'P2', label: '2+' },
        { value: 'P3', label: '3+' },
        { value: 'P4', label: '4+' },
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


    const rnOptions = [
        { value: true, label: 'REACTIVE' },
        { value: false, label: 'NONREACTIVE' },
    ];

    const dateChangeHandler = (opt, prop) => (event) => {
        const updateIndData = updateObject(props.indData, {
            [opt]: updateObject(props.indData[opt], {
                [prop]: event.format('YYYY-MM-DD HH:mm'),
            })
        });

        props.setIndData(updateIndData)
    }
    const handleChange = (opt, prop, idx) => (event) => {
        const labRequests = [].concat(props.indData.laboratoryRequest);
        const lab = labRequests[idx];

        let additional = {}
        let hemo = "";
        let rbc = "";

        if (lab.itemDetails.itemLaboratoryProcedure === 'HE') {
            switch (opt) {
                case 'cbc':
                    switch (event.target.value) {
                        case ".28": case "0.28":
                            hemo = lab.cbc.hemoglobin = 92;
                            rbc = lab.cbc.redBloodCells = 3.08;
                            break;
                        case ".29": case "0.29":
                            hemo = lab.cbc.hemoglobin = 96;
                            rbc = lab.cbc.redBloodCells = 3.19;
                            break;
                        case ".30": case "0.30":
                            hemo = lab.cbc.hemoglobin = 99;
                            rbc = lab.cbc.redBloodCells = 3.3;
                            break;
                        case ".31": case "0.31":
                            hemo = lab.cbc.hemoglobin = 102;
                            rbc = lab.cbc.redBloodCells = 3.41;
                            break;
                        case ".32": case "0.32":
                            hemo = lab.cbc.hemoglobin = 106;
                            rbc = lab.cbc.redBloodCells = 3.52;
                            break;
                        case ".33": case "0.33":
                            hemo = lab.cbc.hemoglobin = 109;
                            rbc = lab.cbc.redBloodCells = 3.63;
                            break;
                        case ".34": case "0.34":
                            hemo = lab.cbc.hemoglobin = 112;
                            rbc = lab.cbc.redBloodCells = 3.74;
                            break;
                        case ".35": case "0.35":
                            hemo = lab.cbc.hemoglobin = 116;
                            rbc = lab.cbc.redBloodCells = 3.85;
                            break;
                        case ".36": case "0.36":
                            hemo = lab.cbc.hemoglobin = 119;
                            rbc = lab.cbc.redBloodCells = 3.96;
                            break;
                        case ".37": case "0.37":
                            hemo = lab.cbc.hemoglobin = 122;
                            rbc = lab.cbc.redBloodCells = 4.07;
                            break;
                        case ".38": case "0.38":
                            hemo = lab.cbc.hemoglobin = 125;
                            rbc = lab.cbc.redBloodCells = 4.18;
                            break;
                        case ".39": case "0.39":
                            hemo = lab.cbc.hemoglobin = 129;
                            rbc = lab.cbc.redBloodCells = 4.29;
                            break;
                        case ".40": case "0.40":
                            hemo = lab.cbc.hemoglobin = 132;
                            rbc = lab.cbc.redBloodCells = 4.4;
                            break;
                        case ".41": case "0.41":
                            hemo = lab.cbc.hemoglobin = 135;
                            rbc = lab.cbc.redBloodCells = 3.85;
                            break;
                        case ".42": case "0.42":
                            hemo = lab.cbc.hemoglobin = 139;
                            rbc = lab.cbc.redBloodCells = 4.62;
                            break;
                        case ".43": case "0.43":
                            hemo = lab.cbc.hemoglobin = 142;
                            rbc = lab.cbc.redBloodCells = 4.73;
                            break;
                        case ".44": case "0.44":
                            hemo = lab.cbc.hemoglobin = 145;
                            rbc = lab.cbc.redBloodCells = 4.84;
                            break;
                        case ".45": case "0.45":
                            hemo = lab.cbc.hemoglobin = 149;
                            rbc = lab.cbc.redBloodCells = 4.95;
                            break;
                        case ".46": case "0.46":
                            hemo = lab.cbc.hemoglobin = 152;
                            rbc = lab.cbc.redBloodCells = 5.06;
                            break;
                        case ".47": case "0.47":
                            hemo = lab.cbc.hemoglobin = 155;
                            rbc = lab.cbc.redBloodCells = 5.17;
                            break;
                        case ".48": case "0.48":
                            hemo = lab.cbc.hemoglobin = 158;
                            rbc = lab.cbc.redBloodCells = 5.28;
                            break;
                        case ".49": case "0.49":
                            hemo = lab.cbc.hemoglobin = 162;
                            rbc = lab.cbc.redBloodCells = 5.39;
                            break;
                        case ".50": case "0.50":
                            hemo = lab.cbc.hemoglobin = 165;
                            rbc = lab.cbc.redBloodCells = 5.5;
                            break;
                        case ".51": case "0.51":
                            hemo = lab.cbc.hemoglobin = 168;
                            rbc = lab.cbc.redBloodCells = 5.61;
                            break;
                        case ".52": case "0.52":
                            hemo = lab.cbc.hemoglobin = 172;
                            rbc = lab.cbc.redBloodCells = 5.72;
                            break;
                        case ".53": case "0.53":
                            hemo = lab.cbc.hemoglobin = 175;
                            rbc = lab.cbc.redBloodCells = 5.83;
                            break;
                        case ".54": case "0.54":
                            hemo = lab.cbc.hemoglobin = 178;
                            rbc = lab.cbc.redBloodCells = 5.94;
                            break;
                        case ".55": case "0.55":
                            hemo = lab.cbc.hemoglobin = 182;
                            rbc = lab.cbc.redBloodCells = 6.05;
                            break;
                        default:
                            hemo = "";
                            rbc = "";
                            break;
                    }
                    additional.hemoglobin = hemo;
                    additional.redBloodCells = rbc;
                    break;
                default:
                    break;
            }
        }

        if (lab.itemDetails.itemLaboratoryProcedure === 'CH') {
            switch (opt) {
                case 'fbs':
                    let fbsc = lab.fbs.conventional
                    let fbsr = event.target.value

                    if (fbsr === '') fbsr = 0

                    fbsc = computeChem(fbsr, 0.055)
                    additional.conventional = fbsc
                    break;

                case 'rbs':
                    let rbsc = lab.rbs.conventional
                    let rbsr = event.target.value

                    if (rbsr === '') rbsr = 0

                    rbsc = computeChem(rbsr, 0.055)

                    additional.conventional = rbsc
                    break;

                case 'pprbs':
                    let pprbsc = lab.pprbs.conventional
                    let pprbsr = event.target.value

                    if (pprbsr === '') pprbsr = 0

                    pprbsc = computeChem(pprbsr, 0.055)

                    additional.conventional = pprbsc
                    break;

                case 'urac':
                    let uracc = lab.urac.conventional
                    let uracr = event.target.value

                    if (uracr === '') uracr = 0

                    uracc = computeChem(uracr, 59.48)

                    additional.conventional = uracc
                    break;

                case 'bun':
                    let bunc = lab.bun.conventional
                    let bunr = event.target.value

                    if (bunr === '') bunr = 0

                    bunc = computeChem(bunr, 0.357)

                    additional.conventional = bunc
                    break;

                case 'crea':
                    let creac = lab.crea.conventional
                    let crear = event.target.value

                    if (crear === '') crear = 0

                    creac = computeChem(crear, 88.4)

                    additional.conventional = creac
                    break;

                case 'ogct':
                    let ogctc = lab.ogct.conventional
                    let ogctr = event.target.value

                    if (ogctr === '') ogctr = 0

                    ogctc = computeChem(ogctr, 0.055)

                    additional.conventional = ogctc
                    break;

                case 'ogtt':
                    if (prop === 'ogtt1HrResult') {
                        let ogtt1c = lab.ogtt.ogtt1HrConventional
                        let ogtt1r = event.target.value

                        if (ogtt1r === '') ogtt1r = 0

                        ogtt1c = computeChem(ogtt1r, 0.055)

                        additional.ogtt1HrConventional = ogtt1c
                    } else if (prop === 'ogtt2HrResult') {
                        let ogtt2c = lab.ogtt.ogtt2HrConventional
                        let ogtt2r = event.target.value

                        if (ogtt2r === '') ogtt2r = 0

                        ogtt2c = computeChem(ogtt2r, 0.055)

                        additional.ogtt2HrConventional = ogtt2c
                    }
                    break;

                case 'lipp':
                    let cholevalue = lab.lipp.cholesterolResult
                    let trigvalue = lab.lipp.triglyceridesResult
                    let hdlvalue = lab.lipp.hdlResult

                    switch (prop) {
                        case 'cholesterolResult':
                            let cholec = lab.lipp.cholesterolConventional
                            let choler = event.target.value

                            if (choler === '') choler = 0
                            cholevalue = choler

                            cholec = computeChem(choler, 0.0259)

                            additional.cholesterolConventional = cholec
                            break;

                        case 'triglyceridesResult':
                            let trigc = lab.lipp.triglyceridesConventional
                            let trigr = event.target.value

                            if (trigr === '') trigr = 0
                            trigvalue = trigr

                            trigc = computeChem(trigr, 0.0113)

                            additional.triglyceridesConventional = trigc
                            break;

                        case 'hdlResult':
                            let hdlc = lab.lipp.hdlConventional
                            let hdlr = event.target.value

                            if (hdlr === '') hdlr = 0
                            hdlvalue = hdlr

                            hdlc = computeChem(hdlr, 0.0259)

                            additional.hdlConventional = hdlc
                            break;

                        default: break;
                    }

                    if (cholevalue !== '' && hdlvalue !== '' &&
                        cholevalue > 0 && hdlvalue > 0) {
                        let hdlratio = cholevalue / hdlvalue

                        additional.hdlRatio = hdlratio.toFixed(2)
                    }

                    if (trigvalue !== '' && trigvalue > 0) {
                        let vldlres = computeChem(trigvalue, 2.175)

                        additional.vldl = vldlres
                    }

                    if (cholevalue !== '' && cholevalue > 0 &&
                        trigvalue !== '' && trigvalue > 0 &&
                        hdlvalue !== '' && hdlvalue > 0) {
                        let trig = computeChem(trigvalue, 2.175)
                        let ldlvalue = cholevalue - trig - hdlvalue
                        let ldlconv = computeChem(ldlvalue, 0.0259)

                        additional.ldlResult = ldlvalue.toFixed(2)
                        additional.ldlConventional = ldlconv
                    }

                    break;

                default:
                    break;
            }
        }
        const labData = updateObject(lab, {
            [opt]: updateObject(lab[opt], {
                [prop]: event.target.value,
                ...additional
            })
        });
        labRequests[idx] = labData;
        const updateIndData = updateObject(props.indData, {
            laboratoryRequest: labRequests,
        });
        props.setIndData(updateIndData);
    };


    const [doctorSelect, setDoctorSelect] = useState([])

    useEffect(() => {
        const docSelect = props.doctorList.map(doctor => ({
            value: doctor.doctorid,
            label: doctorName(doctor),
            license: doctor.licenseNumber
        }))
        setDoctorSelect(docSelect)

    }, [props.doctorList])

    let defpatho = null
    const indDoct = props.indData.doctor
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    const handleDoctorChange = (opt, prop) => (event) => {
        const updateIndData = updateObject(props.indData, {
            [opt]: updateObject(props.indData[opt], {
                [prop]: event,
            })
        });

        props.setIndData(updateIndData);
    }

    const handleSelectChange = (opt, prop, idx) => (event) => {
        const labRequests = [].concat(props.indData.laboratoryRequest);
        const lab = labRequests[idx];

        let additional = {}
        let noteFeca = '';
        if (opt === 'feca') {
            if (prop === 'microscopicFindings') {
                if (event != null) {
                    if (JSON.parse(event.target.value).value === 'NO OVA OR PARASITE SEEN') {
                        noteFeca = lab.feca.otherNotes = 'NORMAL'
                    } else {
                        noteFeca = lab.feca.otherNotes = ''
                    }
                }
            }
            additional.otherNotes = noteFeca;
        }

        const labData = updateObject(lab, {
            [opt]: updateObject(lab[opt], {
                [prop]: JSON.parse(event.target.value),
                ...additional
            })
        });
        labRequests[idx] = labData;

        const updateIndData = updateObject(props.indData, {
            laboratoryRequest: labRequests,
        });
        props.setIndData(updateIndData);

    }

    const collapseContent = (idx) => {
        const labRequests = [].concat(props.indData.laboratoryRequest);
        const lab = labRequests[idx];
        lab.showCollapse = !lab.showCollapse;
        labRequests[idx] = lab;

        const updateIndData = updateObject(props.indData, {
            laboratoryRequest: labRequests,
        });

        props.setIndData(updateIndData);
    }

    // const handleSelectReferenceChange = (prop) => (event) => {
    //     event.persist()
    //     const updateSeroData = updateObject(props.seroData, {
    //         [prop]: JSON.parse(event.target.value),
    //     });

    //     props.setIndData(updateSeroData);
    // }

    // CLINICAL MICROSCOPY
    const displayClinicalMicroscopy = (idx) => {
        let display = null;
        if (idx !== null && idx >= 0) {
            const lab = props.indData.laboratoryRequest[idx];
            if (lab !== undefined && lab !== null) {
                const serviceRequest = lab.itemDetails.serviceRequest;

                if (serviceRequest.length > 0) {
                    let macroCard = null;
                    let microCard = null;
                    let uchemCard = null;
                    let fecaCard = null;
                    let pregCard = null;
                    let afbCard = null;
                    let obtCard = null;

                    serviceRequest.forEach((srv) => {
                        switch (srv.laboratoryRequest) {
                            case 'UCHEM':
                                macroCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Physical/Macroscopic</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <MACROInput
                                                        cmData={props.indData.laboratoryRequest[idx]}
                                                        handleSelectChange={handleSelectChange}
                                                        macroColor={macroColor}
                                                        macroTransparency={macroTransparency}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <MACROView cmData={props.indData.laboratoryRequest[idx]} />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );

                                microCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Microscopic</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <MICROInput
                                                        cmData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        microOptions={microOptions}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <MICROView
                                                        cmData={props.indData.laboratoryRequest[idx]} />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );

                                uchemCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Urine Chemical</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <UCHEMInput
                                                        cmData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        uchemOptions={uchemOptions}
                                                        phOptions={phOptions}
                                                        npOptions={npOptions}
                                                        spGravityOptions={spGravityOptions}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <UCHEMView
                                                        cmData={props.indData.laboratoryRequest[idx]} />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'FECA':
                                fecaCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Fecalysis</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <FECAInput
                                                        cmData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        fecaColor={fecaColor}
                                                        fecaConsistency={fecaConsistency}
                                                        microscopicFindings={microscopicFindings}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <FECAView
                                                        cmData={props.indData.laboratoryRequest[idx]} />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'PREGT':
                                pregCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Pregnancy Test ({props.indData.laboratoryRequest[idx].laboratorySpecimen})</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <PREGTInput
                                                        cmData={props.indData.laboratoryRequest[idx]}
                                                        handleSelectChange={handleSelectChange}
                                                        npOptions={npOptions}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <PREGTView
                                                        cmData={props.indData.laboratoryRequest[idx]} />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'AFB':
                                afbCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Acid - Fast Bacilli ( AFB )</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <AFBInput
                                                        cmData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        handleSelectChange={handleSelectChange}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <AFBView
                                                        cmData={props.indData.laboratoryRequest[idx]} />
                                                }
                                            </CCard>
                                        </CCol>

                                    </CRow>
                                );
                                break;

                            case 'OBT':
                                obtCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Occult Blood Test</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <OBTInput
                                                        cmData={props.indData.laboratoryRequest[idx]}
                                                        handleSelectChange={handleSelectChange}
                                                        npOptions={npOptions}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <OBTView
                                                        cmData={props.indData.laboratoryRequest[idx]} />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            default:
                                break;
                        }
                    });

                    display = (
                        <CContainer>
                            {macroCard}
                            {microCard}
                            {uchemCard}
                            {fecaCard}
                            {afbCard}
                            <CRow className="m-0 p-0">
                                <CCol md="3">
                                    {pregCard}
                                </CCol>
                                <CCol md="3">
                                    {obtCard}
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Other Notes/Findings</h6>
                                        </CCardHeader>
                                        <CCardBody className="p-1">
                                            <CRow className="ml-1 mr-1 p-0">
                                                {props.editViewFlag === false
                                                    ? <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Notes</CLabel>
                                                        <CInput
                                                            value={props.indData.laboratoryRequest[idx].otno.otherNotes}
                                                            onChange={handleChange('otno', 'otherNotes', idx)}
                                                        />
                                                    </FormControl>
                                                    : <CRow className="ml-1 mr-1 p-0">
                                                        <CCol md="3" className="p-1">
                                                            <CLabel className="mb-0 ml-2">Notes:</CLabel>
                                                        </CCol>
                                                        <CCol md="9" className="p-1">
                                                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.indData.laboratoryRequest[idx].otno.otherNotes}</CLabel>
                                                        </CCol>
                                                    </CRow>
                                                }
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CContainer>
                    );
                }
            }
        }

        return display;
    }

    // HEMATOLOGY
    const displayHematology = (idx) => {
        let display = null;
        if (idx !== null && idx >= 0) {
            const lab = props.indData.laboratoryRequest[idx];
            if (lab !== undefined && lab !== null) {
                const serviceRequest = lab.itemDetails.serviceRequest;

                if (serviceRequest.length > 0) {
                    let cbcCard = null;
                    let btypCard = null;
                    let ctmCard = null;
                    let btmCard = null;
                    let ptmCard = null;
                    let pr131Card = null;
                    let apttCard = null;
                    let masmCard = null;
                    let esrCard = null;

                    serviceRequest.forEach((srv) => {
                        switch (srv.laboratoryRequest) {
                            case 'CBC':
                                cbcCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Complete Blood Count</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <CBCInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                        handleSelectChange={handleSelectChange}
                                                    />
                                                    : <CBCView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'BTYP':
                                btypCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Blood Typing</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <BTYPInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleSelectChange={handleSelectChange}
                                                        index={idx}
                                                        btOptions={btOptions}
                                                        npOptions={npOptions}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <BTYPView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'CTM':
                                ctmCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Clotting Time</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <CTMInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                        handleSelectChange={handleSelectChange}
                                                    />
                                                    : <CTMView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'BTM':
                                btmCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Bleeding Time</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <BTMInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                        handleSelectChange={handleSelectChange}
                                                    />
                                                    : <BTMView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'PTM':
                                ptmCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Prothrombin Time</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <PTMInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                        handleSelectChange={handleSelectChange}
                                                    />
                                                    : <PTMView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'PR131':
                                pr131Card = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">PR 1.31</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <PR131Input
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                        handleSelectChange={handleSelectChange}
                                                    />
                                                    : <PR131View
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'APTT':
                                apttCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Activated Partial Thromboplastin Time ( APTT )</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <APTTInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                        handleSelectChange={handleSelectChange}
                                                    />
                                                    : <APTTView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'MASM':
                                masmCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Malarial Smear</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <MASMInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleSelectChange={handleSelectChange}
                                                        npOptions={npOptions}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <MASMView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'ESR':
                                esrCard = (
                                    <CRow>
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Erythrocyte Sedimentation Rate ( ESR )</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <ESRInput
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        esrMethod={esrMethod}
                                                        referenceLab={props.referenceLab}
                                                        index={idx}
                                                    />
                                                    : <ESRView
                                                        hemaData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            default:
                                break;
                        }
                    });

                    display = (
                        <CContainer>
                            {cbcCard}
                            <CRow className="m-0 p-0">
                                <CCol md="6">
                                    {btypCard}
                                </CCol>
                                <CCol md="6">
                                    {ctmCard}
                                </CCol>
                                <CCol md="6">
                                    {btmCard}
                                </CCol>
                                <CCol md="3">
                                    {pr131Card}
                                </CCol>
                                <CCol md="3">
                                    {masmCard}
                                </CCol>
                                <CCol md="9">
                                    {esrCard}
                                </CCol>
                            </CRow>
                            {ptmCard}
                            {apttCard}
                            <CRow>
                                <CCol md="6" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Other Notes/Findings</h6>
                                        </CCardHeader>
                                        <CCardBody className="p-1">
                                            <CRow className="ml-1 mr-1 p-0">
                                                {props.editViewFlag === false
                                                    ? <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Notes</CLabel>
                                                        <CInput
                                                            value={props.indData.laboratoryRequest[idx].otno.otherNotes}
                                                            onChange={handleChange('otno', 'otherNotes', idx)}
                                                        />
                                                    </FormControl>
                                                    : <CRow className="ml-1 mr-1 p-0">
                                                        <CCol md="3" className="p-1">
                                                            <CLabel className="mb-0 ml-2">Notes:</CLabel>
                                                        </CCol>
                                                        <CCol md="9" className="p-1">
                                                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.indData.laboratoryRequest[idx].otno.otherNotes}</CLabel>
                                                        </CCol>
                                                    </CRow>
                                                }
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                        </CContainer>
                    );
                }
            }
        }

        return display;
    }

    // CHEMISTRY
    const displayChemistry = (idx) => {
        let display = null;
        if (idx !== null && idx >= 0) {
            const lab = props.indData.laboratoryRequest[idx];
            if (lab !== undefined && lab !== null) {
                const serviceRequest = lab.itemDetails.serviceRequest;

                if (serviceRequest.length > 0) {
                    let fbsCard = null;
                    let rbsCard = null;
                    let pprbsCard = null;
                    let uracCard = null;
                    let bunCard = null;
                    let creaCard = null;
                    let hba1cCard = null;
                    let lippCard = null;
                    let ogttCard = null;
                    let ogctCard = null;
                    let elecCard = null;
                    let enzyCard = null;
                    let cpkCard = null;
                    let biliCard = null;
                    let protCard = null;

                    serviceRequest.forEach((srv) => {
                        switch (srv.laboratoryRequest) {
                            case 'FBS':
                                fbsCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Fasting Blood Sugar</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <FBSInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    handleSelectChange={handleSelectChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                />
                                                : <FBSView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'RBS':
                                rbsCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Random Blood Sugar</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <RBSInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <RBSView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'PPRBS':
                                pprbsCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Post Prandial Random Blood Sugar</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <PPRBSInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <PPRBSView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'URAC':
                                uracCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Uric Acid</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <URACInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <URACView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'BUN':
                                bunCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Blood Urea Nitrogen</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <BUNInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <BUNView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'CREA':
                                creaCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Creatinine</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <CREAInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <CREAView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'HBA1C':
                                hba1cCard = (
                                    <CCol md="3" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Hemoglobin A1C</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <HBA1CInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <HBA1CView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                )
                                break;

                            case 'LIPP':
                                lippCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Lipid Profile</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <LIPPInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <LIPPView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'OGTT':
                                ogttCard = (
                                    <CRow className="m-0 p-0">
                                        <CCol md="12" className="p-0">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Oral Glucose Tolerance Test (OGTT)</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <OGTTInput
                                                        chemData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                    />
                                                    : <OGTTView
                                                        chemData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'OGCT':
                                ogctCard = (
                                    <CRow className="m-0 p-0">
                                        <CCol md="12" className="p-0">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Oral Glucose Challenge Test (OGCT - 50G)</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <OGCTInput
                                                        chemData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                    />
                                                    : <OGCTView
                                                        chemData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'ELEC':
                                elecCard = (
                                    <CCol md="3" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Serum Electrolytes</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <ELECInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <ELECView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'ENZY':
                                enzyCard = (
                                    <CCol md="3" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Serum Enzymes</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <ENZYInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <ENZYView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'CPK':
                                cpkCard = (
                                    <CCol md="3" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Creatine Phosphokinase (CPK)</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <CPKInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <CPKView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'BILI':
                                biliCard = (
                                    <CCol md="3" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Bilirubin</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <BILIInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <BILIView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'PROT':
                                protCard = (
                                    <CCol md="3" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Serum Protein</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <PROTInput
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                                : <PROTView
                                                    chemData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            default:
                                break;
                        }
                    });

                    display = (
                        <CContainer>
                            <CRow className="m-0 p-0">
                                {fbsCard}
                                {rbsCard}
                                {pprbsCard}
                                {uracCard}
                                {bunCard}
                                {creaCard}
                                {lippCard}
                                <CCol md="6" className="p-1">
                                    {ogttCard}
                                    {ogctCard}
                                </CCol>
                                {elecCard}
                                {enzyCard}
                                {cpkCard}
                                {biliCard}
                                {protCard}
                                {hba1cCard}
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Other Notes/Findings</h6>
                                        </CCardHeader>
                                        <CCardBody className="p-1">
                                            <CRow className="ml-1 mr-1 p-0">
                                                {props.editViewFlag === false
                                                    ? <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Notes</CLabel>
                                                        <CInput
                                                            value={props.indData.laboratoryRequest[idx].otno.otherNotes}
                                                            onChange={handleChange('otno', 'otherNotes', idx)}
                                                        />
                                                    </FormControl>
                                                    : <CRow className="ml-1 mr-1 p-0">
                                                        <CCol md="3" className="p-1">
                                                            <CLabel className="mb-0 ml-2">Notes:</CLabel>
                                                        </CCol>
                                                        <CCol md="9" className="p-1">
                                                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.indData.laboratoryRequest[idx].otno.otherNotes}</CLabel>
                                                        </CCol>
                                                    </CRow>
                                                }
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CContainer>
                    );
                }
            }
        }

        return display;
    }

    // SEROLOGY
    const displaySerology = (idx) => {
        let display = null;
        if (idx !== null && idx >= 0) {
            const lab = props.indData.laboratoryRequest[idx];
            if (lab !== undefined && lab !== null) {
                const serviceRequest = lab.itemDetails.serviceRequest;

                if (serviceRequest.length > 0) {
                    let serCard = null;
                    let typhCard = null;
                    let thyrCard = null;
                    let agenCard = null;
                    let crpCard = null;
                    let hivCard = null;
                    let covidCard = null;
                    // let rtAntigenCard = null;

                    serviceRequest.forEach((srv) => {
                        switch (srv.laboratoryRequest) {
                            case 'SER':
                                serCard = (
                                    <CRow className="m-0 p-0">
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Serology</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <SERInput
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        npOptions={npOptions}
                                                        rnOptions={rnOptions}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <SERView
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'ANTIGEN':
                                serCard = (
                                    <CRow className="m-0 p-0">
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">RT ANTIGEN</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <RTANTIGENInput
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        handleDateChangeHandler={dateChangeHandler}
                                                        npOptions={npOptions}
                                                        rnOptions={rnOptions}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <RTANTIGENView
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'TYPH':
                                typhCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Typhidot</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <TYPHInput
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                    handleSelectChange={handleSelectChange}
                                                    npOptions={npOptions}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                />
                                                : <TYPHView
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'THYR':
                                thyrCard = (
                                    <CRow className="m-0 p-0">
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Thyroid</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <THYRInput
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        index={idx}
                                                        referenceLab={props.referenceLab}
                                                    />
                                                    : <THYRView
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'AGEN':
                                agenCard = (
                                    <CRow className="m-0 p-0">
                                        <CCol md="12" className="p-1">
                                            <CCard className="mb-1">
                                                <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                    <h6 className="m-1">Tumor Markers</h6>
                                                </CCardHeader>
                                                {props.editViewFlag === false
                                                    ? <AGENInput
                                                        referenceLab={props.referenceLab}
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                        handleChange={handleChange}
                                                        handleSelectChange={handleSelectChange}
                                                        index={idx}
                                                    />
                                                    : <AGENView
                                                        seroData={props.indData.laboratoryRequest[idx]}
                                                    />
                                                }
                                            </CCard>
                                        </CCol>
                                    </CRow>
                                );
                                break;

                            case 'CRP':
                                crpCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">C-Reactive Protein</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <CRPInput
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                    handleChange={handleChange}
                                                    handleSelectChange={handleSelectChange}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                />
                                                : <CRPView
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'HIV':
                                hivCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">Human Immunodeficiency Viruses ( HIV )</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <HIVInput
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                    handleSelectChange={handleSelectChange}
                                                    rnOptions={rnOptions}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                />
                                                : <HIVView
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            case 'COVID':
                                covidCard = (
                                    <CCol md="6" className="p-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <h6 className="m-1">COVID</h6>
                                            </CCardHeader>
                                            {props.editViewFlag === false
                                                ? <COVIDInput
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                    handleSelectChange={handleSelectChange}
                                                    handleChange={handleChange}
                                                    rnOptions={rnOptions}
                                                    index={idx}
                                                    referenceLab={props.referenceLab}
                                                />
                                                : <COVIDView
                                                    seroData={props.indData.laboratoryRequest[idx]}
                                                />
                                            }
                                        </CCard>
                                    </CCol>
                                );
                                break;

                            default:
                                break;
                        }
                    });
                    display = (
                        <CContainer>
                            {serCard}
                            {thyrCard}
                            {agenCard}
                            <CRow className="m-0 p-0">
                                {typhCard}
                                {crpCard}
                                {hivCard}
                                {covidCard}
                            </CRow>

                            <CRow className="m-0 p-0">
                                <CCol md="6" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Other Notes/Findings</h6>
                                        </CCardHeader>
                                        <CCardBody className="p-1">
                                            <CRow className="ml-1 mr-1 p-0">
                                                {props.editViewFlag === false
                                                    ? <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Notes</CLabel>
                                                        <CInput
                                                            value={props.indData.laboratoryRequest[idx].otno.otherNotes}
                                                            onChange={handleChange('otno', 'otherNotes', idx)}
                                                        />
                                                    </FormControl>
                                                    : <CRow className="ml-1 mr-1 p-0">
                                                        <CCol md="3" className="p-1">
                                                            <CLabel className="mb-0 ml-2">Notes:</CLabel>
                                                        </CCol>
                                                        <CCol md="9" className="p-1">
                                                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.indData.laboratoryRequest[idx].otno.otherNotes}</CLabel>
                                                        </CCol>
                                                    </CRow>
                                                }
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CContainer>
                    );
                }
            }
        }

        return display;
    }

    // TOXICOLOGY
    const displayToxicology = (idx) => {
        let display = null;
        if (idx !== null && idx >= 0) {
            const lab = props.indData.laboratoryRequest[idx];
            if (lab !== undefined && lab !== null) {
                display = (
                    <DrugTestInput
                        toxiData={props.indData.laboratoryRequest[idx]}
                        handleSelectChange={handleSelectChange}
                        npOptions={npOptions}
                        index={idx}
                    />
                );
                if (props.editViewFlag === true) {
                    display = (
                        <DrugTestView
                            toxiData={props.indData.laboratoryRequest[idx]}
                        />
                    );
                }
            }
        }

        return display;
    }

    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.saveClick();
        }
    }

    const qualityControl = () => {
        props.qcClick();
    }

    const printIndustrial = () => {
        props.printClick();
    }

    let medtech = '---';
    if (props.indData.labPerson !== null) {
        medtech = labPersonName(props.indData.labPerson, false)
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='xl'
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle className="font-weight-bold">Industrial</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.indData}
                />

                { // CLINICAL MICROSCOPY
                    [].concat(props.indData.laboratoryRequest)
                        .filter(i => i.requestType === 'CM')
                        .map((itm) => {
                            const labIndex = props.indData.laboratoryRequest.findIndex(lab => lab.id === itm.id);
                            if (labIndex >= 0) {
                                return <CCard key={labIndex} className="mb-2">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")} onClick={() => collapseContent(labIndex)}>
                                        <h6 className="m-0 p-0">CLINICAL MICROSCOPY: {itm.requestName}</h6>
                                    </CCardHeader>
                                    <CCollapse show={props.indData.laboratoryRequest[labIndex].showCollapse}>
                                        <CCardBody className="p-1">
                                            {displayClinicalMicroscopy(labIndex)}
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            } else {
                                return null;
                            }
                        })
                }

                { // HEMATOLOGY
                    [].concat(props.indData.laboratoryRequest)
                        .filter(i => i.requestType === 'HE')
                        .map((itm) => {
                            const labIndex = props.indData.laboratoryRequest.findIndex(lab => lab.id === itm.id);
                            if (labIndex >= 0) {
                                return <CCard key={labIndex} className="mb-2">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")} onClick={() => collapseContent(labIndex)}>
                                        <h6 className="m-0 p-0">HEMATOLOGY: {itm.requestName}</h6>
                                    </CCardHeader>
                                    <CCollapse show={props.indData.laboratoryRequest[labIndex].showCollapse}>
                                        <CCardBody className="p-1">
                                            {displayHematology(labIndex)}
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            } else {
                                return null;
                            }
                        })
                }

                { // CHEMISTRY
                    [].concat(props.indData.laboratoryRequest)
                        .filter(i => i.requestType === 'CH')
                        .map((itm) => {
                            const labIndex = props.indData.laboratoryRequest.findIndex(lab => lab.id === itm.id);
                            if (labIndex >= 0) {
                                return <CCard key={labIndex} className="mb-2">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")} onClick={() => collapseContent(labIndex)}>
                                        <h6 className="m-0 p-0">CHEMISTRY: {itm.requestName}</h6>
                                    </CCardHeader>
                                    <CCollapse show={props.indData.laboratoryRequest[labIndex].showCollapse}>
                                        <CCardBody className="p-1">
                                            {displayChemistry(labIndex)}
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            } else {
                                return null;
                            }
                        })
                }

                { // SEROLOGY
                    [].concat(props.indData.laboratoryRequest)
                        .filter(i => i.requestType === 'SE')
                        .map((itm) => {
                            const labIndex = props.indData.laboratoryRequest.findIndex(lab => lab.id === itm.id);
                            if (labIndex >= 0) {
                                return <CCard key={labIndex} className="mb-2">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")} onClick={() => collapseContent(labIndex)}>
                                        <h6 className="m-0 p-0">SEROLOGY: {itm.requestName}</h6>
                                    </CCardHeader>
                                    <CCollapse show={props.indData.laboratoryRequest[labIndex].showCollapse}>
                                        <CCardBody className="p-1">
                                            {displaySerology(labIndex)}
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            } else {
                                return null;
                            }
                        })
                }

                { // TOXICOLOGY
                    [].concat(props.indData.laboratoryRequest)
                        .filter(i => i.requestType === 'TO')
                        .map((itm) => {
                            const labIndex = props.indData.laboratoryRequest.findIndex(lab => lab.id === itm.id);
                            if (labIndex >= 0) {
                                return <CCard key={labIndex} className="mb-2">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")} onClick={() => collapseContent(labIndex)}>
                                        <h6 className="m-0 p-0">TOXICOLOGY: {itm.requestName}</h6>
                                    </CCardHeader>
                                    <CCollapse show={props.indData.laboratoryRequest[labIndex].showCollapse}>
                                        <CCardBody className="p-1">
                                            {displayToxicology(labIndex)}
                                        </CCardBody>
                                    </CCollapse>
                                </CCard>
                            } else {
                                return null;
                            }
                        })
                }

                <CRow>
                    <CCol md="4" className="pr-0">
                        <MedTechCard medtech={medtech} />
                    </CCol>
                    <CCol md="4" className="px-1">
                        <QualityControlCard qualityControl={props.indData.qualityControl} />
                    </CCol>
                    <CCol md="4" className="pl-0">
                        <DoctorCard
                            editViewFlag={props.editViewFlag}
                            doctorSelect={doctorSelect}
                            doctorState={defpatho}
                            handleSelectChange={handleDoctorChange}
                            doctorTitle={'Pathologist'}
                            docProp={'doctor'}
                        />
                    </CCol>
                </CRow>

            </CModalBody>
            <CModalFooter>
                {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="secondary"
                        onClick={printIndustrial}
                    >
                        <i className="mfe-2 fas fa-print" />
                        Print With Header and Footer</CButton>
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
                        onClick={qualityControl}
                    >
                        <i className="mfe-2 fas fa-clipboard-check" />
                        Quality Control
                    </CButton>
                    : null
                }
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default IndustrialModal;