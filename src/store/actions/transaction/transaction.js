import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import Swal from 'sweetalert2';

export const transactionStart = () => {
    return {
        type: actionTypes.TRANSACTION_START,
    };
};

export const transactionSuccess = (response) => {
    return {
        type: actionTypes.TRANSACTION_SUCCESS,
        data: response,
    };
};

export const transactionFail = (error) => {
    return {
        type: actionTypes.TRANSACTION_FAIL,
        error: error
    };
};

export const transactionClearData = (error) => {
    return {
        type: actionTypes.TRANSACTION_CLEAR_DATA,
        error: error
    };
};

export const saveUpdateTransaction = (token, transactionData, reqType, cleanupFunction) => {
    return dispatch => {
        dispatch(transactionStart());

        let reqUrl = 'transaction';
        if (reqType === 'put') {
            reqUrl += "/" + transactionData.transactionid;
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: transactionData
        };

        axiosApi(config)
            .then(response => {
                dispatch(transactionSuccess(response.data));
                cleanupFunction(response.data);
            })
            .catch(error => {
                dispatch(transactionFail(error.response));

                const errmsg = getErrorMessage(error);
                Swal.fire(
                    'Error Saving Transaction!',
                    errmsg,
                    'error'
                );
            });
    };
};

export const getTransaction = (token, transactionId, loadFunction) => {
    return dispatch => {
        dispatch(transactionStart());

        const config = {
            method: 'get',
            url: 'transaction/' + transactionId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(transactionSuccess(response.data));
                loadFunction(response.data);
            })
            .catch(error => {
                dispatch(transactionFail(error.response));
                loadFunction(getErrorMessage(error.response));

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

export const printReceipt = (token, transactionId) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: '/transaction/' + transactionId + '/receipt',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }

        axiosApi(config)
            .then(response => {
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
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

export const cancelTransaction = (token, cancelTransaction, cleanupFunction) => {
    return dispatch => {
        const config = {
            method: 'post',
            url: 'transaction/' + cancelTransaction.transactionid + "/cancel",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: cancelTransaction
        };

        axiosApi(config)
            .then(response => {
                cleanupFunction({ status: 'SCA', transactionid: cancelTransaction.transactionid });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                Swal.fire(
                    'Error Saving Transaction!',
                    errmsg,
                    'error'
                );
            });
    }
}

export const refundTransaction = (token, refundTransaction, cleanupFunction) => {
    return dispatch => {
        const config = {
            method: 'post',
            url: 'transaction/' + refundTransaction.transactionid + "/refund",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: refundTransaction
        };

        axiosApi(config)
            .then(response => {
                cleanupFunction({ status: 'SRE', transactionid: refundTransaction.transactionid });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                Swal.fire(
                    'Error Saving Transaction!',
                    errmsg,
                    'error'
                );
            });
    }
}
