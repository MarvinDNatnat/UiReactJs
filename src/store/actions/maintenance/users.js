import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const usersStart = () => {
    return {
        type: actionTypes.USERS_START,
    };
};

export const usersSuccess = (response) => {
    return {
        type: actionTypes.USERS_SUCCESS,
        data: response
    };
};

export const usersConcat = (response) => {
    return {
        type: actionTypes.USERS_CONCAT,
        data: response
    };
};

export const usersFail = (error) => {
    return {
        type: actionTypes.USERS_FAIL,
        error: error
    };
};

export const getUsers = (token, page) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'users',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                page: page
            }
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    dispatch(usersSuccess(response.data));
                } else {
                    dispatch(usersConcat(response.data));
                    page++;
                    dispatch(getUsers(token, page));
                }
            })
            .catch(error => {
                dispatch(usersFail(error.response));

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

export const getAllUsers = (token) => {
    return dispatch => {
        dispatch(usersStart());
        dispatch(getUsers(token, 0));
    };
};

export const userRolesSuccess = (response) => {
    return {
        type: actionTypes.USER_ROLES,
        data: response
    };
};

export const getUserRoles = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'roles',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(userRolesSuccess(response.data));
            });
    };
};

export const userStart = () => {
    return {
        type: actionTypes.USER_START,
    };
};

export const userSuccess = (response, reqType) => {
    return {
        type: actionTypes.USER_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const userFail = (error) => {
    return {
        type: actionTypes.USER_FAIL,
        error: error
    };
};

export const saveUpdateUser = (token, userData, reqType, closeUserModal) => {
    return dispatch => {
        dispatch(userStart());

        let reqUrl = 'user';
        let scsMsg = "Save successful";
        if (reqType === 'put') {
            reqUrl += "/" + userData.userid;
            scsMsg = "Update successful";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: userData
        };

        axiosApi(config)
            .then(response => {
                dispatch(userSuccess(response.data, reqType));
                closeUserModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(userFail(error.response));

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

export const getUser = (token, userid) => {
    return dispatch => {
        dispatch(userStart());

        const config = {
            method: 'get',
            url: 'user/' + userid,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(userSuccess(response.data, 'get'));
            })
            .catch(error => {
                dispatch(userFail(error.response));

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

export const authUserStart = () => {
    return {
        type: actionTypes.AUTH_USER_START,
    };
};

export const authUserSuccess = (response, reqType) => {
    return {
        type: actionTypes.AUTH_USER_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const authUserFail = (error) => {
    return {
        type: actionTypes.AUTH_USER_FAIL,
        error: error
    };
};

export const getAuthorizeUser = (token, userData, closeAuthModal) => {
    return dispatch => {
        dispatch(authUserStart());

        const config = {
            method: 'post',
            url: 'authorize',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: userData
        };

        axiosApi(config)
            .then(response => {
                dispatch(authUserSuccess(response.data));
                closeAuthModal(response.data);
            })
            .catch(error => {
                dispatch(authUserFail(error.response));

                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    };
}

export const resetUserPassword = (token, resetData, closeModal) => {
    return dispatch => {
        const config = {
            method: 'put',
            url: 'reset_password/' + resetData.userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: resetData
        };

        axiosApi(config)
            .then(response => {
                closeModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Reset password success.'
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
}

export const usersInfoStart = () => {
    return {
        type: actionTypes.USERS_INFO_START,
    };
};

export const usersInfoSuccess = (response) => {
    return {
        type: actionTypes.USERS_INFO_SUCCESS,
        data: response
    };
};

export const usersInfoConcat = (response) => {
    return {
        type: actionTypes.USERS_INFO_CONCAT,
        data: response
    };
};

export const usersInfoFail = (error) => {
    return {
        type: actionTypes.USERS_INFO_FAIL,
        error: error
    };
};

export const getUsersInfo = (token, page) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'users_info',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                page: page
            }
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    dispatch(usersInfoSuccess(response.data));
                } else {
                    dispatch(usersInfoConcat(response.data));
                    page++;
                    dispatch(getUsersInfo(token, page));
                }
            })
            .catch(error => {
                dispatch(usersInfoFail(error.response));

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

export const getAllUsersInfo = (token) => {
    return dispatch => {
        dispatch(usersInfoStart());
        dispatch(getUsersInfo(token, 0));
    };
};
