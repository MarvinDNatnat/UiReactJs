import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { padLeadingZeros, patientTableDisplay, getDispatchType, getTransType, getLaboratoryStatus, patientDisplay } from 'src/store/utility';
import * as actions from 'src/store/actions/index';

import $ from 'jquery';

export class SerologyTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#serologyTable').DataTable({
                columns: [
                    { title: "Date", data: 'transaction.transactionDate' },
                    { title: "SR#", data: 'transaction.id' },
                    { title: "Patient", data: 'transaction.patient' },
                    { title: "Request", data: 'itemDetails.itemDescription' },
                    { title: "Action", data: 'itemDetails.itemDescription' }
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
                            if (rowData.transaction.branch !== undefined && rowData.transaction.branch !== null) {
                                sr = sr + '<br>' + rowData.transaction.branch.branchCode
                            }
                            if (rowData.transaction.transactionType !== undefined && rowData.transaction.transactionType !== null) {
                                sr = sr + '<br>' + getTransType(rowData.transaction.transactionType)
                            }
                            if (rowData.transaction.dispatch !== undefined && rowData.transaction.dispatch !== null) {
                                sr = sr + '<br>' + getDispatchType(rowData.transaction.dispatch)
                            }
                            return sr;
                        }
                    },
                    {
                        targets: [2],
                        render: (cellData, type, rowData, meta) => {
                            let patient = patientTableDisplay(cellData);
                            if (rowData.transaction.patient.corporate !== null && rowData.transaction.patient.corporate !== '') {
                                patient += '<br>' + rowData.transaction.patient.corporate.companyName;
                            }
                            return patient;
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, rowData, meta) => {
                            let remarks = '';
                            if (rowData.transaction.remarks !== undefined && rowData.transaction.remarks !== null) {
                                remarks = '<strong style="color:red">' + rowData.transaction.remarks + '</strong><br>';
                            }

                            let request = remarks + cellData;

                            const itemDetails = rowData.itemDetails;
                            const serviceRequest = itemDetails.serviceRequest;

                            const services = [];
                            serviceRequest.map((svr) => {
                                services.push(" * " + svr.requestName);
                                return svr;
                            })

                            if (services.length > 0) {
                                request += "<br>" + services.join("<br>");
                            }

                            return request + '<br>' + getLaboratoryStatus(rowData);
                        }
                    },
                    {
                        targets: [4],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            let actions = `<button
                            type="button"
                            class="results btn btn-primary btn-sm border border-dark"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Input Results"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button
                                type="button"
                                class="view btn btn-warning btn-sm border border-dark"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="View Results"
                            >
                                <i class="far fa-eye"></i>
                            </button>
                            <button
                                type="button"
                                class="print btn btn-secondary btn-sm border border-dark"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Print Report"
                            >
                                <i class="fas fa-print"></i>
                            </button>
                            `;
                            if (row.itemDetails.serviceRequest[0].laboratoryRequest === "ANTIGEN") {
                                actions = `<button
                            type="button"
                            class="results btn btn-primary btn-sm border border-dark"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Input Results"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button
                                type="button"
                                class="view btn btn-warning btn-sm border border-dark"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="View Results"
                            >
                                <i class="far fa-eye"></i>
                            </button>
                            <button
                                type="button"
                                class="print btn btn-secondary btn-sm border border-dark"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Print Report"
                            >
                                <i class="fas fa-print"></i>
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
                            `;
                            }

                            return actions;
                        }
                    },
                ]
            });

            $('#serologyTable tbody').on('click', 'button.results', function () {

                var row = $(this).parents('tr');
                var rowData = $('#serologyTable').DataTable().row(row).data();
                _this.props.openSerologyModal(rowData, row);
            });

            $('#serologyTable tbody').on('click', 'button.view', function () {
                var row = $(this).parents('tr');
                var rowData = $('#serologyTable').DataTable().row(row).data();
                _this.props.viewSerologyModal(rowData, row);
            });

            $('#serologyTable tbody').on('click', 'button.show', function () {
                var row = $(this).parents('tr');
                var rowData = $('#serologyTable').DataTable().row(row).data();
                _this.props.onShowEmailModal(rowData, row);
            });


            $('#serologyTable tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#serologyTable').DataTable().row(row).data();
                _this.props.onPrintSerology(rowData.transaction.transactionid, rowData.id, rowData.status, false, patientDisplay(rowData.transaction.patient));
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#serologyTable').DataTable().destroy(true);
        this.props.onClearLaboratoryList('SE');
    }

    reloadTableData = (data) => {
        const table = $('#serologyTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.serologyList !== undefined &&
            nextProps.serologyList.length >= 0 &&
            nextProps.serologyList.length !== this.props.serologyList.length) {
            this.reloadTableData(nextProps.serologyList);
        }
        return false;
    }

    addSerologyToTable = (serologyData) => {
        const table = $('#serologyTable').DataTable();
        table.row.add(serologyData);
        table.draw();
    }

    updateSerologyToTable = (serologyData, idx) => {
        const table = $('#serologyTable').DataTable();
        table.row(idx).data(serologyData).draw();
    }

    render() {
        return (
            <table id="serologyTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        serologyList: state.lab.serologyList,
        referenceLaboratoryList: state.refLab.referenceLaboratoryList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearLaboratoryList: (type) => dispatch(actions.clearLaboratoryList(type)),
        onShowReferenceLaboratory: (token) => dispatch(actions.getAllReferenceLaboratory(token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SerologyTable)
