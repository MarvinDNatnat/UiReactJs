import React from 'react';

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
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';

import { updateObject, checkValidity } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
}));

const AuthorizationModal = (props) => {
    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        const updateAuthData = updateObject(props.authData, {
            [prop]: event.target.value,
        });
        props.setAuthData(updateAuthData);
    };

    const validateInputs = () => {
        let hasError = false;
        let errorUsername = false;
        let errorPassword = false;
        let errorReason = false;

        if (!checkValidity(props.authData.username, { required: true })) {
            hasError = true;
            errorUsername = true;
        }
        if (!checkValidity(props.authData.password, { required: true, minLength: 6 })) {
            hasError = true;
            errorPassword = true;
        }
        if (!checkValidity(props.authData.reason, { required: true, maxLength: 120 })) {
            hasError = true;
            errorReason = true;
        }

        const updateAuthData = updateObject(props.authData, {
            errUser: errorUsername,
            errPass: errorPassword,
            errReason: errorReason,
        });
        props.setAuthData(updateAuthData);

        if (!hasError) {
            props.validateAuth();
        }
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Authorization</CModalTitle>
            </CModalHeader>

            <CModalBody>
                <FormControl error={props.authData.errUser} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-authorize-username">Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-authorize-username"
                        value={props.authData.username}
                        onChange={handleChange('username')}
                        labelWidth={80}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                </FormControl>
                <FormControl error={props.authData.errPass} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        value={props.authData.password}
                        type='password'
                        onChange={handleChange('password')}
                        labelWidth={80}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                </FormControl>
                <FormControl error={props.authData.errReason} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-reason">Reason</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-reason"
                        value={props.authData.reason}
                        onChange={handleChange('reason')}
                        labelWidth={80}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                </FormControl>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={validateInputs}
                >Authorize</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default AuthorizationModal
