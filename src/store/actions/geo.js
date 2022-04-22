import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';

export const countriesSuccess = (response) => {
    return {
        type: actionTypes.COUNTRIES,
        data: response
    };
};

export const getAllCountries = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'countries',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(countriesSuccess(response.data));
            });
    };
};

export const nationalitiesSuccess = (response) => {
    return {
        type: actionTypes.NATIONALITIES,
        data: response
    };
};

export const getAllNationalities = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'nationalities',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(nationalitiesSuccess(response.data));
            });
    };
};
