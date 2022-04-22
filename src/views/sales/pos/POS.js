import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Swal from 'sweetalert2';

import * as actions from 'src/store/actions/index';
import { updateObject, getPatientDisplay, roundAmount, closeCurrentWindow } from 'src/store/utility';

import {
} from '@coreui/react';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import PatientInfo from 'src/containers/pos/PatientInfo';
import TransactionDetails from 'src/containers/pos/TransactionDetails';
import SummaryDetails from 'src/containers/pos/SummaryDetails';
import CorporateModal from 'src/containers/modal/maintenance/CorporateModal';
import PatientModal from 'src/containers/modal/maintenance/PatientModal';
import AuthorizationModal from 'src/containers/modal/common/AuthorizationModal';
import OnHoldTransactionModal from 'src/containers/modal/transactions/OnHoldTransactionModal';

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

const transactionConfig = {
    statusDisplay: 'NEW',
    status: null,
    id: null,
    transactionid: null,
    txnType: { value: 'TWI', label: 'WALK-IN' },
    // corporateId: null,
    patientId: null,
    dscType: '0',
    currency: 'PHP',
    payType: 'CA',
    payTab: 0,
    taxRate: process.env.REACT_APP_TAX_RATE !== undefined ? parseInt(process.env.REACT_APP_TAX_RATE) : 0,
    taxAmnt: 0,
    discRate: 0,
    discAmnt: 0,
    subTtl: 0,
    amtDue: 0,
    amtRcv: 0,
    amtChg: 0,
    otherAmnt: 0,
    tranDate: null,
    cashier: null,
    bankAmmnt: 0,
    virtualAmnt: 0,


    snrId: null,
    pwdId: null,
    passport: null,

    lockTxnDate: true,

    errPatient: false,
    errReferral: false,
    errItems: false,
    errTendered: false,
    errTxnDate: false,

    remarks: '',
    referral: null,
    dispatch: 'E',
    emailTo: 'questphil.corpresult@gmail.com',
}

const paymentConfig = {
    id: null,
    billerid: null,
    payMode: '',
    bank: '',
    cardChequeNo: '',
    ccType: '',
    ccHolderName: '',
    hmoLOE: '',
    hmoAccountNumber: '',
    hmoApprovalCode: '',
    referenceNumber: '',

    isErrorBiller: false,
    isErrorCCNumber: false,
    isErrorCCHolderName: false,
    isErrorHmoLOE: false,
    isErrorHmoAccNo: false,
    isErrorHmoAppCd: false,
    isErrorRefNo: false,
    otherPayment: false,
}

const corporateConfig = {
    companyName: '',
    companyAddress: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    active: true,
    isErrCName: false,
    isErrCAdd: false,
    isErrCPerson: false,
    isErrCNo: false,
    isErrCEmail: false,
    cnameError: null,
    caddError: null,
    cpersonError: null,
    cnoError: null,
    cemailError: null,
}

const patientConfig = {
    firstname: '',
    lastname: '',
    middlename: '',
    dateOfBirth: null,
    gender: null,
    contactNumber: '',
    email: '',
    address: '',
    corporateId: null,
    seniorId: '',
    pwdId: '',
    passport: '',
    height: '',
    feet: '',
    inch: '',
    weight: '',
    bmi: '',
    nationalityId: null,
    active: '',
    isErrorFirstName: false,
    isErrorLastName: false,
    isErrorMidName: false,
    isErrorDOB: false,
    isErrorContNo: false,
    isErrorEmail: false,
    isErrorAddress: false,
    isErrorCorpId: false,
    isErrorSnrId: false,
    isErrorPwdId: false,
    isErrorNatId: false,
    firstNameError: null,
    lastNameError: null,
    midNameError: null,
    dobError: null,
    contNoError: null,
    emailError: null,
    addressError: null,
    corpIdError: null,
    snrIdError: null,
    pwdIdError: null,
    passportIdError: null,
    natIdError: null,
    isChecked: false,
}

const authConfig = {
    username: '',
    password: '',
    reason: '',

    errUser: false,
    errPass: false,
    errReason: false,
}

export class POS extends Component {
    state = {
        branch: null,
        errBranch: false,
        transaction: transactionConfig,
        transactionItems: [],
        paymentDetails: paymentConfig,
        corporateModal: {
            isUpdate: null,
            updateIndex: null,
            showCorporateModal: false,
        },
        corporateData: corporateConfig,
        patientModal: {
            isUpdate: null,
            updateIndex: null,
            showPatientModal: false,
        },
        patientData: patientConfig,
        withPrint: false,
        showAuthorizationModal: false,
        authorizationData: authConfig,
        authUser: '',
        reason: '',
        onAuthUser: '',
        showOnHoldTxnModal: false,
        disableAllButtons: false,
    }


    componentDidMount() {

        if (this.props.isUpdate) {
            if (this.props.txnID !== null && this.props.txnID !== undefined) {
                this.props.onGetTransaction(this.props.userToken, this.props.txnID, this.loadUpdateTransaction);
            }
        }

        if (this.props.branchList.length <= 0) {
            this.props.onGetAllBranches(this.props.userToken);
        }

        if (this.props.corporateList.length <= 0) {
            this.props.onGetAllCorporates(this.props.userToken);
        }

        if (this.props.nationalityList.length <= 0) {
            this.props.onGetAllNationalities(this.props.userToken);
        }

        if (this.props.patientList.length <= 0) {
            this.props.onGetInitialPatients(this.props.userToken);
        }

        if (this.props.itemList.length <= 0) {
            this.props.onGetAllActiveItems(this.props.userToken);
        }

        if (this.props.packageList.length <= 0) {
            this.props.onGetAllActivePackages(this.props.userToken);
        }

        if (this.props.referralList.length <= 0) {
            this.props.onGetAllReferrals(this.props.userToken);
        }

        if (this.props.paymentBanks.length <= 0) {
            this.props.onGetPaymentBanks(this.props.userToken);
        }
    }

    setTransactionData = (updateTxnData, options = null) => {
        let txnItemList = [...this.state.transactionItems];
        let payDetails = { ...this.state.paymentDetails };

        if (options !== null) {
            if (options.update !== undefined) {
                const updateTable = options.update;
                if (updateTable.discount !== undefined && updateTable.discountType !== undefined) {
                    const newDiscount = updateTable.discount;
                    const newDiscountType = updateTable.discountType;
                    if (this.state.transaction.dscType !== newDiscountType) {

                        let subTotal = 0;
                        let taxAmount = 0;
                        let discountAmount = 0;
                        let amountDue = 0;

                        txnItemList = this.state.transactionItems.map((itm) => {
                            let nDisc = 0;
                            let nDiscTyp = '0';

                            if (itm.discountable) {
                                nDisc = newDiscount;
                                nDiscTyp = newDiscountType;
                            }

                            const newItem = this.computeProductItem(updateObject(itm, {
                                discountRate: nDisc,
                                discountType: nDiscTyp,
                            }));

                            subTotal += newItem.amount;
                            taxAmount += newItem.taxAmount;
                            discountAmount += newItem.discountAmount;
                            amountDue += newItem.amountDue;

                            return newItem;
                        });

                        const changeAmount = this.getReceiveAmount() - amountDue;
                        updateTxnData = updateObject(updateTxnData, {
                            subTtl: subTotal,
                            taxAmnt: taxAmount,
                            discAmnt: discountAmount,
                            amtDue: Number((amountDue).toFixed(2)),
                            amtChg: changeAmount,
                        });
                    }
                }
            }

            if (options.payments !== undefined) {
                payDetails = updateObject(this.state.paymentDetails,
                    {
                        ...options.payments
                    }
                )
            }
        }
        // const transactionData = updateObject(this.state.transaction, {})
        // transactionData.emailTo = updateTxnData.patientId.info.email;
        // this.setState({
        //     ...this.state,
        //     transaction: transactionData
        // });

        this.setState({
            ...this.state,
            transaction: updateTxnData,
            transactionItems: txnItemList,
            paymentDetails: payDetails,
        });
    }

    setSelectedBranch = (selected) => {
        this.setState({
            ...this.state,
            branch: selected,
        })
    }

    /*
    *   CORPORATES
    */
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

    closeCorporateModal = (corporateData) => {
        let updateTxnData = updateObject(this.state.transaction, {});
        if (corporateData !== null) {
            updateTxnData = updateObject(this.state.transaction, {
                corporateId: {
                    value: corporateData.corporateid,
                    label: corporateData.companyName
                }
            });
        }

        const updateCorporateModal = updateObject(this.state.corporateModal, {
            showCorporateModal: false,
        });
        this.setState({
            ...this.state,
            corporateModal: updateCorporateModal,
            transaction: updateTxnData,
        });
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
        }

        if (this.state.corporateData.companyAddress !== "") {
            corporateRequest.companyAddress = this.state.corporateData.companyAddress;
        }
        if (this.state.corporateData.contactPerson !== "") {
            corporateRequest.contactPerson = this.state.corporateData.contactPerson;
        }
        if (this.state.corporateData.contactNumber !== "") {
            corporateRequest.contactNumber = this.state.corporateData.contactNumber;
        }
        if (this.state.corporateData.email !== "") {
            corporateRequest.email = this.state.corporateData.email;
        }

        let reqMethod = 'post';
        if (this.state.corporateModal.isUpdate !== null) {
            reqMethod = 'put';
            corporateRequest.corporateid = this.state.corporateModal.isUpdate;
            corporateRequest.active = this.state.corporateData.active;
        }

        this.props.onSaveUpdateCorporate(this.props.userToken, corporateRequest, reqMethod, this.closeCorporateModal);
    }

    /*
    *   PATIENTS
    */
    addPatientModal = () => {
        let nationality = null;
        if (this.props.nationalityList !== null && this.props.nationalityList.length > 0) {
            const natIndex = this.props.nationalityList.findIndex(nat => nat.id === 167);

            if (natIndex >= 0) {
                const nation = this.props.nationalityList[natIndex];
                nationality = { value: nation.id.toString(), label: nation.countryName + "-" + nation.nationality };
            }
        }

        const updatePatientData = updateObject(this.state.patientData, updateObject(patientConfig, { nationalityId: nationality }));
        const updatePatientModal = updateObject(this.state.patientModal, {
            isUpdate: null,
            updateIndex: null,
            showPatientModal: true,
        });

        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
            patientData: updatePatientData,
        });
    }

    setPatientData = (updatePatientData) => {
        const transactionData = updateObject(this.state.transaction, {})
        if (updatePatientData.email.trim() === "") {
            transactionData.emailTo = "questphil.corpresult@gmail.com"
        } else {
            transactionData.emailTo = updatePatientData.email;
        }
        this.setState({
            ...this.state,
            patientData: updatePatientData,
            transaction: transactionData
        });
    }

    updatePatientModal = (ptnt, idx) => {
        if (ptnt !== undefined && idx !== undefined) {
            let gender = null;
            if (ptnt.gender === 'M') {
                gender = { value: 'M', label: 'MALE' };
            } else if (ptnt.gender === 'F') {
                gender = { value: 'F', label: 'FEMALE' };
            }

            let nationality = null;
            if (this.props.nationalityList !== null && this.props.nationalityList.length > 0 && ptnt.nationality !== null) {
                const natIndex = this.props.nationalityList.findIndex(nat => nat.id === ptnt.nationality.id);

                if (natIndex >= 0) {
                    const nation = this.props.nationalityList[natIndex];
                    nationality = { value: nation.id.toString(), label: nation.countryName + "-" + nation.nationality };
                }
            }

            let company = null;
            if (ptnt.corporate !== null) {
                company = { value: ptnt.corporate.corporateid, label: ptnt.corporate.companyName };
            }
            let feet = ''
            let inch = ''

            if (ptnt.height !== null) {
                let realFeet = (parseInt(ptnt.height) * 0.393700) / 12
                let getFeet = Math.floor(realFeet)
                let getInch = Math.round((realFeet - getFeet) * 12)

                feet = getFeet
                inch = getInch
            }
            const updatePatientData = updateObject(this.state.patientData, {
                firstname: ptnt.firstname,
                lastname: ptnt.lastname,
                middlename: ptnt.middlename === null ? '' : ptnt.middlename,
                dateOfBirth: moment(ptnt.birthDate),
                gender: gender,
                contactNumber: ptnt.contactNumber,
                email: ptnt.email,
                address: ptnt.address,
                corporateId: company,
                seniorId: ptnt.seniorId === null ? '' : ptnt.seniorId,
                pwdId: ptnt.pwdId === null ? '' : ptnt.pwdId,
                passport: ptnt.passport === null ? '' : ptnt.passport,
                height: ptnt.height,
                feet: inch === 12 ? feet + 1 : feet,
                inch: inch === 12 ? 0 : inch,
                weight: ptnt.weight,
                bmi: '',
                nationalityId: nationality,
                active: ptnt.active,
                isErrorFirstName: false,
                isErrorLastName: false,
                isErrorMidName: false,
                isErrorDOB: false,
                isErrorGender: false,
                isErrorContNo: false,
                isErrorEmail: false,
                isErrorAddress: false,
                isErrorCorpId: false,
                isErrorSnrId: false,
                isErrorPwdId: false,
                isErrorNatId: false,
                firstNameError: null,
                lastNameError: null,
                midNameError: null,
                dobError: null,
                genderError: null,
                contNoError: null,
                emailError: null,
                addressError: null,
                corpIdError: null,
                snrIdError: null,
                pwdIdError: null,
                passportIdError: null,
                natIdError: null,
            });

            const updatePatientModal = updateObject(this.state.patientModal, {
                isUpdate: ptnt.patientid,
                updateIndex: idx,
                showPatientModal: true,
            });

            this.setState({
                ...this.state,
                patientModal: updatePatientModal,
                patientData: updatePatientData,
            });
        }
    }

    closePatientModal = (patientData) => {
        let updateTxnData = updateObject(this.state.transaction, {});
        if (patientData !== null) {
            let snrId = this.state.transaction.snrId;
            let pwdId = this.state.transaction.pwdId;
            let passport = this.state.transaction.passport;

            if (patientData.seniorId !== snrId) {
                snrId = patientData.seniorId;
            }

            if (patientData.pwdId !== pwdId) {
                pwdId = patientData.pwdId;
            }

            if (patientData.passport !== passport) {
                passport = patientData.passport;
            }

            updateTxnData = updateObject(this.state.transaction, {
                patientId: {
                    value: patientData.patientid,
                    label: getPatientDisplay(patientData),
                    info: patientData
                },
                snrId: snrId,
                pwdId: pwdId,
                passport: passport,
            });
        }

        const updatePatientModal = updateObject(this.state.patientModal, {
            showPatientModal: false,
        });
        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
            transaction: updateTxnData,
        });

        // update patient information display
        if (patientData !== null) {
            this.patientInfoRef.setPatientInfo(patientData);
        }
    }

    savePatientClick = () => {
        let gender = null;
        if (this.state.patientData.gender !== null) {
            gender = this.state.patientData.gender.value;
        }

        let nationality = null;
        if (this.state.patientData.nationalityId !== null) {
            nationality = this.state.patientData.nationalityId.value;
        }

        let company = null;
        if (this.state.patientData.corporateId !== null) {
            company = this.state.patientData.corporateId.value
        }

        const patientRequest = {
            firstname: this.state.patientData.firstname,
            lastname: this.state.patientData.lastname,
            middlename: this.state.patientData.middlename === '' ? null : this.state.patientData.middlename,
            dateOfBirth: this.state.patientData.dateOfBirth.format("YYYY-MM-DD"),
            contactNumber: this.state.patientData.contactNumber,
            gender: gender,
            email: this.state.patientData.email,
            address: this.state.patientData.address,
            seniorId: this.state.patientData.seniorId === '' ? null : this.state.patientData.seniorId,
            pwdId: this.state.patientData.pwdId === '' ? null : this.state.patientData.pwdId,
            passport: this.state.patientData.passport === '' ? null : this.state.patientData.passport,
            corporateId: company,
            nationalityId: nationality,
            weight: this.state.patientData.weight,
            height: this.state.patientData.height,
        }

        let reqMethod = 'post';
        if (this.state.patientModal.isUpdate !== null) {
            reqMethod = 'put';
            patientRequest.patientid = this.state.patientModal.isUpdate;
            patientRequest.active = this.state.patientData.active;
        }

        this.props.onSaveUpdatePatient(this.props.userToken, patientRequest, reqMethod, this.closePatientModal);
    }

    /*
    *   TRANSACTION ITEM
    */
    addProductToTransaction = (typ, product) => {
        const prod = this.formatProductToTransction(typ, product);
        if (prod !== null) {
            const itemDataList = [...this.state.transactionItems];
            const itemIndex = itemDataList.findIndex(itm => itm.itemid === prod.itemid && itm.itemType === prod.itemType);
            let updProd = null;
            if (itemIndex >= 0) { // update
                // const dataItm = itemDataList[itemIndex];
                // const prodItm = updateObject(dataItm, {
                //     quantity: dataItm.quantity + 1,
                // });
                // updProd = this.computeProductItem(prodItm);
                // itemDataList[itemIndex] = updProd;
            } else { // add
                updProd = this.computeProductItem(prod);
                itemDataList.push(updProd);
            }

            this.computeProductSubTotals(itemDataList);
        }
    }

    deleteProducToTransaction = (idx) => {
        if (idx !== null && idx >= 0) {
            const itemDataList = [...this.state.transactionItems];
            const product = itemDataList[idx];
            if (product !== null) {
                itemDataList.splice(idx, 1);


                let subTotal = 0;
                let taxAmount = 0;
                let discountAmount = 0;
                let amountDue = 0;

                itemDataList.map((prd) => {
                    subTotal += prd.amount;
                    taxAmount += prd.taxAmount;
                    discountAmount += prd.discountAmount;
                    amountDue += prd.amountDue;

                    return prd;
                });

                const changeAmount = this.getReceiveAmount() - amountDue;
                const updateTxnData = updateObject(this.state.transaction, {
                    subTtl: subTotal,
                    taxAmnt: taxAmount,
                    discAmnt: discountAmount,
                    amtDue: Number((amountDue).toFixed(2)),
                    amtChg: changeAmount,
                });

                this.setState({
                    ...this.state,
                    transaction: updateTxnData,
                    transactionItems: itemDataList,
                });
            }
        }
    }

    updateProductToTransaction = (prd, idx) => {
        if (prd !== null && prd !== undefined && idx >= 0) {
            const itemDataList = [...this.state.transactionItems];
            const updProd = this.computeProductItem(prd);
            itemDataList[idx] = updProd;
            this.computeProductSubTotals(itemDataList);
        }
    }

    computeProductSubTotals = (itemDataList) => {
        let subTotal = 0;
        let taxAmount = 0;
        let discountAmount = 0;
        let amountDue = 0;

        itemDataList.map((prd) => {
            subTotal += prd.amount;
            taxAmount += prd.taxAmount;
            discountAmount += prd.discountAmount;
            amountDue += prd.amountDue;

            return prd;
        });

        let changeAmount = 0;
        if (this.state.transaction.txnType.value === 'TWI') {
            changeAmount = this.getReceiveAmount() - amountDue;
        }
        const updateTxnData = updateObject(this.state.transaction, {
            subTtl: subTotal,
            taxAmnt: taxAmount,
            discAmnt: discountAmount,
            amtDue: Number((amountDue).toFixed(2)),
            amtChg: changeAmount,
        });

        this.setState({
            ...this.state,
            transaction: updateTxnData,
            transactionItems: itemDataList,
        });
    }

    computeProductItem = (product) => {
        const amount = product.quantity * product.unitPrice;
        let taxAmount = 0;
        let discountAmount = 0;
        if (product.taxable) {
            if (product.taxRate > 0 && amount > 0) {
                taxAmount = amount * (product.taxRate / 100);
                taxAmount = roundAmount(taxAmount);
            }
        }
        if (product.discountable) {
            if (product.discountRate > 0 && amount > 0) {
                const vatableAmount = amount - taxAmount;

                discountAmount = vatableAmount * (product.discountRate / 100);
                discountAmount = roundAmount(discountAmount);
            }
        }

        let lessAmount = discountAmount;
        if (product.discountType === 'SCD' || product.discountType === 'PWD') {
            lessAmount += taxAmount;
        }
        const amountDue = roundAmount(amount - lessAmount);
        const computed = {
            ...product,
            amount: amount,
            taxAmount: taxAmount,
            discountAmount: discountAmount,
            amountDue: amountDue,
        }

        return computed;
    }

    formatProductToTransction = (typ, product) => {
        let prod = null;
        switch (typ) {
            case 'ITM':
                prod = {
                    touched: false,
                    itemType: 'ITM',
                    itemid: product.itemid,
                    itemDisplay: product.itemDescription,
                    quantity: 1,
                    unitPrice: product.itemPrice,
                    discountRate: this.state.transaction.discRate,
                    discountType: this.state.transaction.dscType,
                    taxable: product.taxable,
                    taxRate: this.state.transaction.taxRate,
                    discountable: product.discountable,
                    info: product
                }
                break;

            case 'PCK':
                prod = {
                    touched: false,
                    deleted: false,
                    itemType: 'PCK',
                    itemid: product.packageid,
                    itemDisplay: product.packageDescription,
                    quantity: 1,
                    unitPrice: product.packagePrice,
                    discountRate: this.state.transaction.discRate,
                    discountType: this.state.transaction.dscType,
                    taxable: product.taxable,
                    taxRate: this.state.transaction.taxRate,
                    discountable: product.discountable,
                    info: product
                }
                break;

            default:
                break;
        }

        return prod;
    }

    /*
    *    PAYMENTS
    */
    setPaymentData = (updatePaymentData, prop = null) => {
        const transactionData = updateObject(this.state.transaction, {})
        if (updatePaymentData.billerid != null) {
            if (prop !== null && prop === "billerid") {
                transactionData.emailTo = updatePaymentData.billerid.email;
            }
        } else {
            transactionData.emailTo = "questphil.corpresult@gmail.com";
        }
        this.setState({
            ...this.state,
            paymentDetails: updatePaymentData,
            transaction: transactionData
        });
    }

    getReceiveAmount = () => {
        let amountReceive = 0;
        if (this.state.transaction.amtRcv !== '') {
            amountReceive = parseFloat(this.state.transaction.amtRcv);
        }
        return amountReceive;
    }


    /*
     * TRANSACTION CRUD
     */
    saveTransaction = (withPrint = false) => {
        Swal.fire({
            html: `<span class="h1 font-weight-bold">Amount Due: ${this.state.transaction.amtDue}</span>
            <br/><span class="h1 text-danger font-weight-bold">Change: ${this.state.transaction.amtChg}</span>
            <br/>Do you want to save this transaction?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({
                    ...this.state,
                    withPrint: withPrint,
                });

                const payMode = this.state.paymentDetails.payMode
                if (payMode === 'ACCT' || payMode === 'APE') {
                    this.validateAuthorization();
                } else {
                    this.validateTransaction("SPD", true);
                }
            }
        })
    }


    validateAuthorization = () => {
        this.setState({
            ...this.state,
            showAuthorizationModal: true,
            authorizationData: authConfig,
            authUser: '',
            reason: '',
            onAuthUser: 'save'
        });
    }

    closeAuthorizeModal = (data) => {
        let authUser = this.state.authUser;
        let reason = this.state.reason;

        if (data !== null) {
            authUser = data.message;
            reason = this.state.authorizationData.reason;
        }

        this.setState({
            ...this.state,
            showAuthorizationModal: false,
            authorizationData: authConfig,
            authUser: authUser,
            reason: reason,
        });

        if (data !== null) {
            if (this.state.onAuthUser === 'cancel') {
                this.processCancelTransaction();
            } else if (this.state.onAuthUser === 'save') {
                this.requestSaveTransaction("SPD", true);
            }
        }
    }

    holdTransaction = () => {
        Swal.fire({
            title: 'Warning!!!',
            text: "Are you sure to hold this transaction? Please be guided that payments will be disregard.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hold',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.validateTransaction("SHO", false);
            }
        })
    }

    validateTransaction = (txnStatus, validatePayment) => {
        let hasError = false;
        let errorBranch = false;
        let errorPatient = false;
        let errorReferral = false;
        let errorItems = false;
        let errorTendered = false;

        let errorBiller = false;
        let errorCCNumber = false;
        let errorCCHolderName = false;

        let errorHmoLOE = false;
        let errorHmoAccNo = false;
        let errorHmoAppCd = false;
        let errorRefNo = false;

        const errorList = [];

        if (this.state.transaction.patientId === null) {
            hasError = true;
            errorPatient = true;
            errorList.push("Please select patient.");
        }

        if ((this.state.transaction.txnType.value === 'TREF' && this.state.transaction.referral === null) ||
            (this.state.transaction.txnType.value === 'TMS' && this.state.transaction.referral === null)) {
            hasError = true;
            errorReferral = true;
            errorList.push("Please select referral.");
        }

        if (this.state.transaction.dispatch !== '' && this.state.transaction.dispatch === 'E' && this.state.transaction.emailTo === '') {
            hasError = true;
            errorList.push("Please enter email to send.");
        }

        if (this.state.transactionItems.length <= 0) {
            hasError = true;
            errorItems = true;
            errorList.push("Please add items on the list.");
        } else {
            if (validatePayment) {
                switch (this.state.transaction.payType) {
                    case 'CA': // CASH
                        if (this.state.transaction.amtChg < 0) {
                            hasError = true;
                            errorTendered = true;
                            errorList.push("Inadequate payment.");
                        }
                        break;

                    case 'B': // BANK
                        if (this.state.paymentDetails.payMode === '') {
                            hasError = true;
                            errorList.push("Bank Type is required.");
                        }
                        if (this.state.paymentDetails.bank === '') {
                            hasError = true;
                            errorList.push("Bank is required.");
                        }
                        if (this.state.paymentDetails.payMode === 'CC') {
                            if (this.state.paymentDetails.ccType === '') {
                                hasError = true;
                                errorList.push("Credit Card Type is required.");
                            }
                            if (this.state.paymentDetails.ccHolderName === '') {
                                hasError = true;
                                errorCCHolderName = true;
                                errorList.push("Credit Card Holder Name is required.");
                            }
                        }
                        if (this.state.paymentDetails.cardChequeNo === '') {
                            hasError = true;
                            errorCCNumber = true;
                            errorList.push("Card/Cheque Number is required.");
                        }

                        break;

                    case 'C': // CHARGE TO
                        if (this.state.paymentDetails.payMode === '') {
                            hasError = true;
                            errorList.push("Charge To Type is required.");
                        }
                        if (this.state.paymentDetails.billerid === null) {
                            hasError = true;
                            errorList.push("Charge To is required.");
                        }
                        if (this.state.paymentDetails.payMode === 'HMO') {
                            if (this.state.paymentDetails.hmoLOE === '') {
                                hasError = true;
                                errorHmoLOE = true;
                                errorList.push("HMO LOE is required.");
                            }

                            if (this.state.paymentDetails.hmoAccountNumber === '') {
                                hasError = true;
                                errorHmoAccNo = true;
                                errorList.push("HMO Account Number is required.");
                            }

                            if (this.state.transaction.amtDue >= 1000 &&
                                this.state.paymentDetails.hmoApprovalCode === '') {
                                hasError = true;
                                errorHmoAppCd = true;
                                errorList.push("HMO Approval Code is required.");
                            }
                        }
                        break;

                    case 'VR': // VIRTUAL
                        if (this.state.paymentDetails.payMode === '') {
                            hasError = true;
                            errorList.push("Virtual Type is required.");
                        }
                        if (this.state.paymentDetails.referenceNumber === '') {
                            hasError = true;
                            errorRefNo = true;
                            errorList.push("Reference Number To is required.");
                        }
                        break;

                    default:
                        break;
                }
            }
        }

        const updateTxnData = updateObject(this.state.transaction, {
            errPatient: errorPatient,
            errReferral: errorReferral,
            errItems: errorItems,
            errTendered: errorTendered,
        });

        const updatePaymentData = updateObject(this.state.paymentDetails, {
            isErrorBiller: errorBiller,
            isErrorCCNumber: errorCCNumber,
            isErrorCCHolderName: errorCCHolderName,

            isErrorHmoLOE: errorHmoLOE,
            isErrorHmoAccNo: errorHmoAccNo,
            isErrorHmoAppCd: errorHmoAppCd,
            isErrorRefNo: errorRefNo,
        });

        this.setState({
            ...this.state,
            transaction: updateTxnData,
            paymentDetails: updatePaymentData,
            errBranch: errorBranch,
        });

        if (hasError) {
            Swal.fire(
                'Error saving transaction!',
                errorList.join("<br>"),
                'error'
            )
        } else {
            if (this.state.transaction.dscType === "SCD" || this.state.transaction.dscType === "PWD") {
                let message = "Please input Senior Citizen ID";
                let lable = "Senior Citizen ID";
                let initValue = this.state.transaction.snrId;
                if (this.state.transaction.dscType === "PWD") {
                    message = "Please input PWD ID";
                    lable = "PWD ID";
                    initValue = this.state.transaction.pwdId;
                }

                Swal.fire({
                    title: message,
                    input: 'text',
                    inputLabel: lable,
                    inputValue: initValue,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return lable + ' is required!';
                        }
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        let snrId = this.state.transaction.snrId;
                        let pwdId = this.state.transaction.pwdId;
                        if (this.state.transaction.dscType === "SCD") {
                            if (this.state.transaction.snrId !== result.value) {
                                snrId = result.value;
                            }
                        } else if (this.state.transaction.dscType === "PWD") {
                            if (this.state.transaction.pwdId !== result.value) {
                                pwdId = result.value;
                            }
                        }
                        const updateTxnData = updateObject(this.state.transaction, {
                            snrId: snrId,
                            pwdId: pwdId,
                        });

                        this.setState({
                            ...this.state,
                            transaction: updateTxnData,
                        });

                        this.checkIfIsUpdate(txnStatus, validatePayment);
                    }
                })
            } else {
                this.checkIfIsUpdate(txnStatus, validatePayment);
            }
        }
    }

    checkIfIsUpdate(txnStatus, validatePayment) {
        if (this.props.isUpdate && this.state.transaction.status !== 'SHO') {
            this.validateAuthorization();
        } else {
            this.requestSaveTransaction(txnStatus, validatePayment);
        }
    }

    requestSaveTransaction = (txnStatus, validatePayment) => {
        const txnList = [];

        this.state.transactionItems.forEach(itm => {
            let discTyp = "NRM";
            if (itm.discountType === "SCD" || itm.discountType === "PWD") {
                discTyp = itm.discountType;
            }

            const pItm = {
                itemid: itm.itemid,
                itemType: itm.itemType,
                quantity: itm.quantity,
                discountRate: itm.discountRate,
                discountType: discTyp,
            };

            if (itm.id !== undefined && itm.id !== null && itm.id !== '') {
                pItm.id = itm.id;
            } else {
                pItm.id = null;
            }

            txnList.push(pItm);
        });


        // let remarks = null;
        // if (this.state.transaction.remarks !== '') {
        //     remarks = this.state.transaction.remarks;
        // }
        const txnRequest = {
            status: txnStatus,
            branchId: process.env.REACT_APP_BRANCH_CODE,
            transactionType: this.state.transaction.txnType.value,
            patientId: this.state.transaction.patientId.value,
            cashierId: this.props.userAuth.userId,
            transactionItems: txnList,
            // remarks: remarks,
            dispatch: this.state.transaction.dispatch,
        }

        let reqMethod = 'post';
        if (this.props.isUpdate) {
            // MODIFY PAGE - SAVE TRANSACTION
            reqMethod = 'put';
            txnRequest.transactionid = this.state.transaction.transactionid;
            if (this.state.transaction.status !== 'SHO') {
                txnRequest.transactionDateTime = moment(this.state.transaction.tranDate).format("YYYY-MM-DD HH:mm:ss");
            }
        } else {
            // NEW PAGE - SAVE ON HOLD TRANSATION
            if (this.state.transaction.status === 'SHO' && this.state.transaction.transactionid !== null) {
                reqMethod = 'put';
                txnRequest.transactionid = this.state.transaction.transactionid;
            }
        }

        if (validatePayment) {
            let payAmount = this.state.transaction.amtRcv;
            if (this.state.transaction.payType !== 'CA') {
                payAmount = this.state.transaction.amtDue;
            }
            const payment = {
                currency: this.state.transaction.currency,
                paymentType: this.state.transaction.payType,
                amount: payAmount,
            };

            const pays = this.state.paymentDetails;
            if (this.props.isUpdate) {
                payment.id = pays.id;
            }

            // billerid: null,
            switch (this.state.transaction.payType) {
                case 'B':
                    payment.paymentMode = pays.payMode;
                    payment.paymentBank = pays.bank;
                    if (pays.payMode === 'CC') {
                        payment.ccType = pays.ccType;
                        payment.ccHolderName = pays.ccHolderName;
                    }
                    payment.cardChequeNumber = pays.cardChequeNo;
                    break;

                case 'C':
                    payment.paymentMode = pays.payMode;
                    payment.billerId = pays.billerid.value;
                    if (pays.payMode === 'HMO') {
                        payment.hmoLOE = pays.hmoLOE;
                        payment.hmoAccountNumber = pays.hmoAccountNumber;
                        payment.hmoApprovalCode = pays.hmoApprovalCode !== '' ? pays.hmoApprovalCode : null;
                    }
                    break;

                case 'VR':
                    payment.paymentMode = pays.payMode;
                    payment.referenceNumber = pays.referenceNumber;
                    break;

                default:
                    break;
            }

            txnRequest.transactionPayments = [payment];
        }

        if (this.state.transaction.dscType === "SCD") {
            txnRequest.seniorCitizenID = this.state.transaction.snrId;
        } else if (this.state.transaction.dscType === "PWD") {
            txnRequest.pwdID = this.state.transaction.pwdId;
        }

        if ((this.state.transaction.txnType.value === 'TREF' && this.state.transaction.referral !== null) || (this.state.transaction.txnType.value === 'TMS' && this.state.transaction.referral !== null)) {
            txnRequest.referralId = this.state.transaction.referral.value;
        }

        if (this.state.transaction.dispatch === 'E' && this.state.transaction.emailTo !== '') {
            txnRequest.emailTo = this.state.transaction.emailTo;
        }

        if (this.state.transaction.txnType.value === 'TAPE') {
            txnRequest.emailTo = this.state.transaction.emailTo;
        }

        const payMode = this.state.paymentDetails.payMode
        if (this.props.isUpdate) {
            txnRequest.authorizeUpdateRequest = {
                authorizeId: this.state.authUser,
                description: this.state.reason
            }
        }
        else if (payMode === 'ACCT' || payMode === 'APE') {
            txnRequest.authorizeUpdateRequest = {
                authorizeId: this.state.authUser,
                description: this.state.reason
            }
        }

        this.props.onSaveUpdateTransaction(this.props.userToken, txnRequest, reqMethod, this.cleanUpFunction);
    }

    cleanUpFunction = (txn) => {
        if (txn.status === "SPD") { // PROCESSED
            if (this.state.withPrint) { // auto pringting of receipt
                this.receiptPrintFunction(txn.transactionid);
            }

            Swal.fire({
                title: 'Transaction Complete.',
                text: "Reference Number [" + txn.transactionid + "]!",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Print Receipt',
                cancelButtonText: 'New Transaction',
                reverseButtons: true,
                allowOutsideClick: false,
                willClose: this.clearTransactionState,
                preConfirm: () => {
                    this.receiptPrintFunction(txn.transactionid)
                    return false
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    this.clearTransactionState();
                    if (this.props.isUpdate) {
                        closeCurrentWindow();
                    }
                }
            })
        } else if (txn.status === "SHO") { // HOLD
            Swal.fire({
                title: 'Transaction is On-Hold.',
                text: "Reference Number[" + txn.transactionid + "]!",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Print Receipt',
                cancelButtonText: 'New Transaction',
                reverseButtons: true,
                allowOutsideClick: false,
                willClose: this.clearTransactionState,
                preConfirm: () => {
                    this.receiptPrintFunction(txn.transactionid)
                    return false
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    this.clearTransactionState();
                    if (this.props.isUpdate) {
                        closeCurrentWindow();
                    }
                }
            })
        } else if (txn.status === "SCA") { // CANCELLED
            Swal.fire({
                title: 'Transaction cancelled.',
                text: "Reference Number[" + txn.transactionid + "]!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'New Transaction',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.clearTransactionState();
                    if (this.props.isUpdate) {
                        closeCurrentWindow();
                    }
                }
            })
        }
    }

    receiptPrintFunction = (txnid) => {
        this.props.onPrintReceipt(this.props.userToken, txnid)
    }

    //clean up transaction state
    clearTransactionState = () => {
        this.setState({
            ...this.state,
            transaction: transactionConfig,
            transactionItems: [],
            paymentDetails: paymentConfig,
            withPrint: false,
        });

        this.patientInfoRef.cleanupDisplay();
        this.props.onClearTransactionData();
    }


    // RELOAD TRANSACTION DATA FOR UPDATE
    loadUpdateTransaction = (txn) => {
        if (txn !== null) {
            if (txn.id !== undefined && txn.id !== null) {
                let lockTxnDate = false;
                let disableAll = false;
                let statDisp = "UNKNOWN";
                switch (txn.status) {
                    case 'SPD':
                        statDisp = "PROCESSED";
                        break;

                    case 'SHO':
                        statDisp = "ON-HOLD";
                        lockTxnDate = true;
                        break;

                    case 'SRE':
                        statDisp = "REFUNDED";
                        lockTxnDate = true;
                        disableAll = true;
                        break;

                    case 'SCA':
                        statDisp = "CANCELLED";
                        lockTxnDate = true;
                        disableAll = true;
                        break;

                    default:
                        break;
                }

                let branch = null;
                if (txn.branch !== undefined && txn.branch !== null) {
                    branch = {
                        value: txn.branch.branchid,
                        label: txn.branch.branchName
                    }
                }

                let corp = null;
                if (txn.corporate !== undefined && txn.corporate !== null) {
                    corp = {
                        value: txn.corporate.corporateid,
                        label: txn.corporate.companyName
                    }
                }

                const patientData = {
                    value: txn.patient.patientid,
                    label: getPatientDisplay(txn.patient),
                    info: txn.patient
                }

                this.patientInfoRef.setPatientInfo(txn.patient);

                let payTab = 0;
                switch (txn.paymentType) {
                    case 'B':
                        payTab = 1;
                        break;

                    case 'C':
                        payTab = 2;
                        break;

                    case 'VR':
                        payTab = 3;
                        break;

                    default:
                        break;
                }

                const payments = {};
                let paymentAmount = 0;
                if (txn.transactionPayments.length > 0) {
                    const pay = txn.transactionPayments[0];
                    paymentAmount = pay.amount;
                    let biller = null;
                    if (pay.biller !== null) {
                        biller = {
                            value: pay.biller.corporateid,
                            label: pay.biller.companyName
                        }
                    }
                    payments.id = pay.id;
                    payments.billerid = biller;
                    payments.ccType = pay.pay;
                    payments.hmoLOE = pay.hmoLOE;
                    payments.hmoAccountNumber = pay.hmoAccountNumber;
                    payments.hmoApprovalCode = pay.hmoApprovalCode;
                    payments.referenceNumber = pay.referenceNumber;
                }
                const updatePaymentData = updateObject(this.state.paymentDetails, payments);

                const discRate = txn.discountRate;
                let discType = String(txn.discountRate);
                if (txn.discountType === 'SCD' || txn.discountType === 'PWD') {
                    discType = txn.discountType;
                }

                let subTotal = 0;
                let taxAmount = 0;
                let discountAmount = 0;
                let amountDue = 0;
                const tranItems = [];
                txn.transactionItems.forEach(itm => {
                    const prod = this.formatProductToTransction(itm.itemType, itm.itemDetails);
                    if (prod !== null) {
                        prod.id = itm.id;
                        prod.quantity = itm.quantity;
                        prod.unitPrice = itm.itemPrice;
                        prod.taxable = itm.taxable;
                        prod.discountable = itm.discountable;
                        prod.discountRate = itm.discountRate;

                        if (itm.discountType === 'SCD' || itm.discountType === 'PWD') {
                            prod.discountType = itm.discountType;
                        } else {
                            prod.discountType = String(itm.discountRate);
                        }

                        const updProd = this.computeProductItem(prod);

                        subTotal += updProd.amount;
                        taxAmount += updProd.taxAmount;
                        discountAmount += updProd.discountAmount;
                        amountDue += updProd.amountDue;

                        tranItems.push(updProd);
                    }
                });

                let paymentType = txn.paymentType;
                if (paymentType === null) {
                    paymentType = 'CA';
                }

                let remarks = '';
                if (txn.remarks !== undefined && txn.remarks !== null) {
                    remarks = txn.remarks;
                }

                const changeAmount = paymentAmount - amountDue;
                const updateTxnData = updateObject(this.state.transaction, {
                    statusDisplay: statDisp,
                    status: txn.status,
                    id: txn.id,
                    transactionid: txn.transactionid,
                    txnType: txn.transactionType,
                    corporateId: corp,
                    patientId: patientData,
                    dscType: discType,
                    currency: 'PHP',
                    payType: paymentType,
                    payTab: payTab,
                    taxRate: txn.taxRate,
                    taxAmnt: taxAmount,
                    discRate: discRate,
                    discAmnt: discountAmount,
                    subTtl: subTotal,
                    amtDue: Number((amountDue).toFixed(2)),
                    amtRcv: paymentAmount,
                    amtChg: changeAmount,

                    snrId: txn.seniorCitizenID,
                    pwdId: txn.pwdID,
                    passport: txn.passport,
                    tranDate: moment(txn.transactionDate),
                    cashier: txn.cashier,

                    lockTxnDate: lockTxnDate,

                    errPatient: false,
                    errReferral: false,
                    errItems: false,
                    errTendered: false,
                    errTxnDate: false,

                    remarks: remarks,
                });

                this.setState({
                    ...this.state,
                    branch: branch,
                    errBranch: false,
                    transaction: updateTxnData,
                    paymentDetails: updatePaymentData,
                    transactionItems: tranItems,
                    disableAllButtons: disableAll,
                });

            } else {
                Swal.fire(
                    'Record not found.',
                    'Transaction reference [' + this.props.txnID + ']',
                    'error'
                )
            }
        }
    }

    cancelTransaction = () => {
        Swal.fire({
            title: "Are you sure to cancel this transaction?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({
                    ...this.state,
                    showAuthorizationModal: true,
                    authorizationData: authConfig,
                    authUser: '',
                    reason: '',
                    onAuthUser: 'cancel',
                });
            }
        })
    }

    setAuthData = (updateAuthData) => {
        this.setState({
            ...this.state,
            authorizationData: updateAuthData,
        });
    }

    validateAuthorizationReq = () => {
        const authRequest = {
            username: this.state.authorizationData.username,
            password: this.state.authorizationData.password,
        }

        this.props.onGetAuthorizeUser(this.props.userToken, authRequest, this.closeAuthorizeModal);
    }

    processCancelTransaction = () => {
        const cancelRequest = {
            transactionid: this.state.transaction.transactionid,
            authorizeId: this.state.authUser,
            description: this.state.reason,
        }

        this.props.onCancelTransaction(this.props.userToken, cancelRequest, this.cleanUpFunction);
    }

    // ON HOLD TRANSACTIONS
    displayOnHoldTxnModal = () => {
        this.props.onViewOnHoldTransaction(this.props.userToken);

        this.setState({
            ...this.state,
            showOnHoldTxnModal: true,
        });
    }

    closeOnHoldTxnModal = () => {
        this.setState({
            ...this.state,
            showOnHoldTxnModal: false,
        });
    }

    loadOnHoldTransaction = (txn, idx) => {
        this.loadUpdateTransaction(txn);
        this.closeOnHoldTxnModal();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="col-md-12">
                <Backdrop className={classes.backdrop} open={this.props.corpsLoading || this.props.ptntsLoading || this.props.itmsLoading || this.props.pcksLoading || this.props.txnLoading}>
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

                <PatientModal
                    isUpdate={this.state.patientModal.isUpdate}
                    showModal={this.state.patientModal.showPatientModal}
                    closeClick={this.closePatientModal}
                    saveClick={this.savePatientClick}
                    patientData={this.state.patientData}
                    setPatientData={this.setPatientData}
                />

                <AuthorizationModal
                    showModal={this.state.showAuthorizationModal}
                    authData={this.state.authorizationData}
                    closeClick={this.closeAuthorizeModal}
                    setAuthData={this.setAuthData}
                    validateAuth={this.validateAuthorizationReq}
                />

                <OnHoldTransactionModal
                    showModal={this.state.showOnHoldTxnModal}
                    closeClick={this.closeOnHoldTxnModal}
                    loadTxn={this.loadOnHoldTransaction}
                />

                <div className="row">
                    <div className="col-12 col-md-5 p-1">
                        <PatientInfo
                            txns={this.state.transaction}
                            branch={this.state.branch}
                            setTxnData={this.setTransactionData}
                            setBranch={this.setSelectedBranch}
                            addCorporate={this.addCorporateModal}
                            addPatient={this.addPatientModal}
                            updatePatient={this.updatePatientModal}
                            addProduct={this.addProductToTransaction}
                            onRef={ref => (this.patientInfoRef = ref)}
                            isUpdate={this.props.isUpdate}
                            disableAllButtons={this.state.disableAllButtons}
                        />
                    </div>
                    <div className="col-12 col-md-7 p-1">
                        <TransactionDetails
                            txns={this.state.transaction}
                            txnItms={this.state.transactionItems}
                            setTxnData={this.setTransactionData}
                            deleteProduct={this.deleteProducToTransaction}
                            updateProduct={this.updateProductToTransaction}
                            isUpdate={this.props.isUpdate}
                            disableAllButtons={this.state.disableAllButtons}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-12 p-1">
                        <SummaryDetails
                            txns={this.state.transaction}
                            branch={this.state.branch}
                            pays={this.state.paymentDetails}
                            itmList={this.state.transactionItems}
                            setTxnData={this.setTransactionData}
                            setPayData={this.setPaymentData}
                            saveTxn={this.saveTransaction}
                            holdTxn={this.holdTransaction}
                            cancelTxn={this.cancelTransaction}
                            isUpdate={this.props.isUpdate}
                            onHoldTxn={this.displayOnHoldTxnModal}
                            clearTxn={this.clearTransactionState}
                            disableAllButtons={this.state.disableAllButtons}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.auth.token,
        userAuth: state.auth.user,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        nationalityList: state.geo.nationalityList,
        branchList: state.bran.branchList,
        ptntsLoading: state.ptnts.loading,
        patientList: state.ptnts.patientList,
        itmsLoading: state.items.loading,
        itemList: state.items.itemList,
        pcksLoading: state.packs.loading,
        packageList: state.packs.packageList,
        txnError: state.txn.error,
        txnLoading: state.txn.loading,
        txnData: state.txn.txnData,
        referralList: state.refs.referralList,
        paymentBanks: state.bran.paymentBanks,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllReferrals: (token) => dispatch(actions.getAllActiveReferrals(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onGetAllNationalities: (token) => dispatch(actions.getAllNationalities(token)),
        onGetAllActiveItems: (token) => dispatch(actions.getAllActiveItems(token)),
        onGetAllActivePackages: (token) => dispatch(actions.getAllActivePackages(token)),
        onGetInitialPatients: (token) => dispatch(actions.getInitialPatients(token)),
        onGetPaymentBanks: (token) => dispatch(actions.getPaymentBanks(token)),
        onSaveUpdateCorporate: (token, corporateData, reqType, closeUserModal) => dispatch(actions.saveUpdateCorporate(token, corporateData, reqType, closeUserModal)),
        onSaveUpdatePatient: (token, patientData, reqType, closePatientModal) => dispatch(actions.saveUpdatePatient(token, patientData, reqType, closePatientModal)),
        onSaveUpdateTransaction: (token, transactionData, reqType, cleanUp) => dispatch(actions.saveUpdateTransaction(token, transactionData, reqType, cleanUp)),
        onGetTransaction: (token, transactionId, loadFunction) => dispatch(actions.getTransaction(token, transactionId, loadFunction)),
        onClearTransactionData: () => dispatch(actions.transactionClearData()),
        onPrintReceipt: (token, transactionId) => dispatch(actions.printReceipt(token, transactionId)),
        onGetAuthorizeUser: (token, authData, closeAuthModal) => dispatch(actions.getAuthorizeUser(token, authData, closeAuthModal)),
        onCancelTransaction: (token, cancelData, cleanUp) => dispatch(actions.cancelTransaction(token, cancelData, cleanUp)),
        onViewOnHoldTransaction: (token) => dispatch(actions.viewOnHoldTransactions(token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(POS))
