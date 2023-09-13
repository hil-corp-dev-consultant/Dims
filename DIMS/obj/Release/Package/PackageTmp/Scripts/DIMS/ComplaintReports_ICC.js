DIMS.controller('ComplaintStatusReportCtrl_ICC', function ($scope, $location, DIMSFactory) {

    $scope.templatesettings = { HeaderTitle: "Complaint Status Report ICC" };
    $scope.go = function (path) {
        $location.path(path);
    };

    ComplaintStatusReport = $scope;
    $scope.Getdata = function (Methodname, MasterType, Heading) {

        var StateFilter_ICC = $("#StateFilter_ICC").val();
        var UserRole = $("#SessionUserTypeID_ICC").val();
        var PLANT_CODE = $("#PLANT_CODE").val();
        var BUSINESS_UNIT = $("#BusinessUnit_ICC").val();
        var JsonData = JSON.stringify({
            "MasterType": MasterType,
            "StateFilter": StateFilter_ICC,
            "UserRole": UserRole,
            //svprasadk 28 - 08 - 2020 get plant list start
            "PLANT_CODE": PLANT_CODE,
            "BUSINESS_UNIT": BUSINESS_UNIT
            //svprasadk 28 - 08 - 2020 get plant list end
        });
        DIMSFactory.getMasterData(JsonData).success(function (res) {
            getLookUpData(res, Methodname, Heading);
        });
    };
    var table;

    angular.element(document).ready(function () {

        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationICC/FillCMSStateFilter',
            async: true,
            success: function (response) {

                $("#StateFilter_ICC").empty();

                if (response == "") {

                }
                else {

                    response = JSON.parse(response);

                    var UserRole = $("#SessionUserTypeID_ICC").val();

                    if (UserRole == "CSM" || UserRole == "QH" || UserRole == "QH_BU8"  || UserRole == "CSM_BU3" || UserRole == "CSM_BU2" || UserRole == "QAM_SBU3" || UserRole == "SH_BU3" || UserRole == "Plant_MHD") {
                        var option = $('<option></option>').attr("value", "ALL").text("ALL");
                        $("#StateFilter_ICC").append(option);
                    }

                    for (var i = 0; i < response.length; i++) {
                        var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                        $("#StateFilter_ICC").append(option);
                    }

                    var CMSState = $("#CMSState").val();
                    if (CMSState == "") {
                        $("#StateFilter_ICC").val(response[0]["STATE_CODE"]);
                        $("#CMSState").val(response[0]["STATE_CODE"]);
                    }
                    else {
                        $("#StateFilter_ICC").val(CMSState);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });

        table = $('#InvoiceListTab').DataTable({
            scrollY: "200px",
            scrollX: true,
            scrollCollapse: true,
            paging: true,
            "createdRow": function (row, data, index) {
                if (data[3] == "Compensation Approved and sent") {
                    $('td', row).eq(3).addClass('DarkGreen');
                }
                else if (data[3] == "Investigation Approved. Compensation under review") {
                    $('td', row).eq(3).addClass('LightGreen');
                }
                else if (data[3] == "Complaint Accepted") {
                    $('td', row).eq(3).addClass('Yellow');
                }
                else if (data[3] == "Complaint Assigned") {
                    $('td', row).eq(3).addClass('Yellow');
                }
                else if (data[3] == "Compensation Under Review") {
                    $('td', row).eq(3).addClass('DarkGreen');
                }
                else if (data[3] == "Investigated and under review") {
                    $('td', row).eq(3).addClass('LightGreen');
                }
                else if (data[3] == "Complaint Registered") {
                    $('td', row).eq(3).addClass('Yellow');
                } else if (data[3] == "Under Investigation") {
                    $('td', row).eq(3).addClass('LightGreen');
                }
                else if (data[3] == "Complaint Rejected") {
                    $('td', row).eq(3).addClass('DarkRed');
                }
                else if (data[3] == "Investigation Rejected") {
                    $('td', row).eq(3).addClass('DarkRed');
                }
                else if (data[3] == "Compensation Rejected") {
                    $('td', row).eq(3).addClass('DarkRed');
                }
            },
            fixedColumns: {
                leftColumns: 0
            },
            dom: 'Bfrtip',
            buttons: [
            {
                extend: 'csvHtml5',
                title: 'ComplaintstatusReport'
            }
            //},
            //{
            //    extend: 'pdfHtml5',
            //    title: 'Data export'
            //}
            ]
            //buttons: [
            //    {
            //        extend: 'pdfHtml5',
            //        orientation: 'landscape',
            //        pageSize: 'A3'
            //    },
            //    'copy', 'csv', 'excel', 'print'
            //]
        });
    });

    $scope.Generate_Report_ICC = function () {

        var StateFilter_ICC = $("#StateFilter_ICC").val();

        var ComplaintTrackingNumber = $scope.Complaint_Tracking_Number;
        var FromDate = $scope.txtFromDate_ICC;
        var Todate = $scope.ToDate_ICC;
        var ComplaintRegister = $scope.ComplaintRegistered_ICC;
        var ComplaintWeightingForInvstigation = $scope.ComplaintWaitingForInvestigation_ICC;
        var ComplaintAssigned_ICC = $scope.ComplaintAssigned_ICC;
        var InvestigationUnderReview = $scope.InvestigatedUnderReviews_ICC;
        var CompensationUnderReview = $scope.Compensation_under_Review;
        var CompensationAproveandSent = $scope.CompensationApprovedandSent;

        ComplaintRegister = $("#txtComplaintRegistered_ICC").is(':checked');

        ComplaintWeightingForInvstigation = $("#txtComplaintWaitingForInvestigation_ICC").is(':checked');

        ComplaintAssigned_ICC = $("#txtComplaintAssigned_ICC").is(':checked');

        InvestigationUnderReview = $("#txtInvestigatedUnderReviews_ICC").is(':checked');

        CompensationUnderReview = $("#txtCompensationunderReview").is(':checked');

        CompensationAproveandSent = $("#txtCompensationApprovedandSent").is(':checked');

        //svprasadk 28-08-2020  add plant code in report start
        //var PLANT_CODE = $("#PLANT_CODE").val();
        var PLANT_CODE = "";
        //svprasadk 28-08-2020  add plant code in report end

        if (ComplaintTrackingNumber == undefined || ComplaintTrackingNumber == null) {
            ComplaintTrackingNumber = "";
        }
        if (FromDate == undefined || FromDate == null) {
            FromDate = "";
        }
        if (Todate == undefined || Todate == null) {
            Todate = "";
        }
        if (ComplaintRegister == undefined || ComplaintRegister == null) {
            ComplaintRegister = "";
        }
        if (ComplaintWeightingForInvstigation == undefined || ComplaintWeightingForInvstigation == null) {
            ComplaintWeightingForInvstigation = "";
        }
        if (ComplaintAssigned_ICC == undefined || ComplaintAssigned_ICC == null) {
            ComplaintAssigned_ICC = "";
        }
        if (InvestigationUnderReview == undefined || InvestigationUnderReview == null) {
            InvestigationUnderReview = "";
        }
        if (CompensationUnderReview == undefined || CompensationUnderReview == null) {
            CompensationUnderReview = "";
        }
        if (CompensationAproveandSent == undefined || CompensationAproveandSent == null) {
            CompensationAproveandSent = "";
        }

        if (FromDate != "" && Todate == "") {
            alert("Please select To date");
        }
        else if (Todate != "" && FromDate == "") {
            alert("Please select From date");
        }        
        else {

            var BusinessUnit_ICC = $("#BusinessUnit_ICC").val();

            var FilterData = JSON.stringify({
                "FromDate": FromDate,
                "ToDate": Todate,
                "ComplaintTrackingNumber": ComplaintTrackingNumber,
                "ComplaintRegister": ComplaintRegister,
                "WeightingForinvestigation": ComplaintWeightingForInvstigation,
                "ComplaintAssigned": ComplaintAssigned_ICC,
                "InvestigationUnderReview": InvestigationUnderReview,
                "CompensationUnderReview": CompensationUnderReview,
                "CompensationAproveandSent": CompensationAproveandSent,
                "StateFilter": StateFilter_ICC,
                "BusinessUnit": BusinessUnit_ICC,
                //svprasadk 28-08-2020 add plant code in report start
                "PLANT_CODE": PLANT_CODE
                //svprasadk 28-08-2020 add plant code in report end
            });

            ShowLoader();

            DIMSFactory.ComplaintStatusReportData_ICC(FilterData).success(function (res) {
                HideLoader();
                if (res != "" && res != "[]") {

                    var Result = JSON.parse(res);
                    var Html = "";
                    table.clear().draw();

                    $('#InvoiceListTab tbody').empty();
                    for (var i = 0; i < Result.length; i++) {

                        $('#InvoiceListTab').dataTable().fnAddData([
                            parseInt(i + 1),
                            Result[i]["COMPLAINT_TRACKING_NO"],
                            Result[i]["COMPLAINT_CODE"],
                            Result[i]["FINAL_STATUS"],
                            Result[i]["STATE_DESC"],
                            Result[i]["REGISTERED_BY"],
                            Result[i]["PRODUCT_TYPE_NAME"],
                            Result[i]["COMPLAINT_REGISTRATION_DATE"],
                            Result[i]["ATTENDED_DATE"],
                            Result[i]["INVESTIGATED_DATE"],
                            Result[i]["NoofDays"],
                            Result[i]["INVESTIGATION_DONE_BY"],
                            Result[i]["DELAY_DAYS"],
                            Result[i]["DELAY_REASON"],
                        ]);

                    }
                    HideLoader();

                }
                else {
                    table.clear().draw();
                    alert("There is No data");
                    HideLoader();
                }

                HideLoader();

            });


        }
    };

    $scope.StateChange_ICC = function () {
        try {
            var StateFilter_ICC = $("#StateFilter_ICC").val();

            $("#InvoiceListTab tbody").empty();

        }
        catch (e) {
            alert("Error :StateChange_ICC : " + e);
        }
    }

});
DIMS.controller('CMS_Management_Information_SystemCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Management Information System" };
    $scope.go = function (path) {
        $location.path(path);
    };

});
DIMS.controller('ComplaintsDetailedReportCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Complaints Detailed Report" };
    $scope.go = function (path) {
        $location.path(path);
    };
    //$scope.CompensationReport = function () {
    //    $("#CompensationReport").modal('show');
    //}
    $scope.CompensationNote = function () {
        $("#CompensationNote").modal('show');
    }
    $scope.CommunicationNote = function () {
        $("#CommunicationNote").modal('show');
    }
    $scope.ComplaintRegistrationReport = function () {
        $("#ComplaintRegistrationReport").modal('show');
    }

    $scope.SiteObservationSheetPartC = function () {
        $("#SiteObservationSheetPartC").modal('show');
    }
    $scope.BreakageInspectionSheetPartB = function () {
        $("#BreakageInspectionSheetPartB").modal('show');
    }
    $scope.InvestigationReport = function () {
        $("#InvestigationReport").modal('show');
    }
    $scope.RegisteredComplaintsPlantSheeting = function () {
        $("#RegisteredComplaintsPlantSheeting").modal('show');
    }
    $scope.ClosedComplaintsPlant = function () {
        $("#ClosedComplaintsPlant").modal('show');
    }
    $scope.ComplaintDetailsDepo = function () {
        $("#ComplaintDetailsDepo").modal('show');
    }
    $scope.ClosedComplaintsAccount = function () {
        $("#ClosedComplaintsAccount").modal('show');
    }
    $scope.ClosedComplaintsAccountDefectType = function () {
        $("#ClosedComplaintsAccountDefectType").modal('show');
    }
    $scope.RegisteredComplaintsPlantOthers = function () {
        $("#RegisteredComplaintsPlantOthers").modal('show');
    }
    $scope.PendingCreditNoteApproval = function () {
        $("#PendingCreditNoteApproval").modal('show');
    }
});

//Karthik
DIMS.controller('CMS_DashboardCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "CMS Dashboard" };
    $scope.go = function (path) {
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
        GetProductCategory();
    });

    function GetProductCategory() {
        $.ajax({
            type: 'GET',
            url: '../ComplaintReports/GetProductCategory',
            datatype: 'JSON',
            async: false,
            success: function (response) {

                response = JSON.parse(response);

                var ProductCategory = response["ProductCategory"];
                var StateWise = response["StateWise"];
                var PendingComplaintsStagewise = response["PendingComplaintsStagewise"];
                var ComplaintStatusAll = response["ComplaintStatusAll"];
                var ComplaintList = response["ComplaintList"];
                var PlantwiseNetLossApprovedforSheeting = response["PlantwiseNetLossApprovedforSheeting"];
                var PlantwiseComplaintClousereInformation = response["PlantwiseComplaintClousereInformation"];
                var PlantwiseNetLossApprovalforOtherProducts = response["PlantwiseNetLossApprovalforOtherProducts"];
                var NetLossApprovedforotherProducts = response["NetLossApprovedforotherProducts"];
                var NetLossApprovedforotherSheeting = response["NetLossApprovedforotherSheeting"];


                // ProductCategory
                if (ProductCategory != "" || ProductCategory != null) {
                    for (var i = 0; i < ProductCategory.length; i++) {
                        $("#ProductCategorytbl").dataTable().fnAddData([ProductCategory[i]["Product"].toString(), ProductCategory[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#ProductCategorytbl").DataTable().fnClearTable();
                }


                //StateWise
                if (StateWise != "" || StateWise != null) {
                    for (var i = 0; i < StateWise.length; i++) {
                        $("#ComplaintStateWisetbl").dataTable().fnAddData([StateWise[i]["State"].toString(), StateWise[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#ComplaintStateWisetbl").DataTable().fnClearTable();
                }


                //PendingComplaintsStagewise
                if (PendingComplaintsStagewise != "" || PendingComplaintsStagewise != null) {
                    for (var i = 0; i < PendingComplaintsStagewise.length; i++) {
                        $("#PendingComplaintsStagewisetbl").dataTable().fnAddData([PendingComplaintsStagewise[i]["Status"].toString(), PendingComplaintsStagewise[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#PendingComplaintsStagewisetbl").DataTable().fnClearTable();
                }


                //ComplaintStatusAll
                if (ComplaintStatusAll != "" || ComplaintStatusAll != null) {
                    for (var i = 0; i < ComplaintStatusAll.length; i++) {
                        $("#ComplaintStatusAlltbl").dataTable().fnAddData([ComplaintStatusAll[i]["Status"].toString(), ComplaintStatusAll[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#ComplaintStatusAlltbl").DataTable().fnClearTable();
                }

                //ComplaintList
                if (ComplaintList != "" || ComplaintList != null) {
                    for (var i = 0; i < ComplaintList.length; i++) {
                        $("#ComplaintListtbl").dataTable().fnAddData([ComplaintList[i]["CUSTOMER_CODE"].toString(), ComplaintList[i]["CUSTOMER_NAME"].toString(), ComplaintList[i]["product_category_name"].toString(), ComplaintList[i]["city_code"].toString(), ComplaintList[i]["complaint_tracking_no"].toString()]);
                    }
                }
                else {
                    $("#ComplaintListtbl").DataTable().fnClearTable();
                }


                //PlantwiseNetLossApprovedforSheeting
                if (PlantwiseNetLossApprovedforSheeting != "" || PlantwiseNetLossApprovedforSheeting != null) {
                    for (var i = 0; i < PlantwiseNetLossApprovedforSheeting.length; i++) {
                        $("#PlantwiseNetLossApprovedforSheetingtbl").dataTable().fnAddData([PlantwiseNetLossApprovedforSheeting[i]["plant_name"].toString(), PlantwiseNetLossApprovedforSheeting[i]["Net Loss"].toString()]);
                    }
                }
                else {
                    $("#PlantwiseNetLossApprovedforSheetingtbl").DataTable().fnClearTable();
                }


                //PlantwiseComplaintClousereInformation
                if (PlantwiseComplaintClousereInformation != "" || PlantwiseComplaintClousereInformation != null) {
                    for (var i = 0; i < PlantwiseComplaintClousereInformation.length; i++) {
                        $("#PlantwiseComplaintClousereInformationtbl").dataTable().fnAddData([PlantwiseComplaintClousereInformation[i]["plant_name"].toString(), PlantwiseComplaintClousereInformation[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#PlantwiseComplaintClousereInformationtbl").DataTable().fnClearTable();
                }


                //PlantwiseNetLossApprovalforOtherProducts
                if (PlantwiseNetLossApprovalforOtherProducts != "" || PlantwiseNetLossApprovalforOtherProducts != null) {
                    for (var i = 0; i < PlantwiseNetLossApprovalforOtherProducts.length; i++) {
                        $("#PlantwiseNetLossApprovalforOtherProductstbl").dataTable().fnAddData([PlantwiseNetLossApprovalforOtherProducts[i]["plant_name"].toString(), PlantwiseNetLossApprovalforOtherProducts[i]["Net Loss"].toString()]);
                    }
                }
                else {
                    $("#PlantwiseNetLossApprovalforOtherProductstbl").DataTable().fnClearTable();
                }


                //NetLossApprovedforotherProducts
                if (NetLossApprovedforotherProducts != "" || NetLossApprovedforotherProducts != null) {
                    for (var i = 0; i < NetLossApprovedforotherProducts.length; i++) {
                        $("#NetLossApprovedforotherProductstbl").dataTable().fnAddData(
                            [NetLossApprovedforotherProducts[i]["PRODUCT_TYPE_CODE"].toString(),
                                NetLossApprovedforotherProducts[i]["DOC_STATUS"].toString(),
                                NetLossApprovedforotherProducts[i]["month1"].toString(),
                                NetLossApprovedforotherProducts[i]["month2"].toString(),
                                NetLossApprovedforotherProducts[i]["month3"].toString(),
                                NetLossApprovedforotherProducts[i]["month4"].toString(),
                                NetLossApprovedforotherProducts[i]["month5"].toString(),
                                NetLossApprovedforotherProducts[i]["month6"].toString(),
                                NetLossApprovedforotherProducts[i]["month7"].toString(),
                                NetLossApprovedforotherProducts[i]["month8"].toString(),
                                NetLossApprovedforotherProducts[i]["month9"].toString(),
                                NetLossApprovedforotherProducts[i]["month10"].toString(),
                                NetLossApprovedforotherProducts[i]["month11"].toString(),
                                NetLossApprovedforotherProducts[i]["month12"].toString()

                            ]);
                    }
                }
                else {
                    $("#NetLossApprovedforotherProductstbl").DataTable().fnClearTable();
                }


                //NetLossApprovedforotherSheeting
                if (NetLossApprovedforotherSheeting != "" || NetLossApprovedforotherSheeting != null) {
                    for (var i = 0; i < NetLossApprovedforotherSheeting.length; i++) {
                        $("#NetLossApprovedforotherSheetingtbl").dataTable().fnAddData(
                            [NetLossApprovedforotherSheeting[i]["PRODUCT_TYPE_CODE"].toString(),
                                NetLossApprovedforotherSheeting[i]["DOC_STATUS"].toString(),
                                NetLossApprovedforotherSheeting[i]["month1"].toString(),
                                NetLossApprovedforotherSheeting[i]["month2"].toString(),
                                NetLossApprovedforotherSheeting[i]["month3"].toString(),
                                NetLossApprovedforotherSheeting[i]["month4"].toString(),
                                NetLossApprovedforotherSheeting[i]["month5"].toString(),
                                NetLossApprovedforotherSheeting[i]["month6"].toString(),
                                NetLossApprovedforotherSheeting[i]["month7"].toString(),
                                NetLossApprovedforotherSheeting[i]["month8"].toString(),
                                NetLossApprovedforotherSheeting[i]["month9"].toString(),
                                NetLossApprovedforotherSheeting[i]["month10"].toString(),
                                NetLossApprovedforotherSheeting[i]["month11"].toString(),
                                NetLossApprovedforotherSheeting[i]["month12"].toString()

                            ]);
                    }
                }
                else {
                    $("#NetLossApprovedforotherSheetingtbl").DataTable().fnClearTable();
                }



            }
        })
    }
});


DIMS.controller('StockistCompensationCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Stockist Compensation" };
    $scope.go = function (path) {
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

        var UserCode = $("#USERCODE_Stockist_Compensation").val();
        var UserType = $("#USERTYPE__Stockist_Compensation").val();
        var Data = JSON.stringify({
            "UserCode": UserCode,
            "UserRole": UserType
        });
        if (UserType == "CSM" || UserType == "STOCKIST" || UserType == "Stockist" || UserType == "CSM_BU2" || UserType == "CSM_BU3") {

            DIMSFactory.GetStockistCompensatinData(Data).success(function (res) {
                if (res != "") {
                    var Result = JSON.parse(res);
                    for (var i = 0; i < Result.length; i++) {
                        $("#StockistCompensation").dataTable().fnAddData([
                               parseInt(i + 1),
                               Result[i]["Customer Code"] + ":" + Result[i]["Customer Name"],
                               Result[i]["Complaint Tracking No"],
                               Result[i]["Approved Date"],
                               //'',
                               "<a onclick='GetStockistCompensationSheet(" + Result[i]["Complaint Tracking No"] + ")'><i class='fa fa-file-pdf-o fa-4' title='Download Pdf'></i></a>"
                        ])

                    }
                }

            });
        }
        else {
            $("#CustomerAddress_Form").css({ "display": "none" });
        }
    });


    function GetProductCategory() {
        $.ajax({
            type: 'GET',
            url: '../ComplaintReports/GetProductCategory',
            datatype: 'JSON',
            async: false,
            success: function (response) {

                response = JSON.parse(response);

                var ProductCategory = response["ProductCategory"];
                var StateWise = response["StateWise"];
                var PendingComplaintsStagewise = response["PendingComplaintsStagewise"];
                var ComplaintStatusAll = response["ComplaintStatusAll"];
                var ComplaintList = response["ComplaintList"];
                var PlantwiseNetLossApprovedforSheeting = response["PlantwiseNetLossApprovedforSheeting"];
                var PlantwiseComplaintClousereInformation = response["PlantwiseComplaintClousereInformation"];
                var PlantwiseNetLossApprovalforOtherProducts = response["PlantwiseNetLossApprovalforOtherProducts"];
                var NetLossApprovedforotherProducts = response["NetLossApprovedforotherProducts"];
                var NetLossApprovedforotherSheeting = response["NetLossApprovedforotherSheeting"];


                // ProductCategory
                if (ProductCategory != "" || ProductCategory != null) {
                    for (var i = 0; i < ProductCategory.length; i++) {
                        $("#ProductCategorytbl").dataTable().fnAddData([ProductCategory[i]["Product"].toString(), ProductCategory[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#ProductCategorytbl").DataTable().fnClearTable();
                }


                //StateWise
                if (StateWise != "" || StateWise != null) {
                    for (var i = 0; i < StateWise.length; i++) {
                        $("#ComplaintStateWisetbl").dataTable().fnAddData([StateWise[i]["State"].toString(), StateWise[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#ComplaintStateWisetbl").DataTable().fnClearTable();
                }


                //PendingComplaintsStagewise
                if (PendingComplaintsStagewise != "" || PendingComplaintsStagewise != null) {
                    for (var i = 0; i < PendingComplaintsStagewise.length; i++) {
                        $("#PendingComplaintsStagewisetbl").dataTable().fnAddData([PendingComplaintsStagewise[i]["Status"].toString(), PendingComplaintsStagewise[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#PendingComplaintsStagewisetbl").DataTable().fnClearTable();
                }


                //ComplaintStatusAll
                if (ComplaintStatusAll != "" || ComplaintStatusAll != null) {
                    for (var i = 0; i < ComplaintStatusAll.length; i++) {
                        $("#ComplaintStatusAlltbl").dataTable().fnAddData([ComplaintStatusAll[i]["Status"].toString(), ComplaintStatusAll[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#ComplaintStatusAlltbl").DataTable().fnClearTable();
                }

                //ComplaintList
                if (ComplaintList != "" || ComplaintList != null) {
                    for (var i = 0; i < ComplaintList.length; i++) {
                        $("#ComplaintListtbl").dataTable().fnAddData([ComplaintList[i]["CUSTOMER_CODE"].toString(), ComplaintList[i]["CUSTOMER_NAME"].toString(), ComplaintList[i]["product_category_name"].toString(), ComplaintList[i]["city_code"].toString(), ComplaintList[i]["complaint_tracking_no"].toString()]);
                    }
                }
                else {
                    $("#ComplaintListtbl").DataTable().fnClearTable();
                }


                //PlantwiseNetLossApprovedforSheeting
                if (PlantwiseNetLossApprovedforSheeting != "" || PlantwiseNetLossApprovedforSheeting != null) {
                    for (var i = 0; i < PlantwiseNetLossApprovedforSheeting.length; i++) {
                        $("#PlantwiseNetLossApprovedforSheetingtbl").dataTable().fnAddData([PlantwiseNetLossApprovedforSheeting[i]["plant_name"].toString(), PlantwiseNetLossApprovedforSheeting[i]["Net Loss"].toString()]);
                    }
                }
                else {
                    $("#PlantwiseNetLossApprovedforSheetingtbl").DataTable().fnClearTable();
                }


                //PlantwiseComplaintClousereInformation
                if (PlantwiseComplaintClousereInformation != "" || PlantwiseComplaintClousereInformation != null) {
                    for (var i = 0; i < PlantwiseComplaintClousereInformation.length; i++) {
                        $("#PlantwiseComplaintClousereInformationtbl").dataTable().fnAddData([PlantwiseComplaintClousereInformation[i]["plant_name"].toString(), PlantwiseComplaintClousereInformation[i]["No of Complaints"].toString()]);
                    }
                }
                else {
                    $("#PlantwiseComplaintClousereInformationtbl").DataTable().fnClearTable();
                }


                //PlantwiseNetLossApprovalforOtherProducts
                if (PlantwiseNetLossApprovalforOtherProducts != "" || PlantwiseNetLossApprovalforOtherProducts != null) {
                    for (var i = 0; i < PlantwiseNetLossApprovalforOtherProducts.length; i++) {
                        $("#PlantwiseNetLossApprovalforOtherProductstbl").dataTable().fnAddData([PlantwiseNetLossApprovalforOtherProducts[i]["plant_name"].toString(), PlantwiseNetLossApprovalforOtherProducts[i]["Net Loss"].toString()]);
                    }
                }
                else {
                    $("#PlantwiseNetLossApprovalforOtherProductstbl").DataTable().fnClearTable();
                }


                //NetLossApprovedforotherProducts
                if (NetLossApprovedforotherProducts != "" || NetLossApprovedforotherProducts != null) {
                    for (var i = 0; i < NetLossApprovedforotherProducts.length; i++) {
                        $("#NetLossApprovedforotherProductstbl").dataTable().fnAddData(
                            [NetLossApprovedforotherProducts[i]["PRODUCT_TYPE_CODE"].toString(),
                                NetLossApprovedforotherProducts[i]["DOC_STATUS"].toString(),
                                NetLossApprovedforotherProducts[i]["month1"].toString(),
                                NetLossApprovedforotherProducts[i]["month2"].toString(),
                                NetLossApprovedforotherProducts[i]["month3"].toString(),
                                NetLossApprovedforotherProducts[i]["month4"].toString(),
                                NetLossApprovedforotherProducts[i]["month5"].toString(),
                                NetLossApprovedforotherProducts[i]["month6"].toString(),
                                NetLossApprovedforotherProducts[i]["month7"].toString(),
                                NetLossApprovedforotherProducts[i]["month8"].toString(),
                                NetLossApprovedforotherProducts[i]["month9"].toString(),
                                NetLossApprovedforotherProducts[i]["month10"].toString(),
                                NetLossApprovedforotherProducts[i]["month11"].toString(),
                                NetLossApprovedforotherProducts[i]["month12"].toString()

                            ]);
                    }
                }
                else {
                    $("#NetLossApprovedforotherProductstbl").DataTable().fnClearTable();
                }


                //NetLossApprovedforotherSheeting
                if (NetLossApprovedforotherSheeting != "" || NetLossApprovedforotherSheeting != null) {
                    for (var i = 0; i < NetLossApprovedforotherSheeting.length; i++) {
                        $("#NetLossApprovedforotherSheetingtbl").dataTable().fnAddData(
                            [NetLossApprovedforotherSheeting[i]["PRODUCT_TYPE_CODE"].toString(),
                                NetLossApprovedforotherSheeting[i]["DOC_STATUS"].toString(),
                                NetLossApprovedforotherSheeting[i]["month1"].toString(),
                                NetLossApprovedforotherSheeting[i]["month2"].toString(),
                                NetLossApprovedforotherSheeting[i]["month3"].toString(),
                                NetLossApprovedforotherSheeting[i]["month4"].toString(),
                                NetLossApprovedforotherSheeting[i]["month5"].toString(),
                                NetLossApprovedforotherSheeting[i]["month6"].toString(),
                                NetLossApprovedforotherSheeting[i]["month7"].toString(),
                                NetLossApprovedforotherSheeting[i]["month8"].toString(),
                                NetLossApprovedforotherSheeting[i]["month9"].toString(),
                                NetLossApprovedforotherSheeting[i]["month10"].toString(),
                                NetLossApprovedforotherSheeting[i]["month11"].toString(),
                                NetLossApprovedforotherSheeting[i]["month12"].toString()

                            ]);
                    }
                }
                else {
                    $("#NetLossApprovedforotherSheetingtbl").DataTable().fnClearTable();
                }



            }
        })
    }



});


function GetComplaintTrackingNumber(obj) {
    ComplaintStatusReport.$apply(function () {
        ComplaintStatusReport.Complaint_Tracking_Number = $(obj).children().eq(1).html();
        ComplaintStatusReport.Customer_Name = $(obj).children().eq(4).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

// svprasadk 28-08-2020 get plant list for sbu3 start
function GetPlantList(obj) {
    ComplaintStatusReport.$apply(function () {
        ComplaintStatusReport.PLANT_CODE = $(obj).children().eq(1).html();
        ComplaintStatusReport.PLANT_NAME = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
// svprasadk 28-08-2020 get plant list for sbu3 end


function GetStockistCompensationSheet(TrackingNo) {
    try {

        //  alert(TrackingNo);

        if (TrackingNo == "") {
            //alert("Please Enter Tracking No");
            return;
        }
        else {
            window.open('../../ComplaintReports/Report_Compensation?CTN=' + TrackingNo + '');
        }

    }
    catch (e) {
        alert("Error : GetStockistCompensationSheet : " + e);
    }

}
