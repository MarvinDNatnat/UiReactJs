import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChargeType } from 'src/store/utility';

import $ from 'jquery';

export class CorporatesTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#corporatesTable').DataTable({
                columns: [
                    { title: "Name", data: 'companyName' },
                    { title: "Type", data: 'chargeType' },
                    { title: "Contact Details", data: 'contactPerson' },
                    { title: "SOA/Result Email", data: 'email' },
                    { title: "Status", data: 'active' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [1],
                        className: "text-left",
                        render: (cellData, type, rowData, meta) => {
                            return getChargeType(cellData);
                        }
                    },
                    {
                        targets: [2],
                        className: "text-left",
                        render: (cellData, type, rowData, meta) => {
                            let contact = "";

                            if (rowData.contactPerson !== null) {
                                contact = rowData.contactPerson;
                            }

                            if (rowData.contactNumber !== null) {
                                if (contact === "") {
                                    contact = rowData.contactNumber;
                                } else {
                                    contact += " / " + rowData.contactNumber;
                                }
                            }
                            return contact;
                        }
                    },
                    {
                        targets: [3],
                        className: "text-left",
                        render: (cellData, type, rowData, meta) => {
                            let email = "";

                            if (rowData.email !== null) {
                                email = rowData.email;
                            }

                            if (rowData.resultEmail !== null) {
                                email += " / " + rowData.resultEmail;
                            } else {
                                email += " / ";
                            }

                            return email;
                        }
                    },
                    {
                        targets: [4],
                        className: "text-center",
                        render: (cellData, type, rowData, meta) => {
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
                        render: (cellData, type, rowData, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    }
                ],
            });

            $('#corporatesTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#corporatesTable').DataTable().row(row).data();
                _this.props.updateCorporateModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#corporatesTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#corporatesTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.corporateList !== undefined &&
            nextProps.corporateList.length >= 0 &&
            nextProps.corporateList.length !== this.props.corporateList.length) {
            this.reloadTableData(nextProps.corporateList);
        }
        return false;
    }

    addCorporateToTable = (corporateData) => {
        const table = $('#corporatesTable').DataTable();
        table.row.add(corporateData);
        table.draw();
    }

    updateCorporateToTable = (corporateData, idx) => {
        const table = $('#corporatesTable').DataTable();
        table.row(idx).data(corporateData).draw();
    }

    render() {
        return (
            <table id="corporatesTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        corporateList: state.corps.corporateList,
    }
};

export default connect(mapStateToProps)(CorporatesTable);