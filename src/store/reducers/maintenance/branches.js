import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    branchList: [],
    error: null,
    loading: false,
    branchData: null,
    paymentBanks: [],
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.PAYMENT_BANKS:
            data = action.data;
            return updateObject(state, {
                paymentBanks: data,
            });

        case actionTypes.BRANCHES_START:
            return updateObject(state, {
                branchList: [],
                error: null,
                loading: true,
            });

        case actionTypes.BRANCHES_SUCCESS:
            data = action.data;
            return updateObject(state, {
                branchList: state.branchList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.BRANCHES_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.BRANCH_START:
            return updateObject(state, {
                branchData: null,
                error: null,
                loading: true,
            });

        case actionTypes.BRANCH_SUCCESS:
            data = action.data;
            const branchDataList = [...state.branchList];
            if (action.reqType === 'post') {
                branchDataList.push(data);
            } else if (action.reqType === 'put') {
                const branchIndex = branchDataList.findIndex(brn => brn.branchid === data.branchid);
                if (branchIndex >= 0) {
                    branchDataList[branchIndex] = data;
                }
            }
            return updateObject(state, {
                branchData: data,
                error: null,
                loading: false,
                branchList: branchDataList
            });

        case actionTypes.BRANCH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }

}

export default reducer;