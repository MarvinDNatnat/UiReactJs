import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const corporatesStart = () => {
    return {
        type: actionTypes.CORPORATES_START,
    };
};

export const corporatesSuccess = (response) => {
    return {
        type: actionTypes.CORPORATES_SUCCESS,
        data: response
    };
};

export const corporatesFail = (error) => {
    return {
        type: actionTypes.CORPORATES_FAIL,
        error: error
    };
};

export const getCorporates = (url, token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(corporatesSuccess(response.data));
            })
            .catch(error => {
                dispatch(corporatesFail(error.response));
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

export const getAllCorporates = (token) => {
    return dispatch => {
        dispatch(corporatesStart());
        dispatch(getCorporates('corporates', token));
    };
};

export const getAllActiveCorporates = (token) => {
    return dispatch => {
        dispatch(corporatesStart());
        dispatch(getCorporates('corporates/active', token));
    };
};

export const getAllActiveCorporatescorp = (token) => {
    return dispatch => {
        dispatch(corporatesStart());
        dispatch(getCorporates('corporates/active/corp', token));
    };
};

export const corporateStart = () => {
    return {
        type: actionTypes.CORPORATE_START,
    };
};

export const corporateSuccess = (response, reqType) => {
    return {
        type: actionTypes.CORPORATE_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const corporateFail = (error) => {
    return {
        type: actionTypes.CORPORATE_FAIL,
        error: error
    };
};

export const saveUpdateCorporate = (token, corporateData, reqType, closeCorporateModal) => {
    return dispatch => {
        dispatch(corporateStart());

        let reqUrl = 'corporate';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + corporateData.corporateid;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: corporateData
        };

        axiosApi(config)
            .then(response => {
                dispatch(corporateSuccess(response.data, reqType));
                closeCorporateModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(corporateFail(error.response));

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

export const getCorporate = (token, corporateid) => {
    return dispatch => {
        dispatch(corporateStart());

        const config = {
            method: 'get',
            url: 'corporate/' + corporateid,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(corporateSuccess(response.data, 'get'));
            })
            .catch(error => {
                dispatch(corporateFail(error.response));

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
