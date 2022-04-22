import React, { Component } from 'react';
import { twoFixedAmt } from 'src/store/utility'
import $ from 'jquery';
export class SOATable extends Component {
    componentDidMount() {
        this.props.onRef(this);
        var _this = this;
        $(document).ready(function () {
            $('#soaTable').DataTable({
                order: [[1, "asc"]],
                filter: false,
                ordering: false,
                paging: false,
                info: false,
                columns: [
                    { title: "Date/Time", data: 'dateTime' },
                    { title: "SR#", data: 'receipt' },
                    { title: "Full Name", data: 'fullname' },
                    { title: "Procedure", data: 'itemList' },
                    { title: "Total", data: 'subtotal' },
                    {
                        title: '<input type="checkbox" id="checkAll" class="checkAll btn btn-warning btn-sm border border-dark" data-toggle="tooltip" data-placement="top" title="Check" />', data: 'checkbox '
                    },
                ],
                columnDefs: [
                    {
                        targets: [3],
                        orderable: false,
                        className: "text-center",
                        render: (cellData, type, row, meta) => {
                            let products = `<div className='container>`;
                            cellData.forEach(item => {
                                let itm = `<div className='row'>`;
                                itm += `<div className='col-md-6 col-6'>`;
                                itm += item.description;
                                itm += `</div><div className='col-md-6 col-6 text-right'>`;
                                itm += twoFixedAmt(item.amountDue);
                                itm += `</div></div>`;
                                products += itm;
                            });
                            products += `</div>`;
                            return products;
                        }
                    },
                    {
                        targets: [4],
                        orderable: false,
                        className: "text-right",
                        render: (cellData, type, row, meta) => {
                            return twoFixedAmt(cellData);
                        }
                    },
                    {
                        targets: [5],
                        orderable: false,
                        data: '',
                        render: (cellData, type, row, meta) => {

                            let check;
                            row.soaStatusPaid === false && !row.isSelected ? check =
                                `<input 
                            type="checkbox"
                            class="check btn btn-warning btn-sm border border-dark"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Check"
                            value="`+{row}+`"
                            />
                           ` : row.soaStatusPaid === true ? check = `PAID` : check = `<input 
                           type="checkbox"
                           class="check btn btn-warning btn-sm border border-dark"
                           data-toggle="tooltip"
                           data-placement="top"
                           title="Check"
                           checked
                           />
                          `
                            return check;
                        }
                    },
                ]
            });

            $('#soaTable tbody').on('change', 'input.check', function () {
                $('#soaTable [type="checkbox"]').each(function (i, chk) {
                    var rowData;
                    if (chk.checked) {
                        var row = $(this).parents('tr');
                        rowData = $('#soaTable').DataTable().row(row).data();
                        _this.props.selectPatient(rowData);
                    }
                });
            });

            var checkBox = document.getElementById("checkAll");
            checkBox.addEventListener("change", function () {
                if (checkBox.checked) {
                    $('input:checkbox').not(this).prop('checked', this.checked);
                    _this.props.SelectAllPatientHandler();
                } else {
                    $('input:checkbox').each(function() {
                        this.checked = false; 
                    });  
                }
            }, false);
        });
        $('#soaTable [type="checkbox"]').each(function (i, chk) {
            // var rowData;
            if (chk.checked) {
                //   var row = $(this).parents('tr');
                //   rowData = $('#soaTable').DataTable().row(row).data();
            }
        });
    }

    componentWillUnmount() {
        $('#soaTable').DataTable().destroy(true);
    }

    reloadTableData = (data) => {
        const table = $('#soaTable')
            .DataTable();
        table.clear().draw();
        if (data.length > 0) {
            table.rows.add(data);
            table.draw();
        }
    }

    addSOAToTable = (soaData) => {
        const table = $('#ecgTable').DataTable();
        table.row.add(soaData);
        table.draw();
    }

    updateSoaToTable = (soaData, idx) => {
        const table = $('#ecgTable').DataTable();
        table.row(idx).data(soaData).draw();
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== undefined && nextProps.soaList !== undefined &&
            nextProps.soaList.length >= 0 &&
            nextProps.soaList.length !== this.props.soaList.length) {
            this.reloadTableData(nextProps.soaList);
        }
        return false;
    }
    render() {
        return (
            <table id="soaTable" className="table table-bordered table-striped display">
            </table>
        );
    }
}

export default SOATable;