import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const initialState = {
    corporateList: [],
    error: null,
    loading: false,
    corporateData: null,
};

const reducer = (state = initialState, action) => {
    let data = null;
    switch (action.type) {
        case actionTypes.CORPORATES_START:
            return updateObject(state, {
                corporateList: [],
                error: null,
                loading: true,
            });

        case actionTypes.CORPORATES_SUCCESS:
            data = action.data;
            return updateObject(state, {
                corporateList: state.corporateList.concat(data),
                error: null,
                loading: false
            });

        case actionTypes.CORPORATES_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        case actionTypes.CORPORATE_START:
            return updateObject(state, {
                corporateData: null,
                error: null,
                loading: true,
            });

        case actionTypes.CORPORATE_SUCCESS:
            data = action.data;
            const corporateDataList = [...state.corporateList];
            if (action.reqType === 'post') {
                corporateDataList.push(data);
            } else if (action.reqType === 'put') {
                const corpIndex = corporateDataList.findIndex(corp => corp.corporateid === data.corporateid);
                if (corpIndex >= 0) {
                    corporateDataList[corpIndex] = data;
                }
            }
            return updateObject(state, {
                corporateData: data,
                error: null,
                loading: false,
                corporateList: corporateDataList
            });


        case actionTypes.CORPORATE_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false,
            });

        default:
            return state;
    }

}

export default reducer;