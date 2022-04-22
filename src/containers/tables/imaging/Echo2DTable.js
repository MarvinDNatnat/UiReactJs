import React, { Component } from 'react'
import { connect } from 'react-redux';

import $ from 'jquery';

export class Echo2DTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#echo2dTable').DataTable({
                columns: [
                    { title: "Date", data: null },
                    { title: "SR#", data: null },
                    { title: "Patient", data: null },
                    { title: "Company", data: null },
                    { title: "Request", data: null },
                    { title: "Remarks", data: null },
                    { title: "Action", data: null }
                ],
                columnDefs: [
                ]
            });

            $('#echo2dTable tbody').on('click', 'button', function () {
                var row = $(this).parents('tr');
                var rowData = $('#echo2dTable').DataTable().row(row).data();
                _this.props.updateEcho2DModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#echo2dTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#echo2dTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.e2dList !== undefined &&
            nextProps.e2dList.length >= 0 &&
            nextProps.e2dList.length !== this.props.e2dList.length) {
            this.reloadTableData(nextProps.e2dList);
        }
        return false;
    }

    addEcho2DToTable = (echo2dData) => {
        const table = $('#echo2dTable').DataTable();
        table.row.add(echo2dData);
        table.draw();
    }

    updateEcho2DToTable = (echo2dData, idx) => {
        const table = $('#echo2dTable').DataTable();
        table.row(idx).data(echo2dData).draw();
    }

    render() {
        return (
            <table id="echo2dTable" className="table table-bordered table-striped display">
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        e2dList: state.srv.e2dList,
    }
};

export default connect(mapStateToProps)(Echo2DTable)
