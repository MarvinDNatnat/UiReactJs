import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';

import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

import UserResetPasswordModal from 'src/containers/modal/common/UserResetPasswordModal';
import UserProfileModal from 'src/containers/modal/common/UserProfileModal';
import UserAccountModal from 'src/containers/modal/common/UserAccountModal';

import {
    TheContent,
    TheSidebar,
    TheFooter,
    TheHeader
} from './index'

const resetPasswordConfig = {
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false,
    isErrorNewPassword: false,
    isErrorConfirmPassword: false,
    newPasswordError: null,
    confirmPasswordError: null,
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

export class TheLayout extends Component {
    state = {
        showRPasswordModal: false,
        resetData: resetPasswordConfig,
        showUProfileModal: false,
        profileData: userProfileConfig,
        showUAccountModal: false,
    }

    componentDidMount() {
        if (this.props.usrPrf === null && this.props.userToken !== null &&
            this.props.auth !== null && this.props.auth.userId !== null) {
            this.props.onGetAuthUserProfile(this.props.userToken, this.props.auth.userId);
        }

        if (this.props.userToken !== null &&
            this.props.auth !== null && this.props.auth.userId !== null) {
            const idx = this.props.auth.roles.findIndex(r => r === "ADMIN");
            if (idx < 0 && this.props.authMenus.length <= 0) { // NO ADMIN RIGHTS
                this.props.onGetUserMenus(this.props.userToken, this.props.auth.userId);
            }
        }
    }

    resetUserPassword = () => {
        this.setState({
            ...this.state,
            showRPasswordModal: true,
            resetData: resetPasswordConfig,
        });
    }

    closeResetUserPassword = () => {
        this.setState({
            ...this.state,
            showRPasswordModal: false,
        });
    }

    setUpdateResetPasswordData = (updateData) => {
        this.setState({
            ...this.state,
            resetData: updateData,
        });
    }

    userProfileDialog = () => {
        let profile = {};
        if (this.props.usrPrf === null && this.props.auth.email !== null) {
            profile.email = this.props.auth.email;
        }

        if (this.props.usrPrf !== null) {
            if (this.props.usrPrf.profile !== null) {
                const usrPrf = this.props.usrPrf.profile;
                profile = {
                    uploadSignature: true,
                    firstname: usrPrf.firstname,
                    lastname: usrPrf.lastname,
                    middlename: usrPrf.middlename !== null ? usrPrf.middlename : '',
                    suffix: usrPrf.suffix !== null ? usrPrf.suffix : '',
                    dateOfBirth: moment(usrPrf.birthDate),
                    licenseNumber: usrPrf.licenseNumber !== null ? usrPrf.licenseNumber : '',
                    gender: usrPrf.gender,
                    contactNumber: usrPrf.contactNumber !== null ? usrPrf.contactNumber : '',
                    email: usrPrf.email != null ? usrPrf.email : this.props.usrPrf.email,
                    address: usrPrf.address,
                    signature: usrPrf.signature !== null ? usrPrf.signature : null,
                }
            }
        }

        const updateProfileData = updateObject(userProfileConfig, profile);
        this.setState({
            ...this.state,
            showUProfileModal: true,
            profileData: updateProfileData,
        });
    }

    closeUserProfile = (userData) => {
        this.setState({
            ...this.state,
            showUProfileModal: false,
        });
    }

    saveUserProfile = () => {
        const profileRequest = {
            userid: this.props.usrPrf.userid,
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

        this.props.onSaveUpdateUserProfile(this.props.userToken, profileRequest, this.closeUserProfile, true);
    }

    setUpdateUserProfileData = (updateData) => {
        this.setState({
            ...this.state,
            profileData: updateData,
        });
    }

    openUserAccount = () => {
        this.setState({
            ...this.state,
            showUAccountModal: true,
        });
    }

    closeUserAccount = () => {
        this.setState({
            ...this.state,
            showUAccountModal: false,
        });
    }

    uploadSignature = (fileSignature) => {
        if (fileSignature !== undefined && fileSignature !== null) {
            this.props.onUploadUserSignature(this.props.userToken, this.props.auth.userId, fileSignature, this.closeUserProfile, true)
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
                    this.props.onUploadUserSignature(this.props.userToken, this.props.auth.userId, null, this.closeUserProfile, true)
                }
            })

        }
    }

    render() {
        return (
            <div className="c-app c-default-layout" >
                <UserResetPasswordModal
                    showModal={this.state.showRPasswordModal}
                    closeClick={this.closeResetUserPassword}
                    resetData={this.state.resetData}
                    setResetData={this.setUpdateResetPasswordData}
                />

                <UserProfileModal
                    showModal={this.state.showUProfileModal}
                    closeClick={this.closeUserProfile}
                    saveClick={this.saveUserProfile}
                    profileData={this.state.profileData}
                    setProfileData={this.setUpdateUserProfileData}
                    uploadSignature={this.uploadSignature}
                />

                <UserAccountModal
                    showModal={this.state.showUAccountModal}
                    closeClick={this.closeUserAccount}
                />

                <TheSidebar />
                <div className="c-wrapper">
                    <TheHeader
                        resetUserPassword={this.resetUserPassword}
                        userProfileDialog={this.userProfileDialog}
                        userAccount={this.openUserAccount}
                    />
                    <div className="c-body">
                        <TheContent />
                    </div>
                    <TheFooter />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
        auth: state.auth.user,
        usrPrf: state.profile.userProfile,
        authMenus: state.auth.menus,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearUserProfile: () => dispatch(actions.clearUserProfile()),
        onGetAuthUserProfile: (token, userid) => dispatch(actions.getAuthUserProfile(token, userid)),
        onGetUserMenus: (token, userid) => dispatch(actions.getUserMenus(token, userid)),
        onSaveUpdateUserProfile: (token, profileData, closerProfileModal, saveProfile) => dispatch(actions.saveUpdateUserProfile(token, profileData, closerProfileModal, saveProfile)),
        onUploadUserSignature: (token, userid, closerProfileModal, saveProfile) => dispatch(actions.uploadUserSignature(token, userid, closerProfileModal, saveProfile)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TheLayout)
