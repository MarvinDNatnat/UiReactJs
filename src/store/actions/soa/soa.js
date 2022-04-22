import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import { updateObject } from 'src/store/utility';
import Swal from 'sweetalert2';

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

export const clearAllSOAList = () => {
    return {
        type: actionTypes.AUDITOR_SOA_CLEAR_DATA,
    };
};

// SOA UNBILLED
export const clearSOAUnbilledList = () => {
    return {
        type: actionTypes.AUDITOR_SOA_UNBILLED_CLEAR,
    };
};

export const soaUnbilledStart = (response) => {
    return {
        type: actionTypes.AUDITOR_SOA_UNBILLED_START,
        data: response
    };
};

export const soaUnbilledSuccess = (response) => {
    return {
        type: actionTypes.AUDITOR_SOA_UNBILLED_SUCCESS,
        data: response
    };
};

export const soaUnbilledConcat = (response) => {
    return {
        type: actionTypes.AUDITOR_SOA_UNBILLED_CONCAT,
        data: response
    };
};

export const soaUnbilledFail = (error) => {
    return {
        type: actionTypes.AUDITOR_SOA_UNBILLED_FAIL,
        error: error
    };
};

export const getSOATransactions = (url, token, params, setData) => {
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
                    dispatch(soaUnbilledSuccess(response.data));
                    setData();
                } else {
                    dispatch(soaUnbilledConcat(response.data));

                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getSOATransactions(url, token, newParam, setData));
                }
            })
            .catch(error => {
                dispatch(soaUnbilledFail(error.response));

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

export const viewSOAUnbilledTransactions = (token, changeTo, setData) => {
    const params = {
        page: 0,
        chargeTo: changeTo,
    }

    return dispatch => {
        dispatch(soaUnbilledStart());
        dispatch(getSOATransactions('soa/unbilled', token, params, setData));
    };
}

export const soaStart = () => {
    return {
        type: actionTypes.AUDITOR_SOA_START,
    };
};

export const soaSuccess = (response) => {
    return {
        type: actionTypes.AUDITOR_SOA_SUCCESS,
        data: response,
    };
};

export const soaFail = (error) => {
    return {
        type: actionTypes.AUDITOR_SOA_FAIL,
        error: error
    };
};

export const saveUpdateSOA = (token, soaData, reqType, closeSOAModal) => {
    return dispatch => {
        dispatch(soaStart());

        let reqUrl = 'soa/' + soaData.corporateid;
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: soaData
        };

        axiosApi(config)
            .then(response => {
                dispatch(soaSuccess(response.data, reqType));
                closeSOAModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(soaFail(error.response));

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


export const paymentStart = () => {
    return {
        type: actionTypes.PAYMENT_SOA_START,
    };
};

export const paymentSuccess = (response) => {
    return {
        type: actionTypes.PAYMENT_SOA_SUCCESS,
        data: response,
    };
};

export const paymentFail = (error) => {
    return {
        type: actionTypes.PAYMENT_SOA_FAIL,
        error: error
    };
};

export const saveUpdateSOAPayment = (token, paymentData, reqType, closeSOAModal) => {
    return dispatch => {
        dispatch(paymentStart());

        let reqUrl = 'soa/' + paymentData.corporateid + '/payment';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: paymentData
        };

        axiosApi(config)
            .then(response => {
                dispatch(paymentSuccess(response.data, reqType));
                closeSOAModal(response.data);

                // Toast.fire({
                //     icon: 'success',
                //     title: scsMsg
                // });
                Swal.fire({
                    title: scsMsg,
                    icon: 'success',
                    text: 'Please upload payment image from "Payments" tab.',
                });
    
            })
            .catch(error => {
                dispatch(paymentFail(error.response));

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


export const verifySOAPayment = (token, changeTo, paymentId, closeSOAPaymentModal) => {
    return dispatch => {
        dispatch(loadingSOAStart());

        const config = {
            method: 'put',
            url: 'soa/' + changeTo + '/payment/' + paymentId + '/verify',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOASuccess());
                closeSOAPaymentModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'SOA Payment Verified'
                });
            })
            .catch(error => {
                dispatch(loadingSOAFail(error.response));

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

export const auditedSOAPayment = (token, changeTo, paymentId, closeSOAPaymentModal, controlNumber) => {
    return dispatch => {
        dispatch(loadingSOAStart());

        const config = {
            params: {
                controlNumber: controlNumber
            },
            method: 'put',
            url: 'soa/' + changeTo + '/payment/' + paymentId + '/audited',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOASuccess());
                closeSOAPaymentModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'SOA Payment Audited'
                });
            })
            .catch(error => {
                dispatch(loadingSOAFail(error.response));

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


export const chargeToSOAStart = (response) => {
    return {
        type: actionTypes.CHARGETO_SOA_START,
        data: response
    };
};

export const chargeToSOASuccess = (response) => {
    return {
        type: actionTypes.CHARGETO_SOA_SUCCESS,
        data: response
    };
};

export const chargeToSOAConcat = (response) => {
    return {
        type: actionTypes.CHARGETO_SOA_CONCAT,
        data: response
    };
};

export const chargeToSOAFail = (error) => {
    return {
        type: actionTypes.CHARGETO_SOA_FAIL,
        error: error
    };
};

export const getChargeToSOAList = (url, token, params, setData) => {
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
                    dispatch(chargeToSOASuccess(response.data));
                    setData();

                } else {
                    dispatch(chargeToSOAConcat(response.data));
                    
                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getChargeToSOAList(url, token, newParam, setData));
                }
            })
            .catch(error => {
                dispatch(chargeToSOAFail(error.response));

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

export const viewChargeToSOAList = (token, changeTo, year, startDate, endDate, byYear, setData) => {
    const params = {
        page: 0,
        startDateTime: startDate,
        endDateTime: endDate,
        byYear: byYear
    }

    let url = 'soa/year/' + year;
    if(changeTo !== null){
        url = 'soa/' + changeTo + '/year/' + year;
    }

    return dispatch => {
        dispatch(chargeToSOAStart());
        dispatch(getChargeToSOAList(url, token, params, setData));
    };
}

export const soaSummaryReportStart = () => {
    return {
        type: actionTypes.SOA_SUMMARY_REPORT_START,
    };
};

export const soaSummaryReportSuccess = (response) => {
    return {
        type: actionTypes.SOA_SUMMARY_REPORT_SUCCESS,
        data: response
    };
};

export const soaSummaryReportFail = (error) => {
    return {
        type: actionTypes.SOA_SUMMARY_REPORT_FAIL,
        error: error
    };
};

export const getSOAExcel = (
    token, 
    year, 
    startDate, 
    endDate, 
    byYear, 
    chargeId,
    soaPrepared, 
    soaVerified, 
    soaNoted, 
    soaSend, 
    soaRecieved, 
    soaPaymentPrepared, 
    soaPaymentBalance, 
    soaPaymentVerified, 
    soaPaymentAudited, 
    unbilledTransaction) => {
    return dispatch => {
        dispatch(soaSummaryReportStart());
        const params = {
            page: 0,
            dateTimeFrom: startDate,
            dateTimeTo: endDate,
            byYear: byYear,
            chargeId : chargeId,
            soaPrepared: soaPrepared,
            soaVerified: soaVerified,
            soaNoted: soaNoted,
            soaSend: soaSend,
            soaRecieved: soaRecieved,
            soaPaymentPrepared: soaPaymentPrepared,
            soaPaymentBalance: soaPaymentBalance,
            soaPaymentVerified: soaPaymentVerified,
            soaPaymentAudited: soaPaymentAudited,
            unbilledTransaction: unbilledTransaction,


        }
        const config = {
            method: 'post',
            url: 'soa/generate_excel/year/' + year,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: params
        };

        axiosApi(config)
            .then(response => {
                dispatch(soaSummaryReportSuccess());
                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'SOA_REPORT.csv'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                dispatch(soaSummaryReportFail(error.response));
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





export const loadingSOAStart = () => {
    return {
        type: actionTypes.SOA_LOADING_START,
    };
};

export const loadingSOASuccess = () => {
    return {
        type: actionTypes.SOA_LOADING_SUCCESS,
    };
};

export const loadingSOAFail = (error) => {
    return {
        type: actionTypes.SOA_LOADING_FAIL,
        error: error
    };
};




export const verifySOA = (token, changeTo, soaId, closeSOAModal) => {
    return dispatch => {
        dispatch(loadingSOAStart());

        const config = {
            method: 'put',
            url: 'soa/' + changeTo + '/verify/' + soaId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOASuccess());
                closeSOAModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'SOA Verified'
                });
            })
            .catch(error => {
                dispatch(loadingSOAFail(error.response));

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

export const notedSOA = (token, changeTo, soaId, closeSOAModal) => {
    return dispatch => {
        dispatch(loadingSOAStart());

        const config = {
            method: 'put',
            url: 'soa/' + changeTo + '/noted/' + soaId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOASuccess());
                closeSOAModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'SOA Verified'
                });
            })
            .catch(error => {
                dispatch(loadingSOAFail(error.response));

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


export const soaPaymentStart = (response) => {
    return {
        type: actionTypes.SOA_PAYMENT_START,
        data: response
    };
};

export const soaPaymentSuccess = (response) => {
    return {
        type: actionTypes.SOA_PAYMENT_SUCCESS,
        data: response
    };
};

export const soaPaymentConcat = (response) => {
    return {
        type: actionTypes.SOA_PAYMENT_CONCAT,
        data: response
    };
};

export const soaPaymentFail = (error) => {
    return {
        type: actionTypes.SOA_PAYMENT_FAIL,
        error: error
    };
};

export const getSOAPaymentList = (url, token, params, setData) => {
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
                    dispatch(soaPaymentSuccess(response.data));
                    setData();

                } else {
                    dispatch(soaPaymentConcat(response.data));

                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getSOAPaymentList(url, token, newParam));
                }
            })
            .catch(error => {
                dispatch(soaPaymentFail(error.response));

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

export const viewSOAPaymentList = (token, changeTo, year, startDate, endDate, byYear, setData) => {
    const params = {
        page: 0,
        startDateTime: startDate,
        endDateTime: endDate,
        byYear: byYear
    }

    return dispatch => {
        dispatch(soaPaymentStart());
        dispatch(getSOAPaymentList('soa/' + changeTo + '/payments/' + year, token, params, setData));
    };
}

export const getChargeToSOAExcel = (token, changeTo, soaId, soaNumber) => {
    return dispatch => {
        dispatch(loadingSOAStart());

        const config = {
            method: 'get',
            url: 'soa/' + changeTo + '/excel/' + soaId,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        };

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOASuccess());

                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'soa_' + soaNumber + '.xlsx'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                dispatch(loadingSOAFail(error.response));
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

export const printChargeToSOA = (token, changeTo, soaId, withHeaderFooter, withRunningBalance, year) => {
    return dispatch => {
        dispatch(loadingSOAStart());

        const config = {
            method: 'get',
            url: 'soa/' + changeTo + '/print/' + soaId + '/year/' + year,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                withHeaderFooter: withHeaderFooter,
                withRunningBalance:withRunningBalance
            }
        }

        axiosApi(config)
            .then(response => {
                dispatch(loadingSOASuccess());

                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
                dispatch(loadingSOAFail(error.response));
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




export const addAdvancePayment = (token, chargeTo, amount) => {
    return dispatch => {

        const config = {
            method: 'get',
            url: 'soa/' + chargeTo + '/advance_payment',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                amount: amount
            }
        }

        axiosApi(config)
            .then(response => {
                Toast.fire({
                    icon: 'success',
                    title: 'Added Successfully'
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


export const soaSummaryClear = () => {
    return {
        type: actionTypes.SOA_SUMMARY_CLEAR,
    };
};

export const soaSummaryStart = () => {
    return {
        type: actionTypes.SOA_SUMMARY_START,
    };
};

export const soaSummarySuccess = (response) => {
    return {
        type: actionTypes.SOA_SUMMARY_SUCCESS,
        data: response
    };
};

export const soaSummaryFail = (error) => {
    return {
        type: actionTypes.SOA_SUMMARY_FAIL,
        error: error
    };
};

export const viewSOASummaryList = (token, changeTo, year, setData) => {
    return dispatch => {
        dispatch(soaSummaryStart());
        const config = {
            method: 'get',
            url: 'soa/' + changeTo + '/summary/' + year,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(soaSummarySuccess(response.data));
                setData();
            })
            .catch(error => {
                dispatch(soaSummaryFail(error.response));

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


export const uploadPaymentImage = (token, changeTo, paymentId, imageFile, closeSOAPaymentModal) => {
    return dispatch => {
        dispatch(loadingSOAStart());

        const formData = new FormData();
        formData.append('uploadFile', imageFile);

        axiosApi.put('soa/' + changeTo + '/payment/' + paymentId + '/upload_receipt',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                },
            }
        )
            .then(response => {
                dispatch(loadingSOASuccess());
                closeSOAPaymentModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Payment Image uploaded.'
                });
            })
            .catch(error => {
                dispatch(loadingSOAFail(error.response));

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