import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MomentUtils from '@date-io/moment';

import {
    CButton,
    CContainer,
    CRow,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';

import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { updateObject, checkValidity } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
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
    signature: {
        width: '200px',
        height: '175px',
    }
}));

const UserProfileModal = (props) => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const imageInputRef = React.useRef();

    useEffect(() => {
        setSelectedFile(null);
        setIsFilePicked(false);
        imageInputRef.current.value = "";
    }, [props.profileData.signature]);

    const fileChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const handleChange = (prop) => (event) => {
        const updateProfileData = updateObject(props.profileData, {
            [prop]: event.target.value,
        });
        props.setProfileData(updateProfileData);
    };

    const handleDateChange = (prop) => (date) => {
        const updateProfileData = updateObject(props.profileData, {
            [prop]: date,
        });
        props.setProfileData(updateProfileData);
    };

    const validateInputs = () => {
        let hasError = false;
        let errorLastName = false;
        let errorFirstName = false;
        let errorMiddleName = false;
        let errorSuffix = false;
        let errorDOB = false;
        let errorGender = false;
        let errorCNo = false;
        let errorEmail = false;
        let errorAddress = false;
        let errorLicenseNumber = false;

        let lastNameError = null;
        let firsNameError = null;
        let middleError = null;
        let suffixError = null;
        let dobError = null;
        let genderError = null;
        let cnoError = null;
        let emailError = null;
        let addressError = null;
        let licenseNumberError = null;

        if (!checkValidity(props.profileData.firstname, { required: true, maxLength: 120 })) {
            hasError = true;
            errorFirstName = true;
            firsNameError = <FormHelperText id="helper-outlined-adornment-profile-firstname">First Name is required.</FormHelperText>;
        }

        if (!checkValidity(props.profileData.lastname, { required: true, maxLength: 120 })) {
            hasError = true;
            errorLastName = true;
            lastNameError = <FormHelperText id="helper-outlined-adornment-profile-lastname">Last Name is required.</FormHelperText>;
        }

        if (props.profileData.middlename !== '') {
            if (!checkValidity(props.profileData.middlename, { required: true, maxLength: 120 })) {
                hasError = true;
                errorMiddleName = true;
                middleError = <FormHelperText id="helper-outlined-adornment-profile-middlename">Middle Name must not exceed to 120 characters.</FormHelperText>;
            }
        }

        if (props.profileData.suffix !== '') {
            if (!checkValidity(props.profileData.suffix, { required: true, maxLength: 20 })) {
                hasError = true;
                errorSuffix = true;
                suffixError = <FormHelperText id="helper-outlined-adornment-suffix">Suffix must not exceed to 20 characters.</FormHelperText>;
            }
        }

        if (props.profileData.dateOfBirth === null) {
            hasError = true;
            errorDOB = true;
            dobError = <FormHelperText id="helper-outlined-adornment-date-of-birth">Birth Date is required.</FormHelperText>;
        }

        if (!checkValidity(props.profileData.contactNumber, { required: true, maxLength: 20 })) {
            hasError = true;
            errorCNo = true;
            cnoError = <FormHelperText id="helper-outlined-adornment-profile-contactNumber">Contact Number is required.</FormHelperText>;
        }

        if (!checkValidity(props.profileData.email, { required: true, isEmail: true, maxLength: 120 })) {
            hasError = true;
            errorEmail = true;
            emailError = <FormHelperText id="helper-outlined-adornment-profile-email">Email is required and email format.</FormHelperText>;
        }

        if (!checkValidity(props.profileData.gender, { required: true, maxLength: 1 })) {
            hasError = true;
            errorGender = true;
            genderError = <FormHelperText id="helper-outlined-adornment-profile-gender">Gender is required.</FormHelperText>;
        }

        if (!checkValidity(props.profileData.address, { required: true, maxLength: 250 })) {
            hasError = true;
            errorAddress = true;
            addressError = <FormHelperText id="helper-outlined-adornment-profile-address">Address is required.</FormHelperText>;
        }

        if (props.profileData.licenseNumber !== '') {
            if (!checkValidity(props.profileData.licenseNumber, { required: true, maxLength: 20 })) {
                hasError = true;
                errorLicenseNumber = true;
                licenseNumberError = <FormHelperText id="helper-outlined-adornment-profile-licenseNumber">License number must not exceed to 20 characters.</FormHelperText>;
            }
        }

        const updateProfileData = updateObject(props.profileData, {
            isErrorFirstName: errorFirstName,
            isErrorLastName: errorLastName,
            isErrorMidName: errorMiddleName,
            isErrorSuffix: errorSuffix,
            isErrorDOB: errorDOB,
            isErrorGender: errorGender,
            isErrorContNo: errorCNo,
            isErrorEmail: errorEmail,
            isErrorAddress: errorAddress,
            isErrorLicenseNumber: errorLicenseNumber,

            firstNameError: firsNameError,
            lastNameError: lastNameError,
            midNameError: middleError,
            suffixError: suffixError,
            dobError: dobError,
            genderError: genderError,
            contNoError: cnoError,
            emailError: emailError,
            addressError: addressError,
            licenseNumberError: licenseNumberError
        });
        props.setProfileData(updateProfileData);

        if (!hasError) {
            props.saveClick();
        }
    }

    let title = "My Profile";
    if (props.profileData !== null && props.profileData.username !== undefined && props.profileData.username !== null) {
        title = "User Profile-" + props.profileData.username.trim().toUpperCase();
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CContainer>
                    <CRow>
                        <CCol md="4" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorLastName} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-profile-lastname">Last Name</InputLabel>
                                <OutlinedInput
                                    value={props.profileData.lastname}
                                    onChange={handleChange('lastname')}
                                    labelWidth={80}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.lastNameError}
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorFirstName} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-profile-firstname">First Name</InputLabel>
                                <OutlinedInput
                                    value={props.profileData.firstname}
                                    onChange={handleChange('firstname')}
                                    labelWidth={80}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.firstNameError}
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorMidName} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-profile-middlename">Middle Name</InputLabel>
                                <OutlinedInput
                                    value={props.profileData.middlename}
                                    onChange={handleChange('middlename')}
                                    labelWidth={80}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.midNameError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="2" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorSuffix} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-suffix">Suffix</InputLabel>
                                <OutlinedInput
                                    value={props.profileData.suffix}
                                    onChange={handleChange('suffix')}
                                    labelWidth={120}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.suffixError}
                            </FormControl>
                        </CCol>
                        <CCol md="3" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorLicenseNumber} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-profile-licenseNumber">License Number</InputLabel>
                                <OutlinedInput
                                    value={props.profileData.licenseNumber}
                                    onChange={handleChange('licenseNumber')}
                                    labelWidth={120}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.licenseNumberError}
                            </FormControl>
                        </CCol>
                        <CCol md="3" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorGender} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-select-gender">Gender</InputLabel>
                                <Select
                                    labelid="outlined-adornment-select-gender-id"
                                    value={props.profileData.gender}
                                    onChange={handleChange('gender')}
                                    label="Gender"
                                    margin="dense"
                                    className="mt-2"
                                >
                                    <MenuItem value="">----</MenuItem>
                                    <MenuItem value="M">MALE</MenuItem>
                                    <MenuItem value="F">FEMALE</MenuItem>
                                </Select>
                                {props.profileData.genderError}
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorDOB} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        clearable
                                        variant="outlined"
                                        format="yyyy-MMM-DD"
                                        placeholder="YYYY-MMM-DD"
                                        margin="normal"
                                        label="Birth Date"
                                        value={props.profileData.dateOfBirth}
                                        onChange={handleDateChange('dateOfBirth')}
                                        maxDate={new Date()}
                                        className="m-0"
                                        error={props.profileData.isErrorDOB}
                                    />
                                </MuiPickersUtilsProvider>
                                {props.profileData.dobError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="3" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorContNo} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-profile-contactNumber">Contact Number</InputLabel>
                                <OutlinedInput
                                    value={props.profileData.contactNumber}
                                    onChange={handleChange('contactNumber')}
                                    labelWidth={120}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.contNoError}
                            </FormControl>
                        </CCol>
                        <CCol md="3" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorEmail} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-profile-email">Email</InputLabel>
                                <OutlinedInput
                                    type="email"
                                    value={props.profileData.email}
                                    onChange={handleChange('email')}
                                    labelWidth={40}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.emailError}
                            </FormControl>
                        </CCol>
                        <CCol md="6" className="col-12 m-0 p-1">
                            <FormControl error={props.profileData.isErrorAddress} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-profile-address">Address</InputLabel>
                                <OutlinedInput
                                    value={props.profileData.address}
                                    onChange={handleChange('address')}
                                    labelWidth={60}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.profileData.addressError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow className="m-0 p-0">
                        <CCol md="12" className="col-12 m-0 p-0">
                            <InputLabel>Signature (1000x700 pixel) 64KB:</InputLabel>
                        </CCol>
                        <CCol md="10" className="col-12 m-0 p-0 pr-2">
                            <div className="custom-file">
                                <input type="file"
                                    className="custom-file-input"
                                    id="customFile"
                                    accept="image/*"
                                    onChange={fileChangeHandler}
                                    ref={imageInputRef}
                                    disabled={!props.profileData.uploadSignature}
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                >
                                    {isFilePicked && selectedFile !== undefined && selectedFile !== null ? selectedFile.name : 'Choose file'}
                                </label>
                            </div>
                        </CCol>
                        <CCol md="2" className="col-12 m-0 p-0">
                            <CButton
                                className="border border-dark"
                                color="primary"
                                onClick={() => props.uploadSignature(selectedFile)}
                                disabled={!props.profileData.uploadSignature}
                            >Upload</CButton>
                        </CCol>
                        <CCol md="6" className="col-12 m-0 mt-2 p-0">
                            {
                                isFilePicked && selectedFile !== undefined && selectedFile !== null
                                    ? <img src={URL.createObjectURL(selectedFile)} alt="signature" className={classes.signature} />
                                    : null
                            }
                        </CCol>
                        <CCol md="6" className="col-12 m-0 mt-2 p-0">
                            {
                                props.profileData.signature !== null
                                    ? <img src={`data:image/*;base64,${props.profileData.signature}`} alt="signature" className={classes.signature} />
                                    : null
                            }
                        </CCol>
                    </CRow>
                </CContainer>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={validateInputs}
                >Save</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>

        </CModal>
    )
}

export default UserProfileModal
