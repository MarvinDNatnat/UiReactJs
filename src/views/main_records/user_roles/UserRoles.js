import React, { Component } from 'react';
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

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import * as actions from 'src/store/actions/index';
import { updateObject } from 'src/store/utility';

import UserRoleModal from 'src/containers/modal/maintenance/UserRoleModal';
import UserRolesTable from 'src/containers/tables/maintenance/UserRolesTable';
import UserRoleMenuModal from 'src/containers/modal/maintenance/UserRoleMenuModal';

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

const roleConfig = {
    rolename: '',
    isErrorRolename: false,
    rolenameError: null,
}

export class UserRoles extends Component {
    state = {
        userRoleModal: {
            isUpdate: null,
            updateIndex: null,
            showUserRoleModal: false,
            showUserRoleMenuModal: false,
        },
        rolename: '',
        userRoleData: roleConfig,
        userRoleMenuData: [],
    }

    componentDidMount() {
        if (this.props.menuList.length <= 0) {
            this.props.onGetMenuList(this.props.userToken);
        }
    }

    viewAllUserRoles = () => {
        this.props.onGetAllUserRoles(this.props.userToken);
    }

    addUserRoleModal = () => {
        const updateRoleData = updateObject(this.state.userRoleData, roleConfig);

        const updateRoleModal = updateObject(this.state.userRoleModal, {
            isUpdate: null,
            updateIndex: null,
            showUserRoleModal: true,
        });

        this.setState({
            ...this.state,
            userRoleModal: updateRoleModal,
            userRoleData: updateRoleData,
        });
    }

    updateUserRoleModal = (rle, idx) => {
        if (rle !== undefined && idx !== undefined) {
            const role = rle.name.split("_");
            let roleName = '';
            if (role.length > 1) {
                roleName = role[1];
            }

            const updateRoleData = updateObject(this.state.userRoleData, {
                rolename: roleName,
                isErrorRolename: false,
                rolenameError: null,
            });

            const updateRoleModal = updateObject(this.state.userRoleModal, {
                isUpdate: rle.id,
                updateIndex: idx,
                showUserRoleModal: true,
                showUserRoleMenuModal: false,
            });

            this.setState({
                ...this.state,
                userRoleModal: updateRoleModal,
                userRoleData: updateRoleData,
            });
        }
    }

    updateRoleMenuModal = (rle, idx) => {
        if (rle !== undefined && idx !== undefined) {
            const role = rle.name.split("_");
            let roleName = '';
            if (role.length > 1) {
                roleName = role[1];
            }

            const updateRoleModal = updateObject(this.state.userRoleModal, {
                isUpdate: rle.id,
                updateIndex: idx,
                showUserRoleModal: false,
                showUserRoleMenuModal: true
            });

            const urMenus = rle.menus;
            const umList = [];
            const disabled = roleName === "ADMIN" ? true : false;
            this.props.menuList.forEach(m => {
                if (m.isActive) {
                    let hasPriv = false;

                    if (roleName === "ADMIN") {
                        hasPriv = true;
                    } else {
                        const idx = urMenus.findIndex(urm => urm.id === m.id);
                        if (idx >= 0) {
                            hasPriv = true;
                        }
                    }

                    const menu = {
                        ...m,
                        hasPriviledge: hasPriv,
                        isDisable: disabled,
                    }
                    umList.push(menu);
                }
            });

            this.setState({
                ...this.state,
                rolename: roleName,
                userRoleModal: updateRoleModal,
                userRoleMenuData: umList,
            });
        }
    }

    closeUserRoleModal = (roleData) => {
        const updateRoleModal = updateObject(this.state.userRoleModal, {
            showUserRoleModal: false,
            showUserRoleMenuModal: false,
        });

        this.setState({
            ...this.state,
            userRoleModal: updateRoleModal,
        });

        if (roleData !== null) {
            if (this.state.userRoleModal.isUpdate !== null) { // update
                if (this.state.userRoleModal.updateIndex !== null) {
                    this.userRoleTableRef.updateRoleToTable(roleData, this.state.userRoleModal.updateIndex);
                }
                // } else { // add
                //     this.userRoleTableRef.addRoleToTable(roleData);
            }
        }
    }

    saveUserRoleClick = () => {
        const roleRequest = {
            rolename: this.state.userRoleData.rolename,
        }

        let reqMethod = 'post';
        if (this.state.userRoleModal.isUpdate !== null) {
            reqMethod = 'put';
            roleRequest.id = this.state.userRoleModal.isUpdate;
        }

        this.props.onSaveUpdateUserRole(this.props.userToken, roleRequest, reqMethod, this.closeUserRoleModal);
    }

    saveUserRoleMenuClick = () => {
        const urmList = [];

        [].concat(this.state.userRoleMenuData)
            .filter(m => m.hasPriviledge)
            .map((mn) => {
                urmList.push(mn.id);
                return mn;
            })

        const menuRequest = {
            id: this.state.userRoleModal.isUpdate,
            menus: urmList
        }

        this.props.onSaveUserRoleMenus(this.props.userToken, menuRequest, this.closeUserRoleModal);
    }

    setUserRoleData = (updateRoleData) => {
        this.setState({
            ...this.state,
            userRoleData: updateRoleData,
        });
    }

    setUserRoleMenuData = (updateRoleMenuData) => {
        this.setState({
            ...this.state,
            userRoleMenuData: updateRoleMenuData,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <UserRoleModal
                    isUpdate={this.state.userRoleModal.isUpdate}
                    showModal={this.state.userRoleModal.showUserRoleModal}
                    closeClick={this.closeUserRoleModal}
                    saveClick={this.saveUserRoleClick}
                    userRoleData={this.state.userRoleData}
                    setUserRoleData={this.setUserRoleData}
                />

                <UserRoleMenuModal
                    showModal={this.state.userRoleModal.showUserRoleMenuModal}
                    closeClick={this.closeUserRoleModal}
                    saveClick={this.saveUserRoleMenuClick}
                    setUserRoleMenuData={this.setUserRoleMenuData}
                    title={this.state.rolename}
                    roleMenuList={this.state.userRoleMenuData}
                />

                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">User Roles</h3>
                                <CButton className="mfe-2 border border-dark" color="success" onClick={this.viewAllUserRoles}>
                                    <i className="mfe-2 fas fa-list" />
                                    View
                                </CButton>
                                <CButton className="mfe-2 border border-dark d-none" color="primary" onClick={this.addUserRoleModal}>
                                    <i className="mfe-2 fas fa-plus-square" />
                                    Add
                                </CButton>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div className="table-responsive">
                                <UserRolesTable
                                    onRef={ref => (this.userRoleTableRef = ref)}
                                    updateUserRoleModal={this.updateUserRoleModal}
                                    updateRoleMenuModal={this.updateRoleMenuModal}
                                />
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
        loading: state.roles.loading,
        error: state.roles.error,
        userToken: state.auth.token,
        roleList: state.roles.roleList,
        menuList: state.roles.menuList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllUserRoles: (token) => dispatch(actions.getAllUserRoles(token)),
        onGetMenuList: (token) => dispatch(actions.getMenuList(token)),
        onSaveUpdateUserRole: (token, roleData, reqType, closeRoleModal) => dispatch(actions.saveUpdateUserRole(token, roleData, reqType, closeRoleModal)),
        onSaveUserRoleMenus: (token, menuData, closeRoleModal) => dispatch(actions.saveUserRoleMenus(token, menuData, closeRoleModal)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(UserRoles))