import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';

export class DoctorsTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#doctorsTable').DataTable({
                columns: [
                    { title: "Last Name", data: 'lastname' },
                    { title: "First Name", data: 'firstname' },
                    { title: "Middle Name", data: 'middlename' },
                    { title: "Specialization", data: 'specialization' },
                    { title: "Contact Number", data: "contactNumber" },
                    { title: "Email", data: 'email' },
                    { title: "License Number", data: 'licenseNumber' },
                    { title: "Status", data: 'active' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [7],
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
                        targets: [8],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    }
                ]
            });

            $('#doctorsTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#doctorsTable').DataTable().row(row).data();
                _this.props.updateDoctorModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#doctorsTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#doctorsTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.doctorList !== undefined &&
            nextProps.doctorList.length >= 0 &&
            nextProps.doctorList.length !== this.props.doctorList.length) {
            this.reloadTableData(nextProps.doctorList);
        }
        return false;
    }

    addDoctorToTable = (doctorData) => {
        const table = $('#doctorsTable').DataTable();
        table.row.add(doctorData);
        table.draw();
    }

    updateDoctorToTable = (doctorData, idx) => {
        const table = $('#doctorsTable').DataTable();
        table.row(idx).data(doctorData).draw();
    }

    render() {
        return (
            <table id="doctorsTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        doctorList: state.docs.doctorList,
    }
};

export default connect(mapStateToProps)(DoctorsTable);