import React, { Component } from 'react';
import { twoFixedAmt } from 'src/store/utility'
import $ from 'jquery';
export class SOPTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        $(document).ready(function () {
            $('#sopTable').DataTable({
                order: [[1, "asc"]],
                filter: false,
                ordering: false,
                paging: false,
                info: false,
                columns: [
                    { title: "Date/Time", data: 'transactionDate' },
                    { title: "SR#", data: 'receipt' },
                    { title: "Full Name", data: 'fullname' },
                    { title: "Procedure", data: 'transactionLabRequests' },
                    { title: "Total", data: 'transactionLabRequests' },
                ],
                columnDefs: [
                    {
                        targets: [3],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            let products = `<div className='container'>`;
                            cellData.forEach(item => {
                                if (item.referenceLab != null) {
                                    let itm = `<div className='row'>`;
                                    itm += `<div className='col-md-6 col-6'>`;
                                    itm += item.itemDetails.itemDescription;
                                    itm += `</div><div className='col-md-6 col-6 text-right'>`;
                                    if (item.molePriceItem !== undefined && item.molePriceItem != null) {
                                        itm += twoFixedAmt(item.molePriceItem);
                                    }
                                    itm += `</div></div>`;
                                    products += itm;
                                }
                            });
                            products += `</div>`;
                            return products;
                        }
                    },
                    {
                        targets: [4],
                        orderable: false,
                        className: "text-right",
                        render: (cellData, type, row, meta) => {
                            let subTotal = 0;
                            cellData.forEach(item => {
                                if (item.molePriceItem !== undefined && item.molePriceItem != null) {
                                    subTotal += item.molePriceItem
                                }
                            });
                            return twoFixedAmt(subTotal);
                        }
                    },
                ]
            });
        });
    }

    componentWillUnmount() {
        $('#sopTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#sopTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    addSOAToTable = (sopData) => {
        const table = $('#ecgTable').DataTable();
        table.row.add(sopData);
        table.draw();
    }

    updateSoaToTable = (sopData, idx) => {
        const table = $('#ecgTable').DataTable();
        table.row(idx).data(sopData).draw();
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
            <table id="sopTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

export default SOPTable;