import React, { useState } from 'react';


import { updateObject } from 'src/store/utility';
import {
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow, CCol,
    CCard,
    CCardHeader,
    CCardBody
} from '@coreui/react';

import EcgView from 'src/containers/modal/ecg/ecg_info/EcgViewInfo';
import EcgInput from 'src/containers/modal/ecg/ecg_info/EcgEditInfo';
import PatientInformation from 'src/containers/common/PatientInformation';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white',
    }
}));



const EcgModal = (props) => {
    const [headerControl, setHeaderControl] = useState(true)

    const headerHandler = () => {
        setHeaderControl(!headerControl)
    }
    const handleChange = (opt, prop) => (event) => {
        const updateEcgData = updateObject(props.ecgData, {
            [opt]: updateObject(props.ecgData[opt], {
                [prop]: event.target.value,
            })
        });
        props.setEcgData(updateEcgData);
    }

    const validateInputs = () => {
        props.saveClick();
    }

    const classes = useStyles();
    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size="xl"
        >
            <CModalHeader className={classes.cardBlueWhite} closeButton>
                <CModalTitle>Ecg</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol md="7" className="pr-1">
                        <PatientInformation
                            propData={props.ecgData}
                        />
                    </CCol>

                    <CCol md="5" className="pl-1">
                        <CCard>
                            <CCardHeader className={clsx(classes.cardBlueWhite, "p-2")}>
                                <span className="font-weight-bold">Request Name</span>
                            </CCardHeader>

                            <CCardBody>
                                <strong>
                                    {
                                        props.ecgData.requestName !== undefined && props.ecgData.requestName !== null
                                            ? props.ecgData.requestName.toUpperCase()
                                            : ''
                                    }
                                </strong>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                {props.editViewFlag === true
                    ?
                <EcgView
                ecgData={props.ecgData} 
                /> :
                <EcgInput
                    ecgData={props.ecgData}
                    handleChange={handleChange} />
                }

            </CModalBody>
            <CModalFooter>
                {props.editViewFlag === true
                    ? <FormControlLabel
                        control={
                            <Switch
                                checked={headerControl}
                                onChange={headerHandler}
                                color="primary"
                            />
                        }
                        label="Print with Header"
                    />
                    : null}

                {props.editViewFlag === true
                    ? <CButton
                        className="border border-dark"
                        color="secondary"
                    onClick={() => props.printEcg(props.ecgData.txnId, props.ecgData.id, 2, headerControl)}
                    >
                        <i className="mfe-2 fas fa-print" />
                            Print Ecg Report</CButton>
                    : <CButton
                        className="border border-dark"
                        color="primary"
                        onClick={validateInputs}
                    >Save</CButton>
                }


                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>

        </CModal>
    )
}

export default EcgModal;