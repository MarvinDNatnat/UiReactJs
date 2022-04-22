import * as actionTypes from "src/store/actions/actionTypes";
import axiosApi from "src/axios-api";
import { getErrorMessage } from "src/store/sweetAlert";
// import Swal from 'sweetalert2';
import { Toast } from "src/store/sweetAlert";

export const cashierEODStart = () => {
  return {
    type: actionTypes.CASHIER_EOD_START,
  };
};

export const cashierEODSuccess = (response) => {
  return {
    type: actionTypes.CASHIER_EOD_SUCCESS,
    data: response,
  };
};

export const cashierEODFail = (error) => {
  return {
    type: actionTypes.CASHIER_EOD_FAIL,
    error: error,
  };
};

export const clearCashierEODData = (error) => {
  return {
    type: actionTypes.CASHIER_EOD_CLEAR_DATA,
    error: error,
  };
};

export const getCashierEOD = (token, startDate, endDate, branchId) => {
  return (dispatch) => {
    dispatch(cashierEODStart());

    const config = {
      method: "get",
      url: "transactions/cashier_eod",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      params: {
        dateTimeFrom: startDate,
        dateTimeTo: endDate,
        branchId: branchId,
      },
    };

    axiosApi(config)
      .then((response) => {
        dispatch(cashierEODSuccess(response.data));
      })
      .catch((error) => {
        dispatch(cashierEODFail(error.response));

        const errmsg = getErrorMessage(error);
        if (errmsg != null) {
          Toast.fire({
            icon: "error",
            title: errmsg,
          });
        }
      });
  };
};

export const getCashierEODReceipt = (token, startDate, endDate, branchId) => {
  return (dispatch) => {
    const config = {
      method: "get",
      url: "transactions/cashier_eod/receipt",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      params: {
        dateTimeFrom: startDate,
        dateTimeTo: endDate,
        branchId: branchId,
      },
    };

    axiosApi(config)
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        const errmsg = getErrorMessage(error);
        if (errmsg != null) {
          Toast.fire({
            icon: "error",
            title: errmsg,
          });
        }
      });
  };
};

export const auditorEODStart = () => {
  return {
    type: actionTypes.AUDITOR_EOD_START,
  };
};

export const auditorEODSuccess = (response) => {
  return {
    type: actionTypes.AUDITOR_EOD_SUCCESS,
    data: response,
  };
};

export const auditorEODFail = (error) => {
  return {
    type: actionTypes.AUDITOR_EOD_FAIL,
    error: error,
  };
};

export const clearAuditorEODData = (error) => {
  return {
    type: actionTypes.AUDITOR_EOD_CLEAR_DATA,
    error: error,
  };
};

export const getAuditorEOD = (token, dateFrom, dateTo, branchId) => {
  return (dispatch) => {
    dispatch(auditorEODStart());

    const config = {
      method: "get",
      url: "transactions/auditor_eod",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      params: {
        dateFrom: dateFrom,
        dateTo: dateTo,
        branchId: branchId,
      },
    };

    axiosApi(config)
      .then((response) => {
        dispatch(auditorEODSuccess(response.data));
      })
      .catch((error) => {
        dispatch(auditorEODFail(error.response));

        const errmsg = getErrorMessage(error);
        if (errmsg != null) {
          Toast.fire({
            icon: "error",
            title: errmsg,
          });
        }
      });
  };
};

export const auditorEODExcelStart = () => {
  return {
    type: actionTypes.AUDITOR_EOD_EXCEL_START,
  };
};

export const auditorEODExcelSuccess = () => {
  return {
    type: actionTypes.AUDITOR_EOD_EXCEL_SUCCESS,
  };
};

export const auditorEODExcelFail = (error) => {
  return {
    type: actionTypes.AUDITOR_EOD_EXCEL_FAIL,
    error: error,
  };
};

export const getAuditorEODExcel = (token, dateFrom, dateTo, branchId, test) => {
  return (dispatch) => {
    dispatch(auditorEODExcelStart());

    const config = {
      method: "get",
      url: "transactions/auditor_eod/excel",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      params: {
        dateFrom: dateFrom,
        dateTo: dateTo,
        branchId: branchId,
        test: test,
      },
    };

    axiosApi(config)
      .then((response) => {
        dispatch(auditorEODExcelSuccess());

        const file = new Blob([response.data]);
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute(
          "download",
          "auditor_eod_" + dateFrom + "_" + dateTo + ".xlsx"
        ); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        dispatch(auditorEODExcelFail(error.response));
        const errmsg = getErrorMessage(error);
        if (errmsg != null) {
          Toast.fire({
            icon: "error",
            title: errmsg,
          });
        }
      });
  };
};

export const saveAuditorNotes = (
  token,
  noteValue,
  dateFrom,
  dateTo,
  branchId,
  closeModal
) => {
  return (dispatch) => {
    const config = {
      method: "post",
      url: "transactions/auditor_eod/notes",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: noteValue,
      params: {
        dateFrom: dateFrom,
        dateTo: dateTo,
        branchId: branchId,
      },
    };

    axiosApi(config)
      .then((response) => {
        closeModal(response.data);
        Toast.fire({
          icon: "success",
          title: response.data,
        });
      })
      .catch((error) => {
        const errmsg = getErrorMessage(error);
        if (errmsg != null) {
          Toast.fire({
            icon: "error",
            title: errmsg,
          });
        }
      });
  };
};

export const saveDenominationReport = (token, startDate, endDate, branchId, denominationValue, closeModal) => {
  return (dispatch) => {
        const config = {
            method: 'post',
            url: 'transactions/cashier/denomination',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                startDateTimeFrom: startDate,
                startDateTimeTo: endDate,
                branchId: branchId,
            },
            data: denominationValue
        };
        axiosApi(config)
            .then(response => {
              closeModal(response.data)
              Toast.fire({
                icon: 'success',
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
    };
  };
  
export const saveDenominationVerify = (token, startDate, endDate, branchId, closeModal) => {
  return (dispatch) => {
        const config = {
            method: 'post',
            url: 'transactions/auditor/verify',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            params: {
                startDateTimeFrom: startDate,
                startDateTimeTo: endDate,
                branchId: branchId,
            },
        };
        axiosApi(config)
            .then(response => {
              closeModal(response.data)
              Toast.fire({
                icon: 'success',
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
    };
  };

  export const saveDenominationNote = (token, startDate, endDate, branchId, closeModal) => {
    return (dispatch) => {
          const config = {
              method: 'post',
              url: 'transactions/auditor/note',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
              },
              params: {
                  startDateTimeFrom: startDate,
                  startDateTimeTo: endDate,
                  branchId: branchId,
              },
          };
          axiosApi(config)
              .then(response => {
                closeModal(response.data)
                Toast.fire({
                  icon: 'success',
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
      };
    };
