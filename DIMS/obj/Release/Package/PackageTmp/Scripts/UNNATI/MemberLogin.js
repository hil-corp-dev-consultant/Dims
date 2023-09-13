DIMS.controller('UnnatiMemberLoginReportCtrl', function ($scope, $location, DIMSUnnatiFactory, DIMSFactory, $compile) {
    $('#undo_redo_to').empty();
    UnnatiMemberLoginReportScope = $scope;
    $scope.templatesettings = { HeaderTitle: "UnnatiMemberLoginReportCtrl" };
    var UserCode = $("#USERCODE_UnnatiMemberLogin").val();
    // UserCode = "561";
    $scope.go = function (path) {

        $location.path(path);
    };
    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        ReportName: "UnnatiMemberLogin"
    });
    $scope.DownloadFile = function (typeoffile) {

        var FileName = "MemberLoginReport";
        if ($scope.MemberLoginFromDate == "" || $scope.MemberLoginFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.MemberLoginToDate == "" || $scope.MemberLoginToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.MemberLoginFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.MemberLoginToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiMemberLogin",
                WhereClause: " where CONVERT(DATE, LOGIN_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, LOGIN_DATE)<='" + finalEndDate + "'  "

            });
            $.ajax({

                url: '../../Home/SetInputData',
                type: "POST",
                datatype: "JSON",
                data: { InputData: Data, ReportType: typeoffile, FileName: FileName },
                async: false,
                cache: false,
                success: function (response) {
                    window.location.href = '../../Home/GenerateReport';
                },
                error: function () {
                    alert("Technical error has been occured.Please try again later");

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

    });

    $scope.Get = function () {

        var data = "<Data> ";
        //data+="<REDEMPTION>";

        data += "<REDEMPTION><MEMBERSHIP_ID>RS1100002</MEMBERSHIP_ID><MEMBER_NAME>Test3 Final3</MEMBER_NAME><MEMBER_TYPE>Retailer</MEMBER_TYPE><ORDER_DATE>13/06/2016</ORDER_DATE><STATUS_CHANGE_DATE>13/06/2016</STATUS_CHANGE_DATE><ORDER_NO>100000081</ORDER_NO><SUB_ORDER_NO>_000123156</SUB_ORDER_NO><STATUS>Ordered</STATUS><POINTS>20</POINTS><PRODUCT_CODE>Cric10</PRODUCT_CODE><PRODUCT_NAME>Cricket ball</PRODUCT_NAME><NC_PRODUCT_CODE>1</NC_PRODUCT_CODE><ZONE>East</ZONE><CONTACT_NO>2222222222</CONTACT_NO><STATE>Himachal Pradesh</STATE><CITY>New Delhi</CITY><ADDRESS>Siliguri New jalpaiguri    Haryana India</ADDRESS><PRODUCT_MRP_VALUE>10</PRODUCT_MRP_VALUE>	  <FSO_NAME>Anil Kumar Y</FSO_NAME><FIRM_NAME>Test3</FIRM_NAME>";

                 data+="</REDEMPTION>";

       

        
        
       


        data += " </Data>";
        $.ajax({
            method: 'POST',
            url: '../../Home/TestUnnati',
            data: { Data: data },
        }).then(function successCallback(response) {
            alert(response);
            var result = JSON.parse(response.tabledata);
            alert(result);
        }, function errorCallback(response) {
            alert("Error : " + response);
        });
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
        if (ControllerName != "UnnatiMemberLoginReportCtrl") {
            ControllerName = "UnnatiMemberLoginReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiMemberLoginReportCtrl");

            $compile(elem.contents())(UnnatiMemberLoginReportScope);
        }

        $("#ColumnEditingModal").modal('show');

    }

    $scope.ViewColumnEditing = function () {

        var STDATE = ($scope.MemberLoginFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.MemberLoginToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }
        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

        DIMSFactory.ViewColumnEditing("UnnatiMemberLogin", UserCode, " where CONVERT(DATE, LOGIN_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, LOGIN_DATE)<='" + finalEndDate + "'  ");

    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var STDATE = ($scope.MemberLoginFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.MemberLoginToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }
        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiMemberLogin",
            WhereClause: "  where CONVERT(DATE, LOGIN_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, LOGIN_DATE)<='" + finalEndDate + "'   ",
            "Type": "Get"

        });
        DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiMemberLogin", UserCode, "  where CONVERT(DATE, LOGIN_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, LOGIN_DATE)<='" + finalEndDate + "' ", Data, "MemberLoginReportList");




        //DIMSFactory.getReportData(Data).success(function (response) {

        //    var Result = JSON.parse(response.tabledata);


        //    if (Result != "") {
        //        var ReportList_data = Result["ReportListData"];
        //        getLookUpData_Reports(ReportList_data, "", "", "MemberLoginReportList");
        //    }
        //    // DIMSFactory.SaveColumnEditingData("UnnatiPointBalance", UserCode, " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + " ORDER BY ID DESC ");
        //});
    }

    //  Get Member Login details with inputs
    $scope.GetMemberLoginReport = function () {
        if ($scope.MemberLoginFromDate == "" || $scope.MemberLoginFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.MemberLoginToDate == "" || $scope.MemberLoginToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.MemberLoginFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.MemberLoginToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiMemberLogin",
                WhereClause: " where CONVERT(DATE, LOGIN_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, LOGIN_DATE)<='" + finalEndDate + "'  ",
                "Type": "Get"

            });

            DIMSFactory.getReportData(Data).success(function (response) {


                getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "MemberLoginReportList", UserSelectedColumnName);

            });
        }
    }



});