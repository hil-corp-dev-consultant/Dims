var DIMSUnnatiFactoryEnrollment;

DIMS.controller('UnnatiEnrollmentDetailReportCtrl', function ($scope, $location, DIMSFactory, $compile, DIMSUnnatiFactory) {
    $('#undo_redo_to').empty();
    UnnatiEnrollmentDetailReportScope = $scope;

    DIMSUnnatiFactoryEnrollment = DIMSFactory;

    $scope.EnrollDetailMemberType = "ALL";

    var UserCode = $("#USERCODE_UnnatiEnrollment").val();
    var UserType = $("#USERTYPE_UnnatiEnrollment").val();
 

    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        UserRoleType: UserType,
        ReportName: "UnnatiEnrollmentDetail"
    });

   
    var DataForUnnati = JSON.stringify({
        "Role": UserType,
        "UserCode": UserCode
    });
    ShowLoader();
    if (UserType == "FSO" || UserType == "FSO_BU2" || UserType == "TM") {

        $('#EnrollDetailZone').prop("disabled", true);
        $('#EnrollDetailState').prop("disabled", true);
        $('#EnrollDetailDistrict').prop("disabled", false);
        // $('#TransactionSummaryMemberType').prop("disabled", false);

        $("#EnrollDetailZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#EnrollDetailState").append($("<option></option>").val("ALL").html("ALL"));
        $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));


        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    $('#EnrollDetailZone').empty();

                    if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                        $("#EnrollDetailZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                    }

                    $("#EnrollDetailZone").val(Result.dtZone[0]["ZONE_CODE"]);


                    $('#EnrollDetailState').empty();

                    if (Result.dtState[0]["STATE_NAME"] != "All") {
                        $("#EnrollDetailState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                    }

                    $("#EnrollDetailState").val(Result.dtState[0]["STATE_CODE"]);

                    $('#EnrollDetailDistrict').empty();
                    $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.dtDistrict.length; i++) {
                        if (Result.dtDistrict[i]["DISTRICT"] != "All") {
                            $("#EnrollDetailDistrict").append($("<option></option>").val(Result.dtDistrict[i]["DISTRICT"]).html(Result.dtDistrict[i]["DISTRICT"]));
                        }
                    }

                    $("#EnrollDetailDistrict").val("ALL");

                    //$scope.TransactionSummaryTalukArray = [];
                    //$scope.TransactionSummaryTaluk = "ALL";
                    //$scope.TransactionSummaryVillageArray = [];
                    //$scope.TransactionSummaryVillage = "ALL";
                }

            }
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });;

    }
    else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC" || UserType == "ADMIN" || UserType == "NSH" || UserType == "NCC" || UserType == "COO" || UserType == "CFO" || UserType == "SBU1MARKETING_HEAD" || UserType == "CFO" || UserType == "BU_FIN_HEAD" || UserType == "FIN_CONTROLLER/CS") 
    {


        $('#EnrollDetailZone').prop("disabled", false);
        $('#EnrollDetailState').prop("disabled", false);
       // $('#TransactionSummaryStatus').prop("disabled", false);

        $("#EnrollDetailZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#EnrollDetailState").append($("<option></option>").val("ALL").html("ALL"));
        $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));

        // Zone Drop down 
        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    if (Result.dtZone.length == 1) {
                        $('#EnrollDetailZone').empty();
                        if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                            $("#EnrollDetailZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                        }
                        $('#EnrollDetailZone').prop("disabled", true);
                        GetStateMasterEnrollmentForZones();
                    }
                    else {
                        $('#EnrollDetailZone').empty();
                        $("#EnrollDetailZone").append($("<option></option>").val("ALL").html("ALL"));
                        for (var i = 0; i < Result.dtZone.length; i++) {
                            if (Result.dtZone[i]["ZONE_NAME"] != "All") {
                                $("#EnrollDetailZone").append($("<option></option>").val(Result.dtZone[i]["ZONE_CODE"]).html(Result.dtZone[i]["ZONE_NAME"]));
                            }
                        }
                        $("#EnrollDetailZone").val("ALL");

                    }
                    //$scope.TransSummaryZoneArray = [];
                    //$scope.TransSummaryZoneArray = [{ ZONE_NAME: 'ALL' }];

                    //$scope.TransSummaryZoneArray = Result.dtZone;

                    //$scope.TransSummaryZoneArray = "ALL";
                }

            }
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });

    }
    else if (UserType == "SH") {

        $('#EnrollDetailZone').prop("disabled", true);
        $('#EnrollDetailState').prop("disabled", false);
       // $('#TransactionSummaryStatus').prop("disabled", false);

        $("#EnrollDetailZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#EnrollDetailState").append($("<option></option>").val("ALL").html("ALL"));
        $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));

        // Zone Drop down 
        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {

                    $('#EnrollDetailZone').empty();

                    $("#EnrollDetailZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));


                    if (Result.dtState.length == 1) {
                        $("#EnrollDetailState").empty();
                        if (Result.dtState[0]["STATE_NAME"] != "All") {
                            $("#EnrollDetailState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                        }
                        $('#EnrollDetailState').prop("disabled", true);
                        GetDistrictMasterEnrollmentForStates();
                    }
                    else {

                        $('#EnrollDetailState').empty();
                        $("#EnrollDetailState").append($("<option></option>").val("ALL").html("ALL"));
                        for (var i = 0; i < Result.dtState.length; i++) {
                            if (Result.dtState[i]["STATE_NAME"] != "All") {
                                $("#EnrollDetailState").append($("<option></option>").val(Result.dtState[i]["STATE_CODE"]).html(Result.dtState[i]["STATE_NAME"]));
                            }
                        }
                    }
                   // $scope.TransactionSummaryStateArray = "ALL";

                    //$scope.TransactionSummaryDistrictArray = [];
                    //$scope.TransactionSummaryDistrict = "ALL";
                    //$scope.TransactionSummaryTalukArray = [];
                    //$scope.TransactionSummaryTaluk = "ALL";
                    //$scope.TransactionSummaryVillageArray = [];
                    //$scope.TransactionSummaryVillage = "ALL";
                }

            }
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });

    }
    HideLoader();
    $scope.DownloadFile = function (typeoffile) {

        var FileName = "EnrollmentDetailReport";
        if ($scope.EnrollementDetailFromDate == "" || $scope.EnrollementDetailFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.EnrollementDetailToDate == "" || $scope.EnrollementDetailToDate == undefined) {
            alert("To Date cannot be empty");
        }
        else if ($('#EnrollmentDetailReport_Table tbody tr').length <=0) {

            alert("No Data Available");
        }
        else {
            var STDATE = ($scope.EnrollementDetailFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.EnrollementDetailToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            if (!$('#EnrollmentDetailReport_Table').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

            var WhereCondition = " where CONVERT(DATE,ENROLLEMENT_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ENROLLEMENT_DATE)<='" + finalEndDate + "' ";
            if ($scope.EnrollDetailMemberType == "ALL")
            { } else {
                WhereCondition += "  AND  MEMBER_TYPE='" + $scope.EnrollDetailMemberType + "' ";
            }

            if ($("#EnrollDetailZone").text() == "Select" || $("#EnrollDetailZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#EnrollDetailZone").val() == "ALL") {

                    var ZonewithComma = "";

                    $('#EnrollDetailZone option').each(function () {
                        if ($(this).val() != "ALL") {
                            if (ZonewithComma == "") {
                                ZonewithComma = "'" + $(this).text() + "'";
                            }
                            else {
                                ZonewithComma = ZonewithComma + ",'" + $(this).text() + "'";
                            }
                        }
                    });
                    if (ZonewithComma != "") {
                        WhereCondition = WhereCondition + " AND ZONE IN (" + ZonewithComma + ") ";
                    }

                } else {
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#EnrollDetailZone option:selected").text() + "' ";
                }
            }

            if ($("#EnrollDetailState").text() == "Select" || $("#EnrollDetailState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#EnrollDetailState").val() == "ALL") {
                    var StatewithComma = "";

                    $('#EnrollDetailState option').each(function () {
                        if ($(this).val() != "ALL") {

                            if (StatewithComma == "") {
                                StatewithComma = "'" + $(this).text().toUpperCase() + "'";
                            }
                            else {
                                StatewithComma = StatewithComma + ",'" + $(this).text().toUpperCase() + "'";
                            }
                        }
                    });
                    if (StatewithComma != "") {
                        WhereCondition = WhereCondition + " AND  UPPER(STATE) IN (" + StatewithComma + ") ";
                    }
                } else {
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#EnrollDetailState option:selected").text().toUpperCase() + "' ";
                }
            }


            if ($("#EnrollDetailDistrict").text() == "Select" || $("#EnrollDetailDistrict").text() == undefined) {
                alert("Select District");
                return;
            } else {
                if ($("#EnrollDetailDistrict").val() == "ALL") {
                    var DistrictwithComma = "";

                    $('#EnrollDetailDistrict option').each(function () {
                        if ($(this).val() != "ALL") {

                            if (DistrictwithComma == "") {
                                DistrictwithComma = "'" + $(this).text().toUpperCase() + "'";
                            }
                            else {
                                DistrictwithComma = DistrictwithComma + ",'" + $(this).text().toUpperCase() + "'";
                            }
                        }
                    });
                    if (DistrictwithComma != "") {
                        WhereCondition = WhereCondition + " AND  UPPER(DISTRICT) IN (" + DistrictwithComma + ") ";
                    }


                } else {
                    WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#EnrollDetailDistrict option:selected").text().toUpperCase() + "' ";
                }
            }


            //if ($scope.EnrollDetailTaluk == "Select" || $scope.EnrollDetailTaluk == undefined) {
            //    alert("Select Taluk");
            //    return;
            //} else {
            //    if ($scope.EnrollDetailTaluk == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.EnrollDetailTaluk + "' ";
            //    }
            //}


            //if ($scope.EnrollDetailVillage == "Select" || $scope.EnrollDetailVillage == undefined) {
            //    alert("Select Village");
            //    return;
            //} else {
            //    if ($scope.EnrollDetailVillage == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.EnrollDetailVillage + "' ";
            //    }
            //}

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiEnrollmentDetail",
                WhereClause: WhereCondition

            });
            $.ajax({

                url: '../../Home/SetInputData',
                type: "POST",
                datatype: "JSON",
                data: { InputData: Data, ReportType: typeoffile, FileName: FileName },
                async: false,
                cache: false,
                beforeSend: function () {
                    ShowLoader();
                },
                success: function (response) {
                    window.location.href = '../../Home/GenerateReport';
                },
                complete: function () {
                    HideLoader();
                },
                error: function () {
                    alert("Technical error has been occured.Please try again later");
                    HideLoader();
                }
            });
        }

    }
    DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {

        var Result = JSON.parse(response.tabledata);

        if (Result != "") {
            $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
            if (Result.hasOwnProperty('UserListColumnNames')) {
                var data1 = JSON.parse(Result["UserListColumnNames"]);

                var selectedcolumnname = data1["ColumnNames"];

                CustomColumnID = Result["UserListID"];
                $('#undo_redo_to').empty();
                var ColArray = new Array();
                for (var i = 0; i < selectedcolumnname.length; i++) {
                    ColArray.push({
                        "data": selectedcolumnname[i],
                        "name": selectedcolumnname[i], "bSortable": true
                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            } else {

                var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                var selectedcolumnname = data1["ColumnNames"];

                CustomColumnID = "0";

                $('#undo_redo_to').empty();
                var ColArray = new Array();
                for (var i = 0; i < selectedcolumnname.length; i++) {
                    ColArray.push({
                        "data": selectedcolumnname[i],
                        "name": selectedcolumnname[i],
                         "bSortable": "true"
                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            }


        }

    }).error(function () {
        alert("Technical error has been occured");
        HideLoader();
    });
    $scope.templatesettings = { HeaderTitle: "UnnatiEnrollmentDetailReportCtrl" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };

    // Submit 
    $scope.GetEnrollementDetailReport = function () {
        if ($scope.EnrollementDetailFromDate == "" || $scope.EnrollementDetailFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.EnrollementDetailToDate == "" || $scope.EnrollementDetailToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.EnrollementDetailFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.EnrollementDetailToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

            var WhereCondition = " where CONVERT(DATE,ENROLLEMENT_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ENROLLEMENT_DATE)<='" + finalEndDate + "' ";
            if ($scope.EnrollDetailMemberType == "ALL")
            {
            } else {
                WhereCondition += "  AND  MEMBER_TYPE='" + $scope.EnrollDetailMemberType + "' ";
            }


            if ($("#EnrollDetailZone").text() == "Select" || $("#EnrollDetailZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#EnrollDetailZone").val() == "ALL")
                {
                    
                        var ZonewithComma = "";

                        $('#EnrollDetailZone option').each(function () {
                            if ($(this).val() != "ALL") {
                                if (ZonewithComma == "") {
                                    ZonewithComma = "'" + $(this).text() + "'";
                                }
                                else {
                                    ZonewithComma = ZonewithComma + ",'" + $(this).text() + "'";
                                }
                            }
                        });
                        if (ZonewithComma != "") {
                            WhereCondition = WhereCondition + " AND ZONE IN (" + ZonewithComma + ") ";
                        }

                } else {
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#EnrollDetailZone option:selected").text() + "' ";
                }
            }

            if ($("#EnrollDetailState").text() == "Select" || $("#EnrollDetailState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#EnrollDetailState").val() == "ALL")
                {
                        var StatewithComma = "";

                        $('#EnrollDetailState option').each(function () {
                            if ($(this).val() != "ALL") {

                                if (StatewithComma == "") {
                                    StatewithComma = "'" + $(this).text().toUpperCase() + "'";
                                }
                                else {
                                    StatewithComma = StatewithComma + ",'" + $(this).text().toUpperCase() + "'";
                                }
                            }
                        });
                        if (StatewithComma != "") {
                            WhereCondition = WhereCondition + " AND  UPPER(STATE) IN (" + StatewithComma + ") ";
                        }
                } else {
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#EnrollDetailState option:selected").text().toUpperCase() + "' ";
                }
            }


            if ($("#EnrollDetailDistrict").text() == "Select" || $("#EnrollDetailDistrict").text() == undefined) {
                alert("Select District");
                return;
            } else {
                if ($("#EnrollDetailDistrict").val() == "ALL")
                {
                        var DistrictwithComma = "";

                        $('#EnrollDetailDistrict option').each(function () {
                            if ($(this).val() != "ALL") {

                                if (DistrictwithComma == "") {
                                    DistrictwithComma = "'" + $(this).text().toUpperCase() + "'";
                                }
                                else {
                                    DistrictwithComma = DistrictwithComma + ",'" + $(this).text().toUpperCase() + "'";
                                }
                            }
                        });
                        if (DistrictwithComma != "") {
                            WhereCondition = WhereCondition + " AND  UPPER(DISTRICT) IN (" + DistrictwithComma + ") ";
                        }


                } else {
                    WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#EnrollDetailDistrict option:selected").text().toUpperCase() + "' ";
                }
            }

            //if ($scope.EnrollDetailTaluk == "Select" || $scope.EnrollDetailTaluk == undefined) {
            //    alert("Select Taluk");
            //    return;
            //} else {
            //    if ($scope.EnrollDetailTaluk == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.EnrollDetailTaluk + "' ";
            //    }
            //}


            //if ($scope.EnrollDetailVillage == "Select" || $scope.EnrollDetailVillage == undefined) {
            //    alert("Select Village");
            //    return;
            //} else {
            //    if ($scope.EnrollDetailVillage == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.EnrollDetailVillage + "' ";
            //    }
            //}

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiEnrollmentDetail",
                WhereClause: WhereCondition,
                "Type": "Get"

            });
           // alert(Data);
            DIMSFactory.getReportData(Data).success(function (response) {
                ShowLoader();
                getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "EnrollmentDetailReport_Table", UserSelectedColumnName);

                var RD = SumQuantity(WhereCondition, "EnrollmentDetailReport");

                if (RD == "") {
                    $("#Point_Balance_TOTAL").val("");
                    $("#Points_Earned_TOTAL").val("");
                }
                else {
                    $(".PageTotals").css('display', 'block');
                    RD = JSON.parse(RD);
                    $("#Point_Balance_TOTAL").val(RD[0]["Point_Balance"]);
                    $("#Points_Earned_TOTAL").val(RD[0]["Points_Earned"]);
                }
                HideLoader();
            }).error(function () {
                alert("Technical error has been occured");
                HideLoader();
            });

        }
    }

    // Open popup for columns selection
    $scope.OpenColumnEditing = function () {

        DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {

            var Result = JSON.parse(response.tabledata);

            if (Result != "") {
                $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                if (Result.hasOwnProperty('UserListColumnNames')) {
                    var data1 = JSON.parse(Result["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = Result["UserListID"];
                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i], "bSortable": true
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                } else {

                    var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = "0";

                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i],
                            "bSortable": "true"
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                }

                $('#undo_redo').empty();

                var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

                for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
                    $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
                }


                //  $('#undo_redo').refresh();

                $('#undo_redo').multiselect();

            }

        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });



       
        if (ControllerName != "UnnatiEnrollmentDetailReportCtrl") {
            ControllerName = "UnnatiEnrollmentDetailReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiEnrollmentDetailReportCtrl");

            $compile(elem.contents())(UnnatiEnrollmentDetailReportScope);
        }

        $("#ColumnEditingModal").modal('show');

    }

    $scope.ViewColumnEditing = function () {

        var STDATE = ($scope.EnrollementDetailFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.EnrollementDetailToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }

        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
        var WhereCondition = " where CONVERT(DATE,ENROLLEMENT_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ENROLLEMENT_DATE)<='" + finalEndDate + "' ";
        if ($scope.EnrollDetailMemberType == "ALL")
        { } else {
            WhereCondition += "  AND  MEMBER_TYPE='" + $scope.EnrollDetailMemberType + "' ";
        }

        if ($("#EnrollDetailZone").text() == "Select" || $("#EnrollDetailZone").text() == undefined) {
            alert("Select zone");
            return;
        } else {
            if ($("#EnrollDetailZone").val() == "ALL") {

                var ZonewithComma = "";

                $('#EnrollDetailZone option').each(function () {
                    if ($(this).val() != "ALL") {
                        if (ZonewithComma == "") {
                            ZonewithComma = "'" + $(this).text() + "'";
                        }
                        else {
                            ZonewithComma = ZonewithComma + ",'" + $(this).text() + "'";
                        }
                    }
                });
                if (ZonewithComma != "") {
                    WhereCondition = WhereCondition + " AND ZONE IN (" + ZonewithComma + ") ";
                }

            } else {
                WhereCondition = WhereCondition + " AND ZONE='" + $("#EnrollDetailZone option:selected").text() + "' ";
            }
        }

        if ($("#EnrollDetailState").text() == "Select" || $("#EnrollDetailState").text() == undefined) {
            alert("Select State");
            return;
        } else {
            if ($("#EnrollDetailState").val() == "ALL") {
                var StatewithComma = "";

                $('#EnrollDetailState option').each(function () {
                    if ($(this).val() != "ALL") {

                        if (StatewithComma == "") {
                            StatewithComma = "'" + $(this).text().toUpperCase() + "'";
                        }
                        else {
                            StatewithComma = StatewithComma + ",'" + $(this).text().toUpperCase() + "'";
                        }
                    }
                });
                if (StatewithComma != "") {
                    WhereCondition = WhereCondition + " AND  UPPER(STATE) IN (" + StatewithComma + ") ";
                }
            } else {
                WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#EnrollDetailState option:selected").text().toUpperCase() + "' ";
            }
        }


        if ($("#EnrollDetailDistrict").text() == "Select" || $("#EnrollDetailDistrict").text() == undefined) {
            alert("Select District");
            return;
        } else {
            if ($("#EnrollDetailDistrict").val() == "ALL") {
                var DistrictwithComma = "";

                $('#EnrollDetailDistrict option').each(function () {
                    if ($(this).val() != "ALL") {

                        if (DistrictwithComma == "") {
                            DistrictwithComma = "'" + $(this).text().toUpperCase() + "'";
                        }
                        else {
                            DistrictwithComma = DistrictwithComma + ",'" + $(this).text().toUpperCase() + "'";
                        }
                    }
                });
                if (DistrictwithComma != "") {
                    WhereCondition = WhereCondition + " AND  UPPER(DISTRICT) IN (" + DistrictwithComma + ") ";
                }


            } else {
                WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#EnrollDetailDistrict option:selected").text().toUpperCase() + "' ";
            }
        }


        //if ($scope.EnrollDetailTaluk == "Select" || $scope.EnrollDetailTaluk == undefined) {
        //    alert("Select Taluk");
        //    return;
        //} else {
        //    if ($scope.EnrollDetailTaluk == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.EnrollDetailTaluk + "' ";
        //    }
        //}


        //if ($scope.EnrollDetailVillage == "Select" || $scope.EnrollDetailVillage == undefined) {
        //    alert("Select Village");
        //    return;
        //} else {
        //    if ($scope.EnrollDetailVillage == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.EnrollDetailVillage + "' ";
        //    }
        //}

        DIMSFactory.ViewColumnEditing("UnnatiEnrollmentDetail", UserCode, WhereCondition, $("#EnrollementDetailFromDate").val(), $("#EnrollementDetailToDate"));

    }

    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var STDATE = ($scope.EnrollementDetailFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.EnrollementDetailToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }

        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

        var WhereCondition = " where CONVERT(DATE,ENROLLEMENT_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ENROLLEMENT_DATE)<='" + finalEndDate + "' ";
        if ($scope.EnrollDetailMemberType == "ALL")
        { } else {
            WhereCondition += "  AND  MEMBER_TYPE='" + $scope.EnrollDetailMemberType + "' ";
        }

        if ($("#EnrollDetailZone").text() == "Select" || $("#EnrollDetailZone").text() == undefined) {
            alert("Select zone");
            return;
        } else {
            if ($("#EnrollDetailZone").val() == "ALL") {

                var ZonewithComma = "";

                $('#EnrollDetailZone option').each(function () {
                    if ($(this).val() != "ALL") {
                        if (ZonewithComma == "") {
                            ZonewithComma = "'" + $(this).text() + "'";
                        }
                        else {
                            ZonewithComma = ZonewithComma + ",'" + $(this).text() + "'";
                        }
                    }
                });
                if (ZonewithComma != "") {
                    WhereCondition = WhereCondition + " AND ZONE IN (" + ZonewithComma + ") ";
                }

            } else {
                WhereCondition = WhereCondition + " AND ZONE='" + $("#EnrollDetailZone option:selected").text() + "' ";
            }
        }

        if ($("#EnrollDetailState").text() == "Select" || $("#EnrollDetailState").text() == undefined) {
            alert("Select State");
            return;
        } else {
            if ($("#EnrollDetailState").val() == "ALL") {
                var StatewithComma = "";

                $('#EnrollDetailState option').each(function () {
                    if ($(this).val() != "ALL") {

                        if (StatewithComma == "") {
                            StatewithComma = "'" + $(this).text().toUpperCase() + "'";
                        }
                        else {
                            StatewithComma = StatewithComma + ",'" + $(this).text().toUpperCase() + "'";
                        }
                    }
                });
                if (StatewithComma != "") {
                    WhereCondition = WhereCondition + " AND  UPPER(STATE) IN (" + StatewithComma + ") ";
                }
            } else {
                WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#EnrollDetailState option:selected").text().toUpperCase() + "' ";
            }
        }


        if ($("#EnrollDetailDistrict").text() == "Select" || $("#EnrollDetailDistrict").text() == undefined) {
            alert("Select District");
            return;
        } else {
            if ($("#EnrollDetailDistrict").val() == "ALL") {
                var DistrictwithComma = "";

                $('#EnrollDetailDistrict option').each(function () {
                    if ($(this).val() != "ALL") {

                        if (DistrictwithComma == "") {
                            DistrictwithComma = "'" + $(this).text().toUpperCase() + "'";
                        }
                        else {
                            DistrictwithComma = DistrictwithComma + ",'" + $(this).text().toUpperCase() + "'";
                        }
                    }
                });
                if (DistrictwithComma != "") {
                    WhereCondition = WhereCondition + " AND  UPPER(DISTRICT) IN (" + DistrictwithComma + ") ";
                }


            } else {
                WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#EnrollDetailDistrict option:selected").text().toUpperCase() + "' ";
            }
        }


        //if ($scope.EnrollDetailTaluk == "Select" || $scope.EnrollDetailTaluk == undefined) {
        //    alert("Select Taluk");
        //    return;
        //} else {
        //    if ($scope.EnrollDetailTaluk == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.EnrollDetailTaluk + "' ";
        //    }
        //}


        //if ($scope.EnrollDetailVillage == "Select" || $scope.EnrollDetailVillage == undefined) {
        //    alert("Select Village");
        //    return;
        //} else {
        //    if ($scope.EnrollDetailVillage == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.EnrollDetailVillage + "' ";
        //    }
        //}

        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiEnrollmentDetail",
            WhereClause: WhereCondition,
            "Type": "Get"

        });
        ShowLoader();
        DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiEnrollmentDetail", UserCode, WhereCondition, Data, "EnrollmentDetailReport_Table");
        HideLoader();


    }


});

// Zone drop  down on change functionality

function GetStateMasterEnrollment() {
    //alert($("#EnrollDetailZone").val());
    var ZoneCodeData = "";

    if ($("#EnrollDetailZone").val() == "Select" || $("#EnrollDetailZone").val() == undefined) {
    } else {
        ShowLoader();
        if ($("#EnrollDetailZone").val() == "ALL") {

            //if ($('#EnrollDetailZone option[value!="ALL"]').length > 0) {
            //    $('#EnrollDetailZone option').each(function () {
            //        if ($(this).val() != "ALL") {
            //            if (ZoneCodeData == "") {
            //                ZoneCodeData = "" + $(this).text() + "";
            //            }
            //            else {
            //                ZoneCodeData = ZonewithComma + "," + $(this).text() + "";
            //            }
            //        }
            //    });
            //}

            $('#EnrollDetailState').empty();
            $("#EnrollDetailState").append($("<option></option>").val("ALL").html("ALL"));

            $('#EnrollDetailDistrict').empty();
            $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));
            HideLoader();
            return;
            
        }
       
        $('#EnrollDetailState').empty();
        $("#EnrollDetailState").append($("<option></option>").val("ALL").html("ALL"));

        $('#EnrollDetailDistrict').empty();
        $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));
        var ZoneData = JSON.stringify({
            //ID: UserCode,
            //UserCode: UserCode,
            //UserRoleType: UserType,
            Zone_Code: $("#EnrollDetailZone").val()
        });
        DIMSUnnatiFactoryEnrollment.getStateDataForUnnati(ZoneData).success(function (response) {


            if (response != "") {
                var Result = JSON.parse(response);
                if (Result != "") {

                    //$('#TransactionSummaryState').empty();
                    //$("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.length; i++) {
                        if (Result[i]["STATE_NAME"] != "All") {
                            $("#EnrollDetailState").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_NAME"]));
                        }
                    }

                    $("#EnrollDetailState").val("ALL");

                    //$scope.TransactionSummaryStateArray = [];
                    //$scope.TransactionSummaryStateArray = [{ STATE_NAME: 'ALL' }];
                    //$scope.TransactionSummaryStateArray = Result;

                    //$scope.TransactionSummaryStateArray = "ALL";


                }

            }
            HideLoader();
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }
}

// State drop  down on change functionality

function GetDistrictMasterEnrollment()
{
    if ($("#EnrollDetailState").val() == "Select" || $("#EnrollDetailState").val() == undefined) {
    } else {
        // UserType = "ZH";
        ShowLoader();
        if($("#EnrollDetailState option:selected").val()=="ALL")
        {
            $("#EnrollDetailDistrict").empty();
            $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));
            HideLoader();
            return;
        }
        var Zone_StateData = JSON.stringify({
            State: $("#EnrollDetailState option:selected").text().toUpperCase()
        });

        $("#EnrollDetailDistrict").empty();
        $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));

        DIMSUnnatiFactoryEnrollment.getDistrictData(Zone_StateData).success(function (response) {

            if (response != "") {

                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $("#EnrollDetailDistrict").empty();
                    $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));

                    //$scope.TransactionSummaryDistrictArray = [];
                    // $scope.TransactionSummaryDistrictArray = [{ DISTRICT: 'ALL' }];
                    //$scope.TransactionSummaryDistrictArray = Result;

                    //$scope.TransactionSummaryDistrict = "ALL";

                    for (var i = 0; i < Result.length; i++) {

                        $("#EnrollDetailDistrict").append($("<option></option>").val(Result[i]["DISTRICT"]).html(Result[i]["DISTRICT"]));
                    }

                    //$scope.TransactionSummaryTalukArray = [];
                    //$scope.TransactionSummaryTaluk = "ALL";
                    //$scope.TransactionSummaryVillageArray = [];
                    //$scope.TransactionSummaryVillage = "ALL";
                }

            }
            HideLoader();
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }
}

// Get States For Zone

function GetStateMasterEnrollmentForZones() {

    $('#EnrollDetailState').empty();
    $("#EnrollDetailState").append($("<option></option>").val("ALL").html("ALL"));

    $('#EnrollDetailDistrict').empty();
    $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));

        var ZoneData = JSON.stringify({
            //ID: UserCode,
            //UserCode: UserCode,
            //UserRoleType: UserType,
            Zone_Code: $("#EnrollDetailZone").val()
        });
        DIMSUnnatiFactoryEnrollment.getStateDataForUnnati(ZoneData).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);
                if (Result != "") {

                    for (var i = 0; i < Result.length; i++) {
                        if (Result[i]["STATE_NAME"] != "All") {
                            $("#EnrollDetailState").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_NAME"]));
                        }
                    }

                    $("#EnrollDetailState").val("ALL");
                }

            }
            HideLoader();
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }


// Get Districts For States

function GetDistrictMasterEnrollmentForStates() {
    
        var Zone_StateData = JSON.stringify({
            State: $("#EnrollDetailState option:selected").text().toUpperCase()
        });

        $("#EnrollDetailDistrict").empty();
        $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));

        DIMSUnnatiFactoryEnrollment.getDistrictData(Zone_StateData).success(function (response) {

            if (response != "") {

                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $("#EnrollDetailDistrict").empty();
                    $("#EnrollDetailDistrict").append($("<option></option>").val("ALL").html("ALL"));

                    for (var i = 0; i < Result.length; i++) {

                        $("#EnrollDetailDistrict").append($("<option></option>").val(Result[i]["DISTRICT"]).html(Result[i]["DISTRICT"]));
                    }

                }

            }
            HideLoader();
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }
