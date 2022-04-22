import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { padLeadingZeros, patientTableDisplay, getLaboratoryStatus, getDispatchType } from 'src/store/utility'
import $ from 'jquery';

export class UltrasoundTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#ultrasoundTable').DataTable({
                columns: [
                    { title: "Date", data: 'transaction.transactionDate' },
                    { title: "SR#", data: 'transaction.id' },
                    { title: "Patient", data: 'transaction.patient' },
                    { title: "Request", data: 'itemDetails' },
                    { title: "Remarks", data: 'xray.remarks' },
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
                            const labreq = cellData.itemDescription
                            const status = getLaboratoryStatus(rowData)

                            return remarks + labreq + "<br>" + status
                        }
                    },
                    {
                        targets: [4],
                        render: (cellData) => {
                            let remarks = '-';
                            if (cellData !== undefined) {
                                if (cellData === true) {
                                    remarks = 'For Recommendation'
                                } else {
                                    remarks = 'Normal'
                                }
                            }
                            return remarks;
                        }
                    },
                    {
                        targets: [5],
                        orderable: false,
                        data: '',
                        render: () => {
                            return `<button
                                        type="button"
                                        class="edit btn btn-primary btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit Ultrasound Report"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="view btn btn-warning btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View Ultrasound Report"
                                    >
                                    <i class="far fa-eye"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="print btn btn-secondary btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Print Ultrasound Report"
                                    >
                                        <i class="fas fa-print"></i>
                                    </button>`;
                        }
                    },
                ]
            });

            $('#ultrasoundTable tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#ultrasoundTable').DataTable().row(row).data();
                _this.props.onPrintUltrasound(rowData.transaction.transactionid, rowData.id, rowData.status, false);
            });

            $('#ultrasoundTable tbody').on('click', 'button.view', function () {
                var row = $(this).parents('tr');
                var rowData = $('#ultrasoundTable').DataTable().row(row).data();
                _this.props.onViewUltrasound(rowData, row);
            });

            $('#ultrasoundTable tbody').on('click', 'button.edit', function () {
                var row = $(this).parents('tr');
                var rowData = $('#ultrasoundTable').DataTable().row(row).data();
                _this.props.openUltrasoundModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#ultrasoundTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#ultrasoundTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.usList !== undefined &&
            nextProps.usList.length >= 0 &&
            nextProps.usList.length !== this.props.usList.length) {
            this.reloadTableData(nextProps.usList);
        }
        return false;
    }

    addUltrasoundToTable = (ultrasoundData) => {
        const table = $('#ultrasoundTable').DataTable();
        table.row.add(ultrasoundData);
        table.draw();
    }

    updateUltrasoundToTable = (ultrasoundData, idx) => {
        const table = $('#ultrasoundTable').DataTable();
        table.row(idx).data(ultrasoundData).draw();
    }

    render() {
        return (
            <table id="ultrasoundTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usList: state.srv.usList,
    }
};

export default connect(mapStateToProps)(UltrasoundTable)
