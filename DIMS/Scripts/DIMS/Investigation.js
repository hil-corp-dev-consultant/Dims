var InvestigationScope;



//Investigation Controller
DIMS.controller('InvestigationCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    InvestigationScope = $scope;
    $scope.SITEDETAIL_CODEs = $("#SITEDETAIL_CODE").val();
    $scope.templatesettings = { HeaderTitle: "InvestigationCtrl" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    angular.element(document).ready(function () {

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INVST' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#InvestigationNewView").css('display', 'none');
                    $("#PendingApprovalsList").css('display', 'none');
                    $("#InvList").css('display', 'none');
                    $("#CompInvSave").css('display', 'none');
                    $("#InvNew").css('display', 'none');
                    $("#SendInvestigationApproval").css('display', 'none');
                    $("#MakeApproved").css('display', 'none');
                    $("#StateFilter").css('display', 'none');
                }
                else {

                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#InvList").css('display', 'block');
                    }
                    else {
                        $("#InvList").css('display', 'none');
                        $("#StateFilter").css('display', 'none');
                    }


                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#InvestigationNewView").css('display', 'block');
                    }
                    else {
                        $("#InvestigationNewView").css('display', 'none');
                        $("#StateFilter").css('display', 'none');
                    }

                }

            }
        });

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

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });

        if ($routeParams.ID == undefined || $routeParams.ID == "") {
            $("#FormIdentity").val("").trigger('change');
        }
        else {
            $("#FormIdentity").val($routeParams.ID).trigger('change');
        }

        try {
            $scope.IGS_Series_Code = "INVSZ12";
            var FormIdentity = $("#FormIdentity").val();

            if (FormIdentity == "" || FormIdentity == null || FormIdentity == undefined) {

                $("#Total_Supply_Oty_Mtrs").val("0");
                $("#Total_Breakage_Qty_Mtrs").val("0");
                $("#Total_Recovery_Mtrs").val("0");
                $("#Net_Loss_Mtrs").val("0");

                $("#Total_Supply_Qty_Tons").val("0");
                $("#Total_Breakage_Qty_Tons").val("0");
                $("#Total_Recovery_Tons").val("0");
                $("#Net_Loss_Tons").val("0");


                $("#SendInvestigationApproval").css('display', 'none');
                $("#InvNew").css('display', 'none');

                $("#MakeApproved").css('display', 'none');

                $(".DelayGroup").hide();
                $(".DelayGroupDummy").show();
                $("#DelayDays").val("");
                $("#DelayReason").val("");

                $scope.Investigator_Type = $("#SessionUserType").val();
                $scope.Investigator_Type_CODE = $("#SessionUserTypeID").val();


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


                $scope.Investigation_Date = today;
                $("#Investigation_Date").datepicker("setDate", TodayDateTime);


                $scope.Investigation_Status = "DRAFT";
                $("#Investigation_Status").val($scope.Investigation_Status).trigger('change');
                $scope.ShowStatus = "Under Investigation";

                $scope.Investigation_Done_By = $("#CreatedBy").val();
                $scope.Investigation_Done_By_CODE = $("#CreatedByCode").val();

            }
            else {

                $("#MakeApproved").css('display', 'none');
                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start
                $("#is_rejectable").attr('disabled', 'disabled');
                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end
                ShowLoader();
                // var FormIdentity = $("#FormIdentity").val();
                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistration/GetInvestigationForEdit',
                    async: false,
                    data: { Identity: FormIdentity },
                }).then(function successCallback(response) {
                    debugger
                    if (response.data == "FALSE") {
                    }
                    else {

                        var Data = JSON.parse(response.data);
                        var HeaderData = Data["Header"];

                        $("#Investigation_Id").val(FormIdentity);
                        $scope.Complaint_No = HeaderData[0]["COMPLAINT_NUMBER"];

                        $scope.Complaint_Tracking_No = HeaderData[0]["COMPLAINT_TRACKING_NO"];

                        $scope.Complaint_Received_Date = (HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#Complaint_Received_Date").datepicker("setDate", (HeaderData[0]["COMPLAINT_RECEIVED_DATE"]));

                        $scope.Complaint_Registered_Date = (HeaderData[0]["COMPLAINED_REGISTER_DATE"]);
                        $("#Complaint_Registered_Date").datepicker("setDate", (HeaderData[0]["COMPLAINED_REGISTER_DATE"]));

                        $scope.Complaint_Attended_Date = (HeaderData[0]["COMPLAINED_ATTENDED_DATE"]);

                        $("#Complaint_Attended_Date").datepicker("setDate", (HeaderData[0]["COMPLAINED_ATTENDED_DATE"]));
                        $("#Complaint_Attended_Date").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#Visited_Date").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#Investigation_Date").datepicker('setStartDate', HeaderData[0]["Complaint_Received_Date"]);


                        $scope.DelayDays = HeaderData[0]["DELAY_DAYS"];
                        $scope.DelayReason = HeaderData[0]["DELAY_REASON"];

                        if (HeaderData[0]["DELAY_CHECK"] == "True" || HeaderData[0]["DELAY_CHECK"] == "true") {
                            $("#Delay").prop('checked', true);
                            $(".DelayGroup").show();
                            $(".DelayGroupDummy").hide();
                        }
                        else {
                            $(".DelayGroup").hide();
                            $(".DelayGroupDummy").show();
                        }

                        if (HeaderData[0]["NoticeType"] == "System") {
                            $("#System").prop('checked', true);
                        }
                        else if (HeaderData[0]["NoticeType"] == "Manual") {
                            $("#Manual").prop('checked', true);
                        }


                        $scope.SD_InvoiceDetails = HeaderData[0]["InvoiceDetails"];
                        $scope.SD_ProductDetails = HeaderData[0]["ProductDetails"];

                        $scope.Investigator_Type = HeaderData[0]["INVESTIGATOR_TYPE_NAME"];
                        $scope.Investigator_Type_CODE = HeaderData[0]["INVESTIGATOR_TYPE_CODE"];

                        $scope.Investigation_Done_By = HeaderData[0]["Investigation_Done_By_NAME"];
                        $scope.Investigation_Done_By_CODE = HeaderData[0]["Investigation_Done_By_CODE"];

                        $scope.Visited_Date = HeaderData[0]["VISITED_DATE"];
                        $("#Visited_Date").datepicker("setDate", HeaderData[0]["VISITED_DATE"]);


                        $scope.Previous_Visit_Date = (HeaderData[0]["PREVIOUS_VISITED_DATE"]);
                        $("#Previous_Visit_Date").datepicker("setDate", HeaderData[0]["PREVIOUS_VISITED_DATE"]);

                        $scope.SalesRepresentativeEmployeeCode = HeaderData[0]["SALES_REPRESENTATIVE_CODE"];
                        $scope.SalesRepresentativeEmployeeName = HeaderData[0]["SALES_REPRESENTATIVE_NAME"];

                        $scope.Investigation_Id = HeaderData[0]["ID"];
                        $scope.IGS_Series_Code = HeaderData[0]["DOC_SERIES_CODE"];

                        if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                            $scope.IGS_Series_Code = "INVSZ12";
                        }

                        $scope.Investigation_Date = (HeaderData[0]["DOC_DATE"]);
                        $("#Investigation_Date").datepicker("setDate", HeaderData[0]["DOC_DATE"]);

                        $scope.Investigation_Status = HeaderData[0]["DOC_STATUS"];
                        $scope.ShowStatus = HeaderData[0]["ShowStatus"];

                        $scope.Approval_Date = (HeaderData[0]["APPROVED_DATE"]);
                        $scope.CREATED_IN = HeaderData[0]["CREATED_IN"];
                        $("#CREATED_IN").val(HeaderData[0]["CREATED_IN"]);
                        $("#SelectedComplaintFiles").append(HeaderData[0]["Complaint_Attachments"]).trigger('change');
                        $("#SelectedFiles").append(HeaderData[0]["Investigation_Attachments"]).trigger('change');
                        $("#Investigation_Status").val($scope.Investigation_Status).trigger('change');
                        $scope.Customer_Code = HeaderData[0]["Customer_Code"];
                        $scope.Customer_Name = HeaderData[0]["CUSTOMER_NAME"];

                        $scope.Customer_Type = HeaderData[0]["Customer_type_Name"];
                        $scope.Customer_Type_CODE = HeaderData[0]["Customer_type_Code"];
                        $scope.Contact_Area_ID = HeaderData[0]["AREA_ID"];
                        $scope.Contact_Area_CODE = HeaderData[0]["AREA_CODE"];
                        $scope.Contact_State_CODE = HeaderData[0]["STATE_CODE"];
                        $scope.SITEDETAIL_CODE = HeaderData[0]["SITEDETAIL_CODE"];
                        $scope.COMPANYDETAIL_CODE = HeaderData[0]["COMPANYDETAIL_CODE"];

                        $scope.Customer_Location = HeaderData[0]["cusomer_location"];
                        $scope.Contact_City = HeaderData[0]["CITY_NAME"];
                        $scope.Contact_State = HeaderData[0]["STATE_NAME"];
                        $scope.Contact_Area = HeaderData[0]["AREA_NAME"];

                        $scope.Contact_Person = HeaderData[0]["CONTACT_PERSON"];
                        $scope.Contact_Number = HeaderData[0]["Phone_Number"];
                        $scope.Customer_Fax = HeaderData[0]["Fax"];
                        $scope.Customer_Email = HeaderData[0]["Email"];

                        $scope.Product_CategoryCode = HeaderData[0]["Product_Category_Code"];
                        $scope.Product_Category = HeaderData[0]["PRODUCT_CATEGORY_NAME"];
                        //$scope.Sub_Product_CategoryCode = HeaderData[0]["SUB_PRODUCT_CATEGORY_CODE"];
                        //$scope.Sub_Product_Category = HeaderData[0]["SUB_PRODUCT_CATEGORY"];
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                        if (HeaderData[0]["PRODUCT_CATEGORY_NAME"] == "Blocks") {
                            $("#CompensationinMetricCubic").val("Cubic Meters");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                            $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(3)").html("Volume");
                            $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(4)").html("Cubic Meters");
                        }
                        else {
                            $("#CompensationinMetricCubic").val("Metric Tons");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                        }
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        //if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                        //    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                        //}
                        //else {
                        //    $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                        //}

                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                            $("#ObservationByHil").text("Observations by official");
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                            if (HeaderData[0]["Product_Category_Code"] == "88") {
                                $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            }
                            else {
                                $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                            }
                            $("#ObservationByHil").text("Observations by official");
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["Product_Category_Code"] == "36") {
                            $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                            $("#ObservationByHil").text("Observations by official");
                            $("#THDefectprct").css("display", "none");
                            $("#THBasicAmount").css("display", "none");
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                            $("#CustomerRemarksIfAnyFieldDiv").hide();
                            $("#THDefectprct").css("display", "none");
                            $("#THBasicAmount").css("display", "none");
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            $(".NoticeTypeClass").css("display", "none");

                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 START.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                            $("#CustomerRemarksIfAnyFieldDiv").hide();
                            //$("#THDefectprct").css("display", "block");
                            //$("#THBasicAmount").css("display", "block");
                            $("#Invoice_Based").prop('checked', true);
                            $("#PeriodBasedDiv").hide();
                            $("#PeriodBasedDates").hide();

                            $("#Invoice_List_Division").css('display', 'block');
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            $(".NoticeTypeClass").css("display", "none");

                        }
                        console.log("sbu :" + HeaderData[0]["PRODUCT_TYPE_CODE"]);
                        //VIKAS G, 2023 MAR 20 SBU-8 END.


                        $scope.Product_Type_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"];
                        $scope.Product_Type = HeaderData[0]["PRODUCT_TYPE_NAME"];

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                        if ($scope.Product_Type != "" && $scope.Product_Type != undefined) {
                            if ($scope.Product_Type == "Sheeting" || $scope.Product_Type == "SBU1") {
                                $("#CompensationDiv_Sheeting").show();
                                $("#CompensationDiv_Aerocon").hide();
                                $("#CompensationSize_Details_Div").hide();
                            } else {
                                $("#CompensationDiv_Aerocon").show();
                                $("#CompensationDiv_Sheeting").hide();
                                $("#CompensationSize_Details_Div").show();
                            }
                        }
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        $scope.SubStockiest_Direct_Customer = HeaderData[0]["END_CUSTOMER_DETAILS"];

                        if (HeaderData[0]["Project_Party"] == "True" || HeaderData[0]["Project_Party"] == "true") {
                            $("#Is_Project_Party").prop('checked', true);
                        }

                        $scope.Site_Address = HeaderData[0]["Customer_Address"];

                        if (HeaderData[0]["FREQUENCY_BASED"] == "True" || HeaderData[0]["FREQUENCY_BASED"] == "true") {
                            $("#Period_Based").prop('checked', true);
                            $("#InvoiceBasedDiv").hide();

                            $("#Invoice_List_Division").css('display', 'none');

                        }
                        else if (HeaderData[0]["Invoice_Based"] == "True" || HeaderData[0]["Invoice_Based"] == "true") {
                            $("#Invoice_Based").prop('checked', true);
                            $("#PeriodBasedDiv").hide();
                            $("#PeriodBasedDates").hide();

                            $("#Invoice_List_Division").css('display', 'block');

                        }

                        if (HeaderData[0]["TOTAL_SUPPLY"] == "") {
                            $scope.Total_Supply_Oty_Mtrs = "0";
                        }
                        else {
                            $scope.Total_Supply_Oty_Mtrs = HeaderData[0]["TOTAL_SUPPLY"];
                        }

                        if (HeaderData[0]["Total_Breakage"] == "") {
                            $scope.Total_Breakage_Qty_Mtrs = "0";
                        }
                        else {
                            $scope.Total_Breakage_Qty_Mtrs = HeaderData[0]["Total_Breakage"];
                        }

                        if (HeaderData[0]["Total_Recovery"] == "") {
                            $scope.Total_Recovery_Mtrs = "0";
                        }
                        else {
                            $scope.Total_Recovery_Mtrs = HeaderData[0]["Total_Recovery"];
                        }

                        if (HeaderData[0]["Net_Loss"] == "") {
                            $scope.Net_Loss_Mtrs = "0";
                        }
                        else {
                            $scope.Net_Loss_Mtrs = HeaderData[0]["Net_Loss"];
                        }



                        if (HeaderData[0]["TOTAL_SUPPLY_TON"] == "") {
                            $scope.Total_Supply_Qty_Tons = "0";
                        }
                        else {
                            $scope.Total_Supply_Qty_Tons = HeaderData[0]["TOTAL_SUPPLY_TON"];
                        }



                        if (HeaderData[0]["TOTAL_BREAKAGE_TONS"] == "") {
                            $scope.Total_Breakage_Qty_Tons = "0";
                        }
                        else {
                            $scope.Total_Breakage_Qty_Tons = HeaderData[0]["TOTAL_BREAKAGE_TONS"];
                        }



                        if (HeaderData[0]["TOTAL_RECOVERY_TONS"] == "") {
                            $scope.Total_Recovery_Tons = "0";
                        }
                        else {
                            $scope.Total_Recovery_Tons = HeaderData[0]["TOTAL_RECOVERY_TONS"];
                        }


                        if (HeaderData[0]["NET_LOSS_TONS"] == "") {
                            $scope.Net_Loss_Tons = "0";
                        }
                        else {
                            $scope.Net_Loss_Tons = HeaderData[0]["NET_LOSS_TONS"];
                        }

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                        $scope.Compensation_Mode = HeaderData[0]["COMPENSATION_MODE_NAME"];
                        $scope.Compensation_Mode_Code = HeaderData[0]["COMPENSATION_MODE_CODE"];
                        $scope.Compensation_Mode_ID = HeaderData[0]["COMPENSATION_MODE_ID"];
                        $scope.Any_Special_Remarks = HeaderData[0]["COMMENTS_APPROVALS_SALES_OTHERS"];
                        $("#Compensation_Mode_Code").val(HeaderData[0]["COMPENSATION_MODE_CODE"]);
                        if (HeaderData[0]["COMPENSATION_IN_METERS_SHEET"] != "" && HeaderData[0]["COMPENSATION_IN_METERS_SHEET"] != null)
                            $scope.Compensation_In_Running_Meters = HeaderData[0]["COMPENSATION_IN_METERS_SHEET"];

                        $("#Compensation_In_Running_Meter_Words").val(HeaderData[0]["COMPENSATION_IN__METER_WORDS_SHEET"]);

                        if (HeaderData[0]["RECOMMENDED_SIZE"] != "" && HeaderData[0]["RECOMMENDED_SIZE"] != null) {
                            $scope.Size_Recommendation_RMTS = HeaderData[0]["RECOMMENDED_SIZE"];
                            var No_Of_36 = parseInt(($scope.Size_Recommendation_RMTS) / (3.6));
                            $("#No_of_36").val(No_Of_36);
                        }
                        else {
                            $("#No_of_36").val("0");
                            $("#Size_Recommendation_RMTS").val("0");
                        }

                        if (HeaderData[0]["OTHER_SIZE"] != "" && HeaderData[0]["OTHER_SIZE"] != null)
                            $scope.Other_Size_RMTS = (HeaderData[0]["OTHER_SIZE"]).toFixed(3);

                        if (HeaderData[0]["COMPENSATION_IN_TONS"] != "" && HeaderData[0]["COMPENSATION_IN_TONS"] != null)
                            $scope.Compensation_In_Tons = HeaderData[0]["COMPENSATION_IN_TONS"];

                        if (HeaderData[0]["COMPENSATION_IN_NO"] != "" && HeaderData[0]["COMPENSATION_IN_NO"] != null)
                            $scope.CompensationInNos = HeaderData[0]["COMPENSATION_IN_NO"];

                        $scope.CompensationInNosWords = HeaderData[0]["COMPENSATION_IN_WORD"];

                        if (HeaderData[0]["COMPENSATION_IN_CUBIC_METER"] != "" && HeaderData[0]["COMPENSATION_IN_CUBIC_METER"] != null)
                            $scope.CompensationinMetricCubicValue = HeaderData[0]["COMPENSATION_IN_CUBIC_METER"];

                        if (HeaderData[0]["ISSUE_CREDIT_NOTE"] == "True" || HeaderData[0]["ISSUE_CREDIT_NOTE"] == "true") {
                            $scope.CompensationIssueCreditNote = true;
                            $scope.IssueCredited();
                        }
                        else {
                            $scope.CompensationIssueCreditNote = false;
                        }
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        $scope.Customer_Remarks_if_any = HeaderData[0]["CUSTOMER_REMARKS"];
                        $scope.Observations_by_official = HeaderData[0]["Observations_by_official"];
                        $scope.IR_Remarks = HeaderData[0]["REMARKS"];


                        $scope.CompRegID = HeaderData[0]["complaint_register_id"];
                        $scope.CompRegDocSeries = HeaderData[0]["complaint_register_doc_Series"];
                        $scope.CompRegDocNumber = HeaderData[0]["complaint_register_doc_num"];


                        $scope.ComplaintDescription = HeaderData[0]["COMPLAIN_DESC"];
                        $scope.COMPLAINT_TYPE_CODE = HeaderData[0]["COMPLAINT_TYPE_CODE"];
                        $scope.COMPLAINT_TYPE_NAME = HeaderData[0]["COMPLAINT_TYPE_NAME"];
                        $scope.COMPLAINT_TYPE_ID = HeaderData[0]["COMPLAINT_TYPE_ID"];

                        $scope.COMPLAINT_CATEGORY_CODE = HeaderData[0]["COMPLAINT_CATEGORY_CODE"];
                        $scope.COMPLAINT_CATEGORY_NAME = HeaderData[0]["COMPLAINT_CATEGORY_NAME"];
                        $scope.COMPLAINT_CATEGORY_ID = HeaderData[0]["COMPLAINT_CATEGORY_ID"];


                        $scope.NatureOfComplaint = HeaderData[0]["NatureOfComplaint"];

                        $scope.ComplaintDescribedBySales = HeaderData[0]["COMPLAINT_DESC_SALES"];

                        $scope.ObservationByQAF = HeaderData[0]["ObservationByQAF"];


                        $scope.InvDateSupplyFrom = (HeaderData[0]["Date_Supply_From"]);
                        $("#InvDateSupplyFrom").datepicker("setDate", (HeaderData[0]["Date_Supply_From"]));


                        $scope.InvDateSupplyTo = (HeaderData[0]["Date_Supply_To"]);
                        $("#InvDateSupplyTo").datepicker("setDate", HeaderData[0]["Date_Supply_To"]);

                        $("#CompCatCode").val(HeaderData[0]["COM_CAT_"]);
                        $("#CREATED_DATE").val(HeaderData[0]["CREATED_DATE"]);
                        //svprasadk 24-04-2020 SBU 1 requirement to add sub stockiest master start
                        if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19')) || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19'))) {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#SubStockiest_Direct_CustomerDiv").show();
                            $("#PartyTypeDiv").hide();
                            $("#Is_Project_PartyDiv").show();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").show();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            //$("#party_type").val("Dealer");
                            $("#party_type_id").val(1);
                            $("#party_type").val("Stockiest");
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            //$("#TYPE_OF_COMPLAINT").val(0);
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$("#party_type > [value=0]").attr("selected", "true");
                            $scope.party_type_id = 1;
                            $scope.party_type = "Stockiest";
                        } else if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19')) || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19'))) {
                            if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1")) {
                                $("#Investigation_Compensation_Recommendation").show();
                            }
                            else if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                                $("#Investigation_Compensation_Recommendation").hide();
                            }
                            $("#SubStockiest_Direct_CustomerDiv").hide();
                            $("#PartyTypeDiv").show();
                            $("#Is_Project_PartyDiv").hide();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").hide();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            $scope.party_type = HeaderData[0]["party_type"];
                            $scope.party_type_id = HeaderData[0]["party_type_id"];
                            $scope.SubStockiest_Code = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_ID = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_Name = HeaderData[0]["SubStockiest_Name"];
                            $scope.SubStockiest_Address = HeaderData[0]["SubStockiest_Address"];
                            $scope.SubStockiest_Number = HeaderData[0]["SubStockiest_Number"];
                            $("#party_type").val(HeaderData[0]["party_type"]);
                            $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                            $("#SubStockiest_ID").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Code").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                            $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                            $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
                            if (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest") {
                                $("#SubStockiest_CodeDiv").show();
                                $("#SubStockiest_NameDiv").show();
                                $("#SubStockiest_AddressDiv").show();
                                $("#SubStockiest_NumberDiv").show();
                            }
                            //svprasadk 19-11-2020 SBU 1 requirement to party type other start 
                            else if (HeaderData[0]["party_type_id"] == 7) {
                                $("#SubStockiest_CodeDiv").hide();
                                $("#SubStockiest_NameDiv").show();
                                $("#SubStockiest_AddressDiv").show();
                                $("#SubStockiest_NumberDiv").show();
                                $scope.party_type_id = HeaderData[0]["party_type_id"];
                                $scope.party_type = HeaderData[0]["party_type"];
                                $scope.SubStockiest_Code = "";
                                $scope.SubStockiest_ID = "";
                                $scope.SubStockiest_Name = HeaderData[0]["SubStockiest_Name"];
                                $scope.SubStockiest_Address = HeaderData[0]["SubStockiest_Address"];
                                $scope.SubStockiest_Number = HeaderData[0]["SubStockiest_Number"];
                                $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                $("#party_type").val(HeaderData[0]["party_type"]);
                                $("#SubStockiest_ID").val("");
                                $("#SubStockiest_Code").val("");
                                $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                                $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                                $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
                            }

                            //svprasadk 19-11-2020 SBU 1 requirement to party type other end
                            else {
                                if (HeaderData[0]["END_CUSTOMER_DETAILS"] != "" && (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest")) {
                                    //console.log('if');
                                    //$("#party_type").val("SubDealer");
                                    $("#party_type").val(HeaderData[0]["party_type"]);
                                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                    $("#SubStockiest_CodeDiv").show();
                                    $("#SubStockiest_NameDiv").show();
                                    $("#SubStockiest_AddressDiv").show();
                                    $("#SubStockiest_NumberDiv").show();
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                    //$scope.party_type = "SubDealer";
                                    $scope.party_type = HeaderData[0]["party_type"];
                                    $scope.party_type_id = HeaderData[0]["party_type_id"];
                                    $scope.SubStockiest_Code = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_ID = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_Name = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_Address = HeaderData[0]["Customer_Address"];
                                    $scope.SubStockiest_Number = HeaderData[0]["Phone_Number"];
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                                    $("#SubStockiest_ID").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Code").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Name").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Address").val(HeaderData[0]["Customer_Address"]);
                                    $("#SubStockiest_Number").val(HeaderData[0]["Phone_Number"]);
                                } else {
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                    $("#party_type").val(HeaderData[0]["party_type"]);
                                    $scope.party_type_id = HeaderData[0]["party_type_id"];
                                    $scope.party_type = HeaderData[0]["party_type"];
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                                    //$("#party_type").val("Dealer");
                                    //$("#party_type").val("Stockiest");
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                    //$scope.party_type = "Dealer";
                                    //$scope.party_type = "Stockiest";
                                    //$("#party_type_id").val(1);
                                    $("#SubStockiest_CodeDiv").hide();
                                    $("#SubStockiest_NameDiv").hide();
                                    $("#SubStockiest_AddressDiv").hide();
                                    $("#SubStockiest_NumberDiv").hide();
                                    $("#SubStockiest_ID").val("");
                                    $("#SubStockiest_Code").val("");
                                    $("#SubStockiest_Name").val("");
                                    $("#SubStockiest_Address").val("");
                                    $("#SubStockiest_Number").val("");
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                                }
                            }
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                            // 04-05-2020 code has been hidden
                            //if (HeaderData[0]["Product_Category_Code"] == 11) {
                            //    $("#GetSupplyDetailsListButton").show();
                            //} else {
                            //    $("#GetSupplyDetailsListButton").hide();
                            //}
                            $("#GetSupplyDetailsListButton").hide();
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                            $("#SubStockiest_Direct_Customer").val("");
                            $("#Is_Project_Party").prop("checked", false);
                            $("#Site_Address").val("");
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                            if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                                $("#TYPE_OF_COMPLAINT_DIV").show();
                            }
                            //$("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            //if (HeaderData[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                            //    $("#TYPE_OF_COMPLAINT > [value=" + HeaderData[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                            //} else {
                            //    $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            //}
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            console.log(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                        } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#SubStockiest_Direct_CustomerDiv").show();
                            $("#PartyTypeDiv").hide();
                            $("#Is_Project_PartyDiv").show();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").show();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            //$("#party_type").val("Dealer");
                            $("#party_type").val("Stockiest");
                            $("#party_type_id").val(1);
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                            $("#GetSupplyDetailsListButton").hide();
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            //$("#TYPE_OF_COMPLAINT").val(0);
                            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                        } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#SubStockiest_Direct_CustomerDiv").show();
                            $("#PartyTypeDiv").hide();
                            $("#Is_Project_PartyDiv").show();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").show();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            //$("#party_type").val("Dealer");
                            $("#party_type").val("Stockiest");
                            $("#party_type_id").val(1);
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start                            
                            $("#GetSupplyDetailsListButton").hide();
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            //$("#TYPE_OF_COMPLAINT").val(0);
                            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            $("#THDefectprct").css("display", "none");
                            $("#THBasicAmount").css("display", "none");
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 START.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            $("#GetSupplyDetailsListButton").hide();
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$("#THDefectprct").css("display", "block");
                            //$("#THBasicAmount").css("display", "block");
                            $("#PeriodBasedDiv").hide();
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];                            
                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 END.
                        //svprasadk 24-04-2020 SBU 1 requirement to add sub stockiest master end

                        //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start
                        //console.log('is_rejectable', HeaderData[0]["is_rejectable"])
                        if (HeaderData[0]["is_rejectable"] == 1) {
                            //console.log('if')
                            $("#is_rejectable").attr('checked', 'true');
                            $("#is_rejectable").removeAttr('disabled');
                        } else {
                            //console.log('else')
                            $("#is_rejectable").removeAttr('checked');
                            $("#is_rejectable").removeAttr('disabled');
                        }
                        //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end

                        var TRCode = "";
                        var MSFLines = [];
                        if (Data.hasOwnProperty("MSFLines")) {
                            MSFLines = Data["MSFLines"];
                        }

                        $("#Material_Supply_Detail_Table tbody").empty();

                        for (var i = 0; i < MSFLines.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' onclick='EditMSD(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + MSFLines[i]["PLANT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["SUPPLY_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["SUPPLY_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["UOM"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["supply_qty"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["breakage_qty"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["NET_LOSS"] + "</td>";

                            TRCode = TRCode + "<td style='display:none;'></td>";                                                //PLANT_ID
                            TRCode = TRCode + "<td style='display:none;'>" + MSFLines[i]["PLANT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                //SUPPLY_TYPE_ID
                            TRCode = TRCode + "<td style='display:none;'>" + MSFLines[i]["SUPPLY_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                //SUPPLY_ID
                            TRCode = TRCode + "<td style='display:none;'>" + MSFLines[i]["SUPPLY_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";

                        }

                        $("#Material_Supply_Detail_Table tbody").append(TRCode);

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start                       
                        if (InvestigationScope.Product_Type == "Sheeting" || InvestigationScope.Product_Type == "SBU1") {
                            $("#CompensationDiv_Sheeting").show();
                            $("#CompensationDiv_Aerocon").hide();

                            var CCSheets = Data["CCSheets"];
                            TRCode = "";
                            var Product_Category = HeaderData[0]["PRODUCT_CATEGORY_NAME"];

                            if (Product_Category == "CC Iron Sheets") {
                                $(".HideMeForCCSheets").css('display', 'none');
                                $("#RecommendedForCCSheetsDivision").css('display', 'block');
                                for (var i = 0; i < CCSheets.length; i++) {
                                    TRCode = TRCode + "<tr onclick='EditCCRLines(this.id)' id='CCL_" + (i + 1) + "' class='MousePointer'>";
                                    TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["ProductName"] + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["Nos"] + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["GrossWeight"] + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["Tons"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;' >" + CCSheets[i]["ProductCode"] + "</td>";
                                    TRCode = TRCode + "</tr>";
                                }
                                $("#RecommendedForCCSheets tbody").append(TRCode);
                            }
                            else {
                                $("#RecommendedForCCSheetsDivision").css('display', 'none');
                            }
                        } else if (InvestigationScope.Product_Type == "SBU2" || (InvestigationScope.Product_Type == "SBU3" && InvestigationScope.ProductCategory_Code == "36")) {
                            $("#RecommendedForCCSheetsDivision").css('display', 'none');
                            $("#CompensationDiv_Sheeting").hide();
                            $("#CompensationDiv_Aerocon").show();

                            //var CompensationRecommendationDetails = Data["CompensationRecommendationData"];
                            //TRCode = "";
                            //for (var i = 0; i < CompensationRecommendationDetails.length; i++) {
                            //    TRCode = TRCode + "<tr class='MousePointer' id='COMPSIZE_" + (i + 1) + "' ng-click='EditCompensationSizeLines(obj,$event)'><td>" + (i + 1) + "</td>"
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["RECOMMENDED_SIZE"] + "</td>";
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["NOS"] + "</td>";
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["GROSS_WEIGHT"] + "</td>";
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["TONS"] + "</td>";
                            //    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_CODE"] + "</td>";
                            //    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_ID"] + "</td>";
                            //    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["LINE_ID"] + "</td>";
                            //    TRCode = TRCode + "</tr>";

                            //}
                            //var html = $compile(TRCode)($scope);
                            //var el = angular.element($("#CompensationSizeLines_Details_Table tbody"));
                            //el.append(html);
                            //$compile(html)($scope);
                        }
                        else if (InvestigationScope.Product_Type == "SBU3") {
                            $("#CompensationSizeLines_Details_Table").css("display", "none");
                            $("#CompensationSize_Add").css("display", "none");
                            $("#CompensationinMetricCubicValueDivision").css("display", "none");
                            $("#CompensationSize_Details_Div").show();
                            $("#CompensationDiv_Sheeting").hide();
                            $("#CompensationDiv_Aerocon").show();
                        }
                        // VIKAS G , 2023 MAR 20 SBU-8 START.
                        else if (InvestigationScope.Product_Type == "SBU8") {
                            $("#CompensationSizeLines_Details_Table").css("display", "none");
                            $("#CompensationSize_Add").css("display", "none");
                            $("#CompensationinMetricCubicValueDivision").css("display", "none");
                            $("#CompensationSize_Details_Div").show();
                            $("#CompensationDiv_Sheeting").hide();
                            $("#CompensationDiv_Aerocon").show();
                            //$("#THDefectprct").css("display", "block");
                            //$("#THBasicAmount").css("display", "block");
                        }
                        // VIKAS G , 2023 MAR 20 SBU-8 END.

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        TRCode = "";
                        var InvoiceLines = Data["InvoiceLines"];

                        $("#Invoice_List_Table tbody").empty();

                        for (var i = 0; i < InvoiceLines.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='IL_" + (i + 1) + "' onclick='EditInvList(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + InvoiceLines[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + InvoiceLines[i]["INVOICE_DATE"] + "</td>";
                            TRCode = TRCode + "<td>" + InvoiceLines[i]["REMARKS"] + "</td>";

                            TRCode = TRCode + "</tr>";

                        }

                        $("#Invoice_List_Table tbody").append(TRCode);


                        TRCode = "";

                        var SupplyDetailsA = Data["Brk_Sht_Lines"];
                        $("#Supply_Details_Table tbody").empty();
                        for (var i = 0; i < SupplyDetailsA.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["SIZE_M"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["GROSS_WEIGHT"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["SUPPLIED_QTY_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["SUPPLIED_QTY_M"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["SUPPLIED_QTY_TON"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["REJECTED_QTY_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["REJECTED_QTY_M"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["BREAKAGE_QTY_TON"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["BREAKAGE_PERSENT"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["REMARKS"] + "</td>";

                            TRCode = TRCode + "<td style='display:none;'></td>";                                                        //PRODUCT_ID
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                        //DEFECT_TYPE_ID
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["DEFECT_TYPE_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";

                        }
                        $("#Supply_Details_Table tbody").append(TRCode);

                        TRCode = "";
                        var SupplyDetailsB = Data["Brk_Otr_Lines"];
                        $("#Supply_Details_TableB tbody").empty();
                        for (var i = 0; i < SupplyDetailsB.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + (SupplyDetailsB[i]["INVOICE_DATE"]) + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["batch_no"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["SUPPLIED_QTY"] + "</td>";

                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["BREAKAGE_QTY"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["TRANSPORTER"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["REMARKS"] + "</td>";

                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsB[i]["DEFECT_TYPE_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Supply_Details_TableB tbody").append(TRCode);





                        /*******************************************************************************************/
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            TRCode = "";
                            var SupDetSD_BU3 = Data["SupDetSD_BU3"];
                            $("#Supply_Details_TableSBU3 tbody").empty();
                            for (var i = 0; i < SupDetSD_BU3.length; i++) {

                                TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["PROD_CODE"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["PROD_NAME"] + "</td>";

                                //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["PLANT_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["INVOICE_NO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["INVOICE_DATE"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["BATCHNO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["SUPPLIED_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["DEFECT_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["ACT_DEFECT_QTY"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["TRANSPORTER"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["DEFECT_TYPE_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["REMARKS"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;' >" + SupDetSD_BU3[i]["DEFECT_TYPE_CODE"] + "</td>";

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Supply_Details_TableSBU3 tbody").append(TRCode);
                        }


                        /************************************************************************************************/
                        //VIKAS G, 2023 MAR 20 SBU-8 SATRT.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = "";
                            var totalvalue = 0;
                            var SupDetSD_BU8 = Data["SupDetSD_BU8"];
                            $("#Supply_Details_TableSBU3 tbody").empty();
                            for (var i = 0; i < SupDetSD_BU8.length; i++) {

                                TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["PROD_CODE"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["PROD_NAME"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["PLANT_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["INVOICE_NO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["INVOICE_DATE"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["BATCHNO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["SUPPLIED_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["DEFECT_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["ACT_DEFECT_QTY"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["TRANSPORTER"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["DEFECT_TYPE_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["DEFECT_PRCT"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["REMARKS"] + "</td>";

                                TRCode = TRCode + "<td>" + (SupDetSD_BU8[i]["RATE_PER_UNIT"] * SupDetSD_BU8[i]["ACT_DEFECT_QTY"]).toFixed(3) + "</td>";

                                TRCode = TRCode + "<td style='display:none;' >" + SupDetSD_BU8[i]["DEFECT_TYPE_CODE"] + "</td>";

                                TRCode = TRCode + "</tr>";
                                totalvalue += SupDetSD_BU8[i]["RATE_PER_UNIT"] * SupDetSD_BU8[i]["ACT_DEFECT_QTY"];
                                console.log("Total value : " + totalvalue);
                            }
                            $("#total_prod_value").val(totalvalue.toFixed(3));
                            console.log(totalvalue);
                            $("#Supply_Details_TableSBU3 tbody").append(TRCode);

                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 END.

                        TRCode = "";
                        var Brk_Ins_Sht_Lines = Data["Brk_Ins_Sht_Lines"];
                        $("#Breakage_Inspection_Sheet_Table tbody").empty();
                        for (var i = 0; i < Brk_Ins_Sht_Lines.length; i++) {
                            TRCode = TRCode + "<tr class='MousePointer' id='BISP_" + (i + 1) + "' onclick='EditBISP(this.id)'><td>" + (i + 1) + "</td>";


                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["PRODUCT"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["SIZE"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["BATCH_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["RECOVERYPRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["RECOVERY"] + "</td>";

                            TRCode = TRCode + "<td style='display:none'></td>";                                                         //DEFECT_TYPE_ID
                            TRCode = TRCode + "<td style='display:none'>" + Brk_Ins_Sht_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";

                            TRCode = TRCode + "<td style='display:none'></td>";                                                         //RECOVERYPRODUCT_ID
                            TRCode = TRCode + "<td style='display:none'>" + Brk_Ins_Sht_Lines[i]["RECOVERYPRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'>" + Brk_Ins_Sht_Lines[i]["GrossWeight"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Breakage_Inspection_Sheet_Table tbody").append(TRCode);

                        TRCode = "";
                        var ObservationLines = Data["ObservationLines"];
                        $("#Observation_Remarks_Table tbody").empty();
                        for (var i = 0; i < ObservationLines.length; i++) {
                            TRCode = TRCode + "<tr id='OLT_" + (i + 1) + "' onclick='ObservationEditPopUp(this.id)' >";

                            TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                            TRCode = TRCode + "<td>" + ObservationLines[i]["OBSERVATION_NAME"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + ObservationLines[i]["OBSERVATION_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                        //OBSERVATION_ID

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Observation_Remarks_Table tbody").append(TRCode);

                        TRCode = "";
                        var Site_Obr_Sht_Lines = Data["Site_Obr_Sht_Lines"];
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            if (Site_Obr_Sht_Lines == "" || Site_Obr_Sht_Lines == undefined || Site_Obr_Sht_Lines.length == 0) {   

                                $("#SiteObservationsRemarks_if_any").val(" ");
                            }
                            else { 
                            $("#SiteObservationsRemarks_if_any").val(Site_Obr_Sht_Lines[0]["OBSERVATION"]);
                        }
                        }
                       
                        else {
                            $("#Site_Observation_Sheet_Table tbody").empty();
                            for (var i = 0; i < Site_Obr_Sht_Lines.length; i++) {
                                TRCode = TRCode + "<tr id='SOST_" + (i + 1) + "' onclick='SiteObservationEdit(this.id)' >";

                                TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                                TRCode = TRCode + "<td>" + Site_Obr_Sht_Lines[i]["OBSERVATION"] + "</td>";
                                TRCode = TRCode + "<td>" + Site_Obr_Sht_Lines[i]["VARIFIED_OR_NOT"] + "</td>";

                                if (Site_Obr_Sht_Lines[i]["COMMENTS"] == "undefined") {
                                    TRCode = TRCode + "<td></td>"
                                }
                                else {
                                    TRCode = TRCode + "<td>" + Site_Obr_Sht_Lines[i]["COMMENTS"] + "</td>"
                                }

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Site_Observation_Sheet_Table tbody").append(TRCode);
                        }
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            TRCode = "";
                            var MSFBU3Lines = Data["MSFBU3Lines"];
                            $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                            for (var i = 0; i < MSFBU3Lines.length; i++) {
                                //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .

                                //TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";
                                TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "'  >";

                                TRCode = TRCode + "<td>" + (i + 1) + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["ProdCode"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["ProdName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["PlantName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["SuppTypeName"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["SuppNameName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["UOM"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["SupplyQty"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["DefQty"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["ActDftQty"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU3Lines[i]["PlantCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU3Lines[i]["SuppTypeCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU3Lines[i]["SuppNameCode"] + "</td>";

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);
                        }
                        //VIKAS G , 2023 MAR 20 SBU-8 START.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = "";
                            var MSFBU8Lines = Data["MSFBU8Lines"];
                            $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                            for (var i = 0; i < MSFBU8Lines.length; i++) {

                                TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";
                                //TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "'  >";

                                TRCode = TRCode + "<td>" + (i + 1) + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["ProdCode"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["ProdName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["PlantName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["SuppTypeName"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["SuppNameName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["UOM"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["SupplyQty"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["DefQty"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["ActDftQty"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU8Lines[i]["PlantCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU8Lines[i]["SuppTypeCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU8Lines[i]["SuppNameCode"] + "</td>";

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);
                        }
                        //VIKAS G , 2023 MAR 20 SBU-8 END.

                        var Product_Type = HeaderData[0]["PRODUCT_TYPE_NAME"]


                        if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU1") {
                            //$("#Investigation_Compensation_Recommendation").hide();
                            $("#SupplyDetailsTableA").show();
                            $("#SupplyDetailsTableB").hide();
                            $("#SupplyDetailsTableSBU3").hide();

                            $("#BreakageInspectionSheetDiv").show();
                            $("#ObservationRemarksDiv").show();
                            $("#SiteObservationSheetDiv").show();
                            $("#SiteObservationSheetDivBU8").hide();
                            $("#CustomerRemarksIfAnyFieldDiv").show();
                            $("#ObservationsByOfficialFieldDiv").show();
                            $("#RemarksFieldDiv").show();
                            $("#NatureOfComplaintFieldDiv").hide();
                            $("#ComplaintDescribedBySalesFieldDiv").hide();
                            $("#ComplaintDescriptionFieldDiv").hide();
                            $("#ObservationByQAFFieldDiv").hide();
                            $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                            $("#VisitedDateSpanId").show();

                            $("#MatSupDet_BU12").css("display", "block");
                            $("#MatSupDet_BU3").css("display", "none");

                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU2" || HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3" || HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#BreakageInspectionSheetDiv").hide();
                            $("#ObservationRemarksDiv").hide();
                            $("#SiteObservationSheetDiv").hide();
                            $("#SiteObservationSheetDivBU8").hide();
                            $("#SupplyDetailsCalculationsDiv").hide();


                            if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU2") {
                                $("#Investigation_Compensation_Recommendation").hide();
                                $("#CustomerRemarksIfAnyFieldDiv").hide();
                                $("#ObservationsByOfficialFieldDiv").hide();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").show();
                                $("#ComplaintDescriptionFieldDiv").show();
                                $("#ObservationByQAFFieldDiv").show();
                                $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU12").css("display", "block");
                                $("#MatSupDet_BU3").css("display", "none");

                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").show();
                                $("#SupplyDetailsTableSBU3").hide();


                            } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["Product_Category_Code"] == "36") {
                                $("#Investigation_Compensation_Recommendation").hide();
                                $("#CustomerRemarksIfAnyFieldDiv").hide();
                                $("#ObservationsByOfficialFieldDiv").hide();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").show();
                                $("#ComplaintDescriptionFieldDiv").show();
                                $("#ObservationByQAFFieldDiv").show();
                                $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU12").css("display", "block");
                                $("#MatSupDet_BU3").css("display", "none");

                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").show();
                                $("#SupplyDetailsTableSBU3").hide();
                                $("#THDefectprct").css("display", "none");
                                $("#THBasicAmount").css("display", "none");
                                $("#BasicAmount").hide();
                                $("#BasicAmountdiv").hide();


                            }
                            else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3") {
                                $("#Investigation_Compensation_Recommendation").hide();
                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").hide();
                                $("#SupplyDetailsTableSBU3").show();

                                $("#CustomerRemarksIfAnyFieldDiv").hide();
                                $("#ObservationsByOfficialFieldDiv").show();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").hide();
                                $("#ComplaintDescriptionFieldDiv").hide();
                                $("#ObservationByQAFFieldDiv").hide();
                                $("#SubStockistLabel").text("Distributor/ Wholesaler/ Dealer/ Project");
                                $("#VisitedDateSpanId").hide();
                                $("#MatSupDet_BU12").css("display", "none");
                                $("#MatSupDet_BU3").css("display", "block");
                                $("#THDefectprct").css("display", "none");
                                $("#THBasicAmount").css("display", "none");
                                $("#BasicAmount").hide();
                                $("#BasicAmountdiv").hide();
                                $("#totalprodvalue").hide();
                                var button = document.getElementById("Mat_Sup_Det_BU3_Add");
                                button.disabled = true;
                                var table = document.getElementById("Material_Supply_Detail_Table_BU3");
                                table.style.backgroundColor = "gainsboro";

                            }
                            else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                                $("#Investigation_Compensation_Recommendation").hide();
                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").hide();
                                $("#SupplyDetailsTableSBU3").show();
                                $("#SiteObservationSheetDivBU8").show();
                                $("#BreakageInspectionSheetDiv").hide();
                                $("#ObservationRemarksDiv").hide();
                                $("#SiteObservationSheetDiv").hide();

                                $("#CustomerRemarksIfAnyFieldDiv").show();
                                $("#ObservationsByOfficialFieldDiv").show();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").hide();
                                $("#ComplaintDescribedBySalesFieldDiv").hide();
                                $("#ComplaintDescriptionFieldDiv").hide();
                                $("#ObservationByQAFFieldDiv").hide();
                                //$("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU12").css("display", "none");
                                //$("#MatSupDet_BU12").css("display", "block");
                                $("#MatSupDet_BU3").css("display", "block");
                                //$("#THDefectprct").css("display", "block");
                                //$("#THBasicAmount").css("display", "block");
                                $("#BasicAmount").hide();
                                $("#BasicAmountdiv").hide();

                            }
                        }


                        var IS = HeaderData[0]["DOC_STATUS"];
                        var MyField = $("#HiddenForCMS").val();

                        if (IS == "DRAFT") {
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INV' }) },
                                data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INVST' }) },
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

                            var UserTypeCode = $("#SessionUserTypeID").val();

                            if ((IS == "Approved") && (UserTypeCode == "CSM" || UserTypeCode == "QH") || UserTypeCode == "CSM_BU2" || UserTypeCode == "CSM_BU3" || UserTypeCode == "CSM_BU8") {

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
                                    //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INV' }) },
                                    data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INVST' }) },
                                    success: function (AccessData) {
                                        if (AccessData == "") {
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#InvList").css('display', 'none');
                                            $("#CompInvSave").css('display', 'none');
                                            $("#InvNew").css('display', 'none');
                                            $("#SendInvestigationApproval").css('display', 'none');
                                            $("#MakeApproved").css('display', 'none');
                                        }
                                        else {
                                            AccessData = JSON.parse(AccessData);
                                            if (AccessData[0]["IS_APPROVE"] == true) {
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#InvList").css('display', 'none');
                                                $("#CompInvSave").css('display', 'block');
                                                $("#InvNew").css('display', 'none');
                                                $("#SendInvestigationApproval").css('display', 'none');
                                                $("#MakeApproved").css('display', 'block');
                                                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start
                                                //$("#is_rejectable").removeAttr('disabled');
                                                $("#is_rejectable").attr('disabled', 'disabled');
                                                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end
                                            }
                                            else {
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#InvList").css('display', 'none');
                                                $("#CompInvSave").css('display', 'none');
                                                $("#InvNew").css('display', 'none');
                                                $("#SendInvestigationApproval").css('display', 'none');
                                                $("#MakeApproved").css('display', 'none');
                                            }
                                        }
                                    }
                                });

                            }
                        }

                        $("#StateFilter").val(HeaderData[0]["STATE_CODE"]);
                        $("#CMSState").val(HeaderData[0]["STATE_CODE"]);

                        $("#HiddenForCMS").val("");

                        SheetingLabels(HeaderData[0]["Product_Category_Code"]);
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

        if (MasterType == "Complaint_No") {

            if ($("#Complaint_Tracking_No").val() == "") {

            }
            else {
                alert("Select a new one. This Investigation already reserved for Tracking No: " + $("#Complaint_Tracking_No").val());
                return;
            }

            var StateFilter = $("#StateFilter").val();

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
                StateFilter: StateFilter
            });
        }
        else if (MasterType == "Prod_Cat_Mast" || MasterType == "GetPlantMaster" || MasterType == "Product_Supplied_From") {
            var BusinessUnit = $("#Product_Type_CODE").val();

            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit
            });
        }
        else if (MasterType == "GetProductMaster") {
            debugger

            var Product_Type_CODE = $("#Product_Type_CODE").val();
            var Product_CategoryCode = $("#Product_CategoryCode").val();
            var InvoiceNoBU3 = $("#InvoiceNoBU3").val();
            var Invoice_Repeat = "No";
            if ($("#InvoiceNoB").val() == "") {
                InvoiceNoBU3 = $("#InvoiceNoBU3").val();
            } else {
                InvoiceNoBU3 = $("#InvoiceNoB").val();
            }
            //var SD_InvoiceNo = $("#InvoiceNoBU3").val();
            if (Product_Type_CODE == "SBU8" && InvoiceNoBU3 != "") {





                var Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Category_CODE: Product_CategoryCode,
                    Product_Type: $("#Product_Type_CODE").val(),
                    Product_Type_CODE: Product_Type_CODE,

                    InvoiceNoBU3: InvoiceNoBU3,
                    Customer_Code: $("#Customer_Code").val(),
                    Invoice_Repeat: Invoice_Repeat

                });

                //$.ajax({
                //    method: 'POST',
                //    url: '../../ComplaintRegistration/SameInvoiceComplaintRegistration',
                //    async: false,
                //    data: { Data: Data },
                //}).then(function successCallback(response) {
                //    debugger

                //    //var FormIdentity = $("#FormIdentity").val();
                //    if (response == "FALSE") {
                //        $("#Approvals_Remarks").val("");
                //        $("#InvoiceForm").css('display', 'none');
                //    }
                //    else {
                //        $("#Approvals_Remarks").val("");
                //        $("#InvoiceForm").modal('show');
                //    }

                //},
                //    function errorCallback(response) {
                //        alert("Error : " + response);
                //    });

            }
            else {
                if ($("#InvoiceNoB").val() == "") {
                    InvoiceNoBU3 = $("#InvoiceNoBU3").val();
                } else {
                    InvoiceNoBU3 = $("#InvoiceNoB").val();
                }

                if (Product_Type_CODE == "SBU3" && InvoiceNoBU3 == "" && Methodname != "GetProductMasterInvBU3") {
                    alert("Please Provide Invoice Number");
                    return;
                } else {
                    Data = JSON.stringify({
                        MasterType: MasterType,
                        Product_Category_CODE: Product_CategoryCode,
                        Product_Type_CODE: Product_Type_CODE,
                        Product_Type: Product_Type_CODE,
                        InvoiceNoBU3: InvoiceNoBU3,
                        Customer_Code: $("#Customer_Code").val()
                    });
                }
            }
        }
        else if (MasterType == "GetDefectTypeMaster") {
            if ($("#Product_Type_CODE").val() == "" || $("#Product_CategoryCode").val() == "") {
                alert("Product Type cannot be empty");
                return;
            }
            else {
                Data = JSON.stringify({
                    MasterType: MasterType,
                    ProductCategoryCode: $("#Product_CategoryCode").val(),
                    ProductTypeCode: $("#Product_Type_CODE").val(),
                    COMPLAINT_CATEGORY_CODE: $("#CompCatCode").val()
                });
            }
        }
        else if (MasterType == "MSD_Name") {

            var Product_Supplied_From = $("#Product_Supplied_From").val();
            //console.log('Product_Supplied_From', Product_Supplied_From)
            if ($("#Product_Type").val() == "") {
                return;
            }
            else if ($("#Product_Type").val() == "SBU1" || $("#Product_Type").val() == "SBU2") {
                Product_Supplied_From = $("#Product_Supplied_From").val();
            }
            else if ($("#Product_Type_CODE").val() == "SBU3") {
                Product_Supplied_From = $("#BU3Product_Supplied_From_Name").val();
                if (Product_Supplied_From == "") {
                    Product_Supplied_From = $("#Product_Supplied_From").val();
                }
            }
            else if ($("#Product_Type_CODE").val() == "SBU8") {
                Product_Supplied_From = $("#BU3Product_Supplied_From_Name").val();
                if (Product_Supplied_From == "") {
                    Product_Supplied_From = $("#Product_Supplied_From").val();
                }
            }
            if (Product_Supplied_From == "Sub Stockist") {
                return;
            }

            if (Product_Supplied_From == "") {
                alert("Select Product Supplied Form");
                return;
            }
            if (Product_Supplied_From == "STOCKIST") {

                Heading = "Stockist List";

                var StateFilter = $("#StateFilter").val();
                var Product_Type = $("#Product_Type_CODE").val();

                if (Product_Type == "") {
                    return;
                }
                else if (Product_Type == "SBU1") {
                    Product_Type = "1000";
                }
                else if (Product_Type == "SBU2") {
                    Product_Type = "2000";
                }
                else if (Product_Type == "SBU3") {
                    Product_Type = "3000";
                }
                else if (Product_Type == "SBU8") {
                    Product_Type = "8000";
                }
                Data = JSON.stringify({
                    MasterType: "StockistMaster",
                    StateFilter: $("#StateFilter").val(),
                    Product_Type: Product_Type
                });
            }
            if (Product_Supplied_From == "Plant") {
                Heading = "Plant List";
                var BusinessUnit = $("#Product_Type_CODE").val();
                Data = JSON.stringify({
                    MasterType: "GetPlantMaster",
                    BusinessUnit: BusinessUnit
                });
            }
            if (Product_Supplied_From == "Depot") {
                Heading = "Depot List";
                var BusinessUnit = $("#Product_Type_CODE").val();
                Data = JSON.stringify({
                    MasterType: "DepoMaster",
                    BusinessUnit: BusinessUnit
                });
            }

            if (Product_Supplied_From == "Distributor" || Product_Supplied_From == "Wholesaler" || Product_Supplied_From == "Dealer") {

                Heading = Product_Supplied_From + " List";

                var StateFilter = $("#StateFilter").val();
                var Product_Type = $("#Product_Type_CODE").val();

                if (Product_Type == "") {
                    return;
                }
                else if (Product_Type == "SBU1") {
                    Product_Type = "1000";
                }
                else if (Product_Type == "SBU2") {
                    Product_Type = "2000";
                }
                else if (Product_Type == "SBU3") {
                    Product_Type = "3000";
                }
                else if (Product_Type == "SBU8") {
                    Product_Type = "8000";
                }
                Data = JSON.stringify({
                    MasterType: "StockistMasterBU3MSD_STO",
                    StateFilter: $("#StateFilter").val(),
                    Product_Type: Product_Type,
                    Product_Supplied_From: Product_Supplied_From
                });
            }

        }
        else if (MasterType == "RecoveryProduct") {
            Data = JSON.stringify({
                MasterType: MasterType,
                Product_Type: $("#Product_Type_CODE").val(),
                Product_Category: $("#Product_CategoryCode").val()
            });
        }
        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
        else if (MasterType == "Compensation_Mode_Mast") {
            var SessionUserType = $("#SessionUserType").val();
            if (SessionUserType == "COM_OF_BU2") {
                return;
            }
            Data = JSON.stringify({
                MasterType: "Compensation_Mode_Mast",
                Product_Type: $("#Product_Type_CODE").val()
            });
        }
        //svprasadk 30-10-2020 SBU 1 requirement to add party type start
        else if (MasterType == "complaintType") {
            Data = JSON.stringify({
                MasterType: MasterType,
            });
        }
        //svprasadk 30-10-2020 SBU 1 requirement to add party type end
        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

        else if (MasterType == "SubStockiestMaster") {

            var StateFilter = $("#StateFilter").val();

            var Product_Type = $("#Product_Type_CODE").val();

            if (Product_Type == "") {
                alert("Select Business Unit");
                return;
            }
            else if (Product_Type == "SBU1") {
                Product_Type = "1000";
            }
            else if (Product_Type == "SBU2") {
                Product_Type = "2000";
            }
            else if (Product_Type == "SBU3") {
                Product_Type = "3000";
            }
            else if (Product_Type == "SBU8") {
                Product_Type = "8000";
            }

            Data = JSON.stringify({
                MasterType: MasterType,
                Product_Type: Product_Type,
                StateFilter: StateFilter
            });
            //alert(Data)
        }

        else if (MasterType == "partyType") {
            Data = JSON.stringify({
                MasterType: MasterType,
            });
        }

        DIMSFactory.getMasterData(Data).success(function (response) {
            var SD_InvoiceNo = $("#InvoiceNoBU3").val();
            if (Product_Type == "SBU8") {
                var Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Category_CODE: Product_Category_CODE,
                    Product_Type: $("#Product_Type_CODE").val(),
                    Product_Type_CODE: Product_Type_CODE,
                    InvoiceNoBU3: SD_InvoiceNo,
                    Customer_Code: $("#Customer_Code").val()
                });
                $.ajax({
                    method: 'POST',
                    url: '../../ComplaintRegistration/SameInvoiceComplaintRegistration',
                    async: false,
                    data: { Data: Data },
                }).then(function successCallback(response1) {
                    debugger

                    //var FormIdentity = $("#FormIdentity").val();
                    if (response1 == "FALSE") {
                        getLookUpData(response, Methodname, Heading, SD_InvoiceNo_BU8);
                    }
                    else {

                    }

                },
                    function errorCallback(response) {
                        alert("Error : " + response);
                    });
            }
            else {
                getLookUpData(response, Methodname, Heading, SD_InvoiceNo);
            }
        });
    }

    //VIKAS G, 03-05-2023 Register complaint on same invoice for SBU-8 Start.
    $scope.SameInvoiceComplaintRegistration = function () {
        debugger
        try {
            var Product_Type_CODE = $("#Product_Type_CODE").val();
            var Product_Category = $("#Product_Category").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();
            var Product_Type = $("#Product_Type_CODE").val()
            var SD_InvoiceNo = $("#InvoiceNoBU3").val();
            var Approvals_Remarks = "";
            var MasterType = "GetProductMaster";
            var Invoice_Repeat = "Yes";
            console.log("Approvals_Remarks : " + Approvals_Remarks);
            Approvals_Remarks = $("#Approvals_Remarks").val();
            var Data = JSON.stringify({
                MasterType: MasterType,
                Product_Category_CODE: Product_Category_CODE,
                Product_Type: $("#Product_Type_CODE").val(),
                Product_Type_CODE: Product_Type_CODE,
                InvoiceNoBU3: SD_InvoiceNo,
                Customer_Code: $("#Customer_Code").val(),
                Invoice_Repeat: Invoice_Repeat
            });
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/SameInvoiceComplaintRegistration',
                async: false,
                data: { Data: Data },
            }).then(function successCallback(response) {
                debugger
                //console.log("response :" + response);
                var FormIdentity = $("#FormIdentity").val();
                console.log("FormIdentity :" + FormIdentity);
                if (response == "FALSE") {

                }
                else {
                    //var Complaint_Tracking_No = response[0].ID;
                    console.log("Complaint_Tracking_No :" + FormIdentity);
                    if (Approvals_Remarks == "") {
                        alert("Provide Remarks for Continue");
                        return;
                    }
                    $("#Remarks").val(Approvals_Remarks);
                    var r = confirm("Are You Sure To continue the Complaint No :" + FormIdentity);
                    if (r == true) {

                        if (Product_Category_CODE == "" || Product_Category == "") {
                            $("#Product_Category").css("border-color", "red");
                            return;
                        }

                        if ((Product_Type == "SBU3" && SD_InvoiceNo == "")) {
                            alert("Product Provide Invoice Number");
                            return;
                        }
                        else if (Product_Type == "SBU8" && SD_InvoiceNo == "") {
                            alert("Product Provide Invoice Number");
                            return;
                        }
                        else {
                            $("#Product_Category").css("border-color", "#d2d6de");

                            if (Product_Type == "SBU3") {
                                Data = JSON.stringify({
                                    MasterType: MasterType,
                                    Product_Category_CODE: Product_Category_CODE,
                                    Product_Type: $("#Product_Type_CODE").val(),
                                    Product_Type_CODE: Product_Type_CODE,
                                    InvoiceNoBU3: SD_InvoiceNo,
                                    Customer_Code: $("#Customer_Code").val()

                                });
                            }
                            else if (Product_Type == "SBU8") {
                                Data = JSON.stringify({
                                    MasterType: MasterType,
                                    Product_Category_CODE: Product_Category_CODE,
                                    Product_Type: $("#Product_Type_CODE").val(),
                                    Product_Type_CODE: Product_Type_CODE,
                                    InvoiceNoBU3: SD_InvoiceNo,
                                    Customer_Code: $("#Customer_Code").val(),
                                    Invoice_Repeat: Invoice_Repeat
                                });
                            }
                            DIMSFactory.getMasterData(Data).success(function (response) {
                                var SD_InvoiceNo = $("#InvoiceNoBU3").val();
                                getLookUpData(response, Methodname, Heading, SD_InvoiceNo);
                            });
                        }
                    }

                    else {

                    }
                }

            },
                function errorCallback(response) {
                    alert("Error : " + response);
                });
            //var Complaint_Tracking_No = $("#Complaint_Tracking_No").val();

        }

        catch (e) {
            alert("Error : SameInvoiceComplaintRegistration :" + e);
        }
    }
    //VIKAS G, 03-05-2023 Register complaint on same invoice for SBU-8 end.


    $scope.SaveInvestigationData = function () {
        try {
            var ProductType = $("#Product_Type_CODE").val();
            debugger
            if ($("#Complaint_No").val() == "") {
                alert("Please Select complaint before saving");
                return;
            }

            var Flag = 0;

            var IS = $("#Investigation_Status").val();

            var NoticeType = "";
            if (($("#System").is(":checked")) == true) {
                NoticeType = "System";
            }
            else if (($("#Manual").is(":checked")) == true) {
                NoticeType = "Manual";
            }




            Flag = 0;
            if (Flag > 0) {
                //console.log("Flag : " + Flag);
            }
            else {


                var COMPLAIN_DESC = $("#COMPLAIN_DESC").val();


                var Delay = $("#Delay").is(":checked");
                if (Delay == true) {
                    if ($scope.DelayDays == undefined) { $scope.DelayDays = ""; }
                    if ($scope.DelayReason == undefined) { $scope.DelayReason = ""; }
                }
                else {
                    Delay = false;

                    $scope.DelayDays = "";
                    $scope.DelayReason = "";
                }

                var RowId = "";

                var MaterialSupplyDetail = new Array();
                $("#Material_Supply_Detail_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    MaterialSupplyDetail.push({
                        SlNo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[0].innerHTML,
                        MaterialBelongsTo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[1].innerHTML,
                        ProductSuppliedFrom: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[2].innerHTML,
                        Name: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[3].innerHTML,

                        UOM: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[4].innerHTML,
                        SupplyQty: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[5].innerHTML,
                        BreakageQty: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[6].innerHTML,
                        NetLossQty: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[7].innerHTML,

                        Material_Belongs_TO_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[8].innerHTML,
                        Material_Belongs_TO_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[9].innerHTML,
                        Product_Supplied_From_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[10].innerHTML,
                        Product_Supplied_From_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[11].innerHTML,

                        MSD_Name_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[12].innerHTML,
                        MSD_Name_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[13].innerHTML

                    });
                });

                var Invoice_List = new Array();
                $("#Invoice_List_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));

                    Invoice_List.push({
                        SlNo: $("#Invoice_List_Table tbody #" + RowId + " td")[0].innerHTML,
                        InvoiceNo: $("#Invoice_List_Table tbody #" + RowId + " td")[1].innerHTML,
                        InvoiceDate: $("#Invoice_List_Table tbody #" + RowId + " td")[2].innerHTML,
                        Remarks: $("#Invoice_List_Table tbody #" + RowId + " td")[3].innerHTML
                    });

                });

                var TableTotal = 0;
                //var CurrentRowSupQtyNos = 0;
                var Supply_Details = new Array();
                $("#Supply_Details_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    Supply_Details.push({
                        SlNo: $("#Supply_Details_Table tbody #" + RowId + " td")[0].innerHTML,
                        ItemTypeProductName: $("#Supply_Details_Table tbody #" + RowId + " td")[1].innerHTML,
                        Size_M: $("#Supply_Details_Table tbody #" + RowId + " td")[2].innerHTML,
                        GrossWtTons: $("#Supply_Details_Table tbody #" + RowId + " td")[3].innerHTML,

                        SuppliedQtyNos: $("#Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML,
                        SuppliedQtyM: $("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML,
                        SuppliedQtyTon: $("#Supply_Details_Table tbody #" + RowId + " td")[6].innerHTML,
                        BreakageQtyNos: $("#Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML,

                        BreakageQtyM: $("#Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML,
                        BreakageQtyTon: $("#Supply_Details_Table tbody #" + RowId + " td")[9].innerHTML,
                        BreakagePerc: $("#Supply_Details_Table tbody #" + RowId + " td")[10].innerHTML,
                        DefectType: $("#Supply_Details_Table tbody #" + RowId + " td")[11].innerHTML,

                        Remarks: $("#Supply_Details_Table tbody #" + RowId + " td")[12].innerHTML,

                        SD_Item_Type_Product_Name_ID: $("#Supply_Details_Table tbody #" + RowId + " td")[13].innerHTML,
                        SD_Item_Type_Product_Name_CODE: $("#Supply_Details_Table tbody #" + RowId + " td")[14].innerHTML,
                        SD_Defect_Type_ID: $("#Supply_Details_Table tbody #" + RowId + " td")[15].innerHTML,
                        SD_Defect_Type_CODE: $("#Supply_Details_Table tbody #" + RowId + " td")[16].innerHTML

                    });
                    //CurrentRowSupQtyNos = $("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML;
                    //if (CurrentRowSupQtyNos == null || CurrentRowSupQtyNos == "" || isNaN(CurrentRowSupQtyNos)) {
                    //}
                    //else {
                    //    TableTotal = parseFloat(TableTotal) + parseFloat(CurrentRowSupQtyNos);
                    //}
                });

                var Supply_DetailsB = new Array();
                $("#Supply_Details_TableB tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    Supply_DetailsB.push({

                        SlNo: $("#Supply_Details_TableB tbody #" + RowId + " td")[0].innerHTML,

                        SD_Item_Type_Product_Name_CODEB: $("#Supply_Details_TableB tbody #" + RowId + " td")[1].innerHTML,
                        SD_Item_Type_Product_NameB: $("#Supply_Details_TableB tbody #" + RowId + " td")[2].innerHTML,
                        InvoiceNoB: $("#Supply_Details_TableB tbody #" + RowId + " td")[3].innerHTML,
                        InvoiceDateB: $("#Supply_Details_TableB tbody #" + RowId + " td")[4].innerHTML,
                        BatchNoB: $("#Supply_Details_TableB tbody #" + RowId + " td")[5].innerHTML,
                        SuppliedQtyNosB: $("#Supply_Details_TableB tbody #" + RowId + " td")[6].innerHTML,

                        BreakageQtyNosB: $("#Supply_Details_TableB tbody #" + RowId + " td")[7].innerHTML,
                        TransporterB: $("#Supply_Details_TableB tbody #" + RowId + " td")[8].innerHTML,
                        Defect_TypeB: $("#Supply_Details_TableB tbody #" + RowId + " td")[9].innerHTML,
                        RemarksB: $("#Supply_Details_TableB tbody #" + RowId + " td")[10].innerHTML,
                        AttachmentsB: "",

                        SD_Item_Type_Product_Name_IDB: "",
                        Defect_Type_IDB: "",
                        Defect_Type_CODEB: $("#Supply_Details_TableB tbody #" + RowId + " td")[11].innerHTML



                        //SlNo: $("#Supply_Details_TableB tbody #" + RowId + " td")[0].innerHTML,
                        //SD_Item_Type_Product_NameB: $("#Supply_Details_TableB tbody #" + RowId + " td")[1].innerHTML,
                        //InvoiceNoB: $("#Supply_Details_TableB tbody #" + RowId + " td")[2].innerHTML,
                        //InvoiceDateB: $("#Supply_Details_TableB tbody #" + RowId + " td")[3].innerHTML,
                        //BatchNoB: $("#Supply_Details_TableB tbody #" + RowId + " td")[4].innerHTML,
                        //SuppliedQtyNosB: $("#Supply_Details_TableB tbody #" + RowId + " td")[5].innerHTML,
                        //BreakageQtyNosB: $("#Supply_Details_TableB tbody #" + RowId + " td")[6].innerHTML,
                        //TransporterB: $("#Supply_Details_TableB tbody #" + RowId + " td")[7].innerHTML,
                        //Defect_TypeB: $("#Supply_Details_TableB tbody #" + RowId + " td")[8].innerHTML,
                        //RemarksB: $("#Supply_Details_TableB tbody #" + RowId + " td")[9].innerHTML,
                        //AttachmentsB: $("#Supply_Details_TableB tbody #" + RowId + " td")[10].innerHTML,
                        //SD_Item_Type_Product_Name_IDB: $("#Supply_Details_TableB tbody #" + RowId + " td")[11].innerHTML,
                        //SD_Item_Type_Product_Name_CODEB: $("#Supply_Details_TableB tbody #" + RowId + " td")[12].innerHTML,
                        //Defect_Type_IDB: $("#Supply_Details_TableB tbody #" + RowId + " td")[13].innerHTML,
                        //Defect_Type_CODEB: $("#Supply_Details_TableB tbody #" + RowId + " td")[14].innerHTML


                    });
                });

                var Breakage_Inspection_Sheet = new Array();
                $("#Breakage_Inspection_Sheet_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    Breakage_Inspection_Sheet.push({
                        SlNo: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[0].innerHTML,
                        Product: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[1].innerHTML,
                        Size: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[2].innerHTML,
                        BatchNo: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[3].innerHTML,
                        DefectType: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[4].innerHTML,
                        RecoveryProduct: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[5].innerHTML,
                        Recovery: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[6].innerHTML,

                        BISP_Defect_Type_ID: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[7].innerHTML,
                        BISP_Defect_Type_CODE: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[8].innerHTML,

                        BISP_Recovery_Product_ID: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[9].innerHTML,
                        BISP_Recovery_Product_CODE: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[10].innerHTML,

                        BISP_GrossWeight: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[11].innerHTML
                    });
                });


                var Observation_Remarks = new Array();
                $("#Observation_Remarks_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    Observation_Remarks.push({
                        SlNo: $("#Observation_Remarks_Table tbody #" + RowId + " td")[0].innerHTML,
                        ObservationName: $("#Observation_Remarks_Table tbody #" + RowId + " td")[1].innerHTML,
                        ObservationCode: $("#Observation_Remarks_Table tbody #" + RowId + " td")[2].innerHTML,
                        ObservationId: $("#Observation_Remarks_Table tbody #" + RowId + " td")[3].innerHTML
                    });
                });

                var Site_Observation_Sheet = new Array();
                $("#Site_Observation_Sheet_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    Site_Observation_Sheet.push({
                        SlNo: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[0].innerHTML,
                        Observation: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[1].innerHTML,
                        VerifiedOrNot: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[2].innerHTML,
                        Comments: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[3].innerHTML
                    });
                });

                if (ProductType == "SBU3") {
                    var MSD_BU3 = new Array();
                    $("#Material_Supply_Detail_Table_BU3 tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        MSD_BU3.push({
                            SlNo: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[0].innerHTML,
                            ProdCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[1].innerHTML,
                            UOM: "EA",
                            SupQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[7].innerHTML,
                            DefQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[8].innerHTML,
                            ActDftQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[9].innerHTML,
                            PlantCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[10].innerHTML,
                            ProdSupFromCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[11].innerHTML,
                            NameCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[12].innerHTML
                        });
                    });


                    var SupDetSD_BU3 = new Array();
                    $("#Supply_Details_TableSBU3 tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupDetSD_BU3.push({

                            SlNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[0].innerHTML,
                            ProdCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[1].innerHTML,
                            ProdName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[2].innerHTML,
                            //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
                            PlantName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[3].innerHTML,
                            InvNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[4].innerHTML,
                            InvDate: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[5].innerHTML,
                            BatNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[6].innerHTML,

                            Supp: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[7].innerHTML,

                            DefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[8].innerHTML,


                            ActDefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[9].innerHTML,



                            Transport: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[10].innerHTML,
                            DefName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[11].innerHTML,
                            Remarks: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[12].innerHTML,

                            DefCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[13].innerHTML
                        });
                    });
                }

                //VIKAS G, 2023-03-17 SBU-8 Start. 
                else if (ProductType == "SBU8") {
                    var MSD_BU8 = new Array();
                    $("#Material_Supply_Detail_Table_BU3 tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        MSD_BU8.push({
                            SlNo: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[0].innerHTML,
                            ProdCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[1].innerHTML,
                            UOM: "EA",
                            SupQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[7].innerHTML,
                            DefQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[8].innerHTML,
                            ActDftQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[9].innerHTML,
                            PlantCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[10].innerHTML,
                            ProdSupFromCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[11].innerHTML,
                            NameCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[12].innerHTML
                        });
                    });


                    var SupDetSD_BU8 = new Array();
                    $("#Supply_Details_TableSBU3 tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupDetSD_BU8.push({

                            SlNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[0].innerHTML,
                            ProdCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[1].innerHTML,
                            ProdName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[2].innerHTML,
                            PlantName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[3].innerHTML,
                            InvNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[4].innerHTML,
                            InvDate: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[5].innerHTML,
                            BatNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[6].innerHTML,

                            Supp: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[7].innerHTML,
                            DefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[8].innerHTML,
                            ActDefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[9].innerHTML,

                            Transport: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[10].innerHTML,
                            DefName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[11].innerHTML,
                            Defprct: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[12].innerHTML,
                            Remarks: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[13].innerHTML,

                            DefCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[15].innerHTML
                        });
                    });
                }
                //VIKAS G, 2023-03-17 SBU-8 end. 


                var FormIdentity = $("#FormIdentity").val();
                var TYPE_OF_COMPLAINT_ID = $("#TYPE_OF_COMPLAINT_ID").val()
                if (typeof TYPE_OF_COMPLAINT_ID == "undefined" || TYPE_OF_COMPLAINT_ID == "") {
                    TYPE_OF_COMPLAINT_ID = 0;
                }
                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start  
                //console.log('is_rejectable', is_rejectable)
                if (document.getElementById("is_rejectable").checked == true) {
                    is_rejectable = 1;

                } else {
                    is_rejectable = 0;
                }
                //alert('checkbox is checked', document.getElementById("is_rejectable").checked, is_rejectable)
                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end

                var InvestigationData = JSON.stringify({
                    FormIdentity: $("#FormIdentity").val(),
                    CreatedBy: $("#CreatedByCode").val(),
                    Complaint_No: $("#Complaint_No").val(),

                    Complaint_Tracking_No: $("#Complaint_Tracking_No").val(),
                    Complaint_Received_Date: $("#Complaint_Received_Date").val(),
                    Complaint_Registered_Date: $("#Complaint_Registered_Date").val(),
                    Complaint_Attended_Date: $("#Complaint_Attended_Date").val(),
                    Delay: $("#Delay").is(':checked'),
                    DelayDays: $("#DelayDays").val(),
                    DelayReason: $("#DelayReason").val(),

                    Investigator_Type: $("#Investigator_Type").val(),
                    Investigator_Type_CODE: $("#Investigator_Type_CODE").val(),
                    Investigation_Done_By: $("#Investigation_Done_By").val(),
                    Investigation_Done_By_CODE: $("#Investigation_Done_By_CODE").val(),
                    Visited_Date: $("#Visited_Date").val(),
                    Previous_Visit_Date: $("#Previous_Visit_Date").val(),
                    SalesRepresentativeEmployeeCode: $("#SalesRepresentativeEmployeeCode").val(),
                    SalesRepresentativeEmployeeName: $("#SalesRepresentativeEmployeeName").val(),

                    FilesPath: $("#SelectedFiles").text(),

                    Investigation_Id: $("#Investigation_Id").val(),
                    IGS_Series_Code: $("#IGS_Series_Code").val(),
                    Investigation_Date: $("#Investigation_Date").val(),
                    Investigation_Status: $("#Investigation_Status").val(),
                    Approval_Date: $("#Approval_Date").val(),
                    NoticeType: NoticeType,

                    Customer_Code: $("#Customer_Code").val(),
                    Customer_Name: $("#Customer_Name").val(),
                    Customer_Type: $("#Customer_Type").val(),
                    Customer_Type_CODE: $("#Customer_Type_CODE").val(),
                    Customer_Location: $("#Customer_Location").val(),
                    Customer_Location_Code: $("#Customer_Location_Code").val(),
                    Contact_City: $("#Contact_City").val(),
                    Contact_City_Code: $("#Contact_City_Code").val(),
                    Contact_State: $("#Contact_State").val(),
                    Contact_State_CODE: $("#Contact_State_CODE").val(),
                    Contact_Area: $("#Contact_Area").val(),
                    Contact_Area_CODE: $("#Contact_Area_CODE").val(),

                    Contact_Person: $("#Contact_Person").val(),
                    Contact_Number: $("#Contact_Number").val(),
                    Customer_Fax: $("#Customer_Fax").val(),
                    Customer_Email: $("#Customer_Email").val(),
                    Product_Type: $("#Product_Type").val(),
                    Product_Type_CODE: $("#Product_Type_CODE").val(),

                    Product_Category: $("#Product_Category").val(),
                    Product_CategoryCode: $("#Product_CategoryCode").val(),
                    //Sub_Product_Category: $("#Sub_Product_Category").val(),
                    //Sub_Product_CategoryCode: $("#Sub_Product_CategoryCode").val(),
                    SubStockiest_Direct_Customer: $("#SubStockiest_Direct_Customer").val(),
                    Is_Project_Party: $("#Is_Project_Party").is(":checked"),
                    Site_Address: $("#Site_Address").val(),


                    Period_Based: $("#Period_Based").is(':checked'),
                    Invoice_Based: $("#Invoice_Based").is(':checked'),
                    InvDateSupplyFrom: $("#InvDateSupplyFrom").val(),
                    InvDateSupplyTo: $("#InvDateSupplyTo").val(),

                    SD_InvoiceDetails: $("#SD_InvoiceDetails").val(),
                    SD_ProductDetails: $("#SD_ProductDetails").val(),

                    Total_Supply_Oty_Mtrs: $("#Total_Supply_Oty_Mtrs").val(),
                    Total_Breakage_Qty_Mtrs: $("#Total_Breakage_Qty_Mtrs").val(),
                    Total_Recovery_Mtrs: $("#Total_Recovery_Mtrs").val(),
                    Net_Loss_Mtrs: $("#Net_Loss_Mtrs").val(),

                    Total_Supply_Qty_Tons: $("#Total_Supply_Qty_Tons").val(),
                    Total_Breakage_Qty_Tons: $("#Total_Breakage_Qty_Tons").val(),
                    Total_Recovery_Tons: $("#Total_Recovery_Tons").val(),
                    Net_Loss_Tons: $("#Net_Loss_Tons").val(),

                    Customer_Remarks_if_any: $("#Customer_Remarks_if_any").val(),
                    Observations_by_official: $("#Observations_by_official").val(),
                    IR_Remarks: $("#IR_Remarks").val(),
                    NatureOfComplaint: $("#NatureOfComplaint").val(),
                    ComplaintDescribedBySales: $("#ComplaintDescribedBySales").val(),
                    ComplaintDescription: $("#ComplaintDescription").val(),
                    ObservationByQAF: $("#ObservationByQAF").val(),


                    SITEDETAIL_CODE: $("#SITEDETAIL_CODE").val(),
                    COMPANYDETAIL_CODE: $("#COMPANYDETAIL_CODE").val(),

                    CompRegID: $("#CompRegID").val(),
                    CompRegDocSeries: $("#CompRegDocSeries").val(),
                    CompRegDocNumber: $("#CompRegDocNumber").val(),


                    COMPLAINT_TYPE_CODE: $("#COMPLAINT_TYPE_CODE").val(),
                    COMPLAINT_TYPE_NAME: $("#COMPLAINT_TYPE_NAME").val(),

                    COMPLAINT_CATEGORY_CODE: $("#COMPLAINT_CATEGORY_CODE").val(),
                    COMPLAINT_CATEGORY_NAME: $("#COMPLAINT_CATEGORY_NAME").val(),



                    MaterialSupplyDetail: MaterialSupplyDetail,
                    Invoice_List: Invoice_List,
                    Observation_Remarks: Observation_Remarks,

                    Supply_Details: Supply_Details,
                    Supply_DetailsB: Supply_DetailsB,
                    Breakage_Inspection_Sheet: Breakage_Inspection_Sheet,
                    Site_Observation_Sheet: Site_Observation_Sheet,
                    Site_Observation_Sheet_BU8:  $("#SiteObservationsRemarks_if_any").val(),
                    MSD_BU3: MSD_BU3,
                    SupDetSD_BU3: SupDetSD_BU3,
                    MSD_BU8: MSD_BU8,
                    SupDetSD_BU8: SupDetSD_BU8,
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                    Compensation_Mode: (typeof $scope.Compensation_Mode == "undefined") ? "" : $scope.Compensation_Mode,
                    Compensation_Mode_Code: (typeof $scope.Compensation_Mode_Code == "undefined") ? "" : $scope.Compensation_Mode_Code,
                    Compensation_Mode_ID: (typeof $scope.Compensation_Mode_ID == "undefined") ? "" : $scope.Compensation_Mode_ID,
                    Any_Special_Remarks: (typeof $("#Any_Special_Remarks").val() == "undefined") ? "" : $("#Any_Special_Remarks").val(),
                    Compensation_In_Running_Meters: (typeof $("#Compensation_In_Running_Meters").val() == "undefined") ? "" : $("#Compensation_In_Running_Meters").val(),
                    Compensation_In_Tons: (typeof $("#Compensation_In_Tons").val() == "undefined") ? "" : $("#Compensation_In_Tons").val(),
                    Compensation_In_Running_Meter_Words: (typeof $("#Compensation_In_Running_Meter_Words").val() == "undefined") ? "" : $("#Compensation_In_Running_Meter_Words").val(),
                    Size_Recommendation_RMTS: (typeof $("#Size_Recommendation_RMTS").val() == "undefined") ? "" : $("#Size_Recommendation_RMTS").val(),
                    Other_Size_RMTS: (typeof $("#Other_Size_RMTS").val() == "undefined") ? "" : $("#Other_Size_RMTS").val(),
                    CompensationInNos: (typeof $("#CompensationInNos").val() == "undefined") ? "" : $("#CompensationInNos").val(),
                    CompensationInNosWords: (typeof $("#CompensationInNosWords").val() == "undefined") ? "" : $("#CompensationInNosWords").val(),
                    CompensationinMetricCubic: (typeof $("#CompensationinMetricCubic").val() == "undefined") ? "" : $("#CompensationinMetricCubic").val(),
                    CompensationinMetricCubicValue: (typeof $("#CompensationinMetricCubicValue").val() == "undefined") ? "" : $("#CompensationinMetricCubicValue").val(),
                    CompensationIssueCreditNote: (typeof $("#CompensationIssueCreditNote").val() == "undefined") ? "" : $("#CompensationIssueCreditNote").val(),
                    CompensationAmountCredited: (typeof $("#CompensationAmountCredited").val() == "undefined") ? "" : $("#CompensationAmountCredited").val(),
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                    party_type: $("#party_type_id").val(),
                    SubStockiest_Code: $("#SubStockiest_Code").val(),
                    SubStockiest_ID: $("#SubStockiest_ID").val(),
                    SubStockiest_Name: $("#SubStockiest_Name").val(),
                    SubStockiest_Address: $("#SubStockiest_Address").val(),
                    SubStockiest_Number: $("#SubStockiest_Number").val(),
                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                    TYPE_OF_COMPLAINT: TYPE_OF_COMPLAINT_ID,
                    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                    //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start                        
                    is_rejectable: is_rejectable
                    //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end
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
                    url: '../../ComplaintRegistration/SaveInvestigation',
                    async: false,
                    data: { InvestigationData: InvestigationData },
                }).then(function successCallback(response) {
                    debugger
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
                                $("#FormIdentity").val(RD["ID"]);
                                $("#Investigation_Id").val(RD["ID"]);
                                $("#SendInvestigationApproval").css("display", "block");
                            }
                        }
                    }
                    if ($("#Investigation_Status").val() == "DRAFT") {
                        $("#SendInvestigationApproval").css('display', 'block');
                    }
                    else {
                        $("#SendInvestigationApproval").css('display', 'none');
                    }
                    $("#MyTest").val("");
                    //go('InvestigationList');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }

        }
        catch (e) {
            alert("Error :SaveInvestigationData : " + e);
            console.log("Error :SaveInvestigationData : " + e);
        }
    }

    //svprasadk 09-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start
    $scope.SendInvestigationForApproval = function () {
        try {
            var r = confirm("Do you want to Send for review?");
            if (r == true) {
                $("#MyTest").val("ASD");
                $scope.SaveInvestigationData();

                var Flag = 0;
                var PType = $("#Product_Type_CODE").val();
                var FormIdentity = $("#FormIdentity").val();
                var Doc_Status = $("#Investigation_Status").val();
                var SiteLength = $("#Site_Observation_Sheet_Table tbody tr").length;
                var ObrLength = $("#Observation_Remarks_Table tbody tr").length;
                var RowId = 0;
                var MSDRowNetLoss = 0;
                var MSDTotalNetLoss = 0;
                var is_rejectable = 0;

                if (Doc_Status != "DRAFT") {
                    alert("Document Status is " + Doc_Status + "");
                    $("#MyTest").val("");
                    return;
                }

                if ($("#Complaint_No").val() == "") {
                    Flag = Flag + 1;
                    $("#Complaint_No").css("border-color", "red");
                }
                else {
                    $("#Complaint_No").css("border-color", "#d2d6de");
                }

                if ($("#Complaint_Received_Date").val() == "") {
                    Flag = Flag + 1;
                    $("#Complaint_Received_Date").css("border-color", "red");
                }
                else {
                    $("#Complaint_Received_Date").css("border-color", "#d2d6de");
                }

                if ($("#Complaint_Attended_Date").val() == "") {
                    Flag = Flag + 1;
                    $("#Complaint_Attended_Date").css("border-color", "red");
                }
                else {
                    $("#Complaint_Attended_Date").css("border-color", "#d2d6de");
                }

                if ($("#Investigator_Type").val() == "") {
                    Flag = Flag + 1;
                    $("#Investigator_Type").css("border-color", "red");
                }
                else {
                    $("#Investigator_Type").css("border-color", "#d2d6de");
                }

                if ($("#IGS_Series_Code").val() == "") {
                    Flag = Flag + 1;
                    $("#IGS_Series_Code").css("border-color", "red");
                }
                else {
                    $("#IGS_Series_Code").css("border-color", "#d2d6de");
                }

                if (PType != "SBU3") {
                    if ($("#Visited_Date").val() == "") {
                        Flag = Flag + 1;
                        $("#Visited_Date").css("border-color", "red");
                    }
                    else {
                        $("#Visited_Date").css("border-color", "#d2d6de");
                    }
                }

                //if ($("#SelectedFiles").text() != "" || $("ul#InvestigationFilesUploaded li").length > 0) {
                //    $("#ClickUploadFile").val(1);
                //    $("#ClickSaveComplaint").val(1);
                //}
                ////console.log('InvestigationFilesUploaded', $("ul#InvestigationFilesUploaded li").length)
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

                if (PType == "") {
                    return;
                } else if (PType == "SBU1" && document.getElementById("is_rejectable").checked == false) {
                    is_rejectable = 0;
                    var CREATED_DATE = $("#CREATED_DATE").val();
                    if (new Date(CREATED_DATE) >= new Date('2020-11-19')) {
                        if ($("#TYPE_OF_COMPLAINT_ID").val() == "" || typeof $("#TYPE_OF_COMPLAINT_ID").val() == "undefined") {
                            Flag = Flag + 1;
                            $("#TYPE_OF_COMPLAINT_ID").css("border-color", "red");
                        }
                        else {
                            $("#TYPE_OF_COMPLAINT_ID").css("border-color", "#d2d6de");
                        }
                    }
                    if ($("#SelectedFiles").text() != "" || $("ul#InvestigationFilesUploaded li").length > 0) {
                        $("#ClickUploadFile").val(1);
                        $("#ClickSaveComplaint").val(1);
                    }
                    //console.log('InvestigationFilesUploaded', $("ul#InvestigationFilesUploaded li").length)
                    var file = document.getElementById('InvestigationFile').files.length;
                    if (file == 0 && ($("ul#InvestigationFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
                        alert("Please Select Attachment and Press Upload and then click on Save button");
                        return;
                    }
                    if (file >= 0 && $("#ClickUploadFile").val() == 0 && $("#ClickSaveComplaint").val() == 0) {
                        alert("Please Upload Attachment and then click on Save button");
                        return;
                    }

                    if (file >= 0 && $("#ClickUploadFile").val() == 1 && $("#ClickSaveComplaint").val() == 0) {
                        alert("Please Save Complaint");
                        return;
                    }
                    if ($("#Total_Supply_Oty_Mtrs").val() == "") {
                        Flag = Flag + 1;
                        $("#Total_Supply_Oty_Mtrs").css("border-color", "red");
                    }
                    else {
                        $("#Total_Supply_Oty_Mtrs").css("border-color", "#d2d6de");
                    }

                    if ($("#Total_Breakage_Qty_Mtrs").val() == "") {
                        Flag = Flag + 1;
                        $("#Total_Breakage_Qty_Mtrs").css("border-color", "red");
                    }
                    else {
                        $("#Total_Breakage_Qty_Mtrs").css("border-color", "#d2d6de");
                    }

                    if ($("#Total_Recovery_Mtrs").val() == "") {
                        Flag = Flag + 1;
                        $("#Total_Recovery_Mtrs").css("border-color", "red");
                    }
                    else {
                        $("#Total_Recovery_Mtrs").css("border-color", "#d2d6de");
                    }

                    if ($("#Net_Loss_Mtrs").val() == "") {
                        Flag = Flag + 1;
                        $("#Net_Loss_Mtrs").css("border-color", "red");
                    }
                    else {
                        $("#Net_Loss_Mtrs").css("border-color", "#d2d6de");
                    }

                    if (ObrLength <= 0) {
                        alert("Please Fill Observation/Remarks")
                        return;
                    }

                    if (SiteLength <= 0) {
                        alert("Please Fill Site Observation Sheet")
                        return;
                    }

                    var A1 = $("#Total_Supply_Oty_Mtrs").val();
                    var A2 = $("#Total_Breakage_Qty_Mtrs").val();
                    var A3 = $("#Total_Recovery_Mtrs").val();
                    var A4 = $("#Net_Loss_Mtrs").val();

                    console.clear();
                    console.log("A1 : " + A1);
                    console.log("A2 : " + A2);
                    console.log("A3 : " + A3);
                    console.log("A4 : " + A4);
                    console.log("BusinessUnit : " + PType);

                    if (parseFloat(A1) < parseFloat(A2)) {
                        alert("Total Supply Quantity cannot be lessthan Total Breakage Quantity");
                        return;
                    }
                    else if (parseFloat(A2) < parseFloat(A3)) {
                        alert("Total Breakage Quantity cannot be lessthan Total Recovery Quantity");
                        return;
                    }

                    var Net_Loss_Mtrs = $("#Net_Loss_Tons").val();
                    console.log("Net_Loss_Mtrs : " + Net_Loss_Mtrs + "\t MSDTotalNetLoss" + MSDTotalNetLoss);

                    if (parseFloat(Net_Loss_Mtrs) < parseFloat(MSDTotalNetLoss)) {
                        alert("Material Supply Details Net Loss does not match with Actual Net Loss");
                        return;
                    }
                } else if (PType == "SBU2" || PType == "SBU3") {
                    is_rejectable = 0
                    if ($("#SelectedFiles").text() != "" || $("ul#InvestigationFilesUploaded li").length > 0) {
                        $("#ClickUploadFile").val(1);
                        $("#ClickSaveComplaint").val(1);
                    }
                    //console.log('InvestigationFilesUploaded', $("ul#InvestigationFilesUploaded li").length)
                    var file = document.getElementById('InvestigationFile').files.length;
                    if (file == 0 && ($("ul#InvestigationFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
                        alert("Please Select Attachment and Press Upload and then click on Save button");
                        return;
                    }
                    if (file >= 0 && $("#ClickUploadFile").val() == 0 && $("#ClickSaveComplaint").val() == 0) {
                        alert("Please Upload Attachment and then click on Save button");
                        return;
                    }

                    if (file >= 0 && $("#ClickUploadFile").val() == 1 && $("#ClickSaveComplaint").val() == 0) {
                        alert("Please Save Complaint");
                        return;
                    }
                    if ($("#Total_Supply_Oty_Mtrs").val() == "") {
                        $("#Total_Supply_Oty_Mtrs").val("0");
                    }

                    if ($("#Total_Breakage_Qty_Mtrs").val() == "") {
                        $("#Total_Breakage_Qty_Mtrs").val("0");
                    }

                    if ($("#Total_Recovery_Mtrs").val() == "") {
                        $("#Total_Recovery_Mtrs").val("0");
                    }

                    if ($("#Net_Loss_Mtrs").val() == "") {
                        $("#Net_Loss_Mtrs").val("0");
                    }

                    if ($("#Total_Supply_Qty_Tons").val() == "") {
                        $("#Total_Supply_Qty_Tons").val("0");
                    }

                    if ($("#Total_Breakage_Qty_Tons").val() == "") {
                        $("#Total_Breakage_Qty_Tons").val("0");
                    }

                    if ($("#Total_Recovery_Tons").val() == "") {
                        $("#Total_Recovery_Tons").val("0");
                    }

                    if ($("#Net_Loss_Tons").val() == "") {
                        $("#Net_Loss_Tons").val("0");
                    }
                } else if (PType == "SBU1" && document.getElementById("is_rejectable").checked == true) {
                    is_rejectable = 1;
                    if ($("#IR_Remarks").val() == "") {
                        Flag = Flag + 1;
                        $("#IR_Remarks").css("border-color", "red");
                    }
                    else {
                        $("#IR_Remarks").css("border-color", "#d2d6de");
                    }
                }

                if ($('.periodorinvoicecheck:checkbox:checked').length == 0) {
                    Flag = Flag + 1;
                    alert("Please check either period or invoice checkbox");
                    return false;
                }

                if (Flag > 0) {
                    alert("Please fill All Mandatory fields before sending for Approval");
                    $("#MyTest").val("");
                    return;
                }
                else if (FormIdentity == "") {
                    alert("Please Save the form before Sending for Approval");
                }
                else {
                    $("#Material_Supply_Detail_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        RowNetLoss = $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[7].innerHTML;
                        console.log("RowNetLoss : " + RowNetLoss);
                        if (RowNetLoss == "") {
                        }
                        else {
                            MSDTotalNetLoss = parseFloat(RowNetLoss) + parseFloat(MSDTotalNetLoss);
                        }
                    });
                    //alert('SendForApproval', is_rejectable)
                    var ApprovalData = JSON.stringify({
                        FormIdentity: FormIdentity,
                        Complaint_Tracking_No: $("#Complaint_Tracking_No").val(),
                        CreatedBy: $("#CreatedByCode").val(),
                        FormName: "Investigation",
                        is_rejectable: is_rejectable
                    });


                    $http({
                        method: 'POST',
                        url: '../../ComplaintRegistration/SendForApproval',
                        async: false,
                        data: { ApprovalData: ApprovalData },
                    }).then(function successCallback(response) {

                        if (response.data == "FALSE") {
                            alert("Error Occured Please try later");
                        }
                        else if (response.data == "TRUE") {
                            $("#Investigation_Status").val("Waiting for approval");
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

                            $scope.go('InvestigationList');

                        }
                        //go('InvestigationList');
                    }, function errorCallback(response) {
                        alert("Error : " + response);
                    });
                }
            } else {
                return;
            }
        } catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }
    //svprasadk 09-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end

    //$scope.SendInvestigationForApproval = function () {
    //    try {
    //        //console.clear();

    //        if (confirm("Do you want to Send for review?")) {
    //        }
    //        else {
    //            return;
    //        }

    //        $("#MyTest").val("ASD");
    //        $scope.SaveInvestigationData();

    //        var Flag = 0;

    //        var PType = $("#Product_Type").val();

    //        if (PType == "SBU2" || PType == "SBU3") {

    //            if ($("#Total_Supply_Oty_Mtrs").val() == "") {
    //                $("#Total_Supply_Oty_Mtrs").val("0");
    //            }

    //            if ($("#Total_Breakage_Qty_Mtrs").val() == "") {
    //                $("#Total_Breakage_Qty_Mtrs").val("0");
    //            }

    //            if ($("#Total_Recovery_Mtrs").val() == "") {
    //                $("#Total_Recovery_Mtrs").val("0");
    //            }

    //            if ($("#Net_Loss_Mtrs").val() == "") {
    //                $("#Net_Loss_Mtrs").val("0");
    //            }

    //            if ($("#Total_Supply_Qty_Tons").val() == "") {
    //                $("#Total_Supply_Qty_Tons").val("0");
    //            }

    //            if ($("#Total_Breakage_Qty_Tons").val() == "") {
    //                $("#Total_Breakage_Qty_Tons").val("0");
    //            }

    //            if ($("#Total_Recovery_Tons").val() == "") {
    //                $("#Total_Recovery_Tons").val("0");
    //            }

    //            if ($("#Net_Loss_Tons").val() == "") {
    //                $("#Net_Loss_Tons").val("0");
    //            }

    //        }


    //        var Doc_Status = $("#Investigation_Status").val();
    //        if (Doc_Status == "DRAFT") {

    //        }
    //        else {
    //            alert("Document Status is " + Doc_Status + "");
    //            $("#MyTest").val("");
    //            return;
    //        }


    //        if ($("#Complaint_No").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Complaint_No").css("border-color", "red");
    //        }
    //        else {
    //            $("#Complaint_No").css("border-color", "#d2d6de");
    //        }

    //        if ($("#Complaint_Received_Date").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Complaint_Received_Date").css("border-color", "red");
    //        }
    //        else {
    //            $("#Complaint_Received_Date").css("border-color", "#d2d6de");
    //        }


    //        if ($("#Complaint_Attended_Date").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Complaint_Attended_Date").css("border-color", "red");
    //        }
    //        else {
    //            $("#Complaint_Attended_Date").css("border-color", "#d2d6de");
    //        }

    //        if ($("#Investigator_Type").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Investigator_Type").css("border-color", "red");
    //        }
    //        else {
    //            $("#Investigator_Type").css("border-color", "#d2d6de");
    //        }


    //        if ($("#IGS_Series_Code").val() == "") {
    //            Flag = Flag + 1;
    //            $("#IGS_Series_Code").css("border-color", "red");
    //        }
    //        else {
    //            $("#IGS_Series_Code").css("border-color", "#d2d6de");
    //        }

    //        if ($("#Total_Supply_Oty_Mtrs").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Total_Supply_Oty_Mtrs").css("border-color", "red");
    //        }
    //        else {
    //            $("#Total_Supply_Oty_Mtrs").css("border-color", "#d2d6de");
    //        }

    //        if ($("#Total_Breakage_Qty_Mtrs").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Total_Breakage_Qty_Mtrs").css("border-color", "red");
    //        }
    //        else {
    //            $("#Total_Breakage_Qty_Mtrs").css("border-color", "#d2d6de");
    //        }

    //        if ($("#Total_Recovery_Mtrs").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Total_Recovery_Mtrs").css("border-color", "red");
    //        }
    //        else {
    //            $("#Total_Recovery_Mtrs").css("border-color", "#d2d6de");
    //        }

    //        if ($("#Net_Loss_Mtrs").val() == "") {
    //            Flag = Flag + 1;
    //            $("#Net_Loss_Mtrs").css("border-color", "red");
    //        }
    //        else {
    //            $("#Net_Loss_Mtrs").css("border-color", "#d2d6de");
    //        }


    //        if (($("#Product_Type").val() == "SBU1") || ($("#Product_Type").val() == "SBU2")) {
    //            if ($("#Visited_Date").val() == "") {
    //                Flag = Flag + 1;
    //                $("#Visited_Date").css("border-color", "red");
    //            }
    //            else {
    //                $("#Visited_Date").css("border-color", "#d2d6de");
    //            }
    //        }
    //        else if ($("#Product_Type").val() == "SBU3") {

    //        }




    //        var FormIdentity = $("#FormIdentity").val();

    //        if (Flag > 0) {
    //            alert("Please fill All Mandatory fields before sending for Approval");
    //            $("#MyTest").val("");
    //            return;
    //        }
    //        else if (FormIdentity == "") {
    //            alert("Please Save the form before Sending for Approval");
    //        }
    //        else {

    //            var SiteLength = $("#Site_Observation_Sheet_Table tbody tr").length;
    //            var ObrLength = $("#Observation_Remarks_Table tbody tr").length;

    //            if (PType == "SBU2" || PType == "SBU3") {
    //            }
    //            else {
    //                if (ObrLength > 0) {
    //                }
    //                else {
    //                    alert("Please Fill Observation/Remarks")
    //                    return;
    //                }

    //                if (SiteLength > 0) {
    //                }
    //                else {
    //                    alert("Please Fill Site Observation Sheet")
    //                    return;
    //                }
    //            }

    //            console.clear();

    //            var RowId = 0;
    //            var MSDRowNetLoss = 0;
    //            var MSDTotalNetLoss = 0;

    //            $("#Material_Supply_Detail_Table tbody tr").each(function () {
    //                RowId = ($(this).attr("id"));
    //                RowNetLoss = $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[7].innerHTML;
    //                console.log("RowNetLoss : " + RowNetLoss);
    //                if (RowNetLoss == "") {
    //                }
    //                else {
    //                    MSDTotalNetLoss = parseFloat(RowNetLoss) + parseFloat(MSDTotalNetLoss);
    //                }
    //            });

    //            console.log("MSDTotalNetLoss : " + MSDTotalNetLoss);

    //            var BusinessUnit = $("#Product_Type").val();

    //            console.log("BusinessUnit : " + BusinessUnit);

    //            if (BusinessUnit == "") {
    //                return;
    //            }
    //            else if (BusinessUnit == "SBU1") {


    //                var A1 = $("#Total_Supply_Oty_Mtrs").val();
    //                var A2 = $("#Total_Breakage_Qty_Mtrs").val();
    //                var A3 = $("#Total_Recovery_Mtrs").val();
    //                var A4 = $("#Net_Loss_Mtrs").val();

    //                console.clear();
    //                console.log("A1 : " + A1);
    //                console.log("A2 : " + A2);
    //                console.log("A3 : " + A3);
    //                console.log("A4 : " + A4);
    //                console.log("BusinessUnit : " + BusinessUnit);

    //                if (parseFloat(A1) < parseFloat(A2)) {
    //                    alert("Total Supply Quantity cannot be lessthan Total Breakage Quantity");
    //                    return;
    //                }
    //                else if (parseFloat(A2) < parseFloat(A3)) {
    //                    alert("Total Breakage Quantity cannot be lessthan Total Recovery Quantity");
    //                    return;
    //                }

    //                var Net_Loss_Mtrs = $("#Net_Loss_Tons").val();
    //                console.log("Net_Loss_Mtrs : " + Net_Loss_Mtrs + "\t MSDTotalNetLoss" + MSDTotalNetLoss);

    //                if (parseFloat(Net_Loss_Mtrs) >= parseFloat(MSDTotalNetLoss)) {
    //                }
    //                else {
    //                    alert("Material Supply Details Net Loss does not match with Actual Net Loss");
    //                    return;
    //                }
    //                if ($("#SelectedFiles").text() != "" || $("ul#InvestigationFilesUploaded li").length > 0) {
    //                    $("#ClickUploadFile").val(1);
    //                    $("#ClickSaveComplaint").val(1);
    //                }
    //                //console.log('InvestigationFilesUploaded', $("ul#InvestigationFilesUploaded li").length)
    //                var file = document.getElementById('InvestigationFile').files.length;
    //                if (file == 0 && ($("ul#InvestigationFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
    //                    alert("Please Select Attachment and Press Upload and then click on Save button");
    //                    return;
    //                }
    //                if (file >= 0 && $("#ClickUploadFile").val() == 0 && $("#ClickSaveComplaint").val() == 0) {
    //                    alert("Please Upload Attachment and then click on Save button");
    //                    return;
    //                }

    //                if (file >= 0 && $("#ClickUploadFile").val() == 1 && $("#ClickSaveComplaint").val() == 0) {
    //                    alert("Please Save Complaint");
    //                    return;
    //                }
    //            }
    //            else if (BusinessUnit == "SBU2" || BusinessUnit == "SBU3") {
    //                if ($("#SelectedFiles").text() != "" || $("ul#InvestigationFilesUploaded li").length > 0) {
    //                    $("#ClickUploadFile").val(1);
    //                    $("#ClickSaveComplaint").val(1);
    //                }
    //                var file = document.getElementById('InvestigationFile').files.length;
    //                if (file == 0 && ($("ul#InvestigationFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
    //                    alert("Please Select Attachment and Press Upload and then click on Save button");
    //                    return;
    //                }
    //                if (file >= 0 && $("#ClickUploadFile").val() == 0 && $("#ClickSaveComplaint").val() == 0) {
    //                    alert("Please Upload Attachment and then click on Save button");
    //                    return;
    //                }

    //                if (file >= 0 && $("#ClickUploadFile").val() == 1 && $("#ClickSaveComplaint").val() == 0) {
    //                    alert("Please Save Complaint");
    //                    return;
    //                }
    //            }

    //            var ApprovalData = JSON.stringify({
    //                FormIdentity: FormIdentity,
    //                Complaint_Tracking_No: $("#Complaint_Tracking_No").val(),
    //                CreatedBy: $("#CreatedByCode").val(),
    //                FormName: "Investigation"
    //            });


    //            $http({
    //                method: 'POST',
    //                url: '../../ComplaintRegistration/SendForApproval',
    //                async: false,
    //                data: { ApprovalData: ApprovalData },
    //            }).then(function successCallback(response) {

    //                if (response.data == "FALSE") {
    //                    alert("Error Occured Please try later");
    //                }
    //                else if (response.data == "TRUE") {
    //                    $("#Investigation_Status").val("Waiting for approval");
    //                    alert("Successfully sent for Approval");

    //                    $("#ComplaintNumberSpan").css("pointer-events", "none");
    //                    $("#Investigator_TypeSpan").css("pointer-events", "none");
    //                    $("#GetInvestigation_Done_BySpan").css("pointer-events", "none");
    //                    $("#CRSeriesCode").css("pointer-events", "none");
    //                    $("#BISSizeSapn").css("pointer-events", "none");
    //                    $("#GetBISDefectTypeMasterSpan").css("pointer-events", "none");
    //                    $("#GetRecoveryMasterInvSpan").css("pointer-events", "none");

    //                    $("#BI_Sheet_Add").css('display', 'none');
    //                    $("#Observation_Remarks_Add").css('display', 'none');
    //                    $("#Site_Observation_Sheet_Add").css('display', 'none');
    //                    $("#BI_Sheet_GO").css('display', 'none');
    //                    $("#Mat_Sup_Det_Add").css('display', 'none');
    //                    $("#Invoice_List_AddBtn").css('display', 'none');
    //                    $("#Supply_Details_Add").css('display', 'none');
    //                    $("#Supply_Details_AddB").css('display', 'none');

    //                    $("#CompInvSave").css('display', 'none');
    //                    $("#SendInvestigationApproval").css('display', 'none');

    //                    $scope.go('InvestigationList');

    //                }
    //                //go('InvestigationList');
    //            }, function errorCallback(response) {
    //                alert("Error : " + response);
    //            });

    //        }
    //    }
    //    catch (e) {
    //        alert("Error :RegisterComplaint : " + e);
    //    }
    //}
    $scope.GetApprovalPopUp = function () {
        //try {
        //    $("#Approvals_Remarks").val("");
        //    $("#ApprovalsActionForm").modal('show');
        //}
        //catch (e) {
        //    alert("Error : " + e);
        //}
        try {
            $("#Approvals_Remarks").val("");
            if (document.getElementById("is_rejectable").checked == true) {
                $("#rejectedoverphonedisable").attr('disabled', 'disabled');
            } else {
                $("#rejectedoverphonedisable").removeAttr('disabled');
            }
            $("#ApprovalsActionForm").modal('show');
        } catch (e) {
            alert("Error : " + e);
        }
    }
    $scope.MakeApproved = function (Decision) {
        try {
            //if (confirm("Do you want to Approve?")) {
            //}
            //else {
            //    return;
            //}

            $("#MyTest").val("ASD");
            $scope.SaveInvestigationData();

            if ($scope.Investigation_Status == "DRAFT") {
                alert("Please send for approval");
            }
            else if ($scope.Investigation_Status == "Approved") {
                alert("This record already got approved");
            }
            else {

                var Approvals_Remarks = $("#Approvals_Remarks").val();
                if (Decision == "Rejected") {
                    if (Approvals_Remarks == "") {
                        alert("Please Provide Reason for Rejection");
                        return;
                    }
                }
                else {
                    Approvals_Remarks = "";
                }


                var ApprovalData = JSON.stringify({
                    CM_Id: $("#Investigation_Id").val(),
                    ModifiedBy: $("#CreatedByCode").val(),
                    FormName: "Investigation",
                    Decision: Decision,
                    Approvals_Remarks: Approvals_Remarks
                });

                $("#ApprovalsActionForm").modal('hide');

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistration/MakeApproval',
                    async: false,
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") {
                        alert("Error Occured Please try later");
                    }
                    else if (response.data == "TRUE") {
                        $("#Investigation_Status").val("Approved");
                        $("#ShowStatus").val("Investigation Approved. Compensation under review");

                        //alert("Successfully Approved.");
                        alert("Successfully " + Decision);

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
                        $("#MakeApproved").css('display', 'none');

                        $scope.go('ComplaintPendingApproval');

                    }
                    //go('ComplaintPendingApproval');
                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }
        }
        catch (e) {
            alert("Error :MakeAprovedInv : " + e);
        }
    }

    //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
    $scope.IssueCredited = function () {
        $scope.AmountCredited = $scope.CompensationIssueCreditNote;
    }
    //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

    $scope.StateChange = function () {
        try {
            var StateFilter = $("#StateFilter").val();
            $("#CMSState").val(StateFilter);
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }
    //VIKAS G, 10-3-2022

    $scope.SaveSDDataBU3 = function () {
        try {
            debugger
            var BusinessUnit = $("#Product_Type_CODE").val();
            var SD_IDBU3 = $("#SD_IDBU3").val();
            var Product_Code_BU3 = $("#Product_Code_BU3").val();
            var Product_Name_BU3 = $("#Product_Name_BU3").val();
            //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
            var Plant_Name_BU3 = $("#Plant_Name_BU3").val();
            var InvoiceNoBU3 = $("#InvoiceNoBU3").val();
            var InvoiceDateBU3 = $("#InvoiceDateBU3").val();
            var BatchNoBU3 = $("#BatchNoBU3").val();
            var SuppliedQtyNosBU3 = $("#SuppliedQtyNosBU3").val();
            var DefectiveQtyNosBU3 = $("#DefectiveQtyNosBU3").val();
            var ActDefectiveQtyNosBU3 = $("#ActDefectiveQtyNosBU3").val();
            var DefectTypeNameBU3 = $("#DefectTypeNameBU3").val();
            var DefectTypeCodeBU3 = $("#DefectTypeCodeBU3").val();
            var DefectprctBU8 = $("#DefectprctBU8").val();
            var TransporterBU3 = $("#TransporterBU3").val();
            var RemarksBU3 = $("#RemarksBU3").val();

            var Flag = 0;

            if (Product_Code_BU3 == "") {
                Flag = Flag + 1;
                $("#Product_Code_BU3").css("border-color", "red");
            }
            else {
                $("#Product_Code_BU3").css("border-color", "#d2d6de");
            }
            //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
            //if (Plant_Name_BU3 == "") {Plant_Name_BU3
            //  Flag = Flag + 1;
            // $("#Plant_Name_BU3").css("border-color", "red");
            // }
            //else {
            //  $("#Plant_Name_BU3").css("border-color", "#d2d6de");
            //}

            if (InvoiceNoBU3 == "") {
                Flag = Flag + 1;
                $("#InvoiceNoBU3").css("border-color", "red");
            }
            else {
                $("#InvoiceNoBU3").css("border-color", "#d2d6de");
            }

            if (InvoiceDateBU3 == "") {
                Flag = Flag + 1;
                $("#InvoiceDateBU3").css("border-color", "red");
            }
            else {
                $("#InvoiceDateBU3").css("border-color", "#d2d6de");
            }

            if (SuppliedQtyNosBU3 == "") {
                Flag = Flag + 1;
                $("#SuppliedQtyNosBU3").css("border-color", "red");
            }
            else {
                $("#SuppliedQtyNosBU3").css("border-color", "#d2d6de");
            }

            if (DefectiveQtyNosBU3 == "") {
                Flag = Flag + 1;
                $("#DefectiveQtyNosBU3").css("border-color", "red");
            }
            else {
                $("#DefectiveQtyNosBU3").css("border-color", "#d2d6de");
            }

            if (ActDefectiveQtyNosBU3 == "") {
                Flag = Flag + 1;
                $("#ActDefectiveQtyNosBU3").css("border-color", "red");
            }
            else {
                $("#ActDefectiveQtyNosBU3").css("border-color", "#d2d6de");
            }

            if (DefectTypeNameBU3 == "") {
                Flag = Flag + 1;
                $("#DefectTypeNameBU3").css("border-color", "red");
            }
            else {
                $("#DefectTypeNameBU3").css("border-color", "#d2d6de");
            }

            if (Flag > 0) {
                return;
            }
            else {
                if (InvoiceNoBU3 == "") {
                }
                else if (InvoiceNoBU3.length == 10) {
                }
                else {
                    alert("Invalid Invoice Number");
                    return
                }


                if (isNaN(SuppliedQtyNosBU3) || isNaN(DefectiveQtyNosBU3) || isNaN(ActDefectiveQtyNosBU3)) {
                    alert("Enter valid Numbers in Supplied, Defect and Actual Defect quantities");
                    return;
                }

                SuppliedQtyNosBU3 = parseInt(SuppliedQtyNosBU3);
                DefectiveQtyNosBU3 = parseInt(DefectiveQtyNosBU3);
                ActDefectiveQtyNosBU3 = parseInt(ActDefectiveQtyNosBU3);

                if (parseInt(SuppliedQtyNosBU3) < parseInt(DefectiveQtyNosBU3)) {
                    alert("Defect quantity cannot be less than the Supplied quantity");
                    return;
                }
                if (parseInt(SuppliedQtyNosBU3) < parseInt(ActDefectiveQtyNosBU3)) {
                    alert("Actual Defect quantity cannot be less than the Supplied quantity");
                    return;
                }


                if (SD_IDBU3 == "") {

                    var TRCode = "";

                    TRCode = TRCode + "<td>" + Product_Code_BU3 + "</td>";
                    TRCode = TRCode + "<td>" + Product_Name_BU3 + "</td>";
                    //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
                    TRCode = TRCode + "<td>" + Plant_Name_BU3 + "</td>";
                    TRCode = TRCode + "<td>" + InvoiceNoBU3 + "</td>";
                    TRCode = TRCode + "<td>" + InvoiceDateBU3 + "</td>";

                    TRCode = TRCode + "<td>" + BatchNoBU3 + "</td>";
                    TRCode = TRCode + "<td>" + SuppliedQtyNosBU3 + "</td>";
                    TRCode = TRCode + "<td>" + DefectiveQtyNosBU3 + "</td>";
                    TRCode = TRCode + "<td>" + ActDefectiveQtyNosBU3 + "</td>";

                    TRCode = TRCode + "<td>" + TransporterBU3 + "</td>";

                    TRCode = TRCode + "<td>" + DefectTypeNameBU3 + "</td>";
                    if (BusinessUnit == "SBU8") {
                        TRCode = TRCode + "<td>" + DefectprctBU8 + "</td>";
                    }
                    TRCode = TRCode + "<td>" + RemarksBU3 + "</td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td style='display:none;' >" + DefectTypeCodeBU3 + "</td>";


                    SD_IDBU3 = $("#Supply_Details_TableSBU3 tbody tr").length + 1;

                    TRCode = "<tr class='MousePointer' id='SDBU3_" + SD_IDBU3 + "' onclick='EditSDBBU3(this.id)'><td>" + SD_IDBU3 + "</td>" + TRCode + "</tr>";
                    $("#Supply_Details_TableSBU3 tbody").append(TRCode);
                }
                else if (BusinessUnit == "SBU3") {

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[0].innerHTML = SD_IDBU3;

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[1].innerHTML = Product_Code_BU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[2].innerHTML = Product_Name_BU3;
                    //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[3].innerHTML = Plant_Name_BU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[4].innerHTML = InvoiceNoBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[5].innerHTML = InvoiceDateBU3;

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[6].innerHTML = BatchNoBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[7].innerHTML = SuppliedQtyNosBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[8].innerHTML = DefectiveQtyNosBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[9].innerHTML = ActDefectiveQtyNosBU3;

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[10].innerHTML = TransporterBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[11].innerHTML = DefectTypeNameBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[12].innerHTML = RemarksBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[13].innerHTML = DefectTypeCodeBU3;

                }
                else if (BusinessUnit == "SBU8") {

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[0].innerHTML = SD_IDBU3;

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[1].innerHTML = Product_Code_BU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[2].innerHTML = Product_Name_BU3;
                    //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[3].innerHTML = Plant_Name_BU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[4].innerHTML = InvoiceNoBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[5].innerHTML = InvoiceDateBU3;

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[6].innerHTML = BatchNoBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[7].innerHTML = SuppliedQtyNosBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[8].innerHTML = DefectiveQtyNosBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[9].innerHTML = ActDefectiveQtyNosBU3;

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[10].innerHTML = TransporterBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[11].innerHTML = DefectTypeNameBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[12].innerHTML = DefectprctBU8;

                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[13].innerHTML = RemarksBU3;
                    $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + " td")[15].innerHTML = DefectTypeCodeBU3;

                }



                $("#SupplyDetailModalSBU3").modal("hide");
                //svprasadk 05-10-2020 SBU 1 requirement to get data from supply details to material supply details start
                //sdtomsd();
                //svprasadk 05-10-2020 SBU 1 requirement to get data from supply details to material supply details end
                SaveDataToServerInvestigation('Supply_DetailsBU3');
                AddThingsToProductDetails();
            }
        }
        catch (e) {
            alert("Error : SaveSDDataB :" + e);
        }
    }
    function sdtomsd() {
        try {
            debugger
            var Total_Supply_Qty_Tons = $("#Total_Supply_Qty_Tons").val();
            var Total_Breakage_Qty_Tons = $("#Total_Breakage_Qty_Tons").val();
            var Net_Loss_Tons = $("#Net_Loss_Tons").val();

            var MSD_id = $("#MSD_id").val();
            var Material_Belongs_To = $("#Material_Belongs_To").val();
            var Product_Supplied_From = $("#Product_Supplied_From").val();
            var MSD_Name = $("#MSD_Name").val();
            var MSD_UOM = $("#MSD_UOM").val();
            var MSD_Supply_Qty = ($("#MSD_Supply_Qty").val() != "") ? $("#MSD_Supply_Qty").val() : Total_Supply_Qty_Tons;
            var MSD_Breakage_Qty = ($("#MSD_Breakage_Qty").val() != "") ? $("#MSD_Breakage_Qty").val() : Total_Breakage_Qty_Tons;
            var MSD_Net_Loss_Qty = ($("#MSD_Net_Loss_Qty").val() != "") ? $("#MSD_Net_Loss_Qty").val() : Net_Loss_Tons;
            var Material_Belongs_TO_ID = $("#Material_Belongs_TO_ID").val();
            var Material_Belongs_TO_CODE = $("#Material_Belongs_TO_CODE").val();
            var Product_Supplied_From_ID = $("#Product_Supplied_From_ID").val();
            var Product_Supplied_From_CODE = $("#Product_Supplied_From_CODE").val();
            var MSD_Name_ID = $("#MSD_Name_ID").val();
            var MSD_Name_CODE = $("#MSD_Name_CODE").val();

            var New_MSD_id = $("#Material_Supply_Detail_Table tbody tr").length;
            var TRCode = "";

            if (New_MSD_id > 0) {
                //$("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[0].innerHTML = New_MSD_id;
                $("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[1].innerHTML = "";
                $("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[2].innerHTML = "";
                $("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[3].innerHTML = "";
                $("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[4].innerHTML = "";
                $("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[5].innerHTML = MSD_Supply_Qty;
                $("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[6].innerHTML = MSD_Breakage_Qty;
                $("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[7].innerHTML = MSD_Net_Loss_Qty;

                //$("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[8].innerHTML = Material_Belongs_TO_ID;
                //$("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[9].innerHTML = Material_Belongs_TO_CODE;
                //$("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[10].innerHTML = Product_Supplied_From_ID;
                //$("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[11].innerHTML = Product_Supplied_From_CODE;
                //$("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[12].innerHTML = MSD_Name_ID;
                //$("#Material_Supply_Detail_Table tbody #MSD_" + New_MSD_id + " td")[13].innerHTML = MSD_Name_CODE;
            } else {
                TRCode = TRCode + "<td>" + Material_Belongs_To + "</td>";
                TRCode = TRCode + "<td>" + Product_Supplied_From + "</td>";
                TRCode = TRCode + "<td>" + MSD_Name + "</td>";
                TRCode = TRCode + "<td>" + MSD_UOM + "</td>";
                TRCode = TRCode + "<td>" + MSD_Supply_Qty + "</td>";
                TRCode = TRCode + "<td>" + MSD_Breakage_Qty + "</td>";
                TRCode = TRCode + "<td>" + MSD_Net_Loss_Qty + "</td>";

                TRCode = TRCode + "<td style='display:none;'>" + Material_Belongs_TO_ID + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Material_Belongs_TO_CODE + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Product_Supplied_From_ID + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Product_Supplied_From_CODE + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + MSD_Name_ID + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + MSD_Name_CODE + "</td>";

                MSD_id = $("#Material_Supply_Detail_Table tbody tr").length + 1;

                TRCode = "<tr class='MousePointer' id='MSD_" + MSD_id + "' onclick='EditMSD(this.id)'><td>" + MSD_id + "</td>" + TRCode + "</tr>";
                $("#Material_Supply_Detail_Table tbody").append(TRCode);
            }
            SaveDataToServerInvestigation('MaterialSupplyDetail');
        }
        catch (e) {
            alert("Error : sdtomsd :" + e);
        }
    }
    $scope.DeleteSDBU3 = function () {
        try {
            debugger
            var SD_IDBU3 = $("#SD_IDBU3").val();

            $("#Supply_Details_TableSBU3 tbody #SDBU3_" + SD_IDBU3 + "").remove();

            var i = 1;

            $("#Supply_Details_TableSBU3 tbody tr").each(function () {
                $(this).attr("id", "SDBU3_" + i);
                $("#Supply_Details_TableSBU3 tbody #SDBU3_" + i + " td")[0].innerHTML = i;
                i = i + 1;
            });

            $("#SupplyDetailModalSBU3").modal("hide");

            SaveDataToServerInvestigation('Supply_DetailsBU3');
            AddThingsToProductDetails();
        }
        catch (e) {
            alert("Error : DeleteSDBU3 : " + e);
        }

    }
    function AddThingsToProductDetails() {

        $("#SD_ProductDetails").val("");
        var ProdType = $("#Product_Type_CODE").val();
        var PD = "";
        var RowID = "";
        var Division = $("#Product_CategoryCode").val();
        if (ProdType == "SBU1") {

            $("#Supply_Details_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                PD = PD + "(" + $("#Supply_Details_Table tbody #" + RowId + " td")[1].innerHTML + "),";
            });
        }
        else if (ProdType == "SBU2" || (ProdType == "SBU3" && Division == "36")) {
            $("#Supply_Details_TableB tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                PD = PD + "(" + $("#Supply_Details_TableB tbody #" + RowId + " td")[2].innerHTML + "),";
            });
        }
        else if (ProdType == "SBU3") {
            $("#Supply_Details_TableSBU3 tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                PD = PD + "(" + $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[2].innerHTML + "),";
            });
        }

        PD = PD.substr(0, PD.length - 1);
        $("#SD_ProductDetails").val(PD);
    }
    //VIKAS G, 10-3-2022
    function SaveDataToServerInvestigation(TableName) {
        debugger
        try {

            var BusinessUnit = $("#Product_Type_CODE").val();
            var MaterialSupplyDetail = new Array();
            var Invoice_List = new Array();
            var Observation_Remarks = new Array();
            var Supply_Details = new Array();
            var Supply_DetailsB = new Array();
            var Breakage_Inspection_Sheet = new Array();
            var Site_Observation_Sheet = new Array();

            var MSD_BU3 = new Array();
            var MSD_BU8 = new Array();
            var SupDetSD_BU3 = new Array();
            var SupDetSD_BU8 = new Array();
            console.log("BusinessUnit  : " + BusinessUnit)
            if (BusinessUnit == "SBU3") {
                MSD_BU3 = new Array();
                $("#Material_Supply_Detail_Table_BU3 tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    MSD_BU3.push({
                        SlNo: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[0].innerHTML,
                        ProdCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[1].innerHTML,
                        UOM: "EA",
                        SupQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[7].innerHTML,
                        DefQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[8].innerHTML,
                        ActDftQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[9].innerHTML,
                        PlantCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[10].innerHTML,
                        ProdSupFromCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[11].innerHTML,
                        NameCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[12].innerHTML
                    });
                });


            }
            else if (BusinessUnit == "SBU8") {
                MSD_BU8 = new Array();
                $("#Material_Supply_Detail_Table_BU3 tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    MSD_BU8.push({
                        SlNo: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[0].innerHTML,
                        ProdCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[1].innerHTML,
                        UOM: "EA",
                        SupQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[7].innerHTML,
                        DefQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[8].innerHTML,
                        ActDftQty: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[9].innerHTML,
                        PlantCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[10].innerHTML,
                        ProdSupFromCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[11].innerHTML,
                        NameCode: $("#Material_Supply_Detail_Table_BU3 tbody #" + RowId + " td")[12].innerHTML
                    });
                });

            }
            else if (BusinessUnit == "SBU1" || BusinessUnit == "SBU2") {
                MaterialSupplyDetail = new Array();
                $("#Material_Supply_Detail_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    MaterialSupplyDetail.push({
                        SlNo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[0].innerHTML,
                        MaterialBelongsTo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[1].innerHTML,
                        ProductSuppliedFrom: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[2].innerHTML,
                        Name: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[3].innerHTML,

                        UOM: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[4].innerHTML,
                        SupplyQty: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[5].innerHTML,
                        BreakageQty: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[6].innerHTML,
                        NetLossQty: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[7].innerHTML,


                        Material_Belongs_TO_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[8].innerHTML,
                        Material_Belongs_TO_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[9].innerHTML,
                        Product_Supplied_From_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[10].innerHTML,
                        Product_Supplied_From_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[11].innerHTML,

                        MSD_Name_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[12].innerHTML,
                        MSD_Name_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[13].innerHTML

                    });
                });
            }

            Invoice_List = new Array();
            $("#Invoice_List_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));


                Invoice_List.push({
                    SlNo: $("#Invoice_List_Table tbody #" + RowId + " td")[0].innerHTML,
                    InvoiceNo: $("#Invoice_List_Table tbody #" + RowId + " td")[1].innerHTML,
                    InvoiceDate: $("#Invoice_List_Table tbody #" + RowId + " td")[2].innerHTML,
                    Remarks: $("#Invoice_List_Table tbody #" + RowId + " td")[3].innerHTML
                });

            });


            Observation_Remarks = new Array();
            $("#Observation_Remarks_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                Observation_Remarks.push({
                    SlNo: $("#Observation_Remarks_Table tbody #" + RowId + " td")[0].innerHTML,
                    ObservationName: $("#Observation_Remarks_Table tbody #" + RowId + " td")[1].innerHTML,
                    ObservationCode: $("#Observation_Remarks_Table tbody #" + RowId + " td")[2].innerHTML,
                    ObservationId: $("#Observation_Remarks_Table tbody #" + RowId + " td")[3].innerHTML
                });
            });

            Supply_Details = new Array();
            $("#Supply_Details_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                Supply_Details.push({
                    SlNo: $("#Supply_Details_Table tbody #" + RowId + " td")[0].innerHTML,
                    ItemTypeProductName: $("#Supply_Details_Table tbody #" + RowId + " td")[1].innerHTML,
                    Size_M: $("#Supply_Details_Table tbody #" + RowId + " td")[2].innerHTML,
                    GrossWtTons: $("#Supply_Details_Table tbody #" + RowId + " td")[3].innerHTML,

                    SuppliedQtyNos: $("#Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML,
                    SuppliedQtyM: $("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML,
                    SuppliedQtyTon: $("#Supply_Details_Table tbody #" + RowId + " td")[6].innerHTML,
                    BreakageQtyNos: $("#Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML,

                    BreakageQtyM: $("#Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML,
                    BreakageQtyTon: $("#Supply_Details_Table tbody #" + RowId + " td")[9].innerHTML,
                    BreakagePerc: $("#Supply_Details_Table tbody #" + RowId + " td")[10].innerHTML,
                    DefectType: $("#Supply_Details_Table tbody #" + RowId + " td")[11].innerHTML,

                    Remarks: $("#Supply_Details_Table tbody #" + RowId + " td")[12].innerHTML,


                    SD_Item_Type_Product_Name_ID: $("#Supply_Details_Table tbody #" + RowId + " td")[13].innerHTML,
                    SD_Item_Type_Product_Name_CODE: $("#Supply_Details_Table tbody #" + RowId + " td")[14].innerHTML,
                    SD_Defect_Type_ID: $("#Supply_Details_Table tbody #" + RowId + " td")[15].innerHTML,
                    SD_Defect_Type_CODE: $("#Supply_Details_Table tbody #" + RowId + " td")[16].innerHTML

                });
            });

            Supply_DetailsB = new Array();

            $("#Supply_Details_TableB tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                Supply_DetailsB.push({
                    SlNo: $("#Supply_Details_TableB tbody #" + RowId + " td")[0].innerHTML,

                    SD_Item_Type_Product_Name_CODEB: $("#Supply_Details_TableB tbody #" + RowId + " td")[1].innerHTML,
                    SD_Item_Type_Product_NameB: $("#Supply_Details_TableB tbody #" + RowId + " td")[2].innerHTML,
                    InvoiceNoB: $("#Supply_Details_TableB tbody #" + RowId + " td")[3].innerHTML,
                    InvoiceDateB: $("#Supply_Details_TableB tbody #" + RowId + " td")[4].innerHTML,
                    BatchNoB: $("#Supply_Details_TableB tbody #" + RowId + " td")[5].innerHTML,
                    SuppliedQtyNosB: $("#Supply_Details_TableB tbody #" + RowId + " td")[6].innerHTML,

                    BreakageQtyNosB: $("#Supply_Details_TableB tbody #" + RowId + " td")[7].innerHTML,
                    TransporterB: $("#Supply_Details_TableB tbody #" + RowId + " td")[8].innerHTML,
                    Defect_TypeB: $("#Supply_Details_TableB tbody #" + RowId + " td")[9].innerHTML,
                    RemarksB: $("#Supply_Details_TableB tbody #" + RowId + " td")[10].innerHTML,
                    AttachmentsB: "",

                    SD_Item_Type_Product_Name_IDB: "",
                    Defect_Type_IDB: "",
                    Defect_Type_CODEB: $("#Supply_Details_TableB tbody #" + RowId + " td")[11].innerHTML

                });
            });


            Breakage_Inspection_Sheet = new Array();
            $("#Breakage_Inspection_Sheet_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                Breakage_Inspection_Sheet.push({
                    SlNo: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[0].innerHTML,
                    Product: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[1].innerHTML,
                    Size: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[2].innerHTML,
                    BatchNo: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[3].innerHTML,
                    DefectType: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[4].innerHTML,
                    RecoveryProduct: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[5].innerHTML,
                    Recovery: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[6].innerHTML,

                    BISP_Defect_Type_ID: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[7].innerHTML,
                    BISP_Defect_Type_CODE: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[8].innerHTML,

                    BISP_Recovery_Product_ID: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[9].innerHTML,
                    BISP_Recovery_Product_CODE: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[10].innerHTML,

                    BISP_GrossWeight: $("#Breakage_Inspection_Sheet_Table tbody #" + RowId + " td")[11].innerHTML
                });
            });

            Site_Observation_Sheet = new Array();
            $("#Site_Observation_Sheet_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                Site_Observation_Sheet.push({
                    SlNo: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[0].innerHTML,
                    Observation: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[1].innerHTML,
                    VerifiedOrNot: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[2].innerHTML,
                    Comments: $("#Site_Observation_Sheet_Table tbody #" + RowId + " td")[3].innerHTML
                });
            });

            if (BusinessUnit == "SBU3") {

                SupDetSD_BU3 = new Array();
                $("#Supply_Details_TableSBU3 tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    SupDetSD_BU3.push({

                        SlNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[0].innerHTML,
                        ProdCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[1].innerHTML,
                        ProdName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[2].innerHTML,
                        //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
                        PlantName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[3].innerHTML,
                        InvNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[4].innerHTML,
                        InvDate: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[5].innerHTML,
                        BatNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[6].innerHTML,

                        Supp: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[7].innerHTML,
                        DefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[8].innerHTML,
                        ActDefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[9].innerHTML,

                        Transport: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[10].innerHTML,
                        DefName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[11].innerHTML,
                        Remarks: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[12].innerHTML,

                        DefCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[13].innerHTML
                    });
                });
            }
            else if (BusinessUnit == "SBU8") {
                SupDetSD_BU8 = new Array();
                $("#Supply_Details_TableSBU3 tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    SupDetSD_BU8.push({

                        SlNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[0].innerHTML,
                        ProdCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[1].innerHTML,
                        ProdName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[2].innerHTML,
                        PlantName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[3].innerHTML,
                        InvNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[4].innerHTML,
                        InvDate: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[5].innerHTML,
                        BatNo: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[6].innerHTML,
                        Supp: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[7].innerHTML,
                        DefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[8].innerHTML,
                        ActDefQty: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[9].innerHTML,
                        Transport: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[10].innerHTML,
                        DefName: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[11].innerHTML,
                        Defprct: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[12].innerHTML,
                        Remarks: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[13].innerHTML,
                        BasicAmt: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[14].innerHTML,
                        DefCode: $("#Supply_Details_TableSBU3 tbody #" + RowId + " td")[15].innerHTML
                    });
                });
            }

            var NoticeType = "";
            if (($("#System").is(":checked")) == true) {
                NoticeType = "System";
            }
            else if (($("#Manual").is(":checked")) == true) {
                NoticeType = "Manual";
            }

            var TYPE_OF_COMPLAINT_ID = $("#TYPE_OF_COMPLAINT_ID").val()
            if (typeof TYPE_OF_COMPLAINT_ID == "undefined" || TYPE_OF_COMPLAINT_ID == "") {
                TYPE_OF_COMPLAINT_ID = 0;
            }

            var is_rejectable = 0;
            //console.log('is_rejectable', is_rejectable)
            if (document.getElementById("is_rejectable").checked == true) {
                is_rejectable = 1;
            }

            var InvestigationData = JSON.stringify({
                FormIdentity: $("#FormIdentity").val(),
                CreatedBy: $("#CreatedByCode").val(),
                Complaint_No: $("#Complaint_No").val(),

                Complaint_Tracking_No: $("#Complaint_Tracking_No").val(),
                Complaint_Received_Date: $("#Complaint_Received_Date").val(),
                Complaint_Registered_Date: $("#Complaint_Registered_Date").val(),
                Complaint_Attended_Date: $("#Complaint_Attended_Date").val(),
                Delay: $("#Delay").is(':checked'),
                DelayDays: $("#DelayDays").val(),
                DelayReason: $("#DelayReason").val(),

                Investigator_Type: $("#Investigator_Type").val(),
                Investigator_Type_CODE: $("#Investigator_Type_CODE").val(),
                Investigation_Done_By: $("#Investigation_Done_By").val(),
                Investigation_Done_By_CODE: $("#Investigation_Done_By_CODE").val(),
                Visited_Date: $("#Visited_Date").val(),
                Previous_Visit_Date: $("#Previous_Visit_Date").val(),
                SalesRepresentativeEmployeeCode: $("#SalesRepresentativeEmployeeCode").val(),
                SalesRepresentativeEmployeeName: $("#SalesRepresentativeEmployeeName").val(),

                Investigation_Id: $("#Investigation_Id").val(),
                IGS_Series_Code: $("#IGS_Series_Code").val(),
                Investigation_Date: $("#Investigation_Date").val(),
                Investigation_Status: $("#Investigation_Status").val(),
                Approval_Date: $("#Approval_Date").val(),
                NoticeType: NoticeType,

                Customer_Code: $("#Customer_Code").val(),
                Customer_Name: $("#Customer_Name").val(),
                Customer_Type: $("#Customer_Type").val(),
                Customer_Type_CODE: $("#Customer_Type_CODE").val(),
                Customer_Location: $("#Customer_Location").val(),
                Customer_Location_Code: $("#Customer_Location_Code").val(),
                Contact_City: $("#Contact_City").val(),
                Contact_City_Code: $("#Contact_City_Code").val(),
                Contact_State: $("#Contact_State").val(),
                Contact_State_CODE: $("#Contact_State_CODE").val(),
                Contact_Area: $("#Contact_Area").val(),
                Contact_Area_CODE: $("#Contact_Area_CODE").val(),

                Contact_Person: $("#Contact_Person").val(),
                Contact_Number: $("#Contact_Number").val(),
                Customer_Fax: $("#Customer_Fax").val(),
                Customer_Email: $("#Customer_Email").val(),
                Product_Type: $("#Product_Type").val(),
                Product_Type_CODE: $("#Product_Type_CODE").val(),

                Product_Category: $("#Product_Category").val(),
                Product_CategoryCode: $("#Product_CategoryCode").val(),
                //Sub_Product_Category: $("#Sub_Product_Category").val(),
                //Sub_Product_CategoryCode: $("#Sub_Product_CategoryCode").val(),

                SubStockiest_Direct_Customer: $("#SubStockiest_Direct_Customer").val(),
                Is_Project_Party: $("#Is_Project_Party").is(":checked"),
                Site_Address: $("#Site_Address").val(),

                Period_Based: $("#Period_Based").is(':checked'),
                Invoice_Based: $("#Invoice_Based").is(':checked'),
                InvDateSupplyFrom: $("#InvDateSupplyFrom").val(),
                InvDateSupplyTo: $("#InvDateSupplyTo").val(),

                SD_InvoiceDetails: $("#SD_InvoiceDetails").val(),
                SD_ProductDetails: $("#SD_ProductDetails").val(),

                Total_Supply_Oty_Mtrs: $("#Total_Supply_Oty_Mtrs").val(),
                Total_Breakage_Qty_Mtrs: $("#Total_Breakage_Qty_Mtrs").val(),
                Total_Recovery_Mtrs: $("#Total_Recovery_Mtrs").val(),
                Net_Loss_Mtrs: $("#Net_Loss_Mtrs").val(),

                Total_Supply_Qty_Tons: $("#Total_Supply_Qty_Tons").val(),
                Total_Breakage_Qty_Tons: $("#Total_Breakage_Qty_Tons").val(),
                Total_Recovery_Tons: $("#Total_Recovery_Tons").val(),
                Net_Loss_Tons: $("#Net_Loss_Tons").val(),

                Customer_Remarks_if_any: $("#Customer_Remarks_if_any").val(),
                Observations_by_official: $("#Observations_by_official").val(),
                IR_Remarks: $("#IR_Remarks").val(),
                NatureOfComplaint: $("#NatureOfComplaint").val(),
                ComplaintDescribedBySales: $("#ComplaintDescribedBySales").val(),
                ComplaintDescription: $("#ComplaintDescription").val(),
                ObservationByQAF: $("#ObservationByQAF").val(),

                SITEDETAIL_CODE: $("#SITEDETAIL_CODE").val(),
                COMPANYDETAIL_CODE: $("#COMPANYDETAIL_CODE").val(),

                CompRegID: $("#CompRegID").val(),
                CompRegDocSeries: $("#CompRegDocSeries").val(),
                CompRegDocNumber: $("#CompRegDocNumber").val(),

                COMPLAINT_TYPE_CODE: $("#COMPLAINT_TYPE_CODE").val(),
                COMPLAINT_TYPE_NAME: $("#COMPLAINT_TYPE_NAME").val(),

                COMPLAINT_CATEGORY_CODE: $("#COMPLAINT_CATEGORY_CODE").val(),
                COMPLAINT_CATEGORY_NAME: $("#COMPLAINT_CATEGORY_NAME").val(),

                MaterialSupplyDetail: MaterialSupplyDetail,
                Invoice_List: Invoice_List,
                Observation_Remarks: Observation_Remarks,

                Supply_Details: Supply_Details,
                Supply_DetailsB: Supply_DetailsB,
                Breakage_Inspection_Sheet: Breakage_Inspection_Sheet,
                Site_Observation_Sheet: Site_Observation_Sheet,
                Site_Observation_Sheet_BU8:  $("#SiteObservationsRemarks_if_any").val(),
                MSD_BU3: MSD_BU3,
                SupDetSD_BU3: SupDetSD_BU3,
                MSD_BU8: MSD_BU8,
                SupDetSD_BU8: SupDetSD_BU8,


                //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                Compensation_Mode_Code: (typeof $("#Compensation_Mode_Code").val() == "undefined") ? "" : $("#Compensation_Mode_Code").val(),
                Any_Special_Remarks: (typeof $("#Any_Special_Remarks").val() == "undefined") ? "" : $("#Any_Special_Remarks").val(),
                Compensation_In_Running_Meters: (typeof $("#Compensation_In_Running_Meters").val() == "undefined") ? "" : $("#Compensation_In_Running_Meters").val(),
                Compensation_In_Tons: (typeof $("#Compensation_In_Tons").val() == "undefined") ? "" : $("#Compensation_In_Tons").val(),
                Compensation_In_Running_Meter_Words: (typeof $("#Compensation_In_Running_Meter_Words").val() == "undefined") ? "" : $("#Compensation_In_Running_Meter_Words").val(),
                Size_Recommendation_RMTS: (typeof $("#Size_Recommendation_RMTS").val() == "undefined") ? "" : $("#Size_Recommendation_RMTS").val(),
                Other_Size_RMTS: (typeof $("#Other_Size_RMTS").val() == "undefined") ? "" : $("#Other_Size_RMTS").val(),
                CompensationInNos: (typeof $("#CompensationInNos").val() == "undefined") ? "" : $("#CompensationInNos").val(),
                CompensationInNosWords: (typeof $("#CompensationInNosWords").val() == "undefined") ? "" : $("#CompensationInNosWords").val(),
                CompensationinMetricCubic: (typeof $("#CompensationinMetricCubic").val() == "undefined") ? "" : $("#CompensationinMetricCubic").val(),
                CompensationinMetricCubicValue: (typeof $("#CompensationinMetricCubicValue").val() == "undefined") ? "" : $("#CompensationinMetricCubicValue").val(),
                CompensationIssueCreditNote: (typeof $("#CompensationIssueCreditNote").val() == "undefined") ? "" : $("#CompensationIssueCreditNote").val(),
                CompensationAmountCredited: (typeof $("#CompensationAmountCredited").val() == "undefined") ? "" : $("#CompensationAmountCredited").val(),
                //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                party_type: $("#party_type_id").val(),
                SubStockiest_Code: $("#SubStockiest_Code").val(),
                SubStockiest_ID: $("#SubStockiest_ID").val(),
                SubStockiest_Name: $("#SubStockiest_Name").val(),
                SubStockiest_Address: $("#SubStockiest_Address").val(),
                SubStockiest_Number: $("#SubStockiest_Number").val(),
                //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                TYPE_OF_COMPLAINT: TYPE_OF_COMPLAINT_ID,
                //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                is_rejectable: is_rejectable
            });

            //console.log('InvestigationData', InvestigationData);

            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/SaveInvestigation',
                async: false,
                data: { InvestigationData: InvestigationData },
            }).then(function successCallback(response) {
                console.log('response', response);
                debugger
                if (response == "FALSE") {
                }
                if (response == "TRUE") {
                    //$("#SendInvestigationApproval").css("display", "block");
                }
                else {
                    var RD = JSON.parse(response);
                    if (RD["Result"] == "TRUE") {
                        $("#FormIdentity").val(RD["ID"]);
                        $("#Investigation_Id").val(RD["ID"]);

                        //$("#SendInvestigationApproval").css("display", "block");
                    }
                }

                if ($("#Investigation_Status").val() == "DRAFT") {
                    $("#SendInvestigationApproval").css('display', 'block');
                }
                else {
                    $("#SendInvestigationApproval").css('display', 'none');
                }
                var obj = $("#Complaint_Tracking_No").val();
                console.log(obj);
                var FormIdentity = $("#FormIdentity").val();
                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistration/GetInvestigationForEdit',
                    async: false,
                    data: { Identity: FormIdentity },
                }).then(function successCallback(response) {
                    debugger
                    if (response.data == "FALSE") {
                    }
                    else {

                        var Data = JSON.parse(response.data);
                        var HeaderData = Data["Header"];

                        $("#Investigation_Id").val(FormIdentity);
                        $scope.Complaint_No = HeaderData[0]["COMPLAINT_NUMBER"];

                        $scope.Complaint_Tracking_No = HeaderData[0]["COMPLAINT_TRACKING_NO"];

                        $scope.Complaint_Received_Date = (HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#Complaint_Received_Date").datepicker("setDate", (HeaderData[0]["COMPLAINT_RECEIVED_DATE"]));

                        $scope.Complaint_Registered_Date = (HeaderData[0]["COMPLAINED_REGISTER_DATE"]);
                        $("#Complaint_Registered_Date").datepicker("setDate", (HeaderData[0]["COMPLAINED_REGISTER_DATE"]));

                        $scope.Complaint_Attended_Date = (HeaderData[0]["COMPLAINED_ATTENDED_DATE"]);

                        $("#Complaint_Attended_Date").datepicker("setDate", (HeaderData[0]["COMPLAINED_ATTENDED_DATE"]));
                        $("#Complaint_Attended_Date").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#Visited_Date").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                        $("#Investigation_Date").datepicker('setStartDate', HeaderData[0]["Complaint_Received_Date"]);


                        $scope.DelayDays = HeaderData[0]["DELAY_DAYS"];
                        $scope.DelayReason = HeaderData[0]["DELAY_REASON"];

                        if (HeaderData[0]["DELAY_CHECK"] == "True" || HeaderData[0]["DELAY_CHECK"] == "true") {
                            $("#Delay").prop('checked', true);
                            $(".DelayGroup").show();
                            $(".DelayGroupDummy").hide();
                        }
                        else {
                            $(".DelayGroup").hide();
                            $(".DelayGroupDummy").show();
                        }

                        if (HeaderData[0]["NoticeType"] == "System") {
                            $("#System").prop('checked', true);
                        }
                        else if (HeaderData[0]["NoticeType"] == "Manual") {
                            $("#Manual").prop('checked', true);
                        }


                        $scope.SD_InvoiceDetails = HeaderData[0]["InvoiceDetails"];
                        $scope.SD_ProductDetails = HeaderData[0]["ProductDetails"];

                        $scope.Investigator_Type = HeaderData[0]["INVESTIGATOR_TYPE_NAME"];
                        $scope.Investigator_Type_CODE = HeaderData[0]["INVESTIGATOR_TYPE_CODE"];

                        $scope.Investigation_Done_By = HeaderData[0]["Investigation_Done_By_NAME"];
                        $scope.Investigation_Done_By_CODE = HeaderData[0]["Investigation_Done_By_CODE"];

                        $scope.Visited_Date = HeaderData[0]["VISITED_DATE"];
                        $("#Visited_Date").datepicker("setDate", HeaderData[0]["VISITED_DATE"]);


                        $scope.Previous_Visit_Date = (HeaderData[0]["PREVIOUS_VISITED_DATE"]);
                        $("#Previous_Visit_Date").datepicker("setDate", HeaderData[0]["PREVIOUS_VISITED_DATE"]);

                        $scope.SalesRepresentativeEmployeeCode = HeaderData[0]["SALES_REPRESENTATIVE_CODE"];
                        $scope.SalesRepresentativeEmployeeName = HeaderData[0]["SALES_REPRESENTATIVE_NAME"];

                        $scope.Investigation_Id = HeaderData[0]["ID"];
                        $scope.IGS_Series_Code = HeaderData[0]["DOC_SERIES_CODE"];

                        if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                            $scope.IGS_Series_Code = "INVSZ12";
                        }

                        $scope.Investigation_Date = (HeaderData[0]["DOC_DATE"]);
                        $("#Investigation_Date").datepicker("setDate", HeaderData[0]["DOC_DATE"]);

                        $scope.Investigation_Status = HeaderData[0]["DOC_STATUS"];
                        $scope.ShowStatus = HeaderData[0]["ShowStatus"];

                        $scope.Approval_Date = (HeaderData[0]["APPROVED_DATE"]);
                        $scope.CREATED_IN = HeaderData[0]["CREATED_IN"];
                        $("#CREATED_IN").val(HeaderData[0]["CREATED_IN"]);


                        //$("#SelectedComplaintFiles").append(HeaderData[0]["Complaint_Attachments"]).trigger('change');
                        //$("#SelectedFiles").append(HeaderData[0]["Investigation_Attachments"]).trigger('change');
                        $("#Investigation_Status").val($scope.Investigation_Status).trigger('change');
                        $scope.Customer_Code = HeaderData[0]["Customer_Code"];
                        $scope.Customer_Name = HeaderData[0]["CUSTOMER_NAME"];

                        $scope.Customer_Type = HeaderData[0]["Customer_type_Name"];
                        $scope.Customer_Type_CODE = HeaderData[0]["Customer_type_Code"];
                        $scope.Contact_Area_ID = HeaderData[0]["AREA_ID"];
                        $scope.Contact_Area_CODE = HeaderData[0]["AREA_CODE"];
                        $scope.Contact_State_CODE = HeaderData[0]["STATE_CODE"];
                        $scope.SITEDETAIL_CODE = HeaderData[0]["SITEDETAIL_CODE"];
                        $scope.COMPANYDETAIL_CODE = HeaderData[0]["COMPANYDETAIL_CODE"];

                        $scope.Customer_Location = HeaderData[0]["cusomer_location"];
                        $scope.Contact_City = HeaderData[0]["CITY_NAME"];
                        $scope.Contact_State = HeaderData[0]["STATE_NAME"];
                        $scope.Contact_Area = HeaderData[0]["AREA_NAME"];

                        $scope.Contact_Person = HeaderData[0]["CONTACT_PERSON"];
                        $scope.Contact_Number = HeaderData[0]["Phone_Number"];
                        $scope.Customer_Fax = HeaderData[0]["Fax"];
                        $scope.Customer_Email = HeaderData[0]["Email"];

                        $scope.Product_CategoryCode = HeaderData[0]["Product_Category_Code"];
                        $scope.Product_Category = HeaderData[0]["PRODUCT_CATEGORY_NAME"];
                        //$scope.Sub_Product_CategoryCode = HeaderData[0]["SUB_PRODUCT_CATEGORY_CODE"];
                        //$scope.Sub_Product_Category = HeaderData[0]["SUB_PRODUCT_CATEGORY"];

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                        if (HeaderData[0]["PRODUCT_CATEGORY_NAME"] == "Blocks") {
                            $("#CompensationinMetricCubic").val("Cubic Meters");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                            $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(3)").html("Volume");
                            $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(4)").html("Cubic Meters");
                        }
                        else {
                            $("#CompensationinMetricCubic").val("Metric Tons");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                        }
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        //if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                        //    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                        //}
                        //else {
                        //    $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                        //}

                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                            $("#ObservationByHil").text("Observations by official");
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                            if (HeaderData[0]["Product_Category_Code"] == "88") {
                                $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            }
                            else {
                                $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                            }
                            $("#ObservationByHil").text("Observations by official");
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["Product_Category_Code"] == "36") {
                            $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                            $("#ObservationByHil").text("Observations by official");
                            $("#THDefectprct").css("display", "none");
                            $("#THBasicAmount").css("display", "none");
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                            $("#CustomerRemarksIfAnyFieldDiv").hide();
                            $("#THDefectprct").css("display", "none");
                            $("#THBasicAmount").css("display", "none");
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            $(".NoticeTypeClass").css("display", "none");

                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 START.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                            $("#CustomerRemarksIfAnyFieldDiv").hide();
                            //$("#THDefectprct").css("display", "block");
                            //$("#THBasicAmount").css("display", "block");
                            $("#Invoice_Based").prop('checked', true);
                            $("#PeriodBasedDiv").hide();
                            $("#PeriodBasedDates").hide();

                            $("#Invoice_List_Division").css('display', 'block');
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            $(".NoticeTypeClass").css("display", "none");

                        }
                        console.log("sbu :" + HeaderData[0]["PRODUCT_TYPE_CODE"]);
                        //VIKAS G, 2023 MAR 20 SBU-8 END.

                        $scope.Product_Type_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"];
                        $scope.Product_Type = HeaderData[0]["PRODUCT_TYPE_NAME"];

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                        if ($scope.Product_Type != "" && $scope.Product_Type != undefined) {
                            if ($scope.Product_Type == "Sheeting" || $scope.Product_Type == "SBU1") {
                                $("#CompensationDiv_Sheeting").show();
                                $("#CompensationDiv_Aerocon").hide();
                                $("#CompensationSize_Details_Div").hide();
                            } else {
                                $("#CompensationDiv_Aerocon").show();
                                $("#CompensationDiv_Sheeting").hide();
                                $("#CompensationSize_Details_Div").show();
                            }
                        }
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        $scope.SubStockiest_Direct_Customer = HeaderData[0]["END_CUSTOMER_DETAILS"];

                        if (HeaderData[0]["Project_Party"] == "True" || HeaderData[0]["Project_Party"] == "true") {
                            $("#Is_Project_Party").prop('checked', true);
                        }

                        $scope.Site_Address = HeaderData[0]["Customer_Address"];

                        if (HeaderData[0]["FREQUENCY_BASED"] == "True" || HeaderData[0]["FREQUENCY_BASED"] == "true") {
                            $("#Period_Based").prop('checked', true);
                            $("#InvoiceBasedDiv").hide();

                            $("#Invoice_List_Division").css('display', 'none');

                        }
                        else if (HeaderData[0]["Invoice_Based"] == "True" || HeaderData[0]["Invoice_Based"] == "true") {
                            $("#Invoice_Based").prop('checked', true);
                            $("#PeriodBasedDiv").hide();
                            $("#PeriodBasedDates").hide();

                            $("#Invoice_List_Division").css('display', 'block');

                        }

                        if (HeaderData[0]["TOTAL_SUPPLY"] == "") {
                            $scope.Total_Supply_Oty_Mtrs = "0";
                        }
                        else {
                            $scope.Total_Supply_Oty_Mtrs = HeaderData[0]["TOTAL_SUPPLY"];
                        }

                        if (HeaderData[0]["Total_Breakage"] == "") {
                            $scope.Total_Breakage_Qty_Mtrs = "0";
                        }
                        else {
                            $scope.Total_Breakage_Qty_Mtrs = HeaderData[0]["Total_Breakage"];
                        }

                        if (HeaderData[0]["Total_Recovery"] == "") {
                            $scope.Total_Recovery_Mtrs = "0";
                        }
                        else {
                            $scope.Total_Recovery_Mtrs = HeaderData[0]["Total_Recovery"];
                        }

                        if (HeaderData[0]["Net_Loss"] == "") {
                            $scope.Net_Loss_Mtrs = "0";
                        }
                        else {
                            $scope.Net_Loss_Mtrs = HeaderData[0]["Net_Loss"];
                        }



                        if (HeaderData[0]["TOTAL_SUPPLY_TON"] == "") {
                            $scope.Total_Supply_Qty_Tons = "0";
                        }
                        else {
                            $scope.Total_Supply_Qty_Tons = HeaderData[0]["TOTAL_SUPPLY_TON"];
                        }



                        if (HeaderData[0]["TOTAL_BREAKAGE_TONS"] == "") {
                            $scope.Total_Breakage_Qty_Tons = "0";
                        }
                        else {
                            $scope.Total_Breakage_Qty_Tons = HeaderData[0]["TOTAL_BREAKAGE_TONS"];
                        }



                        if (HeaderData[0]["TOTAL_RECOVERY_TONS"] == "") {
                            $scope.Total_Recovery_Tons = "0";
                        }
                        else {
                            $scope.Total_Recovery_Tons = HeaderData[0]["TOTAL_RECOVERY_TONS"];
                        }


                        if (HeaderData[0]["NET_LOSS_TONS"] == "") {
                            $scope.Net_Loss_Tons = "0";
                        }
                        else {
                            $scope.Net_Loss_Tons = HeaderData[0]["NET_LOSS_TONS"];
                        }

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                        $scope.Compensation_Mode = HeaderData[0]["COMPENSATION_MODE_NAME"];
                        $scope.Compensation_Mode_Code = HeaderData[0]["COMPENSATION_MODE_CODE"];
                        $scope.Compensation_Mode_ID = HeaderData[0]["COMPENSATION_MODE_ID"];
                        $scope.Any_Special_Remarks = HeaderData[0]["COMMENTS_APPROVALS_SALES_OTHERS"];
                        $("#Compensation_Mode_Code").val(HeaderData[0]["COMPENSATION_MODE_CODE"]);
                        if (HeaderData[0]["COMPENSATION_IN_METERS_SHEET"] != "" && HeaderData[0]["COMPENSATION_IN_METERS_SHEET"] != null)
                            $scope.Compensation_In_Running_Meters = HeaderData[0]["COMPENSATION_IN_METERS_SHEET"];

                        $("#Compensation_In_Running_Meter_Words").val(HeaderData[0]["COMPENSATION_IN__METER_WORDS_SHEET"]);

                        if (HeaderData[0]["RECOMMENDED_SIZE"] != "" && HeaderData[0]["RECOMMENDED_SIZE"] != null) {
                            $scope.Size_Recommendation_RMTS = HeaderData[0]["RECOMMENDED_SIZE"];
                            var No_Of_36 = parseInt(($scope.Size_Recommendation_RMTS) / (3.6));
                            $("#No_of_36").val(No_Of_36);
                        }
                        else {
                            $("#No_of_36").val("0");
                            $("#Size_Recommendation_RMTS").val("0");
                        }

                        if (HeaderData[0]["OTHER_SIZE"] != "" && HeaderData[0]["OTHER_SIZE"] != null)
                            $scope.Other_Size_RMTS = (HeaderData[0]["OTHER_SIZE"]).toFixed(3);

                        if (HeaderData[0]["COMPENSATION_IN_TONS"] != "" && HeaderData[0]["COMPENSATION_IN_TONS"] != null)
                            $scope.Compensation_In_Tons = HeaderData[0]["COMPENSATION_IN_TONS"];

                        if (HeaderData[0]["COMPENSATION_IN_NO"] != "" && HeaderData[0]["COMPENSATION_IN_NO"] != null)
                            $scope.CompensationInNos = HeaderData[0]["COMPENSATION_IN_NO"];

                        $scope.CompensationInNosWords = HeaderData[0]["COMPENSATION_IN_WORD"];

                        if (HeaderData[0]["COMPENSATION_IN_CUBIC_METER"] != "" && HeaderData[0]["COMPENSATION_IN_CUBIC_METER"] != null)
                            $scope.CompensationinMetricCubicValue = HeaderData[0]["COMPENSATION_IN_CUBIC_METER"];

                        if (HeaderData[0]["ISSUE_CREDIT_NOTE"] == "True" || HeaderData[0]["ISSUE_CREDIT_NOTE"] == "true") {
                            $scope.CompensationIssueCreditNote = true;
                            $scope.IssueCredited();
                        }
                        else {
                            $scope.CompensationIssueCreditNote = false;
                        }
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        $scope.Customer_Remarks_if_any = HeaderData[0]["CUSTOMER_REMARKS"];
                        $scope.Observations_by_official = HeaderData[0]["Observations_by_official"];
                        $scope.IR_Remarks = HeaderData[0]["REMARKS"];


                        $scope.CompRegID = HeaderData[0]["complaint_register_id"];
                        $scope.CompRegDocSeries = HeaderData[0]["complaint_register_doc_Series"];
                        $scope.CompRegDocNumber = HeaderData[0]["complaint_register_doc_num"];


                        $scope.ComplaintDescription = HeaderData[0]["COMPLAIN_DESC"];
                        $scope.COMPLAINT_TYPE_CODE = HeaderData[0]["COMPLAINT_TYPE_CODE"];
                        $scope.COMPLAINT_TYPE_NAME = HeaderData[0]["COMPLAINT_TYPE_NAME"];
                        $scope.COMPLAINT_TYPE_ID = HeaderData[0]["COMPLAINT_TYPE_ID"];

                        $scope.COMPLAINT_CATEGORY_CODE = HeaderData[0]["COMPLAINT_CATEGORY_CODE"];
                        $scope.COMPLAINT_CATEGORY_NAME = HeaderData[0]["COMPLAINT_CATEGORY_NAME"];
                        $scope.COMPLAINT_CATEGORY_ID = HeaderData[0]["COMPLAINT_CATEGORY_ID"];


                        $scope.NatureOfComplaint = HeaderData[0]["NatureOfComplaint"];

                        $scope.ComplaintDescribedBySales = HeaderData[0]["COMPLAINT_DESC_SALES"];

                        $scope.ObservationByQAF = HeaderData[0]["ObservationByQAF"];


                        $scope.InvDateSupplyFrom = (HeaderData[0]["Date_Supply_From"]);
                        $("#InvDateSupplyFrom").datepicker("setDate", (HeaderData[0]["Date_Supply_From"]));


                        $scope.InvDateSupplyTo = (HeaderData[0]["Date_Supply_To"]);
                        $("#InvDateSupplyTo").datepicker("setDate", HeaderData[0]["Date_Supply_To"]);

                        $("#CompCatCode").val(HeaderData[0]["COM_CAT_"]);
                        $("#CREATED_DATE").val(HeaderData[0]["CREATED_DATE"]);
                        //svprasadk 24-04-2020 SBU 1 requirement to add sub stockiest master start
                        if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19')) || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19'))) {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#SubStockiest_Direct_CustomerDiv").show();
                            $("#PartyTypeDiv").hide();
                            $("#Is_Project_PartyDiv").show();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").show();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            //$("#party_type").val("Dealer");
                            $("#party_type_id").val(1);
                            $("#party_type").val("Stockiest");
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            //$("#TYPE_OF_COMPLAINT").val(0);
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$("#party_type > [value=0]").attr("selected", "true");
                            $scope.party_type_id = 1;
                            $scope.party_type = "Stockiest";
                        } else if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19')) || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19'))) {
                            if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1")) {
                                $("#Investigation_Compensation_Recommendation").show();
                            }
                            else if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                                $("#Investigation_Compensation_Recommendation").hide();
                            }
                            $("#SubStockiest_Direct_CustomerDiv").hide();
                            $("#PartyTypeDiv").show();
                            $("#Is_Project_PartyDiv").hide();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").hide();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            $scope.party_type = HeaderData[0]["party_type"];
                            $scope.party_type_id = HeaderData[0]["party_type_id"];
                            $scope.SubStockiest_Code = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_ID = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_Name = HeaderData[0]["SubStockiest_Name"];
                            $scope.SubStockiest_Address = HeaderData[0]["SubStockiest_Address"];
                            $scope.SubStockiest_Number = HeaderData[0]["SubStockiest_Number"];
                            $("#party_type").val(HeaderData[0]["party_type"]);
                            $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                            $("#SubStockiest_ID").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Code").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                            $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                            $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
                            if (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest") {
                                $("#SubStockiest_CodeDiv").show();
                                $("#SubStockiest_NameDiv").show();
                                $("#SubStockiest_AddressDiv").show();
                                $("#SubStockiest_NumberDiv").show();
                            }
                            //svprasadk 19-11-2020 SBU 1 requirement to party type other start 
                            else if (HeaderData[0]["party_type_id"] == 7) {
                                $("#SubStockiest_CodeDiv").hide();
                                $("#SubStockiest_NameDiv").show();
                                $("#SubStockiest_AddressDiv").show();
                                $("#SubStockiest_NumberDiv").show();
                                $scope.party_type_id = HeaderData[0]["party_type_id"];
                                $scope.party_type = HeaderData[0]["party_type"];
                                $scope.SubStockiest_Code = "";
                                $scope.SubStockiest_ID = "";
                                $scope.SubStockiest_Name = HeaderData[0]["SubStockiest_Name"];
                                $scope.SubStockiest_Address = HeaderData[0]["SubStockiest_Address"];
                                $scope.SubStockiest_Number = HeaderData[0]["SubStockiest_Number"];
                                $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                $("#party_type").val(HeaderData[0]["party_type"]);
                                $("#SubStockiest_ID").val("");
                                $("#SubStockiest_Code").val("");
                                $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                                $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                                $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
                            }

                            //svprasadk 19-11-2020 SBU 1 requirement to party type other end
                            else {
                                if (HeaderData[0]["END_CUSTOMER_DETAILS"] != "" && (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest")) {
                                    //console.log('if');
                                    //$("#party_type").val("SubDealer");
                                    $("#party_type").val(HeaderData[0]["party_type"]);
                                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                    $("#SubStockiest_CodeDiv").show();
                                    $("#SubStockiest_NameDiv").show();
                                    $("#SubStockiest_AddressDiv").show();
                                    $("#SubStockiest_NumberDiv").show();
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                    //$scope.party_type = "SubDealer";
                                    $scope.party_type = HeaderData[0]["party_type"];
                                    $scope.party_type_id = HeaderData[0]["party_type_id"];
                                    $scope.SubStockiest_Code = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_ID = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_Name = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_Address = HeaderData[0]["Customer_Address"];
                                    $scope.SubStockiest_Number = HeaderData[0]["Phone_Number"];
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                                    $("#SubStockiest_ID").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Code").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Name").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Address").val(HeaderData[0]["Customer_Address"]);
                                    $("#SubStockiest_Number").val(HeaderData[0]["Phone_Number"]);
                                } else {
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                    $("#party_type").val(HeaderData[0]["party_type"]);
                                    $scope.party_type_id = HeaderData[0]["party_type_id"];
                                    $scope.party_type = HeaderData[0]["party_type"];
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                                    //$("#party_type").val("Dealer");
                                    //$("#party_type").val("Stockiest");
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                    //$scope.party_type = "Dealer";
                                    //$scope.party_type = "Stockiest";
                                    //$("#party_type_id").val(1);
                                    $("#SubStockiest_CodeDiv").hide();
                                    $("#SubStockiest_NameDiv").hide();
                                    $("#SubStockiest_AddressDiv").hide();
                                    $("#SubStockiest_NumberDiv").hide();
                                    $("#SubStockiest_ID").val("");
                                    $("#SubStockiest_Code").val("");
                                    $("#SubStockiest_Name").val("");
                                    $("#SubStockiest_Address").val("");
                                    $("#SubStockiest_Number").val("");
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                                }
                            }
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                            // 04-05-2020 code has been hidden
                            //if (HeaderData[0]["Product_Category_Code"] == 11) {
                            //    $("#GetSupplyDetailsListButton").show();
                            //} else {
                            //    $("#GetSupplyDetailsListButton").hide();
                            //}
                            $("#GetSupplyDetailsListButton").hide();
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                            $("#SubStockiest_Direct_Customer").val("");
                            $("#Is_Project_Party").prop("checked", false);
                            $("#Site_Address").val("");
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                            if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                                $("#TYPE_OF_COMPLAINT_DIV").show();
                            }
                            //$("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            //if (HeaderData[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                            //    $("#TYPE_OF_COMPLAINT > [value=" + HeaderData[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                            //} else {
                            //    $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            //}
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            console.log(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                        } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#SubStockiest_Direct_CustomerDiv").show();
                            $("#PartyTypeDiv").hide();
                            $("#Is_Project_PartyDiv").show();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").show();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            //$("#party_type").val("Dealer");
                            $("#party_type").val("Stockiest");
                            $("#party_type_id").val(1);
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                            $("#GetSupplyDetailsListButton").hide();
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            //$("#TYPE_OF_COMPLAINT").val(0);
                            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                        } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#SubStockiest_Direct_CustomerDiv").show();
                            $("#PartyTypeDiv").hide();
                            $("#Is_Project_PartyDiv").show();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").show();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            //$("#party_type").val("Dealer");
                            $("#party_type").val("Stockiest");
                            $("#party_type_id").val(1);
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start                            
                            $("#GetSupplyDetailsListButton").hide();
                            //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            //$("#TYPE_OF_COMPLAINT").val(0);
                            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            $("#THDefectprct").css("display", "none");
                            $("#THBasicAmount").css("display", "none");
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 START.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                            $("#GetSupplyDetailsListButton").hide();
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$("#THDefectprct").css("display", "block");
                            //$("#THBasicAmount").css("display", "block");
                            $("#PeriodBasedDiv").hide();
                            $("#BasicAmount").hide();
                            $("#BasicAmountdiv").hide();
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 END.
                        //svprasadk 24-04-2020 SBU 1 requirement to add sub stockiest master end

                        //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start
                        //console.log('is_rejectable', HeaderData[0]["is_rejectable"])
                        if (HeaderData[0]["is_rejectable"] == 1) {
                            //console.log('if')
                            $("#is_rejectable").attr('checked', 'true');
                            $("#is_rejectable").removeAttr('disabled');
                        } else {
                            //console.log('else')
                            $("#is_rejectable").removeAttr('checked');
                            $("#is_rejectable").removeAttr('disabled');
                        }
                        //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end

                        var TRCode = "";
                        var MSFLines = [];
                        if (Data.hasOwnProperty("MSFLines")) {
                            MSFLines = Data["MSFLines"];
                        }

                        $("#Material_Supply_Detail_Table tbody").empty();

                        for (var i = 0; i < MSFLines.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' onclick='EditMSD(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + MSFLines[i]["PLANT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["SUPPLY_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["SUPPLY_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["UOM"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["supply_qty"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["breakage_qty"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFLines[i]["NET_LOSS"] + "</td>";

                            TRCode = TRCode + "<td style='display:none;'></td>";                                                //PLANT_ID
                            TRCode = TRCode + "<td style='display:none;'>" + MSFLines[i]["PLANT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                //SUPPLY_TYPE_ID
                            TRCode = TRCode + "<td style='display:none;'>" + MSFLines[i]["SUPPLY_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                //SUPPLY_ID
                            TRCode = TRCode + "<td style='display:none;'>" + MSFLines[i]["SUPPLY_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";

                        }

                        $("#Material_Supply_Detail_Table tbody").append(TRCode);

                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start                       
                        if (InvestigationScope.Product_Type == "Sheeting" || InvestigationScope.Product_Type == "SBU1") {
                            $("#CompensationDiv_Sheeting").show();
                            $("#CompensationDiv_Aerocon").hide();

                            var CCSheets = Data["CCSheets"];
                            TRCode = "";
                            var Product_Category = HeaderData[0]["PRODUCT_CATEGORY_NAME"];

                            if (Product_Category == "CC Iron Sheets") {
                                $(".HideMeForCCSheets").css('display', 'none');
                                $("#RecommendedForCCSheetsDivision").css('display', 'block');
                                for (var i = 0; i < CCSheets.length; i++) {
                                    TRCode = TRCode + "<tr onclick='EditCCRLines(this.id)' id='CCL_" + (i + 1) + "' class='MousePointer'>";
                                    TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["ProductName"] + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["Nos"] + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["GrossWeight"] + "</td>";
                                    TRCode = TRCode + "<td>" + CCSheets[i]["Tons"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;' >" + CCSheets[i]["ProductCode"] + "</td>";
                                    TRCode = TRCode + "</tr>";
                                }
                                $("#RecommendedForCCSheets tbody").append(TRCode);
                            }
                            else {
                                $("#RecommendedForCCSheetsDivision").css('display', 'none');
                            }
                        } else if (InvestigationScope.Product_Type == "SBU2" || (InvestigationScope.Product_Type == "SBU3" && InvestigationScope.ProductCategory_Code == "36")) {
                            $("#RecommendedForCCSheetsDivision").css('display', 'none');
                            $("#CompensationDiv_Sheeting").hide();
                            $("#CompensationDiv_Aerocon").show();

                            //var CompensationRecommendationDetails = Data["CompensationRecommendationData"];
                            //TRCode = "";
                            //for (var i = 0; i < CompensationRecommendationDetails.length; i++) {
                            //    TRCode = TRCode + "<tr class='MousePointer' id='COMPSIZE_" + (i + 1) + "' ng-click='EditCompensationSizeLines(obj,$event)'><td>" + (i + 1) + "</td>"
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["RECOMMENDED_SIZE"] + "</td>";
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["NOS"] + "</td>";
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["GROSS_WEIGHT"] + "</td>";
                            //    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["TONS"] + "</td>";
                            //    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_CODE"] + "</td>";
                            //    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_ID"] + "</td>";
                            //    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["LINE_ID"] + "</td>";
                            //    TRCode = TRCode + "</tr>";

                            //}
                            //var html = $compile(TRCode)($scope);
                            //var el = angular.element($("#CompensationSizeLines_Details_Table tbody"));
                            //el.append(html);
                            //$compile(html)($scope);
                        }
                        else if (InvestigationScope.Product_Type == "SBU3") {
                            $("#CompensationSizeLines_Details_Table").css("display", "none");
                            $("#CompensationSize_Add").css("display", "none");
                            $("#CompensationinMetricCubicValueDivision").css("display", "none");
                            $("#CompensationSize_Details_Div").show();
                            $("#CompensationDiv_Sheeting").hide();
                            $("#CompensationDiv_Aerocon").show();
                        }
                        // VIKAS G , 2023 MAR 20 SBU-8 START.
                        else if (InvestigationScope.Product_Type == "SBU8") {
                            $("#CompensationSizeLines_Details_Table").css("display", "none");
                            $("#CompensationSize_Add").css("display", "none");
                            $("#CompensationinMetricCubicValueDivision").css("display", "none");
                            $("#CompensationSize_Details_Div").show();
                            $("#CompensationDiv_Sheeting").hide();
                            $("#CompensationDiv_Aerocon").show();
                            //$("#THDefectprct").css("display", "block");
                            //$("#THBasicAmount").css("display", "block");
                        }
                        // VIKAS G , 2023 MAR 20 SBU-8 END.
                        //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

                        TRCode = "";
                        var InvoiceLines = Data["InvoiceLines"];

                        $("#Invoice_List_Table tbody").empty();

                        for (var i = 0; i < InvoiceLines.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='IL_" + (i + 1) + "' onclick='EditInvList(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + InvoiceLines[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + InvoiceLines[i]["INVOICE_DATE"] + "</td>";
                            TRCode = TRCode + "<td>" + InvoiceLines[i]["REMARKS"] + "</td>";

                            TRCode = TRCode + "</tr>";

                        }

                        $("#Invoice_List_Table tbody").append(TRCode);


                        TRCode = "";

                        var SupplyDetailsA = Data["Brk_Sht_Lines"];
                        $("#Supply_Details_Table tbody").empty();
                        for (var i = 0; i < SupplyDetailsA.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["SIZE_M"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["GROSS_WEIGHT"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["SUPPLIED_QTY_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["SUPPLIED_QTY_M"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["SUPPLIED_QTY_TON"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["REJECTED_QTY_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["REJECTED_QTY_M"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["BREAKAGE_QTY_TON"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["BREAKAGE_PERSENT"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsA[i]["REMARKS"] + "</td>";

                            TRCode = TRCode + "<td style='display:none;'></td>";                                                        //PRODUCT_ID
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                        //DEFECT_TYPE_ID
                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsA[i]["DEFECT_TYPE_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";

                        }
                        $("#Supply_Details_Table tbody").append(TRCode);

                        TRCode = "";
                        var SupplyDetailsB = Data["Brk_Otr_Lines"];
                        $("#Supply_Details_TableB tbody").empty();
                        for (var i = 0; i < SupplyDetailsB.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + (SupplyDetailsB[i]["INVOICE_DATE"]) + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["batch_no"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["SUPPLIED_QTY"] + "</td>";

                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["BREAKAGE_QTY"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["TRANSPORTER"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + SupplyDetailsB[i]["REMARKS"] + "</td>";

                            TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsB[i]["DEFECT_TYPE_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Supply_Details_TableB tbody").append(TRCode);





                        /*******************************************************************************************/
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            TRCode = "";
                            var SupDetSD_BU3 = Data["SupDetSD_BU3"];
                            $("#Supply_Details_TableSBU3 tbody").empty();
                            for (var i = 0; i < SupDetSD_BU3.length; i++) {

                                TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["PROD_CODE"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["PROD_NAME"] + "</td>";

                                //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["PLANT_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["INVOICE_NO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["INVOICE_DATE"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["BATCHNO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["SUPPLIED_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["DEFECT_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["ACT_DEFECT_QTY"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["TRANSPORTER"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["DEFECT_TYPE_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU3[i]["REMARKS"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;' >" + SupDetSD_BU3[i]["DEFECT_TYPE_CODE"] + "</td>";

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Supply_Details_TableSBU3 tbody").append(TRCode);
                        }


                        /************************************************************************************************/
                        //VIKAS G, 2023 MAR 20 SBU-8 SATRT.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = "";
                            var totalvalue = 0;
                            var SupDetSD_BU8 = Data["SupDetSD_BU8"];
                            $("#Supply_Details_TableSBU3 tbody").empty();
                            for (var i = 0; i < SupDetSD_BU8.length; i++) {

                                TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["PROD_CODE"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["PROD_NAME"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["PLANT_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["INVOICE_NO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["INVOICE_DATE"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["BATCHNO"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["SUPPLIED_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["DEFECT_QTY"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["ACT_DEFECT_QTY"] + "</td>";

                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["TRANSPORTER"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["DEFECT_TYPE_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["DEFECT_PRCT"] + "</td>";
                                TRCode = TRCode + "<td>" + SupDetSD_BU8[i]["REMARKS"] + "</td>";

                                TRCode = TRCode + "<td>" + (SupDetSD_BU8[i]["RATE_PER_UNIT"] * SupDetSD_BU8[i]["ACT_DEFECT_QTY"]).toFixed(3) + "</td>";

                                TRCode = TRCode + "<td style='display:none;' >" + SupDetSD_BU8[i]["DEFECT_TYPE_CODE"] + "</td>";

                                TRCode = TRCode + "</tr>";
                                totalvalue += SupDetSD_BU8[i]["RATE_PER_UNIT"] * SupDetSD_BU8[i]["ACT_DEFECT_QTY"];
                                console.log("Total value : " + totalvalue);
                            }
                            $("#total_prod_value").val(totalvalue.toFixed(3));
                            console.log(totalvalue);
                            $("#Supply_Details_TableSBU3 tbody").append(TRCode);

                        }
                        //VIKAS G, 2023 MAR 20 SBU-8 END.

                        TRCode = "";
                        var Brk_Ins_Sht_Lines = Data["Brk_Ins_Sht_Lines"];
                        $("#Breakage_Inspection_Sheet_Table tbody").empty();
                        for (var i = 0; i < Brk_Ins_Sht_Lines.length; i++) {
                            TRCode = TRCode + "<tr class='MousePointer' id='BISP_" + (i + 1) + "' onclick='EditBISP(this.id)'><td>" + (i + 1) + "</td>";


                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["PRODUCT"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["SIZE"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["BATCH_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["RECOVERYPRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + Brk_Ins_Sht_Lines[i]["RECOVERY"] + "</td>";

                            TRCode = TRCode + "<td style='display:none'></td>";                                                         //DEFECT_TYPE_ID
                            TRCode = TRCode + "<td style='display:none'>" + Brk_Ins_Sht_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";

                            TRCode = TRCode + "<td style='display:none'></td>";                                                         //RECOVERYPRODUCT_ID
                            TRCode = TRCode + "<td style='display:none'>" + Brk_Ins_Sht_Lines[i]["RECOVERYPRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'>" + Brk_Ins_Sht_Lines[i]["GrossWeight"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Breakage_Inspection_Sheet_Table tbody").append(TRCode);

                        TRCode = "";
                        var ObservationLines = Data["ObservationLines"];
                        $("#Observation_Remarks_Table tbody").empty();
                        for (var i = 0; i < ObservationLines.length; i++) {
                            TRCode = TRCode + "<tr id='OLT_" + (i + 1) + "' onclick='ObservationEditPopUp(this.id)' >";

                            TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                            TRCode = TRCode + "<td>" + ObservationLines[i]["OBSERVATION_NAME"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + ObservationLines[i]["OBSERVATION_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'></td>";                                                        //OBSERVATION_ID

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Observation_Remarks_Table tbody").append(TRCode);

                        TRCode = "";
                        var Site_Obr_Sht_Lines = Data["Site_Obr_Sht_Lines"];
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            if (Site_Obr_Sht_Lines == "" || Site_Obr_Sht_Lines == undefined || Site_Obr_Sht_Lines.length == 0) {

                                $("#SiteObservationsRemarks_if_any").val(" ");
                            }
                            else {
                                $("#SiteObservationsRemarks_if_any").val(Site_Obr_Sht_Lines[0]["OBSERVATION"]);
                            }
                        }
                        else {
                            $("#Site_Observation_Sheet_Table tbody").empty();
                            for (var i = 0; i < Site_Obr_Sht_Lines.length; i++) {
                                TRCode = TRCode + "<tr id='SOST_" + (i + 1) + "' onclick='SiteObservationEdit(this.id)' >";

                                TRCode = TRCode + "<td>" + (i + 1) + "</td>";
                                TRCode = TRCode + "<td>" + Site_Obr_Sht_Lines[i]["OBSERVATION"] + "</td>";
                                TRCode = TRCode + "<td>" + Site_Obr_Sht_Lines[i]["VARIFIED_OR_NOT"] + "</td>";

                                if (Site_Obr_Sht_Lines[i]["COMMENTS"] == "undefined") {
                                    TRCode = TRCode + "<td></td>"
                                }
                                else {
                                    TRCode = TRCode + "<td>" + Site_Obr_Sht_Lines[i]["COMMENTS"] + "</td>"
                                }

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Site_Observation_Sheet_Table tbody").append(TRCode);
                        }
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            TRCode = "";
                            var MSFBU3Lines = Data["MSFBU3Lines"];
                            $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                            for (var i = 0; i < MSFBU3Lines.length; i++) {
                                //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .

                                //TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";
                                TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "'  >";

                                TRCode = TRCode + "<td>" + (i + 1) + "</td>";





                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["ProdCode"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["ProdName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["PlantName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["SuppTypeName"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["SuppNameName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["UOM"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["SupplyQty"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["DefQty"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU3Lines[i]["ActDftQty"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU3Lines[i]["PlantCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU3Lines[i]["SuppTypeCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU3Lines[i]["SuppNameCode"] + "</td>";

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);
                        }
                        //VIKAS G , 2023 MAR 20 SBU-8 START.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = "";
                            var MSFBU8Lines = Data["MSFBU8Lines"];
                            $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                            for (var i = 0; i < MSFBU8Lines.length; i++) {

                                TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";

                                //TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "'  >";


                                TRCode = TRCode + "<td>" + (i + 1) + "</td>";



                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["ProdCode"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["ProdName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["PlantName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["SuppTypeName"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["SuppNameName"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["UOM"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["SupplyQty"] + "</td>";
                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["DefQty"] + "</td>";

                                TRCode = TRCode + "<td>" + MSFBU8Lines[i]["ActDftQty"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU8Lines[i]["PlantCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU8Lines[i]["SuppTypeCode"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MSFBU8Lines[i]["SuppNameCode"] + "</td>";

                                TRCode = TRCode + "</tr>";
                            }
                            $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);
                        }
                        //VIKAS G , 2023 MAR 20 SBU-8 END.

                        var Product_Type = HeaderData[0]["PRODUCT_TYPE_NAME"]


                        if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU1") {
                            //$("#Investigation_Compensation_Recommendation").hide();
                            $("#SupplyDetailsTableA").show();
                            $("#SupplyDetailsTableB").hide();
                            $("#SupplyDetailsTableSBU3").hide();

                            $("#BreakageInspectionSheetDiv").show();
                            $("#ObservationRemarksDiv").show();
                            $("#SiteObservationSheetDiv").show();
                            $("#SiteObservationSheetDivBU8").hide();
                            $("#CustomerRemarksIfAnyFieldDiv").show();
                            $("#ObservationsByOfficialFieldDiv").show();
                            $("#RemarksFieldDiv").show();
                            $("#NatureOfComplaintFieldDiv").hide();
                            $("#ComplaintDescribedBySalesFieldDiv").hide();
                            $("#ComplaintDescriptionFieldDiv").hide();
                            $("#ObservationByQAFFieldDiv").hide();
                            $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                            $("#VisitedDateSpanId").show();

                            $("#MatSupDet_BU12").css("display", "block");
                            $("#MatSupDet_BU3").css("display", "none");

                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU2" || HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3" || HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $("#Investigation_Compensation_Recommendation").hide();
                            $("#BreakageInspectionSheetDiv").hide();
                            $("#ObservationRemarksDiv").hide();
                            $("#SiteObservationSheetDiv").hide();
                            $("#SiteObservationSheetDivBU8").hide();
                            $("#SupplyDetailsCalculationsDiv").hide();


                            if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU2") {
                                $("#Investigation_Compensation_Recommendation").hide();
                                $("#CustomerRemarksIfAnyFieldDiv").hide();
                                $("#ObservationsByOfficialFieldDiv").hide();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").show();
                                $("#ComplaintDescriptionFieldDiv").show();
                                $("#ObservationByQAFFieldDiv").show();
                                $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU12").css("display", "block");
                                $("#MatSupDet_BU3").css("display", "none");

                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").show();
                                $("#SupplyDetailsTableSBU3").hide();


                            } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["Product_Category_Code"] == "36") {
                                $("#Investigation_Compensation_Recommendation").hide();
                                $("#CustomerRemarksIfAnyFieldDiv").hide();
                                $("#ObservationsByOfficialFieldDiv").hide();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").show();
                                $("#ComplaintDescriptionFieldDiv").show();
                                $("#ObservationByQAFFieldDiv").show();
                                $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU12").css("display", "block");
                                $("#MatSupDet_BU3").css("display", "none");

                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").show();
                                $("#SupplyDetailsTableSBU3").hide();
                                $("#THDefectprct").css("display", "none");
                                $("#THBasicAmount").css("display", "none");
                                $("#BasicAmount").hide();
                                $("#BasicAmountdiv").hide();


                            }
                            else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3") {
                                $("#Investigation_Compensation_Recommendation").hide();
                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").hide();
                                $("#SupplyDetailsTableSBU3").show();

                                $("#CustomerRemarksIfAnyFieldDiv").hide();
                                $("#ObservationsByOfficialFieldDiv").show();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").show();
                                $("#ComplaintDescribedBySalesFieldDiv").hide();
                                $("#ComplaintDescriptionFieldDiv").hide();
                                $("#ObservationByQAFFieldDiv").hide();
                                $("#SubStockistLabel").text("Distributor/ Wholesaler/ Dealer/ Project");
                                $("#VisitedDateSpanId").hide();
                                $("#MatSupDet_BU12").css("display", "none");
                                $("#MatSupDet_BU3").css("display", "block");
                                $("#THDefectprct").css("display", "none");
                                $("#THBasicAmount").css("display", "none");
                                $("#BasicAmount").hide();
                                $("#BasicAmountdiv").hide();
                                $("#totalprodvalue").hide();
                                var button = document.getElementById("Mat_Sup_Det_BU3_Add");
                                button.disabled = true;
                                var table = document.getElementById("Material_Supply_Detail_Table_BU3");
                                table.style.backgroundColor = "gainsboro";

                            }
                            else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                                //$("#Investigation_Compensation_Recommendation").hide();
                                $("#SupplyDetailsTableA").hide();
                                $("#SupplyDetailsTableB").hide();
                                $("#SupplyDetailsTableSBU3").show();

                                $("#BreakageInspectionSheetDiv").hide();
                                $("#ObservationRemarksDiv").hide();
                                $("#SiteObservationSheetDiv").hide();
                                $("#SiteObservationSheetDivBU8").show();
                                $("#CustomerRemarksIfAnyFieldDiv").show();
                                $("#ObservationsByOfficialFieldDiv").show();
                                $("#RemarksFieldDiv").show();
                                $("#NatureOfComplaintFieldDiv").hide();
                                $("#ComplaintDescribedBySalesFieldDiv").hide();
                                $("#ComplaintDescriptionFieldDiv").hide();
                                $("#ObservationByQAFFieldDiv").hide();
                                //$("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                                $("#VisitedDateSpanId").show();
                                $("#MatSupDet_BU12").css("display", "none");
                                //$("#MatSupDet_BU12").css("display", "block");
                                $("#MatSupDet_BU3").css("display", "block");
                                $("#THDefectprct").prop("disabled", false);
                                $("#THBasicAmount").prop("disabled", false);
                                $("#BasicAmount").hide();
                                $("#BasicAmountdiv").hide();

                            }
                        }


                        var IS = HeaderData[0]["DOC_STATUS"];
                        var MyField = $("#HiddenForCMS").val();

                        if (IS == "DRAFT") {
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INV' }) },
                                data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INVST' }) },
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

                            var UserTypeCode = $("#SessionUserTypeID").val();

                            if ((IS == "Approved") && (UserTypeCode == "CSM" || UserTypeCode == "QH") || UserTypeCode == "CSM_BU2" || UserTypeCode == "CSM_BU3" || UserTypeCode == "CSM_BU8") {

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
                                    //data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INV' }) },
                                    data: { AccessData: JSON.stringify({ UserRole: $("#SessionUserTypeID").val(), FormCode: 'INVST' }) },
                                    success: function (AccessData) {
                                        if (AccessData == "") {
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#InvList").css('display', 'none');
                                            $("#CompInvSave").css('display', 'none');
                                            $("#InvNew").css('display', 'none');
                                            $("#SendInvestigationApproval").css('display', 'none');
                                            $("#MakeApproved").css('display', 'none');
                                        }
                                        else {
                                            AccessData = JSON.parse(AccessData);
                                            if (AccessData[0]["IS_APPROVE"] == true) {
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#InvList").css('display', 'none');
                                                $("#CompInvSave").css('display', 'block');
                                                $("#InvNew").css('display', 'none');
                                                $("#SendInvestigationApproval").css('display', 'none');
                                                $("#MakeApproved").css('display', 'block');
                                                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints start
                                                //$("#is_rejectable").removeAttr('disabled');
                                                $("#is_rejectable").attr('disabled', 'disabled');
                                                //svprasadk 15-07-2020 SBU 1 requirement to Rejection of complaints at investigation stage for over phone rejection complaints end
                                            }
                                            else {
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#InvList").css('display', 'none');
                                                $("#CompInvSave").css('display', 'none');
                                                $("#InvNew").css('display', 'none');
                                                $("#SendInvestigationApproval").css('display', 'none');
                                                $("#MakeApproved").css('display', 'none');
                                            }
                                        }
                                    }
                                });

                            }
                        }

                        $("#StateFilter").val(HeaderData[0]["STATE_CODE"]);
                        $("#CMSState").val(HeaderData[0]["STATE_CODE"]);

                        $("#HiddenForCMS").val("");

                        SheetingLabels(HeaderData[0]["Product_Category_Code"]);
                    }

                    HideLoader();
                },
                    function errorCallback(response) {
                        alert("Error : " + response);
                        HideLoader();
                    });


            }, function errorCallback(response) {
                alert("Error : " + response);
            });


        }
        catch (e) {
            alert("Error : SaveDataToServer : " + e);
        }


    }

    //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
    // Compensation Recommendation Lines details Popup operations
    $scope.CompensationSizeLinesOpenModel = function () {
        try {
            var Flag = 0;
            var Investigation_Num = $scope.Investigation_Num;
            if (Investigation_Num == "" || Investigation_Num == undefined) {
                Flag = Flag + 1;
                $("#Investigation_Num").css("border-color", "red");
                alert("Select Investigation Number");
                return;
            }
            else {
                $("#Investigation_Num").css("border-color", "#d2d6de");
            }
            $("#CompensationRecommendedSize").css("border-color", "#d2d6de");
            $scope.CompensationSize_id = "";
            $scope.CompensationRecommendedSize = "";
            $scope.CompensationSizeLineNos = "";
            $scope.CompensationSizeLineGrossWeight = "";
            $scope.CompensationSizeLineTons = "";
            $("#CompSizeLines_Delete").hide();
            $("#CompSizeLines_Save").text("Save");
            $("#CompensationSizeLines_Details_Modal").modal('show');
        }
        catch (e) {
            alert("Error : CompensationSizeLinesOpenModel :" + e);
        }
    }
    //svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start
    $scope.GetSupplyDetailsList = function () {
        var Product_Type = $("#Product_Type_CODE").val();
        var Product_CategoryCode = $("#Product_CategoryCode").val();
        var Customer_Code = $("#Customer_Code").val();
        var InvDateSupplyFrom = $("#InvDateSupplyFrom").val();
        var InvDateSupplyTo = $("#InvDateSupplyTo").val();
        var SubStockiest_Code = $("#SubStockiest_Code").val();

        if (Product_Type == "") {
            alert("Please Provide Product Type");
            return;
        } else if (Product_CategoryCode == "") {
            alert("Please Provide Product Type");
            return;
        } else if (Customer_Code == "") {
            alert("Please Provide Customer");
            return;
        } else if (InvDateSupplyFrom == "") {
            alert("Please Provide From Date");
            return;
        } else if (InvDateSupplyTo == "") {
            alert("Please Provide To Date");
            return;
        } else if (!$("#Period_Based").is(':checked')) {
            alert("Please Select Period Based");
            return;
        } else {
            if (Product_Type == "SBU1") {
                Product_Type = "1000";
            }
            else if (Product_Type == "SBU2") {
                Product_Type = "2000";
            }
            else if (Product_Type == "SBU3") {
                Product_Type = "3000";
            }
            else if (Product_Type == "SBU8") {
                Product_Type = "8000";
            }
            Data = JSON.stringify({
                Product_Type: Product_Type,
                Customer_Code: Customer_Code,
                Product_CategoryCode: Product_CategoryCode,
                InvDateSupplyFrom: $scope.ConvertDateFormat(InvDateSupplyFrom),
                InvDateSupplyTo: $scope.ConvertDateFormat(InvDateSupplyTo),
                SubStockiest_Code: SubStockiest_Code
            });
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/GetSupplyDetailsList',
                async: false,
                data: { Data: Data },
            }).then(function successCallback(response) {
                if (response != "FALSE") {
                    console.log(response)
                    var Data = JSON.parse(response);
                    var HeaderData = Data["Header"];

                    var TRCode = "";
                    //svprasadk 30-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                    var SD_ProductDetails = "";
                    var size = "";
                    var Supplied_Qty_M = 0;

                    $("#Supply_Details_Table tbody").empty();
                    $("#SD_ProductDetails").val('');
                    //svprasadk 30-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                    for (var i = 0; i < Data.length; i++) {
                        //svprasadk 30-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                        if (SD_ProductDetails == "") {
                            SD_ProductDetails += "(" + Data[i]["PRODUCT_NAME"] + ")";
                        } else {
                            SD_ProductDetails += ",(" + Data[i]["PRODUCT_NAME"] + ")";
                        }

                        if (Data[i]["PRODUCT_NAME"].includes("Newkor") || Data[i]["PRODUCT_NAME"].includes("newkor")) {
                            size = Data[i]["PRODUCT_NAME"].split(" ")[2];
                            Supplied_Qty_M = size * Data[i]["BILL_QTY"];
                        } else if (Data[i]["PRODUCT_NAME"].includes("Malabar") || Data[i]["PRODUCT_NAME"].includes("malabar")) {
                            size = Data[i]["PRODUCT_NAME"].split(" ")[5];
                            Supplied_Qty_M = size * Data[i]["BILL_QTY"];
                        }
                        //svprasadk 30-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                        TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + Data[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + size + "</td>";
                        TRCode = TRCode + "<td>&nbsp;</td>";
                        TRCode = TRCode + "<td>" + Data[i]["BILL_QTY"] + "</td>";
                        //TRCode = TRCode + "<td>" + RecQtyTons + "</td>";                                                        //SD_Supplied_Qty_M
                        TRCode = TRCode + "<td>" + Supplied_Qty_M + "</td>";                                                                            //SD_Supplied_Qty_M
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        TRCode = TRCode + "<td>&nbsp;</td>";
                        //TRCode = TRCode + "<td>" + BreakQtyTons + "</td>";                                                      //SD_Breakage_Qty_M
                        TRCode = TRCode + "<td></td>";                                                      //SD_Breakage_Qty_M
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        //TRCode = TRCode + "<td>" + BreakPercent + "</td>";                                                      //SD_Breakage_Per
                        TRCode = TRCode + "<td></td>";                                                                          //SD_Breakage_Per
                        TRCode = TRCode + "<td>&nbsp;</td>";
                        TRCode = TRCode + "<td>&nbsp;</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";                                                    //PRODUCT_ID
                        TRCode = TRCode + "<td style='display:none;'>" + Data[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";                                                    //DEFECT_TYPE_ID
                        TRCode = TRCode + "<td style='display:none;'>" + Data[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_Table tbody").append(TRCode);
                    $("#SD_ProductDetails").val(SD_ProductDetails);
                } else {
                    alert("No Data Available");
                }
            },
                function errorCallback(response) {
                    alert("Error : " + response);
                });
        }
    }
    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
    //svprasadk 29-04-2020 SBU 1 requirement to get supply details based on customer and product type start
    $scope.ConvertDateFormat = function (date) {
        var changeDate = date.split('/');
        var DATETIME = changeDate[2] + "-" + changeDate[1] + "-" + changeDate[0];
        return DATETIME;
    }
    //svprasadk 29-04-2020 SBU 1 requirement to get supply details based on customer and product type end
});
//Complaint pop up
function GetComplaint_No(obj) {
    //debugger
    InvestigationScope.$apply(function () {
        InvestigationScope.Complaint_No = $(obj).children().eq(1).html();

        if ($(obj).children().eq(1).html() == undefined || $(obj).children().eq(1).html() == null || $(obj).children().eq(1).html() == "") {
        }
        else {
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/PopulateComplaintInToInvestigation',
                async: false,
                data: { ComplaintNumber: $(obj).children().eq(1).html() },
            }).then(function successCallback(response) {
                console.log(response);
                debugger
                var Data = JSON.parse(response);
                var HeaderData = Data["Header"];

                $("#Complaint_Tracking_No").val(HeaderData[0]["COMPLAINT_TRACKING_NO"]);
                $("#SelectedComplaintFiles").append(HeaderData[0]["Complaint_Attachments"]).trigger('change');
                $("#Complaint_Received_Date").val(HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                $("#Complaint_Registered_Date").val(HeaderData[0]["COMPLAINT_REGISTRATION_DATE"]);

                if (HeaderData[0]["PreviousVisitDate"] == "" || HeaderData[0]["PreviousVisitDate"] == null || HeaderData[0]["PreviousVisitDate"] == undefined) {
                }
                else {
                    $("#Previous_Visit_Date").datepicker("setDate", HeaderData[0]["PreviousVisitDate"]);
                    $("#Previous_Visit_Date").val(HeaderData[0]["PreviousVisitDate"]);
                }

                $("#Complaint_Attended_Date").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                $("#Visited_Date").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);
                $("#Investigation_Date").datepicker('setStartDate', HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);

                $("#Complaint_Attended_Date").datepicker('setEndDate', TodayDateTime);
                $("#Visited_Date").datepicker('setEndDate', TodayDateTime);
                $("#Investigation_Date").datepicker('setEndDate', TodayDateTime);

                $("#Complaint_Attended_Date").val("");
                $("#Visited_Date").val("");
                $("#Investigation_Date").datepicker("setDate", TodayDateTime);

                $("#SalesRepresentativeEmployeeCode").val(HeaderData[0]["SALES_REPRESENTATIVE_CODE"]);
                $("#SalesRepresentativeEmployeeName").val(HeaderData[0]["SALES_REPRESENTATIVE_NAME"]);

                $("#Investigation_Status").val("DRAFT");
                $("#ShowStatus").val("Under Investigation");

                $("#Customer_Code").val(HeaderData[0]["CUSTOMER_CODE"]);
                $("#Customer_Name").val(HeaderData[0]["CUSTOMER_NAME"]);
                $("#Customer_Type").val(HeaderData[0]["CUSTOMER_TYPE_NAME"]);
                $("#Customer_Type_CODE").val(HeaderData[0]["CUSTOMER_TYPE_CODE"]);

                $("#Customer_Location").val(HeaderData[0]["LOCATION_NAME"]);
                $("#Customer_Location_Code").val(HeaderData[0]["LOCATION_CODE"]);

                $("#Contact_City").val(HeaderData[0]["CITY_NAME"]);
                $("#Contact_City_Code").val(HeaderData[0]["CITY_CODE"]);

                $("#Contact_State").val(HeaderData[0]["STATE_NAME"]);
                $("#Contact_State_CODE").val(HeaderData[0]["STATE_CODE"]);
                $("#StateFilter").val(HeaderData[0]["STATE_CODE"]);
                $("#CMSState").val(HeaderData[0]["STATE_CODE"]);

                $("#Contact_Area").val(HeaderData[0]["AREA_NAME"]);
                $("#Contact_Area_CODE").val(HeaderData[0]["AREA_CODE"]);

                $("#Contact_Person").val(HeaderData[0]["CONTACT_PERSON"]);
                $("#Contact_Number").val(HeaderData[0]["PHONE"]);
                $("#Customer_Fax").val(HeaderData[0]["FAX"]);
                $("#Customer_Email").val(HeaderData[0]["EMAIL"]);

                $("#Product_Type").val(HeaderData[0]["PRODUCT_TYPE_NAME"]);
                $("#Product_Type_CODE").val(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                $("#Product_Category").val(HeaderData[0]["PRODUCT_CATEGORY_NAME"]);
                $("#Product_CategoryCode").val(HeaderData[0]["PRODUCT_CATEGORY_CODE"]);

                //if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                //    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                //}
                //else {
                //    $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                //}
                InvestigationScope.CREATED_DATE = HeaderData[0]["CREATED_DATE"];
                if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                    $("#ObservationByHil").text("Observations by official");
                    $("#MatSupDet_BU12").css("display", "block");
                    $("#MatSupDet_BU3").css("display", "none");
                    //svprasadk 23-11-2020 SBU 1 requirement to hide Compensation Recommendation in investigation stage before 2020-11-19 start
                    if (new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19')) {
                        $("#Investigation_Compensation_Recommendation").hide();
                    } else {
                        //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                        $("#Investigation_Compensation_Recommendation").show();
                        //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                    }
                    //svprasadk 23-11-2020 SBU 1 requirement to hide Compensation Recommendation in investigation stage before 2020-11-19 end
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").show();
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                    if (HeaderData[0]["Product_Category_Code"] == "88") {
                        $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    }
                    else {
                        $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                    }
                    $("#ObservationByHil").text("Observations by official");
                    $("#MatSupDet_BU12").css("display", "block");
                    $("#MatSupDet_BU3").css("display", "none");
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                    $("#Investigation_Compensation_Recommendation").hide();
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36") {
                    $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                    $("#ObservationByHil").text("Observations by official");
                    $("#MatSupDet_BU12").css("display", "block");
                    $("#MatSupDet_BU3").css("display", "none");
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                    $("#Investigation_Compensation_Recommendation").hide();
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    $("#THDefectprct").css("display", "none");
                    $("#THBasicAmount").css("display", "none");
                    $("#BasicAmount").hide();
                    $("#BasicAmountdiv").hide();
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                    $("#MatSupDet_BU12").css("display", "none");
                    $("#MatSupDet_BU3").css("display", "block");
                    $("#CustomerRemarksIfAnyFieldDiv").hide();
                    $(".NoticeTypeClass").css("display", "none");
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                    $("#Investigation_Compensation_Recommendation").hide();
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    $("#THDefectprct").css("display", "none");
                    $("#THBasicAmount").css("display", "none");
                    $("#BasicAmount").hide();
                    $("#BasicAmountdiv").hide();
                    $("#totalprodvalue").hide();
                    var button = document.getElementById("Mat_Sup_Det_BU3_Add");
                    button.disabled = true;
                    var table = document.getElementById("Material_Supply_Detail_Table_BU3");
                    table.style.backgroundColor = "gainsboro";
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                    //svprasadk 23-11-2020 SBU 1 requirement to hide Compensation Recommendation in investigation stage before 2020-11-19 start
                    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    $("#ObservationByHil").text("Investigation Findings By Plant Quality");
                    $("#MatSupDet_BU12").css("display", "none");
                    $("#MatSupDet_BU3").css("display", "block");
                    $("#CustomerRemarksIfAnyFieldDiv").hide();
                    $(".NoticeTypeClass").css("display", "none");
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                    $("#Investigation_Compensation_Recommendation").hide();
                    //svprasadk 14-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    $("#Invoice_Based").prop('checked', true);
                    $("#PeriodBasedDiv").hide();
                    $("#PeriodBasedDates").hide();

                    $("#Invoice_List_Division").css('display', 'block');
                    $("#BasicAmount").hide();
                    $("#BasicAmountdiv").hide();
                    $("#PeriodBasedDiv").hide();
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                }

                $("#NatureOfComplaint").val(HeaderData[0]["NATURE_OF_COMPLAINT"]);

                $("#SubStockiest_Direct_Customer").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);

                if (HeaderData[0]["PROJECT_PARTY"] == "True" || HeaderData[0]["PROJECT_PARTY"] == "true") {
                    $("#Is_Project_Party").prop('checked', true);
                }
                else {
                    $("#Is_Project_Party").prop('checked', false);
                }

                $("#Site_Address").val(HeaderData[0]["SITE_ADDRESS"]);


                $("#Total_Supply_Oty_Mtrs").val("");
                $("#Total_Breakage_Qty_Mtrs").val("");
                $("#Total_Recovery_Mtrs").val("");
                $("#Net_Loss_Mtrs").val("");

                $("#Total_Supply_Qty_Tons").val("");
                $("#Total_Breakage_Qty_Tons").val("");
                $("#Total_Recovery_Tons").val("");
                $("#Net_Loss_Tons").val("");


                $("#IR_Remarks").val(HeaderData[0]["REMARKS"]);

                $("#CompRegID").val(HeaderData[0]["ID"]);
                $("#CompRegDocSeries").val(HeaderData[0]["DOC_SERIES_CODE"]);

                $("#COMPLAINT_TYPE_CODE").val(HeaderData[0]["COMPLAINT_TYPE_CODE"]);
                $("#COMPLAINT_TYPE_NAME").val(HeaderData[0]["COMPLAINT_TYPE_NAME"]);

                $("#COMPLAINT_CATEGORY_CODE").val(HeaderData[0]["COMPLAINT_MODE_CODE"]);
                $("#COMPLAINT_CATEGORY_NAME").val(HeaderData[0]["COMPLAINT_MODE_NAME"]);

                $("#CompCatCode").val(HeaderData[0]["COMPLAINT_CATEGORY_CODE"]);

                $("#ComplaintDescription").val(HeaderData[0]["COMPLAINT_DESC"]);

                $("#CREATED_DATE").val(HeaderData[0]["CREATED_DATE"]);

                //svprasadk 24-04-2020 SBU 1 requirement to add sub stockiest master start
                if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19')) || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19'))) {
                    $("#SubStockiest_Direct_CustomerDiv").show();
                    $("#PartyTypeDiv").hide();
                    $("#Is_Project_PartyDiv").show();
                    $("#SubStockiest_CodeDiv").hide();
                    $("#Site_AddressDiv").show();
                    $("#SubStockiest_NameDiv").hide();
                    $("#SubStockiest_AddressDiv").hide();
                    $("#SubStockiest_NumberDiv").hide();
                    //$("#party_type").val("Dealer");
                    $("#party_type_id").val(1);
                    $("#party_type").val("Stockiest");
                    $("#SubStockiest_ID").val("");
                    $("#SubStockiest_Code").val("");
                    $("#SubStockiest_Name").val("");
                    $("#SubStockiest_Address").val("");
                    $("#SubStockiest_Number").val("");
                    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //$("#TYPE_OF_COMPLAINT").val(0);
                    $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                    //$scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                    //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                    //$("#party_type > [value=0]").attr("selected", "true");
                    //$scope.party_type_id = 1;
                    //$scope.party_type = "Stockiest";
                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                    $("#party_type").val(HeaderData[0]["party_type"]);
                } else if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19')) || ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19')))) {
                    $("#SubStockiest_Direct_CustomerDiv").hide();
                    $("#PartyTypeDiv").show();
                    $("#Is_Project_PartyDiv").hide();
                    $("#SubStockiest_CodeDiv").hide();
                    $("#Site_AddressDiv").hide();
                    $("#SubStockiest_NameDiv").hide();
                    $("#SubStockiest_AddressDiv").hide();
                    $("#SubStockiest_NumberDiv").hide();
                    $("#party_type").val(HeaderData[0]["party_type"]);
                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                    $("#SubStockiest_ID").val(HeaderData[0]["SubStockiest_Code"]);
                    $("#SubStockiest_Code").val(HeaderData[0]["SubStockiest_Code"]);
                    $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                    $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                    $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
                    if (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest") {
                        $("#SubStockiest_CodeDiv").show();
                        $("#SubStockiest_NameDiv").show();
                        $("#SubStockiest_AddressDiv").show();
                        $("#SubStockiest_NumberDiv").show();
                    }
                    //svprasadk 19-11-2020 SBU 1 requirement to party type other start 
                    else if (HeaderData[0]["party_type_id"] == 7) {
                        $("#SubStockiest_CodeDiv").hide();
                        $("#SubStockiest_NameDiv").show();
                        $("#SubStockiest_AddressDiv").show();
                        $("#SubStockiest_NumberDiv").show();
                        $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                        $("#party_type").val(HeaderData[0]["party_type"]);
                        $("#SubStockiest_ID").val("");
                        $("#SubStockiest_Code").val("");
                        $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                        $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                        $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
                    }
                    //svprasadk 19-11-2020 SBU 1 requirement to party type other end
                    else {
                        if (HeaderData[0]["END_CUSTOMER_DETAILS"] != "" && (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest")) {
                            //$("#party_type").val("SubDealer");
                            $("#party_type").val(HeaderData[0]["party_type"]);
                            $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                            $("#SubStockiest_CodeDiv").show();
                            $("#SubStockiest_NameDiv").show();
                            $("#SubStockiest_AddressDiv").show();
                            $("#SubStockiest_NumberDiv").show();
                            $("#SubStockiest_ID").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                            $("#SubStockiest_Code").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                            $("#SubStockiest_Name").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                            $("#SubStockiest_Address").val(HeaderData[0]["Customer_Address"]);
                            $("#SubStockiest_Number").val(HeaderData[0]["Phone_Number"]);
                        } else {
                            //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                            $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                            $("#party_type").val(HeaderData[0]["party_type"]);
                            //$scope.party_type_id = HeaderData[0]["party_type_id"];
                            //$scope.party_type = HeaderData[0]["party_type"];
                            //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                            //$("#party_type").val("Dealer");
                            //$("#party_type").val("Stockiest");
                            //$("#party_type_id").val(1);
                            //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start                            
                            $("#SubStockiest_CodeDiv").hide();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                        }
                    }
                    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start
                    // 04-05-2020 code has been hidden
                    //if (HeaderData[0]["Product_Category_Code"] == 11) {
                    //    $("#GetSupplyDetailsListButton").show();
                    //} else {
                    //    $("#GetSupplyDetailsListButton").hide();
                    //}
                    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                    $("#SubStockiest_Direct_Customer").val("");
                    $("#Is_Project_Party").prop("checked", false);
                    $("#Site_Address").val("");
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1") {
                        $("#TYPE_OF_COMPLAINT_DIV").show();
                    }
                    else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                        $("#TYPE_OF_COMPLAINT_DIV").hide();
                    }
                    //$("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                    //if (HeaderData[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                    //    $("#TYPE_OF_COMPLAINT > [value=" + HeaderData[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                    //} else {
                    //    $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    //}
                    $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                    //$scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                    //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                    //$("#TYPE_OF_COMPLAINT > [value=" + HeaderData[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                    //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                    console.log(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                    $("#SubStockiest_Direct_CustomerDiv").show();
                    $("#PartyTypeDiv").hide();
                    $("#Is_Project_PartyDiv").show();
                    $("#SubStockiest_CodeDiv").hide();
                    $("#Site_AddressDiv").show();
                    $("#SubStockiest_NameDiv").hide();
                    $("#SubStockiest_AddressDiv").hide();
                    $("#SubStockiest_NumberDiv").hide();
                    //$("#party_type").val("Dealer");
                    $("#party_type").val("Stockiest");
                    $("#party_type_id").val(1);
                    $("#SubStockiest_ID").val("");
                    $("#SubStockiest_Code").val("");
                    $("#SubStockiest_Name").val("");
                    $("#SubStockiest_Address").val("");
                    $("#SubStockiest_Number").val("");
                    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start                    
                    $("#GetSupplyDetailsListButton").hide();
                    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //$("#TYPE_OF_COMPLAINT").val(0);
                    //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                    //$scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                    //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                    //$("#party_type > [value=0]").attr("selected", "true");
                    //$scope.party_type_id = 1;
                    //$scope.party_type = "Stockiest";
                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                    $("#party_type").val(HeaderData[0]["party_type"]);
                    //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                    $("#SubStockiest_Direct_CustomerDiv").show();
                    $("#PartyTypeDiv").hide();
                    $("#Is_Project_PartyDiv").show();
                    $("#SubStockiest_CodeDiv").hide();
                    $("#Site_AddressDiv").show();
                    $("#SubStockiest_NameDiv").hide();
                    $("#SubStockiest_AddressDiv").hide();
                    $("#SubStockiest_NumberDiv").hide();
                    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    //$("#party_type").val("Dealer");
                    $("#party_type").val("Stockiest");
                    $("#party_type_id").val(1);
                    $("#SubStockiest_ID").val("");
                    $("#SubStockiest_Code").val("");
                    $("#SubStockiest_Name").val("");
                    $("#SubStockiest_Address").val("");
                    $("#SubStockiest_Number").val("");
                    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start                    
                    $("#GetSupplyDetailsListButton").hide();
                    //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //$("#TYPE_OF_COMPLAINT").val(0);
                    //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                    //$scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                    //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                    //$("#party_type > [value=0]").attr("selected", "true");
                    //$scope.party_type_id = 1;
                    //$scope.party_type = "Stockiest";
                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                    $("#party_type").val(HeaderData[0]["party_type"]);
                    $("#THDefectprct").css("display", "none");
                    $("#THBasicAmount").css("display", "none");
                    $("#BasicAmount").hide();
                    $("#BasicAmountdiv").hide();
                    //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                    //svprasadk 20-05-2020 SBU 1 requirement to add type of complaint end
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    $("#GetSupplyDetailsListButton").hide();
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                    $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                    //$("#THDefectprct").css("display", "block");
                    //$("#THBasicAmount").css("display", "block");
                    $("#BasicAmount").hide();
                    $("#BasicAmountdiv").hide();
                }
                //svprasadk 24-04-2020 SBU 1 requirement to add sub stockiest master end

                var TRCode = "";
                var MatSupLines = [];
                if (Data.hasOwnProperty("MatSupLines")) {
                    MatSupLines = Data["MatSupLines"];
                }

                $("#Material_Supply_Detail_Table tbody").empty();

                for (var i = 0; i < MatSupLines.length; i++) {

                    TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' onclick='EditMSD(this.id)'><td>" + (i + 1) + "</td>";

                    TRCode = TRCode + "<td>" + MatSupLines[i]["PLANT_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + MatSupLines[i]["SUPPLY_TYPE_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + MatSupLines[i]["SUPPLY_NAME"] + "</td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td></td>";
                    TRCode = TRCode + "<td></td>";

                    TRCode = TRCode + "<td style='display:none;'></td>";                                                        //PLANT_ID
                    TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[i]["PLANT_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'></td>";                                                        //SUPPLY_TYPE_ID
                    TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[i]["SUPPLY_TYPE_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'></td>";                                                        //SUPPLY_ID
                    TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[i]["SUPPLY_CODE"] + "</td>";

                    TRCode = TRCode + "</tr>";

                }
                $("#Material_Supply_Detail_Table tbody").append(TRCode);


                TRCode = "";
                $("#Supply_Details_Table tbody").empty();
                $("#Supply_Details_TableB tbody").empty();
                $("#Supply_Details_TableSBU3 tbody").empty();

                var RCPTLines = Data["RCPTLines"];
                TRCode = "";


                for (var i = 0; i < RCPTLines.length; i++) {
                    TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";

                    /*
                    var RecQtyTons = "";

                    if (RCPTLines[i]["Received_Qty"] == "" || parseFloat(RCPTLines[i]["SIZE"]) == "") {
                    }
                    else {
                        RecQtyTons = parseFloat(RCPTLines[i]["Received_Qty"]) * parseFloat(RCPTLines[i]["SIZE"]);
                    }

                    var BreakQtyTons = "";

                    if (RCPTLines[i]["Defective_Qty"] == "" || parseFloat(RCPTLines[i]["SIZE"]) == "") {
                    }
                    else {
                        BreakQtyTons = parseFloat(RCPTLines[i]["Defective_Qty"]) * parseFloat(RCPTLines[i]["SIZE"]);
                    }

                    RecQtyTons = Math.round(RecQtyTons * 10000) / 10000;
                    BreakQtyTons = Math.round(BreakQtyTons * 10000) / 10000;
                    var BreakPercent = "";

                    if (RCPTLines[i]["Defective_Qty"] == "" || RCPTLines[i]["Received_Qty"] == "") {
                    }
                    else {
                        BreakPercent = ((parseFloat(RCPTLines[i]["Defective_Qty"])) / (parseFloat(RCPTLines[i]["Received_Qty"]))) * 100;
                        BreakPercent = Math.round(BreakPercent * 10000) / 10000;
                    }
                    */

                    TRCode = TRCode + "<td>" + RCPTLines[i]["PRODUCT_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + RCPTLines[i]["SIZE"] + "</td>";
                    TRCode = TRCode + "<td>" + RCPTLines[i]["GROSS_WEIGHT"] + "</td>";
                    TRCode = TRCode + "<td>" + RCPTLines[i]["Received_Qty"] + "</td>";
                    //TRCode = TRCode + "<td>" + RecQtyTons + "</td>";                                                        //SD_Supplied_Qty_M
                    TRCode = TRCode + "<td></td>";                                                                            //SD_Supplied_Qty_M
                    TRCode = TRCode + "<td style='display:none;'></td>";
                    TRCode = TRCode + "<td>" + RCPTLines[i]["Defective_Qty"] + "</td>";
                    //TRCode = TRCode + "<td>" + BreakQtyTons + "</td>";                                                      //SD_Breakage_Qty_M
                    TRCode = TRCode + "<td></td>";                                                      //SD_Breakage_Qty_M
                    TRCode = TRCode + "<td style='display:none;'></td>";
                    //TRCode = TRCode + "<td>" + BreakPercent + "</td>";                                                      //SD_Breakage_Per
                    TRCode = TRCode + "<td></td>";                                                                          //SD_Breakage_Per
                    TRCode = TRCode + "<td>" + RCPTLines[i]["DEFECT_TYPE_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + RCPTLines[i]["REMARKS"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'></td>";                                                    //PRODUCT_ID
                    TRCode = TRCode + "<td style='display:none;'>" + RCPTLines[i]["PRODUCT_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'></td>";                                                    //DEFECT_TYPE_ID
                    TRCode = TRCode + "<td style='display:none;'>" + RCPTLines[i]["DEFECT_TYPE_CODE"] + "</td>";
                    TRCode = TRCode + "</tr>";
                }
                $("#Supply_Details_Table tbody").append(TRCode);


                var SupplyLines = Data["SupplyLines"];
                //debugger
                TRCode = "";

                if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
                    for (var i = 0; i < SupplyLines.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SupplyLines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["QTY_SUPPLIED"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["BreakageQtyNos"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyLines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_TableB tbody").append(TRCode);
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36") {
                    for (var i = 0; i < SupplyLines.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SupplyLines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["QTY_SUPPLIED"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["BreakageQtyNos"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyLines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_TableB tbody").append(TRCode);
                }
                //VIKAS G 2023-03-17 SBU8 START.
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                    for (var i = 0; i < SupplyLines.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["plant_name"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SupplyLines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["QTY_SUPPLIED"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["BreakageQtyNos"] + "</td>";
                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyLines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_TableSBU3 tbody").append(TRCode);
                }
                //VIKAS G 2023-03-17 SBU8 STAREND.T
                else {
                    for (var i = 0; i < SupplyLines.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='SDBU3_" + (i + 1) + "' onclick='EditSDBBU3(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["PRODUCT_NAME"] + "</td>";
                        //VIKAS G, 10-3-2022
                        TRCode = TRCode + "<td>" + SupplyLines[i]["plant_name"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SupplyLines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["QTY_SUPPLIED"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["BreakageQtyNos"] + "</td>";
                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyLines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyLines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_TableSBU3 tbody").append(TRCode);
                }

                $("#SD_InvoiceDetails").val(HeaderData[0]["InvoiceDetails"]);
                $("#SD_ProductDetails").val(HeaderData[0]["ProductDetails"]);

                $("#HiddenInvoiceDetails").val(HeaderData[0]["InvoiceDetails"]);

                //$("#ObservationByQAF").val(HeaderData[0]["OBSERVATIONSBY_OFFICIAL"]);

                $("#ComplaintDescribedBySales").val(HeaderData[0]["OBSERVATIONSBY_OFFICIAL"]);

                if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU1") {

                    $("#SupplyDetailsTableA").show();
                    $("#SupplyDetailsTableB").hide();
                    $("#SupplyDetailsTableSBU3").hide();

                    $("#BreakageInspectionSheetDiv").show();
                    $("#ObservationRemarksDiv").show();
                    $("#SiteObservationSheetDiv").show();
                    $("#SiteObservationSheetDivBU8").hide();
                    $("#CustomerRemarksIfAnyFieldDiv").show();
                    $("#ObservationsByOfficialFieldDiv").show();
                    $("#RemarksFieldDiv").show();
                    $("#NatureOfComplaintFieldDiv").hide();
                    $("#ComplaintDescribedBySalesFieldDiv").hide();
                    $("#ComplaintDescriptionFieldDiv").hide();
                    $("#ObservationByQAFFieldDiv").hide();

                    $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                    $("#VisitedDateSpanId").show();
                }
                else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU2" || HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3" || HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {

                    $("#SupplyDetailsTableA").hide();
                    //$("#SupplyDetailsTableB").show();

                    $("#BreakageInspectionSheetDiv").hide();
                    $("#ObservationRemarksDiv").hide();
                    $("#SiteObservationSheetDiv").hide();
                    $("#SiteObservationSheetDivBU8").hide();
                    $("#SupplyDetailsCalculationsDiv").hide();

                    if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU2") {
                        $("#CustomerRemarksIfAnyFieldDiv").hide();
                        $("#ObservationsByOfficialFieldDiv").hide();
                        $("#RemarksFieldDiv").show();
                        $("#NatureOfComplaintFieldDiv").show();
                        $("#ComplaintDescribedBySalesFieldDiv").show();
                        $("#ComplaintDescriptionFieldDiv").show();
                        $("#ObservationByQAFFieldDiv").show();
                        $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                        $("#VisitedDateSpanId").show();

                        $("#SupplyDetailsTableB").show();
                        $("#SupplyDetailsTableSBU3").hide();
                    }
                    else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36") {
                        $("#CustomerRemarksIfAnyFieldDiv").hide();
                        $("#ObservationsByOfficialFieldDiv").hide();
                        $("#RemarksFieldDiv").show();
                        $("#NatureOfComplaintFieldDiv").show();
                        $("#ComplaintDescribedBySalesFieldDiv").show();
                        $("#ComplaintDescriptionFieldDiv").show();
                        $("#ObservationByQAFFieldDiv").show();
                        $("#SubStockistLabel").text("Sub-Stockiest/ Direct Customer");
                        $("#VisitedDateSpanId").show();

                        $("#SupplyDetailsTableB").show();
                        $("#SupplyDetailsTableSBU3").hide();
                    }
                    else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3") {
                        $("#CustomerRemarksIfAnyFieldDiv").hide();
                        $("#ObservationsByOfficialFieldDiv").show();
                        $("#RemarksFieldDiv").show();
                        $("#NatureOfComplaintFieldDiv").show();
                        $("#ComplaintDescribedBySalesFieldDiv").hide();
                        $("#ComplaintDescriptionFieldDiv").hide();
                        $("#ObservationByQAFFieldDiv").hide();
                        $("#SubStockistLabel").text("Distributor/ Wholesaler/ Dealer/ Project");
                        $("#VisitedDateSpanId").hide();

                        $("#SupplyDetailsTableB").hide();
                        $("#SupplyDetailsTableSBU3").show();

                        TRCode = "";
                        var MSFBU3Lines = Data["SupplyLines"];
                        var MatSupLines = Data["MatSupLines"];
                        $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                        for (var i = 0; i < MSFBU3Lines.length; i++) {
                            //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .

                            //TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";                            

                            TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "'>";
                            TRCode = TRCode + "<td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MatSupLines[0]["PLANT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MatSupLines[0]["SUPPLY_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MatSupLines[0]["SUPPLY_NAME"] + "</td>";
                            TRCode = TRCode + "<td>EA</td>";
                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["QTY_SUPPLIED"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["BreakageQtyNos"] + "</td>";

                            TRCode = TRCode + "<td></td>";
                            TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[0]["PLANT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[0]["SUPPLY_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[0]["SUPPLY_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);


                    }
                    else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                        $("#ObservationRemarksDiv").hide();
                        $("#SiteObservationSheetDiv").hide();
                        $("#SiteObservationSheetDivBU8").show();
                        $("#CustomerRemarksIfAnyFieldDiv").hide();
                        $("#ObservationsByOfficialFieldDiv").show();
                        $("#RemarksFieldDiv").show();
                        $("#NatureOfComplaintFieldDiv").show();
                        $("#ComplaintDescribedBySalesFieldDiv").hide();
                        $("#ComplaintDescriptionFieldDiv").hide();
                        $("#ObservationByQAFFieldDiv").hide();
                        $("#SubStockistLabel").text("Distributor/ Wholesaler/ Dealer/ Project");
                        $("#VisitedDateSpanId").hide();

                        $("#SupplyDetailsTableB").hide();
                        $("#SupplyDetailsTableSBU3").show();

                        TRCode = "";
                        var MSFBU3Lines = Data["SupplyLines"];
                        var MatSupLines = Data["MatSupLines"];
                        $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                        for (var i = 0; i < MSFBU3Lines.length; i++) {
                            //VIKAS G, 8/3/2022 JOSEPH REQUIREMENT, Material supply details and invoice details - - what is the purpose of entering data two doff places. Cumbersome process .

                            TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";
                            //TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "'>";
                            TRCode = TRCode + "<td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MatSupLines[0]["PLANT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MatSupLines[0]["SUPPLY_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MatSupLines[0]["SUPPLY_NAME"] + "</td>";
                            TRCode = TRCode + "<td>EA</td>";
                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["QTY_SUPPLIED"] + "</td>";
                            TRCode = TRCode + "<td>" + MSFBU3Lines[i]["BreakageQtyNos"] + "</td>";

                            TRCode = TRCode + "<td></td>";
                            TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[0]["PLANT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[0]["SUPPLY_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none;'>" + MatSupLines[0]["SUPPLY_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Material_Supply_Detail_Table_BU3 tbody").append(TRCode);


                    }
                }


                //AddThingsToProductDetails();
                if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU1") {
                    //MakeTotalsForSheetingTable();
                }

                //svprasadk 15-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "Sheeting" || HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU1") {
                    $("#CompensationDiv_Sheeting").show();
                    $("#CompensationDiv_Aerocon").hide();
                    $("#CompensationSize_Details_Div").hide();
                    if (HeaderData[0]["PRODUCT_CATEGORY_NAME"] == "CC Iron Sheets") {
                        $(".HideMeForCCSheets").css('display', 'none');

                        $("#RecommendedForCCSheetsDivision").css('display', 'block');
                    } else {
                        $("#RecommendedForCCSheetsDivision").css('display', 'none');
                    }
                } else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU2" || (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_NAME"] == "36")) {
                    $("#CompensationSize_Details_Div").show();
                    $("#RecommendedForCCSheetsDivision").css('display', 'none');

                    $("#CompensationDiv_Sheeting").hide();
                    $("#CompensationDiv_Aerocon").show();
                } else if (HeaderData[0]["PRODUCT_TYPE_NAME"] == "SBU3") {
                    $("#CompensationSizeLines_Details_Table").css("display", "none");
                    $("#CompensationSize_Add").css("display", "none");
                    $("#CompensationinMetricCubicValueDivision").css("display", "none");
                    $("#CompensationSize_Details_Div").show();
                    $("#CompensationDiv_Sheeting").hide();
                    $("#CompensationDiv_Aerocon").show();
                }
                else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                    $("#CompensationSizeLines_Details_Table").css("display", "none");
                    $("#CompensationSize_Add").css("display", "none");
                    $("#CompensationinMetricCubicValueDivision").css("display", "none");
                    $("#CompensationSize_Details_Div").show();
                    $("#CompensationDiv_Sheeting").hide();
                    $("#CompensationDiv_Aerocon").show();
                }
                //svprasadk 15-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start

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
function GetInvestigator_Type(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.Investigator_Type_ID = $(obj).children().eq(0).html();
        InvestigationScope.Investigator_Type_CODE = $(obj).children().eq(1).html();
        InvestigationScope.Investigator_Type = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//User pop master pop up
function GetInvestigation_Done_By(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.Investigation_Done_By_ID = $(obj).children().eq(0).html();
        InvestigationScope.Investigation_Done_By_CODE = $(obj).children().eq(1).html();
        InvestigationScope.Investigation_Done_By = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//product category master pop up
function GetInvProduct_Category(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.Product_Category_ID = $(obj).children().eq(0).html();
        InvestigationScope.Product_Category_CODE = $(obj).children().eq(1).html();
        InvestigationScope.Product_Category = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Series code pop up
function GetIGS_Series_Code(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.IGS_Series_Code = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//plant master pop up
function GetPlantMasterInv(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.Material_Belongs_TO_ID = $(obj).children().eq(0).html();
        InvestigationScope.Material_Belongs_TO_CODE = $(obj).children().eq(1).html();
        InvestigationScope.Material_Belongs_To = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
function GetPlantMasterInvBU3(obj) {
    InvestigationScope.$apply(function () {
        $("#BU3Material_Belongs_TO_CODE").val($(obj).children().eq(1).html());
        $("#BU3Material_Belongs_To_Name").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//plant master pop up
function GetProductSuppliedFromInv(obj) {
    InvestigationScope.$apply(function () {

        $("#Product_Supplied_From_ID").val($(obj).children().eq(0).html());
        $("#Product_Supplied_From_CODE").val($(obj).children().eq(1).html());
        $("#Product_Supplied_From").val($(obj).children().eq(2).html());

        $("#MSD_Name").val("");
        $("#MSD_Name_ID").val("");
        $("#MSD_Name_CODE").val("");

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
function GetProductSuppliedFromInvBU3(obj) {
    InvestigationScope.$apply(function () {

        if (($(obj).children().eq(2).html()) == "Sub Stockist") {
            alert("Sub Stockist is Not Applicable for SBU3");
        }
        else {

            $("#BU3Product_Supplied_From_CODE").val($(obj).children().eq(1).html());
            $("#BU3Product_Supplied_From_Name").val($(obj).children().eq(2).html());

            $("#BU3MSD_Name_Name").val("");
            $("#BU3MSD_Name_CODE").val("");

        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product master pop up
function GetProductMasterInv(obj) {
    debugger
    InvestigationScope.$apply(function () {
        $("#fortune20_product_category_code").val($(obj).children().eq(4).html());
        var fortune20_check = "FALSE";
        var MyData = JSON.stringify({
            fortune20_product_category_code: $(obj).children().eq(4).html(),
        });

        $.ajax({
            method: 'POST',
            url: '../../ComplaintRegistration/checkFortune20',
            async: false,
            data: { MyData: MyData },
        }).then(function successCallback(response) {
            if (response == "FALSE" || response == "[]") {
                fortune20_check = response;
            }
            else {
                fortune20_check = response;
            }
        }, function errorCallback(response) {
            alert("Error : " + response);
        });
        //try {
        //    $("#SD_Item_Type_Product_Name_ID").val($(obj).children().eq(0).html());
        //    $("#SD_Item_Type_Product_Name_CODE").val($(obj).children().eq(1).html());
        //    $("#SD_Item_Type_Product_Name").val($(obj).children().eq(2).html());

        //    //$("#SD_Size_M").val($(obj).children().eq(3).html());
        //    $("#SD_Item_Type_GrossWeight").val($(obj).children().eq(6).html());
        //}
        //catch (e) {
        //    alert("Error : GetProductMasterInv : " + e);
        //    console.error(e.message);
        //    console.error(e);
        //}
        //alert($("#CREATED_DATE").val());
        //alert(fortune20_check);
        if (new Date($("#CREATED_DATE").val()) < new Date('2020-11-19')) {
            //debugger
            try {
                $("#SD_Item_Type_Product_Name_ID").val($(obj).children().eq(0).html());
                $("#SD_Item_Type_Product_Name_CODE").val($(obj).children().eq(1).html());
                $("#SD_Item_Type_Product_Name").val($(obj).children().eq(2).html());

                //$("#SD_Size_M").val($(obj).children().eq(3).html());
                $("#SD_Item_Type_GrossWeight").val($(obj).children().eq(6).html());
                var RowId = "";

                var SuppliedQtyM = "";
                var BreakageQtyM = "";
                var fortune20 = "";

                var Size = "";
                var GrossWeight = "";

                var Division = $("#Product_CategoryCode").val();
                if (Division == "11") {

                    $("#Supply_Details_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));

                        if (SuppliedQtyM == "") {
                            SuppliedQtyM = 0;
                        }
                        if (BreakageQtyM == "") {
                            BreakageQtyM = 0;
                        }
                        SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                        BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML);
                    });

                    $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                    $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);

                    var TotSupTons = parseFloat((parseFloat(SuppliedQtyM)) * (0.01269));
                    var TotBrkTons = parseFloat((parseFloat(BreakageQtyM)) * (0.01269));

                    SuppliedQtyM = Math.round(SuppliedQtyM * 10000) / 10000;
                    BreakageQtyM = Math.round(BreakageQtyM * 10000) / 10000;

                    TotSupTons = Math.round(TotSupTons * 10000) / 10000;
                    TotBrkTons = Math.round(TotBrkTons * 10000) / 10000;

                    if (SuppliedQtyM == "" || isNaN(SuppliedQtyM)) {
                        SuppliedQtyM = 0;
                    }
                    if (BreakageQtyM == "" || isNaN(BreakageQtyM)) {
                        BreakageQtyM = 0;
                    }
                    if (TotSupTons == "" || isNaN(TotSupTons)) {
                        TotSupTons = 0;
                    }
                    if (TotBrkTons == "" || isNaN(TotBrkTons)) {
                        TotBrkTons = 0;
                    }

                    $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                    $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);

                    $("#Total_Supply_Qty_Tons").val(TotSupTons);
                    $("#Total_Breakage_Qty_Tons").val(TotBrkTons);

                }
                else if (Division == "15") {
                    $("#Supply_Details_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));

                        if (SuppliedQtyM == "") {
                            SuppliedQtyM = 0;
                        }
                        if (BreakageQtyM == "") {
                            BreakageQtyM = 0;
                        }
                        SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                        BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML);
                        //fortune20 = $("#Supply_Details_Table tbody #" + RowId + " td")[1].innerHTML.toLowerCase();
                    });
                    //alert(fortune20);
                    $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                    $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);
                    if ($('#fortune20_check').val() == "TRUE") {
                        var TotSupTons = parseFloat((parseFloat(SuppliedQtyM)) * (0.0123));
                        var TotBrkTons = parseFloat((parseFloat(BreakageQtyM)) * (0.0123));
                    } else {
                        var TotSupTons = parseFloat((parseFloat(SuppliedQtyM)) * (0.0105));
                        var TotBrkTons = parseFloat((parseFloat(BreakageQtyM)) * (0.0105));
                    }

                    SuppliedQtyM = Math.round(SuppliedQtyM * 10000) / 10000;
                    BreakageQtyM = Math.round(BreakageQtyM * 10000) / 10000;

                    TotSupTons = Math.round(TotSupTons * 10000) / 10000;
                    TotBrkTons = Math.round(TotBrkTons * 10000) / 10000;

                    if (SuppliedQtyM == "" || isNaN(SuppliedQtyM)) {
                        SuppliedQtyM = 0;
                    }
                    if (BreakageQtyM == "" || isNaN(BreakageQtyM)) {
                        BreakageQtyM = 0;
                    }
                    if (TotSupTons == "" || isNaN(TotSupTons)) {
                        TotSupTons = 0;
                    }
                    if (TotBrkTons == "" || isNaN(TotBrkTons)) {
                        TotBrkTons = 0;
                    }

                    $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                    $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);

                    $("#Total_Supply_Qty_Tons").val(TotSupTons);
                    $("#Total_Breakage_Qty_Tons").val(TotBrkTons);

                }
                else if (Division == "14") {

                    var SupplyLength = 0;
                    var SupplyWeight = 0;
                    var BreakageLength = 0;
                    var BreakageWeight = 0;

                    $("#Supply_Details_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));

                        Size = 0;
                        GrossWeight = 0;

                        Size = parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[2].innerHTML);
                        GrossWeight = parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[3].innerHTML);

                        SupplyLength = parseFloat(SupplyLength) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML) * Size);
                        SupplyWeight = parseFloat(SupplyWeight) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML) * GrossWeight);

                        BreakageLength = parseFloat(BreakageLength) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML) * Size);
                        BreakageWeight = parseFloat(BreakageWeight) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML) * GrossWeight);

                    });
                    SupplyWeight = parseFloat(SupplyWeight) / 1000;
                    BreakageWeight = parseFloat(BreakageWeight) / 1000;

                    SupplyLength = Math.round((parseFloat(SupplyLength)) * 10000) / 10000;
                    SupplyWeight = Math.round((parseFloat(SupplyWeight)) * 10000) / 10000;
                    BreakageLength = Math.round((parseFloat(BreakageLength)) * 10000) / 10000;
                    BreakageWeight = Math.round((parseFloat(BreakageWeight)) * 10000) / 10000;

                    $("#Total_Supply_Oty_Mtrs").val(SupplyLength);
                    $("#Total_Breakage_Qty_Mtrs").val(BreakageLength);

                    $("#Total_Supply_Qty_Tons").val(SupplyWeight);
                    $("#Total_Breakage_Qty_Tons").val(BreakageWeight);

                }
                Total_Recovery_MtrsChange();

            }
            catch (e) {
                alert("Error : MakeTotalsForSheetingTable : " + e);
            }
        } else {
            try {
                $("#SD_Item_Type_Product_Name_ID").val($(obj).children().eq(0).html());
                $("#SD_Item_Type_Product_Name_CODE").val($(obj).children().eq(1).html());
                $("#SD_Item_Type_Product_Name").val($(obj).children().eq(2).html());

                //$("#SD_Size_M").val($(obj).children().eq(3).html());
                $("#SD_Item_Type_GrossWeight").val($(obj).children().eq(6).html());
                //svprasadk 04-05-2020 SBU 1 requirement to get supply details based on customer and product type start
                if ($("#Product_CategoryCode").val() == 11) {
                    var SD_Item_Type_Product_Name_CODE = $("#SD_Item_Type_Product_Name_CODE").val();
                    var Product_Type = $("#Product_Type_CODE").val();
                    var Product_CategoryCode = $("#Product_CategoryCode").val();
                    var Customer_Code = $("#Customer_Code").val();
                    var InvDateSupplyFrom = $("#InvDateSupplyFrom").val();
                    var InvDateSupplyTo = $("#InvDateSupplyTo").val();
                    var SubStockiest_Code = $("#SubStockiest_Code").val();
                    var party_type = $("#party_type_id").val();

                    if (Product_Type == "") {
                        alert("Please Provide Product Type");
                        return;
                    } else if (Product_CategoryCode == "") {
                        alert("Please Provide Product Type");
                        return;
                    } else if (Customer_Code == "") {
                        alert("Please Provide Customer");
                        return;
                    } else if (!$("#Period_Based").is(':checked') && !$("#Invoice_Based").is(':checked')) {
                        alert("Please select either period based or invoice based");
                        return;
                    } else if ($("#Period_Based").is(':checked') && InvDateSupplyFrom == "") {
                        alert("Please Provide From Date");
                        return;
                    } else if ($("#Period_Based").is(':checked') && InvDateSupplyTo == "") {
                        alert("Please Provide To Date");
                        return;
                    } else {
                        if (Product_Type == "SBU1") {
                            Product_Type = "1000";
                        }
                        else if (Product_Type == "SBU2") {
                            Product_Type = "2000";
                        }
                        else if (Product_Type == "SBU3") {
                            Product_Type = "3000";
                        }
                        else if (Product_Type == "SBU8") {
                            Product_Type = "8000";
                        }
                        Data = JSON.stringify({
                            Product_Type: Product_Type,
                            Customer_Code: Customer_Code,
                            Product_CategoryCode: Product_CategoryCode,
                            InvDateSupplyFrom: ConvertDateFormat(InvDateSupplyFrom),
                            InvDateSupplyTo: ConvertDateFormat(InvDateSupplyTo),
                            SD_Item_Type_Product_Name_CODE: SD_Item_Type_Product_Name_CODE,
                            SubStockiest_Code: SubStockiest_Code,
                            party_type: party_type
                        });
                        $.ajax({
                            method: 'POST',
                            url: '../../ComplaintRegistration/getSizeSupplyQtyforProduct',
                            async: false,
                            data: { Data: Data },
                        }).then(function successCallback(response) {
                            //debugger
                            if (response != "FALSE") {
                                console.log(response)
                                var Data = JSON.parse(response);
                                var HeaderData = Data["Header"];

                                var SD_Size_M = "";
                                var SD_Supplied_Qty_Nos = 0;
                                var SD_Supplied_Qty_M = 0;

                                if (Data[0]["PRODUCT_NAME"].includes("Newkor") || Data[0]["PRODUCT_NAME"].includes("newkor")) {
                                    SD_Size_M = Data[0]["PRODUCT_NAME"].split(" ")[2];
                                    SD_Supplied_Qty_Nos = Data[0]["BILL_QTY"];
                                    SD_Supplied_Qty_M = SD_Size_M * Data[0]["BILL_QTY"];
                                    $("#SD_Size_M").val(SD_Size_M);
                                    $("#SD_Supplied_Qty_Nos").val(SD_Supplied_Qty_Nos);
                                    $("#SD_Supplied_Qty_M").val(SD_Supplied_Qty_M);
                                    console.log(SD_Size_M + " -- " + SD_Supplied_Qty_Nos + " -- " + SD_Supplied_Qty_M)
                                    //$("#Total_Supply_Oty_Mtrs").val(Data[0]["Total_Supply_Oty_Mtrs"]);
                                    //Total_Supply_Oty_MtrsChange();
                                    //svprasadk 14-05-2020 SBU 1 requirement to get supply details based on customer and product type start
                                    $("#Total_Supply_Qty_Tons").val((Data[0]["Total_Supply_Qty_Tons"] / 1000).toFixed(2));
                                    if (Data[0]["Total_Supply_Qty_Tons"] != "") {
                                        $("#Total_Supply_Oty_Mtrs").val((Data[0]["Total_Supply_Qty_Tons"] / (0.01269 * 1000)).toFixed(2));
                                    }
                                    //alert($("#Total_Supply_Qty_Tons").val())
                                    //alert($("#Total_Supply_Oty_Mtrs").val())
                                    //svprasadk 14-05-2020 SBU 1 requirement to get supply details based on customer and product type end
                                } else if (Data[0]["PRODUCT_NAME"].includes("Malabar") || Data[0]["PRODUCT_NAME"].includes("malabar")) {
                                    SD_Size_M = Data[0]["PRODUCT_NAME"].split(" ")[5];
                                    SD_Supplied_Qty_Nos = Data[0]["BILL_QTY"];
                                    SD_Supplied_Qty_M = SD_Size_M * Data[0]["BILL_QTY"];
                                    $("#SD_Size_M").val(SD_Size_M);
                                    $("#SD_Supplied_Qty_Nos").val(SD_Supplied_Qty_Nos);
                                    $("#SD_Supplied_Qty_M").val(SD_Supplied_Qty_M);
                                    console.log(SD_Size_M + " -- " + SD_Supplied_Qty_Nos + " -- " + SD_Supplied_Qty_M)
                                    //$("#Total_Supply_Oty_Mtrs").val(Data[0]["Total_Supply_Oty_Mtrs"]);
                                    //Total_Supply_Oty_MtrsChange();
                                    //svprasadk 14-05-2020 SBU 1 requirement to get supply details based on customer and product type start
                                    $("#Total_Supply_Qty_Tons").val((Data[0]["Total_Supply_Qty_Tons"] / 1000).toFixed(2));
                                    if (Data[0]["Total_Supply_Qty_Tons"] != "") {
                                        $("#Total_Supply_Oty_Mtrs").val((Data[0]["Total_Supply_Qty_Tons"] / (0.01269 * 1000)).toFixed(2));
                                    }
                                    //alert($("#Total_Supply_Qty_Tons").val())
                                    //alert($("#Total_Supply_Oty_Mtrs").val())
                                    //svprasadk 14-05-2020 SBU 1 requirement to get supply details based on customer and product type end
                                } else {
                                    $("#SD_Size_M").val(0);
                                    $("#SD_Supplied_Qty_Nos").val(0);
                                    $("#SD_Supplied_Qty_M").val(0);
                                }
                            } else {
                                alert("No Data Available");
                                try {
                                    var RowId = "";

                                    var SuppliedQtyM = "";
                                    var BreakageQtyM = "";
                                    var fortune20 = "";
                                    var Size = "";
                                    var GrossWeight = "";

                                    var Division = $("#Product_CategoryCode").val();
                                    if (Division == "11") {

                                        $("#Supply_Details_Table tbody tr").each(function () {
                                            RowId = ($(this).attr("id"));

                                            if (SuppliedQtyM == "") {
                                                SuppliedQtyM = 0;
                                            }
                                            if (BreakageQtyM == "") {
                                                BreakageQtyM = 0;
                                            }
                                            SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                                            BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML);
                                        });

                                        $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                                        $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);

                                        var TotSupTons = parseFloat((parseFloat(SuppliedQtyM)) * (0.01269));
                                        var TotBrkTons = parseFloat((parseFloat(BreakageQtyM)) * (0.01269));

                                        SuppliedQtyM = Math.round(SuppliedQtyM * 10000) / 10000;
                                        BreakageQtyM = Math.round(BreakageQtyM * 10000) / 10000;

                                        TotSupTons = Math.round(TotSupTons * 10000) / 10000;
                                        TotBrkTons = Math.round(TotBrkTons * 10000) / 10000;

                                        if (SuppliedQtyM == "" || isNaN(SuppliedQtyM)) {
                                            SuppliedQtyM = 0;
                                        }
                                        if (BreakageQtyM == "" || isNaN(BreakageQtyM)) {
                                            BreakageQtyM = 0;
                                        }
                                        if (TotSupTons == "" || isNaN(TotSupTons)) {
                                            TotSupTons = 0;
                                        }
                                        if (TotBrkTons == "" || isNaN(TotBrkTons)) {
                                            TotBrkTons = 0;
                                        }

                                        $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                                        $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);

                                        $("#Total_Supply_Qty_Tons").val(TotSupTons);
                                        $("#Total_Breakage_Qty_Tons").val(TotBrkTons);

                                    }
                                    else if (Division == "15") {
                                        $("#Supply_Details_Table tbody tr").each(function () {
                                            RowId = ($(this).attr("id"));

                                            if (SuppliedQtyM == "") {
                                                SuppliedQtyM = 0;
                                            }
                                            if (BreakageQtyM == "") {
                                                BreakageQtyM = 0;
                                            }
                                            SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                                            BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[8].innerHTML);
                                            fortune20 = $("#Supply_Details_Table tbody #" + RowId + " td")[1].innerHTML.toLowerCase();
                                        });

                                        $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                                        $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);

                                        if ($('#fortune20_check').val() == "TRUE") {
                                            var TotSupTons = parseFloat((parseFloat(SuppliedQtyM)) * (0.0123));
                                            var TotBrkTons = parseFloat((parseFloat(BreakageQtyM)) * (0.0123));
                                        } else {
                                            var TotSupTons = parseFloat((parseFloat(SuppliedQtyM)) * (0.0105));
                                            var TotBrkTons = parseFloat((parseFloat(BreakageQtyM)) * (0.0105));
                                        }

                                        SuppliedQtyM = Math.round(SuppliedQtyM * 10000) / 10000;
                                        BreakageQtyM = Math.round(BreakageQtyM * 10000) / 10000;

                                        TotSupTons = Math.round(TotSupTons * 10000) / 10000;
                                        TotBrkTons = Math.round(TotBrkTons * 10000) / 10000;

                                        if (SuppliedQtyM == "" || isNaN(SuppliedQtyM)) {
                                            SuppliedQtyM = 0;
                                        }
                                        if (BreakageQtyM == "" || isNaN(BreakageQtyM)) {
                                            BreakageQtyM = 0;
                                        }
                                        if (TotSupTons == "" || isNaN(TotSupTons)) {
                                            TotSupTons = 0;
                                        }
                                        if (TotBrkTons == "" || isNaN(TotBrkTons)) {
                                            TotBrkTons = 0;
                                        }

                                        $("#Total_Supply_Oty_Mtrs").val(SuppliedQtyM);
                                        $("#Total_Breakage_Qty_Mtrs").val(BreakageQtyM);

                                        $("#Total_Supply_Qty_Tons").val(TotSupTons);
                                        $("#Total_Breakage_Qty_Tons").val(TotBrkTons);

                                    }
                                    else if (Division == "14") {

                                        var SupplyLength = 0;
                                        var SupplyWeight = 0;
                                        var BreakageLength = 0;
                                        var BreakageWeight = 0;

                                        $("#Supply_Details_Table tbody tr").each(function () {
                                            RowId = ($(this).attr("id"));

                                            Size = 0;
                                            GrossWeight = 0;

                                            Size = parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[2].innerHTML);
                                            GrossWeight = parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[3].innerHTML);

                                            SupplyLength = parseFloat(SupplyLength) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML) * Size);
                                            SupplyWeight = parseFloat(SupplyWeight) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[4].innerHTML) * GrossWeight);

                                            BreakageLength = parseFloat(BreakageLength) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML) * Size);
                                            BreakageWeight = parseFloat(BreakageWeight) + (parseFloat($("#Supply_Details_Table tbody #" + RowId + " td")[7].innerHTML) * GrossWeight);

                                        });
                                        SupplyWeight = parseFloat(SupplyWeight) / 1000;
                                        BreakageWeight = parseFloat(BreakageWeight) / 1000;

                                        SupplyLength = Math.round((parseFloat(SupplyLength)) * 10000) / 10000;
                                        SupplyWeight = Math.round((parseFloat(SupplyWeight)) * 10000) / 10000;
                                        BreakageLength = Math.round((parseFloat(BreakageLength)) * 10000) / 10000;
                                        BreakageWeight = Math.round((parseFloat(BreakageWeight)) * 10000) / 10000;

                                        $("#Total_Supply_Oty_Mtrs").val(SupplyLength);
                                        $("#Total_Breakage_Qty_Mtrs").val(BreakageLength);

                                        $("#Total_Supply_Qty_Tons").val(SupplyWeight);
                                        $("#Total_Breakage_Qty_Tons").val(BreakageWeight);

                                    }
                                    Total_Recovery_MtrsChange();

                                }
                                catch (e) {
                                    alert("Error : MakeTotalsForSheetingTable : " + e);
                                }
                            }
                        },
                            function errorCallback(response) {
                                alert("Error : " + response);
                            });
                    }
                }
                //svprasadk 04-05-2020 SBU 1 requirement to get supply details based on customer and product type start
            }
            catch (e) {
                alert("Error : GetProductMasterInv : " + e);
                console.error(e.message);
                console.error(e);
            }
        }

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//product master pop up
function GetProductMasterInvB(obj) {
    InvestigationScope.$apply(function () {
        try {
            $("#SD_Item_Type_Product_Name_IDB").val($(obj).children().eq(0).html());
            $("#SD_Item_Type_Product_Name_CODEB").val($(obj).children().eq(1).html());
            $("#SD_Item_Type_Product_NameB").val($(obj).children().eq(2).html());

            //InvestigationScope.SD_Size_M = $(obj).children().eq(3).html();
            //InvestigationScope.SD_Item_Type_GrossWeight = $(obj).children().eq(6).html();
        }
        catch (e) {
            alert("Error : GetProductMasterInvB : " + e);
            console.error(e.message);
            console.error(e);
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//ProductMasterPopUp
function GetProductMasterInvBU3(obj) {
    InvestigationScope.$apply(function () {
        $("#BU3MSD_ProductCode").val($(obj).children().eq(1).html());
        $("#BU3MSD_ProductName").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
function GetProductMasterInvSDBU3(obj) {
    debugger
    InvestigationScope.$apply(function () {
        $("#Product_Code_BU3").val($(obj).children().eq(1).html());
        $("#Product_Name_BU3").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
function GetDefectTypeMasterInv(obj) {
    InvestigationScope.$apply(function () {

        //InvestigationScope.SD_Defect_Type_ID = $(obj).children().eq(0).html();
        //InvestigationScope.SD_Defect_Type_CODE = $(obj).children().eq(1).html();
        //InvestigationScope.SD_Defect_Type = $(obj).children().eq(2).html();

        $("#SD_Defect_Type_ID").val($(obj).children().eq(0).html());
        $("#SD_Defect_Type_CODE").val($(obj).children().eq(1).html());
        $("#SD_Defect_Type").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
function GetDefectTypeMasterInvB(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.Defect_Type_IDB = $(obj).children().eq(0).html();
        //InvestigationScope.Defect_Type_CODEB = $(obj).children().eq(1).html();
        //InvestigationScope.Defect_TypeB = $(obj).children().eq(2).html();

        //InvestigationScope.Defect_Type_IDB = $(obj).children().eq(0).html();
        //InvestigationScope.Defect_Type_CODEB = $(obj).children().eq(1).html();
        //InvestigationScope.Defect_TypeB = $(obj).children().eq(2).html();

        $("#Defect_Type_IDB").val($(obj).children().eq(0).html());
        $("#Defect_Type_CODEB").val($(obj).children().eq(1).html());
        $("#Defect_TypeB").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
function GetDefectTypeMasterInvBU3(obj) {
    InvestigationScope.$apply(function () {
        $("#DefectTypeCodeBU3").val($(obj).children().eq(1).html());
        $("#DefectTypeNameBU3").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
function GetBISDefectTypeMaster(obj) {
    InvestigationScope.$apply(function () {
        //InvestigationScope.BIS_Defect_Type_ID = $(obj).children().eq(0).html();
        //InvestigationScope.BIS_Defect_Type_CODE = $(obj).children().eq(1).html();
        //InvestigationScope.BIS_Defect_Type = $(obj).children().eq(2).html();

        $("#BIS_Defect_Type_ID").val($(obj).children().eq(0).html());
        $("#BIS_Defect_Type_CODE").val($(obj).children().eq(1).html());
        $("#BIS_Defect_Type").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//size master pop up
function GetSize_Mast(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.BIS_Size = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//recovery master pop up
function GetRecoveryMasterInv(obj) {
    InvestigationScope.$apply(function () {

        InvestigationScope.BIS_Recovery_CODE = $(obj).children().eq(1).html();
        InvestigationScope.BIS_Recovery_Product_Name = $(obj).children().eq(2).html();
        InvestigationScope.BIS_Recovery = $(obj).children().eq(3).html();
        InvestigationScope.BIS_Recovery_GrossWeight = $(obj).children().eq(4).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//size master pop up
function GetSize_Mast_BISP(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.BISP_Size = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
function GetBISPDefectTypeMaster(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.BISP_Defect_Type_ID = $(obj).children().eq(0).html();
        InvestigationScope.BISP_Defect_Type_CODE = $(obj).children().eq(1).html();
        InvestigationScope.BISP_Defect_Type = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Recovery master pop up
function GetBISPRecoveryMasterInv(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.BISP_Recovery_Product_ID = $(obj).children().eq(0).html();
        InvestigationScope.BISP_Recovery_Product_CODE = $(obj).children().eq(1).html();
        InvestigationScope.BISP_Recovery_Product = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//name pop up
function GetMSD_NameInv(obj) {
    InvestigationScope.$apply(function () {

        $("#MSD_Name_ID").val($(obj).children().eq(0).html());
        $("#MSD_Name_CODE").val($(obj).children().eq(1).html());
        $("#MSD_Name").val(($(obj).children().eq(2).html()).replace("&amp;", "&"));

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
function GetMSD_NameInvBU3(obj) {
    InvestigationScope.$apply(function () {

        $("#BU3MSD_Name_CODE").val($(obj).children().eq(1).html());
        $("#BU3MSD_Name_Name").val(($(obj).children().eq(2).html()).replace("&amp;", "&"));

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
// Compare with Net Loss Tons change
function CompareWithNetLossTons() {
    debugger
    var Compensation_In_Tons = $("#Compensation_In_Tons").val();
    if (Compensation_In_Tons != "") {
        if ((parseFloat(Compensation_In_Tons).toFixed(2)) > (parseFloat($("#Net_Loss_Tons_Compensation").val()).toFixed(2))) {

            alert("Compensation In Tons should be less than Net Loss(Tons)");
            $("#Compensation_In_Tons").val("");
        }
    }
}

// Calculate Size recommendation change
function CalculateSizeRecommendation() {
    debugger
    try {
        var No_of_36 = $("#No_of_36").val();

        if (No_of_36 != "") {
            No_of_36 = (Math.round(parseFloat(No_of_36) * 10000)) / 10000;
            $("#No_of_36").val(No_of_36);

            SizeofRecomm = (Math.round(parseFloat(SizeofRecomm) * 1000)) / 1000;

            //var SizeofRecomm = (No_of_36 * 3.6);
            var SizeofRecomm = Math.round((No_of_36 * 3.6) * 100) / 100;
            if (SizeofRecomm > ($("#Compensation_In_Running_Meters").val())) {
                $("#Size_Recommendation_RMTS").val("");
                $("#Other_Size_RMTS").val("");
                alert("Size Recommendation(RMT Of 3.6M) should be less than Compensation In Running  Meters");
            }
            else {
                $("#Size_Recommendation_RMTS").val(parseFloat(SizeofRecomm).toFixed(1));

                if (($("#Compensation_In_Running_Meters").val() != "") && ($("#Size_Recommendation_RMTS").val() != "")) {
                    var OtherSize = parseFloat(($("#Compensation_In_Running_Meters").val()) - ($("#Size_Recommendation_RMTS").val()));

                    OtherSize = (Math.round(parseFloat(OtherSize) * 10000)) / 10000;

                    $("#Other_Size_RMTS").val(OtherSize);

                }

            }
        } else {
            $("#No_of_36").val(0);
        }
    }
    catch (e) {
        alert("Error : CalculateSizeRecommendation : " + e);
    }
}

function RecommendedLinesCCSheets() {

    $("#CCS_CompensationSize_id").val("");
    $("#CCS_CompensationRecommendedSize").val("");
    $("#CCS_CompensationProductCode").val("");
    $("#CCSCompensationSizeLineNos").val("");
    $("#CCS_Gross_Weight").val("");
    $("#CCS_CompensationSizeLineTons").val("");

    $("#CCSheetsCompensationSizeLines_Details_Modal").modal('show');
    $("#CCSheets_Delete").hide();
    $("#CCSheets_Save").text("Save");
}

// Compensation Mode Selection
function GetCompensation_Mode_Mast1(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.Compensation_Mode = $(obj).children().eq(2).html();
        InvestigationScope.Compensation_Mode_Code = $(obj).children().eq(1).html();
        InvestigationScope.Compensation_Mode_ID = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Compare with Net Loss mtr change
function CompareWithNetLossMtrs() {
    debugger
    var CompensationInRunningMtrs = $("#Compensation_In_Running_Meters").val();
    if (CompensationInRunningMtrs != "") {
        if ((parseFloat(CompensationInRunningMtrs).toFixed(2)) > (parseFloat($("#Net_Loss_Mtrs_Compensation").val()).toFixed(2))) {

            alert("Compensation In Running Meters should be less than Net Loss(Mtrs)");
            $("#Compensation_In_Running_Meters").val("");
            $("#Other_Size_RMTS").val("");
        }
    }
}

// Compare with Net Loss Tons change
function CompareWithNetLossTons() {
    debugger
    var Compensation_In_Tons = $("#Compensation_In_Tons").val();
    if (Compensation_In_Tons != "") {
        if ((parseFloat(Compensation_In_Tons).toFixed(2)) > (parseFloat($("#Net_Loss_Tons_Compensation").val()).toFixed(2))) {

            alert("Compensation In Tons should be less than Net Loss(Tons)");
            $("#Compensation_In_Tons").val("");
        }
    }
}
//svprasadk 01-04-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end

//svprasadk 29-04-2020 SBU 1 requirement to get supply details based on customer and product type start
function ConvertDateFormat(date) {
    var changeDate = date.split('/');
    var DATETIME = changeDate[2] + "-" + changeDate[1] + "-" + changeDate[0];
    return DATETIME;
}
//svprasadk 29-04-2020 SBU 1 requirement to get supply details based on customer and product type end

//svprasadk 16-11-2020 SBU 1 requirement to add complaint type start
function getComplaintTypeINV(obj) {
    //console.log('obj', obj)
    InvestigationScope.$apply(function () {
        $("#TYPE_OF_COMPLAINT_ID").val($(obj).children().eq(1).html());
        $("#TYPE_OF_COMPLAINT").val($(obj).children().eq(2).html());
        InvestigationScope.TYPE_OF_COMPLAINT_ID = $(obj).children().eq(1).html();
        InvestigationScope.TYPE_OF_COMPLAINT = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//svprasadk 16-11-2020 SBU 1 requirement to add complaint type end

function GetSubStockiestINV(obj) {
    InvestigationScope.$apply(function () {
        InvestigationScope.SubStockiest_ID = $(obj).children().eq(0).html();
        InvestigationScope.SubStockiest_Code = $(obj).children().eq(1).html();
        InvestigationScope.SubStockiest_Name = ($(obj).children().eq(2).html()).replace("&amp;", "&");
        InvestigationScope.SubStockiest_Address = $(obj).children().eq(6).html() + ", " + $(obj).children().eq(3).html() + ", " + $(obj).children().eq(4).html();
        InvestigationScope.SubStockiest_Number = $(obj).children().eq(5).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function getPartyTypeINV(obj) {
    //console.log('obj', obj)
    InvestigationScope.$apply(function () {
        $("#party_type_id").val($(obj).children().eq(1).html());
        $("#party_type").val($(obj).children().eq(2).html());
        InvestigationScope.party_type_id = $(obj).children().eq(1).html();
        InvestigationScope.party_type = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
    showSubStockiestFieldsINV();
}

function showSubStockiestFieldsINV() {
    var party_type = $("#party_type").val();
    var party_type_id = $("#party_type_id").val();
    //alert(party_type + " - " + party_type_id)
    if (party_type == "SubDealer" || party_type_id == 2 || party_type == "Sub-Stockiest") {
        $("#SubStockiest_CodeDiv").show();
        $("#SubStockiest_NameDiv").show();
        $("#SubStockiest_AddressDiv").show();
        $("#SubStockiest_NumberDiv").show();
        $("#SubStockiest_Direct_Customer").val("");
        $("#Is_Project_Party").prop("checked", false);
        $("#Site_Address").val("");
    }
    //svprasadk 19-11-2020 SBU 1 requirement to party type other start
    else if (party_type_id == 7) {
        $("#SubStockiest_CodeDiv").hide();
        $("#SubStockiest_NameDiv").show();
        $("#SubStockiest_Name").removeAttr("disabled");
        $("#SubStockiest_AddressDiv").show();
        $("#SubStockiest_Address").removeAttr("disabled");
        $("#SubStockiest_NumberDiv").show();
        $("#SubStockiest_Number").removeAttr("disabled");
        $("#SubStockiest_Direct_Customer").val("");
        $("#Is_Project_Party").prop("checked", false);
        $("#Site_Address").val("");
    }
    //svprasadk 19-11-2020 SBU 1 requirement to party type other end
    else {
        $("#SubStockiest_CodeDiv").hide();
        $("#SubStockiest_NameDiv").hide();
        $("#SubStockiest_AddressDiv").hide();
        $("#SubStockiest_NumberDiv").hide();
        $("#SubStockiest_ID").val("");
        $("#SubStockiest_Code").val("");
        $("#SubStockiest_Name").val("");
        $("#SubStockiest_Address").val("");
        $("#SubStockiest_Number").val("");
    }
}

DIMS.controller('InvestigationListCtrl', function ($scope, $location, DIMSFactory) {
    InvestigationListScope = $scope;
    $scope.InvestigationList = [];
    angular.element(document).ready(function () {
        $("#HiddenForCMS").val("");

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            //data: { AccessData: JSON.stringify({ UserRole: $("#UserType").val(), FormCode: 'INV' }) },
            data: { AccessData: JSON.stringify({ UserRole: $("#UserType").val(), FormCode: 'INVST' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#CreateNewInvestigation").css('display', 'none');
                    $("#InvestigationListSection").css('display', 'none');
                    $("#StateFilter").css('display', 'none');
                }
                else {

                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#InvestigationListSection").css('display', 'block');
                    }
                    else {
                        $("#InvestigationListSection").css('display', 'none');
                        $("#StateFilter").css('display', 'none');
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
                    url: '../../ComplaintRegistration/FillCMSStateFilter',
                    async: true,
                    success: function (response) {
                        debugger
                        $("#StateFilter").empty();

                        if (response == "") {

                        }
                        else {
                            response = JSON.parse(response);
                            var UserCode = $("#UserCode").val();
                            var SessionUserType = $("#UserType").val();

                            if (UserCode == "2021" || UserCode == "2019" || UserCode == "50001234" || SessionUserType == "QAM_SBU3" || SessionUserType == "RSH_BU3" || SessionUserType == "NSH_BU3" || SessionUserType == "CSM_BU3" || SessionUserType == "QAM_SBU2" || SessionUserType == "CSM_BU2" || SessionUserType == "Plant_MHD" || SessionUserType == "MDO" || SessionUserType == "QAM_SBU8" || SessionUserType == "CSM_BU8" ) {
                                var option = $('<option></option>').attr("value", "ALL").text("ALL");
                                $("#StateFilter").append(option);
                            }

                            for (var i = 0; i < response.length; i++) {
                                var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                                $("#StateFilter").append(option);
                            }
                            var CMSState = $("#CMSState").val();

                            if (CMSState == "") {
                                $("#StateFilter").val(response[0]["STATE_CODE"]);
                                $("#CMSState").val(response[0]["STATE_CODE"]);
                            }
                            else {
                                $("#StateFilter").val(CMSState);
                            }

                            var StateFilter = $("#StateFilter").val();

                            var WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' ORDER BY INV.ID";

                            if (UserCode == "50000822" || UserCode == "50002304" || UserCode == "KAM") {
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE INV.PRODUCT_TYPE_CODE='SBU2' AND INV.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU2' AND INV.DOC_STATUS!=''";
                                }
                            }
                            else if (UserCode == "50000985") {
                                WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' ";
                            }
                            else if (SessionUserType == "RSH_BU3" || SessionUserType == "NSH_BU3") {
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE INV.PRODUCT_TYPE_CODE='SBU3' AND INV.DOC_STATUS!='' ";
                                }
                                else {
                                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU3' AND INV.DOC_STATUS!='' ";
                                }
                            }
                            else if (UserCode == "2019" || UserCode == "2021" || UserCode == "50001234" || SessionUserType == "QAM_SBU3" || SessionUserType == "CSM_BU3" || SessionUserType == "Plant_MHD" || SessionUserType == "MDO") {
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE INV.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND INV.DOC_STATUS!='' ";
                                }
                                else {
                                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND INV.DOC_STATUS!='' ";
                                }
                                //WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU3' AND INV.DOC_STATUS!='' ";
                            }
                            else if (SessionUserType == "QAM_SBU2" || SessionUserType == "CSM_BU2") {
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE (INV.PRODUCT_TYPE_CODE='SBU2' or INV.PRODUCT_TYPE_CODE='SBU3') AND INV.DOC_STATUS!='' ";
                                }
                                else {
                                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND (INV.PRODUCT_TYPE_CODE='SBU2' or INV.PRODUCT_TYPE_CODE='SBU3') AND INV.DOC_STATUS!='' ";
                                }
                            }
                            else if (SessionUserType == "QAM_SBU8" || SessionUserType == "CSM_BU8" || SessionUserType == "QH_BU8") {
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE (INV.PRODUCT_TYPE_CODE='SBU2' or INV.PRODUCT_TYPE_CODE='SBU8') AND INV.DOC_STATUS!='' ";
                                }
                                else {
                                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND (INV.PRODUCT_TYPE_CODE='SBU8') AND INV.DOC_STATUS!='' ";
                                }
                            }
                            else {
                                WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU1'";
                            }

                            var Data = JSON.stringify({
                                MasterType: "ComplaintRegistrationList",
                                ID: "561",
                                UserCode: $("#UserCode").val(),
                                "Type": "Get",
                                ReportName: "InvestigationList",
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

                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "InvestigationList", UserSelectedColumnName);
                                    $('#InvestigationList tbody').on('click', 'tr', function () {
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
                                                //data: { AccessData: JSON.stringify({ UserRole: $("#UserType").val(), FormCode: 'INV' }) },
                                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType").val(), FormCode: 'INVST' }) },
                                                success: function (AccessData) {
                                                    if (AccessData == "") {
                                                    }
                                                    else {
                                                        AccessData = JSON.parse(AccessData);
                                                        if (AccessData[0]["IS_VIEW"] == true || AccessData[0]["IS_UPDATE"] == true) {
                                                            var scope = angular.element($("#InvestigationlistDiv")).scope();
                                                            scope.$apply(function () {
                                                                scope.go("Investigation/" + ID);
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

    $scope.StateChange = function () {
        try {

            var StateFilter = $("#StateFilter").val();

            $("#CMSState").val(StateFilter);

            var StateFilter = $("#StateFilter").val();

            var UserCode = $("#UserCode").val();

            var WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' ORDER BY INV.ID";
            var SessionUserType = $("#UserType").val();


            if (UserCode == "50000822" || UserCode == "50002304" || UserCode == "KAM") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE INV.PRODUCT_TYPE_CODE='SBU2' AND INV.DOC_STATUS!=''";
                }
                else {
                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU2' AND INV.DOC_STATUS!=''";
                }
            }
            else if (UserCode == "50000985") {
                WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' ";
            }
            else if (SessionUserType == "RSH_BU3" || SessionUserType == "NSH_BU3") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE INV.PRODUCT_TYPE_CODE='SBU3' AND INV.DOC_STATUS!='' ";
                }
                else {
                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU3' AND INV.DOC_STATUS!='' ";
                }
                //WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU3' AND INV.DOC_STATUS!='' ";
            }
            else if (UserCode == "2019" || UserCode == "2021" || UserCode == "50001234" || SessionUserType == "QAM_SBU3" || SessionUserType == "CSM_BU3" || SessionUserType == "Plant_MHD" || SessionUserType == "MDO") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE INV.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND INV.DOC_STATUS!='' ";
                }
                else {
                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND INV.DOC_STATUS!='' ";
                }
                //WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU3' AND INV.DOC_STATUS!='' ";
            }
            else if (SessionUserType == "QAM_SBU2" || SessionUserType == "CSM_BU2") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE (INV.PRODUCT_TYPE_CODE='SBU2' or INV.PRODUCT_TYPE_CODE='SBU3') AND INV.DOC_STATUS!='' ";
                }
                else {
                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND (INV.PRODUCT_TYPE_CODE='SBU2' or INV.PRODUCT_TYPE_CODE='SBU3') AND INV.DOC_STATUS!='' ";
                }
            }
            else if (SessionUserType == "QAM_SBU8" || SessionUserType == "CSM_BU8" || SessionUserType == "QH_BU8") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE (INV.PRODUCT_TYPE_CODE='SBU8') AND INV.DOC_STATUS!='' ";
                }
                else {
                    WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND (INV.PRODUCT_TYPE_CODE='SBU8') AND INV.DOC_STATUS!='' ";
                }
            }
            else {
                WhereClause = " WHERE INV.STATE_CODE='" + StateFilter + "' AND INV.PRODUCT_TYPE_CODE='SBU1'";
            }


            var Data = JSON.stringify({
                MasterType: "ComplaintRegistrationList",
                ID: "561",
                UserCode: $("#UserCode").val(),
                "Type": "Get",
                ReportName: "InvestigationList",
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

                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "InvestigationList", UserSelectedColumnName);
                    $('#InvestigationList tbody').on('click', 'tr', function () {
                        var ID = $(this).find('td:eq(1)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {

                        }
                        if (ID != "") {
                            var scope = angular.element($("#InvestigationlistDiv")).scope();
                            scope.$apply(function () {
                                scope.go("Investigation/" + ID);
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
        if (ControllerName != "InvestigationListCtrl") {
            ControllerName = "InvestigationListCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "InvestigationListCtrl");

            $compile(elem.contents())(complaintRegistrationScope);
        }

        $("#ColumnEditingModal").modal('show');




    }
    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing = function () {
        DIMSFactory.ViewColumnEditing("InvestigationList", $("#UserCode").val(), " ORDER BY ID DESC"); // 1-Report Name ,2-UserCode(561),3-WhereClause
    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var StateFilter = $("#StateFilter").val();
        var WhereClause = " WHERE CUST.STOCKIST_ID=INV.Customer_Code AND INV.STATE_CODE='" + StateFilter + "' ORDER BY INV.ID ";
        var Data = JSON.stringify({
            MasterType: "InvestigationList",
            ID: "561",
            UserCode: $("#UserCode").val(),
            "Type": "Get",
            ReportName: "InvestigationList",
            WhereClause: WhereClause
        });
        //DIMSFactory.SaveColumnEditingData("Compensation", $scope.UserCode, " ORDER BY ID DESC");
        DIMSFactory.SaveColumnEditingData_InputParameter("InvestigationList", $("#UserCode").val(), WhereClause, Data, "InvestigationList");
        // 1-Report Name ,2-UserCode(561),3-WhereClause,4-JsonData,5-Frontend datatable id


    }
});
