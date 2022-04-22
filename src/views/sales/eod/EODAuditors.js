import React, { Component } from 'react'
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactSelect from 'react-select';

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Swal from 'sweetalert2';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CCol,
    CRow,
    CDropdown,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu
} from '@coreui/react';
import { updateObject } from 'src/store/utility';

import ReportsModal from "src/containers/modal/common/ReportsModal";

import {
    FormControl,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import Summary from 'src/containers/common/eod/Summary';
import TransactionList from 'src/containers/common/eod/TransactionList';

import AuditorsNotesModal from 'src/containers/modal/common/AuditorsNotesModal'

const useStyles = theme => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    },
});

const defaultSelect = {
    value: 'All', label: 'All'
}

const testSelect = [
    { value: 'All', label: 'All' },
    { value: 'RTPCR', label: 'RTPCR TEST' },
    { value: 'REFERRAL', label: 'REFERRAL' }
]

const eodNoteReference = {
    eodContent: {
        notes: "",
        referenceNumber: "",
        branch_Id: "jTDxJb",

    }
}

const denominationConfig = {
    thousands: 0,
    fiveHundreds: 0,
    twoHundreds: 0,
    oneHundreds: 0,
    fifties: 0,
    twenties: 0,
    tens: 0,
    five: 0,
    one: 0,
    cents: 0,
}

export class EODAuditors extends Component {
    state = {
        dateFrom: moment(moment().format("YYYY-MM-DD")),
        dateTo: moment(moment().format("YYYY-MM-DD")),
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        selectedBranch: defaultSelect,
        branchSelect: [],
        editFlag: false,
        viewMode: "",
        denomination: denominationConfig,
        selectedTest: { value: 'All', label: 'All' },
        auditNotesModal: false,
        eodNotesReferenceValue: eodNoteReference,
        createdBy: "",
        verifiedBy: "",
        notedBy: ""

    }

    componentDidMount() {
        if (this.props.branchList.length <= 0) {
            this.props.onGetAllBranches(this.props.userToken);
        }
    }

    handleSelectBranch = (event) => {
        this.setState({
            ...this.state,
            selectedBranch: event,
        });
    }

    handleSelectTest = (event) => {
        this.setState({
            ...this.state,
            selectedTest: event,
        });
    }

    viewTransactions = () => {
        this.props.onClearAuditorEODData();
        this.props
            .onGetAuditorEOD(
                this.props.userToken,
                moment(this.state.dateFrom).format('YYYYMMDD'),
                moment(this.state.dateTo).format('YYYYMMDD'),
                this.state.selectedBranch.value !== 'All' ? this.state.selectedBranch.value : null,
                this.state.selectedTest.value !== 'All' ? this.state.selectedTest.value : null
            )
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            addReport: false,
            editFlag: false,
            denomination: denominationConfig
        });
    };

    exportTransactions = () => {
        if (this.props.eodSummary !== null) {
            this.props
                .onGetAuditorEODExcel(
                    this.props.userToken,
                    moment(this.state.dateFrom).format('YYYYMMDD'),
                    moment(this.state.dateTo).format('YYYYMMDD'),
                    this.state.selectedBranch.value !== 'All' ? this.state.selectedBranch.value : null,
                    this.state.selectedTest.value !== 'All' ? this.state.selectedTest.value : null
                )
        } else {
            Swal.fire({
                title: 'No records to export.',
                icon: 'error',
                text: 'Please view records prior to export.',
            })
        }
    }

    exportTransactionsWithNotes = () => {
        if (this.props.eodSummary !== null) {
            this.setState({
                ...this.state,
                auditNotesModal: true,
                eodNotesReferenceValue: {
                    eodContent: {
                        notes: this.props.eodSummary.eodOtherNotes,
                        referenceNumber: this.props.eodSummary.referenceNumber

                    }
                }
            })
        } else {
            Swal.fire({
                title: 'No records to export.',
                icon: 'error',
                text: 'Please view records prior to export.',
            })
        }
    }

    closeAuditorNotesModal = (data) => {
        this.setState({
            ...this.state,
            showSOAModal: false,
            auditNotesModal: false,
        });
    }


    onSaveNotesReferenceNum = (notesValues) => {
        Swal.fire({
            title: 'Auditor Notes',
            text: "Do you want to save this Notes and/or Reference Number?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveNotes(
                    this.props.userToken,
                    notesValues,
                    moment(this.state.dateFrom).format('YYYYMMDD'),
                    moment(this.state.dateTo).format('YYYYMMDD'),
                    // this.state.selectedBranch.value !== 'All' ? this.state.selectedBranch.value : null,
                    process.env.REACT_APP_BRANCH_CODE,
                    this.closeAuditorNotesModal,
                );

                // this.props
                // .onGetAuditorEOD(
                //     this.props.userToken,
                //     moment(this.state.dateFrom).format('YYYYMMDD'),
                //     moment(this.state.dateTo).format('YYYYMMDD'),
                //     this.state.selectedBranch.value !== 'All' ? this.state.selectedBranch.value : null
                // )
            }
        })
    }

    report = (value) => {
        var filter = this.props.eodSummary.denomination.filter(report => report.reportName === value);
        const updateDenominationData = updateObject(this.state.denomination, {
            thousands: filter[0].thousands,
            fiveHundreds: filter[0].fiveHundreds,
            twoHundreds: filter[0].twoHundreds,
            oneHundreds: filter[0].oneHundreds,
            fifties: filter[0].fifties,
            twenties: filter[0].twenties,
            tens: filter[0].tens,
            five: filter[0].five,
            one: filter[0].one,
            cents: filter[0].cents,
        });

        this.setState({
            ...this.state,
            addReport: true,
            dateFromValue: filter[0].coverageDateAndTimeFrom,
            dateToValue: filter[0].coverageDateAndTimeTo,
            denomination: updateDenominationData,
            reportName: filter[0].reportName,
            editFlag: true,
            viewMode: "Auditor",
            createdBy: filter[0].cashier != null ? filter[0].cashier.username : "",
            verifiedBy: filter[0].verify != null ? filter[0].verify.username : "",
            notedBy: filter[0].noted != null ? filter[0].noted.username : "",
        });
    }

    verifyReport = () => {
        this.props.onSaveDenominationNote(
            this.props.userToken,
            moment(this.state.dateFromValue).format("YYYYMMDDHHmm"),
            moment(this.state.dateToValue).format("YYYYMMDDHHmm"),
            process.env.REACT_APP_BRANCH_CODE,
            this.closeModal,
        );

    }
    

    render() {

        const { classes } = this.props;

        const dateDisplayFormat = 'MMM-DD-YYYY'

        const dateChangeHandler = (prop) => (event) => {
            this.setState({
                ...this.state,
                [prop]: event
            })
        }
        return (


            <CCard>
                <CCardHeader className={classes.cardBlueWhite}>
                    <h6 className="mfe-2 font-weight-bold">Auditors End Of Day</h6>
                </CCardHeader>

                <AuditorsNotesModal
                    auditModal={this.state.auditNotesModal}
                    eodData={this.state.eodNotesReferenceValue}
                    closeClick={this.closeAuditorNotesModal}
                    onSaveNotesReferenceNumber={this.onSaveNotesReferenceNum}
                />

                <ReportsModal
                    save={this.saveDenominationReport}
                    updateState={this.updateState}
                    showModal={this.state.addReport}
                    closeClick={this.closeModal}
                    denomination={this.state.denomination}
                    reportName={this.state.reportName}
                    editFlag={this.state.editFlag}
                    viewMode={this.state.viewMode}
                    verifyReport={this.verifyReport}
                    noteReport={this.noteReport}
                    createdBy={this.state.createdBy}
                    verifiedBy={this.state.verifiedBy}
                    notedBy={this.state.notedBy}
                />

                <CCardBody>
                    <CRow>
                        <CCol md="2" className="col-12 p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>From</CLabel>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    value={this.state.dateFrom}
                                    format={dateDisplayFormat}
                                    inputVariant="outlined"
                                    onChange={dateChangeHandler('dateFrom')}
                                    showTodayButton
                                    disableFuture
                                    size="small"
                                />
                            </MuiPickersUtilsProvider>
                        </CCol>
                        <CCol md="2" className="col-12 p-1">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>To</CLabel>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    value={this.state.dateTo}
                                    format={dateDisplayFormat}
                                    inputVariant="outlined"
                                    onChange={dateChangeHandler('dateTo')}
                                    showTodayButton
                                    disableFuture
                                    size="small"
                                />
                            </MuiPickersUtilsProvider>
                        </CCol>
                        <CCol md="2" className="col-12 p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Branch</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={this.state.selectedBranch}
                                    onChange={this.handleSelectBranch}
                                    isClearable={false}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={[{ branchid: 'All', branchName: 'All' }].concat(this.props.branchList)
                                        .map(brn => {
                                            return { value: brn.branchid, label: brn.branchName }
                                        })}
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="2" className="col-12 p-1">
                            <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Test</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={this.state.selectedTest}
                                    onChange={this.handleSelectTest}
                                    isClearable={false}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={testSelect}
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="col-12 p-1">
                            <CButton
                                className="border border-dark mt-4 mfe-2"
                                color="success"
                                onClick={this.viewTransactions}
                            >
                                <i className="mfe-2 fas fa-list" /> View
                            </CButton>

                            <CButton
                                className="border border-dark mt-4 mfe-2"
                                color="primary"
                                onClick={this.exportTransactions}
                            >
                                <i className="mfe-2 fas fa-file-excel" /> Excel
                            </CButton>
                            <CButton
                                className="border border-dark mt-4 mfe-2"
                                color="primary"
                                onClick={this.exportTransactionsWithNotes}
                            >
                                <i className="fas fa-sticky-note" /> Notes
                            </CButton>


                        </CCol>
                        <CCol md="8" className="col-12 p-1">
                        </CCol>
                        
                        <CCol md="4" className="col-12 p-1">
                            <CDropdown>
                                <CDropdownToggle
                                    className="dropdown-toggle dropdown-toggle-split border border-dark mt-4 mfe-2"
                                    color="secondary"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Reports
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    {
                                        this.props.eodSummary != null && this.props.eodSummary.denomination != null ?
                                            this.props.eodSummary.denomination.length === 0 ?
                                                <CDropdownItem disabled>Click Add Button to add report</CDropdownItem> :
                                                this.props.eodSummary.denomination.map((report, index) => {
                                                    return <CDropdownItem key={index} onClick={this.report.bind(this, report.reportName)}>{report.reportName}</CDropdownItem>
                                                }) : <CDropdownItem disabled>Click View Button to show the report</CDropdownItem>
                                    }
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                    </CRow>
                    <hr />
                    <CRow>
                        <CCol md="12">
                            {
                                this.props.eodSummary !== null
                                    ? <Summary />
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.hold !== undefined && this.props.eodList.hold !== null && this.props.eodList.hold.length > 0 ? <TransactionList audit={true} title="Held Listing" code="HELD" displayList={this.props.eodList.hold} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.accounts !== undefined && this.props.eodList.accounts !== null && this.props.eodList.accounts.length > 0 ? <TransactionList audit={true} title="Accounts Listing" code="ACCOUNTS" displayList={this.props.eodList.accounts} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.ape !== undefined && this.props.eodList.ape !== null && this.props.eodList.ape.length > 0 ? <TransactionList audit={true} title="APE Listing" code="APE" displayList={this.props.eodList.ape} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.medicalMission !== undefined && this.props.eodList.medicalMission !== null && this.props.eodList.medicalMission.length > 0 ? <TransactionList audit={true} title="Medical Mission" code="MEDICAL MISSION" displayList={this.props.eodList.medicalMission} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.hmo !== undefined && this.props.eodList.hmo !== null && this.props.eodList.hmo.length > 0 ? <TransactionList audit={true} title="HMO Listing" code="HMO" displayList={this.props.eodList.hmo} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.cash !== undefined && this.props.eodList.cash !== null && this.props.eodList.cash.length > 0 ? <TransactionList audit={true} title="Cash Listing" code="CASH" displayList={this.props.eodList.cash} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.bank !== undefined && this.props.eodList.bank !== null && this.props.eodList.bank.length > 0 ? <TransactionList audit={true} title="Bank Listing" code="BANK" displayList={this.props.eodList.bank} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.virtual !== undefined && this.props.eodList.virtual !== null && this.props.eodList.virtual.length > 0 ? <TransactionList audit={true} title="Virtual Listing" code="VIRTUAL" displayList={this.props.eodList.virtual} /> : null
                                    : null
                            }
                            {
                                this.props.eodList !== null
                                    ? this.props.eodList.refund !== undefined && this.props.eodList.refund !== null && this.props.eodList.refund.length > 0 ? <TransactionList audit={true} title="Refund Listing" code="REFUNDS" displayList={this.props.eodList.refund} /> : null
                                    : null
                            }
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.eod.loading,
        error: state.eod.error,
        userToken: state.auth.token,
        eodSummary: state.eod.eodSummary,
        eodList: state.eod.eodList,
        branchList: state.bran.branchList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearAuditorEODData: () => dispatch(actions.clearAuditorEODData()),
        onGetAuditorEOD: (token, startDate, endDate, branchId, test) => dispatch(actions.getAuditorEOD(token, startDate, endDate, branchId, test)),
        onGetAuditorEODExcel: (token, startDate, endDate, branchId, test) => dispatch(actions.getAuditorEODExcel(token, startDate, endDate, branchId, test)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onSaveNotes: (token, notesValue, branchId, dateFrom, dateTo, closeModal) => dispatch(actions.saveAuditorNotes(token, notesValue, branchId, dateFrom, dateTo, closeModal)),
        onSaveDenominationVerify: (token, startDate, endDate, branchId, closeModal) => dispatch(actions.saveDenominationVerify(token, startDate, endDate, branchId, closeModal)),
        onSaveDenominationNote: (token, startDate, endDate, branchId, closeModal) => dispatch(actions.saveDenominationNote(token, startDate, endDate, branchId, closeModal)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(EODAuditors))
