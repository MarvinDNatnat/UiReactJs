import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';


import * as actions from 'src/store/actions/index';


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

export class Queuing extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),

    }

    componentDidMount() {
        this.props.onClearPEList('PE');
        this.props
            .onViewPhysicalExam(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                'PE',
                process.env.REACT_APP_BRANCH_CODE,
                null,
            )


        this.props.onClearXRList('XR');
        this.props
            .onViewXrayList(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                'XR',
                process.env.REACT_APP_BRANCH_CODE,
                null,
            )
    }

    render() {
        const peList = [];
        const xrayList = [];
        // const extractionList = [];

        
        this.props.xrayList.map(pe => {
            return xrayList.push(<CRow><CCol className="col-12 text-center">{pe.id}</CCol></CRow>)
        })

        this.props.peList.map(pe => {
            return peList.push(<CRow><CCol className="col-12 text-center">{pe.id}</CCol></CRow>)
        })

        return (
            <CRow>
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <h3 className="mfe-2">Queuing</h3>

                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol className="md-4 text-center font-weight-bold"><h2>PHYSICAL EXAM</h2></CCol>
                                <CCol className="md-4 text-center font-weight-bold"><h2>XRAY</h2></CCol>
                                <CCol className="md-4 text-center font-weight-bold"><h2>EXTRACTION</h2></CCol>
                            </CRow>
                            <CRow>
                                <CCol className="col-4 text-center">
                                    {peList}
                                </CCol>
                                <CCol className="col-4 text-center">
                                    {xrayList}
                                </CCol>
                                <CCol className="col-4 text-center">
                                    <CRow>123123</CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.ptnts.loading,
        error: state.ptnts.error,
        userToken: state.auth.token,
        roles: state.auth.user,
        peList: state.srv.peList,
        xrayList: state.srv.xrayList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onViewPhysicalExam: (token, startDate, endDate, laboratory, branchId, chargeTo) => dispatch(actions.viewTransByServiceRequest(token, startDate, endDate, laboratory, branchId, chargeTo)),
        onClearPEList: (procedure) => dispatch(actions.transByServReqClear(procedure)),
        onViewXrayList: (token, startDate, endDate, laboratory, branchId, chargeTo) => dispatch(actions.viewTransByServiceRequest(token, startDate, endDate, laboratory, branchId, chargeTo)),
        onClearXRList: (procedure) => dispatch(actions.transByServReqClear(procedure)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Queuing))
