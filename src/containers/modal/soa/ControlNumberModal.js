import React, { Component } from 'react'
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CButton,
    CCard,
    CCardBody,
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
        maxHeight: '100px',
        minHeight: '100px',
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

export class ControlNumberModal extends Component {

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
                size="sm"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Control Number Modal</CModalTitle>
                </CModalHeader>
                <CModalBody className="m-0 p-0">
                    <CCard className="m-0 p-0">

                        <CCardBody className={clsx(classes.cardBody, "m-0 p-0")}>
                            <CRow className="m-0 p-0">
                                <CCol md="1" className="p-0"></CCol>
                                <CCol md="10" className="p-0">
                                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Control Number</CLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount-paid"
                                            value={this.props.controlNumber}
                                            onChange={this.props.handleInputChange('controlNumber')}
                                            margin="dense"
                                            className={clsx(classes.outlinedInput, "m-0")}
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="1" className="p-0"></CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        className="border border-dark"
                        color="info"
                        onClick={() => this.props.auditSOAPayment()}
                    >
                        Confirm
                    </CButton>
                    <CButton
                        className="border border-dark"
                        color="danger"
                        onClick={() => this.closeModal("close")}
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

export default connect(mapStateToProps)(withStyles(useStyles)(ControlNumberModal))
