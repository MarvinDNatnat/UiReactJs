import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/index";
import { capitalizeFirstCharacter } from "src/store/utility";

import "./scss/style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/font.css"
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";

import "datatables.net-dt/js/dataTables.dataTables.min.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";

// import 'datatables.net-fixedcolumns-dt/js/fixedColumns.dataTables.min.js';
// import 'datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.min.css';

// import 'datatables.net-responsive-dt/js/responsive.dataTables.min.js';
// import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

// Containers
const AdminLayout = React.lazy(() => import("./containers/TheLayout"));
const Login = React.lazy(() => import("./views/authentication/Login"));
const Page404 = React.lazy(() => import("./views/pages/Page404"));

const getSubMenuIndex = (menuList, key) => {
    const index = menuList.findIndex(m => m.menuName === key);
    return index;
}

const authGuard = (Component, props) => () => {
    if (localStorage.getItem("token")) {
        let isAdmin = false;
        if (props.auth !== undefined && props.auth !== null &&
            props.auth.roles !== undefined && props.auth.roles !== null) {
            const idx = props.auth.roles.findIndex(r => r === "ADMIN");
            if (idx >= 0) {
                isAdmin = true;
            }
        }

        if (isAdmin) {
            return <Component />
        } else {
            const authMenus = [].concat(props.authMenus); // empty on refresh
            const hash = window.location.hash.split('/').filter(v => v !== '');
            if (authMenus.length > 0 && hash.length > 1) {
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

                const usMenu = [].concat(authMenus)
                    .filter(m => m.menuGroup === 'USERS');

                const mkMenu = [].concat(authMenus)
                    .filter(m => m.menuGroup === 'LABELS');

                const peMenu = [].concat(authMenus)
                    .filter(m => m.menuGroup === 'PE');

                const drMenu = [].concat(authMenus)
                    .filter(m => m.menuGroup === 'DRC');

                let viewComponent = false;
                switch (hash[1]) {
                    case 'dashboard':
                    case 'logout':
                    case 'page404':
                    case 'page500':
                    // case 'transactions':
                        viewComponent = true;
                        break;

                    case 'sales':
                        if (slMenu.length > 0) {
                            switch (hash[2]) {
                                case 'list':
                                    if (getSubMenuIndex(slMenu, 'Transaction List') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'refund':
                                    if (getSubMenuIndex(slMenu, 'Refund') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'eod':
                                    if (getSubMenuIndex(slMenu, 'End Of Day') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                default:
                                    if (getSubMenuIndex(slMenu, 'Sale') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;
                            }
                        }
                        break;

                    case 'records':
                        if (mrMenu.length > 0) {
                            switch (hash[2]) {
                                case 'branches':
                                case 'patients':
                                case 'doctors':
                                case 'charge':
                                case 'items':
                                case 'packages':
                                case 'referrals':
                                    if (getSubMenuIndex(mrMenu, capitalizeFirstCharacter(hash[2])) >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                default:
                                    break;
                            }
                        }
                        break;

                    case 'laboratory':
                        if (lbMenu.length > 0) {
                            switch (hash[2]) {
                                case 'clinical_microscopy':
                                    if (getSubMenuIndex(lbMenu, 'Clinical Microscopy') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'hematology':
                                case 'chemistry':
                                case 'serology':
                                case 'toxicology':
                                case 'backteriology':
                                case 'microbiology':
                                case 'industrial':
                                    if (getSubMenuIndex(lbMenu, capitalizeFirstCharacter(hash[2])) >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                default:
                                    break;
                            }
                        }
                        break;
                    case 'finance':
                        if (flMenu.length > 0) {
                            switch (hash[2]) {
                                case 'soa':
                                    if (getSubMenuIndex(flMenu, 'Statement of Account') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'sop':
                                    if (getSubMenuIndex(flMenu, 'Statement of Payable') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'report':
                                    if (getSubMenuIndex(flMenu, 'Moi\'s Reports') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        break;

                    case 'imaging':
                        if (imMenu.length > 0) {
                            switch (hash[2]) {
                                case 'xray':
                                    if (getSubMenuIndex(imMenu, 'X-Ray') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'ecg':
                                    if (getSubMenuIndex(imMenu, 'ECG') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'echo2d':
                                    if (getSubMenuIndex(imMenu, '2D Echo') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'ultrasound':
                                    if (getSubMenuIndex(imMenu, 'Ultrasound') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                default:
                                    break;
                            }
                        }
                        break;

                    case 'nurse':
                    case 'pending':
                        if (nrMenu.length > 0) {
                            viewComponent = true;
                        }
                        break;


                    case 'transactions':
                        if (mkMenu.length > 0) {
                            viewComponent = true;
                        }
                        break;

                    case 'patient':
                        if (usMenu.length > 0) {
                            viewComponent = true;
                        }
                        break;

                    case 'medicalServices':
                        if (peMenu.length > 0) {
                            switch (hash[2]) {
                                case 'physicalexam':
                                    if (getSubMenuIndex(peMenu, 'Physical Exam') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'medical_certificate':
                                    if (getSubMenuIndex(peMenu, 'Medical Certificate') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            // viewComponent = true;
                        }
                        break;


                    case 'consultation':
                        if (drMenu.length > 0) {
                            switch (hash[2]) {
                                case 'list':
                                    if (getSubMenuIndex(drMenu, 'Doctors Module') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;

                                case 'refund':
                                    if (getSubMenuIndex(drMenu, 'Secretary') >= 0) {
                                        viewComponent = true;
                                    }
                                    break;
                                default:
                                    break;
                            }

                        }
                        break;
                    default:
                        break;
                }

                if (viewComponent) {
                    return <Component />
                }
                return <Page404 />
            }
            return <Component />
        }
    } else {
        return <Redirect to="/login" />
    }
};

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <HashRouter {...this.props}>
                <React.Suspense fallback={loading}>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route path="/" render={authGuard(AdminLayout, this.props)} />

                        <Route path="*">
                            <Page404 />
                        </Route>
                    </Switch>
                </React.Suspense>
            </HashRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
        authMenus: state.auth.menus,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
