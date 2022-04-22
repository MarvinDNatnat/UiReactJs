import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

    CContainer,
    CRow,
    CCol,
} from '@coreui/react';

import {
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

import { updateObject } from 'src/store/utility';

import PatientInformation from 'src/containers/common/PatientInformation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));

const SpecimenModal = (props) => {
    const classes = useStyles();

    const handleCheckBox = (id) => (event) => {
        const spcReq = [].concat(props.nurseData.specimenRequirements);

        const labIndex = spcReq.findIndex(itm => itm.id === id);
        if (labIndex >= 0) {
            const lab = spcReq[labIndex];
            lab.submitted = event.target.checked;
            spcReq[labIndex] = lab;
        }

        const updateNurseData = updateObject(props.nurseData, {
            specimenRequirements: spcReq,
        });
        props.setNurseData(updateNurseData);
    }

    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.saveClick();
        }
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='lg'
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle className="font-weight-bold">Submit Specimen/Requirements</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-1">
                <PatientInformation
                    propData={props.nurseData}
                />
                <CContainer>
                    <CRow className="mb-1">
                        <CCol md='6' className="font-weight-bold text-center">Required Specimen/Service</CCol>
                        <CCol md='6' className="font-weight-bold">Verified By/Date</CCol>
                    </CRow>
                    {
                        props.nurseData.specimenRequirements.map((svr) => (
                            <CRow key={svr.id} className="mb-2">
                                <CCol md='6'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={svr.submitted}
                                                onChange={handleCheckBox(svr.id)}
                                                name="checkedB"
                                                color="primary"
                                                className="p-0"
                                                disabled={svr.status === 2 ? true : false}
                                            />
                                        }
                                        label={svr.requirement + '-' + svr.service}
                                        className="m-0"
                                    />
                                </CCol>
                                <CCol md='6'>
                                    {
                                        svr.verified !== null
                                            ? svr.verified.username + ' ' + moment(svr.verifiedDate).format('MMM-DD-YYYY hh:mm a')
                                            : null
                                    }
                                </CCol>
                            </CRow>
                        ))
                    }
                </CContainer>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={validateInputs}
                >Submit</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

const mapStateToProps = (state) => {
    return {
        laboratoryList: state.items.itemLaboratories,
    }
};

export default connect(mapStateToProps)(SpecimenModal)
