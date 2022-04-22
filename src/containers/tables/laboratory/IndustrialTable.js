import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';
import { padLeadingZeros, patientTableDisplay, getLaboratoryStatus, getDispatchType, getTransType } from 'src/store/utility'
import * as actions from 'src/store/actions/index';

export class IndustrialTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#industrialTable').DataTable({
                columns: [
                    { title: "Date", data: 'transaction.transactionDate' },
                    { title: "SR#", data: 'transaction.id' },
                    { title: "Patient", data: 'transaction.patient' },
                    { title: "Request", data: 'transactionLabRequests' },
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
                            const labRequest = [];

                            if (rowData.transaction.remarks !== undefined && rowData.transaction.remarks !== null) {
                                labRequest.push('<strong style="color:red">' + rowData.transaction.remarks + '</strong>');
                            }

                            cellData.forEach(lab => {
                                const itemDetails = lab.itemDetails;
                                const status = getLaboratoryStatus(lab);
                                labRequest.push(itemDetails.itemDescription.toUpperCase() + (status !== '' ? "<br>" + status : ''));
                            });

                            if (labRequest.length <= 0) {
                                labRequest.push("NO LABORATORY REQUEST");
                            }

                            let description = rowData.itemDetails.packageDescription;
                            if (description === undefined || description === null) {
                                return labRequest.join("<br><br>");
                            }

                            return [description].concat(labRequest).join("<br><br>");
                        }
                    },
                    {
                        targets: [4],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return `<button
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
                            // <button
                            //     type="button"
                            //     class="show btn btn-info btn-sm border border-dark"
                            //     data-toggle="tooltip"
                            //     data-placement="top"
                            //     title="Send Email"
                            // >
                            // <i class="far fa-envelope"></i>
                            // </button>
                        }
                    },
                ]
            });

            $('#industrialTable tbody').on('click', 'button.results', function () {
                var row = $(this).parents('tr');
                var rowData = $('#industrialTable').DataTable().row(row).data();
                _this.props.openIndustrialModal(rowData, row);
            });

            $('#industrialTable tbody').on('click', 'button.view', function () {
                var row = $(this).parents('tr');
                var rowData = $('#industrialTable').DataTable().row(row).data();
                _this.props.viewIndustrialModal(rowData, row);
            });

            // $('#industrialTable tbody').on('click', 'button.show', function () {
            //     var row = $(this).parents('tr');
            //     var rowData = $('#industrialTable').DataTable().row(row).data();
            //     _this.props.onShowEmailModal(rowData, row);
            // });

            $('#industrialTable tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#industrialTable').DataTable().row(row).data();
                _this.props.onPrintIndustrial(rowData.transaction.transactionid, rowData.id, false);
            });

        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#industrialTable').DataTable().destroy(true);
        this.props.onClearLaboratoryList('IND');
    }

    reloadTableData = (data) => {
        const table = $('#industrialTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.industrialList !== undefined &&
            nextProps.industrialList.length >= 0 &&
            nextProps.industrialList.length !== this.props.industrialList.length) {
            this.reloadTableData(nextProps.industrialList);
        }
        return false;
    }

    addIndustrialToTable = (industrialData) => {
        const table = $('#industrialTable').DataTable();
        table.row.add(industrialData);
        table.draw();
    }

    updateIndustrialToTable = (industrialData, idx) => {
        const table = $('#industrialTable').DataTable();
        table.row(idx).data(industrialData).draw();
    }

    render() {
        return (
            <table id="industrialTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        industrialList: state.lab.industrialList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearLaboratoryList: (type) => dispatch(actions.clearLaboratoryList(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndustrialTable)
