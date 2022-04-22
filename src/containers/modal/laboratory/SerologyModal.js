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

import { doctorName, labPersonName } from 'src/store/utility';

import PatientInformation from 'src/containers/common/PatientInformation';

import SERView from './se_info/view/SERView';
import TYPHView from './se_info/view/TYPHView';
import THYRView from './se_info/view/THYRView';
import CRPView from './se_info/view/CRPView';
import HIVView from './se_info/view/HIVView';
import AGENView from './se_info/view/AGENView';
import COVIDView from './se_info/view/COVIDView';
import RTANTIGENView from './se_info/view/RTANTIGENView';

import SERInput from './se_info/input/SERInput';
import TYPHInput from './se_info/input/TYPHInput';
import THYRInput from './se_info/input/THYRInput';
import CRPInput from './se_info/input/CRPInput';
import RFTInput from './se_info/input/RFTInput';
import MEDSERInput from './se_info/input/medSerInput';
import HIVInput from './se_info/input/HIVInput';
import AGENInput from './se_info/input/AGENInput';
import COVIDInput from './se_info/input/COVIDInput';
import TPHAInput from './se_info/input/TPHAInput';
import ASOInput from './se_info/input/ASOInput';
import DENGUEInput from './se_info/input/DENGUEInput';
import TPNInput from './se_info/input/TPNInput';

import RTANTIGENInput from './se_info/input/RTANTIGENInput';
import RTPCRInput from './se_info/input/RTPCRInput';

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
        color: 'white'
    }
}));


const SerologyModal = (props) => {
    const classes = useStyles();

    const [headerControl, setHeaderControl] = useState(true)

    const headerHandler = () => {
        setHeaderControl(!headerControl)
    }

    const rnOptions = [
        { value: true, label: 'REACTIVE' },
        { value: false, label: 'NONREACTIVE' },
    ]

    const npOptions = [
        { value: true, label: 'POSITIVE' },
        { value: false, label: 'NEGATIVE' },
    ]

    const [serInfo, setSerInfo] = useState(null);
    const [typhInfo, setTyphInfo] = useState(null);
    const [thyrInfo, setThyrInfo] = useState(null);
    const [crpInfo, setCrpInfo] = useState(null);
    const [hivInfo, setHivInfo] = useState(null);
    const [agenInfo, setAgenInfo] = useState(null);
    const [covidInfo, setCovidInfo] = useState(null);
    const [antigenInfo, setAntigenInfo] = useState(null);
    const [rtpcrInfo, setRtpcrInfo] = useState(null);
    const [rftInfo, setRftInfo] = useState(null);
    const [medSerInfo, setMedSerInfo] = useState(null);
    const [tphaInfo, setTphaInfo] = useState(null);
    const [asoInfo, setAsoInfo] = useState(null);
    const [dengueInfo, setDengueInfo] = useState(null);
    const [tpnInfo, setTpnInfo] = useState(null);

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
        const updateSeroData = updateObject(props.seroData, {
            [opt]: updateObject(props.seroData[opt], {
                [prop]: event.target.value,
            })
        });

        props.setSeroData(updateSeroData);
    };

    const dateChangeHandler = (opt, prop) => (event) => {
        const updateSeroData = updateObject(props.seroData, {
            [opt]: updateObject(props.seroData[opt], {
                [prop]: event.format('YYYY-MM-DD HH:mm'),
            })
        });

        props.setSeroData(updateSeroData);
    }

    const handleSelectChange = (opt, prop) => (event) => {
        event.persist()
        const updateSeroData = updateObject(props.seroData, {
            [opt]: updateObject(props.seroData[opt], {
                [prop]: JSON.parse(event.target.value),
            })
        });

        props.setSeroData(updateSeroData);
    }
    useEffect(() => {
        const serviceRequest = props.seroData.serviceRequest;

        setSerInfo(null);
        setTyphInfo(null);
        setThyrInfo(null);
        setCrpInfo(null);
        setHivInfo(null);
        setAgenInfo(null);
        setCovidInfo(null);
        setAntigenInfo(null);
        setRtpcrInfo(null);
        setRftInfo(null);
        setMedSerInfo(null);
        setTphaInfo(null);
        setAsoInfo(null);
        setDengueInfo(null)
        setTpnInfo(null)

        if (serviceRequest.length > 0) {
            serviceRequest.map((srv) => {
                switch (srv.laboratoryRequest) {
                    case 'SER':
                        const serCard = (
                            <CRow className="m-0 p-0">
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Serology</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <SERView seroData={props.seroData} />
                                            : <SERInput
                                                referenceLab={props.referenceLab}
                                                seroData={props.seroData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                npOptions={npOptions}
                                                rnOptions={rnOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setSerInfo(serCard);
                        break;

                    case 'TYPH':
                        const typhCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Typhidot</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <TYPHView seroData={props.seroData} />
                                        : <TYPHInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleSelectChange={handleSelectChange}
                                            npOptions={npOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setTyphInfo(typhCard);
                        break;

                    case 'THYR':
                        const thyrCard = (
                            <CRow className="m-0 p-0">
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Thyroid</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <THYRView seroData={props.seroData} />
                                            : <THYRInput
                                                referenceLab={props.referenceLab}
                                                seroData={props.seroData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}

                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setThyrInfo(thyrCard);
                        break;

                    case 'AGEN':
                        const agenCard = (
                            <CRow className="m-0 p-0">
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">Tumor Markers</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <AGENView seroData={props.seroData} />
                                            : <AGENInput
                                                referenceLab={props.referenceLab}
                                                seroData={props.seroData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            </CRow>
                        );
                        setAgenInfo(agenCard);
                        break;

                    case 'CRP':
                        const crpCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">C-Reactive Protein</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <CRPView seroData={props.seroData} />
                                        : <CRPInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleChange={handleChange}
                                            handleSelectChange={handleSelectChange}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setCrpInfo(crpCard);
                        break;

                    case 'RFT':
                        const rftCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">RHEUMATOID FACTOR TITER</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <CRPView seroData={props.seroData} />
                                        : <RFTInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleChange={handleChange}
                                            handleSelectChange={handleSelectChange}
                                            npOptions={npOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setRftInfo(rftCard);
                        break;

                    case 'MS':
                        const medSerCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Medical Certificate</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <CRPView seroData={props.seroData} />
                                        : <MEDSERInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleChange={handleChange}
                                            handleSelectChange={handleSelectChange}
                                            npOptions={npOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setMedSerInfo(medSerCard);
                        break;

                    case 'TPHA':
                        const tphaCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">TPHA WITH TITER</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <CRPView seroData={props.seroData} />
                                        : <TPHAInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleChange={handleChange}
                                            handleSelectChange={handleSelectChange}
                                            npOptions={npOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setTphaInfo(tphaCard);
                        break;

                        case 'ASO':
                            const asoCard = (
                                <CCol md="6" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">ASO TITER</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <CRPView seroData={props.seroData} />
                                            : <ASOInput
                                                referenceLab={props.referenceLab}
                                                seroData={props.seroData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                npOptions={npOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            );
                            setAsoInfo(asoCard);
                            break;

                            case 'DGE':
                            const dengueCard = (
                                <CCol md="6" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">ASO TITER</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <CRPView seroData={props.seroData} />
                                            : <DENGUEInput
                                                referenceLab={props.referenceLab}
                                                seroData={props.seroData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                npOptions={npOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            );
                            setDengueInfo(dengueCard);
                            break;

                            case 'TPN':
                            const tpnCard = (
                                <CCol md="6" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                            <h6 className="m-1">ASO TITER</h6>
                                        </CCardHeader>
                                        {props.editViewFlag === true
                                            ? <CRPView seroData={props.seroData} />
                                            : <TPNInput
                                                referenceLab={props.referenceLab}
                                                seroData={props.seroData}
                                                handleChange={handleChange}
                                                handleSelectChange={handleSelectChange}
                                                npOptions={npOptions}
                                            />
                                        }
                                    </CCard>
                                </CCol>
                            );
                            setTpnInfo(tpnCard);
                            break;

                            
                    case 'HIV':
                        const hivCard = (
                            <CCol md="6" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">Human Immunodeficiency Viruses ( HIV )</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <HIVView seroData={props.seroData} />
                                        : <HIVInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleSelectChange={handleSelectChange}
                                            rnOptions={rnOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setHivInfo(hivCard);
                        break;

                    case 'COVID':
                        const covidCard = (
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">ANTIBODY</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <COVIDView seroData={props.seroData} />
                                        : <COVIDInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleChange={handleChange}
                                            handleSelectChange={handleSelectChange}
                                            rnOptions={rnOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setCovidInfo(covidCard);
                        break;

                    case 'ANTIGEN':
                        const antigenCard = (
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">ANTIGEN</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <RTANTIGENView seroData={props.seroData} />
                                        : <RTANTIGENInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleChange={handleChange}
                                            handleSelectChange={handleSelectChange}
                                            handleDateChangeHandler={dateChangeHandler}
                                            rnOptions={npOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setAntigenInfo(antigenCard);
                        break;

                    case 'RTPCR':
                        const rtpcrCard = (
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                        <h6 className="m-1">RTPCR Test</h6>
                                    </CCardHeader>
                                    {props.editViewFlag === true
                                        ? <RTANTIGENView seroData={props.seroData} />
                                        : <RTPCRInput
                                            referenceLab={props.referenceLab}
                                            seroData={props.seroData}
                                            handleChange={handleChange}
                                            handleSelectChange={handleSelectChange}
                                            handleDateChangeHandler={dateChangeHandler}
                                            rnOptions={npOptions}
                                        />
                                    }
                                </CCard>
                            </CCol>
                        );
                        setRtpcrInfo(rtpcrCard);
                        break;

                    default:
                        break;
                }
                return srv;
            });
        }
        // eslint-disable-next-line
    }, [props.seroData]);

    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.saveClick();
        }
    }

    let defpatho = null
    const indDoct = props.seroData.doctor
    if (indDoct !== undefined && indDoct !== null) {
        if (indDoct.pathologist !== null) {
            defpatho = indDoct.pathologist
        }
    }

    let medtech = '---'
    if (props.seroData.labPerson !== null) {
        medtech = labPersonName(props.seroData.labPerson, false)
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='xl'
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle className="font-weight-bold">Serology</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.seroData}
                />

                {serInfo}
                {thyrInfo}
                {agenInfo}
                <CRow className="m-0 p-0">
                    {typhInfo}
                    {crpInfo}
                    {hivInfo}
                    {covidInfo}
                    {antigenInfo}
                    {rtpcrInfo}
                    {rftInfo}
                    {medSerInfo}
                    {tphaInfo}
                    {asoInfo}
                    {dengueInfo}
                    {tpnInfo}
                </CRow>

                <CRow className="m-0 p-0">
                    <CCol md="12" className="p-1">
                        <CCard className="mb-1">
                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                <h6 className="m-1">Other Notes/Findings</h6>
                            </CCardHeader>
                            {props.editViewFlag === true
                                ? <CCardBody className="p-1">
                                    <CRow className="ml-1 mr-1 p-0">
                                        <CCol md="2" className="p-1">
                                            <CLabel className="mb-0 ml-2">Notes: </CLabel>
                                        </CCol>
                                        <CCol md="10" className="p-1">
                                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.seroData.otno.otherNotes}</CLabel>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                                : <CCardBody className="p-1">
                                    <CRow className="ml-1 mr-1 p-0">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Remarks / Impressions</CLabel>
                                            <CInput
                                                value={props.seroData.otno.otherNotes}
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
                        <QualityControlCard qualityControl={props.seroData.qualityControl} />
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
                        onClick={() => props.onPrintSerology(props.seroData.txnId, props.seroData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                        Print Serology Report</CButton>
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
                        onClick={() => props.onQualityControl(props.seroData.txnId, props.seroData.id)}
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

export default SerologyModal
