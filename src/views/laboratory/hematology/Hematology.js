import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import ReactSelect from 'react-select';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import clsx from 'clsx';

import * as actions from 'src/store/actions/index';
import { doctorName, updateObject } from 'src/store/utility';

import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

import HematologyTable from 'src/containers/tables/laboratory/HematologyTable';
import HematologyModal from 'src/containers/modal/laboratory/HematologyModal';
import Swal from 'sweetalert2';

import EmailModal from 'src/containers/modal/common/EmailModal'

const useStyles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    errorMessage: {
        color: '#f00',
        textAlign: 'center',
        fontWeight: "bolder",
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
});

const hemaConfig = {
    id: null,
    requestName: '',
    txnId: '',
    txnSR: '',
    txnType: '',
    branch: null,
    patient: null,
    corporate: null,
    serviceRequest: [],
    itemId: '',
    cashier: null,
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
    cbc: {
        whiteBloodCells: '',
        basophils: '',
        neutrophils: '',
        redBloodCells: '',
        lymphocytes: '',
        hemoglobin: '',
        monocytes: '',
        hematocrit: '',
        eosinophils: '',
        platelet: '',
        referenceLabId: ''
    },
    btyp: {
        bloodType: null,
        rhesusFactor: null,
        referenceLabId: ''
    },
    ctm: {
        timeMin: '',
        timeSec: '',
        referenceLabId: ''
    },
    btm: {
        timeMin: '',
        timeSec: '',
        referenceLabId: ''
    },
    ptm: {
        patientTime: '',
        patientTimeNormalValue: '',
        control: '',
        controlNormalValue: '',
        percentActivity: '',
        percentActivityNormalValue: '',
        inr: '',
        inrNormalValue: '',
        referenceLabId: ''
    },
    pr131: {
        result: '',
        referenceLabId: ''
    },
    aptt: {
        patientTime: '',
        patientTimeNormalValue: '',
        control: '',
        controlNormalValue: '',
        referenceLabId: ''
    },
    masm: {
        result: null,
        referenceLabId: ''
    },
    ferritin: {
        result: '',
        referenceLabId: ''
    },
    rct: {
        result: '',
        referenceLabId: ''
    },
    esr: {
        rate: '',
        esrMethod: null,
        referenceLabId: ''
    },
    otno: {
        otherNotes: '',
    },
    doctor: '',
}

const btOptions = new Map([
    ['A', 'A'],
    ['O', 'O'],
    ['B', 'B'],
    ['AB', 'AB'],
])

const npOptions = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

const esrMethod = new Map([
    ['WINTROBE', 'WINTROBE'],
    ['WESTERGREN', 'WESTERGREN'],
])

const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}


class Hematology extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        hemaData: hemaConfig,

        emailData: emailConfig,
        emailModal: false,
        editViewFlag: false,

        selectedBranch: null,
        selectedChargeTo: null,
    }

    setHematologyData = (updateHemaData) => {
        this.setState({
            ...this.state,
            hemaData: updateHemaData,
        });
    }

    componentDidMount() {
        if (this.props.referenceLaboratoryList <= 0) {
            this.props.onShowReferenceLaboratory(this.props.userToken)
        }
        if (this.props.doctorList.length <= 0) {
            this.props.onGetAllDoctors(this.props.userToken);
        }
        if (this.props.branchList.length <= 0) {
            this.props.onGetAllBranches(this.props.userToken);
        }
        if (this.props.corporateList.length <= 0) {
            this.props.onGetAllCorporates(this.props.userToken);
        }
        this.props.onGetDoctor(this.props.userToken, process.env.REACT_APP_PATHOLOGIST)
    }

    handleSelectChange = (opt) => (event) => {
        this.props.onClearHEList('HE');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    viewTransactions = () => {
        this.props.onClearHEList('HE');
        this.props
            .onViewHEList(
                this.props.userToken,
                'HE',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    openHematologyModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updateHemaData = this.getHemaInfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                hemaData: updateHemaData,
                editViewFlag: false,
            });
        }
    }

    viewHematologyModal = (heRowData, idx) => {
        if (heRowData.status >= 2) {
            const updateHemaData = this.getHemaInfo(heRowData)

            this.setState({
                ...this.state,
                showModal: true,
                hemaData: updateHemaData,
                editViewFlag: true,
            });
        } else {
            Swal.fire({
                title: 'Please enter results to view.',
                icon: 'warning',
                text: 'Record not yet ready for viewing.',
            })
        }
    }

    getHemaInfo = (data) => {
        let requestName = '';
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let serviceRequest = [];
        let itemId = '';
        let cashier = null;
        let labPerson = null;
        let txnRemarks = null;
        let txnDate = '';
        let txnDispatch = null;

        if (data.transaction !== undefined && data.transaction !== null) {
            const txn = data.transaction;
            txnId = txn.transactionid;
            txnSR = txn.id;
            txnType = txn.transactionType;
            branch = txn.branch;
            patient = txn.patient;
            corporate = txn.corporate;
            cashier = txn.cashier;
            txnRemarks = txn.remarks;
            txnDate = txn.transactionDate;
            txnDispatch = txn.dispatch;
        }

        if (data.itemDetails !== undefined && data.itemDetails !== null) {
            const itm = data.itemDetails;
            requestName = itm.itemDescription;
            serviceRequest = itm.serviceRequest;
            itemId = itm.itemid;
        }

        if (data.labPersonel !== undefined && data.labPersonel !== null) {
            labPerson = data.labPersonel
        }
        const updateHemaData = updateObject(hemaConfig, {
            id: data.id,
            txnId: txnId,
            txnSR: txnSR,
            txnType: txnType,
            branch: branch,
            patient: patient,
            corporate: corporate,
            requestName: requestName,
            serviceRequest: serviceRequest,
            cashier: cashier,
            labPerson: labPerson,
            itemId: itemId,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });

        data.itemDetails.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'CBC':
                    const cbc = data.hematology.cbc;
                    if (cbc !== null) {

                        let whiteBloodCells = ''
                        let neutrophils = ''
                        let lymphocytes = ''
                        let monocytes = ''
                        let eosinophils = ''
                        let basophils = ''
                        let redBloodCells = ''
                        let hemoglobin = ''
                        let hematocrit = ''
                        let platelet = ''

                        if (cbc.whiteBloodCells !== null) whiteBloodCells = cbc.whiteBloodCells
                        if (cbc.neutrophils !== null) neutrophils = cbc.neutrophils
                        if (cbc.lymphocytes !== null) lymphocytes = cbc.lymphocytes
                        if (cbc.monocytes !== null) monocytes = cbc.monocytes
                        if (cbc.eosinophils !== null) eosinophils = cbc.eosinophils
                        if (cbc.basophils !== null) basophils = cbc.basophils
                        if (cbc.redBloodCells !== null) redBloodCells = cbc.redBloodCells
                        if (cbc.hemoglobin !== null) hemoglobin = cbc.hemoglobin
                        if (cbc.hematocrit !== null) hematocrit = cbc.hematocrit
                        if (cbc.platelet !== null) platelet = cbc.platelet


                        const cbcvalues = {
                            whiteBloodCells: whiteBloodCells,
                            neutrophils: neutrophils,
                            lymphocytes: lymphocytes,
                            monocytes: monocytes,
                            eosinophils: eosinophils,
                            basophils: basophils,
                            redBloodCells: redBloodCells,
                            hemoglobin: hemoglobin,
                            hematocrit: hematocrit,
                            platelet: platelet,
                            referenceLabId: cbc.referenceLab !== null ? { value: cbc.referenceLab.referenceid, label: cbc.referenceLab.name } : ''
                        }

                        updateHemaData.cbc = cbcvalues
                    }
                    break;

                case 'BTYP':
                    const btyp = data.hematology.bloodTyping
                    if (btyp !== null) {

                        let bloodType = null
                        let rhesusFactor = null

                        if (btOptions.has(btyp.bloodType) === true) {
                            bloodType = {
                                value: btyp.bloodType,
                                label: btOptions.get(btyp.bloodType)
                            }
                        }

                        if (npOptions.has(btyp.rhesusFactor) === true) {
                            rhesusFactor = {
                                value: btyp.rhesusFactor,
                                label: npOptions.get(btyp.rhesusFactor)
                            }
                        }

                        const btypvalues = {
                            bloodType: bloodType,
                            rhesusFactor: rhesusFactor,
                            referenceLabId: btyp.referenceLab !== null ? { value: btyp.referenceLab.referenceid, label: btyp.referenceLab.name } : ''
                        }

                        updateHemaData.btyp = btypvalues
                    }
                    break;

                case 'CTM':
                case 'BTM':
                    const ctbt = data.hematology.ctbt
                    if (ctbt !== null) {

                        let ctm = ''
                        let cts = ''
                        let btm = ''
                        let bts = ''

                        if (ctbt.clottingTimeMin !== null) ctm = ctbt.clottingTimeMin
                        if (ctbt.clottingTimeSec !== null) cts = ctbt.clottingTimeSec
                        if (ctbt.bleedingTimeMin !== null) btm = ctbt.bleedingTimeMin
                        if (ctbt.bleedingTimeSec !== null) bts = ctbt.bleedingTimeSec

                        const ctmvalues = {
                            timeMin: ctm,
                            timeSec: cts,
                            referenceLabId: ctbt.referenceLab !== null ? { value: ctbt.referenceLab.referenceid, label: ctbt.referenceLab.name } : ''
                        }
                        const btmvalues = {
                            timeMin: btm,
                            timeSec: bts,
                            referenceLabId: ctbt.referenceLab !== null ? { value: ctbt.referenceLab.referenceid, label: ctbt.referenceLab.name } : ''
                        }

                        updateHemaData.ctm = ctmvalues
                        updateHemaData.btm = btmvalues
                    }
                    break;

                case 'PTM':
                    const ptm = data.hematology.prothombinTime
                    if (ptm !== null) {

                        let patientTime = ''
                        let patientTimeNormalValue = ''
                        let control = ''
                        let controlNormalValue = ''
                        let percentActivity = ''
                        let percentActivityNormalValue = ''
                        let inr = ''
                        let inrNormalValue = ''

                        if (ptm.patientTime !== null) patientTime = ptm.patientTime
                        if (ptm.patientTimeNV !== null) patientTimeNormalValue = ptm.patientTimeNV
                        if (ptm.control !== null) control = ptm.control
                        if (ptm.controlNV !== null) controlNormalValue = ptm.controlNV
                        if (ptm.percentActivity !== null) percentActivity = ptm.percentActivity
                        if (ptm.percentActivityNV !== null) percentActivityNormalValue = ptm.percentActivityNV
                        if (ptm.inr !== null) inr = ptm.inr
                        if (ptm.inrNV !== null) inrNormalValue = ptm.inrNV

                        const ptmvalues = {
                            patientTime: patientTime,
                            patientTimeNormalValue: patientTimeNormalValue,
                            control: control,
                            controlNormalValue: controlNormalValue,
                            percentActivity: percentActivity,
                            percentActivityNormalValue: percentActivityNormalValue,
                            inr: inr,
                            inrNormalValue: inrNormalValue,
                            referenceLabId: ptm.referenceLab !== null ? { value: ptm.referenceLab.referenceid, label: ptm.referenceLab.name } : ''
                        }

                        updateHemaData.ptm = ptmvalues
                    }
                    break;

                case 'PR131':
                case 'MASM':
                    const prms = data.hematology.prms
                    if (prms !== null) {

                        if (prms.pr131 !== null) {
                            const prvalues = {
                                result: prms.pr131
                            }
                            updateHemaData.pr131 = prvalues
                        }

                        if (prms.malarialSmear !== null) {
                            let msvalues = null;
                            if (npOptions.has(prms.malarialSmear) === true) {
                                msvalues = {
                                    result: {
                                        value: prms.malarialSmear,
                                        label: npOptions.get(prms.malarialSmear)
                                    }
                                }
                            }
                            if (msvalues !== null) {
                                updateHemaData.masm = msvalues
                            }
                        }
                    }
                    break;

                case 'FERR':
                    const ferritin = data.hematology.ferritin
                    let ferrResult = ''

                    if (ferritin !== null) {
                        if (ferritin.result !== null) ferrResult = ferritin.result
                        const ferrivalues = {
                            result: ferrResult,
                            referenceLabId: ferritin.referenceLab !== null ? { value: ferritin.referenceLab.referenceid, label: ferritin.referenceLab.name } : ''
                        }
                        updateHemaData.ferritin = ferrivalues
                    }
                    break;

                case 'RCT':
                    const rct = data.hematology.rct
                    let rctResult = ''

                    if (rct !== null) {
                        if (rct.result !== null) rctResult = rct.result
                        const rctvalues = {
                            result: rctResult,
                            referenceLabId: rct.referenceLab !== null ? { value: rct.referenceLab.referenceid, label: rct.referenceLab.name } : ''
                        }
                        updateHemaData.rct = rctvalues
                    }
                    break;

                case 'APTT':
                    const aptt = data.hematology.aptt
                    if (aptt !== null) {

                        let pTime = ''
                        let pTnv = ''
                        let cont = ''
                        let cnv = ''

                        if (aptt.patientTime !== null) pTime = aptt.patientTime
                        if (aptt.patientTimeNV !== null) pTnv = aptt.patientTimeNV
                        if (aptt.control !== null) cont = aptt.control
                        if (aptt.controlNV !== null) cnv = aptt.controlNV

                        const apttvalues = {
                            patientTime: pTime,
                            patientTimeNormalValue: pTnv,
                            control: cont,
                            controlNormalValue: cnv,
                            referenceLabId: aptt.referenceLab !== null ? { value: aptt.referenceLab.referenceid, label: aptt.referenceLab.name } : ''
                        }

                        updateHemaData.aptt = apttvalues
                    }
                    break;

                case 'ESR':
                    const esr = data.hematology.esr
                    if (esr !== null) {
                        let esrm = null
                        if (esrMethod.has(esr.method) === true) {
                            esrm = {
                                value: esr.method,
                                label: esrMethod.get(esr.method)
                            }
                        }

                        const esrvalues = {
                            rate: esr.rate !== null ? esr.rate : '',
                            esrMethod: esrm,
                            referenceLabId: esr.referenceLab !== null ? { value: esr.referenceLab.referenceid, label: esr.referenceLab.name } : ''
                        }

                        updateHemaData.esr = esrvalues
                    }
                    break;

                default: break;
            }
        })

        const otno = {
            otherNotes: data.otherNotes !== null ? data.otherNotes : '',
        }
        updateHemaData.otno = otno

        let patho = null
        if (data.medicalDoctor !== null) {
            patho = {
                pathologist: {
                    value: data.medicalDoctor.doctorid,
                    label: doctorName(data.medicalDoctor),
                    license: data.medicalDoctor.licenseNumber
                }
            }
        } else if (this.props.doctorInfo !== null) {
            const doc = this.props.doctorInfo
            patho = {
                pathologist: {
                    value: doc.doctorid,
                    label: doctorName(doc),
                    license: doc.licenseNumber
                }
            }
        }
        updateHemaData.doctor = patho

        let qualityControl = null
        if (data.qualityControl !== null) qualityControl = data.qualityControl
        updateHemaData.qualityControl = qualityControl

        return updateHemaData
    }

    closeModal = (hemaResponse) => {
        this.setState({
            ...this.state,
            showModal: false,
            EmailModal: false,
            editViewFlag: false,
        });

        if (hemaResponse !== null) {
            if (this.state.updateIndex !== null) {
                this.hematologyTableRef.updateHematologyToTable(hemaResponse, this.state.updateIndex);
            }
        }
    }

    onShowEmailModal = () => {
        this.setState({
            ...this.state,
            emailModal: true
        });
    }

    saveResults = () => {
        const hemaData = this.state.hemaData
        let hemaRequest = {};
        hemaData.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'CBC':
                    const cbc = hemaData.cbc;

                    let whiteBloodCells = null;
                    let neutrophils = null;
                    let lymphocytes = null;
                    let monocytes = null;
                    let eosinophils = null;
                    let basophils = null;
                    let redBloodCells = null;
                    let hemoglobin = null;
                    let hematocrit = null;
                    let platelet = null;
                    let referenceLabIdCbc = '';

                    if (cbc.whiteBloodCells !== "") whiteBloodCells = cbc.whiteBloodCells
                    if (cbc.neutrophils !== "") neutrophils = cbc.neutrophils
                    if (cbc.lymphocytes !== "") lymphocytes = cbc.lymphocytes
                    if (cbc.monocytes !== "") monocytes = cbc.monocytes
                    if (cbc.eosinophils !== "") eosinophils = cbc.eosinophils
                    if (cbc.basophils !== "") basophils = cbc.basophils
                    if (cbc.redBloodCells !== "") redBloodCells = cbc.redBloodCells
                    if (cbc.hemoglobin !== "") hemoglobin = cbc.hemoglobin
                    if (cbc.hematocrit !== "") hematocrit = cbc.hematocrit
                    if (cbc.platelet !== "") platelet = cbc.platelet
                    if (cbc.referenceLabId !== "") referenceLabIdCbc = cbc.referenceLabId.value

                    const cbcvalues = {
                        whiteBloodCells: whiteBloodCells,
                        neutrophils: neutrophils,
                        lymphocytes: lymphocytes,
                        monocytes: monocytes,
                        eosinophils: eosinophils,
                        basophils: basophils,
                        redBloodCells: redBloodCells,
                        hemoglobin: hemoglobin,
                        hematocrit: hematocrit,
                        platelet: platelet,
                        referenceLabId: referenceLabIdCbc
                    }

                    hemaRequest.cbc = cbcvalues
                    break;

                case 'BTYP':
                    const btyp = hemaData.btyp;

                    let bloodType = null;
                    let rhesusFactor = null;
                    let referenceLabIdBTYP = '';

                    if (btyp.bloodType !== null) bloodType = btyp.bloodType.value
                    if (btyp.rhesusFactor !== null) rhesusFactor = btyp.rhesusFactor.value
                    if (btyp.referenceLabId !== "") referenceLabIdBTYP = btyp.referenceLabId.value

                    const btypvalues = {
                        bloodType: bloodType,
                        rhesusFactor: rhesusFactor,
                        referenceLabId: referenceLabIdBTYP
                    }

                    hemaRequest.bloodTyping = btypvalues
                    break;

                case 'CTM':
                case 'BTM':
                    const ctm = hemaData.ctm
                    const btm = hemaData.btm

                    let clottingTimeMin = null
                    let clottingTimeSec = null
                    let bleedingTimeMin = null
                    let bleedingTimeSec = null

                    if (ctm.timeMin !== "") clottingTimeMin = ctm.timeMin
                    if (ctm.timeSec !== "") clottingTimeSec = ctm.timeSec
                    if (btm.timeMin !== "") bleedingTimeMin = btm.timeMin
                    if (btm.timeSec !== "") bleedingTimeSec = btm.timeSec

                    const ctbtvalues = {
                        clottingTimeMin: clottingTimeMin,
                        clottingTimeSec: clottingTimeSec,
                        bleedingTimeMin: bleedingTimeMin,
                        bleedingTimeSec: bleedingTimeSec
                    }

                    hemaRequest.ctbt = ctbtvalues
                    break;

                case 'PTM':
                    const ptm = hemaData.ptm

                    let patientTime = null
                    let patientTimeNV = null
                    let control = null
                    let controlNV = null
                    let percentActivity = null
                    let percentActivityNV = null
                    let inr = null
                    let inrNV = null
                    let referenceLabIdPTM = '';

                    if (ptm.patientTime !== "") patientTime = ptm.patientTime
                    if (ptm.patientTimeNormalValue !== "") patientTimeNV = ptm.patientTimeNormalValue
                    if (ptm.control !== "") control = ptm.control
                    if (ptm.controlNormalValue !== "") controlNV = ptm.controlNormalValue
                    if (ptm.percentActivity !== "") percentActivity = ptm.percentActivity
                    if (ptm.percentActivityNormalValue !== "") percentActivityNV = ptm.percentActivityNormalValue
                    if (ptm.inr !== "") inr = ptm.inr
                    if (ptm.inrNormalValue !== "") inrNV = ptm.inrNormalValue
                    if (ptm.referenceLabId !== "") referenceLabIdPTM = ptm.referenceLabId.value

                    const ptmvalues = {
                        patientTime: patientTime,
                        patientTimeNV: patientTimeNV,
                        control: control,
                        controlNV: controlNV,
                        percentActivity: percentActivity,
                        percentActivityNV: percentActivityNV,
                        inr: inr,
                        inrNV: inrNV,
                        referenceLabId: referenceLabIdPTM
                    }

                    hemaRequest.prothrombinTime = ptmvalues
                    break;

                case 'PR131':
                case 'MASM':
                    const pr = hemaData.pr131
                    const ms = hemaData.masm

                    let pr131 = null
                    let malarialSmear = null

                    if (pr.result !== "") pr131 = pr.result
                    if (ms.result !== null) malarialSmear = ms.result.value

                    const prmsvalues = {
                        pr131: pr131,
                        malarialSmear: malarialSmear
                    }

                    hemaRequest.prms = prmsvalues
                    break;

                case 'FERR':
                    const ferr = hemaData.ferritin

                    let ferrValue = null

                    if (ferr.result !== null) ferrValue = ferr.result

                    const ferritinvalues = {
                        result: ferrValue
                    }

                    hemaRequest.ferritin = ferritinvalues
                    break;

                case 'RCT':
                    const rtc = hemaData.rct

                    let rctValue = null

                    if (rtc.result !== null) rctValue = rtc.result

                    const rctvalues = {
                        result: rctValue
                    }

                    hemaRequest.rtc = rctvalues
                    break;

                case 'APTT':
                    const aptt = hemaData.aptt

                    let patientTimeAptt = null
                    let patientTimeNVAptt = null
                    let controlAptt = null
                    let controlNVAptt = null
                    let referenceLabIdAPTT = '';


                    if (aptt.patientTime !== "") patientTimeAptt = aptt.patientTime
                    if (aptt.patientTimeNormalValue !== "") patientTimeNVAptt = aptt.patientTimeNormalValue
                    if (aptt.control !== "") controlAptt = aptt.control
                    if (aptt.controlNormalValue !== "") controlNVAptt = aptt.controlNormalValue
                    if (aptt.referenceLabId !== "") referenceLabIdAPTT = aptt.referenceLabId.value
                    const apttvalues = {
                        patientTime: patientTimeAptt,
                        patientTimeNV: patientTimeNVAptt,
                        control: controlAptt,
                        controlNV: controlNVAptt,
                        referenceLabId: referenceLabIdAPTT
                    }

                    hemaRequest.aptt = apttvalues
                    break;

                case 'ESR':
                    const esr = hemaData.esr

                    let rate = null
                    let method = null
                    let referenceLabIdESR = '';

                    if (esr.rate !== "") rate = esr.rate
                    if (esr.esrMethod !== null) method = esr.esrMethod.value
                    if (esr.referenceLabId !== "") referenceLabIdESR = esr.referenceLabId.value

                    const esrvalues = {
                        rate: rate,
                        method: method,
                        referenceLabId: referenceLabIdESR
                    }

                    hemaRequest.esr = esrvalues
                    break;

                default: break;
            }
        })

        let otherNotes = null
        if (hemaData.otno.otherNotes !== "") otherNotes = hemaData.otno.otherNotes
        hemaRequest.otherNotes = otherNotes

        let patho = null
        if (hemaData.doctor !== null) patho = hemaData.doctor.pathologist.value
        hemaRequest.pathologistId = patho

        const transid = hemaData.txnId
        const labid = hemaData.id

        Swal.fire({
            title: 'Hematology',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveHematology(this.props.userToken, hemaRequest, transid, labid, this.closeModal)
            }
        })
    };

    onPrintHematology = (transid, labid, status, headerControl) => {
        // const roles = [].concat(this.props.auth.roles)
        //     .filter(r => r === 'ADMIN');

        // if (roles.length > 0) {
        if (status >= 2) {
            Swal.fire({
                title: 'Hematology Result',
                text: "Do you want to print this report?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onPrintHematology(this.props.userToken, transid, labid, headerControl)
                }
            })
        } else {
            Swal.fire({
                title: 'Please enter results to print.',
                icon: 'warning',
                text: 'Record not yet ready for printing.'
            })
        }
        // } else {
        //     Swal.fire({
        //         title: 'Not authorized to print',
        //         icon: 'warning',
        //         text: 'Please contact admin.'
        //     })
        // }

    }

    onQualityControl = (transid, labid) => {
        Swal.fire({
            title: 'Quality Control',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onQCHematology(this.props.userToken, transid, labid, this.closeModal);
            }
        })
    }
    onShowEmailModal = (data) => {
        const updateHemaData = this.getHemaInfo(data)

        this.setState({
            ...this.state,
            emailModal: true,
            modalTitle: "Email Hematology",
            CMData: updateHemaData,
            emailData: {
                emailContent: {
                    sendTo: updateHemaData.patient.email,
                    sendCc: '',
                    emailSubject: 'Hematology Results',
                    emailBody:
                        `Dear Team,\n\nYou may now look to the attached file of your result in PDF format and Excel format.\nFor any question/classification, please contact us at 0917-535-9417 for Globe and\n0925-577-8378 for Sun/Smart or send us an email at\nquestphil.corpresult@gmail.com\n\nThank you for your concern!\n\nYours truly,\n\nQuest Diagnostics Team`,
                }
            }
        });
    }

    onSendEmailHematology = (emailValues, transid, labid) => {

        Swal.fire({
            title: 'Hematology Result',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendEmailHematology(this.props.userToken, emailValues, transid, labid, this.closeModal);
            }
        })
    }

    render() {
        const { classes } = this.props;

        const dateDisplayFormat = 'MMM-DD-YYYY hh:mm a'

        const dateChangeHandler = (prop) => (event) => {
            this.setState({
                ...this.state,
                [prop]: event
            })
        }

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.corpsLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <HematologyModal
                    referenceLab={this.props.referenceLaboratoryList}
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    hemaData={this.state.hemaData}
                    setHemaData={this.setHematologyData}
                    doctorList={this.props.doctorList}
                    editViewFlag={this.state.editViewFlag}
                    onPrintHematology={this.onPrintHematology}
                    onQualityControl={this.onQualityControl}
                />

                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.chemData}
                    emailData={this.state.emailData}
                    closeClick={this.closeModal}
                    onSendEmail={this.onSendEmailHematology}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Hematology</h3>
                        </CCardHeader>

                        <CCardBody>
                            <CRow>
                                <CCol md="3" className="p-1">
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            value={this.state.dateFromValue}
                                            format={dateDisplayFormat}
                                            label="Start Date"
                                            inputVariant="outlined"
                                            onChange={dateChangeHandler('dateFromValue')}
                                            showTodayButton
                                            disableFuture
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            value={this.state.dateToValue}
                                            format={dateDisplayFormat}
                                            label="End Date"
                                            inputVariant="outlined"
                                            onChange={dateChangeHandler('dateToValue')}
                                            showTodayButton
                                            disableFuture
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <CButton
                                        className="border border-dark"
                                        color="success"
                                        onClick={this.viewTransactions}
                                    >
                                        <i className="mfe-2 fas fa-list" />
                                        View
                                    </CButton>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="3" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Branch</CLabel>
                                        <ReactSelect
                                            className="basic-single"
                                            placeholder="All"
                                            value={this.state.selectedBranch}
                                            onChange={this.handleSelectChange('selectedBranch')}
                                            isClearable={true}
                                            isSearchable={false}
                                            isLoading={false}
                                            options={
                                                [].concat(this.props.branchList)
                                                    .map(brn => {
                                                        return {
                                                            value: brn.branchid,
                                                            label: brn.branchName
                                                        }
                                                    })
                                            }
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="4" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Charge To</CLabel>
                                        <ReactSelect
                                            className="basic-single"
                                            placeholder="All"
                                            value={this.state.selectedChargeTo}
                                            onChange={this.handleSelectChange('selectedChargeTo')}
                                            isClearable={true}
                                            isSearchable={true}
                                            isLoading={this.props.corpsLoading}
                                            options={
                                                [].concat(this.props.corporateList)
                                                    .sort((a, b) => a.companyName > b.companyName ? 1 : -1)
                                                    .map((corp) => {
                                                        return {
                                                            value: corp.corporateid,
                                                            label: corp.companyName
                                                        }
                                                    })
                                            }
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <hr />
                            <div className="table-responsive">
                                <HematologyTable
                                    onRef={ref => (this.hematologyTableRef = ref)}
                                    openHematologyModal={this.openHematologyModal}
                                    viewHematologyModal={this.viewHematologyModal}
                                    onPrintHematology={this.onPrintHematology}
                                    onShowEmailModal={this.onShowEmailModal}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
        loading: state.lab.loading,
        error: state.lab.error,
        userToken: state.auth.token,
        hemaList: state.lab.hematologyList,
        doctorList: state.docs.doctorList,
        doctorInfo: state.docs.doctorData,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        branchList: state.bran.branchList,
        referenceLaboratoryList: state.refLab.referenceLaboratoryList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onGetDoctor: (token, docid) => dispatch(actions.getDoctor(token, docid)),
        onSaveHematology: (token, hemaValues, transid, labid, closeModal) => dispatch(actions.saveHematology(token, hemaValues, transid, labid, closeModal)),
        onViewHEList: (token, procedure, startDate, endDate, branchId, chargeTo) => dispatch(actions.getLaboratoryServiceRequests(token, procedure, startDate, endDate, branchId, chargeTo)),
        onClearHEList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onPrintHematology: (token, transid, labid, withHeaderFooter) => dispatch(actions.printHematology(token, transid, labid, withHeaderFooter)),
        onQCHematology: (token, transid, labid, closeModal) => dispatch(actions.qualityControlHematology(token, transid, labid, closeModal)),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Hematology));