import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    error: null,
    loading: false,
    loadingPayment: false,
    unbilledList: [],
    soaList: [],
    paymentList: [],
    summaryList: [],
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
    soaData: null,
    paymentData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.SOA_SUMMARY_REPORT_START:
            return updateObject(state, {
                loading: true,
            });
        case actionTypes.SOA_SUMMARY_REPORT_SUCCESS:
            return updateObject(state, {
                loading: false,
            });
        case actionTypes.SOA_SUMMARY_REPORT_FAIL:
            return updateObject(state, {
                loading: false,
            });

        case actionTypes.AUDITOR_SOA_CLEAR_DATA:
            return updateObject(state, {
                txnData: null,
                error: null,
                loading: false,
                unbilledList: [],
                soaList: [],
                paymentList: [],
                summaryList: [],
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
                soaData: null,
                paymentData: null,
            });

        case actionTypes.AUDITOR_SOA_UNBILLED_CLEAR:
            return updateObject(state, {
                unbilledList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });


        case actionTypes.AUDITOR_SOA_UNBILLED_START:
            return updateObject(state, {
                unbilledList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.AUDITOR_SOA_UNBILLED_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                unbilledList: state.unbilledList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.AUDITOR_SOA_UNBILLED_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                unbilledList: state.unbilledList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.AUDITOR_SOA_UNBILLED_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.AUDITOR_SOA_START:
            return updateObject(state, {
                soaData: null,
                error: null,
                loading: true,
            });

        case actionTypes.AUDITOR_SOA_SUCCESS:
            data = action.data;
            return updateObject(state, {
                soaData: data,
                error: null,
                loading: false,
            });

        case actionTypes.AUDITOR_SOA_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.PAYMENT_SOA_START:
            return updateObject(state, {
                paymentData: null,
                error: null,
                loading: true,
            });

        case actionTypes.PAYMENT_SOA_SUCCESS:
            data = action.data;
            return updateObject(state, {
                paymentData: data,
                error: null,
                loading: false,
            });

        case actionTypes.PAYMENT_SOA_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.CHARGETO_SOA_CLEAR:
            return updateObject(state, {
                soaList: [],
                error: null,
                loading: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.CHARGETO_SOA_START:
            return updateObject(state, {
                soaList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.CHARGETO_SOA_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                soaList: state.soaList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.CHARGETO_SOA_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                soaList: state.soaList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.CHARGETO_SOA_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.SOA_LOADING_START:
            return updateObject(state, {
                error: null,
                loading: true,
            });

        case actionTypes.SOA_LOADING_SUCCESS:
            return updateObject(state, {
                error: null,
                loading: false,
            });

        case actionTypes.SOA_LOADING_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });


        case actionTypes.SOA_PAYMENT_CLEAR:
            return updateObject(state, {
                paymentList: [],
                error: null,
                loadingPayment: false,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.SOA_PAYMENT_START:
            return updateObject(state, {
                paymentList: [],
                error: null,
                loadingPayment: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.SOA_PAYMENT_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                paymentList: state.paymentList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.SOA_PAYMENT_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                paymentList: state.paymentList.concat(data),
                error: null,
                loadingPayment: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.SOA_PAYMENT_FAIL:
            return updateObject(state, {
                error: action.error,
                loadingPayment: false,
            });

        case actionTypes.SOA_SUMMARY_CLEAR:
            return updateObject(state, {
                summaryList: [],
                error: null,
                loading: false,
            });

        case actionTypes.SOA_SUMMARY_START:
            return updateObject(state, {
                summaryList: [],
                error: null,
                loading: true,
            });

        case actionTypes.SOA_SUMMARY_SUCCESS:
            data = action.data;
            return updateObject(state, {
                summaryList: state.summaryList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.SOA_SUMMARY_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });


        default:
            return state;
    }
}

export default reducer;