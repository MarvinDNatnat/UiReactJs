import React, { Component } from 'react'

import { connect } from 'react-redux';

import $ from 'jquery';

export class BranchesTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#branchesTable').DataTable({
                columns: [
                    { title: "Branch Code", data: 'branchCode' },
                    { title: "Branch Name", data: 'branchName' },
                    { title: "Address", data: 'address' },
                    { title: "Contact Number", data: 'contactNumber' },
                    { title: "Status", data: 'active' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [4],
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
                        targets: [5],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    }
                ],
            });

            $('#branchesTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#branchesTable').DataTable().row(row).data();
                _this.props.updateBranchModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#branchesTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#branchesTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.branchList !== undefined &&
            nextProps.branchList.length >= 0 &&
            nextProps.branchList.length !== this.props.branchList.length) {
            this.reloadTableData(nextProps.branchList);
        }
        return false;
    }

    addBranchToTable = (branchData) => {
        const table = $('#branchesTable').DataTable();
        table.row.add(branchData);
        table.draw();
    }

    updateBranchToTable = (branchData, idx) => {
        const table = $('#branchesTable').DataTable();
        table.row(idx).data(branchData).draw();
    }

    render() {
        return (
            <table id="branchesTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branchList: state.bran.branchList,
    }
};

export default connect(mapStateToProps)(BranchesTable)
