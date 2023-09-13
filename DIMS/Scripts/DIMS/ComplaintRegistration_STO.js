/*
 * 
    Module              : CMS - DIMS Solution.
    DocumentName        : RegistrationList_STO.cs
    Project Name        : Dealer Information Management System (DIMS).
    Client Name         : HIL :: CK BIRLA GROUP.
    Description         : This Doc is for used for Complaint Registration STO List.
    Developer Name      : SVPRASADK.
    Change Log          : NA.
    Date Started        : 20-07-2020
 *
 */

//Registration_STO List
DIMS.controller('RegistrationListCtrl_STO', function ($scope, $location, DIMSFactory) {
    complaintRegistrationScope_STO = $scope;
    angular.element(document).ready(function () {
        CheckUserSession();
        var UserType_STO = $("#UserType_STO").val();

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: UserType_STO, FormCode: 'REG_STO' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#CreateNewComplaint_STO").css('display', 'none');
                    $("#CMS_List_STO").css('display', 'none');
                    $("#FROM_PLANT_CODE").css('display', 'none');
                } else {
                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#CMS_List_STO").css('display', 'block');
                        $("#FROM_PLANT_CODE").css('display', 'block');
                    } else {
                        $("#CMS_List_STO").css('display', 'none');
                        $("#FROM_PLANT_CODE").css('display', 'none');
                    }
                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#CreateNewComplaint_STO").css('display', 'block');
                    } else {
                        $("#CreateNewComplaint_STO").css('display', 'none');
                    }
                }

                $("#HiddenForCMS").val("");

                $.ajax({
                    type: 'POST',
                    url: '../../ComplaintRegistrationSTO/FillCMSPlantFilter',
                    success: function (response) {
                        $("#FROM_PLANT_CODE").empty();
                        if (response != "") {
                            response = JSON.parse(response);
                            //Start of All option for Complaint Registration_STO List
                            var UserCode_STO = $("#UserCode_STO").val();
                            var SessionUserType = $("#UserType_STO").val();
                            if (UserCode_STO == "50003209") {
                                var option = $('<option></option>').attr("value", "ALL").text("ALL");
                                $("#FROM_PLANT_CODE").append(option);
                            }
                            //End 
                            for (var i = 0; i < response.length; i++) {
                                var option = $('<option></option>').attr("value", response[i]["FROM_PLANT_CODE"]).text(response[i]["FROM_PLANT_NAME"]);
                                $("#FROM_PLANT_CODE").append(option);
                            }

                            var CMSPlant = $("#CMSPlant").val();

                            if (CMSPlant == "" || typeof CMSPlant == "undefined") {
                                $("#FROM_PLANT_CODE").val(response[0]["FROM_PLANT_CODE"]);
                                $("#CMSPlant").val(response[0]["FROM_PLANT_CODE"]);
                            } else {
                                $("#FROM_PLANT_CODE").val(CMSPlant);
                            }

                            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
                            var UserCode_STO = $("#UserCode_STO").val();
                            var UserType_STO = $("#UserType_STO").val();
                            var WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' ";

                            if (UserCode_STO == "50003209") {
                                if (FROM_PLANT_CODE == "ALL") {
                                    WhereClause = " WHERE RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!=''";
                                } else {
                                    WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' ";
                                }
                            } else {
                                WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' AND RC.CREATED_BY='" + UserCode_STO + "' ";
                            }

                            var Data = JSON.stringify({
                                MasterType: "ComplaintRegistrationList_STO",
                                ID: "561",
                                UserCode: $("#UserCode_STO").val(),
                                "Type": "Get",
                                ReportName: "ComplaintRegistrationList_STO",
                                WhereClause: WhereClause
                            });

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
                                                "name": selectedcolumnname[i],
                                                "bSortable": true
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
                                                "name": selectedcolumnname[i],
                                                "bSortable": "true"
                                            });
                                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                                        }
                                        //$scope.UserSelectedColumnName = ColArray;
                                        UserSelectedColumnName = ColArray;
                                    }
                                }

                                DIMSFactory.getReportData(Data).success(function (response) {
                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "RegistrationList_STO", UserSelectedColumnName);
                                    $('#RegistrationList_STO tbody').on('click', 'tr', function () {
                                        var ID = $(this).find('td:eq(10)').text();
                                        if ($(this).hasClass('selected')) {
                                            $(this).removeClass('selected');
                                        } else { }

                                        if (ID != "") {
                                            $.ajax({
                                                url: '../../Users/GetRightToAccess',
                                                type: 'GET',
                                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_STO").val(), FormCode: 'REG_STO' }) },
                                                success: function (AccessData) {
                                                    if (AccessData == "") { } else {
                                                        AccessData = JSON.parse(AccessData);
                                                        if (AccessData[0]["IS_VIEW"] == true || AccessData[0]["IS_UPDATE"] == true) {
                                                            var scope = angular.element($("#RegistrationListDiv_STO")).scope();
                                                            scope.$apply(function () {
                                                                scope.go("Registration_STO/" + ID);
                                                            });
                                                        } else {
                                                            alert("You don't have any access");
                                                        }
                                                    }
                                                }
                                            });
                                        } else {
                                            alert("You don't have any access");
                                        }
                                    });
                                });
                            });
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) { }
                });
            }
        });
    });
  
    $scope.PlantChange = function () {
//debugger
        try {
            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
            $("#CMSPlant").val(FROM_PLANT_CODE);
            CMSPlant = FROM_PLANT_CODE;
            var UserCode_STO = $("#UserCode_STO").val();
            //var WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "'  ORDER BY RC.ID DESC ";
            var WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' ";
            var UserType_STO = $("#UserType_STO").val();

            if (UserCode_STO == "50003209") {
                if (FROM_PLANT_CODE == "ALL") {
                    WhereClause = " WHERE RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!=''";
                } else {
                    WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' ";
                }
            } else {
                WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' AND RC.CREATED_BY='" + UserCode_STO + "' ";
            }

            var Data = JSON.stringify({
                MasterType: "ComplaintRegistrationList_STO",
                ID: "561",
                UserCode: $("#UserCode_STO").val(),
                "Type": "Get",
                ReportName: "ComplaintRegistrationList_STO",
                WhereClause: WhereClause
            });

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
                                "name": selectedcolumnname[i],
                                "bSortable": true
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
                                "name": selectedcolumnname[i],
                                "bSortable": "true"
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    }
                }

                DIMSFactory.getReportData(Data).success(function (response) {
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "RegistrationList_STO", UserSelectedColumnName);
                    $('#RegistrationList_STO tbody').on('click', 'tr', function () {
                        alert('ID', ID);
                        var ID = $(this).find('td:eq(1)').text();
                        var Status = $(this).find('td:eq(2)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            //RegistrationListTable.$('tr.selected').removeClass('selected');
                            //$(this).addClass('selected');
                        }

                        if (ID != "") {
                            var scope = angular.element($("#RegistrationListDiv_STO")).scope();
                            scope.$apply(function () {
                                scope.go("Registration_STO/" + ID);
                            })
                        } else if (Status == "DRAFT") {
                            var ComplaintNumber = $(this).find('td:eq(10)').text();
                            var scope = angular.element($("#RegistrationListDiv_STO")).scope();
                            scope.$apply(function () {
                                scope.go("Registration_STO/" + ComplaintNumber);
                            })
                        }
                    });
                });
            });
        } catch (e) {
            alert("Error :PlantChange : " + e);
        }
    }

    // Open popup for columns selection
    $scope.OpenColumnEditing_STO = function () {
        $('#undo_redo').empty();
        var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);
        for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
            $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
        }
        //   $('#undo_redo').refresh();
        $('#undo_redo').multiselect();
        if (ControllerName != "RegistrationListCtrl_STO") {
            ControllerName = "RegistrationListCtrl_STO";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "RegistrationListCtrl_STO");
            $compile(elem.contents())(complaintRegistrationScope_STO);
        }
        $("#ColumnEditingModal").modal('show');
    }
    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing_STO = function () {
        DIMSFactory.ViewColumnEditing_STO("ComplaintRegistrationList_STO", $("#UserCode_STO").val(), " ORDER BY ID DESC"); // 1-Report Name ,2-UserCode_STO(561),3-WhereClause

    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData_STO = function () {
        var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
        var WhereClause = " WHERE RC.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "'  ORDER BY RC.ID DESC ";
        var Data = JSON.stringify({
            MasterType: "ComplaintRegistrationList_STO",
            ID: "561",
            UserCode_STO: $("#UserCode_STO").val(),
            "Type": "Get",
            ReportName: "ComplaintRegistrationList_STO",
            WhereClause: WhereClause
        });
        //DIMSFactory.SaveColumnEditingData_STO("Compensation", $scope.UserCode_STO, " ORDER BY ID DESC");
        DIMSFactory.SaveColumnEditingData_InputParameter("ComplaintRegistrationList_STO", $("#UserCode_STO").val(), WhereClause, Data, "RegistrationList_STO");
        // 1-Report Name ,2-UserCode_STO(561),3-WhereClause,4-JsonData,5-Frontend datatable id
    }
});

//Registration_STO Controller
DIMS.controller('RegistrationCtrl_STO', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    RegistrationScope_STO = $scope;
    var SendForReviewDoubleClick = "";
    $scope.templatesettings = { HeaderTitle: "Registration_STO" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    angular.element(document).ready(function () {
        CheckUserSession();
        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationSTO/FillCMSPlantFilter',
            async: true,
            success: function (response) {
                //debugger
                $("#FROM_PLANT_CODE").empty();
                $("#PRODUCT_TYPE_CODE").val('SBU3');
                $("#PRODUCT_TYPE_NAME").val('SBU3');
                if (response == "") {

                } else {
                    response = JSON.parse(response);
                    for (var i = 0; i < response.length; i++) {
                        var option = $('<option></option>').attr("value", response[i]["FROM_PLANT_CODE"]).text(response[i]["FROM_PLANT_NAME"]);
                        $("#FROM_PLANT_CODE").append(option);
                    }

                    var CMSPlant1 = CMSPlant;
                    if (CMSPlant1 == "ALL")
                        CMSPlant1 = response[0]["FROM_PLANT_CODE"];
                    if (CMSPlant1 == "" || typeof CMSPlant1 == "undefined") {
                        $("#FROM_PLANT_CODE").val(response[0]["FROM_PLANT_CODE"]);
                        $("#CMSPlant").val(response[0]["FROM_PLANT_CODE"]);
                    } else {
                        $("#FROM_PLANT_CODE").val(CMSPlant1);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });

        if ($routeParams.ID == undefined || $routeParams.ID == "") {
            $("#FormIdentity_STO").val("").trigger('change');
        } else {
            $("#FormIdentity_STO").val($routeParams.ID).trigger('change');
        }

        try {
            var FormIdentity_STO = $("#FormIdentity_STO").val();

            if (FormIdentity_STO == "" || FormIdentity_STO == undefined) {
                $scope.DOC_SERIES_CODE = "CRSZ12";
                $scope.COMPLAINT_STATUS = "DRAFT";
                $("#COMPLAINT_STATUS").val($scope.COMPLAINT_STATUS).trigger('change');
                $scope.COMPLAINT_RECEIVED_DATE = TodayDateTime;
                $("#COMPLAINT_RECEIVED_DATE").datepicker("setDate", TodayDateTime);
                $scope.COMPLAINT_REGISTRATION_DATE = TodayDateTime;
                $("#COMPLAINT_REGISTRATION_DATE").datepicker("setDate", TodayDateTime);
                //$(".Complaint_NumberDiv").css("display", "none");
                $scope.REGISTRANT_TYPE_NAME = $("#UserType_STO").val();
                $scope.Registrant_Type_ID = $("#UserType_ID_STO").val();
                $scope.REGISTRANT_TYPE_CODE = $("#UserType_ID_STO").val();
                $("#MakeApproved_STO").css('display', 'none');
                $("#SendRegistrationApproval").css('display', 'none');
                $("#NewReg").css('display', 'none');
                $("#Project_Party_Check").val("ASD");

                var UserType_ID_STO = $("#UserType_ID_STO").val();
                if (UserType_ID_STO == "SH_BU3" || UserType_ID_STO == "PLANT_MHD" || UserType_ID_STO == "Plant_MHD") {
                    $scope.PRODUCT_TYPE_NAME = "SBU3";
                    $scope.PRODUCT_TYPE_CODE = "SBU3";
                    $scope.COMPLAINT_TYPE_CODE = "CTC1";
                    $scope.COMPLAINT_TYPE_NAME = "Product Complaints";
                    //$("#PRODUCT_TYPE_CODE").val('SBU3');
                    //$("#PRODUCT_TYPE_NAME").val('SBU3');
                    ProductTypeChanges("SBU3");
                } else { }

                $scope.COMPLAINT_PRIORITY_CODE = "P3";
                $scope.COMPLAINT_PRIORITY_NAME = "Medium";
                $scope.COMPLAINT_SEVERITY_CODE = "MDM";
                $scope.COMPLAINT_SEVERITY_NAME = "Medium";
            } else {
                ShowLoader();
                $("Project_Party_Check").val("");

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationSTO/GetComplaint',
                    async: false,
                    data: { Identity: FormIdentity_STO },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") { } else {
                        var Data = JSON.parse(response.data);
                        var HeaderData = Data["Header"];
                        $("#MakeApproved_STO").css('display', 'none');
                        if (HeaderData[0]["DOC_STATUS"] == "Approved") {

                        } else {

                        }
                        $scope.COMPLAINT_CODE = HeaderData[0]["COMPLAINT_CODE"];
                        //$scope.FROM_PLANT_CODE = HeaderData[0]["FROM_PLANT_CODE"];
                        //$scope.FROM_PLANT_NAME = HeaderData[0]["FROM_PLANT_NAME"];
                        $("#Complaint_Number").val(FormIdentity_STO);
                        $("#COMPLAINT_RECEIVED_DATE").datepicker("startDate", HeaderData[0]["Days100Back"]);
                        $scope.COMPLAINT_RECEIVED_DATE = HeaderData[0]["COMPLAINT_RECEIVED_DATE"];
                        $("#COMPLAINT_RECEIVED_DATE").datepicker("setDate", HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $scope.COMPLAINT_REGISTRATION_DATE = HeaderData[0]["COMPLAINT_REGISTRATION_DATE"];
                        $("#COMPLAINT_REGISTRATION_DATE").datepicker("setDate", HeaderData[0]["COMPLAINT_REGISTRATION_DATE"]);
                        $scope.COMPLAINT_TRACKING_NO = HeaderData[0]["COMPLAINT_TRACKING_NO"];
                        $scope.REGISTRANT_TYPE_CODE = HeaderData[0]["REGISTRANT_TYPE_CODE"];
                        $scope.REGISTRANT_TYPE_NAME = HeaderData[0]["REGISTRANT_TYPE_NAME"]; 
                        if (HeaderData[0]["REGISTRANT_TYPE_NAME"] == "") {
                            $scope.REGISTRANT_TYPE_NAME = $("#UserType_STO").val();
                            $scope.Registrant_Type_ID = $("#UserType_ID_STO").val();
                            $scope.REGISTRANT_TYPE_CODE = $("#UserType_ID_STO").val();
                        }

                        $scope.DOC_SERIES_CODE = HeaderData[0]["DOC_SERIES_CODE"];

                        if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                            $scope.DOC_SERIES_CODE = "CRSZ12";
                        }

                        $scope.PRODUCT_TYPE_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"]; 
                        ProductTypeChanges(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                        $scope.PRODUCT_TYPE_NAME = HeaderData[0]["PRODUCT_TYPE_CODE"];
                        $scope.PLANT_MHD_CODE = HeaderData[0]["PLANT_MHD_CODE"];
                        $scope.PLANT_MHD_NAME = HeaderData[0]["PLANT_MHD_NAME"];
                        $scope.COMPLAINT_DESC = HeaderData[0]["COMPLAINT_DESC"];
                        $scope.REMARKS = HeaderData[0]["REMARKS"];
                        $("#SelectedFiles").append(HeaderData[0]["ATTACHMENTS"]).trigger('change');

                        //$scope.COMPLAINT_STATUS = HeaderData[0]["DOC_STATUS"];
                        
                        $scope.TO_PLANT_CODE = HeaderData[0]["TO_PLANT_CODE"];
                        $scope.TO_PLANT_NAME = HeaderData[0]["TO_PLANT_NAME"];
                        $scope.END_CUSTOMER_DETAILS = HeaderData[0]["END_CUSTOMER_DETAILS"];
                        $scope.SITE_ADDRESS = HeaderData[0]["SITE_ADDRESS"];
                        $scope.COMPLAINT_MODE_CODE = HeaderData[0]["COMPLAINT_MODE_CODE"];
                        $scope.COMPLAINT_MODE_NAME = HeaderData[0]["COMPLAINT_MODE_NAME"];

                        if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "ALL") {
                            $scope.PRODUCT_CATEGORY_CODE = "ALL";
                            $scope.PRODUCT_CATEGORY_NAME = "ALL";                                                                                              
                        } else {
                            $scope.PRODUCT_CATEGORY_CODE = HeaderData[0]["PRODUCT_CATEGORY_CODE"];
                            $scope.PRODUCT_CATEGORY_NAME = HeaderData[0]["PRODUCT_CATEGORY_NAME"];                                                                                              
                        }                        

                        if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "" && HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            ProductTypeChanges("SBU2");
                        }                        

                        $scope.COMPLAINT_TYPE_CODE = HeaderData[0]["COMPLAINT_TYPE_CODE"];
                        $scope.COMPLAINT_TYPE_NAME = HeaderData[0]["COMPLAINT_TYPE_NAME"];
                        $scope.COMPLAINT_PRIORITY_CODE = HeaderData[0]["COMPLAINT_PRIORITY_CODE"];
                        $scope.COMPLAINT_PRIORITY_NAME = HeaderData[0]["COMPLAINT_PRIORITY_NAME"];
                        $scope.COMPLAINT_CATEGORY_CODE = HeaderData[0]["COMPLAINT_CATEGORY_CODE"];
                        $scope.COMPLAINT_CATEGORY_NAME = HeaderData[0]["COMPLAINT_CATEGORY_NAME"];
                        $scope.COMPLAINT_SEVERITY_CODE = HeaderData[0]["COMPLAINT_SEVERITY_CODE"];
                        $scope.COMPLAINT_SEVERITY_NAME = HeaderData[0]["COMPLAINT_SEVERITY_NAME"];                                                                     
                        
                        $scope.NATURE_OF_COMPLAINT = HeaderData[0]["NATURE_OF_COMPLAINT"];

                        //COMPLAINT_STATUS
                        if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Waiting for approval" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                            $scope.COMPLAINT_STATUS = HeaderData[0]["FinalStatus"];
                        } else {
                            $scope.COMPLAINT_STATUS = HeaderData[0]["DOC_STATUS"];
                            $("#COMPLAINT_STATUS").val($scope.COMPLAINT_STATUS).trigger('change');
                        }

                        TRCode = "";
                        var SUP_Lines = Data["CMS_RC_Supply_Details_STO"];
                        for (var i = 0; i < SUP_Lines.length; i++) {
                            TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + (SUP_Lines[i]["INVOICE_DATE"]) + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["BATCH_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["SUPPLIED_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["DEFECTED_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["TRANSPORTER"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["REMARKS"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["SIZE"] + "</td>";
                            TRCode = TRCode + "</tr>";
                        }
                        $("#Supply_Details_Table tbody").append(TRCode);

                        TRCode = "";
                        var MAT_SUP_Lines = Data["CMS_RC_Material_Supply_Details_STO"];
                        for (var i = 0; i < MAT_SUP_Lines.length; i++) {
                            TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' onclick='EditMSD(this.id)'><td>" + (i + 1) + "</td>";
                            TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["PLANT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLIER_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLIER_NAME"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["PLANT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLIER_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLIER_CODE"] + "</td>";
                            TRCode = TRCode + "</tr>";
                        }
                        $("#Material_Supply_Details_Table tbody").append(TRCode);

                        var MyField = $("#HiddenForCMS").val();

                        if (HeaderData[0]["DOC_STATUS"] == "DRAFT") {
                            $("#MakeApproved_STO").css('display', 'none');
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID_STO").val(), FormCode: 'REG_STO' }) },
                                success: function (AccessData) {
                                    if (AccessData == "") {
                                        $("#SendRegistrationApproval").css('display', 'none');
                                        $("#CompRegSave").css('display', 'none');
                                    } else {
                                        AccessData = JSON.parse(AccessData);
                                        if (AccessData[0]["IS_UPDATE"] == true) {
                                            $("#SendRegistrationApproval").css('display', 'block');
                                            $("#CompRegSave").css('display', 'block');
                                        } else {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#CompRegSave").css('display', 'none');

                                        }
                                    }
                                }
                            });
                        } else if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                            //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);
                            $("#MakeApproved_STO").css('display', 'none');
                            var UserType_STO = $("#UserType_ID_STO").val();

                            if ((HeaderData[0]["DOC_STATUS"] == "Approved") && (UserType_STO == "CSM" || UserType_STO == "QH" || UserType_STO == "CSM_BU2" || UserType_STO == "CSM_BU3")) {
                                $("#SuperSave").css('display', 'block');
                            } else {
                                $("#SalesRepMasterSpan").css("pointer-events", "none");
                                $("#CR_Series_CodeSpan").css("pointer-events", "none");
                                $("#StockistMasterSpan").css("pointer-events", "none");
                                $("#ComplaintModeSpan").css("pointer-events", "none");
                                $("#Prod_Typ_MastSapn").css("pointer-events", "none");
                                $("#ProductDivisionMasterSpan").css("pointer-events", "none");
                                $("#GetComplaintTypeSpan").css("pointer-events", "none");
                                $("#GetComplaintPrioritySpan").css("pointer-events", "none");
                                $("#GetComplaintCategorySpan").css("pointer-events", "none");
                                $("#GetComplaintSeveritySpan").css("pointer-events", "none");
                                $("#SupplyDetails_Add").css('display', 'none');
                                $("#Receipt_Details_Sheeting_Add").css('display', 'none');
                                $("#Mat_Sup_Det_Add").css('display', 'none');
                            }

                            $("#CompRegSave").css('display', 'none');
                            $("#SendRegistrationApproval").css('display', 'none');
                            $("#APPROVED_DATE").val(HeaderData[0]["APPROVED_DATE"]);
                        } else if (HeaderData[0]["DOC_STATUS"] == "Waiting for approval") {
                            if (MyField == "") {
                                //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);
                                $("#MakeApproved_STO").css('display', 'none');
                                $("#SalesRepMasterSpan").css("pointer-events", "none");
                                $("#CR_Series_CodeSpan").css("pointer-events", "none");
                                $("#StockistMasterSpan").css("pointer-events", "none");
                                $("#ComplaintModeSpan").css("pointer-events", "none");
                                $("#Prod_Typ_MastSapn").css("pointer-events", "none");
                                $("#ProductDivisionMasterSpan").css("pointer-events", "none");
                                $("#GetComplaintTypeSpan").css("pointer-events", "none");
                                $("#GetComplaintPrioritySpan").css("pointer-events", "none");
                                $("#GetComplaintCategorySpan").css("pointer-events", "none");
                                $("#GetComplaintSeveritySpan").css("pointer-events", "none");
                                $("#CompRegSave").css('display', 'none');
                                $("#SendRegistrationApproval").css('display', 'none');
                                $("#SupplyDetails_Add").css('display', 'none');
                                $("#Receipt_Details_Sheeting_Add").css('display', 'none');
                                $("#Mat_Sup_Det_Add").css('display', 'none');
                            } else {
                                //Write Code For Approvals
                                $.ajax({
                                    url: '../../Users/GetRightToAccess',
                                    type: 'GET',
                                    data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID_STO").val(), FormCode: 'REG_STO' }) },
                                    success: function (AccessData) {
                                        if (AccessData == "") {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#RegList").css('display', 'none');
                                            $("#NewReg").css('display', 'none');
                                            $("#MakeApproved_STO").css('display', 'none');
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#CompRegSave").css('display', 'none');
                                        } else {
                                            AccessData = JSON.parse(AccessData);
                                            if (AccessData[0]["IS_APPROVE"] == true) {
                                                $("#SendRegistrationApproval").css('display', 'none');
                                                $("#RegList").css('display', 'none');
                                                $("#NewReg").css('display', 'none');
                                                $("#MakeApproved_STO").css('display', 'block');
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#CompRegSave").css('display', 'block');
                                            } else {
                                                $("#SendRegistrationApproval").css('display', 'none');
                                                $("#RegList").css('display', 'none');
                                                $("#NewReg").css('display', 'none');
                                                $("#MakeApproved_STO").css('display', 'none');
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#CompRegSave").css('display', 'none');
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        //$("#FROM_PLANT_CODE").val(HeaderData[0]["FROM_PLANT_CODE"]);
                        $("#FROM_PLANT_CODE > [value=" + HeaderData[0]["FROM_PLANT_CODE"] + "]").attr("selected", "true"); 
                        //if (HeaderData[0]["FROM_PLANT_CODE"] > 0) {
                        //    $("#FROM_PLANT_CODE > [value=" + HeaderData[0]["FROM_PLANT_CODE"] + "]").attr("selected", "true");
                        //} else {
                        //    $("#FROM_PLANT_CODE > [value=0]").attr("selected", "true");
                        //}
                        $("#CMSPlant").val(HeaderData[0]["FROM_PLANT_CODE"]);
                        $("#HiddenForCMS").val("");
                        HideLoader();
                    }
                },
                    function errorCallback(response) {
                        HideLoader();
                        alert("Error : " + response);
                    });
            }
        } catch (e) {
            alert("Error : DocReadyRegCtrl : " + e);
        }
    });

    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var DocumentCode = "CRT";
        var PrdCategoryCode = "";
        var PrdTypeCode = "";
        var Data = JSON.stringify({
            MasterType: MasterType,
            DocumentCode: DocumentCode
        });
        //Below condition is to disable selecting Bussiness unit, Product type and Customer Code once atleast one supply details added.
        if (($("#Supply_Details_Table tbody tr").length) > 0) {
            var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();
            if (PRODUCT_TYPE_NAME == "SBU3") {
                switch (MasterType) {
                    case ("ProductTypeCode_STO"):
                        return
                    case ("PlantMaster_STO"):
                        return;
                    case ("ProductDivisionMaster"):
                        return;
                }
            }
        }

        if (MasterType == "PlantMaster_STO") {
            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
            var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();

            if (PRODUCT_TYPE_NAME == "") {
                alert("Select Business Unit");
                return;
            } else if (PRODUCT_TYPE_NAME == "SBU3") {
                PRODUCT_TYPE_NAME = "3000";
            }

            Data = JSON.stringify({
                MasterType: MasterType,
                PRODUCT_TYPE_NAME: PRODUCT_TYPE_NAME,
                FROM_PLANT_CODE: FROM_PLANT_CODE
            });
        } else if (MasterType == "DefectTypeMaster_STO") {
            var PRODUCT_TYPE_CODE = $("#PRODUCT_TYPE_CODE").val();
            var PRODUCT_CATEGORY_CODE = $("#PRODUCT_CATEGORY_CODE").val();

            if ($("#PRODUCT_TYPE_CODE").val() == "SBU3" && $("#COMPLAINT_CATEGORY_CODE").val() == "") {
                alert("Complaint Category cannot be empty");
                return;
            } else {

            }
            MasterType = "GetDefectTypeMaster";
            Data = JSON.stringify({
                MasterType: MasterType,
                ProductCategoryCode: PRODUCT_CATEGORY_CODE,
                ProductTypeCode: PRODUCT_TYPE_CODE,
                COMPLAINT_CATEGORY_CODE: $("#COMPLAINT_CATEGORY_CODE").val()
            });
        } else if (MasterType == "Prod_Cat_Mast") {
            var SITEDETAIL_CODE_STO = $("#SITEDETAIL_CODE_STO").val();
            var COMPANYDETAIL_CODE_STO = $("#COMPANYDETAIL_CODE_STO").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                SITEDETAIL_CODE_STO: SITEDETAIL_CODE_STO,
                COMPANYDETAIL_CODE_STO: COMPANYDETAIL_CODE_STO
            });
        } else if (MasterType == "ProductDivisionMaster") {
            if ($("#PRODUCT_TYPE_NAME").val() == "" || $("#PRODUCT_TYPE_CODE").val() == "") {
                alert("Select Product Type");
                $("#PRODUCT_TYPE_NAME").css("border-color", "red");
                return;
            } else {
                $("#PRODUCT_TYPE_NAME").css("border-color", "#d2d6de");
                var PRODUCT_TYPE_CODE = $("#PRODUCT_TYPE_CODE").val();
                Data = JSON.stringify({
                    MasterType: MasterType,
                    PRODUCT_TYPE_CODE: PRODUCT_TYPE_CODE,
                    CR_TYPE: "STO"
                });
            }
        } else if (MasterType == "PlantMHDMaster_STO") {
        //debugger
            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
            var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();
            var UserCode =$("#UserCode_STO").val();

            if (PRODUCT_TYPE_NAME == "") {
                alert("Select Business Unit");
                return;
            }

            Data = JSON.stringify({
                MasterType: MasterType,
                FROM_PLANT_CODE: FROM_PLANT_CODE,
                BusinessUnit: PRODUCT_TYPE_NAME,
                UserCode : UserCode
            });
        } else if (MasterType == "GetPlantMaster") {
            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
            var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit,
                FROM_PLANT_CODE: FROM_PLANT_CODE
            });
        } else if (MasterType == "SUPPLIER_TYPE_CODE_STO") {
            var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit
            });
        } else if (MasterType == "GetProductMaster_STO") {
            var FLG = 0;
            var PRODUCT_TYPE_CODE = $("#PRODUCT_TYPE_NAME").val();
            var PRODUCT_CATEGORY_NAME = $("#PRODUCT_CATEGORY_NAME").val();
            var PRODUCT_CATEGORY_CODE = $("#PRODUCT_CATEGORY_CODE").val();
            var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val()

            if (PRODUCT_CATEGORY_CODE == "" || PRODUCT_CATEGORY_NAME == "") {
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "red");
                return;
            }
            var INVOICE_NO = $("#INVOICE_NO").val();
            //if (PRODUCT_TYPE_NAME == "SBU3" && INVOICE_NO == "") {
            //    alert("Product Provide Invoice Number");
            //    return;
            //} else {
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "#d2d6de");
                Data = JSON.stringify({
                    MasterType: MasterType,
                    PRODUCT_CATEGORY_CODE: PRODUCT_CATEGORY_CODE,
                    PRODUCT_TYPE_NAME: $("#PRODUCT_TYPE_NAME").val(),
                    PRODUCT_TYPE_CODE: PRODUCT_TYPE_CODE,
                    INVOICE_NO: INVOICE_NO,
                    TO_PLANT_CODE: $("#TO_PLANT_CODE").val()
                });
            //}
        } else if (MasterType == "GetProductMaster_SBU2") {
            var FLG = 0;
            var SelectedInvoiceNumber = $("#INVOICE_NO").val();
            if (SelectedInvoiceNumber.trim() == "") {
                alert("Entered Invoice Number is not valid");
                return false;
            }
            var PRODUCT_CATEGORY_NAME = $("#PRODUCT_CATEGORY_NAME").val();
            var PRODUCT_CATEGORY_CODE = $("#PRODUCT_CATEGORY_CODE").val();

            if (PRODUCT_CATEGORY_CODE == "" || PRODUCT_CATEGORY_NAME == "") {
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "red");
                return;
            } else {
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "#d2d6de");
                Data = JSON.stringify({
                    MasterType: MasterType,
                    PRODUCT_CATEGORY_CODE: PRODUCT_CATEGORY_CODE,
                    TO_PLANT_CODE: $("#TO_PLANT_CODE").val(),
                    PRODUCT_TYPE_NAME: $("#PRODUCT_TYPE_NAME").val(),
                    InvoiceNumber: $("#INVOICE_NO").val()
                });
            }
        } else if (MasterType == "MSD_Name") {
            var SUPPLIER_TYPE_NAME = $("#SUPPLIER_TYPE_NAME").val();
            var SITEDETAIL_CODE_STO = $("#SITEDETAIL_CODE_STO").val();
            var COMPANYDETAIL_CODE_STO = $("#COMPANYDETAIL_CODE_STO").val();

            if (SUPPLIER_TYPE_NAME == "") {
                alert("Select Product Supplied Form");
                return;
            }
            if (SUPPLIER_TYPE_NAME == "Sub Stockist") {
                return;
            }
            if (SUPPLIER_TYPE_NAME == "STOCKIST") {
                Heading = "Stockist List";
                var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
                var PLANT_MHD_CODE = $("#PLANT_MHD_CODE").val();
                var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();

                if (PRODUCT_TYPE_NAME == "") {
                    alert("Select Business Unit");
                    return;
                } else if (PRODUCT_TYPE_NAME == "SBU3") {
                    PRODUCT_TYPE_NAME = "3000";
                }

                Data = JSON.stringify({
                    MasterType: "StockistMaster",
                    PRODUCT_TYPE_NAME: PRODUCT_TYPE_NAME,
                    FROM_PLANT_CODE: FROM_PLANT_CODE
                });
            }
            if (SUPPLIER_TYPE_NAME == "Plant") {
                Heading = "Plant List";
                var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();
                Data = JSON.stringify({
                    MasterType: "GetPlantMaster",
                    BusinessUnit: BusinessUnit
                });
            }
            if (SUPPLIER_TYPE_NAME == "Depot") {
                Heading = "Depot List";
                var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();
                Data = JSON.stringify({
                    MasterType: "DepoMaster",
                    BusinessUnit: BusinessUnit
                });
            }
        } else if (MasterType == "ComplaintCategory") {
            if (($("#PRODUCT_TYPE_NAME").val()) == "SBU3") {
                Data = JSON.stringify({
                    MasterType: "ComplaintCategory",
                    BusinessUnit: "3000"
                });
            } else {
                alert("Invalid Business Unit");
                return
            }
        }

        DIMSFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);            
        });
    }

    $scope.RegisterComplaint_STO = function () {
        console.log('scope', $scope);
        try {
            var FormIdentity_STO = $("#FormIdentity_STO").val();
            var COMPLAINT_STATUS = $("#COMPLAINT_STATUS").val();

            if ($scope.FormIdentity_STO == "" || $scope.FormIdentity_STO == undefined) {
                $scope.FormIdentity_STO = "";
            }            

            var Flag = 0;
            var RowId = "";
            var CMS_RC_Material_Supply_Details_STO = new Array();
            var CMS_RC_Supply_Details_STO = new Array();

            if ($("#COMPLAINT_RECEIVED_DATE").val() == "" || typeof $("#COMPLAINT_RECEIVED_DATE").val() == "undefined") {
                Flag = Flag + 1;
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "red");
            } else {
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "#d2d6de");
            }

            if ($("#REGISTRANT_TYPE_NAME").val() == "" || typeof $("#REGISTRANT_TYPE_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#REGISTRANT_TYPE_NAME").css("border-color", "red");
            } else {
                $("#REGISTRANT_TYPE_NAME").css("border-color", "#d2d6de");
            }

            if ($("#PRODUCT_TYPE_CODE").val() == "" || typeof $("#PRODUCT_TYPE_CODE").val() == "undefined" || $("#PRODUCT_TYPE_CODE").val() != "SBU3") {
                Flag = Flag + 1;
                $("#PRODUCT_TYPE_CODE").css("border-color", "red");
            } else {
                $("#PRODUCT_TYPE_CODE").css("border-color", "#d2d6de");
            }

            if ($("#PLANT_MHD_CODE").val() == "" || typeof $("#PLANT_MHD_CODE").val() == "undefined") {
                Flag = Flag + 1;
                $("#PLANT_MHD_CODE").css("border-color", "red");
            } else {
                $("#PLANT_MHD_CODE").css("border-color", "#d2d6de");
            }

            if ($("#PLANT_MHD_NAME").val() == "" || typeof $("#PLANT_MHD_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#PLANT_MHD_NAME").css("border-color", "red");
            } else {
                $("#PLANT_MHD_NAME").css("border-color", "#d2d6de");
            }

            if ($("#TO_PLANT_CODE").val() == "" || typeof $("#TO_PLANT_CODE").val() == "undefined") {
                Flag = Flag + 1;
                $("#TO_PLANT_CODE").css("border-color", "red");
            } else {
                $("#TO_PLANT_CODE").css("border-color", "#d2d6de");
            }

            if ($("#TO_PLANT_NAME").val() == "" || typeof $("#TO_PLANT_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#TO_PLANT_NAME").css("border-color", "red");
            } else {
                $("#TO_PLANT_NAME").css("border-color", "#d2d6de");
            }

            if ($("#PRODUCT_CATEGORY_CODE").val() == "" || typeof $("#PRODUCT_CATEGORY_CODE").val() == "undefined") {
                Flag = Flag + 1;
                $("#PRODUCT_CATEGORY_CODE").css("border-color", "red");
            } else {
                $("#PRODUCT_CATEGORY_CODE").css("border-color", "#d2d6de");
            }

            if ($("#PRODUCT_CATEGORY_NAME").val() == "" || typeof $("#PRODUCT_CATEGORY_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "red");
            } else {
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "#d2d6de");
            }

            if ($("#COMPLAINT_TYPE_CODE").val() == "" || typeof $("#COMPLAINT_TYPE_CODE").val() == "undefined") {
                Flag = Flag + 1;
                $("#COMPLAINT_TYPE_CODE").css("border-color", "red");
            } else {
                $("#COMPLAINT_TYPE_CODE").css("border-color", "#d2d6de");
            }

            if ($("#COMPLAINT_TYPE_NAME").val() == "" || typeof $("#COMPLAINT_TYPE_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#COMPLAINT_TYPE_NAME").css("border-color", "red");
            } else {
                $("#COMPLAINT_TYPE_NAME").css("border-color", "#d2d6de");
            }

            if ($("#COMPLAINT_CATEGORY_CODE").val() == "" || typeof $("#COMPLAINT_CATEGORY_CODE").val() == "undefined") {
                Flag = Flag + 1;
                $("#COMPLAINT_CATEGORY_CODE").css("border-color", "red");
            } else {
                $("#COMPLAINT_CATEGORY_CODE").css("border-color", "#d2d6de");
            }

            if ($("#COMPLAINT_CATEGORY_NAME").val() == "" || typeof $("#COMPLAINT_CATEGORY_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#COMPLAINT_CATEGORY_NAME").css("border-color", "red");
            } else {
                $("#COMPLAINT_CATEGORY_NAME").css("border-color", "#d2d6de");
            }            

            if (Flag > 0) {
                return;
            } else {
                //if ($scope.FROM_PLANT_CODE == undefined) { $scope.FROM_PLANT_CODE = ""; }
                if ($scope.COMPLAINT_RECEIVED_DATE == undefined) { $scope.COMPLAINT_RECEIVED_DATE = ""; }
                if ($scope.COMPLAINT_REGISTRATION_DATE == undefined) { $scope.COMPLAINT_REGISTRATION_DATE = ""; }
                if ($scope.COMPLAINT_TRACKING_NO == undefined) { $scope.COMPLAINT_TRACKING_NO = ""; }
                if ($scope.REGISTRANT_TYPE_NAME == undefined) { $scope.REGISTRANT_TYPE_NAME = ""; }
                if ($scope.REGISTRANT_TYPE_CODE == undefined) { $scope.REGISTRANT_TYPE_CODE = ""; }
                if ($scope.DOC_SERIES_CODE == undefined) { $scope.DOC_SERIES_CODE = ""; }
                if ($scope.PRODUCT_TYPE_CODE == undefined) { $scope.PRODUCT_TYPE_CODE = ""; }
                if ($scope.COMPLAINT_STATUS == undefined) { $scope.COMPLAINT_STATUS = ""; }
                if ($scope.PLANT_MHD_CODE == undefined) { $scope.PLANT_MHD_CODE = ""; }
                if ($scope.PLANT_MHD_NAME == undefined) { $scope.PLANT_MHD_NAME = ""; }
                if ($scope.COMPLAINT_CODE == undefined) { $scope.COMPLAINT_CODE = ""; }
                if ($scope.APPROVED_DATE == undefined) { $scope.APPROVED_DATE = ""; }
                if ($scope.COMPLAINT_DESC == undefined) { $scope.COMPLAINT_DESC = ""; }
                if ($scope.REMARKS == undefined) { $scope.REMARKS = ""; }
                if ($scope.FilesPath == undefined) { $scope.FilesPath = ""; }
                
                if ($scope.TO_PLANT_CODE == undefined) { $scope.TO_PLANT_CODE = ""; }
                if ($scope.TO_PLANT_NAME == undefined) { $scope.TO_PLANT_NAME = ""; }
                if ($scope.END_CUSTOMER_DETAILS == undefined) { $scope.END_CUSTOMER_DETAILS = ""; }
                if ($scope.SITE_ADDRESS == undefined) { $scope.SITE_ADDRESS = ""; }
                if ($scope.COMPLAINT_MODE_NAME == undefined) { $scope.COMPLAINT_MODE_NAME = ""; }
                if ($scope.COMPLAINT_MODE_CODE == undefined) { $scope.COMPLAINT_MODE_CODE = ""; }
                if ($scope.PRODUCT_CATEGORY_NAME == undefined) { $scope.PRODUCT_CATEGORY_NAME = ""; }
                if ($scope.PRODUCT_CATEGORY_CODE == undefined) { $scope.PRODUCT_CATEGORY_CODE = ""; }               
                
                if ($scope.COMPLAINT_TYPE_NAME == undefined) { $scope.COMPLAINT_TYPE_NAME = ""; }
                if ($scope.COMPLAINT_TYPE_CODE == undefined) { $scope.COMPLAINT_TYPE_CODE = ""; }
                if ($scope.COMPLAINT_PRIORITY_NAME == undefined) { $scope.COMPLAINT_PRIORITY_NAME = ""; }
                if ($scope.COMPLAINT_PRIORITY_CODE == undefined) { $scope.COMPLAINT_PRIORITY_CODE = ""; }
                if ($scope.COMPLAINT_CATEGORY_NAME == undefined) { $scope.COMPLAINT_CATEGORY_NAME = ""; }
                if ($scope.COMPLAINT_CATEGORY_CODE == undefined) { $scope.COMPLAINT_CATEGORY_CODE = ""; }
                if ($scope.COMPLAINT_SEVERITY_NAME == undefined) { $scope.COMPLAINT_SEVERITY_NAME = ""; }                
                if ($scope.COMPLAINT_SEVERITY_CODE == undefined) { $scope.COMPLAINT_SEVERITY_CODE = ""; }

                if ($("#PRODUCT_TYPE_CODE").val() == "SBU3") {
                    $scope.COMPLAINT_TYPE_CODE = "CTC1";
                    $scope.COMPLAINT_TYPE_NAME = "Product Complaints";
                }

                if ($scope.CUSTOMER_TYPE_CODE == undefined) { $scope.CUSTOMER_TYPE_CODE = ""; }
                if ($scope.NATURE_OF_COMPLAINT == undefined) { $scope.NATURE_OF_COMPLAINT = ""; }

                
                $("#Material_Supply_Details_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    CMS_RC_Material_Supply_Details_STO.push({
                        SlNo: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[0].innerHTML,
                        MaterialBelongsTo: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[1].innerHTML,
                        ProductSuppliedFrom: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[2].innerHTML,
                        Name: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[3].innerHTML,
                        Material_Belongs_To_ID: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML,
                        PLANT_CODE: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML,
                        Product_Supplied_From_ID: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[6].innerHTML,
                        SUPPLIER_TYPE_CODE: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML,
                        MSD_Name_ID: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML,
                        SUPPLIER_CODE: $("#Material_Supply_Details_Table tbody #" + RowId + " td")[9].innerHTML
                    });
                });
                
                $("#Supply_Details_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    CMS_RC_Supply_Details_STO.push({
                        SlNo: $("#Supply_Details_Table tbody #" + RowId + " td")[0].innerHTML,
                        ProductDetails: $("#Supply_Details_Table tbody #" + RowId + " td")[1].innerHTML,
                        INVOICE_NO: $("#Supply_Details_Table tbody #" + RowId + " td")[2].innerHTML,
                        INVOICE_DATE: DateToWestern($("#Supply_Details_Table tbody #" + RowId + " td")[3].innerHTML),
                        BATCH_NO: $("#Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML,
                        SUPPLIED_NO: $("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML,
                        DEFECTED_NO: $("#Supply_Details_Table tbody #" + RowId + " td")[6].innerHTML,
                        TRANSPORTER: $("#Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML,
                        Defect_Type: $("#Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML,
                        REMARKS: $("#Supply_Details_Table tbody #" + RowId + " td")[9].innerHTML,
                        SD_ProductDetails_ID: $("#Supply_Details_Table tbody #" + RowId + " td")[10].innerHTML,
                        PRODUCT_CODE: $("#Supply_Details_Table tbody #" + RowId + " td")[11].innerHTML,
                        SD_DefectType_ID: $("#Supply_Details_Table tbody #" + RowId + " td")[12].innerHTML,
                        DEFECT_TYPE_CODE: $("#Supply_Details_Table tbody #" + RowId + " td")[13].innerHTML,
                        SIZE: $("#Supply_Details_Table tbody #" + RowId + " td")[14].innerHTML
                    });
                });

                $scope.COMPLAINT_RECEIVED_DATE = DateToWestern($scope.COMPLAINT_RECEIVED_DATE);
                $scope.COMPLAINT_REGISTRATION_DATE = DateToWestern($scope.COMPLAINT_REGISTRATION_DATE);
                $scope.APPROVED_DATE = DateToWestern($scope.APPROVED_DATE);

                if (CMS_RC_Material_Supply_Details_STO.length <= 0) {
                    Flag = Flag + 1;
                    alert("Please Provide Material Supply Details");
                }

                if (CMS_RC_Supply_Details_STO.length <= 0) {
                    Flag = Flag + 1;
                    alert("Please Provide Supply Details");
                }

                if (Flag > 0) {
                    return;
                } else {
                    var RegistrationData = JSON.stringify({
                        FormIdentity_STO: $("#FormIdentity_STO").val(),

                        FROM_PLANT_CODE: $("#FROM_PLANT_CODE").val(),
                        COMPLAINT_RECEIVED_DATE: $("#COMPLAINT_RECEIVED_DATE").val(),
                        COMPLAINT_REGISTRATION_DATE: $("#COMPLAINT_REGISTRATION_DATE").val(),
                        COMPLAINT_TRACKING_NO: $("#COMPLAINT_TRACKING_NO").val(),
                        REGISTRANT_TYPE_NAME: $("#REGISTRANT_TYPE_NAME").val(),
                        REGISTRANT_TYPE_CODE: $("#REGISTRANT_TYPE_CODE").val(),
                        DOC_SERIES_CODE: $("#DOC_SERIES_CODE").val(),
                        PRODUCT_TYPE_CODE: $("#PRODUCT_TYPE_CODE").val(),
                        PRODUCT_TYPE_NAME: $("#PRODUCT_TYPE_NAME").val(),
                        COMPLAINT_STATUS: $("#COMPLAINT_STATUS").val(),
                        PLANT_MHD_CODE: $("#PLANT_MHD_CODE").val(),
                        PLANT_MHD_NAME: $("#PLANT_MHD_NAME").val(),
                        COMPLAINT_CODE: $("#COMPLAINT_CODE").val(),
                        APPROVED_DATE: $("#APPROVED_DATE").val(),
                        COMPLAINT_DESC: $("#COMPLAINT_DESC").val(),
                        REMARKS: $("#REMARKS").val(),
                        FilesPath: $("#SelectedFiles").text(),

                        TO_PLANT_CODE: $("#TO_PLANT_CODE").val(),
                        TO_PLANT_NAME: $("#TO_PLANT_NAME").val(),
                        END_CUSTOMER_DETAILS: $("#END_CUSTOMER_DETAILS").val(),
                        SITE_ADDRESS: $("#SITE_ADDRESS").val(),
                        COMPLAINT_MODE_NAME: $("#COMPLAINT_MODE_NAME").val(),
                        COMPLAINT_MODE_CODE: $("#COMPLAINT_MODE_CODE").val(),
                        PRODUCT_CATEGORY_NAME: $("#PRODUCT_CATEGORY_NAME").val(),
                        PRODUCT_CATEGORY_CODE: $("#PRODUCT_CATEGORY_CODE").val(),

                        COMPLAINT_TYPE_NAME: $("#COMPLAINT_TYPE_NAME").val(),
                        COMPLAINT_TYPE_CODE: $("#COMPLAINT_TYPE_CODE").val(),
                        COMPLAINT_PRIORITY_NAME: $("#COMPLAINT_PRIORITY_NAME").val(),
                        COMPLAINT_PRIORITY_CODE: $("#COMPLAINT_PRIORITY_CODE").val(),
                        COMPLAINT_CATEGORY_NAME: $("#COMPLAINT_CATEGORY_NAME").val(),
                        COMPLAINT_CATEGORY_CODE: $("#COMPLAINT_CATEGORY_CODE").val(),
                        COMPLAINT_SEVERITY_NAME: $("#COMPLAINT_SEVERITY_NAME").val(),
                        COMPLAINT_SEVERITY_CODE: $("#COMPLAINT_SEVERITY_CODE").val(),

                        NATURE_OF_COMPLAINT: $("#NATURE_OF_COMPLAINT").val(),

                        SITEDETAIL_CODE_STO: $("#SITEDETAIL_CODE_STO").val(),
                        COMPANYDETAIL_CODE_STO: $("#COMPANYDETAIL_CODE_STO").val(),
                        CREATED_BY: $("#UserCode_STO").val(),
                        CMS_RC_Material_Supply_Details_STO: CMS_RC_Material_Supply_Details_STO,
                        CMS_RC_Supply_Details_STO: CMS_RC_Supply_Details_STO
                    });

                    var MyTest = $("#MyTest").val();

                    if (MyTest == "") {
                        if (confirm("Do you want to Save data?")) { } else {
                            return;
                        }
                    }
                    if (MyTest == "Save")
                        MyTest = "";

                    $http({
                        method: 'POST',
                        url: '../../ComplaintRegistrationSTO/SaveComplaint',
                        async: false,
                        data: { RegistrationData: RegistrationData },
                    }).then(function successCallback(response) {
                        if (response.data == "FALSE") {
                            alert("Error Occured try later");
                            return;
                        }
                        if (response.data == "TRUE") {
                            if (MyTest == "") {
                                alert("Successfully Saved the data");
                            } else {
                                return "true";
                            }
                        } else {
                            var RD = JSON.parse(response.data);
                            if (RD["Result"] == "TRUE") {
                                $("#FormIdentity_STO").val(RD["ID"]);
                                $("#COMPLAINT_CODE").val(RD["CC"]);
                                //$(".Complaint_NumberDiv").css("display", "block");
                                $("#Complaint_Number").val(RD["ID"]);
                            }
                            if (MyTest == "") {
                                alert("Successfully Saved the data");
                            } else {
                                return "true";
                            }
                        }
                        if ($("#COMPLAINT_STATUS").val() == "DRAFT") {
                            $("#SendRegistrationApproval").css('display', 'block');
                        } else {
                            $("#SendRegistrationApproval").css('display', 'none');
                        }
                        $("#MyTest").val("");
                        //go('RegistrationList_STO');
                    }, function errorCallback(response) {
                        alert("Error : " + response);
                    });
                }                
            }
        } catch (e) {
            alert("Error :RegisterComplaint_STO : " + e);
        }
    }

    $scope.SendRegistrationForApproval_STO = function () {
        try {
            if (SendForReviewDoubleClick == "") {

            } else {
                //alert("Don't Double Click");
                //return;
            }

            SendForReviewDoubleClick = "ASD";

            if (confirm("Do you want to Send for review?")) { } else {
                SendForReviewDoubleClick = "";
                return;
            }

            ShowLoader();

            $("#MyTest").val("ASD");
            $scope.RegisterComplaint_STO();

            var FormIdentity_STO = $("#FormIdentity_STO").val();
            var Doc_Status = $("#COMPLAINT_STATUS").val();
            if (Doc_Status == "DRAFT") { } else {
                alert("Document Status is " + Doc_Status + "");
                $("#MyTest").val("");
                return;
                SendForReviewDoubleClick = "";
                HideLoader();
            }

            if ($scope.FormIdentity_STO == "" || $scope.FormIdentity_STO == undefined) {
                $scope.FormIdentity_STO = "";
            }

            var Flag = 0;

            if ($scope.COMPLAINT_RECEIVED_DATE == "" || $scope.COMPLAINT_RECEIVED_DATE == undefined) {
                Flag = Flag + 1;
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "red");
            } else {
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "#d2d6de");
            }

            if ($scope.REGISTRANT_TYPE_NAME == "" || $scope.REGISTRANT_TYPE_NAME == undefined) {
                Flag = Flag + 1;
                $("#REGISTRANT_TYPE_NAME").css("border-color", "red");
            } else {
                $("#REGISTRANT_TYPE_NAME").css("border-color", "#d2d6de");
            }

            if ($scope.DOC_SERIES_CODE == "" || $scope.DOC_SERIES_CODE == undefined) {
                Flag = Flag + 1;
                $("#DOC_SERIES_CODE").css("border-color", "red");
            } else {
                $("#DOC_SERIES_CODE").css("border-color", "#d2d6de");
            }

            if ($scope.TO_PLANT_CODE == "" || $scope.TO_PLANT_CODE == undefined) {
                Flag = Flag + 1;
                $("#TO_PLANT_CODE").css("border-color", "red");
            } else {
                $("#TO_PLANT_CODE").css("border-color", "#d2d6de");
            }

            if ($scope.TO_PLANT_NAME == "" || $scope.TO_PLANT_NAME == undefined) {
                Flag = Flag + 1;
                $("#TO_PLANT_NAME").css("border-color", "red");
            } else {
                $("#TO_PLANT_NAME").css("border-color", "#d2d6de");
            }
            
            if ($("#PRODUCT_TYPE_NAME").val() == "" || $("#PRODUCT_TYPE_NAME").val() == undefined) {
                Flag = Flag + 1;
                $("#PRODUCT_TYPE_NAME").css("border-color", "red");
            } else {
                $("#PRODUCT_TYPE_NAME").css("border-color", "#d2d6de");
            }

            if ($("#PRODUCT_CATEGORY_NAME").val() == "" || $("#PRODUCT_CATEGORY_NAME").val() == undefined) {
                Flag = Flag + 1;
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "red");
            } else {
                $("#PRODUCT_CATEGORY_NAME").css("border-color", "#d2d6de");
            }

            if ($("#PLANT_MHD_CODE").val() == "" || $("#PLANT_MHD_CODE").val() == undefined) {
                Flag = Flag + 1;
                $("#PLANT_MHD_CODE").css("border-color", "red");
            } else {
                $("#PLANT_MHD_CODE").css("border-color", "#d2d6de");
            }

            if ($("#PLANT_MHD_NAME").val() == "" || $("#PLANT_MHD_NAME").val() == undefined) {
                Flag = Flag + 1;
                $("#PLANT_MHD_NAME").css("border-color", "red");
            } else {
                $("#PLANT_MHD_NAME").css("border-color", "#d2d6de");
            }

            if ($("#PRODUCT_TYPE_NAME").val() == "SBU3") {
                if ($("#SelectedFiles").text() != "") {
                    //$("#ClickUploadFile").val(1);
                    //$("#ClickSaveComplaint").val(1);
                }
                //console.log('InvestigationFilesUploaded', $("ul#InvestigationFilesUploaded li").length)
                //var file = document.getElementById('ComplaintFile').files.length;
                //if (file == 0 && ($("ul#ComplaintFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
                //    alert("Please Select Attachment and Press Upload and then click on Save button");
                //    return;
                //}
                //if (file >= 0 && $("#ClickUploadFile").val() == 0 && $("#ClickSaveComplaint").val() == 0) {
                //    alert("Please Upload Attachment and then click on Save button");
                //    return;
                //}

                //if (file >= 0 && $("#ClickUploadFile").val() == 1 && $("#ClickSaveComplaint").val() == 0) {
                //    alert("Please Save Complaint");
                //    return;
                //}
                if ($scope.COMPLAINT_TYPE_NAME == "" || $scope.COMPLAINT_TYPE_NAME == undefined) {
                    Flag = Flag + 1;
                    $("#COMPLAINT_TYPE_NAME").css("border-color", "red");
                } else {
                    $("#COMPLAINT_TYPE_NAME").css("border-color", "#d2d6de");
                }

                if ($("#COMPLAINT_CATEGORY_NAME").val() == "") {
                    Flag = Flag + 1;
                    $("#COMPLAINT_CATEGORY_NAME").css("border-color", "red");
                } else {
                    $("#COMPLAINT_CATEGORY_NAME").css("border-color", "#d2d6de");
                }

                if (($("#Supply_Details_Table tbody tr").length) == 0) {
                    Flag = Flag + 1;
                    alert("Supply Details are Mandatory");
                } else { }
            }

            var FormIdentity_STO = $("#FormIdentity_STO").val();

            if (Flag > 0) {
                alert("Fill All Mandatory fields before sending for Approval");
                $("#MyTest").val("");
                SendForReviewDoubleClick = "";
                HideLoader();
                return;
            } else if (FormIdentity_STO == "") {
                alert("Save the form before Sending for Approval");
                SendForReviewDoubleClick = "";
                HideLoader();
            } else {
                var ApprovalData = JSON.stringify({
                    FormIdentity_STO: FormIdentity_STO,
                    CREATED_BY: $("#UserCode_STO").val(),
                    FORM_NAME: "Registration_STO"
                });

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationSTO/SendForApproval',
                    async: false,
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {
                    SendForReviewDoubleClick = "";
                    HideLoader();

                    if (response.data == "FALSE") {
                        alert("Error Occured try later");
                    } else if (response.data == "TRUE") {
                        $("#COMPLAINT_STATUS").val("Waiting for Approval");
                        $("#COMPLAINT_TRACKING_NO").val(FormIdentity_STO);
                        alert("Complaint has been successfully sent for review, Your Complaint Tracking # " + FormIdentity_STO + " .");
                        $("#SalesRepMasterSpan").css("pointer-events", "none");
                        $("#CR_Series_CodeSpan").css("pointer-events", "none");
                        $("#StockistMasterSpan").css("pointer-events", "none");
                        $("#ComplaintModeSpan").css("pointer-events", "none");
                        $("#Prod_Typ_MastSapn").css("pointer-events", "none");
                        $("#ProductDivisionMasterSpan").css("pointer-events", "none");
                        $("#GetComplaintTypeSpan").css("pointer-events", "none");
                        $("#GetComplaintPrioritySpan").css("pointer-events", "none");
                        $("#GetComplaintCategorySpan").css("pointer-events", "none");
                        $("#GetComplaintSeveritySpan").css("pointer-events", "none");
                        $("#CompRegSave").css('display', 'none');
                        $("#SendRegistrationApproval").css('display', 'none');
                        $("#SupplyDetails_Add").css('display', 'none');
                        $("#Receipt_Details_Sheeting_Add").css('display', 'none');
                        $("#Mat_Sup_Det_Add").css('display', 'none');
                        $scope.COMPLAINT_STATUS = "Waiting for Approval";
                        var UserTypeCode = $("#UserType_ID_STO").val();
                        var ProdType = $("#PRODUCT_TYPE_NAME").val();
                        //alert("UserTypeCode : " + UserTypeCode + "\tProdType" + ProdType);

                        //if (UserTypeCode == "CSO" && ProdType == "SBU1") {
                        //    $scope.MakeApproved_STO('Approved');
                        //} else if (UserTypeCode == "CQT" && ProdType == "SBU2") {
                        //    $scope.MakeApproved_STO('Approved');
                        //} else {
                        //    HideLoader();
                        //    $scope.go('RegistrationList_STO');
                        //}
                        $scope.MakeApproved_STO('Approved');
                    }
                }, function errorCallback(response) {
                    alert("Error : " + response);
                    SendForReviewDoubleClick = "";
                    HideLoader();
                });
            }
        } catch (e) {
            alert("Error :SendRegistrationForApproval_STO : " + e);
        }
    }

    $scope.GetApprovalPopUp_STO = function () {
        try {
            $("#APPROVALS_REMARKS").val("");
            $("#ApprovalsActionForm").modal('show');
        } catch (e) {
            alert("Error : " + e);
        }
    }

    $scope.MakeApproved_STO = function (DECISION) {
        try {
            var UserTypeCode = $("#UserType_ID_STO").val();
            var ProdType = $("#PRODUCT_TYPE_NAME").val();

            if ($scope.COMPLAINT_STATUS == "DRAFT") {
                alert("Send for approval");
                return;
            } else if ($scope.COMPLAINT_STATUS == "Approved") {
                alert("This record already got approved");
                return;
            } else if ($scope.COMPLAINT_STATUS == "Rejected") {
                alert("This record already got Rejected");
                return;
            }

            var APPROVALS_REMARKS = "";

            if (UserTypeCode == "CSO" || UserTypeCode == "CQT") { } else {
                APPROVALS_REMARKS = $("#APPROVALS_REMARKS").val();
            }

            if (DECISION == "Rejected") {
                if (APPROVALS_REMARKS == "") {
                    alert("Provide Reason for Rejection");
                    return;
                }
            } else {
                APPROVALS_REMARKS = "";
            }

            if (UserTypeCode == "CSO" || UserTypeCode == "CQT") { } else {
                $("#ApprovalsActionForm").modal('hide');
            }

            $("#MyTest").val("ASD");
            $scope.RegisterComplaint_STO();

            var ApprovalData = JSON.stringify({
                COMPLAINT_TRACKING_NO: $("#Complaint_Number").val(),
                MODIFIED_BY: $("#UserCode_STO").val(),
                FORM_NAME: "Registration_STO",
                DECISION: DECISION,
                APPROVALS_REMARKS: APPROVALS_REMARKS,
                PLANT_MHD_CODE: $("#PLANT_MHD_CODE").val(),
                PLANT_MHD_NAME: $("#PLANT_MHD_NAME").val()
            });

            $http({
                method: 'POST',
                url: '../../ComplaintRegistrationSTO/MakeApproval',
                async: false,
                data: { ApprovalData: ApprovalData },
            }).then(function successCallback(response) {
                if (response.data == "FALSE") {
                    alert("Error Occured try later");
                } else if (response.data == "TRUE") {
                    $("#COMPLAINT_STATUS").val(DECISION);
                    alert("Successfully " + DECISION);
                    $("#CompRegSave").css('display', 'none');
                    $("#SendRegistrationApproval").css('display', 'none');
                    $("#MakeApproved_STO").css('display', 'none');
                    $("#SalesRepMasterSpan").css("pointer-events", "none");
                    $("#CR_Series_CodeSpan").css("pointer-events", "none");
                    $("#StockistMasterSpan").css("pointer-events", "none");
                    $("#ComplaintModeSpan").css("pointer-events", "none");
                    $("#Prod_Typ_MastSapn").css("pointer-events", "none");
                    $("#ProductDivisionMasterSpan").css("pointer-events", "none");
                    $("#GetComplaintTypeSpan").css("pointer-events", "none");
                    $("#GetComplaintPrioritySpan").css("pointer-events", "none");
                    $("#GetComplaintCategorySpan").css("pointer-events", "none");
                    $("#GetComplaintSeveritySpan").css("pointer-events", "none");
                    $("#SupplyDetails_Add").css('display', 'none');
                    $("#Receipt_Details_Sheeting_Add").css('display', 'none');
                    $("#Mat_Sup_Det_Add").css('display', 'none');

                    var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();
                    //alert(UserTypeCode + "\t" + BusinessUnit);
                    //if ((UserTypeCode == "CSO" && BusinessUnit == "SBU1") || (UserTypeCode == "CQT" && BusinessUnit == "SBU2")) {
                    if (BusinessUnit == "SBU3") {
                        alert("This Complaint will be Automatically Assigned to Plant mhd");
                        try {
                            var AssignData = JSON.stringify({
                                TrackingNo: $("#Complaint_Number").val(),
                                RoleCode: $("#UserType_STO").val(),
                                RoleName: $("#UserType_ID_STO").val(),
                                UserCode_STO: $("#UserCode_STO").val(),
                                UserName_STO: $("#UserName_STO").val(),
                                PLANT_MHD_CODE: $("#PLANT_MHD_CODE").val(),
                                PLANT_MHD_NAME: $("#PLANT_MHD_NAME").val()
                            });

                            $.ajax({
                                type: 'POST',
                                url: '../../ComplaintRegistrationSTO/AutoAssignComplaint',
                                async: false,
                                data: { AssignData: AssignData },
                                success: function (Resp) {
                                    if (Resp != "") {
                                        $("#COMPLAINT_STATUS").val("Complaint Assigned");
                                        alert("Complaint Successfully Assigned to plant mhd");
                                    }
                                    $scope.go('RegistrationList_STO');
                                },
                                error: function (xhr, two, err) {
                                    alert("Error Occured.\n Please take a screenshot of the next two alerts and mail the screen shot to CSM");
                                    alert("XHR : " + xhr + "\n Two : " + two + "\n Error : " + err);
                                    alert(JSON.stringify(xhr) + "\n" + JSON.stringify(two) + "\n" + JSON.stringify(err));
                                    //GetMeTheComplaintInInvestigation();
                                }
                            });
                        } catch (e) {
                            alert("Error : " + e);
                            GetMeTheComplaintInInvestigation();
                        }
                    } else {
                        $scope.go('ComplaintPendingApproval');
                    }
                }
                //go('ComplaintPendingApproval');
            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        } catch (e) {
            alert("Error :MakeApprovedReg : " + e);
        }
    }

    $scope.PlantChange = function () {
        //debugger
        try {
            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
            $("#CMSPlant").val(FROM_PLANT_CODE);
        } catch (e) {
            alert("Error :PlantChange : " + e);
        }
    }
});
//Sales Master PopUp
function GetPlantMHD_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        RegistrationScope_STO.PLANT_MHD_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.PLANT_MHD_NAME = $(obj).children().eq(2).html();
        $("#PLANT_MHD_CODE").val($(obj).children().eq(1).html());
        $("#PLANT_MHD_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//CR Series code pop up
function GetCRSeriesCode_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        RegistrationScope_STO.DOC_SERIES_CODE = $(obj).children().eq(1).html();
        $("#DOC_SERIES_CODE").val($(obj).children().eq(1).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Customer pop up
function GetPlant_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        RegistrationScope_STO.TO_PLANT_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.TO_PLANT_NAME = ($(obj).children().eq(2).html()).replace("&amp;", "&");
        $("#TO_PLANT_CODE").val($(obj).children().eq(1).html());
        $("#TO_PLANT_NAME").val(($(obj).children().eq(2).html()).replace("&amp;", "&"));
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//Complaint Mode Pop up
function GetComplaint_Mode_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        //RegistrationScope_STO.Complaint_Mode_ID = $(obj).children().eq(0).html();
        RegistrationScope_STO.COMPLAINT_MODE_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.COMPLAINT_MODE_NAME = $(obj).children().eq(2).html();
        $("#COMPLAINT_MODE_CODE").val($(obj).children().eq(1).html());
        $("#COMPLAINT_MODE_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product Type master pop up
//function GetProductTypeCode_STO(obj) {
//    RegistrationScope_STO.$apply(function () {
//        $("#PLANT_MHD_CODE").val("");
//        $("#PLANT_MHD_NAME").val("");

//        if ($("#UserCode_STO").val() == "KAM") {
//            if ($(obj).children().eq(1).html() == "SBU3") {
//                alert("KAM has no access to this Business Unit");
//                $("#PRODUCT_TYPE_CODE").val("");
//                $("#PRODUCT_TYPE_NAME").val("");
//                $("#PRODUCT_CATEGORY_NAME").val("");
//                $("#PRODUCT_CATEGORY_CODE").val("");
//                //ProductTypeChanges($(obj).children().eq(1).html());
//            }
//        } else {
//            $("#PRODUCT_TYPE_CODE").val($(obj).children().eq(1).html());
//            $("#PRODUCT_TYPE_NAME").val($(obj).children().eq(2).html());
//            $("#PRODUCT_CATEGORY_NAME").val("");
//            $("#PRODUCT_CATEGORY_CODE").val("");
//            ProductTypeChanges($(obj).children().eq(1).html());
//        }

//        var UserType_ID_STO = $("#UserType_ID_STO").val();

//        if (UserType_ID_STO == "FSO" || UserType_ID_STO == "FSO_BU2" || UserType_ID_STO == "FSO_BU3") {
//            var UserCode_STO = $("#UserCode_STO").val();
//            if (UserCode_STO == "KAM") {
//                $("#PLANT_MHD_CODE").val("");
//                $("#PLANT_MHD_NAME").val("");
//            } else {
//                $("#PLANT_MHD_CODE").val("");
//                $("#PLANT_MHD_NAME").val("");
//            }
//        } else {

//        }

//        var BU = $("#PRODUCT_TYPE_NAME").val();

//        if (BU == "SBU3") {
//            //$(".BreakageQtyLabel").text("Defect Qty (Nos)");
//        }
//    })
//    var element = angular.element('#LookUpModal');
//    element.modal('hide');
//}
//Product Product Division Master
function GetProductDivisionMaster_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        RegistrationScope_STO.PRODUCT_CATEGORY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.PRODUCT_CATEGORY_NAME = $(obj).children().eq(2).html();
        $("#PRODUCT_CATEGORY_CODE").val($(obj).children().eq(1).html());
        $("#PRODUCT_CATEGORY_NAME").val($(obj).children().eq(2).html());

        if (($(obj).children().eq(1).html()) == "88") {
            //$(".BreakageQtyLabel").text("Defect Qty (Nos)");
        } else {
            //$(".BreakageQtyLabel").text("Breakage Qty (Nos)");
        }

        if (($(obj).children().eq(1).html()) == "14") {
            $(".LabelForACSheets").css('display', 'none');
            $(".LabelForCCSheets").css('display', 'block');
        } else if (($(obj).children().eq(1).html()) == "11") {
            $(".LabelForACSheets").css('display', 'block');
            $(".LabelForCCSheets").css('display', 'none');
        }

        var BU = $("#PRODUCT_TYPE_NAME").val();
        if (BU == "SBU3") {
            //$(".BreakageQtyLabel").text("Defect Qty (Nos)");
            //if (($(obj).children().eq(1).html()) == "36")
            //    ProductTypeChanges("SBU2");
            //else
            //    ProductTypeChanges("SBU3");
            // svprasadk display material supply details for SBU3 -- 15-10-2019
            ProductTypeChanges("SBU2");
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product category master pop up
function GetProd_Cat_Mast(obj) {
    RegistrationScope_STO.$apply(function () {
        //RegistrationScope_STO.Product_Category_ID = $(obj).children().eq(0).html();
        RegistrationScope_STO.PRODUCT_CATEGORY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.PRODUCT_CATEGORY_NAME = $(obj).children().eq(2).html();
        $("#PRODUCT_CATEGORY_CODE").val($(obj).children().eq(1).html());
        $("#PRODUCT_CATEGORY_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Plant Master pop up
function GetPlantMaster_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        $("#Material_Belongs_To_ID").val($(obj).children().eq(0).html());
        $("#PLANT_CODE").val($(obj).children().eq(1).html());
        $("#PLANT_NAME").val(($(obj).children().eq(2).html()).replace('&amp;', '&'));
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Name pop up
function GetMSD_Name_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        RegistrationScope_STO.MSD_Name_ID = $(obj).children().eq(0).html();
        RegistrationScope_STO.SUPPLIER_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.SUPPLIER_NAME = ($(obj).children().eq(2).html()).replace("&amp;", "&");
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint Type Master pop up
function GetComplaintType_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        //RegistrationScope_STO.Complaint_Type_ID = $(obj).children().eq(0).html();
        RegistrationScope_STO.COMPLAINT_TYPE_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.COMPLAINT_TYPE_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint category Master Pop up
function GetComplaintCategory_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        //RegistrationScope_STO.Complaint_Category_ID = $(obj).children().eq(0).html();
        RegistrationScope_STO.COMPLAINT_CATEGORY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.COMPLAINT_CATEGORY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complanint Priority Master Pop up
function GetComplaintPriority_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        //RegistrationScope_STO.Complaint_Priority_ID = $(obj).children().eq(0).html();
        RegistrationScope_STO.COMPLAINT_PRIORITY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.COMPLAINT_PRIORITY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint Severity master pop up
function GetComplaintSeverity_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        //RegistrationScope_STO.Complaint_Severity_ID = $(obj).children().eq(0).html();
        RegistrationScope_STO.COMPLAINT_SEVERITY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_STO.COMPLAINT_SEVERITY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product master pop up
function GetProductMaster_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        $("#Item_Type_Product_ID").val($(obj).children().eq(0).html());
        $("#Item_Type_Product_CODE").val($(obj).children().eq(1).html());
        $("#Item_Type_Product_Name").val($(obj).children().eq(2).html());
        $("#GrossWeight").val($(obj).children().eq(6).html());
        $("#Size_M").val($(obj).children().eq(3).html());
        //RegistrationScope_STO.Item_Type_Product_ID = $(obj).children().eq(0).html();
        //RegistrationScope_STO.Item_Type_Product_CODE = $(obj).children().eq(1).html();
        //RegistrationScope_STO.Item_Type_Product_Name = $(obj).children().eq(2).html();
        //RegistrationScope_STO.GrossWeight = $(obj).children().eq(6).html();
        //RegistrationScope_STO.Size_M = $(obj).children().eq(3).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product master pop up
function GetSD_ProductMaster_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        try {
            $("#SD_ProductDetails").val($(obj).children().eq(2).html());
            $("#SD_ProductDetails_ID").val($(obj).children().eq(0).html());
            $("#PRODUCT_CODE").val($(obj).children().eq(1).html());
            $("#SIZE").val($(obj).children().eq(3).html());
            $("#SD_ProductDetails_SBU2").val($(obj).children().eq(2).html());
            $("#SD_ProductDetails_ID_SBU2").val($(obj).children().eq(0).html());
            $("#PRODUCT_CODE").val($(obj).children().eq(1).html());
            $("#SIZE").val($(obj).children().eq(3).html());
            $("#INVOICE_DATE").val($(obj).children().eq(9).html());
            //RegistrationScope_STO.SD_ProductDetails = $(obj).children().eq(2).html();
            //RegistrationScope_STO.SD_ProductDetails_ID = $(obj).children().eq(0).html();
            //RegistrationScope_STO.PRODUCT_CODE = $(obj).children().eq(1).html();
            //RegistrationScope_STO.SIZE = $(obj).children().eq(3).html();
        } catch (e) {
            alert(e);
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
//function GetDefectTypeMaster(obj) {
//    RegistrationScope_STO.$apply(function () {
//        $("#Defect_Type_ID").val($(obj).children().eq(0).html());
//        $("#Defect_Type_CODE").val($(obj).children().eq(1).html());
//        $("#Defect_Type").val($(obj).children().eq(2).html());
//    })
//    var element = angular.element('#LookUpModal');
//    element.modal('hide');
//}
//Defect type master pop up
function GetSD_DefectTypeMaster_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        $("#SD_DefectType_ID").val($(obj).children().eq(0).html());
        $("#DEFECT_TYPE_CODE").val($(obj).children().eq(1).html());
        $("#SD_DefectType").val($(obj).children().eq(2).html());
        $("#SD_DefectType_ID_SBU2").val($(obj).children().eq(0).html());
        $("#DEFECT_TYPE_CODE").val($(obj).children().eq(1).html());
        $("#SD_DefectType_SBU2").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product Master pop up
function GetProductSuppliedFrom_STO(obj) {
    RegistrationScope_STO.$apply(function () {
        if ((($(obj).children().eq(2).html()) == "Sub Stockist") && (($("#PRODUCT_TYPE_NAME").val()) == "SBU3")) {
            alert("Sub Stockist is Not Applicable for SBU3");
        } else {
            $("#Product_Supplied_From_ID").val($(obj).children().eq(0).html());
            $("#SUPPLIER_TYPE_CODE").val($(obj).children().eq(1).html());
            $("#SUPPLIER_TYPE_NAME").val($(obj).children().eq(2).html());
            $("#SUPPLIER_NAME").val("");
            $("#MSD_Name_ID").val("");
            $("#SUPPLIER_CODE").val("");
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetMeTheComplaintInInvestigation() {
    try {
        var AssignData = JSON.stringify({
            TrackingNo: $("#Complaint_Number").val(),
            RoleCode: $("#UserType_STO").val(),
            RoleName: $("#UserType_ID_STO").val(),
            UserCode_STO: $("#UserCode_STO").val(),
            UserName_STO: $("#UserName_STO").val()
        });

        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationSTO/GetMeTheComplaintInInvestigation',
            async: false,
            data: { AssignData: AssignData },
            success: function (Resp) {
                if (Resp != "") {
                    $("#COMPLAINT_STATUS").val("Complaint Assigned");
                    alert("Complaint Successfully Assigned to You");
                }
                $scope.go('RegistrationList_STO');
            },
            error: function (xhr, two, err) {
                alert("Error Occured.\n Please take a screenshot of the next two alerts and mail the screen shot to CSM");
                alert("XHR : " + xhr + "\n Two : " + two + "\n Error : " + err);
                alert(JSON.stringify(xhr) + "\n" + JSON.stringify(two) + "\n" + JSON.stringify(err));
                GetMeTheComplaintInInvestigation()
            }
        });
    } catch (e) {
        alert("GetMeTheComplaintInInvestigation : " + e);
        GetMeTheComplaintInInvestigation();
    }
}