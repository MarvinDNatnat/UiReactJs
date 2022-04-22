import React, { Component } from 'react'
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

import ReferralsTable from 'src/containers/tables/maintenance/ReferralsTable';
import ReferralModal from 'src/containers/modal/maintenance/ReferralModal';

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
});

const referralConfig = {
    referral: '',
    active: true,
    isErrorReferral: false,
    referralError: null,
}

export class Referrals extends Component {
    state = {
        referralModal: {
            isUpdate: null,
            updateIndex: null,
            showReferralModal: false,
        },
        referralData: referralConfig,
    }

    viewAllReferrals = () => {
        this.props.onGetAllReferrals(this.props.userToken);
    }

    addReferralModal = () => {
        const updateReferralData = updateObject(this.state.referralData, referralConfig);

        const updateReferralModal = updateObject(this.state.referralModal, {
            isUpdate: null,
            updateIndex: null,
            showReferralModal: true,
        });

        this.setState({
            ...this.state,
            referralModal: updateReferralModal,
            referralData: updateReferralData,
        });
    };

    updateReferralModal = (ref, idx) => {
        if (ref !== undefined && idx !== undefined) {

            const updateReferralData = updateObject(referralConfig, {
                referral: ref.referral,
                active: ref.active,
            });

            const updateReferralModal = updateObject(this.state.referralModal, {
                isUpdate: ref.referralid,
                updateIndex: idx,
                showReferralModal: true,
            });

            this.setState({
                ...this.state,
                referralModal: updateReferralModal,
                referralData: updateReferralData,
            });
        }
    }

    closeReferralModal = (referralData) => {
        const updateReferralModal = updateObject(this.state.referralModal, {
            showReferralModal: false,
        });

        this.setState({
            ...this.state,
            referralModal: updateReferralModal,
        });

        if (referralData !== null) {
            if (this.state.referralModal.isUpdate !== null) { // update
                if (this.state.referralModal.updateIndex !== null) {
                    this.referralTableRef.updateReferralToTable(referralData, this.state.referralModal.updateIndex);
                }
            // } else { // add
            //     this.userTableRef.addUserToTable(userData);
            }
        }
    }

    saveReferralClick = () => {
        const referralRequest = {
            referral: this.state.referralData.referral,
        }

        let reqMethod = 'post';
        if (this.state.referralModal.isUpdate !== null) {
            reqMethod = 'put';
            referralRequest.referralid = this.state.referralModal.isUpdate;
            referralRequest.active = this.state.referralData.active;
        }

        this.props.onSaveUpdateReferral(this.props.userToken, referralRequest, reqMethod, this.closeReferralModal);
    }

    setReferralData = (updateReferralData) => {
        this.setState({
            ...this.state,
            referralData: updateReferralData,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <ReferralModal
                    isUpdate={this.state.referralModal.isUpdate}
                    showModal={this.state.referralModal.showReferralModal}
                    closeClick={this.closeReferralModal}
                    saveClick={this.saveReferralClick}
                    referralData={this.state.referralData}
                    setReferralData={this.setReferralData}
                />

                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Referrals</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllReferrals}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addReferralModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <ReferralsTable onRef={ref => (this.referralTableRef = ref)} updateReferralModal={this.updateReferralModal} />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.refs.loading,
        error: state.refs.error,
        userToken: state.auth.token,
        referralList: state.refs.referralList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllReferrals: (token) => dispatch(actions.getAllReferrals(token)),
        onSaveUpdateReferral: (token, referralData, reqType, closeReferralModal) => dispatch(actions.saveUpdateReferral(token, referralData, reqType, closeReferralModal))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Referrals))
