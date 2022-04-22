import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { padLeadingZeros, patientTableDisplay, getLaboratoryStatus, getDispatchType, getTransType } from 'src/store/utility';
import * as actions from 'src/store/actions/index';

import $ from 'jquery';

class NurseTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#nurseTable').DataTable({
                columns: [
                    { title: "Date", data: 'transactionDate' },
                    { title: "SR#", data: 'id' },
                    { title: "Patient", data: 'patient' },
                    { title: "Request", data: 'transactionItems' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [0],
                        render: (cellData, type, rowData, meta) => {
                            const date = moment(cellData).format('YYYYMMDDHHmmss');
                            return '<p hidden=true>' + date + '</p>' + moment(cellData).format('MMM-DD-YYYY hh:mm a');
                        }
                    },
                    {
                        targets: [1],
                        render: (cellData, type, rowData, meta) => {
                            let sr = padLeadingZeros(cellData);
                            if (rowData.branch !== undefined && rowData.branch !== null) {
                                sr = sr + '<br>' + rowData.branch.branchCode
                            }
                            if (rowData.transactionType !== undefined && rowData.transactionType !== null) {
                                sr = sr + '<br>' + getTransType(rowData.transactionType)
                            }
                            if (rowData.dispatch !== undefined && rowData.dispatch !== null) {
                                sr = sr + '<br>' + getDispatchType(rowData.dispatch)
                            }
                            return sr;
                        }
                    },
                    {
                        targets: [2],
                        render: (cellData, type, rowData, meta) => {
                            let patient = patientTableDisplay(cellData);
                            if (rowData.biller !== null && rowData.biller !== '') {
                                patient += '<br>' + rowData.biller;
                            } else if (rowData.patient.corporate !== null && rowData.patient.corporate !== '') {
                                patient += '<br>' + rowData.patient.corporate.companyName;
                            } else if (rowData.referral !== null && rowData.referral !== '') {
                                patient += '<br>' + rowData.referral.referral;
                            } else {
                                patient += '<br>WALK-IN';
                            }

                            return patient;
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, rowData, meta) => {
                            let labRequest = "";
                            if (cellData !== undefined) {
                                cellData.forEach(itm => {
                                    if (itm.itemLaboratories !== undefined) {
                                        if (itm.itemLaboratories.length > 0) {
                                            const itemDetails = itm.itemDetails;
                                            if (itm.itemType === "ITM") {
                                                const status = getLaboratoryStatus(itm.itemLaboratories[0]);
                                                labRequest += itemDetails.itemDescription.toUpperCase() + "<br>" + status;
                                                labRequest += "<br><br>";
                                            } else if (itm.itemType === "PCK") {
                                                let classType = '<strong style="color:red">Unclassified</strong>'
                                                switch (itm.classification) {
                                                    case 'A':
                                                        classType = '<strong style="color:green">Class A</strong>'
                                                        break;

                                                    case 'B':
                                                        classType = '<strong style="color:green">Class B</strong>'
                                                        break;

                                                    case 'C':
                                                        classType = '<strong style="color:red">Class C</strong>'
                                                        break;

                                                    case 'D':
                                                        classType = '<strong style="color:red">Class D</strong>'
                                                        break;

                                                    case 'E':
                                                        classType = '<strong style="color:red">Class E</strong>'
                                                        break;

                                                    case 'P':
                                                        classType = '<strong style="color:red">Pending</strong>'
                                                        break;

                                                    default:
                                                        break;
                                                }

                                                labRequest = `<button
                                                        type="button"
                                                        class="classify btn btn-success btn-sm border border-dark"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        title="Classification"
                                                        onclick=
                                                    >
                                                        <i class="fas fa-eye"></i>
                                                    </button> 
                                                    <button
                                                        type="button"
                                                        class="quality btn btn-success btn-sm border border-dark"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        title="Quest Quality"
                                                    >
                                                        <i class="fas fa-certificate"></i>
                                                    </button>
                                                    &nbsp;`;
                                                labRequest += classType + "<br>";
                                                labRequest += itemDetails.packageDescription.toUpperCase();

                                                itm.itemLaboratories.forEach(lab => {
                                                    const item = lab.itemDetails;
                                                    const status = getLaboratoryStatus(lab);
                                                    labRequest += "<br> *" + item.itemDescription.toUpperCase() + "<br><b>" + status + '</b><br>';
                                                })

                                                labRequest += "<br>";
                                            }
                                        }
                                    }
                                });

                            }
                            return labRequest;
                        }
                    },
                    {
                        targets: [4],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return `<button
                                        type="button"
                                        class="specimen btn btn-danger btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Submit Specimen/Requirement"
                                    >
                                        <i class="fas fa-syringe"></i>
                                    </button>
                                    <button
                                    type="button"
                                        class="show btn btn-info btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Send Email"
                                    >
                                        <i class="far fa-envelope"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="print btn btn-secondary btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Print Results"
                                    >
                                        <i class="fas fa-print"></i>
                                    </button>

                                    <button
                                        type="button"
                                        class="print1 btn btn-warning btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Print Results"
                                    >
                                        <i class="fas fa-file-pdf"></i>
                                    </button>
                                    `;
                        }
                    },
                ]
            });

            $('#nurseTable tbody').on('click', 'button.specimen', function () {
                var row = $(this).parents('tr');
                var rowData = $('#nurseTable').DataTable().row(row).data();
                _this.props.openSubmitSpecimenModal(rowData, row);
            });

            $('#nurseTable tbody').on('click', 'button.classify', function () {
                var row = $(this).parents('tr');
                var rowData = $('#nurseTable').DataTable().row(row).data();
                _this.props.openClassifinationModal(rowData, row);
            });

            $('#nurseTable tbody').on('click', 'button.quality', function () {
                var row = $(this).parents('tr');
                var rowData = $('#nurseTable').DataTable().row(row).data();
                _this.props.openQualityControlModal(rowData, row);
            });

            // $('#nurseTable tbody').on('click', 'button.cetificate', function () {
            //     var row = $(this).parents('tr');
            //     var rowData = $('#nurseTable').DataTable().row(row).data();
            //     _this.props.onPrintMedical(rowData, false);
            // });

            $('#nurseTable tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#nurseTable').DataTable().row(row).data();
                _this.props.onPrintResults(rowData, false);
            });

            $('#nurseTable tbody').on('click', 'button.print1', function () {
                var row = $(this).parents('tr');
                var rowData = $('#nurseTable').DataTable().row(row).data();
                _this.props.onPrintResultsWithHeader(rowData, true);
            });

            $('#nurseTable tbody').on('click', 'button.show', function () {
                var row = $(this).parents('tr');
                var rowData = $('#nurseTable').DataTable().row(row).data();
                _this.props.onShowEmailModal(rowData, row);
            });

        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#nurseTable').DataTable().destroy(true);
        this.props.onClearLaboratoryList('NRS');
        this.props.onClearPendingTransactionList();
    }

    reloadTableData = (data) => {
        const table = $('#nurseTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.nurseList !== undefined &&
            nextProps.nurseList.length > 0 &&
            nextProps.nurseList.length !== this.props.nurseList.length) {
            this.reloadTableData(nextProps.nurseList);
        } else if (nextProps !== undefined && nextProps.pendingList !== undefined &&
            nextProps.pendingList.length > 0 &&
            nextProps.pendingList.length !== this.props.pendingList.length) {
            this.reloadTableData(nextProps.pendingList);
        }
        return false;
    }

    addNurseToTable = (nurseData) => {
        const table = $('#nurseTable').DataTable();
        table.row.add(nurseData);
        table.draw();
    }

    updateNurseToTable = (nurseData, idx) => {
        const table = $('#nurseTable').DataTable();
        table.row(idx).data(nurseData).draw();
    }

    render() {
        return (
            <table id="nurseTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nurseList: state.lab.nurseList,
        pendingList: state.trans.pendingList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearLaboratoryList: (type) => dispatch(actions.clearLaboratoryList(type)),
        onClearPendingTransactionList: () => dispatch(actions.clearPendingTransactionList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NurseTable);