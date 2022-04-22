import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';

export const saveMicrobiology = (token, hemaValues, transid, labid, closeModal) => {
    return dispatch => {

        const config = {
            method: 'post',
            url: '/transaction/' + transid + '/laboratory/' + labid + '/microbiology',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: hemaValues
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