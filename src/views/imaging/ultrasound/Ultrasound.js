import React, { Component } from 'react';

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
import clsx from 'clsx';
import ReactSelect from 'react-select';
import * as actions from 'src/store/actions/index';
import { connect } from 'react-redux';

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { doctorName, updateObject } from 'src/store/utility';
import UltrasoundModal from 'src/containers/modal/Ultrasound/UltrasoundModal';
import Swal from 'sweetalert2';
import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

import UltrasoundTable from 'src/containers/tables/imaging/UltrasoundTable';

const remarksOptionsMap = new Map([
    [true, 'For Recommendation'],
    [false, 'Normal'],
])
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

const ultrasoundConfig = {
    id: null,
    requestName: '',
    txnId: '',
    txnSR: '',
    txnType: '',
    branch: null,
    patient: null,
    corporate: null,
    serviceRequest: [],
    cashier: null,
    txnStatus: '',
    txnDate: '',
    txnDispatch: null,
    ultrasound: {
        findings: '',
        impressions: '',
        remarks: '',
        radiologist: '',
        finding_header_pelvic: '',
        finding_footer_pelvic: '',
        bpd_size: '',
        bpd_old: '0 weeks 0 days',
        hc_size: '',
        hc_old: '0 weeks 0 days',
        ac_size: '',
        ac_old: '0 weeks 0 days',
        fl_size: '',
        fl_old: '0 weeks 0 days',
    }
}

class Ultrasound extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        ultrasoundData: ultrasoundConfig,

        showModal: false,
        editViewFlag: false,
        selectedBranch: null,
        selectedChargeTo: null,
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

    viewTransactions = () => {
        this.props
            .onViewUltrasoundList(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                'US',
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }
    handleSelectChange = (opt) => (event) => {
        this.props.onClearXRList('ECG');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    closeModal = (responseXR) => {
        this.setState({
            ...this.state,
            showModal: false,
        });
    }

    setUltrasoundData = (updataUltrasoundData) => {
        this.setState({
            ...this.state,
            ultrasoundData: updataUltrasoundData
        });
    }

    getUltrasoundInfo = (data) => {
        let requestName = '';
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let serviceRequest = [];
        let cashier = null;
        let labPerson = null;
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

        if (data.labPersonel !== undefined && data.labPersonel !== null) {
            labPerson = data.labPersonel
        }

        const updataUltrasoundData = updateObject(ultrasoundConfig, {
            id: data.id,
            txnId: txnId,
            txnSR: txnSR,
            txnType: txnType,
            branch: branch,
            patient: patient,
            corporate: corporate,
            requestName: requestName,
            serviceRequest: serviceRequest,
            txnRemarks: txnRemarks,
            cashier: cashier,
            labPerson: labPerson,
            txnStatus: txnStatus,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });

        const ultrasoundData = data.ultrasound

        if (ultrasoundData !== null) {
            if (ultrasoundData.findings !== "") {
                const findingsvalue = ultrasoundData.findings
                updataUltrasoundData.ultrasound.findings = findingsvalue
            }

            if (ultrasoundData.impressions !== "") {
                const impressionsvalue = ultrasoundData.impressions
                updataUltrasoundData.ultrasound.impressions = impressionsvalue
            }

            if (ultrasoundData.findings !== "") {
                const finding_header_pelvic_value = ultrasoundData.finding_header_pelvic
                updataUltrasoundData.ultrasound.finding_header_pelvic = finding_header_pelvic_value
            }
            if (ultrasoundData.finding_footer_pelvic !== "") {
                const finding_footer_pelvic_value = ultrasoundData.finding_footer_pelvic
                updataUltrasoundData.ultrasound.finding_footer_pelvic = finding_footer_pelvic_value
            }
            if (ultrasoundData.bpd_size !== "") {
                const bpd_size_value = ultrasoundData.bpd_size
                updataUltrasoundData.ultrasound.bpd_size = bpd_size_value
            }

            if (ultrasoundData.bpd_old !== "") {
                const bpd_old_value = ultrasoundData.bpd_old
                updataUltrasoundData.ultrasound.bpd_old = bpd_old_value
            }
            if (ultrasoundData.hc_size !== "") {
                const hc_size_value = ultrasoundData.hc_size
                updataUltrasoundData.ultrasound.hc_size = hc_size_value
            }

            if (ultrasoundData.hc_old !== "") {
                const hc_old_value = ultrasoundData.hc_old
                updataUltrasoundData.ultrasound.hc_old = hc_old_value
            }

            if (ultrasoundData.ac_size !== "") {
                const ac_size_value = ultrasoundData.ac_size
                updataUltrasoundData.ultrasound.ac_size = ac_size_value
            }
            if (ultrasoundData.ac_old !== "") {
                const ac_old_value = ultrasoundData.ac_old
                updataUltrasoundData.ultrasound.ac_old = ac_old_value
            }

            if (ultrasoundData.fl_size !== "") {
                const fl_size_value = ultrasoundData.fl_size
                updataUltrasoundData.ultrasound.fl_size = fl_size_value
            }
            if (ultrasoundData.fl_old !== "") {
                const fl_old_value = ultrasoundData.fl_old
                updataUltrasoundData.ultrasound.fl_old = fl_old_value
            }

            if (ultrasoundData.remarks !== null) {
                let remarksvalue = null

                if (remarksOptionsMap.has(ultrasoundData.remarks) === true) {
                    remarksvalue = {
                        value: ultrasoundData.remarks,
                        label: remarksOptionsMap.get(ultrasoundData.remarks)
                    }
                    updataUltrasoundData.ultrasound.remarks = remarksvalue

                }
            }

            if (ultrasoundData.radiologist !== null) {
                const radiovalue = {
                    value: ultrasoundData.radiologist.doctorid,
                    label: doctorName(ultrasoundData.radiologist),
                    license: ultrasoundData.radiologist.licenseNumber
                }

                updataUltrasoundData.ultrasound.radiologist = radiovalue
            }
        }
        return updataUltrasoundData
    }

    openUltrasoundModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updateultrasoundData = this.getUltrasoundInfo(data)
            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                ultrasoundData: updateultrasoundData,
                editViewFlag: false
            });

        }
    }

    onPrintUltrasound = (transid, labid, status, headerControl) => {
        if (status === 2) {
            this.props.onPrintUltrasound(this.props.userToken, transid, labid, headerControl)
        } else {
            Swal.fire({
                title: 'Please enter results to print.',
                icon: 'warning',
                text: 'Record not yet ready for printing.'
            })
        }
    }

    onViewUltrasound = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updateultrasoundData = this.getUltrasoundInfo(data)
            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                ultrasoundData: updateultrasoundData,
                editViewFlag: true
            });
        }
    }

    saveResults = () => {
        const ultrasoundData = this.state.ultrasoundData

        let findings = null
        let impressions = null
        let radiologist = null
        let remarks = null
        let finding_header_pelvic = null
        let finding_footer_pelvic = null
        let bpd_size = null
        let bpd_old = null
        let hc_size = null
        let hc_old = null
        let ac_size = null
        let ac_old = null
        let fl_size = null
        let fl_old = null

        if (ultrasoundData.ultrasound.findings !== "") {
            findings = ultrasoundData.ultrasound.findings
            finding_header_pelvic = null
            finding_footer_pelvic = null
        }
        if (ultrasoundData.ultrasound.impressions !== "") impressions = ultrasoundData.ultrasound.impressions
        if (ultrasoundData.ultrasound.radiologist !== null) radiologist = ultrasoundData.ultrasound.radiologist.value
        if (ultrasoundData.ultrasound.remarks !== null) remarks = ultrasoundData.ultrasound.remarks.value
        if (ultrasoundData.ultrasound.finding_header_pelvic !== "") {
            finding_header_pelvic = ultrasoundData.ultrasound.finding_header_pelvic
            findings = null;
        }
        if (ultrasoundData.ultrasound.finding_footer_pelvic !== "") finding_footer_pelvic = ultrasoundData.ultrasound.finding_footer_pelvic
        if (ultrasoundData.ultrasound.bpd_size !== "") bpd_size = ultrasoundData.ultrasound.bpd_size
        if (ultrasoundData.ultrasound.bpd_old !== "") bpd_old = ultrasoundData.ultrasound.bpd_old
        if (ultrasoundData.ultrasound.hc_size !== "") hc_size = ultrasoundData.ultrasound.hc_size
        if (ultrasoundData.ultrasound.hc_old !== "") hc_old = ultrasoundData.ultrasound.hc_old
        if (ultrasoundData.ultrasound.ac_size !== "") ac_size = ultrasoundData.ultrasound.ac_size
        if (ultrasoundData.ultrasound.ac_old !== "") ac_old = ultrasoundData.ultrasound.ac_old
        if (ultrasoundData.ultrasound.fl_size !== "") fl_size = ultrasoundData.ultrasound.fl_size
        if (ultrasoundData.ultrasound.fl_old !== "") fl_old = ultrasoundData.ultrasound.fl_old

        const ultrasoundRequest = {
            findings: findings,
            impressions: impressions,
            radiologistId: radiologist,
            remarks: remarks,
            finding_header_pelvic: finding_header_pelvic,
            finding_footer_pelvic: finding_footer_pelvic,
            bpd_size: bpd_size,
            bpd_old: bpd_old,
            hc_size: hc_size,
            hc_old: hc_old,
            ac_size: ac_size,
            ac_old: ac_old,
            fl_size: fl_size,
            fl_old: fl_old,

        }
        const transid = ultrasoundData.txnId
        const labid = ultrasoundData.id


        Swal.fire({
            title: 'Ultrasound',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveUltrasound(this.props.userToken, ultrasoundRequest, transid, labid, this.closeModal)
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
                <Backdrop className={classes.backdrop} open={false}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <UltrasoundModal
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    setUltrasoundData={this.setUltrasoundData}
                    saveClick={this.saveResults}
                    onPrintUltrasound={this.onPrintUltrasound}
                    editViewFlag={this.state.editViewFlag}
                    ultrasoundData={this.state.ultrasoundData}
                    doctorList={this.props.doctorList}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Ultrasound</h3>
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
                                            onChange={dateChangeHandler('dateFromValue')}
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
                            <hr />
                            <div className="table-responsive">
                                <UltrasoundTable onRef={ref => (this.ultrasoundTableRef = ref)}
                                    openUltrasoundModal={this.openUltrasoundModal}
                                    onPrintUltrasound={this.onPrintUltrasound}
                                    onViewUltrasound={this.onViewUltrasound}
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
        loading: state.srv.loading,
        error: state.srv.error,
        userToken: state.auth.token,
        doctorList: state.docs.doctorList,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        branchList: state.bran.branchList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onViewUltrasoundList: (token, startDate, endDate, laboratory, branchId, chargeTo) => dispatch(actions.viewTransByServiceRequest(token, startDate, endDate, laboratory, branchId, chargeTo)),
        onClearXRList: (procedure) => dispatch(actions.transByServReqClear(procedure)),
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onSaveUltrasound: (token, peValues, transid, labid, closeXrayModal) => dispatch(actions.saveUltrasound(token, peValues, transid, labid, closeXrayModal)),
        onPrintUltrasound: (token, transid, labid, withHeaderFooter) => dispatch(actions.printUltrasound(token, transid, labid, withHeaderFooter)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Ultrasound));