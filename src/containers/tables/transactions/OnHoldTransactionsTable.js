import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'src/store/actions/index';
import moment from 'moment';
import { padLeadingZeros, patientTableDisplay } from 'src/store/utility';

import $ from 'jquery';

export class OnHoldTransactionsTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#onHoldTransTable').DataTable({
                lengthMenu: [[3, 5, 10], [3, 5, 10]],
                order: [[1, "desc"]],
                columns: [
                    { title: "Action", data: null },
                    { title: "Date", data: 'transactionDate' },
                    { title: "SR#", data: 'id' },
                    { title: "Patient", data: 'patient' },
                    { title: "Company", data: 'biller' },
                    { title: "Items", data: 'transactionItems' },
                ],
                columnDefs: [
                    {
                        targets: [0],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark">Select</button>';
                        }
                    },
                    {
                        targets: [1],
                        render: (cellData, type, rowData, meta) => {
                            const date = moment(cellData).format('YYYYMMDDHHmmss');
                            return '<p hidden=true>' + date + '</p>' + moment(cellData).format('MMM-DD-YYYY hh:mm a');
                        }
                    },
                    {
                        targets: [2],
                        render: (cellData, type, rowData, meta) => {
                            let sr = padLeadingZeros(cellData);
                            if (rowData.branch !== undefined && rowData.branch !== null) {
                                sr = sr + '<br>' + rowData.branch.branchCode
                            }
                            return sr;
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, rowData, meta) => {
                            return patientTableDisplay(cellData, rowData.transactionType);
                        }
                    },
                    {
                        targets: [4],
                        render: (cellData, type, rowData, meta) => {
                            return cellData;
                        }
                    },
                    {
                        targets: [5],
                        render: (cellData, type, rowData, meta) => {
                            const items = cellData.map((itm) => {
                                let details = '----';
                                switch (itm.itemType) {
                                    case 'ITM':
                                        details = itm.itemDetails.itemDescription;
                                        break;

                                    case 'PCK':
                                        details = itm.itemDetails.packageDescription;
                                        break;

                                    default:
                                        break;
                                }

                                let qty = '';
                                if (itm.quantity > 1) {
                                    qty = "(" + itm.quantity + ") ";
                                }

                                return qty + details;

                            });
                            return items.join("<br>");
                        }
                    },
                ]
            });

            $('#onHoldTransTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#onHoldTransTable').DataTable().row(row).data();
                _this.props.loadTransaction(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#onHoldTransTable').DataTable().destroy(true);
        this.props.onClearOnHoldTransactionList();
    }

    reloadTableData = (data) => {
        const table = $('#onHoldTransTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.onHoldList !== undefined &&
            nextProps.onHoldList.length >= 0 &&
            nextProps.onHoldList.length !== this.props.onHoldList.length) {
            this.reloadTableData(nextProps.onHoldList);
        }
        return false;
    }

    render() {
        return (
            <table id="onHoldTransTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        onHoldList: state.trans.onHoldList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearOnHoldTransactionList: () => dispatch(actions.clearOnHoldTransactionList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OnHoldTransactionsTable)
