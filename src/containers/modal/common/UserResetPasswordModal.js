import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react';

import {
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    InputAdornment,
    OutlinedInput,
} from '@material-ui/core';

import {
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';

import { updateObject, checkValidity } from 'src/store/utility';
import * as actions from 'src/store/actions/index';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
}));

const UserResetPasswordModal = (props) => {
    const classes = useStyles();

    const resetPasswordModal = () => {
        const resetRequest = {
            userId: props.auth.userId,
            password: props.resetData.newPassword,
        }

        props.onResetUserPassword(props.userToken, resetRequest, props.closeClick);
    }

    const handleChange = (prop) => (event) => {
        const updateData = updateObject(props.resetData, {
            [prop]: event.target.value,
        });
        props.setResetData(updateData);
    };

    const handleClickShowPassword = (prop) => {
        const updateData = updateObject(props.resetData, {});
        switch (prop) {
            case 'showNewPassword':
                updateData.showNewPassword = !props.resetData.showNewPassword;
                break;

            case 'showConfirmPassword':
                updateData.showConfirmPassword = !props.resetData.showConfirmPassword;
                break;

            default:
                break;
        }

        props.setResetData(updateData);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validateInputs = () => {
        let hasError = false;
        let errorNewPassword = false;
        let errorConfirmPassword = false;
        let newPasswordError = null;
        let confirmPasswordError = null;

        if (!checkValidity(props.resetData.newPassword, { required: true, minLength: 6 })) {
            hasError = true;
            errorNewPassword = true;
            newPasswordError = <FormHelperText id="helper-outlined-adornment-new-password">New Password is required with minimum length of 6 character.</FormHelperText>;
        }

        if (!checkValidity(props.resetData.confirmPassword, { required: true, minLength: 6 })) {
            hasError = true;
            errorConfirmPassword = true;
            confirmPasswordError = <FormHelperText id="helper-outlined-adornment-confirm-password">Confirm Password is required with minimum length of 6 character.</FormHelperText>;
        }

        if (props.resetData.newPassword !== '' && props.resetData.confirmPassword !== '' &&
            props.resetData.newPassword !== props.resetData.confirmPassword) {
            hasError = true;
            errorConfirmPassword = true;
            confirmPasswordError = <FormHelperText id="helper-outlined-adornment-confirm-password">Pasword do not match.</FormHelperText>;
        }

        const updateData = updateObject(props.resetData, {
            isErrorNewPassword: errorNewPassword,
            isErrorConfirmPassword: errorConfirmPassword,
            newPasswordError: newPasswordError,
            confirmPasswordError: confirmPasswordError,
        });
        props.setResetData(updateData);

        if (!hasError) {
            resetPasswordModal();
        }
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Reset Password</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <FormControl error={props.resetData.isErrorNewPassword} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-new-password"
                        type={props.resetData.showNewPassword ? 'text' : 'password'}
                        value={props.resetData.newPassword}
                        onChange={handleChange('newPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('showNewPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {props.resetData.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={110}
                        aria-describedby="helper-outlined-adornment-new-password"
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.resetData.newPasswordError}
                </FormControl>
                <FormControl error={props.resetData.isErrorConfirmPassword} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={props.resetData.showConfirmPassword ? 'text' : 'password'}
                        value={props.resetData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('showConfirmPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {props.resetData.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={110}
                        aria-describedby="helper-outlined-adornment-confirm-password"
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.resetData.confirmPasswordError}
                </FormControl>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary" onClick={() => validateInputs()}
                >Reset</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
        userToken: state.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onResetUserPassword: (token, resetData, closeModal) => dispatch(actions.resetUserPassword(token, resetData, closeModal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserResetPasswordModal)
