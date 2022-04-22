import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import * as actions from 'src/store/actions/index';
import { connect } from 'react-redux';
import ReactSelect from 'react-select';
import Swal from 'sweetalert2';
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
import { updateObject } from 'src/store/utility';
import moment from 'moment';
import clsx from 'clsx';

import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

import ECGTable from 'src/containers/tables/imaging/ECGTable';
import EcgModal from 'src/containers/modal/ecg/EcgModal';



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

const ecgConfig = {
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
    ecg: {
        rhythm: '',
        pr_interval: '',
        rate_atrial: '',
        axis: '',
        p_wave: '',
        ventricular: '',
        interpretation: '',
    }
}

class ECG extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        ecgData : ecgConfig,


        editViewFlag: false,
        selectedBranch: null,
        selectedChargeTo: null,
    }
    getEcgInfo = (data) => {
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

        const updataEcgData = updateObject(ecgConfig, {
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

        const ecgData = data.ecg
         if (ecgData !== null) {
            if (ecgData.rhythm !== "") {
                const rhythmvalue = ecgData.rhythm;
                updataEcgData.ecg.rhythm = rhythmvalue
            }
            if (ecgData.rhythm !== "") {
                const axismvalue = ecgData.rhythm;
                updataEcgData.ecg.axis = axismvalue
            }
            if (ecgData.interpretation !== "") {
                const interpretationmvalue = ecgData.interpretation;
                updataEcgData.ecg.interpretation = interpretationmvalue
            }
            if (ecgData.p_wave !== "") {
                const p_wavemvalue = ecgData.p_wave;
                updataEcgData.ecg.p_wave = p_wavemvalue
            }
            if (ecgData.rate_atrial !== "") {
                const rate_atrialvalue = ecgData.rate_atrial;
                updataEcgData.ecg.rate_atrial = rate_atrialvalue
            }
            if (ecgData.pr_interval !== "") {
                const pr_intervalvalue = ecgData.pr_interval;
                updataEcgData.ecg.pr_interval = pr_intervalvalue
            }
            if (ecgData.ventricular !== "") {
                const ventricularvalue = ecgData.ventricular;
                updataEcgData.ecg.ventricular = ventricularvalue
            }


         }

        return updataEcgData
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

    viewEcgTransactions = () => {
        this.props.onClearXRList('ECG');
        this.props
            .onViewXrayList(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                'ECG',
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

    
    setEcgData = (updateEcgData) => {
        this.setState({
            ...this.state,
            ecgData: updateEcgData,
        });
    }
    updateECGModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updataEcgData = this.getEcgInfo(data)
            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                ecgData: updataEcgData,
                editViewFlag: false
            });

        }
    }

    viewEcgModal = (xrRowData, idx) => {
        if (xrRowData.status >= 2) {
            const updataEcgData = this.getEcgInfo(xrRowData)
            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                ecgData: updataEcgData,
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
    }

    saveResults = () => {
        const ecgData = this.state.ecgData.ecg

        let rhythmResult = null
        let pr_intervalResult = null
        let axisResult = null
        let p_waveResult = null
        let interpretationResult = null
        let ventricularResult = null
        let rate_atrialResult = null

        if (ecgData.rhythm !== "") rhythmResult = ecgData.rhythm
        if (ecgData.pr_interval !== "") pr_intervalResult = ecgData.pr_interval
        if (ecgData.rate_atrial !== "") rate_atrialResult = ecgData.rate_atrial
        if (ecgData.ventricular !== "") ventricularResult = ecgData.ventricular
        if (ecgData.axis !== "") axisResult = ecgData.axis
        if (ecgData.interpretation !== "") interpretationResult = ecgData.interpretation
        if (ecgData.p_wave !== "") p_waveResult = ecgData.p_wave

        const ecgvalues = {
            rhythm: rhythmResult,
            pr_interval: pr_intervalResult,
            rate_atrial: rate_atrialResult,
            ventricular: ventricularResult,
            axis: axisResult,
            interpretation: interpretationResult,
            p_wave: p_waveResult
        }

        const ecgDatas = this.state.ecgData
        let transid = ecgDatas.txnId
        let labid = ecgDatas.id

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
                this.props.onSaveEcg(this.props.userToken, ecgvalues, transid, labid, this.closeModal)
            }
        })
    
    };

    onPrintEcg = (transid, labid, status, headerControl) => {
        if (status === 2) {
            this.setState({
                ...this.state,
                showModal: false,
            });

            this.props.onPrintEcg(this.props.userToken, transid, labid, headerControl)
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
                <Backdrop className={classes.backdrop} open={false}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <EcgModal
                    showModal={this.state.showModal}
                    userToken={this.props.userToken}
                    closeClick={this.closeModal}
                    ecgData={this.state.ecgData}
                    saveClick={this.saveResults}
                    setEcgData={this.setEcgData}
                    printEcg={this.onPrintEcg}
                    editViewFlag={this.state.editViewFlag}
                />
                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Electrocardiograph</h3>
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
                                        onClick={this.viewEcgTransactions}
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

                                <ECGTable onRef={
                                    ref => (this.ecgTableRef = ref)}
                                    openEcgModal={this.updateECGModal}
                                    viewEcgModal={this.viewEcgModal}
                                    onPrintEcg={this.onPrintEcg} />
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
        onViewXrayList: (token, startDate, endDate, laboratory, branchId, chargeTo) => dispatch(actions.viewTransByServiceRequest(token, startDate, endDate, laboratory, branchId, chargeTo)),
        onClearXRList: (procedure) => dispatch(actions.transByServReqClear(procedure)),
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onSaveEcg: (token, peValues, transid, labid, closeXrayModal) => dispatch(actions.saveEcg(token, peValues, transid, labid, closeXrayModal)),
        onPrintEcg: (token, transid, labid, withHeaderFooter) => dispatch(actions.printEcg(token, transid, labid, withHeaderFooter)),
        onQCXRay: (token, transid, labid, closeModal) => dispatch(actions.qualityControlXRay(token, transid, labid, closeModal)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ECG));