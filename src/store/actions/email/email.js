import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import * as actionTypes from 'src/store/actions/actionTypes';

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

export const sendEmail = (token, emailValues, transid, questQuality, closeModal) => {
    return dispatch => {
        dispatch(emailStart());
        const config = {
            method: 'post',
            url: '/transaction/' + transid + "/" + questQuality +'/email',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: emailValues
        }

        axiosApi(config)
            .then(response => {
                closeModal(response.data);
                dispatch(emailSuccess());
                Toast.fire({
                    icon: 'success',
                    title: 'Email sent successfully'
                });
            })
            .catch(error => {
                dispatch(emailFail(error.response));
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

export const sendSerologyEmail = (token, emailValues, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(emailStart());
        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/serology/email',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: emailValues
        }

        axiosApi(config)
            .then(response => {
                closeModal(response.data);
                dispatch(emailSuccess());
                Toast.fire({
                    icon: 'success',
                    title: 'Email sent successfully'
                });
            })
            .catch(error => {
                dispatch(emailFail(error.response));
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

export const SendEmailConsolidated = (token, emailValues, transid, closeModal) => {
    return dispatch => {
        dispatch(sendEmail(token, emailValues, transid, 'quest_quality', closeModal))
    }
}

 
export const recieveChargeToSOA = ( token, chargeTo, soaId, closeModal, year) => {
    return dispatch => {
        const config = {
            method: 'post',
            url: 'soa/' + chargeTo + '/recieve_email/' + soaId + '/year/' + year,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }
        axiosApi(config)
            .then(response => {
                closeModal(response.data);
                Toast.fire({
                    icon: 'success',
                    title: 'Recieve successfully'
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

export const sendChargeToSOA = ( token, emailValues, changeTo, soaId, closeModal, year, withRunningBalance) => {
    return dispatch => {
        dispatch(emailStart());
        const config = {
            method: 'post',
            url: 'soa/' + changeTo + '/send_email/' + soaId + '/year/' + year,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: emailValues,
            params: {
                withRunningBalance:withRunningBalance
            }
        }
        axiosApi(config)
            .then(response => {
                closeModal(response.data);
                dispatch(emailSuccess());
                Toast.fire({
                    icon: 'success',
                    title: 'Email sent successfully'
                });
            })
            .catch(error => {
                dispatch(emailFail(error.response));
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


export const sendChargeToSOP = ( token, emailValues, referenceId, sopId, closeModal) => {
    return dispatch => {
        dispatch(emailStart());
        const config = {
            method: 'post',
            url: 'transactions/sop/' + referenceId + '/send_email/' + sopId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: emailValues,
        }
        axiosApi(config)
            .then(response => {
                closeModal(response.data);
                dispatch(emailSuccess());
                Toast.fire({
                    icon: 'success',
                    title: 'Email sent successfully'
                });
            })
            .catch(error => {
                dispatch(emailFail(error.response));
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