import React, { Component } from 'react'
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';


import moment from 'moment';
import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

import PatientModal from 'src/containers/modal/maintenance/PatientModal';
import HappyBirthdayModal from 'src/containers/modal/common/BirthdayGreetingsModal';
import CameraModal from 'src/containers/modal/common/CameraModal';
import PatientInformationModal from 'src/containers/modal/transactions/PatientInformationModal';
import PatientsRegistrationTable from 'src/containers/tables/maintenance/PatientRegistrationTable';

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


const patientConfig = {
    firstname: '',
    lastname: '',
    middlename: '',
    dateOfBirth: null,
    gender: null,
    contactNumber: '',
    email: '',
    address: '',
    corporateId: null,
    seniorId: '',
    pwdId: '',
    passport: '',
    height: '',
    feet: '',
    inch: '',
    weight: '',
    bmi: '',
    isChecked: true,
    nationalityId: null,
    active: true,
    isErrorFirstName: false,
    isErrorLastName: false,
    isErrorMidName: false,
    isErrorDOB: false,
    isErrorContNo: false,
    isErrorEmail: false,
    isErrorAddress: false,
    isErrorCorpId: false,
    isErrorSnrId: false,
    isErrorPwdId: false,
    isErrorNatId: false,
    firstNameError: null,
    lastNameError: null,
    midNameError: null,
    dobError: null,
    contNoError: null,
    emailError: null,
    addressError: null,
    corpIdError: null,
    snrIdError: null,
    pwdIdError: null,
    passportIdError: null,
    natIdError: null,

}

export class PatientRegistration extends Component {
    state = {
        patientModal: {
            isUpdate: null,
            updateIndex: null,
            showPatientModal: false,
            ImportModal: false,
            patientInfoModal: false,
            birthdayGreetingsModal: false,
        },
        cameraModal: false,
        image: "",
        imageFile: "",
        patientData: patientConfig,
        isPatient: false,

    }



    componentDidMount() {
        if (this.props.roles !== undefined && this.props.roles !== null &&
            this.props.roles.roles !== undefined && this.props.roles.roles !== null) {
            const idx = this.props.roles.roles.findIndex(r => r === "USER");
            if (idx >= 0) {
                this.setState({
                    ...this.state,
                    isPatient: true,
                });
            }
        }
        if (this.props.corporateList.length <= 0) {
            this.props.onGetAllCorporates(this.props.userToken);
        }

        if (this.props.nationalityList.length <= 0) {
            this.props.onGetAllNationalities(this.props.userToken);
        }

        if (this.props.itemList.length <= 0) {
            this.props.onGetAllActiveItems(this.props.userToken);
        }

        if (this.props.packageList.length <= 0) {
            this.props.onGetAllActivePackages(this.props.userToken);
        }
    }


    viewAllPatients = () => {
        this.props.onGetAllPatients(this.props.userToken);
    }

    ImportModal = () => {
        const updatePatientModal = updateObject(this.state.patientModal, {
            ImportModal: true,
        });

        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
        });
    }

    addPatientModal = () => {
        let nationality = null;
        if (this.props.nationalityList !== null && this.props.nationalityList.length > 0) {
            const natIndex = this.props.nationalityList.findIndex(nat => nat.id === 167);

            if (natIndex >= 0) {
                const nation = this.props.nationalityList[natIndex];
                nationality = { value: nation.id.toString(), label: nation.countryName + "-" + nation.nationality };
            }
        }

        const updatePatientData = updateObject(this.state.patientData, patientConfig);
        updatePatientData.nationalityId = nationality;
        updatePatientData.isChecked = true

        const updatePatientModal = updateObject(this.state.patientModal, {
            updateIndex: null,
            showPatientModal: true,
        });

        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
            patientData: updatePatientData,
            image: "",
            imageFile: "",
        });
    }

    setPatientData = (updatePatientData) => {
        this.setState({
            ...this.state,
            patientData: updatePatientData,
        });
    }

    closePatientModal = (patientData) => {
        const updatePatientModal = updateObject(this.state.patientModal, {
            showPatientModal: false,
            ImportModal: false,
        });
        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
            patientInfoModal: false,
            image: "",
            imageFile: "",
           
        });
    }

    closePatientInformationModal = () => {
        const updatePatientModal = updateObject(this.state.patientModal, {
            showPatientModal: true,
        });
        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
            patientInfoModal: false,
        })
    }

    closeBirthdayGreetingsModal = () => {
        this.setState({
            ...this.state,
            birthdayGreetingsModal: false,
        })
    }

    savePatientClick = () => {
        this.setState({
            ...this.state,
            patientModal: false,
            patientInfoModal: true,
        })
    }

    savePatientInfo = () => {
        let gender = null;
        if (this.state.patientData.gender !== null) {
            gender = this.state.patientData.gender.value;
        }

        let nationality = null;
        if (this.state.patientData.nationalityId !== null) {
            nationality = this.state.patientData.nationalityId.value;
        }

        let company = null;
        if (this.state.patientData.corporateId !== null) {
            company = this.state.patientData.corporateId.value
        }
        var today = moment(new Date()).format("MM-DD")
        const formData = new FormData();
        formData.append('firstname', this.state.patientData.firstname);
        formData.append('lastname', this.state.patientData.lastname);
        formData.append('middlename', this.state.patientData.middlename === '' ? null : this.state.patientData.middlename);
        formData.append('dateOfBirth', this.state.patientData.dateOfBirth.format("YYYY-MM-DD"));
        formData.append('contactNumber', this.state.patientData.contactNumber);
        formData.append('gender', gender);
        formData.append('email', this.state.patientData.email);
        formData.append('address', this.state.patientData.address);
        formData.append('seniorId', this.state.patientData.seniorId === '' ? null : this.state.patientData.seniorId);
        formData.append('pwdId', this.state.patientData.pwdId === '' ? null : this.state.patientData.pwdId);
        formData.append('corporateId', company);
        formData.append('nationalityId', nationality);
        formData.append('passport', this.state.patientData.passport === '' ? null : this.state.patientData.passport);
        formData.append('weight', this.state.patientData.weight);
        formData.append('height', this.state.patientData.height);
        formData.append('image', this.state.imageFile);
        // const patientRequest = {
        //     firstname: this.state.patientData.firstname,
        //     lastname: this.state.patientData.lastname,
        //     middlename: this.state.patientData.middlename === '' ? null : this.state.patientData.middlename,
        //     dateOfBirth: this.state.patientData.dateOfBirth.format("YYYY-MM-DD"),
        //     contactNumber: this.state.patientData.contactNumber,
        //     gender: gender,
        //     email: this.state.patientData.email,
        //     address: this.state.patientData.address,
        //     seniorId: this.state.patientData.seniorId === '' ? null : this.state.patientData.seniorId,
        //     pwdId: this.state.patientData.pwdId === '' ? null : this.state.patientData.pwdId,
        //     corporateId: company,
        //     nationalityId: nationality,
        //     passport: this.state.patientData.passport === '' ? null : this.state.patientData.passport,
        //     weight: this.state.patientData.weight,
        //     height: this.state.patientData.height,
        //     image: this.state.imageFile,
        // }
        
        this.props.onSaveUpdatePatient(this.props.userToken, formData, 'post', this.closePatientModal, this.viewAllPatients);
        if (today == this.state.patientData.dateOfBirth.format("MM-DD")) {
            this.setState({
                ...this.state,
                birthdayGreetingsModal: true,
            })
        }

    }

    hideName = (w) => {
        if (w.length < 3) return w;
        return w.substring(0, 1) + '*'.repeat(w.length - 1);
    }

    setImage = (img) => {
        fetch(img)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob],this.state.patientData.lastname + " " +  this.state.patientData.firstname +".jpg", { type: "image/jpg" })
            this.setState({
                ...this.state,
                image: img,
                imageFile: file,
                cameraModal: false,
            })
        })
        
    }
    openCameraModal = () => {
        this.setState({
            ...this.state,
            cameraModal: true,
        })

    }
    closeCameraModal = () => {
        this.setState({
            ...this.state,
            cameraModal: false,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.corpsLoading || this.props.emailLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <PatientModal
                    isUpdate={null}
                    showModal={this.state.patientModal.showPatientModal}
                    closeClick={this.closePatientModal}
                    saveClick={this.savePatientClick}
                    patientData={this.state.patientData}
                    setPatientData={this.setPatientData}
                    isPatient={this.state.isPatient}
                    openCameraModal={this.openCameraModal}
                    image={this.state.image}
                />

                <PatientInformationModal
                    patientData={this.state.patientData}
                    showModal={this.state.patientInfoModal}
                    savePatientInfo={this.savePatientInfo}
                    closeClick={this.closePatientInformationModal} />

                <HappyBirthdayModal
                    patientData={this.state.patientData}
                    showModal={this.state.birthdayGreetingsModal}
                    savePatientInfo={this.savePatientInfo}
                    closeClick={this.closeBirthdayGreetingsModal} />

                <CameraModal
                    setImage={this.setImage}
                    showModal={this.state.cameraModal}
                    image={this.state.image}
                    closeClick={this.closeCameraModal}
                />
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Patients Registration</h3>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addPatientModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Register
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllPatients} hidden={this.state.isPatient}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    View
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <PatientsRegistrationTable onRef={ref => (this.patientsTableRef = ref)} updatePatientModal={this.updatePatientModal}
                                    hideName={this.hideName} />
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
        loading: state.ptnts.loading,
        error: state.ptnts.error,
        userToken: state.auth.token,
        roles: state.auth.user,
        corpsLoading: state.corps.loading,
        corporateList: state.corps.corporateList,
        nationalityList: state.geo.nationalityList,
        patientList: state.ptnts.patientList,
        itemList: state.items.itemList,
        packageList: state.packs.packageList,
        emailLoading: state.email.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllCorporates: (token) => dispatch(actions.getAllCorporates(token)),
        onGetAllNationalities: (token) => dispatch(actions.getAllNationalities(token)),
        onGetAllPatients: (token) => dispatch(actions.getAllPatientsDate(token)),
        onSaveUpdatePatient: (token, patientData, reqType, closePatientModal, reloadList) => dispatch(actions.savePatientRegistration(token, patientData, reqType, closePatientModal, reloadList)),
        onGetAllActiveItems: (token) => dispatch(actions.getAllActiveItems(token)),
        onGetAllActivePackages: (token) => dispatch(actions.getAllActivePackages(token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(PatientRegistration))
