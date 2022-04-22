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

import ToxicologyTable from 'src/containers/tables/laboratory/ToxicologyTable';
import ToxicologyModal from 'src/containers/modal/laboratory/ToxicologyModal';
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

const toxiConfig = {
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
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
    toxicology: {
        methamphethamine: null,
        tetrahydrocanabinol: null,
        pathologist: null,
        isMethamphethamineError: false,
        isTetrahydrocanabinolError: false,
        isPathologistError: false,
    },
}

const npOptionsMap = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}

class Toxicology extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        toxiData: toxiConfig,

        emailData: emailConfig,
        emailModal: false,
        editViewFlag: false,

        selectedBranch: null,
        selectedChargeTo: null,
    }

    setToxicologyData = (updateToxiData) => {
        this.setState({
            ...this.state,
            toxiData: updateToxiData
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
        this.props.onGetDoctor(this.props.userToken, process.env.REACT_APP_PATHOLOGIST)
    }

    handleSelectChange = (opt) => (event) => {
        this.props.onClearTOList('TO');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    viewToxicology = () => {
        this.props.onClearTOList('TO');
        this.props
            .onViewTOList(
                this.props.userToken,
                'TO',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    getToxiInfo = (data) => {
        let requestName = '';
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let serviceRequest = [];
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
        }

        if (data.labPersonel !== undefined && data.labPersonel !== null) {
            labPerson = data.labPersonel
        }

        const updateToxiData = updateObject(toxiConfig, {
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
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });

        const toxi = data.toxicology
        let methavalue = null
        let tetravalue = null

        if (toxi !== null) {
            if (toxi.methamphethamine !== null) {
                if (npOptionsMap.has(toxi.methamphethamine) === true) {
                    methavalue = {
                        value: toxi.methamphethamine,
                        label: npOptionsMap.get(toxi.methamphethamine)
                    }
                }
            }

            if (toxi.tetrahydrocanabinol !== null) {
                if (npOptionsMap.has(toxi.tetrahydrocanabinol) === true) {
                    tetravalue = {
                        value: toxi.tetrahydrocanabinol,
                        label: npOptionsMap.get(toxi.tetrahydrocanabinol)
                    }
                }
            }
        }

        updateToxiData.toxicology.methamphethamine = methavalue
        updateToxiData.toxicology.tetrahydrocanabinol = tetravalue

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
        updateToxiData.toxicology.pathologist = patho;

        let qualityControl = null
        if (data.qualityControl !== null) qualityControl = data.qualityControl
        updateToxiData.qualityControl = qualityControl

        return updateToxiData
    }

    openToxicologyModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updateToxiData = this.getToxiInfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                toxiData: updateToxiData,
                editViewFlag: false
            });
        }
    }

    viewToxicologyModal = (toxiRowData, idx) => {
        if (toxiRowData.status >= 2) {
            const updateToxiData = this.getToxiInfo(toxiRowData)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                toxiData: updateToxiData,
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

    checkNPOptions = (opt) => {
        let npOptValue = null;
        if (npOptionsMap.has(opt) === true) {
            npOptValue = {
                value: opt,
                label: npOptionsMap.get(opt)
            }
        }
        return npOptValue
    }

    closeModal = (responseTX) => {
        this.setState({
            ...this.state,
            showModal: false,
            EmailModal: false,
            editViewFlag: false
        });

        if (responseTX !== null) {
            if (this.state.updateIndex !== null) {
                this.toxicologyTableRef.updateToxicologyToTable(responseTX, this.state.updateIndex);
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
        const toxiData = this.state.toxiData

        let metha = null
        let tetra = null
        let patho = null

        if (toxiData.toxicology.methamphethamine !== null) metha = toxiData.toxicology.methamphethamine.value
        if (toxiData.toxicology.tetrahydrocanabinol !== null) tetra = toxiData.toxicology.tetrahydrocanabinol.value
        if (toxiData.toxicology.pathologist !== null) patho = toxiData.toxicology.pathologist.value

        const toxiRequest = {
            methamphethamine: metha,
            tetrahydrocanabinol: tetra,
            pathologistId: patho
        }

        const transid = toxiData.txnId
        const labid = toxiData.id

        Swal.fire({
            title: 'Toxicology',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveToxicology(this.props.userToken, toxiRequest, transid, labid, this.closeModal)
            }
        })
    }


    onPrintToxicology = (transid, labid, status, headerControl) => {

        // const roles = [].concat(this.props.auth.roles)
        //     .filter(r => r === 'ADMIN');

        // if (roles.length > 0) {
            if (status >= 2) {
                Swal.fire({
                    title: 'Toxicology Result',
                    text: "Do you want to print this report?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.props.onPrintToxicology(this.props.userToken, transid, labid, headerControl)
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
                this.props.onQCToxicology(this.props.userToken, transid, labid, this.closeModal);
            }
        })
    }

    onShowEmailModal = (data) => {
        const updateToxiData = this.getToxiInfo(data)

        this.setState({
            ...this.state,
            emailModal: true,
            modalTitle: "Email Toxicology",
            CMData: updateToxiData,
            emailData: {
                emailContent: {
                    sendTo: updateToxiData.patient.email,
                    sendCc: '',
                    emailSubject: 'Toxicology Results',
                    emailBody:
                        `Dear Team,\n\nYou may now look to the attached file of your result in PDF format and Excel format.\nFor any question/classification, please contact us at 0917-535-9417 for Globe and\n0925-577-8378 for Sun/Smart or send us an email at\nquestphil.corpresult@gmail.com\n\nThank you for your concern!\n\nYours truly,\n\nQuest Diagnostics Team`,
                }
            }
        });
    }

    onSendEmailToxicology = (emailValues, transid, labid) => {

        Swal.fire({
            title: 'Toxicology Result',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendEmailToxicology(this.props.userToken, emailValues, transid, labid, this.closeModal);
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

                <ToxicologyModal
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    toxiData={this.state.toxiData}
                    setToxiData={this.setToxicologyData}
                    editViewFlag={this.state.editViewFlag}
                    doctorList={this.props.doctorList}
                    onPrintToxicology={this.onPrintToxicology}
                    onQualityControl={this.onQualityControl}
                />

                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.chemData}
                    emailData={this.state.emailData}
                    closeClick={this.closeModal}
                    onSendEmail={this.onSendEmailToxicology}
                />


                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Toxicology</h3>
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
                                        onClick={this.viewToxicology}
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
                                <ToxicologyTable
                                    onRef={ref => (this.toxicologyTableRef = ref)}
                                    openToxicologyModal={this.openToxicologyModal}
                                    viewToxicologyModal={this.viewToxicologyModal}
                                    onPrintToxicology={this.onPrintToxicology}
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
        toxiList: state.lab.toxicologyList,
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
        onViewTOList: (token, procedure, startDate, endDate, branchId, chargeTo) => dispatch(actions.getLaboratoryServiceRequests(token, procedure, startDate, endDate, branchId, chargeTo)),
        onClearTOList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onSaveToxicology: (token, peValues, transid, labid, closeToxicologyModal) => dispatch(actions.saveToxicology(token, peValues, transid, labid, closeToxicologyModal)),
        onPrintToxicology: (token, transid, labid, withHeaderFooter) => dispatch(actions.printToxicology(token, transid, labid, withHeaderFooter)),
        onQCToxicology: (token, transid, labid, closeModal) => dispatch(actions.qualityControlToxicology(token, transid, labid, closeModal)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Toxicology));