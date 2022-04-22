import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import * as actionTypes from 'src/store/actions/actionTypes';
import Swal from 'sweetalert2';
import { updateObject } from 'src/store/utility';
export const sopStart = (response) => {
    return {
        type: actionTypes.SOP_START,
        data: response
    };
};

export const sopSuccess = (response) => {
    return {
        type: actionTypes.SOP_SUCCESS,
        data: response
    };
};

export const sopFail = (error) => {
    return {
        type: actionTypes.SOP_FAIL,
        error: error
    };
};

export const sopClear = () => {
    return {
        type: actionTypes.SOP_CLEAR,
    };
};

export const viewSOPUnbilledTransactions = (token, startTime, endTime, referenceLab, setData) => {
    return dispatch => {
        dispatch(sopStart())
        const config = {
            method: 'get',
            url: 'transactions/list_send_outs',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                dateTimeFrom: startTime,
                dateTimeTo: endTime,
                referenceLab: referenceLab,
            }
        };

        axiosApi(config)
            .then(response => {
                dispatch(sopSuccess(response.data));
                setData()
            })
            .catch(error => {
                dispatch(sopFail(error.response));
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

export const saveUpdateSOP = (token, sopData, closeSOPModal) => {
    return dispatch => {
        let reqUrl = 'transactions/create_sop/' + sopData.referenceid;
        let scsMsg = "Save successfull";
        const config = {
            method: 'post',
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: sopData
        };
        axiosApi(config)
            .then(response => {
                // dispatch(soaSuccess(response.data, reqType));
                closeSOPModal(response.data);
                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                // dispatch(soaFail(error.response));
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


export const sopListStart = (response) => {
    return {
        type: actionTypes.SOP_LIST_START,
        data: response
    };
};

export const sopListSuccess = (response) => {
    return {
        type: actionTypes.SOP_LIST_SUCCESS,
        data: response
    };
};

export const sopListFail = (error) => {
    return {
        type: actionTypes.SOP_LIST_FAIL,
        error: error
    };
};

export const sopListClear = () => {
    return {
        type: actionTypes.SOP_LIST_CLEAR,
    };
};


export const listSOP = (token, startTime, endTime, referenceid, setData) => {
    return dispatch => {
        dispatch(sopListStart())
        let reqUrl = 'transactions/list_sop';
        let scsMsg = "Success";
        const config = {
            method: 'get',
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                dateTimeFrom: startTime,
                dateTimeTo: endTime,
                referenceId: referenceid,
            }
        };
        axiosApi(config)
            .then(response => {
                dispatch(sopListSuccess(response.data));
                setData();
                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(sopListFail(error.response));
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


export const saveUpdateSOPPayment = (token, paymentData, closeSOPModal) => {
    return dispatch => {
        // dispatch(paymentStart());

        let reqUrl = 'transactions/sop/' + paymentData.referenceId + '/payment';
        let scsMsg = "Save successfull";
        // if (reqType === 'put') {
        //     scsMsg = "Update successfull";
        // }

        const config = {
            method: 'post',
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: paymentData
        };

        axiosApi(config)
            .then(response => {
                closeSOPModal(response.data);
                Swal.fire({
                    title: scsMsg,
                    icon: 'success',
                    text: 'Please upload payment image from "Payments" tab.',
                });

            })
            .catch(error => {
                // dispatch(paymentFail(error.response));

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


export const sopPaymentStart = (response) => {
    return {
        type: actionTypes.SOP_PAYMENT_LIST_START,
        data: response
    };
};

export const sopPaymentSuccess = (response) => {
    return {
        type: actionTypes.SOP_PAYMENT_LIST_SUCCESS,
        data: response
    };
};

export const sopPaymentConcat = (response) => {
    return {
        type: actionTypes.SOP_PAYMENT_LIST_CONCAT,
        data: response
    };
};

export const sopPaymentFail = (error) => {
    return {
        type: actionTypes.SOP_PAYMENT_LIST_FAIL,
        error: error
    };
};

export const getSOPPaymentList = (url, token, params, setData) => {
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
                    dispatch(sopPaymentSuccess(response.data));
                    setData();

                } else {
                    dispatch(sopPaymentConcat(response.data));

                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getSOPPaymentList(url, token, newParam));
                }
            })
            .catch(error => {
                dispatch(sopPaymentFail(error.response));

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


export const viewSOPPaymentList = (token, referenceLab, year, setData) => {
    const params = {
        page: 0,
    }

    return dispatch => {
        dispatch(sopPaymentStart());
        dispatch(getSOPPaymentList('transactions/sop/' + referenceLab + '/payments/' + year, token, params, setData));
    };
}

export const verifySOP = (token, referenceId, sopId, closeSOPModal) => {
    return dispatch => {
        dispatch(loadingSOPStart());

        const config = {
            method: 'put',
            url: 'transactions/sop/' + referenceId + '/verify/' + sopId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOPSuccess());
                closeSOPModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'SOA Verified'
                });
            })
            .catch(error => {
                dispatch(loadingSOPFail(error.response));

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

export const notedSOP = (token, referenceId, sopId, closeSOPModal) => {
    return dispatch => {
        dispatch(loadingSOPStart());

        const config = {
            method: 'put',
            url: 'transactions/sop/' + referenceId + '/noted/' + sopId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOPSuccess());
                closeSOPModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'SOA Verified'
                });
            })
            .catch(error => {
                dispatch(loadingSOPFail(error.response));

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

export const verifySOPPayment = (token, referenceId, paymentId, closeSOPPaymentModal) => {
    return dispatch => {
        dispatch(loadingSOPStart());

        const config = {
            method: 'put',
            url: 'transactions/sop/' + referenceId + '/payment/' + paymentId + '/verify',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOPSuccess());
                closeSOPPaymentModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'SOP Payment Verified'
                });
            })
            .catch(error => {
                dispatch(loadingSOPFail(error.response));

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


export const getReferenceToSOPExcel = (token, referenceLab, sopId, sopNumber) => {
    return dispatch => {
        dispatch(loadingSOPStart());

        const config = {
            method: 'get',
            url: 'transactions/sop/' + referenceLab + '/excel/' + sopId,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOPSuccess());

                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'sop_.xlsx'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                dispatch(loadingSOPFail(error.response));
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

export const printReferenceToSOP = (token, referenceId, sopId, withHeaderFooter) => {
    return dispatch => {
        dispatch(loadingSOPStart());

        const config = {
            method: 'get',
            url: '/transactions/sop/' + referenceId + '/print/' + sopId,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                withHeaderFooter: withHeaderFooter
            }
        }

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOPSuccess());

                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
                dispatch(loadingSOPFail(error.response));
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

export const loadingSOPStart = () => {
    return {
        type: actionTypes.SOP_LOADING_START,
    };
};

export const loadingSOPSuccess = () => {
    return {
        type: actionTypes.SOP_LOADING_SUCCESS,
    };
};

export const loadingSOPFail = (error) => {
    return {
        type: actionTypes.SOP_LOADING_FAIL,
        error: error
    };
};

export const sopSummaryClear = () => {
    return {
        type: actionTypes.SOP_SUMMARY_CLEAR,
    };
};

export const sopSummaryStart = () => {
    return {
        type: actionTypes.SOP_SUMMARY_START,
    };
};

export const sopSummarySuccess = (response) => {
    return {
        type: actionTypes.SOP_SUMMARY_SUCCESS,
        data: response
    };
};

export const sopSummaryFail = (error) => {
    return {
        type: actionTypes.SOP_SUMMARY_FAIL,
        error: error
    };
};


export const viewSOPSummaryList = (token, referenceId, year, setData) => {
    return dispatch => {
        dispatch(sopSummaryStart());
        const config = {
            method: 'get',
            url: 'transactions/sop/' + referenceId + '/summary/' + year,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(sopSummarySuccess(response.data));
                setData();
            })
            .catch(error => {
                dispatch(sopSummaryFail(error.response));

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


export const uploadPaymentImageSop = (token, changeTo, paymentId, imageFile, closeSOAPaymentModal) => {
    return dispatch => {
        dispatch(loadingSOPStart());

        const formData = new FormData();
        formData.append('uploadFile', imageFile);

        axiosApi.put('transactions/sop/' + changeTo + '/payment/' + paymentId + '/upload_receipt',
            formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                },
            })
            .then(response => {
                dispatch(loadingSOPSuccess());
                closeSOAPaymentModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Payment Image uploaded.'
                });
            })
            .catch(error => {
                dispatch(loadingSOPFail(error.response));
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
