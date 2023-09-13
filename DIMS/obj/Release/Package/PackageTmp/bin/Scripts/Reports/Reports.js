//Karthik
DIMS.controller('DailySalesTrackerControl', function ($scope, $location) {
    $scope.templatesettings = { HeaderTitle: "DailySalesTracker" };
    $scope.go = function (path) {
        $location.path(path);
    };

    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });

    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    angular.element(document).ready(function () {
        ShowLoader();
        //GetDaulySalesTraker();
    });

    function GetDaulySalesTraker() {
       
    }

});

DIMS.controller('CreditLimitTrackerController', function ($scope, $location) {
    $scope.templatesettings = { HeaderTitle: "CreditLimitTracker" };
    $scope.go = function (path) {
        $location.path(path);
    };

    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });

    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    angular.element(document).ready(function () {
        ShowLoader();
        $("#Monthy").datepicker({
            format: "MM-yyyy",
            viewMode: "months",
            autoclose: true,
            minViewMode: "months"
        });

       
    });
  
});
//End Karthik

DIMS.controller('BudgetTargetUploadControl', function ($scope, $location) {
    $scope.templatesettings = { HeaderTitle: "BudgetTargetUpload" };
    $scope.go = function (path) {
        $location.path(path);
    };
});
//end Divya

DIMS.controller('PriceCardRateUploadControl', function ($scope, $location, DIMSFactory, $compile) {

    $scope.go = function (path) {

        CheckUserSession();
        $location.path(path);
    }

});

DIMS.controller('DiscountSummaryControl', function ($scope, $location, DIMSFactory, $compile) {



    $scope.go = function (path) {

        CheckUserSession();
        $location.path(path);
    }
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });

    // jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    var ExcelCount = 0;
    


    $scope.GetDiscountSummary = function () {

        var UserCode = $("#USERCODE_Discounts").val();
        var UserName = $("#USERNAME_Discounts").val();
        var UserRole = $("#USERTYPE_Discounts").val();


        var Fromdate = $("#DiscountSummaryFromDate").val();
        var Todate = $("#DiscountSummaryToDate").val();
        var DiscountCategory = $("#TypeofDiscount").val();

        if (Fromdate == undefined || Fromdate == null || Fromdate == "") {
            alert("Please Select From date");
        }
        else if (Todate == undefined || Todate == null || Todate == "") {
            alert("please select To date");
        }
        else {
            var STDATE = ($("#DiscountSummaryFromDate").val()).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($("#DiscountSummaryToDate").val()).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }

            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

            var Data = JSON.stringify({ "FromDate": finalStartDate, "ToDate": finalEndDate, "Category": DiscountCategory ,"UserCode":UserCode,"UserRole":UserRole});
            var table1234 = $('#tbl_DiscountSummary').DataTable();
            $.ajax({
                async: false,
                type: 'POST',
                data: { Data: Data },
                url: '../Reports/GetDiscountSummary',
                beforeSend: function () {
                    ShowLoader();
                },
                success: function (Resp) {

                    if (Resp != "No Data") {

                        Resp = JSON.parse(Resp);
                        var HtmlCode = "";
                        table1234.clear().draw();
                        table1234.destroy();
                      // 
                        for (var i = 0; i < Resp.length; i++) {


                          //  $('#tbl_DiscountSummary').dataTable().fnAddData([Resp[i]["Reportname"], Resp[i]["approved"], Resp[i]["Pending"], Resp[i]["Rejected"]]);

                            HtmlCode = HtmlCode + "<tr>";
                            HtmlCode = HtmlCode + "<td>" + Resp[i]["Reportname"] + "</td>";
                            HtmlCode = HtmlCode + "<td>" + Resp[i]["approved"] + "</td>";
                            HtmlCode = HtmlCode + "<td>" + Resp[i]["Pending"] + "</td>";
                            HtmlCode = HtmlCode + "<td>" + Resp[i]["Rejected"] + "</td>";
                            HtmlCode = HtmlCode + "</tr>";
                            ExcelCount = parseInt(Resp[i]["approved"]) + parseInt(Resp[i]["Pending"]) + parseInt(Resp[i]["Rejected"]);
                            OnchangeCount = parseInt(Resp[i]["approved"]) + parseInt(Resp[i]["Pending"]) + parseInt(Resp[i]["Rejected"]);
                        }
                      
                    //    $("#tbl_DiscountSummary tbody").empty();

                         HtmlCode = "<tbody>" + HtmlCode + "</tbody>";

                        // HtmlCode = HtmlCode + '<thead><tr style="background-color: #d2401a; color: white; font-size: 13px;"><th style="text-align: center">S No</th><th style="text-align: center">Sales Group Code</th><th style="text-align: center">Sales Group Name</th><th style="text-align: center">Price Card Rate</th></tr></thead>';
                         $("#tbl_DiscountSummary tbody").remove();
                       $("#tbl_DiscountSummary").append(HtmlCode);

                       $("#tbl_DiscountSummary").DataTable();
                    //    $("#Discounts_Div").css("display", "block");

                        // $("#tbl_DiscountSummary").show();

                    }
                    else {

                        $('#tbl_DiscountSummary').dataTable().fnClearTable();
                        $("#Discounts_Div").css("display", "block");

                        HideLoader();
                    }
                },
                complete: function () {
                    HideLoader();
                },
                error: function () {
                    HideLoader();
                }

            })
        }
    }

    $scope.DownloadFile = function (typeoffile) {

        var UserCode = $("#USERCODE_Discounts").val();
        var UserName = $("#USERNAME_Discounts").val();
        var UserRole = $("#USERTYPE_Discounts").val();

        var Searchvalue = "";

            if (!$('#tbl_DiscountSummary').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }
            var Fromdate = $("#DiscountSummaryFromDate").val();
            var Todate = $("#DiscountSummaryToDate").val();
            var DiscountCategory = $("#TypeofDiscount").val();

            if (Fromdate == undefined || Fromdate == null || Fromdate == "") {
                alert("Please Select From date");
            }
            else if (Todate == undefined || Todate == null || Todate == "") {
                alert("please select To date");
            }
            else if (DiscountCategory == "ALL") {
                alert("Please select any Other Discount Category");
            }
            else if (ExcelCount==0) {
                alert("There is no data for this Discount Type");
                
            }
            else if (OnchangeCount == 0)
            {
                alert("Please Click on Submit button");
            }
            else {
                var STDATE = ($("#DiscountSummaryFromDate").val()).split('/');
                var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
                var startDateValuecmp = startDateValue.getTime();
                var ENDATE = ($("#DiscountSummaryToDate").val()).split('/');
                var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
                var endDateValuecmp = endDateValue.getTime();

                if (startDateValuecmp > endDateValuecmp) {
                    alert("To Date cannot be less than From Date");
                    return;
                }

                var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
                var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
                var WhereCondition = "";

                var ReportName = "";
                var FileName = "";
                if (DiscountCategory == "AdditionalDiscount") {
                    FileName = "Discount_Structures";
                    ReportName = "DiscountStructure";
                    if(UserRole=="ZH")
                    {
                        WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Additional Discount' and (DS.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) or DS.CreatedBy='" + UserCode + "') ";

                    }
                else{
                    WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Additional Discount' ";
                }
                }
                else if (DiscountCategory == "TargetDiscount") {
                    FileName = "Discount_Structures";
                    ReportName = "DiscountStructure";
                    if (UserRole == "ZH")
                    {
                        WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Target Discount' and (DS.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) or DS.CreatedBy='" + UserCode + "') ";

                    }
                    else {
                        WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Target Discount' ";

                    }
                }
                else if (DiscountCategory == "Others") {
                    FileName = "Discount_Structures";
                    ReportName = "DiscountStructure";
                    if (UserRole == "ZH")
                    {
                        WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Other Discount' and (DS.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) or DS.CreatedBy='" + UserCode + "') ";

                    }
                    else
                    {
                        WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Other Discount' ";

                    }
                }
                else if (DiscountCategory == "AgreedrateDiscount") {
                    FileName = "Discount_Structures";
                    ReportName = "DiscountStructure";
                    if (UserRole == "ZH")
                    {
                        WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Agreed Rate Discount' and (DS.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) or DS.CreatedBy='" + UserCode + "') ";

                    } else {
                        WhereCondition = " WHERE CONVERT(date,DS.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,DS.Created_Date)<= '" + finalEndDate + "'  and DS.Discount_Type='Agreed Rate Discount' ";

                    }
                }
                else if (DiscountCategory == "DiscountWithCommission") {
                    FileName = "ProjectDiscountWithCommission";
                    ReportName = "ProjectDiscountWithCommisssion";

                    if (UserRole == "ZH") {
                        WhereCondition = " WHERE CONVERT(date,CREATED_DATE)>= '" + finalStartDate + "' and CONVERT(date,CREATED_DATE)<= '" + finalEndDate + "' and (REQUSET_CREATEDBY IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) or REQUSET_CREATEDBY='" + UserCode + "')";

                    }
                    else {
                        WhereCondition = " WHERE CONVERT(date,CREATED_DATE)>= '" + finalStartDate + "' and CONVERT(date,CREATED_DATE)<= '" + finalEndDate + "'";

                    }

                }
                else if (DiscountCategory == "DirectBilling") {
                    FileName = "Discount_Direct_Billing";
                    ReportName = "DirectBilling";
                    if (UserRole == "ZH") {
                        WhereCondition = " WHERE CONVERT(date,PDDB.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,PDDB.Created_Date)<= '" + finalEndDate + "' and (PDDB.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) or PDDB.CreatedBy='" + UserCode + "')";

                    }
                    else {
                        WhereCondition = " WHERE CONVERT(date,PDDB.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,PDDB.Created_Date)<= '" + finalEndDate + "'";

                    }

                }
                else if (DiscountCategory == "NetBilling") {
                    FileName = "NetBilling";
                    ReportName = "NetBillingForStockist";
                    if (UserRole == "ZH") {
                        WhereCondition = " WHERE CONVERT(date,NB.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,NB.Created_Date)<= '" + finalEndDate + "' and (NB.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) or NB.CreatedBy='" + UserCode + "')";

                    }
                    else {
                        WhereCondition = " WHERE CONVERT(date,NB.Created_Date)>= '" + finalStartDate + "' and CONVERT(date,NB.Created_Date)<= '" + finalEndDate + "'";

                    }

                }
                var UserCode = "";
                var Data = JSON.stringify({
                    UserCode: UserCode,
                    ReportName: ReportName,
                    WhereClause: WhereCondition,
                    "searchvalue": Searchvalue

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
                        window.location.href = '../../Home/GenerateReport_Discounts';
                    },
                    complete: function () {
                        HideLoader();
                    },
                    error: function () {
                        alert("Technical error has been occured.Please try again later");

                    }
                });
            }
    }

    angular.element(document).on('change', '#TypeofDiscount', function () {
        OnchangeCount = 0;
    });
    
});