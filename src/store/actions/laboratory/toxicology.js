import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const saveToxicology = (token, toxicologyValues, transid, labid, closeToxicologyModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/toxicology',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: toxicologyValues
        }

        axiosApi(config)
            .then(response => {
                closeToxicologyModal(response.data);

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

export const getToxicologyInfo = (token, transid, labid, setToxicologyInfo) => {
    return dispatch => {

        const config = {
            method: 'get',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/toxicology',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }

        axiosApi(config)
            .then(response => {
                setToxicologyInfo(response.data)
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
