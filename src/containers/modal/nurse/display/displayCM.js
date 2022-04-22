import {
    CCard,
    CCardHeader,
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import MACROView from 'src/containers/modal/laboratory/cm_info/view/MACROView'
import MICROView from 'src/containers/modal/laboratory/cm_info/view/MICROView'
import UCHEMView from 'src/containers/modal/laboratory/cm_info/view/UCHEMView';
import PREGTView from 'src/containers/modal/laboratory/cm_info/view/PREGTView';
import OBTView from 'src/containers/modal/laboratory/cm_info/view/OBTView';
import AFBView from 'src/containers/modal/laboratory/cm_info/view/AFBView';
import FECAView from 'src/containers/modal/laboratory/cm_info/view/FECAView';

import { getCMuchem, getCMfeca, getCMafb, checkNPOptions } from 'src/reusable/getInfo'

export const displayClinicalMicroscopy = (serv) => {
    const serviceRequest = serv.itemDetails.serviceRequest;
    let displayCM = null
    if (serviceRequest.length > 0) {
        let macroCard = null;
        let microCard = null;
        let uchemCard = null;
        let fecaCard = null;
        let pregCard = null;
        let obtCard = null;
        let afbCard = null;

        const cmClassData = {}

        serviceRequest.forEach((srv) => {
            switch (srv.laboratoryRequest) {
                case 'UCHEM':
                    const uchem = serv.clinicalMicroscopy.urineChemical
                    if (uchem !== null) {
                        cmClassData.uchem = getCMuchem(uchem)
                    }

                    macroCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Physical/Macroscopic</h6>
                                    </CCardHeader>
                                    <MACROView cmData={cmClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    );

                    microCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Microscopic</h6>
                                    </CCardHeader>
                                    <MICROView cmData={cmClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )

                    uchemCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Urine Chemical</h6>
                                    </CCardHeader>
                                    <UCHEMView cmData={cmClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'FECA':
                    const feca = serv.clinicalMicroscopy.fecalysis
                    if (feca !== null) {
                        cmClassData.feca = getCMfeca(feca)
                    }

                    fecaCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Fecalysis</h6>
                                    </CCardHeader>
                                    <FECAView cmData={cmClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'PREGT':
                    const preg = serv.clinicalMicroscopy.ptobt
                    if (preg !== null) {
                        const ptvalue = {
                            result: checkNPOptions(serv.clinicalMicroscopy.ptobt.pregnancyTest)
                        }
                        cmClassData.preg = ptvalue
                    }

                    pregCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Pregnancy Test</h6>
                                    </CCardHeader>
                                    <PREGTView cmData={cmClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'OBT':

                    const obt = serv.clinicalMicroscopy.ptobt
                    if (obt !== null) {

                        const obtvalue = {
                            result: checkNPOptions(serv.clinicalMicroscopy.ptobt.occultBloodTest)
                        }
                        cmClassData.obt = obtvalue
                    }

                    obtCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Occult Blood Test</h6>
                                    </CCardHeader>
                                    <OBTView cmData={cmClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;

                case 'AFB':
                    const afb = serv.clinicalMicroscopy.afb
                    if (afb !== null) {
                        cmClassData.afb = getCMafb(afb)
                    }

                    afbCard = (
                        <CRow>
                            <CCol md="12" className="p-1">
                                <CCard className="mb-1">
                                    <CCardHeader className="p-1">
                                        <h6 className="m-1">Acid - Fast Bacilli (AFB)</h6>
                                    </CCardHeader>
                                    <AFBView cmData={cmClassData} />
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                    break;


                default: break;
            }
        })

        displayCM = (
            <CContainer>
                {macroCard}
                {microCard}
                {uchemCard}
                {fecaCard}
                <CRow className="m-0 p-0">
                    <CCol md="3">
                        {pregCard}
                    </CCol>
                    <CCol md="3">
                        {obtCard}
                    </CCol>
                </CRow>
                {afbCard}
            </CContainer>
        )
    }

    return displayCM
}

export default displayClinicalMicroscopy