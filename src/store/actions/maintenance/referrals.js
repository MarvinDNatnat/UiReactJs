import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const referralsStart = () => {
    return {
        type: actionTypes.REFERRALS_START,
    };
};

export const referralsSuccess = (response) => {
    return {
        type: actionTypes.REFERRALS_SUCCESS,
        data: response
    };
};

export const referralsFail = (error) => {
    return {
        type: actionTypes.REFERRALS_FAIL,
        error: error
    };
};

export const getReferralItems = (url, token) => {
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
                dispatch(referralsSuccess(response.data));
            })
            .catch(error => {
                dispatch(referralsFail(error.response));

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

export const getAllReferrals = (token) => {
    return dispatch => {
        dispatch(referralsStart());
        dispatch(getReferralItems('referrals', token));
    }
}

export const getAllActiveReferrals = (token) => {
    return dispatch => {
        dispatch(referralsStart());
        dispatch(getReferralItems('referrals/active', token));
    }
}


export const referralStart = () => {
    return {
        type: actionTypes.REFERRAL_START,
    };
};

export const referralSuccess = (response, reqType) => {
    return {
        type: actionTypes.REFERRAL_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const referralFail = (error) => {
    return {
        type: actionTypes.REFERRAL_FAIL,
        error: error
    };
};

export const getReferral = (token, refid) => {
    return dispatch => {
        dispatch(referralStart());

        const config = {
            method: 'get',
            url: 'referral/' + refid,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }

        axiosApi(config)
            .then(response => {
                dispatch(referralSuccess(response.data, 'get'));
            })
    }
}

export const saveUpdateReferral = (token, referralData, reqType, closeReferralModal) => {
    return dispatch => {
        dispatch(referralStart());

        let reqUrl = 'referral';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + referralData.referralid;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: referralData
        };

        axiosApi(config)
            .then(response => {
                dispatch(referralSuccess(response.data, reqType));
                closeReferralModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(referralFail(error.response));

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