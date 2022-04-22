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

import ClinicalMicroscopyTable from 'src/containers/tables/laboratory/ClinicalMicroscopyTable';
import ClinicalMicroscopyModal from 'src/containers/modal/laboratory/ClinicalMicroscopyModal';
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
        color: 'white',
    }
});

const cmConfig = {
    id: null,
    laboratorySpecimen: null,
    requestName: '',
    txnId: '',
    txnSR: '',
    txnType: '',
    branch: null,
    patient: null,
    corporate: null,
    serviceRequest: [],
    cashier: null,
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
    uchem: {
        color: null,
        transparency: null,
        isColorError: false,
        isTransparencyError: false,

        rbc: '',
        wbc: '',
        ecells: null,
        mtreads: null,
        bacteria: null,
        amorphous: null,
        caox: null,
        isRCBError: false,
        isWBCError: false,

        ph: null,
        spGravity: null,
        protien: null,
        glucose: null,
        leukocyteEsterase: null,
        nitrite: null,
        urobilinogen: null,
        blood: null,
        ketone: null,
        bilirubin: null,
        otherNotes: '',
    },
    feca: {
        color: null,
        consistency: null,
        microscopicFindings: null,
        otherNotes: '',
    },
    preg: {
        result: null,
    },
    afb: {
        visualApperanceSpecimen1: '',
        visualApperanceSpecimen2: '',
        readingSpecimen1: '',
        readingSpecimen2: '',
        diagnosis: '',
    },
    obt: {
        result: null,
    },
    otno: {
        otherNotes: '',
    },
    doctor: '',
}

const macroColorMap = new Map([
    ['STR', 'STRAW'],
    ['LYW', 'LIGHT YELLOW'],
    ['YLW', 'YELLOW'],
    ['DYW', 'DARK YELLOW'],
    ['RED', 'RED'],
    ['ORG', 'ORANGE'],
    ['AMB', 'AMBER'],
])

const macroTransparencyMap = new Map([
    ['CLR', 'CLEAR'],
    ['HZY', 'HAZY'],
    ['SLT', 'SL. TURBID'],
    ['TBD', 'TURBID'],
])

const microOptionsMap = new Map([
    ['NON', 'NONE'],
    ['RAR', 'RARE'],
    ['FEW', 'FEW'],
    ['MOD', 'MODERATE'],
    ['MNY', 'MANY'],
]);

const phOptionsMap = new Map([
    [5.0, '5.0'],
    [5.5, '5.5'],
    [6.0, '6.0'],
    [6.5, '6.5'],
    [7.0, '7.0'],
    [7.5, '7.5'],
    [8.0, '8.0'],
    [8.5, '8.5'],
    [9.0, '9.0'],
    [9.5, '9.5'],
]);

const spGravityOptionsMap = new Map([
    [1.000, '1.000'],
    [1.005, '1.005'],
    [1.010, '1.010'],
    [1.015, '1.015'],
    [1.020, '1.020'],
    [1.025, '1.025'],
    [1.030, '1.030'],
])

const uchemOptionsMap = new Map([
    ['NEG', 'NEGATIVE'],
    ['TRA', 'TRACE'],
    ['P1', '1+'],
    ['P2', '2+'],
    ['P3', '3+'],
    ['P4', '4+'],
])

const npOptionsMap = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

const fecaColorMap = new Map([
    ['DBRN', 'DARK BROWN'],
    ['BRN', 'BROWN'],
    ['LBRN', 'LIGHT BROWN'],
    ['YLW', 'YELLOW'],
    ['GRN', 'GREEN'],
    ['RED', 'RED'],
]);

const fecaConsistencyMap = new Map([
    ['FRM', 'FORMED'],
    ['SFRM', 'SEMI-FORMED'],
    ['SFT', 'SOFT'],
    ['WTR', 'WATERY'],
    ['SMCD', 'SLIGHTLY MUCOID'],
    ['MCD', 'MUCOID'],
])

const fecaMicroscopicFindingsMap = new Map([
    ['N/A', 'N/A'],
    ['NO OVA OR PARASITE SEEN', 'NO OVA OR PARASITE SEEN'],
    ['PRESENCE OF:', 'PRESENCE OF:'],
])

const emailConfig = {
    emailContent: {
        sendTo: '',
        sendCc: '',
        emailSubject: '',
        emailBody: '',
    }
}

class ClinicalMicroscopy extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        cmData: cmConfig,

        emailRec: '',
        emailData: emailConfig,
        emailModal: false,
        editViewFlag: false,

        selectedBranch: null,
        selectedChargeTo: null,
    }

    componentDidMount() {
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
        if (this.props.laboratoryList.length <= 0) {
            this.props.onGetItemLaboratories(this.props.userToken);
        }
    }

    handleSelectChange = (opt) => (event) => {
        this.props.onClearCMList('CM');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    setClinicalMicroscopyData = (updateCMData) => {
        this.setState({
            ...this.state,
            cmData: updateCMData,
        });
    }

    viewTransactions = () => {
        this.props.onClearCMList('CM');
        this.props
            .onViewCMList(
                this.props.userToken,
                'CM',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
            )
    }

    getCMinfo = (data) => {
        let specimen = null;
        let requestName = '';
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let branch = null;
        let patient = null;
        let corporate = null;
        let serviceRequest = [];
        let cashier = null;
        let labPerson = null;
        let txnRemarks = null;
        let txnDate = '';
        let dispatchType = '';
        let emailTo = '';
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
            dispatchType = txn.dispatch;
            emailTo = txn.emailTo;
            txnDispatch = txn.dispatch;
        }

        if (data.itemDetails !== undefined && data.itemDetails !== null) {
            const itm = data.itemDetails;
            requestName = itm.itemDescription;
            serviceRequest = itm.serviceRequest;

            const labIndex = this.props.laboratoryList.findIndex(lab => lab.key === itm.itemLaboratory);
            if (labIndex >= 0) {
                specimen = this.props.laboratoryList[labIndex].value;
            }
        }

        if (data.labPersonel !== undefined && data.labPersonel !== null) {
            labPerson = data.labPersonel
        }

        const updateCMData = updateObject(cmConfig, {
            id: data.id,
            laboratorySpecimen: specimen,
            txnId: txnId,
            txnSR: txnSR,
            txnType: txnType,
            branch: branch,
            patient: patient,
            corporate: corporate,
            requestName: requestName,
            serviceRequest: serviceRequest,
            cashier: cashier,
            labPerson: labPerson,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            dispatchType: dispatchType,
            emailTo: emailTo,
            txnDispatch: txnDispatch,
        });

        data.itemDetails.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'UCHEM':
                    const uchem = data.clinicalMicroscopy.urineChemical
                    if (uchem !== null) {

                        let colorOptValue = null;
                        let transparencyOptValue = null;

                        if (macroColorMap.has(uchem.color) === true) {
                            colorOptValue = {
                                value: uchem.color,
                                label: macroColorMap.get(uchem.color)
                            }
                        }

                        if (macroTransparencyMap.has(uchem.transparency) === true) {
                            transparencyOptValue = {
                                value: uchem.transparency,
                                label: macroTransparencyMap.get(uchem.transparency)
                            }
                        }

                        let phOptValue = null;
                        if (phOptionsMap.has(uchem.ph) === true) {
                            phOptValue = {
                                value: uchem.ph,
                                label: phOptionsMap.get(uchem.ph)
                            }
                        }

                        let spOptValue = null;
                        if (spGravityOptionsMap.has(uchem.spGravity) === true) {
                            spOptValue = {
                                value: uchem.spGravity,
                                label: spGravityOptionsMap.get(uchem.spGravity)
                            }
                        }

                        const uchemvalue = {
                            color: colorOptValue,
                            transparency: transparencyOptValue,
                            isColorError: false,
                            isTransparencyError: false,

                            rbc: uchem.rbc !== null ? uchem.rbc : '',
                            wbc: uchem.wbc !== null ? uchem.wbc : '',
                            ecells: this.checkMicroOptions(uchem.eCells),
                            mtreads: this.checkMicroOptions(uchem.mThreads),
                            bacteria: this.checkMicroOptions(uchem.bacteria),
                            amorphous: this.checkMicroOptions(uchem.amorphous),
                            caox: this.checkMicroOptions(uchem.caOX),
                            isRCBError: false,
                            isWBCError: false,

                            ph: phOptValue,
                            spGravity: spOptValue,
                            protien: this.checkUchemOptions(uchem.protien),
                            glucose: this.checkUchemOptions(uchem.glucose),
                            leukocyteEsterase: this.checkUchemOptions(uchem.leukocyteEsterase),
                            nitrite: this.checkNPOptions(uchem.nitrite),
                            urobilinogen: this.checkUchemOptions(uchem.urobilinogen),
                            blood: this.checkUchemOptions(uchem.blood),
                            ketone: this.checkUchemOptions(uchem.ketone),
                            bilirubin: this.checkUchemOptions(uchem.bilirubin),
                            otherNotes: uchem.otherNotes !== null ? uchem.otherNotes : '',
                        }
                        updateCMData.uchem = uchemvalue
                    }
                    break;

                case 'FECA':
                    const feca = data.clinicalMicroscopy.fecalysis
                    if (feca !== null) {

                        let faColorOptValue = null
                        let faConsistencyOptValue = null
                        let microscopicFindings = null
                        let otherNotes = ''

                        if (fecaColorMap.has(feca.color) === true) {
                            faColorOptValue = {
                                value: feca.color,
                                label: fecaColorMap.get(feca.color)
                            }
                        }

                        if (fecaConsistencyMap.has(feca.consistency) === true) {
                            faConsistencyOptValue = {
                                value: feca.consistency,
                                label: fecaConsistencyMap.get(feca.consistency)
                            }
                        }

                        // if (feca.microscopicFindings !== null) microscopicFindings = feca.microscopicFindings
                        if(fecaMicroscopicFindingsMap.has(feca.microscopicFindings) === true) {
                            microscopicFindings = {
                                value: feca.microscopicFindings,
                                label: fecaMicroscopicFindingsMap.get(feca.microscopicFindings)
                            }
                        }
                        
                        if (feca.otherNotes !== null) otherNotes = feca.otherNotes

                        const fecavalue = {
                            color: faColorOptValue,
                            consistency: faConsistencyOptValue,
                            microscopicFindings: microscopicFindings,
                            otherNotes: otherNotes,
                        }
                        updateCMData.feca = fecavalue
                    }
                    break;

                case 'AFB':
                    const afb = data.clinicalMicroscopy.afb
                    if (afb !== null) {

                        let va1 = ''
                        let va2 = ''
                        let rs1 = ''
                        let rs2 = ''
                        let diag = ''

                        if (afb.visualAppearance1 !== null) va1 = afb.visualAppearance1
                        if (afb.visualAppearance2 !== null) va2 = afb.visualAppearance2
                        if (afb.reading1 !== null) rs1 = afb.reading1
                        if (afb.reading2 !== null) rs2 = afb.reading2
                        if (afb.diagnosis !== null) diag = afb.diagnosis

                        const afbvalue = {
                            visualApperanceSpecimen1: va1,
                            visualApperanceSpecimen2: va2,
                            readingSpecimen1: rs1,
                            readingSpecimen2: rs2,
                            diagnosis: diag,
                        }
                        updateCMData.afb = afbvalue
                    }
                    break;

                case 'PREGT':
                    const pt = data.clinicalMicroscopy.ptobt
                    if (pt !== null) {

                        const ptvalue = {
                            result: this.checkNPOptions(data.clinicalMicroscopy.ptobt.pregnancyTest)
                        }
                        updateCMData.preg = ptvalue
                    }
                    break;

                case 'OBT':
                    const obt = data.clinicalMicroscopy.ptobt
                    if (obt !== null) {

                        const obtvalue = {
                            result: this.checkNPOptions(data.clinicalMicroscopy.ptobt.occultBloodTest)
                        }
                        updateCMData.obt = obtvalue
                    }
                    break;

                default: break
            }
        })

        const otno = {
            otherNotes: data.otherNotes !== null ? data.otherNotes : '',
        }

        updateCMData.otno = otno

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
        updateCMData.doctor = patho

        let qualityControl = null
        if (data.qualityControl !== null) qualityControl = data.qualityControl
        updateCMData.qualityControl = qualityControl
        return updateCMData
    }

    openClinicalMicroscopyModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const updateCMData = this.getCMinfo(data)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                cmData: updateCMData,
                editViewFlag: false
            });

        }
    }

    viewClinicalMicroscopyModal = (cmRowData, idx) => {
        if (cmRowData.status >= 2) {
            const updateCMData = this.getCMinfo(cmRowData)

            this.setState({
                ...this.state,
                showModal: true,
                updateIndex: idx,
                cmData: updateCMData,
                editViewFlag: true
            });
        } else {
            Swal.fire({
                title: 'Please enter results to view.',
                icon: 'warning',
                text: 'Record not yet ready for viewing.',
            })
        }
    }

    checkMicroOptions = (opt) => {
        let microOptValue = null;
        if (microOptionsMap.has(opt) === true) {
            microOptValue = {
                value: opt,
                label: microOptionsMap.get(opt)
            }
        }
        return microOptValue
    }

    checkUchemOptions = (opt) => {
        let uchemOptValue = null;
        if (uchemOptionsMap.has(opt) === true) {
            uchemOptValue = {
                value: opt,
                label: uchemOptionsMap.get(opt)
            }
        }
        return uchemOptValue
    }

    checkNPOptions = (opt) => {
        let npOptValue = null;
        if (npOptionsMap.has(opt) === true) {
            npOptValue = {
                value: opt,
                label: npOptionsMap.get(opt)
            }
        }
        return npOptValue
    }

    closeModal = (cmResponse) => {
        this.setState({
            ...this.state,
            emailModal: false,
            showModal: false,
            editViewFlag: false
        });

        if (cmResponse !== null) {
            if (this.state.updateIndex !== null) {
                this.clinicalMicroscopyTableRef.updateClinicalMicroscopyToTable(cmResponse, this.state.updateIndex);
            }
        }
    }

    saveResults = () => {
        const cmData = this.state.cmData
        let cmRequest = {}
        cmData.serviceRequest.forEach(req => {
            switch (req.laboratoryRequest) {
                case 'UCHEM':
                    const uchem = cmData.uchem

                    let mColor = null
                    let mTransparency = null

                    let rbc = null
                    let wbc = null
                    let ecells = null
                    let mtreads = null
                    let bacteria = null
                    let amorphous = null
                    let caox = null

                    let ph = null
                    let spGravity = null
                    let protien = null
                    let glucose = null
                    let leukocyteEsterase = null
                    let nitrite = null
                    let urobilinogen = null
                    let blood = null
                    let ketone = null
                    let bilirubin = null
                    let otherNotes = null

                    if (uchem.color !== null) mColor = uchem.color.value
                    if (uchem.transparency !== null) mTransparency = uchem.transparency.value

                    if (uchem.rbc !== '') rbc = uchem.rbc
                    if (uchem.wbc !== '') wbc = uchem.wbc
                    if (uchem.ecells !== null) ecells = uchem.ecells.value
                    if (uchem.mtreads !== null) mtreads = uchem.mtreads.value
                    if (uchem.bacteria !== null) bacteria = uchem.bacteria.value
                    if (uchem.amorphous !== null) amorphous = uchem.amorphous.value
                    if (uchem.caox !== null) caox = uchem.caox.value

                    if (uchem.ph !== null) ph = uchem.ph.value
                    if (uchem.spGravity !== null) spGravity = uchem.spGravity.value
                    if (uchem.protien !== null) protien = uchem.protien.value
                    if (uchem.glucose !== null) glucose = uchem.glucose.value
                    if (uchem.leukocyteEsterase !== null) leukocyteEsterase = uchem.leukocyteEsterase.value
                    if (uchem.nitrite !== null) nitrite = uchem.nitrite.value
                    if (uchem.urobilinogen !== null) urobilinogen = uchem.urobilinogen.value
                    if (uchem.blood !== null) blood = uchem.blood.value
                    if (uchem.ketone !== null) ketone = uchem.ketone.value
                    if (uchem.bilirubin !== null) bilirubin = uchem.bilirubin.value
                    if (uchem.otherNotes !== '') otherNotes = uchem.otherNotes

                    const urinechemical = {
                        color: mColor,
                        transparency: mTransparency,

                        rbc: rbc,
                        wbc: wbc,
                        eCells: ecells,
                        mThreads: mtreads,
                        bacteria: bacteria,
                        amorphous: amorphous,
                        caOX: caox,

                        ph: ph,
                        spGravity: spGravity,
                        protien: protien,
                        glucose: glucose,
                        leukocyteEsterase: leukocyteEsterase,
                        nitrite: nitrite,
                        urobilinogen: urobilinogen,
                        blood: blood,
                        ketone: ketone,
                        bilirubin: bilirubin,
                        otherNotes: otherNotes
                    }
                    cmRequest.urineChemical = urinechemical
                    break;

                case 'FECA':
                    const feca = cmData.feca
                    let fecacolor = null
                    let fecaconst = null
                    let fecafind = null
                    let fecaotno = null

                    if (feca.color !== null) fecacolor = feca.color.value
                    if (feca.consistency !== null) fecaconst = feca.consistency.value
                    if (feca.microscopicFindings !== null) fecafind = feca.microscopicFindings.value
                    if (feca.otherNotes !== '') fecaotno = feca.otherNotes

                    const fecavalues = {
                        color: fecacolor,
                        consistency: fecaconst,
                        microscopicFindings: fecafind,
                        otherNotes: fecaotno
                    }
                    cmRequest.fecalysis = fecavalues
                    break;

                case 'PREGT':
                case 'OBT':
                    const pt = cmData.preg
                    const obt = cmData.obt

                    let pregtest = null
                    let occbtest = null

                    if (pt.result !== null) pregtest = pt.result.value
                    if (obt.result !== null) occbtest = obt.result.value

                    const ptobt = {
                        pregnancyTest: pregtest,
                        occultBloodTest: occbtest
                    }
                    cmRequest.ptobt = ptobt
                    break;

                case 'AFB':
                    const afb = cmData.afb

                    let visualAppearance1 = null
                    let visualAppearance2 = null
                    let reading1 = null
                    let reading2 = null
                    let diagnosis = null

                    if (afb.visualApperanceSpecimen1 !== '') visualAppearance1 = afb.visualApperanceSpecimen1
                    if (afb.visualApperanceSpecimen2 !== '') visualAppearance2 = afb.visualApperanceSpecimen2
                    if (afb.readingSpecimen1 !== '') reading1 = afb.readingSpecimen1
                    if (afb.readingSpecimen2 !== '') reading2 = afb.readingSpecimen2
                    if (afb.diagnosis !== '') diagnosis = afb.diagnosis

                    const acidfastbacilli = {
                        visualAppearance1: visualAppearance1,
                        visualAppearance2: visualAppearance2,
                        reading1: reading1,
                        reading2: reading2,
                        diagnosis: diagnosis
                    }
                    cmRequest.afb = acidfastbacilli
                    break;

                default: break
            }
        })

        let otno = null
        if (cmData.otno.otherNotes !== "") otno = cmData.otno.otherNotes
        cmRequest.otherNotes = otno

        let patho = null
        if (cmData.doctor !== null) patho = cmData.doctor.pathologist.value
        cmRequest.pathologistId = patho

        const transid = cmData.txnId
        const labid = cmData.id

        Swal.fire({
            title: 'Clinical Microscopy',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSaveClinicalMicroscopy(this.props.userToken, cmRequest, transid, labid, this.closeModal)
            }
        })
    };

    onPrintClinicalMicroscopy = (transid, labid, status, headerControl) => {

        // const roles = [].concat(this.props.auth.roles)
        //     .filter(r => r === 'ADMIN');

        // if (roles.length > 0) {
            if (status >= 2) {
                Swal.fire({
                    title: 'Clinical Microscopy Result',
                    text: "Do you want to print this report?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.props.onPrintClinicalMicroscopy(this.props.userToken, transid, labid, headerControl)
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
                this.props.onQCClinicalMicroscopy(this.props.userToken, transid, labid, this.closeModal);
            }
        })
    }
    onShowEmailModal = (data) => {
        const updateCMData = this.getCMinfo(data)
        this.setState({
            ...this.state,
            emailModal: true,
            CMData: updateCMData,
            modalTitle: "Email Clinical Microscopy",
            emailData: {
                emailContent: {
                    sendTo: updateCMData.emailTo,
                    sendCc: '',
                    emailSubject: 'Clinical Microscopy Results',
                    emailBody:
                        `Dear Team,\n\nYou may now look to the attached file of your result in PDF format and Excel format.\nFor any question/classification, please contact us at 0917-535-9417 for Globe and\n0925-577-8378 for Sun/Smart or send us an email at\nquestphil.corpresult@gmail.com\n\nThank you for your concern!\n\nYours truly,\n\nQuest Diagnostics Team`,
                }
            }
        });
    }

    onSendEmailClinicalMiscroscopy = (emailValues, transid, labid) => {

        Swal.fire({
            title: 'Clinical Microscopy',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendEmailClinicalMiscroscopy(this.props.userToken, emailValues, transid, labid, this.closeModal);
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

                <ClinicalMicroscopyModal
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    cmData={this.state.cmData}
                    setCMData={this.setClinicalMicroscopyData}
                    doctorList={this.props.doctorList}
                    editViewFlag={this.state.editViewFlag}
                    onPrintClinicalMicroscopy={this.onPrintClinicalMicroscopy}
                    onQualityControl={this.onQualityControl}
                />

                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.cmData}
                    emailData={this.state.emailData}
                    closeClick={this.closeModal}
                    onSendEmail={this.onSendEmailClinicalMiscroscopy}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Clinical Microscopy</h3>
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
                                <ClinicalMicroscopyTable
                                    onRef={ref => (this.clinicalMicroscopyTableRef = ref)}
                                    openClinicalMicroscopyModal={this.openClinicalMicroscopyModal}
                                    viewClinicalMicroscopyModal={this.viewClinicalMicroscopyModal}
                                    onPrintClinicalMicroscopy={this.onPrintClinicalMicroscopy}
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
        cmList: state.lab.cMicroscopyList,
        doctorList: state.docs.doctorList,
        laboratoryList: state.items.itemLaboratories,
        doctorInfo: state.docs.doctorData,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        branchList: state.bran.branchList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onGetAllBranches: (token) => dispatch(actions.getAllBranches(token)),
        onGetAllCorporates: (token) => dispatch(actions.getAllActiveCorporates(token)),
        onGetDoctor: (token, docid) => dispatch(actions.getDoctor(token, docid)),
        onGetItemLaboratories: (token) => dispatch(actions.getItemLaboratories(token)),
        onSaveClinicalMicroscopy: (token, peValues, transid, labid, closeModal) => dispatch(actions.saveClinicalMicroscopy(token, peValues, transid, labid, closeModal)),
        onViewCMList: (token, procedure, startDate, endDate, branchId, chargeTo) => dispatch(actions.getLaboratoryServiceRequests(token, procedure, startDate, endDate, branchId, chargeTo)),
        onClearCMList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onPrintClinicalMicroscopy: (token, transid, labid, withHeaderFooter) => dispatch(actions.printClinicalMicroscopy(token, transid, labid, withHeaderFooter)),
        onQCClinicalMicroscopy: (token, transid, labid, closeModal) => dispatch(actions.qualityControlClinicalMicroscopy(token, transid, labid, closeModal)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ClinicalMicroscopy));