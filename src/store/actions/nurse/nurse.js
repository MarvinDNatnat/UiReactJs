import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const saveNurseClassification = (token, classRequest, transid, txnItmId, closeModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + txnItmId + '/classify',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: classRequest
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

                const errmsg = getErrorMessage(error.response);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
}

export const saveCalledPatient = (token, transid, txnItmId) => {
    return dispatch => {
        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + txnItmId + '/call',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }
        axiosApi(config)
            .then(response => {
                Toast.fire({
                    icon: 'success',
                    title: 'Save successful'
                });
            })
            .catch(error => {

                const errmsg = getErrorMessage(error.response);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
}



export const saveNurseQualityControl = (token, transid, txnItmId, closeModal) => {
    return dispatch => {

        const config = {
            method: 'put',
            url: '/transaction/' + transid + '/laboratory/' + txnItmId + '/qc',
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

                const errmsg = getErrorMessage(error.response);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });
    }
}