import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const itemLaboratoriesSuccess = (response) => {
    return {
        type: actionTypes.ITEM_LABORATORIES,
        data: response
    };
};

export const getItemLaboratories = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'item_laboratories',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(itemLaboratoriesSuccess(response.data));
            });
    };
};

export const itemCategoriesSuccess = (response) => {
    return {
        type: actionTypes.ITEM_CATEGORIES,
        data: response
    };
};

export const getItemCategories = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'item_categories',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(itemCategoriesSuccess(response.data));
            });
    };
};

export const itemLaboratoryProceduresSuccess = (response) => {
    return {
        type: actionTypes.LABORATORY_PROCEDURES,
        data: response
    };
};

export const getLaboratoryProcedures = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'item_laboratory_procedures',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(itemLaboratoryProceduresSuccess(response.data));
            });
    };
};

export const itemLaboratoryServicesSuccess = (response) => {
    return {
        type: actionTypes.LABORATORY_SERVICES,
        data: response
    };
};

export const getLaboratoryServices = (token) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'item_laboratory_services',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };
        axiosApi(config)
            .then(response => {
                dispatch(itemLaboratoryServicesSuccess(response.data));
            });
    };
};

export const itemsStart = () => {
    return {
        type: actionTypes.ITEMS_START,
    };
};

export const itemsSuccess = (response) => {
    return {
        type: actionTypes.ITEMS_SUCCESS,
        data: response
    };
};

export const itemsConcat = (response) => {
    return {
        type: actionTypes.ITEMS_CONCAT,
        data: response
    };
};

export const itemsFail = (error) => {
    return {
        type: actionTypes.ITEMS_FAIL,
        error: error
    };
};

export const getItems = (url, token, page) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                page: page
            }
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    dispatch(itemsSuccess(response.data));
                } else {
                    dispatch(itemsConcat(response.data));
                    page++;
                    dispatch(getItems(url, token, page));
                }
            })
            .catch(error => {
                dispatch(itemsFail(error.response));

                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
}

export const getAllItems = (token) => {
    return dispatch => {
        dispatch(itemsStart());
        dispatch(getItems('items', token, 0));
    };
};

export const getAllActiveItems = (token) => {
    return dispatch => {
        dispatch(itemsStart());
        dispatch(getItems('items/active', token, 0));
    };
};

export const itemStart = () => {
    return {
        type: actionTypes.ITEM_START,
    };
};

export const itemSuccess = (response, reqType) => {
    return {
        type: actionTypes.ITEM_SUCCESS,
        data: response,
        reqType: reqType
    };
};

export const itemFail = (error) => {
    return {
        type: actionTypes.ITEM_FAIL,
        error: error
    };
};

export const saveUpdateItem = (token, itemData, reqType, closeItemModal) => {
    return dispatch => {
        dispatch(itemStart());

        let reqUrl = 'item';
        let scsMsg = "Save successfull";
        if (reqType === 'put') {
            reqUrl += "/" + itemData.itemid;
            scsMsg = "Update successfull";
        }

        const config = {
            method: reqType,
            url: reqUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: itemData
        };

        axiosApi(config)
            .then(response => {
                dispatch(itemSuccess(response.data, reqType));
                closeItemModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: scsMsg
                });
            })
            .catch(error => {
                dispatch(itemFail(error.response));

                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    };
};
