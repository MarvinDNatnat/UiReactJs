import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const saveUpdateReference = (token, ReferenceData, closePackageModal) => {
    return dispatch => {
        const config = {
            method: "POST",
            url: "reference_laboratory",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: ReferenceData
        };
        axiosApi(config)
            .then(response => {
                closePackageModal(response.data);
                Toast.fire({
                    icon: 'success',
                    title: "Add Successfully"
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
    };
};


export const referenceStart = () => {
    return {
        type: actionTypes.REFERENCE_LABORATORY_START,
    };
};

export const referenceSuccess = (response) => {
    return {
        type: actionTypes.REFERENCE_LABORATORY_SUCCESS,
        data: response
    };
};

export const referenceConcat = (response) => {
    return {
        type: actionTypes.REFERENCE_LABORATORY_CONCAT,
        data: response
    };
};

export const referenceFail = (error) => {
    return {
        type: actionTypes.REFERENCE_LABORATORY_FAIL,
        error: error
    };
};

export const getAllReferenceLaboratory = (token) => {
    return dispatch => {
        dispatch(referenceStart());
        const config = {
            
            method: "GET",
            url: "reference_laboratory/list",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(referenceSuccess(response.data));
                dispatch(referenceConcat(response.data));
            })
            .catch(error => {
                dispatch(referenceFail(error.response));
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
