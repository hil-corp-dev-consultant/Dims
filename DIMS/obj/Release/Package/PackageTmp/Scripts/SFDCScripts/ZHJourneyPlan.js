DIMS.factory('DIMSSFDC_ZHFactory', function ($http) {
    return {
        getTempData: function () {
            return $http.get('../../Home/getData');
        },
        GetServerDateTime: function () {
            return $http.get('../../Home/getServerDateTime');
        },
        GetZHBasedStates: function (Data) {
            return $http({ url: '../../SFDC/GetZHBasedStates', method: 'POST', data: { Data: Data } });
        },
        SaveZHJourneyPlan: function (TotalPlanData) {
            return $http({ url: '../../SFDC/SaveZHJourneyPlan', method: 'POST', data: { TotalJourneyPlan: TotalPlanData } });
        },
        GetZHJourneyPlanDetailsforEdit: function (EditId) {
            return $http({ url: '../../SFDC/GetZHJourneyPlanDetailsforEdit', method: 'POST', data: { ZHJourneyPlanMonth: EditId } });
        },
        GetJPLogiOrgIds: function (Data) {
            return $http({ url: '../../SFDC/GetJPLogiOrgIds', method: 'POST', data: { Data: Data } });
        },
        UpdateJourneyPlanStatus: function (jsondata) {
            return $http({ url: '../../SFDC/UpdateJourneyPlanStatus', method: 'POST', data: { jsondata: jsondata } });
        },
        GetUserBasedDeviationReport: function (Data) {
            return $http({ url: '../../SFDC/GetUserBasedDeviationReport', method: 'POST', data: { Data: Data } });
        },
        GetReportingUsers: function (data) {
            return $http({ url: '../../SFDC/GetReportingUsers', method: 'POST', data: { Data: data } });
        },
    }
});

var DIMSSFDCFactoryZH;
DIMS.controller('ZHJourneyPlanDetails', function ($scope, $location, DIMSSFDC_ZHFactory, $http, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "ZH Journey plan" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    var RoleConfig = new Array();

    DIMSSFDCFactoryZH = DIMSSFDC_ZHFactory;
    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------

    var PresentStatus = "";
    var PlanCreatedUser = $('#SessionUserCode').val();
    //  GetPresentUserOrgLevelId();


    angular.element(document).ready(function () {
        //  GetPresentUserOrgLevelId();

        var Data = JSON.stringify({
            "LoginUserCode": $('#SessionUserCode').val(),
            "LoginUserRole": $('#SessionUserRole').val()
        });
        DIMSSFDC_ZHFactory.GetJPLogiOrgIds(Data).success(function (res) {
            if (res != "") {
                var Response = JSON.parse(res);
                $('#LoginUserOrgLevelId').val(Response[0]["ORG_LEVEL_ID"]);
                var ServerDate = "";
                var table = $('#ZHJPDTable').DataTable({
                    "bSort": false,
                    "bScrollCollapse": true,
                    "paging": false,
                    "ordering": false,
                    "info": false,
                    "bFilter": false,
                    scrollY: "200px",
                    scrollX: true,
                    fixedColumns: {
                        leftColumns: 0
                    },
                    "columnDefs": [
            { className: "Edit", "targets": [2, 3, 4, 5, 6] }
                    ]
                });



                var EditId = $routeParams.ID;

                if (EditId == undefined || EditId == "") {
                    //  GetPresentUserOrgLevelId();
                    GetMonthDaysAndDates();
                    $('#ZHJPSendApprove').hide();
                } else {
                    $scope.ZHJourneyPlanName = EditId;
                    ShowLoader();

                    DIMSSFDC_ZHFactory.GetZHJourneyPlanDetailsforEdit(EditId).success(function (response) {
                        if (response != "" && response != "False") {
                            var Res = JSON.parse(response);
                            var HeaderData = Res["Header"];
                            var PlanDetails = Res["Plan"];
                            var HtmlCode = "";
                            var Noof = 0;
                            var NoofYes = 0;
                            var TotalNos = 0;
                            $('#ZHJPSendApprove').show();
                            for (var i = 0; i < PlanDetails.length; i++) {
                                HtmlCode += "<tr>";
                                HtmlCode += "<td>" + PlanDetails[i]["PLAN_DATE"] + "</td>";
                                HtmlCode += "<td>" + PlanDetails[i]["PLAN_DAY"] + "</td>";
                                if (PlanDetails[i]["ATTENDANCE_TYPE"] == "Leave" || PlanDetails[i]["ATTENDANCE_TYPE"] == "Holiday") {
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["ATTENDANCE_TYPE"] + "</td>";
                                    HtmlCode += "<td>" + PlanDetails[i]["PLANED_STATE"] + "</td>";
                                    HtmlCode += "<td>" + PlanDetails[i]["PLANED_DISTRICT"] + "</td>";
                                    HtmlCode += "<td>" + PlanDetails[i]["ACTUAL_VISIT_STATUS"] + "</td>";
                                    HtmlCode += "<td>" + PlanDetails[i]["REMARKS"] + "</td>";
                                } else if (PlanDetails[i]["ATTENDANCE_TYPE"] == "HQ") {
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["ATTENDANCE_TYPE"] + "</td>";
                                    HtmlCode += "<td>" + PlanDetails[i]["PLANED_STATE"] + "</td>";
                                    HtmlCode += "<td>" + PlanDetails[i]["PLANED_DISTRICT"] + "</td>";
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["ACTUAL_VISIT_STATUS"] + "</td>";
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["REMARKS"] + "</td>";
                                }
                                else {
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["ATTENDANCE_TYPE"] + "</td>";
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["PLANED_STATE"] + "</td>";
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["PLANED_DISTRICT"] + "</td>";
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["ACTUAL_VISIT_STATUS"] + "</td>";
                                    HtmlCode += "<td class='Edit'>" + PlanDetails[i]["REMARKS"] + "</td>";
                                }
                                HtmlCode += "</tr>";

                                if ((PlanDetails[i]["ATTENDANCE_TYPE"] != "Holiday" && PlanDetails[i]["ATTENDANCE_TYPE"] != "Leave" && PlanDetails[i]["ATTENDANCE_TYPE"] != "")) {
                                    Noof = Noof + 1;
                                    // var Noof = $('#TotalNoofNos').html();
                                    //  $('#TotalNoofNos').html(parseInt(Noof) + 1);
                                } else {

                                }

                                if (PlanDetails[i]["ACTUAL_VISIT_STATUS"] == "Yes" && PlanDetails[i]["ACTUAL_VISIT_STATUS"] != "") {
                                    NoofYes = NoofYes + 1;
                                    // $('#TotalNoofNosYes').html(parseInt($('#TotalNoofNosYes').html()) + 1);
                                } else if (PlanDetails[i]["ACTUAL_VISIT_STATUS"] == "No") {
                                    TotalNos = TotalNos + 1;
                                } else {

                                }
                            }
                            HtmlCode += "<tr>";
                            HtmlCode += "<td>TOTAL</td>";
                            HtmlCode += "<td></td>";
                            HtmlCode += "<td></td>";
                            HtmlCode += "<td></td>";
                            HtmlCode += "<td id='TotalNoofNos'>" + HeaderData[0]["NO_OF_HQ_VISIT"] + "</td>";
                            //  HtmlCode += "<td id='TotalNoofNosYes'>" + NoofYes + "</td>";
                            HtmlCode += "<td id='TotalNoofNosYes'>" + HeaderData[0]["NO_OF_YES"] + "</td>";
                            HtmlCode += "<td></td>";
                            HtmlCode += "</tr>";

                            $('#TotalDeviation').val(HeaderData[0]["NO_OF_NOS"]);
                            if (parseInt(HeaderData[0]["NO_OF_HQ_VISIT"]) == 0) {
                                $('#Adherence').val(0.00);
                            } else {
                                $('#Adherence').val((parseInt(HeaderData[0]["NO_OF_YES"]) * 100) /parseInt(HeaderData[0]["NO_OF_HQ_VISIT"]));
                            }

                            $('#ZHJPDTable').dataTable().fnDestroy();

                            $('#LoginUserParentId').val(HeaderData[0]["ORG_LEVEL_ID"]);//Created JP parent Id
                            var parentlevelId = $('#LoginUserParentId').val();
                            // $('#LoginUserOrgLevelId').val(HeaderData[0]["ORG_LEVEL_ID"]);

                            var JPLoginOrgLevelId = $('#LoginUserOrgLevelId').val();

                            if ((parentlevelId == JPLoginOrgLevelId) && (HeaderData[0]["STATUS"] != "In Progress")) {
                                $('#ParentJPDStatus').empty();
                                var StatusHtml = '<select class="form-control" id="ZHPlanStatus" data-ng-model="ZHPlanStatus">';
                                StatusHtml += '<option value="">Select</option>';
                                StatusHtml += '<option value="In Progress">In Progress</option>';
                                StatusHtml += '<option value="Waiting for Approval" disabled=disabled>Waiting for Approval</option>';
                                StatusHtml += '<option value="Approved">Approved</option>';
                                StatusHtml += '<option value="Reject">Reject</option>';
                                StatusHtml += '</select>';
                                $('#ParentJPDStatus').append(StatusHtml);
                                $('#ZHJPSendApprove').hide();
                                $('#ZHPlanStatus').val(HeaderData[0]["STATUS"]);
                                $scope.ZHPlanStatus = HeaderData[0]["STATUS"];
                                PresentStatus = HeaderData[0]["STATUS"];
                            }

                            $('#ZHPlanForMonth').val(HeaderData[0]["PLAN_FOR_MONTH"]);

                            $scope.ZHPlanStatus = HeaderData[0]["STATUS"];
                            $('#ZHPlanStatus').val(HeaderData[0]["STATUS"]);
                            // PresentStatus = HeaderData[0]["STATUS"];
                            PlanCreatedUser = HeaderData[0]["SALES_EMPLOYEE_CODE"];
                            $("#ZHJPDTable tbody").remove();
                            $("#ZHJPDTable").append("<tbody>" + HtmlCode + "</tbody>");
                            var table = $('#ZHJPDTable').DataTable({
                                "bSort": false,
                                "bScrollCollapse": true,
                                "paging": false,
                                "ordering": false,
                                "info": false,
                                "bFilter": false,
                                scrollY: "200px",
                                scrollX: true,
                                fixedColumns: {
                                    leftColumns: 0
                                }
                            });

                            //if ((HeaderData[0]["STATUS"] != "In Progress") && (parentlevelId != JPLoginOrgLevelId)) {
                            //    $('#SaveZHJourneyPlan').css("pointer-events", "none");
                            //    $('#ZHJPSendApprove').css("pointer-events", "none");
                            //    $("#ZHJPDTable tbody tr td").removeClass('Edit');
                            //}
                            if ((HeaderData[0]["STATUS"] == "Waiting for Approval") && (parentlevelId != JPLoginOrgLevelId)) {
                                $('#SaveZHJourneyPlan').css("pointer-events", "none");
                                $('#ZHJPSendApprove').css("pointer-events", "none");
                                //  $("#ZHJPDTable tbody tr td").removeClass('Edit');
                            } else if ((HeaderData[0]["STATUS"] == "Approved" || HeaderData[0]["STATUS"] == "Reject") && (parentlevelId != JPLoginOrgLevelId)) {
                                // $('#SaveZHJourneyPlan').css("pointer-events", "none");
                                $('#ZHJPSendApprove').css("pointer-events", "none");
                                table.MakeCellsEditable({
                                    "onUpdate": ZHmyCallbackFunction,
                                    "inputCss": 'my-input-class',
                                    "columns": [5, 6],
                                    "allowNulls": {
                                        "columns": [5, 6],
                                        "errorClass": 'error'
                                    },
                                    "FormName": 'ZHJourneyPlan',
                                    "confirmationButton": {
                                        "confirmCss": 'my-confirm-class',
                                        "cancelCss": 'my-cancel-class'
                                    },
                                    "onkeypress": ''
                                });
                            }

                            if ((HeaderData[0]["STATUS"] == "In Progress") && (parentlevelId == JPLoginOrgLevelId)) {
                                $('#SaveZHJourneyPlan').css("pointer-events", "none");
                                $('#ZHJPSendApprove').css("pointer-events", "none");
                            } else if (((HeaderData[0]["STATUS"] == "Approved") || (HeaderData[0]["STATUS"] == "Reject") || (HeaderData[0]["STATUS"] == "Waiting for Approval")) && (parentlevelId == JPLoginOrgLevelId)) {
                                //$("#ZHJPDTable tbody tr td").removeClass('Edit');
                                $('#ZHJPSendApprove').css("pointer-events", "none");
                            } else { }

                            if ((parentlevelId != JPLoginOrgLevelId) && (HeaderData[0]["STATUS"] == "In Progress")) {
                                table.MakeCellsEditable({
                                    "onUpdate": ZHmyCallbackFunction,
                                    "inputCss": 'my-input-class',
                                    "columns": [2, 3, 4, 5, 6],
                                    "allowNulls": {
                                        "columns": [2, 3, 4, 5, 6],
                                        "errorClass": 'error'
                                    },
                                    "FormName": 'ZHJourneyPlan',
                                    "confirmationButton": {
                                        "confirmCss": 'my-confirm-class',
                                        "cancelCss": 'my-cancel-class'
                                    },
                                    "onkeypress": ''
                                });
                            }
                        }
                        HideLoader();
                    });

                }
            }
        });


    });


    $scope.SaveZHJourneyPlanDetails = function () {
        var parentlevelId = $('#LoginUserParentId').val();
        var JPLoginOrgLevelId = $('#LoginUserOrgLevelId').val();
        var Status = $('#ZHPlanStatus').val();

        if ((parentlevelId == JPLoginOrgLevelId) && (PresentStatus != "In Progress")) {
            Status = $('#ZHPlanStatus option:selected').val();
        }

        if (parentlevelId != JPLoginOrgLevelId) {
            Status = $('#ZHPlanStatus').val();
        }


        var achoretaglength = $('#ZHJPDTable tbody tr td.Edit').children('a').length;
        if ($('table td.Edit').length == $('table td.Edit:empty').length) {
            alert("Please fill atlest one date data");
        } else if (achoretaglength > 0) {
            alert("Please Click on confirm/cancel button");
        } else if (Status == "") {
            alert("Please Select Status");
        }
        else {
            ShowLoader();
            var EditId = $routeParams.ID;
            if (EditId == undefined || EditId == "") {
                EditId = "0";
            }

            $('#ZHJPDTable tbody tr').each(function () {
                var $tds = $(this).find('td');
                var $NotEdittds = $(this).find('td.Edit');
                //if ($NotEdittds.eq(0).text() != "" || $NotEdittds.eq(1).text() != "" || $NotEdittds.eq(2).text() != "" || $NotEdittds.eq(3).text() != "" || $NotEdittds.eq(4).text() != "") {
                if ($NotEdittds.eq(0).text() != "") {
                    if ($tds.eq(0).text() != "TOTAL") {
                        RoleConfig.push({
                            PlanDate: $tds.eq(0).text(),
                            PlanDay: $tds.eq(1).text(),
                            AttendanceType: $tds.eq(2).text(),
                            StateCode: $tds.eq(3).text(),
                            PlanedDistrict: $tds.eq(4).text(),
                            ActualVisitStatus: $tds.eq(5).text(),
                            Remarks: $tds.eq(6).text()
                        });
                    }
                }
            });

            var TotalPlanData = JSON.stringify({
                "EditId": EditId,
                "PlanName": $('#ZHJourneyPlanName').val(),
                "PlanCreatedUser": PlanCreatedUser,
                "SalesEmpCode": $('#SessionUserCode').val(),
                "UserRole": $('#SessionUserRole').val(),
                "PlanForMonth": $('#ZHPlanForMonth').val(),
                // "Status": $('#ZHPlanStatus').val(),
                "Status": Status,
                "ZHPLANDATA": RoleConfig
            });
            DIMSSFDC_ZHFactory.SaveZHJourneyPlan(TotalPlanData).success(function (response) {
                HideLoader();
                if (response == "Save") {
                    if (parentlevelId == JPLoginOrgLevelId) {
                        if (Status == "Waiting for Approval") {
                            alert("Saved successfully");
                        } else {
                            alert("" + Status + " Successfully");
                        }
                    } else {
                        alert("Saved successfully");
                    }
                    // alert("Saved successfully");
                    $scope.go('JourneyPlanList');
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                } else if (response == "Update") {
                    alert("Update Successfully");
                    $scope.go('JourneyPlanList');
                } else if (response == "UpdateFail") {
                    alert("Error Occured while Update");
                } else {
                    alert(response);
                }
            });
        }
    }

    $scope.ZHJPSendForApproval = function () {
        var PresentStatus = $('#ZHPlanStatus').val();
        var JourneyPlanName = $('#ZHJourneyPlanName').val();
        var planformonth = $('#ZHPlanForMonth').val();
        var JPparentlevelId = $('#LoginUserParentId').val();
        var LoginOrgLevelId = $('#LoginUserOrgLevelId').val();
        if (confirm("Are you sure,you want to Send for Approval")) {
            if (PresentStatus == "In Progress") {
                ShowLoader();
                PresentStatus = "Waiting for Approval";
                var jsondata = JSON.stringify({
                    "Status": PresentStatus,
                    "PlanName": JourneyPlanName,
                    "UserCode": $('#SessionUserCode').val(),
                    "UserRole": $('#SessionUserRole').val(),
                    "Planformonth": planformonth
                });
                DIMSSFDC_ZHFactory.UpdateJourneyPlanStatus(jsondata).success(function (res) {
                    HideLoader();
                    if (res == "Update") {
                        alert("Sent for Approval Successfully");
                        $scope.go('JourneyPlanList');
                    } else if (res == "Error") {
                        alert("Something went wrong")
                    } else {
                        alert(res);
                    }
                });
            } else {
                alert("you're not eligible to send for approval");
            }
        }
    }

    function ZHmyCallbackFunction(updatedCell, updatedRow) {
        TotalNoofYes();
        //  console.log("updatedRow :" + updatedRow);
        // console.log("updatedCell :" + updatedCell);
        //console.log("The new value for the cell is: " + updatedCell.data());
        //console.log("The values for each cell in that row are: " + (updatedRow.data()[3]));
        //   console.log("Column Index :" + currentColumnIndex);
        //var RowData = updatedRow.data();
        //for (var i = 0; i < RoleConfig.length; i++) {
        //    if (RoleConfig[i].PlanDate == RowData[0]) {
        //        RoleConfig.splice(i, 1);
        //        break;
        //    }
        //}
        //RoleConfig.push({
        //    PlanDate: RowData[0],
        //    PlanDay: RowData[1],
        //    AttendanceType: RowData[2],
        //    StateCode: RowData[3],
        //    PlanedDistrict: RowData[4],
        //    ActualVisitStatus: RowData[5],
        //    Remarks: RowData[6]
        //});
    }

    function GetMonthDaysAndDates() {
        //    var tableMonth = $('#ZHJPDTable').DataTable();
        $.ajax({
            url: "../../SFDC/GetPresentMonthDays",
            type: 'POST',
            beforeSend: function () {
                ShowLoader();
            },
            success: function (response) {
                if (response != "False") {
                    //   tableMonth.clear().draw();
                    //  tableMonth.destroy();

                    $('#ZHJPDTable').dataTable().fnDestroy();

                    var Res = JSON.parse(response);
                    var HtmlCode = "";
                    for (var i = 0; i < Res.length; i++) {
                        HtmlCode += "<tr>";
                        HtmlCode += "<td>" + Res[i].split(':')[0] + "</td>";
                        HtmlCode += "<td>" + Res[i].split(':')[1] + "</td>";
                        HtmlCode += "<td class='Edit'></td>";
                        HtmlCode += "<td class='Edit'></td>";
                        HtmlCode += "<td class='Edit'></td>";
                        HtmlCode += "<td class='Edit'></td>";
                        HtmlCode += "<td class='Edit'></td>";
                        HtmlCode += "</tr>";
                    }
                    HtmlCode += "<tr>";
                    HtmlCode += "<td>TOTAL</td>";
                    HtmlCode += "<td></td>";
                    HtmlCode += "<td></td>";
                    HtmlCode += "<td></td>";
                    HtmlCode += "<td id='TotalNoofNos'>0</td>";
                    HtmlCode += "<td id='TotalNoofNosYes'>0</td>";
                    HtmlCode += "<td></td>";
                    HtmlCode += "</tr>";
                    $('#ZHPlanForMonth').val(Res[0].split(':')[2]);

                    $('#ZHPJPPlanName').val("ZH - " + $('#SessionUserCode').val() + " - " + Res[0].split(':')[2]);

                    $('#ZHJourneyPlanName').val("ZH - " + $('#SessionUserCode').val() + " - " + Res[0].split(':')[2]);

                    $('#ZHPlanStatus').val("In Progress");

                    $("#ZHJPDTable tbody").remove();
                    $("#ZHJPDTable").append("<tbody>" + HtmlCode + "</tbody>");

                    var table = $('#ZHJPDTable').DataTable({
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        scrollY: "200px",
                        scrollX: true,
                        fixedColumns: {
                            leftColumns: 0
                        }
                    });
                    table.MakeCellsEditable({
                        "onUpdate": ZHmyCallbackFunction,
                        "inputCss": 'my-input-class',
                        "columns": [2, 3, 4, 5, 6],
                        "allowNulls": {
                            "columns": [2, 3, 4, 5, 6],
                            "errorClass": 'error'
                        },
                        "FormName": 'ZHJourneyPlan',
                        "confirmationButton": {
                            "confirmCss": 'my-confirm-class',
                            "cancelCss": 'my-cancel-class'
                        },
                        "onkeypress": ''
                    });
                }
            },
            complete: function () {
                HideLoader();
            },
            error: function (error) {
                HideLoader();
                alert("" + error);
            }
        });


    }

    function GetPresentUserOrgLevelId() {
        var Data = JSON.stringify({
            "LoginUserCode": $('#SessionUserCode').val(),
            "LoginUserRole": $('#SessionUserRole').val()
        });
        DIMSSFDC_ZHFactory.GetJPLogiOrgIds(Data).success(function (res) {
            if (res != "") {
                var Response = JSON.parse(res);
                $('#LoginUserOrgLevelId').val(Response[0]["ORG_LEVEL_ID"]);

            }
        });
    }

    function TotalNoofYes() {
        var ServerDate = "";
        DIMSSFDC_ZHFactory.GetServerDateTime().success(function (res) {           
           

            ServerDate = res.tabledata.replace(/\"/g, "");

            var ServerDate_ = ServerDate.split("/");
            ServerDate_ = new Date(ServerDate_[2], ServerDate_[1] - 1, ServerDate_[0]);


            //var $rows = $('#ZHJPDTable tbody tr').filter(function () {
            //    return $(this).find('td').eq(2).text() == "HQ" || $(this).find('td').eq(2).text() == "Visit";
            //});

            $('#ZHJPDTable tbody tr').filter(function () {
                if ($(this).find('td').eq(2).text() == "Leave" || $(this).find('td').eq(2).text() == "Holiday") {
                    $(this).find('td:gt(2)').removeClass('Edit');
                    $(this).find('td').eq(3).html('');
                    $(this).find('td').eq(4).html('');
                } else if ($(this).find('td:gt(2)').attr('Class') != "Edit") {
                    $(this).find('td:gt(2)').addClass('Edit');
                } else if ($(this).find('td').eq(2).text() == "HQ") {
                    $(this).find('td').eq(3).html('HQ');
                    $(this).find('td').eq(4).html('HQ');
                    $(this).find('td').eq(3).removeClass('Edit');
                    $(this).find('td').eq(4).removeClass('Edit');
                } else {
                    // $(this).find('td').eq(3).html('');
                    //  $(this).find('td').eq(4).html('');
                }
            });
            //$('#ZHJPDTable tbody tr').filter(function () {
            //    if ($(this).find('td').eq(2).text() == "HQ") {
            //        $(this).find('td').eq(3).html('HQ');
            //        $(this).find('td').eq(4).html('HQ');
            //        $(this).find('td').eq(3).removeClass('Edit');
            //        $(this).find('td').eq(4).removeClass('Edit');
            //    } else if ($(this).find('td').eq(3).attr('Class') != "Edit" && $(this).find('td').eq(4).attr('Class') != "Edit") {
            //        $(this).find('td').eq(3).addClass('Edit');
            //        $(this).find('td').eq(4).addClass('Edit');
            //    }
            //    else {                
            //    }
            //});
            
          
            var checking = 0;
            var CountHQVisit = 0;
            var CheckingNoNos = 0;
            var $rowsNo = $('#ZHJPDTable tbody tr').filter(function () {
                if ($(this).find('td').eq(0).text() != "TOTAL") {
                    var arrDate = $(this).find('td').eq(0).text().split("-");
                    arrDate = new Date(arrDate[2], arrDate[1] - 1, arrDate[0]);
                  //  ServerDate = ServerDate.replace('"',' ').trim(); 
                   if (arrDate <= ServerDate_) {
                       if ($(this).find('td').eq(5).text() == "Yes") {
                           checking++;
                       }
                       if ($(this).find('td').eq(2).text() == "HQ" || $(this).find('td').eq(2).text() == "Visit") {
                           CountHQVisit++;
                       }
                       if ($(this).find('td').eq(5).text() == "No") {
                           CheckingNoNos++;
                       }
                       //return $(this).find('td').eq(5).text() == "Yes";

                   } else { false; }
                }
                
            });

            $('#TotalNoofNos').html(CountHQVisit);
            $('#TotalNoofNosYes').html(checking);

            var $rowsNoNos = $('#ZHJPDTable tbody tr').filter(function () {
                return $(this).find('td').eq(5).text() == "No";
            });
            $('#TotalDeviation').val(CheckingNoNos);

            if (CountHQVisit == 0) {
                $('#Adherence').val(0.00);
            } else {
                $('#Adherence').val(((checking * 100) / CountHQVisit).toFixed(2));
            }
        });
    }
});

DIMS.controller('DeviationSummeryReport', function ($scope, $location, DIMSSFDC_ZHFactory, $http, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Deviation Summery Report" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------

    $("#PlanForMonth").datepicker({
        format: "MM-yyyy",
        startView: "months",
        autoclose: true,
        minViewMode: "months"
    });

    angular.element(document).ready(function () {
        $('#FSODeviationId').hide();
        $('#ZHSHTMFSODeviation').DataTable({
            "bSort": false,
            "bScrollCollapse": true,
            "paging": false,
            "ordering": false,
            "info": false,
            "bFilter": false
        });
        DIMSSFDC_ZHFactory.GetServerDateTime().success(function (res) {
            $("#PlanForMonth").datepicker('setEndDate', res.tabledata);
        });
    });

    $scope.GetReportingUsers = function () {
        var planForMonth = $('#PlanForMonth').val();
        if (planForMonth == "") {
            alert("Please Select plan for Month");
        } else {
            var Data = JSON.stringify({
                "LoginUserCode": $('#SessionUserCode').val(),
                "LoginUserRole": $('#SessionUserRole').val(),
                "PlanForMonth": planForMonth
            });
            ShowLoader();
            DIMSSFDC_ZHFactory.GetReportingUsers(Data).success(function (res) {
                if (res != "" && res != "Fail") {
                    var Respo = JSON.parse(res);
                    var HtmlCode = "";
                    for (var i = 0; i < Respo.length; i++) {
                        HtmlCode += "<tr id=" + Respo[i]["EMPLOYEE_CODE"] + " data-role=" + Respo[i]["ORG_LEVEL_NAME"] + ">";
                        HtmlCode += "<td>" + Respo[i]["ORG_LEVEL_NAME"] + "</td>";
                        HtmlCode += "<td style='text-align:center;'>" + Respo[i]["Planned"] + "</td>";
                        HtmlCode += "<td style='text-align:center;'>" + Respo[i]["Actual"] + "</td>";
                        HtmlCode += "<td style='text-align:center;'>" + Respo[i]["Devation"] + "</td>";
                        HtmlCode += "<td style='text-align:center;'>" + Respo[i]["UnPlanned"] + "</td>";
                        HtmlCode += "<td style='text-align:center;'>" + Respo[i]["Total"] + "</td>";
                        HtmlCode += "<td style='text-align:center;'>" + Respo[i]["% Adherence"] + "</td>";
                        HtmlCode += "</tr>";
                    }

                    $('#ZHSHTMFSODeviation').dataTable().fnDestroy();
                    $('#ZHSHTMFSODeviation tbody').empty();
                    $('#ZHSHTMFSODeviation tbody').append(HtmlCode);
                    $('#ZHSHTMFSODeviation').DataTable({
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false
                    });
                }
                HideLoader();
            });
        }
    }

    $scope.GetDevSumReport = function (UserCode, UserRole) {
        $('#FSODeviationId').hide();
        var table = $('#FSODeviation').DataTable();
        var planForMonth = $('#PlanForMonth').val();
        if (planForMonth == "") {
            alert("Please Select plan for Month");
        } else {
            ShowLoader();
            var Data = JSON.stringify({
                "PlanForMonth": $('#PlanForMonth').val(),
                "LoginUserCode": UserCode,
                "LoginUserRole": UserRole
                // "LoginUserCode": $('#SessionUserCode').val(),
                // "LoginUserRole": $('#SessionUserRole').val()
            });
            DIMSSFDC_ZHFactory.GetUserBasedDeviationReport(Data).success(function (res) {
                if (res != "" && res != "Fail") {
                    var Result = JSON.parse(res);
                    var HtmlCode = "<thead>";
                    HtmlCode += "<tr>";
                    for (var Res in Result[0]) {
                        HtmlCode += "<td>" + Res + "</td>";
                    }
                    HtmlCode += "</tr>";
                    HtmlCode += "</thead>";
                    HtmlCode += "<tbody>";
                    for (var i = 0; i < Result.length; i++) {
                        HtmlCode += "<tr>";
                        //HtmlCode += "<td>" + Result[i]["Day"] + "</td>";
                        for (var Res in Result[0]) {
                            HtmlCode += "<td style='text-align:center;'>" + Result[i][Res] + "</td>";
                        }
                        //HtmlCode += "<td>" + Result[i]["Day"] + "</td>";
                        HtmlCode += "</tr>";
                    }
                    HtmlCode += "</tbody>";
                    table.destroy();
                    $('#FSODeviation thead').remove();
                    $('#FSODeviation tbody').remove();
                    //  $('#FSODeviation').dataTable().fnDestroy();

                    $('#FSODeviation').append(HtmlCode);
                }
                $('#FSODeviationId').show();

                $('#FSODeviation').DataTable({
                    "bSort": false,
                    "bScrollCollapse": true,
                    "paging": false,
                    "ordering": false,
                    "info": false,
                    "bFilter": false
                });
                HideLoader();
            });
        }
    }

    $('#ZHSHTMFSODeviation tbody').on('click', 'tr', function () {
        var table = $('#ZHSHTMFSODeviation').DataTable();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        var UserCode = $(this).attr('id');
        var UserRole = $(this).attr('data-role').split('_')[0];
        $scope.GetDevSumReport(UserCode, UserRole);
    });
});

function FillUserBasedStateDropDown(id) {
    var Data = JSON.stringify({
        "UserId": $('#SessionUserCode').val(),
        "UserRole": $('#SessionUserRole').val()
    });

    DIMSSFDCFactoryZH.GetZHBasedStates(Data).success(function (res) {
        if (res != "False") {
            var data = JSON.parse(res);
            $("#" + id).empty();
            $("#" + id).append($("<option></option>").val('').html("Select State"));
            for (var i = 0; i < data.length; i++) {
                $("#" + id).append($("<option></option>").val(data[i]["STATE"] + ":" + data[i]["STATE_DESC"]).html(data[i]["STATE"] + ":" + data[i]["STATE_DESC"]));
            }
        } else {
            $("#" + id).empty();
            $("#" + id).append($("<option></option>").val('').html("Select State"));
        }

    });
}

