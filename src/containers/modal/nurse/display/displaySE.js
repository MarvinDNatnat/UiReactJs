import {
    CCard,
    CCardHeader,
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import SERView from 'src/containers/modal/laboratory/se_info/view/SERView'
import THYRView from 'src/containers/modal/laboratory/se_info/view/THYRView'
import TYPHView from 'src/containers/modal/laboratory/se_info/view/TYPHView'
import CRPView from 'src/containers/modal/laboratory/se_info/view/CRPView'
import HIVView from 'src/containers/modal/laboratory/se_info/view/HIVView'
import COVIDView from 'src/containers/modal/laboratory/se_info/view/COVIDView'
import AGENView from 'src/containers/modal/laboratory/se_info/view/AGENView';

const npOptions = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

const rnOptions = new Map([
    [true, 'REACTIVE'],
    [false, 'NONREACTIVE'],
])

export const displaySerology = (serv) => {
    const serviceRequest = serv.itemDetails.serviceRequest;
    let displaySE = null

    if (serviceRequest.length > 0) {
        let serCard = null
        let thyrCard = null
        let agenCard = null
        let typhCard = null
        let crpCard = null
        let hivCard = null
        let covidCard = null

        const seClassData = {}

        serviceRequest.forEach((srv) => {
            switch (srv.laboratoryRequest) {
                case 'SER':
                    const ser = serv.serology.serology

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

                        seClassData.ser = serovalues
                    }

                    serCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Serology</h6>
                                    </CCardHeader>
                                    <SERView seroData={seClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'THYR':
                    const thyr = serv.serology.thyroid

                    if (thyr !== null) {

                        const thyrvalues = {
                            tsh: thyr.tsh,
                            ft3: thyr.ft3,
                            t3: thyr.t3,
                            ft4: thyr.ft4,
                            t4: thyr.t4,
                        }

                        seClassData.thyr = thyrvalues
                    }

                    thyrCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Thyroid</h6>
                                    </CCardHeader>
                                    <THYRView seroData={seClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'AGEN':
                    const antigen = serv.serology.antigen
                    if (antigen !== null) {
                        seClassData.agen = {
                            prostateSpecificAntigen: antigen.psa !== null ? antigen.psa : '',
                            carcenoembryonicAntigen: antigen.cea !== null ? antigen.cea : '',
                            alphaFetoprotein: antigen.afp !== null ? antigen.afp : '',
                            cancerAntigen125: antigen.ca125 !== null ? antigen.ca125 : '',
                            cancerAntigen199: antigen.ca199 !== null ? antigen.ca199 : '',
                            cancerAntigen153: antigen.ca153 !== null ? antigen.ca153 : '',
                        }
                    }

                    agenCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Tumor Markers</h6>
                                    </CCardHeader>
                                    <AGENView seroData={seClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )

                    break;

                case 'TYPH':
                    const typh = serv.serology.typhidot
                    if (typh !== null) {

                        let igm = null
                        let igg = null

                        if (npOptions.has(typh.igm) === true) {
                            igm = {
                                value: typh.igm,
                                label: npOptions.get(typh.igm)
                            }
                        }

                        if (npOptions.has(typh.igg) === true) {
                            igg = {
                                value: typh.igg,
                                label: npOptions.get(typh.igg)
                            }
                        }

                        const typhvalues = {
                            igm: igm,
                            igg: igg,
                        }

                        seClassData.typh = typhvalues
                    }

                    typhCard = (
                        <CCol md="6">
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className="p-1">
                                            <h6 className="m-1">Thypidot</h6>
                                        </CCardHeader>
                                        <TYPHView seroData={seClassData} />
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCol>
                    )
                    break;

                case 'CRP':
                    const crp = serv.serology.crp
                    if (crp !== null) {

                        const crpvalues = {
                            dilution: crp.dilution,
                            result: crp.result,
                        }

                        seClassData.crp = crpvalues
                    }

                    crpCard = (
                        <CCol md="6">
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className="p-1">
                                            <h6 className="m-1">C-Reactive Protein</h6>
                                        </CCardHeader>
                                        <CRPView seroData={seClassData} />
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCol>
                    )
                    break;

                case 'HIV':
                    const hiv = serv.serology.hiv
                    if (hiv !== null) {

                        let test1 = null
                        let test2 = null

                        if (npOptions.has(hiv.test1) === true) {
                            test1 = {
                                value: hiv.test1,
                                label: npOptions.get(hiv.test1)
                            }
                        }

                        if (npOptions.has(hiv.test2) === true) {
                            test2 = {
                                value: hiv.test2,
                                label: npOptions.get(hiv.test2)
                            }
                        }

                        const hivvalues = {
                            test1: test1,
                            test2: test2,
                        }

                        seClassData.hiv = hivvalues
                    }

                    hivCard = (
                        <CCol md="6">
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className="p-1">
                                            <h6 className="m-1">Human Immunodeficiency Viruses ( HIV )</h6>
                                        </CCardHeader>
                                        <HIVView seroData={seClassData} />
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCol>
                    )
                    break;

                case 'COVID':
                    const covid = serv.serology.covid
                    if (covid !== null) {

                        let covigm = null
                        let covigg = null

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
                            sarscov2igm: covigg
                        }

                        seClassData.covid = covidvalues
                    }

                    covidCard = (
                        <CCol md="6">
                            <CRow>
                                <CCol md="12" className="p-1">
                                    <CCard className="mb-1">
                                        <CCardHeader className="p-1">
                                            <h6 className="m-1">COVID</h6>
                                        </CCardHeader>
                                        <COVIDView seroData={seClassData} />
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCol>
                    )
                    break;

                default: break;
            }
        })

        displaySE = (
            <CContainer>
                {serCard}
                {thyrCard}
                {agenCard}
                <CRow className="m-0 p-0">
                    {typhCard}
                    {hivCard}
                    {crpCard}
                    {covidCard}
                </CRow>

            </CContainer>
        )
    }

    return displaySE
}

export default displaySerology