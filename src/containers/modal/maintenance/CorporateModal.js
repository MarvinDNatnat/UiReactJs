import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactSelect from 'react-select';

import {
    CButton,
    CCol,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react';

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Switch,
} from '@material-ui/core';

import { updateObject, checkValidity } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    }
}));

const CorporateModal = (props) => {
    const classes = useStyles();

    const chargeTypes = [
        { value: 'CORP', label: 'CORPORATE' },
        { value: 'CASH', label: 'CORPORATE CASH' },
        { value: 'HMO', label: 'HMO' },
        { value: 'REBATE', label: 'REBATE' },
        { value: 'STF', label: 'STAFF' },
        { value: 'APE', label: 'APE' },
        { value: 'MMO', label: 'MEDICAL MISSION' }
    ]

    const handleChange = (prop) => (event) => {
        const updateCorporateData = updateObject(props.corporateData, {
            [prop]: event.target.value,
        });
        props.setCorporateData(updateCorporateData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        const updateCorporateData = updateObject(props.corporateData, {
            [prop]: event.target.checked,
        });
        props.setCorporateData(updateCorporateData);
    };

    const handleSelectChange = (prop) => (event) => {
        const updateCorporateData = updateObject(props.corporateData, {
            [prop]: event,
        });
        props.setCorporateData(updateCorporateData);
    }

    const validateInputs = () => {
        let hasError = false;
        let errorCompanyName = false;
        let errorCompanyAddress = false;
        let errorContactPerson = false;
        let errorContactNumber = false;
        let errorEmail = false;
        let errorResultEmail = false;
        let errorChargeType = false;
        let errorSOACode = false;
        let companyNameError = null;
        let companyAddressError = null;
        let contactPersonError = null;
        let contactNumberError = null;
        let emailError = null;
        let resultEmailError = null;
        let chargeTypeError = null;
        let soaCodeError = null;

        if (!checkValidity(props.corporateData.companyName, { required: true })) {
            hasError = true;
            errorCompanyName = true;
            companyNameError = <FormHelperText id="helper-outlined-adornment-company-name">Company Name is required.</FormHelperText>;
        }

        if (!checkValidity(props.corporateData.soaCode, { required: true, minLength: 3, maxLength: 8 })) {
            hasError = true;
            errorSOACode = true;
            soaCodeError = <FormHelperText id="helper-outlined-adornment-company-name">SOA Code is required and must be 3 to 8 characters.</FormHelperText>;
        }

        if (props.corporateData.companyAddress !== '') {
            if (!checkValidity(props.corporateData.companyAddress, { required: true, maxLength: 250 })) {
                hasError = true;
                errorCompanyAddress = true;
                companyAddressError = <FormHelperText id="helper-outlined-adornment-company-address">Company Address must not exceed to 250 characters.</FormHelperText>;
            }
        }

        if (props.corporateData.contactPerson !== '') {
            if (!checkValidity(props.corporateData.contactPerson, { required: true, maxLength: 120 })) {
                hasError = true;
                errorContactPerson = true;
                contactPersonError = <FormHelperText id="helper-outlined-adornment-contact-person">Contact Person must not exceed to 120 characters.</FormHelperText>;
            }
        }

        if (props.corporateData.contactNumber !== '') {
            if (!checkValidity(props.corporateData.contactNumber, { required: true, maxLength: 120 })) {
                hasError = true;
                errorContactNumber = true;
                contactNumberError = <FormHelperText id="helper-outlined-adornment-corporate-contactNumber">Contact Number must not exceed to 120 characters.</FormHelperText>;
            }
        }

        if (props.corporateData.email !== '') {
            if (!checkValidity(props.corporateData.email, { required: true, maxLength: 120 })) {
                hasError = true;
                errorEmail = true;
                emailError = <FormHelperText id="helper-outlined-adornment-corporate-email">Email address must not exceed to 120 characters.</FormHelperText>;
            }
        }

        if (props.corporateData.resultEmail !== '') {
            if (!checkValidity(props.corporateData.resultEmail, { required: true, maxLength: 200 })) {
                hasError = true;
                errorResultEmail = true;
                resultEmailError = <FormHelperText id="helper-outlined-adornment-corporate-resultEmail">Result Email address must not exceed to 200 characters.</FormHelperText>;
            }
        }

        if (props.corporateData.chargeType === null) {
            hasError = true;
            errorChargeType = true;
            chargeTypeError = <FormHelperText id="helper-outlined-adornment-corporate-chargeType">Charge Type is Required.</FormHelperText>;
        }

        const updateCorporateData = updateObject(props.corporateData, {
            isErrCName: errorCompanyName,
            isErrCAdd: errorCompanyAddress,
            isErrCPerson: errorContactPerson,
            isErrCNo: errorContactNumber,
            isErrCEmail: errorEmail,
            isErrCREmail: errorResultEmail,
            isErrCCType: errorChargeType,
            isErrSOACode: errorSOACode,
            cnameError: companyNameError,
            caddError: companyAddressError,
            cpersonError: contactPersonError,
            cnoError: contactNumberError,
            cemailError: emailError,
            crEmailError: resultEmailError,
            ccTypeError: chargeTypeError,
            soaCodeError: soaCodeError,
        });
        props.setCorporateData(updateCorporateData);

        if (!hasError) {
            props.saveClick();
        }

    }

    let titleModal = "Add Charge";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    let activeOption = null;
    if (props.isUpdate !== null) {
        titleModal = "Update Charge";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.corporateData.active}
                        onChange={handleChangeSwitch('active')}
                        name="active"
                        color="primary"
                    />
                }
                label="Active"
                className="mt-2"
            />
        );
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>{titleModal}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrCName} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-company-name">Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-company-name"
                                value={props.corporateData.companyName}
                                onChange={handleChange('companyName')}
                                labelWidth={50}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.corporateData.cnameError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrCAdd} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-company-address">Adddress</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-company-address"
                                value={props.corporateData.companyAddress}
                                onChange={handleChange('companyAddress')}
                                labelWidth={75}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.corporateData.caddError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrCPerson} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-contact-person">Contact Person</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-contact-person"
                                value={props.corporateData.contactPerson}
                                onChange={handleChange('contactPerson')}
                                labelWidth={115}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.corporateData.cpersonError}
                        </FormControl>
                    </CCol>
                </CRow>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrCNo} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-contactNumber">Contact Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-contactNumber"
                                value={props.corporateData.contactNumber}
                                onChange={handleChange('contactNumber')}
                                labelWidth={115}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.corporateData.cnoError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrCEmail} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-email">SOA Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-email"
                                // type="email"
                                value={props.corporateData.email}
                                onChange={handleChange('email')}
                                labelWidth={145}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.corporateData.cemailError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrCREmail} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-resultEmail">Results Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-resultEmail"
                                // type="email"
                                value={props.corporateData.resultEmail}
                                onChange={handleChange('resultEmail')}
                                labelWidth={160}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.corporateData.crEmailError}
                        </FormControl>
                    </CCol>
                </CRow>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrCCType} fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Charge Type</CLabel>
                            <ReactSelect
                                className="basic-single"
                                placeholder="--"
                                value={props.corporateData.chargeType}
                                onChange={handleSelectChange('chargeType')}
                                isClearable={true}
                                isSearchable={false}
                                isLoading={false}
                                options={chargeTypes}
                            />
                            {props.corporateData.ccTypeError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.corporateData.isErrSOACode} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-corporate-soaCode">SOA Code</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-corporate-soaCode"
                                // type="email"
                                value={props.corporateData.soaCode}
                                onChange={handleChange('soaCode')}
                                labelWidth={100}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.corporateData.soaCodeError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-2">
                        {activeOption}
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                {saveButton}
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default CorporateModal
