using DIMS.Helpers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
   // [EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class ComplaintApprovalsController : Controller
    {
        //
        // GET: /ComplaintApprovals/

        public ActionResult PendingApproval()
        {
            return View();
        }
        public ActionResult AssignComplaint()
        {
            return View();
        }
        public ActionResult ApprovalReport()
        {
            return View();
        }
        public JsonResult listApprovals(string Val)
        {
            string conjsonlist;
            string value = Val.Trim();
            //string jsonObj = "{\"MasterType\":\"" + Val + "\"}";
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetMasterData");
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
        public JsonResult listpendingApprovals(string Val)
        {
            string conjsonlist;
            string value = Val.Trim();
            //string jsonObj = "{\"MasterType\":\"" + Val + "\"}";
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetMasterData");
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
    }
}
