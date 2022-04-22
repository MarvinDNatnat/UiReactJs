import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    CHeader,
    CHeaderNavItem,
    CHeaderNavLink,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CImg,
} from '@coreui/react';

import {
    TheHeaderDropdown,
} from './index';

import * as actionTypes from '../store/actions/actionTypes';

// sidebar nav config
import { navigation } from './_nav';

const TheHeader = (props) => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector(state => state.app.sidebarShow);
    const location = useLocation();
    const [menuHeader, setMenuHeader] = useState([]);

    useEffect(() => {
        const path = location.pathname.split('/').filter(v => v !== '');
        if (path.length > 1) {
            switch (path[0]) {
                case 'sales':
                case 'records':
                case 'imaging':
                case 'laboratory':
                    const mkey = path[0];
                    const menuList = [].concat(navigation)
                        .filter(i => i._tag === 'CSidebarNavDropdown' && i.route === '/' + mkey)
                        ;
                    if (menuList.length > 0) {
                        setMenuHeader(menuList[0]._children);
                    } else {
                        setMenuHeader([]);
                    }
                    break;

                default:
                    setMenuHeader([]);
                    break;
            }
        } else {
            setMenuHeader([]);
        }
    }, [location]);

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({ type: actionTypes.SHOW_SIDEBAR, sidebarShow: val })
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({ type: actionTypes.SHOW_SIDEBAR, sidebarShow: val })
    }

    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
                <CImg
                    src={process.env.REACT_APP_SIDEMENU_FULL}
                    alt="Quest Phil Diagnostics"
                    height={50}
                />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                {
                    [].concat(menuHeader)
                        .map((menu) => (
                            <CHeaderNavItem key={menu.to} className="px-1" >
                                <CHeaderNavLink to={menu.to}>
                                    {menu.icon}
                                    {menu.name}
                                </CHeaderNavLink>
                            </CHeaderNavItem>
                        ))
                }
            </CHeaderNav>

            <CHeaderNav className="px-5">
                <TheHeaderDropdown
                    resetUserPassword={props.resetUserPassword}
                    userProfileDialog={props.userProfileDialog}
                    userAccount={props.userAccount}
                />
            </CHeaderNav>
        </CHeader>
    )
}

export default TheHeader
