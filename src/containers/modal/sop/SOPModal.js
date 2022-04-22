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
} from '@coreui/react';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SOPTable from 'src/containers/tables/sop/SOPTable';


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

export class SOPModal extends Component {
    // closeModal = (data) => {
    //     this.props.closeClick(data);
    // }

    render() {
        const { classes } = this.props;
        return (
            <CModal
                show={this.props.showSOPModal}
                onClose={() => this.props.closeClick()}
                closeOnBackdrop={false}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Statement of Payable</CModalTitle>
                </CModalHeader>
                <CModalBody className="m-0 p-0">
                    <CCard className="m-0 p-0">
                        <CCardHeader>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    <strong>{this.props.referenceLab !== null ? this.props.referenceLab.label : ""}</strong>
                                </CCol>
                                {/* <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Type :
                                </CCol>
                                <CCol md="3" className="m-0 p-0">
                                    <strong>{this.props.chargeTo !== null && this.props.chargeTypes !== null && this.props.chargeTypes.has(this.props.chargeTo.chargeType) ? this.props.chargeTypes.get(this.props.chargeTo.chargeType) : ''}</strong>
                                </CCol> */}
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    Address : <strong>{this.props.referenceLab !== null ? this.props.referenceLab.companyAddress : ""}</strong>
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
                                    Attention : <strong>{this.props.referenceLab !== null ? this.props.referenceLab.contactPerson : ""}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Date of Statement :
                                </CCol>
                                <CCol md="3" className="m-0 p-0 text-left">
                                    {
                                        this.props.sopOption === 'sendout'
                                            ? <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <KeyboardDatePicker
                                                    clearable
                                                    variant="outlined"
                                                    format="yyyy-MM-DD"
                                                    placeholder="YYYY-MM-DD"
                                                    margin="normal"
                                                    value={this.props.sopDate}
                                                    onChange={this.props.handleDateChange('sopDate')}
                                                    maxDate={new Date()}
                                                    className="m-0"
                                                />
                                            </MuiPickersUtilsProvider>
                                            : <strong>{moment(this.props.sopDate).format('MMM DD, YYYY')}</strong>
                                    }
                                </CCol>
                            </CRow>
                            {
                                this.props.sopNumber !== null
                                    ? <CRow className="m-0 p-0">
                                        <CCol md="6" className="m-0 p-0">
                                            SOP Number : <strong>{this.props.sopNumber}</strong>
                                        </CCol>
                                    </CRow>
                                    : null
                            }
                        </CCardHeader>
                        <CCardBody className={clsx(classes.cardBody, "m-0 p-0")}>
                            <div className="table-responsive m-0 p-0">
                                <SOPTable
                                    onRef={
                                        ref => (this.ecgTableRef = ref)}
                                    sopList={this.props.selectedSendOutList}
                                />
                            </div>
                        </CCardBody>
                        <CCardFooter>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0 text-left">
                                    Prepared By : <strong>{this.props.sopOption !== 'sendout' ? labPersonName(this.props.prepared, false) : ''}</strong>
                                </CCol>
                                <CCol md="3" className="col-12 m-0 p-0 text-right">
                                    <strong>TOTAL TXN  :  {this.props.selectedSendOutList.length}</strong>
                                </CCol>
                                <CCol md="3" className="col-12 m-0 p-0 text-right">
                                    <strong>TOTAL SOP  :  {this.props.totalSop !== null ? twoFixedAmt(this.props.totalSop) : "0.00"}</strong>
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0 text-left">
                                    Verified By : <strong>{this.props.sopOption !== 'sendout' ? labPersonName(this.props.verified, false) : ''}</strong>
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0 text-left">
                                    Noted By : <strong>{this.props.sopOption !== 'sendout' ? labPersonName(this.props.noted, false) : ''}</strong>
                                </CCol>
                            </CRow>
                        </CCardFooter>
                    </CCard>
                </CModalBody>
                <CModalFooter>
                    {
                        this.props.sopOption === 'sop' && this.props.verified !== null && this.props.noted !== null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.sendSOP}
                            >
                                Send
                            </CButton>
                            : null
                    }
                    {
                        this.props.sopOption === 'sendout' ? <CButton
                            className="border border-dark"
                            color="primary"
                            onClick={this.props.saveSOP}
                        >
                            Create
                        </CButton> : null
                    }
                    {
                        this.props.sopOption === 'sop'
                            ? <CButton
                                className="border border-dark"
                                color="success"
                                onClick={this.props.printSOP}
                            >
                                <i className="mfe-2 fas fa-print" />
                                Print
                            </CButton>
                            : null
                    }
                    {
                        this.props.sopOption === 'sop'
                            ? <CButton
                                className="border border-dark"
                                color="primary"
                                onClick={this.props.generateExcelSop}
                            >
                                <i className="mfe-2 fas fa-file-excel" />
                                Excel
                            </CButton>
                            : null
                    }
                    {
                        this.props.sopOption === 'sop' && this.props.verified === null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.verifySOP}
                            >
                                Verify
                            </CButton>
                            : null
                    }
                    {
                        this.props.sopOption === 'sop' && this.props.verified !== null && this.props.noted === null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.notedSOP}
                            >
                                Noted
                            </CButton>
                            : null
                    }
                    <CButton
                        className="border border-dark"
                        color="danger"
                        onClick={() => this.props.closeClick()}
                    >
                        Save & Close
                    </CButton>
                </CModalFooter>
            </CModal>
        )
    }
}

export default withStyles(useStyles)(SOPModal)
