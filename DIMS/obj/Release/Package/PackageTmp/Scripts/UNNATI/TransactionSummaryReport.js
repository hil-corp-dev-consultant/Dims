var TransactionSummarySKUWiseColName;
var TransactionSummaryMemberWiseColName;
var DimsFactoryScope;
DIMS.controller('UnnatiTransactionSummaryReportCtrl', function ($scope, $location, DIMSFactory, $compile) {
    DimsFactoryScope = DIMSFactory;
    $('#undo_redo_to').empty();

    UnnatiTransactionSummaryReportScope = $scope;
    $scope.templatesettings = { HeaderTitle: "UnnatiTransactionSummaryReportCtrl" };
    var UserCode = $("#USERCODE_UnnatiTransactionSummary").val();
    var UserType = $("#USERTYPE_UnnatiTransactionSummary").val();
    // UserCode = "561";

    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    $scope.TransactionSummaryMemberType = "ALL";
    $scope.TransactionSummaryReportWise = "SKU Wise"

    var ResultSKUWise;
    var ResultMemberWise;

    var SKUWiseData = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        ReportName: "UnnatiTransactionSummarySKUWise"
    });
    var DataWise = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        UserRoleType: UserType,
        ReportName: "UnnatiTransactionSummarySKUWise"
    });

    var DataForUnnati = JSON.stringify({
        "Role": UserType,
        "UserCode": UserCode
    });
    ShowLoader();

    if (UserType == "STOCKIST") {

        $('#TransactionSummaryZone').prop("disabled", true);
        $('#TransactionSummaryState').prop("disabled", true);
        $('#TransactionSummaryDistrict').prop("disabled", true);

        $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    $('#TransactionSummaryZone').empty();

                    if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                        $("#TransactionSummaryZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                    }

                    $("#TransactionSummaryZone").val(Result.dtZone[0]["ZONE_CODE"]);


                    $('#TransactionSummaryState').empty();

                    if (Result.dtState[0]["STATE_NAME"] != "All") {
                        $("#TransactionSummaryState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                    }

                    $("#TransactionSummaryState").val(Result.dtState[0]["STATE_CODE"]);

                    $('#TransactionSummaryDistrict').empty();

                    if (Result.dtDistrict[0]["DISTRICT"] != "All") {
                        $("#TransactionSummaryDistrict").append($("<option></option>").val(Result.dtDistrict[0]["DISTRICT"]).html(Result.dtDistrict[0]["DISTRICT"]));
                    }

                }

            }
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });;
        $scope.TransactionSummaryMemberType = "Stockist";

        $('#TransactionSummaryMemberType').prop("disabled", true);

    } else if (UserType == "FSO" || UserType == "FSO_BU2" || UserType == "TM") {

        $('#TransactionSummaryZone').prop("disabled", true);
        $('#TransactionSummaryState').prop("disabled", true);
        $('#TransactionSummaryDistrict').prop("disabled", false);
        $('#TransactionSummaryMemberType').prop("disabled", false);

        $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    $('#TransactionSummaryZone').empty();
                  
                    if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                        $("#TransactionSummaryZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                    }

                    $("#TransactionSummaryZone").val(Result.dtZone[0]["ZONE_CODE"]);


                    $('#TransactionSummaryState').empty();

                    if (Result.dtState[0]["STATE_NAME"] != "All") {
                        $("#TransactionSummaryState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                    }

                    $("#TransactionSummaryState").val(Result.dtState[0]["STATE_CODE"]);

                    $('#TransactionSummaryDistrict').empty();
                    $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.dtDistrict.length; i++) {
                        if (Result.dtDistrict[i]["DISTRICT"] != "All") {
                            $("#TransactionSummaryDistrict").append($("<option></option>").val(Result.dtDistrict[i]["DISTRICT"]).html(Result.dtDistrict[i]["DISTRICT"]));
                        }
                    }

                    $("#TransactionSummaryDistrict").val("ALL");

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
    else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC" || UserType == "ADMIN" || UserType == "NSH" || UserType == "NCC" || UserType == "COO" || UserType == "CFO" || UserType == "SBU1MARKETING_HEAD" || UserType == "CFO" || UserType == "BU_FIN_HEAD" || UserType == "FIN_CONTROLLER/CS") {
        $('#TransactionSummaryZone').prop("disabled", false);
        $('#TransactionSummaryState').prop("disabled", false);
        $('#TransactionSummaryStatus').prop("disabled", false);

        $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        // Zone Drop down 
        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {

                    if (Result.dtZone.length == 1) {
                        $('#TransactionSummaryZone').empty();
                        if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                            $("#TransactionSummaryZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                        }
                        $('#TransactionSummaryZone').prop("disabled", true);
                        GetStateMasterSummaryForZones();
                    }
                    else {

                        $('#TransactionSummaryZone').empty();
                        $("#TransactionSummaryZone").append($("<option></option>").val("ALL").html("ALL"));
                        for (var i = 0; i < Result.dtZone.length; i++) {
                            if (Result.dtZone[i]["ZONE_NAME"] != "All") {
                                $("#TransactionSummaryZone").append($("<option></option>").val(Result.dtZone[i]["ZONE_CODE"]).html(Result.dtZone[i]["ZONE_NAME"]));
                            }
                        }
                    }
                   // $("#TransactionSummaryZone").val("ALL");


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

        $('#TransactionSummaryZone').prop("disabled", true);
        $('#TransactionSummaryState').prop("disabled", false);
        $('#TransactionSummaryStatus').prop("disabled", false);

        $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        // Zone Drop down 
        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    $('#TransactionSummaryZone').empty();

                            $("#TransactionSummaryZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));

                            if (Result.dtState.length == 1) {
                                $("#TransactionSummaryState").empty();
                                if (Result.dtState[0]["STATE_NAME"] != "All") {
                                    $("#TransactionSummaryState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                                }
                                $('#TransactionSummaryState').prop("disabled", true);
                                GetDistrictMasterSummaryForState();
                            }
                            else {

                                $('#TransactionSummaryState').empty();
                                $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
                                for (var i = 0; i < Result.dtState.length; i++) {
                                    if (Result.dtState[i]["STATE_NAME"] != "All") {
                                        $("#TransactionSummaryState").append($("<option></option>").val(Result.dtState[i]["STATE_CODE"]).html(Result.dtState[i]["STATE_NAME"]));
                                    }
                                }
                            }
                }

            }
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });;

       
    }
    HideLoader();

    $scope.DownloadFile = function (typeoffile) {

        var FileName = "TransactionSummaryReport";
        if ($scope.TransactionSummaryFromDate == "" || $scope.TransactionSummaryFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionSummaryToDate == "" || $scope.TransactionSummaryToDate == undefined) {
            alert("To Date cannot be empty");
        }
        else if ($("#TransactionSummaryReport_Table tbody tr").length <= 0) {
            alert("No Data Available");
        }
        else {
            var STDATE = ($scope.TransactionSummaryFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionSummaryToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }

            if (!$('#TransactionSummaryReport_Table').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }

            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            //var WhereCondition = " where CONVERT(DATE,TRANSACTION_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,TRANSACTION_DATE)<='" + finalEndDate + "' ";
            var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'    ";
            var ReportName = "";
            if ($scope.TransactionSummaryReportWise == "SKU Wise") {
                $("#ReportWiseLabel").text("Report SKU Wise");
                ReportName = "UnnatiTransactionSummarySKUWise";
                if ($scope.TransactionSummaryMemberType == "ALL")
                { }
                else {
                    WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                }

                if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                    alert("Select zone");
                    return;
                } else {
                    if ($("#TransactionSummaryZone").val() == "ALL") {
                       
                            var ZonewithComma = "";

                            $('#TransactionSummaryZone option').each(function () {
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
                        WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                    }
                }

                if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                    alert("Select State");
                    return;
                } else {
                    if ($("#TransactionSummaryState").val() == "ALL") {
                      
                            var StatewithComma = "";

                            $('#TransactionSummaryState option').each(function () {
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
                        }
                    else {
                        WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                    }
                }


                if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                    alert("Select District");
                    return;
                } else {
                    if ($("#TransactionSummaryDistrict").val() == "ALL") {
                        
                            var DistrictwithComma = "";

                            $('#TransactionSummaryDistrict option').each(function () {
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
                        }

                        else {
                        WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                    }
                }
                if (UserType == "STOCKIST") {
                    if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                        //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                        WhereCondition += " AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    } else {

                    }

                } else {

                }
                //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
                //    alert("Select Taluk");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryTaluk == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactionSummaryTaluk + "' ";
                //    }
                //}


                //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
                //    alert("Select Village");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryVillage == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
                //    }
                //}
                WhereCondition += " AND STATUS!='Rejected' and PRODUCT_NAME!='' GROUP BY PRODUCT_NAME";
            }
            else if ($scope.TransactionSummaryReportWise == "Member Wise") {
                $("#ReportWiseLabel").text("Report Member Wise");
                ReportName = "UnnatiTransactionSummaryMemberWise";
                if ($scope.TransactionSummaryMemberType == "ALL")
                { }
                else {
                    WhereCondition += " AND  UT.MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                }



                if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                    alert("Select zone");
                    return;
                } else {
                    if ($("#TransactionSummaryZone").val() == "ALL") {
                       
                            var ZonewithComma = "";

                            $('#TransactionSummaryZone option').each(function () {
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
                                WhereCondition = WhereCondition + " AND UT.ZONE IN (" + ZonewithComma + ") ";
                            }
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UT.ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                    }
                }

                if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                    alert("Select State");
                    return;
                } else {
                    if ($("#TransactionSummaryState").val() == "ALL") {
                       
                            var StatewithComma = "";

                            $('#TransactionSummaryState option').each(function () {
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
                                WhereCondition = WhereCondition + " AND  UPPER(UT.STATE) IN (" + StatewithComma + ") ";
                            }
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UPPER(UT.STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                    }
                }


                if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                    alert("Select District");
                    return;
                } else {
                    if ($("#TransactionSummaryDistrict").val() == "ALL") {
                       
                            var DistrictwithComma = "";

                            $('#TransactionSummaryDistrict option').each(function () {
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
                                WhereCondition = WhereCondition + " AND  UPPER(UT.DISTRICT) IN (" + DistrictwithComma + ") ";
                            }
                        }

                     else {
                        WhereCondition = WhereCondition + " AND UPPER(UT.DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                    }
                }

                if (UserType == "STOCKIST") {
                    if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                        //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                        WhereCondition += " AND  UT.MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    } else {

                    }

                } else {

                }
                //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
                //    alert("Select Taluk");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryTaluk == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND UT.TALUK='" + $scope.TransactionSummaryTaluk + "' ";
                //    }
                //}


                //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
                //    alert("Select Village");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryVillage == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND UT.VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
                //    }
                //}

                WhereCondition += " AND STATUS!='Rejected' and UT.PRODUCT_NAME!='' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "

               // WhereCondition += "AND STATUS!='Rejected' AND UT.TRANSACTION_ID not like '[_]%' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "

            }

       

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: ReportName,
                FromDate: $("#TransactionSummaryFromDate").val(),
                ToDate: $("#TransactionSummaryToDate").val(),
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

    $scope.GetColumns = function () {

        DIMSFactory.getReportListColumnNamesData(SKUWiseData).success(function (response) {

            ResultSKUWise = JSON.parse(response.tabledata);
            if (ResultSKUWise != "") {
                $scope.UserDefaultListColumnNames = ResultSKUWise["UserDefaultListColumnNames"];
                if (ResultSKUWise.hasOwnProperty('UserListColumnNames')) {
                    var data1 = JSON.parse(ResultSKUWise["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];
                    CustomColumnID = ResultSKUWise["UserListID"];
                    $('#undo_redo_to').empty(); var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i], "bSortable": true
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    TransactionSummarySKUWiseColName = ColArray;
                } else {
                    var data1 = JSON.parse(ResultSKUWise["UserDefaultListColumnNames"]);
                    var selectedcolumnname = data1["ColumnNames"];
                    CustomColumnID = "0";
                    $('#undo_redo_to').empty(); var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i]
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    TransactionSummarySKUWiseColName = ColArray;
                }
            }

        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });

        var MemberWiseData = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiTransactionSummaryMemberWise"
        });

        DIMSFactory.getReportListColumnNamesData(MemberWiseData).success(function (response) {


            ResultMemberWise = JSON.parse(response.tabledata);
            if (ResultMemberWise != "") {
                $scope.UserDefaultListColumnNames = ResultMemberWise["UserDefaultListColumnNames"];
                if (ResultMemberWise.hasOwnProperty('UserListColumnNames')) {
                    var data1 = JSON.parse(ResultMemberWise["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];
                    CustomColumnID = ResultMemberWise["UserListID"];
                    $('#undo_redo_to').empty(); var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i], "bSortable": true
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    TransactionSummaryMemberWiseColName = ColArray;
                } else {

                    var data1 = JSON.parse(ResultMemberWise["UserDefaultListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];
                    CustomColumnID = "0";
                    $('#undo_redo_to').empty(); var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i]
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    TransactionSummaryMemberWiseColName = ColArray;
                }
            }

        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });;
    }

    $scope.GetColumns();

    $scope.GetTransactionSummary = function () {
        if ($scope.TransactionSummaryFromDate == "" || $scope.TransactionSummaryFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionSummaryToDate == "" || $scope.TransactionSummaryToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.TransactionSummaryFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionSummaryToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            //var WhereCondition = " where CONVERT(DATE,TRANSACTION_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,TRANSACTION_DATE)<='" + finalEndDate + "' ";
            var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
            var ReportName = "";



            if ($scope.TransactionSummaryReportWise == "SKU Wise") {
                UserSelectedColumnName = TransactionSummarySKUWiseColName;
                $("#ReportWiseLabel").text("Report SKU Wise");
                ReportName = "UnnatiTransactionSummarySKUWise";

                if ($scope.TransactionSummaryMemberType == "ALL")
                { } else {
                    WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                }
                // WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";

                if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                    alert("Select zone");
                    return;
                } else {
                    if ($("#TransactionSummaryZone").val() == "ALL") {
                       
                            var ZonewithComma = "";

                            $('#TransactionSummaryZone option').each(function () {
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
                        }

                     else {
                        WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                    }
                }

                if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                    alert("Select State");
                    return;
                } else {
                    if ($("#TransactionSummaryState").val() == "ALL") {
                       
                            var StatewithComma = "";

                            $('#TransactionSummaryState option').each(function () {
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
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                    }
                }


                if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                    alert("Select District");
                    return;
                } else {
                    if ($("#TransactionSummaryDistrict").val() == "ALL") {
                       
                            var DistrictwithComma = "";

                            $('#TransactionSummaryDistrict option').each(function () {
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
                        }

                     else {
                        WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                    }
                }
                if (UserType == "STOCKIST") {
                    if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                        //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                        WhereCondition += " AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    } else {

                    }

                } else {

                }
                //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
                //    alert("Select Taluk");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryTaluk == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactionSummaryTaluk + "' ";
                //    }
                //}


                //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
                //    alert("Select Village");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryVillage == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
                //    }
                //}
                WhereCondition += " AND STATUS!='Rejected' and PRODUCT_NAME!='' GROUP BY PRODUCT_NAME";
            } else if ($scope.TransactionSummaryReportWise == "Member Wise") {
                UserSelectedColumnName = TransactionSummaryMemberWiseColName;
                $("#ReportWiseLabel").text("Report Member Wise");
                ReportName = "UnnatiTransactionSummaryMemberWise";
                // WhereCondition += " AND  UT.MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";

                if ($scope.TransactionSummaryMemberType == "ALL")
                { } else {
                    WhereCondition += " AND  UT.MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                }
                if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                    alert("Select zone");
                    return;
                } else {
                    if ($("#TransactionSummaryZone").val() == "ALL") {
                       
                            var ZonewithComma = "";

                            $('#TransactionSummaryZone option').each(function () {
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
                                WhereCondition = WhereCondition + " AND UT.ZONE IN (" + ZonewithComma + ") ";
                            }
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UT.ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                    }
                }

                if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                    alert("Select State");
                    return;
                } else {
                    if ($("#TransactionSummaryState").val() == "ALL") {
                       
                            var StatewithComma = "";

                            $('#TransactionSummaryState option').each(function () {
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
                                WhereCondition = WhereCondition + " AND  UPPER(UT.STATE) IN (" + StatewithComma + ") ";
                            }
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UPPER(UT.STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                    }
                }


                if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                    alert("Select District");
                    return;
                } else {
                    if ($("#TransactionSummaryDistrict").val() == "ALL") {
                       
                            var DistrictwithComma = "";

                            $('#TransactionSummaryDistrict option').each(function () {
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
                                WhereCondition = WhereCondition + " AND  UPPER(UT.DISTRICT) IN (" + DistrictwithComma + ") ";
                            }
                        }

                     else {
                        WhereCondition = WhereCondition + " AND UPPER(UT.DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                    }
                }

                if (UserType == "STOCKIST") {
                    if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                        //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                        WhereCondition += " AND  UT.MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    } else {

                    }

                } else {

                }
                //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
                //    alert("Select Taluk");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryTaluk == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND UT.TALUK='" + $scope.TransactionSummaryTaluk + "' ";
                //    }
                //}


                //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
                //    alert("Select Village");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryVillage == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND UT.VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
                //    }
                //}
               
                 WhereCondition += "AND STATUS!='Rejected' and UT.PRODUCT_NAME!='' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "
                //WhereCondition += "AND STATUS!='Rejected' AND UT.TRANSACTION_ID not like '[_]%' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "
                
            }
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: ReportName,
                FromDate: $("#TransactionSummaryFromDate").val(),
                ToDate: $("#TransactionSummaryToDate").val(),
                WhereClause: WhereCondition, "Type": "Get"

            });
       
            ShowLoader();

            DIMSFactory.getReportData(Data).success(function (response) {
                //getLookUpData_Reports(ReportList_data, "", "", "TransactionSummaryReport_Table");
                getLookUpData_Reports_ServerSideBinding("", "", "", "TransactionSummaryReport_Table", UserSelectedColumnName);

                if (ReportName == "UnnatiTransactionSummarySKUWise") {

                    //WhereCondition = WhereCondition.replace("GROUP BY PRODUCT_NAME", "");

                    var RD = SumQuantity(WhereCondition, ReportName);

                    $(".SKUWiseTotals").css('display', 'block');
                    $(".MemberWiseTotals").css('display', 'none');

                    if (RD == "") {
                        $("#Total_Purchase_Quantity_Mtr_TOTAL").val("");
                        $("#No_of_Member_Purchased_TOTAL").val("");
                        $("#Total_Points_Earned_TOTAL").val("");
                    }
                    else {
                        RD = JSON.parse(RD);
                        $("#Total_Purchase_Quantity_Mtr_TOTAL").val(RD["TotalPurchaseQuantityMtr"]);
                        $("#No_of_Member_Purchased_TOTAL").val(RD["TotalNoofMemberPurchased"]);
                        $("#Total_Points_Earned_TOTAL").val(RD["TotalPointsEarned"]);
                    }
                }
                else if (ReportName == "UnnatiTransactionSummaryMemberWise") {

                    //WhereCondition = WhereCondition.replace("GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UT.FSO_NAME", "");

                    var RD = SumQuantity(WhereCondition, ReportName);

                    $(".SKUWiseTotals").css('display', 'none');
                    $(".MemberWiseTotals").css('display', 'block');

                    if (RD == "") {
                        $("#No_of_Times_Purchased_TOTAL").val("");
                        $("#Total_Volume_Purchased_Mtr_TOTAL").val("");
                        $("#Total_Earned_Points_TOTAL").val("");
                    }
                    else {
                        RD = JSON.parse(RD);
                        $("#No_of_Times_Purchased_TOTAL").val(RD["No_of_Times_Purchased_TOTAL"]);
                        $("#Total_Volume_Purchased_Mtr_TOTAL").val(RD["Total_Volume_Purchased_Mtr_TOTAL"]);
                        $("#Total_Earned_Points_TOTAL").val(RD["Total_Earned_Points_TOTAL"]);
                    }
                    HideLoader();
                }

            }).error(function () {
                alert("Technical error has been occured");
                HideLoader();
            });


        }// closing of else of data
    }

    // Open popup for columns selection

    $scope.OpenColumnEditing = function () {

        $("#ColumnEditingModal").modal('show');
        // $('#undo_redo').empty();

        if ($scope.TransactionSummaryReportWise == "SKU Wise") {
            if (ResultSKUWise != "") {
                $scope.UserDefaultListColumnNames = ResultSKUWise["UserDefaultListColumnNames"];
                if (ResultSKUWise.hasOwnProperty('UserListColumnNames')) {
                    var data1 = JSON.parse(ResultSKUWise["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];
                    CustomColumnID = ResultSKUWise["UserListID"];
                    $('#undo_redo_to').empty();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                }
                else {
                    var data1 = JSON.parse(ResultSKUWise["UserDefaultListColumnNames"]);
                    var selectedcolumnname = data1["ColumnNames"];
                    $('#undo_redo_to').empty(); var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                }
            }
        }
        else if ($scope.TransactionSummaryReportWise == "Member Wise") {
            //ShowLoader();
            if (ResultMemberWise != "") {

                $scope.UserDefaultListColumnNames = ResultMemberWise["UserDefaultListColumnNames"];

                if (ResultMemberWise.hasOwnProperty('UserListColumnNames')) {

                    var data1 = JSON.parse(ResultMemberWise["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = ResultMemberWise["UserListID"];

                    $('#undo_redo_to').empty();
                    for (var i = 0; i < selectedcolumnname.length; i++) {

                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }

                }
                else {
                    var data1 = JSON.parse(ResultMemberWise["UserDefaultListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];
                    $('#undo_redo_to').empty(); var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                }

            }
        }

        $('#undo_redo').empty();

        var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

        for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
            $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
        }


        //  $('#undo_redo').refresh();

        $('#undo_redo').multiselect();
        if (ControllerName != "UnnatiTransactionSummaryReportCtrl") {
            ControllerName = "UnnatiTransactionSummaryReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiTransactionSummaryReportCtrl");

            $compile(elem.contents())(UnnatiTransactionSummaryReportScope);
        }

        //$("#ColumnEditingModal").modal('show');
       // HideLoader();
    }


    // View Columns seelected
    $scope.ViewColumnEditing = function () {

        var STDATE = ($scope.TransactionSummaryFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.TransactionSummaryToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }
        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
        //var WhereCondition = " where CONVERT(DATE,TRANSACTION_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,TRANSACTION_DATE)<='" + finalEndDate + "' ";
        var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
        var ReportName = "";
        if ($scope.TransactionSummaryReportWise == "SKU Wise") {
            ReportName = "UnnatiTransactionSummarySKUWise";

            if ($scope.TransactionSummaryMemberType == "ALL")
            { } else {
                WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
            }
            //WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";

            if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#TransactionSummaryZone").val() == "ALL") {
                   
                        var ZonewithComma = "";

                        $('#TransactionSummaryZone option').each(function () {
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
                    }

                 else {
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                }
            }

            if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#TransactionSummaryState").val() == "ALL") {
                   
                        var StatewithComma = "";

                        $('#TransactionSummaryState option').each(function () {
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
                    }
                 else {
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                }
            }


            if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                alert("Select District");
                return;
            } else {
                if ($("#TransactionSummaryDistrict").val() == "ALL") {
                    
                        var DistrictwithComma = "";

                        $('#TransactionSummaryDistrict option').each(function () {
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
                    }

                 else {
                    WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                }
            }

            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition += " AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                } else {

                }

            } else {

            }
            //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
            //    alert("Select Taluk");
            //    return;
            //} else {
            //    if ($scope.TransactionSummaryTaluk == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactionSummaryTaluk + "' ";
            //    }
            //}


            //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
            //    alert("Select Village");
            //    return;
            //} else {
            //    if ($scope.TransactionSummaryVillage == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
            //    }
            //}
            WhereCondition += " AND STATUS!='Rejected' and PRODUCT_NAME!='' GROUP BY PRODUCT_NAME";
        } else if ($scope.TransactionSummaryReportWise == "Member Wise") {
            ReportName = "UnnatiTransactionSummaryMemberWise";
            // WhereCondition += " AND  UT.MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
            if ($scope.TransactionSummaryMemberType == "ALL")
            { } else {
                WhereCondition += " AND  UT.MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
            }

            if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#TransactionSummaryZone").val() == "ALL") {
                   
                        var ZonewithComma = "";

                        $('#TransactionSummaryZone option').each(function () {
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
                            WhereCondition = WhereCondition + " AND UT.ZONE IN (" + ZonewithComma + ") ";
                        }
                    }
                 else {
                    WhereCondition = WhereCondition + " AND UT.ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                }
            }

            if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#TransactionSummaryState").val() == "ALL") {
                   
                        var StatewithComma = "";

                        $('#TransactionSummaryState option').each(function () {
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
                            WhereCondition = WhereCondition + " AND  UPPER(UT.STATE) IN (" + StatewithComma + ") ";
                        }
                    }
                 else {
                    WhereCondition = WhereCondition + " AND UPPER(UT.STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                }
            }


            if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                alert("Select District");
                return;
            } else {
                if ($("#TransactionSummaryDistrict").val() == "ALL") {
                    
                        var DistrictwithComma = "";

                        $('#TransactionSummaryDistrict option').each(function () {
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
                            WhereCondition = WhereCondition + " AND  UPPER(UT.DISTRICT) IN (" + DistrictwithComma + ") ";
                        }
                    }

                 else {
                    WhereCondition = WhereCondition + " AND UPPER(UT.DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                }
            }

            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition += " AND  UT.MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                } else {

                }

            } else {

            }
            //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
            //    alert("Select Taluk");
            //    return;
            //} else {
            //    if ($scope.TransactionSummaryTaluk == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND UT.TALUK='" + $scope.TransactionSummaryTaluk + "' ";
            //    }
            //}


            //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
            //    alert("Select Village");
            //    return;
            //} else {
            //    if ($scope.TransactionSummaryVillage == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND UT.VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
            //    }
            //}

            WhereCondition += " AND STATUS!='Rejected' and UT.PRODUCT_NAME!='' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "
           // WhereCondition += "AND STATUS!='Rejected' AND UT.TRANSACTION_ID not like '[_]%' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "

        }

        DIMSFactory.ViewColumnEditing(ReportName, UserCode, WhereCondition,$("#TransactionSummaryFromDate").val(),$("#TransactionSummaryToDate").val());

    }

    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function

    $scope.SaveColumnEditingData = function () {
        if ($scope.TransactionSummaryFromDate == "" || $scope.TransactionSummaryFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionSummaryToDate == "" || $scope.TransactionSummaryToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.TransactionSummaryFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionSummaryToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            //var WhereCondition = " where CONVERT(DATE,TRANSACTION_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,TRANSACTION_DATE)<='" + finalEndDate + "' ";
            var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' ";
            var ReportName = "";
            if ($scope.TransactionSummaryReportWise == "SKU Wise") {
                $("#ReportWiseLabel").text("Report SKU Wise");
                ReportName = "UnnatiTransactionSummarySKUWise";
                //WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                if ($scope.TransactionSummaryMemberType == "ALL")
                { } else {
                    WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                }
                if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                    alert("Select zone");
                    return;
                } else {
                    if ($("#TransactionSummaryZone").val() == "ALL") {
                       
                            var ZonewithComma = "";

                            $('#TransactionSummaryZone option').each(function () {
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
                        }

                     else {
                        WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                    }
                }

                if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                    alert("Select State");
                    return;
                } else {
                    if ($("#TransactionSummaryState").val() == "ALL") {
                      
                            var StatewithComma = "";

                            $('#TransactionSummaryState option').each(function () {
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
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                    }
                }


                if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                    alert("Select District");
                    return;
                } else {
                    if ($("#TransactionSummaryDistrict").val() == "ALL") {
                       
                            var DistrictwithComma = "";

                            $('#TransactionSummaryDistrict option').each(function () {
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
                        }

                     else {
                        WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                    }
                }

                if (UserType == "STOCKIST") {
                    if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                        //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                        WhereCondition += " AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    } else {

                    }

                } else {

                }
                //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
                //    alert("Select Taluk");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryTaluk == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactionSummaryTaluk + "' ";
                //    }
                //}


                //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
                //    alert("Select Village");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryVillage == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
                //    }
                //}
                WhereCondition += " AND STATUS!='Rejected' and PRODUCT_NAME!='' GROUP BY PRODUCT_NAME";
            } else if ($scope.TransactionSummaryReportWise == "Member Wise") {
                $("#ReportWiseLabel").text("Report Member Wise");
                ReportName = "UnnatiTransactionSummaryMemberWise";
                //WhereCondition += " AND  UT.MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                if ($scope.TransactionSummaryMemberType == "ALL")
                { } else {
                    WhereCondition += " AND UT. MEMEBER_TYPE='" + $scope.TransactionSummaryMemberType + "' ";
                }
                if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
                    alert("Select zone");
                    return;
                } else {
                    if ($("#TransactionSummaryZone").val() == "ALL") {
                       
                            var ZonewithComma = "";

                            $('#TransactionSummaryZone option').each(function () {
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
                                WhereCondition = WhereCondition + " AND UT.ZONE IN (" + ZonewithComma + ") ";
                            }
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UT.ZONE='" + $("#TransactionSummaryZone option:selected").text() + "' ";
                    }
                }

                if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
                    alert("Select State");
                    return;
                } else {
                    if ($("#TransactionSummaryState").val() == "ALL") {
                       
                            var StatewithComma = "";

                            $('#TransactionSummaryState option').each(function () {
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
                                WhereCondition = WhereCondition + " AND  UPPER(UT.STATE) IN (" + StatewithComma + ") ";
                            }
                        }
                     else {
                        WhereCondition = WhereCondition + " AND UPPER(UT.STATE)='" + $("#TransactionSummaryState option:selected").text().toUpperCase() + "' ";
                    }
                }


                if ($("#TransactionSummaryDistrict").text() == "Select" || $("#TransactionSummaryDistrict").text() == undefined) {
                    alert("Select District");
                    return;
                } else {
                    if ($("#TransactionSummaryDistrict").val() == "ALL") {
                      
                            var DistrictwithComma = "";

                            $('#TransactionSummaryDistrict option').each(function () {
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
                                WhereCondition = WhereCondition + " AND  UPPER(UT.DISTRICT) IN (" + DistrictwithComma + ") ";
                            }
                        }

                     else {
                        WhereCondition = WhereCondition + " AND UPPER(UT.DISTRICT)='" + $("#TransactionSummaryDistrict option:selected").text().toUpperCase() + "' ";
                    }
                }

                if (UserType == "STOCKIST") {
                    if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                        //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                        WhereCondition += " AND  UT.MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    } else {

                    }

                } else {

                }
                //if ($scope.TransactionSummaryTaluk == "Select" || $scope.TransactionSummaryTaluk == undefined) {
                //    alert("Select Taluk");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryTaluk == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND UT.TALUK='" + $scope.TransactionSummaryTaluk + "' ";
                //    }
                //}


                //if ($scope.TransactionSummaryVillage == "Select" || $scope.TransactionSummaryVillage == undefined) {
                //    alert("Select Village");
                //    return;
                //} else {
                //    if ($scope.TransactionSummaryVillage == "ALL")
                //    { } else {
                //        WhereCondition = WhereCondition + " AND UT.VILLAGE='" + $scope.TransactionSummaryVillage + "' ";
                //    }
                //}

                 WhereCondition += " AND STATUS!='Rejected' and UT.PRODUCT_NAME!='' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "
               // WhereCondition += "AND STATUS!='Rejected' AND UT.TRANSACTION_ID not like '[_]%' GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UME.FSO_NAME "

            }
            ShowLoader();
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: ReportName,
                WhereClause: WhereCondition,
                FromDate: $("#TransactionSummaryFromDate").val(),
                ToDate: $("#TransactionSummaryToDate").val(),
                "Type": "Get"

            });



            DIMSFactory.SaveColumnEditingData_InputParameter(ReportName, UserCode, WhereCondition, Data, "TransactionSummaryReport_Table")

            setTimeout(function () { $scope.GetColumns() }, 3000)
            HideLoader();
        }

    }
   
});

// Zone drop  down on change functionality

function GetStateMasterSummary()
{
    var ZoneCodeData = "";
    if ($("#TransactionSummaryZone").text() == "Select" || $("#TransactionSummaryZone").text() == undefined) {
    } else {
        //if ($("#TransactionSummaryZone").val() == "ALL")
        //{
        //    if ($('#TransactionSummaryZone option[value!="ALL"]').length > 0) {
        //        $('#TransactionSummaryZone option').each(function () {
        //            if ($(this).val() != "ALL") {
        //                if (ZoneCodeData == "") {
        //                    ZoneCodeData = "" + $(this).text() + "";
        //                }
        //                else {
        //                    ZoneCodeData = ZonewithComma + "," + $(this).text() + "";
        //                }
        //            }
        //        });
        //    }
        //}
        ShowLoader();
        if ($("#TransactionSummaryZone").val() == "ALL") {

            $("#TransactionSummaryState").empty();
            $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));

            $("#TransactionSummaryDistrict").empty();
            $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));
            HideLoader();

            return;
        }
        if (ZoneCodeData == "") {
            ZoneCodeData = $("#TransactionSummaryZone").val();
        }

        //alert($("#TransactionSummaryZone").val());
        $('#TransactionSummaryState').empty();
        $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));


        $("#TransactionSummaryDistrict").empty();
        $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        var ZoneData = JSON.stringify({
            Zone_Code: $("#TransactionSummaryZone").val()
        });
        DimsFactoryScope.getStateDataForUnnati(ZoneData).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);
                if (Result != "") {

                    //$('#TransactionSummaryState').empty();
                    //$("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.length; i++) {
                        if (Result[i]["STATE_NAME"] != "All") {
                            $("#TransactionSummaryState").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_NAME"]));
                        }
                    }

                    //$scope.TransactionSummaryStateArray = "ALL";

                    //$scope.TransactionSummaryDistrictArray = [];
                    //$scope.TransactionSummaryDistrict = "ALL";
                    //$scope.TransactionSummaryTalukArray = [];
                    //$scope.TransactionSummaryTaluk = "ALL";
                    //$scope.TransactionSummaryVillageArray = [];
                    //$scope.TransactionSummaryVillage = "ALL";
                    HideLoader();

                }

            }
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }
}



// State drop  down on change functionality

function GetDistrictMasterSummary()
{
    
    if ($("#TransactionSummaryState").text() == "Select" || $("#TransactionSummaryState").text() == undefined) {
    } else {
        // UserType = "ZH";
        ShowLoader();
        if ($("#TransactionSummaryState").val() == "ALL") {
            $("#TransactionSummaryDistrict").empty();
            $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));
            HideLoader();

            return;
        }

        var Zone_StateData = JSON.stringify({
            State: $("#TransactionSummaryState option:selected").text().toUpperCase()
        });

        $("#TransactionSummaryDistrict").empty();
        $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        DimsFactoryScope.getDistrictData(Zone_StateData).success(function (response) {
            if (response != "") {

                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $("#TransactionSummaryDistrict").empty();
                    $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.length; i++) {

                        $("#TransactionSummaryDistrict").append($("<option></option>").val(Result[i]["DISTRICT"]).html(Result[i]["DISTRICT"]));
                    }
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

function GetStateMasterSummaryForZones() {

    $('#TransactionSummaryState').empty();
    $("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));


    $("#TransactionSummaryDistrict").empty();
    $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        var ZoneData = JSON.stringify({
            Zone_Code: $("#TransactionSummaryZone").val()
        });
        DimsFactoryScope.getStateDataForUnnati(ZoneData).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);
                if (Result != "") {

                    //$('#TransactionSummaryState').empty();
                    //$("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.length; i++) {
                        if (Result[i]["STATE_NAME"] != "All") {
                            $("#TransactionSummaryState").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_NAME"]));
                        }
                    }

                    //$scope.TransactionSummaryStateArray = "ALL";

                    //$scope.TransactionSummaryDistrictArray = [];
                    //$scope.TransactionSummaryDistrict = "ALL";
                    //$scope.TransactionSummaryTalukArray = [];
                    //$scope.TransactionSummaryTaluk = "ALL";
                    //$scope.TransactionSummaryVillageArray = [];
                    //$scope.TransactionSummaryVillage = "ALL";
                    HideLoader();

                }

            }
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }

// Get Districts For States

function GetDistrictMasterSummaryForState() {


        var Zone_StateData = JSON.stringify({
            State: $("#TransactionSummaryState option:selected").text().toUpperCase()
        });

        $("#TransactionSummaryDistrict").empty();
        $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));

        DimsFactoryScope.getDistrictData(Zone_StateData).success(function (response) {
            if (response != "") {

                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $("#TransactionSummaryDistrict").empty();
                    $("#TransactionSummaryDistrict").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.length; i++) {

                        $("#TransactionSummaryDistrict").append($("<option></option>").val(Result[i]["DISTRICT"]).html(Result[i]["DISTRICT"]));
                    }
                }

            }
            HideLoader();
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }
