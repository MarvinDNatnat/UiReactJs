import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';

export class UserTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#usersTable').DataTable({
                columns: [
                    { title: "Username", data: 'username' },
                    { title: "Email", data: 'email' },
                    { title: "Roles", data: 'roles' },
                    { title: "Status", data: 'active' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [2],
                        render: (cellData, type, row, meta) => {
                            const roles = [];
                            cellData.forEach(role => {
                                roles.push(role.inputName.toUpperCase());
                            });
                            return roles.sort().toString();
                        }
                    },
                    {
                        targets: [3],
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
                        targets: [4],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            // return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                            return `<button
                                    type="button"
                                    class="update btn btn-primary btn-sm border border-dark"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Update"
                                >
                                    <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="profile btn btn-success btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Profile"
                                    >
                                        <i class="fas fa-address-card"></i>
                                </button>`;
                        }
                    }
                ]
            });

            $('#usersTable tbody').on('click', 'button.update', function () {
                var row = $(this).parents('tr');
                var rowData = $('#usersTable').DataTable().row(row).data();
                _this.props.updateUserModal(rowData, row);
            });

            $('#usersTable tbody').on('click', 'button.profile', function () {
                var row = $(this).parents('tr');
                var rowData = $('#usersTable').DataTable().row(row).data();
                _this.props.userProfileModal(rowData, row);
            });

        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#usersTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#usersTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.userInfoList !== undefined &&
            nextProps.userInfoList.length >= 0 &&
            nextProps.userInfoList.length !== this.props.userInfoList.length) {
            this.reloadTableData(nextProps.userInfoList);
        }
        return false;
    }

    addUserToTable = (userData) => {
        const table = $('#usersTable').DataTable();
        table.row.add(userData);
        table.draw();
    }

    updateUserToTable = (userData, idx) => {
        const table = $('#usersTable').DataTable();
        table.row(idx).data(userData).draw();
    }

    render() {
        return (
            <table id="usersTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfoList: state.users.userInfoList,
    }
};
export default connect(mapStateToProps)(UserTable);
