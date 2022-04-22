import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';


const initialState = {
    error: null,
    loading: false,
    sendOutList: [],
    sopList: [],
    paymentList: [],
    summaryList: [],
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
    soaData: null,
    paymentData: null,
    sopListLoading: false,
    unbilledListLoading: false,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.SOP_START:
            return updateObject(state, {
                sendOutList: [],
                error: null,
                unbilledListLoading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.SOP_CLEAR:
            return updateObject(state, {
                sendOutList: [],
                error: null,
            });

        case actionTypes.SOP_SUCCESS:
            data = action.data;
            return updateObject(state, {
                sendOutList: state.sendOutList.concat(data),
                error: null,
                unbilledListLoading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.SOP_FAIL:
            return updateObject(state, {
                error: action.error,
                unbilledListLoading: false,
            });

        case actionTypes.SOP_LIST_START:
            return updateObject(state, {
                sopList: [],
                error: null,
                sopListLoading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.SOP_LIST_CLEAR:
            return updateObject(state, {
                sopList: [],
                error: null,
            });

        case actionTypes.SOP_LIST_SUCCESS:
            data = action.data;
            return updateObject(state, {
                sopList: state.sopList.concat(data),
                error: null,
                sopListLoading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.SOP_LIST_FAIL:
            return updateObject(state, {
                error: action.error,
                sopListLoading: false,
            });

        case actionTypes.SOP_PAYMENT_LIST_START:
            return updateObject(state, {
                paymentList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.SOP_PAYMENT_LIST_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                paymentList: state.paymentList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.SOP_PAYMENT_LIST_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                paymentList: state.paymentList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.SOP_PAYMENT_LIST_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.SOP_LOADING_START:
            return updateObject(state, {
                error: null,
                loading: true,
            });

        case actionTypes.SOP_LOADING_SUCCESS:
            return updateObject(state, {
                error: null,
                loading: false,
            });

        case actionTypes.SOP_LOADING_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.SOP_SUMMARY_CLEAR:
            return updateObject(state, {
                summaryList: [],
                error: null,
                loading: false,
            });

        case actionTypes.SOP_SUMMARY_START:
            return updateObject(state, {
                summaryList: [],
                error: null,
                loading: true,
            });

        case actionTypes.SOP_SUMMARY_SUCCESS:
            data = action.data;
            return updateObject(state, {
                summaryList: state.summaryList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.SOP_SUMMARY_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;