import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { twoFixedAmt, labPersonName } from 'src/store/utility'
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import clsx from 'clsx';

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CCol,
    CInput,
} from '@coreui/react';

import {
    FormControlLabel,
    Switch,
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SOATable from 'src/containers/tables/soa/SOATable';


const useStyles = theme => ({
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
    cardBody: {
        maxHeight: '350px',
        overflow: 'auto',
    },
});

export class SOAModal extends Component {
    closeModal = (data) => {
        this.props.closeClick(data);
    }

    render() {
        const { classes } = this.props;
        return (
            <CModal
                show={this.props.showModal}
                onClose={() => this.closeModal()}
                closeOnBackdrop={false}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Statement of Account</CModalTitle>
                </CModalHeader>
                <CModalBody className="m-0 p-0">
                    <CCard className="m-0 p-0">
                        <CCardHeader>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    <strong>{this.props.chargeTo !== null ? this.props.chargeTo.label : ""}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Purchase Order :
                                </CCol>
                                <CCol md="3" className="m-0 p-0 ">
                                    {
                                        this.props.soaOption === 'unbilled' ?
                                            <CInput
                                                variant="outlined"
                                                onChange={this.props.handleChange}
                                            /> : <strong>{this.props.soaPO}</strong>}

                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0 pr-3">
                                    Type : <strong>{this.props.chargeTo !== null && this.props.chargeTypes !== null && this.props.chargeTypes.has(this.props.chargeTo.chargeType) ? this.props.chargeTypes.get(this.props.chargeTo.chargeType) : ''}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Advance Payment :
                                </CCol>
                                <CCol md="3" className="m-0 p-0">
                                    <strong>{this.props.chargeTo !== null ? this.props.chargeTo.advancePayment : ''}</strong>
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    Address : <strong>{this.props.chargeTo !== null ? this.props.chargeTo.companyAddress : ""}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Date of Coverage :
                                </CCol>
                                <CCol md="3" className="m-0 p-0">
                                    <strong>{this.props.dateFrom !== null ? moment(this.props.dateFrom).format('MMM DD, YYYY') : ''}{this.props.dateTo !== null ? ' - ' + moment(this.props.dateTo).format('MMM DD, YYYY') : ''}</strong>
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    Attention : <strong>{this.props.chargeTo !== null ? this.props.chargeTo.contactPerson : ""}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Date of Statement :
                                </CCol>
                                <CCol md="3" className="m-0 p-0 text-left">
                                    {
                                        this.props.soaOption === 'unbilled'
                                            ? <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <KeyboardDatePicker
                                                    clearable
                                                    variant="outlined"
                                                    format="yyyy-MM-DD"
                                                    placeholder="YYYY-MM-DD"
                                                    margin="normal"
                                                    value={this.props.soaDate}
                                                    onChange={this.props.handleDateChange('soaDate')}
                                                    maxDate={new Date()}
                                                    className="m-0"
                                                />
                                            </MuiPickersUtilsProvider>
                                            : <strong>{moment(this.props.soaDate).format('MMM DD, YYYY')}</strong>
                                    }
                                </CCol>
                            </CRow>
                            {
                                this.props.soaNumber !== null
                                    ? <CRow className="m-0 p-0">
                                        <CCol md="6" className="m-0 p-0">
                                            SOA Number : <strong>{this.props.soaNumber}</strong>
                                        </CCol>
                                    </CRow>
                                    : null
                            }
                        </CCardHeader>
                        <CCardBody className={clsx(classes.cardBody, "m-0 p-0")}>
                            <div className="table-responsive m-0 p-0">
                                <SOATable
                                    onRef={
                                        ref => (this.ecgTableRef = ref)}
                                    soaList={this.props.soaListModal}
                                    selectPatient={this.props.selectPatient()}
                                    SelectAllPatientHandler={this.props.SelectAllPatientHandler()}
                                />
                            </div>
                        </CCardBody>
                        <CCardFooter>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0 text-left">
                                    Prepared By : <strong>{this.props.soaOption !== 'unbilled' ? labPersonName(this.props.prepared, false) : ''}</strong>
                                </CCol>
                                <CCol md="3" className="col-12 m-0 p-0 text-right">
                                    <strong>TOTAL TXN  :  {this.props.soaListModal.length}</strong>
                                </CCol>
                                <CCol md="3" className="col-12 m-0 p-0 text-right">
                                    <strong>TOTAL SOA  :  {this.props.totalSOA !== null ? twoFixedAmt(this.props.totalSOA) : "0.00"}</strong>
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0 text-left">
                                    Verified By : <strong>{this.props.soaOption !== 'unbilled' ? labPersonName(this.props.verified, false) : ''}</strong>
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0 text-left">
                                    Noted By : <strong>{this.props.soaOption !== 'unbilled' ? labPersonName(this.props.noted, false) : ''}</strong>
                                </CCol>
                            </CRow>
                        </CCardFooter>
                    </CCard>
                </CModalBody>
                <CModalFooter>
                    {
                        this.props.soaOption === 'soa'
                            ? <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.props.runningBalanceControl}
                                        onChange={this.props.runningBalanceHandler}
                                        color="primary"
                                    />
                                }
                                label="Print with Running balance"
                            />
                            : null
                    }
                    {
                        this.props.soaOption === 'soa' && this.props.verified !== null && this.props.noted !== null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.sendSOA}
                            >
                                Send
                            </CButton>
                            : null
                    }
                    {
                        this.props.soaOption === 'unbilled'
                            ? <CButton
                                className="border border-dark"
                                color="primary"
                                onClick={this.props.saveSOA}
                            >
                                Create
                            </CButton>
                            : null
                    }
                    {
                        this.props.soaOption === 'soa'
                            ? <CButton
                                className="border border-dark"
                                color="success"
                                onClick={this.props.printSOA}
                            >
                                <i className="mfe-2 fas fa-print" />
                                Print
                            </CButton>
                            : null
                    }
                    {
                        this.props.soaOption === 'soa'
                            ? <CButton
                                className="border border-dark"
                                color="primary"
                                onClick={this.props.excelSOA}
                            >
                                <i className="mfe-2 fas fa-file-excel" />
                                Excel
                            </CButton>
                            : null
                    }
                    {
                        this.props.soaOption === 'soa' && this.props.verified === null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.verifySOA}
                            >
                                Verify
                            </CButton>
                            : null
                    }
                    {
                        this.props.soaOption === 'soa' && this.props.verified !== null && this.props.noted === null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.notedSOA}
                            >
                                Noted
                            </CButton>
                            : null
                    }
                    <CButton
                        className="border border-dark"
                        color="danger"
                        onClick={() => this.closeModal(null)}
                    >
                        Save & Close
                    </CButton>
                </CModalFooter>
            </CModal>
        )
    }
}

export default withStyles(useStyles)(SOAModal)
