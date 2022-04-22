import {
    CCard,
    CCardHeader,
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import FBSView from 'src/containers/modal/laboratory/ch_info/view/FBSView'
import RBSView from 'src/containers/modal/laboratory/ch_info/view/RBSView'
import PPRBSView from 'src/containers/modal/laboratory/ch_info/view/PPRBSView'
import URACView from 'src/containers/modal/laboratory/ch_info/view/URACView'
import BUNView from 'src/containers/modal/laboratory/ch_info/view/BUNView'
import CREAView from 'src/containers/modal/laboratory/ch_info/view/CREAView'
import LIPPView from 'src/containers/modal/laboratory/ch_info/view/LIPPView'
import OGTTView from 'src/containers/modal/laboratory/ch_info/view/OGTTView'
import OGCTView from 'src/containers/modal/laboratory/ch_info/view/OGCTView'
import ELECView from 'src/containers/modal/laboratory/ch_info/view/ELECView'
import ENZYView from 'src/containers/modal/laboratory/ch_info/view/ENZYView'
import CPKView from 'src/containers/modal/laboratory/ch_info/view/CPKView'
import BILIView from 'src/containers/modal/laboratory/ch_info/view/BILIView'
import PROTView from 'src/containers/modal/laboratory/ch_info/view/PROTView'
import HBA1CView from 'src/containers/modal/laboratory/ch_info/view/HBA1CView'

export const displayChemistry = (serv) => {
    const serviceRequest = serv.itemDetails.serviceRequest;
    let displayCH = null

    if (serviceRequest.length > 0) {
        let fbsCard = null
        let rbsCard = null
        let pprbsCard = null
        let uracCard = null
        let bunCard = null
        let creaCard = null
        let lippCard = null
        let ogttCard = null
        let ogctCard = null
        let elecCard = null
        let enzyCard = null
        let cpkCard = null
        let biliCard = null
        let protCard = null
        let hba1cCard = null

        const chClassData = {}

        serviceRequest.forEach((srv) => {
            switch (srv.laboratoryRequest) {
                case 'FBS':
                    const fbs = serv.chemistry.fbs;
                    if (fbs !== null) {

                        const fbsvalues = {
                            result: fbs.fbs,
                            conventional: fbs.conventional,
                        }

                        chClassData.fbs = fbsvalues
                    }

                    fbsCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Fasting Blood Sugar</h6>
                                    </CCardHeader>
                                    <FBSView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'RBS':
                    const rbs = serv.chemistry.rbs;
                    if (rbs !== null) {

                        const rbsvalues = {
                            result: rbs.rbs,
                            conventional: rbs.conventional,
                        }

                        chClassData.rbs = rbsvalues
                    }

                    rbsCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Random Blood Sugar</h6>
                                    </CCardHeader>
                                    <RBSView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'PPRBS':
                    const pprbs = serv.chemistry.pprbs;
                    if (pprbs !== null) {

                        const pprbsvalues = {
                            result: pprbs.pprbs,
                            conventional: pprbs.conventional,
                        }

                        chClassData.pprbs = pprbsvalues
                    }

                    pprbsCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Post Prandial Random Blood Sugar</h6>
                                    </CCardHeader>
                                    <PPRBSView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'URAC':
                    const urac = serv.chemistry.uricAcid;
                    if (urac !== null) {

                        const uracvalues = {
                            result: urac.uricAcid,
                            conventional: urac.conventional,
                        }

                        chClassData.urac = uracvalues
                    }

                    uracCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Uric Acid</h6>
                                    </CCardHeader>
                                    <URACView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'BUN':
                    const bun = serv.chemistry.bun;
                    if (bun !== null) {

                        const bunvalues = {
                            result: bun.bun,
                            conventional: bun.conventional,
                        }

                        chClassData.bun = bunvalues
                    }

                    bunCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Blood Urea Nitrogen</h6>
                                    </CCardHeader>
                                    <BUNView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'CREA':
                    const crea = serv.chemistry.creatinine;
                    if (crea !== null) {

                        const creavalues = {
                            result: crea.creatinine,
                            conventional: crea.conventional,
                        }

                        chClassData.crea = creavalues
                    }

                    creaCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Creatinine</h6>
                                    </CCardHeader>
                                    <CREAView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'HBA1C':
                    const cche = serv.chemistry.hemoglobin
                    if (cche !== null) {

                        const cchevalues = {
                            hemoglobinA1C: cche.hemoglobinA1C,
                        }

                        chClassData.hba1c = cchevalues
                    }

                    hba1cCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Hemoglobin A1C</h6>
                                    </CCardHeader>
                                    <HBA1CView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'LIPP':
                    const lipp = serv.chemistry.lipidProfile
                    if (lipp !== null) {

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
                        }

                        chClassData.lipp = lippvalues
                    }

                    lippCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Lipid Profile</h6>
                                    </CCardHeader>
                                    <LIPPView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'OGTT':
                    const ogtt = serv.chemistry.ogtt
                    if (ogtt !== null) {

                        const ogttvalues = {
                            ogtt1HrResult: ogtt.ogtt1Hr,
                            ogtt1HrConventional: ogtt.ogtt1HrConventional,
                            ogtt2HrResult: ogtt.ogtt2Hr,
                            ogtt2HrConventional: ogtt.ogtt2HrConventional,
                        }

                        chClassData.ogtt = ogttvalues
                    }

                    ogttCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Oral Glucose Tolerance Test (OGTT)</h6>
                                    </CCardHeader>
                                    <OGTTView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'OGCT':
                    const ogct = serv.chemistry.ogct
                    if (ogct !== null) {

                        const ogctvalues = {
                            result: ogct.ogct,
                            conventional: ogct.conventional,
                        }

                        chClassData.ogct = ogctvalues
                    }

                    ogctCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Oral Glucose Challenge Test (OGCT)</h6>
                                    </CCardHeader>
                                    <OGCTView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'ELEC':
                    const elec = serv.chemistry.electrolytes
                    if (elec !== null) {

                        const elecvalues = {
                            sodium: elec.sodium,
                            potassium: elec.potassium,
                            chloride: elec.chloride,
                            inorganicPhosphorus: elec.inorganicPhosphorus,
                            totalCalcium: elec.totalCalcium,
                            ionizedCalcium: elec.ionizedCalcium,
                            magnesium: elec.magnesium
                        }

                        chClassData.elec = elecvalues
                    }

                    elecCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Serum Electrolytes</h6>
                                    </CCardHeader>
                                    <ELECView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'ENZY':
                    const enzy = serv.chemistry.enzymes
                    if (enzy !== null) {

                        const enzyvalues = {
                            sgptalt: enzy.sgptAlt,
                            sgotast: enzy.sgotAst,
                            amylase: enzy.amylase,
                            lipase: enzy.lipase,
                            ggtp: enzy.ggtp,
                            ldh: enzy.ldh,
                            alp: enzy.alp,
                        }

                        chClassData.enzy = enzyvalues
                    }

                    enzyCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Serum Enzymes</h6>
                                    </CCardHeader>
                                    <ENZYView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'CPK':
                    const cpk = serv.chemistry.cpk
                    if (cpk !== null) {

                        const cpkvalues = {
                            cpkmb: cpk.cpkMB,
                            cpkmm: cpk.cpkMM,
                            totalCpk: cpk.totalCpk,
                        }

                        chClassData.cpk = cpkvalues
                    }

                    cpkCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Creatine Phosphokinase (CPK)</h6>
                                    </CCardHeader>
                                    <CPKView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'BILI':
                    const bili = serv.chemistry.bilirubin
                    if (bili !== null) {
                        const bilivalues = {
                            totalAdult: bili.totalAdult,
                            direct: bili.direct,
                            indirect: bili.indirect,
                        }

                        chClassData.bili = bilivalues
                    }

                    biliCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Bilirubin</h6>
                                    </CCardHeader>
                                    <BILIView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'PROT':
                    const prot = serv.chemistry.protein
                    if (prot !== null) {
                        const protvalues = {
                            totalProtein: prot.totalProtein,
                            albumin: prot.albumin,
                            globulin: prot.globulin,
                            agRatio: prot.agratio,
                        }

                        chClassData.prot = protvalues
                    }

                    protCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Serum Protein</h6>
                                    </CCardHeader>
                                    <PROTView chemData={chClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                default: break;
            }
        })

        displayCH = (
            <CContainer>
                {fbsCard}
                {rbsCard}
                {pprbsCard}
                {uracCard}
                {bunCard}
                {creaCard}
                {lippCard}
                <CCol md="6" className="p-1">
                    {ogttCard}
                    {ogctCard}
                </CCol>
                {elecCard}
                {enzyCard}
                {protCard}
                {cpkCard}
                {biliCard}
                {hba1cCard}
            </CContainer>
        )
    }
    return displayCH
}

export default displayChemistry