import moment from 'moment';

export const appendScript = (scriptToAppend) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    document.body.appendChild(script);
}

export const removeScript = (scriptToremove) => {
    let allsuspects = document.getElementsByTagName("script");
    for (let i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute("src") !== null
            && allsuspects[i].getAttribute("src").indexOf(`${scriptToremove}`) !== -1) {
            allsuspects[i].parentNode.removeChild(allsuspects[i])
        }
    }
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules && value !== null) {
        if (rules.required) {
            isValid = value && value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value && value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value && value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isDecimal) {
            const pattern = /^\d{1,}(\.\d{0,4})?$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isEmpty) {
            isValid = value && value.length > 0 && isValid;
        }
    }

    return isValid;
};

export const getPatientDisplay = (ptnt) => {
    let middle = "";
    if (ptnt.middlename !== null) {
        middle = " " + ptnt.middlename;
    }

    const patientName = ptnt.lastname + ", " + ptnt.firstname + middle + "(" + ptnt.gender + "/" + moment().diff(ptnt.birthDate, 'years', false) + ")";
    return patientName;
}

export const getPatientDisplayWithoutAge = (ptnt) => {
    let middle = "";
    if (ptnt.middlename !== null) {
        middle = " " + ptnt.middlename;
    }
    // + "(" + ptnt.gender + "/" + moment().diff(ptnt.birthDate, 'years', false) + ")"
    const patientName = ptnt.lastname + ", " + ptnt.firstname + middle;
    return patientName;
}

export const getPatientName = (ptnt) => {
    let middle = "";
    if (ptnt.middlename !== null) {
        middle = " " + ptnt.middlename;
    }

    const patientName = ptnt.lastname + ", " + ptnt.firstname + middle;

    return patientName;
}

export const roundAmount = (amount) => {
    return Math.round(amount * 100) / 100;
}

export const closeCurrentWindow = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
};

export const twoFixedAmt = (num) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const padLeadingZeros = (num) => {
    var p = ("000000" + num).slice(-1 * ("000000".length));
    return p;
}

export const getTransStatus = (status) => {
    let newStatus = "";
    switch (status) {
        case "SPD":
            newStatus = "PROCESSED";
            break;
        case "SHO":
            newStatus = "ON-HOLD";
            break;
        case "SRE":
            newStatus = "REFUNDED";
            break;
        case "SCA":
            newStatus = "CANCELLED";
            break;
        default:
            newStatus = "";
            break;
    }
    return newStatus;
}

export const getTransType = (type) => {
    let newType = "";
    switch (type) {
        case "TWI":
            newType = "WALK-IN";
            break;
        case "TACC":
            newType = "ACCOUNT";
            break;
        case "TAPE":
            newType = "APE";
            break;
        case "THS":
            newType = "HOME SERVICE";
            break;
        case "TSI":
            newType = "SEND-IN";
            break;
        case "TREF":
            newType = "REFERRAL";
            break;
        case "TCH":
            newType = "CHARGE";
            break;
        case "TCL":
            newType = "CLINICAL TRIAL";
            break;
        case "TWL":
            newType = "WLMC";
            break;
        case "TDNA":
            newType = "DNA ASIA";
            break;
        case "TAC":
            newType = "AESTHETICS & COSMETICS";
            break;
        case "TAS":
            newType = "AMBULATORY SURGERY";
            break;
        case "TBH":
            newType = "BIRTHING HOME";
            break;
        case "TPS":
            newType = "PHARMACY & SUPPLY";
            break;
        case "TMS":
            newType = "MEDICAL SERVICE";
            break;

        default:
            newType = "";
            break;
    }
    return newType;
}

export const getPayType = (type) => {
    let newType = "";
    switch (type) {
        case "CA":
            newType = "CASH";
            break;
        case "CC":
            newType = "CREDIT CARD";
            break;
        case "HMO":
            newType = "HMO";
            break;
        case "ACCT":
            newType = "ACCOUNT";
            break;
        case "APE":
            newType = "APE";
            break;
        case "GCA":
            newType = "G-CASH";
            break;
        default:
            newType = "";
            break;
    }
    return newType;
}

export const getCardType = (type) => {
    let newType = "";
    switch (type) {
        case "MC":
            newType = "MASTER CARD";
            break;
        case "VC":
            newType = "VISA CARD";
            break;
        case "AMEX":
            newType = "AMERICAN EXPRESS";
            break;
        case "DC":
            newType = "DISCOVER";
            break;
        case "JCB":
            newType = "JAPAN CREDIT BUREAU(JCB)";
            break;
        case "MA":
            newType = "MAESTRO";
            break;
        default:
            newType = "";
            break;
    }
    return newType;
}

export const getChargeType = (type) => {
    let newType = "";
    switch (type) {
        case "CORP":
            newType = "CORPORATE";
            break;
        case "CASH":
            newType = "CORPORATE CASH";
            break;
        case "HMO":
            newType = "HMO";
            break;
        case "REB":
            newType = "REBATE";
            break;
        case "STF":
            newType = "STAFF";
            break;
        case "APE":
            newType = "APE";
            break;
        case "MMO":
            newType = "MEDICAL MISSION";
            break;
        default:
            newType = "";
            break;
    }
    return newType;
}

export const patientDisplay = (patient) => {
    let display = '';

    if (patient !== null) {
        let middleName = '';
        if (patient.middlename !== null) {
            middleName = ' ' + patient.middlename;
        }
        display = patient.lastname + ", " + patient.firstname + middleName;
    }

    return display;
}

export const patientTableDisplay = (patient, txnType = null, txnRemarks = null) => {
    let display = '';

    if (patient !== null) {
        let middleName = '';
        if (patient.middlename !== null) {
            middleName = ' ' + patient.middlename;
        }
        display = patient.lastname + ", " + patient.firstname + middleName;
        display += "<br>" + computeAge(patient.birthDate);
        display += "/" + genderDisplay(patient.gender);
        display += "<br>" + patient.nationality.nationality;
        // display += "<br>" + patient.nationality.nationality;

        if (txnType !== null) {
            display += "<br>" + getTransType(txnType);
        }

        if (txnRemarks !== null && txnRemarks !== '') {
            display += `<br><strong style="color:red">` + txnRemarks + `</strong>`;
        }
    }

    return display;
}

export const doctorName = (doctor, withLicNo = true) => {
    let displayDoc = ''
    if (doctor !== null) {
        displayDoc = doctor.firstname + " " + (!doctor.middlename ? "" : doctor.middlename.charAt(0) + ". ") + doctor.lastname + ", " + doctor.suffix

        if (withLicNo) displayDoc = displayDoc + " - " + doctor.licenseNumber
    }
    return displayDoc
}

export const labPersonName = (labperson, withLicNo = true) => {
    let displayLab = ''

    if (labperson !== undefined && labperson !== null) {
        if (labperson.profile !== null) {
            const profile = labperson.profile;
            displayLab = profile.firstname + " " + (!profile.middlename ? "" : profile.middlename.charAt(0) + ". ") + profile.lastname

            if (profile.suffix) displayLab = displayLab + ", " + profile.suffix

            if (withLicNo) displayLab = displayLab + " - " + profile.licenseNumber
        } else {
            displayLab = labperson.username + " - please update your profile."
        }
    }

    return displayLab
}

export const computeAge = (birthDate) => {
    return moment().diff(moment(birthDate), 'years', false);
}

export const displayDate = (date, format) => {
    return moment(date).format(format);
}

export const genderDisplay = (gender) => {
    let display = '';

    if (gender !== null) {
        if (gender === 'M') {
            display = 'MALE';
        } else if (gender === 'F') {
            display = 'FEMALE';
        }
    }

    return display;
}

export const computeChem = (value, divider) => {
    return (value / divider).toFixed(2)
}

export const getLaboratoryStatus = (lab) => {
    let status = `<strong class="text-danger">NO SPECIMEN</strong>`;
    let print = ``;
    if (lab.print === true) {
        print = `<i class="fas fa-print"></i>`;
    }
    if (lab !== null && lab.status !== undefined && lab.status !== null) {
        switch (lab.status) {
            case 0:
                if (lab.itemLaboratory === "PE" || lab.itemLaboratory === "XR") {
                    status = `<strong class="text-danger">NOT CONDUCTED</strong>`;
                }
                break;

            case 1:
                status = `<strong>SUBMITTED SPECIMEN</strong>`;
                if (lab.itemLaboratory === "PE" || lab.itemLaboratory === "XR") {
                    status = `<strong>CONDUCTED</strong>`;
                }
                break;

            case 2:
                status = `<strong class="text-success">DONE-WITH RESULT <br>` + print + `</strong>`;
                break;

            case 3:
                status = `<strong class="text-success">DONE-WITH RESULT & QC <br>` + print + `</strong>`;
                break;

            default:
                break;
        }
    }

    return status;
}

export const getDispatchType = (typ) => {
    let value = typ;

    switch (typ) {
        case 'PU':
            value = "PICK-UP";
            break;

        case 'E':
            value = "EMAIL";
            break;

        case 'OL':
            value = "ON-LINE";
            break;

        default:
            break;
    }

    return value;
}

export const capitalizeFirstCharacter = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getAgingDate = (referenceDate) => {
    const today = moment();
    const startDate = moment(referenceDate);

    const diff = today.diff(startDate);
    const diffDuration = moment.duration(diff);
    let aging = "";

    if (diffDuration.months() > 0) {
        const month = diffDuration.months();
        if (month === 1) {
            aging = month + " month ";
        } else {
            aging = month + " months ";
        }
    }

    if (diffDuration.days() > 0) {
        const day = diffDuration.days();
        if (day === 1) {
            aging += day + " day";
        } else {
            aging += day + " days";
        }
    }

    return aging;
}