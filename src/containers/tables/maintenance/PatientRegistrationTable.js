import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import $ from 'jquery';

export class PatientsRegistrationTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#patientsTable').DataTable({
                "order": [[0, "desc"]],
                columns: [
                    { title: "Date", data: 'updatedAt' },
                    { title: "Name", data: 'lastname' },
                    { title: "Birth Date", data: 'birthDate' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [0],
                        render: (cellData, type, rowData, meta) => {
                            return moment(rowData.updatedAt).format('MMM-DD-YYYY HH:mm a');
                        }
                    },
                    {
                        targets: [1],
                        render: (cellData, type, rowData, meta) => {
                            let middlename = '';
                            if (rowData.middlename !== null && rowData.rowData !== '') {
                                middlename = ' ' + rowData.middlename;
                            }
                            let mfName = '';
                            mfName = rowData.firstname + middlename;
                            let fmfName = mfName.split(" ").map(_this.props.hideName).join(" ");
                            const patientName = rowData.lastname + ", " + fmfName;
                            return patientName;
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
                        orderable: false,
                        data: '',
                        className: "text-center",
                        render: (cellData, type, rowData, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark" disabled><i class="fas fa-edit" /></button>';
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
        patientList: state.ptnts.patientListByDate,
    }
};

export default connect(mapStateToProps)(PatientsRegistrationTable);
