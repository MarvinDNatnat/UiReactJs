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
import { labPersonName } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const QualityControlCard = (props) => {
    const classes = useStyles();

    let qControl = 'Not yet undergone Quality Control.'
    if (props.qualityControl !== null) {
        qControl = labPersonName(props.qualityControl, false)
    }

    return (
        <CCard className="mb-1">
            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                <h6 className="m-1">Quality Control</h6>
            </CCardHeader>
            <CCardBody className="p-1">
                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="10" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{qControl}</CLabel>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default QualityControlCard;