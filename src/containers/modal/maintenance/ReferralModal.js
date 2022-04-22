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

const ReferralModal = (props) => {
    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        const updateReferralData = updateObject(props.referralData, {
            [prop]: event.target.value,
        });
        props.setReferralData(updateReferralData);
    };

    const handleChangeSwitch = (prop) => (event) => {
        const updateReferralData = updateObject(props.referralData, {
            [prop]: event.target.checked,
        });
        props.setReferralData(updateReferralData);
    };

    const validateInputs = () => {
        let hasError = false;
        let errorReferral = false;
        let referralError = null;

        if (!checkValidity(props.referralData.referral, { required: true })) {
            hasError = true;
            errorReferral = true;
            referralError = <FormHelperText id="helper-outlined-adornment-referral-referral">Referral is required.</FormHelperText>;
        }

        const updateReferralData = updateObject(props.referralData, {
            isErrorReferral: errorReferral,
            referralError: referralError,
        });
        props.setReferralData(updateReferralData);

        if (!hasError) {
            props.saveClick();
        }
    }

    let titleModal = "Add Referral";
    let saveButton = (<CButton className="border border-dark" color="primary" onClick={validateInputs} >Save</CButton>);
    let activeOption = null;
    if (props.isUpdate !== null) {
        titleModal = "Update Referral";
        saveButton = (<CButton className="border border-dark" color="success" onClick={validateInputs} >Update</CButton>);
        activeOption = (
            <FormControlLabel
                control={
                    <Switch
                        checked={props.referralData.active}
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
                <FormControl error={props.referralData.isErrorReferral} fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-referral-referral">Referral</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-referral-referral"
                        value={props.referralData.referral}
                        onChange={handleChange('referral')}
                        labelWidth={75}
                        margin="dense"
                        className={classes.outlinedInput}
                    />
                    {props.referralData.referralError}
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

export default ReferralModal

