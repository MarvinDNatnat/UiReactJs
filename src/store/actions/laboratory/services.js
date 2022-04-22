import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import { updateObject } from 'src/store/utility';

export const transByServReqClear = (laboratory) => {
    let actTyp = null;
    switch (laboratory) {
        case 'XR': // XRAY
            actTyp = actionTypes.LAB_XR_CLEAR_LIST;
            break;

        case 'PE': // PHYSICAL EXAM
            actTyp = actionTypes.LAB_PE_CLEAR_LIST;
            break;

        case 'US': // ULTRASOUND
            actTyp = actionTypes.LAB_US_CLEAR_LIST;
            break;

        case 'E2D': // 2D ECHO
            actTyp = actionTypes.LAB_E2D_CLEAR_LIST;
            break;

        case 'ECG': // ELECTROCARDIOGRAM
            actTyp = actionTypes.LAB_ECG_CLEAR_LIST;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
    };
};

export const transByServReqStart = (laboratory) => {
    let actTyp = null;
    switch (laboratory) {
        case 'XR': // XRAY
            actTyp = actionTypes.LAB_XR_START;
            break;

        case 'PE': // PHYSICAL EXAM
            actTyp = actionTypes.LAB_PE_START;
            break;

        case 'US': // ULTRASOUND
            actTyp = actionTypes.LAB_US_START;
            break;

        case 'E2D': // 2D ECHO
            actTyp = actionTypes.LAB_E2D_START;
            break;

        case 'ECG': // ELECTROCARDIOGRAM
            actTyp = actionTypes.LAB_ECG_START;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
    };
};

export const transByServReqSuccess = (response, laboratory) => {
    let actTyp = null;
    switch (laboratory) {
        case 'XR': // XRAY
            actTyp = actionTypes.LAB_XR_SUCCESS;
            break;

        case 'PE': // PHYSICAL EXAM
            actTyp = actionTypes.LAB_PE_SUCCESS;
            break;

        case 'US': // ULTRASOUND
            actTyp = actionTypes.LAB_US_SUCCESS;
            break;

        case 'E2D': // 2D ECHO
            actTyp = actionTypes.LAB_E2D_SUCCESS;
            break;

        case 'ECG': // ELECTROCARDIOGRAM
            actTyp = actionTypes.LAB_ECG_SUCCESS;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
        data: response
    };
};

export const transByServReqConcat = (response, laboratory) => {
    let actTyp = null;
    switch (laboratory) {
        case 'XR': // XRAY
            actTyp = actionTypes.LAB_XR_CONCAT;
            break;

        case 'PE': // PHYSICAL EXAM
            actTyp = actionTypes.LAB_PE_CONCAT;
            break;

        case 'US': // ULTRASOUND
            actTyp = actionTypes.LAB_US_CONCAT;
            break;

        case 'E2D': // 2D ECHO
            actTyp = actionTypes.LAB_E2D_CONCAT;
            break;

        case 'ECG': // ELECTROCARDIOGRAM
            actTyp = actionTypes.LAB_ECG_CONCAT;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
        data: response
    };
};

export const transByServReqFail = (error, laboratory) => {
    let actTyp = null;
    switch (laboratory) {
        case 'XR': // XRAY
            actTyp = actionTypes.LAB_XR_FAIL;
            break;

        case 'PE': // PHYSICAL EXAM
            actTyp = actionTypes.LAB_PE_FAIL;
            break;

        case 'US': // ULTRASOUND
            actTyp = actionTypes.LAB_US_FAIL;
            break;

        case 'E2D': // 2D ECHO
            actTyp = actionTypes.LAB_E2D_FAIL;
            break;

        case 'ECG': // ELECTROCARDIOGRAM
            actTyp = actionTypes.LAB_ECG_FAIL;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
        error: error
    };
};

export const getTransactionByServReq = (token, params, laboratory) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/service_request',
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
                    dispatch(transByServReqSuccess(response.data, laboratory));
                } else {
                    dispatch(transByServReqConcat(response.data, laboratory));

                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getTransactionByServReq(token, newParam, laboratory));
                }
            })
            .catch(error => {
                dispatch(transByServReqFail(error.response, laboratory));

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

export const viewTransByServiceRequest = (token, startDate, endDate, laboratory, branchId = null, chargeTo = null) => {
    const params = {
        page: 0,
        dateTimeFrom: startDate,
        dateTimeTo: endDate,
        laboratory: laboratory,
        branchId: branchId,
        chargeTo: chargeTo,
    }

    return dispatch => {
        dispatch(transByServReqStart(laboratory));
        dispatch(getTransactionByServReq(token, params, laboratory));
    };
}