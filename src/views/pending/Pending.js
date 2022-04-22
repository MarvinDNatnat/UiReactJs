import React, { Component } from 'react'
import {
    CCard,
    CCardBody,
    CRow,
} from '@coreui/react'

import Swal from 'sweetalert2';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Pednding3DaysAgoTable from 'src/containers/tables/PendingThreeDaysAgoTable';
import PendingOverThanThreeDaysTable from 'src/containers/tables/PendingOverThanThreeDays';


const useStyles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    errorMessage: {
        color: '#f00',
        textAlign: 'center',
        fontWeight: "bolder",
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    }
});
class PendingList extends Component {
    componentDidMount() {
        this.props.onGetPendingLess3Days(this.props.userToken);
        this.props.onGetPendingOver3Days(this.props.userToken);

    }

    callHandler = (data, idx) => {
        var itmId = ""
        var hasPackage = false
        for (const item of data.transactionItems) {
            if (item.itemType === "PCK") {
                hasPackage = true;
                itmId = item.id;
            }

            if (hasPackage) {
                break;
            }
        }
        Swal.fire({
            title: 'Nurse Classification',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSavePatientCalled(this.props.userToken, data.transactionid, itmId)
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CCard>
                    <CCardBody>
                        <CRow>
                            <div sm="12" className="col-sm text-justify">
                                <h6 id="traffic" className="card-title mb-0">PENDING LAST 3 DAYS</h6>
                                <div className="table-responsive">
                                    <Pednding3DaysAgoTable
                                        onRef={ref => (this.pending = ref)}
                                        callHandler={this.callHandler} />
                                </div>
                            </div>
                        </CRow>
                        <hr />
                        <CRow>
                            <div sm="12" className="col-sm text-justify">
                                <h6 id="traffic" className="card-title mb-0">PENDING OVER THAN 3 DAYS</h6>
                                <div className="table-responsive">
                                    <PendingOverThanThreeDaysTable
                                        onRef={ref => (this.pending = ref)}
                                        callHandler={this.callHandler} />
                                </div>
                            </div>
                        </CRow>
                    </CCardBody>

                </CCard>
            </>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.trans.loading,
        userToken: state.auth.token,
        pendingList: state.trans.pendingList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPendingLess3Days: (token) => dispatch(actions.getPendingTransactionsLess3Days(token)),
        onGetPendingOver3Days: (token) => dispatch(actions.getPendingTransactionsOver3Days(token)),
        onClearPendingLaboratoryList: () => dispatch(actions.clearPendingTransactionList()),
        onSavePatientCalled: (token, transid, txnItmId) => dispatch(actions.saveCalledPatient(token, transid, txnItmId)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(PendingList));
