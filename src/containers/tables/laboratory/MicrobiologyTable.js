import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import $ from 'jquery';
import { padLeadingZeros, patientTableDisplay, getDispatchType, getTransType, getLaboratoryStatus } from 'src/store/utility'

export class MicrobiologyTable extends Component {

    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {

            $('#Microbiology').DataTable({
                columns: [
                    { title: "Date", data: 'transaction.transactionDate' },
                    { title: "SR#", data: 'transaction.id' },
                    { title: "Patient", data: 'transaction.patient' },
                    { title: "Request", data: 'itemDetails.itemDescription' },
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
                        }
                    },
                ],
            });

            $('#Microbiology tbody').on('click', 'button.results', function () {
                var row = $(this).parents('tr');
                var rowData = $('#Microbiology').DataTable().row(row).data();
                _this.props.openMicrobiologyModal(rowData, row);
            });

            $('#Microbiology tbody').on('click', 'button.view', function () {
                var row = $(this).parents('tr');
                var rowData = $('#Microbiology').DataTable().row(row).data();
                _this.props.viewMicrobiologyModal(rowData, row);
            });

            $('#Microbiology tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#Microbiology').DataTable().row(row).data();
                _this.props.onPrintMicrobiology(rowData.transaction.transactionid, rowData.id, rowData.status, false);
            });
        });

    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#Microbiology').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#Microbiology').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.microbiologyList !== undefined &&
            nextProps.microbiologyList.length >= 0 &&
            nextProps.microbiologyList.length !== this.props.microbiologyList.length) {
            this.reloadTableData(nextProps.microbiologyList);
        }
        return false;
    }

    addToxicologyToTable = (MicrobiologyData) => {
        const table = $('#Microbiology').DataTable();
        table.row.add(MicrobiologyData);
        table.draw();
    }

    updateToxicologyToTable = (MicrobiologyData, idx) => {
        const table = $('#Microbiology').DataTable();
        table.row(idx).data(MicrobiologyData).draw();
    }

    render() {
        return (
            <table id="Microbiology" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        microbiologyList: state.lab.microbiologyList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MicrobiologyTable)