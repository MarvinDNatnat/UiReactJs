import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { withStyles } from '@material-ui/core/styles';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

import DoctorModal from 'src/containers/modal/maintenance/DoctorModal';
import DoctorsTable from 'src/containers/tables/maintenance/DoctorsTable';

const useStyles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    errorMessage: {
        color: '#f00',
        textAlign: 'center',
        fontWeight: "bolder",
    },
});

const doctorConfig = {
    lastname: '',
    firstname: '',
    middlename: '',
    suffix: '',
    specialization: '',
    contactNumber: '',
    email: '',
    licenseNumber: '',
    doctorType: 0,
    signature: null,
    active: true,
    isErrorLastname: false,
    isErrorFirstname: false,
    isErrorMiddlename: false,
    isErrorSuffix: false,
    isErrorSpecialization: false,
    isErrorContactNumber: false,
    isErrorEmail: false,
    isErrorLicenseNumber: false,
    lastnameError: null,
    firstnameError: null,
    middlenameError: null,
    suffixError: null,
    specializationError: null,
    contactNumberError: null,
    emailError: null,
    licenseNumberError: null,

    physician: false,
    pathologist: false,
    radiologist: false,
}

export class Doctors extends Component {
    state = {
        doctorModal: {
            isUpdate: null,
            updateIndex: null,
            showDoctorModal: false,
        },
        doctorData: doctorConfig,
    }

    viewAllDoctors = () => {
        this.props.onGetAllDoctors(this.props.userToken);
    }

    addDoctorModal = () => {
        const updateDoctorData = updateObject(this.state.doctorData, doctorConfig);

        const updateDoctorModal = updateObject(this.state.doctorModal, {
            isUpdate: null,
            updateIndex: null,
            showDoctorModal: true,
        });

        this.setState({
            ...this.state,
            doctorModal: updateDoctorModal,
            doctorData: updateDoctorData,
        });
    };

    updateDoctorModal = (doc, idx) => {
        if (doc !== undefined && idx !== undefined) {

            let physician = false;
            let pathologist = false;
            let radiologist = false;

            if (doc.doctorType & 1) { // physician[PE]
                physician = true;
            }

            if (doc.doctorType & 2) { // pathologist
                pathologist = true;
            }

            if (doc.doctorType & 4) { // radiologist
                radiologist = true;
            }

            const updateDoctorData = updateObject(doctorConfig, {
                lastname: doc.lastname,
                firstname: doc.firstname,
                middlename: doc.middlename !== null ? doc.middlename : '',
                suffix: doc.suffix !== null ? doc.suffix : '',
                specialization: doc.specialization !== null ? doc.specialization : '',
                contactNumber: doc.contactNumber !== null ? doc.contactNumber : '',
                email: doc.email !== null ? doc.email : '',
                licenseNumber: doc.licenseNumber !== null ? doc.licenseNumber : '',
                doctorType: doc.doctorType,
                signature: doc.signature !== null ? doc.signature : null,
                active: doc.active,
                physician: physician,
                pathologist: pathologist,
                radiologist: radiologist,
            });

            const updateDoctorModal = updateObject(this.state.doctorModal, {
                isUpdate: doc.doctorid,
                updateIndex: idx,
                showDoctorModal: true,
            });

            this.setState({
                ...this.state,
                doctorModal: updateDoctorModal,
                doctorData: updateDoctorData,
            });
        }
    }

    closeDoctorModal = (doctorData) => {
        const updateDoctorModal = updateObject(this.state.doctorModal, {
            showDoctorModal: false,
        });

        this.setState({
            ...this.state,
            doctorModal: updateDoctorModal,
        });

        if (doctorData !== null) {
            if (this.state.doctorModal.isUpdate !== null) { // update
                if (this.state.doctorModal.updateIndex !== null) {
                    this.doctorTableRef.updateDoctorToTable(doctorData, this.state.doctorModal.updateIndex);
                }
                // } else { // add
                //     this.userTableRef.addUserToTable(userData);
            }
        }
    }

    uploadSignature = (fileSignature) => {
        if (fileSignature !== undefined && fileSignature !== null) {
            this.props.onUploadDoctorSignature(this.props.userToken, this.state.doctorModal.isUpdate, fileSignature, this.closeDoctorModal)
        } else {
            Swal.fire({
                title: 'Signature',
                text: "Are you sure to remove doctor's signature?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.onUploadDoctorSignature(this.props.userToken, this.state.doctorModal.isUpdate, null, this.closeDoctorModal)
                }
            })

        }
    }

    saveDoctorClick = () => {
        const doctorRequest = {
            lastname: this.state.doctorData.lastname,
            firstname: this.state.doctorData.firstname,
            middlename: this.state.doctorData.middlename !== '' ? this.state.doctorData.middlename : null,
            suffix: this.state.doctorData.suffix !== '' ? this.state.doctorData.suffix : null,
            specialization: this.state.doctorData.specialization !== '' ? this.state.doctorData.specialization : null,
            contactNumber: this.state.doctorData.contactNumber !== '' ? this.state.doctorData.contactNumber : null,
            email: this.state.doctorData.email !== '' ? this.state.doctorData.email : null,
            licenseNumber: this.state.doctorData.licenseNumber,
            doctorType: this.state.doctorData.doctorType,
        }

        let reqMethod = 'post';
        if (this.state.doctorModal.isUpdate !== null) {
            reqMethod = 'put';
            doctorRequest.doctorid = this.state.doctorModal.isUpdate;
            doctorRequest.active = this.state.doctorData.active;
        }

        this.props.onSaveUpdateDoctor(this.props.userToken, doctorRequest, reqMethod, this.closeDoctorModal);
    }

    setDoctorData = (updateDoctorData) => {
        this.setState({
            ...this.state,
            doctorData: updateDoctorData,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <DoctorModal
                    isUpdate={this.state.doctorModal.isUpdate}
                    showModal={this.state.doctorModal.showDoctorModal}
                    closeClick={this.closeDoctorModal}
                    saveClick={this.saveDoctorClick}
                    doctorData={this.state.doctorData}
                    setDoctorData={this.setDoctorData}
                    uploadSignature={this.uploadSignature}
                />

                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Doctors</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllDoctors}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addDoctorModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <DoctorsTable onRef={ref => (this.doctorTableRef = ref)} updateDoctorModal={this.updateDoctorModal} />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.docs.loading,
        error: state.docs.error,
        userToken: state.auth.token,
        doctorList: state.docs.doctorList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllDoctors: (token) => dispatch(actions.getAllDoctors(token)),
        onSaveUpdateDoctor: (token, doctorData, reqType, closeDoctorModal) => dispatch(actions.saveUpdateDoctor(token, doctorData, reqType, closeDoctorModal)),
        onUploadDoctorSignature: (token, doctorid, file, closeDoctorModal) => dispatch(actions.uploadDoctorSignature(token, doctorid, file, closeDoctorModal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Doctors))