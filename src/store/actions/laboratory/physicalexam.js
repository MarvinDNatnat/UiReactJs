import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const savePhysicalExam = (token, peValues, transid, labid, closePhysicalExamModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/pe',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: peValues
        }

        axiosApi(config)
            .then(response => {
                closePhysicalExamModal(response.data);

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

export const getPhysicalExamInfo = (token, transid, labid, setPhysicalExamInfo) => {
    return dispatch => {

        const config = {
            method: 'get',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/pe',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }

        axiosApi(config)
            .then(response => {
                setPhysicalExamInfo(response.data)
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
