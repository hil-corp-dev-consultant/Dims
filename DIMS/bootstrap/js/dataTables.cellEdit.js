/*! CellEdit 1.0.0
 * ©2016 Elliott Beaty - datatables.net/license
 */

/**
 * @summary     CellEdit
 * @description Make a cell editable when clicked upon
 * @version     1.0.0
 * @file        dataTables.editCell.js
 * @author      Elliott Beaty
 * @contact     elliott@elliottbeaty.com
 * @copyright   Copyright 2016 Elliott Beaty
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

jQuery.fn.dataTable.Api.register('MakeCellsEditable()', function (settings) {

    var table = this.table();
    InlineeditingTable = table;
    jQuery.fn.extend({

        // UPDATE
        updateEditableCell: function (callingElement) {
            // PreviousRowData = $('a.my-cancel-class');


            var row = table.row($(callingElement).parents('tr'));
            var cell = table.cell($(callingElement).parent());
            InlinePreviousCellValue = cell.data();
            var columnIndex = cell.index().column;
            InlineColumnIndex = columnIndex;
            var inputField;
            var newValue;
            // Update datatables cell value
            //alert($(callingElement).siblings().prop('nodeName').toLowerCase());
            switch ($(callingElement).prop('nodeName').toLowerCase()) {
                case 'input':
                    inputField = $(callingElement);
                    console.log(inputField)
                    break;
                case 'a':
                    if ($(callingElement).siblings().prop('nodeName').toLowerCase() == 'select') {
                        inputField = $(callingElement).siblings('select');
                        // alert($("option:selected", inputField).text());
                        if ($("option:selected", inputField).val() != "") {
                            newValue = $("option:selected", inputField).text();
                        } else {
                            newValue = "";
                        }
                    } else {
                        inputField = $(callingElement).siblings('input');
                        newValue = inputField.val();
                    }
                    //alert($(callingElement).siblings().prop('nodeName').toLowerCase());                    
                    break;
            }
            // Update
            // var newValue = inputField.val();

            if (!newValue && ((settings.allowNulls) && settings.allowNulls != true)) {
                console.log(settings.allowNulls)
                // If columns specified
                if (settings.allowNulls.columns) {
                    // If current column allows nulls
                    if (settings.allowNulls.columns.indexOf(columnIndex) > -1) {
                        _update(newValue);
                    } else {
                        _addValidationCss();
                    }
                    // No columns allow null
                } else if (!newValue) {
                    _addValidationCss();
                }
                //All columns allow null
            } else {
                if (settings.FormName == "EmpRoleConfig") {
                    _update(newValue);
                    //if (((columnIndex == 5) || (columnIndex == 6) || (columnIndex == 7)) && (newValue != "")) {
                    //    var valid = isValidCode(newValue);
                    //    if (valid == false) {
                    //        alert("Please Select proper Coordinator Code");
                    //    } else {
                    //        _update(newValue);
                    //    }
                    //} else {
                    //    _update(newValue);
                    //}
                }
                else if (settings.FormName == "EmpCustomerConfig") {
                    if (((columnIndex == 5)) && (newValue != "")) {
                        var valid = isFSOValidCode(newValue);
                        if (valid == false) {
                            alert("Please Select proper FSO Code");
                        } else {
                            _update(newValue);
                        }
                    } else {
                        _update(newValue);
                    }
                }
                else {
                    _update(newValue);
                }
            }
            function _addValidationCss() {
                // Show validation error
                if (settings.allowNulls.errorClass) {
                    $(inputField).addClass(settings.allowNulls.errorClass)
                } else {
                    $(inputField).css({ "border": "red solid 1px" })
                }
            }
            function _update(newValue) {

                cell.data(newValue);
                //Return cell & row.
                settings.onUpdate(cell, row);


            }



            //Redraw table
            table.draw(false);
        },
        // CANCEL
        cancelEditableCell: function (callingElement) {

            var cell = table.cell($(callingElement).parent());
            // Set cell to it's original value

            cell.data(cell.data());


            // Redraw table
            table.draw(false);
        }
    });




    // On cell click
    $(table.body()).on('click', 'td.Edit', function () {

        var SelectedCellValue = $(this).text();

        var $ClassNameForFreetext = $(this).attr('class');
        //alert($status);

        // currentColumnIndex = table.cell(this).index().column;

        currentColumnIndex = $(this).index();//Need to check...................

        // DETERMINE WHAT COLUMNS CAN BE EDITED
        if ((settings.columns && settings.columns.indexOf(currentColumnIndex) > -1) || (!settings.columns)) {
            var row = table.row($(this).parents('tr'));
            editableCellsRow = row;
            PreviousRowData = row;
            var cell = table.cell(this).node();
            var RowIndex = row.index();
            // PreviousRowData = row;
            // Show input            
            //   alert($(cell).find('select.' + settings.inputCss).length);          
            //  alert($(cell).html());
            if (!$(cell).find('input').length) {
                // Input CSS                
                var inputCss = "";
                if (settings.inputCss) {
                    inputCss = settings.inputCss;
                }
                if (settings.confirmationButton) {
                    // Buton CSS
                    var confirmCss = settings.confirmationButton.confirmCss;
                    var cancelCss = settings.confirmationButton.cancelCss;
                    var classlength = $(cell).children().hasClass(settings.inputCss);
                    if (settings.FormName == "EmpRoleConfig") {
                        var id = RowIndex + currentColumnIndex;
                        if (classlength == false) {
                            if (currentColumnIndex == 3) {
                                $(cell).html("<select class='Zone " + inputCss + "' id=" + id + "><option value=''>Select Zone</option><option value='01'>South</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                FillZoneDropDown(id);
                            }
                            else if (currentColumnIndex == 4) {
                                $(cell).html("<select class='State " + inputCss + "' id=" + id + "><option value=''>Select State</option><option value='01'>Andhra pradesh</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                FillStateDropDown(id);
                            } else if (currentColumnIndex == 6) {
                                $(cell).html("<select class='Role " + inputCss + "' id=" + id + "><option value=''>Select Role</option><option value='01'>FSO</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                FillRoleDropDown(id);
                            }
                            else {
                                $(cell).html("<input class='Coordinator " + inputCss + "' id=" + id + "></input>&nbsp;<a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                CallingObject = $(this);
                                $('.' + inputCss).val(SelectedCellValue);
                                $('.' + inputCss).focus();
                                CoordinatorList(id);
                            }
                        }
                        //else {
                        //    var itemtype = $(cell).children().prop('nodeName').toLowerCase();
                        //    //alert(SelectedCellValue);
                        //    if (itemtype == 'select') {

                        //            alert($("#" + id).text().attr('selected', 'selected'));
                        //        // $("#" + id).val(SelectedCellValue);
                        //        // $("#" + id + "option:contains(" + SelectedCellValue + ")").attr('selected', 'selected');
                        //    } else {
                        //        $("#" + id).val(SelectedCellValue);
                        //    }
                        //    //alert($(cell).children().prop('nodeName').toLowerCase());

                        //}
                    }
                    else if (settings.FormName == "EmpCustomerConfig") {
                        var id = RowIndex + currentColumnIndex;
                        if (classlength == false) {

                            $(cell).html("<input class='FSO " + inputCss + "' id=" + id + "></input>&nbsp;<a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                            CallingObject = $(this);
                            $('.' + inputCss).val(SelectedCellValue);
                            $('.' + inputCss).focus();
                            FSOList(id);

                        }
                        //else {
                        //    var itemtype = $(cell).children().prop('nodeName').toLowerCase();
                        //    //alert(SelectedCellValue);
                        //    if (itemtype == 'select') {

                        //            alert($("#" + id).text().attr('selected', 'selected'));
                        //        // $("#" + id).val(SelectedCellValue);
                        //        // $("#" + id + "option:contains(" + SelectedCellValue + ")").attr('selected', 'selected');
                        //    } else {
                        //        $("#" + id).val(SelectedCellValue);
                        //    }
                        //    //alert($(cell).children().prop('nodeName').toLowerCase());

                        //}
                    }
                    else if (settings.FormName == "SalesHurdlesApproval") {
                        var id = RowIndex + currentColumnIndex;
                        if (classlength == false) {
                            for (var i = 2; i <= 33; i++) {
                                if (currentColumnIndex == i) {
                                    $(cell).html("<select class='Zone " + inputCss + "' id=" + id + "><option value=''>Select</option><option value='01' style='color:green'>Y</option><option value='02' style='color:red'>N</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                }
                            }

                            //if (currentColumnIndex == 3) {
                            //    $(cell).html("<select class='Zone " + inputCss + "' id=" + id + "><option value=''>Select</option><option value='01' style='color:green'>Yes</option><option value='02' style='color:red'>No</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                            //}
                            //if (currentColumnIndex == 4) {
                            //    $(cell).html("<select class='Zone " + inputCss + "' id=" + id + "><option value=''>Select</option><option value='01' style='color:green'>Yes</option><option value='02' style='color:red'>No</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                            //}
                        }
                    }
                    else if (settings.FormName == "JourneyPlan") {
                        var id = RowIndex + currentColumnIndex;
                        if (classlength == false) {
                            // alert(settings.MaxServerDate);
                            $(cell).html("<input class='JP_" + inputCss + "' id=" + id + "></input>&nbsp;<a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Y</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>N</a> ");
                            CallingObject = $(this);
                            if (settings.onkeypress == "OnlyNumber") {
                                $(".JP_" + inputCss).keypress(function (event) {
                                    return onlyNumerics(event);
                                });
                            }
                            $('.JP_' + inputCss).val(SelectedCellValue);
                            if (currentColumnIndex == 7) {
                                $('.JP_' + inputCss).focus();
                            }
                            $('.JP_' + inputCss).css({ "width": "127px" });
                            if (currentColumnIndex == 11) {
                                $("#" + id).datepicker({
                                    format: "dd/mm/yyyy",
                                    autoclose: true
                                });

                                $("#" + id).datepicker('setStartDate', settings.MaxServerDate);
                            }

                        }
                    }
                    else if (settings.FormName == "ZHJourneyPlan") {
                        var id = RowIndex + currentColumnIndex;
                        if (classlength == false) {
                            if (currentColumnIndex == 2) {
                                $(cell).html("<select class='AttendanceType " + inputCss + "' id=" + id + "><option value=''>Select Attendance</option><option value='HQ'>HQ</option><option value='Leave'>Leave</option><option value='Visit'>Visit</option><option value='Holiday'>Holiday</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                // FillZoneDropDown(id);
                                $('#' + id).val(SelectedCellValue);
                            }
                            else if (currentColumnIndex == 3) {
                                $(cell).html("<select class='State " + inputCss + "' id=" + id + "><option value=''>Select State</option><option value='01'>Andhra pradesh</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                FillUserBasedStateDropDown(id);
                                $('#' + id).val(SelectedCellValue);
                            } else if (currentColumnIndex == 5) {
                                $(cell).html("<select class='ActualVisit " + inputCss + "' id=" + id + "><option value=''>Select Actual Visit</option><option value='Yes'>Yes</option><option value='No'>No</option></select><a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                $('#' + id).val(SelectedCellValue);
                            }
                            else if (currentColumnIndex == 4) {
                                $(cell).html("<input class='PlanedDistirict " + inputCss + "' id=" + id + " maxlenght='150'></input>&nbsp;<a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                CallingObject = $(this);
                                $('#' + id).val(SelectedCellValue);
                                $('#' + id).focus();
                            }
                            else {
                                $(cell).html("<input class='Remarks " + inputCss + "' id=" + id + " maxlenth='150'></input>&nbsp;<a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                                CallingObject = $(this);
                                $('#' + id).val(SelectedCellValue);
                                $('#' + id).focus();
                                // CoordinatorList(id);
                            }
                        }
                    }
                    else {
                        $(cell).html("<input class='" + inputCss + "'></input>&nbsp;<a  class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a  class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ");
                        CallingObject = $(this);

                        $('.' + inputCss).val(SelectedCellValue);
                        $('.' + inputCss).focus();
                    }

                } else {
                    $(cell).html("<input class='" + inputCss + "' onfocusout='$(this).updateEditableCell(this)'></input>");
                }

                //Textbox should accept only number Harish
                if (settings.onkeypress) {
                    if (settings.onkeypress == "OnlyNumber" && ($ClassNameForFreetext.indexOf(' freeText') == -1)) {
                        $("." + inputCss).keypress(function (event) {
                            return onlyNumerics(event);
                        });
                    }
                }
            }
        }
    });
})