//Registration Controller
DIMS.controller('RegistrationCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    RegistrationScope = $scope;
    var SendForReviewDoubleClick = "";
    $scope.templatesettings = { HeaderTitle: "Registration" };
    $scope.go = function (path) {
        //CheckUserSession();

        $location.path(path);
    };
    //$scope.clearSubProductType = function () {
    //    debugger
    //    $scope.Sub_Product_Category = ''; // Clear the Sub Product Type value
    //};
    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
    //$.ajax({
    //    type: 'POST',
    //    url: '../../ComplaintRegistration/GetTypeofComplaints',
    //    async: true,
    //    success: function (response) {
    //        $("#TYPE_OF_COMPLAINT").empty();

    //        if (response == "FALSE") {

    //        }
    //        else {
    //            response = JSON.parse(response);
    //            var option = "";
    //            option = '<option value="0">Select</option>';
    //            for (var i = 0; i < response.length; i++) {
    //                option += '<option value="' + response[i]["id"] + '">' + response[i]["COMPLAINT_TYPE"] + '</option>';
    //            }
    //            $("#TYPE_OF_COMPLAINT").append(option);
    //        }
    //    },
    //    error: function (xhr, ajaxOptions, thrownError) {
    //    }
    //});
    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
    //svprasadk 10-07-2020 SBU 1 requirement to add type of parties start
    //$.ajax({
    //    type: 'POST',
    //    url: '../../ComplaintRegistration/GetPartyTypes',
    //    async: true,
    //    success: function (response) {
    //        $("#party_type").empty();

    //        if (response == "FALSE") {
    //            alert('No Data Available');
    //        }
    //        else {
    //            response = JSON.parse(response);
    //            var option = "";
    //            option = '<option value="0">Select</option>';
    //            for (var i = 0; i < response.length; i++) {
    //                option += '<option value="' + response[i]["id"] + '">' + response[i]["PARTY_TYPE"] + '</option>';
    //            }
    //            $("#party_type").append(option);
    //        }
    //    },
    //    error: function (xhr, ajaxOptions, thrownError) {
    //    }
    //});
    //svprasadk 10-07-2020 SBU 1 requirement to add type of parties end
    angular.element(document).ready(function () {
        CheckUserSession();
        debugger        
        //VIKAS G,9/3/2022 AS PER THE REQUIREMENT OF JOSEPH ADDED THE LABEL OF NOTE FOR ATTACHMENTS
        $("#lblNote").css('display', 'none');
        $("#SubProductDivisionMasterlbl").css('display', 'none');
        $("#SubProductDivisionMasterdiv").hide();
        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START
        $("#THplantname").css('display', 'none');
        $("#THBASICAMOUNT").css('display', 'none');
        $("#totalprodvalue").css('display', 'none');
        $("#THCategory").css('display', 'none');
        $("#THDefectprct").css('display', 'none');
        $("#SendBackRCData").hide();
        var BU = $("#Product_Type_CODE").val();
        console.log("BU :" + BU);
        var Productcode = $("#Product_Category_CODE").val();
        console.log("Productcode : " + Productcode);
        if ((BU == "SBU3" && Productcode != "36") || (BU == "SBU8")) {
            if (BU == "SBU8") {
                $("#THplantname").css('display', 'block');
                $("#THBASICAMOUNT").css('display', 'block');
                $("#totalprodvalue").css('display', 'block');
                $("#THCategory").css('display', 'none');
                $("#THDefectprct").css('display', 'block');
            }
            else {
                $("#THplantname").css('display', 'block');
                $("#THBASICAMOUNT").css('display', 'block');
                $("#totalprodvalue").css('display', 'block');
                $("#THCategory").css('display', 'none');
                $("#THDefectprct").css('display', 'none');
                $("#SendBackRCData").show();
            }
        }

        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.
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
            var FormIdentity = $("#FormIdentity").val();

            if (FormIdentity == "" || FormIdentity == undefined) {

                $scope.CR_Series_Code = "CRSZ12";
                $scope.Registration_Status = "DRAFT";
                $("#Registration_Status").val($scope.Registration_Status).trigger('change');
                $scope.complaintReceivedDate_CRT = TodayDateTime;
                $("#complaintReceivedDate_CRT").datepicker("setDate", TodayDateTime);

                $scope.ComplaintRegistrationDate_CRT = TodayDateTime;
                $("#ComplaintRegistrationDate_CRT").datepicker("setDate", TodayDateTime);

                //$(".Complaint_NumberDiv").css("display", "none");

                $scope.Registrant_Type = $("#UserType").val();
                $scope.Registrant_Type_ID = $("#UserType_ID").val();
                $scope.Registrant_Type_Code = $("#UserType_ID").val();

                $("#MakeApproved").css('display', 'none');
                $("#SendRegistrationApproval").css('display', 'none');
                $("#NewReg").css('display', 'none');
                $("#Project_Party_Check").val("ASD");

                var UserType_ID = $("#UserType_ID").val();

                if (UserType_ID == "FSO" || UserType_ID == "FSO_BU2" || UserType_ID == "FSO_BU3" || UserType_ID == "FSO_BU8") {
                    var UserCode = $("#UserCode").val();
                    if (UserCode == "KAM") {
                    }
                    else {
                        $scope.SalesRepresentativeEmployeeCode = $("#UserCode").val();
                        $scope.SalesRepresentativeEmployeeName = $("#UserName").val();
                    }
                }
                else {

                }

                if (UserType_ID == "SH_BU3" || UserType_ID == "RSH_BU3" || UserType_ID == "NSH_BU3") {
                    $scope.Product_Type = "SBU3";
                    $scope.Product_Type_CODE = "SBU3";
                    $scope.Complaint_Type_CODE = "CTC1";
                    $scope.Complaint_Type = "Product Complaints";

                    ProductTypeChanges("SBU3");
                }
                else {
                }

                var BUCode = "";
                if (UserType_ID == "STOCKIST" || UserType_ID == "BU2_STK" || UserType_ID == "BU3_STK") {
                    if (UserType_ID == "STOCKIST") {
                        $scope.Product_Type = "SBU1";
                        $scope.Product_Type_CODE = "SBU1";
                        ProductTypeChanges("SBU1");
                        BUCode = "1000";
                    }
                    if (UserType_ID == "BU2_STK") {
                        $scope.Product_Type = "SBU2";
                        $scope.Product_Type_CODE = "SBU2";
                        ProductTypeChanges("SBU2");
                        BUCode = "2000";
                    }
                    if (UserType_ID == "BU3_STK") {
                        $scope.Product_Type = "SBU3";
                        $scope.Product_Type_CODE = "SBU3";
                        $scope.Complaint_Type_CODE = "CTC1";
                        $scope.Complaint_Type = "Product Complaints";
                        ProductTypeChanges("SBU3");
                        BUCode = "3000";
                    }
                    
                    var Data = JSON.stringify({
                        MasterType: "CustomerDetails",
                        BUCode: BUCode,
                        CustomerCode: $("#UserCode").val()
                    });


                    $.ajax({
                        type: 'POST',
                        url: '../../Home/GetMasters',
                        data: { Data: Data },
                        async: true,
                        success: function (Res) {
                            Res = JSON.parse(Res);


                            $scope.Customer_ID = Res[0]["CUSTOMERCODE"];
                            $scope.Customer_Code = Res[0]["CUSTOMERCODE"];

                            $scope.Customer_Name = (Res[0]["CUSTOMERNAME"]).replace("&amp;", "&");

                            $scope.Customer_Type_CODE == Res[0]["CUSTOMER_TYPE_CODE"];
                            $scope.Customer_Type = Res[0]["CUSTOMER_TYPE_NAME"];

                            $scope.Contact_StateCode = Res[0]["STATE_CODE"];
                            $scope.Contact_State = Res[0]["STATE_NAME"];

                            $scope.Contact_AreaCode = Res[0]["AREA_CODE"];
                            $scope.Contact_Area = Res[0]["AREA_NAME"];
                            $scope.Contact_City = Res[0]["CITY"];
                            $scope.Customer_Email = Res[0]["EMAIL"];

                            $scope.Contact_Person = (Res[0]["CONTACT_PERSON_NAME"]).replace("&amp;", "&");
                            $scope.Contact_Person = "";
                            $scope.Contact_Number = Res[0]["PHONE"];
                            $scope.Customer_Fax = Res[0]["FAX"];
                            $scope.Customer_Fax = "";

                            $("#Customer_ID").val(Res[0]["CUSTOMERCODE"]);
                            $("#Customer_Code").val(Res[0]["CUSTOMERCODE"]);
                            $("#Customer_Name").val((Res[0]["CUSTOMERNAME"]).replace("&amp;", "&"));
                            $("#Customer_Type_CODE").val(Res[0]["CUSTOMER_TYPE_CODE"]);
                            $("#Customer_Type").val(Res[0]["CUSTOMER_TYPE_NAME"]);
                            $("#Contact_StateCode").val(Res[0]["STATE_CODE"]);
                            $("#Contact_State").val(Res[0]["STATE_NAME"]);
                            $("#Contact_AreaCode").val(Res[0]["AREA_CODE"]);
                            $("#Contact_Area").val(Res[0]["AREA_NAME"]);
                            $("#Contact_City").val(Res[0]["CITY"]);
                            $("#Customer_Email").val(Res[0]["EMAIL"]);
                            $("#Contact_Person").val((Res[0]["CONTACT_PERSON_NAME"]).replace("&amp;", "&"));
                            $("#Contact_Person").val("");
                            $("#Contact_Number").val(Res[0]["PHONE"]);
                            $("#Customer_Fax").val(Res[0]["FAX"]);
                            $("#Customer_Fax").val("");


                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                        }
                    });

                }

                $scope.Complaint_Priority_CODE = "P3";
                $scope.Complaint_Priority = "Medium";

                $scope.Complaint_Severity_CODE = "MDM";
                $scope.Complaint_Severity = "Medium";



            }
            else {
                ShowLoader();

                $("Project_Party_Check").val("");

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistration/GetComplaint',
                    async: false,
                    data: { Identity: FormIdentity },
                }).then(function successCallback(response) {
                    debugger
                    //console.log(response);
                    if (response.data == "FALSE") {
                    }
                    else {

                        var Data = JSON.parse(response.data);
                        var HeaderData = Data["Header"];


                        $("#MakeApproved").css('display', 'none');

                        if (HeaderData[0]["DOC_STATUS"] == "Approved") {

                        }
                        else {

                        }
                        $("#Complaint_Number").val(FormIdentity);

                        $("#complaintReceivedDate_CRT").datepicker("startDate", HeaderData[0]["Days100Back"]);

                        $scope.complaintReceivedDate_CRT = HeaderData[0]["COMPLAINT_RECEIVED_DATE"];
                        $("#complaintReceivedDate_CRT").datepicker("setDate", HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);

                        $scope.ComplaintRegistrationDate_CRT = HeaderData[0]["COMPLAINT_REGISTRATION_DATE"];
                        $("#ComplaintRegistrationDate_CRT").datepicker("setDate", HeaderData[0]["COMPLAINT_REGISTRATION_DATE"]);

                        $scope.Registrant_Type = HeaderData[0]["REGISTRANT_TYPE_NAME"];
                        $scope.Registrant_Type_Code = HeaderData[0]["REGISTRANT_TYPE_CODE"];

                        if (HeaderData[0]["REGISTRANT_TYPE_NAME"] == "") {
                            $scope.Registrant_Type = $("#UserType").val();
                            $scope.Registrant_Type_ID = $("#UserType_ID").val();
                            $scope.Registrant_Type_Code = $("#UserType_ID").val();
                        }

                        $scope.SalesRepresentativeEmployeeCode = HeaderData[0]["SALES_REPRESENTATIVE_CODE"];
                        $scope.SalesRepresentativeEmployeeName = HeaderData[0]["SALES_REPRESENTATIVE_NAME"];

                        $scope.Complaint_Desc = HeaderData[0]["COMPLAINT_DESC"];

                        $scope.Remarks = HeaderData[0]["REMARKS"];
                        $scope.CREATED_IN = HeaderData[0]["CREATED_IN"];
                        $("#CREATED_IN").val(HeaderData[0]["CREATED_IN"]);
                        if (HeaderData[0]["Complaint_Attachments"] == "") {
                            $("#lblNote").css('display', 'block');
                        }
                        debugger
                        $("#SelectedFiles").append(HeaderData[0]["Complaint_Attachments"]).trigger('change');

                        $scope.Complaint_Tracking_No = HeaderData[0]["COMPLAINT_TRACKING_NO"];

                        $scope.CR_Series_Code = HeaderData[0]["DOC_SERIES_CODE"];

                        if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                            $scope.CR_Series_Code = "CRSZ12";
                        }

                        //$scope.Registration_Status = HeaderData[0]["DOC_STATUS"];
                        $scope.Complaint_Code = HeaderData[0]["COMPLAINT_CODE"];

                        $scope.Customer_ID = HeaderData[0]["CUSTOMER_ID"];
                        $scope.Customer_Type_CODE = HeaderData[0]["CUSTOMER_TYPE_CODE"];
                        $scope.Customer_Code = HeaderData[0]["CUSTOMER_CODE"];
                        $scope.Customer_Name = HeaderData[0]["CUSTOMER_NAME"];
                        $scope.Customer_Type = HeaderData[0]["CUSTOMER_TYPE_NAME"];
                        $scope.Customer_Location = HeaderData[0]["LOCATION_NAME"];
                        $scope.Customer_LocationCode = HeaderData[0]["LOCATION_CODE"];

                        $scope.Contact_City = HeaderData[0]["CITY_NAME"];
                        $scope.CityCode = HeaderData[0]["CITY_CODE"];

                        $scope.Contact_State = HeaderData[0]["STATE_NAME"];
                        $scope.Contact_StateCode = HeaderData[0]["STATE_CODE"];


                        $scope.Contact_Area = HeaderData[0]["AREA_NAME"];
                        $scope.Contact_AreaCode = HeaderData[0]["AREA_CODE"];

                        $scope.Contact_Person = HeaderData[0]["CONTACT_PERSON"];
                        $scope.Contact_Number = HeaderData[0]["PHONE"];

                        $scope.Customer_Fax = HeaderData[0]["FAX"];
                        $scope.Customer_Email = HeaderData[0]["EMAIL"];
                        $scope.Complaint_Mode = HeaderData[0]["COMPLAINT_MODE_NAME"];
                        $scope.Complaint_Mode_CODE = HeaderData[0]["COMPLAINT_MODE_CODE"];
                        $scope.Product_Type = HeaderData[0]["PRODUCT_TYPE_NAME"];
                        $scope.Product_Type_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"];
                        $scope.Product_Category = HeaderData[0]["PRODUCT_CATEGORY_NAME"];
                        $scope.Product_Category_CODE = HeaderData[0]["PRODUCT_CATEGORY_CODE"];
                        $scope.Sub_Product_Category_CODE = HeaderData[0]["SUB_PRODUCT_CATEGORY_CODE"];
                        $scope.Sub_Product_Category = HeaderData[0]["SUB_PRODUCT_CATEGORY_TYPE"];

                        if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                        }
                        else {
                            $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                        }
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

                        if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                            if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                                $("#THplantname").css('display', 'block');
                                $("#THBASICAMOUNT").css('display', 'block');
                                $("#totalprodvalue").css('display', 'block');
                                $("#THCategory").css('display', 'none');
                                $("#THDefectprct").css('display', 'block');
                            }
                            else {
                                $("#THplantname").css('display', 'none');
                                $("#THBASICAMOUNT").css('display', 'none');
                                $("#totalprodvalue").css('display', 'none');
                                $("#THCategory").css('display', 'none');
                                $("#THDefectprct").css('display', 'none');
                            }
                        }

                        else {
                            $("#THplantname").css('display', 'none');
                            $("#THBASICAMOUNT").css('display', 'none');
                            $("#totalprodvalue").css('display', 'none');
                            $("#THCategory").css('display', 'none');
                            $("#THDefectprct").css('display', 'none');
                        }
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                        $scope.SubStockiest_Direct_Customer = HeaderData[0]["END_CUSTOMER_DETAILS"];

                        ProductTypeChanges(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                        //if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36" && HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                        //    ProductTypeChanges("SBU2");
                        //}
                        // svprasadk display material supply details for SBU3 -- 15-10-2019
                        if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "" && HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                            ProductTypeChanges("SBU2");
                        }

                        if (HeaderData[0]["PROJECT_PARTY"] == "True" || HeaderData[0]["PROJECT_PARTY"] == "true") {
                            $("#Is_Project_Party").prop("checked", true);
                        }
                        else {
                        }

                        $scope.Site_Address = HeaderData[0]["SITE_ADDRESS"];

                        $scope.Complaint_Type = HeaderData[0]["COMPLAINT_TYPE_NAME"];
                        $scope.Complaint_Priority = HeaderData[0]["COMPLAINT_PRIORITY_NAME"];
                        $scope.Complaint_Category = HeaderData[0]["COMPLAINT_CATEGORY_NAME"];
                        $scope.Complaint_Severity = HeaderData[0]["COMPLAINT_SEVERITY_NAME"];

                        $scope.Complaint_Type_CODE = HeaderData[0]["COMPLAINT_TYPE_CODE"];
                        $scope.Complaint_Priority_CODE = HeaderData[0]["COMPLAINT_PRIORITY_CODE"];
                        $scope.Complaint_Category_CODE = HeaderData[0]["COMPLAINT_CATEGORY_CODE"];
                        $scope.Complaint_Severity_CODE = HeaderData[0]["COMPLAINT_SEVERITY_CODE"];

                        $scope.NatureOfComplaint = HeaderData[0]["NATURE_OF_COMPLAINT"];
                        $scope.ObservationByHILOfficial = HeaderData[0]["OBSERVATIONSBY_OFFICIAL"];

                        //Registration_Status
                        if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Waiting for approval" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                            $scope.Registration_Status = HeaderData[0]["FinalStatus"];
                        }
                        else {
                            $scope.Registration_Status = HeaderData[0]["DOC_STATUS"];
                            $("#Registration_Status").val($scope.Registration_Status).trigger('change');
                        }
                        //debugger;
                        //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                        //debugger;
                        //console.log(HeaderData[0]["CREATED_DATE"] + " - " + new Date(HeaderData[0]["CREATED_DATE"]) + " - " + new Date('2020-11-19'));
                        if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19')) || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19'))) {
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
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                            $("#InvoiceNoBU3_div").hide();
                            $("#InvoiceNoBU3").val('');
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
                        } else if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19')) || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19'))) {
                            $("#SubStockiest_Direct_CustomerDiv").hide();
                            $("#PartyTypeDiv").show();
                            $("#Is_Project_PartyDiv").hide();
                            $("#SubStockiest_CodeDiv").hide();
                            $("#Site_AddressDiv").hide();
                            $("#SubStockiest_NameDiv").hide();
                            $("#SubStockiest_AddressDiv").hide();
                            $("#SubStockiest_NumberDiv").hide();
                            if (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest") {
                                $("#SubStockiest_CodeDiv").show();
                                $("#SubStockiest_NameDiv").show();
                                $("#SubStockiest_AddressDiv").show();
                                $("#SubStockiest_NumberDiv").show();
                                $scope.party_type_id = HeaderData[0]["party_type_id"];
                                $scope.party_type = HeaderData[0]["party_type"];
                                $scope.SubStockiest_Code = HeaderData[0]["SubStockiest_Code"];
                                $scope.SubStockiest_ID = HeaderData[0]["SubStockiest_Code"];
                                $scope.SubStockiest_Name = HeaderData[0]["SubStockiest_Name"];
                                $scope.SubStockiest_Address = HeaderData[0]["SubStockiest_Address"];
                                $scope.SubStockiest_Number = HeaderData[0]["SubStockiest_Number"];
                                $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                $("#party_type").val(HeaderData[0]["party_type"]);
                                $("#SubStockiest_ID").val(HeaderData[0]["SubStockiest_Code"]);
                                $("#SubStockiest_Code").val(HeaderData[0]["SubStockiest_Code"]);
                                $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                                $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                                $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
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
                            //svprasadk 19-11-2020 SBU 1 requirement to party type other start
                            else {
                                if (HeaderData[0]["END_CUSTOMER_DETAILS"] != "" && (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest")) {
                                    //$("#party_type").val("SubDealer");
                                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                    $("#party_type").val(HeaderData[0]["party_type"]);
                                    $("#SubStockiest_CodeDiv").show();
                                    $("#SubStockiest_NameDiv").show();
                                    $("#SubStockiest_AddressDiv").show();
                                    $("#SubStockiest_NumberDiv").show();
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                    //$scope.party_type = "SubDealer";
                                    $scope.party_type_id = HeaderData[0]["party_type_id"];
                                    $scope.party_type = HeaderData[0]["party_type"];
                                    $scope.SubStockiest_Code = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_ID = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_Name = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                    $scope.SubStockiest_Address = HeaderData[0]["Customer_Address"];
                                    $scope.SubStockiest_Number = HeaderData[0]["Phone_Number"];
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                                    $("#SubStockiest_ID").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Code").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Name").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                    $("#SubStockiest_Address").val(HeaderData[0]["SITE_ADDRESS"]);
                                    $("#SubStockiest_Number").val(HeaderData[0]["PHONE"]);
                                } else {
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                                    $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                    $("#party_type").val(HeaderData[0]["party_type"]);
                                    $scope.party_type_id = HeaderData[0]["party_type_id"];
                                    $scope.party_type = HeaderData[0]["party_type"];
                                    //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                                    //$("#party_type_id").val(1);
                                    //$("#party_type").val("Stockiest");
                                    //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                    //$scope.party_type = "Dealer";
                                    //$scope.party_type_id = 1;
                                    //$scope.party_type = "Stockiest";
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
                            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                            //$("#TYPE_OF_COMPLAINT_DIV").show();
                            //$("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            if (HeaderData[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                                $("#TYPE_OF_COMPLAINT > [value=" + HeaderData[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                            } else {
                                $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            }
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $scope.party_type_id = HeaderData[0]["party_type_id"];
                            $scope.party_type = HeaderData[0]["party_type"];
                            //console.log(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                            //svprasadk 27-10-2020 SBU 1 requirement to get party type start
                            //console.log('party_type', HeaderData[0]["party_type_id"]);                            
                            //if (HeaderData[0]["party_type_id"] > 0) {
                            //    console.log('party_type if', HeaderData[0]["party_type_id"]);
                            //    $("#party_type > [value='" + HeaderData[0]["party_type_id"] + "']").attr("selected", "true");
                            //} else {
                            //    $("#party_type > [value=0]").attr("selected", "true");
                            //}
                            //$scope.party_type = HeaderData[0]["party_type_id"];
                            //console.log('party_type', HeaderData[0]["party_type_id"]);
                            //svprasadk 27-10-2020 SBU 1 requirement to get party type end
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                            $("#InvoiceNoBU3_div").hide();
                            $("#InvoiceNoBU3").val('');
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
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
                            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$("#party_type > [value=0]").attr("selected", "true");
                            $scope.party_type_id = 1;
                            $scope.party_type = "Stockiest";
                            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                            $("#InvoiceNoBU3_div").hide();
                            $("#InvoiceNoBU3").val('');
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
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
                            $("#party_type").val(1);
                            $("#party_type").val("Stockiest");
                            $("#SubStockiest_ID").val("");
                            $("#SubStockiest_Code").val("");
                            $("#SubStockiest_Name").val("");
                            $("#SubStockiest_Address").val("");
                            $("#SubStockiest_Number").val("");
                            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                            $("#TYPE_OF_COMPLAINT_DIV").hide();
                            //$("#TYPE_OF_COMPLAINT").val(0);
                            //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                            //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                            //$("#party_type > [value=0]").attr("selected", "true");
                            $scope.party_type_id = 1;
                            $scope.party_type = "Stockiest";
                            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                            $("#InvoiceNoBU3_div").show();
                            $("#InvoiceNoBU3").val('');
                            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
                        }
                        //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                        //VIKAS G , 2023-04-12 SBU-8 START.
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {

                            $(".BreakageQtyLabel").text("Defect Qty (Nos)");

                            $("#TYPE_OF_COMPLAINT_DIV").hide();

                            $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                            $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                            $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                            $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];

                        }
                        //VIKAS G , 2023-04-12 SBU-8 END.


                        var TRCode = "";

                        var RCPT_Lines = Data["RCPTLines"];

                        for (var i = 0; i < RCPT_Lines.length; i++) {
                            TRCode = TRCode + "<tr class='MousePointer' id='RDSTTR_" + (i + 1) + "' onclick='EditRDST(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["PRODUCT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["SIZE"] + "</td>";
                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + (RCPT_Lines[i]["INVOICE_DATE"]) + "</td>";
                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["batch_no"] + "</td>";
                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["Received_Qty"] + "</td>";
                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["Defective_Qty"] + "</td>";
                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + RCPT_Lines[i]["REMARKS"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["GROSS_WEIGHT"] + "</td>";

                            TRCode = TRCode + "</tr>";
                        }
                        $("#Receipt_Details_Sheeting_Table tbody").append(TRCode);

                        TRCode = "";
                        var SUP_Lines = Data["SupplyLines"];
                        //console.log("SUP_Lines" + Json.stringify(SUP_Lines));
                        var totalvalue = 0;
                        debugger
                        for (var i = 0; i < SUP_Lines.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + SUP_Lines[i]["PRODUCT_NAME"] + "</td>";
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                            if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") {
                                TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                            }
                            else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                                TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                            }
                            //else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" ) {
                            //    TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                            //}
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["INVOICE_NO"] + "</td>";
                            TRCode = TRCode + "<td>" + (SUP_Lines[i]["INVOICE_DATE"]) + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["batch_no"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["QTY_SUPPLIED"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["BreakageQtyNos"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["TRANSPORTER"] + "</td>";
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                            if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                                TRCode = TRCode + "<td>" + ((SUP_Lines[i]["BreakageQtyNos"] / SUP_Lines[i]["QTY_SUPPLIED"]) * 100).toFixed(3) + "</td>";
                            }
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["REMARKS"] + "</td>";
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                            if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                                TRCode = TRCode + "<td>" + (SUP_Lines[i]["RATE_PER_UNIT"] * SUP_Lines[i]["BreakageQtyNos"]).toFixed(3) + "</td>";
                            }
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["PRODUCT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["SIZE"] + "</td>";
                            TRCode = TRCode + "</tr>";
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

                            totalvalue += (SUP_Lines[i]["RATE_PER_UNIT"] * SUP_Lines[i]["BreakageQtyNos"]);
                            console.log("Total value : " + totalvalue);
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                        }
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
                        $("#total_prod_value").val(totalvalue.toFixed(3));
                        console.log(totalvalue);
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                        $("#SupplyDetails_Table tbody").append(TRCode);

                        TRCode = "";
                        var MAT_SUP_Lines = Data["MatSupLines"];
                        for (var i = 0; i < MAT_SUP_Lines.length; i++) {

                            TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' onclick='EditMSD(this.id)'><td>" + (i + 1) + "</td>";

                            TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["PLANT_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLY_TYPE_NAME"] + "</td>";
                            TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLY_NAME"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["PLANT_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLY_TYPE_CODE"] + "</td>";
                            TRCode = TRCode + "<td style='display:none'></td>";
                            TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLY_CODE"] + "</td>";

                            TRCode = TRCode + "</tr>";

                        }
                        $("#Material_Supply_Detail_Table tbody").append(TRCode);

                        var MyField = $("#HiddenForCMS").val();

                        if (HeaderData[0]["DOC_STATUS"] == "DRAFT") {
                            $("#MakeApproved").css('display', 'none');


                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID").val(), FormCode: 'REG' }) },
                                success: function (AccessData) {
                                    if (AccessData == "") {
                                        $("#SendRegistrationApproval").css('display', 'none');
                                        $("#CompRegSave").css('display', 'none');
                                    }
                                    else {
                                        AccessData = JSON.parse(AccessData);
                                        if (AccessData[0]["IS_UPDATE"] == true) {
                                            $("#SendRegistrationApproval").css('display', 'block');
                                            $("#CompRegSave").css('display', 'block');
                                        }
                                        else {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#CompRegSave").css('display', 'none');

                                        }
                                    }
                                }
                            });


                        }
                        else if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                            //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);

                            $("#MakeApproved").css('display', 'none');

                            var UserType = $("#UserType_ID").val();

                            if ((HeaderData[0]["DOC_STATUS"] == "Approved") && (UserType == "CSM" || UserType == "QH" || UserType == "QH_BU8"  || UserType == "CSM_BU2" || UserType == "CSM_BU3")) {
                                $("#SuperSave").css('display', 'block');
                            }
                            else {
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
                            $("#Approved_Date").val(HeaderData[0]["APPROVED_DATE"]);
                        }
                        else if (HeaderData[0]["DOC_STATUS"] == "Waiting for approval") {

                            if (MyField == "") {
                                //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);

                                $("#MakeApproved").css('display', 'none');

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

                            }
                            else {
                                //Write Code For Approvals
                                $.ajax({
                                    url: '../../Users/GetRightToAccess',
                                    type: 'GET',
                                    data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID").val(), FormCode: 'REG' }) },
                                    success: function (AccessData) {
                                        if (AccessData == "") {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#RegList").css('display', 'none');
                                            $("#NewReg").css('display', 'none');
                                            $("#MakeApproved").css('display', 'none');
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#CompRegSave").css('display', 'none');
                                        }
                                        else {
                                            AccessData = JSON.parse(AccessData);
                                            if (AccessData[0]["IS_APPROVE"] == true) {
                                                $("#SendRegistrationApproval").css('display', 'none');
                                                $("#RegList").css('display', 'none');
                                                $("#NewReg").css('display', 'none');
                                                $("#MakeApproved").css('display', 'block');
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#CompRegSave").css('display', 'block');
                                            }
                                            else {
                                                $("#SendRegistrationApproval").css('display', 'none');
                                                $("#RegList").css('display', 'none');
                                                $("#NewReg").css('display', 'none');
                                                $("#MakeApproved").css('display', 'none');
                                                $("#PendingApprovalsList").css('display', 'block');
                                                $("#CompRegSave").css('display', 'none');
                                            }
                                        }
                                    }
                                });
                            }
                        }

                        $("#StateFilter").val(HeaderData[0]["STATE_CODE"]);
                        $("#CMSState").val(HeaderData[0]["STATE_CODE"]);

                        $("#HiddenForCMS").val("");
                        HideLoader();
                        $("div").removeClass('modal-backdrop fade in');

                    }
                },
                    function errorCallback(response) {
                        HideLoader();
                        alert("Error : " + response);
                    });
            }
        }
        catch (e) {
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
        if (($("#SupplyDetails_Table tbody tr").length) > 0) {
            var Product_Type = $("#Product_Type_CODE").val();
            if (Product_Type == "SBU3") {
                switch (MasterType) {
                    case ("Prod_Typ_Mast"):
                        return
                    case ("StockistMaster"):
                        return;
                    case ("ProductDivisionMaster"):
                        return;
                }
            }
        }
        if (MasterType == "StockistMaster") {
            debugger
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
            //VIKAS G, 2023-02-16 START
            else if (Product_Type == "SBU8") {
                Product_Type = "8000";
            }
            //VIKAS G, 2023-02-16 END
            if (Product_Type == "8000") {
                var Division = "16,82,83";
                 Data = JSON.stringify({
                     MasterType: MasterType,
                     Product_Type: Product_Type,
                     Division: Division,
                     StateFilter: StateFilter
                 });
            }
            else {
                Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Type: Product_Type,
                    StateFilter: StateFilter
                });
            }

        }
        else if (MasterType == "DefectTypeMaster") {

            var Product_Type_CODE = $("#Product_Type_CODE").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();

            if ($("#Product_Type_CODE").val() == "SBU3" && $("#Complaint_Category_CODE").val() == "") {
                alert("Complaint Category cannot be empty");
                return;
            }
            else {

            }
            MasterType = "GetDefectTypeMaster";

            Data = JSON.stringify({
                MasterType: MasterType,
                ProductCategoryCode: Product_Category_CODE,
                ProductTypeCode: Product_Type_CODE,
                COMPLAINT_CATEGORY_CODE: $("#Complaint_Category_CODE").val()
            });

        }
        else if (MasterType == "Prod_Cat_Mast") {
            var SITEDETAIL_CODE = $("#SITEDETAIL_CODE").val();
            var COMPANYDETAIL_CODE = $("#COMPANYDETAIL_CODE").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                SITEDETAIL_CODE: SITEDETAIL_CODE,
                COMPANYDETAIL_CODE: COMPANYDETAIL_CODE
            });
        }
        else if (MasterType == "ProductDivisionMaster") {

            if ($("#Product_Type").val() == "" || $("#Product_Type_CODE").val() == "") {
                alert("Select Product Type");
                $("#Product_Type").css("border-color", "red");
                return;
            }
            else {
                $("#Product_Type").css("border-color", "#d2d6de");
                var Product_Type_CODE = $("#Product_Type_CODE").val();
                Data = JSON.stringify({
                    MasterType: MasterType,
                    PRODUCT_TYPE_CODE: Product_Type_CODE,
                    CR_TYPE: "FORMAL"
                });
            }



        }
            //VIKAS G SBU8 SubProductDivisionMaster START
        else if (MasterType == "SubProductDivisionMaster") {

            if ($("#Product_Type").val() == "" || $("#Product_Type_CODE").val() == "") {
                alert("Select Product Type");
                $("#Product_Type").css("border-color", "red");
                return;
            }
            else {
                $("#Product_Type").css("border-color", "#d2d6de");
                var Product_Type_CODE = $("#Product_Type_CODE").val();
                var Product_Category_CODE = $("#Product_Category_CODE").val();
                Data = JSON.stringify({
                    MasterType: MasterType,
                    PRODUCT_TYPE_CODE: Product_Type_CODE,
                    Product_Category_CODE: Product_Category_CODE,
                    CR_TYPE: "FORMAL"
                });
            }
        }
            //VIKAS G SBU8 SubProductDivisionMaster END

        else if (MasterType == "SalesRepMaster") {
            var StateFilter = $("#StateFilter").val();
            var Product_Type = $("#Product_Type_CODE").val();

            if (Product_Type == "") {
                alert("Select Business Unit");
                return;
            }

            Data = JSON.stringify({
                MasterType: MasterType,
                StateFilter: StateFilter,
                BusinessUnit: Product_Type
            });
        }
        else if (MasterType == "GetPlantMaster") {

            var BusinessUnit = $("#Product_Type_CODE").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();
            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit,
                Product_Category_CODE: Product_Category_CODE
            });
        }
        else if (MasterType == "Product_Supplied_From") {
            var BusinessUnit = $("#Product_Type_CODE").val();

            Data = JSON.stringify({
                MasterType: MasterType,
                BusinessUnit: BusinessUnit
            });
        }
        else if (MasterType == "GetProductMaster") {
            var FLG = 0;
            debugger
            var Product_Type_CODE = $("#Product_Type_CODE").val();
            var Product_Category = $("#Product_Category").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();
            var Product_Type = $("#Product_Type_CODE").val()
            var SD_InvoiceNo = $("#SD_InvoiceNo").val();
            var SD_InvoiceNo_BU8 = $("#SD_InvoiceNo_BU8").val();
            var Invoice_Repeat = "No";
            if (Product_Type == "SBU8" && SD_InvoiceNo_BU8 != "") {

                var Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Category_CODE: Product_Category_CODE,
                    Product_Type: $("#Product_Type_CODE").val(),
                    Product_Type_CODE: Product_Type_CODE,
                    InvoiceNoBU3: SD_InvoiceNo_BU8,
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
                    var FormIdentity = $("#FormIdentity").val();
                    console.log("FormIdentity :" + FormIdentity);
                    var resultresponse = "";
                    var firstObject = "";
                    var Complaint_Tracking_No = "";
                    if (response != "FALSE") {
                        var resultresponse = JSON.parse(response);
                        var firstObject = resultresponse[0];
                        var Complaint_Tracking_No = firstObject.complaint_no;
                    }
                    if (response == "FALSE" || FormIdentity == Complaint_Tracking_No ) {
                        $("#Approvals_Remarks").val("");
                        $("#InvoiceForm").css('display', 'none');
                        Data = JSON.stringify({
                            MasterType: MasterType,
                            Product_Category_CODE: Product_Category_CODE,
                            Product_Type: $("#Product_Type_CODE").val(),
                            Product_Type_CODE: Product_Type_CODE,
                            InvoiceNoBU3: SD_InvoiceNo_BU8,
                            Customer_Code: $("#Customer_Code").val(),
                            Invoice_Repeat: Invoice_Repeat
                        });
                    }
                    else {
                        $("#Approvals_Remarks").val("");
                        $("#InvoiceForm").modal('show');
                    }

                },
                    function errorCallback(response) {
                        alert("Error : " + response);
                    });

            }
            else {
                if (Product_Category_CODE == "" || Product_Category == "") {
                    $("#Product_Category").css("border-color", "red");
                    return;
                }

                if ((Product_Type == "SBU3" && SD_InvoiceNo == "")) {
                    alert("Product Provide Invoice Number");
                    return;
                }
                else if (Product_Type == "SBU8" && SD_InvoiceNo_BU8 == "") {
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
                            InvoiceNoBU3: SD_InvoiceNo_BU8,
                            Customer_Code: $("#Customer_Code").val()
                        });
                    }
                }
            }

        }
        else if (MasterType == "GetProductMaster_SBU2") {
            var FLG = 0;
            var SelectedInvoiceNumber = $("#SD_InvoiceNo_SBU2").val();
            if (SelectedInvoiceNumber.trim() == "") {
                alert("Entered Invoice Number is not valid");
                return false;
            }
            var Product_Category = $("#Product_Category").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();

            if (Product_Category_CODE == "" || Product_Category == "") {
                $("#Product_Category").css("border-color", "red");
                return;
            }
            else {
                $("#Product_Category").css("border-color", "#d2d6de");
                Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Category_CODE: Product_Category_CODE,
                    Customer_Code: $("#Customer_Code").val(),
                    Product_Type: $("#Product_Type_CODE").val(),
                    InvoiceNumber: $("#SD_InvoiceNo_SBU2").val()
                });
            }

        }
        else if (MasterType == "MSD_Name") {
            var Product_Supplied_From = $("#Product_Supplied_From").val();

            var SITEDETAIL_CODE = $("#SITEDETAIL_CODE").val();
            var COMPANYDETAIL_CODE = $("#COMPANYDETAIL_CODE").val();


            if (Product_Supplied_From == "") {
                alert("Select Product Supplied Form");
                return;
            }
            if (Product_Supplied_From == "Sub Stockist") {
                return;
            }
            if (Product_Supplied_From == "STOCKIST") {
                Heading = "Stockist List";

                var StateFilter = $("#StateFilter").val();
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
                //VIKAS G, 2023-02-16 SBU-8 START
                else if (Product_Type == "SBU8") {
                    Product_Type = "8000";
                }
                //VIKAS G, 2023-02-16 SBU-8 END
                Data = JSON.stringify({
                    MasterType: "StockistMaster",
                    Product_Type: Product_Type,
                    StateFilter: StateFilter
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
        }
        else if (MasterType == "ComplaintCategory") {
            if (($("#Product_Type").val()) == "SBU1") {
                Data = JSON.stringify({
                    MasterType: "ComplaintCategory",
                    BusinessUnit: "10002000"
                });
            }
            else if (($("#Product_Type").val()) == "SBU2") {
                Data = JSON.stringify({
                    MasterType: "ComplaintCategory",
                    BusinessUnit: "10002000"
                });
            }
            else if (($("#Product_Type").val()) == "SBU3") {
                Data = JSON.stringify({
                    MasterType: "ComplaintCategory",
                    BusinessUnit: "3000"
                });
            }
            //Vikas G, 2023-02-16 SBU-8 START
            else if (($("#Product_Type_CODE").val()) == "SBU8") {
                Data = JSON.stringify({
                    MasterType: "ComplaintCategory",
                    BusinessUnit: "8000"
                });
            }
            //Vikas G, 2023-02-16 SBU-8 END
            else {
                alert("Invalid Business Unit");
                return
            }
        }
        //svprasadk 21-04-2020 SBU 1 requirement to add sub stockiest master start
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
            //Vikas G, 2023-02-16 SBU-8 START
            else if (Product_Type == "SBU8") {
                Product_Type = "8000";
            }
            if (Product_Type == "8000") {
                var Division = "16,82,83";
                Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Type: Product_Type,
                    Division:Division,
                    StateFilter: StateFilter
                });
            } else {
                //Vikas G, 2023-02-16 SBU-8 END
                Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Type: Product_Type,
                    StateFilter: StateFilter
                });
            }
            //alert(Data)
        }
        //svprasadk 21-04-2020 SBU 1 requirement to add sub stockiest master end
        //svprasadk 30-10-2020 SBU 1 requirement to add party type start
        else if (MasterType == "partyType") {
            Data = JSON.stringify({
                MasterType: MasterType,
            });
        }
        //svprasadk 30-10-2020 SBU 1 requirement to add party type end
        //svprasadk 09-12-2020 SBU3 requirement adding checkbox to product master start
        else if (MasterType == "ProductMasterAgainstInvoiceNoBU3") {
            //debugger
            var FLG = 0;
            var Product_Type_CODE = $("#Product_Type_CODE").val();
            var Product_Category = $("#Product_Category").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();
            var Product_Type = $("#Product_Type").val();
            var Complaint_Type_CODE = $("#Complaint_Type_CODE").val();
            var Complaint_Category_CODE = $("#Complaint_Category_CODE").val();

            if (Product_Category_CODE == "" || Product_Category == "") {
                $("#Product_Category").css("border-color", "red");
                return;
            }
            var InvoiceNoBU3 = $("#InvoiceNoBU3").val();
            if (Product_Type == "SBU3" && InvoiceNoBU3 == "") {
                alert("Product Provide Invoice Number");
                return;
            }
            //else if (Complaint_Type_CODE == "") {
            //    alert("Product Provide Complaint Type");
            //    return;
            //}
            else if (Complaint_Category_CODE == "") {
                alert("Product Provide Complaint Category");
                return;
            }
            else {
                $("#Product_Category").css("border-color", "#d2d6de");
                Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Category_CODE: Product_Category_CODE,
                    Product_Type: $("#Product_Type_CODE").val(),
                    Product_Type_CODE: Product_Type_CODE,
                    InvoiceNoBU3: InvoiceNoBU3,
                    Customer_Code: $("#Customer_Code").val()
                });
            }

        }
        //svprasadk 09-12-2020 SBU3 requirement adding checkbox to product master end
        DIMSFactory.getMasterData(Data).success(function (response) {
            debugger
            console.log(response);
            //svprasadk 09-12-2020 SBU3 requirement adding checkbox to product master start
            var Product_Type = $("#Product_Type_CODE").val();
            var InvoiceNoBU3 = $("#InvoiceNoBU3").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();
            var Complaint_Category_CODE = $("#Complaint_Category_CODE").val();
            var SD_InvoiceNo = $("#SD_InvoiceNo").val();
            var SD_InvoiceNo_BU8 = $("#SD_InvoiceNo_BU8").val();
            //var status = 0;
            //console.log('Product_Type', Product_Type);
            if (Product_Type == "SBU8" && MasterType == "GetProductMaster") {
                var Data = JSON.stringify({
                    MasterType: MasterType,
                    Product_Category_CODE: Product_Category_CODE,
                    Product_Type: $("#Product_Type_CODE").val(),
                    Product_Type_CODE: Product_Type_CODE,
                    InvoiceNoBU3: SD_InvoiceNo_BU8,
                    Customer_Code: $("#Customer_Code").val()
                });
                $.ajax({
                    method: 'POST',
                    url: '../../ComplaintRegistration/SameInvoiceComplaintRegistration',
                    async: false,
                    data: { Data: Data },
                }).then(function successCallback(response1) {
                    debugger

                    var FormIdentity = $("#FormIdentity").val();
                    var resultresponse = "";
                    var firstObject = "";
                    var Complaint_Tracking_No = "";
                    if (response1 != "FALSE") {
                        var resultresponse = JSON.parse(response1);
                        var firstObject = resultresponse[0];
                        var Complaint_Tracking_No = firstObject.complaint_no;
                    }                   
                    if (response1 == "FALSE" || FormIdentity == Complaint_Tracking_No) {
                        getLookUpData(response, Methodname, Heading, SD_InvoiceNo_BU8);
                    }
                    else {

                    }

                },
                    function errorCallback(response) {
                        alert("Error : " + response);
                    });
            }
            else if (Product_Type == "SBU3" && MasterType == "ProductMasterAgainstInvoiceNoBU3") {
                getLookUpDataBU3(response, Methodname, Heading, Product_Type, InvoiceNoBU3, Product_Category_CODE, Complaint_Category_CODE);
            }

            else if (Product_Type == "SBU8" && MasterType != "GetProductMaster") {
                getLookUpData(response, Methodname, Heading, SD_InvoiceNo);
            }

            else if (Product_Type != "SBU8") {
                getLookUpData(response, Methodname, Heading, SD_InvoiceNo);
            }

            //svprasadk 09-12-2020 SBU3 requirement adding checkbox to product master end
            //getLookUpData(response, Methodname, Heading);

            if (MasterType == "StockistMaster") {

                //CUSTOMER_CODE	CUSTOMER_NAME	CUSTOMER_TYPE_CODE	CUSTOMER_TYPE_NAME	CUSTOMER_CATEGORY_CODE	STATE_CODE	STATE_NAME	LOCATION_CODE	LOCATION_NAME	
                //CITY_NAME	CITY_CODE	EMAIL	PHONE1	CONTACT_PERSON1_NAME	FAX
                //3       5       6       8       11      

                //$("#PopUpTable thead tr th:nth-child(4)").hide();
                //$("#PopUpTable thead tr th:nth-child(6)").hide();
                //$("#PopUpTable thead tr th:nth-child(7)").hide();
                //$("#PopUpTable thead tr th:nth-child(9)").hide();
                //$("#PopUpTable thead tr th:nth-child(12)").hide();

                //$("#PopUpTable tbody tr td:nth-child(4)").hide();
                //$("#PopUpTable tbody tr td:nth-child(6)").hide();
                //$("#PopUpTable tbody tr td:nth-child(7)").hide();
                //$("#PopUpTable tbody tr td:nth-child(9)").hide();
                //$("#PopUpTable tbody tr td:nth-child(12)").hide();

            }
            else if (MasterType == "GetProductMaster") {

            }
            else {
                //alert("MasterType : " + MasterType);
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
            var SD_InvoiceNo = $("#SD_InvoiceNo").val();
            var SD_InvoiceNo_BU8 = $("#SD_InvoiceNo_BU8").val();
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
                InvoiceNoBU3: SD_InvoiceNo_BU8,
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

                var resultresponse = JSON.parse(response);
                var firstObject = resultresponse[0];
                var Complaint_Tracking_No = firstObject.complaint_no;
                if (response == "FALSE" || FormIdentity == Complaint_Tracking_No) {
                   

                }
                else {
                   
                    console.log("Complaint Tracking No: " + response);
                   
                    var invoice_no = firstObject.INVOICE_NO;

                    console.log("Complaint Tracking No: " + Complaint_Tracking_No);
                    //var Complaint_Tracking_No = response[0].;
                    //console.log("Complaint_Tracking_No :" + FormIdentity);
                    if (Approvals_Remarks == "") {
                        alert("Provide Remarks for Continue");
                        return;
                    }
                    $("#Remarks").val(Approvals_Remarks);
                    var message = "You have already used this Invoice: " + invoice_no + "\n";
                    message += "in Complaint Number: " + Complaint_Tracking_No + ".\n\n";
                    message += "Are you sure you want to continue?";
                    var Alert = confirm(message);
                    if (Alert == true) {

                        if (Product_Category_CODE == "" || Product_Category == "") {
                            $("#Product_Category").css("border-color", "red");
                            return;
                        }

                        if ((Product_Type == "SBU3" && SD_InvoiceNo == "")) {
                            alert("Product Provide Invoice Number");
                            return;
                        }
                        else if (Product_Type == "SBU8" && SD_InvoiceNo_BU8 == "") {
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
                                    InvoiceNoBU3: SD_InvoiceNo_BU8,
                                    Customer_Code: $("#Customer_Code").val(),
                                    Invoice_Repeat: Invoice_Repeat
                                });
                            }
                            DIMSFactory.getMasterData(Data).success(function (response) {
                                //debugger
                                console.log(response);
                                //svprasadk 09-12-2020 SBU3 requirement adding checkbox to product master start
                                var Product_Type = $("#Product_Type_CODE").val();
                                var InvoiceNoBU3 = $("#InvoiceNoBU3").val();
                                var Product_Category_CODE = $("#Product_Category_CODE").val();
                                var Complaint_Category_CODE = $("#Complaint_Category_CODE").val();
                                var SD_InvoiceNo = $("#SD_InvoiceNo").val();
                                var SD_InvoiceNo_BU8 = $("#SD_InvoiceNo_BU8").val();
                                //var status = 0;
                                //console.log('Product_Type', Product_Type);
                                if (Product_Type == "SBU3" && MasterType == "ProductMasterAgainstInvoiceNoBU3") {
                                    getLookUpDataBU3(response, Methodname, Heading, Product_Type, InvoiceNoBU3, Product_Category_CODE, Complaint_Category_CODE);
                                }
                                else {
                                    getLookUpData(response, "GetSD_ProductMaster", "GetSD_ProductMaster", SD_InvoiceNo_BU8);
                                }
                                $("#Approvals_Remarks").val("");
                                $("#InvoiceForm").css('display', 'none');
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

    $scope.Savedata = function (RegistrationData) {
        $.ajax({
            method: 'POST',
            url: '../../ComplaintRegistration/SaveComplaint',
            async: false,
            data: { RegistrationData: RegistrationData },
        }).then(function successCallback(response) {
            //debugger
            var FormIdentity = $("#FormIdentity").val();
            if (response == "FALSE") {
            }
            if (response == "TRUE") {
                //$(".Complaint_NumberDiv").css("display", "block");
            }
            else {
                var RD = JSON.parse(response);
                console.log("SaveComplaint : " + RD);
                if (RD["Result"] == "TRUE") {

                    $("#SendRegistrationApproval").css('display', 'block');
                    $("#FormIdentity").val(RD["ID"]);
                    $("#Complaint_Code").val(RD["CC"]);
                    //$(".Complaint_NumberDiv").css("display", "block");
                    $("#Complaint_Number").val(RD["ID"]);
                    $("#Complaint_Number").val(RD["ID"]);
                }
            }

            if ($("#Registration_Status").val() == "DRAFT") {
                $("#SendRegistrationApproval").css('display', 'block');
            }
            else {
                $("#SendRegistrationApproval").css('display', 'none');
            }
            //$.ajax("../../ComplaintRegistration/GetComplaint");
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/GetComplaint',
                async: false,
                data: { Identity: FormIdentity },
            }).then(function successCallback(response) {
                debugger
                console.log(response);
                if (response == "FALSE") {
                }
                else {

                    var Data = JSON.parse(response);
                    console.log("Stringify data" + Data);
                    var HeaderData = Data["Header"];
                    console.log("Stringify HeaderData" + HeaderData);

                    $("#MakeApproved").css('display', 'none');

                    if (HeaderData[0]["DOC_STATUS"] == "Approved") {

                    }
                    else {

                    }
                    $("#Complaint_Number").val(FormIdentity);

                    $("#complaintReceivedDate_CRT").datepicker("startDate", HeaderData[0]["Days100Back"]);

                    $scope.complaintReceivedDate_CRT = HeaderData[0]["COMPLAINT_RECEIVED_DATE"];
                    $("#complaintReceivedDate_CRT").datepicker("setDate", HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);

                    $scope.ComplaintRegistrationDate_CRT = HeaderData[0]["COMPLAINT_REGISTRATION_DATE"];
                    $("#ComplaintRegistrationDate_CRT").datepicker("setDate", HeaderData[0]["COMPLAINT_REGISTRATION_DATE"]);

                    $scope.Registrant_Type = HeaderData[0]["REGISTRANT_TYPE_NAME"];
                    $scope.Registrant_Type_Code = HeaderData[0]["REGISTRANT_TYPE_CODE"];

                    if (HeaderData[0]["REGISTRANT_TYPE_NAME"] == "") {
                        $scope.Registrant_Type = $("#UserType").val();
                        $scope.Registrant_Type_ID = $("#UserType_ID").val();
                        $scope.Registrant_Type_Code = $("#UserType_ID").val();
                    }

                    $scope.SalesRepresentativeEmployeeCode = HeaderData[0]["SALES_REPRESENTATIVE_CODE"];
                    $scope.SalesRepresentativeEmployeeName = HeaderData[0]["SALES_REPRESENTATIVE_NAME"];

                    $scope.Complaint_Desc = HeaderData[0]["COMPLAINT_DESC"];

                    $scope.Remarks = HeaderData[0]["REMARKS"];
                    $scope.CREATED_IN = HeaderData[0]["CREATED_IN"];
                    $("#CREATED_IN").val(HeaderData[0]["CREATED_IN"]);
                    if (HeaderData[0]["Complaint_Attachments"] == "") {
                        $("#lblNote").css('display', 'block');
                    }
                    debugger
                    //$("#SelectedFiles").append(HeaderData[0]["Complaint_Attachments"]).trigger('change');

                    $scope.Complaint_Tracking_No = HeaderData[0]["COMPLAINT_TRACKING_NO"];

                    $scope.CR_Series_Code = HeaderData[0]["DOC_SERIES_CODE"];

                    if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                        $scope.CR_Series_Code = "CRSZ12";
                    }

                    //$scope.Registration_Status = HeaderData[0]["DOC_STATUS"];
                    $scope.Complaint_Code = HeaderData[0]["COMPLAINT_CODE"];

                    $scope.Customer_ID = HeaderData[0]["CUSTOMER_ID"];
                    $scope.Customer_Type_CODE = HeaderData[0]["CUSTOMER_TYPE_CODE"];
                    $scope.Customer_Code = HeaderData[0]["CUSTOMER_CODE"];
                    $scope.Customer_Name = HeaderData[0]["CUSTOMER_NAME"];
                    $scope.Customer_Type = HeaderData[0]["CUSTOMER_TYPE_NAME"];
                    $scope.Customer_Location = HeaderData[0]["LOCATION_NAME"];
                    $scope.Customer_LocationCode = HeaderData[0]["LOCATION_CODE"];

                    $scope.Contact_City = HeaderData[0]["CITY_NAME"];
                    $scope.CityCode = HeaderData[0]["CITY_CODE"];

                    $scope.Contact_State = HeaderData[0]["STATE_NAME"];
                    $scope.Contact_StateCode = HeaderData[0]["STATE_CODE"];


                    $scope.Contact_Area = HeaderData[0]["AREA_NAME"];
                    $scope.Contact_AreaCode = HeaderData[0]["AREA_CODE"];

                    $scope.Contact_Person = HeaderData[0]["CONTACT_PERSON"];
                    $scope.Contact_Number = HeaderData[0]["PHONE"];

                    $scope.Customer_Fax = HeaderData[0]["FAX"];
                    $scope.Customer_Email = HeaderData[0]["EMAIL"];
                    $scope.Complaint_Mode = HeaderData[0]["COMPLAINT_MODE_NAME"];
                    $scope.Complaint_Mode_CODE = HeaderData[0]["COMPLAINT_MODE_CODE"];
                    $scope.Product_Type = HeaderData[0]["PRODUCT_TYPE_NAME"];
                    $scope.Product_Type_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"];
                    $scope.Product_Category = HeaderData[0]["PRODUCT_CATEGORY_NAME"];
                    $scope.Product_Category_CODE = HeaderData[0]["PRODUCT_CATEGORY_CODE"];
                    $scope.Sub_Product_Category_CODE = HeaderData[0]["SUB_PRODUCT_CATEGORY_CODE"];
                    $scope.Sub_Product_Category = HeaderData[0]["SUB_PRODUCT_CATEGORY_TYPE"];

                    if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                        $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    }
                    else {
                        $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                    }
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

                    if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $("#THplantname").css('display', 'block');
                            $("#THBASICAMOUNT").css('display', 'block');
                            $("#totalprodvalue").css('display', 'block');
                            $("#THCategory").css('display', 'none');
                            $("#THDefectprct").css('display', 'block');
                        }
                        else {
                            $("#THplantname").css('display', 'block');
                            $("#THBASICAMOUNT").css('display', 'block');
                            $("#totalprodvalue").css('display', 'block');
                            $("#THCategory").css('display', 'none');
                            $("#THDefectprct").css('display', 'none');
                        }
                    }

                    else {
                        $("#THplantname").css('display', 'none');
                        $("#THBASICAMOUNT").css('display', 'none');
                        $("#totalprodvalue").css('display', 'none');
                        $("#THCategory").css('display', 'none');
                        $("#THDefectprct").css('display', 'none');
                    }
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                    $scope.SubStockiest_Direct_Customer = HeaderData[0]["END_CUSTOMER_DETAILS"];

                    ProductTypeChanges(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                    //if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36" && HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                    //    ProductTypeChanges("SBU2");
                    //}
                    // svprasadk display material supply details for SBU3 -- 15-10-2019
                    if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "" && HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                        ProductTypeChanges("SBU2");
                    }

                    if (HeaderData[0]["PROJECT_PARTY"] == "True" || HeaderData[0]["PROJECT_PARTY"] == "true") {
                        $("#Is_Project_Party").prop("checked", true);
                    }
                    else {
                    }

                    $scope.Site_Address = HeaderData[0]["SITE_ADDRESS"];

                    $scope.Complaint_Type = HeaderData[0]["COMPLAINT_TYPE_NAME"];
                    $scope.Complaint_Priority = HeaderData[0]["COMPLAINT_PRIORITY_NAME"];
                    $scope.Complaint_Category = HeaderData[0]["COMPLAINT_CATEGORY_NAME"];
                    $scope.Complaint_Severity = HeaderData[0]["COMPLAINT_SEVERITY_NAME"];

                    $scope.Complaint_Type_CODE = HeaderData[0]["COMPLAINT_TYPE_CODE"];
                    $scope.Complaint_Priority_CODE = HeaderData[0]["COMPLAINT_PRIORITY_CODE"];
                    $scope.Complaint_Category_CODE = HeaderData[0]["COMPLAINT_CATEGORY_CODE"];
                    $scope.Complaint_Severity_CODE = HeaderData[0]["COMPLAINT_SEVERITY_CODE"];

                    $scope.NatureOfComplaint = HeaderData[0]["NATURE_OF_COMPLAINT"];
                    $scope.ObservationByHILOfficial = HeaderData[0]["OBSERVATIONSBY_OFFICIAL"];

                    //Registration_Status
                    if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Waiting for approval" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                        $scope.Registration_Status = HeaderData[0]["FinalStatus"];
                    }
                    else {
                        $scope.Registration_Status = HeaderData[0]["DOC_STATUS"];
                        $("#Registration_Status").val($scope.Registration_Status).trigger('change');
                    }
                    //debugger;
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                    //debugger;
                    //console.log(HeaderData[0]["CREATED_DATE"] + " - " + new Date(HeaderData[0]["CREATED_DATE"]) + " - " + new Date('2020-11-19'));
                    if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19')) {
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
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").hide();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
                    } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19')) {
                        $("#SubStockiest_Direct_CustomerDiv").hide();
                        $("#PartyTypeDiv").show();
                        $("#Is_Project_PartyDiv").hide();
                        $("#SubStockiest_CodeDiv").hide();
                        $("#Site_AddressDiv").hide();
                        $("#SubStockiest_NameDiv").hide();
                        $("#SubStockiest_AddressDiv").hide();
                        $("#SubStockiest_NumberDiv").hide();
                        if (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest") {
                            $("#SubStockiest_CodeDiv").show();
                            $("#SubStockiest_NameDiv").show();
                            $("#SubStockiest_AddressDiv").show();
                            $("#SubStockiest_NumberDiv").show();
                            $scope.party_type_id = HeaderData[0]["party_type_id"];
                            $scope.party_type = HeaderData[0]["party_type"];
                            $scope.SubStockiest_Code = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_ID = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_Name = HeaderData[0]["SubStockiest_Name"];
                            $scope.SubStockiest_Address = HeaderData[0]["SubStockiest_Address"];
                            $scope.SubStockiest_Number = HeaderData[0]["SubStockiest_Number"];
                            $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                            $("#party_type").val(HeaderData[0]["party_type"]);
                            $("#SubStockiest_ID").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Code").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                            $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                            $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
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
                        //svprasadk 19-11-2020 SBU 1 requirement to party type other start
                        else {
                            if (HeaderData[0]["END_CUSTOMER_DETAILS"] != "" && (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest")) {
                                //$("#party_type").val("SubDealer");
                                $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                $("#party_type").val(HeaderData[0]["party_type"]);
                                $("#SubStockiest_CodeDiv").show();
                                $("#SubStockiest_NameDiv").show();
                                $("#SubStockiest_AddressDiv").show();
                                $("#SubStockiest_NumberDiv").show();
                                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                //$scope.party_type = "SubDealer";
                                $scope.party_type_id = HeaderData[0]["party_type_id"];
                                $scope.party_type = HeaderData[0]["party_type"];
                                $scope.SubStockiest_Code = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                $scope.SubStockiest_ID = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                $scope.SubStockiest_Name = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                $scope.SubStockiest_Address = HeaderData[0]["Customer_Address"];
                                $scope.SubStockiest_Number = HeaderData[0]["Phone_Number"];
                                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                                $("#SubStockiest_ID").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                $("#SubStockiest_Code").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                $("#SubStockiest_Name").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                $("#SubStockiest_Address").val(HeaderData[0]["SITE_ADDRESS"]);
                                $("#SubStockiest_Number").val(HeaderData[0]["PHONE"]);
                            } else {
                                //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                                $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                $("#party_type").val(HeaderData[0]["party_type"]);
                                $scope.party_type_id = HeaderData[0]["party_type_id"];
                                $scope.party_type = HeaderData[0]["party_type"];
                                //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                                //$("#party_type_id").val(1);
                                //$("#party_type").val("Stockiest");
                                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                //$scope.party_type = "Dealer";
                                //$scope.party_type_id = 1;
                                //$scope.party_type = "Stockiest";
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
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                        //$("#TYPE_OF_COMPLAINT_DIV").show();
                        //$("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        if (HeaderData[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                            $("#TYPE_OF_COMPLAINT > [value=" + HeaderData[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                        } else {
                            $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                        }
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $scope.party_type_id = HeaderData[0]["party_type_id"];
                        $scope.party_type = HeaderData[0]["party_type"];
                        //console.log(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                        //svprasadk 27-10-2020 SBU 1 requirement to get party type start
                        //console.log('party_type', HeaderData[0]["party_type_id"]);                            
                        //if (HeaderData[0]["party_type_id"] > 0) {
                        //    console.log('party_type if', HeaderData[0]["party_type_id"]);
                        //    $("#party_type > [value='" + HeaderData[0]["party_type_id"] + "']").attr("selected", "true");
                        //} else {
                        //    $("#party_type > [value=0]").attr("selected", "true");
                        //}
                        //$scope.party_type = HeaderData[0]["party_type_id"];
                        //console.log('party_type', HeaderData[0]["party_type_id"]);
                        //svprasadk 27-10-2020 SBU 1 requirement to get party type end
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").hide();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
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
                        //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                        //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        //$("#party_type > [value=0]").attr("selected", "true");
                        $scope.party_type_id = 1;
                        $scope.party_type = "Stockiest";
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").hide();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
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
                        $("#party_type").val(1);
                        $("#party_type").val("Stockiest");
                        $("#SubStockiest_ID").val("");
                        $("#SubStockiest_Code").val("");
                        $("#SubStockiest_Name").val("");
                        $("#SubStockiest_Address").val("");
                        $("#SubStockiest_Number").val("");
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                        $("#TYPE_OF_COMPLAINT_DIV").hide();
                        //$("#TYPE_OF_COMPLAINT").val(0);
                        //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                        //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        //$("#party_type > [value=0]").attr("selected", "true");
                        $scope.party_type_id = 1;
                        $scope.party_type = "Stockiest";
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").show();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
                    }
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                    //VIKAS G , 2023-04-12 SBU-8 START.
                    else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {

                        $(".BreakageQtyLabel").text("Defect Qty (Nos)");

                        $("#TYPE_OF_COMPLAINT_DIV").hide();

                        $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];

                    }
                    //VIKAS G , 2023-04-12 SBU-8 END.
                    var TRCode = "";

                    var RCPT_Lines = Data["RCPTLines"];

                    for (var i = 0; i < RCPT_Lines.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='RDSTTR_" + (i + 1) + "' onclick='EditRDST(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["SIZE"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (RCPT_Lines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["Received_Qty"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["Defective_Qty"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["GROSS_WEIGHT"] + "</td>";

                        TRCode = TRCode + "</tr>";
                    }
                    $("#Receipt_Details_Sheeting_Table tbody").append(TRCode);

                    TRCode = "";
                    var SUP_Lines = Data["SupplyLines"];
                    var totalvalue = 0;
                    for (var i = 0; i < SUP_Lines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + SUP_Lines[i]["PRODUCT_NAME"] + "</td>";
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") {
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                        }
                        //else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" ) {
                        //    TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                        //}
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SUP_Lines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["QTY_SUPPLIED"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["BreakageQtyNos"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = TRCode + "<td>" + ((SUP_Lines[i]["BreakageQtyNos"] / SUP_Lines[i]["QTY_SUPPLIED"]) * 100).toFixed(3) + "</td>";
                        }
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["REMARKS"] + "</td>";
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                        if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                            TRCode = TRCode + "<td>" + (SUP_Lines[i]["RATE_PER_UNIT"] * SUP_Lines[i]["BreakageQtyNos"]).toFixed(3) + "</td>";
                        }
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["SIZE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

                        totalvalue += (SUP_Lines[i]["RATE_PER_UNIT"] * SUP_Lines[i]["BreakageQtyNos"]);
                        console.log("Total value : " + totalvalue);
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                    }
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
                    $("#total_prod_value").val(totalvalue.toFixed(3));
                    console.log(totalvalue);
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                    $("#SupplyDetails_Table tbody").append(TRCode);

                    TRCode = "";
                    var MAT_SUP_Lines = Data["MatSupLines"];
                    for (var i = 0; i < MAT_SUP_Lines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' onclick='EditMSD(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["PLANT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLY_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLY_NAME"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["PLANT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLY_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLY_CODE"] + "</td>";

                        TRCode = TRCode + "</tr>";

                    }
                    $("#Material_Supply_Detail_Table tbody").append(TRCode);

                    var MyField = $("#HiddenForCMS").val();

                    if (HeaderData[0]["DOC_STATUS"] == "DRAFT") {
                        $("#MakeApproved").css('display', 'none');


                        $.ajax({
                            url: '../../Users/GetRightToAccess',
                            type: 'GET',
                            data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID").val(), FormCode: 'REG' }) },
                            success: function (AccessData) {
                                if (AccessData == "") {
                                    $("#SendRegistrationApproval").css('display', 'none');
                                    $("#CompRegSave").css('display', 'none');
                                }
                                else {
                                    AccessData = JSON.parse(AccessData);
                                    if (AccessData[0]["IS_UPDATE"] == true) {
                                        $("#SendRegistrationApproval").css('display', 'block');
                                        $("#CompRegSave").css('display', 'block');
                                    }
                                    else {
                                        $("#SendRegistrationApproval").css('display', 'none');
                                        $("#CompRegSave").css('display', 'none');

                                    }
                                }
                            }
                        });


                    }
                    else if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                        //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);

                        $("#MakeApproved").css('display', 'none');

                        var UserType = $("#UserType_ID").val();

                        if ((HeaderData[0]["DOC_STATUS"] == "Approved") && (UserType == "CSM" || UserType == "QH" || UserType == "QH_BU8" || UserType == "CSM_BU2" || UserType == "CSM_BU3")) {
                            $("#SuperSave").css('display', 'block');
                        }
                        else {
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
                        $("#Approved_Date").val(HeaderData[0]["APPROVED_DATE"]);
                    }
                    else if (HeaderData[0]["DOC_STATUS"] == "Waiting for approval") {

                        if (MyField == "") {
                            //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);

                            $("#MakeApproved").css('display', 'none');

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

                        }
                        else {
                            //Write Code For Approvals
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID").val(), FormCode: 'REG' }) },
                                success: function (AccessData) {
                                    if (AccessData == "") {
                                        $("#SendRegistrationApproval").css('display', 'none');
                                        $("#RegList").css('display', 'none');
                                        $("#NewReg").css('display', 'none');
                                        $("#MakeApproved").css('display', 'none');
                                        $("#PendingApprovalsList").css('display', 'block');
                                        $("#CompRegSave").css('display', 'none');
                                    }
                                    else {
                                        AccessData = JSON.parse(AccessData);
                                        if (AccessData[0]["IS_APPROVE"] == true) {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#RegList").css('display', 'none');
                                            $("#NewReg").css('display', 'none');
                                            $("#MakeApproved").css('display', 'block');
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#CompRegSave").css('display', 'block');
                                        }
                                        else {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#RegList").css('display', 'none');
                                            $("#NewReg").css('display', 'none');
                                            $("#MakeApproved").css('display', 'none');
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#CompRegSave").css('display', 'none');
                                        }
                                    }
                                }
                            });
                        }
                    }

                    $("#StateFilter").val(HeaderData[0]["STATE_CODE"]);
                    $("#CMSState").val(HeaderData[0]["STATE_CODE"]);

                    $("#HiddenForCMS").val("");
                    HideLoader();
                    $("div").removeClass('modal-backdrop fade in');


                }
            },
                function errorCallback(response) {
                    HideLoader();
                    alert("Error : " + response);
                });


        },
            //    $.when.apply($, ajaxcalls()).then(function () {
            //    //$.ajax("../../ComplaintRegistration/SaveComplaint");
            //    $.ajax("../../ComplaintRegistration/GetComplaint");
            //}),
            function errorCallback(response) {
                alert("Error : " + response);
            });
    }
    //VIKAS G, 25-03-2022 SEND BACK REQUEST IN COMPLAINT REGISTRATION APPROVAL
    $scope.SendBackRCData = function () {
        debugger
        try {
            var Approvals_Remarks = "";

            console.log("Approvals_Remarks : " + Approvals_Remarks);
            Approvals_Remarks = $("#Approvals_Remarks").val();
            if (Approvals_Remarks == "") {
                alert("Provide Remarks for Refer Back");
                return;
            }

            var Complaint_Tracking_No = $("#Complaint_Tracking_No").val();
            var r = confirm("Are You Sure To Send back the Complaint No :" + Complaint_Tracking_No);
            if (r == true) {

                //var FormIdentity = $("#FormIdentity").val();
                //var Complaint_Tracking_No = $("#Complaint_Tracking_No").val();
                //var SalesRepresentativeEmployeeCode = $("#SalesRepresentativeEmployeeCode").val();

                var RegistrationData = JSON.stringify({
                    FormIdentity: $("#FormIdentity").val(),
                    complaintReceivedDate_CRT: $("#complaintReceivedDate_CRT").val(),
                    ComplaintRegistrationDate_CRT: $("#ComplaintRegistrationDate_CRT").val(),
                    Registrant_Type: $("#Registrant_Type").val(),
                    Registrant_Type_Code: $("#Registrant_Type_Code").val(),
                    SalesRepresentativeEmployeeCode: $("#SalesRepresentativeEmployeeCode").val(),
                    SalesRepresentativeEmployeeName: $("#SalesRepresentativeEmployeeName").val(),
                    Complaint_Desc: $("#Complaint_Desc").val(),
                    Approvals_Remarks: $("#Approvals_Remarks").val(),
                    Remarks: $("#Remarks").val(),
                    Complaint_Tracking_No: $("#Complaint_Tracking_No").val(),
                    CR_Series_Code: $("#CR_Series_Code").val(),
                    Registration_Status: $("#Registration_Status").val(),
                    Complaint_Code: $("#Complaint_Code").val(),

                    Approved_Date: $("#Approved_Date").val(),
                    Customer_Code: $("#Customer_Code").val(),
                    Customer_Name: $("#Customer_Name").val(),

                    Customer_Type: $("#Customer_Type").val(),
                    Customer_Type_CODE: $("#Customer_Type_CODE").val(),

                    Customer_Location: $("#Customer_Location").val(),
                    Customer_LocationCode: $("#Customer_LocationCode").val(),


                    Contact_City: $("#Contact_City").val(),
                    CityCode: $("#CityCode").val(),

                    Contact_State: $("#Contact_State").val(),
                    Contact_StateCode: $("#Contact_StateCode").val(),

                    Contact_Area: $("#Contact_Area").val(),
                    Contact_AreaCode: $("#Contact_AreaCode").val(),
                    Contact_Person: $("#Contact_Person").val(),
                    Contact_Number: $("#Contact_Number").val(),

                    Customer_Fax: $("#Customer_Fax").val(),
                    Customer_Email: $("#Customer_Email").val(),
                    Complaint_Mode: $("#Complaint_Mode").val(),
                    Product_Type: $("#Product_Type_CODE").val(),
                    Product_Category: $("#Product_Category").val(),

                    SubStockiest_Direct_Customer: $("#SubStockiest_Direct_Customer").val(),
                    Is_Project_Party: $("#Is_Project_Party").is(':checked'),
                    Site_Address: $("#Site_Address").val(),
                    Complaint_Type: $("#Complaint_Type").val(),
                    Complaint_Category: $("#Complaint_Category").val(),

                    Complaint_Priority: $("#Complaint_Priority").val(),
                    Complaint_Severity: $("#Complaint_Severity").val(),

                    NatureOfComplaint: $("#NatureOfComplaint").val(),
                    ObservationByHILOfficial: $("#ObservationByHILOfficial").val(),


                    Product_Category_CODE: $("#Product_Category_CODE").val(),

                    Sub_Product_Category_CODE: $("#Sub_Product_Category_CODE").val(),
                    Sub_Product_Category: $("#Sub_Product_Category").val(),
                    Complaint_Priority_CODE: $("#Complaint_Priority_CODE").val(),


                    Complaint_Severity_CODE: $("#Complaint_Severity_CODE").val(),

                    Complaint_Mode_ID: $("#Complaint_Mode_ID").val(),
                    Complaint_Mode_CODE: $("#Complaint_Mode_CODE").val(),

                    Complaint_Type_ID: $("#Complaint_Type_ID").val(),
                    Complaint_Type_CODE: $("#Complaint_Type_CODE").val(),


                    Complaint_Category_CODE: $("#Complaint_Category_CODE").val(),


                    Product_Type_CODE: $("#Product_Type_CODE").val(),

                    Customer_ID: $("#Customer_ID").val(),

                    SITEDETAIL_CODE: $("#SITEDETAIL_CODE").val(),
                    COMPANYDETAIL_CODE: $("#COMPANYDETAIL_CODE").val(),

                    CREATED_BY: $("#UserCode").val(),
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                    party_type: $("#party_type_id").val(),
                    SubStockiest_Code: $("#SubStockiest_Code").val(),
                    SubStockiest_ID: $("#SubStockiest_ID").val(),
                    SubStockiest_Name: $("#SubStockiest_Name").val(),
                    SubStockiest_Address: $("#SubStockiest_Address").val(),
                    SubStockiest_Number: $("#SubStockiest_Number").val(),
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                    //TYPE_OF_COMPLAINT: $("#TYPE_OF_COMPLAINT").val()
                    TYPE_OF_COMPLAINT: $("#TYPE_OF_COMPLAINT").val()
                    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                });

                $.ajax({
                    method: 'POST',
                    url: '../../ComplaintRegistration/SendBackComplaintRegistration',
                    async: false,
                    data: { RegistrationData: RegistrationData },
                }).then(function successCallback(response) {
                    debugger

                    //var FormIdentity = $("#FormIdentity").val();
                    if (response == "FALSE") {
                    }
                    if (response == "TRUE") {
                        //$(".Complaint_NumberDiv").css("display", "block");
                        //$("#PendingApprovalsList").css('display', 'block');                        
                        //$scope.RegisterComplaint();                        
                    }

                    $scope.go('ComplaintPendingApproval');
                    $("div").removeClass('modal-backdrop fade in');
                },
                    function errorCallback(response) {
                        alert("Error : " + response);
                    });
            }
            else {

            }
        }

        catch (e) {
            alert("Error : SendBackRCData :" + e);
        }
    }



    $scope.Getcomplaint = function () {
        try {
            var FormIdentity = $("#FormIdentity").val();
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/GetComplaint',
                async: false,
                data: { Identity: FormIdentity },
            }).then(function successCallback(response) {
                //debugger
                console.log(response);
                if (response == "FALSE") {
                }
                else {

                    var Data = JSON.parse(response);
                    console.log("Stringify data" + Data);
                    var HeaderData = Data["Header"];
                    console.log("Stringify HeaderData" + HeaderData);

                    $("#MakeApproved").css('display', 'none');

                    if (HeaderData[0]["DOC_STATUS"] == "Approved") {

                    }
                    else {

                    }
                    $("#Complaint_Number").val(FormIdentity);

                    $("#complaintReceivedDate_CRT").datepicker("startDate", HeaderData[0]["Days100Back"]);

                    $scope.complaintReceivedDate_CRT = HeaderData[0]["COMPLAINT_RECEIVED_DATE"];
                    $("#complaintReceivedDate_CRT").datepicker("setDate", HeaderData[0]["COMPLAINT_RECEIVED_DATE"]);

                    $scope.ComplaintRegistrationDate_CRT = HeaderData[0]["COMPLAINT_REGISTRATION_DATE"];
                    $("#ComplaintRegistrationDate_CRT").datepicker("setDate", HeaderData[0]["COMPLAINT_REGISTRATION_DATE"]);

                    $scope.Registrant_Type = HeaderData[0]["REGISTRANT_TYPE_NAME"];
                    $scope.Registrant_Type_Code = HeaderData[0]["REGISTRANT_TYPE_CODE"];

                    if (HeaderData[0]["REGISTRANT_TYPE_NAME"] == "") {
                        $scope.Registrant_Type = $("#UserType").val();
                        $scope.Registrant_Type_ID = $("#UserType_ID").val();
                        $scope.Registrant_Type_Code = $("#UserType_ID").val();
                    }

                    $scope.SalesRepresentativeEmployeeCode = HeaderData[0]["SALES_REPRESENTATIVE_CODE"];
                    $scope.SalesRepresentativeEmployeeName = HeaderData[0]["SALES_REPRESENTATIVE_NAME"];

                    $scope.Complaint_Desc = HeaderData[0]["COMPLAINT_DESC"];

                    $scope.Remarks = HeaderData[0]["REMARKS"];
                    $scope.CREATED_IN = HeaderData[0]["CREATED_IN"];
                    $("#CREATED_IN").val(HeaderData[0]["CREATED_IN"]);
                    if (HeaderData[0]["Complaint_Attachments"] == "") {
                        $("#lblNote").css('display', 'block');
                    }
                    debugger
                    //$("#SelectedFiles").append(HeaderData[0]["Complaint_Attachments"]).trigger('change');

                    $scope.Complaint_Tracking_No = HeaderData[0]["COMPLAINT_TRACKING_NO"];

                    $scope.CR_Series_Code = HeaderData[0]["DOC_SERIES_CODE"];

                    if (HeaderData[0]["DOC_SERIES_CODE"] == "") {
                        $scope.CR_Series_Code = "CRSZ12";
                    }

                    //$scope.Registration_Status = HeaderData[0]["DOC_STATUS"];
                    $scope.Complaint_Code = HeaderData[0]["COMPLAINT_CODE"];

                    $scope.Customer_ID = HeaderData[0]["CUSTOMER_ID"];
                    $scope.Customer_Type_CODE = HeaderData[0]["CUSTOMER_TYPE_CODE"];
                    $scope.Customer_Code = HeaderData[0]["CUSTOMER_CODE"];
                    $scope.Customer_Name = HeaderData[0]["CUSTOMER_NAME"];
                    $scope.Customer_Type = HeaderData[0]["CUSTOMER_TYPE_NAME"];
                    $scope.Customer_Location = HeaderData[0]["LOCATION_NAME"];
                    $scope.Customer_LocationCode = HeaderData[0]["LOCATION_CODE"];

                    $scope.Contact_City = HeaderData[0]["CITY_NAME"];
                    $scope.CityCode = HeaderData[0]["CITY_CODE"];

                    $scope.Contact_State = HeaderData[0]["STATE_NAME"];
                    $scope.Contact_StateCode = HeaderData[0]["STATE_CODE"];


                    $scope.Contact_Area = HeaderData[0]["AREA_NAME"];
                    $scope.Contact_AreaCode = HeaderData[0]["AREA_CODE"];

                    $scope.Contact_Person = HeaderData[0]["CONTACT_PERSON"];
                    $scope.Contact_Number = HeaderData[0]["PHONE"];

                    $scope.Customer_Fax = HeaderData[0]["FAX"];
                    $scope.Customer_Email = HeaderData[0]["EMAIL"];
                    $scope.Complaint_Mode = HeaderData[0]["COMPLAINT_MODE_NAME"];
                    $scope.Complaint_Mode_CODE = HeaderData[0]["COMPLAINT_MODE_CODE"];
                    $scope.Product_Type = HeaderData[0]["PRODUCT_TYPE_NAME"];
                    $scope.Product_Type_CODE = HeaderData[0]["PRODUCT_TYPE_CODE"];
                    $scope.Product_Category = HeaderData[0]["PRODUCT_CATEGORY_NAME"];
                    $scope.Product_Category_CODE = HeaderData[0]["PRODUCT_CATEGORY_CODE"];
                    $scope.Sub_Product_Category_CODE = HeaderData[0]["SUB_PRODUCT_CATEGORY_CODE"];
                    $scope.Sub_Product_Category = HeaderData[0]["SUB_PRODUCT_CATEGORY_TYPE"];

                    if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "88") {
                        $(".BreakageQtyLabel").text("Defect Qty (Nos)");
                    }
                    else {
                        $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
                    }
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.


                    if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            $("#THplantname").css('display', 'block');
                            $("#THBASICAMOUNT").css('display', 'block');
                            $("#totalprodvalue").css('display', 'block');
                            $("#THCategory").css('display', 'none');
                            $("#THDefectprct").css('display', 'block');
                        }
                        else {
                            $("#THplantname").css('display', 'none');
                            $("#THBASICAMOUNT").css('display', 'none');
                            $("#totalprodvalue").css('display', 'none');
                            $("#THCategory").css('display', 'none');
                            $("#THDefectprct").css('display', 'none');
                        }
                    }
                    else {
                        $("#THplantname").css('display', 'none');
                        $("#THBASICAMOUNT").css('display', 'none');
                        $("#totalprodvalue").css('display', 'none');
                        $("#THCategory").css('display', 'none');
                        $("#THDefectprct").css('display', 'none');
                    }
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                    $scope.SubStockiest_Direct_Customer = HeaderData[0]["END_CUSTOMER_DETAILS"];

                    ProductTypeChanges(HeaderData[0]["PRODUCT_TYPE_CODE"]);
                    //if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] == "36" && HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                    //    ProductTypeChanges("SBU2");
                    //}
                    // svprasadk display material supply details for SBU3 -- 15-10-2019
                    if (HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "" && HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3") {
                        ProductTypeChanges("SBU2");
                    }

                    if (HeaderData[0]["PROJECT_PARTY"] == "True" || HeaderData[0]["PROJECT_PARTY"] == "true") {
                        $("#Is_Project_Party").prop("checked", true);
                    }
                    else {
                    }

                    $scope.Site_Address = HeaderData[0]["SITE_ADDRESS"];

                    $scope.Complaint_Type = HeaderData[0]["COMPLAINT_TYPE_NAME"];
                    $scope.Complaint_Priority = HeaderData[0]["COMPLAINT_PRIORITY_NAME"];
                    $scope.Complaint_Category = HeaderData[0]["COMPLAINT_CATEGORY_NAME"];
                    $scope.Complaint_Severity = HeaderData[0]["COMPLAINT_SEVERITY_NAME"];

                    $scope.Complaint_Type_CODE = HeaderData[0]["COMPLAINT_TYPE_CODE"];
                    $scope.Complaint_Priority_CODE = HeaderData[0]["COMPLAINT_PRIORITY_CODE"];
                    $scope.Complaint_Category_CODE = HeaderData[0]["COMPLAINT_CATEGORY_CODE"];
                    $scope.Complaint_Severity_CODE = HeaderData[0]["COMPLAINT_SEVERITY_CODE"];

                    $scope.NatureOfComplaint = HeaderData[0]["NATURE_OF_COMPLAINT"];
                    $scope.ObservationByHILOfficial = HeaderData[0]["OBSERVATIONSBY_OFFICIAL"];

                    //Registration_Status
                    if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Waiting for approval" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                        $scope.Registration_Status = HeaderData[0]["FinalStatus"];
                    }
                    else {
                        $scope.Registration_Status = HeaderData[0]["DOC_STATUS"];
                        $("#Registration_Status").val($scope.Registration_Status).trigger('change');
                    }
                    //debugger;
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                    //debugger;
                    //console.log(HeaderData[0]["CREATED_DATE"] + " - " + new Date(HeaderData[0]["CREATED_DATE"]) + " - " + new Date('2020-11-19'));
                    if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) < new Date('2020-11-19')) {
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
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").hide();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
                    } else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU1" && new Date(HeaderData[0]["CREATED_DATE"]) >= new Date('2020-11-19')) {
                        $("#SubStockiest_Direct_CustomerDiv").hide();
                        $("#PartyTypeDiv").show();
                        $("#Is_Project_PartyDiv").hide();
                        $("#SubStockiest_CodeDiv").hide();
                        $("#Site_AddressDiv").hide();
                        $("#SubStockiest_NameDiv").hide();
                        $("#SubStockiest_AddressDiv").hide();
                        $("#SubStockiest_NumberDiv").hide();
                        if (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest") {
                            $("#SubStockiest_CodeDiv").show();
                            $("#SubStockiest_NameDiv").show();
                            $("#SubStockiest_AddressDiv").show();
                            $("#SubStockiest_NumberDiv").show();
                            $scope.party_type_id = HeaderData[0]["party_type_id"];
                            $scope.party_type = HeaderData[0]["party_type"];
                            $scope.SubStockiest_Code = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_ID = HeaderData[0]["SubStockiest_Code"];
                            $scope.SubStockiest_Name = HeaderData[0]["SubStockiest_Name"];
                            $scope.SubStockiest_Address = HeaderData[0]["SubStockiest_Address"];
                            $scope.SubStockiest_Number = HeaderData[0]["SubStockiest_Number"];
                            $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                            $("#party_type").val(HeaderData[0]["party_type"]);
                            $("#SubStockiest_ID").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Code").val(HeaderData[0]["SubStockiest_Code"]);
                            $("#SubStockiest_Name").val(HeaderData[0]["SubStockiest_Name"]);
                            $("#SubStockiest_Address").val(HeaderData[0]["SubStockiest_Address"]);
                            $("#SubStockiest_Number").val(HeaderData[0]["SubStockiest_Number"]);
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
                        //svprasadk 19-11-2020 SBU 1 requirement to party type other start
                        else {
                            if (HeaderData[0]["END_CUSTOMER_DETAILS"] != "" && (HeaderData[0]["party_type"] == "SubDealer" || HeaderData[0]["party_type_id"] == 2 || HeaderData[0]["party_type"] == "Sub-Stockiest")) {
                                //$("#party_type").val("SubDealer");
                                $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                $("#party_type").val(HeaderData[0]["party_type"]);
                                $("#SubStockiest_CodeDiv").show();
                                $("#SubStockiest_NameDiv").show();
                                $("#SubStockiest_AddressDiv").show();
                                $("#SubStockiest_NumberDiv").show();
                                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                //$scope.party_type = "SubDealer";
                                $scope.party_type_id = HeaderData[0]["party_type_id"];
                                $scope.party_type = HeaderData[0]["party_type"];
                                $scope.SubStockiest_Code = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                $scope.SubStockiest_ID = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                $scope.SubStockiest_Name = HeaderData[0]["END_CUSTOMER_DETAILS"];
                                $scope.SubStockiest_Address = HeaderData[0]["Customer_Address"];
                                $scope.SubStockiest_Number = HeaderData[0]["Phone_Number"];
                                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master end
                                $("#SubStockiest_ID").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                $("#SubStockiest_Code").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                $("#SubStockiest_Name").val(HeaderData[0]["END_CUSTOMER_DETAILS"]);
                                $("#SubStockiest_Address").val(HeaderData[0]["SITE_ADDRESS"]);
                                $("#SubStockiest_Number").val(HeaderData[0]["PHONE"]);
                            } else {
                                //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party start
                                $("#party_type_id").val(HeaderData[0]["party_type_id"]);
                                $("#party_type").val(HeaderData[0]["party_type"]);
                                $scope.party_type_id = HeaderData[0]["party_type_id"];
                                $scope.party_type = HeaderData[0]["party_type"];
                                //svprasadk 12-11-2020 SBU 1 requirement to update sub stockiest master for DT Party end
                                //$("#party_type_id").val(1);
                                //$("#party_type").val("Stockiest");
                                //svprasadk 27-04-2020 SBU 1 requirement to add sub stockiest master start
                                //$scope.party_type = "Dealer";
                                //$scope.party_type_id = 1;
                                //$scope.party_type = "Stockiest";
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
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                        //$("#TYPE_OF_COMPLAINT_DIV").show();
                        //$("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        if (HeaderData[0]["TYPE_OF_COMPLAINT_ID"] > 0) {
                            $("#TYPE_OF_COMPLAINT > [value=" + HeaderData[0]["TYPE_OF_COMPLAINT_ID"] + "]").attr("selected", "true");
                        } else {
                            $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                        }
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $scope.party_type_id = HeaderData[0]["party_type_id"];
                        $scope.party_type = HeaderData[0]["party_type"];
                        //console.log(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                        //svprasadk 27-10-2020 SBU 1 requirement to get party type start
                        //console.log('party_type', HeaderData[0]["party_type_id"]);                            
                        //if (HeaderData[0]["party_type_id"] > 0) {
                        //    console.log('party_type if', HeaderData[0]["party_type_id"]);
                        //    $("#party_type > [value='" + HeaderData[0]["party_type_id"] + "']").attr("selected", "true");
                        //} else {
                        //    $("#party_type > [value=0]").attr("selected", "true");
                        //}
                        //$scope.party_type = HeaderData[0]["party_type_id"];
                        //console.log('party_type', HeaderData[0]["party_type_id"]);
                        //svprasadk 27-10-2020 SBU 1 requirement to get party type end
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").hide();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
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
                        //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                        //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        //$("#party_type > [value=0]").attr("selected", "true");
                        $scope.party_type_id = 1;
                        $scope.party_type = "Stockiest";
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").hide();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
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
                        $("#party_type").val(1);
                        $("#party_type").val("Stockiest");
                        $("#SubStockiest_ID").val("");
                        $("#SubStockiest_Code").val("");
                        $("#SubStockiest_Name").val("");
                        $("#SubStockiest_Address").val("");
                        $("#SubStockiest_Number").val("");
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                        $("#TYPE_OF_COMPLAINT_DIV").hide();
                        //$("#TYPE_OF_COMPLAINT").val(0);
                        //$("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
                        //$scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];
                        //$("#party_type > [value=0]").attr("selected", "true");
                        $scope.party_type_id = 1;
                        $scope.party_type = "Stockiest";
                        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
                        $("#InvoiceNoBU3_div").show();
                        $("#InvoiceNoBU3").val('');
                        //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
                    }
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                    //VIKAS G , 2023-04-12 SBU-8 START.
                    else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {

                        $(".BreakageQtyLabel").text("Defect Qty (Nos)");

                        $("#TYPE_OF_COMPLAINT_DIV").hide();

                        $("#TYPE_OF_COMPLAINT_ID").val(HeaderData[0]["TYPE_OF_COMPLAINT_ID"]);
                        $scope.TYPE_OF_COMPLAINT_ID = HeaderData[0]["TYPE_OF_COMPLAINT_ID"];
                        $("#TYPE_OF_COMPLAINT").val(HeaderData[0]["TYPE_OF_COMPLAINT"]);
                        $scope.TYPE_OF_COMPLAINT = HeaderData[0]["TYPE_OF_COMPLAINT"];

                    }
                    //VIKAS G , 2023-04-12 SBU-8 END.
                    var TRCode = "";

                    var RCPT_Lines = Data["RCPTLines"];

                    for (var i = 0; i < RCPT_Lines.length; i++) {
                        TRCode = TRCode + "<tr class='MousePointer' id='RDSTTR_" + (i + 1) + "' onclick='EditRDST(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["PRODUCT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["SIZE"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (RCPT_Lines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["Received_Qty"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["Defective_Qty"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + RCPT_Lines[i]["REMARKS"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'>" + RCPT_Lines[i]["GROSS_WEIGHT"] + "</td>";

                        TRCode = TRCode + "</tr>";
                    }
                    $("#Receipt_Details_Sheeting_Table tbody").append(TRCode);
                    $("#SupplyDetails_Table tbody").empty();
                    TRCode = "";
                    var SUP_Lines = Data["SupplyLines"];
                    //SUP_Lines.length = 0;
                    var totalvalue = 0;
                    for (var i = 0; i < SUP_Lines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='SD_" + (i + 1) + "' onclick='EditSD(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + SUP_Lines[i]["PRODUCT_NAME"] + "</td>";
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") {
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                        }
                        else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                        }
                        //else if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" ) {
                        //    TRCode = TRCode + "<td>" + SUP_Lines[i]["plant_name"] + "</td>";
                        //}
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["INVOICE_NO"] + "</td>";
                        TRCode = TRCode + "<td>" + (SUP_Lines[i]["INVOICE_DATE"]) + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["batch_no"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["QTY_SUPPLIED"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["BreakageQtyNos"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["TRANSPORTER"] + "</td>";
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["DEFECT_TYPE_NAME"] + "</td>";
                        if (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8") {
                            TRCode = TRCode + "<td>" + ((SUP_Lines[i]["BreakageQtyNos"] / SUP_Lines[i]["QTY_SUPPLIED"]) * 100).toFixed(3) + "</td>";
                        }
                        TRCode = TRCode + "<td>" + SUP_Lines[i]["REMARKS"] + "</td>";
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                        if ((HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU3" && HeaderData[0]["PRODUCT_CATEGORY_CODE"] != "36") || (HeaderData[0]["PRODUCT_TYPE_CODE"] == "SBU8")) {
                            TRCode = TRCode + "<td>" + (SUP_Lines[i]["RATE_PER_UNIT"] * SUP_Lines[i]["BreakageQtyNos"]).toFixed(3) + "</td>";
                        }
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["PRODUCT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["DEFECT_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'>" + SUP_Lines[i]["SIZE"] + "</td>";
                        TRCode = TRCode + "</tr>";
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.

                        totalvalue += (SUP_Lines[i]["RATE_PER_UNIT"] * SUP_Lines[i]["BreakageQtyNos"]);
                        console.log("Total value : " + totalvalue);
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                    }
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS START.
                    $("#total_prod_value").val(totalvalue.toFixed(3));
                    console.log(totalvalue);
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS END.

                    $("#SupplyDetails_Table tbody").append(TRCode);
                    //debugger
                    $("#Material_Supply_Detail_Table tbody").empty();
                    TRCode = "";
                    var MAT_SUP_Lines = Data["MatSupLines"];
                    for (var i = 0; i < MAT_SUP_Lines.length; i++) {

                        TRCode = TRCode + "<tr class='MousePointer' id='MSD_" + (i + 1) + "' onclick='EditMSD(this.id)'><td>" + (i + 1) + "</td>";

                        TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["PLANT_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLY_TYPE_NAME"] + "</td>";
                        TRCode = TRCode + "<td>" + MAT_SUP_Lines[i]["SUPPLY_NAME"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["PLANT_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLY_TYPE_CODE"] + "</td>";
                        TRCode = TRCode + "<td style='display:none'></td>";
                        TRCode = TRCode + "<td style='display:none'>" + MAT_SUP_Lines[i]["SUPPLY_CODE"] + "</td>";

                        TRCode = TRCode + "</tr>";

                    }
                    $("#Material_Supply_Detail_Table tbody").append(TRCode);

                    var MyField = $("#HiddenForCMS").val();

                    if (HeaderData[0]["DOC_STATUS"] == "DRAFT") {
                        $("#MakeApproved").css('display', 'none');


                        $.ajax({
                            url: '../../Users/GetRightToAccess',
                            type: 'GET',
                            data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID").val(), FormCode: 'REG' }) },
                            success: function (AccessData) {
                                if (AccessData == "") {
                                    $("#SendRegistrationApproval").css('display', 'none');
                                    $("#CompRegSave").css('display', 'none');
                                }
                                else {
                                    AccessData = JSON.parse(AccessData);
                                    if (AccessData[0]["IS_UPDATE"] == true) {
                                        $("#SendRegistrationApproval").css('display', 'block');
                                        $("#CompRegSave").css('display', 'block');
                                    }
                                    else {
                                        $("#SendRegistrationApproval").css('display', 'none');
                                        $("#CompRegSave").css('display', 'none');

                                    }
                                }
                            }
                        });


                    }
                    else if (HeaderData[0]["DOC_STATUS"] == "Approved" || HeaderData[0]["DOC_STATUS"] == "Rejected") {
                        //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);

                        $("#MakeApproved").css('display', 'none');

                        var UserType = $("#UserType_ID").val();

                        if ((HeaderData[0]["DOC_STATUS"] == "Approved") && (UserType == "CSM" || UserType == "QH" || UserType == "QH_BU8" || UserType == "CSM_BU2" || UserType == "CSM_BU3")) {
                            $("#SuperSave").css('display', 'block');
                        }
                        else {
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
                        $("#Approved_Date").val(HeaderData[0]["APPROVED_DATE"]);
                    }
                    else if (HeaderData[0]["DOC_STATUS"] == "Waiting for approval") {

                        if (MyField == "") {
                            //alert("No Changes are allowed as the Document Status is " + HeaderData[0]["DOC_STATUS"]);

                            $("#MakeApproved").css('display', 'none');

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

                        }
                        else {
                            //Write Code For Approvals
                            $.ajax({
                                url: '../../Users/GetRightToAccess',
                                type: 'GET',
                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType_ID").val(), FormCode: 'REG' }) },
                                success: function (AccessData) {
                                    if (AccessData == "") {
                                        $("#SendRegistrationApproval").css('display', 'none');
                                        $("#RegList").css('display', 'none');
                                        $("#NewReg").css('display', 'none');
                                        $("#MakeApproved").css('display', 'none');
                                        $("#PendingApprovalsList").css('display', 'block');
                                        $("#CompRegSave").css('display', 'none');
                                    }
                                    else {
                                        AccessData = JSON.parse(AccessData);
                                        if (AccessData[0]["IS_APPROVE"] == true) {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#RegList").css('display', 'none');
                                            $("#NewReg").css('display', 'none');
                                            $("#MakeApproved").css('display', 'block');
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#CompRegSave").css('display', 'block');
                                        }
                                        else {
                                            $("#SendRegistrationApproval").css('display', 'none');
                                            $("#RegList").css('display', 'none');
                                            $("#NewReg").css('display', 'none');
                                            $("#MakeApproved").css('display', 'none');
                                            $("#PendingApprovalsList").css('display', 'block');
                                            $("#CompRegSave").css('display', 'none');
                                        }
                                    }
                                }
                            });
                        }
                    }

                    $("#StateFilter").val(HeaderData[0]["STATE_CODE"]);
                    $("#CMSState").val(HeaderData[0]["STATE_CODE"]);
                    $("#HiddenForCMS").val("");
                    HideLoader();
                    $("div").removeClass('modal-backdrop fade in');

                }
            },
                function errorCallback(response) {
                    HideLoader();
                    alert("Error : " + response);
                });
        }
        catch (e) {
            alert("Error : Getcomplaint :" + e);
        }

    }
    // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.START*@
    $scope.SaveSDData = function () {
        try {
            debugger
            var ProdType = $("#Product_Type_CODE").val();
            var SD_id;
            var SD_ProductDetails;
            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
            var SD_PlantName;
            var SD_Category_BU8;
            var SD_ProductDetails_ID;
            var SD_ProductDetails_CODE;
            var SD_InvoiceNo;
            var SD_InvoiceDate;
            var SD_BatchNo;
            var SD_SuppliedQtyNos;
            var SD_BreakageQtyNos;
            var SD_Transporter;
            var SD_DefectType;
            var SD_DefectPercnt_BU8;
            var SD_DefectType_ID;
            var SD_DefectType_CODE;
            var SD_Remarks;
            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
            var SD_BasicAmount;
            var SD_ProductSIZE;
            var Flag = 0;
            var Product_Category_CODE = $("#Product_Category_CODE").val();

            if (ProdType != "SBU2") {
                if (ProdType == "SBU3" && Product_Category_CODE == "36") {
                    SD_id = $("#SD_id_SBU2").val();
                    SD_ProductDetails = $("#SD_ProductDetails_SBU2").val();

                    SD_ProductDetails_ID = $("#SD_ProductDetails_ID_SBU2").val();
                    SD_ProductDetails_CODE = $("#SD_ProductDetails_CODE_SBU2").val();


                    SD_InvoiceNo = $("#SD_InvoiceNo_SBU2").val();
                    SD_InvoiceDate = $("#SD_InvoiceDate_SBU2").val();
                    SD_BatchNo = $("#SD_BatchNo_SBU2").val();
                    SD_SuppliedQtyNos = $("#SD_SuppliedQtyNos_SBU2").val();
                    SD_BreakageQtyNos = $("#SD_BreakageQtyNos_SBU2").val();
                    SD_Transporter = $("#SD_Transporter_SBU2").val();
                    SD_DefectType = $("#SD_DefectType_SBU2").val();

                    SD_DefectType_ID = $("#SD_DefectType_ID_SBU2").val();
                    SD_DefectType_CODE = $("#SD_DefectType_CODE_SBU2").val();

                    SD_Remarks = $("#SD_Remarks_SBU2").val();

                    SD_ProductSIZE = $("#SD_ProductSIZE_SBU2").val();

                    if (SD_InvoiceNo == "") {
                        Flag = Flag + 1;
                        $("#SD_InvoiceNo_SBU2").css("border-color", "red");
                    }
                    else {
                        $("#SD_InvoiceNo_SBU2").css("border-color", "#d2d6de");
                    }

                    if (SD_ProductDetails == "") {
                        Flag = Flag + 1;
                        $("#SD_ProductDetails_SBU2").css("border-color", "red");
                    }
                    else {
                        $("#SD_ProductDetails_SBU2").css("border-color", "#d2d6de");
                    }

                    if (SD_SuppliedQtyNos == "") {
                        Flag = Flag + 1;
                        $("#SD_SuppliedQtyNos_SBU2").css("border-color", "red");
                    }
                    else {
                        $("#SD_SuppliedQtyNos_SBU2").css("border-color", "#d2d6de");
                    }

                    if (SD_BreakageQtyNos == "") {
                        Flag = Flag + 1;
                        $("#SD_BreakageQtyNos_SBU2").css("border-color", "red");
                    }
                    else {
                        $("#SD_BreakageQtyNos_SBU2").css("border-color", "#d2d6de");
                    }

                    if (SD_DefectType == "") {
                        Flag = Flag + 1;
                        $("#SD_DefectType_SBU2").css("border-color", "red");
                    }
                    else {
                        $("#SD_DefectType_SBU2").css("border-color", "#d2d6de");
                    }
                }
                else if (ProdType == "SBU8") {
                    SD_id = $("#SD_id_BU8").val();
                    SD_ProductDetails = $("#SD_ProductDetails_BU8").val();

                    SD_ProductDetails_ID = $("#SD_ProductDetails_ID_BU8").val();
                    SD_ProductDetails_CODE = $("#SD_ProductDetails_CODE_BU8").val();
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                    SD_Category_BU8 = $("#SD_Category_BU8").val();
                    SD_InvoiceNo = $("#SD_InvoiceNo_BU8").val();
                    SD_InvoiceDate = $("#SD_InvoiceDate_BU8").val();
                    SD_BatchNo = $("#SD_BatchNo_BU8").val();
                    SD_SuppliedQtyNos = $("#SD_SuppliedQtyNos_BU8").val();
                    SD_BreakageQtyNos = $("#SD_BreakageQtyNos_BU8").val();
                    SD_Transporter = $("#SD_Transporter_BU8").val();
                    SD_DefectType = $("#SD_DefectType_BU8").val();
                    SD_DefectPercnt_BU8 = $("#SD_DefectPercnt_BU8").val();
                    SD_DefectType_ID = $("#SD_DefectType_ID_BU8").val();
                    SD_DefectType_CODE = $("#SD_DefectType_CODE_BU8").val();
                    SD_Remarks = $("#SD_Remarks_BU8").val();
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                    SD_BasicAmount = $("#SD_BasicAmount_BU8").val();

                    SD_ProductSIZE = $("#SD_ProductSIZE_BU8").val();

                    if (SD_ProductDetails == "") {
                        Flag = Flag + 1;
                        $("#SD_ProductDetails_BU8").css("border-color", "red");
                    }
                    else {
                        $("#SD_ProductDetails_BU8").css("border-color", "#d2d6de");
                    }

                    if (SD_SuppliedQtyNos == "") {
                        Flag = Flag + 1;
                        $("#SD_SuppliedQtyNos_BU8").css("border-color", "red");
                    }
                    else {
                        $("#SD_SuppliedQtyNos_BU8").css("border-color", "#d2d6de");
                    }

                    if (SD_BreakageQtyNos == "") {
                        Flag = Flag + 1;
                        $("#SD_BreakageQtyNos_BU8").css("border-color", "red");
                    }
                    else {
                        $("#SD_BreakageQtyNos_BU8").css("border-color", "#d2d6de");
                    }

                    if (SD_DefectType == "") {
                        Flag = Flag + 1;
                        $("#SD_DefectType_BU8").css("border-color", "red");
                    }
                    else {
                        $("#SD_DefectType_BU8").css("border-color", "#d2d6de");
                    }
                }
                else {
                    SD_id = $("#SD_id").val();
                    SD_ProductDetails = $("#SD_ProductDetails").val();

                    SD_ProductDetails_ID = $("#SD_ProductDetails_ID").val();
                    SD_ProductDetails_CODE = $("#SD_ProductDetails_CODE").val();
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                    SD_PlantName = $("#SD_PlantName").val();

                    SD_InvoiceNo = $("#SD_InvoiceNo").val();
                    SD_InvoiceDate = $("#SD_InvoiceDate").val();
                    SD_BatchNo = $("#SD_BatchNo").val();
                    SD_SuppliedQtyNos = $("#SD_SuppliedQtyNos").val();
                    SD_BreakageQtyNos = $("#SD_BreakageQtyNos").val();
                    SD_Transporter = $("#SD_Transporter").val();
                    SD_DefectType = $("#SD_DefectType").val();

                    SD_DefectType_ID = $("#SD_DefectType_ID").val();
                    SD_DefectType_CODE = $("#SD_DefectType_CODE").val();

                    SD_Remarks = $("#SD_Remarks").val();
                    //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                    SD_BasicAmount = $("#SD_BasicAmount").val();

                    SD_ProductSIZE = $("#SD_ProductSIZE").val();

                    if (SD_ProductDetails == "") {
                        Flag = Flag + 1;
                        $("#SD_ProductDetails").css("border-color", "red");
                    }
                    else {
                        $("#SD_ProductDetails").css("border-color", "#d2d6de");
                    }

                    if (SD_SuppliedQtyNos == "") {
                        Flag = Flag + 1;
                        $("#SD_SuppliedQtyNos").css("border-color", "red");
                    }
                    else {
                        $("#SD_SuppliedQtyNos").css("border-color", "#d2d6de");
                    }

                    if (SD_BreakageQtyNos == "") {
                        Flag = Flag + 1;
                        $("#SD_BreakageQtyNos").css("border-color", "red");
                    }
                    else {
                        $("#SD_BreakageQtyNos").css("border-color", "#d2d6de");
                    }

                    if (SD_DefectType == "") {
                        Flag = Flag + 1;
                        $("#SD_DefectType").css("border-color", "red");
                    }
                    else {
                        $("#SD_DefectType").css("border-color", "#d2d6de");
                    }
                }
            }
            else {
                SD_id = $("#SD_id_SBU2").val();
                SD_ProductDetails = $("#SD_ProductDetails_SBU2").val();

                SD_ProductDetails_ID = $("#SD_ProductDetails_ID_SBU2").val();
                SD_ProductDetails_CODE = $("#SD_ProductDetails_CODE_SBU2").val();


                SD_InvoiceNo = $("#SD_InvoiceNo_SBU2").val();
                SD_InvoiceDate = $("#SD_InvoiceDate_SBU2").val();
                SD_BatchNo = $("#SD_BatchNo_SBU2").val();
                SD_SuppliedQtyNos = $("#SD_SuppliedQtyNos_SBU2").val();
                SD_BreakageQtyNos = $("#SD_BreakageQtyNos_SBU2").val();
                SD_Transporter = $("#SD_Transporter_SBU2").val();
                SD_DefectType = $("#SD_DefectType_SBU2").val();

                SD_DefectType_ID = $("#SD_DefectType_ID_SBU2").val();
                SD_DefectType_CODE = $("#SD_DefectType_CODE_SBU2").val();

                SD_Remarks = $("#SD_Remarks_SBU2").val();

                SD_ProductSIZE = $("#SD_ProductSIZE_SBU2").val();

                if (SD_InvoiceNo == "") {
                    Flag = Flag + 1;
                    $("#SD_InvoiceNo_SBU2").css("border-color", "red");
                }
                else {
                    $("#SD_InvoiceNo_SBU2").css("border-color", "#d2d6de");
                }

                if (SD_ProductDetails == "") {
                    Flag = Flag + 1;
                    $("#SD_ProductDetails_SBU2").css("border-color", "red");
                }
                else {
                    $("#SD_ProductDetails_SBU2").css("border-color", "#d2d6de");
                }

                if (SD_SuppliedQtyNos == "") {
                    Flag = Flag + 1;
                    $("#SD_SuppliedQtyNos_SBU2").css("border-color", "red");
                }
                else {
                    $("#SD_SuppliedQtyNos_SBU2").css("border-color", "#d2d6de");
                }

                if (SD_BreakageQtyNos == "") {
                    Flag = Flag + 1;
                    $("#SD_BreakageQtyNos_SBU2").css("border-color", "red");
                }
                else {
                    $("#SD_BreakageQtyNos_SBU2").css("border-color", "#d2d6de");
                }

                if (SD_DefectType == "") {
                    Flag = Flag + 1;
                    $("#SD_DefectType_SBU2").css("border-color", "red");
                }
                else {
                    $("#SD_DefectType_SBU2").css("border-color", "#d2d6de");
                }
            }

            if (ProdType == "SBU3" && Product_Category_CODE != "36") {
                if (SD_InvoiceNo == "") {
                    Flag = Flag + 1;
                    $("#SD_InvoiceNo").css("border-color", "red");
                }
                else {
                    $("#SD_InvoiceNo").css("border-color", "#d2d6de");
                }


                if (SD_InvoiceDate == "") {
                    Flag = Flag + 1;
                    $("#SD_InvoiceDate").css("border-color", "red");
                }
                else {
                    $("#SD_InvoiceDate").css("border-color", "#d2d6de");
                }

            }


            if (Flag > 0) {
                return;
            }
            else {

                if (SD_InvoiceNo == "") {
                }
                else if (SD_InvoiceNo.length == 10) {
                }
                else {
                    alert("Invalid Invoice Number");
                    return
                }


                var TRCode = "";

                //if (ProdType == "SBU3" && Product_Category_CODE != "36") {
                //    TRCode = TRCode + "<td>" + SD_ProductDetails_CODE + "<br />" + SD_ProductDetails + "</td>";
                //} else {
                TRCode = TRCode + "<td>" + SD_ProductDetails + "</td>";
                //}
                //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                if (ProdType == "SBU3" && Product_Category_CODE != "36") {
                    TRCode = TRCode + "<td>" + SD_PlantName + "</td>";
                }
                else if (ProdType == "SBU8") {
                    TRCode = TRCode + "<td>" + SD_Category_BU8 + "</td>";
                }
                TRCode = TRCode + "<td>" + SD_InvoiceNo + "</td>";
                TRCode = TRCode + "<td>" + SD_InvoiceDate + "</td>";

                TRCode = TRCode + "<td>" + SD_BatchNo + "</td>";
                TRCode = TRCode + "<td>" + SD_SuppliedQtyNos + "</td>";
                TRCode = TRCode + "<td>" + SD_BreakageQtyNos + "</td>";

                TRCode = TRCode + "<td>" + SD_Transporter + "</td>";
                TRCode = TRCode + "<td>" + SD_DefectType + "</td>";
                if (ProdType == "SBU8") {
                    TRCode = TRCode + "<td>" + SD_DefectPercnt_BU8 + "</td>";
                }
                TRCode = TRCode + "<td>" + SD_Remarks + "</td>";
                //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                if ((ProdType == "SBU3" && Product_Category_CODE != "36") || (ProdType == "SBU8")) {
                    TRCode = TRCode + "<td>" + SD_BasicAmount + "</td>";
                }
                TRCode = TRCode + "<td style='display:none'>" + SD_ProductDetails_ID + "</td>";
                TRCode = TRCode + "<td style='display:none'>" + SD_ProductDetails_CODE + "</td>";

                TRCode = TRCode + "<td style='display:none'>" + SD_DefectType_ID + "</td>";
                TRCode = TRCode + "<td style='display:none'>" + SD_DefectType_CODE + "</td>";

                TRCode = TRCode + "<td style='display:none'>" + SD_ProductSIZE + "</td>";


                if (SD_id == "") {
                    SD_id = $("#SupplyDetails_Table tbody tr").length + 1;

                    TRCode = "<tr class='MousePointer' id='SD_" + SD_id + "' onclick='EditSD(this.id)'><td>" + SD_id + "</td>" + TRCode + "</tr>";
                    $("#SupplyDetails_Table tbody").append(TRCode);
                }
                else {
                    if (ProdType == "SBU3" && Product_Category_CODE != "36") {
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[0].innerHTML = SD_id;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[1].innerHTML = SD_ProductDetails;
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[2].innerHTML = SD_PlantName;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[3].innerHTML = SD_InvoiceNo;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[4].innerHTML = SD_InvoiceDate;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[5].innerHTML = SD_BatchNo;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[6].innerHTML = SD_SuppliedQtyNos;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[7].innerHTML = SD_BreakageQtyNos;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[8].innerHTML = SD_Transporter;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[9].innerHTML = SD_DefectType;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[10].innerHTML = SD_Remarks;
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[11].innerHTML = SD_BasicAmount;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[12].innerHTML = SD_ProductDetails_ID;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[13].innerHTML = SD_ProductDetails_CODE;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[14].innerHTML = SD_DefectType_ID;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[15].innerHTML = SD_DefectType_CODE;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[16].innerHTML = SD_ProductSIZE;
                    }
                    //VIKAS G, 13-3-2023, SBU-8 START

                    if (ProdType == "SBU8") {
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[0].innerHTML = SD_id;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[1].innerHTML = SD_ProductDetails;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[2].innerHTML = SD_Category_BU8;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[3].innerHTML = SD_InvoiceNo;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[4].innerHTML = SD_InvoiceDate;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[5].innerHTML = SD_BatchNo;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[6].innerHTML = SD_SuppliedQtyNos;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[7].innerHTML = SD_BreakageQtyNos;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[8].innerHTML = SD_Transporter;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[9].innerHTML = SD_DefectType;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[10].innerHTML = SD_DefectPercnt_BU8;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[11].innerHTML = SD_Remarks;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[12].innerHTML = SD_BasicAmount;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[13].innerHTML = SD_ProductDetails_ID;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[14].innerHTML = SD_ProductDetails_CODE;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[15].innerHTML = SD_DefectType_ID;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[16].innerHTML = SD_DefectType_CODE;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[17].innerHTML = SD_ProductSIZE;
                    }
                    //VIKAS G, 13-3-2023, SBU-8 END
                    else {
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[0].innerHTML = SD_id;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[1].innerHTML = SD_ProductDetails;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[2].innerHTML = SD_InvoiceNo;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[3].innerHTML = SD_InvoiceDate;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[4].innerHTML = SD_BatchNo;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[5].innerHTML = SD_SuppliedQtyNos;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[6].innerHTML = SD_BreakageQtyNos;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[7].innerHTML = SD_Transporter;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[8].innerHTML = SD_DefectType;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[9].innerHTML = SD_Remarks;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[10].innerHTML = SD_ProductDetails_ID;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[11].innerHTML = SD_ProductDetails_CODE;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[12].innerHTML = SD_DefectType_ID;
                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[13].innerHTML = SD_DefectType_CODE;

                        $("#SupplyDetails_Table tbody #SD_" + SD_id + " td")[14].innerHTML = SD_ProductSIZE;
                    }
                }


                $("#SD_id").val("");
                $("#SD_ProductDetails").val("");
                //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                $("#SD_PlantName").val("");
                $("#SD_InvoiceNo").val("");
                $("#SD_InvoiceDate").val("");
                $("#SD_BatchNo").val("");
                $("#SD_SuppliedQtyNos").val("");
                $("#SD_BreakageQtyNos").val("");
                $("#SD_Transporter").val("");
                $("#SD_DefectType").val("");
                $("#SD_Remarks").val("");
                //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                $("#SD_BasicAmount").val("");
                $("#SD_ProductDetails_ID").val("");
                $("#SD_ProductDetails_CODE").val("");

                $("#SD_DefectType_ID").val("");
                $("#SD_DefectType_CODE").val("");

                $("#SD_ProductSIZE").val("");
                //VIKAS G, 2023-02-22 SBU-8 START
                $("#SD_id_BU8").val("");
                $("#SD_ProductDetails_BU8").val("");
                $("#SD_Category_BU8").val("");
                $("#SD_InvoiceNo_BU8").val("");
                $("#SD_InvoiceDate_BU8").val("");
                $("#SD_BatchNo_BU8").val("");
                $("#SD_SuppliedQtyNos_BU8").val("");
                $("#SD_BreakageQtyNos_BU8").val("");
                $("#SD_Transporter_BU8").val("");
                $("#SD_DefectType_BU8").val("");
                $("#SD_DefectPercnt_BU8").val("");
                $("#SD_Remarks_BU8").val("");
                $("#SD_BasicAmount_BU8").val("");
                $("#SD_ProductDetails_ID_BU8").val("");
                $("#SD_ProductDetails_CODE_BU8").val("");
                $("#SD_DefectType_ID_BU8").val("");
                $("#SD_DefectType_CODE_BU8").val("");
                $("#SD_ProductSIZE_BU8").val("");
                //VIKAS G, 2023-02-22 SBU-8 END
                $("#SD_id_SBU2").val("");
                $("#SD_ProductDetails_SBU2").val("");
                $("#SD_InvoiceNo_SBU2").val("");
                $("#SD_InvoiceDate_SBU2").val("");
                $("#SD_BatchNo_SBU2").val("");
                $("#SD_SuppliedQtyNos_SBU2").val("");
                $("#SD_BreakageQtyNos_SBU2").val("");
                $("#SD_Transporter_SBU2").val("");
                $("#SD_DefectType_SBU2").val("");
                $("#SD_Remarks_SBU2").val("");

                $("#SD_ProductDetails_ID_SBU2").val("");
                $("#SD_ProductDetails_CODE_SBU2").val("");

                $("#SD_DefectType_ID_SBU2").val("");
                $("#SD_DefectType_CODE_SBU2").val("");

                $("#SD_ProductSIZE_SBU2").val("");

                $("#SupplyDetailModalBU8").modal("hide");
                $("#SupplyDetailModal_SBU2").modal("hide");
                $("#SupplyDetailModal_SBU2").modal("hide");
                SaveDataToServer('SupplyDetails');

            }
            //OpenSupDetModel();
        }
        catch (e) {
            alert("Error : SaveSDData :" + e);
        }
    }
    // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.END*@

    // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.START*@
    function SaveDataToServer(TableName) {
        debugger
        try {
            var Flag = 0;
            var ProdType = $("#Product_Type_CODE").val();
            var Product_Category_CODE = $("#Product_Category_CODE").val();
            //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
            if (($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() == "Select" || $("#party_type").val() == "")) || ($("#Product_Type_CODE").val() == "SBU8" && ($("#party_type").val() == "Select" || $("#party_type").val() == ""))) {
                Flag = Flag + 1;
                $("#party_type").css("border-color", "red");
            }
            else if (($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() != "Select" || $("#party_type").val() != "")) || ($("#Product_Type_CODE").val() == "SBU8" && ($("#party_type").val() != "Select" || $("#party_type").val() != ""))) {
                $("#party_type").css("border-color", "#d2d6de");
            }
            if (($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() == "SubDealer" || $("#party_type_id").val() == 2 || $("#party_type").val() == "Sub-Stockiest")) || ($("#Product_Type_CODE").val() == "SBU8" && ($("#party_type").val() == "SubDealer" || $("#party_type_id").val() == 2 || $("#party_type").val() == "Sub-Stockiest"))) {
                if ($("#SubStockiest_Code").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Code").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Code").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Name").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Name").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Name").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Address").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Address").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Address").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Number").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Number").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Number").css("border-color", "#d2d6de");
                }
            }
            //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end

            if (Flag > 0) {
                return;
            }
            else {
            }
            var ReceiptDetailsForSheeting = new Array();
            var MaterialSupplyDetail = new Array();
            var SupplyDetails = new Array();


            MaterialSupplyDetail = new Array();

            $("#Material_Supply_Detail_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                MaterialSupplyDetail.push({
                    SlNo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[0].innerHTML,
                    MaterialBelongsTo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[1].innerHTML,
                    ProductSuppliedFrom: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[2].innerHTML,
                    Name: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[3].innerHTML,


                    Material_Belongs_To_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[4].innerHTML,
                    Material_Belongs_To_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[5].innerHTML,
                    Product_Supplied_From_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[6].innerHTML,
                    Product_Supplied_From_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[7].innerHTML,
                    MSD_Name_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[8].innerHTML,
                    MSD_Name_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[9].innerHTML

                });
            });

            ReceiptDetailsForSheeting = new Array();

            $("#Receipt_Details_Sheeting_Table tbody tr").each(function () {
                RowId = ($(this).attr("id"));
                ReceiptDetailsForSheeting.push({
                    SlNo: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[0].innerHTML,
                    ItemType: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[1].innerHTML,
                    Size: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[2].innerHTML,
                    InvoiceNo: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[3].innerHTML,
                    //InvoiceDate: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[4].innerHTML,
                    InvoiceDate: DateToWestern($("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[4].innerHTML),
                    BatchNo: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[5].innerHTML,
                    ReceivedQty: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[6].innerHTML,
                    BreakageQty: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[7].innerHTML,
                    TypeofDefect: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[8].innerHTML,
                    Remarks: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[9].innerHTML,

                    Defect_Type_ID: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[10].innerHTML,
                    Defect_Type_CODE: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[11].innerHTML,
                    Item_Type_Product_ID: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[12].innerHTML,
                    Item_Type_Product_CODE: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[13].innerHTML,

                    GrossWeight: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[14].innerHTML
                });
            });

            SupplyDetails = new Array();
            var BU = $("#Product_Type_CODE").val();
            console.log("BU :" + BU);
            var Productcode = $("#Product_Category_CODE").val();
            console.log("Productcode : " + Productcode);
            if (BU == "SBU3" && Productcode != "36") {
                $("#SupplyDetails_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    SupplyDetails.push({
                        SlNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[0].innerHTML,
                        ProductDetails: $("#SupplyDetails_Table tbody #" + RowId + " td")[1].innerHTML,
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                        SD_Category_BU8: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                        InvoiceNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                        //InvoiceDate: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                        InvoiceDate: DateToWestern($("#SupplyDetails_Table tbody #" + RowId + " td")[4].innerHTML),
                        BatchNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[5].innerHTML,
                        SuppliedQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[6].innerHTML,
                        BreakageQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[7].innerHTML,
                        Transporter: $("#SupplyDetails_Table tbody #" + RowId + " td")[8].innerHTML,
                        Defect_Type: $("#SupplyDetails_Table tbody #" + RowId + " td")[9].innerHTML,
                        Remarks: $("#SupplyDetails_Table tbody #" + RowId + " td")[10].innerHTML,
                        //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                        BasicAmount: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                        SD_ProductDetails_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[12].innerHTML,
                        SD_ProductDetails_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[13].innerHTML,
                        SD_DefectType_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[14].innerHTML,
                        SD_DefectType_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[15].innerHTML,

                        SD_ProductSIZE: $("#SupplyDetails_Table tbody #" + RowId + " td")[16].innerHTML

                    });
                });
            }

            else {
                //VIKAS G, 13-3-2023, SBU-8 START
                if (BU == "SBU8") {
                    $("#SupplyDetails_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupplyDetails.push({
                            SlNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[0].innerHTML,
                            ProductDetails: $("#SupplyDetails_Table tbody #" + RowId + " td")[1].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                            SD_PlantName: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                            InvoiceNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            //InvoiceDate: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            InvoiceDate: DateToWestern($("#SupplyDetails_Table tbody #" + RowId + " td")[4].innerHTML),
                            BatchNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[5].innerHTML,
                            SuppliedQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[6].innerHTML,
                            BreakageQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[7].innerHTML,
                            Transporter: $("#SupplyDetails_Table tbody #" + RowId + " td")[8].innerHTML,
                            Defect_Type: $("#SupplyDetails_Table tbody #" + RowId + " td")[9].innerHTML,
                            SD_DefectPercnt_BU8: $("#SupplyDetails_Table tbody #" + RowId + " td")[10].innerHTML,
                            Remarks: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                            BasicAmount: $("#SupplyDetails_Table tbody #" + RowId + " td")[12].innerHTML,
                            SD_ProductDetails_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[13].innerHTML,
                            SD_ProductDetails_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[14].innerHTML,
                            SD_DefectType_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[15].innerHTML,
                            SD_DefectType_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[16].innerHTML,

                            SD_ProductSIZE: $("#SupplyDetails_Table tbody #" + RowId + " td")[17].innerHTML
                        });
                    });
                }
                //VIKAS G, 13-3-2023, SBU-8 END
                else {
                    $("#SupplyDetails_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupplyDetails.push({
                            SlNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[0].innerHTML,
                            ProductDetails: $("#SupplyDetails_Table tbody #" + RowId + " td")[1].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                            //SD_PlantName: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                            InvoiceNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                            //InvoiceDate: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            InvoiceDate: DateToWestern($("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML),
                            BatchNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[4].innerHTML,
                            SuppliedQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[5].innerHTML,
                            BreakageQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[6].innerHTML,
                            Transporter: $("#SupplyDetails_Table tbody #" + RowId + " td")[7].innerHTML,
                            Defect_Type: $("#SupplyDetails_Table tbody #" + RowId + " td")[8].innerHTML,
                            Remarks: $("#SupplyDetails_Table tbody #" + RowId + " td")[9].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
                            //BasicAmount: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                            SD_ProductDetails_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[10].innerHTML,
                            SD_ProductDetails_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                            SD_DefectType_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[12].innerHTML,
                            SD_DefectType_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[13].innerHTML,

                            SD_ProductSIZE: $("#SupplyDetails_Table tbody #" + RowId + " td")[14].innerHTML

                        });
                    });
                }
            }
            //svprasadk 17-10-2020 SBU 1 requirement to remove type of complaint start
            $("#TYPE_OF_COMPLAINT").val(0);
            //svprasadk 17-10-2020 SBU 1 requirement to remove type of complaint start
            var RegistrationData = JSON.stringify({
                FormIdentity: $("#FormIdentity").val(),
                complaintReceivedDate_CRT: $("#complaintReceivedDate_CRT").val(),
                ComplaintRegistrationDate_CRT: $("#ComplaintRegistrationDate_CRT").val(),
                Registrant_Type: $("#Registrant_Type").val(),
                Registrant_Type_Code: $("#Registrant_Type_Code").val(),
                SalesRepresentativeEmployeeCode: $("#SalesRepresentativeEmployeeCode").val(),
                SalesRepresentativeEmployeeName: $("#SalesRepresentativeEmployeeName").val(),
                Complaint_Desc: $("#Complaint_Desc").val(),

                Remarks: $("#Remarks").val(),
                Complaint_Tracking_No: $("#Complaint_Tracking_No").val(),
                CR_Series_Code: $("#CR_Series_Code").val(),
                Registration_Status: $("#Registration_Status").val(),
                Complaint_Code: $("#Complaint_Code").val(),

                Approved_Date: $("#Approved_Date").val(),
                Customer_Code: $("#Customer_Code").val(),
                Customer_Name: $("#Customer_Name").val(),

                Customer_Type: $("#Customer_Type").val(),
                Customer_Type_CODE: $("#Customer_Type_CODE").val(),

                Customer_Location: $("#Customer_Location").val(),
                Customer_LocationCode: $("#Customer_LocationCode").val(),


                Contact_City: $("#Contact_City").val(),
                CityCode: $("#CityCode").val(),

                Contact_State: $("#Contact_State").val(),
                Contact_StateCode: $("#Contact_StateCode").val(),

                Contact_Area: $("#Contact_Area").val(),
                Contact_AreaCode: $("#Contact_AreaCode").val(),
                Contact_Person: $("#Contact_Person").val(),
                Contact_Number: $("#Contact_Number").val(),

                Customer_Fax: $("#Customer_Fax").val(),
                Customer_Email: $("#Customer_Email").val(),
                Complaint_Mode: $("#Complaint_Mode").val(),
                Product_Type: $("#Product_Type").val(),
                Product_Category: $("#Product_Category").val(),

                SubStockiest_Direct_Customer: $("#SubStockiest_Direct_Customer").val(),
                Is_Project_Party: $("#Is_Project_Party").is(':checked'),
                Site_Address: $("#Site_Address").val(),
                Complaint_Type: $("#Complaint_Type").val(),
                Complaint_Category: $("#Complaint_Category").val(),

                Complaint_Priority: $("#Complaint_Priority").val(),
                Complaint_Severity: $("#Complaint_Severity").val(),

                NatureOfComplaint: $("#NatureOfComplaint").val(),
                ObservationByHILOfficial: $("#ObservationByHILOfficial").val(),


                Product_Category_CODE: $("#Product_Category_CODE").val(),
                Sub_Product_Category_CODE: $("#Sub_Product_Category_CODE").val(),
                Sub_Product_Category: $("#Sub_Product_Category").val(),


                Complaint_Priority_CODE: $("#Complaint_Priority_CODE").val(),


                Complaint_Severity_CODE: $("#Complaint_Severity_CODE").val(),

                Complaint_Mode_ID: $("#Complaint_Mode_ID").val(),
                Complaint_Mode_CODE: $("#Complaint_Mode_CODE").val(),

                Complaint_Type_ID: $("#Complaint_Type_ID").val(),
                Complaint_Type_CODE: $("#Complaint_Type_CODE").val(),


                Complaint_Category_CODE: $("#Complaint_Category_CODE").val(),


                Product_Type_CODE: $("#Product_Type_CODE").val(),

                Customer_ID: $("#Customer_ID").val(),

                SITEDETAIL_CODE: $("#SITEDETAIL_CODE").val(),
                COMPANYDETAIL_CODE: $("#COMPANYDETAIL_CODE").val(),

                CREATED_BY: $("#UserCode").val(),

                ReceiptDetailsForSheeting: ReceiptDetailsForSheeting,
                MaterialSupplyDetail: MaterialSupplyDetail,
                SupplyDetails: SupplyDetails,
                //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                party_type: $("#party_type_id").val(),
                SubStockiest_Code: $("#SubStockiest_Code").val(),
                SubStockiest_ID: $("#SubStockiest_ID").val(),
                SubStockiest_Name: $("#SubStockiest_Name").val(),
                SubStockiest_Address: $("#SubStockiest_Address").val(),
                SubStockiest_Number: $("#SubStockiest_Number").val(),
                //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                //TYPE_OF_COMPLAINT: $("#TYPE_OF_COMPLAINT").val()
                TYPE_OF_COMPLAINT: $("#TYPE_OF_COMPLAINT").val()
                //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
            });

            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/SaveComplaint',
                async: false,
                data: { RegistrationData: RegistrationData },
            }).then(function successCallback(response) {
                //debugger
                var FormIdentity = $("#FormIdentity").val();
                if (response == "FALSE") {
                }
                if (response == "TRUE") {
                    //$(".Complaint_NumberDiv").css("display", "block");
                }
                else {
                    var RD = JSON.parse(response);
                    console.log("SaveComplaint : " + RD);
                    if (RD["Result"] == "TRUE") {

                        $("#SendRegistrationApproval").css('display', 'block');
                        $("#FormIdentity").val(RD["ID"]);
                        $("#Complaint_Code").val(RD["CC"]);
                        //$(".Complaint_NumberDiv").css("display", "block");
                        $("#Complaint_Number").val(RD["ID"]);
                        $("#Complaint_Number").val(RD["ID"]);
                    }
                }

                if ($("#Registration_Status").val() == "DRAFT") {
                    $("#SendRegistrationApproval").css('display', 'block');
                }
                else {
                    $("#SendRegistrationApproval").css('display', 'none');
                }
                if ($("#Registration_Status").val() != "Complaint Registered") {
                    $scope.Getcomplaint();
                    //$scope.go('Registration');
                }
                else {
                    $scope.Getcomplaint();
                    $("#CompRegSave").css('display', 'block');
                    $("#SendRegistrationApproval").css('display', 'none');
                    $("#MakeApproved").css('display', 'block');
                }

            },

                function errorCallback(response) {
                    alert("Error : " + response);
                });

        }

        catch (e) {
            alert("Error : SaveDataToServer : " + e);
        }
    }
    // @* //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.END*@
    $scope.RegisterComplaint = function () {

        try {
            debugger
            var FormIdentity = $("#FormIdentity").val();

            var RS = $("#Registration_Status").val();

            if ($scope.FormIdentity == "" || $scope.FormIdentity == undefined) {
                $scope.FormIdentity = "";
            }

            if ($scope.Is_Project_Party != true) {
                $scope.Is_Project_Party = false;
            }

            var Flag = 0;

            //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
            if ($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() == "Select" || $("#party_type").val() == "")) {
                Flag = Flag + 1;
                $("#party_type").css("border-color", "red");
            }
            else if ($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() != "Select" || $("#party_type").val() != "")) {
                $("#party_type").css("border-color", "#d2d6de");
            }
            if ($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() == "SubDealer" || $("#party_type_id").val() == 2 || $("#party_type").val() == "Sub-Stockiest")) {
                if ($("#SubStockiest_Code").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Code").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Code").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Name").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Name").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Name").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Address").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Address").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Address").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Number").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Number").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Number").css("border-color", "#d2d6de");
                }
            }
            //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
            //if ($("#Product_Type_CODE").val() == "SBU1" && $("#TYPE_OF_COMPLAINT").val() == "Select") {
            //    Flag = Flag + 1;
            //    $("#TYPE_OF_COMPLAINT").css("border-color", "red");
            //    return;
            //}
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
            //svprasadk 19-11-2020 SBU 1 requirement to party type other start
            if ($("#Product_Type_CODE").val() == "SBU1" && $("#party_type_id").val() == 7) {
                if ($("#SubStockiest_Name").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Name").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Name").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Address").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Address").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Address").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Number").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Number").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Number").css("border-color", "#d2d6de");
                }
            }
            //svprasadk 19-11-2020 SBU 1 requirement to party type other end
            if (Flag > 0) {
                return;
            }
            else {

                if ($scope.Customer_Type_CODE == undefined) {
                    $scope.Customer_Type_CODE = $("#Customer_Type_CODE").val();
                }

                if ($scope.complaintReceivedDate_CRT == undefined) { $scope.complaintReceivedDate_CRT = ""; }
                if ($scope.ComplaintRegistrationDate_CRT == undefined) { $scope.ComplaintRegistrationDate_CRT = ""; }
                if ($scope.Registrant_Type == undefined) { $scope.Registrant_Type = ""; }
                if ($scope.Registrant_Type_Code == undefined) { $scope.Registrant_Type_Code = ""; }
                //if ($scope.SalesRepresentativeEmployeeCode == undefined) { $scope.SalesRepresentativeEmployeeCode = ""; }
                //if ($scope.SalesRepresentativeEmployeeName == undefined) { $scope.SalesRepresentativeEmployeeName = ""; }
                //if ($scope.SalesRepresentativeEmployeeID == undefined) { $scope.SalesRepresentativeEmployeeID = ""; }
                if ($scope.Complaint_Desc == undefined) { $scope.Complaint_Desc = ""; }

                if ($scope.Remarks == undefined) { $scope.Remarks = ""; }
                if ($scope.FilesPath == undefined) { $scope.FilesPath = ""; }
                if ($scope.Complaint_Tracking_No == undefined) { $scope.Complaint_Tracking_No = ""; }
                if ($scope.CR_Series_Code == undefined) { $scope.CR_Series_Code = ""; }
                if ($scope.Registration_Status == undefined) { $scope.Registration_Status = ""; }
                //if ($scope.Complaint_Code == undefined) { $scope.Complaint_Code = ""; }

                if ($scope.Approved_Date == undefined) { $scope.Approved_Date = ""; }
                if ($scope.Customer_Code == undefined) { $scope.Customer_Code = ""; }
                if ($scope.Customer_Name == undefined) { $scope.Customer_Name = ""; }
                if ($scope.Customer_Type == undefined) { $scope.Customer_Type = ""; }
                if ($scope.Customer_Location == undefined) { $scope.Customer_Location = ""; }

                if ($scope.Contact_City == undefined) { $scope.Contact_City = ""; }
                if ($scope.Contact_State == undefined) { $scope.Contact_State = ""; }
                if ($scope.Contact_StateCode == undefined) { $scope.Contact_StateCode = ""; }
                if ($scope.Contact_Area == undefined) { $scope.Contact_Area = ""; }
                if ($scope.Contact_Person == undefined) { $scope.Contact_Person = ""; }
                if ($scope.Contact_Number == undefined) { $scope.Contact_Number = ""; }

                if ($scope.Customer_Fax == undefined) { $scope.Customer_Fax = ""; }
                if ($scope.Customer_Email == undefined) { $scope.Customer_Email = ""; }
                if ($scope.Complaint_Mode == undefined) { $scope.Complaint_Mode = ""; }
                if ($scope.SubStockiest_Direct_Customer == undefined) { $scope.SubStockiest_Direct_Customer = ""; }
                if ($scope.Is_Project_Party == undefined) { $scope.Is_Project_Party = ""; }
                if ($scope.Site_Address == undefined) { $scope.Site_Address = ""; }
                if ($scope.Complaint_Type == undefined) { $scope.Complaint_Type = ""; }
                if ($scope.Complaint_Category == undefined) { $scope.Complaint_Category = ""; }
                if ($scope.Complaint_Priority == undefined) { $scope.Complaint_Priority = ""; }
                if ($scope.Complaint_Severity == undefined) { $scope.Complaint_Severity = ""; }

                if ($scope.Complaint_Priority_CODE == undefined) { $scope.Complaint_Priority_CODE = ""; }
                if ($scope.Complaint_Severity_CODE == undefined) { $scope.Complaint_Severity_CODE = ""; }
                if ($scope.Complaint_Mode_CODE == undefined) { $scope.Complaint_Mode_CODE = ""; }
                if ($scope.Complaint_Type_CODE == undefined) { $scope.Complaint_Type_CODE = ""; }
                if ($scope.Complaint_Category_CODE == undefined) { $scope.Complaint_Category_CODE = ""; }



                if ($("#Product_Type_CODE").val() == "SBU3") {
                    $scope.Complaint_Type_CODE = "CTC1";
                    $scope.Complaint_Type = "Product Complaints";
                }

                if ($scope.Customer_Type_CODE == undefined) { $scope.Customer_Type_CODE = ""; }

                if ($scope.NatureOfComplaint == undefined) { $scope.NatureOfComplaint = ""; }
                if ($scope.ObservationByHILOfficial == undefined) { $scope.ObservationByHILOfficial = ""; }

                //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                if ($scope.party_type_id == undefined) { $scope.party_type_id = ""; }
                if ($scope.party_type == undefined) { $scope.party_type = ""; }
                if ($scope.SubStockiest_Code == undefined) { $scope.SubStockiest_Code = ""; }
                if ($scope.SubStockiest_ID == undefined) { $scope.SubStockiest_ID = ""; }
                if ($scope.SubStockiest_Name == undefined) { $scope.SubStockiest_Name = ""; }
                if ($scope.SubStockiest_Address == undefined) { $scope.SubStockiest_Address = ""; }
                if ($scope.SubStockiest_Number == undefined) { $scope.SubStockiest_Number = ""; }
                //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                if ($scope.TYPE_OF_COMPLAINT == undefined) { $scope.TYPE_OF_COMPLAINT = ""; }
                //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end

                var RowId = "";

                var MaterialSupplyDetail = new Array();
                $("#Material_Supply_Detail_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    MaterialSupplyDetail.push({
                        SlNo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[0].innerHTML,
                        MaterialBelongsTo: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[1].innerHTML,
                        ProductSuppliedFrom: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[2].innerHTML,
                        Name: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[3].innerHTML,


                        Material_Belongs_To_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[4].innerHTML,
                        Material_Belongs_To_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[5].innerHTML,
                        Product_Supplied_From_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[6].innerHTML,
                        Product_Supplied_From_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[7].innerHTML,
                        MSD_Name_ID: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[8].innerHTML,
                        MSD_Name_CODE: $("#Material_Supply_Detail_Table tbody #" + RowId + " td")[9].innerHTML

                    });
                });


                var ReceiptDetailsForSheeting = new Array();
                $("#Receipt_Details_Sheeting_Table tbody tr").each(function () {
                    RowId = ($(this).attr("id"));
                    ReceiptDetailsForSheeting.push({
                        SlNo: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[0].innerHTML,
                        ItemType: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[1].innerHTML,
                        Size: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[2].innerHTML,
                        InvoiceNo: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[3].innerHTML,
                        //InvoiceDate: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[4].innerHTML,
                        InvoiceDate: DateToWestern($("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[4].innerHTML),
                        BatchNo: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[5].innerHTML,
                        ReceivedQty: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[6].innerHTML,
                        BreakageQty: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[7].innerHTML,
                        TypeofDefect: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[8].innerHTML,
                        Remarks: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[9].innerHTML,

                        Defect_Type_ID: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[10].innerHTML,
                        Defect_Type_CODE: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[11].innerHTML,
                        Item_Type_Product_ID: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[12].innerHTML,
                        Item_Type_Product_CODE: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[13].innerHTML,

                        GrossWeight: $("#Receipt_Details_Sheeting_Table tbody #" + RowId + " td")[14].innerHTML
                    });
                });

                var BU = $("#Product_Type_CODE").val();
                console.log("BU :" + BU);
                var Productcode = $("#Product_Category_CODE").val();
                console.log("Productcode : " + Productcode);
                var SupplyDetails = new Array();
                if (BU == 'SBU3' && Productcode != '36') {
                    $("#SupplyDetails_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupplyDetails.push({
                            SlNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[0].innerHTML,
                            ProductDetails: $("#SupplyDetails_Table tbody #" + RowId + " td")[1].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.               
                            SD_PlantName: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                            InvoiceNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            //InvoiceDate: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            InvoiceDate: DateToWestern($("#SupplyDetails_Table tbody #" + RowId + " td")[4].innerHTML),
                            BatchNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[5].innerHTML,
                            SuppliedQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[6].innerHTML,
                            BreakageQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[7].innerHTML,
                            Transporter: $("#SupplyDetails_Table tbody #" + RowId + " td")[8].innerHTML,
                            Defect_Type: $("#SupplyDetails_Table tbody #" + RowId + " td")[9].innerHTML,
                            Remarks: $("#SupplyDetails_Table tbody #" + RowId + " td")[10].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.               
                            SD_BasicAmount: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                            SD_ProductDetails_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[12].innerHTML,
                            SD_ProductDetails_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[13].innerHTML,
                            SD_DefectType_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[14].innerHTML,
                            SD_DefectType_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[15].innerHTML,

                            SD_ProductSIZE: $("#SupplyDetails_Table tbody #" + RowId + " td")[16].innerHTML

                        });
                    });
                }
                else if (BU == 'SBU8') {
                    $("#SupplyDetails_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupplyDetails.push({
                            SlNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[0].innerHTML,
                            ProductDetails: $("#SupplyDetails_Table tbody #" + RowId + " td")[1].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.               
                            SD_Category_BU8: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                            InvoiceNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            //InvoiceDate: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            InvoiceDate: DateToWestern($("#SupplyDetails_Table tbody #" + RowId + " td")[4].innerHTML),
                            BatchNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[5].innerHTML,
                            SuppliedQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[6].innerHTML,
                            BreakageQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[7].innerHTML,
                            Transporter: $("#SupplyDetails_Table tbody #" + RowId + " td")[8].innerHTML,
                            Defect_Type: $("#SupplyDetails_Table tbody #" + RowId + " td")[9].innerHTML,
                            Defectprct: $("#SupplyDetails_Table tbody #" + RowId + " td")[10].innerHTML,
                            Remarks: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.               
                            SD_BasicAmount: $("#SupplyDetails_Table tbody #" + RowId + " td")[12].innerHTML,
                            SD_ProductDetails_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[13].innerHTML,
                            SD_ProductDetails_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[14].innerHTML,
                            SD_DefectType_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[15].innerHTML,
                            SD_DefectType_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[16].innerHTML,

                            SD_ProductSIZE: $("#SupplyDetails_Table tbody #" + RowId + " td")[17].innerHTML

                        });
                    });
                }
                else {
                    $("#SupplyDetails_Table tbody tr").each(function () {
                        RowId = ($(this).attr("id"));
                        SupplyDetails.push({
                            SlNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[0].innerHTML,
                            ProductDetails: $("#SupplyDetails_Table tbody #" + RowId + " td")[1].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.               
                            //SD_PlantName: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                            InvoiceNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[2].innerHTML,
                            //InvoiceDate: $("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML,
                            InvoiceDate: DateToWestern($("#SupplyDetails_Table tbody #" + RowId + " td")[3].innerHTML),
                            BatchNo: $("#SupplyDetails_Table tbody #" + RowId + " td")[4].innerHTML,
                            SuppliedQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[5].innerHTML,
                            BreakageQtyNos: $("#SupplyDetails_Table tbody #" + RowId + " td")[6].innerHTML,
                            Transporter: $("#SupplyDetails_Table tbody #" + RowId + " td")[7].innerHTML,
                            Defect_Type: $("#SupplyDetails_Table tbody #" + RowId + " td")[8].innerHTML,
                            Remarks: $("#SupplyDetails_Table tbody #" + RowId + " td")[9].innerHTML,
                            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.               
                            //SD_BasicAmount: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                            SD_ProductDetails_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[10].innerHTML,
                            SD_ProductDetails_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[11].innerHTML,
                            SD_DefectType_ID: $("#SupplyDetails_Table tbody #" + RowId + " td")[12].innerHTML,
                            SD_DefectType_CODE: $("#SupplyDetails_Table tbody #" + RowId + " td")[13].innerHTML,

                            SD_ProductSIZE: $("#SupplyDetails_Table tbody #" + RowId + " td")[14].innerHTML

                        });
                    });
                }




                var Is_Project_PartyVal = $("#Is_Project_Party").is(':checked');

                $("#Project_Party_Check").val("");

                $scope.complaintReceivedDate_CRT = DateToWestern($scope.complaintReceivedDate_CRT);
                $scope.ComplaintRegistrationDate_CRT = DateToWestern($scope.ComplaintRegistrationDate_CRT);
                $scope.Approved_Date = DateToWestern($scope.Approved_Date);

                var SITEDETAIL_CODE = $("#SITEDETAIL_CODE").val();
                var COMPANYDETAIL_CODE = $("#COMPANYDETAIL_CODE").val();

                if ($("#Contact_StateCode").val() == "") {
                    $("#Contact_StateCode").val($("#StateFilter").val());
                }
                else {

                }

                //svprasadk 17-10-2020 SBU 1 requirement to remove type of complaint start
                $("#TYPE_OF_COMPLAINT").val(0);
                //svprasadk 17-10-2020 SBU 1 requirement to remove type of complaint start
                var RegistrationData = JSON.stringify({
                    FormIdentity: $("#FormIdentity").val(),
                    complaintReceivedDate_CRT: $("#complaintReceivedDate_CRT").val(),
                    ComplaintRegistrationDate_CRT: $("#ComplaintRegistrationDate_CRT").val(),
                    Registrant_Type: $("#Registrant_Type").val(),
                    Registrant_Type_Code: $("#Registrant_Type_Code").val(),
                    SalesRepresentativeEmployeeCode: $("#SalesRepresentativeEmployeeCode").val(),
                    SalesRepresentativeEmployeeName: $("#SalesRepresentativeEmployeeName").val(),
                    Complaint_Desc: $("#Complaint_Desc").val(),

                    Remarks: $("#Remarks").val(),
                    FilesPath: $("#SelectedFiles").text(),
                    Complaint_Tracking_No: $("#Complaint_Tracking_No").val(),
                    CR_Series_Code: $("#CR_Series_Code").val(),
                    Registration_Status: $("#Registration_Status").val(),
                    Complaint_Code: $("#Complaint_Code").val(),

                    Approved_Date: $("#Approved_Date").val(),
                    Customer_Code: $("#Customer_Code").val(),
                    Customer_Name: $("#Customer_Name").val(),

                    Customer_Type: $("#Customer_Type").val(),
                    Customer_Type_CODE: $("#Customer_Type_CODE").val(),

                    Customer_Location: $("#Customer_Location").val(),
                    Customer_LocationCode: $("#Customer_LocationCode").val(),


                    Contact_City: $("#Contact_City").val(),
                    CityCode: $("#CityCode").val(),

                    Contact_State: $("#Contact_State").val(),
                    Contact_StateCode: $("#Contact_StateCode").val(),

                    Contact_Area: $("#Contact_Area").val(),
                    Contact_AreaCode: $("#Contact_AreaCode").val(),
                    Contact_Person: $("#Contact_Person").val(),
                    Contact_Number: $("#Contact_Number").val(),

                    Customer_Fax: $("#Customer_Fax").val(),
                    Customer_Email: $("#Customer_Email").val(),
                    Complaint_Mode: $("#Complaint_Mode").val(),
                    Product_Type: $("#Product_Type").val(),
                    Product_Category: $("#Product_Category_CODE").val(),
                    Sub_Product_Category: $("#Sub_Product_Category").val(),

                    SubStockiest_Direct_Customer: $("#SubStockiest_Direct_Customer").val(),
                    Is_Project_Party: Is_Project_PartyVal,
                    Site_Address: $("#Site_Address").val(),
                    Complaint_Type: $("#Complaint_Type").val(),
                    Complaint_Category: $("#Complaint_Category").val(),

                    Complaint_Priority: $("#Complaint_Priority").val(),
                    Complaint_Severity: $("#Complaint_Severity").val(),

                    NatureOfComplaint: $("#NatureOfComplaint").val(),
                    ObservationByHILOfficial: $("#ObservationByHILOfficial").val(),
                    Product_Category_CODE: $("#Product_Category_CODE").val(),
                    Sub_Product_Category_CODE: $("#Sub_Product_Category_CODE").val(),
                    Sub_Product_Category: $("#Sub_Product_Category").val(),
                    Complaint_Priority_CODE: $("#Complaint_Priority_CODE").val(),
                    Complaint_Severity_CODE: $("#Complaint_Severity_CODE").val(),

                    Complaint_Mode_ID: $("#Complaint_Mode_ID").val(),
                    Complaint_Mode_CODE: $("#Complaint_Mode_CODE").val(),

                    Complaint_Type_ID: $("#Complaint_Type_ID").val(),
                    Complaint_Type_CODE: $("#Complaint_Type_CODE").val(),


                    Complaint_Category_CODE: $("#Complaint_Category_CODE").val(),

                    Product_Type_CODE: $("#Product_Type_CODE").val(),

                    Customer_ID: $("#Customer_ID").val(),

                    SITEDETAIL_CODE: $("#SITEDETAIL_CODE").val(),
                    COMPANYDETAIL_CODE: $("#COMPANYDETAIL_CODE").val(),

                    CREATED_BY: $("#UserCode").val(),

                    ReceiptDetailsForSheeting: ReceiptDetailsForSheeting,
                    MaterialSupplyDetail: MaterialSupplyDetail,
                    SupplyDetails: SupplyDetails,
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
                    party_type: $("#party_type_id").val(),
                    SubStockiest_Code: $("#SubStockiest_Code").val(),
                    SubStockiest_ID: $("#SubStockiest_ID").val(),
                    SubStockiest_Name: $("#SubStockiest_Name").val(),
                    SubStockiest_Address: $("#SubStockiest_Address").val(),
                    SubStockiest_Number: $("#SubStockiest_Number").val(),
                    //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
                    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
                    TYPE_OF_COMPLAINT: $("#TYPE_OF_COMPLAINT").val()
                    //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
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
                    url: '../../ComplaintRegistration/SaveComplaint',
                    async: false,
                    data: { RegistrationData: RegistrationData },
                }).then(function successCallback(response) {
                    //debugger
                    console.log(response);
                    if (response.data == "FALSE") {
                        alert("Error Occured try later");
                        return;
                    }
                    if (response.data == "TRUE") {

                        if (MyTest == "") {

                            alert("Successfully Saved the data");
                        }
                        else {

                            return "true";
                        }
                    }
                    else {
                        var RD = JSON.parse(response.data);
                        if (RD["Result"] == "TRUE") {

                            $("#FormIdentity").val(RD["ID"]);
                            $("#Complaint_Code").val(RD["CC"]);
                            //$(".Complaint_NumberDiv").css("display", "block");
                            $("#Complaint_Number").val(RD["ID"]);
                        }
                        if (MyTest == "") {

                            alert("Successfully Saved the data");
                        }
                        else {

                            return "true";
                        }
                    }
                    if ($("#Registration_Status").val() == "DRAFT") {
                        $("#SendRegistrationApproval").css('display', 'block');
                    }
                    else {
                        $("#SendRegistrationApproval").css('display', 'none');
                    }
                    $("#MyTest").val("");

                    //go('../../ComplaintRegistration/GetComplaint');
                    //$.ajax('../../ComplaintRegistration/GetComplaint');

                }, function errorCallback(response) {
                    alert("Error : " + response);
                });
            }
        }
        catch (e) {
            alert("Error :RegisterComplaint : " + e);
        }
    }
    $scope.SendRegistrationForApproval = function () {
        try {
            debugger
            if (SendForReviewDoubleClick == "") {

            }
            else {
                //alert("Don't Double Click");
                //return;
            }

            SendForReviewDoubleClick = "ASD";

            if (confirm("Do you want to Send for review?")) {
            }
            else {
                SendForReviewDoubleClick = "";
                return;
            }

            ShowLoader();

            $("#MyTest").val("ASD");
            $scope.RegisterComplaint();

            var FormIdentity = $("#FormIdentity").val();

            var Doc_Status = $("#Registration_Status").val();
            if (Doc_Status == "DRAFT") {
            }
            else {
                alert("Document Status is " + Doc_Status + "");
                $("#MyTest").val("");
                return;
                SendForReviewDoubleClick = "";
                HideLoader();

            }



            if ($scope.FormIdentity == "" || $scope.FormIdentity == undefined) {
                $scope.FormIdentity = "";
            }

            if ($scope.Is_Project_Party != true) {
                $scope.Is_Project_Party = false;
            }

            var Flag = 0;


            if ($scope.complaintReceivedDate_CRT == "" || $scope.complaintReceivedDate_CRT == undefined) {
                Flag = Flag + 1;
                $("#complaintReceivedDate_CRT").css("border-color", "red");
            }
            else {
                $("#complaintReceivedDate_CRT").css("border-color", "#d2d6de");
            }

            if ($scope.Registrant_Type == "" || $scope.Registrant_Type == undefined) {
                Flag = Flag + 1;
                $("#Registrant_Type").css("border-color", "red");
            }
            else {
                $("#Registrant_Type").css("border-color", "#d2d6de");
            }


            if ($scope.CR_Series_Code == "" || $scope.CR_Series_Code == undefined) {
                Flag = Flag + 1;
                $("#CR_Series_Code").css("border-color", "red");
            }
            else {
                $("#CR_Series_Code").css("border-color", "#d2d6de");
            }

            if ($scope.Customer_Code == "" || $scope.Customer_Code == undefined) {
                Flag = Flag + 1;
                $("#Customer_Code").css("border-color", "red");
            }
            else {
                $("#Customer_Code").css("border-color", "#d2d6de");
            }


            if ($scope.Customer_Name == "" || $scope.Customer_Name == undefined) {
                Flag = Flag + 1;
                $("#Customer_Name").css("border-color", "red");
            }
            else {
                $("#Customer_Name").css("border-color", "#d2d6de");
            }

            if ($scope.Contact_State == "" || $scope.Contact_State == undefined) {
                Flag = Flag + 1;
                $("#Contact_State").css("border-color", "red");
            }
            else {
                $("#Contact_State").css("border-color", "#d2d6de");
            }


            if ($scope.Contact_Area == "" || $scope.Contact_Area == undefined) {
                Flag = Flag + 1;
                $("#Contact_Area").css("border-color", "red");
            }
            else {
                $("#Contact_Area").css("border-color", "#d2d6de");
            }

            if ($("#Product_Type").val() == "" || $("#Product_Type").val() == undefined) {
                Flag = Flag + 1;
                $("#Product_Type").css("border-color", "red");
            }
            else {
                $("#Product_Type").css("border-color", "#d2d6de");
            }

            if ($("#Product_Category").val() == "" || $("#Product_Category").val() == undefined) {
                Flag = Flag + 1;
                $("#Product_Category").css("border-color", "red");
            }
            else {
                $("#Product_Category").css("border-color", "#d2d6de");
            }


            if ($("#SalesRepresentativeEmployeeCode").val() == "" || $("#SalesRepresentativeEmployeeCode").val() == undefined) {
                Flag = Flag + 1;
                $("#SalesRepresentativeEmployeeCode").css("border-color", "red");
            }
            else {
                $("#SalesRepresentativeEmployeeCode").css("border-color", "#d2d6de");
            }


            if ($("#SalesRepresentativeEmployeeName").val() == "" || $("#SalesRepresentativeEmployeeName").val() == undefined) {
                Flag = Flag + 1;
                $("#SalesRepresentativeEmployeeName").css("border-color", "red");
            }
            else {
                $("#SalesRepresentativeEmployeeName").css("border-color", "#d2d6de");
            }


            if ($("#Product_Type").val() == "SBU1") {

                if (($("#Receipt_Details_Sheeting_Table tbody tr").length) == 0) {
                    Flag = Flag + 1;
                    alert("Receipt Details For Sheeting is Mandatory");
                }
                else {
                }

            }

            if ($("#Product_Type").val() == "SBU2") {
                if ($scope.Complaint_Type == "" || $scope.Complaint_Type == undefined) {
                    Flag = Flag + 1;
                    $("#Complaint_Type").css("border-color", "red");
                }
                else {
                    $("#Complaint_Type").css("border-color", "#d2d6de");
                }
                if (($("#Material_Supply_Detail_Table tbody tr").length) == 0) {
                    Flag = Flag + 1;
                    alert("Material Supply Details are Mandatory");
                }
                else {
                }
                if (($("#SupplyDetails_Table tbody tr").length) == 0) {
                    Flag = Flag + 1;
                    alert("Supply Details are Mandatory");
                }
                else {
                }
            }

            if ($("#Product_Type").val() == "SBU3") {
                if ($("#SelectedFiles").text() != "") {
                    $("#ClickUploadFile").val(1);
                    $("#ClickSaveComplaint").val(1);
                }
                //console.log('InvestigationFilesUploaded', $("ul#InvestigationFilesUploaded li").length)
                var file = document.getElementById('ComplaintFile').files.length;
                if (file == 0 && ($("ul#ComplaintFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
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
                if ($scope.Complaint_Type == "" || $scope.Complaint_Type == undefined) {
                    Flag = Flag + 1;
                    $("#Complaint_Type").css("border-color", "red");
                }
                else {
                    $("#Complaint_Type").css("border-color", "#d2d6de");
                }


                if ($("#Complaint_Category").val() == "") {
                    Flag = Flag + 1;
                    $("#Complaint_Category").css("border-color", "red");
                }
                else {
                    $("#Complaint_Category").css("border-color", "#d2d6de");
                }

                if (($("#SupplyDetails_Table tbody tr").length) == 0) {
                    Flag = Flag + 1;
                    alert("Supply Details are Mandatory");
                }
                else {
                }
            }

            else if ($("#Product_Type_CODE").val() == "SBU8") {
                if ($("#SelectedFiles").text() != "") {
                    $("#ClickUploadFile").val(1);
                    $("#ClickSaveComplaint").val(1);
                }
                //console.log('InvestigationFilesUploaded', $("ul#InvestigationFilesUploaded li").length)
                var file = document.getElementById('ComplaintFile').files.length;
                if (file == 0 && ($("ul#ComplaintFilesUploaded li").length <= 0 || $("#SelectedFiles").text() == "") && $("#ClickUploadFile").val() == 0) {
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
                if ($scope.Complaint_Type == "" || $scope.Complaint_Type == undefined) {
                    Flag = Flag + 1;
                    $("#Complaint_Type").css("border-color", "red");
                }
                else {
                    $("#Complaint_Type").css("border-color", "#d2d6de");
                }


                if ($("#Complaint_Category").val() == "") {
                    Flag = Flag + 1;
                    $("#Complaint_Category").css("border-color", "red");
                }
                else {
                    $("#Complaint_Category").css("border-color", "#d2d6de");
                }

                if (($("#SupplyDetails_Table tbody tr").length) == 0) {
                    Flag = Flag + 1;
                    alert("Supply Details are Mandatory");
                }
                else {
                }
            }

            //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
            if (($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() == "Select" || $("#party_type").val() == "")) || ($("#Product_Type_CODE").val() == "SBU8" && ($("#party_type").val() == "Select" || $("#party_type").val() == ""))) {
                Flag = Flag + 1;
                $("#party_type").css("border-color", "red");
            }
            else if (($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() != "Select" || $("#party_type").val() != "")) || ($("#Product_Type_CODE").val() == "SBU8" && ($("#party_type").val() != "Select" || $("#party_type").val() != ""))) {
                $("#party_type").css("border-color", "#d2d6de");
            }
            if (($("#Product_Type_CODE").val() == "SBU1" && ($("#party_type").val() == "SubDealer" || $("#party_type_id").val() == 2 || $("#party_type").val() == "Sub-Stockiest")) || ($("#Product_Type_CODE").val() == "SBU8" && ($("#party_type").val() == "SubDealer" || $("#party_type_id").val() == 2 || $("#party_type").val() == "Sub-Stockiest"))) {
                if ($("#SubStockiest_Code").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Code").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Code").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Name").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Name").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Name").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Address").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Address").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Address").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Number").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Number").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Number").css("border-color", "#d2d6de");
                }
            }
            //svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end
            //svprasadk 19-11-2020 SBU 1 requirement to party type other start
            if (($("#Product_Type_CODE").val() == "SBU1" && $("#party_type_id").val() == 7) || ($("#Product_Type_CODE").val() == "SBU8" && $("#party_type_id").val() == 7)) {
                if ($("#SubStockiest_Name").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Name").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Name").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Address").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Address").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Address").css("border-color", "#d2d6de");
                }

                if ($("#SubStockiest_Number").val() == "") {
                    Flag = Flag + 1;
                    $("#SubStockiest_Number").css("border-color", "red");
                }
                else {
                    $("#SubStockiest_Number").css("border-color", "#d2d6de");
                }
            }
            //svprasadk 19-11-2020 SBU 1 requirement to party type other end

            var FormIdentity = $("#FormIdentity").val();

            if (Flag > 0) {
                alert("Fill All Mandatory fields before sending for Approval");
                $("#MyTest").val("");
                SendForReviewDoubleClick = "";
                HideLoader();

                return;
            }
            else if (FormIdentity == "") {
                alert("Save the form before Sending for Approval");
                SendForReviewDoubleClick = "";
                HideLoader();

            }
            else {
                var Complaint_Category = $("#Complaint_Category").val();
                var ApprovalData = JSON.stringify({
                    FormIdentity: FormIdentity,
                    CreatedBy: $("#UserCode").val(),
                    FormName: "Registration",
                    Complaint_Category: $("#Complaint_Category").val(),
                });

                $http({
                    method: 'POST',
                    url: '../../ComplaintRegistration/SendForApproval',
                    async: false,
                    data: { ApprovalData: ApprovalData },
                }).then(function successCallback(response) {
                    SendForReviewDoubleClick = "";
                    HideLoader();
                    debugger
                    if (response.data == "FALSE") {
                        alert("Error Occured try later");
                    }
                    else if (response.data == "TRUE") {
                        $("#Registration_Status").val("Waiting for Approval");
                        $("#Complaint_Tracking_No").val(FormIdentity);

                        alert("Complaint has been successfully sent for review, Your Complaint Tracking # " + FormIdentity + " .");

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


                        var UserTypeCode = $("#UserType_ID").val();
                        var ProdType = $("#Product_Type_CODE").val();
                        $scope.Registration_Status = "Waiting for Approval";
                        //alert("UserTypeCode : " + UserTypeCode + "\tProdType" + ProdType);

                        //if (UserTypeCode == "CSO" && ProdType == "SBU1") {
                        //    $scope.MakeApproved('Approved');
                        //}
                        //svprasadk 16-06-2020 SBU 1 requirement Merging of approval & assign start
                        if (ProdType == "SBU1") {
                            $scope.MakeApproved('Approved');
                        }
                        //svprasadk 16-06-2020 SBU 1 requirement Merging of approval & assign end
                        else if (UserTypeCode == "CQT" && ProdType == "SBU2") {
                            $scope.MakeApproved('Approved');
                        }
                            //VIKAS G, 04-06-2023 AUTO APPROVAL FOR QUALITY COMPLAINT START
                        //else if (ProdType == "SBU8" && Complaint_Category == "Quality") {
                        //    $scope.MakeApproved('Approved');
                        //}
                            //VIKAS G, 04-06-2023 AUTO APPROVAL FOR QUALITY COMPLAINT END
                        else {
                            HideLoader();
                            $scope.go('RegistrationList');
                        }

                    }
                }, function errorCallback(response) {
                    alert("Error : " + response);
                    SendForReviewDoubleClick = "";
                    HideLoader();
                });
            }
        }
        catch (e) {
            alert("Error :SendRegistrationForApproval : " + e);
        }
    }
    $scope.GetApprovalPopUp = function () {
        try {
            debugger
            //VIKAS G, 23-3-2022
            var BU = $("#Product_Type_CODE").val();
            console.log("BU :" + BU);
            var Productcode = $("#Product_Category_CODE").val();
            console.log("Productcode : " + Productcode);
            if (BU == "SBU3" && Productcode != "36") {
                $("#SendBackRCData").show();
            }
            else {
                $("#SendBackRCData").hide();
            }
            $("#Approvals_Remarks").val("");
            $("#ApprovalsActionForm").modal('show');
        }
        catch (e) {
            alert("Error : " + e);
        }
    }
    $scope.MakeApproved = function (Decision) {
        try {
debugger
            var UserTypeCode = $("#UserType_ID").val();
            var ProdType = $("#Product_Type_CODE").val();
            var Complaint_Category = $("#Complaint_Category").val();

            if (UserTypeCode == "CSO" && ProdType == "SBU1") {
            }
            else if (UserTypeCode == "CQT" && ProdType == "SBU2") {
            }
            //else if (UserTypeCode == "CSM_BU8" && Complaint_Category == "Quality") {
            //}
            else if ($scope.Registration_Status == "DRAFT") {
                alert("Send for approval");
                return;
            }
            else if ($scope.Registration_Status == "Approved") {
                alert("This record already got approved");
                return;
            }
            else if ($scope.Registration_Status == "Rejected") {
                alert("This record already got Rejected");
                return;
            }

            var Approvals_Remarks = "";

            console.log("Approvals_Remarks : " + Approvals_Remarks);

            if (UserTypeCode == "CSO" || UserTypeCode == "CQT" ) {
            }
            else {
                Approvals_Remarks = $("#Approvals_Remarks").val();
            }

            if (Decision == "Rejected") {
                if (Approvals_Remarks == "") {
                    alert("Provide Reason for Rejection");
                    return;
                }
            }
            else {
                Approvals_Remarks = "";
            }


            if (UserTypeCode == "CSO" || UserTypeCode == "CQT") {
            }
            else {
                $("#ApprovalsActionForm").modal('hide');
            }

            $("#MyTest").val("ASD");
            $scope.RegisterComplaint();

            var ApprovalData = JSON.stringify({
                CM_Id: $("#Complaint_Number").val(),
                ModifiedBy: $("#UserCode").val(),
                FormName: "Registration",
                Decision: Decision,
                Approvals_Remarks: Approvals_Remarks,
                Complaint_Category: $("#Complaint_Category").val(),
            });

            $http({
                method: 'POST',
                url: '../../ComplaintRegistration/MakeApproval',
                async: false,
                data: { ApprovalData: ApprovalData },
            }).then(function successCallback(response) {
                if (response.data == "FALSE") {
                    alert("Error Occured try later");
                }
                else if (response.data == "TRUE") {
                    $("#Registration_Status").val(Decision);
                    alert("Successfully " + Decision);

                    $("#CompRegSave").css('display', 'none');
                    $("#SendRegistrationApproval").css('display', 'none');
                    $("#MakeApproved").css('display', 'none');

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

                    var BusinessUnit = $("#Product_Type_CODE").val();

                    //alert(UserTypeCode + "\t" + BusinessUnit);

                    if ((UserTypeCode == "CSO" && BusinessUnit == "SBU1") || (UserTypeCode == "CQT" && BusinessUnit == "SBU2") ) {
                        alert("This Complaint will be Automatically Assigned to You");

                        try {


                            var AssignData = JSON.stringify({
                                TrackingNo: $("#Complaint_Number").val(),
                                RoleCode: $("#UserType").val(),
                                RoleName: $("#UserType_ID").val(),
                                UserCode: $("#UserCode").val(),
                                UserName: $("#UserName").val()
                            });

                            $.ajax({
                                type: 'POST',
                                url: '../../ComplaintRegistration/AutoAssignComplaint',
                                async: false,
                                data: { AssignData: AssignData },
                                success: function (Resp) {
                                    if (Resp != "") {
                                        $("#Registration_Status").val("Complaint Assigned");
                                        alert("Complaint Successfully Assigned to You");
                                    }
                                    $scope.go('RegistrationList');
                                },
                                error: function (xhr, two, err) {
                                    alert("Error Occured.\n Please take a screenshot of the next two alerts and mail the screen shot to CSM");
                                    alert("XHR : " + xhr + "\n Two : " + two + "\n Error : " + err);
                                    alert(JSON.stringify(xhr) + "\n" + JSON.stringify(two) + "\n" + JSON.stringify(err));


                                    //GetMeTheComplaintInInvestigation();
                                }
                            });

                        }
                        catch (e) {
                            alert("Error : " + e);

                            GetMeTheComplaintInInvestigation();

                        }

                    }
                    else {
                        $scope.go('ComplaintPendingApproval');
                    }

                }
                //go('ComplaintPendingApproval');
            }, function errorCallback(response) {
                alert("Error : " + response);
            });


        }
        catch (e) {
            alert("Error :MakeApprovedReg : " + e);
        }
    }
    $scope.StateChange = function () {
        try {
            var StateFilter = $("#StateFilter").val();
            $("#CMSState").val(StateFilter);
        }
        catch (e) {
            alert("Error :StateChange : " + e);
        }
    }
});
//Sales Master PopUp
function GetSalesRep(obj) {
    RegistrationScope.$apply(function () {

        $("#SalesRepresentativeEmployeeID").val($(obj).children().eq(0).html());

        //RegistrationScope.SalesRepresentativeEmployeeCode = $(obj).children().eq(1).html();
        //RegistrationScope.SalesRepresentativeEmployeeName = $(obj).children().eq(2).html();

        $("#SalesRepresentativeEmployeeCode").val($(obj).children().eq(1).html());
        $("#SalesRepresentativeEmployeeName").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//CR Series code pop up
function GetCRSeriesCode(obj) {
    RegistrationScope.$apply(function () {
        RegistrationScope.CR_Series_Code = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Customer pop up
function GetCustomer(obj) {
    var StateFilter = $("#StateFilter").val();
    var Product_Type = $("#Product_Type_CODE").val();
    var Customer_Code = $(obj).children().eq(1).html();

    if (Product_Type == "") {
        alert("Select Business Unit");
        return;
    }

    if (Customer_Code == "") {
        alert("Select customer");
        return;
    }

    if (Product_Type == "SBU1") {
        Product_Type = "1000";
    }
    else if (Product_Type == "SBU2") {
        Product_Type = "2000";
    }
    else if (Product_Type == "SBU3") {
        Product_Type = "3000";
    }
    //VIKAS G , 2023-02-16 START
    else if (Product_Type == "SBU8") {
        Product_Type = "8000";
    }
    //VIKAS G , 2023-02-16 END
    if (Product_Type == "8000") {
        var Division = "16,82,83";
        Data = JSON.stringify({
            MasterType: "StockistDetails",
            Product_Type: Product_Type,
            StateFilter: StateFilter,
            STOCKIST_ID: Customer_Code,
            Division: Division            
        });
    }
    else {
        Data = JSON.stringify({
            MasterType: "StockistDetails",
            Product_Type: Product_Type,
            StateFilter: StateFilter,
            STOCKIST_ID: Customer_Code
        });
    }
    

    $.ajax({
        type: 'POST',
        url: '../../Home/getMasterData',
        async: false,
        data: { MasterType: Data },
        success: function (response) {
            debugger
            if (response.tabledata == "[]" || response.tabledata == "") {
                alert("No Data Available");
                return;
            }
            data = JSON.parse(response.tabledata);
            console.log('data', data, data[0]["ID"], data[0].ID);
            RegistrationScope.$apply(function () {
                //svprasadk 23-06-2020 SBU 1 requirement to sequesnce the order of stockiest master start
                RegistrationScope.Customer_ID = data[0]["ID"];
                RegistrationScope.Customer_Code = data[0]["CUSTOMER_CODE"];
                RegistrationScope.Customer_Name = data[0]["CUSTOMER_NAME"];
                RegistrationScope.Contact_City = data[0]["CITY"];
                RegistrationScope.Contact_Area = data[0]["AREA_NAME"];
                RegistrationScope.Contact_Number = data[0]["PHONE"];
                RegistrationScope.Contact_State = data[0]["STATE_NAME"];
                RegistrationScope.Customer_Type_CODE = data[0]["CUSTOMER_TYPE_CODE"];
                RegistrationScope.Customer_Type = data[0]["CUSTOMER_TYPE_NAME"];
                RegistrationScope.Contact_StateCode = data[0]["STATE_CODE"];
                RegistrationScope.Contact_AreaCode = data[0]["AREA_CODE"];
                RegistrationScope.Customer_Email = data[0]["EMAIL"];
                RegistrationScope.Contact_Person = data[0]["CONTACT_PERSON_NAME"];
                RegistrationScope.Customer_Fax = data[0]["FAX"];
                //svprasadk 23-06-2020 SBU 1 requirement to sequesnce the order of stockiest master end        
            })
            var element = angular.element('#LookUpModal');
            element.modal('hide');
            if ($("#party_type").val() == "Select" || $("#party_type").val() == 0 || $("#party_type").val() == "") {
                alert("Please Select Party Type");
            }
        },
        error: function (xhr, two, err) {
            alert("Error Occured.\n Please take a screenshot of the next two alerts and mail the screen shot to CSM");
            alert("XHR : " + xhr + "\n Two : " + two + "\n Error : " + err);
            alert(JSON.stringify(xhr) + "\n" + JSON.stringify(two) + "\n" + JSON.stringify(err));
        }
    });

    //DIMSFactory.getMasterData(Data).success(function (response) {
    //    if (response.tabledata == "[]" || response.tabledata == "") {
    //        alert("No Data Available");
    //        return;
    //    }
    //    data = JSON.parse(response.tabledata);
    //    console.log('data', data);
    //});
    //RegistrationScope.$apply(function () {
    //    //svprasadk 23-06-2020 SBU 1 requirement to sequesnce the order of stockiest master start
    //    RegistrationScope.Customer_ID = $(obj).children().eq(0).html();
    //    RegistrationScope.Customer_Code = $(obj).children().eq(1).html();
    //    RegistrationScope.Customer_Name = ($(obj).children().eq(2).html()).replace("&amp;", "&");
    //    RegistrationScope.Contact_City = $(obj).children().eq(3).html();
    //    RegistrationScope.Contact_Area = $(obj).children().eq(4).html();
    //    RegistrationScope.Contact_Number = $(obj).children().eq(5).html();
    //    RegistrationScope.Contact_State = $(obj).children().eq(6).html();
    //    RegistrationScope.Customer_Type_CODE = $(obj).children().eq(7).html();
    //    RegistrationScope.Customer_Type = $(obj).children().eq(8).html();
    //    RegistrationScope.Contact_StateCode = $(obj).children().eq(9).html();
    //    RegistrationScope.Contact_AreaCode = $(obj).children().eq(10).html();
    //    RegistrationScope.Customer_Email = $(obj).children().eq(11).html();
    //    RegistrationScope.Contact_Person = ($(obj).children().eq(12).html()).replace("&amp;", "&");
    //    RegistrationScope.Contact_Person = "";
    //    RegistrationScope.Customer_Fax = $(obj).children().eq(13).html();
    //    RegistrationScope.Customer_Fax = "";
    //    //svprasadk 23-06-2020 SBU 1 requirement to sequesnce the order of stockiest master end        
    //})
    //var element = angular.element('#LookUpModal');
    //element.modal('hide');
    //if ($("#party_type").val() == "Select" || $("#party_type").val() == 0 || $("#party_type").val() == "") {
    //    alert("Please Select Party Type");
    //}
}
//City pop up
function GetCity(obj) {
    RegistrationScope.$apply(function () {

        RegistrationScope.CityCode = $(obj).children().eq(1).html();
        RegistrationScope.Contact_City = $(obj).children().eq(2).html();

        RegistrationScope.Contact_StateCode = $(obj).children().eq(3).html();
        RegistrationScope.Contact_State = $(obj).children().eq(4).html();

        RegistrationScope.Contact_AreaCode = $(obj).children().eq(5).html();
        RegistrationScope.Contact_Area = $(obj).children().eq(6).html();

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//State pop up
function GetState(obj) {
    RegistrationScope.$apply(function () {
        RegistrationScope.Contact_StateCode = $(obj).children().eq(1).html();
        RegistrationScope.Contact_State = $(obj).children().eq(2).html();
        RegistrationScope.Contact_AreaCode = $(obj).children().eq(3).html();
        RegistrationScope.Contact_Area = $(obj).children().eq(4).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Area pop up
function GetArea(obj) {
    RegistrationScope.$apply(function () {
        RegistrationScope.Contact_AreaCode = $(obj).children().eq(1).html();
        RegistrationScope.Contact_Area = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint Mode Pop up
function GetComplaint_Mode(obj) {
    RegistrationScope.$apply(function () {
        //RegistrationScope.Complaint_Mode_ID = $(obj).children().eq(0).html();
        RegistrationScope.Complaint_Mode_CODE = $(obj).children().eq(1).html();
        RegistrationScope.Complaint_Mode = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product Type master pop up
function GetProd_Typ_Mast(obj) {
    debugger
    RegistrationScope.$apply(function () {

        $("#SalesRepresentativeEmployeeCode").val("");
        $("#SalesRepresentativeEmployeeName").val("");

        if ($("#UserCode").val() == "KAM") {
            if ($(obj).children().eq(1).html() == "SBU1" || $(obj).children().eq(1).html() == "SBU3") {
                alert("KAM has no access to this Business Unit");
                $("#Product_Type_CODE").val("");
                $("#Product_Type").val("");
                $("#Product_Category").val("");
                $("#Product_Category_CODE").val("");

                //ProductTypeChanges($(obj).children().eq(1).html());
            }
            else if ($(obj).children().eq(1).html() == "SBU2") {
                $("#Product_Type_CODE").val($(obj).children().eq(1).html());
                $("#Product_Type").val($(obj).children().eq(2).html());
                $("#Product_Category").val("");
                $("#Product_Category_CODE").val("");
                ProductTypeChanges($(obj).children().eq(1).html());
            }
        }
        else {
            $("#Product_Type_CODE").val($(obj).children().eq(1).html());
            $("#Product_Type").val($(obj).children().eq(2).html());
            $("#Product_Category").val("");
            $("#Product_Category_CODE").val("");
            ProductTypeChanges($(obj).children().eq(1).html());
        }

        var UserType_ID = $("#UserType_ID").val();

        if (UserType_ID == "FSO" || UserType_ID == "FSO_BU2" || UserType_ID == "FSO_BU3" || UserType_ID == "FSO_BU8") {
            var UserCode = $("#UserCode").val();

            if (UserCode == "KAM") {
                $("#SalesRepresentativeEmployeeCode").val("");
                $("#SalesRepresentativeEmployeeName").val("");
            }
            else if ($(obj).children().eq(1).html() == "SBU1" || $(obj).children().eq(1).html() == "SBU8" || $(obj).children().eq(1).html() == "SBU3") {
                $("#SalesRepresentativeEmployeeCode").val($("#UserCode").val());
                $("#SalesRepresentativeEmployeeName").val($("#UserName").val());
            }
            else if ($(obj).children().eq(1).html() == "SBU8" || $(obj).children().eq(1).html() == "SBU3") {
                $("#Complaint_Type_CODE").val("CTC1");
                $("#Complaint_Type").val("Product Complaints");
            }
            else {
                $("#SalesRepresentativeEmployeeCode").val("");
                $("#SalesRepresentativeEmployeeName").val("");
            }
        }
        else {

        }


        //var BU = $("#Product_Type").val();

        //if (BU == "SBU3") {
        //    $(".BreakageQtyLabel").text("Defect Qty (Nos)");
        //}

        //svprasadk 16-04-2020 SBU 1 requirement to add sub stockiest master start
        var BU = $("#Product_Type_CODE").val();
        if (BU == "SBU1") {
            $("#SubStockiest_Direct_CustomerDiv").hide();
            $("#PartyTypeDiv").show();
            $("#Is_Project_PartyDiv").hide();
            $("#SubStockiest_CodeDiv").hide();
            $("#Site_AddressDiv").hide();
            $("#SubStockiest_NameDiv").hide();
            $("#SubStockiest_AddressDiv").hide();
            $("#SubStockiest_NumberDiv").hide();
            $("#SubStockiest_Direct_Customer").val("");
            $("#Is_Project_Party").prop("checked", false);
            $("#Site_Address").val("");
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
            //$("#TYPE_OF_COMPLAINT_DIV").show();
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
            $("#InvoiceNoBU3_div").hide();
            $("#InvoiceNoBU3").val('');
            //VIKAS G,9/2/2022 AS PER THE REQUIREMENT OF JOSEPH ADDED THE LABEL OF NOTE FOR ATTACHMENTS
            $("#lblNote").css('display', 'none');
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
        } else if (BU == "SBU8") {
            $("#SubStockiest_Direct_CustomerDiv").hide();
            $("#PartyTypeDiv").show();
            $("#Is_Project_PartyDiv").hide();
            $("#SubStockiest_CodeDiv").hide();
            $("#Site_AddressDiv").hide();
            $("#SubStockiest_NameDiv").hide();
            $("#SubStockiest_AddressDiv").hide();
            $("#SubStockiest_NumberDiv").hide();
            $("#SubStockiest_Direct_Customer").val("");
            $("#Is_Project_Party").prop("checked", false);
            $("#Site_Address").val("");
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
            //$("#TYPE_OF_COMPLAINT_DIV").show();
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
            $("#InvoiceNoBU3_div").hide();
            $("#InvoiceNoBU3").val('');
            //VIKAS G,9/2/2022 AS PER THE REQUIREMENT OF JOSEPH ADDED THE LABEL OF NOTE FOR ATTACHMENTS
            $("#lblNote").css('display', 'none');
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
            $("#THplantname").css('display', 'block');
            $("#THCategory").css('display', 'none');
            $("#THDefectprct").css('display', 'block');
            $("#THBASICAMOUNT").css('display', 'block');
            $("#totalprodvalue").css('display', 'block');
        }
        else if (BU == "SBU2") {
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
            //$("#TYPE_OF_COMPLAINT").empty();
            //$("#TYPE_OF_COMPLAINT").val(0);
            $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end   
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
            $("#InvoiceNoBU3_div").hide();
            $("#InvoiceNoBU3").val('');
            //VIKAS G,9/3/2022 AS PER THE REQUIREMENT OF JOSEPH ADDED THE LABEL OF NOTE FOR ATTACHMENTS
            $("#lblNote").css('display', 'none');
            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
            $("#THplantname").css('display', 'none');
            $("#THBASICAMOUNT").css('display', 'none');
            $("#totalprodvalue").css('display', 'none');
            $("#THCategory").css('display', 'none');
            $("#THDefectprct").css('display', 'none');
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
        } else if (BU == "SBU3") {
            debugger
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
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
            $("#TYPE_OF_COMPLAINT_DIV").hide();
            //$("#TYPE_OF_COMPLAINT").empty();
            //$("#TYPE_OF_COMPLAINT").val(0);
            $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
            $("#InvoiceNoBU3_div").show();
            $("#InvoiceNoBU3").val('');
            //VIKAS G,9/3/2022 AS PER THE REQUIREMENT OF JOSEPH ADDED THE LABEL OF NOTE FOR ATTACHMENTS
            $("#lblNote").css('display', 'block');
            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
            var Productcode = $("#Product_Category_CODE").val();
            $("#THplantname").css('display', 'block');
            $("#THBASICAMOUNT").css('display', 'block');
            $("#totalprodvalue").css('display', 'block');
            $("#THCategory").css('display', 'none');
            $("#THDefectprct").css('display', 'none');
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
        }
        //VIKAS G, 2023-04-12 SBU-8 START.
        else if (BU == "SBU8") {
            debugger
            //$("#SubStockiest_Direct_CustomerDiv").show();
            //$("#PartyTypeDiv").hide();
            //$("#Is_Project_PartyDiv").show();
            //$("#SubStockiest_CodeDiv").hide();
            //$("#Site_AddressDiv").show();
            //$("#SubStockiest_NameDiv").hide();
            //$("#SubStockiest_AddressDiv").hide();
            //$("#SubStockiest_NumberDiv").hide();
            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
            //$("#party_type").val("Dealer");
            //$("#party_type_id").val(1);
            //$("#party_type").val("Stockiest");
            //$("#SubStockiest_ID").val("");
            //$("#SubStockiest_Code").val("");
            //$("#SubStockiest_Name").val("");
            //$("#SubStockiest_Address").val("");
            //$("#SubStockiest_Number").val("");
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
            $("#TYPE_OF_COMPLAINT_DIV").hide();
            //$("#TYPE_OF_COMPLAINT").empty();
            //$("#TYPE_OF_COMPLAINT").val(0);
            $("#TYPE_OF_COMPLAINT > [value=0]").attr("selected", "true");
            //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint end
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master start
            //$("#InvoiceNoBU3_div").show();
            //$("#InvoiceNoBU3").val('');
            //VIKAS G,9/3/2022 AS PER THE REQUIREMENT OF JOSEPH ADDED THE LABEL OF NOTE FOR ATTACHMENTS
            $("#lblNote").css('display', 'block');
            //VIKAS G, 9-3-2022 AS PER jOSEPH REQUIREMENT ADDING BASIC AMOUNT IN THE COMPLAINT REGISTRATION SUPPLY DETAILS.
            var Productcode = $("#Product_Category_CODE").val();
            $("#THplantname").css('display', 'block');
            $("#THBASICAMOUNT").css('display', 'block');
            $("#totalprodvalue").css('display', 'block');
            $("#THCategory").css('display', 'none');
            $("#THDefectprct").css('display', 'block');
            //svprasadk 21-12-2020 SBU3 requirement adding checkbox to product master end
        }

        //VIKAS G, 2023-04-12 SBU-8 END.
        //svprasadk 16-04-2020 SBU 1 requirement to add sub stockiest master end

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product Product Division Master
function ProductDivisionMaster(obj) {

    RegistrationScope.$apply(function () {
        debugger
        $("#SubProductDivisionMasterlbl").css('display', 'none');
        $("#SubProductDivisionMasterdiv").hide();
        $("#Product_Category_CODE").val($(obj).children().eq(1).html());
        $("#Product_Category").val($(obj).children().eq(2).html());

        if (($(obj).children().eq(1).html()) == "88") {
            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
        }
        else {
            $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
        }

        if (($(obj).children().eq(1).html()) == "14") {
            $(".LabelForACSheets").css('display', 'none');
            $(".LabelForCCSheets").css('display', 'block');
        }
        else if (($(obj).children().eq(1).html()) == "11") {
            $(".LabelForACSheets").css('display', 'block');
            $(".LabelForCCSheets").css('display', 'none');
        }
        //VIKAS G, 23-3-2022 START
        //else if (($(obj).children().eq(1).html())  != "36") {
        //    $("#THplantname").css('display', 'block');
        //    $("#THBASICAMOUNT").css('display', 'block');
        //    $("#totalprodvalue").css('display', 'block');
        //}
        //else {
        //    $("#THplantname").css('display', 'none');
        //    $("#THBASICAMOUNT").css('display', 'none');
        //    $("#totalprodvalue").css('display', 'none');
        //}
        //VIKAS G, 23-3-2022 END
        var BU = $("#Product_Type_CODE").val();
        if (BU == "SBU3") {
            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
            //if (($(obj).children().eq(1).html()) == "36")
            //    ProductTypeChanges("SBU2");
            //else
            //    ProductTypeChanges("SBU3");
            // svprasadk display material supply details for SBU3 -- 15-10-2019
            ProductTypeChanges("SBU2");
        }
        else if (BU == "SBU8") {
            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
            //if (($(obj).children().eq(1).html()) == "36")
            //    ProductTypeChanges("SBU2");
            //else
            //    ProductTypeChanges("SBU3");
            // svprasadk display material supply details for SBU3 -- 15-10-2019
            $("#Complaint_Type_CODE").val("CTC1");
            $("#Complaint_Type").val("Product Complaints");
            $("#SubProductDivisionMasterlbl").css('display', 'block');
            $("#SubProductDivisionMasterdiv").show();
            $('#Sub_Product_Category').val('');
            $('#Sub_Product_Category_CODE').val('');
            ProductTypeChanges("SBU8");
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//VIKAS G SBU8  SubProductDivisionMaster START
function SubProductDivisionMaster(obj) {

    RegistrationScope.$apply(function () {
        debugger
        $("#SubProductDivisionMasterlbl").css('display', 'none');
        $("#SubProductDivisionMasterdiv").hide();
        $("#Sub_Product_Category_CODE").val($(obj).children().eq(1).html());
        $("#Sub_Product_Category").val($(obj).children().eq(2).html());

        if (($(obj).children().eq(1).html()) == "88") {
            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
        }
        else {
            $(".BreakageQtyLabel").text("Breakage Qty (Nos)");
        }

        if (($(obj).children().eq(1).html()) == "14") {
            $(".LabelForACSheets").css('display', 'none');
            $(".LabelForCCSheets").css('display', 'block');
        }
        else if (($(obj).children().eq(1).html()) == "11") {
            $(".LabelForACSheets").css('display', 'block');
            $(".LabelForCCSheets").css('display', 'none');
        }       
        var BU = $("#Product_Type_CODE").val();
        if (BU == "SBU3") {
            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
            //if (($(obj).children().eq(1).html()) == "36")
            //    ProductTypeChanges("SBU2");
            //else
            //    ProductTypeChanges("SBU3");
            // svprasadk display material supply details for SBU3 -- 15-10-2019
            ProductTypeChanges("SBU2");
        }
        else if (BU == "SBU8") {
            $(".BreakageQtyLabel").text("Defect Qty (Nos)");
            //if (($(obj).children().eq(1).html()) == "36")
            //    ProductTypeChanges("SBU2");
            //else
            //    ProductTypeChanges("SBU3");
            // svprasadk display material supply details for SBU3 -- 15-10-2019
            $("#Complaint_Type_CODE").val("CTC1");
            $("#Complaint_Type").val("Product Complaints");
            $("#SubProductDivisionMasterlbl").css('display', 'block');
            $("#SubProductDivisionMasterdiv").show();
            ProductTypeChanges("SBU8");
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//VIKAS G SBU8  SubProductDivisionMaster END
//Product category master pop up
function GetProd_Cat_Mast(obj) {
    RegistrationScope.$apply(function () {
        //RegistrationScope.Product_Category_ID = $(obj).children().eq(0).html();
        RegistrationScope.Product_Category_CODE = $(obj).children().eq(1).html();
        RegistrationScope.Product_Category = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Plant Master pop up
function GetPlantMaster(obj) {
    RegistrationScope.$apply(function () {

        $("#Material_Belongs_To_ID").val($(obj).children().eq(0).html());
        $("#Material_Belongs_To_CODE").val($(obj).children().eq(1).html());
        $("#Material_Belongs_To").val(($(obj).children().eq(2).html()).replace('&amp;', '&'));

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Name pop up
function GetMSD_Name(obj) {
    RegistrationScope.$apply(function () {
        RegistrationScope.MSD_Name_ID = $(obj).children().eq(0).html();
        RegistrationScope.MSD_Name_CODE = $(obj).children().eq(1).html();
        RegistrationScope.MSD_Name = ($(obj).children().eq(2).html()).replace("&amp;", "&");
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint Type Master pop up
function GetComplaintType(obj) {
    RegistrationScope.$apply(function () {
        //RegistrationScope.Complaint_Type_ID = $(obj).children().eq(0).html();
        RegistrationScope.Complaint_Type_CODE = $(obj).children().eq(1).html();
        RegistrationScope.Complaint_Type = $(obj).children().eq(2).html();



    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint category Master Pop up
function GetComplaintCategory(obj) {
    RegistrationScope.$apply(function () {
        //RegistrationScope.Complaint_Category_ID = $(obj).children().eq(0).html();
        RegistrationScope.Complaint_Category_CODE = $(obj).children().eq(1).html();
        RegistrationScope.Complaint_Category = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complanint Priority Master Pop up
function GetComplaintPriority(obj) {
    RegistrationScope.$apply(function () {
        //RegistrationScope.Complaint_Priority_ID = $(obj).children().eq(0).html();
        RegistrationScope.Complaint_Priority_CODE = $(obj).children().eq(1).html();
        RegistrationScope.Complaint_Priority = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Complaint Severity master pop up
function GetComplaintSeverity(obj) {
    RegistrationScope.$apply(function () {
        //RegistrationScope.Complaint_Severity_ID = $(obj).children().eq(0).html();
        RegistrationScope.Complaint_Severity_CODE = $(obj).children().eq(1).html();
        RegistrationScope.Complaint_Severity = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product master pop up
function GetProductMaster(obj) {
    RegistrationScope.$apply(function () {

        $("#Item_Type_Product_ID").val($(obj).children().eq(0).html());
        $("#Item_Type_Product_CODE").val($(obj).children().eq(1).html());
        $("#Item_Type_Product_Name").val($(obj).children().eq(2).html());
        $("#GrossWeight").val($(obj).children().eq(6).html());
        $("#Size_M").val($(obj).children().eq(3).html());

        //RegistrationScope.Item_Type_Product_ID = $(obj).children().eq(0).html();
        //RegistrationScope.Item_Type_Product_CODE = $(obj).children().eq(1).html();
        //RegistrationScope.Item_Type_Product_Name = $(obj).children().eq(2).html();
        //RegistrationScope.GrossWeight = $(obj).children().eq(6).html();
        //RegistrationScope.Size_M = $(obj).children().eq(3).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product master pop up
function GetSD_ProductMaster(obj) {
    debugger
    RegistrationScope.$apply(function () {
        try {
            debugger
            var BU = $("#Product_Type_CODE").val();
            var Productcode = $("#Product_Category_CODE").val();

            $("#SD_ProductDetails").val($(obj).children().eq(2).html());
            $("#SD_ProductDetails_ID").val($(obj).children().eq(0).html());
            $("#SD_ProductDetails_CODE").val($(obj).children().eq(1).html());
            $("#SD_ProductSIZE").val($(obj).children().eq(3).html());
            //VIKAS G, 2023-02-22 SBU-8 START
            $("#SD_ProductDetails_BU8").val($(obj).children().eq(2).html());
            $("#SD_ProductDetails_ID_BU8").val($(obj).children().eq(0).html());
            $("#SD_ProductDetails_CODE_BU8").val($(obj).children().eq(1).html());
            $("#SD_ProductSIZE_BU8").val($(obj).children().eq(3).html());
            //VIKAS G, 2023-02-22 SBU-8 END
            $("#SD_ProductDetails_SBU2").val($(obj).children().eq(2).html());
            $("#SD_ProductDetails_ID_SBU2").val($(obj).children().eq(0).html());
            $("#SD_ProductDetails_CODE_SBU2").val($(obj).children().eq(1).html());
            $("#SD_ProductSIZE_SBU2").val($(obj).children().eq(3).html());
            $("#SD_InvoiceDate_SBU2").val($(obj).children().eq(9).html());

            //RegistrationScope.SD_ProductDetails = $(obj).children().eq(2).html();
            //RegistrationScope.SD_ProductDetails_ID = $(obj).children().eq(0).html();
            //RegistrationScope.SD_ProductDetails_CODE = $(obj).children().eq(1).html();
            //RegistrationScope.SD_ProductSIZE = $(obj).children().eq(3).html();
            //svprasadk 17-12-2020 SBU3 requirement adding checkbox to product master start
            var SD_ProductDetails_CODE = $("#SD_ProductDetails_CODE").val();
            var Customer_Code = $("#Customer_Code").val();
            var SD_InvoiceNo = $("#SD_InvoiceNo").val();
            var SD_ProductDetails_CODE_SBU2 = $("#SD_ProductDetails_CODE_SBU2").val();
            var SD_ProductDetails_CODE_BU8 = $("#SD_ProductDetails_CODE_BU8").val();
            var SD_InvoiceNo_BU8 = $("#SD_InvoiceNo_BU8").val();
            var SD_InvoiceNo_SBU2 = $("#SD_InvoiceNo_SBU2").val();
            if (BU == "SBU3" && Productcode != "36") {
                Data = JSON.stringify({
                    SD_ProductDetails_CODE: SD_ProductDetails_CODE,
                    Customer_Code: Customer_Code,
                    SD_InvoiceNo: SD_InvoiceNo
                });
            }
            //VIKAS G, 2023-02-22 SBU-8 START
            else if (BU == "SBU8") {
                Data = JSON.stringify({
                    SD_ProductDetails_CODE: SD_ProductDetails_CODE_BU8,
                    Customer_Code: Customer_Code,
                    SD_InvoiceNo: SD_InvoiceNo_BU8
                });
            }
            //VIKAS G, 2023-02-22 SBU-8 END
            else {
                Data = JSON.stringify({
                    SD_ProductDetails_CODE: SD_ProductDetails_CODE_SBU2,
                    Customer_Code: Customer_Code,
                    SD_InvoiceNo: SD_InvoiceNo_SBU2
                });
            }
            $.ajax({
                method: 'POST',
                url: '../../ComplaintRegistration/getSizeSupplyQtyforProductBU3',
                async: false,
                data: { Data: Data },
            }).then(function successCallback(response) {
                var BU = $("#Product_Type_CODE").val();
                var Productcode = $("#Product_Category_CODE").val();
                if (response != "FALSE") {
                    if (BU == "SBU3" && Productcode != "36") {
                        console.log(response)
                        var Data = JSON.parse(response);
                        $("#SD_SuppliedQtyNos").val(Data[0]["BILL_QTY"]);
                        $("#SD_InvoiceDate").val(Data[0]["INVOICE_DATE"])
                    }
                    else if (BU == "SBU8") {
                        console.log(response)
                        var Data = JSON.parse(response);
                        $("#SD_SuppliedQtyNos_BU8").val(Data[0]["BILL_QTY"]);
                        $("#SD_InvoiceDate_BU8").val(Data[0]["INVOICE_DATE"])
                    }
                    else {
                        console.log(response)
                        var Data = JSON.parse(response);
                        $("#SD_SuppliedQtyNos_SBU2").val(Data[0]["BILL_QTY"]);
                        $("#SD_InvoiceDate_SBU2").val(Data[0]["INVOICE_DATE"])
                    }
                }
            },
                function errorCallback(response) {
                    alert("Error : " + response);
                });
            //svprasadk 17-12-2020 SBU3 requirement adding checkbox to product master end
        }
        catch (e) {
            alert(e);
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
function GetDefectTypeMaster(obj) {
    RegistrationScope.$apply(function () {

        $("#Defect_Type_ID").val($(obj).children().eq(0).html());
        $("#Defect_Type_CODE").val($(obj).children().eq(1).html());
        $("#Defect_Type").val($(obj).children().eq(2).html());

    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Defect type master pop up
function GetSD_DefectTypeMaster(obj) {
    RegistrationScope.$apply(function () {
        debugger
        $("#SD_DefectType_ID").val($(obj).children().eq(0).html());
        $("#SD_DefectType_CODE").val($(obj).children().eq(1).html());
        $("#SD_DefectType").val($(obj).children().eq(2).html());

        $("#SD_DefectType_ID_SBU2").val($(obj).children().eq(0).html());
        $("#SD_DefectType_CODE_SBU2").val($(obj).children().eq(1).html());
        $("#SD_DefectType_SBU2").val($(obj).children().eq(2).html());
        //VIKAS G, 2023-02-22 SBU-8 START
        $("#SD_DefectType_ID_BU8").val($(obj).children().eq(0).html());
        $("#SD_DefectType_CODE_BU8").val($(obj).children().eq(1).html());
        $("#SD_DefectType_BU8").val($(obj).children().eq(2).html());
        //VIKAS G, 2023-02-22 SBU-8 END
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//Product Master pop up
function GetProductSuppliedFrom(obj) {
    RegistrationScope.$apply(function () {

        if ((($(obj).children().eq(2).html()) == "Sub Stockist") && (($("#Product_Type").val()) == "SBU3")) {
            alert("Sub Stockist is Not Applicable for SBU3");
        }
        else {
            $("#Product_Supplied_From_ID").val($(obj).children().eq(0).html());
            $("#Product_Supplied_From_CODE").val($(obj).children().eq(1).html());
            $("#Product_Supplied_From").val($(obj).children().eq(2).html());

            $("#MSD_Name").val("");
            $("#MSD_Name_ID").val("");
            $("#MSD_Name_CODE").val("");
        }
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}




function GetMeTheComplaintInInvestigation() {

    try {

        var AssignData = JSON.stringify({
            TrackingNo: $("#Complaint_Number").val(),
            RoleCode: $("#UserType").val(),
            RoleName: $("#UserType_ID").val(),
            UserCode: $("#UserCode").val(),
            UserName: $("#UserName").val()
        });

        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistration/GetMeTheComplaintInInvestigation',
            async: false,
            data: { AssignData: AssignData },
            success: function (Resp) {
                if (Resp != "") {
                    $("#Registration_Status").val("Complaint Assigned");
                    alert("Complaint Successfully Assigned to You");
                }
                $scope.go('RegistrationList');
            },
            error: function (xhr, two, err) {
                alert("Error Occured.\n Please take a screenshot of the next two alerts and mail the screen shot to CSM");
                alert("XHR : " + xhr + "\n Two : " + two + "\n Error : " + err);
                alert(JSON.stringify(xhr) + "\n" + JSON.stringify(two) + "\n" + JSON.stringify(err));
                GetMeTheComplaintInInvestigation()
            }
        });


    }
    catch (e) {
        alert("GetMeTheComplaintInInvestigation : " + e);
        GetMeTheComplaintInInvestigation();
    }
}
//svprasadk 16-04-2020 SBU 1 requirement to add sub stockiest master start
//Customer pop up
function GetSubStockiest(obj) {
    RegistrationScope.$apply(function () {
        //svprasadk 23-06-2020 SBU 1 requirement to sequesnce the order of stockiest master start
        RegistrationScope.SubStockiest_ID = $(obj).children().eq(0).html();
        RegistrationScope.SubStockiest_Code = $(obj).children().eq(1).html();
        RegistrationScope.SubStockiest_Name = ($(obj).children().eq(2).html()).replace("&amp;", "&");
        RegistrationScope.SubStockiest_Address = $(obj).children().eq(6).html() + ", " + $(obj).children().eq(3).html() + ", " + $(obj).children().eq(4).html();
        RegistrationScope.SubStockiest_Number = $(obj).children().eq(5).html();
        //svprasadk 23-06-2020 SBU 1 requirement to sequesnce the order of stockiest master end

        //RegistrationScope.SubStockiest_ID = $(obj).children().eq(0).html();
        //RegistrationScope.SubStockiest_Code = $(obj).children().eq(1).html();
        //RegistrationScope.SubStockiest_Name = ($(obj).children().eq(2).html()).replace("&amp;", "&");
        //RegistrationScope.SubStockiest_Address = $(obj).children().eq(6).html() + ", " + $(obj).children().eq(8).html() + ", " + $(obj).children().eq(9).html();
        //RegistrationScope.SubStockiest_Number = $(obj).children().eq(12).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
    //if ($(obj).children().eq(12).html() != "" || $(obj).children().eq(12).html() != 0) {
    //    $("#SubStockiest_Number").attr("disabled", "disabled");
    //} else {
    //    $("#SubStockiest_Number").removeAttr("disabled");
    //}
}
//svprasadk 16-04-2020 SBU 1 requirement to add sub stockiest master end
//svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master start
function showSubStockiestFields() {
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
//svprasadk 23-04-2020 SBU 1 requirement to add sub stockiest master end

//svprasadk 30-10-2020 SBU 1 requirement to add party type start
function getPartyType(obj) {
    //console.log('obj', obj)
    RegistrationScope.$apply(function () {
        $("#party_type_id").val($(obj).children().eq(1).html());
        $("#party_type").val($(obj).children().eq(2).html());
        RegistrationScope.party_type_id = $(obj).children().eq(1).html();
        RegistrationScope.party_type = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
    showSubStockiestFields();
}
//svprasadk 30-10-2020 SBU 1 requirement to add party type end

//Registration List
DIMS.controller('RegistrationListCtrl', function ($scope, $location, DIMSFactory) {
    complaintRegistrationScope = $scope;
    angular.element(document).ready(function () {
        CheckUserSession();
        var UserType = $("#UserType").val();

       

        $.ajax({
            url: '../../Users/GetRightToAccess',
            type: 'GET',
            data: { AccessData: JSON.stringify({ UserRole: UserType, FormCode: 'REG' }) },
            success: function (AccessData) {

                if (AccessData == "") {
                    $("#CreateNewComplaint").css('display', 'none');
                    $("#CMS_List").css('display', 'none');
                    $("#StateFilter").css('display', 'none');
                }
                else {
                    AccessData = JSON.parse(AccessData);
                    if (AccessData[0]["IS_VIEW"] == true) {
                        $("#CMS_List").css('display', 'block');
                        $("#StateFilter").css('display', 'block');
                    }
                    else {
                        $("#CMS_List").css('display', 'none');
                        $("#StateFilter").css('display', 'none');
                    }

                    if (AccessData[0]["IS_ADD"] == true) {
                        $("#CreateNewComplaint").css('display', 'block');
                    }
                    else {
                        $("#CreateNewComplaint").css('display', 'none');
                    }
                }

                $("#HiddenForCMS").val("");


                $.ajax({
                    type: 'POST',
                    url: '../../ComplaintRegistration/FillCMSStateFilter',
                    success: function (response) {
                        $("#StateFilter").empty();
                        debugger
                        if (response == "") {

                        }
                        else {
                            response = JSON.parse(response);
                            //Start of All option for Complaint Registration List
                            var UserCode = $("#UserCode").val();
                            var SessionUserType = $("#UserType").val();

                            if (UserCode == "2021" || UserCode == "2019" || UserCode == "50001234" || SessionUserType == "QAM_SBU3" || SessionUserType == "RSH_BU3" || SessionUserType == "NSH_BU3" || SessionUserType == "CSM_BU3" || SessionUserType == "CSM_BU8" || SessionUserType == "QAM_SBU3" || SessionUserType == "QAM_SBU2" || SessionUserType == "CSM_BU2" || SessionUserType == "Plant_MHD") {
                                var option = $('<option></option>').attr("value", "ALL").text("ALL");
                                $("#StateFilter").append(option);
                            }
                            //End 
                            for (var i = 0; i < response.length; i++) {
                                var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                                $("#StateFilter").append(option);
                            }
                            var CMSState = $("#CMSState").val();
                            console.log("State_code : " + response[0]["STATE_CODE"]);

                            if (CMSState == "") {
                                $("#StateFilter").val(response[0]["STATE_CODE"]);
                                $("#CMSState").val(response[0]["STATE_CODE"]);
                            }
                            else {
                                $("#StateFilter").val(CMSState);
                            }

                            var StateFilter = $("#StateFilter").val();
                            var UserCode = $("#UserCode").val();

                            var UserType = $("#UserType").val();

                            var WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' ";

                            if (UserType == "STOCKIST" || UserType == "BU2_STK" || UserType == "BU3_STK") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.DOC_STATUS!='' AND RC.CUSTOMER_CODE='" + UserCode + "'";
                            }
                            else if (UserCode == "50000822" || UserCode == "50002304" || UserCode == "KAM") {
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE RC.PRODUCT_TYPE_CODE='SBU2' AND RC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU2' AND RC.DOC_STATUS!='' ";
                                }
                            }
                            else if (UserCode == "50000985") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.DOC_STATUS!=''";
                            }
                            else if (UserType == "SH_BU3") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' AND RC.CREATED_BY='" + UserCode + "'";
                            }
                            else if (UserType == "RSH_BU3" || UserType == "NSH_BU3") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!=''";
                            }
                            //VIKAS G, 2022-JUNE-19 ADDED TM_BU3 ROLE
                            else if (UserCode == "2019" || UserCode == "2021" || UserCode == "50001234" || SessionUserType == "CSM_BU3" || UserType == "QAM_SBU3" || UserType == "CSM_BU3" || UserType == "Plant_MHD" || UserType == "MDO" || UserType == "TM_BU3") {

                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE RC.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND RC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND RC.DOC_STATUS!='' ";
                                }
                            }
                            else if (SessionUserType == "CSM_BU8" || UserType == "QH_BU8" || UserType == "QAM_SBU8" || UserType == "Plant_MHD" || UserType == "TM_BU8") {

                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE RC.PRODUCT_TYPE_CODE='SBU8' AND RC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU8' AND RC.DOC_STATUS!='' ";
                                }
                            }
                            else if (UserType == "FSO") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU1' AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
                            }
                            else if (UserType == "FSO_BU2") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
                            }
                            else if (UserType == "FSO_BU3") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
                            }
                            else if (UserType == "FSO_BU8") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU8' AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
                            }
                            else if (UserType == "FSO_BU2_BU3" || UserType == "KAM_BU2_BU3") {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
                            }
                            else if (UserType == "QAM_SBU2" || UserType == "CSM_BU2") {
                                if (StateFilter == "ALL") {
                                    WhereClause = " WHERE (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!=''";
                                }
                                else {
                                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!='' ";
                                }
                            }
                            else {
                                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU1' AND RC.DOC_STATUS!='' ";
                            }

                            var Data = JSON.stringify({
                                MasterType: "ComplaintRegistrationList",
                                ID: "561",
                                UserCode: $("#UserCode").val(),
                                "Type": "Get",
                                ReportName: "ComplaintRegistrationList",
                                WhereClause: WhereClause
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
                                    debugger
                                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "RegistrationList", UserSelectedColumnName);
                                    $('#RegistrationList tbody').on('click', 'tr', function () {
                                        var ID = $(this).find('td:eq(11)').text();
                                        if ($(this).hasClass('selected')) {
                                            $(this).removeClass('selected');
                                        }
                                        else {
                                        }
                                        if (ID != "") {


                                            $.ajax({
                                                url: '../../Users/GetRightToAccess',
                                                type: 'GET',
                                                data: { AccessData: JSON.stringify({ UserRole: $("#UserType").val(), FormCode: 'REG' }) },
                                                success: function (AccessData) {
                                                    if (AccessData == "") {
                                                    }
                                                    else {
                                                        AccessData = JSON.parse(AccessData);
                                                        if (AccessData[0]["IS_VIEW"] == true || AccessData[0]["IS_UPDATE"] == true) {
                                                            var scope = angular.element($("#RegistrationlistDiv")).scope();
                                                            scope.$apply(function () {
                                                                scope.go("Registration/" + ID);
                                                            });
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
        debugger
        try {

            var StateFilter = $("#StateFilter").val();

            $("#CMSState").val(StateFilter);

            var UserCode = $("#UserCode").val();

            //var WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "'  ORDER BY RC.ID DESC ";
            var WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' ";
            var UserType = $("#UserType").val();

            if (UserType == "STOCKIST" || UserType == "BU2_STK" || UserType == "BU3_STK") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.DOC_STATUS!='' AND RC.CUSTOMER_CODE='" + UserCode + "'";
            }
            if (UserCode == "50000822" || UserCode == "50002304" || UserCode == "KAM") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE RC.PRODUCT_TYPE_CODE='SBU2' AND RC.DOC_STATUS!=''";
                }
                else {
                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU2' AND RC.DOC_STATUS!='' ";
                }
            }
            else if (UserCode == "50000985") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.DOC_STATUS!='' ";
            }
            else if (UserType == "SH_BU3") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' AND RC.CREATED_BY='" + UserCode + "'";
            }
            else if (UserType == "RSH_BU3" || UserType == "NSH_BU3") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!=''";
            }
            //VIKAS G, 2022-JUNE-19 ADDED TM_BU3 ROLE
            else if (UserCode == "2019" || UserCode == "2021" || UserCode == "50001234" || UserType == "QAM_SBU3" || UserType == "CSM_BU3" || UserType == "Plant_MHD" || UserType == "MDO" || UserType == "TM_BU3") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!=''";
                }
                else {
                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' ";
                }
            }
            //else if (UserType == "SH_BU3" || UserCode == "2019" || UserCode == "2021" || UserCode == "50001234") {
            //    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU3' AND RC.DOC_STATUS!='' ";
            //}
            else if (UserType == "FSO") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU1' AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
            }
            else if (UserType == "FSO_BU2") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
            }
            else if (UserType == "FSO_BU3") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE in ('SBU3' ,'sbu8') AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
            }
            //Vikas G, 15-03-2023 start
            else if (UserType == "FSO_BU8") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU8' AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
            }
            //Vikas G, 15-03-2023 start
            else if (UserType == "FSO_BU2_BU3" || UserType == "KAM_BU2_BU3") {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!='' AND (RC.CREATED_BY='" + UserCode + "' OR RC.SALES_REPRESENTATIVE_CODE='" + UserCode + "') ";
            }
            else if (UserType == "QAM_SBU2" || UserType == "CSM_BU2") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!=''";
                }
                else {
                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND (RC.PRODUCT_TYPE_CODE='SBU2' or RC.PRODUCT_TYPE_CODE='SBU3') AND RC.DOC_STATUS!='' ";
                }
            }
            else if (UserType == "QAM_SBU8" || UserType == "CSM_BU8" || UserType == "QH_BU8") {
                if (StateFilter == "ALL") {
                    WhereClause = " WHERE (RC.PRODUCT_TYPE_CODE='SBU8') AND RC.DOC_STATUS!=''";
                }
                else {
                    WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND (RC.PRODUCT_TYPE_CODE='SBU8') AND RC.DOC_STATUS!='' ";
                }
            }
            else {
                WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "' AND RC.PRODUCT_TYPE_CODE='SBU1' AND RC.DOC_STATUS!='' ";
            }


            var Data = JSON.stringify({
                MasterType: "ComplaintRegistrationList",
                ID: "561",
                UserCode: $("#UserCode").val(),
                "Type": "Get",
                ReportName: "ComplaintRegistrationList",
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

                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "RegistrationList", UserSelectedColumnName);
                    $('#RegistrationList tbody').on('click', 'tr', function () {
                        var ID = $(this).find('td:eq(1)').text();
                        var Status = $(this).find('td:eq(2)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            //RegistrationListTable.$('tr.selected').removeClass('selected');
                            //$(this).addClass('selected');
                        }
                        if (ID != "") {
                            var scope = angular.element($("#RegistrationlistDiv")).scope();
                            scope.$apply(function () {
                                scope.go("Registration/" + ID);
                            })
                        }
                        else if (Status == "DRAFT") {
                            var ComplaintNumber = $(this).find('td:eq(11)').text();
                            var scope = angular.element($("#RegistrationlistDiv")).scope();
                            scope.$apply(function () {
                                scope.go("Registration/" + ComplaintNumber);
                            })
                        }
                    });

                });
            });



        }
        catch (e) {
            alert("Error :StateChange : " + e);
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
        if (ControllerName != "RegistrationListCtrl") {
            ControllerName = "RegistrationListCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "RegistrationListCtrl");

            $compile(elem.contents())(complaintRegistrationScope);
        }

        $("#ColumnEditingModal").modal('show');




    }
    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing = function () {
        DIMSFactory.ViewColumnEditing("ComplaintRegistrationList", $("#UserCode").val(), " ORDER BY ID DESC"); // 1-Report Name ,2-UserCode(561),3-WhereClause

    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var StateFilter = $("#StateFilter").val();
        var WhereClause = " WHERE RC.STATE_CODE='" + StateFilter + "'  ORDER BY RC.ID DESC ";
        var Data = JSON.stringify({
            MasterType: "ComplaintRegistrationList",
            ID: "561",
            UserCode: $("#UserCode").val(),
            "Type": "Get",
            ReportName: "ComplaintRegistrationList",
            WhereClause: WhereClause
        });
        //DIMSFactory.SaveColumnEditingData("Compensation", $scope.UserCode, " ORDER BY ID DESC");
        DIMSFactory.SaveColumnEditingData_InputParameter("ComplaintRegistrationList", $("#UserCode").val(), WhereClause, Data, "RegistrationList");

        // 1-Report Name ,2-UserCode(561),3-WhereClause,4-JsonData,5-Frontend datatable id
    }
});


//ShowLoader();
//HideLoader();


/*

1.
Add 88 Division to Division Master.


2.
Add Column SALES_ORG to cms_complaint_category_master and Update to '10002000'
ALTER TABLE cms_complaint_category_master ADD SALES_ORG NUMERIC
UPDATE cms_complaint_category_master SET SALES_ORG='10002000'

Add the New SBU3 Complaint Categories to cms_complaint_category_master
INSERT INTO [cms_complaint_category_master]([COMPLAINT_CATEGORY_CODE],[COMPLAINT_CATEGORY_NAME],[COMPLAINT_CATEGORY_DESC],[CREATED_BY],[CREATED_DATE],[SITEDETAIL_CODE],[COMPANYDETAIL_CODE],[MODIFIED_BY],[MODIFIED_DATE],[COMPLAINT_TYPE_CODE],[LAST_ACTION],[ACTIVE],[SALES_ORG]) VALUES ('MT','Mfg/Technical','','ADMIN',GETDATE(),'','','','',17,'U','Y','3000')
INSERT INTO [cms_complaint_category_master]([COMPLAINT_CATEGORY_CODE],[COMPLAINT_CATEGORY_NAME],[COMPLAINT_CATEGORY_DESC],[CREATED_BY],[CREATED_DATE],[SITEDETAIL_CODE],[COMPANYDETAIL_CODE],[MODIFIED_BY],[MODIFIED_DATE],[COMPLAINT_TYPE_CODE],[LAST_ACTION],[ACTIVE],[SALES_ORG]) VALUES ('TP','Transit/Packing','','ADMIN',GETDATE(),'','','','',17,'U','Y','3000')
INSERT INTO [cms_complaint_category_master]([COMPLAINT_CATEGORY_CODE],[COMPLAINT_CATEGORY_NAME],[COMPLAINT_CATEGORY_DESC],[CREATED_BY],[CREATED_DATE],[SITEDETAIL_CODE],[COMPANYDETAIL_CODE],[MODIFIED_BY],[MODIFIED_DATE],[COMPLAINT_TYPE_CODE],[LAST_ACTION],[ACTIVE],[SALES_ORG]) VALUES ('APP','Application','','ADMIN',GETDATE(),'','','','',17,'U','Y','3000')
INSERT INTO [cms_complaint_category_master]([COMPLAINT_CATEGORY_CODE],[COMPLAINT_CATEGORY_NAME],[COMPLAINT_CATEGORY_DESC],[CREATED_BY],[CREATED_DATE],[SITEDETAIL_CODE],[COMPANYDETAIL_CODE],[MODIFIED_BY],[MODIFIED_DATE],[COMPLAINT_TYPE_CODE],[LAST_ACTION],[ACTIVE],[SALES_ORG]) VALUES ('COMM','Commercial','','ADMIN',GETDATE(),'','','','',17,'U','Y','3000')

3.
Defect Master Configuration
ALTER TABLE cms_defect_type_master ADD COMPLAINT_CATEGORY_CODE VARCHAR(10)

Transfer data to cms_defect_type_master

4.
Supplier Type Master Changes.
Remove Unnecessary Columns.
Add following Rows.
INSERT INTO [cms_supplier_type_master] ([SUPPLIER_TYPE_CODE],[SUPPLIER_TYPE_NAME],[SUPPLIER_TYPE_DESCRIPTION],[CREATED_BY],[CREATED_DATE]) VALUES ('SC5','Distributor','3','ADMIN',GETDATE())
INSERT INTO [cms_supplier_type_master] ([SUPPLIER_TYPE_CODE],[SUPPLIER_TYPE_NAME],[SUPPLIER_TYPE_DESCRIPTION],[CREATED_BY],[CREATED_DATE]) VALUES ('SC6','Wholesaler','3','ADMIN',GETDATE())
INSERT INTO [cms_supplier_type_master] ([SUPPLIER_TYPE_CODE],[SUPPLIER_TYPE_NAME],[SUPPLIER_TYPE_DESCRIPTION],[CREATED_BY],[CREATED_DATE]) VALUES ('SC7','Dealer','3','ADMIN',GETDATE())


5.
CREATE TABLE [cms_investigation_msf_BU3]([LINE_ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY ,[ID] [int] NOT NULL,[ProdCode] [nvarchar](25) NULL,[PlantCode] [nvarchar](25) NULL,[SuppTypeCode] [nvarchar](10) NULL,[SuppNameCode] [nvarchar](25) NULL,[UOM] [nvarchar](10) NULL,[SupplyQty] [float] NULL,[DefQty] [float] NULL,[ActDftQty] [float] NULL)


6.
CREATE TABLE [dbo].[cms_compensation_msf_BU3]([LINE_ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [ID] [int] NOT NULL,
    [ProdCode] [nvarchar](25) NULL,
    [PlantCode] [nvarchar](25) NULL,
    [SuppTypeCode] [nvarchar](10) NULL,
    [SuppNameCode] [nvarchar](25) NULL,
    [UOM] [nvarchar](10) NULL,
    [SupplyQty] [float] NULL,
    [DefQty] [float] NULL,
    [ActDftQty] [float] NULL
)


7.

CREATE TABLE [dbo].[cms_compensation_supply_details_BU3](
    [LINE_ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [ID] [int] NOT NULL,
    [ProdCode] [nvarchar](25) NULL,
    [InvoiceNo] [nvarchar](10) NULL,
    [InvoiceDate] [date] NULL,
    [BatchNo] [nvarchar](300) NULL,
    [SupplyQty] [float] NULL,
    [DefectQty] [float] NULL,
    [ActualDefectQty] [float] NULL,
    [Transporter] [nvarchar](25) NULL,
    [Remarks] [nvarchar](25) NULL,
    [DefectType] [nvarchar](25) NULL
    )


8.
CREATE TABLE [dbo].[cms_compensation_recommlines_BU3](
    [LINE_ID] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [ID] [int] NOT NULL,
    [ProdCode] [nvarchar](25) NULL,
    [ProdName] [nvarchar](250) NULL,
    [Nos] [int] NULL
    )

9.
INSERT INTO [cms_compensation_mode_master]
           ([COMPENSATION_MODE_CODE],[COMPENSATION_MODE_NAME],[COMPENSATION_MODE_DESCRIPTION],[CREATED_BY],[CREATED_DATE],[SITEDETAIL_CODE],[COMPANYDETAIL_CODE],[MODIFIED_BY]
           ,[MODIFIED_DATE],[LAST_ACTION],[ACTIVE],[PRODUCT_TYPE_CODE]) VALUES ('CR','Credit Note','','Admin',GETDATE(),'STH','CC1','',NULL,'','Y','PC2')

10.
UPDATE COLUMN_MAPPING SET DB_END_COLUMN_NAME='(SELECT TOP 1 PCM.DIVISION_NAME FROM sap_division_master PCM WHERE PCM.DIVISION_CODE=INV.Product_Category_Code)' WHERE ID=5118


11.
INSERT INTO [DimsUsers]([USER_CODE],[USER_NAME],[PASSWORD],[ACTIVE],[LAST_LOGIN],[TOKEN],[PWDCHNGSTATUS],[LASTPWDCHNGDATE],[USER_ROLE_ID],[USER_ROLE_CODE],[USER_ROLE_NAME]
,[SITE_DETAIL_CODE],[COMPANY_DETAIL_CODE],[LAST_ACTION],[CREATED_DATE],[CREATED_BY],[USER_TYPE],[USER_AUTHENTICATION_IMAGE]) VALUES
('2019','Faridabad cPVC & uPVC Plant','LcxsdHdd5sUY8jsio/7uLw==','1','','','',NULL,'','QAM_PL','Quality Audit Manager Plant','','','',GETDATE(),'ADMIN','EMPLOYEE','Home.png')


INSERT INTO [DimsUsers]([USER_CODE],[USER_NAME],[PASSWORD],[ACTIVE],[LAST_LOGIN],[TOKEN],[PWDCHNGSTATUS],[LASTPWDCHNGDATE],[USER_ROLE_ID],[USER_ROLE_CODE],[USER_ROLE_NAME]
,[SITE_DETAIL_CODE],[COMPANY_DETAIL_CODE],[LAST_ACTION],[CREATED_DATE],[CREATED_BY],[USER_TYPE],[USER_AUTHENTICATION_IMAGE]) VALUES
('2021','APP Timmapur Plant','LcxsdHdd5sUY8jsio/7uLw==','1','','','',NULL,'','QAM_PL','Quality Audit Manager Plant','','','',GETDATE(),'ADMIN','EMPLOYEE','Home.png')


12.
Make changes before Investing

INSERT INTO [dbo].[cms_employeemaster](
[EMPLOYEE_CODE],[EMPLOYEE_NAME],[CREATED_BY],[CREATED_DATE],[SAP_CREATED_DATE],[DEPARTMENT_ID],[SITEDETAIL_CODE],[COMPANYDETAIL_CODE]
,[MODIFIED_BY],[SAP_CREADETD_CHANGED_BY],[MODIFIED_DATE],[SAP_MODIFIED_DATE],[USER_ID],[USER_CODE],[USER_NAME],[USER_ROLE_CODE],[USER_ROLE_NAME],[MOBILE_NO],[EXTENSION_NO],
[EMAIL],[REFERENCE_CODE],[LAST_ACTION],[ACTIVE],[USER_ROLE_ID],[DEPARTMENT_CODE],[DEPARTMENT_NAME],[END_DATE],[EMPLOYEE_GROUP],[DIVISION_SUB_AREA],[POSITION],[JOB],
[SORTABLE_NAME],[STREET],[CITY],[DISTRICT],[POSTAL_CODE],[COUNTRY],[STREET2],[STREET3],[STATE],[HOUSE_NO],[BUILDING_NO],[ZONE],[DEPO_COORDINATOR],[PLANT_COORDINATOR],
[REPORT_TO_WHOOM]) VALUES ('50001234','AnuPriya','Admin',GETDATE(),GETDATE(),NULL,NULL,NULL,'50001342',NULL,GETDATE(),GETDATE(),NULL,NULL,NULL,'CSO','NULL','9849012345',
NULL,'dims@hil.in',NULL,NULL,'Y',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)


INSERT INTO [DimsUsers](
[USER_CODE],[USER_NAME],[PASSWORD],[ACTIVE],[LAST_LOGIN],[TOKEN],[PWDCHNGSTATUS],[LASTPWDCHNGDATE],[USER_ROLE_ID],[USER_ROLE_CODE],[USER_ROLE_NAME],[SITE_DETAIL_CODE],
[COMPANY_DETAIL_CODE],[LAST_ACTION],[CREATED_DATE],[CREATED_BY],[MODIFIED_DATE],[MODIFIED_BY],[USER_TYPE],[USER_AUTHENTICATION_IMAGE]) VALUES ('50001234','AnuPriya',
'LcxsdHdd5sUY8jsio/7uLw==','1',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,GETDATE(),'50001342',NULL,NULL,'EMPLOYEE','Home.png')



13. Compensation Master Changes

14.
CREATE TABLE [dbo].[cms_investigation_breakage_SBU3_lines](
    [LINE_ID] [int] IDENTITY(1,1) PRIMARY KEY,
    [ID] [int] NOT NULL,
    [PROD_CODE] [nvarchar](150) NULL,
    [PROD_NAME] [nvarchar](150) NULL,
    [INVOICE_NO] [nvarchar](150) NULL,
    [INVOICE_DATE] [datetime] NULL,
    [BATCHNO] [nvarchar](150) NULL,
    [SUPPLIED_QTY] [float] NULL,
    [DEFECT_QTY] [float] NULL,
    [ACT_DEFECT_QTY] [float] NULL,
    [TRANSPORTER] [nvarchar](300) NULL,
    [REMARKS] [nvarchar](300) NULL,
    [DEFECT_TYPE_CODE] [nvarchar](25) NULL,
    [DEFECT_TYPE_NAME] [nvarchar](150) NULL)


15. Users and Roles Creation.

INSERT INTO cms_user_role_master VALUES('RSH_BU3','Regional Sales Head SBU3',NULL,'ADMIN',GETDATE(),NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)
INSERT INTO cms_user_role_master VALUES('NSH_BU3','National Sales Head SBU3',NULL,'ADMIN',GETDATE(),NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)


INSERT INTO DimsUsers VALUES('50000001','First Zone','LcxsdHdd5sUY8jsio/7uLw==','1',GETDATE(),'50001624090220171512391838210325250001546','0',GETDATE(),NULL,NULL,NULL,NULL,NULL,NULL,GETDATE(),'ADMIN',NULL,NULL,'EMPLOYEE','Home.png')
INSERT INTO DimsUsers VALUES('50000002','Second Zone','LcxsdHdd5sUY8jsio/7uLw==','1',GETDATE(),'50001624090220171512391838210325250001546','0',GETDATE(),NULL,NULL,NULL,NULL,NULL,NULL,GETDATE(),'ADMIN',NULL,NULL,'EMPLOYEE','Home.png')
INSERT INTO DimsUsers VALUES('50000003','Third Zone','LcxsdHdd5sUY8jsio/7uLw==','1',GETDATE(),'50001624090220171512391838210325250001546','0',GETDATE(),NULL,NULL,NULL,NULL,NULL,NULL,GETDATE(),'ADMIN',NULL,NULL,'EMPLOYEE','Home.png')
INSERT INTO DimsUsers VALUES('50000004','Regional Sales Head','LcxsdHdd5sUY8jsio/7uLw==','1',GETDATE(),'50001624090220171512391838210325250001546','0',GETDATE(),NULL,NULL,NULL,NULL,NULL,NULL,GETDATE(),'ADMIN',NULL,NULL,'EMPLOYEE','Home.png')


INSERT INTO cms_employeemaster VALUES('50000001','First Zone','ADMIN',GETDATE(),NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,NULL,	NULL,	NULL,	NULL,	NULL,	'',	NULL,	'dims@hil.in',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL)
INSERT INTO cms_employeemaster VALUES('50000002','Second Zone','ADMIN',GETDATE(),NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,NULL,	NULL,	NULL,	NULL,	NULL,	'',	NULL,	'dims@hil.in',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL)
INSERT INTO cms_employeemaster VALUES('50000003','Third Zone','ADMIN',GETDATE(),NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,NULL,	NULL,	NULL,	NULL,	NULL,	'',	NULL,	'dims@hil.in',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL)
INSERT INTO cms_employeemaster VALUES('50000004','Regional Sales Head','ADMIN',GETDATE(),NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,NULL,	NULL,	NULL,	NULL,	NULL,	'',	NULL,	'dims@hil.in',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL)


INSERT INTO cms_employee_role_configuration VALUES ('50000001','RSH_BU3','','0','0','','','','300','')
INSERT INTO cms_employee_role_configuration VALUES ('50000002','RSH_BU3','','0','0','','','','300','')
INSERT INTO cms_employee_role_configuration VALUES ('50000003','RSH_BU3','','0','0','','','','300','')
INSERT INTO cms_employee_role_configuration VALUES ('50000004','NSH_BU3','','0','0','','','','300','')

*/


/*

INSERT [dbo].[cms_user_role_master] ([USER_ROLE_CODE], [USER_ROLE_NAME], [USER_ROLE_DESCRIPTION], [CREATED_BY], [CREATED_DATE], [SITEDETAIL_CODE], [COMPANYDETAIL_CODE], [MODIFIED_BY], [MODIFIED_DATE], [LAST_ACTION], [ACTIVE], [REMARKS], [PRODUCT_TYPE_CODE], [DEPARTMENT_CODE], [ACCESS_LEVEL]) VALUES ('BU2_STK', 'SBU2_Stockist', NULL, 'ADMIN', GETDATE(), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[cms_user_role_master] ([USER_ROLE_CODE], [USER_ROLE_NAME], [USER_ROLE_DESCRIPTION], [CREATED_BY], [CREATED_DATE], [SITEDETAIL_CODE], [COMPANYDETAIL_CODE], [MODIFIED_BY], [MODIFIED_DATE], [LAST_ACTION], [ACTIVE], [REMARKS], [PRODUCT_TYPE_CODE], [DEPARTMENT_CODE], [ACCESS_LEVEL]) VALUES ('BU3_STK', 'SBU3_Stockist', NULL, 'ADMIN', GETDATE(), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)









*/