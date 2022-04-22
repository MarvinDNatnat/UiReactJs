import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const doctorsStart = () => {
    return {
        type: actionTypes.DOCTORS_START,
    };
};

export const doctorsSuccess = (response) => {
    return {
        type: actionTypes.DOCTORS_SUCCESS,
        data: response
    };
};

export const doctorsFail = (error) => {
    return {
        type: actionTypes.DOCTORS_FAIL,
        error: error
    };
};

export const getAllDoctors = (token) => {
    return dispatch => {
        dispatch(doctorsStart());

        const config = {
            method: 'get',
            url: 'doctors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(doctorsSuccess(response.data));
            })
            .catch(error => {
                dispatch(doctorsFail(error.response));

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

export const doctorStart = () => {
    return {
        type: actionTypes.DOCTOR_START,
    };
};

export const doctorSuccess = (response, reqType) => {
    return {
        type: actionTypes.DOCTOR_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const doctorFail = (error) => {
    return {
        type: actionTypes.DOCTOR_FAIL,
        error: error
    };
};

export const getDoctor = (token, docid) => {
    return dispatch => {
        dispatch(doctorStart());

        const config = {
            method: 'get',
            url: 'doctor/' + docid,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }

        axiosApi(config)
            .then(response => {
                dispatch(doctorSuccess(response.data, 'get'));
            })
    }
}

export const saveUpdateDoctor = (token, doctorData, reqType, closeDoctorModal) => {
    return dispatch => {
        dispatch(doctorStart());

        let reqUrl = 'doctor';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + doctorData.doctorid;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: doctorData
        };

        axiosApi(config)
            .then(response => {
                dispatch(doctorSuccess(response.data, reqType));
                closeDoctorModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(doctorFail(error.response));

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

export const uploadDoctorSignature = (token, doctorid, signatureFile, closeDoctorModal) => {
    return dispatch => {
        dispatch(doctorStart());

        const formData = new FormData();
        formData.append('uploadFile', signatureFile);

        axiosApi.put('doctor/' + doctorid + '/upload_signature',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                },
            }
        )
            .then(response => {
                dispatch(doctorSuccess(response.data, 'put'));
                closeDoctorModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Signature uploaded.'
                });
            })
            .catch(error => {
                dispatch(doctorFail(error.response));

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