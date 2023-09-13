var ProjectDiscountWithCommissionScope;

DIMS.controller('ProjectDiscountWithCommissionListControl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "ProjectDiscountWithCommissionList" };
    $scope.go = function (path) {
        $location.path(path);
    };

    var UserName = $("#USERNAME").val();
    var UserRole = $("#USERTYPE").val();
    var UserCode = $("#USERCODE").val();
    var WhereCondition = "";

    //$("#ProjectDiscountWithCommisssion").dataTable({
    //});

    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }

    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------

    angular.element(document).ready(function () {
       
        if (UserRole == "SH") {
            WhereCondition = " Where REQUSET_CREATEDBY='" + UserCode + "'";
            $("#Approve").css({ "display": "none" });
            $("#Reject").css({ "display": "none" });
        }
        else if (UserRole == "ZH") {
            WhereCondition = " where REQUEST_STATUS IN(1) and REQUSET_CREATEDBY IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select DISCOUNTID as 'Discount Id', CUSTOMER_CODE as 'Customer Code', CUSTMER_NAME as 'Customer Name', ZONE as 'Zone', STATE as 'State', DISTRICT as 'District',PriceCardRate as 'Price Card Rate',AGREED_RATE_INR as 'Agreed Rate(INR/M)', COMMISSION as 'Commission(%)', EXPECTED_SALE as'Expected Sale(MT)', EXPECTED_NSR as 'Expected NSR(INR)',STOCKIST_CODE as 'Stockist Code', STOCKIST_NAME as 'Stockist Name', REQUESTBY_CODE_NAME as 'Requester',(case when REQUEST_STATUS=1 then 'Waiting Approval For ZH' when REQUEST_STATUS=2 then 'Rejected By ZH'  when REQUEST_STATUS=3 then 'Waiting Approval For NSH' when REQUEST_STATUS=4 then 'Rejected By NSH' else 'Approved' end)as 'Request Status',  DESCRIPTION as 'Remarks' from REPORT_PROJECT_DISCOUNT_WITH_COMMISSION where REQUSET_CREATEDBY='" + UserCode + "'";
        }
        else if (UserRole == "NSH") {
            WhereCondition = "where REQUEST_STATUS IN(3)";
            $("#HideAddNew").css("display", "none");
        }
        else  {
            WhereCondition = "";
            $("#HideAddNew").css("display", "none");
            $("#Approve").css({ "display": "none" });
            $("#Reject").css({ "display": "none" });
        }

        var Data = JSON.stringify({
            UserCode: UserCode,
            ReportName: "ProjectDiscountWithCommisssion",
            WhereClause: WhereCondition

        });

        DIMSFactory.getReportData(Data).success(function (res) {

            $("#ProjectDiscountWithCommisssion").dataTable().fnDestroy();
            var tableUserMapping = $("#ProjectDiscountWithCommisssion").DataTable({

                "bDestroy": true,
                "bSortable": true,
                scrollY: "200px",
                scrollX: true,
                scrollCollapse: true,
                paging: true,
                fixedColumns: {
                    leftColumns: 0
                }, "order": [[1, "desc"]],
                "processing": false, // for show progress bar
                "serverSide": true, // for process server side
                "filter": true, // this is for disable filter (search box)
                "orderMulti": false, // for disable multiple column at once

                "ajax": {
                    url: '../../Reports/GetProjectDiscountWithCommissionStructureData',
                    "type": "POST",
                    "beforeSend": function () {
                        // ShowLoader();
                    },
                    "datatype": "json",
                    "complete": function () {
                        var Count = 0;
                        $("#ProjectDiscountWithCommisssion tbody tr").each(function () {
                            if ($(this).find('input').is(':disabled')) {

                            }
                            else {
                                Count++;
                            }
                        });
                        if (Count == 0) {
                            $("#StockistCheckAll").attr("disabled", "disabled");
                        }
                        // HideLoader();
                    }
                }
                  , "columns": [{ "data": "Discount Id", "name": "Discount Id" },
                               { "data": "Discount Id", "name": "Discount Id", "bSortable": "true" },
                            { "data": "Customer Code", "name": "Customer Code", "bSortable": "true" },
                            { "data": "Customer Name", "name": "Customer Name", "bSortable": "true" },
                            { "data": "Zone", "name": "Zone", "bSortable": "true" },
                            { "data": "State", "name": "State", "bSortable": "true" },
                            { "data": "District", "name": "District", "bSortable": "true" },
                            { "data": "Price Card Rate", "name": "Price Card Rate", "bSortable": "true" },
                            { "data": "Agreed Rate(INR/M)", "name": "Agreed Rate(INR/M)", "bSortable": "true" },
                            { "data": "Commission(%)", "name": "Commission(%)", "bSortable": "true" },
                            { "data": "Expected Sale(MT)", "name": "Expected Sale(MT)", "bSortable": "true", },
                            { "data": "Expected NSR(INR)", "name": "Expected NSR(INR)", "bSortable": "true", },
                               { "data": "Stockist Code", "name": "Stockist Code", "bSortable": "true" },
                            { "data": "Stockist Name", "name": "Stockist Name", "bSortable": "true" },
                            { "data": "Requester", "name": "Requester", "bSortable": "true" },
                            { "data": "Request Status", "name": "Request Status", "bSortable": "true" },
                            { "data": "Remarks", "name": "Remarks", "bSortable": "true" }                          

                  ],
                'columnDefs': [{
                    'targets': 0,
                    'searchable': false,
                    'orderable': false,
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        // alert(data);
                        //STK_
                        return '<input type="checkbox" name="id[]" value="'
                           + $('<div/>').text(data).html() + '" id="' + $('<div/>').text(data).html() + '" class="checkbox" ">';
                    }
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (UserRole == "SH" || UserRole == "COO" || UserRole == "CST1" || UserRole == "BU_FIN_HEAD") {
                        $(nRow).find('input').attr("disabled", "disabled");
                        // $("#StockistCheckAll").attr("disabled", "disabled");
                    }
                    if (UserRole == "ZH" && $(nRow).find('td:eq(14)').text().split('(')[1].replace(')',' ').trim() == UserCode) {
                        $(nRow).find('input').attr("disabled", "disabled");
                    }
                    $(nRow).children().each(function () {
                        if (isNaN($(this).text())) {
                            $(this).css({ 'text-align': 'left' })
                        }
                        else {
                            $(this).css({ 'text-align': 'right' })

                        }
                        if ($(this).text() == "Waiting Approval For ZH" || $(this).text() == "Waiting Approval For NSH") {
                            $(this).css('background-color', 'darkgray');
                        }
                        else if ($(this).text() == "Rejected By ZH" || $(this).text() == "Rejected By NSH") {
                            $(this).css('background-color', 'red');
                        }
                        else if ($(this).text() == "Approved") {
                            $(this).css('background-color', 'green');
                            if (UserRole == "NSH" || UserRole == "CST2")
                            { }
                            else {
                                $(nRow).find('input').attr("disabled", "disabled");
                            }
                        }
                    });


                    $(nRow).attr("id", 'STRow_' + aData["Discount Id"]);

                    return nRow;
                },


            });

        });
        //  jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');


    });

    $("#StockistCheckAll").change(function () {
        $(".checkbox").prop('checked', $(this).prop("checked"));
    });

    angular.element(document).on('change', '.checkbox', function () {

        if (false == $(this).prop("checked")) {
            $("#StockistCheckAll").prop('checked', false);
        }

        if ($('.checkbox:checked').length == $('.checkbox').length) {
            $("#StockistCheckAll").prop('checked', true);
        }
    })

    $("#ProjectDiscountWithCommisssion tbody").on('click', 'td', function () {
        if ($("#ProjectDiscountWithCommisssion").DataTable().data().count() != 0) {
            if ($(this).index() != "0") {
                var ID = $(this).parent().find('td:eq(1)').text();
                var Status = $(this).parent().find('td:eq(15)').text();
                if (Status == "Approved" && UserRole == "NSH" ) {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditCommissionDiv")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountWithCommission/" + ID);
                    })
                }
                else if (UserRole == "CST2") {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditCommissionDiv")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountWithCommission/" + ID);
                    })
                }
                else if (UserRole == "SH" && (Status == "Rejected By ZH" || Status == "Rejected By NSH")) {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditCommissionDiv")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountWithCommission/" + ID);
                    })
                }
                else if (UserRole == "ZH" && Status != "Approved" && Status != "Waiting Approval For NSH") {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditCommissionDiv")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountWithCommission/" + ID);
                    })
                }
                else if (UserRole == "NSH" && (Status == "Rejected By NSH" || Status == "Waiting Approval For NSH")) {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditCommissionDiv")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountWithCommission/" + ID);
                    })
                }
            }
        }
    });

    $scope.ApproveRequest = function () {

        var Discountidarray = new Array();
        if ($('.checkbox:checked').length != 0) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    var Newid = $(this).closest('tr').find('td:eq(14)').text().split('(')[1].replace(')', ' ').trim();
                    var CustID = $(this).closest('tr').find('td:eq(13)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text()+")";
                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(15)').text()+"^"+Newid+"^"+CustID);
                });
            }
            else {
                $('.checkbox:checked').each(function () {
                    var Newid = $(this).closest('tr').find('td:eq(14)').text().split('(')[1].replace(')', ' ').trim();
                    var CustID = $(this).closest('tr').find('td:eq(13)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text() + ")";

                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(15)').text() + "^" + Newid + "^" + CustID);
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            var Data = JSON.stringify({ DiscountData: Discountidarray });
            DIMSFactory.ChangeStatusForProjectDiscountWithCommission(Data).success(function (response) {
                if (response == "Success") {
                    alert("Successfully Approved");
                    $scope.go('ProjectDiscountWithCommissionList/');
                }
                else {
                    alert("Failed To Approve");
                }
            });

        }
        else {
            alert("please select any records");
        }
        // alert(JSON.stringify(Discountidarray));
    }

    $scope.RejectRequest = function () {
        var flag = 0;
        var Discountidarray = new Array();
        if ($('.checkbox:checked').length != 0 && $("#Remarks").val() != "" && $("#Remarks").val() != undefined) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    if ($(this).closest('tr').find('td:eq(15)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(15)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Discount to reject");
                        return false;
                        flag++;
                    }
                    else {
                        var New = $(this).closest('tr').find('td:eq(14)').text().split('(')[1].replace(')', ' ').trim();
                        var CustID = $(this).closest('tr').find('td:eq(13)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text() + ")";

                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(15)').text() + "^" + New + "^" + $("#Remarks").val()+"^"+CustID);
                    }
                });
            }
            else {
                $('.checkbox:checked').each(function () {

                    if ($(this).closest('tr').find('td:eq(15)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(15)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Discount to reject");
                        flag++;
                        return false;

                    }
                    else {
                        var New = $(this).closest('tr').find('td:eq(14)').text().split('(')[1].replace(')', ' ').trim();
                        var CustID = $(this).closest('tr').find('td:eq(13)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text() + ")";

                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(15)').text() + "^" + New + "^" + $("#Remarks").val() + "^" + CustID);
                    }
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            if (flag == 0) {
                var Data = JSON.stringify({ DiscountData: Discountidarray });
                ShowLoader();
                DIMSFactory.ChangeRejectedStatusForProjectDiscountWithCommission(Data).success(function (response) {
                    if (response == "Success") {
                        alert("Successfully Rejected");
                        $("#RemarksLookUp").modal('hide');
                        $("div").removeClass('modal-backdrop fade in');

                        HideLoader();
                        $scope.go('ProjectDiscountWithCommissionList/');

                    }
                    else {
                        alert("Failed To Reject");
                        $("#RemarksLookUp").modal('hide');
                        $("div").removeClass('modal-backdrop fade in');

                        HideLoader();


                    }
                });
            }

        }
        else {
            //alert("please select any records");
            alert("please enter any remarks");

        }
        // alert(JSON.stringify(Discountidarray));
    }

    $scope.DownloadFile = function (typeoffile) {
        var FileName = "ProjectDiscountWithCommission";

        if ($("#ProjectDiscountWithCommisssion tbody tr").length <= 0) {

            alert("No Data Available");
        }
        else {

            
            if (!$('#ProjectDiscountWithCommisssion').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }


            if (UserRole == "SH") {
                WhereCondition = " Where REQUSET_CREATEDBY='" + UserCode + "'";
                $("#Approve").css({ "display": "none" });
                $("#Reject").css({ "display": "none" });
            }
            else if (UserRole == "ZH") {
                WhereCondition = " where REQUEST_STATUS IN(1,2,3,4,5) and REQUSET_CREATEDBY IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select DISCOUNTID as 'Discount Id',convert(varchar(10),CREATED_DATE,103) as 'Created Date', CUSTOMER_CODE as 'Customer Code', CUSTMER_NAME as 'Customer Name', ZONE as 'Zone', STATE as 'State', DISTRICT as 'District',PriceCardRate as 'Price Card Rate(INR/M)',AGREED_RATE_INR as 'Agreed Rate(INR/M)', COMMISSION as 'Commission(%)', EXPECTED_SALE as'Expected Sale(MT)', EXPECTED_NSR as 'Expected NSR(INR)',STOCKIST_CODE as 'Stockist Code', STOCKIST_NAME as 'Stockist Name', REQUESTBY_CODE_NAME as 'Requester',(case when REQUEST_STATUS=1 then 'Waiting Approval For ZH' when REQUEST_STATUS=2 then 'Rejected By ZH'  when REQUEST_STATUS=3 then 'Waiting Approval For NSH' when REQUEST_STATUS=4 then 'Rejected By NSH' else 'Approved' end)as 'Request Status',  DESCRIPTION as 'Remarks' from REPORT_PROJECT_DISCOUNT_WITH_COMMISSION where REQUSET_CREATEDBY='" + UserCode + "'";

            }
            else if (UserRole == "NSH") {
                WhereCondition = "where REQUEST_STATUS IN(3,4,5)";
                $("#HideAddNew").css("display", "none");
            }
            else {
                WhereCondition = "";
                $("#HideAddNew").css("display", "none");
                $("#Approve").css({ "display": "none" });
                $("#Reject").css({ "display": "none" });
            }

            var Searchvalue = $('input[type=search]').val();
            var Data = JSON.stringify({
                UserCode: UserCode,
                ReportName: "ProjectDiscountWithCommisssion",
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

    $scope.RejectRequestPopup = function () {
        if ($(".checkbox:checked").length == 0) {
            alert("Please Select any record");
        }
        else {
            $("#Remarks").val("");

            $("#RemarksLookUp").modal('show');
        }
    }

});

DIMS.controller('ProjectDiscountWithCommissionControl', function ($scope, $location, DIMSFactory, $routeParams) {
    var html = "";
    $scope.templatesettings = { HeaderTitle: "ProjectDiscountWithCommission" };
    $scope.go = function (path) {
        $location.path(path);
    };

    ProjectDiscountWithCommissionScope = $scope;
    var UserName = $("#USERNAME").val();
    var UserRole = $("#USERTYPE").val();
    var UserCode = $("#USERCODE").val();
    var WhereCondition = "";
    var EditDiscountId;
    var tableName = "";
    angular.element(document).ready(function () {
        EditDiscountId = $routeParams.ID;
        if (EditDiscountId == "" || EditDiscountId == undefined) {
            EditDiscountId = 0;
            DIMSFactory.GetProjectDiscountWithCommisionDiscountID().success(function (response) {
                var Data = JSON.parse(response);
                $("#RequestCreatedBy").val(UserName + "(" + UserCode + ")");
                $("#DiscountID").val(Data["DiscountId"]);
                $("#RequestCreated").val(UserCode);
                
            });
        }
        else {
            DIMSFactory.GetProjectDiscountWithCommissionDataForEdit(EditDiscountId).success(function (response) {

                if (response != "No Data") {
                    var Result = JSON.parse(response);
                    $(".Customer").children('.btn-default').css("pointer-events", "none");
                    $("#UpdateNav").html("Update");
                    $("#DiscountID").val(Result[0]["DISCOUNTID"]);
                    $("#StockistCode").val(Result[0]["STOCKIST_CODE"]);
                    $("#StockistName").val(Result[0]["STOCKIST_NAME"]);
                    $("#District").val(Result[0]["DISTRICT"]);
                    $("#State").val(Result[0]["STATE"]);
                    $("#Zone").val(Result[0]["ZONE"]);
                    $("#AgreedRateINRM").val(Result[0]["AGREED_RATE_INR"]);
                    $("#CommissionINR").val(Result[0]["COMMISSION"]);
                    $("#ExpectedSaleMT").val(Result[0]["EXPECTED_SALE"]);
                    $("#ExpectedNSRINR").val(Result[0]["EXPECTED_NSR"]);
                    $("#RequestStatus").val(Result[0]["Request Status"]);
                    $("#Description").val(Result[0]["DESCRIPTION"]);
                    $("#CreatedDate").val(Result[0]["createddate"]);
                    $("#RequestCreated").val(Result[0]["REQUSET_CREATEDBY"]);
                    $("#CustomerCode").val(Result[0]["CUSTOMER_CODE"]);
                    $("#CustomerName").val(Result[0]["CUSTMER_NAME"]);
                    $("#RequestCreatedBy").val(Result[0]["REQUESTBY_CODE_NAME"]);
                    $("#PriceCardRate").val(Result[0]["PriceCardRate"]);
                }
                else {
                    alert("No Data Found");
                }
            });
        }
    });

    $scope.Getdata = function (Methodname, MasterType, Heading) {



        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: UserCode,
            Role: UserRole,
            UserCode: UserCode,
            Type: "Get",
            ReportName: "ReportsCustomerMasterList",
            WhereClause: WhereCondition
        });


        DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
            ShowLoader();
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


                HideLoader();
            }

            DIMSFactory.getReportData(Data).success(function (response) {
                var OnclickClass = "";
                if (Heading == "Customer List") {
                    OnclickClass = "RetailerRowClick";
                } else {
                    OnclickClass = "CustomerRowClick";
                }
                getLookUpData_Preview_ServerSide_SFDC_CustomerMaster("", Heading, "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName, OnclickClass);
                HideLoader();
            })


        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });

    }

    $("#ReportPreviewTable").delegate("tr.RetailerRowClick", "click", function () {

        //angular.element(document).on('click', "#ReportPreviewTable tbody tr", function () {
        $("#CustomerCode").val($(this).find('td:eq(0)').text());
        $("#CustomerName").val($(this).find('td:eq(1)').text());
        $("#Zone").val($(this).find('td:eq(2)').text().trim());
        $("#State").val($(this).find('td:eq(3)').text().trim());
        $("#District").val($(this).find('td:eq(4)').text().trim());

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $("#ReportPreviewTable").DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        $("#ReportsPopUpModal").modal('hide');
    });

    $("#ReportPreviewTable").delegate("tr.CustomerRowClick", "click", function () {

        //angular.element(document).on('click', "#ReportPreviewTable tbody tr", function () {
        $("#StockistCode").val($(this).find('td:eq(0)').text());
        $("#StockistName").val($(this).find('td:eq(1)').text());
        $("#PriceCardRate").val($(this).find('td:eq(5)').text());

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $("#ReportPreviewTable").DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        $("#ReportsPopUpModal").modal('hide');
    });



    $scope.SaveProjectDiscountWithCommission = function () {

        var DiscountID = $("#DiscountID").val();
        var RequestCreatedBy = $("#RequestCreated").val();
        var CreatedDate = $("#CreatedDate").val();
        var AgreedRateINRM = $("#AgreedRateINRM").val();
        var StockistCode = $("#StockistCode").val();
        var CommissionINR = $("#CommissionINR").val();
        var StockistName = $("#StockistName").val();
        var ExpectedSaleMT = $("#ExpectedSaleMT").val();
        var District = $("#District").val();
        var ExpectedNSRINR = $("#ExpectedNSRINR").val();
        var State = $("#State").val();
        var RequestStatus = $("#RequestStatus").val();
        var Zone = $("#Zone").val();
        var Description = $("#Description").val();
        var CustomerCode = $("#CustomerCode").val();
        var CustomerName = $("#CustomerName").val();
        var RequestByCodeName = $("#RequestCreatedBy").val();
        var PriceCardRate = $("#PriceCardRate").val();


        if (DiscountID == undefined) { DiscountID = ""; }
        if (RequestCreatedBy == undefined) { RequestCreatedBy = ""; }
        if (CreatedDate == undefined) { CreatedDate = ""; }
        if (AgreedRateINRM == undefined) { AgreedRateINRM = 0; }
        if (StockistCode == undefined) { StockistCode = ""; }
        if (CommissionINR == undefined) { CommissionINR = 0; }
        if (StockistName == undefined) { StockistName = ""; }
        if (ExpectedSaleMT == undefined) { ExpectedSaleMT = 0; }
        if (District == undefined) { District = ""; }
        if (ExpectedNSRINR == undefined) { ExpectedNSRINR = 0; }
        if (State == undefined) { State = ""; }
        if (RequestStatus == undefined) { RequestStatus = ""; }
        if (Zone == undefined) { Zone = ""; }
        if (Description == undefined) { Description = ""; }
        if (CustomerCode == undefined) { CustomerCode = ""; }
        if (CustomerName == undefined) { CustomerName = ""; }

        if (EditDiscountId == undefined || EditDiscountId == "") {
            EditDiscountId = 0;
        }
        else {
            EditDiscountId = $routeParams.ID;
            DiscountID = EditDiscountId;
        }
        //if (CustomerCode == "") {
        //    alert("Please select Customer Code")
        //    return;
        //}
        if (StockistCode == "" || StockistCode == null) {
            alert("Please Select Stockist Code");
            return;
        }
        else if (AgreedRateINRM == "" || AgreedRateINRM == null) {
            alert("Please Enter Agreed Rate");
            return;
        }
        else if (CommissionINR == "" || CommissionINR == null) {
            alert("Please Enter Commission Percentage");
            return;
        }
        else if (ExpectedNSRINR == "" || ExpectedNSRINR == null) {
            alert("Please Enter Expected NSR Amount");
            return;
        }
        else {
            var TotalProjectDiscountWithCommissionData = JSON.stringify({
                "DiscountID": DiscountID,
                "RequestCreatedBy": RequestCreatedBy,
                "CreatedDate": CreatedDate,
                "AgreedRateINRM": AgreedRateINRM,
                "StockistCode": StockistCode,
                "CommissionINR": CommissionINR,
                "StockistName": StockistName,
                "ExpectedSaleMT": ExpectedSaleMT,
                "District": District,
                "ExpectedNSRINR": ExpectedNSRINR,
                "State": State,
                "RequestStatus": RequestStatus,
                "Zone": Zone,
                "Description": Description,
                "UserCode": UserCode,
                "UserName": UserName,
                "UserRole": UserRole,
                "EditDiscountId": EditDiscountId,
                "CustomerCode": CustomerCode,
                "CustomerName": CustomerName,
                "RequestByCodeName": RequestByCodeName,
                "PriceCardRate": PriceCardRate

            });
          

            ShowLoader();
            DIMSFactory.SaveProjectCommisionWithCommissionData(TotalProjectDiscountWithCommissionData).success(function (response) {
                if (response == "Save") {
                    alert("Saved successfully");
                    HideLoader();
                    $scope.go('ProjectDiscountWithCommissionList');

                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                    HideLoader();
                } else if (response == "Update") {
                    alert("Update Successfully");
                    HideLoader();
                    $scope.go('ProjectDiscountWithCommissionList');
                } else if (response == "UpdateFail") {
                    alert("Error Occured while Updating");
                    HideLoader();
                } else {
                    alert(response);
                    HideLoader();
                }
                HideLoader();
            });
        }
    }

});
