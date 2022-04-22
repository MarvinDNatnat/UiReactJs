import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import * as actions from 'src/store/actions/index';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    CCard,
    CCardHeader,
    CCardBody,
    CContainer,
    CCol,
    CRow,
} from '@coreui/react';

import {
    Box,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';


import EODAuditors from './EODAuditors';
import EODCashiers from './EODCashiers';
import EODTreasurer from './EODTreasurer';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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
    overflow: {
        overflow: 'scroll',
        height: '300px'
    },
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    }
});


export class EndOfDay extends Component {
    state = {
        viewPanel: 0,
        selectedOption: 'cashiers',
        isAuditor: false,
    }

    componentDidMount() {
        const roles = [].concat(this.props.auth.roles)
            .filter(r => r === 'ADMIN' || r === 'AUDITOR');

        if (roles.length > 0) {
            this.setState({
                ...this.state,
                isAuditor: true,
            })
        }
    }

    handleOptionChange = (event) => {
        let panel = 0;
        switch (event.target.value) {
            case 'cashiers':
                panel = 0;
                this.props.onClearCashierEODData();
                break;

            case 'auditors':
                panel = 1;
                this.props.onClearAuditorEODData();
                break;

            case 'treasurer':
                panel = 2;
                this.props.onClearCashierEODData();
                break;

            default:
                break;
        }

        this.setState({
            ...this.state,
            viewPanel: panel,
            selectedOption: event.target.value,
        })
    }

    render() {
        const { classes } = this.props;

        let auditOption = null;
        if (this.state.isAuditor) {
            auditOption = (
                <CRow>
                    <CCol md="12">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className={clsx("btn btn-primary border border-dark", this.state.selectedOption === 'cashiers' ? "active" : "")}>
                                <input type="radio" value="cashiers"
                                    checked={this.state.selectedOption === 'cashiers'}
                                    onChange={this.handleOptionChange}
                                /> Cashiers
                            </label>
                            <label className={clsx("btn btn-success border border-dark", this.state.selectedOption === 'auditors' ? "active" : "")}>
                                <input type="radio" value="auditors"
                                    checked={this.state.selectedOption === 'auditors'}
                                    onChange={this.handleOptionChange}
                                /> Auditors
                            </label>
                            <label className={clsx("btn btn-info border border-dark", this.state.selectedOption === 'treasurer' ? "active" : "")}>
                                <input type="radio" value="treasurer"
                                    checked={this.state.selectedOption === 'treasurer'}
                                    onChange={this.handleOptionChange}
                                /> Treasurer
                            </label>
                        </div>
                    </CCol>
                </CRow>
            );

        }

        return (
            <CContainer>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <CRow>
                    <CCol className="p-0">
                        <CCard>
                            <CCardHeader className={classes.cardBlueWhite}>
                                <h3 className="mfe-2 font-weight-bold">End Of Day</h3>
                            </CCardHeader>
                            <CCardBody>
                                {auditOption}
                                <CRow>
                                    <CCol md="12">
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={0}>
                                            <EODCashiers />
                                        </TabPanel>
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={1}>
                                            <EODAuditors />
                                        </TabPanel>
                                        <TabPanel className={classes.tabPanel} value={this.state.viewPanel} index={2}>
                                            <EODTreasurer />
                                        </TabPanel>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
        loading: state.eod.loading,
        error: state.eod.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearCashierEODData: () => dispatch(actions.clearCashierEODData()),
        onClearAuditorEODData: () => dispatch(actions.clearAuditorEODData()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(EndOfDay));