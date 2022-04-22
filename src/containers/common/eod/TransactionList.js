import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { twoFixedAmt } from 'src/store/utility'

import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    },
}));

const TransactionList = (props) => {
    const classes = useStyles();

    const [displayRecords, setDisplayRecords] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalNet, setTotalNet] = useState(0);
    const [noRecords, setNoRecords] = useState(0);

    useEffect(() => {
        let display = [];
        let total = 0;
        let tax = 0;
        let discount = 0;
        let net = 0;
        let count = 0;

        if (props.displayList !== null) {
            props.displayList.forEach(data => {
                total += Math.abs(data.amount);
                tax += Math.abs(data.tax);
                discount += Math.abs(data.discount);
                net += Math.abs(data.net);
                count++;

                props.audit !== undefined && props.audit !== null && props.audit === true
                    ? display.push(
                        <CRow key={data.transactionId} className="mx-0">
                            <CCol md="2" className="text-right">{twoFixedAmt(Math.abs(data.amount))}</CCol>
                            <CCol md="1" className="text-right">{twoFixedAmt(Math.abs(data.tax))}</CCol>
                            <CCol md="1" className="text-right">{twoFixedAmt(Math.abs(data.discount))}</CCol>
                            <CCol md="2" className="text-right">{twoFixedAmt(Math.abs(data.net))}</CCol>
                            <CCol md="2">{data.patient}</CCol>
                            <CCol md="2">{data.biller}</CCol>
                            <CCol md="2">{moment(data.date).format('MMM-DD-YYYY HH:mm')}</CCol>
                        </CRow>
                    )
                    : display.push(
                        <CRow key={data.transactionId} className="mx-0">
                            <CCol md="2" className="text-right">{twoFixedAmt(Math.abs(data.amount))}</CCol>
                            <CCol md="4">{data.patient}</CCol>
                            <CCol md="3">{data.biller}</CCol>
                            <CCol md="3">{moment(data.date).format('MMM-DD-YYYY hh:mm a')}</CCol>
                        </CRow>
                    )
            });
        }

        setDisplayRecords(display);
        setTotalAmount(total);
        setTotalTax(tax);
        setTotalDiscount(discount);
        setTotalNet(net);
        setNoRecords(count);
    }, [props.displayList, props.audit])

    return (
        <CCard className="mb-1">
            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                <h6 className="m-1">{props.title}</h6>
            </CCardHeader>
            <CCardBody className="p-1">
                {
                    props.audit !== undefined && props.audit !== null && props.audit === true
                        ? <CRow className="mx-0">
                            <CCol md="2" className="text-center">Amt Due</CCol>
                            <CCol md="1" className="text-center">Tax</CCol>
                            <CCol md="1" className="text-center">Disc</CCol>
                            <CCol md="2" className="text-center">Net</CCol>
                            <CCol md="2" className="text-center">Name</CCol>
                            <CCol md="2" className="text-center">Charge To</CCol>
                            <CCol md="2" className="text-center">Date Time</CCol>
                        </CRow>
                        : <CRow className="mx-0">
                            <CCol md="2" className="text-center">Amount</CCol>
                            <CCol md="4" className="text-center">Name</CCol>
                            <CCol md="3" className="text-center">Charge To</CCol>
                            <CCol md="3" className="text-center">Date Time</CCol>
                        </CRow>
                }
                {displayRecords}
                {
                    props.audit !== undefined && props.audit !== null && props.audit === true
                        ? <CRow className="border-top mx-0">
                            <CCol md="2" className="text-right font-weight-bold">{twoFixedAmt(totalAmount)}</CCol>
                            <CCol md="1" className="text-right font-weight-bold">{twoFixedAmt(totalTax)}</CCol>
                            <CCol md="1" className="text-right font-weight-bold">{twoFixedAmt(totalDiscount)}</CCol>
                            <CCol md="2" className="text-right font-weight-bold">{twoFixedAmt(totalNet)}</CCol>
                            <CCol md="2" className="font-weight-bold">TOTAL</CCol>
                            <CCol md="2" className="font-weight-bold">{noRecords} -- {props.code}</CCol>
                            <CCol md="2"></CCol>
                        </CRow>
                        : <CRow className="border-top mx-0">
                            <CCol md="2" className="text-right font-weight-bold">{twoFixedAmt(totalAmount)}</CCol>
                            <CCol md="4" className="font-weight-bold">TOTAL</CCol>
                            <CCol md="3" className="font-weight-bold">{noRecords} -- {props.code}</CCol>
                            <CCol md="3"></CCol>
                        </CRow>
                }
            </CCardBody>
        </CCard>
    )
}

export default TransactionList
