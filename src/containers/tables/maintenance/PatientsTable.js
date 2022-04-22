import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import $ from 'jquery';

export class PatientsTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#patientsTable').DataTable({
                columns: [
                    { title: "Name", data: 'lastname' },
                    { title: "Gender", data: 'gender' },
                    { title: "Birth Date", data: 'birthDate' },
                    { title: "Contact Number / Email", data: 'contactNumber' },
                    { title: "Address", data: 'address' },
                    { title: "Nationality", data: 'nationality' },
                    { title: "Senior ID / PWD ID", data: 'seniorId' },
                    { title: "Corporate", data: 'corporate' },
                    { title: "Status", data: 'active' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [0],
                        render: (cellData, type, rowData, meta) => {
                            let middlename = '';
                            if (rowData.middlename !== null && rowData.rowData !== '') {
                                middlename = ' ' + rowData.middlename;
                            }

                            const patientName = rowData.lastname + ", " + rowData.firstname + middlename;
                            return patientName;
                        }
                    },
                    {
                        targets: [1],
                        render: (cellData, type, rowData, meta) => {
                            return cellData === 'M' ? 'MALE' : 'FEMALE';
                        }
                    },
                    {
                        targets: [2],
                        render: (cellData, type, rowData, meta) => {
                            return moment(cellData).format('MMM-DD-YYYY');
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, rowData, meta) => {
                            return rowData.contactNumber + " / " + rowData.email;
                        }
                    },
                    {
                        targets: [5],
                        render: (cellData, type, rowData, meta) => {
                            return cellData.nationality;
                        }
                    },
                    {
                        targets: [6],
                        render: (cellData, type, rowData, meta) => {
                            let discountID = '';
                            if (rowData.seniorId !== null && rowData.pwdId !== null) {
                                discountID = rowData.seniorId + " / " + rowData.pwdId;
                            } else {
                                if (rowData.seniorId !== null) {
                                    discountID = rowData.seniorId
                                } else if (rowData.pwdId !== null) {
                                    discountID = rowData.pwdId;
                                }
                            }
                            return discountID;
                        }
                    },
                    {
                        targets: [7],
                        render: (cellData, type, rowData, meta) => {
                            let company = '';
                            if (cellData !== null) {
                                company = cellData.companyName;
                            }
                            return company;
                        }
                    },
                    {
                        targets: [8],
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
                        render: (cellData, type, rowData, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    }
                ]
            });

            $('#patientsTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#patientsTable').DataTable().row(row).data();
                _this.props.updatePatientModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#patientsTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#patientsTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.patientList !== undefined &&
            nextProps.patientList.length >= 0 &&
            nextProps.patientList.length !== this.props.patientList.length) {
            this.reloadTableData(nextProps.patientList);
        }
        return false;
    }

    addPatientToTable = (patientData) => {
        const table = $('#patientsTable').DataTable();
        table.row.add(patientData);
        table.draw();
    }

    updatePatientToTable = (patientData, idx) => {
        const table = $('#patientsTable').DataTable();
        table.row(idx).data(patientData).draw();
    }

    render() {
        return (
            <table id="patientsTable" className="table table-bordered table-striped display nowrap">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        patientList: state.ptnts.patientList,
    }
};

export default connect(mapStateToProps)(PatientsTable);
