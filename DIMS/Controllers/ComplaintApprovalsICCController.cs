using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using Newtonsoft.Json.Linq;
using DIMS.Models;
using DIMS.Helpers;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class ComplaintApprovalsICCController : Controller
    {
        //
        // GET: /ComplaintApprovals/

        public ActionResult PendingApproval_ICC()
        {
            return View();
        }
        public ActionResult AssignComplaint_ICC()
        {
            return View();
        }
        public ActionResult ApprovalReport_ICC()
        {
            return View();
        }
        public JsonResult listApprovals_ICC(string Val)
        {
            string conjsonlist;
            string value = Val.Trim();
            //string jsonObj = "{\"MasterType\":\"" + Val + "\"}";
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintApprovalsICC/GetMasterDataICC");
                JR.Data = clt.MakeRequest("POST", value, iAppUtils.HttpContentType.json).ResponseBody;
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
        public JsonResult listpendingApprovals_ICC(string Val)
        {
            string conjsonlist;
            string value = Val.Trim();
            //string jsonObj = "{\"MasterType\":\"" + Val + "\"}";
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintApprovalsICC/GetMasterDataICC");
                JR.Data = clt.MakeRequest("POST", value, iAppUtils.HttpContentType.json).ResponseBody;
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

        public JsonResult Getlist_ICC(string Val)
        {
            string conjsonlist;
            string value = Val.Trim();
            string jsonObj = "{\"MasterType\":\"" + value + "\"}";

            try
            {
                UserProperties UP = (UserProperties)Session["UP"];

                JObject JObj = new JObject();
                JObj.Add("MasterType", value);
                JObj.Add("UserCode", UP.UserCode);

                jsonObj = JObj.ToString();

                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintApprovalsICC/GetMasterData");
                JR.Data = clt.MakeRequest("POST", jsonObj, iAppUtils.HttpContentType.json).ResponseBody;
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

        public JsonResult GetComplAssgnUserData_ICC(string Val, string Val1)
        {
            string conjsonlist;
            string jsonObj = "{\"MasterType\":\"" + Val.Trim() + "\",\"RoleName\":\"" + Val1.Trim() + "\"}";
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintApprovalsICC/GetMasterData");
                JR.Data = clt.MakeRequest("POST", jsonObj, iAppUtils.HttpContentType.json).ResponseBody;
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

        public JsonResult SaveMasterData_ICC(string MasterData)
        {
            string conjsonlist;
            string jsonObj = MasterData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintApprovalsICC/SaveMasterData_ICC");
                JR.Data = clt.MakeRequest("POST", jsonObj, iAppUtils.HttpContentType.json).ResponseBody;
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
    }
}
