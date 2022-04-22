import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    error: null,
    loading: false,
    txnData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.TRANSACTION_START:
            return updateObject(state, {
                txnData: null,
                error: null,
                loading: true,
            });

        case actionTypes.TRANSACTION_SUCCESS:
            data = action.data;
            return updateObject(state, {
                txnData: data,
                error: null,
                loading: false,
            });

        case actionTypes.TRANSACTION_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.TRANSACTION_CLEAR_DATA:
            return updateObject(state, {
                txnData: null,
                error: null,
                loading: false,
            });
        
        default:
            return state;
    }
}

export default reducer;