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

import ItemModal from 'src/containers/modal/maintenance/ItemModal';
import ItemsTable from 'src/containers/tables/maintenance/ItemsTable';

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



const itemConfig = {
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    itemCategory: null,
    itemLaboratory: null,
    itemLaboratoryProcedure: null,
    itemLaboratoryServices: [],
    active: true,
    taxable: true,
    discountable: true,
    onMenu: false,
    isLaboratory: false,
    isService: false,
    isSpecific: false,
    isErrorItemName: false,
    isErrorItemDesc: false,
    isErrorItemPrice: false,
    isErrorItemCat: false,
    isErrorItemLab: false,
    isErrorItemLabProc: false,
    isErrorItemLabServ: false,
    itemNameError: null,
    itemDescError: null,
    itemPriceError: null,
    itemCatError: null,
    itemLabError: null,
    itemLabProcError: null,
    itemLabServError: null,
    specificTest: null,
}

export class Items extends Component {
    state = {
        itemModal: {
            isUpdate: null,
            updateIndex: null,
            showItemModal: false,
        },
        itemData: itemConfig,
    }

    componentDidMount() {
        if (this.props.laboratoryList.length <= 0) {
            this.props.onGetItemLaboratories(this.props.userToken);
        }

        if (this.props.categoryList.length <= 0) {
            this.props.onGetItemCategories(this.props.userToken);
        }

        if (this.props.procedureList.length <= 0) {
            this.props.onGetLaboratoryProcedures(this.props.userToken);
        }

        if (this.props.serviceList.length <= 0) {
            this.props.onGetLaboratoryServices(this.props.userToken);
        }

    }

    viewAllItems = () => {
        this.props.onGetAllItems(this.props.userToken);
    }

    addItemModal = () => {
        const updateItemData = updateObject(this.state.itemData, itemConfig);
        updateItemData.itemPrice = '0';
        updateItemData.itemLaboratory = { value: 'NO', label: 'NONE' };

        const updateItemModal = updateObject(this.state.itemModal, {
            isUpdate: null,
            updateIndex: null,
            showItemModal: true,
        });

        this.setState({
            ...this.state,
            itemModal: updateItemModal,
            itemData: updateItemData,
        });
    };

    updateItemModal = (itm, idx) => {
        if (itm !== undefined && idx !== undefined) {
            let isLab = false;
            let isSer = false;
            if (itm.itemLaboratoryProcedure !== null) {
                isLab = true;
                isSer = true;
            }

            let category = null;
            if (this.props.categoryList !== null && this.props.categoryList.length > 0) {
                const catIndex = this.props.categoryList.findIndex(cat => cat.key === itm.itemCategory);
                if (catIndex >= 0) {
                    const ctg = this.props.categoryList[catIndex];
                    category = { value: ctg.key, label: ctg.value };
                }
            }

            let laboratory = null;
            if (this.props.laboratoryList !== null && this.props.laboratoryList.length > 0) {
                const labIndex = this.props.laboratoryList.findIndex(lab => lab.key === itm.itemLaboratory);
                if (labIndex >= 0) {
                    const lbr = this.props.laboratoryList[labIndex];
                    laboratory = { value: lbr.key, label: lbr.value };
                }
            }

            let procedure = null;
            if (this.props.procedureList !== null && this.props.procedureList.length > 0 && itm.itemLaboratoryProcedure !== null) {
                const proIndex = this.props.procedureList.findIndex(pro => pro.key === itm.itemLaboratoryProcedure);
                if (proIndex >= 0) {
                    const prc = this.props.procedureList[proIndex];
                    procedure = { value: prc.key, label: prc.value };
                }
            }

            const itemServices = [];
            if (itm.itemLaboratoryProcedure !== null && itm.serviceRequest !== null && itm.serviceRequest.length > 0 && this.props.serviceList !== null) {
                if (itm.itemLaboratoryProcedure in this.props.serviceList) {
                    const svrList = this.props.serviceList[itm.itemLaboratoryProcedure];
                    itm.serviceRequest.forEach(srv => {
                        const svrIndex = svrList.findIndex(s => s.key === srv.laboratoryRequest);
                        if (svrIndex >= 0) {
                            const sp = svrList[svrIndex];
                            itemServices.push({ value: sp.key, label: sp.value });
                        }
                    });
                }
            }
            const updateItemData = updateObject(this.state.itemData, {
                itemName: itm.itemName,
                itemDescription: itm.itemDescription === null ? '' : itm.itemDescription,
                itemPrice: itm.itemPrice.toString(),
                itemCategory: category,
                itemLaboratory: laboratory,
                itemLaboratoryProcedure: procedure,
                itemLaboratoryServices: itemServices,
                active: itm.active,
                taxable: itm.taxable,
                discountable: itm.discountable,
                onMenu: itm.onMenu,
                isLaboratory: isLab,
                isService: isSer,
                isErrorItemName: false,
                isErrorItemDesc: false,
                isErrorItemPrice: false,
                isErrorItemCat: false,
                isErrorItemLab: false,
                isErrorItemLabProc: false,
                isErrorItemLabServ: false,
                itemNameError: null,
                itemDescError: null,
                itemPriceError: null,
                itemCatError: null,
                itemLabError: null,
                itemLabProcError: null,
                itemLabServError: null,
                specificTest: itm.specificTest,
            });

            const updateItemModal = updateObject(this.state.itemModal, {
                isUpdate: itm.itemid,
                updateIndex: idx,
                showItemModal: true,
            });

            this.setState({
                ...this.state,
                itemModal: updateItemModal,
                itemData: updateItemData,
            });
        }
    }

    setItemData = (updateItemData) => {
        this.setState({
            ...this.state,
            itemData: updateItemData,
        });
    }

    closeItemModal = (itemData) => {
        const updateItemModal = updateObject(this.state.itemModal, {
            showItemModal: false,
        });
        this.setState({
            ...this.state,
            itemModal: updateItemModal,
        });

        if (itemData !== null) {
            if (this.state.itemModal.isUpdate !== null) { // update
                if (this.state.itemModal.updateIndex !== null) {
                    this.itemsTableRef.updateItemToTable(itemData, this.state.itemModal.updateIndex);
                }
                // } else { // add
                //     this.itemsTableRef.addItemToTable(itemData);
            }
        }
    }

    saveItemClick = () => {
        let category = null;
        if (this.state.itemData.itemCategory !== null) {
            category = this.state.itemData.itemCategory.value;
        }

        let laboratory = null;
        if (this.state.itemData.itemLaboratory !== null) {
            laboratory = this.state.itemData.itemLaboratory.value;
        }

        let procedure = null;
        if (this.state.itemData.itemLaboratoryProcedure !== null) {
            procedure = this.state.itemData.itemLaboratoryProcedure.value;
        }

        const serviceRequest = [];
        this.state.itemData.itemLaboratoryServices.forEach(svr => {
            serviceRequest.push(svr.value);
        });

        const itemRequest = {
            itemName: this.state.itemData.itemName,
            itemDescription: this.state.itemData.itemDescription === '' ? null : this.state.itemData.itemDescription,
            itemPrice: this.state.itemData.itemPrice,
            itemCategory: category,
            itemLaboratory: laboratory,
            itemLaboratoryProcedure: procedure,
            serviceRequest: serviceRequest,
            taxable: this.state.itemData.taxable,
            discountable: this.state.itemData.discountable,
            onMenu: this.state.itemData.onMenu,
            specificTest: this.state.itemData.specificTest,
        }

        let reqMethod = 'post';
        if (this.state.itemModal.isUpdate !== null) {
            reqMethod = 'put';
            itemRequest.itemid = this.state.itemModal.isUpdate;
            itemRequest.active = this.state.itemData.active;
        }

        this.props.onSaveUpdateItem(this.props.userToken, itemRequest, reqMethod, this.closeItemModal);
    }

    render() {
        const { classes } = this.props;
        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <ItemModal
                    isUpdate={this.state.itemModal.isUpdate}
                    showModal={this.state.itemModal.showItemModal}
                    closeClick={this.closeItemModal}
                    saveClick={this.saveItemClick}
                    itemData={this.state.itemData}
                    setItemData={this.setItemData}
                />
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Items/Services</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllItems}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addItemModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <ItemsTable onRef={ref => (this.itemsTableRef = ref)} updateItemModal={this.updateItemModal} />
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
        loading: state.items.loading,
        error: state.items.error,
        userToken: state.auth.token,
        itemList: state.items.itemList,
        categoryList: state.items.itemCategories,
        laboratoryList: state.items.itemLaboratories,
        procedureList: state.items.laboratoryProcedures,
        serviceList: state.items.laboratoryServices,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllItems: (token) => dispatch(actions.getAllItems(token)),
        onGetItemLaboratories: (token) => dispatch(actions.getItemLaboratories(token)),
        onGetItemCategories: (token) => dispatch(actions.getItemCategories(token)),
        onGetLaboratoryProcedures: (token) => dispatch(actions.getLaboratoryProcedures(token)),
        onGetLaboratoryServices: (token) => dispatch(actions.getLaboratoryServices(token)),
        onSaveUpdateItem: (token, itemData, reqType, closeItemModal) => dispatch(actions.saveUpdateItem(token, itemData, reqType, closeItemModal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Items))
