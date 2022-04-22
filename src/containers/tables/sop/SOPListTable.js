import React, { Component } from 'react'

import { twoFixedAmt } from 'src/store/utility'
import moment from 'moment';
import $ from 'jquery';
export class SOAListTable extends Component {
    componentDidMount() {
        $(document).ready(function () {
            $('#soaListTable').DataTable({
                order: [[1, "asc"]],
                filter: false,
                ordering: false,
                paging: false,
                info: false,
                columns: [
                    { title: "SOA No.", data: 'sopNumber' },
                    { title: "Date", data: null },
                    { title: "Covered Date", data: null },
                    { title: "# of Txn", data: 'transactions' },
                    { title: "Total", data: 'sopAmount' },
                ],
                columnDefs: [
                    {
                        targets: [1],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            const date = moment(row.statementDate).format('YYYY-MM-DD')
                            return date;
                        }
                    },
                    {
                        targets: [2],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            const covered = moment(row.coverageDateFrom).format('YYYY-MM-DD') + ' to ' + moment(row.coverageDateFrom).format('YYYY-MM-DD')
                            return covered;
                        }
                    },
                    {
                        targets: [3],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            let txnPaid = 0;
                            cellData.map(txn => {
                                if (txn.sopStatus) {
                                    txnPaid++
                                } 
                                return 0;
                            }) 
                            return txnPaid;
                        }
                    },
                    {
                        targets: [4],
                        orderable: false,
                        className: "text-right",
                        render: (cellData, type, row, meta) => {
                            return twoFixedAmt(cellData);
                        }
                    },
                ]
            });
        });
    }

    componentWillUnmount() {
        $('#soaListTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#soaListTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.sopList !== undefined &&
            nextProps.sopList.length >= 0 &&
            nextProps.sopList.length !== this.props.sopList.length) {
            this.reloadTableData(nextProps.sopList);
        }
        return false;
    }
    render() {
        return (
            <table id="soaListTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

export default SOAListTable
