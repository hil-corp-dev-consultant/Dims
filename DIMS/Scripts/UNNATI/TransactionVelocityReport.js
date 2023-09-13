var TransacionVeloucityFactory;

DIMS.controller('UnnatiTransactionVelocityReportCtrl', function ($scope, $location, DIMSFactory, $compile) {
    TransacionVeloucityFactory = DIMSFactory;
    $('#undo_redo_to').empty();
    UnnatiTransactionVelocityReportScope = $scope;
    $scope.TransactionVelocityMemberType = "ALL";

    $scope.templatesettings = { HeaderTitle: "UnnatiTransactionVelocityReportCtrl" };
    var UserCode = $("#USERCODE_UnnatiTransactionVelocity").val();
    var UserType = $("#USERTYPE_UnnatiTransactionVelocity").val();
    // UserCode = "561";
    $scope.go = function (path) {

        $location.path(path);
    };

    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        UserRoleType: UserType,
        ReportName: "UnnatiTransactionVelocity"
    });

    var DataForUnnati = JSON.stringify({
        "Role": UserType,
        "UserCode": UserCode
    });


    if (UserType == "FSO" || UserType == "FSO_BU2" || UserType == "TM") {

        $('#TransactinoVelocityZone').prop("disabled", true);
        $('#TransactinoVelocityState').prop("disabled", true);
        $('#TransactinoVelocityDistrict').prop("disabled", false);
        //$('#TransactionSummaryMemberType').prop("disabled", false);

        $("#TransactinoVelocityZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactinoVelocityState").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));

        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    $('#TransactinoVelocityZone').empty();

                    if (Result.dtZone[0]["ZONE_NAME"] != "All") {
                        $("#TransactinoVelocityZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));
                    }

                    $("#TransactinoVelocityZone").val(Result.dtZone[0]["ZONE_CODE"]);


                    $('#TransactinoVelocityState').empty();

                    if (Result.dtState[0]["STATE_NAME"] != "All") {
                        $("#TransactinoVelocityState").append($("<option></option>").val(Result.dtState[0]["STATE_CODE"]).html(Result.dtState[0]["STATE_NAME"]));
                    }

                    $("#TransactinoVelocityState").val(Result.dtState[0]["STATE_CODE"]);

                    $('#TransactinoVelocityDistrict').empty();
                    $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.dtDistrict.length; i++) {
                        if (Result.dtDistrict[i]["DISTRICT"] != "All") {
                            $("#TransactinoVelocityDistrict").append($("<option></option>").val(Result.dtDistrict[i]["DISTRICT"]).html(Result.dtDistrict[i]["DISTRICT"]));
                        }
                    }

                    $("#TransactinoVelocityDistrict").val("ALL");

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
    else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC" || UserType == "ADMIN" || UserType == "NSH" || UserType == "NCC" || UserType == "COO" || UserType == "CFO" || UserType == "SBU1MARKETING_HEAD" || UserType == "CFO" || UserType == "BU_FIN_HEAD" || UserType == "FIN_CONTROLLER/CS") {


        $('#TransactinoVelocityZone').prop("disabled", false);
        $('#TransactinoVelocityState').prop("disabled", false);
        $('#TransactinoVelocityDistrict').prop("disabled", false);

        $("#TransactinoVelocityZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactinoVelocityState").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));

        // Zone Drop down 
        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {

                    $('#TransactinoVelocityZone').empty();
                    $("#TransactinoVelocityZone").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.dtZone.length; i++) {
                        if (Result.dtZone[i]["ZONE_NAME"] != "All") {
                            $("#TransactinoVelocityZone").append($("<option></option>").val(Result.dtZone[i]["ZONE_CODE"]).html(Result.dtZone[i]["ZONE_NAME"]));
                        }
                    }
                    $("#TransactinoVelocityZone").val("ALL");


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

        $('#TransactinoVelocityZone').prop("disabled", true);
        $('#TransactinoVelocityState').prop("disabled", false);
        // $('#TransactionSummaryStatus').prop("disabled", false);

        $("#TransactinoVelocityZone").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactinoVelocityState").append($("<option></option>").val("ALL").html("ALL"));
        $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));


        // Zone Drop down 
        DIMSFactory.getZoneDataForUnnati(DataForUnnati).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);

                if (Result != "") {
                    $('#TransactinoVelocityZone').empty();

                    $("#TransactinoVelocityZone").append($("<option></option>").val(Result.dtZone[0]["ZONE_CODE"]).html(Result.dtZone[0]["ZONE_NAME"]));

                    $('#TransactinoVelocityState').empty();
                    $("#TransactinoVelocityState").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.dtState.length; i++) {
                        if (Result.dtState[i]["STATE_NAME"] != "All") {
                            $("#TransactinoVelocityState").append($("<option></option>").val(Result.dtState[i]["STATE_CODE"]).html(Result.dtState[i]["STATE_NAME"]));
                        }
                    }

                    $("#TransactinoVelocityState").val("ALL");

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
    $scope.DownloadFile = function (typeoffile) {

        var FileName = "TransactionVelocityReport";
        if ($scope.TransactionVelocityFromDate == "" || $scope.TransactionVelocityFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionVelocityToDate == "" || $scope.TransactionVelocityToDate == undefined) {
            alert("To Date cannot be empty");
        }
        else if ($("#transactionVelocityReport_Table tbody tr").length <= 0) {

            alert("No Data Available");
        }

        else {
            var STDATE = ($scope.TransactionVelocityFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionVelocityToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }


            if (!$('#transactionVelocityReport_Table').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }

            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
            if ($scope.TransactionVelocityMemberType == "ALL") {
                WhereCondition += " AND ";
                WhereCondition += "  TOTAL_METERS >=";
                WhereCondition += " CASE WHEN MEMEBER_TYPE='Stockist' THEN ";
                WhereCondition += " 40000 ";
                WhereCondition += " ELSE";
                WhereCondition += "  5000 ";
                WhereCondition += "  END ";
            }
            else if ($scope.TransactionVelocityMemberType == "Stockist") {
                WhereCondition += " AND TOTAL_METERS >=40000   AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
            }
            else if ($scope.TransactionVelocityMemberType == "Retailer") {
                WhereCondition += " AND TOTAL_METERS >=5000  AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
            }
            else {
                WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
            }


            if ($("#TransactinoVelocityZone").text() == "Select" || $("#TransactinoVelocityZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#TransactinoVelocityZone").val() == "ALL") {
                    var ZonewithComma = "";

                    $('#TransactinoVelocityZone option').each(function () {
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
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactinoVelocityZone option:selected").text() + "' ";
                }

            }

            if ($("#TransactinoVelocityState").text() == "Select" || $("#TransactinoVelocityState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#TransactinoVelocityState").val() == "ALL") {
                    var StatewithComma = "";
                    $('#TransactinoVelocityState option').each(function () {
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
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactinoVelocityState option:selected").text().toUpperCase() + "' ";
                }

            }


            if ($("#TransactinoVelocityDistrict").text() == "Select" || $("#TransactinoVelocityDistrict").text() == undefined) {
                alert("Select District");
                return;
            } else {
                if ($("#TransactinoVelocityDistrict").val() == "ALL") {
                    var DistrictwithComma = "";

                    $('#TransactinoVelocityDistrict option').each(function () {
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
                    WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactinoVelocityDistrict option:selected").text().toUpperCase() + "' ";
                }
            }
            //if ($scope.TransactinoVelocityTaluk == "Select" || $scope.TransactinoVelocityTaluk == undefined) {
            //    alert("Select Taluk");
            //    return;
            //} else {
            //    if ($scope.TransactinoVelocityTaluk == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactinoVelocityTaluk + "' ";
            //    }
            //}


            //if ($scope.TransactinoVelocityVillage == "Select" || $scope.TransactinoVelocityVillage == undefined) {
            //    alert("Select Village");
            //    return;
            //} else {
            //    if ($scope.TransactinoVelocityVillage == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactinoVelocityVillage + "' ";
            //    }
            //}


            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiTransactionVelocity",
                WhereClause: WhereCondition

            });
            $.ajax({

                url: '../../Home/SetInputData',
                type: "POST",
                datatype: "JSON",
                data: { InputData: Data, ReportType: typeoffile, FileName: FileName },
                async: false,
                cache: false,
                beforeSend:function()
                {
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
                        "name": selectedcolumnname[i]
                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            }



        }

    }).error(function () {
        alert("technical error has been occured");
        HideLoader();
    });

    $scope.GetTransactionVelocityReport = function () {
        if ($scope.TransactionVelocityFromDate == "" || $scope.TransactionVelocityFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionVelocityToDate == "" || $scope.TransactionVelocityToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.TransactionVelocityFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionVelocityToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            ShowLoader();

            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
            if ($scope.TransactionVelocityMemberType == "ALL") {
                WhereCondition += " AND ";
                WhereCondition += "  TOTAL_METERS >=";
                WhereCondition += " CASE WHEN MEMEBER_TYPE='Stockist' THEN ";
                WhereCondition += " 40000 ";
                WhereCondition += " ELSE";
                WhereCondition += "  5000 ";
                WhereCondition += "  END ";
            }
            else if ($scope.TransactionVelocityMemberType == "Stockist") {
                WhereCondition += " AND TOTAL_METERS >=40000   AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
            }
            else if ($scope.TransactionVelocityMemberType == "Retailer") {
                WhereCondition += " AND TOTAL_METERS >=5000  AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
            }
            else {
                WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
            }
            if ($("#TransactinoVelocityZone").text() == "Select" || $("#TransactinoVelocityZone").text() == undefined) {
                alert("Select zone");
                return;
            } else {
                if ($("#TransactinoVelocityZone").val() == "ALL") {
                    var ZonewithComma = "";

                    $('#TransactinoVelocityZone option').each(function () {
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
                    WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactinoVelocityZone option:selected").text() + "' ";
                }

            }

            if ($("#TransactinoVelocityState").text() == "Select" || $("#TransactinoVelocityState").text() == undefined) {
                alert("Select State");
                return;
            } else {
                if ($("#TransactinoVelocityState").val() == "ALL") {
                    var StatewithComma = "";
                    $('#TransactinoVelocityState option').each(function () {
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
                    WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactinoVelocityState option:selected").text().toUpperCase() + "' ";
                }

            }


            if ($("#TransactinoVelocityDistrict").text() == "Select" || $("#TransactinoVelocityDistrict").text() == undefined) {
                alert("Select District");
                return;
            } else {
                if ($("#TransactinoVelocityDistrict").val() == "ALL") {
                    var DistrictwithComma = "";

                    $('#TransactinoVelocityDistrict option').each(function () {
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
                    WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactinoVelocityDistrict option:selected").text().toUpperCase() + "' ";
                }
            }

            //if ($scope.TransactinoVelocityTaluk == "Select" || $scope.TransactinoVelocityTaluk == undefined) {
            //    alert("Select Taluk");
            //    return;
            //} else {
            //    if ($scope.TransactinoVelocityTaluk == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactinoVelocityTaluk + "' ";
            //    }
            //}


            //if ($scope.TransactinoVelocityVillage == "Select" || $scope.TransactinoVelocityVillage == undefined) {
            //    alert("Select Village");
            //    return;
            //} else {
            //    if ($scope.TransactinoVelocityVillage == "ALL")
            //    { } else {
            //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactinoVelocityVillage + "' ";
            //    }
            //}


            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiTransactionVelocity",
                WhereClause: WhereCondition, "Type": "Get"

            });

            DIMSFactory.getReportData(Data).success(function (response) {

                getLookUpData_Reports_ServerSideBinding("", "", "", "transactionVelocityReport_Table", UserSelectedColumnName);

                var RD = SumQuantity(WhereCondition, "TVR_Quantity");

                if (RD == "") {
                    $("#Points_Rewarded_TOTAL").val("");
                    $("#Total_Quantity_Sold_Purchased_Mtr_TOTAL").val("");
                }
                else {
                    $(".PageTotals").css('display', 'block');
                    RD = JSON.parse(RD);


                    //[{ "Points_Rewarded_TOTAL": 1035329.0, "TotalQuantitySoldPurchasedMtr_TOTAL": 722864.55 }]
                    $("#Points_Rewarded_TOTAL").val(RD[0]["Points_Rewarded_TOTAL"]);
                    $("#Total_Quantity_Sold_Purchased_Mtr_TOTAL").val(RD[0]["TotalQuantitySoldPurchasedMtr_TOTAL"]);
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

        $('#undo_redo').empty();

        var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

        for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
            $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
        }


        //  $('#undo_redo').refresh();

        $('#undo_redo').multiselect();
        if (ControllerName != "UnnatiTransactionVelocityReportCtrl") {
            ControllerName = "UnnatiTransactionVelocityReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiTransactionVelocityReportCtrl");

            $compile(elem.contents())(UnnatiTransactionVelocityReportScope);
        }

        $("#ColumnEditingModal").modal('show');

    }

    // View Columns seelected
    $scope.ViewColumnEditing = function () {

        var STDATE = ($scope.TransactionVelocityFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.TransactionVelocityToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }

        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
        var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
        if ($scope.TransactionVelocityMemberType == "ALL") {
            WhereCondition += " AND ";
            WhereCondition += "  TOTAL_METERS >=";
            WhereCondition += " CASE WHEN MEMEBER_TYPE='Stockist' THEN ";
            WhereCondition += " 40000 ";
            WhereCondition += " ELSE";
            WhereCondition += "  5000 ";
            WhereCondition += "  END ";
        }
        else if ($scope.TransactionVelocityMemberType == "Stockist") {
            WhereCondition += " AND TOTAL_METERS >=40000   AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
        }
        else if ($scope.TransactionVelocityMemberType == "Retailer") {
            WhereCondition += " AND TOTAL_METERS >=5000  AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
        }
        else {
            WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
        }
        if ($("#TransactinoVelocityZone").text() == "Select" || $("#TransactinoVelocityZone").text() == undefined) {
            alert("Select zone");
            return;
        } else {
            if ($("#TransactinoVelocityZone").val() == "ALL") {
                var ZonewithComma = "";

                $('#TransactinoVelocityZone option').each(function () {
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
                WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactinoVelocityZone option:selected").text() + "' ";
            }

        }

        if ($("#TransactinoVelocityState").text() == "Select" || $("#TransactinoVelocityState").text() == undefined) {
            alert("Select State");
            return;
        } else {
            if ($("#TransactinoVelocityState").val() == "ALL") {
                var StatewithComma = "";
                $('#TransactinoVelocityState option').each(function () {
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
                WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactinoVelocityState option:selected").text().toUpperCase() + "' ";
            }

        }


        if ($("#TransactinoVelocityDistrict").text() == "Select" || $("#TransactinoVelocityDistrict").text() == undefined) {
            alert("Select District");
            return;
        } else {
            if ($("#TransactinoVelocityDistrict").val() == "ALL") {
                var DistrictwithComma = "";

                $('#TransactinoVelocityDistrict option').each(function () {
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
                WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactinoVelocityDistrict option:selected").text().toUpperCase() + "' ";
            }
        }

        //if ($scope.TransactinoVelocityTaluk == "Select" || $scope.TransactinoVelocityTaluk == undefined) {
        //    alert("Select Taluk");
        //    return;
        //} else {
        //    if ($scope.TransactinoVelocityTaluk == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactinoVelocityTaluk + "' ";
        //    }
        //}


        //if ($scope.TransactinoVelocityVillage == "Select" || $scope.TransactinoVelocityVillage == undefined) {
        //    alert("Select Village");
        //    return;
        //} else {
        //    if ($scope.TransactinoVelocityVillage == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactinoVelocityVillage + "' ";
        //    }
        //}
        DIMSFactory.ViewColumnEditing("UnnatiTransactionVelocity", UserCode, WhereCondition);

    }


    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {

        var STDATE = ($scope.TransactionVelocityFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.TransactionVelocityToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }

        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

        var WhereCondition = " where CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "'  ";
        if ($scope.TransactionVelocityMemberType == "ALL") {
            WhereCondition += " AND ";
            WhereCondition += "  TOTAL_METERS >=";
            WhereCondition += " CASE WHEN MEMEBER_TYPE='Stockist' THEN ";
            WhereCondition += " 40000 ";
            WhereCondition += " ELSE";
            WhereCondition += "  5000 ";
            WhereCondition += "  END ";
        }
        else if ($scope.TransactionVelocityMemberType == "Stockist") {
            WhereCondition += " AND TOTAL_METERS >=40000   AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
        }
        else if ($scope.TransactionVelocityMemberType == "Retailer") {
            WhereCondition += " AND TOTAL_METERS >=5000  AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
        }
        else {
            WhereCondition += " AND  MEMEBER_TYPE='" + $scope.TransactionVelocityMemberType + "'";
        }
        if ($("#TransactinoVelocityZone").text() == "Select" || $("#TransactinoVelocityZone").text() == undefined) {
            alert("Select zone");
            return;
        } else {
            if ($("#TransactinoVelocityZone").val() == "ALL") {
                var ZonewithComma = "";

                $('#TransactinoVelocityZone option').each(function () {
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
                WhereCondition = WhereCondition + " AND ZONE='" + $("#TransactinoVelocityZone option:selected").text() + "' ";
            }

        }

        if ($("#TransactinoVelocityState").text() == "Select" || $("#TransactinoVelocityState").text() == undefined) {
            alert("Select State");
            return;
        } else {
            if ($("#TransactinoVelocityState").val() == "ALL") {
                var StatewithComma = "";
                $('#TransactinoVelocityState option').each(function () {
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
                WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $("#TransactinoVelocityState option:selected").text().toUpperCase() + "' ";
            }

        }


        if ($("#TransactinoVelocityDistrict").text() == "Select" || $("#TransactinoVelocityDistrict").text() == undefined) {
            alert("Select District");
            return;
        } else {
            if ($("#TransactinoVelocityDistrict").val() == "ALL") {
                var DistrictwithComma = "";

                $('#TransactinoVelocityDistrict option').each(function () {
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
                WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $("#TransactinoVelocityDistrict option:selected").text().toUpperCase() + "' ";
            }
        }

        //if ($scope.TransactinoVelocityTaluk == "Select" || $scope.TransactinoVelocityTaluk == undefined) {
        //    alert("Select Taluk");
        //    return;
        //} else {
        //    if ($scope.TransactinoVelocityTaluk == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND TALUK='" + $scope.TransactinoVelocityTaluk + "' ";
        //    }
        //}


        //if ($scope.TransactinoVelocityVillage == "Select" || $scope.TransactinoVelocityVillage == undefined) {
        //    alert("Select Village");
        //    return;
        //} else {
        //    if ($scope.TransactinoVelocityVillage == "ALL")
        //    { } else {
        //        WhereCondition = WhereCondition + " AND VILLAGE='" + $scope.TransactinoVelocityVillage + "' ";
        //    }
        //}


        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiTransactionVelocity",
            WhereClause: WhereCondition,
            "Type": "Get"

        });

        DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiTransactionVelocity", UserCode, WhereCondition, Data, "transactionVelocityReport_Table");


    }

});

// Zone drop  down on change functionality

function GetStateMasterVeloucity()
{
    
    var ZoneCodeData = "";

    if ($("#TransactinoVelocityZone").text() == "Select" || $("#TransactinoVelocityZone").text() == undefined) {
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

        if ($("#TransactinoVelocityZone").val() == "ALL")
        {
            $('#TransactinoVelocityState').empty();
            $("#TransactinoVelocityState").append($("<option></option>").val("ALL").html("ALL"));

            $("#TransactinoVelocityDistrict").empty();
            $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));
            return;
        }

        $('#TransactinoVelocityState').empty();
        $("#TransactinoVelocityState").append($("<option></option>").val("ALL").html("ALL"));

        $("#TransactinoVelocityDistrict").empty();
        $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));

        var ZoneData = JSON.stringify({
            //ID: UserCode,
            //UserCode: UserCode,
            //UserRoleType: UserType,
            Zone_Code: $("#TransactinoVelocityZone").val()
        });

        TransacionVeloucityFactory.getStateDataForUnnati(ZoneData).success(function (response) {

            if (response != "") {
                var Result = JSON.parse(response);
                if (Result != "") {

                    //$('#TransactionSummaryState').empty();
                    //$("#TransactionSummaryState").append($("<option></option>").val("ALL").html("ALL"));
                    for (var i = 0; i < Result.length; i++) {
                        if (Result[i]["STATE_NAME"] != "All") {
                            $("#TransactinoVelocityState").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_NAME"]));
                        }
                    }

                    //$scope.TransactionSummaryStateArray = "ALL";

                    //$scope.TransactionSummaryStateArray = [];
                    //$scope.TransactionSummaryStateArray = [{ STATE_NAME: 'ALL' }];
                    //$scope.TransactionSummaryStateArray = Result;

                    //$scope.TransactionSummaryStateArray = "ALL";

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
}

// State drop  down on change functionality

function GetDistrictMasterVeloucity()
{
    if ($("#TransactinoVelocityState").text() == "Select" || $("#TransactinoVelocityState").text() == undefined) {
    } else {
        // UserType = "ZH";
        if ($("#TransactinoVelocityState option:selected").text() == "ALL")
        {
            $("#TransactinoVelocityDistrict").empty();
            $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));
            return;
        }

        $("#TransactinoVelocityDistrict").empty();
        $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));

        var Zone_StateData = JSON.stringify({
            State: $("#TransactinoVelocityState option:selected").text().toUpperCase()
        });
        TransacionVeloucityFactory.getDistrictData(Zone_StateData).success(function (response) {
            if (response != "") {

                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $("#TransactinoVelocityDistrict").empty();
                    $("#TransactinoVelocityDistrict").append($("<option></option>").val("ALL").html("ALL"));

                    //$scope.TransactionSummaryDistrictArray = [];
                    // $scope.TransactionSummaryDistrictArray = [{ DISTRICT: 'ALL' }];
                    //$scope.TransactionSummaryDistrictArray = Result;

                    //$scope.TransactionSummaryDistrict = "ALL";

                    for (var i = 0; i < Result.length; i++) {

                        $("#TransactinoVelocityDistrict").append($("<option></option>").val(Result[i]["DISTRICT"]).html(Result[i]["DISTRICT"]));
                    }
                }

            }

        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
    }
}