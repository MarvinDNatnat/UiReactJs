import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    transactionList: [],
    onHoldList: [],
    error: null,
    loading: false,
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
    pendingList: [],
    pendingListlLessThan3Days: [],
    pendingListOverThan3Days: [],
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.TRANSLIST_CLEAR:
            return updateObject(state, {
                transactionList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.TRANSLIST_START:
            return updateObject(state, {
                transactionList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.TRANSLIST_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                transactionList: state.transactionList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.TRANSLIST_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                transactionList: state.transactionList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.TRANSLIST_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.ONHOLD_TRANS_CLEAR:
            return updateObject(state, {
                onHoldList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.ONHOLD_TRANS_START:
            return updateObject(state, {
                onHoldList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.ONHOLD_TRANS_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                onHoldList: state.onHoldList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.ONHOLD_TRANS_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                onHoldList: state.onHoldList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.ONHOLD_TRANS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.EXPORT_START:
            return updateObject(state, {
                error: null,
                loading: true,
            });

        case actionTypes.EXPORT_SUCCESS:
            return updateObject(state, {
                error: null,
                loading: false,
            });

        case actionTypes.EXPORT_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.LAB_PENDING_CLEAR:
            return updateObject(state, {
                pendingList: [],
            });

        case actionTypes.LAB_PENDING_START:
            return updateObject(state, {
                pendingList: [],
                error: null,
                loading: true,
            });

        case actionTypes.LAB_PENDING_SUCCESS:
            data = action.data;
            return updateObject(state, {
                pendingList: state.pendingList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.LAB_PENDING_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.LAB_PENDING_CLEAR_Less3Days:
            return updateObject(state, {
                pendingListlLessThan3Days: [],
            });

        case actionTypes.LAB_PENDING_START_Less3Days:
            return updateObject(state, {
                pendingListlLessThan3Days: [],
                error: null,
            });

        case actionTypes.LAB_PENDING_SUCCESS_Less3Days:
            data = action.data;
            return updateObject(state, {
                pendingListlLessThan3Days: state.pendingListlLessThan3Days.concat(data),
                error: null,
            });

        case actionTypes.LAB_PENDING_FAIL_Less3Days:
            return updateObject(state, {
                error: action.error,
            });

            case actionTypes.LAB_PENDING_CLEAR_Over3Days:
            return updateObject(state, {
                pendingListOverThan3Days: [],
            });

        case actionTypes.LAB_PENDING_START_Over3Days:
            return updateObject(state, {
                pendingListOverThan3Days: [],
                error: null,
                loading: true,
            });

        case actionTypes.LAB_PENDING_SUCCESS_Over3Days:
            data = action.data;
            return updateObject(state, {
                pendingListOverThan3Days: state.pendingListOverThan3Days.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.LAB_PENDING_FAIL_Over3Days:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });
        default:
            return state;
    }
}

export default reducer;