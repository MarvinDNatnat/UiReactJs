import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    xrayList: [],
    peList: [],
    usList: [],
    e2dList: [],
    ecgList: [],
    error: null,
    loading: false,
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        // XRAY
        case actionTypes.LAB_XR_CLEAR_LIST:
            return updateObject(state, {
                xrayList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_XR_START:
            return updateObject(state, {
                xrayList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_XR_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                xrayList: state.xrayList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_XR_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                xrayList: state.xrayList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_XR_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // PHYSICAL EXAM
        case actionTypes.LAB_PE_CLEAR_LIST:
            return updateObject(state, {
                peList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_PE_START:
            return updateObject(state, {
                peList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_PE_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                peList: state.peList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_PE_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                peList: state.peList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_PE_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // ULTRASOUND
        case actionTypes.LAB_US_CLEAR_LIST:
            return updateObject(state, {
                usList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_US_START:
            return updateObject(state, {
                usList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_US_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                usList: state.usList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_US_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                usList: state.usList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_US_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // 2D ECHO
        case actionTypes.LAB_E2D_CLEAR_LIST:
            return updateObject(state, {
                e2dList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_E2D_START:
            return updateObject(state, {
                e2dList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_E2D_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                e2dList: state.e2dList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_E2D_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                e2dList: state.e2dList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_E2D_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // ELECTROCARDIOGRAM
        case actionTypes.LAB_ECG_CLEAR_LIST:
            return updateObject(state, {
                ecgList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_ECG_START:
            return updateObject(state, {
                ecgList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_ECG_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                ecgList: state.ecgList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_ECG_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                ecgList: state.ecgList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_ECG_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;