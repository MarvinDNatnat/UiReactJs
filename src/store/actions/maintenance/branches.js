import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const paymentBanksSuccess = (response) => {
    return {
        type: actionTypes.PAYMENT_BANKS,
        data: response
    };
};

export const getPaymentBanks = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'payment_banks',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(paymentBanksSuccess(response.data));
            });
    };
};


export const branchesStart = () => {
    return {
        type: actionTypes.BRANCHES_START,
    };
};

export const branchesSuccess = (response) => {
    return {
        type: actionTypes.BRANCHES_SUCCESS,
        data: response
    };
};

export const branchesFail = (error) => {
    return {
        type: actionTypes.BRANCHES_FAIL,
        error: error
    };
};

export const getAllBranches = (token) => {
    return dispatch => {
        dispatch(branchesStart());

        const config = {
            method: 'get',
            url: 'branches',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(branchesSuccess(response.data));
            })
            .catch(error => {
                dispatch(branchesFail(error.response));

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

export const branchStart = () => {
    return {
        type: actionTypes.BRANCH_START,
    };
};

export const branchSuccess = (response, reqType) => {
    return {
        type: actionTypes.BRANCH_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const branchFail = (error) => {
    return {
        type: actionTypes.BRANCH_FAIL,
        error: error
    };
};

export const getBranch = (token, branchCode) => {
    return dispatch => {
        dispatch(branchStart());

        const config = {
            method: 'get',
            url: 'branch/' + branchCode,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }

        axiosApi(config)
            .then(response => {
                dispatch(branchSuccess(response.data, 'get'));
            })
    }
}

export const saveUpdateBranch = (token, branchData, reqType, closeBranchModal) => {
    return dispatch => {
        dispatch(branchStart());

        let reqUrl = 'branch';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + branchData.branchid;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: branchData
        };

        axiosApi(config)
            .then(response => {
                dispatch(branchSuccess(response.data, reqType));
                closeBranchModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(branchFail(error.response));

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