import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import * as actions from 'src/store/actions/index';
import { withStyles } from '@material-ui/core/styles';
import { updateObject, doctorName } from 'src/store/utility';
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

import {
    Backdrop,
    CircularProgress,
    FormControl,
} from '@material-ui/core';

import IndustrialTable from 'src/containers/tables/laboratory/IndustrialTable';
import IndustrialModal from 'src/containers/modal/laboratory/IndustrialModal';

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

const industrialConfig = {
    id: null,
    txnId: '',
    txnType: '',
    branch: null,
    patient: null,
    corporate: null,
    itemDetails: null,
    requestName: '',
    laboratoryRequest: [],
    laboratoryServices: [],
    cashier: null,
    txnRemarks: null,
    txnDate: '',
    txnDispatch: null,
}

const hemaConfig = {
    id: null,
    requestType: 'HE',
    requestName: '',
    showCollapse: true,
    cbc: {
        whiteBloodCells: '',
        basophils: '',
        neutrophils: '',
        redBloodCells: '',
        lymphocytes: '',
        hemoglobin: '',
        monocytes: '',
        hematocrit: '',
        eosinophils: '',
        platelet: '',
        referenceLab: '',
    },
    btyp: {
        bloodType: null,
        rhesusFactor: null,
        referenceLab: '',
    },
    ctm: {
        timeMin: '',
        timeSec: '',
        referenceLab: '',
    },
    btm: {
        timeMin: '',
        timeSec: '',
        referenceLab: '',
    },
    ptm: {
        patientTime: '',
        patientTimeNormalValue: '',
        control: '',
        controlNormalValue: '',
        percentActivity: '',
        percentActivityNormalValue: '',
        inr: '',
        inrNormalValue: '',
        referenceLab: '',
    },
    pr131: {
        result: '',
        referenceLab: '',
    },
    aptt: {
        patientTime: '',
        patientTimeNormalValue: '',
        control: '',
        controlNormalValue: '',
        referenceLab: '',
    },
    masm: {
        result: null,
        referenceLab: '',
    },
    esr: {
        rate: '',
        esrMethod: null,
        referenceLab: '',
    },
    otno: {
        otherNotes: '',
    },
}

const cmConfig = {
    id: null,
    laboratorySpecimen: null,
    requestType: 'CM',
    requestName: '',
    showCollapse: true,
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
        referenceLab: '',
    },
    feca: {
        color: null,
        consistency: null,
        microscopicFindings: null,
        otherNotes: '',
        referenceLab: '',
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
}

const chemConfig = {
    id: null,
    requestType: 'CH',
    requestName: '',
    showCollapse: true,
    fbs: {
        result: '',
        conventional: '',
        referenceLab: '',
    },
    rbs: {
        result: '',
        conventional: '',
        referenceLab: '',
    },
    pprbs: {
        result: '',
        conventional: '',
        referenceLab: '',
    },
    urac: {
        result: '',
        conventional: '',
        referenceLab: '',
    },
    bun: {
        result: '',
        conventional: '',
        referenceLab: '',
    },
    crea: {
        result: '',
        conventional: '',
        referenceLab: '',
    },
    hba1c: {
        hemoglobinA1C: '',
        referenceLab: '',
    },
    prot: {
        totalProtein: '',
        albumin: '',
        globulin: '',
        agRatio: '',
        referenceLab: '',
    },
    lipp: {
        cholesterolResult: '',
        cholesterolConventional: '',
        triglyceridesResult: '',
        triglyceridesConventional: '',
        hdlResult: '',
        hdlConventional: '',
        ldlResult: '',
        ldlConventional: '',
        hdlRatio: '',
        vldl: '',
        referenceLab: '',
    },
    ogtt: {
        ogtt1HrResult: '',
        ogtt1HrConventional: '',
        ogtt2HrResult: '',
        ogtt2HrConventional: '',
        referenceLab: '',
    },
    ogct: {
        result: '',
        conventional: '',
        referenceLab: '',
    },
    elec: {
        sodium: '',
        potassium: '',
        chloride: '',
        inorganicPhosphorus: '',
        totalCalcium: '',
        ionizedCalcium: '',
        magnesium: '',
        referenceLab: '',
    },
    enzy: {
        sgptalt: '',
        sgotast: '',
        amylase: '',
        lipase: '',
        ggtp: '',
        ldh: '',
        apl: '',
        referenceLab: '',
    },
    cpk: {
        cpkmb: '',
        cpkmm: '',
        totalCpk: '',
        referenceLab: '',
    },
    bili: {
        totalAdult: '',
        direct: '',
        indirect: '',
        referenceLab: '',
    },
    otno: {
        otherNotes: '',
    },
}

const seroConfig = {
    id: null,
    requestType: 'SE',
    requestName: '',
    showCollapse: true,
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
        referenceLab: '',
    },
    typh: {
        igm: null,
        igg: null,
        referenceLab: '',
    },
    thyr: {
        tsh: '',
        ft3: '',
        t3: '',
        ft4: '',
        t4: '',
        referenceLab: '',
    },
    crp: {
        dilution: '',
        result: '',
        referenceLab: '',
    },
    hiv: {
        test1: null,
        test2: null,
        referenceLab: '',
    },
    agen: {
        prostateSpecificAntigen: '',
        carcenoembryonicAntigen: '',
        alphaFetoprotein: '',
        cancerAntigen125: '',
        cancerAntigen199: '',
        cancerAntigen153: '',
        referenceLab: '',
    },
    rtantigen: {
        cov_ag: '',
        collectionDate: '',
        purpose: '',
        referenceLab: '',
    },
    covid: {
        sarscov2igg: null,
        sarscov2igm: null,
        referenceLab: '',
    },
    otno: {
        otherNotes: '',
    },
}

const toxiConfig = {
    id: null,
    requestType: 'TO',
    requestName: '',
    showCollapse: true,
    toxi: {
        metha: null,
        tetra: null,
    }
}

const npOptionsMap = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

const rnOptions = new Map([
    [true, 'REACTIVE'],
    [false, 'NONREACTIVE'],
])

const btOptions = new Map([
    ['A', 'A'],
    ['O', 'O'],
    ['B', 'B'],
    ['AB', 'AB'],
])

const esrMethod = new Map([
    ['WINTROBE', 'WINTROBE'],
    ['WESTERGREN', 'WESTERGREN'],
])

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

const fecaColorMap = new Map([
    ['GRN', 'GREEN'],
    ['YLW', 'YELLOW'],
    ['LBRN', 'LIGHT BROWN'],
    ['BRN', 'BROWN'],
    ['DBRN', 'DARK BROWN'],
    ['RED', 'RED'],
]);

const fecaConsistencyMap = new Map([
    ['FRM', 'FORMED'],
    ['SFRM', 'SEMI-FORMED'],
    ['SFT', 'SOFT'],
    ['WTR', 'WATERY'],
    ['SMCD', 'SLIGHTLY MUCOID'],
    ['MCD', 'MUCOID'],
]);

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


class Industrial extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showModal: false,
        viewModal: false,

        emailData: emailConfig,
        emailModal: false,

        indData: industrialConfig,
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
        if (this.props.laboratoryList.length <= 0) {
            this.props.onGetItemLaboratories(this.props.userToken);
        }
    }

    setIndustrialData = (updateIndData) => {
        this.setState({
            ...this.state,
            indData: updateIndData,
        });
    }

    handleSelectChange = (opt) => (event) => {
        this.props.onClearINDList('IND');
        this.setState({
            ...this.state,
            [opt]: event,
        });
    }

    viewTransactions = () => {
        this.props.onClearINDList('IND');
        this.props
            .onViewINDList(
                this.props.userToken,
                'IND',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                {
                    itemType: 'PCK',
                    branchId: this.state.selectedBranch !== null ? this.state.selectedBranch.value : null,
                    chargeTo: this.state.selectedChargeTo !== null ? this.state.selectedChargeTo.value : null,
                }
            )
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

    openIndustrialModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const labRequest = [];
            const labServices = [];

            data.transactionLabRequests.forEach(lab => {
                const itemDetails = lab.itemDetails;
                labServices.push(itemDetails);
                if (itemDetails.itemCategory === 'LAB') {
                    const procedure = lab.itemDetails.itemLaboratoryProcedure;
                    let item = null;
                    switch (procedure) {
                        case 'CM':
                            let specimen = null;
                            const labIndex = this.props.laboratoryList.findIndex(itm => itm.key === lab.itemDetails.itemLaboratory);
                            if (labIndex >= 0) {
                                specimen = this.props.laboratoryList[labIndex].value;
                            }

                            item = updateObject(cmConfig, {
                                id: lab.id,
                                laboratorySpecimen: specimen,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'UCHEM':
                                        if (lab.clinicalMicroscopy.urineChemical !== null) {
                                            item.uchem = this.openCMUCHEM(lab.clinicalMicroscopy.urineChemical)
                                        }
                                        break;

                                    case 'FECA':
                                        if (lab.clinicalMicroscopy.fecalysis !== null) {
                                            item.feca = this.openCMFECA(lab.clinicalMicroscopy.fecalysis)
                                        }
                                        break;

                                    case 'AFB':
                                        if (lab.clinicalMicroscopy.afb !== null) {
                                            item.afb = this.openCMAFB(lab.clinicalMicroscopy.afb)
                                        }
                                        break;

                                    case 'PREGT':
                                        const pt = lab.clinicalMicroscopy.ptobt
                                        if (pt !== null) {

                                            const ptvalue = {
                                                result: this.checkNPOptions(lab.clinicalMicroscopy.ptobt.pregnancyTest)
                                            }
                                            item.preg = ptvalue
                                        }
                                        break;

                                    case 'OBT':
                                        const obt = lab.clinicalMicroscopy.ptobt
                                        if (obt !== null) {

                                            const obtvalue = {
                                                result: this.checkNPOptions(lab.clinicalMicroscopy.ptobt.occultBloodTest)
                                            }
                                            item.obt = obtvalue
                                        }
                                        break;

                                    default: break;
                                }
                            })

                            item.otno.otherNotes = lab.otherNotes !== null ? lab.otherNotes : '';

                            break;

                        case 'HE':
                            item = updateObject(hemaConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'CBC':
                                        if (lab.hematology.cbc !== null) {
                                            item.cbc = this.openHECBC(lab.hematology.cbc)
                                        }
                                        break;

                                    case 'BTYP':
                                        if (lab.hematology.bloodTyping !== null) {
                                            item.btyp = this.openHEBTYP(lab.hematology.bloodTyping)
                                        }
                                        break;

                                    case 'CTM':
                                    case 'BTM':
                                        const ctbt = lab.hematology.ctbt
                                        if (ctbt !== null) {

                                            let ctm = ''
                                            let cts = ''
                                            let btm = ''
                                            let bts = ''

                                            if (ctbt.clottingTimeMin !== null) ctm = ctbt.clottingTimeMin
                                            if (ctbt.clottingTimeSec !== null) cts = ctbt.clottingTimeSec
                                            if (ctbt.bleedingTimeMin !== null) btm = ctbt.bleedingTimeMin
                                            if (ctbt.bleedingTimeSec !== null) bts = ctbt.bleedingTimeSec

                                            const ctmvalues = {
                                                timeMin: ctm,
                                                timeSec: cts,
                                            }
                                            const btmvalues = {
                                                timeMin: btm,
                                                timeSec: bts
                                            }

                                            item.ctm = ctmvalues
                                            item.btm = btmvalues
                                        }
                                        break;

                                    case 'PTM':
                                        if (lab.hematology.prothombinTime !== null) {
                                            item.ptm = this.openHEPTM(lab.hematology.prothombinTime)
                                        }
                                        break;

                                    case 'PR131':
                                    case 'MASM':
                                        const prms = lab.hematology.prms
                                        if (prms !== null) {

                                            if (prms.pr131 !== null) {
                                                const prvalues = {
                                                    result: prms.pr131
                                                }
                                                item.pr131 = prvalues
                                            }

                                            if (prms.malarialSmear !== null) {
                                                let msvalues = null
                                                if (npOptionsMap.has(prms.malarialSmear) === true) {
                                                    msvalues = {
                                                        result: {
                                                            value: prms.malarialSmear,
                                                            label: npOptionsMap.get(prms.malarialSmear)
                                                        }
                                                    }
                                                }
                                                item.masm = msvalues
                                            }
                                        }
                                        break;

                                    case 'APTT':
                                        if (lab.hematology.aptt !== null) {
                                            item.aptt = this.openHEAPTT(lab.hematology.aptt)
                                        }
                                        break;

                                    case 'ESR':
                                        if (lab.hematology.esr !== null) {
                                            item.esr = this.openHEESR(lab.hematology.esr)
                                        }
                                        break;

                                    default: break;
                                }
                            })


                            item.otno.otherNotes = lab.otherNotes !== null ? lab.otherNotes : '';

                            break;

                        case 'CH':
                            item = updateObject(chemConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'FBS':
                                        if (lab.chemistry.fbs !== null) {
                                            item.fbs = this.openCHFBS(lab.chemistry.fbs)
                                        }
                                        break;

                                    case 'RBS':
                                        if (lab.chemistry.rbs !== null) {
                                            item.rbs = this.openCHRBS(lab.chemistry.rbs)
                                        }
                                        break;

                                    case 'PPRBS':
                                        if (lab.chemistry.pprbs !== null) {
                                            item.pprbs = this.openCHPPRBS(lab.chemistry.pprbs)
                                        }
                                        break;

                                    case 'URAC':
                                        if (lab.chemistry.uricAcid !== null) {
                                            item.urac = this.openCHURAC(lab.chemistry.uricAcid)
                                        }
                                        break;

                                    case 'BUN':
                                        if (lab.chemistry.bun !== null) {
                                            item.bun = this.openCHBUN(lab.chemistry.bun)
                                        }

                                        break;

                                    case 'CREA':
                                        if (lab.chemistry.creatinine !== null) {
                                            item.crea = this.openCHCREA(lab.chemistry.creatinine)
                                        }
                                        break;

                                    case 'HBA1C':
                                        if (lab.chemistry.hemoglobin !== null) {
                                            item.hba1c = this.openCHHBA1C(lab.chemistry.hemoglobin)
                                        }
                                        break;

                                    case 'LIPP':
                                        if (lab.chemistry.lipidProfile !== null) {
                                            item.lipp = this.openCHLIPP(lab.chemistry.lipidProfile)
                                        }
                                        break;

                                    case 'OGTT':
                                        if (lab.chemistry.ogtt !== null) {
                                            item.ogtt = this.openCHOGTT(lab.chemistry.ogtt)
                                        }
                                        break;

                                    case 'OGCT':
                                        if (lab.chemistry.ogct !== null) {
                                            item.ogct = this.openCHOGCT(lab.chemistry.ogct)
                                        }
                                        break;

                                    case 'ELEC':
                                        if (lab.chemistry.electrolytes !== null) {
                                            item.elec = this.openCHELEC(lab.chemistry.electrolytes)
                                        }
                                        break;

                                    case 'ENZY':
                                        if (lab.chemistry.enzymes !== null) {
                                            item.enzy = this.openCHENZY(lab.chemistry.enzymes)
                                        }
                                        break;

                                    case 'CPK':
                                        if (lab.chemistry.cpk !== null) {
                                            item.cpk = this.openCHCPK(lab.chemistry.cpk)
                                        }
                                        break;

                                    case 'BILI':
                                        if (lab.chemistry.bilirubin !== null) {
                                            item.bili = this.openCHBILI(lab.chemistry.bilirubin)
                                        }
                                        break;

                                    case 'PROT':
                                        if (lab.chemistry.protein !== null) {
                                            item.prot = this.openCHPROT(lab.chemistry.protein)
                                        }
                                        break;
                                    default: break;
                                }
                            })

                            item.otno.otherNotes = lab.otherNotes !== null ? lab.otherNotes : '';

                            break;

                        case 'SE':
                            item = updateObject(seroConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'SER':
                                        if (lab.serology.serology !== null) {
                                            item.ser = this.openSESER(lab.serology.serology)
                                        }
                                        break;

                                    case 'THYR':
                                        if (lab.serology.thyroid !== null) {
                                            item.thyr = this.openSETHYR(lab.serology.thyroid)
                                        }
                                        break;

                                    case 'TYPH':
                                        if (lab.serology.typhidot !== null) {
                                            item.typh = this.openSETYPH(lab.serology.typhidot)
                                        }
                                        break;

                                    case 'CRP':
                                        if (lab.serology.crp !== null) {
                                            item.crp = this.openSECRP(lab.serology.crp)
                                        }
                                        break;

                                    case 'HIV':
                                        if (lab.serology.hiv !== null) {
                                            item.hiv = this.openSEHIV(lab.serology.hiv)
                                        }
                                        break;

                                    case 'AGEN':
                                        const antigen = lab.serology.antigen
                                        if (antigen !== null) {
                                            let psa = ''
                                            let cea = ''
                                            let afp = ''
                                            let ca125 = ''
                                            let ca199 = ''
                                            let ca153 = ''

                                            if (antigen.psa !== null) psa = antigen.psa
                                            if (antigen.cea !== null) cea = antigen.cea
                                            if (antigen.afp !== null) afp = antigen.afp
                                            if (antigen.ca125 !== null) ca125 = antigen.ca125
                                            if (antigen.ca199 !== null) ca199 = antigen.ca199
                                            if (antigen.ca153 !== null) ca153 = antigen.ca153

                                            item.agen = {
                                                prostateSpecificAntigen: psa,
                                                carcenoembryonicAntigen: cea,
                                                alphaFetoprotein: afp,
                                                cancerAntigen125: ca125,
                                                cancerAntigen199: ca199,
                                                cancerAntigen153: ca153,
                                            }
                                        }
                                        break;

                                    case 'COVID':
                                        if (lab.serology.covid !== null) {
                                            item.covid = this.openSECOVID(lab.serology.covid)
                                        }
                                        break;

                                    case 'ANTIGEN':
                                        if (lab.serology.covid !== null) {
                                            item.rtantigen = this.openSERTANTIGEN(lab.serology.rtantigen)
                                        }
                                        break;

                                    default: break;
                                }
                            })

                            item.otno.otherNotes = lab.otherNotes !== null ? lab.otherNotes : '';

                            break;

                        case 'TO':
                            item = updateObject(toxiConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            const toxi = lab.toxicology

                            if (toxi !== null) {
                                if (toxi.methamphethamine !== null) {
                                    let methavalue = null

                                    if (npOptionsMap.has(toxi.methamphethamine) === true) {
                                        methavalue = {
                                            value: toxi.methamphethamine,
                                            label: npOptionsMap.get(toxi.methamphethamine)
                                        }
                                    }

                                    item.toxi.metha = methavalue
                                }

                                if (toxi.tetrahydrocanabinol !== null) {
                                    let tetravalue = null

                                    if (npOptionsMap.has(toxi.tetrahydrocanabinol) === true) {
                                        tetravalue = {
                                            value: toxi.tetrahydrocanabinol,
                                            label: npOptionsMap.get(toxi.tetrahydrocanabinol)
                                        }
                                    }

                                    item.toxi.tetra = tetravalue
                                }
                            }
                            break;

                        default: break;
                    }

                    if (item !== null) {
                        labRequest.push(updateObject(lab, {
                            ...item
                        }));
                    }
                }
            });

            if (labRequest.length > 0) {
                const updateIndData = this.getIndInfo(data, labRequest, labServices);

                this.setState({
                    ...this.state,
                    showModal: true,
                    editViewFlag: false,
                    updateIndex: idx,
                    indData: updateIndData,
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

    viewIndustrialModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            const labRequest = [];
            const labServices = [];

            data.transactionLabRequests.forEach(lab => {
                const itemDetails = lab.itemDetails;
                labServices.push(itemDetails);
                if (itemDetails.itemCategory === 'LAB') {
                    const procedure = lab.itemDetails.itemLaboratoryProcedure;
                    let item = null;
                    switch (procedure) {
                        case 'CM':
                            let specimen = null;
                            const labIndex = this.props.laboratoryList.findIndex(itm => itm.key === lab.itemDetails.itemLaboratory);
                            if (labIndex >= 0) {
                                specimen = this.props.laboratoryList[labIndex].value;
                            }

                            item = updateObject(cmConfig, {
                                id: lab.id,
                                laboratorySpecimen: specimen,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'UCHEM':
                                        if (lab.clinicalMicroscopy.urineChemical !== null) {
                                            item.uchem = this.openCMUCHEM(lab.clinicalMicroscopy.urineChemical)
                                        }
                                        break;

                                    case 'FECA':
                                        if (lab.clinicalMicroscopy.fecalysis !== null) {
                                            item.feca = this.openCMFECA(lab.clinicalMicroscopy.fecalysis)
                                        }
                                        break;

                                    case 'AFB':
                                        if (lab.clinicalMicroscopy.afb !== null) {
                                            item.afb = this.openCMAFB(lab.clinicalMicroscopy.afb)
                                        }
                                        break;

                                    case 'PREGT':
                                        const pt = lab.clinicalMicroscopy.ptobt
                                        if (pt !== null) {

                                            const ptvalue = {
                                                result: this.checkNPOptions(lab.clinicalMicroscopy.ptobt.pregnancyTest)
                                            }
                                            item.preg = ptvalue
                                        }
                                        break;

                                    case 'OBT':
                                        const obt = lab.clinicalMicroscopy.ptobt
                                        if (obt !== null) {

                                            const obtvalue = {
                                                result: this.checkNPOptions(lab.clinicalMicroscopy.ptobt.occultBloodTest)
                                            }
                                            item.obt = obtvalue
                                        }
                                        break;

                                    default: break;
                                }

                                item.otno = {
                                    otherNotes: lab.clinicalMicroscopy.otherNotes !== null ? lab.clinicalMicroscopy.otherNotes : ''
                                }
                            })

                            break;

                        case 'HE':
                            item = updateObject(hemaConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'CBC':
                                        if (lab.hematology.cbc !== null) {
                                            item.cbc = this.openHECBC(lab.hematology.cbc)
                                        }
                                        break;

                                    case 'BTYP':
                                        if (lab.hematology.bloodTyping !== null) {
                                            item.btyp = this.openHEBTYP(lab.hematology.bloodTyping)
                                        }
                                        break;

                                    case 'CTM':
                                    case 'BTM':
                                        const ctbt = lab.hematology.ctbt
                                        if (ctbt !== null) {

                                            let ctm = ''
                                            let cts = ''
                                            let btm = ''
                                            let bts = ''

                                            if (ctbt.clottingTimeMin !== null) ctm = ctbt.clottingTimeMin
                                            if (ctbt.clottingTimeSec !== null) cts = ctbt.clottingTimeSec
                                            if (ctbt.bleedingTimeMin !== null) btm = ctbt.bleedingTimeMin
                                            if (ctbt.bleedingTimeSec !== null) bts = ctbt.bleedingTimeSec

                                            const ctmvalues = {
                                                timeMin: ctm,
                                                timeSec: cts,
                                            }
                                            const btmvalues = {
                                                timeMin: btm,
                                                timeSec: bts
                                            }

                                            item.ctm = ctmvalues
                                            item.btm = btmvalues
                                        }
                                        break;

                                    case 'PTM':
                                        if (lab.hematology.prothombinTime !== null) {
                                            item.ptm = this.openHEPTM(lab.hematology.prothombinTime)
                                        }
                                        break;

                                    case 'PR131':
                                    case 'MASM':
                                        const prms = lab.hematology.prms
                                        if (prms !== null) {

                                            const prvalues = {
                                                result: prms.pr131
                                            }

                                            let msvalues = null
                                            if (npOptionsMap.has(prms.malarialSmear) === true) {
                                                msvalues = {
                                                    result: {
                                                        value: prms.malarialSmear,
                                                        label: npOptionsMap.get(prms.malarialSmear)
                                                    }
                                                }
                                            }

                                            item.pr131 = prvalues
                                            item.masm = msvalues
                                        }
                                        break;

                                    case 'APTT':
                                        if (lab.hematology.aptt !== null) {
                                            item.aptt = this.openHEAPTT(lab.hematology.aptt)
                                        }
                                        break;

                                    case 'ESR':
                                        if (lab.hematology.esr !== null) {
                                            item.esr = this.openHEESR(lab.hematology.esr)
                                        }
                                        break;

                                    default: break;
                                }
                            })

                            break;

                        case 'CH':
                            item = updateObject(chemConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'FBS':
                                        if (lab.chemistry.fbs !== null) {
                                            item.fbs = this.openCHFBS(lab.chemistry.fbs)
                                        }
                                        break;

                                    case 'RBS':
                                        if (lab.chemistry.rbs !== null) {
                                            item.rbs = this.openCHRBS(lab.chemistry.rbs)
                                        }
                                        break;

                                    case 'PPRBS':
                                        if (lab.chemistry.pprbs !== null) {
                                            item.pprbs = this.openCHPPRBS(lab.chemistry.pprbs)
                                        }
                                        break;

                                    case 'URAC':
                                        if (lab.chemistry.uricAcid !== null) {
                                            item.urac = this.openCHURAC(lab.chemistry.uricAcid)
                                        }
                                        break;

                                    case 'BUN':
                                        if (lab.chemistry.bun !== null) {
                                            item.bun = this.openCHBUN(lab.chemistry.bun)
                                        }

                                        break;

                                    case 'CREA':
                                        if (lab.chemistry.creatinine !== null) {
                                            item.crea = this.openCHCREA(lab.chemistry.creatinine)
                                        }
                                        break;

                                    case 'HBA1C':
                                        if (lab.chemistry.hemoglobin !== null) {
                                            item.hba1c = this.openCHHBA1C(lab.chemistry.hemoglobin)
                                        }
                                        break;

                                    case 'LIPP':
                                        if (lab.chemistry.lipidProfile !== null) {
                                            item.lipp = this.openCHLIPP(lab.chemistry.lipidProfile)
                                        }
                                        break;

                                    case 'OGTT':
                                        if (lab.chemistry.ogtt !== null) {
                                            item.ogtt = this.openCHOGTT(lab.chemistry.ogtt)
                                        }
                                        break;

                                    case 'OGCT':
                                        if (lab.chemistry.ogct !== null) {
                                            item.ogct = this.openCHOGCT(lab.chemistry.ogct)
                                        }
                                        break;

                                    case 'ELEC':
                                        if (lab.chemistry.electrolytes !== null) {
                                            item.elec = this.openCHELEC(lab.chemistry.electrolytes)
                                        }
                                        break;

                                    case 'ENZY':
                                        if (lab.chemistry.enzymes !== null) {
                                            item.enzy = this.openCHENZY(lab.chemistry.enzymes)
                                        }
                                        break;

                                    case 'CPK':
                                        if (lab.chemistry.cpk !== null) {
                                            item.cpk = this.openCHCPK(lab.chemistry.cpk)
                                        }
                                        break;

                                    case 'BILI':
                                        if (lab.chemistry.bilirubin !== null) {
                                            item.bili = this.openCHBILI(lab.chemistry.bilirubin)
                                        }
                                        break;

                                    case 'PROT':
                                        if (lab.chemistry.protein !== null) {
                                            item.prot = this.openCHPROT(lab.chemistry.protein)
                                        }
                                        break;
                                    default: break;
                                }
                            })
                            break;

                        case 'SE':
                            item = updateObject(seroConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            lab.itemDetails.serviceRequest.forEach(req => {
                                switch (req.laboratoryRequest) {
                                    case 'SER':
                                        if (lab.serology.serology !== null) {
                                            item.ser = this.openSESER(lab.serology.serology)
                                        }
                                        break;

                                    case 'THYR':
                                        if (lab.serology.thyroid !== null) {
                                            item.thyr = this.openSETHYR(lab.serology.thyroid)
                                        }
                                        break;

                                    case 'TYPH':
                                        if (lab.serology.typhidot !== null) {
                                            item.typh = this.openSETYPH(lab.serology.typhidot)
                                        }
                                        break;

                                    case 'CRP':
                                        if (lab.serology.crp !== null) {
                                            item.crp = this.openSECRP(lab.serology.crp)
                                        }
                                        break;

                                    case 'HIV':
                                        if (lab.serology.hiv !== null) {
                                            item.hiv = this.openSEHIV(lab.serology.hiv)
                                        }
                                        break;

                                    case 'AGEN':
                                        const antigen = lab.serology.antigen
                                        if (antigen !== null) {
                                            let psa = ''
                                            let cea = ''
                                            let afp = ''
                                            let ca125 = ''
                                            let ca199 = ''
                                            let ca153 = ''

                                            if (antigen.psa !== null) psa = antigen.psa
                                            if (antigen.cea !== null) cea = antigen.cea
                                            if (antigen.afp !== null) afp = antigen.afp
                                            if (antigen.ca125 !== null) ca125 = antigen.ca125
                                            if (antigen.ca199 !== null) ca199 = antigen.ca199
                                            if (antigen.ca153 !== null) ca153 = antigen.ca153

                                            item.agen = {
                                                prostateSpecificAntigen: psa,
                                                carcenoembryonicAntigen: cea,
                                                alphaFetoprotein: afp,
                                                cancerAntigen125: ca125,
                                                cancerAntigen199: ca199,
                                                cancerAntigen153: ca153,
                                            }
                                        }
                                        break;

                                    case 'COVID':
                                        if (lab.serology.covid !== null) {
                                            item.covid = this.openSECOVID(lab.serology.covid)
                                        }
                                        break;

                                    case 'ANTIGEN':
                                        if (lab.serology.rtantigen !== null) {
                                            item.rtantigen = this.openSERTANTIGEN(lab.serology.rtantigen)
                                        }
                                        break;



                                    default: break;
                                }
                            })
                            break;

                        case 'TO':
                            item = updateObject(toxiConfig, {
                                id: lab.id,
                                requestName: lab.itemDetails.itemDescription.toUpperCase(),
                            });

                            const toxi = lab.toxicology

                            if (toxi !== null) {
                                if (toxi.methamphethamine !== null) {
                                    let methavalue = null

                                    if (npOptionsMap.has(toxi.methamphethamine) === true) {
                                        methavalue = {
                                            value: toxi.methamphethamine,
                                            label: npOptionsMap.get(toxi.methamphethamine)
                                        }
                                    }

                                    item.toxi.metha = methavalue
                                }

                                if (toxi.tetrahydrocanabinol !== null) {
                                    let tetravalue = null

                                    if (npOptionsMap.has(toxi.tetrahydrocanabinol) === true) {
                                        tetravalue = {
                                            value: toxi.tetrahydrocanabinol,
                                            label: npOptionsMap.get(toxi.tetrahydrocanabinol)
                                        }
                                    }

                                    item.toxi.tetra = tetravalue
                                }
                            }
                            break;

                        default: break;
                    }

                    if (item !== null) {
                        labRequest.push(updateObject(lab, {
                            ...item
                        }));
                    }
                }
            });

            if (labRequest.length > 0) {
                const updateIndData = this.getIndInfo(data, labRequest, labServices);

                this.setState({
                    ...this.state,
                    showModal: true,
                    editViewFlag: true,
                    updateIndex: idx,
                    indData: updateIndData,
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

    openCMUCHEM = (uchem) => {
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
        let referenceLabId = '';
        if (uchem.referenceLabId !== "" && uchem.referenceLabId !== undefined) referenceLabId = uchem.referenceLabId.value
        const uchemvalue = {
            color: colorOptValue,
            transparency: transparencyOptValue,
            isColorError: false,
            isTransparencyError: false,

            rbc: uchem.rbc,
            wbc: uchem.wbc,
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
            referenceLabId: referenceLabId
        }
        return uchemvalue
    }

    openCMFECA = (feca) => {
        let faColorOptValue = null
        let faConsistencyOptValue = null
        let famicroscopicFindings = null
        let otherNotes = ''
        let referenceLabId = '';

        if (feca.referenceLabId !== "" && feca.referenceLabId !== undefined) referenceLabId = feca.referenceLabId.value
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

        if (fecaMicroscopicFindingsMap.has(feca.microscopicFindings) === true) {
            famicroscopicFindings = {
                value: feca.microscopicFindings,
                label: fecaMicroscopicFindingsMap.get(feca.microscopicFindings)
            }
        }

        if (feca.otherNotes !== null) otherNotes = feca.otherNotes

        const fecavalue = {
            color: faColorOptValue,
            consistency: faConsistencyOptValue,
            microscopicFindings: famicroscopicFindings,
            otherNotes: otherNotes,
            referenceLabId: referenceLabId
        }
        return fecavalue
    }

    openCMAFB = (afb) => {
        if (afb !== null) {

            let va1 = ''
            let va2 = ''
            let rs1 = ''
            let rs2 = ''
            let diag = ''
            let referenceLabId = '';


            if (afb.referenceLabId !== "" && afb.referenceLabId !== undefined) referenceLabId = afb.referenceLabId.value
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

                referenceLabId: referenceLabId
            }
            return afbvalue
        }
    }

    openHECBC = (cbc) => {
        let whiteBloodCells = ''
        let neutrophils = ''
        let lymphocytes = ''
        let monocytes = ''
        let eosinophils = ''
        let basophils = ''
        let redBloodCells = ''
        let hemoglobin = ''
        let hematocrit = ''
        let platelet = ''
        let referenceLabId = '';

        if (cbc.referenceLabId !== "" && cbc.referenceLabId !== undefined) referenceLabId = cbc.referenceLabId.value
        if (cbc.whiteBloodCells !== null) whiteBloodCells = cbc.whiteBloodCells
        if (cbc.neutrophils !== null) neutrophils = cbc.neutrophils
        if (cbc.lymphocytes !== null) lymphocytes = cbc.lymphocytes
        if (cbc.monocytes !== null) monocytes = cbc.monocytes
        if (cbc.eosinophils !== null) eosinophils = cbc.eosinophils
        if (cbc.basophils !== null) basophils = cbc.basophils
        if (cbc.redBloodCells !== null) redBloodCells = cbc.redBloodCells
        if (cbc.hemoglobin !== null) hemoglobin = cbc.hemoglobin
        if (cbc.hematocrit !== null) hematocrit = cbc.hematocrit
        if (cbc.platelet !== null) platelet = cbc.platelet


        const cbcvalues = {
            whiteBloodCells: whiteBloodCells,
            neutrophils: neutrophils,
            lymphocytes: lymphocytes,
            monocytes: monocytes,
            eosinophils: eosinophils,
            basophils: basophils,
            redBloodCells: redBloodCells,
            hemoglobin: hemoglobin,
            hematocrit: hematocrit,
            platelet: platelet,
            referenceLabId: referenceLabId
        }

        return cbcvalues
    }

    openHEBTYP = (btyp) => {
        let bloodType = null
        let rhesusFactor = null
        let referenceLabId = '';
        if (btyp.referenceLabId !== "" && btyp.referenceLabId !== undefined) referenceLabId = btyp.referenceLabId.value


        if (btOptions.has(btyp.bloodType) === true) {
            bloodType = {
                value: btyp.bloodType,
                label: btOptions.get(btyp.bloodType)
            }
        }

        if (npOptionsMap.has(btyp.rhesusFactor) === true) {
            rhesusFactor = {
                value: btyp.rhesusFactor,
                label: npOptionsMap.get(btyp.rhesusFactor)
            }
        }

        const btypvalues = {
            bloodType: bloodType,
            rhesusFactor: rhesusFactor,
            referenceLabId: referenceLabId
        }

        return btypvalues
    }

    openHEPTM = (ptm) => {
        let patientTime = ''
        let patientTimeNormalValue = ''
        let control = ''
        let controlNormalValue = ''
        let percentActivity = ''
        let percentActivityNormalValue = ''
        let inr = ''
        let inrNormalValue = ''
        let referenceLabId = '';
        if (ptm.referenceLabId !== "" && ptm.referenceLabId !== undefined) referenceLabId = ptm.referenceLabId.value


        if (ptm.patientTime !== null) patientTime = ptm.patientTime
        if (ptm.patientTimeNV !== null) patientTimeNormalValue = ptm.patientTimeNV
        if (ptm.control !== null) control = ptm.control
        if (ptm.controlNV !== null) controlNormalValue = ptm.controlNV
        if (ptm.percentActivity !== null) percentActivity = ptm.percentActivity
        if (ptm.percentActivityNV !== null) percentActivityNormalValue = ptm.percentActivityNV
        if (ptm.inr !== null) inr = ptm.inr
        if (ptm.inrNV !== null) inrNormalValue = ptm.inrNV

        const ptmvalues = {
            patientTime: patientTime,
            patientTimeNormalValue: patientTimeNormalValue,
            control: control,
            controlNormalValue: controlNormalValue,
            percentActivity: percentActivity,
            percentActivityNormalValue: percentActivityNormalValue,
            inr: inr,
            inrNormalValue: inrNormalValue,
            referenceLabId: referenceLabId
        }

        return ptmvalues
    }

    openHEAPTT = (aptt) => {
        let pTime = ''
        let pTnv = ''
        let cont = ''
        let cnv = ''
        let referenceLabId = '';
        if (aptt.referenceLabId !== "" && aptt.referenceLabId !== undefined) referenceLabId = aptt.referenceLabId.value


        if (aptt.patientTime !== null) pTime = aptt.patientTime
        if (aptt.patientTimeNV !== null) pTnv = aptt.patientTimeNV
        if (aptt.control !== null) cont = aptt.control
        if (aptt.controlNV !== null) cnv = aptt.controlNV

        const apttvalues = {
            patientTime: pTime,
            patientTimeNormalValue: pTnv,
            control: cont,
            controlNormalValue: cnv,
            referenceLabId: referenceLabId
        }

        return apttvalues
    }

    openHEESR = (esr) => {
        let rate = ''
        let esrm = null
        let referenceLabId = '';
        if (esr.referenceLabId !== "" && esr.referenceLabId !== undefined) referenceLabId = esr.referenceLabId.value


        if (esr.rate !== null) rate = esr.rate
        if (esrMethod.has(esr.method) === true) {
            esrm = {
                value: esr.method,
                label: esrMethod.get(esr.method)
            }
        }

        const esrvalues = {
            rate: rate,
            esrMethod: esrm,
            referenceLabId: referenceLabId
        }

        return esrvalues
    }

    openCHFBS = (fbs) => {
        let fbsr = ''
        let fbsc = ''
        let referenceLabId = '';
        if (fbs.referenceLabId !== "" && fbs.referenceLabId !== undefined) referenceLabId = fbs.referenceLabId.value


        if (fbs.fbs !== null) fbsr = fbs.fbs
        if (fbs.conventional !== null) fbsc = fbs.conventional

        const fbsvalues = {
            result: fbsr,
            conventional: fbsc,
            referenceLabId: referenceLabId
        }

        return fbsvalues
    }

    openCHRBS = (rbs) => {
        let referenceLabId = '';
        if (rbs.referenceLabId !== "" && rbs.referenceLabId !== undefined) referenceLabId = rbs.referenceLabId.value

        const rbsvalues = {
            result: rbs.rbs,
            conventional: rbs.conventional,
            referenceLabId: referenceLabId
        }

        return rbsvalues
    }

    openCHPPRBS = (pprbs) => {
        let referenceLabId = '';
        if (pprbs.referenceLabId !== "" && pprbs.referenceLabId !== undefined) referenceLabId = pprbs.referenceLabId.value

        const pprbsvalues = {
            result: pprbs.pprbs,
            conventional: pprbs.conventional,
            referenceLabId: referenceLabId
        }

        return pprbsvalues
    }

    openCHURAC = (urac) => {
        let referenceLabId = '';
        if (urac.referenceLabId !== "" && urac.referenceLabId !== undefined) referenceLabId = urac.referenceLabId.value

        const uracvalues = {
            result: urac.uricAcid,
            conventional: urac.conventional,
            referenceLabId: referenceLabId
        }

        return uracvalues
    }

    openCHBUN = (bun) => {
        let referenceLabId = '';
        if (bun.referenceLabId !== "" && bun.referenceLabId !== undefined) referenceLabId = bun.referenceLabId.value

        const bunvalues = {
            result: bun.bun,
            conventional: bun.conventional,
            referenceLabId: referenceLabId
        }

        return bunvalues
    }

    openCHCREA = (crea) => {
        let referenceLabId = '';
        if (crea.referenceLabId !== "" && crea.referenceLabId !== undefined) referenceLabId = crea.referenceLabId.value

        const creavalues = {
            result: crea.creatinine,
            conventional: crea.conventional,
            referenceLabId: referenceLabId
        }

        return creavalues
    }

    openCHHBA1C = (hba1c) => {
        let referenceLabId = '';
        if (hba1c.referenceLabId !== "" && hba1c.referenceLabId !== undefined) referenceLabId = hba1c.referenceLabId.value

        const hba1cvalues = {
            hemoglobinA1C: hba1c.hemoglobinA1C,
            referenceLabId: referenceLabId
        }

        return hba1cvalues
    }

    openCHLIPP = (lipp) => {
        let referenceLabId = '';
        if (lipp.referenceLabId !== "" && lipp.referenceLabId !== undefined) referenceLabId = lipp.referenceLabId.value

        const lippvalues = {
            cholesterolResult: lipp.cholesterol,
            cholesterolConventional: lipp.cholesterolConventional,
            triglyceridesResult: lipp.triglycerides,
            triglyceridesConventional: lipp.triglyceridesConventional,
            hdlResult: lipp.hdl,
            hdlConventional: lipp.hdlConventional,
            ldlResult: lipp.ldl,
            ldlConventional: lipp.ldlConventional,
            hdlRatio: lipp.hdlRatio,
            vldl: lipp.vldl,
            referenceLabId: referenceLabId
        }

        return lippvalues
    }

    openCHOGTT = (ogtt) => {
        let referenceLabId = '';
        if (ogtt.referenceLabId !== "" && ogtt.referenceLabId !== undefined) referenceLabId = ogtt.referenceLabId.value

        const ogttvalues = {
            ogtt1HrResult: ogtt.ogtt1Hr,
            ogtt1HrConventional: ogtt.ogtt1HrConventional,
            ogtt2HrResult: ogtt.ogtt2Hr,
            ogtt2HrConventional: ogtt.ogtt2HrConventional,
            referenceLabId: referenceLabId
        }

        return ogttvalues
    }

    openCHOGCT = (ogct) => {
        let referenceLabId = '';
        if (ogct.referenceLabId !== "" && ogct.referenceLabId !== undefined) referenceLabId = ogct.referenceLabId.value

        const ogctvalues = {
            result: ogct.ogct,
            conventional: ogct.conventional,
            referenceLabId: referenceLabId
        }

        return ogctvalues
    }

    openCHELEC = (elec) => {
        let referenceLabId = '';
        if (elec.referenceLabId !== "" && elec.referenceLabId !== undefined) referenceLabId = elec.referenceLabId.value

        const elecvalues = {
            sodium: elec.sodium,
            potassium: elec.potassium,
            chloride: elec.chloride,
            inorganicPhosphorus: elec.inorganicPhosphorus,
            totalCalcium: elec.totalCalcium,
            ionizedCalcium: elec.ionizedCalcium,
            magnesium: elec.magnesium,
            referenceLabId: referenceLabId
        }

        return elecvalues
    }

    openCHENZY = (enzy) => {
        let referenceLabId = '';
        if (enzy.referenceLabId !== "" && enzy.referenceLabId !== undefined) referenceLabId = enzy.referenceLabId.value

        const enzyvalues = {
            sgptalt: enzy.sgptAlt,
            sgotast: enzy.sgotAst,
            amylase: enzy.amylase,
            lipase: enzy.lipase,
            ggtp: enzy.ggtp,
            ldh: enzy.ldh,
            alp: enzy.alp,
            referenceLabId: referenceLabId
        }

        return enzyvalues
    }

    openCHCPK = (cpk) => {
        let referenceLabId = '';
        if (cpk.referenceLabId !== "" && cpk.referenceLabId !== undefined) referenceLabId = cpk.referenceLabId.value

        const cpkvalues = {
            cpkmb: cpk.cpkMB,
            cpkmm: cpk.cpkMM,
            totalCpk: cpk.totalCpk,
            referenceLabId: referenceLabId

        }

        return cpkvalues
    }

    openCHBILI = (bili) => {
        let referenceLabId = '';
        if (bili.referenceLabId !== "" && bili.referenceLabId !== undefined) referenceLabId = bili.referenceLabId.value

        const bilivalues = {
            totalAdult: bili.totalAdult,
            direct: bili.direct,
            indirect: bili.indirect,
            referenceLabId: referenceLabId
        }

        return bilivalues
    }

    openCHPROT = (prot) => {
        let referenceLabId = '';
        if (prot.referenceLabId !== "" && prot.referenceLabId !== undefined) referenceLabId = prot.referenceLabId.value

        const protvalues = {
            totalProtein: prot.totalProtein,
            albumin: prot.albumin,
            globulin: prot.globulin,
            agRatio: prot.agratio,
            referenceLabId: referenceLabId
        }

        return protvalues
    }

    openSESER = (ser) => {
        let hbsag = null
        let antihav = null
        let vdrlrpr = null
        let antihbs = null
        let hbeag = null
        let antihbe = null
        let antihbc = null
        let tppa = null
        let pregnancyTest = null
        let referenceLabId = '';
        if (ser.referenceLabId !== "" && ser.referenceLabId !== undefined) referenceLabId = ser.referenceLabId.value


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

        if (npOptionsMap.has(ser.tppa) === true) {
            tppa = {
                value: ser.tppa,
                label: npOptionsMap.get(ser.tppa)
            }
        }

        if (npOptionsMap.has(ser.pregnancyTest) === true) {
            pregnancyTest = {
                value: ser.pregnancyTest,
                label: npOptionsMap.get(ser.pregnancyTest)
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
            referenceLabId: referenceLabId
        }

        return serovalues
    }

    openSETHYR = (thyr) => {
        let referenceLabId = '';
        if (thyr.referenceLabId !== "" && thyr.referenceLabId !== undefined) referenceLabId = thyr.referenceLabId.value

        const thyrvalues = {
            tsh: thyr.tsh,
            ft3: thyr.ft3,
            t3: thyr.t3,
            ft4: thyr.ft4,
            t4: thyr.t4,
            referenceLabId: referenceLabId
        }

        return thyrvalues
    }

    openSETYPH = (typh) => {
        let igm = null
        let igg = null
        let referenceLabId = '';
        if (typh.referenceLabId !== "" && typh.referenceLabId !== undefined) referenceLabId = typh.referenceLabId.value


        if (npOptionsMap.has(typh.igm) === true) {
            igm = {
                value: typh.igm,
                label: npOptionsMap.get(typh.igm)
            }
        }

        if (npOptionsMap.has(typh.igg) === true) {
            igg = {
                value: typh.igg,
                label: npOptionsMap.get(typh.igg)
            }
        }

        const typhvalues = {
            igm: igm,
            igg: igg,
            referenceLabId: referenceLabId
        }

        return typhvalues
    }

    openSECRP = (crp) => {
        let referenceLabId = '';
        if (crp.referenceLabId !== "" && crp.referenceLabId !== undefined) referenceLabId = crp.referenceLabId.value

        const crpvalues = {
            dilution: crp.dilution,
            result: crp.result,
            referenceLabId: referenceLabId
        }

        return crpvalues
    }

    openSECOVID = (covid) => {
        let covigm = null
        let covigg = null
        let referenceLabId = '';
        if (covid.referenceLabId !== "" && covid.referenceLabId !== undefined) referenceLabId = covid.referenceLabId.value


        if (rnOptions.has(covid.covigm) === true) {
            covigm = {
                value: covid.covigm,
                label: rnOptions.get(covid.covigm)
            }
        }

        if (rnOptions.has(covid.covigg) === true) {
            covigg = {
                value: covid.covigg,
                label: rnOptions.get(covid.covigg)
            }
        }

        const covidvalues = {
            sarscov2igg: covigm,
            sarscov2igm: covigg,
            referenceLabId: referenceLabId
        }

        return covidvalues
    }

    openSERTANTIGEN = (rtantigen) => {
        let cov_ag = null
        let collectionDate = null
        let purpose = null
        let referenceLabId = '';
        if (rtantigen.referenceLabId !== "" && rtantigen.referenceLabId !== undefined) referenceLabId = rtantigen.referenceLabId.value


        if (rnOptions.has(rtantigen.cov_ag) === true) {
            cov_ag = {
                value: rtantigen.cov_ag,
                label: rnOptions.get(rtantigen.cov_ag)
            }
        }


        const RtAntigenvalues = {
            cov_ag: cov_ag,
            collectionDate: collectionDate === '' ? null : rtantigen.collectionDate,
            purpose: purpose === '' ? null : rtantigen.purpose,
            referenceLabId: referenceLabId
        }

        return RtAntigenvalues
    }

    openSEHIV = (hiv) => {
        let test1 = null
        let test2 = null
        let referenceLabId = '';
        if (hiv.referenceLabId !== "" && hiv.referenceLabId !== undefined) referenceLabId = hiv.referenceLabId.value


        if (npOptionsMap.has(hiv.test1) === true) {
            test1 = {
                value: hiv.test1,
                label: npOptionsMap.get(hiv.test1)
            }
        }

        if (npOptionsMap.has(hiv.test2) === true) {
            test2 = {
                value: hiv.test2,
                label: npOptionsMap.get(hiv.test2)
            }
        }

        const hivvalues = {
            test1: test1,
            test2: test2,
            referenceLabId: referenceLabId
        }

        return hivvalues
    }

    getIndInfo = (data, labReq, labSer) => {
        let txnId = '';
        let txnSR = '';
        let txnType = '';
        let requestName = '';
        let itemDetails = null;
        let branch = null;
        let patient = null;
        let corporate = null;
        let cashier = null;
        let txnRemarks = null;
        let txnDate = '';
        let txnDispatch = null;

        if (data !== null) {
            txnId = data.transaction.transactionid;
            txnSR = data.transaction.id;
            txnType = data.transaction.transactionType;
            branch = data.transaction.branch;
            patient = data.transaction.patient;
            corporate = data.transaction.corporate;
            cashier = data.transaction.cashier;
            txnRemarks = data.transaction.remarks;
            txnDate = data.transaction.transactionDate;
            itemDetails = data.itemDetails;
            requestName = data.itemDetails.packageDescription;
            txnDispatch = data.transaction.dispatch;
        }

        const updateIndData = updateObject(industrialConfig, {
            id: data.id,
            txnId: txnId,
            txnSR: txnSR,
            txnType: txnType,
            branch: branch,
            patient: patient,
            corporate: corporate,
            requestName: requestName,
            itemDetails: itemDetails,
            laboratoryRequest: labReq,
            laboratoryServices: labSer,
            cashier: cashier,
            txnRemarks: txnRemarks,
            txnDate: txnDate,
            txnDispatch: txnDispatch,
        });

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
        updateIndData.doctor = patho

        return updateIndData;
    }


    closeModal = (indResponse) => {
        this.setState({
            ...this.state,
            showModal: false,
            emailModal: false,
            viewModal: false,
            editViewFlag: false
        });

        if (indResponse !== null) {
            if (this.state.updateIndex !== null) {
                this.industrialTableRef.updateIndustrialToTable(indResponse, this.state.updateIndex);
            }
        }
    }

    saveResults = () => {
        Swal.fire({
            title: 'Warning!!!',
            text: "Do you want to save changes made to this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const labReq = this.state.indData.laboratoryRequest
                const pathoId = this.state.indData.doctor.pathologist.value

                const submitRequest = [];

                labReq.forEach(req => {
                    const itemDetails = req.itemDetails

                    if (itemDetails.itemCategory === 'LAB') {
                        const procedure = req.itemDetails.itemLaboratoryProcedure

                        switch (procedure) {
                            case 'CM':
                                const clinicalMicroscopy = {}

                                itemDetails.serviceRequest.forEach(servReq => {
                                    switch (servReq.laboratoryRequest) {
                                        case 'UCHEM':
                                            clinicalMicroscopy.urineChemical = this.cmUCHEM(req.uchem)
                                            break;

                                        case 'FECA':
                                            clinicalMicroscopy.fecalysis = this.cmFECA(req.feca)
                                            break;

                                        case 'PREGT':
                                        case 'OBT':
                                            clinicalMicroscopy.ptobt = this.cmPTOBT(req.preg, req.obt)
                                            break;

                                        case 'AFB':
                                            clinicalMicroscopy.afb = this.cmAFB(req.afb)
                                            break;

                                        default:
                                            break;
                                    }
                                })

                                clinicalMicroscopy.pathologistId = pathoId

                                clinicalMicroscopy.otherNotes = req.otno.otherNotes !== '' ? req.otno.otherNotes : null;

                                const cm_item = {
                                    id: req.id,
                                    clinicalMicroscopy: clinicalMicroscopy,
                                }
                                submitRequest.push(cm_item);
                                break;

                            case 'HE':
                                const hematology = {}

                                itemDetails.serviceRequest.forEach(servReq => {
                                    switch (servReq.laboratoryRequest) {
                                        case 'CBC':
                                            hematology.cbc = this.heCBC(req.cbc)
                                            break;

                                        case 'BTYP':
                                            hematology.bloodTyping = this.heBTYP(req.btyp)
                                            break;

                                        case 'CTM':
                                        case 'BTM':
                                            hematology.ctbt = this.heCTBT(req.ctm, req.btm)
                                            break;

                                        case 'PTM':
                                            hematology.prothrombinTime = this.hePTM(req.ptm)
                                            break;

                                        case 'PR131':
                                        case 'MASM':
                                            hematology.prms = this.hePRMS(req.pr131, req.masm)
                                            break;

                                        case 'APTT':
                                            hematology.aptt = this.heAPTT(req.aptt)
                                            break;

                                        case 'ESR':
                                            hematology.esr = this.heESR(req.esr)
                                            break;

                                        default:
                                            break;
                                    }
                                })

                                hematology.pathologistId = pathoId

                                hematology.otherNotes = req.otno.otherNotes !== '' ? req.otno.otherNotes : null;

                                const he_item = {
                                    id: req.id,
                                    hematology: hematology,
                                }
                                submitRequest.push(he_item);

                                break;

                            case 'CH':
                                const chemistry = {}

                                itemDetails.serviceRequest.forEach(servReq => {
                                    switch (servReq.laboratoryRequest) {
                                        case 'FBS':
                                            chemistry.fastingBloodSugar = this.chFBS(req.fbs)
                                            break;

                                        case 'RBS':
                                            chemistry.randomBloodSugar = this.chRBS(req.rbs)
                                            break;

                                        case 'PPRBS':
                                            chemistry.pprbs = this.chPPRBS(req.pprbs)
                                            break;

                                        case 'URAC':
                                            chemistry.uricAcid = this.chURAC(req.urac)
                                            break;

                                        case 'BUN':
                                            chemistry.bloodUreaNitrogen = this.chBUN(req.bun)
                                            break;

                                        case 'CREA':
                                            chemistry.creatinine = this.chCREA(req.crea)
                                            break;

                                        case 'HBA1C':
                                            chemistry.hemoglobin = this.chHBA1C(req.hba1c)
                                            break;

                                        case 'LIPP':
                                            chemistry.lipidProfile = this.chLIPP(req.lipp)
                                            break;

                                        case 'OGTT':
                                            chemistry.ogtt = this.chOGTT(req.ogtt)
                                            break;

                                        case 'OGCT':
                                            chemistry.ogct = this.chOGCT(req.ogct)
                                            break;

                                        case 'ELEC':
                                            chemistry.electrolytes = this.chELEC(req.elec)
                                            break;

                                        case 'ENZY':
                                            chemistry.enzymes = this.chENZY(req.enzy)
                                            break;

                                        case 'CPK':
                                            chemistry.creatinePhosphokinase = this.chCPK(req.cpk)
                                            break;

                                        case 'BILI':
                                            chemistry.bilirubin = this.chBILI(req.bili)
                                            break;

                                        case 'PROT':
                                            chemistry.protein = this.chPROT(req.prot)
                                            break;

                                        default:
                                            break;
                                    }

                                })

                                chemistry.pathologistId = pathoId

                                chemistry.otherNotes = req.otno.otherNotes !== '' ? req.otno.otherNotes : null;

                                const ch_item = {
                                    id: req.id,
                                    chemistry: chemistry,
                                }
                                submitRequest.push(ch_item);
                                break;

                            case 'SE':
                                const serology = {}

                                itemDetails.serviceRequest.forEach(servReq => {
                                    switch (servReq.laboratoryRequest) {
                                        case 'SER':
                                            serology.serology = this.seSER(req.ser)
                                            break;

                                        case 'THYR':
                                            serology.thyroid = this.seTHYR(req.thyr)
                                            break;

                                        case 'TYPH':
                                            serology.typhidot = this.seTYPH(req.typh)
                                            break;

                                        case 'CRP':
                                            serology.crp = this.seCRP(req.crp)
                                            break;

                                        case 'HIV':
                                            serology.hiv = this.seHIV(req.hiv)
                                            break;

                                        case 'AGEN':
                                            serology.antigen = this.seANT(req.agen)
                                            break;

                                        case 'COVID':
                                            serology.covid = this.seCOVID(req.covid)
                                            break;

                                        case 'ANTIGEN':
                                            serology.rtantigen = this.seRTANTIGEN(req.rtantigen)
                                            break;

                                        default:
                                            break;
                                    }
                                })

                                serology.pathologistId = pathoId

                                serology.otherNotes = req.otno.otherNotes !== '' ? req.otno.otherNotes : null;

                                const se_item = {
                                    id: req.id,
                                    serology: serology,
                                }
                                submitRequest.push(se_item);
                                break;

                            case 'TO':
                                let metha = null
                                let tetra = null

                                if (req.toxi.metha !== null) metha = req.toxi.metha.value
                                if (req.toxi.tetra !== null) tetra = req.toxi.tetra.value

                                const toxicology = {
                                    methamphethamine: metha,
                                    tetrahydrocanabinol: tetra,
                                    pathologistId: pathoId
                                }

                                const to_item = {
                                    id: req.id,
                                    toxicology: toxicology
                                }
                                submitRequest.push(to_item)
                                break;

                            default:
                                break;
                        }
                    }
                })

                const industrialRequest = {
                    transactionItemLaboratories: submitRequest,
                    pathologistId: pathoId
                }

                const transid = this.state.indData.txnId
                const itemid = this.state.indData.id

                this.props.onSaveIndustrial(this.props.userToken, industrialRequest, transid, itemid, this.closeModal)
            }
        })
    }

    qcResults = () => {
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
                const transid = this.state.indData.txnId
                const itemid = this.state.indData.id

                this.props.onSaveIndustrialQualityControl(this.props.userToken, transid, itemid, this.closeModal)
            }
        })
    }

    printResults = () => {
        const transid = this.state.indData.txnId
        const itemid = this.state.indData.id
        this.props.onPrintIndustrial(this.props.userToken, transid, itemid, true)
    }

    cmUCHEM = (uchem) => {
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

        if (uchem.rbc !== null) rbc = uchem.rbc
        if (uchem.wbc !== null) wbc = uchem.wbc
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
        return urinechemical
    }

    cmFECA = (feca) => {
        let fecacolor = null
        let fecaconst = null
        let fecafind = null
        let fecaotno = null

        if (feca.color !== null) fecacolor = feca.color.value
        if (feca.consistency !== null) fecaconst = feca.consistency.value
        if (feca.microscopicFindings !== null) fecafind = feca.microscopicFindings.value
        if (feca.otherNotes !== null) fecaotno = feca.otherNotes

        const fecavalues = {
            color: fecacolor,
            consistency: fecaconst,
            microscopicFindings: fecafind,
            otherNotes: fecaotno
        }

        return fecavalues;
    }

    cmPTOBT = (pt, obt) => {
        let pregtest = null
        let occbtest = null

        if (pt.result !== null) pregtest = pt.result.value
        if (obt.result !== null) occbtest = obt.result.value

        const ptobt = {
            pregnancyTest: pregtest,
            occultBloodTest: occbtest
        }

        return ptobt
    }

    cmAFB = (afb) => {
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

        return acidfastbacilli
    }

    heCBC = (cbc) => {
        let whiteBloodCells = null;
        let neutrophils = null;
        let lymphocytes = null;
        let monocytes = null;
        let eosinophils = null;
        let basophils = null;
        let redBloodCells = null;
        let hemoglobin = null;
        let hematocrit = null;
        let platelet = null;

        if (cbc.whiteBloodCells !== "") whiteBloodCells = cbc.whiteBloodCells
        if (cbc.neutrophils !== "") neutrophils = cbc.neutrophils
        if (cbc.lymphocytes !== "") lymphocytes = cbc.lymphocytes
        if (cbc.monocytes !== "") monocytes = cbc.monocytes
        if (cbc.eosinophils !== "") eosinophils = cbc.eosinophils
        if (cbc.basophils !== "") basophils = cbc.basophils
        if (cbc.redBloodCells !== "") redBloodCells = cbc.redBloodCells
        if (cbc.hemoglobin !== "") hemoglobin = cbc.hemoglobin
        if (cbc.hematocrit !== "") hematocrit = cbc.hematocrit
        if (cbc.platelet !== "") platelet = cbc.platelet

        const cbcvalues = {
            whiteBloodCells: whiteBloodCells,
            neutrophils: neutrophils,
            lymphocytes: lymphocytes,
            monocytes: monocytes,
            eosinophils: eosinophils,
            basophils: basophils,
            redBloodCells: redBloodCells,
            hemoglobin: hemoglobin,
            hematocrit: hematocrit,
            platelet: platelet
        }

        return cbcvalues
    }

    heBTYP = (btyp) => {
        let bloodType = null;
        let rhesusFactor = null;

        if (btyp.bloodType !== null) bloodType = btyp.bloodType.value
        if (btyp.rhesusFactor !== null) rhesusFactor = btyp.rhesusFactor.value

        const btypvalues = {
            bloodType: bloodType,
            rhesusFactor: rhesusFactor
        }

        return btypvalues
    }

    heCTBT = (ctm, btm) => {
        let clottingTimeMin = null
        let clottingTimeSec = null
        let bleedingTimeMin = null
        let bleedingTimeSec = null

        if (ctm.timeMin !== "") clottingTimeMin = ctm.timeMin
        if (ctm.timeSec !== "") clottingTimeSec = ctm.timeSec
        if (btm.timeMin !== "") bleedingTimeMin = btm.timeMin
        if (btm.timeSec !== "") bleedingTimeSec = btm.timeSec

        const ctbtvalues = {
            clottingTimeMin: clottingTimeMin,
            clottingTimeSec: clottingTimeSec,
            bleedingTimeMin: bleedingTimeMin,
            bleedingTimeSec: bleedingTimeSec
        }

        return ctbtvalues
    }

    hePTM = (ptm) => {
        let patientTime = null
        let patientTimeNV = null
        let control = null
        let controlNV = null
        let percentActivity = null
        let percentActivityNV = null
        let inr = null
        let inrNV = null

        if (ptm.patientTime !== "") patientTime = ptm.patientTime
        if (ptm.patientTimeNormalValue !== "") patientTimeNV = ptm.patientTimeNormalValue
        if (ptm.control !== "") control = ptm.control
        if (ptm.controlNormalValue !== "") controlNV = ptm.controlNormalValue
        if (ptm.percentActivity !== "") percentActivity = ptm.percentActivity
        if (ptm.percentActivityNormalValue !== "") percentActivityNV = ptm.percentActivityNormalValue
        if (ptm.inr !== "") inr = ptm.inr
        if (ptm.inrNormalValue !== "") inrNV = ptm.inrNormalValue


        const ptmvalues = {
            patientTime: patientTime,
            patientTimeNV: patientTimeNV,
            control: control,
            controlNV: controlNV,
            percentActivity: percentActivity,
            percentActivityNV: percentActivityNV,
            inr: inr,
            inrNV: inrNV,
        }

        return ptmvalues
    }

    hePRMS = (pr, ms) => {
        let pr131 = null
        let malarialSmear = null

        if (pr.result !== "") pr131 = pr.result
        if (ms.result !== null) malarialSmear = ms.result.value

        const prmsvalues = {
            pr131: pr131,
            malarialSmear: malarialSmear
        }

        return prmsvalues
    }

    heAPTT = (aptt) => {
        let patientTimeAptt = null
        let patientTimeNVAptt = null
        let controlAptt = null
        let controlNVAptt = null

        if (aptt.patientTime !== "") patientTimeAptt = aptt.patientTime
        if (aptt.patientTimeNormalValue !== "") patientTimeNVAptt = aptt.patientTimeNormalValue
        if (aptt.control !== "") controlAptt = aptt.control
        if (aptt.controlNormalValue !== "") controlNVAptt = aptt.controlNormalValue

        const apttvalues = {
            patientTime: patientTimeAptt,
            patientTimeNV: patientTimeNVAptt,
            control: controlAptt,
            controlNV: controlNVAptt,
        }

        return apttvalues
    }

    heESR = (esr) => {
        let rate = null
        let method = null

        if (esr.rate !== "") rate = esr.rate
        if (esr.esrMethod !== null) method = esr.esrMethod.value

        const esrvalues = {
            rate: rate,
            method: method
        }

        return esrvalues
    }

    chFBS = (fbs) => {
        let fbsresult = null
        let fbsconventional = null

        if (fbs.result !== "") fbsresult = fbs.result
        if (fbs.conventional !== "") fbsconventional = fbs.conventional

        const fbsvalues = {
            fbs: fbsresult,
            conventional: fbsconventional
        }

        return fbsvalues
    }

    chRBS = (rbs) => {
        let rbsresult = null
        let rbsconventional = null

        if (rbs.result !== "") rbsresult = rbs.result
        if (rbs.conventional !== "") rbsconventional = rbs.conventional

        const rbsvalues = {
            rbs: rbsresult,
            conventional: rbsconventional
        }

        return rbsvalues
    }

    chPPRBS = (pprbs) => {
        let pprbsresult = null
        let pprbsconventional = null

        if (pprbs.result !== "") pprbsresult = pprbs.result
        if (pprbs.conventional !== "") pprbsconventional = pprbs.conventional

        const pprbsvalues = {
            pprbs: pprbsresult,
            conventional: pprbsconventional
        }

        return pprbsvalues
    }

    chURAC = (urac) => {
        let uracresult = null
        let uracconventional = null

        if (urac.result !== "") uracresult = urac.result
        if (urac.conventional !== "") uracconventional = urac.conventional

        const uracvalues = {
            uricAcid: uracresult,
            conventional: uracconventional
        }

        return uracvalues
    }

    chBUN = (bun) => {
        let bunresult = null
        let bunconventional = null

        if (bun.result !== "") bunresult = bun.result
        if (bun.conventional !== "") bunconventional = bun.conventional

        const bunvalues = {
            bun: bunresult,
            conventional: bunconventional
        }

        return bunvalues
    }

    chCREA = (crea) => {
        let crearesult = null
        let creaconventional = null

        if (crea.result !== "") crearesult = crea.result
        if (crea.conventional !== "") creaconventional = crea.conventional

        const creavalues = {
            creatinine: crearesult,
            conventional: creaconventional
        }

        return creavalues
    }

    chHBA1C = (hba1c) => {
        let hemoglobinA1C = null

        if (hba1c.hemoglobinA1C !== "") hemoglobinA1C = hba1c.hemoglobinA1C

        const hba1cvalues = {
            hemoglobinA1C: hemoglobinA1C
        }

        return hba1cvalues
    }

    chLIPP = (lipp) => {
        let cholesterol = null
        let cholesterolConventional = null
        let triglycerides = null
        let triglyceridesConventional = null
        let hdl = null
        let hdlConventional = null
        let ldl = null
        let ldlConventional = null
        let hdlRatio = null
        let vldl = null

        if (lipp.cholesterolResult !== "") cholesterol = lipp.cholesterolResult
        if (lipp.cholesterolConventional !== "") cholesterolConventional = lipp.cholesterolConventional
        if (lipp.triglyceridesResult !== "") triglycerides = lipp.triglyceridesResult
        if (lipp.triglyceridesConventional !== "") triglyceridesConventional = lipp.triglyceridesConventional
        if (lipp.hdlResult !== "") hdl = lipp.hdlResult
        if (lipp.hdlConventional !== "") hdlConventional = lipp.hdlConventional
        if (lipp.ldlResult !== "") ldl = lipp.ldlResult
        if (lipp.ldlConventional !== "") ldlConventional = lipp.ldlConventional
        if (lipp.hdlRatio !== "") hdlRatio = lipp.hdlRatio
        if (lipp.vldl !== "") vldl = lipp.vldl

        const lippvalues = {
            cholesterol: cholesterol,
            cholesterolConventional: cholesterolConventional,
            triglycerides: triglycerides,
            triglyceridesConventional: triglyceridesConventional,
            hdl: hdl,
            hdlConventional: hdlConventional,
            ldl: ldl,
            ldlConventional: ldlConventional,
            hdlRatio: hdlRatio,
            vldl: vldl
        }

        return lippvalues
    }

    chOGTT = (ogtt) => {
        let ogtt1Hr = null
        let ogtt1HrConventional = null
        let ogtt2Hr = null
        let ogtt2HrConventional = null

        if (ogtt.ogtt1HrResult !== "") ogtt1Hr = ogtt.ogtt1HrResult
        if (ogtt.ogtt1HrConventional !== "") ogtt1HrConventional = ogtt.ogtt1HrConventional
        if (ogtt.ogtt2HrResult !== "") ogtt2Hr = ogtt.ogtt2HrResult
        if (ogtt.ogtt2HrConventional !== "") ogtt2HrConventional = ogtt.ogtt2HrConventional

        const ogttvalues = {
            ogtt1Hr: ogtt1Hr,
            ogtt1HrConventional: ogtt1HrConventional,
            ogtt2Hr: ogtt2Hr,
            ogtt2HrConventional: ogtt2HrConventional
        }

        return ogttvalues
    }

    chOGCT = (ogct) => {
        let ogctresult = null
        let ogctconventional = null

        if (ogct.result !== "") ogctresult = ogct.result
        if (ogct.conventional !== "") ogctconventional = ogct.conventional

        const ogctvalues = {
            ogct: ogctresult,
            conventional: ogctconventional,
        }

        return ogctvalues
    }

    chELEC = (elec) => {
        let sodium = null
        let potassium = null
        let chloride = null
        let inorganicPhosphorus = null
        let totalCalcium = null
        let ionizedCalcium = null
        let magnesium = null

        if (elec.sodium !== "") sodium = elec.sodium
        if (elec.potassium !== "") potassium = elec.potassium
        if (elec.chloride !== "") chloride = elec.chloride
        if (elec.inorganicPhosphorus !== "") inorganicPhosphorus = elec.inorganicPhosphorus
        if (elec.totalCalcium !== "") totalCalcium = elec.totalCalcium
        if (elec.ionizedCalcium !== "") ionizedCalcium = elec.ionizedCalcium
        if (elec.magnesium !== "") magnesium = elec.magnesium

        const elecvalues = {
            sodium: sodium,
            potassium: potassium,
            chloride: chloride,
            inorganicPhosphorus: inorganicPhosphorus,
            totalCalcium: totalCalcium,
            ionizedCalcium: ionizedCalcium,
            magnesium: magnesium,
        }

        return elecvalues
    }

    chENZY = (enzy) => {
        let sgptAlt = null
        let sgotAst = null
        let amylase = null
        let lipase = null
        let ggtp = null
        let ldh = null
        let alp = null

        if (enzy.sgptalt !== "") sgptAlt = enzy.sgptalt
        if (enzy.sgotast !== "") sgotAst = enzy.sgotast
        if (enzy.amylase !== "") amylase = enzy.amylase
        if (enzy.lipase !== "") lipase = enzy.lipase
        if (enzy.ggtp !== "") ggtp = enzy.ggtp
        if (enzy.ldh !== "") ldh = enzy.ldh
        if (enzy.alp !== "") alp = enzy.alp


        const enzyvalues = {
            sgptAlt: sgptAlt,
            sgotAst: sgotAst,
            amylase: amylase,
            lipase: lipase,
            ggtp: ggtp,
            ldh: ldh,
            alp: alp
        }

        return enzyvalues
    }

    chCPK = (cpk) => {
        let cpkMB = null
        let cpkMM = null
        let totalCpk = null

        if (cpk.cpkmb !== "") cpkMB = cpk.cpkmb
        if (cpk.cpkmm !== "") cpkMM = cpk.cpkmm
        if (cpk.totalCpk !== "") totalCpk = cpk.totalCpk

        const cpkvalues = {
            cpkMB: cpkMB,
            cpkMM: cpkMM,
            totalCpk: totalCpk
        }

        return cpkvalues
    }

    chBILI = (bili) => {
        let totalAdult = null
        let direct = null
        let indirect = null

        if (bili.totalAdult !== "") totalAdult = bili.totalAdult
        if (bili.direct !== "") direct = bili.direct
        if (bili.indirect !== "") indirect = bili.indirect

        const bilivalues = {
            totalAdult: totalAdult,
            direct: direct,
            indirect: indirect
        }

        return bilivalues
    }

    chPROT = (prot) => {
        let totalProtein = null
        let albumin = null
        let globulin = null
        let agratio = null
        let referenceLabId = '';

        if (prot.totalProtein !== "") totalProtein = prot.totalProtein
        if (prot.albumin !== "") albumin = prot.albumin
        if (prot.globulin !== "") globulin = prot.globulin
        if (prot.agRatio !== "") agratio = prot.agRatio
        if (prot.referenceLabId !== "" && prot.referenceLabId !== undefined) referenceLabId = prot.referenceLabId.value

        const protvalues = {
            totalProtein: totalProtein,
            albumin: albumin,
            globulin: globulin,
            agratio: agratio,
            referenceLabId: referenceLabId
        }

        return protvalues
    }

    seSER = (sero) => {
        let hbsAg = null
        let antiHav = null
        let vdrlRpr = null
        let antiHbs = null
        let hbeAg = null
        let antiHbe = null
        let antiHbc = null
        let tppa = null
        let pregnancyTest = null
        let referenceLabId = '';

        if (sero.hbsag !== null) hbsAg = sero.hbsag.value
        if (sero.antihav !== null) antiHav = sero.antihav.value
        if (sero.vdrlrpr !== null) vdrlRpr = sero.vdrlrpr.value
        if (sero.antihbs !== null) antiHbs = sero.antihbs.value
        if (sero.hbeag !== null) hbeAg = sero.hbeag.value
        if (sero.antihbe !== null) antiHbe = sero.antihbe.value
        if (sero.antihbc !== null) antiHbc = sero.antihbc.value
        if (sero.tppa !== null) tppa = sero.tppa.value
        if (sero.pregnancyTest !== null) pregnancyTest = sero.pregnancyTest.value
        if (sero.referenceLabId !== "" && sero.referenceLabId !== undefined) referenceLabId = sero.referenceLabId.value

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
            referenceLabId: referenceLabId
        }

        return serovalues
    }

    seTHYR = (thyr) => {
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

        return thyrvalues
    }

    seTYPH = (typh) => {
        let igm = null
        let igg = null

        if (typh.igm !== null) igm = typh.igm.value
        if (typh.igg !== null) igg = typh.igg.value

        const typhvalues = {
            igm: igm,
            igg: igg
        }

        return typhvalues
    }

    seCRP = (crp) => {
        let dilution = null
        let result = null

        if (crp.dilution !== "") dilution = crp.dilution
        if (crp.result !== "") result = crp.result

        const crpvalues = {
            dilution: dilution,
            result: result
        }

        return crpvalues
    }

    seHIV = (hiv) => {
        let test1 = null
        let test2 = null

        if (hiv.test1 !== null) test1 = hiv.test1.value
        if (hiv.test2 !== null) test2 = hiv.test2.value

        const hivvalues = {
            test1: test1,
            test2: test2
        }

        return hivvalues
    }

    seANT = (ant) => {
        let psav = null
        let ceav = null
        let afpv = null
        let ca125v = null
        let ca199v = null
        let ca153v = null

        if (ant.prostateSpecificAntigen !== '') psav = ant.prostateSpecificAntigen
        if (ant.carcenoembryonicAntigen !== '') ceav = ant.carcenoembryonicAntigen
        if (ant.alphaFetoprotein !== '') afpv = ant.alphaFetoprotein
        if (ant.cancerAntigen125 !== '') ca125v = ant.cancerAntigen125
        if (ant.cancerAntigen199 !== '') ca199v = ant.cancerAntigen199
        if (ant.cancerAntigen153 !== '') ca153v = ant.cancerAntigen153

        const antigenvalues = {
            psa: psav,
            cea: ceav,
            afp: afpv,
            ca125: ca125v,
            ca199: ca199v,
            ca153: ca153v,
        }

        return antigenvalues
    }

    seCOVID = (covid) => {
        let covigm = null
        let covigg = null

        if (covid.sarscov2igg !== null) covigm = covid.sarscov2igg.value
        if (covid.sarscov2igm !== null) covigg = covid.sarscov2igm.value

        const covidvalues = {
            covigm: covigm,
            covigg: covigg,
        }

        return covidvalues
    }

    seRTANTIGEN = (rtantigen) => {
        let cov_ag = null

        if (rtantigen.cov_ag !== null) cov_ag = rtantigen.cov_ag.value

        const covidvalues = {
            cov_ag: cov_ag,
            collectionDate: rtantigen.collectionDate === '' ? null : rtantigen.collectionDate,
            purpose: rtantigen.purpose === '' ? null : rtantigen
        }

        return covidvalues
    }

    onPrintIndustrial = (transid, labid, headerControl) => {

        // const roles = [].concat(this.props.auth.roles)
        //     .filter(r => r === 'ADMIN');

        // if (roles.length > 0) {
        Swal.fire({
            title: 'Industrial Result',
            text: "Do you want to print this report?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onPrintIndustrial(this.props.userToken, transid, labid, headerControl)
            }
        })
        // } else {
        //     Swal.fire({
        //         title: 'Not authorized to print',
        //         icon: 'warning',
        //         text: 'Please contact admin.'
        //     })
        // }
    }

    onShowEmailModal = (data) => {
        const updateToxiData = this.getIndInfo(data)

        this.setState({
            ...this.state,
            emailModal: true,
            modalTitle: "Email Industrial",
            CMData: updateToxiData,
            emailData: {
                emailContent: {
                    sendTo: updateToxiData.patient.email,
                    sendCc: '',
                    emailSubject: 'Quest Phil Diagnostics Laboratory Results',
                    emailBody:
                        `Dear Team,\n\nYou may now look to the attached file of your result in PDF format and Excel format.\nFor any question/classification, please contact us at 0917-535-9417 for Globe and\n0925-577-8378 for Sun/Smart or send us an email at\nquestphil.corpresult@gmail.com\n\nThank you for your concern!\n\nYours truly,\n\nQuest Diagnostics Team`,
                }
            }
        });
    }

    onSendEmailIndustrial = (emailValues, transid, labid) => {

        Swal.fire({
            title: 'Industrial Result',
            text: "Do you want to send this via email?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.onSendEmailIndustrial(this.props.userToken, emailValues, transid, labid, this.closeModal);
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

                <IndustrialModal
                    showModal={this.state.showModal}
                    closeClick={this.closeModal}
                    saveClick={this.saveResults}
                    qcClick={this.qcResults}
                    printClick={this.printResults}
                    indData={this.state.indData}
                    doctorList={this.props.doctorList}
                    editViewFlag={this.state.editViewFlag}
                    setIndData={this.setIndustrialData}
                    referenceLab={this.props.referenceLaboratoryList}
                />

                <EmailModal
                    emailModal={this.state.emailModal}
                    propData={this.state.chemData}
                    emailData={this.state.emailData}
                    closeClick={this.closeModal}
                    onSendEmail={this.onSendEmailIndustrial}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Industrial</h3>
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
                                <IndustrialTable
                                    onRef={ref => (this.industrialTableRef = ref)}
                                    openIndustrialModal={this.openIndustrialModal}
                                    viewIndustrialModal={this.viewIndustrialModal}
                                    onPrintIndustrial={this.onPrintIndustrial}
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
        indList: state.lab.industrialList,
        doctorList: state.docs.doctorList,
        doctorInfo: state.docs.doctorData,
        laboratoryList: state.items.itemLaboratories,
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
        onGetItemLaboratories: (token) => dispatch(actions.getItemLaboratories(token)),
        onSaveIndustrial: (token, indValues, transid, labid, closeModal) => dispatch(actions.saveIndustrial(token, indValues, transid, labid, closeModal)),
        onClearINDList: (procedure) => dispatch(actions.clearLaboratoryList(procedure)),
        onViewINDList: (token, listType, startDate, endDate, params) => dispatch(actions.getTransactionItemLaboratoriesRequests(token, listType, startDate, endDate, params)),
        onPrintIndustrial: (token, transid, labid, withHeaderFooter) => dispatch(actions.printIndustrial(token, transid, labid, withHeaderFooter)),
        onSaveIndustrialQualityControl: (token, transid, labid, closeModal) => dispatch(actions.saveIndustrialQualityControl(token, transid, labid, closeModal)),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Industrial));