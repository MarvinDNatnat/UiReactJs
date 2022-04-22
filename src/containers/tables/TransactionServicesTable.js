import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { padLeadingZeros, patientTableDisplay, getLaboratoryStatus, getDispatchType } from 'src/store/utility';
import * as actions from 'src/store/actions/index';

import $ from 'jquery';

class TransactionServicesTable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#transactionServiceTable').DataTable({
                columns: [
                    { title: "Date", data: 'transactionDate' },
                    { title: "SR#", data: 'id' },
                    { title: "Patient", data: 'patient' },
                    { title: "Company", data: 'biller' },
                    { title: "Request", data: 'transactionLabRequests' },
                    { title: "Action", data: null }
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
                            if (rowData.dispatch !== undefined && rowData.dispatch !== null) {
                                sr = sr + '<br>' + getDispatchType(rowData.dispatch)
                            }
                            return sr;
                        }
                    },
                    {
                        targets: [2],
                        render: (cellData, type, rowData, meta) => {
                            // let patient = patientTableDisplay(cellData);
                            // if (return rowData.transaction.patient.corporate.companyName; !== null && rowData.transaction.patient.corporate !== '') {
                            //     patient += '<br>' + rowData.transaction.patient.corporate.companyName;
                            // }

                            // return patient;
                           
                            return patientTableDisplay(cellData, rowData.transactionType, rowData.remarks);
                        }
                    },
                    {
                        targets: [3],
                        render: (cellData, type, rowData, meta) => {
                            let companyName = '';
                            if(rowData.patient.corporate !== null && rowData.patient.corporate !== undefined){
                                companyName = rowData.patient.corporate.companyName
                            }
                            return companyName;
                        }
                    },
                    {
                        targets: [4],
                        render: (cellData, type, rowData, meta) => {
                            const labRequest = [];

                            if (rowData.remarks !== undefined && rowData.remarks !== null) {
                                labRequest.push('<strong style="color:red">' + rowData.remarks + '</strong>');
                            }

                            cellData.forEach(lab => {
                                const itemDetails = lab.itemDetails;
                                const status = getLaboratoryStatus(lab);
                                labRequest.push(itemDetails.itemDescription.toUpperCase() + (status !== '' ? "<br>" + status : ''));
                            });

                            if (labRequest.length <= 0) {
                                labRequest.push("NO REQUEST");
                            }

                            return labRequest.join("<br><br>");
                        }
                    },
                    {
                        targets: [5],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            return `<button
                                        type="button"
                                        class="specimen btn btn-danger btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Submit Specimen/Requirement"
                                    >
                                        <i class="fas fa-syringe"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="label btn btn-info btn-sm border border-dark"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Print Label"
                                    >
                                        <i class="fas fa-tags"></i>
                                    </button>`;
                        }
                    },
                ]
            });

            $('#transactionServiceTable tbody').on('click', 'button.specimen', function () {
                var row = $(this).parents('tr');
                var rowData = $('#transactionServiceTable').DataTable().row(row).data();
                _this.props.openSubmitSpecimenModal(rowData, row);
            });

            $('#transactionServiceTable tbody').on('click', 'button.label', function () {
                var row = $(this).parents('tr');
                var rowData = $('#transactionServiceTable').DataTable().row(row).data();
                _this.props.openViewLabelModal(rowData, row);
            });
        });
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
        $('#transactionServiceTable').DataTable().destroy(true);
        this.props.onClearLaboratoryList('TXN');
    }

    reloadTableData = (data) => {
        const table = $('#transactionServiceTable').DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.txnSrvList !== undefined &&
            nextProps.txnSrvList.length >= 0 &&
            nextProps.txnSrvList.length !== this.props.txnSrvList.length) {
            this.reloadTableData(nextProps.txnSrvList);
        }
        return false;
    }

    addTxnServiceToTable = (txnSrvData) => {
        const table = $('#transactionServiceTable').DataTable();
        table.row.add(txnSrvData);
        table.draw();
    }

    updateTxnServiceToTable = (txnSrvData, idx) => {
        const table = $('#transactionServiceTable').DataTable();
        table.row(idx).data(txnSrvData).draw();
    }

    render() {
        return (
            <table id="transactionServiceTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        txnSrvList: state.lab.txnSrvList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClearLaboratoryList: (type) => dispatch(actions.clearLaboratoryList(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionServicesTable);