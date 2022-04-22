import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    referralList: [],
    error: null,
    loading: false,
    referralData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.REFERRALS_START:
            return updateObject(state, {
                referralList: [],
                error: null,
                loading: true,
            });

        case actionTypes.REFERRALS_SUCCESS:
            data = action.data;
            return updateObject(state, {
                referralList: state.referralList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.REFERRALS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.REFERRAL_START:
            return updateObject(state, {
                referralData: null,
                error: null,
                loading: true,
            });

        case actionTypes.REFERRAL_SUCCESS:
            data = action.data;
            const referralDataList = [...state.referralList];
            if (action.reqType === 'post') {
                referralDataList.push(data);
            } else if (action.reqType === 'put') {
                const referralIndex = referralDataList.findIndex(ref => ref.referralid === data.referralid);
                if (referralIndex >= 0) {
                    referralDataList[referralIndex] = data;
                }
            }
            return updateObject(state, {
                referralData: data,
                error: null,
                loading: false,
                referralList: referralDataList
            });

        case actionTypes.REFERRAL_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }

}

export default reducer;