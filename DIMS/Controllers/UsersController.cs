/*

Module              : DIMSSolution.
DocumentName        : UsersController.cs
Project Name        : Dealer Information Management System (DIMS).
Client Name         : HIL :: CK BIRLA GROUP.
Dev. Organisation   : Envision Enterprise Solutions Pvt. Ltd.
Team                : ASD.
Description         : This Doc is for used for User Management.
Developer Name      : Swamy Ayyappa Peddinti.
Change Log          : NA.

*/




using DIMS.Helpers;
using DIMS.Models;
using iAppUtils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
   // [EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class UsersController : Controller
    {


        /// <summary>
        /// Stockists with out user crediantials page
        /// </summary>
        /// <returns>GetUserStockistList View</returns>
        public ActionResult GetUserStockistList()
        {
            return View();
        }


        /// <summary>
        /// To get Stockists with out user crediantials
        /// </summary>
        /// <returns>Stockists with out user crediantials</returns>
        //public JsonResult GetStockistList()
        //{
        //    JsonResult JR = new JsonResult();
        //    JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        //    try
        //    {
        //        HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetStockistList");
        //        JR.Data = clt.MakeRequest("GET", "", iAppUtils.HttpContentType.json).ResponseBody;
        //        JR.MaxJsonLength = int.MaxValue;
        //        JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        //    }
        //    catch (Exception)
        //    {
        //        JR.Data = "FALSE";
        //    }
        //    return JR;
        //}


        //public string GetStockistList_Name(string InputData)
        //{
        //    string Result = string.Empty;

        //    try
        //    {
        //        Session["StockistReportJsonstring"] = InputData;

        //        return Result = "Save";
        //    }
        //    catch (Exception ex)
        //    {
        //        string errorresult = ex.Message.ToString();

        //        return Result = errorresult;
        //    }
        //}

        [HttpPost]
        public ActionResult GetStockistList()
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


                // string json = Session["StockistReportJsonstring"].ToString();

                JObject JObj = new JObject();

                JObj.Add("UserCode", "50000822");
                JObj.Add("Name", "ALL");

                string JSonData = JsonConvert.SerializeObject(JObj);

                Dictionary<string, dynamic> values = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(JSonData);


                values.Add("draw", draw);
                values.Add("start", start);
                values.Add("length", length);
                values.Add("sortColumn", sortColumn);
                values.Add("sortColumnDir", sortColumnDir);
                values.Add("searchvalue", searchvalue);
                string Data = JsonConvert.SerializeObject(values);
                JsonResult JR = new JsonResult();


                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetStockistList");
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
        /// To Make Stockists to Users
        /// </summary>
        /// <param name="StockistArray">List of Stockist</param>
        /// <returns>Success or Failure</returns>
        public JsonResult MakeStockistsToUsers(string StockistArray)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/MakeStockistsToUsers");
                JR.Data = clt.MakeRequest("POST", StockistArray, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        /// <summary>
        /// Employee with out user crediantials page
        /// </summary>
        /// <returns>GetUsersEmployeeList View</returns>
        public ActionResult GetUsersEmployeeList()
        {
            return View();
        }


        /// <summary>
        /// To get Employee with out user crediantials
        /// </summary>
        /// <returns>Employees with out user crediantials</returns>
        public JsonResult GetEmployeeList()
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetEmployeeList");
                JR.Data = clt.MakeRequest("GET", "", iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        /// <summary>
        /// To Make Employees to Users
        /// </summary>
        /// <param name="StockistArray">List of Stockist</param>
        /// <returns>Success or Failure</returns>
        public JsonResult MakeEmployeesToUsers(string EmployeeArray)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/MakeEmployeesToUsers");
                JR.Data = clt.MakeRequest("POST", EmployeeArray, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        /// <summary>
        /// Page to display All Users
        /// </summary>
        /// <returns></returns>
        public ActionResult UsersList()
        {
            return View();
        }

        /// <summary>
        /// Get the Active or InActive Users
        /// </summary>
        /// <returns>Users List</returns>
        public JsonResult GetUsersList(string Req)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetUsersList");
                JR.Data = clt.MakeRequest("POST", Req, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        /// <summary>
        /// To Activate In Active Users
        /// </summary>
        /// <param name="UsersArray">Lists of Users to be Activated</param>
        /// <returns>Success or Failure</returns>
        public JsonResult ActivateUsers(string UsersArray)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/ActivateUsers");
                JR.Data = clt.MakeRequest("POST", UsersArray, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        /// <summary>
        /// To Get The Active Users View
        /// </summary>
        /// <returns></returns>
        public ActionResult ActiveUserList()
        {
            return View();
        }




        public ActionResult GetRightToAccess(string AccessData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetRightToAccess");
                JR.Data = clt.MakeRequest("POST", AccessData, iAppUtils.HttpContentType.json).ResponseBody;
                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            }
            catch (Exception EX)
            {
                JR.Data = "";
            }
            return JR;
        }



        public JsonResult GetCustomerNotificationCount()
        {
            JsonResult JR = new JsonResult();

            try
            {
                UserProperties UserProps = (DIMS.Models.UserProperties)Session["UP"];

                if (UserProps.UserTypeCode == "STOCKIST")
                {
                    HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetCustomerNotificationCount");
                    JR.Data = clt.MakeRequest("POST", UserProps.UserCode.ToString(), iAppUtils.HttpContentType.json).ResponseBody;
                }
                else
                {
                    JR.Data = "";
                }

                JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                JR.MaxJsonLength = int.MaxValue;
            }
            catch (Exception)
            {
                JR.Data = "";
            }
            return JR;
        }



        //public JsonResult GetCustomerNotificationList(string ModuleName)
        //{
        //    JsonResult JR = new JsonResult();

        //    try
        //    {
        //        UserProperties UserProps = (DIMS.Models.UserProperties)Session["UP"];

        //        if (UserProps.UserTypeCode == "STOCKIST")
        //        {
        //            JObject UserObj = new JObject();
        //            UserObj.Add("UserCode", UserProps.UserCode.ToString());
        //            UserObj.Add("ModuleName", ModuleName);

        //            HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "UsersManagement/GetCustomerNotificationList");
        //            JR.Data = clt.MakeRequest("POST", JsonConvert.SerializeObject(UserObj), iAppUtils.HttpContentType.json).ResponseBody;
        //        }
        //        else
        //        {
        //            JR.Data = "";
        //        }

        //        JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        //        JR.MaxJsonLength = int.MaxValue;
        //    }
        //    catch (Exception)
        //    {
        //        JR.Data = "";
        //    }
        //    return JR;
        //}

        [Authorize]
        public ActionResult StateWiseUsersList()
        {
            return View();
        }

        [Authorize]
        public JsonResult GetDimsMonitorLogData(string Data)
        {
            JsonResult JR = new JsonResult();
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SFDC/GetDimsMonitorLogData");
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
    }
}