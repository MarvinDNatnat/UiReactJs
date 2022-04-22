import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

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

import PatientModal from 'src/containers/modal/maintenance/PatientModal';
import PatientsTable from 'src/containers/tables/maintenance/PatientsTable';
import ImportModal from 'src/containers/modal/maintenance/import';

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

export class Patients extends Component {
    state = {
        patientModal: {
            isUpdate: null,
            updateIndex: null,
            showPatientModal: false,
            ImportModal: false,
        },
        patientData: patientConfig
    }

    componentDidMount() {
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

        const updatePatientModal = updateObject(this.state.patientModal, {
            isUpdate: null,
            updateIndex: null,
            showPatientModal: true,
        });

        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
            patientData: updatePatientData,
        });
    }

    setPatientData = (updatePatientData) => {
        this.setState({
            ...this.state,
            patientData: updatePatientData,
        });
    }

    updatePatientModal = (ptnt, idx) => {
        if (ptnt !== undefined && idx !== undefined) {
            let gender = null;
            if (ptnt.gender === 'M') {
                gender = { value: 'M', label: 'MALE' };
            } else if (ptnt.gender === 'F') {
                gender = { value: 'F', label: 'FEMALE' };
            }

            let nationality = null;
            if (this.props.nationalityList !== null && this.props.nationalityList.length > 0 && ptnt.nationality !== null) {
                const natIndex = this.props.nationalityList.findIndex(nat => nat.id === ptnt.nationality.id);

                if (natIndex >= 0) {
                    const nation = this.props.nationalityList[natIndex];
                    nationality = { value: nation.id.toString(), label: nation.countryName + "-" + nation.nationality };
                }
            }

            let company = null;
            if (ptnt.corporate !== null) {
                company = { value: ptnt.corporate.corporateid, label: ptnt.corporate.companyName };
            }

            const updatePatientData = updateObject(this.state.patientData, {
                firstname: ptnt.firstname,
                lastname: ptnt.lastname,
                middlename: ptnt.middlename === null ? '' : ptnt.middlename,
                dateOfBirth: moment(ptnt.birthDate),
                gender: gender,
                contactNumber: ptnt.contactNumber,
                email: ptnt.email,
                address: ptnt.address,
                corporateId: company,
                seniorId: ptnt.seniorId === null ? '' : ptnt.seniorId,
                pwdId: ptnt.pwdId === null ? '' : ptnt.pwdId,
                passport: ptnt.passport === null ? '' : ptnt.passport,
                height: '',
                feet: '',
                inch: '',
                weight: '',
                nationalityId: nationality,
                active: ptnt.active,
                isErrorFirstName: false,
                isErrorLastName: false,
                isErrorMidName: false,
                isErrorDOB: false,
                isErrorGender: false,
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
                genderError: null,
                contNoError: null,
                emailError: null,
                addressError: null,
                corpIdError: null,
                snrIdError: null,
                pwdIdError: null,
                natIdError: null,
                passportIdError: null,

            });
            
            // let feet = ''
            // let inch = ''

            // if (peInfo.vitalSign.height !== null) {
            //     let realFeet = (parseInt(peInfo.vitalSign.height) * 0.393700) / 12
            //     let getFeet = Math.floor(realFeet)
            //     let getInch = Math.round((realFeet - getFeet) * 12)

            //     feet = getFeet
            //     inch = getInch
            // }
            const updatePatientModal = updateObject(this.state.patientModal, {
                isUpdate: ptnt.patientid,
                updateIndex: idx,
                showPatientModal: true,
            });

            this.setState({
                ...this.state,
                patientModal: updatePatientModal,
                patientData: updatePatientData,
            });
        }
    }

    closePatientModal = (patientData) => {
        const updatePatientModal = updateObject(this.state.patientModal, {
            showPatientModal: false,
            ImportModal: false
        });
        this.setState({
            ...this.state,
            patientModal: updatePatientModal,
        });



        if (patientData !== null) {
            if (this.state.patientModal.isUpdate !== null) { // update
                if (this.state.patientModal.updateIndex !== null) {
                    this.patientsTableRef.updatePatientToTable(patientData, this.state.patientModal.updateIndex);
                }
                // } else { // add
                //     this.patientsTableRef.addPatientToTable(patientData);
            }
        }
    }

    savePatientClick = () => {
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

        const patientRequest = {
            firstname: this.state.patientData.firstname,
            lastname: this.state.patientData.lastname,
            middlename: this.state.patientData.middlename === '' ? null : this.state.patientData.middlename,
            dateOfBirth: this.state.patientData.dateOfBirth.format("YYYY-MM-DD"),
            contactNumber: this.state.patientData.contactNumber,
            gender: gender,
            email: this.state.patientData.email,
            address: this.state.patientData.address,
            seniorId: this.state.patientData.seniorId === '' ? null : this.state.patientData.seniorId,
            pwdId: this.state.patientData.pwdId === '' ? null : this.state.patientData.pwdId,
            corporateId: company,
            nationalityId: nationality,
            passport: this.state.patientData.passport === '' ? null : this.state.patientData.passport,
            weight: this.state.weight,
            height: this.state.height,
        }

        let reqMethod = 'post';
        if (this.state.patientModal.isUpdate !== null) {
            reqMethod = 'put';
            patientRequest.patientid = this.state.patientModal.isUpdate;
            patientRequest.active = this.state.patientData.active;
        }

        this.props.onSaveUpdatePatient(this.props.userToken, patientRequest, reqMethod, this.closePatientModal);
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading || this.props.corpsLoading || this.props.emailLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <PatientModal
                    isUpdate={this.state.patientModal.isUpdate}
                    showModal={this.state.patientModal.showPatientModal}
                    closeClick={this.closePatientModal}
                    saveClick={this.savePatientClick}
                    patientData={this.state.patientData}
                    setPatientData={this.setPatientData}
                />

                <ImportModal
                    showModal={this.state.patientModal.ImportModal}
                    closeClick={this.closePatientModal}
                    saveClick={this.savePatientClick}
                    corporateList={this.props.corporateList}
                    itemList={this.props.itemList}
                    packageList={this.props.packageList}
                />
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Patients</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllPatients}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="primary" onClick={this.addPatientModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                                <CButton className="mfe-2 border border-dark" color="info" onClick={this.ImportModal}>
                                    <i className="mfe-2 fas fa-file-import" />
                                    Import
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <PatientsTable onRef={ref => (this.patientsTableRef = ref)} updatePatientModal={this.updatePatientModal} />
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
        onGetAllPatients: (token) => dispatch(actions.getAllPatients(token)),
        onSaveUpdatePatient: (token, patientData, reqType, closePatientModal) => dispatch(actions.saveUpdatePatient(token, patientData, reqType, closePatientModal)),
        onGetAllActiveItems: (token) => dispatch(actions.getAllActiveItems(token)),
        onGetAllActivePackages: (token) => dispatch(actions.getAllActivePackages(token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Patients))
