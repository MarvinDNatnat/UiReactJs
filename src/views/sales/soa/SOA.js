import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import ReactSelect from 'react-select';
import clsx from 'clsx';
import * as actions from 'src/store/actions/index';
import Swal from 'sweetalert2';

import { Toast } from 'src/store/sweetAlert';
import moment from 'moment';
import { padLeadingZeros, patientDisplay, twoFixedAmt, displayDate, getAgingDate } from 'src/store/utility'

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CContainer,
    CCol,
    CRow,
    CLabel,
    CInput
} from '@coreui/react';

import {
    Box,
    Backdrop,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import SOAModal from 'src/containers/modal/soa/SOAModal';
import PaymentModal from 'src/containers/modal/soa/PaymentModal';
import UpdateSOAModal from 'src/containers/modal/soa/UpdateSOAModal';
import ControlNumberModal from 'src/containers/modal/soa/ControlNumberModal';

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

import EmailModal from 'src/containers/modal/common/EmailModal'

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
    soaListModal: [],
    allItems: false,
    forPaymentTotal: 0,
    forSOATotal: 0,
    soaId: null,
    soaPO: '',
    soaNumber: null,
    soaDate: new Date(),
    dateFrom: null,
    dateTo: null,
    soaChargeList: [],
    prepared: null,
    verified: null,
    noted: null,
    soaPaymentList: [],
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
    paidSOAList: [],
    totalPaid: 0,
    soaSummaryList: [],
    soaSummaryBalance: 0,
    paymentReceipt: null,
    paymentImageType: null,
    selectedFile: null,
    isFilePicked: false,
    transactionIds: [],
    soaSelectedPatient: [],
}
const chargeTypes = new Map([
    ['CORP', 'CORPORATE'],
    ['CASH', 'CORPORATE CASH'],
    ['HMO', 'HMO'],
    ['REB', 'REBATE'],
    ['STF', 'STAFF'],
    ['APE', 'APE'],
])

const paymentTypes = new Map([
    ['CA', 'CASH'],
    ['BNK', 'BANK DEPOSIT'],
    ['CHQ', 'CHEQUE'],
])

const sortBy = [
    { value: 'Y', label: 'YEAR' },
    { value: 'M', label: 'MONTH' },
]

const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}

export class SOA extends Component {
    state = {
        showSOAModal: false,
        total: 0,
        showUpdateSOAModal: false,
        showPaymentModal: false,
        selectedChargeTo: null,
        selectedOption: 'unbilled',
        viewPanel: 0,
        yearList: [],
        SOATotalAmount: 0,
        addvancePayment: 0,
        paymentTypeList: [
            { value: 'CA', label: 'CASH' },
            { value: 'BNK', label: 'BANK DEPOSIT' },
            { value: 'CHQ', label: 'CHEQUE' },
        ],
        selectedYear: null,
        ...initState,
        emailData: emailConfig,
        emailModal: false,
        controlNumberModal: false,
        controlNumber: "",
        emailtype: "",
        withRunningBalance: true,
        dateFromValue: moment(moment().subtract(30, 'd').format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        byYear: { value: 'Y', label: 'YEAR' },
        currentSoaOpen: null,
    }



    viewTransctions = () => {
        switch (this.state.selectedOption) {
            case 'unbilled':
                this.props.onViewSOAUnbilledTransactions(
                    this.props.userToken,
                    this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
                    this.setUnbilledTransactions
                );
                break;

            case 'soa':
                this.props.onViewChargeToSOAList(
                    this.props.userToken,
                    this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
                    this.state.selectedYear.value,
                    moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                    moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                    this.state.byYear.value,
                    this.setChargeToSOA
                );

                if (this.state.selectedChargeTo !== null) {
                    this.props.onViewSOAPaymentList(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.selectedYear.value,
                        moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                        moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                        this.state.byYear.value,
                        this.setSOAPayments
                    );
                }
                break;

            case 'payments':
                if (this.state.selectedChargeTo === null) {
                    Swal.fire({
                        title: 'Please select charge to account.',
                        icon: 'error',
                        text: 'No records to view.',
                    })
                } else {
                    this.props.onViewSOAPaymentList(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.selectedYear.value,
                        moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                        moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                        this.state.byYear.value,
                        this.setSOAPayments
                    );
                }
                break;

            case 'transactions':
                if (this.state.selectedChargeTo === null) {
                    Swal.fire({
                        title: 'Please select charge to account.',
                        icon: 'error',
                        text: 'No records to view.',
                    })
                } else {
                    this.props.onViewSOASummaryList(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.selectedYear.value,
                        this.setSOASummary
                    );
                }
                break;

            default:
                break;

        }
    }

    createSOA = () => {
        if (this.state.selectedChargeTo === null) {
            Swal.fire({
                title: 'Please select charge to account.',
                icon: 'error',
                text: 'No SOA to create.',
            });
            return;
        }

        if (this.state.selectedChargeTo.soaCode === null || this.state.selectedChargeTo.soaCode === '') {
            Swal.fire({
                title: 'Please update SOA Code of Charge from Medical Records.',
                icon: 'error',
                text: 'No SOA to create, SOA Code is required.',
            });
            return;
        }

        let hasSelected = false;
        const uList = [].concat(this.state.unbilled);
        const uSOAList = [];
        let dateFrom = null;
        let dateTo = null;
        uList.forEach(item => {
            if (item.isSelected) {
                hasSelected = true;
                uSOAList.push(item);
                if (dateFrom === null) {
                    dateFrom = item.dateTime;
                }
                dateTo = item.dateTime;
            }
        });

        if (!hasSelected) {
            Swal.fire({
                title: 'Please select transactions to charge.',
                icon: 'error',
                text: 'No SOA to create.',
            });
            return;
        }

        this.setState({
            ...this.state,
            showSOAModal: true,
            soaListModal: uSOAList,
            dateFrom: dateFrom,
            dateTo: dateTo,
            soaDate: new Date(),
        });
    }

    paySOA = () => {
        if (this.state.selectedChargeTo === null) {
            Swal.fire({
                title: 'Please select charge to account.',
                icon: 'error',
                text: 'No SOA to pay.',
            });
            return;
        }

        if (this.state.selectedChargeTo.soaCode === null || this.state.selectedChargeTo.soaCode === '') {
            Swal.fire({
                title: 'Please update SOA Code of Charge from Medical Records.',
                icon: 'error',
                text: 'No SOA to create, SOA Code is required.',
            });
            return;
        }

        let hasSelected = false;
        const soaList = [].concat(this.state.soaChargeList);
        const paySOAList = [];
        soaList.forEach(item => {
            if (item.isSelected) {
                hasSelected = true;
                paySOAList.push(item);
            }
        });


        if (!hasSelected) {
            Swal.fire({
                title: 'Please select SOA to pay.',
                icon: 'error',
                text: 'No Payment to create.',
            });
            return;
        }

        this.setState({
            ...this.state,
            paymentId: null,
            showPaymentModal: true,
            soaPaymentList: paySOAList,
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
        });
    }

    handleCheckBoxAllItems = (event) => {
        const value = event.target.checked;
        const uList = [].concat(this.state.unbilled);
        let totalSOA = 0;
        uList.forEach(item => {
            item.isSelected = value;
            if (value) {
                totalSOA += item.subtotal;
            }
        });

        this.setState({
            ...this.state,
            unbilled: uList,
            allItems: value,
            forSOATotal: totalSOA,
        });
    }

    handleCheckBox = (id) => (event) => {
        if (this.state.selectedOption === 'unbilled') {
            const uList = [].concat(this.state.unbilled);
            const itmIndex = uList.findIndex(itm => itm.id === id);
            if (itmIndex >= 0) {
                const item = uList[itmIndex];
                item.isSelected = event.target.checked;
                uList[itmIndex] = item;
            }

            let totalSOA = 0;
            let allItems = true;
            uList.forEach(item => {
                if (item.isSelected) {
                    totalSOA += item.subtotal;
                } else {
                    allItems = false;
                }
            });

            this.setState({
                ...this.state,
                unbilled: uList,
                allItems: allItems,
                forSOATotal: totalSOA,
            });
        } else if (this.state.selectedOption === 'soa') {
            const soaList = [].concat(this.state.soaChargeList);
            const itmIndex = soaList.findIndex(itm => itm.id === id);
            if (itmIndex >= 0) {
                const item = soaList[itmIndex];
                item.isSelected = event.target.checked;
                soaList[itmIndex] = item;
            }

            // let totalPayment = 0;
            soaList.forEach(item => {
                if (item.isSelected) {
                    // totalPayment += item.soaAmount;
                }
            });

            this.setState({
                ...this.state,
                soaChargeList: soaList,
                // forPaymentTotal: totalPayment,
            });
        }

    }

    closeSOAModal = (data) => {
        this.setState({
            ...this.state,
            showSOAModal: false,
            emailModal: false,
        });

        if (data !== null) {
            switch (this.state.selectedOption) {
                case 'unbilled':
                case 'soa':
                    this.viewTransctions();
                    break;

                case 'payments':
                    break;

                default:
                    break;

            }
        }
    }

    closeUpdateSOAModal = (data) => {
        this.setState({
            ...this.state,
            showUpdateSOAModal: false,
        });
    }

    closeControlNumberModal = (data) => {
        this.setState({
            ...this.state,
            controlNumberModal: false,
            showPaymentModal: data == "close" ? true : false
        });
    }

    auditModalOpen = () => {
        this.setState({
            ...this.state,
            controlNumberModal: true,
            showPaymentModal: false,
        });
    }
    closePaymentModal = (data) => {
        this.setState({
            ...this.state,
            showPaymentModal: false,
        });

        if (data !== null) {
            switch (this.state.selectedOption) {
                case 'unbilled':
                case 'soa':
                case 'payments':
                    this.viewTransctions();
                    break;

                default:
                    break;

            }
        }
    }

    setUnbilledTransactions = () => {
        const uList = [];
        let total = 0;

        if (this.props.unbilledList.length > 0) {
            this.props.unbilledList.forEach((txn, idx) => {
                const data = this.getTransactionDetails(txn);
                const aging = getAgingDate(txn.transactionDate);
                const item = {
                    id: txn.id,
                    biller: txn.biller,
                    dateTime: moment(txn.transactionDate).format('YYYY-MM-DD HH:mm:ss'),
                    receipt: padLeadingZeros(txn.id),
                    fullname: patientDisplay(txn.patient),
                    subtotal: txn.totalItemAmountDue,
                    products: (<CContainer className="m-0 p-0">{data.subTotal}</CContainer>),
                    itemList: data.itemList,
                    isSelected: false,
                    aging: aging,
                }
                total += txn.totalItemAmountDue;
                uList.push(item);
            });
        }

        this.setState({
            ...this.state,
            totalItems: total,
            unbilled: uList,
            forSOATotal: 0,
            soaListModal: [],
            allItems: false,
        });
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            soaPO: event.target.value
        })
    }


    getTransactionDetails = (txn) => {
        const subTotalList = [];
        const itemList = [];
        txn.transactionItems.forEach(itm => {
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
                        {twoFixedAmt(itm.amountDue)}
                    </CCol>
                </CRow>
            )
            itemList.push({
                description: description,
                amountDue: itm.amountDue,
            })
        });

        return {
            subTotal: subTotalList,
            itemList: itemList,
        }
    }

    setChargeToSOA = () => {
        const soaList = [];
        let totalSOA = 0;
        if (this.props.soaList.length > 0) {
            this.props.soaList.forEach(itm => {
                let aging = getAgingDate(itm.statementDate);
                if (itm.payment !== null) {
                    aging = "PAID";
                }
                let filter = soaList.filter(like => like.id === itm.id)
                if (filter.length === 0) {
                    const soa = {
                        id: itm.id,
                        chargeTo: itm.chargeTo.companyName,
                        chargeToId: itm.chargeTo.corporateid,
                        soaNumber: itm.soaNumber,
                        coverageDateFrom: displayDate(itm.coverageDateFrom, 'YYYY-MM-DD'),
                        coverageDateTo: displayDate(itm.coverageDateTo, 'YYYY-MM-DD'),
                        statementDate: displayDate(itm.statementDate, 'YYYY-MM-DD'),
                        soaAmount: itm.soaAmount,
                        transactions: itm.transactions,
                        preparedUser: itm.preparedUser,
                        verifiedUser: itm.verifiedUser,
                        notedUser: itm.notedUser,
                        payment: itm.payment,
                        isSelected: false,
                        aging: aging,
                        soaPO: itm.purchaseOrder,
                        soaSend: itm.soaSend,
                        soaRecieve: itm.soaRecieved
                    }

                    totalSOA += itm.soaAmount;
                    soaList.push(soa);
                }
            });
        }

        this.setState({
            ...this.state,
            soaChargeList: soaList,
            SOATotalAmount: totalSOA,
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

    setSOAPayments = () => {
        const payList = [];
        let totalPayment = 0;
        if (this.props.paymentList.length > 0) {
            this.props.paymentList.forEach(itm => {
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
                    auditedUser: itm.auditedUser,
                    soaList: itm.soaList,
                    soaPO: itm.purchaseOrder,
                    addvancePayment: itm.advancePayment
                }

                totalPayment += (itm.paymentAmount + itm.otherAmount + itm.taxWithHeld + itm.advancePayment);
                payList.push(pay);
            });
        }

        this.setState({
            ...this.state,
            paidSOAList: payList,
            totalPaid: totalPayment,
        });
    }

    setSOASummary = () => {
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
            soaSummaryList: list,
            soaSummaryBalance: currBal,
        });
    }

    componentDidMount() {
        this.props.onGetAllCorporates(this.props.userToken);
        this.props.onGetPaymentBanks(this.props.userToken);

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
        } else if (prop === 'byYear') {
            this.setState({
                ...this.state,
                [prop]: event,
            });
        } else {
            this.props.onClearAllSOAList();

            this.setState({
                ...this.state,
                ...initState,
                [prop]: event,
            });
        }
    }


    handleOptionChange = (event) => {
        this.props.onClearAllSOAList();
        let panel = 0;
        switch (event.target.value) {
            case 'unbilled':
                panel = 0;
                break;

            case 'charge':
                panel = 1;
                break;

            case 'soa':
                panel = 2;
                break;

            case 'payments':
                panel = 3;
                break;

            case 'transactions':
                panel = 4;
                break;

            default:
                break;
        }

        this.setState({
            ...this.state,
            viewPanel: panel,
            selectedOption: event.target.value,
            ...initState,
        })
    }

    handleFileChange = (event) => {
        this.setState({
            ...this.state,
            selectedFile: event.target.files[0],
            isFilePicked: true,
        });
    }

    uploadPayment = () => {
        if (this.state.selectedFile !== null) {
            if (this.state.paymentId !== null) {
                this.props.onUploadPaymentImage(
                    this.props.userToken,
                    this.state.selectedChargeTo.value,
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
                        this.state.selectedChargeTo.value,
                        this.state.paymentId,
                        null,
                        this.closePaymentModal
                    );
                }
            })
        }
    }

    saveSOA = () => {
        Swal.fire({
            title: 'Create SOA',
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
                this.state.soaListModal.forEach(itm => {
                    txns.push(itm.id);
                });
                const soaData = {
                    corporateid: this.state.selectedChargeTo.value,
                    coveredDateFrom: moment(this.state.dateFrom).format('YYYYMMDD'),
                    coveredDateTo: moment(this.state.dateTo).format('YYYYMMDD'),
                    statementDate: moment(this.state.soaDate).format('YYYYMMDD'),
                    soaAmount: this.state.forSOATotal,
                    transactions: txns,
                    purchaseOrder: this.state.soaPO
                }

                this.props.onSaveUpdateSOA(this.props.userToken, soaData, 'post', this.closeSOAModal);
            }
        })
    }

    verifySOA = () => {
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
                if (this.state.soaId !== null) {
                    this.props.onVerifySOA(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.soaId,
                        this.closeSOAModal
                    );
                }
            }
        });
    }

    notedSOA = () => {
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
                if (this.state.soaId !== null) {
                    this.props.onNotedSOA(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.soaId,
                        this.closeSOAModal
                    );
                }
            }
        });
    }

    RecieveHandler = (soa) => {
        Swal.fire({
            title: 'RECIEVE SOA',
            text: "Are you sure your email was recieved?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (soa.id !== null) {
                    this.props.onRecieveChargeToSOA(
                        this.props.userToken,
                        soa.chargeToId,
                        soa.id,
                        this.closeSOAModal,
                        this.state.selectedYear.value,
                    );
                }
            }
        });
    }

    updateSOADetails = (soaId) => {
        const soaIndex = this.state.soaChargeList.findIndex(s => s.id === soaId);
        if (soaIndex >= 0) {
            const soa = this.state.soaChargeList[soaIndex];
            this.setState({
                ...this.state,
                showUpdateSOAModal: true,
                soaId: soaId,
                soaNumber: soa.soaNumber,
                // soaListModal: [].concat(soaList).sort((a, b) => a.id > b.id ? 1 : -1),
                // forSOATotal: soa.soaAmount,
                soaDate: moment(soa.statementDate),
                dateFrom: moment(soa.coverageDateFrom),
                dateTo: moment(soa.coverageDateTo),
                // prepared: soa.preparedUser,
                // verified: soa.verifiedUser,
                // noted: soa.notedUser,
            });
        }


        // this.setState({
        //     ...this.state,
        //     showUpdateSOAModal: true,
        // });
    }

    printSOA = () => {
        this.props.onPrintChargeToSOA(
            this.props.userToken,
            this.state.selectedChargeTo.value,
            this.state.soaId,
            true, // with header and footer
            this.state.withRunningBalance,
            this.state.selectedYear.value
        );
    }

    sendSOA = () => {
        this.setState({
            ...this.state,
            showSOAModal: false,
            emailModal: true,
            emailtype: "soa",
            emailData: {
                emailContent: {
                    sendTo: this.state.selectedChargeTo.soaEmail,
                    sendCc: '',
                    emailSubject: this.state.soaNumber,
                    emailBody:
                        `Hi Team,\nGood Day!\n\nHere is the billing of \n` + this.state.soaNumber + `\n\nPlease see attached file.\n\nPlease let me know if you need any further Explanations, Clarifications, Questions or Assistants\ndo not hesitate to contact us.\n\nThank you & Keep safe!\n\n--\nPedrito B. Basbas\nFinance Officer\n09150083520\nQUESTDIAGNOSTICS, INC.`
                }
            }
        });
    }

    onSendEmailSoa = (emailValues) => {
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
                this.props.onSendChargeToSOA(
                    this.props.userToken,
                    emailValues,
                    this.state.selectedChargeTo.value,
                    this.state.soaId,
                    this.closeSOAModal,
                    this.state.selectedYear.value,
                    this.state.withRunningBalance,
                );
            }
        })
    }

    excelSOA = () => {
        this.props.onGetChargeToSOAExcel(
            this.props.userToken,
            this.state.selectedChargeTo.value,
            this.state.soaId,
            this.state.soaNumber
        );
    }

    SOAPayment = () => {
        Swal.fire({
            title: 'SOA Payment',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                const paymentTotal = parseFloat(this.state.paymentAmount) + parseFloat(this.state.otherAmount) + parseFloat(this.state.taxWithHeld) + parseFloat(this.state.addvancePayment);
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

                const soas = [];
                this.state.soaPaymentList.forEach(itm => {
                    soas.push(itm.id);
                });

                const payData = {
                    corporateid: this.state.selectedChargeTo.value,
                    paymentDate: moment(this.state.paymentDate).format('YYYYMMDD'),
                    paymentAmount: parseFloat(this.state.paymentAmount),
                    paymentType: this.state.paymentType.value,
                    paymentBank: this.state.paymentBank !== null ? this.state.paymentBank.value : null,
                    accountNumber: this.state.accountNo !== '' ? this.state.accountNo : null,
                    otherAmount: parseFloat(this.state.otherAmount),
                    otherNotes: this.state.otherNotes !== '' ? this.state.otherNotes : null,
                    taxWithHeld: parseFloat(this.state.taxWithHeld),
                    soaList: soas,
                    transactionIds: this.state.transactionIds,
                    addvancePayment: this.state.addvancePayment
                }

                this.props.onSaveUpdateSOAPayment(this.props.userToken, payData, 'post', this.closePaymentModal);
            }
        });
    }

    verifySOAPayment = () => {
        Swal.fire({
            title: 'Verify SOA Payment',
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
                    this.props.onVerifySOAPayment(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.paymentId,
                        this.closePaymentModal
                    );
                }
            }
        });

    }

    auditSOAPayment = () => {
        Swal.fire({
            title: 'Audit SOA Payment',
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
                    this.props.onAuditedSOAPayment(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.paymentId,
                        this.closeControlNumberModal,
                        this.state.controlNumber
                    );
                }
            }
        });

    }


    viewSOADetails = (soaId) => {
        let total = 0;
        const soaIndex = this.state.soaChargeList.findIndex(s => s.id === soaId);
        if (soaIndex >= 0) {
            const soa = this.state.soaChargeList[soaIndex];
            const soaList = [];
            let trueOrFalse = false;
            soa.transactions.forEach(txn => {
                this.state.transactionListId.forEach(data => {
                    if (data === txn.id) {
                        trueOrFalse = true;
                    }
                })

                const data = this.getTransactionDetails(txn);
                const item = {
                    id: txn.id,
                    dateTime: moment(txn.transactionDate).format('YYYY-MM-DD HH:mm:ss'),
                    receipt: padLeadingZeros(txn.id),
                    fullname: patientDisplay(txn.patient),
                    subtotal: txn.totalItemAmountDue,
                    products: (<CContainer className="m-0 p-0">{data.subTotal}</CContainer>),
                    itemList: data.itemList,
                    isSelected: trueOrFalse,
                    transactionId: txn.transactionid,
                    soaStatusPaid: txn.soaStatus,

                }
                if (txn.soaStatus === false) {
                    total += txn.totalItemAmountDue
                }
                soaList.push(item);
            });


            this.setState({
                ...this.state,
                showSOAModal: true,
                soaId: soaId,
                soaNumber: soa.soaNumber,
                soaListModal: [].concat(soaList).sort((a, b) => a.id > b.id ? 1 : -1),
                forSOATotal: total,
                soaDate: moment(soa.statementDate),
                dateFrom: moment(soa.coverageDateFrom),
                dateTo: moment(soa.coverageDateTo),
                prepared: soa.preparedUser,
                verified: soa.verifiedUser,
                noted: soa.notedUser,
                soaPO: soa.soaPO,
                soaSelectedPatient: soaList,
                currentSoaOpen: soa,
            });
        }
    }

    amount = () => (e) => {
        this.setState({
            ...this.state,
            addvancePayment: e.target.value
        });
    }

    addAdvancePayment = () => {
        Swal.fire({
            title: 'Add Advance Payment',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.selectedChargeTo !== null) {
                    this.props.onAddAdvancePayment(
                        this.props.userToken,
                        this.state.selectedChargeTo.value,
                        this.state.addvancePayment
                    )
                    this.setState({
                        ...this.state,
                        addvancePayment: 0
                    });

                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Please Select Company!'
                    });
                }
            }
        });

    }

    viewPaymentDetails = (payId) => {
        const payIndex = this.state.paidSOAList.findIndex(p => p.id === payId);
        if (payIndex >= 0) {
            const pay = this.state.paidSOAList[payIndex];

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
            const paySOAList = [];
            pay.soaList.forEach(itm => {
                const soa = {
                    id: itm.id,
                    soaNumber: itm.soaNumber,
                    coverageDateFrom: displayDate(itm.coverageDateFrom, 'YYYY-MM-DD'),
                    coverageDateTo: displayDate(itm.coverageDateTo, 'YYYY-MM-DD'),
                    statementDate: displayDate(itm.statementDate, 'YYYY-MM-DD'),
                    soaAmount: itm.soaAmount,
                    transactions: itm.transactions,
                }

                totalPayment += itm.soaAmount;
                paySOAList.push(soa);
            });


            this.setState({
                ...this.state,
                paymentId: payId,
                showPaymentModal: true,
                soaPaymentList: paySOAList,
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
                addvancePayment: pay.addvancePayment
            });
        }
    }

    handleDateChange = (prop) => (date) => {
        this.setState({
            ...this.state,
            [prop]: date,
        });
    };

    handleInputChange = (prop) => (event) => {
        this.setState({
            ...this.state,
            [prop]: event.target.value,
        });
    };

    getSOAStatus = (soa) => {
        let status = 'PREPARED';
        let totalSoa = 0;
        // let paid = 0;
        let totalPerSoaPay = 0
        if (soa.transactions !== undefined) {
            soa.transactions.map(txn => {
                if (txn.soaStatus) {
                    totalPerSoaPay += txn.totalItemAmountDue
                }
                return null;
            })
        }
        if (soa.payment !== undefined && soa.payment !== null) {
            this.state.paidSOAList.map(pay => {
                if (pay.soaList[0].soaNumber === soa.soaNumber) {
                    totalSoa = soa.soaAmount - totalPerSoaPay
                    // paid = pay.soaList[0].payment.paymentAmount
                }
                return null;
            })
            if (totalSoa === 0) {
                status = 'PAID';
            } else {
                status = "PAID(" + totalPerSoaPay + ")";
            }
        } else if (soa.auditedUser !== undefined && soa.auditedUser !== null) {
            status = 'AUDITED';
        } else if (soa.notedUser !== undefined && soa.notedUser !== null) {
            status = 'NOTED';
        } else if (soa.verifiedUser !== undefined && soa.verifiedUser !== null) {
            status = 'VERIFIED';
        }

        return status;
    }

    SelectAllPatientHandler = () => () => {
        this.state.currentSoaOpen.transactions.forEach(txn => {
            const soaIndex = this.state.soaChargeList.findIndex(s => s.id === this.state.currentSoaOpen.id);
            if (soaIndex >= 0) {
                const soa = this.state.soaChargeList[soaIndex];
                let trueOrFalse = false;
                soa.transactions.forEach(txn => {
                    this.state.transactionListId.forEach(id => {
                        if (id === txn.id) {
                            trueOrFalse = true;
                        }
                    })
                })

                if (!txn.soaStatus) {
                    const data = this.getTransactionDetails(txn);
                    const txnNewData = {
                        id: txn.id,
                        dateTime: moment(txn.transactionDate).format('YYYY-MM-DD HH:mm:ss'),
                        receipt: padLeadingZeros(txn.id),
                        fullname: patientDisplay(txn.patient),
                        subtotal: txn.totalItemAmountDue,
                        products: (<CContainer className="m-0 p-0">{data.subTotal}</CContainer>),
                        itemList: data.itemList,
                        isSelected: trueOrFalse,
                        transactionId: txn.transactionid,
                        soaStatusPaid: txn.soaStatus,
                    }
                    let datasValue = this.state.transactionListSelected.some(data => data === txnNewData);
                    var datas = this.state.transactionListSelected.concat(txnNewData);
                    if (datasValue === false) {
                        this.setState({
                            ...this.state,
                            transactionListSelected: datas
                        });
                    }
                    let totasllss = 0;
                    this.state.transactionListSelected.forEach(el => {
                        totasllss += el.subtotal
                    })

                    let filter = this.state.transactionIds.filter(like => like === txn.transactionid);
                    if (filter.length === 0) {
                        this.setState({
                            ...this.state,
                            transactionIds: [...this.state.transactionIds, txn.transactionid],
                        });
                    }
                }
            }
        })

        let totasllss = 0;
        this.state.transactionListSelected.forEach(el => {
            totasllss += el.subtotal
        })
        this.setState({
            ...this.state,
            forPaymentTotal: totasllss,

        });

    }

    selectPatientHandler = () => (event) => {
        if (event != undefined) {
            let statement = this.state.transactionListId.some(data => data.id === event.id);
            if (statement === false) {
                var id = this.state.transactionListId.concat(event.id);
                this.setState({
                    ...this.state,
                    transactionListId: id,
                });
            }
            let datasValue = this.state.transactionListSelected.some(data => data === event);
            var datas = this.state.transactionListSelected.concat(event);
            if (datasValue === false) {
                this.setState({
                    ...this.state,
                    transactionListSelected: datas
                });
            }
            let totasllss = 0;
            this.state.transactionListSelected.forEach(el => {
                totasllss += el.subtotal
            })
            let filter = this.state.transactionIds.filter(like => like === event.transactionId);
            if (filter.length === 0) {
                this.setState({
                    ...this.state,
                    transactionIds: [...this.state.transactionIds, event.transactionId],
                });
            }
            this.setState({
                ...this.state,
                forPaymentTotal: totasllss,

            });
        }

    }

    runningBalanceHandler = () => {
        if (this.state.withRunningBalance) {
            this.state.withRunningBalance = false
        } else {
            this.state.withRunningBalance = true
        }
        this.setState({
            ...this.state,
            withRunningBalance: this.state.withRunningBalance,
        });
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
            <CContainer>
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.emailLoading || this.props.loadingPayment}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <EmailModal
                    emailModal={this.state.emailModal}
                    emailtype={this.state.emailtype}
                    emailData={this.state.emailData}
                    closeClick={this.closeSOAModal}
                    onSendEmailSoa={this.onSendEmailSoa}
                />
                <SOAModal
                    showModal={this.state.showSOAModal}
                    closeClick={this.closeSOAModal}
                    chargeTo={this.state.selectedChargeTo}
                    soaListModal={this.state.soaListModal}
                    totalSOA={this.state.forSOATotal}
                    soaDate={this.state.soaDate}
                    dateFrom={this.state.dateFrom}
                    dateTo={this.state.dateTo}
                    saveSOA={this.saveSOA}
                    SelectAllPatientHandler={this.SelectAllPatientHandler}
                    selectPatient={this.selectPatientHandler}
                    soaOption={this.state.selectedOption}
                    handleDateChange={this.handleDateChange}
                    prepared={this.state.prepared}
                    verified={this.state.verified}
                    noted={this.state.noted}
                    updateSOA={this.updateSOA}
                    verifySOA={this.verifySOA}
                    sendSOA={this.sendSOA}
                    notedSOA={this.notedSOA}
                    printSOA={this.printSOA}
                    excelSOA={this.excelSOA}
                    chargeTypes={chargeTypes}
                    soaNumber={this.state.soaNumber}
                    soaPO={this.state.soaPO}
                    handleChange={this.handleChange}
                    runningBalanceControl={this.state.withRunningBalance}
                    runningBalanceHandler={this.runningBalanceHandler}
                />

                <UpdateSOAModal
                    showModal={this.state.showUpdateSOAModal}
                    closeClick={this.closeUpdateSOAModal}
                    soaNumber={this.state.soaNumber}
                    chargeTo={this.state.selectedChargeTo}
                    soaDate={this.state.soaDate}
                    dateFrom={this.state.dateFrom}
                    dateTo={this.state.dateTo}
                    chargeTypes={chargeTypes}
                    handleDateChange={this.handleDateChange}
                />
                <ControlNumberModal
                    showModal={this.state.controlNumberModal}
                    closeClick={this.closeControlNumberModal}
                    auditSOAPayment={this.auditSOAPayment}
                    handleInputChange={this.handleInputChange}
                    controlNumber={this.state.controlNumber}

                />

                <PaymentModal
                    showModal={this.state.showPaymentModal}
                    closeClick={this.closePaymentModal}
                    chargeTo={this.state.selectedChargeTo}
                    soaListModal={this.state.soaPaymentList}
                    totalSOA={this.state.forPaymentTotal}
                    paymentDate={this.state.paymentDate}
                    paymentAmount={this.state.paymentAmount}
                    paymentType={this.state.paymentType}
                    paymentBank={this.state.paymentBank}
                    accountNo={this.state.accountNo}
                    otherAmount={this.state.otherAmount}
                    addvancePayment={this.state.addvancePayment}
                    otherNotes={this.state.otherNotes}
                    taxWithHeld={this.state.taxWithHeld}
                    paymentReceipt={this.state.paymentReceipt}
                    paymentImageType={this.state.paymentImageType}
                    selectedFile={this.state.selectedFile}
                    isFilePicked={this.state.isFilePicked}
                    handleDateChange={this.handleDateChange}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    typeList={this.state.paymentTypeList}
                    SOAPayment={this.SOAPayment}
                    verifySOAPayment={this.verifySOAPayment}
                    openModalControlNumber={this.auditModalOpen}
                    chargeTypes={chargeTypes}
                    soaChargeList={this.state.soaChargeList}
                    soaOption={this.state.selectedOption}
                    prepared={this.state.prepared}
                    verified={this.state.verified}
                    fileChangeHandler={this.handleFileChange}
                    uploadPayment={this.uploadPayment}
                    soaSelectedPatient={this.state.soaSelectedPatient}
                />
                <CRow>
                    <CCol className="p-0">
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <h3 className="mfe-2">Statement Of Accounts</h3>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CRow className="m-0 p-0">
                                    <CCol md="4" className="col-12 m-0 p-0">
                                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Charge To</CLabel>
                                            <ReactSelect
                                                className={clsx(classes.selectStyles, "basic-single")}
                                                placeholder="All or Select Charge To"
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
                                                                label: corp.companyName,
                                                                soaCode: corp.soaCode,
                                                                companyAddress: corp.companyAddress,
                                                                contactPerson: corp.contactPerson,
                                                                contactNumber: corp.contactNumber,
                                                                soaEmail: corp.email,
                                                                chargeType: corp.chargeType,
                                                                advancePayment: corp.advPayment
                                                            }
                                                        })
                                                }
                                            />
                                        </FormControl>
                                    </CCol>
                                    <CCol md="6" className="col-12 m-0 p-0 mt-3 ml-1">
                                        <CButton
                                            className="border border-dark mfe-2"
                                            color="success"
                                            onClick={this.viewTransctions}
                                        >
                                            <i className="mfe-2 fas fa-list" />
                                            View
                                        </CButton>
                                    </CCol>
                                </CRow>
                                <CRow className="m-0 p-0 mt-2">
                                    <div className="col-8 m-0 p-0 btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'unbilled' ? "active" : "")}>
                                            <input type="radio" value="unbilled"
                                                checked={this.state.selectedOption === 'unbilled'}
                                                onChange={this.handleOptionChange}
                                            />
                                            Unbilled <sup className="badge badge-danger">{this.props.unbilledList.length}</sup>
                                        </label>
                                        <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'charge' ? "active" : "")}>
                                            <input type="radio" value="charge"
                                                checked={this.state.selectedOption === 'charge'}
                                                onChange={this.handleOptionChange}
                                            />
                                            Charge
                                        </label>
                                        <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'soa' ? "active" : "")}>
                                            <input type="radio" value="soa"
                                                checked={this.state.selectedOption === 'soa'}
                                                onChange={this.handleOptionChange}
                                            />
                                            SOA
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
                                            <CCol md="12" className="m-1 p-0">
                                                <CButton
                                                    className="border border-dark mfe-2"
                                                    color="success"
                                                    onClick={this.createSOA}
                                                >
                                                    <i className="mfe-2 fas fa-file-invoice" />
                                                    Create SOA
                                                </CButton>
                                            </CCol>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.state.allItems}
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
                                                            <th scope="col">Aging</th>
                                                            <th scope="col">Procedure</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.unbilled.map((txn) => {
                                                                return <tr key={txn.id}>
                                                                    <td>
                                                                        {
                                                                            this.state.selectedChargeTo !== null
                                                                                ? <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            checked={txn.isSelected}
                                                                                            onChange={this.handleCheckBox(txn.id)}
                                                                                            color="primary"
                                                                                            className="p-0"
                                                                                        />
                                                                                    }
                                                                                    className="m-0"
                                                                                />
                                                                                : txn.biller
                                                                        }
                                                                    </td>
                                                                    <td>{txn.dateTime}</td>
                                                                    <td>{txn.receipt}</td>
                                                                    <td>{txn.fullname}</td>
                                                                    <td>{txn.aging}</td>
                                                                    <td>{txn.products}</td>
                                                                    <td className="text-right">{twoFixedAmt(txn.subtotal)}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <CRow className="m-0 p-0">
                                                <CCol md="8" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        FOR SOA :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.forSOATotal)}
                                                    </strong>
                                                </CCol>
                                                <CCol md="4" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        TOTAL :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.totalItems)}
                                                    </strong>
                                                </CCol>
                                            </CRow>
                                        </TabPanel>
                                    </CCol>
                                    <CCol md="12" className="m-0 p-0">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={1}>
                                            <CRow>
                                                <CCol md="6" className="m-1 p-0">
                                                    Company Name: {this.state.selectedChargeTo != null ? this.state.selectedChargeTo.label : null}
                                                </CCol>
                                                <CCol md="6" className="m-1 p-0">
                                                    Current Balance Advance Payment: {this.state.selectedChargeTo != null ? this.state.selectedChargeTo.advancePayment : null}
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol md="4" className="m-1 p-0">

                                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                                        <CInput
                                                            value={this.state.addvancePayment}
                                                            onChange={this.amount()}
                                                            type="number"
                                                        />
                                                    </FormControl>
                                                </CCol>
                                            </CRow>
                                            <CCol md="12" className="m-1 p-0">
                                                <CButton
                                                    className="border border-dark mfe-2"
                                                    color="success"
                                                    onClick={this.addAdvancePayment}
                                                >
                                                    <i className="mfe-2 fas fa-file-invoice" />
                                                    Add Advance Payment
                                                </CButton>
                                            </CCol>
                                        </TabPanel>
                                    </CCol>
                                    <CCol md="12" className="m-0 p-0">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={2}>
                                            <CRow className="m-0 p-0">
                                                <CCol md="2" className="m-1 p-0">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>List by</CLabel>
                                                    <ReactSelect
                                                        className="basic-single"
                                                        placeholder="--"
                                                        value={this.state.byYear}
                                                        onChange={this.handleSelectChange('byYear')}
                                                        isClearable={false}
                                                        isSearchable={false}
                                                        isLoading={false}
                                                        options={sortBy}
                                                        menuPlacement="bottom"
                                                    />
                                                </CCol>
                                                {

                                                    this.state.byYear.value === "Y" ?
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
                                                        </CCol> :
                                                        <>
                                                            <CCol md="2" className="col-12 p-1">
                                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>From</CLabel>
                                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                                    <DatePicker
                                                                        value={this.state.dateFromValue}
                                                                        format={dateDisplayFormat}
                                                                        inputVariant="outlined"
                                                                        onChange={dateChangeHandler('dateFromValue')}
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
                                                                        value={this.state.dateToValue}
                                                                        format={dateDisplayFormat}
                                                                        inputVariant="outlined"
                                                                        onChange={dateChangeHandler('dateToValue')}
                                                                        showTodayButton
                                                                        disableFuture
                                                                        size="small"
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </CCol>
                                                        </>
                                                }
                                                <CCol md="2" className="m-1 p-0">
                                                    <CButton
                                                        className="border border-dark mt-4"
                                                        color="success"
                                                        onClick={this.paySOA}
                                                    >
                                                        <i className="mfe-2 fas fa-money-bill-wave" />
                                                        Pay SOA
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">*</th>
                                                            <th scope="col">SOA Number</th>
                                                            <th scope="col">Statement Date</th>
                                                            <th scope="col">Covered Date</th>
                                                            <th scope="col">Aging</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Email Status</th>
                                                            <th scope="col"># of Txns</th>
                                                            <th scope="col">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            [].concat(this.state.soaChargeList)
                                                                .sort((a, b) => a.id > b.id ? 1 : -1)
                                                                .map((soa, index) => {
                                                                    let totalPerSoaPay = 0;
                                                                    soa.transactions.map(txn => {
                                                                        if (txn.soaStatus) {
                                                                            totalPerSoaPay += txn.totalItemAmountDue
                                                                        }
                                                                        return null;
                                                                    })
                                                                    let totalSoa = 0
                                                                    this.state.paidSOAList.map(pay => {
                                                                        if (pay.soaList[0].soaNumber === soa.soaNumber) {
                                                                            totalSoa = soa.soaAmount - totalPerSoaPay
                                                                        }
                                                                        return null;
                                                                    })

                                                                    const today = moment();
                                                                    const startDate = moment(soa.statementDate);

                                                                    const diff = today.diff(startDate);
                                                                    const diffDuration = moment.duration(diff);
                                                                    let aging = "";

                                                                    if (diffDuration.months() > 0) {
                                                                        const month = diffDuration.months();
                                                                        if (month === 1) {
                                                                            aging = month + " month ";
                                                                        } else {
                                                                            aging = month + " months ";
                                                                        }
                                                                    }

                                                                    if (diffDuration.days() > 0) {
                                                                        const day = diffDuration.days();
                                                                        if (day === 1) {
                                                                            aging += day + " day";
                                                                        } else {
                                                                            aging += day + " days";
                                                                        }
                                                                    }


                                                                    return <tr key={soa.id}>
                                                                        <td>
                                                                            {index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;
                                                                            {
                                                                                this.state.selectedChargeTo !== null
                                                                                    ? <CButton
                                                                                        className="btn-sm border border-dark mfe-1"
                                                                                        color="success"
                                                                                        onClick={() => this.viewSOADetails(soa.id)}
                                                                                    >
                                                                                        <i className="mfe-1 far fa-eye" />
                                                                                    </CButton>
                                                                                    : soa.chargeTo
                                                                            }
                                                                            {

                                                                                this.state.selectedChargeTo !== null && soa.notedUser !== null && totalPerSoaPay !== soa.soaAmount
                                                                                    ? <FormControlLabel
                                                                                        control={
                                                                                            <Checkbox
                                                                                                checked={soa.isSelected}
                                                                                                onChange={this.handleCheckBox(soa.id)}
                                                                                                color="primary"
                                                                                                className="p-0"
                                                                                                disabled={false}
                                                                                            />
                                                                                        }
                                                                                        className="m-0"
                                                                                    />
                                                                                    : null
                                                                            }
                                                                        </td>
                                                                        <td>{soa.soaNumber}</td>
                                                                        <td>{soa.statementDate}</td>
                                                                        <td>{soa.coverageDateFrom} to {soa.coverageDateTo}</td>
                                                                        {
                                                                            totalSoa <= 0 ? <td>{this.getSOAStatus(soa) === "PAID" ? "PAID" : aging}</td> : <td>{aging} BAL({totalSoa})</td>
                                                                        }
                                                                        <td>{this.getSOAStatus(soa)}</td>
                                                                        <td>
                                                                            <CRow>
                                                                                <CCol>
                                                                                    {
                                                                                        soa.soaSend ?
                                                                                            <span md="2" className="text-success"><i className="fa fa-envelope " aria-hidden="true"></i> </span> :
                                                                                            <span md="2" className="text-danger"><i className="fa fa-envelope " aria-hidden="true"></i></span>
                                                                                    }
                                                                                </CCol>
                                                                                <CCol>
                                                                                    {
                                                                                        soa.soaRecieve ?
                                                                                            <span md="2" className="text-success"><i className="far fa-envelope-open "></i></span> : soa.soaSend ?
                                                                                                <p md="2" className="text-danger" style={{ cursor: "pointer" }} onClick={() => this.RecieveHandler(soa)}><i className="far fa-envelope-open"></i></p> :
                                                                                                <p md="2" className="text-danger" style={{ cursor: "not-allowed" }} title={!soa.soaSend ? "It must be send before click the recieve icon" : null}><i className="far fa-envelope-open"></i></p>
                                                                                    }
                                                                                </CCol>
                                                                            </CRow>


                                                                        </td>
                                                                        <td className='text-center'>{soa.transactions.length}</td>

                                                                        <td className='text-right'>{twoFixedAmt(soa.soaAmount)}</td>
                                                                    </tr>
                                                                })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
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
                                                        {twoFixedAmt(this.state.SOATotalAmount)}
                                                    </strong>
                                                </CCol>
                                            </CRow>
                                        </TabPanel>
                                    </CCol>
                                    <CCol md="12" className="m-0 p-0">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={3}>
                                            <CRow className="m-0 p-0">
                                                <CCol md="2" className="m-1 p-0">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>List by</CLabel>
                                                    <ReactSelect
                                                        className="basic-single"
                                                        placeholder="--"
                                                        value={this.state.byYear}
                                                        onChange={this.handleSelectChange('byYear')}
                                                        isClearable={false}
                                                        isSearchable={false}
                                                        isLoading={false}
                                                        options={sortBy}
                                                        menuPlacement="bottom"
                                                    />
                                                </CCol>
                                                {

                                                    this.state.byYear.value === "Y" ?
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
                                                        </CCol> :
                                                        <>
                                                            <CCol md="2" className="col-12 p-1">
                                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>From</CLabel>
                                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                                    <DatePicker
                                                                        value={this.state.dateFromValue}
                                                                        format={dateDisplayFormat}
                                                                        inputVariant="outlined"
                                                                        onChange={dateChangeHandler('dateFromValue')}
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
                                                                        value={this.state.dateToValue}
                                                                        format={dateDisplayFormat}
                                                                        inputVariant="outlined"
                                                                        onChange={dateChangeHandler('dateToValue')}
                                                                        showTodayButton
                                                                        disableFuture
                                                                        size="small"
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </CCol>
                                                        </>
                                                }
                                                <CCol md="9" className="m-1 p-0">
                                                </CCol>
                                            </CRow>
                                            <CRow className="m-0 p-0">


                                            </CRow>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Action</th>
                                                            <th scope="col">Payment Date</th>
                                                            <th scope="col">Payment Type</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col"># of SOAs</th>
                                                            <th scope="col">Amount Paid</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            [].concat(this.state.paidSOAList)
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
                                                                        <td>{this.getSOAStatus(pay)}</td>
                                                                        <td className='text-center'>{pay.soaList.length}</td>
                                                                        <td className='text-right'>{twoFixedAmt(pay.paymentAmount + pay.otherAmount + pay.taxWithHeld + pay.addvancePayment)}</td>
                                                                    </tr>
                                                                })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
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
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={4}>
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
                                            <div className="table-responsive">
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
                                                            [].concat(this.state.soaSummaryList)
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
                                            </div>
                                            <CRow className="m-0 p-0">
                                                <CCol md="12" className="col-12 text-right">
                                                    <strong className="mfe-4">
                                                        CURRENT BALANCE :
                                                    </strong>
                                                    <strong>
                                                        {twoFixedAmt(this.state.soaSummaryBalance)}
                                                    </strong>
                                                </CCol>
                                            </CRow>
                                        </TabPanel>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow >
            </CContainer >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.soa.loading,
        loadingPayment: state.soa.loadingPayment,
        error: state.soa.error,
        unbilledList: state.soa.unbilledList,
        soaList: state.soa.soaList,
        paymentList: state.soa.paymentList,
        summaryList: state.soa.summaryList,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        userToken: state.auth.token,
        paymentBanks: state.bran.paymentBanks,
        emailLoading: state.email.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporatescorp(token)),
        onGetPaymentBanks: (token) => dispatch(actions.getPaymentBanks(token)),
        onClearAllSOAList: () => dispatch(actions.clearAllSOAList()),
        onViewSOAUnbilledTransactions: (token, chargeTo, setData) => dispatch(actions.viewSOAUnbilledTransactions(token, chargeTo, setData)),
        onSaveUpdateSOA: (token, soaData, reqType, closeSOAModal) => dispatch(actions.saveUpdateSOA(token, soaData, reqType, closeSOAModal)),
        onViewChargeToSOAList: (token, chargeTo, year, startDate, endDate, byYear, setData) => dispatch(actions.viewChargeToSOAList(token, chargeTo, year, startDate, endDate, byYear, setData)),
        onVerifySOA: (token, chargeTo, soaId, closeSOAModal) => dispatch(actions.verifySOA(token, chargeTo, soaId, closeSOAModal)),
        onNotedSOA: (token, chargeTo, soaId, closeSOAModal) => dispatch(actions.notedSOA(token, chargeTo, soaId, closeSOAModal)),
        onSaveUpdateSOAPayment: (token, payData, reqType, closeSOAModal) => dispatch(actions.saveUpdateSOAPayment(token, payData, reqType, closeSOAModal)),
        onViewSOAPaymentList: (token, chargeTo, year, startDate, endDate, byYear, setData) => dispatch(actions.viewSOAPaymentList(token, chargeTo, year, startDate, endDate, byYear, setData)),
        onGetChargeToSOAExcel: (token, chargeTo, soaId, soaNumber) => dispatch(actions.getChargeToSOAExcel(token, chargeTo, soaId, soaNumber)),
        onPrintChargeToSOA: (token, chargeTo, soaId, withHeaderFooter, withRunningBalance, year) => dispatch(actions.printChargeToSOA(token, chargeTo, soaId, withHeaderFooter, withRunningBalance, year)),
        onSendChargeToSOA: (token, emailValues, chargeTo, soaId, closeModal, year, withRunningBalance) => dispatch(actions.sendChargeToSOA(token, emailValues, chargeTo, soaId, closeModal, year, withRunningBalance)),
        onRecieveChargeToSOA: (token, chargeTo, soaId, closeModal, year) => dispatch(actions.recieveChargeToSOA(token, chargeTo, soaId, closeModal, year)),
        onVerifySOAPayment: (token, chargeTo, soaId, closeSOAPayment) => dispatch(actions.verifySOAPayment(token, chargeTo, soaId, closeSOAPayment)),
        onAuditedSOAPayment: (token, chargeTo, soaId, closeSOAPayment, controlNumber) => dispatch(actions.auditedSOAPayment(token, chargeTo, soaId, closeSOAPayment, controlNumber)),
        onViewSOASummaryList: (token, chargeTo, year, setData) => dispatch(actions.viewSOASummaryList(token, chargeTo, year, setData)),
        onUploadPaymentImage: (token, changeTo, paymentid, file, closeSOAPayment) => dispatch(actions.uploadPaymentImage(token, changeTo, paymentid, file, closeSOAPayment)),
        onAddAdvancePayment: (token, chargeTo, amount) => dispatch(actions.addAdvancePayment(token, chargeTo, amount)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SOA));