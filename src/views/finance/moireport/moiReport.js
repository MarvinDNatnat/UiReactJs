import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'src/store/actions/index';

import {
    withStyles,
    Backdrop,
    CircularProgress,
    Checkbox
} from '@material-ui/core';
import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CContainer,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';
import clsx from 'clsx';
import ReactSelect from 'react-select';

import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';


const useStyles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    errorMessage: {
        color: '#f00',
        textAlign: 'center',
        fontWeight: "bolder",
    },
    overflow: {
        overflow: 'scroll',
        height: '300px'
    },
    selectStyles: {
        zIndex: 1000
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    }
});

const sortBy = [
    { value: 'Y', label: 'YEAR' },
    { value: 'M', label: 'MONTH' },
]


export class REPORT extends Component {
    state = {
        dateFromValue: moment(moment().subtract(30, 'd').format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        byYear: { value: 'Y', label: 'YEAR' },
        selectedYear: null,
        selectedChargeTo: null,
        soaPrepared: false,
        soaVerified: false,
        soaNoted: false,
        soaSend: false,
        soaRecieved: false,
        soaPaymentPrepared: false,
        soaPaymentBalance: false,
        soaPaymentVerified: false,
        soaPaymentAudited: false,
        unbilledTransaction: false,
    }



    handleExcel = () => {
        this.props.onGetSOAExcel(
            this.props.userToken,
            this.state.selectedYear.value,
            moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
            moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
            this.state.byYear.value,
            this.state.selectedChargeTo != null ? this.state.selectedChargeTo.value : null,
            this.state.soaPrepared,
            this.state.soaVerified,
            this.state.soaNoted,
            this.state.soaSend,
            this.state.soaRecieved,
            this.state.soaPaymentPrepared,
            this.state.soaPaymentBalance,
            this.state.soaPaymentVerified,
            this.state.soaPaymentAudited,
            this.state.unbilledTransaction,
        )
    }

    handleSelectChange = (prop) => (event) => {
        if (prop === 'byYear') {
            this.setState({
                ...this.state,
                [prop]: event,
            });
        } else if (prop === 'selectedYear') {
            this.setState({
                ...this.state,
                [prop]: event,
            });
        } else {
            this.setState({
                ...this.state,
                [prop]: event,
            });
        }
    }

    handleCheckbox = (prop) => (event) => {
        switch (prop) {
            case "soaPrepared":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaPrepared,
                });
                break;
            case "soaVerified":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaVerified,
                });
                break;
            case "soaNoted":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaNoted,
                });
                break;
            case "soaSend":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaSend,
                });
                break;
            case "soaRecieved":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaRecieved4,
                });
                break;
            case "soaPaymentPrepared":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaPaymentPrepared,
                });
                break;
            case "soaPaymentBalance":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaPaymentBalance,
                });
                break;
            case "soaPaymentVerified":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaPaymentVerified,
                });
                break;
            case "soaPaymentAudited":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.soaPaymentAudited,
                });
                break;
            case "unbilledTransaction":
                this.setState({
                    ...this.state,
                    [prop]: !this.state.unbilledTransaction,
                });
                break;

            default:
                break;
        }
    }

    componentDidMount() {
        this.props.onGetAllCorporates(this.props.userToken);
        const currentYear = parseInt(moment().format('YYYY'));
        const years = [];
        const slcYr = {
            value: currentYear,
            label: currentYear,
        }
        for (let index = currentYear; index >= 2020; index--) {
            years.push({
                value: index,
                label: index,
            })
        }
        this.setState({
            ...this.state,
            yearList: years,
            selectedYear: slcYr,
        });

    }

    render() {
        const { classes } = this.props;
        const dateDisplayFormat = 'MMM-DD-YYYY hh:mm a'

        const dateChangeHandler = (prop) => (event) => {
            this.setState({
                ...this.state,
                [prop]: event
            })
        }
        return (
            <CContainer>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CRow>
                    <CCol className="p-0">
                        <CCard>
                            <CCardHeader>
                                <CCardHeader className={classes.cardBlueWhite}>
                                    <h3 className="mfe-2 font-weight-bold">Moi's Report</h3>
                                </CCardHeader>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="m-0 p-0">
                                    <CCol md="2" className="m-1 p-0">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>List by</CLabel>
                                        <ReactSelect
                                            className="basic-single"
                                            placeholder="--"
                                            value={this.state.byYear}
                                            onChange={this.handleSelectChange('byYear')}
                                            isClearable={false}
                                            isSearchable={false}
                                            isLoading={false}
                                            options={sortBy}
                                            menuPlacement="bottom"
                                        />
                                    </CCol>
                                    {

                                        this.state.byYear.value === "Y" ?
                                            <CCol md="2" className="m-1 p-0">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Year</CLabel>
                                                <ReactSelect
                                                    className="basic-single"
                                                    placeholder="--"
                                                    value={this.state.selectedYear}
                                                    onChange={this.handleSelectChange('selectedYear')}
                                                    isClearable={false}
                                                    isSearchable={false}
                                                    isLoading={false}
                                                    options={this.state.yearList}
                                                    menuPlacement="bottom"
                                                />
                                            </CCol> :
                                            <>
                                                <CCol md="2" className="col-12 p-1">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>From</CLabel>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <DatePicker
                                                            value={this.state.dateFromValue}
                                                            format={dateDisplayFormat}
                                                            inputVariant="outlined"
                                                            onChange={dateChangeHandler('dateFromValue')}
                                                            showTodayButton
                                                            disableFuture
                                                            size="small"
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </CCol>
                                                <CCol md="2" className="col-12 p-1">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>To</CLabel>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <DatePicker
                                                            value={this.state.dateToValue}
                                                            format={dateDisplayFormat}
                                                            inputVariant="outlined"
                                                            onChange={dateChangeHandler('dateToValue')}
                                                            showTodayButton
                                                            disableFuture
                                                            size="small"
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </CCol>
                                            </>
                                    }
                                    <CCol md="3" className="col-12 m-1 p-0">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Charge To</CLabel>
                                        <ReactSelect
                                            className={clsx(classes.selectStyles, "basic-single")}
                                            placeholder="All or Select Charge To"
                                            value={this.state.selectedChargeTo}
                                            onChange={this.handleSelectChange('selectedChargeTo')}
                                            isClearable={true}
                                            isSearchable={true}
                                            isLoading={this.props.corpsLoading}
                                            options={
                                                [].concat(this.props.corporateList)
                                                    .sort((a, b) => a.companyName > b.companyName ? 1 : -1)
                                                    .map((corp) => {
                                                        return {
                                                            value: corp.corporateid,
                                                            label: corp.companyName,
                                                            soaCode: corp.soaCode,
                                                            companyAddress: corp.companyAddress,
                                                            contactPerson: corp.contactPerson,
                                                            contactNumber: corp.contactNumber,
                                                            soaEmail: corp.email,
                                                            chargeType: corp.chargeType,
                                                        }
                                                    })
                                            }
                                        />
                                    </CCol>
                                </CRow>
                                <div className="container">
                                    <div className="row">

                                        <div className="col-sm">
                                            <Checkbox label='Unbilled Transaction'
                                                onClick={this.handleCheckbox("unbilledTransaction")}
                                            />
                                            Unbilled Trasaction
                                        </div>

                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <Checkbox label='SOA PREPARED'
                                                onClick={this.handleCheckbox("soaPrepared")}
                                            />
                                            SOA PREPARED
                                        </div>
                                        <div className="col-sm">
                                            <Checkbox label='SOA VERIFIED'
                                                onClick={this.handleCheckbox("soaVerified")}
                                            />
                                            SOA VERIFIED
                                        </div>
                                        <div className="col-sm">
                                            <Checkbox label='SOA NOTED'
                                                onClick={this.handleCheckbox("soaNoted")}
                                            />
                                            SOA NOTED
                                        </div>

                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row ">
                                        {/* <div className="col-sm"></div> */}
                                        <div className="col-sm">
                                            <Checkbox label='SOA SEND'
                                                onClick={this.handleCheckbox("soaSend")}
                                            />
                                            SOA SEND
                                        </div>
                                        <div className="col-sm">
                                            <Checkbox label='SOA RECIEVED'
                                                onClick={this.handleCheckbox("soaRecieved")}
                                            />
                                            SOA RECEIVED
                                        </div>
                                        <div className="col-sm"></div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">

                                        <div className="col-sm">
                                            <Checkbox label='PAID BALANCE'
                                                onClick={this.handleCheckbox("soaPaymentBalance")}
                                            />
                                            PAID w/ BALANCE
                                        </div>
                                        <div className="col-sm">
                                            <Checkbox label='PAID PREPARED'
                                                onClick={this.handleCheckbox("soaPaymentPrepared")}
                                            />
                                            COLLECTED
                                        </div>
                                        <div className="col-sm">
                                            <Checkbox label='PAID VERIFIED'
                                                onClick={this.handleCheckbox("soaPaymentVerified")}
                                            />
                                            CREDITED
                                        </div>
                                        <div className="col-sm">
                                            <Checkbox label='PAID AUDITED'
                                                onClick={this.handleCheckbox("soaPaymentAudited")}
                                            />
                                            AUDITED
                                        </div>
                                    </div>
                                </div>
                                <CRow>
                                    <CCol md="5"></CCol>
                                    <CCol md="2" className="p-0 m-0">
                                        <CButton
                                            className="border border-dark mt-4"
                                            color="success"
                                            onClick={this.handleExcel}
                                        >
                                            <i className="mfe-2 fas fa-money-bill-wave" />
                                            Excel
                                        </CButton>
                                    </CCol>
                                    <CCol md="5"></CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
        corporateList: state.corps.corporateList,
        loading: state.soa.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporatescorp(token)),
        onGetSOAExcel:
            (token,
                year,
                startDate,
                endDate,
                byYear,
                chargeId,
                soaPrepared,
                soaVerified,
                soaNoted,
                soaSend,
                soaRecieved,
                soaPaymentPrepared,
                soaPaymentBalance,
                soaPaymentVerified,
                soaPaymentAudited,
                unbilledTransaction) => dispatch(actions.getSOAExcel
                    (token,
                        year,
                        startDate,
                        endDate,
                        byYear,
                        chargeId,
                        soaPrepared,
                        soaVerified,
                        soaNoted,
                        soaSend,
                        soaRecieved,
                        soaPaymentPrepared,
                        soaPaymentBalance,
                        soaPaymentVerified,
                        soaPaymentAudited,
                        unbilledTransaction))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(REPORT));