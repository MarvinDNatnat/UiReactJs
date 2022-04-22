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

const checkMicroOptions = (opt) => {
    let microOptValue = null;
    if (microOptionsMap.has(opt) === true) {
        microOptValue = {
            value: opt,
            label: microOptionsMap.get(opt)
        }
    }
    return microOptValue
}

const checkUchemOptions = (opt) => {
    let uchemOptValue = null;
    if (uchemOptionsMap.has(opt) === true) {
        uchemOptValue = {
            value: opt,
            label: uchemOptionsMap.get(opt)
        }
    }
    return uchemOptValue
}

export const checkNPOptions = (opt) => {
    let npOptValue = null;
    if (npOptionsMap.has(opt) === true) {
        npOptValue = {
            value: opt,
            label: npOptionsMap.get(opt)
        }
    }
    return npOptValue
}

// START CLINICAL MICROSCOPY
export const getCMuchem = (uchem) => {
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

        rbc: uchem.rbc,
        wbc: uchem.wbc,
        ecells: checkMicroOptions(uchem.eCells),
        mtreads: checkMicroOptions(uchem.mThreads),
        bacteria: checkMicroOptions(uchem.bacteria),
        amorphous: checkMicroOptions(uchem.amorphous),
        caox: checkMicroOptions(uchem.caOX),
        isRCBError: false,
        isWBCError: false,

        ph: phOptValue,
        spGravity: spOptValue,
        protien: checkUchemOptions(uchem.protien),
        glucose: checkUchemOptions(uchem.glucose),
        leukocyteEsterase: checkUchemOptions(uchem.leukocyteEsterase),
        nitrite: checkNPOptions(uchem.nitrite),
        urobilinogen: checkUchemOptions(uchem.urobilinogen),
        blood: checkUchemOptions(uchem.blood),
        ketone: checkUchemOptions(uchem.ketone),
        bilirubin: checkUchemOptions(uchem.bilirubin),
        otherNotes: uchem.otherNotes !== null ? uchem.otherNotes : '',
    }
    return uchemvalue
}

export const getCMfeca = (feca) => {
    let faColorOptValue = null
    let faConsistencyOptValue = null
    let microscopicFindings = null
    let otherNotes = null

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
    return fecavalue
}

export const getCMafb = (afb) => {
    let va1 = null
    let va2 = null
    let rs1 = null
    let rs2 = null
    let diag = null

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
    return afbvalue
}
// END CLINICAL MICROSCOPY

// START HEMATOLOGY
export const getHEcbc = (cbc) => {
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
    }

    return cbcvalues
}

export const getHEbtyp = (btyp) => {
    let bloodType = null
    let rhesusFactor = null

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
        rhesusFactor: rhesusFactor
    }

    return btypvalues
}

export const getHEctm = (ctbt) => {
    let ctm = ''
    let cts = ''

    if (ctbt.clottingTimeMin !== null) ctm = ctbt.clottingTimeMin
    if (ctbt.clottingTimeSec !== null) cts = ctbt.clottingTimeSec

    const ctmvalues = {
        timeMin: ctm,
        timeSec: cts,
    }

    return ctmvalues
}

export const getHEbtm = (ctbt) => {
    let btm = ''
    let bts = ''

    if (ctbt.bleedingTimeMin !== null) btm = ctbt.bleedingTimeMin
    if (ctbt.bleedingTimeSec !== null) bts = ctbt.bleedingTimeSec


    const btmvalues = {
        timeMin: btm,
        timeSec: bts
    }

    return btmvalues
}

export const getHEptm = (ptm) => {
    let patientTime = ''
    let patientTimeNormalValue = ''
    let control = ''
    let controlNormalValue = ''
    let percentActivity = ''
    let percentActivityNormalValue = ''
    let inr = ''
    let inrNormalValue = ''

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
    }

    return ptmvalues
}

export const getHEaptt = (aptt) => {
    let pTime = ''
    let pTnv = ''
    let cont = ''
    let cnv = ''

    if (aptt.patientTime !== null) pTime = aptt.patientTime
    if (aptt.patientTimeNV !== null) pTnv = aptt.patientTimeNV
    if (aptt.control !== null) cont = aptt.control
    if (aptt.controlNV !== null) cnv = aptt.controlNV

    const apttvalues = {
        patientTime: pTime,
        patientTimeNormalValue: pTnv,
        control: cont,
        controlNormalValue: cnv,
    }

    return apttvalues
}

export const getHEesr = (esr) => {
    let esrm = null
    if (esrMethod.has(esr.method) === true) {
        esrm = {
            value: esr.method,
            label: esrMethod.get(esr.method)
        }
    }

    const esrvalues = {
        rate: esr.rate,
        esrMethod: esrm
    }

    return esrvalues
}
// END HEMATOLOGY

