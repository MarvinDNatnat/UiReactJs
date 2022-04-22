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

import ChemistryTable from 'src/containers/tables/laboratory/ChemistryTable';
import ChemistryModal from 'src/containers/modal/laboratory/ChemistryModal';
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
        color: 'white'
    }
});

const chemConfig = {
    id: null,
    requestName: '',
    txnId: '',
    txnType: '',
    branch: null,
    patient: null,
    corporate: null,
    serviceRequest: [],
    itemId: '',
    specificTest: '',
    cashier: null,
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
    fbs: {
        result: '',
        conventional: '',
        referenceLabId: ''
    },
    rbs: {
        result: '',
        conventional: '',
        referenceLabId: ''
    },
    pprbs: {
        result: '',
        conventional: '',
        referenceLabId: ''
    },
    urac: {
        result: '',
        conventional: '',
        referenceLabId: ''
    },
    bun: {
        result: '',
        conventional: '',
        referenceLabId: ''
    },
    crea: {
        result: '',
        conventional: '',
        referenceLabId: ''
    },
    hba1c: {
        hemoglobinA1C: '',
        referenceLabId: ''
    },
    prot: {
        totalProtein: '',
        albumin: '',
        globulin: '',
        agRatio: '',
        referenceLabId: ''
    },
    lipp: {
        cholesterolResult: '',
        cholesterolConventional: '',
        triglyceridesResult: '',
        triglyceridesConventional: '',
        hdlResult: '',
        hdlConventional: '',
        ldlResult: '',
        ldlConventional: '',
        hdlRatio: '',
        vldl: '',
        referenceLabId: ''
    },
    ogtt: {
        ogtt1HrResult: '',
        ogtt1HrConventional: '',
        ogtt2HrResult: '',
        ogtt2HrConventional: '',
        referenceLabId: ''
    },
    ogct: {
        result: '',
        conventional: '',
        referenceLabId: ''
    },
    tibc: {
        result: '',
        referenceLabId: ''
    },
    elec: {
        sodium: '',
        potassium: '',
        chloride: '',
        inorganicPhosphorus: '',
        totalCalcium: '',
        ionizedCalcium: '',
        magnesium: '',
        totalIron: '',
        referenceLabId: ''
    },
    enzy: {
        sgptalt: '',
        sgotast: '',
        amylase: '',
        lipase: '',
        ggtp: '',
        ldh: '',
        alp: '',
        referenceLabId: ''
    },
    cpk: {
        cpkmb: '',
        cpkmm: '',
        totalCpk: '',
        referenceLabId: ''
    },
    bili: {
        totalAdult: '',
        direct: '',
        indirect: '',
        referenceLabId: ''
    },
    otno: {
        otherNotes: '',
        referenceLabId: ''
    },
    doctor: '',
}

const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}

class Chemistry extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        chemData: chemConfig,

        emailData: emailConfig,

        emailModal: false,
        editViewFlag: false,

        selectedBranch: null,
        selectedChargeTo: null,
    }

    setChemistryData = (updateChemData) => {
        this.setState({
            ...this.state,
            chemData: updateChemData,
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
        this.props.onClearCHList('CH');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    viewTransactions = () => {
        this.props.onClearCHList('CH');
        this.props
            .onViewCHList(
                this.props.userToken,
                'CH',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    openChemistryModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updateChemData = this.getChemInfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                chemData: updateChemData,
                editViewFlag: false
            });
        }
    }

    viewChemistryModal = (chRowData, idx) => {
        if (chRowData.status >= 2) {

            const updateChemData = this.getChemInfo(chRowData)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                chemData: updateChemData,
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

    getChemInfo = (data) => {

        let requestName = '';
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let serviceRequest = [];
        let itemId = ''
        let specificTest = null;
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
            specificTest = itm.specificTest !== 'all' ? itm.specificTest : '';
        }

        if (data.labPersonel !== undefined && data.labPersonel !== null) {
            labPerson = data.labPersonel
        }

        const updateChemData = updateObject(chemConfig, {
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
            itemId: itemId,
            labPerson: labPerson,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
            specificTest: specificTest,
        });


        data.itemDetails.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'FBS':
                    const fbs = data.chemistry.fbs;
                    if (fbs !== null) {
                        const fbsvalues = {
                            result: fbs.fbs !== null ? fbs.fbs : '',
                            conventional: fbs.conventional !== null ? fbs.conventional : '',
                            referenceLabId: fbs.referenceLab !== null ? { value: fbs.referenceLab.referenceid, label: fbs.referenceLab.name } : ''
                        }

                        updateChemData.fbs = fbsvalues
                    }
                    break;

                case 'TIBC':
                    const tibc = data.chemistry.tibc;
                    if (tibc !== null) {
                        const tibcValues = {
                            result: tibc.result !== null ? tibc.result : '',
                            referenceLabId: tibc.referenceLab !== null ? { value: tibc.referenceLab.referenceid, label: tibc.referenceLab.name } : ''
                        }

                        updateChemData.tibc = tibcValues
                    }
                    break;
                case 'RBS':
                    const rbs = data.chemistry.rbs;
                    if (rbs !== null) {
                        const rbsvalues = {
                            result: rbs.rbs !== null ? rbs.rbs : '',
                            conventional: rbs.conventional !== null ? rbs.conventional : '',
                            referenceLabId: rbs.referenceLab !== null ? { value: rbs.referenceLab.referenceid, label: rbs.referenceLab.name } : ''
                        }

                        updateChemData.rbs = rbsvalues
                    }
                    break;

                case 'PPRBS':
                    const pprbs = data.chemistry.pprbs;
                    if (pprbs !== null) {
                        const pprbsvalues = {
                            result: pprbs.pprbs !== null ? pprbs.pprbs : '',
                            conventional: pprbs.conventional !== null ? pprbs.conventional : '',
                            referenceLabId: pprbs.referenceLab !== null ? { value: pprbs.referenceLab.referenceid, label: pprbs.referenceLab.name } : ''
                        }

                        updateChemData.pprbs = pprbsvalues
                    }
                    break;

                case 'URAC':
                    const urac = data.chemistry.uricAcid;
                    if (urac !== null) {
                        const uracvalues = {
                            result: urac.uricAcid !== null ? urac.uricAcid : '',
                            conventional: urac.conventional !== null ? urac.conventional : '',
                            referenceLabId: urac.referenceLab !== null ? { value: urac.referenceLab.referenceid, label: urac.referenceLab.name } : ''
                        }

                        updateChemData.urac = uracvalues
                    }
                    break;

                case 'BUN':
                    const bun = data.chemistry.bun;
                    if (bun !== null) {
                        const bunvalues = {
                            result: bun.bun !== null ? bun.bun : '',
                            conventional: bun.conventional !== null ? bun.conventional : '',
                            referenceLabId: bun.referenceLab !== null ? { value: bun.referenceLab.referenceid, label: bun.referenceLab.name } : ''
                        }

                        updateChemData.bun = bunvalues
                    }
                    break;

                case 'CREA':
                    const crea = data.chemistry.creatinine;
                    if (crea !== null) {
                        const creavalues = {
                            result: crea.creatinine !== null ? crea.creatinine : '',
                            conventional: crea.conventional !== null ? crea.conventional : '',
                            referenceLabId: crea.referenceLab !== null ? { value: crea.referenceLab.referenceid, label: crea.referenceLab.name } : ''
                        }

                        updateChemData.crea = creavalues
                    }
                    break;

                case 'HBA1C':
                    const cche = data.chemistry.hemoglobin
                    if (cche !== null) {
                        const cchevalues = {
                            hemoglobinA1C: cche.hemoglobinA1C !== null ? cche.hemoglobinA1C : '',
                            referenceLabId: cche.referenceLab !== null ? { value: cche.referenceLab.referenceid, label: cche.referenceLab.name } : ''
                        }

                        updateChemData.hba1c = cchevalues
                    }
                    break;

                case 'LIPP':
                    const lipp = data.chemistry.lipidProfile
                    if (lipp !== null) {

                        const lippvalues = {
                            cholesterolResult: lipp.cholesterol !== null ? lipp.cholesterol : '',
                            cholesterolConventional: lipp.cholesterolConventional !== null ? lipp.cholesterolConventional : '',
                            triglyceridesResult: lipp.triglycerides !== null ? lipp.triglycerides : '',
                            triglyceridesConventional: lipp.triglyceridesConventional !== null ? lipp.triglyceridesConventional : '',
                            hdlResult: lipp.hdl !== null ? lipp.hdl : '',
                            hdlConventional: lipp.hdlConventional !== null ? lipp.hdlConventional : '',
                            ldlResult: lipp.ldl !== null ? lipp.ldl : '',
                            ldlConventional: lipp.ldlConventional !== null ? lipp.ldlConventional : '',
                            hdlRatio: lipp.hdlRatio !== null ? lipp.hdlRatio : '',
                            vldl: lipp.vldl !== null ? lipp.vldl : '',
                            referenceLabId: lipp.referenceLab !== null ? { value: lipp.referenceLab.referenceid, label: lipp.referenceLab.name } : ''
                        }

                        updateChemData.lipp = lippvalues
                    }
                    break;

                case 'OGTT':
                    const ogtt = data.chemistry.ogtt
                    if (ogtt !== null) {

                        const ogttvalues = {
                            ogtt1HrResult: ogtt.ogtt1Hr !== null ? ogtt.ogtt1Hr : '',
                            ogtt1HrConventional: ogtt.ogtt1HrConventional !== null ? ogtt.ogtt1HrConventional : '',
                            ogtt2HrResult: ogtt.ogtt2Hr !== null ? ogtt.ogtt2Hr : '',
                            ogtt2HrConventional: ogtt.ogtt2HrConventional !== null ? ogtt.ogtt2HrConventional : '',
                            referenceLabId: ogtt.referenceLab !== null ? { value: ogtt.referenceLab.referenceid, label: ogtt.referenceLab.name } : ''
                        }

                        updateChemData.ogtt = ogttvalues
                    }
                    break;

                case 'OGCT':
                    const ogct = data.chemistry.ogct
                    if (ogct !== null) {

                        const ogctvalues = {
                            result: ogct.ogct !== null ? ogct.ogct : '',
                            conventional: ogct.conventional !== null ? ogct.conventional : '',
                            referenceLabId: ogct.referenceLab !== null ? { value: ogct.referenceLab.referenceid, label: ogct.referenceLab.name } : ''
                        }

                        updateChemData.ogct = ogctvalues
                    }
                    break;

                case 'ELEC':
                    const elec = data.chemistry.electrolytes
                    if (elec !== null) {

                        const elecvalues = {
                            sodium: elec.sodium !== null ? elec.sodium : '',
                            potassium: elec.potassium !== null ? elec.potassium : '',
                            chloride: elec.chloride !== null ? elec.chloride : '',
                            inorganicPhosphorus: elec.inorganicPhosphorus !== null ? elec.inorganicPhosphorus : '',
                            totalCalcium: elec.totalCalcium !== null ? elec.totalCalcium : '',
                            ionizedCalcium: elec.ionizedCalcium !== null ? elec.ionizedCalcium : '',
                            magnesium: elec.magnesium !== null ? elec.magnesium : '',
                            totalIron: elec.totalIron !== null ? elec.totalIron : '',
                            referenceLabId: elec.referenceLab !== null ? { value: elec.referenceLab.referenceid, label: elec.referenceLab.name } : ''
                        }

                        updateChemData.elec = elecvalues
                    }
                    break;

                case 'ENZY':
                    const enzy = data.chemistry.enzymes
                    if (enzy !== null) {

                        const enzyvalues = {
                            sgptalt: enzy.sgptAlt !== null ? enzy.sgptAlt : '',
                            sgotast: enzy.sgotAst !== null ? enzy.sgotAst : '',
                            amylase: enzy.amylase !== null ? enzy.amylase : '',
                            lipase: enzy.lipase !== null ? enzy.lipase : '',
                            ggtp: enzy.ggtp !== null ? enzy.ggtp : '',
                            ldh: enzy.ldh !== null ? enzy.ldh : '',
                            alp: enzy.alp !== null ? enzy.alp : '',
                            referenceLabId: enzy.referenceLab !== null ? { value: enzy.referenceLab.referenceid, label: enzy.referenceLab.name } : ''
                        }

                        updateChemData.enzy = enzyvalues
                    }
                    break;

                case 'CPK':
                    const cpk = data.chemistry.cpk
                    if (cpk !== null) {

                        const cpkvalues = {
                            cpkmb: cpk.cpkMB !== null ? cpk.cpkMB : '',
                            cpkmm: cpk.cpkMM !== null ? cpk.cpkMM : '',
                            totalCpk: cpk.totalCpk !== null ? cpk.totalCpk : '',
                            referenceLabId: cpk.referenceLab !== null ? { value: cpk.referenceLab.referenceid, label: cpk.referenceLab.name } : ''
                        }

                        updateChemData.cpk = cpkvalues
                    }
                    break;

                case 'BILI':
                    const bili = data.chemistry.bilirubin
                    if (bili !== null) {
                        const bilivalues = {
                            totalAdult: bili.totalAdult !== null ? bili.totalAdult : '',
                            direct: bili.direct !== null ? bili.direct : '',
                            indirect: bili.indirect !== null ? bili.indirect : '',
                            referenceLabId: bili.referenceLab !== null ? { value: bili.referenceLab.referenceid, label: bili.referenceLab.name } : ''
                        }

                        updateChemData.bili = bilivalues
                    }
                    break;

                case 'PROT':
                    const prot = data.chemistry.protein
                    if (prot !== null) {
                        const protvalues = {
                            totalProtein: prot.totalProtein !== null ? prot.totalProtein : '',
                            albumin: prot.albumin !== null ? prot.albumin : '',
                            globulin: prot.globulin !== null ? prot.globulin : '',
                            agRatio: prot.agratio !== null ? prot.agratio : '',
                            referenceLabId: prot.referenceLab !== null ? { value: prot.referenceLab.referenceid, label: prot.referenceLab.name } : ''
                        }

                        updateChemData.prot = protvalues
                    }
                    break;

                default: break;
            }
        })

        const otno = {
            otherNotes: data.otherNotes !== null ? data.otherNotes : '',
        }
        updateChemData.otno = otno

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
        updateChemData.doctor = patho

        let qualityControl = null
        if (data.qualityControl !== null) qualityControl = data.qualityControl
        updateChemData.qualityControl = qualityControl

        return updateChemData
    }

    closeModal = (chemResponse) => {
        this.setState({
            ...this.state,
            showModal: false,
            emailModal: false
        });

        if (chemResponse !== null) {
            if (this.state.updateIndex !== null) {
                this.chemistryTableRef.updateChemistryToTable(chemResponse, this.state.updateIndex);
            }
        }
    }

    saveResults = () => {
        const chemData = this.state.chemData
        let chemRequest = {}
        chemData.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'FBS':
                    const fbs = chemData.fbs
                    let referenceLabIdFbs = '';

                    let fbsresult = null
                    let fbsconventional = null

                    if (fbs.result !== "") fbsresult = fbs.result
                    if (fbs.conventional !== "") fbsconventional = fbs.conventional
                    if (fbs.referenceLabId !== "") referenceLabIdFbs = fbs.referenceLabId.value

                    const fbsvalues = {
                        fbs: fbsresult,
                        conventional: fbsconventional,
                        referenceLabId: referenceLabIdFbs
                    }

                    chemRequest.fastingBloodSugar = fbsvalues
                    break;

                    case 'TIBC':
                    const tibc = chemData.tibc
                    let referenceLabIdTibc = '';
                    let tibcresult = null


                    if (tibc.result !== "") tibcresult = tibc.result
                    if (tibc.referenceLabId !== "") referenceLabIdTibc = tibc.referenceLabId.value

                    const tibcvalues = {
                        result: tibcresult,
                        referenceLabId: referenceLabIdTibc
                    }

                    chemRequest.tibc = tibcvalues
                    break;

                case 'RBS':
                    const rbs = chemData.rbs
                    let referenceLabIdRbs = '';

                    let rbsresult = null
                    let rbsconventional = null

                    if (rbs.result !== "") rbsresult = rbs.result
                    if (rbs.conventional !== "") rbsconventional = rbs.conventional
                    if (rbs.referenceLabId !== "") referenceLabIdRbs = rbs.referenceLabId.value

                    const rbsvalues = {
                        rbs: rbsresult,
                        conventional: rbsconventional,
                        referenceLabId: referenceLabIdRbs
                    }

                    chemRequest.randomBloodSugar = rbsvalues

                    break;

                case 'PPRBS':
                    const pprbs = chemData.pprbs

                    let pprbsresult = null
                    let pprbsconventional = null
                    let referenceLabIdPPRBS = '';

                    if (pprbs.result !== "") pprbsresult = pprbs.result
                    if (pprbs.conventional !== "") pprbsconventional = pprbs.conventional
                    if (pprbs.referenceLabId !== "") referenceLabIdPPRBS = pprbs.referenceLabId.value

                    const pprbsvalues = {
                        pprbs: pprbsresult,
                        conventional: pprbsconventional,
                        referenceLabId: referenceLabIdPPRBS
                    }

                    chemRequest.pprbs = pprbsvalues
                    break;

                case 'URAC':
                    const urac = chemData.urac

                    let uracresult = null
                    let uracconventional = null
                    let referenceLabIdURAC = '';

                    if (urac.result !== "") uracresult = urac.result
                    if (urac.conventional !== "") uracconventional = urac.conventional
                    if (urac.referenceLabId !== "") referenceLabIdURAC = urac.referenceLabId.value

                    const uracvalues = {
                        uricAcid: uracresult,
                        conventional: uracconventional,
                        referenceLabId: referenceLabIdURAC
                    }

                    chemRequest.uricAcid = uracvalues
                    break;

                case 'BUN':
                    const bun = chemData.bun

                    let bunresult = null
                    let bunconventional = null
                    let referenceLabIdBUN = '';

                    if (bun.result !== "") bunresult = bun.result
                    if (bun.conventional !== "") bunconventional = bun.conventional
                    if (bun.referenceLabId !== "") referenceLabIdBUN = bun.referenceLabId.value

                    const bunvalues = {
                        bun: bunresult,
                        conventional: bunconventional,
                        referenceLabId: referenceLabIdBUN
                    }

                    chemRequest.bloodUreaNitrogen = bunvalues
                    break;

                case 'CREA':
                    const crea = chemData.crea

                    let crearesult = null
                    let creaconventional = null
                    let referenceLabIdCREA = '';

                    if (crea.result !== "") crearesult = crea.result
                    if (crea.conventional !== "") creaconventional = crea.conventional
                    if (crea.referenceLabId !== "") referenceLabIdCREA = crea.referenceLabId.value

                    const creavalues = {
                        creatinine: crearesult,
                        conventional: creaconventional,
                        referenceLabId: referenceLabIdCREA
                    }

                    chemRequest.creatinine = creavalues
                    break;

                case 'HBA1C':
                    const hba1c = chemData.hba1c

                    let hemoglobinA1C = null
                    let referenceLabIdHBA1C = '';

                    if (hba1c.hemoglobinA1C !== "") hemoglobinA1C = hba1c.hemoglobinA1C
                    if (hba1c.referenceLabId !== "") referenceLabIdHBA1C = hba1c.referenceLabId.value

                    const hba1cvalues = {
                        hemoglobinA1C: hemoglobinA1C,
                        referenceLabId: referenceLabIdHBA1C
                    }

                    chemRequest.hemoglobin = hba1cvalues
                    break;

                case 'LIPP':
                    const lipp = chemData.lipp

                    let cholesterol = null
                    let cholesterolConventional = null
                    let triglycerides = null
                    let triglyceridesConventional = null
                    let hdl = null
                    let hdlConventional = null
                    let ldl = null
                    let ldlConventional = null
                    let hdlRatio = null
                    let vldl = null
                    let referenceLabIdLIPP = '';

                    if (lipp.cholesterolResult !== "") cholesterol = lipp.cholesterolResult
                    if (lipp.cholesterolConventional !== "") cholesterolConventional = lipp.cholesterolConventional
                    if (lipp.triglyceridesResult !== "") triglycerides = lipp.triglyceridesResult
                    if (lipp.triglyceridesConventional !== "") triglyceridesConventional = lipp.triglyceridesConventional
                    if (lipp.hdlResult !== "") hdl = lipp.hdlResult
                    if (lipp.hdlConventional !== "") hdlConventional = lipp.hdlConventional
                    if (lipp.ldlResult !== "") ldl = lipp.ldlResult
                    if (lipp.ldlConventional !== "") ldlConventional = lipp.ldlConventional
                    if (lipp.hdlRatio !== "") hdlRatio = lipp.hdlRatio
                    if (lipp.vldl !== "") vldl = lipp.vldl
                    if (lipp.referenceLabId !== "") referenceLabIdLIPP = lipp.referenceLabId.value

                    const lippvalues = {
                        cholesterol: cholesterol,
                        cholesterolConventional: cholesterolConventional,
                        triglycerides: triglycerides,
                        triglyceridesConventional: triglyceridesConventional,
                        hdl: hdl,
                        hdlConventional: hdlConventional,
                        ldl: ldl,
                        ldlConventional: ldlConventional,
                        hdlRatio: hdlRatio,
                        vldl: vldl,
                        referenceLabId: referenceLabIdLIPP
                    }

                    chemRequest.lipidProfile = lippvalues
                    break;

                case 'OGTT':
                    const ogtt = chemData.ogtt

                    let ogtt1Hr = null
                    let ogtt1HrConventional = null
                    let ogtt2Hr = null
                    let ogtt2HrConventional = null
                    let referenceLabIdOGTT = '';

                    if (ogtt.ogtt1HrResult !== "") ogtt1Hr = ogtt.ogtt1HrResult
                    if (ogtt.ogtt1HrConventional !== "") ogtt1HrConventional = ogtt.ogtt1HrConventional
                    if (ogtt.ogtt2HrResult !== "") ogtt2Hr = ogtt.ogtt2HrResult
                    if (ogtt.ogtt2HrConventional !== "") ogtt2HrConventional = ogtt.ogtt2HrConventional
                    if (ogtt.referenceLabId !== "") referenceLabIdOGTT = ogtt.referenceLabId.value

                    const ogttvalues = {
                        ogtt1Hr: ogtt1Hr,
                        ogtt1HrConventional: ogtt1HrConventional,
                        ogtt2Hr: ogtt2Hr,
                        ogtt2HrConventional: ogtt2HrConventional,
                        referenceLabId: referenceLabIdOGTT
                    }

                    chemRequest.ogtt = ogttvalues
                    break;

                case 'OGCT':
                    const ogct = chemData.ogct

                    let ogctresult = null
                    let ogctconventional = null
                    let referenceLabIdOGCT = '';

                    if (ogct.result !== "") ogctresult = ogct.result
                    if (ogct.conventional !== "") ogctconventional = ogct.conventional
                    if (ogct.referenceLabId !== "") referenceLabIdOGCT = ogct.referenceLabId.value

                    const ogctvalues = {
                        ogct: ogctresult,
                        conventional: ogctconventional,
                        referenceLabId: referenceLabIdOGCT
                    }

                    chemRequest.ogct = ogctvalues
                    break;

                case 'ELEC':
                    const elec = chemData.elec

                    let sodium = null
                    let potassium = null
                    let chloride = null
                    let inorganicPhosphorus = null
                    let totalCalcium = null
                    let ionizedCalcium = null
                    let magnesium = null
                    let totalIron = null
                    let referenceLabIdELEC = '';

                    if (elec.sodium !== "") sodium = elec.sodium
                    if (elec.potassium !== "") potassium = elec.potassium
                    if (elec.chloride !== "") chloride = elec.chloride
                    if (elec.inorganicPhosphorus !== "") inorganicPhosphorus = elec.inorganicPhosphorus
                    if (elec.totalCalcium !== "") totalCalcium = elec.totalCalcium
                    if (elec.ionizedCalcium !== "") ionizedCalcium = elec.ionizedCalcium
                    if (elec.magnesium !== "") magnesium = elec.magnesium
                    if (elec.totalIron !== "") totalIron = elec.totalIron
                    if (elec.referenceLabId !== "") referenceLabIdELEC = elec.referenceLabId.value

                    const elecvalues = {
                        sodium: sodium,
                        potassium: potassium,
                        chloride: chloride,
                        inorganicPhosphorus: inorganicPhosphorus,
                        totalCalcium: totalCalcium,
                        ionizedCalcium: ionizedCalcium,
                        magnesium: magnesium,
                        totalIron: totalIron,
                        referenceLabId: referenceLabIdELEC
                    }

                    chemRequest.electrolytes = elecvalues
                    break;

                case 'ENZY':
                    const enzy = chemData.enzy

                    let sgptAlt = null
                    let sgotAst = null
                    let amylase = null
                    let lipase = null
                    let ggtp = null
                    let ldh = null
                    let alp = null
                    let referenceLabIdENZY = '';

                    if (enzy.sgptalt !== "") sgptAlt = enzy.sgptalt
                    if (enzy.sgotast !== "") sgotAst = enzy.sgotast
                    if (enzy.amylase !== "") amylase = enzy.amylase
                    if (enzy.lipase !== "") lipase = enzy.lipase
                    if (enzy.ggtp !== "") ggtp = enzy.ggtp
                    if (enzy.ldh !== "") ldh = enzy.ldh
                    if (enzy.alp !== "") alp = enzy.alp
                    if (enzy.referenceLabId !== "") referenceLabIdENZY = enzy.referenceLabId.value


                    const enzyvalues = {
                        sgptAlt: sgptAlt,
                        sgotAst: sgotAst,
                        amylase: amylase,
                        lipase: lipase,
                        ggtp: ggtp,
                        ldh: ldh,
                        alp: alp,
                        referenceLabId: referenceLabIdENZY
                    }

                    chemRequest.enzymes = enzyvalues
                    break;

                case 'CPK':
                    const cpk = chemData.cpk

                    let cpkMB = null
                    let cpkMM = null
                    let totalCpk = null
                    let referenceLabIdCPK = '';

                    if (cpk.cpkmb !== "") cpkMB = cpk.cpkmb
                    if (cpk.cpkmm !== "") cpkMM = cpk.cpkmm
                    if (cpk.totalCpk !== "") totalCpk = cpk.totalCpk
                    if (cpk.referenceLabId !== "") referenceLabIdCPK = cpk.referenceLabId.value

                    const cpkvalues = {
                        cpkMB: cpkMB,
                        cpkMM: cpkMM,
                        totalCpk: totalCpk,
                        referenceLabId: referenceLabIdCPK
                    }

                    chemRequest.creatinePhosphokinase = cpkvalues
                    break;

                case 'BILI':
                    const bili = chemData.bili


                    let totalAdult = null
                    let direct = null
                    let indirect = null
                    let referenceLabIdBILI = '';

                    if (bili.totalAdult !== "") totalAdult = bili.totalAdult
                    if (bili.direct !== "") direct = bili.direct
                    if (bili.indirect !== "") indirect = bili.indirect
                    if (bili.referenceLabId !== "") referenceLabIdBILI = bili.referenceLabId.value

                    const bilivalues = {
                        totalAdult: totalAdult,
                        direct: direct,
                        indirect: indirect,
                        referenceLabId: referenceLabIdBILI
                    }

                    chemRequest.bilirubin = bilivalues
                    break;

                case 'PROT':
                    const prot = chemData.prot

                    let totalProtein = null
                    let albumin = null
                    let globulin = null
                    let agratio = null
                    let referenceLabIdPROT = '';

                    if (prot.totalProtein !== "") totalProtein = prot.totalProtein
                    if (prot.albumin !== "") albumin = prot.albumin
                    if (prot.globulin !== "") globulin = prot.globulin
                    if (prot.agRatio !== "") agratio = prot.agRatio
                    if (prot.referenceLabId !== "" || prot.referenceLabId != null) referenceLabIdPROT = prot.referenceLabId.value

                    const protvalues = {
                        totalProtein: totalProtein,
                        albumin: albumin,
                        globulin: globulin,
                        agratio: agratio,
                        referenceLabId: referenceLabIdPROT
                    }

                    chemRequest.protein = protvalues
                    break;
                    

                default: break;
            }
        })

        let otherNotes = null
        if (chemData.otno.otherNotes !== "") otherNotes = chemData.otno.otherNotes
        chemRequest.otherNotes = otherNotes

        let patho = null
        if (chemData.doctor !== null) patho = chemData.doctor.pathologist.value
        chemRequest.pathologistId = patho

        const transid = chemData.txnId
        const labid = chemData.id

        Swal.fire({
            title: 'Chemistry',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveChemistry(this.props.userToken, chemRequest, transid, labid, this.closeModal)
            }
        })
    };

    onPrintChemistry = (transid, labid, status, headerControl) => {

        // const roles = [].concat(this.props.auth.roles)
        //     .filter(r => r === 'ADMIN');

        // if (roles.length > 0) {
        if (status >= 2) {
            Swal.fire({
                title: 'Chemistry Result',
                text: "Do you want to print this report?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onPrintChemistry(this.props.userToken, transid, labid, headerControl)
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
                this.props.onQCChemistry(this.props.userToken, transid, labid, this.closeModal);
            }
        })
    }

    onShowEmailModal = (data) => {
        const updateChemData = this.getChemInfo(data);
        let email;
        // if (updateChemData.transaction.transactionType == "TCH") {
        //     email = "Account Email"
        // }else {
        //     email = updateChemData.transaction.emailTo
        // }
        this.setState({
            ...this.state,
            emailModal: true,
            modalTitle: "Email Chemistry",
            chemData: updateChemData,
            emailData: {
                emailContent: {
                    sendTo: email,
                    sendCc: '',
                    emailSubject: 'Chemistry Results',
                    emailBody:
                        `Dear Team,\n\nYou may now look to the attached file of your result in PDF format and Excel format.\nFor any question/classification, please contact us at 0917-535-9417 for Globe and\n0925-577-8378 for Sun/Smart or send us an email at\nquestphil.corpresult@gmail.com\n\nThank you for your concern!\n\nYours truly,\n\nQuest Diagnostics Team`,
                }
            }
        });
    }

    onSendEmailChemistry = (emailValues, transid, labid) => {

        Swal.fire({
            title: 'Chemistry Result',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendEmailChemistry(this.props.userToken, emailValues, transid, labid, this.closeModal);
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

                <ChemistryModal
                    referenceLab={this.props.referenceLaboratoryList}
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    chemData={this.state.chemData}
                    setChemData={this.setChemistryData}
                    doctorList={this.props.doctorList}
                    editViewFlag={this.state.editViewFlag}
                    onPrintChemistry={this.onPrintChemistry}
                    onQualityControl={this.onQualityControl}
                />

                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.chemData}
                    emailData={this.state.emailData}
                    closeClick={this.closeModal}
                    onSendEmail={this.onSendEmailChemistry}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Chemistry</h3>
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
                                            isSearchable={true}
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
                                <ChemistryTable
                                    onRef={ref => (this.chemistryTableRef = ref)}
                                    openChemistryModal={this.openChemistryModal}
                                    viewChemistryModal={this.viewChemistryModal}
                                    onPrintChemistry={this.onPrintChemistry}
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
        chemList: state.lab.chemistryList,
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
        onSaveChemistry: (token, chemValues, transid, labid, closeModal) => dispatch(actions.saveChemistry(token, chemValues, transid, labid, closeModal)),
        onViewCHList: (token, procedure, startDate, endDate, branchId, chargeTo) => dispatch(actions.getLaboratoryServiceRequests(token, procedure, startDate, endDate, branchId, chargeTo)),
        onClearCHList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onPrintChemistry: (token, transid, labid, withHeaderFooter) => dispatch(actions.printChemistry(token, transid, labid, withHeaderFooter)),
        onQCChemistry: (token, transid, labid, closeModal) => dispatch(actions.qualityControlChemistry(token, transid, labid, closeModal)),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Chemistry));