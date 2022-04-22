import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReactSelect from 'react-select';

import {
    CButton,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    Switch,
} from '@material-ui/core';

import {
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';

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

const UserModal = (props) => {
    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        const updateUserData = updateObject(props.userData, {
            [prop]: event.target.value,
        });
        props.setUserData(updateUserData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        const updateUserData = updateObject(props.userData, {
            [prop]: event.target.checked,
        });
        props.setUserData(updateUserData);
    };

    const handleClickShowPassword = () => {
        const updateUserData = updateObject(props.userData, {
            showPassword: !props.userData.showPassword
        });
        props.setUserData(updateUserData);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSelectChange = (prop) => (event) => {
        const updateUserData = updateObject(props.userData, {
            [prop]: event,
        });
        props.setUserData(updateUserData);
    }

    const validateInputs = () => {
        let hasError = false;
        let errorUsername = false;
        let errorPassword = false;
        let errorEmail = false;
        let usernameError = null;
        let passwordError = null;
        let emailError = null;

        if (!checkValidity(props.userData.username, { required: true })) {
            hasError = true;
            errorUsername = true;
            usernameError = <FormHelperText id="helper-outlined-adornment-user-username">Username is required.</FormHelperText>;
        }

        if (props.isUpdate !== null) {
            if (props.userData.password.trim() !== "" && !checkValidity(props.userData.password, { minLength: 6 })) {
                hasError = true;
                errorPassword = true;
                passwordError = <FormHelperText id="helper-outlined-adornment-password">Password is required with minimum length of 6 character.</FormHelperText>;
            }
        } else {
            if (!checkValidity(props.userData.password, { required: true, minLength: 6 })) {
                hasError = true;
                errorPassword = true;
                passwordError = <FormHelperText id="helper-outlined-adornment-password">Password is required with minimum length of 6 character.</FormHelperText>;
            }
        }

        if (!checkValidity(props.userData.email, { required: true, isEmail: true, maxLength: 120 })) {
            hasError = true;
            errorEmail = true;
            emailError = <FormHelperText id="helper-outlined-adornment-user-email">Email is required, email format and 120 character length.</FormHelperText>;
        }

        const updateUserData = updateObject(props.userData, {
            isErrorUsername: errorUsername,
            isErrorPassword: errorPassword,
            isErrorEmail: errorEmail,
            usernameError: usernameError,
            passwordError: passwordError,
            emailError: emailError,
        });
        props.setUserData(updateUserData);

        if (!hasError) {
            props.saveClick();
        }
    };

    let titleModal = "Add User";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    let activeOption = null;
    let passwordUpdateMessage = null;
    if (props.isUpdate !== null) {
        titleModal = "Update User";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.userData.active}
                        onChange={handleChangeSwitch('active')}
                        name="active"
                        color="primary"
                    />
                }
                label="Active"
            />
        );
        passwordUpdateMessage = <FormHelperText id="helper-outlined-adornment-password">*Input to reset password</FormHelperText>
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>{titleModal}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <FormControl error={props.userData.isErrorUsername} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-user-username">Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-user-username"
                        value={props.userData.username}
                        onChange={handleChange('username')}
                        labelWidth={75}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.userData.usernameError}
                </FormControl>
                <FormControl error={props.userData.isErrorPassword} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={props.userData.showPassword ? 'text' : 'password'}
                        value={props.userData.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {props.userData.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                        aria-describedby="helper-outlined-adornment-password"
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.userData.passwordError}
                    {passwordUpdateMessage}
                </FormControl>
                <FormControl error={props.userData.isErrorEmail} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-user-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-user-email"
                        type="email"
                        value={props.userData.email}
                        onChange={handleChange('email')}
                        labelWidth={45}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.userData.emailError}
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>User Roles</CLabel>
                    <ReactSelect
                        className="basic-single"
                        isMulti={true}
                        placeholder="--"
                        value={props.userData.userRoles}
                        onChange={handleSelectChange('userRoles')}
                        isClearable={true}
                        isSearchable={false}
                        isLoading={false}
                        options={
                            [].concat(props.userRoles)
                                .sort((a, b) => a.inputName > b.inputName ? 1 : -1)
                                .map((role) => {
                                    return { value: role.inputName, label: role.inputName.toUpperCase() }
                                })
                        }
                    />
                </FormControl>

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
        </CModal>
    )
}

export default UserModal;
