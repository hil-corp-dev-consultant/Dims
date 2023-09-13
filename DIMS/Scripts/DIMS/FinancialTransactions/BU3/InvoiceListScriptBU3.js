
var MasterScope;
var MasterName;
var txtUserRoleCnt;
var txtUserNameCnt;
var DocSeriesName;
var DocDate_CreditNote = "";

DIMS.factory('DIMSSAPFactory', function ($http) {
    return {
        GetTotalAmtInvoice_BU3: function (WhereClause) {
            return $http({ url: '../../FinancialTransactionsBU3/TotalAmtInvoiceBU3', method: 'POST', data: { Data: WhereClause } });
        },
        GetTotalAmtInvoice: function (WhereClause) {
            return $http({ url: '../../SAP/TotalAmtInvoice', method: 'POST', data: { Data: WhereClause } });
        }
    }
});

//Invoice List BU3
DIMS.controller('InvoiceListViewControllerBU3', function ($scope, $location, DIMSSAPFactory, DIMSFactory, $http, $compile) {

    $scope.templatesettings = { HeaderTitle: "Invoices" };
    MasterScope = $scope;
    $("#InvoiceListBU3").show();
    $("#Invoice_Details_BU3").hide();

    $("#InvoiceListDiv_BU3").hide();
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };

    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------

    try {
        var Data = JSON.stringify({
            ID: "",
            UserCode: $("#UserCode").val(),
            UserRoleType: "",
            UserRole : SessionValue,
            ReportName: "InvoiceList_BU3"
        });
        DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
            var Result = JSON.parse(response.tabledata);
            debugger
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
                    console.log("columnlist : " + ColArray);
                } else {
                    var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);
                    var selectedcolumnname = data1["ColumnNames"];
                    CustomColumnID = "0";
                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i],
                            "bSortable": "true"
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                    console.log("columnlist : " + ColArray);
                }
            }

        });

        var data_value = ""; var CustomerArray = new Array();
        ShowLoader();
        CustomerArray.length = 0;
        $("#customerCode").val("");
        $http({ url: '../../FinancialTransactionsBU3/GetCustomersforInvoicesBU3', method: 'POST', data: { Data: data_value } }).success(function (res) {
            debugger
            if (res != "") {
                var dtCust = JSON.parse(res);
                console.log(dtCust);
                var dtCust1 = dtCust.dtCustomer.length;
                console.log(dtCust1);
                //var dtCust = JSON.stringify(res);
                for (var i = 0; i < dtCust1; i++) {
                    //for (var i = 0; i < dtCust.length; i++) {
                    //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                    CustomerArray.push(dtCust.dtCustomer[i]["CUSTOMER_CODE"] + ":" + dtCust.dtCustomer[i]["CUSTOMER_NAME"]);
                }
                HideLoader();
            } else { HideLoader(); }
        });

        $("#customerCode").typeahead({

            source: CustomerArray
        });

        $scope.GetInvoiceDataBU3 = function () {
            debugger
            var isValidCustCode = isValidCode_Cust($("#customerCode").val(), CustomerArray);
            if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "" && $("#invoiceNo").val() != "") {
                GetInvoiceData();
            }
            else if ($("#invoiceNo").val() != "") {
                GetInvoiceData();
            }
            else if ($("#fromDate").val() == "" || $("#toDate").val() == "" ) {
                alert("Please Provide  date" );
                return false;
            } else if ($("#fromDate").val() != "" && $("#toDate").val() == "") {
                alert("Please Provide to date");
                return false;
            } else if (new Date($("#toDate").val()) < new Date($("#fromDate").val())) {
                alert("To date should be greater than From Date");
                return false;
            } else if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() == "") {
                alert("Please Provide Customer");
                return false;
            } else if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {
                alert("please select proper customer code");            
            } else {
                GetInvoiceData();
            }            
        }

        function GetInvoiceData() {
            debugger
            ShowLoader();
            var isValidCustCode = isValidCode_Cust($("#customerCode").val(), CustomerArray);
            var DateRange = DateSplitter('fromDate', 'toDate');
            var WhereClause = "";
            try {
                if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "" && $("#invoiceNo").val() != "") {
                    console.log("isValidCustCode : " + isValidCustCode);
                    WhereClause = "where (INVOICE_DATE between " + DateRange + ")";

                    console.log("isValidCustCode : " + isValidCustCode);
                    if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {

                    }
                    else {
                        WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ") and INVOICE_NO IN (" + $("#invoiceNo").val() + ") ";
                    }
                }
                else if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "") {
                    console.log("isValidCustCode : " + isValidCustCode);
                    WhereClause = "where (INVOICE_DATE between " + DateRange + ")";

                    console.log("isValidCustCode : " + isValidCustCode);
                        if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {

                        }
                        else {
                            WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ") ";
                        }                    
                } else if ($("#invoiceNo").val() != "") {
                    WhereClause += "WHERE INVOICE_NO IN (" + $("#invoiceNo").val() + ") ";
                }

               // WhereClause += " order by INVOICE_NO ASC";
                var Data1 = JSON.stringify({
                    MasterType: "InvoiceList_BU3",
                    ID: "561",
                    UserCode: $("#UserCode").val(),
                    "Type": "Get",
                    ReportName: "InvoiceList_BU3",
                    WhereClause: WhereClause
                });
                DIMSSAPFactory.GetTotalAmtInvoice_BU3(Data1).success(function (res) {
                    if (res != "0") {
                        if (res[0]["Amount"] != "") {
                            $('#TotalInvoiceAmount_BU3').val(parseFloat(res[0]["Amount"]).toFixed(2));
                        } else {
                            $('#TotalInvoiceAmount_BU3').val("0.00");
                        }
                        if (res[0]["Grss_Wt"] != "") {
                            $('#TotalInvoiceGrossWt_BU3').val(parseFloat(res[0]["Grss_Wt"]).toFixed(2));
                        } else {
                            $('#TotalInvoiceGrossWt_BU3').val("0.00");
                        }

                    } else {
                        $('#TotalInvoiceAmount_BU3').val("0.00");
                        $('#TotalInvoiceGrossWt_BU3').val("0.00");
                    }
                });
                var Data = JSON.stringify({
                    MasterType: "InvoiceList_BU3",
                    ID: "561",
                    UserCode: $("#UserCode").val(),
                    "Type": "Get",
                    UserRole : SessionValue,
                    ReportName: "InvoiceList_BU3",
                    WhereClause: WhereClause 
                });
                DIMSFactory.getReportData(Data).success(function (response) {
                    debugger
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "tbl_InvoiceList_BU3", UserSelectedColumnName);
                    $("#InvoiceListDiv_BU3").show();
                    if ($("#UserCode").val() != "50002018") {
                        $("#DivTotalInvoiceAmount_BU3").hide();
                    }

                    //$('#tbl_InvoiceList_BU3 tbody').on('click', 'tr', function () {
                    //    debugger
                    //    ShowLoader();
                    //    var ID = $(this).find('td:eq(0)').text();
                    //    var Inv_Type = $(this).find('td:eq(1)').text();
                    //    var Plant_Code = $(this).find('td:eq(8)').text();
                    //    var Inv_Date = $(this).find('td:eq(2)').text();
                    //    if (ID != "") {

                    //        var encryptedID = CryptoJS.AES.encrypt(ID, "Secret Passphrase");
                    //        var decrypted12 = CryptoJS.AES.decrypt(encryptedID, "Secret Passphrase");
                    //        var decryptedasd = decrypted12.toString(CryptoJS.enc.Utf8);

                    //        var scope = angular.element($("#InvoiceListDiv_BU3")).scope();
                    //        scope.$apply(function () {
                    //            var tempdate = Inv_Date.split('/');
                    //            Inv_Date = tempdate[2] + '-' + tempdate[1] + '-' + tempdate[0];

                    //            if (Date.parse(Inv_Date) >= Date.parse('2017-07-01')) {
                    //                if (Inv_Type == "ZINV") {
                    //                    HideLoader();
                    //                    if (parseInt(Plant_Code) >= 3000) {
                    //                        scope.go("InvoiceDetail_ZINV_Plant_GST/" + ID);
                    //                    } else {
                    //                        scope.go("InvoiceDetail_ZINV_Plant_GST/" + ID);
                    //                    }
                    //                }
                    //                else if (Inv_Type == "ZFOC") {
                    //                    HideLoader();
                    //                    if (parseInt(Plant_Code) >= 3000) {
                    //                        scope.go("InvoiceDetail_ZFOC_Plant_GST/" + ID);
                    //                    } else {
                    //                        scope.go("InvoiceDetail_ZFOC_Plant_GST/" + ID);
                    //                    }
                    //                }
                    //            }
                    //            else {
                    //                if (Inv_Type == "ZINV") {
                    //                    HideLoader();
                    //                    if (parseInt(Plant_Code) >= 3000) {
                    //                        scope.go("InvoiceDetail_ZINV_Depo/" + ID);
                    //                    } else {
                    //                        scope.go("InvoiceDetail_ZINV_Plant/" + ID);
                    //                    }
                    //                }
                    //                //If the Invoice type is ‘ZFOC’ and Plant Code is greater than or equal to 3000 then from the invoice list page, 
                    //                //it will redirect to ‘ZFOC_Depo Invoice view’
                    //                //else it will redirect to ‘ZFOC_Plant Invoice view’
                    //                else if (Inv_Type == "ZFOC") {
                    //                    HideLoader();
                    //                    if (parseInt(Plant_Code) >= 3000) {
                    //                        scope.go("InvoiceDetail_ZFOC_Depo/" + ID);
                    //                    } else {
                    //                        scope.go("InvoiceDetail_ZFOC_Plant/" + ID);
                    //                    }
                    //                }
                    //            }
                    //        })
                    //    }

                    //    if ($(this).hasClass('selected')) {
                    //        $(this).removeClass('selected');
                    //    }
                    //    else {
                    //        $('tr.selected').removeClass('selected');
                    //        $(this).addClass('selected');
                    //    }
                    //});
                });
                
            
            } catch (Exception) { }

        }

        //This method is used for download the Invoice List page.
        $scope.DownloadFileBU3 = function (filetype) {
            debugger
            var isValidCustCode = isValidCode_Cust($("#customerCode").val(), CustomerArray);
            var SearchValue = $('input[type=search]').val();
            var FileName = "InvoiceList_BU3";
            var DateRange = DateSplitter('fromDate', 'toDate');
            var UserCode = $("#UserCode").val();

            var WhereClause = "";

            if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "" && $("#invoiceNo").val() != "") {
                console.log("isValidCustCode : " + isValidCustCode);
                WhereClause = "where (INVOICE_DATE between " + DateRange + ")";

                console.log("isValidCustCode : " + isValidCustCode);
                if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {

                }
                else {
                    WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ") and INVOICE_NO IN (" + $("#invoiceNo").val() + ") ";
                }
            }
            else if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "") {
                console.log("isValidCustCode : " + isValidCustCode);
                WhereClause = "where (INVOICE_DATE between " + DateRange + ")";

                console.log("isValidCustCode : " + isValidCustCode);
                if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {

                }
                else {
                    WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ") ";
                }
            } else if ($("#invoiceNo").val() != "") {
                WhereClause += "WHERE INVOICE_NO IN (" + $("#invoiceNo").val() + ") ";
            }            

            var Table_DebitCount = $('#tbl_InvoiceList_BU3').DataTable().data().count();
            if (Table_DebitCount == 0) {
                alert("There is no data");
            } else {
                if ((isValidCustCode == false) && ($("#customerCode").val() != "")) { alert("please select proper customer code"); } else {
                    var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "INV_BU3" + "\",\"Action\":\"" + "Is_Export" + "\"}";
                    $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                        if (res == "True") {
                            CommonFunctionForExcelExport_SearchFilter("561", UserCode, SearchValue, FileName, FileName, WhereClause, filetype);
                        }
                        else {
                            alert("You are not allowed to export Invoice List");
                        }
                    });
                }
            }
        }
    } catch (Exception) { }    
});

function isValidCode_Cust(code, ArrayValue) {
    return ($.inArray(code, ArrayValue) > -1);
}

function addAllColumnHeadersForMasters(myList, TableName) {
    var columnSet = [];
    var html = "";
    html += '<thead><tr style="background-color: #d2401a; color: white; font-size: 13px;">';
    var headerTr$ = $('<tr/>');
    for (var i = 0 ; i < myList.length ; i++) {

        var rowHash = myList[i];
        for (var key in rowHash) {

            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                // headerTr$.append($('<th/>').html(key));
                html += '<th>' + key + '</th>';
            }
        }
    }
    html += "<th>Edit</th>";
    html += "<th>Delete</th>";
    html += "</tr></thead>";
    $("#" + TableName).append(html);
    return columnSet;
}

function addAllColumnHeadersForAsgnCmpl(myList, TableName, USER_PRODUCT_TYPE_CODE) {
    var columnSet = [];
    var html = "";
    html += '<thead><tr style="background-color: #d2401a; color: white; font-size: 13px;">';
    var headerTr$ = $('<tr/>');
    //svprasadk 25-06-2020 SBU 1 requirement to bulk assign complaints start
    if (myList.length > 0) {
        html += '<th><input type="checkbox" id="AssignComplaintCheckAll" onchange="AssignComplaintCheckAllChange()" /></th>';
    } else {
        html += '<th></th>';
    }
    //svprasadk 26-06-2020 SBU 1 requirement to bulk assign complaints end
    //html += "<th></th>";
    //debugger;
    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                // headerTr$.append($('<th/>').html(key));
                html += '<th>' + key + '</th>';
            }
        }
    }

    //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints start
    if (USER_PRODUCT_TYPE_CODE != "SBU1") {
        html += "<th>User Role</th>";
        html += "<th>User Name</th>";
    }
    //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints end

    html += "</tr></thead>";
    $("#" + TableName).append(html);


    return columnSet;
}

function addAllColumnHeadersForFormMaster(myList, TableName) {
    var columnSet = [];
    var html = "";
    html += '<thead><tr style="background-color: #d2401a; color: white; font-size: 13px;">';
    var headerTr$ = $('<tr/>');
    html += "<th></th>";
    for (var i = 0 ; i < myList.length ; i++) {

        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                // headerTr$.append($('<th/>').html(key));
                html += '<th>' + key + '</th>';
            }
        }
    }
    html += "<th>View</th>";
    html += "<th>Create</th>";
    html += "<th>Update</th>";
    html += "<th>Approve</th>";
    html += "<th>Export To Excel</th>";
    html += "</tr></thead>";
    $("#" + TableName).append(html);
    return columnSet;
}

function getMasterLookUpData(response, PageHeading) {
    var data = JSON.parse(response.tabledata);
    var element = angular.element('#LookUpModal');
    element.modal('show');
    $("#PopHeading").text(PageHeading);
    if (data == "") {
        $("#MasterStatus").text("No Records found");
        //$("#PopUpTable").dataTable().fnDestroy();
        $('#PopUpTable').empty();
    } else {
        $("#MasterStatus").text("");

        $("#PopUpTable").dataTable().fnDestroy();
        $('#PopUpTable').empty();

        var columns = addAllColumnHeaders(data, "PopUpTable");
        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr onclick="GetTableRowData(this)" style="cursor:pointer;" />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#PopUpTable").append(row$);
        }

        $("#PopUpTable tr td:nth-child(1)").hide();
        $("#PopUpTable tr th:nth-child(1)").hide();

        var table = $("#PopUpTable").dataTable({
            "bDestroy": true,
            'scroll': true
        });

        $('#PopUpTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }
}

function GetMasterResponse(Master_Name) {
    var scope = angular.element(document.getElementById("MainWrap")).scope();
    angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").getMasterClickData(Master_Name).success(function (response) {
        alert(response);
        var data = JSON.parse(response.tabledata);
        $("#MasterTable").dataTable().fnDestroy();
        $('#MasterTable').empty();
        var columns = addAllColumnHeadersForMasters(data, "MasterTable");
        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }

            //row$.append($("<td data-ng-click='EditMasterData_Model();'> <a style='background-color: #9760b3; border-color: #9760b3; padding: 6px 6px;' class='btn btn-info'><i class='fa fa-fw fa-pencil-square-o'></i>Edit</a> </td>"));

            row$.append($('<td onclick="EditMasterData(this)" />').html('<a style="background-color: #9760b3; border-color: #9760b3; padding: 6px 6px;" class="btn btn-info"><i class="fa fa-fw fa-pencil-square-o"></i>Edit</a>'));
            row$.append($('<td/>').html('<a class="btn btn-danger" style="background-color: #c71c22; border-color: #c71c22; padding: 6px 6px;" onclick="DeleteMasterData(' + Master_Name + ')" title="delete"><i class="fa fa-fw fa-trash-o"></i>Delete</a>'));
            // row$.append($('<td onclick="DeleteMasterData(this)"/>').html('<a class="btn btn-danger" style="background-color: #c71c22; border-color: #c71c22; padding: 6px 6px;"  title="delete"><i class="fa fa-fw fa-trash-o"></i>Delete</a>'));

            $("#MasterTable").append(row$);

            //var html = $compile(TableRow)($scope);

            //var el = angular.element($("#NoticeConfigurationTable tbody"));
            //el.append(html);
            //$compile(html)($scope)
        }

        $("#MasterTable tr td:nth-child(1)").hide();
        $("#MasterTable tr th:nth-child(1)").hide();

        ManageMasterVisibility(Master_Name);

        var table = $("#MasterTable").dataTable({
            "bDestroy": true,
            'scroll': true
        });

    });
}

function GetTableRowData(obj, DIMSFactory) {
    MasterName = $(obj).children().eq(1).html().trim();
    $("#btnCreateMaster").css("visibility", "visible");
    $("#btnCreateMaster").text("Create " + MasterName);

    var scope = angular.element(document.getElementById("MainWrap")).scope();
    angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").getMasterClickData($(obj).children().eq(1).html()).success(function (response) {
        var data = JSON.parse(response.tabledata);
        $("#MasterTable").dataTable().fnDestroy();
        $('#MasterTable').empty();
        var columns = addAllColumnHeadersForMasters(data, "MasterTable");
        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }

            //row$.append($("<td data-ng-click='EditMasterData_Model();'> <a style='background-color: #9760b3; border-color: #9760b3; padding: 6px 6px;' class='btn btn-info'><i class='fa fa-fw fa-pencil-square-o'></i>Edit</a> </td>"));

            row$.append($('<td onclick="EditMasterData(this)" />').html('<a style="background-color: #9760b3; border-color: #9760b3; padding: 6px 6px;" class="btn btn-info"><i class="fa fa-fw fa-pencil-square-o"></i>Edit</a>'));
            //row$.append($('<td/>').html('<a class="btn btn-danger" style="background-color: #c71c22; border-color: #c71c22; padding: 6px 6px;" onclick="DeleteMasterData(' + MasterName + ')" title="delete"><i class="fa fa-fw fa-trash-o"></i>Delete</a>'));
            row$.append($('<td  id="dialog-confirm" class="confirm" onclick="DeleteMasterData(this)"/>').html('<a class="btn btn-danger" style="background-color: #c71c22; border-color: #c71c22; padding: 6px 6px;" )" title="delete"><i class="fa fa-fw fa-trash-o"></i>Delete</a>'));

            $("#MasterTable").append(row$);

            //var html = $compile(TableRow)($scope);

            //var el = angular.element($("#NoticeConfigurationTable tbody"));
            //el.append(html);
            //$compile(html)($scope)
        }

        $("#MasterTable tr td:nth-child(1)").hide();
        $("#MasterTable tr th:nth-child(1)").hide();

        ManageMasterVisibility(MasterName);

        var table = $("#MasterTable").dataTable({
            "bDestroy": true,
            'scroll': true
        });

    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function DeleteMasterData(obj, DIMSFactory) {
    var ID = $(obj).parent().children().eq(0).html();
    var txt;
    var r = confirm("Are You Sure To delete ID:" + $(obj).parent().children().eq(0).html());
    if (r == true) {
        var Master_Data = "{\"MasterType\":\"" + MasterName + "\",\"ID\":\"" + ID + "\"}";

        angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").DeleteMasterData(Master_Data).success(function (response) {
            GetMasterResponse(MasterName);
        });
    } else {

    }
}

function DateValidation(FromDate, ToDate) {
    if ($("#" + FromDate).val() != "") {
        $("#" + ToDate).datepicker('setStartDate', $("#" + FromDate).val());
        //$("#" + ToDate).datepicker('option', 'minDate', $("#" + MyDate).val());
        //$("#"+ToDate).val("");
    }
}

function DateSplitter(FromDate, ToDate) {
    var From_Dt = $("#" + FromDate).val().split('/'); var To_Dt = $("#" + ToDate).val().split('/');
    var Dates = "'" + From_Dt[2] + '-' + From_Dt[1] + '-' + From_Dt[0] + "'" + ' and ' + "'" + To_Dt[2] + '-' + To_Dt[1] + '-' + To_Dt[0] + "'";
    return Dates;
}



var th = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];

var dg = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];

var tn = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];

var tw = ['TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINTY'];

// function to convert number to words
function toWordsINVOICE(value) {

    //s = s.toString();
    //s = s.replace(/[\, ]/g, '');
    //// alert(s);
    //if (s != parseFloat(s)) return 'not a number';
    //var x = s.indexOf('.');
    //// alert(x)
    //if (x == -1) x = s.length;
    //if (x > 15) return 'too big';
    //var n = s.split('');
    ////alert(n)
    //var str = '';
    //var sk = 0;
    //for (var i = 0; i < x; i++) {
    //    if ((x - i) % 3 == 2) {
    //        if (n[i] == '1') {
    //            str += tn[Number(n[i + 1])] + ' ';
    //            i++;
    //            sk = 1;
    //        } else if (n[i] != 0) {
    //            str += tw[n[i] - 2] + ' ';
    //            sk = 1;
    //        }
    //    } else if (n[i] != 0) {
    //        str += dg[n[i]] + ' ';
    //        if ((x - i) % 3 == 0) str += 'HUNDRED ';
    //        sk = 1;
    //    }
    //    if ((x - i) % 3 == 1) {
    //        if (sk) str += th[(x - i - 1) / 3] + ' ';
    //        sk = 0;
    //    }
    //}
    //if (x != s.length) {
    //    var y = s.length;
    //    str += 'AND PAISE ';
    //    for (var i = x + 1; i < y; i++) {
    //        str += dg[n[i]] + ' ';
    //    }
    //    str += 'ONLY ';
    //}
    //return str.replace(/\s+/g, ' ');


    var fraction = Math.round(frac(value) * 100);
    var f_text = "";

    if (fraction > 0) {
        f_text = " AND PAISE " + convert_number(fraction);
    } else if (fraction == 0) {
        f_text = " AND PAISE ZERO";
    }

    if (convert_number(value) == "ZERO") {
        return "NIL";
    } else {
        return "RUPEES " + convert_number(value) + f_text + " ONLY";
    }
}

function frac(f) {
    return f % 1;
}

function convert_number(number) {
    if ((number < 0) || (number > 999999999)) {
        return "NUMBER OUT OF RANGE!";
    }
    var Gn = Math.floor(number / 10000000);  /* Crore */
    number -= Gn * 10000000;
    var kn = Math.floor(number / 100000);     /* lakhs */
    number -= kn * 100000;
    var Hn = Math.floor(number / 1000);      /* thousand */
    number -= Hn * 1000;
    var Dn = Math.floor(number / 100);       /* Tens (deca) */
    number = number % 100;               /* Ones */
    var tn = Math.floor(number / 10);
    var one = Math.floor(number % 10);
    var res = "";

    if (Gn > 0) {
        res += (convert_number(Gn) + " CRORE");
    }
    if (kn > 0) {
        res += (((res == "") ? "" : " ") +
        convert_number(kn) + " LAKH");
    }
    if (Hn > 0) {
        res += (((res == "") ? "" : " ") +
            convert_number(Hn) + " THOUSAND");
    }

    if (Dn) {
        res += (((res == "") ? "" : " ") +
            convert_number(Dn) + " HUNDRED");
    }


    var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN");
    var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY");

    if (tn > 0 || one > 0) {
        if (!(res == "")) {
            res += " ";
        }
        if (tn < 2) {
            res += ones[tn * 10 + one];
        }
        else {

            res += tens[tn];
            if (one > 0) {
                res += ("-" + ones[one]);
            }
        }
    }

    if (res == "") {
        res = "ZERO";
    }
    return res;
}

function fnResetAllFilters(oTable) {
    debugger
    var oSettings = oTable.fnSettings();
    for (iCol = 0; iCol < oSettings.aoPreSearchCols.length; iCol++) {
        oSettings.aoPreSearchCols[iCol].sSearch = '';
    }
    oSettings.oPreviousSearch.sSearch = '';
    oTable.fnDraw();
}

function CommonFunctionForExcelExport_SearchFilter(ID, UserCode, SearchboxValue, ExcelFileName, BackendReportName, WhereClause, FileType) {
    if (ID != "" && UserCode != "" && ExcelFileName != "" && BackendReportName != "" && WhereClause != "") {
        ShowLoader();
        var Data = JSON.stringify({
            ID: ID,
            UserCode: UserCode,
            ReportName: BackendReportName,
            WhereClause: WhereClause,
            "SearchValue": SearchboxValue
        });

        var UserRole = SessionValue;

        $.ajax({
            url: '../../Home/SetInputData',
            type: "POST",
            datatype: "JSON",
            data: { InputData: Data, ReportType: FileType, FileName: ExcelFileName },
            async: false,
            cache: false,
            success: function (response) {
                if ((UserRole == "STOCKIST") || (UserRole == "C&F")) {
                    if (BackendReportName == "PendingCForms") {
                        $.ajax({
                            method: 'POST',
                            contentType: "application/json; charset=utf-8",
                            url: '../../HOME/GenerateReport_SAP_CFORM_STOCKIST',
                        }).then(function successCallback(response) {
                            if (response != "") {
                                ShowLoader();
                                $('#HidenData').html(response);
                                GetPDFFile_CFORM();
                            } else {
                                HideLoader();
                                alert("No data");
                            }
                            //if (result == "MailSent") {
                            //    alert("Mail Sent Successfully");
                            //} else {
                            //    alert("Mail Not Sent")
                            //}
                        },
                       function errorCallback(response) {
                           $.ajax({
                               url: "../../HOME/GenerateReport_SAP_STOCKIST_MailStatus", success: function (result) {
                                   if (result == "MailSent") {
                                       alert("Mail Sent Successfully");
                                   } else {
                                       alert("Mail Not Sent")
                                   }
                               }
                           });
                       });
                    } else {
                        $.ajax({
                            method: 'POST',
                            contentType: "application/json; charset=utf-8",
                            url: '../../HOME/GenerateReport_SAP_STOCKIST',
                        }).then(function successCallback(response) {
                            if (result == "MailSent") {
                                alert("Mail Sent Successfully");
                            } else {
                                alert("Mail Not Sent")
                            }
                        },
                        function errorCallback(response) {
                            $.ajax({
                                url: "../../HOME/GenerateReport_SAP_STOCKIST_MailStatus", success: function (result) {
                                    if (result == "MailSent") {
                                        alert("Mail Sent Successfully");
                                    } else {
                                        alert("Mail Not Sent")
                                    }
                                }
                            });
                        });
                    }
                } else {
                    ShowLoader();
                    window.location.href = '../../Home/GenerateReport_SAP';
                    HideLoader();
                }

            },
            error: function () {
                alert("Technical error has been occured.Please try again later");
            }
        });
    } else {
        return;
    }
}