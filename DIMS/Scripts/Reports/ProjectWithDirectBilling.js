DIMS.controller('ProjectDiscountDirectBillingControl', function ($scope, $location, DIMSFactory, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "ProjectDiscountDirectBilling" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };


    var UserCode = $("#USERCODE_DirectDiscount").val();
    var UserName = $("#USERNAME_DirectDiscount").val();
    var UserRole = $("#USERTYPE_DirectDiscount").val();

    angular.element(document).ready(function () {
        var EditDirectBillingId = $routeParams.ID;
        if (EditDirectBillingId == undefined || EditDirectBillingId == "") {
            EditDirectBillingId = 0;
            DIMSFactory.GetDirectBillingId().success(function (response) {
                var Data = JSON.parse(response);
                $("#RequestCreatedBy").val(UserCode);
                $("#DiscountID").val(Data["REPORTS_DISCOUNT_DIRECT_ID"]);
                $("#CreatedDate").val(Data["Date"]);
                $("#CreatedBy").val(UserName + "(" + UserCode + ")");
            });

        }
        else {
            DIMSFactory.GetDirectBillingDataForEdit(EditDirectBillingId).success(function (response) {

                if (response != "No Data") {
                    var Result = JSON.parse(response);
                    $("#UpdateNav").html("Update");
                    $("#DiscountID").val(Result[0]["Direct Billing Id"]);
                    $("#RequestCreatedBy").val(Result[0]["Requester"]);
                    $("#CreatedBy").val(Result[0]["CreatedBy"]);
                    $("#CreatedDate").val(Result[0]["Created Date"]);
                    $("#StockistCode").val(Result[0]["Stockist Id"]);
                    $("#StockistName").val(Result[0]["Stockist Name"]);
                    $("#District").val(Result[0]["District"]);
                    $("#State").val(Result[0]["State"]);
                    $("#ExpectedSale").val(Result[0]["Expected Sale"]);
                    $("#Zone").val(Result[0]["Zone"]);
                    $("#ExpectedNSR").val(Result[0]["Expected NSR"]);
                    $("#AgreedRate").val(Result[0]["Agreed Rate"]);
                    $("#Description").val(Result[0]["Remarks"]);
                    $("#RequestStatus").val(Result[0]["Request Status"]);
                    $("#PriceCardRate").val(Result[0]["PriceCardRate"])
                    $(".input-group-btn").children('.btn-default').css("pointer-events", "none");

                }
                else {
                    alert("No Data Found");
                }
            });
        }
    });

    $scope.SaveProjectDirectBilling = function () {
        // var Department = $('#Department').val();
        var DiscountID = $("#DiscountID").val();
        var CreatedBy = $("#RequestCreatedBy").val();
        var CreatedDate = $("#CreatedDate").val();
        var CustomerCode = $("#StockistCode").val();
        var CustomerName = $("#StockistName").val();
        var District = $("#District").val();
        var State = $("#State").val();
        var ExpectedSale = $("#ExpectedSale").val();
        var Zone = $("#Zone").val();
        var AgreedRate = $("#AgreedRate").val();
        var ExpectedNSR = $("#ExpectedNSR").val();
        var Description = $("#Description").val();
        var Created_Name = $("#CreatedBy").val();
        var Status = $("#RequestStatus").val();
        var PriceCardRate = $("#PriceCardRate").val();


        if (DiscountID == undefined) { DiscountID = ""; }
        if (CreatedBy == undefined) { CreatedBy = ""; }
        if (CreatedDate == undefined) { CreatedDate = ""; }
        if (CustomerCode == undefined) { CustomerCode = ""; }
        if (CustomerName == undefined) { CustomerName = ""; }
        if (District == undefined) { District = ""; }
        if (Description == undefined) { Remarks = ""; }
        if (State == undefined) { State = ""; }
        if (ExpectedSale == undefined) { ExpectedSale = ""; }
        if (Zone == undefined) { Zone = ""; }
        if (ExpectedNSR == undefined) { ExpectedNSR = ""; }
        if (AgreedRate == undefined) { AgreedRate = "" }

        var EditDirectBillingId = $routeParams.ID;


        
        if (ExpectedSale == "" || ExpectedSale == null) {
            alert("Please Enter Expected Sale");
        }
        else if (ExpectedNSR == "" || ExpectedNSR == null) {
            alert("Please Enter expected NSR");
        }
        else if (AgreedRate == null || AgreedRate == "") {
            alert("Please Enter Agreed Rate");
        }
        else {
            if (EditDirectBillingId == undefined || EditDirectBillingId == "") {
                EditDirectBillingId = 0;
            }



            var TotalDiscountData = JSON.stringify({
                "EditDirectBillingId": EditDirectBillingId,
                "DiscountID": DiscountID,
                "CreatedBy": CreatedBy,
                "CreatedDate": CreatedDate,
                "CustomerCode": CustomerCode,
                "CustomerName": CustomerName,
                "ExpectedSale": ExpectedSale,
                "Description": Description,
                "Zone": Zone,
                "State": State,
                "District": District,
                "ExpectedNSR": ExpectedNSR,
                "AgreedRate": AgreedRate,
                "UserRole": UserRole,
                "Created_Name": Created_Name,
                "Status": Status,
                "PriceCardRate":PriceCardRate
            });

            ShowLoader();
            DIMSFactory.SaveDirectBillingData(TotalDiscountData).success(function (response) {
                if (response == "Save") {
                    alert("Saved successfully");
                    $scope.go('ProjectDiscountDirectBillingList');
                    HideLoader();
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                    HideLoader();
                } else if (response == "Update") {
                    alert("Updated Successfully");
                    HideLoader();
                    $scope.go('ProjectDiscountDirectBillingList');
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

    var WhereCondition = "";

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
                getLookUpData_Preview_ServerSide_SFDC_CustomerMaster("", Heading, "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName, "PartnerIssues_Customer");
                HideLoader();
            })


        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
        //DIMSSFDCFactory.getPartnerIssueMasterData(Data).success(function (response) {
        //    //alert(response);
        //    getLookUpDataForPartnerIsuues(response, Methodname, Heading);
        //}).error(function (err) {
        //    alert("err" + err);
        //});

    }

    angular.element(document).on('click', "#ReportPreviewTable tbody tr", function () {
        $("#StockistCode").val($(this).find('td:eq(0)').text());
        $("#StockistName").val($(this).find('td:eq(1)').text());
        $("#Zone").val($(this).find('td:eq(2)').text().trim());
        $("#State").val($(this).find('td:eq(3)').text().trim());
        $("#District").val($(this).find('td:eq(4)').text().trim());
        $("#PriceCardRate").val($(this).find('td:eq(5)').text().trim())

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $("#ReportPreviewTable").DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        $("#ReportsPopUpModal").modal('hide');
    });

});

DIMS.controller('ProjectDiscountDirectBillingListControl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "ProjectDiscountDirectBillingList" };
    $scope.go = function (path) {
        CheckUserSession();

        $location.path(path);
    };

    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });


    var UserCode = $("#USERCODE_DirectBilling").val();
    var UserName = $("#USERNAME_DirectBilling").val();
    var UserRole = $("#USERTYPE_DirectBilling").val();


    angular.element(document).ready(function () {

        var WhereCondition = "";

        if (UserRole == "SH") {
            WhereCondition = "Where PDDB.CreatedBy='" + UserCode + "'";
            $("#Approve").css({ "display": "none" });
            $("#Reject").css({ "display": "none" });
        }
        else if (UserRole == "ZH") {
            WhereCondition = "where PDDBS.STATUS IN(1) and PDDB.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select PDDB.Billing_Id as 'Direct Billing Id',PDDB.Customer_Code as 'Stockist Id',PDDB.Customer_Name as 'Stockist Name',PDDB.Zone as 'Zone',PDDB.State as 'State',PDDB.District as 'District',PDDB.PriceCardrate as 'Price Card Rate',PDDB.Agreed_Rate as 'Agreed Rate',PDDB.Expected_Sale as 'Expected Sale',PDDB.Expected_Nsr as 'Expected NSR',PDDB.Created_Name as 'Requester',(case when PDDBS.Status='1' then 'Waiting Approval For ZH' when PDDBS.Status='2' then 'Rejected By ZH' when PDDBS.Status='3' then 'Waiting Approval For NSH' when PDDBS.Status='4' then 'Rejected By NSH' else 'Approved' end) as 'Request Status',PDDB.Description as 'Remarks' from Project_Discount_Direct_Billings PDDB inner join Project_Discount_Direct_Billings_Status PDDBS on PDDB.Billing_Id=PDDBS.Billing_Id where PDDB.CreatedBy='" + UserCode + "'";
        }
        else if (UserRole == "NSH") {
            WhereCondition = "where PDDBS.STATUS IN(3)";
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
            ReportName: "DirectBilling",
            WhereClause: WhereCondition

        });

        DIMSFactory.getReportData(Data).success(function (res) {

            $("#ProjectDiscountDirectBillingList").dataTable().fnDestroy();
            var tableUserMapping = $("#ProjectDiscountDirectBillingList").DataTable({

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
                    url: '../../Home/GetDirectBillingData',
                    "type": "POST",
                    "beforeSend": function () {
                        // ShowLoader();
                    },
                    "datatype": "json",
                    "complete": function () {
                        var Count = 0;
                        $("#ProjectDiscountDirectBillingList tbody tr").each(function () {
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
                  , "columns": [{ "data": "Direct Billing Id", "name": "Direct Billing Id" },
                               { "data": "Direct Billing Id", "name": "Direct Billing Id", "bSortable": "true" },
                            { "data": "Stockist Id", "name": "Stockist Id", "bSortable": "true" },
                            { "data": "Stockist Name", "name": "Stockist Name", "bSortable": "true" },
                            { "data": "Zone", "name": "Zone", "bSortable": "true" },
                            { "data": "State", "name": "State", "bSortable": "true" },
                            { "data": "District", "name": "District", "bSortable": "true" },
                            { "data": "Price Card Rate", "name": "Price Card Rate", "bSortable": "true" },
                             { "data": "Agreed Rate", "name": "Agreed Rate", "bSortable": "true" },
                            { "data": "Expected Sale", "name": "Expected Sale", "bSortable": "true" },
                            { "data": "Expected NSR", "name": "Expected NSR", "bSortable": "true" },
                            { "data": "Requester", "name": "Requester", "bSortable": "true", },
                              { "data": "Request Status", "name": "Request Status" },
                              { "data": "Remarks", "name": "Remarks" }

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
                    if (UserRole == "ZH" && $(nRow).find('td:eq(11)').text().split('(')[1].replace(')',' ').trim() == UserCode) {
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


                    $(nRow).attr("id", 'STRow_' + aData["Direct Billing Id"]);

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

    $scope.ApproveRequestForDirectBilling = function () {

        var Discountidarray = new Array();
        if ($('.checkbox:checked').length != 0) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    var Newid = $(this).closest('tr').find('td:eq(11)').text().split('(')[1].replace(')', ' ').trim();
                    var CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text()+")";

                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(12)').text() + "^" + Newid + "^" + CustId);
                });
            }
            else {
                $('.checkbox:checked').each(function () {

                    var Newid = $(this).closest('tr').find('td:eq(11)').text().split('(')[1].replace(')', ' ').trim();
                    var CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")";

                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(12)').text() + "^" + Newid + "^" + CustId);
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            var Data = JSON.stringify({ DiscountData: Discountidarray });
            
            ShowLoader();
            DIMSFactory.ChangeStatusToDirectBilling(Data).success(function (response) {
                if (response == "Success") {
                    alert("Successfully Approved");
                    HideLoader();
                    $scope.go('ProjectDiscountDirectBillingList/');
                }
                else {
                    alert("Failed To Approve");
                    HideLoader();
                }
            }).error(function () {
                HideLoader();

            });

        }
        else {
            alert("please select any records");
        }
        // alert(JSON.stringify(Discountidarray));
    }

    $scope.RejectRequestForDirectBilling = function () {
        var flag = 0;
        var Discountidarray = new Array();
        if ($('.checkbox:checked').length != 0 && $("#Remarks").val()!=""&& $("#Remarks").val()!=undefined) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    if ($(this).closest('tr').find('td:eq(12)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(12)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Discount to reject");
                        return false;
                        flag++;
                    }
                    else {
                        var New = $(this).closest('tr').find('td:eq(11)').text().split('(')[1].replace(')', ' ').trim();
                        var CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")";

                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(12)').text() + "^" + New + "^" + $("#Remarks").val() + "^" + CustId);
                    }
                });
            }
            else {
                $('.checkbox:checked').each(function () {

                    if ($(this).closest('tr').find('td:eq(12)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(12)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Discount to reject");
                        flag++;
                        return false;

                    }
                    else {
                        var New = $(this).closest('tr').find('td:eq(11)').text().split('(')[1].replace(')', ' ').trim();
                        var CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")";

                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(12)').text() + "^" + New + "^" + $("#Remarks").val() + "^" + CustId);
                    }
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            if (flag == 0) {
                var Data = JSON.stringify({ DiscountData: Discountidarray });
                ShowLoader();
                DIMSFactory.ChangeRejectedStatusToDirectBilling(Data).success(function (response) {
                    if (response == "Success") {
                        alert("Successfully Rejected");
                        HideLoader();
                        $("#RemarksLookUp").modal('hide');
                        $("div").removeClass('modal-backdrop fade in');

                        $scope.go('ProjectDiscountDirectBillingList/');
                    }
                    else {
                        alert("Failed To Reject");
                        $("#RemarksLookUp").modal('hide');
                        $("div").removeClass('modal-backdrop fade in');

                        HideLoader();
                    }
                }).error(function () {
                    HideLoader();

                });;
            }

        }
        else {
            //alert("please select any records");
            alert("please enter any remarks");

        }
        // alert(JSON.stringify(Discountidarray));
    }

    $("#ProjectDiscountDirectBillingList tbody").on('click', 'td', function () {
        if ($("#ProjectDiscountDirectBillingList").DataTable().data().count() != 0) {
            if ($(this).index() != "0") {
                var ID = $(this).parent().find('td:eq(1)').text();
                var Status = $(this).parent().find('td:eq(12)').text();
                if (Status == "Approved" && UserRole == "NSH" ) {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditDirectBilling")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountDirectBilling/" + ID);
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

                    var scope = angular.element($("#EditDirectBilling")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountDirectBilling/" + ID);
                    });
                }
                else if (UserRole == "SH" && (Status == "Rejected By ZH" || Status == "Rejected By NSH")) {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditDirectBilling")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountDirectBilling/" + ID);
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

                    var scope = angular.element($("#EditDirectBilling")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountDirectBilling/" + ID);
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

                    var scope = angular.element($("#EditDirectBilling")).scope();
                    scope.$apply(function () {
                        scope.go("ProjectDiscountDirectBilling/" + ID);
                    })
                }
            }
        }
    });

    $scope.DownloadFile = function (typeoffile) {
        var FileName = "Discount_Direct_Billing";

        if ($("#ProjectDiscountDirectBillingList tbody tr").length <= 0) {

            alert("No Data Available");
        }
        else {


            if (!$('#ProjectDiscountDirectBillingList').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }

            var WhereCondition = "";

            if (UserRole == "SH") {
                WhereCondition = "Where PDDB.CreatedBy='" + UserCode + "'";
                $("#Approve").css({ "display": "none" });
                $("#Reject").css({ "display": "none" });
            }
            else if (UserRole == "ZH") {
                WhereCondition = "where PDDBS.STATUS IN(1,2,3,4,5) and PDDB.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select PDDB.Billing_Id as 'Direct Billing Id',convert(varchar(10),PDDB.Created_Date,103) as 'Created Date',PDDB.Customer_Code as 'Customer ID',PDDB.Customer_Name as 'Customer Name',PDDB.Zone as 'Zone',PDDB.State as 'State',PDDB.District as 'District',PDDB.PriceCardrate as 'Price Card Rate',PDDB.Agreed_Rate as 'Agreed Rate',PDDB.Expected_Sale as 'Expected Sale',PDDB.Expected_Nsr as 'Expected NSR',PDDB.Created_Name as 'Requester',(case when PDDBS.Status='1' then 'Waiting Approval For ZH' when PDDBS.Status='2' then 'Rejected By ZH' when PDDBS.Status='3' then 'Waiting Approval For NSH' when PDDBS.Status='4' then 'Rejected By NSH' else 'Approved' end) as 'Request Status',PDDB.Description as 'Remarks' from Project_Discount_Direct_Billings PDDB inner join Project_Discount_Direct_Billings_Status PDDBS on PDDB.Billing_Id=PDDBS.Billing_Id where PDDB.CreatedBy='" + UserCode + "'";
            }
            else if (UserRole == "NSH") {
                WhereCondition = "where PDDBS.STATUS IN(3)";
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
                ReportName: "DirectBilling",
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