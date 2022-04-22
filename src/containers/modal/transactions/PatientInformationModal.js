import React from 'react';
import { connect } from 'react-redux';

import moment from "moment";
import { getPatientDisplayWithoutAge, computeAge } from 'src/store/utility';
import {
    CButton,
    CContainer,
    CRow,
    CCol,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCard
} from '@coreui/react';

const PatientInformationModal = (props) => {

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>Are you sure your information is correct?</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CContainer>
                    <CCard className="mb-1">
                        <CRow>
                            <CCol md="3">
                                <CLabel>Fullname: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{getPatientDisplayWithoutAge(props.patientData)}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Birthdate: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{moment(props.patientData.dateOfBirth).format("MMMM DD, YYYY")}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Age/Gender: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{computeAge(props.patientData.dateOfBirth)}/{props.patientData.gender != null ? props.patientData.gender.label : null}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Contact #: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.contactNumber}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Email: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.email}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Address: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.address}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Company: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.corporateId != null ? props.patientData.corporateId.label : null}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Nationality: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.nationalityId != null ? props.patientData.nationalityId.label : null}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>Senior Citezen ID: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.seniorId}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>PWD ID: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.pwdId}</CLabel>
                            </CCol>
                            <CCol md="3">
                                <CLabel>PASSPORT ID: </CLabel>
                            </CCol>
                            <CCol md="9">
                                <CLabel className="font-weight-bold">{props.patientData.passport}</CLabel>
                            </CCol>
                        </CRow>
                    </CCard>
                </CContainer>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={() => props.savePatientInfo(null)}
                >Confirm</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal >
    )
}

const mapStateToProps = (state) => {
    return {
    }
};
export default connect(mapStateToProps)(PatientInformationModal)
