import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast } from 'src/store/sweetAlert';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, expires, userdata) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        expires: expires,
        user: userdata,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = (token, userInfo) => {
    if (token != null && userInfo != null) {
        const user = JSON.parse(userInfo);

        const authData = {};
        const config = {
            method: 'post',
            url: 'logout/' + user.userId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: authData
        };

        axiosApi(config)
            .then(response => {
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const logout = () => {
    authLogout(localStorage.getItem('token'), localStorage.getItem('userInfo'));
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userInfo');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            username: username,
            password: password
        };

        const config = {
            method: 'post',
            url: 'authenticate',
            headers: {
                'Content-Type': 'application/json'
            },
            data: authData
        };

        axiosApi(config)
            .then(response => {
                const data = response.data;
                const roles = [];

                if (data.authorities !== undefined && data.authorities !== null) {
                    data.authorities.forEach(rle => {
                        const role = rle.authority.split("_");
                        if (role.length > 1) {
                            roles.push(role[1]);
                        }
                    });
                }

                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
                const user = {
                    userId: data.userid,
                    userName: data.username,
                    userEmail: data.email,
                    roles: roles,
                }
                localStorage.setItem('token', data.token);
                localStorage.setItem('expirationDate', expirationDate.getTime());
                localStorage.setItem('userInfo', JSON.stringify(user));
                dispatch(authSuccess(data.token, expirationDate.getTime(), user));
                dispatch(checkAuthTimeout(data.expiresIn));
                dispatch(getUserMenus(data.token, data.userid))
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully!'
                });
            })
            .catch(error => {
                let errorData = "Unknown error";

                if (error.response !== undefined && error.response.data !== undefined) {
                    errorData = error.response.data;
                    if (errorData.message !== undefined) {
                        errorData = errorData.message;
                    }
                } else if (error.message !== undefined) {
                    errorData = error.message;
                }
                dispatch(authFail(errorData));
                Toast.fire({
                    icon: 'error',
                    title: errorData
                });
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(parseInt(localStorage.getItem('expirationDate')));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const expirationDate = new Date(parseInt(localStorage.getItem('expirationDate')));
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                dispatch(authSuccess(token, expirationDate.getTime(), userInfo));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};


export const userMenusSuccess = (response) => {
    return {
        type: actionTypes.USER_MENUS,
        data: response
    };
};

export const getUserMenus = (token, userId) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'user/' + userId + '/menus',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(userMenusSuccess(response.data));
            });
    };
};