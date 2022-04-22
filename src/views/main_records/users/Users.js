import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import { withStyles } from '@material-ui/core/styles';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

import UserModal from 'src/containers/modal/maintenance/UserModal';
import UsersTable from 'src/containers/tables/maintenance/UsersTable';
import UserProfileModal from 'src/containers/modal/common/UserProfileModal';

const useStyles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    errorMessage: {
        color: '#f00',
        textAlign: 'center',
        fontWeight: "bolder",
    },
});

const userConfig = {
    username: '',
    email: '',
    password: '',
    userRoles: [],
    active: true,
    showPassword: false,
    isErrorUsername: false,
    isErrorEmail: false,
    isErrorPassword: false,
    isErrorUserRoles: false,
    usernameError: null,
    passwordError: null,
    emailError: null,
}

const userProfileConfig = {
    uploadSignature: false,
    username: null,
    firstname: '',
    lastname: '',
    middlename: '',
    suffix: '',
    dateOfBirth: null,
    licenseNumber: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    signature: null,
    isErrorFirstName: false,
    isErrorLastName: false,
    isErrorMidName: false,
    isErrorSuffix: false,
    isErrorDOB: false,
    isErrorContNo: false,
    isErrorEmail: false,
    isErrorLicenseNumber: false,
    isErrorAddress: false,
    firstNameError: null,
    lastNameError: null,
    midNameError: null,
    suffixError: null,
    dobError: null,
    contNoError: null,
    emailError: null,
    licenseNumberError: null,
    addressError: null,
}

export class Users extends Component {
    state = {
        userModal: {
            isUpdate: null,
            updateIndex: null,
            showUserModal: false,
            showProfileModal: false,
        },
        userData: userConfig,
        profileData: userProfileConfig,
    }

    componentDidMount() {
        if (this.props.userRoleList.length <= 0) {
            this.props.onGetUserRoles(this.props.userToken);
        }
    }

    viewAllUsers = () => {
        this.props.onGetAllUsersInfo(this.props.userToken);
    }

    addUserModal = () => {
        const updateUserData = updateObject(this.state.userData, userConfig);

        const updateUserModal = updateObject(this.state.userModal, {
            isUpdate: null,
            updateIndex: null,
            showUserModal: true,
        });

        this.setState({
            ...this.state,
            userModal: updateUserModal,
            userData: updateUserData,
        });
    };

    setUserData = (updateUserData) => {
        this.setState({
            ...this.state,
            userData: updateUserData,
        });
    }

    updateUserModal = (usr, idx) => {
        if (usr !== undefined && idx !== undefined) {
            const userRoles = [];
            usr.roles.forEach(role => {
                userRoles.push({ value: role.inputName, label: role.inputName.toUpperCase() });
            });

            const updateUserData = updateObject(this.state.userData, {
                username: usr.username,
                email: usr.email,
                password: '',
                userRoles: userRoles,
                active: usr.active,
                showPassword: false,
                isErrorUsername: false,
                isErrorEmail: false,
                isErrorPassword: false,
                isErrorUserRoles: false,
                usernameError: null,
                passwordError: null,
                emailError: null,
            });

            const updateUserModal = updateObject(this.state.userModal, {
                isUpdate: usr.userid,
                updateIndex: idx,
                showUserModal: true,
            });

            this.setState({
                ...this.state,
                userModal: updateUserModal,
                userData: updateUserData,
            });
        }
    }

    closeUserModal = (userData) => {
        const updateUserModal = updateObject(this.state.userModal, {
            showUserModal: false,
            showProfileModal: false,
        });
        this.setState({
            ...this.state,
            userModal: updateUserModal,
        });

        if (userData !== null) {
            if (this.state.userModal.isUpdate !== null) { // update
                if (this.state.userModal.updateIndex !== null) {
                    this.userTableRef.updateUserToTable(userData, this.state.userModal.updateIndex);
                }
                // } else { // add
                //     this.userTableRef.addUserToTable(userData);
            }
        }
    }

    saveUserClick = () => {
        const userRoles = [];
        this.state.userData.userRoles.forEach(role => {
            userRoles.push(role.value);
        });

        const userRequest = {
            username: this.state.userData.username,
            email: this.state.userData.email,
            roles: userRoles
        }

        let reqMethod = 'post';
        if (this.state.userModal.isUpdate !== null) {
            reqMethod = 'put';
            userRequest.userid = this.state.userModal.isUpdate;
            userRequest.active = this.state.userData.active;
            if (this.state.userData.password.trim() !== "") {
                userRequest.password = this.state.userData.password;
            }
        } else {
            userRequest.password = this.state.userData.password;
        }

        this.props.onSaveUpdateUser(this.props.userToken, userRequest, reqMethod, this.closeUserModal);
    };

    userProfileModal = (prf, idx) => {
        if (prf !== undefined && idx !== undefined) {
            let profile = updateObject(userProfileConfig, {});
            profile.email = prf.email;
            if (prf.profile !== null) {
                const usrPrf = prf.profile;
                profile = updateObject(profile, {
                    username: prf.username,
                    uploadSignature: true,
                    firstname: usrPrf.firstname,
                    lastname: usrPrf.lastname,
                    middlename: usrPrf.middlename !== null ? usrPrf.middlename : '',
                    suffix: usrPrf.suffix !== null ? usrPrf.suffix : '',
                    dateOfBirth: moment(usrPrf.birthDate),
                    licenseNumber: usrPrf.licenseNumber !== null ? usrPrf.licenseNumber : '',
                    gender: usrPrf.gender,
                    contactNumber: usrPrf.contactNumber !== null ? usrPrf.contactNumber : '',
                    email: usrPrf.email != null ? usrPrf.email : prf.email,
                    address: usrPrf.address,
                    signature: usrPrf.signature !== null ? usrPrf.signature : null,
                });
            }

            const updateProfileData = updateObject(userProfileConfig, profile);
            const updateUserModal = updateObject(this.state.userModal, {
                isUpdate: prf.userid,
                updateIndex: idx,
                showProfileModal: true,
            });

            this.setState({
                ...this.state,
                userModal: updateUserModal,
                profileData: updateProfileData,
            });
        }
    }

    setProfileData = (updateProfileData) => {
        this.setState({
            ...this.state,
            profileData: updateProfileData,
        });
    }

    saveUserProfile = () => {
        const profileRequest = {
            userid: this.state.userModal.isUpdate,
            firstname: this.state.profileData.firstname,
            lastname: this.state.profileData.lastname,
            middlename: this.state.profileData.middlename === '' ? null : this.state.profileData.middlename,
            suffix: this.state.profileData.suffix,
            dateOfBirth: this.state.profileData.dateOfBirth.format("YYYY-MM-DD"),
            contactNumber: this.state.profileData.contactNumber,
            gender: this.state.profileData.gender,
            email: this.state.profileData.email,
            address: this.state.profileData.address,
            licenseNumber: this.state.profileData.licenseNumber === '' ? null : this.state.profileData.licenseNumber,
        }

        this.props.onSaveUpdateUserProfile(this.props.userToken, profileRequest, this.closeUserModal);
    }

    uploadSignature = (fileSignature) => {
        if (fileSignature !== undefined && fileSignature !== null) {
            this.props.onUploadUserSignature(this.props.userToken, this.state.userModal.isUpdate, fileSignature, this.closeUserModal)
        } else {
            Swal.fire({
                title: 'Signature',
                text: "Are you sure to remove user's signature?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onUploadUserSignature(this.props.userToken, this.state.userModal.isUpdate, null, this.closeUserModal)
                }
            })

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <UserModal
                    isUpdate={this.state.userModal.isUpdate}
                    showModal={this.state.userModal.showUserModal}
                    closeClick={this.closeUserModal}
                    saveClick={this.saveUserClick}
                    userData={this.state.userData}
                    setUserData={this.setUserData}
                    userRoles={this.props.userRoleList}
                />
                <UserProfileModal
                    showModal={this.state.userModal.showProfileModal}
                    closeClick={this.closeUserModal}
                    saveClick={this.saveUserProfile}
                    profileData={this.state.profileData}
                    setProfileData={this.setProfileData}
                    uploadSignature={this.uploadSignature}
                />
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Users</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllUsers}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addUserModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <UsersTable
                                    onRef={ref => (this.userTableRef = ref)}
                                    updateUserModal={this.updateUserModal}
                                    userProfileModal={this.userProfileModal}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.users.loading,
        error: state.users.error,
        userToken: state.auth.token,
        userInfoList: state.users.userInfoList,
        userRoleList: state.users.roleList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllUsersInfo: (token) => dispatch(actions.getAllUsersInfo(token)),
        onGetUserRoles: (token) => dispatch(actions.getUserRoles(token)),
        onSaveUpdateUser: (token, userData, reqType, closeUserModal) => dispatch(actions.saveUpdateUser(token, userData, reqType, closeUserModal)),
        onSaveUpdateUserProfile: (token, profileData, closerProfileModal) => dispatch(actions.saveUpdateUserProfile(token, profileData, closerProfileModal)),
        onUploadUserSignature: (token, userid, closerProfileModal) => dispatch(actions.uploadUserSignature(token, userid, closerProfileModal)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Users))
