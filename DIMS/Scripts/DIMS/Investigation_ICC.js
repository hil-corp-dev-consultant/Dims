var InvestigationScope_ICC;



//Investigation_ICC Controller
DIMS.controller('InvestigationCtrl_ICC', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    InvestigationScope_ICC = $scope;
    $scope.SITEDETAIL_CODEs = $("#SITEDETAIL_CODE").val();
    $scope.templatesettings = { HeaderTitle: "InvestigationCtrl_ICC" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    angular.element(document).ready(function () {

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_ICC").val(), FormCode: 'INVST_ICC' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#InvestigationNewView_ICC").css('display', 'none');
                    $("#PendingApprovalsList_ICC").css('display', 'none');
                    $("#InvList_ICC").css('display', 'none');
                    $("#CompInvSave_ICC").css('display', 'none');
                    $("#InvNew_ICC").css('display', 'none');
                    $("#SendInvestigationApproval_ICC").css('display', 'none');
                    $("#MakeApproved_ICC").css('display', 'none');
                    $("#StateFilter_ICC").css('display', 'none');                    
                }
                else {

                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#InvList_ICC").css('display', 'block');
                    }
                    else {
                        $("#InvList_ICC").css('display', 'none');
                        $("#StateFilter_ICC").css('display', 'none');
                    }


                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#InvestigationNewView_ICC").css('display', 'block');
                    }
                    else {
                        $("#InvestigationNewView_ICC").css('display', 'none');
                        $("#StateFilter_ICC").css('display', 'none');
                    }

                }

            }
        });

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
        }
        else {
            $("#FormIdentity_ICC").val($routeParams.ID).trigger('change');
        }

        try {
            $scope.DOC_SERIES_CODE = "INVSZ12";
            var FormIdentity_ICC = $("#FormIdentity_ICC").val();

            if (FormIdentity_ICC == "" || FormIdentity_ICC == null || FormIdentity_ICC == undefined) {
                
                $("#SendInvestigationApproval_ICC").css('display', 'none');
                $("#InvNew_ICC").css('display', 'none');

                $("#MakeApproved_ICC").css('display', 'none');                
                $(".DelayGroup_ICC").hide();
                $(".DelayGroupDummy_ICC").show();
                $("#DELAY_DAYS_ICC").val("");
                $("#DELAY_REASON_ICC").val("");

                $scope.INVESTIGATOR_TYPE_NAME = $("#SessionUserType_ICC").val();
                $scope.INVESTIGATOR_TYPE_CODE = $("#SessionUserTypeID_ICC").val();


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
                $("#MakeApproved_ICC").css('display', 'none');                

                ShowLoader();
                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationICC/GetInvestigationForEdit',
                    async: false,
                    data: { Identity: FormIdentity_ICC },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") {
                    }
                    else {

                        var Data = JSON.parse(response.data);
                        var HeaderData = Data["Header"];

                        $("#INVESTIGATION_ID").val(FormIdentity_ICC);
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


                        $scope.DELAY_DAYS_ICC = HeaderData[0]["DELAY_DAYS_ICC"];
                        $scope.DELAY_REASON_ICC = HeaderData[0]["DELAY_REASON_ICC"];

                        if (HeaderData[0]["DELAY_CHECK"] == "True") {
                            $("#DELAY").prop('checked', true);
                            $(".DelayGroup_ICC").show();
                            $(".DelayGroupDummy_ICC").hide();
                        }
                        else {
                            $(".DelayGroup_ICC").hide();
                            $(".DelayGroupDummy_ICC").show();
                        }

                        if (HeaderData[0]["NOTICE_TYPE"] == "System") {
                            $("#System").prop('checked', true);
                        }
                        else if (HeaderData[0]["NOTICE_TYPE"] == "Manual") {
                            $("#Manual").prop('checked', true);
                        }


                        $scope.INVESTIGATOR_TYPE_NAME = HeaderData[0]["INVESTIGATOR_TYPE_NAME"];
                        $scope.INVESTIGATOR_TYPE_CODE = HeaderData[0]["INVESTIGATOR_TYPE_CODE"];
                        $scope.INVESTIGATION_DONE_BY_NAME = HeaderData[0]["INVESTIGATION_DONE_BY_NAME"];
                        $scope.INVESTIGATION_DONE_BY_CODE = HeaderData[0]["INVESTIGATION_DONE_BY_CODE"];

                        $scope.VISITED_DATE = (HeaderData[0]["VISITED_DATE"]);
                        $("#VISITED_DATE").datepicker("setDate", HeaderData[0]["VISITED_DATE"]);


                        $scope.PREVIOUS_VISITED_DATE = (HeaderData[0]["PREVIOUS_VISITED_DATE"]);
                        $("#PREVIOUS_VISITED_DATE").datepicker("setDate", HeaderData[0]["PREVIOUS_VISITED_DATE"]);

                        $scope.SALES_REPRESENTATIVE_CODE = HeaderData[0]["SALES_REPRESENTATIVE_CODE"];
                        $scope.SALES_REPRESENTATIVE_NAME = HeaderData[0]["SALES_REPRESENTATIVE_NAME"];

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
                        //$scope.StateFilter_ICC = HeaderData[0]["STATE_CODE"];
                        $scope.SITEDETAIL_CODE = HeaderData[0]["SITEDETAIL_CODE"];
                        $scope.COMPANYDETAIL_CODE = HeaderData[0]["COMPANYDETAIL_CODE"];

                        $scope.CUSTOMER_CODE = HeaderData[0]["CUSTOMER_CODE"];
                        $scope.CUSTOMER_NAME = HeaderData[0]["CUSTOMER_NAME"];

                        if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "ALL") {
                            $scope.PRODUCT_CATEGORY_CODE = "ALL";
                            $scope.PRODUCT_CATEGORY_NAME = "ALL";
                        } else {
                            $scope.PRODUCT_CATEGORY_CODE = HeaderData[0]["PRODUCT_CATEGORY_CODE"];
                            $scope.PRODUCT_CATEGORY_NAME = HeaderData[0]["PRODUCT_CATEGORY_NAME"];
                        }

                        //$scope.PRODUCT_CATEGORY_CODE = HeaderData[0]["PRODUCT_CATEGORY_CODE"];
                        //$scope.PRODUCT_CATEGORY_NAME = HeaderData[0]["PRODUCT_CATEGORY_NAME"];

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
                            $("#ObservationByHil").text("Root cause analysis for the complaint");
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
                        $scope.PREVENTIVE_ACTION = HeaderData[0]["PREVENTIVE_ACTION"];                        

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
                        var MyField = $("#HiddenForCMS_ICC").val();

                        if (IS == "DRAFT") {
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_ICC").val(), FormCode: 'INV' }) },
                                data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_ICC").val(), FormCode: 'INVST_ICC' }) },
                                success: function (AccessData) {
                                    if (AccessData == "") {
                                        $("#SendInvestigationApproval_ICC").css('display', 'none');
                                        $("#CompInvSave_ICC").css('display', 'none');
                                    }
                                    else {
                                        AccessData = JSON.parse(AccessData);
                                        if (AccessData[0]["IS_UPDATE"] == true) {
                                            $("#SendInvestigationApproval_ICC").css('display', 'block');
                                            $("#CompInvSave_ICC").css('display', 'block');
                                        }
                                        else {
                                            $("#SendInvestigationApproval_ICC").css('display', 'none');
                                            $("#CompInvSave_ICC").css('display', 'none');

                                        }
                                    }
                                }
                            });

                        }
                        else if (IS == "Approved" || IS == "Rejected") {
                            //alert("No Changes are allowed as the Document Status is " + IS);

                            var UserTypeCode = $("#SessionUserTypeID_ICC").val();

                            if ((IS == "Approved") && (UserTypeCode == "CSM" || UserTypeCode == "QH") || UserTypeCode == "CSM_BU2" || UserTypeCode == "CSM_BU3") {

                                $("#CompInvSave_ICC").css('display', 'none');
                                $("#SendInvestigationApproval_ICC").css('display', 'none');
                                $("#SuperSaveInvestigation_ICC").css('display', 'block');

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

                                $("#CompInvSave_ICC").css('display', 'none');

                                $("#SendInvestigationApproval_ICC").css('display', 'none');
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

                                $("#CompInvSave_ICC").css('display', 'none');
                                $("#SendInvestigationApproval_ICC").css('display', 'none');

                            }
                            else {


                                $.ajax({
                                    url: '../../Users/GetRightToAccess',
                                    type: 'GET',
                                    //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_ICC").val(), FormCode: 'INV' }) },
                                    data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID_ICC").val(), FormCode: 'INVST_ICC' }) },
                                    success: function (AccessData) {
                                        if (AccessData == "") {
                                            $("#PendingApprovalsList_ICC").css('display', 'block');
                                            $("#InvList_ICC").css('display', 'none');
                                            $("#CompInvSave_ICC").css('display', 'none');
                                            $("#InvNew_ICC").css('display', 'none');
                                            $("#SendInvestigationApproval_ICC").css('display', 'none');
                                            $("#MakeApproved_ICC").css('display', 'none');                                            
                                        }
                                        else {
                                            AccessData = JSON.parse(AccessData);
                                            if (AccessData[0]["IS_APPROVE"] == true) {
                                                $("#PendingApprovalsList_ICC").css('display', 'block');
                                                $("#InvList_ICC").css('display', 'none');
                                                $("#CompInvSave_ICC").css('display', 'block');
                                                $("#InvNew_ICC").css('display', 'none');
                                                $("#SendInvestigationApproval_ICC").css('display', 'none');
                                                $("#MakeApproved_ICC").css('display', 'block');                                                
                                            }
                                            else {
                                                $("#PendingApprovalsList_ICC").css('display', 'block');
                                                $("#InvList_ICC").css('display', 'none');
                                                $("#CompInvSave_ICC").css('display', 'none');
                                                $("#InvNew_ICC").css('display', 'none');
                                                $("#SendInvestigationApproval_ICC").css('display', 'none');
                                                $("#MakeApproved_ICC").css('display', 'none');                                                
                                            }
                                        }
                                    }
                                });

                            }
                        }

                        $("#StateFilter_ICC").val(HeaderData[0]["STATE_CODE"]);
                        $("#CMSState_ICC").val(HeaderData[0]["STATE_CODE"]);

                        $("#HiddenForCMS_ICC").val("");
                        //SheetingLabels(HeaderData[0]["PRODUCT_CATEGORY_CODE"]);
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

        if (MasterType == "COMPLAINT_NUMBER_ICC") {

            if ($("#COMPLAINT_TRACKING_NO").val() == "") {

            }
            else {
                alert("Select a new one. This Investigation already reserved for Tracking No: " + $("#COMPLAINT_TRACKING_NO").val());
                return;
            }

            var StateFilter_ICC = $("#StateFilter_ICC").val();

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
                STATE_CODE: StateFilter_ICC
            });
        }
        else if (MasterType == "Prod_Cat_Mast" || MasterType == "GetPlantMaster" || MasterType == "SUPPLIER_TYPE_CODE_ICC") {
            var BusinessUnit = $("#PRODUCT_TYPE_NAME").val();

            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit
            });
        }
        else if (MasterType == "GetProductMaster_ICC") {

            var PRODUCT_TYPE_CODE = $("#PRODUCT_TYPE_CODE").val();
            var PRODUCT_CATEGORY_CODE = $("#PRODUCT_CATEGORY_CODE").val();
            var INVOICE_NO = "";

            //if ($("#InvoiceNoB").val() == "") {
            //    INVOICE_NO = $("#INVOICE_NO").val();
            //} else {
            //    INVOICE_NO = $("#InvoiceNoB").val();
            //}

            //if (PRODUCT_TYPE_CODE == "SBU3" && INVOICE_NO == "" && Methodname != "GetProductMasterInvBU3_ICC") {
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

                var StateFilter_ICC = $("#StateFilter_ICC").val();
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
                    StateFilter_ICC: $("#StateFilter_ICC").val(),
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

                var StateFilter_ICC = $("#StateFilter_ICC").val();
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
                    MasterType: "StockistMasterBU3MSD_ICC",
                    StateFilter_ICC: $("#StateFilter_ICC").val(),
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

    $scope.SaveInvestigationData_ICC = function () {
        try {
            var FormIdentity_ICC = $("#FormIdentity_ICC").val();
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

            if ($scope.FormIdentity_ICC == "" || $scope.FormIdentity_ICC == undefined) {
                $scope.FormIdentity_ICC = "";
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
                //console.log("Flag : " + Flag);
                return;
            }
            else {
                var COMPLAIN_DESC = $("#COMPLAIN_DESC").val();
                var DELAY = $("#DELAY").is(":checked");
                if (DELAY == true) {
                    if ($scope.DELAY_DAYS_ICC == undefined) { $scope.DELAY_DAYS_ICC = ""; }
                    if ($scope.DELAY_REASON_ICC == undefined) { $scope.DELAY_REASON_ICC = ""; }
                }
                else {
                    DELAY = false;
                    $scope.DELAY_DAYS_ICC = "";
                    $scope.DELAY_REASON_ICC = "";
                }                

                var InvestigationData = JSON.stringify({
                    FormIdentity_ICC: $("#FormIdentity_ICC").val(),
                    STATE_CODE: $("#StateFilter_ICC").val(),
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
                    DELAY_DAYS: $("#DELAY_DAYS_ICC").val(),
                    DELAY_REASON: $("#DELAY_REASON_ICC").val(),
                    SALES_REPRESENTATIVE_CODE: $("#SALES_REPRESENTATIVE_CODE").val(),
                    APPROVED_DATE: $("#APPROVED_DATE").val(),
                    NOTICE_TYPE: NOTICE_TYPE,
                    FilesPath: $("#SelectedFiles").text(),

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
                    
                    PREVENTIVE_ACTION: $("#PREVENTIVE_ACTION").val(),
                    CUSTOMER_CODE: $("#CUSTOMER_CODE").val(),
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
                    url: '../../ComplaintRegistrationICC/SaveInvestigation',
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
                                $("#FormIdentity_ICC").val(RD["ID"]);
                                $("#INVESTIGATION_ID").val(RD["ID"]);
                                $("#SendInvestigationApproval_ICC").css("display", "block");
                            }
                        }
                    }
                    if ($("#INVESTIGATION_STATUS").val() == "DRAFT") {
                        $("#SendInvestigationApproval_ICC").css('display', 'block');
                    }
                    else {
                        $("#SendInvestigationApproval_ICC").css('display', 'none');
                    }
                    $("#MyTest").val("");
                    //go('InvestigationList_ICC');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }

        }
        catch (e) {
            alert("Error :SaveInvestigationData_ICC : " + e);
            console.log("Error :SaveInvestigationData_ICC : " + e);
        }
    }

    $scope.SendInvestigationForApproval_ICC = function () {
        try {
            //console.clear();

            if (confirm("Do you want to Send for review?")) {
            }
            else {
                return;
            }

            $("#MyTest").val("ASD");
            $scope.SaveInvestigationData_ICC();

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

            var FormIdentity_ICC = $("#FormIdentity_ICC").val();

            if (Flag > 0) {
                alert("Please fill All Mandatory fields before sending for Approval");
                $("#MyTest").val("");
                return;
            }
            else if (FormIdentity_ICC == "") {
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
                    FormIdentity_ICC: FormIdentity_ICC,
                    COMPLAINT_TRACKING_NO: $("#COMPLAINT_TRACKING_NO").val(),
                    CREATED_BY: $("#CreatedByCode").val(),
                    FORM_NAME: "Investigation_ICC"
                });

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationICC/SendForApproval',
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

                        $("#CompInvSave_ICC").css('display', 'none');
                        $("#SendInvestigationApproval_ICC").css('display', 'none');
                        $scope.INVESTIGATION_STATUS = "Waiting for Approval";
                        $scope.go('InvestigationList_ICC');
                        //$scope.MakeApproved_ICC('Approved');
                    }
                    //go('InvestigationList_ICC');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });

            }
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }

    $scope.GetApprovalPopUp_ICC = function () {
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

    $scope.MakeApproved_ICC = function (DECISION) {
        try {
            //if (confirm("Do you want to Approve?")) {
            //}
            //else {
            //    return;
            //}

            $("#MyTest").val("ASD");
            $scope.SaveInvestigationData_ICC();

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
                    FORM_NAME: "Investigation_ICC",
                    DECISION: DECISION,
                    APPROVALS_REMARKS: APPROVALS_REMARKS,
                    SALES_REPRESENTATIVE_CODE: $("#SALES_REPRESENTATIVE_CODE").val(),
                    SALES_REPRESENTATIVE_NAME: $("#SALES_REPRESENTATIVE_NAME").val()
                });

                $("#ApprovalsActionForm").modal('hide');

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistrationICC/MakeApproval',
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

                        $("#CompInvSave_ICC").css('display', 'none');
                        $("#MakeApproved_ICC").css('display', 'none');                        
                        //$scope.go('ComplaintPendingApproval_ICC');
                        $scope.go('InvestigationList_ICC');
                    }
                    //go('ComplaintPendingApproval_ICC');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }
        }
        catch (e) {
            alert("Error :MakeAprovedInv : " + e);
        }
    }    

    $scope.StateChange_ICC = function () {
        try {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
            $("#CMSState_ICC").val(StateFilter_ICC);
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }    
});
//Complaint pop up
function GetComplaint_No_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        InvestigationScope_ICC.COMPLAINT_NUMBER = $(obj).children().eq(1).html();

        if ($(obj).children().eq(1).html() == undefined || $(obj).children().eq(1).html() == null || $(obj).children().eq(1).html() == "") {
        }
        else {
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistrationICC/PopulateComplaintInToInvestigation',
                async: false,
                data: { ComplaintNumber: $(obj).children().eq(1).html() },
            }).then(function successCallback(response) {
                var Data = JSON.parse(response);
                var HeaderData = Data["Header"];

                $("#StateFilter_ICC").val(HeaderData[0]["STATE_CODE"]);
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
                $("#SALES_REPRESENTATIVE_CODE").val(HeaderData[0]["SALES_REPRESENTATIVE_CODE"]);
                $("#SALES_REPRESENTATIVE_NAME").val(HeaderData[0]["SALES_REPRESENTATIVE_NAME"]);
                
                $("#COMPLAINT_ATTENDED_DATE").datepicker('setEndDate', TodayDateTime);
                $("#VISITED_DATE").datepicker('setEndDate', TodayDateTime);
                $("#INVESTIGATION_DATE").datepicker('setEndDate', TodayDateTime);

                //$("#COMPLAINT_ATTENDED_DATE").val("");
                //$("#VISITED_DATE").val("");
                $("#INVESTIGATION_DATE").datepicker("setDate", TodayDateTime);
                $("#SelectedComplaintFiles").append(HeaderData[0]["ATTACHMENTS"]).trigger('change');

                $("#CMSState_ICC").val(HeaderData[0]["STATE_CODE"]);

                $("#PRODUCT_TYPE_NAME").val(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                $("#PRODUCT_TYPE_CODE").val(HeaderData[0]["PRODUCT_TYPE_CODE"]);

                $("#CUSTOMER_CODE").val(HeaderData[0]["CUSTOMER_CODE"]);
                $("#CUSTOMER_NAME").val(HeaderData[0]["CUSTOMER_NAME"]);

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
                    $("#ObservationByHil").text("Root cause analysis for the complaint");
                    $("#MatSupDet_BU3").css("display", "block");
                    $(".NoticeTypeClass").css("display", "none");                    
                }

                $("#NATURE_OF_COMPLAINT").val(HeaderData[0]["NATURE_OF_COMPLAINT"]);

                $("#END_CUSTOMER_DETAILS").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                
                $("#SITE_ADDRESS").val(HeaderData[0]["SITE_ADDRESS"]);

                $("#REMARKS").val(HeaderData[0]["REMARKS"]);
                $("#PREVENTIVE_ACTION").val(HeaderData[0]["PREVENTIVE_ACTION"]);

                $("#COMPLAINT_REGISTERED_CODE").val(HeaderData[0]["ID"]);
                $("#COMPLAINT_REGISTERED_DOC_SERIES_CODE").val(HeaderData[0]["DOC_SERIES_CODE"]);

                $("#COMPLAINT_TYPE_CODE").val(HeaderData[0]["COMPLAINT_TYPE_CODE"]);
                $("#COMPLAINT_TYPE_NAME").val(HeaderData[0]["COMPLAINT_TYPE_NAME"]);

                $("#COMPLAIN_DESC").val(HeaderData[0]["COMPLAINT_DESC"]);                

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
function GetInvestigator_Type_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        //InvestigationScope_ICC.Investigator_Type_ID = $(obj).children().eq(0).html();
        InvestigationScope_ICC.INVESTIGATOR_TYPE_CODE = $(obj).children().eq(1).html();
        InvestigationScope_ICC.INVESTIGATOR_TYPE_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//User pop master pop up
function GetInvestigation_Done_By_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        //InvestigationScope_ICC.Investigation_Done_By_ID = $(obj).children().eq(0).html();
        InvestigationScope_ICC.INVESTIGATION_DONE_BY_CODE = $(obj).children().eq(1).html();
        InvestigationScope_ICC.INVESTIGATION_DONE_BY_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//Series code pop up
function GetIGS_Series_Code_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        InvestigationScope_ICC.DOC_SERIES_CODE = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetPlantMasterInvBU3_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        $("#PLANT_CODE").val($(obj).children().eq(1).html());
        $("#PLANT_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetProductSuppliedFromInvBU3_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {

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
function GetProductMasterInvBU3_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        $("#PRODUCT_CODE").val($(obj).children().eq(1).html());
        $("#PRODUCT_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
function GetProductMasterInvSDBU3_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        $("#CMS_INV_SD_BU3_ICC_PRODUCT_CODE").val($(obj).children().eq(1).html());
        $("#CMS_INV_SD_BU3_ICC_PRODUCT_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetDefectTypeMasterInvBU3_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {
        $("#CMS_INV_SD_BU3_ICC_DEFECT_TYPE_CODE").val($(obj).children().eq(1).html());
        $("#CMS_INV_SD_BU3_ICC_DEFECT_TYPE_NAME").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetMSD_NameInvBU3_ICC(obj) {
    InvestigationScope_ICC.$apply(function () {

        $("#SUPPLIER_CODE").val($(obj).children().eq(1).html());
        $("#SUPPLIER_NAME").val(($(obj).children().eq(2).html()).replace("&amp;", "&"));

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

DIMS.controller('InvestigationListCtrl_ICC', function ($scope, $location, DIMSFactory) {
    InvestigationListScope = $scope;
    $scope.InvestigationList_ICC = [];
    angular.element(document).ready(function () {
        $("#HiddenForCMS_ICC").val("");

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            //data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ICC").val(), FormCode: 'INV' }) },
            data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ICC").val(), FormCode: 'INVST_ICC' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#CreateNewInvestigation_ICC").css('display', 'none');
                    $("#InvestigationListSection_ICC").css('display', 'none');
                    $("#StateFilter_ICC").css('display', 'none');
                }
                else {

                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#InvestigationListSection_ICC").css('display', 'block');
                    }
                    else {
                        $("#InvestigationListSection_ICC").css('display', 'none');
                        $("#StateFilter_ICC").css('display', 'none');
                    }

                    //console.log("IS_ADD : " + AccessData[0]["IS_ADD"]);

                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#CreateNewInvestigation_ICC").css('display', 'block');
                    }
                    else {
                        $("#CreateNewInvestigation_ICC").css('display', 'none');
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: '../../ComplaintRegistrationICC/FillCMSStateFilter',
                    async: true,
                    success: function (response) {
                        $("#StateFilter_ICC").empty();
                        if (response != "") {
                            response = JSON.parse(response);
                            //Start of All option for Complaint Registration_ICC List
                            var UserCode_ICC = $("#UserCode_ICC").val();
                            var SessionUserType = $("#UserType_ICC").val();

                            if (UserCode_ICC == "2021" || UserCode_ICC == "2019" || UserCode_ICC == "50001234" || SessionUserType == "QAM_SBU3" || SessionUserType == "RSH_BU3" || SessionUserType == "NSH_BU3" || SessionUserType == "CSM_BU3" || SessionUserType == "QAM_SBU2" || SessionUserType == "CSM_BU2" || SessionUserType == "Plant_MHD") {
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

                            var WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' ";

                            if (UserType_ICC == "STOCKIST" || UserType_ICC == "BU2_STK" || UserType_ICC == "BU3_STK") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.DOC_STATUS!='' AND CMS_INV_ICC.CUSTOMER_CODE='" + UserCode_ICC + "'";
                            }
                            else if (UserCode_ICC == "50000822" || UserCode_ICC == "50002304" || UserCode_ICC == "KAM") {
                                if (StateFilter_ICC == "ALL") {
                                    WhereClause = " WHERE CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU2' AND CMS_INV_ICC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU2' AND CMS_INV_ICC.DOC_STATUS!='' ";
                                }
                            }
                            else if (UserCode_ICC == "50000985") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.DOC_STATUS!=''";
                            }
                            else if (UserType_ICC == "SH_BU3") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.DOC_STATUS!='' AND CMS_INV_ICC.CREATED_BY='" + UserCode_ICC + "'";
                            }
                            else if (UserType_ICC == "RSH_BU3" || UserType_ICC == "NSH_BU3") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.DOC_STATUS!=''";
                            }
                            else if (UserCode_ICC == "2019" || UserCode_ICC == "2021" || UserCode_ICC == "50001234" || UserType_ICC == "QAM_SBU3" || UserType_ICC == "CSM_BU3" || UserType_ICC == "Plant_MHD" || UserType_ICC == "MDO") {

                                if (StateFilter_ICC == "ALL") {
                                    WhereClause = " WHERE CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.DOC_STATUS!='' ";
                                }
                            }
                            else if (UserType_ICC == "FSO") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU1' AND CMS_INV_ICC.DOC_STATUS!='' AND (CMS_INV_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_INV_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "FSO_BU2") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND (CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_INV_ICC.DOC_STATUS!='' AND (CMS_INV_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_INV_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "FSO_BU3") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.DOC_STATUS!='' AND (CMS_INV_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_INV_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "FSO_BU2_BU3") {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND (CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_INV_ICC.DOC_STATUS!='' AND (CMS_INV_ICC.CREATED_BY='" + UserCode_ICC + "' OR CMS_INV_ICC.SALES_REPRESENTATIVE_CODE='" + UserCode_ICC + "') ";
                            }
                            else if (UserType_ICC == "QAM_SBU2" || UserType_ICC == "CSM_BU2") {
                                if (StateFilter_ICC == "ALL") {
                                    WhereClause = " WHERE (CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_INV_ICC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND (CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU2' or CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3') AND CMS_INV_ICC.DOC_STATUS!='' ";
                                }
                            }
                            else {
                                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU1' AND CMS_INV_ICC.DOC_STATUS!='' ";
                            }

                            var Data = JSON.stringify({
                                MasterType: "ComplaintRegistrationList_ICC",
                                ID: "561",
                                UserCode: $("#UserCode_ICC").val(),
                                "Type": "Get",
                                ReportName: "InvestigationList_ICC",
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

                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "InvestigationList_ICC", UserSelectedColumnName);
                                    $('#InvestigationList_ICC tbody').on('click', 'tr', function () {
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
                                                //data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ICC").val(), FormCode: 'INV' }) },
                                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ICC").val(), FormCode: 'INVST_ICC' }) },
                                                success: function (AccessData) {
                                                    if (AccessData == "") {
                                                    }
                                                    else {
                                                        AccessData = JSON.parse(AccessData);
                                                        if (AccessData[0]["IS_VIEW"] == true || AccessData[0]["IS_UPDATE"] == true) {
                                                            var scope = angular.element($("#InvestigationlistDiv_ICC")).scope();
                                                            scope.$apply(function () {
                                                                scope.go("Investigation_ICC/" + ID);
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

    $scope.StateChange_ICC = function () {
        try {
            var StateFilter_ICC = $("#StateFilter_ICC").val();
            $("#CMSState_ICC").val(StateFilter_ICC);
            var UserCode_ICC = $("#UserCode_ICC").val();
            //var WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "'  ORDER BY CMS_INV_ICC.ID DESC ";
            var WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' ";
            var UserType_ICC = $("#UserType_ICC").val();

            if (UserCode_ICC == "50003209") {
                if (StateFilter_ICC == "ALL") {
                    WhereClause = " WHERE CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.INVESTIGATION_STATUS!=''";
                } else {
                    WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.INVESTIGATION_STATUS!='' ";
                }
            } else {
                WhereClause = " WHERE CMS_INV_ICC.STATE_CODE='" + StateFilter_ICC + "' AND CMS_INV_ICC.PRODUCT_TYPE_CODE='SBU3' AND CMS_INV_ICC.INVESTIGATION_STATUS!='' AND CMS_INV_ICC.CREATED_BY='" + UserCode_ICC + "' ";
            }

            var Data = JSON.stringify({
                MasterType: "ComplaintRegistrationList_ICC",
                ID: "561",
                UserCode: $("#UserCode_ICC").val(),
                "Type": "Get",
                ReportName: "InvestigationList_ICC",
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

                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "InvestigationList_ICC", UserSelectedColumnName);
                    $('#InvestigationList_ICC tbody').on('click', 'tr', function () {
                        var ID = $(this).find('td:eq(1)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {

                        }
                        if (ID != "") {
                            var scope = angular.element($("#InvestigationlistSTODiv")).scope();
                            scope.$apply(function () {
                                scope.go("Investigation_ICC/" + ID);
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
        if (ControllerName != "InvestigationListCtrl_ICC") {
            ControllerName = "InvestigationListCtrl_ICC";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "InvestigationListCtrl_ICC");

            $compile(elem.contents())(complaintRegistrationScope);
        }

        $("#ColumnEditingModal").modal('show');




    }
    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing = function () {
        DIMSFactory.ViewColumnEditing("InvestigationList_ICC", $("#UserCode_ICC").val(), " ORDER BY ID DESC"); // 1-Report Name ,2-UserCode_ICC(561),3-WhereClause
    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var StateFilter_ICC = $("#StateFilter_ICC").val();
        var WhereClause = " WHERE CUST.STOCKIST_ID=INV.Customer_Code AND INV.STATE_CODE='" + StateFilter_ICC + "' ORDER BY INV.ID ";
        var Data = JSON.stringify({
            MasterType: "InvestigationList_ICC",
            ID: "561",
            UserCode: $("#UserCode_ICC").val(),
            "Type": "Get",
            ReportName: "InvestigationList_ICC",
            WhereClause: WhereClause
        });
        //DIMSFactory.SaveColumnEditingData("Compensation", $scope.UserCode_ICC, " ORDER BY ID DESC");
        DIMSFactory.SaveColumnEditingData_InputParameter("InvestigationList_ICC", $("#UserCode_ICC").val(), WhereClause, Data, "InvestigationList_ICC");
        // 1-Report Name ,2-UserCode_ICC(561),3-WhereClause,4-JsonData,5-Frontend datatable id


    }
});
