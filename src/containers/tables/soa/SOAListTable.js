import React, { Component } from 'react'

import { twoFixedAmt } from 'src/store/utility'

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
                    { title: "SOA No.", data: 'soaNumber' },
                    { title: "Date", data: 'statementDate' },
                    { title: "Covered Date", data: null },
                    { title: "# of Txn", data: 'transactions' },
                    { title: "Total", data: 'soaAmount' },
                ],
                columnDefs: [
                    {
                        targets: [2],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            const covered = row.coverageDateFrom + ' to ' + row.coverageDateTo
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
                                if (txn.soaStatus) {
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
        if (nextProps !== undefined && nextProps.soaList !== undefined &&
            nextProps.soaList.length >= 0 &&
            nextProps.soaList.length !== this.props.soaList.length) {
            this.reloadTableData(nextProps.soaList);
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
