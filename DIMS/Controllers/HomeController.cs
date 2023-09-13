using iAppUtils;
using DIMS.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
//using iTextSharp.tool.xml;
using System.Diagnostics;
using ClosedXML.Excel;
using System.Net.Mail;
using System.Net;
using System.Web.UI;
using System.Data.OleDb;
using System.Web.UI.HtmlControls;
using DIMS.Helpers;
using System.Net.Security;
using System.util;
using System.Text.RegularExpressions;
using Microsoft.Exchange.WebServices.Data;
//using iTextSharp.tool.xml;
//using DocumentFormat.OpenXml.Spreadsheet;
//using DocumentFormat.OpenXml.Packaging;
//using DocumentFormat.OpenXml;



namespace DIMS.Controllers
{
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";


            return View();
        }


        public JsonResult GetBuildString()
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {
                JR.Data = ConfigurationManager.AppSettings["BuildVersion"].ToString();
            }
            catch (Exception EX)
            {
                JR.Data = "DIMS UAT Build 1.0";
            }
            return JR;
        }


        [Authorize]
        public ActionResult HomePage()
        {
            /*
            UserProperties UP = new UserProperties();

            UP.UserCode = "ADMIN";
            UP.UserName = "ADMIN";
            UP.UserType = "Quality Audit Officer";
            UP.UserTypeCode = "QUR1";
            //UP.SITEDETAIL_CODE = "STH";
            //UP.COMPANYDETAIL_CODE = "CC1";

            UP.SITEDETAIL_CODE = "NTH";
            UP.COMPANYDETAIL_CODE = "CC1";

           Session["UP"] = UP;

            Session["SessionSITEDETAIL_CODE"] = "STH";
            Session["SessionUserCode"] = "ADMIN";
            Session["SessionUserName"] = "ADMIN";
            Session["SessionCOMPANYDETAIL_CODE"] = "CC1";
            Session["SessionUserType_STO"] = "Quality Audit Officer";
            Session["SessionUserTypeID"] = "QUR1";
            */

            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }


        [Authorize]
        public ActionResult Template(string id)
        {

            try
            {

                #region Switch

                switch (id)
                {
                    //case "Loginpage":
                    //    return PartialView("~/Views/Login/landingpage.cshtml");
                    case "Homepage":
                        return PartialView("~/Views/Home/HomePage.cshtml");
                    case "Invoice":
                        return PartialView("~/Views/Invoice/StatementAccount.cshtml");
                    case "Registration":
                        return PartialView("~/Views/ComplaintRegistration/Registration.cshtml");
                    case "RegistrationList":
                        return PartialView("~/Views/ComplaintRegistration/RegistrationList.cshtml");
                    case "Investigation":
                        return PartialView("~/Views/ComplaintRegistration/Investigation.cshtml");
                    case "InvestigationList":
                        return PartialView("~/Views/ComplaintRegistration/InvestigationList.cshtml");
                    case "Compensation":
                        return PartialView("~/Views/ComplaintRegistration/Compensation.cshtml");
                    case "CompensationList":
                        return PartialView("~/Views/ComplaintRegistration/CompensationList.cshtml");
                    case "InvList":
                        return PartialView("~/Views/Home/InvoiceListMockUp.cshtml");

                    case "CMS_Management_Information_System":
                        return PartialView("~/Views/ComplaintReports/CMS_Management_Information_System.cshtml");

                    case "Temp":
                        return PartialView("~/Views/Invoice/StatementAccount1.cshtml");
                    case "Master":
                        return PartialView("~/Views/Master/MasterConfigData.cshtml");

                    case "RoleAccessConfiguration":
                        return PartialView("~/Views/Master/RoleAccessConfiguration.cshtml");
                    case "CMSDashboard":
                        return PartialView("~/Views/ComplaintReports/CMS_Dashboard.cshtml");
                    //svprasadk 31-08-2020 getting CMS Graphical Dashboard start
                    case "CMSGraphicalDashboard":
                        return PartialView("~/Views/ComplaintReports/CMS_Graphical_Dashboard.cshtml");
                    //svprasadk 31-08-2020 getting CMS Graphical Dashboard end
                    case "CorrectiveMeasure":
                        return PartialView("~/Views/CorrectiveMeasure/Add.cshtml");

                    case "CorrectiveMeasureList":
                        return PartialView("~/Views/CorrectiveMeasure/CorrectiveMeasureList.cshtml");
                    case "CustomerMasterCreate":
                        return PartialView("~/Views/SetUp/CustomerMasterCreate.cshtml");
                    case "DocumentSeries":
                        return PartialView("~/Views/Master/DocumentSeries.cshtml");
                    case "PlantMaster":
                        return PartialView("~/Views/Master/PlantMaster.cshtml");
                    case "NoticeConfiguration":
                        return PartialView("~/Views/SetUp/NoticeConfiguration.cshtml");
                    case "ComplaintStatusReport":
                        return PartialView("~/Views/ComplaintReports/ComplaintStatusReport.cshtml");
                    case "ComplaintsDetailedReport":
                        return PartialView("~/Views/ComplaintReports/ComplaintDetailedReport.cshtml");
                    case "ComplaintPendingApproval":
                        return PartialView("~/Views/ComplaintApprovals/PendingApproval.cshtml");
                    case "ComplaintsAssigning":
                        return PartialView("~/Views/ComplaintApprovals/AssignComplaint.cshtml");
                    case "ComplaintsApprovalReport":
                        return PartialView("~/Views/ComplaintApprovals/ApprovalReport.cshtml");
                    case "PendingApprovalCommercial":
                        return PartialView("~/Views/ComplaintApprovals/PendingApprovalCommercial.cshtml");
                    case "ManageReports":
                        return PartialView("~/Views/Home/ManageReports.cshtml");
                    case "SoapService":
                        return PartialView("~/Views/Home/SoapService.cshtml");
                    case "MongoDBService":
                        return PartialView("~/Views/Home/MongoDBService.cshtml");
                    case "OPCServer":
                        return PartialView("~/Views/Home/OPCServer.cshtml");
                    case "GetUserStockistList":
                        return PartialView("~/Views/Users/GetUserStockistList.cshtml");
                    case "GetUserEmployeeList":
                        return PartialView("~/Views/Users/GetUsersEmployeeList.cshtml");
                    case "UsersList": //InActive Usesr
                        return PartialView("~/Views/Users/UsersList.cshtml");
                    case "GetActiveUserList":
                        return PartialView("~/Views/Users/ActiveUserList.cshtml");
                    case "AdminChangePasword":
                        return PartialView("~/Views/Home/AdminChangePasword.cshtml");

                    case "UserLoginImageSelection":
                        return PartialView("~/Views/Home/UserLoginImageSelection.cshtml");

                    case "SampleScreen":
                        return PartialView("~/Views/Home/SampleScreens.cshtml");

                    case "CreateEmployee":
                        return PartialView("~/Views/Home/CreateEmployee.cshtml");


                    case "CMS_Dashboard":
                        return PartialView("~/Views/ComplaintReports/CMS_Dashboard.cshtml");
                    //svprasadk 31-08-2020 getting CMS Graphical Dashboard start
                    case "CMS_Graphical_Dashboard":
                        return PartialView("~/Views/ComplaintReports/CMS_Graphical_Dashboard.cshtml");
                    //svprasadk 31-08-2020 getting CMS Graphical Dashboard end
                    case "StockistCompensation":
                        return PartialView("~/Views/ComplaintReports/StockistCompensation.cshtml");

                    #region Unnati

                    case "UnnatiPointBalanceReport":
                        return PartialView("~/Views/Unnati/PointBalanceReport.cshtml");
                    case "UnnatiRedemptionReport":
                        return PartialView("~/Views/Unnati/RedemptionReport.cshtml");
                    case "UnnatiMemberLoginReport":
                        return PartialView("~/Views/Unnati/MemberLoginReport.cshtml");



                    case "UnnatiTransactionDetailReport":
                        return PartialView("~/Views/Unnati/TransactionDetailReport.cshtml");
                    case "UnnatiTransactionSummaryReport":
                        return PartialView("~/Views/Unnati/TransactionSummaryReport.cshtml");
                    case "UnnatiTransactionVelocityReport":
                        return PartialView("~/Views/Unnati/TransactionVelocityReport.cshtml");

                    case "UnnatiEnrollmentDetailReport":
                        return PartialView("~/Views/Unnati/EnrollementDetailReport.cshtml");
                    case "UnnatiTransactionStatusReport":
                        return PartialView("~/Views/Unnati/TransactionStatusReport.cshtml");
                    case "UnnatiEmployeeRedemptionReport":
                        return PartialView("~/Views/Unnati/EmployeeRedemptionReport.cshtml");

                    case "UnnatiDashBoard":
                        return PartialView("~/Views/Unnati/UnnatiDashBoard.cshtml");
                    case "UnnatiCustomerMapping":
                        return PartialView("~/Views/Unnati/UnnatiCustomerMapping.cshtml");

                    case "UnnatiRewardsCatalogPoints":
                        return PartialView("~/Views/Unnati/UnnatiRewardsCatalogPoints.cshtml");
                    case "CreditNotesDetails":
                        return PartialView("~/Views/SAP/CreditNotesDetails.cshtml");
                    #endregion
                    #region Harish
                    case "DailyOrderTracking"://SFDC Views Starting
                        return PartialView("~/Views/SFDC/DailyOrderTracking.cshtml");
                    case "JourneyPlanDetails":
                        return PartialView("~/Views/SFDC/JourneyPlanDetails.cshtml");
                    case "JourneyPlanList":
                        return PartialView("~/Views/SFDC/JourneyPlanList.cshtml");
                    case "MarketMap":
                        return PartialView("~/Views/SFDC/MarketMap.cshtml");
                    case "SchemesList":
                        return PartialView("~/Views/SFDC/SchemesList.cshtml");
                    case "AddScheme":
                        return PartialView("~/Views/SFDC/AddScheme.cshtml");
                    case "EditScheme":
                        return PartialView("~/Views/SFDC/EditScheme.cshtml");
                    case "PartnerIssues":
                        return PartialView("~/Views/SFDC/PartnerIssues.cshtml");
                    case "SalesAchievements":
                        return PartialView("~/Views/SFDC/SalesAchievement.cshtml");
                    case "SalesAchievementMonthly":
                        return PartialView("~/Views/SFDC/SalesAchievementMonthly.cshtml");
                    case "ScoreCards":
                        return PartialView("~/Views/SFDC/ScoreCards.cshtml");
                    case "AddOrder":
                        return PartialView("~/Views/SFDC/AddOrder.cshtml");
                    case "AddOrderForFSO":
                        return PartialView("~/Views/SFDC/AddOrderForFSO.cshtml");
                    case "AddMarketMap":
                        return PartialView("~/Views/SFDC/AddMarketMap.cshtml");
                    case "AddPartnerIssues":
                        return PartialView("~/Views/SFDC/AddPartnerIssues.cshtml");
                    case "InventoryTracking":
                        return PartialView("~/Views/SFDC/InventoryTracking.cshtml");
                    case "AddInventoryTrack":
                        return PartialView("~/Views/SFDC/AddInventoryTrack.cshtml");
                    case "AddNewCounter":
                        return PartialView("~/Views/SFDC/AddNewCounter.cshtml");
                    case "CounterList":
                        return PartialView("~/Views/SFDC/CounterList.cshtml");
                    case "ZHJourneyPlanDetails":
                        return PartialView("~/Views/SFDC/ZHJourneyPlanDetails.cshtml");
                    case "DeviationSummeryReport":
                        return PartialView("~/Views/SFDC/FSODeviationSummeryReport.cshtml");
                    #endregion
                    case "Notification":
                        return PartialView("~/Views/Home/Notification.cshtml");
                    case "AddNotification":
                        return PartialView("~/Views/Home/AddNotification.cshtml");
                    case "GetMonitorLog":
                        return PartialView("~/Views/Users/StateWiseUsersList.cshtml");
                    case "CreditLimitTracker":
                        return PartialView("~/Views/Reports/CreditLimitTracker.cshtml");


                    #region SAP
                    case "AccountStatement":
                        return PartialView("~/Views/SAP/Account_Statement.cshtml");
                    case "AccountStatementSummary":
                        return PartialView("~/Views/SAP/Account_Statement_Summary.cshtml");
                    case "CreditNotes":
                        return PartialView("~/Views/SAP/Credit_Notes.cshtml");
                    case "DebitNotes":
                        return PartialView("~/Views/SAP/Debit_Notes.cshtml");
                    case "InvoiceDetail_ZINV_Plant":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZINV_Plant.cshtml");
                    case "InvoiceDetail_ZINV_Depo":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZINV_Depo.cshtml");
                    case "InvoiceDetail_ZFOC_Plant":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZFOC_Plant.cshtml");
                    case "InvoiceDetail_ZFOC_Depo":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZFOC_Depo.cshtml");

                    case "InvoiceDetail_ZINV_Plant_GST":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZINV_Plant_GST.cshtml");
                    case "InvoiceDetail_ZINV_Depo_GST":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZINV_Depo_GST.cshtml");
                    case "InvoiceDetail_ZFOC_Plant_GST":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZFOC_Plant_GST.cshtml");
                    case "InvoiceDetail_ZFOC_Depo_GST":
                        return PartialView("~/Views/SAP/InvoiceDetail_ZFOC_Depo_GST.cshtml");





                    case "InvoiceListView":
                        return PartialView("~/Views/SAP/Invoice_List_View.cshtml");
                    // svprasadk 25-11-2020 Invoices Tab for SBU3 start
                    case "InvoiceListViewBU3":
                        return PartialView("~/Views/FinancialTransactions/BU3/InvoiceListViewBU3.cshtml");
                    // svprasadk 25-11-2020 Invoices Tab for SBU3 stop
                    case "OutstandingDetail":
                        return PartialView("~/Views/SAP/Outstanding_Detail.cshtml");
                    case "CreditOutstandingDetail":
                        return PartialView("~/Views/SAP/CreditOutstanding_Detail.cshtml");
                    case "PaymentByStockist":
                        return PartialView("~/Views/SAP/Payment_By_stockist.cshtml");
                    case "SAP_DashBoard":
                        return PartialView("~/Views/SAP/SAP_DashBoard.cshtml");
                    case "PendingCForms":
                        return PartialView("~/Views/SAP/Pending_C_Forms.cshtml");
                    case "TDSCertificate":
                        return PartialView("~/Views/SAP/TDS_Certificate.cshtml");
                    case "TDSCertificateList":
                        return PartialView("~/Views/SAP/TDS_CertificateList.cshtml");
                    case "DashBoard":
                        return PartialView("~/Views/DashBoard/Index.cshtml");
                    case "EmpRoleConfiguration":
                        return PartialView("~/Views/SAP/EmpRoleConfiguration.cshtml");
                    case "EmpCustomerConfiguration":
                        return PartialView("~/Views/SAP/EmpCustomerConfiguration.cshtml");
                    case "CustomerFSOUpload":
                        return PartialView("~/Views/Home/CustomerFSOUpload.cshtml");
                    case "DebitNotesDetails":
                        return PartialView("~/Views/SAP/DebitNotesDetails.cshtml");


                    case "EmailConfigDailySalesTracker":
                        return PartialView("~/Views/Home/EmailConfigDailySalesTracker.cshtml");

                    #endregion


                    #region ManiSFDC

                    case "PartnerIssueSummary":
                        return PartialView("~/Views/SFDC/PartnerIssueSummary.cshtml");

                    case "CreateTargetList":
                        return PartialView("~/Views/SFDC/CreateTargetList.cshtml");

                    case "CreateTarget":
                        return PartialView("~/Views/SFDC/CreateTargetFC.cshtml");

                    case "SalesHurdleList":
                        return PartialView("~/Views/SFDC/SalesHurdleList.cshtml");

                    case "SalesHurdleApproval":
                        return PartialView("~/Views/SFDC/SalesHurdleApproval.cshtml");

                    case "HolidayConfiguration":
                        return PartialView("~/Views/SFDC/HolidayConfigurationList.cshtml");


                    case "StockistDetails":
                        return PartialView("~/Views/Master/StockistDetails.cshtml");

                    case "LoginAuditLog":
                        return PartialView("~/Views/Master/LoginAuditLog.cshtml");
                    case "ApplicationLog":
                        return PartialView("~/Views/Master/ApplicationLog.cshtml");
                    case "ScoreCardsDetails":
                        return PartialView("~/Views/SFDC/ScoreCardDetails.cshtml");
                    case "KeyStockistUpload":
                        return PartialView("~/Views/SFDC/KeyStockistUpload.cshtml");
                    case "RevenueDashboard":
                        return PartialView("~/Views/SFDC/RevenueDashboard.cshtml");


                    #endregion ManiSFDC

                    #region reports by Divya
                    case "DailySalesTracker":
                        return PartialView("~/Views/Reports/DailySalesTracker.cshtml");
                    case "BudgetTargetUpload":
                        return PartialView("~/Views/Reports/BudgetTargetUpload.cshtml");

                    case "FreightUpload":
                        return PartialView("~/Views/Reports/FreightUpload.cshtml");
                    case "DiscountsUpload":
                        return PartialView("~/Views/Reports/DiscountsUpload.cshtml");

                    #endregion

                    #region Hanumanth

                    case "ProjectDiscountWithCommission":
                        return PartialView("~/Views/Reports/ProjectDiscountWithCommission.cshtml");

                    case "ProjectDiscountDirectBilling":
                        return PartialView("~/Views/Reports/ProjectDiscountDirectBilling.cshtml");

                    case "ProjectDiscountWithCommissionList":
                        return PartialView("~/Views/Reports/ProjectDiscountWithCommissionList.cshtml");

                    case "ProjectDiscountDirectBillingList":
                        return PartialView("~/Views/Reports/ProjectDiscountDirectBillingList.cshtml");

                    case "NetBillingForStockist":
                        return PartialView("~/Views/Reports/NetBillingForStockist.cshtml");

                    case "NetBillingForStockistNew":
                        return PartialView("~/Views/Reports/NetBillingForStockistNew.cshtml");

                    case "DiscountStructure":
                        return PartialView("~/Views/Reports/DiscountStructure.cshtml");

                    case "DiscountStructureNew":
                        return PartialView("~/Views/Reports/DiscountStructureNew.cshtml");

                    case "KSMReport":
                        return PartialView("~/Views/Reports/KSMReport.cshtml");

                    case "KSMReportDetail":
                        return PartialView("~/Views/Reports/KSMReportDetail.cshtml");

                    case "PriceCardRateUpload":
                        return PartialView("~/Views/Reports/PriceCardRateUpload.cshtml");
                    case "DiscountSummary":
                        return PartialView("~/Views/Reports/DiscountSummary.cshtml");

                    case "SalesProcessDashboard":
                        return PartialView("~/Views/SFDC/SalesProcessDashboard.cshtml");
                    // svprasadk 20-07-2020 SBU3 Stock Transfer implementation start
                    case "Registration_STO":
                        return PartialView("~/Views/ComplaintRegistration_STO/Registration_STO.cshtml");
                    case "RegistrationList_STO":
                        return PartialView("~/Views/ComplaintRegistration_STO/RegistrationList_STO.cshtml");
                    case "Investigation_STO":
                        return PartialView("~/Views/ComplaintRegistration_STO/Investigation_STO.cshtml");
                    case "InvestigationList_STO":
                        return PartialView("~/Views/ComplaintRegistration_STO/InvestigationList_STO.cshtml");
                    // svprasadk 20-07-2020 SBU3 Stock Transfer implementation end
                    //svprasadk 04-02-2021 SBU3 Stock Transfer and informal complaint status report start
                    case "ComplaintStatusReport_STO":
                        return PartialView("~/Views/ComplaintReports/ComplaintStatusReport_STO.cshtml");
                    case "ComplaintStatusReport_ICC":
                        return PartialView("~/Views/ComplaintReports/ComplaintStatusReport_ICC.cshtml");
                    //svprasadk 04-02-2021 SBU3 Stock Transfer and informal complaint status report end
                    //svprasadk 10-02-2021 SBU3 Informal Customer Complaint implementation start
                    case "Registration_ICC":
                        return PartialView("~/Views/ComplaintRegistration_ICC/Registration_ICC.cshtml");
                    case "RegistrationList_ICC":
                        return PartialView("~/Views/ComplaintRegistration_ICC/RegistrationList_ICC.cshtml");
                    case "Investigation_ICC":
                        return PartialView("~/Views/ComplaintRegistration_ICC/Investigation_ICC.cshtml");
                    case "InvestigationList_ICC":
                        return PartialView("~/Views/ComplaintRegistration_ICC/InvestigationList_ICC.cshtml");
                    //svprasadk 10-02-2021 SBU3 Informal Customer Complaint implementation end
                    //svprasadk 11-02-2021 SBU3 Informal Customer Complaint implementation start
                    case "ComplaintPendingApproval_ICC":
                        return PartialView("~/Views/ComplaintApprovals_ICC/PendingApproval_ICC.cshtml");
                    case "ComplaintsAssigning_ICC":
                        return PartialView("~/Views/ComplaintApprovals_ICC/AssignComplaint_ICC.cshtml");
                    case "ComplaintsApprovalReport_ICC":
                        return PartialView("~/Views/ComplaintApprovals_ICC/ApprovalReport_ICC.cshtml");
                    //svprasadk 11-02-2021 SBU3 Informal Customer Complaint implementation end
                    #endregion

                    default:
                        throw new Exception("template not known");
                }

                #endregion Switch

            }
            catch (Exception)
            {
                return RedirectToAction("LogOn", "LogOn");
            }

            //if (User.Identity.Name == "")
            //{
            //    return RedirectToAction("LogOn", "LogOn");
            //}
            //else
            //{
            //}

        }

        public ActionResult CustomerFSOUpload()
        {
            return View();
        }

        public ActionResult EmailConfigDailySalesTracker()
        {
            return View();
        }

        [Authorize]
        public ActionResult getMasterData(string MasterType)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetMasterData");
                JR.Data = clt.MakeRequest("POST", MasterType, iAppUtils.HttpContentType.json).ResponseBody;

                //{"MasterType":"StockistMaster","SITEDETAIL_CODE":"STH","COMPANYDETAIL_CODE":"CC1","StateFilter":"01"}

                //JObject JB = JObject.Parse(MasterType);

                //if (JB["MasterType"].ToString() == "StockistMaster")
                //{
                //    JR.MaxJsonLength = int.MaxValue;
                //    JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                //    return JR;
                //}
                //else
                //{
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        public ActionResult getServerDateTime()
        {

            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GETSERVERDATETIME");
                JR.Data = clt.MakeRequest("GET", "", iAppUtils.HttpContentType.json).ResponseBody;
                //  JR.Data = DateTime.Now;
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }


        [Authorize]
        public ActionResult getServerDateTime_Sales()
        {

            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GETSERVERDATETIME_SalesHuddles");
                JR.Data = clt.MakeRequest("GET", "", iAppUtils.HttpContentType.json).ResponseBody;
                //  JR.Data = DateTime.Now;
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Test()
        {
            return View();
        }

        public ActionResult Test1()
        {
            return View();
        }

        public ActionResult Before_Login()
        {
            return View();
        }

        [Authorize]
        public ActionResult AdminChangePasword()
        {
            return View();
        }

        [Authorize]
        public ActionResult UserLoginImageSelection()
        {
            return View();
        }

        [Authorize]
        public ActionResult InvoiceListMockUp()
        {
            return View();
        }


        [Authorize]
        public ActionResult SampleScreens()
        {
            return View();
        }

        [Authorize]
        public ActionResult SendNotification(string data)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/SendNotificationData");
                JR.Data = clt.MakeRequest("POST", data, iAppUtils.HttpContentType.json).ResponseBody;
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        public JsonResult GetNotificationData(string Data)
        {
            JsonResult JR = new JsonResult();

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetNotificationData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }



        #region Column selection framework functions
        /// <summary>
        /// Save Selected ColumnData
        /// </summary>
        /// <param name="SaveData">Selected Column of the report</param>
        /// <returns>Status of save </returns>
        /// 
        [Authorize]
        public JsonResult SaveSelectedColumnData(string SaveData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/SaveSelectedColumnData");
                JR.Data = clt.MakeRequest("POST", SaveData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        /// <summary>
        /// Preview Selected ColumnData will get the data with selected column
        /// </summary>
        /// <param name="SaveData">Selected Column of the report</param>
        /// <returns>Status of save </returns>
        /// 
        [Authorize]
        public JsonResult PreviewSelectedColumnData(string SaveData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/PreviewSelectedColumnData");
                JR.Data = clt.MakeRequest("POST", SaveData, iAppUtils.HttpContentType.json).ResponseBody;
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// Get Report already any selected columns name based on reportname  for Editing
        /// </summary>
        /// <param name="DATA">Report name and UserCode</param>
        /// <returns>Report already selected column names Data</returns>
        /// 
        [Authorize]
        public ActionResult getReportListColumnNamesData(string Data)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportListColumnNamesData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Get Report data based on input parameter
        /// </summary>
        /// <param name="DATA">Input parameters,Report name and  UserCode</param>
        /// <returns>Report Data</returns>
        [Authorize]
        public string getReportData(string Data)
        {
            string Result = string.Empty;
            string conjsonlist;
            try
            {
                Session["ReportJsonstring"] = Data;

                return Result = "Save";
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Result = errorresult;


            }
        }



        ///// <summary>
        ///// Get Report data based on input parameter
        ///// </summary>
        ///// <param name="DATA">Input parameters,Report name and  UserCode</param>
        ///// <returns>Report Data</returns>
        //public ActionResult getReportData(string Data)
        //{
        //    string conjsonlist;
        //    try
        //    {
        //        JsonResult JR = new JsonResult();
        //        iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData");
        //        JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
        //        return Json(new
        //        {
        //            tabledata = JR.Data.ToString()
        //        }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        string errorresult = ex.Message.ToString();

        //        return Json(new
        //        {
        //            errorresult = errorresult
        //        }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        [ValidateInput(false)]
        public ActionResult TestUnnati(string Data)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();



                //iAppUtils.HttpClient clt = new iAppUtils.HttpClient("http://192.9.200.21:85/UnnatiTransaction/PostEnrollementData");
                // iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL1"] + "UnnatiTransaction/PostEnrollementData");
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL1"] + "UnnatiTransaction/PostTransactionData");
                //iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL1"] + "UnnatiTransaction/PostRedemptionData");

                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public string SetInputData(string InputData, string ReportType, string FileName)
        {
            Session["InputData"] = InputData;
            Session["ReportType"] = ReportType;
            Session["FileName"] = FileName;
            return "";
        }

        [HttpPost]
        public ActionResult LoadData()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();
                //Find Order Column
                var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
                var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
                string search = Request.Params["sSearch"];
                string searchvalue = Request.Form.GetValues("search[value]").FirstOrDefault();


                string json = Session["ReportJsonstring"].ToString();

                Dictionary<string, dynamic> values = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);
                var TypeofView = values["Type"].ToString();// Getting type of view whethere it is Preview or simple get

                values.Add("draw", draw);
                values.Add("start", start);
                values.Add("length", length);
                values.Add("sortColumn", sortColumn);
                values.Add("sortColumnDir", sortColumnDir);
                values.Add("searchvalue", searchvalue);
                string Data = JsonConvert.SerializeObject(values);
                JsonResult JR = new JsonResult();

                if (TypeofView == "Get")
                {
                    if (values["ReportName"].ToString() == "MarketMapHIL")
                    {
                        JR.Data = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData", Data, 20 * 60 * 1000);

                    }
                    else
                    {
                        JR.Data = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData", Data, 20 * 60 * 1000);

                        /* Recent Comment*/
                        //iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData");
                        //JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;

                        /* Recent Comment*/
                    }
                }
                else
                {
                    iAppUtils.HttpClient clt1 = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/PreviewSelectedColumnData");
                    JR.Data = clt1.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                }


                var ResultJson = JObject.Parse(JR.Data.ToString());
                var data = ResultJson["data"].ToString();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                var d = jss.Deserialize<dynamic>(data);

                draw = (ResultJson["draw"].ToString());
                int recordsTotal = 0;
                recordsTotal = Convert.ToInt32(ResultJson["recordsTotal"].ToString());

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = d }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);

            }
        }

        //[HttpPost]
        [Authorize]
        public string GenerateReport()
        {
            string conjsonlist;

            Utility.Utility Util = new Utility.Utility();

            try
            {
                JsonResult JR = new JsonResult();
                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData_Download");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;

                JR.MaxJsonLength = int.MaxValue;

                JArray Jar = null;

                if (FileName == "TransactionStatusReport")
                {
                    Jar = JArray.Parse(JR.Data.ToString());
                    for (int t = 0; t < Jar.Count; t++)
                    {
                        if (Jar[t]["Total Quantity (Mtr)"].ToString() == "<>" || Jar[t]["Total Quantity (Mtr)"].ToString() == "" || Jar[t]["Total Quantity (Mtr)"].ToString() == null)
                        {
                            Jar[t]["Total Quantity (Mtr)"] = "0";
                        }
                    }
                    JR.Data = JsonConvert.SerializeObject(Jar);
                }

                JObject IPAT = JObject.Parse(InputData);

                //{"ID":"561","UserCode":"561","ReportName":"UnnatiTransactionSummaryMemberWise","WhereClause":" where CONVERT(DATE,REWARD_POSTING_DATE)>= '2015-12-27' AND CONVERT(DATE,REWARD_POSTING_DATE)<='2016-07-08' AND POINTS>=0  GROUP BY UT.MEMBERSHIP_ID,UME.ENROLLEMENT_DATE, UT.AGENCY_NAME,UT.FSO_NAME "}

                if (IPAT["ReportName"].ToString() == "UnnatiTransactionSummarySKUWise")
                {
                    Jar = JArray.Parse(JR.Data.ToString());
                    for (int t = 0; t < Jar.Count; t++)
                    {
                        if (Jar[t]["Total Purchase Quantity (Mtr)"].ToString() == "<>" || Jar[t]["Total Purchase Quantity (Mtr)"].ToString() == "" || Jar[t]["Total Purchase Quantity (Mtr)"].ToString() == null)
                        {
                            Jar[t]["Total Purchase Quantity (Mtr)"] = "0";
                        }
                    }
                    JR.Data = JsonConvert.SerializeObject(Jar);
                }

                if (IPAT["ReportName"].ToString() == "LoginAuditLog")
                {
                    Jar = JArray.Parse(JR.Data.ToString());

                    for (int t = 0; t < Jar.Count; t++)
                    {
                        if (Jar[t]["Login Date/Time"].ToString() == "")
                        {
                            Jar[t]["Login Date/Time"] = null;
                        }

                        if (Jar[t]["Logout Date/Time"].ToString() == "")
                        {
                            Jar[t]["Logout Date/Time"] = null;
                        }

                    }
                    JR.Data = JsonConvert.SerializeObject(Jar);


                }


                Jar = null;




                //{"MasterType":"LoginAuditLog","ID":"561","UserCode":"50001342","Type":"Get","ReportName":"LoginAuditLog","WhereClause":" left join cms_employeemaster em on em.EMPLOYEE_CODE = AL.USER_CODE left join CUSTOMER_SALES_VIEW csv on csv.cust_code = AL.USER_CODE "}
                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));
                /* Added new columns Author:svprasadk*/
                if (IPAT["ReportName"].ToString() == "LoginAuditLog")
                {
                    dtValue.Columns.Add("Login Date").SetOrdinal(3);
                    dtValue.Columns.Add("Login Time").SetOrdinal(4);
                    dtValue.Columns.Add("Logout Date").SetOrdinal(6);
                    dtValue.Columns.Add("Logout Time").SetOrdinal(7);
                    dtValue.Columns.Add("Logged Minutes").SetOrdinal(8);
                }

                if (dtValue.Rows.Count > 0)
                {
                    string csv = string.Empty; ;
                    StringBuilder sb = new StringBuilder();

                    if (ReportType == "PDF" || ReportType == "EXCEL")
                    {
                        sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                        sb.Append("style='border: solid 1px Black;  '>");

                        sb.Append("<thead>");

                        sb.Append("<tr >");
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                            /* Append new columns Author:svprasadk*/
                            if (IPAT["ReportName"].ToString() == "LoginAuditLog")
                            {
                                if (dtValue.Columns[i].ToString().Equals("Login Date/Time"))
                                {
                                    sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>Login Date</th>");
                                    sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>Login Time</th>");
                                }
                                if (dtValue.Columns[i].ToString().Equals("Logout Date/Time"))
                                {
                                    sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>Logout Date</th>");
                                    sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>Logout Time</th>");
                                }
                                if (dtValue.Columns[i].ToString().Equals("Logged Minutes"))
                                {
                                    sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>Logged Minutes</th>");
                                }
                            }
                        }
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");

                        foreach (DataRow row in dtValue.Rows)
                        {
                            sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                //sb.Append("<td>" + array[i].ToString() + "</td>");
                                /* updated column values Author:svprasadk*/
                                if (IPAT["ReportName"].ToString() == "LoginAuditLog")
                                {
                                    if (i == 2)
                                    {
                                        String LoginDateTime = array[i].ToString();
                                        string[] DateTime = LoginDateTime.Split(' ');
                                        row[3] = DateTime[0];
                                        sb.Append("<td>" + DateTime[0] + "</td>");
                                        row[4] = DateTime[1];
                                        sb.Append("<td>" + DateTime[1] + "</td>");
                                    }
                                    else if (i == 5)
                                    {
                                        if (array[i].ToString().Equals("") || array[i].ToString().Equals("NULL"))
                                        {
                                            row[6] = "";
                                            sb.Append("<td>&nbsp;</td>");
                                            row[7] = "";
                                            sb.Append("<td>&nbsp;</td>");
                                        }
                                        else
                                        {
                                            String LoginDateTime = array[i].ToString();
                                            string[] DateTime = LoginDateTime.Split(' ');
                                            row[6] = DateTime[0];
                                            sb.Append("<td>" + DateTime[0] + "</td>");
                                            row[7] = DateTime[1];
                                            sb.Append("<td>" + DateTime[1] + "</td>");
                                        }
                                    }
                                    else if (i == 8)
                                    {
                                        if (row[6] != "")
                                        {
                                            //DateTime startTime = (DateTime)row[2];
                                            //DateTime endTime = (DateTime)row[5];

                                            DateTime startTime = Convert.ToDateTime(array[2].ToString());
                                            DateTime endTime = Convert.ToDateTime(array[5].ToString());

                                            TimeSpan span = endTime.Subtract(startTime);
                                            row[8] = span;
                                            sb.Append("<td>" + span + "</td>");
                                        }
                                        else
                                        {
                                            row[8] = "";
                                            sb.Append("<td>&nbsp;</td>");
                                        }
                                    }
                                    else
                                    {
                                        sb.Append("<td>" + array[i].ToString() + "</td>");
                                    }
                                }
                                else
                                {
                                    sb.Append("<td>" + array[i].ToString() + "</td>");
                                }

                            }
                            sb.Append("</tr>");
                        }

                        sb.Append("</tbody>");
                        sb.Append("</table>");

                        csv += sb.ToString();
                    }
                    if (ReportType == "PDF")
                    {
                        //Response.AppendHeader("content-disposition", "attachment;filename=Report.pdf");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/pdf";
                        //Response.Write(csv);
                        //Response.End();

                        //csv = "<p>Invoice</p><table><thead><tr><th>firstname</th><th>Lastname</th></tr></thead><tbody><tr><td>shiva</td><td>kiran</td></tr><tr><td>shiva</td><td>kiran</td></tr></tbody></table>";
                        Response.Clear();
                        Response.ContentType = "application/pdf";
                        Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".pdf");
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.BinaryWrite(ExcelUtility.GetPDF(csv));
                        Response.End();
                    }
                    else if (ReportType == "EXCEL")
                    {


                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            wb.Worksheets.Add(dtValue, FileName);

                            Util.LogMessage("" + dtValue + "");

                            Response.Clear();
                            Response.Buffer = true;
                            Response.Charset = "";
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".xlsx");
                            using (MemoryStream MyMemoryStream = new MemoryStream())
                            {
                                wb.SaveAs(MyMemoryStream);
                                MyMemoryStream.WriteTo(Response.OutputStream);
                                Response.Flush();
                                Response.End();
                            }
                        }


                        //Response.Clear();
                        //Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".xls");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/vnd.ms-excel";
                        //Response.Write(csv);
                        //Response.End();

                    }
                    else if (ReportType == "TEXT")
                    {
                        string File_Text = string.Empty;
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            if (i == dtValue.Columns.Count - 1)
                            {
                                File_Text += dtValue.Columns[i].ToString();
                            }
                            else
                            {
                                File_Text += dtValue.Columns[i].ToString() + "|";
                            }
                        }
                        File_Text += Environment.NewLine;
                        foreach (DataRow row in dtValue.Rows)
                        {

                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                if (i == array.Length - 1)
                                {
                                    File_Text += array[i].ToString();
                                }
                                else
                                {
                                    File_Text += array[i].ToString() + "|";
                                }
                            }
                            File_Text += Environment.NewLine;
                        }

                        Response.Clear();
                        Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".txt");
                        Response.Charset = "";
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.ContentType = "text/xml";
                        Response.Write(File_Text);
                        Response.End();

                    }
                    return "";
                }
                else
                {
                    //Response.Clear();
                    //Response.End();
                    return " There is no data";
                }


            }
            catch (Exception ex)
            {
                //new Utility().
                string errorresult = ex.Message.ToString();

                Util.LogError("Message : " + ex.Message.ToString());

                return "Error";
            }
        }


        [Authorize]
        public string GenerateReport_Inactive_UserList(string Data)
        {
            string conjsonlist;

            Utility.Utility Util = new Utility.Utility();

            try
            {
                JsonResult JR = new JsonResult();
                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetUsersList");
                JR.Data = clt.MakeRequest("POST", FileName, iAppUtils.HttpContentType.json).ResponseBody;

                JR.MaxJsonLength = int.MaxValue;
                //{"MasterType":"LoginAuditLog","ID":"561","UserCode":"50001342","Type":"Get","ReportName":"LoginAuditLog","WhereClause":" left join cms_employeemaster em on em.EMPLOYEE_CODE = AL.USER_CODE left join CUSTOMER_SALES_VIEW csv on csv.cust_code = AL.USER_CODE "}
                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));


                if (dtValue.Rows.Count > 0)
                {
                    string csv = string.Empty; ;
                    StringBuilder sb = new StringBuilder();
                    if (ReportType == "PDF" || ReportType == "EXCEL")
                    {
                        sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                        sb.Append("style='border: solid 1px Black;  '>");

                        sb.Append("<thead>");

                        sb.Append("<tr >");
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                        }
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");

                        foreach (DataRow row in dtValue.Rows)
                        {
                            sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                sb.Append("<td>" + array[i].ToString() + "</td>");
                            }
                            sb.Append("</tr>");
                        }

                        sb.Append("</tbody>");
                        sb.Append("</table>");

                        csv += sb.ToString();
                    }
                    if (ReportType == "PDF")
                    {
                        //Response.AppendHeader("content-disposition", "attachment;filename=Report.pdf");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/pdf";
                        //Response.Write(csv);
                        //Response.End();

                        //csv = "<p>Invoice</p><table><thead><tr><th>firstname</th><th>Lastname</th></tr></thead><tbody><tr><td>shiva</td><td>kiran</td></tr><tr><td>shiva</td><td>kiran</td></tr></tbody></table>";
                        Response.Clear();
                        Response.ContentType = "application/pdf";
                        Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".pdf");
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.BinaryWrite(ExcelUtility.GetPDF(csv));
                        Response.End();
                    }
                    else if (ReportType == "EXCEL")
                    {


                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            wb.Worksheets.Add(dtValue, FileName);

                            Util.LogMessage("" + dtValue + "");

                            Response.Clear();
                            Response.Buffer = true;
                            Response.Charset = "";
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".xlsx");
                            using (MemoryStream MyMemoryStream = new MemoryStream())
                            {
                                wb.SaveAs(MyMemoryStream);
                                MyMemoryStream.WriteTo(Response.OutputStream);
                                Response.Flush();
                                Response.End();
                            }
                        }


                        //Response.Clear();
                        //Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".xls");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/vnd.ms-excel";
                        //Response.Write(csv);
                        //Response.End();

                    }
                    else if (ReportType == "TEXT")
                    {
                        string File_Text = string.Empty;
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            if (i == dtValue.Columns.Count - 1)
                            {
                                File_Text += dtValue.Columns[i].ToString();
                            }
                            else
                            {
                                File_Text += dtValue.Columns[i].ToString() + "|";
                            }
                        }
                        File_Text += Environment.NewLine;
                        foreach (DataRow row in dtValue.Rows)
                        {

                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                if (i == array.Length - 1)
                                {
                                    File_Text += array[i].ToString();
                                }
                                else
                                {
                                    File_Text += array[i].ToString() + "|";
                                }
                            }
                            File_Text += Environment.NewLine;
                        }

                        Response.Clear();
                        Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".txt");
                        Response.Charset = "";
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.ContentType = "text/xml";
                        Response.Write(File_Text);
                        Response.End();

                    }
                    return "";
                }
                else
                {
                    //Response.Clear();
                    //Response.End();
                    return " There is no data";
                }


            }
            catch (Exception ex)
            {
                //new Utility().
                string errorresult = ex.Message.ToString();

                Util.LogError("Message : " + ex.Message.ToString());

                return "Error";
            }
        }


        [Authorize]
        public string GenerateReport_CustomerMapping()
        {
            string conjsonlist;

            try
            {
                JsonResult JR = new JsonResult();
                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GenerateReport_CustomerMapping_Download");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;


                JR.MaxJsonLength = int.MaxValue;

                JArray Jar = null;

                Jar = null;


                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));
                if (dtValue.Rows.Count > 0)
                {
                    string csv = string.Empty; ;
                    StringBuilder sb = new StringBuilder();
                    if (ReportType == "PDF" || ReportType == "EXCEL")
                    {
                        sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                        sb.Append("style='border: solid 1px Black;  '>");

                        sb.Append("<thead>");

                        sb.Append("<tr >");
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                        }
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");

                        foreach (DataRow row in dtValue.Rows)
                        {
                            sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                sb.Append("<td>" + array[i].ToString() + "</td>");
                            }
                            sb.Append("</tr>");
                        }

                        sb.Append("</tbody>");
                        sb.Append("</table>");

                        csv += sb.ToString();
                    }
                    if (ReportType == "PDF")
                    {
                        //Response.AppendHeader("content-disposition", "attachment;filename=Report.pdf");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/pdf";
                        //Response.Write(csv);
                        //Response.End();

                        //csv = "<p>Invoice</p><table><thead><tr><th>firstname</th><th>Lastname</th></tr></thead><tbody><tr><td>shiva</td><td>kiran</td></tr><tr><td>shiva</td><td>kiran</td></tr></tbody></table>";
                        Response.Clear();
                        Response.ContentType = "application/pdf";
                        Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".pdf");
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.BinaryWrite(ExcelUtility.GetPDF(csv));
                        Response.End();
                    }
                    else if (ReportType == "EXCEL")
                    {


                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            wb.Worksheets.Add(dtValue, FileName);

                            Response.Clear();
                            Response.Buffer = true;
                            Response.Charset = "";
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".xlsx");
                            using (MemoryStream MyMemoryStream = new MemoryStream())
                            {
                                wb.SaveAs(MyMemoryStream);
                                MyMemoryStream.WriteTo(Response.OutputStream);
                                Response.Flush();
                                Response.End();
                            }
                        }


                        //Response.Clear();
                        //Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".xls");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/vnd.ms-excel";
                        //Response.Write(csv);
                        //Response.End();

                    }
                    else if (ReportType == "TEXT")
                    {
                        string File_Text = string.Empty;
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            if (i == dtValue.Columns.Count - 1)
                            {
                                File_Text += dtValue.Columns[i].ToString();
                            }
                            else
                            {
                                File_Text += dtValue.Columns[i].ToString() + "|";
                            }
                        }
                        File_Text += Environment.NewLine;
                        foreach (DataRow row in dtValue.Rows)
                        {

                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                if (i == array.Length - 1)
                                {
                                    File_Text += array[i].ToString();
                                }
                                else
                                {
                                    File_Text += array[i].ToString() + "|";
                                }
                            }
                            File_Text += Environment.NewLine;
                        }

                        Response.Clear();
                        Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".txt");
                        Response.Charset = "";
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.ContentType = "text/xml";
                        Response.Write(File_Text);
                        Response.End();

                    }
                    return "";
                }
                else
                {
                    //Response.Clear();
                    //Response.End();
                    return " There is no data";
                }


            }
            catch (Exception ex)
            {
                //new Utility().
                string errorresult = ex.Message.ToString();

                return "Error";
            }
        }

        #endregion


        [Authorize]
        public JsonResult GetMasters(string Data)
        {
            JsonResult JR = new JsonResult();

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetMasterData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }



        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public string Exportdata(string QueryVal)
        {
            try
            {
                Session["htmlstr"] = QueryVal;
                System.IO.StreamWriter file = new System.IO.StreamWriter(Path.Combine(Server.MapPath("~/popup"), "temp.html").ToString());
                file.WriteLine(QueryVal);
                file.Close();
                return "ok";
            }
            catch (Exception Exc)
            {
                (new Utility.Utility()).LogError("Error : Exportdata : " + Exc);
                throw Exc;
            }
        }


        [Authorize]
        public ActionResult GetPDF(string reportname)
        {
            try
            {
                var htmlContent = System.IO.File.ReadAllText(Server.MapPath("~/popup/temp.html"));
                var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
                string TargetPDFPath = Server.MapPath("~/rdlcpdf/" + reportname + ".pdf");
                htmlToPdf.GeneratePdf(htmlContent, null, TargetPDFPath);
                return File(System.IO.File.ReadAllBytes(Path.Combine(Server.MapPath("~/rdlcpdf"), TargetPDFPath).ToString()), "application/pdf", reportname + ".pdf");
            }
            catch (Exception Exc)
            {
                (new Utility.Utility()).LogError("Error : GetPDF : " + Exc);
                return null;
            }
        }
        public string SendEmail(string reportname, string EmpMail, string MailBody, string UserType)
        {
            try
            {

                DIMS.Models.UserProperties up = (DIMS.Models.UserProperties)Session["UP"];
                DataTable DT = new DataBase.Database().FillDataTable("SELECT PROPERTY_NAME,VALUE FROM DimsSystemConfiguration", "");
                string MailHost = string.Empty;
                string MailPort = string.Empty;
                string MailSender = string.Empty;
                string MUserName = string.Empty;
                string MPassword = string.Empty;
                new DIMS.Utility.Utility().LogError("DETAILS : MailHost : " + MailHost + "  MailPort" + MailPort + "");
                if (DT.Rows.Count > 0)
                {
                    foreach (DataRow Row in DT.Rows)
                    {
                        if (Row["PROPERTY_NAME"].ToString() == "MailHost")
                        {
                            MailHost = Row["VALUE"].ToString();
                        }
                        else if (Row["PROPERTY_NAME"].ToString() == "MailSender")
                        {
                            MailSender = Row["VALUE"].ToString();
                        }
                        else if (Row["PROPERTY_NAME"].ToString() == "MailPortNo")
                        {
                            MailPort = Row["VALUE"].ToString();
                        }
                        else if (Row["PROPERTY_NAME"].ToString() == "MailUserName")
                        {
                            MUserName = Row["VALUE"].ToString();
                        }
                        else if (Row["PROPERTY_NAME"].ToString() == "MailPassword")
                        {
                            MPassword = Row["VALUE"].ToString();
                        }
                    }
                }
                string str = ConfigurationManager.AppSettings["ServerType"].ToString();
                if (str == "EWS")
                {
                    string _filePath = Path.Combine(Path.GetDirectoryName(System.AppDomain.CurrentDomain.BaseDirectory), @"rdlcpdf/" + reportname + ".pdf");

                    ExchangeService _exchange_service = new ExchangeService(ExchangeVersion.Exchange2010_SP1);
                    _exchange_service.Credentials = new WebCredentials(MUserName, MPassword);
                    _exchange_service.AutodiscoverUrl(MailSender);
                    new DIMS.Utility.Utility().LogError("Error :" + _exchange_service);
                    EmailMessage mail = new EmailMessage(_exchange_service);
                    mail.Subject = reportname;
                    mail.Body = MailBody;
                    mail.Attachments.AddFileAttachment(Path.Combine(Server.MapPath("~/rdlcpdf"), "" + reportname + ".pdf").ToString());
                    if (UserType == "STOCKIST" && UserType != "")
                    {
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            byte[] bytes = memoryStream.ToArray();
                            mail.Attachments.AddFileAttachment(new System.Net.Mail.Attachment(new MemoryStream(bytes), reportname + ".pdf").ToString());
                        }
                    }
                    mail.ToRecipients.Add(EmpMail);
                    mail.SendAndSaveCopy();
                    new DIMS.Utility.Utility().LogError("DETAILS : MailHost : " + MailHost + "  M");
                    return "MailSentSuccessfully";
                }
                else
                {
                    string _filePath = Path.Combine(Path.GetDirectoryName(System.AppDomain.CurrentDomain.BaseDirectory), @"rdlcpdf/" + reportname + ".pdf");
                    SmtpClient smtp = new SmtpClient(MailHost);
                    MailMessage mail = new MailMessage(MailSender, EmpMail);
                    mail.From = new MailAddress(MailSender, "DIMS-HIL");
                    mail.Subject = reportname;
                    mail.Body = MailBody;
                    System.Net.Mail.Attachment attachment;
                    if (UserType == "STOCKIST" && UserType != "")
                    {
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            byte[] bytes = memoryStream.ToArray();
                            mail.Attachments.Add(new System.Net.Mail.Attachment(new MemoryStream(bytes), reportname + ".pdf"));
                        }
                    }
                    else
                    {

                        attachment = new System.Net.Mail.Attachment(Path.Combine(Server.MapPath("~/rdlcpdf"), "" + reportname + ".pdf").ToString());
                        attachment.ContentDisposition.FileName = reportname + ".pdf";
                        mail.Attachments.Add(attachment);
                    }
                    mail.IsBodyHtml = true;
                    smtp.Credentials = new NetworkCredential(MUserName, MPassword);
                    smtp.Port = Convert.ToInt32(MailPort);
                    smtp.EnableSsl = true;
                    ServicePointManager.ServerCertificateValidationCallback = (RemoteCertificateValidationCallback)((s, certificate, chain, sslPolicyErrors) => true);
                    smtp.Send(mail);
                    return "MailSentSuccessfully";
                }

            }
            catch (Exception ex)
            {
                new DIMS.Utility.Utility().LogError("Error : GetPDF : " + ex?.ToString());
                return "Mail not Sent";
            }
        }
        [Authorize]
        public string GetPDF_STOCKIST(string reportname)
        {
            try
            {
                var htmlContent = System.IO.File.ReadAllText(Server.MapPath("~/popup/temp.html"));
                var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
                string TargetPDFPath = Server.MapPath("~/rdlcpdf/" + reportname + ".pdf");
                htmlToPdf.GeneratePdf(htmlContent, null, TargetPDFPath);
                //  UserProperties up = new UserProperties();
                DIMS.Models.UserProperties up = (DIMS.Models.UserProperties)Session["UP"];
                string UserCode = up.UserCode;
                // string UserCode = "0001100114";
                string EmpMail = GetUserEmailId(UserCode);
                string MailBody = "";
                if (EmpMail == "")
                {
                    EmpMail = "dims@hil.in";
                }
                string path = Path.Combine(Server.MapPath("../") + "rdlcpdf/" + reportname + ".pdf");
                long length = new System.IO.FileInfo(path).Length;
                if (length < 10485760)
                {
                    MailBody = "Dear " + up.UserName + ",<br/><br/>";
                    MailBody += "Your " + reportname + " comes in an easy to view PDF (printable download format) and is<br/>";
                    MailBody += " attached with this mail.<br/><br/>";
                    MailBody += "<b>Instructions for opening your e-statement:</b><br/>";
                    MailBody += "To open this secure encrypted file, all you need is Adobe Acrobat PDF format version 7.<br/>";
                    MailBody += " You can download the free version of Adobe Acrobat Reader by clicking on this link <a href='http://www.adobe.com/products/acrobat/readstep2.html' target='_blank'>Please Click here to get adobe</a><br/><br/>";
                    MailBody += "<b>Please note:</b> You will not be able to 'Reply' to this email.<br/><br/>";
                    MailBody += "For any further queries please write to us at  http://dims.support@hil.in or get in touch with HIL Sales representative of your area.<br/>";
                    MailBody += "<br/><br/><br/>";
                    MailBody += "Thank You.<br/>";
                    MailBody += "<br/>";
                    MailBody += "Regards,<br/>";
                    MailBody += "Team HIL Ltd.";
                    string mail = SendEmail(reportname, EmpMail, MailBody, "");
                    return mail;
                }
                else
                {
                    return "File size should be lessthan 10MB";
                }
            }

            catch (Exception ex)
            {
                new DIMS.Utility.Utility().LogError("Error : GetPDF : " + ex?.ToString());
                return "Mail not Sent";
            }

        }
        //Vikas G, 2022-oct-27 Mai Sending for sales return.
        [Authorize]
        public string GetPDF_SalesReturn(string reportname)
        {
            try
            {
                var htmlContent = System.IO.File.ReadAllText(Server.MapPath("~/popup/temp.html"));
                var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
                string TargetPDFPath = Server.MapPath("~/rdlcpdf/" + reportname + ".pdf");
                htmlToPdf.GeneratePdf(htmlContent, null, TargetPDFPath);
                //  UserProperties up = new UserProperties();
                DIMS.Models.UserProperties up = (DIMS.Models.UserProperties)Session["UP"];
                string UserProductTypeCode = up.USER_PRODUCT_TYPE_CODE;
                string[] ReportNameSplit = reportname.Split('_');
                string Doc_no = ReportNameSplit[1];
                string Result = "";
                DataTable DT1 = new DataTable();
                // string UserCode = "0001100114";             
                using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSDBConnection"].ToString()))
                {
                    String HTML = "";
                    String sql = "[dbo].[usp_SalesReturnEmails]";

                    using (SqlCommand command = new SqlCommand(sql, conn))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add("@DOC_NO", SqlDbType.VarChar);
                        command.Parameters["@DOC_NO"].Value = Doc_no;
                        // add any extra parameters and then:                       
                        conn.Open();
                        SqlDataReader dr = command.ExecuteReader();

                        DT1.Load(dr);
                        // process or return dt or dr
                        Result = JsonConvert.SerializeObject(DT1);
                        Result = Regex.Replace(Result, @"\bnull\b", "\"\"");
                    }

                }
                new DIMS.Utility.Utility().LogError("Error : EmployeeObj : " + Result);
                //string EmpMail = GetSalesReturnUserEmailId(Doc_no);
                string EmpMail = "";
                string EmpUserName = "";
                string DivisionName = "";

                //foreach (DataRow Row in DT1.Rows)
                //{
                //    EmpUserName = Row["FSOName"].ToString();
                //    EmpUserName += EmpUserName;
                //}
                //new DIMS.Utility.Utility().LogError("Error : Get EmployeeList : " + EmpUserName);

                //if(EmpMail.Contains(",,"))
                //{
                //    EmpMail.Replace(",,", ",");
                //}
                //string[] EmailName = EmpMail.Split(',');
                //string UserName = "' "+ EmailName[0] + " ',' " + EmailName[1] + " ',' " + EmailName[2] + " ',' " + EmailName[3] + " ',' " + EmailName[4] + " '";


                //DataTable DT1 = new DataBase.Database().FillDataTable("SELECT EMPLOYEE_NAME FROM cms_employeemaster WHERE EMAIL in (" + UserName + ")", "");
                //EmpMail = "vikas.ghodekari@hil.in";
                if (DT1.Rows.Count == 0)
                {
                    EmpMail = "dims@hil.in";
                }

                string path = Path.Combine(Server.MapPath("../") + "rdlcpdf/" + reportname + ".pdf");
                long length = new System.IO.FileInfo(path).Length;
                if (length < 10485760)
                {
                    DataTable DT = new DataBase.Database().FillDataTable("SELECT PROPERTY_NAME,VALUE FROM DimsSystemConfiguration", "");
                    string MailHost = string.Empty;
                    string MailPort = string.Empty;
                    string MailSender = string.Empty;
                    string MUserName = string.Empty;
                    string MPassword = string.Empty;
                    if (DT.Rows.Count > 0)
                    {
                        foreach (DataRow Row in DT.Rows)
                        {
                            if (Row["PROPERTY_NAME"].ToString() == "MailHost")
                            {
                                MailHost = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailSender")
                            {
                                MailSender = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailPortNo")
                            {
                                MailPort = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailUserName")
                            {
                                MUserName = Row["VALUE"].ToString();
                            }
                            else if (Row["PROPERTY_NAME"].ToString() == "MailPassword")
                            {
                                MPassword = Row["VALUE"].ToString();
                            }
                        }
                    }

                    foreach (DataRow Row in DT1.Rows)
                    {
                        EmpMail = Row["FSOEmail"].ToString();
                        EmpUserName = Row["FSOName"].ToString();
                        DivisionName = Row["DivisionName"].ToString();
                        //if ((EmpMail != "" || EmpMail != null || String.IsNullOrEmpty(EmpMail)) && (EmpUserName != "" || EmpUserName != null || String.IsNullOrEmpty(EmpUserName)))
                        if (!String.IsNullOrEmpty(EmpMail) && !String.IsNullOrEmpty(EmpUserName) && !String.IsNullOrEmpty(DivisionName))
                        {
                            new DIMS.Utility.Utility().LogError("Error : Get EmployeeList : " + EmpUserName);
                            string _filePath = Path.Combine(Path.GetDirectoryName(System.AppDomain.CurrentDomain.BaseDirectory), @"rdlcpdf/" + reportname + ".pdf");
                            SmtpClient smtp = new SmtpClient(MailHost);
                            MailMessage mail = new MailMessage(MailSender, EmpMail);
                            mail.From = new MailAddress(MailSender, "DIMS-HIL");
                            mail.Subject = DivisionName + '-' + reportname;
                            mail.Body = "Dear " + EmpUserName + ",<br/><br/>";
                            mail.Body += "Your " + reportname + " comes in an easy to view PDF (printable download format) and is<br/>";
                            mail.Body += " attached with this mail.<br/><br/>";
                            mail.Body += "<b>Instructions for opening your e-statement:</b><br/>";
                            mail.Body += "To open this secure encrypted file, all you need is Adobe Acrobat PDF format version 7.<br/>";
                            mail.Body += " You can download the free version of Adobe Acrobat Reader by clicking on this link <a href='http://www.adobe.com/products/acrobat/readstep2.html' target='_blank'>Please Click here to get adobe</a><br/><br/>";
                            mail.Body += "<b>Please note:</b> You will not be able to 'Reply' to this email.<br/><br/>";
                            mail.Body += "For any further queries please write to us at  http://dims.support@hil.in or get in touch with HIL Sales representative of your area.<br/>";

                            mail.Body += "<br/><br/><br/>";
                            mail.Body += "Thank You.<br/>";
                            mail.Body += "<br/>";
                            mail.Body += "Regards,<br/>";
                            mail.Body += "Team HIL Ltd.";
                            System.Net.Mail.Attachment attachment;
                            attachment = new System.Net.Mail.Attachment(Path.Combine(Server.MapPath("~/rdlcpdf"), "" + reportname + ".pdf").ToString());
                            attachment.ContentDisposition.FileName = reportname + ".pdf";
                            mail.Attachments.Add(attachment);
                            mail.IsBodyHtml = true;
                            smtp.Credentials = new NetworkCredential(MUserName, MPassword);
                            smtp.Port = Convert.ToInt32(MailPort);
                            smtp.EnableSsl = true;
                            ServicePointManager.ServerCertificateValidationCallback = (RemoteCertificateValidationCallback)((s, certificate, chain, sslPolicyErrors) => true);
                            smtp.Send(mail);
                        }
                        else
                        {

                        }
                    }
                    return "Mail Sent Successfully";
                }
                else
                {
                    return "File size should be lessthan 10MB";
                }
                //return File(System.IO.File.ReadAllBytes(Path.Combine(Server.MapPath("~/rdlcpdf"), TargetPDFPath).ToString()), "application/pdf", reportname + ".pdf");
            }
            catch (Exception ex)
            {
                new DIMS.Utility.Utility().LogError("Error : GetPDF : " + ex?.ToString());
                return "Mail not Sent";
                //return null;
            }

        }

        [Authorize]
        public string GenerateReport_SAP()
        {
            string conjsonlist;

            try
            {
                JsonResult JR = new JsonResult();
                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();
                //  UserProperties UP = new UserProperties();
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                string UserCode = UP.UserCode;
                string UserType = UP.UserType;
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData_Download_WithSerchFilter");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;


                JR.MaxJsonLength = int.MaxValue;

                JArray Jar = null;

                if (FileName == "TransactionStatusReport")
                {
                    Jar = JArray.Parse(JR.Data.ToString());
                    for (int t = 0; t < Jar.Count; t++)
                    {
                        if (Jar[t]["Total Meters"].ToString() == "<>" || Jar[t]["Total Meters"].ToString() == "" || Jar[t]["Total Meters"].ToString() == null)
                        {
                            Jar[t]["Total Meters"] = "0";
                        }
                    }
                    JR.Data = JsonConvert.SerializeObject(Jar);
                }

                if (FileName == "TransactionSummaryReport")
                {
                    Jar = JArray.Parse(JR.Data.ToString());
                    for (int t = 0; t < Jar.Count; t++)
                    {
                        if (Jar[t]["Total Value Purchase in meters"].ToString() == "<>" || Jar[t]["Total Value Purchase in meters"].ToString() == "" || Jar[t]["Total Value Purchase in meters"].ToString() == null)
                        {
                            Jar[t]["Total Value Purchase in meters"] = "0";
                        }
                    }
                    JR.Data = JsonConvert.SerializeObject(Jar);
                }

                Jar = null;


                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));
                if (dtValue.Rows.Count > 0)
                {
                    string csv = string.Empty; ;
                    StringBuilder sb = new StringBuilder();
                    if (ReportType == "PDF" || ReportType == "EXCEL")
                    {
                        sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                        sb.Append("style='border: solid 1px Black;  '>");

                        sb.Append("<thead>");

                        sb.Append("<tr >");
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                        }
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");

                        foreach (DataRow row in dtValue.Rows)
                        {
                            sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                sb.Append("<td>" + array[i].ToString() + "</td>");
                            }
                            sb.Append("</tr>");
                        }

                        sb.Append("</tbody>");
                        sb.Append("</table>");

                        csv += sb.ToString();
                    }
                    if (ReportType == "PDF")
                    {
                        //Response.AppendHeader("content-disposition", "attachment;filename=Report.pdf");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/pdf";
                        //Response.Write(csv);
                        //Response.End();

                        //csv = "<p>Invoice</p><table><thead><tr><th>firstname</th><th>Lastname</th></tr></thead><tbody><tr><td>shiva</td><td>kiran</td></tr><tr><td>shiva</td><td>kiran</td></tr></tbody></table>";
                        Response.Clear();
                        Response.ContentType = "application/pdf";
                        Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".pdf");
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.BinaryWrite(ExcelUtility.GetPDF(csv));
                        Response.End();
                    }
                    else if (ReportType == "EXCEL")
                    {

                        //Response.Clear();
                        //Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".xls");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/vnd.ms-excel";
                        //Response.Write(csv);
                        //Response.End();

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            wb.Worksheets.Add(dtValue, FileName);
                            //wb.Worksheets.Add(dtValue, "Credit Notes");

                            Response.Clear();
                            Response.Buffer = true;
                            Response.Charset = "";
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".xlsx");
                            using (MemoryStream MyMemoryStream = new MemoryStream())
                            {
                                wb.SaveAs(MyMemoryStream);
                                MyMemoryStream.WriteTo(Response.OutputStream);
                                Response.Flush();
                                Response.End();
                            }
                        }
                    }
                    #region TEXT
                    else if (ReportType == "TEXT")
                    {
                        string File_Text = string.Empty;
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            if (i == dtValue.Columns.Count - 1)
                            {
                                File_Text += dtValue.Columns[i].ToString();
                            }
                            else
                            {
                                File_Text += dtValue.Columns[i].ToString() + "|";
                            }
                        }
                        File_Text += Environment.NewLine;
                        foreach (DataRow row in dtValue.Rows)
                        {

                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                if (i == array.Length - 1)
                                {
                                    File_Text += array[i].ToString();
                                }
                                else
                                {
                                    File_Text += array[i].ToString() + "|";
                                }
                            }
                            File_Text += Environment.NewLine;
                        }

                        Response.Clear();
                        Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".txt");
                        Response.Charset = "";
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.ContentType = "text/xml";
                        Response.Write(File_Text);
                        Response.End();

                    }
                    #endregion TEXT
                    return "";
                }
                else
                {
                    //Response.Clear();
                    //Response.End();
                    return " There is no data";
                }


            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return "Error";
            }
        }

        [Authorize]
        public string GetUserEmailId(string UserCode)
        {
            string Result = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetUserEmailId");
                Result = clt.MakeRequest("POST", UserCode, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                Result = "";
            }
            return Result;
        }

        [Authorize]
        public string GetSalesReturnUserEmailId(string ProductTypeCode)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetSalesReturnUserEmailId");
                Result = clt.MakeRequest("POST", ProductTypeCode, iAppUtils.HttpContentType.json).ResponseBody;
                //JR.MaxJsonLength = int.MaxValue;
                //JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

                //JArray Jar = null;
                //DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));
                //if (dtValue.Rows.Count > 0)
                //{
                //}
            }
            catch (Exception EX)
            {
                Result = "";
            }
            return Result;
        }

        [Authorize]
        public string GenerateReport_SAP_STOCKIST()
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();

            JsonResult JSonRes = new JsonResult();
            JSonRes.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {

                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();
                // UserProperties UP = new UserProperties();
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                string UserCode = UP.UserCode;
                string UserType = UP.UserType;

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData_Download_WithSerchFilter");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;


                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

                JArray Jar = null;

                if (FileName == "TransactionStatusReport")
                {
                    Jar = JArray.Parse(JR.Data.ToString());
                    for (int t = 0; t < Jar.Count; t++)
                    {
                        if (Jar[t]["Total Meters"].ToString() == "<>" || Jar[t]["Total Meters"].ToString() == "" || Jar[t]["Total Meters"].ToString() == null)
                        {
                            Jar[t]["Total Meters"] = "0";
                        }
                    }
                    JR.Data = JsonConvert.SerializeObject(Jar);
                }

                if (FileName == "TransactionSummaryReport")
                {
                    Jar = JArray.Parse(JR.Data.ToString());
                    for (int t = 0; t < Jar.Count; t++)
                    {
                        if (Jar[t]["Total Value Purchase in meters"].ToString() == "<>" || Jar[t]["Total Value Purchase in meters"].ToString() == "" || Jar[t]["Total Value Purchase in meters"].ToString() == null)
                        {
                            Jar[t]["Total Value Purchase in meters"] = "0";
                        }
                    }
                    JR.Data = JsonConvert.SerializeObject(Jar);
                }

                Jar = null;


                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));
                if (dtValue.Rows.Count > 0)
                {
                    string csv = string.Empty;
                    StringBuilder sb = new StringBuilder();
                    #region PDFEXCEl
                    if (ReportType == "PDF" || ReportType == "EXCEL")
                    {
                        sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                        sb.Append("style='border: solid 1px Black;  '>");

                        sb.Append("<thead>");

                        sb.Append("<tr >");
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                        }
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");

                        foreach (DataRow row in dtValue.Rows)
                        {
                            sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                sb.Append("<td>" + array[i].ToString() + "</td>");
                            }
                            sb.Append("</tr>");
                        }

                        sb.Append("</tbody>");
                        sb.Append("</table>");

                        csv += sb.ToString();
                    }
                    #endregion
                    #region PDF
                    if (ReportType == "PDF")
                    {
                        JObject JOBJ = JObject.Parse(InputData);
                        if (JOBJ["ReportName"].ToString() == "PendingCForms")
                        {
                            if (UserType == "STOCKIST")
                            {

                                StringReader sr = new StringReader(sb.ToString());
                                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                                using (MemoryStream memoryStream = new MemoryStream())
                                {
                                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                                    pdfDoc.Open();
                                    htmlparser.Parse(sr);
                                    pdfDoc.Close();
                                    byte[] bytes = memoryStream.ToArray();
                                    memoryStream.Close();
                                    string EmpMail = GetUserEmailId(UserCode);
                                    string MailBody = "";
                                    string Subject = FileName + "";
                                    MailBody += "Your " + FileName + " comes in an easy to view PDF (printable download format) and is<br/>";
                                    MailBody += " attached with this mail.<br/><br/>";
                                    MailBody += "<b>Instructions for opening your e-statement:</b><br/>";
                                    MailBody += "To open this secure encrypted file, all you need is Adobe Acrobat PDF format version 7.<br/>";
                                    MailBody += " You can download the free version of Adobe Acrobat Reader by clicking on this link <a href='http://www.adobe.com/products/acrobat/readstep2.html' target='_blank'>Please Click here to get adobe</a><br/><br/>";
                                    MailBody += "<b>Please note:</b> You will not be able to 'Reply' to this email.<br/><br/>";
                                    MailBody += "For any further queries please write to us at  http://dims.support@hil.in or get in touch with HIL Sales representative of your area.<br/>";
                                    MailBody += "<br/><br/><br/>";
                                    MailBody += "Thank You.<br/>";
                                    MailBody += "<br/>";
                                    MailBody += "Regards,<br/>";
                                    MailBody += "Team HIL Ltd.";
                                    //mail.Attachments.Add(new System.Net.Mail.Attachment(new MemoryStream(bytes), FileName + ".pdf"));
                                    string mailEssage = SendEmail(FileName, EmpMail, MailBody, UserType);
                                    Session["ResultMail"] = mailEssage;
                                    JR.Data = mailEssage;
                                }

                            }
                        }
                        else
                        {
                            Response.Clear();
                            Response.ContentType = "application/pdf";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".pdf");
                            Response.Cache.SetCacheability(HttpCacheability.NoCache);
                            Response.BinaryWrite(ExcelUtility.GetPDF(csv));
                            Response.End();
                        }

                    }
                    #endregion
                    #region EXCEL
                    else if (ReportType == "EXCEL")
                    {
                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            wb.Worksheets.Add(dtValue, "Credit Notes");

                            Response.Clear();
                            Response.Buffer = true;
                            Response.Charset = "";
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".xlsx");
                            using (MemoryStream MyMemoryStream = new MemoryStream())
                            {
                                wb.SaveAs(MyMemoryStream);
                                MyMemoryStream.WriteTo(Response.OutputStream);
                                Response.Flush();
                                Response.End();

                                byte[] bytes = MyMemoryStream.ToArray();

                                if (UserType == "STOCKIST")
                                {
                                    //UserCode = "0001100114";
                                    string EmpMail = GetUserEmailId(UserCode);
                                    string MailBody = "";
                                    if (EmpMail == "")
                                    {
                                        EmpMail = "dims@hil.in";
                                    }

                                    string Subject = FileName;
                                    MailBody += "Your " + FileName + " comes in an easy to view Excel and is<br/>";
                                    MailBody += " attached with this mail.<br/><br/>";
                                    MailBody += "<b>Please note:</b> You will not be able to 'Reply' to this email.<br/><br/>";
                                    MailBody += "For any further queries please write to us at  http://dims.support@hil.in or get in touch with HIL Sales representative of your area.<br/>";
                                    MailBody += "<br/><br/><br/>";
                                    MailBody += "Thank You.<br/>";
                                    MailBody += "<br/>";
                                    MailBody += "Regards,<br/>";
                                    MailBody += "Team HIL Ltd.";
                                    //mail.Attachments.Add(new System.Net.Mail.Attachment(new MemoryStream(bytes), "" + FileName + ".xlsx"));
                                    string mailEssage = SendEmail(FileName, EmpMail, MailBody, UserType);
                                    Session["ResultMail"] = mailEssage;
                                    JR.Data = mailEssage;
                                }
                                MyMemoryStream.Dispose();
                            }
                            wb.Dispose();
                        }


                    }
                    #endregion
                    #region TEXT
                    else if (ReportType == "TEXT")
                    {
                        string File_Text = string.Empty;
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            if (i == dtValue.Columns.Count - 1)
                            {
                                File_Text += dtValue.Columns[i].ToString();
                            }
                            else
                            {
                                File_Text += dtValue.Columns[i].ToString() + "|";
                            }
                        }
                        File_Text += Environment.NewLine;
                        foreach (DataRow row in dtValue.Rows)
                        {

                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                if (i == array.Length - 1)
                                {
                                    File_Text += array[i].ToString();
                                }
                                else
                                {
                                    File_Text += array[i].ToString() + "|";
                                }
                            }
                            File_Text += Environment.NewLine;
                        }

                        Response.Clear();
                        Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".txt");
                        Response.Charset = "";
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.ContentType = "text/xml";
                        Response.Write(File_Text);
                        Response.End();

                    }
                    #endregion TEXT
                }
                else
                {

                    JR.Data = "There is no data";
                }
            }
            catch (Exception ex)
            {
                JR.Data = "FAIL";
                Session["ResultMail"] = "FAIL";
            }
            return JR.Data.ToString();
        }


        [Authorize]
        public string GenerateReport_Discounts()
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            Utility.Utility Util = new Utility.Utility();

            JsonResult JSonRes = new JsonResult();
            JSonRes.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {

                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();

                if (FileName == "Discount_Structures")
                {
                    iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDiscountStructureData_GenerateReport");
                    JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                }
                else if (FileName == "NetBilling")
                {
                    iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetNetBillingData_GenerateReport");
                    JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                }
                else if (FileName == "Discount_Direct_Billing")
                {
                    iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDirectBillingData_GenerateReport");
                    JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                }
                else if (FileName == "ProjectDiscountWithCommission")
                {
                    iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetProjectDiscountWithCommissionStructureData_Report");
                    JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                }
                else if (FileName == "Unnati_Customer_Mapping")
                {
                    iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetUnnatiEnrollmentData_Report");
                    JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                }
                JR.MaxJsonLength = int.MaxValue;

                JArray Jar = null;



                Jar = null;




                //{"MasterType":"LoginAuditLog","ID":"561","UserCode":"50001342","Type":"Get","ReportName":"LoginAuditLog","WhereClause":" left join cms_employeemaster em on em.EMPLOYEE_CODE = AL.USER_CODE left join CUSTOMER_SALES_VIEW csv on csv.cust_code = AL.USER_CODE "}
                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));


                if (dtValue.Rows.Count > 0)
                {
                    string csv = string.Empty; ;
                    StringBuilder sb = new StringBuilder();
                    if (ReportType == "PDF" || ReportType == "EXCEL")
                    {
                        sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                        sb.Append("style='border: solid 1px Black;  '>");

                        sb.Append("<thead>");

                        sb.Append("<tr >");
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                        }
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");

                        foreach (DataRow row in dtValue.Rows)
                        {
                            sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                sb.Append("<td>" + array[i].ToString() + "</td>");
                            }
                            sb.Append("</tr>");
                        }

                        sb.Append("</tbody>");
                        sb.Append("</table>");

                        csv += sb.ToString();
                    }
                    if (ReportType == "PDF")
                    {
                        //Response.AppendHeader("content-disposition", "attachment;filename=Report.pdf");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/pdf";
                        //Response.Write(csv);
                        //Response.End();

                        //csv = "<p>Invoice</p><table><thead><tr><th>firstname</th><th>Lastname</th></tr></thead><tbody><tr><td>shiva</td><td>kiran</td></tr><tr><td>shiva</td><td>kiran</td></tr></tbody></table>";
                        Response.Clear();
                        Response.ContentType = "application/pdf";
                        Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".pdf");
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.BinaryWrite(ExcelUtility.GetPDF(csv));
                        Response.End();
                    }
                    else if (ReportType == "EXCEL")
                    {


                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            wb.Worksheets.Add(dtValue, FileName);

                            Util.LogMessage("" + dtValue + "");

                            Response.Clear();
                            Response.Buffer = true;
                            Response.Charset = "";
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".xlsx");
                            using (MemoryStream MyMemoryStream = new MemoryStream())
                            {
                                wb.SaveAs(MyMemoryStream);
                                MyMemoryStream.WriteTo(Response.OutputStream);
                                Response.Flush();
                                Response.End();
                            }
                        }


                        //Response.Clear();
                        //Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".xls");
                        //Response.Charset = "";
                        //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        //Response.ContentType = "application/vnd.ms-excel";
                        //Response.Write(csv);
                        //Response.End();

                    }
                    else if (ReportType == "TEXT")
                    {
                        string File_Text = string.Empty;
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            if (i == dtValue.Columns.Count - 1)
                            {
                                File_Text += dtValue.Columns[i].ToString();
                            }
                            else
                            {
                                File_Text += dtValue.Columns[i].ToString() + "|";
                            }
                        }
                        File_Text += Environment.NewLine;
                        foreach (DataRow row in dtValue.Rows)
                        {

                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                if (i == array.Length - 1)
                                {
                                    File_Text += array[i].ToString();
                                }
                                else
                                {
                                    File_Text += array[i].ToString() + "|";
                                }
                            }
                            File_Text += Environment.NewLine;
                        }

                        Response.Clear();
                        Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".txt");
                        Response.Charset = "";
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.ContentType = "text/xml";
                        Response.Write(File_Text);
                        Response.End();

                    }
                    return "";
                }
                else
                {
                    //Response.Clear();
                    //Response.End();
                    return " There is no data";
                }


            }
            catch (Exception ex)
            {
                //new Utility().
                string errorresult = ex.Message.ToString();

                Util.LogError("Message : " + ex.Message.ToString());

                return "Error";
            }
        }

        [Authorize]
        public string GenerateReport_SAP_CFORM_STOCKIST()
        {
            string csv = string.Empty;
            JsonResult jr = new JsonResult();
            try
            {
                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();
                //  UserProperties UP = new UserProperties();
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                string UserCode = UP.UserCode;
                string UserType = UP.UserType;

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetReportData_Download_WithSerchFilter");
                jr.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(jr.Data.ToString(), (typeof(DataTable)));


                StringBuilder sb = new StringBuilder();

                sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                sb.Append("style='border: solid 1px Black;  '>");

                sb.Append("<thead>");

                sb.Append("<tr >");
                for (var i = 0; i < dtValue.Columns.Count; i++)
                {
                    sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                }
                sb.Append("</tr>");
                sb.Append("</thead>");
                sb.Append("<tbody>");

                foreach (DataRow row in dtValue.Rows)
                {
                    sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                    object[] array = row.ItemArray;
                    for (var i = 0; i <= array.Length - 1; i++)
                    {
                        sb.Append("<td>" + array[i].ToString() + "</td>");
                    }
                    sb.Append("</tr>");
                }

                sb.Append("</tbody>");
                sb.Append("</table>");

                csv += sb.ToString();

            }
            catch (Exception ex)
            {

                jr.Data = ex.Message.ToString();
            }
            return csv;
        }

        [Authorize]
        public string GenerateReport_SAP_STOCKIST_MailStatus()
        {
            string Result = string.Empty;

            if (Session["ResultMail"].ToString() == "MailSnent")
            {
                Result = "MailSent";
            }
            else
            {
                Result = "MailNotSent";
            }
            Session["ResultMail"] = "";
            return Result;
        }

        [Authorize]
        public JsonResult GetFilters(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetFilters");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }


        [Authorize]
        public JsonResult GetFilters_SFDC(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetFilters_SFDC");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetFilters_SFDC_Sales_Huddles(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetFilters_SFDC_Sales_Huddles");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }


        [Authorize]
        public JsonResult GetStatesforZone(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetStatesforZone");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }


        [Authorize]
        public JsonResult GetStatesforZone_Unnati(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetStatesforZone_Unnati");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetTerritoriesforState(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetTerritoriesforState");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetCustomersforZone(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetCustomersforZone");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetCustomersforState(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetCustomersforState");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetCustomersforTerritory(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetCustomersforTerritory");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetZonesForSalesorganization(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetZonesForSalesorganization");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetFilters_Unnati(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetFilters_Unnati");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }


        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        [Authorize]
        public string ExportdataFinanceDashboard(string QueryVal)
        {
            Session["htmlstrFinanceDashBoard"] = QueryVal;
            System.IO.StreamWriter file = new System.IO.StreamWriter(Path.Combine(Server.MapPath("~/popup"), "temp.html").ToString());
            file.WriteLine(QueryVal);
            file.Close();
            return "ok";
        }

        [Authorize]
        public void GetExcelFinaceDashBoard(string reportname)
        {
            string InputData = Session["htmlstrFinanceDashBoard"].ToString();


            StringBuilder sb = new StringBuilder();
            sb.Append(InputData);

            //using (XLWorkbook wb = new XLWorkbook())
            //{
            //    //  wb.Worksheets.Add(dtValue, "Credit Notes");
            //    //   wb.Worksheets.Add()
            //    //  DataSet valuesSet = getBlendInfo.GetProcessValues(sb);
            //    Response.Clear();
            //    Response.Buffer = true;
            //    Response.Charset = "";
            //    Response.Write(sb);
            //    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //    Response.AddHeader("content-disposition", "attachment;filename=" + reportname + ".xlsx");
            //    using (MemoryStream MyMemoryStream = new MemoryStream())
            //    {
            //        // wb.SaveAs(MyMemoryStream);
            //        MyMemoryStream.WriteTo(Response.OutputStream);
            //        Response.Flush();
            //        Response.End();
            //    }
            //}

            Response.Clear();
            Response.Charset = "";
            Response.ContentType = "application/msexcel";
            Response.AddHeader("Content-Disposition", "filename=" + reportname + ".xls");
            Response.Write(sb);
            Response.End();
            Response.Flush();
        }

        [Authorize]
        public JsonResult GetCustomers_AccStmt(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetCustomers_AccStmt");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            //return Json(new
            //{
            //    tabledata = JR.Data.ToString()
            //}, JsonRequestBehavior.AllowGet);
            return JR;
        }

        [Authorize]
        public JsonResult ValidateCustomer_AccStmt(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/ValidateCustomer_AccStmt");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        //[EnableThrottling]
        public JsonResult Form_Access(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/Form_Access");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetUserPageAccess(string UserRole)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetUserPageAccess");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult getUserDetails(string UserDetails)
        {
            JsonResult JR = new JsonResult();

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/getUserDetails");
                JR.Data = clt.MakeRequest("POST", UserDetails, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult UpdateDetails(string UserDetails)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/UpdateDetails");
                JR.Data = clt.MakeRequest("POST", UserDetails, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult SaveEmployeeDetails(string EmployeeDetails)
        {
            JsonResult JR = new JsonResult();

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/SaveEmployeeDetails");
                JR.Data = clt.MakeRequest("POST", EmployeeDetails, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult UpdateEmployeeDetails(string EmployeeDetails)
        {
            JsonResult JR = new JsonResult();

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/UpdateEmployeeDetails");
                JR.Data = clt.MakeRequest("POST", EmployeeDetails, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetStates()
        {
            JsonResult JR = new JsonResult();

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetStates");
                JR.Data = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetEmployeeDetails()
        {
            JsonResult JR = new JsonResult();

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetEmployeeDetails");
                JR.Data = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        [HttpPost]
        [Authorize]
        public string PhotoUpload(HttpPostedFileBase file)
        {
            try
            {
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                string usercode = UP.UserCode;


                string Result = string.Empty;

                if (file != null && file.ContentLength > 0)
                {
                    string UpFileName = Path.GetFileName(file.FileName);
                    bool containsQuote = UpFileName.Contains("\'");
                    if (containsQuote == true)
                    {
                        UpFileName = UpFileName.Replace("\'", string.Empty);
                    }
                    //var Title = RegId + "_" + DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + "_" + UpFileName;
                    var Title = UpFileName;
                    Title = Title.Replace(UpFileName, usercode + ".jpg");
                    //var fpath = Path.Combine(Server.MapPath("~/ProfilePhotos/"), Title);


                    new Utility.Utility().LogMessage("karthik" + Title);
                    var fpath = Path.Combine(Server.MapPath("~/ProfilePhotos/"), Title);
                    if (System.IO.File.Exists(fpath))
                    {
                        System.IO.File.Delete(fpath);
                        file.SaveAs(fpath);
                    }
                    else
                    {
                        file.SaveAs(fpath);
                    }

                    new Utility.Utility().LogMessage(fpath);

                    Session["imagepath"] = fpath;
                    Session["Title"] = Title;

                }
            }
            catch (Exception EX)
            {
                //JR.Data = "";
            }
            return "Success";
        }

        [HttpPost]
        [Authorize]
        public ActionResult GetDiscountStructureData()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();
                //Find Order Column
                var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
                var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
                string search = Request.Params["sSearch"];
                string searchvalue = Request.Form.GetValues("search[value]").FirstOrDefault();


                string json = Session["ReportJsonstring"].ToString();

                Dictionary<string, dynamic> values = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);
                //var TypeofView = values["Type"].ToString();// Getting type of view whethere it is Preview or simple get

                values.Add("draw", draw);
                values.Add("start", start);
                values.Add("length", length);
                values.Add("sortColumn", sortColumn);
                values.Add("sortColumnDir", sortColumnDir);
                values.Add("searchvalue", searchvalue);
                string Data = JsonConvert.SerializeObject(values);
                JsonResult JR = new JsonResult();

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDiscountStructureData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;

                var ResultJson = JObject.Parse(JR.Data.ToString());
                var data = ResultJson["data"].ToString();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                var d = jss.Deserialize<dynamic>(data);

                draw = (ResultJson["draw"].ToString());
                int recordsTotal = 0;
                recordsTotal = Convert.ToInt32(ResultJson["recordsTotal"].ToString());

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = d }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);

            }
        }


        [HttpPost]
        [Authorize]
        public ActionResult GetNetBillingData()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();
                //Find Order Column
                var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
                var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
                string search = Request.Params["sSearch"];
                string searchvalue = Request.Form.GetValues("search[value]").FirstOrDefault();


                string json = Session["ReportJsonstring"].ToString();

                Dictionary<string, dynamic> values = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);
                //var TypeofView = values["Type"].ToString();// Getting type of view whethere it is Preview or simple get

                values.Add("draw", draw);
                values.Add("start", start);
                values.Add("length", length);
                values.Add("sortColumn", sortColumn);
                values.Add("sortColumnDir", sortColumnDir);
                values.Add("searchvalue", searchvalue);
                string Data = JsonConvert.SerializeObject(values);
                JsonResult JR = new JsonResult();

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetNetBillingData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;

                var ResultJson = JObject.Parse(JR.Data.ToString());
                var data = ResultJson["data"].ToString();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                var d = jss.Deserialize<dynamic>(data);

                draw = (ResultJson["draw"].ToString());
                int recordsTotal = 0;
                recordsTotal = Convert.ToInt32(ResultJson["recordsTotal"].ToString());

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = d }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);

            }
        }


        [Authorize]
        [HttpPost]
        public JsonResult GetDirectBillingData()
        {
            try
            {
                var draw = Request.Form.GetValues("draw").FirstOrDefault();
                var start = Request.Form.GetValues("start").FirstOrDefault();
                var length = Request.Form.GetValues("length").FirstOrDefault();
                //Find Order Column
                var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
                var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
                string search = Request.Params["sSearch"];
                string searchvalue = Request.Form.GetValues("search[value]").FirstOrDefault();


                string json = Session["ReportJsonstring"].ToString();

                Dictionary<string, dynamic> values = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);
                //var TypeofView = values["Type"].ToString();// Getting type of view whethere it is Preview or simple get

                values.Add("draw", draw);
                values.Add("start", start);
                values.Add("length", length);
                values.Add("sortColumn", sortColumn);
                values.Add("sortColumnDir", sortColumnDir);
                values.Add("searchvalue", searchvalue);
                string Data = JsonConvert.SerializeObject(values);
                JsonResult JR = new JsonResult();

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDirectBillingData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;

                var ResultJson = JObject.Parse(JR.Data.ToString());
                var data = ResultJson["data"].ToString();
                JavaScriptSerializer jss = new JavaScriptSerializer();
                var d = jss.Deserialize<dynamic>(data);

                draw = (ResultJson["draw"].ToString());
                int recordsTotal = 0;
                recordsTotal = Convert.ToInt32(ResultJson["recordsTotal"].ToString());

                return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = d }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);

            }
        }


        [Authorize]
        public string GenerateReport_DIMSMonitorLog()
        {
            JsonResult JR = new JsonResult();
            try
            {
                string InputData = Session["InputData"].ToString();
                string ReportType = Session["ReportType"].ToString();
                string FileName = Session["FileName"].ToString();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetDimsMonitorLogData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                DataTable dtValue = (DataTable)JsonConvert.DeserializeObject(JR.Data.ToString(), (typeof(DataTable)));
                if (dtValue.Rows.Count > 0)
                {
                    string csv = string.Empty; ;
                    StringBuilder sb = new StringBuilder();
                    if (ReportType == "PDF" || ReportType == "EXCEL")
                    {
                        sb.Append("<table align='center' border='1px' cellpadding='5' cellspacing='0' ");

                        sb.Append("style='border: solid 1px Black;  '>");

                        sb.Append("<thead>");

                        sb.Append("<tr >");
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            sb.Append("<th style='background-color: #d2401a; color: white; font-size: 12px;'>" + dtValue.Columns[i].ToString() + "</th>");
                        }
                        sb.Append("</tr>");
                        sb.Append("</thead>");
                        sb.Append("<tbody>");

                        foreach (DataRow row in dtValue.Rows)
                        {
                            sb.Append("<tr style='font-size: 10px;font-family:'Calibri''>");
                            object[] array = row.ItemArray;
                            for (var i = 1; i <= array.Length - 1; i++)
                            {
                                sb.Append("<td>" + array[i].ToString() + "</td>");
                            }
                            sb.Append("</tr>");
                        }

                        sb.Append("</tbody>");
                        sb.Append("</table>");
                        csv += sb.ToString();
                    }
                    if (ReportType == "PDF")
                    {
                        Response.Clear();
                        Response.ContentType = "application/pdf";
                        Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".pdf");
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.BinaryWrite(ExcelUtility.GetPDF(csv));
                        Response.End();
                    }
                    else if (ReportType == "EXCEL")
                    {
                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            wb.Worksheets.Add(dtValue, FileName);
                            Response.Clear();
                            Response.Buffer = true;
                            Response.Charset = "";
                            Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + ".xlsx");
                            using (MemoryStream MyMemoryStream = new MemoryStream())
                            {
                                wb.SaveAs(MyMemoryStream);
                                MyMemoryStream.WriteTo(Response.OutputStream);
                                Response.Flush();
                                Response.End();
                            }
                        }
                    }
                    #region TEXT
                    else if (ReportType == "TEXT")
                    {
                        string File_Text = string.Empty;
                        for (var i = 0; i < dtValue.Columns.Count; i++)
                        {
                            if (i == dtValue.Columns.Count - 1)
                            {
                                File_Text += dtValue.Columns[i].ToString();
                            }
                            else
                            {
                                File_Text += dtValue.Columns[i].ToString() + "|";
                            }
                        }
                        File_Text += Environment.NewLine;
                        foreach (DataRow row in dtValue.Rows)
                        {

                            object[] array = row.ItemArray;
                            for (var i = 0; i <= array.Length - 1; i++)
                            {
                                if (i == array.Length - 1)
                                {
                                    File_Text += array[i].ToString();
                                }
                                else
                                {
                                    File_Text += array[i].ToString() + "|";
                                }
                            }
                            File_Text += Environment.NewLine;
                        }

                        Response.Clear();
                        Response.AppendHeader("content-disposition", "attachment;filename=" + FileName + ".txt");
                        Response.Charset = "";
                        Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        Response.ContentType = "text/xml";
                        Response.Write(File_Text);
                        Response.End();

                    }
                    #endregion TEXT
                }
            }
            catch (Exception ex)
            {
                return "Error";
            }
            return "";
        }


        public string FileTransfer()
        {
            try
            {
                string SourcePath = "E:\\ASD\\DIMS\\DIMSSolution\\DIMS\\DIMSFiles\\Approvals\\compensation_12_15_2016.csv";
                FileInfo fileInf = new FileInfo(SourcePath);

                if (fileInf.Exists)
                {
                    string Dest = "\\\\192.9.200.84\\dimsdata\\compensation_" + DateTime.Now.ToString("MM'_'dd'_'yyyy") + ".csv";
                    System.IO.File.Copy(SourcePath, Dest, true);
                }
            }
            catch (Exception EX)
            {
                throw EX;
            }
            return "Success";
        }

        [HttpPost]
        public JsonResult CustomerFSOUpload(FormCollection formCollection)
        {
            Utility.Utility util = new Utility.Utility();
            JsonResult JR = new JsonResult();
            try
            {
                HttpPostedFileBase file = Request.Files["CustomerFSOUpload"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "CustomerFSOUpload" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "CustomerFSOUpload" + System.IO.Path.GetExtension(file.FileName) + ""));
                //string[] columnNames = new string[13] { "Party Code", "Party Name", "Party Zone", "Party - Region", "Business", "Bill.Doc.", "Financial year", "Bill. Date", "Month", "Month 1", "Taxable Turnover", "Material Supplied From Plant", "Status" };
                string excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + fileLocation + ";Extended Properties=\"Excel 12.0;HDR=No;IMEX=2\"";

                OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                excelConnection.Open();

                DataTable dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);

                string query1 = string.Format("Select * from [{0}]", dt.Rows[0]["TABLE_NAME"].ToString());
                using (OleDbDataAdapter da = new OleDbDataAdapter(query1, excelConnection))
                {
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    Excel_Table = ds.Tables[0];
                    //string a = JsonConvert.SerializeObject(Excel_Table);
                }
                excelConnection.Close();

                if (Excel_Table.Rows.Count > 0)
                {
                    for (int i = 0; i < Excel_Table.Rows.Count; i++)
                    {
                        //string[] ColNames = new string[] { "Party Code", "Party New Code", "Party Name", "Party Zone", "Party - Region", "Business", "Bill.Doc.", "Financial year", "Bill. Date", "Month", "Month 1", "Taxable Turnover", "Material Supplied From Plant", "Status", "Row Labels" };
                        DataRow dr = Excel_Table.Rows[i];
                        //if (dr["F1"].ToString() == "")
                        //{
                        //    dr.Delete();
                        //}

                    }
                    Excel_Table.AcceptChanges();

                    UserProperties UP = (UserProperties)Session["UP"];
                    Dictionary<string, object> DataObj = new Dictionary<string, object>();

                    DataObj.Add("UserName", UP.UserName);
                    DataObj.Add("Excel_Table", Excel_Table);

                    string URL = ConfigurationManager.AppSettings["ServiceURL"];

                    string Result = JsonConvert.SerializeObject(DataObj);
                    string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/CustomerFSOUpload", Result, 20 * 60 * 1000);
                    //string Response = "";

                    if (Response == "FALSE")
                    {
                        JR.Data = Response;
                    }
                    else if (Response == "TRUE")
                    {
                        JR.Data = JsonConvert.SerializeObject(Excel_Table);
                        JR.Data = Response;
                    }
                    else
                    {
                        JR.Data = Response;
                    }
                    Excel_Table.Dispose();

                }
            }
            catch (Exception ex)
            {
                util.LogMessage("UploadFreightUpload : " + ex);
                JR.Data = "";
            }
            JR.MaxJsonLength = int.MaxValue;
            return JR;
        }

        [Authorize]
        public JsonResult getEmailsforDailySalesTracker()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/getEmailsforDailySalesTracker");
                JR.Data = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }


        [Authorize]
        public JsonResult SaveEmailsforDailySalesTracker(string total)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/SaveEmailsforDailySalesTracker");
                JR.Data = clt.MakeRequest("POST", total, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        public string GetUserProfilePics(string UserCode_sales)
        {
            string result = "";
            string path = Path.Combine(Server.MapPath("/ProfilePhotos"), "" + UserCode_sales + ".jpg");

            if (System.IO.File.Exists(path))
            {
                result = "TRUE";
            }
            else
            {
                result = "FALSE";
            }


            return result;
        }

        [HttpGet]
        public string GetApplicationLog()
        {
            string json = "";
            List<string> lines = new List<string>();
            string Date = DateTime.Now.ToString("yyyy-MM-dd");
            var webRequest = WebRequest.Create(ConfigurationManager.AppSettings["ServiceURL"] + "logfile" + Date + ".txt");
            try
            {
                using (WebResponse response = webRequest.GetResponse())
                {
                    using (var content = response.GetResponseStream())
                    using (var reader = new StreamReader(content))
                    {
                        //text = reader.ReadToEnd();
                        string line;
                        while ((line = reader.ReadLine()) != null)
                        {
                            lines.Add(line);
                        }
                    }
                    lines.Reverse();
                }
                if (lines.Count > 1000)
                {
                    lines.RemoveRange(1000, lines.Count - 1000);
                }
            }
            catch (WebException e)
            {
                using (WebResponse response = e.Response)
                {
                    HttpWebResponse httpResponse = (HttpWebResponse)response;
                    Console.WriteLine("Error code: {0}", httpResponse.StatusCode);
                    using (Stream data = response.GetResponseStream())
                    using (var reader = new StreamReader(data))
                    {
                        string text = reader.ReadToEnd();
                    }
                }
            }
            json = JsonConvert.SerializeObject(lines);
            return json;
        }

        [Authorize]
        public string GetCreditDebitNoteDetailsPDF(List<string> Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            //JObject JObj = JObject.Parse(Data);
            try
            {
                if (Data != null && Data.Count > 0)
                {
                    StringBuilder sbControlHtml = new StringBuilder();
                    using (StringWriter stringWriter = new StringWriter())
                    {
                        using (HtmlTextWriter htmlWriter = new HtmlTextWriter(stringWriter))
                        {
                            //Generate container div control 
                            //Header Div
                            #region Div One
                            htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; height: 100%;");
                            htmlWriter.AddAttribute(HtmlTextWriterAttribute.Id, "CreditNote_0");
                            htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);
                            for (int i = 0; i < Data.Count; i++)
                            {
                                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetCreditNoteDetails");
                                JR.Data = clt.MakeRequest("POST", Data[i], iAppUtils.HttpContentType.json).ResponseBody;
                                //string JsonData = Utils.StreamToString(Data[i]);
                                JObject JOBJ = JObject.Parse(Data[i]);
                                var NoteType = JOBJ["DataFrom"].ToString();
                                if (JR.Data != null && JR.Data.ToString() != "[]")
                                {
                                    var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                                    var jsonObject = serializer.DeserializeObject(JR.Data.ToString());
                                    JArray jsonArray = JArray.Parse(JR.Data.ToString());
                                    dynamic data = JObject.Parse(jsonArray[0].ToString());
                                    var GrssAmt = float.Parse(data["BASE_AMOUNT"].ToString());
                                    var Amount = float.Parse(data["AMOUNT"].ToString());
                                    var TDS = float.Parse(data["TAX_AMOUNT"].ToString());
                                    var TotalAmount = (Amount.ToString() == "" ? 0.00 : Math.Round(Amount, 2));
                                    var CGST = float.Parse(data["CGST"].ToString());
                                    var CGSTP = float.Parse(data["CGST_P"].ToString());
                                    var SGST = float.Parse(data["SGST"].ToString());
                                    var SGSTP = float.Parse(data["SGST_P"].ToString());
                                    var IGST = float.Parse(data["IGST"].ToString());
                                    var IGSTP = float.Parse(data["IGST_P"].ToString());
                                    var TotalGST = Math.Round((CGST.ToString() == "") ? 0.00 : CGST) + Math.Round((SGST.ToString() == "") ? 0 : SGST) + Math.Round((IGST.ToString() == "") ? 0 : IGST);

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; height: 100%; page-break-before: always;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);
                                    //First Table
                                    #region Table one
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 98%");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Align, "center");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Border, "0");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Table);
                                    #region Table Row One
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);

                                    #region First TD

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "padding-left: 2%;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "text-align: left;");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "control-label col-sm-1");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Label);
                                    htmlWriter.Write(data["PLANT_DESCRIPTION"].ToString());
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.Write(", ");

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "text-align: left;");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "control-label col-sm-1");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Label);
                                    htmlWriter.Write(data["PLANT_NAME"].ToString());
                                    htmlWriter.RenderEndTag();
                                    //Br
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "text-align: left;");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "control-label col-sm-1");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Label);
                                    htmlWriter.Write(data["PlantAddress"].ToString());
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.Write(", ");
                                    //Br
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.Write("Phone No  : ");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "text-align: left;");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "control-label col-sm-1");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Label);
                                    htmlWriter.Write(data["PLANT_PHONE"].ToString());
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();

                                    #endregion
                                    #region Second TD

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Align, "center");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "img-thumbnail");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Alt, "Cinque Terre");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Width, "50");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Height, "30");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "border: none;");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Src, Server.MapPath("/Images/hil.jpg"));

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Img);
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.Write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();


                                    #endregion
                                    #region Third TD

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "text-left col-sm-5");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "padding-left: 2%;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);
                                    htmlWriter.Write("GSTIN Number : " + data["PLANT_GST_NO"].ToString());
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "control-label col-sm-1");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "text-align: left;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Label);
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.Write("PAN Number: AAACH2676Q");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.Write("CIN Number : L74999TG1955PLC000656");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.Write("TIN Number : " + data["PLANT_TIN_NO"].ToString());
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.Write("E-Mail Id : " + data["EMAIL"].ToString());
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();

                                    #region Table Two
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 98%");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Align, "center");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Border, "0");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Table);
                                    #region Table Row One
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);
                                    #region First TD

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Align, "center");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H4);
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.B);
                                    if (NoteType == "H")
                                        htmlWriter.Write("CREDIT NOTE");
                                    else if (NoteType == "S")
                                        htmlWriter.Write("DEBIT NOTE");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();


                                    #region Table Three
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Width, "100%");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Table);
                                    #region Table Row One
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);

                                    #region First TD
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("Document Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp;&nbsp;" + data["DOC_NO"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region Table Row Two
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);

                                    #region First TD
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("Document Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp;&nbsp;" + data["POSTING_DATE"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region Table Row Three
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);

                                    #region First TD
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("Document Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp;&nbsp;" + data["DOC_TYPE"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region Table Row Four
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);

                                    #region First TD
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("Ref. Document Number &nbsp;   :&nbsp;&nbsp;" + data["REF_DOC"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region Table Row Five
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);

                                    #region First TD
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("Ref. Document Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   :&nbsp;&nbsp;" + data["REF_DATE"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region Table Row Six
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);

                                    #region First TD
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("Invoice Ref. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp;&nbsp;" + data["INVOICE"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    htmlWriter.RenderEndTag();
                                    #endregion



                                    htmlWriter.RenderEndTag();
                                    #endregion


                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();


                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H4);
                                    htmlWriter.Write(data["STOCKIST_ID"].ToString() + "-" + data["STOCKIST_NAME"].ToString());
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();


                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H4);
                                    htmlWriter.Write(data["CustomerAddress"].ToString());
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();


                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H4);
                                    htmlWriter.Write("TIN Number : " + data["CUST_TIN"].ToString());
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();



                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H4);
                                    htmlWriter.Write("GST Number : " + data["CUST_GST_NO"].ToString());
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();


                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H4);
                                    htmlWriter.Write("PAN Number : " + data["CUST_PAN_NO"].ToString());
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H4);
                                    htmlWriter.Write("Phone Number : " + data["CUST_PHONE"].ToString());
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();

                                    #region Table Four
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Width, "100%");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Table);

                                    #region Table Head
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "font-size:15px; font-weight:bold;border-bottom:1px solid #c5c5c5 !important");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Thead);

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "text-align:left");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("Srl No");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("Material /Service Code");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("Description of Goods / Services");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("HSN Code Q");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("Quantity");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("UOM");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("Unit Rate");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("Basic Amount");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Th);
                                    htmlWriter.Write("Remarks");
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    #region Table Body
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tbody);
                                    #region  table Row

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);
                                    #region table data
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Colspan, "9");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region  table Row
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "border-bottom:1px solid #c5c5c5 !important");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("1");
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write(data["MAT_CODE"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write(data["MAT_TXT"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write(data["HSN_CODE"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write(data["QNTY"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write(data["UNIT"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write(data["UNIT_RATE"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion
                                    #region table data
                                    if (TDS.ToString() != "" && TDS != 0)
                                    {
                                        GrssAmt = GrssAmt + Math.Abs(TDS);
                                        htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                        htmlWriter.Write(GrssAmt.ToString());
                                        htmlWriter.RenderEndTag();
                                    }
                                    else
                                    {
                                        htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                        htmlWriter.Write(data["BASE_AMOUNT"].ToString("0.00"));
                                        htmlWriter.RenderEndTag();
                                    }

                                    #endregion
                                    #region table data
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write(data["REMARKS"].ToString());
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    #region  table Row

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);
                                    #region table data
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Colspan, "9");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    #region  table Row
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "border-bottom:1px solid #c5c5c5 !important");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);
                                    #region table data
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "text-align:right;padding-right:35.5%;");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Colspan, "9");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);
                                    htmlWriter.Write("Gross Amount &nbsp;&nbsp;&nbsp;: &nbsp;" + (GrssAmt.ToString() == "" ? 0.00 : Math.Round(GrssAmt, 2)).ToString("0.00"));
                                    htmlWriter.RenderEndTag();
                                    if (TDS.ToString() != "" && TDS != 0)
                                    {
                                        htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);
                                        htmlWriter.Write("TDS &nbsp;: &nbsp;" + (TDS.ToString() == "" ? 0.00 : Math.Round(TDS, 2)).ToString("0.00"));
                                        htmlWriter.RenderEndTag();
                                    }
                                    if (CGST.ToString() != "" && CGST != 0)
                                    {
                                        htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);
                                        htmlWriter.Write("CGST @@ " + CGSTP.ToString() + " %" + "&nbsp;&nbsp;&nbsp;" + (CGST.ToString() == "" ? 0.00 : Math.Round(float.Parse(CGST.ToString()), 2)).ToString("0.00"));
                                        htmlWriter.RenderEndTag();
                                    }
                                    if (SGST.ToString() != "" && SGST != 0)
                                    {
                                        htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);
                                        htmlWriter.Write("SGST @@ " + SGSTP.ToString() + " %" + "&nbsp;&nbsp;&nbsp;" + (SGST.ToString() == "" ? 0.00 : Math.Round(float.Parse(SGST.ToString()), 2)).ToString("0.00"));
                                        htmlWriter.RenderEndTag();
                                    }
                                    if (IGST.ToString() != "" && IGST != 0)
                                    {
                                        htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);
                                        htmlWriter.Write("IGST @@ " + IGSTP.ToString() + " %" + "&nbsp;&nbsp;&nbsp;" + (IGST.ToString() == "" ? 0.00 : Math.Round(float.Parse(IGST.ToString()), 2)).ToString("0.00"));
                                        htmlWriter.RenderEndTag();
                                    }

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.P);
                                    htmlWriter.Write("Total Amount &nbsp;&nbsp;&nbsp;: &nbsp;" + TotalAmount.ToString("0.00"));
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    #region  table Row

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);
                                    #region table data
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Colspan, "9");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    #region  table Row

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Tr);
                                    #region table data
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Colspan, "9");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Td);
                                    htmlWriter.Write("Tax Amount in Words (SGST/CGST/IGST) : " + toWordsINVOICE((decimal)Math.Round(float.Parse(TotalGST.ToString()), 2)));
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Br);
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.Write("Total Amount in Words : " + toWordsINVOICE((decimal)Math.Round(float.Parse(TotalAmount.ToString()), 2)));
                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderEndTag();
                                    #endregion


                                    htmlWriter.RenderEndTag();
                                    #endregion

                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Hr);
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Class, "row");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Align, "center");
                                    htmlWriter.AddAttribute(HtmlTextWriterAttribute.Style, "width: 100%; margin-bottom: 15px;");
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.Div);
                                    htmlWriter.RenderBeginTag(HtmlTextWriterTag.H5);
                                    htmlWriter.Write("This is system generated document hence does not require a signature.");
                                    htmlWriter.RenderEndTag();
                                    htmlWriter.RenderEndTag();

                                    htmlWriter.RenderEndTag();
                                }
                            }//End of for loop     
                            htmlWriter.RenderEndTag();
                            #endregion

                        }
                        sbControlHtml.Append(stringWriter.ToString());
                    }
                    Result = sbControlHtml.ToString();
                }
            }
            catch (Exception EX)
            {
                Result = "";
            }
            return Result;
        }

        public string toWordsINVOICE(decimal number)
        {
            var fraction = Math.Round((number % 1) * 100);
            var f_text = "";

            if (fraction > 0)
            {
                f_text = " AND PAISE " + convert_number(fraction);
            }
            else if (fraction == 0)
            {
                f_text = " AND PAISE ZERO";
            }

            if (convert_number(number) == "ZERO")
            {
                return "NIL";
            }
            else
            {
                return "RUPEES " + convert_number(number) + f_text + " ONLY";
            }
        }

        public string convert_number(decimal number)
        {
            if ((number < 0) || (number > 999999999))
            {
                return "NUMBER OUT OF RANGE!";
            }
            var Gn = Math.Floor(number / 10000000);  /* Crore */
            number -= Gn * 10000000;
            var kn = Math.Floor(number / 100000);     /* lakhs */
            number -= kn * 100000;
            var Hn = Math.Floor(number / 1000);      /* thousand */
            number -= Hn * 1000;
            var Dn = Math.Floor(number / 100);       /* Tens (deca) */
            number = number % 100;               /* Ones */
            var tn = Math.Floor(number / 10);
            var one = Math.Floor(number % 10);
            var res = "";

            if (Gn > 0)
            {
                res += (convert_number(Gn) + " CRORE");
            }
            if (kn > 0)
            {
                res += (((res == "") ? "" : " ") +
                convert_number(kn) + " LAKH");
            }
            if (Hn > 0)
            {
                res += (((res == "") ? "" : " ") +
                    convert_number(Hn) + " THOUSAND");
            }

            if (Dn > 0)
            {
                res += (((res == "") ? "" : " ") +
                    convert_number(Dn) + " HUNDRED");
            }


            var ones = new string[] { "", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN" };
            var tens = new string[] { "", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY" };

            if (tn > 0 || one > 0)
            {
                if (!(res == ""))
                {
                    res += " ";
                }
                if (tn < 2)
                {
                    res += ones[Convert.ToInt32(tn * 10 + one)];
                }
                else
                {

                    res += tens[Convert.ToInt32(tn)];
                    if (one > 0)
                    {
                        res += ("-" + ones[Convert.ToInt32(one)]);
                    }
                }
            }

            if (res == "")
            {
                res = "ZERO";
            }
            return res;
        }

        [Authorize]
        public ActionResult updateNotificationData(string data)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/updateNotificationData");
                JR.Data = clt.MakeRequest("POST", data, iAppUtils.HttpContentType.json).ResponseBody;
                return Json(new
                {
                    tabledata = JR.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
                //}
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }

        //VIKAS G, Signature Club Start
        [Authorize]
        public JsonResult GetSignatureClubData(string UserDetails)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetSignatureClubData");
                JR.Data = clt.MakeRequest("POST", UserDetails, iAppUtils.HttpContentType.json).ResponseBody;

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;

            }
            catch (Exception ex)
            {
                JR.Data = (object)ex.Message.ToString();
            }
            return JR;
        }
        //VIKAS G, Signature Club End
    }
}