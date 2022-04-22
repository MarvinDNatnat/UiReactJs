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
import { doctorName, labPersonName, computeChem } from 'src/store/utility';

import PatientInformation from 'src/containers/common/PatientInformation';
import FBSView from './ch_info/view/FBSView';
import RBSView from './ch_info/view/RBSView';
import PPRBSView from './ch_info/view/PPRBSView';
import URACView from './ch_info/view/URACView';
import BUNView from './ch_info/view/BUNView';
import CREAView from './ch_info/view/CREAView';
import LIPPView from './ch_info/view/LIPPView';
import OGTTView from './ch_info/view/OGTTView';
import OGCTView from './ch_info/view/OGCTView';
import ELECView from './ch_info/view/ELECView';
import ENZYView from './ch_info/view/ENZYView';
import CPKView from './ch_info/view/CPKView';
import BILIView from './ch_info/view/BILIView';
import PROTView from './ch_info/view/PROTView';
import TIBCView from './ch_info/view/TIBCView';

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
import TIBCInput from './ch_info/input/TIBCInput';

import DoctorCard from 'src/containers/common/DoctorCard';
import HBA1CView from './ch_info/view/HBA1CView';
import MedTechCard from 'src/containers/common/MedTechCard';
import QualityControlCard from 'src/containers/common/QualityControlCard';

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
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const ChemistryModal = (props) => {
    const classes = useStyles();

    const [headerControl, setHeaderControl] = useState(true)

    const headerHandler = () => {
        setHeaderControl(!headerControl)
    }

    const [fbsInfo, setFbsInfo] = useState(null);
    const [rbsInfo, setRbsInfo] = useState(null);
    const [pprbsInfo, setPprbsInfo] = useState(null);
    const [uracInfo, setUracInfo] = useState(null);
    const [bunInfo, setBunInfo] = useState(null);
    const [creaInfo, setCreaInfo] = useState(null);
    const [hba1cInfo, setHba1cInfo] = useState(null);
    const [lippInfo, setLippInfo] = useState(null);
    const [ogttInfo, setOgttInfo] = useState(null);
    const [ogctInfo, setOgctInfo] = useState(null);
    const [elecInfo, setElecInfo] = useState(null);
    const [enzyInfo, setEnzyInfo] = useState(null);
    const [cpkInfo, setCpkInfo] = useState(null);
    const [biliInfo, setBiliInfo] = useState(null);
    const [protInfo, setProtInfo] = useState(null);
    const [tibcInfo, setTibcInfo] = useState(null);


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

        let additional = {}

        switch (opt) {
            case 'fbs':
                let fbsc = props.chemData.fbs.conventional
                let fbsr = event.target.value

                if (fbsr === '') fbsr = 0

                fbsc = computeChem(fbsr, 0.055)

                additional.conventional = fbsc
                break;

            case 'rbs':
                let rbsc = props.chemData.rbs.conventional
                let rbsr = event.target.value

                if (rbsr === '') rbsr = 0

                rbsc = computeChem(rbsr, 0.055)

                additional.conventional = rbsc
                break;

            case 'pprbs':
                let pprbsc = props.chemData.pprbs.conventional
                let pprbsr = event.target.value

                if (pprbsr === '') pprbsr = 0

                pprbsc = computeChem(pprbsr, 0.055)

                additional.conventional = pprbsc
                break;

            case 'urac':
                let uracc = props.chemData.urac.conventional
                let uracr = event.target.value

                if (uracr === '') uracr = 0

                uracc = computeChem(uracr, 59.48)

                additional.conventional = uracc
                break;

            case 'bun':
                let bunc = props.chemData.bun.conventional
                let bunr = event.target.value

                if (bunr === '') bunr = 0

                bunc = computeChem(bunr, 0.357)

                additional.conventional = bunc
                break;

            case 'crea':
                let creac = props.chemData.crea.conventional
                let crear = event.target.value

                if (crear === '') crear = 0

                creac = computeChem(crear, 88.4)

                additional.conventional = creac
                break;

            case 'ogct':
                let ogctc = props.chemData.ogct.conventional
                let ogctr = event.target.value

                if (ogctr === '') ogctr = 0

                ogctc = computeChem(ogctr, 0.055)

                additional.conventional = ogctc
                break;

            case 'ogtt':
                if (prop === 'ogtt1HrResult') {
                    let ogtt1c = props.chemData.ogtt.ogtt1HrConventional
                    let ogtt1r = event.target.value

                    if (ogtt1r === '') ogtt1r = 0

                    ogtt1c = computeChem(ogtt1r, 0.055)

                    additional.ogtt1HrConventional = ogtt1c
                } else if (prop === 'ogtt2HrResult') {
                    let ogtt2c = props.chemData.ogtt.ogtt2HrConventional
                    let ogtt2r = event.target.value

                    if (ogtt2r === '') ogtt2r = 0

                    ogtt2c = computeChem(ogtt2r, 0.055)

                    additional.ogtt2HrConventional = ogtt2c
                }
                break;

            case 'lipp':
                let cholevalue = props.chemData.lipp.cholesterolResult
                let trigvalue = props.chemData.lipp.triglyceridesResult
                let hdlvalue = props.chemData.lipp.hdlResult

                switch (prop) {
                    case 'cholesterolResult':
                        let cholec = props.chemData.lipp.cholesterolConventional
                        let choler = event.target.value

                        if (choler === '') choler = 0
                        cholevalue = choler

                        cholec = computeChem(choler, 0.0259)

                        additional.cholesterolConventional = cholec
                        break;

                    case 'triglyceridesResult':
                        let trigc = props.chemData.lipp.triglyceridesConventional
                        let trigr = event.target.value

                        if (trigr === '') trigr = 0
                        trigvalue = trigr

                        trigc = computeChem(trigr, 0.0113)

                        additional.triglyceridesConventional = trigc
                        break;

                    case 'hdlResult':
                        let hdlc = props.chemData.lipp.hdlConventional
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

            default: break;
        }

        const updateChemData = updateObject(props.chemData, {
            [opt]: updateObject(props.chemData[opt], {
                [prop]: event.target.value,
                ...additional
            })
        });

        props.setChemData(updateChemData);
    };

    const handleSelectChange = (opt, prop) => (event) => {
        const updateChemData = updateObject(props.chemData, {
            [opt]: updateObject(props.chemData[opt], {
                [prop]: JSON.parse(event.target.value),
            })
        });

        props.setChemData(updateChemData);
    }

    useEffect(() => {
        const serviceRequest = props.chemData.serviceRequest;

        setFbsInfo(null)
        setRbsInfo(null)
        setPprbsInfo(null)
        setUracInfo(null)
        setBunInfo(null)
        setCreaInfo(null)
        setHba1cInfo(null)
        setLippInfo(null)
        setOgttInfo(null)
        setOgctInfo(null)
        setElecInfo(null)
        setEnzyInfo(null)
        setCpkInfo(null)
        setBiliInfo(null)
        setProtInfo(null)

        if (serviceRequest.length > 0) {
            serviceRequest.map((srv) => {
                switch (srv.laboratoryRequest) {
                    case 'FBS':
                        const fbsCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Fasting Blood Sugar</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <FBSView chemData={props.chemData} />
                                        : <FBSInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setFbsInfo(fbsCard);
                        break;

                        case 'TIBC':
                        const tibcCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Total Iron Binding Capacity</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <TIBCView chemData={props.chemData} />
                                        : <TIBCInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setTibcInfo(tibcCard);
                        break;

                    case 'RBS':
                        const rbsCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Random Blood Sugar</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <RBSView chemData={props.chemData} />
                                        : <RBSInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setRbsInfo(rbsCard);
                        break;

                    case 'PPRBS':
                        const pprbsCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Post Prandial Random Blood Sugar</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <PPRBSView chemData={props.chemData} />
                                        : <PPRBSInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setPprbsInfo(pprbsCard);
                        break;

                    case 'URAC':
                        const uracCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Uric Acid</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <URACView chemData={props.chemData} />
                                        : <URACInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setUracInfo(uracCard);
                        break;

                    case 'BUN':
                        const bunCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Blood Urea Nitrogen</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <BUNView chemData={props.chemData} />
                                        : <BUNInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setBunInfo(bunCard);
                        break;

                    case 'CREA':
                        const creaCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Creatinine</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <CREAView chemData={props.chemData} />
                                        : <CREAInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setCreaInfo(creaCard);
                        break;

                    case 'HBA1C':
                        const hba1cCard = (
                            <CCol md="4" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Hemoglobin A1C</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <HBA1CView chemData={props.chemData} />
                                        : <HBA1CInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        )
                        setHba1cInfo(hba1cCard);

                        break;

                    case 'LIPP':
                        const lippCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Lipid Profile</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <LIPPView chemData={props.chemData} />
                                        : <LIPPInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setLippInfo(lippCard);
                        break;

                    case 'OGTT':
                        const ogttCard = (
                            <CRow className="m-0 p-0">
                                <CCol md="12" className="p-0">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Oral Glucose Tolerance Test (OGTT)</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <OGTTView chemData={props.chemData} />
                                            : <OGTTInput
                                                chemData={props.chemData}
                                                handleChange={handleChange}
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange} />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setOgttInfo(ogttCard);
                        break;

                    case 'OGCT':
                        const ogctCard = (
                            <CRow className="m-0 p-0">
                                <CCol md="12" className="p-0">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Oral Glucose Challenge Test (OGCT - 50G)</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <OGCTView chemData={props.chemData} />
                                            : <OGCTInput
                                                chemData={props.chemData}
                                                handleChange={handleChange}
                                                referenceLab={props.referenceLab}
                                                handleSelectChange={handleSelectChange} />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setOgctInfo(ogctCard);
                        break;

                    case 'ELEC':
                        const elecCard = (
                            <CCol md="4" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Serum Electrolytes</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <ELECView chemData={props.chemData} />
                                        : <ELECInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setElecInfo(elecCard);
                        break;

                    case 'ENZY':
                        const enzyCard = (
                            <CCol md="4" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Serum Enzymes</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <ENZYView chemData={props.chemData} />
                                        : <ENZYInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setEnzyInfo(enzyCard);
                        break;

                    case 'CPK':
                        const cpkCard = (
                            <CCol md="4" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Creatine Phosphokinase (CPK)</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <CPKView chemData={props.chemData} />
                                        : <CPKInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setCpkInfo(cpkCard);
                        break;

                    case 'BILI':
                        const biliCard = (
                            <CCol md="4" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Bilirubin</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <BILIView chemData={props.chemData} />
                                        : <BILIInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setBiliInfo(biliCard);
                        break;

                    case 'PROT':
                        const protCard = (
                            <CCol md="4" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Serum Protein</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <PROTView chemData={props.chemData} />
                                        : <PROTInput
                                            chemData={props.chemData}
                                            handleChange={handleChange}
                                            referenceLab={props.referenceLab}
                                            handleSelectChange={handleSelectChange} />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setProtInfo(protCard);
                        break;

                    default:
                        break;
                }
                return srv;
            });
        }
        // eslint-disable-next-line
    }, [props.chemData]);

    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.saveClick();
        }
    }

    let defpatho = null
    const indDoct = props.chemData.doctor
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    let medtech = '---'
    if (props.chemData.labPerson !== null) {
        medtech = labPersonName(props.chemData.labPerson, false)
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='xl'
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle className="font-weight-bold">Chemistry</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.chemData}
                />

                <CRow className="m-0 p-0">
                    {fbsInfo}
                    {rbsInfo}
                    {pprbsInfo}
                    {uracInfo}
                    {bunInfo}
                    {creaInfo}
                    {lippInfo}
                    <CCol md="6" className="p-1">
                        {ogttInfo}
                        {ogctInfo}
                    </CCol>
                    {elecInfo}
                    {enzyInfo}
                    {protInfo}
                    {cpkInfo}
                    {biliInfo}
                    {hba1cInfo}
                    {tibcInfo}

                    <CCol md="6" className="p-1">
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
                                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.chemData.otno.otherNotes}</CLabel>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                                : <CCardBody className="p-1">
                                    <CRow className="ml-1 mr-1 p-0">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Notes</CLabel>
                                            <CInput
                                                value={props.chemData.otno.otherNotes}
                                                onChange={handleChange('otno', 'otherNotes')}
                                            />
                                        </FormControl>
                                    </CRow>
                                </CCardBody>
                            }
                        </CCard>
                    </CCol>
                </CRow>

                <CRow className="m-0 p-0">
                    <CCol md="4" className="p-1">
                        <MedTechCard medtech={medtech} />
                    </CCol>
                    <CCol md="4" className="p-1">
                        <QualityControlCard qualityControl={props.chemData.qualityControl} />
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
                        onClick={() => props.onPrintChemistry(props.chemData.txnId, props.chemData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                        Print Chemistry Report</CButton>
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
                        onClick={() => props.onQualityControl(props.chemData.txnId, props.chemData.id)}
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

export default ChemistryModal
