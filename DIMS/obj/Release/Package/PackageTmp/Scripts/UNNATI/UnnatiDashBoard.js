
// DEVELOPED BY :SHIVA KIRAN
// ORGANISATION :ENVISION
// CLIENT: HIL 
// CREATED DATE :15-03-2016
// MODIFIED DATE:05-04-2016

// IT IS USED FOR DISPLAYING UNNATI DASHBOARD SCREEN
DIMS.controller('UnnatiDashBoardCtrl', function ($scope, $location, DIMSFactory, DIMSUnnatiFactory, $compile) {
    var UserCode = $("#USERCODE_UnnatiDashboard").val();
    var UserType = $("#USERTYPE_UnnatiDashboard").val();
    var StateCode = $("#StateCode_UnnatiDashboard").val();
    var StateName = $("#StateName_UnnatiDashboard").val();
    // UserCode = "561";

    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    var RoleName = UserType;
    // = "ZH";
     //RoleName = "Stockist";
    ShowLoader();
    if (RoleName == "Stockist" || RoleName == "STOCKIST") {


        $("#UnnatiUsersDiv").hide();
        $("#DatePickerDiv").css({"display":"none"});
        $("#StockiestDiv").show();
        var Data = JSON.stringify({

            UserCode: UserCode,
            ReportName: "UnnatiMemberLogin",
            RoleName: RoleName

        });
        ShowLoader();
        DIMSUnnatiFactory.getDashBoardStockiestData(Data).success(function (response) {
           // alert(response.tabledata);
            var Result = JSON.parse(response.tabledata);
            if (Result != "") {
                var Columnname = "Month";
                for (var i = 0; i < Result.length; i++) {
                    if (Result[i]["Volume Reported(MT)"] == "")
                    {
                        Result[i]["Volume Reported(MT)"] = 0;
                    }
                    if (Result[i]["Points Earned"] == "" ) {
                        Result[i]["Points Earned"] = 0;
                    }
                   if (Result[i]["Point Balance"]=="") {
                        Result[i]["Point Balance"] = 0;
                    }
                    $('#UnnatiDashboard_StockiesTable').dataTable().fnAddData([

       Result[i]["Volume Reported(MT)"],
      Result[i]["Points Earned"],
        Result[i]["Point Balance"],
       //Result[i]["Nearest Gift"]

                    ]
     );
                }


            }
            HideLoader();
        }).error(function () {
            HideLoader();
        });;
    } else {
        $("#UnnatiUsersDiv").show();
        $("#StockiestDiv").hide();
       // var StateName = "Andhra Pradesh";
        
        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiMemberLogin",
            RoleName: RoleName,
            StateName: StateName,
            StateCode: StateCode
        });
        ShowLoader();
        DIMSUnnatiFactory.getDashBoardData(Data).success(function (response) {
       // alert(response.tabledata);
        if (response.tabledata != "") {

            var Result = JSON.parse(response.tabledata);

               // RoleName = "SH";

                //RoleName = "ZH";
                //RoleName = "FSO";
               
                var Columnname = "ZONE";
                if (RoleName == "ZH" || RoleName == "RCC" || RoleName == "ZSC") {
             
                    $("#DashboardHeaderText").text("My Zone");
                    Columnname = "STATE";
                } else if (RoleName == "NSH" || RoleName == "NCC" || RoleName == "SBU1MARKETING_HEAD"|| RoleName == "COO"|| RoleName == "ADMIN"|| RoleName == "CFO"|| RoleName == "BU_FIN_HEAD"|| RoleName == "FIN_CONTROLLER/CS") {
                    Columnname = "ZONE";
                    $("#DashboardHeaderText").text("All Zones");
                } else if (RoleName == "SH") {
                    Columnname = "My State";
                    $("#DashboardHeaderText").text("My State");
                }
                else if (RoleName == "TM") {
                    Columnname = "My Territory";
                    $("#DashboardHeaderText").text("My Territory");
                }
                else if (RoleName == "FSO" || RoleName == "FSO_BU2") {
                    Columnname = "My Location";
                    $("#DashboardHeaderText").text("My Location");
                }



                for (var i = 0; i < Result.length; i++) {
                    if (Result[i]["Total Volume Reported"] == "")
                    {
                        Result[i]["Total Volume Reported"] = 0;
                    }
                    if (Result[i]["Total Volume Reported Retailer"] == "") {
                        Result[i]["Total Volume Reported Retailer"] = 0;
                    }
                    $('#UnnatiDashboard_Table').dataTable().fnAddData([
                     Result[i][Columnname],
      Result[i]["Total Enrollment"],
       Result[i]["Total Volume Reported"],
      Result[i]["No of Current Month Transaction"],
        Result[i]["No of Current Month Redemption"],
       //Result[i]["Pending Approvals"],
      Result[i]["Pending Approvals >45 Days"],
        Result[i]["Total Enrollment Retailer"],
       Result[i]["Total Volume Reported Retailer"],
      Result[i]["No of Current Month Transaction Retailer"],
        Result[i]["No of Current Month Redemption Retailer"],
       //Result[i]["Pending Approvals Retailer"],
      Result[i]["Pending Approvals Retailer>45 Days"]

                    ]
     );
                }


            }
            HideLoader();
        }).error(function () {
            HideLoader();
        });;

        //angular.element(document).on('changeDate', '#Date', function () {
           
        //});
    }

    $scope.SelectedDate = function () {
        var Date = $("#Date").val();
        if (Date == null || Date == undefined || Date == "" || Date == "null")
        {
            alert("Please select Month");
            return;
            
        }

        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiMemberLogin",
            RoleName: RoleName,
            StateName: StateName,
            StateCode: StateCode,
            Date: Date
        });
        //if (RoleName == "Stockist" || RoleName == "STOCKIST") {

        //    DIMSUnnatiFactory.getFilterDashBoardStockiestData(Data).success(function (response) {
        //        // alert(response.tabledata);
        //        var Result = JSON.parse(response.tabledata);
        //        $('#UnnatiDashboard_StockiesTable').dataTable().fnClearTable();
        //        if (Result != "") {
        //            var Columnname = "Month";
        //            for (var i = 0; i < Result.length; i++) {
        //                if (Result[i]["Volume Reported(MT)"] == "") {
        //                    Result[i]["Volume Reported(MT)"] = 0;
        //                }
        //                if (Result[i]["Points Earned"] == "") {
        //                    Result[i]["Points Earned"] = 0;
        //                }
        //                if (Result[i]["Point Balance"] == "") {
        //                    Result[i]["Point Balance"] = 0;
        //                }
        //                $('#UnnatiDashboard_StockiesTable').dataTable().fnAddData([

        //   Result[i]["Volume Reported(MT)"],
        //  Result[i]["Points Earned"],
        //    Result[i]["Point Balance"]
        //    //,Result[i]["Nearest Gift"]

        //                ]
        // );
        //            }


        //        }
        //        HideLoader();
        //    });
        //}
        //else {
            ShowLoader();
            DIMSUnnatiFactory.GetFilterDataForUnnatiDashboard(Data).success(function (response) {
              //  alert(response);
                if (response.tabledata != "")
                    {
                var Result = JSON.parse(response.tabledata);

                    //RoleName = "SH";

                    // RoleName = "ZH";
                    //RoleName = "FSO";
                    var Columnname = "ZONE";
                    if (RoleName == "ZH" || RoleName == "RCC" || RoleName == "ZSC") {

                        $("#DashboardHeaderText").text("My Zone");
                        Columnname = "STATE";
                    } else if (RoleName == "NSH" || RoleName == "NCC" || RoleName == "SBU1MARKETING_HEAD" || RoleName == "COO" || RoleName == "ADMIN" || RoleName == "CFO" || RoleName == "BU_FIN_HEAD" || RoleName == "FIN_CONTROLLER/CS") {
                        Columnname = "ZONE";
                        $("#DashboardHeaderText").text("All Zones");
                    } else if (RoleName == "SH") {
                        Columnname = "My State";
                        $("#DashboardHeaderText").text("My State");
                    }
                    else if (RoleName == "TM") {
                        Columnname = "My Territory";
                        $("#DashboardHeaderText").text("My Territory");
                    }
                    else if (RoleName == "FSO" || RoleName == "FSO_BU2") {
                        Columnname = "My Location";
                        $("#DashboardHeaderText").text("My Location");
                    }


                    $('#UnnatiDashboard_Table').dataTable().fnClearTable();

                    for (var i = 0; i < Result.length; i++) {
                        if (Result[i]["Total Volume Reported"] == "") {
                            Result[i]["Total Volume Reported"] = 0;
                        }
                        if (Result[i]["Total Volume Reported Retailer"] == "") {
                            Result[i]["Total Volume Reported Retailer"] = 0;
                        }

                        //$('#UnnatiDashboard_Table tbody').empty();
                        $('#UnnatiDashboard_Table').dataTable().fnAddData([
                         Result[i][Columnname],
          Result[i]["Total Enrollment"],
           Result[i]["Total Volume Reported"],
          Result[i]["No of Current Month Transaction"],
            Result[i]["No of Current Month Redemption"],
           //Result[i]["Pending Approvals"],
          Result[i]["Pending Approvals >45 Days"],
            Result[i]["Total Enrollment Retailer"],
           Result[i]["Total Volume Reported Retailer"],
          Result[i]["No of Current Month Transaction Retailer"],
            Result[i]["No of Current Month Redemption Retailer"],
           //Result[i]["Pending Approvals Retailer"],
          Result[i]["Pending Approvals Retailer>45 Days"]

                        ]
         );
                    }


                }
                HideLoader();
            }).error(function () {
                HideLoader();
            });
           
        //}
    }
});