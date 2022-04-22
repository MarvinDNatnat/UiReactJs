import React, { Component } from 'react'
import { connect } from 'react-redux';

import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import { twoFixedAmt, labPersonName } from 'src/store/utility'
import clsx from 'clsx';
import ReactSelect from 'react-select';
import moment from 'moment';
import { Toast } from 'src/store/sweetAlert';

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CCol,
} from '@coreui/react';

import {
    FormControl,
    OutlinedInput,
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SOAListTable from 'src/containers/tables/soa/SOAListTable';

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
        maxHeight: '500px',
        minHeight: '300px',
        overflow: 'auto',
    },
    selectStyles: {
        zIndex: 1000
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    paymentImage: {
        // width: '100px',
        height: '90px',
        cursor: 'pointer',
    }
});

export class PaymentModal extends Component {
    closeModal = (data) => {
        this.props.closeClick(data);
    }

    showFullImage = () => {
        if (this.props.paymentReceipt !== null) {
            const file = new Blob(
                [this.props.paymentReceipt],
                { type: this.props.paymentImageType });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } else {
            Toast.fire({
                icon: 'error',
                title: 'No image to view.'
            });
        }
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
                    <CModalTitle>Payment</CModalTitle>
                </CModalHeader>
                <CModalBody className="m-0 p-0">
                    <CCard className="m-0 p-0">
                        <CCardHeader>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    <strong>{this.props.chargeTo !== null ? this.props.chargeTo.label : ""}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Type :
                                </CCol>
                                <CCol md="3" className="m-0 p-0">
                                    <strong>{this.props.chargeTo !== null && this.props.chargeTypes !== null && this.props.chargeTypes.has(this.props.chargeTo.chargeType) ? this.props.chargeTypes.get(this.props.chargeTo.chargeType) : ''}</strong>
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    Address : <strong>{this.props.chargeTo !== null ? this.props.chargeTo.companyAddress : ""}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                    Date of Payment :
                                </CCol>
                                <CCol md="3" className="m-0 p-0 text-left">
                                    {
                                        this.props.soaOption === 'soa'
                                            ? <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <KeyboardDatePicker
                                                    clearable
                                                    variant="outlined"
                                                    format="yyyy-MM-DD"
                                                    placeholder="YYYY-MM-DD"
                                                    margin="normal"
                                                    value={this.props.paymentDate}
                                                    onChange={this.props.handleDateChange('paymentDate')}
                                                    maxDate={new Date()}
                                                    className="m-0"
                                                />
                                            </MuiPickersUtilsProvider>
                                            : <strong>{moment(this.props.paymentDate).format('MMM DD, YYYY')}</strong>
                                    }
                                </CCol>
                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="m-0 p-0">
                                    Balance Addvance Payment : <strong>{this.props.chargeTo !== null ? this.props.chargeTo.advancePayment : ""}</strong>
                                </CCol>
                                <CCol md="3" className="m-0 p-0 pr-3 text-right">
                                </CCol>
                                <CCol md="3" className="m-0 p-0 text-left">
                                  
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody className={clsx(classes.cardBody, "m-0 p-0")}>
                            <CRow className="m-0 p-0">
                                <CCol md="3" className="p-0">
                                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Amount Paid</CLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount-paid"
                                            type="number"
                                            value={this.props.paymentAmount}
                                            onChange={this.props.handleInputChange('paymentAmount')}
                                            margin="dense"
                                            className={clsx(classes.outlinedInput, "m-0")}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className='pr-1'>
                                    <CLabel className={clsx(classes.labelText, classes.selectStyles, "mt-2 mb-0 ml-1 p-0")}>Payment Type</CLabel>
                                    <ReactSelect
                                        className="basic-single"
                                        placeholder="--"
                                        value={this.props.paymentType}
                                        onChange={this.props.handleSelectChange('paymentType')}
                                        isClearable={false}
                                        isSearchable={false}
                                        isLoading={false}
                                        options={this.props.typeList}
                                        menuPlacement="bottom"
                                    />
                                </CCol>
                                {
                                    this.props.paymentType !== null && this.props.paymentType.value !== 'CA'
                                        ? <CCol md="3" className='p-0'>
                                            <CLabel className={clsx(classes.labelText, classes.selectStyles, "mt-2 mb-0 ml-1 p-0")}>Bank</CLabel>
                                            <ReactSelect
                                                className="basic-single"
                                                placeholder="--"
                                                value={this.props.paymentBank}
                                                onChange={this.props.handleSelectChange('paymentBank')}
                                                isClearable={true}
                                                isSearchable={true}
                                                isLoading={false}
                                                options={
                                                    [].concat(this.props.paymentBanks)
                                                        .map((pb) => {
                                                            return { value: pb.key, label: pb.value }
                                                        })
                                                }
                                                menuPlacement="bottom"
                                            />
                                        </CCol>
                                        : null
                                }

                                {
                                    this.props.paymentType !== null && this.props.paymentType.value !== 'CA'
                                        ? <CCol md="3" className="p-0 pr-4">
                                            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Account/Cheque No.</CLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-account-no"
                                                    type="text"
                                                    value={this.props.accountNo}
                                                    onChange={this.props.handleInputChange('accountNo')}
                                                    margin="dense"
                                                    className={clsx(classes.outlinedInput, "m-0")}
                                                />
                                            </FormControl>
                                        </CCol>
                                        : null
                                }

                            </CRow>
                            <CRow className="m-0 p-0">
                                <CCol md="3" className="pl-1">
                                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Tax With Held</CLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-other-amount"
                                            type="number"
                                            value={this.props.taxWithHeld}
                                            onChange={this.props.handleInputChange('taxWithHeld')}
                                            margin="dense"
                                            className={clsx(classes.outlinedInput, "m-0")}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className="pl-1">
                                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Amount</CLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-other-amount"
                                            type="number"
                                            value={this.props.otherAmount}
                                            onChange={this.props.handleInputChange('otherAmount')}
                                            margin="dense"
                                            className={clsx(classes.outlinedInput, "m-0")}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className='pl-1'>
                                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Other Payment</CLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-other-notes"
                                            type="text"
                                            value={this.props.otherNotes}
                                            onChange={this.props.handleInputChange('otherNotes')}
                                            margin="dense"
                                            className={clsx(classes.outlinedInput, "m-0")}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className="pl-1">
                                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Apply Advance Payment</CLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-other-amount"
                                            type="number"
                                            value={this.props.addvancePayment}
                                            onChange={this.props.handleInputChange('addvancePayment')}
                                            margin="dense"
                                            className={clsx(classes.outlinedInput, "m-0")}
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>
                            {
                                this.props.soaOption === 'payments' && this.props.verified === null
                                    ? <CRow className="m-0 p-1">
                                        <CCol md="9" className="col-12 m-0 p-0">
                                            <CCol md="12" className="col-12 m-0 p-0">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Payment (1000x700 pixel) 64KB:</CLabel>
                                            </CCol>
                                            <CCol md="12" className="col-12 m-0 p-0">
                                                <CRow className="m-0 p-1">
                                                    <CCol md="9" className="col-12 m-0 p-0 pr-2">
                                                        <div className="custom-file">
                                                            <input type="file"
                                                                className="custom-file-input"
                                                                id="customFile"
                                                                accept="image/*"
                                                                onChange={this.props.fileChangeHandler}
                                                                // ref={imageInputRef}
                                                                disabled={this.props.verified === null ? false : true}
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile"
                                                            >
                                                                {
                                                                    this.props.isFilePicked && this.props.selectedFile !== undefined && this.props.selectedFile !== null
                                                                        ? this.props.selectedFile.name
                                                                        : 'Choose file'
                                                                }
                                                            </label>
                                                        </div>
                                                    </CCol>
                                                    <CCol md="3" className="col-12 m-0 p-0 pr-2">
                                                        <CButton
                                                            className="border border-dark"
                                                            color="primary"
                                                            onClick={this.props.uploadPayment}
                                                            disabled={this.props.verified === null ? false : true}
                                                        >Upload</CButton>
                                                    </CCol>
                                                </CRow>
                                            </CCol>
                                        </CCol>
                                        <CCol md="3" className="col-12 m-0 p-0 pr-2">
                                            {
                                                this.props.isFilePicked && this.props.selectedFile !== undefined && this.props.selectedFile !== null
                                                    ? <img src={URL.createObjectURL(this.props.selectedFile)} alt="paymentimage" className={classes.paymentImage} />
                                                    : this.props.paymentReceipt !== null
                                                        ? <img
                                                            src={`data:image/*;base64,${this.props.paymentReceipt}`}
                                                            alt="paymentimage"
                                                            className={classes.paymentImage}
                                                            onClick={this.showFullImage} />
                                                        : null
                                            }
                                        </CCol>
                                    </CRow>
                                    : null
                            }
                            <div className="table-responsive m-0 p-0">
                                <SOAListTable
                                    soaList={this.props.soaListModal}
                                />
                            </div>
                        </CCardBody>
                        <CCardFooter>
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0 text-left">
                                    Prepared By : <strong>{this.props.soaOption === 'payments' ? labPersonName(this.props.prepared, false) : ''}</strong>
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
                                    Verified By : <strong>{this.props.soaOption === 'payments' ? labPersonName(this.props.verified, false) : ''}</strong>
                                </CCol>
                            </CRow>
                        </CCardFooter>
                    </CCard>
                </CModalBody>
                <CModalFooter>
                    {
                        this.props.soaOption === 'soa'
                            ? <CButton
                                className="border border-dark"
                                color="primary"
                                onClick={this.props.SOAPayment}
                            >
                                Payment
                            </CButton>
                            : null
                    }
                    {
                        this.props.soaOption === 'payments' && this.props.verified === null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.verifySOAPayment}
                            >
                                Verify
                            </CButton>
                            : null
                    }
                     {
                        this.props.soaOption === 'payments' && this.props.verified !== null
                            ? <CButton
                                className="border border-dark"
                                color="info"
                                onClick={this.props.openModalControlNumber}
                            >
                                Audited
                            </CButton>
                            : null
                    }
                    <CButton
                        className="border border-dark"
                        color="danger"
                        onClick={() => this.closeModal(null)}
                    >
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        paymentBanks: state.bran.paymentBanks,
    }
};

export default connect(mapStateToProps)(withStyles(useStyles)(PaymentModal))
