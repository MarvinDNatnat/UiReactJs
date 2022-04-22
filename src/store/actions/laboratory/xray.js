import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const saveXray = (token, xrayValues, transid, labid, closeXrayModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/xray',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: xrayValues
        }

        axiosApi(config)
            .then(response => {
                closeXrayModal(response.data);

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

export const saveEcg = (token, xrayValues, transid, labid, closeXrayModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/ecg',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: xrayValues
        }

        axiosApi(config)
            .then(response => {
                closeXrayModal(response.data);

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

export const saveUltrasound = (token, ultrasoundValues, transid, labid, closeXrayModal) => {
 
    return dispatch => {
        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/ultrasound',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: ultrasoundValues
        }

        axiosApi(config)
            .then(response => {
                closeXrayModal(response.data);

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

export const getXrayInfo = (token, transid, labid, setXrayInfo) => {
    return dispatch => {

        const config = {
            method: 'get',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/xray',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }

        axiosApi(config)
            .then(response => {
                setXrayInfo(response.data)
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
