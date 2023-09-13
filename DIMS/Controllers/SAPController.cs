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
using System.Net.Http.Headers;
using System.Net.Http;
using DIMS.Helpers;

/*

        Module              : DIMS Client Application.
        DocumentName        : SAPController.cs
        Project Name        : Dealer Information Management System (DIMS).
        Client Name         : HIL :: CK BIRLA GROUP.
        Dev. Organisation   : Envision Enterprise Solutions Pvt. Ltd.
        Team                : ASD.
        Description         : This Doc is used for perform all the operations for SAP reports.
        Developer Name      : Rajanna Bhanothu.
        Change Log          : NA.

Module              : DIMS Client Application.
DocumentName        : SAPController.cs
Project Name        : Dealer Information Management System (DIMS).
Client Name         : HIL :: CK BIRLA GROUP.
Dev. Organisation   : Envision Enterprise Solutions Pvt. Ltd.
Team                : ASD.
Description         : This Doc is used for perform all the operations for SAP reports.
Developer Name      : Rajanna Bhanothu.
Change Log          : NA.

Module              : DIMS Client Application.
DocumentName        : SAPController.cs
Project Name        : Dealer Information Management System (DIMS).
Client Name         : HIL :: CK BIRLA GROUP.
Dev. Organisation   : Envision Enterprise Solutions Pvt. Ltd.
Team                : ASD.
Description         : This Doc is used for perform all the operations for SAP reports.
Developer Name      : Rajanna Bhanothu.
Change Log          : NA.


*/
namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
   // [EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class SAPController : Controller
    {
        //
        // GET: /SAP/

        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Get Account Statement Info.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Account_Statement(string Dates)
        {
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\",\"Dates\":\"" + Dates + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/AccountStatement");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// Get Account Statement Summary.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Account_Statement_Summary(string val)
        {
            String CustId = val;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/AccountStatementSummary");
                JR.Data = clt.MakeRequest("POST", CustId, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }

        /// <summary>
        /// Get Credit Notes.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Credit_Notes(string Dates)
        {
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\",\"Dates\":\"" + Dates + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/CreditNotes");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// Get Debit Notes.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Debit_Notes(string Dates)
        {
            try
            {
                //String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\"}";
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\",\"Dates\":\"" + Dates + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/DebitNotes");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// Get Invoice Details.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Invoice_Details()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZEXP()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZFOC()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZEXC()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZEFC()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZCOF()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZCOM()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZINV_Plant()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZINV_Depo()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZFOC_Plant()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZFOC_Depo()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZINV_Plant_GST()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZINV_Depo_GST()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZFOC_Plant_GST()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }

        [Authorize]
        public JsonResult InvoiceDetail_ZFOC_Depo_GST()
        {
            JsonResult jr = new JsonResult();
            return jr;
        }






        /// <summary>
        /// Get List of Invoice.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Invoice_List_View(string Dates)
        {
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\",\"Dates\":\"" + Dates + "\"}";
                // String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/InvoiceList");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult Invoice_Details_Edit(string val)
        {
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/InvoiceDetails");
                JR.Data = clt.MakeRequest("POST", val, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// Get Outstanding Details.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Outstanding_Detail(string Dates)
        {
            try
            {
                //String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\"}";
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\",\"Dates\":\"" + Dates + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/Outstanding");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
        /// Get Payment By Stockist.
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public JsonResult Payment_By_stockist(string Dates)
        {
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\",\"Dates\":\"" + Dates + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/PaymentByStockist");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult Pending_C_Forms()
        {
            try
            {
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/PendingCForms");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult TDS_Certificate(string Data)
        {
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/TDS_Download");
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

        [Authorize]
        public JsonResult TDS_CertificateList(string Dates)
        {
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                String UserRole = "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\",\"Dates\":\"" + Dates + "\"}";
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetTDS");
                JR.Data = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;
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
            Utility.Utility util = new Utility.Utility();
            JsonResult JR = new JsonResult();
            try
            {
                HttpPostedFileBase file = Request.Files["CFormFile"];
                DataTable Excel_Table = new DataTable();
                string FileExtension = System.IO.Path.GetExtension(file.FileName);
                var fpath = Path.Combine(Server.MapPath("/DIMSFiles"), "CFormFile" + FileExtension + "");
                file.SaveAs(fpath);
                string fileLocation = Path.Combine(Server.MapPath("~/DIMSFiles/" + "CFormFile" + System.IO.Path.GetExtension(file.FileName) + ""));
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
                    string a = JsonConvert.SerializeObject(Excel_Table);
                }
                excelConnection.Close();
                util.LogMessage("ExcelDT Count : " + Excel_Table.Rows.Count);

                if (Excel_Table.Rows.Count > 0)
                {
                    for (int i = 0; i < Excel_Table.Rows.Count; i++)
                    {

                        string[] ColNames = new string[] { "Party Code", "Party New Code", "Party Name", "Party Zone", "Party - Region", "Business", "Bill.Doc.", "Financial year", "Bill. Date", "Month", "Month 1", "Taxable Turnover", "Material Supplied From Plant", "Status", "Row Labels" };


                        DataRow dr = Excel_Table.Rows[i];

                        if (dr["F1"].ToString() == "" || dr["F2"].ToString() == "" || ColNames.Contains(dr["F1"].ToString()))
                        {
                            dr.Delete();
                        }
                        else if (dr["F11"].ToString().Contains(","))
                        {
                            string amount = dr["F11"].ToString().Replace(",", string.Empty);
                            dr["F11"] = amount.ToString();
                        }
                    }
                    Excel_Table.AcceptChanges();
                    util.LogMessage("After Changes ExcelDT Count : " + Excel_Table.Rows.Count);
                    UserProperties UP = (UserProperties)Session["UP"];
                    Dictionary<string, object> DataObj = new Dictionary<string, object>();

                    DataObj.Add("UserName", UP.UserName);
                    DataObj.Add("Excel_Table", Excel_Table);


                    string Result = JsonConvert.SerializeObject(DataObj);
                    string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/UpLoadCForm", Result, 20 * 60 * 1000);
                    //string Response = new DIMS.Utility.Utility().MakeHttpWebRequestToService("http://dims.hil.in:1258/SAPReport/UpLoadCForm", Result, 20 * 60 * 1000);

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
                util.LogMessage("C-Form : " + ex);
                JR.Data = "";
            }
            JR.MaxJsonLength = int.MaxValue;
            return JR;
        }

        [Authorize]
        public JsonResult LoadCFormFormDB()
        {
            JsonResult JR = new JsonResult();
            JR.MaxJsonLength = int.MaxValue;
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/LoadCFormFormDB");
                JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult SAP_DashBoard()
        {
            return View();
        }

        [Authorize]
        public JsonResult CFormSummaryLastFourQuarters(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/CFormSummaryLastFourQuarters");
                //  JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult AgeingofOutstandingSummary(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/AgeingofOutstandingSummary");
                // JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;\
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public JsonResult Financial_Transactions_Dashboard(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/Latest_Financial_Transactions_Dashboard");
                //JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public ActionResult EmpRoleConfiguration()
        {
            return View();
        }

        [Authorize]
        public ActionResult EmpCustomerConfiguration()
        {
            return View();
        }

        [Authorize]
        public JsonResult GetOrgLevelList()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetOrgLevelList");
                JR.Data = clt.MakeRequest("POST", "GetOrgLevelList", iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult GetEmployeeList()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetEmployeeList");
                JR.Data = clt.MakeRequest("POST", "GetEmployeeList", iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult GetCustomerList()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetCustomerList");
                JR.Data = clt.MakeRequest("POST", "CustomerList", iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult FillDivisionFilter(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties userProperties = (UserProperties)this.Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/FillDivisionFilter");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception ex)
            {
                JR.Data = (object)"";
            }
            return JR;
        }

        [Authorize]
        public JsonResult GetFSOList()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetFSOOrgList");
                JR.Data = clt.MakeRequest("POST", "FSOList", iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult GetZoneDropdownEmpRole()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetZoneDropdownEmpRole");
                JR.Data = clt.MakeRequest("POST", "ZoneDropdownEmpRole", iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult GetStateDropdownEmpRole()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetStateDropdownEmpRole");
                JR.Data = clt.MakeRequest("POST", "sTATA", iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult GetRoleDropdownEmpRole()
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetRoleDropdownEmpRole");
                JR.Data = clt.MakeRequest("POST", "Harish", iAppUtils.HttpContentType.json).ResponseBody;
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
        public string SaveEmpRoleConfigData(string RoleData)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/SaveEmpRoleConfigData");
                Result = clt.MakeRequest("POST", RoleData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public string SaveEmpCustomerConfigData(string CustomerData)
        {
            string Result = string.Empty;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/SaveEmpCustomerConfigData");
                Result = clt.MakeRequest("POST", CustomerData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return Result;
        }

        [Authorize]
        public JsonResult GetCustomer_Name(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetCustomer_Name");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult GetCreditNoteDetails(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetCreditNoteDetails");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = ex.Message.ToString();
            }
            return JR;
        }

        [Authorize]
        public ActionResult GetCustomerDetails(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetCustomerDetails");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult GetYearNamesFor()
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetYearNamesFor");
                JR.Data = clt.MakeRequest("POST", "YearNames", iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult CFormLatestQuarters(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/CFormLatestQuarters");
                //JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public string GetCurrentFinanceYear()
        {
            string Result = string.Empty;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetCurrentFinanceYear");
                //JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
                Result = clt.MakeRequest("POST", "{\"ToDate\":\"" + DateTime.Now.ToString() + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                Result = "";
            }
            return Result;
        }

        [Authorize]
        public ActionResult GetAllZoneList()
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetAllZoneList");
                JR.Data = clt.MakeRequest("POST", "zONE", iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult GetStatesListBasedOnZone(string ZoneCode)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetStatesListBasedOnZone");
                JR.Data = clt.MakeRequest("POST", ZoneCode, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult GetFSOListBasedSH(string SHCode)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetFSOListBasedSH");
                JR.Data = clt.MakeRequest("POST", SHCode, iAppUtils.HttpContentType.json).ResponseBody;
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
        public ActionResult GetFSOListBasedState(string StateCode)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetFSOListBasedState");
                JR.Data = clt.MakeRequest("POST", StateCode, iAppUtils.HttpContentType.json).ResponseBody;
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
        public string TotalCreditDebit(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/TotalAmtCreditDebit");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR.Data.ToString();
        }

        [Authorize]
        public JsonResult TotalAmtOutStanding(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];

                System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.Timeout = TimeSpan.FromMinutes(15);
                HttpResponseMessage response = client.PostAsJsonAsync(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/TotalAmtOutStanding", Data).Result;
                JR.Data = response.Content.ReadAsStringAsync().Result;

                // iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/TotalAmtOutStanding");
                //  JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR;
        }

        [Authorize]
        public string TotalAmtpaymentStockist(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/TotalAmtpaymentStockist");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR.Data.ToString();
        }

        [Authorize]
        public string TotalAmtInvoice(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/TotalAmtInvoice");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception ex)
            {
                JR.Data = "";
            }
            return JR.Data.ToString();
        }

        [Authorize]
        public ActionResult GetTotalTaxableIncome(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetTotalTaxableIncome");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
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
        public string GetAccessLevel_SAPDashboard(string UserRole)
        {
            string Result = string.Empty;
            //UserProperties up12 = new UserProperties();
            try
            {
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetAccessLevel_SAPDashboard");
                //JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
                Result = clt.MakeRequest("POST", UserRole, iAppUtils.HttpContentType.json).ResponseBody;

                if (Result == "True")
                {
                    UP.SAP_DashboardAccess = "ADMIN";
                }
            }
            catch (Exception ex)
            {
                Result = "False";
            }
            return Result;
        }

        [Authorize]
        public ActionResult GetTotalYearWiseForCForm(string Data)
        {
            string Result = string.Empty;
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetTotalYearWiseForCForm");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
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
        public string GetFSOOrgId()
        {
            string Result = string.Empty;
            try
            {
                DIMS.Models.UserProperties UP = (DIMS.Models.UserProperties)Session["UP"];
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SAPReport/GetFSOOrgLevelId");
                Result = clt.MakeRequest("POST", UP.UserCode, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {

                Result = "False";
            }
            return Result;
        }
    }
}
