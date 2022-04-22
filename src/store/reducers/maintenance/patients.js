import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    patientList: [],
    patientListByDate: [],
    error: null,
    loading: false,
    patientData: null,
    currentPage: 0,
    totalPage: 0,
    totalElements: 0,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.PATIENTS_START:
            return updateObject(state, {
                patientList: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.PATIENTS_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                patientList: state.patientList.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.PATIENTS_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                patientList: state.patientList.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.PATIENTS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.PATIENT_START:
            return updateObject(state, {
                patientData: null,
                error: null,
                loading: true,
            });

        case actionTypes.PATIENT_SUCCESS:
            data = action.data;
            const patientDataList = [...state.patientList];
            if (action.reqType === 'post') {
                patientDataList.push(data);
            } else if (action.reqType === 'put') {
                const patientIndex = patientDataList.findIndex(pck => pck.patientid === data.patientid);
                if (patientIndex >= 0) {
                    patientDataList[patientIndex] = data;
                }
            }
            return updateObject(state, {
                patientData: data,
                error: null,
                loading: false,
                patientList: patientDataList
            });

        case actionTypes.PATIENT_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });


            case actionTypes.PATIENTS_DATE_START:
            return updateObject(state, {
                patientListByDate: [],
                error: null,
                loading: true,
                currentPage: 0,
                totalPage: 0,
                totalElements: 0,
            });

        case actionTypes.PATIENTS_DATE_CONCAT:
            data = action.data.content;
            return updateObject(state, {
                patientListByDate: state.patientListByDate.concat(data),
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.PATIENTS_DATE_SUCCESS:
            data = action.data.content;
            return updateObject(state, {
                patientListByDate: state.patientListByDate.concat(data),
                error: null,
                loading: false,
                currentPage: action.data.number,
                totalPage: action.data.totalPages,
                totalElements: action.data.totalElements,
            });

        case actionTypes.PATIENTS_DATE_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });
        default:
            return state;
    }
}

export default reducer;