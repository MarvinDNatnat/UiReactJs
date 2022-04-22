import React, { Component } from 'react'
import { connect } from 'react-redux';

import $ from 'jquery';

export class ItemsTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            function amountFormat(num) {
                return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }

            $('#itemsTable').DataTable({
                columns: [
                    { title: "Item Name", data: 'itemName' },
                    { title: "Description", data: 'itemDescription' },
                    { title: "Price", data: 'itemPrice' },
                    { title: "Category", data: 'itemCategory' },
                    { title: "Laboratory", data: 'itemLaboratory' },
                    { title: "Laboratory Procedure", data: 'itemLaboratoryProcedure' },
                    { title: "Taxable", data: 'taxable' },
                    { title: "Discountable", data: 'discountable' },
                    { title: "On Menu", data: 'onMenu' },
                    { title: "Status", data: 'active' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [2],
                        className: "text-right",
                        render: (cellData, type, row, meta) => {
                            return amountFormat(cellData);
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, row, meta) => {
                            let category = cellData;
                            var itmIndex = _this.props.categoryList.findIndex(itm => itm.key === cellData);
                            if (itmIndex >= 0) {
                                var item = _this.props.categoryList[itmIndex];
                                category = item.value;
                            }
                            return category;
                        }
                    },
                    {
                        targets: [4],
                        render: (cellData, type, row, meta) => {
                            let laboratory = cellData;
                            var itmIndex = _this.props.laboratoryList.findIndex(itm => itm.key === cellData);
                            if (itmIndex >= 0) {
                                var item = _this.props.laboratoryList[itmIndex];
                                laboratory = item.value;
                            }
                            return laboratory;
                        }
                    },
                    {
                        targets: [5],
                        render: (cellData, type, row, meta) => {
                            let procedure = cellData;
                            var itmIndex = _this.props.procedureList.findIndex(itm => itm.key === cellData);
                            if (itmIndex >= 0) {
                                var item = _this.props.procedureList[itmIndex];
                                procedure = item.value;
                            }
                            return procedure;
                        }
                    },
                    {
                        targets: [6, 7, 8, 9],
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            let status = '<i class="fas fa-times-circle text-danger" />';
                            if (cellData) {
                                status = '<i class="fas fa-check-circle text-success" />';
                            }
                            return status;
                        }
                    },
                    {
                        targets: [10],
                        orderable: false,
                        data: '',
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    }
                ]
            });

            $('#itemsTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#itemsTable').DataTable().row(row).data();
                _this.props.updateItemModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#itemsTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#itemsTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.itemList !== undefined &&
            nextProps.itemList.length >= 0 &&
            nextProps.itemList.length !== this.props.itemList.length) {
            this.reloadTableData(nextProps.itemList);
        }
        return false;
    }

    addItemToTable = (itemData) => {
        const table = $('#itemsTable').DataTable();
        table.row.add(itemData);
        table.draw();
    }

    updateItemToTable = (itemData, idx) => {
        const table = $('#itemsTable').DataTable();
        table.row(idx).data(itemData).draw();
    }

    render() {
        return (
            <table id="itemsTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemList: state.items.itemList,
        categoryList: state.items.itemCategories,
        laboratoryList: state.items.itemLaboratories,
        procedureList: state.items.laboratoryProcedures,
    }
};
export default connect(mapStateToProps)(ItemsTable);
