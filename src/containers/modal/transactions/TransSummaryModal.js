import React from 'react';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from 'src/store/actions/index';
import { connect } from 'react-redux';
import { twoFixedAmt } from 'src/store/utility'

import PatientInformation from 'src/containers/common/PatientInformation';


import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCard,
    CCardHeader,
    CCardBody,
    CRow, CCol
} from '@coreui/react';

const useStyles = makeStyles((theme) => ({
    itemScroll: {
        height: '200px',
        overflowY: 'scroll'
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const TransSummaryModal = (props) => {
    const classes = useStyles();

    const pInfo = (tran) => {
        if (tran !== undefined && tran.cashier !== undefined) {
            return (
                <div className="col-md-12">

                    <div className="row">
                        <div className="col-md-6 font-weight-bold">Total Discount:</div>
                        <div className="col-md-1">₱</div>
                        <div className="col-md-3 text-right">{twoFixedAmt(tran.totalItemDiscountAmount)}</div>
                    </div>

                    <div
                        style={tran.specialDiscountAmount === '0'
                            ? { display: 'flex' }
                            : { display: 'none' }
                        }
                        className="row">
                        <div className="col-md-6 font-weight-bold">Special Discount:</div>
                        <div className="col-md-1">₱</div>
                        <div className="col-md-3 text-right">{twoFixedAmt(tran.specialDiscountAmount)}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 font-weight-bold">VAT (12%):</div>
                        <div className="col-md-1">₱</div>
                        <div className="col-md-3 text-right">{twoFixedAmt(Math.abs(tran.totalItemTaxAmount))}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 font-weight-bold">Amount Due:</div>
                        <div className="col-md-1">₱</div>
                        <div className="col-md-3 text-right">{twoFixedAmt(tran.totalItemAmountDue)}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 font-weight-bold">Payment Amount:</div>
                        <div className="col-md-1">₱</div>
                        <div className="col-md-3 text-right">{twoFixedAmt(tran.totalPaymentAmount)}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 font-weight-bold">Change:</div>
                        <div className="col-md-1">₱</div>
                        <div className="col-md-3 text-right">{twoFixedAmt(tran.totalChangeAmount)}</div>
                    </div>
                </div>
            )
        }
    }

    const itemInfo = (item) => {
        if (item !== undefined) {


            const items = [];
            if (item.itemType === 'PCK') {
                item.itemDetails.packageItems.map((itm) => (
                    items.push(itm.itemDescription)
                ))
            }

            return (
                <div key={item.id} className="row border-bottom">
                    <div className="col-md-6">
                        <div className="font-weight-bold">
                            {item.itemType === 'PCK'
                                ? item.itemDetails.packageDescription
                                : item.itemDetails.itemDescription
                            }
                        </div>
                        <div>
                            <ul>
                                {items.map(list => (
                                    <li key={list}>{list}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-4 font-weight-bold">Quantity:</div>
                            <div>{item.quantity}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 font-weight-bold">Price:</div>
                            <div>{twoFixedAmt(item.itemPrice)}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const printRec = () => {
        props.onPrintReceipt(props.userToken, props.tranData.txnId)
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="xl"
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle className="font-weight-bold">Transaction Summary</CModalTitle>
            </CModalHeader>
            <CModalBody>

                <CRow>
                    <CCol md="7">
                        <PatientInformation
                            propData={props.tranData}
                        />
                    </CCol>

                    <CCol md="5" className="pl-1">
                        <CCard>
                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                <span className="font-weight-bold">Transaction Information</span>
                            </CCardHeader>

                            <CCardBody>
                                {pInfo(props.tranData)}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

                <CCard>
                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                        <span className="font-weight-bold">Transaction Items</span>
                    </CCardHeader>
                    <CCardBody>
                        <div className={clsx(classes.itemScroll, "col-md-12")}>
                            {props.tranData.transactionItems !== undefined
                                ? props.tranData.transactionItems.map((item) => {
                                    return itemInfo(item)
                                })
                                : null
                            }
                        </div>
                    </CCardBody>
                </CCard>

            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="secondary"
                    onClick={() => printRec()}
                >
                    <i className="mfe-2 fas fa-print" />
                    Print Receipt
                </CButton>

                <Link to={`/sales/${props.tranData.txnId}`} target="_blank">
                    <CButton
                        className="border border-dark"
                        color="success"
                        onClick={() => props.closeClick(null)}
                    >
                        Edit
                    </CButton>
                </Link>

                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPrintReceipt: (token, transactionId) => dispatch(actions.printReceipt(token, transactionId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransSummaryModal);