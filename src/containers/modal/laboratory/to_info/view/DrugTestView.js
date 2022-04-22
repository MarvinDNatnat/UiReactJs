import React from 'react'

import {
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

const DrugTestView = (props) => {

    return (
        <CRow className="ml-1 mr-1 p-0">
            <CCol md="6" className="p-1">
                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="4" className="p-1">
                        <CLabel className="mb-0 ml-2 ">Methamphethamine:</CLabel>
                    </CCol>
                    <CCol md="4" className="p-1">
                        {props.toxiData.toxi.metha !== null
                            ? <CLabel className="mb-0 ml-2 font-weight-bold">
                                {props.toxiData.toxi.metha.value === true
                                    ? 'POSITIVE'
                                    : 'NEGATIVE'
                                }
                            </CLabel>
                            : <CLabel className="mb-0 ml-2 font-weight-bold">
                                -No Result-
                            </CLabel>
                        }
                    </CCol>
                </CRow>
                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="4" className="p-1">
                        <CLabel className="mb-0 ml-2 ">Tetrahydrocanabinol:</CLabel>
                    </CCol>
                    <CCol md="4" className="p-1">
                        {props.toxiData.toxi.tetra !== null
                            ? <CLabel className="mb-0 ml-2 font-weight-bold">
                                {props.toxiData.toxi.tetra.value === true
                                    ? 'POSITIVE'
                                    : 'NEGATIVE'
                                }
                            </CLabel>
                            : <CLabel className="mb-0 ml-2 font-weight-bold">
                                -No Result-
                        </CLabel>
                        }
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
    )
}

export default DrugTestView
