import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { twoFixedAmt } from 'src/store/utility'

import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';

const useStyles = makeStyles((theme) => ({
    boldText: {
        fontWeight: 'bold',
    },
    rightAlign: {
        textAlign: 'right',
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    },
}));

const Summary = (props) => {
    const classes = useStyles();
    const [noSales, setNoSales] = useState(0);
    const [noHold, setNoHold] = useState(0);
    const [noCash, setNoCash] = useState(null);
    const [noRefund, setNoRefund] = useState(0);
    const [noHMO, setNoHMO] = useState(0);
    const [noAccounts, setNoAccounts] = useState(0);
    const [noAPE, setNoAPE] = useState(0);
    const [noBank, setNoBank] = useState(0);
    const [noVirtual, setNoVitual] = useState(0);

    const [cashIn, setCashIn] = useState(0);
    const [cashOut, setCashOut] = useState(0);

    const [totalSalesAmount, setTotalSalesAmount] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);

    const [branchSales, setBranchSales] = useState(null);

    const [cashAmount, setCashAmount] = useState(0);
    const [accountAmount, setAccountAmount] = useState(0);
    const [hmoAmount, setHMOAmount] = useState(0);
    const [apeAmount, setAPEAmount] = useState(0);
    const [medicalMission, setMedicalMission] = useState(0);
    const [medicalService, setMedicalService] = useState(0);
    const [bankAmount, setBankAmount] = useState(0);
    const [virtualAmount, setVirtualAmount] = useState(0);
    const [nonCashAmount, setNonCashAmount] = useState(0);
    const [cashDeposit, setCashDeposit] = useState(0);
    const [actualDeposit, setActualDeposit] = useState(0);

    const [auditorOtherNotes, setAuditorOtherNotes] = useState(0);
    const [auditorReferenceNum, setAuditorReferenceNum] = useState(0);

    const [CashDiscount, setCashDiscount] = useState(0);

    useEffect(() => {
        let nSales = 0;
        let nHold = 0;
        let nCash = null;
        let nRefund = 0;
        let nHMO = 0;
        let nAccounts = 0;
        let nAPE = 0;
        let nBank = 0;
        let nVirtual = 0;

        let cashAmount = 0;
        let accountAmount = 0;
        let hmoAmount = 0;
        let apeAmount = 0;
        let medicalMissionAmount = 0;
        let bankAmount = 0;
        let virtualAmount = 0;
        let holdAmount = 0;
        let refundAmount = 0;
        let medicalServiceAmount = 0;

        let actualDeposit = 0;

        let cashIn = 0;
        let cashOut = 0;
        let totalSalesAmount = 0;
        let taxAmount = 0;
        let discountAmount = 0;
        let netAmount = 0;

        let branchSales = [];

        let auditorOtNo = '';
        let referenceNumber = '';

        let cashDiscount = 0;

        if (props.eodData !== null) {
            const summ = props.eodData.summary;
            auditorOtNo = summ.eodOtherNotes;
            referenceNumber = summ.referenceNumber;

            nSales = summ.totalSales;
            cashIn = summ.cashInAmount;
            cashOut = summ.cashOutAmount;

            cashAmount = summ.cashAmount;
            accountAmount = summ.accountsAmount;
            hmoAmount = summ.hmoAmount;
            apeAmount = summ.apeAmount;
            medicalMissionAmount = summ.medicalMission;
            medicalServiceAmount = summ.medicalService;
            bankAmount = summ.bankAmount;
            virtualAmount = summ.virtualAmount;
            holdAmount = summ.holdAmount;
            refundAmount = summ.refundAmount;

            totalSalesAmount = summ.totalSalesAmount;
            taxAmount = summ.taxAmount;

            discountAmount = summ.discountAmount;
            netAmount = summ.netAmount;

            cashDiscount = summ.cashDiscount;

            const list = {
                accounts: props.eodData.accounts,
                cash: props.eodData.cash,
                ape: props.eodData.ape,
                hmo: props.eodData.hmo,
                hold: props.eodData.hold,
                refund: props.eodData.refund,
                bank: props.eodData.bank,
                virtual: props.eodData.virtual,
            }

            if (list.hold !== undefined && list.hold !== null) {
                nHold = list.hold.length;
            }

            if (list.refund !== undefined && list.refund !== null) {
                nRefund = list.refund.length;
            }

            if (list.cash !== undefined && list.cash !== null) {
                nCash = list.cash.length;
            }

            if (list.hmo !== undefined && list.hmo !== null) {
                nHMO = list.hmo.length;
            }

            if (list.accounts !== undefined && list.accounts !== null) {
                nAccounts = list.accounts.length;
            }

            if (list.ape !== undefined && list.ape !== null) {
                nAPE = list.ape.length;
            }

            if (list.bank !== undefined && list.bank !== null) {
                nBank = list.bank.length;
            }

            if (list.virtual !== undefined && list.virtual !== null) {
                nVirtual = list.virtual.length;
            }

            const bs = props.eodData.branchSales;
            Object.keys(bs).forEach(s => {
                const sale = (
                    <CRow key={s}>
                        <CCol md="8">Total {s} :</CCol>
                        <CCol md="4" className={classes.rightAlign}>{twoFixedAmt(bs[s])}</CCol>
                    </CRow>
                )
                branchSales.push(sale);
            });
            if (holdAmount !== 0) {
                const held = (
                    <CRow key={'Held'}>
                        <CCol md="8">Total Held :</CCol>
                        <CCol md="4" className={classes.rightAlign}>{twoFixedAmt(holdAmount)}</CCol>
                    </CRow>
                )
                branchSales.push(held);
            }
        }

        setNoSales(nSales);
        setNoHold(nHold);
        setNoCash(nCash);
        setNoRefund(nRefund);
        setNoHMO(nHMO);
        setNoAccounts(nAccounts);
        setNoAPE(nAPE);
        setNoBank(nBank);
        setNoVitual(nVirtual);

        setCashIn(cashIn);
        setCashOut(cashOut);
        setMedicalService(medicalServiceAmount);
        setTotalSalesAmount(totalSalesAmount);
        setTaxAmount(taxAmount);
        setDiscountAmount(discountAmount);
        setNetAmount(netAmount);

        setCashAmount(cashAmount);
        setAccountAmount(accountAmount);
        setHMOAmount(hmoAmount);
        setAPEAmount(apeAmount);
        setMedicalMission(medicalMissionAmount)
        setBankAmount(bankAmount);
        setVirtualAmount(virtualAmount);
        setCashDiscount(cashDiscount);

        const nonCashAmount = accountAmount + hmoAmount + apeAmount + bankAmount + virtualAmount;
        setNonCashAmount(nonCashAmount);

        let cashDeposit = cashAmount - cashDiscount - refundAmount - medicalServiceAmount;
        cashDeposit -= refundAmount;
        setCashDeposit(cashDeposit);
        setActualDeposit(actualDeposit);

        setAuditorReferenceNum(referenceNumber);
        setAuditorOtherNotes(auditorOtNo);
        setBranchSales(branchSales);

        
    }, [props.eodData, classes.rightAlign])

    return (
        <CCard className="mb-1">
            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                <h6 className="m-1">SUMMARY</h6>
            </CCardHeader>
            <CCardBody className="p-1">
                <CRow>
                    <CCol>RECEIPT COUNTS</CCol>
                </CRow>
                {
                    noCash !== null
                        ? <>
                            <CRow>
                                <CCol md="4">Sales :</CCol>
                                <CCol md="2" className={clsx(classes.rightAlign)}>{noSales}</CCol>
                            </CRow>
                            <CRow>
                                <CCol md="4">Cash :</CCol>
                                <CCol md="2" className={clsx(classes.rightAlign)}>{noCash}</CCol>
                                <CCol md="4">Refund :</CCol>
                                <CCol md="2" className={clsx(classes.rightAlign)}>{noRefund}</CCol>
                            </CRow>
                        </>
                        : <>
                            <CRow>
                                <CCol md="4">Sales :</CCol>
                                <CCol md="2" className={clsx(classes.rightAlign)}>{noSales}</CCol>
                                <CCol md="4">Refund :</CCol>
                                <CCol md="2" className={clsx(classes.rightAlign)}>{noRefund}</CCol>
                            </CRow>
                        </>
                }
                <CRow>
                    <CCol md="4">Held :</CCol>
                    <CCol md="2" className={clsx(classes.rightAlign)}>{noHold}</CCol>
                    <CCol md="4">HMO :</CCol>
                    <CCol md="2" className={clsx(classes.rightAlign)}>{noHMO}</CCol>
                </CRow>
                <CRow>
                    <CCol md="4">Accounts :</CCol>
                    <CCol md="2" className={clsx(classes.rightAlign)}>{noAccounts}</CCol>
                    <CCol md="4">APE :</CCol>
                    <CCol md="2" className={clsx(classes.rightAlign)}>{noAPE}</CCol>
                </CRow>
                <CRow>
                    <CCol md="4">Banks :</CCol>
                    <CCol md="2" className={clsx(classes.rightAlign)}>{noBank}</CCol>
                    <CCol md="4">Virtual :</CCol>
                    <CCol md="2" className={clsx(classes.rightAlign)}>{noVirtual}</CCol>
                </CRow>
                <hr />
                <CRow>
                    <CCol md="6">
                        <CRow>
                            <CCol md="8">Paid In :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(cashIn)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Paid Out :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(cashOut)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Total Sales Amount :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(totalSalesAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Tax Amount :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(taxAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Discount Amount :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(discountAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Net Amount :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(netAmount)}</CCol>
                        </CRow>
                    </CCol>
                    <CCol md="6">
                        <CRow>
                            <CCol md="8" className={classes.boldText}>Total Cash &amp; Account Sales :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText)}>{twoFixedAmt(totalSalesAmount)}</CCol>
                        </CRow>
                        {branchSales}
                        <CRow>
                            <CCol md="8" className={classes.boldText}>Medical Services :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText)}>{twoFixedAmt(medicalService)}</CCol>
                        </CRow>
                        <br />
                        <CRow>
                            <CCol md="8" className={classes.boldText}>Total Cash :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText)}>{twoFixedAmt(cashAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Charge to Account :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(accountAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Charge to HMO :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(hmoAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Charge to APE :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(apeAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Charge to Medical Mission :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(medicalMission)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Bank :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(bankAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8">Virtual :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign)}>{twoFixedAmt(virtualAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8" className={classes.boldText}>Totals Account &amp; HMO :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText)}>{twoFixedAmt(nonCashAmount)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8" className={classes.boldText}>Total Available for Deposit :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText)}>{twoFixedAmt(cashDeposit)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8" className={clsx(classes.boldText, "text-danger")}>Total Actual for Deposit :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText, "text-danger")}>{twoFixedAmt(actualDeposit)}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8" className={classes.boldText}>External Reference Number :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText)}>{auditorReferenceNum}</CCol>
                        </CRow>
                        <CRow>
                            <CCol md="8" className={clsx(classes.boldText, "text-danger")}>Other Notes :</CCol>
                            <CCol md="4" className={clsx(classes.rightAlign, classes.boldText, "text-danger")}>{auditorOtherNotes}</CCol>
                        </CRow>
                    <div hidden={true}>{CashDiscount}</div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

const mapStateToProps = (state) => {
    return {
        eodData: state.eod.eodData,
    }
};

export default connect(mapStateToProps)(Summary)
