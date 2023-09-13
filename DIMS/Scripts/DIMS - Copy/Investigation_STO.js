var InvestigationScope;



//Investigation_STO Controller
DIMS.controller('InvestigationCtrl_STO', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    InvestigationScope = $scope;
    $scope.SITEDETAIL_CODEs = $("#SITEDETAIL_CODE").val();
    $scope.templatesettings = { HeaderTitle: "InvestigationCtrl_STO" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    angular.element(document).ready(function () {

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_STO").val(), FormCode: 'INVST_STO' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#InvestigationNewView").css('display', 'none');
                    $("#PendingApprovalsList").css('display', 'none');
                    $("#InvList").css('display', 'none');
                    $("#CompInvSave").css('display', 'none');
                    $("#InvNew").css('display', 'none');
                    $("#SendInvestigationApproval").css('display', 'none');
                    $("#MakeApproved_STO").css('display', 'none');
                    $("#FROM_PLANT_CODE").css('display', 'none');                    
                }
                else {

                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#InvList").css('display', 'block');
                    }
                    else {
                        $("#InvList").css('display', 'none');
                        $("#FROM_PLANT_CODE").css('display', 'none');
                    }


                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#InvestigationNewView").css('display', 'block');
                    }
                    else {
                        $("#InvestigationNewView").css('display', 'none');
                        $("#FROM_PLANT_CODE").css('display', 'none');
                    }

                }

            }
        });

        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationSTO/FillCMSPlantFilter',
            async: true,
            success: function (response) {
                $("#FROM_PLANT_CODE").empty();
                if (response == "") {

                } else {
                    response = JSON.parse(response);
                    for (var i = 0; i < response.length; i++) {
                        var option = $('<option></option>').attr("value", response[i]["FROM_PLANT_CODE"]).text(response[i]["FROM_PLANT_NAME"]);
                        $("#FROM_PLANT_CODE").append(option);
                    }

                    var CMSPlant = $("#CMSPlant").val();
                    if (CMSPlant == "ALL")
                        CMSPlant = response[0]["FROM_PLANT_CODE"];
                    if (CMSPlant == "" || typeof CMSPlant == "undefined") {
                        $("#FROM_PLANT_CODE").val(response[0]["FROM_PLANT_CODE"]);
                        $("#CMSPlant").val(response[0]["FROM_PLANT_CODE"]);
                    } else {
                        $("#FROM_PLANT_CODE").val(CMSPlant);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });        

        if ($routeParams.ID == undefined || $routeParams.ID == "") {
            $("#FormIdentity_STO").val("").trigger('change');
        }
        else {
            $("#FormIdentity_STO").val($routeParams.ID).trigger('change');
        }

        try {
            $scope.DOC_SERIES_CODE = "INVSZ12";
            var FormIdentity_STO = $("#FormIdentity_STO").val();

            if (FormIdentity_STO == "" || FormIdentity_STO == null || FormIdentity_STO == undefined) {
                
                $("#SendInvestigationApproval").css('display', 'none');
                $("#InvNew").css('display', 'none');

                $("#MakeApproved_STO").css('display', 'none');                
                $(".DelayGroup").hide();
                $(".DelayGroupDummy").show();
                $("#DELAY_DAYS").val("");
                $("#DELAY_REASON").val("");

                $scope.INVESTIGATOR_TYPE_NAME = $("#SessionUserType_STO").val();
                $scope.INVESTIGATOR_TYPE_CODE = $("#SessionUserTypeID_STO").val();


                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;


                $scope.INVESTIGATION_DATE = today;
                $("#INVESTIGATION_DATE").datepicker("setDate", TodayDateTime);


                $scope.INVESTIGATION_STATUS = "DRAFT";
                $("#INVESTIGATION_STATUS").val($scope.INVESTIGATION_STATUS).trigger('change');
                $scope.SHOW_STATUS = "Under Investigation";

                $scope.INVESTIGATION_DONE_BY_NAME = $("#CREATED_BY").val();
                $scope.INVESTIGATION_DONE_BY_CODE = $("#CreatedByCode").val();

            }
            else {
                $("#MakeApproved_STO").css('display', 'none');                

                ShowLoader();
                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationSTO/GetInvestigationForEdit',
                    async: false,
                    data: { Identity: FormIdentity_STO },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") {
                    }
                    else {

                        var Data = JSON.parse(response.data);
                        var HeaderData = Data["Header"];

                        $("#INVESTIGATION_ID").val(FormIdentity_STO);
                        $scope.COMPLAINT_NUMBER = HeaderData[0]["COMPLAINT_NUMBER"];

                        $scope.COMPLAINT_TRACKING_NO = HeaderData[0]["COMPLAINT_TRACKING_NO"];

                        $scope.COMPLAINT_RECEIVED_DATE = (HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#COMPLAINT_RECEIVED_DATE").datepicker("setDate", (HeaderData[0]["COMPLAINT_RECEIVED_DATE"]));

                        $scope.COMPLAINT_REGISTERED_DATE = (HeaderData[0]["COMPLAINT_REGISTERED_DATE"]);
                        $("#COMPLAINT_REGISTERED_DATE").datepicker("setDate", (HeaderData[0]["COMPLAINT_REGISTERED_DATE"]));

                        $scope.COMPLAINT_ATTENDED_DATE = (HeaderData[0]["COMPLAINT_ATTENDED_DATE"]);

                        $("#COMPLAINT_ATTENDED_DATE").datepicker("setDate", (HeaderData[0]["COMPLAINT_ATTENDED_DATE"]));
                        $("#COMPLAINT_ATTENDED_DATE").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#VISITED_DATE").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#INVESTIGATION_DATE").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);


                        $scope.DELAY_DAYS = HeaderData[0]["DELAY_DAYS"];
                        $scope.DELAY_REASON = HeaderData[0]["DELAY_REASON"];

                        if (HeaderData[0]["DELAY_CHECK"] == "True") {
                            $("#DELAY").prop('checked', true);
                            $(".DelayGroup").show();
                            $(".DelayGroupDummy").hide();
                        }
                        else {
                            $(".DelayGroup").hide();
                            $(".DelayGroupDummy").show();
                        }

                        if (HeaderData[0]["NOTICE_TYPE"] == "System") {
                            $("#System").prop('checked', true);
                        }
                        else if (HeaderData[0]["NOTICE_TYPE"] == "Manual") {
                            $("#Manual").prop('checked', true);
                        }


                        $scope.INVOICE_DETAILS = HeaderData[0]["INVOICE_DETAILS"];
                        $scope.PRODUCT_DETAILS = HeaderData[0]["PRODUCT_DETAILS"];

                        $scope.INVESTIGATOR_TYPE_NAME = HeaderData[0]["INVESTIGATOR_TYPE_NAME"];
                        $scope.INVESTIGATOR_TYPE_CODE = HeaderData[0]["INVESTIGATOR_TYPE_CODE"];

                        $scope.INVESTIGATION_DONE_BY_NAME = HeaderData[0]["INVESTIGATION_DONE_BY_NAME"];
                        $scope.INVESTIGATION_DONE_BY_CODE = HeaderData[0]["INVESTIGATION_DONE_BY_CODE"];

                        $scope.VISITED_DATE = (HeaderData[0]["VISITED_DATE"]);
                        $("#VISITED_DATE").datepicker("setDate", HeaderData[0]["VISITED_DATE"]);


                        $scope.PREVIOUS_VISITED_DATE = (HeaderData[0]["PREVIOUS_VISITED_DATE"]);
                        $("#PREVIOUS_VISITED_DATE").datepicker("setDate", HeaderData[0]["PREVIOUS_VISITED_DATE"]);

                        $scope.PLANT_MHD_CODE = HeaderData[0]["PLANT_MHD_CODE"];
                        $scope.PLANT_MHD_NAME = HeaderData[0]["PLANT_MHD_NAME"];

                        $scope.INVESTIGATION_ID = HeaderData[0]["ID"];
                        $scope.DOC_SERIES_CODE = HeaderData[0]["DOC_SERIES_CODE"];

                        if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                            $scope.DOC_SERIES_CODE = "INVSZ12";
                        }

                        $scope.INVESTIGATION_DATE = (HeaderData[0]["INVESTIGATION_DATE"]);
                        $("#INVESTIGATION_DATE").datepicker("setDate", HeaderData[0]["INVESTIGATION_DATE"]);


                        $scope.INVESTIGATION_STATUS = HeaderData[0]["INVESTIGATION_STATUS"];
                        $scope.SHOW_STATUS = HeaderData[0]["SHOW_STATUS"];

                        $scope.APPROVED_DATE = (HeaderData[0]["APPROVED_DATE"]);
                        $("#SelectedComplaintFiles").append(HeaderData[0]["Complaint_Attachments"]).trigger('change');
                        $("#SelectedFiles").append(HeaderData[0]["ATTACHMENTS"]).trigger('change');
                        $("#INVESTIGATION_STATUS").val($scope.INVESTIGATION_STATUS).trigger('change');
                        $scope.SITEDETAIL_CODE = HeaderData[0]["SITEDETAIL_CODE"];
                        $scope.COMPANYDETAIL_CODE = HeaderData[0]["COMPANYDETAIL_CODE"];

                        $scope.PRODUCT_CATEGORY_CODE = HeaderData[0]["PRODUCT_CATEGORY_CODE"];
                        $scope.PRODUCT_CATEGORY_NAME = HeaderData[0]["PRODUCT_CATEGORY_NAME"];

                        $scope.TO_PLANT_CODE = HeaderData[0]["TO_PLANT_CODE"];
                        $scope.TO_PLANT_NAME = HeaderData[0]["TO_PLANT_NAME"];

                        $scope.COMPLAINT_MODE_CODE = HeaderData[0]["COMPLAINT_MODE_CODE"];
                        $scope.COMPLAINT_MODE_NAME = HeaderData[0]["COMPLAINT_MODE_NAME"];

                        //if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                        //    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                        //}
                        //else {
                        //    $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                        //}

                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                            $("#ObservationByHil").text("Observations by official");
                            $("#Investigation_Compensation_Recommendation").show();
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                                $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            }
                            else {
                                $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                            }
                            $("#ObservationByHil").text("Observations by official");
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                            $("#ObservationByHil").text("Observations by official");
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                            $(".NoticeTypeClass").css("display", "none");

                        }


                        $scope.PRODUCT_TYPE_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"];
                        $scope.PRODUCT_TYPE_NAME = HeaderData[0]["PRODUCT_TYPE_CODE"];                       

                        $scope.END_CUSTOMER_DETAILS = HeaderData[0]["END_CUSTOMER_DETAILS"];

                        if (HeaderData[0]["Project_Party"] == "True") {
                            $("#Is_Project_Party").prop('checked', true);
                        }

                        $scope.SITE_ADDRESS = HeaderData[0]["SITE_ADDRESS"];

                        if (HeaderData[0]["PERIOD_BASED"] == "True") {
                            $("#PERIOD_BASED").prop('checked', true);
                            $("#InvoiceBasedDiv").hide();

                            $("#Invoice_List_Division").css('display', 'none');

                        }
                        else if (HeaderData[0]["INVOICE_BASED"] == "True") {
                            $("#INVOICE_BASED").prop('checked', true);
                            $("#PeriodBasedDiv").hide();
                            $("#PeriodBasedDates").hide();

                            $("#Invoice_List_Division").css('display', 'block');

                        }

                        
                        $scope.OBSERVATIONS_BY_OFFICIAL = HeaderData[0]["OBSERVATIONS_BY_OFFICIAL"];
                        $scope.REMARKS = HeaderData[0]["REMARKS"];


                        $scope.COMPLAINT_REGISTERED_CODE = HeaderData[0]["COMPLAINT_REGISTERED_CODE"];
                        $scope.COMPLAINT_REGISTERED_DOC_SERIES_CODE = HeaderData[0]["COMPLAINT_REGISTERED_DOC_SERIES_CODE"];
                        $scope.COMPLAINT_REGISTERED_DOC_NUM = HeaderData[0]["COMPLAINT_REGISTERED_DOC_NUM"];


                        $scope.COMPLAIN_DESC = HeaderData[0]["COMPLAIN_DESC"];
                        $scope.COMPLAINT_TYPE_CODE = HeaderData[0]["COMPLAINT_TYPE_CODE"];
                        $scope.COMPLAINT_TYPE_NAME = HeaderData[0]["COMPLAINT_TYPE_NAME"];
                        $scope.COMPLAINT_TYPE_ID = HeaderData[0]["COMPLAINT_TYPE_ID"];

                        $scope.COMPLAINT_CATEGORY_CODE = HeaderData[0]["COMPLAINT_CATEGORY_CODE"];
                        $scope.COMPLAINT_CATEGORY_NAME = HeaderData[0]["COMPLAINT_CATEGORY_NAME"];
                        $scope.COMPLAINT_CATEGORY_ID = HeaderData[0]["COMPLAINT_CATEGORY_ID"];


                        $scope.NATURE_OF_COMPLAINT = HeaderData[0]["NATURE_OF_COMPLAINT"];

                        $scope.COMPLAINT_DESC_SALES = HeaderData[0]["COMPLAINT_DESC_SALES"];

                        $scope.OBSERVATION_BY_QAF = HeaderData[0]["OBSERVATION_BY_QAF"];


                        $scope.DATE_SUPPLY_FROM = (HeaderData[0]["DATE_SUPPLY_FROM"]);
                        $("#DATE_SUPPLY_FROM").datepicker("setDate", (HeaderData[0]["DATE_SUPPLY_FROM"]));


                        $scope.DATE_SUPPLY_TO = (HeaderData[0]["DATE_SUPPLY_TO"]);
                        $("#DATE_SUPPLY_TO").datepicker("setDate", HeaderData[0]["DATE_SUPPLY_TO"]);

                        $("#COMPLAINT_CATEGORY_CODE").val(HeaderData[0]["COM_CAT_"]);   
                        
                        /*******************************************************************************************/
                        TRCode = "";
                        var CMS_INV_Supply_Details_SBU3_STO = Data["CMS_INV_Supply_Details_SBU3_STO"];
                        $("#Supply_Details_TableSBU3 tbody").empty();
                        for (var i = 0; i < CMS_INV_Supply_Details_SBU3_STO.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["INVOICE_DATE"] + "</td>";

                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["BATCH_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["SUPPLIED_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["DEFECTED_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["ACTUAL_DEFECTED_NO"] + "</td>";

                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["TRANSPORTER"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Supply_Details_SBU3_STO[i]["REMARKS"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;' >" + CMS_INV_Supply_Details_SBU3_STO[i]["DEFECT_TYPE_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Supply_Details_TableSBU3 tbody").append(TRCode);

                        /************************************************************************************************/
                        TRCode = "";
                        var CMS_INV_Material_Supply_Details_SBU3_STO = Data["CMS_INV_Material_Supply_Details_SBU3_STO"];
                        $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                        for (var i = 0; i < CMS_INV_Material_Supply_Details_SBU3_STO.length; i++) {


                            TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";

                            TRCode = TRCode + "<td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["PLANT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["SUPPLIER_TYPE_NAME"] + "</td>";

                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["SUPPLIER_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["UOM"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["SUPPLIED_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["DEFECTED_NO"] + "</td>";

                            TRCode = TRCode + "<td>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["ACTUAL_DEFECTED_NO"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["PLANT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["SUPPLIER_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + CMS_INV_Material_Supply_Details_SBU3_STO[i]["SUPPLIER_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);

                        var PRODUCT_TYPE_NAME = HeaderData[0]["PRODUCT_TYPE_CODE"]

                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {

                            $("#SupplyDetailsTableSBU3").hide();

                            $("#BreakageInspectionSheetDiv").show();
                            $("#ObservationRemarksDiv").show();
                            $("#SiteObservationSheetDiv").show();

                            $("#ObservationsByOfficialFieldDiv").show();
                            $("#RemarksFieldDiv").show();
                            $("#NatureOfComplaintFieldDiv").hide();
                            $("#ComplaintDescribedBySalesFieldDiv").hide();
                            $("#ComplaintDescriptionFieldDiv").hide();
                            $("#ObservationByQAFFieldDiv").hide();
                            $("#VisitedDateSpanId").show();

                            $("#MatSupDet_BU3").css("display", "none");

                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2" || HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {

                            $("#BreakageInspectionSheetDiv").hide();
                            $("#ObservationRemarksDiv").hide();
                            $("#SiteObservationSheetDiv").hide();


                            if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                                $("#ObservationsByOfficialFieldDiv").hide();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").show();
                                $("#ComplaintDescriptionFieldDiv").show();
                                $("#ObservationByQAFFieldDiv").show();
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU3").css("display", "none");

                                $("#SupplyDetailsTableSBU3").hide();


                            } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36") {
                                $("#ObservationsByOfficialFieldDiv").hide();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").show();
                                $("#ComplaintDescriptionFieldDiv").show();
                                $("#ObservationByQAFFieldDiv").show();
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU3").css("display", "none");

                                $("#SupplyDetailsTableSBU3").hide();


                            }
                            else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                                $("#SupplyDetailsTableSBU3").show();

                                $("#ObservationsByOfficialFieldDiv").show();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").hide();
                                $("#ComplaintDescriptionFieldDiv").hide();
                                $("#ObservationByQAFFieldDiv").hide();
                                $("#VisitedDateSpanId").hide();
                                $("#MatSupDet_BU3").css("display", "block");

                            }
                        }


                        var IS = HeaderData[0]["INVESTIGATION_STATUS"];
                        var MyField = $("#HiddenForCMS").val();

                        if (IS == "DRAFT") {
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_STO").val(), FormCode: 'INV' }) },
                                data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_STO").val(), FormCode: 'INVST_STO' }) },
                                success: function (AccessData) {
                                    if (AccessData == "") {
                                        $("#SendInvestigationApproval").css('display', 'none');
                                        $("#CompInvSave").css('display', 'none');
                                    }
                                    else {
                                        AccessData = JSON.parse(AccessData);
                                        if (AccessData[0]["IS_UPDATE"] == true) {
                                            $("#SendInvestigationApproval").css('display', 'block');
                                            $("#CompInvSave").css('display', 'block');
                                        }
                                        else {
                                            $("#SendInvestigationApproval").css('display', 'none');
                                            $("#CompInvSave").css('display', 'none');

                                        }
                                    }
                                }
                            });

                        }
                        else if (IS == "Approved" || IS == "Rejected") {
                            //alert("No Changes are allowed as the Document Status is " + IS);

                            var UserTypeCode = $("#SessionUserTypeID_STO").val();

                            if ((IS == "Approved") && (UserTypeCode == "CSM" || UserTypeCode == "QH") || UserTypeCode == "CSM_BU2" || UserTypeCode == "CSM_BU3") {

                                $("#CompInvSave").css('display', 'none');
                                $("#SendInvestigationApproval").css('display', 'none');
                                $("#SuperSaveInvestigation").css('display', 'block');

                            }
                            else {
                                $("#ComplaintNumberSpan").css("pointer-events", "none");
                                $("#Investigator_TypeSpan").css("pointer-events", "none");
                                $("#GetInvestigation_Done_BySpan").css("pointer-events", "none");
                                $("#CRSeriesCode").css("pointer-events", "none");
                                $("#BISSizeSapn").css("pointer-events", "none");
                                $("#GetBISDefectTypeMasterSpan").css("pointer-events", "none");
                                $("#GetRecoveryMasterInvSpan").css("pointer-events", "none");



                                $("#BI_Sheet_Add").css('display', 'none');
                                $("#Observation_Remarks_Add").css('display', 'none');
                                $("#Site_Observation_Sheet_Add").css('display', 'none');
                                $("#BI_Sheet_GO").css('display', 'none');
                                $("#Mat_Sup_Det_Add").css('display', 'none');
                                $("#Invoice_List_AddBtn").css('display', 'none');
                                $("#Supply_Details_Add").css('display', 'none');
                                $("#Supply_Details_AddB").css('display', 'none');

                                $("#CompInvSave").css('display', 'none');

                                $("#SendInvestigationApproval").css('display', 'none');
                            }
                        }
                        else if (IS == "Waiting for approval") {
                            if (MyField == "") {

                                $("#ComplaintNumberSpan").css("pointer-events", "none");
                                $("#Investigator_TypeSpan").css("pointer-events", "none");
                                $("#GetInvestigation_Done_BySpan").css("pointer-events", "none");
                                $("#CRSeriesCode").css("pointer-events", "none");
                                $("#BISSizeSapn").css("pointer-events", "none");
                                $("#GetBISDefectTypeMasterSpan").css("pointer-events", "none");
                                $("#GetRecoveryMasterInvSpan").css("pointer-events", "none");

                                $("#BI_Sheet_Add").css('display', 'none');
                                $("#Observation_Remarks_Add").css('display', 'none');
                                $("#Site_Observation_Sheet_Add").css('display', 'none');
                                $("#BI_Sheet_GO").css('display', 'none');
                                $("#Mat_Sup_Det_Add").css('display', 'none');
                                $("#Invoice_List_AddBtn").css('display', 'none');
                                $("#Supply_Details_Add").css('display', 'none');
                                $("#Supply_Details_AddB").css('display', 'none');

                                $("#CompInvSave").css('display', 'none');
                                $("#SendInvestigationApproval").css('display', 'none');

                            }
                            else {


                                $.ajax({
                                    url: '../../Users/GetRightToAccess',
                                    type: 'GET',
                                    //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_STO").val(), FormCode: 'INV' }) },
                                    data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_STO").val(), FormCode: 'INVST_STO' }) },
                                    success: function (AccessData) {
                                        if (AccessData == "") {
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#InvList").css('display', 'none');
                                            $("#CompInvSave").css('display', 'none');
                                            $("#InvNew").css('display', 'none');
                                            $("#SendInvestigationApproval").css('display', 'none');
                                            $("#MakeApproved_STO").css('display', 'none');                                            
                                        }
                                        else {
                                            AccessData = JSON.parse(AccessData);
                                            if (AccessData[0]["IS_APPROVE"] == true) {
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#InvList").css('display', 'none');
                                                $("#CompInvSave").css('display', 'block');
                                                $("#InvNew").css('display', 'none');
                                                $("#SendInvestigationApproval").css('display', 'none');
                                                $("#MakeApproved_STO").css('display', 'block');                                                
                                            }
                                            else {
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#InvList").css('display', 'none');
                                                $("#CompInvSave").css('display', 'none');
                                                $("#InvNew").css('display', 'none');
                                                $("#SendInvestigationApproval").css('display', 'none');
                                                $("#MakeApproved_STO").css('display', 'none');                                                
                                            }
                                        }
                                    }
                                });

                            }
                        }

                        $("#FROM_PLANT_CODE").val(HeaderData[0]["FROM_PLANT_CODE"]);
                        $("#CMSPlant").val(HeaderData[0]["FROM_PLANT_CODE"]);

                        $("#HiddenForCMS").val("");

                        SheetingLabels(HeaderData[0]["PRODUCT_CATEGORY_CODE"]);
                    }

                    HideLoader();
                },
                    function errorCallback(response) {
                        alert("Error : " + response);
                        HideLoader();
                    });
            }
        }
        catch (e) {
            alert("Error : DocReadyInvCtrl : " + e);
        }

    });

    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var DocumentCode = "INV";
        var Data = JSON.stringify({
            MasterType: MasterType,
            DocumentCode: DocumentCode
        });
        var PrdCategoryCode = "";
        var PrdTypeCode = "";

        var SITEDETAIL_CODE = $("#SITEDETAIL_CODE").val();
        var COMPANYDETAIL_CODE = $("#COMPANYDETAIL_CODE").val();

        if (MasterType == "COMPLAINT_NUMBER") {

            if ($("#COMPLAINT_TRACKING_NO").val() == "") {

            }
            else {
                alert("Select a new one. This Investigation already reserved for Tracking No: " + $("#COMPLAINT_TRACKING_NO").val());
                return;
            }

            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();

            if ($("#CreatedByCode").val() == "2019" || $("#CreatedByCode").val() == "2021") {
                alert("State Filter is not going to work.\nAll the Complaints assigned " + $("#CreatedByCode").val() + " to will be shown");
            }
            else {

            }

            Data = JSON.stringify({
                UserCode: $("#CreatedByCode").val(),
                MasterType: MasterType,
                SITEDETAIL_CODE: SITEDETAIL_CODE,
                COMPANYDETAIL_CODE: COMPANYDETAIL_CODE,
                FROM_PLANT_CODE: FROM_PLANT_CODE
            });
        }
        else if (MasterType == "Prod_Cat_Mast" || MasterType == "GetPlantMaster" || MasterType == "SUPPLIER_TYPE_CODE_STO") {
            var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();

            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit
            });
        }
        else if (MasterType == "GetProductMaster_STO") {

            var PRODUCT_TYPE_CODE = $("#PRODUCT_TYPE_CODE").val();
            var PRODUCT_CATEGORY_CODE = $("#PRODUCT_CATEGORY_CODE").val();
            var INVOICE_NO = "";

            //if ($("#InvoiceNoB").val() == "") {
            //    INVOICE_NO = $("#INVOICE_NO").val();
            //} else {
            //    INVOICE_NO = $("#InvoiceNoB").val();
            //}

            //if (PRODUCT_TYPE_CODE == "SBU3" && INVOICE_NO == "" && Methodname != "GetProductMasterInvBU3_STO") {
            //    alert("Please Provide Invoice Number");
            //    return;
            //} else {
                Data = JSON.stringify({
                    MasterType: MasterType,
                    PRODUCT_CATEGORY_CODE: PRODUCT_CATEGORY_CODE,
                    PRODUCT_TYPE_CODE: PRODUCT_TYPE_CODE,
                    PRODUCT_TYPE_NAME: PRODUCT_TYPE_CODE,
                    INVOICE_NO: INVOICE_NO,
                    TO_PLANT_CODE: $("#TO_PLANT_CODE").val()
                });
            //}
        }
        else if (MasterType == "GetDefectTypeMaster") {
            if ($("#PRODUCT_TYPE_CODE").val() == "" || $("#PRODUCT_CATEGORY_CODE").val() == "") {
                alert("Product Type cannot be empty");
                return;
            }
            else {
                Data = JSON.stringify({
                    MasterType: MasterType,
                    ProductCategoryCode: $("#PRODUCT_CATEGORY_CODE").val(),
                    ProductTypeCode: $("#PRODUCT_TYPE_CODE").val(),
                    COMPLAINT_CATEGORY_CODE: $("#COMPLAINT_CATEGORY_CODE").val()
                });
            }
        }
        else if (MasterType == "MSD_Name") {

            var SUPPLIER_TYPE_NAME = $("#SUPPLIER_TYPE_NAME").val();
            if ($("#PRODUCT_TYPE_NAME").val() == "") {
                return;
            }
            else if ($("#PRODUCT_TYPE_NAME").val() == "SBU1" || $("#PRODUCT_TYPE_NAME").val() == "SBU2") {
                SUPPLIER_TYPE_NAME = $("#SUPPLIER_TYPE_NAME").val();
            }
            else if ($("#PRODUCT_TYPE_NAME").val() == "SBU3") {
                SUPPLIER_TYPE_NAME = $("#SUPPLIER_TYPE_NAME").val();
            }

            if (SUPPLIER_TYPE_NAME == "Sub Stockist") {
                return;
            }

            if (SUPPLIER_TYPE_NAME == "") {
                alert("Select Product Supplied Form");
                return;
            }
            if (SUPPLIER_TYPE_NAME == "STOCKIST") {

                Heading = "Stockist List";

                var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
                var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();

                if (PRODUCT_TYPE_NAME == "") {
                    return;
                }
                else if (PRODUCT_TYPE_NAME == "SBU1") {
                    PRODUCT_TYPE_NAME = "1000";
                }
                else if (PRODUCT_TYPE_NAME == "SBU2") {
                    PRODUCT_TYPE_NAME = "2000";
                }
                else if (PRODUCT_TYPE_NAME == "SBU3") {
                    PRODUCT_TYPE_NAME = "3000";
                }

                Data = JSON.stringify({
                    MasterType: "StockistMaster",
                    FROM_PLANT_CODE: $("#FROM_PLANT_CODE").val(),
                    PRODUCT_TYPE_NAME: PRODUCT_TYPE_NAME
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

            if (SUPPLIER_TYPE_NAME == "Distributor" || SUPPLIER_TYPE_NAME == "Wholesaler" || SUPPLIER_TYPE_NAME == "Dealer") {

                Heading = SUPPLIER_TYPE_NAME + " List";

                var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
                var PRODUCT_TYPE_NAME = $("#PRODUCT_TYPE_NAME").val();

                if (PRODUCT_TYPE_NAME == "") {
                    return;
                }
                else if (PRODUCT_TYPE_NAME == "SBU1") {
                    PRODUCT_TYPE_NAME = "1000";
                }
                else if (PRODUCT_TYPE_NAME == "SBU2") {
                    PRODUCT_TYPE_NAME = "2000";
                }
                else if (PRODUCT_TYPE_NAME == "SBU3") {
                    PRODUCT_TYPE_NAME = "3000";
                }

                Data = JSON.stringify({
                    MasterType: "StockistMasterBU3MSD_STO",
                    FROM_PLANT_CODE: $("#FROM_PLANT_CODE").val(),
                    PRODUCT_TYPE_NAME: PRODUCT_TYPE_NAME,
                    SUPPLIER_TYPE_NAME: SUPPLIER_TYPE_NAME
                });
            }

        }
        else if (MasterType == "RecoveryProduct") {
            Data = JSON.stringify({
                MasterType: MasterType,
                PRODUCT_TYPE_NAME: $("#PRODUCT_TYPE_NAME").val(),
                PRODUCT_CATEGORY_NAME: $("#PRODUCT_CATEGORY_CODE").val()
            });
        }
              
        DIMSFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }

    $scope.SaveInvestigationData_STO = function () {
        try {
            var FormIdentity_STO = $("#FormIdentity_STO").val();
            var COMPLAINT_STATUS = $("#COMPLAINT_STATUS").val();
            var Flag = 0;
            var RowId = "";
            var IS = $("#INVESTIGATION_STATUS").val();
            var NOTICE_TYPE = "";
            var TableTotal = 0;

            if ($("#COMPLAINT_TRACKING_NO").val() == "") {
                alert("Please Select complaint before saving");
                return;
            }

            if ($scope.FormIdentity_STO == "" || $scope.FormIdentity_STO == undefined) {
                $scope.FormIdentity_STO = "";
            }
            
            if (($("#System").is(":checked")) == true) {
                NOTICE_TYPE = "System";
            }
            else if (($("#Manual").is(":checked")) == true) {
                NOTICE_TYPE = "Manual";
            }

            if ($("#INVESTIGATOR_TYPE_NAME").val() == "" || typeof $("#INVESTIGATOR_TYPE_NAME").val() == "undefined") {
                Flag = Flag + 1;
                $("#INVESTIGATOR_TYPE_NAME").css("border-color", "red");
            } else {
                $("#INVESTIGATOR_TYPE_NAME").css("border-color", "#d2d6de");
            }

            if ($("#COMPLAINT_RECEIVED_DATE").val() == "" || typeof $("#COMPLAINT_RECEIVED_DATE").val() == "undefined") {
                Flag = Flag + 1;
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "red");
            } else {
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "#d2d6de");
            }

            if ($("#DOC_SERIES_CODE").val() == "") {
                Flag = Flag + 1;
                $("#DOC_SERIES_CODE").css("border-color", "red");
            }
            else {
                $("#DOC_SERIES_CODE").css("border-color", "#d2d6de");
            }

            if ($("#COMPLAINT_ATTENDED_DATE").val() == "" || typeof $("#COMPLAINT_ATTENDED_DATE").val() == "undefined") {
                Flag = Flag + 1;
                $("#COMPLAINT_ATTENDED_DATE").css("border-color", "red");
            } else {
                $("#COMPLAINT_ATTENDED_DATE").css("border-color", "#d2d6de");
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

            var CMS_INV_Material_Supply_Details_SBU3_STO = new Array();
            $("#Material_Supply_Detail_Table_BU3 tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                CMS_INV_Material_Supply_Details_SBU3_STO.push({
                    SlNo: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[0].innerHTML,
                    PRODUCT_CODE: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[1].innerHTML,
                    UOM: "EA",
                    SUPPLIED_NO: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[7].innerHTML,
                    DEFECTED_NO: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[8].innerHTML,
                    ACTUAL_DEFECTED_NO: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[9].innerHTML,
                    PLANT_CODE: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[10].innerHTML,
                    SUPPLIER_TYPE_CODE: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[11].innerHTML,
                    SUPPLIER_CODE: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[12].innerHTML
                });
            });

            var CMS_INV_Supply_Details_SBU3_STO = new Array();
            $("#Supply_Details_TableSBU3 tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                CMS_INV_Supply_Details_SBU3_STO.push({
                    SlNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[0].innerHTML,
                    PRODUCT_CODE: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[1].innerHTML,
                    PRODUCT_NAME: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[2].innerHTML,
                    INVOICE_NO: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[3].innerHTML,
                    INVOICE_DATE: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[4].innerHTML,
                    BATCH_NO: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[5].innerHTML,
                    SUPPLIED_NO: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[6].innerHTML,
                    DEFECTED_NO: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[7].innerHTML,
                    ACTUAL_DEFECTED_NO: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[8].innerHTML,
                    TRANSPORTER: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[9].innerHTML,
                    DEFECT_TYPE_NAME: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[10].innerHTML,
                    REMARKS: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[11].innerHTML,
                    DEFECT_TYPE_CODE: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[12].innerHTML
                });
            });

            if (CMS_INV_Material_Supply_Details_SBU3_STO.length <= 0) {
                Flag = Flag + 1;
                alert("Please Provide Material Supply Details");
                return;
            }

            if (CMS_INV_Supply_Details_SBU3_STO.length <= 0) {
                Flag = Flag + 1;
                alert("Please Provide Supply Details");
                return;
            }

            if (Flag > 0) {
                //console.log("Flag : " + Flag);
                return;
            }
            else {
                var COMPLAIN_DESC = $("#COMPLAIN_DESC").val();
                var DELAY = $("#DELAY").is(":checked");
                if (DELAY == true) {
                    if ($scope.DELAY_DAYS == undefined) { $scope.DELAY_DAYS = ""; }
                    if ($scope.DELAY_REASON == undefined) { $scope.DELAY_REASON = ""; }
                }
                else {
                    DELAY = false;
                    $scope.DELAY_DAYS = "";
                    $scope.DELAY_REASON = "";
                }                

                var InvestigationData = JSON.stringify({
                    FormIdentity_STO: $("#FormIdentity_STO").val(),

                    FROM_PLANT_CODE: $("#FROM_PLANT_CODE").val(),
                    COMPLAINT_TRACKING_NO: $("#COMPLAINT_TRACKING_NO").val(),
                    INVESTIGATOR_TYPE_CODE: $("#INVESTIGATOR_TYPE_CODE").val(),
                    COMPLAINT_RECEIVED_DATE: $("#COMPLAINT_RECEIVED_DATE").val(),
                    INVESTIGATION_DONE_BY_CODE: $("#INVESTIGATION_DONE_BY_CODE").val(),
                    DOC_SERIES_CODE: $("#DOC_SERIES_CODE").val(),
                    COMPLAINT_REGISTERED_DATE: $("#COMPLAINT_REGISTERED_DATE").val(),
                    VISITED_DATE: $("#VISITED_DATE").val(),
                    INVESTIGATION_DATE: $("#INVESTIGATION_DATE").val(),
                    COMPLAINT_ATTENDED_DATE: $("#COMPLAINT_ATTENDED_DATE").val(),
                    PREVIOUS_VISITED_DATE: $("#PREVIOUS_VISITED_DATE").val(),
                    INVESTIGATION_STATUS: $("#INVESTIGATION_STATUS").val(),
                    DELAY_CHECK: $("#DELAY").is(':checked'),
                    DELAY_DAYS: $("#DELAY_DAYS").val(),
                    DELAY_REASON: $("#DELAY_REASON").val(),
                    PLANT_MHD_CODE: $("#PLANT_MHD_CODE").val(),
                    APPROVED_DATE: $("#APPROVED_DATE").val(),
                    NOTICE_TYPE: NOTICE_TYPE,
                    FilesPath: $("#SelectedFiles").text(),

                    TO_PLANT_CODE: $("#TO_PLANT_CODE").val(),
                    COMPLAINT_MODE_CODE: $("#COMPLAINT_MODE_CODE").val(),
                    PRODUCT_CATEGORY_CODE: $("#PRODUCT_CATEGORY_CODE").val(),
                    END_CUSTOMER_DETAILS: $("#END_CUSTOMER_DETAILS").val(),
                    SITE_ADDRESS: $("#SITE_ADDRESS").val(),

                    INVOICE_BASED: $("#INVOICE_BASED").is(':checked'),
                    PERIOD_BASED: $("#PERIOD_BASED").is(':checked'),
                    INVOICE_DETAILS: $("#INVOICE_DETAILS").val(),
                    PRODUCT_DETAILS: $("#PRODUCT_DETAILS").val(),
                    DATE_SUPPLY_FROM: $("#DATE_SUPPLY_FROM").val(),
                    DATE_SUPPLY_TO: $("#DATE_SUPPLY_TO").val(),
                    NATURE_OF_COMPLAINT: $("#NATURE_OF_COMPLAINT").val(),
                    OBSERVATIONS_BY_OFFICIAL: $("#OBSERVATIONS_BY_OFFICIAL").val(),
                    REMARKS: $("#REMARKS").val(),
                    CREATED_BY: $("#CreatedByCode").val(),
                    SITEDETAIL_CODE: $("#SITEDETAIL_CODE").val(),
                    COMPANYDETAIL_CODE: $("#COMPANYDETAIL_CODE").val(),
                    COMPLAINT_REGISTERED_CODE: $("#COMPLAINT_REGISTERED_CODE").val(),
                    COMPLAINT_REGISTERED_DOC_SERIES_CODE: $("#COMPLAINT_REGISTERED_DOC_SERIES_CODE").val(),
                    COMPLAINT_REGISTERED_DOC_NUM: $("#COMPLAINT_REGISTERED_DOC_NUM").val(),
                    COMPLAIN_DESC: $("#COMPLAIN_DESC").val(),
                    PRODUCT_TYPE_CODE: $("#PRODUCT_TYPE_CODE").val(),
                    COMPLAINT_TYPE_CODE: $("#COMPLAINT_TYPE_CODE").val(),
                    COMPLAINT_CATEGORY_CODE: $("#COMPLAINT_CATEGORY_CODE").val(),

                    CMS_INV_Material_Supply_Details_SBU3_STO: CMS_INV_Material_Supply_Details_SBU3_STO,
                    CMS_INV_Supply_Details_SBU3_STO: CMS_INV_Supply_Details_SBU3_STO,                    
                });

                var MyTest = $("#MyTest").val();

                if (MyTest == "") {
                    if (confirm("Do you want to Save data?")) {
                    }
                    else {
                        return;
                    }
                }
                if (MyTest == "Save")
                    MyTest = "";

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationSTO/SaveInvestigation',
                    async: false,
                    data: { InvestigationData: InvestigationData },
                }).then(function successCallback(response) {
                    if (MyTest == "") {
                        if (response.data == "FALSE") {
                            alert("Error Occured.Please Try Again");

                        }
                        else if (response.data == "TRUE") {
                            alert("Successfully Saved the Data");
                        }
                        else {
                            var RD = JSON.parse(response.data);
                            if (RD["Result"] == "TRUE") {
                                alert("Successfully Saved the Data");
                                $("#FormIdentity_STO").val(RD["ID"]);
                                $("#INVESTIGATION_ID").val(RD["ID"]);
                                $("#SendInvestigationApproval").css("display", "block");
                            }
                        }
                    }
                    if ($("#INVESTIGATION_STATUS").val() == "DRAFT") {
                        $("#SendInvestigationApproval").css('display', 'block');
                    }
                    else {
                        $("#SendInvestigationApproval").css('display', 'none');
                    }
                    $("#MyTest").val("");
                    //go('InvestigationList_STO');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }

        }
        catch (e) {
            alert("Error :SaveInvestigationData_STO : " + e);
            console.log("Error :SaveInvestigationData_STO : " + e);
        }
    }

    $scope.SendInvestigationForApproval_STO = function () {
        try {
            //console.clear();

            if (confirm("Do you want to Send for review?")) {
            }
            else {
                return;
            }

            $("#MyTest").val("ASD");
            $scope.SaveInvestigationData_STO();

            var Flag = 0;

            var PType = $("#PRODUCT_TYPE_NAME").val();            
            
            var Doc_Status = $("#INVESTIGATION_STATUS").val();
            if (Doc_Status == "DRAFT") {

            }
            else {
                alert("Document Status is " + Doc_Status + "");
                $("#MyTest").val("");
                return;
            }


            if ($("#COMPLAINT_TRACKING_NO").val() == "") {
                Flag = Flag + 1;
                $("#COMPLAINT_TRACKING_NO").css("border-color", "red");
            }
            else {
                $("#COMPLAINT_TRACKING_NO").css("border-color", "#d2d6de");
            }

            if ($("#COMPLAINT_RECEIVED_DATE").val() == "") {
                Flag = Flag + 1;
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "red");
            }
            else {
                $("#COMPLAINT_RECEIVED_DATE").css("border-color", "#d2d6de");
            }


            if ($("#COMPLAINT_ATTENDED_DATE").val() == "") {
                Flag = Flag + 1;
                $("#COMPLAINT_ATTENDED_DATE").css("border-color", "red");
            }
            else {
                $("#COMPLAINT_ATTENDED_DATE").css("border-color", "#d2d6de");
            }

            if ($("#INVESTIGATOR_TYPE_NAME").val() == "") {
                Flag = Flag + 1;
                $("#INVESTIGATOR_TYPE_NAME").css("border-color", "red");
            }
            else {
                $("#INVESTIGATOR_TYPE_NAME").css("border-color", "#d2d6de");
            }


            if ($("#DOC_SERIES_CODE").val() == "") {
                Flag = Flag + 1;
                $("#DOC_SERIES_CODE").css("border-color", "red");
            }
            else {
                $("#DOC_SERIES_CODE").css("border-color", "#d2d6de");
            }            

            if (($("#PRODUCT_TYPE_NAME").val() == "SBU1") || ($("#PRODUCT_TYPE_NAME").val() == "SBU2")) {
                if ($("#VISITED_DATE").val() == "") {
                    Flag = Flag + 1;
                    $("#VISITED_DATE").css("border-color", "red");
                }
                else {
                    $("#VISITED_DATE").css("border-color", "#d2d6de");
                }
            }
            else if ($("#PRODUCT_TYPE_NAME").val() == "SBU3") {

            }

            var FormIdentity_STO = $("#FormIdentity_STO").val();

            if (Flag > 0) {
                alert("Please fill All Mandatory fields before sending for Approval");
                $("#MyTest").val("");
                return;
            }
            else if (FormIdentity_STO == "") {
                alert("Please Save the form before Sending for Approval");
            }
            else {

                console.clear();

                var RowId = 0;
                
                var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();

                console.log("BusinessUnit : " + BusinessUnit);

                if (BusinessUnit == "") {
                    return;
                }                
                else if (BusinessUnit == "SBU2" || BusinessUnit == "SBU3") {
                    //if ($("#SelectedFiles").text() != "" || $("ul#InvestigationFilesUploaded li").length > 0) {
                    //    $("#ClickUploadFile").val(1);
                    //    $("#ClickSaveComplaint").val(1);
                    //}
                    //var file = document.getElementById('InvestigationFile').files.length;
                    //if (file == 0 && ($("ul#InvestigationFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
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

                var ApprovalData = JSON.stringify({
                    FormIdentity_STO: FormIdentity_STO,
                    COMPLAINT_TRACKING_NO: $("#COMPLAINT_TRACKING_NO").val(),
                    CREATED_BY: $("#CreatedByCode").val(),
                    FORM_NAME: "Investigation_STO"
                });

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationSTO/SendForApproval',
                    async: false,
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {

                    if (response.data == "FALSE") {
                        alert("Error Occured Please try later");
                    }
                    else if (response.data == "TRUE") {
                        $("#INVESTIGATION_STATUS").val("Waiting for approval");
                        alert("Successfully sent for Approval");

                        $("#ComplaintNumberSpan").css("pointer-events", "none");
                        $("#Investigator_TypeSpan").css("pointer-events", "none");
                        $("#GetInvestigation_Done_BySpan").css("pointer-events", "none");
                        $("#CRSeriesCode").css("pointer-events", "none");
                        $("#BISSizeSapn").css("pointer-events", "none");
                        $("#GetBISDefectTypeMasterSpan").css("pointer-events", "none");
                        $("#GetRecoveryMasterInvSpan").css("pointer-events", "none");

                        $("#BI_Sheet_Add").css('display', 'none');
                        $("#Observation_Remarks_Add").css('display', 'none');
                        $("#Site_Observation_Sheet_Add").css('display', 'none');
                        $("#BI_Sheet_GO").css('display', 'none');
                        $("#Mat_Sup_Det_Add").css('display', 'none');
                        $("#Invoice_List_AddBtn").css('display', 'none');
                        $("#Supply_Details_Add").css('display', 'none');
                        $("#Supply_Details_AddB").css('display', 'none');

                        $("#CompInvSave").css('display', 'none');
                        $("#SendInvestigationApproval").css('display', 'none');
                        $scope.INVESTIGATION_STATUS = "Waiting for Approval";
                        //$scope.go('InvestigationList_STO');
                        $scope.MakeApproved_STO('Approved');
                    }
                    //go('InvestigationList_STO');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });

            }
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }

    $scope.GetApprovalPopUp_STO = function () {
        try {
            $("#APPROVALS_REMARKS").val("");
            if ($("#is_rejectable").is(':checked') == true) {
                $("#rejectedoverphonedisable").attr('disabled', 'disabled');
            } else {
                $("#rejectedoverphonedisable").removeAttr('disabled');
            }
            $("#ApprovalsActionForm").modal('show');
        }
        catch (e) {
            alert("Error : " + e);
        }
    }

    $scope.MakeApproved_STO = function (DECISION) {
        try {
            //if (confirm("Do you want to Approve?")) {
            //}
            //else {
            //    return;
            //}

            $("#MyTest").val("ASD");
            $scope.SaveInvestigationData_STO();

            if ($scope.INVESTIGATION_STATUS == "DRAFT") {
                alert("Please send for approval");
            }
            else if ($scope.INVESTIGATION_STATUS == "Approved") {
                alert("This record already got approved");
            }
            else if ($scope.INVESTIGATION_STATUS == "Rejected") {
                alert("This record already got Rejected");
            }
            else {

                var APPROVALS_REMARKS = $("#APPROVALS_REMARKS").val();
                if (DECISION == "Rejected") {
                    if (APPROVALS_REMARKS == "") {
                        alert("Please Provide Reason for Rejection");
                        return;
                    }
                }
                else {
                    APPROVALS_REMARKS = "";
                }


                var ApprovalData = JSON.stringify({
                    COMPLAINT_TRACKING_NO: $("#INVESTIGATION_ID").val(),
                    MODIFIED_BY: $("#CreatedByCode").val(),
                    FORM_NAME: "Investigation_STO",
                    DECISION: DECISION,
                    APPROVALS_REMARKS: APPROVALS_REMARKS,
                    PLANT_MHD_CODE: $("#PLANT_MHD_CODE").val(),
                    PLANT_MHD_NAME: $("#PLANT_MHD_NAME").val()
                });

                $("#ApprovalsActionForm").modal('hide');

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationSTO/MakeApproval',
                    async: false,
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") {
                        alert("Error Occured Please try later");
                    }
                    else if (response.data == "TRUE") {
                        $("#INVESTIGATION_STATUS").val("Approved");
                        $("#SHOW_STATUS").val("Investigation Approved. Compensation under review");

                        //alert("Successfully Approved.");
                        alert("Successfully " + DECISION);

                        $("#ComplaintNumberSpan").css("pointer-events", "none");
                        $("#Investigator_TypeSpan").css("pointer-events", "none");
                        $("#GetInvestigation_Done_BySpan").css("pointer-events", "none");
                        $("#CRSeriesCode").css("pointer-events", "none");
                        $("#BISSizeSapn").css("pointer-events", "none");
                        $("#GetBISDefectTypeMasterSpan").css("pointer-events", "none");
                        $("#GetRecoveryMasterInvSpan").css("pointer-events", "none");

                        $("#BI_Sheet_Add").css('display', 'none');
                        $("#Observation_Remarks_Add").css('display', 'none');
                        $("#Site_Observation_Sheet_Add").css('display', 'none');
                        $("#BI_Sheet_GO").css('display', 'none');
                        $("#Mat_Sup_Det_Add").css('display', 'none');
                        $("#Invoice_List_AddBtn").css('display', 'none');
                        $("#Supply_Details_Add").css('display', 'none');
                        $("#Supply_Details_AddB").css('display', 'none');

                        $("#CompInvSave").css('display', 'none');
                        $("#MakeApproved_STO").css('display', 'none');                        
                        //$scope.go('ComplaintPendingApproval_STO');
                        $scope.go('InvestigationList_STO');
                    }
                    //go('ComplaintPendingApproval_STO');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }
        }
        catch (e) {
            alert("Error :MakeAprovedInv : " + e);
        }
    }    

    $scope.PlantChange = function () {
        try {
            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
            $("#CMSPlant").val(FROM_PLANT_CODE);
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }    
});
//Complaint pop up
function GetComplaint_No_STO(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.COMPLAINT_NUMBER = $(obj).children().eq(1).html();

        if ($(obj).children().eq(1).html() == undefined || $(obj).children().eq(1).html() == null || $(obj).children().eq(1).html() == "") {
        }
        else {
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistrationSTO/PopulateComplaintInToInvestigation',
                async: false,
                data: { ComplaintNumber: $(obj).children().eq(1).html() },
            }).then(function successCallback(response) {
                var Data = JSON.parse(response);
                var HeaderData = Data["Header"];

                $("#FROM_PLANT_CODE").val(HeaderData[0]["FROM_PLANT_CODE"]);
                $("#COMPLAINT_TRACKING_NO").val(HeaderData[0]["COMPLAINT_TRACKING_NO"]);
                $("#COMPLAINT_RECEIVED_DATE").val(HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                $("#COMPLAINT_REGISTERED_DATE").val(HeaderData[0]["COMPLAINT_REGISTRATION_DATE"]);
                $("#VISITED_DATE").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                $("#INVESTIGATION_DATE").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                $("#COMPLAINT_ATTENDED_DATE").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);

                if (HeaderData[0]["PREVIOUS_VISITED_DATE"] == "" || HeaderData[0]["PREVIOUS_VISITED_DATE"] == null || HeaderData[0]["PREVIOUS_VISITED_DATE"] == undefined) {
                }
                else {
                    $("#PREVIOUS_VISITED_DATE").datepicker("setDate", HeaderData[0]["PREVIOUS_VISITED_DATE"]);
                    $("#PREVIOUS_VISITED_DATE").val(HeaderData[0]["PREVIOUS_VISITED_DATE"]);
                }

                $("#INVESTIGATION_STATUS").val("DRAFT");
                $("#SHOW_STATUS").val("Under Investigation");                
                $("#PLANT_MHD_CODE").val(HeaderData[0]["PLANT_MHD_CODE"]);
                $("#PLANT_MHD_NAME").val(HeaderData[0]["PLANT_MHD_NAME"]);
                
                $("#COMPLAINT_ATTENDED_DATE").datepicker('setEndDate', TodayDateTime);
                $("#VISITED_DATE").datepicker('setEndDate', TodayDateTime);
                $("#INVESTIGATION_DATE").datepicker('setEndDate', TodayDateTime);

                //$("#COMPLAINT_ATTENDED_DATE").val("");
                //$("#VISITED_DATE").val("");
                $("#INVESTIGATION_DATE").datepicker("setDate", TodayDateTime);
                $("#SelectedComplaintFiles").append(HeaderData[0]["ATTACHMENTS"]).trigger('change');
                $("#TO_PLANT_CODE").val(HeaderData[0]["TO_PLANT_CODE"]);
                $("#TO_PLANT_NAME").val(HeaderData[0]["TO_PLANT_NAME"]);

                $("#CMSPlant").val(HeaderData[0]["FROM_PLANT_CODE"]);

                $("#PRODUCT_TYPE_NAME").val(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                $("#PRODUCT_TYPE_CODE").val(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                $("#PRODUCT_CATEGORY_NAME").val(HeaderData[0]["PRODUCT_CATEGORY_NAME"]);
                $("#PRODUCT_CATEGORY_CODE").val(HeaderData[0]["PRODUCT_CATEGORY_CODE"]);
                
                if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                    $("#ObservationByHil").text("Observations by official");
                    $("#MatSupDet_BU3").css("display", "none");                    
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                    if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                        $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    }
                    else {
                        $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                    }
                    $("#ObservationByHil").text("Observations by official");
                    $("#MatSupDet_BU3").css("display", "none");                    
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36") {
                    $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                    $("#ObservationByHil").text("Observations by official");
                    $("#MatSupDet_BU3").css("display", "none");                    
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                    $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                    $("#MatSupDet_BU3").css("display", "block");
                    $(".NoticeTypeClass").css("display", "none");                    
                }

                $("#NATURE_OF_COMPLAINT").val(HeaderData[0]["NATURE_OF_COMPLAINT"]);

                $("#END_CUSTOMER_DETAILS").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                
                $("#SITE_ADDRESS").val(HeaderData[0]["SITE_ADDRESS"]);

                $("#REMARKS").val(HeaderData[0]["REMARKS"]);

                $("#COMPLAINT_REGISTERED_CODE").val(HeaderData[0]["ID"]);
                $("#COMPLAINT_REGISTERED_DOC_SERIES_CODE").val(HeaderData[0]["DOC_SERIES_CODE"]);

                $("#COMPLAINT_TYPE_CODE").val(HeaderData[0]["COMPLAINT_TYPE_CODE"]);
                $("#COMPLAINT_TYPE_NAME").val(HeaderData[0]["COMPLAINT_TYPE_NAME"]);

                $("#COMPLAINT_MODE_CODE").val(HeaderData[0]["COMPLAINT_MODE_CODE"]);
                $("#COMPLAINT_MODE_NAME").val(HeaderData[0]["COMPLAINT_MODE_NAME"]);

                $("#COMPLAINT_CATEGORY_CODE").val(HeaderData[0]["COMPLAINT_CATEGORY_CODE"]);
                $("#COMPLAINT_CATEGORY_NAME").val(HeaderData[0]["COMPLAINT_CATEGORY_NAME"]);
                $("#COMPLAIN_DESC").val(HeaderData[0]["COMPLAINT_DESC"]);                

                TRCode = "";
                var CMS_RC_Material_Supply_Details_STO = Data["CMS_RC_Material_Supply_Details_STO"];
                $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                for (var i = 0; i < CMS_RC_Material_Supply_Details_STO.length; i++) {


                    TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";

                    TRCode = TRCode + "<td>" + (i + 1) + "</td>";

                    //TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["PRODUCT_CODE"] + "</td>";
                    //TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["PRODUCT_NAME"] + "</td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["PLANT_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["SUPPLIER_TYPE_NAME"] + "</td>";

                    TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["SUPPLIER_NAME"] + "</td>";
                    //TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["UOM"] + "</td>";
                    //TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["SUPPLIED_NO"] + "</td>";
                    //TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["DEFECTED_NO"] + "</td>";

                    //TRCode = TRCode + "<td>" + CMS_RC_Material_Supply_Details_STO[i]["ACTUAL_DEFECTED_NO"] + "</td>";
                    TRCode = TRCode + "<td>EA</td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td style='display:none;'>" + CMS_RC_Material_Supply_Details_STO[i]["PLANT_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'>" + CMS_RC_Material_Supply_Details_STO[i]["SUPPLIER_TYPE_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'>" + CMS_RC_Material_Supply_Details_STO[i]["SUPPLIER_CODE"] + "</td>";

                    TRCode = TRCode + "</tr>";
                }
                $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);
                
                TRCode = "";
                $("#Supply_Details_TableSBU3 tbody").empty();

                var CMS_RC_Supply_Details_STO = Data["CMS_RC_Supply_Details_STO"];
                TRCode = "";                
                    for (var i = 0; i < CMS_RC_Supply_Details_STO.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (CMS_RC_Supply_Details_STO[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["BATCH_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["SUPPLIED_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["DEFECTED_NO"] + "</td>";
                        //TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["ACTUAL_DEFECTED_NO"] + "</td>";
                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + CMS_RC_Supply_Details_STO[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + CMS_RC_Supply_Details_STO[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_TableSBU3 tbody").append(TRCode);

                $("#INVOICE_DETAILS").val(HeaderData[0]["INVOICE_DETAILS"]);
                $("#PRODUCT_DETAILS").val(HeaderData[0]["PRODUCT_DETAILS"]);

                $("#HiddenInvoiceDetails").val(HeaderData[0]["INVOICE_DETAILS"]);

                //$("#OBSERVATION_BY_QAF").val(HeaderData[0]["OBSERVATIONSBY_OFFICIAL"]);

                $("#COMPLAINT_DESC_SALES").val(HeaderData[0]["OBSERVATIONSBY_OFFICIAL"]);

                if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {

                    $("#SupplyDetailsTableSBU3").hide();

                    $("#BreakageInspectionSheetDiv").show();
                    $("#ObservationRemarksDiv").show();
                    $("#SiteObservationSheetDiv").show();

                    $("#ObservationsByOfficialFieldDiv").show();
                    $("#RemarksFieldDiv").show();
                    $("#NatureOfComplaintFieldDiv").hide();
                    $("#ComplaintDescribedBySalesFieldDiv").hide();
                    $("#ComplaintDescriptionFieldDiv").hide();
                    $("#ObservationByQAFFieldDiv").hide();

                    $("#VisitedDateSpanId").show();
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2" || HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {


                    $("#BreakageInspectionSheetDiv").hide();
                    $("#ObservationRemarksDiv").hide();
                    $("#SiteObservationSheetDiv").hide();


                    if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                        $("#ObservationsByOfficialFieldDiv").hide();
                        $("#RemarksFieldDiv").show();
                        $("#NatureOfComplaintFieldDiv").show();
                        $("#ComplaintDescribedBySalesFieldDiv").show();
                        $("#ComplaintDescriptionFieldDiv").show();
                        $("#ObservationByQAFFieldDiv").show();
                        $("#VisitedDateSpanId").show();

                        $("#SupplyDetailsTableSBU3").hide();
                    }
                    else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36") {
                        $("#ObservationsByOfficialFieldDiv").hide();
                        $("#RemarksFieldDiv").show();
                        $("#NatureOfComplaintFieldDiv").show();
                        $("#ComplaintDescribedBySalesFieldDiv").show();
                        $("#ComplaintDescriptionFieldDiv").show();
                        $("#ObservationByQAFFieldDiv").show();
                        $("#VisitedDateSpanId").show();

                        $("#SupplyDetailsTableSBU3").hide();
                    }
                    else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                        $("#ObservationsByOfficialFieldDiv").show();
                        $("#RemarksFieldDiv").show();
                        $("#NatureOfComplaintFieldDiv").show();
                        $("#ComplaintDescribedBySalesFieldDiv").hide();
                        $("#ComplaintDescriptionFieldDiv").hide();
                        $("#ObservationByQAFFieldDiv").hide();
                        $("#VisitedDateSpanId").hide();

                        $("#SupplyDetailsTableSBU3").show();
                    }
                }

                //AddThingsToProductDetails();
                if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                    //MakeTotalsForSheetingTable();
                }                

                SheetingLabels(HeaderData[0]["PRODUCT_CATEGORY_CODE"]);

            },
                function errorCallback(response) {
                    alert("Error : " + response);
                });
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Investigator type master pop up
function GetInvestigator_Type_STO(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.Investigator_Type_ID = $(obj).children().eq(0).html();
        InvestigationScope.INVESTIGATOR_TYPE_CODE = $(obj).children().eq(1).html();
        InvestigationScope.INVESTIGATOR_TYPE_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//User pop master pop up
function GetInvestigation_Done_By_STO(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.Investigation_Done_By_ID = $(obj).children().eq(0).html();
        InvestigationScope.INVESTIGATION_DONE_BY_CODE = $(obj).children().eq(1).html();
        InvestigationScope.INVESTIGATION_DONE_BY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//Series code pop up
function GetIGS_Series_Code_STO(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.DOC_SERIES_CODE = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetPlantMasterInvBU3_STO(obj) {
    InvestigationScope.$apply(function () {
        $("#PLANT_CODE").val($(obj).children().eq(1).html());
        $("#PLANT_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetProductSuppliedFromInvBU3_STO(obj) {
    InvestigationScope.$apply(function () {

        if (($(obj).children().eq(2).html()) == "Sub Stockist") {
            alert("Sub Stockist is Not Applicable for SBU3");
        }
        else {

            $("#SUPPLIER_TYPE_CODE").val($(obj).children().eq(1).html());
            $("#SUPPLIER_TYPE_NAME").val($(obj).children().eq(2).html());

            $("#SUPPLIER_NAME").val("");
            $("#SUPPLIER_CODE").val("");

        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//ProductMasterPopUp
function GetProductMasterInvBU3_STO(obj) {
    InvestigationScope.$apply(function () {
        $("#PRODUCT_CODE").val($(obj).children().eq(1).html());
        $("#PRODUCT_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
function GetProductMasterInvSDBU3_STO(obj) {
    InvestigationScope.$apply(function () {
        $("#CMS_INV_SD_BU3_STO_PRODUCT_CODE").val($(obj).children().eq(1).html());
        $("#CMS_INV_SD_BU3_STO_PRODUCT_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetDefectTypeMasterInvBU3_STO(obj) {
    InvestigationScope.$apply(function () {
        $("#CMS_INV_SD_BU3_STO_DEFECT_TYPE_CODE").val($(obj).children().eq(1).html());
        $("#CMS_INV_SD_BU3_STO_DEFECT_TYPE_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetMSD_NameInvBU3_STO(obj) {
    InvestigationScope.$apply(function () {

        $("#SUPPLIER_CODE").val($(obj).children().eq(1).html());
        $("#SUPPLIER_NAME").val(($(obj).children().eq(2).html()).replace("&amp;", "&"));

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

DIMS.controller('InvestigationListCtrl_STO', function ($scope, $location, DIMSFactory) {
    InvestigationListScope = $scope;
    $scope.InvestigationList_STO = [];
    angular.element(document).ready(function () {
        $("#HiddenForCMS").val("");

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            //data: { AccessData: JSON.stringify({ UserRole: $("#UserType_STO").val(), FormCode: 'INV' }) },
            data: { AccessData: JSON.stringify({ UserRole: $("#UserType_STO").val(), FormCode: 'INVST_STO' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#CreateNewInvestigation").css('display', 'none');
                    $("#InvestigationListSection").css('display', 'none');
                    $("#FROM_PLANT_CODE").css('display', 'none');
                }
                else {

                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#InvestigationListSection").css('display', 'block');
                    }
                    else {
                        $("#InvestigationListSection").css('display', 'none');
                        $("#FROM_PLANT_CODE").css('display', 'none');
                    }

                    //console.log("IS_ADD : " + AccessData[0]["IS_ADD"]);

                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#CreateNewInvestigation").css('display', 'block');
                    }
                    else {
                        $("#CreateNewInvestigation").css('display', 'none');
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: '../../ComplaintRegistrationSTO/FillCMSPlantFilter',
                    async: true,
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
                            var WhereClause = " WHERE CMS_INV_STO.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' ";

                            if (UserCode_STO == "50003209") {
                                if (FROM_PLANT_CODE == "ALL") {
                                    WhereClause = " WHERE CMS_INV_STO.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_STO.INVESTIGATION_STATUS!=''";
                                } else {
                                    WhereClause = " WHERE CMS_INV_STO.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND CMS_INV_STO.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_STO.INVESTIGATION_STATUS!='' ";
                                }
                            } else {
                                WhereClause = " WHERE CMS_INV_STO.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND CMS_INV_STO.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_STO.INVESTIGATION_STATUS!='' AND CMS_INV_STO.CREATED_BY='" + UserCode_STO + "' ";
                            }

                            var Data = JSON.stringify({
                                MasterType: "ComplaintRegistrationList_STO",
                                ID: "561",
                                UserCode: $("#UserCode_STO").val(),
                                "Type": "Get",
                                ReportName: "InvestigationList_STO",
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
                                    }
                                    else {

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

                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "InvestigationList_STO", UserSelectedColumnName);
                                    $('#InvestigationList_STO tbody').on('click', 'tr', function () {
                                        var ID = $(this).find('td:eq(1)').text();
                                        if ($(this).hasClass('selected')) {
                                            $(this).removeClass('selected');
                                        }
                                        else {

                                        }
                                        if (ID != "") {

                                            $.ajax({
                                                url: '../../Users/GetRightToAccess',
                                                type: 'GET',
                                                //data: { AccessData: JSON.stringify({ UserRole: $("#UserType_STO").val(), FormCode: 'INV' }) },
                                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_STO").val(), FormCode: 'INVST_STO' }) },
                                                success: function (AccessData) {
                                                    if (AccessData == "") {
                                                    }
                                                    else {
                                                        AccessData = JSON.parse(AccessData);
                                                        if (AccessData[0]["IS_VIEW"] == true || AccessData[0]["IS_UPDATE"] == true) {
                                                            var scope = angular.element($("#InvestigationlistDiv_STO")).scope();
                                                            scope.$apply(function () {
                                                                scope.go("Investigation_STO/" + ID);
                                                            })
                                                        }
                                                        else {

                                                        }
                                                    }
                                                }
                                            });

                                        }

                                    });

                                });

                            });

                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                    }
                });


            }
        });

    });

    $scope.PlantChange = function () {
        try {
            var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
            $("#CMSPlant").val(FROM_PLANT_CODE);
            var UserCode_STO = $("#UserCode_STO").val();
            //var WhereClause = " WHERE CMS_INV_STO.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "'  ORDER BY CMS_INV_STO.ID DESC ";
            var WhereClause = " WHERE CMS_INV_STO.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' ";
            var UserType_STO = $("#UserType_STO").val();

            if (UserCode_STO == "50003209") {
                if (FROM_PLANT_CODE == "ALL") {
                    WhereClause = " WHERE CMS_INV_STO.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_STO.INVESTIGATION_STATUS!=''";
                } else {
                    WhereClause = " WHERE CMS_INV_STO.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND CMS_INV_STO.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_STO.INVESTIGATION_STATUS!='' ";
                }
            } else {
                WhereClause = " WHERE CMS_INV_STO.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' AND CMS_INV_STO.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_STO.INVESTIGATION_STATUS!='' AND CMS_INV_STO.CREATED_BY='" + UserCode_STO + "' ";
            }

            var Data = JSON.stringify({
                MasterType: "ComplaintRegistrationList_STO",
                ID: "561",
                UserCode: $("#UserCode").val(),
                "Type": "Get",
                ReportName: "InvestigationList_STO",
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

                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "InvestigationList_STO", UserSelectedColumnName);
                    $('#InvestigationList_STO tbody').on('click', 'tr', function () {
                        var ID = $(this).find('td:eq(1)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {

                        }
                        if (ID != "") {
                            var scope = angular.element($("#InvestigationlistSTODiv")).scope();
                            scope.$apply(function () {
                                scope.go("Investigation_STO/" + ID);
                            })
                        }

                    });

                });

            });


        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
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
        if (ControllerName != "InvestigationListCtrl_STO") {
            ControllerName = "InvestigationListCtrl_STO";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "InvestigationListCtrl_STO");

            $compile(elem.contents())(complaintRegistrationScope);
        }

        $("#ColumnEditingModal").modal('show');




    }
    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing = function () {
        DIMSFactory.ViewColumnEditing("InvestigationList_STO", $("#UserCode").val(), " ORDER BY ID DESC"); // 1-Report Name ,2-UserCode(561),3-WhereClause
    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var FROM_PLANT_CODE = $("#FROM_PLANT_CODE").val();
        var WhereClause = " WHERE CUST.STOCKIST_ID=INV.Customer_Code AND INV.FROM_PLANT_CODE='" + FROM_PLANT_CODE + "' ORDER BY INV.ID ";
        var Data = JSON.stringify({
            MasterType: "InvestigationList_STO",
            ID: "561",
            UserCode: $("#UserCode").val(),
            "Type": "Get",
            ReportName: "InvestigationList_STO",
            WhereClause: WhereClause
        });
        //DIMSFactory.SaveColumnEditingData("Compensation", $scope.UserCode, " ORDER BY ID DESC");
        DIMSFactory.SaveColumnEditingData_InputParameter("InvestigationList_STO", $("#UserCode").val(), WhereClause, Data, "InvestigationList_STO");
        // 1-Report Name ,2-UserCode(561),3-WhereClause,4-JsonData,5-Frontend datatable id


    }
});
