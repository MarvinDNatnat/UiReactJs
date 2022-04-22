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

import SerologyTable from 'src/containers/tables/laboratory/SerologyTable';
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
    corporate: null,
    serviceRequest: [],
    itemId: '',
    specificTest: '',
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
        antihcv: null,
        tppa: null,
        abs: '',
        cutOffValue: '',
        pregnancyTest: '',
        referenceLabId: ''
    },
    typh: {
        igm: null,
        igg: null,
        referenceLabId: ''
    },
    thyr: {
        tsh: '',
        ft3: '',
        t3: '',
        ft4: '',
        t4: '',
        referenceLabId: ''
    },
    crp: {
        dilution: '',
        result: '',
        referenceLabId: ''
    },
    rft: {
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        referenceLabId: ''
    },
    hiv: {
        test1: null,
        test2: null,
        referenceLabId: ''
    },
    agen: {
        prostateSpecificAntigen: '',
        carcenoembryonicAntigen: '',
        alphaFetoprotein: '',
        cancerAntigen125: '',
        cancerAntigen199: '',
        cancerAntigen153: '',
        referenceLabId: ''
    },
    covid: {
        sarscov2igg: null,
        sarscov2igm: null,
        purpose: '',
        referenceLabId: ''
    },
    otno: {
        otherNotes: '',
    },
    doctor: '',
    rtantigen: {
        cov_ag: '',
        collectionDate: '',
        purpose: '',
        referenceLabId: ''
    },
    rtpcr: {
        rtpcrResult: '',
        collectionDate: '',
        purpose: '',
        realeasingDate: '',
        molecularLab: '',
        referenceLabId: ''
    },
    tphawt: {
        test1: '',
        test2: '',
        test3: '',
        test4: '',
        test5: '',
        test6: '',
        test7: '',
        test8: '',
        test9: '',
        referenceLabId: ''
    },
    aso: {
        result1: '',
        result2: '',
        result3: '',
        result4: '',
        result5: '',
        referenceLabId: ''
    },
    dengue: {
        result: '',
        referenceLabId: ''
    },
    tpn: {
        result: '',
        referenceLabId: ''
    }
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

class Serology extends Component {
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
        let itemId = ''
        let specificTest = null;
        let cashier = null;
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
            serviceRequest = itm.serviceRequest;
            itemId = itm.itemid;
            specificTest = itm.specificTest;
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
            patient: patient,
            corporate: corporate,
            requestName: requestName,
            serviceRequest: serviceRequest,
            itemId: itemId,
            cashier: cashier,
            labPerson: labPerson,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
            specificTest: specificTest,
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
                        let antihcv = null
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

                        if (rnOptions.has(ser.antihcv) === true) {
                            antihcv = {
                                value: ser.antihcv,
                                label: rnOptions.get(ser.antihcv)
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
                            antihcv: antihcv,
                            tppa: tppa,
                            abs: ser.abs === null ? '' : ser.abs,
                            cutOffValue: ser.cutOffValue === null ? '' : ser.cutOffValue,
                            pregnancyTest: pregnancyTest,
                            referenceLabId: ser.referenceLab !== null ? { value: ser.referenceLab.referenceid, label: ser.referenceLab.name } : ''
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
                            referenceLabId: thyr.referenceLab !== null ? { value: thyr.referenceLab.referenceid, label: thyr.referenceLab.name } : ''
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
                            referenceLabId: typh.referenceLab !== null ? { value: typh.referenceLab.referenceid, label: typh.referenceLab.name } : ''
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
                            referenceLabId: crp.referenceLab !== null ? { value: crp.referenceLab.referenceid, label: crp.referenceLab.name } : ''
                        }

                        updateSeroData.crp = crpvalues
                    }
                    break;

                case 'RFT':
                    const rft = data.serology.rft
                    if (rft !== null) {

                        let firstV = null;
                        let secondV = null;
                        let thirdV = null;
                        let fourthV = null;
                        let fifthV = null;

                        if (npOptions.has(rft.first) === true) {
                            firstV = {
                                value: rft.first,
                                label: npOptions.get(rft.first)
                            }
                        }

                        if (npOptions.has(rft.second) === true) {
                            secondV = {
                                value: rft.second,
                                label: npOptions.get(rft.second)
                            }
                        }

                        if (npOptions.has(rft.thitrd) === true) {
                            thirdV = {
                                value: rft.thitrd,
                                label: npOptions.get(rft.thitrd)
                            }
                        }

                        if (npOptions.has(rft.fourth) === true) {
                            fourthV = {
                                value: rft.fourth,
                                label: npOptions.get(rft.fourth)
                            }
                        }

                        if (npOptions.has(rft.fifth) === true) {
                            fifthV = {
                                value: rft.fifth,
                                label: npOptions.get(rft.fifth)
                            }
                        }

                        const rftvalues = {
                            first: firstV,
                            second: secondV,
                            third: thirdV,
                            fourth: fourthV,
                            fifth: fifthV,
                            referenceLabId: rft.referenceLab !== null ? { value: rft.referenceLab.referenceid, label: rft.referenceLab.name } : ''
                        }

                        updateSeroData.rft = rftvalues
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
                            referenceLabId: hiv.referenceLab !== null ? { value: hiv.referenceLab.referenceid, label: hiv.referenceLab.name } : ''
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
                            referenceLabId: antigen.referenceLab !== null ? { value: antigen.referenceLab.referenceid, label: antigen.referenceLab.name } : ''
                        }
                    }
                    break;

                case 'COVID':
                    const covid = data.serology.covid
                    if (covid !== null) {

                        let covigm = null
                        let covigg = null
                        let purposeCert = ''

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
                            purpose: purposeCert,
                            referenceLabId: covid.referenceLab !== null ? { value: covid.referenceLab.referenceid, label: covid.referenceLab.name } : ''
                        }

                        updateSeroData.covid = covidvalues
                    }
                    break;
                case 'ANTIGEN':
                    const rtantigen = data.serology.rtAntigen
                    let purposeCert = ''
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
                            referenceLabId: rtantigen.referenceLab !== null ? { value: rtantigen.referenceLab.referenceid, label: rtantigen.referenceLab.name } : ''
                        }
                        updateSeroData.rtantigen = rtAntigenvalues
                    }
                    break;

                case 'RTPCR':
                    const rtpcr = data.serology.rtpcr
                    let purposeRtpcr = ''
                    if (rtpcr !== null) {
                        let rtpcrdata = null
                        if (rtpcr.rtpcrResult !== null && npOptions.has(rtpcr.rtpcrResult) === true) {
                            rtpcrdata = {
                                value: rtpcr.rtpcrResult,
                                label: npOptions.get(rtpcr.rtpcrResult)
                            }
                        }
                        purposeRtpcr = rtpcr.purpose !== "" ? rtpcr.purpose : '';

                        const rtprcgenvalues = {
                            rtpcrResult: rtpcrdata,
                            collectionDate: rtpcr.collectionDate !== null ? rtpcr.collectionDate : '',
                            purpose: purposeRtpcr,
                            realeasingDate: rtpcr.realeasingDate !== null ? rtpcr.realeasingDate : '',
                            referenceLabId: rtpcr.referenceLab !== null ? { value: rtpcr.referenceLab.referenceid, label: rtpcr.referenceLab.name } : ''
                        }
                        updateSeroData.rtpcr = rtprcgenvalues
                    }
                    break;

                case 'TPHA':
                    const tphawt = data.serology.tphawt
                    if (tphawt !== null) {
                        let test1 = null
                        if (tphawt.test1 !== null && npOptions.has(tphawt.test1) === true) {
                            test1 = {
                                value: tphawt.test1,
                                label: npOptions.get(tphawt.test1)
                            }
                        }
                        let test2 = null
                        if (tphawt.test2 !== null && npOptions.has(tphawt.test2) === true) {
                            test2 = {
                                value: tphawt.test2,
                                label: npOptions.get(tphawt.test2)
                            }
                        }
                        let test3 = null
                        if (tphawt.test3 !== null && npOptions.has(tphawt.test3) === true) {
                            test3 = {
                                value: tphawt.test3,
                                label: npOptions.get(tphawt.test3)
                            }
                        }
                        let test4 = null
                        if (tphawt.test4 !== null && npOptions.has(tphawt.test4) === true) {
                            test4 = {
                                value: tphawt.test4,
                                label: npOptions.get(tphawt.test4)
                            }
                        }
                        let test5 = null
                        if (tphawt.test5 !== null && npOptions.has(tphawt.test5) === true) {
                            test5 = {
                                value: tphawt.test5,
                                label: npOptions.get(tphawt.test5)
                            }
                        }
                        let test6 = null
                        if (tphawt.test6 !== null && npOptions.has(tphawt.test6) === true) {
                            test6 = {
                                value: tphawt.test6,
                                label: npOptions.get(tphawt.test6)
                            }
                        }
                        let test7 = null
                        if (tphawt.test7 !== null && npOptions.has(tphawt.test7) === true) {
                            test7 = {
                                value: tphawt.test7,
                                label: npOptions.get(tphawt.test7)
                            }
                        }
                        let test8 = null
                        if (tphawt.test8 !== null && npOptions.has(tphawt.test8) === true) {
                            test8 = {
                                value: tphawt.test8,
                                label: npOptions.get(tphawt.test8)
                            }
                        }
                        let test9 = null
                        if (tphawt.test9 !== null && npOptions.has(tphawt.test9) === true) {
                            test9 = {
                                value: tphawt.test9,
                                label: npOptions.get(tphawt.test9)
                            }
                        }

                        const tphaValues = {
                            test1: test1,
                            test2: test2,
                            test3: test3,
                            test4: test4,
                            test5: test5,
                            test6: test6,
                            test7: test7,
                            test8: test8,
                            test9: test9,
                            referenceLabId: tphawt.referenceLab !== null ? { value: tphawt.referenceLab.referenceid, label: tphawt.referenceLab.name } : ''
                        }
                        updateSeroData.tphawt = tphaValues
                    }
                    break;

                case 'DGE':
                    const dengue = data.serology.dengue;
                    if (dengue !== null) {
                        let result = null
                        if (dengue.result !== null && npOptions.has(dengue.result) === true) {
                            result = {
                                value: dengue.result,
                                label: npOptions.get(dengue.result)
                            }
                        }

                        const dengueValues = {
                            result1: result,
                            referenceLabId: dengue.referenceLab !== null ? { value: dengue.referenceLab.referenceid, label: dengue.referenceLab.name } : ''
                        }
                        updateSeroData.dengue = dengueValues
                    }
                    break;

                case 'TPN':
                    const tpn = data.serology.tpn;
                    if (tpn !== null) {
                        let result = null
                        if (tpn.result !== null && npOptions.has(tpn.result) === true) {
                            result = {
                                value: tpn.result,
                                label: npOptions.get(tpn.result)
                            }
                        }

                        const dengueValues = {
                            result1: result,
                            referenceLabId: tpn.referenceLab !== null ? { value: tpn.referenceLab.referenceid, label: tpn.referenceLab.name } : ''
                        }
                        updateSeroData.tpn = dengueValues
                    }
                    break;

                case 'ASO':
                    const aso = data.serology.aso
                    if (aso !== null) {
                        let result1 = null
                        if (aso.result1 !== null && npOptions.has(aso.result1) === true) {
                            result1 = {
                                value: aso.result1,
                                label: npOptions.get(aso.result1)
                            }
                        }
                        let result2 = null
                        if (aso.result2 !== null && npOptions.has(aso.result2) === true) {
                            result2 = {
                                value: aso.result2,
                                label: npOptions.get(aso.result2)
                            }
                        }
                        let result3 = null
                        if (aso.result3 !== null && npOptions.has(aso.result3) === true) {
                            result3 = {
                                value: aso.result3,
                                label: npOptions.get(aso.result3)
                            }
                        }
                        let result4 = null
                        if (aso.result4 !== null && npOptions.has(aso.result4) === true) {
                            result4 = {
                                value: aso.result4,
                                label: npOptions.get(aso.result4)
                            }
                        }
                        let result5 = null
                        if (aso.result5 !== null && npOptions.has(aso.result5) === true) {
                            result5 = {
                                value: aso.result5,
                                label: npOptions.get(aso.result5)
                            }
                        }


                        const asoValues = {
                            result1: result1,
                            result2: result2,
                            result3: result3,
                            result4: result4,
                            result5: result5,
                            referenceLabId: aso.referenceLab !== null ? { value: aso.referenceLab.referenceid, label: aso.referenceLab.name } : ''
                        }
                        updateSeroData.aso = asoValues
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
            seroData: seroConfig,
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
                    let antihcv = null
                    let tppa = null
                    let abs = null
                    let cutOffValue = null
                    let pregnancyTest = null
                    let referenceLabIdSero = '';

                    if (sero.hbsag !== null) hbsAg = sero.hbsag.value
                    if (sero.antihav !== null) antiHav = sero.antihav.value
                    if (sero.vdrlrpr !== null) vdrlRpr = sero.vdrlrpr.value
                    if (sero.antihbs !== null) antiHbs = sero.antihbs.value
                    if (sero.hbeag !== null) hbeAg = sero.hbeag.value
                    if (sero.antihbe !== null) antiHbe = sero.antihbe.value
                    if (sero.abs !== null) abs = sero.abs
                    if (sero.cutOffValue !== null) cutOffValue = sero.cutOffValue
                    if (sero.antihbc !== null) antiHbc = sero.antihbc.value
                    if (sero.antihcv !== null) antihcv= sero.antihcv.value 
                    if (sero.tppa !== null) tppa = sero.tppa.value
                    if (sero.pregnancyTest !== null) pregnancyTest = sero.pregnancyTest.value
                    if (sero.referenceLabId !== "") referenceLabIdSero = sero.referenceLabId.value

                    const serovalues = {
                        hbsAg: hbsAg,
                        antiHav: antiHav,
                        vdrlRpr: vdrlRpr,
                        antiHbs: antiHbs,
                        hbeAg: hbeAg,
                        antiHbe: antiHbe,
                        antiHbc: antiHbc,
                        antihcv: antihcv,
                        tppa: tppa,
                        abs: abs,
                        cutOffValue: cutOffValue,
                        pregnancyTest: pregnancyTest,
                        referenceLabId: referenceLabIdSero
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
                    let referenceLabIdThyr = '';

                    if (thyr.tsh !== "") tsh = thyr.tsh
                    if (thyr.ft3 !== "") ft3 = thyr.ft3
                    if (thyr.ft4 !== "") ft4 = thyr.ft4
                    if (thyr.t3 !== "") t3 = thyr.t3
                    if (thyr.t4 !== "") t4 = thyr.t4
                    if (thyr.referenceLabId !== "") referenceLabIdThyr = thyr.referenceLabId.value

                    const thyrvalues = {
                        tsh: tsh,
                        ft3: ft3,
                        ft4: ft4,
                        t3: t3,
                        t4: t4,
                        referenceLabId: referenceLabIdThyr
                    }

                    seroRequest.thyroid = thyrvalues
                    break;

                case 'TYPH':
                    const typh = seroData.typh

                    let igm = null
                    let igg = null
                    let referenceLabIdTyph = '';

                    if (typh.igm !== null) igm = typh.igm.value
                    if (typh.igg !== null) igg = typh.igg.value
                    if (typh.referenceLabId !== "") referenceLabIdTyph = typh.referenceLabId.value

                    const typhvalues = {
                        igm: igm,
                        igg: igg,
                        referenceLabId: referenceLabIdTyph
                    }

                    seroRequest.typhidot = typhvalues
                    break;

                case 'CRP':
                    const crp = seroData.crp

                    let dilution = null
                    let result = null
                    let referenceLabIdCrp = '';

                    if (crp.dilution !== "") dilution = crp.dilution
                    if (crp.result !== "") result = crp.result
                    if (crp.referenceLabId !== "") referenceLabIdCrp = crp.referenceLabId.value

                    const crpvalues = {
                        dilution: dilution,
                        result: result,
                        referenceLabId: referenceLabIdCrp
                    }

                    seroRequest.crp = crpvalues
                    break;

                case 'RFT':
                    const rft = seroData.rft

                    let first = null
                    let second = null
                    let third = null
                    let fourth = null
                    let fifth = null
                    let referenceLabIdrft = '';

                    if (rft.first !== null) first = rft.first.value
                    if (rft.second !== null) second = rft.second.value
                    if (rft.third !== null) third = rft.third.value
                    if (rft.fourth !== null) fourth = rft.fourth.value
                    if (rft.fifth !== null) fifth = rft.fifth.value
                    if (rft.referenceLabId !== "") referenceLabIdrft = rft.referenceLabId.value

                    const rftvalues = {
                        first: first,
                        second: second,
                        third: third,
                        fourth: fourth,
                        fifth: fifth,
                        referenceLabId: referenceLabIdrft
                    }

                    seroRequest.rft = rftvalues
                    break;

                case 'TPHA':
                    const tphawt = seroData.tphawt

                    let test1tpha = null
                    let test2tpha = null
                    let test3tpha = null
                    let test4tpha = null
                    let test5tpha = null
                    let test6tpha = null
                    let test7tpha = null
                    let test8tpha = null
                    let test9tpha = null
                    let referenceLabIdtpha = '';

                    if (tphawt.test1 !== null) test1tpha = tphawt.test1.value
                    if (tphawt.test2 !== null) test2tpha = tphawt.test2.value
                    if (tphawt.test3 !== null) test3tpha = tphawt.test3.value
                    if (tphawt.test4 !== null) test4tpha = tphawt.test4.value
                    if (tphawt.test5 !== null) test5tpha = tphawt.test5.value
                    if (tphawt.test6 !== null) test6tpha = tphawt.test6.value
                    if (tphawt.test7 !== null) test7tpha = tphawt.test7.value
                    if (tphawt.test8 !== null) test8tpha = tphawt.test8.value
                    if (tphawt.test9 !== null) test9tpha = tphawt.test9.value
                    if (tphawt.referenceLabId !== "") referenceLabIdtpha = tphawt.referenceLabId.value

                    const tphavalues = {
                        test1: test1tpha,
                        test2: test2tpha,
                        test3: test3tpha,
                        test4: test4tpha,
                        test5: test5tpha,
                        test6: test6tpha,
                        test7: test7tpha,
                        test8: test8tpha,
                        test9: test9tpha,
                        referenceLabId: referenceLabIdtpha
                    }

                    seroRequest.tphawt = tphavalues
                    break;
                case 'DGE':
                    const dengue = seroData.dengue
                    let resultDengue = null
                    let referenceLabIdDengue = '';

                    if (dengue.result !== null) resultDengue = dengue.result.value
                    if (dengue.referenceLabId !== "") referenceLabIdDengue = dengue.referenceLabId.value
                    const dengueValues = {
                        result: resultDengue,
                        referenceLabId: referenceLabIdDengue
                    }
                    seroRequest.dengue = dengueValues
                    break;

                case 'TPN':
                    const tpn = seroData.tpn
                    let resultTpn = null
                    let referenceLabIdTpn = '';

                    if (tpn.result !== null) resultTpn = tpn.result.value
                    if (tpn.referenceLabId !== "") referenceLabIdTpn = tpn.referenceLabId.value
                    const tpnValues = {
                        result: resultTpn,
                        referenceLabId: referenceLabIdTpn
                    }
                    seroRequest.tpn = tpnValues
                    break;

                case 'ASO':
                    const aso = seroData.aso

                    let test1taso = null
                    let test2aso = null
                    let test3aso = null
                    let test4aso = null
                    let test5aso = null
                    let referenceLabIdAso = '';

                    if (aso.result1 !== null) test1taso = aso.result1.value
                    if (aso.result2 !== null) test2aso = aso.result2.value
                    if (aso.result3 !== null) test3aso = aso.result3.value
                    if (aso.result4 !== null) test4aso = aso.result4.value
                    if (aso.result5 !== null) test5aso = aso.result5.value
                    if (aso.referenceLabId !== "") referenceLabIdAso = aso.referenceLabId.value

                    const asovalues = {
                        result1: test1taso,
                        result2: test2aso,
                        result3: test3aso,
                        result4: test4aso,
                        result5: test5aso,
                        referenceLabId: referenceLabIdAso
                    }

                    seroRequest.aso = asovalues
                    break;

                case 'HIV':
                    const hiv = seroData.hiv

                    let test1 = null
                    let test2 = null
                    let referenceLabIdHiv = '';

                    if (hiv.test1 !== null) test1 = hiv.test1.value
                    if (hiv.test2 !== null) test2 = hiv.test2.value
                    if (hiv.referenceLabId !== "") referenceLabIdHiv = hiv.referenceLabId.value
                    const hivvalues = {
                        test1: test1,
                        test2: test2,
                        referenceLabId: referenceLabIdHiv
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
                    let referenceLabIdAgen = '';

                    if (agen.prostateSpecificAntigen !== "") psav = agen.prostateSpecificAntigen
                    if (agen.carcenoembryonicAntigen !== "") ceav = agen.carcenoembryonicAntigen
                    if (agen.alphaFetoprotein !== "") afpv = agen.alphaFetoprotein
                    if (agen.cancerAntigen125 !== "") ca125v = agen.cancerAntigen125
                    if (agen.cancerAntigen199 !== "") ca199v = agen.cancerAntigen199
                    if (agen.cancerAntigen153 !== "") ca153v = agen.cancerAntigen153
                    if (agen.referenceLabId !== "") referenceLabIdAgen = agen.referenceLabId.value

                    const antigenvalues = {
                        psa: psav,
                        cea: ceav,
                        afp: afpv,
                        ca125: ca125v,
                        ca199: ca199v,
                        ca153: ca153v,
                        referenceLabId: referenceLabIdAgen
                    }

                    seroRequest.antigen = antigenvalues
                    break;

                case 'COVID':
                    const covid = seroData.covid

                    let covigm = null
                    let covigg = null
                    let purposedatacovid = null
                    let referenceLabIdCovid = '';

                    if (covid.sarscov2igg !== null) covigm = covid.sarscov2igg.value
                    if (covid.sarscov2igm !== null) covigg = covid.sarscov2igm.value
                    if (covid.purpose !== "") purposedatacovid = covid.purpose
                    if (covid.referenceLabId !== "") referenceLabIdCovid = covid.referenceLabId.value

                    const covidvalues = {
                        covigm: covigm,
                        covigg: covigg,
                        purpose: purposedatacovid,
                        referenceLabId: referenceLabIdCovid
                    }

                    seroRequest.covid = covidvalues
                    break;

                case 'ANTIGEN':
                    const rtantigen = seroData.rtantigen
                    let coviag = null
                    let collectionDate = null
                    let purposedataantigen = ''
                    let referenceLabIdAntigen = '';

                    if (rtantigen.cov_ag !== null) coviag = rtantigen.cov_ag.value
                    if (rtantigen.collectionDate !== null) collectionDate = rtantigen.collectionDate
                    if (rtantigen.purpose !== "") purposedataantigen = rtantigen.purpose
                    if (rtantigen.referenceLabId !== "") referenceLabIdAntigen = rtantigen.referenceLabId.value

                    const rtAntigenvalues = {
                        cov_ag: coviag,
                        collectionDate: collectionDate,
                        purpose: purposedataantigen,
                        referenceLabId: referenceLabIdAntigen
                    }

                    seroRequest.rtantigen = rtAntigenvalues
                    break;

                case 'RTPCR':
                    const rtpcr = seroData.rtpcr
                    let rtpcrR = null
                    let collectionDateRtpcr = null
                    let purposedatartpcr = null
                    let realeasingDateRtpcr = null
                    let molecularLab = null
                    let referenceLabIdRtpcr = '';

                    if (rtpcr.rtpcrResult !== null) rtpcrR = rtpcr.rtpcrResult.value
                    if (rtpcr.collectionDate !== null) collectionDateRtpcr = rtpcr.collectionDate
                    if (rtpcr.purpose !== "") purposedatartpcr = rtpcr.purpose
                    if (rtpcr.realeasingDate !== null) realeasingDateRtpcr = rtpcr.realeasingDate
                    if (rtpcr.molecularLab !== null) molecularLab = rtpcr.molecularLab
                    if (rtpcr.referenceLabId !== "") referenceLabIdRtpcr = rtpcr.referenceLabId.value

                    const rtpcrvalues = {
                        rtpcrResult: rtpcrR,
                        collectionDate: collectionDateRtpcr,
                        purpose: purposedatartpcr,
                        realeasingDate: realeasingDateRtpcr,
                        molecularLab: molecularLab,
                        referenceLabId: referenceLabIdRtpcr
                    }

                    seroRequest.rtpcr = rtpcrvalues
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
                    this.props.onPrintSerology(this.props.userToken, transid, labid, headerControl)
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
            seroData: updateSeroData,
            emailData: {
                emailContent: {
                    sendTo: updateSeroData.patient.email,
                    sendCc: '',
                    emailSubject: 'Quest Phil Diagnostics Laboratory Results',
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
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.corpsLoading || this.props.emailLoading}>
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
                    emailData={this.state.emailData}
                    seroData={this.state.seroData}
                    closeClick={this.closeModal}
                    onSendEmailSerology={this.onSendEmailSerology}
                    emailType={"antigen"}
                />


                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Serology</h3>
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
                                <SerologyTable
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
        emailLoading: state.email.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onGetDoctor: (token, docid) => dispatch(actions.getDoctor(token, docid)),
        onSaveSerology: (token, seroValues, transid, labid, closeModal) => dispatch(actions.saveSerology(token, seroValues, transid, labid, closeModal)),
        onViewSEList: (token, procedure, startDate, endDate, branchId, chargeTo) => dispatch(actions.getLaboratoryServiceRequests(token, procedure, startDate, endDate, branchId, chargeTo)),
        onClearSEList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onPrintSerology: (token, transid, labid, withHeaderFooter) => dispatch(actions.printSerology(token, transid, labid, withHeaderFooter)),
        onQCSerology: (token, transid, labid, closeModal) => dispatch(actions.qualityControlSerology(token, transid, labid, closeModal)),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
        onSendEmailSerology: (token, emailValues, transid, labid, closeModal) => dispatch(actions.sendSerologyEmail(token, emailValues, transid, labid, closeModal)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Serology));