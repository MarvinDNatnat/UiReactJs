import React from 'react'

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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

const BranchModal = (props) => {

    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        const updateBranchData = updateObject(props.branchData, {
            [prop]: event.target.value,
        });
        props.setBranchData(updateBranchData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        const updateBranchData = updateObject(props.branchData, {
            [prop]: event.target.checked,
        });
        props.setBranchData(updateBranchData);
    };


    const validateInputs = () => {
        let hasError = false;
        let errorBranchCode = false;
        let errorBranchName = false;
        let errorAddress = false;
        let errorContactNumber = false;
        let branchCodeError = null;
        let branchNameError = null;
        let addressError = null;
        let contactNumberError = null;

        if (!checkValidity(props.branchData.branchCode, { required: true, maxLength: 12 })) {
            hasError = true;
            errorBranchCode = true;
            branchCodeError = <FormHelperText id="helper-outlined-adornment-branch-branchCode">Branch Code is required and must not exceed to 12 characters.</FormHelperText>;
        }

        if (!checkValidity(props.branchData.branchName, { required: true, maxLength: 40 })) {
            hasError = true;
            errorBranchName = true;
            branchNameError = <FormHelperText id="helper-outlined-adornment-branch-branchName">Branch Name is required and must not exceed to 40 characters.</FormHelperText>;
        }

        if (props.branchData.address !== '') {
            if (!checkValidity(props.branchData.address, { required: true, maxLength: 250 })) {
                hasError = true;
                errorAddress = true;
                addressError = <FormHelperText id="helper-outlined-adornment-branch-address">Address must not exceed to 250 characters.</FormHelperText>;
            }
        }

        if (props.branchData.contactNumber !== '') {
            if (!checkValidity(props.branchData.contactNumber, { required: true, maxLength: 20 })) {
                hasError = true;
                errorContactNumber = true;
                contactNumberError = <FormHelperText id="helper-outlined-adornment-branch-contactNumber">Contact Number must not exceed to 20 characters.</FormHelperText>;
            }
        }

        const updateBranchData = updateObject(props.branchData, {
            isErrorBranchCode: errorBranchCode,
            isErrorBranchName: errorBranchName,
            isErrorAddress: errorAddress,
            isErrorContactNumber: errorContactNumber,
            branchCodeError: branchCodeError,
            branchNameError: branchNameError,
            addressError: addressError,
            contactNumberError: contactNumberError,
        });
        props.setBranchData(updateBranchData);

        if (!hasError) {
            props.saveClick();
        }

    }

    let titleModal = "Add Branch";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    let activeOption = null;
    if (props.isUpdate !== null) {
        titleModal = "Update Branch";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.branchData.active}
                        onChange={handleChangeSwitch('active')}
                        name="active"
                        color="primary"
                    />
                }
                label="Active"
            />
        );
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
                <FormControl error={props.branchData.isErrorBranchCode} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-branch-branchCode">Branch Code</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-branch-branchCode"
                        value={props.branchData.branchCode}
                        onChange={handleChange('branchCode')}
                        labelWidth={100}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.branchData.branchCodeError}
                </FormControl>
                <FormControl error={props.branchData.isErrorBranchName} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-branch-branchName">Branch Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-branch-branchName"
                        value={props.branchData.branchName}
                        onChange={handleChange('branchName')}
                        labelWidth={100}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.branchData.branchNameError}
                </FormControl>
                <FormControl error={props.branchData.isErrorAddress} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-branch-address">Address</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-branch-address"
                        value={props.branchData.address}
                        onChange={handleChange('address')}
                        labelWidth={60}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.branchData.addressError}
                </FormControl>
                <FormControl error={props.branchData.isErrorContactNumber} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-branch-contactNumber">Contact Number</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-branch-contactNumber"
                        value={props.branchData.contactNumber}
                        onChange={handleChange('contactNumber')}
                        labelWidth={120}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.branchData.contactNumberError}
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

export default BranchModal
