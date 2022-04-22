import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

import Swal from "sweetalert2";

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
    CDropdown,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu
} from "@coreui/react";
import * as actions from "src/store/actions/index";
import Summary from "src/containers/common/eod/Summary";
import TransactionList from "src/containers/common/eod/TransactionList";
import ReportsModal from "src/containers/modal/common/ReportsModal";
import { updateObject } from 'src/store/utility';


const useStyles = (theme) => ({
    cardBlueWhite: {
        backgroundColor: "#4267B2",
        color: "white",
    },
});



const branch = process.env.REACT_APP_BRANCH + " Branch";

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

export class EODTreasurer extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),

        addReport: false,
        denomination: denominationConfig,
        reportName: "",
        editFlag: false,
        viewMode: '',
        denominationTrueOrFalse: false,
        
    };

    componentDidMount() {
        this.props.onClearCashierEODData();
    }

    viewTransactions = () => {
        this.props.onClearCashierEODData();
        this.props.onGetCashierEOD(
            this.props.userToken,
            moment(this.state.dateFromValue).format("YYYYMMDDHHmm"),
            moment(this.state.dateToValue).format("YYYYMMDDHHmm"),
            process.env.REACT_APP_BRANCH_CODE
        );

        this.setState({
            ...this.state,
            denominationTrueOrFalse: true,
        });
    };

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
            viewMode: "Treasurer",
            createdBy: filter[0].cashier != null ? filter[0].cashier.username : "",
            verifiedBy: filter[0].verify != null ? filter[0].verify.username : "",
            notedBy: filter[0].noted != null ? filter[0].noted.username : "",
        });
    }

    printEODReceipt = () => {
        if (this.props.eodSummary !== null) {
            this.props.onGetCashierEODReceipt(
                this.props.userToken,
                moment(this.state.dateFromValue).format("YYYYMMDDHHmm"),
                moment(this.state.dateToValue).format("YYYYMMDDHHmm"),
                process.env.REACT_APP_BRANCH_CODE
            );
        } else {
            Swal.fire({
                title: "No records to export.",
                icon: "error",
                text: "Please view records prior to export.",
            });
        }
    };

    noteReport = () => {
        this.props.onSaveDenominationNote(
            this.props.userToken,
            moment(this.state.dateFromValue).format("YYYYMMDDHHmm"),
            moment(this.state.dateToValue).format("YYYYMMDDHHmm"),
            process.env.REACT_APP_BRANCH_CODE,
            this.closeModal,
        );
    }

    showAddReportModal = () => {
        let reportName = moment(this.state.dateFromValue).format('YYYY-MM-DD hh:mm a') + " TO " + moment(this.state.dateToValue).format('YYYY-MM-DD hh:mm a')
        this.setState({
            ...this.state,
            addReport: true,
            reportName: reportName,
        });
    };

    closeModal = () => {
        this.setState({
            ...this.state,
            showModal: false,
            addModal: false,
            addReport: false,
            denomination: denominationConfig
        });
    };

    updateState = (updateDenomination) => {
        this.setState({
            ...this.state,
            denomination: updateDenomination,
        });
    }

    saveDenominationReport = () => {
        if (this.props.eodSummary !== null) {
            this.props.onSaveDenominationReport(
                this.props.userToken,
                moment(this.state.dateFromValue).format("YYYYMMDDHHmm"),
                moment(this.state.dateToValue).format("YYYYMMDDHHmm"),
                process.env.REACT_APP_BRANCH_CODE,
                this.state.denomination,
                this.closeModal,
            );
        } else {
            Swal.fire({
                title: "No reports to show",
                icon: "error",
                text: "Please create a Report",
            });
        }
    }

    verifyReport = () => {
        this.props.onSaveDenominationVerify(
            this.props.userToken,
            moment(this.state.dateFromValue).format("YYYYMMDDHHmm"),
            moment(this.state.dateToValue).format("YYYYMMDDHHmm"),
            process.env.REACT_APP_BRANCH_CODE,
            this.closeModal,
        );

    }

    render() {
        const { classes } = this.props;
        const dateDisplayFormat = "MMM-DD-YYYY hh:mm a";
        const dateChangeHandler = (prop) => (event) => {
            this.setState({
                ...this.state,
                [prop]: event,
            });
        };

        return (
            <CCard>
                <CCardHeader className={classes.cardBlueWhite}>
                    <h6 className="mfe-2 font-weight-bold">
                        Treasurer End Of Day - {branch}
                    </h6>
                </CCardHeader>

                <CCardBody>
                    <CRow>
                        <CCol md="3" className="col-12 p-1">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker
                                    value={this.state.dateFromValue}
                                    format={dateDisplayFormat}
                                    label="Start Date"
                                    inputVariant="outlined"
                                    onChange={dateChangeHandler("dateFromValue")}
                                    showTodayButton
                                    disableFuture
                                    size="small"
                                />
                            </MuiPickersUtilsProvider>
                        </CCol>
                        <CCol md="3" className="col-12 p-1">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker
                                    value={this.state.dateToValue}
                                    format={dateDisplayFormat}
                                    label="End Date"
                                    inputVariant="outlined"
                                    onChange={dateChangeHandler("dateToValue")}
                                    showTodayButton
                                    disableFuture
                                    size="small"
                                />
                            </MuiPickersUtilsProvider>
                        </CCol>
                        <CCol md="6" className="col-12 p-1">
                            <CButton
                                className="border border-dark mfe-1"
                                color="success"
                                onClick={this.viewTransactions}
                            >
                                <i className="mfe-2 fas fa-list" /> View
                            </CButton>
                            <CButton
                                className="border border-dark mfe-1"
                                color="info"
                                onClick={this.printEODReceipt}
                            >
                                <i className="mfe-2 fas fa-print" /> Print
                            </CButton>

                            <div className="btn-group">
                                <CDropdown>
                                    <CDropdownToggle
                                        className="dropdown-toggle dropdown-toggle-split"
                                        color="secondary"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Reports
                                    </CDropdownToggle>
                                    <CDropdownMenu>
                                        {
                                            this.props.eodSummary != null ?
                                                this.props.eodSummary.denomination.length === 0 ?
                                                    <CDropdownItem disabled>Click Add Button to add report</CDropdownItem> :
                                                    this.props.eodSummary.denomination.map((report, index) => {
                                                        return <CDropdownItem key={index} onClick={this.report.bind(this, report.reportName)}>{report.reportName}</CDropdownItem>
                                                    }) : <CDropdownItem disabled>Click View Button to show the report</CDropdownItem>
                                        }
                                    </CDropdownMenu>
                                    <CButton
                                        hidden
                                        color="secondary"
                                        disabled={this.props.eodSummary == null ? true : false}
                                        onClick={this.showAddReportModal}
                                    >
                                        <i className="fas fa-plus" />
                                    </CButton>
                                </CDropdown>
                            </div>
                        </CCol>
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
                            createdBy={this.state.createdBy}
                            verifiedBy={this.state.verifiedBy}
                            notedBy={this.state.notedBy}
                        />
                    </CRow>
                    <hr />
                    <CRow>
                        <CCol md="12">
                            {this.props.eodSummary !== null ? <Summary /> : null}
                            {this.props.eodList !== null ? (
                                this.props.eodList.hold !== undefined &&
                                    this.props.eodList.hold !== null &&
                                    this.props.eodList.hold.length > 0 ? (
                                    <TransactionList
                                        title="Held Listing"
                                        code="HELD"
                                        displayList={this.props.eodList.hold}
                                    />
                                ) : null
                            ) : null}
                            {this.props.eodList !== null ? (
                                this.props.eodList.accounts !== undefined &&
                                    this.props.eodList.accounts !== null &&
                                    this.props.eodList.accounts.length > 0 ? (
                                    <TransactionList
                                        title="Accounts Listing"
                                        code="ACCOUNTS"
                                        displayList={this.props.eodList.accounts}
                                    />
                                ) : null
                            ) : null}
                            {this.props.eodList !== null ? (
                                this.props.eodList.ape !== undefined &&
                                    this.props.eodList.ape !== null &&
                                    this.props.eodList.ape.length > 0 ? (
                                    <TransactionList
                                        title="APE Listing"
                                        code="APE"
                                        displayList={this.props.eodList.ape}
                                    />
                                ) : null
                            ) : null}
                            {this.props.eodList !== null ? (
                                this.props.eodList.medicalMission !== undefined &&
                                    this.props.eodList.medicalMission !== null &&
                                    this.props.eodList.medicalMission.length > 0 ? (
                                    <TransactionList
                                        audit={true}
                                        title="Medical Mission"
                                        code="MEDICAL MISSION"
                                        displayList={this.props.eodList.medicalMission}
                                    />
                                ) : null
                            ) : null}
                            {this.props.eodList !== null ? (
                                this.props.eodList.hmo !== undefined &&
                                    this.props.eodList.hmo !== null &&
                                    this.props.eodList.hmo.length > 0 ? (
                                    <TransactionList
                                        title="HMO Listing"
                                        code="AMO"
                                        displayList={this.props.eodList.hmo}
                                    />
                                ) : null
                            ) : null}
                            {this.props.eodList !== null ? (
                                this.props.eodList.refund !== undefined &&
                                    this.props.eodList.refund !== null &&
                                    this.props.eodList.refund.length > 0 ? (
                                    <TransactionList
                                        title="Refund Listing"
                                        code="REFUNDS"
                                        displayList={this.props.eodList.refund}
                                    />
                                ) : null
                            ) : null}
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.eod.loading,
        error: state.eod.error,
        userToken: state.auth.token,
        eodSummary: state.eod.eodSummary,
        eodList: state.eod.eodList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearCashierEODData: () => dispatch(actions.clearCashierEODData()),
        onGetCashierEOD: (token, startDate, endDate, branchId) => dispatch(actions.getCashierEOD(token, startDate, endDate, branchId)),
        onGetCashierEODReceipt: (token, startDate, endDate, branchId) => dispatch(actions.getCashierEODReceipt(token, startDate, endDate, branchId)),
        onSaveDenominationReport: (token, startDate, endDate, branchId, denominationValue, closeModal) => dispatch(actions.saveDenominationReport(token, startDate, endDate, branchId, denominationValue, closeModal)),
        onSaveDenominationNote: (token, startDate, endDate, branchId, closeModal) => dispatch(actions.saveDenominationNote(token, startDate, endDate, branchId, closeModal)),
        onSaveDenominationVerify: (token, startDate, endDate, branchId, closeModal) => dispatch(actions.saveDenominationVerify(token, startDate, endDate, branchId, closeModal)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(EODTreasurer));
