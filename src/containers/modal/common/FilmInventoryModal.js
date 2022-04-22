import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CButton,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CCol,
    CCardHeader,
} from '@coreui/react';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    // outlinedInput: {
    //     marginTop: theme.spacing(1),
    // },
    labelText: {
        fontSize: '0.8rem',
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans serif"],
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    }
}));

const excel = () => {
    alert("On Proccess");
}



const FilmInventory = (props) => {
    const classes = useStyles();
    const filmCount = props.filmDataCount.reduce((totalFilm, film) => totalFilm + film, 0)

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
            size='lg'
        >
            <CModalHeader closeButton>
                <CModalTitle>Film Inventory & Count</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="12" className="p-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                            <h6 className="m-1">Film Inventory</h6>
                        </CCardHeader>
                    </CCol>
                </CRow>

                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">11x14 Film Inventory:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">
                            {props.filmInventory.length !== 0 ? props.filmInventory[0].film11x14 : 0}
                        </CLabel>
                    </CCol>

                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">10x12 Film Inventory:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">
                            {props.filmInventory.length !== 0 ? props.filmInventory[0].film10x12 : 0}    
                        </CLabel>
                    </CCol>
                </CRow>

                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">14x17 Film Inventory:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">
                            {props.filmInventory.length !== 0 ? props.filmInventory[0].film14x17 : 0}
                        </CLabel>
                    </CCol>

                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">8x10 Film Inventory:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">
                            {props.filmInventory.length !== 0 ? props.filmInventory[0].film8x10 : 0}    
                        </CLabel>
                    </CCol>
                </CRow>

                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">14x14 Film Inventory:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">
                            {props.filmInventory.length !== 0 ? props.filmInventory[0].film14x14 : 0}
                        </CLabel>
                    </CCol>

                </CRow>

                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="12" className="p-1">
                        <CCardHeader className={clsx(classes.cardBlueWhite, "p-1")}>
                            <h6 className="m-1">Film Count</h6>
                        </CCardHeader>
                    </CCol>
                </CRow>

                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">11x14 Film Count:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{props.filmDataCount[0]}</CLabel>
                    </CCol>

                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">10x12 Film Count:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{props.filmDataCount[1]}</CLabel>
                    </CCol>
                </CRow>

                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">14x17 Film Count:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{props.filmDataCount[2]}</CLabel>
                    </CCol>

                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">8x10 Film Count:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{props.filmDataCount[3]}</CLabel>
                    </CCol>
                </CRow>

                <CRow className="ml-1 mr-1 p-0">
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">14x14 Film Count:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{props.filmDataCount[4]}</CLabel>
                    </CCol>

                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2">RT PCR Count:</CLabel>
                    </CCol>
                    <CCol md="3" className="p-1">
                        <CLabel className="mb-0 ml-2 font-weight-bold">{props.filmDataCount[5]}</CLabel>
                    </CCol>
                </CRow>
            </CModalBody>


            <CModalFooter>
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">Total Film Count:</CLabel>
                </CCol>
                <CCol md="3" className="p-1">
                    <CLabel className="mb-0 ml-2 font-weight-bold">{filmCount}</CLabel>
                </CCol>
                <CButton
                    className="border border-dark"
                    color="success"
                    onClick={() => props.addFilm(null)}
                >Add Film</CButton>
                <CButton
                    className="border border-dark"
                    color="primary"
                    onClick={excel}
                >Excel</CButton>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default FilmInventory

