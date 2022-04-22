import React from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const MedTechCard = (props) => {
    const classes = useStyles();

    return (
        <CCard className="mb-1">
            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                <h6 className="m-1">Medical Technologist</h6>
            </CCardHeader>
            <CCardBody className="p-1">
                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="10" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{props.medtech}</CLabel>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default MedTechCard;