import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import clsx from 'clsx';

import {
    CButton,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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

export class UpdateSOAModal extends Component {
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
                    <CModalTitle>Update SOA</CModalTitle>
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
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
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
                            <CRow className="m-0 p-0">
                                <CCol md="6" className="col-12 m-0 p-0">
                                    UNBILLED
                                </CCol>
                                <CCol md="6" className="col-12 m-0 p-0">
                                    SOA
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CModalBody>
                <CModalFooter>
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

export default withStyles(useStyles)(UpdateSOAModal)
