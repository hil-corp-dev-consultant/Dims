// DEVELOPED BY :SHIVA KIRAN
// ORGANISATION :ENVISION
// CREATED DATE :15-01-2016
// MODIFIED DATE:17-02-2016
// MODIFIED
// Compensation Add page Controller

var IsView;
var IsAdd;
var IsUpdate;
var IsApprove;
DIMS.controller('CompensationCtrl', function ($scope, $location, $http, DIMSFactory, $compile, $routeParams) {
    CompensationScope = $scope;
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


                    var UserType = $("#USERTYPE_Compensation").val();
                    $.ajax({
                        url: '../../Users/GetRightToAccess',
                        type: 'GET',
                        data: { AccessData: JSON.stringify({ UserRole: UserType, FormCode: 'COMP' }) },
                        async: false,
                        success: function (AccessData) {
                            if (AccessData == "") {
                            }
                            else {
                                AccessData = JSON.parse(AccessData);
                                IsView = AccessData[0]["IS_VIEW"];
                                IsAdd = AccessData[0]["IS_ADD"];
                                IsUpdate = AccessData[0]["IS_UPDATE"];
                                IsApprove = AccessData[0]["IS_APPROVE"];
                                // alert("1");
                                var Status = $('#Compensation_Status').val();
                                var MyField = $("#HiddenForCMS").val();
                                if (MyField != "") {
                                    Status = "";
                                }
                                else {
                                    $('#CompMakeApproved').css("display", "none");
                                    $('#AddNewCompensation').css("display", "none");
                                }

                                if (IsAdd == true) {
                                    //alert("1");

                                    if ($("#Compensation_Status").val() == "Approved") {
                                        $('#SaveCompensation').css("display", "none");
                                        $('#SD_Save_SBU2').attr("disabled", true);
                                        $('#SD_Delete_SBU2').attr("disabled", true);
                                    }
                                    else {
                                        $('#SaveCompensation').css("display", "block");
                                    }
                                    $('#AddNewCompensation').css("display", "block");

                                }
                                else {
                                    //$('#SaveCompensation').css("display", "none");
                                    $('#AddNewCompensation').css("display", "none");
                                }

                                if (IsUpdate == true) {
                                    if (Status == "Waiting for approval") {
                                        //$('#SaveCompensation').css("display", "none");
                                    }
                                    else {
                                        //alert("2");

                                        //alert($("#Compensation_Status").val());
                                        if ($("#Compensation_Status").val() == "Approved") {
                                            //$('#SaveCompensation').css("display", "none");
                                        }
                                        else {
                                            $('#SaveCompensation').css("display", "block");
                                        }

                                    }
                                    $('#AddNewCompensation').css("display", "block");
                                    // alert("1 :"+IsUpdate);
                                }
                                else {
                                    //$('#SaveCompensation').css("display", "none");
                                    $('#AddNewCompensation').css("display", "none");
                                }

                                if (IsApprove == true) {
                                    $('#CompMakeApproved').css("dispaly", "block");
                                }
                                else {
                                    $('#CompMakeApproved').css("dispaly", "none");
                                }

                            }
                            if (UserType == "COM_OF_BU2") {
                                $scope.DisableAllElements();
                            }
                        }
                    });

                    //
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });
    $scope.templatesettings = { HeaderTitle: "CompensationCtrl" };
    if ($routeParams.ID == undefined || $routeParams.ID == "") {
        $scope.ID = "";


        $scope.Compensation_Date = TODAY_DATE;
        $scope.SiteDetailed_Code = $("#SITEDETAIL_CODE_Compensation").val();
        $scope.CompanyDetailed_Code = $("#COMPANYDETAIL_CODE_Compensation").val();
        $scope.UserName = $("#USERNAME_Compensation").val();
        $scope.UserCode = $("#USERCODE_Compensation").val();
        $scope.ID = "";
        $scope.AmountCredited = false;
        $scope.COMP_Series_Code = "CMPNZ12";
        $scope.Compensation_Status = "DRAFT";
        $scope.Compl_Status = "Investigation Approved. Compensation under review";
        $("#CompMakeApproved").css("display", "none");

        var CMSState = $("#CMSState").val();
        $("#StateFilter").val(CMSState);
        if (CMSState == "") {
            $("#StateFilter").val(response[0]["STATE_CODE"]);
            $("#CMSState").val(response[0]["STATE_CODE"]);
        }
        else {
            $("#StateFilter").val(CMSState);
        }
    }
    else {
        $scope.ID = $routeParams.ID;

        $("#CompFormIden").val($routeParams.ID);

        var Data = JSON.stringify({
            MasterType: "CompensationDetails",
            ID: $scope.ID
        });
        // Retrieving Data for Editing
        DIMSFactory.getCompensationData(Data).success(function (response) {
            //debugger;
            //var typeofresponse = jQuery.parseJSON(response.tabledata);
            //alert('typeofresponse', typeof typeofresponse)
            var Result = JSON.parse(response.tabledata);
            var MyField = $("#HiddenForCMS").val();
            if (Result != "") {
                ShowLoader();
                var Res = Result["CompensationHeaderData"];
                $scope.Investigation_Num = Res[0]["INVESTIGATION_DOC_NUM"];
                $scope.Investigation_Date = Res[0]["INVESTIGATION_DATE"];
                $scope.Previous_Visit_Date = Res[0]["PREVIOUS_VISIT_DATE"];
                $scope.Site_Visit_Date = Res[0]["SITE_VISIT_DATE"];
                $scope.Complaint_Received_Date = Res[0]["COMPLAINT_RECEIVED_DATE"];;
                $scope.Complaint_Registered_Date = Res[0]["COMPLAINT_REGISTERED_DATE"];;
                $scope.Complaint_No = Res[0]["COMPLAINT_DOC_NUM"];;
                $scope.Complaint_Tracking_No = Res[0]["COMPLAINT_ID"];
                $scope.CREATED_IN = Res[0]["CREATED_IN"];
                $("#CREATED_IN").val(Res[0]["CREATED_IN"]);
                $("#SelectedComplaintFiles").append(Res[0]["Complaint_Attachments"]).trigger('change');
                $("#SelectedInvestigationFiles").append(Res[0]["Investigation_Attachments"]).trigger('change');                
                $scope.Product_Type = Res[0]["PRODUCT_TYPE_NAME"];
                if ($scope.Product_Type != "" && $scope.Product_Type != undefined) {
                    if ($scope.Product_Type == "Sheeting" || $scope.Product_Type == "SBU1") {
                        $("#Breakage_Investigation_Details_Div").show();
                        $("#Breakage_OtherLines_Details_Div").hide();
                        $("#SupplyDetailsDiv_SBU2").hide();
                        $("#CompensationDiv_Sheeting").show();
                        $("#CompensationDiv_Aerocon").hide();
                        $("#SubStockiest_Direct_Customer").show();
                        $("#CompensationSize_Details_Div").hide();
                        $("#CompensationQtyMtrTonsDiv").show();
                    }
                    else {
                        //$("#SubStockiest_Direct_Customer").hide();
                        $("#CompensationDiv_Aerocon").show();
                        $("#CompensationDiv_Sheeting").hide();
                        $("#Breakage_OtherLines_Details_Div").show();
                        if ($scope.Product_Type == "SBU2" || (CompensationScope.Product_Type == "SBU3" && Res[0].PRODUCT_CATEGORY_CODE == "36")) {
                            $("#Breakage_OtherLines_Details_Div").hide();
                            $("#SupplyDetailsDiv_SBU2").show();
                        } else {
                            $("#SupplyDetailsDiv_SBU2").hide();
                        }
                        $("#Breakage_Investigation_Details_Div").hide();
                        $("#CompensationSize_Details_Div").show();
                        $("#CompensationQtyMtrTonsDiv").hide();
                    }
                }

                $scope.Compl_Status = Res[0]["ShowStatus"];

                $scope.ProductType_Code = Res[0]["PRODUCT_TYPE_CODE"];;
                $scope.ProductType_ID = Res[0]["PRODUCT_TYPE_ID"];;
                $scope.Product_Category = Res[0]["PRODUCT_CATEGORY_NAME"];

                SheetingLabels(Res[0]["PRODUCT_CATEGORY_NAME"]);

                if (Res[0]["PRODUCT_CATEGORY_NAME"] == "Blocks") {
                    $("#CompensationinMetricCubic").val("Cubic Meters");
                    //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                    $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(3)").html("Volume");
                    $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(4)").html("Cubic Meters");
                }
                else {
                    $("#CompensationinMetricCubic").val("Metric Tons");
                    //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                }

                $scope.ProductCategory_Code = Res[0]["PRODUCT_CATEGORY_CODE"];
                $scope.ProductCategory_ID = Res[0]["PRODUCT_CATEGORY_ID"];
                $scope.Customer_Name = Res[0]["CUSTOMER_NAME"];
                $scope.Customer_Code = Res[0]["Customer_Code"];
                // $scope.Customer_ID = Res[0]["Customer_id"];
                $scope.Customer_Type = Res[0]["Customer_Type_name"];
                $scope.CustomerType_Code = Res[0]["Customer_Type_code"];
                $scope.CustomerType_ID = Res[0]["Customer_type_id"];
                $scope.Contact_Person = Res[0]["CONTACT_PERSON"];
                $scope.Phone_Number = Res[0]["Phone_Number"];

                if (Res[0]["Project_Party"] == "True" || Res[0]["Project_Party"] == "true") {

                    $scope.Is_Project_Party = true;
                }
                else {
                    $scope.Is_Project_Party = false;
                }
                // $scope.Is_Project_Party = Res[0]["Project_Party"];
                //$scope.Compensation_Status = Res[0]["INVESTIGATION_DOC_NUM"];
                $scope.Complaint_Attendent_Date = Res[0]["COMPLAINT_ATTENDENT_DATE"];
                $scope.Site_Visit_Date = Res[0]["SITE_VISIT_DATE"];
                $scope.Previous_Visit_Date = Res[0]["PREVIOUS_VISIT_DATE"];
                $scope.Investigation_Done_By = Res[0]["INVESTIGATION_DONE_BY"];
                $scope.SalesRepresentativeEmployeeCode = Res[0]["SALES_REPRESENTATIVE_CODE"];
                $scope.SalesRepresentativeEmployeeName = Res[0]["SALES_REPRESENTATIVE_NAME"];
                $scope.Customer_Location = Res[0]["Cusomer_Location"];
                $scope.Contact_City = Res[0]["CITY_NAME"];
                $scope.Contact_State = Res[0]["STATE_NAME"];
                $scope.Contact_Area = Res[0]["AREA_NAME"];
                $scope.Contact_Person = Res[0]["CONTACT_PERSON"];
                $scope.Contact_Number = Res[0]["Phone_Number"];
                $scope.Customer_Fax = Res[0]["Fax"];
                $scope.Customer_Email = Res[0]["Email"];
                $scope.Site_Address = Res[0]["Customer_Address"];
                $scope.StateCode = Res[0]["STATE_CODE"];
                $scope.StateID = Res[0]["STATE_ID"];
                $scope.CityID = Res[0]["CITY_ID"];
                $scope.CityCode = Res[0]["CITY_CODE"];
                $scope.AreaCode = Res[0]["AREA_CODE"];
                $scope.AreaID = Res[0]["AREA_ID"];
                $scope.Date_Supply_TO = Res[0]["Date_Supply_To"];
                $scope.COMP_Series_Code = Res[0]["DOC_SERIES_CODE"];
                $scope.Compensation_Date = Res[0]["DOC_DATE"];
                $scope.Compensation_Status = Res[0]["DOC_STATUS"];

                if (Res[0]["DOC_STATUS"] == "DRAFT") {
                    $('#SendForApproval').css("display", "block");
                    $('#SaveCompensation').css("display", "block");
                }
                else if (Res[0]["DOC_STATUS"] == "Waiting for approval" || Res[0]["DOC_STATUS"] == "Approved" || Res[0]["DOC_STATUS"] == "Rejected") {

                    var RoleingSuperSave = $("#RoleingSuperSave").val();
                    if ((Res[0]["DOC_STATUS"] == "Approved" || Res[0]["DOC_STATUS"] == "Rejected") && (RoleingSuperSave == "QH")) {
                        $("#CompensationList").css('display', 'block');
                        $("#AddNewCompensation").css('display', 'block');
                        $("#CompMakeApproved").css('display', 'none');
                        $("#PendingApprovalsList").css('display', 'none');
                        $("#SuperSaveCompensation").css('display', 'block');
                    }
                    else {
                        var MyField = $("#HiddenForCMS").val();
                        if (MyField == "") {
                            $("#PendingApprovalsList").css('display', 'none');
                            $("#CompensationList").css('display', 'block');
                            $("#SendForApproval").css('display', 'none');
                            $('.input-group-btn').find('.btn').attr('disabled', true);
                            $('.smallbutton').attr("disabled", "disabled");
                        }
                        else {
                            $("#CompensationList").css('display', 'none');
                            $("#AddNewCompensation").css('display', 'none');
                            $("#CompMakeApproved").css('display', 'block');
                            $("#PendingApprovalsList").css('display', 'block');
                            $('#SaveCompensation').css("display", "block");
                            $('.input-group-btn').find('.btn').attr("disabled", false);
                            $('.smallbutton').attr("disabled", false);
                        }
                    }
                }



                $scope.Investigation_Remarks = Res[0]["REMARKS"];
                if (Res[0]["DIGITAL_SIGN"] == "True" || Res[0]["DIGITAL_SIGN"] == "true" || Res[0]["DIGITAL_SIGN"] == 1) {
                    $scope.Digital_Sign = true;
                }
                else {
                    $scope.Digital_Sign = false;
                }
                $scope.Approved_Date = Res[0]["APPROVED_DATE"];
                $scope.Complaint_Description = Res[0]["COMPLAINT_DESC"];
                $scope.SubStockiest_Direct_Customer = Res[0]["END_CUSTOMER_DETAILS"];

                if (Res[0]["INVOICE_BASED"] == "" || Res[0]["INVOICE_BASED"] == null || Res[0]["INVOICE_BASED"] == "False" || Res[0]["INVOICE_BASED"] == "false") {
                    $scope.Invoice_Based = false;
                    $("#InvoiceBasedDiv").hide();
                }
                else {
                    $("#InvoiceBasedDiv").show();
                    $scope.Invoice_Based = true;

                    $(".PeriodBasedClass").css('display', 'none');
                }

                if (Res[0]["PERIOD_BASED"] == "" || Res[0]["PERIOD_BASED"] == null || Res[0]["PERIOD_BASED"] == "False" || Res[0]["PERIOD_BASED"] == "false") {
                    $scope.Period_Based = false;
                }
                else {

                    $(".PeriodBasedClass").css('display', 'block');

                    $scope.Period_Based = true;
                }



                $scope.Date_Supply_From = Res[0]["Date_Supply_From"];
                $scope.Date_Supply_TO = Res[0]["DATE_SUPPLY_TO"];
                //alert(Res[0]["ALL_INVOICE_NO"]);
                $scope.Invoice_Details = Res[0]["ALL_INVOICE_NO"];
                $scope.Product_Details = Res[0]["ALL_INVOICE_DATE"];

                if (Res[0]["SUPPLY_QTY_MTRS"] != "" && Res[0]["SUPPLY_QTY_MTRS"] != null) {
                    $scope.Total_Supply_Qty_Mtrs = Res[0]["SUPPLY_QTY_MTRS"];
                }
                else {
                    $scope.Total_Supply_Qty_Mtrs = 0;
                }



                if (Res[0]["SUPPLY_QTY_TONS"] != "" && Res[0]["SUPPLY_QTY_TONS"] != null) {
                    $scope.Total_Supply_Qty_Tons = Res[0]["SUPPLY_QTY_TONS"];
                }
                else {
                    $scope.Total_Supply_Qty_Tons = 0;
                }

                if (Res[0]["BREAKAGE_QTY_MTRS"] != "" && Res[0]["BREAKAGE_QTY_MTRS"] != null) {
                    $scope.Total_Breakage_Qty_Mtrs = Res[0]["BREAKAGE_QTY_MTRS"];
                }
                else {
                    $scope.Total_Breakage_Qty_Mtrs = 0;
                }

                if (Res[0]["BREAKAGE_QTY_TONS"] != "" && Res[0]["BREAKAGE_QTY_TONS"] != null) {
                    $scope.Total_Breakage_Qty_Tons = Res[0]["BREAKAGE_QTY_TONS"];
                }
                else {
                    $scope.Total_Breakage_Qty_Tons = 0;
                }

                if (Res[0]["RECOVERY_QTY_MTRS"] != "" && Res[0]["RECOVERY_QTY_MTRS"] != null) {
                    $scope.Total_Recovery_Mtrs = Res[0]["RECOVERY_QTY_MTRS"];
                }
                else {
                    $scope.Total_Recovery_Mtrs = 0;
                }

                if (Res[0]["RECOVERY_QTY_TONS"] != "" && Res[0]["RECOVERY_QTY_TONS"] != null) {
                    $scope.Total_Recovery_Tons = Res[0]["RECOVERY_QTY_TONS"];
                }
                else {
                    $scope.Total_Recovery_Tons = 0;
                }

                if (Res[0]["NET_LOSS_QTY_MTRS"] != "" && Res[0]["NET_LOSS_QTY_MTRS"] != null) {
                    $scope.Net_Loss_Mtrs = Res[0]["NET_LOSS_QTY_MTRS"];
                }
                else {
                    $scope.Net_Loss_Mtrs = 0;
                }

                if (Res[0]["NET_LOSS_QTY_TONS"] != "" && Res[0]["NET_LOSS_QTY_TONS"] != null) {
                    $scope.Net_Loss_Tons = Res[0]["NET_LOSS_QTY_TONS"];
                }
                else {
                    $scope.Net_Loss_Tons = 0;
                }

                $scope.Compensation_Mode = Res[0]["COMPENSATION_MODE_NAME"];
                $scope.Compensation_Mode_Code = Res[0]["COMPENSATION_MODE_CODE"];
                $scope.Compensation_Mode_ID = Res[0]["COMPENSATION_MODE_ID"];
                $scope.Any_Special_Remarks = Res[0]["COMMENTS_APPROVALS_SALES_OTHERS"];

                if (Res[0]["COMPENSATION_IN_METERS_SHEET"] != "" && Res[0]["COMPENSATION_IN_METERS_SHEET"] != null)
                    $scope.Compensation_In_Running_Meters = Res[0]["COMPENSATION_IN_METERS_SHEET"];



                $("#Compensation_In_Running_Meter_Words").val(Res[0]["COMPENSATION_IN__METER_WORDS_SHEET"]);

                //

                if (Res[0]["RECOMMENDED_SIZE"] != "" && Res[0]["RECOMMENDED_SIZE"] != null) {
                    $scope.Size_Recommendation_RMTS = Res[0]["RECOMMENDED_SIZE"];

                    var No_Of_36 = parseInt(($scope.Size_Recommendation_RMTS) / (3.6));
                    $("#No_of_36").val(No_Of_36);

                }
                else {
                    $("#No_of_36").val("0");
                    $("#Size_Recommendation_RMTS").val("0");
                }


                if (Res[0]["OTHER_SIZE"] != "" && Res[0]["OTHER_SIZE"] != null)
                    $scope.Other_Size_RMTS = (Res[0]["OTHER_SIZE"]).toFixed(3);

                if (Res[0]["COMPENSATION_IN_TONS"] != "" && Res[0]["COMPENSATION_IN_TONS"] != null)
                    $scope.Compensation_In_Tons = Res[0]["COMPENSATION_IN_TONS"];



                if (Res[0]["COMPENSATION_IN_NO"] != "" && Res[0]["COMPENSATION_IN_NO"] != null)
                    $scope.CompensationInNos = Res[0]["COMPENSATION_IN_NO"];


                $scope.CompensationInNosWords = Res[0]["COMPENSATION_IN_WORD"];

                if (Res[0]["COMPENSATION_IN_CUBIC_METER"] != "" && Res[0]["COMPENSATION_IN_CUBIC_METER"] != null)
                    $scope.CompensationinMetricCubicValue = Res[0]["COMPENSATION_IN_CUBIC_METER"];


                if (Res[0]["ISSUE_CREDIT_NOTE"] == "True" || Res[0]["ISSUE_CREDIT_NOTE"] == "true") {
                    $scope.CompensationIssueCreditNote = true;
                    $scope.IssueCredited();
                }
                else {
                    $scope.CompensationIssueCreditNote = false;
                }

                if (Res[0]["AMOUNT_CREDITED"] != "" && Res[0]["AMOUNT_CREDITED"] != null)
                    $scope.CompensationAmountCredited = Res[0]["AMOUNT_CREDITED"];

                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(Res[0]["CREATED_DATE"]) < new Date('2020-11-19')) {
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
                    $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                    //$("#party_type > [value=0]").attr("selected", "true");
                    $scope.party_type_id = 1;
                    $scope.party_type = "Stockiest";
                } else if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(Res[0]["CREATED_DATE"]) >= new Date('2020-11-19')) {               
                    $("#SubStockiest_Direct_CustomerDiv").hide();
                    $("#PartyTypeDiv").show();
                    $("#Is_Project_PartyDiv").hide();
                    $("#SubStockiest_CodeDiv").hide();
                    $("#Site_AddressDiv").hide();
                    $("#SubStockiest_NameDiv").hide();
                    $("#SubStockiest_AddressDiv").hide();
                    $("#SubStockiest_NumberDiv").hide();
                    $("#party_type_id").val(Res[0]["party_type_id"]);
                    $("#party_type").val(Res[0]["party_type"]);
                    $("#SubStockiest_ID").val(Res[0]["SubStockiest_Code"]);
                    $("#SubStockiest_Code").val(Res[0]["SubStockiest_Code"]);
                    $("#SubStockiest_Name").val(Res[0]["SubStockiest_Name"]);
                    $("#SubStockiest_Address").val(Res[0]["SubStockiest_Address"]);
                    $("#SubStockiest_Number").val(Res[0]["SubStockiest_Number"]);
                    if (Res[0]["party_type"] == "SubDealer" || Res[0]["party_type_id"] == 2 || Res[0]["party_type"] == "Sub-Stockiest") {
                        $("#SubStockiest_CodeDiv").show();
                        $("#SubStockiest_NameDiv").show();
                        $("#SubStockiest_AddressDiv").show();
                        $("#SubStockiest_NumberDiv").show();
                    }
                    //svprasadk 19-11-2020 SBU 1 requirement to party type other start 
                    else if (Res[0]["party_type_id"] == 7) {
                        $("#SubStockiest_CodeDiv").hide();
                        $("#SubStockiest_NameDiv").show();
                        $("#SubStockiest_AddressDiv").show();
                        $("#SubStockiest_NumberDiv").show();
                        $scope.party_type_id = Res[0]["party_type_id"];
                        $scope.party_type = Res[0]["party_type"];
                        $scope.SubStockiest_Code = "";
                        $scope.SubStockiest_ID = "";
                        $scope.SubStockiest_Name = Res[0]["SubStockiest_Name"];
                        $scope.SubStockiest_Address = Res[0]["SubStockiest_Address"];
                        $scope.SubStockiest_Number = Res[0]["SubStockiest_Number"];
                        $("#party_type_id").val(Res[0]["party_type_id"]);
                        $("#party_type").val(Res[0]["party_type"]);
                        $("#SubStockiest_ID").val("");
                        $("#SubStockiest_Code").val("");
                        $("#SubStockiest_Name").val(Res[0]["SubStockiest_Name"]);
                        $("#SubStockiest_Address").val(Res[0]["SubStockiest_Address"]);
                        $("#SubStockiest_Number").val(Res[0]["SubStockiest_Number"]);
                    }
                    //svprasadk 19-11-2020 SBU 1 requirement to party type other end
                    else {
                        if (Res[0]["END_CUSTOMER_DETAILS"] != "" && (Res[0]["party_type"] == "SubDealer" || Res[0]["party_type_id"] == 2 || Res[0]["party_type"] == "Sub-Stockiest")) {
                            //$("#party_type").val("SubDealer");
                            $("#party_type_id").val(Res[0]["party_type_id"]);
                            $("#party_type").val(Res[0]["party_type"]);
                            $("#SubStockiest_CodeDiv").show();
                            $("#SubStockiest_NameDiv").show();
                            $("#SubStockiest_AddressDiv").show();
                            $("#SubStockiest_NumberDiv").show();
                            $("#SubStockiest_ID").val(Res[0]["END_CUSTOMER_DETAILS"]);
                            $("#SubStockiest_Code").val(Res[0]["END_CUSTOMER_DETAILS"]);
                            $("#SubStockiest_Name").val(Res[0]["END_CUSTOMER_DETAILS"]);
                            $("#SubStockiest_Address").val(Res[0]["Customer_Address"]);
                            $("#SubStockiest_Number").val(Res[0]["Phone_Number"]);
                        } else {
                            //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                            $("#party_type_id").val(Res[0]["party_type_id"]);
                            $("#party_type").val(Res[0]["party_type"]);
                            //$scope.party_type_id = HeaderData[0]["party_type_id"];
                            //$scope.party_type = HeaderData[0]["party_type"];
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                            //$("#party_type").val("Dealer");
                            //$("#party_type_id").val(1);
                            //$("#party_type").val("Stockiest");
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
                    $("#SubStockiest_Direct_Customer").val("");
                    $("#Is_Project_Party").prop("checked", false);
                    $("#Site_Address").val("");
                    //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").show();
                    //$("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                    //if (Res[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                    //    $("#TYPE_OF_COMPLAINT > [value=" + Res[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                    //} else {
                    //    $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    //}
                    $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                    //console.log(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                    //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end
                } else if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
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
                    //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //$("#TYPE_OF_COMPLAINT").val(0);
                    //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                    //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end
                } else if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
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
                    $("#party_type_id").val(1);
                    $("#party_type").val("Stockiest");
                    $("#SubStockiest_ID").val("");
                    $("#SubStockiest_Code").val("");
                    $("#SubStockiest_Name").val("");
                    $("#SubStockiest_Address").val("");
                    $("#SubStockiest_Number").val("");
                    //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //$("#TYPE_OF_COMPLAINT").val(0);
                    //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    //$scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                    $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                    //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end
                }
                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                var TRCode = "";
                var MaterialSupplyDetails = [];
                if (Result.hasOwnProperty("MaterialSupplyLinesData")) {
                    MaterialSupplyDetails = Result["MaterialSupplyLinesData"];
                }
                for (var i = 0; i < MaterialSupplyDetails.length; i++) {
                    $("#Material_Supply_Detail_Table tbody").empty();
                    TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' ng-click='EditMSD(obj,$event)'><td>" + (i + 1) + "</td>";
                    TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["PLANT_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["SUPPLY_NAME"] + "</td>";
                    TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["UOM"] + "</td>";
                    if (MaterialSupplyDetails[i]["supply_qty"] == null || MaterialSupplyDetails[i]["supply_qty"] == "null") {
                        TRCode = TRCode + "<td></td>";
                    } else {
                        TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["supply_qty"] + "</td>";
                    }

                    if (MaterialSupplyDetails[i]["breakage_qty"] == null || MaterialSupplyDetails[i]["breakage_qty"] == "null") {
                        TRCode = TRCode + "<td></td>";
                    } else {
                        TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["breakage_qty"] + "</td>";
                    }
                    if (MaterialSupplyDetails[i]["NET_LOSS"] == null || MaterialSupplyDetails[i]["NET_LOSS"] == "null") {
                        TRCode = TRCode + "<td></td>";
                    } else {
                        TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["NET_LOSS"] + "</td>";
                    }

                    TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["PLANT_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["PLANT_ID"] + "</td>";

                    TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_ID"] + "</td>";

                    TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_CODE"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_ID"] + "</td>";
                    TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["LINE_ID"] + "</td>";
                    //TRCode = TRCode + "<td style='display:none;'></td>";
                    TRCode = TRCode + "</tr>";
                }
                
                var html = $compile(TRCode)($scope);
                var el = angular.element($("#Material_Supply_Detail_Table tbody"));
                el.append(html);
                $compile(html)($scope);

                if (CompensationScope.Product_Type == "Sheeting" || CompensationScope.Product_Type == "SBU1") {
                    $("#CompensationDiv_Sheeting").show();
                    $("#CompensationDiv_Aerocon").hide();
                    var BreakageLinesDetails = Result["CompensationBreakageData"];
                    $("#lblSubStockiest_Direct_Customer").text("Sub-Stockiest/ Direct Customer");
                    TRCode = "";
                    $("#Breakage_Investigation_Details_Table tbody").empty();
                    for (var i = 0; i < BreakageLinesDetails.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='BID_" + (i + 1) + "' ng-click='EditBID(obj,$event)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SIZE_MM"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SUPPLIED_QTY_NO"] + "</td>";

                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SUPPLIED_QTY"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["SUPPLIED_QTY_TON"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["BREAKAGE_QTY_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["BREAKAGE_QTY"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["BREAKAGE_QTY_TON"] + "</td>";

                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["BREAKAGE_PERSENT"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["REMARKS"] + "</td>";


                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["PRODUCT_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["DEFECT_TYPE_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["DEFECT_TYPE_CODE"] + "</td>";

                        //TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "</tr>";


                    }
                    var html = $compile(TRCode)($scope);
                    var el = angular.element($("#Breakage_Investigation_Details_Table tbody"));
                    el.append(html);
                    $compile(html)($scope)


                    var CCSheets = Result["CCSheets"];
                    TRCode = "";

                    var Product_Category = Res[0]["PRODUCT_CATEGORY_NAME"];


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

                    $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                    $("#Mat_Sup_Det_BU3_Add").css("display", "none");
                    $("#Breakage_Investigation_Details_SBU3").css("display", "none");
                    $("#CompensationRecommSBU3Div").css("display", "none");
                    $("#Supply_Details_TableB").css("display", "none");
                    $("#Supply_Details_AddB").css("display", "none");


                }
                else if (CompensationScope.Product_Type == "SBU2" || (CompensationScope.Product_Type == "SBU3" && CompensationScope.ProductCategory_Code == "36")) {
                    $("#RecommendedForCCSheetsDivision").css('display', 'none');

                    $("#CompensationDiv_Sheeting").hide();
                    $("#CompensationDiv_Aerocon").show();
                    var BreakageOtherLinesDetails = Result["CompensationBreakageOthersData"];
                    //alert(BreakageOtherLinesDetails);
                    TRCode = "";
                    $("#Breakage_OtherLines_Details_Table tbody").empty();

                    $("#lblSubStockiest_Direct_Customer").text("Sub-Stockiest/ Direct Customer");

                    for (var i = 0; i < BreakageOtherLinesDetails.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='BOTHERID_" + (i + 1) + "' ng-click='EditBOTHERID(obj,$event)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["SUPPLIED_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["TOTAL_BREAKAGE_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["TOTAL_BREAKAGE_PERSENT"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["ALLOWED_BREAKAGE_PERSENT"] + "</td>";

                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["ACTUAL_BREAKAGE_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageOtherLinesDetails[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }

                    var html = $compile(TRCode)($scope);


                    var el = angular.element($("#Breakage_OtherLines_Details_Table tbody"));
                    el.append(html);
                    $compile(html)($scope)

                    //For Displaying item wise Supply Breakage Other Lines
                    var SupplyDetails_SBU2 = Result["Brk_Otr_Lines_SBU2"];
                    TRCode = "";
                    $("#Supply_Details_Table_SBU2 tbody").empty();
                    for (var i = 0; i < SupplyDetails_SBU2.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB_SBU2(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SupplyDetails_SBU2[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["SUPPLIED_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["BREAKAGE_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["BREAKAGE_PERSENT"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["ALLOWED_BREAKAGE_PERSENT"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["ACTUAL_BREAKAGE_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyDetails_SBU2[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyDetails_SBU2[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_Table_SBU2 tbody").append(TRCode);
                    //End Supply Details

                    var CompensationRecommendationDetails = Result["CompensationRecommendationData"];
                    TRCode = "";


                    for (var i = 0; i < CompensationRecommendationDetails.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='COMPSIZE_" + (i + 1) + "' ng-click='EditCompensationSizeLines(obj,$event)'><td>" + (i + 1) + "</td>"
                        TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["RECOMMENDED_SIZE"] + "</td>";
                        TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["NOS"] + "</td>";
                        TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["GROSS_WEIGHT"] + "</td>";
                        TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["TONS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "</tr>";

                    }


                    var html = $compile(TRCode)($scope);
                    var el = angular.element($("#CompensationSizeLines_Details_Table tbody"));

                    el.append(html);
                    $compile(html)($scope);


                    $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                    $("#Mat_Sup_Det_BU3_Add").css("display", "none");
                    $("#Breakage_Investigation_Details_SBU3").css("display", "none");
                    $("#CompensationRecommSBU3Div").css("display", "none");
                    $("#Supply_Details_TableB").css("display", "none");
                    $("#Supply_Details_AddB").css("display", "none");

                }
                else if (CompensationScope.Product_Type == "SBU3") {

                    $("#Material_Supply_Detail_Table").css("display", "none");
                    $("#Mat_Sup_Det_Add").css("display", "none");

                    $("#Breakage_OtherLines_Details_Table").css("display", "none");
                    $("#Supply_Details_Table_SBU2").css("display", "none");
                    $("#BRK_OtherLines_Det_Add").css("display", "none");

                    $("#CompensationSizeLines_Details_Table").css("display", "none");
                    $("#CompensationSize_Add").css("display", "none");

                    $("#Material_Supply_Detail_Table").css("display", "none");
                    $("#Mat_Sup_Det_Add").css("display", "none");

                    $("#lblSubStockiest_Direct_Customer").text("Distributor/ Wholesaler/ Dealer/ Project");

                    $("#CompensationinMetricCubicValueDivision").css("display", "none");

                    $("#CompensationSize_Details_Div").show();
                    $("#CompensationDiv_Sheeting").hide();
                    $("#CompensationDiv_Aerocon").show();
                    $("#CompensationQtyMtrTonsDiv").hide();



                    TRCode = "";
                    var MSFBU3Lines = Result["MSFBU3Lines"];
                    $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                    for (var i = 0; i < MSFBU3Lines.length; i++) {


                        TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";

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


                    TRCode = "";
                    var SupplyDetailsB = Result["Brk_Otr_Lines"];
var totalvalue=0;
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
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["ActualDefectQty"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["REMARKS"] + "</td>";
//VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
 TRCode = TRCode + "<td>" + SupplyDetailsB[i]["RATE_PER_UNIT"] * SupplyDetailsB[i]["ActualDefectQty"]  + "</td>";

                        TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsB[i]["DEFECT_TYPE_CODE"] + "</td>";

                        TRCode = TRCode + "</tr>";
//VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

 totalvalue +=  SupplyDetailsB[i]["RATE_PER_UNIT"] * SupplyDetailsB[i]["ActualDefectQty"];
console.log("Total value : " + totalvalue);
 //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.
                    }
//VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
$("#total_prod_value").val(totalvalue);
console.log(totalvalue);
 //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.
                    $("#Supply_Details_TableB tbody").append(TRCode);


                    TRCode = "";
                    var RCommLines = Result["RCommLines"];
                    $("#CompensationRecommSBU3 tbody").empty();
                    for (var i = 0; i < RCommLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='BU3Rec_" + (i + 1) + "' onclick='EditBU3Rec(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + RCommLines[i]["ProdCode"] + "</td>";
                        TRCode = TRCode + "<td>" + RCommLines[i]["ProdName"] + "</td>";
                        TRCode = TRCode + "<td>" + RCommLines[i]["Nos"] + "</td>";

                        TRCode = TRCode + "</tr>";
                    }
                    $("#CompensationRecommSBU3 tbody").append(TRCode);


                }

                $("#StateFilter").val(Res[0]["STATE_CODE"]);
                $("#CMSState").val(Res[0]["STATE_CODE"]);

                var MyField = $("#HiddenForCMS").val();
                if (MyField != "") {
                    //alert("6");
                    $('#SaveCompensation').css("display", "block");
                    $("#CompMakeApproved").css('display', 'block');
                    $("#PendingApprovalsList").css('display', 'block');
                }

                MakeTotalsForSheetingTable();

                //MakeTotalsForSizeLines();


                $scope.Compensation_Id = $scope.ID;
                if (Res[0]["ShowStatus"] == "Compensation Under Review") {
                    $("#SendForApproval").css('display', 'none');
                }

                HideLoader();

            }
            else {
                alert("No Data")
            }
            var MyField = $("#HiddenForCMS").val();

            if (MyField == "") {
            }
            else {
                $("#CompMakeApproved").css('display', 'block');
                $("#PendingApprovalsList").css('display', 'block');
                $('#SaveCompensation').css("display", "block");
                $('.input-group-btn').find('.btn').attr("disabled", false);
                $('.smallbutton').attr("disabled", false);
                $("#AddNewCompensation").css('display', 'none');
                $("#CompensationList").css('display', 'none');
                $("#SendForApproval").css('display', 'none');
            }

            var OriginalStatus = $("#Compensation_Status").val();
            if (Res[0]["DOC_STATUS"] == "Approved") {
                $("#SaveCompensation").css('display', 'none');
            }

            var UserType = $("#USERTYPE_Compensation").val();
            if (UserType == "COM_OF_BU2") {
                $scope.DisableAllElements();
            }

        });
    }

    // Page redirection
    $scope.go = function (path) {

        $location.path(path);
    };


    // All Look Up functionality based on MasterType
    $scope.Getdata = function (Methodname, MasterType, Heading) {

        var SITEDETAIL_CODE = $scope.SiteDetailed_Code;
        var COMPANYDETAIL_CODE = $scope.CompanyDetailed_Code;
        var UserType = $("#USERTYPE_Compensation").val();
        var PrdCategoryCode = "";
        var PrdTypeCode = "";
        var StateFilter = $("#StateFilter").val();
        if (MasterType == "CompensationInvestigationMaster") {
            SITEDETAIL_CODE = SITEDETAIL_CODE;
        }
        var Data = JSON.stringify({
            MasterType: MasterType,
            SITEDETAIL_CODE: SITEDETAIL_CODE,
            COMPANYDETAIL_CODE: COMPANYDETAIL_CODE,
            ID: "",
            DocumentCode: "CMP",
            State: StateFilter
        });

        if (MasterType == "MSD_Name") {
            var Product_Supplied_From = $scope.Product_Supplied_From;

            if (Product_Supplied_From == "") {
                alert("Select Product Supplied Form");
                return;
            }
            if (Product_Supplied_From == "Sub Stockist") {
                return;
            }
            if (Product_Supplied_From == "STOCKIST") {
                Heading = "Stockiest List";
                Data = JSON.stringify({
                    ID: "",
                    //MasterType: "StockiestList",
                    MasterType: "StockistMaster",
                    SITEDETAIL_CODE: SITEDETAIL_CODE,
                    COMPANYDETAIL_CODE: COMPANYDETAIL_CODE,
                    StateFilter: $("#StateFilter").val()
                });
            }
            if (Product_Supplied_From == "Plant") {
                Heading = "Plant List";
                var BusinessUnit = $("#Product_Type").val();
                Data = JSON.stringify({
                    ID: "",
                    MasterType: "GetPlantMaster",
                    BusinessUnit: $("#Product_Type").val()
                });
            }
            if (Product_Supplied_From == "Depot") {
                Heading = "Depot List";
                Data = JSON.stringify({
                    ID: "",
                    MasterType: "DepoMaster",
                    BusinessUnit: $("#Product_Type").val()
                });
            }
        }

        else if (MasterType == "MSD_NameBU3") {

            if ($("#Product_Type").val() == "SBU3") {
            }
            else {
                return;
            }
            var Product_Supplied_From = $("#BU3Product_Supplied_From_Name").val();

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
                var Product_Type = $("#Product_Type").val();

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

                Data = JSON.stringify({
                    MasterType: "StockistMaster",
                    StateFilter: $("#StateFilter").val(),
                    Product_Type: Product_Type
                });
            }
            if (Product_Supplied_From == "Plant") {
                Heading = "Plant List";
                var BusinessUnit = $("#Product_Type").val();
                Data = JSON.stringify({
                    MasterType: "GetPlantMaster",
                    BusinessUnit: BusinessUnit
                });
            }
            if (Product_Supplied_From == "Depot") {
                Heading = "Depot List";
                var BusinessUnit = $("#Product_Type").val();
                Data = JSON.stringify({
                    MasterType: "DepoMaster",
                    BusinessUnit: BusinessUnit
                });
            }

            if (Product_Supplied_From == "Distributor" || Product_Supplied_From == "Wholesaler" || Product_Supplied_From == "Dealer") {

                Heading = Product_Supplied_From + " List";

                var StateFilter = $("#StateFilter").val();
                var Product_Type = $("#Product_Type").val();

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

                Data = JSON.stringify({
                    MasterType: "StockistMasterBU3MSD",
                    StateFilter: $("#StateFilter").val(),
                    Product_Type: Product_Type,
                    Product_Supplied_From: Product_Supplied_From
                });
            }



        }

        else if (MasterType == "ProductMaster") {
            if ($scope.Investigation_Num == "" || $scope.Investigation_Num == undefined) {
                alert("Select Investigation Number ");
                return;
            }
            else {
                Data = JSON.stringify({
                    "MasterType": "GetProductMaster",
                    "Product_Category_CODE": $scope.ProductCategory_Code,
                    "Product_Type_CODE": $("#Product_Type").val(),
                    "Product_Type": $("#Product_Type").val()
                });
            }
        }
        else if (MasterType == "DefectTypeMaster") {

            if ($scope.ProductCategory_Code == "" || $scope.ProductCategory_Code == null) {
                PrdCategoryCode = "";
            } else {
                PrdCategoryCode = $scope.ProductCategory_Code;
            }
            if ($scope.ProductType_Code == "" || $scope.ProductType_Code == null) {
                PrdTypeCode = "";
            } else {
                PrdTypeCode = $scope.ProductType_Code;
            }
            Data = JSON.stringify({
                ID: $scope.Investigation_Num,
                MasterType: MasterType,
                SITEDETAIL_CODE: SITEDETAIL_CODE,
                COMPANYDETAIL_CODE: COMPANYDETAIL_CODE,
                ProductCategoryCode: PrdCategoryCode,
                ProductTypeCode: PrdTypeCode
            });
        }
        else if (MasterType == "GetProductMaster_Compensation") {
            if ($scope.Investigation_Num == "" || $scope.Investigation_Num == undefined) {
                alert("Select Investigation Number ");
                return;
            }
            if ($scope.ProductCategory_Code == "" || $scope.ProductCategory_Code == null) {
                PrdCategoryCode = "";
            }
            else {
                PrdCategoryCode = $scope.ProductCategory_Code;
            }
            if ($scope.ProductType_Code == "" || $scope.ProductType_Code == null) {
                PrdTypeCode = "";
            }
            else {
                PrdTypeCode = $scope.ProductType_Code;
            }
            Data = JSON.stringify({
                ID: $scope.Investigation_Num,
                MasterType: MasterType,
                // SITEDETAIL_CODE: SITEDETAIL_CODE,
                //  COMPANYDETAIL_CODE: COMPANYDETAIL_CODE,
                ProductCategoryCode: PrdCategoryCode,
                ProductTypeCode: PrdTypeCode
            });
        }
        else if (MasterType == "GetProductMaster_Compensation_SBU2") {
            if ($scope.Investigation_Num == "" || $scope.Investigation_Num == undefined) {
                alert("Select Investigation Number ");
                return;
            }
            if ($scope.ProductCategory_Code == "" || $scope.ProductCategory_Code == null) {
                PrdCategoryCode = "";
            }
            else {
                PrdCategoryCode = $scope.ProductCategory_Code;
            }
            if ($scope.ProductType_Code == "" || $scope.ProductType_Code == null) {
                PrdTypeCode = "";
            }
            else {
                PrdTypeCode = $scope.ProductType_Code;
            }
            Data = JSON.stringify({
                ID: $scope.Investigation_Num,
                MasterType: MasterType,
                ProductCategoryCode: PrdCategoryCode,
                ProductTypeCode: PrdTypeCode,
                Product_Type: $("#Product_Type").val()

            });
        }
        else if (MasterType == "GetRecommendedSizeCompensationCCSheets") {
            Data = JSON.stringify({
                MasterType: "GetProductMaster",
                Product_Category_CODE: "14",
                Product_Type: $("#Product_Type").val(),
                InvoiceNoBU3: ""
            });
        }
        else if (MasterType == "GetPlantMaster") {
            Heading = "Plant List";
            var BusinessUnit = $("#Product_Type").val();
            //alert(BusinessUnit);
            Data = JSON.stringify({
                ID: "",
                MasterType: "GetPlantMaster",
                BusinessUnit: BusinessUnit,
                SITEDETAIL_CODE: SITEDETAIL_CODE,
                COMPANYDETAIL_CODE: COMPANYDETAIL_CODE
            });
        }
        else if (MasterType == "CompensationInvestigationMaster") { 
            if (UserType == "COM_OF_BU2") {
                return;
            }
            if ($("#Complaint_Tracking_No").val() == "") {

            }
            else {
                alert("Select a new one. This Compensation already reserved for Tracking No: " + $("#Complaint_Tracking_No").val());
                return;
            }

            var USERCODE = $("#USERCODE_Compensation").val();

            var Data = JSON.stringify({
                MasterType: MasterType,
                SITEDETAIL_CODE: SITEDETAIL_CODE,
                COMPANYDETAIL_CODE: COMPANYDETAIL_CODE,
                ID: "",
                DocumentCode: "CMP",
                USERCODE: $("#USERCODE_Compensation").val(),
                State: StateFilter
            });

        }
        else if (MasterType == "Product_Supplied_From") {
            var BusinessUnit = $("#Product_Type").val();

            Data = JSON.stringify({
                MasterType: "Product_Supplied_From",
                BusinessUnit: BusinessUnit
            });

        }
        else if (MasterType == "Product_Supplied_FromComp") {
            var BusinessUnit = $("#Product_Type").val();

            Data = JSON.stringify({
                MasterType: "Product_Supplied_From",
                BusinessUnit: BusinessUnit
            });

        }
        else if (MasterType == "GetProductMasterBU3") {

            if ($scope.ProductCategory_Code == "" || $scope.ProductCategory_Code == null || $("#Product_Type").val() == "") {
                return;
            }
            else {
                Data = JSON.stringify({
                    MasterType: "GetProductMaster",
                    Product_Category_CODE: $scope.ProductCategory_Code,
                    Product_Type_CODE: $("#Product_Type").val(),
                    Product_Type: $("#Product_Type").val(),
                    InvoiceNoBU3: $("#InvoiceNoB").val(),
                    Customer_Code: $("#Customer_Code").val()
                });
            }
        }
        else if (MasterType == "GetProductMasterSBU3") {

            if ($scope.ProductCategory_Code == "" || $scope.ProductCategory_Code == null || $("#Product_Type").val() == "") {
                return;
            }
            else {
                Data = JSON.stringify({
                    MasterType: "GetProductMaster",
                    Product_Category_CODE: $scope.ProductCategory_Code,
                    Product_Type_CODE: $("#Product_Type").val(),
                    Product_Type: $("#Product_Type").val(),
                    InvoiceNoBU3: $("#InvoiceNoB").val(),
                    Customer_Code: $("#Customer_Code").val()
                });
            }
        }

        else if (MasterType == "GetDefectTypeMasterCompBSBU3") {
            if ($("#Product_Type").val() == "" || $scope.ProductCategory_Code == "") {
                alert("Product Type cannot be empty");
                return;
            }
            else {
                Data = JSON.stringify({
                    MasterType: "GetDefectTypeMaster",
                    ProductCategoryCode: $scope.ProductCategory_Code,
                    ProductTypeCode: $("#Product_Type").val(),
                    COMPLAINT_CATEGORY_CODE: $("#CompCategory").val(),
                    Product_Type: $("#Product_Type").val()
                });
            }
        }

        else if (MasterType == "Compensation_Mode_Mast") {
            if (UserType == "COM_OF_BU2") {
                return;
            }
            Data = JSON.stringify({
                MasterType: "Compensation_Mode_Mast",
                Product_Type: $("#Product_Type").val()
            });

        }


        else {
            if (UserType == "COM_OF_BU2") {
                return;
            }
        }
        DIMSFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
            if (MasterType == "GetProductMaster_Compensation") {

            }
        });

    }

     // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.START*@
    $scope.SaveSDDataB =function() {
        try {
            var SD_idB = $("#SD_idB").val();
            var SD_Item_Type_Product_NameB = $("#SD_Item_Type_Product_NameB").val();
            var SD_Item_Type_Product_Name_IDB = $("#SD_Item_Type_Product_Name_IDB").val();
            var SD_Item_Type_Product_Name_CODEB = $("#SD_Item_Type_Product_Name_CODEB").val();
            var InvoiceNoB = $("#InvoiceNoB").val();
            var InvoiceDateB = $("#InvoiceDateB").val();
            var BatchNoB = $("#BatchNoB").val();
            var SuppliedQtyNosB = $("#SuppliedQtyNosB").val();
            var BreakageQtyNosB = $("#BreakageQtyNosB").val();
            var ActualBreakageQtyNosB = $("#ActualBreakageQtyNosB").val();
            var TransporterB = $("#TransporterB").val();
            var Defect_TypeB = $("#Defect_TypeB").val();
            var Defect_Type_IDB = $("#Defect_Type_IDB").val();
            var Defect_Type_CODEB = $("#Defect_Type_CODEB").val();
            var RemarksB = $("#RemarksB").val();
            //VIKAS G, 9-3-2022
            var BasicAmountB = $("#BasicAmountB").val();
            var AttachmentsB = $("#AttachmentsB").val();

            var Flag = 0;

            if (SD_Item_Type_Product_Name_CODEB == "") {
                Flag = Flag + 1;
                $("#SD_Item_Type_Product_Name_CODEB").css("border-color", "red");
            }
            else {
                $("#SD_Item_Type_Product_Name_CODEB").css("border-color", "#d2d6de");
            }

            if (SuppliedQtyNosB == "") {
                Flag = Flag + 1;
                $("#SuppliedQtyNosB").css("border-color", "red");
            }
            else {
                $("#SuppliedQtyNosB").css("border-color", "#d2d6de");
            }

            if (BreakageQtyNosB == "") {
                Flag = Flag + 1;
                $("#BreakageQtyNosB").css("border-color", "red");
            }
            else {
                $("#BreakageQtyNosB").css("border-color", "#d2d6de");
            }

            if (ActualBreakageQtyNosB == "") {
                Flag = Flag + 1;
                $("#ActualBreakageQtyNosB").css("border-color", "red");
            }
            else {
                $("#ActualBreakageQtyNosB").css("border-color", "#d2d6de");
            }



            if (Defect_TypeB == "") {
                Flag = Flag + 1;
                $("#Defect_TypeB").css("border-color", "red");
            }
            else {
                $("#Defect_TypeB").css("border-color", "#d2d6de");
            }


            if (InvoiceNoB == "") {
                Flag = Flag + 1;
                $("#InvoiceNoB").css("border-color", "red");
            }
            else {
                $("#InvoiceNoB").css("border-color", "#d2d6de");
            }

            if (InvoiceDateB == "") {
                Flag = Flag + 1;
                $("#InvoiceDateB").css("border-color", "red");
            }
            else {
                $("#InvoiceDateB").css("border-color", "#d2d6de");
            }




            if (Flag > 0) {
                return;
            }
            else {
                if (InvoiceNoB == "") {
                }
                else if (InvoiceNoB.length == 10) {
                }
                else {
                    alert("Invalid Invoice Number");
                    return
                }

                SuppliedQtyNosB = parseInt(SuppliedQtyNosB);
                BreakageQtyNosB = parseInt(BreakageQtyNosB);
                ActualBreakageQtyNosB = parseInt(ActualBreakageQtyNosB);
                BasicAmountB = parseInt(BasicAmountB);
                if (parseInt(BreakageQtyNosB) > parseInt(SuppliedQtyNosB)) {
                    alert("Defect Quantity Cannot be morethan Supplied Quantity");
                    return;
                }

                if (parseInt(ActualBreakageQtyNosB) > parseInt(SuppliedQtyNosB)) {
                    alert("Acutal Defect Quantity Cannot be morethan Supplied Quantity");
                    return;
                }

                var TRCode = "";

                TRCode = TRCode + "<td>" + SD_Item_Type_Product_Name_CODEB + "</td>";
                TRCode = TRCode + "<td>" + SD_Item_Type_Product_NameB + "</td>";
                TRCode = TRCode + "<td>" + InvoiceNoB + "</td>";
                TRCode = TRCode + "<td>" + InvoiceDateB + "</td>";
                TRCode = TRCode + "<td>" + BatchNoB + "</td>";
                TRCode = TRCode + "<td>" + SuppliedQtyNosB + "</td>";

                TRCode = TRCode + "<td>" + BreakageQtyNosB + "</td>";
                TRCode = TRCode + "<td>" + ActualBreakageQtyNosB + "</td>";

                TRCode = TRCode + "<td>" + TransporterB + "</td>";
                TRCode = TRCode + "<td>" + Defect_TypeB + "</td>";
                TRCode = TRCode + "<td>" + RemarksB + "</td>";
                //VIKAS G, 9-3-2022
                //TRCode = TRCode + "<td>" + BasicAmountB + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Defect_Type_CODEB + "</td>";

                if (SD_idB == "") {
                    SD_idB = $("#Supply_Details_TableB tbody tr").length + 1;

                    TRCode = "<tr class='MousePointer' id='SDB_" + SD_idB + "' onclick='EditSDB(this.id)'><td>" + SD_idB + "</td>" + TRCode + "</tr>";
                    $("#Supply_Details_TableB tbody").append(TRCode);
                }
                else {
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[0].innerHTML = SD_idB;

                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[1].innerHTML = SD_Item_Type_Product_Name_CODEB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[2].innerHTML = SD_Item_Type_Product_NameB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[3].innerHTML = InvoiceNoB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[4].innerHTML = InvoiceDateB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[5].innerHTML = BatchNoB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[6].innerHTML = SuppliedQtyNosB;

                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[7].innerHTML = BreakageQtyNosB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[8].innerHTML = ActualBreakageQtyNosB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[9].innerHTML = TransporterB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[10].innerHTML = Defect_TypeB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[11].innerHTML = RemarksB;
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                    //$("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[12].innerHTML = BasicAmountB;
                    $("#Supply_Details_TableB tbody #SDB_" + SD_idB + " td")[12].innerHTML = Defect_Type_CODEB;
                }


                $("#SD_idB").val("");
                $("#SD_Item_Type_Product_NameB").val("");
                $("#SD_Item_Type_Product_Name_IDB").val("");
                $("#SD_Item_Type_Product_Name_CODEB").val("");
                $("#InvoiceNoB").val("");
                $("#InvoiceDateB").val("");
                $("#BatchNoB").val("");
                $("#SuppliedQtyNosB").val("");
                $("#BreakageQtyNosB").val("");
                $("#ActualBreakageQtyNosB").val();
                $("#TransporterB").val("");
                $("#Defect_TypeB").val("");
                $("#Defect_Type_IDB").val("");
                $("#Defect_Type_CODEB").val("");
                $("#RemarksB").val("");
                //VIKAS G, 9-3-2022
                $("#BasicAmountB").val("");

                SaveCompensationLinesSBU3();
                $("#SupplyDetailModalB").modal("hide");

            }
        }
        catch (e) {
            alert("Error : SaveSDDataB :" + e);
        }
    }
     // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.START*@


     // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.START*@
    function SaveCompensationLinesSBU3() {
        try {

            //var Compensation_Id = $("#Compensation_Id").val();

            var Compensation_Id = $("#CompFormIden").val();

            if (Compensation_Id == "" || Compensation_Id == "0" || Compensation_Id == 0 || Compensation_Id == null) {
                return;
            }
            else {
                var MSD_BU3 = new Array();
                var SupplyDetails = new Array();
                var RecLine = new Array();

                if ($("#Material_Supply_Detail_Table_BU3 tbody tr").length > 0) {
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
                else {
                    MSD_BU3 = "";
                }

                if ($("#Supply_Details_TableB tbody tr").length > 0) {
                    $("#Supply_Details_TableB tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupplyDetails.push({
                            SlNo: $("#Supply_Details_TableB tbody #" + RowId + " td")[0].innerHTML,
                            ProdCode: $("#Supply_Details_TableB tbody #" + RowId + " td")[1].innerHTML,
                            InvoiceNo: $("#Supply_Details_TableB tbody #" + RowId + " td")[3].innerHTML,

                            InvoiceDate: $("#Supply_Details_TableB tbody #" + RowId + " td")[4].innerHTML,
                            BatchNo: $("#Supply_Details_TableB tbody #" + RowId + " td")[5].innerHTML,
                            SupplyQty: $("#Supply_Details_TableB tbody #" + RowId + " td")[6].innerHTML,

                            DefectQty: $("#Supply_Details_TableB tbody #" + RowId + " td")[7].innerHTML,
                            ActDefectQty: $("#Supply_Details_TableB tbody #" + RowId + " td")[8].innerHTML,
                            Transporter: $("#Supply_Details_TableB tbody #" + RowId + " td")[9].innerHTML,
                            Remarks: $("#Supply_Details_TableB tbody #" + RowId + " td")[11].innerHTML,
                            //VIKAS G, 9-3-2022
                            //BasicAmountB: $("#Supply_Details_TableB tbody #" + RowId + " td")[12].innerHTML,

                            DefectType: $("#Supply_Details_TableB tbody #" + RowId + " td")[12].innerHTML

                        });
                    });
                }
                else {
                    SupplyDetails = "";
                }




                if ($("#CompensationRecommSBU3 tbody tr").length > 0) {
                    $("#CompensationRecommSBU3 tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        RecLine.push({
                            SlNo: $("#CompensationRecommSBU3 tbody #" + RowId + " td")[0].innerHTML,
                            ProdCode: $("#CompensationRecommSBU3 tbody #" + RowId + " td")[1].innerHTML,
                            ProdName: $("#CompensationRecommSBU3 tbody #" + RowId + " td")[2].innerHTML,
                            Nos: $("#CompensationRecommSBU3 tbody #" + RowId + " td")[3].innerHTML
                        });
                    });
                }
                else {
                    RecLine = "";
                }





                var IPData = JSON.stringify({
                    Compensation_Id: Compensation_Id,
                    MSD_BU3: MSD_BU3,
                    SupplyDetails: SupplyDetails,
                    RecLine: RecLine
                });
                ShowLoader();
                //debugger
                $.ajax({
                    method: 'POST',
                    url: '../../ComplaintRegistration/SaveCompensationLinesSBU3',
                    async: false,
                    data: { IPData: IPData },
                }).then(function successCallback(response) {

                    HideLoader();
                    var Data = JSON.stringify({
                        MasterType: "CompensationDetails",
                        ID: $scope.ID
                    });
                    DIMSFactory.getCompensationData(Data).success(function (response) {
                        //debugger;
                        //var typeofresponse = jQuery.parseJSON(response.tabledata);
                        //alert('typeofresponse', typeof typeofresponse)
                        var Result = JSON.parse(response.tabledata);
                        var MyField = $("#HiddenForCMS").val();
                        if (Result != "") {
                            ShowLoader();
                            var Res = Result["CompensationHeaderData"];
                            $scope.Investigation_Num = Res[0]["INVESTIGATION_DOC_NUM"];
                            $scope.Investigation_Date = Res[0]["INVESTIGATION_DATE"];
                            $scope.Previous_Visit_Date = Res[0]["PREVIOUS_VISIT_DATE"];
                            $scope.Site_Visit_Date = Res[0]["SITE_VISIT_DATE"];
                            $scope.Complaint_Received_Date = Res[0]["COMPLAINT_RECEIVED_DATE"];;
                            $scope.Complaint_Registered_Date = Res[0]["COMPLAINT_REGISTERED_DATE"];;
                            $scope.Complaint_No = Res[0]["COMPLAINT_DOC_NUM"];;
                            $scope.Complaint_Tracking_No = Res[0]["COMPLAINT_ID"];
                            $scope.CREATED_IN = Res[0]["CREATED_IN"];
                            $("#CREATED_IN").val(Res[0]["CREATED_IN"]);
                            $("#SelectedComplaintFiles").append(Res[0]["Complaint_Attachments"]).trigger('change');
                            $("#SelectedInvestigationFiles").append(Res[0]["Investigation_Attachments"]).trigger('change');
                            $scope.Product_Type = Res[0]["PRODUCT_TYPE_NAME"];
                            if ($scope.Product_Type != "" && $scope.Product_Type != undefined) {
                                if ($scope.Product_Type == "Sheeting" || $scope.Product_Type == "SBU1") {
                                    $("#Breakage_Investigation_Details_Div").show();
                                    $("#Breakage_OtherLines_Details_Div").hide();
                                    $("#SupplyDetailsDiv_SBU2").hide();
                                    $("#CompensationDiv_Sheeting").show();
                                    $("#CompensationDiv_Aerocon").hide();
                                    $("#SubStockiest_Direct_Customer").show();
                                    $("#CompensationSize_Details_Div").hide();
                                    $("#CompensationQtyMtrTonsDiv").show();
                                }
                                else {
                                    //$("#SubStockiest_Direct_Customer").hide();
                                    $("#CompensationDiv_Aerocon").show();
                                    $("#CompensationDiv_Sheeting").hide();
                                    $("#Breakage_OtherLines_Details_Div").show();
                                    if ($scope.Product_Type == "SBU2" || (CompensationScope.Product_Type == "SBU3" && Res[0].PRODUCT_CATEGORY_CODE == "36")) {
                                        $("#Breakage_OtherLines_Details_Div").hide();
                                        $("#SupplyDetailsDiv_SBU2").show();
                                    } else {
                                        $("#SupplyDetailsDiv_SBU2").hide();
                                    }
                                    $("#Breakage_Investigation_Details_Div").hide();
                                    $("#CompensationSize_Details_Div").show();
                                    $("#CompensationQtyMtrTonsDiv").hide();
                                }
                            }

                            $scope.Compl_Status = Res[0]["ShowStatus"];

                            $scope.ProductType_Code = Res[0]["PRODUCT_TYPE_CODE"];;
                            $scope.ProductType_ID = Res[0]["PRODUCT_TYPE_ID"];;
                            $scope.Product_Category = Res[0]["PRODUCT_CATEGORY_NAME"];

                            SheetingLabels(Res[0]["PRODUCT_CATEGORY_NAME"]);

                            if (Res[0]["PRODUCT_CATEGORY_NAME"] == "Blocks") {
                                $("#CompensationinMetricCubic").val("Cubic Meters");
                                //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                                $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(3)").html("Volume");
                                $("#CompensationSizeLines_Details_Table thead tr").find("th:eq(4)").html("Cubic Meters");
                            }
                            else {
                                $("#CompensationinMetricCubic").val("Metric Tons");
                                //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                            }

                            $scope.ProductCategory_Code = Res[0]["PRODUCT_CATEGORY_CODE"];
                            $scope.ProductCategory_ID = Res[0]["PRODUCT_CATEGORY_ID"];
                            $scope.Customer_Name = Res[0]["CUSTOMER_NAME"];
                            $scope.Customer_Code = Res[0]["Customer_Code"];
                            // $scope.Customer_ID = Res[0]["Customer_id"];
                            $scope.Customer_Type = Res[0]["Customer_Type_name"];
                            $scope.CustomerType_Code = Res[0]["Customer_Type_code"];
                            $scope.CustomerType_ID = Res[0]["Customer_type_id"];
                            $scope.Contact_Person = Res[0]["CONTACT_PERSON"];
                            $scope.Phone_Number = Res[0]["Phone_Number"];

                            if (Res[0]["Project_Party"] == "True" || Res[0]["Project_Party"] == "true") {

                                $scope.Is_Project_Party = true;
                            }
                            else {
                                $scope.Is_Project_Party = false;
                            }
                            // $scope.Is_Project_Party = Res[0]["Project_Party"];
                            //$scope.Compensation_Status = Res[0]["INVESTIGATION_DOC_NUM"];
                            $scope.Complaint_Attendent_Date = Res[0]["COMPLAINT_ATTENDENT_DATE"];
                            $scope.Site_Visit_Date = Res[0]["SITE_VISIT_DATE"];
                            $scope.Previous_Visit_Date = Res[0]["PREVIOUS_VISIT_DATE"];
                            $scope.Investigation_Done_By = Res[0]["INVESTIGATION_DONE_BY"];
                            $scope.SalesRepresentativeEmployeeCode = Res[0]["SALES_REPRESENTATIVE_CODE"];
                            $scope.SalesRepresentativeEmployeeName = Res[0]["SALES_REPRESENTATIVE_NAME"];
                            $scope.Customer_Location = Res[0]["Cusomer_Location"];
                            $scope.Contact_City = Res[0]["CITY_NAME"];
                            $scope.Contact_State = Res[0]["STATE_NAME"];
                            $scope.Contact_Area = Res[0]["AREA_NAME"];
                            $scope.Contact_Person = Res[0]["CONTACT_PERSON"];
                            $scope.Contact_Number = Res[0]["Phone_Number"];
                            $scope.Customer_Fax = Res[0]["Fax"];
                            $scope.Customer_Email = Res[0]["Email"];
                            $scope.Site_Address = Res[0]["Customer_Address"];
                            $scope.StateCode = Res[0]["STATE_CODE"];
                            $scope.StateID = Res[0]["STATE_ID"];
                            $scope.CityID = Res[0]["CITY_ID"];
                            $scope.CityCode = Res[0]["CITY_CODE"];
                            $scope.AreaCode = Res[0]["AREA_CODE"];
                            $scope.AreaID = Res[0]["AREA_ID"];
                            $scope.Date_Supply_TO = Res[0]["Date_Supply_To"];
                            $scope.COMP_Series_Code = Res[0]["DOC_SERIES_CODE"];
                            $scope.Compensation_Date = Res[0]["DOC_DATE"];
                            $scope.Compensation_Status = Res[0]["DOC_STATUS"];

                            if (Res[0]["DOC_STATUS"] == "DRAFT") {
                                $('#SendForApproval').css("display", "block");
                                $('#SaveCompensation').css("display", "block");
                            }
                            else if (Res[0]["DOC_STATUS"] == "Waiting for approval" || Res[0]["DOC_STATUS"] == "Approved" || Res[0]["DOC_STATUS"] == "Rejected") {

                                var RoleingSuperSave = $("#RoleingSuperSave").val();
                                if ((Res[0]["DOC_STATUS"] == "Approved" || Res[0]["DOC_STATUS"] == "Rejected") && (RoleingSuperSave == "QH")) {
                                    $("#CompensationList").css('display', 'block');
                                    $("#AddNewCompensation").css('display', 'block');
                                    $("#CompMakeApproved").css('display', 'none');
                                    $("#PendingApprovalsList").css('display', 'none');
                                    $("#SuperSaveCompensation").css('display', 'block');
                                }
                                else {
                                    var MyField = $("#HiddenForCMS").val();
                                    if (MyField == "") {
                                        $("#PendingApprovalsList").css('display', 'none');
                                        $("#CompensationList").css('display', 'block');
                                        $("#SendForApproval").css('display', 'none');
                                        $('.input-group-btn').find('.btn').attr('disabled', true);
                                        $('.smallbutton').attr("disabled", "disabled");
                                    }
                                    else {
                                        $("#CompensationList").css('display', 'none');
                                        $("#AddNewCompensation").css('display', 'none');
                                        $("#CompMakeApproved").css('display', 'block');
                                        $("#PendingApprovalsList").css('display', 'block');
                                        $('#SaveCompensation').css("display", "block");
                                        $('.input-group-btn').find('.btn').attr("disabled", false);
                                        $('.smallbutton').attr("disabled", false);
                                    }
                                }
                            }



                            $scope.Investigation_Remarks = Res[0]["REMARKS"];
                            if (Res[0]["DIGITAL_SIGN"] == "True" || Res[0]["DIGITAL_SIGN"] == "true" || Res[0]["DIGITAL_SIGN"] == 1) {
                                $scope.Digital_Sign = true;
                            }
                            else {
                                $scope.Digital_Sign = false;
                            }
                            $scope.Approved_Date = Res[0]["APPROVED_DATE"];
                            $scope.Complaint_Description = Res[0]["COMPLAINT_DESC"];
                            $scope.SubStockiest_Direct_Customer = Res[0]["END_CUSTOMER_DETAILS"];

                            if (Res[0]["INVOICE_BASED"] == "" || Res[0]["INVOICE_BASED"] == null || Res[0]["INVOICE_BASED"] == "False" || Res[0]["INVOICE_BASED"] == "false") {
                                $scope.Invoice_Based = false;
                                $("#InvoiceBasedDiv").hide();
                            }
                            else {
                                $("#InvoiceBasedDiv").show();
                                $scope.Invoice_Based = true;

                                $(".PeriodBasedClass").css('display', 'none');
                            }

                            if (Res[0]["PERIOD_BASED"] == "" || Res[0]["PERIOD_BASED"] == null || Res[0]["PERIOD_BASED"] == "False" || Res[0]["PERIOD_BASED"] == "false") {
                                $scope.Period_Based = false;
                            }
                            else {

                                $(".PeriodBasedClass").css('display', 'block');

                                $scope.Period_Based = true;
                            }



                            $scope.Date_Supply_From = Res[0]["Date_Supply_From"];
                            $scope.Date_Supply_TO = Res[0]["DATE_SUPPLY_TO"];
                            //alert(Res[0]["ALL_INVOICE_NO"]);
                            $scope.Invoice_Details = Res[0]["ALL_INVOICE_NO"];
                            $scope.Product_Details = Res[0]["ALL_INVOICE_DATE"];

                            if (Res[0]["SUPPLY_QTY_MTRS"] != "" && Res[0]["SUPPLY_QTY_MTRS"] != null) {
                                $scope.Total_Supply_Qty_Mtrs = Res[0]["SUPPLY_QTY_MTRS"];
                            }
                            else {
                                $scope.Total_Supply_Qty_Mtrs = 0;
                            }



                            if (Res[0]["SUPPLY_QTY_TONS"] != "" && Res[0]["SUPPLY_QTY_TONS"] != null) {
                                $scope.Total_Supply_Qty_Tons = Res[0]["SUPPLY_QTY_TONS"];
                            }
                            else {
                                $scope.Total_Supply_Qty_Tons = 0;
                            }

                            if (Res[0]["BREAKAGE_QTY_MTRS"] != "" && Res[0]["BREAKAGE_QTY_MTRS"] != null) {
                                $scope.Total_Breakage_Qty_Mtrs = Res[0]["BREAKAGE_QTY_MTRS"];
                            }
                            else {
                                $scope.Total_Breakage_Qty_Mtrs = 0;
                            }

                            if (Res[0]["BREAKAGE_QTY_TONS"] != "" && Res[0]["BREAKAGE_QTY_TONS"] != null) {
                                $scope.Total_Breakage_Qty_Tons = Res[0]["BREAKAGE_QTY_TONS"];
                            }
                            else {
                                $scope.Total_Breakage_Qty_Tons = 0;
                            }

                            if (Res[0]["RECOVERY_QTY_MTRS"] != "" && Res[0]["RECOVERY_QTY_MTRS"] != null) {
                                $scope.Total_Recovery_Mtrs = Res[0]["RECOVERY_QTY_MTRS"];
                            }
                            else {
                                $scope.Total_Recovery_Mtrs = 0;
                            }

                            if (Res[0]["RECOVERY_QTY_TONS"] != "" && Res[0]["RECOVERY_QTY_TONS"] != null) {
                                $scope.Total_Recovery_Tons = Res[0]["RECOVERY_QTY_TONS"];
                            }
                            else {
                                $scope.Total_Recovery_Tons = 0;
                            }

                            if (Res[0]["NET_LOSS_QTY_MTRS"] != "" && Res[0]["NET_LOSS_QTY_MTRS"] != null) {
                                $scope.Net_Loss_Mtrs = Res[0]["NET_LOSS_QTY_MTRS"];
                            }
                            else {
                                $scope.Net_Loss_Mtrs = 0;
                            }

                            if (Res[0]["NET_LOSS_QTY_TONS"] != "" && Res[0]["NET_LOSS_QTY_TONS"] != null) {
                                $scope.Net_Loss_Tons = Res[0]["NET_LOSS_QTY_TONS"];
                            }
                            else {
                                $scope.Net_Loss_Tons = 0;
                            }

                            $scope.Compensation_Mode = Res[0]["COMPENSATION_MODE_NAME"];
                            $scope.Compensation_Mode_Code = Res[0]["COMPENSATION_MODE_CODE"];
                            $scope.Compensation_Mode_ID = Res[0]["COMPENSATION_MODE_ID"];
                            $scope.Any_Special_Remarks = Res[0]["COMMENTS_APPROVALS_SALES_OTHERS"];

                            if (Res[0]["COMPENSATION_IN_METERS_SHEET"] != "" && Res[0]["COMPENSATION_IN_METERS_SHEET"] != null)
                                $scope.Compensation_In_Running_Meters = Res[0]["COMPENSATION_IN_METERS_SHEET"];



                            $("#Compensation_In_Running_Meter_Words").val(Res[0]["COMPENSATION_IN__METER_WORDS_SHEET"]);

                            //

                            if (Res[0]["RECOMMENDED_SIZE"] != "" && Res[0]["RECOMMENDED_SIZE"] != null) {
                                $scope.Size_Recommendation_RMTS = Res[0]["RECOMMENDED_SIZE"];

                                var No_Of_36 = parseInt(($scope.Size_Recommendation_RMTS) / (3.6));
                                $("#No_of_36").val(No_Of_36);

                            }
                            else {
                                $("#No_of_36").val("0");
                                $("#Size_Recommendation_RMTS").val("0");
                            }


                            if (Res[0]["OTHER_SIZE"] != "" && Res[0]["OTHER_SIZE"] != null)
                                $scope.Other_Size_RMTS = (Res[0]["OTHER_SIZE"]).toFixed(3);

                            if (Res[0]["COMPENSATION_IN_TONS"] != "" && Res[0]["COMPENSATION_IN_TONS"] != null)
                                $scope.Compensation_In_Tons = Res[0]["COMPENSATION_IN_TONS"];



                            if (Res[0]["COMPENSATION_IN_NO"] != "" && Res[0]["COMPENSATION_IN_NO"] != null)
                                $scope.CompensationInNos = Res[0]["COMPENSATION_IN_NO"];


                            $scope.CompensationInNosWords = Res[0]["COMPENSATION_IN_WORD"];

                            if (Res[0]["COMPENSATION_IN_CUBIC_METER"] != "" && Res[0]["COMPENSATION_IN_CUBIC_METER"] != null)
                                $scope.CompensationinMetricCubicValue = Res[0]["COMPENSATION_IN_CUBIC_METER"];


                            if (Res[0]["ISSUE_CREDIT_NOTE"] == "True" || Res[0]["ISSUE_CREDIT_NOTE"] == "true") {
                                $scope.CompensationIssueCreditNote = true;
                                $scope.IssueCredited();
                            }
                            else {
                                $scope.CompensationIssueCreditNote = false;
                            }

                            if (Res[0]["AMOUNT_CREDITED"] != "" && Res[0]["AMOUNT_CREDITED"] != null)
                                $scope.CompensationAmountCredited = Res[0]["AMOUNT_CREDITED"];

                            //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                            if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(Res[0]["CREATED_DATE"]) < new Date('2020-11-19')) {
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
                                $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                                $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                                $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                                $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                                //$("#party_type > [value=0]").attr("selected", "true");
                                $scope.party_type_id = 1;
                                $scope.party_type = "Stockiest";
                            } else if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(Res[0]["CREATED_DATE"]) >= new Date('2020-11-19')) {
                                $("#SubStockiest_Direct_CustomerDiv").hide();
                                $("#PartyTypeDiv").show();
                                $("#Is_Project_PartyDiv").hide();
                                $("#SubStockiest_CodeDiv").hide();
                                $("#Site_AddressDiv").hide();
                                $("#SubStockiest_NameDiv").hide();
                                $("#SubStockiest_AddressDiv").hide();
                                $("#SubStockiest_NumberDiv").hide();
                                $("#party_type_id").val(Res[0]["party_type_id"]);
                                $("#party_type").val(Res[0]["party_type"]);
                                $("#SubStockiest_ID").val(Res[0]["SubStockiest_Code"]);
                                $("#SubStockiest_Code").val(Res[0]["SubStockiest_Code"]);
                                $("#SubStockiest_Name").val(Res[0]["SubStockiest_Name"]);
                                $("#SubStockiest_Address").val(Res[0]["SubStockiest_Address"]);
                                $("#SubStockiest_Number").val(Res[0]["SubStockiest_Number"]);
                                if (Res[0]["party_type"] == "SubDealer" || Res[0]["party_type_id"] == 2 || Res[0]["party_type"] == "Sub-Stockiest") {
                                    $("#SubStockiest_CodeDiv").show();
                                    $("#SubStockiest_NameDiv").show();
                                    $("#SubStockiest_AddressDiv").show();
                                    $("#SubStockiest_NumberDiv").show();
                                }
                                //svprasadk 19-11-2020 SBU 1 requirement to party type other start 
                                else if (Res[0]["party_type_id"] == 7) {
                                    $("#SubStockiest_CodeDiv").hide();
                                    $("#SubStockiest_NameDiv").show();
                                    $("#SubStockiest_AddressDiv").show();
                                    $("#SubStockiest_NumberDiv").show();
                                    $scope.party_type_id = Res[0]["party_type_id"];
                                    $scope.party_type = Res[0]["party_type"];
                                    $scope.SubStockiest_Code = "";
                                    $scope.SubStockiest_ID = "";
                                    $scope.SubStockiest_Name = Res[0]["SubStockiest_Name"];
                                    $scope.SubStockiest_Address = Res[0]["SubStockiest_Address"];
                                    $scope.SubStockiest_Number = Res[0]["SubStockiest_Number"];
                                    $("#party_type_id").val(Res[0]["party_type_id"]);
                                    $("#party_type").val(Res[0]["party_type"]);
                                    $("#SubStockiest_ID").val("");
                                    $("#SubStockiest_Code").val("");
                                    $("#SubStockiest_Name").val(Res[0]["SubStockiest_Name"]);
                                    $("#SubStockiest_Address").val(Res[0]["SubStockiest_Address"]);
                                    $("#SubStockiest_Number").val(Res[0]["SubStockiest_Number"]);
                                }
                                //svprasadk 19-11-2020 SBU 1 requirement to party type other end
                                else {
                                    if (Res[0]["END_CUSTOMER_DETAILS"] != "" && (Res[0]["party_type"] == "SubDealer" || Res[0]["party_type_id"] == 2 || Res[0]["party_type"] == "Sub-Stockiest")) {
                                        //$("#party_type").val("SubDealer");
                                        $("#party_type_id").val(Res[0]["party_type_id"]);
                                        $("#party_type").val(Res[0]["party_type"]);
                                        $("#SubStockiest_CodeDiv").show();
                                        $("#SubStockiest_NameDiv").show();
                                        $("#SubStockiest_AddressDiv").show();
                                        $("#SubStockiest_NumberDiv").show();
                                        $("#SubStockiest_ID").val(Res[0]["END_CUSTOMER_DETAILS"]);
                                        $("#SubStockiest_Code").val(Res[0]["END_CUSTOMER_DETAILS"]);
                                        $("#SubStockiest_Name").val(Res[0]["END_CUSTOMER_DETAILS"]);
                                        $("#SubStockiest_Address").val(Res[0]["Customer_Address"]);
                                        $("#SubStockiest_Number").val(Res[0]["Phone_Number"]);
                                    } else {
                                        //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                                        $("#party_type_id").val(Res[0]["party_type_id"]);
                                        $("#party_type").val(Res[0]["party_type"]);
                                        //$scope.party_type_id = HeaderData[0]["party_type_id"];
                                        //$scope.party_type = HeaderData[0]["party_type"];
                                        //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                                        //$("#party_type").val("Dealer");
                                        //$("#party_type_id").val(1);
                                        //$("#party_type").val("Stockiest");
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
                                $("#SubStockiest_Direct_Customer").val("");
                                $("#Is_Project_Party").prop("checked", false);
                                $("#Site_Address").val("");
                                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                                $("#TYPE_OF_COMPLAINT_DIV").show();
                                //$("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                                //if (Res[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                                //    $("#TYPE_OF_COMPLAINT > [value=" + Res[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                                //} else {
                                //    $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                                //}
                                $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                                $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                                $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                                $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                                //console.log(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end
                            } else if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU2") {
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
                                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                                $("#TYPE_OF_COMPLAINT_DIV").hide();
                                //$("#TYPE_OF_COMPLAINT").val(0);
                                //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                                $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                                $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                                $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                                $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end
                            } else if (Res[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
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
                                $("#party_type_id").val(1);
                                $("#party_type").val("Stockiest");
                                $("#SubStockiest_ID").val("");
                                $("#SubStockiest_Code").val("");
                                $("#SubStockiest_Name").val("");
                                $("#SubStockiest_Address").val("");
                                $("#SubStockiest_Number").val("");
                                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                                $("#TYPE_OF_COMPLAINT_DIV").hide();
                                //$("#TYPE_OF_COMPLAINT").val(0);
                                //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                                //$scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                                $("#TYPE_OF_COMPLAINT_ID").val(Res[0]["TYPE_OF_COMPLAINT_ID"]);
                                $scope.TYPE_OF_COMPLAINT_ID = Res[0]["TYPE_OF_COMPLAINT_ID"];
                                $("#TYPE_OF_COMPLAINT").val(Res[0]["TYPE_OF_COMPLAINT"]);
                                $scope.TYPE_OF_COMPLAINT = Res[0]["TYPE_OF_COMPLAINT"];
                                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end
                            }
                            //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                            var TRCode = "";
                            var MaterialSupplyDetails = [];
                            if (Result.hasOwnProperty("MaterialSupplyLinesData")) {
                                MaterialSupplyDetails = Result["MaterialSupplyLinesData"];
                            }
                            for (var i = 0; i < MaterialSupplyDetails.length; i++) {
                                $("#Material_Supply_Detail_Table tbody").empty();
                                TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' ng-click='EditMSD(obj,$event)'><td>" + (i + 1) + "</td>";
                                TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["PLANT_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["SUPPLY_NAME"] + "</td>";
                                TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["UOM"] + "</td>";
                                if (MaterialSupplyDetails[i]["supply_qty"] == null || MaterialSupplyDetails[i]["supply_qty"] == "null") {
                                    TRCode = TRCode + "<td></td>";
                                } else {
                                    TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["supply_qty"] + "</td>";
                                }

                                if (MaterialSupplyDetails[i]["breakage_qty"] == null || MaterialSupplyDetails[i]["breakage_qty"] == "null") {
                                    TRCode = TRCode + "<td></td>";
                                } else {
                                    TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["breakage_qty"] + "</td>";
                                }
                                if (MaterialSupplyDetails[i]["NET_LOSS"] == null || MaterialSupplyDetails[i]["NET_LOSS"] == "null") {
                                    TRCode = TRCode + "<td></td>";
                                } else {
                                    TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["NET_LOSS"] + "</td>";
                                }

                                TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["PLANT_CODE"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["PLANT_ID"] + "</td>";

                                TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_CODE"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_ID"] + "</td>";

                                TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_CODE"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_ID"] + "</td>";
                                TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["LINE_ID"] + "</td>";
                                //TRCode = TRCode + "<td style='display:none;'></td>";
                                TRCode = TRCode + "</tr>";
                            }

                            var html = $compile(TRCode)($scope);
                            var el = angular.element($("#Material_Supply_Detail_Table tbody"));
                            el.append(html);
                            $compile(html)($scope);

                            if (CompensationScope.Product_Type == "Sheeting" || CompensationScope.Product_Type == "SBU1") {
                                $("#CompensationDiv_Sheeting").show();
                                $("#CompensationDiv_Aerocon").hide();
                                var BreakageLinesDetails = Result["CompensationBreakageData"];
                                $("#lblSubStockiest_Direct_Customer").text("Sub-Stockiest/ Direct Customer");
                                TRCode = "";
                                $("#Breakage_Investigation_Details_Table tbody").empty();
                                for (var i = 0; i < BreakageLinesDetails.length; i++) {

                                    TRCode = TRCode + "<tr class='MousePointer' id='BID_" + (i + 1) + "' ng-click='EditBID(obj,$event)'><td>" + (i + 1) + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["PRODUCT_NAME"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SIZE_MM"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'></td>";
                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SUPPLIED_QTY_NO"] + "</td>";

                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SUPPLIED_QTY"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["SUPPLIED_QTY_TON"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["BREAKAGE_QTY_NO"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["BREAKAGE_QTY"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["BREAKAGE_QTY_TON"] + "</td>";

                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["BREAKAGE_PERSENT"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["DEFECT_TYPE_NAME"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["REMARKS"] + "</td>";


                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["PRODUCT_CODE"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["PRODUCT_ID"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["DEFECT_TYPE_ID"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["DEFECT_TYPE_CODE"] + "</td>";

                                    //TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["LINE_ID"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["LINE_ID"] + "</td>";
                                    TRCode = TRCode + "</tr>";


                                }
                                var html = $compile(TRCode)($scope);
                                var el = angular.element($("#Breakage_Investigation_Details_Table tbody"));
                                el.append(html);
                                $compile(html)($scope)


                                var CCSheets = Result["CCSheets"];
                                TRCode = "";

                                var Product_Category = Res[0]["PRODUCT_CATEGORY_NAME"];


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

                                $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                                $("#Mat_Sup_Det_BU3_Add").css("display", "none");
                                $("#Breakage_Investigation_Details_SBU3").css("display", "none");
                                $("#CompensationRecommSBU3Div").css("display", "none");
                                $("#Supply_Details_TableB").css("display", "none");
                                $("#Supply_Details_AddB").css("display", "none");


                            }
                            else if (CompensationScope.Product_Type == "SBU2" || (CompensationScope.Product_Type == "SBU3" && CompensationScope.ProductCategory_Code == "36")) {
                                $("#RecommendedForCCSheetsDivision").css('display', 'none');

                                $("#CompensationDiv_Sheeting").hide();
                                $("#CompensationDiv_Aerocon").show();
                                var BreakageOtherLinesDetails = Result["CompensationBreakageOthersData"];
                                //alert(BreakageOtherLinesDetails);
                                TRCode = "";
                                $("#Breakage_OtherLines_Details_Table tbody").empty();

                                $("#lblSubStockiest_Direct_Customer").text("Sub-Stockiest/ Direct Customer");

                                for (var i = 0; i < BreakageOtherLinesDetails.length; i++) {
                                    TRCode = TRCode + "<tr class='MousePointer' id='BOTHERID_" + (i + 1) + "' ng-click='EditBOTHERID(obj,$event)'><td>" + (i + 1) + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["SUPPLIED_QTY"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["TOTAL_BREAKAGE_QTY"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["TOTAL_BREAKAGE_PERSENT"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["ALLOWED_BREAKAGE_PERSENT"] + "</td>";

                                    TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["ACTUAL_BREAKAGE_QTY"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["TRANSPORTER"] + "</td>";
                                    TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["REMARKS"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + BreakageOtherLinesDetails[i]["LINE_ID"] + "</td>";
                                    TRCode = TRCode + "</tr>";

                                }

                                var html = $compile(TRCode)($scope);


                                var el = angular.element($("#Breakage_OtherLines_Details_Table tbody"));
                                el.append(html);
                                $compile(html)($scope)

                                //For Displaying item wise Supply Breakage Other Lines
                                var SupplyDetails_SBU2 = Result["Brk_Otr_Lines_SBU2"];
                                TRCode = "";
                                $("#Supply_Details_Table_SBU2 tbody").empty();
                                for (var i = 0; i < SupplyDetails_SBU2.length; i++) {
                                    TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB_SBU2(this.id)'><td>" + (i + 1) + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["PRODUCT_CODE"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["PRODUCT_NAME"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["INVOICE_NO"] + "</td>";
                                    TRCode = TRCode + "<td>" + (SupplyDetails_SBU2[i]["INVOICE_DATE"]) + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["batch_no"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["SUPPLIED_QTY"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["BREAKAGE_QTY"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["BREAKAGE_PERSENT"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["ALLOWED_BREAKAGE_PERSENT"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["ACTUAL_BREAKAGE_QTY"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["TRANSPORTER"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["DEFECT_TYPE_NAME"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["REMARKS"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + SupplyDetails_SBU2[i]["DEFECT_TYPE_CODE"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + SupplyDetails_SBU2[i]["LINE_ID"] + "</td>";
                                    TRCode = TRCode + "</tr>";
                                }
                                $("#Supply_Details_Table_SBU2 tbody").append(TRCode);
                                //End Supply Details

                                var CompensationRecommendationDetails = Result["CompensationRecommendationData"];
                                TRCode = "";


                                for (var i = 0; i < CompensationRecommendationDetails.length; i++) {
                                    TRCode = TRCode + "<tr class='MousePointer' id='COMPSIZE_" + (i + 1) + "' ng-click='EditCompensationSizeLines(obj,$event)'><td>" + (i + 1) + "</td>"
                                    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["RECOMMENDED_SIZE"] + "</td>";
                                    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["NOS"] + "</td>";
                                    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["GROSS_WEIGHT"] + "</td>";
                                    TRCode = TRCode + "<td>" + CompensationRecommendationDetails[i]["TONS"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_CODE"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["PLANT_ID"] + "</td>";
                                    TRCode = TRCode + "<td style='display:none;'>" + CompensationRecommendationDetails[i]["LINE_ID"] + "</td>";
                                    TRCode = TRCode + "</tr>";

                                }


                                var html = $compile(TRCode)($scope);
                                var el = angular.element($("#CompensationSizeLines_Details_Table tbody"));

                                el.append(html);
                                $compile(html)($scope);


                                $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                                $("#Mat_Sup_Det_BU3_Add").css("display", "none");
                                $("#Breakage_Investigation_Details_SBU3").css("display", "none");
                                $("#CompensationRecommSBU3Div").css("display", "none");
                                $("#Supply_Details_TableB").css("display", "none");
                                $("#Supply_Details_AddB").css("display", "none");

                            }
                            else if (CompensationScope.Product_Type == "SBU3") {

                                $("#Material_Supply_Detail_Table").css("display", "none");
                                $("#Mat_Sup_Det_Add").css("display", "none");

                                $("#Breakage_OtherLines_Details_Table").css("display", "none");
                                $("#Supply_Details_Table_SBU2").css("display", "none");
                                $("#BRK_OtherLines_Det_Add").css("display", "none");

                                $("#CompensationSizeLines_Details_Table").css("display", "none");
                                $("#CompensationSize_Add").css("display", "none");

                                $("#Material_Supply_Detail_Table").css("display", "none");
                                $("#Mat_Sup_Det_Add").css("display", "none");

                                $("#lblSubStockiest_Direct_Customer").text("Distributor/ Wholesaler/ Dealer/ Project");

                                $("#CompensationinMetricCubicValueDivision").css("display", "none");

                                $("#CompensationSize_Details_Div").show();
                                $("#CompensationDiv_Sheeting").hide();
                                $("#CompensationDiv_Aerocon").show();
                                $("#CompensationQtyMtrTonsDiv").hide();



                                TRCode = "";
                                var MSFBU3Lines = Result["MSFBU3Lines"];
                                $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                                for (var i = 0; i < MSFBU3Lines.length; i++) {


                                    TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";

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


                                TRCode = "";
                                var SupplyDetailsB = Result["Brk_Otr_Lines"];
                                var totalvalue = 0;
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
                                    TRCode = TRCode + "<td>" + SupplyDetailsB[i]["ActualDefectQty"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetailsB[i]["TRANSPORTER"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetailsB[i]["DEFECT_TYPE_NAME"] + "</td>";
                                    TRCode = TRCode + "<td>" + SupplyDetailsB[i]["REMARKS"] + "</td>";
                                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
                                    TRCode = TRCode + "<td>" + SupplyDetailsB[i]["RATE_PER_UNIT"] * SupplyDetailsB[i]["ActualDefectQty"] + "</td>";

                                    TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsB[i]["DEFECT_TYPE_CODE"] + "</td>";

                                    TRCode = TRCode + "</tr>";
                                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

                                    totalvalue += SupplyDetailsB[i]["RATE_PER_UNIT"] * SupplyDetailsB[i]["ActualDefectQty"];
                                    console.log("Total value : " + totalvalue);
                                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.
                                }
                                //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
                                $("#total_prod_value").val(totalvalue);
                                console.log(totalvalue);
                                //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.
                                $("#Supply_Details_TableB tbody").append(TRCode);


                                TRCode = "";
                                var RCommLines = Result["RCommLines"];
                                $("#CompensationRecommSBU3 tbody").empty();
                                for (var i = 0; i < RCommLines.length; i++) {

                                    TRCode = TRCode + "<tr class='MousePointer' id='BU3Rec_" + (i + 1) + "' onclick='EditBU3Rec(this.id)'><td>" + (i + 1) + "</td>";

                                    TRCode = TRCode + "<td>" + RCommLines[i]["ProdCode"] + "</td>";
                                    TRCode = TRCode + "<td>" + RCommLines[i]["ProdName"] + "</td>";
                                    TRCode = TRCode + "<td>" + RCommLines[i]["Nos"] + "</td>";

                                    TRCode = TRCode + "</tr>";
                                }
                                $("#CompensationRecommSBU3 tbody").append(TRCode);


                            }

                            $("#StateFilter").val(Res[0]["STATE_CODE"]);
                            $("#CMSState").val(Res[0]["STATE_CODE"]);

                            var MyField = $("#HiddenForCMS").val();
                            if (MyField != "") {
                                //alert("6");
                                $('#SaveCompensation').css("display", "block");
                                $("#CompMakeApproved").css('display', 'block');
                                $("#PendingApprovalsList").css('display', 'block');
                            }

                            MakeTotalsForSheetingTable();

                            //MakeTotalsForSizeLines();


                            $scope.Compensation_Id = $scope.ID;
                            if (Res[0]["ShowStatus"] == "Compensation Under Review") {
                                $("#SendForApproval").css('display', 'none');
                            }

                            HideLoader();

                        }
                        else {
                            alert("No Data")
                        }
                        var MyField = $("#HiddenForCMS").val();

                        if (MyField == "") {
                        }
                        else {
                            $("#CompMakeApproved").css('display', 'block');
                            $("#PendingApprovalsList").css('display', 'block');
                            $('#SaveCompensation').css("display", "block");
                            $('.input-group-btn').find('.btn').attr("disabled", false);
                            $('.smallbutton').attr("disabled", false);
                            $("#AddNewCompensation").css('display', 'none');
                            $("#CompensationList").css('display', 'none');
                            $("#SendForApproval").css('display', 'none');
                        }

                        var OriginalStatus = $("#Compensation_Status").val();
                        if (Res[0]["DOC_STATUS"] == "Approved") {
                            $("#SaveCompensation").css('display', 'none');
                        }

                        var UserType = $("#USERTYPE_Compensation").val();
                        if (UserType == "COM_OF_BU2") {
                            $scope.DisableAllElements();
                        }

                    });

                },
                    function errorCallback(response) {
                        alert("Error : " + response);
                        HideLoader();
                    });
            }
        }
        catch (e) {
            alert("Error : " + e);
            HideLoader();
        }
    }
     // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.END*@
    // Sending for Approvala
    $scope.SendForApproval = function () {

        var ProductType = $("#Product_Type").val();

        if (ProductType == "SBU1" || ProductType == "SBU2" || (ProductType == "SBU3" && $scope.ProductCategory_Code == "36")) {
            if ($("#Material_Supply_Detail_Table tbody tr").length > 0) {
            }
            else {
                alert("Please fill Material Supply Details");
                return;
            }
        }
        else if (ProductType == "SBU3") {
            if ($("#Material_Supply_Detail_Table_BU3 tbody tr").length > 0) {
            }
            else {
                alert("Please fill Material Supply Details");
                return;
            }

            if ($("#Supply_Details_TableB tbody tr").length > 0) {
            }
            else {
                alert("Please fill Supply Details");
                return;
            }

        }



        if ($scope.Compensation_Status != "Waiting for approval") {

            $scope.Compensation_In_Running_Meter_Words = $('#Compensation_In_Running_Meter_Words').val();

            var PeriodBased = $scope.Period_Based;

            //var id = $scope.CompensationId;            
            var Flag = 0;

            if ($scope.Investigation_Num == "" || $scope.Investigation_Num == undefined) {
                Flag = Flag + 1;
                $("#Investigation_Num").css("border-color", "red");
            }
            else {
                $("#Investigation_Num").css("border-color", "#d2d6de");
            }
            if ($scope.COMP_Series_Code == "" || $scope.COMP_Series_Code == undefined) {
                Flag = Flag + 1;
                $("#COMP_Series_Code").css("border-color", "red");
            }
            else {
                $("#COMP_Series_Code").css("border-color", "#d2d6de");
            }
            if (($scope.Date_Supply_From == "" || $scope.Date_Supply_From == undefined || $scope.Compensation_Status != "DRAFT") && (PeriodBased == true)) {
                Flag = Flag + 1;
                $("#Date_Supply_From").css("border-color", "red");
            }
            else {
                $("#Date_Supply_From").css("border-color", "#d2d6de");
            }
            if (($scope.Date_Supply_TO == "" || $scope.Date_Supply_TO == undefined || $scope.Compensation_Status != "DRAFT") && (PeriodBased == true)) {
                Flag = Flag + 1;
                $("#Date_Supply_TO").css("border-color", "red");
            }
            else {
                $("#Date_Supply_TO").css("border-color", "#d2d6de");
            }

            if ($("#Compensation_Mode").val() == "") {
                Flag = Flag + 1;
                $("#Compensation_Mode").css("border-color", "red");
            }
            else {
                $("#Compensation_Mode").css("border-color", "#d2d6de");
            }


            if ($("#Product_Category").val() == "AC Sheets") {

                if ($("#Compensation_In_Running_Meters").val() == "") {
                    Flag = Flag + 1;
                    $("#Compensation_In_Running_Meters").css("border-color", "red");
                }
                else {
                    $("#Compensation_In_Running_Meters").css("border-color", "#d2d6de");
                }

                if ($("#Compensation_In_Running_Meter_Words").val() == "") {
                    Flag = Flag + 1;
                    $("#Compensation_In_Running_Meter_Words").css("border-color", "red");
                }
                else {
                    $("#Compensation_In_Running_Meter_Words").css("border-color", "#d2d6de");
                }

                if ($("#Compensation_In_Tons").val() == "") {
                    Flag = Flag + 1;
                    $("#Compensation_In_Tons").css("border-color", "red");
                }
                else {
                    $("#Compensation_In_Tons").css("border-color", "#d2d6de");
                }

                if ($("#No_of_36").val() == "") {
                    Flag = Flag + 1;
                    $("#No_of_36").css("border-color", "red");
                }
                else {
                    $("#No_of_36").css("border-color", "#d2d6de");
                }

                if ($("#Other_Size_RMTS").val() == "") {
                    Flag = Flag + 1;
                    $("#Other_Size_RMTS").css("border-color", "red");
                }
                else {
                    $("#Other_Size_RMTS").css("border-color", "#d2d6de");
                }


            }

            if ($("#Product_Category").val() == "CC Iron Sheets") {

                if ($("#Compensation_In_Running_Meters").val() == "") {
                    Flag = Flag + 1;
                    $("#Compensation_In_Running_Meters").css("border-color", "red");
                }
                else {
                    $("#Compensation_In_Running_Meters").css("border-color", "#d2d6de");
                }

                if ($("#Compensation_In_Tons").val() == "") {
                    Flag = Flag + 1;
                    $("#Compensation_In_Tons").css("border-color", "red");
                }
                else {
                    $("#Compensation_In_Tons").css("border-color", "#d2d6de");
                }

                if ($("#Compensation_In_Running_Meter_Words").val() == "") {
                    Flag = Flag + 1;
                    $("#Compensation_In_Running_Meter_Words").css("border-color", "red");
                }
                else {
                    $("#Compensation_In_Running_Meter_Words").css("border-color", "#d2d6de");
                }

            }


            var PT = $("#Product_Type").val();


            if (PT == "SBU2" || (PT == "SBU3" && $scope.ProductCategory_Code == "36")) {

                if ($("#CompensationInNos").val() == "") {
                    Flag = Flag + 1;
                    $("#CompensationInNos").css("border-color", "red");
                }
                else {
                    $("#CompensationInNos").css("border-color", "#d2d6de");
                }


                if ($("#CompensationInNosWords").val() == "") {
                    Flag = Flag + 1;
                    $("#CompensationInNosWords").css("border-color", "red");
                }
                else {
                    $("#CompensationInNosWords").css("border-color", "#d2d6de");
                }


                if ($("#CompensationinMetricCubicValue").val() == "") {
                    Flag = Flag + 1;
                    $("#CompensationinMetricCubicValue").css("border-color", "red");
                }
                else {
                    $("#CompensationinMetricCubicValue").css("border-color", "#d2d6de");
                }

            }
            if (PT == "SBU3" && $scope.ProductCategory_Code != "36") {

                if ($("#CompensationInNos").val() == "") {
                    Flag = Flag + 1;
                    $("#CompensationInNos").css("border-color", "red");
                }
                else {
                    $("#CompensationInNos").css("border-color", "#d2d6de");
                }


                if ($("#CompensationInNosWords").val() == "") {
                    Flag = Flag + 1;
                    $("#CompensationInNosWords").css("border-color", "red");
                }
                else {
                    $("#CompensationInNosWords").css("border-color", "#d2d6de");
                }

            }

            if (Flag > 0) {
                alert("Please Fill All mandatory fielsds");
                return;
            }
            else {
                var CompensationData = JSON.stringify({
                    CompensationID: $scope.ID,
                    OperationName: "SendForApproval",
                    CompensationDocStatus_CM: "Waiting for approval",
                    CompensationDate_CM: $scope.Compensation_Date,
                    CompensationDocStatus_CM: "Waiting for approval",
                    CREATED_BY: $('#USERCODE_Compensation').val(),
                    CREATED_DATE: $scope.Compensation_Date
                });
                if (confirm("Do you want to Send for review?")) {
                    $('#ApproveSave').val("ApproveSave");
                    //debugger
                    $scope.SaveCompensation();
                    DIMSFactory.saveCompensationData(CompensationData).success(function (DATA) {
                        var response = (DATA.tabledata);
                        if (response != "FALSE") {
                            var result = response.split('$$');
                            $scope.Compensation_Status = result[1];
                            $("#SendForApproval").css('display', 'none');
                            // $('#Mat_Sup_Det_Add').attr("disabled", "disabled");
                            $('.input-group-btn').find('span').attr("disabled", "disabled");
                            $('.smallbutton').attr("disabled", "disabled");
                            //$('#SaveCompensation').css("display", "none");
                            alert("Your Complaint has been sent for review");
                            $scope.go('CompensationList');
                        }
                        else {
                            alert("Error in Approval");
                        }
                    });
                }
            }

        }
        else {
            alert("Already sent for review");
        }
    }

    $scope.DisableAllElements = function () {
        $('#CompMakeApproved').css("dispaly", "none");
        $('#AddNewCompensation').css("display", "none");
        $('#SaveCompensation').css("display", "none");
        $('#PendingApprovalCommercial').css("display", "block");
        $('#UpdateCreditNote').css("display", "block");
        $('#PendingApprovalsList').css("display", "none");
        $('#CompensationList').css("display", "none");
        $('#SendForApproval').css("display", "none");
        $('#CompMakeApproved').css("display", "none");
        $('#Investigation_Remarks').attr("disabled", true);
        $('#Digital_Sign').attr("disabled", true);
        $('#SubStockiest_Direct_Customer').attr("disabled", true);
        $('#Is_Project_Party').attr("disabled", true);
        $('#Mat_Sup_Det_Add').attr("disabled", true);
        $('#Invoice_Based').attr("disabled", true);
        $('#Invoice_Details').attr("disabled", true);
        $('#Product_Details').attr("disabled", true);
        $('#BRK_OtherLines_Det_Add').attr("disabled", true);
        $('#Any_Special_Remarks').attr("disabled", true);
        $('#CompensationInNos').attr("disabled", true);
        $('#CompensationInNosWords').attr("disabled", true);
        $('#CompensationinMetricCubic').attr("disabled", true);
        $('#CompensationinMetricCubicValue').attr("disabled", true);
        $('#CompensationSize_Add').attr("disabled", true);
        $('#MSD_Save').attr("disabled", true);
        $('#MSD_Delete').attr("disabled", true);
        $('#BOtherID_Save').attr("disabled", true);
        $('#BOtherID_Delete').attr("disabled", true);
        $('#SD_Save_SBU2').attr("disabled", true);
        $('#SD_Delete_SBU2').attr("disabled", true);
        $('#CompSizeLines_Save').attr("disabled", true);
        $('#CompSizeLines_Delete').attr("disabled", true);
        return;
    }

    $scope.UpdateCreditNote = function () {

        //if ($scope.Compensation_Status != "Waiting for approval") {
        var CmpId = $scope.Compensation_Id;

        Flag = 0;
        if ($scope.CompensationIssueCreditNote == "" || $scope.Investigation_Num == undefined || $scope.CompensationIssueCreditNote == false) {
            Flag = Flag + 1;
            alert("Please Check Issue Credit Note.");
            $("#CompensationIssueCreditNote").css("border-color", "red");
        } else if ($scope.CompensationIssueCreditNote) {
            if ($scope.CompensationAmountCredited == "" || $scope.CompensationAmountCredited == undefined) {
                Flag = Flag + 1;
                alert("Please Enter Amount Credited.");
                $("#CompensationAmountCredited").css("border-color", "red");
            } else {
                $("#CompensationAmountCredited").css("border-color", "#d2d6de");
            }
        }
        else {
            $("#CompensationIssueCreditNote").css("border-color", "#d2d6de");
        }
        if (Flag > 0) {
            return;
        }
        else {
            
            if ($scope.CompensationIssueCreditNote == undefined) { $scope.CompensationIssueCreditNote = ""; }
            if ($scope.CompensationAmountCredited == undefined) { $scope.CompensationAmountCredited = ""; }

            var CompensationCreditDetails = JSON.stringify({
                "CompensationID": $scope.ID,
                "CompensationIssueCreditNote": $scope.CompensationIssueCreditNote,
                "CompensationAmountCredited": $scope.CompensationAmountCredited,
                OperationType: "UpdateCreditNote"
            });
            var MyTest = $("#ApproveSave").val();
            if (MyTest == "") {
                if (confirm("Do you want to Save data?")) {
                }
                else {
                    return;
                }
            }
            DIMSFactory.UpdateCreditNoteData(CompensationCreditDetails).success(function (DATA) {
                var response = DATA.tabledata;
                if (response != "FALSE") {
                    var result = response.split('+');
                    $scope.ID = result[1];
                    $scope.Compensation_Id = result[1];
                    $("#CompFormIden").val(result[1]);
                    $scope.go('PendingApprovalCommercial');
                }
                else {
                    alert("Error in saving");
                }
            },
            function errorCallback(response) {
                alert("Error : " + response);
            });
        }
    }

    $scope.GetApprovalPopUp = function () {
        try {
            $("#Approvals_Remarks").val("");
            $("#ApprovalsActionForm").modal('show');
        }
        catch (e) {
            alert("Error : " + e);
        }
    }


    //Make Approved
    $scope.MakeApproved = function (Decision) {
        try {

            if ($scope.Compensation_Status == "Approved") {
                alert("This record already got approved");
            }
            else {
            }

            $("#Compensation_Status").val("Approved");


            ShowLoader();

            $scope.SaveCompensation();

            setTimeout(function () {


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

                $("#ApprovalsActionForm").modal('hide');


                var ApprovalData = JSON.stringify({
                    CM_Id: $("#Compensation_Id").val(),
                    ModifiedBy: $("#USERCODE_Compensation").val(),
                    FormName: "Compensation",
                    Decision: Decision,
                    Approvals_Remarks: Approvals_Remarks
                });

                $('#ApproveSave').val("ApproveSave");

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistration/MakeApproval',
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {
                    if (response.data == "FALSE") {
                        alert("Error Occured Please try later");
                    }
                    else if (response.data == "TRUE") {
                        $("#Compensation_Status").val("Approved");
                        //alert("Successfully Approved.");
                        alert("Successfully " + Decision);
                        $scope.go('ComplaintPendingApproval');
                    }
                    HideLoader();
                },
                function errorCallback(response) {
                    alert("Error : " + response);
                    HideLoader();

                });

                HideLoader();


            }, 5000);
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
            HideLoader();
        }
    }


    // Getting Header Data 
    $scope.getHeaderData = function () {

        $scope.Compensation_In_Running_Meter_Words = $('#Compensation_In_Running_Meter_Words').val();
        var Flag = 0;
        if ($scope.Investigation_Num == "" || $scope.Investigation_Num == undefined) {
            Flag = Flag + 1;
            alert("Please select Investigation Number");
            $("#Investigation_Num").css("border-color", "red");
        }
        else {
            $("#Investigation_Num").css("border-color", "#d2d6de");
        }
        if ($scope.Complaint_No == "" || $scope.Complaint_No == undefined) {
            Flag = Flag + 1;
            alert("Please select Complaint Number");
            $("#Complaint_No").css("border-color", "red");
        }
        else {
            $("#Complaint_No").css("border-color", "#d2d6de");
        }
        if ($scope.COMP_Series_Code == "" || $scope.COMP_Series_Code == undefined) {
            Flag = Flag + 1;
            alert("Please select COMP Series Code");
            $("#COMP_Series_Code").css("border-color", "red");
        }
        else {
            $("#COMP_Series_Code").css("border-color", "#d2d6de");
        }
        //if ($scope.Date_Supply_From == "" || $scope.Date_Supply_From == undefined) {
        //    Flag = Flag + 1;
        //    $("#Date_Supply_From").css("border-color", "red");
        //}
        //else {
        //    $("#Date_Supply_From").css("border-color", "#d2d6de");
        //}
        //if ($scope.Date_Supply_TO == "" || $scope.Date_Supply_TO == undefined) {
        //    Flag = Flag + 1;
        //    $("#Date_Supply_To").css("border-color", "red");
        //}
        //else {
        //    $("#Date_Supply_To").css("border-color", "#d2d6de");
        //}

        if (Flag > 0) {
            return;
        }
        else {

            //if ($scope.CompensationId == undefined) { $scope.CompensationId = 0; }
            if ($scope.Investigation_Num == undefined) { $scope.Investigation_Num = 0; }
            if ($scope.Investigation_Date == undefined) { $scope.Investigation_Date = ""; }
            if ($scope.Compensation_Id == undefined) { $scope.Compensation_Id = 0; }

            if ($scope.Complaint_No == undefined) { $scope.Complaint_No = 0; }
            if ($scope.Site_Visit_Date == undefined) { $scope.Site_Visit_Date = ""; }
            if ($scope.COMP_Series_Code == undefined) { $scope.COMP_Series_Code = ""; }

            if ($scope.Complaint_Tracking_No == undefined) { $scope.Complaint_Tracking_No = 0; }
            if ($scope.Previous_Visit_Date == undefined) { $scope.Previous_Visit_Date = ""; }
            if ($scope.Compensation_Date == undefined) { $scope.Compensation_Date = ""; }


            if ($scope.Complaint_Received_Date == undefined) { $scope.Complaint_Received_Date = ""; }
            if ($scope.Investigation_Done_By == undefined) { $scope.Investigation_Done_By = ""; }
            if ($scope.Compensation_Status == undefined) { $scope.Compensation_Status = ""; }


            if ($scope.Complaint_Registered_Date == undefined) { $scope.Complaint_Registered_Date = ""; }
            if ($scope.Investigation_Remarks == undefined) { $scope.Investigation_Remarks = ""; }
            if ($scope.Approved_Date == undefined) { $scope.Approved_Date = ""; }

            if ($scope.Complaint_Attendent_Date == undefined) { $scope.Complaint_Attendent_Date = ""; }
            if ($scope.SalesRepresentativeEmployeeCode == undefined) { $scope.SalesRepresentativeEmployeeCode = ""; }
            if ($scope.Digital_Sign == true) { } else { $scope.Digital_Sign = false }

            if ($scope.Complaint_Description == undefined) { $scope.Complaint_Description = ""; }
            if ($scope.SalesRepresentativeEmployeeName == undefined) { $scope.SalesRepresentativeEmployeeName = ""; }

            if ($scope.Customer_Code == undefined) { $scope.Customer_Code = ""; }
            if ($scope.Contact_Person == undefined) { $scope.Contact_Person = ""; }
            if ($scope.SubStockiest_Direct_Customer == undefined) { $scope.SubStockiest_Direct_Customer = ""; }

            if ($scope.Customer_Name == undefined) { $scope.Customer_Name = ""; }
            if ($scope.Contact_Number == undefined) { $scope.Contact_Number = ""; }
            if ($scope.Customer_Type == undefined) { $scope.Customer_Type = ""; }
            if ($scope.Customer_Fax == undefined) { $scope.Customer_Fax = ""; }
            if ($scope.Is_Project_Party == true) { } else { $scope.Is_Project_Party = false }


            if ($scope.Customer_Location == undefined) { $scope.Customer_Location = ""; }
            if ($scope.Customer_Email == undefined) { $scope.Customer_Email = ""; }
            if ($scope.Site_Address == undefined) { $scope.Site_Address = ""; }

            if ($scope.Contact_City == undefined) { $scope.Contact_City = ""; }
            if ($scope.Product_Type == undefined) { $scope.Product_Type = ""; }
            if ($scope.Contact_State == undefined) { $scope.Contact_State = ""; }
            if ($scope.Product_Category == undefined) { $scope.Product_Category = ""; }
            if ($scope.Contact_Area == undefined) { $scope.Contact_Area = ""; }

            if ($scope.Invoice_Based == true) { } else { $scope.Invoice_Based = false }
            if ($scope.Period_Based == true) { } else { $scope.Period_Based = false }

            if ($scope.Date_Supply_From == undefined) { $scope.Date_Supply_From = ""; }
            if ($scope.Date_Supply_TO == undefined) { $scope.Date_Supply_TO = ""; }
            if ($scope.Invoice_Details == undefined) { $scope.Invoice_Details = ""; }
            if ($scope.Product_Details == undefined) { $scope.Product_Details = ""; }
            if ($scope.Digital_Sign == undefined) { $scope.Digital_Sign = ""; }

            if ($("#Total_Supply_Qty_Mtrs_Compensation").val() == undefined) { $("#Total_Supply_Qty_Mtrs_Compensation").val("0.0"); }
            if ($("#Total_Supply_Qty_Tons_Compensation").val() == undefined) { $("#Total_Supply_Qty_Tons_Compensation").val("0.0"); }
            if ($("#Total_Breakage_Qty_Mtrs_Compensation").val() == undefined) { $("#Total_Breakage_Qty_Mtrs_Compensation").val("0.0"); }
            if ($("#Total_Breakage_Qty_Tons_Compensation").val() == undefined) { $("#Total_Breakage_Qty_Tons_Compensation").val("0.0"); }


            if ($("#Total_Recovery_Mtrs_Compensation").val() == undefined) { $("#Total_Recovery_Mtrs_Compensation").val("0.0"); }
            if ($("#Total_Recovery_Tons_Compensation").val() == undefined) { $("#Total_Recovery_Tons_Compensation").val("0.0"); }
            if ($("#Net_Loss_Mtrs_Compensation").val() == undefined) { $("#Net_Loss_Mtrs_Compensation").val("0.0"); }
            if ($("#Net_Loss_Tons_Compensation").val() == undefined) { $("#Net_Loss_Tons_Compensation").val("0.0"); }

            if ($scope.Compensation_Mode == undefined) { $scope.Compensation_Mode = ""; }
            if ($scope.Compensation_Mode_Code == undefined) { $scope.Compensation_Mode_Code = ""; }
            if ($scope.Compensation_Mode_ID == undefined) { $scope.Compensation_Mode_ID = ""; }


            if ($scope.Any_Special_Remarks == undefined) { $scope.Any_Special_Remarks = ""; }
            if ($("#Compensation_In_Running_Meters").val() == undefined) { $("#Compensation_In_Running_Meters").val("0.0"); }
            if ($("#Compensation_In_Tons").val() == undefined) { $("#Compensation_In_Tons").val("0.0"); }

            if ($("#Compensation_In_Running_Meter_Words").val() == undefined) { $("#Compensation_In_Running_Meter_Words").val(""); }
            if ($("#Size_Recommendation_RMTS").val() == undefined) { $("#Size_Recommendation_RMTS").val("0.0"); }
            if ($("#No_of_36").val() == undefined) { $("#No_of_36").val(""); }
            if ($("#Other_Size_RMTS").val() == undefined) { $("#Other_Size_RMTS").val("0.0"); }



            if ($scope.CompensationInNos == undefined) { $scope.CompensationInNos = ""; }
            if ($scope.CompensationinMetricCubic == undefined) { $scope.CompensationinMetricCubic = ""; }
            if ($("#CompensationInNosWords").val() == undefined) { $("#CompensationInNosWords").val(""); }
            if ($scope.CompensationIssueCreditNote == undefined) { $scope.CompensationIssueCreditNote = ""; }
            if ($scope.CompensationIssueCreditNote == undefined) { $scope.CompensationIssueCreditNote = ""; }
            if ($scope.CompensationAmountCredited == undefined) { $scope.CompensationAmountCredited = ""; }


            if ($scope.ID == undefined || $scope.ID == "") {
                $scope.ID = "";
            }

            if ($scope.SALES_REPRESENTATIVE_ID == undefined || $scope.SALES_REPRESENTATIVE_ID == "") {
                $scope.SALES_REPRESENTATIVE_ID = "";
            }

            var Total_CompensationData = JSON.stringify({
                "OperationName": "EditCompensationData",
                "CompensationID": $scope.ID,

                "Investigation_Num": $scope.Investigation_Num,
                "Investigation_Date": $scope.Investigation_Date,
                "Compensation_Id": $scope.Compensation_Id,
                "Complaint_No": $scope.Complaint_No,
                "Site_Visit_Date": $scope.Site_Visit_Date,
                "COMP_Series_Code": $scope.COMP_Series_Code,
                "Complaint_Tracking_No": $scope.Complaint_Tracking_No,
                "Previous_Visit_Date": $scope.Previous_Visit_Date,
                "Compensation_Date": $scope.Compensation_Date,
                "Complaint_Received_Date": $scope.Complaint_Received_Date,
                "Investigation_Done_By": $scope.Investigation_Done_By,
                "Compensation_Status": $scope.Compensation_Status,
                "Complaint_Registered_Date": $scope.Complaint_Registered_Date,
                "Investigation_Remarks": $scope.Investigation_Remarks,
                "Digital_Sign": $scope.Digital_Sign,
                "Approved_Date": $scope.Approved_Date,
                "Complaint_Attendent_Date": $scope.Complaint_Attendent_Date,
                "SalesRepresentativeEmployeeCode": $scope.SalesRepresentativeEmployeeCode,
                "Complaint_Description": $scope.Complaint_Description,
                "SalesRepresentativeEmployeeName": $scope.SalesRepresentativeEmployeeName,
                "Customer_Code": $scope.Customer_Code,
                "Customer_ID": $scope.Customer_ID,
                "CustomerType_Code": $scope.CustomerType_Code,
                "CustomerType_ID": $scope.CustomerType_ID,

                "Contact_Person": $scope.Contact_Person,
                "SubStockiest_Direct_Customer": $scope.SubStockiest_Direct_Customer,
                "Customer_Name": $scope.Customer_Name,
                "Contact_Number": $scope.Contact_Number,
                "Customer_Type": $scope.Customer_Type,
                "Customer_Fax": $scope.Customer_Fax,
                "Is_Project_Party": $scope.Is_Project_Party,
                "Customer_Location": $scope.Customer_Location,
                "Customer_Email": $scope.Customer_Email,
                "Site_Address": $scope.Site_Address,
                "Contact_City": $scope.Contact_City,
                "CityID": $scope.CityID,
                "CityCode": $scope.CityCode,
                "Product_Type": $scope.Product_Type,
                "ProductType_ID": $scope.ProductType_ID,
                "ProductType_Code": $scope.ProductType_Code,

                "Contact_State": $scope.Contact_State,
                "StateCode": $scope.StateCode,
                "StateID": $scope.StateID,
                "Product_Category": $scope.Product_Category,
                "ProductCategory_Code": $scope.ProductCategory_Code,
                "ProductCategory_ID": $scope.ProductCategory_ID,
                "Contact_Area": $scope.Contact_Area,
                "AreaCode": $scope.AreaCode,
                "AreaID": $scope.AreaID,

                "Invoice_Based": $scope.Invoice_Based,
                "Period_Based": $scope.Period_Based,
                "Date_Supply_From": $scope.Date_Supply_From,
                "Date_Supply_TO": $scope.Date_Supply_TO,
                "Invoice_Details": $('#Invoice_Details').val(),
                "Product_Details": $scope.Product_Details,

                "Total_Supply_Qty_Mtrs": $("#Total_Supply_Qty_Mtrs_Compensation").val(),
                "Total_Supply_Qty_Tons": $("#Total_Supply_Qty_Tons_Compensation").val(),
                "Total_Breakage_Qty_Mtrs": $("#Total_Breakage_Qty_Mtrs_Compensation").val(),
                "Total_Breakage_Qty_Tons": $("#Total_Breakage_Qty_Tons_Compensation").val(),
                "Total_Recovery_Mtrs": $("#Total_Recovery_Mtrs_Compensation").val(),
                "Total_Recovery_Tons": $("#Total_Recovery_Tons_Compensation").val(),
                "Net_Loss_Mtrs": $("#Net_Loss_Mtrs_Compensation").val(),
                "Net_Loss_Tons": $("#Net_Loss_Tons_Compensation").val(),

                "Compensation_Mode": $scope.Compensation_Mode,

                "Compensation_Mode_Code": $scope.Compensation_Mode_Code,
                "Compensation_Mode_ID": $scope.Compensation_Mode_ID,
                "Any_Special_Remarks": $scope.Any_Special_Remarks,
                "Compensation_In_Running_Meters": $("#Compensation_In_Running_Meters").val(),
                "Compensation_In_Tons": $("#Compensation_In_Tons").val(),
                "Compensation_In_Running_Meter_Words": $("#Compensation_In_Running_Meter_Words").val(),
                "Size_Recommendation_RMTS": $("#Size_Recommendation_RMTS").val(),
                "No_of_36": $("#No_of_36").val(),
                "Other_Size_RMTS": $("#Other_Size_RMTS").val(),
                "Plant_Code": "",
                //"CREATED_BY": $scope.UserName,
                "CREATED_BY": $("#USERCODE_Compensation").val(),
                "CREATED_DATE": $scope.Compensation_Date,
                "CompensationDocStatus_CM": $scope.Compensation_Status,
                //"CompensationInNos": $scope.CompensationInNos,
                "CompensationInNos": $("#CompensationInNos").val(),
                "CompensationInNosWords": $("#CompensationInNosWords").val(),
                "CompensationinMetricCubic": $("#CompensationinMetricCubic").val(),
                "CompensationinMetricCubicValue": $scope.CompensationinMetricCubicValue,
                "CompensationIssueCreditNote": $scope.CompensationIssueCreditNote,
                "CompensationAmountCredited": $scope.CompensationAmountCredited,
                "SALES_REPRESENTATIVE_ID": $scope.SALES_REPRESENTATIVE_ID

            });

        }
        // alert("Total_CompensationData "+Total_CompensationData);
        return Total_CompensationData;
    }
    //Saving Compensation Data
    $scope.SaveCompensation = function () {

        //if ($scope.Compensation_Status != "Waiting for approval") {
        var CmpId = $scope.Compensation_Id;


        $scope.Compensation_In_Running_Meter_Words = $('#Compensation_In_Running_Meter_Words').val();
        var Flag = 0;

        if ($scope.Investigation_Num == "" || $scope.Investigation_Num == undefined) {
            Flag = Flag + 1;
            $("#Investigation_Num").css("border-color", "red");
        }
        else {
            $("#Investigation_Num").css("border-color", "#d2d6de");
        }
        if ($scope.COMP_Series_Code == "" || $scope.COMP_Series_Code == undefined) {
            Flag = Flag + 1;
            $("#COMP_Series_Code").css("border-color", "red");
        }
        else {
            $("#COMP_Series_Code").css("border-color", "#d2d6de");
        }
        if (($scope.Date_Supply_From == "" || $scope.Date_Supply_From == undefined) && ($scope.Compensation_Status != "DRAFT")) {
            Flag = Flag + 1;
            $("#Date_Supply_From").css("border-color", "red");
        }
        else {
            $("#Date_Supply_From").css("border-color", "#d2d6de");
        }
        if (($scope.Date_Supply_TO == "" || $scope.Date_Supply_TO == undefined) && ($scope.Compensation_Status != "DRAFT")) {
            Flag = Flag + 1;
            $("#Date_Supply_TO").css("border-color", "red");
        }
        else {
            $("#Date_Supply_TO").css("border-color", "#d2d6de");
        }
        Flag = 0;
        if (Flag > 0) {
            return;
        }
        else {
            if ($scope.Investigation_Num == undefined) { $scope.Investigation_Num = 0; }
            if ($scope.Investigation_Date == undefined) { $scope.Investigation_Date = ""; }
            if ($scope.Compensation_Id == undefined) { $scope.Compensation_Id = 0; }

            if ($scope.Complaint_No == undefined) { $scope.Complaint_No = 0; }
            if ($scope.Site_Visit_Date == undefined) { $scope.Site_Visit_Date = ""; }
            if ($scope.COMP_Series_Code == undefined) { $scope.COMP_Series_Code = ""; }

            if ($scope.Complaint_Tracking_No == undefined) { $scope.Complaint_Tracking_No = 0; }
            if ($scope.Previous_Visit_Date == undefined) { $scope.Previous_Visit_Date = ""; }
            if ($scope.Compensation_Date == undefined) { $scope.Compensation_Date = ""; }


            if ($scope.Complaint_Received_Date == undefined) { $scope.Complaint_Received_Date = ""; }
            if ($scope.Investigation_Done_By == undefined) { $scope.Investigation_Done_By = ""; }
            if ($scope.Compensation_Status == undefined) { $scope.Compensation_Status = ""; }


            if ($scope.Complaint_Registered_Date == undefined) { $scope.Complaint_Registered_Date = ""; }
            if ($scope.Investigation_Remarks == undefined) { $scope.Investigation_Remarks = ""; }
            if ($scope.Approved_Date == undefined) { $scope.Approved_Date = ""; }

            if ($scope.Complaint_Attendent_Date == undefined) { $scope.Complaint_Attendent_Date = ""; }
            if ($scope.SalesRepresentativeEmployeeCode == undefined) { $scope.SalesRepresentativeEmployeeCode = ""; }
            if ($scope.Digital_Sign == true) { } else { $scope.Digital_Sign = false }

            if ($scope.Complaint_Description == undefined) { $scope.Complaint_Description = ""; }
            if ($scope.SalesRepresentativeEmployeeName == undefined) { $scope.SalesRepresentativeEmployeeName = ""; }

            if ($scope.Customer_Code == undefined) { $scope.Customer_Code = ""; }
            if ($scope.Contact_Person == undefined) { $scope.Contact_Person = ""; }
            if ($scope.SubStockiest_Direct_Customer == undefined) { $scope.SubStockiest_Direct_Customer = ""; }

            if ($scope.Customer_Name == undefined) { $scope.Customer_Name = ""; }
            if ($scope.Contact_Number == undefined) { $scope.Contact_Number = ""; }
            if ($scope.Customer_Type == undefined) { $scope.Customer_Type = ""; }
            if ($scope.Customer_Fax == undefined) { $scope.Customer_Fax = ""; }
            if ($scope.Is_Project_Party == true) { } else { $scope.Is_Project_Party = false }


            if ($scope.Customer_Location == undefined) { $scope.Customer_Location = ""; }
            if ($scope.Customer_Email == undefined) { $scope.Customer_Email = ""; }
            if ($scope.Site_Address == undefined) { $scope.Site_Address = ""; }

            if ($scope.Contact_City == undefined) { $scope.Contact_City = ""; }
            if ($scope.Product_Type == undefined) { $scope.Product_Type = ""; }
            if ($scope.Contact_State == undefined) { $scope.Contact_State = ""; }
            if ($scope.Product_Category == undefined) { $scope.Product_Category = ""; }
            if ($scope.Contact_Area == undefined) { $scope.Contact_Area = ""; }

            if ($scope.Invoice_Based == true) { } else { $scope.Invoice_Based = false }
            if ($scope.Period_Based == true) { } else { $scope.Period_Based = false }

            if ($scope.Date_Supply_From == undefined) { $scope.Date_Supply_From = ""; }
            if ($scope.Date_Supply_TO == undefined) { $scope.Date_Supply_TO = ""; }
            if ($scope.Invoice_Details == undefined) { $scope.Invoice_Details = ""; }
            if ($scope.Product_Details == undefined) { $scope.Product_Details = ""; }
            if ($scope.Digital_Sign == undefined) { $scope.Digital_Sign = ""; }

            if ($("#Total_Supply_Qty_Mtrs_Compensation").val() == undefined) { $("#Total_Supply_Qty_Mtrs_Compensation").val("0.0"); }
            if ($("#Total_Supply_Qty_Tons_Compensation").val() == undefined) { $("#Total_Supply_Qty_Tons_Compensation").val("0.0"); }
            if ($("#Total_Breakage_Qty_Mtrs_Compensation").val() == undefined) { $("#Total_Breakage_Qty_Mtrs_Compensation").val("0.0"); }
            if ($("#Total_Breakage_Qty_Tons_Compensation").val() == undefined) { $("#Total_Breakage_Qty_Tons_Compensation").val("0.0"); }


            if ($("#Total_Recovery_Mtrs_Compensation").val() == undefined) { $("#Total_Recovery_Mtrs_Compensation").val("0.0"); }
            if ($("#Total_Recovery_Tons_Compensation").val() == undefined) { $("#Total_Recovery_Tons_Compensation").val("0.0"); }
            if ($("#Net_Loss_Mtrs_Compensation").val() == undefined) { $("#Net_Loss_Mtrs_Compensation").val("0.0"); }
            if ($("#Net_Loss_Tons_Compensation").val() == undefined) { $("#Net_Loss_Tons_Compensation").val("0.0"); }
            // alert($scope.Compensation_Mode_Code);
            //  return;
            if ($scope.Compensation_Mode == undefined) { $scope.Compensation_Mode = ""; }
            if ($scope.Compensation_Mode_Code == undefined) { $scope.Compensation_Mode_Code = ""; }
            if ($scope.Compensation_Mode_ID == undefined) { $scope.Compensation_Mode_ID = ""; }


            if ($scope.Any_Special_Remarks == undefined) { $scope.Any_Special_Remarks = ""; }
            if ($("#Compensation_In_Running_Meters").val() == undefined) { $("#Compensation_In_Running_Meters").val("0.0"); }
            if ($("#Compensation_In_Tons").val() == undefined) { $("#Compensation_In_Tons").val("0.0"); }

            if ($("#Compensation_In_Running_Meter_Words").val() == undefined) { $("#Compensation_In_Running_Meter_Words").val(""); }
            if ($("#Size_Recommendation_RMTS").val() == undefined) { $("#Size_Recommendation_RMTS").val("0.0"); }
            if ($("#No_of_36").val() == undefined) { $("#No_of_36").val(""); }
            if ($("#Other_Size_RMTS").val() == undefined) { $("#Other_Size_RMTS").val("0.0"); }


            if ($scope.CompensationInNos == undefined) {
                $scope.CompensationInNos = "";
                $scope.CompensationInNos = $("#CompensationInNos").val();
            }


            if ($scope.CompensationinMetricCubic == undefined) { $scope.CompensationinMetricCubic = ""; }
            if ($scope.CompensationinMetricCubicValue == undefined) { $scope.CompensationinMetricCubicValue = ""; }
            if ($("#CompensationInNosWords").val() == undefined) { $("#CompensationInNosWords").val(""); }
            if ($scope.CompensationIssueCreditNote == undefined) { $scope.CompensationIssueCreditNote = ""; }
            if ($scope.CompensationIssueCreditNote == undefined) { $scope.CompensationIssueCreditNote = ""; }
            if ($scope.CompensationAmountCredited == undefined) { $scope.CompensationAmountCredited = ""; }


            if ($scope.ID == undefined || $scope.ID == "") {
                $scope.ID = "0";
            }

            if ($scope.SALES_REPRESENTATIVE_ID == undefined || $scope.SALES_REPRESENTATIVE_ID == "") {
                $scope.SALES_REPRESENTATIVE_ID = "0";
            }
            //alert("saveProductTpe:" + $scope.Product_Type);
            var Modified_Product_Type = $scope.Product_Type;

            if ($scope.Product_Type == "SBU1" || $scope.Product_Type == "Sheeting") {
                $scope.Product_Type = "SBU1";
            }
            else if ($scope.Product_Type == "SBU2" || $scope.Product_Type == "Aerocon") {
                $scope.Product_Type = "SBU2";
            }
            else if ($scope.Product_Type == "SBU3" || $scope.Product_Type == "Insulation") {
                $scope.Product_Type = "SBU3";
            }

            var MSD_id = $scope.MSD_id;
            if (MSD_id == undefined) { MSD_id = ""; }
            var Material_SupplyDetails = new Array();
            //debugger
            if (MSD_id == "") {
                MSD_id = $("#Material_Supply_Detail_Table tbody tr").length + 1;
                for (var RowId = 1 ; RowId <= (MSD_id - 1) ; RowId++) {
                    var LineIDTABLE = $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[14].innerHTML;
                    if (LineIDTABLE == undefined || LineIDTABLE == "") {
                        LineIDTABLE = "";
                        Material_SupplyDetails.push({
                            SlNo: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[0].innerHTML,
                            MaterialBelongsTo: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[1].innerHTML,
                            ProductSuppliedFrom: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[2].innerHTML,
                            Name: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[3].innerHTML,
                            UOM: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[4].innerHTML,
                            SupplyQty: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[5].innerHTML,
                            BreakageQty: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[6].innerHTML,
                            NetLossQty: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[7].innerHTML,
                            MaterialBelongsToPlantCode: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[8].innerHTML,
                            MaterialBelongsToPlantId: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[9].innerHTML,
                            ProductSupplyType_Code: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[10].innerHTML,
                            ProductSupplyType_ID: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[11].innerHTML,
                            NameSupply_Code: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[10].innerHTML,
                            NameSupply_ID: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[11].innerHTML,
                            LineID: LineIDTABLE,
                            OperationName: "MaterialSupplyLinesSaving",
                            OperationType: "Save"
                        });
                    }
                    //alert($("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[1].innerHTML);
                }
            }

            var Breakage_Investigation = new Array();
            var BID_id = $scope.BID_id;
            // alert(BID_id);
            if (BID_id == undefined) { BID_id = ""; }
            if (BID_id == "") {
                BID_id = $("#Breakage_Investigation_Details_Table tbody tr").length + 1;
                for (var RowId = 1 ; RowId <= (BID_id - 1) ; RowId++) {
                    var LineIDTABLE = $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[17].innerHTML;
                    if (LineIDTABLE == undefined || LineIDTABLE == "") {
                        LineIDTABLE = "";
                        Breakage_Investigation.push({
                            SlNo: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[0].innerHTML,
                            ItemName: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[1].innerHTML,
                            Size: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[2].innerHTML,
                            Grossweight: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[3].innerHTML,
                            SuppliedQty_Nos: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[4].innerHTML,
                            Supplied_Qty_M: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[5].innerHTML,
                            Supplied_Qty_Ton: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[6].innerHTML,
                            Breakage_Qty_Nos: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[7].innerHTML,

                            Breakage_Qty_M: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[8].innerHTML,
                            Breakage_Qty_Ton: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[9].innerHTML,
                            Breakage: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[10].innerHTML,
                            Defect_Type: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[11].innerHTML,
                            Remarks: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[12].innerHTML,

                            Product_Code: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[13].innerHTML,
                            Product_Id: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[14].innerHTML,

                            Defect_Type_Code: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[16].innerHTML,
                            Defect_Type_Id: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[15].innerHTML,
                            LineID: LineIDTABLE,
                            OperationName: "BreakageInvestigationLinesSaving",
                            OperationType: "Save"
                        });
                    }
                }
            }
            //alert(Breakage_Investigation);



            var CompensationSizelines = new Array();
            var CompensationSize_id = $scope.CompensationSize_id;

            if (CompensationSize_id == undefined) { CompensationSize_id = ""; }
            if (CompensationSize_id == "") {
                CompensationSize_id = $("#CompensationSizeLines_Details_Table tbody tr").length + 1;

                for (var RowId = 1 ; RowId <= (CompensationSize_id - 1) ; RowId++) {

                    var LineIDTABLE = $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[7].innerHTML;

                    if (LineIDTABLE == undefined || LineIDTABLE == "") {
                        LineIDTABLE = "";
                        //alert("sdfg " + $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[2].innerHTML);
                        CompensationSizelines.push({
                            SlNo: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[0].innerHTML,
                            RecommendedSize: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[1].innerHTML,
                            Nos: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[2].innerHTML,
                            GrossWeight: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[3].innerHTML,
                            Tons: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[4].innerHTML,
                            ProductCode: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[3].innerHTML,
                            ProductID: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[4].innerHTML,
                            OperationName: "CompensationSizeLinesSaving",
                            OperationType: "Save",
                            LineID: LineIDTABLE
                        });
                    }

                }

            }


            var Breakage_Otherlines = new Array();
            var BreakOtherID_id = $scope.BreakOtherID_id;
            if (BreakOtherID_id == undefined) { BreakOtherID_id = ""; }
            if (BreakOtherID_id == "") {

                BreakOtherID_id = $("#Breakage_OtherLines_Details_Table tbody tr").length + 1;

                for (var RowId = 1 ; RowId <= (BreakOtherID_id - 1) ; RowId++) {

                    var LineIDTABLE = $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[8].innerHTML;


                    if (LineIDTABLE == undefined || LineIDTABLE == "") {

                        LineIDTABLE = "";
                        Breakage_Otherlines.push({
                            SlNo: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[0].innerHTML,
                            SuppliedQty: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[1].innerHTML,
                            TotalBreakageQty: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[2].innerHTML,
                            TotalBreakageQtyPercentage: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[3].innerHTML,
                            AllowedBreakagePercentage: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[4].innerHTML,
                            ActualBreakageQtyNos: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[5].innerHTML,
                            Transporter: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[6].innerHTML,
                            Remarks: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[7].innerHTML,
                            OperationName: "BreakageOtherLinesSaving",
                            OperationType: "Save",
                            LineID: LineIDTABLE
                        });

                    }
                }
            }
            //For Saving Breakage Lines SBU2
            var Breakage_Otherlines_SBU2 = new Array();
            if ($("#Supply_Details_Table_SBU2 tbody tr").length > 0) {
                $("#Supply_Details_Table_SBU2 tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    Breakage_Otherlines_SBU2.push({
                        LineID: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[15].innerHTML == "undefined" ? "" : $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[15].innerHTML,
                        ProdCode: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[1].innerHTML,
                        InvoiceNo: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[3].innerHTML,

                        InvoiceDate: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[4].innerHTML,
                        BatchNo: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[5].innerHTML,
                        SupplyQty: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[6].innerHTML,

                        DefectQty: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[7].innerHTML,
                        BreakageQtyPer_SBU2: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[8].innerHTML,
                        AllowedBreakageQtyPer_SBU2: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[9].innerHTML,
                        ActualBreakageQtyNos_SBU2: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[10].innerHTML,

                        Transporter: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[11].innerHTML,
                        Remarks: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[13].innerHTML,

                        DefectType: $("#Supply_Details_Table_SBU2 tbody #" + RowId + " td")[14].innerHTML,
                        OperationName: "BreakageOtherLinesSaving_SBU2",
                        OperationType: "Save",

                    });
                });
            }
            // $scope.SaveBIDData();
            // return;
            // alert($scope.Compensation_In_Running_Meter_Words.trim());
            //alert(Breakage_Otherlines);

            if ($scope.ID == "No data available in table") {
                alert($scope.ID);
                $scope.ID = "0";
            }

            var TYPE_OF_COMPLAINT_ID = $("#TYPE_OF_COMPLAINT_ID").val()
            if (typeof TYPE_OF_COMPLAINT_ID == "undefined" || TYPE_OF_COMPLAINT_ID == "") {
                TYPE_OF_COMPLAINT_ID = 0;
            }

            var Total_CompensationData = JSON.stringify({
                "OperationName": "EditCompensationData",
                "CompensationID": $scope.ID,
                "Investigation_Num": $scope.Investigation_Num,
                "Investigation_Date": $scope.Investigation_Date,
                "Compensation_Id": $scope.Compensation_Id,
                "Complaint_No": $scope.Complaint_No,
                "Site_Visit_Date": $scope.Site_Visit_Date,
                "COMP_Series_Code": $scope.COMP_Series_Code,
                "Complaint_Tracking_No": $scope.Complaint_Tracking_No,
                "Previous_Visit_Date": $scope.Previous_Visit_Date,
                "Compensation_Date": $scope.Compensation_Date,
                "Complaint_Received_Date": $scope.Complaint_Received_Date,
                "Investigation_Done_By": $scope.Investigation_Done_By,
                "Compensation_Status": $scope.Compensation_Status,
                "Complaint_Registered_Date": $scope.Complaint_Registered_Date,
                "Investigation_Remarks": $scope.Investigation_Remarks,
                //"Digital_Sign": $scope.Digital_Sign,
                "Digital_Sign": $("#Digital_Sign").prop("checked"),
                "Approved_Date": $scope.Approved_Date,
                "Complaint_Attendent_Date": $scope.Complaint_Attendent_Date,
                "SalesRepresentativeEmployeeCode": $scope.SalesRepresentativeEmployeeCode,
                "Complaint_Description": $scope.Complaint_Description,
                "SalesRepresentativeEmployeeName": $scope.SalesRepresentativeEmployeeName,
                "Customer_Code": $scope.Customer_Code,
                "Customer_ID": $scope.Customer_ID,
                "CustomerType_Code": $scope.CustomerType_Code,
                "CustomerType_ID": $scope.CustomerType_ID,
                "Contact_Person": $scope.Contact_Person,
                "SubStockiest_Direct_Customer": $scope.SubStockiest_Direct_Customer,
                "Customer_Name": $scope.Customer_Name,
                "Contact_Number": $scope.Contact_Number,
                "Customer_Type": $scope.Customer_Type,
                "Customer_Fax": $scope.Customer_Fax,
                "Is_Project_Party": $scope.Is_Project_Party,
                "Customer_Location": $scope.Customer_Location,
                "Customer_Email": $scope.Customer_Email,
                "Site_Address": $scope.Site_Address,
                "Contact_City": $scope.Contact_City,
                "CityID": $scope.CityID,
                "CityCode": $scope.CityCode,
                "Product_Type": $scope.Product_Type,
                "ProductType_ID": $scope.ProductType_ID,
                "ProductType_Code": $scope.ProductType_Code,
                "Contact_State": $scope.Contact_State,
                "StateCode": $scope.StateCode,
                "StateID": $scope.StateID,
                "Product_Category": $scope.Product_Category,
                "ProductCategory_Code": $scope.ProductCategory_Code,
                "ProductCategory_ID": $scope.ProductCategory_ID,
                "Contact_Area": $scope.Contact_Area,
                "AreaCode": $scope.AreaCode,
                "AreaID": $scope.AreaID,
                "Invoice_Based": $scope.Invoice_Based,
                "Period_Based": $scope.Period_Based,
                "Date_Supply_From": $scope.Date_Supply_From,
                "Date_Supply_TO": $scope.Date_Supply_TO,
                "Invoice_Details": $('#Invoice_Details').val(),
                "Product_Details": $scope.Product_Details,
                "Total_Supply_Qty_Mtrs": $("#Total_Supply_Qty_Mtrs_Compensation").val(),
                "Total_Supply_Qty_Tons": $("#Total_Supply_Qty_Tons_Compensation").val(),
                "Total_Breakage_Qty_Mtrs": $("#Total_Breakage_Qty_Mtrs_Compensation").val(),
                "Total_Breakage_Qty_Tons": $("#Total_Breakage_Qty_Tons_Compensation").val(),
                "Total_Recovery_Mtrs": $("#Total_Recovery_Mtrs_Compensation").val(),
                "Total_Recovery_Tons": $("#Total_Recovery_Tons_Compensation").val(),
                "Net_Loss_Mtrs": $("#Net_Loss_Mtrs_Compensation").val(),
                "Net_Loss_Tons": $("#Net_Loss_Tons_Compensation").val(),
                "Compensation_Mode": $scope.Compensation_Mode,
                "Compensation_Mode_Code": $scope.Compensation_Mode_Code,
                "Compensation_Mode_ID": $scope.Compensation_Mode_ID,
                "Any_Special_Remarks": $scope.Any_Special_Remarks,
                "Compensation_In_Running_Meters": $("#Compensation_In_Running_Meters").val(),
                "Compensation_In_Tons": $("#Compensation_In_Tons").val(),
                "Compensation_In_Running_Meter_Words": $("#Compensation_In_Running_Meter_Words").val(),
                "Size_Recommendation_RMTS": $("#Size_Recommendation_RMTS").val(),
                "No_of_36": $("#No_of_36").val(),
                "Other_Size_RMTS": $("#Other_Size_RMTS").val(),
                "Plant_Code": "",
                //"CREATED_BY": $scope.UserName,
                "CREATED_BY": $("#USERCODE_Compensation").val(),
                "CREATED_DATE": $scope.Compensation_Date,
                "CompensationDocStatus_CM": $scope.Compensation_Status,
                //"CompensationInNos": $scope.CompensationInNos,
                "CompensationInNos": $("#CompensationInNos").val(),
                "CompensationInNosWords": $("#CompensationInNosWords").val(),
                "CompensationinMetricCubic": $("#CompensationinMetricCubic").val(),
                "CompensationinMetricCubicValue": $scope.CompensationinMetricCubicValue,
                "CompensationIssueCreditNote": $scope.CompensationIssueCreditNote,
                "CompensationAmountCredited": $scope.CompensationAmountCredited,
                "SALES_REPRESENTATIVE_ID": $scope.SALES_REPRESENTATIVE_ID,
                "SavingType": "HeadSave",
                CMMaterialSupplyLinesDetails: Material_SupplyDetails,
                CMBreakageInvestigationLinesDetails: Breakage_Investigation,
                CompensationSizeLinesDetails: CompensationSizelines,
                CMBreakageOtherLinesDetails: Breakage_Otherlines,
                CMBreakageOtherLinesDetails_SBU2: Breakage_Otherlines_SBU2,
                OperationType: "Save",
                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                party_type: $("#party_type_id").val(),
                SubStockiest_Code: $("#SubStockiest_Code").val(),
                SubStockiest_ID: $("#SubStockiest_ID").val(),
                SubStockiest_Name: $("#SubStockiest_Name").val(),
                SubStockiest_Address: $("#SubStockiest_Address").val(),
                SubStockiest_Number: $("#SubStockiest_Number").val(),
                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                TYPE_OF_COMPLAINT: TYPE_OF_COMPLAINT_ID
                    //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end
            });

            //if ($('#ApproveSave').val() == "ApproveSave")

            //alert(Total_CompensationData);

            var MyTest = $("#ApproveSave").val();

            //svprasadk 28-05-2020 auto saving the compensation to hide below code start
            //if (MyTest == "") {
            //    if (confirm("Do you want to Save data?")) {
            //    }
            //    else {
            //        return;
            //    }
            //}
            //svprasadk 28-05-2020 auto saving the compensation to hide below code end

             if (confirm("Do you want to Save data?")) {

            DIMSFactory.saveCompensationData(Total_CompensationData).success(function (DATA) {
                var response = DATA.tabledata;


                if (response != "FALSE") {
                    var result = response.split('+');
                    $scope.ID = result[1];
                    $scope.Compensation_Id = result[1];

                    $("#CompFormIden").val(result[1]);

                    var BreakagesLineIds = result[0];
                    var MaterialLineIds = result[0];
                    var RecommendedLines = result[0];
                    var BreakageOtherLineIds = result[0];
                    var BreakageOtherLineIds_SBU2 = result[0];
                    if (MaterialLineIds.indexOf('$') > -1) {
                        //BreakagesLineIds = MaterialLineIds.split('$');
                        //MaterialLineIds = BreakagesLineIds[0];
                        if (MaterialLineIds.split('$')[1].indexOf(')') > -1) {
                            BreakagesLineIds = MaterialLineIds.split('$')[1];
                        }
                        else if (MaterialLineIds.split('$')[1].indexOf('%') > -1) {
                            RecommendedLines = MaterialLineIds.split('$')[1];
                        }
                        else if (MaterialLineIds.split('$')[1].indexOf('!') > -1) {
                            BreakageOtherLineIds = MaterialLineIds.split('$')[1];
                        }
                        MaterialLineIds = MaterialLineIds.split('$')[0];

                        if (MaterialLineIds.indexOf('&&') > -1) {
                            MaterialLineIds = MaterialLineIds.split('&&');
                            for (var i = 0; i < MaterialLineIds.length; i++) {
                                var id = parseInt(i + 1);
                                $('#MSD_' + id + '').find('td:last').html(MaterialLineIds[i]);
                            }
                        } else {
                            $('#MSD_1').find('td:last').html(MaterialLineIds);
                        }
                    } else {

                    }

                    if (BreakagesLineIds.indexOf(')') > -1) {
                        //BreakagesLineIds = BreakagesLineIds.split(')');
                        if (BreakagesLineIds.split(')')[1].indexOf('%') > -1) {
                            RecommendedLines = BreakagesLineIds.split(')')[1];
                        }
                        else if (BreakagesLineIds.split(')')[1].indexOf('!') > -1) {
                            BreakageOtherLineIds = BreakagesLineIds.split(')')[1];
                        }
                        BreakagesLineIds = BreakagesLineIds.split(')')[0];

                        // RecommendedLines = BreakagesLineIds[1];
                        if (BreakagesLineIds.indexOf('&&') > -1) {
                            BreakagesLineIds = BreakagesLineIds.split('&&');
                            for (var i = 0; i < BreakagesLineIds.length; i++) {
                                var id = parseInt(i + 1);
                                $('#BID_' + id + '').find('td:last').html(BreakagesLineIds[i]);
                            }
                        } else {
                            $('#BID_1').find('td:last').html(BreakagesLineIds);
                        }
                    } else {

                    }

                    if (RecommendedLines.indexOf('%') > -1) {
                        //BreakageOtherLineIds = RecommendedLines.split('%');
                        //BreakageOtherLineIds = BreakageOtherLineIds[1];

                        if (RecommendedLines.split('%')[1].indexOf('!') > -1) {
                            BreakageOtherLineIds = RecommendedLines.split('%')[1];
                        }
                        RecommendedLines = RecommendedLines.split('%')[0];

                        if (RecommendedLines.indexOf('^') > -1) {
                            RecommendedLines = RecommendedLines.split('^');
                            for (var i = 0; i < RecommendedLines.length; i++) {
                                var id = parseInt(i + 1);
                                $('#COMPSIZE_' + id + '').find('td:last').html(RecommendedLines[i]);
                            }
                        } else {
                            $('#COMPSIZE_1').find('td:last').html(RecommendedLines);
                        }
                    } else {

                    }


                    if (BreakageOtherLineIds.indexOf('!') > -1) {
                        RecommendedLines = BreakageOtherLineIds.split('!');
                        BreakageOtherLineIds = RecommendedLines[0];
                        // RecommendedLines = RecommendedLines[1];
                        if (BreakageOtherLineIds.indexOf('_') > -1) {
                            BreakageOtherLineIds = BreakageOtherLineIds.split('_');

                            for (var i = 0; i < BreakageOtherLineIds.length; i++) {
                                var id = parseInt(i + 1);
                                $('#BOTHERID_' + id + '').find('td:last').html(BreakageOtherLineIds[i]);
                            }
                        } else {
                            $('#BOTHERID_1').find('td:last').html(BreakageOtherLineIds);
                        }
                    } else {

                    }
                    if (BreakageOtherLineIds_SBU2.indexOf('?') > -1) {
                        RecommendedLines = BreakageOtherLineIds_SBU2.split('?');
                        var OtherLines_SBU2 = RecommendedLines[0].split('!');
                        BreakageOtherLineIds_SBU2 = OtherLines_SBU2[1];
                        if (BreakageOtherLineIds_SBU2.indexOf('_') > -1) {
                            BreakageOtherLineIds_SBU2 = BreakageOtherLineIds_SBU2.split('_');

                            for (var i = 0; i < BreakageOtherLineIds_SBU2.length; i++) {
                                var id = parseInt(i + 1);
                                $("#Supply_Details_Table_SBU2 tbody #SDB_" + id + " td")[15].innerHTML = BreakageOtherLineIds_SBU2[i];
                            }
                        } else {
                            $("#Supply_Details_Table_SBU2 tbody #SDB_1 td")[15].innerHTML = BreakageOtherLineIds_SBU2;
                        }
                    } else {

                    }
                    //var result = response.split('$$');
                    //$scope.ID = result[1];
                    //$scope.Compensation_Id = result[1];
                    if (MyTest == "") {

                        if ($("#Compensation_Status").val() == "Approved" || $("#Compensation_Status").val() == "Rejected") {
                            $('#SendForApproval').css("display", "none");
                        }
                        else {
                            $('#SendForApproval').css("display", "block");
                        }

                        alert("Saved successfully");
                        // $scope.go('CompensationList');
                    }

                    if ($("#Product_Category").val() == "Blocks") {
                        $("#CompensationinMetricCubic").val("Cubic Meters");
                        //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                    }
                    else {
                        $("#CompensationinMetricCubic").val("Metric Tons");
                        //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                    }

                    if (Modified_Product_Type == "SBU1" || Modified_Product_Type == "Sheeting") {
                        $scope.Product_Type = "SBU1";
                    }
                    else if (Modified_Product_Type == "SBU2" || Modified_Product_Type == "Aerocon") {
                        $scope.Product_Type = "SBU2";
                    }
                    else if ($scope.Product_Type == "SBU3" || $scope.Product_Type == "Insulation") {
                        $scope.Product_Type = "SBU3";
                    }

                    $("#ApproveSave").val("");
                    SaveCompensationLinesSBU3();
                }
                else {
                    alert("Error in saving");
                }
            },
            function errorCallback(response) {
                alert("Error : " + response);
            });


            }
        }

        //}
        //else {
        //    //alert("Document Status with Waiting for approval will not allow editing")
        //}
    }

    // Retrieving Child Data(Material supply details,Breakage Investigation details and Breakage Other lines) based on Investigation No
    $scope.getMaterialSupplyDetails = function (InvestigationNo) {
        var SITEDETAIL_CODE = $scope.SiteDetailed_Code;
        var COMPANYDETAIL_CODE = $scope.CompanyDetailed_Code;
        var Data = JSON.stringify({
            MasterType: "InvestigationMaterialSupply",
            ID: InvestigationNo,
            SITEDETAIL_CODE: SITEDETAIL_CODE,
            COMPANYDETAIL_CODE: COMPANYDETAIL_CODE
        });

        DIMSFactory.getCompensationChildData(Data).success(function (response) {

            var Result = JSON.parse(response.tabledata);

            if (Result != "") {
                $("#SubStockiest_CodeDiv").hide();
                $("#SubStockiest_NameDiv").hide();
                $("#SubStockiest_AddressDiv").hide();
                $("#SubStockiest_NumberDiv").hide();
                $("#SubStockiest_ID").val("");
                $("#SubStockiest_Code").val("");
                $("#SubStockiest_Name").val("");
                $("#SubStockiest_Address").val("");
                $("#SubStockiest_Number").val("");
                var InvestigationHeaderDetails = Result["InvestigationHeaderDetails"];
                //console.log('InvestigationHeaderDetails', InvestigationHeaderDetails)
                if (InvestigationHeaderDetails[0]["Invoice_Based"] == "" || InvestigationHeaderDetails[0]["Invoice_Based"] == null || InvestigationHeaderDetails[0]["Invoice_Based"] == "False" || InvestigationHeaderDetails[0]["Invoice_Based"] == "false") {
                    $scope.Invoice_Based = false;
                    $("#InvoiceBasedDiv").hide();

                }
                else {
                    $("#InvoiceBasedDiv").show();
                    $scope.Invoice_Based = true;

                    $(".InvoiceBasedClass").css('display', 'block');
                    $(".PeriodBasedClass").css('display', 'none');

                }
                if (InvestigationHeaderDetails[0]["FREQUENCY_BASED"] == "" || InvestigationHeaderDetails[0]["FREQUENCY_BASED"] == null || InvestigationHeaderDetails[0]["FREQUENCY_BASED"] == "False" || InvestigationHeaderDetails[0]["FREQUENCY_BASED"] == "false") {
                    $scope.Period_Based = false;


                }
                else {

                    $(".InvoiceBasedClass").css('display', 'none');
                    $(".PeriodBasedClass").css('display', 'block');

                    $scope.Period_Based = true;
                }

                $("#CompCategory").val(InvestigationHeaderDetails[0]["CompCate"]);

                $scope.Date_Supply_From = InvestigationHeaderDetails[0]["Date_Supply_From"];

                $scope.Date_Supply_TO = InvestigationHeaderDetails[0]["Date_Supply_To"];

                $scope.SubStockiest_Direct_Customer = InvestigationHeaderDetails[0]["END_CUSTOMER_DETAILS"];


                $scope.Invoice_Details = InvestigationHeaderDetails[0]["InvoiceDetails"];
                $('#Invoice_Details').text(InvestigationHeaderDetails[0]["InvoiceDetails"]);
                $scope.Product_Details = InvestigationHeaderDetails[0]["ProductDetails"];

                $scope.Total_Supply_Qty_Mtrs = InvestigationHeaderDetails[0]["TOTAL_SUPPLY"];
                $scope.Total_Breakage_Qty_Mtrs = InvestigationHeaderDetails[0]["Total_Breakage"];
                $scope.Total_Recovery_Mtrs = InvestigationHeaderDetails[0]["Total_Recovery"];
                $scope.Net_Loss_Mtrs = InvestigationHeaderDetails[0]["Net_Loss"];
                $scope.Compensation_In_Running_Meters = InvestigationHeaderDetails[0]["Net_Loss"];

                $scope.Total_Supply_Qty_Tons = InvestigationHeaderDetails[0]["TOTAL_SUPPLY_TON"];
                $scope.Total_Breakage_Qty_Tons = InvestigationHeaderDetails[0]["TOTAL_BREAKAGE_TONS"];
                $scope.Total_Recovery_Tons = InvestigationHeaderDetails[0]["TOTAL_RECOVERY_TONS"];
                $scope.Net_Loss_Tons = InvestigationHeaderDetails[0]["NET_LOSS_TONS"];
                $scope.Compensation_In_Tons = InvestigationHeaderDetails[0]["NET_LOSS_TONS"];

                //alert(toWords($scope.Compensation_In_Running_Meters));

                //$scope.Compensation_In_Running_Meter_Words = toWords($scope.Compensation_In_Running_Meters);

                $("#Compensation_In_Running_Meter_Words").val(toWords($scope.Compensation_In_Running_Meters));

                //svprasadk 25-06-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage start
                $scope.COMPENSATION_IN_METER_OTHER = InvestigationHeaderDetails[0]["COMPENSATION_IN_METER_OTHER"];

                $scope.Compensation_Mode = InvestigationHeaderDetails[0]["COMPENSATION_MODE_NAME"];
                $scope.Compensation_Mode_Code = InvestigationHeaderDetails[0]["COMPENSATION_MODE_CODE"];
                $scope.Compensation_Mode_ID = InvestigationHeaderDetails[0]["COMPENSATION_MODE_ID"];
                $scope.Any_Special_Remarks = InvestigationHeaderDetails[0]["COMMENTS_APPROVALS_SALES_OTHERS"];

                if (InvestigationHeaderDetails[0]["COMPENSATION_IN_METERS_SHEET"] != "" && InvestigationHeaderDetails[0]["COMPENSATION_IN_METERS_SHEET"] != null)
                    $scope.Compensation_In_Running_Meters = InvestigationHeaderDetails[0]["COMPENSATION_IN_METERS_SHEET"];

                $("#Compensation_In_Running_Meter_Words").val(InvestigationHeaderDetails[0]["COMPENSATION_IN__METER_WORDS_SHEET"]);

                if (InvestigationHeaderDetails[0]["RECOMMENDED_SIZE"] != "" && InvestigationHeaderDetails[0]["RECOMMENDED_SIZE"] != null) {
                    $scope.Size_Recommendation_RMTS = InvestigationHeaderDetails[0]["RECOMMENDED_SIZE"];
                    var No_Of_36 = parseInt(($scope.Size_Recommendation_RMTS) / (3.6));
                    $("#No_of_36").val(No_Of_36);
                }
                else {
                    $("#No_of_36").val("0");
                    $("#Size_Recommendation_RMTS").val("0");
                }

                if (InvestigationHeaderDetails[0]["OTHER_SIZE"] != "" && InvestigationHeaderDetails[0]["OTHER_SIZE"] != null)
                    $scope.Other_Size_RMTS = (InvestigationHeaderDetails[0]["OTHER_SIZE"]).toFixed(3);

                if (InvestigationHeaderDetails[0]["COMPENSATION_IN_TONS"] != "" && InvestigationHeaderDetails[0]["COMPENSATION_IN_TONS"] != null)
                    $scope.Compensation_In_Tons = InvestigationHeaderDetails[0]["COMPENSATION_IN_TONS"];

                if (InvestigationHeaderDetails[0]["COMPENSATION_IN_NO"] != "" && InvestigationHeaderDetails[0]["COMPENSATION_IN_NO"] != null)
                    $scope.CompensationInNos = InvestigationHeaderDetails[0]["COMPENSATION_IN_NO"];

                $scope.CompensationInNosWords = InvestigationHeaderDetails[0]["COMPENSATION_IN_WORD"];

                if (InvestigationHeaderDetails[0]["COMPENSATION_IN_CUBIC_METER"] != "" && InvestigationHeaderDetails[0]["COMPENSATION_IN_CUBIC_METER"] != null)
                    $scope.CompensationinMetricCubicValue = InvestigationHeaderDetails[0]["COMPENSATION_IN_CUBIC_METER"];

                if (InvestigationHeaderDetails[0]["ISSUE_CREDIT_NOTE"] == "True" || InvestigationHeaderDetails[0]["ISSUE_CREDIT_NOTE"] == "true") {
                    $scope.CompensationIssueCreditNote = true;
                    $scope.IssueCredited();
                }
                else {
                    $scope.CompensationIssueCreditNote = false;
                }

                if (InvestigationHeaderDetails[0]["AMOUNT_CREDITED"] != "" && InvestigationHeaderDetails[0]["AMOUNT_CREDITED"] != null)
                    $scope.CompensationAmountCredited = InvestigationHeaderDetails[0]["AMOUNT_CREDITED"];
                //svprasadk 25-06-2020 SBU 1 requirement to add Compensation Recommendation in investigation stage end
                var MaterialSupplyDetails = [];
                if (Result.hasOwnProperty("MaterialSupplyDetails")) {
                    MaterialSupplyDetails = Result["MaterialSupplyDetails"];
                }
                var TRCode = "";
                $("#Material_Supply_Detail_Table tbody").empty();
                if (CompensationScope.Product_Type == "Sheeting" || CompensationScope.Product_Type == "SBU1" || CompensationScope.Product_Type == "SBU2" || (CompensationScope.Product_Type == "SBU3" && CompensationScope.ProductCategory_Code == "36")) {
                    for (var i = 0; i < MaterialSupplyDetails.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' ng-click='EditMSD(obj,$event)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["PLANT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["SUPPLY_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["UOM"] + "</td>";
                        if (MaterialSupplyDetails[i]["supply_qty"] == null || MaterialSupplyDetails[i]["supply_qty"] == "null") {
                            TRCode = TRCode + "<td></td>";
                        }
                        else {
                            TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["supply_qty"] + "</td>";
                        }
                        if (MaterialSupplyDetails[i]["breakage_qty"] == null || MaterialSupplyDetails[i]["breakage_qty"] == "null") {
                            TRCode = TRCode + "<td></td>";
                        }
                        else {
                            TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["breakage_qty"] + "</td>";
                        }
                        if (MaterialSupplyDetails[i]["NET_LOSS"] == null || MaterialSupplyDetails[i]["NET_LOSS"] == "null") {
                            TRCode = TRCode + "<td></td>";
                        }
                        else {
                            TRCode = TRCode + "<td>" + MaterialSupplyDetails[i]["NET_LOSS"] + "</td>";
                        }

                        TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["PLANT_CODE"] + "</td>";
                        //TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["PLANT_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";

                        TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_CODE"] + "</td>";

                        //TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_TYPE_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";

                        TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_CODE"] + "</td>";
                        //TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["SUPPLY_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        //TRCode = TRCode + "<td style='display:none;'>" + MaterialSupplyDetails[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        TRCode = TRCode + "</tr>";
                    }
                    var html = $compile(TRCode)($scope);
                    var el = angular.element($("#Material_Supply_Detail_Table tbody"));
                    el.append(html);
                    $compile(html)($scope);
                    $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                    $("#Mat_Sup_Det_BU3_Add").css("display", "none");
                    $("#Breakage_Investigation_Details_SBU3").css("display", "none");
                    $("#CompensationRecommSBU3Div").css("display", "none");
                    $("#Supply_Details_TableB").css("display", "none");
                    $("#Supply_Details_AddB").css("display", "none");

                }

                if (CompensationScope.Product_Type == "Sheeting" || CompensationScope.Product_Type == "SBU1") {

                    $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                    $("#Mat_Sup_Det_BU3_Add").css("display", "none");
                    $("#Breakage_Investigation_Details_SBU3").css("display", "none");
                    $("#CompensationRecommSBU3Div").css("display", "none");
                    $("#Supply_Details_TableB").css("display", "none");
                    $("#Supply_Details_AddB").css("display", "none");


                    $("#CompensationDiv_Sheeting").show();
                    $("#CompensationDiv_Aerocon").hide();
                    $("#CompensationSize_Details_Div").hide();
                    $("#CompensationQtyMtrTonsDiv").show();
                    var BreakageLinesDetails = Result["BreakageLinesDetails"];
                    TRCode = "";
                    $("#Breakage_Investigation_Details_Table tbody").empty();


                    $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                    $("#Mat_Sup_Det_BU3_Add").css("display", "none");


                    $("#lblSubStockiest_Direct_Customer").text("Sub-Stockiest/ Direct Customer");

                    for (var i = 0; i < BreakageLinesDetails.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='BID_" + (i + 1) + "' ng-click='EditBID(obj,$event)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SIZE_M"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;' >" + BreakageLinesDetails[i]["GROSS_WEIGHT"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SUPPLIED_QTY_NO"] + "</td>";

                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["SUPPLIED_QTY_M"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["SUPPLIED_QTY_TON"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["REJECTED_QTY_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["REJECTED_QTY_M"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["BREAKAGE_QTY_TON"] + "</td>";

                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["BREAKAGE_PERSENT"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageLinesDetails[i]["REMARKS"] + "</td>";


                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["PRODUCT_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["DEFECT_TYPE_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["DEFECT_TYPE_CODE"] + "</td>";

                        //TRCode = TRCode + "<td style='display:none;'>" + BreakageLinesDetails[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        TRCode = TRCode + "</tr>";



                    }
                    var html = $compile(TRCode)($scope);
                    var el = angular.element($("#Breakage_Investigation_Details_Table tbody"));
                    el.append(html);
                    $compile(html)($scope);
                }
                else if (CompensationScope.Product_Type == "SBU2" || (CompensationScope.Product_Type == "SBU3" && CompensationScope.ProductCategory_Code == "36")) {
                    $("#CompensationSize_Details_Div").show();
                    $("#CompensationDiv_Sheeting").hide();
                    $("#CompensationDiv_Aerocon").show();
                    $("#CompensationQtyMtrTonsDiv").hide();

                    $("#lblSubStockiest_Direct_Customer").text("Sub-Stockiest/ Direct Customer");

                    var BreakageOtherLinesDetails = Result["BreakageOtherLinesDetails"];
                    TRCode = "";

                    $("#Breakage_OtherLines_Details_Table tbody").empty();
                    for (var i = 0; i < BreakageOtherLinesDetails.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='BOTHERID_" + (i + 1) + "' ng-click='EditBOTHERID(obj,$event)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["SUPPLIED_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["BREAKAGE_QTY"] + "</td>";
                        var SuppliedQty = BreakageOtherLinesDetails[i]["SUPPLIED_QTY"];
                        var BreakageQty = BreakageOtherLinesDetails[i]["BREAKAGE_QTY"];
                        var TotalBreakageQty = "";
                        if (SuppliedQty != "" && BreakageQty != "") {
                            TotalBreakageQty = parseFloat((BreakageQty / SuppliedQty) * 100).toFixed(2);
                        } else {
                            TotalBreakageQty = "";
                        }
                        TRCode = TRCode + "<td>" + TotalBreakageQty + "</td>";
                        TRCode = TRCode + "<td></td>";

                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + BreakageOtherLinesDetails[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        TRCode = TRCode + "</tr>";

                    }
                    var html = $compile(TRCode)($scope);
                    var el = angular.element($("#Breakage_OtherLines_Details_Table tbody"));
                    el.append(html);
                    $compile(html)($scope)

                    //For Displaying item wise Supply Breakage Other Lines
                    var SupplyDetails_SBU2 = Result["Brk_Otr_Lines_SBU2"];
                    TRCode = "";
                    $("#Supply_Details_Table_SBU2 tbody").empty();
                    for (var i = 0; i < SupplyDetails_SBU2.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB_SBU2(this.id)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SupplyDetails_SBU2[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["SUPPLIED_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["BREAKAGE_QTY"] + "</td>";
                        var SuppliedQty = BreakageOtherLinesDetails[i]["SUPPLIED_QTY"];
                        var BreakageQty = BreakageOtherLinesDetails[i]["BREAKAGE_QTY"];
                        var TotalBreakageQty = "";
                        if (SuppliedQty != "" && BreakageQty != "") {
                            TotalBreakageQty = parseFloat((BreakageQty / SuppliedQty) * 100).toFixed(2);
                        } else {
                            TotalBreakageQty = "";
                        }
                        TRCode = TRCode + "<td>" + TotalBreakageQty + "</td>";
                        TRCode = TRCode + "<td></td>";

                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetails_SBU2[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyDetails_SBU2[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyDetails_SBU2[i]["LINE_ID"] + "</td>";
                        TRCode = TRCode + "</tr>";
                    }
                    $("#Supply_Details_Table_SBU2 tbody").append(TRCode);
                    //End Supply Details

                    $("#Material_Supply_Detail_Table_BU3").css("display", "none");
                    $("#Mat_Sup_Det_BU3_Add").css("display", "none");
                    $("#Breakage_Investigation_Details_SBU3").css("display", "none");
                    $("#CompensationRecommSBU3Div").css("display", "none");
                    $("#Supply_Details_TableB").css("display", "none");
                    $("#Supply_Details_AddB").css("display", "none");


                    var RecomendationLinesDetails = Result["RecomendationLinesDetails"];
                    TRCode = "";
                    // alert(JSON.stringify(RecomendationLinesDetails));
                    $("#CompensationSizeLines_Details_Table tbody").empty();
                    for (var i = 0; i < RecomendationLinesDetails.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='COMPSIZE_" + (i + 1) + "' ng-click='EditCompensationSizeLines(obj,$event)'><td>" + (i + 1) + "</td>";
                        TRCode = TRCode + "<td>" + RecomendationLinesDetails[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td></td>";

                        TRCode = TRCode + "<td>" + RecomendationLinesDetails[i]["GROSS_WEIGHT"] + "</td>";
                        TRCode = TRCode + "<td></td>";
                        TRCode = TRCode + "<td style='display:none;'>" + RecomendationLinesDetails[i]["PRODUCT_CODE"] + "</td>";

                        TRCode = TRCode + "<td  style='display:none;'>" + RecomendationLinesDetails[i]["PRODUCT_ID"] + "</td>";
                        TRCode = TRCode + "<td style='display:none;'></td>";
                        TRCode = TRCode + "</tr>";

                    }
                    var html = $compile(TRCode)($scope);
                    var el = angular.element($("#CompensationSizeLines_Details_Table tbody"));
                    el.append(html);
                    $compile(html)($scope)
                }

                else if (CompensationScope.Product_Type == "SBU3") {

                    $("#Material_Supply_Detail_Table").css("display", "none");
                    $("#Mat_Sup_Det_Add").css("display", "none");

                    $("#Breakage_OtherLines_Details_Table").css("display", "none");
                    $("#BRK_OtherLines_Det_Add").css("display", "none");

                    $("#Supply_Details_Table_SBU2").css("display", "none");

                    $("#CompensationSizeLines_Details_Table").css("display", "none");
                    $("#CompensationSize_Add").css("display", "none");

                    $("#Material_Supply_Detail_Table").css("display", "none");
                    $("#Mat_Sup_Det_Add").css("display", "none");
                    $("#CompensationinMetricCubicValueDivision").css("display", "none");

                    $("#lblSubStockiest_Direct_Customer").text("Distributor/ Wholesaler/ Dealer/ Project");


                    $("#CompensationSize_Details_Div").show();
                    $("#CompensationDiv_Sheeting").hide();
                    $("#CompensationDiv_Aerocon").show();
                    $("#CompensationQtyMtrTonsDiv").hide();

                    TRCode = "";
                    var MSFBU3Lines = Result["MSFBU3Lines"];
                    $("#Material_Supply_Detail_Table_BU3 tbody").empty();
                    for (var i = 0; i < MSFBU3Lines.length; i++) {


                        TRCode = TRCode + "<tr id='BU3MSD_" + (i + 1) + "' onclick='EditMSDBU3(this.id)' >";

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


                    TRCode = "";
                    var SupplyDetailsB = Result["SBU3Lines"];
var totalvalue=0;
                    $("#Supply_Details_TableB tbody").empty();
                    for (var i = 0; i < SupplyDetailsB.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='SDB_" + (i + 1) + "' onclick='EditSDB(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["PROD_CODE"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["PROD_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SupplyDetailsB[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["BATCHNO"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["SUPPLIED_QTY"] + "</td>";

                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["DEFECT_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["ACT_DEFECT_QTY"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + SupplyDetailsB[i]["REMARKS"] + "</td>";
//VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
 TRCode = TRCode + "<td>" + SupplyDetailsB[i]["RATE_PER_UNIT"] * SupplyDetailsB[i]["ActualDefectQty"]  + "</td>";
                        TRCode = TRCode + "<td style='display:none;'>" + SupplyDetailsB[i]["DEFECT_TYPE_CODE"] + "</td>";

                        TRCode = TRCode + "</tr>";
//VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

 totalvalue +=  SupplyDetailsB[i]["RATE_PER_UNIT"] * SupplyDetailsB[i]["ActualDefectQty"];
console.log("Total value : " + totalvalue);
 //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.
                    }
//VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
$("#total_prod_value").val(totalvalue);
console.log(totalvalue);
 //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                    $("#Supply_Details_TableB tbody").append(TRCode);

                    TRCode = "";
                    var RCommLines = Result["MSFBU3Lines"];


                    $("#CompensationRecommSBU3 tbody").empty();
                    for (var i = 0; i < RCommLines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='BU3Rec_" + (i + 1) + "' onclick='EditBU3Rec(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + RCommLines[i]["ProdCode"] + "</td>";
                        TRCode = TRCode + "<td>" + RCommLines[i]["ProdName"] + "</td>";
                        TRCode = TRCode + "<td>" + RCommLines[i]["ActDftQty"] + "</td>";

                        TRCode = TRCode + "</tr>";
                    }
                    $("#CompensationRecommSBU3 tbody").append(TRCode);

                }
                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint start
                console.log(InvestigationHeaderDetails[0]["CREATED_DATE"])
                //debugger;
                if (CompensationScope.Product_Type == "SBU1" && new Date(InvestigationHeaderDetails[0]["CREATED_DATE"]) < new Date('2020-11-19')) {
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
                    $("#TYPE_OF_COMPLAINT_ID").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"];
                    //$("#party_type > [value=0]").attr("selected", "true");
                    $scope.party_type_id = 1;
                    $scope.party_type = "Stockiest";
                } else if (CompensationScope.Product_Type == "SBU1" && new Date(InvestigationHeaderDetails[0]["CREATED_DATE"]) >= new Date('2020-11-19')) {                
                    $("#party_type").val(InvestigationHeaderDetails[0]["party_type"]);
                    $("#party_type_id").val(InvestigationHeaderDetails[0]["party_type_id"]);
                    if (InvestigationHeaderDetails[0]["party_type_id"] == 2 || InvestigationHeaderDetails[0]["party_type"] == "SubDealer" || InvestigationHeaderDetails[0]["party_type"] == "Sub-Stockiest") {
                        $("#SubStockiest_CodeDiv").show();
                        $("#SubStockiest_NameDiv").show();
                        $("#SubStockiest_AddressDiv").show();
                        $("#SubStockiest_NumberDiv").show();
                        $("#party_type").val(InvestigationHeaderDetails[0]["party_type"]);
                        $("#party_type_id").val(InvestigationHeaderDetails[0]["party_type_id"]);
                        $("#SubStockiest_ID").val(InvestigationHeaderDetails[0]["SubStockiest_Code"]);
                        $("#SubStockiest_Code").val(InvestigationHeaderDetails[0]["SubStockiest_Code"]);
                        $("#SubStockiest_Name").val(InvestigationHeaderDetails[0]["SubStockiest_Name"]);
                        $("#SubStockiest_Address").val(InvestigationHeaderDetails[0]["SubStockiest_Address"]);
                        $("#SubStockiest_Number").val(InvestigationHeaderDetails[0]["SubStockiest_Number"]);
                    } else if (InvestigationHeaderDetails[0]["party_type_id"] == 7) {
                        $("#SubStockiest_CodeDiv").hide();
                        $("#SubStockiest_NameDiv").show();
                        $("#SubStockiest_AddressDiv").show();
                        $("#SubStockiest_NumberDiv").show();
                        $("#party_type").val(InvestigationHeaderDetails[0]["party_type"]);
                        $("#party_type_id").val(InvestigationHeaderDetails[0]["party_type_id"]);
                        $("#SubStockiest_ID").val("");
                        $("#SubStockiest_Code").val("");
                        $("#SubStockiest_Name").val(InvestigationHeaderDetails[0]["SubStockiest_Name"]);
                        $("#SubStockiest_Address").val(InvestigationHeaderDetails[0]["SubStockiest_Address"]);
                        $("#SubStockiest_Number").val(InvestigationHeaderDetails[0]["SubStockiest_Number"]);
                    } else {
                        //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                        $("#party_type_id").val(InvestigationHeaderDetails[0]["party_type_id"]);
                        $("#party_type").val(InvestigationHeaderDetails[0]["party_type"]);
                        //$scope.party_type_id = HeaderData[0]["party_type_id"];
                        //$scope.party_type = HeaderData[0]["party_type"];
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                        //$("#party_type").val("Stockiest");
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
                    }
                    //$("#TYPE_OF_COMPLAINT").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"]);
                    //if (InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                    //    $("#TYPE_OF_COMPLAINT > [value=" + InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                    //} else {
                    //    $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    //}
                    $("#TYPE_OF_COMPLAINT_ID").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"];
                    //$scope.TYPE_OF_COMPLAINT = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"];
                } else if (CompensationScope.Product_Type == "SBU2") {
                    $("#party_type").val("Stockiest");
                    $("#party_type_id").val(1);
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //$("#TYPE_OF_COMPLAINT").val(0);
                    //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    $("#TYPE_OF_COMPLAINT_ID").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"];
                    //$scope.TYPE_OF_COMPLAINT = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"];
                    $("#SubStockiest_CodeDiv").hide();
                    $("#SubStockiest_NameDiv").hide();
                    $("#SubStockiest_AddressDiv").hide();
                    $("#SubStockiest_NumberDiv").hide();
                    $("#SubStockiest_ID").val("");
                    $("#SubStockiest_Code").val("");
                    $("#SubStockiest_Name").val("");
                    $("#SubStockiest_Address").val("");
                    $("#SubStockiest_Number").val("");
                } else if (CompensationScope.Product_Type == "SBU3") {
                    $("#party_type").val("Stockiest");
                    $("#party_type_id").val(1);
                    $("#TYPE_OF_COMPLAINT_DIV").hide();
                    //$("#TYPE_OF_COMPLAINT").val(0);
                    //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                    $("#TYPE_OF_COMPLAINT_ID").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"]);
                    $scope.TYPE_OF_COMPLAINT_ID = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT_ID"];
                    $("#TYPE_OF_COMPLAINT").val(InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"]);
                    $scope.TYPE_OF_COMPLAINT = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"];
                    //$scope.TYPE_OF_COMPLAINT = InvestigationHeaderDetails[0]["TYPE_OF_COMPLAINT"];
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
                //svprasadk 21-05-2020 SBU 1 requirement to add type of complaint end

                $scope.SaveCompensation();

            }

        });

    }


    // Material supply details Popup operations
    $scope.OpenMSDModel = function () {
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


            $scope.MSD_id = "";

            $scope.Material_Belongs_To = "";
            $scope.Product_Supplied_From = "";
            $scope.MSD_Name = "";


            $scope.MSD_UOM = "Metric Tons";
            $scope.MSD_Supply_Qty = "";
            $scope.MSD_Breakage_Qty = "";
            $scope.MSD_Net_Loss_Qty = "";
            $('#MSD_Net_Loss_Qty').val("");
            $scope.Materrial_Belongs_To_PlantCode = "";

            $scope.Materrial_Belongs_To_PlantId = "";
            $scope.ProductSuppliedFrom_CODE = "";
            $scope.ProductSuppliedFrom_ID = "";
            $scope.Name_CODE = "";
            $scope.Name_Id = "";


            $("#MSD_Delete").hide();
            $("#MSD_Save").text("Save");

            $("#MaterialSupplyDetailModal").modal('show');
        }
        catch (e) {
            alert("Error : MaterialSupplyDetailModal :" + e);
        }
    }
    $scope.SaveMSDData = function () {
        try {
            var MSD_id = $scope.MSD_id;

            var Material_Belongs_To = $scope.Material_Belongs_To;
            var Product_Supplied_From = $scope.Product_Supplied_From;
            var MSD_Name = $scope.MSD_Name;

            var MSD_UOM = $scope.MSD_UOM;
            var MSD_Supply_Qty = $scope.MSD_Supply_Qty;
            var MSD_Breakage_Qty = $scope.MSD_Breakage_Qty;
            var MSD_Net_Loss_Qty = $scope.MSD_Net_Loss_Qty = $("#MSD_Net_Loss_Qty").val();

            var Materrial_Belongs_To_PlantCode = $scope.Materrial_Belongs_To_PlantCode;
            var Materrial_Belongs_To_PlantId = $scope.Materrial_Belongs_To_PlantId;

            var ProductSuppliedFrom_CODE = $scope.ProductSuppliedFrom_CODE;
            var ProductSuppliedFrom_ID = $scope.ProductSuppliedFrom_ID;

            var Name_CODE = $scope.Name_CODE;
            var Name_Id = $scope.Name_Id;

            var Flag = 0;

            if (Flag > 0) {
                return;
            }
            else {
                var TRCode = "";

                TRCode = TRCode + "<td>" + Material_Belongs_To + "</td>";
                TRCode = TRCode + "<td>" + Product_Supplied_From + "</td>";
                TRCode = TRCode + "<td>" + MSD_Name + "</td>";
                TRCode = TRCode + "<td>" + MSD_UOM + "</td>";
                TRCode = TRCode + "<td>" + MSD_Supply_Qty + "</td>";
                TRCode = TRCode + "<td>" + MSD_Breakage_Qty + "</td>";
                TRCode = TRCode + "<td>" + MSD_Net_Loss_Qty + "</td>";

                TRCode = TRCode + "<td style='display:none;'>" + Materrial_Belongs_To_PlantCode + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Materrial_Belongs_To_PlantId + "</td>";

                TRCode = TRCode + "<td style='display:none;'>" + ProductSuppliedFrom_CODE + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + ProductSuppliedFrom_ID + "</td>";

                TRCode = TRCode + "<td style='display:none;'>" + Name_CODE + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Name_Id + "</td>";


                var Material_SupplyDetails = new Array();
                if (MSD_id == "") {
                    MSD_id = $("#Material_Supply_Detail_Table tbody tr").length + 1;

                    for (var RowId = 1 ; RowId <= (MSD_id - 1) ; RowId++) {
                        var LineIDTABLE = $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[14].innerHTML;
                        if (LineIDTABLE == undefined || LineIDTABLE == "") {
                            LineIDTABLE = "";
                            Material_SupplyDetails.push({
                                SlNo: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[0].innerHTML,
                                MaterialBelongsTo: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[1].innerHTML,
                                ProductSuppliedFrom: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[2].innerHTML,
                                Name: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[3].innerHTML,
                                UOM: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[4].innerHTML,
                                SupplyQty: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[5].innerHTML,
                                BreakageQty: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[6].innerHTML,
                                NetLossQty: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[7].innerHTML,
                                MaterialBelongsToPlantCode: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[8].innerHTML,
                                MaterialBelongsToPlantId: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[9].innerHTML,
                                ProductSupplyType_Code: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[10].innerHTML,
                                ProductSupplyType_ID: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[11].innerHTML,
                                NameSupply_Code: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[10].innerHTML,
                                NameSupply_ID: $("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[11].innerHTML,
                                LineID: LineIDTABLE
                            });
                        }
                        //alert($("#Material_Supply_Detail_Table tbody #MSD_" + RowId + " td")[1].innerHTML);
                    }

                    Material_SupplyDetails.push({
                        SlNo: MSD_id,
                        MaterialBelongsTo: Material_Belongs_To,
                        ProductSuppliedFrom: Product_Supplied_From,
                        Name: MSD_Name,
                        UOM: MSD_UOM,
                        SupplyQty: MSD_Supply_Qty,
                        BreakageQty: MSD_Breakage_Qty,
                        NetLossQty: MSD_Net_Loss_Qty,

                        MaterialBelongsToPlantCode: Materrial_Belongs_To_PlantCode,
                        MaterialBelongsToPlantId: Materrial_Belongs_To_PlantId,
                        ProductSupplyType_Code: ProductSuppliedFrom_CODE,
                        ProductSupplyType_ID: ProductSuppliedFrom_ID,
                        NameSupply_Code: Name_CODE,
                        NameSupply_ID: Name_Id,
                        LineID: ""
                    });
                    var headerData = $scope.getHeaderData();
                    var CompensationData = JSON.stringify({
                        HeaderData: headerData,
                        OperationName: "MaterialSupplyLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CMMaterialSupplyLinesDetails: Material_SupplyDetails
                    });

                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];

                            $scope.Compensation_Id = result[0];
                            TRCode = TRCode + "<td style='display:none;'>" + result[1] + " </td>";
                            TRCode = "<tr class='MousePointer' id='MSD_" + MSD_id + "' ng-click='EditMSD(obj,$event);'><td>" + MSD_id + "</td>" + TRCode + "</tr>";

                            var html = $compile(TRCode)($scope);

                            var el = angular.element($("#Material_Supply_Detail_Table tbody"));
                            el.append(html);
                            $compile(html)($scope)
                            $('#SendForApproval').css("display", "block");
                        }
                    });
                }
                else {
                    Material_SupplyDetails.push({
                        SlNo: MSD_id,
                        MaterialBelongsTo: Material_Belongs_To,
                        ProductSuppliedFrom: Product_Supplied_From,
                        Name: MSD_Name,
                        UOM: MSD_UOM,
                        SupplyQty: MSD_Supply_Qty,
                        BreakageQty: MSD_Breakage_Qty,
                        NetLossQty: MSD_Net_Loss_Qty,

                        MaterialBelongsToPlantCode: Materrial_Belongs_To_PlantCode,
                        MaterialBelongsToPlantId: Materrial_Belongs_To_PlantId,
                        ProductSupplyType_Code: ProductSuppliedFrom_CODE,
                        ProductSupplyType_ID: ProductSuppliedFrom_ID,
                        NameSupply_Code: Name_CODE,
                        NameSupply_ID: Name_Id,
                        LineID: $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[14].innerHTML
                    });

                    var CompensationData = JSON.stringify({
                        OperationName: "MaterialSupplyLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CMMaterialSupplyLinesDetails: Material_SupplyDetails
                    });

                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.Compensation_Id = result[0];
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[0].innerHTML = MSD_id;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[1].innerHTML = Material_Belongs_To;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[2].innerHTML = Product_Supplied_From;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[3].innerHTML = MSD_Name;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[4].innerHTML = MSD_UOM;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[5].innerHTML = MSD_Supply_Qty;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[6].innerHTML = MSD_Breakage_Qty;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[7].innerHTML = MSD_Net_Loss_Qty;

                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[8].innerHTML = Materrial_Belongs_To_PlantCode;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[9].innerHTML = Materrial_Belongs_To_PlantId;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[10].innerHTML = ProductSuppliedFrom_CODE;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[11].innerHTML = ProductSuppliedFrom_ID;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[12].innerHTML = Name_CODE;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[13].innerHTML = Name_Id;
                            $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[14].innerHTML = result[1];
                        }
                    });
                }



                $scope.MSD_id = "";

                $scope.Material_Belongs_To = "";
                $scope.Product_Supplied_From = "";
                $scope.MSD_Name = "";


                $scope.MSD_UOM = "";
                $scope.MSD_Supply_Qty = "";
                $scope.MSD_Breakage_Qty = "";
                $scope.MSD_Net_Loss_Qty = "";
                $scope.Materrial_Belongs_To_PlantCode = "";

                $scope.Materrial_Belongs_To_PlantId = "";
                $scope.ProductSuppliedFrom_CODE = "";
                $scope.ProductSuppliedFrom_ID = "";
                $scope.Name_CODE = "";
                $scope.Name_Id = "";


                $("#MaterialSupplyDetailModal").modal("hide");
            }
        }
        catch (e) {
            alert("Error : SaveMSDData :" + e);
        }
    }
    $scope.EditMSD = function (obj, $event) {

        try {
            var RowId = $($event.target).parent().attr("id");
            $scope.MSD_id = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[0].innerHTML);
            $scope.Material_Belongs_To = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[1].innerHTML);
            $scope.Product_Supplied_From = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[2].innerHTML);
            $scope.MSD_Name = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[3].innerHTML);

            $scope.MSD_UOM = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[4].innerHTML);
            $scope.MSD_Supply_Qty = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[5].innerHTML);
            $scope.MSD_Breakage_Qty = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[6].innerHTML);
            $scope.MSD_Net_Loss_Qty = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[7].innerHTML);


            $scope.Materrial_Belongs_To_PlantCode = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[8].innerHTML);
            $scope.Materrial_Belongs_To_PlantId = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[9].innerHTML);

            $scope.ProductSuppliedFrom_CODE = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[10].innerHTML);
            $scope.ProductSuppliedFrom_ID = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[11].innerHTML);

            $scope.Name_CODE = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[12].innerHTML);
            $scope.Name_Id = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[13].innerHTML);
            var LineId = ($("#Material_Supply_Detail_Table tbody #" + RowId + " td")[14].innerHTML);

            $("#MaterialSupplyDetailModal").modal('show');
            $("#MSD_Delete").show();
            $("#MSD_Save").text("Update");

        }
        catch (e) {
            alert("Error : EditMSD : " + e);
        }

    }
    $scope.DeleteMSD = function () {
        try {
            var MSD_id = $scope.MSD_id;
            var Line_id = $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + " td")[14].innerHTML;
            if (Line_id != "") {
                var CompensationData = JSON.stringify({
                    OperationName: "MaterialSupplyLinesSaving",
                    OperationType: "Delete",
                    ID: Line_id,
                    CREATED_BY: $('#USERCODE_Compensation').val(),
                    CREATED_DATE: $scope.Compensation_Date,
                    CompensationID: $scope.ID

                });

                DIMSFactory.deleteCompensationData(CompensationData).success(function (data) {
                    var response = (data.tabledata);
                    if (response != "FALSE") {
                        $("#Material_Supply_Detail_Table tbody #MSD_" + MSD_id + "").remove();

                        $scope.MSD_id = "";

                        $scope.Material_Belongs_To = "";
                        $scope.Product_Supplied_From = "";
                        $scope.MSD_Name = "";


                        $scope.MSD_UOM = "";
                        $scope.MSD_Supply_Qty = "";
                        $scope.MSD_Breakage_Qty = "";
                        $scope.MSD_Net_Loss_Qty = "";
                        $scope.Materrial_Belongs_To_PlantCode = "";

                        $scope.Materrial_Belongs_To_PlantId = "";
                        $scope.ProductSuppliedFrom_CODE = "";
                        $scope.ProductSuppliedFrom_ID = "";
                        $scope.Name_CODE = "";
                        $scope.Name_Id = "";



                        var i = 1;

                        $("#Material_Supply_Detail_Table tbody tr").each(function () {
                            $(this).attr("id", "MSD_" + i);
                            $("#Material_Supply_Detail_Table tbody #MSD_" + i + " td")[0].innerHTML = i;
                            i = i + 1;
                        });

                        $("#MaterialSupplyDetailModal").modal("hide");
                    }
                });
            } else {
                alert("we can not delete this line");
            }
        }
        catch (e) {
            alert("Error : DeleteMSD : " + e);
        }


    }


    // Breakage Investigation details Popup operations
    $scope.BRKInvOpenModel = function () {
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


            $("#Size_M").css("border-color", "#d2d6de");
            $("#Supplied_Qty_Nos").css("border-color", "#d2d6de");
            $("#Supplied_Qty_M").css("border-color", "#d2d6de");
            $("#Breakage_Qty_Nos").css("border-color", "#d2d6de");
            $("#Breakage_Qty_M").css("border-color", "#d2d6de");
            $("#Breakage_Percentage").css("border-color", "#d2d6de");
            $("#Defect_Type").css("border-color", "#d2d6de");
            $scope.BID_id = "";
            $scope.Item_Type_Product_Name = "";
            $scope.Item_Type_Product_Id = "";
            $scope.Item_Type_Product_Code = "";
            $scope.Size_M = "";
            $scope.Supplied_Qty_Nos = "";
            $scope.Supplied_Qty_M = "";

            $scope.Breakage_Qty_Nos = "";
            $scope.Breakage_Qty_M = "";
            $scope.Breakage_Percentage = "";
            $scope.Defect_Type = "";
            $scope.BID_Remarks = "";
            $scope.Defect_Type_Id = "";
            $scope.Defect_Type_Code = "";
            $('#Supplied_Qty_M').val("");
            $('#Breakage_Qty_M').val("");
            $('#Breakage_Percentage').val("");


            $("#BID_Delete").hide();

            $("#BID_Save").text("Save");

            $("#Breakage_Investigation_Details_Modal").modal('show');
        }
        catch (e) {
            alert("Error : BRKInvOpenModel :" + e);
        }
    }
    $scope.SaveBIDData = function () {
        try {
            var BID_id = $scope.BID_id;
            var Item_Type_Product_Name = $scope.Item_Type_Product_Name;

            var Item_Type_Product_Id = $scope.Item_Type_Product_Id;
            var Item_Type_Product_Code = $scope.Item_Type_Product_Code;
            var GrossWeight = $scope.GrossWeight;
            var Size_M = $scope.Size_M;
            var Supplied_Qty_Nos = $scope.Supplied_Qty_Nos;
            var Supplied_Qty_M = $scope.Supplied_Qty_M = $("#Supplied_Qty_M").val();
            var Supplied_Qty_Tons = $scope.Supplied_Qty_Tons = $("#Supplied_Qty_Tons").val();
            var Breakage_Qty_Nos = $scope.Breakage_Qty_Nos;
            var Breakage_Qty_M = $scope.Breakage_Qty_M = $("#Breakage_Qty_M").val();
            var Breakage_Qty_Tons = $scope.Breakage_Qty_Tons = $("#Breakage_Qty_Tons").val();
            var Breakage_Percentage = $scope.Breakage_Percentage = $("#Breakage_Percentage").val();
            var Defect_Type = $scope.Defect_Type;
            var BID_Remarks = $scope.BID_Remarks;

            var Defect_Type_Id = $scope.Defect_Type_Id;
            var Defect_Type_Code = $scope.Defect_Type_Code;

            var TotalSupplyQtyM = $('#Total_Supply_Qty_Mtrs_Compensation').val();
            var TotalBreakageQtyM = $('#Total_Breakage_Qty_Mtrs_Compensation').val();

            var Flag = 0;

            if (Item_Type_Product_Name == "") {
                Flag = Flag + 1;
                $("#Item_Type_Product_Name").css("border-color", "red");
            }
            else {
                $("#Item_Type_Product_Name").css("border-color", "#d2d6de");
            }
            if (Size_M == "") {
                Flag = Flag + 1;
                $("#Size_M").css("border-color", "red");
            }
            else {
                $("#Size_M").css("border-color", "#d2d6de");
            }
            if (Supplied_Qty_Nos == "") {
                Flag = Flag + 1;
                $("#Supplied_Qty_Nos").css("border-color", "red");
            }
            else {
                $("#Supplied_Qty_Nos").css("border-color", "#d2d6de");
            }

            if (Supplied_Qty_M == "") {
                Flag = Flag + 1;
                $("#Supplied_Qty_M").css("border-color", "red");
            }
            else {
                $("#Supplied_Qty_M").css("border-color", "#d2d6de");
            }
            if (Breakage_Qty_Nos == "") {
                Flag = Flag + 1;
                $("#Breakage_Qty_Nos").css("border-color", "red");
            }
            else {
                $("#Breakage_Qty_Nos").css("border-color", "#d2d6de");
            }

            if (Breakage_Qty_M == "") {
                Flag = Flag + 1;
                $("#Breakage_Qty_M").css("border-color", "red");
            }
            else {
                $("#Breakage_Qty_M").css("border-color", "#d2d6de");
            }

            if (Breakage_Percentage == "") {
                Flag = Flag + 1;
                $("#Breakage_Percentage").css("border-color", "red");
            }
            else {
                $("#Breakage_Percentage").css("border-color", "#d2d6de");
            }
            if (Defect_Type == "") {
                Flag = Flag + 1;
                $("#Defect_Type").css("border-color", "red");
            }
            else {
                $("#Defect_Type").css("border-color", "#d2d6de");
            }

            if (Flag > 0) {
                return;
            }
            else {
                var TRCode = "";
                TRCode = TRCode + "<td>" + Item_Type_Product_Name + "</td>";
                TRCode = TRCode + "<td>" + Size_M + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + GrossWeight + "</td>";
                TRCode = TRCode + "<td>" + Supplied_Qty_Nos + "</td>";

                TRCode = TRCode + "<td>" + Supplied_Qty_M + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Supplied_Qty_Tons + "</td>";
                TRCode = TRCode + "<td>" + Breakage_Qty_Nos + "</td>";
                TRCode = TRCode + "<td>" + Breakage_Qty_M + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Breakage_Qty_Tons + "</td>";

                TRCode = TRCode + "<td>" + Math.round((Breakage_Percentage * 100) / 100) + "</td>";
                TRCode = TRCode + "<td>" + Defect_Type + "</td>";
                TRCode = TRCode + "<td >" + BID_Remarks + "</td>";


                TRCode = TRCode + "<td style='display:none;'>" + Item_Type_Product_Code + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Item_Type_Product_Id + "</td>";


                TRCode = TRCode + "<td style='display:none;'>" + Defect_Type_Code + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + Defect_Type_Id + "</td>";
                var Breakage_Investigation = new Array();
                //alert(BID_id);
                if (BID_id == "") {
                    //  alert("in");
                    BID_id = $("#Breakage_Investigation_Details_Table tbody tr").length + 1;
                    for (var RowId = 1 ; RowId <= (BID_id - 1) ; RowId++) {
                        var LineIDTABLE = $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[17].innerHTML;
                        if (LineIDTABLE == undefined || LineIDTABLE == "") {
                            LineIDTABLE = "";
                            Breakage_Investigation.push({
                                SlNo: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[0].innerHTML,
                                ItemName: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[1].innerHTML,
                                Size: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[2].innerHTML,
                                Grossweight: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[3].innerHTML,
                                SuppliedQty_Nos: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[4].innerHTML,
                                Supplied_Qty_M: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[5].innerHTML,
                                Supplied_Qty_Ton: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[6].innerHTML,
                                Breakage_Qty_Nos: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[7].innerHTML,

                                Breakage_Qty_M: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[8].innerHTML,
                                Breakage_Qty_Ton: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[9].innerHTML,
                                Breakage: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[10].innerHTML,
                                Defect_Type: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[11].innerHTML,
                                Remarks: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[12].innerHTML,

                                Product_Code: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[13].innerHTML,
                                Product_Id: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[14].innerHTML,

                                Defect_Type_Code: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[15].innerHTML,
                                Defect_Type_Id: $("#Breakage_Investigation_Details_Table tbody #BID_" + RowId + " td")[16].innerHTML,
                                LineID: LineIDTABLE
                            });
                        }
                    }

                    Breakage_Investigation.push({
                        SlNo: BID_id,
                        ItemName: Item_Type_Product_Name,
                        Size: Size_M,
                        Grossweight: GrossWeight,
                        SuppliedQty_Nos: Supplied_Qty_Nos,
                        Supplied_Qty_M: Supplied_Qty_M,
                        Supplied_Qty_Ton: Supplied_Qty_Tons,
                        Breakage_Qty_Nos: Breakage_Qty_Nos,

                        Breakage_Qty_M: Breakage_Qty_M,
                        Breakage_Qty_Ton: Breakage_Qty_Tons,
                        Breakage: Breakage_Percentage,
                        Defect_Type: Defect_Type,
                        Remarks: BID_Remarks,

                        Product_Id: Item_Type_Product_Id,
                        Product_Code: Item_Type_Product_Code,

                        Defect_Type_Id: Defect_Type_Id,
                        Defect_Type_Code: Defect_Type_Code,
                        LineID: ""
                    });

                    var headerData = $scope.getHeaderData();
                    // alert("Head:"+headerData);

                    var CompensationData = JSON.stringify({
                        HeaderData: headerData,
                        OperationName: "BreakageInvestigationLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CMBreakageInvestigationLinesDetails: Breakage_Investigation
                    });
                    //alert(CompensationData);
                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.Compensation_Id = result[0];
                            TRCode = TRCode + "<td style='display:none;'>" + result[1] + " </td>";
                            TRCode = "<tr class='MousePointer' id='BID_" + BID_id + "' ng-click='EditBID(obj,$event)'><td>" + BID_id + "</td>" + TRCode + "</tr>";
                            var html = $compile(TRCode)($scope);
                            var el = angular.element($("#Breakage_Investigation_Details_Table tbody"));
                            el.append(html);
                            $compile(html)($scope)


                            MakeTotalsForSheetingTable();
                            $('#ApproveSave').val("ApproveSave");
                            $scope.SaveCompensation();
                            $('#SendForApproval').css("display", "block");
                        }
                    });

                    //  $("#Breakage_Investigation_Details_Table tbody").append(TRCode);
                }
                else {
                    Breakage_Investigation.push({
                        SlNo: BID_id,
                        ItemName: Item_Type_Product_Name,
                        Size: Size_M,
                        Grossweight: GrossWeight,
                        SuppliedQty_Nos: Supplied_Qty_Nos,
                        Supplied_Qty_M: Supplied_Qty_M,
                        Supplied_Qty_Ton: Supplied_Qty_Tons,
                        Breakage_Qty_Nos: Breakage_Qty_Nos,

                        Breakage_Qty_M: Breakage_Qty_M,
                        Breakage_Qty_Ton: Breakage_Qty_Tons,
                        Breakage: Breakage_Percentage,
                        Defect_Type: Defect_Type,
                        Remarks: BID_Remarks,

                        Product_Id: Item_Type_Product_Id,
                        Product_Code: Item_Type_Product_Code,

                        Defect_Type_Id: Defect_Type_Id,
                        Defect_Type_Code: Defect_Type_Code,
                        LineID: $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[17].innerHTML
                    });

                    var CompensationData = JSON.stringify({
                        OperationName: "BreakageInvestigationLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CMBreakageInvestigationLinesDetails: Breakage_Investigation
                    });
                    //  alert(CompensationData);
                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.Compensation_Id = result[0];
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[0].innerHTML = BID_id;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[1].innerHTML = Item_Type_Product_Name;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[2].innerHTML = Size_M;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[3].innerHTML = $scope.GrossWeight;

                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[4].innerHTML = Supplied_Qty_Nos;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[5].innerHTML = Supplied_Qty_M;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[6].innerHTML = Supplied_Qty_Tons;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[7].innerHTML = Breakage_Qty_Nos;

                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[8].innerHTML = Breakage_Qty_M;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[9].innerHTML = $scope.Breakage_Qty_Tons;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[10].innerHTML = Breakage_Percentage;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[11].innerHTML = Defect_Type;

                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[12].innerHTML = BID_Remarks;

                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[13].innerHTML = Item_Type_Product_Code;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[14].innerHTML = Item_Type_Product_Id;

                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[15].innerHTML = Defect_Type_Code;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[16].innerHTML = Defect_Type_Id;
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[17].innerHTML = result[1];
                            // alert(result[1]);

                            //alert("Hello");

                            MakeTotalsForSheetingTable();

                            /****************************************************************************************************************************/


                            var RowId = "";

                            //alert("Please Wait getting calculation done");

                            var SuppliedQtyM = "";
                            var BreakageQtyM = "";
                            if ($("#Product_Category").val() == "AC Sheets") {
                                $("#Breakage_Investigation_Details_Table tbody tr").each(function () {
                                    RowId = ($(this).attr("id"));

                                    if (SuppliedQtyM == "") {
                                        SuppliedQtyM = 0;
                                    }
                                    if (BreakageQtyM == "") {
                                        BreakageQtyM = 0;
                                    }

                                    SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                                    BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML);
                                });

                                $("#Total_Supply_Qty_Mtrs_Compensation").val(SuppliedQtyM);
                                $("#Total_Breakage_Qty_Mtrs_Compensation").val(BreakageQtyM);

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

                                $("#Total_Supply_Qty_Mtrs_Compensation").val(SuppliedQtyM);
                                $("#Total_Breakage_Qty_Mtrs_Compensation").val(BreakageQtyM);

                                $("#Total_Supply_Qty_Tons_Compensation").val(TotSupTons);
                                $("#Total_Breakage_Qty_Tons_Compensation").val(TotBrkTons);

                                var Supply = $("#Total_Supply_Qty_Mtrs_Compensation").val();
                                var Breakage = $("#Total_Breakage_Qty_Mtrs_Compensation").val();
                                var Recovery = $("#Total_Recovery_Mtrs_Compensation").val();
                                var NetLoss = $("#Net_Loss_Mtrs_Compensation").val();

                                if (Breakage == "" || NetLoss == "") {
                                    $("#Net_Loss_Mtrs_Compensation").val();
                                    $("#Total_Recovery_Tons_Compensation").val();
                                }
                                else {
                                    NetLoss = parseFloat(Breakage) - parseFloat(Recovery);

                                    $("#Net_Loss_Mtrs_Compensation").val(NetLoss);

                                    NetLoss = parseFloat(NetLoss) * 0.01269;
                                    NetLoss = Math.round(NetLoss * 10000) / 10000;
                                    $("#Total_Recovery_Tons_Compensation").val(NetLoss);

                                }
                            }

                            else if ($("#Product_Category").val() == "CC Iron Sheets") {

                                //alert("This is CCSheetCalculation");

                                var ProductArray = new Array();

                                $("#Breakage_Investigation_Details_Table tbody tr").each(function () {
                                    RowId = ($(this).attr("id"));

                                    if (SuppliedQtyM == "") {
                                        SuppliedQtyM = 0;
                                    }
                                    if (BreakageQtyM == "") {
                                        BreakageQtyM = 0;
                                    }

                                    SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                                    BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML);

                                    //alert( + "\t" + ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[5].innerHTML) + "\t" + ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML));

                                    ProductArray.push({
                                        ProdCode: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[13].innerHTML),
                                        Size: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[2].innerHTML),
                                        ProdSupplyNos: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[4].innerHTML),
                                        ProdBreakNos: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[7].innerHTML)
                                    });

                                });

                                ProductArray = JSON.stringify(ProductArray);

                                $.ajax({
                                    type: 'POST',
                                    data: { ProductArray: ProductArray },
                                    url: '../../ComplaintRegistration/CCSheetCalculation',
                                    success: function (Resp) {
                                        //alert("Resp : " + JSON.stringify(Resp));

                                        if (Resp == "") {
                                        }
                                        else {
                                            Resp = JSON.parse(Resp);

                                            $("#Total_Supply_Qty_Mtrs_Compensation").val(Resp["TotalSupplyLength"]);
                                            $("#Total_Breakage_Qty_Mtrs_Compensation").val(Resp["TotalBreakLength"]);

                                            $("#Total_Supply_Qty_Tons_Compensation").val(Resp["TotalSupplyTons"]);
                                            $("#Total_Breakage_Qty_Tons_Compensation").val(Resp["TotalBreakTons"]);

                                            var RecoveryLength = $("#Total_Recovery_Mtrs_Compensation").val();
                                            var RecoveryWeight = $("#Total_Recovery_Tons_Compensation").val();

                                            if (RecoveryLength == "") {
                                                $("#Net_Loss_Mtrs_Compensation").val("0");
                                            }
                                            else {
                                                var D = parseFloat(Resp["TotalBreakLength"]) - parseFloat(RecoveryLength);
                                                D = Math.round(D * 10000) / 10000;
                                                $("#Net_Loss_Mtrs_Compensation").val(D);
                                            }

                                            if (RecoveryWeight == "") {
                                                $("#Net_Loss_Tons_Compensation").val("0");
                                            }
                                            else {
                                                var D = parseFloat(Resp["TotalBreakTons"]) - parseFloat(RecoveryWeight);
                                                D = Math.round(D * 10000) / 10000;
                                                $("#Net_Loss_Tons_Compensation").val(D);
                                            }

                                            CalculateNetLoss_Compensation();

                                        }

                                    }
                                });

                            }

                            /**************************************************************************************************************************************/

                            $('#ApproveSave').val("ApproveSave");
                            // alert("Product_Type:" + $scope.Product_Type);
                            $scope.SaveCompensation();
                            $('#ApproveSave').val("");
                        }
                    });
                }

                $scope.BID_id = "";
                $scope.Item_Type_Product_Name = "";
                $scope.Item_Type_Product_Id = "";
                $scope.Item_Type_Product_Code = "";
                $scope.Size_M = "";
                $scope.Supplied_Qty_Nos = "";
                $scope.Supplied_Qty_M = "";

                $scope.Breakage_Qty_Nos = "";
                $scope.Breakage_Qty_M = "";
                $scope.Breakage_Percentage = "";
                $scope.Defect_Type = "";
                $scope.BID_Remarks = "";
                $scope.Defect_Type_Id = "";
                $scope.Defect_Type_Code = "";
                $scope.GrossWeight = "";
                MakeTotalsForSheetingTable();
                $("#Breakage_Investigation_Details_Modal").modal("hide");
            }
        }
        catch (e) {
            alert("Error : SaveBIDData :" + e);
        }
    }
    $scope.EditBID = function (obj, $event) {
        try {


            var RowId = $($event.target).parent().attr("id");

            $scope.BID_id = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[0].innerHTML);
            $scope.Item_Type_Product_Name = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[1].innerHTML);
            $scope.Size_M = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[2].innerHTML);
            $scope.GrossWeight = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[3].innerHTML);
            $scope.Supplied_Qty_Nos = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[4].innerHTML);
            $scope.Supplied_Qty_M = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[5].innerHTML);
            $scope.Supplied_Qty_Tons = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[6].innerHTML);


            $scope.Breakage_Qty_Nos = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[7].innerHTML);
            $scope.Breakage_Qty_M = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML);
            //$scope.Total_Breakage_Qty_Tons = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[9].innerHTML);
            $scope.Breakage_Percentage = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[10].innerHTML);
            $scope.Defect_Type = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[11].innerHTML);
            $scope.BID_Remarks = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[12].innerHTML);

            $scope.Item_Type_Product_Code = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[13].innerHTML);
            $scope.Item_Type_Product_Id = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[14].innerHTML);
            $scope.Defect_Type_Id = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[15].innerHTML);

            $scope.Defect_Type_Code = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[16].innerHTML);
            var LineId = ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[17].innerHTML);
            //if (LineId == "") {
            //    $('#BID_Save').attr("disabled", "disabled");
            //    $('#BID_Delete').attr("disabled", "disabled");
            //}


            $("#Breakage_Investigation_Details_Modal").modal('show');
            $("#BID_Delete").show();
            $("#BID_Save").text("Update");



        }
        catch (e) {
            alert("Error : EditBID : " + e);
        }

    }
    $scope.DeleteBID = function () {
        try {
            var BID_id = $scope.BID_id;
            var Line_id = $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + " td")[17].innerHTML;
            if (Line_id != "") {
                var CompensationData = JSON.stringify({
                    OperationName: "BreakageInvestigationLinesSaving",
                    OperationType: "Delete",
                    ID: Line_id,
                    CREATED_BY: $('#USERCODE_Compensation').val(),
                    CREATED_DATE: $scope.Compensation_Date,
                    CompensationID: $scope.ID

                });

                DIMSFactory.deleteCompensationData(CompensationData).success(function (data) {
                    var response = (data.tabledata);
                    if (response != "FALSE") {
                        $("#Breakage_Investigation_Details_Table tbody #BID_" + BID_id + "").remove();

                        $scope.BID_id = "";
                        $scope.Item_Type_Product_Name = "";
                        $scope.Item_Type_Product_Id = "";
                        $scope.Item_Type_Product_Code = "";
                        $scope.Size_M = "";
                        $scope.Supplied_Qty_Nos = "";
                        $scope.Supplied_Qty_M = "";

                        $scope.Breakage_Qty_Nos = "";
                        $scope.Breakage_Qty_M = "";
                        $scope.Breakage_Percentage = "";
                        $scope.Defect_Type = "";
                        $scope.BID_Remarks = "";
                        $scope.Defect_Type_Id = "";
                        $scope.Defect_Type_Code = "";



                        var i = 1;

                        $("#Breakage_Investigation_Details_Table tbody tr").each(function () {
                            $(this).attr("id", "BID_" + i);
                            $("#Breakage_Investigation_Details_Table tbody #BID_" + i + " td")[0].innerHTML = i;
                            i = i + 1;
                        });
                        MakeTotalsForSheetingTable();

                        $('#ApproveSave').val("ApproveSave");
                        $scope.SaveCompensation();
                        $('#ApproveSave').val("");

                        $("#Breakage_Investigation_Details_Modal").modal("hide");
                    }
                });
            } else {
                alert("we can not delete this line");
            }
        }
        catch (e) {
            alert("Error : DeleteBID : " + e);
        }
    }


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
    $scope.SaveCompensationSizeLinesData = function () {
        try {
            var CompensationSize_id = $scope.CompensationSize_id;

            var CompensationRecommendedSize = $scope.CompensationRecommendedSize;

            var CompensationSizeLineNos = $scope.CompensationSizeLineNos;
            var CompensationSizeLineGrossWeight = $scope.CompensationSizeLineGrossWeight;

            var CompensationSizeLineTons = $scope.CompensationSizeLineTons = $("#CompensationSizeLineTons").val();
            var CompensationProductCode = $scope.CompensationProductCode;
            var CompensationProductID = $scope.CompensationProductID;


            var Flag = 0;

            if (CompensationRecommendedSize == "") {
                Flag = Flag + 1;
                $("#CompensationRecommendedSize").css("border-color", "red");
            }
            else {
                $("#CompensationRecommendedSize").css("border-color", "#d2d6de");
            }



            if (Flag > 0) {
                return;
            }
            else {
                var TRCode = "";

                TRCode = TRCode + "<td>" + CompensationRecommendedSize + "</td>";
                TRCode = TRCode + "<td>" + CompensationSizeLineNos + "</td>";
                TRCode = TRCode + "<td>" + CompensationSizeLineGrossWeight + "</td>";
                TRCode = TRCode + "<td>" + CompensationSizeLineTons + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + CompensationProductCode + "</td>";
                TRCode = TRCode + "<td style='display:none;'>" + CompensationProductID + "</td>";

                var CompensationSizelines = new Array();
                if (CompensationSize_id == "") {
                    CompensationSize_id = $("#CompensationSizeLines_Details_Table tbody tr").length + 1;

                    for (var RowId = 1 ; RowId <= (CompensationSize_id - 1) ; RowId++) {
                        var LineIDTABLE = $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[5].innerHTML;
                        if (LineIDTABLE == undefined || LineIDTABLE == "") {
                            LineIDTABLE = "";
                            CompensationSizelines.push({
                                SlNo: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[0].innerHTML,
                                RecommendedSize: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[1].innerHTML,
                                Nos: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[2].innerHTML,
                                GrossWeight: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[3].innerHTML,
                                Tons: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[4].innerHTML,
                                ProductCode: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[3].innerHTML,
                                ProductID: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + RowId + " td")[4].innerHTML,

                                LineID: LineIDTABLE
                            });
                        }

                    }
                    var headerData = $scope.getHeaderData();

                    CompensationSizelines.push({
                        SlNo: CompensationSize_id,
                        RecommendedSize: CompensationRecommendedSize,
                        Nos: CompensationSizeLineNos,
                        GrossWeight: CompensationSizeLineGrossWeight,
                        Tons: CompensationSizeLineTons,
                        ProductCode: CompensationProductCode,
                        ProductID: CompensationProductID,

                        LineID: ""
                    });
                    var CompensationData = JSON.stringify({
                        HeaderData: headerData,
                        OperationName: "CompensationSizeLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CompensationSizeLinesDetails: CompensationSizelines
                    });
                    // alert(CompensationData);
                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.Compensation_Id = result[0];
                            TRCode = TRCode + "<td style='display:none;'>" + result[1] + " </td>";
                            TRCode = "<tr class='MousePointer' id='COMPSIZE_" + CompensationSize_id + "' ng-click='EditCompensationSizeLines(obj,$event)'><td>" + CompensationSize_id + "</td>" + TRCode + "</tr>";
                            var html = $compile(TRCode)($scope);
                            var el = angular.element($("#CompensationSizeLines_Details_Table tbody"));

                            el.append(html);
                            $compile(html)($scope)
                        }
                        $("#Breakage_Investigation_Details_Table tbody").append(TRCode);

                        var CompensationSizeLineNosSum = "";
                        $("#CompensationSizeLines_Details_Table").find("tbody tr").each(function () {

                            if (CompensationSizeLineNosSum == "") {
                                CompensationSizeLineNosSum = 0;
                            }
                            var temp = $(this).find("td:eq(4)").text();
                            CompensationSizeLineNosSum = (parseFloat(CompensationSizeLineNosSum) + parseFloat(temp)).toFixed(4);

                        });

                        if (isNaN(CompensationSizeLineNosSum)) {
                        }
                        else {
                            $scope.CompensationinMetricCubicValue = CompensationSizeLineNosSum;
                        }

                        if ($("#Product_Category").val() == "Blocks") {
                            $("#CompensationinMetricCubic").val("Cubic Meters");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                        }
                        else {
                            $("#CompensationinMetricCubic").val("Metric Tons");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                        }

                    });

                }
                else {
                    var headerData = $scope.getHeaderData();
                    CompensationSizelines.push({
                        SlNo: CompensationSize_id,
                        RecommendedSize: CompensationRecommendedSize,
                        Nos: CompensationSizeLineNos,
                        GrossWeight: CompensationSizeLineGrossWeight,
                        Tons: CompensationSizeLineTons,
                        ProductCode: CompensationProductCode,
                        ProductID: CompensationProductID,
                        LineID: $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[7].innerHTML
                    });
                    var CompensationData = JSON.stringify({
                        HeaderData: headerData,
                        OperationName: "CompensationSizeLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CompensationSizeLinesDetails: CompensationSizelines
                    });
                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.Compensation_Id = result[0];
                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[0].innerHTML = CompensationSize_id;
                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[1].innerHTML = CompensationRecommendedSize;
                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[2].innerHTML = CompensationSizeLineNos;
                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[3].innerHTML = CompensationSizeLineGrossWeight;

                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[4].innerHTML = CompensationSizeLineTons;
                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[5].innerHTML = CompensationProductCode;
                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[6].innerHTML = CompensationProductID;
                            $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + CompensationSize_id + " td")[7].innerHTML = result[1];
                            $('#SendForApproval').css("display", "block");
                        }

                        var CompensationSizeLineNosSum = "";
                        $("#CompensationSizeLines_Details_Table").find("tbody tr").each(function () {

                            if (CompensationSizeLineNosSum == "") {
                                CompensationSizeLineNosSum = 0;
                            }
                            var temp = $(this).find("td:eq(4)").text();
                            CompensationSizeLineNosSum = (parseFloat(CompensationSizeLineNosSum) + parseFloat(temp)).toFixed(4);

                        });


                        if (isNaN(CompensationSizeLineNosSum)) {
                        }
                        else {
                            $scope.CompensationinMetricCubicValue = CompensationSizeLineNosSum;
                        }

                        //$scope.CompensationinMetricCubicValue = CompensationSizeLineNosSum;




                        if ($("#Product_Category").val() == "Blocks") {
                            $("#CompensationinMetricCubic").val("Cubic Meters");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                        }
                        else {
                            $("#CompensationinMetricCubic").val("Metric Tons");
                            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                        }
                    });

                }


                $scope.CompensationSize_id = "";
                $scope.CompensationRecommendedSize = "";
                $scope.CompensationSizeLineNos = "";
                //if (CompensationSizeLineNosSum == "") {
                //    $scope.CompensationInNosWords = "";
                //}
                //else {
                //    $scope.CompensationInNosWords = toWords($scope.CompensationInNos);
                //}
                $scope.CompensationSizeLineGrossWeight = "";
                $scope.CompensationSizeLineTons = "";
                $scope.CompensationProductCode = "";
                $scope.CompensationProductID = "";
                $("#CompensationSizeLineTons").val("");

                $("#CompensationSizeLines_Details_Modal").modal("hide");
            }
        }
        catch (e) {
            alert("Error : SaveCompensationSizeLinesData :" + e);
            console.clear();
            console.log(e);
        }
    }
    $scope.EditCompensationSizeLines = function (obj, $event) {
        try {
            var RowId = $($event.target).parent().attr("id");
            $scope.CompensationSize_id = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[0].innerHTML);
            $scope.CompensationRecommendedSize = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[1].innerHTML);
            $scope.CompensationSizeLineNos = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[2].innerHTML);

            $scope.CompensationSizeLineGrossWeight = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[3].innerHTML);
            $scope.CompensationSizeLineTons = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[4].innerHTML);
            $scope.CompensationProductCode = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[5].innerHTML);
            $scope.CompensationProductID = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[6].innerHTML);
            var LineId = ($("#CompensationSizeLines_Details_Table tbody #" + RowId + " td")[7].innerHTML);
            //if (LineId == "") {
            //    $("#CompSizeLines_Delete").attr("disabled", "disabled");
            //    $("#CompSizeLines_Save").attr("disabled", "disabled");
            //} else {
            //    $("#CompSizeLines_Delete").attr("disabled", false);
            //    $("#CompSizeLines_Save").attr("disabled", false);
            //}

            $("#CompensationSizeLines_Details_Modal").modal('show');
            $("#CompSizeLines_Delete").show();
            $("#CompSizeLines_Save").text("Update");

        }
        catch (e) {
            alert("Error : EditCompensationSizeLines : " + e);
        }

    }
    $scope.DeleteCompensationSizeLines = function () {
        try {
            var BID_id = $scope.CompensationSize_id;
            var Line_id = $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + BID_id + " td")[7].innerHTML;
            var CompensationData = JSON.stringify({
                OperationName: "CompensationSizeLinesSaving",
                OperationType: "Delete",
                ID: Line_id,
                CREATED_BY: $('#USERCODE_Compensation').val(),
                CREATED_DATE: $scope.Compensation_Date,
                CompensationID: $scope.ID

            });

            DIMSFactory.deleteCompensationData(CompensationData).success(function (data) {
                var response = (data.tabledata);
                if (response != "FALSE") {
                    $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + BID_id + "").remove();

                    $scope.CompensationSize_id = "";
                    $scope.CompensationRecommendedSize = "";
                    $scope.CompensationSizeLineNos = "";
                    $scope.CompensationSizeLineGrossWeight = "";
                    $scope.CompensationSizeLineTons = "";
                    $scope.CompensationProductCode = "";
                    $scope.CompensationProductID = "";



                    var i = 1;

                    $("#CompensationSizeLines_Details_Table tbody tr").each(function () {
                        $(this).attr("id", "COMPSIZE_" + i);
                        $("#CompensationSizeLines_Details_Table tbody #COMPSIZE_" + i + " td")[0].innerHTML = i;
                        i = i + 1;
                    });

                    $("#CompensationSizeLines_Details_Modal").modal("hide");
                }

                var CompensationSizeLineNosSum = "";

                $("#CompensationSizeLines_Details_Table").find("tbody tr").each(function () {
                    if (CompensationSizeLineNosSum == "") {
                        CompensationSizeLineNosSum = 0;
                    }
                    var temp = $(this).find("td:eq(4)").text();
                    CompensationSizeLineNosSum = (parseFloat(CompensationSizeLineNosSum) + parseFloat(temp)).toFixed(4);

                });
                $scope.CompensationinMetricCubicValue = CompensationSizeLineNosSum;

                if ($("#Product_Category").val() == "Blocks") {
                    $("#CompensationinMetricCubic").val("Cubic Meters");
                    //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                    //$("#CompensationSizeLines_Details_Table thead tr").eq(4).html("Volume");
                }
                else {
                    $("#CompensationinMetricCubic").val("Metric Tons");
                    //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
                }
            });
        }
        catch (e) {
            alert("Error : DeleteCompensationSizeLines : " + e);
        }

    }


    // Breakage Other Lines details Popup operations
    $scope.BRKOtherLinesOpenModel = function () {
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

            $("#BOTHER_SuppliedQtyNo").css("border-color", "#d2d6de");
            $("#BOTHER_TotalBreakageQtyNo").css("border-color", "#d2d6de");
            $("#BOTHER_TotalBreakageQtyPer").css("border-color", "#d2d6de");
            $("#BOTHER_AllowedBreakageQtyPer").css("border-color", "#d2d6de");
            $("#BOTHER_ActualBreakageQtyNos").css("border-color", "#d2d6de");
            $("#BOTHER_Transporter").css("border-color", "#d2d6de");
            $scope.BreakOtherID_id = "";
            $scope.BOTHER_SuppliedQtyNo = "";
            $scope.BOTHER_TotalBreakageQtyNo = "";
            $scope.BOTHER_TotalBreakageQtyPer = "";
            $scope.BOTHER_AllowedBreakageQtyPer = "";
            $scope.BOTHER_ActualBreakageQtyNos = "";
            $("#BOTHER_TotalBreakageQtyPer").val("");
            $("#BOTHER_ActualBreakageQtyNos").val("");
            $scope.BOTHER_Transporter = "";

            $scope.BOTHER_Remarks = "";

            $("#BOtherID_Delete").hide();

            $("#BOtherID_Save").text("Save");

            $("#Breakage_OtherLines_Details_Modal").modal('show');

        }
        catch (e) {
            alert("Error : BRKOtherLinesOpenModel :" + e);
        }
    }
    $scope.SaveBIDOtherData = function () {
        try {
            var BreakOtherID_id = $scope.BreakOtherID_id;


            var BOTHER_SuppliedQtyNo = $scope.BOTHER_SuppliedQtyNo;

            var BOTHER_TotalBreakageQtyNo = $scope.BOTHER_TotalBreakageQtyNo;
            var BOTHER_TotalBreakageQtyPer = $scope.BOTHER_TotalBreakageQtyPer = $("#BOTHER_TotalBreakageQtyPer").val();

            var BOTHER_AllowedBreakageQtyPer = $scope.BOTHER_AllowedBreakageQtyPer;
            // var BOTHER_ActualBreakageQtyNos = $scope.BOTHER_ActualBreakageQtyNos;
            var BOTHER_ActualBreakageQtyNos = $("#BOTHER_ActualBreakageQtyNos").val();


            var BOTHER_Transporter = $scope.BOTHER_Transporter;
            var BOTHER_Remarks = $scope.BOTHER_Remarks;

            var Flag = 0;

            if (BOTHER_SuppliedQtyNo == "") {
                Flag = Flag + 1;
                $("#BOTHER_SuppliedQtyNo").css("border-color", "red");
            }
            else {
                $("#BOTHER_SuppliedQtyNo").css("border-color", "#d2d6de");
            }
            if (BOTHER_TotalBreakageQtyNo == "") {
                Flag = Flag + 1;
                $("#BOTHER_TotalBreakageQtyNo").css("border-color", "red");
            }
            else {
                $("#BOTHER_TotalBreakageQtyNo").css("border-color", "#d2d6de");
            }
            if (BOTHER_TotalBreakageQtyPer == "") {
                Flag = Flag + 1;
                $("#BOTHER_TotalBreakageQtyPer").css("border-color", "red");
            }
            else {
                $("#BOTHER_TotalBreakageQtyPer").css("border-color", "#d2d6de");
            }
            if (BOTHER_AllowedBreakageQtyPer == "") {
                Flag = Flag + 1;
                $("#BOTHER_AllowedBreakageQtyPer").css("border-color", "red");
            }
            else {
                $("#BOTHER_AllowedBreakageQtyPer").css("border-color", "#d2d6de");
            }
            if (BOTHER_ActualBreakageQtyNos == "") {
                Flag = Flag + 1;
                $("#BOTHER_ActualBreakageQtyNos").css("border-color", "red");
            }
            else {
                $("#BOTHER_ActualBreakageQtyNos").css("border-color", "#d2d6de");
            }
            if (BOTHER_Transporter == "") {
                Flag = Flag + 1;
                $("#BOTHER_Transporter").css("border-color", "red");
            }
            else {
                $("#BOTHER_Transporter").css("border-color", "#d2d6de");
            }


            if (Flag > 0) {
                return;
            }
            else {
                var TRCode = "";

                TRCode = TRCode + "<td>" + BOTHER_SuppliedQtyNo + "</td>";
                TRCode = TRCode + "<td>" + BOTHER_TotalBreakageQtyNo + "</td>";
                TRCode = TRCode + "<td>" + BOTHER_TotalBreakageQtyPer + "</td>";
                TRCode = TRCode + "<td>" + BOTHER_AllowedBreakageQtyPer + "</td>";

                TRCode = TRCode + "<td>" + BOTHER_ActualBreakageQtyNos + "</td>";
                TRCode = TRCode + "<td>" + BOTHER_Transporter + "</td>";
                TRCode = TRCode + "<td>" + BOTHER_Remarks + "</td>";

                var Breakage_Otherlines = new Array();
                if (BreakOtherID_id == "") {

                    BreakOtherID_id = $("#Breakage_OtherLines_Details_Table tbody tr").length + 1;

                    for (var RowId = 1 ; RowId <= (BreakOtherID_id - 1) ; RowId++) {

                        var LineIDTABLE = $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[8].innerHTML;

                        if (LineIDTABLE == undefined || LineIDTABLE == "") {

                            LineIDTABLE = "";
                            Breakage_Otherlines.push({
                                SlNo: $("#Breakage_OtherLines_Details_Table tbody #BID_" + RowId + " td")[0].innerHTML,
                                SuppliedQty: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[1].innerHTML,
                                TotalBreakageQty: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[2].innerHTML,
                                TotalBreakageQtyPercentage: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[3].innerHTML,
                                AllowedBreakagePercentage: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[4].innerHTML,
                                ActualBreakageQtyNos: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[5].innerHTML,
                                Transporter: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[6].innerHTML,
                                Remarks: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + RowId + " td")[7].innerHTML,
                                LineID: LineIDTABLE
                            });

                        }
                    }

                    var headerData = $scope.getHeaderData();
                    Breakage_Otherlines.push({
                        SlNo: BreakOtherID_id,
                        SuppliedQty: BOTHER_SuppliedQtyNo,
                        TotalBreakageQty: BOTHER_TotalBreakageQtyNo,
                        TotalBreakageQtyPercentage: BOTHER_TotalBreakageQtyPer,
                        AllowedBreakagePercentage: BOTHER_AllowedBreakageQtyPer,
                        ActualBreakageQtyNos: BOTHER_ActualBreakageQtyNos,
                        Transporter: BOTHER_Transporter,
                        Remarks: BOTHER_Remarks,
                        LineID: ""
                    });
                    var CompensationData = JSON.stringify({
                        HeaderData: headerData,
                        OperationName: "BreakageOtherLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CMBreakageOtherLinesDetails: Breakage_Otherlines
                    });
                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.Compensation_Id = result[0];
                            TRCode = TRCode + "<td style='display:none;'>" + result[1] + " </td>";
                            TRCode = "<tr class='MousePointer' id='BOTHERID_" + BreakOtherID_id + "' ng-click='EditBOTHERID(obj,$event)'><td>" + BreakOtherID_id + "</td>" + TRCode + "</tr>";
                            var html = $compile(TRCode)($scope);
                            var el = angular.element($("#Breakage_OtherLines_Details_Table tbody"));

                            el.append(html);
                            $compile(html)($scope)
                            $('#SendForApproval').css("display", "block");
                            $("#Breakage_OtherLines_Details_Modal").modal("hide");

                            var CompensationinNumber = 0.0;

                            var tablelength = $("#Breakage_OtherLines_Details_Table tbody tr").length;
                            for (var i = 1; i <= tablelength; i++) {
                                var ActualBreakageQty = $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + i + " td")[5].innerHTML;
                                CompensationinNumber = (parseFloat(CompensationinNumber) + parseFloat(ActualBreakageQty)).toFixed(0);
                            }


                            if (isNaN(CompensationinNumber)) {
                                $("#CompensationInNos").val("");
                                $scope.CompensationInNosWords = "";
                            }
                            else {
                                $("#CompensationInNos").val(CompensationinNumber);
                                $scope.CompensationInNosWords = toWords($("#CompensationInNos").val());
                            }

                        }
                    });


                    //  $("#Breakage_Investigation_Details_Table tbody").append(TRCode);
                }
                else {
                    var headerData = $scope.getHeaderData();
                    //alert(BreakOtherID_id);
                    Breakage_Otherlines.push({
                        SlNo: BreakOtherID_id,
                        SuppliedQty: BOTHER_SuppliedQtyNo,
                        TotalBreakageQty: BOTHER_TotalBreakageQtyNo,
                        TotalBreakageQtyPercentage: BOTHER_TotalBreakageQtyPer,
                        AllowedBreakagePercentage: BOTHER_AllowedBreakageQtyPer,
                        ActualBreakageQtyNos: BOTHER_ActualBreakageQtyNos,
                        Transporter: BOTHER_Transporter,
                        Remarks: BOTHER_Remarks,
                        LineID: $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[8].innerHTML
                    });
                    var CompensationData = JSON.stringify({
                        HeaderData: headerData,
                        OperationName: "BreakageOtherLinesSaving",
                        OperationType: "Save",
                        CompensationDocStatus_CM: $scope.Compensation_Status,
                        CREATED_BY: $('#USERCODE_Compensation').val(),
                        CREATED_DATE: $scope.Compensation_Date,
                        CompensationID: $scope.ID,
                        CMBreakageOtherLinesDetails: Breakage_Otherlines
                    });

                    DIMSFactory.saveCompensationData(CompensationData).success(function (data) {
                        var response = (data.tabledata);
                        if (response != "FALSE") {

                            var result = response.split('$$');
                            $scope.ID = result[0];
                            $scope.Compensation_Id = result[0];
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[0].innerHTML = BreakOtherID_id;
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[1].innerHTML = BOTHER_SuppliedQtyNo;
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[2].innerHTML = BOTHER_TotalBreakageQtyNo;
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[3].innerHTML = BOTHER_TotalBreakageQtyPer;

                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[4].innerHTML = BOTHER_AllowedBreakageQtyPer;
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[5].innerHTML = BOTHER_ActualBreakageQtyNos;
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[6].innerHTML = BOTHER_Transporter;
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[7].innerHTML = BOTHER_Remarks;
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BreakOtherID_id + " td")[8].innerHTML = result[1];

                            $("#Breakage_OtherLines_Details_Modal").modal("hide");

                            var CompensationinNumber = 0.0;

                            var tablelength = $("#Breakage_OtherLines_Details_Table tbody tr").length;
                            for (var i = 1; i <= tablelength; i++) {
                                var ActualBreakageQty = $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + i + " td")[5].innerHTML;
                                CompensationinNumber = (parseFloat(CompensationinNumber) + parseFloat(ActualBreakageQty)).toFixed(0);
                            }


                            if (isNaN(CompensationinNumber)) {
                                $("#CompensationInNos").val("");
                                $scope.CompensationInNosWords = "";
                            }
                            else {
                                $("#CompensationInNos").val(CompensationinNumber);
                                $scope.CompensationInNosWords = toWords($("#CompensationInNos").val());
                            }

                            //$("#CompensationInNos").val(CompensationinNumber);
                            //$scope.CompensationInNosWords = toWords( $("#CompensationInNos").val());

                        }
                    });


                }

                //var CompensationinNumber = 0.0;
                //var tablelength = $("#Breakage_OtherLines_Details_Table tbody tr").length;

                //for (var i = 1; i <= tablelength; i++) {
                //    var ActualBreakageQty = $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + i + " td")[5].innerHTML;
                //    CompensationinNumber = (parseFloat(CompensationinNumber) + parseFloat(ActualBreakageQty));
                //}
                //alert(parseFloat(CompensationinNumber).toFixed(0));
                //$("#CompensationInNos").val(parseFloat(CompensationinNumber).toFixed(0));
                //$scope.CompensationInNosWords = toWords($scope.CompensationInNos);

                $scope.BreakOtherID_id = "";
                $scope.BOTHER_SuppliedQtyNo = "";
                $scope.BOTHER_TotalBreakageQtyNo = "";
                $scope.BOTHER_TotalBreakageQtyPer = "";
                $scope.BOTHER_AllowedBreakageQtyPer = "";
                $scope.BOTHER_ActualBreakageQtyNos = "";
                $("#BOTHER_ActualBreakageQtyNos").val("");
                $scope.BOTHER_Transporter = "";

                $scope.BOTHER_Remarks = "";

                $("#Breakage_OtherLines_Details_Modal").modal("hide");
            }
        }
        catch (e) {
            //alert("Error : SaveBIDOtherData :" + e);

            console.clear();
            console.log(e);
            console.log(e.message);
        }

    }
    $scope.EditBOTHERID = function (obj, $event) {
        try {
            var RowId = $($event.target).parent().attr("id");
            $scope.BreakOtherID_id = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[0].innerHTML);
            $scope.BOTHER_SuppliedQtyNo = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[1].innerHTML);
            $scope.BOTHER_TotalBreakageQtyNo = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[2].innerHTML);

            $scope.BOTHER_TotalBreakageQtyPer = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[3].innerHTML);
            $scope.BOTHER_AllowedBreakageQtyPer = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[4].innerHTML);
            $scope.BOTHER_ActualBreakageQtyNos = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[5].innerHTML);
            $scope.BOTHER_Transporter = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[6].innerHTML);
            $scope.BOTHER_Remarks = ($("#Breakage_OtherLines_Details_Table tbody #" + RowId + " td")[7].innerHTML);

            $("#Breakage_OtherLines_Details_Modal").modal('show');
            $("#BOtherID_Delete").show();
            $("#BOtherID_Save").text("Update");

        }
        catch (e) {
            alert("Error : EditBOTHERID : " + e);
        }

    }
    $scope.DeleteBIDOther = function () {
        try {
            var BID_id = $scope.BreakOtherID_id;
            var Line_id = $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BID_id + " td")[8].innerHTML;
            if (Line_id != "") {
                var CompensationData = JSON.stringify({
                    OperationName: "BreakageOtherLinesSaving",
                    OperationType: "Delete",
                    ID: Line_id,
                    CREATED_BY: $('#USERCODE_Compensation').val(),
                    CREATED_DATE: $scope.Compensation_Date,
                    CompensationID: $scope.ID
                });

                DIMSFactory.deleteCompensationData(CompensationData).success(function (data) {
                    var response = (data.tabledata);
                    if (response != "FALSE") {
                        $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + BID_id + "").remove();

                        $scope.BreakOtherID_id = "";
                        $scope.BOTHER_SuppliedQtyNo = "";
                        $scope.BOTHER_TotalBreakageQtyNo = "";
                        $scope.BOTHER_TotalBreakageQtyPer = "";
                        $scope.BOTHER_AllowedBreakageQtyPer = "";
                        $scope.BOTHER_ActualBreakageQtyNos = "";
                        $("#BOTHER_ActualBreakageQtyNos").val("");
                        $scope.BOTHER_Transporter = "";
                        $scope.BOTHER_Remarks = "";



                        var i = 1;

                        $("#Breakage_OtherLines_Details_Table tbody tr").each(function () {
                            $(this).attr("id", "BOTHERID_" + i);
                            $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + i + " td")[0].innerHTML = i;
                            i = i + 1;
                        });

                        $("#Breakage_OtherLines_Details_Modal").modal("hide");


                        var CompensationinNumber = 0.0;

                        var tablelength = $("#Breakage_OtherLines_Details_Table tbody tr").length;
                        for (var i = 1; i <= tablelength; i++) {
                            var ActualBreakageQty = $("#Breakage_OtherLines_Details_Table tbody #BOTHERID_" + i + " td")[5].innerHTML;
                            CompensationinNumber = (parseFloat(CompensationinNumber) + parseFloat(ActualBreakageQty)).toFixed(0);
                        }
                        $("#CompensationInNos").val(CompensationinNumber);
                        $scope.CompensationInNosWords = toWords($("#CompensationInNos").val());
                    }
                });
            } else {
                alert("we can not delete this line");
            }
        }
        catch (e) {
            alert("Error : DeleteBIDOther : " + e);
        }
    }
    $scope.IssueCredited = function () {
        $scope.AmountCredited = $scope.CompensationIssueCreditNote;
    }

    $scope.StateChange = function () {
        try {
            var StateFilter = $("#StateFilter").val();
            $("#CMSState").val(StateFilter);
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }

    angular.element(document).on('change', '#BOTHER_AllowedBreakageQtyPer', function () {
        if ($scope.BOTHER_AllowedBreakageQtyPer > 100) {
            alert("Please Enter Value Below 100");
            $("#BOTHER_AllowedBreakageQtyPer").val("");
            $("#BOTHER_ActualBreakageQtyNos").val("");
        }

        else if (parseInt($("#BOTHER_AllowedBreakageQtyPer").val()) > parseInt($("#BOTHER_TotalBreakageQtyPer").val())) {
            alert("Allow Breakage not more than total breakage");
            $("#BOTHER_AllowedBreakageQtyPer").val("");
            $("#BOTHER_ActualBreakageQtyNos").val("");
        }
    });


    angular.element(document).on('change', '#BOTHER_SuppliedQtyNo', function () {
        //if ($scope.BOTHER_AllowedBreakageQtyPer > 100) {
        //    alert("Please Enter Value Below 100");
        //    $("#BOTHER_AllowedBreakageQtyPer").val("");
        //    $("#BOTHER_ActualBreakageQtyNos").val("");
        //}

        //else if (parseInt($("#BOTHER_AllowedBreakageQtyPer").val()) > parseInt($("#BOTHER_TotalBreakageQtyPer").val())) {
        //    alert("Allow Breakage not more than total breakage");
        //    $("#BOTHER_AllowedBreakageQtyPer").val("");
        //    $("#BOTHER_ActualBreakageQtyNos").val("");
        //}
        var suppliedqty = $("#BOTHER_SuppliedQtyNo").val();
        var Breakage_Qty_Nos = $("#BOTHER_TotalBreakageQtyNo").val();
        if (Breakage_Qty_Nos != "" && parseInt(Breakage_Qty_Nos) != 0) {

            if (suppliedqty != "") {

                if (parseFloat(Breakage_Qty_Nos) > parseFloat(suppliedqty)) {
                    //$("#BOTHER_TotalBreakageQtyNo").val("");
                    //$("#BOTHER_TotalBreakageQtyPer").val("");
                    //alert("Breakage Qty(Nos) should be less than Supplied Qty(Nos)");
                }
                else {
                    //var Breakgpercentage = (Breakage_Qty_Nos / suppliedqty) * 100;
                    //$("#BOTHER_TotalBreakageQtyPer").val(parseFloat(Breakgpercentage).toFixed(2));
                }

                var Breakgpercentage = (Breakage_Qty_Nos / suppliedqty) * 100;
                $("#BOTHER_TotalBreakageQtyPer").val(parseFloat(Breakgpercentage).toFixed(2));

            }

            if ($("#BOTHER_AllowedBreakageQtyPer").val() != "" || $("#BOTHER_AllowedBreakageQtyPer").val() != undefined) {
                var TotalQty = $("#BOTHER_TotalBreakageQtyPer").val();
                var AllowedQty = $("#BOTHER_AllowedBreakageQtyPer").val();

                TotalQty = Math.round(TotalQty * 100) / 100;
                AllowedQty = Math.round(AllowedQty * 100) / 100;

                $("#BOTHER_TotalBreakageQtyPer").val(TotalQty);
                $("#BOTHER_AllowedBreakageQtyPer").val(AllowedQty);

                var ActualBreakage = (parseFloat(TotalQty) - parseFloat(AllowedQty));

                var SuppliedQtyNo = $("#BOTHER_SuppliedQtyNo").val();
                if (SuppliedQtyNo == "") {
                    $("#BOTHER_ActualBreakageQtyNos").val("");
                }
                else {
                    ActualBreakage = parseFloat(Math.round(((SuppliedQtyNo / 100) * ActualBreakage) * 1000) / 1000).toFixed(0);
                    $("#BOTHER_ActualBreakageQtyNos").val(ActualBreakage);
                }
            }

        }
        else {
            $("#BOTHER_TotalBreakageQtyPer").val("");
            $("#BOTHER_AllowedBreakageQtyPer").val("");
            $("#BOTHER_ActualBreakageQtyNos").val("");
            $("#BOTHER_TotalBreakageQtyNo").focus();
        }

    });


    $scope.SBU3CompensationInNosUpdate = function () {
        try {


            //if ($("#CompensationRecommSBU3 tbody tr").length > 0) {
            //    var TotalComp = 0;
            //    $("#CompensationRecommSBU3 tbody tr").each(function () {
            //        var Nos = $("#CompensationRecommSBU3 tbody #" + (($(this).attr("id"))) + " td")[3].innerHTML;
            //        if (Nos == "" || Nos == null || Nos == undefined || isNaN(Nos)) {
            //        }
            //        else {
            //            TotalComp = (parseInt(TotalComp) + parseInt(Nos));
            //        }
            //    });
            //    $scope.CompensationInNos = TotalComp;
            //    $scope.CompensationInNosWords = (toWords(TotalComp));
            //    $("#CompensationInNos").val(TotalComp);
            //    $("#CompensationInNosWords").val(toWords(TotalComp));
            //}
            //else {
            //    CompensationScope.CompensationInNos = "0";
            //    CompensationScope.CompensationInNos = "ZERO";
            //}

        }
        catch (e) {
            alert("Error : SBU3CompensationInNosUpdate :" + e);
        }
    }


});

// Investigation Number Selection
function GetInvestigationNum(obj) {
    CompensationScope.$apply(function () {

        CompensationScope.Investigation_Num = $(obj).children().eq(1).html();
        // CompensationScope.Complaint_Tracking_No = $(obj).children().eq(5).html();
        $("#Investigation_Num").css("border-color", "#d2d6de");

        $('#Digital_Sign').prop('checked', true);

        CompensationScope.Complaint_Received_Date = $(obj).children().eq(2).html();
        CompensationScope.Complaint_Registered_Date = $(obj).children().eq(3).html();
        CompensationScope.Complaint_No = $(obj).children().eq(4).html();
        CompensationScope.Complaint_Tracking_No = $(obj).children().eq(5).html();
        CompensationScope.Product_Type = $(obj).children().eq(6).html();
        CompensationScope.ProductCategory_Code = $(obj).children().eq(10).html();
        if (CompensationScope.Product_Type != "" && CompensationScope.Product_Type != undefined) {
            if (CompensationScope.Product_Type == "Sheeting" || CompensationScope.Product_Type == "SBU1") {
                $("#Breakage_Investigation_Details_Div").show();
                $("#Breakage_OtherLines_Details_Div").hide();
                $("#SupplyDetailsDiv_SBU2").hide();
                $("#SubStockiest_Direct_Customer").show();
                $('#lblSubStockiest_Direct_Customer').show();
            }
            else {
                //$('#lblSubStockiest_Direct_Customer').hide();
                //$("#SubStockiest_Direct_Customer").hide();
                $("#Breakage_OtherLines_Details_Div").show();
                if (CompensationScope.Product_Type == "SBU2" || (CompensationScope.Product_Type == "SBU3" && CompensationScope.ProductCategory_Code == "36")) {
                    $("#Breakage_OtherLines_Details_Div").hide();
                    $("#SupplyDetailsDiv_SBU2").show();
                } else {
                    $("#SupplyDetailsDiv_SBU2").hide();
                }
                $("#Breakage_Investigation_Details_Div").hide();
            }
        }
        CompensationScope.ProductType_Code = $(obj).children().eq(7).html();
        CompensationScope.ProductType_ID = $(obj).children().eq(8).html();
        CompensationScope.Product_Category = $(obj).children().eq(9).html();

        if ($(obj).children().eq(9).html() == "CC Iron Sheets") {
            $(".HideMeForCCSheets").css('display', 'none');
            $("#RecommendedForCCSheetsDivision").css('display', 'block');
        }
        else {
            $(".HideMeForCCSheets").css('display', 'block');
            $("#RecommendedForCCSheetsDivision").css('display', 'none');
        }


        if ($(obj).children().eq(9).html() == "Blocks") {
            $("#CompensationinMetricCubic").val("Cubic Meters");
            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
            $("#CompensationSizeLines_Details_Table thead tr").find("td:eq(3)").html("Volume");
            $("#CompensationSizeLines_Details_Table thead tr").find("td:eq(4)").html("Cubic Meters");

        }
        else {
            $("#CompensationinMetricCubic").val("Metric Tons");
            //$("#CompensationinMetricCubic").attr('disabled', 'disabled');
        }



        CompensationScope.ProductCategory_Code = $(obj).children().eq(10).html();
        CompensationScope.ProductCategory_ID = $(obj).children().eq(11).html();
        CompensationScope.Customer_Name = $(obj).children().eq(12).html();
        CompensationScope.Customer_Code = $(obj).children().eq(13).html();
        // CompensationScope.Customer_ID = $(obj).children().eq(14).html();
        CompensationScope.Customer_Type = $(obj).children().eq(14).html();
        CompensationScope.CustomerType_Code = $(obj).children().eq(15).html();


        CompensationScope.CustomerType_ID = $(obj).children().eq(16).html();
        CompensationScope.Is_Project_Party = $(obj).children().eq(17).html();
        // CompensationScope.Compensation_Status = $(obj).children().eq(18).html();
        CompensationScope.Complaint_Attendent_Date = $(obj).children().eq(19).html();
        CompensationScope.Site_Visit_Date = $(obj).children().eq(20).html();
        CompensationScope.Previous_Visit_Date = $(obj).children().eq(21).html();
        CompensationScope.Investigation_Done_By = $(obj).children().eq(22).html();
        CompensationScope.SalesRepresentativeEmployeeCode = $(obj).children().eq(23).html();
        CompensationScope.SalesRepresentativeEmployeeName = $(obj).children().eq(24).html();
        CompensationScope.Customer_Location = $(obj).children().eq(25).html();
        CompensationScope.Contact_City = $(obj).children().eq(26).html();
        CompensationScope.Contact_State = $(obj).children().eq(27).html();
        CompensationScope.Contact_Area = $(obj).children().eq(28).html();
        CompensationScope.Contact_Person = $(obj).children().eq(29).html();


        CompensationScope.Contact_Number = $(obj).children().eq(30).html();
        CompensationScope.Customer_Fax = $(obj).children().eq(31).html();
        CompensationScope.Customer_Email = $(obj).children().eq(32).html();
        CompensationScope.Site_Address = $(obj).children().eq(33).html();
        CompensationScope.StateCode = $(obj).children().eq(34).html();
        CompensationScope.StateID = $(obj).children().eq(35).html();
        CompensationScope.CityID = $(obj).children().eq(36).html();
        CompensationScope.CityCode = $(obj).children().eq(37).html();
        CompensationScope.AreaCode = $(obj).children().eq(38).html();

        CompensationScope.AreaID = $(obj).children().eq(39).html();
        CompensationScope.SALES_REPRESENTATIVE_ID = $(obj).children().eq(40).html();
        CompensationScope.Investigation_Date = $(obj).children().eq(41).html();
        if ($(obj).children().eq(42).html() == "True" || $(obj).children().eq(42).html() == "true") {
            CompensationScope.Is_Project_Party = true;
        }
        else {
            CompensationScope.Is_Project_Party = false;
        }

        CompensationScope.Investigation_Remarks = $(obj).children().eq(43).html();

        CompensationScope.Complaint_Description = $(obj).children().eq(44).html();

        if (CompensationScope.Product_Type == "SBU1" || CompensationScope.Product_Type == "Sheeting") {
            CompensationScope.Product_Type = "SBU1";
        }
        else if (CompensationScope.Product_Type == "SBU2" || CompensationScope.Product_Type == "Aerocon") {
            CompensationScope.Product_Type = "SBU2";
        }
        else if (CompensationScope.Product_Type == "SBU3" || CompensationScope.Product_Type == "Insulation") {
            CompensationScope.Product_Type = "SBU3";
        }

        //svprasadk 24-06-2020 SBU 1 requirement to add sub stockiest master start
        //alert(CompensationScope.Product_Type + " - " + $(obj).children().eq(62).html())
        //alert(JSON.stringify($(obj).children()))
        //alert(obj)
        //alert(JSON.stringify(obj))
        if (CompensationScope.Product_Type == "SBU1") {
            $("#SubStockiest_Direct_CustomerDiv").hide();
            $("#PartyTypeDiv").show();
            $("#Is_Project_PartyDiv").hide();
            $("#SubStockiest_CodeDiv").hide();
            $("#Site_AddressDiv").hide();
            $("#SubStockiest_NameDiv").hide();
            $("#SubStockiest_AddressDiv").hide();
            $("#SubStockiest_NumberDiv").hide();
            $("#party_type_id").val($(obj).children().eq(61).html());
            CompensationScope.party_type_id = $(obj).children().eq(61).html();
            $("#party_type").val($(obj).children().eq(62).html());
            CompensationScope.party_type = $(obj).children().eq(62).html();
            $("#SubStockiest_ID").val($(obj).children().eq(63).html());
            CompensationScope.SubStockiest_ID = $(obj).children().eq(63).html();
            $("#SubStockiest_Code").val($(obj).children().eq(63).html());
            CompensationScope.SubStockiest_Code = $(obj).children().eq(63).html();
            $("#SubStockiest_Name").val($(obj).children().eq(64).html());
            CompensationScope.SubStockiest_Name = $(obj).children().eq(64).html();
            $("#SubStockiest_Address").val($(obj).children().eq(65).html());
            CompensationScope.SubStockiest_Address = $(obj).children().eq(65).html();
            $("#SubStockiest_Number").val($(obj).children().eq(66).html());
            CompensationScope.SubStockiest_Number = $(obj).children().eq(66).html();
            if (CompensationScope.party_type == "SubDealer" || CompensationScope.party_type == 2 || CompensationScope.party_type == "Sub-Stockiest") {
                $("#SubStockiest_CodeDiv").show();
                $("#SubStockiest_NameDiv").show();
                $("#SubStockiest_AddressDiv").show();
                $("#SubStockiest_NumberDiv").show();
            } else {
                if (CompensationScope.party_type != "") {
                    //$("#party_type").val("SubDealer");
                    $("#party_type_id").val($(obj).children().eq(61).html());
                    $("#party_type").val($(obj).children().eq(62).html());
                    $("#SubStockiest_CodeDiv").show();
                    $("#SubStockiest_NameDiv").show();
                    $("#SubStockiest_AddressDiv").show();
                    $("#SubStockiest_NumberDiv").show();
                    $("#SubStockiest_ID").val($(obj).children().eq(63).html());
                    CompensationScope.SubStockiest_ID = $(obj).children().eq(63).html();
                    $("#SubStockiest_Code").val($(obj).children().eq(63).html());
                    CompensationScope.SubStockiest_Code = $(obj).children().eq(63).html();
                    $("#SubStockiest_Name").val($(obj).children().eq(64).html());
                    CompensationScope.SubStockiest_Name = $(obj).children().eq(64).html();
                    $("#SubStockiest_Address").val($(obj).children().eq(65).html());
                    CompensationScope.SubStockiest_Address = $(obj).children().eq(65).html();
                    $("#SubStockiest_Number").val($(obj).children().eq(66).html());
                    CompensationScope.SubStockiest_Number = $(obj).children().eq(66).html();
                } else {
                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                    $("#party_type").val(HeaderData[0]["party_type"]);
                    //$scope.party_type_id = HeaderData[0]["party_type_id"];
                    //$scope.party_type = HeaderData[0]["party_type"];
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                    //$("#party_type").val("Dealer");
                    //$("#party_type_id").val(1);
                    //$("#party_type").val("Stockiest");
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
            $("#SubStockiest_Direct_Customer").val("");
            $("#Is_Project_Party").prop("checked", false);
            $("#Site_Address").val("");
            //svprasadk 24-06-2020 SBU 1 requirement to add sub stockiest master end

            //svprasadk 24-06-2020 SBU 1 requirement to add type of complaint start
            $("#TYPE_OF_COMPLAINT_DIV").show();
            //if ($(obj).children().eq(67).html() > 0) {
            //    $("#TYPE_OF_COMPLAINT > [value=" + $(obj).children().eq(67).html() + "]").attr("selected", "true");
            //} else {
            //    $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
            //}
            $("#TYPE_OF_COMPLAINT_ID").val($(obj).children().eq(67).html());
            CompensationScope.TYPE_OF_COMPLAINT_ID = $(obj).children().eq(67).html();
            $("#TYPE_OF_COMPLAINT").val($(obj).children().eq(68).html());
            CompensationScope.TYPE_OF_COMPLAINT = $(obj).children().eq(68).html();
            //CompensationScope.TYPE_OF_COMPLAINT = $(obj).children().eq(67).html();
            //svprasadk 24-06-2020 SBU 1 requirement to add type of complaint end
        } else if (CompensationScope.Product_Type == "SBU2") {
            //svprasadk 24-06-2020 SBU 1 requirement to add sub stockiest master start
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

            //svprasadk 24-06-2020 SBU 1 requirement to add sub stockiest master end

            //svprasadk 24-06-2020 SBU 1 requirement to add type of complaint start            
            $("#TYPE_OF_COMPLAINT_DIV").hide();
            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
            //CompensationScope.TYPE_OF_COMPLAINT = $(obj).children().eq(67).html();
            $("#TYPE_OF_COMPLAINT_ID").val($(obj).children().eq(67).html());
            CompensationScope.TYPE_OF_COMPLAINT_ID = $(obj).children().eq(67).html();
            $("#TYPE_OF_COMPLAINT").val($(obj).children().eq(68).html());
            CompensationScope.TYPE_OF_COMPLAINT = $(obj).children().eq(68).html();
            //svprasadk 24-06-2020 SBU 1 requirement to add type of complaint end
        } else if (CompensationScope.Product_Type == "SBU3") {
            //svprasadk 24-06-2020 SBU 1 requirement to add sub stockiest master start
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

            //svprasadk 24-06-2020 SBU 1 requirement to add sub stockiest master end

            //svprasadk 24-06-2020 SBU 1 requirement to add type of complaint start
            $("#TYPE_OF_COMPLAINT_DIV").hide();
            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
            //CompensationScope.TYPE_OF_COMPLAINT = $(obj).children().eq(67).html();
            $("#TYPE_OF_COMPLAINT_ID").val($(obj).children().eq(67).html());
            CompensationScope.TYPE_OF_COMPLAINT_ID = $(obj).children().eq(67).html();
            $("#TYPE_OF_COMPLAINT").val($(obj).children().eq(68).html());
            CompensationScope.TYPE_OF_COMPLAINT = $(obj).children().eq(68).html();
            //svprasadk 24-06-2020 SBU 1 requirement to add type of complaint end
        }

        SheetingLabels($(obj).children().eq(9).html());

        //CompensationScope.SaveCompensation();
    });
    //$scope.CREATED_IN = HeaderData[0]["CREATED_IN"];
    //$("#CREATED_IN").val(HeaderData[0]["CREATED_IN"]);
    $("#SelectedComplaintFiles").append($(obj).children().eq(45).html()).trigger('change');
    $("#SelectedInvestigationFiles").append($(obj).children().eq(46).html()).trigger('change');
    var element = angular.element('#LookUpModal');
    element.modal('hide');
    CompensationScope.getMaterialSupplyDetails(CompensationScope.Investigation_Num);
}



function MakeTotalsForSheetingTable() {
    try {

        var RowId = "";

        //alert("Please Wait getting calculation done");

        var SuppliedQtyM = "";
        var BreakageQtyM = "";

        if ($("#Product_Category").val() == "AC Sheets") {
            $("#Breakage_Investigation_Details_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));

                if (SuppliedQtyM == "") {
                    SuppliedQtyM = 0;
                }
                if (BreakageQtyM == "") {
                    BreakageQtyM = 0;
                }

                SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML);
            });

            $("#Total_Supply_Qty_Mtrs_Compensation").val(SuppliedQtyM);
            $("#Total_Breakage_Qty_Mtrs_Compensation").val(BreakageQtyM);

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

            $("#Total_Supply_Qty_Mtrs_Compensation").val(SuppliedQtyM);
            $("#Total_Breakage_Qty_Mtrs_Compensation").val(BreakageQtyM);

            $("#Total_Supply_Qty_Tons_Compensation").val(TotSupTons);
            $("#Total_Breakage_Qty_Tons_Compensation").val(TotBrkTons);


            //$("#Total_Recovery_Mtrs_Compensation").val("0");
            //$("#Net_Loss_Mtrs_Compensation").val("0");
            //$("#Total_Recovery_Tons_Compensation").val("0");
            //$("#Net_Loss_Tons_Compensation").val("0");

            var Supply = $("#Total_Supply_Qty_Mtrs_Compensation").val();
            var Breakage = $("#Total_Breakage_Qty_Mtrs_Compensation").val();
            var Recovery = $("#Total_Recovery_Mtrs_Compensation").val();
            var NetLoss = $("#Net_Loss_Mtrs_Compensation").val();

            if (Breakage == "" || NetLoss == "") {
                $("#Net_Loss_Mtrs_Compensation").val();
                $("#Total_Recovery_Tons_Compensation").val();
            }
            else {
                NetLoss = parseFloat(Breakage) - parseFloat(Recovery);

                $("#Net_Loss_Mtrs_Compensation").val(NetLoss);

                NetLoss = parseFloat(NetLoss) * 0.01269;
                NetLoss = Math.round(NetLoss * 10000) / 10000;
                $("#Total_Recovery_Tons_Compensation").val(NetLoss);

            }
        }

        else if ($("#Product_Category").val() == "CC Iron Sheets") {

            var ProductArray = new Array();

            $("#Breakage_Investigation_Details_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));

                if (SuppliedQtyM == "") {
                    SuppliedQtyM = 0;
                }
                if (BreakageQtyM == "") {
                    BreakageQtyM = 0;
                }

                SuppliedQtyM = parseFloat(SuppliedQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[5].innerHTML);
                BreakageQtyM = parseFloat(BreakageQtyM) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML);

                //alert( + "\t" + ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[5].innerHTML) + "\t" + ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML));

                ProductArray.push({
                    ProdCode: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[13].innerHTML),
                    Size: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[2].innerHTML),
                    ProdSupplyNos: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[4].innerHTML),
                    ProdBreakNos: ($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[7].innerHTML)
                });

            });

            ProductArray = JSON.stringify(ProductArray);

            $.ajax({
                type: 'POST',
                data: { ProductArray: ProductArray },
                url: '../../ComplaintRegistration/CCSheetCalculation',
                success: function (Resp) {
                    //alert("Resp : " + JSON.stringify(Resp));

                    if (Resp == "") {
                    }
                    else {
                        Resp = JSON.parse(Resp);

                        $("#Total_Supply_Qty_Mtrs_Compensation").val(Resp["TotalSupplyLength"]);
                        $("#Total_Breakage_Qty_Mtrs_Compensation").val(Resp["TotalBreakLength"]);

                        $("#Total_Supply_Qty_Tons_Compensation").val(Resp["TotalSupplyTons"]);
                        $("#Total_Breakage_Qty_Tons_Compensation").val(Resp["TotalBreakTons"]);

                        var RecoveryLength = $("#Total_Recovery_Mtrs_Compensation").val();
                        var RecoveryWeight = $("#Total_Recovery_Tons_Compensation").val();

                        if (RecoveryLength == "") {
                            $("#Net_Loss_Mtrs_Compensation").val("0");
                        }
                        else {
                            var D = parseFloat(Resp["TotalBreakLength"]) - parseFloat(RecoveryLength);
                            D = Math.round(D * 10000) / 10000;
                            $("#Net_Loss_Mtrs_Compensation").val(D);
                        }

                        if (RecoveryWeight == "") {
                            $("#Net_Loss_Tons_Compensation").val("0");
                        }
                        else {
                            var D = parseFloat(Resp["TotalBreakTons"]) - parseFloat(RecoveryWeight);
                            D = Math.round(D * 10000) / 10000;
                            $("#Net_Loss_Tons_Compensation").val(D);
                        }


                    }

                }
            });




            /*

            $("#Total_Supply_Qty_Mtrs_Compensation").val(SuppliedQtyM);
            $("#Total_Breakage_Qty_Mtrs_Compensation").val(BreakageQtyM);

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

            $("#Total_Supply_Qty_Mtrs_Compensation").val(SuppliedQtyM);
            $("#Total_Breakage_Qty_Mtrs_Compensation").val(BreakageQtyM);

            $("#Total_Supply_Qty_Tons_Compensation").val(TotSupTons);
            $("#Total_Breakage_Qty_Tons_Compensation").val(TotBrkTons);

            var Supply = $("#Total_Supply_Qty_Mtrs_Compensation").val();
            var Breakage = $("#Total_Breakage_Qty_Mtrs_Compensation").val();
            var Recovery = $("#Total_Recovery_Mtrs_Compensation").val();
            var NetLoss = $("#Net_Loss_Mtrs_Compensation").val();

            if (Breakage == "" || NetLoss == "") {
                $("#Net_Loss_Mtrs_Compensation").val();
                $("#Total_Recovery_Tons_Compensation").val();
            }
            else {
                NetLoss = parseFloat(Breakage) - parseFloat(Recovery);

                $("#Net_Loss_Mtrs_Compensation").val(NetLoss);

                NetLoss = parseFloat(NetLoss) * 0.01269;
                NetLoss = Math.round(NetLoss * 10000) / 10000;
                $("#Total_Recovery_Tons_Compensation").val(NetLoss);

            }

            */
            setNo_of_36valueComp();
        }

    }
    catch (e) {
        alert("Error : MakeTotalsForSheetingTable : " + e);
    }
}



//Total Tons for sizeLines

function MakeTotalsForSizeLines() {
    var CompensationSizeLineNosSum = "";
    $("#CompensationSizeLines_Details_Table").find("tbody tr").each(function () {

        if (CompensationSizeLineNosSum == "") {
            CompensationSizeLineNosSum = 0;
        }
        var temp = $(this).find("td:eq(4)").text();
        CompensationSizeLineNosSum = (parseFloat(CompensationSizeLineNosSum) + parseFloat(temp)).toFixed(4);

    });
    $scope.CompensationinMetricCubicValue = CompensationSizeLineNosSum;
}

// Recommendation Size Selection
function GetRecommendedSizeCompensation(obj) {
    CompensationScope.$apply(function () {
        var Grosswt = $(obj).children().eq(6).html();
        var FinalGrosswt = 0.0;
        if (parseInt(Grosswt) != 0 && Grosswt != "") {
            FinalGrosswt = (parseFloat(Grosswt / 1000));
            FinalGrosswt = FinalGrosswt.toFixed(4);
        }
        CompensationScope.CompensationSizeLineGrossWeight = FinalGrosswt;
        CompensationScope.CompensationRecommendedSize = $(obj).children().eq(2).html();
        CompensationScope.CompensationProductCode = $(obj).children().eq(1).html();
        CompensationScope.CompensationProductID = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetRecommendedSizeCompensation_SBU2(obj) {
    CompensationScope.$apply(function () {
        var Grosswt = $(obj).children().eq(6).html();
        var FinalGrosswt = 0.0;
        if (parseInt(Grosswt) != 0 && Grosswt != "") {

            //FinalGrosswt = (parseFloat(Grosswt / 1000));
            //FinalGrosswt = FinalGrosswt.toFixed(4);
            FinalGrosswt = parseFloat(Grosswt);
            FinalGrosswt = FinalGrosswt.toFixed(4);
        }
        if ($("#Product_Category").val() == "Blocks") {
            CompensationScope.CompensationSizeLineGrossWeight = Grosswt;
        }
        else {
            CompensationScope.CompensationSizeLineGrossWeight = FinalGrosswt;
        }
        CompensationScope.CompensationRecommendedSize = $(obj).children().eq(2).html();
        CompensationScope.CompensationProductCode = $(obj).children().eq(1).html();
        CompensationScope.CompensationProductID = $(obj).children().eq(0).html();
    })

    CalculateGrossWt();

    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Document Series Selection
function getCompensationDocumentSeriesData(obj) {
    CompensationScope.$apply(function () {

        // CompensationScope.CMSeriesFinancialPeriod_Model = $(obj).children().eq(2).html();
        CompensationScope.COMP_Series_Code = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}



// Compensation Mode Selection
function GetCompensation_Mode_Mast(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.Compensation_Mode = $(obj).children().eq(2).html();
        CompensationScope.Compensation_Mode_Code = $(obj).children().eq(1).html();
        CompensationScope.Compensation_Mode_ID = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Plant Code Selection
function GetPlantMasterComp(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.Material_Belongs_To = $(obj).children().eq(2).html();
        CompensationScope.Materrial_Belongs_To_PlantCode = $(obj).children().eq(1).html();
        CompensationScope.Materrial_Belongs_To_PlantId = $(obj).children().eq(0).html();
    })

    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Product Supplied Selection
function GetProduct_Supplied_FromComp(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.Product_Supplied_From = $(obj).children().eq(2).html();
        CompensationScope.ProductSuppliedFrom_CODE = $(obj).children().eq(1).html();
        CompensationScope.ProductSuppliedFrom_ID = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Material Suppply Selection
function GetMSD_NameComp(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.MSD_Name = $(obj).children().eq(2).html();
        CompensationScope.Name_CODE = $(obj).children().eq(1).html();
        CompensationScope.Name_Id = $(obj).children().eq(0).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Product Name Selection
function GetItem_Type_Product_NameComp(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.GrossWeight = $(obj).children().eq(5).html();
        CompensationScope.Item_Type_Product_Name = $(obj).children().eq(2).html();
        CompensationScope.Item_Type_Product_Id = $(obj).children().eq(0).html();
        CompensationScope.Item_Type_Product_Code = $(obj).children().eq(1).html();


    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Defect Type Selection
function GetDefect_TypeComp(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.Defect_Type = $(obj).children().eq(2).html();

        CompensationScope.Defect_Type_Id = $(obj).children().eq(0).html();
        CompensationScope.Defect_Type_Code = $(obj).children().eq(1).html();

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// Plant Master based on investigation Selection
function GetPlantMasterInv_Compensation(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.Materrial_Belongs_To_PlantId = $(obj).children().eq(0).html();
        CompensationScope.Materrial_Belongs_To_PlantCode = $(obj).children().eq(1).html();
        CompensationScope.Material_Belongs_To = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Product Supllied based on Investigation Selection
function GetProductSuppliedFromInv_Compensation(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.ProductSuppliedFrom_ID = $(obj).children().eq(0).html();
        CompensationScope.ProductSuppliedFrom_CODE = $(obj).children().eq(1).html();
        CompensationScope.Product_Supplied_From = $(obj).children().eq(2).html();
        CompensationScope.MSD_Name = "";
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// MSD BASED on Investigation Selection
function GetMSD_NameInv_Compensation(obj) {
    CompensationScope.$apply(function () {
        CompensationScope.Name_Id = $(obj).children().eq(0).html();
        CompensationScope.Name_CODE = $(obj).children().eq(1).html();
        CompensationScope.MSD_Name = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// Calculate Net Losss
function CalculateNetLossqty() {

    // var res = isNumber(evt);
    //if (res == true) {
    var suppliedqty = $("#MSD_Supply_Qty").val();
    var Breakageqty = $("#MSD_Breakage_Qty").val();

    var Total_Supply_Qty_Tons_Compensation = $("#Total_Supply_Qty_Tons_Compensation").val();
    var Total_Breakage_Qty_Tons_Compensation = $("#Total_Supply_Qty_Tons_Compensation").val();


    if ((suppliedqty != "" && parseInt(suppliedqty) != 0) && (Breakageqty != "" && parseInt(Breakageqty) != 0)) {

        if (parseFloat(suppliedqty) >= parseFloat(Breakageqty)) {
            var netLossQty = parseFloat(parseFloat(suppliedqty) - parseFloat(Breakageqty)).toFixed(2);

            // CompensationScope.MSD_Net_Loss_Qty = netLossQty;

            //$("#MSD_Net_Loss_Qty").val(netLossQty);
        } else if (parseFloat(suppliedqty) < parseFloat(Breakageqty)) {

            alert("Breakage Qty should not be more than Supplied Qty");
            $("#MSD_Breakage_Qty").val("");
        }
        else if (parseFloat(suppliedqty) >= parseFloat(Total_Supply_Qty_Tons_Compensation)) {
            alert("supplied Qty should not be more than total Supplied Qty");
            $("#MSD_Supply_Qty").val("");
        }
        else if (parseFloat(Breakageqty) >= parseFloat(Total_Breakage_Qty_Tons_Compensation)) {
            alert("Breakage Qty should not be more than total Breakage Qty");
            $("#MSD_Breakage_Qty").val("");
        }

        $("#MSD_Net_Loss_Qty").val("");


    }


    //} else {
    //    return false;
    //}
};
// Calculate Supply Qty in Tons
function CalculateSupplyinTons() {
    var suppliedqty = $("#Supplied_Qty_Nos").val();
    //if (suppliedqty != "" && parseInt(suppliedqty) != 0) {
    if (suppliedqty != "") {
        var tons = parseFloat((parseFloat(suppliedqty)) * (4 / 100));
        $("#Supplied_Qty_Tons").val(tons);
        if ($("#Size_M").val() != "" && parseFloat($("#Size_M").val()) != 0) {
            var SuppliedQtyMeter = (parseFloat($("#Size_M").val()).toFixed(2)) * (parseFloat(suppliedqty).toFixed(2));
            console.log("SuppliedQtyMeter : " + SuppliedQtyMeter);
            $("#Supplied_Qty_M").val(parseFloat(SuppliedQtyMeter).toFixed(2));
        }
        $("#Breakage_Qty_Nos").val("");
        $("#Breakage_Qty_M").val("");
        $("#Breakage_Percentage").val("");
    }
};
// Calculate Breakage Percentage
function CalculateBreakagePercentage() {
    var suppliedqty = $("#Supplied_Qty_Nos").val();
    var Breakage_Qty_Nos = $("#Breakage_Qty_Nos").val();

    //if (Breakage_Qty_Nos != "" && parseFloat(Breakage_Qty_Nos) != 0) {
    if (Breakage_Qty_Nos != "") {
        var tons = parseFloat((parseFloat(Breakage_Qty_Nos)) * (4 / 100));

        $("#Breakage_Qty_Tons").val(tons);

        if ($("#Size_M").val() != "" && parseFloat($("#Size_M").val()) != 0) {
            if (suppliedqty != "") {

                var BreakageQtyMeter = (parseFloat($("#Size_M").val()).toFixed(2)) * (parseFloat(Breakage_Qty_Nos).toFixed(2));
                $("#Breakage_Qty_M").val(parseFloat(BreakageQtyMeter).toFixed(2));
                var Breakgpercentage = ((Breakage_Qty_Nos) / ((suppliedqty))) * 100;
                Breakgpercentage = Math.round((Breakgpercentage * 100) / 100);

                if (Breakgpercentage == Infinity) {
                    $("#Breakage_Percentage").val("0");
                }
                else {
                    $("#Breakage_Percentage").val(parseFloat(Breakgpercentage));
                }

                if (parseFloat(Breakage_Qty_Nos) > parseFloat(suppliedqty)) {
                    //$("#Breakage_Qty_Nos").val("");
                    //$("#Breakage_Qty_M").val("");
                    //$("#Breakage_Percentage").val("");
                    //alert("Breakage Qty(Nos) should be less than Supplied Qty(Nos)");
                }
                else {
                    //var BreakageQtyMeter = (parseFloat($("#Size_M").val()).toFixed(2)) * (parseFloat(Breakage_Qty_Nos).toFixed(2));
                    //$("#Breakage_Qty_M").val(parseFloat(BreakageQtyMeter).toFixed(2));
                    //var Breakgpercentage = ((Breakage_Qty_Nos) / ((suppliedqty))) * 100;
                    //Breakgpercentage = Math.round((Breakgpercentage * 100) / 100);
                    //$("#Breakage_Percentage").val(parseFloat(Breakgpercentage));
                }
            }
        }
    }
}

// Calculate Breakage percenatage for breakage lines
function CalculateBreakagePercentage_BreakageLines() {
    var suppliedqty = $("#BOTHER_SuppliedQtyNo").val();
    var Breakage_Qty_Nos = $("#BOTHER_TotalBreakageQtyNo").val();
    if (Breakage_Qty_Nos != "" && parseInt(Breakage_Qty_Nos) != 0) {

        if (suppliedqty != "") {

            if (parseFloat(Breakage_Qty_Nos) > parseFloat(suppliedqty)) {
                //$("#BOTHER_TotalBreakageQtyNo").val("");
                //$("#BOTHER_TotalBreakageQtyPer").val("");
                //alert("Breakage Qty(Nos) should be less than Supplied Qty(Nos)");
            }
            else {
                //var Breakgpercentage = (Breakage_Qty_Nos / suppliedqty) * 100;
                //$("#BOTHER_TotalBreakageQtyPer").val(parseFloat(Breakgpercentage).toFixed(2));
            }
            var Breakgpercentage = (Breakage_Qty_Nos / suppliedqty) * 100;
            $("#BOTHER_TotalBreakageQtyPer").val(parseFloat(Breakgpercentage).toFixed(2));

        }

        if ($("#BOTHER_AllowedBreakageQtyPer").val() != "" || $("#BOTHER_AllowedBreakageQtyPer").val() != undefined) {
            var TotalQty = $("#BOTHER_TotalBreakageQtyPer").val();
            var AllowedQty = $("#BOTHER_AllowedBreakageQtyPer").val();

            TotalQty = Math.round(TotalQty * 100) / 100;
            AllowedQty = Math.round(AllowedQty * 100) / 100;

            $("#BOTHER_TotalBreakageQtyPer").val(TotalQty);
            $("#BOTHER_AllowedBreakageQtyPer").val(AllowedQty);

            var ActualBreakage = (parseFloat(TotalQty) - parseFloat(AllowedQty));

            var SuppliedQtyNo = $("#BOTHER_SuppliedQtyNo").val();
            if (SuppliedQtyNo == "") {
                $("#BOTHER_ActualBreakageQtyNos").val("");
            }
            else {
                ActualBreakage = parseInt(Math.round(((SuppliedQtyNo / 100) * ActualBreakage) * 1000) / 1000);
                $("#BOTHER_ActualBreakageQtyNos").val(parseInt(ActualBreakage));
            }
        }

    }



}

// Calculate Gross Weight
function CalculateGrossWt() {

    var Nos = $("#CompensationSizeLineNos").val();

    var FinalNos = "";
    if (Nos != "") {

        var GrossWt = $("#CompensationSizeLineGrossWeight").val();

        if ($("#Product_Category").val() == "Blocks") {
            if (GrossWt != "") {
                FinalNos = parseFloat(Nos * GrossWt).toFixed(4);

                $("#CompensationSizeLineTons").val(FinalNos);
            }
        }
        else if ($("#Product_Category").val() == "Traded material") {
            if (GrossWt != "") {
                FinalNos = parseFloat(parseFloat(Nos) * (parseFloat(GrossWt)) / 1000).toFixed(4);
                $("#CompensationSizeLineTons").val(FinalNos);
            }
        }
        else if ($("#Product_Category").val() == "Hysil") {
            if (GrossWt != "") {
                FinalNos = parseFloat(parseFloat(Nos) * (parseFloat(GrossWt)) / 1000).toFixed(4);
                $("#CompensationSizeLineTons").val(FinalNos);
            }
        }
        else if ($("#Product_Category").val() == "Panel") {
            if (GrossWt != "") {
                FinalNos = parseFloat(parseFloat(Nos) * (parseFloat(GrossWt)) / 1000).toFixed(4);
                $("#CompensationSizeLineTons").val(FinalNos);
            }
        }
        else if ($("#Product_Category").val() == "Flat Products") {
            if (GrossWt != "") {
                FinalNos = parseFloat(parseFloat(Nos) * (parseFloat(GrossWt)) / 1000).toFixed(4);
                $("#CompensationSizeLineTons").val(FinalNos);
            }
        }
        else {

            if (GrossWt != "") {
                FinalNos = parseFloat((Nos * GrossWt) / 1000).toFixed(4);
                $("#CompensationSizeLineTons").val(FinalNos);
            }
        }

    }

}

// Calculate Total supply Qty Mtrs change
function Total_Supply_Oty_MtrsChange_Compensation() {
    try {
        var A1 = $("#Total_Supply_Qty_Mtrs_Compensation").val();

        if (A1 == "" || isNaN(A1)) {
            $("#Total_Supply_Qty_Mtrs_Compensation").val("");
            $("#Total_Supply_Qty_Tons_Compensation").val("");
        }
        else {
            A1 = Math.round(A1 * 10000) / 10000;
            $("#Total_Supply_Qty_Mtrs_Compensation").val(A1);
            A1 = parseFloat(A1) * 0.01269;
            A1 = Math.round(A1 * 10000) / 10000;
            $("#Total_Supply_Qty_Tons_Compensation").val(A1);

            var A2 = $("#Total_Breakage_Qty_Mtrs_Compensation").val();
            A1 = $("#Total_Supply_Qty_Mtrs_Compensation").val();

            if (A2 == "") {

            }
            else if (parseFloat(A2) > parseFloat(A1)) {
                alert("Total Supply Quantity cannot be lessthan the Total Breakage Quantity");
                $("#Total_Breakage_Qty_Mtrs_Compensation").val("");
                $("#Total_Breakage_Qty_Tons_Compensation").val("");
            }

            $("#Total_Breakage_Qty_Mtrs_Compensation").focus();
        }


        /*
        $("#Total_Breakage_Qty_Mtrs_Compensation").val("");
        $("#Total_Recovery_Mtrs_Compensation").val("");
        $("#Net_Loss_Mtrs_Compensation").val("");

        $("#Total_Breakage_Qty_Tons_Compensation").val("");
        $("#Total_Recovery_Tons_Compensation").val("");
        $("#Net_Loss_Tons_Compensation").val("");
        */


        //$("#Compensation_In_Running_Meters").val("");
        //$("#Compensation_In_Tons").val("");
    }
    catch (e) {
        alert("Error : Total_Supply_Oty_MtrsChange : " + e);
    }
}
// Calculate Total Breakage Qty Mtrs change
function Total_Breakage_Qty_MtrsChange_Compensation() {
    try {

        var A1 = $("#Total_Supply_Qty_Mtrs_Compensation").val();

        if (A1 == "") {
            alert("Please Enter Supply Quantity");
            $("#Total_Breakage_Qty_Mtrs_Compensation").val("");
            $("#Total_Breakage_Qty_Tons_Compensation").val("");
        }
        else {
            var A2 = $("#Total_Breakage_Qty_Mtrs_Compensation").val();

            if (A2 == "" || isNaN(A2)) {
                $("#Total_Breakage_Qty_Mtrs_Compensation").val("");
                $("#Total_Breakage_Qty_Tons_Compensation").val("");
            }
            else {
                A2 = Math.round(A2 * 10000) / 10000;
                if (A2 > A1) {
                    alert("Breakage Quantity has to be lessthan Supply Quantity");
                    $("#Total_Breakage_Qty_Mtrs_Compensation").val("");
                    $("#Total_Breakage_Qty_Tons_Compensation").val("");
                }
                else {
                    $("#Total_Breakage_Qty_Mtrs_Compensation").val(A2);
                    A2 = parseFloat(A2) * 0.01269;
                    A2 = Math.round(A2 * 10000) / 10000;
                    $("#Total_Breakage_Qty_Tons_Compensation").val(A2);

                    A2 = $("#Total_Breakage_Qty_Mtrs_Compensation").val();
                    var A3 = $("#Total_Recovery_Mtrs_Compensation").val();

                    if (parseFloat(A2) < parseFloat(A3)) {
                        alert("Total Breakage Quantity cannot be lessthan Total Recovery");
                        $("#Total_Recovery_Mtrs_Compensation").val("");
                        $("#Total_Recovery_Tons_Compensation").val("");
                        $("#Total_Recovery_Mtrs_Compensation").focus();
                    }
                    else {

                    }
                }
            }
        }

        //$("#Total_Recovery_Mtrs_Compensation").val("");
        //$("#Total_Recovery_Tons_Compensation").val("");
        //$("#Net_Loss_Mtrs_Compensation").val("");
        //$("#Net_Loss_Tons_Compensation").val("");

        //$("#Compensation_In_Running_Meters").val("");
        //$("#Compensation_In_Tons").val("");

    }
    catch (e) {
        alert("Error : Total_Breakage_Qty_MtrsChange : " + e);
    }
}
// Calculate Total Recovery Qty Mtrs change
function Total_Recovery_MtrsChange_Compensation() {

    try {
        var A3 = $("#Total_Recovery_Mtrs_Compensation").val();
        var A2 = $("#Total_Breakage_Qty_Mtrs_Compensation").val();

        if (A2 == "") {
            alert("Please enter Supply and Breakage Quantities");
            $("#Total_Recovery_Mtrs_Compensation").val("");
            $("#Total_Recovery_Tons_Compensation").val("");
        }
        else {
            if (A3 == "" || isNaN(A3)) {
                $("#Total_Recovery_Mtrs_Compensation").val("");
                $("#Total_Recovery_Tons_Compensation").val("");
            }
            else {
                A3 = Math.round(A3 * 10000) / 10000;
                if (A3 > A2) {
                    alert("Recovery Quantity cannot be more than Breakage Quantity");
                    $("#Total_Recovery_Mtrs_Compensation").val("");
                    $("#Total_Recovery_Tons_Compensation").val("");
                }
                else {
                    $("#Total_Recovery_Mtrs_Compensation").val(A3);
                    A3 = parseFloat(A3) * 0.01269;
                    A3 = Math.round(A3 * 10000) / 10000;
                    $("#Total_Recovery_Tons_Compensation").val(A3);
                }
            }
        }
        $("#Net_Loss_Mtrs_Compensation").val("");
        $("#Net_Loss_Tons_Compensation").val("");

        //$("#Compensation_In_Running_Meters").val("");
        //$("#Compensation_In_Tons").val("");
        //CalculateNetLoss_Compensation();
        setNo_of_36value();
    }
    catch (e) {
        alert("Error : Total_Recovery_MtrsChange : " + e);
    }

}


function Total_Recovery_Tons_Compensation_Change()
{
    if ($("#Total_Recovery_Tons_Compensation").val() == "") {
        $("#Net_Loss_Tons_Compensation").val("");
    }
    else {
        CalculateNetLoss_Compensation();
    }
    
}


// Calculate Net Loss change
function CalculateNetLoss_Compensation() {
    try {
        var A2 = $("#Total_Breakage_Qty_Mtrs_Compensation").val();
        var A3 = $("#Total_Recovery_Mtrs_Compensation").val();

        if (A2 == "" || A3 == "") {
            $("#Net_Loss_Mtrs_Compensation").val("");
            $("#Compensation_In_Running_Meters").val("");
        }
        else {
            var A = parseFloat(A2) - parseFloat(A3);
            A = Math.round(A * 10000) / 10000;
            $("#Net_Loss_Mtrs_Compensation").val(A);
            $("#Compensation_In_Running_Meters").val(A);
        }

        var B2 = $("#Total_Breakage_Qty_Tons_Compensation").val();
        var B3 = $("#Total_Recovery_Tons_Compensation").val();

        if (B2 == "" || B3 == "") {
            $("#Net_Loss_Tons_Compensation").val("");
            $("#Compensation_In_Tons").val("");
        }
        else {
            var B = parseFloat(B2) - parseFloat(B3);
            B = Math.round(B * 10000) / 10000;
            $("#Net_Loss_Tons_Compensation").val(B);
            $("#Compensation_In_Tons").val(B);
        }
    }
    catch (e) {
        alert("Error : CalculateNetLoss : " + e);
    }
}
// Calculate Size recommendation change
function CalculateSizeRecommendation() {
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
        }
    }
    catch (e) {
        alert("Error : CalculateSizeRecommendation : " + e);
    }
}

// Compare with Net Loss mtr change
function CompareWithNetLossMtrs() {
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
    var Compensation_In_Tons = $("#Compensation_In_Tons").val();
    if (Compensation_In_Tons != "") {
        if ((parseFloat(Compensation_In_Tons).toFixed(2)) > (parseFloat($("#Net_Loss_Tons_Compensation").val()).toFixed(2))) {

            alert("Compensation In Tons should be less than Net Loss(Tons)");
            $("#Compensation_In_Tons").val("");
        }
    }
}

// Binding INvoice details(From data and to Date)
//function BindToInvoiceDetails() {
//    var MyDate = $("#Date_Supply_From").val();
//    if ($("#Date_Supply_From").val() != "") {
//        $("#Invoice_Details").val($("#Date_Supply_From").val() + " " + "To" + " " + $("#Date_Supply_TO").val());
//        $("#Date_Supply_TO").datepicker('setStartDate', MyDate);
//        //  $("#Date_Supply_TO").val("");
//    }
//}

function BindToInvoiceDetails() {
    var MyDate = $("#Date_Supply_From").val();

    if (MyDate == "" || MyDate == undefined) {
    }
    else {
        $("#Date_Supply_TO").datepicker('setStartDate', MyDate);
        $("#Date_Supply_TO").val("");
    }
    ToDateChangeChange();
}

function ToDateChangeChange() {
    if ($("#Period_Based").is(':checked')) {
        var DSFrom = $("#Date_Supply_From").val();
        var DSTo = $("#Date_Supply_TO").val();
        $("#Invoice_Details").val(DSFrom + " TO " + DSTo);
    } else {
        $("#Date_Supply_From").val("");
        $("#Date_Supply_TO").val("");
        $("#Date_Supply_TO").datepicker('setStartDate', "");
        $("#Date_Supply_From").datepicker('setStartDate', "");
        $("#Invoice_Details").val("");
    }
}



function GetRecommendedSizeCompensationCCSheets(obj) {

    CompensationScope.$apply(function () {
        $("#CCS_CompensationRecommendedSize").val($(obj).children().eq(2).html());
        $("#CCS_CompensationProductCode").val($(obj).children().eq(1).html());
        $("#CCS_Gross_Weight").val($(obj).children().eq(6).html());
        CalculateCCS_CompensationSizeLineTons();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');

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

function CCSCompensationSizeLineNosNumber() {

    var CCSCompensationSizeLineNos = $("#CCSCompensationSizeLineNos").val();

    if (CCSCompensationSizeLineNos == "" || isNaN(CCSCompensationSizeLineNos)) {
        $("#CCSCompensationSizeLineNos").val("");
    }
    else {
        CCSCompensationSizeLineNos = parseInt(CCSCompensationSizeLineNos);
        $("#CCSCompensationSizeLineNos").val(CCSCompensationSizeLineNos);
        CalculateCCS_CompensationSizeLineTons();
    }
}


function CalculateCCS_CompensationSizeLineTons() {
    var CCSCompensationSizeLineNos = $("#CCSCompensationSizeLineNos").val();
    var CCS_Gross_Weight = $("#CCS_Gross_Weight").val();

    if (CCSCompensationSizeLineNos == "" || CCS_Gross_Weight == "") {
        $("#CCS_CompensationSizeLineTons").val("");
    }
    else {
        var CCS_CompensationSizeLineTons = parseFloat(CCSCompensationSizeLineNos) * parseFloat(CCS_Gross_Weight);

        CCS_CompensationSizeLineTons = parseFloat(CCS_CompensationSizeLineTons) / 1000;

        CCS_CompensationSizeLineTons = Math.round(CCS_CompensationSizeLineTons * 10000) / 10000;

        $("#CCS_CompensationSizeLineTons").val(CCS_CompensationSizeLineTons);
    }
}


function SaveCompensationSizeLinesData() {

    var LineIdentity = $("#CCS_CompensationSize_id").val();

    var Flag = 0;

    var CCS_CompensationRecommendedSize = $("#CCS_CompensationRecommendedSize").val();
    var CCS_CompensationProductCode = $("#CCS_CompensationProductCode").val();
    var CCSCompensationSizeLineNos = $("#CCSCompensationSizeLineNos").val();
    var CCS_Gross_Weight = $("#CCS_Gross_Weight").val();
    var CCS_CompensationSizeLineTons = $("#CCS_CompensationSizeLineTons").val();


    if (CCS_CompensationRecommendedSize == "") {
        Flag = Flag + 1;
        $("#CCS_CompensationRecommendedSize").css("border-color", "red");
    }
    else {
        $("#CCS_CompensationRecommendedSize").css("border-color", "#d2d6de");
    }

    if (CCSCompensationSizeLineNos == "") {
        Flag = Flag + 1;
        $("#CCSCompensationSizeLineNos").css("border-color", "red");
    }
    else {
        $("#CCSCompensationSizeLineNos").css("border-color", "#d2d6de");
    }

    if (CCS_Gross_Weight == "") {
        Flag = Flag + 1;
        $("#CCS_Gross_Weight").css("border-color", "red");
    }
    else {
        $("#CCS_Gross_Weight").css("border-color", "#d2d6de");
    }

    if (CCS_CompensationSizeLineTons == "") {
        Flag = Flag + 1;
        $("#CCS_CompensationSizeLineTons").css("border-color", "red");
    }
    else {
        $("#CCS_CompensationSizeLineTons").css("border-color", "#d2d6de");
    }


    if (Flag > 0) {
        return;
    }
    else {
        var TRCode = "";

        if (LineIdentity == "") {

            TRCode = TRCode + "<td>" + CCS_CompensationRecommendedSize + "</td>";
            TRCode = TRCode + "<td>" + CCSCompensationSizeLineNos + "</td>";
            TRCode = TRCode + "<td>" + CCS_Gross_Weight + "</td>";
            TRCode = TRCode + "<td>" + CCS_CompensationSizeLineTons + "</td>";
            TRCode = TRCode + "<td style='display:none;' >" + CCS_CompensationProductCode + "</td>";

            LineIdentity = $("#RecommendedForCCSheets tbody tr").length + 1;

            TRCode = "<tr class='MousePointer' id='CCL_" + LineIdentity + "' onclick='EditCCRLines(this.id)'><td>" + LineIdentity + "</td>" + TRCode + "</tr>";

            $("#RecommendedForCCSheets tbody").append(TRCode);
            $("#CCSheetsCompensationSizeLines_Details_Modal").modal('hide');
            SaveToDataBaseCCSheets();
        }
        else {
            $("#RecommendedForCCSheets tbody #CCL_" + LineIdentity + " td")[0].innerHTML = LineIdentity;
            $("#RecommendedForCCSheets tbody #CCL_" + LineIdentity + " td")[1].innerHTML = CCS_CompensationRecommendedSize;
            $("#RecommendedForCCSheets tbody #CCL_" + LineIdentity + " td")[2].innerHTML = CCSCompensationSizeLineNos;
            $("#RecommendedForCCSheets tbody #CCL_" + LineIdentity + " td")[3].innerHTML = CCS_Gross_Weight;
            $("#RecommendedForCCSheets tbody #CCL_" + LineIdentity + " td")[4].innerHTML = CCS_CompensationSizeLineTons;
            $("#RecommendedForCCSheets tbody #CCL_" + LineIdentity + " td")[5].innerHTML = CCS_CompensationProductCode;

            $("#CCSheetsCompensationSizeLines_Details_Modal").modal('hide');
            SaveToDataBaseCCSheets();
        }
    }
}


function EditCCRLines(RowId) {

    $("#CCS_CompensationSize_id").val($("#RecommendedForCCSheets tbody #" + RowId + " td")[0].innerHTML);
    $("#CCS_CompensationRecommendedSize").val($("#RecommendedForCCSheets tbody #" + RowId + " td")[1].innerHTML);
    $("#CCS_CompensationProductCode").val($("#RecommendedForCCSheets tbody #" + RowId + " td")[5].innerHTML);
    $("#CCSCompensationSizeLineNos").val($("#RecommendedForCCSheets tbody #" + RowId + " td")[2].innerHTML);
    $("#CCS_Gross_Weight").val($("#RecommendedForCCSheets tbody #" + RowId + " td")[3].innerHTML);
    $("#CCS_CompensationSizeLineTons").val($("#RecommendedForCCSheets tbody #" + RowId + " td")[4].innerHTML);

    $("#CCSheetsCompensationSizeLines_Details_Modal").modal('show');

    $("#CCSheets_Delete").show();
    $("#CCSheets_Save").text("Update");

}



function DeleteCCLines() {
    var RowId = $("#CCS_CompensationSize_id").val();

    $("#RecommendedForCCSheets tbody #CCL_" + RowId + "").remove();
    $("#CCSheetsCompensationSizeLines_Details_Modal").modal('hide');

    var i = 1;

    $("#RecommendedForCCSheets tbody tr").each(function () {
        $(this).attr("id", "CCL_" + i);
        $("#RecommendedForCCSheets tbody #CCL_" + i + " td")[0].innerHTML = i;
        i = i + 1;
    });
    SaveToDataBaseCCSheets();
}


function SaveToDataBaseCCSheets() {
    var RecommendedCCSheets = new Array();

    var RowId = "";

    $("#RecommendedForCCSheets tbody tr").each(function () {
        RowId = ($(this).attr("id"));
        RecommendedCCSheets.push({
            SlNo: $("#RecommendedForCCSheets tbody #" + RowId + " td")[0].innerHTML,
            ProductName: $("#RecommendedForCCSheets tbody #" + RowId + " td")[1].innerHTML,
            Nos: $("#RecommendedForCCSheets tbody #" + RowId + " td")[2].innerHTML,

            GrossWeight: $("#RecommendedForCCSheets tbody #" + RowId + " td")[3].innerHTML,
            Tons: $("#RecommendedForCCSheets tbody #" + RowId + " td")[4].innerHTML,
            ProductCode: $("#RecommendedForCCSheets tbody #" + RowId + " td")[5].innerHTML
        });
    });

    var Compensation_Id = $("#Compensation_Id").val();

    var CCSheetsData = JSON.stringify({
        Compensation_Id: Compensation_Id,
        RecommendedCCSheets: RecommendedCCSheets
    });


    $.ajax({
        method: 'POST',
        url: '../../ComplaintRegistration/SaveCCSheetsDataToDB',
        async: false,
        data: { CCSheetsData: CCSheetsData },
    }).then(function successCallback(response) {
    }, function errorCallback(response) {
        alert("Error : " + response);
    });


}

function setNo_of_36value() {
    var No_of_36 = 0;
    var SD_Size_M = 0;
    var Net_Loss_Mtrs = $("#Net_Loss_Mtrs").val();
    var SD_Breakage_Qty_M = 0;
    var SD_Breakage_Qty_Nos = 0;

    if (Net_Loss_Mtrs == "") {
        Net_Loss_Mtrs = 0;
    }

    $("#Breakage_Investigation_Details_Table tbody tr").each(function () {
        RowId = ($(this).attr("id"));

        SD_Size_M = parseFloat(SD_Size_M) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[2].innerHTML);
        SD_Breakage_Qty_M = parseFloat(SD_Breakage_Qty_M) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[8].innerHTML);
        SD_Breakage_Qty_Nos = parseFloat(SD_Breakage_Qty_Nos) + parseFloat($("#Breakage_Investigation_Details_Table tbody #" + RowId + " td")[7].innerHTML);
        //console.log('SD_Size_M' + SD_Size_M + 'SD_Breakage_Qty_M' + SD_Breakage_Qty_M + 'SD_Breakage_Qty_Nos' + SD_Breakage_Qty_Nos + 'Net_Loss_Mtrs' + Net_Loss_Mtrs);
        if (SD_Size_M == 3.6) {
            if (Net_Loss_Mtrs < SD_Breakage_Qty_M) {
                No_of_36 = parseInt(Net_Loss_Mtrs / 3.6);
            } else if (Net_Loss_Mtrs > SD_Breakage_Qty_M) {
                No_of_36 = SD_Breakage_Qty_Nos;
            }
            $("#No_of_36").val(No_of_36);
            CalculateSizeRecommendation();
        } else {
            $("#No_of_36").val(No_of_36);
            CalculateSizeRecommendation();
        }
    });
}

// Compenstaion List page controller
DIMS.controller('CompensationListCtrl', function ($scope, $location, DIMSFactory, $route, $window, $rootScope, $compile) {

    CompensationListScope = $scope;
    $scope.CompensationList = [];
    $scope.UserCode = $("#USERCODE_CompensationList").val();
    //$scope.CustomColumnID = "0";

    $scope.CompensationListResult = "";
    $scope.pagereload = function () {

        $route.reload();
    }
    // Page redirection
    $scope.go = function (path) {

        $location.path(path);
    };


    angular.element(document).ready(function () {
        var UserType = $("#USERTYPE_Compensation").val();
        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: UserType, FormCode: 'COMP' }) },
            success: function (AccessData) {
                if (AccessData == "") {
                    $("#Create_New_Comp").css('display', 'none');
                    //$("#CMS_Comp_List_Menu").css('display', 'none');
                    //$("#StateFilter").css('display', 'none');
                    $("#CompensationlistDiv").css('display', 'none');
                }
                else {
                    AccessData = JSON.parse(AccessData);
                    IsView = AccessData[0]["IS_VIEW"];
                    IsAdd = AccessData[0]["IS_ADD"];
                    IsUpdate = AccessData[0]["IS_UPDATE"];
                    IsApprove = AccessData[0]["IS_APPROVE"];
                    if (AccessData[0]["IS_VIEW"] == true) {
                        //$("#CMS_Comp_List_Menu").css('display', 'block');
                        $('#CMS_List_Details').css('display', 'block');
                    }
                    else {
                        //  $("#CMS_Comp_List_Menu").css('display', 'none');
                        $('#CMS_List_Details').css('display', 'none');
                        //$("#StateFilter").css('display', 'none');
                    }

                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#Create_New_Comp").css('display', 'block');
                    }
                    else {
                        $("#Create_New_Comp").css('display', 'none');
                    }
                }
                $("#HiddenForCMS").val("");
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
                            //Start of All option for Complaint Registration List
                            var UserCodeVal = $("#USERCODE_CompensationList").val();
                            var SessionUserType = $("#USERTYPE_Compensation").val();
                            if (UserCodeVal == "2021" || UserCodeVal == "2019" || UserCodeVal == "50001234" || SessionUserType == "QAM_SBU3" || SessionUserType == "RSH_BU3" || SessionUserType == "NSH_BU3" || SessionUserType == "CSM_BU3" || SessionUserType == "QAM_SBU2" || SessionUserType == "CSM_BU2") {
                                var option = $('<option></option>').attr("value", "ALL").text("ALL");
                                $("#StateFilter").append(option);
                            }
                            //End
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
                            var UserType = $("#USERTYPE_Compensation").val();
                            var WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "'";

                            var UserCode = $("#USERCODE_CompensationList").val();
                            WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "'";

                            if (UserCode == "50002213" || UserCode == "50002304" || UserCode == "KAM") {                                
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE COMP.PRODUCT_TYPE_CODE='SBU2' AND COMP.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU2' AND COMP.DOC_STATUS!=''";
                                }
                            }
                            else if (UserCode == "50000985") {
                                WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "'";
                            }
                            else if (UserType == "RSH_BU3" || UserType == "NSH_BU3") {
                                WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU3' AND COMP.DOC_STATUS!='' ";
                            }
                            else if (UserCode == "2019" || UserCode == "2021" || UserCode == "50001234" || UserType == "QAM_SBU3" || UserType == "CSM_BU3" || UserType == "QAM_SBU2" || UserType == "CSM_BU2" || UserType == "MDO") {
                                
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE COMP.PRODUCT_TYPE_CODE='SBU3' AND COMP.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU3' AND COMP.DOC_STATUS!='' ";
                                }
                            }
                            else {
                                WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU1'";
                            }

                            var Data = JSON.stringify({
                                MasterType: "CompensationList",
                                ID: $scope.UserCode,
                                UserCode: $scope.UserCode,
                                "Type": "Get",
                                ReportName: "Compensation",
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
                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "CompensationList", UserSelectedColumnName);
                                    $('#CompensationList tbody').on('click', 'tr', function () {
                                        var ID = $(this).find('td:eq(0)').text();
                                        if ($(this).hasClass('selected')) {
                                            $(this).removeClass('selected');

                                        }
                                        else {
                                            CompensationListTable.$('tr.selected').removeClass('selected');
                                            $(this).addClass('selected');
                                        }
                                        if (ID != "") {
                                            $.ajax({
                                                url: '../../Users/GetRightToAccess',
                                                type: 'GET',
                                                data: { AccessData: JSON.stringify({ UserRole: $("#USERTYPE_Compensation").val(), FormCode: 'COMP' }) },
                                                success: function (AccessData) {

                                                    if (AccessData == "") {
                                                    }
                                                    else {
                                                        AccessData = JSON.parse(AccessData);
                                                        if (AccessData[0]["IS_VIEW"] == true || AccessData[0]["IS_UPDATE"] == true) {
                                                            var scope = angular.element($("#CompensationlistDiv")).scope();
                                                            scope.$apply(function () {
                                                                scope.go("Compensation/" + ID);
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
            var WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "'";

            var UserType = $("#USERTYPE_Compensation").val();
            var UserCode = $("#USERCODE_CompensationList").val();
            WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "'";

            if (UserCode == "50002213" || UserCode == "50002304" || UserCode == "KAM") {
                
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE COMP.PRODUCT_TYPE_CODE='SBU2' AND COMP.DOC_STATUS!='' ";
                }
                else {
                    WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU2' AND COMP.DOC_STATUS!=''";
                }
            }
            else if (UserCode == "50000985") {
                WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "'";
            }
            else if (UserType == "RSH_BU3" || UserType == "NSH_BU3") {
                WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU3' AND COMP.DOC_STATUS!='' ";
            }
            else if (UserCode == "2019" || UserCode == "2021" || UserCode == "50001234" || UserType == "QAM_SBU3" || UserType == "CSM_BU3" || UserType == "QAM_SBU2" || UserType == "CSM_BU2" || UserType == "MDO") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE COMP.PRODUCT_TYPE_CODE='SBU3' AND COMP.DOC_STATUS!='' ";
                }
                else {
                    WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU3' AND COMP.DOC_STATUS!='' ";
                }
            }
            else {
                WhereClause = " WHERE COMP.STATE_CODE='" + StateFilter + "' AND COMP.PRODUCT_TYPE_CODE='SBU1'";
            }


            var Data = JSON.stringify({
                MasterType: "CompensationList",
                ID: $scope.UserCode,
                UserCode: $scope.UserCode,
                "Type": "Get",
                ReportName: "Compensation",
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
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "CompensationList", UserSelectedColumnName);
                    $('#CompensationList tbody').on('click', 'tr', function () {
                        var ID = $(this).find('td:eq(0)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');

                        }
                        else {
                            CompensationListTable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                        if (ID != "") {
                            var scope = angular.element($("#CompensationlistDiv")).scope();
                            scope.$apply(function () {
                                scope.go("Compensation/" + ID);
                            })
                        }

                    });

                });

            });

        }
        catch (e) {
            alert("Error :CompensationListCtrl : " + e);
        }
    }



    // Retrieving data for displaying in Table
    //DIMSFactory.getReportListData(Data).success(function (response) {
    //    // $("#CompensationList").DataTable();



    //    //$("#CompensationList").dataTable().fnDestroy();
    //    //var Res = JSON.parse(response.tabledata);
    //    //$scope.CompensationList = Res;

    //    //for (var i = 0 ; i < Res.length ; i++) {
    //    //    $('#CompensationList').dataTable().fnAddData([Res[i]["DOC_SERIES_CODE"], Res[i]["DOC_NUM"], Res[i]["DOC_STATUS"], Res[i]["COMPLAINT_ID"], Res[i]["Customer_Code"], Res[i]["CUSTOMER_NAME"], Res[i]["PRODUCT_TYPE_NAME"], Res[i]["PRODUCT_CATEGORY_NAME"], Res[i]["COMPENSATION_MODE_NAME"], Res[i]["Cusomer_Location"], Res[i]["CITY_NAME"], Res[i]["STATE_NAME"], Res[i]["CREATED_BY"], Res[i]["CREATED_DATE"]]);
    //    //}

    //    var Result = JSON.parse(response.tabledata);
    //    $scope.CompensationListResult = Result;
    //    if (Result != "") {
    //        $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
    //        var Default_Column_data = Result["UserDefaultListData"];
    //        if (Result.hasOwnProperty('UserListData')) {
    //            var Custom_column_data = Result["UserListData"];


    //            if (Custom_column_data.length == 0) {
    //                // bind data to datatable
    //                getLookUpData_Reports(Default_Column_data, "", "", "CompensationList");
    //            } else {
    //                // bind data to datatable
    //                getLookUpData_Reports(Custom_column_data, "", "", "CompensationList");

    //                CustomColumnID = Result["UserListID"];
    //                //$scope.CustomColumnID = Result["UserCompensationListID"];
    //            }
    //        } else {
    //            getLookUpData_Reports(Default_Column_data, "", "", "CompensationList");
    //        }
    //    }
    //    if (Result.hasOwnProperty('UserListColumnNames')) {
    //        var data1 = JSON.parse(Result["UserListColumnNames"]);
    //        var selectedcolumnname = data1["ColumnNames"];

    //        $('#undo_redo_to').empty();
    //        for (var i = 0; i < selectedcolumnname.length; i++) {

    //            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
    //        }
    //    }


    //    $('#CompensationList tbody').on('click', 'tr', function () {
    //        var ID = $(this).find('td:eq(0)').text();
    //        if ($(this).hasClass('selected')) {
    //            $(this).removeClass('selected');

    //        }
    //        else {
    //            CompensationListTable.$('tr.selected').removeClass('selected');
    //            $(this).addClass('selected');
    //        }
    //        if (ID != "") {
    //            var scope = angular.element($("#CompensationlistDiv")).scope();
    //            scope.$apply(function () {
    //                scope.go("Compensation/" + ID);
    //            })
    //        }
    //    });
    //});

    // Open popup for columns selection
    $scope.OpenColumnEditing = function () {

        $('#undo_redo').empty();
        var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

        for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
            $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
        }



        //   $('#undo_redo').refresh();

        $('#undo_redo').multiselect();
        if (ControllerName != "CompensationListCtrl") {
            ControllerName = "CompensationListCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "CompensationListCtrl");

            $compile(elem.contents())(CompensationListScope);
        }

        $("#ColumnEditingModal").modal('show');




    }

    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing = function () {
        DIMSFactory.ViewColumnEditing("Compensation", $scope.UserCode, " ORDER BY ID DESC"); // 1-Report Name ,2-UserCode(561),3-WhereClause

    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var WhereClause = "ORDER BY ID DESC";
        var Data = JSON.stringify({
            MasterType: "CompensationList",
            ID: $scope.UserCode,
            UserCode: $scope.UserCode,
            "Type": "Get",
            ReportName: "Compensation",
            WhereClause: "ORDER BY ID DESC"
        });
        //DIMSFactory.SaveColumnEditingData("Compensation", $scope.UserCode, " ORDER BY ID DESC");
        DIMSFactory.SaveColumnEditingData_InputParameter("Compensation", $scope.UserCode, WhereClause, Data, "CompensationList");
        // 1-Report Name ,2-UserCode(561),3-WhereClause,4-JsonData,5-Frontend datatable id


    }
});



function GetProductMasterInvBU3Comp(obj) {
    CompensationScope.$apply(function () {

        $("#BU3MSD_ProductCode").val($(obj).children().eq(1).html());
        $("#BU3MSD_ProductName").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetPlantMasterInvBU3Comp(obj) {
    CompensationScope.$apply(function () {
        $("#BU3Material_Belongs_TO_CODE").val($(obj).children().eq(1).html());
        $("#BU3Material_Belongs_To_Name").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetProductSuppliedFromInvBU3Comp(obj) {
    CompensationScope.$apply(function () {
        $("#BU3Product_Supplied_From_CODE").val($(obj).children().eq(1).html());
        $("#BU3Product_Supplied_From_Name").val($(obj).children().eq(2).html());

        $("#BU3MSD_Name_CODE").val("");
        $("#BU3MSD_Name_Name").val("");

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetMSD_NameInvBU3Comp(obj) {
    CompensationScope.$apply(function () {
        $("#BU3MSD_Name_CODE").val($(obj).children().eq(1).html());
        $("#BU3MSD_Name_Name").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetProductMasterInvBSBU3Comp_(obj) {
    CompensationScope.$apply(function () {
        $("#SD_Item_Type_Product_Name_CODEB").val($(obj).children().eq(1).html());
        $("#SD_Item_Type_Product_NameB").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetDefectTypeMasterCompBSBU3(obj) {
    CompensationScope.$apply(function () {
        $("#Defect_Type_CODEB").val($(obj).children().eq(1).html());
        $("#Defect_TypeB").val($(obj).children().eq(2).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetProductMasterInvBSBU3Comp(obj) {
    CompensationScope.$apply(function () {

        $("#Rec_ProductCode").val($(obj).children().eq(1).html());
        $("#Rec_ProductName").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


