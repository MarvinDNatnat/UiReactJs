import React from 'react';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CLabel,
    CRow, CCol
} from '@coreui/react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const ToxicologyViewInfo = (props) => {
    const classes = useStyles();

    return (
        <div>
            <CCard className="mb-1">
                <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                    <span className="font-weight-bold">Toxicology Results</span>
                </CCardHeader>

                <CCardBody>
                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Methamphethamine:</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            {props.toxiData.toxicology.methamphethamine === null
                                ? <CLabel className="mb-0 ml-2 font-weight-bold">
                                    -No Result-
                                    </CLabel>
                                : <CLabel className="mb-0 ml-2 font-weight-bold">
                                    {props.toxiData.toxicology.methamphethamine.value === true
                                        ? 'POSITIVE'
                                        : 'NEGATIVE'
                                    }
                                </CLabel>
                            }
                        </CCol>
                    </CRow>

                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="4" className="p-1">
                            <CLabel className="mb-0 ml-2 ">Tetrahydrocanabinol:</CLabel>
                        </CCol>
                        <CCol md="4" className="p-1">
                            {props.toxiData.toxicology.tetrahydrocanabinol === null
                                ? <CLabel className="mb-0 ml-2 font-weight-bold">
                                    -No Result-
                                </CLabel>
                                : <CLabel className="mb-0 ml-2 font-weight-bold">
                                    {props.toxiData.toxicology.tetrahydrocanabinol.value === true
                                        ? 'POSITIVE'
                                        : 'NEGATIVE'
                                    }
                                </CLabel>
                            }
                        </CCol>
                    </CRow>

                </CCardBody>
            </CCard>
        </div>
    )
}

export default ToxicologyViewInfo;