import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    doctorList: [],
    error: null,
    loading: false,
    doctorData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.DOCTORS_START:
            return updateObject(state, {
                doctorList: [],
                error: null,
                loading: true,
            });

        case actionTypes.DOCTORS_SUCCESS:
            data = action.data;
            return updateObject(state, {
                doctorList: state.doctorList.concat(data),
                error: null,
                loading: false,
            });

        case actionTypes.DOCTORS_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.DOCTOR_START:
            return updateObject(state, {
                doctorData: null,
                error: null,
                loading: true,
            });

        case actionTypes.DOCTOR_SUCCESS:
            data = action.data;
            const doctorDataList = [...state.doctorList];
            if (action.reqType === 'post') {
                doctorDataList.push(data);
            } else if (action.reqType === 'put') {
                const doctorIndex = doctorDataList.findIndex(doc => doc.doctorid === data.doctorid);
                if (doctorIndex >= 0) {
                    doctorDataList[doctorIndex] = data;
                }
            }
            return updateObject(state, {
                doctorData: data,
                error: null,
                loading: false,
                doctorList: doctorDataList
            });

        case actionTypes.DOCTOR_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }

}

export default reducer;