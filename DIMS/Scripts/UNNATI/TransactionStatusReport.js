var UnnatiTransactionStatusReportFactory;
DIMS.controller('UnnatiTransactionStatusReportCtrl', function ($scope, $location, DIMSFactory, $compile) {
    $('#undo_redo_to').empty();
    UnnatiTransactionStatusReportScope = $scope;
    UnnatiTransactionStatusReportFactory = DIMSFactory;

    $scope.templatesettings = { HeaderTitle: "UnnatiTransactionStatusReportCtrl" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };

    $scope.TransactionStatusStatus = "ALL";
    //$scope.TransactionStatusZone = "ALL";
    //$scope.TransactionStatusState = "ALL";
    var UserCode = $("#USERCODE_UnnatiTransactionStatus").val();
    var UserType = $("#USERTYPECODE_UnnatiTransactionStatus").val();



    // UserCode = "561";
    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        UserRoleType: UserType,
        ReportName: "UnnatiTransactionStatus"
    });

    var DataForUnnati = JSON.stringify({
        "Role": UserType,
        "UserCode": UserCode
    });

    ShowLoader();
    if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC" || UserType == "ADMIN" || UserType == "NSH" || UserType == "NCC" || UserType == "COO" || UserType == "CFO" || UserType == "SBU1MARKETING_HEAD" || UserType == "CFO" || UserType == "BU_FIN_HEAD" || UserType == "FIN_CONTROLLER/CS") {
        $('#TransactionStatusZone').prop("disabled", false);
        $('#TransactionStatusState').prop("disabled", false);
        $('#TransactionStatusStatus').prop("disabled", false);


        $("#TransactionStatusZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));

        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);
                if (Result != "") {
                    if (Result.dtZone.length == 1) {
                        $('#TransactionStatusZone').empty();
                        if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                            $("#TransactionStatusZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                        }
                        $('#TransactionStatusZone').prop("disabled", true);
                        GetStateMasterStatusForZone();
                    }
                    else {
                        $('#TransactionStatusZone').empty();
                        $("#TransactionStatusZone").append($("<option></option>").val("ALL").html("ALL"));
                        for (var i = 0; i < Result.dtZone.length; i++) {
                            if (Result.dtZone[i]["ZONE_NAME"] != "All") {
                                $("#TransactionStatusZone").append($("<option></option>").val(Result.dtZone[i]["ZONE_CODE"]).html(Result.dtZone[i]["ZONE_NAME"]));
                            }
                        }
                        $("#TransactionStatusZone").val("ALL");
                    }
                    //$scope.TransStatusZoneArray = [];
                    //$scope.TransStatusZoneArray = [{ ZONE_NAME: 'ALL' }];
                    //$scope.TransStatusZoneArray = Result.dtZone;

                    //$scope.TransactionStatusZone = "ALL";
                }

            }
            HideLoader();
        }).error(function (ex) {
            alert("Technical error has been occured");
            HideLoader();
        });
    }
    else if (UserType == "SH") {
        $('#TransactionStatusZone').prop("disabled", true);
        $('#TransactionStatusState').prop("disabled", false);
        $('#TransactionStatusStatus').prop("disabled", false);

        $("#TransactionStatusZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));


        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    //alert(Result.dtZone);

                    $('#TransactionStatusZone').empty();
                    //$("#TransactionStatusZone").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.dtZone.length; i++) {
                        if (Result.dtZone[i]["ZONE_NAME"] != "All") {
                            $("#TransactionStatusZone").append($("<option></option>").val(Result.dtZone[i]["ZONE_CODE"]).html(Result.dtZone[i]["ZONE_NAME"]));
                        }
                    }
                    //$("#TransactionStatusZone").val("ALL");

                    //$scope.TransStatusZoneArray = [];
                    //$scope.TransStatusZoneArray = [{ ZONE_NAME: 'ALL' }];
                    //$('#TransactionStatusZone option[value="ALL"]').remove;
                    //$scope.TransStatusZoneArray = Result.dtZone;
                    //$scope.TransactionStatusZone = Result.dtZone[0]["ZONE_CODE"];
                    if (Result.dtState.length == 1) {
                        $("#TransactionStatusState").empty();
                        if (Result.dtState[0]["STATE_NAME"] != "All") {
                            $("#TransactionStatusState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                        }
                        $('#TransactionStatusState').prop("disabled", true);
                    }
                    else {
                        $("#TransactionStatusState").empty();
                        $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));

                        for (var i = 0; i < Result.dtState.length; i++) {
                            if (Result.dtState[i]["STATE_NAME"] != "All") {
                                $("#TransactionStatusState").append($("<option></option>").val(Result.dtState[i]["STATE_CODE"]).html(Result.dtState[i]["STATE_NAME"]));
                            }
                        }
                    }
                }

            }
        }).error(function (ex) {
            alert("Technical error has been occured");
            HideLoader();
        });
    }

    else if (UserType == "FSO" || UserType == "FSO_BU2" || UserType == "TM") {
        $('#TransactionStatusZone').prop("disabled", true);
        $('#TransactionStatusState').prop("disabled", true);
        $('#TransactionStatusStatus').prop("disabled", false);

        $("#TransactionStatusZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));

        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    //alert(Result.dtZone);

                    $('#TransactionStatusZone').empty();

                    if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                        $("#TransactionStatusZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                    }

                    $('#TransactionStatusState').empty();
                    //$("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));

                    if (Result.dtState[0]["STATE_NAME"] != "All") {
                        $("#TransactionStatusState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                    }

                }

            }
        }).error(function (ex) {
            alert("Technical error has been occured");
            HideLoader();
        });
    }


    else if (UserType == "STOCKIST" || UserType == "Stockist") {
        $('#TransactionStatusZone').prop("disabled", true);
        $('#TransactionStatusState').prop("disabled", true);
        $('#TransactionStatusStatus').prop("disabled", false);

        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    //alert(Result.dtZone);

                    $('#TransactionStatusZone').empty();
                    // $("#TransactionStatusZone").append($("<option></option>").val("ALL").html("ALL"));
                    if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                        $("#TransactionStatusZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                    }

                    $('#TransactionStatusState').empty();
                    // $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));
                    if (Result.dtState[0]["STATE_NAME"] != "All") {
                        $("#TransactionStatusState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                    }

                    //$scope.TransStatusZoneArray = [];
                    //$scope.TransStatusZoneArray = [{ ZONE_NAME: 'ALL' }];
                    //$scope.TransStatusZoneArray = Result.dtZone;

                    //$scope.TransactionStatusZone = Result.dtZone[0]["ZONE_CODE"];

                    //$scope.TransStatusStateArray = [];
                    //$scope.TransStatusStateArray = [{ STATE_NAME: 'ALL' }];
                    //$scope.TransStatusStateArray = Result.dtState;

                    //$scope.TransactionStatusState = Result.dtState[0]["STATE_CODE"];
                }

            }
        }).error(function (ex) {
            alert("Technical error has been occured");
            HideLoader();
        });
    }

    HideLoader();
    $scope.DownloadFile = function (typeoffile) {

        var FileName = "TransactionStatusReport";
        if ($scope.TransactionStatusFromDate == "" || $scope.TransactionStatusFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionStatusToDate == "" || $scope.TransactionStatusToDate == undefined) {
            alert("To Date cannot be empty");

        }
        else if ($("#TransactionStatusReport_Table tbody tr").length <= 0) {
            alert("No Data Available");
        }
        else {
            var STDATE = ($scope.TransactionStatusFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionStatusToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();
            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }

            if (!$('#TransactionStatusReport_Table').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }

            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];


            // var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND POINTS>=0 ";
            var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' ";
            // var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
            if ($("#TransactionStatusZone").text() == "Select" || $("#TransactionStatusZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#TransactionStatusZone").val() == "ALL") {

                    var ZonewithComma = "";
                    $('#TransactionStatusZone option').each(function () {
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
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionStatusZone option:selected").text() + "' ";
                }
            }

            if ($("#TransactionStatusState").text() == "Select" || $("#TransactionStatusState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#TransactionStatusState").val() == "ALL") {

                    var StatewithComma = "";

                    $('#TransactionStatusState option').each(function () {
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
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionStatusState option:selected").text().toUpperCase() + "' ";
                }
            }
            if ($scope.TransactionStatusStatus == "Select" || $scope.TransactionStatusStatus == undefined) {
                alert("Select Status");
                return;
            } else {
                if ($scope.TransactionStatusStatus == "ALL")
                { } else {
                    WhereCondition = WhereCondition + " AND STATUS='" + $scope.TransactionStatusStatus + "' ";
                }
            }

            if (UserType == "FSO" || UserType == "FSO_BU2") {

                //WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))";
                WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) union select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))";

            }
            if (UserType == "TM") {

               // WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))))";
                WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))";
            }

            if (UserType == "STOCKIST") {
                // alert(UnnatiMembershipID);
                WhereCondition = WhereCondition + " AND MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
            }
            // WhereCondition = WhereCondition + " AND TRANSACTION_ID NOT LIKE '[_%]'";
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiTransactionStatus",
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

    // Column names for default or user selected
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
                        "name": selectedcolumnname[i]
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
                        "name": selectedcolumnname[i], "bSortable": true
                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            }



        }

    }).error(function (ex) {
        alert("Technical error has been occured");
        HideLoader();
    })

    // Get Transaction Status Report
    $scope.GetTransactionStatusReport = function () {
        if ($scope.TransactionStatusFromDate == "" || $scope.TransactionStatusFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionStatusToDate == "" || $scope.TransactionStatusToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.TransactionStatusFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionStatusToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();
            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];


            var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
            //var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  AND (STATUS='Approved' OR STATUS='')  ";
            if ($("#TransactionStatusZone").text() == "Select" || $("#TransactionStatusZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#TransactionStatusZone").val() == "ALL") {

                    var ZonewithComma = "";
                    $('#TransactionStatusZone option').each(function () {
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
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionStatusZone option:selected").text() + "' ";
                }
            }

            if ($("#TransactionStatusState").text() == "Select" || $("#TransactionStatusState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#TransactionStatusState").val() == "ALL") {

                    var StatewithComma = "";

                    $('#TransactionStatusState option').each(function () {
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
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionStatusState option:selected").text().toUpperCase() + "' ";
                }
            }

            if ($scope.TransactionStatusStatus == "Select" || $scope.TransactionStatusStatus == undefined) {
                alert("Select Status");
                return;
            } else {
                if ($scope.TransactionStatusStatus == "ALL")
                { } else {
                    WhereCondition = WhereCondition + " AND STATUS='" + $scope.TransactionStatusStatus + "' ";
                }
            }

            if (UserType == "FSO" || UserType == "FSO_BU2") {

                WhereCondition = WhereCondition + "  AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) union select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))";
            }

            if (UserType == "TM") {

                //WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))))";
                WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))";
            }

            if (UserType == "STOCKIST") {
                // alert(UnnatiMembershipID);
                WhereCondition = WhereCondition + " AND MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
            }
            // WhereCondition = WhereCondition + " AND TRANSACTION_ID NOT LIKE '[_%]'";
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiTransactionStatus",
                WhereClause: WhereCondition,
                "Type": "Get"

            });
            //alert(Data);
            ShowLoader();
            DIMSFactory.getReportData(Data).success(function (response) {

                // alert($scope.UserSelectedColumnName);
                getLookUpData_Reports_ServerSideBinding("", "", "", "TransactionStatusReport_Table", UserSelectedColumnName);
                $(".TransactionStatusReportTotals").css('display', 'block');
                var RD = SumQuantity(WhereCondition, "TSR_Quantity");

                if (RD == "") {
                    $("#Total_Points").val("");
                    $("#Total_Quantity_Mtr").val("");
                    $("#Total_Mtr").val("");
                }
                else {
                    RD = JSON.parse(RD);

                    //(Math.round(5.01 * 10) / 10).toFixed(1)

                    $("#Total_Points").val(RD[0]["Points_Total"]);
                    $("#Total_Quantity_Mtr").val((Math.round((RD[0]["SUM_QUANTITY"]) * 100) / 100).toFixed(2));
                    $("#Total_Mtr").val((Math.round(RD[0]["SUM_TOTAL_METERS"] * 100) / 100).toFixed(2));
                }
                HideLoader();
            }).error(function (ex) {
                alert("Technical error has been occured");
                HideLoader();
            })
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
                            "name": selectedcolumnname[i]
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
                            "name": selectedcolumnname[i], "bSortable": true
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

        }).error(function (ex) {
            alert("Technical error has been occured");
            HideLoader();
        })


        if (ControllerName != "UnnatiTransactionStatusReportCtrl") {
            ControllerName = "UnnatiTransactionStatusReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiTransactionStatusReportCtrl");

            $compile(elem.contents())(UnnatiTransactionStatusReportScope);
        }

        $("#ColumnEditingModal").modal('show');

    }

    // View Columns selected
    $scope.ViewColumnEditing = function () {

        var STDATE = ($scope.TransactionStatusFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.TransactionStatusToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();
        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }
        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];


        //var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND POINTS>=0 ";
        var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' ";


        //var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  AND (STATUS='Approved' OR STATUS='')  ";
        if ($("#TransactionStatusZone").text() == "Select" || $("#TransactionStatusZone").text() == undefined) {
            alert("Select zone");
            return;
        } else {
            if ($("#TransactionStatusZone").val() == "ALL") {

                var ZonewithComma = "";
                $('#TransactionStatusZone option').each(function () {
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
                WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionStatusZone option:selected").text() + "' ";
            }
        }

        if ($("#TransactionStatusState").text() == "Select" || $("#TransactionStatusState").text() == undefined) {
            alert("Select State");
            return;
        } else {
            if ($("#TransactionStatusState").val() == "ALL") {

                var StatewithComma = "";

                $('#TransactionStatusState option').each(function () {
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
                WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionStatusState option:selected").text().toUpperCase() + "' ";
            }
        }
        if ($scope.TransactionStatusStatus == "Select" || $scope.TransactionStatusStatus == undefined) {
            alert("Select Status");
            return;
        } else {
            if ($scope.TransactionStatusStatus == "ALL")
            { } else {
                WhereCondition = WhereCondition + " AND STATUS='" + $scope.TransactionStatusStatus + "' ";
            }
        }
        if (UserType == "FSO" || UserType == "FSO_BU2") {

           // WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))";
              WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))";
        }

        if (UserType == "TM") {

           // WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))))";
            WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))))";

        }

        if (UserType == "STOCKIST") {
            // alert(UnnatiMembershipID);
            WhereCondition = WhereCondition + " AND MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
        }
        // WhereCondition = WhereCondition + " AND TRANSACTION_ID NOT LIKE '[_%]'";
        DIMSFactory.ViewColumnEditing("UnnatiTransactionStatus", UserCode, WhereCondition, $('#TransactionStatusFromDate').val(), $('#TransactionStatusToDate').val());

    }

    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        if ($scope.TransactionStatusFromDate == "" || $scope.TransactionStatusFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionStatusToDate == "" || $scope.TransactionStatusToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.TransactionStatusFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionStatusToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();
            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

            // var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND POINTS>=0 ";
            var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
            //var WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  AND (STATUS='Approved' OR STATUS='')  ";
            if ($("#TransactionStatusZone").text() == "Select" || $("#TransactionStatusZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#TransactionStatusZone").val() == "ALL") {

                    var ZonewithComma = "";
                    $('#TransactionStatusZone option').each(function () {
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
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactionStatusZone option:selected").text() + "' ";
                }
            }

            if ($("#TransactionStatusState").text() == "Select" || $("#TransactionStatusState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#TransactionStatusState").val() == "ALL") {

                    var StatewithComma = "";

                    $('#TransactionStatusState option').each(function () {
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
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactionStatusState option:selected").text().toUpperCase() + "' ";
                }
            }
            if ($scope.TransactionStatusStatus == "Select" || $scope.TransactionStatusStatus == undefined) {
                alert("Select Status");
                return;
            } else {
                if ($scope.TransactionStatusStatus == "ALL")
                { } else {
                    WhereCondition = WhereCondition + " AND STATUS='" + $scope.TransactionStatusStatus + "' ";
                }
            }

            if (UserType == "FSO" || UserType == "FSO_BU2") {

                //WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))";
                WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))";

            }

            if (UserType == "TM") {

                //WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))))";
                WhereCondition = WhereCondition + " AND  DISTRICT IN (select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select distinct CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct DISTRICT from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))))";

            }


            if (UserType == "STOCKIST") {
                // alert(UnnatiMembershipID);
                WhereCondition = WhereCondition + " AND MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
            }
            // WhereCondition = WhereCondition + " AND TRANSACTION_ID NOT LIKE '[_%]'";
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiTransactionStatus",
                WhereClause: WhereCondition,
                "Type": "Get"

            });

            DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiTransactionStatus", UserCode, WhereCondition, Data, "TransactionStatusReport_Table");


        }
    }

    //$scope.Get = function () {

    //    var data = "<Data> ";
    //    //data+="<REDEMPTION>";

    //    //data += "<REDEMPTION><MEMBERSHIP_ID>RE0OD00218</MEMBERSHIP_ID><MEMBER_NAME>Test3 Final3</MEMBER_NAME><MEMBER_TYPE>Retailer</MEMBER_TYPE><ORDER_DATE>13/06/2016</ORDER_DATE><STATUS_CHANGE_DATE>13/06/2016</STATUS_CHANGE_DATE><ORDER_NO>100000081</ORDER_NO><SUB_ORDER_NO>_000123156</SUB_ORDER_NO><STATUS>Ordered</STATUS><POINTS>20</POINTS><PRODUCT_CODE>Cric10</PRODUCT_CODE><PRODUCT_NAME>Cricket ball</PRODUCT_NAME><NC_PRODUCT_CODE>1</NC_PRODUCT_CODE><ZONE>East</ZONE><CONTACT_NO>2222222222</CONTACT_NO><STATE>Himachal Pradesh</STATE><CITY>New Delhi</CITY><ADDRESS>Siliguri New jalpaiguri    Haryana India</ADDRESS><PRODUCT_MRP_VALUE>10</PRODUCT_MRP_VALUE>	  <FSO_NAME>Anil Kumar Y</FSO_NAME><FIRM_NAME>Test3</FIRM_NAME>";

    //    //data += "</REDEMPTION>";


    //    //data += "<REDEMPTION><MEMBERSHIP_ID>RE1MP00110</MEMBERSHIP_ID><MEMBER_NAME>Subhasis Das</MEMBER_NAME><MEMBER_TYPE>Retailer</MEMBER_TYPE><ORDER_DATE>24/08/2016</ORDER_DATE><STATUS_CHANGE_DATE>24/08/2016</STATUS_CHANGE_DATE><ORDER_NO>100150988</ORDER_NO><SUB_ORDER_NO>_000002546</SUB_ORDER_NO><STATUS>Closed</STATUS> <POINTS>450</POINTS><PRODUCT_CODE>Shiny Invertor 900VA</PRODUCT_CODE> <PRODUCT_NAME>Su-kam Shiny Invertor 900VA.</PRODUCT_NAME><NC_PRODUCT_CODE>HIL1508117</NC_PRODUCT_CODE> <ZONE>East</ZONE><CONTACT_NO>9933886563</CONTACT_NO><STATE>West Bengal</STATE><CITY>Ramgar</CITY><ADDRESS>Village Ramgar, Post Lalgar MOBILE - 9933886563    West Bengal India</ADDRESS><PRODUCT_MRP_VALUE>6410</PRODUCT_MRP_VALUE>	   <FSO_NAME>KAUSTAV HAZARI</FSO_NAME> <FIRM_NAME>Das Hardware</FIRM_NAME></REDEMPTION>";

    //    //data+="<MEMBER_ENROLLMENT><MEMBERSHIP_ID>MANIB00247</MEMBERSHIP_ID><MEMBER_NAME>Manikanta</MEMBER_NAME><MEMBER_TYPE>Stockist</MEMBER_TYPE><MEMBER_SALUTATION>mani</MEMBER_SALUTATION><FIRST_NAME>mani</FIRST_NAME><LAST_NAME>Guru</LAST_NAME><ENROLLEMENT_DATE>2015-03-17</ENROLLEMENT_DATE><ZONE>North 1</ZONE><DISTRICT>Guntur</DISTRICT><STATE>Andhra Pradesh</STATE><TALUK>ALL</TALUK><VILLAGE>ALL</VILLAGE><RESIDENTIAL_ADDRESS>Vinukonda</RESIDENTIAL_ADDRESS><RESIDENTIAL_CITY>Vinukonda</RESIDENTIAL_CITY><RESIDENTIAL_STATE></RESIDENTIAL_STATE><RESIDENTIAL_PINCODE></RESIDENTIAL_PINCODE><CONTACT_NO>7382510363</CONTACT_NO><EMAIL_ID>mani@gmail.com</EMAIL_ID><POINT_BALANCE>123000</POINT_BALANCE><POINT_EARNED>12345</POINT_EARNED><POINT_REDEEMED>14587</POINT_REDEEMED>";
    //    //data+="<MEMERSHIP_EXPIRY_DATE>2015-03-17</MEMERSHIP_EXPIRY_DATE><OFFICE_ADDRESS>Old Library Street</OFFICE_ADDRESS><OFFICE_CITY>Hyderabad</OFFICE_CITY><OFFICE_PINCODE>522647</OFFICE_PINCODE><SPOUSE_SALUTATION>No</SPOUSE_SALUTATION><SPOUSE_FIRST_NAME>No</SPOUSE_FIRST_NAME><SPOUSE_LAST_NAME>Ni</SPOUSE_LAST_NAME><SPOUSE_DOB>2015-03-17</SPOUSE_DOB><CHILD_ONE_NAME>45</CHILD_ONE_NAME><CHILD_ONE_DOB>124</CHILD_ONE_DOB><CHILD_TWO_NAME>451</CHILD_TWO_NAME><CHILD_TWO_DOB>1478</CHILD_TWO_DOB><CHILD_THREE_NAME>145</CHILD_THREE_NAME><CHILD_THREE_DOB>789</CHILD_THREE_DOB><ANNIVERSARY_DATE>2015-03-17</ANNIVERSARY_DATE><FIRM_NAME>SMK Traders</FIRM_NAME><OTHER_MAJOR_MATERIAL_DEALT>456</OTHER_MAJOR_MATERIAL_DEALT><TYPE_OF_BUSINESS>874</TYPE_OF_BUSINESS><TIN_VAT_NO>478154</TIN_VAT_NO><FSO_NAME>Srinivas</FSO_NAME><FSO_CONTACT_NO>9985950269</FSO_CONTACT_NO><FSO_EMAIL_ID>J.srinivas@gmail.com</FSO_EMAIL_ID><STOCKIEST_FIRM_NAME>venkat Traders</STOCKIEST_FIRM_NAME><STOCKIEST_MEMBERSHIP_ID>451212111</STOCKIEST_MEMBERSHIP_ID></MEMBER_ENROLLMENT>";

    //    //data += "<MEMBER_ENROLLMENT><MEMBERSHIP_ID>RS0AP00001</MEMBERSHIP_ID><MEMBER_NAME>Ankit Pathak</MEMBER_NAME><MEMBER_TYPE>Retailer</MEMBER_TYPE><MEMBER_SALUTATION>Mr.</MEMBER_SALUTATION><FIRST_NAME>Ankit</FIRST_NAME><LAST_NAME>Pathak</LAST_NAME><ENROLLEMENT_DATE>24/08/2016</ENROLLEMENT_DATE><ZONE>East 1</ZONE><DISTRICT>Damoh</DISTRICT><STATE>Madhya Pradesh</STATE><TALUK>Damoh</TALUK><VILLAGE>All</VILLAGE><RESIDENTIAL_ADDRESS>Same as above </RESIDENTIAL_ADDRESS><RESIDENTIAL_CITY>Hatta</RESIDENTIAL_CITY><RESIDENTIAL_STATE>Lakshadweep</RESIDENTIAL_STATE> <RESIDENTIAL_PINCODE>470775</RESIDENTIAL_PINCODE><CONTACT_NO>9424374389</CONTACT_NO><EMAIL_ID>9424374389@dummy.in</EMAIL_ID><POINT_BALANCE>100</POINT_BALANCE><POINT_EARNED>0</POINT_EARNED><POINT_REDEEMED>0</POINT_REDEEMED>";
	//	//data+=" <MEMERSHIP_EXPIRY_DATE>31/03/2018</MEMERSHIP_EXPIRY_DATE><OFFICE_ADDRESS>Bazaarpura Hatta </OFFICE_ADDRESS><OFFICE_CITY>Hatta</OFFICE_CITY><OFFICE_PINCODE>470775</OFFICE_PINCODE><SPOUSE_SALUTATION>Mrs.</SPOUSE_SALUTATION><SPOUSE_FIRST_NAME>Chitra</SPOUSE_FIRST_NAME><SPOUSE_LAST_NAME>Pathak</SPOUSE_LAST_NAME><SPOUSE_DOB></SPOUSE_DOB><CHILD_ONE_NAME></CHILD_ONE_NAME><CHILD_ONE_DOB></CHILD_ONE_DOB><CHILD_TWO_NAME></CHILD_TWO_NAME><CHILD_TWO_DOB></CHILD_TWO_DOB><CHILD_THREE_NAME></CHILD_THREE_NAME><CHILD_THREE_DOB></CHILD_THREE_DOB><ANNIVERSARY_DATE>21/11/2007</ANNIVERSARY_DATE><FIRM_NAME>Pathak Traders</FIRM_NAME><OTHER_MAJOR_MATERIAL_DEALT></OTHER_MAJOR_MATERIAL_DEALT> <TYPE_OF_BUSINESS>Proprietary</TYPE_OF_BUSINESS><TIN_VAT_NO></TIN_VAT_NO><FSO_NAME>KASHISH GUPTA</FSO_NAME><FSO_CONTACT_NO>9425904657</FSO_CONTACT_NO><FSO_EMAIL_ID>kashish.gupta@hil.in</FSO_EMAIL_ID> <STOCKIEST_FIRM_NAME>Ishwari Industries</STOCKIEST_FIRM_NAME> <STOCKIEST_MEMBERSHIP_ID>SW1MP21374</STOCKIEST_MEMBERSHIP_ID></MEMBER_ENROLLMENT>";

    //    //data+="<TRANSACTION>";
    //    //data += "<TYPE_OF_TRANSACTION>EARNING</TYPE_OF_TRANSACTION><MEMBERSHIP_ID>RE1MP00110</MEMBERSHIP_ID><MEMBER_NAME>Manikanya</MEMBER_NAME><MEMEBER_TYPE>Stockist</MEMEBER_TYPE><AGENCY_NAME>SMK Traders</AGENCY_NAME><FSO_NAME>Srinivas</FSO_NAME><TRANSACTION_ID>_Tra22454</TRANSACTION_ID><TRANSACTION_DATE>24/08/2016</TRANSACTION_DATE><SOLD_DATE>24/08/2016</SOLD_DATE><PURCHASE_AMOUNT>500</PURCHASE_AMOUNT><PRODUCT_NAME>Jilla</PRODUCT_NAME><QUANTITY>7894</QUANTITY><COMPAIGN_NAME>std retailer</COMPAIGN_NAME><POINTS>-454</POINTS><INVOICE_NO>4875454</INVOICE_NO><STATUS>Approved</STATUS><FSO_CONTACT_NO>8879842454</FSO_CONTACT_NO><TALUK>ALL</TALUK><VILLAGE>ALL</VILLAGE><ZONE>North 1</ZONE><DISTRICT>Guntur</DISTRICT><STATE>AP</STATE><CITY>Vinukonda</CITY><STOCKIEST_ID>4454512454</STOCKIEST_ID><PENDING_AT_USER>No</PENDING_AT_USER><REWARD_POSTING_DATE>2005-5-25</REWARD_POSTING_DATE></TRANSACTION>";

    //    //data += "<TRANSACTION><TYPE_OF_TRANSACTION>EARNING</TYPE_OF_TRANSACTION>  <MEMBERSHIP_ID>RE1MP00110</MEMBERSHIP_ID><MEMBER_NAME>Retailer Test</MEMBER_NAME> <MEMEBER_TYPE>Retailer</MEMEBER_TYPE><AGENCY_NAME>Test Trader</AGENCY_NAME><FSO_NAME>Anil Kumar Y</FSO_NAME><TRANSACTION_ID>TRA173</TRANSACTION_ID><TRANSACTION_DATE>27/06/2016</TRANSACTION_DATE><SOLD_DATE>14/06/2016</SOLD_DATE><PURCHASE_AMOUNT>0</PURCHASE_AMOUNT><PRODUCT_NAME>Game Zone/Sports Zone</PRODUCT_NAME><QUANTITY>50</QUANTITY><COMPAIGN_NAME>Tran 1</COMPAIGN_NAME><POINTS>2e+006</POINTS><INVOICE_NO></INVOICE_NO><STATUS>Approved</STATUS><FSO_CONTACT_NO>7795202534</FSO_CONTACT_NO><TALUK>Mahe Taluk</TALUK><VILLAGE>Agali</VILLAGE><ZONE>East</ZONE><DISTRICT>Ariyalur</DISTRICT><STATE>Himachal Pradesh</STATE><CITY>Anantpur</CITY><STOCKIEST_ID>SS1155555</STOCKIEST_ID>	<PENDING_AT_USER></PENDING_AT_USER>	<REWARD_POSTING_DATE>27/06/2016</REWARD_POSTING_DATE> <Total_Meters>5000</Total_Meters>	<Member_Claim_Date></Member_Claim_Date></TRANSACTION>";
    //    //data+="<TRANSACTION><TYPE_OF_TRANSACTION>REDEMPTION REVERSAL</TYPE_OF_TRANSACTION>  <MEMBERSHIP_ID>RS0AP00001</MEMBERSHIP_ID><MEMBER_NAME>testRetailer Khan</MEMBER_NAME><MEMEBER_TYPE>Retailer</MEMEBER_TYPE><AGENCY_NAME>TestAgency</AGENCY_NAME><FSO_NAME>fso test</FSO_NAME><TRANSACTION_ID>_000000003</TRANSACTION_ID><TRANSACTION_DATE>25/11/2014</TRANSACTION_DATE><SOLD_DATE></SOLD_DATE><PURCHASE_AMOUNT>0</PURCHASE_AMOUNT><PRODUCT_NAME></PRODUCT_NAME><QUANTITY>0</QUANTITY><COMPAIGN_NAME>REDEMPTION REVERSAL</COMPAIGN_NAME><POINTS>-50</POINTS><INVOICE_NO></INVOICE_NO> <STATUS>Approved</STATUS><FSO_CONTACT_NO>9036056916</FSO_CONTACT_NO><TALUK>All</TALUK><VILLAGE>All</VILLAGE><ZONE>South</ZONE><DISTRICT>Anantpur</DISTRICT><STATE>Andhra Pradesh</STATE><CITY>new delhi</CITY><STOCKIEST_ID>SS0AP00021</STOCKIEST_ID>	<PENDING_AT_USER></PENDING_AT_USER>	<REWARD_POSTING_DATE>25/11/2014</REWARD_POSTING_DATE> <Total_Meters>0</Total_Meters><Member_Claim_Date></Member_Claim_Date></TRANSACTION>"

    //    data+="	<TRANSACTION><TYPE_OF_TRANSACTION>EARNING</TYPE_OF_TRANSACTION>  <MEMBERSHIP_ID>SN1JH1101783</MEMBERSHIP_ID> <MEMBER_NAME>Bittu Kapoor</MEMBER_NAME><MEMEBER_TYPE>Stockist</MEMEBER_TYPE> <AGENCY_NAME>ARUN STEEL</AGENCY_NAME><FSO_NAME>Rakesh Kumar Sinha</FSO_NAME><TRANSACTION_ID></TRANSACTION_ID> <TRANSACTION_DATE>01/09/2016</TRANSACTION_DATE><SOLD_DATE></SOLD_DATE><PURCHASE_AMOUNT>0</PURCHASE_AMOUNT><PRODUCT_NAME></PRODUCT_NAME><QUANTITY>0</QUANTITY><COMPAIGN_NAME>Enrolment Bonus</COMPAIGN_NAME><POINTS>50</POINTS><INVOICE_NO></INVOICE_NO> <STATUS>Approved</STATUS> <FSO_CONTACT_NO>9431137790</FSO_CONTACT_NO> <TALUK>All</TALUK> <VILLAGE>All</VILLAGE><ZONE>North 1</ZONE> <DISTRICT>West Singhbhum</DISTRICT><STATE>Jharkhand</STATE><CITY>SONUA</CITY><STOCKIEST_ID>SN1JH1101783</STOCKIEST_ID>	<PENDING_AT_USER></PENDING_AT_USER>	<REWARD_POSTING_DATE>01/09/2016</REWARD_POSTING_DATE>  </TRANSACTION>"

    //    data += " </Data>";
    //    $.ajax({
    //        method: 'POST',
    //        url: '../../Home/TestUnnati',
    //        data: { Data: data },
    //    }).then(function successCallback(response) {
    //        alert(response.tabledata);
    //        var result = JSON.parse(response.tabledata);
    //        alert(result);
    //    }, function errorCallback(response) {
    //        alert("Error : " + response);
    //    });
    //}


});

function GetStateMasterStatus() {
    if ($("#TransactionStatusZone").text() == "Select" || $("#TransactionStatusZone").text() == undefined) {
    } else {
        ShowLoader();
        if ($("#TransactionStatusZone").val() == "ALL") {

            $("#TransactionStatusState").empty();
            $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));
            HideLoader();
            return;

        }
        var ZoneData = JSON.stringify({
            //ID: UserCode,
            //UserCode: UserCode,
            //UserRoleType: UserType,
            Zone_Code: $("#TransactionStatusZone").val()
        });

        UnnatiTransactionStatusReportFactory.getStateDataForUnnati(ZoneData).success(function (response) {
            if (response != "") {
                var Result = JSON.parse(response);
                if (Result != "") {

                    //$scope.TransStatusStateArray = [];
                    //$scope.TransStatusStateArray = [{ STATE_NAME: 'ALL' }];
                    //$scope.TransStatusStateArray = Result;

                    //$scope.TransactionStatusState = "ALL";
                    $("#TransactionStatusState").empty();
                    $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));

                    for (var i = 0; i < Result.length; i++) {
                        if (Result[i]["STATE_NAME"] != "All") {
                            $("#TransactionStatusState").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_NAME"]));
                        }
                    }

                }

            }
            HideLoader();
        }).error(function (ex) {
            alert("Technical error has been occured");
            HideLoader();
        })
    }
}

function GetStateMasterStatusForZone() {
    //if ($("#TransactionStatusZone").text() == "Select" || $("#TransactionStatusZone").text() == undefined) {
    //} else {
    //    ShowLoader();
    //    if ($("#TransactionStatusZone").val() == "ALL") {

    //        $("#TransactionStatusState").empty();
    //        $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));
    //        HideLoader();
    //        return;

    //    }
    var ZoneData = JSON.stringify({
        //ID: UserCode,
        //UserCode: UserCode,
        //UserRoleType: UserType,
        Zone_Code: $("#TransactionStatusZone").val()
    });

    UnnatiTransactionStatusReportFactory.getStateDataForUnnati(ZoneData).success(function (response) {
        if (response != "") {
            var Result = JSON.parse(response);
            if (Result != "") {
                $("#TransactionStatusState").empty();
                $("#TransactionStatusState").append($("<option></option>").val("ALL").html("ALL"));

                for (var i = 0; i < Result.length; i++) {
                    if (Result[i]["STATE_NAME"] != "All") {
                        $("#TransactionStatusState").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_NAME"]));
                    }
                }

            }

        }
        HideLoader();
    }).error(function (ex) {
        alert("Technical error has been occured");
        HideLoader();
    })
}
