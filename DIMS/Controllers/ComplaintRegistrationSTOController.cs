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
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;


namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class ComplaintRegistrationSTOController : Controller
    {
        [Authorize]
        public JsonResult FillCMSPlantFilter()
        {
            JsonResult JR = new JsonResult();

            try
            {
                UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/FillCMSPlantFilter");
                JR.Data = clt.MakeRequest("POST", "{\"UserRole\":\"" + Session["UserRole"].ToString() + "\",\"UserCode\":\"" + UP.UserCode + "\"}", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }

            return JR;
        }

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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveComplaint");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetComplaint");
                JR.Data = clt.MakeRequest("POST", Identity, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetInvestigationForEdit");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetComplaint");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveInvestigation");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SendForApproval");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/MakeApproval");
                JR.Data = clt.MakeRequest("POST", ApprovalData, iAppUtils.HttpContentType.json).ResponseBody;

                #region Data

                
                JObj = JObject.Parse(ApprovalData);

                //if (JObj["FORM_NAME"].ToString() == "Compensation" && JObj["DECISION"].ToString() == "Approved")
                //{
                //    if (JR.Data.ToString() == "TRUE")
                //    {
                //        clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetApprovedCompensationData");
                //        string ApprovedData = clt.MakeRequest("POST", JObj["COMPLAINT_TRACKING_NO"].ToString(), iAppUtils.HttpContentType.json).ResponseBody;

                //        if (ApprovedData == "")
                //        {
                //        }
                //        else
                //        {
                //            DataTable ApprovalsTable = new DataTable();

                //            string fpath = Path.Combine(Server.MapPath("/DIMSFiles/Approvals"), "compensation_" + DateTime.Now.ToString("MM'_'dd'_'yyyy") + ".csv");

                //            ApprovalsTable.Columns.Add("TrackingNo", typeof(string));
                //            ApprovalsTable.Columns.Add("CustomerCode", typeof(string));
                //            ApprovalsTable.Columns.Add("Compensation", typeof(string));
                //            ApprovalsTable.Columns.Add("Dummy", typeof(string));
                //            ApprovalsTable.Columns.Add("Dummying", typeof(string));
                //            ApprovalsTable.Columns.Add("SalesEmp", typeof(string));
                //            ApprovalsTable.Columns.Add("DateTime", typeof(string));
                //            ApprovalsTable.Columns.Add("ZFOC", typeof(string));

                //            ApprovalsTable.Columns.Add("SizeRecomm", typeof(string));
                //            ApprovalsTable.Columns.Add("OtherSize", typeof(string));
                //            ApprovalsTable.Columns.Add("ProductDivision", typeof(string));

                //            JArray Obj = JArray.Parse(ApprovedData);

                //            for (int j = 0; j < Obj.Count; j++)
                //            {
                //                ApprovalsTable.Rows.Add(Obj[j]["TRACKING_NO"].ToString(), Obj[j]["CUSTOMER_CODE"].ToString(), Obj[j]["APPROVED_QUANTITY"].ToString(), "0", "0", Obj[j]["SALES_EMP"].ToString(), DateTime.Now.ToString("dd'-'MM'-'yyyy"), "ZFOC", Obj[j]["SizeRecomandation"].ToString(), Obj[j]["OtherSize"].ToString(), Obj[j]["ProductDivision"].ToString());
                //            }

                //            StringBuilder sb = new StringBuilder();

                //            foreach (DataRow row in ApprovalsTable.Rows)
                //            {
                //                IEnumerable<string> fields = row.ItemArray.Select(field => field.ToString());
                //                sb.AppendLine(string.Join(",", fields));
                //            }

                //            System.IO.File.WriteAllText(fpath, sb.ToString());
                //            ApprovalsTable.Dispose();
                //        }
                //    }
                //}

                

                #endregion Data

            }
            catch (Exception EX)
            {
                Util.LogMessage("Error : MakeApproval : " + EX.Message + "\nApprovalData : " + ApprovalData);
                if (JR.Data.ToString() == "TRUE" && JObj["FORM_NAME"].ToString() == "Compensation")
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveComplaintTable");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveInvestigationTable");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetUserType");
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetInvestigationChildData_Compensation");
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveCompensationData");
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/UpdateCreditNoteData");
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveCompensationData");
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetCompensationData");
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetReportsListData");
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



        


        //[Authorize]
        public JsonResult AutoAssignComplaint(string AssignData)
        {
            JsonResult JR = new JsonResult();

            try
            {
                //UserProperties UP = (UserProperties)Session["UP"];
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/AutoAssignComplaint");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/AutoAssignComplaint");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveCCSheetsDataToDB");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveCorrectiveMeasure");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetTopDataToBottom");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetCorrectiveMeasureDataForEdit");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetPlantCodeForUserQAMPL");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveCompensationLinesSBU3");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/SaveCompensationLinesSBU2");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/CCSheetCalculation");
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
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetCMSBUHeadDataClient");
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagementSTO/GetInvoiceValidation");
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
    }
}