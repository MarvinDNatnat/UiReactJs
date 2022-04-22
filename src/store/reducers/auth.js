import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialUser = {
    userId: null,
    userName: null,
    userEmail: null,
    authorities: [],
}

const initialState = {
    token: null,
    tokenExpires: null,
    user: initialUser,
    error: null,
    loading: false,
    authRedirectPath: '/',
    menus: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {
                error: null,
                loading: true,
                user: initialUser,
                menus: [],
            });

        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.token,
                tokenExpires: action.expires,
                user: action.user,
                error: null,
                loading: false
            });


        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                tokenExpires: null,
                user: initialUser,
                menus: [],
            });

        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {
                authRedirectPath: action.path
            });

        case actionTypes.USER_MENUS:
            return updateObject(state, {
                menus: action.data
            });

        default:
            return state;
    }
}

export default reducer;