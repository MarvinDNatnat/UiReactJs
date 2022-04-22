import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import MomentUtils from '@date-io/moment';

import {
} from '@coreui/react';

import {
    Box,
    Paper,
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

import { updateObject, padLeadingZeros } from 'src/store/utility';
import TransactionItemDetails from './TransactionItemDetails';

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
        padding: theme.spacing(2),
        textAlign: 'left',
        // color: theme.palette.text.secondary,
        backgroundColor: '#4267B2',
        height: 490,
    },
    itemLists: {
    },
    dueAmount: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    overflow: {
        backgroundColor: '#628BDE',
        overflow: 'scroll',
        overflowX: 'hidden',
        height: '375px',
        alignContent: 'flex-start'
    },
    itemTopColor: {
        backgroundColor: '#628BDE',
        color: 'white',
        textShadow: '2px 2px black'
    }
}));

const TransactionDetails = (props) => {
    const classes = useStyles();
    const branch = process.env.REACT_APP_BRANCH + ' Branch';

    const txnOptions = [
        { value: 'TWI', label: 'WALK-IN' },
        { value: 'TCH', label: 'CHARGE' },
        { value: 'TREF', label: 'REFERRAL' },
        { value: 'TAPE', label: 'APE' },
        { value: 'TMM', label: 'MEDICAL MISSION' },
        { value: 'TMS', label: 'MEDICAL SERVICE' },
        { value: 'THS', label: 'HOME SERVICE' },
        { value: 'TSI', label: 'SEND-IN' },
        { value: 'TCL', label: 'CLINICAL TRIAL' },
        { value: 'TWL', label: 'WLMC' },
        { value: 'TDNA', label: 'DNA ASIA' },
        { value: 'TAC', label: 'AESTHETICS & COSMETICS' },
        { value: 'TAS', label: 'AMBULATORY SURGERY' },
        { value: 'TBH', label: 'BIRTHING HOME' },
        { value: 'TPS', label: 'PHARMACY & SUPPLY' },
    ]

    const handleSelectChange = (prop) => (event) => {
        const payments = {};
        let discountRate = 0;
        let discountType = '0';
        if (prop === 'txnType') {
            switch (event.value) {
                case "TCH":
                    payments.payType = 'C';
                    payments.payTab = 2;
                    payments.dscType = '0';
                    payments.discRate = 0;
                    payments.discAmnt = 0;
                    payments.amtRcv = props.txns.amtDue;
                    payments.amtChg = 0;

                    discountRate = 0;
                    discountType = '0';
                    break;

                default:
                    payments.payType = 'CA';
                    payments.payTab = 0;
                    payments.dscType = '0';
                    payments.discRate = 0;
                    payments.discAmnt = 0;
                    payments.amtRcv = 0;
                    payments.amtChg = 0 - props.txns.amtDue;

                    discountRate = 0;
                    discountType = '0';
                    break;
            }
        }

        const updateTxnData = updateObject(props.txns, {
            [prop]: event,
            ...payments,
        });
        props.setTxnData(updateTxnData, {
            update: {
                discount: discountRate,
                discountType: discountType,
            }
        });
    }

    const handleDateChange = (prop) => (date) => {
        const updateTxnData = updateObject(props.txns, {
            [prop]: date,
        });
        props.setTxnData(updateTxnData);
    };

    const tranData = props.isUpdate ?
        (
            <div className="row p-0 mt-1">
                <div className="col-12 col-md-5 p-0 mr-2">
                    <div className="row">
                        <div className="col">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker
                                    format="yyyy-MM-DD hh:mm a"
                                    placeholder="YYYY-MM-DD hh:mm a"
                                    label="Transction Date"
                                    inputVariant="outlined"
                                    value={props.txns.tranDate}
                                    onChange={handleDateChange('tranDate')}
                                    maxDate={new Date()}
                                    className="m-0"
                                    error={props.txns.errTxnDate}
                                    showTodayButton
                                    disableFuture
                                    size="small"
                                    disabled={props.txns.lockTxnDate}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 font-weight-bold">Cashier:</div>
                        <div className="col">
                            {props.txns.cashier !== null
                                ? props.txns.cashier.username
                                : null
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 p-0">
                    <div className="row">
                        <div className="col-4 font-weight-bold">SR #:</div>
                        <div className="col">{padLeadingZeros(props.txns.id)}</div>
                    </div>
                    <div className="row">
                        <div className="col-4 font-weight-bold">Txn ID:</div>
                        <div className="col">{props.txns.transactionid}</div>
                    </div>
                </div>
            </div>
        )
        : null;


    return (
        <Paper className={clsx(classes.paper, 'p-2')}>
            <div className="container">
                {tranData}
                <div className="row mt-1">
                    <div className="col-12 col-md-6 p-0 mb-2">
                        <ReactSelect
                            className="basic-single"
                            placeholder="Transaction Type"
                            value={props.txns.txnType}
                            onChange={handleSelectChange('txnType')}
                            options={txnOptions}
                            isDisabled={props.disableAllButtons}
                        />
                    </div>
                    <div className={clsx(classes.itemTopColor, "col-12 col-md-6 p-0 mb-2 pl-2 pt-1 font-weight-bold text-uppercase")}>
                        {branch}
                    </div>
                </div>

                <div className={clsx(classes.itemTopColor, "row border-bottom")}>
                    <div className="col-5 font-weight-bold">
                        Item Name
                    </div>
                    <div className="col-1 font-weight-bold pl-0">
                        Qty
                    </div>
                    <div className="col-2 font-weight-bold text-right">
                        Price
                    </div>
                    <div className="col-1 font-weight-bold pl-0">
                        D%
                    </div>
                    <div className="col-2 font-weight-bold text-right pl-0">
                        Total
                    </div>
                </div>
                <div className={clsx(classes.overflow, "row mt-2")}>
                    {
                        [].concat(props.txnItms)
                            .map((itm, idx) => (
                                <TransactionItemDetails
                                    txns={props.txns}
                                    key={itm.itemid}
                                    item={itm}
                                    index={idx}
                                    delProd={props.deleteProduct}
                                    updProd={props.updateProduct}
                                    disAllBtns={props.disableAllButtons}
                                />
                            ))
                    }
                </div>
            </div>
        </Paper>
    )
}

export default TransactionDetails
