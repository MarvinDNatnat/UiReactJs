import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CImg,
    CLabel
} from '@coreui/react';

const TheHeaderDropdown = (props) => {
    const history = useHistory();

    const logout = () => {
        history.push('/logout');
    }

    let username = null;
    let useremail = null;
    if (props.auth !== null && props.auth !== undefined) {
        if (props.auth.userName !== null && props.auth.userName !== undefined) {
            username = props.auth.userName.toUpperCase();
        }
        if (props.auth.userEmail !== null && props.auth.userEmail !== undefined) {
            useremail = props.auth.userEmail;
        }
    }

    return (
        <CDropdown
            inNav
            className="c-header-nav-items mx-2"
            direction="down"
        >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CLabel className="mfe-2 pt-2"><strong>{username}</strong></CLabel>
                    <CImg
                        src={'avatars/default.png'}
                        className="c-avatar-img"
                        alt={useremail}
                    />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem onClick={() => props.userProfileDialog()}>
                    <i className="mfe-2 fas fa-address-card" />
                    My Profile
                </CDropdownItem>
                <CDropdownItem onClick={() => props.userAccount()}>
                    <i className="mfe-2 fas fa-user-circle" />
                    My Account
                </CDropdownItem>
                <CDropdownItem onClick={() => props.resetUserPassword()}>
                    <i className="mfe-2 fas fa-key" />
                    Change Password
                </CDropdownItem>
                <CDropdownItem divider />
                <CDropdownItem onClick={logout}>
                    <i className="mfe-2 fas fa-sign-out-alt" />
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
    }
};

export default connect(mapStateToProps)(TheHeaderDropdown)
