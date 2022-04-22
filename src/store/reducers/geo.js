import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    countryList: [],
    nationalityList: [],
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.COUNTRIES:
            data = action.data;
            return updateObject(state, {
                countryList: data,
            });

        case actionTypes.NATIONALITIES:
            data = action.data;
            return updateObject(state, {
                nationalityList: data,
            });

        default:
            return state;
    }

}

export default reducer;