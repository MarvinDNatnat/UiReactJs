import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CRow,
} from '@coreui/react';

import { InputLabel } from '@material-ui/core';
import * as actions from 'src/store/actions/index';
import Swal from 'sweetalert2';
import ReactSelect from 'react-select';
import Items from 'src/views/main_records/patients/Items'


const chargeTypeMap = [
    { value: 'ACCT', label: 'ACCOUNT' },
    { value: 'APE', label: 'APE' },
    { value: 'MMO', label: 'MEDICAL MISSION' },
]

const txnOptions = [
    { value: 'TAPE', label: 'APE' },
    { value: 'TCH', label: 'CHARGE' },
    { value: 'TMM', label: 'MEDICAL MISSION' },
]

const ImportModal = (props) => {

    const [csvAttach, setCsvAttach] = useState();
    const [fileName, setFileName] = useState();
    const [txnType, setTxnType] = useState();
    const [txnItems, setTxnItems] = useState([]);
    const [paymentData, setPaymentData] = useState([]);
    const [totalaMount, setTotalAmount] = useState(0);
    const [company, SetCompany] = useState();

    const [listItems, setListtems] = useState([]);

    useEffect(() => {
        setCsvAttach("");
        setFileName("");
        SetCompany("")
    }, []);

    const sum = (price) => {
        setTotalAmount(totalaMount + price);
    }

    useEffect(() => {
        setPaymentData({
            ...paymentData,
            amount: totalaMount,
            currency: "PHP",
            paymentType: "C",
        })
    }, [totalaMount])

    const transactionItems = {
        discountRate: 0,
        discountType: "NRM",
        id: null,
        itemType: "",
        itemid: "",
        quantity: 1
    }

    const Listitems = {
        id: "",
        name: "",
        price: ""
    }



    const itemCollection = (data, itemType) => {
        if (data.info.packageName !== undefined) {
            let filter = listItems.filter(like => like.id === data.info.packageid)
            if (filter.length === 0) {
                Listitems.id = data.info.packageid;
                Listitems.name = data.info.packageName;
                Listitems.price = data.info.packagePrice
                setListtems(itemName => [...itemName, Listitems]);
            }
        } else {
            let filter = listItems.filter(like => like.id === data.info.itemid)
            if (filter.length === 0) {
                Listitems.id = data.info.itemid;
                Listitems.name = data.info.itemName;
                Listitems.price = data.info.itemPrice
                setListtems(itemName => [...itemName, Listitems]);
            }
        }

        if (data != null || data !== undefined) {
            let filter = txnItems.filter(like => like.itemid === data.value)
            if (filter.length === 0) {
                transactionItems.itemid = data.value;
                transactionItems.itemType = itemType;
                setTxnItems(txnItems => [...txnItems, transactionItems]);
            }
        }
    }

    const handleSelectPackage = (selectedOption) => {
        itemCollection(selectedOption, "PCK");
        sum(selectedOption.info.packagePrice);
    }

    const handleSelectItem = (selectedOption) => {
        itemCollection(selectedOption, "ITM");
        sum(selectedOption.info.itemPrice);
    }

    const handleSelectCorporate = (selectedOption) => {
        SetCompany(selectedOption.value);
        setPaymentData({ ...paymentData, billerId: selectedOption.value })
    }

    const handleChange = (props) => (event) => {
        switch (props) {
            case 'files':
                setCsvAttach(event.target.files);
                if (event.target.files[0] != null || event.target.files[0] !== undefined) {
                    setFileName(event.target.files[0].name);
                } else {
                    setFileName();
                }
                break;
            case 'txnType':
                if (event != null) {
                    setTxnType(event.value);
                }
                break;
            case 'chargeType':
                if (event != null) {
                    setPaymentData({ ...paymentData, paymentMode: event.value })
                }
                break;
            default:
                break;
        }
    }

    const validateInputs = () => {
        const txnListpayment = [];

        txnListpayment.push(paymentData);

        const txnListItems = [];
        txnItems.forEach(itm => {
            const transactionItems = {
                itemid: itm.itemid,
                itemType: itm.itemType,
                quantity: itm.quantity,
                discountRate: itm.discountRate,
                discountType: "NRM",
                id: null,
            };
            txnListItems.push(transactionItems);
        })

        const dataReq = new FormData();
        dataReq.append("csvFiles", csvAttach[0]);
        dataReq.append("transactionItems", JSON.stringify(txnListItems));
        dataReq.append("transactionType", txnType);
        dataReq.append("corporate", company);
        dataReq.append("branchId", "jTDxJb");
        dataReq.append("cashierId", props.userAuth.userId);
        dataReq.append("transactionPayments", JSON.stringify(txnListpayment));


        Swal.fire({
            title: 'Upload',
            text: "Are you sure you want to upload this file?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                props.saveFile(props.userToken, dataReq);
            }
        })
    }

    const deleteHandler = id => {
        const newList = listItems.filter((item) => item.id !== id);
        const newTotal = listItems.filter((item) => item.id === id);

        setTotalAmount(totalaMount - newTotal[0].price);

        setListtems(newList);
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='lg'
        >
            <CModalHeader closeButton>
                <CModalTitle>Import Patients</CModalTitle>
            </CModalHeader>

            <CModalBody>
                <CRow className="m-1 p-0">
                    <CCol md="6" className="col-6 m-0 p-0">
                        <InputLabel>.csv file only</InputLabel>
                    </CCol>
                    <CCol md="6" className="col-6 m-0 p-0">
                        <InputLabel>Transaction Type</InputLabel>
                    </CCol>
                </CRow>
                <CRow className="m-1 p-0">
                    <CCol md="6" className="col-6 m-0 p-0 pr-2">
                        <div className="custom-file">
                            <input
                                type="file"
                                name="file"
                                className="custom-file-input"
                                id="customFile"
                                accept=".csv"
                                onChange={handleChange('files')}
                            />
                            <label
                                className="custom-file-label"
                                htmlFor="customFile"

                            >
                                {fileName !== undefined ? fileName : null}
                            </label>
                        </div>
                    </CCol>

                    <CCol md="6" className="col-6 m-0 p-0 pr-2">
                        <ReactSelect
                            className="basic-single"
                            placeholder="--"
                            isClearable={true}
                            isSearchable={true}
                            isLoading={false}
                            onChange={handleChange('txnType')}
                            options={txnOptions}
                        />
                    </CCol>
                </CRow>
                <CRow className="m-1 p-0">

                    <CCol md="6" className="col-6 m-0 p-0">
                        <InputLabel>Charge Type</InputLabel>
                    </CCol>
                    <CCol md="6" className="col-6 m-0 p-0">

                        <InputLabel>company</InputLabel>
                    </CCol>

                </CRow>
                <CRow className="m-1 p-0">

                    <CCol md="6" className="col-6 m-0 p-0 pr-2">
                        <ReactSelect
                            className="basic-single"
                            placeholder="--"
                            isClearable={true}
                            isSearchable={true}
                            isLoading={false}
                            onChange={handleChange('chargeType')}
                            options={chargeTypeMap}
                        />
                    </CCol>
                    <CCol md="6" className="col-6 m-0 p-0 pr-2">
                        <ReactSelect
                            className="basic-single"
                            placeholder="--"
                            isClearable={true}
                            isSearchable={true}
                            isLoading={false}
                            onChange={handleSelectCorporate}
                            options={
                                [].concat(props.corporateList)
                                    .sort((a, b) => a.companyName > b.companyName ? 1 : -1)
                                    .map((corp) => {
                                        return { value: corp.corporateid, label: corp.companyName }
                                    })}
                        />
                    </CCol>

                </CRow>
                <CRow className="m-1 p-0">
                    <CCol md="6" className="col-6 m-0 p-0">
                        <InputLabel>Items</InputLabel>
                    </CCol>
                    <CCol md="6" className="col-6 m-0 p-0">

                        <InputLabel>Package</InputLabel>
                    </CCol>

                </CRow>
                <CRow className="m-1 p-0">
                    <CCol md="6" className="col-6 m-0 p-0 pr-2">
                        <ReactSelect
                            className="basic-single"
                            placeholder="Items/Services"
                            // value={this.state.selectedItem}
                            onChange={handleSelectItem}
                            isClearable={false}
                            isSearchable={true}
                            isLoading={props.itmsLoading}
                            options={
                                [].concat(props.itemList)
                                    .filter(i => i.active === true)
                                    .sort((a, b) => a.itemName > b.itemName ? 1 : -1)
                                    .map((itm) => {
                                        return {
                                            value: itm.itemid,
                                            label: itm.itemName + " [" + itm.itemDescription + "] (" + itm.itemPrice.toFixed(2) + ")",
                                            info: itm
                                        }
                                    })
                            }
                        />
                    </CCol>
                    <CCol md="6" className="col-6 m-0 p-0 pr-2">
                        <ReactSelect
                            className="basic-single"
                            placeholder="Packages"
                            // value={this.selectedPackage}
                            onChange={handleSelectPackage}
                            isClearable={false}
                            isSearchable={true}
                            isLoading={props.pcksLoading}
                            options={
                                [].concat(props.packageList)
                                    .filter(p => p.active === true)
                                    .sort((a, b) => a.packageName > b.packageName ? 1 : -1)
                                    .map((pck) => {
                                        return {
                                            value: pck.packageid,
                                            label: pck.packageName + " (" + pck.packagePrice.toFixed(2) + ")",
                                            info: pck
                                        }
                                    })
                            }
                        />
                    </CCol>
                </CRow>
                <CRow className="m-1 p-0">
                    <CCol md="12" className="col-6 m-0 p-0 pr-2">
                        {listItems.length > 0 ?
                            (
                                <Items
                                    items={listItems}
                                    totalAmt={totalaMount}
                                    delHandler={deleteHandler}
                                />
                            )
                            : null
                        }
                    </CCol>
                </CRow>


            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="success"
                    onClick={validateInputs}
                >Save</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.users.loading,
        error: state.users.error,
        userToken: state.auth.token,
        userInfoList: state.users.userInfoList,
        userRoleList: state.users.roleList,
        itmsLoading: state.items.loading,
        userAuth: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveFile: (token, file) => dispatch(actions.saveFile(token, file)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportModal)

