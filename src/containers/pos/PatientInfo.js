import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactSelect from 'react-select'
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CRow,
    CCol,
    CButton,
    CLabel,
    CContainer,
} from '@coreui/react';

import {
    Box,
    FormControl,
    MenuItem,
    Paper,
    Select,
    OutlinedInput,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import { updateObject, getPatientDisplay, computeAge } from 'src/store/utility';

const _ = require('lodash/function');

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

const useStyles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        height: 490,
    },
    patients: {
    },
    margin: {
        margin: theme.spacing(1),
    },
    statusDisplay: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
        marginTop: '5px'
    },
    tabPanel: {
        width: '100%',
        padding: '0',
    },
    companyButtons: {
        textAlign: 'center',
    },
    menuButtons: {
        margin: '0px 0px',
        fontSize: '12px',
        height: '50px',
        border: '1px solid white',
        backgroundColor: '#5BD778'
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 270,
        },
    },
};

export class PatientInfo extends Component {
    state = {
        viewPanel: 0,
        selectedOption: 'patient',
        patientTouch: false,

        patientName: null,
        patientAge: null,
        patientBirthDate: null,
        patientGender: null,
        patientContactNo: null,
        patientEmail: null,
        patientAddress: null,
        patientNationality: null,
        patientSnrPwd: null,
        patientCompany: null,

        selectedItem: null,
        selectedPackage: null,
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    handleOptionChange = (event) => {
        let panel = 0;
        switch (event.target.value) {
            case 'patient':
                panel = 0;
                break;

            case 'items':
                panel = 1;
                break;

            case 'packages':
                panel = 2;
                break;

            default:
                break;
        }

        this.setState({
            ...this.state,
            viewPanel: panel,
            selectedOption: event.target.value,
        })
    }

    handleStateSelectChange = (prop) => (selectedOption) => {
        if (prop === 'patientId') {
            if (selectedOption !== null && selectedOption.info !== null) {
                let snrId = this.props.txns.snrId;
                let pwdId = this.props.txns.pwdId;
                let emailTo = '';

                const patient = selectedOption.info;

                if (patient.seniorId !== null && snrId === null) {
                    snrId = patient.seniorId;
                }

                if (patient.pwdId !== null && pwdId === null) {
                    pwdId = patient.pwdId;
                }

                if (patient.email !== null) {
                    if (patient.email.trim() === ""){
                        emailTo = "questphil.corpresult@gmail.com"
                    }else{
                        emailTo = patient.email;
                    }
                }

                const updateTxnData = updateObject(this.props.txns, {
                    patientId: selectedOption,
                    snrId: snrId,
                    pwdId: pwdId,
                    emailTo: emailTo,
                });

                this.props.setTxnData(updateTxnData);
                this.setPatientInfo(patient);
                return;
            }

            this.setState({
                ...this.state,
                patientName: null,
                patientAge: null,
                patientBirthDate: null,
                patientGender: null,
                patientContactNo: null,
                patientEmail: null,
                patientAddress: null,
                patientNationality: null,
                patientSnrPwd: null,
                patientCompany: null
            })

        }

        const updateTxnData = updateObject(this.props.txns, {
            [prop]: selectedOption,
            emailTo: ''
        });
        this.props.setTxnData(updateTxnData, prop);
    };

    handleBranchSelectChange = (selectedOption) => {
        this.props.setBranch(selectedOption);
    }

    handleChange = (prop) => (event) => {
        const updateTxnData = updateObject(this.props.txns, {
            [prop]: event.target.value,
        });
        this.props.setTxnData(updateTxnData, prop);
    };

    setPatientInfo = (patient) => {
        const middleName = patient.middlename !== null ? " " + patient.middlename : '';
        let patientGender = "MALE";
        if (patient.gender === "F") {
            patientGender = "FEMALE";
        }
        let patientSnrPwd = null;
        if (patient.pwdId !== null && patient.seniorId !== null) {
            patientSnrPwd = patient.seniorId + " / " + patient.pwdId;
        } else {
            if (patient.seniorId !== null) {
                patientSnrPwd = patient.seniorId;
            } else if (patient.pwdId !== null) {
                patientSnrPwd = patient.pwdId;
            }
        }

        this.setState({
            ...this.state,
            patientName: patient.lastname + ", " + patient.firstname + middleName,
            patientAge: computeAge(patient.birthDate),
            patientBirthDate: moment(patient.birthDate).format('MMM-DD-yyyy'),
            patientGender: patientGender,
            patientContactNo: patient.contactNumber,
            patientEmail: patient.email,
            patientAddress: patient.address,
            patientNationality: patient.nationality.nationality,
            patientSnrPwd: patientSnrPwd,
            patientCompany: patient.corporate === null ? '' : patient.corporate.companyName
        })
    }

    cleanupDisplay = () => {
        this.setState({
            ...this.state,
            viewPanel: 0,
            selectedOption: 'patient',
            patientTouch: false,

            patientName: null,
            patientAge: null,
            patientBirthDate: null,
            patientGender: null,
            patientContactNo: null,
            patientEmail: null,
            patientAddress: null,
            patientNationality: null,
            patientSnrPwd: null,
            patientCompany: null,

            selectedItem: null,
            selectedPackage: null,
        });
    }

    handleInputSelectChange = (inputValue) => {
        let touch = null;
        if (inputValue === '') {
            if (this.state.patientTouch) {
                touch = false;
                
            }
        } else {
            touch = true;
            this.props.onSearchPatients(this.props.userToken, inputValue);
        }

        if (touch !== null) {
            this.setState({
                ...this.state,
                patientTouch: touch,
            })
        }
    }

    handleUpdatePatient = () => {
        if (this.props.txns.patientId !== '' && this.props.txns.patientId !== null &&
            this.props.txns.patientId.info !== null && this.props.txns.patientId.info !== undefined) {
            this.props.updatePatient(this.props.txns.patientId.info, 0);
        }
    }

    addProductToTransaction = (typ, product) => {
        this.props.addProduct(typ, product);
    }

    handleInputChange = (prop) => (event) => {
        const updateTxnData = updateObject(this.props.txns, {
            [prop]: event.target.value,
        });
        this.props.setTxnData(updateTxnData);
    };

    /*
     * ITEMS
     */
    handleSelectItem = (selectedOption) => {
        this.setState({
            ...this.state,
            selectedItem: selectedOption,
        })
        if (selectedOption !== null) this.addProductToTransaction('ITM', selectedOption.info)
    }
    onClickAddItemHandler = (itm) => {
        this.addProductToTransaction('ITM', itm);
    }

    /*
     * PACKAGES
     */
    handleSelectPackage = (selectedOption) => {
        this.setState({
            ...this.state,
            selectedPackage: selectedOption,
        })
        if (selectedOption !== null) this.addProductToTransaction('PCK', selectedOption.info)
    }

    onClickAddPackageHandler = (pck) => {
        this.addProductToTransaction('PCK', pck);
    }

    onDispatchEmail = () => {
        const { classes } = this.props;

        return (
            <CCol md="12" className="col-12 p-0 m-0">
                <FormControl fullWidth className={clsx(classes.margin, "m-0")} variant="outlined">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-0")}>Email To</CLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-to"
                        value={this.props.txns.emailTo}
                        onChange={this.handleChange('emailTo')}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                </FormControl>
            </CCol>
        );
    }

    render() {
        const { classes } = this.props;
        const menuLimit = 21;

        let genage = '';
        if (this.state.patientGender !== null && this.state.patientAge !== null) {
            genage = this.state.patientGender + " / " + this.state.patientAge
        }

        return (
            <Paper className={classes.paper}>
                <CContainer>
                    <CRow>
                        <div className="col-8 m-0 p-0 btn-group btn-group-toggle" data-toggle="buttons">
                            <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'patient' ? "active" : "")}>
                                <input type="radio" value="patient"
                                    checked={this.state.selectedOption === 'patient'}
                                    onChange={this.handleOptionChange}
                                    disabled={this.props.disableAllButtons}
                                />
                                Patient
                            </label>
                            <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'items' ? "active" : "")}>
                                <input type="radio" value="items"
                                    checked={this.state.selectedOption === 'items'}
                                    onChange={this.handleOptionChange}
                                    disabled={this.props.disableAllButtons}
                                />
                                Items
                            </label>
                            <label className={clsx("btn btn-primary border border-white", this.state.selectedOption === 'packages' ? "active" : "")}>
                                <input type="radio" value="packages"
                                    checked={this.state.selectedOption === 'packages'}
                                    onChange={this.handleOptionChange}
                                    disabled={this.props.disableAllButtons}
                                />
                                Packages
                            </label>
                        </div>
                        <div className="col-4 m-0 p-0">
                            <CLabel className={classes.statusDisplay}>{this.props.txns.statusDisplay}</CLabel>
                        </div>
                    </CRow>
                    <CRow className={clsx(classes.patients)}>
                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={0}>
                            <div className="row m-0 p-0">
                                <div className="col-10 col-md-10 p-0">
                                    <ReactSelect
                                        className="basic-single"
                                        placeholder="Patient"
                                        value={this.props.txns.patientId}
                                        onChange={this.handleStateSelectChange('patientId')}
                                        onInputChange={_.debounce(this.handleInputSelectChange, 1000)}
                                        isClearable={true}
                                        isSearchable={true}
                                        isLoading={this.props.ptntsLoading}
                                        options={
                                            [].concat(this.props.patientList)
                                                .sort((a, b) => a.lastname > b.lastname ? 1 : (a.firstname > b.firstname ? 1 : -1))
                                                .map((ptnt) => {
                                                    return {
                                                        value: ptnt.patientid,
                                                        label: getPatientDisplay(ptnt),
                                                        info: ptnt
                                                    }
                                                })
                                        }
                                        isDisabled={this.props.disableAllButtons}
                                    />
                                </div>
                                <div className={clsx(classes.companyButtons, "col-2 col-md-2 p-0")}>
                                    <CButton
                                        color="success"
                                        className="mfe-2"
                                        onClick={this.props.addPatient}
                                        disabled={this.props.disableAllButtons}
                                    ><i className="fas fa-hospital-user" /></CButton>
                                </div>
                            </div>
                            <FormControl error={this.props.txns.errPatient} fullWidth className={clsx(classes.margin, "m-1 p-0")}>
                                <div className="row p-0">
                                    <div className="col-12 col-md-4 p-0">
                                        NAME:
                                    </div>
                                    <div className="col-12 col-md-8 p-0">
                                        <strong>{this.state.patientName}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        GENDER / AGE:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{genage}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        BIRTH DATE:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{this.state.patientBirthDate}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        CONTACT:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{this.state.patientContactNo}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        EMAIL:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{this.state.patientEmail}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        ADDRESS:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{this.state.patientAddress}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        NATIONALITY:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{this.state.patientNationality}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        SENIOR/PWD:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{this.state.patientSnrPwd}</strong>
                                    </div>
                                </div>
                                <div className="row p-0">
                                    <div className="col-6 col-md-4 p-0">
                                        COMPANY:
                                    </div>
                                    <div className="col-6 col-md-8 p-0">
                                        <strong>{this.state.patientCompany}</strong>
                                    </div>
                                </div>
                            </FormControl>
                            <CRow className="row mt-1 p-0">
                                <CCol md="3" className="col-12 p-0">
                                    <CButton
                                        color="primary"
                                        className="mfe-2 border border-dark"
                                        onClick={this.handleUpdatePatient}
                                        disabled={
                                            this.props.disableAllButtons
                                                ? true
                                                : this.state.patientName === null
                                                    ? true
                                                    : false
                                        }
                                    >
                                        <i className="mfe-3 fas fa-user-edit" />
                                        Update
                                    </CButton>
                                </CCol>
                                <CCol md="9" className="col-12 p-1 m-0">
                                    <CRow className="col-12 p-0 m-0">
                                        {
                                            (this.props.txns.txnType !== null && this.props.txns.txnType.value === "TREF") ||
                                            (this.props.txns.txnType !== null && this.props.txns.txnType.value === "TMS")
                                                ? <CCol md="12" className="col-12 p-0 m-0">
                                                    <CLabel className={clsx(classes.labelText, "mb-0 ml-0")}>Referral</CLabel>
                                                    <ReactSelect
                                                        className="basic-single"
                                                        placeholder="Referral"
                                                        value={this.props.txns.referral}
                                                        onChange={this.handleStateSelectChange('referral')}
                                                        isClearable={true}
                                                        isSearchable={true}
                                                        isLoading={false}
                                                        options={
                                                            [].concat(this.props.referralList)
                                                                .sort((a, b) => a.referral > b.referral ? 1 : -1)
                                                                .map((ref) => {
                                                                    return {
                                                                        value: ref.referralid,
                                                                        label: ref.referral
                                                                    }
                                                                })
                                                        }
                                                        isDisabled={this.props.disableAllButtons}
                                                    />
                                                </CCol>
                                                : null
                                        }
                                        <CCol md="12" className="col-12 p-0 m-0">
                                            <FormControl fullWidth className={clsx(classes.margin, "m-0")} variant="outlined">
                                                <CLabel className={clsx(classes.labelText, "mb-0 ml-0")}>Dispatch</CLabel>
                                                <Select
                                                    labelid="outlined-adornment-dispatch"
                                                    id="outlined-adornment-dispatch-id"
                                                    value={this.props.txns.dispatch}
                                                    onChange={this.handleInputChange('dispatch')}
                                                    margin="dense"
                                                    className="m-0"
                                                    MenuProps={MenuProps}
                                                    disabled={this.props.disableAllButtons}
                                                >
                                                    <MenuItem value='E'>E-MAIL</MenuItem>
                                                    <MenuItem value='PU'>PICK-UP</MenuItem>
                                                    <MenuItem value='OL'>ONLINE</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </CCol>
                                        {
                                            this.props.txns.dispatch !== '' && this.props.txns.dispatch === "E"
                                                ? this.onDispatchEmail()
                                                : null
                                        }
                                    </CRow>
                                </CCol>
                            </CRow>
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={1}>
                            <div className="row m-1 p-0">
                                <div className="col-12 col-md-12 p-0">
                                    <ReactSelect
                                        className="basic-single"
                                        placeholder="Items/Services"
                                        value={this.state.selectedItem}
                                        onChange={this.handleSelectItem}
                                        isClearable={true}
                                        isSearchable={true}
                                        isLoading={this.props.itmsLoading}
                                        options={
                                            [].concat(this.props.itemList)
                                                .filter(i => i.active === true)
                                                .sort((a, b) => a.itemName > b.itemName ? 1 : -1)
                                                .map((itm) => {
                                                    return {
                                                        value: itm.itemid,
                                                        label: itm.itemName + " [" + itm.itemDescription + "] (" + itm.itemPrice.toFixed(2) + ")",
                                                        info: itm
                                                    }
                                                })
                                        }
                                        isDisabled={this.props.disableAllButtons}
                                    />
                                </div>
                            </div>
                            <div className="row p-0">
                                {
                                    [].concat(this.props.itemList)
                                        .filter(i => i.active === true && i.onMenu === true)
                                        .sort((a, b) => a.itemName > b.itemName ? 1 : -1)
                                        .splice(0, menuLimit)
                                        .map((itm) => (
                                            <button
                                                key={itm.itemid}
                                                className={clsx(classes.menuButtons, "btn btn-lg font-weight-bold border border-dark col-12 col-md-4")}
                                                onClick={() => this.onClickAddItemHandler(itm)}
                                                disabled={this.props.disableAllButtons}
                                            >
                                                {itm.itemName}
                                            </button>
                                        ))
                                }
                            </div>
                        </TabPanel>
                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={2}>
                            <div className="row m-1 p-0">
                                <div className="col-12 col-md-12 p-0">
                                    <ReactSelect
                                        className="basic-single"
                                        placeholder="Packages"
                                        value={this.selectedPackage}
                                        onChange={this.handleSelectPackage}
                                        isClearable={true}
                                        isSearchable={true}
                                        isLoading={this.props.pcksLoading}
                                        options={
                                            [].concat(this.props.packageList)
                                                .filter(p => p.active === true)
                                                .sort((a, b) => a.packageName > b.packageName ? 1 : -1)
                                                .map((pck) => {
                                                    return {
                                                        value: pck.packageid,
                                                        label: pck.packageName + " (" + pck.packagePrice.toFixed(2) + ")",
                                                        info: pck
                                                    }
                                                })
                                        }
                                        isDisabled={this.props.disableAllButtons}
                                    />
                                </div>
                            </div>
                            <div className="row p-0">
                                {
                                    [].concat(this.props.packageList)
                                        .filter(p => p.active === true && p.onMenu === true)
                                        .sort((a, b) => a.itemName > b.itemName ? 1 : -1)
                                        .splice(0, menuLimit)
                                        .map((pck) => (
                                            <button
                                                key={pck.packageid}
                                                className={clsx(classes.menuButtons, "btn btn-lg font-weight-bold border border-dark col-12 col-md-4")}
                                                onClick={() => this.onClickAddPackageHandler(pck)}
                                                disabled={this.props.disableAllButtons}
                                            >
                                                {pck.packageName}
                                            </button>
                                        ))
                                }
                            </div>
                        </TabPanel>
                    </CRow>
                </CContainer>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        ptntsLoading: state.ptnts.loading,
        patientList: state.ptnts.patientList,
        itmsLoading: state.items.loading,
        itemList: state.items.itemList,
        pcksLoading: state.packs.loading,
        packageList: state.packs.packageList,
        branchList: state.bran.branchList,
        referralList: state.refs.referralList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetInitialPatients: (token) => dispatch(actions.getInitialPatients(token)),
        onSearchPatients: (token, searchKey) => dispatch(actions.searchPatients(token, searchKey)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(PatientInfo))
