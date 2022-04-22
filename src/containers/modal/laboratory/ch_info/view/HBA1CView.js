import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    lockField: {
        pointerEvents: 'none',
    }
}));

const HBA1CView = (props) => {
    const classes = useStyles();

    let hemoglobinA1C = '-No Result-'

    if (props.chemData.hba1c.hemoglobinA1C !== '') hemoglobinA1C = props.chemData.hba1c.hemoglobinA1C + ' %'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2">Result:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{hemoglobinA1C}</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>{'4.3 - 6.3'}</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    )
}

export default HBA1CView
