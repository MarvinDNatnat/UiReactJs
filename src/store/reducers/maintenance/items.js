import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    itemList: [],
    error: null,
    loading: false,
    itemLaboratories: [],
    itemCategories: [],
    laboratoryProcedures: [],
    laboratoryServices: [],
    itemData: null,
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
    specificTest: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.ITEM_CATEGORIES:
            data = action.data;
            return updateObject(state, {
                itemCategories: data,
            });

        case actionTypes.ITEM_LABORATORIES:
            data = action.data;
            return updateObject(state, {
                itemLaboratories: data,
            });

        case actionTypes.LABORATORY_PROCEDURES:
            data = action.data;
            return updateObject(state, {
                laboratoryProcedures: data,
            });

        case actionTypes.LABORATORY_SERVICES:
            data = action.data;
            return updateObject(state, {
                laboratoryServices: data,
            });

        case actionTypes.ITEMS_START:
            return updateObject(state, {
                itemList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.ITEMS_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                itemList: state.itemList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.ITEMS_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                itemList: state.itemList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.ITEMS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.ITEM_START:
            return updateObject(state, {
                itemData: null,
                error: null,
                loading: true,
            });

        case actionTypes.ITEM_SUCCESS:
            data = action.data;
            const itemDataList = [...state.itemList];
            if (action.reqType === 'post') {
                itemDataList.push(data);
            } else if (action.reqType === 'put') {
                const itemIndex = itemDataList.findIndex(item => item.itemid === data.itemid);
                if (itemIndex >= 0) {
                    itemDataList[itemIndex] = data;
                }
            }
            return updateObject(state, {
                itemData: data,
                error: null,
                loading: false,
                itemList: itemDataList
            });

        case actionTypes.ITEM_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;