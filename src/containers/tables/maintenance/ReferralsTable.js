import React, { Component } from 'react'

import { connect } from 'react-redux';

import $ from 'jquery';

export class ReferralsTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#referralsTable').DataTable({
                columns: [
                    { title: "Referral", data: 'referral' },
                    { title: "Status", data: 'active' },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                    {
                        targets: [1],
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
                        targets: [2],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return '<button type="button" class="btn btn-primary btn-sm border border-dark"><i class="fas fa-edit" /></button>';
                        }
                    }
                ]
            });

            $('#referralsTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#referralsTable').DataTable().row(row).data();
                _this.props.updateReferralModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#referralsTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#referralsTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.referralList !== undefined &&
            nextProps.referralList.length >= 0 &&
            nextProps.referralList.length !== this.props.referralList.length) {
            this.reloadTableData(nextProps.referralList);
        }
        return false;
    }

    addReferralToTable = (referralData) => {
        const table = $('#referralsTable').DataTable();
        table.row.add(referralData);
        table.draw();
    }

    updateReferralToTable = (referralData, idx) => {
        const table = $('#referralsTable').DataTable();
        table.row(idx).data(referralData).draw();
    }

    render() {
        return (
            <table id="referralsTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        referralList: state.refs.referralList,
    }
};

export default connect(mapStateToProps)(ReferralsTable)
