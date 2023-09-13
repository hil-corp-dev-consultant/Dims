/*
 * 
    Module              : CMS - DIMS Solution.
    DocumentName        : RegistrationList_ICC.cs
    Project Name        : Dealer Information Management System (DIMS).
    Client Name         : HIL :: CK BIRLA GROUP.
    Description         : This Doc is for used for Complaint Registration ICC List.
    Developer Name      : SVPRASADK.
    Change Log          : NA.
    Date Started        : 20-07-2020
 *
 */

//Registration_ICC List
DIMS.controller('RegistrationListCtrl_ICC', function ($scope, $location, DIMSFactory) {
    complaintRegistrationScope_ICC = $scope;
    angular.element(document).ready(function () {
        CheckUserSession();
        var UserType_ICC = $("#UserType_ICC").val();

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: UserType_ICC, FormCode: 'REG_ICC' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#CreateNewComplaint_ICC").css('display', 'none');
                    $("#CMS_List_ICC").css('display', 'none');
                    $("#StateFilter_ICC").css('display', 'none');
                } else {
                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#CMS_List_ICC").css('display', 'block');
                        $("#StateFilter_ICC").css('display', 'block');
                    } else {
                        $("#CMS_List_ICC").css('display', 'none');
                        $("#StateFilter_ICC").css('display', 'none');
                    }
                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#CreateNewComplaint_ICC").css('display', 'block');
                    } else {
                        $("#CreateNewComplaint_ICC").css('display', 'none');
                    }
                }

                $("#HiddenForCMS").val("");

                $.ajax({
                    type: 'POST',
                    url: '../../ComplaintRegistrationICC/FillCMSStateFilter',
                    success: function (response) {
                        $("#StateFilter_ICC").empty();
                        if (response != "") {
                            response = JSON.parse(response);
                            //Start of All option for Complaint Registration_ICC List
                            var UserCode_ICC = $("#UserCode_ICC").val();
                            var SessionUserType = $("#UserType_ICC").val();
                            
                            if (UserType_ICC == "2021" || UserType_ICC == "2019" || UserType_ICC == "50001234" || SessionUserType == "QAM_SBU3" || SessionUserType == "RSH_BU3" || SessionUserType == "NSH_BU3" || SessionUserType == "CSM_BU3" || SessionUserType == "QAM_SBU2" || SessionUserType == "CSM_BU2" || SessionUserType == "Plant_MHD") {
                                var option = $('<option></option>').attr("value", "ALL").text("ALL");
                                $("#StateFilter_ICC").append(option);
                            }
                            //End 
                            for (var i = 0; i < response.length; i++) {
                                var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                                $("#StateFilter_ICC").append(option);
                            }
                            
                            var CMSState_ICC = $("#CMSState_ICC").val();

                            if (CMSState_ICC == "" || typeof CMSState_ICC == "undefined") {
                                $("#StateFilter_ICC").val(response[0]["STATE_CODE"]);
                                $("#CMSState_ICC").val(response[0]["STATE_CODE"]);
                            } else {
                                $("#StateFilter_ICC").val(CMSState_ICC);
                            }

                            var StateFilter_ICC = $("#StateFilter_ICC").val();
                            var UserCode_ICC = $("#UserCode_ICC").val();
                            var UserType_ICC = $("#UserType_ICC").val();

                            var WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' ";

                            if (UserType_ICC == "STOCKIST" || UserType_ICC == "BU2_STK" || UserType_ICC == "BU3_STK") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.DOC_STATUS!='' AND CMS_RC_ICC.CUSTOMER_CODE='" + UserCode_ICC + "'";
                            }
                            else if (UserType_ICC == "50000822" || UserType_ICC == "50002304" || UserType_ICC == "KAM") {
                                if (StateFilter_ICC == "ALL") {
                                    WhereClause = " WHERE CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU2' AND CMS_RC_ICC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU2' AND CMS_RC_ICC.DOC_STATUS!='' ";
                                }
                            }
                            else if (UserType_ICC == "50000985") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.DOC_STATUS!=''";
                            }
                            else if (UserType_ICC == "SH_BU3") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!='' AND CMS_RC_ICC.CREATED_BY='" + UserCode_ICC + "'";
                            }
                            else if (UserType_ICC == "RSH_BU3" || UserType_ICC == "NSH_BU3") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!=''";
                            }
                            else if (UserType_ICC == "2019" || UserType_ICC == "2021" || UserType_ICC == "50001234" || UserType_ICC == "QAM_SBU3" || UserType_ICC == "CSM_BU3" || UserType_ICC == "Plant_MHD" || UserType_ICC == "MDO") {

                                if (StateFilter_ICC == "ALL") {
                                    WhereClause = " WHERE CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!='' ";
                                }
                            }
                            else if (UserType_ICC == "FSO") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU1' AND CMS_RC_ICC.DOC_STATUS!='' AND (CMS_RC_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_RC_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "FSO_BU2") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND (CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_RC_ICC.DOC_STATUS!='' AND (CMS_RC_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_RC_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "FSO_BU3") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!='' AND (CMS_RC_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_RC_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "FSO_BU2_BU3") {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND (CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_RC_ICC.DOC_STATUS!='' AND (CMS_RC_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_RC_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "QAM_SBU2" || UserType_ICC == "CSM_BU2") {
                                if (StateFilter_ICC == "ALL") {
                                    WhereClause = " WHERE (CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_RC_ICC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND (CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_RC_ICC.DOC_STATUS!='' ";
                                }
                            }
                            else {
                                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU1' AND CMS_RC_ICC.DOC_STATUS!='' ";
                            }

                            var Data = JSON.stringify({
                                MasterType: "ComplaintRegistrationList_ICC",
                                ID: "561",
                                UserCode: $("#UserCode_ICC").val(),
                                "Type": "Get",
                                ReportName: "ComplaintRegistrationList_ICC",
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
                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "RegistrationList_ICC", UserSelectedColumnName);
                                    $('#RegistrationList_ICC tbody').on('click', 'tr', function () {
                                        var ID = $(this).find('td:eq(7)').text();
                                        if ($(this).hasClass('selected')) {
                                            $(this).removeClass('selected');
                                        } else { }

                                        if (ID != "") {
                                            $.ajax({
                                                url: '../../Users/GetRightToAccess',
                                                type: 'GET',
                                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ICC").val(), FormCode: 'REG_ICC' }) },
                                                success: function (AccessData) {
                                                    if (AccessData == "") { } else {
                                                        AccessData = JSON.parse(AccessData);
                                                        if (AccessData[0]["IS_VIEW"] == true || AccessData[0]["IS_UPDATE"] == true) {
                                                            var scope = angular.element($("#RegistrationListDiv_ICC")).scope();
                                                            scope.$apply(function () {
                                                                scope.go("Registration_ICC/" + ID);
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

    $scope.StateChange_ICC = function () {
        try {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
            $("#CMSState_ICC").val(StateFilter_ICC);
            var UserCode_ICC = $("#UserCode_ICC").val();
            //var WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "'  ORDER BY CMS_RC_ICC.ID DESC ";
            var WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' ";
            var UserType_ICC = $("#UserType_ICC").val();

            if (UserCode_ICC == "50003209") {
                if (StateFilter_ICC == "ALL") {
                    WhereClause = " WHERE CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!=''";
                } else {
                    WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!='' ";
                }
            } else {
                WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_RC_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_RC_ICC.DOC_STATUS!='' AND CMS_RC_ICC.CREATED_BY='" + UserCode_ICC + "' ";
            }

            var Data = JSON.stringify({
                MasterType: "ComplaintRegistrationList_ICC",
                ID: "561",
                UserCode: $("#UserCode_ICC").val(),
                "Type": "Get",
                ReportName: "ComplaintRegistrationList_ICC",
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
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "RegistrationList_ICC", UserSelectedColumnName);
                    $('#RegistrationList_ICC tbody').on('click', 'tr', function () {
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
                            var scope = angular.element($("#RegistrationListDiv_ICC")).scope();
                            scope.$apply(function () {
                                scope.go("Registration_ICC/" + ID);
                            })
                        } else if (Status == "DRAFT") {
                            var ComplaintNumber = $(this).find('td:eq(7)').text();
                            var scope = angular.element($("#RegistrationListDiv_ICC")).scope();
                            scope.$apply(function () {
                                scope.go("Registration_ICC/" + ComplaintNumber);
                            })
                        }
                    });
                });
            });
        } catch (e) {
            alert("Error :StateChange_ICC : " + e);
        }
    }

    // Open popup for columns selection
    $scope.OpenColumnEditing_ICC = function () {
        $('#undo_redo').empty();
        var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);
        for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
            $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
        }
        //   $('#undo_redo').refresh();
        $('#undo_redo').multiselect();
        if (ControllerName != "RegistrationListCtrl_ICC") {
            ControllerName = "RegistrationListCtrl_ICC";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "RegistrationListCtrl_ICC");
            $compile(elem.contents())(complaintRegistrationScope_ICC);
        }
        $("#ColumnEditingModal").modal('show');
    }
    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing_ICC = function () {
        DIMSFactory.ViewColumnEditing_ICC("ComplaintRegistrationList_ICC", $("#UserCode_ICC").val(), " ORDER BY ID DESC"); // 1-Report Name ,2-UserCode_ICC(561),3-WhereClause

    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData_ICC = function () {
        var StateFilter_ICC = $("#StateFilter_ICC").val();
        var WhereClause = " WHERE CMS_RC_ICC.STATE_CODE='" + StateFilter_ICC + "'  ORDER BY CMS_RC_ICC.ID DESC ";
        var Data = JSON.stringify({
            MasterType: "ComplaintRegistrationList_ICC",
            ID: "561",
            UserCode: $("#UserCode_ICC").val(),
            "Type": "Get",
            ReportName: "ComplaintRegistrationList_ICC",
            WhereClause: WhereClause
        });
        //DIMSFactory.SaveColumnEditingData_ICC("Compensation", $scope.UserCode_ICC, " ORDER BY ID DESC");
        DIMSFactory.SaveColumnEditingData_InputParameter("ComplaintRegistrationList_ICC", $("#UserCode_ICC").val(), WhereClause, Data, "RegistrationList_ICC");
        // 1-Report Name ,2-UserCode_ICC(561),3-WhereClause,4-JsonData,5-Frontend datatable id
    }
});

//Registration_ICC Controller
DIMS.controller('RegistrationCtrl_ICC', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    RegistrationScope_ICC = $scope;
    var SendForReviewDoubleClick = "";
    $scope.templatesettings = { HeaderTitle: "Registration_ICC" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    angular.element(document).ready(function () {
        CheckUserSession();
        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationICC/FillCMSStateFilter',
            async: true,
            success: function (response) {
                $("#StateFilter_ICC").empty();
                if (response == "") {

                } else {
                    response = JSON.parse(response);
                    for (var i = 0; i < response.length; i++) {
                        var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                        $("#StateFilter_ICC").append(option);
                    }

                    var CMSState_ICC = $("#CMSState_ICC").val();
                    if (CMSState_ICC == "ALL")
                        CMSState_ICC = response[0]["STATE_CODE"];
                    if (CMSState_ICC == "" || typeof CMSState_ICC == "undefined") {
                        $("#StateFilter_ICC").val(response[0]["STATE_CODE"]);
                        $("#CMSState_ICC").val(response[0]["STATE_CODE"]);
                    } else {
                        $("#StateFilter_ICC").val(CMSState_ICC);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });

        if ($routeParams.ID == undefined || $routeParams.ID == "") {
            $("#FormIdentity_ICC").val("").trigger('change');
        } else {
            $("#FormIdentity_ICC").val($routeParams.ID).trigger('change');
        }

        try {
            var FormIdentity_ICC = $("#FormIdentity_ICC").val();

            if (FormIdentity_ICC == "" || FormIdentity_ICC == undefined) {
                $scope.DOC_SERIES_CODE = "CRSZ12";
                $scope.COMPLAINT_STATUS = "DRAFT";
                $("#COMPLAINT_STATUS").val($scope.COMPLAINT_STATUS).trigger('change');
                $scope.COMPLAINT_RECEIVED_DATE = TodayDateTime;
                $("#COMPLAINT_RECEIVED_DATE").datepicker("setDate", TodayDateTime);
                $scope.COMPLAINT_REGISTRATION_DATE = TodayDateTime;
                $("#COMPLAINT_REGISTRATION_DATE").datepicker("setDate", TodayDateTime);
                //$(".Complaint_NumberDiv").css("display", "none");
                $scope.REGISTRANT_TYPE_NAME = $("#UserType_ICC").val();
                $scope.Registrant_Type_ID = $("#UserType_ID_ICC").val();
                $scope.REGISTRANT_TYPE_CODE = $("#UserType_ID_ICC").val();
                $("#MakeApproved_ICC").css('display', 'none');
                $("#SendRegistrationApproval_ICC").css('display', 'none');
                $("#NewReg_ICC").css('display', 'none');
                $("#Project_Party_Check").val("ASD");

                var UserType_ID_ICC = $("#UserType_ID_ICC").val();
                //if (UserType_ID_ICC == "SH_BU3" || UserType_ID_ICC == "PLANT_MHD" || UserType_ID_ICC == "Plant_MHD") {
                    $scope.PRODUCT_TYPE_NAME = "SBU3";
                    $scope.PRODUCT_TYPE_CODE = "SBU3";                    
                    //ProductTypeChanges("SBU3");
                //} else { }                
            } else {
                ShowLoader();
                $("Project_Party_Check").val("");

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationICC/GetComplaint',
                    async: false,
                    data: { Identity: FormIdentity_ICC },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") { } else {
                        var Data = JSON.parse(response.data);
                        var HeaderData = Data["Header"];
                        $("#MakeApproved_ICC").css('display', 'none');
                        if (HeaderData[0]["DOC_STATUS"] == "Approved") {

                        } else {

                        }
                        $scope.COMPLAINT_CODE = HeaderData[0]["COMPLAINT_CODE"];
                        //$scope.StateFilter_ICC = HeaderData[0]["StateFilter_ICC"];
                        //$scope.FROM_PLANT_NAME = HeaderData[0]["FROM_PLANT_NAME"];
                        $("#Complaint_Number").val(FormIdentity_ICC);
                        $("#COMPLAINT_RECEIVED_DATE").datepicker("startDate", HeaderData[0]["Days100Back"]);
                        $scope.COMPLAINT_RECEIVED_DATE = HeaderData[0]["COMPLAINT_RECEIVED_DATE"];
                        $("#COMPLAINT_RECEIVED_DATE").datepicker("setDate", HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $scope.COMPLAINT_REGISTRATION_DATE = HeaderData[0]["COMPLAINT_REGISTRATION_DATE"];
                        $("#COMPLAINT_REGISTRATION_DATE").datepicker("setDate", HeaderData[0]["COMPLAINT_REGISTRATION_DATE"]);
                        $scope.COMPLAINT_TRACKING_NO = HeaderData[0]["COMPLAINT_TRACKING_NO"];
                        $scope.REGISTRANT_TYPE_CODE = HeaderData[0]["REGISTRANT_TYPE_CODE"];
                        $scope.REGISTRANT_TYPE_NAME = HeaderData[0]["REGISTRANT_TYPE_NAME"]; 
                        if (HeaderData[0]["REGISTRANT_TYPE_NAME"] == "") {
                            $scope.REGISTRANT_TYPE_NAME = $("#UserType_ICC").val();
                            $scope.Registrant_Type_ID = $("#UserType_ID_ICC").val();
                            $scope.REGISTRANT_TYPE_CODE = $("#UserType_ID_ICC").val();
                        }

                        $scope.DOC_SERIES_CODE = HeaderData[0]["DOC_SERIES_CODE"];

                        if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                            $scope.DOC_SERIES_CODE = "CRSZ12";
                        }

                        $scope.PRODUCT_TYPE_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"]; 
                        //ProductTypeChanges(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                        $scope.PRODUCT_TYPE_NAME = HeaderData[0]["PRODUCT_TYPE_CODE"];
                        $scope.SALES_REPRESENTATIVE_CODE = HeaderData[0]["SALES_REPRESENTATIVE_CODE"];
                        $scope.SALES_REPRESENTATIVE_NAME = HeaderData[0]["SALES_REPRESENTATIVE_NAME"];
                        $scope.COMPLAINT_DESC = HeaderData[0]["COMPLAINT_DESC"];
                        $scope.REMARKS = HeaderData[0]["REMARKS"];
                        $("#SelectedFiles").append(HeaderData[0]["ATTACHMENTS"]).trigger('change');

                        $scope.NATURE_OF_COMPLAINT = HeaderData[0]["NATURE_OF_COMPLAINT"]; 
                        //COMPLAINT_STATUS
                        if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Waiting for approval" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                            $scope.COMPLAINT_STATUS = HeaderData[0]["FinalStatus"];
                        } else {
                            $scope.COMPLAINT_STATUS = HeaderData[0]["DOC_STATUS"];
                            $("#COMPLAINT_STATUS").val($scope.COMPLAINT_STATUS).trigger('change');
                        }
                        $scope.CUSTOMER_CODE = HeaderData[0]["CUSTOMER_CODE"];
                        $scope.CUSTOMER_NAME = HeaderData[0]["CUSTOMER_NAME"];
                        var MyField = $("#HiddenForCMS").val();
                        //alert(MyField);
                        if (HeaderData[0]["DOC_STATUS"] == "DRAFT") {
                            $("#MakeApproved_ICC").css('display', 'none');
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID_ICC").val(), FormCode: 'REG_ICC' }) },
                                success: function (AccessData) {
                                    if (AccessData == "") {
                                        $("#SendRegistrationApproval_ICC").css('display', 'none');
                                        $("#CompRegSave_ICC").css('display', 'none');
                                    } else {
                                        AccessData = JSON.parse(AccessData);
                                        if (AccessData[0]["IS_UPDATE"] == true) {
                                            $("#SendRegistrationApproval_ICC").css('display', 'block');
                                            $("#CompRegSave_ICC").css('display', 'block');
                                        } else {
                                            $("#SendRegistrationApproval_ICC").css('display', 'none');
                                            $("#CompRegSave_ICC").css('display', 'none');

                                        }
                                    }
                                }
                            });
                        } else if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                            //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);
                            $("#MakeApproved_ICC").css('display', 'none');
                            var UserType_ICC = $("#UserType_ID_ICC").val();

                            if ((HeaderData[0]["DOC_STATUS"] == "Approved") && (UserType_ICC == "CSM" || UserType_ICC == "QH" || UserType_ICC == "CSM_BU2" || UserType_ICC == "CSM_BU3")) {
                                $("#SuperSave_ICC").css('display', 'block');
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

                            $("#CompRegSave_ICC").css('display', 'none');
                            $("#SendRegistrationApproval_ICC").css('display', 'none');
                            $("#APPROVED_DATE").val(HeaderData[0]["APPROVED_DATE"]);
                        } else if (HeaderData[0]["DOC_STATUS"] == "Waiting for approval") {
                            if (MyField == "") {
                                //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);
                                $("#MakeApproved_ICC").css('display', 'none');
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
                                $("#CompRegSave_ICC").css('display', 'none');
                                $("#SendRegistrationApproval_ICC").css('display', 'none');
                                $("#SupplyDetails_Add").css('display', 'none');
                                $("#Receipt_Details_Sheeting_Add").css('display', 'none');
                                $("#Mat_Sup_Det_Add").css('display', 'none');
                            } else {
                                //Write Code For Approvals
                                $.ajax({
                                    url: '../../Users/GetRightToAccess',
                                    type: 'GET',
                                    data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID_ICC").val(), FormCode: 'REG_ICC' }) },
                                    success: function (AccessData) {
                                        if (AccessData == "") {
                                            $("#SendRegistrationApproval_ICC").css('display', 'none');
                                            $("#RegList_ICC").css('display', 'none');
                                            $("#NewReg_ICC").css('display', 'none');
                                            $("#MakeApproved_ICC").css('display', 'none');
                                            $("#PendingApprovalsList_ICC").css('display', 'block');
                                            $("#CompRegSave_ICC").css('display', 'none');
                                        } else {
                                            AccessData = JSON.parse(AccessData);
                                            if (AccessData[0]["IS_APPROVE"] == true) {
                                                $("#SendRegistrationApproval_ICC").css('display', 'none');
                                                $("#RegList_ICC").css('display', 'none');
                                                $("#NewReg_ICC").css('display', 'none');
                                                $("#MakeApproved_ICC").css('display', 'block');
                                                $("#PendingApprovalsList_ICC").css('display', 'block');
                                                $("#CompRegSave_ICC").css('display', 'block');
                                            } else {
                                                $("#SendRegistrationApproval_ICC").css('display', 'none');
                                                $("#RegList_ICC").css('display', 'none');
                                                $("#NewReg_ICC").css('display', 'none');
                                                $("#MakeApproved_ICC").css('display', 'none');
                                                $("#PendingApprovalsList_ICC").css('display', 'block');
                                                $("#CompRegSave_ICC").css('display', 'none');
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        //$("#StateFilter_ICC").val(HeaderData[0]["StateFilter_ICC"]);
                        $("#StateFilter_ICC > [value=" + HeaderData[0]["StateFilter_ICC"] + "]").attr("selected", "true"); 
                        //if (HeaderData[0]["StateFilter_ICC"] > 0) {
                        //    $("#StateFilter_ICC > [value=" + HeaderData[0]["StateFilter_ICC"] + "]").attr("selected", "true");
                        //} else {
                        //    $("#StateFilter_ICC > [value=0]").attr("selected", "true");
                        //}
                        $("#CMSState_ICC").val(HeaderData[0]["StateFilter_ICC"]);
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
                    case ("ProductTypeCode_ICC"):
                        return
                    case ("PlantMaster_ICC"):
                        return;
                    case ("ProductDivisionMaster"):
                        return;
                    case ("StockistMaster_ICC"):
                        return;
                }
            }
        }
        if (MasterType == "StockistMaster_ICC") {

            var StateFilter_ICC = $("#StateFilter_ICC").val();

            var PRODUCT_TYPE_CODE = $("#PRODUCT_TYPE_CODE").val();

            if (PRODUCT_TYPE_CODE == "") {
                alert("Select Business Unit");
                return;
            }
            else if (PRODUCT_TYPE_CODE == "SBU1") {
                Product_Type = "1000";
            }
            else if (PRODUCT_TYPE_CODE == "SBU2") {
                Product_Type = "2000";
            }
            else if (PRODUCT_TYPE_CODE == "SBU3") {
                Product_Type = "3000";
            }


            Data = JSON.stringify({
                MasterType: MasterType,
                Product_Type: Product_Type,
                StateFilter: StateFilter_ICC
            });

        } else if (MasterType == "PlantMaster_ICC") {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
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
                StateFilter_ICC: StateFilter_ICC
            });
        } else if (MasterType == "DefectTypeMaster_ICC") {
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
            var SITEDETAIL_CODE_ICC = $("#SITEDETAIL_CODE_ICC").val();
            var COMPANYDETAIL_CODE_ICC = $("#COMPANYDETAIL_CODE_ICC").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                SITEDETAIL_CODE_ICC: SITEDETAIL_CODE_ICC,
                COMPANYDETAIL_CODE_ICC: COMPANYDETAIL_CODE_ICC
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
                    CR_TYPE: "INFORMAL"
                });
            }
        } else if (MasterType == "PlantMHDMaster_ICC") {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
            var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();

            if (PRODUCT_TYPE_NAME == "") {
                alert("Select Business Unit");
                return;
            }

            Data = JSON.stringify({
                MasterType: MasterType,
                StateFilter_ICC: StateFilter_ICC,
                BusinessUnit: PRODUCT_TYPE_NAME
            });
        } else if (MasterType == "GetPlantMaster") {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
            var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit,
                StateFilter_ICC: StateFilter_ICC
            });
        } else if (MasterType == "SUPPLIER_TYPE_CODE_ICC") {
            var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit
            });
        } else if (MasterType == "GetProductMaster_ICC") {
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
            var SITEDETAIL_CODE_ICC = $("#SITEDETAIL_CODE_ICC").val();
            var COMPANYDETAIL_CODE_ICC = $("#COMPANYDETAIL_CODE_ICC").val();

            if (SUPPLIER_TYPE_NAME == "") {
                alert("Select Product Supplied Form");
                return;
            }
            if (SUPPLIER_TYPE_NAME == "Sub Stockist") {
                return;
            }
            if (SUPPLIER_TYPE_NAME == "STOCKIST") {
                Heading = "Stockist List";
                var StateFilter_ICC = $("#StateFilter_ICC").val();
                var SALES_REPRESENTATIVE_CODE = $("#SALES_REPRESENTATIVE_CODE").val();
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
                    StateFilter_ICC: StateFilter_ICC
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
        } else if (MasterType == "SalesRepMaster_ICC") {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
            var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();

            if (PRODUCT_TYPE_NAME == "") {
                alert("Select Business Unit");
                return;
            }

            Data = JSON.stringify({
                MasterType: "SalesRepMaster",
                StateFilter_ICC: StateFilter_ICC,
                BusinessUnit: PRODUCT_TYPE_NAME
            });
        }

        DIMSFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);            
        });
    }

    $scope.RegisterComplaint_ICC = function () {
        console.log('scope', $scope);
        try {
            var FormIdentity_ICC = $("#FormIdentity_ICC").val();
            var COMPLAINT_STATUS = $("#COMPLAINT_STATUS").val();

            if ($scope.FormIdentity_ICC == "" || $scope.FormIdentity_ICC == undefined) {
                $scope.FormIdentity_ICC = "";
            }            

            var Flag = 0;
            var RowId = "";

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

            if ($("#SALES_REPRESENTATIVE_CODE").val() == "" || typeof $("#SALES_REPRESENTATIVE_CODE").val() == "undefined") {
                Flag = Flag + 1;
                $("#SALES_REPRESENTATIVE_CODE").css("border-color", "red");
            } else {
                $("#SALES_REPRESENTATIVE_CODE").css("border-color", "#d2d6de");
            }

            if ($("#SALES_REPRESENTATIVE_NAME").val() == "" || typeof $("#SALES_REPRESENTATIVE_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#SALES_REPRESENTATIVE_NAME").css("border-color", "red");
            } else {
                $("#SALES_REPRESENTATIVE_NAME").css("border-color", "#d2d6de");
            }
            
            if (Flag > 0) {
                return;
            } else {
                //if ($scope.StateFilter_ICC == undefined) { $scope.StateFilter_ICC = ""; }
                if ($scope.COMPLAINT_RECEIVED_DATE == undefined) { $scope.COMPLAINT_RECEIVED_DATE = ""; }
                if ($scope.COMPLAINT_REGISTRATION_DATE == undefined) { $scope.COMPLAINT_REGISTRATION_DATE = ""; }
                if ($scope.COMPLAINT_TRACKING_NO == undefined) { $scope.COMPLAINT_TRACKING_NO = ""; }
                if ($scope.REGISTRANT_TYPE_NAME == undefined) { $scope.REGISTRANT_TYPE_NAME = ""; }
                if ($scope.REGISTRANT_TYPE_CODE == undefined) { $scope.REGISTRANT_TYPE_CODE = ""; }
                if ($scope.DOC_SERIES_CODE == undefined) { $scope.DOC_SERIES_CODE = ""; }
                if ($scope.PRODUCT_TYPE_CODE == undefined) { $scope.PRODUCT_TYPE_CODE = ""; }
                if ($scope.COMPLAINT_STATUS == undefined) { $scope.COMPLAINT_STATUS = ""; }
                if ($scope.SALES_REPRESENTATIVE_CODE == undefined) { $scope.SALES_REPRESENTATIVE_CODE = ""; }
                if ($scope.SALES_REPRESENTATIVE_NAME == undefined) { $scope.SALES_REPRESENTATIVE_NAME = ""; }
                if ($scope.COMPLAINT_CODE == undefined) { $scope.COMPLAINT_CODE = ""; }
                if ($scope.APPROVED_DATE == undefined) { $scope.APPROVED_DATE = ""; }
                if ($scope.COMPLAINT_DESC == undefined) { $scope.COMPLAINT_DESC = ""; }
                if ($scope.REMARKS == undefined) { $scope.REMARKS = ""; }
                if ($scope.FilesPath == undefined) { $scope.FilesPath = ""; }
                if ($scope.CUSTOMER_CODE == undefined) { $scope.CUSTOMER_CODE = ""; }
                if ($scope.NATURE_OF_COMPLAINT == undefined) { $scope.NATURE_OF_COMPLAINT = ""; }
                                
                $scope.COMPLAINT_RECEIVED_DATE = DateToWestern($scope.COMPLAINT_RECEIVED_DATE);
                $scope.COMPLAINT_REGISTRATION_DATE = DateToWestern($scope.COMPLAINT_REGISTRATION_DATE);
                $scope.APPROVED_DATE = DateToWestern($scope.APPROVED_DATE);                

                if (Flag > 0) {
                    return;
                } else {
                    var RegistrationData = JSON.stringify({
                        FormIdentity_ICC: $("#FormIdentity_ICC").val(),

                        STATE_CODE: $("#StateFilter_ICC").val(),
                        COMPLAINT_RECEIVED_DATE: $("#COMPLAINT_RECEIVED_DATE").val(),
                        COMPLAINT_REGISTRATION_DATE: $("#COMPLAINT_REGISTRATION_DATE").val(),
                        COMPLAINT_TRACKING_NO: $("#COMPLAINT_TRACKING_NO").val(),
                        REGISTRANT_TYPE_NAME: $("#REGISTRANT_TYPE_NAME").val(),
                        REGISTRANT_TYPE_CODE: $("#REGISTRANT_TYPE_CODE").val(),
                        DOC_SERIES_CODE: $("#DOC_SERIES_CODE").val(),
                        PRODUCT_TYPE_CODE: $("#PRODUCT_TYPE_CODE").val(),
                        PRODUCT_TYPE_NAME: $("#PRODUCT_TYPE_NAME").val(),
                        COMPLAINT_STATUS: $("#COMPLAINT_STATUS").val(),
                        SALES_REPRESENTATIVE_CODE: $("#SALES_REPRESENTATIVE_CODE").val(),
                        SALES_REPRESENTATIVE_NAME: $("#SALES_REPRESENTATIVE_NAME").val(),
                        COMPLAINT_CODE: $("#COMPLAINT_CODE").val(),
                        APPROVED_DATE: $("#APPROVED_DATE").val(),
                        COMPLAINT_DESC: $("#COMPLAINT_DESC").val(),
                        REMARKS: $("#REMARKS").val(),
                        FilesPath: $("#SelectedFiles").text(),
                        
                        SITEDETAIL_CODE_ICC: $("#SITEDETAIL_CODE_ICC").val(),
                        COMPANYDETAIL_CODE_ICC: $("#COMPANYDETAIL_CODE_ICC").val(),
                        CREATED_BY: $("#UserCode_ICC").val(),
                        CUSTOMER_CODE: $("#CUSTOMER_CODE").val(),
                        NATURE_OF_COMPLAINT: $("#NATURE_OF_COMPLAINT").val()
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
                        url: '../../ComplaintRegistrationICC/SaveComplaint',
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
                                $("#FormIdentity_ICC").val(RD["ID"]);
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
                            $("#SendRegistrationApproval_ICC").css('display', 'block');
                        } else {
                            $("#SendRegistrationApproval_ICC").css('display', 'none');
                        }
                        $("#MyTest").val("");
                        //go('RegistrationList_ICC');
                    }, function errorCallback(response) {
                        alert("Error : " + response);
                    });
                }                
            }
        } catch (e) {
            alert("Error :RegisterComplaint_ICC : " + e);
        }
    }

    $scope.SendRegistrationForApproval_ICC = function () {
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
            $scope.RegisterComplaint_ICC();

            var FormIdentity_ICC = $("#FormIdentity_ICC").val();
            var Doc_Status = $("#COMPLAINT_STATUS").val();
            if (Doc_Status == "DRAFT") { } else {
                alert("Document Status is " + Doc_Status + "");
                $("#MyTest").val("");
                return;
                SendForReviewDoubleClick = "";
                HideLoader();
            }

            if ($scope.FormIdentity_ICC == "" || $scope.FormIdentity_ICC == undefined) {
                $scope.FormIdentity_ICC = "";
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
            
            if ($("#PRODUCT_TYPE_NAME").val() == "" || $("#PRODUCT_TYPE_NAME").val() == undefined) {
                Flag = Flag + 1;
                $("#PRODUCT_TYPE_NAME").css("border-color", "red");
            } else {
                $("#PRODUCT_TYPE_NAME").css("border-color", "#d2d6de");
            }
            
            if ($("#SALES_REPRESENTATIVE_CODE").val() == "" || $("#SALES_REPRESENTATIVE_CODE").val() == undefined) {
                Flag = Flag + 1;
                $("#SALES_REPRESENTATIVE_CODE").css("border-color", "red");
            } else {
                $("#SALES_REPRESENTATIVE_CODE").css("border-color", "#d2d6de");
            }

            if ($("#SALES_REPRESENTATIVE_NAME").val() == "" || $("#SALES_REPRESENTATIVE_NAME").val() == undefined) {
                Flag = Flag + 1;
                $("#SALES_REPRESENTATIVE_NAME").css("border-color", "red");
            } else {
                $("#SALES_REPRESENTATIVE_NAME").css("border-color", "#d2d6de");
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
            }

            var FormIdentity_ICC = $("#FormIdentity_ICC").val();

            if (Flag > 0) {
                alert("Fill All Mandatory fields before sending for Approval");
                $("#MyTest").val("");
                SendForReviewDoubleClick = "";
                HideLoader();
                return;
            } else if (FormIdentity_ICC == "") {
                alert("Save the form before Sending for Approval");
                SendForReviewDoubleClick = "";
                HideLoader();
            } else {
                var ApprovalData = JSON.stringify({
                    FormIdentity_ICC: FormIdentity_ICC,
                    CREATED_BY: $("#UserCode_ICC").val(),
                    FORM_NAME: "Registration_ICC"
                });

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationICC/SendForApproval',
                    async: false,
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {
                    SendForReviewDoubleClick = "";
                    HideLoader();

                    if (response.data == "FALSE") {
                        alert("Error Occured try later");
                    } else if (response.data == "TRUE") {
                        $("#COMPLAINT_STATUS").val("Waiting for Approval");
                        $("#COMPLAINT_TRACKING_NO").val(FormIdentity_ICC);
                        alert("Complaint has been successfully sent for review, Your Complaint Tracking # " + FormIdentity_ICC + " .");
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
                        $("#CompRegSave_ICC").css('display', 'none');
                        $("#SendRegistrationApproval_ICC").css('display', 'none');
                        $("#SupplyDetails_Add").css('display', 'none');
                        $("#Receipt_Details_Sheeting_Add").css('display', 'none');
                        $("#Mat_Sup_Det_Add").css('display', 'none');
                        $scope.COMPLAINT_STATUS = "Waiting for Approval";
                        var UserTypeCode = $("#UserType_ID_ICC").val();
                        var ProdType = $("#PRODUCT_TYPE_NAME").val();
                        //alert("UserTypeCode : " + UserTypeCode + "\tProdType" + ProdType);

                        //if (UserTypeCode == "CSO" && ProdType == "SBU1") {
                        //    $scope.MakeApproved_ICC('Approved');
                        //} else if (UserTypeCode == "CQT" && ProdType == "SBU2") {
                        //    $scope.MakeApproved_ICC('Approved');
                        //} else {
                        //    HideLoader();
                        //    $scope.go('RegistrationList_ICC');
                        //}
                        if (ProdType == "SBU1") {
                            $scope.MakeApproved_ICC('Approved');
                        }
                        //svprasadk 16-06-2020 SBU 1 requirement Merging of approval & assign end
                        else if (UserTypeCode == "CQT" && ProdType == "SBU2") {
                            $scope.MakeApproved_ICC('Approved');
                        }
                        else {
                            HideLoader();
                            $scope.go('RegistrationList_ICC');
                        }
                        //$scope.MakeApproved_ICC('Approved');
                    }
                }, function errorCallback(response) {
                    alert("Error : " + response);
                    SendForReviewDoubleClick = "";
                    HideLoader();
                });
            }
        } catch (e) {
            alert("Error :SendRegistrationForApproval_ICC : " + e);
        }
    }

    $scope.GetApprovalPopUp_ICC = function () {
        try {
            $("#APPROVALS_REMARKS").val("");
            $("#ApprovalsActionForm").modal('show');
        } catch (e) {
            alert("Error : " + e);
        }
    }

    $scope.MakeApproved_ICC = function (DECISION) {
        try {
            var UserTypeCode = $("#UserType_ID_ICC").val();
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
            $scope.RegisterComplaint_ICC();

            var ApprovalData = JSON.stringify({
                COMPLAINT_TRACKING_NO: $("#Complaint_Number").val(),
                MODIFIED_BY: $("#UserCode_ICC").val(),
                FORM_NAME: "Registration_ICC",
                DECISION: DECISION,
                APPROVALS_REMARKS: APPROVALS_REMARKS,
                SALES_REPRESENTATIVE_CODE: $("#SALES_REPRESENTATIVE_CODE").val(),
                SALES_REPRESENTATIVE_NAME: $("#SALES_REPRESENTATIVE_NAME").val()
            });

            $http({
                method: 'POST',
                url: '../../ComplaintRegistrationICC/MakeApproval',
                async: false,
                data: { ApprovalData: ApprovalData },
            }).then(function successCallback(response) {
                if (response.data == "FALSE") {
                    alert("Error Occured try later");
                } else if (response.data == "TRUE") {
                    $("#COMPLAINT_STATUS").val(DECISION);
                    alert("Successfully " + DECISION);
                    $("#CompRegSave_ICC").css('display', 'none');
                    $("#SendRegistrationApproval_ICC").css('display', 'none');
                    $("#MakeApproved_ICC").css('display', 'none');
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
                    if ((UserTypeCode == "CSO" && BusinessUnit == "SBU1") || (UserTypeCode == "CQT" && BusinessUnit == "SBU2")) {
                    //if (BusinessUnit == "SBU3") {
                        alert("This Complaint will be Automatically Assigned to Plant mhd");
                        try {
                            var AssignData = JSON.stringify({
                                TrackingNo: $("#Complaint_Number").val(),
                                RoleCode: $("#UserType_ICC").val(),
                                RoleName: $("#UserType_ID_ICC").val(),
                                UserCode: $("#UserCode_ICC").val(),
                                UserName_ICC: $("#UserName_ICC").val(),
                                SALES_REPRESENTATIVE_CODE: $("#SALES_REPRESENTATIVE_CODE").val(),
                                SALES_REPRESENTATIVE_NAME: $("#SALES_REPRESENTATIVE_NAME").val()
                            });

                            $.ajax({
                                type: 'POST',
                                url: '../../ComplaintRegistrationICC/AutoAssignComplaint',
                                async: false,
                                data: { AssignData: AssignData },
                                success: function (Resp) {
                                    if (Resp != "") {
                                        $("#COMPLAINT_STATUS").val("Complaint Assigned");
                                        alert("Complaint Successfully Assigned to plant mhd");
                                    }
                                    $scope.go('RegistrationList_ICC');
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
                        $scope.go('ComplaintPendingApproval_ICC');
                    }
                }
                //go('ComplaintPendingApproval_ICC');
            }, function errorCallback(response) {
                alert("Error : " + response);
            });
        } catch (e) {
            alert("Error :MakeApprovedReg : " + e);
        }
    }

    $scope.StateChange_ICC = function () {
        try {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
            $("#CMSState_ICC").val(StateFilter_ICC);
        } catch (e) {
            alert("Error :StateChange_ICC : " + e);
        }
    }
});
//Sales Master PopUp
function GetSalesRep_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        RegistrationScope_ICC.SALES_REPRESENTATIVE_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.SALES_REPRESENTATIVE_NAME = $(obj).children().eq(2).html();
        $("#SALES_REPRESENTATIVE_CODE").val($(obj).children().eq(1).html());
        $("#SALES_REPRESENTATIVE_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//CR Series code pop up
function GetCRSeriesCode_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        RegistrationScope_ICC.DOC_SERIES_CODE = $(obj).children().eq(1).html();
        $("#DOC_SERIES_CODE").val($(obj).children().eq(1).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Customer pop up
function GetPlant_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        RegistrationScope_ICC.TO_PLANT_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.TO_PLANT_NAME = ($(obj).children().eq(2).html()).replace("&amp;", "&");
        $("#TO_PLANT_CODE").val($(obj).children().eq(1).html());
        $("#TO_PLANT_NAME").val(($(obj).children().eq(2).html()).replace("&amp;", "&"));
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//Complaint Mode Pop up
function GetComplaint_Mode_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        //RegistrationScope_ICC.Complaint_Mode_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.COMPLAINT_MODE_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.COMPLAINT_MODE_NAME = $(obj).children().eq(2).html();
        $("#COMPLAINT_MODE_CODE").val($(obj).children().eq(1).html());
        $("#COMPLAINT_MODE_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product Type master pop up
//function GetProductTypeCode_ICC(obj) {
//    RegistrationScope_ICC.$apply(function () {
//        $("#SALES_REPRESENTATIVE_CODE").val("");
//        $("#SALES_REPRESENTATIVE_NAME").val("");

//        if ($("#UserCode_ICC").val() == "KAM") {
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

//        var UserType_ID_ICC = $("#UserType_ID_ICC").val();

//        if (UserType_ID_ICC == "FSO" || UserType_ID_ICC == "FSO_BU2" || UserType_ID_ICC == "FSO_BU3") {
//            var UserCode_ICC = $("#UserCode_ICC").val();
//            if (UserCode_ICC == "KAM") {
//                $("#SALES_REPRESENTATIVE_CODE").val("");
//                $("#SALES_REPRESENTATIVE_NAME").val("");
//            } else {
//                $("#SALES_REPRESENTATIVE_CODE").val("");
//                $("#SALES_REPRESENTATIVE_NAME").val("");
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
function GetProductDivisionMaster_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        RegistrationScope_ICC.PRODUCT_CATEGORY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.PRODUCT_CATEGORY_NAME = $(obj).children().eq(2).html();
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
            //ProductTypeChanges("SBU2");
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product category master pop up
function GetProd_Cat_Mast(obj) {
    RegistrationScope_ICC.$apply(function () {
        //RegistrationScope_ICC.Product_Category_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.PRODUCT_CATEGORY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.PRODUCT_CATEGORY_NAME = $(obj).children().eq(2).html();
        $("#PRODUCT_CATEGORY_CODE").val($(obj).children().eq(1).html());
        $("#PRODUCT_CATEGORY_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Plant Master pop up
function GetPlantMaster_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        $("#Material_Belongs_To_ID").val($(obj).children().eq(0).html());
        $("#PLANT_CODE").val($(obj).children().eq(1).html());
        $("#PLANT_NAME").val(($(obj).children().eq(2).html()).replace('&amp;', '&'));
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Name pop up
function GetMSD_Name_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        RegistrationScope_ICC.MSD_Name_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.SUPPLIER_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.SUPPLIER_NAME = ($(obj).children().eq(2).html()).replace("&amp;", "&");
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint Type Master pop up
function GetComplaintType_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        //RegistrationScope_ICC.Complaint_Type_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.COMPLAINT_TYPE_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.COMPLAINT_TYPE_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint category Master Pop up
function GetComplaintCategory_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        //RegistrationScope_ICC.Complaint_Category_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.COMPLAINT_CATEGORY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.COMPLAINT_CATEGORY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complanint Priority Master Pop up
function GetComplaintPriority_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        //RegistrationScope_ICC.Complaint_Priority_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.COMPLAINT_PRIORITY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.COMPLAINT_PRIORITY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint Severity master pop up
function GetComplaintSeverity_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        //RegistrationScope_ICC.Complaint_Severity_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.COMPLAINT_SEVERITY_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.COMPLAINT_SEVERITY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product master pop up
function GetProductMaster_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        $("#Item_Type_Product_ID").val($(obj).children().eq(0).html());
        $("#Item_Type_Product_CODE").val($(obj).children().eq(1).html());
        $("#Item_Type_Product_Name").val($(obj).children().eq(2).html());
        $("#GrossWeight").val($(obj).children().eq(6).html());
        $("#Size_M").val($(obj).children().eq(3).html());
        //RegistrationScope_ICC.Item_Type_Product_ID = $(obj).children().eq(0).html();
        //RegistrationScope_ICC.Item_Type_Product_CODE = $(obj).children().eq(1).html();
        //RegistrationScope_ICC.Item_Type_Product_Name = $(obj).children().eq(2).html();
        //RegistrationScope_ICC.GrossWeight = $(obj).children().eq(6).html();
        //RegistrationScope_ICC.Size_M = $(obj).children().eq(3).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product master pop up
function GetSD_ProductMaster_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
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
            //RegistrationScope_ICC.SD_ProductDetails = $(obj).children().eq(2).html();
            //RegistrationScope_ICC.SD_ProductDetails_ID = $(obj).children().eq(0).html();
            //RegistrationScope_ICC.PRODUCT_CODE = $(obj).children().eq(1).html();
            //RegistrationScope_ICC.SIZE = $(obj).children().eq(3).html();
        } catch (e) {
            alert(e);
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
//function GetDefectTypeMaster(obj) {
//    RegistrationScope_ICC.$apply(function () {
//        $("#Defect_Type_ID").val($(obj).children().eq(0).html());
//        $("#Defect_Type_CODE").val($(obj).children().eq(1).html());
//        $("#Defect_Type").val($(obj).children().eq(2).html());
//    })
//    var element = angular.element('#LookUpModal');
//    element.modal('hide');
//}
//Defect type master pop up
function GetSD_DefectTypeMaster_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
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
function GetProductSuppliedFrom_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
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
            RoleCode: $("#UserType_ICC").val(),
            RoleName: $("#UserType_ID_ICC").val(),
            UserCode: $("#UserCode_ICC").val(),
            UserName_ICC: $("#UserName_ICC").val()
        });

        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationICC/GetMeTheComplaintInInvestigation',
            async: false,
            data: { AssignData: AssignData },
            success: function (Resp) {
                if (Resp != "") {
                    $("#COMPLAINT_STATUS").val("Complaint Assigned");
                    alert("Complaint Successfully Assigned to You");
                }
                $scope.go('RegistrationList_ICC');
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
function GetCustomer_ICC(obj) {
    RegistrationScope_ICC.$apply(function () {
        RegistrationScope_ICC.CUSTOMER_ID = $(obj).children().eq(0).html();
        RegistrationScope_ICC.CUSTOMER_CODE = $(obj).children().eq(1).html();
        RegistrationScope_ICC.CUSTOMER_NAME = ($(obj).children().eq(2).html()).replace("&amp;", "&");        
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');    
}