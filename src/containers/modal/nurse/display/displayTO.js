import {
    CCard,
    CCardHeader,
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import DrugTestView from 'src/containers/modal/laboratory/to_info/view/DrugTestView'

const npOptionsMap = new Map([
    [true, 'POSITIVE'],
    [false, 'NEGATIVE'],
])

export const displayToxicology = (serv) => {
    let displayTO = null
    let toxiCard = null
    let metha = null
    let tetra = null

    const toxi = serv.toxicology

    if (toxi !== null) {
        if (toxi.methamphethamine !== null) {
            let methavalue = null

            if (npOptionsMap.has(toxi.methamphethamine) === true) {
                methavalue = {
                    value: toxi.methamphethamine,
                    label: npOptionsMap.get(toxi.methamphethamine)
                }
            }

            metha = methavalue
        }

        if (toxi.tetrahydrocanabinol !== null) {
            let tetravalue = null

            if (npOptionsMap.has(toxi.tetrahydrocanabinol) === true) {
                tetravalue = {
                    value: toxi.tetrahydrocanabinol,
                    label: npOptionsMap.get(toxi.tetrahydrocanabinol)
                }
            }

            tetra = tetravalue
        }

        const toClassData = {
            toxi: {
                metha: metha,
                tetra: tetra
            }
        }

        toxiCard = (
            <CRow>
                <CCol md="12" className="p-1">
                    <CCard className="mb-1">
                        <CCardHeader className="p-1">
                            <h6 className="m-1">Drug Test</h6>
                        </CCardHeader>
                        <DrugTestView toxiData={toClassData} />
                    </CCard>
                </CCol>
            </CRow>
        )
    }

    displayTO = (
        <CContainer>
            {toxiCard}
        </CContainer>
    )

    return displayTO
}

export default displayToxicology