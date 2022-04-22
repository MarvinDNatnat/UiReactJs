import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';
import { padLeadingZeros, patientTableDisplay, getLaboratoryStatus, getDispatchType } from 'src/store/utility'

export class XrayTable extends Component {

    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {

            $('#xrayTable').DataTable({
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
                                        title="Edit Radiographic Report"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="view btn btn-warning btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View Radiographic Report"
                                    >
                                    <i class="far fa-eye"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="print btn btn-secondary btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Print Radiographic Report"
                                    >
                                        <i class="fas fa-print"></i>
                                    </button>`;
                        }
                    },
                ],
                // rowCallback: function(row, data){
                //     if (data.submitted === false) {
                //         $('td', row).css('background-color', '#fc7c7c')
                //     }
                // }
            });

            $('#xrayTable tbody').on('click', 'button.edit', function () {
                var row = $(this).parents('tr');
                var rowData = $('#xrayTable').DataTable().row(row).data();
                _this.props.openXrayModal(rowData, row);
            });

            $('#xrayTable tbody').on('click', 'button.view', function () {
                var row = $(this).parents('tr');
                var rowData = $('#xrayTable').DataTable().row(row).data();
                _this.props.viewXrayModal(rowData, row);
            });

            $('#xrayTable tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#xrayTable').DataTable().row(row).data();
                _this.props.onPrintXray(rowData.transaction.transactionid, rowData.id, rowData.status, false);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#xrayTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#xrayTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.xrayList !== undefined &&
            nextProps.xrayList.length >= 0 &&
            nextProps.xrayList.length !== this.props.xrayList.length) {
            this.reloadTableData(nextProps.xrayList);
        }
        return false;
    }

    updateXrayToTable = (xrayData, idx) => {
        const table = $('#xrayTable').DataTable();
        table.row(idx).data(xrayData).draw();
    }

    render() {
        return (
            <table id="xrayTable" className="table table-bordered table-striped display nowrap">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        xrayList: state.srv.xrayList,
        userToken: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(XrayTable)