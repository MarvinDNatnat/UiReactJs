import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CButton,
    CCol,
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
    Checkbox,
} from '@material-ui/core';

import { updateObject, checkValidity } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    signature: {
        width: '200px',
        height: '175px',
    }
}));

const DoctorModal = (props) => {

    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const imageInputRef = React.useRef();

    useEffect(() => {
        setSelectedFile(null);
        setIsFilePicked(false);
        imageInputRef.current.value = "";
    }, [props.doctorData.signature]);

    const handleChange = (prop) => (event) => {
        const updateDoctorData = updateObject(props.doctorData, {
            [prop]: event.target.value,
        });
        props.setDoctorData(updateDoctorData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        let doctorType = props.doctorData.doctorType;
        switch (prop) {
            case 'physician':
                if (event.target.checked) {
                    doctorType += 1;
                } else {
                    doctorType -= 1;
                }

                break;

            case 'pathologist':
                if (event.target.checked) {
                    doctorType += 2;
                } else {
                    doctorType -= 2;
                }

                break;

            case 'radiologist':
                if (event.target.checked) {
                    doctorType += 4;
                } else {
                    doctorType -= 4;
                }

                break;

            default:
                break;
        }

        const updateDoctorData = updateObject(props.doctorData, {
            [prop]: event.target.checked,
            doctorType: doctorType,
        });
        props.setDoctorData(updateDoctorData);
    };

    const fileChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const validateInputs = () => {
        let hasError = false;
        let errorLastname = false;
        let errorFirstname = false;
        // let errorMiddlename = false;
        let errorSuffix = false;
        let errorSpecialization = false;
        let errorContactNumber = false;
        let errorEmail = false;
        let errorLicenseNumber = false;
        let lastnameError = null;
        let firstnameError = null;
        // let middlenameError = null;
        let suffixError = null;
        let specializationError = null;
        let contactNumberError = null;
        let emailError = null;
        let licenseNumberError = null;

        if (!checkValidity(props.doctorData.lastname, { required: true })) {
            hasError = true;
            errorLastname = true;
            lastnameError = <FormHelperText id="helper-outlined-adornment-doctor-lastname">Last name is required.</FormHelperText>;
        }

        if (!checkValidity(props.doctorData.firstname, { required: true })) {
            hasError = true;
            errorFirstname = true;
            firstnameError = <FormHelperText id="helper-outlined-adornment-doctor-firstname">First name is required.</FormHelperText>;
        }

        // if (!checkValidity(props.doctorData.middlename, { required: true })) {
        //     hasError = true;
        //     errorMiddlename = true;
        //     middlenameError = <FormHelperText id="helper-outlined-adornment-doctor-middlename">Middle name is required.</FormHelperText>;
        // }

        if (!checkValidity(props.doctorData.suffix, { required: true })) {
            hasError = true;
            errorSuffix = true;
            suffixError = <FormHelperText id="helper-outlined-adornment-doctor-suffix">Suffix is required.</FormHelperText>;
        }

        // if (!checkValidity(props.doctorData.specialization, { required: true })) {
        //     hasError = true;
        //     errorSpecialization = true;
        //     specializationError = <FormHelperText id="helper-outlined-adornment-specialization">Specialization is required.</FormHelperText>;
        // }

        // if (!checkValidity(props.doctorData.contactNumber, { required: true })) {
        //     hasError = true;
        //     errorContactNumber = true;
        //     contactNumberError = <FormHelperText id="helper-outlined-adornment-doctor-contactNumber">Contact number is required.</FormHelperText>;
        // }

        // if (!checkValidity(props.doctorData.email, { required: true })) {
        //     hasError = true;
        //     errorEmail = true;
        //     emailError = <FormHelperText id="helper-outlined-adornment-doctor-email">Contact number is required.</FormHelperText>;
        // }

        if (!checkValidity(props.doctorData.licenseNumber, { required: true })) {
            hasError = true;
            errorLicenseNumber = true;
            licenseNumberError = <FormHelperText id="helper-outlined-adornment-doctor-licenseNumber">License number is required.</FormHelperText>;
        }

        const updateDoctorData = updateObject(props.doctorData, {
            isErrorLastname: errorLastname,
            isErrorFirstname: errorFirstname,
            // isErrorMiddlename: errorMiddlename,
            isErrorSuffix: errorSuffix,
            isErrorSpecialization: errorSpecialization,
            isErrorContactNumber: errorContactNumber,
            isErrorEmail: errorEmail,
            isErrorLicenseNumber: errorLicenseNumber,
            lastnameError: lastnameError,
            firstnameError: firstnameError,
            // middlenameError: middlenameError,
            suffixError: suffixError,
            specializationError: specializationError,
            contactNumberError: contactNumberError,
            emailError: emailError,
            licenseNumberError: licenseNumberError
        });
        props.setDoctorData(updateDoctorData);

        if (!hasError) {
            props.saveClick();
        }
    }

    let titleModal = "Add Doctor";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    let activeOption = null;
    if (props.isUpdate !== null) {
        titleModal = "Update Doctor";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.doctorData.active}
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
                        <FormControl error={props.doctorData.isErrorLastname} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-doctor-lastname">Last Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-doctor-lastname"
                                value={props.doctorData.lastname}
                                onChange={handleChange('lastname')}
                                labelWidth={75}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.lastnameError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.doctorData.isErrorFirstname} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-doctor-firstname">First Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-doctor-firstname"
                                value={props.doctorData.firstname}
                                onChange={handleChange('firstname')}
                                labelWidth={77}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.firstnameError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.doctorData.isErrorMiddlename} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-doctor-middlename">Middle Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-doctor-middlename"
                                value={props.doctorData.middlename}
                                onChange={handleChange('middlename')}
                                labelWidth={95}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.middlenameError}
                        </FormControl>
                    </CCol>
                </CRow>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.doctorData.isErrorSuffix} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-doctor-suffix">Suffix</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-doctor-suffix"
                                value={props.doctorData.suffix}
                                onChange={handleChange('suffix')}
                                labelWidth={50}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.suffixError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.doctorData.isErrorSpecialization} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-specialization">Specialization</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-specialization"
                                value={props.doctorData.specialization}
                                onChange={handleChange('specialization')}
                                labelWidth={98}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.specializationError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.doctorData.isErrorContactNumber} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-doctor-contactNumber">Contact Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-doctor-contactNumber"
                                value={props.doctorData.contactNumber}
                                onChange={handleChange('contactNumber')}
                                labelWidth={117}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.contactNumberError}
                        </FormControl>
                    </CCol>
                </CRow>
                <CRow className="m-0 p-0">
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.doctorData.isErrorEmail} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-doctor-email">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-doctor-email"
                                value={props.doctorData.email}
                                onChange={handleChange('email')}
                                labelWidth={102}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.emailError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-1">
                        <FormControl error={props.doctorData.isErrorLicenseNumber} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-doctor-licenseNumber">License Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-doctor-licenseNumber"
                                value={props.doctorData.licenseNumber}
                                onChange={handleChange('licenseNumber')}
                                labelWidth={117}
                                margin="dense"
                                className={classes.outlinedInput}
                            />
                            {props.doctorData.licenseNumberError}
                        </FormControl>
                    </CCol>
                    <CCol md="4" className="col-12 m-0 p-2">
                        {activeOption}
                    </CCol>
                </CRow>
                <CRow className="m-0 p-0">
                    <InputLabel>Filter Type:</InputLabel>
                </CRow>
                <CRow className="m-0 p-0">
                    <CCol md="2" className="col-12 m-0 p-1">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.doctorData.physician}
                                    onChange={handleChangeSwitch("physician")}
                                    color="primary"
                                    className="p-0"
                                />
                            }
                            label="Physician[PE]"
                            className="m-0"
                        />
                    </CCol>
                    <CCol md="2" className="col-12 m-0 p-1">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.doctorData.pathologist}
                                    onChange={handleChangeSwitch("pathologist")}
                                    color="primary"
                                    className="p-0"
                                />
                            }
                            label="Pathologist"
                            className="m-0"
                        />
                    </CCol>
                    <CCol md="2" className="col-12 m-0 p-1">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.doctorData.radiologist}
                                    onChange={handleChangeSwitch("radiologist")}
                                    color="primary"
                                    className="p-0"
                                />
                            }
                            label="Radiologist"
                            className="m-0"
                        />
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
                                disabled={props.isUpdate !== null ? false : true}
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
                            disabled={props.isUpdate !== null ? false : true}
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
                            props.doctorData.signature !== null
                                ? <img src={`data:image/*;base64,${props.doctorData.signature}`} alt="signature" className={classes.signature} />
                                : null
                        }
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

export default DoctorModal;