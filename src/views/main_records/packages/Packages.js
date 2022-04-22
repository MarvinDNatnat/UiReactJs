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

import PackageModal from 'src/containers/modal/maintenance/PackageModal';
import PackagesTable from 'src/containers/tables/maintenance/PackagesTable';

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

const packageConnfig = {
    packageName: '',
    packageDescription: '',
    packagePrice: '0',
    packageType: null,
    packageItems: [],
    active: true,
    taxable: true,
    discountable: true,
    onMenu: false,
    isErrorPckName: false,
    isErrorPckDesc: false,
    isErrorPckPrice: false,
    isErrorPckTyp: false,
    isErrorPckItm: false,
    pckNameError: null,
    pckDescError: null,
    pckPriceError: null,
    pckTypeError: null,
    pckItmsError: null,
    typeTestPackage: null,
}

export class Packages extends Component {
    state = {
        packageModal: {
            isUpdate: null,
            updateIndex: null,
            showPackageModal: false,
        },
        packageData: packageConnfig
    }

    componentDidMount() {
        if (this.props.packageTypes.length <= 0) {
            this.props.onGetPackageTypes(this.props.userToken);
        }

        if (this.props.itemList.length <= 0) {
            this.props.onGetAllItems(this.props.userToken);
        }
    }

    viewAllPackages = () => {
        this.props.onGetAllPackages(this.props.userToken);
    }

    addPackageModal = () => {
        const updatePackageData = updateObject(this.state.packageData, packageConnfig);

        const updatePackageModal = updateObject(this.state.packageModal, {
            isUpdate: null,
            updateIndex: null,
            showPackageModal: true,
        });

        this.setState({
            ...this.state,
            packageModal: updatePackageModal,
            packageData: updatePackageData,
        });
    }

    setPackageData = (updatePackageData) => {
        this.setState({
            ...this.state,
            packageData: updatePackageData,
        });
    }

    updatePackageModal = (pck, idx) => {
        if (pck !== undefined && idx !== undefined) {
            let packageType = null;
            if (this.props.packageTypes !== null && this.props.packageTypes.length > 0) {
                const pckIndex = this.props.packageTypes.findIndex(pac => pac.key === pck.packageType);
                if (pckIndex >= 0) {
                    const p = this.props.packageTypes[pckIndex];
                    packageType = { value: p.key, label: p.value };
                }
            }
            let typeTestPackage = null;
            if (pck.typeTestPackage !== undefined || pck.typeTestPackage !== null) {
                if (pck.typeTestPackage === 'IndustrialPackage') {
                    typeTestPackage = { value: pck.typeTestPackage, label: "Industrial Package" };
                }else {
                    typeTestPackage = { value: pck.typeTestPackage, label: "Test Package" };
                }
            }

            

            const packageItems = [];
            if (pck.packageItems !== null && pck.packageItems.length > 0 && this.props.itemList !== null) {
                pck.packageItems.forEach(itm => {
                    const itmIndex = this.props.itemList.findIndex(i => i.itemid === itm.itemid);
                    if (itmIndex >= 0) {
                        const itm = this.props.itemList[itmIndex];
                        packageItems.push({ value: itm.itemid, label: itm.itemName + '(' + itm.itemPrice.toFixed(2) + ')' });
                    }
                });
            }

            const updatePackageData = updateObject(this.state.packageData, {
                packageName: pck.packageName,
                packageDescription: pck.packageDescription === null ? '' : pck.packageDescription,
                packagePrice: pck.packagePrice.toString(),
                packageType: packageType,
                packageItems: packageItems,
                active: pck.active,
                taxable: pck.taxable,
                discountable: pck.discountable,
                onMenu: pck.onMenu,
                typeTestPackage: typeTestPackage,
                isErrorPckName: false,
                isErrorPckDesc: false,
                isErrorPckPrice: false,
                isErrorPckTyp: false,
                isErrorPckItm: false,
                pckNameError: null,
                pckDescError: null,
                pckPriceError: null,
                pckTypeError: null,
                pckItmsError: null,
            });

            const updatePackageModal = updateObject(this.state.packageModal, {
                isUpdate: pck.packageid,
                updateIndex: idx,
                showPackageModal: true,
            });

            this.setState({
                ...this.state,
                packageModal: updatePackageModal,
                packageData: updatePackageData,
            });
        }
    }

    closePackageModal = (packageData) => {
        const updatePackageModal = updateObject(this.state.packageModal, {
            showPackageModal: false,
        });
        this.setState({
            ...this.state,
            packageModal: updatePackageModal,
        });

        if (packageData !== null) {
            if (this.state.packageModal.isUpdate !== null) { // update
                if (this.state.packageModal.updateIndex !== null) {
                    this.packagesTableRef.updatePackageToTable(packageData, this.state.packageModal.updateIndex);
                }
                // } else { // add
                //     this.packagesTableRef.addPackageToTable(packageData);
            }
        }
    }

    savePackageClick = () => {
        let packageType = null;
        if (this.state.packageData.packageType !== null) {
            packageType = this.state.packageData.packageType.value;
        }

        let typeTestPackage = null;
        if (this.state.packageData.typeTestPackage !== null) {
            typeTestPackage = this.state.packageData.typeTestPackage.value;
        }

        const packageItems = [];
        this.state.packageData.packageItems.forEach(itm => {
            packageItems.push(itm.value);
        });

        const packageRequest = {
            packageName: this.state.packageData.packageName,
            packageDescription: this.state.packageData.packageDescription === '' ? null : this.state.packageData.packageDescription,
            packagePrice: this.state.packageData.packagePrice,
            packageType: packageType,
            packageItems: packageItems,
            taxable: this.state.packageData.taxable,
            discountable: this.state.packageData.discountable,
            onMenu: this.state.packageData.onMenu,
            typeTestPackage: typeTestPackage,
        }

        let reqMethod = 'post';
        if (this.state.packageModal.isUpdate !== null) {
            reqMethod = 'put';
            packageRequest.packageid = this.state.packageModal.isUpdate;
            packageRequest.active = this.state.packageData.active;
        }

        this.props.onSaveUpdatePackage(this.props.userToken, packageRequest, reqMethod, this.closePackageModal);
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.itemloading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <PackageModal
                    isUpdate={this.state.packageModal.isUpdate}
                    showModal={this.state.packageModal.showPackageModal}
                    closeClick={this.closePackageModal}
                    saveClick={this.savePackageClick}
                    packageData={this.state.packageData}
                    setPackageData={this.setPackageData}
                />
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Packages</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllPackages}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addPackageModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <PackagesTable onRef={ref => (this.packagesTableRef = ref)} updatePackageModal={this.updatePackageModal} />
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
        loading: state.packs.loading,
        error: state.packs.error,
        userToken: state.auth.token,
        itemloading: state.items.loading,
        itemList: state.items.itemList,
        packageList: state.packs.packageList,
        packageTypes: state.packs.packageTypes,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllItems: (token) => dispatch(actions.getAllItems(token)),
        onGetAllPackages: (token) => dispatch(actions.getAllPackages(token)),
        onGetPackageTypes: (token) => dispatch(actions.getPackageTypes(token)),
        onSaveUpdatePackage: (token, packageData, reqType, closePackageModal) => dispatch(actions.saveUpdatePackage(token, packageData, reqType, closePackageModal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Packages))
