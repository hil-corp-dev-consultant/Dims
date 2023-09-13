
// DEVELOPED BY :SHIVA KIRAN
// ORGANISATION :ENVISION
// CREATED DATE :15-12-2015
// MODIFIED DATE:17-02-2016
// MAIN APPLICATION JS


// GLOBAL VARIABLE DECLARATION
var ToolTipvalue = "You can select columns here";
//"You can select columns with advance button";
var CorrectivemeasureScope;
var CustomerMasterScope;
var PlantMasterScope;
var NoticeConfigScope;
var CompensationListScope;
var SERVER_TIME;
var CorrectiveMeasureListTable;
var CompensationListTable;
var CompensationScope;
var CorrectiveMeasureListScope;
// Unnati report variables declaration
var UnnatiPointBalanceListScope;
var UnnatiMemberLoginReportScope;
var UnnatiTransactionDetailReportScope;
var UnnatiTransactionVelocityReportScope;
var UnnatiEnrollmentDetailReportScope;
var UnnatiTransactionStatusReportScope;
var UnnatiRedemptionScope;
var UnnatiTransactionSummaryReportScope;
// end 

// SFDC
var InvoiceListScope;
var complaintRegistrationScope;
var InvestigationListScope;
var ltn;
var CustomColumnID = "0";
var ControllerName = "HomeController";
var currentColumnIndex;

// svprasadk 04-08-2020 SBU3 Stock Transfer implementation start
var complaintRegistrationScope_STO;
var InvestigationListScope_STO;
// svprasadk 04-08-2020 SBU3 Stock Transfer implementation end

//SAP
var PaymentByStockistScope;
var TDSCertificateScope;
var AccountStatementScope;
var CreditNoteScope;
var DebitNoteScope;
// Module creation

var PreviousRowData;
var CallingObject;
var InlineeditingTable;
var InlinePreviousCellValue;
var InlineColumnIndex;
var TableDataTable;
var UserSelectedColumnName;

var StockistZone = "";
var StockistState = "";
var StockistDistrict = "";
var UnnatiMembershipID = "";
var table_CustomerMapping = "";

//var DIMS = angular.module('DIMSApp', ['ui.router']);
var DIMS = angular.module('DIMSApp', ['ngRoute']);


// PROJECT ROUTING
DIMS.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    CheckUserSession();

    
   

    $routeProvider.when('/home', { templateUrl: '../../Home/Template/Homepage', controller: "HomeCtrl" })
    $routeProvider.when('/Invoice', { url: 'Invoice', templateUrl: '../../Home/Template/Invoice', controller: "InvoiceCtrl" })
    $routeProvider.when('/InvList', { url: 'InvList', templateUrl: '../../Home/Template/InvList', controller: "InvoiceListCtrl" })
    $routeProvider.when('/Temp', { url: 'Invoice', templateUrl: '../../Home/Template/Temp', controller: "TempCtrl" })



    // COMPLAINT MANAGEMENT
    $routeProvider.when('/Registration', { url: 'Registration', templateUrl: '../../Home/Template/Registration', controller: "RegistrationCtrl" })
    $routeProvider.when('/Registration/:ID', { url: 'Registration', templateUrl: '../../Home/Template/Registration', controller: "RegistrationCtrl" })
    $routeProvider.when('/RegistrationList', { url: 'RegistrationList', templateUrl: '../../Home/Template/RegistrationList', controller: "RegistrationListCtrl" })
    $routeProvider.when('/Investigation', { url: 'Investigation', templateUrl: '../../Home/Template/Investigation', controller: "InvestigationCtrl" })
    $routeProvider.when('/Investigation/:ID', { url: 'Investigation', templateUrl: '../../Home/Template/Investigation', controller: "InvestigationCtrl" })
    $routeProvider.when('/InvestigationList', { url: 'InvestigationList', templateUrl: '../../Home/Template/InvestigationList', controller: "InvestigationListCtrl" })
    $routeProvider.when('/Compensation', { url: 'Compensation', templateUrl: '../../Home/Template/Compensation', controller: "CompensationCtrl" })
    $routeProvider.when('/Compensation/:ID', { url: 'Compensation', templateUrl: '../../Home/Template/Compensation', controller: "CompensationCtrl" })
    $routeProvider.when('/CompensationList', { url: 'CompensationList', templateUrl: '../../Home/Template/CompensationList', controller: "CompensationListCtrl" })
    $routeProvider.when('/CorrectiveMeasureList', { url: 'CorrectiveMeasureList', templateUrl: '../../Home/Template/CorrectiveMeasureList', controller: "CorrectiveMeasureListCtrl" })
    $routeProvider.when('/CorrectiveMeasure', { url: 'CorrectiveMeasure', templateUrl: '../../Home/Template/CorrectiveMeasure', controller: "CorrectiveMeasureCtrl" })
    $routeProvider.when('/CorrectiveMeasure/:ID', { url: 'CorrectiveMeasure', templateUrl: '../../Home/Template/CorrectiveMeasure', controller: "CorrectiveMeasureCtrl" })

    $routeProvider.when('/SampleScreen', { url: 'SampleScreen', templateUrl: '../../Home/Template/SampleScreen', controller: "SampleScreenCtrl" })

    // svprasadk 20-07-2020 SBU3 Stock Transfer implementation start
    $routeProvider.when('/Registration_STO', { url: 'Registration_STO', templateUrl: '../../Home/Template/Registration_STO', controller: "RegistrationCtrl_STO" })
    $routeProvider.when('/Registration_STO/:ID', { url: 'Registration_STO', templateUrl: '../../Home/Template/Registration_STO', controller: "RegistrationCtrl_STO" })
    $routeProvider.when('/RegistrationList_STO', { url: 'RegistrationList_STO', templateUrl: '../../Home/Template/RegistrationList_STO', controller: "RegistrationListCtrl_STO" })
    $routeProvider.when('/Investigation_STO', { url: 'Investigation_STO', templateUrl: '../../Home/Template/Investigation_STO', controller: "InvestigationCtrl_STO" })
    $routeProvider.when('/Investigation_STO/:ID', { url: 'Investigation_STO', templateUrl: '../../Home/Template/Investigation_STO', controller: "InvestigationCtrl_STO" })
    $routeProvider.when('/InvestigationList_STO', { url: 'InvestigationList_STO', templateUrl: '../../Home/Template/InvestigationList_STO', controller: "InvestigationListCtrl_STO" })
    // svprasadk 20-07-2020 SBU3 Stock Transfer implementation end

    // ADMINISTRATION MASTER CONFIGURATION 

    $routeProvider.when('/Master', { url: 'Master', templateUrl: '../../Home/Template/Master', controller: "MasterConfigCtrl" })
    $routeProvider.when('/CreateEmployee', { url: 'CreateEmployee', templateUrl: '../../Home/Template/CreateEmployee', controller: "CreateEmployeeCtrl" })
    $routeProvider.when('/StockistDetails', { url: 'StockistDetails', templateUrl: '../../Home/Template/StockistDetails', controller: "StockistDetailsCtrl" });
    $routeProvider.when('/LoginAuditLog', { url: 'LoginAuditLog', templateUrl: '../../Home/Template/LoginAuditLog', controller: "LoginAuditLogCtrl" });
    $routeProvider.when('/ApplicationLog', { url: 'ApplicationLog', templateUrl: '../../Home/Template/ApplicationLog', controller: "ApplicationLogCtrl" });

    $routeProvider.when('/DocumentSeries', { url: 'DocumentSeries', templateUrl: '../../Home/Template/DocumentSeries', controller: "DocumentSeriesCtrl" })
    $routeProvider.when('/DocumentSeries/:ID', { url: 'DocumentSeries', templateUrl: '../../Home/Template/DocumentSeries', controller: "DocumentSeriesCtrl" })
    $routeProvider.when('/CustomerMaster', { url: 'CustomerMaster', templateUrl: '../../Home/Template/CustomerMasterCreate', controller: "CustomerMasterCtrl" })
    $routeProvider.when('/PlantMaster', { url: 'PlantMaster', templateUrl: '../../Home/Template/PlantMaster', controller: "PlantMasterCtrl" })
    $routeProvider.when('/PlantMaster/:ID', { url: 'PlantMaster', templateUrl: '../../Home/Template/PlantMaster', controller: "PlantMasterCtrl" })

    $routeProvider.when('/NoticeConfiguration', { url: 'NoticeConfiguration', templateUrl: '../../Home/Template/NoticeConfiguration', controller: "NoticeConfigurationCtrl" })
    $routeProvider.when('/NoticeConfiguration/:ID', { url: 'NoticeConfiguration', templateUrl: '../../Home/Template/NoticeConfiguration', controller: "NoticeConfigurationCtrl" })

    //Role Access Configuration
    $routeProvider.when('/RoleAccessConfiguration', { url: 'RoleAccessConfiguration', templateUrl: '../../Home/Template/RoleAccessConfiguration', controller: "RoleAccessConfigurationCtrl" })
    $routeProvider.when('/CMSDashboard', { url: 'CMSDashboard', templateUrl: '../../Home/Template/CMSDashboard', controller: "CMSDashboardCtrl" })
    ////svprasadk 31-08-2020 getting CMS Graphical Dashboard start
    $routeProvider.when('/CMSGraphicalDashboard', { url: 'CMSGraphicalDashboard', templateUrl: '../../Home/Template/CMSGraphicalDashboard', controller: "CMSGraphicalDashboardCtrl" })
    ////svprasadk 31-08-2020 getting CMS Graphical Dashboard end


    // COMPLAINT APPROVAL
    $routeProvider.when('/ComplaintPendingApproval', { url: 'ComplaintPendingApproval', templateUrl: '../../Home/Template/ComplaintPendingApproval', controller: "ComplaintPendingApprovalCtrl" })
    $routeProvider.when('/ComplaintsAssigning', { url: 'ComplaintsAssigning', templateUrl: '../../Home/Template/ComplaintsAssigning', controller: "ComplaintsAssigningCtrl" })
    $routeProvider.when('/ComplaintsApprovalReport', { url: 'ComplaintsApprovalReport', templateUrl: '../../Home/Template/ComplaintsApprovalReport', controller: "ComplaintsApprovalReportCtrl" })
    $routeProvider.when('/PendingApprovalCommercial', { url: 'PendingApprovalCommercial', templateUrl: '../../Home/Template/PendingApprovalCommercial', controller: "PendingApprovalCommercialCtrl" })


    // COMPLAINT REPORTS
    $routeProvider.when('/ComplaintStatusReport', { url: 'ComplaintStatusReport', templateUrl: '../../Home/Template/ComplaintStatusReport', controller: "ComplaintStatusReportCtrl" })
    $routeProvider.when('/CMS_Management_Information_System', { url: 'CMS_Management_Information_System', templateUrl: '../../Home/Template/CMS_Management_Information_System', controller: "CMS_Management_Information_SystemCtrl" })
    $routeProvider.when('/ComplaintsDetailedReport', { url: 'ComplaintsDetailedReport', templateUrl: '../../Home/Template/ComplaintsDetailedReport', controller: "ComplaintsDetailedReportCtrl" })
    $routeProvider.when('/StockistCompensation', { url: 'StockistCompensation', templateUrl: '../../Home/Template/StockistCompensation', controller: "StockistCompensationCtrl" })
    $routeProvider.when('/CMS_Dashboard', { url: 'CMS_Dashboard', templateUrl: '../../Home/Template/CMS_Dashboard', controller: "CMS_DashboardCtrl" })
    //svprasadk 31-08-2020 getting CMS Graphical Dashboard start
    //$routeProvider.when('/CMS_Graphical_Dashboard', { url: 'CMS_Graphical_Dashboard', templateUrl: '../../Home/Template/CMS_Graphical_Dashboard', controller: "CMS_Graphical_DashboardCtrl" })
    //svprasadk 31-08-2020 getting CMS Graphical Dashboard end

    //SAP
    $routeProvider.when('/AccountStatement', { url: 'AccountStatement', templateUrl: '../../Home/Template/AccountStatement', controller: "AccountStatementCtrl" })
    $routeProvider.when('/AccountStatementSummary/:ID', { url: 'AccountStatementSummary', templateUrl: '../../Home/Template/AccountStatementSummary', controller: "AccountStatementSummaryCtrl" })
    $routeProvider.when('/CreditNotes', { url: 'CreditNotes', templateUrl: '../../Home/Template/CreditNotes', controller: "CreditNotesCtrl" })
    $routeProvider.when('/DebitNotes', { url: 'DebitNotes', templateUrl: '../../Home/Template/DebitNotes', controller: "DebitNotesCtrl" })
    $routeProvider.when('/InvoiceDetail', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail', controller: "InvoiceDetailCtrl" })
    $routeProvider.when('/InvoiceDetail_ZINV_Plant/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZINV_Plant', controller: "InvoiceDetail_ZINV_PlantCtrl" })
    $routeProvider.when('/InvoiceDetail_ZINV_Depo/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZINV_Depo', controller: "InvoiceDetail_ZINV_DepoCtrl" })
    $routeProvider.when('/InvoiceDetail_ZFOC_Plant/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZFOC_Plant', controller: "InvoiceDetail_ZFOC_PlantCtrl" })
    $routeProvider.when('/InvoiceDetail_ZFOC_Depo/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZFOC_Depo', controller: "InvoiceDetail_ZFOC_DepoCtrl" })


    $routeProvider.when('/InvoiceDetail_ZINV_Plant_GST/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZINV_Plant_GST', controller: "InvoiceDetail_ZINV_Plant_GSTCtrl" })
    $routeProvider.when('/InvoiceDetail_ZINV_Depo_GST/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZINV_Depo_GST', controller: "InvoiceDetail_ZINV_Depo_GSTCtrl" })
    $routeProvider.when('/InvoiceDetail_ZFOC_Plant_GST/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZFOC_Plant_GST', controller: "InvoiceDetail_ZFOC_Plant_GSTCtrl" })
    $routeProvider.when('/InvoiceDetail_ZFOC_Depo_GST/:ID', { url: 'InvoiceDetail', templateUrl: '../../Home/Template/InvoiceDetail_ZFOC_Depo_GST', controller: "InvoiceDetail_ZFOC_Depo_GSTCtrl" })






    $routeProvider.when('/InvoiceListView', { url: 'InvoiceListView', templateUrl: '../../Home/Template/InvoiceListView', controller: "InvoiceListViewCtrl" })
    $routeProvider.when('/OutstandingDetail', { url: 'OutstandingDetail', templateUrl: '../../Home/Template/OutstandingDetail', controller: "OutstandingDetailCtrl" })
    $routeProvider.when('/CreditOutstandingDetail', { url: 'CreditOutstandingDetail', templateUrl: '../../Home/Template/CreditOutstandingDetail', controller: "CreditOutstandingDetailCtrl" })
    $routeProvider.when('/PaymentByStockist', { url: 'PaymentByStockist', templateUrl: '../../Home/Template/PaymentByStockist', controller: "PaymentByStockistCtrl" })
    $routeProvider.when('/SAP_DashBoard', { url: 'SAP_DashBoard', templateUrl: '../../Home/Template/SAP_DashBoard', controller: "SAP_DashBoardCtrl" })
    $routeProvider.when('/PendingCForms', { url: 'PendingCForms', templateUrl: '../../Home/Template/PendingCForms', controller: "PendingCFormsCtrl" })
    $routeProvider.when('/TDSCertificate/:ID', { url: 'TDSCertificate', templateUrl: '../../Home/Template/TDSCertificate', controller: "TDSCertificateCtrl" })
    $routeProvider.when('/TDSCertificateList', { url: 'TDSCertificateList', templateUrl: '../../Home/Template/TDSCertificateList', controller: "TDSCertificateListCtrl" })
    $routeProvider.when('/CreditNotesDetails', { url: 'CreditNotesDetails', templateUrl: '../../Home/Template/CreditNotesDetails', controller: "CreditNotesDetailsCtrl" })
    $routeProvider.when('/CreditNotesDetails/:ID', { url: 'CreditNotesDetails', templateUrl: '../../Home/Template/CreditNotesDetails', controller: "CreditNotesDetailsCtrl" })

    $routeProvider.when('/DebitNotesDetails/:ID', { url: 'DebitNotesDetails', templateUrl: '../../Home/Template/DebitNotesDetails', controller: "DebitNotesDetailsCtrl" })


    //Employee Role Configuration
    $routeProvider.when('/EmpRoleConfiguration', { url: 'EmpRoleConfiguration', templateUrl: '../../Home/Template/EmpRoleConfiguration', controller: "EmpRoleConfiguration" })
    //Employee Customer Configuration
    $routeProvider.when('/EmpCustomerConfiguration', { url: 'EmpCustomerConfiguration', templateUrl: '../../Home/Template/EmpCustomerConfiguration', controller: "EmpCustomerConfiguration" })
    $routeProvider.when('/CustomerFSOUpload', { url: 'CustomerFSOUpload', templateUrl: '../../Home/Template/CustomerFSOUpload', controller: "CustomerFSOUpload" })
    $routeProvider.when('/EmailConfigDailySalesTracker', { url: 'EmailConfigDailySalesTracker', templateUrl: '../../Home/Template/EmailConfigDailySalesTracker', controller: "EmailConfigDailySalesTracker" })


    
    //User Management
    $routeProvider.when('/AdminChangePasword', { url: 'AdminChangePasword', templateUrl: '../../Home/Template/AdminChangePasword', controller: "ChangePasswordsCtrl" })
    $routeProvider.when('/UserLoginImageSelection', { url: 'UserLoginImageSelection', templateUrl: '../../Home/Template/UserLoginImageSelection', controller: "UserLoginImageSelectionCtrl" })
    $routeProvider.when('/GetUserStockistList', { url: 'GetUserStockistList', templateUrl: '../../Home/Template/GetUserStockistList', controller: "GetUserStockistListCtrl" })
    $routeProvider.when('/GetUserEmployeeList', { url: 'GetUserEmployeeList', templateUrl: '../../Home/Template/GetUserEmployeeList', controller: "GetEmployeeStockistListCtrl" })
    $routeProvider.when('/GetUserList', { url: 'GetUserList', templateUrl: '../../Home/Template/UsersList', controller: "GetInActiveUserListCtrl" })
    $routeProvider.when('/GetActiveUserList', { url: 'GetActiveUserList', templateUrl: '../../Home/Template/GetActiveUserList', controller: "GetActiveUserListCtrl" })
    $routeProvider.when('/GetMonitorLog', { url: 'GetMonitorLog', templateUrl: '../../Home/Template/GetMonitorLog', controller: "GetMonitorLogCtrl" })


    // UNNATI MODULE
    // REPORTS
    $routeProvider.when('/UnnatiPointBalanceReport', { url: 'UnnatiPointBalanceReport', templateUrl: '../../Home/Template/UnnatiPointBalanceReport', controller: "UnnatiPointBalanceReportCtrl" })
    $routeProvider.when('/UnnatiRedemptionReport', { url: 'UnnatiRedemptionReport', templateUrl: '../../Home/Template/UnnatiRedemptionReport', controller: "UnnatiRedemptionReportCtrl" })
    $routeProvider.when('/UnnatiMemberLoginReport', { url: 'UnnatiMemberLoginReport', templateUrl: '../../Home/Template/UnnatiMemberLoginReport', controller: "UnnatiMemberLoginReportCtrl" })


    $routeProvider.when('/UnnatiTransactionDetailReport', { url: 'UnnatiTransactionDetailReport', templateUrl: '../../Home/Template/UnnatiTransactionDetailReport', controller: "UnnatiTransactionDetailReportCtrl" })
    $routeProvider.when('/UnnatiTransactionSummaryReport', { url: 'UnnatiTransactionSummaryReport', templateUrl: '../../Home/Template/UnnatiTransactionSummaryReport', controller: "UnnatiTransactionSummaryReportCtrl" })
    $routeProvider.when('/UnnatiTransactionVelocityReport', { url: 'UnnatiTransactionVelocityReport', templateUrl: '../../Home/Template/UnnatiTransactionVelocityReport', controller: "UnnatiTransactionVelocityReportCtrl" })

    $routeProvider.when('/UnnatiEnrollmentDetailReport', { url: 'UnnatiEnrollmentDetailReport', templateUrl: '../../Home/Template/UnnatiEnrollmentDetailReport', controller: "UnnatiEnrollmentDetailReportCtrl" })
    $routeProvider.when('/UnnatiTransactionStatusReport', { url: 'UnnatiTransactionStatusReport', templateUrl: '../../Home/Template/UnnatiTransactionStatusReport', controller: "UnnatiTransactionStatusReportCtrl" })
    $routeProvider.when('/UnnatiEmployeeRedemptionReport', { url: 'UnnatiEmployeeRedemptionReport', templateUrl: '../../Home/Template/UnnatiEmployeeRedemptionReport', controller: "UnnatiEmployeeRedemptionReportCtrl" })
    $routeProvider.when('/UnnatiDashBoard', { url: 'UnnatiDashBoard', templateUrl: '../../Home/Template/UnnatiDashBoard', controller: "UnnatiDashBoardCtrl" })
    $routeProvider.when('/UnnatiCustomerMapping', { url: 'UnnatiCustomerMapping', templateUrl: '../../Home/Template/UnnatiCustomerMapping', controller: "UnnatiCustomerMappingCtrl" })
    $routeProvider.when('/UnnatiRewardsCatalogPoints', { url: 'UnnatiRewardsCatalogPoints', templateUrl: '../../Home/Template/UnnatiRewardsCatalogPoints', controller: "UnnatiRewardsCatalogPointsCtrl" })

    // REPORTS END
    // UNNATI MODULE END

    $routeProvider.otherwise({ redirectTo: '/home', controller: "HomeCtrl" });

    //SFDC Harish
    $routeProvider.when('/DailyOrderTracking', { url: 'DailyOrderTracking', templateUrl: '../../Home/Template/DailyOrderTracking', controller: "DailyOrderTracking" })
    $routeProvider.when('/JourneyPlanDetails', { url: 'JourneyPlanDetails', templateUrl: '../../Home/Template/JourneyPlanDetails', controller: "JourneyPlanDetails" })
    $routeProvider.when('/JourneyPlanList', { url: 'JourneyPlanList', templateUrl: '../../Home/Template/JourneyPlanList', controller: "JourneyPlanList" })
    $routeProvider.when('/MarketMap', { url: 'MarketMap', templateUrl: '../../Home/Template/MarketMap', controller: "MarketMapCtrl" })
    $routeProvider.when('/SchemesList', { url: 'SchemesList', templateUrl: '../../Home/Template/SchemesList', controller: "SchemesList" })
    $routeProvider.when('/AddScheme', { url: 'AddScheme', templateUrl: '../../Home/Template/AddScheme', controller: "AddScheme" })
    $routeProvider.when('/AddScheme/:ID', { url: 'AddScheme', templateUrl: '../../Home/Template/AddScheme', controller: "AddScheme" })
    $routeProvider.when('/EditScheme', { url: 'EditScheme', templateUrl: '../../Home/Template/EditScheme', controller: "EditScheme" })
    $routeProvider.when('/PartnerIssues', { url: 'PartnerIssues', templateUrl: '../../Home/Template/PartnerIssues', controller: "PartnerIssues" })
    $routeProvider.when('/SalesAchievements', { url: 'SalesAchievements', templateUrl: '../../Home/Template/SalesAchievements', controller: "SalesAchievements" })
    $routeProvider.when('/SalesAchievementMonthly', { url: 'SalesAchievementMonthly', templateUrl: '../../Home/Template/SalesAchievementMonthly', controller: "SalesAchievementMonthly" })

    $routeProvider.when('/ScoreCards', { url: 'ScoreCards', templateUrl: '../../Home/Template/ScoreCards', controller: "ScoreCards" })
    $routeProvider.when('/ScoreCardsDetails', { url: 'ScoreCardsDetails', templateUrl: '../../Home/Template/ScoreCardsDetails', controller: "ScoreCardsDetails" })
    $routeProvider.when('/ScoreCardsDetails/:ID', { url: 'ScoreCardsDetails', templateUrl: '../../Home/Template/ScoreCardsDetails', controller: "ScoreCardsDetails" })

    $routeProvider.when('/AddOrder', { url: 'AddOrder', templateUrl: '../../Home/Template/AddOrder', controller: "AddOrder" })
    $routeProvider.when('/AddOrder/:ID', { url: 'AddOrder', templateUrl: '../../Home/Template/AddOrder', controller: "AddOrder" })
    $routeProvider.when('/AddOrderForFSO', { url: 'AddOrderForFSO', templateUrl: '../../Home/Template/AddOrderForFSO', controller: "AddOrderForFSO" })
    $routeProvider.when('/AddOrderForFSO/:ID', { url: 'AddOrderForFSO', templateUrl: '../../Home/Template/AddOrderForFSO', controller: "AddOrderForFSO" })

    $routeProvider.when('/AddMarketMap', { url: 'AddMarketMap', templateUrl: '../../Home/Template/AddMarketMap', controller: "AddMarketMap" })
    $routeProvider.when('/AddMarketMap/:ID', { url: 'AddMarketMap', templateUrl: '../../Home/Template/AddMarketMap', controller: "AddMarketMap" })
    $routeProvider.when('/JourneyPlanDetails/:ID', { url: 'JourneyPlanDetails', templateUrl: '../../Home/Template/JourneyPlanDetails', controller: "JourneyPlanDetails" })
    $routeProvider.when('/AddPartnerIssues', { url: 'AddPartnerIssues', templateUrl: '../../Home/Template/AddPartnerIssues', controller: "AddPartnerIssues" })
    $routeProvider.when('/AddPartnerIssues/:ID', { url: 'AddPartnerIssues', templateUrl: '../../Home/Template/AddPartnerIssues', controller: "AddPartnerIssues" })
    $routeProvider.when('/InventoryTracking', { url: 'InventoryTracking', templateUrl: '../../Home/Template/InventoryTracking', controller: "InventoryTracking" })
    $routeProvider.when('/AddInventoryTrack', { url: 'AddInventoryTrack', templateUrl: '../../Home/Template/AddInventoryTrack', controller: "AddInventoryTrack" })
    $routeProvider.when('/AddNewCounter', { url: 'AddNewCounter', templateUrl: '../../Home/Template/AddNewCounter', controller: "AddNewCounter" })
    $routeProvider.when('/CounterList', { url: 'CounterList', templateUrl: '../../Home/Template/CounterList', controller: "CounterList" })
    $routeProvider.when('/AddNewCounter/:ID', { url: 'AddNewCounter', templateUrl: '../../Home/Template/AddNewCounter', controller: "AddNewCounter" })
    $routeProvider.when('/AddInventoryTrack/:ID', { url: 'AddInventoryTrack', templateUrl: '../../Home/Template/AddInventoryTrack', controller: "AddInventoryTrack" })


    $routeProvider.when('/Notification', { templateUrl: '../../Home/Template/Notification', controller: "Notification" })
    $routeProvider.when('/AddNotification', { templateUrl: '../../Home/Template/AddNotification', controller: "AddNotification" })
    $routeProvider.when('/SalesProcessDashboard', { url: 'SalesProcessDashboard', templateUrl: '../../Home/Template/SalesProcessDashboard', controller: "SalesProcessDashboard" })

    $routeProvider.when('/ZHJourneyPlanDetails', { url: 'ZHJourneyPlanDetails', templateUrl: '../../Home/Template/ZHJourneyPlanDetails', controller: "ZHJourneyPlanDetails" })
    $routeProvider.when('/ZHJourneyPlanDetails/:ID', { url: 'ZHJourneyPlanDetails', templateUrl: '../../Home/Template/ZHJourneyPlanDetails', controller: "ZHJourneyPlanDetails" })

    $routeProvider.when('/DeviationSummeryReport', { url: 'DeviationSummeryReport', templateUrl: '../../Home/Template/DeviationSummeryReport', controller: "DeviationSummeryReport" })






    $routeProvider.when('/RevenueDashboard', { url: 'RevenueDashboard', templateUrl: '../../Home/Template/RevenueDashboard', controller: "RevenueDashboard" })
   // $routeProvider.when('/RevenueDashboard', { templateUrl: '../../Home/Template/RevenueDashboard', controller: "RevenueDashboard" })

    //Mani
    $routeProvider.when('/CreateTarget', { url: 'CreateTarget', templateUrl: '../../Home/Template/CreateTarget', controller: "CreateTargetControl" })
    $routeProvider.when('/CreateTarget/:ID', { url: 'CreateTarget', templateUrl: '../../Home/Template/CreateTarget', controller: "CreateTargetControl" })
    $routeProvider.when('/CreateTargetList', { url: 'CreateTargetList', templateUrl: '../../Home/Template/CreateTargetList', controller: "CreateTargetListControl" })

    $routeProvider.when('/SalesHurdleList', { url: 'SalesHurdleList', templateUrl: '../../Home/Template/SalesHurdleList', controller: "SalesHurdleListControl" })
    $routeProvider.when('/SalesHurdleApproval', { url: 'SalesHurdleApproval', templateUrl: '../../Home/Template/SalesHurdleApproval', controller: "SalesHurdleApprovalControl" })

    $routeProvider.when('/HolidayConfiguration', { url: 'HolidayConfiguration', templateUrl: '../../Home/Template/HolidayConfiguration', controller: "HolidayConfigurationControl" })
    $routeProvider.when('/PartnerIssueSummary', { url: 'PartnerIssueSummary', templateUrl: '../../Home/Template/PartnerIssueSummary', controller: "PartnerIssueSummaryControl" })
    $routeProvider.when('/KeyStockistUpload', { url: 'KeyStockistUpload', templateUrl: '../../Home/Template/KeyStockistUpload', controller: "KeyStockistUploadControl" })


    // $locationProvider.html5Mode(true);
    // Specify HTML5 mode (using the History APIs) or HashBang syntax.

    //Reports Module

    $routeProvider.when('/DailySalesTracker', { url: 'DailySalesTracker', templateUrl: '../../Home/Template/DailySalesTracker', controller: "DailySalesTrackerControl" })
    $routeProvider.when('/BudgetTargetUpload', { url: 'BudgetTargetUpload', templateUrl: '../../Home/Template/BudgetTargetUpload', controller: "BudgetTargetUploadControl" })
    $routeProvider.when('/PriceCardRateUpload', { url: 'PriceCardRateUpload', templateUrl: '../../Home/Template/PriceCardRateUpload', controller: "PriceCardRateUploadControl" })
    $routeProvider.when('/DiscountSummary', { url: 'DiscountSummary', templateUrl: '../../Home/Template/DiscountSummary', controller: "DiscountSummaryControl" })

    $routeProvider.when('/FreightUpload', { url: 'FreightUpload', templateUrl: '../../Home/Template/FreightUpload', controller: "FreightUploadControl" })
    $routeProvider.when('/DiscountsUpload', { url: 'DiscountsUpload', templateUrl: '../../Home/Template/DiscountsUpload', controller: "DiscountsUploadControl" })
    $routeProvider.when('/CreditLimitTracker', { url: 'CreditLimitTracker', templateUrl: '../../Home/Template/CreditLimitTracker', controller: "CreditLimitTrackerController" })


    // end Reports Module

    //hanumanth    
    $routeProvider.when('/ProjectDiscountWithCommission', { url: 'ProjectDiscountWithCommission', templateUrl: '../../Home/Template/ProjectDiscountWithCommission', controller: "ProjectDiscountWithCommissionControl" })

    $routeProvider.when('/ProjectDiscountWithCommission/:ID', { url: 'ProjectDiscountWithCommission', templateUrl: '../../Home/Template/ProjectDiscountWithCommission', controller: "ProjectDiscountWithCommissionControl" })

    $routeProvider.when('/ProjectDiscountDirectBilling', { url: 'ProjectDiscountDirectBilling', templateUrl: '../../Home/Template/ProjectDiscountDirectBilling', controller: "ProjectDiscountDirectBillingControl" })

    $routeProvider.when('/ProjectDiscountDirectBilling/:ID', { url: 'ProjectDiscountDirectBilling', templateUrl: '../../Home/Template/ProjectDiscountDirectBilling', controller: "ProjectDiscountDirectBillingControl" })

    $routeProvider.when('/ProjectDiscountWithCommissionList', { url: 'ProjectDiscountWithCommissionList', templateUrl: '../../Home/Template/ProjectDiscountWithCommissionList', controller: "ProjectDiscountWithCommissionListControl" })

    $routeProvider.when('/ProjectDiscountDirectBillingList', { url: 'ProjectDiscountDirectBillingList', templateUrl: '../../Home/Template/ProjectDiscountDirectBillingList', controller: "ProjectDiscountDirectBillingListControl" })

    $routeProvider.when('/NetBillingForStockist', { url: 'NetBillingForStockist', templateUrl: '../../Home/Template/NetBillingForStockist', controller: "NetBillingForStockistControl" })

    $routeProvider.when('/DiscountStructure', { url: 'DiscountStructure', templateUrl: '../../Home/Template/DiscountStructure', controller: "DiscountStructureControl" })

    $routeProvider.when('/KSMReport', { url: 'KSMReport', templateUrl: '../../Home/Template/KSMReport', controller: "KSMReportControl" })

    $routeProvider.when('/NetBillingForStockistNew', { url: 'NetBillingForStockistNew', templateUrl: '../../Home/Template/NetBillingForStockistNew', controller: "NetBillingForStockistNewControl" })

    $routeProvider.when('/NetBillingForStockistNew/:ID', { url: 'NetBillingForStockistNew', templateUrl: '../../Home/Template/NetBillingForStockistNew', controller: "NetBillingForStockistNewControl" })

    $routeProvider.when('/DiscountStructureNew', { url: 'DiscountStructureNew', templateUrl: '../../Home/Template/DiscountStructureNew', controller: "DiscountStructureNewControl" })

    $routeProvider.when('/DiscountStructureNew/:ID', { url: 'DiscountStructureNew', templateUrl: '../../Home/Template/DiscountStructureNew', controller: "DiscountStructureNewControl" })

    $routeProvider.when('/KSMReportDetail', { url: 'KSMReportDetail', templateUrl: '../../Home/Template/KSMReportDetail', controller: "KSMReportDetailControl" })
    // end Hanumanth

}]);


DIMS.factory('DIMSFactory', function ($http, $window) {
    return {
        getTempData: function () {

            return $http.get('../../Home/getData');
        },
        getMasterData: function (masterType) {
            return $http({ url: '../../Home/getMasterData', method: 'POST', data: { MasterType: masterType } });
        },
        getAllMasters: function (Value) {
            return $http({
                url: '../../Master/getData',
                method: 'POST',
                data: { Val: Value }
            })
        },
        getMasterClickData: function (Value) {
            return $http({
                url: '../../Master/Getlist',
                method: 'POST',
                data: { Val: Value }
            })
        },
        getComplAssnUserData: function (Value, Value1) {
            return $http({
                url: '../../Master/GetComplAssgnUserData',
                method: 'POST',
                data: { Val: Value, Val1: Value1 }
            })
        },
        getXmlData: function (MasterName) {
            return $http({
                url: '../../Master/GetXmlData',
                method: 'POST',
                data: { MasterName: MasterName }
            })
        },
        SaveMasterData: function (Master_Data) {
            return $http({
                url: '../../Master/SaveMasterData',
                method: 'POST',
                data: { MasterData: Master_Data }
            })
        },
        UpdateMasterData: function (Master_Data) {
            return $http({
                url: '../../Master/UpdateMasterData',
                method: 'POST',
                data: { MasterData: Master_Data }
            })
        },
        DeleteMasterData: function (Master_Data) {

            return $http({
                url: '../../Master/DeleteMasterData',
                method: 'POST',
                data: { MasterData: Master_Data }
            })
        },

        getReportListData: function (data) {
            return $http({ url: '../../ComplaintRegistration/getReportListData', method: 'POST', data: { Data: data } });
        },
        saveCompensationData: function (Data) {
            return $http({ url: '../../ComplaintRegistration/SaveCompensationData', method: 'POST', data: { SaveData: Data } });
        },
        UpdateCreditNoteData: function (Data) {
            return $http({ url: '../../ComplaintRegistration/UpdateCreditNoteData', method: 'POST', data: { SaveData: Data } });
        },
        deleteCompensationData: function (Data) {

            return $http({ url: '../../ComplaintRegistration/DeleteCompensationData', method: 'POST', data: { SaveData: Data } });
        },

        saveCorrectiveData: function (Data) {

            return $http({ url: '../../CorrectiveMeasure/SaveCorrectiveData', method: 'POST', data: { SaveData: Data } });
        },
        deleteCorrectiveData: function (Data) {

            return $http({ url: '../../CorrectiveMeasure/DeleteCorrectiveData', method: 'POST', data: { SaveData: Data } });
        },

        getCorrectiveMeasureData: function (masterType) {

            return $http({ url: '../../CorrectiveMeasure/getCorrectiveMeasureData', method: 'POST', data: { Data: masterType } });
        },
        getCompensationChildData: function (masterType) {

            return $http({ url: '../../ComplaintRegistration/getCompensationChildData', method: 'POST', data: { Data: masterType } });
        },

        getCompensationData: function (masterType) {


            return $http({ url: '../../ComplaintRegistration/getCompensationData', method: 'POST', data: { Data: masterType } });
        },
        // Custom column framework functions


        SaveColumnEditingData_InputParameter: function (ReportName, UserCode, WhereClause, Data, TableName) {

            var SelectedColumn = new Array();
            var UserSelectedColumn = new Array();
            $("#undo_redo_to option").each(function () {
                UserSelectedColumn.push({
                    "data": $(this).val(),
                    "name": $(this).val()
                });
                SelectedColumn.push($(this).val());

            });
            UserSelectedColumnName = UserSelectedColumn;
            if (SelectedColumn.length != 0) {
                var selectdata = JSON.stringify({
                    "ID": CustomColumnID,
                    "ColumnNames": SelectedColumn,
                    "ReportName": ReportName,
                    "UserCode": UserCode,
                    "WhereClause": WhereClause,
                    "Type": "Get"

                });
                var reference = this;
                this.saveSelectedColumnData(selectdata).success(function (data) {

                    //var response = (data.tabledata);
                    if (data != "FALSE") {

                        var response = data.split("$$");
                        CustomColumnID = response[1];
                        alert("Saved Successfully");

                        $("#ColumnEditingModal").modal('hide');
                        // getting data to display in datatable
                        reference.getReportData(Data).success(function (response) {
                            //var Result = JSON.parse(response.tabledata);
                            //if (Result != "") {
                            // var ReportList_data = Result["ReportListData"];
                            getLookUpData_Reports_ServerSideBinding("", "", "", TableName, UserSelectedColumnName);
                            //}

                        });

                    } else {
                        alert("Error in saving data");
                    }

                });
                // debugger;


            } else {
                alert("Please select any one column name and click on right direction arrow");
            }

        },

        SaveColumnEditingData: function (ReportName, UserCode, WhereClause) {

            var SelectedColumn = new Array();
            $("#undo_redo_to option").each(function () {

                SelectedColumn.push($(this).val());

            });
            if (SelectedColumn.length != 0) {
                var selectdata = JSON.stringify({
                    "ID": CustomColumnID,
                    "ColumnNames": SelectedColumn,
                    "ReportName": ReportName,
                    "UserCode": UserCode,
                    "WhereClause": WhereClause

                });
                this.saveSelectedColumnData(selectdata).success(function (data) {

                    //var response = (data.tabledata);
                    if (data != "FALSE") {
                        var response = data.split("$$");
                        CustomColumnID = response[1];
                        alert("Saved Successfully");
                        $("#ColumnEditingModal").modal('hide');
                        //$scope.pagereload();
                        $window.location.reload();
                        // $route.reload();

                    } else {
                        alert("Error in saving data");
                    }

                });
            } else {
                alert("Please select any one column name and click on right direction arrow");
            }

        },
        ViewColumnEditing: function (ReportName, UserCode, WhereClause, FromDate, ToDate) {

            var SelectedColumn = new Array();
            var UserSelectedColumn = new Array();
            $("#undo_redo_to option").each(function () {
                UserSelectedColumn.push({
                    "data": $(this).val(),
                    "name": $(this).val()
                });
                SelectedColumn.push($(this).val());

            });
            //UserSelectedColumnName = UserSelectedColumn;
            if (SelectedColumn.length != 0) {
                var selectdata = JSON.stringify({
                    "ID": CustomColumnID,
                    "ColumnNames": SelectedColumn,
                    "ReportName": ReportName,
                    "UserCode": UserCode,
                    "WhereClause": WhereClause,
                    "FromDate": FromDate,
                    "ToDate": ToDate,
                    "Type": "Preview"
                });
                this.previewSelectedColumnData(selectdata).success(function (data) {

                    //var Result = JSON.parse(data.tabledata);
                    //if (Result != "") {
                    //    var Custom_column_data = Result["ListData"];

                    //getLookUpData_Preview(Custom_column_data, "Preview", "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", "PreviewHeading");
                    getLookUpData_Preview_ServerSide("", "Preview", "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumn);
                    //}

                });
            } else {
                alert("Please select any one column name and click on right direction arrow");
            }
        },
        saveSelectedColumnData: function (Data) {

            return $http({ url: '../../Home/SaveSelectedColumnData', method: 'POST', data: { SaveData: Data } });
        },
        previewSelectedColumnData: function (data) {

            //return $http({ url: '../../Home/PreviewSelectedColumnData', method: 'POST', data: { SaveData: Data } });
            return $http({ url: '../../Home/getReportData', method: 'POST', data: { Data: data } });
        },
        //end

        // Reports with input parameter
        getReportListColumnNamesData: function (masterType) {


            return $http({ url: '../../Home/getReportListColumnNamesData', method: 'POST', data: { Data: masterType } });
        },
        getReportData: function (masterType) {


            return $http({ url: '../../Home/getReportData', method: 'POST', data: { Data: masterType } });
        },

        // UNNATI DROPDOWN FUNCTIONS 
        getZoneData: function (Data) {

            return $http({ url: '../../Unnati/getZoneData', method: 'POST', data: { InputData: Data } });
        },
        getStateData: function (Data) {

            return $http({ url: '../../Unnati/getStateData', method: 'POST', data: { InputData: Data } });
        },
        getDistrictData: function (Data) {

            return $http({ url: '../../Unnati/getDistrictData', method: 'POST', data: { InputData: Data } });
        },
        getTaulkData: function (Data) {

            return $http({ url: '../../Unnati/getTaulkData', method: 'POST', data: { InputData: Data } });
        },
        getVillageData: function (Data) {
            return $http({ url: '../../Unnati/getVillageData', method: 'POST', data: { InputData: Data } });
        },
        ComplaintStatusReportData: function (Data) {
            return $http({ url: '../../CorrectiveMeasure/getComplaintStatusReportData', method: 'POST', data: { InputData: Data } });
        },
        GetStockistCompensatinData: function (Data) {
            return $http({ url: '../../ComplaintReports/GetStockistCompensatinData', method: 'POST', data: { InputData: Data } });
        },
        getZoneDataForUnnati: function (DataForUnnati) {
            return $http({ url: '../../Home/GetFilters_Unnati', method: 'POST', data: { Data: DataForUnnati } });
        },
        getStateDataForUnnati: function (ZoneData) {

            return $http({ url: '../../Home/GetStatesforZone_Unnati', method: 'POST', data: { Data: ZoneData } });
        },
        GetZonesForSalesorganization: function (Data) {
            return $http({ url: '../../Home/GetZonesForSalesorganization', method: 'POST', data: { Data: Data } });
        },
        //Reports
        GetStatesBased_Location: function (Data) {
            return $http({ url: '../../Reports/GetStatesBased_Location', method: 'POST', data: { Data: Data } });
        },
        GetDiscountId: function () {
            return $http({ url: '../../Reports/GetDiscountId', method: 'Get' });
        },

        GetProjectDiscountWithCommisionDiscountID: function () {
            return $http({ url: '../../Reports/GetProjectDiscountWithCommisionDiscountID', method: 'Get' });
        },
        SaveDiscountsData: function (Data) {
            return $http({ url: '../../Reports/SaveDiscountsData', method: 'POST', data: { Data: Data } });
        },
        SaveProjectCommisionWithCommissionData: function (Data) {
            return $http({ url: '../../Reports/SaveProjectCommisionWithCommissionData', method: 'POST', data: { Data: Data } });
        },
        ChangeStatusToDiscounts: function (Data) {
            return $http({ url: '../../Reports/ChangeStatusForDiscounts', method: 'POST', data: { Data: Data } });

        },

        ChangeStatusForProjectDiscountWithCommission: function (Data) {
            return $http({ url: '../../Reports/ChangeStatusForProjectDiscountWithCommission', method: 'POST', data: { Data: Data } });

        },
        ChangeRejectedStatusToDiscounts: function (Data) {
            return $http({ url: '../../Reports/ChangeRejectedStatusForDiscounts', method: 'POST', data: { Data: Data } });

        },

        ChangeRejectedStatusForProjectDiscountWithCommission: function (Data) {
            return $http({ url: '../../Reports/ChangeRejectedStatusForProjectDiscountWithCommission', method: 'POST', data: { Data: Data } });

        },
        GetDiscountDataForEdit: function (Data) {
            return $http({ url: '../../Reports/GetDiscountDataForEdit', method: 'POST', data: { Data: Data } });

        },

        GetProjectDiscountWithCommissionDataForEdit: function (Data) {
            return $http({ url: '../../Reports/GetProjectDiscountWithCommissionDataForEdit', method: 'POST', data: { Data: Data } });

        },
        GetNetBillingId: function () {
            return $http({ url: '../../Reports/GetNetBillingId', method: 'Get' });
        },
        SaveNetBillingData: function (Data) {
            return $http({ url: '../../Reports/SaveNetBillingData', method: 'POST', data: { Data: Data } });
        },
        GetNetBillingDataForEdit: function (Data) {
            return $http({ url: '../../Reports/GetNetBillingDataForEdit', method: 'POST', data: { Data: Data } });

        },

        ChangeStatusToNetBilling: function (Data) {
            return $http({ url: '../../Reports/ChangeStatusToNetBilling', method: 'POST', data: { Data: Data } });

        },
        ChangeRejectedStatusToNetBilling: function (Data) {
            return $http({ url: '../../Reports/ChangeRejectedStatusToNetBilling', method: 'POST', data: { Data: Data } });

        },

        GetDirectBillingId: function () {
            return $http({ url: '../../Reports/GetDirectBillingId', method: 'Get' });
        },
        SaveDirectBillingData: function (Data) {
            return $http({ url: '../../Reports/SaveDirectBillingData', method: 'POST', data: { Data: Data } });
        },
        GetDirectBillingDataForEdit: function (Data) {
            return $http({ url: '../../Reports/GetDirectBillingDataForEdit', method: 'POST', data: { Data: Data } });
        },
        ChangeStatusToDirectBilling: function (Data) {
            return $http({ url: '../../Reports/ChangeStatusToDirectBilling', method: 'POST', data: { Data: Data } });

        },
        ChangeRejectedStatusToDirectBilling: function (Data) {
            return $http({ url: '../../Reports/ChangeRejectedStatusToDirectBilling', method: 'POST', data: { Data: Data } });

        },

        //Reports

    }
    // UNNATI DROPDOWN FUNCTIONS ENDS
    // End


});

DIMS.factory('DIMSUnnatiFactory', function ($http) {
    return {
        getDashBoardData: function (Data) {

            return $http({ url: '../../Unnati/getDashBoardData', method: 'POST', data: { InputData: Data } });
        },
        GetFilterDataForUnnatiDashboard: function (Data) {

            return $http({ url: '../../Unnati/GetFilterDataForUnnatiDashboard', method: 'POST', data: { InputData: Data } });
        },
        // Get Stockiest related dashboard data 
        getDashBoardStockiestData: function (Data) {

            return $http({ url: '../../Unnati/getDashBoardStockiestData', method: 'POST', data: { InputData: Data } });
        },
        getFilterDashBoardStockiestData: function (Data) {

            return $http({ url: '../../Unnati/getFilterDashBoardStockiestData', method: 'POST', data: { InputData: Data } });
        },
        getUnnatiEnrollmentData: function (Data) {

            return $http({ url: '../../Unnati/getUnnatiEnrollmentData', method: 'POST', data: { InputData: Data } });
        }
        ,
        updateCustomerID: function (Data) {

            return $http({ url: '../../Unnati/updateCustomerID', method: 'POST', data: { InputData: Data } });
        }

    }

});

DIMS.controller('UserLoginImageSelectionCtrl', function ($scope, $location, $compile, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "UserLoginImageSelection" };
    $scope.go = function (path) {
        $location.path(path);
    };

});
DIMS.controller('ChangePasswordsCtrl', function ($scope, $location, $compile, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "ChangePasswords" };
    $scope.go = function (path) {


        $location.path(path);
    };

});
DIMS.controller('CreateEmployeeCtrl', function ($scope, $location, $compile, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "CreateEmployee" };
    $scope.go = function (path) {


        $location.path(path);
    };

});
DIMS.controller('GetUserStockistListCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    UserStockistListScope = $scope;
    $scope.templatesettings = { HeaderTitle: "UserStockistList" };
    $scope.go = function (path) {
        $location.path(path);
    };
});
DIMS.controller('GetEmployeeStockistListCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    UserEmployeeListScope = $scope;
    $scope.templatesettings = { HeaderTitle: "UserEmployeeList" };
    $scope.go = function (path) {
        $location.path(path);
    };
});
DIMS.controller('GetInActiveUserListCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    UserEmployeeListScope = $scope;
    $scope.templatesettings = { HeaderTitle: "InActiveUserList" };
    $scope.go = function (path) {
        $location.path(path);
    };
});
DIMS.controller('GetActiveUserListCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    UserEmployeeListScope = $scope;
    $scope.templatesettings = { HeaderTitle: "ActiveUserList" };
    $scope.go = function (path) {
        $location.path(path);
    };
});

DIMS.controller('GetMonitorLogCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    UserEmployeeListScope = $scope;
    $scope.templatesettings = { HeaderTitle: "MonitorLogList" };
    $scope.go = function (path) {
        var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "GML" + "\",\"Action\":\"" + "Is_View" + "\"}";
        $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res == "True") {
                CheckUserSession();
                $location.path(path);
            }
            else {
                alert("You are not allowed to access this page");
                $location.path("home");
            }
        });      
    };

    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------

});


DIMS.controller('SampleScreenCtrl', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "SampleScreen" };
    $scope.go = function (path) {
        $location.path(path);
    };
});



// CONTROLLERS 
DIMS.controller('HomeCtrl', function ($scope, $location, $http) {

    $scope.templatesettings = { HeaderTitle: "Home" };
    $scope.popUpData = {};
    $scope.go = function (path) {


        if (path == "AccountStatement") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "AST" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {

                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "SAP_DashBoard") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "FD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "InvoiceListView") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "INV" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "OutstandingDetail") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "OD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "CreditNotes") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CN" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "DebitNotes") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "DN" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "PaymentByStockist") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PBS" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "PendingCForms") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PCF" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "TDSCertificateList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "TDSC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }

        else if (path == "DailyOrderTracking") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "DOT" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }

        else if (path == "SalesProcessDashboard") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "SPD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "MarketMap") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "MM" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "JourneyPlanList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "JP" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "ScoreCards") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "SCR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "InventoryTracking") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "IT" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "CreateTargetList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "TRG" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "SalesHurdleList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "SH" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "PartnerIssues") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PI" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "SchemesList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "SCHM" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "HolidayConfiguration") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "HC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "PartnerIssueSummary") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PIS" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "RegistrationList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "REG" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "Investigation") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "INVST" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "CompensationList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "COMP" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "CorrectiveMeasureList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CORM" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "ComplaintPendingApproval") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CPA" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "ComplaintsAssigning") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "AC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "ComplaintsApprovalReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CAR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "ComplaintStatusReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CSR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "StockistCompensation") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "SC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiDashBoard") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "UD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    // alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiTransactionStatusReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "TSTR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiTransactionSummaryReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "TSR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiTransactionDetailReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "TDR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiRedemptionReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "RR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiPointBalanceReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PBR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiEnrollmentDetailReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "EDR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiCustomerMapping") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "UM" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "UnnatiRewardsCatalogPoints") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "RC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }

        else if (path == "DailySalesTracker") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "DST" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "BudgetTargetUpload") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "BTU" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "ProjectDiscountWithCommissionList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PDWC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "ProjectDiscountDirectBillingList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PDDB" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "NetBillingForStockist") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "NBFS" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "DiscountStructure") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "DS" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "KSMReport") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "KR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "KSMReportDetail") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "KRD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "Master") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "MC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "DocumentSeries") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "DCS" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "EmpRoleConfiguration") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "ERC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "EmpCustomerConfiguration") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "ECC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "RoleAccessConfiguration") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "RAC" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "CMSDashboard") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CMSD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        //svprasadk 31-08-2020 getting CMS Graphical Dashboard start
        else if (path == "CMSGraphicalDashboard") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CMSGD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        //svprasadk 31-08-2020 getting CMS Graphical Dashboard end
        else if (path == "AdminChangePasword") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CP" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "GetActiveUserList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "ACL" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "GetUserEmployeeList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CUFE" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "GetUserStockistList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "CUFS" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }
        else if (path == "GetUserList") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "IAUL" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }



        else if (path == "StockistDetails") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "SD" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }



        else if (path == "LoginAuditLog") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "LAL" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }

        else if (path == "ApplicationLog") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "LAL" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }


        else if (path == "PriceCardRateUpload") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "PCRP" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }

        else if (path == "DiscountSummary") {
            var data_value = "{\"Role\":\"" + SessionValue + "\",\"Form_Code\":\"" + "DSR" + "\",\"Action\":\"" + "Is_View" + "\"}";
            $http({ url: '../../Home/Form_Access', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res == "True") {
                    $location.path(path);
                }
                else {
                    alert("You are not allowed to access this page");
                    $location.path("home");
                }
            });
        }

        else if (path == "RevenueDashboard") {
                    $location.path(path);
            }

        else {

            

            if (path == "home") {
                ControllerName = "HomeController";
            }

            $location.path(path);

        }
    };

});

// MASTER CONTROLLER
// TEST SHIVA 

// COMPLAINT MANAGEMENT CONTROLLER

// TEMPERORY CONTROLLERS



DIMS.controller('InvoiceListCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "InvoiceList" };
    $scope.go = function (path) {
        $location.path(path);
    };
    $scope.Getdata = function (name) {
        DIMSFactory.getTempData().success(function (response) {
            getLookUpData(response, name);
        });


    };
});

DIMS.controller('TempCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "home" };
    $scope.go = function (path) {
        $location.path(path);
    };

});


// SHIVA

// COMPLAINT APPROVAL CONTROLLER


// COMPLAINT REPORTS CONTROLLER



//COMMON FUNCTIONS

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records

// Add column header dynamically using response for lookups and Reports preview
function addAllColumnHeaders(myList, TableName) {
    var columnSet = [];
    var html = "";
    html += '<thead><tr class="CommonPopListThead">';
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

    html += "</tr></thead>";

    $("#" + TableName).append(html);


    return columnSet;
}
// Bind response data to the datatable for lookups
function getLookUpData(response, name, pageHeading) {

    var data = "";

    if (pageHeading == "Journeyplan Customer List") {
        data = JSON.parse(response);
    }
    else if (pageHeading == "Customer Type" || pageHeading == "Customer District" || pageHeading == "Customer State") {
        data = JSON.parse(response);
    }
    else {

        if (response.tabledata == "[]" || response.tabledata == "") {
            alert("No Data Available");
            return;
        }
        data = JSON.parse(response.tabledata);
    }
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

        var table = $("#PopUpTable").dataTable({
            "bDestroy": true,
            'scroll': true,
            "order": [[1, "asc"]]
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



// Bind response data to the datatable for lookups
function getLookUpData_Preview(response, pageHeading, tableName, PopUpName, PopupHeading, StatusName) {

    var data = (response);
    var element = angular.element('#' + PopUpName);
    element.modal('show');
    $("#" + PopupHeading).text(pageHeading);

    if (data == "") {

        $("#" + StatusName).text("No Records found");
        //$("#PopUpTable").dataTable().fnDestroy();
        $('#' + tableName).empty();
    } else {

        //  $("#" + StatusName).text("");


        $("#" + tableName).dataTable().fnDestroy();
        $('#' + tableName).empty();

        var columns = addAllColumnHeaders(data, tableName);

        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr style="cursor:pointer;" />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#" + tableName).append(row$);
        }
        if ($.inArray('ID', columns) >= 0) {
            $("#" + tableName + " tr td:nth-child(1)").hide();
            $("#" + tableName + " tr th:nth-child(1)").hide();
        } else { }

        var table = $("#" + tableName).dataTable({
            "bDestroy": true,
            'scroll': true
        });


    }

}

function getLookUpData_Preview_ServerSide(response, pageHeading, tableName, PopUpName, PopupHeading, selectedColumnnames) {

    var data = (response);
    var element = angular.element('#' + PopUpName);
    element.modal('show');
    $("#" + PopupHeading).text(pageHeading);


    $("#" + tableName).dataTable().fnDestroy();


    $('#' + tableName).empty();

    var html = "";
    html += '<thead><tr class="CommonPopListThead">';
    var headerTr$ = $('<tr/>');

    for (var i = 0 ; i < selectedColumnnames.length ; i++) {

        var rowHash = selectedColumnnames[i]["data"];



        headerTr$.append($('<th/>').html(rowHash));

        html += '<th>' + rowHash + '</th>';





    }

    html += "</tr></thead>";

    $("#" + tableName).append(html);

    var table = $("#" + tableName).dataTable({
        "bDestroy": true,
        "bSortable": true,
        'scroll': true, "order": [[0, "desc"]],
        "processing": true, // for show progress bar
        "serverSide": true, // for process server side
        "filter": true, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
        "ajax": {
            "url": "../../Home/LoadData",
            "type": "POST",
            "datatype": "json"
        }
        , "columns": selectedColumnnames

    })
    // TableDataTable = table;



}


function getLookUpData_Preview_ServerSide_SFDC_CustomerMaster(response, pageHeading, tableName, PopUpName, PopupHeading, selectedColumnnames, RowClassName) {

    var data = (response);
    var element = angular.element('#' + PopUpName);
    element.modal('show');
    $("#" + PopupHeading).text(pageHeading);


    $("#" + tableName).dataTable().fnDestroy();


    $('#' + tableName).empty();

    var html = "";
    html += '<thead><tr class="CommonPopListThead">';
    var headerTr$ = $('<tr/>');
   
    for (var i = 0 ; i < selectedColumnnames.length ; i++) {

        var rowHash = selectedColumnnames[i]["data"];



        headerTr$.append($('<th/>').html(rowHash));

        html += '<th>' + rowHash + '</th>';





    }

    html += "</tr></thead>";

    $("#" + tableName).append(html);

    var table = $("#" + tableName).dataTable({
        "bDestroy": true,
        "bSortable": true,
        'scroll': true, "order": [[0, "asc"]],
        "processing": true, // for show progress bar
        "serverSide": true, // for process server side
        "createdRow": function (row, data, index) {
            $(row).addClass(RowClassName); // 6 is index of column
        },
        "filter": true, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
        "ajax": {
            "url": "../../Home/LoadData",
            "type": "POST",
            "datatype": "json"
        }
        , "columns": selectedColumnnames

    })
    // TableDataTable = table;



}

// Bind response data to the datatable for the reports
function getLookUpData_Reports(response, Lablename, pageHeading, tableName) {

    var data = response;
    if (data == "") {

        $('#' + tableName).empty();

    } else {

        $("#" + tableName).dataTable().fnDestroy();
        $('#' + tableName).empty();

        var columns = addAllColumnHeaders(data, tableName);



        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr  style="cursor:pointer;" />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#" + tableName).append(row$);
        }
        if ($.inArray('ID', columns) >= 0) {
            $("#" + tableName + " tr td:nth-child(1)").hide();
            $("#" + tableName + " tr th:nth-child(1)").hide();
        } else { }

        var table = $("#" + tableName).dataTable({
            "bDestroy": true,
            'scroll': true, "order": [[0, "desc"]]


        });

        CompensationListTable = table;


    }

}


// Add column header dynamically using response for lookups and Reports preview
function addAllColumnHeaders_Serverside(myList, TableName) {
    $('#' + TableName).find("thead tr").empty();
    var columnSet = [];
    var html = "";
    html += '<thead><tr class="CommonPopListThead">';
    var headerTr$ = $('<tr/>');

    for (var i = 0 ; i < myList.length ; i++) {

        var rowHash = myList[i]["data"];


        //if ($.inArray(key, columnSet) == -1) {

        //    columnSet.push(key);
        headerTr$.append($('<th/>').html(rowHash));

        html += '<th>' + rowHash + '</th>';

        // }


    }

    html += "</tr></thead>";

    $("#" + TableName).append(html);


    return columnSet;
}
// Bind response data to the datatable for the reports
function getLookUpData_Reports_ServerSideBinding(response, Lablename, pageHeading, tableName, selectedColumnnames) {
    //alert(response);
    //alert(Lablename);
    //alert(pageHeading);
    //alert(tableName);
    //alert(JSON.stringify(selectedColumnnames));
    var data = response;
    if (data == "asd") {

        $('#' + tableName).empty();

    } else {

        $("#" + tableName).dataTable().fnDestroy();

        $('#' + tableName).empty();

        var html = "";
        html += '<thead><tr class="CommonPopListThead" >';
        var headerTr$ = $('<tr/>');

        for (var i = 0 ; i < selectedColumnnames.length ; i++) {

            var rowHash = selectedColumnnames[i]["data"];


            //if ($.inArray(key, columnSet) == -1) {

            //    columnSet.push(key);
            headerTr$.append($('<th/>').html(rowHash));

            html += '<th style="text-align:center">' + rowHash + '</th>';

            // }


        }


        html += "</tr></thead>";

        $("#" + tableName).append(html);
        var table = $("#" + tableName).dataTable({
            "bDestroy": true,
            "bSortable": true,
            // 'scroll': true,
            "order": [[0, "desc"]],
            scrollY: "200px",
            scrollX: true,
            scrollCollapse: true,
            paging: true,
            fixedColumns: {
                leftColumns: 0
            },
            "processing": true, // for show progress bar
            "serverSide": true, // for process server side
            "filter": true, // this is for disable filter (search box)
            "orderMulti": false, // for disable multiple column at once
            "ajax": {
                "url": "../../Home/LoadData",
                "type": "POST",
                "datatype": "json",
                "beforeSend": function () {
                    ShowLoader();
                },
                "complete": function (resp) {
                    if ($("#" + tableName).DataTable().data().count() != 0) {
                        $("#" + tableName + " tbody tr td").each(function () {
                            if (isNaN($(this).html())) {
                                $(this).css({ 'text-align': 'left' });
                            }
                            else {
                                if (tableName == "DailyOrder") {
                                    if ($(this).index() == 7) {
                                        if ($(this).text() == "") {
                                            $(this).text("0.00");
                                        } else {
                                            $(this).text(parseFloat($(this).text()).toFixed(2));
                                        }
                                    }
                                    $(this).css({ 'text-align': 'right' });
                                } else {
                                    $(this).css({ 'text-align': 'right' });
                                }
                            }
                        });
                    }
                    HideLoader();
                }
            }
            , "columns": selectedColumnnames

        })
        TableDataTable = table;
        //if ($.inArray('ID', selectedColumnnames.data) >= 0) {
        //    $("#" + tableName + " tr td:nth-child(1)").hide();
        //    $("#" + tableName + " tr th:nth-child(1)").hide();
        //} else { }
        CompensationListTable = table;

    }

}

// Bind response data to the datatable for the Credit Debit pages
function getLookUpData_Reports_ServerSideBinding_CreditDebitNotes(response, Lablename, pageHeading, tableName, selectedColumnnames) {
    var data = response;
    if (data == "asd") {
        $('#' + tableName).empty();
    } else {
        $("#" + tableName).dataTable().fnDestroy();
        $('#' + tableName).empty();
        var html = "";
        html += '<thead><tr class="CommonPopListThead" >';
        var headerTr$ = $('<tr/>');
        //if (tableName == "tbl_CreditNotes")
        //   html += '<th style="text-align:center"><input type="checkbox" /></th>';
        for (var i = 0 ; i < selectedColumnnames.length ; i++) {
            var rowHash = selectedColumnnames[i]["data"];
            headerTr$.append($('<th/>').html(rowHash));
            if (i == 0) {
                if (tableName == "tbl_CreditNotes" || tableName ==  "tbl_DebitNotes")
                    html += '<th style="text-align:center"><label><input type="checkbox" id="Select_All" onchange="SelectAllCreditDebitNotes()"/>' + rowHash + '</label></th>';
            } else {
                html += '<th style="text-align:center">' + rowHash + '</th>';
            }
        }
        html += "</tr></thead>";
        $("#" + tableName).append(html);
        var table = $("#" + tableName).dataTable({
            "bDestroy": true,
            "bSortable": true,
            // 'scroll': true,
            'columnDefs': [{
                'targets': 0,
                'searchable': false,
                //'orderable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    var string = JSON.stringify(full);
                    var obj = JSON.parse(string);
                    var value = obj['Customer Code'] + ',' + obj['Posting Date'] + ',' + obj['Document Number'];                    
                    return '<label><input type="checkbox" value='
                           + $('<div/>').text(value).html() + ' id="' + $('<div/>').text(data).html() + '" onchange="SelectedCreditDebitNote(this)">' + $('<div/>').text(data).html() + '</label>';
                }
            }],
            'select': {
                'style': 'multi'
            },
            "order": [[0, "desc"]],
            scrollY: "200px",
            scrollX: true,
            scrollCollapse: true,
            paging: true,
            fixedColumns: {
                leftColumns: 0
            },
            "processing": true, // for show progress bar
            "serverSide": true, // for process server side
            "filter": true, // this is for disable filter (search box)
            "orderMulti": false, // for disable multiple column at once
            "ajax": {
                "url": "../../Home/LoadData",
                "type": "POST",
                "datatype": "json",
                "beforeSend": function () {
                    ShowLoader();
                },
                "complete": function (resp) {
                    if ($("#" + tableName).DataTable().data().count() != 0) {
                        $("#" + tableName + " tbody tr td").each(function () {
                            if (isNaN($(this).html())) {
                                $(this).css({ 'text-align': 'left' });
                            }
                            else {
                                if (tableName == "DailyOrder") {
                                    if ($(this).index() == 7) {
                                        if ($(this).text() == "") {
                                            $(this).text("0.00");
                                        } else {
                                            $(this).text(parseFloat($(this).text()).toFixed(2));
                                        }
                                    }
                                    $(this).css({ 'text-align': 'right' });
                                } else {
                                    $(this).css({ 'text-align': 'right' });
                                }
                            }
                        });
                    }
                    HideLoader();
                }
            }
            , "columns": selectedColumnnames

        })
        TableDataTable = table;
        CompensationListTable = table;
    }
}


// Bind response data to the datatable for the fso and  Customers configuration
function getLookUpData_Customers_ServerSideBinding(response, Lablename, pageHeading, tableName, selectedColumnnames) {

    var data = response;
    if (data == "asd") {

        $('#' + tableName).empty();

    } else {

        $("#" + tableName).dataTable().fnDestroy();

        $('#' + tableName).empty();

        var html = "";
        html += '<thead><tr class="CommonPopListThead">';
        var headerTr$ = $('<tr/>');

        for (var i = 0 ; i < selectedColumnnames.length ; i++) {

            var rowHash = selectedColumnnames[i]["data"];


            //if ($.inArray(key, columnSet) == -1) {

            //    columnSet.push(key);
            headerTr$.append($('<th/>').html(rowHash));

            html += '<th>' + rowHash + '</th>';

            // }

        }


        html += "</tr></thead>";



        $("#" + tableName).append(html);


        $("#" + tableName).dataTable({
            "bDestroy": true,
            "bSortable": true,
            // 'scroll': true,
            "order": [[0, "desc"]],
            "columnDefs": [{ className: "Edit", "targets": [5] }],
            // scrollY: "200px",
            //scrollX: true,
            //  scrollCollapse: true,
            paging: true,

            //"processing": true, // for show progress bar
            "serverSide": true, // for process server side
            "filter": true, // this is for disable filter (search box)
            "orderMulti": false, // for disable multiple column at once
            "ajax": {
                "url": "../../Home/LoadData",
                "type": "POST",
                "datatype": "json",
                "beforeSend": function () {
                    ShowLoader();
                },
                "complete": function (resp) {
                    if ($("#" + tableName).DataTable().data().count() != 0) {
                        $("#" + tableName + " tbody tr td").each(function () {
                            if (isNaN($(this).html())) {
                                $(this).css({ 'text-align': 'left' })
                            }
                            else {
                                $(this).css({ 'text-align': 'right' })

                            }
                        });
                    }
                    HideLoader();
                }
            }
            , "columns": selectedColumnnames

        })
        TableDataTable = table_CustomerMapping;
        //if ($.inArray('ID', selectedColumnnames.data) >= 0) {
        //    $("#" + tableName + " tr td:nth-child(1)").hide();
        //    $("#" + tableName + " tr th:nth-child(1)").hide();
        //} else { }

        //CompensationListTable = table_CustomerMapping;



    }

}


function getLookUpData_CustomPopUp(response, name, pageHeading) {

    var data = JSON.parse(response);
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

function getLookUpDataForPartnerIsuues(response, name, pageHeading) {

    var data = "";

    if (pageHeading == "Journeyplan Customer List") {
        data = JSON.parse(response);
    }
    else {

        if (response == "[]" || response == "") {
            alert("No Data Available");
            return;
        }
        data = JSON.parse(response);
        // alert(data);
    }
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

        var table = $("#PopUpTable").dataTable({
            "bDestroy": true,
            'scroll': true,
            "order": [[1, "asc"]]
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

function getInvoiceData(obj) {
    var scope = angular.element(document.querySelector('[ng-controller=CompRegCtrl]')).scope();
    //$scope.popUpData = $(obj).children();
    scope.$apply(function () {
        scope.SalesRepEmpName = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function isInteger(evt) {
    try {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    catch (e) {
        alert("Errro : isInteger " + e);
    }
}

//onkeypress = "return isNumber(event)"
function isNumber(evt) {
    try {

        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;

        if (charCode == 46) {
            return true;
        }

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    catch (e) {
        alert("Errro : isInteger " + e);
    }
}

function DateConversion(date) {
    // alert(date);
    var dt = new Date(date);

    var month = (dt.getMonth() + 1);
    var date1 = dt.getDate();
    // newdate.setDate(tomorrow.getDate() + 1);
    if (month < 10) {
        month = '0' + month;
    }
    if (date1 < 10) {
        date1 = '0' + date1;
    }
    var TotalDate = month + "/" + date1 + "/" + dt.getFullYear();
    return TotalDate;
}



// function that will allow numbers and decimal
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else {
        // If the number field already has . then don't allow to enter . again.
        if (evt.target.value.search(/\./) > -1 && charCode == 46) {
            return false;
        }

        return true;
    }
}

//var th = ['', 'thousand', 'million', 'billion', 'trillion'];

//var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

//var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

//var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var th = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];

var dg = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];

var tn = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];

var tw = ['TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINTY'];

// function to convert number to words
function toWords(s) {

    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    // alert(s);
    if (s != parseFloat(s)) return 'NOT A NUMBER';
    var x = s.indexOf('.');
    // alert(x)
    if (x == -1) x = s.length;
    if (x > 15) return 'TOO BIG';
    var n = s.split('');
    //alert(n)
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'HUNDRED ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'DECIMAL ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');

}

function DateToWestern(GD) {
    try {
        if (GD == "" || GD == null || GD == undefined) {
            return "";
        }
        else {
            return GD;
            //GD = GD.split('/');
            //return (GD[1] + "/" + GD[0] + "/" + GD[2]);
        }
    }
    catch (e) {
        alert("Error : " + e);
    }
}



function isInteger(evt) {
    try {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    catch (e) {
        alert("Errro : isInteger " + e);
    }
}

function isNumber(evt) {
    try {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;

        if (charCode == 46) {
            return true;
        }

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    catch (e) {
        alert("Errro : isInteger " + e);
    }
}

function ConvertToViewDate(DBDate) {

    try {
        if (DBDate == null || DBDate == "" || DBDate == undefined) {
            return "";
        }
        else {
            DBDate = (DBDate.split('T'))[0].split('-');
            return (DBDate[2] + "/" + DBDate[1] + "/" + DBDate[0]);
        }
    }
    catch (e) {
        alert("Error ConvertToViewDate: " + e);
    }
}



//Check Users Session (Validate User Properties)
function CheckUserSession() {
    try {
        console.clear();
        $.ajax({
            method: 'POST',
            url: '../../LogOn/CheckUserSession',
        }).then(function successCallback(response) {

            if (response == "TRUE") {
            }
            else {
                UserSignOut();
            }
        }, function errorCallback(response) {
            //alert("Error : " + response);
        });
        console.clear();
    }
    catch (e) {
       // alert("Error : CheckUserSession : " + e);
    }
}

function UserSignOut() {

    try {
        $.ajax({
            type: 'POST',
            //url: '@Url.Action("UserSignOut", "LogOn")',
            url: '../../LogOn/UserSignOut',
            async: true,
            success: function (response) {
                window.location.href = "../../LogOn/LogOut";
            }
        });
    }
    catch (e) {
        //alert("Error : UserSignOut : " + e);
    }

    //window.location.href = "../../LogOn/LogOut";
}





function FillCMSStateFilter() {
    try {
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
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    }
    catch (e) {
        alert("Error : FillCMSStateFilter :" + e);
    }
}



function SetCMSStateFilter(StateCode) {
    try {

        if (StateCode == "" || StateCode == undefined || StateCode == null) {
            return;
        }
        else {
            $.ajax({
                type: 'POST',
                url: '../../ComplaintRegistration/SetCMSStateFilter',
                async: true,
                data: { StateCode: StateCode },
                success: function (response) {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
            });
        }
    }
    catch (e) {
        alert("Error : FillCMSStateFilter :" + e);
    }
}




function SumQuantity(WhereCondition, ReportName) {

    var IPData = JSON.stringify({
        WhereCondition: WhereCondition,
        ReportName: ReportName
    });

    var RD = "";

    $.ajax({

        url: '../../Unnati/ColumnTotals',
        type: "POST",
        datatype: "JSON",
        data: { IPData: IPData },
        async: false,
        cache: false,
        success: function (response) {
            RD = response;
        },
        error: function () {
        }
    });
    return RD;
}