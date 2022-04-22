import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    referenceLaboratoryList: [],
    error: null,
    loading: false,
    userData: null,
    authUserData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.REFERENCE_LABORATORY_START:
            return updateObject(state, {
                referenceLaboratoryList: [],
                error: null,
                loading: true,
            });

        // case actionTypes.REFERENCE_LABORATORY_CONCAT:
        //     data = action.data;
        //     return updateObject(state, {
        //         referenceLaboratoryList: state.referenceLaboratoryList.concat(data),
        //     });

        case actionTypes.REFERENCE_LABORATORY_SUCCESS:
            data = action.data;
            return updateObject(state, {
                referenceLaboratoryList: state.referenceLaboratoryList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.REFERENCE_LABORATORY_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;

    }
}
export default reducer;