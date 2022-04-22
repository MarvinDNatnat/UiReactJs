import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from 'src/store/actions/index';
import { padLeadingZeros, patientTableDisplay, getDispatchType, getTransType } from 'src/store/utility';

import $ from 'jquery';

class PendingThreeDaysAgoTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#pendingLessTable').DataTable({
                "order": [[0, "desc"]],
                columns: [
                    { title: "Date", data: 'transactionDate' },
                    { title: "SR#", data: 'id' },
                    { title: "Patient", data: 'patient' },
                    { title: "Action", data: 'transactionItems' },
                    { title: "Reason", data: 'transactionItems' },
                ],
                columnDefs: [
                    {
                        targets: [0],
                        render: (cellData, type, rowData, meta) => {
                            const date = moment(cellData).format('YYYYMMDDHHmmss');
                            return '<p hidden=true>' + date + '</p>' + moment(cellData).format('MMM-DD-YYYY hh:mm a');
                        }
                    },
                    {
                        targets: [1],
                        render: (cellData, type, rowData, meta) => {
                            let sr = padLeadingZeros(cellData);
                            if (rowData.branch !== undefined && rowData.branch !== null) {
                                sr = sr + '<br>' + rowData.branch.branchCode
                            }
                            if (rowData.transactionType !== undefined && rowData.transactionType !== null) {
                                sr = sr + '<br>' + getTransType(rowData.transactionType)
                            }
                            if (rowData.dispatch !== undefined && rowData.dispatch !== null) {
                                sr = sr + '<br>' + getDispatchType(rowData.dispatch)
                            }
                            return sr;
                        }
                    },
                    {
                        targets: [2],
                        render: (cellData, type, rowData, meta) => {
                            let patient = patientTableDisplay(cellData);
                            if (rowData.biller !== null && rowData.biller !== '') {
                                patient += '<br>' + rowData.biller;
                            } else if (rowData.patient.corporate !== null && rowData.patient.corporate !== '') {
                                patient += '<br>' + rowData.patient.corporate.companyName;
                            } else if (rowData.referral !== null && rowData.referral !== '') {
                                patient += '<br>' + rowData.referral.referral;
                            } else {
                                patient += '<br>WALK-IN';
                            }

                            return patient;
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, rowData, meta) => {
                            let status = "";
                            if (cellData !== undefined) {
                                cellData.forEach(itm => {
                                    if (itm.itemLaboratories !== undefined) {
                                        if (itm.itemLaboratories.length > 0) {
                                            if (itm.itemType === "PCK") {
                                                if (itm.called) {
                                                    status = `<button
                                                   type="button"
                                                   class="classify btn btn-success btn-sm border border-dark"
                                                   data-toggle="tooltip"
                                                   data-placement="top"
                                                   title="Called"
                                                   disabled
                                               >
                                                   <i class="fas fa-phone"></i>
                                               </button>`
                                                } else {
                                                    status = `<button
                                                   type="button"
                                                   class="call btn btn-danger btn-sm border border-dark"
                                                   data-toggle="tooltip"
                                                   data-placement="top"
                                                   title="Call"
                                                   
                                               >
                                                   <i class="fas fa-phone"></i>
                                               </button>`
                                                }
                                            }
                                        }
                                    }
                                });

                            }
                            return status;
                        }
                    },
                    {
                        targets: [4],
                        render: (cellData, type, rowData, meta) => {
                            let labRequest = "";
                            if (cellData !== undefined) {
                                cellData.forEach(itm => {
                                    if (itm.itemLaboratories !== undefined) {
                                        if (itm.itemLaboratories.length > 0) {
                                            if (itm.itemType === "PCK") {
                                                if (itm.overAllFindings != null) {
                                                    labRequest = '<strong style="color:red">' + itm.overAllFindings + '</strong>'
                                                }

                                            }
                                        }
                                    }
                                });

                            }
                            return labRequest;
                        }
                    },
                ]
            });
            $('#pendingLessTable tbody').on('click', 'button.call', function () {
                var row = $(this).parents('tr');
                var rowData = $('#pendingLessTable').DataTable().row(row).data();
                _this.props.callHandler(rowData, row);
            });

        });
    }

    componentWillUnmount() {
        $('#pendingLessTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#pendingLessTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.pendingListlLessThan3Days !== undefined &&
            nextProps.pendingListlLessThan3Days.length > 0 &&
            nextProps.pendingListlLessThan3Days.length !== this.props.pendingListlLessThan3Days.length) {
            this.reloadTableData(nextProps.pendingListlLessThan3Days);
        }
        return false;
    }

    addNurseToTable = (nurseData) => {
        const table = $('#pendingLessTable').DataTable();
        table.row.add(nurseData);
        table.draw();
    }

    updateNurseToTable = (nurseData, idx) => {
        const table = $('#pendingLessTable').DataTable();
        table.row(idx).data(nurseData).draw();
    }

    render() {
        return (
            <table id="pendingLessTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nurseList: state.lab.nurseList,
        pendingListlLessThan3Days: state.trans.pendingListlLessThan3Days
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearLaboratoryList: (type) => dispatch(actions.clearLaboratoryList(type)),
        onClearPendingTransactionList: () => dispatch(actions.clearPendingTransactionList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingThreeDaysAgoTable);