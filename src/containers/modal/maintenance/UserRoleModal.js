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
    FormHelperText,
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

const UserRoleModal = (props) => {

    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        const updateRoleData = updateObject(props.userRoleData, {
            [prop]: event.target.value,
        });
        props.setUserRoleData(updateRoleData);
    };

    const validateInputs = () => {
        let hasError = false;
        let errorRolename = false;
        let rolenameError = null;

        if (!checkValidity(props.userRoleData.rolename, { required: true, maxLength: 40 })) {
            hasError = true;
            errorRolename = true;
            rolenameError = <FormHelperText id="helper-outlined-adornment-rolename">Role name is required with maximum length of 40 characters.</FormHelperText>;
        }

        const updateRoleData = updateObject(props.userRoleData, {
            isErrorRolename: errorRolename,
            rolenameError: rolenameError,
        });
        props.setUserRoleData(updateRoleData);

        if (!hasError) {
            props.saveClick();
        }

    }

    let titleModal = "Add User Role";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    if (props.isUpdate !== null) {
        titleModal = "Update User Role";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
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
                <FormControl error={props.userRoleData.isErrorRolename} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-rolename">Role Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-rolename"
                        value={props.userRoleData.rolename}
                        onChange={handleChange('rolename')}
                        labelWidth={80}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.userRoleData.rolenameError}
                </FormControl>
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

export default UserRoleModal;