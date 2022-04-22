import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';
import { padLeadingZeros, getLaboratoryStatus, patientTableDisplay, getDispatchType } from 'src/store/utility'

export class PhysicalExamTable extends Component {

    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {

            $('#physicalExamTable').DataTable({
                columns: [
                    { title: "Date", data: 'transaction.transactionDate' },
                    { title: "SR#", data: 'transaction.id' },
                    { title: "Patient", data: 'transaction.patient' },
                    { title: "Remarks", data: 'submitted' },
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
                            return patientTableDisplay(cellData, rowData.transaction.transactionType);
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, rowData, meta) => {
                            let remarks = '';
                            if (rowData.transaction.remarks !== undefined && rowData.transaction.remarks !== null) {
                                remarks = '<strong style="color:red">' + rowData.transaction.remarks + '</strong><br>';
                            }

                            let status = getLaboratoryStatus(rowData);
                            return remarks + status
                        }
                    },
                    {
                        targets: [4],
                        orderable: false,
                        data: '',
                        render: () => {
                            return `<button
                                        type="button"
                                        class="mhvs btn btn-primary btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Medical History &amp; Vital Signs"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="view btn btn-warning btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View Physical Examination Report"
                                    >
                                    <i class="far fa-eye"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="print btn btn-secondary btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Print Physical Examination Report (with header)"
                                    >
                                        <i class="fas fa-print"></i>
                                    </button>
                                    `;
                        }
                    },
                ],
                // createdRow: function(row, data, dataIndex){
                //     if (data.submitted === false) {
                //         $('td', row).css('background-color', '#fc7c7c')
                //     }
                // }
            });

            $('#physicalExamTable tbody').on('click', 'button.mhvs', function () {
                var row = $(this).parents('tr');
                var rowData = $('#physicalExamTable').DataTable().row(row).data();
                _this.props.openPhysicalExamModal(rowData, row);
            });

            $('#physicalExamTable tbody').on('click', 'button.view', function () {
                var row = $(this).parents('tr');
                var rowData = $('#physicalExamTable').DataTable().row(row).data();
                _this.props.viewPhysicalExamModal(rowData);
            });

            $('#physicalExamTable tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#physicalExamTable').DataTable().row(row).data();
                _this.props.onPrintPhysicalExam(rowData.transaction.transactionid, rowData.id, rowData.status, false);
            });
        });

    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#physicalExamTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#physicalExamTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.peList !== undefined &&
            nextProps.peList.length >= 0 &&
            nextProps.peList.length !== this.props.peList.length) {
            this.reloadTableData(nextProps.peList);
        }
        return false;
    }

    updatePhysicalExamToTable = (peData, idx) => {
        const table = $('#physicalExamTable').DataTable();
        table.row(idx).data(peData).draw();
    }

    render() {
        return (
            <table id="physicalExamTable" className="table table-bordered table-striped display nowrap">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        peList: state.srv.peList,
        userToken: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(PhysicalExamTable)