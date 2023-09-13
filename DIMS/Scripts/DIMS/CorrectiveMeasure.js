// DEVELOPED BY :SHIVA KIRAN
// ORGANISATION :ENVISION
// CREATED DATE :15-12-2015
// MODIFIED DATE:17-02-2016

// Corrective measures Add page Controller
var IsApprove_CORM;
var IsView_CORM;
var IsAdd_CORM;
var IsUpdate_CORM;

DIMS.controller('CorrectiveMeasureCtrl', function ($scope, $location, $http, $compile, DIMSFactory, $routeParams) {

    CorrectivemeasureScope = $scope;
    $scope.CMDocStatus_Model = "DRAFT";
    $scope.CMSeriesFinancialPeriod_Model = "";
    $scope.txtCMPreventiveVerificationLinesPreventiveActionCode_Model = "";
    $scope.txtCMIPreventiveLinesActionCode_Model = "";
    $scope.txtCMVerificationLinesImplimentedActionCode_Model = "";
    $scope.txtCMImplementLinesActionCode_Model = "";
    $scope.CMChosenLinesActionCode_Model = "";
    $scope.CMRootCauseLinesProblemTypeID_Model = "";
    $scope.CMRootCauseLinesCode_Model = "";

    $scope.CMIntermLinesActionCode_Model = "";
    $scope.CMEmergencyActionCode_Model = "";
    $scope.DefectCode_Model = "";
    $scope.ProductCode_Model = "";
    $scope.ProductTypeCode_Model = "";
    $scope.ProductCategoryCode_Model = "";

    $scope.PlantCode = "";
    $scope.PlantName = "";
    $scope.ComplaintTypeCode_Model = "";
    $scope.ComplaintCategoryCode_Model = "";

    $scope.ComplaintTypeID_Model = "";
    $scope.ComplaintCategoryID_Model = "";
    $scope.ServerDateTime = "";
    $scope.SiteDetailed_Code = $("#SITEDETAIL_CODE_CorrectiveMeasure").val();
    $scope.CompanyDetailed_Code = $("#COMPANYDETAIL_CODE_CorrectiveMeasure").val();
    $scope.UserName = $("#USERNAME_CorrectiveMeasure").val();
    $scope.UserCode = $("#USERCODE_CorrectiveMeasure").val();
    //$scope.UserCode = "2090";
    $scope.CMSeriesCode_Model = "CMSZ12";
    var date;

    angular.element(document).ready(function () {
        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistration/FillCMSStateFilter',
            async: true,
            success: function (response) {
                $("#StateFilter").empty();
                if (response == "") {

                }
                else {
                    response = JSON.parse(response);
                    for (var i = 0; i < response.length; i++) {
                        var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                        $("#StateFilter").append(option);
                    }
                    var CMSState = $("#CMSState").val();
                    if (CMSState == "ALL")
                        CMSState = "01";
                    if (CMSState == "") {
                        $("#StateFilter").val(response[0]["STATE_CODE"]);
                        $("#CMSState").val(response[0]["STATE_CODE"]);
                    }
                    else {
                        $("#StateFilter").val(CMSState);
                    }
                    var UserType = $("#USERollCODE_CorrectiveMeasureForm").val();

                    if (UserType == "QAM_PL") {

                        $("#InvNumPopUp").css("pointer-events", "none");
                        $("#PlantPopUp").css("pointer-events", "none");
                        $("#ComplaintTypePopUp").css("pointer-events", "none");
                        $("#ComplaintCategoryPopUp").css("pointer-events", "none");

                        $("#ProductPopUp").css("pointer-events", "none");
                        $("#DefectTypePopUp").css("pointer-events", "none");

                        $("#txtNoticeRemAdditional").attr('disabled','disabled');
                        $("#txtBatchNo").attr('disabled','disabled');
                        $("#txtInvoiceNo").attr('disabled','disabled');

                        $("#txtInvoiceDate").attr('disabled','disabled');
                        $("#txtNoOfDefectiveSheets").attr('disabled', 'disabled');

                        //chbIssueCommunicationNote

                    }
                    else {

                    }

                    $.ajax({
                        url: '../../Users/GetRightToAccess',
                        type: 'GET',
                        data: { AccessData: JSON.stringify({ UserRole: UserType, FormCode: 'CORM' }) },
                        async: true,
                        success: function (AccessData) {
                            if (AccessData == "") {
                                //$("#StateFilter").css('display', 'none');
                            }
                            else {
                                AccessData = JSON.parse(AccessData);
                                IsView_CORM = AccessData[0]["IS_VIEW"];
                                IsAdd_CORM = AccessData[0]["IS_ADD"];
                                IsUpdate_CORM = AccessData[0]["IS_UPDATE"];
                                IsApprove_CORM = AccessData[0]["IS_APPROVE"];
                                if (IsAdd_CORM == true) {
                                    $('#CORM_Save').css("display", "block");
                                    //$('#CORM_AddNew').css("display", "block");
                                }
                                else {
                                    $('#CORM_Save').css("display", "none");
                                    //$('#CORM_AddNew').css("display", "none");
                                    //$("#StateFilter").css('display', 'none');
                                }

                                if (IsUpdate_CORM == true) {
                                    $('#CORM_Save').css("display", "block");
                                    //$('#CORM_AddNew').css("display", "block");
                                }
                                else {
                                    $('#CORM_Save').css("display", "none");
                                    //$('#CORM_AddNew').css("display", "none");
                                    //$("#StateFilter").css('display', 'none');
                                }

                                $('#SendForApproval').css("display", "none");
                            }
                        }
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });

    $scope.CorrectiveMeasureDate_Model = TODAY_DATE;
    $scope.NoticeIssuedDate_Model = TODAY_DATE;

    $scope.templatesettings = { HeaderTitle: "CorrectiveMeasureCtrl" };
    $scope.ID = "";

    if ($routeParams.ID == undefined || $routeParams.ID == "") {
        $scope.ID = "";
    }
    else {
        $scope.ID = $routeParams.ID;
        GetCorrectiveMeasureDataForEdit($routeParams.ID);
    }
    $scope.PREVENTIVELINE_ID = "";


    // Sending for Approval
    $scope.SendForApproval = function () {

        if ($scope.CorrectiveMeasureStatus_Model != "Waiting for approval") {
            var Flag = 0;
            if (($scope.Plant_Model) == "" || ($scope.Plant_Model) == undefined) {
                Flag = Flag + 1;
                $("#txtPlant").css("border-color", "red");
            }
            else {
                $("#txtPlant").css("border-color", "#d2d6de");
            }
            if (($scope.Product_Model) == "" || ($scope.Product_Model) == undefined) {
                Flag = Flag + 1;
                $("#txtProduct").css("border-color", "red");
            }
            else {
                $("#txtProduct").css("border-color", "#d2d6de");
            }
            if (($scope.InvoiceNo_Model) == "" || ($scope.InvoiceNo_Model) == undefined) {
                Flag = Flag + 1;
                $("#txtInvoiceNo").css("border-color", "red");
            }
            else {
                $("#txtInvoiceNo").css("border-color", "#d2d6de");
            }

            if (($scope.Defect_Model) == "" || ($scope.Defect_Model) == undefined) {
                Flag = Flag + 1;
                $("#txtDefect").css("border-color", "red");
            }
            else {
                $("#txtDefect").css("border-color", "#d2d6de");
            }

            if (($scope.InvoiceDate_Model) == "" || ($scope.InvoiceDate_Model) == undefined) {
                Flag = Flag + 1;
                $("#txtInvoiceDate").css("border-color", "red");
            }
            else {
                $("#txtInvoiceDate").css("border-color", "#d2d6de");
            }

            if (($scope.BatchNo_Model) == "" || ($scope.BatchNo_Model) == undefined) {
                Flag = Flag + 1;
                $("#txtBatchNo").css("border-color", "red");
            }
            else {
                $("#txtBatchNo").css("border-color", "#d2d6de");
            }
            if (($scope.NoOfDefectiveSheets_Model) == "" || ($scope.NoOfDefectiveSheets_Model) == undefined) {
                Flag = Flag + 1;
                $("#txtNoOfDefectiveSheets").css("border-color", "red");
            }
            else {
                $("#txtNoOfDefectiveSheets").css("border-color", "#d2d6de");
            }

            if (Flag > 0) {
                console.log("Flag : " + Flag);
            } else {
                var CorrectiveMeasureData = JSON.stringify({
                    CorrectiveMeasureID: $scope.ID,
                    OperationName: "SendForApproval",
                    CMDocStatus_CM: "Waiting for approval",
                    CorrectiveMeasureDate_CM: $scope.CorrectiveMeasureDate_Model,
                    CorrectiveMeasureStatus_CM: $scope.CorrectiveMeasureStatus_Model,
                    CREATED_BY: $scope.UserName,
                    CREATED_DATE: $scope.CorrectiveMeasureDate_Model
                });
                DIMSFactory.saveCorrectiveData(CorrectiveMeasureData).success(function (DATA) {
                    var response = (DATA.tabledata);
                    if (response != "FALSE") {
                        var result = response.split('$$');
                        $scope.CMDocStatus_Model = result[1];
                        alert("Record updated successfully");
                    } else {
                        alert("Error in Approval");

                    }


                });
            }

        } else {
            alert("Already sent for review");
        }
    }

    $scope.MakeApproved = function () {
        try {
            if ($scope.CMDocStatus_Model == "DRAFT") {
                alert("Please send for approval");
            }
            else if ($scope.CMDocStatus_Model == "Approved") {
                alert("This record already got approved");
            }
            else {
                var ApprovalData = JSON.stringify({
                    CM_Id: $("#txtCorrectiveMeasureId").val(),
                    ModifiedBy: $("#USERNAME_CorrectiveMeasure").val(),
                    FormName: "CorrectiveMeasure"
                });
                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistration/MakeApproval',
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") {
                        alert("Error Occured Please try later");
                    }
                    else if (response.data == "TRUE") {
                        $("#txtCMDocStatus").val("Approved");
                        alert("Successfully Approved.");
                    }
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }
    // All Look Up functionality based on MasterType
    $scope.Getdata = function (Methodname, MasterType, Heading) {


        var ID = "";
        var PrdCategoryCode = "";
        var PrdTypeCode = "";
        var UserCode = "";
        var SiteDetailCode = "";
        var CompanyDetailCode = "";
        var DocumentCode = "CORM";
        var StateFilter = $("#StateFilter").val();


        if (Methodname == "GetPlantData" || Methodname == "getProductData") {
            if ($scope.InvestigationNum_Model == "" || $scope.InvestigationNum_Model == null) {
                ID = "0";
            }
            else {
                ID = $scope.InvestigationNum_Model;
            }
        }

        else if (Methodname == "getDefectTypeData") {

            if ($scope.ProductCategoryCode_Model == "" || $scope.ProductCategoryCode_Model == null) {
                PrdCategoryCode = "";
            } else {
                PrdCategoryCode = $scope.ProductCategoryCode_Model;
            }
            if ($scope.ProductTypeCode_Model == "" || $scope.ProductTypeCode_Model == null) {
                PrdTypeCode = "";
            } else {
                PrdTypeCode = $scope.ProductTypeCode_Model;
            }
        }

        else if (Methodname == "getInvestigationData") {

            if ($scope.SiteDetailed_Code == "" || $scope.SiteDetailed_Code == null) {
                SiteDetailCode = "";
            }
            else {
                SiteDetailCode = $scope.SiteDetailed_Code;
            }
            if ($scope.CompanyDetailed_Code == "" || $scope.CompanyDetailed_Code == null) {
                CompanyDetailCode = "";
            }
            else {
                CompanyDetailCode = $scope.CompanyDetailed_Code;
            }
            UserCode = $scope.UserCode;

        }


        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: ID,
            UserCode: $scope.UserCode,
            SiteDetailCode: SiteDetailCode,
            CompanyDetailCode: CompanyDetailCode,
            ProductCategoryCode: PrdCategoryCode,
            ProductTypeCode: PrdTypeCode,
            DocumentCode: DocumentCode,
            State: StateFilter
        });

        if (MasterType == "ProductMaster") {
            if ($("#txtInvestigationNum").val() == "") {
                return;
            }
            else {
                Data = JSON.stringify({
                    MasterType: "ProductMasterCM",
                    ID: ID,
                    InvNum: $("#txtInvestigationNum").val()
                });
            }
        }
        else if (MasterType == "PlantMaster") {
            if ($("#txtInvestigationNum").val() == "") {
                return;
            }
            else {
                Data = JSON.stringify({
                    MasterType: "PlantMasterCM",
                    ID: ID,
                    InvNum: $("#txtInvestigationNum").val()
                });
            }
        }

        DIMSFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);


            if (Methodname == "getInvestigationData") {
                //$("#PopUpTable thead tr th:nth-child(5)").hide();
                //$("#PopUpTable thead tr th:nth-child(6)").hide();
                //$("#PopUpTable thead tr th:nth-child(9)").hide();
                //$("#PopUpTable thead tr th:nth-child(12)").hide();
                //$("#PopUpTable thead tr th:nth-child(15)").hide();
                //$("#PopUpTable thead tr th:nth-child(16)").hide();
                //$("#PopUpTable thead tr th:nth-child(17)").hide();
                //$("#PopUpTable thead tr th:nth-child(18)").hide();


                //$("#PopUpTable tbody tr td:nth-child(5)").hide();
                //$("#PopUpTable tbody tr td:nth-child(6)").hide();
                //$("#PopUpTable tbody tr td:nth-child(9)").hide();
                //$("#PopUpTable tbody tr td:nth-child(12)").hide();
                //$("#PopUpTable tbody tr td:nth-child(15)").hide();
                //$("#PopUpTable tbody tr td:nth-child(16)").hide();
                //$("#PopUpTable tbody tr td:nth-child(17)").hide();
                //$("#PopUpTable tbody tr td:nth-child(18)").hide();
            }
            else if (Methodname == "getRootCauseActionData") {

                $("#PopUpTable thead tr th:nth-child(5)").hide();
                $("#PopUpTable thead tr th:nth-child(6)").hide();

                $("#PopUpTable tbody tr td:nth-child(5)").hide();
                $("#PopUpTable tbody tr td:nth-child(6)").hide();

            }

        });


    }

    // Page redirection
    $scope.go = function (path) {

        CheckUserSession();

        $location.path(path);
    };


    $scope.OpenObeservationInvestigation_Model = function () {
        $("#CMObservationInves_Delete").hide();
        $scope.ObservationInv_id_Model = "";
        $scope.txtCMObservationName_Model = "";
        $("#CMObservationInves_Save").text("Save");
        $("#txtCMObservationName").css("border-color", "#d2d6de");
        $("#ObservationsByInvestigatorDetailModal").modal('show');
    }
    $scope.SaveCMObservationInvesData = function () {

        var id = $scope.ObservationInv_id_Model;

        if (id == undefined || id == null) {
            id = "";
        }
        if (($scope.txtCMObservationName_Model) == "") {
            $("#txtCMObservationName").css("border-color", "red");
            return;
        }
            //else if (($scope.InvestigationNum_Model == undefined) || ($scope.InvestigationNum_Model == "")) {
            //    alert("Please Select Investigation Number");
            //    $("#txtInvestigationNum").css("border-color", "red");
            //    return;
            //}
        else {
            $("#txtCMObservationName").css("border-color", "#d2d6de");
            $("#txtInvestigationNum").css("border-color", "#d2d6de");
            var TRCode = "";

            TRCode = TRCode + "<td>" + $scope.txtCMObservationName_Model + "</td>";
            TRCode = TRCode + "<td style='visibility:hidden'></td>";
            TRCode = TRCode + "<td style='visibility:hidden'></td>";

            var ObservationsByInvestigatorDetails = new Array();
            if (id == "") {
                id = $("#ObservationsByInvestigatorDetails_Table tbody tr").length + 1;


                for (var i = 1 ; i <= (id - 1) ; i++) {
                    var LineIDTABLE = $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + i + " td")[4].innerHTML;
                    if (LineIDTABLE == undefined || LineIDTABLE == "") {
                        LineIDTABLE = "";
                        ObservationsByInvestigatorDetails.push({
                            SlNo: $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + i + " td")[0].innerHTML,
                            ObservationName: $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + i + " td")[1].innerHTML,
                            ObservationCode: $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + i + " td")[2].innerHTML,
                            ObservationID: $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + i + " td")[3].innerHTML,
                            LineID: LineIDTABLE
                        });
                    }
                }
                ObservationsByInvestigatorDetails.push({
                    SlNo: id,
                    ObservationName: $scope.txtCMObservationName_Model,
                    ObservationCode: "",
                    ObservationID: "",
                    LineID: ""
                });

                var headerData = $scope.getCorrectiveMeasureSaveData();
                if (headerData != "0") {
                    var CorrectiveMeasureData = JSON.stringify({
                        HeaderData: headerData,
                        OperationName: "ObservationLinesSaving",
                        OperationType: "Save",
                        CMDocStatus_CM: $scope.CMDocStatus_Model,
                        CREATED_BY: $scope.UserName,
                        CREATED_DATE: $scope.CorrectiveMeasureDate_Model,
                        CorrectiveMeasureID: $scope.ID,
                        ObservationsByInvestigatorDetails: ObservationsByInvestigatorDetails
                    });
                    DIMSFactory.saveCorrectiveData(CorrectiveMeasureData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.CorrectiveMeasureId_Model = result[0];

                            TRCode = TRCode + "<td style='display:none;'>" + result[1] + "</td>";

                            TRCode = "<tr class='MousePointer' id='OBSLINES_" + id + "'  ng-click='EditObservationLines(obj,$event);' ><td>" + id + "</td>" + TRCode + "</tr>";
                            var html = $compile(TRCode)($scope);

                            var el = angular.element($("#ObservationsByInvestigatorDetails_Table tbody"));
                            el.append(html);
                            $compile(html)($scope)
                            $scope.txtCMObservationName_Model = "";
                            $scope.ObservationInv_id_Model = "";
                            $("#ObservationsByInvestigatorDetailModal").modal("hide");
                        }
                    });
                } else {
                }
            }
            else {
                ObservationsByInvestigatorDetails.push({
                    SlNo: id,
                    ObservationName: $scope.txtCMObservationName_Model,
                    ObservationCode: "",
                    ObservationID: "",
                    LineID: $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + id + " td")[4].innerHTML
                });

                var CorrectiveMeasureData = JSON.stringify({
                    OperationName: "ObservationLinesSaving",
                    OperationType: "Save",
                    CMDocStatus_CM: $scope.CMDocStatus_Model,
                    CREATED_BY: $scope.UserName,
                    CREATED_DATE: $scope.CorrectiveMeasureDate_Model,
                    CorrectiveMeasureID: $scope.ID,
                    ObservationsByInvestigatorDetails: ObservationsByInvestigatorDetails
                });
                DIMSFactory.saveCorrectiveData(CorrectiveMeasureData).success(function (data) {
                    var response = (data.tabledata);
                    if (response != "FALSE") {

                        var result = response.split('$$');
                        $scope.ID = result[0];
                        $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + id + " td")[0].innerHTML = id;
                        $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + id + " td")[1].innerHTML = $scope.txtCMObservationName_Model;
                        $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + id + " td")[4].innerHTML = result[1];
                        $scope.txtCMObservationName_Model = "";
                        $scope.ObservationInv_id_Model = "";
                        $("#ObservationsByInvestigatorDetailModal").modal("hide");
                    }
                });
            }
        }
    }
    $scope.EditObservationLines = function (obj, $event) {
        try {
            var id = $($event.target).parent().attr("id");


            $scope.ObservationInv_id_Model = $("#ObservationsByInvestigatorDetails_Table tbody #" + id + " td")[0].innerHTML;

            $scope.txtCMObservationName_Model = ($("#ObservationsByInvestigatorDetails_Table tbody #" + id + " td")[1].innerHTML);

            $("#ObservationsByInvestigatorDetailModal").modal('show');
            $("#CMObservationInves_Delete").show();
            $("#CMObservationInves_Save").text("Update");

        }
        catch (e) {
            alert("Error : EditObservationLines : " + e);
        }

    }
    $scope.DeleteCMObservationInves = function () {
        try {
            var id = $scope.ObservationInv_id_Model;

            var Line_id = $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + id + " td")[4].innerHTML;
            var CorrectiveMeasureData = JSON.stringify({
                OperationName: "ObservationLinesSaving",
                OperationType: "Delete",
                ID: Line_id,
                CREATED_BY: $scope.UserName,
                CREATED_DATE: $scope.CorrectiveMeasureDate_Model,
                CorrectiveMeasureID: $scope.ID

            });


            DIMSFactory.deleteCorrectiveData(CorrectiveMeasureData).success(function (data) {
                var response = (data.tabledata);
                if (response != "FALSE") {
                    $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + id + "").remove();
                    $scope.txtCMObservationName_Model = "";
                    var i = 1;
                    $("#ObservationsByInvestigatorDetails_Table tbody tr").each(function () {
                        $(this).attr("id", "OBSLINES_" + i);
                        $("#ObservationsByInvestigatorDetails_Table tbody #OBSLINES_" + i + " td")[0].innerHTML = i;
                        i = i + 1;
                    });
                    $("#ObservationsByInvestigatorDetailModal").modal("hide");
                }
            });

        }
        catch (e) {
            alert("Error : DeleteCMObservationInves : " + e);
        }
    }
    $scope.OpenEmergencyResponseModel = function () {

        if ($("#txtInvestigationNum").val() == "") {
            alert("Please select Investigation Number");
            return;
        }

        $("#EmergencyResponseAction_id").val("");
        $("#txtCMEmergencyActionName").val("");
        $("#txtCMEmergencyActionID").val("");
        $("#txtCMEmergencyActionCode").val("");
        $("#txtCMEmergencyDescription").val("");
        $("#txtCMEmergencyTargetDate").val("");
        $("#txtCMEmergencyActualDate").val("");
        $("#txtCMEmergencyRemarks").val("");

        $("#txtCMEmergencyTargetDate").datepicker("setDate", null);
        $("#txtCMEmergencyActualDate").datepicker("setDate", null);

        $("#txtCMEmergencyActionName").css("border-color", "#d2d6de");
        $("#CMEmergencyResponseAction_Delete").hide();
        $("#CMEmergencyResponseAction_Save").text("Save");
        $("#EmergencyResponseActionDetailModal").modal('show');

    }
    $scope.SaveCMEmergencyResponseActionData = function () {

        var LineId = $("#EmergencyResponseAction_id").val();

        var ActionName = $("#txtCMEmergencyActionName").val();
        var ActionCode = $("#txtCMEmergencyActionCode").val();

        if (ActionName == "" || ActionCode == "") {
            $("#txtCMEmergencyActionName").css("border-color", "red");
            return;
        }
        else {
            $("#txtCMEmergencyActionName").css("border-color", "#d2d6de");
        }

        var EmergencyDescription = $("#txtCMEmergencyDescription").val();
        var EmergencyTargetDate = $("#txtCMEmergencyTargetDate").val();

        var EmergencyActualDate = $("#txtCMEmergencyActualDate").val();
        var EmergencyRemarks = $("#txtCMEmergencyRemarks").val();


        if (LineId == "") {
            var TRCode = "";

            TRCode = TRCode + "<td>" + ActionName + "</td>";
            TRCode = TRCode + "<td>" + EmergencyDescription + "</td>";
            TRCode = TRCode + "<td>" + EmergencyTargetDate + "</td>";
            TRCode = TRCode + "<td>" + EmergencyActualDate + "</td>";
            TRCode = TRCode + "<td>" + EmergencyRemarks + "</td>";
            TRCode = TRCode + "<td style='display:none;'>" + ActionCode + "</td>";

            LineId = $("#EmergencyResponseActionsDetails_Table tbody tr").length + 1;
            TRCode = "<tr class='MousePointer' id='ERAD_" + LineId + "' onclick='EditCMEmergencyLines(this.id)'><td>" + LineId + "</td>" + TRCode + "</tr>";
            $("#EmergencyResponseActionsDetails_Table tbody").append(TRCode);

            $("#EmergencyResponseActionDetailModal").modal('hide');
        }
        else {
            $("#EmergencyResponseActionsDetails_Table tbody #" + LineId + " td")[1].innerHTML = ActionName;
            $("#EmergencyResponseActionsDetails_Table tbody #" + LineId + " td")[2].innerHTML = EmergencyDescription;
            $("#EmergencyResponseActionsDetails_Table tbody #" + LineId + " td")[3].innerHTML = EmergencyTargetDate;
            $("#EmergencyResponseActionsDetails_Table tbody #" + LineId + " td")[4].innerHTML = EmergencyActualDate;
            $("#EmergencyResponseActionsDetails_Table tbody #" + LineId + " td")[5].innerHTML = EmergencyRemarks;
            $("#EmergencyResponseActionsDetails_Table tbody #" + LineId + " td")[6].innerHTML = ActionCode;
            $("#EmergencyResponseActionDetailModal").modal('hide');
        }
    }
    $scope.DeleteCMEmergencyResponseAction = function () {
        var LineId = $("#EmergencyResponseAction_id").val();
        $("#EmergencyResponseActionsDetails_Table tbody #" + LineId + "").remove();

        var i = 1;

        $("#EmergencyResponseActionsDetails_Table tbody tr").each(function () {
            $(this).attr("id", "ERAD_" + i);
            $("#EmergencyResponseActionsDetails_Table tbody #ERAD_" + i + " td")[0].innerHTML = i;
            i = i + 1;
        });
        $("#EmergencyResponseActionDetailModal").modal('hide');
    }
    $scope.EditCMRootCauseLines = function (obj, $event) {
        try {
            var id = $($event.target).parent().attr("id");


            $scope.RootCauseLines_id_Model = $("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[0].innerHTML;
            $scope.CMRootCauseLinesCauseName_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[1].innerHTML);
            $scope.CMRootCauseLinesDescription_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[2].innerHTML);
            $scope.CMRootCauseLinesFindings_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[3].innerHTML);
            $scope.CMRootCauseLinesRelatedTo_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[4].innerHTML);
            $scope.CMRootCauseLinesRemarks_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[5].innerHTML);

            $scope.CMRootCauseLinesCode_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[6].innerHTML);
            $scope.CMRootCauseLinesID_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[7].innerHTML);
            $scope.CMRootCauseRelatedToCode_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[8].innerHTML);
            $scope.CMRootCauseRelatedToID_Model = ($("#CMRootCauseEscapePointDetails_Table tbody #" + id + " td")[9].innerHTML);


            $("#RootCauseLinesDetailModal").modal('show');
            $("#CMRootCauseLines_Delete").show();
            $("#CMRootCauseLines_Save").text("Update");

        }
        catch (e) {
            alert("Error : EditCMRootCauseLines : " + e);
        }

    }
    $scope.DeleteCMRootCauseLines = function () {
        try {
            var id = $scope.RootCauseLines_id_Model;
            var Line_id = $("#CMRootCauseEscapePointDetails_Table tbody #ROOTCAUSELINES_" + id + " td")[10].innerHTML;
            var CorrectiveMeasureData = JSON.stringify({
                OperationName: "RootCauseLinesSaving",
                OperationType: "Delete",
                ID: Line_id,
                CREATED_BY: $scope.UserName,
                CREATED_DATE: $scope.CorrectiveMeasureDate_Model,
                CorrectiveMeasureID: $scope.ID

            });


            DIMSFactory.deleteCorrectiveData(CorrectiveMeasureData).success(function (data) {
                var response = (data.tabledata);

                if (response != "FALSE") {
                    $("#CMRootCauseEscapePointDetails_Table tbody #ROOTCAUSELINES_" + id + "").remove();
                    $scope.RootCauseLines_id_Model = "";
                    $scope.CMRootCauseLinesCauseName_Model = "";
                    $scope.CMRootCauseLinesDescription_Model = "";
                    $scope.CMRootCauseLinesFindings_Model = "";
                    $scope.CMRootCauseLinesRelatedTo_Model = "";
                    $scope.CMRootCauseLinesRemarks_Model = "";

                    $scope.CMRootCauseLinesCode_Model = "";
                    $scope.CMRootCauseLinesID_Model = "";
                    $scope.CMRootCauseRelatedToCode_Model = "";
                    $scope.CMRootCauseRelatedToID_Model = "";

                    var i = 1;
                    $("#CMRootCauseEscapePointDetails_Table tbody tr").each(function () {
                        $(this).attr("id", "ROOTCAUSELINES_" + i);
                        $("#CMRootCauseEscapePointDetails_Table tbody #ROOTCAUSELINES_" + i + " td")[0].innerHTML = i;
                        i = i + 1;
                    });
                    $("#RootCauseLinesDetailModal").modal("hide");
                }
            });


        }
        catch (e) {
            alert("Error : DeleteCMRootCauseLines : " + e);
        }
    }
    $scope.getObservationMasterDataFromINV = function (InvestigationNo) {

        var ID = "0";

        var Data = JSON.stringify({
            MasterType: "ObservationMasterFromInv",
            InvestigationNo: InvestigationNo
        });

        DIMSFactory.getMasterData(Data).success(function (response) {

            var data = JSON.parse(response.tabledata);
            if (data != "") {
                var TRCode = "";
                $("#ObservationsByInvestigatorDetails_Table tbody").empty();

                for (var i = 0; i < data.length; i++) {
                    TRCode = "";
                    TRCode = TRCode + "<td>" + data[i]["OBSERVATION_NAME"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'>" + data[i]["OBSERVATION_CODE"] + "</td>";

                    var id = $("#ObservationsByInvestigatorDetails_Table tbody tr").length + 1;
                    TRCode = "<tr class='MousePointer' id='OBSLINES_" + id + "'  ng-click='EditObservationLines(obj,$event);' ><td>" + id + "</td>" + TRCode + "</tr>";
                    var html = $compile(TRCode)(CorrectivemeasureScope);

                    var el = angular.element($("#ObservationsByInvestigatorDetails_Table tbody"));
                    el.append(html);
                    $compile(html)(CorrectivemeasureScope);

                }

            }
        });

    }
    $scope.SaveCorrectiveMeasure = function () {

        SaveCorrectiveMeasureData("Button");

    }
    $scope.getCorrectiveMeasureSaveData = function () {
        if (($scope.InvestigationNum_Model == undefined) || ($scope.InvestigationNum_Model == "")) {
            alert("Please Select Investigation Number");
            $("#txtInvestigationNum").css("border-color", "red");
            return "0";
        }
        else if (($scope.ComplaintRegisteredDate_Model == undefined) || ($scope.ComplaintRegisteredDate_Model == "")) {
            alert("Please Select Complaint Registered Date");
            $("#txtComplaintRegisteredDate").css("border-color", "red");
            return "0";
        } else if (($scope.Plant_Model == undefined) || ($scope.Plant_Model == "")) {
            alert("Please Select Plant");
            $("#txtPlant").css("border-color", "red");
            return "0";
        } else if (($scope.InvestigationDate_Model == undefined) || ($scope.InvestigationDate_Model == "")) {
            alert("Please Select Investigation Date");
            $("#txtInvestigationDate").css("border-color", "red");
            return "0";
        }
        else if (($scope.CMSeriesCode_Model == undefined) || ($scope.CMSeriesCode_Model == "")) {
            alert("Please Select CM Series Code");
            $("#txtCMSeriesCode").css("border-color", "red");
            return "0";
        }

        else if (($scope.ComplaintType_Model == undefined) || ($scope.ComplaintType_Model == "")) {
            alert("Please Select Complaint Type");
            $("#txtComplaintType").css("border-color", "red");
            return "0";
        }
        else if (($scope.ComplaintCategory_Model == undefined) || ($scope.ComplaintCategory_Model == "")) {
            alert("Please Select Complaint Category");
            $("#txtComplaintCategory").css("border-color", "red");
            return "0";
        }

        else if (($scope.NoticeIssuedDate_Model == undefined) || ($scope.NoticeIssuedDate_Model == "")) {
            alert("Please Select Notice Issue Date");
            $("#txtNoticeIssuedDate").css("border-color", "red");
            return "0";
        }

        else if (($scope.Product_Model == undefined) || ($scope.Product_Model == "")) {
            alert("Please Select Product");
            $("#txtProduct").css("border-color", "red");
            return "0";
        }

        else if (($scope.Defect_Model == undefined) || ($scope.Defect_Model == "")) {
            alert("Please Select Defect");
            $("#txtDefect").css("border-color", "red");
            return "0";
        }

        else if (($scope.BatchNo_Model == undefined) || ($scope.BatchNo_Model == "")) {
            alert("Please Select Batch");
            $("#txtBatchNo").css("border-color", "red");
            return "0";
        }

        else if (($scope.InvoiceNo_Model == undefined) || ($scope.InvoiceNo_Model == "")) {
            alert("Please Enter Invoice Number");
            $("#txtInvoiceNo").css("border-color", "red");
            return "0";
        }

        else if (($scope.InvoiceDate_Model == undefined) || ($scope.InvoiceDate_Model == "")) {
            alert("Please Select Invoice Date");
            $("#txtInvoiceDate").css("border-color", "red");
            return "0";
        }

        else if (($scope.NoOfDefectiveSheets_Model == undefined) || ($scope.NoOfDefectiveSheets_Model == "")) {
            alert("Please Enter No.of Defective Sheets");
            $("#txtNoOfDefectiveSheets").css("border-color", "red");
            return "0";
        }

        else {
            if ($scope.ApprovedDate_Model == undefined || $scope.ApprovedDate_Model == "") {
                $scope.ApprovedDate_Model = "";
            }

            if ($scope.CorrectiveMeasureStatus_Model == undefined || $scope.CorrectiveMeasureStatus_Model == "") {
                $scope.CorrectiveMeasureStatus_Model = "";
            }
            if ($scope.Product_Model == undefined || $scope.Product_Model == "") {
                $scope.Product_Model = "";
            }

            if ($scope.ProductCode_CM == undefined || $scope.ProductCode_CM == "") {
                $scope.ProductCode_CM = "";
            }

            if ($scope.CommunicationNoteID_CM == undefined || $scope.CommunicationNoteID_CM == "") {
                $scope.CommunicationNoteID_CM = "";
            }


            if ($scope.ComplaintTypeID_Model == undefined || $scope.ComplaintTypeID_Model == "") {
                $scope.ComplaintTypeID_Model = "";
            }

            if ($scope.CommunicationNoteID_Model == undefined || $scope.CommunicationNoteID_Model == "") {
                $scope.CommunicationNoteID_Model = "";
            }
            if ($scope.PlantCode == undefined || $scope.PlantCode == "") {
                $scope.PlantCode = "";
            }
            if ($scope.Plant_Model == undefined || $scope.Plant_Model == "") {
                $scope.Plant_Model = "";
            }

            if ($scope.CMSeriesCode_Model == undefined || $scope.CMSeriesCode_Model == "") {
                $scope.CMSeriesCode_Model = "";
            }

            if ($scope.ComplaintTrackingNo == undefined || $scope.ComplaintTrackingNo == "") {
                $scope.ComplaintTrackingNo = "";
            }

            if ($scope.InvestigationDoneBy_Model == undefined || $scope.InvestigationDoneBy_Model == "") {
                $scope.InvestigationDoneBy_Model = "";
            }

            if ($scope.CustomerCode_Model == undefined || $scope.CustomerCode_Model == "") {
                $scope.CustomerCode_Model = "";
            }

            if ($scope.CustomerName_Model == undefined || $scope.CustomerName_Model == "") {
                $scope.CustomerName_Model = "";
            }
            if ($scope.ProductTypeCode_Model == undefined || $scope.ProductTypeCode_Model == "") {
                $scope.ProductTypeCode_Model = "";
            }
            if ($scope.ProductType_Model == undefined || $scope.ProductType_Model == "") {
                $scope.ProductType_Model = "";
            }
            if ($scope.CMDocStatus_Model == undefined || $scope.CMDocStatus_Model == "") {
                $scope.CMDocStatus_Model = "";
            }
            if ($scope.ProductCategoryCode_Model == undefined || $scope.ProductCategoryCode_Model == "") {
                $scope.ProductCategoryCode_Model = "";
            }
            if ($scope.ProductCategory_Model == undefined || $scope.ProductCategory_Model == "") {
                $scope.ProductCategory_Model = "";
            }
            if ($scope.Location_Model == undefined || $scope.Location_Model == "") {
                $scope.Location_Model = "";
            }
            if ($scope.ComplaintType_Model == undefined || $scope.ComplaintType_Model == "") {
                $scope.ComplaintType_Model = "";
            }
            if ($scope.ComplaintCategory_Model == undefined || $scope.ComplaintCategory_Model == "") {
                $scope.ComplaintCategory_Model = "";
            }
            if ($scope.NoticeType_Model == undefined || $scope.NoticeType_Model == "") {
                $scope.NoticeType_Model = "";
            }

            if ($scope.CorrectiveMeasureStatus_Model == undefined || $scope.CorrectiveMeasureStatus_Model == "") {
                $scope.CorrectiveMeasureStatus_Model = "";
            }

            if ($scope.IssueComNote_Model == undefined || $scope.IssueComNote_Model == "") {
                $scope.IssueComNote_Model = "";
            }

            if ($scope.Product_Model == undefined || $scope.Product_Model == "") {
                $scope.Product_Model = "";
            }

            if ($scope.ProductCode_Model == undefined || $scope.ProductCode_Model == "") {
                $scope.ProductCode_Model = "";
            }

            if ($scope.InvoiceNo_Model == undefined || $scope.InvoiceNo_Model == "") {
                $scope.InvoiceNo_Model = "";
            }

            if ($scope.Defect_Model == undefined || $scope.Defect_Model == "") {
                $scope.Defect_Model = "";
            }

            if ($scope.BatchNo_Model == undefined || $scope.BatchNo_Model == "") {
                $scope.BatchNo_Model = "";
            }

            if ($scope.NoticeRemAdditional_Model == undefined || $scope.NoticeRemAdditional_Model == "") {
                $scope.NoticeRemAdditional_Model = "";
            }

            if ($scope.Symptoms_Model == undefined || $scope.Symptoms_Model == "") {
                $scope.Symptoms_Model = "";
            }

            if ($scope.ProblemImpact_Model == undefined || $scope.ProblemImpact_Model == "") {
                $scope.ProblemImpact_Model = "";
            }

            if ($scope.ProblemDescription_Model == undefined || $scope.ProblemDescription_Model == "") {
                $scope.ProblemDescription_Model = "";
            }

            if ($scope.Conclusion_Model == undefined || $scope.Conclusion_Model == "") {
                $scope.Conclusion_Model = "";
            }
            if ($scope.NoOfDefectiveSheets_Model == undefined || $scope.NoOfDefectiveSheets_Model == "") {
                $scope.NoOfDefectiveSheets_Model = "";
            }


            if ($scope.ID == undefined || $scope.ID == "") {
                $scope.ID = "";
            }

            if ($scope.ID == "") {
                $scope.CorrectiveMeasureStatus_Model = "Notice Issued";
            }
            if ($scope.ComplaintDesc_Model == undefined || $scope.ComplaintDesc_Model == "") {
                $scope.ComplaintDesc_Model = "";
            }
            if ($scope.InvoiceDate_Model == undefined || $scope.InvoiceDate_Model == "") {
                $scope.InvoiceDate_Model = "";
            }

            if ($scope.EMPLOYEE_ID == undefined || $scope.EMPLOYEE_ID == "") {
                $scope.EMPLOYEE_ID = "";
            }
            if ($scope.EMPLOYEE_CODE == undefined || $scope.EMPLOYEE_CODE == "") {
                $scope.EMPLOYEE_CODE = "";
            }
            if ($scope.CUSTOMER_ID == undefined || $scope.CUSTOMER_ID == "") {
                $scope.CUSTOMER_ID = "";
            }
            if ($scope.COMPLAINT_TYPE_ID == undefined || $scope.COMPLAINT_TYPE_ID == "") {
                $scope.COMPLAINT_TYPE_ID = "";
            }
            if ($scope.COMPLAINT_CATEGORY_ID == undefined || $scope.COMPLAINT_CATEGORY_ID == "") {
                $scope.COMPLAINT_CATEGORY_ID = "";
            }
            if ($scope.PRODUCT_CATEGORY_ID == undefined || $scope.PRODUCT_CATEGORY_ID == "") {
                $scope.PRODUCT_CATEGORY_ID = "";
            }
            if ($scope.PRODUCT_TYPE_ID == undefined || $scope.PRODUCT_TYPE_ID == "") {
                $scope.PRODUCT_TYPE_ID = "";
            }
            if ($scope.PlantID == undefined || $scope.PlantID == "") {
                $scope.PlantID = "";
            }

            if ($scope.CorrectiveMeasureDate_Model == undefined || $scope.CorrectiveMeasureDate_Model == "") {
                $scope.CorrectiveMeasureDate_Model = "";
            }

            if ($scope.NoticeIssuedDate_Model == undefined || $scope.NoticeIssuedDate_Model == "") {
                $scope.NoticeIssuedDate_Model = "";
            }
            var CorrectiveMeasureData = JSON.stringify({
                CorrectiveMeasureID: $scope.ID,
                OperationName: "EditCorrectiveMeasureData",
                InvestigationNumber_CM: $scope.InvestigationNum_Model,
                ComplaintRegistrationDate_CM: $scope.ComplaintRegisteredDate_Model,
                CorrectiveMeasureId_CM: $scope.CorrectiveMeasureId_Model,
                PlantCode: $scope.PlantCode,
                PlantName: $scope.Plant_Model,
                InvestigationDate_CM: $scope.InvestigationDate_Model,
                CMSeriesCode_CM: $scope.CMSeriesCode_Model,
                ComplaintTrackingNo_CM: $scope.ComplaintTrackingNo,
                InvestigationDoneBy_CM: $scope.InvestigationDoneBy_Model,
                CorrectiveMeasureDate_CM: $scope.CorrectiveMeasureDate_Model,
                CustomerCode_CM: $scope.CustomerCode_Model,
                CustomerName_CM: $scope.CustomerName_Model,
                ProductTypeCode_CM: $scope.ProductTypeCode_Model,
                ProductType_CM: $scope.ProductType_Model,
                CMDocStatus_CM: $scope.CMDocStatus_Model,
                ProductCategoryCode_CM: $scope.ProductCategoryCode_Model,
                ProductCategory_CM: $scope.ProductCategory_Model,
                ApprovedDate_CM: $scope.ApprovedDate_Model,
                Location_CM: $scope.Location_Model,
                ComplaintTypeID_CM: $scope.ComplaintTypeID_Model,
                ComplaintType_CM: $scope.ComplaintType_Model,
                ComplaintDesc_CM: $scope.ComplaintDesc_Model,
                ComplaintCategoryID_CM: $scope.ComplaintCategoryID_Model,
                ComplaintCategory_CM: $scope.ComplaintCategory_Model,
                ComplaintTypeCode_Model_CM: $scope.ComplaintTypeCode_Model,
                NoticeType_CM: $scope.NoticeType_Model,
                CorrectiveMeasureStatus_CM: $scope.CorrectiveMeasureStatus_Model,
                IssueCommunication_CM: $scope.IssueComNote_Model,
                ProductName_CM: $scope.Product_Model,
                ProductCode_CM: $scope.ProductCode_Model,
                InvoiceNo_CM: $scope.InvoiceNo_Model,
                CommunicationNoteID_CM: $scope.CommunicationNoteID_Model,
                Defect_CM: $scope.Defect_Model,
                InvoiceDate_CM: $scope.InvoiceDate_Model,
                NoticeIssuedDate_CM: $scope.NoticeIssuedDate_Model,
                BatchNo_CM: $scope.BatchNo_Model,
                NoOfDefectiveSheets_CM: $scope.NoOfDefectiveSheets_Model,
                NoticeRemAdditional_CM: $scope.NoticeRemAdditional_Model,
                Symptoms_CM: $scope.Symptoms_Model,
                ProblemImpact_CM: $scope.ProblemImpact_Model,
                ProblemDescription_CM: $scope.ProblemDescription_Model,
                Conclusion_CM: $scope.Conclusion_Model,
                CREATED_BY: $scope.UserName,
                CREATED_DATE: $scope.CorrectiveMeasureDate_Model,
                EMPLOYEE_ID: $scope.EMPLOYEE_ID,
                EMPLOYEE_CODE: $scope.EMPLOYEE_CODE,
                CUSTOMER_ID: $scope.CUSTOMER_ID,
                COMPLAINT_TYPE_ID: $scope.COMPLAINT_TYPE_ID,
                COMPLAINT_CATEGORY_ID: $scope.COMPLAINT_CATEGORY_ID,
                PRODUCT_CATEGORY_ID: $scope.PRODUCT_CATEGORY_ID,
                PRODUCT_TYPE_ID: $scope.PRODUCT_TYPE_ID,
                PlantID: $scope.PlantID,
                CommunicationNoteIDRequired: "No"
                //ObservationsByInvestigatorDetails: ObservationsByInvestigatorDetails,
                //EmergencyResponseActionsDetails: EmergencyResponseActionsDetails,
                //CMTeamInvolvedDetails: CMTeamInvolvedDetails,
                //CMInterimContainmentActionsDetails: CMInterimContainmentActionsDetails,
                //CMRootCauseEscapePointDetails: CMRootCauseEscapePointDetails,
                //CMChosenPermanentCorrectiveActionDetails: CMChosenPermanentCorrectiveActionDetails,
                //CMImplementedCorrectiveActionDetails: CMImplementedCorrectiveActionDetails,
                //CMVerificationofCorrectiveActionsDetails: CMVerificationofCorrectiveActionsDetails,
                //CMPreventiveActionsDetails: CMPreventiveActionsDetails,
                //CMVerificationofPreventiveActionsDetails: CMVerificationofPreventiveActionsDetails
            });
            return CorrectiveMeasureData;
        }
    }
});

var getJsonFromTable = function (LookUpType) {
    var rows = [];
    if (LookUpType == "CorrectiveChosenPermanentActionMaster") {

        $('#CMChosenPermanentCorrectiveActionDetails_Table tbody tr').each(function (i, n) {
            var $row = $(n);
            rows.push({
                'ID': $row.find('td:eq(8)').text(),
                'Corrective Chosen Permanent Action Code': $row.find('td:eq(7)').text(),
                'Corrective Chosen Permanent Action Name': $row.find('td:eq(1)').text(),
                'ChosenLineID': $row.find('td:eq(9)').text()

            });
        });

    }
    else if (LookUpType == "CorrectiveImplementPermanentActionMaster") {
        $('#CMImplementedCorrectiveActionDetails_Table tbody tr').each(function (i, n) {
            var $row = $(n);
            rows.push({
                'ID': $row.find('td:eq(10)').text(),
                'Implement Action Code': $row.find('td:eq(7)').text(),
                'Implement Action Name': $row.find('td:eq(1)').text(),
                'LineId': $row.find('td:eq(10)').text(),
                'CHOSEN_LINE_ID': $row.find('td:eq(9)').text(),
                'CHOSEN_ACTION_ID': $row.find('td:eq(8)').text()
            });
        });
    }
    else {
        $('#CMPreventiveActionsDetails_Table tbody tr').each(function (i, n) {
            var $row = $(n);
            rows.push({
                'ID': $row.find('td:eq(9)').text(),
                'Preventive Action Code': $row.find('td:eq(8)').text(),
                'Preventive Action Name': $row.find('td:eq(1)').text(),
                'Line ID': $row.find('td:eq(10)').text()

            });
        });
    }
    var data = JSON.stringify(rows);
    return (data);
};

// Plant Master Selection
function GetPlantData(obj) {
    CorrectivemeasureScope.$apply(function () {

        //CorrectivemeasureScope.PlantCode = $(obj).children().eq(1).html();
        //CorrectivemeasureScope.PlantName = $(obj).children().eq(2).html();

        $("#txtPlant").val($(obj).children().eq(2).html());
        $("#txtPlantCode").val($(obj).children().eq(1).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Complaint Type Master Selection
function getComplaintTypeData(obj) {
    CorrectivemeasureScope.$apply(function () {
        CorrectivemeasureScope.ComplaintType_Model = $(obj).children().eq(2).html();
        CorrectivemeasureScope.ComplaintTypeCode_Model = $(obj).children().eq(1).html();
        CorrectivemeasureScope.ComplaintTypeID_Model = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Complaint Category Master Selection
function getComplaintCategoryData(obj) {
    CorrectivemeasureScope.$apply(function () {

        $("#txtComplaintCategoryCode").val($(obj).children().eq(1).html());
        $("#txtComplaintCategory").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Product Master Selection
function getProductData(obj) {
    CorrectivemeasureScope.$apply(function () {

        $("#txtProduct_Code").val($(obj).children().eq(1).html());
        $("#txtProduct_Name").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Defect Type Master Selection
function getDefectTypeData(obj) {
    CorrectivemeasureScope.$apply(function () {

        $("#txtDefectCode").val($(obj).children().eq(1).html());
        $("#txtDefectName").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Emergency Master Selection
function getEmergencyActionData(obj) {
    CorrectivemeasureScope.$apply(function () {

        $("#txtCMEmergencyActionCode").val($(obj).children().eq(1).html());
        $("#txtCMEmergencyActionName").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Root Cause Action Master Selection
function getRootCauseActionData(obj) {
    CorrectivemeasureScope.$apply(function () {

        $("#txtCMRootCauseRelatedToCode").val($(obj).children().eq(5).html());
        $("#txtCMRootCauseLinesRelatedTo").val($(obj).children().eq(3).html());

        $("#txtCMRootCauseLinesCauseName").val($(obj).children().eq(2).html());
        $("#txtCMRootCauseLinesCauseCode").val($(obj).children().eq(1).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Chosen Permanent Master Selection
function getChosenPermanentData(obj) {
    CorrectivemeasureScope.$apply(function () {


        $("#txtCMChosenLinesActionCode").val($(obj).children().eq(1).html());
        $("#txtCMChosenLinesActionName").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Implemented Permanant Master Selection
function getImplementedPermanentData(obj) {
    CorrectivemeasureScope.$apply(function () {
        CorrectivemeasureScope.txtCMImplementLinesChosenLineID_Model = $(obj).children().eq(3).html();
        CorrectivemeasureScope.txtCMImplementLinesActionName_Model = $(obj).children().eq(2).html();
        CorrectivemeasureScope.txtCMImplementLinesActionCode_Model = $(obj).children().eq(1).html();
        CorrectivemeasureScope.txtCMImplementLinesActionID_Model = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Verification Lines Master Selection
function getVerificationLinesData(obj) {
    CorrectivemeasureScope.$apply(function () {
        CorrectivemeasureScope.txtCMVerificationLinesActionID_Model = $(obj).children().eq(5).html();
        CorrectivemeasureScope.txtCMVerificationLinesLineId_Model = $(obj).children().eq(3).html();
        CorrectivemeasureScope.txtCMVerificationLinesImplimentedActionName_Model = $(obj).children().eq(2).html();
        CorrectivemeasureScope.txtCMVerificationLinesImplimentedActionCode_Model = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Preventive Lines Master Selection
function getPreventiveLinesData(obj) {
    CorrectivemeasureScope.$apply(function () {

        CorrectivemeasureScope.txtCMIPreventiveLinesActionName_Model = $(obj).children().eq(2).html();
        CorrectivemeasureScope.txtCMIPreventiveLinesActionCode_Model = $(obj).children().eq(1).html();
        CorrectivemeasureScope.txtCMIPreventiveLinesActionID_Model = $(obj).children().eq(0).html();

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Preventive verification Lines Master Selection
function getPreventiveVerificationLinesData(obj) {
    CorrectivemeasureScope.$apply(function () {
        CorrectivemeasureScope.txtCMPreventiveVerificationLinesLineId_Model = $(obj).children().eq(3).html();
        CorrectivemeasureScope.txtCMPreventiveVerificationLinesPreventiveActionName_Model = $(obj).children().eq(2).html();
        CorrectivemeasureScope.txtCMPreventiveVerificationLinesPreventiveActionCode_Model = $(obj).children().eq(1).html();
        CorrectivemeasureScope.txtCMPreventiveVerificationLinesPreventiveActionID_Model = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Document Series Master Selection
function getCRSeriesData(obj) {
    CorrectivemeasureScope.$apply(function () {

        CorrectivemeasureScope.CMSeriesFinancialPeriod_Model = $(obj).children().eq(2).html();
        CorrectivemeasureScope.CMSeriesCode_Model = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//Interim ActionData Master Selection
function getInterimActionData(obj) {
    CorrectivemeasureScope.$apply(function () {

        $("#txtCMIntermLinesActionCode").val($(obj).children().eq(1).html());
        $("#txtCMIntermLinesActionName").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Investigation dAta Master Selection
function getInvestigationData(obj) {
    CorrectivemeasureScope.$apply(function () {

        $("#txtInvestigationNum").val($(obj).children().eq(1).html());

        $("#txtComplaintTrackingNo").val($(obj).children().eq(0).html());

        $("#txtCustomerCode").val($(obj).children().eq(5).html());

        //RAJU ELECTRICALS PAINTS &amp; CEMENTS

        $("#txtCustomerName").val($(obj).children().eq(6).html().replace("&amp;", "&"));
        $("#txtLocation").val($(obj).children().eq(16).html());
        $("#txtComplaintDesc").val($(obj).children().eq(17).html());

        $("#txtComplaintRegisteredDate").val($(obj).children().eq(7).html());
        $("#txtInvestigationDate").val($(obj).children().eq(8).html());

        $("#txtInvestigationDoneByCode").val($(obj).children().eq(14).html());
        $("#txtInvestigationDoneBy").val($(obj).children().eq(15).html());

        $("#txtProductTypeCode").val($(obj).children().eq(2).html());
        $("#txtProductType").val($(obj).children().eq(2).html());

        $("#txtProductCategoryCode").val($(obj).children().eq(3).html());
        $("#txtProductCategory").val($(obj).children().eq(4).html());

        $("#txtComplaintTypeCode").val($(obj).children().eq(12).html());
        $("#txtComplaintType").val($(obj).children().eq(13).html());

        $("#txtComplaintCategoryCode").val($(obj).children().eq(10).html());
        $("#txtComplaintCategory").val($(obj).children().eq(11).html());

        $("#txtNoticeType").val($(obj).children().eq(9).html());

        $("#txtNoticeIssuedDate").val(TODAY_DATE);
        $("#txtNoticeIssuedDate").datepicker("setDate", TODAY_DATE);

        CorrectivemeasureScope.getObservationMasterDataFromINV($(obj).children().eq(0).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetCorrectiveMeasureDataForEdit(Identity) {

    try {


        $("#txtCorrectiveMeasureId").val(Identity);

        //ShowLoader();

        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistration/GetCorrectiveMeasureDataForEdit',
            data: { IPData: Identity },
            async: true,
            success: function (Res) {

                if (Res == "") {
                }
                else {
                    Res = JSON.parse(Res);

                    var Header = Res["Header"];

                    $("#txtInvestigationNum").val(Header[0]["INVESTIGATION_ID"]);
                    $("#txtPlantCode").val(Header[0]["PLANT_CODE"]);
                    $("#txtPlant").val(Header[0]["PLANT_NAME"]);
                    $("#txtComplaintTrackingNo").val(Header[0]["COMPLAINT_TRACKING_NO"]);
                    $("#txtCustomerCode").val(Header[0]["Customer_Code"]);
                    $("#txtCustomerName").val(Header[0]["Customer_Name"]);
                    $("#txtLocation").val(Header[0]["LOCATION"]);
                    $("#txtComplaintDesc").val(Header[0]["Complaint_Desc"]);

                    $("#txtComplaintRegisteredDate").val(Header[0]["COMPLAINT_REGISTERED_DATE"]);
                    $("#txtInvestigationDate").val(Header[0]["INVESTIGATION_DATE"]);

                    $("#txtInvestigationDoneByCode").val(Header[0]["InvestigatorCode"]);
                    $("#txtInvestigationDoneBy").val(Header[0]["InvestigatorName"]);

                    $("#txtProductTypeCode").val(Header[0]["PRODUCT_TYPE_CODE"]);
                    $("#txtProductType").val(Header[0]["PRODUCT_TYPE_CODE"]);

                    $("#txtProductCategoryCode").val(Header[0]["Product_Category_Code"]);
                    $("#txtProductCategory").val(Header[0]["DIVISION_NAME"]);

                    $("#txtComplaintTypeCode").val(Header[0]["Complaint_Type"]);
                    $("#txtComplaintType").val(Header[0]["COMPLAINT_TYPE_NAME"]);

                    $("#txtComplaintCategoryCode").val(Header[0]["Complaint_Category"]);
                    $("#txtComplaintCategory").val(Header[0]["Complaint_Category_Name"]);

                    $("#txtCMSeriesCode").val("CMSZ12");

                    $("#txtCMDocStatus").val(Header[0]["DOC_STATUS"]);
                    $("#txtApprovedDate").val(Header[0]["APPROVED_DATE"]);

                    $("#txtCorrectiveMeasureDate").val(Header[0]["CREATED_DATE"]);
                    $("#txtCorrectiveMeasureStatus").val(Header[0]["CM_STATUS"]);
                    $("#txtNoticeType").val(Header[0]["NOTICE_TYPE"]);

                    $("#chbIssueCommunicationNote").val(Header[0][""]);
                    $("#txtCommunicationNoteID").val(Header[0]["Notice_Issue_No"]);
                    $("#txtNoticeIssuedDate").val(Header[0]["Notice_Issue_Date"]);
                    $("#txtNoticeRemAdditional").val(Header[0]["NOTICE_REMARKS"]);

                    $("#txtProduct_Code").val(Header[0]["Product_Code"]);
                    $("#txtProduct_Name").val(Header[0]["Product_Name"]);

                    $("#txtDefectCode").val(Header[0]["DEFECT_TYPE_CODE"]);
                    $("#txtDefectName").val(Header[0]["DEFECT_TYPE_NAME"]);

                    $("#txtBatchNo").val(Header[0]["BATCH_NO"]);

                    $("#txtInvoiceNo").val(Header[0]["Invoice_No"]);
                    $("#txtInvoiceDate").val(Header[0]["INVOICE_DATE"]);
                    $("#txtNoOfDefectiveSheets").val(Header[0]["NO_OF_DEFICTIVE_SHEETS"]);

                    $("#txtSymptoms").val(Header[0]["Symptoms"]);
                    $("#txtProblemImpact").val(Header[0]["Complaint_Impact"]);
                    $("#txtProblemDescription").val(Header[0]["Problem_Description"]);
                    $("#txtConclusion").val(Header[0]["Conclusion"]);


                    var ObrLines = Res["ObrLines"];

                    var i = 0;

                    var TRCode = "";

                    for (i = 0; i < ObrLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer ng-scope' id='OBSLINES_" + (i + 1) + "' ng-click='EditObservationLines(obj,$event);'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + ObrLines[i]["OBSERVATION_NAME"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + ObrLines[i]["OBSERVATION_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }

                    $("#ObservationsByInvestigatorDetails_Table tbody").append(TRCode);

                    TRCode = "";
                    var EmerLines = Res["EmerLines"];
                    for (i = 0; i < EmerLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='ERAD_" + (i + 1) + "' onclick='EditCMEmergencyLines(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + EmerLines[i]["ACTION_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + EmerLines[i]["DESCRIPTION"] + "</td>";
                        TRCode = TRCode + "<td>" + EmerLines[i]["TARGET_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + EmerLines[i]["ACTUAL_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + EmerLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + EmerLines[i]["ACTION_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    $("#EmergencyResponseActionsDetails_Table tbody").append(TRCode);


                    TRCode = "";
                    var TeamLines = Res["TeamLines"];
                    for (i = 0; i < TeamLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='TL_" + (i + 1) + "' onclick='EditCMTeamLines(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + TeamLines[i]["NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + TeamLines[i]["ROLE"] + "</td>";
                        TRCode = TRCode + "<td>" + TeamLines[i]["TEAM_MEMBERS"] + "</td>";
                        TRCode = TRCode + "<td>" + TeamLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#CMTeamInvolvedDetails_Table tbody").append(TRCode);


                    TRCode = "";
                    var IntermLines = Res["IntermLines"];
                    for (i = 0; i < IntermLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='ICAD_" + (i + 1) + "' onclick='EditCMInterimLines(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + IntermLines[i]["ACTION_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + IntermLines[i]["DESCRIPTION"] + "</td>";
                        TRCode = TRCode + "<td>" + IntermLines[i]["TARGET_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + IntermLines[i]["ACTUAL_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + IntermLines[i]["RELATED_TO"] + "</td>";
                        TRCode = TRCode + "<td>" + IntermLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + IntermLines[i]["ACTION_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    $("#CMInterimContainmentActionsDetails_Table tbody").append(TRCode);


                    TRCode = "";
                    var RootLines = Res["RootLines"];
                    for (i = 0; i < RootLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='RCEPD_" + (i + 1) + "' onclick='EditCMRootCauseLines(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + RootLines[i]["CAUSE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + RootLines[i]["DESCRIPTION"] + "</td>";
                        TRCode = TRCode + "<td>" + RootLines[i]["FINDINGS"] + "</td>";
                        TRCode = TRCode + "<td>" + RootLines[i]["RELATED_TO_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + RootLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + RootLines[i]["CAUSE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + RootLines[i]["RELATED_TO_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    $("#CMRootCauseEscapePointDetails_Table tbody").append(TRCode);


                    TRCode = "";
                    var ChoosenLines = Res["ChoosenLines"];
                    for (i = 0; i < ChoosenLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='CPCAD_" + (i + 1) + "' onclick='EditChoosenLine(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + ChoosenLines[i]["ACTION_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + ChoosenLines[i]["DESCRIPTION"] + "</td>";
                        TRCode = TRCode + "<td>" + ChoosenLines[i]["TARGET_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + ChoosenLines[i]["ACTUAL_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + ChoosenLines[i]["RELATED_TO"] + "</td>";
                        TRCode = TRCode + "<td>" + ChoosenLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + ChoosenLines[i]["ACTION_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    $("#CMChosenPermanentCorrectiveActionDetails_Table tbody").append(TRCode);


                    TRCode = "";
                    var ImplementedLines = Res["ImplementedLines"];
                    for (i = 0; i < ImplementedLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='ICAD_" + (i + 1) + "' onclick='EditCorrectiveActionDetails(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + ImplementedLines[i]["ACTION_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + ImplementedLines[i]["DESCRIPTION"] + "</td>";
                        TRCode = TRCode + "<td>" + ImplementedLines[i]["TARGET_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + ImplementedLines[i]["ACTUAL_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + ImplementedLines[i]["RELATED_TO"] + "</td>";
                        TRCode = TRCode + "<td>" + ImplementedLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + ImplementedLines[i]["ACTION_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    $("#CMImplementedCorrectiveActionDetails_Table tbody").append(TRCode);


                    TRCode = "";
                    var VerificationLines = Res["VerificationLines"];
                    for (i = 0; i < VerificationLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='VCA_" + (i + 1) + "' onclick='EditCorrectiveActionsDetails(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + VerificationLines[i]["IMPLEMENT_LINE_ID"] + "</td>";
                        TRCode = TRCode + "<td>" + VerificationLines[i]["ActionName"] + "</td>";
                        TRCode = TRCode + "<td>" + VerificationLines[i]["VALIDATION"] + "</td>";
                        TRCode = TRCode + "<td>" + VerificationLines[i]["EFFECTIVE_PERCENT"] + "</td>";
                        TRCode = TRCode + "<td>" + VerificationLines[i]["TARGET_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + VerificationLines[i]["ACTUAL_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + VerificationLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + VerificationLines[i]["ActionCode"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    $("#CMVerificationofCorrectiveActionsDetails_Table tbody").append(TRCode);

                    TRCode = "";
                    var PreventiveLines = Res["PreventiveLines"];
                    for (i = 0; i < PreventiveLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='PAD_" + (i + 1) + "' onclick='EditCMPreventiveLinesData(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + PreventiveLines[i]["ActionName"] + "</td>";
                        TRCode = TRCode + "<td>" + PreventiveLines[i]["Description"] + "</td>";
                        TRCode = TRCode + "<td>" + PreventiveLines[i]["Name"] + "</td>";
                        TRCode = TRCode + "<td>" + PreventiveLines[i]["TARGET_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + PreventiveLines[i]["ACTUAL_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + PreventiveLines[i]["RelatedTo"] + "</td>";
                        TRCode = TRCode + "<td>" + PreventiveLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + PreventiveLines[i]["ActionCode"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }
                    $("#CMPreventiveActionsDetails_Table tbody").append(TRCode);

                    TRCode = "";
                    var VeriPreventiveLines = Res["VeriPreventiveLines"];
                    for (i = 0; i < VeriPreventiveLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='VPA_" + (i + 1) + "' onclick='EditVerificationPreventiveLinesData(this.id)'>";
                        TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + VeriPreventiveLines[i]["PreventiveLineId"] + "</td>";
                        TRCode = TRCode + "<td>" + VeriPreventiveLines[i]["ActionName"] + "</td>";
                        TRCode = TRCode + "<td>" + VeriPreventiveLines[i]["Validation"] + "</td>";
                        TRCode = TRCode + "<td>" + VeriPreventiveLines[i]["EffectivePercent"] + "</td>";
                        TRCode = TRCode + "<td>" + VeriPreventiveLines[i]["TARGET_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + VeriPreventiveLines[i]["ACTUAL_DATE"] + "</td>";
                        TRCode = TRCode + "<td>" + VeriPreventiveLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display: none;'>" + VeriPreventiveLines[i]["ActionCode"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#CMVerificationofPreventiveActionsDetails_Table tbody").append(TRCode);


                    $("#txtCorrectiveMeasureId").val(Identity);
                    HideLoader();
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                HideLoader();
            }
        });

    }
    catch (e) {
        alert(e);
    }

}

function SaveCorrectiveMeasureData(SaveType) {

    if (confirm("Do you want to Save data?")) {
    }
    else {
        return;
    }

    var InvestigationNumber = $("#txtInvestigationNum").val();

    var TrackingNo = $("#txtComplaintTrackingNo").val();

    if (InvestigationNumber == "") {
        alert("Invalid Investigation Number");
        return;
    }

    if (TrackingNo == "") {
        alert("Invalid Tracking Number");
        return;
    }

    var Flag = 0;

    var CMId = $("#txtCorrectiveMeasureId").val();
    var CMSeriesCode = $("#txtCMSeriesCode").val();
    var CorrectiveMeasureDate = $("#txtCorrectiveMeasureDate").val();
    var CMDocStatus = $("#txtCMDocStatus").val();
    var ApprovedDate = $("#txtApprovedDate").val();
    var CorrectiveMeasureStatus = $("#txtCorrectiveMeasureStatus").val();
    var NoticeType = $("#txtNoticeType").val();

    var InvestigationNum = $("#txtInvestigationNum").val();
    var PlantName = $("#txtPlant").val();
    var PlantCode = $("#txtPlantCode").val();

    var ComplaintTrackingNo = $("#txtComplaintTrackingNo").val();
    var CustomerCode = $("#txtCustomerCode").val();
    var CustomerName = $("#txtCustomerName").val();
    var Location = $("#txtLocation").val();
    var ComplaintDesc = $("#txtComplaintDesc").val();

    var ComplaintRegisteredDate = $("#txtComplaintRegisteredDate").val();
    var InvestigationDate = $("#txtInvestigationDate").val();
    var InvestigationDoneByCode = $("#txtInvestigationDoneByCode").val();
    var InvestigationDoneByName = $("#txtInvestigationDoneBy").val();

    var ProductTypeCode = $("#txtProductTypeCode").val();
    var ProductTypeName = $("#txtProductType").val();

    var ProductCategoryCode = $("#txtProductCategoryCode").val();
    var ProductCategoryName = $("#txtProductCategory").val();

    var ComplaintTypeCode = $("#txtComplaintTypeCode").val();
    var ComplaintTypeName = $("#txtComplaintType").val();

    var ComplaintCategoryCode = $("#txtComplaintCategoryCode").val();
    var ComplaintCategoryName = $("#txtComplaintCategory").val();

    var IssueCommunicationNote = $("#chbIssueCommunicationNote").val();
    var CommunicationNoteID = $("#txtCommunicationNoteID").val();
    var NoticeIssuedDate = $("#txtNoticeIssuedDate").val();
    var NoticeRemAdditional = $("#txtNoticeRemAdditional").val();

    var ProductName = $("#txtProduct_Name").val();
    var ProductCode = $("#txtProduct_Code").val();

    var DefectCode = $("#txtDefectCode").val();
    var DefectName = $("#txtDefectName").val();

    var BatchNo = $("#txtBatchNo").val();
    var InvoiceNo = $("#txtInvoiceNo").val();
    var InvoiceDate = $("#txtInvoiceDate").val();
    var NoOfDefectiveSheets = $("#txtNoOfDefectiveSheets").val();

    var Symptoms = $("#txtSymptoms").val();
    var ProblemDescription = $("#txtProblemDescription").val();
    var ProblemImpact = $("#txtProblemImpact").val();
    var Conclusion = $("#txtConclusion").val();

    var CreatedBy = $("#USERCODE_CorrectiveMeasure").val();

    var RowId = "";

    var ObservationsByInvestigator = new Array();
    $("#ObservationsByInvestigatorDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        ObservationsByInvestigator.push({
            SlNo: $("#ObservationsByInvestigatorDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            ObservationName: $("#ObservationsByInvestigatorDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            ObservationCode: $("#ObservationsByInvestigatorDetails_Table tbody #" + RowId + " td")[2].innerHTML
        });
    });

    var EmergencyResponseActions = new Array();
    $("#EmergencyResponseActionsDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        EmergencyResponseActions.push({
            SlNo: $("#EmergencyResponseActionsDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            ActionName: $("#EmergencyResponseActionsDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            Description: $("#EmergencyResponseActionsDetails_Table tbody #" + RowId + " td")[2].innerHTML,

            TargetDate: $("#EmergencyResponseActionsDetails_Table tbody #" + RowId + " td")[3].innerHTML,
            ActualDate: $("#EmergencyResponseActionsDetails_Table tbody #" + RowId + " td")[4].innerHTML,
            Remarks: $("#EmergencyResponseActionsDetails_Table tbody #" + RowId + " td")[5].innerHTML,

            ActionCode: $("#EmergencyResponseActionsDetails_Table tbody #" + RowId + " td")[6].innerHTML
        });
    });

    var TeamInvolved = new Array();
    $("#CMTeamInvolvedDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        TeamInvolved.push({
            SlNo: $("#CMTeamInvolvedDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            Name: $("#CMTeamInvolvedDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            Role: $("#CMTeamInvolvedDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            TeamMember: $("#CMTeamInvolvedDetails_Table tbody #" + RowId + " td")[3].innerHTML,
            Remarks: $("#CMTeamInvolvedDetails_Table tbody #" + RowId + " td")[4].innerHTML
        });
    });

    var InterimContainmentActions = new Array();
    $("#CMInterimContainmentActionsDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        InterimContainmentActions.push({

            SlNo: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            ActionName: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            Description: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            TargetDate: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[3].innerHTML,

            ActualDate: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[4].innerHTML,
            RelatedTo: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[5].innerHTML,
            Remarks: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[6].innerHTML,
            ActionCode: $("#CMInterimContainmentActionsDetails_Table tbody #" + RowId + " td")[7].innerHTML

        });
    });

    var RootCausesEscapePoint = new Array();
    $("#CMRootCauseEscapePointDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        RootCausesEscapePoint.push({

            SlNo: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            CauseName: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            Description: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            Findings: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[3].innerHTML,

            RelatedToName: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[4].innerHTML,
            Remarks: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[5].innerHTML,
            CauseCode: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[6].innerHTML,
            RelatedToCode: $("#CMRootCauseEscapePointDetails_Table tbody #" + RowId + " td")[7].innerHTML

        });
    });

    var ChosenPermanentCorrectiveAction = new Array();
    $("#CMChosenPermanentCorrectiveActionDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        ChosenPermanentCorrectiveAction.push({

            SlNo: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            ActioName: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            Description: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            TargetDate: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[3].innerHTML,

            ActualDate: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[4].innerHTML,
            RelatedTo: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[5].innerHTML,
            Remarks: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[6].innerHTML,
            ActionCode: $("#CMChosenPermanentCorrectiveActionDetails_Table tbody #" + RowId + " td")[7].innerHTML

        });
    });

    var ImplementedCorrectiveActionDetails = new Array();
    $("#CMImplementedCorrectiveActionDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        ImplementedCorrectiveActionDetails.push({

            SlNo: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            ActioName: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            Description: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            TargetDate: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[3].innerHTML,

            ActualDate: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[4].innerHTML,
            RelatedTo: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[5].innerHTML,
            Remarks: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[6].innerHTML,
            ActionCode: $("#CMImplementedCorrectiveActionDetails_Table tbody #" + RowId + " td")[7].innerHTML

        });
    });

    var VerificationCorrectiveActions = new Array();
    $("#CMVerificationofCorrectiveActionsDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        VerificationCorrectiveActions.push({

            SlNo: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            ImplementLineId: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            ActioName: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            Validation: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[3].innerHTML,

            EffectivePercent: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[4].innerHTML,
            TargetDate: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[5].innerHTML,
            ActualDate: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[6].innerHTML,
            Remarks: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[7].innerHTML,

            ActionCode: $("#CMVerificationofCorrectiveActionsDetails_Table tbody #" + RowId + " td")[8].innerHTML

        });
    });

    var PreventiveActionsDetails = new Array();
    $("#CMPreventiveActionsDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        PreventiveActionsDetails.push({

            SlNo: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            ActionName: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            Description: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            Name: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[3].innerHTML,

            TargetDate: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[4].innerHTML,
            ActualDate: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[5].innerHTML,
            RelatedTo: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[6].innerHTML,
            Remarks: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[7].innerHTML,

            ActionCode: $("#CMPreventiveActionsDetails_Table tbody #" + RowId + " td")[8].innerHTML

        });
    });

    var VerificationPreventiveActionsDetails = new Array();
    $("#CMVerificationofPreventiveActionsDetails_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        VerificationPreventiveActionsDetails.push({

            SlNo: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[0].innerHTML,
            PreventiveLineId: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[1].innerHTML,
            ActionName: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[2].innerHTML,
            Validation: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[3].innerHTML,
            EffectivePercent: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[4].innerHTML,

            TargetDate: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[5].innerHTML,
            ActualDate: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[6].innerHTML,
            Remarks: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[7].innerHTML,
            ActionCode: $("#CMVerificationofPreventiveActionsDetails_Table tbody #" + RowId + " td")[8].innerHTML

        });
    });

    var CorrectiveMeasureData = JSON.stringify({
        CMId: CMId,
        CMSeriesCode: CMSeriesCode,
        CorrectiveMeasureDate: CorrectiveMeasureDate,
        CMDocStatus: CMDocStatus,
        ApprovedDate: ApprovedDate,
        CorrectiveMeasureStatus: CorrectiveMeasureStatus,
        NoticeType: NoticeType,

        InvestigationNum: InvestigationNum,
        PlantName: PlantName,
        PlantCode: PlantCode,

        ComplaintTrackingNo: ComplaintTrackingNo,
        CustomerCode: CustomerCode,
        CustomerName: CustomerName,
        Location: Location,
        ComplaintDesc: ComplaintDesc,

        ComplaintRegisteredDate: ComplaintRegisteredDate,
        InvestigationDate: InvestigationDate,
        InvestigationDoneByCode: InvestigationDoneByCode,
        InvestigationDoneByName: InvestigationDoneByName,

        ProductTypeCode: ProductTypeCode,
        ProductTypeName: ProductTypeName,

        ProductCategoryCode: ProductCategoryCode,
        ProductCategoryName: ProductCategoryName,

        ComplaintTypeCode: ComplaintTypeCode,
        ComplaintTypeName: ComplaintTypeName,

        ComplaintCategoryCode: ComplaintCategoryCode,
        ComplaintCategoryName: ComplaintCategoryName,

        IssueCommunicationNote: IssueCommunicationNote,
        CommunicationNoteID: CommunicationNoteID,
        NoticeIssuedDate: NoticeIssuedDate,
        NoticeRemAdditional: NoticeRemAdditional,

        ProductName: ProductName,
        ProductCode: ProductCode,

        DefectCode: DefectCode,
        DefectName: DefectName,

        BatchNo: BatchNo,
        InvoiceNo: InvoiceNo,
        InvoiceDate: InvoiceDate,
        NoOfDefectiveSheets: NoOfDefectiveSheets,

        Symptoms: Symptoms,
        ProblemDescription: ProblemDescription,
        ProblemImpact: ProblemImpact,
        Conclusion: Conclusion,
        CreatedBy: CreatedBy,

        ObservationsByInvestigator: ObservationsByInvestigator,
        EmergencyResponseActions: EmergencyResponseActions,
        TeamInvolved: TeamInvolved,
        InterimContainmentActions: InterimContainmentActions,
        RootCausesEscapePoint: RootCausesEscapePoint,
        ChosenPermanentCorrectiveAction: ChosenPermanentCorrectiveAction,
        ImplementedCorrectiveActionDetails: ImplementedCorrectiveActionDetails,
        VerificationCorrectiveActions: VerificationCorrectiveActions,
        PreventiveActionsDetails: PreventiveActionsDetails,
        VerificationPreventiveActionsDetails: VerificationPreventiveActionsDetails

    });


    $.ajax({
        type: 'POST',
        url: '../../ComplaintRegistration/SaveCorrectiveMeasure',
        async: true,
        data: { CorrectiveMeasureData: CorrectiveMeasureData },
        success: function (Resp) {

            if (Resp == "") {
                alert("Error Occured.Please try again");
            }
            else if (Resp == "TRUE") {
                if (SaveType == "Button") {
                    alert("Successfully Updated the Data");
                }
                else {
                }
            }
            else if (isNaN(Resp)) {
                alert("Error Occured.Please try again");
            }
            else {
                if (SaveType == "Button") {
                    alert("Successfully Updated the Data");
                }
                else {
                }
                $("#txtCorrectiveMeasureId").val(Resp);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Error : SaveCorrectiveMeasure : " + xhr);
        }
    });

}

function GetTopDataToBottom(Source, Destination) {

    try {



        var FormId = $("#txtCorrectiveMeasureId").val();

        if (FormId == "") {
            return;
        }


        var IPData = JSON.stringify({
            Source: Source,
            Destination: Destination,
            FormId: FormId
        });

        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistration/GetTopDataToBottom',
            data: { IPData: IPData },
            async: true,
            success: function (Response) {

                if (Response == "") {
                    alert("No Data Found");
                }
                else {
                    Response = JSON.parse(Response);
                    var TableData = "";

                    $("#GhostPopUpInput").val(Source + Destination);
                    $("#GhostTable").empty();

                    TableData = TableData + "<thead><tr><td>Line Id</td><td>Action Code</td><td>Action Name</td></tr></thead><tbody>";

                    for (var i = 0; i < Response.length; i++) {
                        TableData = TableData + "<tr id='Ghost_" + i + "' onclick='SendDataToBottom(this.id)' >";
                        TableData = TableData + "<td>" + Response[i]["LINE_ID"] + "</td>";
                        TableData = TableData + "<td>" + Response[i]["ACTION_CODE"] + "</td>";
                        TableData = TableData + "<td>" + Response[i]["ACTION_NAME"] + "</td>";
                        TableData = TableData + "</tr>";
                    }

                    TableData = TableData + "</tbody>";

                    $("#GhostTable").append(TableData);

                    $("#GhostTable").dataTable({
                        "bDestroy": true,
                        'scroll': true,
                        "paging": false,
                        "ordering": false,
                        "info": false
                    });

                    $("#GhostPopUp").modal('show');

                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });

    }
    catch (e) {
        alert("Error : GetTopDataToBottom  : " + e);
    }

}

function SendDataToBottom(Identity) {

    if ($("#GhostPopUpInput").val() == "CPCAICAD") {
        $("#txtCMImplementLinesChosenLineID").val($("#GhostTable tbody #" + Identity + " td")[0].innerHTML);
        $("#txtCMImplementLinesActionCode").val($("#GhostTable tbody #" + Identity + " td")[1].innerHTML);
        $("#txtCMImplementLinesActionName").val($("#GhostTable tbody #" + Identity + " td")[2].innerHTML);
    }
    if ($("#GhostPopUpInput").val() == "ICADVCA") {
        $("#txtCMVerificationImplementedLineId").val($("#GhostTable tbody #" + Identity + " td")[0].innerHTML);
        $("#txtCMVerificationLinesImplimentedActionCode").val($("#GhostTable tbody #" + Identity + " td")[1].innerHTML);
        $("#txtCMVerificationLinesImplimentedActionName").val($("#GhostTable tbody #" + Identity + " td")[2].innerHTML);
    }
    if ($("#GhostPopUpInput").val() == "PADVPA") {

        $("#txtCMPreventiveVerificationLinesPreventiveActionLineId").val($("#GhostTable tbody #" + Identity + " td")[0].innerHTML);
        $("#txtCMPreventiveVerificationLinesPreventiveActionCode").val($("#GhostTable tbody #" + Identity + " td")[1].innerHTML);
        $("#txtCMPreventiveVerificationLinesPreventiveActionName").val($("#GhostTable tbody #" + Identity + " td")[2].innerHTML);

    }


    $("#GhostPopUp").modal('hide');

}



// Corrective measures List page Controller
DIMS.controller('CorrectiveMeasureListCtrl', function ($scope, $location, DIMSFactory, $compile) {
    $('#undo_redo_to').empty();
    CorrectiveMeasureListScope = $scope;
    $scope.CorrectMeasureList = [];
    $scope.UserCode = $("#USERCODE_CorrectiveMeasureList").val();

    $scope.go = function (path) {

        $location.path(path);
    };


    angular.element(document).ready(function () {

        var UserType = $("#USERollCODE_CorrectiveMeasureList").val();
        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: UserType, FormCode: 'CORM' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#AddCORM").css('display', 'none');
                    $("#CORM_List").css('display', 'none');
                    $("#StateFilter").css('display', 'none');
                }
                else {

                    AccessData = JSON.parse(AccessData);
                    IsView_CORM = AccessData[0]["IS_VIEW"];
                    IsAdd_CORM = AccessData[0]["IS_ADD"];
                    IsUpdate_CORM = AccessData[0]["IS_UPDATE"];
                    IsApprove_CORM = AccessData[0]["IS_APPROVE"];
                    if (AccessData[0]["IS_VIEW"] == true) {
                        //$("#CMS_Comp_List_Menu").css('display', 'block');
                        $('#CORM_List').css('display', 'block');
                    }
                    else {
                        //  $("#CMS_Comp_List_Menu").css('display', 'none');
                        $('#CORM_List').css('display', 'none');
                        $("#StateFilter").css('display', 'none');
                    }

                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#AddCORM").css('display', 'block');
                    }
                    else {
                        $("#AddCORM").css('display', 'none');
                        $("#StateFilter").css('display', 'none');
                    }
                }
                $.ajax({
                    type: 'POST',
                    url: '../../ComplaintRegistration/FillCMSStateFilter',
                    async: true,
                    success: function (response) {
                        $("#StateFilter").empty();
                        if (response == "") {

                        }
                        else {
                            response = JSON.parse(response);
                            for (var i = 0; i < response.length; i++) {
                                var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                                $("#StateFilter").append(option);
                            }
                            var CMSState = $("#CMSState").val();
                            if (CMSState == "ALL")
                                CMSState = "01";
                            if (CMSState == "") {
                                $("#StateFilter").val(response[0]["STATE_CODE"]);
                                $("#CMSState").val(response[0]["STATE_CODE"]);
                            }
                            else {
                                $("#StateFilter").val(CMSState);
                            }
                            var StateFilter = $("#StateFilter").val();
                            var WhereClause = " WHERE CM.STATE='" + StateFilter + "' ORDER BY CORR.ID DESC";
                            WhereClause = "";

                            var UserRole = $("#USERollCODE_CorrectiveMeasureList").val();

                            if (UserRole == "QAM_PL") {

                                var UserCode = $("#USERCODE_CorrectiveMeasureList").val();
                                
                                var SpecialUsers = new Array();
                                SpecialUsers.push("2013");
                                SpecialUsers.push("2010");
                                SpecialUsers.push("2022");
                                SpecialUsers.push("2008");
                                SpecialUsers.push("2021");
                                SpecialUsers.push("2006");
                                SpecialUsers.push("2002");
                                SpecialUsers.push("2017");
                                SpecialUsers.push("2019");
                                SpecialUsers.push("2018");

                                var PlantCode = "";

                                if (UserType == "QAM_PL") {
                                    if (SpecialUsers.indexOf(UserCode) > -1) {
                                        PlantCode = UserCode;
                                    }
                                    else {

                                        $.ajax({
                                            type: 'POST',
                                            url: '../../ComplaintRegistration/GetPlantCodeForUserQAMPL',
                                            data: { UserCode: UserCode },
                                            async: false,
                                            success: function (response) {
                                                PlantCode = response;
                                            },
                                            error: function (xhr, ajaxOptions, thrownError) {
                                            }
                                        });
                                    }
                                }
                                WhereClause = "WHERE CORR.PLANT_CODE='"+ PlantCode +"' ORDER BY ID DESC";
                            }
                            else {

                            }


                            var Data = JSON.stringify({
                                MasterType: "CorrectiveMeasureList",
                                ID: $scope.UserCode,
                                UserCode: $scope.UserCode,
                                "Type": "Get",
                                ReportName: "CorrectiveMeasure",
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

                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "CorrectiveMeasureList", UserSelectedColumnName);
                                    $('#CorrectiveMeasureList tbody').on('click', 'tr', function () {
                                        var ID = $(this).find('td:eq(0)').text();
                                        if ($(this).hasClass('selected')) {
                                            $(this).removeClass('selected');

                                        }
                                        else {
                                            CorrectiveMeasureListTable.$('tr.selected').removeClass('selected');
                                            $(this).addClass('selected');
                                        }
                                        if (ID != "") {
                                            if (IsView_CORM == true || IsUpdate_CORM == true) {
                                                var scope = angular.element($("#CorrectivelistDiv")).scope();
                                                scope.$apply(function () {
                                                    scope.go("CorrectiveMeasure/" + ID);
                                                })
                                            }
                                        }

                                    });
                                });
                            });

                            //
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                    }
                });
            }
        });
    });

    $scope.StateChange = function () {
        try {
            var StateFilter = $("#StateFilter").val();
            $("#CMSState").val(StateFilter);
            //SetCMSStateFilter(StateFilter);
            var WhereClause = " WHERE CM.STATE='" + StateFilter + "' ORDER BY CORR.ID DESC";
            //var WhereClause = "";
            var Data = JSON.stringify({
                MasterType: "CorrectiveMeasureList",
                ID: $scope.UserCode,
                UserCode: $scope.UserCode,
                "Type": "Get",
                ReportName: "CorrectiveMeasure",
                WhereClause: WhereClause
            });
            //cHAN
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

                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "CorrectiveMeasureList", UserSelectedColumnName);
                    $('#CorrectiveMeasureList tbody').on('click', 'tr', function () {
                        var ID = $(this).find('td:eq(0)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');

                        }
                        else {
                            CorrectiveMeasureListTable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                        if (ID != "") {
                            var scope = angular.element($("#CorrectivelistDiv")).scope();
                            scope.$apply(function () {
                                scope.go("CorrectiveMeasure/" + ID);
                            })
                        }

                    });
                });
            });

            //
        }
        catch (e) {
            alert("Error :CompensationListCtrl : " + e);
        }
    }

    // Open popup for columns selection
    $scope.OpenColumnEditing = function () {

        $('#undo_redo').empty();

        var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

        for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
            $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
        }


        //   $('#undo_redo').refresh();

        $('#undo_redo').multiselect();

        if (ControllerName != "CorrectiveMeasureListCtrl") { // controller name

            ControllerName = "CorrectiveMeasureListCtrl"; // controller name
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "CorrectiveMeasureListCtrl");
            //CorrectiveMeasureListScope.$apply(function () {
            //    // var content = $compile(elem)(CorrectiveMeasureListScope);
            //});
            $compile(elem.contents())(CorrectiveMeasureListScope);
        }

        $("#ColumnEditingModal").modal('show');




    }

    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing = function () {

        DIMSFactory.ViewColumnEditing("CorrectiveMeasure", $scope.UserCode, " ORDER BY ID DESC"); // 1 parameter-report name, 2-parameter user code  3-parameter where condition
    }

    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var WhereClause = " ORDER BY ID DESC";
        var Data = JSON.stringify({
            MasterType: "CorrectiveMeasureList",
            ID: $scope.UserCode,
            UserCode: $scope.UserCode,
            ReportName: "CorrectiveMeasure",
            "Type": "Get",
            WhereClause: ""
        });

        //DIMSFactory.SaveColumnEditingData("CorrectiveMeasure", $scope.UserCode, " ORDER BY ID DESC");  // 1 parameter-report name, 2-parameter user code  3-parameter where condition
        DIMSFactory.SaveColumnEditingData_InputParameter("CorrectiveMeasure", $scope.UserCode, WhereClause, Data, "CorrectiveMeasureList");
    }
});
