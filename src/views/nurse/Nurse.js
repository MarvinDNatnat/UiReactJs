import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import * as actions from 'src/store/actions/index';
import { withStyles } from '@material-ui/core/styles';
import { doctorName, updateObject } from 'src/store/utility';
import ReactSelect from 'react-select';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from "@material-ui/pickers";

import MomentUtils from '@date-io/moment';
import moment from 'moment';
import clsx from 'clsx';

import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

import NurseTable from 'src/containers/tables/NurseTable';
import ClassificationModal from 'src/containers/modal/nurse/ClassficationModal';
import SpecimenModal from 'src/containers/modal/nurse/SpecimenModal';
import QualityControlModal from 'src/containers/modal/nurse/QualityControlModal';

import EmailModal from 'src/containers/modal/common/EmailModal'


import axiosApi from 'src/axios-api';
import { Toast, getErrorMessage } from 'src/store/sweetAlert';
const config = {
    method: 'get',
    url: 'transactions/pending_count',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
    },
};


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

const nurseConfig = {
    id: null,
    txnId: '',
    txnType: '',
    branch: null,
    patient: null,
    corporate: null,
    laboratoryRequest: [],
    specimenRequirements: [],
    cashier: null,
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
    classInfo: {
        classType: '',
        classDesc: '',
        overAllFindings: ''
    },
    doctor: '',
}

const classOptionsMap = new Map([
    ['A', 'CLASS A'],
    ['B', 'CLASS B'],
    ['C', 'CLASS C'],
    ['D', 'CLASS D'],
    ['E', 'CLASS E'],
    ['F', 'CLASS F'],
    ['P', 'PENDING'],
])

const classDescMap = new Map([
    ['A', 'Fit to work.'],
    ['B', 'Physically fit but with minor condition curable within a short period of time, that will not adversely affect the workers efficiency.'],
    ['C', 'With abnormal findings generally not acceptable for employment.'],
    ['D', 'Unemployable'],
    ['E', 'Incomplete'],
    ['F', 'Pending with findings'],
    ['P', 'These are cases that are equivocal as to the classification are being evaluated further.'],
])

const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}


class Nurse extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        itemId: null,
        showSSModal: false,
        showClsModal: false,
        showQCModal: false,
        emailModal: false,

        emailData: emailConfig,
        nurseData: nurseConfig,

        selectedBranch: null,
        selectedChargeTo: null,
        selectedCompany: null,

        disableChargeTo: false,
        disableCompany: false,
        excelButtonDisabled: true,
        count: 0,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            axiosApi(config)
                .then(response => {
                    this.setState({
                        ...this.state,
                        count: response.data
                    });
                })
                .catch(error => {
                    const errmsg = getErrorMessage(error);
                    if (errmsg != null) {
                        Toast.fire({
                            icon: 'error',
                            title: errmsg
                        });
                    }
                });
        }
    }

    componentDidMount() {
        axiosApi(config)
            .then(response => {
                this.setState({
                    ...this.state,
                    count: response.data
                });
            })
            .catch(error => {
                const errmsg = getErrorMessage(error);
                if (errmsg != null) {
                    Toast.fire({
                        icon: 'error',
                        title: errmsg
                    });
                }
            });

        if (this.props.laboratoryList.length <= 0) {
            this.props.onGetItemLaboratories(this.props.userToken);
        }
        if (this.props.doctorList.length <= 0) {
            this.props.onGetAllDoctors(this.props.userToken);
        }
        if (this.props.branchList.length <= 0) {
            this.props.onGetAllBranches(this.props.userToken);
        }
        if (this.props.corporateList.length <= 0) {
            this.props.onGetAllCorporates(this.props.userToken);
        }
        this.props.onGetDoctor(this.props.userToken, process.env.REACT_APP_DOCTOR)
    }


    handleSelectChange = (opt) => (event) => {
        if (opt === "selectedChargeTo" && event !== null) {
            this.setState({
                ...this.state,
                [opt]: event,
                disableCompany: true,
                excelButtonDisabled: false,
            });
        } else if (opt === "selectedCompany" && event !== null) {
            this.setState({
                ...this.state,
                [opt]: event,
                disableChargeTo: true,
            });
        } else {
            this.setState({
                ...this.state,
                [opt]: event,
                disableChargeTo: false,
                disableCompany: false,
                excelButtonDisabled: true,
            });
        }
    }

    setNurseData = (updateNrsData) => {
        this.setState({
            ...this.state,
            nurseData: updateNrsData,
        });
    }

    viewTransactions = () => {
        this.props.onClearLaboratoryList('NRS');
        this.props.onClearPendingLaboratoryList();
        this.props
            .onViewNRSList(
                this.props.userToken,
                'NRS',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                {
                    branchId: this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                    chargeTo: this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
                    company: this.state.selectedCompany !== null ? this.state.selectedCompany.value : null,
                }
            )
    }

    viewPendingTransactions = () => {
        this.props.onClearLaboratoryList('NRS');
        this.props.onClearPendingLaboratoryList();
        this.props.onGetAllPending(this.props.userToken);
    }

    generateExcel = () => {
        this.props.onClearLaboratoryList('NRS');
        this.props
            .onGenerateExcelList(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                {
                    branchId: this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                    chargeTo: this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
                    company: this.state.selectedCompany !== null ? this.state.selectedCompany.value : null,
                }
            )
    }

    generateExcelCupmedar = () => {
        this.props.onClearLaboratoryList('NRS');
        this.props
            .onGenerateExcelListCupmedar(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                {
                    branchId: this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                    chargeTo: this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
                    company: this.state.selectedCompany !== null ? this.state.selectedCompany.value : null,
                }
            )
    }

    openSubmitSpecimenModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const labRequest = [];

            data.transactionItems.forEach(item => {
                item.itemLaboratories.forEach(lab => {
                    labRequest.push(lab);
                });
            });

            if (labRequest.length > 0) {
                const updateNrsData = this.getNrsInfo(data, labRequest);

                this.setState({
                    ...this.state,
                    showSSModal: true,
                    updateIndex: idx,
                    nurseData: updateNrsData,
                });

            } else {
                Swal.fire(
                    'Error.',
                    'Sorry, no laboratory request found.',
                    'error'
                );
            }
        }
    }

    submitSpecimen = () => {
        const submit = [];
        this.state.nurseData.specimenRequirements.forEach(lab => {
            const item = {
                id: lab.id,
                itemLaboratory: lab.itemLaboratory,
                isSubmitted: lab.submitted
            }
            submit.push(item);
        });

        this.props.onSubmitSpecimen(this.props.userToken,
            { submitRequirements: submit },
            this.state.nurseData.txnId,
            this.closeNurseDisplayModal)
    }

    openClassifinationModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const labRequest = [];

            let itmId = null;
            let hasPackage = false;
            for (const item of data.transactionItems) {
                if (item.itemType === "PCK") {
                    item.itemLaboratories.forEach(lab => {
                        labRequest.push(lab);
                    });
                    hasPackage = true;
                    itmId = item.id;
                }

                if (hasPackage) {
                    break;
                }
            }

            if (labRequest.length > 0) {
                const updateNrsData = this.getNrsInfo(data, labRequest, itmId);

                this.setState({
                    ...this.state,
                    showClsModal: true,
                    updateIndex: idx,
                    itemId: itmId,
                    nurseData: updateNrsData,
                });

            } else {
                Swal.fire(
                    'Error.',
                    'Sorry, no laboratory request found.',
                    'error'
                );
            }
        }
    }

    saveClassifications = () => {
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
                let classParams = null
                const classType = this.state.nurseData.classInfo.classType
                if (classType !== null && classType !== "") classParams = classType.value

                let classFindings = null
                const clsFind = this.state.nurseData.classInfo.overAllFindings
                if (clsFind !== '') classFindings = clsFind

                let patho = null
                if (this.state.nurseData.doctor !== null) patho = this.state.nurseData.doctor.pathologist.value

                const classRequest = {
                    classification: classParams,
                    overAllFindings: classFindings,
                    doctorId: patho
                }

                const transid = this.state.nurseData.txnId;
                const itemid = this.state.itemId;

                this.props.onSaveNurseClassification(this.props.userToken, classRequest, transid, itemid, this.closeNurseDisplayModal)

                axiosApi(config)
                    .then(response => {
                        this.setState({
                            ...this.state,
                            count: response.data.length
                        });
                    })
                    .catch(error => {
                        const errmsg = getErrorMessage(error);
                        if (errmsg != null) {
                            Toast.fire({
                                icon: 'error',
                                title: errmsg
                            });
                        }
                    });
            }
        })

    }

    closeNurseDisplayModal = (nrsResponse) => {
        this.setState({
            ...this.state,
            showClsModal: false,
            showSSModal: false,
            showQCModal: false,
            emailModal: false
        });

        if (nrsResponse !== null) {
            if (this.state.updateIndex !== null) {
                this.nurseTableRef.updateNurseToTable(nrsResponse, this.state.updateIndex);
            }
        }
    }

    getNrsInfo = (data, labReq, itemId = null) => {
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let cashier = null;
        let txnRemarks = null;
        let txnDate = '';
        let txnDispatch = null;

        if (data !== null) {
            txnId = data.transactionid;
            txnSR = data.id;
            txnType = data.transactionType;
            branch = data.branch;
            patient = data.patient;
            corporate = data.corporate;
            cashier = data.cashier;
            txnRemarks = data.remarks;
            txnDate = data.transactionDate;
            txnDispatch = data.dispatch;
        }

        const spcReq = [];
        labReq.forEach(lab => {
            let required = '';

            const labIndex = this.props.laboratoryList.findIndex(itm => itm.key === lab.itemLaboratory);
            if (labIndex >= 0) {
                required = this.props.laboratoryList[labIndex].value;
            }

            const svr = {
                id: lab.id,
                submitted: lab.submitted,
                status: lab.status,
                verified: lab.verified,
                verifiedDate: lab.verifiedDate,
                requirement: required,
                service: lab.itemDetails.itemDescription,
                itemLaboratory: lab.itemLaboratory,
            }

            spcReq.push(svr);
        });

        const updateNrsData = updateObject(nurseConfig, {
            id: data.id, // txn id
            txnId: txnId,
            txnSR: txnSR,
            txnType: txnType,
            patient: patient,
            branch: branch,
            corporate: corporate,
            laboratoryRequest: labReq,
            specimenRequirements: spcReq,
            cashier: cashier,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });

        let pckItem = null;
        if (itemId !== null) {
            let hasPackage = false;
            for (const item of data.transactionItems) {
                if (item.itemType === "PCK") {
                    if (itemId === item.id) {
                        pckItem = item;
                        hasPackage = true;
                    }
                }

                if (hasPackage) {
                    break;
                }
            }
        }

        let overAllFindings = '';
        let classType = null;
        let classDesc = null;
        let patho = null;
        let qualityControl = null;
        if (pckItem !== null) {
            if (pckItem.classifyDoctor !== null) {
                patho = {
                    pathologist: {
                        value: pckItem.classifyDoctor.doctorid,
                        label: doctorName(pckItem.classifyDoctor),
                        license: pckItem.classifyDoctor.licenseNumber
                    }
                }
            } else if (this.props.doctorInfo !== null) {
                const doc = this.props.doctorInfo
                patho = {
                    pathologist: {
                        value: doc.doctorid,
                        label: doctorName(doc),
                        license: doc.licenseNumber
                    }
                }
            }

            if (pckItem.classification !== null) {
                classType = {
                    value: pckItem.classification,
                    label: classOptionsMap.get(pckItem.classification)
                }

                classDesc = classDescMap.get(pckItem.classification);
            }

            if (pckItem.overAllFindings !== null && pckItem.overAllFindings !== '') overAllFindings = pckItem.overAllFindings

            if (pckItem.qualityControl !== null) {
                qualityControl = pckItem.qualityControl
            }
        }
        updateNrsData.classInfo = {
            classType: classType,
            classDesc: classDesc,
            overAllFindings: overAllFindings,
        }
        updateNrsData.doctor = patho;
        updateNrsData.qualityControl = qualityControl;

        return updateNrsData;
    }

    openQualityControlModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const labRequest = [];

            let itmId = null;
            let hasPackage = false;
            for (const item of data.transactionItems) {
                if (item.itemType === "PCK") {
                    item.itemLaboratories.forEach(lab => {
                        labRequest.push(lab);
                    });
                    hasPackage = true;
                    itmId = item.id;
                }

                if (hasPackage) {
                    break;
                }
            }


            if (labRequest.length > 0) {
                const updateNrsData = this.getNrsInfo(data, labRequest, itmId);

                this.setState({
                    ...this.state,
                    showQCModal: true,
                    updateIndex: idx,
                    itemId: itmId,
                    nurseData: updateNrsData,
                });

            } else {
                Swal.fire(
                    'Error.',
                    'Sorry, no laboratory request found.',
                    'error'
                );
            }
        }
    }

    onPrintMedical = (nurseData, headerControl) => {
        const transid = nurseData.transactionid
        const labid = nurseData.id

        if (nurseData.classification !== null) {
            Swal.fire({
                title: 'Nurse Print Medical Certificate',
                text: "Do you want to print the medical certificate of this record?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onPrintMedical(this.props.userToken, transid, labid, headerControl);
                }
            })
        } else {
            Swal.fire({
                title: 'Quest Quality',
                text: 'Requires classification to print.',
                icon: 'error'
            })
        }
    }

    onPrintResults = (nurseData, headerControl) => {
        if (nurseData.classification !== null) {
            Swal.fire({
                title: 'Nurse Print Classification',
                text: "Do you want to print the classification of this record?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    const transid = nurseData.transactionid
                    this.props.onPrintResults(this.props.userToken, transid, headerControl);
                }
            })
        } else {
            Swal.fire({
                title: 'Quest Quality',
                text: 'Requires classification to print.',
                icon: 'error'
            })
        }
    }

    onPrintResultsWithHeader = (nurseData, headerControl) => {
        if (nurseData.classification !== null) {
            Swal.fire({
                title: 'Nurse Print Classification',
                text: "Do you want to print the classification of this record?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Save With Header',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    const transid = nurseData.transactionid
                    this.props.onPrintResults(this.props.userToken, transid, headerControl);
                }
            })
        } else {
            Swal.fire({
                title: 'Quest Quality',
                text: 'Requires classification to print.',
                icon: 'error'
            })
        }
    }

    onQualityControl = (nurseData) => {
        Swal.fire({
            title: 'Nurse Quality Control',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const transid = this.state.nurseData.txnId;
                const itemid = this.state.itemId;

                this.props.onSaveNurseQualityControl(this.props.userToken, transid, itemid, this.closeNurseDisplayModal);
            }
        })
    }
    onShowEmailModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const labRequest = [];

            let itmId = null;
            let hasPackage = false;
            for (const item of data.transactionItems) {
                if (item.itemType === "PCK") {
                    item.itemLaboratories.forEach(lab => {
                        labRequest.push(lab);
                    });
                    hasPackage = true;
                    itmId = item.id;
                }

                if (hasPackage) {
                    break;
                }
            }

            const updateNrsData = this.getNrsInfo(data, labRequest, itmId);
            this.setState({
                ...this.state,
                emailModal: true,
                modalTitle: "Email Results",
                nurseData: updateNrsData,
                emailData: {
                    emailContent: {
                        sendTo: data.emailTo,
                        sendCc: '',
                        emailSubject: 'Quest Phil Diagnostics Laboratory Results',
                        emailBody:
                            `Dear Team,\n\nYou may now look to the attached file of your result in PDF format and Excel format.\nFor any question/classification, please contact us at 0917-535-9417 for Globe and\n0925-577-8378 for Sun/Smart or send us an email at\nquestphil.corpresult@gmail.com\n\nThank you for your concern!\n\nYours truly,\n\nQuest Diagnostics Team`,
                    }
                }
            });

        }
    }

    onSendEmailIndustrial = (emailValues, transid) => {

        Swal.fire({
            title: 'Chemistry Result',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendEmailConsolidated(this.props.userToken, emailValues, transid, this.closeNurseDisplayModal);
            }
        })
    }

    render() {
        const { classes } = this.props;

        const dateDisplayFormat = 'MMM-DD-YYYY hh:mm a'

        const dateChangeHandler = (prop) => (event) => {
            this.setState({
                ...this.state,
                [prop]: event
            })
        }
        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.corpsLoading || this.props.emailLoading || this.props.pendingLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <SpecimenModal
                    showModal={this.state.showSSModal}
                    closeClick={this.closeNurseDisplayModal}
                    saveClick={this.submitSpecimen}
                    nurseData={this.state.nurseData}
                    setNurseData={this.setNurseData}
                />

                <ClassificationModal
                    showModal={this.state.showClsModal}
                    closeClick={this.closeNurseDisplayModal}
                    doctorList={this.props.doctorList}
                    saveClick={this.saveClassifications}
                    nurseData={this.state.nurseData}
                    setNurseData={this.setNurseData}
                />

                <QualityControlModal
                    showModal={this.state.showQCModal}
                    closeClick={this.closeNurseDisplayModal}
                    doctorList={this.props.doctorList}
                    saveClick={this.saveClassifications}
                    nurseData={this.state.nurseData}
                    setNurseData={this.setNurseData}
                    onQualityControl={this.onQualityControl}
                />

                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.nurseData}
                    emailData={this.state.emailData}
                    closeClick={this.closeNurseDisplayModal}
                    onSendEmail={this.onSendEmailIndustrial}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Quest Quality</h3>
                        </CCardHeader>

                        <CCardBody>
                            <CRow>
                                <CCol md="3" className="p-1">
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            value={this.state.dateFromValue}
                                            format={dateDisplayFormat}
                                            label="Start Date"
                                            inputVariant="outlined"
                                            onChange={dateChangeHandler('dateFromValue')}
                                            showTodayButton
                                            disableFuture
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            value={this.state.dateToValue}
                                            format={dateDisplayFormat}
                                            label="End Date"
                                            inputVariant="outlined"
                                            onChange={dateChangeHandler('dateToValue')}
                                            showTodayButton
                                            disableFuture
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                </CCol>
                                <CCol md="6" className="p-1">
                                    <CButton
                                        className="border border-dark"
                                        color="success"
                                        onClick={this.viewTransactions}
                                    >
                                        <i className="mfe-1 fas fa-list" />
                                        View
                                    </CButton>
                                        &nbsp;&nbsp;
                                    <CButton
                                        className="border border-dark"
                                        color="primary"
                                        onClick={this.generateExcel}
                                        disabled={this.state.excelButtonDisabled}
                                        title={this.state.excelButtonDisabled ? "Select Company in \"Charge To\" To Activate this Button " : null}
                                    >
                                        <i className="fa fa-file-pdf" />
                                        Excel
                                    </CButton>
                                        &nbsp;&nbsp;
                                    <CButton
                                        className="border border-dark"
                                        color="info"
                                        onClick={this.generateExcelCupmedar}
                                    >
                                        <i className="fa fa-file-pdf" />
                                        Cupmedar
                                    </CButton>
                                        &nbsp;&nbsp;
                                    {this.state.count === 0 ? null :
                                    <CButton
                                        className="border border-dark"
                                        color="warning"
                                        onClick={this.viewPendingTransactions}
                                    >
                                        <i className="fas fa-exclamation" style={{ color: "red" }} />
                                        Incomplete <sup className="badge badge-danger">{this.state.count}</sup>
                                    </CButton>
                                    }
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="3" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Branch</CLabel>
                                        <ReactSelect
                                            className="basic-single"
                                            placeholder="All"
                                            value={this.state.selectedBranch}
                                            onChange={this.handleSelectChange('selectedBranch')}
                                            isClearable={true}
                                            isSearchable={false}
                                            isLoading={false}
                                            options={
                                                [].concat(this.props.branchList)
                                                    .map(brn => {
                                                        return {
                                                            value: brn.branchid,
                                                            label: brn.branchName
                                                        }
                                                    })
                                            }
                                        />
                                    </FormControl>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Charge To</CLabel>
                                        <ReactSelect
                                            className="basic-single"
                                            placeholder="All"
                                            value={this.state.selectedChargeTo}
                                            onChange={this.handleSelectChange('selectedChargeTo')}
                                            isClearable={true}
                                            isSearchable={true}
                                            isLoading={this.props.corpsLoading}
                                            isDisabled={this.state.disableChargeTo}
                                            options={
                                                [].concat(this.props.corporateList)
                                                    .sort((a, b) => a.companyName > b.companyName ? 1 : -1)
                                                    .map((corp) => {
                                                        return {
                                                            value: corp.corporateid,
                                                            label: corp.companyName
                                                        }
                                                    })
                                            }
                                        />
                                    </FormControl>
                                </CCol>


                                <CCol md="3" className="p-1">
                                    <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                                        <CLabel className={clsx(classes.labelText, "mb-0 ml-2")}>Company</CLabel>
                                        <ReactSelect
                                            className="basic-single"
                                            placeholder="All"
                                            value={this.state.selectedCompany}
                                            onChange={this.handleSelectChange('selectedCompany')}
                                            isClearable={true}
                                            isSearchable={true}
                                            isLoading={this.props.corpsLoading}
                                            isDisabled={this.state.disableCompany}
                                            options={
                                                [].concat(this.props.corporateList)
                                                    .sort((a, b) => a.companyName > b.companyName ? 1 : -1)
                                                    .map((corp) => {
                                                        return {
                                                            value: corp.corporateid,
                                                            label: corp.companyName
                                                        }
                                                    })
                                            }
                                        />
                                    </FormControl>
                                </CCol>
                            </CRow>
                            <hr />
                            <div className="table-responsive">
                                <NurseTable
                                    onRef={ref => (this.nurseTableRef = ref)}
                                    openSubmitSpecimenModal={this.openSubmitSpecimenModal}
                                    openClassifinationModal={this.openClassifinationModal}
                                    onPrintMedical={this.onPrintMedical}
                                    onPrintResults={this.onPrintResults}
                                    onPrintResultsWithHeader={this.onPrintResultsWithHeader}
                                    openQualityControlModal={this.openQualityControlModal}
                                    onShowEmailModal={this.onShowEmailModal}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.lab.loading,
        error: state.lab.error,
        userToken: state.auth.token,
        nrsList: state.lab.nurseList,
        laboratoryList: state.items.itemLaboratories,
        doctorList: state.docs.doctorList,
        doctorInfo: state.docs.doctorData,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        branchList: state.bran.branchList,
        // categoryList: state.items.itemCategories,
        // procedureList: state.items.laboratoryProcedures,
        emailLoading: state.email.loading,
        pendingList: state.trans.pendingList,
        pendingLoading: state.trans.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onGetDoctor: (token, docid) => dispatch(actions.getDoctor(token, docid)),
        onViewNRSList: (token, listType, startDate, endDate, params) => dispatch(actions.getQQTransactionRequests(token, listType, startDate, endDate, params)),
        onGetItemLaboratories: (token) => dispatch(actions.getItemLaboratories(token)),
        onSubmitSpecimen: (token, labRequirements, transid, closeModal) => dispatch(actions.submitTxnLabRequirements(token, labRequirements, transid, closeModal)),
        onClearLaboratoryList: (type) => dispatch(actions.clearLaboratoryList(type)),
        onSaveNurseClassification: (token, classRequest, transid, txnItmId, closeModal) => dispatch(actions.saveNurseClassification(token, classRequest, transid, txnItmId, closeModal)),
        onSaveNurseQualityControl: (token, transid, txnItmId, closeModal) => dispatch(actions.saveNurseQualityControl(token, transid, txnItmId, closeModal)),
        // onPrintMedical: (token, transid, labid, withHeaderFooter) => dispatch(actions.printMedical(token, transid, labid, withHeaderFooter)),
        onPrintResults: (token, transid, withHeaderFooter) => dispatch(actions.printConsolidatedResults(token, transid, withHeaderFooter)),
        onSendEmailConsolidated: (token, emailValues, transid, closeModal) => dispatch(actions.SendEmailConsolidated(token, emailValues, transid, closeModal)),
        onGenerateExcelList: (token, startDate, endDate, params) => dispatch(actions.getQQTxnRequestsExcel(token, startDate, endDate, params)),
        onGenerateExcelListCupmedar: (token, startDate, endDate, params) => dispatch(actions.getQQTxnRequestsExcelCupmedar(token, startDate, endDate, params)),
        onGetAllPending: (token) => dispatch(actions.getAllPendingTransactions(token)),
        onClearPendingLaboratoryList: () => dispatch(actions.clearPendingTransactionList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Nurse));