import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    userList: [],
    userInfoList: [],
    error: null,
    loading: false,
    roleList: [],
    userData: null,
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
    authUserData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.USERS_START:
            return updateObject(state, {
                userList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.USERS_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                userList: state.userList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.USERS_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                userList: state.userList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.USERS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.USER_ROLES:
            data = action.data;
            return updateObject(state, {
                roleList: data,
            });

        case actionTypes.USER_START:
            return updateObject(state, {
                userData: null,
                error: null,
                loading: true,
            });

        case actionTypes.USER_SUCCESS:
            data = action.data;
            const userDataList = [...state.userList];
            if (action.reqType === 'post') {
                userDataList.concat(data);
            } else if (action.reqType === 'put') {
                const userIndex = userDataList.findIndex(user => user.userid === data.userid);
                if (userIndex >= 0) {
                    userDataList[userIndex] = data;
                }
            }
            return updateObject(state, {
                userData: data,
                error: null,
                loading: false,
                userList: userDataList
            });


        case actionTypes.USER_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.AUTH_USER_START:
            return updateObject(state, {
                authUserData: null,
                error: null,
                loading: true,
            });

        case actionTypes.AUTH_USER_SUCCESS:
            data = action.data;
            return updateObject(state, {
                authUserData: data,
                error: null,
                loading: false,
            });


        case actionTypes.AUTH_USER_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.USERS_INFO_START:
            return updateObject(state, {
                userInfoList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.USERS_INFO_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                userInfoList: state.userInfoList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.USERS_INFO_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                userInfoList: state.userInfoList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.USERS_INFO_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;