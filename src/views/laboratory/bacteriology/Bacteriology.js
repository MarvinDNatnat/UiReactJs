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
    FormControl,
} from '@material-ui/core';

import BacteriologyTable from 'src/containers/tables/laboratory/BacteriologyTable';
import BacteriologyModal from 'src/containers/modal/laboratory/BacteriologyModal';
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

const bacteriologyConfig = {
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
    specificTest: '',
    cashier: null,
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
    bateriology: {
        pathologist: null,
    },
}



const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}

class Bacteriology extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        bacteriologyData: bacteriologyConfig,

        emailData: emailConfig,
        emailModal: false,
        editViewFlag: false,

        selectedBranch: null,
        selectedChargeTo: null,
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
        // this.props.onClearTOList('TO');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    closeModal = (responseTX) => {
        this.setState({
            ...this.state,
            showModal: false,
            EmailModal: false,
            editViewFlag: false
        });
    }

    setBacteriologyData = (updateBacteriologyData) => {
        this.setState({
            ...this.state,
            bacteriologyData: updateBacteriologyData,
        });
    }

    viewBacteriology = () => {
        // this.props.onClearTOList('MB');
        this.props
            .onViewBTList(
                this.props.userToken,
                'BT',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    openBacteriologyModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updateBacteriologyData = this.getBacteriologyInfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                bacteriologyData: updateBacteriologyData,
                editViewFlag: false
            });
        }
    }


    getBacteriologyInfo = (data) => {
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
        let labPerson = null;
        let cashier = null;
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
            specificTest = itm.specificTest;
        }

        if (data.labPersonel !== undefined && data.labPersonel !== null) {
            labPerson = data.labPersonel
        }


        const updateBacteriologyData = updateObject(bacteriologyConfig, {
            id: data.id,
            txnId: txnId,
            txnSR: txnSR,
            txnType: txnType,
            branch: branch,
            itemId: itemId,
            patient: patient,
            corporate: corporate,
            requestName: requestName,
            serviceRequest: serviceRequest,
            cashier: cashier,
            labPerson: labPerson,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });


        // data.itemDetails.serviceRequest.forEach(req => {
        //     switch (req.laboratoryRequest) {
        //         case 'GS':
        //             const gs = data.bacteriology.gs;
        //             if (gs !== null) {
        //                 let specimen = ''
        //                 let result = ''

        //                 if (gs.specimen !== null) specimen = gs.specimen
        //                 if (gs.result !== null) result = gs.result

        //                 const gsvalues = {
        //                     specimen: specimen,
        //                     result: result,
        //                     referenceLabId: gs.referenceLab !== null ? { value: gs.referenceLab.referenceid, label: gs.referenceLab.name } : ''
        //                 }

        //                 updateMicrobiologyData.gs = gsvalues;
        //             }
        //             break;
        //         default:
        //             break;
        //     }
        // })

        let patho = null
        if (data.medicalDoctor !== null) {
            patho = {
                value: data.medicalDoctor.doctorid,
                label: doctorName(data.medicalDoctor),
                license: data.medicalDoctor.licenseNumber
            }
        } else if (this.props.doctorInfo !== null) {
            const doc = this.props.doctorInfo
            patho = {
                value: doc.doctorid,
                label: doctorName(doc),
                license: doc.licenseNumber
            }
        }
        updateBacteriologyData.bacteriology.pathologist = patho;

        let qualityControl = null
        if (data.qualityControl !== null) qualityControl = data.qualityControl
        updateBacteriologyData.qualityControl = qualityControl

        return updateBacteriologyData
    }

    saveResults = () => {
        const bacteriologyData = this.state.bacteriologyData
        let bacteriologyRequest = {};

        bacteriologyData.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                default: break;
            }
        })

        let patho = null
        if (bacteriologyData.microbiology !== null) patho = bacteriologyData.microbiology.pathologist.value
        bacteriologyRequest.pathologistId = patho

        const transid = bacteriologyData.txnId
        const labid = bacteriologyData.id

        Swal.fire({
            title: 'Bacteriology',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveBacteriology(this.props.userToken, bacteriologyRequest, transid, labid, this.closeModal)
            }
        })
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
                this.props.onQCBacteriology(this.props.userToken, transid, labid, this.closeModal);
            }
        })
    }

    viewBacteriologyModal = (mbRowData, idx) => {
        if (mbRowData.status >= 2) {
            const updateBacteriologyData = this.getBacteriologyInfo(mbRowData)

            this.setState({
                ...this.state,
                showModal: true,
                bacteriologyData: updateBacteriologyData,
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

    onPrintBacteriology = (transid, labid, status, headerControl) => {
        // const roles = [].concat(this.props.auth.roles)
        //     .filter(r => r === 'ADMIN');

        // if (roles.length > 0) {
        if (status >= 2) {
            Swal.fire({
                title: 'Bacteriology Result',
                text: "Do you want to print this report?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onPrintBacteriology(this.props.userToken, transid, labid, headerControl)
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
                {/* <Backdrop className={classes.backdrop} open={this.props.loading || this.props.corpsLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop> */}
                {/* 
                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.chemData}
                    emailData={this.state.emailData}
                    closeClick={this.closeModal}
                    onSendEmail={this.onSendEmailToxicology}
                /> */}

                <BacteriologyModal
                    referenceLab={this.props.referenceLaboratoryList}
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    bacteriologyData={this.state.bacteriologyData}
                    setBacteriologyData={this.setBacteriologyData}
                    editViewFlag={this.state.editViewFlag}
                    doctorList={this.props.doctorList}
                    // onPrintToxicology={this.onPrintToxicology}
                    onQualityControl={this.onQualityControl}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Bacteriology</h3>
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
                                        onClick={this.viewBacteriology}
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
                                <BacteriologyTable
                                    onRef={ref => (this.toxicologyTableRef = ref)}
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
        doctorList: state.docs.doctorList,
        doctorInfo: state.docs.doctorData,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        branchList: state.bran.branchList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onGetDoctor: (token, docid) => dispatch(actions.getDoctor(token, docid)),
        onViewBTList: (token, procedure, startDate, endDate, branchId, chargeTo) => dispatch(actions.getLaboratoryServiceRequests(token, procedure, startDate, endDate, branchId, chargeTo)),
        onClearTOList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onSaveToxicology: (token, peValues, transid, labid, closeToxicologyModal) => dispatch(actions.saveToxicology(token, peValues, transid, labid, closeToxicologyModal)),
        onPrintToxicology: (token, transid, labid, withHeaderFooter) => dispatch(actions.printToxicology(token, transid, labid, withHeaderFooter)),
        onQCToxicology: (token, transid, labid, closeModal) => dispatch(actions.qualityControlToxicology(token, transid, labid, closeModal)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Bacteriology));