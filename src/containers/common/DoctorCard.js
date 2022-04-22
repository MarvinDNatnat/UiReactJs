import React from 'react';
import ReactSelect from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
    CLabel,
} from '@coreui/react';

import {
    FormControl,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(0),
    },
    outlinedInput: {
        marginTop: theme.spacing(1),
    },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    rightAlign: {
        textAlign: 'right',
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));
const DoctorCard = (props) => {
    const classes = useStyles();

    return (
        <CCard className="mb-1">
            <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                <h6 className="m-1">{props.doctorTitle}</h6>
            </CCardHeader>
            {props.editViewFlag === true
                ? <CCardBody className="p-1">
                    <CRow className="ml-1 mr-1 p-0">
                        <CCol md="10" className="p-1">
                            <CLabel className="mb-0 ml-2 font-weight-bold">{props.doctorState.label}</CLabel>
                        </CCol>
                    </CRow>
                </CCardBody>
                : <CCardBody className="p-1">
                    <CRow className="ml-1 mr-1 p-0">
                        <FormControl fullWidth className={clsx(classes.margin, "m-0 p-0")} variant="outlined">
                            <ReactSelect
                                className="basic-single"
                                placeholder="--"
                                value={props.doctorState}
                                onChange={props.handleSelectChange(props.docProp, 'pathologist')}
                                isClearable={true}
                                isSearchable={true}
                                isLoading={false}
                                options={props.doctorSelect}
                                menuPlacement="top"
                            />
                        </FormControl>
                    </CRow>
                </CCardBody>
            }
        </CCard>
    )
}

export default DoctorCard;