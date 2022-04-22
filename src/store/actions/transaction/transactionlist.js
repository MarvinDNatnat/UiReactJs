import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import { updateObject } from 'src/store/utility';

export const translistStart = () => {
    return {
        type: actionTypes.TRANSLIST_START,
    };
};

export const translistSuccess = (response) => {
    return {
        type: actionTypes.TRANSLIST_SUCCESS,
        data: response
    };
};

export const translistConcat = (response) => {
    return {
        type: actionTypes.TRANSLIST_CONCAT,
        data: response
    };
};

export const translistFail = (error) => {
    return {
        type: actionTypes.TRANSLIST_FAIL,
        error: error
    };
};

// export loading

export const exportStart = (response) => {
    return {
        type: actionTypes.EXPORT_START,
        data: response
    };
};

export const exportSuccess = (response) => {
    return {
        type: actionTypes.EXPORT_SUCCESS,
        data: response
    };
};

export const exportFail = (error) => {
    return {
        type: actionTypes.EXPORT_FAIL,
        error: error
    };
};

export const getTransactions = (url, token, params) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: params
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    if (response.data.totalElements <= 0) {
                        Toast.fire({
                            icon: 'info',
                            title: 'No records found.'
                        });
                    }
                    dispatch(translistSuccess(response.data));
                } else {
                    dispatch(translistConcat(response.data));

                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getTransactions(url, token, newParam));
                }
            })
            .catch(error => {
                dispatch(translistFail(error.response));

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

export const viewTransactions = (token, startDate, endDate) => {
    const params = {
        page: 0,
        dateTimeFrom: startDate,
        dateTimeTo: endDate
    }

    return dispatch => {
        dispatch(translistStart());
        dispatch(getTransactions('transactions/summary', token, params));
    };
}



export const exportTransaction = (token, startDate, endDate) => {
    return dispatch => {
        dispatch(exportStart());
        const params = {
            page: 0,
            dateTimeFrom: startDate,
            dateTimeTo: endDate
        }
        const config = {
            method: 'get',
            url: 'transactions/exportTransaction',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: params
        };

        axiosApi(config)
            .then(response => {
                dispatch(exportSuccess());
                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'TransactionList.csv'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                dispatch(exportFail());
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


export const clearTransactionList = () => {
    return {
        type: actionTypes.TRANSLIST_CLEAR,
    };
}

export const onHoldTxnStart = () => {
    return {
        type: actionTypes.ONHOLD_TRANS_START,
    };
};

export const onHoldTxnSuccess = (response) => {
    return {
        type: actionTypes.ONHOLD_TRANS_SUCCESS,
        data: response
    };
};

export const onHoldTxnConcat = (response) => {
    return {
        type: actionTypes.ONHOLD_TRANS_CONCAT,
        data: response
    };
};

export const onHoldTxnFail = (error) => {
    return {
        type: actionTypes.ONHOLD_TRANS_FAIL,
        error: error
    };
};

export const getOnHoldTransactions = (token, page) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/hold',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: page
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    if (response.data.totalElements <= 0) {
                        Toast.fire({
                            icon: 'info',
                            title: 'No records found.'
                        });
                    }
                    dispatch(onHoldTxnSuccess(response.data));
                } else {
                    dispatch(onHoldTxnConcat(response.data));
                    page++;
                    dispatch(getOnHoldTransactions(token, page));
                }
            })
            .catch(error => {
                dispatch(onHoldTxnFail(error.response));

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

export const clearPendingTransactionList = () => {
    return {
        type: actionTypes.LAB_PENDING_CLEAR,
    };
}

export const pendingStart = () => {
    return {
        type: actionTypes.LAB_PENDING_START,
    };
};

export const pendingSuccess = (data) => {
    return {
        type: actionTypes.LAB_PENDING_SUCCESS,
        data: data,
    };
};

export const pendingFail = (error) => {
    return {
        type: actionTypes.LAB_PENDING_FAIL,
        error: error
    };
};

export const clearPendingTransactionListOver3Days = () => {
    return {
        type: actionTypes.LAB_PENDING_CLEAR_Over3Days,
    };
}

export const pendingStartOver3Days = () => {
    return {
        type: actionTypes.LAB_PENDING_START_Over3Days,
    };
};

export const pendingSuccessOver3Days = (data) => {
    return {
        type: actionTypes.LAB_PENDING_SUCCESS_Over3Days,
        data: data,
    };
};

export const pendingFailOver3Days = (error) => {
    return {
        type: actionTypes.LAB_PENDING_FAIL_Over3Days,
        error: error
    };
};

export const clearPendingTransactionListLess3Days = () => {
    return {
        type: actionTypes.LAB_PENDING_CLEAR_Less3Days,
    };
}

export const pendingStartLess3Days = () => {
    return {
        type: actionTypes.LAB_PENDING_START_Less3Days,
    };
};

export const pendingSuccessLess3Days = (data) => {
    return {
        type: actionTypes.LAB_PENDING_SUCCESS_Less3Days,
        data: data,
    };
};

export const pendingFailLess3Days = (error) => {
    return {
        type: actionTypes.LAB_PENDING_FAIL_Less3Days,
        error: error
    };
};

export const getAllPendingTransactions = (token) => {
    return dispatch => {
        dispatch(pendingStart());
        const config = {
            method: 'get',
            url: 'transactions/pending',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(pendingSuccess(response.data));
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

export const getPendingTransactionsLess3Days = (token) => {
    return dispatch => {
        dispatch(pendingStartLess3Days());
        const config = {
            method: 'get',
            url: 'transactions/pending_three_days',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(pendingSuccessLess3Days(response.data));
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

export const getPendingTransactionsOver3Days = (token) => {
    return dispatch => {
        dispatch(pendingStartOver3Days());
        const config = {
            method: 'get',
            url: 'transactions/pending_over_than_three_days',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(pendingSuccessOver3Days(response.data));
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

export const viewOnHoldTransactions = (token) => {
    return dispatch => {
        dispatch(onHoldTxnStart());
        dispatch(getOnHoldTransactions(token, 0));
    };
}


export const clearOnHoldTransactionList = () => {
    return {
        type: actionTypes.ONHOLD_TRANS_CLEAR,
    };
}

export const searchTransactions = (token, searchKey, searchType) => {
    const params = {
        page: 0,
        searchKey: searchKey,
        searchType: searchType
    }

    return dispatch => {
        dispatch(translistStart());
        dispatch(getTransactions('transactions/search', token, params));
    };
}
