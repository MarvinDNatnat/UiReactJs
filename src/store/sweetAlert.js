import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const getErrorMessage = (error) => {
    let errmsg = "Server Error";

    if (error !== undefined) {
        if (error.response !== undefined) {
            if (error.response.data.error !== undefined && error.response.data.message !== "") {
                errmsg = error.response.data.error;
            }

            if (error.response.data.message !== undefined && error.response.data.message !== "") {
                if (errmsg === null) {
                    errmsg = error.response.data.message;
                } else {
                    errmsg = errmsg + " : " + error.response.data.message;
                }
            }
            error = error.response;
        } else if (error.message !== undefined) {
            errmsg = error.message;
        } else if (error.data !== undefined) {
            if(error.data.message !== undefined){
                errmsg = error.data.message;
            }
        }
    }

    return errmsg;
};
