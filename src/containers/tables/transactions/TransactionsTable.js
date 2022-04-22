import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from 'src/store/actions/index';
import $ from 'jquery';
import { padLeadingZeros, getTransStatus, patientTableDisplay } from 'src/store/utility'

export class TransactionsTable extends Component {

    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {

            $('#transTable').DataTable({
                columns: [
                    { title: "Date", data: 'transactionDate' },
                    { title: "SR#", data: 'id' },
                    { title: "Patient", data: 'patient' },
                    { title: "Status", data: 'status' },
                    { title: "Biller", data: 'biller' },
                    { title: "Cashier", data: 'cashier' },
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
                            return sr;
                        }
                    },
                    {
                        targets: [2],
                        render: (cellData, type, rowData, meta) => {
                            let patient = patientTableDisplay(cellData, rowData.transactionType, rowData.remarks);
                            if (rowData.patient.corporate !== null || rowData.patient.corporate === '') {
                                patient += "</br>" + rowData.patient.corporate.companyName;
                            }
                            return patient;
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData) => {
                            return getTransStatus(cellData);
                        }
                    },
                    {
                        targets: [4],
                        render: (cellData) => {
                            let biller = '';
                            if (cellData !== null) {
                                biller = cellData;
                            } else biller = '-'
                            return biller
                        }
                    },
                    {
                        targets: [5],
                        render: (cellData) => {
                            return cellData.username
                        }
                    },
                    {
                        targets: [6],
                        orderable: false,
                        data: '',
                        render: () => {
                            return `<button
                                        type="button"
                                        class="view btn btn-warning btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View / Edit Transaction"
                                    >
                                        <i class="far fa-eye"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="print btn btn-secondary btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Print Receipt"
                                    >
                                        <i class="fas fa-print"></i>
                                    </button>`;
                        }
                    },
                ],
            });

            $('#transTable tbody').on('click', 'button.view', function () {
                var row = $(this).parents('tr');
                var rowData = $('#transTable').DataTable().row(row).data();
                _this.props.transSummaryModal(rowData, row);
            });

            $('#transTable tbody').on('click', 'button.print', function () {
                var row = $(this).parents('tr');
                var rowData = $('#transTable').DataTable().row(row).data();
                _this.printReceipt(rowData.transactionid);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#transTable').DataTable().destroy(true);
        this.props.onClearTransactionList();
    }

    reloadTableData = (data) => {
        const table = $('#transTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.transactionList !== undefined &&
            nextProps.transactionList.length >= 0 &&
            nextProps.transactionList.length !== this.props.transactionList.length) {
            this.reloadTableData(nextProps.transactionList);
        }
        return false;
    }

    printReceipt = (transactionid) => {
        this.props.onPrintReceipt(this.props.userToken, transactionid)
    }

    render() {
        return (
            <table id="transTable" className="table table-bordered table-striped display nowrap">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transactionList: state.trans.transactionList,
        userToken: state.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPrintReceipt: (token, transactionId) => dispatch(actions.printReceipt(token, transactionId)),
        onClearTransactionList: () => dispatch(actions.clearTransactionList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable)