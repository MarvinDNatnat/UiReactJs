import * as actionTypes from 'src/store/actions/actionTypes';
import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
import { updateObject } from 'src/store/utility';

export const laboratoryStart = (procedure) => {
    let actTyp = null;
    switch (procedure) {
        case 'CM': // CLINICAL MICROSCOPY
            actTyp = actionTypes.LAB_CM_START;
            break;

        case 'HE': // HEMATOLOGY
            actTyp = actionTypes.LAB_HE_START;
            break;

        case 'CH': // CHEMISTRY
            actTyp = actionTypes.LAB_CH_START;
            break;

        case 'SE': // SEROLOGY
            actTyp = actionTypes.LAB_SE_START;
            break;

        case 'TO': // TOXICOLOGY
            actTyp = actionTypes.LAB_TO_START;
            break;

        case 'MB': // MICROBIOLOGY
            actTyp = actionTypes.LAB_MB_START;
            break;

        case 'BT': // BACTERIOLOGY
            actTyp = actionTypes.LAB_BT_START;
            break;

        case 'CUPMEDAR': // EXCEL CUPMEDAR
            actTyp = actionTypes.CUPMEDAR_START;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
    };
};

export const laboratorySuccess = (response, procedure) => {
    let actTyp = null;
    switch (procedure) {
        case 'CM': // CLINICAL MICROSCOPY
            actTyp = actionTypes.LAB_CM_SUCCESS;
            break;

        case 'HE': // HEMATOLOGY
            actTyp = actionTypes.LAB_HE_SUCCESS;
            break;

        case 'CH': // CHEMISTRY
            actTyp = actionTypes.LAB_CH_SUCCESS;
            break;

        case 'SE': // SEROLOGY
            actTyp = actionTypes.LAB_SE_SUCCESS;
            break;

        case 'TO': // TOXICOLOGY
            actTyp = actionTypes.LAB_TO_SUCCESS;
            break;

        case 'MB': // MICROBIOLOGY
            actTyp = actionTypes.LAB_MB_SUCCESS;
            break;

        case 'BT': // BACTERIOLOGY
            actTyp = actionTypes.LAB_BT_SUCCESS;
            break;

        case 'CUPMEDAR': // EXCEL CUPMEDAR
            actTyp = actionTypes.CUPMEDAR_SUCCESS;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
        data: response
    };
};

export const laboratoryConcat = (response, procedure) => {
    let actTyp = null;
    switch (procedure) {
        case 'CM': // CLINICAL MICROSCOPY
            actTyp = actionTypes.LAB_CM_CONCAT;
            break;

        case 'HE': // HEMATOLOGY
            actTyp = actionTypes.LAB_HE_CONCAT;
            break;

        case 'CH': // CHEMISTRY
            actTyp = actionTypes.LAB_CH_CONCAT;
            break;

        case 'SE': // SEROLOGY
            actTyp = actionTypes.LAB_SE_CONCAT;
            break;

        case 'TO': // TOXICOLOGY
            actTyp = actionTypes.LAB_TO_CONCAT;
            break;

        case 'MB': // MICROBIOLOGY
            actTyp = actionTypes.LAB_MB_CONCAT;
            break;

        case 'BT': // BACTERIOLOGY
            actTyp = actionTypes.LAB_MB_CONCAT;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
        data: response
    };
};

export const laboratoryFail = (error, procedure) => {
    let actTyp = null;
    switch (procedure) {
        case 'CM': // CLINICAL MICROSCOPY
            actTyp = actionTypes.LAB_CM_FAIL;
            break;

        case 'HE': // HEMATOLOGY
            actTyp = actionTypes.LAB_HE_FAIL;
            break;

        case 'CH': // CHEMISTRY
            actTyp = actionTypes.LAB_CH_FAIL;
            break;

        case 'SE': // SEROLOGY
            actTyp = actionTypes.LAB_SE_FAIL;
            break;

        case 'TO': // TOXICOLOGY
            actTyp = actionTypes.LAB_TO_FAIL;
            break;

        case 'MB': // MICROBIOLOGY
            actTyp = actionTypes.LAB_MB_FAIL;
            break;

        case 'BT': // BACTERIOLOGY
            actTyp = actionTypes.LAB_BT_FAIL;
            break;

        case 'CUPMEDAR': // EXCEL CUPMEDAR
            actTyp = actionTypes.CUPMEDAR_FAIL;
            break;

        default:
            break;
    }
    return {
        type: actTyp,
        error: error
    };
};

export const getLaboratoryRequests = (token, params, procedure) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/laboratory_services',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: params,
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    if (response.data.totalElements <= 0) {
                        Toast.fire({
                            icon: 'info',
                            title: 'No records found.'
                        });
                    }
                    dispatch(laboratorySuccess(response.data, procedure));
                } else {
                    dispatch(laboratoryConcat(response.data, procedure));
                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getLaboratoryRequests(token, newParam, procedure));
                }
            })
            .catch(error => {
                dispatch(laboratoryFail(error.response, procedure));

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

export const getLaboratoryServiceRequests = (token, procedure, dateTimeFrom, dateTimeTo, branchId = null, chargeTo = null) => {
    return dispatch => {
        dispatch(laboratoryStart(procedure));
        dispatch(getLaboratoryRequests(token,
            {
                page: 0,
                dateTimeFrom: dateTimeFrom,
                dateTimeTo: dateTimeTo,
                procedure: procedure,
                branchId: branchId,
                chargeTo: chargeTo,
            }, procedure));
    };
};


export const txnLaboratoriesStart = (listType) => {
    let lstTyp = null;
    switch (listType) {
        case 'IND': // INDUSTRIAL
            lstTyp = actionTypes.LAB_IND_START;
            break;

        case 'NRS': // NURSE
            lstTyp = actionTypes.LAB_NRS_START;
            break;

        case 'TXN': // TRANSCTION SERVICES
            lstTyp = actionTypes.LAB_TXN_START;
            break;

        default:
            break;
    }
    return {
        type: lstTyp,
    };
};

export const txnLaboratoriesSuccess = (response, listType) => {
    let lstTyp = null;
    switch (listType) {
        case 'IND': // INDUSTRIAL
            lstTyp = actionTypes.LAB_IND_SUCCESS;
            break;

        case 'NRS': // NURSE
            lstTyp = actionTypes.LAB_NRS_SUCCESS;
            break;

        case 'TXN': // TRANSCTION SERVICES
            lstTyp = actionTypes.LAB_TXN_SUCCESS;
            break;

        default:
            break;
    }
    return {
        type: lstTyp,
        data: response
    };
};

export const txnLaboratoriesConcat = (response, listType) => {
    let lstTyp = null;
    switch (listType) {
        case 'IND': // INDUSTRIAL
            lstTyp = actionTypes.LAB_IND_CONCAT;
            break;

        case 'NRS': // NURSE
            lstTyp = actionTypes.LAB_NRS_CONCAT;
            break;

        case 'TXN': // TRANSCTION SERVICES
            lstTyp = actionTypes.LAB_TXN_CONCAT;
            break;

        default:
            break;
    }
    return {
        type: lstTyp,
        data: response
    };
};

export const txnLaboratoriesFail = (error, listType) => {
    let lstTyp = null;
    switch (listType) {
        case 'IND': // INDUSTRIAL
            lstTyp = actionTypes.LAB_IND_FAIL;
            break;

        case 'NRS': // NURSE
            lstTyp = actionTypes.LAB_NRS_FAIL;
            break;

        case 'TXN': // TRANSCTION SERVICES
            lstTyp = actionTypes.LAB_TXN_FAIL;
            break;

        default:
            break;
    }
    return {
        type: lstTyp,
        error: error
    };
};

export const getTxnLaboratoriesRequests = (token, listType, params) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/laboratories',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: params,
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    if (response.data.totalElements <= 0) {
                        Toast.fire({
                            icon: 'info',
                            title: 'No records found.'
                        });
                    }
                    dispatch(txnLaboratoriesSuccess(response.data, listType));
                } else {
                    dispatch(txnLaboratoriesConcat(response.data, listType));
                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getTxnLaboratoriesRequests(token, listType, newParam));
                }
            })
            .catch(error => {
                dispatch(txnLaboratoriesFail(error.response, listType));

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

export const getTransactionLaboratoriesRequests = (token, listType, dateTimeFrom, dateTimeTo, params = {}) => {
    return dispatch => {
        dispatch(txnLaboratoriesStart(listType));
        dispatch(getTxnLaboratoriesRequests(token, listType,
            {
                page: 0,
                dateTimeFrom: dateTimeFrom,
                dateTimeTo: dateTimeTo,
                ...params
            }
        ));
    };
};

export const markerStart = () => {
    return {
        type: actionTypes.MARKER_START,
    };
};

export const markerSuccess = (response) => {
    return {
        type: actionTypes.MARKER_SUCCESS,
        data: response
    };
};

export const markerFail = (error) => {
    return {
        type: actionTypes.MARKER_FAIL,
        error: error
    };
};

export const getMarker = (token, dateTimeFrom, dateTimeTo) => {
    return dispatch => {
        dispatch(markerStart());
        const parameters = {
        }
        parameters.dateTimeFrom = dateTimeFrom;
        parameters.dateTimeTo = dateTimeTo;
        const config = {
            method: 'get',
            url: 'transactions/markers',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: parameters
        };

        axiosApi(config)
            .then(response => {
                dispatch(markerSuccess(response.data));
            })
            .catch(error => {
                dispatch(markerFail());
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


export const markerInventoryStart = () => {
    return {
        type: actionTypes.MARKER_INVENTORY_START,
    };
};

export const markerInventorySuccess = (response) => {
    return {
        type: actionTypes.MARKER_INVENTORY_SUCCESS,
        data: response
    };
};

export const markerInventoryFail = (error) => {
    return {
        type: actionTypes.MARKER_INVENTORY_FAIL,
        error: error
    };
};

export const getMarkerInventory = (token) => {
    return dispatch => {
        dispatch(markerInventoryStart());
        const config = {
            method: 'get',
            url: 'transactions/markers_Inventory',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(markerInventorySuccess(response.data));
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                dispatch(markerInventoryFail());
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
}

export const saveFilmInventory = (token, filmValues, closeModal) => {
    return dispatch => {
        const config = {
            method: 'post',
            url: 'transactions/film_inventory',
            data: filmValues,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        };

        axiosApi(config)
            .then(response => {
                closeModal(response.data)
                Toast.fire({
                    icon: 'info',
                    title: response.data
                });
            })
            .catch(error => {
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

export const getTxnItmLaboratoriesRequests = (token, listType, params) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/item_laboratories',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: params,
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    if (response.data.totalElements <= 0) {
                        Toast.fire({
                            icon: 'info',
                            title: 'No records found.'
                        });
                    }
                    dispatch(txnLaboratoriesSuccess(response.data, listType));
                } else {
                    dispatch(txnLaboratoriesConcat(response.data, listType));
                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getTxnItmLaboratoriesRequests(token, listType, newParam));
                }
            })
            .catch(error => {
                dispatch(txnLaboratoriesFail(error.response, listType));

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

export const getTransactionItemLaboratoriesRequests = (token, listType, dateTimeFrom, dateTimeTo, params = {}) => {
    return dispatch => {
        dispatch(txnLaboratoriesStart(listType));
        dispatch(getTxnItmLaboratoriesRequests(token, listType,
            {
                page: 0,
                dateTimeFrom: dateTimeFrom,
                dateTimeTo: dateTimeTo,
                ...params
            }
        ));
    };
};


export const submitLaboratoryRequirements = (token, labRequirements, transid, txnItemId, closeModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory_requirements/' + txnItemId + '/submit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: labRequirements
        }

        axiosApi(config)
            .then(response => {
                closeModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Save successful'
                });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
};

export const submitTxnLabRequirements = (token, labRequirements, transid, closeModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory_requests/submit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: labRequirements
        }

        axiosApi(config)
            .then(response => {
                closeModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Save successful'
                });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
};


// QUEST QUALITY
export const getQQTxnRequests = (token, listType, params) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/quest_quality',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: params,
        };

        axiosApi(config)
            .then(response => {
                if (response.data.last) {
                    if (response.data.totalElements <= 0) {
                        Toast.fire({
                            icon: 'info',
                            title: 'No records found.'
                        });
                    }
                    dispatch(txnLaboratoriesSuccess(response.data, listType));
                } else {
                    dispatch(txnLaboratoriesConcat(response.data, listType));
                    let page = 0;
                    if (params.page !== undefined) {
                        page = params.page + 1;
                    }
                    const newParam = updateObject(params, {
                        page: page,
                    });
                    dispatch(getQQTxnRequests(token, listType, newParam));
                }
            })
            .catch(error => {
                dispatch(txnLaboratoriesFail(error.response, listType));

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

export const getQQTransactionRequests = (token, listType, dateTimeFrom, dateTimeTo, params = {}) => {
    return dispatch => {
        dispatch(txnLaboratoriesStart(listType));
        dispatch(getQQTxnRequests(token, listType,
            {
                page: 0,
                dateTimeFrom: dateTimeFrom,
                dateTimeTo: dateTimeTo,
                ...params
            }
        ));
    };
};



export const getQQPatientCumulativePdf = (token, startDate, endDate, params) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/quest_quality/patient',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                dateTimeFrom: startDate,
                dateTimeTo: endDate,
                ...params
            },
        };

        axiosApi(config)
            .then(response => {
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
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

export const getQQTxnRequestsExcel = (token, startDate, endDate, params) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: 'transactions/quest_quality/excel',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                dateTimeFrom: startDate,
                dateTimeTo: endDate,
                ...params
            },
        };

        axiosApi(config)
            .then(response => {
                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'quest_quality.xlsx'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
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

export const getQQTxnRequestsExcelCupmedar = (token, startDate, endDate, params) => {
    return dispatch => {
        dispatch(laboratoryStart("CUPMEDAR"));
        const config = {
            method: 'get',
            url: 'transactions/quest_quality/cupmedar/excel',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                dateTimeFrom: startDate,
                dateTimeTo: endDate,
                ...params
            },
        };

        axiosApi(config)
            .then(response => {
                dispatch(laboratorySuccess("", "CUPMEDAR"));
                const file = new Blob([response.data]);
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'cupmedar.xlsx'); //any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                dispatch(laboratoryFail(error.response, "CUPMEDAR"));
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

export const clearLaboratoryList = (listType) => {
    let lstTyp = null;
    switch (listType) {
        case 'CM': // CLINICAL MICROSCOPY
            lstTyp = actionTypes.LAB_CM_CLEAR_LIST;
            break;

        case 'HE': // HEMATOLOGY
            lstTyp = actionTypes.LAB_HE_CLEAR_LIST;
            break;

        case 'CH': // CHEMISTRY
            lstTyp = actionTypes.LAB_CH_CLEAR_LIST;
            break;

        case 'SE': // SEROLOGY
            lstTyp = actionTypes.LAB_SE_CLEAR_LIST;
            break;

        case 'MB': // SEROLOGY
            lstTyp = actionTypes.LAB_MB_CLEAR_LIST;
            break;

        case 'BT': // SEROLOGY
            lstTyp = actionTypes.LAB_BT_CLEAR_LIST;
            break;

        case 'TO': // TOXICOLOGY
            lstTyp = actionTypes.LAB_TO_CLEAR_LIST;
            break;

        case 'IND': // INDUSTRIAL
            lstTyp = actionTypes.LAB_IND_CLEAR_LIST;
            break;

        case 'NRS': // NURSE
            lstTyp = actionTypes.LAB_NRS_CLEAR_LIST;
            break;

        default:
            break;
    }
    return {
        type: lstTyp,
    };
}

// export const sendCertificate = (token, transid, labid, withHeaderFooter, serviceName) => {
//     return dispatch => {
//         const config = {
//             method: 'get',
//             url: '/transaction/' + transid + '/laboratory/' + labid + '/' + serviceName + '/certificate',
//             responseType: 'blob',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + token,
//             },
//             params: {
//                 withHeaderFooter: withHeaderFooter
//             }
//         }

//         axiosApi(config)
//             .then(response => {
//                 const file = new Blob(
//                     [response.data],
//                     { type: 'application/pdf' });
//                 const fileURL = URL.createObjectURL(file);
//                 window.open(fileURL);
//             })
//             .catch(error => {
//                 const errmsg = getErrorMessage(error);
//                 if (errmsg != null) {
//                     Toast.fire({
//                         icon: 'error', 
//                         title: errmsg
//                     });
//                 }
//             });
//     }
// }


// PRINT CERTIFICATE
export const printCertificate = (token, transid, labid, withHeaderFooter, serviceName) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/' + serviceName + '/certificate',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                withHeaderFooter: withHeaderFooter
            }
        }

        axiosApi(config)
            .then(response => {
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
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

export const printPhysicalExam = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'pe'));
    }
}

export const printXray = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'xray'));
    }
}

export const printUltrasound = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'ultrasound'));
    }
}

export const printEcg = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'ecg'));
    }
}

export const printClinicalMicroscopy = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'clinical_microscopy'));
    }
}

export const printHematology = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'hematology'));
    }
}

export const printChemistry = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'chemistry'));
    }
}

export const printSerology = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'serology'));
    }
}

export const printMicrobiology = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'microbiology'));
    }
}

export const printBacteriology = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'bacteriology'));
    }
}

export const printMedCert = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'med_cert'));
    }
}

export const printToxicology = (token, transid, labid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printCertificate(token, transid, labid, withHeaderFooter, 'toxicology'));
    }
}





// PRINT ITEM CERTIFICATES
export const printItemCerificate = (token, transid, itemid, withHeaderFooter, serviceName) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: '/transaction/' + transid + '/item/' + itemid + '/' + serviceName + '/certificate',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                withHeaderFooter: withHeaderFooter
            }
        }

        axiosApi(config)
            .then(response => {
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
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

export const printIndustrial = (token, transid, itemid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printItemCerificate(token, transid, itemid, withHeaderFooter, 'industrial'));
    }
}

export const printMedical = (token, transid, itemid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printItemCerificate(token, transid, itemid, withHeaderFooter, 'medical'));
    }
}

export const printClassification = (token, transid, itemid, withHeaderFooter) => {
    return dispatch => {
        dispatch(printItemCerificate(token, transid, itemid, withHeaderFooter, 'classification'));
    }
}

export const printConsolidatedResults = (token, transid, withHeaderFooter) => {
    return dispatch => {
        const config = {
            method: 'get',
            url: '/transaction/' + transid + '/consolidated/certificate',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                withHeaderFooter: withHeaderFooter
            }
        }

        axiosApi(config)
            .then(response => {
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
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

// QUALITY CONTROL
export const qualityControl = (token, transid, labid, serviceName, closeModal) => {
    return dispatch => {

        const config = {
            method: 'put',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/' + serviceName + '/qc',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }

        axiosApi(config)
            .then(response => {
                closeModal(response.data);

                Toast.fire({
                    icon: 'success',
                    title: 'Save successful'
                });
            })
            .catch(error => {
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

export const qualityControlClinicalMicroscopy = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'clinical_microscopy', closeModal));
    }
}

export const qualityControlHematology = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'hematology', closeModal));
    }
}

export const qualityControlChemistry = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'chemistry', closeModal));
    }
}

export const qualityControlMicrobiology = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'microbiology', closeModal));
    }
}

export const qualityControlBacteriology = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'bacteriology', closeModal));
    }
}

export const qualityControlSerology = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'serology', closeModal));
    }
}

export const qualityControlToxicology = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'toxicology', closeModal));
    }
}

export const qualityControlXRay = (token, transid, labid, closeModal) => {
    return dispatch => {
        dispatch(qualityControl(token, transid, labid, 'xray', closeModal));
    }
}


export const printLaboratoryLabels = (token, txnID, dateTimeFrom, dateTimeTo, withSpace, request = {}) => {
    return dispatch => {

        const parameters = {
            ...request,
        }

        if (txnID !== null && txnID !== '') {
            parameters.transactionId = txnID;
        } else {
            parameters.dateTimeFrom = dateTimeFrom;
            parameters.dateTimeTo = dateTimeTo;
        }

        parameters.withSpace = withSpace

        const config = {
            method: 'get',
            url: 'transactions/labels',
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: parameters,
        };

        axiosApi(config)
            .then(response => {
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
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