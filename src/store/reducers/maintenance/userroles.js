import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    roleList: [],
    menuList:[],
    error: null,
    loading: false,
    roleData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.MENU_LIST:
            data = action.data;
            return updateObject(state, {
                menuList: data,
            });

        case actionTypes.USER_ROLES_START:
            return updateObject(state, {
                roleList: [],
                error: null,
                loading: true,
            });

        case actionTypes.USER_ROLES_SUCCESS:
            data = action.data;
            return updateObject(state, {
                roleList: state.roleList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.USER_ROLES_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.USER_ROLE_START:
            return updateObject(state, {
                roleData: null,
                error: null,
                loading: true,
            });

        case actionTypes.USER_ROLE_SUCCESS:
            data = action.data;
            const roleDataList = [...state.roleList];
            if (action.reqType === 'post') {
                roleDataList.push(data);
            } else if (action.reqType === 'put') {
                const roleIndex = roleDataList.findIndex(rle => rle.id === data.id);
                if (roleIndex >= 0) {
                    roleDataList[roleIndex] = data;
                }
            }
            return updateObject(state, {
                roleData: data,
                error: null,
                loading: false,
                roleList: roleDataList
            });

        case actionTypes.USER_ROLE_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;