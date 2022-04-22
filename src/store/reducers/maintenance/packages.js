import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    packageList: [],
    error: null,
    loading: false,
    packageTypes: [],
    packageData: null,
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.PACKAGES_TYPES:
            data = action.data;
            return updateObject(state, {
                packageTypes: data,
            });

        case actionTypes.PACKAGES_START:
            return updateObject(state, {
                packageList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.PACKAGES_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                packageList: state.packageList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.PACKAGES_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                packageList: state.packageList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.PACKAGES_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.PACKAGE_START:
            return updateObject(state, {
                packageData: null,
                error: null,
                loading: true,
            });

        case actionTypes.PACKAGE_SUCCESS:
            data = action.data;
            const packageDataList = [...state.packageList];
            if (action.reqType === 'post') {
                packageDataList.push(data);
            } else if (action.reqType === 'put') {
                const packageIndex = packageDataList.findIndex(pck => pck.packageid === data.packageid);
                if (packageIndex >= 0) {
                    packageDataList[packageIndex] = data;
                }
            }
            return updateObject(state, {
                packageData: data,
                error: null,
                loading: false,
                packageList: packageDataList
            });

        case actionTypes.PACKAGE_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;