import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const packageTypesSuccess = (response) => {
    return {
        type: actionTypes.PACKAGES_TYPES,
        data: response
    };
};

export const getPackageTypes = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'package_types',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(packageTypesSuccess(response.data));
            });
    };
};


export const packagesStart = () => {
    return {
        type: actionTypes.PACKAGES_START,
    };
};

export const packagesSuccess = (response) => {
    return {
        type: actionTypes.PACKAGES_SUCCESS,
        data: response
    };
};

export const packagesConcat = (response) => {
    return {
        type: actionTypes.PACKAGES_CONCAT,
        data: response
    };
};

export const packagesFail = (error) => {
    return {
        type: actionTypes.PACKAGES_FAIL,
        error: error
    };
};

export const getPacakges = (url, token, page) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: url,
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
                    dispatch(packagesSuccess(response.data));
                } else {
                    dispatch(packagesConcat(response.data));
                    page++;
                    dispatch(getPacakges(url, token, page));
                }
            })
            .catch(error => {
                dispatch(packagesFail(error.response));

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

export const getAllPackages = (token) => {
    return dispatch => {
        dispatch(packagesStart());
        dispatch(getPacakges('packages', token, 0));
    };
};

export const getAllActivePackages = (token) => {
    return dispatch => {
        dispatch(packagesStart());
        dispatch(getPacakges('packages/active', token, 0));
    };
};

export const packageStart = () => {
    return {
        type: actionTypes.PACKAGE_START,
    };
};

export const packageSuccess = (response, reqType) => {
    return {
        type: actionTypes.PACKAGE_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const packageFail = (error) => {
    return {
        type: actionTypes.PACKAGE_FAIL,
        error: error
    };
};

export const saveUpdatePackage = (token, packageData, reqType, closePackageModal) => {
    return dispatch => {
        dispatch(packageStart());

        let reqUrl = 'package';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + packageData.packageid;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: packageData
        };

        axiosApi(config)
            .then(response => {
                dispatch(packageSuccess(response.data, reqType));
                closePackageModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(packageFail(error.response));

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
