import React from 'react';
import { connect } from 'react-redux';
import 'src/containers/modal/common/css/birthdayGreetingCss.css'

import {
    CButton,
    CContainer,
    CModal,
    CCol,
    CRow,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CCard
} from '@coreui/react';
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user"
};
const CameraModal = (props) => {
    const webcamRef = React.useRef(null);

    const retake = () => {
        props.setImage("")
    }
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            props.setImage(imageSrc)
        },

        [webcamRef]
    );
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
                                {/* {
                                    props.image !== "" ? <img src={props.image} /> : 
                                } */}
                                <Webcam
                                        audio={false}
                                        height={500}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        width="100%"
                                        videoConstraints={videoConstraints}
                                    />
                            </CCol>
                        </CRow>
                        <button
                            onClick={(e) => { e.preventDefault(); capture(); }}
                            >Capture</button>
                        {/* <button onClick={(e) => {
                            e.preventDefault();
                            retake();
                        }}
                            disabled={props.image !== "" ? false : true}
                            className="webcam-btn">
                            Retake Image</button> */}
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
    )
}

const mapStateToProps = (state) => {
    return {
    }
};
export default connect(mapStateToProps)(CameraModal)
