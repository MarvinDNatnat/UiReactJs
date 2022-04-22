import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    cMicroscopyList: [],
    microbiologyList: [],
    bacteriologyList: [],
    hematologyList: [],
    chemistryList: [],
    serologyList: [],
    toxicologyList: [],
    industrialList: [],
    nurseList: [],
    txnSrvList: [],
    error: null,
    loading: false,
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
    markers: [],
    markersInventory: [],
};


const reducer = (state = initialState, action) => {

    let data = null;
    switch (action.type) {
        //EXCEL CUPMEDAR
        case actionTypes.CUPMEDAR_START:
            return updateObject(state, {
                error: null,
                loading: true,
            });

        case actionTypes.CUPMEDAR_SUCCESS:
            return updateObject(state, {
                error: null,
                loading: false,
            });

        case actionTypes.CUPMEDAR_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // CLINICAL MICROSCOPY
        case actionTypes.LAB_CM_CLEAR_LIST:
            return updateObject(state, {
                cMicroscopyList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_CM_START:
            return updateObject(state, {
                cMicroscopyList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_CM_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                cMicroscopyList: state.cMicroscopyList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_CM_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                cMicroscopyList: state.cMicroscopyList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_CM_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // MICROBIOLOGY
        case actionTypes.LAB_MB_CLEAR_LIST:
            return updateObject(state, {
                microbiologyList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_MB_START:
            return updateObject(state, {
                microbiologyList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_MB_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                microbiologyList: state.microbiologyList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_MB_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                microbiologyList: state.microbiologyList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_MB_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // HEMATOLOGY
        case actionTypes.LAB_HE_CLEAR_LIST:
            return updateObject(state, {
                hematologyList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_HE_START:
            return updateObject(state, {
                hematologyList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_HE_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                hematologyList: state.hematologyList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_HE_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                hematologyList: state.hematologyList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_HE_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // CHEMISTRY
        case actionTypes.LAB_CH_CLEAR_LIST:
            return updateObject(state, {
                chemistryList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_CH_START:
            return updateObject(state, {
                chemistryList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_CH_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                chemistryList: state.chemistryList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_CH_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                chemistryList: state.chemistryList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_CH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // SEROLOGY
        case actionTypes.LAB_SE_CLEAR_LIST:
            return updateObject(state, {
                serologyList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_SE_START:
            return updateObject(state, {
                serologyList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_SE_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                serologyList: state.serologyList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_SE_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                serologyList: state.serologyList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_SE_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // TOXICOLOGY
        case actionTypes.LAB_TO_CLEAR_LIST:
            return updateObject(state, {
                toxicologyList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_TO_START:
            return updateObject(state, {
                toxicologyList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_TO_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                toxicologyList: state.toxicologyList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_TO_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                toxicologyList: state.toxicologyList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_TO_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // INDUSTRIAL
        case actionTypes.LAB_IND_CLEAR_LIST:
            return updateObject(state, {
                industrialList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_IND_START:
            return updateObject(state, {
                industrialList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_IND_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                industrialList: state.industrialList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_IND_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                industrialList: state.industrialList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_IND_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // NURSE
        case actionTypes.LAB_NRS_CLEAR_LIST:
            return updateObject(state, {
                nurseList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_NRS_START:
            return updateObject(state, {
                nurseList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_NRS_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                nurseList: state.nurseList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_NRS_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                nurseList: state.nurseList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_NRS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        // TRANSACTION SERVICES
        case actionTypes.LAB_TXN_CLEAR_LIST:
            return updateObject(state, {
                txnSrvList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_TXN_START:
            return updateObject(state, {
                txnSrvList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.LAB_TXN_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                markers: state.markers.concat(data),
                txnSrvList: state.txnSrvList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_TXN_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                markers: state.markers.concat(data),
                txnSrvList: state.txnSrvList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.LAB_TXN_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.MARKER_START:
            return updateObject(state, {
                markers: [],
                error: null,
                loading: true,
            });

        case actionTypes.MARKER_SUCCESS:
            data = action.data;
            return updateObject(state, {
                markers: state.markers.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.MARKER_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.MARKER_INVENTORY_START:
            return updateObject(state, {
                markersInventory: [],
                error: null,
                loading: true,
            });

        case actionTypes.MARKER_INVENTORY_SUCCESS:
            data = action.data;
            return updateObject(state, {
                markersInventory: state.markers.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.MARKER_INVENTORY_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }

}

export default reducer;