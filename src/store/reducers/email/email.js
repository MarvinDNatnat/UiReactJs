import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    error: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EMAIL_START:
            return updateObject(state, {
                error: null,
                loading: true,
            });

        case actionTypes.EMAIL_SUCCESS:
            return updateObject(state, {
                error: null,
                loading: false,
            });

        case actionTypes.EMAIL_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;