import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    error: null,
    loading: false,
    eodData: null,
    eodSummary: null,
    eodList: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.CASHIER_EOD_START:
        case actionTypes.AUDITOR_EOD_START:
            return updateObject(state, {
                eodData: null,
                eodSummary: null,
                eodList: null,
                error: null,
                loading: true,
            });

        case actionTypes.CASHIER_EOD_FAIL:
        case actionTypes.AUDITOR_EOD_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.CASHIER_EOD_CLEAR_DATA:
        case actionTypes.AUDITOR_EOD_CLEAR_DATA:
            return updateObject(state, {
                eodData: null,
                eodSummary: null,
                eodList: null,
                error: null,
                loading: false,
            });

        case actionTypes.CASHIER_EOD_SUCCESS:
            data = action.data;
            return updateObject(state, {
                eodData: data,
                eodSummary: data.summary,
                eodList: {
                    accounts: data.accounts,
                    ape: data.ape,
                    medicalMission: data.medicalMission,
                    medicalService: data.medicalService,
                    hmo: data.hmo,
                    hold: data.hold,
                    refund: data.refund,
                    bank: data.bank,
                    virtual: data.virtual,
                    reportList: data.denomination
                },
                error: null,
                loading: false,
            });


        case actionTypes.AUDITOR_EOD_SUCCESS:
            data = action.data;
            return updateObject(state, {
                eodData: data,
                eodSummary: data.summary,
                eodList: {
                    cash: data.cash,
                    accounts: data.accounts,
                    ape: data.ape,
                    medicalMission: data.medicalMission,
                    medicalService: data.medicalService,
                    hmo: data.hmo,
                    hold: data.hold,
                    refund: data.refund,
                    bank: data.bank,
                    virtual: data.virtual,
                    reportList: data.denomination
                },
                error: null,
                loading: false,
            });

        case actionTypes.AUDITOR_EOD_EXCEL_START:
            return updateObject(state, {
                error: null,
                loading: true,
            });

        case actionTypes.AUDITOR_EOD_EXCEL_SUCCESS:
            return updateObject(state, {
                error: null,
                loading: false,
            });

        case actionTypes.AUDITOR_EOD_EXCEL_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }
}

export default reducer;        