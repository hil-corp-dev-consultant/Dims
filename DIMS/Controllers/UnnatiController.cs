
using DIMS.Helpers;
using DIMS.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class UnnatiController : Controller
    {
        //
        // GET: /Unnati/

        Utility.Utility ut = new Utility.Utility();
        [Authorize]
        public ActionResult PointBalanceReport()
        {
            return View();
        }

        [Authorize]
        public ActionResult RedemptionReport()
        {
            return View();
        }

        [Authorize]
        public ActionResult MemberLoginReport()
        {
            return View();
        }
        [Authorize]
        public ActionResult TransactionDetailReport()
        {
            return View();
        }



        [Authorize]
        public ActionResult TransactionSummaryReport()
        {
            return View();
        }
        [Authorize]
        public ActionResult TransactionVelocityReport()
        {
            return View();
        }
        [Authorize]
        public ActionResult EnrollementDetailReport()
        {
            return View();
        }
        [Authorize]
        public ActionResult TransactionStatusReport()
        {
            return View();
        }
        [Authorize]
        public ActionResult EmployeeRedemptionReport()
        {
            return View();
        }
        [Authorize]
        public ActionResult UnnatiDashBoard()
        {
            return View();
        }
        [Authorize]
        public ActionResult UnnatiCustomerMapping()
        {
            return View();
        }
        [Authorize]
        public ActionResult UnnatiRewardsCatalogPoints()
        {
            return View();
        }

        /// <summary>
        /// Get Unnati reports data based on the report type and parameters
        /// </summary>
        /// <param name="Data">Report type and report parameters</param>
        /// <returns>Report type related data</returns>
        [Authorize]
        public ActionResult getReportData(string MasterType)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiReports/GetUnnatiReportsData");
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


        /// <summary>
        /// Get Point Balance List data will retrieve list data with comparing User default report table and User report table for selected column to display
        /// </summary>
        /// <param name="DATA">Minimum point Balance and Maximum point Balance</param>
        /// <returns>Point Balance list data </returns>
        #region

        [Authorize]
        public ActionResult getPointBalanceListData(string Data)
        {

            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetPointBalanceListData");
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
        #endregion


        /// <summary>
        /// Get DashBoard Data will retrieve dashboard related data 
        /// </summary>
        /// <param name="DATA">Zone,State,Rolename</param>
        /// <returns>Dashboard data </returns>
        /// 
        [Authorize]
        public ActionResult getDashBoardData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetDashBoardData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult GetFilterDataForUnnatiDashboard(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetFilterDataForUnnatiDashboard");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// Get Stockiest DashBoard Data will retrieve dashboard related data 
        /// </summary>
        /// <param name="DATA">Rolename,UserCode</param>
        /// <returns>Dashboard data </returns>
        [Authorize]
        public ActionResult getDashBoardStockiestData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetStockiestDashBoardData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult getFilterDashBoardStockiestData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetFilterDashBoardStockiestData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// Get Unnati Enrollment Data will retrieve Enrollment data for unnati user mapping
        /// </summary>
        /// <param name="DATA">UserCode</param>
        /// <returns>Enrollment data </returns>
        //public ActionResult getUnnatiEnrollmentData(string InputData)
        //{
        //    string conjsonlist;
        //    try
        //    {
        //        JsonResult JR = new JsonResult();
        //        iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetUnnatiEnrollmentData");
        //        JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        [Authorize]
        public string getUnnatiEnrollmentData(string InputData)
        {
            string Result = string.Empty;

            try
            {
                Session["UnnatiDashboardReportJsonstring"] = InputData;

                return Result = "Save";
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();

                return Result = errorresult;
            }
        }

        [Authorize]
        [HttpPost]
        public ActionResult LoadUnnatiDashBoardData()
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


                string json = Session["UnnatiDashboardReportJsonstring"].ToString();

                Dictionary<string, dynamic> values = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);


                values.Add("draw", draw);
                values.Add("start", start);
                values.Add("length", length);
                values.Add("sortColumn", sortColumn);
                values.Add("sortColumnDir", sortColumnDir);
                values.Add("searchvalue", searchvalue);
                string Data = JsonConvert.SerializeObject(values);
                JsonResult JR = new JsonResult();


                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetUnnatiEnrollmentData");
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

        /// <summary>
        /// updateCustomerID will update CustomerID of SAP with membershipID
        /// </summary>
        /// <param name="DATA">UserCode,MembershipID,CustomerID</param>
        /// <returns>RETURN SUCCESS RESULT  </returns>
        [Authorize]
        public ActionResult updateCustomerID(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/UpdateCustomerID");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// getZoneData will retrieve Zone data
        /// </summary>
        /// <param name="DATA">UserCode</param>
        /// <returns>RETURN SUCCESS Zone details  </returns>
        [Authorize]
        public ActionResult getZoneData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetZoneData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// getStateData will retrieve State data
        /// </summary>
        /// <param name="DATA">UserCode</param>
        /// <returns>RETURN SUCCESS State details  </returns>
        [Authorize]
        public ActionResult getStateData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetStateData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// getDistrictData will retrieve District data
        /// </summary>
        /// <param name="DATA">UserCode</param>
        /// <returns>RETURN SUCCESS District details  </returns>
        [Authorize]
        public ActionResult getDistrictData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetDistrictData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// getTaulkData will retrieve Taulk data
        /// </summary>
        /// <param name="DATA">UserCode</param>
        /// <returns>RETURN Taluk details  </returns>
        [Authorize]
        public ActionResult getTaulkData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetTaulkData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// getVillageData will retrieve Village data
        /// </summary>
        /// <param name="DATA">UserCode</param>
        /// <returns>RETURN Village details  </returns>
        [Authorize]
        public ActionResult getVillageData(string InputData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetVillageData");
                JR.Data = clt.MakeRequest("POST", InputData, iAppUtils.HttpContentType.json).ResponseBody;
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
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult UploadFile(FormCollection formCollection)
        {
            JsonResult JR = new JsonResult();
            try
            {
                ut.LogMessage("UploadFile File");
                HttpPostedFileBase file = Request.Files["UnnatiRewardsFormFile"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "UnnatiRewardsCatalog" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "UnnatiRewardsCatalog" + System.IO.Path.GetExtension(file.FileName) + ""));
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
                    string[] ColNames = new string[] { "Product Name", "Product Code", "No Of Points", "Category", "enabled" };


                    DataRow dr = Excel_Table.Rows[0];

                    if (ColNames.Contains(dr["F1"].ToString()) && ColNames.Contains(dr["F2"].ToString()) && ColNames.Contains(dr["F3"].ToString()) && ColNames.Contains(dr["F4"].ToString()) && ColNames.Contains(dr["F5"].ToString()))
                    {
                        UserProperties UP = (UserProperties)Session["UP"];
                        Dictionary<string, object> DataObj = new Dictionary<string, object>();

                        DataObj.Add("UserName", UP.UserName);
                        DataObj.Add("Excel_Table", Excel_Table);

                        string URL = ConfigurationManager.AppSettings["ServiceURL"];

                        string Result = JsonConvert.SerializeObject(DataObj);
                        ut.LogMessage("Before Service req");
                        string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/RewardCatalogUpload", Result, 5 * 60 * 1000);
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
        public JsonResult GetRewardsCatalog()
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/GetRewardsCatalog");
                JR.Data = clt.MakeRequest("POST","Rewards", iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }



        [Authorize]
        public JsonResult ColumnTotals(string IPData)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/ColumnTotals");
                JR.Data = clt.MakeRequest("POST", IPData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }


        [Authorize]
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult UploadCustomerMappingFile(FormCollection formCollection)
        {
            JsonResult JR = new JsonResult();
            try
            {
                ut.LogMessage("UploadFile File");
                HttpPostedFileBase file = Request.Files["UnnatiCustomerFormFile"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "UnnatiCustomerMapping" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "UnnatiCustomerMapping" + System.IO.Path.GetExtension(file.FileName) + ""));
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
                    string[] ColNames = new string[] { "Membership ID", "Member Name", "Member Type", "Enrollment Date", "Zone", "District", "State", "Customer Code/Org Level Id" };


                    DataRow dr = Excel_Table.Rows[0];

                    if (ColNames.Contains(dr["F1"].ToString()) && ColNames.Contains(dr["F2"].ToString()) && ColNames.Contains(dr["F3"].ToString()) && ColNames.Contains(dr["F4"].ToString()) && ColNames.Contains(dr["F5"].ToString()) && ColNames.Contains(dr["F6"].ToString()) && ColNames.Contains(dr["F7"].ToString()) && ColNames.Contains(dr["F8"].ToString()))
                    {
                        UserProperties UP = (UserProperties)Session["UP"];
                        Dictionary<string, object> DataObj = new Dictionary<string, object>();

                        DataObj.Add("UserName", UP.UserName);
                        DataObj.Add("Excel_Table", Excel_Table);

                        string URL = ConfigurationManager.AppSettings["ServiceURL"];

                        string Result = JsonConvert.SerializeObject(DataObj);
                        ut.LogMessage("Before Service req");
                        string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "UnnatiPortal/UploadCustomerMappingFile", Result, 8 * 60 * 1000);
                        ut.LogMessage("After Service req");

                        JR.Data = Response;

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
    }
}
