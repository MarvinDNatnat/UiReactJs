import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import ReferenceLaboratoryTable from 'src/containers/tables/maintenance/ReferenceLaboratoryTable';
import ReferenceModal from 'src/containers/modal/maintenance/ReferenceLaboratoryModal'
import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

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

const referenceConfig = {
    name: "",
    address: "",
    contactPerson: "",
    contactNumber: "",
    sopEmail: "",
    resultsEmail: "",
    referenceItems: [],
    referencePackages: [],
    sopCode: "",
    status: true,
    referenceId: "",
}

export class ReferenceLaboratory extends Component {
    state = {
        itemList: [],
        packageList: [],
        itemSelected: [],
        showModal: false,
        update: false,
        referenceData: referenceConfig,
    }

    componentDidMount() {
        if (this.props.itemList.length <= 0) {
            this.props.onGetAllActiveItems(this.props.userToken);
        }
        if (this.props.packageList.length <= 0) {
            this.props.onGetAllPackages(this.props.userToken);
        }
    }

    viewReference = () => {
        this.props.onShowReferenceLaboratory(this.props.userToken)
    }

    addReference = () => {
        this.setState({
            ...this.state,
            showModal: true,
            modalTitle: "Add Reference Laboratory",
        })
    }


    updateReference = () => {
        this.setState({
            ...this.state,
            showModal: true,
            update: true,
        })
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            showModal: false,
            referenceData: referenceConfig
        })
    }

    setPackageData = (updatePackageData) => {
        this.setState({
            ...this.state,
            referenceData: updatePackageData,
        });
    }

    updatePackageData = (updatePackageData) => {
        this.setState({
            referenceData: updatePackageData,
        });
    }

    saveUpdateHandle = () => {
        this.props.onSaveUpdateReference(this.props.userToken, this.state.referenceData, this.closeModal)
    }

    updateReferenceModal = (itms, idx) => {
        const referenceItems = [];
        if (itms.collectionItems !== null && itms.collectionItems.length > 0 && this.props.itemList !== null) {
            itms.collectionItems.forEach(itmRef => {
                const itmIndex = this.props.itemList.findIndex(i => i.itemid === itmRef.referenceLabItems.itemid);
                if (itmIndex >= 0) {
                    const itm = this.props.itemList[itmIndex];
                    referenceItems.push({
                        value: itm.itemid, label: itm.itemName + '(' + itm.itemPrice.toFixed(2) + ')',
                        itemName: itm.itemDescription, originalPrice: itmRef.originalPrice, molePrice: itmRef.molePrice, itemId: itm.itemid
                    });
                }
            });
        }

        const referencePackages = [];
        if (itms.collectionPackage !== null && itms.collectionPackage.length > 0 && this.props.packageList !== null) {
            itms.collectionPackage.forEach(pckRef => {
                const pckIndex = this.props.packageList.findIndex(i => i.packageid === pckRef.referencePackageItems.packageid);
                if (pckIndex >= 0) {
                    const pck = this.props.packageList[pckIndex];
                    referencePackages.push({
                        value: pck.itemid, label: pck.packageName + '(' + pck.packagePrice.toFixed(2) + ')',
                        packageName: pck.packageDescription, originalPrice: pckRef.originalPrice, molePrice: pckRef.molePrice, packageId: pck.packageid
                    });
                }
            });
        }

        const updatePackageData = updateObject(this.state.referenceData, {
            referenceItems: referenceItems,
            referencePackages: referencePackages,
            referenceId: itms.referenceid,
            address: itms.address,
            contactNumber: itms.contactNumber,
            contactPerson: itms.contactPerson,
            name: itms.name,
            sopCode: itms.sopCode,
            sopEmail: itms.sopEmail,
            status: itms.status
        })

        this.setState({
            ...this.state,
            showModal: true,
            referenceData: updatePackageData,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <CRow>
                <Backdrop open={false}>
                    <CircularProgress className={classes.backdrop} color="inherit" />
                </Backdrop>

                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Reference Laboratory</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewReference}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addReference}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <ReferenceLaboratoryTable onRef={ref => (this.corporateTableRef = ref)}
                                    updateReferenceModal={this.updateReferenceModal}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <ReferenceModal
                    state={this.state}
                    itemList={this.props.itemList}
                    packageList={this.props.packageList}
                    setPackageData={this.setPackageData}
                    itemsSelected={this.itemsSelected}
                    closeClick={this.closeModal}
                    updatePackageData={this.updatePackageData}
                    saveUpdateHandle={this.saveUpdateHandle}
                />
            </CRow>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        itemList: state.items.itemList,
        packageList: state.packs.packageList,
        userToken: state.auth.token,
        itmsLoading: state.items.loading,
        userAuth: state.auth.user,
        listReference: state.refLab.referenceLaboratoryList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllPackages: (token) => dispatch(actions.getAllPackages(token)),
        onGetAllActiveItems: (token) => dispatch(actions.getAllActiveItems(token)),
        onSaveUpdateReference: (token, referenceData, closeModal) => dispatch(actions.saveUpdateReference(token, referenceData, closeModal)),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ReferenceLaboratory));