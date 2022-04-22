import React, { Component } from 'react'
import { connect } from 'react-redux';

import $ from 'jquery';

export class PackagesTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            function amountFormat(num) {
                return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }

            $('#packagesTable').DataTable({
                columns: [
                    { title: "Package Name", data: 'packageName' },
                    { title: "Description", data: 'packageDescription' },
                    { title: "Price", data: 'packagePrice' },
                    { title: "Type", data: 'packageType' },
                    { title: "Items", data: 'packageItems' },
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
                            let pckType = cellData;
                            var itmIndex = _this.props.packageTypes.findIndex(itm => itm.key === cellData);
                            if (itmIndex >= 0) {
                                var item = _this.props.packageTypes[itmIndex];
                                pckType = item.value;
                            }
                            return pckType;
                        }
                    },
                    {
                        targets: [4],
                        render: (cellData, type, row, meta) => {
                            const items = cellData
                                .sort((a, b) => a.itemName.toUpperCase() > b.itemName.toUpperCase() ? 1 : -1)
                                .map((itm) => {
                                    return itm.itemName + '(' + amountFormat(itm.itemPrice) + ')'
                                }).join(', ');
                            return items;
                        }
                    },
                    {
                        targets: [5, 6, 7, 8],
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
                        targets: [9],
                        orderable: false,
                        data: '',
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    }
                ]
            });

            $('#packagesTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#packagesTable').DataTable().row(row).data();
                _this.props.updatePackageModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#packagesTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#packagesTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.packageList !== undefined &&
            nextProps.packageList.length >= 0 &&
            nextProps.packageList.length !== this.props.packageList.length) {
            this.reloadTableData(nextProps.packageList);
        }
        return false;
    }

    addPackageToTable = (itemData) => {
        const table = $('#packagesTable').DataTable();
        table.row.add(itemData);
        table.draw();
    }

    updatePackageToTable = (itemData, idx) => {
        const table = $('#packagesTable').DataTable();
        table.row(idx).data(itemData).draw();
    }

    render() {
        return (
            <table id="packagesTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        packageList: state.packs.packageList,
        packageTypes: state.packs.packageTypes,
    }
};

export default connect(mapStateToProps)(PackagesTable)
