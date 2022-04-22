import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';

export class UserRolesTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#userRolesTable').DataTable({
                columns: [
                    { title: "Role Name", data: 'name' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [0],
                        render: (cellData, type, rowData, meta) => {
                            let roleName = cellData;
                            const role = cellData.split("_");
                            if (role.length > 1) {
                                roleName = role[1];
                            }
                            return roleName;
                        }
                    },
                    {
                        targets: [1],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return `<button
                                    type="button"
                                    class="update btn btn-primary btn-sm border border-dark d-none"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="View / Edit"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    class="menu btn btn-success btn-sm border border-dark"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Menu Priviledges"
                                >
                                    <i class="fas fa-th-list"></i>
                                </button>`;

                        }
                    }
                ]
            });

            $('#userRolesTable tbody').on('click', 'button.update', function () {
                var row = $(this).parents('tr');
                var rowData = $('#userRolesTable').DataTable().row(row).data();
                _this.props.updateUserRoleModal(rowData, row);
            });

            $('#userRolesTable tbody').on('click', 'button.menu', function () {
                var row = $(this).parents('tr');
                var rowData = $('#userRolesTable').DataTable().row(row).data();
                _this.props.updateRoleMenuModal(rowData, row);
            });

        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#userRolesTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#userRolesTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.roleList !== undefined &&
            nextProps.roleList.length >= 0 &&
            nextProps.roleList.length !== this.props.roleList.length) {
            this.reloadTableData(nextProps.roleList);
        }
        return false;
    }

    addRoleToTable = (roleData) => {
        const table = $('#userRolesTable').DataTable();
        table.row.add(roleData);
        table.draw();
    }

    updateRoleToTable = (roleData, idx) => {
        const table = $('#userRolesTable').DataTable();
        table.row(idx).data(roleData).draw();
    }

    render() {
        return (
            <table id="userRolesTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roleList: state.roles.roleList,
    }
};

export default connect(mapStateToProps)(UserRolesTable);