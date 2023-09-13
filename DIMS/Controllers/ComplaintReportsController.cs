using iAppUtils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DIMS.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using DIMS.Helpers;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
   // [EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class ComplaintReportsController : Controller
    {
        //
        // GET: /ComplaintReports/

        [Authorize]
        public ActionResult ComplaintStatusReport()
        {
            return View();
        }


        [Authorize]
        public ActionResult ComplaintDetailedReport()
        {
            return View();
        }


        [Authorize]
        public JsonResult GetReportData(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetReportData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }


        [Authorize]
        public JsonResult FillReportDropDowns(string Data)
        {
            JsonResult JR = new JsonResult();

            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/FillReportDropDowns");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }


        [Authorize]
        public ActionResult Report_Compensation()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_ComplaintRegistration()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_SiteObservationSheetPartCReport()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_InvestigationReport()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_BreakageInspectionSheetPartBReport()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_CompensationNoteReport()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_CommunicationNoteReport()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_RegisteredComplaintsPlantSheeting()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_RegisteredComplaintsPlantOthers()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_ClosedComplaintsPlant()
        {
            return View();
        }


        [Authorize]
        public ActionResult Report_ClosedComplaintsAccount()
        {
            return View();
        }

        [Authorize]
        public ActionResult Report_ClosedComplaintsAccountDefectType()
        {
            return View();
        }

        [Authorize]
        public ActionResult Report_ComplaintDetailsDepoReport()
        {
            return View();
        }

        [Authorize]
        public ActionResult Report_PendingCreditNoteApprovalReport()
        {
            return View();
        }

        [Authorize]
        public ActionResult Report_SalesReturn()
        {
            return View();
        }
        [Authorize]
        public ActionResult Report_SalesReturnEmail()
        {
            return View();
        }
        [Authorize]
        public ActionResult Report_NonMovingOrWrongOrderPlacedSalesReturn()
        {
            return View();
        }
        [Authorize]
        public ActionResult Report_NonMovingOrWrongOrderPlacedSalesReturnEmail()
        {
            return View();
        }
        [Authorize]
        public ActionResult CMS_Management_Information_System()
        {
            return View();
        }

        //Karthik 
        [Authorize]
        public ActionResult CMS_Dashboard()
        {
            return View();
        }

        //svprasadk 31-08-2020 getting CMS Graphical Dashboard start
        [Authorize]
        public ActionResult CMS_Graphical_Dashboard()
        {
            return View();
        }
        //svprasadk 31-08-2020 getting CMS Graphical Dashboard end

        [Authorize]
        public JsonResult GetStockistCompensatinData(string InputData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/GetStockistCompensatinData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }


        [Authorize]
        public JsonResult CMS_MIS_InitialRequest()
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/CMS_MIS_InitialRequest");
                JR.Data = clt.MakeRequest("GET", string.Empty, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }



        public JsonResult LoadCMSDashBoard(string State, string Year, string BusinessUnit)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];

                JObject UserObj = new JObject();

                UserObj.Add("UserCode",UP.UserCode);
                UserObj.Add("UserRole",UP.UserTypeCode);
                UserObj.Add("State",State);
                UserObj.Add("Year",Year);
                UserObj.Add("BusinessUnit", BusinessUnit);

                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/GetTheCMSDashBoardData");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(UserObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        //svprasadk 31-08-2020 getting CMS Graphical Dashboard start
        public JsonResult LoadCMSGraphicalDashBoard(string STATE_CODE, string PRODUCT_TYPE_CODE)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];

                JObject UserObj = new JObject();

                UserObj.Add("UserCode", UP.UserCode);
                UserObj.Add("UserRole", UP.UserTypeCode);
                UserObj.Add("STATE_CODE", STATE_CODE);
                UserObj.Add("PRODUCT_TYPE_CODE", PRODUCT_TYPE_CODE);

                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/GetTheCMSGraphicalDashBoardData");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(UserObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }
        //svprasadk 31-08-2020 getting CMS Graphical Dashboard end

        // svprasadk 23-12-2020 SBU3 Requirement CMS Dashboard based on state, year and BU start
        public JsonResult LoadCMSDashBoardBU3(string State, string Year, string BusinessUnit)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];

                JObject UserObj = new JObject();

                UserObj.Add("UserCode", UP.UserCode);
                UserObj.Add("UserRole", UP.UserTypeCode);
                UserObj.Add("State", State);
                UserObj.Add("Year", Year);
                UserObj.Add("BusinessUnit", BusinessUnit);

                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/GetTheCMSDashBoardDataBU3");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(UserObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }
        // svprasadk 23-12-2020 SBU3 Requirement CMS Dashboard based on state, year and BU end

        //svprasadk 03-01-2021 getting CMS Graphical Dashboard start
        public JsonResult LoadCMSGraphicalDashBoardNewBU3(string STATE_CODE, string PRODUCT_TYPE_CODE, string fromDate, string toDate)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];

                JObject UserObj = new JObject();

                UserObj.Add("UserCode", UP.UserCode);
                UserObj.Add("UserRole", UP.UserTypeCode);
                UserObj.Add("STATE_CODE", STATE_CODE);
                UserObj.Add("PRODUCT_TYPE_CODE", PRODUCT_TYPE_CODE);
                UserObj.Add("fromDate", fromDate);
                UserObj.Add("toDate", toDate);

                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/LoadCMSGraphicalDashBoardNewBU3");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(UserObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }
        //svprasadk 03-01-2021 getting CMS Graphical Dashboard end
        //svprasadk 05-02-2021 SBU3 Stock Transfer and informal complaint status report start
        public ActionResult getComplaintStatusReportData_STO(string InputData)
        {
            JsonResult jr = new JsonResult();
            string Res = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/GetComplaintStatusReportData_STO");
                jr.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;

                jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                jr.MaxJsonLength = int.MaxValue;

                return jr;
                /*
                return Json(new
                {
                    tabledata = jr.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
                */
            }
            catch (Exception ex)
            {
                jr.Data = ex.Message.ToString();
                return Json(new
                {
                    tabledata = jr.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
            }

        }
        public ActionResult getComplaintStatusReportData_ICC(string InputData)
        {
            JsonResult jr = new JsonResult();
            string Res = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintReports/GetComplaintStatusReportData_ICC");
                jr.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;

                jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                jr.MaxJsonLength = int.MaxValue;

                return jr;
                /*
                return Json(new
                {
                    tabledata = jr.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
                */
            }
            catch (Exception ex)
            {
                jr.Data = ex.Message.ToString();
                return Json(new
                {
                    tabledata = jr.Data.ToString()
                }, JsonRequestBehavior.AllowGet);
            }

        }
        //svprasadk 05-02-2021 SBU3 Stock Transfer and informal complaint status report end
    }
}
