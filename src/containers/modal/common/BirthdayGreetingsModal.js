import React from 'react';
import { connect } from 'react-redux';
import 'src/containers/modal/common/css/birthdayGreetingCss.css'

import {
    CButton,
    CContainer,
    CRow,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CCard
} from '@coreui/react';



const BirthdayGreetingsModal = (props) => {

    return (
        <CModal
            show={props.showModal}
            // show={true}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
            </CModalHeader>
            <CModalBody>
                <CContainer>
                    <CCard className="mb-1">
                        <CRow>
                            <CCol md="12">
                                <img className="img-fluid" alt="Responsive Image"
                                    width="500" height="100" src="images/birthdayGreeting.jpg" />
                            </CCol>
                        </CRow>
                    </CCard>
                </CContainer>
            </CModalBody>
            <CModalFooter>
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Close</CButton>
            </CModalFooter>
        </CModal >
        //      <CModalHeader closeButton>
        //     </CModalHeader>
        //     <CModalBody>
        //         <CContainer>
        //             <CCard className="mb-1">
        //                 <CRow>
        //                     <CCol md="12">
        //                         <div className="birthday-bcard">
        //                             <div className="bcard">
        //                                 <div className="cake">
        //                                     <div className="cake-bottom"></div>
        //                                     <div className="cake-middle"></div>
        //                                     <div className="cake-top"></div>
        //                                     <div className="candle"></div>
        //                                     <div className="flame"></div>
        //                                     <div className="shadow"></div>
        //                                 </div>
        //                                 <div className="confetti">
        //                                     <div className="squareOne"></div>
        //                                     <div className="squareTwo"></div>
        //                                     <div className="squareThree"></div>
        //                                     <div className="squareFour"></div>
        //                                     <div className="squareFive"></div>
        //                                     <div className="squareSix"></div>
        //                                     <div className="squareSeven"></div>
        //                                     <div className="squareEight"></div>
        //                                     <div className="squareNine"></div>
        //                                     <div className="squareTen"></div>
        //                                 </div>
        //                                 <div className="text">Happy Birthday!</div>
        //                             </div>
        //                         </div>
        //                     </CCol>
        //                 </CRow>
        //             </CCard>
        //         </CContainer>
        //     </CModalBody>
        //     <CModalFooter>
        //         <CButton
        //             className="border border-dark"
        //             color="danger"
        //             onClose={() => props.closeClick(null)}
        //         >Close</CButton>
        //     </CModalFooter>
        // </CModal >
    )
}

const mapStateToProps = (state) => {
    return {
    }
};
export default connect(mapStateToProps)(BirthdayGreetingsModal)
