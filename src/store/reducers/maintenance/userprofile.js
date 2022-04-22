import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    userProfile: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.USER_PROFILE:
            data = action.data;
            return updateObject(state, {
                userProfile: data,
            });

        case actionTypes.USER_PROFILE_CLEAR:
            return updateObject(state, {
                userProfile: null
            });

        default:
            return state;
    }
}

export default reducer;