import React, { lazy, Component } from 'react'
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CProgress,
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

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

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
class Dashboard extends Component {
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
                <WidgetsDropdown />
                <CCard>
                    <CCardBody>
                        
                    </CCardBody>

                    <CCardFooter>
                        <CRow className="text-center">
                            <CCol md sm="12" className="mb-sm-2 mb-0">
                                <div className="text-muted">Visits</div>
                                <strong>29.703 Users (40%)</strong>
                                <CProgress
                                    className="progress-xs mt-2"
                                    precision={1}
                                    color="success"
                                    value={40}
                                />
                            </CCol>
                            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                                <div className="text-muted">Unique</div>
                                <strong>24.093 Users (20%)</strong>
                                <CProgress
                                    className="progress-xs mt-2"
                                    precision={1}
                                    color="info"
                                    value={40}
                                />
                            </CCol>
                            <CCol md sm="12" className="mb-sm-2 mb-0">
                                <div className="text-muted">Pageviews</div>
                                <strong>78.706 Views (60%)</strong>
                                <CProgress
                                    className="progress-xs mt-2"
                                    precision={1}
                                    color="warning"
                                    value={40}
                                />
                            </CCol>
                            <CCol md sm="12" className="mb-sm-2 mb-0">
                                <div className="text-muted">New Users</div>
                                <strong>22.123 Users (80%)</strong>
                                <CProgress
                                    className="progress-xs mt-2"
                                    precision={1}
                                    color="danger"
                                    value={40}
                                />
                            </CCol>
                            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                                <div className="text-muted">Bounce Rate</div>
                                <strong>Average Rate (40.15%)</strong>
                                <CProgress
                                    className="progress-xs mt-2"
                                    precision={1}
                                    value={40}
                                />
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>

                <WidgetsBrand withCharts />

            </>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.lab.loading,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Dashboard));
