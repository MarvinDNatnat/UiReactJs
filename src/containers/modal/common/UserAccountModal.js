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
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';

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
    lockField: {
        pointerEvents: 'none',
    }
}));

const UserAccountModal = (props) => {
    const classes = useStyles();

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>My Account</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-userid">User ID</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-userid"
                        value={props.usrPrf !== null ? props.usrPrf.userid : ''}
                        labelWidth={60}
                        margin="dense"
                        className={clsx(classes.outlinedInput, classes.lockField)}
                    />
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-account-username">User Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-account-username"
                        value={props.usrPrf !== null ? props.usrPrf.username : ''}
                        labelWidth={80}
                        margin="dense"
                        className={clsx(classes.outlinedInput, classes.lockField)}
                    />
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-account-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-account-email"
                        value={props.usrPrf !== null ? props.usrPrf.email : ''}
                        labelWidth={50}
                        margin="dense"
                        className={clsx(classes.outlinedInput, classes.lockField)}
                    />
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-roles">Roles</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-roles"
                        value={props.usrPrf !== null ? [].concat(props.usrPrf.roles).sort((a, b) => a.itemName > b.itemName ? 1 : -1).map((itm) => { return itm.inputName.toUpperCase() }).join(',') : ''}
                        labelWidth={50}
                        margin="dense"
                        className={clsx(classes.outlinedInput, classes.lockField)}
                    />
                </FormControl>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={() => props.closeClick(null)}
                >OK</CButton>
            </CModalFooter>
        </CModal>
    )
}

const mapStateToProps = (state) => {
    return {
        usrPrf: state.profile.userProfile,
    }
};
export default connect(mapStateToProps)(UserAccountModal)
