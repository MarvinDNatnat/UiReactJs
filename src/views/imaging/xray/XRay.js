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

import XrayTable from 'src/containers/tables/imaging/XrayTable';
import XrayModal from 'src/containers/modal/imaging/XrayModal';

import * as actions from 'src/store/actions/index';
import { doctorName, updateObject } from 'src/store/utility';
import Swal from 'sweetalert2';

import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

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

const xrayConfig = {
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
    xray: {
        findings: '',
        impressions: '',
        remarks: '',
        radiologist: '',
        isFindingsError: false,
        isImpressionsError: false,
        isRemarksError: false,
        isRadiologistError: false
    }
}

const remarksOptionsMap = new Map([
    [true, 'For Recommendation'],
    [false, 'Normal'],
])

export class Xray extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        xrayData: xrayConfig,

        editViewFlag: false,
        selectedBranch: null,
        selectedChargeTo: null,
    }

    setXrayData = (updataXrayData) => {
        this.setState({
            ...this.state,
            xrayData: updataXrayData
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
        this.props.onClearXRList('XR');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }


    viewXrayList = () => {
        this.props.onClearXRList('XR');
        this.props
            .onViewXrayList(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                'XR',
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    getXrayInfo = (data) => {
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

        const updataXrayData = updateObject(xrayConfig, {
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

        const xrayData = data.xray

        if (xrayData !== null) {
            if (xrayData.findings !== "") {
                const findingsvalue = xrayData.findings

                updataXrayData.xray.findings = findingsvalue
            }

            if (xrayData.impressions !== "") {
                const impressionsvalue = xrayData.impressions

                updataXrayData.xray.impressions = impressionsvalue
            }

            if (xrayData.remarks !== null) {
                let remarksvalue = null

                if (remarksOptionsMap.has(xrayData.remarks) === true) {
                    remarksvalue = {
                        value: xrayData.remarks,
                        label: remarksOptionsMap.get(xrayData.remarks)
                    }
                    updataXrayData.xray.remarks = remarksvalue

                }
            }

            if (xrayData.radiologist !== null) {
                const radiovalue = {
                    value: xrayData.radiologist.doctorid,
                    label: doctorName(xrayData.radiologist),
                    license: xrayData.radiologist.licenseNumber
                }

                updataXrayData.xray.radiologist = radiovalue
            }
        }

        return updataXrayData
    }

    openXrayModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {

            const updataXrayData = this.getXrayInfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                xrayData: updataXrayData,
                editViewFlag: false
            });

        }
    }

    viewXrayModal = (xrRowData, idx) => {
        if (xrRowData.status >= 2) {
            const updataXrayData = this.getXrayInfo(xrRowData)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                xrayData: updataXrayData,
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

    closeModal = (responseXR) => {
        this.setState({
            ...this.state,
            showModal: false,
        });

        if (responseXR !== null) {
            if (this.state.xrIndex !== null) {
                this.xrayTableRef.updateXrayToTable(responseXR, this.state.xrIndex);
            }
        }
    }

    saveResults = () => {
        const xrayData = this.state.xrayData

        let findings = null
        let impressions = null
        let radiologist = null
        let remarks = null

        if (xrayData.xray.findings !== "") findings = xrayData.xray.findings
        if (xrayData.xray.impressions !== "") impressions = xrayData.xray.impressions
        if (xrayData.xray.radiologist !== null) radiologist = xrayData.xray.radiologist.value
        if (xrayData.xray.remarks !== null) remarks = xrayData.xray.remarks.value

        const xrayRequest = {
            findings: findings,
            impressions: impressions,
            radiologistId: radiologist,
            remarks: remarks
        }
        const transid = xrayData.txnId
        const labid = xrayData.id

        Swal.fire({
            title: 'Imaging (X-Ray)',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveXray(this.props.userToken, xrayRequest, transid, labid, this.closeModal)
            }
        })
    }

    onPrintXray = (transid, labid, status, headerControl) => {
        if (status === 2) {
            this.props.onPrintXray(this.props.userToken, transid, labid, headerControl)
        } else {
            Swal.fire({
                title: 'Please enter results to print.',
                icon: 'warning',
                text: 'Record not yet ready for printing.'
            })
        }
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
                this.props.onQCXRay(this.props.userToken, transid, labid, this.closeModal);
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

                <XrayModal
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    xrayData={this.state.xrayData}
                    setXrayData={this.setXrayData}
                    editViewFlag={this.state.editViewFlag}
                    doctorList={this.props.doctorList}
                    onPrintXray={this.onPrintXray}
                    onQualityControl={this.onQualityControl}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">X-Ray</h3>
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
                                        onClick={this.viewXrayList}
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
                                <XrayTable
                                    onRef={ref => (this.xrayTableRef = ref)}
                                    openXrayModal={this.openXrayModal}
                                    viewXrayModal={this.viewXrayModal}
                                    onPrintXray={this.onPrintXray}
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
        userToken: state.auth.token,
        doctorList: state.docs.doctorList,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        branchList: state.bran.branchList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onViewXrayList: (token, startDate, endDate, laboratory, branchId, chargeTo) => dispatch(actions.viewTransByServiceRequest(token, startDate, endDate, laboratory, branchId, chargeTo)),
        onClearXRList: (procedure) => dispatch(actions.transByServReqClear(procedure)),
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onSaveXray: (token, peValues, transid, labid, closeXrayModal) => dispatch(actions.saveXray(token, peValues, transid, labid, closeXrayModal)),
        onPrintXray: (token, transid, labid, withHeaderFooter) => dispatch(actions.printXray(token, transid, labid, withHeaderFooter)),
        onQCXRay: (token, transid, labid, closeModal) => dispatch(actions.qualityControlXRay(token, transid, labid, closeModal)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Xray))