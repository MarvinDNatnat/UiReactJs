import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import { updateObject } from 'src/store/utility';

export const patientsStart = () => {
    return {
        type: actionTypes.PATIENTS_START,
    };
};

export const patientsSuccess = (response) => {
    return {
        type: actionTypes.PATIENTS_SUCCESS,
        data: response
    };
};

export const patientsConcat = (response) => {
    return {
        type: actionTypes.PATIENTS_CONCAT,
        data: response
    };
};

export const patientsFail = (error) => {
    return {
        type: actionTypes.PATIENTS_FAIL,
        error: error
    };
};

export const patientsDateStart = () => {
    return {
        type: actionTypes.PATIENTS_DATE_START,
    };
};

export const patientsDateSuccess = (response) => {
    return {
        type: actionTypes.PATIENTS_DATE_SUCCESS,
        data: response
    };
};

export const patientsDateConcat = (response) => {
    return {
        type: actionTypes.PATIENTS_DATE_CONCAT,
        data: response
    };
};

export const patientsDateFail = (error) => {
    return {
        type: actionTypes.PATIENTS_DATE_FAIL,
        error: error
    };
};

export const getAllPatientsDate = (token) => {
    return dispatch => {
        dispatch(patientsDateStart());
        dispatch(getPatientsDate('date/patients', token, {
            page: 0
        }));
    };
};

export const getPatientsDate = (url, token, params, all = true) => {
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
                if (response.data.last || !all) {
                    dispatch(patientsDateSuccess(response.data));
                } else {
                    dispatch(patientsDateConcat(response.data));

                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getPatientsDate(url, token, newParam, all));
                }
            })
            .catch(error => {
                dispatch(patientsDateFail(error.response));
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

export const getPatients = (url, token, params, all = true) => {
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
                if (response.data.last || !all) {
                    dispatch(patientsSuccess(response.data));
                } else {
                    dispatch(patientsConcat(response.data));

                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getPatients(url, token, newParam, all));
                }
            })
            .catch(error => {
                dispatch(patientsFail(error.response));

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

export const getAllPatients = (token) => {
    return dispatch => {
        dispatch(patientsStart());
        dispatch(getPatients('patients', token, {
            page: 0
        }));
    };
};

export const getInitialPatients = (token) => {
    return dispatch => {
        dispatch(patientsStart());
        dispatch(getPatients('patients', token, {
            size: 20,
            page: 0
        }, false));
    };
};

export const searchPatients = (token, key) => {
    return dispatch => {
        dispatch(patientsStart());
        dispatch(getPatients('patients/search', token, {
            searchKey: key,
            size: 20,
            page: 0
        }));
    };
}

export const patientStart = () => {
    return {
        type: actionTypes.PATIENT_START,
    };
};

export const patientSuccess = (response, reqType) => {
    return {
        type: actionTypes.PATIENT_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const patientFail = (error) => {
    return {
        type: actionTypes.PATIENT_FAIL,
        error: error
    };
};

export const saveUpdatePatient = (token, patientData, reqType, closePatientModal) => {
    return dispatch => {
        dispatch(patientStart());

        let reqUrl = 'patient';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + patientData.patientid;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: patientData
        };

        axiosApi(config)
            .then(response => {
                dispatch(patientSuccess(response.data, reqType));
                closePatientModal(response.data);
                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(patientFail(error.response));

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

export const savePatientRegistration = (token, patientData, reqType, closePatientModal, reloadList) => {
    return dispatch => {
        dispatch(patientStart());
        const config = {
            method: 'post',
            url: 'patient_registration',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: patientData
        }

        axiosApi(config)
            .then(response => {
                dispatch(patientSuccess(response.data, reqType));
                closePatientModal(response.data);
                reloadList();
                Toast.fire({
                    icon: 'success',
                    title: 'Save successfull'
                });
            })
            .catch(error => {
                dispatch(patientFail(error.response));
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

export const saveUpdatePatientRegistration = (token, patientData, reqType, closePatientModal, reloadList) => {
    return dispatch => {
        dispatch(patientStart());
        let reqUrl = 'patient';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + patientData.patientid;
            scsMsg = "Update successfull";
        }
        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: patientData
        };

        axiosApi(config)
            .then(response => {
                dispatch(patientSuccess(response.data, reqType));
                closePatientModal(response.data);
                reloadList();
                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(patientFail(error.response));

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
