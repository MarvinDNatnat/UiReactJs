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

import BranchModal from 'src/containers/modal/maintenance/BranchModal';
import BranchesTable from 'src/containers/tables/maintenance/BranchesTable';

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

const branchConfig = {
    branchCode: '',
    branchName: '',
    address: '',
    contactNumber: '',
    active: true,
    isErrorBranchCode: false,
    isErrorBranchName: false,
    isErrorAddress: false,
    isErrorContactNumber: false,
    branchCodeError: null,
    branchNameError: null,
    addressError: null,
    contactNumberError: null,
}

export class Branches extends Component {
    state = {
        branchModal: {
            isUpdate: null,
            updateIndex: null,
            showBranchModal: false,
        },
        branchData: branchConfig,
    }

    viewAllBranches = () => {
        this.props.onGetAllBranches(this.props.userToken);
    }

    addBranchModal = () => {
        const updateBranchData = updateObject(this.state.branchData, branchConfig);

        const updateBranchModal = updateObject(this.state.branchModal, {
            isUpdate: null,
            updateIndex: null,
            showBranchModal: true,
        });

        this.setState({
            ...this.state,
            branchModal: updateBranchModal,
            branchData: updateBranchData,
        });
    }

    updateBranchModal = (bran, idx) => {
        if (bran !== undefined && idx !== undefined) {
            const updateBranchData = updateObject(branchConfig, {
                branchCode: bran.branchCode,
                branchName: bran.branchName,
                address: bran.address !== null ? bran.address : '',
                contactNumber: bran.contactNumber !== null ? bran.contactNumber : '',
                active: bran.active,
            });

            const updateBranchModal = updateObject(this.state.branchModal, {
                isUpdate: bran.branchid,
                updateIndex: idx,
                showBranchModal: true,
            });

            this.setState({
                ...this.state,
                branchModal: updateBranchModal,
                branchData: updateBranchData,
            });
        }
    }

    closeBranchModal = (branchData) => {
        const updateBranchModal = updateObject(this.state.branchModal, {
            showBranchModal: false,
        });

        this.setState({
            ...this.state,
            branchModal: updateBranchModal,
        });

        if (branchData !== null) {
            if (this.state.branchModal.isUpdate !== null) { // update
                if (this.state.branchModal.updateIndex !== null) {
                    this.branchTableRef.updateBranchToTable(branchData, this.state.branchModal.updateIndex);
                }
                // } else { // add
                //     this.userTableRef.addUserToTable(userData);
            }
        }
    }

    saveBranchClick = () => {
        const branchRequest = {
            branchCode: this.state.branchData.branchCode,
            branchName: this.state.branchData.branchName,
            address: this.state.branchData.address !== '' ? this.state.branchData.address : null,
            contactNumber: this.state.branchData.contactNumber !== '' ? this.state.branchData.contactNumber : null,
        }

        let reqMethod = 'post';
        if (this.state.branchModal.isUpdate !== null) {
            reqMethod = 'put';
            branchRequest.branchid = this.state.branchModal.isUpdate;
            branchRequest.active = this.state.branchData.active;
        }

        this.props.onSaveUpdateBranch(this.props.userToken, branchRequest, reqMethod, this.closeBranchModal);
    }

    setBranchData = (updateBranchData) => {
        this.setState({
            ...this.state,
            branchData: updateBranchData,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={false}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <BranchModal
                    isUpdate={this.state.branchModal.isUpdate}
                    showModal={this.state.branchModal.showBranchModal}
                    closeClick={this.closeBranchModal}
                    saveClick={this.saveBranchClick}
                    branchData={this.state.branchData}
                    setBranchData={this.setBranchData}
                />

                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Branches</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllBranches}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addBranchModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <BranchesTable onRef={ref => (this.branchTableRef = ref)} updateBranchModal={this.updateBranchModal} />
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
        loading: state.bran.loading,
        error: state.bran.error,
        userToken: state.auth.token,
        branchList: state.bran.branchList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onSaveUpdateBranch: (token, branchData, reqType, closeBranchModal) => dispatch(actions.saveUpdateBranch(token, branchData, reqType, closeBranchModal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Branches))
