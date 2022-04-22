import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

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
import ReactSelect from 'react-select';

import * as actions from 'src/store/actions/index';
import { doctorName, updateObject } from 'src/store/utility';
import clsx from 'clsx';

import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

import PhysicalExamTable from 'src/containers/tables/PhysicalExamTable'
import PhysicalExamModal from 'src/containers/modal/physicalexam/PhysicalExamModal'
import Swal from 'sweetalert2';

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

const peConfig = {
    id: null,
    requestName: '',
    txnId: '',
    txnSR: '',
    txnType: '',
    patient: null,
    corporate: null,
    serviceRequest: [],
    cashier: null,
    txnStatus: '',
    txnDate: '',
    txnDispatch: null,
    medicalHistory: {
        asthma: false,
        tuberculosis: false,
        diabetesMellitus: false,
        highBloodPressure: false,
        heartProblem: false,
        kidneyProblem: false,
        abdominalHernia: false,
        jointBackScoliosis: false,
        psychiatricProblem: false,
        migraineHeadache: false,
        faintingSeizures: false,
        allergies: false,
        cancerTumor: false,
        hepatitis: false,
        stdplhiv: false,
        travelhistory: false,
    },
    vitalSign: {
        height: '',
        feet: '',
        inch: '',
        weight: '',
        bmi: '',
        bloodPressure: '',
        pulseRate: '',
        respiratoryRate: '',
        uncorrectedOD: '',
        uncorrectedOS: '',
        correctedOD: '',
        correctedOS: '',
        ishihara: '',
        hearing: '',
        hospitalization: '',
        opearations: '',
        medications: '',
        smoker: '',
        alcoholic: '',
        pregnant: false,
        lastMenstrual: '',
        notes: ''
    },
    physicalExam: {
        skin: true,
        headNeck: true,
        chestBreastLungs: true,
        cardiacHeart: true,
        abdomen: true,
        extremities: true,
        fatigueachespains: true,
        findings: '',
        notes: '',
        doctor: {
            value: 'MlZiCQKmt5',
            label: 'FROILAN A. CANLAS, - 82498',
            license: '82498'
        },
        remarks: ''
    }
}

const remarksOptionsMap = new Map([
    [true, 'For Recommendation'],
    [false, 'Normal'],
])

export class PhysicalExam extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        peData: peConfig,

        editViewFlag: false,
        selectedBranch: null,
        selectedChargeTo: null,
    }

    setPhysicalExamData = (updatePeData) => {
        this.setState({
            ...this.state,
            peData: updatePeData
        });
    }

    componentDidMount() {
        if (this.props.doctorList.length <= 0) {
            this.props.onGetAllDoctors(this.props.userToken);
        }
        if (this.props.branchList.length <= 0) {
            this.props.onGetAllBranches(this.props.userToken);
        }
        if (this.props.corporateList.length <= 0) {
            this.props.onGetAllCorporates(this.props.userToken);
        }
    }

    handleSelectChange = (opt) => (event) => {
        this.props.onClearPEList('PE');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    viewPhysicalExam = () => {
        this.props.onClearPEList('PE');
        this.props
            .onViewPhysicalExam(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                'PE',
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    getPeInfo = (data) => {

        let requestName = '';
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let serviceRequest = [];
        let cashier = null;
        let txnStatus = '';
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
            txnStatus = txn.status;
            txnDate = txn.transactionDate;
            txnDispatch = txn.dispatch;
        }

        if (data.itemDetails !== undefined && data.itemDetails !== null) {
            const itm = data.itemDetails;
            requestName = itm.itemDescription;
            serviceRequest = itm.serviceRequest;
        }

        const updatePeData = updateObject(peConfig, {
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
            txnRemarks: txnRemarks,
            txnStatus: txnStatus,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });

        const peInfo = data.physicalExamination

        if (peInfo !== null && peInfo !== undefined) {
            if (peInfo.medicalHistory !== null) {
                const mhvalues = {
                    asthma: peInfo.medicalHistory.asthma,
                    tuberculosis: peInfo.medicalHistory.tuberculosis,
                    diabetesMellitus: peInfo.medicalHistory.diabetesMellitus,
                    highBloodPressure: peInfo.medicalHistory.highBloodPressure,
                    heartProblem: peInfo.medicalHistory.heartProblem,
                    kidneyProblem: peInfo.medicalHistory.kidneyProblem,
                    abdominalHernia: peInfo.medicalHistory.abdominalHernia,
                    jointBackScoliosis: peInfo.medicalHistory.jointBackScoliosis,
                    psychiatricProblem: peInfo.medicalHistory.psychiatricProblem,
                    migraineHeadache: peInfo.medicalHistory.migraineHeadache,
                    faintingSeizures: peInfo.medicalHistory.faintingSeizures,
                    allergies: peInfo.medicalHistory.allergies,
                    cancerTumor: peInfo.medicalHistory.cancerTumor,
                    hepatitis: peInfo.medicalHistory.hepatitis,
                    stdplhiv: peInfo.medicalHistory.stdplhiv,
                    travelhistory: peInfo.medicalHistory.travelhistory,
                }

                updatePeData.medicalHistory = mhvalues
            }

            if (peInfo.vitalSign !== null) {
                let height = ''
                let weight = ''
                let bmi = ''
                let bmiCategory = ''
                let bloodPressure = ''
                let pulseRate = ''
                let respiratoryRate = ''
                let uncorrectedOD = ''
                let uncorrectedOS = ''
                let correctedOD = ''
                let correctedOS = ''
                let ishihara = ''
                let hearing = ''
                let hospitalization = ''
                let opearations = ''
                let medications = ''
                let smoker = ''
                let alcoholic = ''
                let lastMenstrual = ''
                let notes = ''

                let feet = ''
                let inch = ''

                if (peInfo.vitalSign.height !== null) {
                    let realFeet = (parseInt(peInfo.vitalSign.height) * 0.393700) / 12
                    let getFeet = Math.floor(realFeet)
                    let getInch = Math.round((realFeet - getFeet) * 12)

                    feet = getFeet
                    inch = getInch
                }

                if (peInfo.vitalSign.height !== null) height = peInfo.vitalSign.height
                if (peInfo.vitalSign.weight !== null) weight = peInfo.vitalSign.weight
                if (peInfo.vitalSign.bmi !== null) bmi = peInfo.vitalSign.bmi
                if (peInfo.vitalSign.bmiCategory !== null) bmiCategory = peInfo.vitalSign.bmiCategory
                if (peInfo.vitalSign.bloodPressure !== null) bloodPressure = peInfo.vitalSign.bloodPressure
                if (peInfo.vitalSign.pulseRate !== null) pulseRate = peInfo.vitalSign.pulseRate
                if (peInfo.vitalSign.respiratoryRate !== null) respiratoryRate = peInfo.vitalSign.respiratoryRate
                if (peInfo.vitalSign.uncorrectedOD !== null) uncorrectedOD = peInfo.vitalSign.uncorrectedOD
                if (peInfo.vitalSign.uncorrectedOS !== null) uncorrectedOS = peInfo.vitalSign.uncorrectedOS
                if (peInfo.vitalSign.correctedOD !== null) correctedOD = peInfo.vitalSign.correctedOD
                if (peInfo.vitalSign.correctedOS !== null) correctedOS = peInfo.vitalSign.correctedOS
                if (peInfo.vitalSign.ishihara !== null) ishihara = peInfo.vitalSign.ishihara
                if (peInfo.vitalSign.hearing !== null) hearing = peInfo.vitalSign.hearing
                if (peInfo.vitalSign.hospitalization !== null) hospitalization = peInfo.vitalSign.hospitalization
                if (peInfo.vitalSign.opearations !== null) opearations = peInfo.vitalSign.opearations
                if (peInfo.vitalSign.medications !== null) medications = peInfo.vitalSign.medications
                if (peInfo.vitalSign.smoker !== null) smoker = peInfo.vitalSign.smoker
                if (peInfo.vitalSign.alcoholic !== null) alcoholic = peInfo.vitalSign.alcoholic
                if (peInfo.vitalSign.lastMenstrual !== null) lastMenstrual = peInfo.vitalSign.lastMenstrual
                if (peInfo.vitalSign.notes !== null) notes = peInfo.vitalSign.notes

                const vsvalues = {
                    height: height,
                    feet: inch === 12 ? feet + 1 : feet,
                    inch: inch === 12 ? 0 : inch,
                    weight: weight,
                    bmi: bmi,
                    bmiCategory: bmiCategory,
                    bloodPressure: bloodPressure,
                    pulseRate: pulseRate,
                    respiratoryRate: respiratoryRate,
                    uncorrectedOD: uncorrectedOD,
                    uncorrectedOS: uncorrectedOS,
                    correctedOD: correctedOD,
                    correctedOS: correctedOS,
                    ishihara: ishihara,
                    hearing: hearing,
                    hospitalization: hospitalization,
                    opearations: opearations,
                    medications: medications,
                    smoker: smoker,
                    alcoholic: alcoholic,
                    pregnant: peInfo.vitalSign.pregnant,
                    lastMenstrual: lastMenstrual,
                    notes: notes
                }

                updatePeData.vitalSign = vsvalues
            }

            if (peInfo.physicalExam !== null) {

                let findings = ''
                let notes = ''
                let doctor = null
                let remarks = null

                if (peInfo.physicalExam.findings !== null) findings = peInfo.physicalExam.findings
                if (peInfo.physicalExam.notes !== null) notes = peInfo.physicalExam.notes

                if (peInfo.physicalExam.doctor !== null) {
                    doctor = {
                        value: peInfo.physicalExam.doctor.doctorid,
                        label: doctorName(peInfo.physicalExam.doctor),
                        license: peInfo.physicalExam.doctor.licenseNumber
                    }
                }

                if (peInfo.physicalExam.remarks !== null) {
                    if (remarksOptionsMap.has(peInfo.physicalExam.remarks) === true) {
                        remarks = {
                            value: peInfo.physicalExam.remarks,
                            label: remarksOptionsMap.get(peInfo.physicalExam.remarks)
                        }
                    }
                }

                const pevalues = {
                    skin: peInfo.physicalExam.skin,
                    headNeck: peInfo.physicalExam.headNeck,
                    chestBreastLungs: peInfo.physicalExam.chestBreastLungs,
                    cardiacHeart: peInfo.physicalExam.cardiacHeart,
                    abdomen: peInfo.physicalExam.abdomen,
                    extremities: peInfo.physicalExam.extremities,
                    fatigueachespains: peInfo.physicalExam.fatigueachespains,

                    findings: findings,
                    notes: notes,
                    doctor: doctor,
                    remarks: remarks,
                }

                updatePeData.physicalExam = pevalues
            }
        }

        if (peInfo.medicalHistory == null && peInfo.physicalExam == null && peInfo.vitalSign == null) {
            let feet = ''
            let inch = ''
            let height = ''
            let weight = ''
            let bmi = ''

            if (data.transaction !== null && data.transaction !== undefined) {
                if (data.transaction.patient.weight != 0 || data.transaction.patient.weight !== null) {
                    weight = data.transaction.patient.weight
                }

                if (data.transaction.patient.height != 0 || data.transaction.patient.height !== null) {
                    height = data.transaction.patient.height
                }
            }


            if (data.transaction.patient.height !== null || data.transaction.patient.height !== undefined) {
                let realFeet = (parseInt(data.transaction.patient.height) * 0.393700) / 12
                let getFeet = Math.floor(realFeet)
                let getInch = Math.round((realFeet - getFeet) * 12)

                feet = getFeet
                inch = getInch
            }
            bmi = this.computeBMI(height, weight)
            const heightNWeight = {
                height: height,
                feet: inch === 12 ? feet + 1 : feet,
                inch: inch === 12 ? 0 : inch,
                weight: weight,
                bmi: bmi,
                bloodPressure: '',
                pulseRate: '',
                respiratoryRate: '',
                uncorrectedOD: '',
                uncorrectedOS: '',
                correctedOD: '',
                correctedOS: '',
                ishihara: '',
                hearing: '',
                hospitalization: '',
                opearations: '',
                medications: '',
                smoker: '',
                alcoholic: '',
                pregnant: false,
                lastMenstrual: '',
                notes: ''
            }

            updatePeData.vitalSign = heightNWeight
        }

        return updatePeData
    }
    computeBMI = (height, weight) => {
        return ((weight / Math.pow(height, 2)) * 10000).toFixed(1);
    }

    openPhysicalExamModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {

            const updatePeData = this.getPeInfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                peData: updatePeData,
                editViewFlag: false
            });
        }
    }

    viewPhysicalExamModal = (peRowData) => {
        if (peRowData.status === 2) {

            const updatePeData = this.getPeInfo(peRowData)

            this.setState({
                ...this.state,
                showModal: true,
                peData: updatePeData,
                editViewFlag: true
            });
        } else {
            Swal.fire({
                title: 'Please enter results to view.',
                icon: 'warning',
                text: 'Record not yet ready for viewing.',
            })
        }
    }

    closeModal = (responsePE) => {
        this.setState({
            ...this.state,
            showModal: false,
            editViewFlag: false
        });

        if (responsePE !== null) {
            if (this.state.updateIndex !== null) {
                this.physicalExamTableRef.updatePhysicalExamToTable(responsePE, this.state.updateIndex);
            }
        }
    }

    saveResults = () => {
        const peData = this.state.peData

        let medicalhistory = null
        let vitalsign = null
        let physicalexam = null

        if (peData.medicalhistory !== null) {
            medicalhistory = {
                asthma: peData.medicalHistory.asthma,
                tuberculosis: peData.medicalHistory.tuberculosis,
                diabetesMellitus: peData.medicalHistory.diabetesMellitus,
                highBloodPressure: peData.medicalHistory.highBloodPressure,
                heartProblem: peData.medicalHistory.heartProblem,
                kidneyProblem: peData.medicalHistory.kidneyProblem,
                abdominalHernia: peData.medicalHistory.abdominalHernia,
                jointBackScoliosis: peData.medicalHistory.jointBackScoliosis,
                psychiatricProblem: peData.medicalHistory.psychiatricProblem,
                migraineHeadache: peData.medicalHistory.migraineHeadache,
                faintingSeizures: peData.medicalHistory.faintingSeizures,
                allergies: peData.medicalHistory.allergies,
                cancerTumor: peData.medicalHistory.cancerTumor,
                hepatitis: peData.medicalHistory.hepatitis,
                stdplhiv: peData.medicalHistory.stdplhiv,
                travelhistory: peData.medicalHistory.travelhistory,
            }
        }

        if (peData.vitalsign !== null) {

            let height = null
            let weight = null
            let bmi = null
            let bloodPressure = null
            let pulseRate = null
            let respiratoryRate = null
            let uncorrectedOD = ""
            let uncorrectedOS = ""
            let correctedOD = ""
            let correctedOS = ""
            let ishihara = null
            let hearing = null
            let hospitalization = null
            let opearations = null
            let medications = null
            let smoker = null
            let alcoholic = null
            let pregnant = null
            let lastMenstrual = null
            let notes = null

            if (peData.vitalSign.height !== "") height = peData.vitalSign.height
            if (peData.vitalSign.weight !== "") weight = peData.vitalSign.weight
            if (peData.vitalSign.bmi !== "") bmi = peData.vitalSign.bmi
            if (peData.vitalSign.bloodPressure !== "") bloodPressure = peData.vitalSign.bloodPressure
            if (peData.vitalSign.pulseRate !== "") pulseRate = peData.vitalSign.pulseRate
            if (peData.vitalSign.respiratoryRate !== "") respiratoryRate = peData.vitalSign.respiratoryRate
            if (peData.vitalSign.uncorrectedOD !== "") uncorrectedOD = peData.vitalSign.uncorrectedOD
            if (peData.vitalSign.uncorrectedOS !== "") uncorrectedOS = peData.vitalSign.uncorrectedOS
            if (peData.vitalSign.correctedOD !== "") correctedOD = peData.vitalSign.correctedOD
            if (peData.vitalSign.correctedOS !== "") correctedOS = peData.vitalSign.correctedOS
            if (peData.vitalSign.ishihara !== "") ishihara = peData.vitalSign.ishihara
            if (peData.vitalSign.hearing !== "") hearing = peData.vitalSign.hearing
            if (peData.vitalSign.hospitalization !== "") hospitalization = peData.vitalSign.hospitalization
            if (peData.vitalSign.opearations !== "") opearations = peData.vitalSign.opearations
            if (peData.vitalSign.medications !== "") medications = peData.vitalSign.medications
            if (peData.vitalSign.smoker !== "") smoker = peData.vitalSign.smoker
            if (peData.vitalSign.alcoholic !== "") alcoholic = peData.vitalSign.alcoholic
            if (peData.vitalSign.pregnant !== "") pregnant = peData.vitalSign.pregnant
            if (peData.vitalSign.lastMenstrual !== "") lastMenstrual = peData.vitalSign.lastMenstrual
            if (peData.vitalSign.notes !== "") notes = peData.vitalSign.notes

            vitalsign = {
                height: height,
                weight: weight,
                bmi: bmi,
                bloodPressure: bloodPressure,
                pulseRate: pulseRate,
                respiratoryRate: respiratoryRate,
                uncorrectedOD: uncorrectedOD,
                uncorrectedOS: uncorrectedOS,
                correctedOD: correctedOD,
                correctedOS: correctedOS,
                ishihara: ishihara,
                hearing: hearing,
                hospitalization: hospitalization,
                opearations: opearations,
                medications: medications,
                smoker: smoker,
                alcoholic: alcoholic,
                pregnant: pregnant,
                lastMenstrual: lastMenstrual,
                notes: notes
            }
        }

        if (peData.physicalexam !== null) {

            let findings = null
            let notes = null
            let doctorId = null
            let remarks = null
            let license = null

            if (peData.physicalExam.findings !== "") findings = peData.physicalExam.findings
            if (peData.physicalExam.notes !== "") notes = peData.physicalExam.notes
            if (peData.physicalExam.doctor !== null) {
                doctorId = peData.physicalExam.doctor.value
                license = peData.physicalExam.doctor.license
            }
            if (peData.physicalExam.remarks !== null) remarks = peData.physicalExam.remarks.value

            physicalexam = {
                skin: peData.physicalExam.skin,
                headNeck: peData.physicalExam.headNeck,
                chestBreastLungs: peData.physicalExam.chestBreastLungs,
                cardiacHeart: peData.physicalExam.cardiacHeart,
                abdomen: peData.physicalExam.abdomen,
                extremities: peData.physicalExam.extremities,
                fatigueachespains: peData.physicalExam.fatigueachespains,
                findings: findings,
                notes: notes,
                doctorId: doctorId,
                license: license,
                remarks: remarks
            }
        }

        const peRequest = {
            medicalHistory: medicalhistory,
            vitalSign: vitalsign,
            physicalExam: physicalexam
        }

        const transid = peData.txnId
        const labid = peData.id

        Swal.fire({
            title: 'Physical Examination',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSavePhysicalExam(this.props.userToken, peRequest, transid, labid, this.closeModal)
            }
        })
    }

    onPrintPhysicalExam = (transid, labid, status, headerControl) => {
        if (status === 2) {
            this.props.onPrintPhysicalExam(this.props.userToken, transid, labid, headerControl)
        } else {
            Swal.fire({
                title: 'Please enter results to print.',
                icon: 'warning',
                text: 'Record not yet ready for printing.'
            })
        }
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

                <PhysicalExamModal
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    peData={this.state.peData}
                    setPeData={this.setPhysicalExamData}
                    editViewFlag={this.state.editViewFlag}
                    doctorList={this.props.doctorList}
                    onPrintPhysicalExam={this.onPrintPhysicalExam}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Physical Examination</h3>
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
                                <CCol md="6" className="p-1">
                                    <CButton
                                        className="border border-dark mfe-2"
                                        color="success"
                                        onClick={this.viewPhysicalExam}
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
                                <PhysicalExamTable
                                    onRef={ref => (this.physicalExamTableRef = ref)}
                                    openPhysicalExamModal={this.openPhysicalExamModal}
                                    viewPhysicalExamModal={this.viewPhysicalExamModal}
                                    onPrintPhysicalExam={this.onPrintPhysicalExam}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.srv.loading,
        error: state.srv.error,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        userToken: state.auth.token,
        doctorList: state.docs.doctorList,
        branchList: state.bran.branchList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onViewPhysicalExam: (token, startDate, endDate, laboratory, branchId, chargeTo) => dispatch(actions.viewTransByServiceRequest(token, startDate, endDate, laboratory, branchId, chargeTo)),
        onClearPEList: (procedure) => dispatch(actions.transByServReqClear(procedure)),
        onSavePhysicalExam: (token, peValues, transid, labid, closePhysicalExamModal) => dispatch(actions.savePhysicalExam(token, peValues, transid, labid, closePhysicalExamModal)),
        onGetPhysicalExamInfo: (token, transid, labid, setPhysicalExamInfo) => dispatch(actions.getPhysicalExamInfo(token, transid, labid, setPhysicalExamInfo)),
        onPrintPhysicalExam: (token, transid, labid, withHeaderFooter) => dispatch(actions.printPhysicalExam(token, transid, labid, withHeaderFooter))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(PhysicalExam))