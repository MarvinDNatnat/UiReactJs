import React from 'react'

import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

    CCard,
    CCardHeader,
    CCardBody,
    CRow,
    CCol,
} from '@coreui/react';

import {
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

const UserRoleMenuModal = (props) => {
    const validateInputs = () => {
        let hasError = false;

        if (!hasError) {
            props.saveClick();
        }
    }

    const handleCheckBox = (id) => (event) => {
        const mnList = [].concat(props.roleMenuList);

        const labIndex = mnList.findIndex(m => m.id === id);
        if (labIndex >= 0) {
            const menu = mnList[labIndex];
            menu.hasPriviledge = event.target.checked;
            mnList[labIndex] = menu;
        }

        props.setUserRoleMenuData(mnList);
    }

    let saveButton = (
        <CButton
            className="border border-dark"
            color="primary"
            onClick={validateInputs}
        >Save</CButton>
    );
    if (props.title !== undefined && props.title !== null && props.title === "ADMIN") {
        saveButton = null;
    }

    return (
        <CModal
            show={props.showModal}
            onClose={() => props.closeClick(null)}
            closeOnBackdrop={false}
        >
            <CModalHeader closeButton>
                <CModalTitle>MENU PRIVILEDGES {props.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">MASTER FILES</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'MSTR')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">SALES</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'SALE')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">FINANCE</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'FINANCE')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">LABORATORIES</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'LAB')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">IMAGING</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'IMG')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">NURSE</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'NRS')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">PATIENT</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => (m.menuGroup === 'USERS'))
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">LABELS</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => (m.menuGroup === 'LABELS'))
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">QUEUING</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => (m.menuGroup === 'Queuing'))
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">PHYSICAL EXAMINATION</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'PE')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>

                <CCard className="mb-2">
                    <CCardHeader className="p-2">
                        <h6 className="m-0 p-0">DOCTOR CONSULTATION</h6>
                    </CCardHeader>
                    <CCardBody className="p-1">
                        <CRow className="m-0 p-0">
                            {
                                [].concat(props.roleMenuList)
                                    .filter(m => m.menuGroup === 'DRC')
                                    .map((mn) => {
                                        const labIndex = props.roleMenuList.findIndex(m => m.id === mn.id);
                                        if (labIndex >= 0) {
                                            return (
                                                <CCol key={mn.id} md="4" className="p-1">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={mn.hasPriviledge}
                                                                onChange={handleCheckBox(mn.id)}
                                                                name="checkedB"
                                                                color="primary"
                                                                className="p-0"
                                                                disabled={mn.isDisable}
                                                            />
                                                        }
                                                        label={mn.menuName}
                                                        className="m-0"
                                                    />
                                                </CCol>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                            }
                        </CRow>
                    </CCardBody>
                </CCard>
            </CModalBody>

            <CModalFooter>
                {saveButton}
                <CButton
                    className="border border-dark"
                    color="danger"
                    onClick={() => props.closeClick(null)}
                >Cancel</CButton>
            </CModalFooter>


        </CModal>
    )
}

export default UserRoleMenuModal
