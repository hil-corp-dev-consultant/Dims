var DisCountNewScope;


DIMS.controller('DiscountStructureControl', function ($scope, $location, DIMSFactory) {

    var Html = "";
    $scope.templatesettings = { HeaderTitle: "DiscountStructure" };
    $scope.go = function (path) {
        CheckUserSession();

        $location.path(path);
    };

    var UserCode = $("#USERCODE_Discounts").val();
    var UserName = $("#USERNAME_Discounts").val();
    var UserRole = $("#USERTYPE_Discounts").val();

    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }


    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------


    angular.element(document).ready(function () {

        var WhereCondition = "";

        if (UserRole == "SH") {
            WhereCondition = "Where DS.CreatedBy='" + UserCode + "'";
            $("#Approve").css({ "display": "none" });
            $("#Reject").css({ "display": "none" });
        }
        else if (UserRole == "ZH") {
            WhereCondition = "where DSS.STATUS IN(1) and DS.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select FORMAT(DS.Created_Date,'dd/MM/yyyy') as 'Created Date',DS.Discount_Id as 'Discount Id',DS.Customer_Code as 'Stockist Id',DS.Customer_Name as 'Stockist Name',DS.Zone as 'Zone',DS.State as 'State',DS.District as 'District',FORMAT(DS.Discount_Valid_From,'dd/MM/yyyy') as 'Discount From',FORMAT(DS.Discount_Valid_To,'dd/MM/yyyy') as 'Discount To',DS.Discount_Category as 'Discount Category',DS.State_Location_Based as 'State(Location Based)',DS.Sales_Group_Code as 'Sales Group Code',DS.Sales_Group_Desc as 'Sales Group Name',DS.Discount_Type as 'Discount Type',DS.Price_card_Rate as 'Price Card Rate(INR/M)',DS.Discount_Applicable_Running_Meter as 'Discount Applicable (INR/Running Meter)',DS.Expected_Sale as 'Expected Sale(MT)',DS.Target as 'Target(MT)',DS.[Total Discount] as 'Total Discount(INR/M)',DS.Net_Landing_Price as 'Net Landing Price(INR/M)',DS.Expected_Nsr as 'Expected NSR (INR)',DS.KSM as 'KSM',DS.CD as 'CD',DS.Other as 'Other',DS.Created_Name as 'Requester',(case when DSS.Status='1' then 'Waiting Approval For ZH' when DSS.Status='2' then 'Rejected By ZH' when DSS.Status='3' then 'Waiting Approval For NSH' when DSS.Status='4' then 'Rejected By NSH' else 'Approved' end) as 'Request Status',DS.Remarks as 'Remarks' from Discount_Structures DS inner join Discount_Structure_Status DSS on DSS.Discount_Id=DS.Discount_Id where DS.CreatedBy='" + UserCode + "'";
        }
        else if (UserRole == "NSH") {
            WhereCondition = "where DSS.STATUS IN(3)";
            $("#HideAddNew").css("display", "none");
        }
            //else if (UserRole == "COO" || UserRole == "CST1" || UserRole == "BU_FIN_HEAD" || UserRole == "BU_FIN_HEAD") {
        else {
            WhereCondition = "";
            $("#HideAddNew").css("display", "none");
            $("#Approve").css({ "display": "none" });
            $("#Reject").css({ "display": "none" });
        }

        var Data = JSON.stringify({
            UserCode: UserCode,
            ReportName: "DiscountStructure",
            WhereClause: WhereCondition

        });

        DIMSFactory.getReportData(Data).success(function (res) {

            $("#DiscountStructure").dataTable().fnDestroy();
            var tableUserMapping = $("#DiscountStructure").DataTable({

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
                    url: '../../Home/GetDiscountStructureData',
                    "type": "POST",
                    "beforeSend": function () {
                        ShowLoader();
                    },
                    "datatype": "json",
                    "complete": function () {
                        var Count = 0;
                        $("#DiscountStructure tbody tr").each(function () {
                            if ($(this).find('input').is(':disabled')) {

                            }
                            else {
                                Count++;
                            }
                        });
                        if (Count == 0) {
                            $("#StockistCheckAll").attr("disabled", "disabled");
                        }
                        HideLoader();
                    }
                }
                  , "columns": [{ "data": "Discount Id", "name": "Discount Id" },
                               { "data": "Discount Id", "name": "Discount Id", "bSortable": "true" },
                            { "data": "Stockist Id", "name": "Stockist Id", "bSortable": "true" },
                            { "data": "Stockist Name", "name": "Stockist Name", "bSortable": "true" },
                            { "data": "Zone", "name": "Zone", "bSortable": "true" },
                            { "data": "State", "name": "State", "bSortable": "true" },
                            { "data": "District", "name": "District", "bSortable": "true" },
                            { "data": "Discount From", "name": "Discount From", "bSortable": "true" },
                            { "data": "Discount To", "name": "Discount To", "bSortable": "true" },
                            { "data": "Discount Category", "name": "Discount Category", "bSortable": "true", },
                              { "data": "State(Location Based)", "name": "State(Location Based)", "bSortable": "true", },
                              { "data": "Sales Group Code", "name": "Sales Group Code", "bSortable": "true", },
                              { "data": "Sales Group Name", "name": "Sales Group Name", "bSortable": "true", },

                                                         { "data": "Discount Type", "name": "Discount Type", "bSortable": "true" },
                            { "data": "Price Card Rate(INR/M)", "name": "Price Card Rate(INR/M)", "bSortable": "true" },
                            { "data": "Discount Applicable (INR/Running Meter)", "name": "Discount Applicable (INR/Running Meter)", "bSortable": "true" },
                            { "data": "Expected Sale(MT)", "name": "Expected Sale(MT)", "bSortable": "true" },
                            { "data": "Target(MT)", "name": "Target(MT)", "bSortable": "true" },
                            { "data": "Total Discount(INR/M)", "name": "Total Discount(INR/M)", "bSortable": "true" },
                            
                            { "data": "Expected NSR (INR)", "name": "Expected NSR (INR)", "bSortable": "true" },
                                                        { "data": "KSM", "name": "KSM", "bSortable": "true" },
                            { "data": "CD", "name": "CD", "bSortable": "true" },
                            { "data": "Other", "name": "Other", "bSortable": "true" },
                            { "data": "Net Landing Price(INR/M)", "name": "Net Landing Price(INR/M)", "bSortable": "true" },
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

                    if (UserRole == "ZH" && $(nRow).find('td:eq(24)').text().split('(')[1].replace(')', ' ').trim() == UserCode) {
                        $(nRow).find('input').attr("disabled", "disabled");
                    }
                    $(nRow).find('td:eq(15)').css('background-color', '#aed6f1');
                    $(nRow).find('td:eq(14)').css('background-color', '#abebc6');
                    $(nRow).find('td:eq(23)').css('background-color', ' #abebc6');
                    
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

    $scope.DownloadFile = function (typeoffile) {
        var FileName = "Discount_Structures";

        if ($("#DiscountStructure tbody tr").length <= 0) {

            alert("No Data Available");
        }
        else {


            if (!$('#DiscountStructure').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }



            var WhereCondition = "";

            if (UserRole == "SH") {
                WhereCondition = "Where DS.CreatedBy='" + UserCode + "'";
                $("#Approve").css({ "display": "none" });
                $("#Reject").css({ "display": "none" });
            }
            else if (UserRole == "ZH") {
                WhereCondition = "where DSS.STATUS IN(1,2,3,4,5) and DS.CreatedBy IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and EMPLOYEE_CODE!='') union select DS.Discount_Id as 'Discount Id',convert(varchar(10),DS.Created_Date,103) as 'Created Date',DS.Customer_Code as 'Stockist Id',DS.Customer_Name as 'Stockist Name',DS.Zone as 'Zone',DS.State as 'State',DS.District as 'District',FORMAT(DS.Discount_Valid_From,'dd/MM/yyyy') as 'Discount From',FORMAT(DS.Discount_Valid_To,'dd/MM/yyyy') as 'Discount To',DS.Discount_Category as 'Discount Category',DS.State_Location_Based as 'State(Location Based)',DS.Sales_Group_Code as 'Sales Group Code',DS.Sales_Group_Desc as 'Sales Group Name',DS.Discount_Type as 'Discount Type',DS.Price_card_Rate as 'Price Card Rate(INR/M)',DS.Discount_Applicable_Running_Meter as 'Discount Applicable (INR/Running Meter)',DS.Expected_Sale as 'Expected Sale(MT)',DS.Target as 'Target(MT)',DS.[Total Discount] as 'Total Discount(INR/M)',DS.Expected_Nsr as 'Expected NSR (INR)',DS.KSM as 'KSM (INR/M)',DS.CD as 'CD (INR/M)',DS.Other as 'Other Discounts (if any) (INR/M)',DS.Net_Landing_Price as 'Net Landing Price(INR/M)',DS.Created_Name as 'Requester',(case when DSS.Status='1' then 'Waiting Approval For ZH' when DSS.Status='2' then 'Rejected By ZH' when DSS.Status='3' then 'Waiting Approval For NSH' when DSS.Status='4' then 'Rejected By NSH' else 'Approved' end) as 'Request Status',DS.Remarks as 'Remarks' from Discount_Structures DS inner join Discount_Structure_Status DSS on DSS.Discount_Id=DS.Discount_Id where DS.CreatedBy='" + UserCode + "'";
            }
            else if (UserRole == "NSH") {
                WhereCondition = "where DSS.STATUS IN(3,4,5)";
                $("#HideAddNew").css("display", "none");
            }
            else if (UserRole == "COO" || UserRole == "CST1" || UserRole == "BU_FIN_HEAD") {
                WhereCondition = "";
                $("#HideAddNew").css("display", "none");
                $("#Approve").css({ "display": "none" });
                $("#Reject").css({ "display": "none" });
            }
            var Searchvalue = $('input[type=search]').val();
            var Data = JSON.stringify({
                UserCode: UserCode,
                ReportName: "DiscountStructure",
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

    $scope.ApproveRequest = function () {

        var Discountidarray = new Array();
        if ($('.checkbox:checked').length != 0) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    var New = $(this).closest('tr').find('td:eq(24)').text().split('(')[1].replace(')', ' ').trim();
                    var DiscountType = $(this).closest('tr').find('td:eq(13)').text();

                    var CustId = "";
                    if ($(this).closest('tr').find('td:eq(9)').text() == "Location Based") {
                        CustId = $(this).closest('tr').find('td:eq(10)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text() + ")^Location Based";

                    }
                    else {
                        CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")^Party Name";
                    }

                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(25)').text() + "^" + New + "^" + CustId + "^" + DiscountType);

                });
            }
            else {
                $('.checkbox:checked').each(function () {
                    var New = $(this).closest('tr').find('td:eq(24)').text().split('(')[1].replace(')', ' ').trim();
                    var DiscountType = $(this).closest('tr').find('td:eq(13)').text();

                    var CustId = "";

                    if ($(this).closest('tr').find('td:eq(9)').text() == "Location Based") {
                        CustId = $(this).closest('tr').find('td:eq(10)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text() + ")^Location Based";

                    }
                    else {
                        CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")^Party Name";
                    }


                    Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(25)').text() + "^" + New + "^" + CustId + "^" + DiscountType);
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            var Data = JSON.stringify({ DiscountData: Discountidarray });
            ShowLoader();
            DIMSFactory.ChangeStatusToDiscounts(Data).success(function (response) {
                if (response == "Success") {
                    alert("Successfully Approved");
                    HideLoader();
                    $scope.go('DiscountStructure/');
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

    $scope.RejectRequest = function () {
        var flag = 0;
        var Discountidarray = new Array();

        if ($('.checkbox:checked').length != 0 && $("#Remarks").val() != "" && $("#Remarks").val() != undefined) {
            if ($("#StockistCheckAll").prop('checked') == true) {
                $('.checkbox:checked').each(function () {
                    if ($(this).closest('tr').find('td:eq(25)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(25)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Discount to reject");
                        return false;
                        flag++;
                    }
                    else {
                        var New = $(this).closest('tr').find('td:eq(24)').text().split('(')[1].replace(')', ' ').trim();
                        var DiscountType = $(this).closest('tr').find('td:eq(13)').text();

                        var CustId = "";
                        if ($(this).closest('tr').find('td:eq(9)').text() == "Location Based") {
                            CustId = $(this).closest('tr').find('td:eq(10)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text() + ")^Location Based";
                        }
                        else {
                            CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")^Party Name";
                        }


                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(25)').text() + "^" + New + "^" + $("#Remarks").val() + "^" + CustId + "^" + DiscountType);
                    }
                });
            }
            else {
                $('.checkbox:checked').each(function () {

                    if ($(this).closest('tr').find('td:eq(25)').text() == "Rejected By ZH" || $(this).closest('tr').find('td:eq(25)').text() == "Rejected By NSH") {
                        alert("Please do not select Rejected Discount to reject");
                        flag++;
                        return false;

                    }
                    else {
                        var New = $(this).closest('tr').find('td:eq(24)').text().split('(')[1].replace(')', ' ').trim();
                        var DiscountType = $(this).closest('tr').find('td:eq(13)').text();
                        var CustId = "";
                        if ($(this).closest('tr').find('td:eq(9)').text() == "Location Based") {
                            CustId = $(this).closest('tr').find('td:eq(10)').text() + "(" + $(this).closest('tr').find('td:eq(12)').text() + ")^Location Based";

                        }
                        else {
                            CustId = $(this).closest('tr').find('td:eq(3)').text() + "(" + $(this).closest('tr').find('td:eq(2)').text() + ")^Party Name";
                        }


                        Discountidarray.push($(this).attr('id') + "^" + $(this).closest('tr').find('td:eq(25)').text() + "^" + New + "^" + $("#Remarks").val() + "^" + CustId + "^" + DiscountType);

                        //  Discountidarray.push($(this).attr('id') + "_" + $(this).closest('tr').find('td:eq(22)').text() + "_" + New);
                    }
                    //Discountidarray.push($(this).attr('id'));
                });
            }
            if (flag == 0) {
                var Data = JSON.stringify({ DiscountData: Discountidarray });
                ShowLoader();
                DIMSFactory.ChangeRejectedStatusToDiscounts(Data).success(function (response) {
                    if (response == "Success") {
                        alert("Successfully Rejected");
                        $("#RemarksLookUp").modal('hide');
                        $("div").removeClass('modal-backdrop fade in');

                        HideLoader();
                        $scope.go('DiscountStructure/');
                    }
                    else {
                        alert("Failed To Reject");
                        $("#RemarksLookUp").modal('hide');
                        //$("div").removeClass('modal-backdrop fade in');
                        HideLoader();
                    }
                }).error(function () {
                    $("#RemarksLookUp").modal('hide');
                    $("div").removeClass('modal-backdrop fade in');

                    HideLoader();
                });
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

            $("#RemarksLookUp").modal('show');
        }
    }

    $("#DiscountStructure tbody").on('click', 'td', function () {
        if ($("#DiscountStructure").DataTable().data().count() != 0) {
            if ($(this).index() != "0") {
                var ID = $(this).parent().find('td:eq(1)').text();
                var Status = $(this).parent().find('td:eq(25)').text();
                if (Status == "Approved" && UserRole == "NSH") {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditDiscountDiv")).scope();
                    scope.$apply(function () {
                        scope.go("DiscountStructureNew/" + ID);
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

                    //    var scope = angular.element($("#EditDiscountDiv")).scope();
                    //    scope.$apply(function () {
                    //        scope.go("DiscountStructureNew/" + ID);
                    //    })
                    //}
                else if (UserRole == "CST2") {
                    if ($(this).parent().hasClass('selected')) {
                        $(this).parent().removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).parent().addClass('selected');
                    }

                    var scope = angular.element($("#EditDiscountDiv")).scope();
                    scope.$apply(function () {
                        scope.go("DiscountStructureNew/" + ID);
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

                    var scope = angular.element($("#EditDiscountDiv")).scope();
                    scope.$apply(function () {
                        scope.go("DiscountStructureNew/" + ID);
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

                    var scope = angular.element($("#EditDiscountDiv")).scope();
                    scope.$apply(function () {
                        scope.go("DiscountStructureNew/" + ID);
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

                    var scope = angular.element($("#EditDiscountDiv")).scope();
                    scope.$apply(function () {
                        scope.go("DiscountStructureNew/" + ID);
                    })
                }
            }
        }
    });

});

DIMS.controller('DiscountStructureNewControl', function ($scope, $location, DIMSFactory, $routeParams) {
    var Html = "";
    $scope.templatesettings = { HeaderTitle: "DiscountStructureNew" };
    $scope.go = function (path) {
        CheckUserSession();

        $location.path(path);
    };
    DisCountNewScope = $scope;
    var UserCode = $("#USERCODE_Discounts").val();
    var UserName = $("#USERNAME_Discounts").val();
    var UserRole = $("#USERTYPE_Discounts").val();

    angular.element(document).ready(function () {
        var EditDiscountId = $routeParams.ID;

        if (EditDiscountId == undefined || EditDiscountId == "") {
            EditDiscountId = 0;
            DIMSFactory.GetDiscountId().success(function (response) {
                var Data = JSON.parse(response);
                $("#RequestCreatedBy").val(UserCode);

                $("#CreatedBy").val(UserName + "(" + UserCode + ")");
                $("#DiscountID").val(Data["DiscountId"]);
                //$("Date").val();
                $("#CreatedDate").val(Data["Date"]);

            });
        }
        else {
            DIMSFactory.GetDiscountDataForEdit(EditDiscountId).success(function (response) {

                if (response != "No Data") {
                    var Result = JSON.parse(response);

                    $("#UpdateNav").html("Update");
                    $("#UpdateNav1").html("Update");



                    $("#DiscountID").val(Result[0]["Discount Id"]);
                    $("#RequestCreatedBy").val(Result[0]["CreatedBy"]);
                    $("#CreatedBy").val(Result[0]["Requester"]);
                    $("#CreatedDate").val(Result[0]["Created Date"]);
                    $("#StockistCode").val(Result[0]["Stockist Id"]);
                    $("#StockistName").val(Result[0]["Stockist Name"]);
                    $("#DiscountCategory").val(Result[0]["Discount Category"]);
                    $("#KSM").val(Result[0]["KSM"]);
                    $("#CD").val(Result[0]["CD"]);
                    $("#Other").val(Result[0]["Other"]);

                    $("#DiscountCategory").attr("disabled", "disabled");

                    $("#State_Location").empty();
                    if (Result[0]["State(Location Based)"] == "") {
                        Result[0]["State(Location Based)"] = "select";
                    }
                    $("#State_Location").append($("<option></option>").val(Result[0]["State(Location Based)"]).html(Result[0]["State(Location Based)"]))

                    // $("#State_Location").val(Result[0]["State(Location Based)"]);
                    $("#SalesCode").val(Result[0]["Sales Code"]);
                    $("#SalesGroupName").val(Result[0]["Sales Name"]);
                    $("#District").val(Result[0]["District"]);
                    $("#DiscountApplicable").val(Result[0]["Discount Applicable (INR/Running Meter)"]);
                    $("#State").val(Result[0]["State"]);
                    $("#ExpectedSale").val(Result[0]["Expected Sale(MT)"]);
                    $("#Zone").val(Result[0]["Zone"]);
                    $("#Target").val(Result[0]["Target(MT)"]);
                    $("#DiscountType").val(Result[0]["Discount Type"]);

                    $("#DiscountType").attr("disabled", "disabled");

                    $("#TotalDiscount").val(Result[0]["Total Discount(INR/M)"]);
                    $("#DiscontFrom").val(Result[0]["Discount From"]);
                    $("#DiscontFrom").datepicker("setDate", Result[0]["Discount From"]);




                    $("#NetLandingPrice").val(Result[0]["Net Landing Price(INR/M)"]);


                    $("#PriceCardRate").val(Result[0]["Price Card Rate(INR/M)"]);
                    $("#ExpectedNSR").val(Result[0]["Expected NSR (INR)"]);
                    $("#Remarks").val(Result[0]["Remarks"]);
                    $("#RequestStatus").val(Result[0]["Request Status"]);

                    if (Result[0]["Discount Type"] == "Target Discount") {
                        $("#Target").attr("disabled", false);
                        $("#ExpectedSale").attr("disabled", "disabled");
                        $("#ExpectedSale").val("");
                        $("#MandSales").html("");
                        $("#MandTarget").html("*");

                    }
                    else {
                        $("#ExpectedSale").attr("disabled", false);
                        $("#Target").attr("disabled", "disabled");
                        $("#Target").val("");
                        $("#MandSales").html("*");
                        $("#MandTarget").html("");
                    }

                    if (Result[0]["Discount Category"] == "Location Based") {
                        $(".Customer").children('.btn-default').css("pointer-events", "none");
                        $('.SalesGroup').children('.btn-default').css("pointer-events", "none");
                        $('#State_Location').attr('disabled', true);
                        $("#ExpectedNsrMnd").html(" ");
                        $(".ManuHide").hide();
                        $("#MandState").html("*");
                        $("#MandStockist").html(" ");
                        //$("#StockistCode").val("");
                        //$("#StockistName").val("");
                        //$("#Zone").val("");
                        //$("#State").val("");
                        //$("#District").val("");
                    }
                    else {
                        $('.SalesGroup').children('.btn-default').css("pointer-events", "none");
                        $('#State_Location').attr('disabled', 'disabled');
                        $(".Customer").children('.btn-default').css("pointer-events", "none");
                        $("#SalesCode").val("");
                        $("#SalesGroupName").val("");
                        $("#State_Location").empty();
                        $("#State_Location").append($("<option></option>").val("select").html("select"));
                        $(".ManuHide").show();
                        $("#MandState").html(" ");
                        $("#MandStockist").html("*");
                    }
                    setTimeout(function () {
                        $("#DiscountTo").val(Result[0]["Discount To"]);
                        $("#DiscountTo").datepicker("setDate", Result[0]["Discount To"]);
                    }, 500);
                }
                else {
                    alert("No Data Found");
                }
            });
        }
    });

    $scope.SaveDiscounts = function () {
        // var Department = $('#Department').val();
        var DiscountId = $("#DiscountID").val();
        var CreatedBy = $("#RequestCreatedBy").val();
        var CreatedName = $("#CreatedBy").val();
        var CreatedDate = $("#CreatedDate").val();
        var CustomerCode = $("#StockistCode").val();
        var CustomerName = $("#StockistName").val();
        var DiscountCategory = $("#DiscountCategory").val();
        var State_Location = $("#State_Location option:selected").text();
        var SalesCode = $("#SalesCode").val();
        var SalesGroupName = $("#SalesGroupName").val();
        var District = $("#District").val();
        var DiscountApplicable = $("#DiscountApplicable").val();
        var State = $("#State").val();
        var ExpectedSale = $("#ExpectedSale").val();
        var Zone = $("#Zone").val();
        var Target = $("#Target").val();
        var DiscountType = $("#DiscountType").val();
        var TotalDiscount = $("#TotalDiscount").val();
        var DiscontFrom = $("#DiscontFrom").val();
        var Data = UserCode;
        var NetLandingPrice = $("#NetLandingPrice").val();
        var DiscountTo = $("#DiscountTo").val();
        var PriceCardRate = $("#PriceCardRate").val();
        var ExpectedNSR = $("#ExpectedNSR").val();
        var Remarks = $("#Remarks").val();
        var Status = $("#RequestStatus").val();
        var KSM = $("#KSM").val();
        var CD = $("#CD").val();
        var Other = $("#Other").val();



        if (DiscountId == undefined) { DiscountId = ""; }
        if (CreatedBy == undefined) { CreatedBy = ""; }
        if (CreatedDate == undefined) { CreatedDate = ""; }
        if (CustomerCode == undefined) { CustomerCode = ""; }
        if (CustomerName == undefined) { CustomerName = ""; }
        if (State_Location == undefined) { State_Location = ""; }
        if (SalesCode == undefined) { SalesCode = ""; }
        if (SalesGroupName == undefined) { SalesGroupName = ""; }
        if (District == undefined) { District = ""; }
        if (DiscountApplicable == undefined) { DiscountApplicable = ""; }
        if (Remarks == undefined) { Remarks = ""; }
        if (State == undefined) { State = ""; }
        if (ExpectedSale == undefined) { ExpectedSale = ""; }
        if (Zone == undefined) { Zone = ""; }
        if (Target == undefined) { Target = ""; }
        if (TotalDiscount == undefined) { TotalDiscount = ""; }
        if (DiscontFrom == undefined) { DiscontFrom = ""; }
        if (NetLandingPrice == undefined) { NetLandingPrice = ""; }
        if (DiscountTo == undefined) { DiscountTo = ""; }
        if (ExpectedNSR == undefined) { ExpectedNSR = ""; }
        if (DiscountCategory == "Stockist Based") { State_Location = "" }
        if (KSM == ""||KSM==undefined) { KSM = 0 }
        if (CD == "" || CD == undefined) { CD = 0 }
        if (Other == "" || Other == undefined) { Other = 0 }



        var EditDiscountId = $routeParams.ID;


        if (DiscountCategory == "" || DiscountCategory == null || DiscountCategory == "select") {
            alert("Please Select any Discount Category");
        }
        else if (DiscountCategory == "Location Based" && State_Location == "select") {
            alert("Please Select State Based on Location");
        }
        else if (DiscountCategory == "Location Based" && (SalesCode == "" || SalesCode == null)) {
            alert("Please Select Sales Group Code");
        }
        else if (DiscountCategory == "Stockist Based" && (CustomerCode == "" || CustomerCode == null)) {
            alert("Please Select Stockist Code");
        }
        else if (DiscountType == "" || DiscountType == null || DiscountType == "select") {
            alert("Please select any Discount Type");
        }
        else if (DiscountApplicable == null || DiscountApplicable == "") {
            alert("Please Enter Discount Applicable");
        }
        else if (DiscountType == "Target Discount" && (Target == null || Target == "")) {
            alert("Please Enter Target");
        }
        else if ((DiscountType == "Additional Discount" || DiscountType == "Agreed Rate Discount" || DiscountType == "Other Discount") && (ExpectedSale == null || ExpectedSale == "")) {
            alert("Please Enter Expected sale");
        }
        else if (DiscontFrom == "" || DiscontFrom == null) {
            alert("Please select Discount Fromdate");
        }
        else if (DiscountTo == "" || DiscountTo == null) {
            alert("Please select Discount Todate");
        }
        else if (DiscountCategory != "Location Based" && (ExpectedNSR == "" || ExpectedNSR == null)) {
            alert("Please Enter expected NSR");
        }

        else {
            if (EditDiscountId == undefined || EditDiscountId == "") {
                EditDiscountId = 0;
            }



            var TotalDiscountData = JSON.stringify({
                "EditDiscountId": EditDiscountId,
                "DiscountId": DiscountId,
                "CreatedBy": CreatedBy,
                "CreatedDate": CreatedDate,
                "CustomerCode": CustomerCode,
                "CustomerName": CustomerName,
                "DiscountCategory": DiscountCategory,
                "State_Location": State_Location,
                "DiscountApplicable": DiscountApplicable,
                "ExpectedSale": ExpectedSale,
                "Target": Target,
                "TotalDiscount": TotalDiscount,
                "Remarks": Remarks,
                "Zone": Zone,
                "State": State,
                "District": District,
                "DiscountType": DiscountType,
                "DiscontFrom": DiscontFrom,
                "DiscountTo": DiscountTo,
                "NetLandingPrice": NetLandingPrice,
                "ExpectedNSR": ExpectedNSR,
                "PriceCardRate": PriceCardRate,
                "UserRole": UserRole,
                "SalesGroupCode": SalesCode,
                "SalesGroupName": SalesGroupName,
                "Created_Name": CreatedName,
                "Status": Status,
                "KSM": KSM,
                "CD": CD,
                "Other":Other
            });

            ShowLoader();
            DIMSFactory.SaveDiscountsData(TotalDiscountData).success(function (response) {
                if (response == "Save") {
                    alert("Saved successfully");
                    $scope.go('DiscountStructure');
                    HideLoader();
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                    HideLoader();
                } else if (response == "Update") {
                    alert("Updated Successfully");
                    HideLoader();
                    $scope.go('DiscountStructure');
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

        if ($("#DiscountCategory").val() != "select") {
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
        else {
            alert("Please Select Discount Category");
        }
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

    angular.element(document).on('change', '#DiscountCategory', function () {
        if ($("#DiscountCategory").val() == "Location Based") {
            $(".Customer").children('.btn-default').css("pointer-events", "none");
            $('.SalesGroup').children('.btn-default').css("pointer-events", "all");
            $('#State_Location').attr('disabled', false);
            $("#StockistCode").val("");
            $("#StockistName").val("");
            $("#Zone").val("");
            $("#State").val("");
            $("#District").val("");
            $("#PriceCardRate").val("");
            $("#ExpectedNsrMnd").html(" ");
            $(".ManuHide").hide();
            $("#KSM").val("");
            $("#CD").val("");
            $("#Other").val("");
            $("#MandState").html("*");
            $("#MandStockist").html(" ");
            $("#ExpectedSale").val("");
            $("#Target").val("");
            $("#NetLandingPrice").val("");
            $("#TotalDiscount").val("");
            $("#ExpectedNSR").val("");
            $("#DiscountType").val("select");
            $("#DiscountApplicable").val("");
            $("#MandSales").html(" ");
            $("#MandTarget").html("");
            $("#ExpectedSale").attr("disabled", "disabled");
            $("#Target").attr("disabled", "disabled");

            var Data = JSON.stringify({ "UserCode": UserCode, "UserRole": UserRole });
            DIMSFactory.GetStatesBased_Location(Data).success(function (res) {

                if (res != "No Data") {
                    var Result = JSON.parse(res);
                    if (Result.length == 1) {
                        $("#State_Location").empty();
                        $("#State_Location").append($("<option></option>").val(Result[0]["STATE_CODE"]).html(Result[0]["STATE_DESC"]));
                        $("#State_Location").attr("disabled", "disabled");
                    }
                    else {
                        $("#State_Location").empty();
                        $("#State_Location").append($("<option></option>").val("select").html("select"));
                        for (var i = 0; i < Result.length; i++) {
                            $("#State_Location").append($("<option></option>").val(Result[i]["STATE_CODE"]).html(Result[i]["STATE_DESC"]));
                        }
                    }
                }
                else {
                    alert("No States are available");
                }
            });
        }
        else if ($("#DiscountCategory").val() == "Stockist Based") {
            $('.SalesGroup').children('.btn-default').css("pointer-events", "none");
            $('#State_Location').attr('disabled', 'disabled');
            $(".Customer").children('.btn-default').css("pointer-events", "all");
            $("#SalesCode").val("");
            $("#SalesGroupName").val("");
            $("#PriceCardRate").val("");
            $("#State_Location").empty();
            $("#State_Location").append($("<option></option>").val("select").html("select"));
            $("#ExpectedNsrMnd").html("*");
            $(".ManuHide").show();
            $("#MandState").html(" ");
            $("#MandStockist").html("*");
            $("#ExpectedSale").val("");
            $("#Target").val("");
            $("#NetLandingPrice").val("");
            $("#TotalDiscount").val("");
            $("#ExpectedNSR").val("");
            $("#DiscountType").val("select");
            $("#DiscountApplicable").val("");
            $("#MandSales").html(" ");
            $("#MandTarget").html("");
            $("#ExpectedSale").attr("disabled", "disabled");
            $("#Target").attr("disabled", "disabled");
        }
        else {
            $("#StockistCode").val("");
            $("#StockistName").val("");
            $("#Zone").val("");
            $("#State").val("");
            $("#District").val("");
            $("#SalesCode").val("");
            $("#SalesGroupName").val("");
            $("#PriceCardRate").val("");
            $("#State_Location").empty();
            $("#State_Location").append($("<option></option>").val("select").html("select"));
            $("#ExpectedNsrMnd").html("*");
            $(".ManuHide").hide();
            $("#KSM").val("");
            $("#CD").val("");
            $("#Other").val("");
            $("#MandState").html(" ");
            $("#MandStockist").html(" ");
            $("#ExpectedSale").val("");
            $("#Target").val("");
            $("#NetLandingPrice").val("");
            $("#TotalDiscount").val("");
            $("#ExpectedNSR").val("");
            $("#DiscountType").val("select");
            $("#DiscountApplicable").val("");
            $("#MandSales").html(" ");
            $("#MandTarget").html("");
            $("#ExpectedSale").attr("disabled", "disabled");
            $("#Target").attr("disabled", "disabled");

            // $('.SalesGroup').children('.btn-default').css("pointer-events", "none");
            // $(".Customer").children('.btn-default').css("pointer-events", "none");
        }
    });

    $scope.Getdata_Sales = function (Methodname, MasterType, Heading) {
        if ($("#State_Location").val() != "select") {
            var Data = JSON.stringify({
                MasterType: MasterType,
                ID: "2",
                State_Code: $("#State_Location").val()
            });
            ShowLoader();
            DIMSFactory.getMasterData(Data).success(function (response) {
                getLookUpData(response, Methodname, Heading);
                HideLoader();
            }).error(function () {
                HideLoader();
            });

        }
        else {
            alert("Please Select State");
        }
    }

    angular.element(document).on('change', '#State_Location', function () {
        if ($('#State_Location').val() == "select") {
            $("#SalesCode").val("");
            $("#SalesGroupName").val("");
        }
    });

    angular.element(document).on('change', '#DiscountType', function () {
        if ($('#DiscountType').val() == "Target Discount") {
            $("#Target").attr("disabled", false);
            $("#ExpectedSale").attr("disabled", "disabled");
            $("#ExpectedSale").val("");
            $("#TotalDiscount").val("");
            $("#NetLandingPrice").val("");
            $("#MandSales").html(" ");
            $("#MandTarget").html("*");

        }
        else if ($('#DiscountType').val() == "Other Discount" || $('#DiscountType').val() == "Agreed Rate Discount" || $('#DiscountType').val() == "Additional Discount") {
            $("#ExpectedSale").attr("disabled", false);
            $("#Target").attr("disabled", "disabled");
            $("#Target").val("");
            $("#ExpectedSale").val("");
            $("#TotalDiscount").val("");
            $("#NetLandingPrice").val("");
            $("#MandSales").html("*");
            $("#MandTarget").html("");
        }
        else if ($('#DiscountType').val() == "select") {
            $("#ExpectedSale").attr("disabled", "disabled");
            $("#Target").attr("disabled", "disabled");
            $("#Target").val("");
            $("#ExpectedSale").val("");
            $("#TotalDiscount").val("");
            $("#NetLandingPrice").val("");
            $("#MandSales").html(" ");
            $("#MandTarget").html(" ");
        }
    });

    angular.element(document).on('keyup', '#ExpectedSale', function () {
        var DiscountApplicable = $("#DiscountApplicable").val();
        if ($("#Other").val() != "") {
            DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
        }
        if ($("#CD").val() != "") {
            DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
        }

        if ($("#KSM").val() != "") {
            DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
        }
        var Expected = $("#ExpectedSale").val();
        var Total = parseFloat(DiscountApplicable * Expected * 78.8).toFixed(2);
        $("#TotalDiscount").val(Total);


        var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

        $("#NetLandingPrice").val(NetLandingPrice);
    });

    angular.element(document).on('keyup', '#Target', function () {
        var DiscountApplicable = $("#DiscountApplicable").val();
        if ($("#Other").val() != "") {
            DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
        }
        if ($("#CD").val() != "") {
            DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
        }

        if ($("#KSM").val() != "") {
            DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
        }

        var Target = $("#Target").val();
        var Total = parseFloat(DiscountApplicable * Target * 78.8).toFixed(2);
        $("#TotalDiscount").val(Total);

        var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

        $("#NetLandingPrice").val(NetLandingPrice);

    });

    angular.element(document).on('keyup', '#DiscountApplicable', function () {
        if ($("#Target").val() != "" || $("#ExpectedSale").val() != "") {
            if ($("#Target").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();
                if ($("#Other").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }
                var Target = $("#Target").val();
                var Total = parseFloat(DiscountApplicable * Target * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);

                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
            else if ($("#ExpectedSale").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();

                if ($("#Other").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }
                var Expected = $("#ExpectedSale").val();
                var Total = parseFloat(DiscountApplicable * Expected * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);


                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
        }
        //else if ($("#Target").val() == "" || $("#ExpectedSale").val() == "") {
        //    var DiscountApplicable = $("#DiscountApplicable").val();
        //    //var Target = $("#Target").val();
        //    var Total = parseFloat(DiscountApplicable * 0 * 78.8).toFixed(2);
        //    $("#TotalDiscount").val(Total);

        //    var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

        //    $("#NetLandingPrice").val(NetLandingPrice);
        //}
        
    });

    angular.element(document).on('keyup', '#KSM', function () {
        if ($("#Target").val() != "" || $("#ExpectedSale").val() != "") {
            if ($("#Target").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();

                if ($("#Other").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }

                var Target = $("#Target").val();
                var Total = parseFloat(DiscountApplicable * Target * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);

                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
            else if ($("#ExpectedSale").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();

                if ($("#Other").val() != "")
                {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "")
                {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }

                var Expected = $("#ExpectedSale").val();
                var Total = parseFloat(DiscountApplicable * Expected * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);


                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
        }
        //else if ($("#Target").val() == "" || $("#ExpectedSale").val() == "") {
        //    var DiscountApplicable = $("#DiscountApplicable").val();
        //    //var Target = $("#Target").val();
        //    var Total = parseFloat(DiscountApplicable * 0 * 78.8).toFixed(2);
        //    $("#TotalDiscount").val(Total);

        //    var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

        //    $("#NetLandingPrice").val(NetLandingPrice);
        //}
    });

    angular.element(document).on('keyup', '#CD', function () {
        if ($("#Target").val() != "" || $("#ExpectedSale").val() != "") {
            if ($("#Target").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();

                if ($("#Other").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }
                var Target = $("#Target").val();
                var Total = parseFloat(DiscountApplicable * Target * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);

                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
            else if ($("#ExpectedSale").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();

                if ($("#Other").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }

                var Expected = $("#ExpectedSale").val();
                var Total = parseFloat(DiscountApplicable * Expected * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);


                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
        }
        //else if ($("#Target").val() == "" || $("#ExpectedSale").val() == "") {
        //    var DiscountApplicable = $("#DiscountApplicable").val();
        //    //var Target = $("#Target").val();
        //    var Total = parseFloat(DiscountApplicable * 0 * 78.8).toFixed(2);
        //    $("#TotalDiscount").val(Total);

        //    var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

        //    $("#NetLandingPrice").val(NetLandingPrice);
        //}
    });

    angular.element(document).on('keyup', '#Other', function () {
        if ($("#Target").val() != "" || $("#ExpectedSale").val() != "") {
            if ($("#Target").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();

                if ($("#Other").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }
                var Target = $("#Target").val();
                var Total = parseFloat(DiscountApplicable * Target * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);

                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
            else if ($("#ExpectedSale").val() != "") {
                var DiscountApplicable = $("#DiscountApplicable").val();

                if ($("#Other").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#Other").val());
                }
                if ($("#CD").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#CD").val());
                }

                if ($("#KSM").val() != "") {
                    DiscountApplicable = parseFloat(DiscountApplicable) + parseFloat($("#KSM").val());
                }

                var Expected = $("#ExpectedSale").val();
                var Total = parseFloat(DiscountApplicable * Expected * 78.8).toFixed(2);
                $("#TotalDiscount").val(Total);


                var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

                $("#NetLandingPrice").val(NetLandingPrice);
            }
        }
        //else if ($("#Target").val() == "" || $("#ExpectedSale").val() == "") {
        //    var DiscountApplicable = $("#DiscountApplicable").val();
        //    //var Target = $("#Target").val();
        //    var Total = parseFloat(DiscountApplicable * 0 * 78.8).toFixed(2);
        //    $("#TotalDiscount").val(Total);

        //    var NetLandingPrice = parseFloat($("#PriceCardRate").val() - DiscountApplicable).toFixed(2);

        //    $("#NetLandingPrice").val(NetLandingPrice);
        //}
    });



    $scope.SalesGroupPopup = function () {
        if ($("#State_Location").val() != "select") {
            var Data = JSON.stringify({
                MasterType: "GetSalesGroup",
                ID: "2",
                State_Code: $("#State_Location").val()
            });
            ShowLoader();

            DIMSFactory.getMasterData(Data).success(function (response) {

                var Html = "";
                var Result = JSON.parse(response.tabledata);
                for (var i = 0; i < Result.length; i++) {
                    Html += "<tr ><td>" + Result[i]["ID"] + "</td>";
                    Html += "<td>" + Result[i]["SALES_GROUP_CODE"] + "</td>";
                    Html += "<td>" + Result[i]["SALES_GROUP_DESC"] + "</td>";
                    Html += "<td>" + Result[i]["price_Card_Rate"] + "</td>";
                    Html += "<td><input type='checkbox' class='checkbox' id=" + Result[i]["SALES_GROUP_CODE"] + " ></td></tr>";
                }

                $("#tblSalesgroup tbody").empty();
                $("#tblSalesgroup tbody").append(Html);

                $("#tblSalesgroup").DataTable();

                $("#tblSalesgroup tr td:nth-child(1)").hide();
                $("#tblSalesgroup tr th:nth-child(1)").hide();


                $("#SalesLookUp").modal('show');
                HideLoader();

            });

        }
        else {
            alert("Please Select State");
        }
    }

    var PriceCardArray = "";

    $scope.saveSalesGroup = function () {
        if ($(".checkbox:checked").length>0) {
            var salesGroupCode = new Array();
            var SalesGroupNames = new Array();
            $(".checkbox:checked").each(function () {
                if (PriceCardArray == "") {
                    PriceCardArray = $(this).parent().parent().find('td:eq(3)').html();
                }

                if (PriceCardArray == $(this).parent().parent().find('td:eq(3)').html()) {
                    salesGroupCode.push($(this).parent().parent().find('td:eq(1)').html());
                    SalesGroupNames.push($(this).parent().parent().find('td:eq(2)').html());
                }
                else {
                    alert("Please select one price card rate");
                    PriceCardArray = "";
                    return false;
                }
            });
          //  alert(PriceCardArray);


            if (PriceCardArray != "") {
                $("#SalesCode").val(salesGroupCode);
                $("#SalesGroupName").val(SalesGroupNames);
                $("#PriceCardRate").val(PriceCardArray);
                PriceCardArray = "";
                $("#SalesLookUp").modal('hide');
            }
        }
        else {
            alert("Please select any sales region");
        }
    }

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

});

function GetSalesGroup(obj) {

    DisCountNewScope.$apply(function () {
        $("#SalesCode").val($(obj).children().eq(1).html());
        $("#SalesGroupName").val($(obj).children().eq(2).html());
        $("#PriceCardRate").val($(obj).children().eq(3).html());
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');

}