import {
    CCard,
    CCardHeader,
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import CBCView from 'src/containers/modal/laboratory/he_info/view/CBCView'
import BTYPView from 'src/containers/modal/laboratory/he_info/view/BTYPView'
import CTMView from 'src/containers/modal/laboratory/he_info/view/CTMView'
import BTMView from 'src/containers/modal/laboratory/he_info/view/BTMView'
import PR131View from 'src/containers/modal/laboratory/he_info/view/PR131View'
import MASMView from 'src/containers/modal/laboratory/he_info/view/MASMView'
import ESRView from 'src/containers/modal/laboratory/he_info/view/ESRView'
import PTMView from 'src/containers/modal/laboratory/he_info/view/PTMView'
import APTTView from 'src/containers/modal/laboratory/he_info/view/APTTView'

import {
    getHEcbc,
    getHEbtyp,
    getHEctm,
    getHEbtm,
    getHEptm,
    getHEaptt,
    getHEesr
} from 'src/reusable/getInfo'

const npOptions = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

export const displayHematology = (serv) => {
    const serviceRequest = serv.itemDetails.serviceRequest;
    let displayHE = null

    if (serviceRequest.length > 0) {
        let cbcCard = null
        let btypCard = null
        let ctmCard = null
        let btmCard = null
        let pr131Card = null
        let masmCard = null
        let esrCard = null
        let ptmCard = null
        let apttCard = null

        const heClassData = {}

        serviceRequest.forEach((srv) => {
            switch (srv.laboratoryRequest) {
                case 'CBC':
                    const cbc = serv.hematology.cbc;
                    if (cbc !== null) {
                        heClassData.cbc = getHEcbc(cbc)
                    }

                    cbcCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Complete Blood Count</h6>
                                    </CCardHeader>
                                    <CBCView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'BTYP':
                    const btyp = serv.hematology.bloodTyping
                    if (btyp !== null) {
                        heClassData.btyp = getHEbtyp(btyp)
                    }

                    btypCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Blood Typing</h6>
                                    </CCardHeader>
                                    <BTYPView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'CTM':
                case 'BTM':
                    const ctbt = serv.hematology.ctbt
                    if (ctbt !== null) {
                        heClassData.ctm = getHEctm(ctbt)
                        heClassData.btm = getHEbtm(ctbt)
                    }

                    ctmCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Clotting Time</h6>
                                    </CCardHeader>
                                    <CTMView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )

                    btmCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Bleeding Time</h6>
                                    </CCardHeader>
                                    <BTMView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'PTM':
                    const ptm = serv.hematology.prothombinTime
                    if (ptm !== null) {
                        heClassData.ptm = getHEptm(ptm)
                    }

                    ptmCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Prothrombin Time</h6>
                                    </CCardHeader>
                                    <PTMView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'PR131':
                case 'MASM':
                    const prms = serv.hematology.prms
                    if (prms !== null) {

                        const prvalues = {
                            result: prms.pr131
                        }

                        let msvalues = null
                        if (npOptions.has(prms.malarialSmear) === true) {
                            msvalues = {
                                result: {
                                    value: prms.malarialSmear,
                                    label: npOptions.get(prms.malarialSmear)
                                }
                            }
                        }

                        heClassData.pr131 = prvalues
                        heClassData.masm = msvalues
                    }

                    pr131Card = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">PR 1.31</h6>
                                    </CCardHeader>
                                    <PR131View hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )

                    masmCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Malarial Smear</h6>
                                    </CCardHeader>
                                    <MASMView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'APTT':
                    const aptt = serv.hematology.aptt
                    if (aptt !== null) {
                        heClassData.aptt = getHEaptt(aptt)
                    }

                    apttCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Activated Partial Thromboplastin Time ( APTT )</h6>
                                    </CCardHeader>
                                    <APTTView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'ESR':
                    const esr = serv.hematology.esr
                    if (esr !== null) {
                        heClassData.esr = getHEesr(esr)
                    }

                    esrCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Erythrocyte Sedimentation Rate ( ESR )</h6>
                                    </CCardHeader>
                                    <ESRView hemaData={heClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                default: break;
            }
        })

        displayHE = (
            <CContainer>
                {cbcCard}
                <CRow className="m-0 p-0">
                    <CCol md="6">
                        {btypCard}
                    </CCol>
                    <CCol md="6">
                        {ctmCard}
                    </CCol>
                    <CCol md="6">
                        {btmCard}
                    </CCol>
                    <CCol md="3">
                        {pr131Card}
                    </CCol>
                    <CCol md="3">
                        {masmCard}
                    </CCol>
                    <CCol md="9">
                        {esrCard}
                    </CCol>
                </CRow>
                {ptmCard}
                {apttCard}
            </CContainer>
        )
    }

    return displayHE
}

export default displayHematology