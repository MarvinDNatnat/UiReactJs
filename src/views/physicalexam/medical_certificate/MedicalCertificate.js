import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
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

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import clsx from 'clsx';

import * as actions from 'src/store/actions/index';
import { doctorName, updateObject } from 'src/store/utility';

import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

import MedicalCertificateTable from 'src/containers/tables/MedicalCertificateTable';
import SerologyModal from 'src/containers/modal/laboratory/SerologyModal';
import Swal from 'sweetalert2';

import EmailModal from 'src/containers/modal/common/EmailModal'

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

const seroConfig = {
    id: null,
    requestName: '',
    txnId: '',
    txnSR: '',
    txnType: '',
    branch: null,
    patient: null,
    itemId: '',
    corporate: null,
    serviceRequest: [],
    cashier: null,
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
    ser: {
        hbsag: null,
        antihav: null,
        vdrlrpr: null,
        antihbs: null,
        hbeag: null,
        antihbe: null,
        antihbc: null,
        tppa: null,
        pregnancyTest: null,
    },
    typh: {
        igm: null,
        igg: null,
    },
    thyr: {
        tsh: '',
        ft3: '',
        t3: '',
        ft4: '',
        t4: '',
    },
    crp: {
        dilution: '',
        result: '',
    },
    hiv: {
        test1: null,
        test2: null,
    },
    agen: {
        prostateSpecificAntigen: '',
        carcenoembryonicAntigen: '',
        alphaFetoprotein: '',
        cancerAntigen125: '',
        cancerAntigen199: '',
        cancerAntigen153: '',
    },
    covid: {
        sarscov2igg: null,
        sarscov2igm: null,
        purpose: '',
    },
    medSer: {
        referenceLabId: ''
    },
    otno: {
        otherNotes: '',
    },
    doctor: '',

}

const npOptions = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

const rnOptions = new Map([
    [true, 'REACTIVE'],
    [false, 'NONREACTIVE'],
])

const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}


class MeidicalCertificate extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        seroData: seroConfig,


        emailData: emailConfig,
        emailModal: false,
        editViewFlag: false,

        selectedBranch: null,
        selectedChargeTo: null,
    }

    componentDidMount() {
        if (this.props.referenceLaboratoryList <= 0) {
            this.props.onShowReferenceLaboratory(this.props.userToken)
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
        this.props.onGetDoctor(this.props.userToken, process.env.REACT_APP_PATHOLOGIST)
    }

    setSerologyData = (updateSeroData) => {
        this.setState({
            ...this.state,
            seroData: updateSeroData,
        });
    }

    handleSelectChange = (opt) => (event) => {
        this.props.onClearSEList('SE');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    viewTransactions = () => {
        this.props.onClearSEList('SE');
        this.props
            .onViewSEList(
                this.props.userToken,
                'SE',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    openSerologyModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {

            const updateSeroData = this.getSeroInfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                seroData: updateSeroData,
                editViewFlag: false,
            });
        }
    }

    viewSerologyModal = (seRowData, idx) => {
        if (seRowData.status >= 2) {

            const updateSeroData = this.getSeroInfo(seRowData)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                seroData: updateSeroData,
                editViewFlag: true,
            });
        } else {
            Swal.fire({
                title: 'Please enter results to view.',
                icon: 'warning',
                text: 'Record not yet ready for viewing.',
            })
        }
    }

    getSeroInfo = (data) => {
        let requestName = '';
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let serviceRequest = [];
        let cashier = null;
        let itemId = ''
        let labPerson = null;
        let txnRemarks = null;
        let txnDate = '';
        let txnDispatch = null;

        if (data.transaction !== undefined && data.transaction !== null) {
            const txn = data.transaction;
            txnId = txn.transactionid;
            txnSR = txn.id;
            txnType = txn.transactionType;
            branch = txn.branch;
            patient = txn.patient;
            corporate = txn.corporate;
            cashier = txn.cashier;
            txnRemarks = txn.remarks;
            txnDate = txn.transactionDate;
            txnDispatch = txn.dispatch;
        }

        if (data.itemDetails !== undefined && data.itemDetails !== null) {
            const itm = data.itemDetails;
            requestName = itm.itemDescription;
            itemId = itm.itemid;
            serviceRequest = itm.serviceRequest;
        }

        if (data.labPersonel !== undefined && data.labPersonel !== null) {
            labPerson = data.labPersonel
        }

        const updateSeroData = updateObject(seroConfig, {
            id: data.id,
            txnId: txnId,
            txnSR: txnSR,
            txnType: txnType,
            branch: branch,
            itemId: itemId,
            patient: patient,
            corporate: corporate,
            requestName: requestName,
            serviceRequest: serviceRequest,
            cashier: cashier,
            labPerson: labPerson,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });

        data.itemDetails.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'SER':
                    const ser = data.serology.serology

                    if (ser !== null) {

                        let hbsag = null
                        let antihav = null
                        let vdrlrpr = null
                        let antihbs = null
                        let hbeag = null
                        let antihbe = null
                        let antihbc = null
                        let tppa = null
                        let pregnancyTest = null

                        if (rnOptions.has(ser.hbsAg) === true) {
                            hbsag = {
                                value: ser.hbsAg,
                                label: rnOptions.get(ser.hbsAg)
                            }
                        }

                        if (rnOptions.has(ser.antiHav) === true) {
                            antihav = {
                                value: ser.antiHav,
                                label: rnOptions.get(ser.antiHav)
                            }
                        }

                        if (rnOptions.has(ser.vdrlRpr) === true) {
                            vdrlrpr = {
                                value: ser.vdrlRpr,
                                label: rnOptions.get(ser.vdrlRpr)
                            }
                        }

                        if (rnOptions.has(ser.antiHbs) === true) {
                            antihbs = {
                                value: ser.antiHbs,
                                label: rnOptions.get(ser.antiHbs)
                            }
                        }

                        if (rnOptions.has(ser.hbeAg) === true) {
                            hbeag = {
                                value: ser.hbeAg,
                                label: rnOptions.get(ser.hbeAg)
                            }
                        }

                        if (rnOptions.has(ser.antiHbe) === true) {
                            antihbe = {
                                value: ser.antiHbe,
                                label: rnOptions.get(ser.antiHbe)
                            }
                        }

                        if (rnOptions.has(ser.antiHbc) === true) {
                            antihbc = {
                                value: ser.antiHbc,
                                label: rnOptions.get(ser.antiHbc)
                            }
                        }

                        if (npOptions.has(ser.tppa) === true) {
                            tppa = {
                                value: ser.tppa,
                                label: npOptions.get(ser.tppa)
                            }
                        }

                        if (npOptions.has(ser.pregnancyTest) === true) {
                            pregnancyTest = {
                                value: ser.pregnancyTest,
                                label: npOptions.get(ser.pregnancyTest)
                            }
                        }

                        const serovalues = {
                            hbsag: hbsag,
                            antihav: antihav,
                            vdrlrpr: vdrlrpr,
                            antihbs: antihbs,
                            hbeag: hbeag,
                            antihbe: antihbe,
                            antihbc: antihbc,
                            tppa: tppa,
                            pregnancyTest: pregnancyTest,
                        }

                        updateSeroData.ser = serovalues
                    }
                    break;

                case 'THYR':
                    const thyr = data.serology.thyroid

                    if (thyr !== null) {

                        const thyrvalues = {
                            tsh: thyr.tsh !== null ? thyr.tsh : '',
                            ft3: thyr.ft3 !== null ? thyr.ft3 : '',
                            t3: thyr.t3 !== null ? thyr.t3 : '',
                            ft4: thyr.ft4 !== null ? thyr.ft4 : '',
                            t4: thyr.t4 !== null ? thyr.t4 : '',
                        }

                        updateSeroData.thyr = thyrvalues
                    }
                    break;

                case 'TYPH':
                    const typh = data.serology.typhidot
                    if (typh !== null) {

                        let igm = null
                        let igg = null

                        if (typh.igm !== null && npOptions.has(typh.igm) === true) {
                            igm = {
                                value: typh.igm,
                                label: npOptions.get(typh.igm)
                            }
                        }

                        if (typh.igg !== null && npOptions.has(typh.igg) === true) {
                            igg = {
                                value: typh.igg,
                                label: npOptions.get(typh.igg)
                            }
                        }

                        const typhvalues = {
                            igm: igm,
                            igg: igg,
                        }

                        updateSeroData.typh = typhvalues
                    }
                    break;

                case 'CRP':
                    const crp = data.serology.crp
                    if (crp !== null) {

                        const crpvalues = {
                            dilution: crp.dilution !== null ? crp.dilution : '',
                            result: crp.result !== null ? crp.result : '',
                        }

                        updateSeroData.crp = crpvalues
                    }
                    break;

                case 'HIV':
                    const hiv = data.serology.hiv
                    if (hiv !== null) {
                        let test1 = null
                        let test2 = null

                        if (hiv.test1 !== null && npOptions.has(hiv.test1) === true) {
                            test1 = {
                                value: hiv.test1,
                                label: npOptions.get(hiv.test1)
                            }
                        }

                        if (hiv.test1 !== null && npOptions.has(hiv.test2) === true) {
                            test2 = {
                                value: hiv.test2,
                                label: npOptions.get(hiv.test2)
                            }
                        }

                        const hivvalues = {
                            test1: test1,
                            test2: test2,
                        }

                        updateSeroData.hiv = hivvalues
                    }
                    break;

                case 'AGEN':
                    const antigen = data.serology.antigen
                    if (antigen !== null) {
                        updateSeroData.agen = {
                            prostateSpecificAntigen: antigen.psa !== null ? antigen.psa : '',
                            carcenoembryonicAntigen: antigen.cea !== null ? antigen.cea : '',
                            alphaFetoprotein: antigen.afp !== null ? antigen.afp : '',
                            cancerAntigen125: antigen.ca125 !== null ? antigen.ca125 : '',
                            cancerAntigen199: antigen.ca199 !== null ? antigen.ca199 : '',
                            cancerAntigen153: antigen.ca153 !== null ? antigen.ca153 : '',
                        }
                    }
                    break;

                case 'COVID':
                    const covid = data.serology.covid
                    if (covid !== null) {

                        let covigm = null
                        let covigg = null
                        let purposeCert = null

                        if (covid.covigm !== null && npOptions.has(covid.covigm) === true) {
                            covigm = {
                                value: covid.covigm,
                                label: npOptions.get(covid.covigm)
                            }
                        }

                        if (covid.covigg !== null && npOptions.has(covid.covigg) === true) {
                            covigg = {
                                value: covid.covigg,
                                label: npOptions.get(covid.covigg)
                            }
                        }
                        purposeCert = covid.purpose !== '' ? covid.purpose : '';


                        const covidvalues = {
                            sarscov2igg: covigm,
                            sarscov2igm: covigg,
                            purpose: purposeCert
                        }

                        updateSeroData.covid = covidvalues
                    }
                    break;
                case 'ANTIGEN':
                    const rtantigen = data.serology.rtAntigen
                    let purposeCert = null
                    if (rtantigen !== null) {
                        let coviag = null
                        if (rtantigen.cov_ag !== null && npOptions.has(rtantigen.cov_ag) === true) {
                            coviag = {
                                value: rtantigen.cov_ag,
                                label: npOptions.get(rtantigen.cov_ag)
                            }
                        }
                        purposeCert = rtantigen.purpose !== "" ? rtantigen.purpose : '';

                        const rtAntigenvalues = {
                            cov_ag: coviag,
                            collectionDate: rtantigen.collectionDate !== null ? rtantigen.collectionDate : '',
                            purpose: purposeCert,
                        }
                        updateSeroData.rtantigen = rtAntigenvalues
                    }
                    break;

                case 'MS':
                    const medSer = data.serology.medSer
                    if (medSer !== null) {
                        const medSerValues = {
                            referenceLabId: medSer.referenceLab !== null ? { value: medSer.referenceLab.referenceid, label: medSer.referenceLab.name } : ''
                        }
                        updateSeroData.medSer = medSerValues
                    }
                    break;

                default: break;
            }
        })

        const otno = {
            otherNotes: data.otherNotes !== null ? data.otherNotes : '',
        }
        updateSeroData.otno = otno

        let patho = null
        if (data.medicalDoctor !== null) {
            patho = {
                pathologist: {
                    value: data.medicalDoctor.doctorid,
                    label: doctorName(data.medicalDoctor),
                    license: data.medicalDoctor.licenseNumber
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
        updateSeroData.doctor = patho

        let qualityControl = null
        if (data.qualityControl !== null) qualityControl = data.qualityControl
        updateSeroData.qualityControl = qualityControl

        return updateSeroData
    }

    closeModal = (seroResponse) => {
        this.setState({
            ...this.state,
            showModal: false,
            emailModal: false,
            editViewFlag: false,
        });

        if (seroResponse !== null) {
            if (this.state.updateIndex !== null) {
                this.serologyTableRef.updateSerologyToTable(seroResponse, this.state.updateIndex);
            }
        }
    }

    onShowEmailModal = () => {
        this.setState({
            ...this.state,
            emailModal: true
        });
    }

    saveResults = () => {
        const seroData = this.state.seroData
        let seroRequest = {};

        seroData.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'SER':
                    const sero = seroData.ser

                    let hbsAg = null
                    let antiHav = null
                    let vdrlRpr = null
                    let antiHbs = null
                    let hbeAg = null
                    let antiHbe = null
                    let antiHbc = null
                    let tppa = null
                    let pregnancyTest = null

                    if (sero.hbsag !== null) hbsAg = sero.hbsag.value
                    if (sero.antihav !== null) antiHav = sero.antihav.value
                    if (sero.vdrlrpr !== null) vdrlRpr = sero.vdrlrpr.value
                    if (sero.antihbs !== null) antiHbs = sero.antihbs.value
                    if (sero.hbeag !== null) hbeAg = sero.hbeag.value
                    if (sero.antihbe !== null) antiHbe = sero.antihbe.value
                    if (sero.antihbc !== null) antiHbc = sero.antihbc.value
                    if (sero.tppa !== null) tppa = sero.tppa.value
                    if (sero.pregnancyTest !== null) pregnancyTest = sero.pregnancyTest.value

                    const serovalues = {
                        hbsAg: hbsAg,
                        antiHav: antiHav,
                        vdrlRpr: vdrlRpr,
                        antiHbs: antiHbs,
                        hbeAg: hbeAg,
                        antiHbe: antiHbe,
                        antiHbc: antiHbc,
                        tppa: tppa,
                        pregnancyTest: pregnancyTest,
                    }

                    seroRequest.serology = serovalues
                    break;

                case 'THYR':
                    const thyr = seroData.thyr

                    let tsh = null
                    let ft3 = null
                    let ft4 = null
                    let t3 = null
                    let t4 = null

                    if (thyr.tsh !== "") tsh = thyr.tsh
                    if (thyr.ft3 !== "") ft3 = thyr.ft3
                    if (thyr.ft4 !== "") ft4 = thyr.ft4
                    if (thyr.t3 !== "") t3 = thyr.t3
                    if (thyr.t4 !== "") t4 = thyr.t4

                    const thyrvalues = {
                        tsh: tsh,
                        ft3: ft3,
                        ft4: ft4,
                        t3: t3,
                        t4: t4
                    }

                    seroRequest.thyroid = thyrvalues
                    break;

                case 'TYPH':
                    const typh = seroData.typh

                    let igm = null
                    let igg = null

                    if (typh.igm !== null) igm = typh.igm.value
                    if (typh.igg !== null) igg = typh.igg.value

                    const typhvalues = {
                        igm: igm,
                        igg: igg
                    }

                    seroRequest.typhidot = typhvalues
                    break;

                case 'CRP':
                    const crp = seroData.crp

                    let dilution = null
                    let result = null

                    if (crp.dilution !== "") dilution = crp.dilution
                    if (crp.result !== "") result = crp.result

                    const crpvalues = {
                        dilution: dilution,
                        result: result
                    }

                    seroRequest.crp = crpvalues
                    break;

                case 'HIV':
                    const hiv = seroData.hiv

                    let test1 = null
                    let test2 = null

                    if (hiv.test1 !== null) test1 = hiv.test1.value
                    if (hiv.test2 !== null) test2 = hiv.test2.value

                    const hivvalues = {
                        test1: test1,
                        test2: test2
                    }

                    seroRequest.hiv = hivvalues
                    break;

                case 'AGEN':
                    const agen = seroData.agen

                    let psav = null
                    let ceav = null
                    let afpv = null
                    let ca125v = null
                    let ca199v = null
                    let ca153v = null

                    if (agen.prostateSpecificAntigen !== "") psav = agen.prostateSpecificAntigen
                    if (agen.carcenoembryonicAntigen !== "") ceav = agen.carcenoembryonicAntigen
                    if (agen.alphaFetoprotein !== "") afpv = agen.alphaFetoprotein
                    if (agen.cancerAntigen125 !== "") ca125v = agen.cancerAntigen125
                    if (agen.cancerAntigen199 !== "") ca199v = agen.cancerAntigen199
                    if (agen.cancerAntigen153 !== "") ca153v = agen.cancerAntigen153

                    const antigenvalues = {
                        psa: psav,
                        cea: ceav,
                        afp: afpv,
                        ca125: ca125v,
                        ca199: ca199v,
                        ca153: ca153v,
                    }

                    seroRequest.antigen = antigenvalues
                    break;

                case 'COVID':
                    const covid = seroData.covid

                    let covigm = null
                    let covigg = null
                    let purposedatacovid = null

                    if (covid.sarscov2igg !== null) covigm = covid.sarscov2igg.value
                    if (covid.sarscov2igm !== null) covigg = covid.sarscov2igm.value
                    if (covid.purpose !== "") purposedatacovid = covid.purpose

                    const covidvalues = {
                        covigm: covigm,
                        covigg: covigg,
                        purpose: purposedatacovid
                    }

                    seroRequest.covid = covidvalues
                    break;

                case 'MS':
                    const medSer = seroData.medSer
                    let referenceLabIdMedSer = '';

                    if (medSer.referenceLabId !== "") referenceLabIdMedSer = medSer.referenceLabId.value

                    const medServalues = {
                        referenceLabId: referenceLabIdMedSer
                    }

                    seroRequest.medSer = medServalues
                    break;

                case 'ANTIGEN':
                    const rtantigen = seroData.rtantigen
                    let coviag = null
                    let collectionDate = null
                    let purposedataantigen = null

                    if (rtantigen.cov_ag !== null) coviag = rtantigen.cov_ag.value
                    if (rtantigen.collectionDate !== null) collectionDate = rtantigen.collectionDate
                    if (rtantigen.purpose !== "") purposedataantigen = rtantigen.purpose

                    const rtAntigenvalues = {
                        cov_ag: coviag,
                        collectionDate: collectionDate,
                        purpose: purposedataantigen
                    }

                    seroRequest.rtantigen = rtAntigenvalues
                    break;

                default: break;
            }
        })

        let otherNotes = null
        if (seroData.otno.otherNotes !== "") otherNotes = seroData.otno.otherNotes
        seroRequest.otherNotes = otherNotes

        let patho = null
        if (seroData.doctor !== null) patho = seroData.doctor.pathologist.value
        seroRequest.pathologistId = patho

        const transid = seroData.txnId
        const labid = seroData.id

        Swal.fire({
            title: 'Serology',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveSerology(this.props.userToken, seroRequest, transid, labid, this.closeModal)
            }
        })
    };

    onPrintSerology = (transid, labid, status, headerControl) => {

        // const roles = [].concat(this.props.auth.roles)
        //     .filter(r => r === 'ADMIN');

        // if (roles.length > 0) {
        if (status >= 2) {
            Swal.fire({
                title: 'Serology Result',
                text: "Do you want to print this report?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onPrintMedCert(this.props.userToken, transid, labid, headerControl)
                }
            })
        } else {
            Swal.fire({
                title: 'Please enter results to print.',
                icon: 'warning',
                text: 'Record not yet ready for printing.'
            })
        }
        // } else {
        //     Swal.fire({
        //         title: 'Not authorized to print',
        //         icon: 'warning',
        //         text: 'Please contact admin.'
        //     })
        // }
    }

    onQualityControl = (transid, labid) => {
        Swal.fire({
            title: 'Quality Control',
            text: "Are all information correct?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onQCSerology(this.props.userToken, transid, labid, this.closeModal);
            }
        })
    }

    onShowEmailModal = (data) => {
        const updateSeroData = this.getSeroInfo(data)

        this.setState({
            ...this.state,
            emailModal: true,
            modalTitle: "Email Serology",
            CMData: updateSeroData,
            emailData: {
                emailContent: {
                    sendTo: updateSeroData.patient.email,
                    sendCc: '',
                    emailSubject: 'Serology Results',
                    emailBody:
                        `Dear Team,\n\nYou may now look to the attached file of your result in PDF format and Excel format.\nFor any question/classification, please contact us at 0917-535-9417 for Globe and\n0925-577-8378 for Sun/Smart or send us an email at\nquestphil.corpresult@gmail.com\n\nThank you for your concern!\n\nYours truly,\n\nQuest Diagnostics Team`,
                }
            }
        });
    }

    onSendEmailSerology = (emailValues, transid, labid) => {

        Swal.fire({
            title: 'Serology Result',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendEmailSerology(this.props.userToken, emailValues, transid, labid, this.closeModal);
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
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.corpsLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <SerologyModal
                    referenceLab={this.props.referenceLaboratoryList}
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    seroData={this.state.seroData}
                    setSeroData={this.setSerologyData}
                    doctorList={this.props.doctorList}
                    editViewFlag={this.state.editViewFlag}
                    onPrintSerology={this.onPrintSerology}
                    onQualityControl={this.onQualityControl}
                />

                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.chemData}
                    emailData={this.state.emailData}
                    closeClick={this.closeModal}
                    onSendEmail={this.onSendEmailSerology}
                />


                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Medical Certificate</h3>
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
                                <CCol md="3" className="p-1">
                                    <CButton
                                        className="border border-dark"
                                        color="success"
                                        onClick={this.viewTransactions}
                                    >
                                        <i className="mfe-2 fas fa-list" />
                                        View
                                    </CButton>
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
                                <CCol md="4" className="p-1">
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
                                <MedicalCertificateTable
                                    onRef={ref => (this.serologyTableRef = ref)}
                                    openSerologyModal={this.openSerologyModal}
                                    viewSerologyModal={this.viewSerologyModal}
                                    onPrintSerology={this.onPrintSerology}
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
        auth: state.auth.user,
        loading: state.lab.loading,
        error: state.lab.error,
        userToken: state.auth.token,
        seroList: state.lab.serologyList,
        doctorList: state.docs.doctorList,
        doctorInfo: state.docs.doctorData,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        branchList: state.bran.branchList,
        referenceLaboratoryList: state.refLab.referenceLaboratoryList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onGetDoctor: (token, docid) => dispatch(actions.getDoctor(token, docid)),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
        onSaveSerology: (token, seroValues, transid, labid, closeModal) => dispatch(actions.saveSerology(token, seroValues, transid, labid, closeModal)),
        onViewSEList: (token, procedure, startDate, endDate, branchId, chargeTo) => dispatch(actions.getLaboratoryServiceRequests(token, procedure, startDate, endDate, branchId, chargeTo)),
        onClearSEList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onPrintMedCert: (token, transid, labid, withHeaderFooter) => dispatch(actions.printMedCert(token, transid, labid, withHeaderFooter)),
        onQCSerology: (token, transid, labid, closeModal) => dispatch(actions.qualityControlSerology(token, transid, labid, closeModal)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MeidicalCertificate));