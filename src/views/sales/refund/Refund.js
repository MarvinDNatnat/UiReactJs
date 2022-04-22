import React, { Component } from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import * as actions from 'src/store/actions/index';
import { getPayType, getCardType, twoFixedAmt } from 'src/store/utility';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCardFooter,
    CContainer,
    CCol,
    CRow,
    CLabel
} from '@coreui/react';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import SearchTransactionModal from 'src/containers/modal/transactions/SearchTransactionModal';
import PatientInformation from 'src/containers/common/PatientInformation';
import TransactionItemRefunds from 'src/containers/pos/TransactionItemRefunds';
import AuthorizationModal from 'src/containers/modal/common/AuthorizationModal';

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
    overflow: {
        overflow: 'scroll',
        height: '300px'
    },
    bgTotalSum: {
        backgroundColor: '#628BDE',
    },
    bgChange: {
        backgroundColor: '#4267B2',
    },
    txtShadow: {
        textShadow: '2px 2px black'
    },
    boxShadow: {
        boxShadow: '3px 3px black'
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
});

const authConfig = {
    username: '',
    password: '',
    reason: '',

    errUser: false,
    errPass: false,
    errReason: false,
}

const initialState = {
    patient: null,
    corporate: null,
    cashier: null,
    txnId: null,
    txnSRNo: null,
    txnType: null,
    txnStatus: null,
    txnDate: null,
    transaction: null,
    txnItems: [],
    subTotal: 0,
    taxAmount: 0,
    discountAmount: 0,
    changeAmount: 0,
    amountDue: 0,
    paymentType: null,
    paymentTypeDisplay: null,
    biller: null,
    paymentDetails: null,
    disableRefund: true,
    totalCashOut: 0,
    showAuthorizationModal: false,
    authorizationData: authConfig,
    authUser: '',
    reason: '',
    onAuthUser: '',
}

export class Refund extends Component {
    state = {
        showSearchModal: false,
        ...initialState,
    }

    displaySearchModal = () => {
        this.props.onClearTransactionList();

        this.setState({
            ...this.state,
            showSearchModal: true,
        });
    }

    closeSearchModal = () => {
        this.setState({
            ...this.state,
            showSearchModal: false,
        });
    }

    loadTransaction = (txn, idx) => {
        if (txn !== undefined && txn !== null) {
            let ptnt = null;
            let corp = null;
            let cshr = null;

            if (txn.patient !== undefined && txn.patient !== null) {
                ptnt = txn.patient;
            }
            if (txn.corporate !== undefined && txn.corporate !== null) {
                corp = txn.corporate;
            }
            if (txn.cashier !== undefined && txn.cashier !== null) {
                cshr = txn.cashier;
            }

            const txnItms = [];
            txn.transactionItems.forEach(itm => {
                let description = '';
                switch (itm.itemType) {
                    case 'ITM':
                        description = itm.itemDetails.itemDescription;
                        break;

                    case 'PCK':
                        description = itm.itemDetails.packageDescription;
                        break;

                    default:
                        break;
                }

                txnItms.push({
                    id: itm.id,
                    amount: itm.grossAmount,
                    amountDue: itm.amountDue,
                    discountAmount: itm.discountValue,
                    discountRate: itm.discountRate,
                    discountType: itm.discountType,
                    discountable: itm.discountable,
                    info: itm.itemDetails,
                    itemDisplay: description,
                    itemType: itm.itemType,
                    itemid: itm.itemReference,
                    quantity: itm.quantity,
                    taxAmount: itm.taxAmount,
                    taxRate: itm.taxRate,
                    taxable: itm.taxable,
                    unitPrice: itm.itemPrice,
                    status: itm.status,
                    isSelected: false,
                });
            });

            this.setState({
                ...this.state,
                showSearchModal: false,
                patient: ptnt,
                corporate: corp,
                cashier: cshr,
                txnId: txn.transactionid,
                txnSRNo: txn.id,
                txnType: txn.transactionType,
                txnStatus: txn.status,
                txnDate: txn.transactionDate,
                transaction: txn,
                txnItems: txnItms,
                subTotal: txn.totalItemGrossAmount,
                taxAmount: txn.totalItemTaxAmount,
                discountAmount: txn.totalItemDiscountAmount,
                changeAmount: txn.totalChangeAmount,
                amountDue: txn.totalItemAmountDue,
                paymentType: txn.paymentType,
                paymentTypeDisplay: getPayType(txn.paymentType),
                biller: txn.biller,
                paymentDetails: this.getPaymentDetails(txn.transactionPayments),
                disableRefund: false,
            });
        }
    }

    getPaymentDetails = (payments) => {
        let details = null;

        if (payments !== undefined && payments !== null && payments.length > 0) {
            const payment = payments[0];
            switch (payment.paymentType) {
                case 'CC':
                    details = (
                        <CRow>
                            <CCol md="4">
                                Card Holder:
                            </CCol>
                            <CCol md="8">
                                <strong>{payment.ccHolderName}</strong>
                            </CCol>
                            <CCol md="4">
                                Card Number:
                            </CCol>
                            <CCol md="8">
                                <strong>{payment.ccNumber}-{getCardType(payment.ccType)}</strong>
                            </CCol>
                        </CRow>
                    )
                    break;
                case 'HMO':
                    details = (
                        <CRow>
                            <CCol md="4">
                                LOE:
                            </CCol>
                            <CCol md="8">
                                <strong>{payment.hmoLOE}</strong>
                            </CCol>
                            <CCol md="4">
                                Acct. No.:
                            </CCol>
                            <CCol md="8">
                                <strong>{payment.hmoAccountNumber}</strong>
                            </CCol>
                            <CCol md="4">
                                Appl. Code:
                            </CCol>
                            <CCol md="8">
                                <strong>{payment.hmoApprovalCode}</strong>
                            </CCol>
                        </CRow>
                    )
                    break;
                case "GCA":
                    details = (
                        <CRow>
                            <CCol md="5">
                                Reference No.:
                            </CCol>
                            <CCol md="7">
                                <strong>{payment.gcReferenceNumber}</strong>
                            </CCol>
                        </CRow>
                    )
                    break;

                default:
                    break;
            }
        }

        return details;
    }

    processRefund = () => {
        if (this.state.totalCashOut <= 0) {
            Swal.fire({
                title: 'Error!!!',
                text: "Please select item to refund.",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        } else {
            this.confirmRefund();
        }
    }

    confirmRefund = () => {
        Swal.fire({
            html: `<strong class="text-danger h1">Total Cash Out: ${this.state.totalCashOut}</strong><br>Are you sure to refund this transaction?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Refund',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.authorizeRefund();
            }
        })
    }

    setAuthData = (updateAuthData) => {
        this.setState({
            ...this.state,
            authorizationData: updateAuthData,
        });
    }

    authorizeRefund = () => {
        this.setState({
            ...this.state,
            showAuthorizationModal: true,
            authorizationData: authConfig,
            authUser: '',
            reason: '',
            onAuthUser: 'refund'
        });
    }

    validateAuthorizationReq = () => {
        const authRequest = {
            username: this.state.authorizationData.username,
            password: this.state.authorizationData.password,
        }

        this.props.onGetAuthorizeUser(this.props.userToken, authRequest, this.closeAuthorizeModal);
    }

    closeAuthorizeModal = (data) => {
        let authUser = this.state.authUser;
        let reason = this.state.reason;

        if (data !== null) {
            authUser = data.message;
            reason = this.state.authorizationData.reason;
        }

        this.setState({
            ...this.state,
            showAuthorizationModal: false,
            authorizationData: authConfig,
            authUser: authUser,
            reason: reason,
        });

        if (data !== null) {
            if (this.state.onAuthUser === 'refund') {
                this.processRefundTransaction();
            }
        }
    }

    processRefundTransaction = () => {
        const itemList = [];

        this.state.txnItems.forEach(itm => {
            if (itm.isSelected) {
                itemList.push(itm.id);
            }
        });

        const refundRequest = {
            transactionid: this.state.transaction.transactionid,
            authorizeId: this.state.authUser,
            description: this.state.reason,
            refundItems: itemList,
        }

        this.props.onRefundTransaction(this.props.userToken, refundRequest, this.cleanUpFunction);
    }

    cleanUpFunction = (txn) => {
        if (txn.status === "SRE") { // REFUNDED
            Swal.fire({
                title: 'Transaction refunded.',
                text: "Reference Number[" + txn.transactionid + "]!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.setState({
                        showSearchModal: false,
                        ...initialState,
                    });
                }
            })
        }
    }

    clearTransaction = () => {
        this.setState({
            ...this.state,
            ...initialState,
        });
    }

    selectProductItem = (prd, idx) => {
        if (prd !== null && prd !== undefined && idx >= 0) {
            const itemDataList = [...this.state.txnItems];
            const product = itemDataList[idx];
            if (product !== null) {
                product.isSelected = prd.isSelected;
                itemDataList[idx] = product;

                this.computeTotalRefund(itemDataList);
            }
        }
    }

    computeTotalRefund = (itemList) => {
        let totalAmountDue = 0;

        itemList.forEach(itm => {
            if (itm.isSelected) {
                totalAmountDue += itm.amountDue;
            }
        });

        this.setState({
            ...this.state,
            txnItems: itemList,
            totalCashOut: totalAmountDue,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <CContainer>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <SearchTransactionModal
                    showModal={this.state.showSearchModal}
                    closeClick={this.closeSearchModal}
                    loadTxn={this.loadTransaction}
                />

                <AuthorizationModal
                    showModal={this.state.showAuthorizationModal}
                    authData={this.state.authorizationData}
                    closeClick={this.closeAuthorizeModal}
                    setAuthData={this.setAuthData}
                    validateAuth={this.validateAuthorizationReq}
                />

                <CRow>
                    <CCol className="p-0">
                        <CCard>
                            <CCardHeader className={classes.cardBlueWhite}>
                                <CRow>
                                    <h3 className="mfe-2 font-weight-bold">Refund Transaction</h3>
                                    <CButton
                                        className="border border-dark"
                                        color="success"
                                        onClick={this.displaySearchModal}
                                    >
                                        <i className="mfe-2 fas fa-search" />
                                        Search
                                    </CButton>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <PatientInformation
                                    propData={this.state}
                                />

                                <CRow>
                                    <CCol md="5" className="pr-1">
                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <span className="font-weight-bold">Payments</span>
                                            </CCardHeader>
                                            <CCardBody className="p-1">
                                                <CRow>
                                                    <CCol md="5">
                                                        Payment Type:
                                                    </CCol>
                                                    <CCol md="7">
                                                        <strong>{this.state.paymentTypeDisplay}</strong>
                                                    </CCol>
                                                </CRow>
                                                {
                                                    this.state.biller !== null
                                                        ? (
                                                            <CRow>
                                                                <CCol md="4">
                                                                    Biller:
                                                                </CCol>
                                                                <CCol md="8">
                                                                    <strong>{this.state.biller}</strong>
                                                                </CCol>
                                                            </CRow>
                                                        )
                                                        : null
                                                }
                                                {this.state.paymentDetails}

                                                <CRow className="mt-3">
                                                    <CCol md="6" className="font-weight-bold text-danger pr-0">
                                                        TOTAL CASH OUT:
                                                    </CCol>
                                                    <CCol md="6" className="text-danger pl-0 lead">
                                                        <strong>{twoFixedAmt(this.state.totalCashOut)}</strong>
                                                    </CCol>
                                                </CRow>

                                                <CRow className="mt-2 text-center">
                                                    <CCol md="12">
                                                        <CButton
                                                            className="mfe-1 border border-dark"
                                                            color="danger"
                                                            onClick={this.processRefund}
                                                            disabled={this.state.disableRefund}
                                                        >
                                                            Refund
                                                        </CButton>
                                                        <CButton
                                                            className="mfe-1 border border-dark"
                                                            color="primary"
                                                            onClick={this.clearTransaction}
                                                        >
                                                            Clear
                                                        </CButton>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>

                                        <div className={clsx(classes.bgTotalSum, classes.boxShadow, "col-12 text-white p-3 border border-dark rounded")}>
                                            <div className="row mr-1 ml-1 font-weight-bold border-bottom">
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0")}>
                                                    <CLabel>Sub Total:</CLabel>
                                                </div>
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 text-right")}>
                                                    <CLabel className={classes.summaryAmount}>{twoFixedAmt(this.state.subTotal)}</CLabel>
                                                </div>
                                            </div>
                                            <div className="row mr-1 ml-1">
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 font-weight-bold")}>
                                                    <CLabel>Tax:</CLabel>
                                                </div>
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 text-right")}>
                                                    <CLabel className={classes.summaryAmount}>{twoFixedAmt(this.state.taxAmount)}</CLabel>
                                                </div>
                                            </div>
                                            <div className="row mr-1 ml-1">
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 font-weight-bold")}>
                                                    <CLabel>Discount:</CLabel>
                                                </div>
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 text-right")}>
                                                    <CLabel className={classes.summaryAmount}>{twoFixedAmt(this.state.discountAmount)}</CLabel>
                                                </div>
                                            </div>
                                            <div className={clsx(classes.bgChange, classes.boxShadow, "row mr-1 ml-1 mb-1 rounded")}>
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 pl-2 font-weight-bold")}>
                                                    <CLabel>CHANGE:</CLabel>
                                                </div>
                                                <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 font-weight-bold rounded mb-1 pr-2 pt-1 text-right")}>
                                                    <CLabel className={classes.summaryAmount}>{twoFixedAmt(this.state.changeAmount)}</CLabel>
                                                </div>
                                            </div>

                                            <div className={clsx(classes.boxShadow, "row mr-1 ml-1 bg-success p-1 rounded")}>
                                                <div className="col-12 col-md-12 p-0">
                                                    <CLabel className={clsx(classes.txtShadow, "h4 font-weight-bold")}>Amount Due:</CLabel>
                                                </div>
                                                <div className="col-12 col-md-12 p-0 text-right">
                                                    <CLabel className={clsx(classes.summaryAmount, classes.txtShadow, "h4")}>{twoFixedAmt(this.state.amountDue)}</CLabel>
                                                </div>
                                            </div>
                                        </div>
                                    </CCol>
                                    <CCol md="7" className="pl-1">

                                        <CCard className="mb-1">
                                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                                                <span className="font-weight-bold">Items</span>
                                            </CCardHeader>
                                            <CCardBody className="p-1">
                                                <CRow>
                                                    <CCol md="5" className="font-weight-bold">
                                                        Item Name
                                                    </CCol>
                                                    <CCol md="3" className="font-weight-bold text-center px-0">
                                                        Price
                                                    </CCol>
                                                    <CCol md="1" className="font-weight-bold px-0">
                                                        Qty
                                                    </CCol>
                                                    <CCol md="1" className="font-weight-bold px-0">
                                                        D%
                                                    </CCol>
                                                    <CCol md="2" className="font-weight-bold text-center px-0">
                                                        Total
                                                    </CCol>
                                                </CRow>
                                                <CRow className={clsx(classes.overflow, "m-0 p-0")}>
                                                    {
                                                        [].concat(this.state.txnItems)
                                                            .map((itm, idx) => (
                                                                <TransactionItemRefunds
                                                                    key={itm.itemid}
                                                                    item={itm}
                                                                    index={idx}
                                                                    slcProdItm={this.selectProductItem}
                                                                />
                                                            ))
                                                    }
                                                </CRow>
                                            </CCardBody>
                                            <CCardFooter className={classes.cardBlueWhite}>
                                                Note: Items with ** are already refunded/cancelled.
                                            </CCardFooter>
                                        </CCard>

                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
        error: state.trans.error,
        loading: state.trans.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearTransactionList: () => dispatch(actions.clearTransactionList()),
        onGetAuthorizeUser: (token, authData, closeAuthModal) => dispatch(actions.getAuthorizeUser(token, authData, closeAuthModal)),
        onRefundTransaction: (token, refundData, cleanUp) => dispatch(actions.refundTransaction(token, refundData, cleanUp)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Refund))
