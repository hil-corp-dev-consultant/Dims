using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
using DIMS.Models;
using DIMS.Helpers;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class ReportsController : Controller
    {

        // Utility ut = new Utility();
        DIMS.Utility.Utility ut = new Utility.Utility();


        [Authorize]
        public ActionResult DailySalesTracker()
        {
            return View();
        }

        [Authorize]
        public ActionResult FreightUpload()
        {
            return View();
        }

        [Authorize]
        public ActionResult DiscountsUpload()
        {
            return View();
        }

        [Authorize]
        public ActionResult BudgetTargetUpload()
        {
            return View();
        }


        [Authorize]
        public ActionResult CreditLimitTracker()
        {
            return View();
        }


        [Authorize]
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult UploadExcel(FormCollection formCollection)
        {
            JsonResult jr = new JsonResult();
            try
            {
                if (Request.Files["FileUpload"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["FileUpload"].FileName);
                    string filename = "";
                    System.Globalization.DateTimeFormatInfo mfi = new System.Globalization.DateTimeFormatInfo();
                    //int MonthNumber = DateTime.Now.Month;
                    string Month = DateTime.Now.ToString("MMMM");
                    string Year = DateTime.Now.Year.ToString();

                    if (fileExtension == ".xls" || fileExtension == ".xlsx")
                    {
                        filename = Request.Files["FileUpload"].FileName.Replace(".xls", "") + "_" + Month + "_" + Year + ".xls";
                    }

                    string fileLocation = string.Format("{0}/{1}", Server.MapPath("~/BudgetTargetUpload"), filename);
                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.IO.File.Delete(fileLocation);
                    }
                    Request.Files["FileUpload"].SaveAs(fileLocation);

                    string con = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";

                    DataTable dt = new DataTable();
                    using (OleDbConnection connection = new OleDbConnection(con))
                    {
                        using (OleDbCommand cmd = new OleDbCommand())
                        {
                            using (OleDbDataAdapter oda = new OleDbDataAdapter())
                            {
                                dt = new DataTable();
                                cmd.CommandText = "Select *,'" + Month + "' as TargetMonth,'" + Year + "' as TargetYear From [Sheet1$]";
                                cmd.Connection = connection;
                                connection.Open();
                                oda.SelectCommand = cmd;
                                oda.Fill(dt);
                                connection.Close();
                            }
                        }
                    }
                    if (dt != null)
                    {
                        Dictionary<string, object> DataObj = new Dictionary<string, object>();
                        DataObj.Add("Excel_Table", dt);
                        string Result = JsonConvert.SerializeObject(DataObj);

                        string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/UploadBudgetTarget", Result, 5 * 60 * 1000);
                        if (Response == "Success")
                        {
                            jr.Data = JsonConvert.SerializeObject(dt);
                        }
                        dt.Dispose();
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return jr;
        }

        [Authorize]
        public JsonResult GetBudgetTarget(string Data)
        {
            JsonResult JR = new JsonResult();
            iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetBudgetTarget");
            JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerReport()
        {
            JsonResult JR = new JsonResult();
            try
            {


                //iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerReport");
                //JR.Data = clt.MakeRequest("POST", "GetDailySalesTrackerRepo", iAppUtils.HttpContentType.json).ResponseBody;


                string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerReport", "GetDailySalesTrackerRepo", 20 * 60 * 1000);
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.Data = Response;

            }
            catch (Exception ex)
            {
                JR.Data = ex.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerEast()
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerEast", "GetDailySalesTrackerReport", 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerEast1()
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerEast1", "GetDailySalesTrackerReport", 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerNorth()
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerNorth", "GetDailySalesTrackerReport", 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerSouth()
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerSouth", "GetDailySalesTrackerReport", 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerSouth1()
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerSouth1", "GetDailySalesTrackerReport", 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerWest()
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerWest", "GetDailySalesTrackerReport", 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }


        [Authorize]
        public JsonResult GetCreditLimitTracker(string Data)
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTracker", Data, 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetCreditLimitTrackerEast(string Data)
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTrackerEast", Data, 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetCreditLimitTrackerEast1(string Data)
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTrackerEast1", Data, 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }


        [Authorize]
        public JsonResult GetCreditLimitTrackerNorth(string Data)
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTrackerNorth", Data, 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

         [Authorize]
        public JsonResult GetCreditLimitTrackerSouth(string Data)
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTrackerSouth", Data, 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

         [Authorize]
         public JsonResult GetCreditLimitTrackerSouth1(string Data)
         {
             JsonResult JR = new JsonResult();
             string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTrackerSouth1", Data, 20 * 60 * 1000);
             JR.MaxJsonLength = int.MaxValue;
             JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
             JR.Data = Response;
             return JR;
         }
        
         [Authorize]
         public JsonResult GetCreditLimitTrackerWest(string Data)
         {
             JsonResult JR = new JsonResult();
             string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTrackerWest", Data, 20 * 60 * 1000);
             JR.MaxJsonLength = int.MaxValue;
             JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
             JR.Data = Response;
             return JR;
         }
        
        [Authorize]
        public JsonResult GetCreditLimitTrackerBasedonFilter(string Data)
        {
            JsonResult JR = new JsonResult();
            string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetCreditLimitTrackerBasedonFilter", Data, 20 * 60 * 1000);
            JR.MaxJsonLength = int.MaxValue;
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            JR.Data = Response;
            return JR;
        }

        [Authorize]
        public JsonResult GetDailySalesTrackerDates()
        {
            JsonResult JR = new JsonResult();
            iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDailySalesTrackerDates");
            JR.Data = clt.MakeRequest("POST", "GetDailySalesTrackerReport", iAppUtils.HttpContentType.json).ResponseBody;
            return JR;
        }






        [Authorize]
        public JsonResult GetRowsforDailySalesTracker()
        {
            JsonResult JR = new JsonResult();
            iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetRowsforDailySalesTracker");
            JR.Data = clt.MakeRequest("POST", "GetRowsforDailySalesTracker", iAppUtils.HttpContentType.json).ResponseBody;
            return JR;
        }



        [Authorize]
        public JsonResult GetStatesBased_Location(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetStatesBased_Location");
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
        public JsonResult GetDiscountId()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDiscountId");
                JR.Data = clt.MakeRequest("POST", "GetDiscountId", iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult SaveDiscountsData(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/SaveDiscountsData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult ChangeStatusForDiscounts(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeStatusForDiscounts");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult ChangeRejectedStatusForDiscounts(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeRejectedStatusForDiscounts");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetDiscountDataForEdit(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDiscountDataForEdit");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetNetBillingId()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetNetBillingId");
                JR.Data = clt.MakeRequest("POST", "GetNetBillingId", iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult SaveNetBillingData(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/SaveNetBillingData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetNetBillingDataForEdit(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetNetBillingDataForEdit");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult ChangeStatusToNetBilling(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeStatusToNetBilling");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult ChangeRejectedStatusToNetBilling(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeRejectedStatusToNetBilling");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }


        [Authorize]
        public JsonResult GetDirectBillingId()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDirectBillingId");
                JR.Data = clt.MakeRequest("POST", "GetDirectBillingId", iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult SaveDirectBillingData(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/SaveDirectBillingData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetDirectBillingDataForEdit(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDirectBillingDataForEdit");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]

        public JsonResult ChangeStatusToDirectBilling(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeStatusToDirectBilling");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult ChangeRejectedStatusToDirectBilling(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeRejectedStatusToDirectBilling");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }


        #region Karthik
        //Project Discount With Commission 
        [Authorize]
        public JsonResult GetProjectDiscountWithCommisionDiscountID()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetProjectDiscountWithCommisionDiscountID");
                JR.Data = clt.MakeRequest("POST", "", iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult SaveProjectCommisionWithCommissionData(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/SaveProjectCommisionWithCommissionData");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult ChangeStatusForProjectDiscountWithCommission(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeStatusForProjectDiscountWithCommission");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult ChangeRejectedStatusForProjectDiscountWithCommission(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/ChangeRejectedStatusForProjectDiscountWithCommission");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetProjectDiscountWithCommissionDataForEdit(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetProjectDiscountWithCommissionDataForEdit");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {

                Result = ex.Message.ToString();
            }
            return JR;
        }


        [Authorize]
        public ActionResult GetProjectDiscountWithCommissionStructureData()
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

                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetProjectDiscountWithCommissionStructureData");
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


        #endregion

        [Authorize]
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult UploadFile_PriceCardRate(FormCollection formCollection)
        {
            JsonResult JR = new JsonResult();
            try
            {

                ut.LogMessage("Upload File :");
                HttpPostedFileBase file = Request.Files["PriceCardRateFormFile"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "ReportsPriceCardRate" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "ReportsPriceCardRate" + System.IO.Path.GetExtension(file.FileName) + ""));
                //string[] columnNames = new string[13] { "Party Code", "Party Name", "Party Zone", "Party - Region", "Business", "Bill.Doc.", "Financial year", "Bill. Date", "Month", "Month 1", "Taxable Turnover", "Material Supplied From Plant", "Status" };
                string excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + fileLocation + ";Extended Properties=\"Excel 12.0;HDR=No;IMEX=1\"";

                OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                excelConnection.Open();

                DataTable dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);

                string query1 = string.Format("Select * from [{0}]", dt.Rows[0]["TABLE_NAME"].ToString());
                using (OleDbDataAdapter da = new OleDbDataAdapter(query1, excelConnection))
                {
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    Excel_Table = ds.Tables[0];
                }
                excelConnection.Close();

                if (Excel_Table.Rows.Count > 0)
                {
                    string[] ColNames = new string[] { "Sales Group Code", "Sales Group Name", "Price ( Rs )" };


                    DataRow dr = Excel_Table.Rows[0];

                    if (ColNames.Contains(dr["F1"].ToString()) && ColNames.Contains(dr["F2"].ToString()) && ColNames.Contains(dr["F3"].ToString()))
                    {
                        UserProperties UP = (UserProperties)Session["UP"];
                        Dictionary<string, object> DataObj = new Dictionary<string, object>();

                        DataObj.Add("UserName", UP.UserName);
                        DataObj.Add("Excel_Table", Excel_Table);

                        string URL = ConfigurationManager.AppSettings["ServiceURL"];

                        string Result = JsonConvert.SerializeObject(DataObj);
                        ut.LogMessage("Before Service req");
                        string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/PriceCardRateUpload", Result, 5 * 60 * 1000);
                        ut.LogMessage("After Service req");
                        if (Response == "FALSE")
                        {
                            JR.Data = "";
                        }
                        else if (Response == "TRUE")
                        {
                            JR.Data = JsonConvert.SerializeObject(Excel_Table);
                        }

                        Excel_Table.Dispose();

                    }
                    else
                    {
                        JR.Data = "Columns Doesn't Exist";
                    }
                }
            }
            catch (Exception ex)
            {
                JR.Data = "";

                ut.LogError(ex.Message.ToString());
            }
            JR.MaxJsonLength = int.MaxValue;
            return JR;
        }

        [Authorize]
        public JsonResult GetPriceCardRate()
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetPriceCardRate");
                JR.Data = clt.MakeRequest("POST", "PriceCard", iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetDiscountSummary(string Data)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "MISReports/GetDiscountSummary");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }
    }
}
