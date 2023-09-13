
var NetBillingScope;


DIMS.controller('NetBillingForStockistNewControl', function ($scope, $location, DIMSFactory, $routeParams) {

    var Html = "";
    $scope.templatesettings = { HeaderTitle: "NetBillingForStockistNew" };
    $scope.go = function (path) {
        CheckUserSession();

        $location.path(path);
    };

    NetBillingScope = $scope;
    var UserCode = $("#USERCODE_NetBilling").val();
    var UserName = $("#USERNAME_NetBilling").val();
    var UserRole = $("#USERTYPE_NetBilling").val();

    angular.element(document).ready(function () {
        var EditNetBillingId = $routeParams.ID;

        if (EditNetBillingId == undefined || EditNetBillingId == "") {
            EditNetBillingId = 0;
            DIMSFactory.GetNetBillingId().success(function (response) {
                var Data = JSON.parse(response);
                $("#RequestCreatedBy").val(UserCode);
                $("#NetBillingId").val(Data["NetBillingId"]);
                $("#CreatedDate").val(Data["Date"]);
                $("#CreatedBy").val(UserName + "(" + UserCode + ")");

            });

        }
        else {
            DIMSFactory.GetNetBillingDataForEdit(EditNetBillingId).success(function (response) {

                if (response != "No Data") {
                    var Result = JSON.parse(response);
                    $("#UpdateNav").html("Update");
                    $("#NetBillingId").val(Result[0]["Net Billing Id"]);
                    $("#RequestCreatedBy").val(Result[0]["CreatedBy"]);
                    $("#CreatedBy").val(Result[0]["Requester"]);

                    $("#CreatedDate").val(Result[0]["Created Date"]);
                    $("#StockistCode").val(Result[0]["Stockist Id"]);
                    $("#StockistName").val(Result[0]["Stockist Name"]);
                    $("#District").val(Result[0]["District"]);
                    $("#State").val(Result[0]["State"]);
                    $("#ExpectedSale").val(Result[0]["Expected Sale"]);
                    $("#Zone").val(Result[0]["Zone"]);
                    $("#NetBillingFrom").val(Result[0]["Net Billing From"]);
                    $("#NetBillingFrom").datepicker("setDate", Result[0]["Net Billing From"]);
                    $("#NetBillingTo").val(Result[0]["Net Billing To"]);
                    $("#NetBillingTo").datepicker("setDate", Result[0]["Net Billing To"]);
                    $("#NetBillingRate").val(Result[0]["Net Billing Rate"]);
                    $("#PriceCardRate").val(Result[0]["Price Card Rate"]);
                    $("#ExpectedNSR").val(Result[0]["Expected NSR"]);
                    $("#Description").val(Result[0]["Remarks"]);
                    $("#RequestStatus").val(Result[0]["Request Status"]);
                    $(".input-group-btn").children('.btn-default').css("pointer-events", "none");

                }
                else {
                    alert("No Data Found");
                }
            });
        }
    });

    $scope.SaveNetBilling = function () {
        // var Department = $('#Department').val();
        var NetBillingId = $("#NetBillingId").val();
        var CreatedBy = $("#RequestCreatedBy").val();
        var Created_Name = $("#CreatedBy").val();
        var CreatedDate = $("#CreatedDate").val();
        var CustomerCode = $("#StockistCode").val();
        var CustomerName = $("#StockistName").val();
        var District = $("#District").val();
        var State = $("#State").val();
        var ExpectedSale = $("#ExpectedSale").val();
        var Zone = $("#Zone").val();
        var NetBillingFrom = $("#NetBillingFrom").val();
        var NetBillingRate = $("#NetBillingRate").val();
        var NetBillingTo = $("#NetBillingTo").val();
        var PriceCardRate = $("#PriceCardRate").val();
        var ExpectedNSR = $("#ExpectedNSR").val();
        var Description = $("#Description").val();
        var Status = $("#RequestStatus").val();



        if (NetBillingId == undefined) { NetBillingId = ""; }
        if (CreatedBy == undefined) { CreatedBy = ""; }
        if (CreatedDate == undefined) { CreatedDate = ""; }
        if (CustomerCode == undefined) { CustomerCode = ""; }
        if (CustomerName == undefined) { CustomerName = ""; }
        if (District == undefined) { District = ""; }
        if (Description == undefined) { Remarks = ""; }
        if (State == undefined) { State = ""; }
        if (ExpectedSale == undefined) { ExpectedSale = ""; }
        if (Zone == undefined) { Zone = ""; }
        if (NetBillingFrom == undefined) { NetBillingFrom = ""; }
        if (NetBillingRate == undefined) { NetBillingRate = ""; }
        if (NetBillingTo == undefined) { NetBillingTo = ""; }
        if (ExpectedNSR == undefined) { ExpectedNSR = ""; }
        if (PriceCardRate == undefined) { PriceCardRate = "" }

        var EditNetBillingId = $routeParams.ID;


        if (NetBillingRate == null || NetBillingRate == "") {
            alert("Please Enter Net Billing Rate");
        }
        else if (ExpectedSale == "" || ExpectedSale == null) {
            alert("Please Enter Expected Sale");
        }
        else if (ExpectedNSR == "" || ExpectedNSR == null) {
            alert("Please Enter expected NSR");
        }
        else if (NetBillingFrom == "" || NetBillingFrom == null) {
            alert("Please select Net Billing Fromdate");
        }
        else if (NetBillingTo == "" || NetBillingTo == null) {
            alert("Please select Net Billing Todate");
        }


        else {
            if (EditNetBillingId == undefined || EditNetBillingId == "") {
                EditNetBillingId = 0;
            }



            var TotalDiscountData = JSON.stringify({
                "EditNetBillingId": EditNetBillingId,
                "NetBillingId": NetBillingId,
                "CreatedBy": CreatedBy,
                "CreatedDate": CreatedDate,
                "CustomerCode": CustomerCode,
                "CustomerName": CustomerName,
                "ExpectedSale": ExpectedSale,
                "Description": Description,
                "Zone": Zone,
                "State": State,
                "District": District,
                "NetBillingFrom": NetBillingFrom,
                "NetBillingTo": NetBillingTo,
                "NetBillingRate": NetBillingRate,
                "ExpectedNSR": ExpectedNSR,
                "PriceCardRate": PriceCardRate,
                "UserRole": UserRole,
                "Created_Name": Created_Name,
                "Status": Status
            });

            ShowLoader();
            DIMSFactory.SaveNetBillingData(TotalDiscountData).success(function (response) {
                if (response == "Save") {
                    alert("Saved successfully");
                    $scope.go('NetBillingForStockist');
                    HideLoader();
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                    HideLoader();
                } else if (response == "Update") {
                    alert("Updated Successfully");
                    HideLoader();
                    $scope.go('NetBillingForStockist');
                } else if (response == "UpdateFail") {
                    alert("Error Occured while Updating");
                    HideLoader();
                } else {
                    alert("Technical error occured");
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
        $("#PriceCardRate").val($(this).find('td:eq(5)').text())


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



DIMS.controller('NetBillingForStockistControl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "NetBillingForStockist" };
    $scope.go = function (path) {
        CheckUserSession();

        $location.path(path);
    };
    //$("#NetBillingForStockist").dataTable({
    //});
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    var UserCode = $("#USERCODE_NetBilling").val();
    var UserName = $("#USERNAME_NetBilling").val();
    var UserRole = $("#USERTYPE_NetBilling").val();
    angular.element(document).ready(function () {

        var WhereCondition = "";

        if (UserRole == "SH") {
            WhereCondition = "Where NB.CreatedBy='" + UserCode + "'";
            $("#approveRequest").css({ "display": "none" });
            $("#rejectRequest").css({ "display": "none" });
        }
        else if (UserRole == "ZH") {
            WhereCondition = "where NBS.STATUS IN(1) and NB.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select NB.Net_Billing_Id as 'Net Billing Id',NB.Customer_Code as 'Stockist Id',NB.Customer_Name as 'Stockist Name',NB.Zone as 'Zone',NB.State as 'State',NB.District as 'District',FORMAT(NB.Net_Billing_Valid_From,'dd/MM/yyyy') as 'Net Billing From',FORMAT(NB.Net_Billing_Valid_To,'dd/MM/yyyy') as 'Net Billing To',NB.Price_card_Rate as 'Price Card Rate',NB.Net_Billing_Rate as 'Net Billing Rate',NB.Expected_Sale as 'Expected Sale',NB.Expected_Nsr as 'Expected NSR',NB.Created_Name as 'Requester',(case when NBS.Status='1' then 'Waiting Approval For ZH' when NBS.Status='2' then 'Rejected By ZH' when NBS.Status='3' then 'Waiting Approval For NSH' when NBS.Status='4' then 'Rejected By NSH' else 'Approved' end) as 'Request Status',NB.Description as 'Remarks' from Net_Billings NB inner join Net_Billings_Status NBS on NB.Net_Billing_Id=NBS.Net_Billing_Id where NB.CreatedBy='" + UserCode + "'";
        }
        else if (UserRole == "NSH") {
            WhereCondition = "where NBS.STATUS IN(3)";
            $("#HideAddNew").css("display", "none");

        }
        else  {
            WhereCondition = "";
            $("#HideAddNew").css("display", "none");
            $("#approveRequest").css({ "display": "none" });
            $("#rejectRequest").css({ "display": "none" });
        }

        var Data = JSON.stringify({
            UserCode: UserCode,
            ReportName: "NetBillingForStockist",
            WhereClause: WhereCondition

        });

        DIMSFactory.getReportData(Data).success(function (res) {

            $("#NetBillingForStockist").dataTable().fnDestroy();
            var tableUserMapping = $("#NetBillingForStockist").DataTable({

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
                    url: '../../Home/GetNetBillingData',
                    "type": "POST",
                    "beforeSend": function () {
                        // ShowLoader();
                    },
                    "datatype": "json",
                    "complete": function () {
                        var Count = 0;
                        $("#NetBillingForStockist tbody tr").each(function () {
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
                  , "columns": [{ "data": "Net Billing Id", "name": "Net Billing Id" },
                               { "data": "Net Billing Id", "name": "Net Billing Id", "bSortable": "true" },
                            { "data": "Stockist Id", "name": "Stockist Id", "bSortable": "true" },
                            { "data": "Stockist Name", "name": "Stockist Name", "bSortable": "true" },
                            { "data": "Zone", "name": "Zone", "bSortable": "true" },
                            { "data": "State", "name": "State", "bSortable": "true" },
                            { "data": "District", "name": "District", "bSortable": "true" },
                            { "data": "Net Billing From", "name": "Net Billing From", "bSortable": "true" },
                            { "data": "Net Billing To", "name": "Net Billing To", "bSortable": "true" },
                            { "data": "Price Card Rate", "name": "Price Card Rate", "bSortable": "true" },
                            { "data": "Net Billing Rate", "name": "Net Billing Rate", "bSortable": "true" },
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
                    if (UserRole == "ZH" && $(nRow).find('td:eq(13)').text().split('(')[1].replace(')', ' ').trim() == UserCode) {
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


                    $(nRow).attr("id", 'STRow_' + aData["Net Billing Id"]);

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

    $scope.ApproveRequestNetBilling = function () {

        var Discountidarray = new Array();
        if ($('.checkbox:checked').length != 0) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    var Newid = $(this).closest('tr').find('td:eq(13)').text().split('(')[1].replace(')', ' ').trim();
                    var CustId = $(this).closest('tr').find('td:eq(3)').text()+"("+$(this).closest('tr').find('td:eq(2)').text()+")";


                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(14)').text() + "^" + Newid+"^"+CustId);
                });
            }
            else {
                $('.checkbox:checked').each(function () {
                    var Newid = $(this).closest('tr').find('td:eq(13)').text().split('(')[1].replace(')', ' ').trim();
                    var CustId = $(this).closest('tr').find('td:eq(3)').text()+"("+$(this).closest('tr').find('td:eq(2)').text()+")";

                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(14)').text() + "^" + Newid+"^"+CustId);
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            var Data = JSON.stringify({ DiscountData: Discountidarray });
            ShowLoader();
            DIMSFactory.ChangeStatusToNetBilling(Data).success(function (response) {
                if (response == "Success") {
                    alert("Successfully Approved");
                    HideLoader();
                    $scope.go('NetBillingForStockist/');
                }
                else {
                    alert("Failed To Approve");
                    HideLoader();
                }
            }).error(function () {
                HideLoader();

            });;

        }
        else {
            alert("please select any records");
        }
        // alert(JSON.stringify(Discountidarray));
    }

    $scope.RejectRequestNetBilling = function () {
        var flag = 0;
        var Discountidarray = new Array();
        if ($('.checkbox:checked').length != 0 && $("#Remarks").val() != "" && $("#Remarks").val() != undefined) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    if ($(this).closest('tr').find('td:eq(14)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(14)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Discount to reject");
                        return false;
                        flag++;
                    }
                    else {
                        var Newid = $(this).closest('tr').find('td:eq(13)').text().split('(')[1].replace(')', ' ').trim();
                        var CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")";

                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(14)').text() + "^" + Newid + "^" + $("#Remarks").val()+"^"+CustId);
                    }
                });
            }
            else {
                $('.checkbox:checked').each(function () {

                    if ($(this).closest('tr').find('td:eq(14)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(14)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Net Billing to reject");
                        flag++;
                        return false;

                    }
                    else {
                        var Newid = $(this).closest('tr').find('td:eq(13)').text().split('(')[1].replace(')', ' ').trim();
                        var CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")";

                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(14)').text() + "^" + Newid + "^" + $("#Remarks").val()+"^"+CustId);
                    }
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            if (flag == 0) {
                var Data = JSON.stringify({ DiscountData: Discountidarray });
                ShowLoader();
                DIMSFactory.ChangeRejectedStatusToNetBilling(Data).success(function (response) {
                    if (response == "Success") {
                        alert("Successfully Rejected");
                      //  $("#RemarksLookUp").modal('hide');

                        HideLoader();
                        $("#RemarksLookUp").modal('hide');
                        $("div").removeClass('modal-backdrop fade in');
                        $scope.go('NetBillingForStockist/');
                    }
                    else {
                        alert("Failed To Reject");

                        $("div").removeClass('modal-backdrop fade in');

                        $("#RemarksLookUp").modal('hide');

                        HideLoader();
                    }
                }).error(function () {
                    HideLoader();

                });;
            }

        }
        else {
            // alert("please select any records");
            alert("please enter any remarks");

        }
        // alert(JSON.stringify(Discountidarray));
    }

    $scope.RejectRequestPopup = function () {
        if ($(".checkbox:checked").length == 0) {
            alert("Please Select any record");
        }
        else {
            $("#Remarks").val("");
            //$('#RemarksLookUp').modal({
            //    backdrop: 'static',
            //    keyboard: false
            //});
            $("#RemarksLookUp").modal('show');

        }
    }

    $("#NetBillingForStockist tbody").on('click', 'td', function () {
        if ($("#NetBillingForStockist").DataTable().data().count() != 0) {
            if ($(this).index() != "0") {
                var ID = $(this).parent().find('td:eq(1)').text();
                var Status = $(this).parent().find('td:eq(14)').text();

                if (Status == "Approved" && UserRole == "NSH") {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditNetBilling")).scope();
                    scope.$apply(function () {
                        scope.go("NetBillingForStockistNew/" + ID);
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

                    var scope = angular.element($("#EditNetBilling")).scope();
                    scope.$apply(function () {
                        scope.go("NetBillingForStockistNew/" + ID);
                    })
                }

                    //else if (UserRole == "SH" && Status != "Approved" && Status != "Waiting Approval For NSH") {
                    //    if ($(this).parent().hasClass('selected')) {
                    //        $(this).parent().removeClass('selected');
                    //    }
                    //    else {
                    //        $('tr.selected').removeClass('selected');
                    //        $(this).parent().addClass('selected');
                    //    }

                    //    var scope = angular.element($("#EditNetBilling")).scope();
                    //    scope.$apply(function () {
                    //        scope.go("NetBillingForStockistNew/" + ID);
                    //    })
                    //}
                else if (UserRole == "SH" && (Status == "Rejected By ZH" || Status == "Rejected By NSH")) {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditNetBilling")).scope();
                    scope.$apply(function () {
                        scope.go("NetBillingForStockistNew/" + ID);
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

                    var scope = angular.element($("#EditNetBilling")).scope();
                    scope.$apply(function () {
                        scope.go("NetBillingForStockistNew/" + ID);
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

                    var scope = angular.element($("#EditNetBilling")).scope();
                    scope.$apply(function () {
                        scope.go("NetBillingForStockistNew/" + ID);
                    })
                }
            }
        }
    });

    $scope.DownloadFile = function (typeoffile) {
        
        var FileName = "NetBilling";

        if ($("#NetBillingForStockist tbody tr").length <= 0) {

            alert("No Data Available");
        }
        else {


            if (!$('#NetBillingForStockist').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }

            var WhereCondition = "";

            if (UserRole == "SH") {
                WhereCondition = "Where NB.CreatedBy='" + UserCode + "'";
                $("#approveRequest").css({ "display": "none" });
                $("#rejectRequest").css({ "display": "none" });
            }
            else if (UserRole == "ZH") {
                WhereCondition = "where NBS.STATUS IN(1,2,3,4,5) and NB.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select NB.Net_Billing_Id as 'Net Billing Id',convert(varchar(10),NB.Created_Date,103) as 'Created Date',NB.Customer_Code as 'Stockist Id',NB.Customer_Name as 'Stockist Name',NB.Zone as 'Zone',NB.State as 'State',NB.District as 'District',FORMAT(NB.Net_Billing_Valid_From,'dd/MM/yyyy') as 'Net Billing From',FORMAT(NB.Net_Billing_Valid_To,'dd/MM/yyyy') as 'Net Billing To',NB.Price_card_Rate as 'Price Card Rate',NB.Net_Billing_Rate as 'Net Billing Rate',NB.Expected_Sale as 'Expected Sale',NB.Expected_Nsr as 'Expected NSR',NB.Created_Name as 'Requester',(case when NBS.Status='1' then 'Waiting Approval For ZH' when NBS.Status='2' then 'Rejected By ZH' when NBS.Status='3' then 'Waiting Approval For NSH' when NBS.Status='4' then 'Rejected By NSH' else 'Approved' end) as 'Request Status',NB.Description as 'Remarks' from Net_Billings NB inner join Net_Billings_Status NBS on NB.Net_Billing_Id=NBS.Net_Billing_Id where NB.CreatedBy='" + UserCode + "'";
            }
            else if (UserRole == "NSH") {
                WhereCondition = "where NBS.STATUS IN(3)";
                $("#HideAddNew").css("display", "none");

            }
            else {
                WhereCondition = "";
                $("#HideAddNew").css("display", "none");
                $("#approveRequest").css({ "display": "none" });
                $("#rejectRequest").css({ "display": "none" });
            }


            var Searchvalue = $('input[type=search]').val();
            var Data = JSON.stringify({
                UserCode: UserCode,
                ReportName: "NetBillingForStockist",
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
});