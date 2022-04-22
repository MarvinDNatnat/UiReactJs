import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from 'src/store/actions/index';

import { withStyles } from '@material-ui/core/styles';
// import ReactSelect from 'react-select';
import clsx from 'clsx';
import Swal from 'sweetalert2';
import MomentUtils from '@date-io/moment';
import ReactSelect from 'react-select';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { padLeadingZeros, patientDisplay, twoFixedAmt, displayDate } from 'src/store/utility'
import moment from 'moment';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CContainer,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

import EmailModal from 'src/containers/modal/common/EmailModal'

import {
    Box,
    Backdrop,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import SOPModal from 'src/containers/modal/sop/SOPModal';
import PaymentModal from 'src/containers/modal/sop/PaymentModal';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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
    selectStyles: {
        zIndex: 1000
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
});



const initState = {
    totalItems: 0,
    unbilled: [],
    sopListModal: [],
    allItems: false,
    forPaymentTotal: 0,
    forSOPTotal: 0,
    forCreateSOPTotal: 0,
    sopId: null,
    sopNumber: null,
    sopDate: new Date(),
    dateFrom: null,
    dateTo: null,
    sopChargeList: [],
    prepared: null,
    verified: null,
    noted: null,
    sopPaymentList: [],
    transactionListSelected: [],
    transactionListId: [],
    paymentId: null,
    paymentDate: new Date(),
    paymentAmount: 0,
    paymentType: null,
    paymentBank: null,
    accountNo: '',
    otherAmount: 0,
    taxWithHeld: 0,
    otherNotes: '',
    paidSOPList: [],
    totalPaid: 0,
    sopSummaryList: [],
    sopSummaryBalance: 0,
    paymentReceipt: null,
    paymentImageType: null,
    selectedFile: null,
    isFilePicked: false,
    transactionIds: [],
    sopSelectedPatient: [],
}


const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}

const paymentTypes = new Map([
    ['CA', 'CASH'],
    ['BNK', 'BANK DEPOSIT'],
    ['CHQ', 'CHEQUE'],
    ['VT', 'VIRTUAL']
])

export class SOP extends Component {
    state = {
        showSOPModal: false,
        totalSendOut: 0,
        showUpdateSOPModal: false,
        showPaymentModal: false,
        selectedReferenceLab: null,
        selectedOption: 'sendout',
        viewPanel: 0,
        sendOutList: [],
        sopList: [],
        selectedSendOutList: [],
        SOPTotalAmount: 0,
        paymentTypeList: [
            { value: 'CA', label: 'CASH' },
            { value: 'BNK', label: 'BANK DEPOSIT' },
            { value: 'CHQ', label: 'CHEQUE' },
            { value: 'VT', label: 'VIRTUAL' },
        ],
        selectedYear: null,
        ...initState,
        emailData: emailConfig,
        emailModal: false,
        emailtype: "",
        dateFromValue: moment(moment().subtract(7, 'd').format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
    }

    componentDidMount() {
        if (this.props.referenceLaboratoryList <= 0) {
            this.props.onShowReferenceLaboratory(this.props.userToken)
        }


        const currentYear = parseInt(moment().format('YYYY'));
        const years = [];
        const slcYr = {
            value: currentYear,
            label: currentYear,
        }
        for (let index = currentYear; index >= 2020; index--) {
            years.push({
                value: index,
                label: index,
            })
        }
        this.setState({
            ...this.state,
            yearList: years,
            selectedYear: slcYr,
        });
    }

    sendOutList = () => {
        this.props.onsopClear()
        this.props.onListSopClear()
        if (this.state.selectedOption === 'sendout') {
            this.props.onViewSOPUnbilledTransactions(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                this.state.selectedReferenceLab != null ? this.state.selectedReferenceLab.value : null,
                this.setSendOutList)
        }

        if (this.state.selectedOption === 'sop') {
            if (this.state.selectedReferenceLab !== null) {
                this.props.onListSOP(
                    this.props.userToken,
                    moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                    moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                    this.state.selectedReferenceLab.value,
                    this.setSOPPayments)
            }
        }

        if (this.state.selectedOption === 'payments') {
            if (this.state.selectedReferenceLab !== null) {
                this.props.onViewSOPPaymentList(
                    this.props.userToken,
                    this.state.selectedReferenceLab.value,
                    this.state.selectedYear.value,
                    this.setSOPPayments
                )
            }
        }

        if (this.state.selectedOption === 'transactions') {
            if (this.state.selectedReferenceLab !== null) {
                this.props.onViewSOPSummaryList(
                    this.props.userToken,
                    this.state.selectedReferenceLab.value,
                    this.state.selectedYear.value,
                    this.setSOPSummary
                )
            } else {
                Swal.fire({
                    title: 'Please select reference laboratory.',
                    icon: 'error',
                    text: 'No records to view.',
                })
            }
        }
    }

    setSOPSummary = () => {
        const list = [];
        let balance = 0;
        let currBal = 0;

        if (this.props.summaryList.length > 0) {
            this.props.summaryList.forEach(itm => {

                let text = itm.transaction;
                let amount = itm.amount + itm.otherAmount + itm.taxWithHeld;
                let other = '';


                switch (itm.type) {
                    case 1: // SOA
                        balance += (itm.amount + itm.otherAmount + itm.taxWithHeld);
                        currBal = amount;
                        break;
                    case 2: // PAYMENT
                        amount *= -1;
                        balance -= (itm.amount + itm.otherAmount + itm.taxWithHeld);
                        currBal = balance;
                        text += '(' + twoFixedAmt(itm.amount) + ')';
                        other = itm.otherNotes + '(' + twoFixedAmt(itm.otherAmount) + ')';
                        break;

                    default:
                        break;
                }

                const detail = {
                    date: displayDate(itm.date, 'YYYY-MM-DD'),
                    text: text,
                    other: other,
                    amount: amount,
                    type: itm.type,
                    balance: balance,
                    currBal: currBal,
                }

                list.push(detail);
            });
        }

        this.setState({
            ...this.state,
            sopSummaryList: list,
            sopSummaryBalance: currBal,
        });
    }

    getPaymentDisplay = (typ, bnk, acctNo) => {
        let type = '';

        if (paymentTypes.has(typ)) {
            type = paymentTypes.get(typ)
        }

        if (typ !== 'CA') {
            if (bnk !== null) {
                const bIndex = this.props.paymentBanks.findIndex(b => b.key === bnk);
                if (bIndex >= 0) {
                    const bank = this.props.paymentBanks[bIndex];
                    type += '-' + bank.value;
                }
            }

            if (acctNo !== null) {
                type += ', ' + acctNo;
            }
        }

        return type;
    }

    setSOPPayments = () => {
        const payList = [];
        let totalPayment = 0;
        let SOPTotalAmount = 0;
        if (this.props.sopPaymentList.length > 0) {
            this.props.sopPaymentList.forEach(itm => {
                const pay = {
                    id: itm.id,
                    paymentDate: displayDate(itm.paymentDate, 'YYYY-MM-DD'),
                    paymentAmount: itm.paymentAmount,
                    paymentBank: itm.paymentBank !== null ? itm.paymentBank : null,
                    paymentType: itm.paymentType,
                    accountNumber: itm.accountNumber !== null ? itm.accountNumber : '',
                    otherAmount: itm.otherAmount,
                    otherNotes: itm.otherNotes !== null ? itm.otherNotes : '',
                    taxWithHeld: itm.taxWithHeld,
                    paymentReceipt: itm.receipt !== null ? itm.receipt : null,
                    paymentImageType: itm.imageType !== null ? itm.imageType : null,
                    paymentDisplay: this.getPaymentDisplay(itm.paymentType, itm.paymentBank, itm.accountNumber),
                    preparedUser: itm.preparedUser,
                    verifiedUser: itm.verifiedUser,
                    sopList: itm.soaList,
                }


                totalPayment += (itm.paymentAmount + itm.otherAmount + itm.taxWithHeld);
                SOPTotalAmount += (itm.sopAmount)
                payList.push(pay);
            });
        }

        this.setState({
            ...this.state,
            paidSOPList: payList,
            totalPaid: totalPayment,
            SOPTotalAmount: SOPTotalAmount

        });
    }

    setSendOutList = () => {
        let total = 0
        const sendList = [];
        this.props.sendOutList.map(txn => {
            let transactionLabRequests = [];
            let subtotal = 0;
            txn.transactionLabRequests.map((item, j) => {

                if (!item.sopStatus) {

                    // XRay
                    if (item.xray != null) {
                        if (item.xray.radiologist.doctorid === this.state.selectedReferenceLab.value) {
                            transactionLabRequests.push(item);
                        }
                    }

                    //Ultrasound
                    if (item.ultrasound != null) {
                        if (item.ultrasound.radiologist.doctorid === this.state.selectedReferenceLab.value) {
                            transactionLabRequests.push(item);
                        }
                    }

                    console.log(item);


                    //CHEMISTRY
                    if (item.chemistry.bilirubin != null) {
                        if (item.chemistry.bilirubin.referenceLab != null) {
                            item.chemistry.bilirubin.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.bilirubin.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.bun != null) {
                        if (item.chemistry.bun.referenceLab != null) {
                            item.chemistry.bun.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.bun.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.cpk != null) {
                        if (item.chemistry.cpk.referenceLab != null) {
                            item.chemistry.cpk.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.cpk.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.creatinine != null) {
                        if (item.chemistry.creatinine.referenceLab != null) {
                            item.chemistry.creatinine.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.creatinine.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.electrolytes != null) {
                        if (item.chemistry.electrolytes.referenceLab != null) {
                            item.chemistry.electrolytes.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.electrolytes.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.enzymes != null) {
                        if (item.chemistry.enzymes.referenceLab != null) {
                            item.chemistry.enzymes.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.enzymes.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.fbs != null) {
                        if (item.chemistry.fbs.referenceLab != null) {
                            item.chemistry.fbs.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.fbs.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.hemoglobin != null) {
                        if (item.chemistry.hemoglobin.referenceLab != null) {
                            item.chemistry.hemoglobin.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.hemoglobin.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.lipidProfile != null) {
                        if (item.chemistry.lipidProfile.referenceLab != null) {
                            item.chemistry.lipidProfile.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.lipidProfile.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.ogct != null) {
                        if (item.chemistry.ogct.referenceLab != null) {
                            item.chemistry.ogct.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.ogct.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.ogtt != null) {
                        if (item.chemistry.ogtt.referenceLab != null) {
                            item.chemistry.ogtt.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.ogtt.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.pprbs != null) {
                        if (item.chemistry.pprbs.referenceLab != null) {
                            item.chemistry.pprbs.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.pprbs.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.protein != null) {
                        if (item.chemistry.protein.referenceLab != null) {
                            item.chemistry.protein.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.protein.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.rbs != null) {
                        if (item.chemistry.rbs.referenceLab != null) {
                            item.chemistry.rbs.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.rbs.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.chemistry.uricAcid != null) {
                        if (item.chemistry.uricAcid.referenceLab != null) {
                            item.chemistry.uricAcid.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.chemistry.uricAcid.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    //TOXICOLOGY
                    // if (item.toxicology != null) {
                    //     if (item.toxicology != null) {
                    //         item.hematology.aptt.referenceLab.collectionItems.map((refItem, k) => {
                    //             if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                    //                 subtotal += refItem.molePrice;
                    //                 if (this.state.selectedReferenceLab == null) {
                    //                     transactionLabRequests.push(item);
                    //                 } else {
                    //                     if (item.toxicology.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                    //                         transactionLabRequests.push(item);
                    //                     }
                    //                 }
                    //             }
                    //             return null
                    //         })
                    //     }
                    // }

                    //HEMATOLOGY
                    if (item.hematology.aptt != null) {
                        if (item.hematology.aptt.referenceLab != null) {
                            item.hematology.aptt.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.hematology.aptt.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.hematology.bloodTyping != null) {
                        if (item.hematology.bloodTyping.referenceLab != null) {
                            item.hematology.bloodTyping.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.hematology.bloodTyping.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.hematology.cbc != null) {
                        if (item.hematology.cbc.referenceLab != null) {
                            item.hematology.cbc.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.hematology.cbc.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.hematology.ctbt != null) {
                        if (item.hematology.ctbt.referenceLab != null) {
                            item.hematology.ctbt.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.hematology.ctbt.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.hematology.esr != null) {
                        if (item.hematology.esr.referenceLab != null) {
                            item.hematology.esr.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.hematology.esr.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.hematology.prms != null) {
                        if (item.hematology.prms.referenceLab != null) {
                            item.hematology.prms.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.hematology.prms.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.hematology.prothombinTime != null) {
                        if (item.hematology.prothombinTime.referenceLab != null) {
                            item.hematology.prothombinTime.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.hematology.prothombinTime.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    //CLINICAL MICROSCOPY
                    if (item.clinicalMicroscopy.afb != null) {
                        if (item.clinicalMicroscopy.afb.referenceLab != null) {
                            item.clinicalMicroscopy.afb.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.clinicalMicroscopy.afb.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.clinicalMicroscopy.fecalysis != null) {
                        if (item.clinicalMicroscopy.fecalysis.referenceLab != null) {
                            item.clinicalMicroscopy.fecalysis.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.clinicalMicroscopy.fecalysis.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.clinicalMicroscopy.ptobt != null) {
                        if (item.clinicalMicroscopy.ptobt.referenceLab != null) {
                            item.clinicalMicroscopy.ptobt.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.clinicalMicroscopy.ptobt.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.clinicalMicroscopy.urineChemical != null) {
                        if (item.clinicalMicroscopy.urineChemical.referenceLab != null) {
                            item.clinicalMicroscopy.urineChemical.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.clinicalMicroscopy.urineChemical.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    //SEROLOGY
                    if (item.serology.serology != null) {
                        if (item.serology.serology.referenceLab != null) {
                            item.serology.serology.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.serology.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.antigen != null) {
                        if (item.serology.antigen.referenceLab != null) {
                            item.serology.antigen.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.antigen.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.covid != null) {
                        if (item.serology.covid.referenceLab != null) {
                            item.serology.covid.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.covid.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.crp != null) {
                        if (item.serology.crp.referenceLab != null) {
                            item.serology.crp.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.crp.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.hiv != null) {
                        if (item.serology.hiv.referenceLab != null) {
                            item.serology.hiv.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.hiv.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.rtAntigen != null) {
                        if (item.serology.rtAntigen.referenceLab != null) {
                            item.serology.rtAntigen.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.rtAntigen.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.rtpcr != null) {
                        if (item.serology.rtpcr.referenceLab != null) {
                            item.serology.rtpcr.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.rtpcr.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.thyroid != null) {
                        if (item.serology.thyroid.referenceLab != null) {
                            item.serology.thyroid.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.thyroid.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }

                    if (item.serology.typhidot != null) {
                        if (item.serology.typhidot.referenceLab != null) {
                            item.serology.typhidot.referenceLab.collectionItems.map((refItem, k) => {
                                if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                    subtotal += refItem.molePrice;
                                    if (this.state.selectedReferenceLab == null) {
                                        transactionLabRequests.push(item);
                                    } else {
                                        if (item.serology.typhidot.referenceLab.referenceid === this.state.selectedReferenceLab.value) {
                                            transactionLabRequests.push(item);
                                        }
                                    }
                                }
                                return null
                            })
                        }
                    }
                }

                return null
            })

            const trans = {
                id: txn.id,
                patient: txn.patient,
                receipt: padLeadingZeros(txn.id),
                fullname: patientDisplay(txn.patient),
                transactionDate: moment(txn.transactionDate).format('YYYY-MM-DD hh:mm a'),
                transactionLabRequests: transactionLabRequests,
                isSelected: false,
                subtotal: subtotal

            }
            sendList.push(trans)
            total += subtotal;
            return null
        })



        this.setState({
            ...this.state,
            totalSendOut: total,
            sendOutList: sendList,
        });
    }

    handleCheckBoxAllItems = (event) => {
        const value = event.target.checked;
        const uList = [].concat(this.state.sendOutList);
        let totalSOP = 0;
        uList.forEach(item => {
            item.isSelected = value;
            if (value) {
                totalSOP += item.subtotal;
            }
        });

        this.setState({
            ...this.state,
            sendOutList: uList,
            allItems: value,
            forCreateSOPTotal: totalSOP,
        });
    }

    handleCheckBox = (id) => (event) => {
        if (this.state.selectedOption === 'sendout') {
            const sList = [].concat(this.state.sendOutList);
            const itmIndex = sList.findIndex(itm => itm.id === id);
            if (itmIndex >= 0) {
                const item = sList[itmIndex];
                item.isSelected = event.target.checked;
                sList[itmIndex] = item;
            }

            let totalSOP = 0;
            sList.forEach(item => {
                if (item.isSelected) {
                    totalSOP += item.subtotal;
                } else {
                }
            });

            this.setState({
                ...this.state,
                sendOutList: sList,
                forCreateSOPTotal: totalSOP,
            });
        } else if (this.state.selectedOption === 'sop') {
            const sopList = [].concat(this.props.sopList);
            const itmIndex = sopList.findIndex(itm => itm.id === id);
            if (itmIndex >= 0) {
                const item = sopList[itmIndex];
                item.isSelected = event.target.checked;
                sopList[itmIndex] = item;
            }

            let totalPayment = 0;
            sopList.forEach(item => {
                if (item.isSelected) {
                    totalPayment += item.sopAmount;
                }
            });
            this.setState({
                ...this.state,
                sopList: sopList,
                forPaymentTotal: totalPayment,
            });
        }

    }

    handleSelectChange = (prop) => (event) => {

        if (prop === 'paymentType') {
            this.setState({
                ...this.state,
                [prop]: event,
                paymentBank: null,
            });
        } else if (prop === 'paymentBank') {
            this.setState({
                ...this.state,
                [prop]: event,
            });
        } else {
            this.props.onsopClear();
            this.setState({
                ...this.state,
                ...initState,
                [prop]: event,
                sendOutList: []
            });
        }
    }

    createSOP = () => {
        if (this.state.selectedReferenceLab === null) {
            Swal.fire({
                title: 'Please select charge to account.',
                icon: 'error',
                text: 'No SOP to create.',
            });
            return;
        }


        if (this.state.selectedReferenceLab.sopCode === null || this.state.selectedReferenceLab.sopCode === '') {
            Swal.fire({
                title: 'Please update SOP Code of Charge from Medical Records.',
                icon: 'error',
                text: 'No SOP to create, SOP Code is required.',
            });
            return;
        }

        let hasSelected = false;
        const sList = [].concat(this.state.sendOutList);
        const uSOPList = [];
        let dateFrom = null;
        let dateTo = null;
        sList.forEach(item => {
            if (item.isSelected) {
                hasSelected = true;
                uSOPList.push(item);
                if (dateFrom === null) {
                    dateFrom = item.transactionDate;
                }
                dateTo = item.transactionDate;
            }
        });

        if (!hasSelected) {
            Swal.fire({
                title: 'Please select transactions to charge.',
                icon: 'error',
                text: 'No SOP to create.',
            });
            return;
        }

        this.setState({
            ...this.state,
            selectedSendOutList: uSOPList,
            dateFrom: dateFrom,
            dateTo: dateTo,
            sopDate: new Date(),
            showSOPModal: true
        });
    }

    closeSOPModal = (data) => {
        this.setState({
            ...this.state,
            showSOPModal: false,
            emailModal: false
        });
    }
    saveSOP = () => {
        let totalSop = 0;
        Swal.fire({
            title: 'Create SOP',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                const txns = [];

                this.state.selectedSendOutList.forEach(itm => {
                    itm.transactionLabRequests.map(price => {
                        return totalSop += price.molePriceItem;
                    });
                    txns.push(itm.id);
                });
                const sopData = {
                    referenceid: this.state.selectedReferenceLab.value,
                    coveredDateFrom: moment(this.state.dateFrom).format('YYYYMMDD'),
                    coveredDateTo: moment(this.state.dateTo).format('YYYYMMDD'),
                    statementDate: moment(this.state.sopDate).format('YYYYMMDD'),
                    sopAmount: totalSop,
                    transactions: txns,
                }

                this.props.onSaveUpdateSOP(this.props.userToken, sopData, this.closeSOPModal);
            }
        })
    }

    getSOPStatus = (sop) => {
        let status = 'PREPARED';
        let totalSop = 0;
        // let paid = 0;
        let totalPerSopPay = 0
        if (sop.transactions !== undefined) {
            sop.transactions.map(txn => {
                if (txn.sopStatus) {
                    totalPerSopPay += txn.totalItemAmountDue
                }
                return null;
            })
        }
        if (sop.payment !== undefined && sop.payment !== null) {
            this.state.paidSOPList.map(pay => {
                if (pay.sopList[0].sopNumber === sop.soaNumber) {
                    totalSop = sop.sopAmount - totalPerSopPay
                }
                return null;
            })
            if (totalSop === 0) {
                status = 'PAID';
            } else {
                status = "PAID(" + totalPerSopPay + ")";
            }
        } else if (sop.notedUser !== undefined && sop.notedUser !== null) {
            status = 'NOTED';
        } else if (sop.verifiedUser !== undefined && sop.verifiedUser !== null) {
            status = 'VERIFIED';
        }

        return status;
    }

    handleOptionChange = (event) => {
        let panel = 0;
        this.props.onsopClear()
        this.props.onListSopClear()
        switch (event.target.value) {
            case 'sendout':
                panel = 0;
                break;

            case 'sop':
                panel = 1;
                break;

            case 'payments':
                panel = 2;
                break;

            case 'transactions':
                panel = 3;
                break;

            default:
                break;
        }

        this.setState({
            ...this.state,
            ...initState,
            viewPanel: panel,
            selectedOption: event.target.value,
        })
    }

    getTransactionDetails = (txn) => {
        const subTotalList = [];
        const itemList = [];
        txn.transactionLabRequests.forEach(itm => {
            let description = "";
            if (itm.itemDetails.packageDescription !== undefined && itm.itemDetails.packageDescription !== null) {
                description = itm.itemDetails.packageDescription;
            } else if (itm.itemDetails.itemDescription !== undefined && itm.itemDetails.itemDescription !== null) {
                description = itm.itemDetails.itemDescription;
            }
            subTotalList.push(
                <CRow key={itm.id} className="m-0 p-0">
                    <CCol md="7" className="m-0 p-0">
                        {description}
                    </CCol>
                    <CCol md="5" className="m-0 p-0 text-right">
                        {twoFixedAmt(itm.molePriceItem)}
                    </CCol>
                </CRow>
            )
            itemList.push({
                description: description,
                amountDue: itm.molePriceItem,
            })
        });

        return {
            subTotal: subTotalList,
            itemList: itemList,
        }
    }

    viewSOPDetails = (sopId) => {
        const sopIndex = this.props.sopList.findIndex(s => s.id === sopId);
        if (sopIndex >= 0) {
            const sop = this.props.sopList[sopIndex];
            const sopList = [];
            sop.transactions.forEach(txn => {
                let subTotal = 0;
                txn.transactionLabRequests.map(request => {
                    return subTotal += request.molePriceItem
                });
                const item = {
                    id: txn.id,
                    dateTime: moment(txn.transactionDate).format('YYYY-MM-DD'),
                    receipt: padLeadingZeros(txn.id),
                    fullname: patientDisplay(txn.patient),
                    subtotal: subTotal,
                    transactionId: txn.transactionid,
                    sopStatusPaid: txn.sopStatus,
                    transactionDate: moment(txn.transactionDate).format('YYYY-MM-DD hh:mm a'),
                    transactionLabRequests: txn.transactionLabRequests,
                }

                sopList.push(item);
            });

            this.setState({
                ...this.state,
                selectedSendOutList: sopList,
                showSOPModal: true,
                sopId: sopId,
                forSOPTotal: sop.sopAmount,
                sopNumber: sop.sopNumber,
                sopDate: moment(sop.statementDate),
                prepared: sop.preparedUser,
                verified: sop.verifiedUser,
                noted: sop.notedUser,

            })
        }
    }

    paySOP = () => {
        this.props.onGetPaymentBanks(this.props.userToken);
        if (this.state.selectedReferenceLab === null) {
            Swal.fire({
                title: 'Please select Reference Laboratory to account.',
                icon: 'error',
                text: 'No SOP to pay.',
            });
            return;
        }

        if (this.state.selectedReferenceLab != null || this.state.selectedReferenceLab !== undefined) {
            // if (this.state.selectedReferenceLab.sopCode === null || this.state.selectedChargeTo.sopCode === '') {
            //     Swal.fire({
            //         title: 'Please update SOP Code of Charge from Medical Records.',
            //         icon: 'error',
            //         text: 'No SOP to create, SOP Code is required.',
            //     });
            //     return;
            // }
        }

        let hasSelected = false;
        const sopList = [].concat(this.state.sopList);
        let totalPayment = 0;
        const paySOPList = [];
        sopList.forEach(item => {
            if (item.isSelected) {
                hasSelected = true;
                paySOPList.push(item);
                totalPayment += item.sopAmount;
            }
        });

        if (!hasSelected) {
            Swal.fire({
                title: 'Please select SOP to pay.',
                icon: 'error',
                text: 'No Payment to create.',
            });
            return;
        }

        this.setState({
            ...this.state,
            paymentId: null,
            showPaymentModal: true,
            sopPaymentList: paySOPList,
            paymentDate: new Date(),
            paymentAmount: 0,
            paymentType: { value: 'CA', label: 'CASH' },
            paymentBank: null,
            accountNo: '',
            otherAmount: 0,
            otherNotes: '',
            taxWithHeld: 0,
            prepared: null,
            verified: null,
            paymentReceipt: null,
            paymentImageType: null,
            selectedFile: null,
            isFilePicked: false,
            forPaymentTotal: totalPayment,
        });
    }

    closePaymentModal = (data) => {
        this.setState({
            ...this.state,
            showPaymentModal: false,
        });
    }

    SOPPayment = () => {
        Swal.fire({
            title: 'SOP Payment',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                const paymentTotal = parseFloat(this.state.paymentAmount) + parseFloat(this.state.otherAmount) + parseFloat(this.state.taxWithHeld);
                if (paymentTotal < this.state.forPaymentTotal) {
                    Swal.fire({
                        title: 'Inadequate payment amount.',
                        icon: 'error',
                        text: 'No Payment created.',
                    });
                    return;
                }

                if (this.state.paymentType === null) {
                    Swal.fire({
                        title: 'Please select payment type.',
                        icon: 'error',
                        text: 'No Payment created.',
                    });
                    return;
                }

                if (this.state.paymentType !== null && this.state.paymentType.value !== 'CA') {
                    if (this.state.paymentBank === null) {
                        Swal.fire({
                            title: 'Please select payment bank.',
                            icon: 'error',
                            text: 'No Payment created.',
                        });
                        return;
                    }
                    if (this.state.accountNo === '') {
                        Swal.fire({
                            title: 'Please input account/check number.',
                            icon: 'error',
                            text: 'No Payment created.',
                        });
                        return;
                    }
                }

                if (parseFloat(this.state.otherAmount) > 0 && this.state.otherNotes.trim() === '') {
                    Swal.fire({
                        title: 'Please input other payment.',
                        icon: 'error',
                        text: 'No Payment created.',
                    });
                    return;
                }

                const sops = [];
                this.state.sopPaymentList.forEach(itm => {
                    sops.push(itm.id);
                });

                const payData = {
                    referenceId: this.state.selectedReferenceLab.value,
                    paymentDate: moment(this.state.paymentDate).format('YYYYMMDD'),
                    paymentAmount: parseFloat(this.state.paymentAmount),
                    paymentType: this.state.paymentType.value,
                    paymentBank: this.state.paymentBank !== null ? this.state.paymentBank.value : null,
                    accountNumber: this.state.accountNo !== '' ? this.state.accountNo : null,
                    otherAmount: parseFloat(this.state.otherAmount),
                    otherNotes: this.state.otherNotes !== '' ? this.state.otherNotes : null,
                    taxWithHeld: parseFloat(this.state.taxWithHeld),
                    sopList: sops,
                    transactionIds: this.state.transactionIds
                }

                this.props.onSaveUpdateSOPPayment(this.props.userToken, payData, this.closePaymentModal);
            }
        });
    }

    handleInputChange = (prop) => (event) => {
        this.setState({
            ...this.state,
            [prop]: event.target.value,
        });
    };

    viewPaymentDetails = (payId) => {
        const payIndex = this.state.paidSOPList.findIndex(p => p.id === payId);
        if (payIndex >= 0) {
            const pay = this.state.paidSOPList[payIndex];

            let label = null;
            if (paymentTypes.has(pay.paymentType)) {
                label = paymentTypes.get(pay.paymentType);
            }

            let bank = null;
            const bIndex = this.props.paymentBanks.findIndex(b => b.key === pay.paymentBank);
            if (bIndex >= 0) {
                const b = this.props.paymentBanks[bIndex];
                bank = { value: b.key, label: b.value }
            }

            let totalPayment = 0;
            const paySOPList = [];
            pay.sopList.forEach(itm => {
                const sop = {
                    id: itm.id,
                    sopNumber: itm.sopNumber,
                    coverageDateFrom: displayDate(itm.coverageDateFrom, 'YYYY-MM-DD'),
                    coverageDateTo: displayDate(itm.coverageDateTo, 'YYYY-MM-DD'),
                    statementDate: displayDate(itm.statementDate, 'YYYY-MM-DD'),
                    sopAmount: itm.sopAmount,
                    transactions: itm.transactions,
                }

                totalPayment += itm.sopAmount;
                paySOPList.push(sop);
            });

            this.setState({
                ...this.state,
                paymentId: payId,
                showPaymentModal: true,
                sopPaymentList: paySOPList,
                paymentDate: moment(pay.paymentDate),
                paymentAmount: pay.paymentAmount,
                paymentType: label !== null ? { value: pay.paymentType, label: label } : { value: 'CA', label: 'CASH' },
                paymentBank: bank,
                accountNo: pay.accountNumber !== null ? pay.accountNumber : '',
                otherAmount: pay.otherAmount,
                otherNotes: pay.otherNotes !== null ? pay.otherNotes : '',
                taxWithHeld: pay.taxWithHeld,
                paymentReceipt: pay.paymentReceipt !== null ? pay.paymentReceipt : null,
                paymentImageType: pay.paymentImageType !== null ? pay.paymentImageType : null,
                prepared: pay.preparedUser,
                verified: pay.verifiedUser,
                forPaymentTotal: totalPayment,
            });
        }
    }

    handleDateChange = (prop) => (date) => {
        this.setState({
            ...this.state,
            [prop]: date,
        });
    };

    printSOP = () => {
        this.props.onPrintChargeToSOA(
            this.props.userToken,
            this.state.selectedReferenceLab.value,
            this.state.sopId,
            true, // with header and footer
        );
    }

    notedSOP = () => {
        Swal.fire({
            title: 'Noted SOA',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.sopId !== null) {
                    this.props.onNotedSOP(
                        this.props.userToken,
                        this.state.selectedReferenceLab.value,
                        this.state.sopId,
                        this.closeSOPModal
                    );
                }
            }
        });
    }

    verifySOP = () => {
        Swal.fire({
            title: 'Verify SOA',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.sopId !== null) {
                    this.props.onVerifySOP(
                        this.props.userToken,
                        this.state.selectedReferenceLab.value,
                        this.state.sopId,
                        this.closeSOPModal
                    );
                }
            }
        });
    }

    generateExcelSop = () => {
        Swal.fire({
            title: 'Verify SOA',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.sopId !== null) {
                    this.props.onGetReferenceToSOPExcel(
                        this.props.userToken,
                        this.state.selectedReferenceLab.value,
                        this.state.sopId,
                        this.closeSOPModal
                    );
                }
            }
        });
    }

    verifySOPPaymentHandle = () => {
        Swal.fire({
            title: 'Verify SOA',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.paymentId !== null) {
                    this.props.onVerifySOPPayment(
                        this.props.userToken,
                        this.state.selectedReferenceLab.value,
                        this.state.paymentId,
                        this.closePaymentModal
                    );
                }
            }
        });
    }

    printSOP = () => {
        this.props.onPrintReferenceToSOP(
            this.props.userToken,
            this.state.selectedReferenceLab.value,
            this.state.sopId,
            true, // with header and footer
        );
    }

    uploadPayment = () => {
        if (this.state.selectedFile !== null) {
            if (this.state.paymentId !== null) {
                this.props.onUploadPaymentImage(
                    this.props.userToken,
                    this.state.selectedReferenceLab.value,
                    this.state.paymentId,
                    this.state.selectedFile,
                    this.closePaymentModal
                );
            };
        } else {
            Swal.fire({
                title: 'Payment Image',
                text: "Are you sure to remove payment image?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onUploadPaymentImage(
                        this.props.userToken,
                        this.state.selectedReferenceLab.value,
                        this.state.paymentId,
                        null,
                        this.closePaymentModal
                    );
                }
            })
        }
    }

    handleFileChange = (event) => {
        this.setState({
            ...this.state,
            selectedFile: event.target.files[0],
            isFilePicked: true,
        });
    }

    sendSOP = () => {
        this.setState({
            ...this.state,
            showSOPModal: false,
            emailModal: true,
            emailtype: "sop",
            emailData: {
                emailContent: {
                    sendTo: this.state.selectedReferenceLab.sopEmail,
                    sendCc: '',
                    emailSubject: this.state.sopNumber,
                    emailBody:
                        `Hi Team,\nGood Day!\n\nHere is the billing of \n` + this.state.sopNumber + `\n\nPlease see attached file.\n\nPlease let me know if you need any further Explanations, Clarifications, Questions or Assistants\ndo not hesitate to contact us.\n\nThank you & Keep safe!\n\n--\nPedrito B. Basbas\nFinance Officer\n09150083520\nQUESTDIAGNOSTICS, INC.`
                }
            }
        });
    }

    onSendEmailSop = (emailValues) => {
        Swal.fire({
            title: 'Statement of Account',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendChargeToSOP(
                    this.props.userToken,
                    emailValues,
                    this.state.selectedReferenceLab.value,
                    this.state.sopId,
                    this.closeSOPModal
                );
            }
        })
    }

    render() {
        const dateDisplayFormat = 'MMM-DD-YYYY hh:mm a'
        const { classes } = this.props;
        const dateChangeHandler = (prop) => (event) => {
            this.setState({
                ...this.state,
                [prop]: event
            })
        }
        return (
            <CContainer>
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.sopListLoading || this.props.unbilledListLoading || this.props.emailLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>


                <EmailModal
                    emailModal={this.state.emailModal}
                    emailtype={this.state.emailtype}
                    emailData={this.state.emailData}
                    closeClick={this.closeSOPModal}
                    onSendEmailSop={this.onSendEmailSop}
                />

                <SOPModal
                    showSOPModal={this.state.showSOPModal}
                    selectedSendOutList={this.state.selectedSendOutList}
                    closeClick={this.closeSOPModal}
                    saveSOP={this.saveSOP}
                    totalSendOut={this.state.totalSendOut}
                    referenceLab={this.state.selectedReferenceLab}
                    sopDate={this.state.sopDate}
                    dateFrom={this.state.dateFrom}
                    dateTo={this.state.dateTo}
                    handleDateChange={this.handleDateChange}
                    sopOption={this.state.selectedOption}
                    prepared={this.state.prepared}
                    verified={this.state.verified}
                    noted={this.state.noted}
                    totalSop={this.state.forSOPTotal}
                    sopNumber={this.state.sopNumber}
                    printSOP={this.printSOP}
                    verifySOP={this.verifySOP}
                    notedSOP={this.notedSOP}
                    generateExcelSop={this.generateExcelSop}
                    sendSOP={this.sendSOP}

                />

                <PaymentModal
                    closeClick={this.closePaymentModal}
                    typeList={this.state.paymentTypeList}
                    showModal={this.state.showPaymentModal}
                    paymentBanks={this.props.paymentBanks}
                    paymentType={this.state.paymentType}
                    sopPaymentList={this.state.sopPaymentList}
                    referenceLab={this.state.selectedReferenceLab}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    paymentAmount={this.state.paymentAmount}
                    accountNo={this.state.accountNo}
                    taxWithHeld={this.state.taxWithHeld}
                    otherAmount={this.state.otherAmount}
                    otherNotes={this.state.otherNotes}
                    SOPPayment={this.SOPPayment}
                    sopOption={this.state.selectedOption}
                    verifySOPPayment={this.verifySOPPaymentHandle}
                    handleDateChange={this.handleDateChange}
                    prepared={this.state.prepared}
                    verified={this.state.verified}
                    uploadPayment={this.uploadPayment}
                    paymentReceipt={this.state.paymentReceipt}
                    fileChangeHandler={this.handleFileChange}
                    selectedFile={this.state.selectedFile}
                    isFilePicked={this.state.isFilePicked}
                />

                <CRow >
                    <CCol className="p-0">
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <h3 className="mfe-2">Statement Of Payable</h3>
                                </CRow>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="m-0 p-0">
                                    {this.state.selectedOption === 'sendout'  || this.state.selectedOption === 'sop' ?
                                        <><CCol md="3" className="p-1">
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
                                            </CCol> </> : null}

                                    <CCol md="3" className="col-12 m-0 p-1">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <ReactSelect
                                                className={clsx(classes.selectStyles, "basic-single")}
                                                placeholder="All or Select Reference Lab"
                                                onChange={this.handleSelectChange('selectedReferenceLab')}
                                                isClearable={true}
                                                isSearchable={true}
                                                options={
                                                    [].concat(this.props.referenceLaboratoryList)
                                                        .sort((a, b) => a.name > b.name ? 1 : -1)
                                                        .map((ref) => {
                                                            return {
                                                                value: ref.referenceid,
                                                                label: ref.name,
                                                                sopCode: ref.sopCode,
                                                                companyAddress: ref.address,
                                                                contactPerson: ref.contactPerson,
                                                                contactNumber: ref.contactNumber,
                                                                sopEmail: ref.sopEmail,
                                                                // chargeType: ref.chargeType,
                                                            }
                                                        })
                                                }
                                            />
                                        </FormControl>
                                    </CCol>
                                    <CCol md="3" className="p-1">
                                        <CButton
                                            className="border border-dark"
                                            color="success"
                                            onClick={this.sendOutList}
                                        >
                                            <i className="mfe-2 fas fa-list" />
                                            View
                                        </CButton>
                                    </CCol>
                                </CRow>

                                <CRow className="m-0 p-0 mt-2">
                                    <div className="col-8 m-0 p-0 btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'sendout' ? "active" : "")}>
                                            <input type="radio" value="sendout"
                                                checked={this.state.selectedOption === 'sendout'}
                                                onChange={this.handleOptionChange}
                                            />
                                            Send Outs
                                        </label>
                                        <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'sop' ? "active" : "")}>
                                            <input type="radio" value="sop"
                                                checked={this.state.selectedOption === 'sop'}
                                                onChange={this.handleOptionChange}
                                            />
                                            SOP
                                        </label>
                                        <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'payments' ? "active" : "")}>
                                            <input type="radio" value="payments"
                                                checked={this.state.selectedOption === 'payments'}
                                                onChange={this.handleOptionChange}
                                            />
                                            Payments
                                        </label>
                                        <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'transactions' ? "active" : "")}>
                                            <input type="radio" value="transactions"
                                                checked={this.state.selectedOption === 'transactions'}
                                                onChange={this.handleOptionChange}
                                            />
                                            Transactions
                                        </label>
                                    </div>
                                </CRow>

                                <CRow className="m-0 p-0">
                                    <CCol md="12" className="m-0 p-0">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={0}>
                                            <CRow className="m-0 p-0">
                                                <CCol md="12" className="m-1 p-0">
                                                    <CButton
                                                        className="border border-dark"
                                                        color="success"
                                                        onClick={this.createSOP}
                                                    >
                                                        <i className="mfe-2 fas fa-list" />
                                                        Create SOP
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        // checked={this.state.allItems}
                                                                        onChange={this.handleCheckBoxAllItems}
                                                                        color="primary"
                                                                        className="p-0"
                                                                    />
                                                                }
                                                                className="m-0"
                                                            />
                                                        </th>
                                                        <th scope="col">Date/Time</th>
                                                        <th scope="col">Receipt #</th>
                                                        <th scope="col">Full Name</th>
                                                        {/* <th scope="col">Aging</th> */}
                                                        <th scope="col">Procedure</th>
                                                        <th scope="col">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.sendOutList.map((txn) => {
                                                        let subtotal = 0;
                                                        return <tr key={txn.id}>

                                                            <td>
                                                                {this.state.selectedReferenceLab === null ? null : <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={txn.isSelected}
                                                                            onChange={this.handleCheckBox(txn.id)}
                                                                            color="primary"
                                                                            className="p-0"
                                                                        />
                                                                    }
                                                                    className="m-0"
                                                                />}
                                                            </td>
                                                            <td>{txn.transactionDate}</td>
                                                            <td>{txn.receipt}</td>
                                                            <td>{patientDisplay(txn.patient)}</td>
                                                            <td>
                                                                {
                                                                    txn.transactionLabRequests.map((item, j) => {
                                                                       
                                                                        let items = [];

                                                                        //Xray
                                                                        if (item.xray != null) {
                                                                            if (item.xray.referenceLab != null) {
                                                                                item.xray.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += item.molePriceItem;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                         //Xray
                                                                         if (item.ultrasound != null) {
                                                                            if (item.ultrasound.referenceLab != null) {
                                                                                item.ultrasound.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += item.molePriceItem;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        //CHEMISTRY
                                                                        if (item.chemistry.bilirubin != null) {
                                                                            if (item.chemistry.bilirubin.referenceLab != null) {
                                                                                item.chemistry.bilirubin.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.bun != null) {
                                                                            if (item.chemistry.bun.referenceLab != null) {
                                                                                item.chemistry.bun.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.cpk != null) {
                                                                            if (item.chemistry.cpk.referenceLab != null) {
                                                                                item.chemistry.cpk.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.creatinine != null) {
                                                                            if (item.chemistry.creatinine.referenceLab != null) {
                                                                                item.chemistry.creatinine.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.electrolytes != null) {
                                                                            if (item.chemistry.electrolytes.referenceLab != null) {
                                                                                item.chemistry.electrolytes.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.enzymes != null) {
                                                                            if (item.chemistry.enzymes.referenceLab != null) {
                                                                                item.chemistry.enzymes.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.fbs != null) {
                                                                            if (item.chemistry.fbs.referenceLab != null) {
                                                                                item.chemistry.fbs.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.hemoglobin != null) {
                                                                            if (item.chemistry.hemoglobin.referenceLab != null) {
                                                                                item.chemistry.hemoglobin.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.lipidProfile != null) {
                                                                            if (item.chemistry.lipidProfile.referenceLab != null) {
                                                                                item.chemistry.lipidProfile.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.ogct != null) {
                                                                            if (item.chemistry.ogct.referenceLab != null) {
                                                                                item.chemistry.ogct.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.ogtt != null) {
                                                                            if (item.chemistry.ogtt.referenceLab != null) {
                                                                                item.chemistry.ogtt.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.pprbs != null) {
                                                                            if (item.chemistry.pprbs.referenceLab != null) {
                                                                                item.chemistry.pprbs.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.protein != null) {
                                                                            if (item.chemistry.protein.referenceLab != null) {
                                                                                item.chemistry.protein.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.rbs != null) {
                                                                            if (item.chemistry.rbs.referenceLab != null) {
                                                                                item.chemistry.rbs.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.chemistry.uricAcid != null) {
                                                                            if (item.chemistry.uricAcid.referenceLab != null) {
                                                                                item.chemistry.uricAcid.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        //HEMATOLOGY
                                                                        if (item.hematology.aptt != null) {
                                                                            if (item.hematology.aptt.referenceLab != null) {
                                                                                item.hematology.aptt.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.hematology.bloodTyping != null) {
                                                                            if (item.hematology.bloodTyping.referenceLab != null) {
                                                                                item.hematology.bloodTyping.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.hematology.cbc != null) {
                                                                            if (item.hematology.cbc.referenceLab != null) {
                                                                                item.hematology.cbc.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.hematology.ctbt != null) {
                                                                            if (item.hematology.ctbt.referenceLab != null) {
                                                                                item.hematology.ctbt.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.hematology.esr != null) {
                                                                            if (item.hematology.esr.referenceLab != null) {
                                                                                item.hematology.esr.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.hematology.prms != null) {
                                                                            if (item.hematology.prms.referenceLab != null) {
                                                                                item.hematology.prms.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.hematology.prothombinTime != null) {
                                                                            if (item.hematology.prothombinTime.referenceLab != null) {
                                                                                item.hematology.prothombinTime.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        //CLINICAL MICROSCOPY
                                                                        if (item.clinicalMicroscopy.afb != null) {
                                                                            if (item.clinicalMicroscopy.afb.referenceLab != null) {
                                                                                item.clinicalMicroscopy.afb.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.clinicalMicroscopy.fecalysis != null) {
                                                                            if (item.clinicalMicroscopy.fecalysis.referenceLab != null) {
                                                                                item.clinicalMicroscopy.fecalysis.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.clinicalMicroscopy.ptobt != null) {
                                                                            if (item.clinicalMicroscopy.ptobt.referenceLab != null) {
                                                                                item.clinicalMicroscopy.ptobt.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.clinicalMicroscopy.urineChemical != null) {
                                                                            if (item.clinicalMicroscopy.urineChemical.referenceLab != null) {
                                                                                item.clinicalMicroscopy.urineChemical.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        //TOXICOLOGY
                                                                        if (item.toxicology != null) {
                                                                            if (item.toxicology.referenceLab != null) {
                                                                                item.toxicology.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        //SEROLOGY
                                                                        if (item.serology.serology != null) {
                                                                            if (item.serology.serology.referenceLab != null) {
                                                                                item.serology.serology.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.serology.antigen != null) {
                                                                            if (item.serology.antigen.referenceLab != null) {
                                                                                item.serology.antigen.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.serology.covid != null) {
                                                                            if (item.serology.covid.referenceLab != null) {
                                                                                item.serology.covid.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.serology.crp != null) {
                                                                            if (item.serology.crp.referenceLab != null) {
                                                                                item.serology.crp.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.serology.hiv != null) {
                                                                            if (item.serology.hiv.referenceLab != null) {
                                                                                item.serology.hiv.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.serology.rtAntigen != null) {
                                                                            if (item.serology.rtAntigen.referenceLab != null) {
                                                                                item.serology.rtAntigen.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.serology.rtpcr != null) {
                                                                            if (item.serology.rtpcr.referenceLab != null) {
                                                                                item.serology.rtpcr.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        if (item.serology.thyroid != null) {
                                                                            if (item.serology.thyroid.referenceLab != null) {
                                                                                item.serology.thyroid.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }
                                                                        if (item.serology.typhidot) {
                                                                            if (item.serology.typhidot.referenceLab != null) {
                                                                                item.serology.typhidot.referenceLab.collectionItems.map((refItem, k) => {
                                                                                    if (item.itemDetails.itemid === refItem.referenceLabItems.itemid) {
                                                                                        items.push(<CContainer key={k}>{item.itemDetails.itemDescription}</CContainer>)
                                                                                        subtotal += refItem.molePrice;
                                                                                    }
                                                                                    return null
                                                                                })
                                                                            }
                                                                        }

                                                                        // forSopTotal += subtotal; 
                                                                        return items

                                                                    })}
                                                            </td>
                                                            <td className="text-right">{twoFixedAmt(subtotal)}</td>
                                                        </tr>

                                                    })}
                                                </tbody>
                                            </table>
                                            <CRow className="m-0 p-0">
                                                <CCol md="8" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        FOR SOP :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.forCreateSOPTotal)}
                                                    </strong>
                                                </CCol>
                                                <CCol md="4" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        TOTAL :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.totalSendOut)}
                                                    </strong>
                                                </CCol>
                                            </CRow>
                                        </TabPanel>
                                    </CCol>
                                    <CCol md="12" className="m-0 p-0">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={1}>
                                            <CRow className="m-0 p-0">
                                                <CCol md="12" className="m-1 p-0">
                                                    <CButton
                                                        className="border border-dark"
                                                        color="success"
                                                        onClick={this.paySOP}
                                                    >
                                                        <i className="mfe-2 fas fa-list" />
                                                        Pay SOP
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                            <CRow className="m-0 p-0">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            // checked={this.state.allItems}
                                                                            // onChange={this.handleCheckBoxAllItems}
                                                                            color="primary"
                                                                            className="p-0"
                                                                        />
                                                                    }
                                                                    className="m-0"
                                                                />
                                                            </th>
                                                            <th scope="col">SOP Number</th>
                                                            <th scope="col">Statement Date</th>
                                                            <th scope="col">Covered Date</th>
                                                            {/* <th scope="col">Aging</th> */}
                                                            <th scope="col">Status</th>
                                                            <th scope="col"># of Txns</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.sopList !== undefined ? this.props.sopList.map((sop, index) => {
                                                            return <>
                                                                <tr key={index}>
                                                                    <td>

                                                                        {
                                                                            this.state.selectedReferenceLab !== null
                                                                                ? <CButton
                                                                                    className="btn-sm border border-dark mfe-1"
                                                                                    color="success"
                                                                                    onClick={() => this.viewSOPDetails(sop.id)}
                                                                                >
                                                                                    <i className="mfe-1 far fa-eye" />
                                                                                </CButton>
                                                                                : sop.name
                                                                        }
                                                                        {this.state.selectedReferenceLab !== null && sop.sopStatus === 0 ? <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    // checked={txn.isSelected}
                                                                                    onChange={this.handleCheckBox(sop.id)}
                                                                                    color="primary"
                                                                                    className="p-0"
                                                                                />
                                                                            }
                                                                            className="m-0"
                                                                        /> : null

                                                                        }
                                                                    </td>
                                                                    <td>{sop.sopNumber}</td>
                                                                    <td>{moment(sop.statementDate).format('YYYY-MM-DD hh:mm a')}</td>
                                                                    <td>{moment(sop.statementDate).format('YYYY-MM-DD hh:mm a')}</td>
                                                                    <td>{this.getSOPStatus(sop)}</td>
                                                                    <td>{sop.transactions.length}</td>
                                                                    <td>{sop.sopAmount}</td>
                                                                </tr>
                                                            </>
                                                        }) : null
                                                        }
                                                    </tbody>
                                                </table>
                                            </CRow>
                                            <CRow className="m-0 p-0">
                                                <CCol md="8" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        FOR PAYMENT :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.forPaymentTotal)}
                                                    </strong>
                                                </CCol>
                                                <CCol md="4" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        TOTAL SOA :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.SOPTotalAmount)}
                                                    </strong>
                                                </CCol>
                                            </CRow>
                                        </TabPanel>
                                    </CCol>
                                    <CCol md="12" className="m-0 p-0">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={2}>
                                            <CRow className="m-0 p-0">
                                                <CCol md="2" className="m-1 p-0">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Year</CLabel>
                                                    <ReactSelect
                                                        className="basic-single"
                                                        placeholder="--"
                                                        value={this.state.selectedYear}
                                                        onChange={this.handleSelectChange('selectedYear')}
                                                        isClearable={false}
                                                        isSearchable={false}
                                                        isLoading={false}
                                                        options={this.state.yearList}
                                                        menuPlacement="bottom"
                                                    />
                                                </CCol>
                                                <CCol md="9" className="m-1 p-0">
                                                </CCol>
                                            </CRow>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Action</th>
                                                        <th scope="col">Payment Date</th>
                                                        <th scope="col">Payment Type</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col"># of SOPs</th>
                                                        <th scope="col">Amount Paid</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        [].concat(this.state.paidSOPList)
                                                            .sort((a, b) => a.id > b.id ? 1 : -1)
                                                            .map((pay) => {
                                                                return <tr key={pay.id}>
                                                                    <td>
                                                                        <CButton
                                                                            className="btn-sm border border-dark mfe-2"
                                                                            color="success"
                                                                            onClick={() => this.viewPaymentDetails(pay.id)}
                                                                        >
                                                                            <i className="mfe-2 far fa-eye" />
                                                                        </CButton>
                                                                    </td>
                                                                    <td>{pay.paymentDate}</td>
                                                                    <td>{pay.paymentDisplay}</td>
                                                                    <td>{this.getSOPStatus(pay)}</td>
                                                                    <td className='text-center'>{pay.sopList.length}</td>
                                                                    <td className='text-right'>{twoFixedAmt(pay.paymentAmount + pay.otherAmount + pay.taxWithHeld)}</td>
                                                                </tr>
                                                            })
                                                    }
                                                </tbody>
                                            </table>
                                            <CRow className="m-0 p-0">
                                                <CCol md="12" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        TOTAL PAYMENTS :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.totalPaid)}
                                                    </strong>
                                                </CCol>
                                            </CRow>
                                        </TabPanel>
                                    </CCol>
                                    <CCol md="12" className="m-0 p-0">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={3}>
                                            <CRow className="m-0 p-0">
                                                <CCol md="2" className="m-1 p-0">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Year</CLabel>
                                                    <ReactSelect
                                                        className="basic-single"
                                                        placeholder="--"
                                                        value={this.state.selectedYear}
                                                        onChange={this.handleSelectChange('selectedYear')}
                                                        isClearable={false}
                                                        isSearchable={false}
                                                        isLoading={false}
                                                        options={this.state.yearList}
                                                        menuPlacement="bottom"
                                                    />
                                                </CCol>
                                                <CCol md="9" className="m-1 p-0">
                                                </CCol>
                                            </CRow>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Transaction</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        [].concat(this.state.sopSummaryList)
                                                            .map((summ, idx) => {
                                                                return <tr key={idx}>
                                                                    <td>{summ.date}</td>
                                                                    <td><CRow className='m-0 p-0'>{summ.text}</CRow>
                                                                        {
                                                                            summ.type === 2
                                                                                ? <CRow className='m-0 p-0'>{summ.other}</CRow>
                                                                                : null
                                                                        }
                                                                    </td>
                                                                    <td className='text-right'>{twoFixedAmt(summ.amount)}</td>
                                                                    <td className='text-right'>{twoFixedAmt(summ.currBal)}</td>
                                                                </tr>
                                                            })
                                                    }
                                                </tbody>
                                            </table>
                                            <CRow className="m-0 p-0">
                                                <CCol md="12" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        CURRENT BALANCE :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.sopSummaryBalance)}
                                                    </strong>
                                                </CCol>
                                            </CRow>
                                        </TabPanel>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
        sendOutList: state.sop.sendOutList,
        referenceLaboratoryList: state.refLab.referenceLaboratoryList,
        sopList: state.sop.sopList,
        sopPaymentList: state.sop.paymentList,
        paymentBanks: state.bran.paymentBanks,
        loading: state.sop.loading,
        sopListLoading: state.sop.sopListLoading,
        unbilledListLoading: state.sop.unbilledListLoading,
        summaryList: state.sop.summaryList,
        emailLoading: state.email.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onViewSOPUnbilledTransactions: (token, startTime, endTime, referenceLab, setData) => dispatch(actions.viewSOPUnbilledTransactions(token, startTime, endTime, referenceLab, setData)),
        onsopClear: () => dispatch(actions.sopClear()),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
        onSaveUpdateSOP: (token, sopData, closeSOPModal) => dispatch(actions.saveUpdateSOP(token, sopData, closeSOPModal)),
        onListSOP: (token, startTime, endTime, referenceid, setData) => dispatch(actions.listSOP(token, startTime, endTime, referenceid, setData)),
        onListSopClear: () => dispatch(actions.sopListClear()),
        onGetPaymentBanks: (token) => dispatch(actions.getPaymentBanks(token)),
        onSaveUpdateSOPPayment: (token, paymentData, closeSOPModal) => dispatch(actions.saveUpdateSOPPayment(token, paymentData, closeSOPModal)),
        onViewSOPPaymentList: (token, referenceId, year, setData) => dispatch(actions.viewSOPPaymentList(token, referenceId, year, setData)),
        onVerifySOP: (token, referenceId, sopId, closeSOPModal) => dispatch(actions.verifySOP(token, referenceId, sopId, closeSOPModal)),
        onNotedSOP: (token, referenceId, sopId, closeSOPModal) => dispatch(actions.notedSOP(token, referenceId, sopId, closeSOPModal)),
        onVerifySOPPayment: (token, referenceId, sopId, closeSOPModal) => dispatch(actions.verifySOPPayment(token, referenceId, sopId, closeSOPModal)),
        onGetReferenceToSOPExcel: (token, referenceId, sopId, closeSOPModal) => dispatch(actions.getReferenceToSOPExcel(token, referenceId, sopId, closeSOPModal)),
        onPrintReferenceToSOP: (token, referenceId, sopId, withHeaderFooter) => dispatch(actions.printReferenceToSOP(token, referenceId, sopId, withHeaderFooter)),
        onViewSOPSummaryList: (token, referenceId, year, setData) => dispatch(actions.viewSOPSummaryList(token, referenceId, year, setData)),
        onUploadPaymentImage: (token, changeTo, paymentid, file, closeSOAPayment) => dispatch(actions.uploadPaymentImageSop(token, changeTo, paymentid, file, closeSOAPayment)),
        onSendChargeToSOP: (token, emailValues, referenceId, sopId, closeModal) => dispatch(actions.sendChargeToSOP(token, emailValues, referenceId, sopId, closeModal)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SOP));