import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const menuListSuccess = (response) => {
    return {
        type: actionTypes.MENU_LIST,
        data: response
    };
};

export const getMenuList = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'menus',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(menuListSuccess(response.data));
            });
    };
};


export const userRolesStart = () => {
    return {
        type: actionTypes.USER_ROLES_START,
    };
};

export const userRolesSuccess = (response) => {
    return {
        type: actionTypes.USER_ROLES_SUCCESS,
        data: response
    };
};

export const userRolesFail = (error) => {
    return {
        type: actionTypes.USER_ROLES_FAIL,
        error: error
    };
};

export const getAllUserRoles = (token) => {
    return dispatch => {
        dispatch(userRolesStart());

        const config = {
            method: 'get',
            url: 'user_roles',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(userRolesSuccess(response.data));
            })
            .catch(error => {
                dispatch(userRolesFail(error.response));

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


export const userRoleStart = () => {
    return {
        type: actionTypes.USER_ROLE_START,
    };
};

export const userRoleSuccess = (response, reqType) => {
    return {
        type: actionTypes.USER_ROLE_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const userRoleFail = (error) => {
    return {
        type: actionTypes.USER_ROLE_FAIL,
        error: error
    };
};

export const saveUpdateUserRole = (token, roleData, reqType, closeRoleModal) => {
    return dispatch => {
        dispatch(userRoleStart());

        let reqUrl = 'user_role';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + roleData.id;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: roleData
        };

        axiosApi(config)
            .then(response => {
                dispatch(userRoleSuccess(response.data, reqType));
                closeRoleModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(userRoleFail(error.response));

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

export const saveUserRoleMenus = (token, menuData, closeRoleModal) => {
    return dispatch => {
        const config = {
            method: 'post',
            url: 'user_role/' + menuData.id + "/menu",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: menuData
        };

        axiosApi(config)
            .then(response => {
                closeRoleModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: "Save successfull"
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