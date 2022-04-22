import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    sidebarShow: 'responsive'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SIDEBAR:
            return updateObject(state, {
                sidebarShow: action.sidebarShow,
            });

        default:
            return state;
    }
}

export default reducer;