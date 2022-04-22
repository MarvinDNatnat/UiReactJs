import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { checkValidity } from 'src/store/utility';
import * as actions from 'src/store/actions/index';

import {
    CButton,
    CFormGroup,
    CInputRadio,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CCol
} from '@coreui/react';

import {
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';

import SearchTransactionsTable from 'src/containers/tables/transactions/SearchTransactionsTable';

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
});

export class SearchTransactionModal extends Component {
    state = {
        searchInput: '',
        isErrorSearchInput: false,
        searchInputError: null,
        searchType: 'salesReceipt',
    }

    handleChange = (prop) => (event) => {
        this.setState({
            ...this.state,
            [prop]: event.target.value,
        });
    };

    closeModal = (data) => {
        this.setState({
            ...this.state,
            searchInput: '',
            isErrorSearchInput: false,
            searchInputError: null,
            searchType: 'salesReceipt',
        });

        this.props.closeClick(data);
    }

    searchTransaction = (event) => {
        if (event !== undefined) {
            event.preventDefault();
        }

        let hasError = false;
        let errorSearch = false;
        let searchError = null;

        if (!checkValidity(this.state.searchInput, { required: true, maxLength: 120 })) {
            hasError = true;
            errorSearch = true;
            searchError = <FormHelperText id="helper-outlined-adornment-refund-search">Search is required.</FormHelperText>;
        }

        this.setState({
            ...this.state,
            isErrorSearchInput: errorSearch,
            searchInputError: searchError,
        });

        if (!hasError) {
            this.props.onSearchTransactions(this.props.userToken, this.state.searchInput, this.state.searchType);
        }
    }

    clearTransaction = () => {
        this.setState({
            ...this.state,
            searchInput: '',
            isErrorSearchInput: false,
            searchInputError: null,
            searchType: 'salesReceipt',
        });

        this.props.onClearTransactions();
    }

    loadData = (rowData, row) => {
        this.setState({
            ...this.state,
            searchInput: '',
            isErrorSearchInput: false,
            searchInputError: null,
            searchType: 'salesReceipt',
        });

        this.props.loadTxn(rowData, row);
    }

    render() {
        const { classes } = this.props;

        return (
            <CModal
                show={this.props.showModal}
                onClose={() => this.closeModal()}
                closeOnBackdrop={false}
                size="xl"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Search Transactions</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol md="4" className="p-1">
                            <form onSubmit={this.searchTransaction}>
                                <FormControl error={this.state.isErrorSearchInput} fullWidth className={clsx(classes.margin)} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-transaction-refund-search">Search</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-transaction-refund-search"
                                        value={this.state.searchInput}
                                        onChange={this.handleChange('searchInput')}
                                        labelWidth={50}
                                        margin="dense"
                                        className={classes.outlinedInput}
                                        placeholder="SR# or PATIENT NAME"
                                    />
                                    {this.state.searchInputError}
                                </FormControl>
                            </form>
                        </CCol>
                        <CCol className="p-1 mt-3 ml-1">
                            <CRow>
                                <CCol md="3">
                                    <CButton
                                        className="mfe-1 border border-dark"
                                        color="success"
                                        onClick={() => this.searchTransaction()}
                                    >
                                        <i className="mfe-2 fas fa-search" />
                                    </CButton>
                                    <CButton
                                        className="mfe-1 border border-dark"
                                        color="primary"
                                        onClick={() => this.clearTransaction()}
                                    >
                                        Clear
                                    </CButton>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup variant="checkbox" className="mt-2">
                                        <CInputRadio
                                            className="form-check-input"
                                            id="radioSales"
                                            name="radios"
                                            value="salesReceipt"
                                            checked={this.state.searchType === "salesReceipt"}
                                            onChange={this.handleChange('searchType')}
                                        />
                                        <CLabel variant="checkbox" htmlFor="radioSales">Sales Receipt No.</CLabel>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="4">
                                    <CFormGroup variant="checkbox" className="mt-2">
                                        <CInputRadio
                                            className="form-check-input"
                                            id="radioPatient"
                                            name="radios"
                                            value="patientName"
                                            checked={this.state.searchType === "patientName"}
                                            onChange={this.handleChange('searchType')}
                                        />
                                        <CLabel variant="checkbox" htmlFor="radioPatient">Patient Name</CLabel>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <div className="table-responsive">
                        <SearchTransactionsTable onRef={ref => (this.searchTxnTableRef = ref)} loadTransaction={this.loadData} />
                    </div>
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

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
        error: state.trans.error,
        loading: state.trans.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchTransactions: (token, searchKey, searchType) => dispatch(actions.searchTransactions(token, searchKey, searchType)),
        onClearTransactions: () => dispatch(actions.clearTransactionList()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SearchTransactionModal))
