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
} from '@coreui/react';

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import TransactionsTable from 'src/containers/tables/transactions/TransactionsTable';
import TransSummaryModal from 'src/containers/modal/transactions/TransSummaryModal';

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
});

const transConfig = {
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
}

export class TransactionList extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),

        showTransSummaryModal: false,
        transactionData: []
    }

    componentDidMount() {
        this.props.onClearTransactionList();
    }

    viewTransactions = () => {
        this.props
            .onViewTransaction(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm')
            )
    }

    exportTransaction = () => {
        this.props
            .onExportTransaction(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm')
            )
    }

    closeTransSummaryModal = () => {
        this.setState({
            ...this.state,
            showTransSummaryModal: false,
        });
    }

    transSummaryModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {

            const updateTransData = updateObject(transConfig, {
                id: data.id,
                txnId: data.transactionid,
                txnSR: data.id,
                txnType: data.transactionType,
                branch: data.branch,
                patient: data.patient,
                corporate: data.corporate,
                cashier: data.cashier,
                txnRemarks: data.remarks,
                txnStatus: data.status,
                txnDate: data.transactionDate,
                transactionItems: data.transactionItems,
                totalItemDiscountAmount: data.totalItemDiscountAmount,
                specialDiscountAmount: data.specialDiscountAmount,
                totalItemTaxAmount: data.totalItemTaxAmount,
                totalItemAmountDue: data.totalItemAmountDue,
                totalPaymentAmount: data.totalPaymentAmount,
                totalChangeAmount: data.totalChangeAmount
            });

            this.setState({
                ...this.state,
                showTransSummaryModal: true,
                transactionData: updateTransData
            });

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
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.exportLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <TransSummaryModal
                    showModal={this.state.showTransSummaryModal}
                    closeClick={this.closeTransSummaryModal}
                    tranData={this.state.transactionData}
                />

                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="mfe-2">Transaction List</h3>
                        </CCardHeader>

                        <CCardBody>
                            <CRow>
                                <CCol>
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
                                            &nbsp;

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
                                            &nbsp;
                                    <CButton
                                        className="border border-dark mfe-2"
                                        color="success"
                                        onClick={this.viewTransactions}
                                    >
                                        <i className="mfe-2 fas fa-list" />
                                        View
                                    </CButton>
                                    <CButton
                                        className="border border-dark mfe-2"
                                        color="primary"
                                        onClick={this.exportTransaction}
                                    >
                                        <i className="mfe-2 fas fa-list" />
                                        Export
                                    </CButton>
                                </CCol>

                            </CRow>
                            <hr />
                            <div className="table-responsive">
                                <TransactionsTable onRef={ref => (this.transTableRef = ref)} transSummaryModal={this.transSummaryModal} />
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
        loading: state.trans.loading,
        error: state.trans.error,
        userToken: state.auth.token,
        transactionList: state.trans.transactionList,
        exportLoading: state.trans.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onViewTransaction: (token, startDate, endDate) => dispatch(actions.viewTransactions(token, startDate, endDate)),
        onExportTransaction: (token, startDate, endDate) => dispatch(actions.exportTransaction(token, startDate, endDate)),
        onClearTransactionList: () => dispatch(actions.clearTransactionList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(TransactionList))