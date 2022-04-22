import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CImg,
} from '@coreui/react';

// sidebar nav config
import { navigation } from './_nav';

import * as actionTypes from '../store/actions/actionTypes';

const TheSidebar = (props) => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.app.sidebarShow)
    const [displayMenu, setDisplayMenu] = useState([]);

    useEffect(() => {
        let isAdmin = false;
        if (props.auth !== undefined && props.auth !== null &&
            props.auth.roles !== undefined && props.auth.roles !== null) {
            const idx = props.auth.roles.findIndex(r => r === "ADMIN");
            if (idx >= 0) {
                isAdmin = true;
            }
        }

        const getSubMenuIndex = (menuList, key) => {
            const index = menuList.findIndex(m => m.menuName === key);
            return index;
        }

        if (isAdmin) {
            setDisplayMenu(navigation);
        } else {
            const userMenu = [];
            const authMenus = [].concat(props.authMenus);

            const slMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'SALE');

            const mrMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'MSTR');

            const flMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'FINANCE');

            const lbMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'LAB');

            const imMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'IMG');

            const nrMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'NRS');

            const peMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'PE');

            const prMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'USERS');

            const mkMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'LABELS');

            const qMenu = [].concat(authMenus)
                .filter(m => m.menuGroup === 'Queuing');

            navigation.forEach(element => {
                switch (element.name) {
                    case 'Dashboard':
                    case 'NavDivider':
                        userMenu.push(element);
                        break;

                    case 'Labels':
                        if (mkMenu.length > 0) {
                            userMenu.push(element);
                        }
                        break;

                    case 'Patient Transaction Records':
                    case 'Patient Registration':
                        if (prMenu.length > 0) {
                            userMenu.push(element);
                        }
                        break;

                    case 'Queuing':
                        if (qMenu.length > 0) {
                            userMenu.push(element);
                        }
                        break;

                    case 'Sales':
                        if (slMenu.length > 0) {
                            const children = [];
                            element._children.forEach(subElement => {
                                switch (subElement.name) {
                                    case 'Transaction List':
                                    case 'Refund':
                                    case 'End Of Day':
                                    case 'SOA':
                                        if (getSubMenuIndex(slMenu, subElement.name) >= 0) {
                                            children.push(subElement);
                                        }
                                        break;

                                    case 'Point-of-Sale':
                                        if (getSubMenuIndex(slMenu, 'Sale') >= 0) {
                                            children.push(subElement);
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            });

                            element._children = children;
                            userMenu.push(element);
                        }
                        break;

                    case 'Finance':
                        if (flMenu.length > 0) {
                            const children = [];
                            element._children.forEach(subElement => {
                                if (getSubMenuIndex(flMenu, subElement.name) >= 0) {
                                    children.push(subElement);
                                }
                            });
                            element._children = children;
                            userMenu.push(element);
                        }
                        break;
                    case 'Medical Records':
                        if (mrMenu.length > 0) {
                            const children = [];

                            element._children.forEach(subElement => {
                                switch (subElement.name) {
                                    case 'Branches':
                                    case 'Patients':
                                    case 'Doctors':
                                    case 'Charge':
                                    case 'Packages':
                                    case 'Referrals':
                                        if (getSubMenuIndex(mrMenu, subElement.name) >= 0) {
                                            children.push(subElement);
                                        }
                                        break;

                                    case 'Items/Services':
                                        if (getSubMenuIndex(mrMenu, 'Items') >= 0) {
                                            children.push(subElement);
                                        }
                                        break;

                                    default:
                                        break;
                                }
                            });

                            element._children = children;
                            userMenu.push(element);
                        }
                        break;

                    case 'Laboratory Sciences':
                        if (lbMenu.length > 0) {
                            const children = [];
                            element._children.forEach(subElement => {
                                if (getSubMenuIndex(lbMenu, subElement.name) >= 0) {
                                    children.push(subElement);
                                }
                            });

                            element._children = children;
                            userMenu.push(element);
                        }
                        break;

                    case 'Imaging':
                        if (imMenu.length > 0) {
                            const children = [];

                            element._children.forEach(subElement => {
                                if (getSubMenuIndex(imMenu, subElement.name) >= 0) {
                                    children.push(subElement);
                                }
                            });

                            element._children = children;
                            userMenu.push(element);
                        }
                        break;

                    case 'Quest Quality':
                    case 'Pending':
                        if (nrMenu.length > 0) {
                            userMenu.push(element);
                        }
                        break;

                        
                    case 'Medical Services':
                        if (peMenu.length > 0) {
                            const children = [];

                            element._children.forEach(subElement => {
                                if (getSubMenuIndex(peMenu, subElement.name) >= 0) {
                                    children.push(subElement);
                                }
                            });


                            userMenu.push(element);
                        }
                        break;

                    default:
                        break;
                }
            });

            setDisplayMenu(userMenu);
        }
    }, [props.auth, props.authMenus]);

    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({ type: actionTypes.SHOW_SIDEBAR, sidebarShow: val })}
        >
            <CSidebarBrand style={{ background: 'white', borderRight: '1px solid #eee' }} className="d-md-down-none" to="/">
                <CImg
                    src={process.env.REACT_APP_SIDEMENU_FULL}
                    className="c-sidebar-brand-full"
                    alt={process.env.REACT_APP_NAME}
                    height={50}
                />
                <CImg
                    src={process.env.REACT_APP_SIDEMENU_MINI}
                    className="c-sidebar-brand-minimized"
                    alt={process.env.REACT_APP_NAME}
                    height={35}
                />
            </CSidebarBrand>
            <CSidebarNav>
                <CCreateElement
                    items={displayMenu}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
        authMenus: state.auth.menus,
    }
};

export default connect(mapStateToProps)(React.memo(TheSidebar))
