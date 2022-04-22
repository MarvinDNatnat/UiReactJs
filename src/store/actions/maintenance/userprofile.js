import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';


export const emailStart = () => {
    return {
        type: actionTypes.EMAIL_START,
    };
};

export const emailSuccess = () => {
    return {
        type: actionTypes.EMAIL_SUCCESS,
    };
};

export const emailFail = (error) => {
    return {
        type: actionTypes.EMAIL_FAIL,
        error: error
    };
};
export const saveUpdateUserProfile = (token, profileData, closeModal, saveProfile = false) => {
    return dispatch => {
        const config = {
            method: 'post',
            url: 'user/' + profileData.userid + '/profile',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: profileData
        };

        axiosApi(config)
            .then(response => {
                if (saveProfile) {
                    dispatch(userProfileSuccess(response.data));
                }

                closeModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Success saving profile'
                });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    };
};


export const uploadUserSignature = (token, userid, signatureFile, closeModal, saveProfile = false) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('uploadFile', signatureFile);

        axiosApi.put('user/' + userid + '/upload_signature',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                },
            }
        )
            .then(response => {
                if (saveProfile) {
                    dispatch(userProfileSuccess(response.data));
                }

                if (closeModal !== undefined) {
                    closeModal(response.data);
                }

                Toast.fire({
                    icon: 'success',
                    title: 'Signature uploaded.'
                });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
}

export const saveFile = (token, files) => {
    return dispatch => {
        dispatch(emailStart());
        const config = {
            method: 'post',
            url: 'patientList',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: files
        }

        axiosApi(config)
            .then(response => {
                dispatch(emailSuccess());
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                dispatch(emailFail(error.response));
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
}

export const clearUserProfile = () => {
    return {
        type: actionTypes.USER_PROFILE_CLEAR,
    }
}

export const userProfileSuccess = (response) => {
    return {
        type: actionTypes.USER_PROFILE,
        data: response
    };
};

export const getAuthUserProfile = (token, userid) => {
    return dispatch => {
        dispatch(clearUserProfile());
        const config = {
            method: 'get',
            url: 'user/' + userid + "/profile",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(userProfileSuccess(response.data));
            });
    };
};
