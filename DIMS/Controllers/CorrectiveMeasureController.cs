using DIMS.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class CorrectiveMeasureController : Controller
    {
        //
        // GET: /CorrectiveMeasure/

        public ActionResult Add()
        {
            return View();
        }
        public ActionResult CorrectiveMeasureList()
        {
            return View();
        }

        /// <summary>
        /// Save Corrective Measure Data will Save Header and child level data
        /// </summary>
        /// <param name="CorrectiveStream">Corrective Measure Header and Child data</param>
        /// <returns>Header and Child ID</returns>
        public ActionResult SaveCorrectiveData(string SaveData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCorrectiveMeasure");
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

        /// <summary>
        /// Delete Corrective Measure Data will delete child level data based on ID
        /// </summary>
        /// <param name="CorrectiveStream">Child data</param>
        /// <returns>Child name and ID</returns>
        public ActionResult DeleteCorrectiveData(string SaveData)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/SaveCorrectiveMeasure");
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


        /// <summary>
        /// Get Corrective measure based on ID for Editing
        /// </summary>
        /// <param name="DATA">Corrective measure Data</param>
        /// <returns>Corrective Measure Header and Child Data</returns>
        public ActionResult getCorrectiveMeasureData(string Data)
        {
            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetCorrectiveMeasureData");
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

        public ActionResult getComplaintStatusReportData(string InputData)
        {
            JsonResult jr = new JsonResult();
            string Res = string.Empty;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "ComplaintManagement/GetComplaintStatusReportData");
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

    }
}
