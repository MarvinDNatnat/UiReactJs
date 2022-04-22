import React, { Component } from 'react'
import { connect } from 'react-redux';

import $ from 'jquery';

export class ReferenceLaboratoryTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            function amountFormat(num) {
                return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }
           
            $('#referenceLaboratoryTable').DataTable({
                columns: [
                    { title: "Reference Lab", data: 'name' },
                    { title: "Items", data: 'collectionItems' },
                    { title: "Status", data: 'isActive' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [1],
                        render: (cellData, type, row, meta) => {
                            const items = row.collectionItems
                                .sort((a, b) => a.referenceLabItems.itemDescription.toUpperCase() > b.referenceLabItems.itemDescription.toUpperCase() ? 1 : -1)
                                .map((itm) => {
                                    return itm.referenceLabItems.itemDescription +  '\n\nQuest Price(' + amountFormat(itm.originalPrice) + ') \n  ' + 'Molecular Price(' + amountFormat(itm.molePrice) + ')'
                                }).join(', \n \n \n');
                            return items;
                        }
                    },
                    {
                        targets: [2],
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            let status = '<i class="fas fa-times-circle text-danger" />';
                            if (row.isActive) {
                                status = '<i class="fas fa-check-circle text-success" />';
                            }
                            return status;
                        }
                    },
                    {
                        targets: [3],
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    },
                ]
            });

            $('#referenceLaboratoryTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#referenceLaboratoryTable').DataTable().row(row).data();
                _this.props.updateReferenceModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#referenceLaboratoryTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#referenceLaboratoryTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.referenceLaboratoryList !== undefined &&
            nextProps.referenceLaboratoryList.length >= 0 &&
            nextProps.referenceLaboratoryList.length !== this.props.referenceLaboratoryList.length) {
            this.reloadTableData(nextProps.referenceLaboratoryList);
        }
        return false;
    }

    addPackageToTable = (itemData) => {
        const table = $('#referenceLaboratoryTable').DataTable();
        table.row.add(itemData);
        table.draw();
    }

    updatePackageToTable = (itemData, idx) => {
        const table = $('#referenceLaboratoryTable').DataTable();
        table.row(idx).data(itemData).draw();
    }

    render() {
        return (
            <table id="referenceLaboratoryTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        referenceLaboratoryList: state.refLab.referenceLaboratoryList,
        packageTypes: state.packs.packageTypes,
    }
};

export default connect(mapStateToProps)(ReferenceLaboratoryTable)
