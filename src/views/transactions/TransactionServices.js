import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import * as actions from 'src/store/actions/index';
import { withStyles } from '@material-ui/core/styles';

import {
    CButton,
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';

import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { updateObject, getPatientDisplay } from 'src/store/utility';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import {
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import TransactionServicesTable from 'src/containers/tables/TransactionServicesTable';
import PrintLabelModal from 'src/containers/modal/common/PrintLabelModal';
import FilmInventoryModal from 'src/containers/modal/common/FilmInventoryModal';
import AddFilmModal from 'src/containers/modal/common/AddFilmModal';

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
    cardBlueWhite: {
        backgroundColor: '#4267B2',
        color: 'white'
    }
});

var retrievedData = localStorage.getItem('userInfo');
var radTechInfo = JSON.parse(retrievedData);
const radTech = { value: null, label: null };


// ZbXJ0KvBA4sm jorge
// jENZkoKHKcVx chan
switch (radTechInfo.userId) {
    case 'ZbXJ0KvBA4sm':
        radTech.value = "JORGE"
        radTech.label = "JORGE"
        break;
    case 'jENZkoKHKcVx':
        radTech.value = "CHRISTIAN"
        radTech.label = "CHRISTIAN"
        break;
    default:
        break;

}

const printConfig = {
    txnID: null,
    pid: null,
    title: '',
    xray: true,
    specimen: true,
    xrayType: { value: 'CHEST PA', label: 'CHEST PA' },
    radTech: radTech,
    filmSize: { value: '10x12', label: '10x12' },
    medTech: null,
}

const filmInventoryConfig = {
    film11x14: 0,
    film10x12: 0,
    film14x17: 0,
    film8x10: 0,
    film14x14: 0,
}

class TransactionServices extends Component {
    state = {
        dateFromValue: moment(moment().format("YYYY-MM-DD [05:00]")),
        dateToValue: moment(moment().format("YYYY-MM-DD [21:00]")),
        updateIndex: null,
        showSSModal: false,
        showPLModal: false,
        print: printConfig,
        radTechList: [],
        medTechList: [],
        inventoryModal: false,
        addInventoryModal: false,
        filmConf: filmInventoryConfig,
    }

    componentDidMount() {
        let radTech = [];
        let medTech = [];

        if (process.env.REACT_APP_RADTECH !== undefined && process.env.REACT_APP_RADTECH !== null) {
            radTech = process.env.REACT_APP_RADTECH.split(',');
        }

        if (process.env.REACT_APP_MEDTECH !== undefined && process.env.REACT_APP_MEDTECH !== null) {
            medTech = process.env.REACT_APP_MEDTECH.split(',');
        }

        this.setState({
            ...this.state,
            radTechList: radTech,
            medTechList: medTech,
        });
    }

    viewTransactions = () => {
        this.props.onClearLaboratoryList('TXN');
        this.props
            .onViewTxnServicesList(
                this.props.userToken,
                'TXN',
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
                {
                }
            )
    }

    openSubmitSpecimenModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            alert("dito");
        }
    }

    openViewLabelModal = (data, idx) => {
        if (data !== undefined && idx !== undefined) {
            this.viewLabelModal(data, idx);
        }
    }

    handleChange = (opt, prop) => (event) => {
        const updateFilmData = updateObject(this.state.filmConf, {
                [prop]: event.target.value,
        });

        this.setState({
            ...this.state,
            filmConf: updateFilmData,
        });
    }

    filmInventoryModal = (data, idx) => {
        this.setState({
            ...this.state,
            inventoryModal: true,
        });
        this.props.onViewMarkerInventory(this.props.userToken);
        this.props
            .onViewMarkerCount(
                this.props.userToken,
                moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
                moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
            )
    }

    showAddFilmModal = (txnResponse) => {
        const updateFilmData = updateObject(filmInventoryConfig, {

        })

        const fData = this.props.markerInventory
        if (fData !== null) {
            
                const film11x14values = fData[0].film11x14
                const film10x12values = fData[0].film10x12
                const film14x17values = fData[0].film14x17
                const film8x10values = fData[0].film8x10
                const film14x14values = fData[0].film14x14

                updateFilmData.film11x14 = film11x14values
                updateFilmData.film10x12 = film10x12values
                updateFilmData.film14x17 = film14x17values
                updateFilmData.film8x10 = film8x10values
                updateFilmData.film14x14 = film14x14values

            
        }
        this.setState({
            ...this.state,
            showPLModal: false,
            showSSModal: false,
            inventoryModal: false,
            addInventoryModal: true,
            filmConf: updateFilmData,
        });
    }

    saveFilm = () => {
        const filmValues = {
            film11x14: this.state.filmConf.film11x14,
            film10x12: this.state.filmConf.film10x12,
            film14x17: this.state.filmConf.film14x17,
            film8x10: this.state.filmConf.film8x10,
            film14x14: this.state.filmConf.film14x14,
            
        }
        this.props.onSaveFilmInventory(this.props.userToken, filmValues, this.closeTxnSrvDisplayModal)
    }
    viewLabelModal = (data, idx) => {
        if (this.props.txnSrvList.length > 0) {
            let id = null;
            let title = '';
            let pid = null;

            if (data !== null) {
                id = data.id;
                title = getPatientDisplay(data.patient);
                pid = data.patient.patientid;
            }

            const printData = updateObject(printConfig, {
                txnID: id,
                title: title,
                pid: pid
            });

            this.setState({
                ...this.state,
                showPLModal: true,
                updateIndex: idx,
                print: printData,
            });
        } else {
            Swal.fire(
                'Error.',
                'No items to print.',
                'error'
            );
        }
    }


    closeTxnSrvDisplayModal = (txnResponse) => {
        this.setState({
            ...this.state,
            showPLModal: false,
            showSSModal: false,
            inventoryModal: false,
            addInventoryModal: false,
        });

        if (txnResponse !== null) {
            if (this.state.updateIndex !== null) {
                this.txnSrvTableRef.updateTxnServiceToTable(txnResponse, this.state.updateIndex);
            }
        }
    }

    onPrintLabel = (spaceControl) => {
        this.props.onPrintLaboratoryLabels(
            this.props.userToken,
            this.state.print.txnID,
            moment(this.state.dateFromValue).format('YYYYMMDDHHmm'),
            moment(this.state.dateToValue).format('YYYYMMDDHHmm'),
            spaceControl,
            {
                xray: this.state.print.xray,
                specimen: this.state.print.specimen,
                xrayType: this.state.print.xrayType !== null ? this.state.print.xrayType.value : null,
                filmSize: this.state.print.filmSize !== null ? this.state.print.filmSize.value : null,
                radTech: this.state.print.radTech !== null ? this.state.print.radTech.value : null,
                medTech: this.state.print.medTech !== null ? this.state.print.medTech.value : null,
                pid: this.state.print.pid,
            }
        );
    }

    setTxnServicePrint = (updatePrnData) => {
        this.setState({
            ...this.state,
            print: updatePrnData,
        });
    }

    render() {
        const { classes } = this.props;

        const dateDisplayFormat = 'MMM-DD-YYYY hh:mm a'

        let f11x14 = 0;
        let f10x12 = 0;
        let f14x17 = 0;
        let f8x10 = 0;
        let f14x14 = 0;
        let rtpcr = 0;
        this.props.marker.forEach(markCount => {
            switch (markCount.filmSize) {
                case '11x14':
                    f11x14++
                    break;
                case '10x12':
                    f10x12++
                    break;
                case '14x17':
                    f14x17++
                    break;
                case '8x10':
                    f8x10++
                    break;
                case '14x14':
                    f14x14++
                    break;
                case 'rtpcr':
                    rtpcr++
                    break;
                default:
                    return;
            }
        })
        let arrayFilmSize = [];
        arrayFilmSize.push(f11x14, f10x12, f14x17, f8x10, f14x14, rtpcr);

        const dateChangeHandler = (prop) => (event) => {
            this.setState({
                ...this.state,
                [prop]: event
            })
        }

        

        return (
            <CRow>
                <Backdrop className={classes.backdrop} open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>


                <PrintLabelModal
                    showModal={this.state.showPLModal}
                    closeClick={this.closeTxnSrvDisplayModal}
                    printLabel={this.onPrintLabel}
                    printData={this.state.print}
                    setTxnServicePrint={this.setTxnServicePrint}
                    radTechList={this.state.radTechList}
                    medTechList={this.state.medTechList}
                />
                <FilmInventoryModal
                    showModal={this.state.inventoryModal}
                    closeClick={this.closeTxnSrvDisplayModal}
                    filmDataCount={arrayFilmSize}
                    filmInventory={this.props.markerInventory}
                    addFilm={this.showAddFilmModal}
                />

                <AddFilmModal 
                    showModal={this.state.addInventoryModal}
                    closeClick={this.closeTxnSrvDisplayModal}
                    filmDataCount={arrayFilmSize}
                    addFilm={this.showAddFilmModal}
                    filmData={this.state.filmConf}
                    saveFilm={this.saveFilm}
                    handleChange={this.handleChange}
                />

                <CCol>
                    <CCard>
                        <CCardHeader className={classes.cardBlueWhite}>
                            <h3 className="mfe-2 font-weight-bold">Labels</h3>
                        </CCardHeader>

                        <CCardBody>
                            <CRow>
                                <CCol md="3" className="p-1">
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            value={this.state.dateFromValue}
                                            format={dateDisplayFormat}
                                            label="Start Date"
                                            inputVariant="outlined"
                                            onChange={dateChangeHandler('dateFromValue')}
                                            showTodayButton
                                            disableFuture
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            value={this.state.dateToValue}
                                            format={dateDisplayFormat}
                                            label="End Date"
                                            inputVariant="outlined"
                                            onChange={dateChangeHandler('dateToValue')}
                                            showTodayButton
                                            disableFuture
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <CButton
                                        className="border border-dark"
                                        color="success"
                                        onClick={this.viewTransactions}
                                    >
                                        <i className="mfe-2 fas fa-list" />
                                        View
                                    </CButton>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="3" className="p-1">
                                    <CButton
                                        className="border border-dark"
                                        color="info"
                                        onClick={() => this.viewLabelModal(null, null)}
                                    >
                                        <i className="mfe-2 fas fa-address-card" />
                                        Batch Print Labels
                                    </CButton>
                                </CCol>
                                <CCol md="3" className="p-1">
                                    <CButton
                                        className="border border-dark"
                                        color="primary"
                                        onClick={() => this.filmInventoryModal(null, null)}
                                    >
                                        <i className="mfe-2 fas fa-address-card" />
                                        Film Inventory
                                    </CButton>
                                </CCol>
                            </CRow>
                            <hr />
                            <div className="table-responsive">
                                <TransactionServicesTable
                                    onRef={ref => (this.txnSrvTableRef = ref)}
                                    openSubmitSpecimenModal={this.openSubmitSpecimenModal}
                                    openViewLabelModal={this.openViewLabelModal}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.lab.loading,
        error: state.lab.error,
        userToken: state.auth.token,
        txnSrvList: state.lab.txnSrvList,
        marker: state.lab.markers,
        markerInventory : state.lab.markersInventory,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onViewTxnServicesList: (token, listType, startDate, endDate, params) => dispatch(actions.getTransactionLaboratoriesRequests(token, listType, startDate, endDate, params)),
        onClearLaboratoryList: (type) => dispatch(actions.clearLaboratoryList(type)),
        onPrintLaboratoryLabels: (token, txnID, startDate, endDate, spaceControl, request) => dispatch(actions.printLaboratoryLabels(token, txnID, startDate, endDate, spaceControl, request)),
        onViewMarkerCount: (token, startDate, endDate) => dispatch(actions.getMarker(token, startDate, endDate)),
        onViewMarkerInventory: (token) => dispatch(actions.getMarkerInventory(token)),
        onSaveFilmInventory: (token, filmValues, closeModal) => dispatch(actions.saveFilmInventory(token, filmValues, closeModal)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(TransactionServices));