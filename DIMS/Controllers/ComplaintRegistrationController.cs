using DIMS.Helpers;
using DIMS.Models;
using iAppUtils;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;


namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class ComplaintRegistrationController : Controller
    {
        //
        // GET: /ComplaintRegistration/


        #region ComplaintRegistration

        //It Returns the Registration Screen
        [Authorize]
        public ActionResult Registration()
        {
            return View();
        }



        //It is Used to save and update the Complaint Registration
        [Authorize]
        public JsonResult SaveComplaint(string RegistrationData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveComplaint");
                JR.Data = clt.MakeRequest("POST", RegistrationData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
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
                var Count = Request.Files.AllKeys.Length;
                string fileLocation = "";
                for (int i = 0; i < Count; i++)
                {
                    HttpPostedFileBase file = Request.Files["RegisterFile_" + i];
                    DataTable Excel_Table = new DataTable();
                    string FileExtension = System.IO.Path.GetExtension(file.FileName);
                    string FilePath = Server.MapPath("/DIMSFiles/ComplaintFiles");
                    if (!Directory.Exists(FilePath))
                    {
                        Directory.CreateDirectory(FilePath);
                    }
                    var FileName = "RegisterFile_" + DateTime.Today.ToString("dd-MM-yyyy")+"_"+ Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "")+"_"+file.FileName.Trim() + "";
                    var fpath = Path.Combine(Server.MapPath("/DIMSFiles/ComplaintFiles"), FileName);
                    file.SaveAs(fpath);
                    if(fileLocation == "")
                        fileLocation = FileName;
                    else
                        fileLocation += "," + FileName;
                }
                JR.Data = fileLocation;
            }
            catch (Exception ex)
            {
                util.LogMessage("Upload Complaint Attachments : " + ex);
                JR.Data = "";
            }
            JR.MaxJsonLength = int.MaxValue;
            return JR;
        }

        [Authorize]
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult UploadInvestigationFile(FormCollection formCollection)
        {
            Utility.Utility util = new Utility.Utility();
            JsonResult JR = new JsonResult();
            try
            {
                var Count = Request.Files.AllKeys.Length;
                string fileLocation = "";
                string ComplaintTrackNo = formCollection["ComplaintTrackingNo"].ToString();
                for (int i = 0; i < Count; i++)
                {
                    HttpPostedFileBase file = Request.Files["InvestigationFile_" + i];
                    DataTable Excel_Table = new DataTable();
                    string FileExtension = System.IO.Path.GetExtension(file.FileName);
                    string FilePath = Server.MapPath("/DIMSFiles/InvestigationFiles");
                    if (!Directory.Exists(FilePath))
                    {
                        Directory.CreateDirectory(FilePath);
                    }
                    var FileName = ComplaintTrackNo+"_InvestigationFile_" + Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "") + "_" + file.FileName.Trim() + "";
                    var fpath = Path.Combine(Server.MapPath("/DIMSFiles/InvestigationFiles"), FileName);
                    file.SaveAs(fpath);
                    if (fileLocation == "")
                        fileLocation = FileName;
                    else
                        fileLocation += "," + FileName;
                }
                JR.Data = fileLocation;
            }
            catch (Exception ex)
            {
                util.LogMessage("Upload Complaint Attachments : " + ex);
                JR.Data = "";
            }
            JR.MaxJsonLength = int.MaxValue;
            return JR;
        }



        //It is Used to Get the details of the Complaint for a given Complaint ID
        [Authorize]
        public ActionResult GetComplaint(string Identity)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetComplaint");
                JR.Data = clt.MakeRequest("POST", Identity, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }

        [Authorize]
        public ActionResult SendBackComplaintRegistration(string RegistrationData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SendBackComplaintRegistration");
                JR.Data = clt.MakeRequest("POST", RegistrationData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                JR.Data = (object)"FALSE";
            }
            return (ActionResult)JR;
        }
        //Vikas G, 2023 May 03 SBU-8 Start.
        [Authorize]
        public ActionResult SameInvoiceComplaintRegistration(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SameInvoiceComplaintRegistration");
                JR.Data = clt.MakeRequest("POST",Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception ex)
            {
                JR.Data = (object)"FALSE";
            }
            return (ActionResult)JR;
        }
        //Vikas G, 2023 May 03 SBU-8 Start.
        //It returns the Registration List Screen
        [Authorize]
        public ActionResult RegistrationList()
        {
            return View();
        }


        #endregion ComplaintRegistration



        #region ComplaintInvestigation

        //It Returns the Investigation Screen
        [Authorize]
        public ActionResult Investigation()
        {
            return View();
        }


        //It Returns the Investigation List Screen
        [Authorize]
        public ActionResult InvestigationList()
        {
            return View();
        }


        //It returns the Investigation Details for a given Identity
        [Authorize]
        public ActionResult GetInvestigationForEdit(string Identity)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetInvestigationForEdit");
                JR.Data = clt.MakeRequest("POST", Identity, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        //It is used while populating the Registered complaint into  Investigation
        [Authorize]
        public ActionResult PopulateComplaintInToInvestigation(string ComplaintNumber)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetComplaint");
                JR.Data = clt.MakeRequest("POST", ComplaintNumber, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        //Its is used to Save and update the Investigation data
        [Authorize]
        public ActionResult SaveInvestigation(string InvestigationData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveInvestigation");
                JR.Data = clt.MakeRequest("POST", InvestigationData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        #endregion ComplaintInvestigation



        #region OtherMethods

        //Common Approval Method for Approvals in the Registration and Investigation
        [Authorize]
        public JsonResult SendForApproval(string ApprovalData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SendForApproval");
                JR.Data = clt.MakeRequest("POST", ApprovalData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        //Common Approval Method for Make Approval in the Registration and Investigation
        [Authorize]
        public JsonResult MakeApproval(string ApprovalData)
        {
            JsonResult JR = new JsonResult();
            DIMS.Utility.Utility Util = new DIMS.Utility.Utility();
            JObject JObj = null;

            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/MakeApproval");
                JR.Data = clt.MakeRequest("POST", ApprovalData, iAppUtils.HttpContentType.json).ResponseBody;

                #region Data

                
                JObj = JObject.Parse(ApprovalData);

                if (JObj["FormName"].ToString() == "Compensation" && JObj["Decision"].ToString() == "Approved")
                {
                    if (JR.Data.ToString() == "TRUE")
                    {
                        clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetApprovedCompensationData");
                        string ApprovedData = clt.MakeRequest("POST", JObj["CM_Id"].ToString(), iAppUtils.HttpContentType.json).ResponseBody;

                        if (ApprovedData == "")
                        {
                        }
                        else
                        {
                            DataTable ApprovalsTable = new DataTable();

                            string fpath = Path.Combine(Server.MapPath("/DIMSFiles/Approvals"), "compensation_" + DateTime.Now.ToString("MM'_'dd'_'yyyy") + ".csv");

                            ApprovalsTable.Columns.Add("TrackingNo", typeof(string));
                            ApprovalsTable.Columns.Add("CustomerCode", typeof(string));
                            ApprovalsTable.Columns.Add("Compensation", typeof(string));
                            ApprovalsTable.Columns.Add("Dummy", typeof(string));
                            ApprovalsTable.Columns.Add("Dummying", typeof(string));
                            ApprovalsTable.Columns.Add("SalesEmp", typeof(string));
                            ApprovalsTable.Columns.Add("DateTime", typeof(string));
                            ApprovalsTable.Columns.Add("ZFOC", typeof(string));

                            ApprovalsTable.Columns.Add("SizeRecomm", typeof(string));
                            ApprovalsTable.Columns.Add("OtherSize", typeof(string));
                            ApprovalsTable.Columns.Add("ProductDivision", typeof(string));

                            JArray Obj = JArray.Parse(ApprovedData);

                            for (int j = 0; j < Obj.Count; j++)
                            {
                                ApprovalsTable.Rows.Add(Obj[j]["TRACKING_NO"].ToString(), Obj[j]["CUSTOMER_CODE"].ToString(), Obj[j]["APPROVED_QUANTITY"].ToString(), "0", "0", Obj[j]["SALES_EMP"].ToString(), DateTime.Now.ToString("dd'-'MM'-'yyyy"), "ZFOC", Obj[j]["SizeRecomandation"].ToString(), Obj[j]["OtherSize"].ToString(), Obj[j]["ProductDivision"].ToString());
                            }

                            StringBuilder sb = new StringBuilder();

                            foreach (DataRow row in ApprovalsTable.Rows)
                            {
                                IEnumerable<string> fields = row.ItemArray.Select(field => field.ToString());
                                sb.AppendLine(string.Join(",", fields));
                            }

                            System.IO.File.WriteAllText(fpath, sb.ToString());
                            ApprovalsTable.Dispose();
                        }
                    }
                }

                

                #endregion Data

            }
            catch (Exception EX)
            {
                Util.LogMessage("Error : MakeApproval : " + EX.Message + "\nApprovalData : " + ApprovalData);
                if (JR.Data.ToString() == "TRUE" && JObj["FormName"].ToString() == "Compensation")
                {
                }
                else
                {
                    JR.Data = "FALSE";
                }
            }
            return JR;
        }



        //Get the Observation Master Data based on the Product Type
        [Authorize]
        public JsonResult GetObservationMaster(string Product_Type)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetObservationMaster");
                JR.Data = clt.MakeRequest("POST", Product_Type, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }



        //Get the Breakage Category Names
        [Authorize]
        public JsonResult GetBreakageCategoryNames()
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetBreakageCategoryNames");
                JR.Data = clt.MakeRequest("POST", string.Empty, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;

        }



        //Get the GetSurveyList
        [Authorize]
        public JsonResult GetSurveyList(string MyData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetSurveyList");
                JR.Data = clt.MakeRequest("POST", MyData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;

        }


        #endregion OtherMethods



        #region DepricatedMethods               //But Dont Delete

        //Depricated Method
        [Authorize]
        public JsonResult SaveComplaintTable(string TableRegistrationData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveComplaintTable");
                JR.Data = clt.MakeRequest("POST", TableRegistrationData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }


        //Depricated Method
        [Authorize]
        public JsonResult SaveInvestigationTable(string TableRegistrationData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveInvestigationTable");
                JR.Data = clt.MakeRequest("POST", TableRegistrationData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;

        }


        //Depricated Method
        [Authorize]
        public JsonResult GetUserType(string UserCode)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetUserType");
                JR.Data = clt.MakeRequest("POST", UserCode, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }


        #endregion DepricatedMethods

        #region Compensation functions

        /// <summary>
        /// Get Investigation Child data based on Investigation Number
        /// </summary>
        /// <param name="DATA">Investigation id</param>
        /// <returns>Investigation Child data(Material supply ,Breakage investigation details and Breakage Other details)</returns>
        #region
        [Authorize]
        public ActionResult getCompensationChildData(string Data)
        {

            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetInvestigationChildData_Compensation");
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
        /// Save Compensation Data will save the header and line level data
        /// </summary>
        /// <param name="CompensationStream">Compensatio Data</param>
        /// <returns>Compensation ID AND Child ID</returns>
        #region
        [Authorize]
        public ActionResult SaveCompensationData(string SaveData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCompensationData");
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

        [Authorize]
        public ActionResult UpdateCreditNoteData(string SaveData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/UpdateCreditNoteData");
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
        #endregion

        /// <summary>
        /// Delete Compensation Data will delete the line level data
        /// </summary>
        /// <param name="CompensationStream">ID and child table name</param>
        /// <returns>Child ID and Child name</returns>
        #region
        [Authorize]
        public ActionResult DeleteCompensationData(string SaveData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCompensationData");
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
        #endregion

        /// <summary>
        /// Get Compensation data based on ID 
        /// </summary>
        /// <param name="DATA">Compensation ID</param>
        /// <returns>Header and child data of Compensation</returns>
        #region
        [Authorize]
        public ActionResult getCompensationData(string Data)
        {

            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetCompensationData");
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
        /// Get Compensation List data will retrieve list data with comparing User default report table and User report table for selected column to display
        /// </summary>
        /// <param name="DATA">ID</param>
        /// <returns>Compensation list data </returns>
        #region
        [Authorize]
        public ActionResult getReportListData(string Data)
        {

            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetReportsListData");
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
        #endregion



        [Authorize]
        public JsonResult FillCMSStateFilter()
        {
            JsonResult JR = new JsonResult();

            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/FillCMSStateFilter");
                JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }


        //[Authorize]
        public JsonResult AutoAssignComplaint(string AssignData)
        {
            JsonResult JR = new JsonResult();

            try
            {
                //UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/AutoAssignComplaint");
                JR.Data = clt.MakeRequest("POST", AssignData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                DIMS.Utility.Utility Util = new DIMS.Utility.Utility();
                Util.LogMessage("Error : AutoAssignComplaint : " + EX.Message + "\nAssignData : " + AssignData);
                JR.Data = "";
            }
            return JR;
        }


        public JsonResult GetMeTheComplaintInInvestigation(string AssignData)
        {
            JsonResult JR = new JsonResult();

            try
            {
                //UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/AutoAssignComplaint");
                JR.Data = clt.MakeRequest("POST", AssignData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                DIMS.Utility.Utility Util = new DIMS.Utility.Utility();
                Util.LogMessage("Error : GetMeTheComplaintInInvestigation : " + EX.Message + "\nAssignData : " + AssignData);
                JR.Data = "";
            }
            return JR;
        }



        [Authorize]
        public JsonResult SaveCCSheetsDataToDB(string CCSheetsData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCCSheetsDataToDB");
                JR.Data = clt.MakeRequest("POST", CCSheetsData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;

        }


        [Authorize]
        public JsonResult SaveCorrectiveMeasure(string CorrectiveMeasureData)
        {
            JsonResult JR = new JsonResult();

            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCorrectiveMeasure");
                JR.Data = clt.MakeRequest("POST", CorrectiveMeasureData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }


        [Authorize]
        public JsonResult GetTopDataToBottom(string IPData)
        {
            JsonResult JR = new JsonResult();

            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetTopDataToBottom");
                JR.Data = clt.MakeRequest("POST", IPData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }



        [Authorize]
        public JsonResult GetCorrectiveMeasureDataForEdit(string IPData)
        {
            JsonResult JR = new JsonResult();

            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetCorrectiveMeasureDataForEdit");
                JR.Data = clt.MakeRequest("POST", IPData, iAppUtils.HttpContentType.json).ResponseBody;

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
        public JsonResult GetPlantCodeForUserQAMPL(string UserCode)
        {
            JsonResult JR = new JsonResult();

            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetPlantCodeForUserQAMPL");
                JR.Data = clt.MakeRequest("POST", UserCode, iAppUtils.HttpContentType.json).ResponseBody;

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
        public JsonResult SaveCompensationLinesSBU3(string IPData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCompensationLinesSBU3");
                JR.Data = clt.MakeRequest("POST", IPData, iAppUtils.HttpContentType.json).ResponseBody;

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
        public JsonResult SaveCompensationLinesSBU8(string IPData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCompensationLinesSBU8");
                JR.Data = clt.MakeRequest("POST", IPData, iAppUtils.HttpContentType.json).ResponseBody;

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
        public JsonResult SaveCompensationLinesSBU2(string IPData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCompensationLinesSBU2");
                JR.Data = clt.MakeRequest("POST", IPData, iAppUtils.HttpContentType.json).ResponseBody;

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
        public JsonResult CCSheetCalculation(string ProductArray)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/CCSheetCalculation");
                JR.Data = clt.MakeRequest("POST", ProductArray, iAppUtils.HttpContentType.json).ResponseBody;

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
        public JsonResult GetCMSBUHeadDataClient()
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetCMSBUHeadDataClient");
                JR.Data = clt.MakeRequest("GET", "", iAppUtils.HttpContentType.json).ResponseBody;

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
        public ActionResult GetInvoiceValidation(string Data)
        {

            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetInvoiceValidation");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
                return Json(new
                {
                    complaintNo = JR.Data.ToString()
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

        //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type start
        [Authorize]
        public ActionResult GetSupplyDetailsList(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetSupplyDetailsList");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        //svprasadk 28-04-2020 SBU 1 requirement to get supply details based on customer and product type end

        //svprasadk 05-05-2020 SBU 1 requirement to get supply details based on customer and product type start
        [Authorize]
        public ActionResult getSizeSupplyQtyforProduct(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/getSizeSupplyQtyforProduct");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        //svprasadk 05-05-2020 SBU 1 requirement to get supply details based on customer and product type end

        //svprasadk 19-05-2020 SBU 1 requirement to add type of complaint start
        [Authorize]
        public JsonResult GetTypeofComplaints()
        {
            JsonResult JR = new JsonResult();

            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetTypeofComplaints");
                JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }
        //svprasadk 19-04-2020 SBU 1 requirement to add type of complaint end

        //svprasadk 27-07-2020 SBU 3 requirement Stock Transfer complaint start
        [Authorize]
        public JsonResult FillCMSPlantFilter()
        {
            JsonResult JR = new JsonResult();

            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/FillCMSPlantFilter");
                JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }
        //svprasadk 27-07-2020 SBU 3 requirement Stock Transfer complaint start

        //svprasadk 12-08-2020 SBU 3 requirement Stock Transfer complaint start
        //It is Used to save and update the Complaint Registration
        [Authorize]
        public JsonResult SaveComplaint_STO(string RegistrationData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveComplaint_STO");
                JR.Data = clt.MakeRequest("POST", RegistrationData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        //svprasadk 12-08-2020 SBU 3 requirement Stock Transfer complaint end
        //svprasadk 06-10-2020 SBU 1 requirement to delete uploaded file start
        [Authorize]
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult UploadedInvestigationFileDelete(FormCollection formCollection)
        {
            Utility.Utility util = new Utility.Utility();
            JsonResult JR = new JsonResult();
            try
            {
                string COMPLAINT_TRACKING_NO = formCollection["ComplaintTrackingNo"].ToString();
                string file = formCollection["file"].ToString();
                string FilePath = Server.MapPath("/DIMSFiles/InvestigationFiles");
                if (Directory.Exists(FilePath))
                {
                    var fpath = Path.Combine(FilePath, file);
                    System.IO.File.Delete(fpath);
                }
                //JR.Data = "TRUE";

                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/UploadedInvestigationFileDelete");
                JR.Data = clt.MakeRequest("POST", "{\"COMPLAINT_TRACKING_NO\":\"" + COMPLAINT_TRACKING_NO + "\"}", iAppUtils.HttpContentType.json).ResponseBody;                
            }
            catch (Exception ex)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        //svprasadk 06-10-2020 SBU 1 requirement to delete uploaded file end

        //svprasadk 10-07-2020 SBU 1 requirement to add type of parties start
        [Authorize]
        public JsonResult GetPartyTypes()
        {
            JsonResult JR = new JsonResult();

            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetPartyTypes");
                JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }
        //svprasadk 10-07-2020 SBU 1 requirement to add type of parties end

        //svprasadk 17-12-2020 SBU3 requirement adding checkbox to product master start
        [Authorize]
        public ActionResult getSizeSupplyQtyforProductBU3(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/getSizeSupplyQtyforProductBU3");
                JR.Data = clt.MakeRequest("POST", Data, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        //svprasadk 17-12-2020 SBU3 requirement adding checkbox to product master end
        //svprasadk 06-01-2021 SBU3 CMS Graphical dashboard plant filter start
        [Authorize]
        public JsonResult FillCMSPlantFilterBU3()
        {
            JsonResult JR = new JsonResult();

            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/FillCMSPlantFilterBU3");
                JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }
        //svprasadk 06-01-2021 SBU3 CMS Graphical dashboard plant filter end

        //svprasadk 02-03-2021 fortune20 check start
        [Authorize]
        public JsonResult checkFortune20(string MyData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/checkFortune20");
                JR.Data = clt.MakeRequest("POST", MyData, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;

        }
        //svprasadk 02-03-2021 fortune20 check end
    }
}