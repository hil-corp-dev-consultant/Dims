/*


Module              : SFDC.
DocumentName        : SFDCController.cs
Project Name        : Dealer Information Management System (DIMS).
Client Name         : HIL :: CK BIRLA GROUP.
Dev. Organisation   : Envision Enterprise Solutions Pvt. Ltd.
Team                : ASD.
Description         : This Doc is for used for User Authentication,Password change, User Login and Logout.
Developer Name      : Harish Kothuri.
Change Log          : NA.


*/


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using DIMS.Models;
using System.IO;
using Excel;
using System.Data;
using System.Data.OleDb;
using Newtonsoft.Json;
using System.Net;
using System.Text;
using System.Web.Routing;
using Newtonsoft.Json.Linq;
using System.Net.Mail;
using DIMS.DB;
using DIMS.DataBase;
using DIMS.Helpers;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class SFDCController : Controller
    {
        //
        // GET: /SFDC/
        cmsEntities DbData = new cmsEntities();        
        Database DB = new Database();

        /// <summary>
        /// return to index view
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// returns to Daily Order Tracking View
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult DailyOrderTracking()
        {
            return View();
        }

        /// <summary>
        /// returns to Journey plan details
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult JourneyPlanDetails()
        {
            return View();
        }
        /// <summary>
        /// to get Month all days for selected month
        /// </summary>
        /// <param name="SelectedMonth"></param>
        /// <returns>
        /// days count for particular month
        /// </returns>
        /// 
        [Authorize]
        public string GetMonthDays(string SelectedMonth)
        {
            string Result = string.Empty;
            string[] MonYear = SelectedMonth.Split('-');

            int Month = DateTime.ParseExact(MonYear[0], "MMMM", System.Globalization.CultureInfo.InvariantCulture).Month;//To get month number
            int Year = Convert.ToInt32(MonYear[1]);
            int daysInMonth = System.DateTime.DaysInMonth(Year, Month);//to get how many days in month
            Result = daysInMonth.ToString();
            return Result;
        }

        /// <summary>
        /// To Return Journey Plan List page
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult JourneyPlanList()
        {
            return View();
        }
        /// <summary>
        /// To Return MarketMap List Page
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult MarketMap()
        {
            return View();
        }
        /// <summary>
        /// To Return SchemesList
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult SchemesList()
        {
            return View();
        }
        /// <summary>
        /// Redirect to Create Scheme
        /// </summary>
        /// <returns></returns>
        ///  
        [Authorize]
        public ActionResult AddScheme()
        {
            return View();
        }
        /// <summary>
        /// Redirect to Edit Screen
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult EditScheme()
        {
            return View();
        }
        /// <summary>
        /// Redirect to Partner Issues
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult PartnerIssues()
        {
            return View();
        }

        [Authorize]
        public ActionResult AddPartnerIssues()
        {
            return View();
        }

        /// <summary>
        /// To Redirect Sales Achievement Page
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult SalesAchievement()
        {
            return View();
        }

        [Authorize]
        public ActionResult AddOrder()
        {
            //  ViewBag.Employee = new SelectList(AE.TBL_SERVICES.ToList(), "ID", "SERVICE_NAME");
            return View();
        }

        [Authorize]
        public ActionResult AddMarketMap()
        {
            return View();
        }

        [Authorize]
        public string SaveOrderData(string TotalData)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveOrderData");
                Result = clt.MakeRequest("POST", TotalData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public ActionResult GetOrderDetails(string OrderNumber)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetOrderData");
                JR.Data = clt.MakeRequest("POST", OrderNumber, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public string GetPresentDateTime()
        {
            string Result = string.Empty;
            try
            {
                Result = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt");
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return Result;
        }

        //[Authorize]
        //public string SaveJourneyPlan(string TotalJourneyPlan)
        //{
        //    string Result = string.Empty;
        //    try
        //    {
        //        Utility.Utility util = new Utility.Utility();
        //        JsonResult JR = new JsonResult();
        //        util.LogMessage("SavePJP_BeforeReq");
        //       // SFDC_ADV_JOURNEY_PLAN_DETAILs SAJPD = new SFDC_ADV_JOURNEY_PLAN_DETAILs();
        //        Result = util.MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveTotalPlanData", TotalJourneyPlan, 20 * 60 * 1000);
        //        util.LogMessage("SavePJP_AfterReq :" + Result);
        //        // iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveTotalPlanData");

        //        //Result = clt.MakeRequest("POST", TotalJourneyPlan, iAppUtils.HttpContentType.json).ResponseBody;
        //    }
        //    catch (Exception ex)
        //    {
        //        Result = ex.Message.ToString();
        //    }
        //    return Result;
        //}

        [Authorize]
        public string SaveJourneyPlan(string TotalJourneyPlan)
        {
            Utility.Utility Util = new Utility.Utility();
            string Result = string.Empty;
            try
            {

                JsonResult JR = new JsonResult();
                Util.LogMessage("SavePJP_BeforeReq :");
                Newtonsoft.Json.Linq.JObject JOBJ = Newtonsoft.Json.Linq.JObject.Parse(TotalJourneyPlan);
                SFDC_ADV_JOURNEY_PLAN_DETAILs SAJPD = new SFDC_ADV_JOURNEY_PLAN_DETAILs();
                string EditJourneyPlanId = JOBJ["EditId"].ToString();
                string Query = "";
                if (EditJourneyPlanId == "0")
                {
                    if (JOBJ["LoginUserName"].ToString() != "")
                    {
                        string LoginUserCode = JOBJ["LoginUserCode"].ToString();
                        string PlanMonth = JOBJ["selectedmonth"].ToString();
                        Util.LogMessage("SavePJP_Emp :" + LoginUserCode);

                        int JPCount = DbData.SFDC_ADV_JOURNEY_PLAN_DETAILs.Where(x => x.SALES_EMPLOYEE_CODE == LoginUserCode && x.PLAN_FOR_MONTH == PlanMonth).Count();

                        if (JPCount > 0)
                        {
                            Result = "Already Exist";
                        }
                        else
                        {
                            #region Save Journey Plan
                            SAJPD.JOURNEY_PLAN_NAME = "JP - " + JOBJ["LoginUserCode"].ToString() + "-" + JOBJ["selectedmonth"].ToString();
                            SAJPD.SALES_EMPLOYEE_CODE = JOBJ["LoginUserCode"].ToString();
                            SAJPD.PLAN_FOR_MONTH = JOBJ["selectedmonth"].ToString();
                            SAJPD.PLAN_CREATED_DATE = Convert.ToDateTime(JOBJ["CreatedDateTime"].ToString());
                            SAJPD.ACTUAL_VISIT_COUNT = JOBJ["ActualVisit"].ToString();
                            SAJPD.VISIT_PLANED_COUNT = JOBJ["VistPlaned"].ToString();
                            SAJPD.VISIT_PLANED_DISTRICT_COUNT = JOBJ["VisitPlanedDistrict"].ToString();
                            SAJPD.ACTUAL_VISIT_DISTRICT_COUNT = JOBJ["ActualDistrict"].ToString();
                            SAJPD.STATUS = JOBJ["Status"].ToString();
                            SAJPD.CREATED_BY = JOBJ["LoginUserCode"].ToString();
                            SAJPD.CREATED_DATE = DateTime.Now;

                            DbData.SFDC_ADV_JOURNEY_PLAN_DETAILs.Add(SAJPD);
                            int i = DbData.SaveChanges();
                            if (i > 0)
                            {
                                string PlanDetails = JOBJ["PlanDetails"].ToString();
                                JArray JArr = new JArray();
                                JArray CheckBoxArr = new JArray();
                                if (PlanDetails != "")
                                {
                                    JArr = JArray.Parse(PlanDetails);
                                    SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs SJPCD = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs();
                                    for (int k = 0; k < JArr.Count; k++)
                                    {

                                        SJPCD = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs();
                                        SJPCD.HEADER_ID = SAJPD.ID;
                                        SJPCD.SALES_EMPLOYEE_CODE = JOBJ["LoginUserCode"].ToString();
                                        SJPCD.CUSTOMER_CODE = JArr[k]["CustomerCode"].ToString();
                                        SJPCD.CUSTOMER_NAME = JArr[k]["CusomerName"].ToString();
                                        SJPCD.PLAN_FOR_MONTH = JOBJ["selectedmonth"].ToString();
                                        SJPCD.LAST_YEAR_SAME_MONTH_AVG = Convert.ToDecimal(JArr[k]["LastYearSameMonth"].ToString());
                                        SJPCD.ACTUAL_VOLUME_MTD = Convert.ToDouble(JArr[k]["ActualVolumeMTD"].ToString());
                                        SJPCD.NO_OF_DAYS_IN_MONTH = Convert.ToInt32(JArr[k]["NoofDaysinMonth"].ToString());

                                        if (JArr[k]["CustomerCode"].ToString().Contains("NEW"))
                                        {
                                            SJPCD.COUNTER_EXISTANCE = "NO";
                                        }
                                        else
                                        {
                                            SJPCD.COUNTER_EXISTANCE = "YES";
                                        }
                                        SJPCD.CUSTOMER_TYPE = JArr[k]["CustomerType"].ToString();
                                        SJPCD.SALES_DISTRICT = JArr[k]["SalesDistrict"].ToString();
                                        string SALESREGION = JArr[k]["SalesRegion"].ToString();
                                        SJPCD.SALES_REGION = DbData.cms_state.Where(x => x.STATE_DESC == SALESREGION).Select(t => t.STATE_CODE).Single().ToString();

                                        if (JArr[k]["LastOrderDate"].ToString() != "")
                                        {
                                            SJPCD.LAST_ORDER_DATE = Convert.ToDateTime(JArr[k]["LastOrderDate"].ToString());
                                        }
                                        if (JArr[k]["ExceptedDateforNextorder"].ToString() != "")
                                        {
                                            SJPCD.NEXT_ORDER_DATE = Convert.ToDateTime(JArr[k]["ExceptedDateforNextorder"].ToString());
                                        }

                                        SJPCD.LAST_QUARTER_MONTH_AVG = Convert.ToDecimal(JArr[k]["LastYearQuarterMonth"].ToString());

                                        if (JArr[k]["VolumePlanforMont"].ToString() != "")
                                        {
                                            SJPCD.VOLUME_PLAN_FOR_MONTH = Convert.ToDecimal(JArr[k]["VolumePlanforMont"].ToString());
                                        }
                                        DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs.Add(SJPCD);
                                        i = DbData.SaveChanges();
                                        if (i > 0)
                                        {
                                            CheckBoxArr = JArray.Parse(JArr[k]["checkboxcheckedId"].ToString());

                                            SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs SAJPCV = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs();
                                            for (int j = 0; j < CheckBoxArr.Count; j++)
                                            {
                                                string checkboxvalue = CheckBoxArr[j]["checkboxcheckedId"].ToString();
                                                var count = DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs.Where(x => x.PLANED_VISITING_DATE == checkboxvalue && x.HEADER_ID == SAJPD.ID).Count();
                                                if (count <= 0)
                                                {
                                                    SAJPCV = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs();
                                                    SAJPCV.HEADER_ID = SAJPD.ID;
                                                    SAJPCV.SALES_EMPLOYEE_CODE = JOBJ["LoginUserCode"].ToString();
                                                    SAJPCV.PLAN_FOR_MONTH = JOBJ["selectedmonth"].ToString();
                                                    SAJPCV.PLANED_VISITING_DATE = CheckBoxArr[j]["checkboxcheckedId"].ToString();
                                                    SAJPCV.SALES_DISTRICT = CheckBoxArr[j]["PlanedCustDist"].ToString();
                                                    DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs.Add(SAJPCV);
                                                    i = DbData.SaveChanges();
                                                }
                                            }
                                            if (i > 0)
                                            {
                                                Result = "Save";
                                            }
                                            else
                                            {
                                                Util.LogError("SavePJP_Emp_Problem_Stockist Visiting table saving problem :" + LoginUserCode);
                                                Result = "Stockist Visiting table saving problem";
                                            }

                                        }
                                        else
                                        {
                                            Result = "Stockist Table Saving Problem";
                                            Util.LogError("SavePJP_Emp_Problem_Stockist Table Saving Problem :" + LoginUserCode);

                                        }
                                    }
                                }

                            }
                            else
                            {
                                Result = "Head Table Saving Problem";
                            }
                        }
                    }
                }
                            #endregion Saving
                #region EditSaving
                else
                {

                    SAJPD = DbData.SFDC_ADV_JOURNEY_PLAN_DETAILs.Single(Reg => Reg.JOURNEY_PLAN_NAME == EditJourneyPlanId);

                    Util.LogMessage("EditPJP SAJPD.ACTUAL_VISIT_COUNT : " + SAJPD.ACTUAL_VISIT_COUNT);

                    //  SAJPD.SALES_EMPLOYEE_CODE = JOBJ["LoginUserName"].ToString();

                    if ((SAJPD.SALES_EMPLOYEE_CODE == JOBJ["LoginUserCode"].ToString()) && (SAJPD.REPORTER_MODIFIED_DATE != null))
                    {
                        Query = "select DATEDIFF(MINUTE,REPORTER_MODIFIED_DATE,getdate()) from SFDC_ADV_JOURNEY_PLAN_DETAILs where JOURNEY_PLAN_NAME='" + EditJourneyPlanId + "'";
                        int Update_Access = Convert.ToInt32(DB.ExecuteScalarToReturnNumberString(Query));
                        if (Update_Access > 720)
                        {
                            Result = "You can't Update this Journeyplan";
                            return Result;
                        }

                    }


                    Util.LogMessage("EditPJP : " + SAJPD.SALES_EMPLOYEE_CODE);

                    if (SAJPD.SALES_EMPLOYEE_CODE != JOBJ["LoginUserCode"].ToString())
                    {


                        SAJPD.REPORTER_MODIFIED_DATE = DateTime.Now;

                        //  Query = " select co.EMPLOYEE_CODE,em.EMPLOYEE_NAME,em.EMAIL from cms_organization_level co,cms_employeemaster em where ";
                        // Query += " co.ORG_LEVEL_ID=(select PARENT_ID from cms_organization_level where EMPLOYEE_CODE='" + JOBJ["LoginUserCode"].ToString() + "') and em.EMPLOYEE_CODE=co.EMPLOYEE_CODE";

                        Query = "select EMPLOYEE_CODE,EMPLOYEE_NAME,EMAIL from cms_employeemaster where EMPLOYEE_CODE='" + SAJPD.SALES_EMPLOYEE_CODE + "'";
                        DataTable ParentuserDetails = DB.FillDataTable(Query, "Parent");
                        if (ParentuserDetails.Rows.Count > 0)
                        {
                            if (ParentuserDetails.Rows[0]["EMAIL"].ToString() == "" || ParentuserDetails.Rows[0]["EMAIL"].ToString() == null)
                            {
                                ParentuserDetails.Rows[0]["EMAIL"] = "dims@hil.in";
                            }

                            string MailBody = "Your Journey Plan Status is :" + JOBJ["Status"].ToString();
                            Util.SendEMail(ParentuserDetails.Rows[0]["EMAIL"].ToString().Trim(), ParentuserDetails.Rows[0]["EMPLOYEE_NAME"].ToString(), EditJourneyPlanId, MailBody);
                            Util.LogMessage("Parent Email_EditMethod : " + ParentuserDetails.Rows[0]["EMAIL"].ToString() + " EmployeeName :" + ParentuserDetails.Rows[0]["EMPLOYEE_NAME"].ToString());
                        }
                    }


                    SAJPD.PLAN_FOR_MONTH = JOBJ["selectedmonth"].ToString();
                    //  SJPD.PLAN_CREATED_DATE = Util.ConvertStringtoDatetime(JOBJ["CreatedDateTime"].ToString());
                    SAJPD.PLAN_CREATED_DATE = Convert.ToDateTime(JOBJ["CreatedDateTime"].ToString());
                    SAJPD.STATUS = JOBJ["Status"].ToString();
                    //  SJPD.CREATED_BY = "597";
                    //  SJPD.CREATED_DATE = DateTime.Now;
                    SAJPD.ACTUAL_VISIT_COUNT = JOBJ["ActualVisit"].ToString();
                    SAJPD.VISIT_PLANED_COUNT = JOBJ["VistPlaned"].ToString();
                    SAJPD.VISIT_PLANED_DISTRICT_COUNT = JOBJ["VisitPlanedDistrict"].ToString();
                    SAJPD.ACTUAL_VISIT_DISTRICT_COUNT = JOBJ["ActualDistrict"].ToString();
                    SAJPD.MODIFIED_BY = JOBJ["LoginUserName"].ToString();
                    SAJPD.MODIFIED_DATE = DateTime.Now;
                    DbData.Entry(SAJPD).State = EntityState.Modified;
                    int l = DbData.SaveChanges();
                    if (l > 0)
                    {
                        string PlanDetails = JOBJ["PlanDetails"].ToString();
                        JArray JArr = new JArray();
                        JArray CheckBoxArr = new JArray();
                        JArray ActCheckBoxArr = new JArray();
                        var StockistDetails = DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs.Where(a => a.HEADER_ID == SAJPD.ID).ToList();
                        foreach (var Std in StockistDetails)
                            DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs.Remove(Std);

                        var StockistSelectedDates = DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs.Where(a => a.HEADER_ID == SAJPD.ID).ToList();
                        foreach (var Std in StockistSelectedDates)
                            DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs.Remove(Std);

                        var StockistACTSelectedDates = DbData.SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES.Where(a => a.HEADER_ID == SAJPD.ID).ToList();
                        foreach (var StdQ in StockistACTSelectedDates)
                            DbData.SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES.Remove(StdQ);

                        int q = DbData.SaveChanges();
                        if (q >= 0)
                        {
                            JArr = JArray.Parse(PlanDetails);
                            SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs SJPSD = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs();
                            for (int k = 0; k < JArr.Count; k++)
                            {
                                SJPSD = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs();
                                SJPSD.HEADER_ID = SAJPD.ID;
                                SJPSD.SALES_EMPLOYEE_CODE = SAJPD.SALES_EMPLOYEE_CODE;
                                SJPSD.CUSTOMER_CODE = JArr[k]["CustomerCode"].ToString();
                                SJPSD.CUSTOMER_NAME = JArr[k]["CusomerName"].ToString();
                                SJPSD.PLAN_FOR_MONTH = JOBJ["selectedmonth"].ToString();
                                SJPSD.LAST_YEAR_SAME_MONTH_AVG = Convert.ToDecimal(JArr[k]["LastYearSameMonth"].ToString());
                                SJPSD.ACTUAL_VOLUME_MTD = Convert.ToDouble(JArr[k]["ActualVolumeMTD"].ToString());
                                SJPSD.NO_OF_DAYS_IN_MONTH = Convert.ToInt32(JArr[k]["NoofDaysinMonth"].ToString());

                                if (JArr[k]["CustomerCode"].ToString().Contains("NEW"))
                                {
                                    SJPSD.COUNTER_EXISTANCE = "NO";
                                }
                                else
                                {
                                    SJPSD.COUNTER_EXISTANCE = "YES";
                                }
                                SJPSD.CUSTOMER_TYPE = JArr[k]["CustomerType"].ToString();
                                SJPSD.SALES_DISTRICT = JArr[k]["SalesDistrict"].ToString();
                                string SALESREGION = JArr[k]["SalesRegion"].ToString();
                                SJPSD.SALES_REGION = DbData.cms_state.Where(x => x.STATE_DESC == SALESREGION).Select(t => t.STATE_CODE).Single().ToString();



                                if (JArr[k]["LastOrderDate"].ToString() != "")
                                {
                                    SJPSD.LAST_ORDER_DATE = Convert.ToDateTime(JArr[k]["LastOrderDate"].ToString());
                                }
                                if (JArr[k]["ExceptedDateforNextorder"].ToString() != "")
                                {
                                    SJPSD.NEXT_ORDER_DATE = Convert.ToDateTime(JArr[k]["ExceptedDateforNextorder"].ToString());
                                }

                                SJPSD.LAST_QUARTER_MONTH_AVG = Convert.ToDecimal(JArr[k]["LastYearQuarterMonth"].ToString());

                                if (JArr[k]["VolumePlanforMont"].ToString() != "")
                                {
                                    SJPSD.VOLUME_PLAN_FOR_MONTH = Convert.ToDecimal(JArr[k]["VolumePlanforMont"].ToString());
                                }
                                DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs.Add(SJPSD);
                                int i = DbData.SaveChanges();
                                if (i > 0)
                                {
                                    CheckBoxArr = JArray.Parse(JArr[k]["checkboxcheckedId"].ToString());
                                    ActCheckBoxArr = JArray.Parse(JArr[k]["ActualcheckboxcheckedId"].ToString());
                                    SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs SJPSV = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs();
                                    for (int j = 0; j < CheckBoxArr.Count; j++)
                                    {
                                        string CheckboxVlaue = CheckBoxArr[j]["checkboxcheckedId"].ToString();
                                        var count = DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs.Where(x => x.PLANED_VISITING_DATE == CheckboxVlaue && x.HEADER_ID == SAJPD.ID).Count();
                                        if (count <= 0)
                                        {
                                            SJPSV = new SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs();
                                            SJPSV.HEADER_ID = SAJPD.ID;
                                            SJPSV.SALES_EMPLOYEE_CODE = SAJPD.SALES_EMPLOYEE_CODE;
                                            SJPSV.PLAN_FOR_MONTH = SAJPD.PLAN_FOR_MONTH;
                                            SJPSV.PLANED_VISITING_DATE = CheckBoxArr[j]["checkboxcheckedId"].ToString();
                                            SJPSV.SALES_DISTRICT = CheckBoxArr[j]["PlanedCustDist"].ToString();
                                            DbData.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs.Add(SJPSV);
                                            i = DbData.SaveChanges();
                                        }
                                    }

                                    if (i > 0)
                                    {
                                        Result = "Save";
                                    }
                                    else
                                    {
                                        Result = "Stockist Visiting table saving problem";
                                        Util.LogError("PJP_Editing_Planed_Visiting__TableProble :" + EditJourneyPlanId);
                                    }

                                    SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES SJPAV = new SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES();
                                    if (ActCheckBoxArr.Count > 0)
                                    {
                                        for (int j = 0; j < ActCheckBoxArr.Count; j++)
                                        {
                                            string ActualVisitId = ActCheckBoxArr[j]["ActualcheckboxcheckedId"].ToString();
                                            var count = DbData.SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES.Where(x => x.ACTUAL_VISITING_DATE == ActualVisitId && x.HEADER_ID == SAJPD.ID).Count();
                                            if (count <= 0)
                                            {
                                                SJPAV = new SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES();
                                                SJPAV.HEADER_ID = SAJPD.ID;
                                                SJPAV.SALES_EMPLOYEE_CODE = SAJPD.SALES_EMPLOYEE_CODE;
                                                SJPAV.PLAN_FOR_MONTH = SAJPD.PLAN_FOR_MONTH;
                                                SJPAV.ACTUAL_VISITING_DATE = ActCheckBoxArr[j]["ActualcheckboxcheckedId"].ToString();
                                                SJPAV.SALES_DISTRICT = ActCheckBoxArr[j]["CustomerDistrict"].ToString();
                                                DbData.SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES.Add(SJPAV);
                                                i = DbData.SaveChanges();
                                            }
                                        }
                                    }

                                    if (i > 0)
                                    {
                                        Result = "Save";
                                    }
                                    else
                                    {
                                        Result = "Stockist Actual Visiting table saving problem";
                                        Util.LogError("PJP_Editing_Actual_Visiting_TableProble :" + EditJourneyPlanId);
                                    }
                                }
                                else
                                {
                                    Result = "Stockist Table Saving Problem";
                                    Util.LogError("PJP_Editing_Planed_Customer_TableProble :" + EditJourneyPlanId);
                                }
                            }
                        }
                        else
                        {
                            Util.LogError("PJP_Editing_Tables_Deleteion_Problem :" + EditJourneyPlanId);
                        }
                    }
                    else
                    {
                        Util.LogError("PJP_Editing_Head_TableProble :" + EditJourneyPlanId);
                    }
                    Util.LogMessage("jpEdit_Status :" + Result);
                }
                #endregion
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Util.LogMessage("SaveTotalPlanData : EntityValidationException : " + dbEx.Message);

                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting  
                        // the current instance as InnerException  
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                Util.LogError(raise.Message.ToString());
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
                Util.LogMessage(" SaveTotalPlanData: "+Result);
            }
            return Result;
        }

        [Authorize]
        public ActionResult GetUserBasedJourneyPlan(string MasterType)
        {
            // string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetUserBasedJourneyPlanList");
                JR.Data = clt.MakeRequest("POST", MasterType, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult GetJourneyPlanDetailsforEdit(string JourneyPlanMonth)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetJourneyPlanDetailsforEdit");
                JR.Data = clt.MakeRequest("POST", JourneyPlanMonth, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public string SaveMarketMap(string SaveMarketMapData)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveMarketMapData");
                Result = clt.MakeRequest("POST", SaveMarketMapData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public ActionResult GetMarketMapList(string MasterType)
        {
            // string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetMarketMapList");
                JR.Data = clt.MakeRequest("POST", MasterType, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                return JR;
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
        public JsonResult GetMarketMapDataForEdit(string EditId)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetMarketMapDataForEdit");
                JR.Data = clt.MakeRequest("POST", EditId, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public ActionResult InventoryTracking()
        {
            return View();
        }

        [Authorize]
        public ActionResult AddInventoryTrack()
        {
            return View();
        }

        [Authorize]
        public ActionResult AddNewCounter()
        {
            return View();
        }

        [Authorize]
        public string SaveNewCounterData(string Data)
        {
            string Result = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveNewCounterData");
                Result = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public ActionResult CounterList()
        {
            return View();
        }

        [Authorize]
        public ActionResult GetAllPagesList(string ListType)
        {
            // string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetAllPagesList");
                JR.Data = clt.MakeRequest("POST", ListType, iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult GetCounterDataForEdit(string EditId)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetCounterDataForEdit");
                JR.Data = clt.MakeRequest("POST", EditId, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public ActionResult getMasterData(string MasterType)
        {
            JsonResult JR = new JsonResult();
            try
            {

                JR.MaxJsonLength = int.MaxValue;
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetSFDCMasterData");
                JR.Data = clt.MakeRequest("POST", MasterType, iAppUtils.HttpContentType.json).ResponseBody;

                //return Json(new
                //{
                //    tabledata = JR.Data.ToString()
                //}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public ActionResult getMasterDataJP(string MasterType)//Need to change as per old
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetSFDCMasterData");
                JR.Data = clt.MakeRequest("POST", MasterType, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetZonesListForHolidayConfig()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetZonesListForHolidayConfig");
                JR.Data = clt.MakeRequest("POST", "ENVISION:ASD", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                JR.Data = ex.Message.ToString();
            }
            return Json(new
            {
                tabledata = JR.Data.ToString()
            }, JsonRequestBehavior.AllowGet);
        }


        [Authorize]
        public string GetDateBasedDayinHoliday(string Date)
        {
            string Result = string.Empty;
            try
            {
                DateTime dt = Convert.ToDateTime(Date);

                //DateTime myDate = DateTime.ParseExact(Date, "dd/MM/yyyy", null);
                //Result = (myDate.DayOfWeek).ToString();
                Result = dt.ToString("dddd");
            }
            catch (Exception ex)
            {
                Result = "";
            }
            return Result;
        }

        [Authorize]
        public string SaveHolidayData(string TotalData)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveHolidayData");
                Result = clt.MakeRequest("POST", TotalData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public JsonResult GetStatesbasedonId(string HolidayId) //For Holiday Config
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetStatesbasedonId");
                JR.Data = clt.MakeRequest("POST", HolidayId, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return Json(new
            {
                tabledata = JR.Data.ToString()
            }, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ActionResult GetAcCCSheetData(string data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetAcCCSheetData");
                JR.Data = clt.MakeRequest("POST", data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetAcCCSheetSizesData()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetAcCCSheetSizesData");
                JR.Data = clt.MakeRequest("POST", "ENVISION:ASD", iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetAcCCSheetColorData(string data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetAcCCSheetColorData");
                JR.Data = clt.MakeRequest("POST", data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetCCSheetThickness(string data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetCCSheetThickness");
                JR.Data = clt.MakeRequest("POST", data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetCustomerCreditOutStanding(string data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetCustomerCreditOutStanding");
                JR.Data = clt.MakeRequest("POST", data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetFSOIncharge(string StockistCode)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFSOIncharge");
                JR.Data = clt.MakeRequest("POST", StockistCode, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetLatestOrdernumber()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetLatestOrdernumber");
                JR.Data = clt.MakeRequest("POST", "ENVISION:ASD", iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public string SendOrderDetails(string SenderEmail, string MailSubject)
        {
            string Result = string.Empty;
            try
            {
                string InputData = Session["htmlstrFinanceDashBoard"].ToString();
                if (SenderEmail == "")
                {
                    SenderEmail = "dims@hil.in";
                }
                //   SenderEmail = "harishk@envisionesl.com";
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
                SmtpClient smtp = new SmtpClient(MailHost);
                MailMessage mail = new MailMessage(MailSender, SenderEmail);
                mail.From = new MailAddress(MailSender, "DIMS-HIL");
                mail.Subject = MailSubject;
                mail.Body = "Dear Sir/Madam,<br/>";
                mail.Body += "Please find the below information with reference to DIMS Order No.<b> " + MailSubject + "</b> <br/><br/>";
                mail.Body += InputData;
                mail.Body += "<b>Please note:</b> You will not be able to 'Reply' to this email.<br/><br/>";
                mail.Body += "For any further queries please write to us at  http://dims.support@hil.in or get in touch with HIL Sales representative of your area.<br/>";
                mail.Body += "<br/><br/><br/>";
                mail.Body += "Thank You.<br/>";
                mail.Body += "<br/>";
                mail.Body += "Regards,<br/>";
                mail.Body += "Team HIL Ltd.";
                smtp.Credentials = new NetworkCredential(MUserName, MPassword);
                smtp.Port = Convert.ToInt32(MailPort);
                mail.IsBodyHtml = true;
                smtp.EnableSsl = true;
                smtp.Send(mail);
                Result = "Sent :" + SenderEmail;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
                Result = "False :" + ex.Message.ToString();
            }
            return Result;
        }

        #region ManiSFCD

        /// <summary>
        /// To Get the CreateTarget Screen
        /// </summary>
        /// <returns></returns>
        /// 
        [Authorize]
        public ActionResult CreateTargetFC()
        {
            return View();
        }

        [Authorize]
        public ActionResult CreateTargetList()
        {
            return View();
        }


        /// <summary>
        /// Save the Create Target Data
        /// </summary>
        /// <param name="CreateTargetData">Data Stream</param>
        /// <returns>Success or Failure</returns>
        /// 
        [Authorize]
        public JsonResult SaveCreateTargetData(string CreateTargetData)
        {
            JsonResult Result = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveCreateTargetData");
                Result.Data = clt.MakeRequest("POST", CreateTargetData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result.Data = "FALSE";
            }
            return Result;
        }


        /// <summary>
        /// Get the Data and Populate on the Edit Screen
        /// </summary>
        /// <param name="RecordId"></param>
        /// <returns>Record Details</returns>
        /// 
        [Authorize]
        public JsonResult GetCreateTargetForEdit(string RecordId)
        {
            JsonResult Result = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetCreateTargetForEdit");
                Result.Data = clt.MakeRequest("POST", RecordId, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result.Data = "FALSE";
            }
            return Result;
        }

        [Authorize]
        public string SavePartnerissue(string TotalPartnerIssue)
        {
            string Result = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SavePartnerIssue");
                Result = clt.MakeRequest("POST", TotalPartnerIssue, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public JsonResult GetPartnerIssuesList(string MasterType)
        {
            JsonResult jr = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetPartnerIssuelist");
                jr.Data = clt.MakeRequest("POST", MasterType, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                jr.Data = ex.Message.ToString();
            }
            return jr;
        }

        [Authorize]
        public JsonResult GetPartnerIssueDataForEdit(string EditId)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetPartnerIssueDataForEdit");
                JR.Data = clt.MakeRequest("POST", EditId, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public string SaveSchemeData(string TotalSchemeData)
        {
            string Result = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveSchemeData");
                Result = clt.MakeRequest("POST", TotalSchemeData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string SaveInventoryTracking(string TotalData)
        {
            string Result = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveInventoryTracking");
                Result = clt.MakeRequest("POST", TotalData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public JsonResult GetSchemeDetails(string EditId)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetSchemeDetails");
                JR.Data = clt.MakeRequest("POST", EditId, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetFilterDataForSchemes(string FilterData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFilterDataForSchemes");
                JR.Data = clt.MakeRequest("POST", FilterData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetFilterDataForPartnerIssue(string FilterData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFilterDataForPartnerIssue");
                JR.Data = clt.MakeRequest("POST", FilterData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public string GetSchemeId()
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetSchemeId");
                Result = clt.MakeRequest("POST", "ENVISION:ASD", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public JsonResult GetPartnerIssueNumber()
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];

            string SessionUserCode = UP.UserCode;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetPartnerIssueNumber");
                JR.Data = clt.MakeRequest("POST", SessionUserCode, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetAverageMonthlySale(string CustomerData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetAverageMonthlySale");
                JR.Data = clt.MakeRequest("POST", CustomerData, iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult GetInventoryDetails(string EditId)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetInventoryDetails");
                JR.Data = clt.MakeRequest("POST", EditId, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetFilterDataForInventory(string FilterData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFilterDataForInventory");
                JR.Data = clt.MakeRequest("POST", FilterData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public ActionResult SalesHurdleList()
        {
            return View();
        }

        [Authorize]
        public ActionResult SalesHurdleApproval()
        {
            return View();
        }

        [Authorize]
        public JsonResult PopupData(string SessionData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];

            string SessionUserCode = UP.UserCode;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetDataForPopup");
                JR.Data = clt.MakeRequest("POST", SessionData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }

            return JR;
        }

        [Authorize]
        public JsonResult PopupDataForZH(string SessionData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];

            string SessionUserCode = UP.UserCode;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetPopupDataForZH");
                JR.Data = clt.MakeRequest("POST", SessionData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }

            return JR;
        }

        [Authorize]
        public JsonResult SaveDailySalesHuddles(string Totaldata)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveDailySalesHuddles");
                JR.Data = clt.MakeRequest("POST", Totaldata, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult SaveWeeklySalesHuddles(string Totaldata)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveWeeklySalesHuddles");
                JR.Data = clt.MakeRequest("POST", Totaldata, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult SaveMonthlySalesHuddles(string Totaldata)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveMonthlySalesHuddles");
                JR.Data = clt.MakeRequest("POST", Totaldata, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetSalesHuddleData(string SessionData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];

            string SessionUserCode = UP.UserCode;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetSalesHuddleData");
                JR.Data = clt.MakeRequest("POST", SessionData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetPartnerIssueMasterData(string MasterType)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetPartnerIssueMasterData");
                JR.Data = clt.MakeRequest("POST", MasterType, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                return JR;
                //return Json(new
                //{
                //    tabledata = JR.Data.ToString()
                //}, JsonRequestBehavior.AllowGet);
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
        public JsonResult GetFilterDataForSalesHuddles(string FilterData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFilterDataForSalesHuddles");
                JR.Data = clt.MakeRequest("POST", FilterData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetSalesHuddleApprovalData(string SessionUserCode)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetSalesHuddleApprovalData");
                JR.Data = clt.MakeRequest("POST", SessionUserCode, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult UpdateSalesHuddleData(string Totaldata)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/UpdateSalesHuddleData");
                JR.Data = clt.MakeRequest("POST", Totaldata, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetFilterDataForSalesHuddlesApproval(string FilterData)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFilterDataForSalesHuddlesApproval");
                JR.Data = clt.MakeRequest("POST", FilterData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }


        [Authorize]
        public ActionResult HolidayConfigurationList()
        {
            return View();
        }

        [Authorize]
        public string BindZones()
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/BindZones");
                Result = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string BindStates(string stateName)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/BindStates");
                Result = clt.MakeRequest("POST", stateName, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        #region CreateTarget


        /// <summary>
        /// GetFSOTMinState
        /// </summary>
        /// <param name="CTData">State</param>
        /// <returns>List of People Under User</returns>
        /// 
        [Authorize]
        public JsonResult GetFSOTMinState(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFSOTMinState");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }



        #endregion CreateTarget


        #endregion ManiSFCD

        #region JourneyPlan
        [Authorize]
        public JsonResult GetUserbasedvaluesJP(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                /*
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetUserbasedvaluesJP");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                */


                JR.Data = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetUserbasedvaluesJP", Data, 20 * 60 * 1000);
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;



            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetEmployeeBasedNewCustomer(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/EmployeeBasedNewCustomer");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public string UpdateJourneyPlanStatus(string jsondata)
        {
            string Result = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/UpdateJourneyPlanStatus");
                Result = clt.MakeRequest("POST", jsondata, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;

        }

        [Authorize]
        public JsonResult GetJPLogiOrgIds(string Data)
        {
            JsonResult jr = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetJPLogiOrgIds");
                jr.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                jr.MaxJsonLength = int.MaxValue;
                jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {

                jr.Data = ex.Message.ToString();
            }
            return jr;
        }

        [Authorize]
        public ActionResult ZHJourneyPlanDetails()
        {
            return View();
        }

        [Authorize]
        public JsonResult GetPresentMonthDays()
        {
            JsonResult Jr = new JsonResult();
            try
            {
                Jr.MaxJsonLength = int.MaxValue;
                Jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                List<string> ret = new List<string>();
                DateTime Date = DateTime.Now;
                DateTime FirstDay = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 01);
                for (DateTime i = FirstDay; i <= ((FirstDay.AddMonths(1)).AddDays(-1)); i = i.AddDays(1))
                {
                    ret.Add(i.ToString("dd/MM/yyyy") + ":" + i.DayOfWeek + ":" + i.ToString("MMMM-yyyy"));
                }

                Jr.Data = JsonConvert.SerializeObject(ret);
            }
            catch (Exception ex)
            {
                Jr.Data = "False";
                new Utility.Utility().LogError("PJP ZH -  GetPresentMonthDays :" + ex.Message.ToString());
            }
            return Jr;
        }

        [Authorize]
        public JsonResult GetZHBasedStates(string Data)
        {
            JsonResult jr = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetZHBasedStates");
                jr.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                jr.MaxJsonLength = int.MaxValue;
                jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            }
            catch (Exception ex)
            {
                jr.Data = "False";
            }
            return jr;
        }

        [Authorize]
        public string SaveZHJourneyPlan(string TotalJourneyPlan)
        {
            string Result = string.Empty;
            try
            {
                Utility.Utility util = new Utility.Utility();
                JsonResult JR = new JsonResult();
                Result = util.MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveZHTotalPlanData", TotalJourneyPlan, 20 * 60 * 1000);

                // iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SaveTotalPlanData");

                //Result = clt.MakeRequest("POST", TotalJourneyPlan, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public ActionResult GetZHJourneyPlanDetailsforEdit(string ZHJourneyPlanMonth)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetZHJourneyPlanDetailsforEdit");
                JR.Data = clt.MakeRequest("POST", ZHJourneyPlanMonth, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public ActionResult FSODeviationSummeryReport()
        {
            return View();
        }

        [Authorize]
        public JsonResult GetUserBasedDeviationReport(string Data)
        {
            JsonResult jr = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetUserBasedDeviationReport");
                jr.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                jr.MaxJsonLength = int.MaxValue;
                jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            }
            catch (Exception ex)
            {
                jr.Data = "False";
            }
            return jr;
        }

        [Authorize]
        public JsonResult GetReportingUsers(string Data)
        {
            JsonResult jr = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetReportingUsers");
                jr.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                jr.MaxJsonLength = int.MaxValue;
                jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            }
            catch (Exception ex)
            {
                jr.Data = "False";
            }
            return jr;
        }
        #endregion

        #region Karthik
        [Authorize]
        public string GetHolidayYears()
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetHolidayYears");
                Result = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string DeleteHolidayData(string TotalData)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/DeleteHolidayData");
                Result = clt.MakeRequest("POST", TotalData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public JsonResult GetFilterDataForCounters(string FilterDataForCounters)
        {

            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFilterDataForCounters");
                JR.Data = clt.MakeRequest("POST", FilterDataForCounters, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult CompetitorCustomersHILProspects()
        {
            // string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/CompetitorCustomersHILProspects");
                JR.Data = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;

                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                return JR;
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
        public JsonResult GetFilterDataForMarkertMapHIL(string FilterDataForMarketMapHIL)
        {

            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetFilterDataForMarkertMapHIL");
                JR.Data = clt.MakeRequest("POST", FilterDataForMarketMapHIL, iAppUtils.HttpContentType.json).ResponseBody;
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
        public string SendMailCounterDetails(string Sendmaildetails)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/SendMailCounterDetails");
                Result = clt.MakeRequest("POST", Sendmaildetails, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string PartnerIssueSummary()
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetPartnerIssueSummary");
                Result = clt.MakeRequest("POST", "ENVISION:ASD", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string PartnerIssueSummaryList(string state)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetPartnerIssueSummaryList");
                Result = clt.MakeRequest("POST", state, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string GetfilterdataForPartnerIssueSummary(string Dates)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetfilterdataForPartnerIssueSummary");
                Result = clt.MakeRequest("POST", Dates, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string GetSalesRegion(string userid)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetSalesRegion");
                Result = clt.MakeRequest("POST", userid, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public JsonResult UploadKeyStockistFile(FormCollection formCollection)
        {
            Utility.Utility util = new Utility.Utility();
            JsonResult JR = new JsonResult();
            try
            {
                HttpPostedFileBase file = Request.Files["KeyStockistVolume"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "KeyStockistVolume" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "KeyStockistVolume" + System.IO.Path.GetExtension(file.FileName) + ""));
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
                        if (dr["F1"].ToString() == "")
                        {
                            dr.Delete();
                        }

                    }
                    Excel_Table.AcceptChanges();

                    UserProperties UP = (UserProperties)Session["UP"];
                    Dictionary<string, object> DataObj = new Dictionary<string, object>();

                    DataObj.Add("UserName", UP.UserName);
                    DataObj.Add("Excel_Table", Excel_Table);

                    string URL = ConfigurationManager.AppSettings["ServiceURL"];

                    string Result = JsonConvert.SerializeObject(DataObj);
                    string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/UploadKeyStockistFile", Result, 20 * 60 * 1000);

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
                util.LogMessage("UploadKeyStockistFile : " + ex);
                JR.Data = "";
            }
            JR.MaxJsonLength = int.MaxValue;
            return JR;
        }

        [Authorize]
        public string GetTotalsTargetList(string Data)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetTotalsTargetList");
                Result = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }


        #endregion





        #region SwamyPeddinti


        [Authorize]
        public JsonResult GetScoreCard(string IPData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                //iAppUtils.HttpClient clt = new iAppUtils.HttpClient("http://dims.hil.in:1258/SFDC/GetScoreCard");
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetScoreCard");
                JR.Data = clt.MakeRequest("POST", IPData, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;

        }


        [Authorize]
        public JsonResult GetScoreCardList(string UserData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetScoreCardList");
                JR.Data = clt.MakeRequest("POST", UserData, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
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
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                JObject JObj = new JObject();
                JObj.Add("UserCode", UP.UserCode);
                JObj.Add("UserType", UP.UserTypeCode);

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetStates");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(JObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }



        [Authorize]
        public JsonResult GetTheSalesDashBoard()
        {
            JsonResult JR = new JsonResult();
            try
            {
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                JObject JObj = new JObject();
                JObj.Add("UserCode", UP.UserCode);
                JObj.Add("UserType", UP.UserTypeCode);

                //iAppUtils.HttpClient clt = new iAppUtils.HttpClient("http://dims.hil.in:1258/SFDC/GetTheSalesDashBoard");
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetTheSalesDashBoard");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(JObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }


        [Authorize]
        public JsonResult GetTheSalesDashBoardZone(string ZonalId)
        {
            JsonResult JR = new JsonResult();
            try
            {
                JObject JObj = new JObject();
                JObj.Add("UserCode", ZonalId);
                JObj.Add("UserType", "ZH");

                //iAppUtils.HttpClient clt = new iAppUtils.HttpClient("http://dims.hil.in:9849/SFDC/GetTheSalesDashBoard");
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetTheSalesDashBoard");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(JObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetTheSalesDashBoardState(string StateId)
        {
            JsonResult JR = new JsonResult();
            try
            {
                JObject JObj = new JObject();
                JObj.Add("UserCode", StateId);
                JObj.Add("UserType", "SH");

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetTheSalesDashBoard");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(JObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }



        [Authorize]
        public JsonResult FillSalesDashBoardZones()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/FillSalesDashBoardZones");
                JR.Data = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetRevenueDashboard()
        {
            JsonResult JR = new JsonResult();
            try
            {
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                JObject JObj = new JObject();
                JObj.Add("UserCode", UP.UserCode);
                JObj.Add("UserType", UP.UserTypeCode);

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetRevenueDashboard");
                JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(JObj), iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }


        #endregion SwamyPeddinti



        [Authorize]
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult UploadFreightUpload(FormCollection formCollection)
        {
            Utility.Utility util = new Utility.Utility();
            JsonResult JR = new JsonResult();
            try
            {
                HttpPostedFileBase file = Request.Files["FreightUpload"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "FreightUpload" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "FreightUpload" + System.IO.Path.GetExtension(file.FileName) + ""));
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
                    string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/UploadFreightUpload", Result, 20 * 60 * 1000);

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
        public JsonResult UploadDiscountsUpload(FormCollection formCollection)
        {
            Utility.Utility util = new Utility.Utility();
            JsonResult JR = new JsonResult();
            try
            {
                HttpPostedFileBase file = Request.Files["DiscountsUpload"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "DiscountsUpload" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "DiscountsUpload" + System.IO.Path.GetExtension(file.FileName) + ""));
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
                        if (dr["F1"].ToString() == "")
                        {
                            dr.Delete();
                        }

                    }
                    Excel_Table.AcceptChanges();

                    UserProperties UP = (UserProperties)Session["UP"];
                    Dictionary<string, object> DataObj = new Dictionary<string, object>();

                    DataObj.Add("UserName", UP.UserName);
                    DataObj.Add("Excel_Table", Excel_Table);

                    string URL = ConfigurationManager.AppSettings["ServiceURL"];

                    string Result = JsonConvert.SerializeObject(DataObj);
                    string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/UploadDiscountsUpload", Result, 20 * 60 * 1000);

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

    }
}
