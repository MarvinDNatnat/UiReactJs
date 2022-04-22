import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import { getPatientName, genderDisplay, computeAge, padLeadingZeros, getTransType, displayDate, getDispatchType } from 'src/store/utility';

const useStyles = makeStyles((theme) => ({
    remarks: {
        color: 'red'
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    }
}));

function PatientInformation(props) {
    const classes = useStyles();

    let serviceRequestTab = null;
    let patientWidth = 12;
    if (props.propData.serviceRequest !== undefined && props.propData.serviceRequest !== null &&
        props.propData.serviceRequest.length > 0) {
        patientWidth = 7;
        serviceRequestTab = (
            <CCol md="5" className="pl-1 pr-0">
                <CCard className="mb-1">
                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                        <span className="font-weight-bold">Service Request</span>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="ml-1 p-0">
                            <CCol md="12" className="p-0">
                                <strong>
                                    {
                                        props.propData.requestName !== undefined && props.propData.requestName !== null
                                            ? props.propData.requestName
                                            : ''
                                    }
                                </strong>
                            </CCol>
                            <CCol md="12" className="p-0">
                                <ul className="pl-2" style={{ listStyle: 'none' }}>
                                    {
                                        props.propData.serviceRequest.map((svr) => (
                                            <li key={svr.laboratoryRequest}>{svr.requestName}</li>
                                        ))
                                    }
                                </ul>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        );
    } else if (props.propData.laboratoryServices !== undefined && props.propData.laboratoryServices !== null &&
        props.propData.laboratoryServices.length > 0) {
        patientWidth = 7;
        serviceRequestTab = (
            <CCol md="5" className="pl-1 pr-0">
                <CCard className="mb-1">
                    <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                        <span className="font-weight-bold">Service Request</span>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="ml-1 p-0">
                            <CCol md="12" className="p-0">
                                <strong>
                                    {
                                        props.propData.requestName !== undefined && props.propData.requestName !== null
                                            ? props.propData.requestName.toUpperCase()
                                            : ''
                                    }
                                </strong>
                            </CCol>
                            <CCol md="12" className="p-0">
                                <ul className="pl-2" style={{ listStyle: 'none' }}>
                                    {
                                        props.propData.laboratoryServices.map((lab) => (
                                            <li key={lab.itemid}>{lab.itemDescription}</li>
                                        ))
                                    }
                                </ul>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        );
    }

    return (
        <CContainer>
            <CRow>
                <CCol md={patientWidth} className="pr-0 pl-0">
                    <CCard className="mb-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                            <span className="font-weight-bold">Patient Information</span>
                        </CCardHeader>
                        <CCardBody className="p-1">
                            <CRow className="ml-1 p-0">
                                <h5 className="m-0">
                                    {
                                        props.propData.patient !== undefined && props.propData.patient !== null
                                            ? getPatientName(props.propData.patient)
                                            : ''
                                    }
                                </h5>
                            </CRow>
                            <CRow className="ml-1 p-0">
                                <CCol md="2" className="p-0">
                                    Gender:
                                </CCol>
                                <CCol md="2" className="p-0">
                                    <strong>
                                        {
                                            props.propData.patient !== undefined && props.propData.patient !== null
                                                ? genderDisplay(props.propData.patient.gender)
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                                <CCol md="1" className="p-0">
                                    Age:
                                </CCol>
                                <CCol md="1" className="p-0">
                                    <strong>
                                        {
                                            props.propData.patient !== undefined && props.propData.patient !== null
                                                ? computeAge(props.propData.patient.birthDate)
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                                <CCol md="4" className="p-0">
                                    <strong>
                                        {
                                            props.propData.patient !== undefined && props.propData.patient !== null
                                                ? props.propData.patient.nationality.nationality
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                            </CRow>
                            <CRow className="ml-1 p-0">
                                <CCol md="3" className="p-0">
                                    Contact/Email:
                                </CCol>
                                <CCol md="6" className="p-0">
                                    <strong>
                                        {
                                            props.propData.patient !== undefined && props.propData.patient !== null
                                                ? props.propData.patient.contactNumber + " / " + props.propData.patient.email
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                                <CCol md="3" className="p-0">
                                    <strong>
                                        {
                                            props.propData.corporate !== undefined && props.propData.corporate !== null
                                                ? props.propData.corporate.companyName
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                            </CRow>
                            <CRow className="ml-1 p-0">
                                <CCol md="1" className="p-0">
                                    SR#:
                                </CCol>
                                <CCol md="2" className="p-0">
                                    <strong>
                                        {
                                            props.propData.txtSRNo !== undefined && props.propData.txtSRNo !== null
                                                ? padLeadingZeros(props.propData.txtSRNo)
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                                <CCol md="2" className="p-0">
                                    Transaction:
                                </CCol>
                                <CCol md="7" className="p-0">
                                    <strong>
                                        {
                                            props.propData.branch !== undefined && props.propData.branch !== null
                                                ? props.propData.branch.branchCode + " "
                                                : ''
                                        }
                                    </strong>
                                    <strong>
                                        {
                                            props.propData.txnType !== undefined && props.propData.txnType !== null
                                                ? getTransType(props.propData.txnType)
                                                : ''
                                        }
                                    </strong>
                                    <strong className={clsx(classes.remarks)}>
                                        {
                                            props.propData.txnRemarks !== undefined && props.propData.txnRemarks !== null
                                                ? ' (' + props.propData.txnRemarks + ')'
                                                : ''
                                        }
                                    </strong>
                                    <strong>
                                        {
                                            props.propData.txnDispatch !== undefined && props.propData.txnDispatch !== null
                                                ? ' ' + getDispatchType(props.propData.txnDispatch)
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                            </CRow>
                            <CRow className="ml-1 p-0">
                                <CCol md="2" className="p-0">
                                    Date/Time:
                                </CCol>
                                <CCol md="4" className="p-0">
                                    <strong>
                                        {
                                            props.propData.txnDate !== undefined && props.propData.txnDate !== null
                                                ? displayDate(props.propData.txnDate, "MMM-DD-YYYY hh:mm a")
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                                <CCol md="2" className="p-0">
                                    Cashier:
                                </CCol>
                                <CCol md="4" className="p-0">
                                    <strong>
                                        {
                                            props.propData.cashier !== undefined && props.propData.cashier !== null && props.propData.username !== null
                                                ? props.propData.cashier.username
                                                : ''
                                        }
                                    </strong>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                {serviceRequestTab}
            </CRow>
        </CContainer>
    )
}

export default PatientInformation
