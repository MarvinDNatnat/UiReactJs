import React, { Component } from 'react';
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

import CorporateModal from 'src/containers/modal/maintenance/CorporateModal';
import CorporatesTable from 'src/containers/tables/maintenance/CorporatesTable';

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


const corporateConfig = {
    companyName: '',
    companyAddress: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    resultEmail: '',
    soaCode: '',
    chargeType: null,
    active: true,
    isErrCName: false,
    isErrCAdd: false,
    isErrCPerson: false,
    isErrCNo: false,
    isErrCEmail: false,
    isErrCREmail: false,
    isErrCCType: false,
    isErrSOACode: false,
    cnameError: null,
    caddError: null,
    cpersonError: null,
    cnoError: null,
    cemailError: null,
    crEmailError: null,
    ccTypeError: null,
    soaCodeError: null,
}

const chargeTypes = new Map([
    ['CORP', 'CORPORATE'],
    ['CASH', 'CORPORATE CASH'],
    ['HMO', 'HMO'],
    ['REB', 'REBATE'],
    ['STF', 'STAFF'],
    ['APE', 'APE'],
    ['MMO', 'MEDICAL MISSION'],
])

export class Corporates extends Component {
    state = {
        corporateModal: {
            isUpdate: null,
            updateIndex: null,
            showCorporateModal: false,
        },
        corporateData: corporateConfig
    }

    viewAllCorporates = () => {
        this.props.onGetAllCorporates(this.props.userToken);
    }

    addCorporateModal = () => {
        const updateCorporateData = updateObject(this.state.corporateData, corporateConfig);

        const updateCorporateModal = updateObject(this.state.corporateModal, {
            isUpdate: null,
            updateIndex: null,
            showCorporateModal: true,
        });

        this.setState({
            ...this.state,
            corporateModal: updateCorporateModal,
            corporateData: updateCorporateData,
        });
    }

    updateCorporateModal = (corp, idx) => {
        if (corp !== undefined && idx !== undefined) {
            let cType = null;
            if (chargeTypes.has(corp.chargeType) === true) {
                cType = {
                    value: corp.chargeType,
                    label: chargeTypes.get(corp.chargeType)
                }
            }

            const updateCorporateData = updateObject(corporateConfig, {
                companyName: corp.companyName,
                companyAddress: corp.companyAddress !== null ? corp.companyAddress : '',
                contactPerson: corp.contactPerson !== null ? corp.contactPerson : '',
                contactNumber: corp.contactNumber !== null ? corp.contactNumber : '',
                email: corp.email !== null ? corp.email : '',
                resultEmail: corp.resultEmail !== null ? corp.resultEmail : '',
                soaCode: corp.soaCode !== null ? corp.soaCode : '',
                chargeType: cType,
                active: corp.active,
            });

            const updateCorporateModal = updateObject(this.state.corporateModal, {
                isUpdate: corp.corporateid,
                updateIndex: idx,
                showCorporateModal: true,
            });

            this.setState({
                ...this.state,
                corporateModal: updateCorporateModal,
                corporateData: updateCorporateData,
            });
        }
    }

    closeCorporateModal = (corporateData) => {
        const updateCorporateModal = updateObject(this.state.corporateModal, {
            showCorporateModal: false,
        });
        this.setState({
            ...this.state,
            corporateModal: updateCorporateModal,
        });

        if (corporateData !== null) {
            if (this.state.corporateModal.isUpdate !== null) { // update
                if (this.state.corporateModal.updateIndex !== null) {
                    this.corporateTableRef.updateCorporateToTable(corporateData, this.state.corporateModal.updateIndex);
                }
                // } else { // add
                //     this.corporateTableRef.addCorporateToTable(corporateData);
            }
        }
    }

    setCorporateData = (updateCorporateData) => {
        this.setState({
            ...this.state,
            corporateData: updateCorporateData,
        });
    }

    saveCorporateClick = () => {
        const corporateRequest = {
            companyName: this.state.corporateData.companyName,
            companyAddress: this.state.corporateData.companyAddress !== '' ? this.state.corporateData.companyAddress : null,
            contactPerson: this.state.corporateData.contactPerson !== '' ? this.state.corporateData.contactPerson : null,
            contactNumber: this.state.corporateData.contactNumber !== '' ? this.state.corporateData.contactNumber : null,
            email: this.state.corporateData.email !== '' ? this.state.corporateData.email : null,
            resultEmail: this.state.corporateData.resultEmail !== '' ? this.state.corporateData.resultEmail : null,
            chargeType: this.state.corporateData.chargeType !== null ? this.state.corporateData.chargeType.value : null,
            soaCode: this.state.corporateData.soaCode !== '' ? this.state.corporateData.soaCode : null,
        }

        let reqMethod = 'post';
        if (this.state.corporateModal.isUpdate !== null) {
            reqMethod = 'put';
            corporateRequest.corporateid = this.state.corporateModal.isUpdate;
            corporateRequest.active = this.state.corporateData.active;
        }

        this.props.onSaveUpdateCorporate(this.props.userToken, corporateRequest, reqMethod, this.closeCorporateModal);
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CorporateModal
                    isUpdate={this.state.corporateModal.isUpdate}
                    showModal={this.state.corporateModal.showCorporateModal}
                    closeClick={this.closeCorporateModal}
                    saveClick={this.saveCorporateClick}
                    corporateData={this.state.corporateData}
                    setCorporateData={this.setCorporateData}
                />

                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Charge</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllCorporates}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addCorporateModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <CorporatesTable onRef={ref => (this.corporateTableRef = ref)} updateCorporateModal={this.updateCorporateModal} />
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
        loading: state.corps.loading,
        error: state.corps.error,
        userToken: state.auth.token,
        userList: state.corps.userList,
        userRoleList: state.corps.roleList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllCorporates: (token) => dispatch(actions.getAllCorporates(token)),
        onSaveUpdateCorporate: (token, corporateData, reqType, closeUserModal) => dispatch(actions.saveUpdateCorporate(token, corporateData, reqType, closeUserModal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Corporates))
