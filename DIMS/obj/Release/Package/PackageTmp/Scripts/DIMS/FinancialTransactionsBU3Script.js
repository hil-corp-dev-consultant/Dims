
var MasterScope;
var MasterName;
var txtUserRoleCnt;
var txtUserNameCnt;
var DocSeriesName;
var DocDate_CreditNote = "";

DIMS.factory('DIMSSAPFactory', function ($http) {
    return {
        GetOrgLevelList: function () { //Get Org Level for Employee Role Config
            return $http.get('../../SAP/GetOrgLevelList');
        },
        GetEmployeeList: function () { //For Employee Role Config
            return $http.get('../../SAP/GetEmployeeList');
        },
        GetCustomerList: function () { //For Customer Config
            return $http.get('../../SAP/GetCustomerList');
        },
        GetFSOList: function () { //For FSO Config
            return $http.get('../../SAP/GetFSOList');
        },
        getMasterData: function (masterType) {
            return $http({ url: '../../SAP/GetEmployeewreList', method: 'POST', data: { MasterType: masterType } });
        },
        GetZoneDropdownEmpRole: function () {//for GetZoneDropdownEmpRole
            return $http.get('../../SAP/GetZoneDropdownEmpRole');
        },
        GetStateDropdownEmpRole: function () {//for GetStateDropdownEmpRole
            return $http.get('../../SAP/GetStateDropdownEmpRole');
        },
        GetRoleDropdownEmpRole: function () {//for GetStateDropdownEmpRole
            return $http.get('../../SAP/GetRoleDropdownEmpRole');
        },
        SaveEmpRoleConfigData: function (TotalEmpRoleConfigData) {
            return $http({ url: '../../SAP/SaveEmpRoleConfigData', method: 'POST', data: { RoleData: TotalEmpRoleConfigData } });
        },
        SaveEmpCustomerConfigData: function (TotalEmpCustomerConfigData) {
            return $http({ url: '../../SAP/SaveEmpCustomerConfigData', method: 'POST', data: { CustomerData: TotalEmpCustomerConfigData } });
        },
        SendEmailInvoice: function () {
            return $http.get('../../SAP/Invoice_List_View_Data');
        },
        GetCreditNoteDetails: function (Data) {
            return $http({ url: '../../SAP/GetCreditNoteDetails', method: 'POST', data: { Data: Data } });
        },
        GetCustomerDetails: function (EditId) {
            return $http({ url: '../../SAP/GetCustomerDetails', method: 'POST', data: { Data: EditId } });
        },
        GetYearNamesFor: function () {
            return $http.get('../../SAP/GetYearNamesFor');
        },
        GetTDS_Certificate: function (Data) {
            return $http({ url: '../../SAP/TDS_Certificate', method: 'POST', data: { Data: Data } });
        },
        GetTotalSumCreditDebit: function (WhereClause) {
            ShowLoader();
            return $http({ url: '../../SAP/TotalCreditDebit', method: 'POST', data: { Data: WhereClause } });
        },
        GetTotalSumOutstanding: function (WhereClause) {
            return $http({ url: '../../SAP/TotalAmtOutStanding', method: 'POST', data: { Data: WhereClause } });
        },
        GetTotalAmtpaymentStockist: function (WhereClause) {
            return $http({ url: '../../SAP/TotalAmtpaymentStockist', method: 'POST', data: { Data: WhereClause } });
        },
        GetTotalAmtInvoiceBU3: function (WhereClause) {
            return $http({ url: '../../FinancialTransactionsBU3/TotalAmtInvoiceBU3', method: 'POST', data: { Data: WhereClause } });
        },
        GetTotalAmtInvoice: function (WhereClause) {
            return $http({ url: '../../SAP/TotalAmtInvoice', method: 'POST', data: { Data: WhereClause } });
        }

    }
});
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

//svprasadk 25-06-2020 SBU 1 requirement to bulk assign complaints start
//Check All function in the Assign Complaint table
function AssignComplaintCheckAllChange() {
    //alert($("#AssignComplaintCheckAll").is(":checked"))
    try {
        if ($("#AssignComplaintCheckAll").is(":checked")) {
            $(".roles").each(function () {
                this.checked = true;
            })
        } else {
            $(".roles").each(function () {
                this.checked = false;
            })
        }
    }
    catch (e) {
        alert("Error UsersCheckAllChange: " + e);
    }
}
//svprasadk 25-06-2020 SBU 1 requirement to bulk assign complaints end

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

function ManageMasterVisibility(Master_Name) {
    if (Master_Name == "Area Master") {
        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
    }
    else if (Master_Name == "Location") {
        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
    }
    else if (Master_Name == "Currency") {
        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();
    }
    else if (Master_Name == "Group Company Details") {
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();
        $("#MasterTable tr td:nth-child(6)").hide();
        $("#MasterTable tr th:nth-child(6)").hide();
        $("#MasterTable tr td:nth-child(7)").hide();
        $("#MasterTable tr th:nth-child(7)").hide();
        $("#MasterTable tr td:nth-child(8)").hide();
        $("#MasterTable tr th:nth-child(8)").hide();
        $("#MasterTable tr td:nth-child(9)").hide();
        $("#MasterTable tr th:nth-child(9)").hide();
        $("#MasterTable tr td:nth-child(10)").hide();
        $("#MasterTable tr th:nth-child(10)").hide();
        $("#MasterTable tr td:nth-child(11)").hide();
        $("#MasterTable tr th:nth-child(11)").hide();
        $("#MasterTable tr td:nth-child(12)").hide();
        $("#MasterTable tr th:nth-child(12)").hide();
        $("#MasterTable tr td:nth-child(13)").hide();
        $("#MasterTable tr th:nth-child(13)").hide();
        $("#MasterTable tr td:nth-child(14)").hide();
        $("#MasterTable tr th:nth-child(14)").hide();
        $("#MasterTable tr td:nth-child(15)").hide();
        $("#MasterTable tr th:nth-child(15)").hide();
        $("#MasterTable tr td:nth-child(16)").hide();
        $("#MasterTable tr th:nth-child(16)").hide();
        $("#MasterTable tr td:nth-child(17)").hide();
        $("#MasterTable tr th:nth-child(17)").hide();
    }
    else if (Master_Name == "Company Details") {
        $("#MasterTable tr td:nth-child(6)").hide();
        $("#MasterTable tr th:nth-child(6)").hide();
        $("#MasterTable tr td:nth-child(7)").hide();
        $("#MasterTable tr th:nth-child(7)").hide();
        $("#MasterTable tr td:nth-child(8)").hide();
        $("#MasterTable tr th:nth-child(8)").hide();
        $("#MasterTable tr td:nth-child(9)").hide();
        $("#MasterTable tr th:nth-child(9)").hide();
        $("#MasterTable tr td:nth-child(10)").hide();
        $("#MasterTable tr th:nth-child(10)").hide();
        $("#MasterTable tr td:nth-child(11)").hide();
        $("#MasterTable tr th:nth-child(11)").hide();
        $("#MasterTable tr td:nth-child(12)").hide();
        $("#MasterTable tr th:nth-child(12)").hide();
        $("#MasterTable tr td:nth-child(13)").hide();
        $("#MasterTable tr th:nth-child(13)").hide();
        $("#MasterTable tr td:nth-child(14)").hide();
        $("#MasterTable tr th:nth-child(14)").hide();
        $("#MasterTable tr td:nth-child(15)").hide();
        $("#MasterTable tr th:nth-child(15)").hide();
        $("#MasterTable tr td:nth-child(16)").hide();
        $("#MasterTable tr th:nth-child(16)").hide();
        $("#MasterTable tr td:nth-child(17)").hide();
        $("#MasterTable tr th:nth-child(17)").hide();
        $("#MasterTable tr td:nth-child(18)").hide();
        $("#MasterTable tr th:nth-child(18)").hide();
        $("#MasterTable tr td:nth-child(19)").hide();
        $("#MasterTable tr th:nth-child(19)").hide();
    }
    else if (Master_Name == "Zone Details") {
        $("#MasterTable tr td:nth-child(6)").hide();
        $("#MasterTable tr th:nth-child(6)").hide();
    }
    else if (Master_Name == "Branch") {
        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
    }
    else if (Master_Name == "Department") {
        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();
    }
    else if (Master_Name == "Nature Of Complaint") {
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();
        $("#MasterTable tr td:nth-child(7)").hide();
        $("#MasterTable tr th:nth-child(7)").hide();
    }
    else if (MasterName == "Problem Type") {

        //$("#MasterTable tr td:nth-child(4)").hide();
        //$("#MasterTable tr th:nth-child(4)").hide();
        //$("#MasterTable tr td:nth-child(7)").hide();
        //$("#MasterTable tr th:nth-child(7)").hide();

    }
    else if (MasterName == "Problem Impact") {

        //$("#MasterTable tr td:nth-child(4)").hide();
        //$("#MasterTable tr th:nth-child(4)").hide();
        //$("#MasterTable tr td:nth-child(7)").hide();
        //$("#MasterTable tr th:nth-child(7)").hide();

    }
    else if (MasterName == "Response Action") {


        //$("#MasterTable tr td:nth-child(7)").hide();
        //$("#MasterTable tr th:nth-child(7)").hide();

    }
    else if (MasterName == "Control Measure") {

        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(7)").hide();
        $("#MasterTable tr th:nth-child(7)").hide();
    } else if (MasterName == "Corrective Actions") {

        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(7)").hide();
        $("#MasterTable tr th:nth-child(7)").hide();
    }
    else if (MasterName == "Preventive Actions") {

        //$("#MasterTable tr td:nth-child(4)").hide();
        //$("#MasterTable tr th:nth-child(4)").hide();
        //$("#MasterTable tr td:nth-child(7)").hide();
        //$("#MasterTable tr th:nth-child(7)").hide();
    }
    else if (MasterName == "Defect Type") {

        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(8)").hide();
        $("#MasterTable tr th:nth-child(8)").hide();
        $("#MasterTable tr td:nth-child(9)").hide();
        $("#MasterTable tr th:nth-child(9)").hide();
        $("#MasterTable tr td:nth-child(6)").hide();
        $("#MasterTable tr th:nth-child(6)").hide();
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();

        //$("#MasterTable tr td:nth-child(13)").hide();
        //$("#MasterTable tr th:nth-child(13)").hide();
    }
    else if (MasterName == "Survey Criteria") {

        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(8)").hide();
        $("#MasterTable tr th:nth-child(8)").hide();
        $("#MasterTable tr td:nth-child(9)").hide();
        $("#MasterTable tr th:nth-child(9)").hide();
        $("#MasterTable tr td:nth-child(6)").hide();
        $("#MasterTable tr th:nth-child(6)").hide();
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();
        $("#MasterTable tr td:nth-child(16)").hide();
        $("#MasterTable tr th:nth-child(16)").hide();
        $("#MasterTable tr td:nth-child(11)").hide();
        $("#MasterTable tr th:nth-child(11)").hide();
        $("#MasterTable tr td:nth-child(12)").hide();
        $("#MasterTable tr th:nth-child(12)").hide();
    }
    else if (MasterName == "Defect Type") {

        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(8)").hide();
        $("#MasterTable tr th:nth-child(8)").hide();
        $("#MasterTable tr td:nth-child(9)").hide();
        $("#MasterTable tr th:nth-child(9)").hide();
        $("#MasterTable tr td:nth-child(6)").hide();
        $("#MasterTable tr th:nth-child(6)").hide();
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();
        $("#MasterTable tr td:nth-child(13)").hide();
        $("#MasterTable tr th:nth-child(13)").hide();
    }
    else if (MasterName == "Observations Master") {
        $("#MasterTable tr td:nth-child(4)").hide();
        $("#MasterTable tr th:nth-child(4)").hide();
        $("#MasterTable tr td:nth-child(8)").hide();
        $("#MasterTable tr th:nth-child(8)").hide();
        $("#MasterTable tr td:nth-child(9)").hide();
        $("#MasterTable tr th:nth-child(9)").hide();
        $("#MasterTable tr td:nth-child(6)").hide();
        $("#MasterTable tr th:nth-child(6)").hide();
        $("#MasterTable tr td:nth-child(5)").hide();
        $("#MasterTable tr th:nth-child(5)").hide();
        //$("#MasterTable tr td:nth-child(13)").hide();
        //$("#MasterTable tr th:nth-child(13)").hide();
    }
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

function EditMasterData(obj, DIMSFactory) {

    if (MasterName == "Country") {
        var element = angular.element('#CountryModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Country_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCountryCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCountryName_Model = $(obj).parent().children().eq(2).html();
        });
        $("#Country_Save").text("Update");
    } else if (MasterName == "Area Master") {
        var element = angular.element('#AreaModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Area_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtAreaCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtAreaName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtAreaDesc_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtAreaCountryName_Model = $(obj).parent().children().eq(4).html();
        });
        $("#Area_Save").text("Update");
    }
    else if (MasterName == "State") {
        var element = angular.element('#StateModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.State_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtStateCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtStateName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtStateArea_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtStateCountry_Model = $(obj).parent().children().eq(4).html();
        });
        $("#State_Save").text("Update");
    } else if (MasterName == "City") {
        var element = angular.element('#CityModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.City_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCityCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCityName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCityState_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCityArea_Model = $(obj).parent().children().eq(4).html();
        });
        $("#City_Save").text("Update");
    } else if (MasterName == "Location") {
        var element = angular.element('#LocationModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Location_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtLocationCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtLocationName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtLocationDesc_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtLocationCity_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtLocationState_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtLocationArea_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtLocationCountry_Model = $(obj).parent().children().eq(7).html();
        });
        $("#Location_Save").text("Update");
    }
    else if (MasterName == "Depo Master") {
        var element = angular.element('#DepoModal');
        element.modal('show');
        MasterScope.$apply(function () {
            // Query = "SELECT ID, DEPO_CODE,DEPO_NAME,PLANT_CODE, PLANT_NAME,AREA_CODE,AREA_NAME,CITY_CODE,CITY_NAME,STATE_CODE,STATE_NAME,COUNTRY_CODE,COUNTRY_NAME,CREATED_BY,CREATED_DATE,ACTIVE FROM cms_depo_master";

            MasterScope.Depo_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtDepoCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtDepoName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.DepoPlant_Code = $(obj).parent().children().eq(3).html();
            MasterScope.txtDepoPlantName_Model = $(obj).parent().children().eq(4).html();
            MasterScope.DepoArea_Code = $(obj).parent().children().eq(5).html();
            MasterScope.txtDepoAreaName_Model = $(obj).parent().children().eq(6).html();
            MasterScope.DepoCity_Code = $(obj).parent().children().eq(7).html();
            MasterScope.txtDepoCityName_Model = $(obj).parent().children().eq(8).html();
            MasterScope.DepoState_Code = $(obj).parent().children().eq(9).html();
            MasterScope.txtDepoStateName_Model = $(obj).parent().children().eq(10).html();
            MasterScope.DepoCountry_Code = $(obj).parent().children().eq(11).html();
            MasterScope.txtDepoCountryName_Model = $(obj).parent().children().eq(12).html();
            MasterScope.txtDepoDesc_Model = $(obj).parent().children().eq(13).html();
            MasterScope.txtDepoAddress_Model = $(obj).parent().children().eq(14).html();
            MasterScope.txtDepoActive_Model = $(obj).parent().children().eq(17).html();
        });
        $("#Depo_Save").text("Update");
    }
    else if (MasterName == "Currency") {
        var element = angular.element('#CurrencyModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Currency_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCurrencyCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCurrencyDescription_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtBaseCurrency_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCurrencyCountryCode_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtCreatedBy_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtCreatedDate_Model = $(obj).parent().children().eq(6).html();
        });
        $("#Currency_Save").text("Update");
    }
    else if (MasterName == "Group Company Details") {
        var element = angular.element('#GroupCompModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.GroupComp_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtGroupCompCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtGroupCompName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtGroupAddress_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtGroupCompRoom_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtGroupCompBlock_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtGroupCompStreet_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtGroupCompCity_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtGroupCompState_Model = $(obj).parent().children().eq(8).html();
            MasterScope.txtGroupCompCountry_Model = $(obj).parent().children().eq(9).html();
            MasterScope.txtGroupCompZip_Model = $(obj).parent().children().eq(10).html();
            MasterScope.txtGroupCompMail_Model = $(obj).parent().children().eq(11).html();
            MasterScope.txtGroupCompWebsite_Model = $(obj).parent().children().eq(12).html();
            MasterScope.txtGroupCompPhone1_Model = $(obj).parent().children().eq(13).html();
            MasterScope.txtGroupCompPhone2_Model = $(obj).parent().children().eq(14).html();
            MasterScope.txtGroupCompMobile_Model = $(obj).parent().children().eq(15).html();
            MasterScope.txtGroupCompFax_Model = $(obj).parent().children().eq(16).html();
        });
        $("#GroupComp_Save").text("Update");
    }
    else if (MasterName == "Company Details") {
        var element = angular.element('#CompModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Comp_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCompCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCompName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCompGroupCompCode_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCompGroupCompName_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtCompAddress_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtCompRoom_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtCompBlock_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtCompStreet_Model = $(obj).parent().children().eq(8).html();
            MasterScope.txtCompCity_Model = $(obj).parent().children().eq(9).html();
            MasterScope.txtCompState_Model = $(obj).parent().children().eq(10).html();
            MasterScope.txtCompCountry_Model = $(obj).parent().children().eq(11).html();
            MasterScope.txtCompZip_Model = $(obj).parent().children().eq(12).html();
            MasterScope.txtCompMail_Model = $(obj).parent().children().eq(13).html();
            MasterScope.txtCompWebsite_Model = $(obj).parent().children().eq(14).html();
            MasterScope.txtCompPhone1_Model = $(obj).parent().children().eq(15).html();
            MasterScope.txtCompPhone2_Model = $(obj).parent().children().eq(16).html();
            MasterScope.txtCompMobile_Model = $(obj).parent().children().eq(17).html();
            MasterScope.txtCompFax_Model = $(obj).parent().children().eq(18).html();
            MasterScope.GroupComp_id_Model = $(obj).parent().children().eq(19).html();
        });

        $("#Comp_Save").text("Update");
    }
    else if (MasterName == "Zone Details") {
        var element = angular.element('#ZoneModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Zone_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtZoneCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtZoneName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtZoneCompCode_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtZoneCompName_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtZoneCountry_Model = $(obj).parent().children().eq(5).html();
        });

        $("#Zone_Save").text("Update");
    }
    else if (MasterName == "Branch") {
        var element = angular.element('#BranchModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Branch_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtBranchCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtBranchName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtBranchCompName_Model = $(obj).parent().children().eq(3).html();
        });

        $("#Branch_Save").text("Update");
    }
    else if (MasterName == "Department") {
        var element = angular.element('#DeptModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Dept_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtDeptCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtDeptName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtDeptCompCode_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtDeptCompName_Model = $(obj).parent().children().eq(4).html();
        });

        $("#Dept_Save").text("Update");
    }
    else if (MasterName == "Complaint Mode") {
        var element = angular.element('#CmplModeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplMode_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCmplModeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCmplModeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCmplModeDesc_Model = $(obj).parent().children().eq(3).html();
        });
        $("#CmplMode_Save").text("Update");
    }
    else if (MasterName == "Complaint Type") {
        var element = angular.element('#CmplTypeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplType_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCmplTypeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCmplTypeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCmplTypeDesc_Model = $(obj).parent().children().eq(3).html();
        });
        $("#CmplType_Save").text("Update");
    }
    else if (MasterName == "Complaint Category") {
        var element = angular.element('#CmplCategoryModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplCategory_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCmplCategoryCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCmplCategoryName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCmplCategoryDesc_Model = $(obj).parent().children().eq(3).html();
        });
        $("#CmplCategory_Save").text("Update");
    }
    else if (MasterName == "Nature Of Complaint") {
        var element = angular.element('#CmplNatureModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplNature_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCmplNatureCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCmplNatureName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCmplNatureDesc_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCmplNatureCmplCategory_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtCmplNatureCmplType_Model = $(obj).parent().children().eq(5).html();
        });
        $("#CmplNature_Save").text("Update");
    }
    else if (MasterName == "Complaint Priority") {
        var element = angular.element('#CmplPriorityModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplPriority_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCmplPriorityCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCmplPriorityName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCmplPriorityDesc_Model = $(obj).parent().children().eq(3).html();
        });
        $("#CmplPriority_Save").text("Update");
    }
    else if (MasterName == "ComplaintAssign") {
        var element = angular.element('#CmplAssnModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplAssn_id_Model = $(obj).children().eq(0).html();
            MasterScope.txtCmplNo_Model = $(obj).children().eq(1).html();
            MasterScope.txtCmplDate_Model = $(obj).children().eq(2).html();
            MasterScope.txtAssToUserRole_Model = $(obj).children().eq(3).html();
            MasterScope.txtAssToUser_Model = $(obj).children().eq(5).html();
            MasterScope.txtAssBy_Model = $(obj).children().eq(6).html();
            MasterScope.txtAssOn_Model = $(obj).children().eq(7).html();
        });
        $("#CmplAssign_Save").text("Update");
    }
    else if (MasterName == "ComplaintAssignCreate") {
        var element = angular.element('#CmplAssnModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplAssn_id_Model = $(obj).children().eq(0).html();
            MasterScope.txtCmplNo_Model = $(obj).children().eq(1).html();
            MasterScope.txtCmplDate_Model = $(obj).children().eq(3).html();
            MasterScope.txtAssToUserRole_Model = $(obj).children().eq(5).html();
            MasterScope.txtAssToUser_Model = $(obj).children().eq(7).html();
            MasterScope.txtAssBy_Model = $(obj).children().eq(8).html();
            MasterScope.txtAssOn_Model = $(obj).children().eq(9).html();
        });
        $("#CmplAssign_Save").text("Update");
    }
    else if (MasterName == "GetFormData") {
        var element = angular.element('#CmplAssnModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CmplAssn_id_Model = $(obj).children().eq(0).html();
            MasterScope.txtCmplNo_Model = $(obj).children().eq(1).html();
            MasterScope.txtCmplDate_Model = $(obj).children().eq(3).html();
            MasterScope.txtAssToUserRole_Model = $(obj).children().eq(5).html();
            MasterScope.txtAssToUser_Model = $(obj).children().eq(7).html();
            MasterScope.txtAssBy_Model = $(obj).children().eq(8).html();
            MasterScope.txtAssOn_Model = $(obj).children().eq(9).html();
        });
        $("#CmplAssign_Save").text("Update");
    }
    else if (MasterName == "Product Type") {

        var element = angular.element('#ProductTypeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Productype_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtProductTypeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtProductTypeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtProductTypeDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtProductTypeCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtProductTypeCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtProductTypeActive_Model = $(obj).parent().children().eq(6).html();
        });

        //$("#Productype_id").val($(obj).parent().children().eq(0).html());
        //$("#txtProductTypeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtProductTypeName").val($(obj).parent().children().eq(2).html());
        //$("#txtProductTypeDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtProductTypeCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtProductTypeCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtProductTypeActive").val($(obj).parent().children().eq(6).html());

        $("#ProductType_Save").text("Update");
    }
    else if (MasterName == "Product Category") {

        var element = angular.element('#ProductCategoryModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.ProductCategory_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtProductCategory_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtProductCategoryName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtProductCategoryDescription_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtProductType_code_Model = $(obj).parent().children().eq(3).html();

            MasterScope.txtProductType_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtProductCategoryCreatedBy_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtProductCategoryCreatedDate_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtProductCategoryActive_Model = $(obj).parent().children().eq(8).html();
        });

        //$("#ProductCategory_id").val($(obj).parent().children().eq(0).html());
        //$("#txtProductCategory").val($(obj).parent().children().eq(1).html());
        //$("#txtProductCategoryName").val($(obj).parent().children().eq(2).html());
        //$("#txtProductType").val($(obj).parent().children().eq(4).html());
        //$("#txtProductCategoryDescription").val($(obj).parent().children().eq(5).html());
        //$("#txtProductCategoryCreatedBy").val($(obj).parent().children().eq(6).html());
        //$("#txtProductCategoryCreatedDate").val($(obj).parent().children().eq(7).html());
        //$("#txtProductCategoryActive").val($(obj).parent().children().eq(8).html());

        $("#ProductCategory_Save").text("Update");
    }

    else if (MasterName == "Product Master") {

        var element = angular.element('#ProductMasterModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.ProductMaster_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtProductCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtProductName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtProductDescription_Model = $(obj).parent().children().eq(5).html();

            MasterScope.txtProductMasterProductType_code_Model = $(obj).parent().children().eq(3).html();

            MasterScope.txtProductMasterProductType_Model = $(obj).parent().children().eq(4).html();

            MasterScope.txtProductMasterProductCategory_code_Model = $(obj).parent().children().eq(6).html();


            MasterScope.txtProductMasterProductCategory_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtSize_Model = $(obj).parent().children().eq(8).html();
            MasterScope.txtGrossWeight_Model = $(obj).parent().children().eq(15).html();
            MasterScope.txtNetWeight_Model = $(obj).parent().children().eq(9).html();
            MasterScope.txtDeviation_Model = $(obj).parent().children().eq(11).html();
            MasterScope.txtBasicUnit_Model = $(obj).parent().children().eq(10).html();
            MasterScope.txtProductCreatedBy_Model = $(obj).parent().children().eq(12).html();
            MasterScope.txtProductCreatedDate_Model = $(obj).parent().children().eq(13).html();
            MasterScope.txtProductActive_Model = $(obj).parent().children().eq(14).html();


        });
        //$("#ProductMaster_id").val($(obj).parent().children().eq(0).html());
        //$("#txtProductCode").val($(obj).parent().children().eq(1).html());
        //$("#txtProductName").val($(obj).parent().children().eq(2).html());
        //$("#txtProductDescription").val($(obj).parent().children().eq(5).html());
        //$("#txtProductMasterProductType").val($(obj).parent().children().eq(4).html());
        //$("#txtProductMasterProductCategory").val($(obj).parent().children().eq(6).html());
        //$("#txtSize").val($(obj).parent().children().eq(7).html());
        //$("#txtGrossWeight").val($(obj).parent().children().eq(8).html());
        //$("#txtNetWeight").val($(obj).parent().children().eq(9).html());
        //$("#txtDeviation").val($(obj).parent().children().eq(11).html());
        //$("#txtBasicUnit").val($(obj).parent().children().eq(10).html());
        //$("#txtProductCreatedBy").val($(obj).parent().children().eq(12).html());
        //$("#txtProductCreatedDate").val($(obj).parent().children().eq(13).html());
        //$("#txtProductActive").val($(obj).parent().children().eq(14).html());

        $("#Product_Save").text("Update");
    }
    else if (MasterName == "Customer Type") {

        var element = angular.element('#CustomerTypeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CustomerType_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCustomerTypeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCustomerTypeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCustomerTypeDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCustomerTypeCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtCustomerTypeCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtCustomerTypeActive_Model = $(obj).parent().children().eq(6).html();
        });
        //$("#CustomerType_id").val($(obj).parent().children().eq(0).html());
        //$("#txtCustomerTypeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtCustomerTypeName").val($(obj).parent().children().eq(2).html());
        //$("#txtCustomerTypeDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtCustomerTypeCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtCustomerTypeCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtCustomerTypeActive").val($(obj).parent().children().eq(6).html());

        $("#CustomerType_Save").text("Update");
    }
    else if (MasterName == "Customer Category") {

        var element = angular.element('#CustomerCategoryModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CustomerCategory_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCustomerCategoryCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCustomerCategoryName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCustomerCategoryDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCustomerType_code_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtCustomerType_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtCustomerCategoryCreatedBy_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtCustomerCategoryCreatedDate_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtCustomerCategoryActive_Model = $(obj).parent().children().eq(8).html();


        });
        //$("#CustomerCategory_id").val($(obj).parent().children().eq(0).html());
        //$("#txtCustomerCategoryCode").val($(obj).parent().children().eq(1).html());
        //$("#txtCustomerCategoryName").val($(obj).parent().children().eq(2).html());
        //$("#txtCustomerCategoryDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtCustomerType").val($(obj).parent().children().eq(5).html());
        //$("#txtCustomerCategoryCreatedBy").val($(obj).parent().children().eq(6).html());
        //$("#txtCustomerCategoryCreatedDate").val($(obj).parent().children().eq(7).html());
        //$("#txtCustomerCategoryActive").val($(obj).parent().children().eq(8).html());

        $("#CustomerCategory_Save").text("Update");
    }
    else if (MasterName == "Customer Group") {

        var element = angular.element('#CustomerGroupModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CustomerGroup_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCustomerGroupCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCustomerGroupName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCustomerGroupDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCustomerGroupCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtCustomerGroupCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtCustomerGroupActive_Model = $(obj).parent().children().eq(6).html();
        });


        //$("#CustomerGroup_id").val($(obj).parent().children().eq(0).html());
        //$("#txtCustomerGroupCode").val($(obj).parent().children().eq(1).html());
        //$("#txtCustomerGroupName").val($(obj).parent().children().eq(2).html());
        //$("#txtCustomerGroupDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtCustomerGroupCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtCustomerGroupCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtCustomerGroupActive").val($(obj).parent().children().eq(6).html());

        $("#CustomerGroup_Save").text("Update");
    }
    else if (MasterName == "Sales Representative") {

        var element = angular.element('#SalesRepresentativeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.SalesRepresentative_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtSalesRepresentativeEmployeeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtSalesRepresentativeEmployeeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtSalesRepresentativeCreatedBy_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtSalesRepresentativeCreatedDate_Model = $(obj).parent().children().eq(4).html();
        });


        //$("#SalesRepresentative_id").val($(obj).parent().children().eq(0).html());
        //$("#txtSalesRepresentativeEmployeeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtSalesRepresentativeEmployeeName").val($(obj).parent().children().eq(2).html());
        //$("#txtSalesRepresentativeCreatedBy").val($(obj).parent().children().eq(3).html());
        //$("#txtSalesRepresentativeCreatedDate").val($(obj).parent().children().eq(4).html());

        $("#SalesRepresentative_Save").text("Update");
    }
    else if (MasterName == "Problem Type") {

        var element = angular.element('#ProblemTypeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.ProblemType_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtProblemTypeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtProblemTypeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtProblemTypeDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtProblemTypeCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtProblemTypeCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtProblemTypeActive_Model = $(obj).parent().children().eq(6).html();


        });



        //$("#ProblemType_id").val($(obj).parent().children().eq(0).html());
        //$("#txtProblemTypeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtProblemTypeName").val($(obj).parent().children().eq(2).html());
        //$("#txtProblemTypeDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtProblemTypeCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtProblemTypeCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtProblemTypeActive").val($(obj).parent().children().eq(6).html());

        $("#ProblemType_Save").text("Update");
    }
    else if (MasterName == "Problem Impact") {

        var element = angular.element('#ProblemImpactModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.ProblemImpact_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtProblemImpactCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtProblemImpactName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtProblemImpactDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtProblemImpactCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtProblemImpactCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtProblemImpactActive_Model = $(obj).parent().children().eq(6).html();


        });


        //$("#ProblemImpact_id").val($(obj).parent().children().eq(0).html());
        //$("#txtProblemImpactCode").val($(obj).parent().children().eq(1).html());
        //$("#txtProblemImpactName").val($(obj).parent().children().eq(2).html());
        //$("#txtProblemImpactDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtProblemImpactCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtProblemImpactCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtProblemImpactActive").val($(obj).parent().children().eq(6).html());

        $("#ProblemImpact_Save").text("Update");
    }
    else if (MasterName == "Response Action") {

        var element = angular.element('#ResponseActionModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.ResponseAction_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtResponseActionCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtResponseAction_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtResponseActionDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtResponseActionCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtResponseActionCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtResponseActionActive_Model = $(obj).parent().children().eq(6).html();
        });



        //$("#ResponseAction_id").val($(obj).parent().children().eq(0).html());
        //$("#txtResponseActionCode").val($(obj).parent().children().eq(1).html());
        //$("#txtResponseAction").val($(obj).parent().children().eq(2).html());
        //$("#txtResponseActionDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtResponseActionCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtResponseActionCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtResponseActionActive").val($(obj).parent().children().eq(6).html());

        $("#ResponseAction_Save").text("Update");
    }
    else if (MasterName == "Control Measure") {

        var element = angular.element('#ControlMeasureModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Control_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtControlCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtControlName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtControlDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtControlCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtControlCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtControlActive_Model = $(obj).parent().children().eq(6).html();
        });
        //$("#Control_id").val($(obj).parent().children().eq(0).html());
        //$("#txtControlCode").val($(obj).parent().children().eq(1).html());
        //$("#txtControlName").val($(obj).parent().children().eq(2).html());
        //$("#txtControlDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtControlCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtControlCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtControlActive").val($(obj).parent().children().eq(6).html());

        $("#Control_Save").text("Update");
    }
    else if (MasterName == "Corrective Actions") {

        var element = angular.element('#CorrectiveActionsModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CorrectiveMaster_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCorrectiveMasterCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCorrectiveMasterName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCorrectiveMasterDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCorrectiveMasterCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtCorrectiveMasterCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtCorrectiveMasterActive_Model = $(obj).parent().children().eq(6).html();
        });


        //$("#CorrectiveMaster_id").val($(obj).parent().children().eq(0).html());
        //$("#txtCorrectiveMasterCode").val($(obj).parent().children().eq(1).html());
        //$("#txtCorrectiveMasterName").val($(obj).parent().children().eq(2).html());
        //$("#txtCorrectiveMasterDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtCorrectiveMasterCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtCorrectiveMasterCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtCorrectiveMasterActive").val($(obj).parent().children().eq(6).html());

        $("#CorrectiveMaster_Save").text("Update");
    }

    else if (MasterName == "Preventive Actions") {

        var element = angular.element('#PreventiveActionsModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.PreventiveMaster_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtPreventiveMasterCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtPreventiveMasterName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtPreventiveMasterDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtPreventiveMasterCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtPreventiveMasterCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtPreventiveMasterActive_Model = $(obj).parent().children().eq(6).html();
        });


        //$("#PreventiveMaster_id").val($(obj).parent().children().eq(0).html());
        //$("#txtPreventiveMasterCode").val($(obj).parent().children().eq(1).html());
        //$("#txtPreventiveMasterName").val($(obj).parent().children().eq(2).html());
        //$("#txtPreventiveMasterDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtPreventiveMasterCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtPreventiveMasterCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtPreventiveMasterActive").val($(obj).parent().children().eq(6).html());

        $("#PreventiveMaster_Save").text("Update");
    }
    else if (MasterName == "Cause Master") {

        var element = angular.element('#CauseModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Cause_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCauseCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCauseName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCauseDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtProblemType_code_Model = $(obj).parent().children().eq(4).html();

            MasterScope.txtProblemType_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtCauseCreatedBy_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtCauseCreatedDate_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtCauseActive_Model = $(obj).parent().children().eq(8).html();
        });


        //$("#Cause_id").val($(obj).parent().children().eq(0).html());
        //$("#txtCauseCode").val($(obj).parent().children().eq(1).html());
        //$("#txtCauseName").val($(obj).parent().children().eq(2).html());
        //$("#txtCauseDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtProblemType").val($(obj).parent().children().eq(6).html());

        //$("#txtCauseCreatedBy").val($(obj).parent().children().eq(7).html());
        //$("#txtCauseCreatedDate").val($(obj).parent().children().eq(8).html());
        //$("#txtCauseActive").val($(obj).parent().children().eq(9).html());

        $("#Cause_Save").text("Update");
    }
    else if (MasterName == "Complaint Severity") {
        var element = angular.element('#ComplaintSeverityModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.ComplaintSeverity_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtComplaintSeverityCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtComplaintSeverityName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtComplaintSeverityDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtComplaintSeverityCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtComplaintSeverityCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtComplaintSeverityActive_Model = $(obj).parent().children().eq(6).html();
        });


        //$("#ComplaintSeverity_id").val($(obj).parent().children().eq(0).html());
        //$("#txtComplaintSeverityCode").val($(obj).parent().children().eq(1).html());
        //$("#txtComplaintSeverityName").val($(obj).parent().children().eq(2).html());
        //$("#txtComplaintSeverityDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtComplaintSeverityCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtComplaintSeverityCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtComplaintSeverityActive").val($(obj).parent().children().eq(6).html());

        $("#ComplaintSeverity_Save").text("Update");
    }

    else if (MasterName == "Supplier Type") {
        var element = angular.element('#SupplierTypeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.SupplierType_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtSupplierType_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtSupplierTypeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtSupplierTypeDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtSupplierTypeCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtSupplierTypeCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtSupplierTypeActive_Model = $(obj).parent().children().eq(6).html();
        });

        //$("#SupplierType_id").val($(obj).parent().children().eq(0).html());
        //$("#txtSupplierTypeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtSupplierTypeName").val($(obj).parent().children().eq(2).html());
        //$("#txtSupplierTypeDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtSupplierTypeCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtSupplierTypeCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtSupplierTypeActive").val($(obj).parent().children().eq(6).html());

        $("#SupplierType_Save").text("Update");
    }
    else if (MasterName == "Breakage Category") {
        var element = angular.element('#BreakageCategoryModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.BreakageCategory_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtBreakageCategory_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtBreakageCategoryName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtBreakageCategoryDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtBreakageCategoryCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtBreakageCategoryCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtBreakageCategoryActive_Model = $(obj).parent().children().eq(6).html();
        });


        //$("#BreakageCategory_id").val($(obj).parent().children().eq(0).html());
        //$("#txtBreakageCategoryCode").val($(obj).parent().children().eq(1).html());
        //$("#txtBreakageCategoryName").val($(obj).parent().children().eq(2).html());
        //$("#txtBreakageCategoryDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtBreakageCategoryCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtBreakageCategoryCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtBreakageCategoryActive").val($(obj).parent().children().eq(6).html());

        $("#BreakageCategory_Save").text("Update");
    }
    else if (MasterName == "Defect Type") {

        var element = angular.element('#DefectTypeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.DefectType_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtDefectTypeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtDefectTypeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtDefectTypeDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtDefectProductType_code_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtDefectProductType_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtDefectProductCategory_code_Model = $(obj).parent().children().eq(8).html();
            MasterScope.txtDefectProductCategory_Model = $(obj).parent().children().eq(9).html();
            MasterScope.txtDefectTypeCreatedBy_Model = $(obj).parent().children().eq(10).html();
            MasterScope.txtDefectTypeCreatedDate_Model = $(obj).parent().children().eq(9).html();
            MasterScope.txtDefectTypeActive_Model = $(obj).parent().children().eq(10).html();
        });


        //$("#DefectType_id").val($(obj).parent().children().eq(0).html());
        //$("#txtDefectTypeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtDefectTypeName").val($(obj).parent().children().eq(2).html());
        //$("#txtDefectTypeDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtDefectProductType").val($(obj).parent().children().eq(6).html());
        //$("#txtDefectProductCategory").val($(obj).parent().children().eq(9).html());
        //$("#txtDefectTypeCreatedBy").val($(obj).parent().children().eq(10).html());
        //$("#txtDefectTypeCreatedDate").val($(obj).parent().children().eq(11).html());
        //$("#txtDefectTypeActive").val($(obj).parent().children().eq(12).html());

        $("#DefectType_Save").text("Update");
    }
    else if (MasterName == "Recovery Type") {
        var element = angular.element('#RecoveryTypeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.RecoveryType_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtRecoveryTypeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtRecoveryTypeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtRecoveryTypeDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtRecoveryTypeCreatedBy_Model = $(obj).parent().children().eq(4).html();
            MasterScope.txtRecoveryTypeCreatedDate_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtRecoveryTypeActive_Model = $(obj).parent().children().eq(6).html();
        });
        //$("#RecoveryType_id").val($(obj).parent().children().eq(0).html());
        //$("#txtRecoveryTypeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtRecoveryTypeName").val($(obj).parent().children().eq(2).html());
        //$("#txtRecoveryTypeDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtRecoveryTypeCreatedBy").val($(obj).parent().children().eq(4).html());
        //$("#txtRecoveryTypeCreatedDate").val($(obj).parent().children().eq(5).html());
        //$("#txtRecoveryTypeActive").val($(obj).parent().children().eq(6).html());

        $("#RecoveryType_Save").text("Update");
    }
    else if (MasterName == "Survey Criteria") {

        var element = angular.element('#SurveyCriteriaModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.SurveyCriteria_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtSurveyCriteriaCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtSurveyCriteriaName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtSurveyCriteriaDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtSurveyCriteriaProductType_code_Model = $(obj).parent().children().eq(5).html();

            MasterScope.txtSurveyCriteriaProductType_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtSurveyCriteriaProductCategory_code_Model = $(obj).parent().children().eq(8).html();

            MasterScope.txtSurveyCriteriaProductCategory_Model = $(obj).parent().children().eq(9).html();
            MasterScope.txtSurveyCriteriaBreakageCategory_code_Model = $(obj).parent().children().eq(11).html();

            MasterScope.txtSurveyCriteriaBreakageCategoryName_Model = $(obj).parent().children().eq(12).html();


            MasterScope.txtSurveyCriteriaCreatedBy_Model = $(obj).parent().children().eq(13).html();
            MasterScope.txtSurveyCriteriaCreatedDate_Model = $(obj).parent().children().eq(14).html();
            MasterScope.txtSurveyCriteriaActive_Model = $(obj).parent().children().eq(15).html();
        });


        //$("#SurveyCriteria_id").val($(obj).parent().children().eq(0).html());
        //$("#txtSurveyCriteriaCode").val($(obj).parent().children().eq(1).html());
        //$("#txtSurveyCriteriaName").val($(obj).parent().children().eq(2).html());
        //$("#txtSurveyCriteriaDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtSurveyCriteriaProductType").val($(obj).parent().children().eq(6).html());
        //$("#txtSurveyCriteriaProductCategory").val($(obj).parent().children().eq(9).html());
        //$("#txtSurveyCriteriaBreakageCategoryName").val($(obj).parent().children().eq(12).html());
        //$("#txtSurveyCriteriaCreatedBy").val($(obj).parent().children().eq(13).html());
        //$("#txtSurveyCriteriaCreatedDate").val($(obj).parent().children().eq(14).html());
        //$("#txtSurveyCriteriaActive").val($(obj).parent().children().eq(15).html());

        $("#SurveyCriteria_Save").text("Update");
    }
    else if (MasterName == "Compensation Mode") {

        var element = angular.element('#CompensationModeModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.CompensationMode_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtCompensationModeCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtCompensationModeName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtCompensationModeDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtCompensationModeProductType_code_Model = $(obj).parent().children().eq(5).html();

            MasterScope.txtCompensationModeProductType_Model = $(obj).parent().children().eq(6).html();
            MasterScope.txtCompensationModeCreatedBy_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtCompensationModeCreatedDate_Model = $(obj).parent().children().eq(8).html();
            MasterScope.txtCompensationModeActive_Model = $(obj).parent().children().eq(9).html();
        });

        //$("#CompensationMode_id").val($(obj).parent().children().eq(0).html());
        //$("#txtCompensationModeCode").val($(obj).parent().children().eq(1).html());
        //$("#txtCompensationModeName").val($(obj).parent().children().eq(2).html());
        //$("#txtCompensationModeDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtCompensationModeProductType").val($(obj).parent().children().eq(6).html());
        //$("#txtCompensationModeCreatedBy").val($(obj).parent().children().eq(7).html());
        //$("#txtCompensationModeCreatedDate").val($(obj).parent().children().eq(8).html());
        //$("#txtCompensationModeActive").val($(obj).parent().children().eq(9).html());

        $("#CompensationMode_Save").text("Update");
    }
    else if (MasterName == "Observations Master") {

        var element = angular.element('#ObservationModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.Observation_id_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtObservationCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtObservationName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtObservationDescription_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtObservationProductType_code_Model = $(obj).parent().children().eq(4).html();

            MasterScope.txtObservationProductType_Model = $(obj).parent().children().eq(5).html();
            MasterScope.txtObservationProductCategory_code_Model = $(obj).parent().children().eq(6).html();

            MasterScope.txtObservationProductCategory_Model = $(obj).parent().children().eq(7).html();
            MasterScope.txtObservationCreatedBy_Model = $(obj).parent().children().eq(8).html();
            MasterScope.txtObservationCreatedDate_Model = $(obj).parent().children().eq(9).html();
            MasterScope.txtObservationActive_Model = $(obj).parent().children().eq(10).html();
            alert(MasterScope.txtObservationProductCategory_Model);
        });


        //$("#Observation_id").val($(obj).parent().children().eq(0).html());
        //$("#txtObservationCode").val($(obj).parent().children().eq(1).html());
        //$("#txtObservationName").val($(obj).parent().children().eq(2).html());
        //$("#txtObservationDescription").val($(obj).parent().children().eq(3).html());
        //$("#txtObservationProductType").val($(obj).parent().children().eq(6).html());
        //$("#txtObservationProductCategory").val($(obj).parent().children().eq(9).html());
        //$("#txtObservationCreatedBy").val($(obj).parent().children().eq(10).html());
        //$("#txtObservationCreatedDate").val($(obj).parent().children().eq(11).html());
        //$("#txtObservationActive").val($(obj).parent().children().eq(12).html());

        $("#Observation_Save").text("Update");
    }
    else if (MasterName == "Document Master") {

        var element = angular.element('#DocumentMasterModal');
        element.modal('show');
        MasterScope.$apply(function () {
            MasterScope.txtDocumentMasterid_Model = $(obj).parent().children().eq(0).html();
            MasterScope.txtDocumentMasterCode_Model = $(obj).parent().children().eq(1).html();
            MasterScope.txtDocumentMasterName_Model = $(obj).parent().children().eq(2).html();
            MasterScope.txtDocumentMasterCreatedBy_Model = $(obj).parent().children().eq(3).html();
            MasterScope.txtDocumentMasterCreatedDate_Model = $(obj).parent().children().eq(4).html();
            $("#Active").val($(obj).parent().children().eq(5).html());
        });
        $("#DocumentMaster_Save").text("Update");

    }



    //var scope = angular.element(document.getElementById("MainWrap")).scope();
    //angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").getMasterEditData(MasterName).success(function (response) {
    //    //scope.getMasterTableData(response.data);

    //    var data = JSON.parse(response.tabledata);
    //    alert(data.length);
    //    //$("#txtCountryCode").val()
    //});

    //$scope.Country_id_Model = "";
    //$scope.txtCountryCode_Model = "";
    //$("#Country_Save").text("Update");
    //$("#CountryModal").modal('show');
}

function getFieldLookUpData(response, name, pageHeading) {
    var data = JSON.parse(response.tabledata);
    var element = angular.element('#LookUpModal');
    element.modal('show');
    $("#PopHeading").text(pageHeading);

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
            var row$ = $('<tr onclick="' + name + '(this)" style="cursor:pointer;" />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#PopUpTable").append(row$);
        }

        $("#PopUpTable tr td:nth-child(1)").hide();
        $("#PopUpTable tr th:nth-child(1)").hide();

        if (MasterName == "State") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
        } else if (MasterName == "City") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
        }
        else if (MasterName == "Location") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
            $("#PopUpTable tr td:nth-child(6)").hide();
            $("#PopUpTable tr th:nth-child(6)").hide();
            $("#PopUpTable tr td:nth-child(8)").hide();
            $("#PopUpTable tr th:nth-child(8)").hide();
        }
        else if (MasterName == "Depo Master") {
            $("#PopUpTable tr td:nth-child(3)").hide();
            $("#PopUpTable tr th:nth-child(3)").hide();
            $("#PopUpTable tr td:nth-child(5)").hide();
            $("#PopUpTable tr th:nth-child(5)").hide();
            $("#PopUpTable tr td:nth-child(7)").hide();
            $("#PopUpTable tr th:nth-child(7)").hide();

        }
        else if (MasterName == "CurrencyMaster") {

            //$("#PopUpTable tr td:nth-child(1)").hide();
            //$("#PopUpTable tr th:nth-child(1)").hide();

        }
        else if (MasterName == "Group Company Details") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
            $("#PopUpTable tr td:nth-child(6)").hide();
            $("#PopUpTable tr th:nth-child(6)").hide();
            $("#PopUpTable tr td:nth-child(8)").hide();
            $("#PopUpTable tr th:nth-child(8)").hide();
        }
        else if (MasterName == "Company Details") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
            $("#PopUpTable tr td:nth-child(6)").hide();
            $("#PopUpTable tr th:nth-child(6)").hide();
            $("#PopUpTable tr td:nth-child(8)").hide();
            $("#PopUpTable tr th:nth-child(8)").hide();
        }

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

function DateValidation(FromDate, ToDate) {
    if ($("#" + FromDate).val() != "") {
        $("#" + ToDate).datepicker('setStartDate', $("#" + FromDate).val());
        //$("#" + ToDate).datepicker('option', 'minDate', $("#" + MyDate).val());
        //$("#"+ToDate).val("");
    }
}

function DateSplitterBU3(FromDate, ToDate) {
    var From_Dt = $("#" + FromDate).val().split('/'); var To_Dt = $("#" + ToDate).val().split('/');
    //var Dates = "'" + From_Dt[2] + '/' + From_Dt[1] + '/' + From_Dt[0] + "'" + ' and ' + "'" + To_Dt[2] + '/' + To_Dt[1] + '/' + To_Dt[0] + "'";
    //var Dates = "'" + From_Dt[0] + '/' + From_Dt[1] + '/' + From_Dt[2] + "'" + ' and ' + "'" + To_Dt[0] + '/' + To_Dt[1] + '/' + To_Dt[2] + "'";
    var Dates = "'" + From_Dt[2] + '-' + From_Dt[1] + '-' + From_Dt[0] + "'" + ' and ' + "'" + To_Dt[2] + '-' + To_Dt[1] + '-' + To_Dt[0] + "'";
    return Dates;
}


function isValidCode_Cust(code, ArrayValue) {
    return ($.inArray(code, ArrayValue) > -1);
}


//Invoice List
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

    var width = $(window).width(), height = $(window).height();

    var totalheight = height - 191;

    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });

    try {
        var Data = JSON.stringify({
            ID: "",
            UserCode: "",
            UserRoleType: "",
            ReportName: "InvoiceList_BU3"
        });
        DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
            var Result = JSON.parse(response.tabledata);
            console.log("Resultofreportlistcolumn" + Result);
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
                            "name": selectedcolumnname[i],
                            "bSortable": "true"
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    UserSelectedColumnName = ColArray;
                }
            }
        });

        var data_value = "";
        var CustomerArray = new Array();
        ShowLoader();
        CustomerArray.length = 0;
        $("#customerCode").val("");
        if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
            $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#customerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
            data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                all_zones = "";
                for (var i = 0; i < FilterList.dtZone.length; i++) {
                    $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                    if (FilterList.dtZone.length == 0) {
                        all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                    } else if (i == FilterList.dtZone.length - 1) {
                        all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                    } else {
                        all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                    }
                }

                $('select#Zone')[0].sumo.selectItem(0);
                $('#Zone').trigger("change");
            });
        } else if (SessionValue == "SH") {
            $("#Zone").attr("disabled", true); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#customerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
            data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                for (var i = 0; i < FilterList.dtZone.length; i++) {
                    $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                }
                $('select#Zone')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtState.length; i++) {
                    $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                }

                $('select#State')[0].sumo.selectItem(0);
                $('#State').trigger("change");
            });
        } else if (SessionValue == "TM") {
            $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#customerCode').attr("disabled", false); //$("#StockistID").attr("disabled", false);
            data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                for (var i = 0; i < FilterList.dtZone.length; i++) {
                    $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                }
                $('select#Zone')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtState.length; i++) {
                    $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                }
                $('select#State')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                }
            });
        } else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
            $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#customerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
            if (SessionValue == "FSO") {
                data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            } else {
                data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            }
            $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                for (var i = 0; i < FilterList.dtZone.length; i++) {
                    $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                }
                $('select#Zone')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtState.length; i++) {
                    $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                }
                $('select#State')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                }
                $('select#TerriotryArea')[0].sumo.selectItem(0);
                $('#TerriotryArea').trigger("change");
            });
        } else if ((SessionValue == "STOCKIST") || (SessionValue == "C&F")) {
            $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", true); $('#customerCode').attr("disabled", true); $('#customerCode').css({ "class": "gray" }); //$("#StockistID").attr("disabled", true);
            data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                for (var i = 0; i < FilterList.dtZone.length; i++) {
                    $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                }
                if (FilterList.dtZone.length > 0)
                    $('select#Zone')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtState.length; i++) {
                    $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                }
                if (FilterList.dtState.length > 0)
                    $('select#State')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                }
                if (FilterList.dtTerritory.length > 0)
                    $('select#TerriotryArea')[0].sumo.selectItem(0);
                for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                    CustomerArray.push(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                    $('#customerCode').val(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                }
            });
        } else if (SessionValue == "FSO_BU3" || SessionValue == "CSM_BU3") {
            $('#customerCode').attr("disabled", false); //$("#StockistID").attr("disabled", false);
            data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            $http({ url: '../../FinancialTransactionsBU3/GetCustomersforInvoicesBU3', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                console.log(FilterList)
                all_zones = "";
                //for (var i = 0; i < FilterList.dtZone.length; i++) {
                //    $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //    if (FilterList.dtZone.length == 0) {
                //        all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //    } else if (i == FilterList.dtZone.length - 1) {
                //        all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //    } else {
                //        all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //    }
                //}
                CustomerArray.length = 0;
                $("#customerCode").val("");
                if (FilterList.dtCustomer.length > 0) {
                    for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                        CustomerArray.push(FilterList.dtCustomer[i]["CUSTOMER_CODE"].toString() + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"].toString());
                    }
                }
            });
        }
        HideLoader();
        $('#Zone').on('keyup change', function () {
            ShowLoader();
            var Clear_State = $('#State option').length;
            for (var i = 0; i < Clear_State; i++) {
                $('#State')[0].sumo.remove(0);
            }

            CustomerArray.length = 0;
            $("#customerCode").val("");
            var Clear_Terrytory = $('#TerriotryArea option').length;
            for (var i = 0; i < Clear_Terrytory; i++) {
                $('#TerriotryArea')[0].sumo.remove(0);
            }

            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res != "") {
                    var dtState = JSON.parse(res);
                    for (var i = 0; i < dtState.length; i++) {
                        $('#State')[0].sumo.add(dtState[i]["STATE_CODE"], dtState[i]["STATE_NAME"]);
                    }
                } else {
                }

                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                    }
                });
            });
            HideLoader();
        });

        var SelectedState = ""; var Actual_SelectedState = ""; var Actual_SelectedTerritory = "";
        $('#State').on('keyup change', function () {
            ShowLoader();
            Actual_SelectedState = "";
            var Clear_Territory = $('#TerriotryArea option').length;
            for (var i = 0; i < Clear_Territory; i++) {
                $('#TerriotryArea')[0].sumo.remove(0);
            }
            CustomerArray.length = 0;
            $("#customerCode").val("");
            if ($('#State').val() != null) {
                var seleState = $('#State').val();

                for (var k = 0; k < seleState.length; k++) {
                    SelectedState += "'" + seleState[k] + "',";
                    Actual_SelectedState += "'" + seleState[k] + "',";
                }
                SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
                Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
            }

            var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
            $http({ url: '../../Home/GetTerritoriesforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res != "") {
                    var dtTerritory = JSON.parse(res);
                    for (var i = 0; i < dtTerritory.length; i++) {
                        $('#TerriotryArea')[0].sumo.add(dtTerritory[i]["TERRITORY_CODE"], dtTerritory[i]["TERRITORY_NAME"]);
                    }
                }
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            });

            if ($("#State").val() == null) {
                var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
                if ((SessionValue != "SH") && (SessionValue != "TM") && (SessionValue != "FSO") && (SessionValue != "FSO_BU2") && (SessionValue != "STOCKIST") && (SessionValue != "C&F")) {
                    $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                        if (Cust_res != "") {
                            var dtCust = JSON.parse(Cust_res);
                            for (var i = 0; i < dtCust.length; i++) {
                                CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            }
                            HideLoader();
                        } else {
                            HideLoader();
                        }
                    });
                }
                HideLoader();
            }
            SelectedState = "";
        });

        var SelectedTerritory = "";
        $('#TerriotryArea').on('keyup change', function () {
            ShowLoader();
            Actual_SelectedTerritory = ""; Actual_SelectedState = "";
            if ((SessionValue == "TM") || (SessionValue == "FSO") || (SessionValue == "FSO_BU2")) {
                if ($("#TerriotryArea").val() == null) {
                    CustomerArray.length = 0;
                    $("#customerCode").val("");
                    HideLoader();
                } else if ($("#TerriotryArea").val() != null) {
                    var seleTerritory = $('#TerriotryArea').val();
                    for (var k = 0; k < seleTerritory.length; k++) {
                        SelectedTerritory += "'" + seleTerritory[k] + "',";
                        Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                    }
                    SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                    Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 

                    var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                    $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                        if (res != "") {
                            var dtCust = JSON.parse(res);
                            for (var i = 0; i < dtCust.length; i++) {
                                CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            }
                            HideLoader();
                        } else { HideLoader(); }
                    });

                }
            } else {
                CustomerArray.length = 0;
                $("#customerCode").val("");
                if ($('#TerriotryArea').val() != null) {
                    var seleTerritory = $('#TerriotryArea').val();
                    for (var k = 0; k < seleTerritory.length; k++) {
                        SelectedTerritory += "'" + seleTerritory[k] + "',";
                        Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                    }
                    SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                    Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 
                }
                if ($("#TerriotryArea").val() == null) {
                    var seleState = $('#State').val();

                    for (var k = 0; k < seleState.length; k++) {
                        SelectedState += "'" + seleState[k] + "',";
                        Actual_SelectedState += "'" + seleState[k] + "',";
                    }
                    SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
                    Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 

                    var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
                    $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                        if (res != "") {
                            var dtCust = JSON.parse(res);
                            for (var i = 0; i < dtCust.length; i++) {
                                CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            }
                            HideLoader();
                        } else {
                            HideLoader();
                        }
                    });

                } else {
                    var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                    $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                        if (res != "") {
                            var dtCust = JSON.parse(res);
                            for (var i = 0; i < dtCust.length; i++) {
                                CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            }
                            HideLoader();
                        } else { HideLoader(); }
                    });

                }
            }
            SelectedTerritory = "";
            SelectedState = "";
        });
        $("#customerCode").typeahead({
            source: CustomerArray
        });
        $scope.SubmitInvoiceDataBU3 = function () {
            var isValidCustCode = isValidCode_Cust($("#customerCode").val(), CustomerArray);
            if (($("#fromDate").val() != "" && $("#toDate").val() != "") || $("#invoiceNo").val() != "") {
                if ((SessionValue == "ZH")) {
                    if ($("#Zone").val() == null) { alert("Please Select Your Zone"); }
                    else if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {
                        alert("please select proper customer code");
                    } else {
                        GetInvoiceDataBU3();
                    }
                } else if (SessionValue == "SH") {
                    if ($("#State").val() == null) { alert("Please Select Your State"); }
                    else if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {
                        alert("please select proper customer code");
                    } else {
                        GetInvoiceDataBU3();
                    }
                } else if (SessionValue == "TM") {
                    if ($("#TerriotryArea").val() == null) { alert("Please Select Your Sales Group"); }
                    else if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {
                        alert("please select proper customer code");
                    } else {
                        GetInvoiceDataBU3();
                    }
                }
                else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
                    if ($("#TerriotryArea").val() == null) { alert("Please Select Your Sales Group"); }
                    else if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {
                        alert("please select proper customer code");
                    } else {
                        GetInvoiceDataBU3();
                    }
                }
                else if (SessionValue == "FSO_BU3" || SessionValue == "CSM_BU3") {
                    if (($("#fromDate").val() == "" && $("#toDate").val() == "") && $("#invoiceNo").val() == "") {
                        alert("Please Provide either date or invoice number");
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
                    } else if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#invoiceNo").val() != "") {
                        alert("Please Provide either date or invoice number only");
                        return false;
                    } else {
                        GetInvoiceDataBU3();
                    }
                }
                else {
                    if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {
                        alert("please select proper customer code");
                    } else {
                        if ($("#State").val() != null)
                            Actual_SelectedState = "'" + $("#State").val() + "'";
                        GetInvoiceDataBU3();
                    }
                }
            } else { alert("Please Select From Date and To Date or Invoice Number"); }
        }

        function GetInvoiceDataBU3() {
            debugger
            ShowLoader();
            var DateRange = DateSplitterBU3('fromDate', 'toDate');
            try {
                var WhereClause = "where ";
                if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "") {
                    WhereClause += "(INVOICE_DATE between " + DateRange + ")";
                    WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ")";
                } else if ($("#fromDate").val() != "" && $("#toDate").val() != "") {
                    WhereClause += "(INVOICE_DATE between " + DateRange + ")";
                }
                else if ($("#SessionRole").val() == "STOCKIST") {
                    WhereClause += " and SOLD_TO_PARTY_CODE = " + $("#UserCode").val();
                }
                else if ($("#customerCode").val() != "") {
                    WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ")";
                } else if ($("#TerriotryArea").val() != null) {
                    WhereClause += " and SOLD_TO_PARTY_CODE IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc inner join CUSTOMER_SALES_VIEW csv on CAST(ecc.CUSTOMER_CODE AS BIGINT)=CAST(csv.cust_code AS BIGINT) where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
                } else if ($("#State").val() != null) {
                    WhereClause += " and State IN(" + Actual_SelectedState + ")";
                }
                else if ($("#Zone").val() != null) {
                    WhereClause += " and ZONE IN(" + $("#Zone").val() + ")";
                } else if ($("#invoiceNo").val() != null) {
                    WhereClause += "INVOICE_NO ='" + $("#invoiceNo").val() + "'";
                }

                if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#customerCode").val() == "")) {
                    WhereClause += "";
                }

                var sheet = $("#Sheets").val();

                //Edited By Manikanta

                //if (sheet != "select") {
                //    WhereClause += " and SOLD_TO_PARTY_CODE IN (select STOCKIST_ID from sap_customer_sales_master where DIVISION='" + sheet + "')";
                //}


                WhereClause += " order by INVOICE_DATE ASC";

                var Data = JSON.stringify({
                    MasterType: "InvoiceList_BU3",
                    ID: "561",
                    UserCode: $("#UserCode").val(),
                    "Type": "Get",
                    ReportName: "InvoiceList_BU3",
                    WhereClause: WhereClause
                });
                //ShowLoader();
                DIMSFactory.getReportData(Data).success(function (response) {
                    //HideLoader();
                    //debugger;
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "tbl_InvoiceList_BU3", UserSelectedColumnName);
                    $("#InvoiceListDiv_BU3").show();

                    $('#tbl_InvoiceList_BU3 tbody').on('click', 'tr', function () {
                        ShowLoader();
                        var ID = $(this).find('td:eq(0)').text();
                        var Inv_Type = $(this).find('td:eq(1)').text();
                        var Plant_Code = $(this).find('td:eq(8)').text();
                        var Inv_Date = $(this).find('td:eq(2)').text();
                        if (ID != "") {

                            var encryptedID = CryptoJS.AES.encrypt(ID, "Secret Passphrase");
                            var decrypted12 = CryptoJS.AES.decrypt(encryptedID, "Secret Passphrase");
                            var decryptedasd = decrypted12.toString(CryptoJS.enc.Utf8);

                            var scope = angular.element($("#InvoiceListDiv_BU3")).scope();
                            scope.$apply(function () {
                                //If the Invoice type is ‘ZINV’ and Plant Code is greater than or equal to 3000 then from the invoice list page, 
                                //it will redirect to ‘ZINV_Depo Invoice view’
                                //else it will redirect to ‘ZINV_Plant Invoice view’

                                var tempdate = Inv_Date.split('/');
                                Inv_Date = tempdate[2] + '-' + tempdate[1] + '-' + tempdate[0];

                                if (Date.parse(Inv_Date) >= Date.parse('2017-07-01')) {
                                    if (Inv_Type == "ZINV") {
                                        HideLoader();
                                        if (parseInt(Plant_Code) >= 3000) {
                                            scope.go("InvoiceDetail_ZINV_Plant_GST/" + ID);
                                        } else {
                                            scope.go("InvoiceDetail_ZINV_Plant_GST/" + ID);
                                        }
                                    }
                                    else if (Inv_Type == "ZFOC") {
                                        HideLoader();
                                        if (parseInt(Plant_Code) >= 3000) {
                                            scope.go("InvoiceDetail_ZFOC_Plant_GST/" + ID);
                                        } else {
                                            scope.go("InvoiceDetail_ZFOC_Plant_GST/" + ID);
                                        }
                                    }
                                }
                                else {
                                    if (Inv_Type == "ZINV") {
                                        HideLoader();
                                        if (parseInt(Plant_Code) >= 3000) {
                                            scope.go("InvoiceDetail_ZINV_Depo/" + ID);
                                        } else {

                                            scope.go("InvoiceDetail_ZINV_Plant/" + ID);
                                        }
                                    }
                                        //If the Invoice type is ‘ZFOC’ and Plant Code is greater than or equal to 3000 then from the invoice list page, 
                                        //it will redirect to ‘ZFOC_Depo Invoice view’
                                        //else it will redirect to ‘ZFOC_Plant Invoice view’
                                    else if (Inv_Type == "ZFOC") {
                                        HideLoader();
                                        if (parseInt(Plant_Code) >= 3000) {
                                            scope.go("InvoiceDetail_ZFOC_Depo/" + ID);
                                        } else {

                                            scope.go("InvoiceDetail_ZFOC_Plant/" + ID);
                                        }
                                    }
                                }
                            })
                        }

                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            $('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });
                });
                var WhereClause1 = "where ";
                if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "") {
                    WhereClause1 += "(INVOICE_DATE between " + DateRange + ")";
                    WhereClause1 += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ")";
                }
                else if ($("#fromDate").val() != "" && $("#toDate").val() != "") {
                    WhereClause1 += "(INVOICE_DATE between " + DateRange + ")";
                }
                else if ($("#customerCode").val() != "") {
                    WhereClause1 += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ")";
                } else if ($("#TerriotryArea").val() != null) {
                    WhereClause1 += " and SOLD_TO_PARTY_CODE IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc inner join CUSTOMER_SALES_VIEW csv on CAST(ecc.CUSTOMER_CODE AS BIGINT)=CAST(csv.cust_code AS BIGINT) where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
                } else if ($("#State").val() != null) {
                    WhereClause1 += " and State IN(" + Actual_SelectedState + ")";
                }
                else if ($("#Zone").val() != null) {
                    WhereClause1 += " and ZONE IN(" + $("#Zone").val() + ")";
                } else if ($("#invoiceNo").val() != null) {
                    WhereClause1 += "INVOICE_NO ='" + $("#invoiceNo").val() + "'";
                }
                if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#customerCode").val() == "")) {
                    WhereClause1 += "";
                }

                var sheet = $("#Sheets").val();

                //Edited By Manikanta

                //if (sheet != "select") {
                //    WhereClause1 += " and SOLD_TO_PARTY_CODE IN (select STOCKIST_ID from sap_customer_sales_master where DIVISION='" + sheet + "')";
                //}

                var Data1 = JSON.stringify({
                    MasterType: "InvoiceList_BU3",
                    ID: "561",
                    UserCode: $("#UserCode").val(),
                    "Type": "Get",
                    ReportName: "InvoiceList_BU3",
                    WhereClause: WhereClause1
                });
                DIMSSAPFactory.GetTotalAmtInvoiceBU3(Data1).success(function (res) {
                    if (res != "0") {
                        //var Res = JSON.parse(res);
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
            } catch (Exception) { }

        }

        //This method is used for download the Invoice List page.
        $scope.DownloadFileBU3 = function (filetype) {
            var isValidCustCode = isValidCode_Cust($("#customerCode").val(), CustomerArray);
            var SearchValue = $('input[type=search]').val();
            var FileName = "InvoiceList_BU3";
            var DateRange = DateSplitterBU3('fromDate', 'toDate');
            var UserCode = $("#UserCode").val();

            var WhereClause = "where ";
            if ($("#fromDate").val() != "" && $("#toDate").val() != "" && $("#customerCode").val() != "") {
                WhereClause += "(INVOICE_DATE between " + DateRange + ")";
                WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ")";
            } else if ($("#fromDate").val() != "" && $("#toDate").val() != "") {
                WhereClause += "(INVOICE_DATE between " + DateRange + ")";
            } else if ($("#customerCode").val() != "") {
                if ((isValidCustCode == false) && ($("#customerCode").val() != "")) {

                } else {
                    WhereClause += " and SOLD_TO_PARTY_CODE IN (" + $("#customerCode").val().split(':')[0] + ")";
                }
            }
            else if ($("#TerriotryArea").val() != null) {
                WhereClause += " and SOLD_TO_PARTY_CODE IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc inner join CUSTOMER_SALES_VIEW csv on CAST(ecc.CUSTOMER_CODE AS BIGINT)=CAST(csv.cust_code AS BIGINT) where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
            } else if ($("#State").val() != null) {
                WhereClause += " and State IN(" + Actual_SelectedState + ")";
            }
            else if ($("#Zone").val() != null) {
                WhereClause += " and ZONE IN(" + $("#Zone").val() + ")";
            } else if ($("#invoiceNo").val() != null) {
                WhereClause += "INVOICE_NO ='" + $("#invoiceNo").val() + "'";
            }
            if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#customerCode").val() == "")) {
                WhereClause += "";
            }

            var sheet = $("#Sheets").val();

            //Edited By Manikanta

            //if (sheet != "select") {
            //    WhereClause += " and SOLD_TO_PARTY_CODE IN (select STOCKIST_ID from sap_customer_sales_master where DIVISION='" + sheet + "')";
            //}

            WhereClause += " order by INVOICE_DATE ASC";

            var Table_DebitCount = $('#tbl_InvoiceList_BU3').DataTable().data().count();
            if (Table_DebitCount == 0) {
                alert("There is no data");
            } else {
                if ((isValidCustCode == false) && ($("#customerCode").val() != "")) { alert("please select proper customer code"); } else {
                    var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "INV_BU3" + "\",\"Action\":\"" + "Is_Export" + "\"}";
                    $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                        if (res == "True") {
                            CommonFunctionForExcelExport_SearchFilterBU3("561", UserCode, SearchValue, FileName, FileName, WhereClause, filetype);
                        }
                        else {
                            alert("You are not allowed to export Invoice List");
                        }
                    });
                }
            }
        }
    } catch (Exception) { }

    //
    // Open popup for columns selection
    $scope.OpenColumnEditing = function () {

        $('#undo_redo').empty();

        var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

        for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
            $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
        }

        $('#undo_redo').multiselect();
        if (ControllerName != "UnnatiEnrollmentDetailReportCtrl") {
            ControllerName = "UnnatiEnrollmentDetailReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiEnrollmentDetailReportCtrl");

            $compile(elem.contents())(UnnatiEnrollmentDetailReportScope);
        }

        $("#ColumnEditingModal").modal('show');

    }

    $scope.ViewColumnEditing = function () {

        var STDATE = ($scope.EnrollementDetailFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.EnrollementDetailToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }

        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
        var WhereCondition = " where CONVERT(DATE,ENROLLEMENT_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ENROLLEMENT_DATE)<='" + finalEndDate + "' ";
        if ($scope.EnrollDetailMemberType == "ALL")
        { } else {
            WhereCondition += "  AND  MEMBER_TYPE='" + $scope.EnrollDetailMemberType + "' ";
        }
        if ($scope.EnrollDetailZone == "Select" || $scope.EnrollDetailZone == undefined) {
            alert("Select Zone");
            return;
        } else {
            if ($scope.EnrollDetailZone == "ALL")
            { } else {
                WhereCondition = WhereCondition + " AND ZONE='" + $scope.EnrollDetailZone + "' ";
            }
        }

        if ($scope.EnrollDetailState == "Select" || $scope.EnrollDetailState == undefined) {
            alert("Select State");
            return;
        } else {
            if ($scope.EnrollDetailState == "ALL")
            { } else {
                WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $scope.EnrollDetailState.toUpperCase() + "' ";
            }
        }

        if ($scope.EnrollDetailDistrict == "Select" || $scope.EnrollDetailDistrict == undefined) {
            alert("Select District");
            return;
        } else {
            if ($scope.EnrollDetailDistrict == "ALL")
            { } else {
                WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $scope.EnrollDetailDistrict.toUpperCase() + "' ";
            }
        }

        DIMSFactory.ViewColumnEditing("UnnatiEnrollmentDetail", UserCode, WhereCondition);

    }

    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var STDATE = ($scope.EnrollementDetailFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.EnrollementDetailToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }

        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

        var WhereCondition = " where CONVERT(DATE,ENROLLEMENT_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ENROLLEMENT_DATE)<='" + finalEndDate + "' ";
        if ($scope.EnrollDetailMemberType == "ALL")
        { } else {
            WhereCondition += "  AND  MEMBER_TYPE='" + $scope.EnrollDetailMemberType + "' ";
        }

        if ($scope.EnrollDetailZone == "Select" || $scope.EnrollDetailZone == undefined) {
            alert("Select zone");
            return;
        } else {
            if ($scope.EnrollDetailZone == "ALL")
            { } else {
                WhereCondition = WhereCondition + " AND ZONE='" + $scope.EnrollDetailZone + "' ";
            }
        }

        if ($scope.EnrollDetailState == "Select" || $scope.EnrollDetailState == undefined) {
            alert("Select State");
            return;
        } else {
            if ($scope.EnrollDetailState == "ALL")
            { } else {
                WhereCondition = WhereCondition + " AND UPPER(STATE)='" + $scope.EnrollDetailState.toUpperCase() + "' ";
            }
        }

        if ($scope.EnrollDetailDistrict == "Select" || $scope.EnrollDetailDistrict == undefined) {
            alert("Select District");
            return;
        } else {
            if ($scope.EnrollDetailDistrict == "ALL")
            { } else {
                WhereCondition = WhereCondition + " AND UPPER(DISTRICT)='" + $scope.EnrollDetailDistrict.toUpperCase() + "' ";
            }
        }

        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiEnrollmentDetail",
            WhereClause: WhereCondition,
            "Type": "Get"
        });

        DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiEnrollmentDetail", UserCode, WhereCondition, Data, "EnrollmentDetailReport_Table");
    }

    $scope.SendEmailData = function () {
        //window.location.href = "../../SAP/Invoice_List_View_Data";

        DIMSSAPFactory.SendEmailInvoice().success(function (Res) {
            alert(Res);
        });
        //var FilterdText = $('#tbl_InvoiceList_info').text();
        //if (FilterdText.indexOf('filtered')) {
        //    var table = $('#tbl_InvoiceList_BU3').tableToJSON(); // Convert the table into a javascript object            
        //    alert(JSON.stringify(table));
        //}
        //else {
        //    DIMSSAPFactory.SendEmailInvoice().success(function (Res) {
        //        alert(Res);
        //    });
        //}

    }
});

//Invoice ZINV Plant Details
DIMS.controller('InvoiceDetail_ZINV_PlantCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {
                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;

                    //Sales Order

                    // $scope.BillingDoc = Header[0]["Billing Doc No."];
                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);
                    var ExciseInvdate = Header[0]["EXCISE_INV_DATE"].split('/');
                    //  $scope.ExciseInvNo = Header[0]["Excise Inv"] + "/" + ExciseInvdate;
                    $('#ExciseInvNo').text(Header[0]["Excise Inv"] + " / " + ExciseInvdate[0] + '.' + ExciseInvdate[1] + '.' + ExciseInvdate[2]);
                    $('#ExciseInvNo_html').text(Header[0]["Excise Inv"] + " / " + ExciseInvdate[0] + '.' + ExciseInvdate[1] + '.' + ExciseInvdate[2]);
                    // $scope.BillingDate = Header[0]["Billing Date"];
                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    //$scope.ECCNumber = Header[0]["ECC Number"];
                    $('#ECCNumber').text(Header[0]["ECC Number"]);
                    $('#ECCNumber_html').text(Header[0]["ECC Number"]);
                    //$scope.SalesOrderNo = Header[0]["Sales Order"];
                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    //$scope.CINNo = "L74999TG1955PLC000656";

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    //$scope.SoldTo = Header[0]["Sold To"];
                    var Soldto = Header[0]["Sold To"];
                    $('#SoldTo').text(Soldto);
                    $('#SoldTo_html').text(Soldto);
                    //$scope.OrderRefDate = Header[0]["Order Ref Date"];
                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    //Date of Preperation
                    var DOP = Header[0]["Billing Date"].split('/');
                    var DOT = Header[0]["Time"];
                    var ss = DOT.split(":");
                    var dt = new Date();
                    dt.setHours(ss[0]);
                    dt.setMinutes(ss[1]);
                    dt.setSeconds(ss[2]);
                    var dt2 = new Date(dt.valueOf() + 4000000);
                    var DOT_Time = dt2.toTimeString().split(" ")[0];

                    //$('#DOPrep').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //$('#DOPrep_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //Date of Removal
                    //$('#DORemoval').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);
                    //$('#DORemoval_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);

                    $('#Delivery').text("EX Factory");
                    $('#Delivery_html').text("EX Factory");


                    $('#GrossAmnt').text(Header[0]["Gross Amount"]);



                    // $('#NetWeight').text(Header[0]["NET_WT"]);
                    $('#PaymentTerms').text(Header[0]["PAYMENT_TERMS"]);
                    $('#PaymentTerms_html').text(Header[0]["PAYMENT_TERMS"]);
                    $('#LRRNo').text(Header[0]["LR_NO"]);
                    $('#LRRNo_html').text(Header[0]["LR_NO"]);
                    //$('#TransporterName').text(Header[0]["TRANSPORTER"]);
                    $('#TransporterName').text(Header[0]["Transporter Name"]);
                    $('#TransporterName_html').text(Header[0]["Transporter Name"]);
                    $('#LorryNum').text(Header[0]["VEHICLE_NO"]);
                    $('#LorryNum_html').text(Header[0]["VEHICLE_NO"]);
                    $('#OBDNum').text(Header[0]["DELIVERY_NO"]);
                    $('#OBDNum_html').text(Header[0]["DELIVERY_NO"]);


                    //If the Delivery is 'ZFR' or 'FOR' then display the text as Insurance and Transportaion is being arranged on customer's request
                    //else If the Delivery is 'EXT' then display the text as Freight to be paid to Transporter directly
                    if ((Header[0]["Delivery"] == "ZFR") || (Header[0]["Delivery"] == "FOR")) {
                        $("#lblInsuranceText_html").text("Insurance and Transportaion is being arranged on customer's request");
                    } else if (Header[0]["Delivery"] == "EXT") {
                        $("#lblInsuranceText_html").text("Freight to be paid to Transporter directly");
                    }

                    //
                    var BillToDetails = "<b>Consignee / Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var BillToDetails_html = "<b>Consignee / Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails_html += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"] + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //  var ShipperDetails = Shipper[0][""]


                    var ShipperDetails = "<b>Delivery Address / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var ShipperDetails_html = "<b>Delivery Address / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails_html += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"] + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone:" + Plant[0]["PHONE1"] + "</br>" + "TIN No.:" + Plant[0]["TIN_NO"] + "</br>" + "CST No.:" + Plant[0]["CST_NO"];
                    var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    var PlantDetails_html = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br /> " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;" + "</br>" + "&nbsp;" + "</br>" + "&nbsp;";
                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    $('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);


                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);
                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";

                        $("#lblChapter_Id_html").text(ChildTable[0]["CHAPTER_ID"]);
                        $("#lblChapter_Desc_html").text(ChildTable[0]["CHAPTER_DESC"]);
                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                        }
                    });

                    $("#Zinv_Plant_Footer_Header_html").remove();


                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var AssessableValue = 0;
                    var ExiceDuty = 0;
                    var EntryTax = 0;
                    var Turnover = 0;
                    var JCST = 0;
                    var ZSSC = 0;
                    var StateAddTax = 0;
                    var InsuranceTPND = 0;
                    var FreightAmt = 0;
                    var TotalFr = 0;
                    if ((parseFloat(PricingDetails[0]["DISC"]) > 0) || (parseFloat(PricingDetails[0]["DISC"]) < 0)) {
                        $('#Discount').text(Number(PricingDetails[0]["DISC"]).toFixed(2));
                    } else {
                        $("#lblDiscount").hide(); $("#Discount").hide();
                        $("#lblDiscount_html").hide(); $("#Discount_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["JCST"]) > 0) {
                        if (PricingDetails[0]["STK_PRC_GRP"] == "Z1") {
                            $("#lblAgainstCFORM").html("CST @ " + PricingDetails[0]["JCSTP"] + "% (against CFORM) :"); $("#lblAgainstCFORM_html").html("CST @ " + PricingDetails[0]["JCSTP"] + "% (against CFORM) :");
                        } else {
                            $("#lblAgainstCFORM").html("CST @ " + PricingDetails[0]["JCSTP"] + "% :"); $("#lblAgainstCFORM_html").html("CST @ " + PricingDetails[0]["JCSTP"] + "% :");
                        }
                        $('#AgainstCFORM').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                        $('#AgainstCFORM_html').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                    }
                    else {
                        $("#lblAgainstCFORM").html("VAT @ " + PricingDetails[0]["ZVATP"] + "% :");
                        $("#lblAgainstCFORM_html").html("VAT @ " + PricingDetails[0]["ZVATP"] + "% :");
                        $('#AgainstCFORM').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                        $('#AgainstCFORM_html').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    }



                    if (Number(PricingDetails[0]["ZSSC"].toString()).toFixed(2) == "0.00") {
                        $("#idSteteSess").hide();
                        $("#idSteteSess_html").hide();

                    }
                    else {
                        $('#SteteSec').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $('#SteteSec_html').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $("#lblSteteSec").html("State Sec Cess @ " + PricingDetails[0]["ZSSCP"] + "% :");
                        $("#lblSteteSec_html").html("State Sec Cess @ " + PricingDetails[0]["ZSSCP"] + "% :");
                    }
                    if (Number(PricingDetails[0]["ZGTA"].toString()).toFixed(2) == "0.00") {
                        $("#idStateAddTax").hide();
                        $("#idStateAddTax_html").hide();
                    } else {
                        $('#StateAddTax').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                        $('#StateAddTax_html').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));

                        $("#lblSteteSec").html("State Add Tax @ " + PricingDetails[0]["ZGTAP"] + "% :");
                        $("#lblStateAddTax_html").html("State Add Tax @ " + PricingDetails[0]["ZGTAP"] + "% :");
                    }

                    if (parseFloat(PricingDetails[0]["ASS"]) > 0) {
                        $('#AssessableValue').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                        $('#AssessableValue_html').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    } else {
                        $("#lblAssessableValue").hide(); $("#AssessableValue").hide();
                        $("#lblAssessableValue_html").hide(); $("#AssessableValue_html").hide();
                    }

                    if (parseFloat(PricingDetails[0]["JEXP"]) > 0) {
                        $('#ExiceDuty').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                        $('#ExiceDuty_html').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                    } else {
                        $("#lblExiceDuty").hide(); $("#ExiceDuty").hide();
                        $("#lblExiceDuty_html").hide(); $("#ExiceDuty_html").hide();
                    }
                    if ((Number(PricingDetails[0]["ZETX"].toString()).toFixed(2) == "0.00") && (Number(PricingDetails[0]["ZETO"].toString()).toFixed(2) == "0.00")) {
                        $("#idEntryTax").hide();
                        $("#idEntryTax_html").hide();
                        $("#idOrissaTax").hide();
                        $("#idOrissaTax_html").hide();
                    } else {
                        if (Number(PricingDetails[0]["ZETOP"].toString()).toFixed(2) == "0.00") {
                            $('#EntryTax').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                            $('#EntryTax_html').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                        } else {
                            //$('#EntryTax').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            //$('#EntryTax_html').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));

                            $('#OrissaTax').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            $('#OrissaTax_html').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                        }

                        if (Number(PricingDetails[0]["ZETOP"].toString()).toFixed(2) == "0.00") {
                            $("#lblEntryTax").html("Entry Tax @ " + PricingDetails[0]["ZETXP"] + "% :");
                            $("#lblEntryTax_html").html("Entry Tax @ " + PricingDetails[0]["ZETXP"] + "% :");
                        } else {
                            $("#lblOrissaTax").html("Orissa Entry Tax @ " + PricingDetails[0]["ZETOP"] + "% :");
                            $("#lblOrissaTax_html").html("Orissa Entry Tax @ " + PricingDetails[0]["ZETOP"] + "% :");
                        }

                    }

                    if (parseFloat(PricingDetails[0]["ZINS"]) > 0) {
                        $('#InsuranceTPND').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                        $('#InsuranceTPND_html').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));

                        $("#lblInsuranceTPND").html("Insurance (TPND) @ " + PricingDetails[0]["ZINSP"] + "% :");
                        $("#lblInsuranceTPND_html").html("Insurance (TPND) @ " + PricingDetails[0]["ZINSP"] + "% :");
                    } else {
                        $("#lblInsuranceTPND").hide(); $("#InsuranceTPND").hide();
                        $("#lblInsuranceTPND_html").hide(); $("#InsuranceTPND_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["ZF00"]) > 0) {
                        $('#FreightAmt').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                        $('#FreightAmt_html').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    } else {
                        $("#lblFreightAmt").hide(); $("#FreightAmt").hide();
                        $("#lblFreightAmt_html").hide(); $("#FreightAmt_html").hide();
                    }


                    JCST += parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    Turnover = parseFloat(Number(PricingDetails[0]["ASS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JEXP"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    $('#TaxTornover').text(Number(Turnover).toFixed(2));
                    $('#TaxTornover_html').text(Number(Turnover).toFixed(2));
                    var Total_Wt_Fr = parseFloat(Number(Turnover).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JCST"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZGTA"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZSSC"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                    $('#Total').text(parseFloat(Number(Total_Wt_Fr).toFixed(2)));
                    $('#Total_html').text(parseFloat(Number(Total_Wt_Fr).toFixed(2)));
                    TotalFr = parseFloat(Number(Total_Wt_Fr).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZINS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    $('#TotalFr').text(Number(TotalFr).toFixed(2));
                    $('#TotalFr_html').text(Number(TotalFr).toFixed(2));
                    $('#TotalAmountRound').text(Math.round(Number(TotalFr).toFixed(2)) + ".00");
                    $('#TotalAmountRound_html').text(Math.round(Number(TotalFr).toFixed(2)) + ".00");
                    //$('#TotalAmountRound').text(Math.round(TotalFr) + '.00')
                    //$('#TotalAmountRound_html').text(Math.round(TotalFr) + '.00')
                    $('#ExciseAmtInWords').text(toWordsINVOICE(Number(PricingDetails[0]["JEXP"]).toFixed(2)));
                    $('#ExciseAmtInWords_html').text(toWordsINVOICE(Number(PricingDetails[0]["JEXP"]).toFixed(2)));
                    $('#TotalAmtInWords').text(toWordsINVOICE(Number(Header[0]["Gross Amount"]).toFixed(2)));
                    $('#TotalAmtInWords_html').text(toWordsINVOICE(Number(Header[0]["Gross Amount"]).toFixed(2)));
                    //$('#TotalAmtInWords').text(toWordsINVOICE(Math.round(TotalFr) + '.00'));
                    //$('#TotalAmtInWords_html').text(toWordsINVOICE(Math.round(TotalFr) + '.00'));
                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }

            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

//Invoice ZINV Depo Details
DIMS.controller('InvoiceDetail_ZINV_DepoCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {
                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;

                    //Sales Order

                    // $scope.BillingDoc = Header[0]["Billing Doc No."];
                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);
                    var ExciseInvdate = Header[0]["EXCISE_INV_DATE"].split('/');
                    // $scope.BillingDate = Header[0]["Billing Date"];
                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    //$scope.SalesOrderNo = Header[0]["Sales Order"];
                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    //$scope.CINNo = "L74999TG1955PLC000656";

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    //$scope.SoldTo = Header[0]["Sold To"];
                    var Soldto = Header[0]["Sold To"];
                    $('#SoldTo').text(Soldto);
                    $('#SoldTo_html').text(Soldto);
                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    //Date of Preperation
                    var DOP = Header[0]["Billing Date"].split('/');

                    var DOT = Header[0]["Time"];
                    var ss = DOT.split(":");
                    var dt = new Date();
                    dt.setHours(ss[0]);
                    dt.setMinutes(ss[1]);
                    dt.setSeconds(ss[2]);
                    var dt2 = new Date(dt.valueOf() + 40000);
                    var DOT_Time = dt2.toTimeString().split(" ")[0];

                    // $('#DOPrep').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //$('#DOPrep_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //Date of Removal
                    //$('#DORemoval').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);
                    //$('#DORemoval_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);

                    $('#Delivery').text("EX Depot");
                    $('#Delivery_html').text("EX Depot");


                    $('#GrossAmnt').text(Header[0]["Gross Amount"]);



                    // $('#NetWeight').text(Header[0]["NET_WT"]);
                    $('#PaymentTerms').text(Header[0]["PAYMENT_TERMS"]);
                    $('#PaymentTerms_html').text(Header[0]["PAYMENT_TERMS"]);
                    $('#LRRNo').text(Header[0]["LR_NO"]);
                    $('#LRRNo_html').text(Header[0]["LR_NO"]);
                    $('#TransporterName').text(Header[0]["Transporter Name"]);
                    $('#TransporterName_html').text(Header[0]["Transporter Name"]);
                    $('#LorryNum').text(Header[0]["VEHICLE_NO"]);
                    $('#LorryNum_html').text(Header[0]["VEHICLE_NO"]);
                    $('#OBDNum').text(Header[0]["DELIVERY_NO"]);
                    $('#OBDNum_html').text(Header[0]["DELIVERY_NO"]);

                    if ((Header[0]["Delivery"] == "ZFR") || (Header[0]["Delivery"] == "FOR")) {
                        $("#lblInsuranceText_html").text("Insurance and Transportation is being arranged on customer's request");
                    } else if (Header[0]["Delivery"] == "EXT") {
                        $("#lblInsuranceText_html").text("Freight to be paid to Transporter directly");
                    }


                    var BillToDetails = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var BillToDetails_html = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails_html += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"] + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //  var ShipperDetails = Shipper[0][""]


                    var ShipperDetails = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var ShipperDetails_html = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails_html += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"] + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";


                    var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    var PlantDetails_html = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    $('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);


                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);
                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                        }
                    });
                    $("#Zinv_Depo_header").remove();
                    $("#Zinv_Depo_header_html").remove();
                    $("#Zinv_Depo_Footer_Header_html").remove();


                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var AssessableValue = 0;
                    var ExiceDuty = 0;
                    var EntryTax = 0;
                    var Turnover = 0;
                    var JCST = 0;
                    var ZSSC = 0;
                    var StateAddTax = 0;
                    var InsuranceTPND = 0;
                    var FreightAmt = 0;
                    var TotalFr = 0;
                    if (parseFloat(PricingDetails[0]["DISC"]) > 0) {
                        $('#Discount').text(Number(PricingDetails[0]["DISC"]).toFixed(2));
                    } else {
                        $("#lblDiscount").hide(); $("#Discount").hide();
                        $("#lblDiscount_html").hide(); $("#Discount_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["JCST"]) > 0) {
                        if (PricingDetails[0]["STK_PRC_GRP"] == "Z1") {
                            $("#lblAgainstCFORM").html("CST @ " + PricingDetails[0]["JCSTP"] + "% (against CFORM) :"); $("#lblAgainstCFORM_html").html("CST @ " + PricingDetails[0]["JCSTP"] + "% (against CFORM) :");
                        } else {
                            $("#lblAgainstCFORM").html("CST @ " + PricingDetails[0]["JCSTP"] + "% :"); $("#lblAgainstCFORM_html").html("CST @ " + PricingDetails[0]["JCSTP"] + "% :");
                        }
                        $('#AgainstCFORM').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                        $('#AgainstCFORM_html').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                    }
                    else {
                        if (parseFloat(PricingDetails[0]["ZVAT"]) > 0) {
                            $("#lblAgainstCFORM").html("VAT @ " + PricingDetails[0]["ZVATP"] + "% :");
                            $("#lblAgainstCFORM_html").html("VAT @ " + PricingDetails[0]["ZVATP"] + "% :");
                            $('#AgainstCFORM').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                            $('#AgainstCFORM_html').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                        } else {
                            $("#lblAgainstCFORM").hide(); $("#AgainstCFORM").hide();
                            $("#lblAgainstCFORM_html").hide(); $("#AgainstCFORM_html").hide();
                        }
                    }




                    if (Number(PricingDetails[0]["ZSSC"].toString()).toFixed(2) == "0.00") {
                        $("#idSteteSess").hide();
                        $("#idSteteSess_html").hide();

                    }
                    else {
                        $('#SteteSec').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $('#SteteSec_html').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $("#lblSteteSec").html("State Sec Cess @ " + PricingDetails[0]["ZSSCP"] + "% :");
                        $("#lblSteteSec_html").html("State Sec Cess @ " + PricingDetails[0]["ZSSCP"] + "% :");
                    }

                    if (Number(PricingDetails[0]["ZGTA"].toString()).toFixed(2) == "0.00") {
                        $("#idStateAddTax").hide();
                        $("#idStateAddTax_html").hide();
                    } else {
                        $('#StateAddTax').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                        $('#StateAddTax_html').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                        $("#lblSteteSec").html("State Add Tax @ " + PricingDetails[0]["ZGTAP"] + "% :");
                        $("#lblStateAddTax_html").html("State Add Tax @ " + PricingDetails[0]["ZGTAP"] + "% :");
                    }
                    if (parseFloat(PricingDetails[0]["ASS"]) > 0) {
                        $('#AssessableValue').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                        $('#AssessableValue_html').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    } else {
                        $("#lblAssessableValue").hide(); $("#AssessableValue").hide();
                        $("#lblAssessableValue_html").hide(); $("#AssessableValue_html").hide();
                    }
                    //$('#ExiceDuty').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                    if ((Number(PricingDetails[0]["ZETX"].toString()).toFixed(2) == "0.00") && (Number(PricingDetails[0]["ZETO"].toString()).toFixed(2) == "0.00")) {
                        $("#idEntryTax").hide();
                        $("#idEntryTax_html").hide();
                        $("#idOrissaTax").hide();
                        $("#idOrissaTax_html").hide();
                    } else {
                        if (Number(PricingDetails[0]["ZETOP"].toString()).toFixed(2) == "0.00") {
                            $('#EntryTax').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                            $('#EntryTax_html').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                        } else {
                            //$('#EntryTax').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            //$('#EntryTax_html').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            $('#OrissaTax').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            $('#OrissaTax_html').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                        }

                        if (Number(PricingDetails[0]["ZETOP"].toString()).toFixed(2) == "0.00") {
                            $("#lblEntryTax").html("Entry Tax @ " + PricingDetails[0]["ZETXP"] + "% :");
                            $("#lblEntryTax_html").html("Entry Tax @ " + PricingDetails[0]["ZETXP"] + "% :");
                        } else {
                            $("#lblOrissaTax").html("Orissa Entry Tax @ " + PricingDetails[0]["ZETOP"] + "% :");
                            $("#lblOrissaTax_html").html("Orissa Entry Tax @ " + PricingDetails[0]["ZETOP"] + "% :");
                        }

                    }

                    if (parseFloat(PricingDetails[0]["ZINS"]) > 0) {
                        $('#InsuranceTPND').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                        $('#InsuranceTPND_html').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));

                        $("#lblInsuranceTPND").html("Insurance (TPND) @ " + PricingDetails[0]["ZINSP"] + "% :");
                        $("#lblInsuranceTPND_html").html("Insurance (TPND) @ " + PricingDetails[0]["ZINSP"] + "% :");
                    } else {
                        $("#lblInsuranceTPND").hide(); $("#InsuranceTPND").hide();
                        $("#lblInsuranceTPND_html").hide(); $("#InsuranceTPND_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["ZF00"]) > 0) {
                        $('#FreightAmt').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                        $('#FreightAmt_html').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    } else {
                        $("#lblFreightAmt").hide(); $("#FreightAmt").hide();
                        $("#lblFreightAmt_html").hide(); $("#FreightAmt_html").hide();
                    }


                    JCST += parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    Turnover = parseFloat(Number(PricingDetails[0]["ASS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JEXP"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    $('#TaxTornover').text(Number(Turnover).toFixed(2));
                    $('#TaxTornover_html').text(Number(Turnover).toFixed(2));
                    var Total_Wt_Fr = parseFloat(Number(Turnover).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JCST"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZGTA"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZSSC"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                    $('#Total').text(parseFloat(Number(Total_Wt_Fr).toFixed(2)));
                    $('#Total_html').text(parseFloat(Number(Total_Wt_Fr).toFixed(2)));
                    TotalFr = parseFloat(Number(Total_Wt_Fr).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZINS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    $('#TotalFr').text(Number(TotalFr).toFixed(2));
                    $('#TotalFr_html').text(Number(TotalFr).toFixed(2));

                    $('#TotalAmountRound').text(Math.round(Number(Total_Wt_Fr).toFixed(2)) + ".00");
                    //$('#TotalAmountRound_html').text(Math.round((Header[0]["Gross Amount"]).toFixed(2)) + ".00");
                    $('#TotalAmountRound_html').text(Math.round(Number(Total_Wt_Fr).toFixed(2)) + ".00");

                    $('#TotalAmtInWords').text(toWordsINVOICE(Number(Header[0]["Gross Amount"]).toFixed(2)));
                    $('#TotalAmtInWords_html').text(toWordsINVOICE(Number(Header[0]["Gross Amount"]).toFixed(2)));
                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }

            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

//Invoice ZFOC Plant Details
DIMS.controller('InvoiceDetail_ZFOC_PlantCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {
                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;

                    //Sales Order

                    // $scope.BillingDoc = Header[0]["Billing Doc No."];
                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);
                    var ExciseInvdate = Header[0]["EXCISE_INV_DATE"].split('/');
                    //  $scope.ExciseInvNo = Header[0]["Excise Inv"] + "/" + ExciseInvdate;
                    $('#ExciseInvNo').text(Header[0]["Excise Inv"] + " / " + ExciseInvdate[0] + '.' + ExciseInvdate[1] + '.' + ExciseInvdate[2]);
                    $('#ExciseInvNo_html').text(Header[0]["Excise Inv"] + " / " + ExciseInvdate[0] + '.' + ExciseInvdate[1] + '.' + ExciseInvdate[2]);
                    // $scope.BillingDate = Header[0]["Billing Date"];
                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    //$scope.ECCNumber = Header[0]["ECC Number"];
                    $('#ECCNumber').text(Header[0]["ECC Number"]);
                    $('#ECCNumber_html').text(Header[0]["ECC Number"]);
                    //$scope.SalesOrderNo = Header[0]["Sales Order"];
                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    //$scope.CINNo = "L74999TG1955PLC000656";

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    //$scope.SoldTo = Header[0]["Sold To"];
                    var Soldto = Header[0]["Sold To"];
                    $('#SoldTo').text(Soldto);
                    $('#SoldTo_html').text(Soldto);
                    //$scope.OrderRefDate = Header[0]["Order Ref Date"];
                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    //Date of Preperation
                    var DOP = Header[0]["Billing Date"].split('/');
                    var DOT = Header[0]["Time"];
                    var ss = DOT.split(":");
                    var dt = new Date();
                    dt.setHours(ss[0]);
                    dt.setMinutes(ss[1]);
                    dt.setSeconds(ss[2]);
                    var dt2 = new Date(dt.valueOf() + 4000000);
                    var DOT_Time = dt2.toTimeString().split(" ")[0];

                    // $('#DOPrep').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    // $('#DOPrep_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //Date of Removal
                    // $('#DORemoval').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);
                    //$('#DORemoval_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);

                    $('#Delivery').text("EX Factory");
                    $('#Delivery_html').text("EX Factory");


                    $('#GrossAmnt').text(Header[0]["Gross Amount"]);



                    // $('#NetWeight').text(Header[0]["NET_WT"]);
                    $('#PaymentTerms').text(Header[0]["PAYMENT_TERMS"]);
                    $('#PaymentTerms_html').text(Header[0]["PAYMENT_TERMS"]);
                    $('#LRRNo').text(Header[0]["LR_NO"]);
                    $('#LRRNo_html').text(Header[0]["LR_NO"]);
                    //$('#TransporterName').text(Header[0]["TRANSPORTER"]);
                    $('#TransporterName').text(Header[0]["Transporter Name"]);
                    $('#TransporterName_html').text(Header[0]["Transporter Name"]);
                    $('#LorryNum').text(Header[0]["VEHICLE_NO"]);
                    $('#LorryNum_html').text(Header[0]["VEHICLE_NO"]);
                    $('#OBDNum').text(Header[0]["DELIVERY_NO"]);
                    $('#OBDNum_html').text(Header[0]["DELIVERY_NO"]);

                    if ((Header[0]["Delivery"] == "ZFR") || (Header[0]["Delivery"] == "FOR")) {
                        $("#lblInsuranceText_html").text("Insurance and Transportaion is being arranged on customer's request");
                    } else if (Header[0]["Delivery"] == "EXT") {
                        $("#lblInsuranceText_html").text("Freight to be paid to Transporter directly");
                    }

                    var BillToDetails = "<b>Consignee / Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var BillToDetails_html = "<b>Consignee / Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails_html += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"] + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //  var ShipperDetails = Shipper[0][""]


                    var ShipperDetails = "<b>Delivery Address / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var ShipperDetails_html = "<b>Delivery Address / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails_html += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"] + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone:" + Plant[0]["PHONE1"] + "</br>" + "TIN No.:" + Plant[0]["TIN_NO"] + "</br>" + "CST No.:" + Plant[0]["CST_NO"];
                    var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    var PlantDetails_html = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br /> " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    $('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);


                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);
                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";

                        $("#lblChapter_Id_html").text(ChildTable[0]["CHAPTER_ID"]);
                        $("#lblChapter_Desc_html").text(ChildTable[0]["CHAPTER_DESC"]);
                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                        }
                    });

                    $("#Zfoc_Plant_Footer_Header_html").remove();


                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var AssessableValue = 0;
                    var ExiceDuty = 0;
                    var EntryTax = 0;
                    var Turnover = 0;
                    var JCST = 0;
                    var ZSSC = 0;
                    var StateAddTax = 0;
                    var InsuranceTPND = 0;
                    var FreightAmt = 0;
                    var TotalFr = 0;
                    //if (parseFloat(PricingDetails[0]["DISC"]) > 0) {
                    //    $('#Discount').text(Number(PricingDetails[0]["DISC"]).toFixed(2));
                    //} else {
                    //    $("#lblDiscount").hide(); $("#Discount").hide();
                    //    $("#lblDiscount_html").hide(); $("#Discount_html").hide();
                    //}
                    //if (parseFloat(PricingDetails[0]["JCST"]) > 0) {
                    //    $("#lblAgainstCFORM").html("CST :");
                    //    $('#AgainstCFORM').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                    //    $('#AgainstCFORM_html').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                    //}
                    //else {
                    //    $("#lblAgainstCFORM").html("VAT :");
                    //    $('#AgainstCFORM').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    //    $('#AgainstCFORM_html').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    //}



                    //if (Number(PricingDetails[0]["ZSSC"].toString()).toFixed(2) == "0.00") {
                    //    $("#idSteteSess").hide();
                    //    $("#idSteteSess_html").hide();

                    //}
                    //else {
                    //    $('#SteteSec').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                    //    $('#SteteSec_html').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                    //    $("#lblSteteSec").html("State Sec Cess  :");
                    //    $("#lblSteteSec_html").html("State Sec Cess  :");
                    //}
                    //if (Number(PricingDetails[0]["ZGTA"].toString()).toFixed(2) == "0.00") {
                    //    $("#idStateAddTax").hide();
                    //    $("#idStateAddTax_html").hide();
                    //} else {
                    //    $('#StateAddTax').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                    //    $('#StateAddTax_html').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));

                    //    $("#lblStateAddTax").html("State Add Tax  :");
                    //    $("#lblStateAddTax_html").html("State Add Tax  :");
                    //}

                    if (parseFloat(PricingDetails[0]["ASS"]) > 0) {
                        $('#AssessableValue').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                        $('#AssessableValue_html').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    } else {
                        $("#lblAssessableValue").hide(); $("#AssessableValue").hide();
                        $("#lblAssessableValue_html").hide(); $("#AssessableValue_html").hide();
                    }
                    //if (parseFloat(PricingDetails[0]["ASS"]) > 0) {
                    //    $('#AssessableValue').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    //    $('#AssessableValue_html').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    //} else {
                    //    $("#lblAssessableValue").hide(); $("#AssessableValue").hide();
                    //    $("#lblAssessableValue_html").hide(); $("#AssessableValue_html").hide();
                    //}



                    if (parseFloat(PricingDetails[0]["JEXP"]) > 0) {
                        $('#ExiceDuty').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                        $('#ExiceDuty_html').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                    } else {
                        $("#lblExiceDuty").hide(); $("#ExiceDuty").hide();
                        $("#lblExiceDuty_html").hide(); $("#ExiceDuty_html").hide();
                    }
                    //if (Number(PricingDetails[0]["ZETX"].toString()).toFixed(2) == "0.00") {
                    //    $("#idEntryTax").hide();
                    //    $("#idEntryTax_html").hide();
                    //} else {
                    //    $('#EntryTax').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    //    $('#EntryTax_html').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    //}

                    //if (parseFloat(PricingDetails[0]["ZINS"]) > 0) {
                    //    $('#InsuranceTPND').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                    //    $('#InsuranceTPND_html').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                    //} else { $("#lblInsuranceTPND").hide(); $("#InsuranceTPND").hide(); $("#lblInsuranceTPND_html").hide(); $("#InsuranceTPND_html").hide(); }
                    //if (parseFloat(PricingDetails[0]["ZF00"]) > 0) {
                    //    $('#FreightAmt').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    //    $('#FreightAmt_html').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    //} else {
                    //    $("#lblFreightAmt").hide(); $("#FreightAmt").hide();
                    //    $("#lblFreightAmt_html").hide(); $("#FreightAmt_html").hide();
                    //}


                    JCST += parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    Turnover = parseFloat(Number(PricingDetails[0]["ASS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JEXP"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    $('#TaxTornover').text(Number(0).toFixed(2));
                    $('#TaxTornover_html').text(Number(0).toFixed(2));
                    var Total_Wt_Fr = parseFloat(Number(Turnover).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JCST"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZGTA"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZSSC"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                    $('#Total').text(Number(0).toFixed(2));
                    $('#Total_html').text(Number(0).toFixed(2));
                    TotalFr = parseFloat(Number(Total_Wt_Fr).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZINS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    $('#TotalFr').text(Number(0).toFixed(2));
                    $('#TotalFr_html').text(Number(0).toFixed(2));
                    $('#TotalAmountRound').text(Math.round(Number(0).toFixed(2)) + ".00");
                    $('#TotalAmountRound_html').text(Math.round(Number(0).toFixed(2)) + ".00");
                    $('#ExciseAmtInWords').text(toWordsINVOICE(Number(PricingDetails[0]["JEXP"]).toFixed(2)));
                    $('#ExciseAmtInWords_html').text(toWordsINVOICE(Number(PricingDetails[0]["JEXP"]).toFixed(2)));
                    $('#TotalAmtInWords').text(toWordsINVOICE(Number(0).toFixed(2)));
                    $('#TotalAmtInWords_html').text(toWordsINVOICE(Number(0).toFixed(2)));
                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }

            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

//Invoice ZFOC Depo Details
DIMS.controller('InvoiceDetail_ZFOC_DepoCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {
                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;

                    //Sales Order

                    // $scope.BillingDoc = Header[0]["Billing Doc No."];
                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);
                    var ExciseInvdate = Header[0]["EXCISE_INV_DATE"].split('/');
                    // $scope.BillingDate = Header[0]["Billing Date"];
                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    //$scope.SalesOrderNo = Header[0]["Sales Order"];
                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    //$scope.CINNo = "L74999TG1955PLC000656";

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    //$scope.SoldTo = Header[0]["Sold To"];
                    var Soldto = Header[0]["Sold To"];
                    $('#SoldTo').text(Soldto);
                    $('#SoldTo_html').text(Soldto);
                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    //Date of Preperation
                    var DOP = Header[0]["Billing Date"].split('/');
                    var DOT = Header[0]["Time"];
                    var ss = DOT.split(":");
                    var dt = new Date();
                    dt.setHours(ss[0]);
                    dt.setMinutes(ss[1]);
                    dt.setSeconds(ss[2]);
                    var dt2 = new Date(dt.valueOf() + 40000);
                    var DOT_Time = dt2.toTimeString().split(" ")[0];

                    //$('#DOPrep').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //$('#DOPrep_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //Date of Removal
                    //$('#DORemoval').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);
                    //$('#DORemoval_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);

                    $('#Delivery').text("EX Depot");
                    $('#Delivery_html').text("EX Depot");


                    $('#GrossAmnt').text(Header[0]["Gross Amount"]);



                    // $('#NetWeight').text(Header[0]["NET_WT"]);
                    $('#PaymentTerms').text(Header[0]["PAYMENT_TERMS"]);
                    $('#PaymentTerms_html').text(Header[0]["PAYMENT_TERMS"]);
                    $('#LRRNo').text(Header[0]["LR_NO"]);
                    $('#LRRNo_html').text(Header[0]["LR_NO"]);
                    $('#TransporterName').text(Header[0]["Transporter Name"]);
                    $('#TransporterName_html').text(Header[0]["Transporter Name"]);
                    $('#LorryNum').text(Header[0]["VEHICLE_NO"]);
                    $('#LorryNum_html').text(Header[0]["VEHICLE_NO"]);
                    $('#OBDNum').text(Header[0]["DELIVERY_NO"]);
                    $('#OBDNum_html').text(Header[0]["DELIVERY_NO"]);

                    if ((Header[0]["Delivery"] == "ZFR") || (Header[0]["Delivery"] == "FOR")) {
                        $("#lblInsuranceText_html").text("Insurance and Transportaion is being arranged on customer's request");
                    } else if (Header[0]["Delivery"] == "EXT") {
                        $("#lblInsuranceText_html").text("Freight to be paid to Transporter directly");
                    }

                    var BillToDetails = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var BillToDetails_html = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails_html += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"] + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //  var ShipperDetails = Shipper[0][""]


                    var ShipperDetails = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var ShipperDetails_html = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails_html += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"] + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";


                    var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    var PlantDetails_html = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " <br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    $('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);


                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);
                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";

                        $("#lblChapter_Id_html").text(ChildTable[0]["CHAPTER_ID"]);
                        $("#lblChapter_Desc_html").text(ChildTable[0]["CHAPTER_DESC"]);
                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(0).toFixed(2);
                                }, 0)
                            );
                        }
                    });
                    $("#Zinv_Depo_header").remove();
                    $("#Zinv_Depo_header_html").remove();
                    $("#Zfoc_Depo_Footer_Header_html").remove();


                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var AssessableValue = 0;
                    var ExiceDuty = 0;
                    var EntryTax = 0;
                    var Turnover = 0;
                    var JCST = 0;
                    var ZSSC = 0;
                    var StateAddTax = 0;
                    var InsuranceTPND = 0;
                    var FreightAmt = 0;
                    var TotalFr = 0;
                    if (parseFloat(PricingDetails[0]["DISC"]) > 0) {
                        $('#Discount').text(Number(PricingDetails[0]["DISC"]).toFixed(2));
                    } else {
                        $("#lblDiscount").hide(); $("#Discount").hide();
                        $("#lblDiscount_html").hide(); $("#Discount_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["JCST"]) > 0) {
                        $("#lblAgainstCFORM").html("CST :");
                        $("#lblAgainstCFORM_html").html("CST :");
                        $('#AgainstCFORM').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                        $('#AgainstCFORM_html').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                    }
                    else {
                        if (parseFloat(PricingDetails[0]["ZVAT"]) > 0) {
                            $("#lblAgainstCFORM").html("VAT :");
                            $("#lblAgainstCFORM_html").html("VAT :");
                            $('#AgainstCFORM').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                            $('#AgainstCFORM_html').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                        } else {
                            $("#lblAgainstCFORM").hide(); $("#AgainstCFORM").hide();
                            $("#lblAgainstCFORM_html").hide(); $("#AgainstCFORM_html").hide();
                        }
                    }




                    if (Number(PricingDetails[0]["ZSSC"].toString()).toFixed(2) == "0.00") {
                        $("#idSteteSess").hide();
                        $("#idSteteSess_html").hide();

                    }
                    else {
                        $('#SteteSec').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $('#SteteSec_html').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $("#lblSteteSec").html("State Sec Cess  :");
                        $("#lblSteteSec_html").html("State Sec Cess  :");
                    }

                    if (Number(PricingDetails[0]["ZGTA"].toString()).toFixed(2) == "0.00") {
                        $("#idStateAddTax").hide();
                        $("#idStateAddTax_html").hide();
                    } else {
                        $('#StateAddTax').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                        $('#StateAddTax_html').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));

                        $("#lblStateAddTax").html("State Add Tax  :");
                        $("#lblStateAddTax_html").html("State Add Tax  :");
                    }
                    if (parseFloat(PricingDetails[0]["ASS"]) > 0) {
                        $('#AssessableValue').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                        $('#AssessableValue_html').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    } else {
                        $("#lblAssessableValue").hide(); $("#AssessableValue").hide();
                        $("#lblAssessableValue_html").hide(); $("#AssessableValue_html").hide();
                    }
                    //$('#ExiceDuty').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                    //if (Number(PricingDetails[0]["ZETX"].toString()).toFixed(2) == "0.00") {
                    //    $("#idEntryTax").hide();
                    //    $("#idEntryTax_html").hide();
                    //} else {
                    //    $('#EntryTax').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    //    $('#EntryTax_html').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    //}

                    if (parseFloat(PricingDetails[0]["ZINS"]) > 0) {
                        $('#InsuranceTPND').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                        $('#InsuranceTPND_html').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                    } else { $("#lblInsuranceTPND").hide(); $("#InsuranceTPND").hide(); $("#lblInsuranceTPND_html").hide(); $("#InsuranceTPND_html").hide(); }
                    if (parseFloat(PricingDetails[0]["ZF00"]) > 0) {
                        $('#FreightAmt').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                        $('#FreightAmt_html').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    } else {
                        $("#lblFreightAmt").hide(); $("#FreightAmt").hide();
                        $("#lblFreightAmt_html").hide(); $("#FreightAmt_html").hide();
                    }


                    JCST += parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    Turnover = parseFloat(Number(PricingDetails[0]["ASS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JEXP"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    $('#TaxTornover').text(Number(0).toFixed(2));
                    $('#TaxTornover_html').text(Number(0).toFixed(2));
                    var Total_Wt_Fr = parseFloat(Number(Turnover).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JCST"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZGTA"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZSSC"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                    $('#Total').text(Number(0).toFixed(2));
                    $('#Total_html').text(Number(0).toFixed(2));
                    TotalFr = parseFloat(Number(Total_Wt_Fr).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZINS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    $('#TotalFr').text(Number(0).toFixed(2));
                    $('#TotalFr_html').text(Number(0).toFixed(2));
                    $('#TotalAmountRound').text(Math.round(Number(0).toFixed(2)) + ".00");
                    $('#TotalAmountRound_html').text(Math.round(Number(0).toFixed(2)) + ".00");
                    $('#TotalAmtInWords').text(toWordsINVOICE(Number(0).toFixed(2)));
                    $('#TotalAmtInWords_html').text(toWordsINVOICE(Number(0).toFixed(2)));
                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }

            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

//Invoice ZINV Plant Details
DIMS.controller('InvoiceDetail_ZINV_Plant_GSTCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;


        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            //var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            // var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {

                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;


                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);


                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);

                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    $("#lblPhoneNo").text(Plant[0]["PHONE1"]);
                    $("#lblPhoneNo_html").text(Plant[0]["PHONE1"]);

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    $("#lblGSTINNo").text(Plant[0]["GSTIN_NO"]);
                    $("#lblGSTINNo_html").text(Plant[0]["GSTIN_NO"]);
                    $("#lblPANNo").text(Plant[0]["PAN_NO"]);
                    $("#lblPANNo_html").text(Plant[0]["PAN_NO"]);
                    $("#lblplantEmail").text(Plant[0]["EMAIL"]);
                    $("#lblplantEmail_html").text(Plant[0]["EMAIL"]);

                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    // $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    // $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);


                    var BillToDetails = "<b>Bill to Party</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "-" + Biller[0]["STOCKIST_NAME"] + " </br>";
                    BillToDetails += Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["PAN_NO"] + "" + "</br>" + "Phone Number &nbsp;:" + Biller[0]["PHONE1"] + "</br>";

                    var BillToDetails_html = "<b>Bill to Party</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "-" + Biller[0]["STOCKIST_NAME"] + " </br>";
                    BillToDetails_html += Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["PAN_NO"] + "" + "</br>" + "Phone Number &nbsp; &nbsp;:" + Biller[0]["PHONE1"] + "</br>";

                    var ShipperDetails = "<b>Place of Supply</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "-" + Shipper[0]["STOCKIST_NAME"] + "</br>";
                    ShipperDetails += Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["PAN_NO"] + "</br>" + "Phone Number &nbsp;:" + Shipper[0]["PHONE1"] + "</br>";

                    var ShipperDetails_html = "<b>Place of Supply</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "-" + Shipper[0]["STOCKIST_NAME"] + "</br>";
                    ShipperDetails_html += Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["PAN_NO"] + "</br>" + "Phone Number &nbsp; &nbsp;:" + Shipper[0]["PHONE1"] + "</br>";


                    //var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone:" + Plant[0]["PHONE1"] + "</br>" + "TIN No.:" + Plant[0]["TIN_NO"] + "</br>" + "CST No.:" + Plant[0]["CST_NO"];
                    var PlantDetails = "Invoice Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Plant[0]["DOC_NO"] + "</br>" + "Invoice Date &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + "</br>" + "SO Number & Date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + parseInt(SO_No[0]) + ' & ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3] + "</br>" + "Order Ref & Dt.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + OR_Date[0] + " & " + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3] + "</br>" + "Delivery / OBD Number  &nbsp; &nbsp;: " + Header[0]["DELIVERY_NO"] + "</br>" + "L/C Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + "</br>" + "Payment Terms  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Header[0]["PAYMENT_TERMS"] + "" + "</br>" + "Delivery (Inco Terms)  &nbsp;  &nbsp; &nbsp; &nbsp;: Ex Works";

                    var PlantDetails_html = "Invoice Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Plant[0]["DOC_NO"] + "</br>" + "Invoice Date &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + "</br>" + "SO Number & Date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + parseInt(SO_No[0]) + ' & ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3] + "</br>" + "Order Ref & Dt.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + OR_Date[0] + " & " + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3] + "</br>" + "Delivery / OBD Number  &nbsp; &nbsp;: " + Header[0]["DELIVERY_NO"] + "</br>" + "L/C Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + "</br>" + "Payment Terms  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Header[0]["PAYMENT_TERMS"] + "" + "</br>" + "Delivery (Inco Terms)  &nbsp;  &nbsp; &nbsp; &nbsp;: Ex Works";



                    var htc = '<tr><td>' + BillToDetails + '</td>';
                    htc += '<td>' + ShipperDetails + '</td></tr>';
                    $('#tbl_Inv_Stockist').append(htc);

                    var htc_html = '<tr><td>' + BillToDetails_html + '</td>';
                    htc_html += '<td>' + ShipperDetails_html + '</td></tr>';
                    $('#tbl_Inv_Stockist_html').append(htc_html);



                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);


                    //$('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    //$('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);



                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);

                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"] + "<br/> HSN No - " + ChildTable[i]["HSN_NO"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2), parseFloat(ChildTable[i]["DISCOUNT"]).toFixed(2), parseFloat(ChildTable[i]["TAX_AMOUNT"]).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + " HSN No - " + ChildTable[i]["HSN_NO"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["DISCOUNT"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["TAX_AMOUNT"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                            $(api.column(8).footer()).html(
                                api.column(8).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                            $(api.column(9).footer()).html(
                                api.column(9).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                        }
                    });

                    // $("#Zinv_Plant_Footer_Header_html").remove();
                    $("#lblChapter_Id").text(ChildTable[0]["CHAPTER_ID"]);
                    $("#lblChapter_Id_html").text(ChildTable[0]["CHAPTER_ID"]);
                    $("#lblChapter_Desc").text(ChildTable[0]["CHAPTER_DESC"]);
                    $("#lblChapter_Desc_html").text(ChildTable[0]["CHAPTER_DESC"]);

                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var transportDetails = "Date & Time of Preperation : " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + " & " + Header[0]["Time"] + "</br>" + "Transporter Name &nbsp;&nbsp;&nbsp;&nbsp;: " + Header[0]["Transporter Name"] + "</br>" + "LR/RR No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: " + Header[0]["LR_NO"] + "</br>" + "Lorry/Wagon No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Header[0]["VEHICLE_NO"] + "</br>" + "Gross Weight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )" + "</br>" + "Net Weight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )" + "</br>" + "E-Way Bill No  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Header[0]["ZZEWAY_BILLNO"] + "";

                    var transportDetails_html = "Date & Time of Preperation : " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + " & " + Header[0]["Time"] + "</br>" + "Transporter Name : " + Header[0]["Transporter Name"] + "</br>" + "LR/RR No : " + Header[0]["LR_NO"] + "</br>" + "Lorry/Wagon No : " + Header[0]["VEHICLE_NO"] + "</br>" + "Gross Weight : " + GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )" + "</br>" + "Net Weight : " + NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )" + "</br>" + "E-Way Bill No : " + Header[0]["ZZEWAY_BILLNO"] + "";


                    var ht = '<tr ><td>' + PlantDetails + '</td>';
                    ht += '<td>' + transportDetails + '</td></tr>';
                    $('#tbl_Inv_Details').append(ht);

                    var ht_html = '<tr><td >' + PlantDetails_html + '</td>';
                    ht_html += '<td>' + transportDetails_html + '</td></tr>';
                    $('#tbl_Inv_Details_html').append(ht_html);



                    var IgsttotAmt = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["IGST"])).toFixed(2);
                    var IgsttotAmt_html = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["IGST"])).toFixed(2);
                    var totAmt = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);
                    var totAmt_html = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);


                    $("#cgstp").text("@ " + Header[0]["CGSTP"] + " %");
                    $("#cgstp_html").text("@ " + Header[0]["CGSTP"] + " %");
                    $("#sgstp").text("@ " + Header[0]["SGSTP"] + " %");
                    $("#sgstp_html").text("@ " + Header[0]["SGSTP"] + " %");
                    $("#cgstamt").text(Header[0]["CGST"]);
                    $("#cgstamt_html").text(Header[0]["CGST"]);
                    $("#sgstamt").text(Header[0]["SGST"]);
                    $("#sgstamt_html").text(Header[0]["SGST"]);
                    $("#totAmt").text(totAmt);
                    $("#totAmt_html").text(totAmt_html);
                    $("#totAmtrnd").text(Math.round(Number(totAmt).toFixed(2)) + ".00");
                    $("#totAmtrnd_html").text(Math.round(Number(totAmt_html).toFixed(2)) + ".00");
                    $("#Igstp").text("@ " + Header[0]["IGSTP"] + " %");
                    $("#Igstp_html").text("@ " + Header[0]["IGSTP"] + " %");
                    $("#Igstamt").text(Header[0]["IGST"]);
                    $("#Igstamt_html").text(Header[0]["IGST"]);
                    $("#IgsttotAmt").text(IgsttotAmt);
                    $("#IgsttotAmt_html").text(IgsttotAmt_html);
                    $("#IgsttotAmtrnd").text(Math.round(Number(IgsttotAmt).toFixed(2)) + ".00");
                    $("#IgsttotAmtrnd_html").text(Math.round(Number(IgsttotAmt_html).toFixed(2)) + ".00");


                    if (parseFloat(Header[0]["IGST"]) == 0 || Header[0]["IGST"] == "" || Header[0]["IGST"] == undefined) {
                        $("#cgstsection").show();
                        $("#cgstsection_html").show();
                        $('#TotalAmtInWords').text(toWordsINVOICE(parseFloat($("#totAmtrnd").text())));
                        $('#TotalAmtInWords_html').text(toWordsINVOICE(parseFloat($("#totAmtrnd_html").text())));
                        var adda = parseFloat(parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);
                        var adda_html = parseFloat(parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);
                        $("#totaltaxamountinwords").text(toWordsINVOICE(adda));
                        $("#totaltaxamountinwords_html").text(toWordsINVOICE(adda_html));
                    }
                    else {
                        $("#igstsection").show();
                        $("#igstsection_html").show();
                        $('#TotalAmtInWords').text(toWordsINVOICE(parseFloat($("#IgsttotAmtrnd").text())));
                        $('#TotalAmtInWords_html').text(toWordsINVOICE(parseFloat($("#IgsttotAmtrnd_html").text())));
                        $("#totaltaxamountinwords").text(toWordsINVOICE(parseFloat(Header[0]["IGST"])));
                        $("#totaltaxamountinwords_html").text(toWordsINVOICE(parseFloat(Header[0]["IGST"])));
                    }


                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }


            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

//Invoice ZINV Depo Details
DIMS.controller('InvoiceDetail_ZINV_Depo_GSTCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {
                alert(response);
                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;

                    //Sales Order

                    alert(Header[0]["EXCISE_DIVISION"]);

                    // $scope.BillingDoc = Header[0]["Billing Doc No."];
                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);
                    var ExciseInvdate = Header[0]["EXCISE_INV_DATE"].split('/');
                    // $scope.BillingDate = Header[0]["Billing Date"];
                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    //$scope.SalesOrderNo = Header[0]["Sales Order"];
                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    //$scope.CINNo = "L74999TG1955PLC000656";

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    //$scope.SoldTo = Header[0]["Sold To"];
                    var Soldto = Header[0]["Sold To"];
                    $('#SoldTo').text(Soldto);
                    $('#SoldTo_html').text(Soldto);
                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    //Date of Preperation
                    var DOP = Header[0]["Billing Date"].split('/');

                    var DOT = Header[0]["Time"];
                    var ss = DOT.split(":");
                    var dt = new Date();
                    dt.setHours(ss[0]);
                    dt.setMinutes(ss[1]);
                    dt.setSeconds(ss[2]);
                    var dt2 = new Date(dt.valueOf() + 40000);
                    var DOT_Time = dt2.toTimeString().split(" ")[0];

                    // $('#DOPrep').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //$('#DOPrep_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //Date of Removal
                    //$('#DORemoval').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);
                    //$('#DORemoval_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);

                    $('#Delivery').text("EX Depot");
                    $('#Delivery_html').text("EX Depot");


                    $('#GrossAmnt').text(Header[0]["Gross Amount"]);



                    // $('#NetWeight').text(Header[0]["NET_WT"]);
                    $('#PaymentTerms').text(Header[0]["PAYMENT_TERMS"]);
                    $('#PaymentTerms_html').text(Header[0]["PAYMENT_TERMS"]);
                    $('#LRRNo').text(Header[0]["LR_NO"]);
                    $('#LRRNo_html').text(Header[0]["LR_NO"]);
                    $('#TransporterName').text(Header[0]["Transporter Name"]);
                    $('#TransporterName_html').text(Header[0]["Transporter Name"]);
                    $('#LorryNum').text(Header[0]["VEHICLE_NO"]);
                    $('#LorryNum_html').text(Header[0]["VEHICLE_NO"]);
                    $('#OBDNum').text(Header[0]["DELIVERY_NO"]);
                    $('#OBDNum_html').text(Header[0]["DELIVERY_NO"]);

                    if ((Header[0]["Delivery"] == "ZFR") || (Header[0]["Delivery"] == "FOR")) {
                        $("#lblInsuranceText_html").text("Insurance and Transportation is being arranged on customer's request");
                    } else if (Header[0]["Delivery"] == "EXT") {
                        $("#lblInsuranceText_html").text("Freight to be paid to Transporter directly");
                    }


                    var BillToDetails = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var BillToDetails_html = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails_html += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"] + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //  var ShipperDetails = Shipper[0][""]


                    var ShipperDetails = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var ShipperDetails_html = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails_html += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"] + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";


                    var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    var PlantDetails_html = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);



                    $('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    $('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);


                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);
                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                        }
                    });
                    $("#Zinv_Depo_header").remove();
                    $("#Zinv_Depo_header_html").remove();
                    $("#Zinv_Depo_Footer_Header_html").remove();


                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var AssessableValue = 0;
                    var ExiceDuty = 0;
                    var EntryTax = 0;
                    var Turnover = 0;
                    var JCST = 0;
                    var ZSSC = 0;
                    var StateAddTax = 0;
                    var InsuranceTPND = 0;
                    var FreightAmt = 0;
                    var TotalFr = 0;
                    if (parseFloat(PricingDetails[0]["DISC"]) > 0) {
                        $('#Discount').text(Number(PricingDetails[0]["DISC"]).toFixed(2));
                    } else {
                        $("#lblDiscount").hide(); $("#Discount").hide();
                        $("#lblDiscount_html").hide(); $("#Discount_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["JCST"]) > 0) {
                        if (PricingDetails[0]["STK_PRC_GRP"] == "Z1") {
                            $("#lblAgainstCFORM").html("CST @ " + PricingDetails[0]["JCSTP"] + "% (against CFORM) :"); $("#lblAgainstCFORM_html").html("CST @ " + PricingDetails[0]["JCSTP"] + "% (against CFORM) :");
                        } else {
                            $("#lblAgainstCFORM").html("CST @ " + PricingDetails[0]["JCSTP"] + "% :"); $("#lblAgainstCFORM_html").html("CST @ " + PricingDetails[0]["JCSTP"] + "% :");
                        }
                        $('#AgainstCFORM').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                        $('#AgainstCFORM_html').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                    }
                    else {
                        if (parseFloat(PricingDetails[0]["ZVAT"]) > 0) {
                            $("#lblAgainstCFORM").html("VAT @ " + PricingDetails[0]["ZVATP"] + "% :");
                            $("#lblAgainstCFORM_html").html("VAT @ " + PricingDetails[0]["ZVATP"] + "% :");
                            $('#AgainstCFORM').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                            $('#AgainstCFORM_html').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                        } else {
                            $("#lblAgainstCFORM").hide(); $("#AgainstCFORM").hide();
                            $("#lblAgainstCFORM_html").hide(); $("#AgainstCFORM_html").hide();
                        }
                    }




                    if (Number(PricingDetails[0]["ZSSC"].toString()).toFixed(2) == "0.00") {
                        $("#idSteteSess").hide();
                        $("#idSteteSess_html").hide();

                    }
                    else {
                        $('#SteteSec').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $('#SteteSec_html').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $("#lblSteteSec").html("State Sec Cess @ " + PricingDetails[0]["ZSSCP"] + "% :");
                        $("#lblSteteSec_html").html("State Sec Cess @ " + PricingDetails[0]["ZSSCP"] + "% :");
                    }

                    if (Number(PricingDetails[0]["ZGTA"].toString()).toFixed(2) == "0.00") {
                        $("#idStateAddTax").hide();
                        $("#idStateAddTax_html").hide();
                    } else {
                        $('#StateAddTax').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                        $('#StateAddTax_html').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                        $("#lblSteteSec").html("State Add Tax @ " + PricingDetails[0]["ZGTAP"] + "% :");
                        $("#lblStateAddTax_html").html("State Add Tax @ " + PricingDetails[0]["ZGTAP"] + "% :");
                    }
                    if (parseFloat(PricingDetails[0]["ASS"]) > 0) {
                        $('#AssessableValue').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                        $('#AssessableValue_html').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    } else {
                        $("#lblAssessableValue").hide(); $("#AssessableValue").hide();
                        $("#lblAssessableValue_html").hide(); $("#AssessableValue_html").hide();
                    }
                    //$('#ExiceDuty').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                    if ((Number(PricingDetails[0]["ZETX"].toString()).toFixed(2) == "0.00") && (Number(PricingDetails[0]["ZETO"].toString()).toFixed(2) == "0.00")) {
                        $("#idEntryTax").hide();
                        $("#idEntryTax_html").hide();
                        $("#idOrissaTax").hide();
                        $("#idOrissaTax_html").hide();
                    } else {
                        if (Number(PricingDetails[0]["ZETOP"].toString()).toFixed(2) == "0.00") {
                            $('#EntryTax').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                            $('#EntryTax_html').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                        } else {
                            //$('#EntryTax').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            //$('#EntryTax_html').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            $('#OrissaTax').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                            $('#OrissaTax_html').text(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                        }

                        if (Number(PricingDetails[0]["ZETOP"].toString()).toFixed(2) == "0.00") {
                            $("#lblEntryTax").html("Entry Tax @ " + PricingDetails[0]["ZETXP"] + "% :");
                            $("#lblEntryTax_html").html("Entry Tax @ " + PricingDetails[0]["ZETXP"] + "% :");
                        } else {
                            $("#lblOrissaTax").html("Orissa Entry Tax @ " + PricingDetails[0]["ZETOP"] + "% :");
                            $("#lblOrissaTax_html").html("Orissa Entry Tax @ " + PricingDetails[0]["ZETOP"] + "% :");
                        }

                    }

                    if (parseFloat(PricingDetails[0]["ZINS"]) > 0) {
                        $('#InsuranceTPND').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                        $('#InsuranceTPND_html').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));

                        $("#lblInsuranceTPND").html("Insurance (TPND) @ " + PricingDetails[0]["ZINSP"] + "% :");
                        $("#lblInsuranceTPND_html").html("Insurance (TPND) @ " + PricingDetails[0]["ZINSP"] + "% :");
                    } else {
                        $("#lblInsuranceTPND").hide(); $("#InsuranceTPND").hide();
                        $("#lblInsuranceTPND_html").hide(); $("#InsuranceTPND_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["ZF00"]) > 0) {
                        $('#FreightAmt').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                        $('#FreightAmt_html').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    } else {
                        $("#lblFreightAmt").hide(); $("#FreightAmt").hide();
                        $("#lblFreightAmt_html").hide(); $("#FreightAmt_html").hide();
                    }


                    JCST += parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    Turnover = parseFloat(Number(PricingDetails[0]["ASS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JEXP"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    $('#TaxTornover').text(Number(Turnover).toFixed(2));
                    $('#TaxTornover_html').text(Number(Turnover).toFixed(2));
                    var Total_Wt_Fr = parseFloat(Number(Turnover).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JCST"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZGTA"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZSSC"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                    $('#Total').text(parseFloat(Number(Total_Wt_Fr).toFixed(2)));
                    $('#Total_html').text(parseFloat(Number(Total_Wt_Fr).toFixed(2)));
                    TotalFr = parseFloat(Number(Total_Wt_Fr).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZINS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    $('#TotalFr').text(Number(TotalFr).toFixed(2));
                    $('#TotalFr_html').text(Number(TotalFr).toFixed(2));

                    $('#TotalAmountRound').text(Math.round(Number(Total_Wt_Fr).toFixed(2)) + ".00");
                    //$('#TotalAmountRound_html').text(Math.round((Header[0]["Gross Amount"]).toFixed(2)) + ".00");
                    $('#TotalAmountRound_html').text(Math.round(Number(Total_Wt_Fr).toFixed(2)) + ".00");

                    $('#TotalAmtInWords').text(toWordsINVOICE(Number(Header[0]["Gross Amount"]).toFixed(2)));
                    $('#TotalAmtInWords_html').text(toWordsINVOICE(Number(Header[0]["Gross Amount"]).toFixed(2)));
                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }

            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

//Invoice ZFOC Plant Details
DIMS.controller('InvoiceDetail_ZFOC_Plant_GSTCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;


        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            //var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            // var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {

                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;


                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);


                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);

                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    $("#lblPhoneNo").text(Plant[0]["PHONE1"]);
                    $("#lblPhoneNo_html").text(Plant[0]["PHONE1"]);

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    $("#lblGSTINNo").text(Plant[0]["GSTIN_NO"]);
                    $("#lblGSTINNo_html").text(Plant[0]["GSTIN_NO"]);
                    $("#lblPANNo").text(Plant[0]["PAN_NO"]);
                    $("#lblPANNo_html").text(Plant[0]["PAN_NO"]);
                    $("#lblplantEmail").text(Plant[0]["EMAIL"]);
                    $("#lblplantEmail_html").text(Plant[0]["EMAIL"]);

                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    // $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    // $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);


                    var BillToDetails = "<b>Bill to Party</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "-" + Biller[0]["STOCKIST_NAME"] + " </br>";
                    BillToDetails += Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["PAN_NO"] + "" + "</br>" + "Phone Number &nbsp;:" + Biller[0]["PHONE1"] + "</br>";

                    var BillToDetails_html = "<b>Bill to Party</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "-" + Biller[0]["STOCKIST_NAME"] + " </br>";
                    BillToDetails_html += Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Biller[0]["PAN_NO"] + "" + "</br>" + "Phone Number &nbsp; &nbsp;:" + Biller[0]["PHONE1"] + "</br>";

                    var ShipperDetails = "<b>Place of Supply</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "-" + Shipper[0]["STOCKIST_NAME"] + "</br>";
                    ShipperDetails += Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["PAN_NO"] + "</br>" + "Phone Number &nbsp;:" + Shipper[0]["PHONE1"] + "</br>";

                    var ShipperDetails_html = "<b>Place of Supply</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "-" + Shipper[0]["STOCKIST_NAME"] + "</br>";
                    ShipperDetails_html += Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "TIN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["TIN_NO"] + "</br>" + "GST Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["GST_NO"] + "</br>" + "PAN Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Shipper[0]["PAN_NO"] + "</br>" + "Phone Number &nbsp; &nbsp;:" + Shipper[0]["PHONE1"] + "</br>";


                    //var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone:" + Plant[0]["PHONE1"] + "</br>" + "TIN No.:" + Plant[0]["TIN_NO"] + "</br>" + "CST No.:" + Plant[0]["CST_NO"];
                    var PlantDetails = "Invoice Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Plant[0]["DOC_NO"] + "</br>" + "Invoice Date &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + "</br>" + "SO Number & Date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + parseInt(SO_No[0]) + ' & ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3] + "</br>" + "Order Ref & Dt.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + OR_Date[0] + " & " + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3] + "</br>" + "Delivery / OBD Number  &nbsp; &nbsp;: " + Header[0]["DELIVERY_NO"] + "</br>" + "L/C Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + "</br>" + "Payment Terms  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Header[0]["PAYMENT_TERMS"] + "" + "</br>" + "Delivery (Inco Terms)  &nbsp;  &nbsp; &nbsp; &nbsp;: Ex Works";

                    var PlantDetails_html = "Invoice Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Plant[0]["DOC_NO"] + "</br>" + "Invoice Date &nbsp; &nbsp;  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + "</br>" + "SO Number & Date &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + parseInt(SO_No[0]) + ' & ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3] + "</br>" + "Order Ref & Dt.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + OR_Date[0] + " & " + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3] + "</br>" + "Delivery / OBD Number  &nbsp; &nbsp;: " + Header[0]["DELIVERY_NO"] + "</br>" + "L/C Number  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + "</br>" + "Payment Terms  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + Header[0]["PAYMENT_TERMS"] + "" + "</br>" + "Delivery (Inco Terms)  &nbsp;  &nbsp; &nbsp; &nbsp;: Ex Works";



                    var htc = '<tr><td>' + BillToDetails + '</td>';
                    htc += '<td>' + ShipperDetails + '</td></tr>';
                    $('#tbl_Inv_Stockist').append(htc);

                    var htc_html = '<tr><td>' + BillToDetails_html + '</td>';
                    htc_html += '<td>' + ShipperDetails_html + '</td></tr>';
                    $('#tbl_Inv_Stockist_html').append(htc_html);



                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);


                    //$('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    //$('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);



                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);

                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"] + "<br/> HSN No - " + ChildTable[i]["HSN_NO"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2), parseFloat(ChildTable[i]["DISCOUNT"]).toFixed(2), parseFloat(ChildTable[i]["TAX_AMOUNT"]).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + " HSN No - " + ChildTable[i]["HSN_NO"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["DISCOUNT"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["TAX_AMOUNT"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                            $(api.column(8).footer()).html(
                                api.column(8).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                            $(api.column(9).footer()).html(
                                api.column(9).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(res).toFixed(2);
                                }, 0)
                            );
                        }
                    });

                    // $("#Zinv_Plant_Footer_Header_html").remove();
                    $("#lblChapter_Id").text(ChildTable[0]["CHAPTER_ID"]);
                    $("#lblChapter_Id_html").text(ChildTable[0]["CHAPTER_ID"]);
                    $("#lblChapter_Desc").text(ChildTable[0]["CHAPTER_DESC"]);
                    $("#lblChapter_Desc_html").text(ChildTable[0]["CHAPTER_DESC"]);

                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var transportDetails = "Date & Time of Preperation : " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + " & " + Header[0]["Time"] + "</br>" + "Transporter Name &nbsp;&nbsp;&nbsp;&nbsp;: " + Header[0]["Transporter Name"] + "</br>" + "LR/RR No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: " + Header[0]["LR_NO"] + "</br>" + "Lorry/Wagon No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Header[0]["VEHICLE_NO"] + "</br>" + "Gross Weight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )" + "</br>" + "Net Weight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )" + "</br>" + "E-Way Bill No  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Header[0]["ZZEWAY_BILLNO"] + "";

                    var transportDetails_html = "Date & Time of Preperation : " + Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2] + " & " + Header[0]["Time"] + "</br>" + "Transporter Name : " + Header[0]["Transporter Name"] + "</br>" + "LR/RR No : " + Header[0]["LR_NO"] + "</br>" + "Lorry/Wagon No : " + Header[0]["VEHICLE_NO"] + "</br>" + "Gross Weight : " + GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )" + "</br>" + "Net Weight : " + NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )" + "</br>" + "E-Way Bill No : " + Header[0]["ZZEWAY_BILLNO"] + "";


                    var ht = '<tr ><td>' + PlantDetails + '</td>';
                    ht += '<td>' + transportDetails + '</td></tr>';
                    $('#tbl_Inv_Details').append(ht);

                    var ht_html = '<tr><td >' + PlantDetails_html + '</td>';
                    ht_html += '<td>' + transportDetails_html + '</td></tr>';
                    $('#tbl_Inv_Details_html').append(ht_html);



                    var IgsttotAmt = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["IGST"])).toFixed(2);
                    var IgsttotAmt_html = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["IGST"])).toFixed(2);
                    var totAmt = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);
                    var totAmt_html = parseFloat(parseFloat($("#testtot").text()) + parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);


                    $("#cgstp").text("@ " + Header[0]["CGSTP"] + " %");
                    $("#cgstp_html").text("@ " + Header[0]["CGSTP"] + " %");
                    $("#sgstp").text("@ " + Header[0]["SGSTP"] + " %");
                    $("#sgstp_html").text("@ " + Header[0]["SGSTP"] + " %");
                    $("#cgstamt").text(Header[0]["CGST"]);
                    $("#cgstamt_html").text(Header[0]["CGST"]);
                    $("#sgstamt").text(Header[0]["SGST"]);
                    $("#sgstamt_html").text(Header[0]["SGST"]);
                    $("#totAmt").text("0.00");
                    $("#totAmt_html").text("0.00");
                    $("#totAmtrnd").text("0.00");
                    $("#totAmtrnd_html").text("0.00");
                    $("#Igstp").text("@ " + Header[0]["IGSTP"] + " %");
                    $("#Igstp_html").text("@ " + Header[0]["IGSTP"] + " %");
                    $("#Igstamt").text(Header[0]["IGST"]);
                    $("#Igstamt_html").text(Header[0]["IGST"]);
                    $("#IgsttotAmt").text("0.00");
                    $("#IgsttotAmt_html").text("0.00");
                    $("#IgsttotAmtrnd").text("0.00");
                    $("#IgsttotAmtrnd_html").text("0.00");


                    if (parseFloat(Header[0]["IGST"]) == 0 || Header[0]["IGST"] == "" || Header[0]["IGST"] == undefined) {
                        $("#cgstsection").show();
                        $("#cgstsection_html").show();
                        $('#TotalAmtInWords').text("Nil");
                        $('#TotalAmtInWords_html').text("Nil");
                        var adda = parseFloat(parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);
                        var adda_html = parseFloat(parseFloat(Header[0]["CGST"]) + parseFloat(Header[0]["SGST"])).toFixed(2);
                        $("#totaltaxamountinwords").text(toWordsINVOICE(adda));
                        $("#totaltaxamountinwords_html").text(toWordsINVOICE(adda_html));
                    }
                    else {
                        $("#igstsection").show();
                        $("#igstsection_html").show();
                        $('#TotalAmtInWords').text("Nil");
                        $('#TotalAmtInWords_html').text("Nil");
                        $("#totaltaxamountinwords").text(toWordsINVOICE(parseFloat(Header[0]["IGST"])));
                        $("#totaltaxamountinwords_html").text(toWordsINVOICE(parseFloat(Header[0]["IGST"])));
                    }


                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }


            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

//Invoice ZFOC Depo Details
DIMS.controller('InvoiceDetail_ZFOC_Depo_GSTCtrl', function ($scope, $location, DIMSFactory, $http, $compile, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Invoice details" };
    MasterScope = $scope;
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

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
        } else {
            var decryptedID = CryptoJS.AES.decrypt(EditId, "Secret Passphrase");
            var decryptedDocNo = decryptedID.toString(CryptoJS.enc.Utf8);
            ShowLoader();
            $http({
                method: 'POST',
                url: '../../SAP/Invoice_Details_Edit',
                data: { val: EditId }
            }).then(function successCallback(response) {
                var Data = response.data.tabledata;
                Data = JSON.parse(Data);
                var Header = Data["Header"];
                if (Header != "") {
                    var Plant = Data["Plant"];
                    var Biller = Data["Biller"];
                    var Shipper = Data["Shipper"];
                    var ChildTable = Data["ItemsTable"];
                    var PricingDetails = Data["PricingDetails"];

                    var Gross_Wt = 0;

                    //Sales Order

                    // $scope.BillingDoc = Header[0]["Billing Doc No."];
                    $('#BillingDoc').text(Header[0]["Billing Doc No."]);
                    $('#BillingDoc_html').text(Header[0]["Billing Doc No."]);
                    var ExciseInvdate = Header[0]["EXCISE_INV_DATE"].split('/');
                    // $scope.BillingDate = Header[0]["Billing Date"];
                    var Billing_Date = Header[0]["Billing Date"].split('/');
                    $('#BillingDate').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    $('#BillingDate_html').text(Billing_Date[0] + '.' + Billing_Date[1] + '.' + Billing_Date[2]);
                    //$scope.SalesOrderNo = Header[0]["Sales Order"];
                    var SO_No = Header[0]["Sales Order"].split('/');
                    $('#SalesOrderNo').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);
                    $('#SalesOrderNo_html').text(parseInt(SO_No[0]) + ' / ' + SO_No[1] + '.' + SO_No[2] + '.' + SO_No[3]);

                    //$scope.CINNo = "L74999TG1955PLC000656";

                    $('#CINNo').text("L74999TG1955PLC000656");
                    $('#CINNo_html').text("L74999TG1955PLC000656");
                    // $scope.SoldTo = Shipper[0]["STOCKIST_ID"] + " ( " + Shipper[0]["STOCKIST_NAME"] + " )";
                    //$scope.SoldTo = Header[0]["Sold To"];
                    var Soldto = Header[0]["Sold To"];
                    $('#SoldTo').text(Soldto);
                    $('#SoldTo_html').text(Soldto);
                    var OR_Date = Header[0]["Order Ref Date"].split('/');
                    $('#OrderRefDate').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    $('#OrderRefDate_html').text(OR_Date[0] + ' / ' + OR_Date[1] + '.' + OR_Date[2] + '.' + OR_Date[3]);
                    //Date of Preperation
                    var DOP = Header[0]["Billing Date"].split('/');
                    var DOT = Header[0]["Time"];
                    var ss = DOT.split(":");
                    var dt = new Date();
                    dt.setHours(ss[0]);
                    dt.setMinutes(ss[1]);
                    dt.setSeconds(ss[2]);
                    var dt2 = new Date(dt.valueOf() + 40000);
                    var DOT_Time = dt2.toTimeString().split(" ")[0];

                    //$('#DOPrep').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //$('#DOPrep_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + Header[0]["Time"]);
                    //Date of Removal
                    //$('#DORemoval').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);
                    //$('#DORemoval_html').text(DOP[0] + '.' + DOP[1] + '.' + DOP[2] + " " + DOT_Time);

                    $('#Delivery').text("EX Depot");
                    $('#Delivery_html').text("EX Depot");


                    $('#GrossAmnt').text(Header[0]["Gross Amount"]);



                    // $('#NetWeight').text(Header[0]["NET_WT"]);
                    $('#PaymentTerms').text(Header[0]["PAYMENT_TERMS"]);
                    $('#PaymentTerms_html').text(Header[0]["PAYMENT_TERMS"]);
                    $('#LRRNo').text(Header[0]["LR_NO"]);
                    $('#LRRNo_html').text(Header[0]["LR_NO"]);
                    $('#TransporterName').text(Header[0]["Transporter Name"]);
                    $('#TransporterName_html').text(Header[0]["Transporter Name"]);
                    $('#LorryNum').text(Header[0]["VEHICLE_NO"]);
                    $('#LorryNum_html').text(Header[0]["VEHICLE_NO"]);
                    $('#OBDNum').text(Header[0]["DELIVERY_NO"]);
                    $('#OBDNum_html').text(Header[0]["DELIVERY_NO"]);

                    if ((Header[0]["Delivery"] == "ZFR") || (Header[0]["Delivery"] == "FOR")) {
                        $("#lblInsuranceText_html").text("Insurance and Transportaion is being arranged on customer's request");
                    } else if (Header[0]["Delivery"] == "EXT") {
                        $("#lblInsuranceText_html").text("Freight to be paid to Transporter directly");
                    }

                    var BillToDetails = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"].substring(0, 27) + "<br />" + Biller[0]["Biller Address"].substring(27, Biller[0]["Biller Address"].length) + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var BillToDetails_html = "<b>Payer Detail:</b>" + "</br>" + Biller[0]["SOLD_TO_PARTY_CODE"] + "</br>";
                    BillToDetails_html += Biller[0]["STOCKIST_NAME"] + ",<br />" + Biller[0]["Biller Address"] + "," + Biller[0]["STATE_NAME"] + "</br>" + "Ph No :" + Biller[0]["PHONE1"] + "</br>" + "TIN No. :" + Biller[0]["TIN_NO"] + "</br>" + "CST No. :" + Biller[0]["CST_NO"] + "</br>" + "&nbsp;";


                    //  var ShipperDetails = Shipper[0][""]


                    var ShipperDetails = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"].substring(0, 27) + "<br />" + Shipper[0]["Shipper Address"].substring(27, Shipper[0]["Shipper Address"].length) + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";

                    var ShipperDetails_html = "<b>Delivery / Consignee:</b>" + "</br>" + Shipper[0]["SHIP_TO_PARTY_NO"] + "</br>";
                    ShipperDetails_html += Shipper[0]["STOCKIST_NAME"] + ",<br />" + Shipper[0]["Shipper Address"] + "," + Shipper[0]["STATE_NAME"] + "</br>" + "Ph No :" + Shipper[0]["PHONE1"] + "</br>" + "TIN No. :" + Shipper[0]["TIN_NO"] + "</br>" + "CST No. :" + Shipper[0]["CST_NO"] + "</br>" + "&nbsp;";


                    var PlantDetails = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + "<br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    var PlantDetails_html = "<b>Consigner Detail- HIL Limited</b>" + "</br>" + Plant[0]["NAME3"] + " " + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " <br />" + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " ," + Plant[0]["DISTRICT"] + " ," + Plant[0]["ZIP_CODE"] + " ," + Plant[0]["STATE_NAME"] + "</br>" + "Email:" + Plant[0]["EMAIL"] + "</br>" + "Phone :" + Plant[0]["PHONE1"] + "</br>" + "TIN No. :" + Plant[0]["TIN_NO"] + "</br>" + "CST No. :" + Plant[0]["CST_NO"] + "</br>" + "&nbsp;";
                    $("#lblPlantName").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    //For PDF
                    $("#lblPlantName_html").html(Plant[0]["NAME3"] + "" + Plant[0]["STREET2"] + " " + Plant[0]["STREET3"] + " " + Plant[0]["STREET"] + " " + Plant[0]["STREET4"] + " " + Plant[0]["CITY_CODE"] + " " + Plant[0]["DISTRICT"] + " " + +Plant[0]["ZIP_CODE"] + " " + Plant[0]["STATE_NAME"]);
                    $('#ExciseRange').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#ExciseRange_html').append(Header[0]["EXCISE_RANGE"]);
                    $('#ExciseDivison_html').append(Header[0]["EXCISE_DIVISION"]);
                    $('#ExciseCommissionerate_html').append(Header[0]["EXCISE_COMMISIONARATE"]);

                    $('#tbl_Inv_Details').dataTable().fnAddData([PlantDetails, BillToDetails, ShipperDetails]);
                    $('#tbl_Inv_Details_html').dataTable().fnAddData([PlantDetails_html, BillToDetails_html, ShipperDetails_html]);


                    TRCode = "";
                    for (var i = 0; i < ChildTable.length; i++) {
                        var TotalBasicAmt = (ChildTable[i]["BILL_QTY"]) * (ChildTable[i]["Unit Rate"]);
                        Gross_Wt += parseFloat(ChildTable[i]["Wt In Mt"]);
                        $('#tbl_Inv_Details1').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);
                        //$('#tbl_Inv_Details1_html').dataTable().fnAddData([ChildTable[i]["MATERIAL_NO"], ChildTable[i]["PRODUCT_DESC"], ChildTable[i]["BILL_QTY"], ChildTable[i]["UOM"], ChildTable[i]["PROD_GRP"], Number(ChildTable[i]["Wt In Mt"]).toFixed(3), parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2), parseFloat(TotalBasicAmt).toFixed(2)]);

                        TRCode = TRCode + "<tr>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["MATERIAL_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChildTable[i]["PRODUCT_DESC"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + ChildTable[i]["BILL_QTY"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["UOM"] + "</td>";
                        TRCode = TRCode + "<td align='center'>" + ChildTable[i]["PROD_GRP"] + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Wt In Mt"]).toFixed(3) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(ChildTable[i]["Unit Rate"]).toFixed(2) + "</td>";
                        TRCode = TRCode + "<td align='right'>" + parseFloat(TotalBasicAmt).toFixed(2) + "</td>";
                        TRCode = TRCode + "</tr>";

                        $("#lblChapter_Id_html").text(ChildTable[0]["CHAPTER_ID"]);
                        $("#lblChapter_Desc_html").text(ChildTable[0]["CHAPTER_DESC"]);
                    }
                    var Html = $compile(TRCode)($scope);
                    var el = angular.element($("#tbl_Inv_Details1_html tbody"));
                    el.append(Html);
                    $compile(Html)($scope);
                    $("#tbl_Inv_Details1_html").dataTable({
                        "bDestroy": true,
                        "bSort": false,
                        "bScrollCollapse": true,
                        "paging": false,
                        "ordering": false,
                        "info": false,
                        "bFilter": false,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api();
                            $(api.column(7).footer()).html(
                                api.column(7).data().reduce(function (a, b) {
                                    var res = parseFloat(a) + parseFloat(b);
                                    return parseFloat(0).toFixed(2);
                                }, 0)
                            );
                        }
                    });
                    $("#Zinv_Depo_header").remove();
                    $("#Zinv_Depo_header_html").remove();
                    $("#Zfoc_Depo_Footer_Header_html").remove();


                    var GrossWeight = Gross_Wt;
                    GrossWeight = parseFloat(GrossWeight).toFixed(3);
                    var GrossWeightinMt = GrossWeight / 1000;


                    $('#GrossWeight').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");
                    $('#GrossWeight_html').text(GrossWeight + " KG " + "( " + GrossWeightinMt.toFixed(3) + " MT )");

                    var NetWeight = Gross_Wt;
                    NetWeight = parseFloat(NetWeight).toFixed(3);
                    var NetWeightinMt = NetWeight / 1000;

                    $('#NetWeight').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");
                    $('#NetWeight_html').text(NetWeight + " KG " + "( " + NetWeightinMt.toFixed(3) + " MT )");


                    var AssessableValue = 0;
                    var ExiceDuty = 0;
                    var EntryTax = 0;
                    var Turnover = 0;
                    var JCST = 0;
                    var ZSSC = 0;
                    var StateAddTax = 0;
                    var InsuranceTPND = 0;
                    var FreightAmt = 0;
                    var TotalFr = 0;
                    if (parseFloat(PricingDetails[0]["DISC"]) > 0) {
                        $('#Discount').text(Number(PricingDetails[0]["DISC"]).toFixed(2));
                    } else {
                        $("#lblDiscount").hide(); $("#Discount").hide();
                        $("#lblDiscount_html").hide(); $("#Discount_html").hide();
                    }
                    if (parseFloat(PricingDetails[0]["JCST"]) > 0) {
                        $("#lblAgainstCFORM").html("CST :");
                        $("#lblAgainstCFORM_html").html("CST :");
                        $('#AgainstCFORM').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                        $('#AgainstCFORM_html').text(Number(PricingDetails[0]["JCST"]).toFixed(2));
                    }
                    else {
                        if (parseFloat(PricingDetails[0]["ZVAT"]) > 0) {
                            $("#lblAgainstCFORM").html("VAT :");
                            $("#lblAgainstCFORM_html").html("VAT :");
                            $('#AgainstCFORM').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                            $('#AgainstCFORM_html').text(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                        } else {
                            $("#lblAgainstCFORM").hide(); $("#AgainstCFORM").hide();
                            $("#lblAgainstCFORM_html").hide(); $("#AgainstCFORM_html").hide();
                        }
                    }




                    if (Number(PricingDetails[0]["ZSSC"].toString()).toFixed(2) == "0.00") {
                        $("#idSteteSess").hide();
                        $("#idSteteSess_html").hide();

                    }
                    else {
                        $('#SteteSec').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $('#SteteSec_html').text(Number(PricingDetails[0]["ZSSC"]).toFixed(2));
                        $("#lblSteteSec").html("State Sec Cess  :");
                        $("#lblSteteSec_html").html("State Sec Cess  :");
                    }

                    if (Number(PricingDetails[0]["ZGTA"].toString()).toFixed(2) == "0.00") {
                        $("#idStateAddTax").hide();
                        $("#idStateAddTax_html").hide();
                    } else {
                        $('#StateAddTax').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));
                        $('#StateAddTax_html').text(Number(PricingDetails[0]["ZGTA"]).toFixed(2));

                        $("#lblStateAddTax").html("State Add Tax  :");
                        $("#lblStateAddTax_html").html("State Add Tax  :");
                    }
                    if (parseFloat(PricingDetails[0]["ASS"]) > 0) {
                        $('#AssessableValue').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                        $('#AssessableValue_html').text(Number(PricingDetails[0]["ASS"]).toFixed(2));
                    } else {
                        $("#lblAssessableValue").hide(); $("#AssessableValue").hide();
                        $("#lblAssessableValue_html").hide(); $("#AssessableValue_html").hide();
                    }
                    //$('#ExiceDuty').text(Number(PricingDetails[0]["JEXP"]).toFixed(2));
                    //if (Number(PricingDetails[0]["ZETX"].toString()).toFixed(2) == "0.00") {
                    //    $("#idEntryTax").hide();
                    //    $("#idEntryTax_html").hide();
                    //} else {
                    //    $('#EntryTax').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    //    $('#EntryTax_html').text(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    //}

                    if (parseFloat(PricingDetails[0]["ZINS"]) > 0) {
                        $('#InsuranceTPND').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                        $('#InsuranceTPND_html').text(Number(PricingDetails[0]["ZINS"]).toFixed(2));
                    } else { $("#lblInsuranceTPND").hide(); $("#InsuranceTPND").hide(); $("#lblInsuranceTPND_html").hide(); $("#InsuranceTPND_html").hide(); }
                    if (parseFloat(PricingDetails[0]["ZF00"]) > 0) {
                        $('#FreightAmt').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                        $('#FreightAmt_html').text(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    } else {
                        $("#lblFreightAmt").hide(); $("#FreightAmt").hide();
                        $("#lblFreightAmt_html").hide(); $("#FreightAmt_html").hide();
                    }


                    JCST += parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2));
                    Turnover = parseFloat(Number(PricingDetails[0]["ASS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JEXP"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETX"]).toFixed(2));
                    $('#TaxTornover').text(Number(0).toFixed(2));
                    $('#TaxTornover_html').text(Number(0).toFixed(2));
                    var Total_Wt_Fr = parseFloat(Number(Turnover).toFixed(2)) + parseFloat(Number(PricingDetails[0]["JCST"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZVAT"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZGTA"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZSSC"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZETO"]).toFixed(2));
                    $('#Total').text(Number(0).toFixed(2));
                    $('#Total_html').text(Number(0).toFixed(2));
                    TotalFr = parseFloat(Number(Total_Wt_Fr).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZINS"]).toFixed(2)) + parseFloat(Number(PricingDetails[0]["ZF00"]).toFixed(2));
                    $('#TotalFr').text(Number(0).toFixed(2));
                    $('#TotalFr_html').text(Number(0).toFixed(2));
                    $('#TotalAmountRound').text(Math.round(Number(0).toFixed(2)) + ".00");
                    $('#TotalAmountRound_html').text(Math.round(Number(0).toFixed(2)) + ".00");
                    $('#TotalAmtInWords').text(toWordsINVOICE(Number(0).toFixed(2)));
                    $('#TotalAmtInWords_html').text(toWordsINVOICE(Number(0).toFixed(2)));
                    HideLoader();
                } else {
                    HideLoader();
                    alert("No Proper Data");
                }

            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    });
});

var th = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];

var dg = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];

var tn = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];

var tw = ['TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINTY'];

// function to convert number to words
function toWordsINVOICE(value) {
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
    var oSettings = oTable.fnSettings();
    for (iCol = 0; iCol < oSettings.aoPreSearchCols.length; iCol++) {
        oSettings.aoPreSearchCols[iCol].sSearch = '';
    }
    oSettings.oPreviousSearch.sSearch = '';
    oTable.fnDraw();
}

function CommonFunctionForExcelExport_SearchFilterBU3(ID, UserCode, SearchboxValue, ExcelFileName, BackendReportName, WhereClause, FileType) {
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


function GetPDFFile_CFORM() {
    ShowLoader();
    $.ajax({
        url: '/Home/Exportdata',
        type: 'POST',
        beforeSend: function () {
            //ShowLoader();
        },
        data: { QueryVal: $('#HidenData').html() },
        success: function (result) {
            if (result == "ok") {
                //   userRole = "STOCKIST";
                //$("#PrintReport").css("display", "block");
                if ((userRole == "STOCKIST") || (userRole == "C&F")) {
                    ShowLoader();
                    //  window.location.href = "../../Home/GetPDF?reportname=PendingCForms";
                    $.ajax({
                        type: 'POST',
                        async: false,
                        data: { reportname: "PendingCForms" },
                        //datatype: 'JSON',
                        url: '../../HOME/GetPDF_STOCKIST',
                        success: function (data) {
                            if (data == "MailSentSuccessfully") {
                                HideLoader();
                                alert("Mail Sent Successfully");
                            } else {
                                HideLoader();
                                alert(data);
                            }
                        },
                        error: function (e) {
                            HideLoader();
                            alert("Technical Error Occured");
                        }
                    });

                    //   window.location.href = "../../Home/GetPDF_STOCKIST?reportname=CreditNote_" + $("#DocNo").text() + "";
                } else {
                    ShowLoader();
                    window.location.href = "../../Home/GetPDF?reportname=CreditNote_" + $("#DocNo").text() + "";
                    HideLoader();
                }
            }
        },
        error: function (e) {
            alert(e);
        }
    });
}