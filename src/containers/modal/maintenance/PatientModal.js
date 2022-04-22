import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MomentUtils from '@date-io/moment';
import ReactSelect from 'react-select';

import {
    CButton,
    CContainer,
    CRow,
    CCol,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CInput
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

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { updateObject, checkValidity, computeAge } from 'src/store/utility';
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
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    }
}));

const PatientModal = (props) => {
    let check = false;
    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        const updatePatientData = updateObject(props.patientData, {
            [prop]: event.target.value,
        });
        props.setPatientData(updatePatientData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        const updatePatientData = updateObject(props.patientData, {
            [prop]: event.target.checked,
        });
        props.setPatientData(updatePatientData);
    };

    const handleDateChange = (prop) => (date) => {
        const updatePatientData = updateObject(props.patientData, {
            [prop]: date,
        });
        props.setPatientData(updatePatientData);
    };

    const handleSelectChange = (prop) => (event) => {
        const updatePatientData = updateObject(props.patientData, {
            [prop]: event,
        });
        props.setPatientData(updatePatientData);
    };

    const computeBMI = (height, weight) => {
        return ((weight / Math.pow(height, 2)) * 10000).toFixed(1);
    }

    const computeFtToCm = (feet, inch) => {
        let ft = (feet * 12);
        let cm = (parseInt(ft) + parseInt(inch));
        return cm * 2.54
    }

    const handleChangeHeightWeight = (prop) => (event) => {
        let cm = props.patientData.height
        let bmi = props.patientData.bmi
        if (prop === 'feet' || prop === 'inch') {
            let feet = props.patientData.feet
            let inch = props.patientData.inch
            let weight = props.patientData.weight

            if (feet === '') feet = 0
            if (inch === '' || inch == undefined) inch = 0
            if (weight === '') weight = 0

            if (prop === 'feet') {
                feet = event.target.value
            } else if (prop === 'inch') {
                inch = event.target.value
            }

            cm = computeFtToCm(feet, inch).toFixed(2)

            if (weight !== 0) {
                bmi = computeBMI(cm, weight);
            }
        }

        if (prop === 'weight') {
            let height = props.patientData.height
            let weight = event.target.value
            if (height !== '' && weight !== '') {
                bmi = computeBMI(height, weight);
            }
        }

        const updatePatientData = updateObject(props.patientData, {
            [prop]: event.target.value,
            bmi: bmi,
            height: cm
        });
        props.setPatientData(updatePatientData);
    };

    const validateInputs = () => {
        let hasError = false;
        let errorLastName = false;
        let errorFirstName = false;
        let errorMiddleName = false;
        let errorDOB = false;
        let errorGender = false;
        let errorCNo = false;
        let errorEmail = false;
        let errorAddress = false;
        let errorCorpId = false;
        let errorSnrId = false;
        let errorPwdId = false;
        let errorNationId = false;
        let lastNameError = null;
        let firsNameError = null;
        let middleError = null;
        let dobError = null;
        let genderError = null;
        let cnoError = null;
        // let emailError = null;
        let addressError = null;
        let corpIdError = null;
        let snrIdError = null;
        let pwdIdError = null;
        let passportIdError = null;
        let nationIdError = null;

        if (!checkValidity(props.patientData.firstname, { required: true, maxLength: 120 })) {
            hasError = true;
            errorFirstName = true;
            firsNameError = <FormHelperText id="helper-outlined-adornment-patient-firstname">First Name is required.</FormHelperText>;
        }

        if (!checkValidity(props.patientData.lastname, { required: true, maxLength: 120 })) {
            hasError = true;
            errorLastName = true;
            lastNameError = <FormHelperText id="helper-outlined-adornment-patient-lastname">Last Name is required.</FormHelperText>;
        }

        if (props.patientData.middlename !== '') {
            if (!checkValidity(props.patientData.middlename, { required: true, maxLength: 120 })) {
                hasError = true;
                errorMiddleName = true;
                middleError = <FormHelperText id="helper-outlined-adornment-patient-middlename">Middle Name must not exceed to 120 characters.</FormHelperText>;
            }
        }

        if (props.patientData.dateOfBirth === null) {
            hasError = true;
            errorDOB = true;
            dobError = <FormHelperText id="helper-outlined-adornment-date-of-birth">Birth Date is required.</FormHelperText>;
        }

        if (!checkValidity(props.patientData.contactNumber, { required: true, maxLength: 20 })) {
            hasError = true;
            errorCNo = true;
            cnoError = <FormHelperText id="helper-outlined-adornment-patient-contactnumber">Contact Number is required.</FormHelperText>;
        }

        // if (!checkValidity(props.patientData.email, { required: true, maxLength: 120 })) {
        //     hasError = true;
        //     errorEmail = true;
        //     emailError = <FormHelperText id="helper-outlined-adornment-patient-email">Email is required.</FormHelperText>;
        // }

        if (props.patientData.gender === null) {
            hasError = true;
            errorGender = true;
            genderError = <FormHelperText id="helper-outlined-adornment-gender">Gender is required.</FormHelperText>;
        }

        if (!checkValidity(props.patientData.address, { required: true, maxLength: 250 })) {
            hasError = true;
            errorAddress = true;
            addressError = <FormHelperText id="helper-outlined-adornment-patient-address">Address is required.</FormHelperText>;
        }

        if (props.patientData.nationalityId === null) {
            hasError = true;
            errorNationId = true;
            nationIdError = <FormHelperText id="helper-outlined-adornment-nationality">Nationality is required.</FormHelperText>;
        }

        if (props.patientData.seniorId !== '') {
            if (!checkValidity(props.patientData.seniorId, { required: true, maxLength: 20 })) {
                hasError = true;
                errorSnrId = true;
                snrIdError = <FormHelperText id="helper-outlined-adornment-senior-id">Senior Citizen Id must not exceed to 20 characters.</FormHelperText>;
            }
        }

        if (props.patientData.pwdId !== '') {
            if (!checkValidity(props.patientData.pwdId, { required: true, maxLength: 20 })) {
                hasError = true;
                errorPwdId = true;
                pwdIdError = <FormHelperText id="helper-outlined-adornment-pwd-id">PWD Id must not exceed to 20 characters.</FormHelperText>;
            }
        }

        if (props.patientData.pwdId !== '') {
            if (!checkValidity(props.patientData.passport, { required: true, maxLength: 30 })) {
                hasError = true;
                errorPwdId = true;
                passportIdError = <FormHelperText id="helper-outlined-adornment-pwd-id">Passport Id must not exceed to 30 characters.</FormHelperText>;
            }
        }


        const updatePatientData = updateObject(props.patientData, {
            isErrorFirstName: errorFirstName,
            isErrorLastName: errorLastName,
            isErrorMidName: errorMiddleName,
            isErrorDOB: errorDOB,
            isErrorGender: errorGender,
            isErrorContNo: errorCNo,
            isErrorEmail: errorEmail,
            isErrorAddress: errorAddress,
            isErrorCorpId: errorCorpId,
            isErrorSnrId: errorSnrId,
            isErrorPwdId: errorPwdId,
            isErrorNatId: errorNationId,
            firstNameError: firsNameError,
            lastNameError: lastNameError,
            midNameError: middleError,
            dobError: dobError,
            genderError: genderError,
            contNoError: cnoError,
            // emailError: emailError,
            addressError: addressError,
            corpIdError: corpIdError,
            snrIdError: snrIdError,
            pwdIdError: pwdIdError,
            natIdError: nationIdError,
            passportIdError: passportIdError,
        });
        props.setPatientData(updatePatientData);

        if (!hasError) {
            props.saveClick();
        }

    }

    
    const checkTermsAndCodition = (prop) => () => {
        const updatePatientData = updateObject(props.patientData, {
            [prop]: !props.patientData.isChecked,
        });
        props.setPatientData(updatePatientData);
    }

    let titleModal = "Add Patient";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} disabled={props.patientData.isChecked}>Save</CButton>);
    let checkBox = (<FormControlLabel
        control={
            <Checkbox
                onChange={checkTermsAndCodition('isChecked')}
                color="primary"
                className="p-0"
                checked={!props.patientData.isChecked}
            />
        }
        className="m-0"
    />);
    let activeOption = null;
    if (props.isUpdate !== null) {
        titleModal = "Update Patient";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.patientData.active}
                        onChange={handleChangeSwitch('active')}
                        name="active"
                        color="primary"
                    />
                }
                label="Active"
            />
        );
    }
    const takePicture = () => {
        props.openCameraModal();
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
                <CContainer>
                    {props.isPatient == true ?
                        <><CRow>
                            <CCol className="d-flex justify-content-center">
                                <label htmlFor="photo-upload" className="custom-file-upload fas">
                                    <div className="img-wrap img-upload">
                                        <img className="img-profile" src={props.image} />
                                    </div>
                                </label>
                            </CCol>
                        </CRow>
                            <CRow>
                                <CCol className="d-flex justify-content-center">
                                    <CButton className="border border-dark" color="primary" onClick={takePicture}>{props.image !== "" ? "Retake Image" : "Take Picture"}</CButton>
                                </CCol>
                            </CRow></> : null}


                    <CRow>
                        <CCol md="4" className="p-1">
                            <FormControl error={props.patientData.isErrorFirstName} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-patient-firstname">First Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-patient-firstname"
                                    value={props.patientData.firstname}
                                    onChange={handleChange('firstname')}
                                    labelWidth={80}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.firstNameError}
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <FormControl error={props.patientData.isErrorMidName} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-patient-middlename">Middle Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-patient-middlename"
                                    value={props.patientData.middlename}
                                    onChange={handleChange('middlename')}
                                    labelWidth={80}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.midNameError}
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <FormControl error={props.patientData.isErrorLastName} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-patient-lastname">Last Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-patient-lastname"
                                    value={props.patientData.lastname}
                                    onChange={handleChange('lastname')}
                                    labelWidth={80}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.lastNameError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="3" className="p-1">
                            <FormControl error={props.patientData.isErrorDOB} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                        clearable
                                        variant="outlined"
                                        format="MM-DD-yyyy"
                                        placeholder="MM-DD-YYYY"
                                        margin="normal"
                                        label="Birth Date"
                                        value={props.patientData.dateOfBirth}
                                        onChange={handleDateChange('dateOfBirth')}
                                        maxDate={new Date()}
                                        className="m-0"
                                        error={props.patientData.isErrorDOB}
                                    />
                                </MuiPickersUtilsProvider>
                                {props.patientData.dobError}
                            </FormControl>
                        </CCol>
                        <CCol md="2" className="p-1 pl-4 mt-4">
                            <CLabel className="h5">AGE: {computeAge(props.patientData.dateOfBirth)}</CLabel>
                        </CCol>
                        <CCol md="3" className="p-1">
                            <FormControl error={props.patientData.isErrorContNo} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-patient-contactNumber">Contact Number</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-patient-contactNumber"
                                    value={props.patientData.contactNumber}
                                    onChange={handleChange('contactNumber')}
                                    labelWidth={120}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.contNoError}
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <FormControl error={props.patientData.isErrorEmail} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-patient-email">Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-patient-email"
                                    type="email"
                                    value={props.patientData.email}
                                    onChange={handleChange('email')}
                                    labelWidth={40}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {/* {props.patientData.emailError} */}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="3" className="p-1">
                            <FormControl error={props.patientData.isErrorGender} fullWidth className={clsx(classes.margin, "ml-2 mt-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Gender</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.patientData.gender}
                                    onChange={handleSelectChange('gender')}
                                    isClearable={true}
                                    isSearchable={false}
                                    isLoading={false}
                                    options={
                                        [
                                            { value: 'M', label: 'MALE' },
                                            { value: 'F', label: 'FEMALE' }
                                        ]
                                    }
                                />

                                {props.patientData.genderError}
                            </FormControl>
                        </CCol>
                        <CCol md="9" className="p-1">
                            <FormControl error={props.patientData.isErrorAddress} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-patient-address">Address</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-patient-address"
                                    value={props.patientData.address}
                                    onChange={handleChange('address')}
                                    labelWidth={60}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.addressError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="5" className="p-1">
                            <FormControl error={props.patientData.isErrorNatId} fullWidth className={clsx(classes.margin, "ml-2 mt-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Nationality</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.patientData.nationalityId}
                                    onChange={handleSelectChange('nationalityId')}
                                    isClearable={true}
                                    isSearchable={true}
                                    isLoading={false}
                                    options={
                                        [].concat(props.nationalityList)
                                            .sort((a, b) => a.nationality > b.nationality ? 1 : -1)
                                            .map((nation) => {
                                                return { value: nation.id.toString(), label: nation.countryName + "-" + nation.nationality }
                                            })
                                    }
                                />
                                {props.patientData.natIdError}
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <FormControl error={props.patientData.isErrorSnrId} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-seniorId">Senior Citizen ID (if applicable)</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-seniorId"
                                    value={props.patientData.seniorId}
                                    onChange={handleChange('seniorId')}
                                    labelWidth={120}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.snrIdError}
                            </FormControl>
                        </CCol>
                        <CCol md="3" className="p-1">
                            <FormControl error={props.patientData.isErrorPwdId} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-pwdId">PWD ID (if applicable)</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-pwdId"
                                    value={props.patientData.pwdId}
                                    onChange={handleChange('pwdId')}
                                    labelWidth={60}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.pwdIdError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="6" className="p-1">
                            <FormControl error={props.patientData.isErrorCorpId} fullWidth className={clsx(classes.margin, "ml-2 mt-0")} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Company</CLabel>
                                <ReactSelect
                                    className="basic-single"
                                    placeholder="--"
                                    value={props.patientData.corporateId}
                                    onChange={handleSelectChange('corporateId')}
                                    isClearable={true}
                                    isSearchable={true}
                                    isLoading={false}
                                    options={
                                        [].concat(props.corporateList)
                                            .sort((a, b) => a.companyName > b.companyName ? 1 : -1)
                                            .map((corp) => {
                                                return { value: corp.corporateid, label: corp.companyName }
                                            })
                                    }
                                />
                                {props.patientData.corpIdError}
                            </FormControl>
                        </CCol>
                        <CCol md="6" className="p-1">
                            <FormControl error={props.patientData.isErrorPwdId} fullWidth className={clsx(classes.margin)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-pwdId">PASSPORT ID (if applicable)</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-passport"
                                    value={props.patientData.passport}
                                    onChange={handleChange('passport')}
                                    labelWidth={60}
                                    margin="dense"
                                    className={classes.outlinedInput}
                                />
                                {props.patientData.passportIdError}
                            </FormControl>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="1" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2 ")}>feet</CLabel>
                                <CInput
                                    value={props.patientData.feet}
                                    onChange={handleChangeHeightWeight('feet')}
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="1" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>inch</CLabel>
                                <CInput
                                    value={props.patientData.inch}
                                    onChange={handleChangeHeightWeight('inch')}
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>(cm)</CLabel>
                                <CLabel className="ml-2 mt-1 font-weight-bold">
                                    {props.patientData.height}
                                </CLabel>
                            </FormControl>
                        </CCol>
                        <CCol md="2" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Weight (kg)</CLabel>
                                <CInput
                                    value={props.patientData.weight}
                                    onChange={handleChangeHeightWeight('weight')}
                                />
                            </FormControl>
                        </CCol>
                        <CCol md="4" className="p-1">
                            <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                                <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>BMI (Normal 18.5 - 24.9)</CLabel>
                                <CLabel className="ml-2 mt-1 font-weight-bold">
                                    {props.patientData.bmi}
                                </CLabel>
                            </FormControl>
                        </CCol>

                        <CCol md="12" className="p-1">
                            {props.isPatient == true ?
                                <center>
                                    By signing this form, I am authorizing Quest Phil Diagnostics to process, access and be furnished copies of my Medical Records for the evaluation of all information including but not limited to medical results, diagnosis, abstract treatments and other records <br></br>
                                    Accept <span style={{ color: 'skyblue' }}>Terms</span> and <span style={{ color: 'skyblue' }}>Condition</span>
                                    {checkBox}
                                </center>
                                :
                                ""}
                        </CCol>
                    </CRow>
                </CContainer>
                {activeOption}
            </CModalBody>
            <CModalFooter>
                {saveButton}
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal >
    )
}

const mapStateToProps = (state) => {
    return {
        corporateList: state.corps.corporateList,
        nationalityList: state.geo.nationalityList,
    }
};
export default connect(mapStateToProps)(PatientModal)
