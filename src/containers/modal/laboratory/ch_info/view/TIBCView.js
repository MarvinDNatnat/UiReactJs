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
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
}));

const TIBCView = (props) => {
    const classes = useStyles();

    let tibcr = '-No Result-'

    if (props.chemData.tibc.result !== '') tibcr = props.chemData.tibc.result + ' umoL/L'

    return (
        <CCardBody className="p-1">
            <CRow className="ml-1 mr-1 p-0">
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2">Result:</CLabel>
                </CCol>
                <CCol md="4" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{tibcr}</CLabel>
                </CCol>
                <CCol md="2" className="p-1">
                    <CLabel className={clsx(classes.labelText, "mb-0 font-weight-bold")}>45-72</CLabel>
                </CCol>
            </CRow>
        </CCardBody>
    );
}

export default TIBCView
