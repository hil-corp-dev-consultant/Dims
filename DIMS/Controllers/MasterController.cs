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
    public class MasterController : Controller
    {
        //
        // GET: /Master/
        //SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSConnection"].ToString());


        public static void Test()
        {

        }


        public ActionResult Index()
        {
            Test();
            return View();

        }


        public ActionResult PlantMaster()
        {
            return View();
        }

        public ActionResult DocumentSeries()
        {
            return View();
        }

        public ActionResult MasterConfigData()
        {
            return View();
        }
       
        public ActionResult getData(string Val)
        {
            string conjsonlist;

            try
            {
                SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DIMSConnection"].ToString());
                DataTable dt = new DataTable();
                //SqlCommand cmd = new SqlCommand("select * from CCInfo", con);


                SqlCommand cmd = new SqlCommand("select ID,TABLE_NAME,TYPE from cms_master_config", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

                //JavaScriptSerializer serializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
                Dictionary<string, object> row;
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    list.Add(row);
                }
                conjsonlist = JsonConvert.SerializeObject(list);

                return Json(new
                {
                    tabledata = conjsonlist.ToString()
                }, JsonRequestBehavior.AllowGet);

                //JavaScriptSerializer serializer = new JavaScriptSerializer();
                //List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                //Dictionary<string, object> row;
                //foreach (DataRow dr in dt.Rows)
                //{
                //    row = new Dictionary<string, object>();
                //    foreach (DataColumn col in dt.Columns)
                //    {
                //        row.Add(col.ColumnName, dr[col]);
                //    }
                //    rows.Add(row);
                //}
                //return serializer.Serialize(rows);
            }
            catch (Exception ex)
            {
                string errorresult = ex.Message.ToString();
                //return errorresult;
                return Json(new
                {
                    errorresult = errorresult
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Getlist(string Val)
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
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetMasterData");
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

        public JsonResult GetComplAssgnUserData(string Val, string Val1)
        {
            string conjsonlist;
            string jsonObj = "{\"MasterType\":\"" + Val.Trim() + "\",\"RoleName\":\"" + Val1.Trim() + "\"}";
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetMasterData");
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

        public JsonResult SaveMasterData(string MasterData)
        {
            string conjsonlist;
            string jsonObj = MasterData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SaveMaster/SaveMasterData");
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
        public JsonResult UpdateMasterData(string MasterData)
        {
            string conjsonlist;
            string jsonObj = MasterData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SaveMaster/UpdateMasterData");
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
        //delete
        public JsonResult DeleteMasterData(string MasterData)
        {
            string conjsonlist;
            string jsonObj = MasterData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SaveMaster/DeleteMasterData");
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
        //Get XML Data
        public string GetXmlData(string MasterName)
        {
            XmlDocument xmlDoc = new XmlDocument(); string Result = "";
            switch (MasterName)
            {
                case "Country":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Area Master":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "State":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "City":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Location":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Depo Master":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Currency":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Group Company Details":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Company Details":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Zone Details":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Branch":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Department":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Complaint Mode":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Complaint Type":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Complaint Category":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Nature Of Complaint":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                case "Complaint Priority":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/" + MasterName + ".xml"));
                    break;
                //hanumanth
                //product
                case "Product Type":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ProductType.xml"));
                    break;
                case "Product Category":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ProductCategory.xml"));
                    break;
                case "Product Master":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ProductMaster.xml"));
                    break;
                //customers
                case "Customer Type":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/CustomerType.xml"));
                    break;
                case "Customer Category":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/CustomerCategory.xml"));
                    break;
                case "Customer Group":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/CustomerGroup.xml"));
                    break;
                case "Sales Representative":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/SalesRepresentative.xml"));
                    break;

                //corrective Actions
                case "Problem Type":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ProblemType.xml"));
                    break;
                case "Problem Impact":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ProblemImpact.xml"));
                    break;
                case "Response Action":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ResponseAction.xml"));
                    break;
                case "Control Measure":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ControlMeasure.xml"));
                    break;
                case "Cause Master":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/CauseMaster.xml"));
                    break;
                case "Corrective Actions":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/CorrectiveActions.xml"));
                    break;
                case "Preventive Actions":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/PreventiveActions.xml"));
                    break;
                //complaints
                case "Complaint Severity":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ComplaintSeverity.xml"));
                    break;
                //investigation
                case "Supplier Type":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/SupplierType.xml"));
                    break;
                case "Breakage Category":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/BreakageCategory.xml"));
                    break;
                case "Defect Type":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/DefectType.xml"));
                    break;
                case "Recovery Type":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/RecoveryType.xml"));
                    break;
                case "Survey Criteria":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/SurveyCriteria.xml"));
                    break;
                case "Compensation Mode":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/CompensationMode.xml"));
                    break;
                case "Observations Master":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/ObservationsMaster.xml"));

                    break;
                case "Document Master":
                    xmlDoc.Load(Server.MapPath("~/Content/Master_Validation_Files/DocumentMaster.xml"));

                    break;

            }
            XDocument xdoc = XDocument.Parse(xmlDoc.OuterXml);
            var nodes = from n in xdoc.Descendants("Field").Where(x => x.Element("IN").Value.Contains("False")) select n.Element("FN").Value;
            List<string> colors = nodes.ToList();

            for (int i = 0; i < colors.Count(); i++)
            {
                Result += colors[i];
            }
            return Result;
        }



        //list Document Series
        public JsonResult listDocumentSeriesData(string val)
        {
            string conjsonlist;
            string value = val.Trim();
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

        //list based on id
        public JsonResult DocumentSeriesDataid(string ID)
        {
            string conjsonlist;
            try
            {
                DateTime dt = new DateTime();
                Nullable<DateTime> ss;
                DateTime? newdate = null;
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/DocumentSeriesDataid");
                JR.Data = clt.MakeRequest("POST", ID, iAppUtils.HttpContentType.json).ResponseBody;
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


        //save Document Series
        public JsonResult SaveDocumentSeriesData(string RegistrationData)
        {
            string conjsonlist;
            string jsonObj = RegistrationData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SaveMaster/SaveMasterData");
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


        //list plantmaster
        public JsonResult listPlantMasterData(string val)
        {
            //string Q = "select ID,PLANT_CODE,AREA_NAME,STATE_NAME,COUNTRY_NAME,CREATED_BY,CREATED_DATE,ACTIVE FROM CMS_PLANT_MASTER";
            //// string Q = "select PM.ID,PM.PLANT_CODE,PM.PLANT_NAME,PM.CITY_CODE,PM.CITY_NAME,PM.STATE_CODE,PM.STATE_NAME,PM.AREA_CODE,PM.AREA_NAME,PM.COUNTRY_CODE,PM.COUNTRY_NAME,PM.ADDRESS,PM.ROOM_FLOOR,PM.BLOCK_BUILDING,PM.STREET_PO_BOX,PM.ZIP_CODE,PM.EMAIL,PM.WEBSITE,PM.PHONE1,PM.PHONE2,PM.MOBILE,PM.FAX,PM.CREATED_BY,PM.CREATED_DATE,PM.ACTIVE,PP.PRODUCT_TYPE_CODE,PP.PRODUCT_TYPE_NAME,PP.PRODUCT_CATEGORY_CODE,PP.PRODUCT_CATEGORY_NAME,PP.ID FROM CMS_PLANT_MASTER PM INNER JOIN CMS_PLANT_PRODUCTTYPE_LINES PP ON PM.ID=PP.ID";

            string conjsonlist;
            string value = val.Trim();
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
        //list based on id
        public JsonResult PlantMasterDataid(string ID)
        {
            //string conjsonlist;
            //JsonResult JR = new JsonResult();
            //SqlConnection CON = new SqlConnection("data source=192.168.4.66,1433;initial catalog=cms;persist security info=True;user id=sa;password=admin@123;");
            //string Q = "select ID,PLANT_CODE,PLANT_NAME,CITY_CODE,CITY_NAME,STATE_CODE,STATE_NAME,AREA_CODE,AREA_NAME,COUNTRY_CODE,COUNTRY_NAME,ADDRESS,ROOM_FLOOR,BLOCK_BUILDING,STREET_PO_BOX,ZIP_CODE,EMAIL,WEBSITE,PHONE1,PHONE2,MOBILE,FAX,CREATED_BY,CREATED_DATE,ACTIVE FROM CMS_PLANT_MASTER where ID=" + ID + "";
            ////string Q = "select ID,PLANT_CODE,PLANT_NAME,CITY_CODE,CITY_NAME,STATE_CODE,STATE_NAME,AREA_CODE,AREA_NAME,COUNTRY_CODE,COUNTRY_NAME,ADDRESS,ROOM_FLOOR,BLOCK_BUILDING,STREET_PO_BOX,ZIP_CODE,EMAIL,WEBSITE,PHONE1,PHONE2,MOBILE,FAX,CREATED_BY,CREATED_DATE,ACTIVE,PP.PRODUCT_TYPE_CODE,PP.PRODUCT_TYPE_NAME,PP.PRODUCT_CATEGORY_CODE,PP.PRODUCT_CATEGORY_NAME,PP.ID FROM CMS_PLANT_MASTER PM INNER JOIN CMS_PLANT_PRODUCTTYPE_LINES PP ON PM.ID=PP.ID where PM.ID=" + ID + "";
            //SqlCommand cmd = new SqlCommand(Q, CON);
            //SqlDataAdapter DA = new SqlDataAdapter(cmd);
            //DataTable dt = new DataTable();
            //DA.Fill(dt);

            //List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            //Dictionary<string, object> row;
            //foreach (DataRow dr in dt.Rows)
            //{
            //    row = new Dictionary<string, object>();
            //    foreach (DataColumn col in dt.Columns)
            //    {
            //        row.Add(col.ColumnName, dr[col]);
            //    }
            //    list.Add(row);
            //}
            //conjsonlist = JsonConvert.SerializeObject(list);

            //return Json(new
            //{
            //    tabledata = conjsonlist.ToString()
            //}, JsonRequestBehavior.AllowGet);

            string conjsonlist;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/PlantMasterDataid");
                JR.Data = clt.MakeRequest("POST", ID, iAppUtils.HttpContentType.json).ResponseBody;
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
        //save plantmaster
        public JsonResult SavePlantMasterData(string RegistrationData)
        {
            string conjsonlist;
            string jsonObj = RegistrationData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SaveMaster/SaveMasterData");
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
        //SAVE NOTICE CONFIGURATION
        public JsonResult SaveNoticeMasterData(string RegistrationData)
        {
            string conjsonlist;
            string jsonObj = RegistrationData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SaveMaster/SaveMasterData");
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
        //SAVE CUSTOMER MASTER
        public JsonResult SaveCustomerMasterData(string RegistrationData)
        {
            string conjsonlist;
            string jsonObj = RegistrationData;
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "SaveMaster/SaveMasterData");

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
        //customer list
        public JsonResult listcustomerMasterData(string val)
        {
            ////string Q = "select ID,PLANT_CODE,AREA_NAME,STATE_NAME,COUNTRY_NAME,CREATED_BY,CREATED_DATE,ACTIVE FROM CMS_PLANT_MASTER";
            //string Q = "SELECT ID,CUSTOMER_CODE,CUSTOMER_NAME,CUSTOMER_SAP_CODE,CONTACT_PERSON1_NAME,CONTACT_PERSON1_DESIGNATION,CONTACT_PERSON2_NAME,CONTACT_PERSON2_DESIGNATION,VAT_NO,TIN_NO,CUSTOMER_GROUP_CODE,CUSTOMER_GROUP_NAME,CUSTOMER_CATEGORY_CODE,CUSTOMER_CATEGORY_NAME,CUSTOMER_TYPE_CODE,CUSTOMER_TYPE_NAME,PRODUCT_TYPE_CODE,PRODUCT_TYPE_NAME,PRODUCT_CATEGORY_CODE,PRODUCT_CATEGORY_NAME,ROOM_FLOOR,BLOCK_BUILDING,STREET_PO_BOX,ZIP_CODE,ADDRESS,EMAIL,PHONE1,PHONE2,MOBILE,FAX,CUSTOMER_WEB_INTERFACE,LOCATION_CODE,LOCATION_NAME,CITY_CODE,CITY_NAME,STATE_CODE,STATE_NAME,AREA_CODE,AREA_NAME,COUNTRY_CODE,COUNTRY_NAME,CREATED_BY,CREATED_DATE,ACTIVE FROM CMS_CUSTOMER_MASTER";

            string conjsonlist;
            string value = val.Trim();
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

        public ActionResult RoleAccessConfiguration()
        {
            return View();
        }

        public ActionResult CMSDashboard()
        {
            return View();
        }

        //svprasadk 31-08-2020 getting CMS Graphical Dashboard start
        public ActionResult CMSGraphicalDashboard()
        {
            return View();
        }
        // svprasadk 31-08-2020 getting CMS Graphical Dashboard end
        public ActionResult LoginAuditLog()
        {
            return View();
        }

        public ActionResult ApplicationLog()
        {
            return View();
        }

        public ActionResult StockistDetails()
        {
            return View();
        }

        //svprasadk 09-12-2020 SBU3 requirement adding checkbox to product master start
        public JsonResult GetSDDefectTypeMasterBU3(string Master, string Product_Type, string Product_Category_CODE, string Complaint_Category_CODE)
    {
            string conjsonlist;
            string jsonObj = "{\"MasterType\":\"" + Master.Trim() + "\",\"ProductTypeCode\":\"" + Product_Type.Trim() + "\",\"ProductCategoryCode\":\"" + Product_Category_CODE.Trim() + "\",\"COMPLAINT_CATEGORY_CODE\":\"" + Complaint_Category_CODE.Trim() + "\"}";
            try
            {
                JsonResult JR = new JsonResult();
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "GetMaster/GetMasterData");
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
        //svprasadk 09-12-2020 SBU3 requirement adding checkbox to product master end
    }
}
