import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactSelect from 'react-select'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CButton,
    CButtonGroup,
    CCol,
    CLabel,
    CRow,
} from '@coreui/react';

import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
} from '@material-ui/core';

import { updateObject, closeCurrentWindow, twoFixedAmt } from 'src/store/utility';
import Swal from 'sweetalert2';

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

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#4267B2',
        padding: theme.spacing(2),
        textAlign: 'left',
        height: 270,
    },
    summaryAmount: {
        textAlign: 'right',
        fontWeight: 'bold',
        width: '100%',
    },
    tabPanel: {
        width: '100%',
        padding: '0',
    },
    margin: {
        margin: theme.spacing(0),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    sumBgColor: {
        backgroundColor: 'white',
    },
    txnButtons: {
        backgroundColor: 'white',
        height: '45px'
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
    imgSize: {
        height: '250px',
        backgroundColor: 'white'
    },
    selectStyles: {
        zIndex: 1000
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 270,
        },
    },
};

const SummaryDetails = (props) => {
    const classes = useStyles();

    const handleOptionChange = (event) => {
        let payTab = props.txns.payTab;
        let resetDisc = false;
        let amountReceive = props.txns.amtRcv;
        switch (event.target.value) {
            case 'CA':
                payTab = 0;
                amountReceive = 0;
                break;

            case 'B':
                payTab = 1;
                resetDisc = true;
                amountReceive = props.txns.amtDue;
                break;

            case 'C':
                payTab = 2;
                resetDisc = true;
                amountReceive = props.txns.amtDue;
                break;

            case 'VR':
                payTab = 3;
                resetDisc = true;
                amountReceive = props.txns.amtDue;
                break;
            default:
                break;
        }
        const discounts = {};
        if (resetDisc) {
            discounts.dscType = '0';
            discounts.discRate = 0;
            discounts.discAmnt = 0;
        }

        const updateTxnData = updateObject(props.txns, {
            payType: event.target.value,
            payTab: payTab,
            amtRcv: amountReceive,
            amtChg: amountReceive - props.txns.amtDue,
            ...discounts
        });
        props.setTxnData(updateTxnData, {
            payments: {
                billerid: null,
                payMode: '',
                bank: '',
                ccType: '',
                ccNumber: '',
                ccHolderName: '',
                ccCVV: '',
                ccExpireMonth: '',
                ccExpireYear: '',
                hmoLOE: '',
                hmoAccountNumber: '',
                hmoApprovalCode: '',
                referenceNumber: '',
            }
        });
    }
 
    const handleotherAmount  = (event) => {
        // let updatedOtherAmount = 0;
        if (event.target.value !== '') {
            // updatedOtherAmount = parseFloat(event.target.value);
        }

        const updateTxnData = updateObject(props.txns, {
            otherAmnt: event.target.value,
        });
        props.setTxnData(updateTxnData);
    }
    const handleChangeReceiveAmount = (event) => {
        let updatedRcvAmount = 0;
        if (event.target.value !== '') {
            updatedRcvAmount = parseFloat(event.target.value);
        }

        const amountDue = props.txns.amtDue;
        const changeAmount = updatedRcvAmount - amountDue;
        const updateTxnData = updateObject(props.txns, {
            amtRcv: event.target.value,
            amtChg: changeAmount,
        });
        props.setTxnData(updateTxnData);
    };

    const addTenderedAmount = (amount) => {
        let updatedRcvAmount = 0;
        if (props.txns.amtRcv !== '') {
            updatedRcvAmount = parseFloat(props.txns.amtRcv);
        }

        updatedRcvAmount += amount;

        const amountDue = props.txns.amtDue;
        const changeAmount = updatedRcvAmount - amountDue;
        const updateTxnData = updateObject(props.txns, {
            amtRcv: updatedRcvAmount,
            amtChg: changeAmount,
        });

        props.setTxnData(updateTxnData);
    }

    const clearAmountReceive = () => {
        const amountDue = props.txns.amtDue;
        const changeAmount = 0 - amountDue;
        const updateTxnData = updateObject(props.txns, {
            amtRcv: 0,
            amtChg: changeAmount,
        });

        props.setTxnData(updateTxnData);
    }

    const exactAmountHandler = () => {
        const updateTxnData = updateObject(props.txns, {
            amtRcv: props.txns.amtDue,
            amtChg: 0,
        });

        props.setTxnData(updateTxnData);
    }

    const handleInputChange = (prop) => (event) => {
        const updatePayData = updateObject(props.pays, {
            [prop]: event.target.value,
        });
        props.setPayData(updatePayData, prop);
    };

    const getCurrentYear = () => {
        const currentYear = parseInt(moment().format('YYYY'));
        const years = [];
        for (let year = currentYear; year < (currentYear + 5); year++) {
            years.push(year);
        }
        return years;
    }

    const handleStateSelectChange = (prop) => (selectedOption) => {
        const updatePayData = updateObject(props.pays, {
            [prop]: selectedOption,
        });
        props.setPayData(updatePayData, prop);
    }


    const handleClick = (prop) => () => {
        let status = false;
        switch (prop) {
            case 'show':
                if (props.txns.payType !== "CA") {
                    status = true
                }
                break;
            case 'hide':
                status = false
                break;
            default:
                break;
        }
        const updatePayData = updateObject(props.pays, {
            ['otherPayment']: status
        });
        props.setPayData(updatePayData, 'otherPayment');
    }
    useEffect(() => {
        const updatePayData = updateObject(props.pays, {
            ['otherPayment']: false
        });
        props.setPayData(updatePayData, 'otherPayment');
    }, [props.txns.payType])

    const chargeTo = (
        <FormControl error={props.pays.isErrorBiller} fullWidth className={clsx(classes.margin)} variant="outlined">
            <ReactSelect
                className={clsx(classes.selectStyles, "basic-single")}
                placeholder="Charge"
                value={props.pays.billerid}
                onChange={handleStateSelectChange('billerid')}
                isClearable={true}
                isSearchable={true}
                isLoading={props.corpsLoading}
                options={
                    [].concat(props.corporateList)
                        .sort((a, b) => a.companyName > b.companyName ? 1 : -1)
                        .map((corp) => {
                            return {
                                value: corp.corporateid,
                                label: corp.companyName,
                                email: corp.resultEmail
                            }
                        })
                }
                isDisabled={props.disableAllButtons}
            />
        </FormControl >
    );

    let transactionButtons = null;
    if (props.isUpdate) {
        let disableButton = true;
        if (props.txns.patientId !== null && props.itmList.length > 0 && props.branch !== null) {
            disableButton = false;
        }

        switch (props.txns.status) {
            case 'SPD': // PROCESS
                transactionButtons = (
                    <div className="row p-1">
                        <CButton className="mfe-1" color="primary" disabled={disableButton} onClick={() => props.saveTxn(false)}>UPDATE</CButton>
                        <CButton className="mfe-1" color="success" disabled={disableButton} onClick={() => props.saveTxn(true)}>UPDATE &amp; PRINT</CButton>
                        <CButton className="mfe-1 border border-dark" color="danger" onClick={closeCurrentWindow}>CLOSE</CButton>
                    </div>
                )
                break;

            case 'SHO': // HOLD
                transactionButtons = (
                    <div className="row p-1">
                        <CButton className="mfe-1 border border-dark" color="secondary" onClick={() => props.cancelTxn()} >CANCEL</CButton>
                        <CButton className="mfe-1 border border-dark" disabled={disableButton} color="primary" onClick={() => props.saveTxn(false)}>SAVE</CButton>
                        <CButton className="mfe-1 border border-dark" disabled={disableButton} color="success" onClick={() => props.saveTxn(true)}>SAVE &amp; PRINT</CButton>
                        <CButton className="mfe-1 border border-dark" color="danger" onClick={closeCurrentWindow}>CLOSE</CButton>
                    </div>
                )
                break;

            case 'SRE': // REFUNDED
            case 'SCA': // CANCELLED
                transactionButtons = (
                    <div className="row p-1">
                        <CButton className="mfe-1 border border-dark" color="danger" onClick={closeCurrentWindow}>CLOSE</CButton>
                    </div>
                )
                break;
            default:
                break;
        }
    } else { // new transaction
        if (props.txns.status === 'SHO') { // ON HOLD TRANSACTION
            transactionButtons = (
                <div className="row p-1">
                    <CButton className="mfe-1 border border-dark" color="secondary" onClick={() => props.cancelTxn()} >CANCEL</CButton>
                    <CButton className="mfe-1 border border-dark" color="primary" onClick={() => props.saveTxn(false)}>SAVE</CButton>
                    <CButton className="mfe-1 border border-dark" color="success" onClick={() => props.saveTxn(true)}>SAVE &amp; PRINT</CButton>
                    <CButton className="mfe-1 border border-dark" color="secondary" onClick={() => clrTxn()}>CLEAR</CButton>
                </div>
            )
        } else { // NEW TRANSACTION
            let disableButton = true;
            if (props.txns.patientId !== null && props.itmList.length > 0) {
                disableButton = false;
            }

            let disableOnHold = false;
            if (props.txns.patientId !== null || props.itmList.length > 0) {
                disableOnHold = true;
            }

            transactionButtons = (
                <div className="row p-1">
                    <CButton className="mfe-1 border border-dark" disabled={disableButton} color="secondary" onClick={() => props.holdTxn()}>HOLD</CButton>
                    <CButton className="mfe-1 border border-dark" disabled={disableButton} color="primary" onClick={() => props.saveTxn(false)}>SAVE</CButton>
                    <CButton className="mfe-1 border border-dark" disabled={disableButton} color="success" onClick={() => props.saveTxn(true)}>SAVE &amp; PRINT</CButton>
                    <CButton className="mfe-1 border border-dark" disabled={disableOnHold} color="light" onClick={() => props.onHoldTxn()}>HELD</CButton>
                    <CButton className="mfe-1 border border-dark" disabled={disableButton} color="secondary" onClick={() => clrTxn()}>CANCEL</CButton>
                </div>
            )

        }
    }

    const clrTxn = () => {
        Swal.fire({
            title: 'Are you sure to clear this transaction?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                props.clearTxn();
            }
        })
    }

    return (
        <Paper className={clsx(classes.paper, 'p-2')}>
            <div className="container m-0" onClick={getCurrentYear}>
                <div className="row">

                    <div className="col-md-3">
                        {/** possible notes or announcements for the cashiers*/}
                        <img className={clsx(classes.imgSize, "p-1 rounded")} src="images/QPDXXX.png" alt="pic" />
                    </div>

                    <div className="col-12 col-md-6 pl-0">
                        <div className={clsx(classes.sumBgColor, classes.boxShadow, 'row m-0 border rounded')}>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className={clsx("btn btn-info border border-white", props.txns.payType === 'CA' ? "active" : "")}>
                                    <input type="radio" value="CA"
                                        checked={props.txns.payType === 'CA'}
                                        onChange={handleOptionChange}
                                        disabled={props.disableAllButtons}
                                    />
                                    CASH
                                </label>
                                <label className={clsx("btn btn-info border border-white", props.txns.payType === 'B' ? "active" : "")}>
                                    <input type="radio" value="B"
                                        checked={props.txns.payType === 'B'}
                                        onChange={handleOptionChange}
                                        disabled={props.disableAllButtons}
                                    />
                                    BANK
                                </label>
                                <label className={clsx("btn btn-info border border-white", props.txns.payType === 'C' ? "active" : "")}>
                                    <input type="radio" value="C"
                                        checked={props.txns.payType === 'C'}
                                        onChange={handleOptionChange}
                                        disabled={props.disableAllButtons}
                                    />
                                    CHARGE
                                </label>
                                <label className={clsx("btn btn-info border border-white", props.txns.payType === 'VR' ? "active" : "")}>
                                    <input type="radio" value="VR"
                                        checked={props.txns.payType === 'VR'}
                                        onChange={handleOptionChange}
                                        disabled={props.disableAllButtons}
                                    />
                                    VIRTUAL
                                </label>

                                <label className={clsx("btn btn-info border border-white")}
                                    onClick={handleClick('show')}>
                                    OTHER
                                </label>
                            </div>
                        </div>
                        <div className={clsx(classes.sumBgColor, classes.boxShadow, 'row m-0 mt-2 border rounded')}>
                            <TabPanel className={classes.tabPanel} value={props.txns.payTab} index={0}>
                                <div className="row m-1 p-0">
                                    <div className="col-12 col-md-2 p-0 mt-1">
                                        Tendered:
                                    </div>
                                    <div className="col-12 col-md-10 p-0">
                                        <CButtonGroup className="btn-group-sm">
                                            <CButton color="light border border-success" disabled={props.disableAllButtons} onClick={() => addTenderedAmount(20)}>20</CButton>
                                            <CButton color="light border border-success" disabled={props.disableAllButtons} onClick={() => addTenderedAmount(50)}>50</CButton>
                                            <CButton color="light border border-success" disabled={props.disableAllButtons} onClick={() => addTenderedAmount(100)}>100</CButton>
                                            <CButton color="light border border-success" disabled={props.disableAllButtons} onClick={() => addTenderedAmount(200)}>200</CButton>
                                            <CButton color="light border border-success" disabled={props.disableAllButtons} onClick={() => addTenderedAmount(500)}>500</CButton>
                                            <CButton color="light border border-success" disabled={props.disableAllButtons} onClick={() => addTenderedAmount(1000)}>1000</CButton>
                                        </CButtonGroup>
                                    </div>
                                </div>
                                <div className="row m-1 p-0">
                                    <div className="col-12 col-md-2 p-0">
                                        Amount Received:
                                    </div>
                                    <div className="col-12 col-md-3 p-0">
                                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                            <OutlinedInput
                                                type="number"
                                                min={0}
                                                value={props.txns.amtRcv}
                                                onChange={handleChangeReceiveAmount}
                                                margin="dense"
                                                className={classes.outlinedInput}
                                                disabled={props.disableAllButtons}
                                            />
                                        </FormControl>
                                    </div>
                                    &nbsp;
                                    <div className="col-12 col-md-2 p-0 mt-2">
                                        <FormControl className={clsx(classes.margin)} variant="outlined">
                                            <CButton
                                                className="border border-dark"
                                                color="success"
                                                onClick={exactAmountHandler}
                                                disabled={props.disableAllButtons}
                                            >EXACT</CButton>
                                        </FormControl>
                                    </div>
                                    <div className="col-12 col-md-4 p-0 mt-2">
                                        <FormControl className={clsx(classes.margin)} variant="outlined">
                                            <CButton
                                                className="border border-dark"
                                                color="success"
                                                onClick={clearAmountReceive}
                                                disabled={props.disableAllButtons}
                                            >CLEAR</CButton>
                                        </FormControl>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className={classes.tabPanel} value={props.txns.payTab} index={1}>
                                <CRow className="m-1 p-0">
                                    <CCol md="6" className="col-12 p-1">
                                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-virtual-payment-mode-bank">Type</InputLabel>
                                            <Select
                                                labelid="outlined-adornment-virtual-payment-mode-bank"
                                                id="outlined-adornment-virtual-payment-mode-bank-id"
                                                value={props.pays.payMode}
                                                onChange={handleInputChange('payMode')}
                                                label="Type"
                                                margin="dense"
                                                className="mt-2"
                                                MenuProps={MenuProps}
                                                disabled={props.disableAllButtons}
                                            >
                                                <MenuItem value=''>----</MenuItem>
                                                <MenuItem value='CC'>CREDIT CARD</MenuItem>
                                                <MenuItem value='DC'>DEBIT CARD</MenuItem>
                                                <MenuItem value='CQ'>CHEQUE</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CCol>
                                    <CCol md="5" className="col-12 p-1">
                                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-virtual-payment-mode-btype">Bank</InputLabel>
                                            <Select
                                                labelid="outlined-adornment-virtual-payment-mode-btype"
                                                id="outlined-adornment-virtual-payment-mode-btype-id"
                                                value={props.pays.bank}
                                                onChange={handleInputChange('bank')}
                                                label="Bank"
                                                margin="dense"
                                                className="mt-2"
                                                MenuProps={MenuProps}
                                                disabled={props.disableAllButtons}
                                            >
                                                <MenuItem value=''>----</MenuItem>
                                                {
                                                    [].concat(props.paymentBanks)
                                                        .map((pb) => {
                                                            return <MenuItem key={pb.key} value={pb.key}>{pb.value}</MenuItem>
                                                        })
                                                }
                                            </Select>
                                        </FormControl>
                                    </CCol>
                                </CRow>
                                <CRow className="m-1 p-0">
                                    {
                                        props.pays.payMode === 'CC'
                                            ? <CCol md="6" className="col-12 p-1">
                                                <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-card-type">Card Type</InputLabel>
                                                    <Select
                                                        labelid="outlined-adornment-card-type"
                                                        id="outlined-adornment-card-type-id"
                                                        value={props.pays.ccType}
                                                        onChange={handleInputChange('ccType')}
                                                        label="Card Type"
                                                        margin="dense"
                                                        className="mt-2"
                                                        MenuProps={MenuProps}
                                                        disabled={props.disableAllButtons}
                                                    >
                                                        <MenuItem value=''>----</MenuItem>
                                                        <MenuItem value='MC'>MASTER CARD</MenuItem>
                                                        <MenuItem value='VC'>VISA CARD</MenuItem>
                                                        <MenuItem value='AMEX'>AMERICAN EXPRESS</MenuItem>
                                                        <MenuItem value='DC'>DISCOVER</MenuItem>
                                                        <MenuItem value='JCB'>JCB</MenuItem>
                                                        <MenuItem value='MA'>MAESTRO</MenuItem>
                                                    </Select>
                                                </FormControl>

                                            </CCol>
                                            : null
                                    }
                                    <CCol md="6" className="col-12 p-1">
                                        <FormControl error={props.pays.isErrorCCNumber} fullWidth className={clsx(classes.margin)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-cc-holder-name">Card/Cheque Number</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-cc-holder-name"
                                                value={props.pays.cardChequeNo}
                                                onChange={handleInputChange('cardChequeNo')}
                                                labelWidth={160}
                                                margin="dense"
                                                size="small"
                                                className={classes.outlinedInput}
                                                disabled={props.disableAllButtons}
                                            />
                                        </FormControl>
                                    </CCol>
                                </CRow>
                                {
                                    props.pays.payMode === 'CC'
                                        ? <CRow className="m-1 p-0">
                                            <CCol md="6" className="col-12 p-1">
                                                <FormControl error={props.pays.isErrorCCNumber} fullWidth className={clsx(classes.margin)} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-cc-holder-name">Card Holder Name</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-cc-holder-name"
                                                        value={props.pays.ccHolderName}
                                                        onChange={handleInputChange('ccHolderName')}
                                                        labelWidth={160}
                                                        margin="dense"
                                                        size="small"
                                                        className={classes.outlinedInput}
                                                        disabled={props.disableAllButtons}
                                                    />
                                                </FormControl>
                                            </CCol>
                                        </CRow>
                                        : null
                                }
                            </TabPanel>
                            <TabPanel className={classes.tabPanel} value={props.txns.payTab} index={2}>
                                <CRow className="m-1 p-0">
                                    <CCol md="5" className="col-12 p-1">
                                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-virtual-payment-mode-charge">Type</InputLabel>
                                            <Select
                                                labelid="outlined-adornment-virtual-payment-mode-charge"
                                                id="outlined-adornment-virtual-payment-mode-charge-id"
                                                value={props.pays.payMode}
                                                onChange={handleInputChange('payMode')}
                                                label="Type"
                                                margin="dense"
                                                className="mt-2"
                                                MenuProps={MenuProps}
                                                disabled={props.disableAllButtons}
                                            >
                                                <MenuItem value=''>----</MenuItem>
                                                <MenuItem value='ACCT'>ACCOUNT</MenuItem>
                                                <MenuItem value='HMO'>HMO</MenuItem>
                                                <MenuItem value='APE'>APE</MenuItem>
                                                <MenuItem value='MMO'>MEDICAL MISSION</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CCol>
                                    <CCol md="7" className="col-12 p-1 mt-2">
                                        {chargeTo}
                                    </CCol>
                                </CRow>
                                {
                                    props.pays.payMode === 'HMO'
                                        ? <CRow className="m-1 p-0">
                                            <CCol md="4" className="col-12 p-1">
                                                <FormControl error={props.pays.isErrorHmoLOE} fullWidth className={clsx(classes.margin)} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-hmo-loe">LOE</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-hmo-loe"
                                                        value={props.pays.hmoLOE}
                                                        onChange={handleInputChange('hmoLOE')}
                                                        labelWidth={35}
                                                        margin="dense"
                                                        size="small"
                                                        className={classes.outlinedInput}
                                                        disabled={props.disableAllButtons}
                                                    />
                                                </FormControl>
                                            </CCol>
                                            <CCol md="4" className="col-12 p-1">
                                                <FormControl error={props.pays.isErrorHmoAccNo} fullWidth className={clsx(classes.margin)} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-hmo-acct-no">Account No.</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-hmo-acct-no"
                                                        value={props.pays.hmoAccountNumber}
                                                        onChange={handleInputChange('hmoAccountNumber')}
                                                        labelWidth={75}
                                                        margin="dense"
                                                        size="small"
                                                        className={classes.outlinedInput}
                                                        disabled={props.disableAllButtons}
                                                    />
                                                </FormControl>
                                            </CCol>
                                            <CCol md="4" className="col-12 p-1">
                                                <FormControl error={props.pays.isErrorHmoAppCd} fullWidth className={clsx(classes.margin)} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-hmo-app-code">Approval Code</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-hmo-app-code"
                                                        value={props.pays.hmoApprovalCode}
                                                        onChange={handleInputChange('hmoApprovalCode')}
                                                        labelWidth={110}
                                                        margin="dense"
                                                        size="small"
                                                        className={classes.outlinedInput}
                                                        disabled={props.disableAllButtons}
                                                    />
                                                </FormControl>
                                            </CCol>
                                        </CRow>
                                        : null
                                }
                            </TabPanel>
                            <TabPanel className={classes.tabPanel} value={props.txns.payTab} index={3}>
                                <CRow className="m-1 p-0">
                                    <CCol md="5" className="col-12 p-1">
                                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-virtual-payment-mode-virtual">Type</InputLabel>
                                            <Select
                                                labelid="outlined-adornment-virtual-payment-mode-virtual"
                                                id="outlined-adornment-virtual-payment-mode-virtual-id"
                                                value={props.pays.payMode}
                                                onChange={handleInputChange('payMode')}
                                                label="Type"
                                                margin="dense"
                                                className="mt-2"
                                                MenuProps={MenuProps}
                                                disabled={props.disableAllButtons}
                                            >
                                                <MenuItem value=''>----</MenuItem>
                                                <MenuItem value='GCA'>GCASH</MenuItem>
                                                <MenuItem value='PMA'>PAYMAYA</MenuItem>
                                                <MenuItem value='WT'>WIRE TRANSFER</MenuItem>
                                                <MenuItem value='PMO'>PAYMONGO</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CCol>
                                    <CCol md="5" className="col-12 p-1">
                                        <FormControl error={props.pays.isErrorRefNo} fullWidth className={clsx(classes.margin)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-virtual-reference">Reference Number</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-virtual-reference"
                                                value={props.pays.referenceNumber}
                                                onChange={handleInputChange('referenceNumber')}
                                                labelWidth={140}
                                                margin="dense"
                                                size="small"
                                                className={classes.outlinedInput}
                                                disabled={props.disableAllButtons}
                                            />
                                        </FormControl>
                                    </CCol>
                                </CRow>
                            </TabPanel>
                        </div>
                        {props.pays.otherPayment && props.txns.payType !== 'CA'?
                            <div className={clsx(classes.sumBgColor, classes.boxShadow, 'row m-0 mt-1 border rounded')}>
                                <div className="col-3 col-md-3 p-3">
                                    Other Amount:
                                </div>
                                <div className="col-3 col-md-3 p-0">
                                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                        <OutlinedInput
                                            type="number"
                                            min={0}
                                            value={props.txns.otherAmnt}
                                            onChange={handleotherAmount}
                                            margin="dense"
                                            className={classes.outlinedInput}
                                            disabled={props.disableAllButtons}
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-3 col-md-3 p-3 text-danger">
                                   *CASH ONLY
                                </div>
                                <div className="col-3 col-md-3 p-3 text-danger d-flex flex-row-reverse"
                                onClick={handleClick('hide')}>
                                <i class="fas fa-window-close"></i>
                                </div>
                                
                            </div> : null}


                        <div className={clsx(classes.boxShadow, "row m-0 mt-2 border rounded")}>
                            <div className={clsx(classes.txnButtons, "col-12")}>
                                {transactionButtons}
                            </div>
                        </div>
                    </div>



                    <div className={clsx(classes.bgTotalSum, classes.boxShadow, "col-12 col-md-3 text-white p-3 border border-dark rounded")}>
                        <div className="row mr-1 ml-1 font-weight-bold border-bottom">
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0")}>
                                <CLabel>Sub Total:</CLabel>
                            </div>
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0")}>
                                <CLabel className={classes.summaryAmount}>{twoFixedAmt(props.txns.subTtl)}</CLabel>
                            </div>
                        </div>
                        <div className="row mr-1 ml-1">
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 font-weight-bold")}>
                                <CLabel>Tax:</CLabel>
                            </div>
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0")}>
                                <CLabel className={classes.summaryAmount}>{twoFixedAmt(props.txns.taxAmnt)}</CLabel>
                            </div>
                        </div>
                        <div className="row mr-1 ml-1">
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 font-weight-bold")}>
                                <CLabel>Discount:</CLabel>
                            </div>
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0")}>
                                <CLabel className={classes.summaryAmount}>{twoFixedAmt(props.txns.discAmnt)}</CLabel>
                            </div>
                        </div>
                        <div className={clsx(classes.bgChange, classes.boxShadow, "row mr-1 ml-1 mb-1 rounded")}>
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 pl-2 font-weight-bold")}>
                                <CLabel>CHANGE:</CLabel>
                            </div>
                            <div className={clsx(classes.txtShadow, "col-12 col-md-6 p-0 font-weight-bold rounded mb-1 pr-2 pt-1 text-right")}>
                                <CLabel className={classes.summaryAmount}>{twoFixedAmt(props.txns.amtChg)}</CLabel>
                            </div>
                        </div>

                        <div className={clsx(classes.boxShadow, "row mr-1 ml-1 bg-success p-1 rounded")}>
                            <div className="col-12 col-md-12 p-0">
                                <CLabel className={clsx(classes.txtShadow, "h4 font-weight-bold")}>Amount Due:</CLabel>
                            </div>
                            <div className="col-12 col-md-12 p-0">
                                <CLabel className={clsx(classes.summaryAmount, classes.txtShadow, "h4")}>{twoFixedAmt(props.txns.amtDue)}</CLabel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Paper >
    )
}

const mapStateToProps = (state) => {
    return {
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        paymentBanks: state.bran.paymentBanks,
    }
};

export default connect(mapStateToProps)(SummaryDetails)
