/*


Module              : DIMSSolution.
DocumentName        : LogOnController.cs
Project Name        : Dealer Information Management System (DIMS).
Client Name         : HIL :: CK BIRLA GROUP.
Dev. Organisation   : Envision Enterprise Solutions Pvt. Ltd.
Team                : ASD.
Description         : This Doc is for used for User Authentication,Password change, User Login and Logout.
Developer Name      : Swamy Ayyappa Peddinti.
Change Log          : NA.


*/



using DIMS.Helpers;
using DIMS.Models;
using DIMS.Utility;
using iAppUtils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace DIMS.Controllers
{
    public class LogOnController : Controller
    {
        //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
        //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
        //To Load the Login Screen
        [OutputCache(NoStore = true, Duration = 60, VaryByParam = "*")]
        public ActionResult LogOn()
        {
            return View();
        }


        //On Successful Validation of tLogin OTP Log the UserDetails in the AuditUserLogin
        public JsonResult ValidOTPEntered(string LoginData)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/ValidOTPEntered");
                JR.Data = clt.MakeRequest("POST", LoginData, iAppUtils.HttpContentType.json).ResponseBody;
                ViewBag.FirstLogin = Session["FirstLogin"].ToString();
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        public ActionResult ValidateUserName(string LoginData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/ValidateUserName");
                JR.Data = clt.MakeRequest("POST", LoginData, iAppUtils.HttpContentType.json).ResponseBody;
                if (JR.Data.ToString() == "FALSE") { }
                else if (JR.Data.ToString() == "404") { }
                else if (JR.Data.ToString() == "BLOCKED") { }
                else if (JR.Data.ToString() == "INACTIVE") { }


            }
            catch (Exception ex)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        //When the User clicks the Login Button
        //[EnableThrottling]
        public ActionResult LogIn(string LoginData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/UserLogin");
                JR.Data = clt.MakeRequest("POST", LoginData, iAppUtils.HttpContentType.json).ResponseBody;
                
                if (JR.Data.ToString() == "FALSE")
                {
                }
                else if (JR.Data.ToString() == "404")
                {
                }
                else if (JR.Data.ToString() == "BLOCKED")
                {
                }
                else if (JR.Data.ToString() == "INACTIVE")
                {
                }
                else if (JR.Data.ToString() == "PasswordExpired")
                {
                    JObject JObj1 = JObject.Parse(LoginData);
                    UserProperties UP = new UserProperties();
                    UP.UserCode = JObj1["UserName"].ToString();
                    UP.Token = "EXPIRED";
                    Session["Token"] = "EXPIRED";
                    Session["UP"] = UP;

                    FormsAuthentication.SetAuthCookie(JObj1["UserName"].ToString(), true);

                }
                else
                {
                    JObject JObj = JObject.Parse(JR.Data.ToString());
                    JObject JObj1 = JObject.Parse(LoginData);
                    UserProperties UP = new UserProperties();

                    FormsAuthentication.SetAuthCookie(JObj1["UserName"].ToString(), true);

                    //string REM = (JObj1["RememberMe"]).ToString();

                    UP.UserCode = JObj["UserCode"].ToString().Trim();

                    Session["DisplayName"] = JObj["UserName"].ToString().Trim();

                    UP.UserName = JObj["UserName"].ToString().Trim();
                    UP.UserType = JObj["RoleName"].ToString().Trim();
                    UP.UserTypeCode = JObj["RoleCode"].ToString().Trim();
                    UP.SITEDETAIL_CODE = JObj["SITE_DETAIL_CODE"].ToString().Trim();
                    UP.COMPANYDETAIL_CODE = JObj["COMPANY_DETAIL_CODE"].ToString().Trim();

                    UP.UserStateCode = JObj["StateCode"].ToString().Trim();
                    UP.UserStateName = JObj["StateName"].ToString().Trim();
                    UP.UserZoneCode = JObj["ZoneCode"].ToString().Trim();
                    UP.UserZoneName = JObj["ZoneName"].ToString().Trim();


                    UP.Token = JObj["TOKEN"].ToString().Trim();
                    // UP.State = JObj["SalesRegion"].ToString().Trim();

                    //svprasadk 17-06-2020 SBU 1 requirement to bulk assign complaints start
                    UP.USER_PRODUCT_TYPE_CODE = JObj["USER_PRODUCT_TYPE_CODE"].ToString().Trim();
                    //svprasadk 17-06-2020 SBU 1 requirement to bulk assign complaints end

                    Session["Token"] = JObj["TOKEN"].ToString().Trim();
                    Session["UP"] = UP;

                    Session["FirstLogin"] = JObj["FirstLogin"].ToString().Trim();
                    Session["UserRole"] = JObj["RoleCode"].ToString().Trim();

                    if (Session["UserRole"].ToString() == "STOCKIST")
                    {

                        Session["UnnatiEnrolledCustomer"] = JObj["UnnatiEnrolledCustomer"].ToString().Trim();
                        if (JObj["UnnatiEnrolledCustomer"].ToString().Trim() == "Yes")
                        {
                            Session["UnnatiEnrolledMembershipID"] = JObj["UnnatiEnrolledMembershipID"].ToString().Trim();
                            Session["UnnatiEnrolledCustomerZone"] = JObj["UnnatiEnrolledCustomerZone"].ToString().Trim();
                            Session["UnnatiEnrolledCustomerState"] = JObj["UnnatiEnrolledCustomerState"].ToString().Trim();
                            Session["UnnatiEnrolledCustomerDistrict"] = JObj["UnnatiEnrolledCustomerDistrict"].ToString().Trim();
                        }
                        else
                        {

                        }
                    }

                    // Storing in Local cookies
                    Response.Cookies["IPAddress"].Value = JObj1["IPAddress"].ToString();
                    Response.Cookies["Device"].Value = JObj1["Device"].ToString();
                    Response.Cookies["Browser"].Value = JObj1["Browser"].ToString();
                    Response.Cookies["TOKEN"].Value = JObj["TOKEN"].ToString();

                    Response.Cookies["IPAddress"].Expires = DateTime.Now.AddDays(30);
                    Response.Cookies["Device"].Expires = DateTime.Now.AddDays(30);
                    Response.Cookies["Browser"].Expires = DateTime.Now.AddDays(30);
                    Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(30);


                    // END


                    //if (REM == "True")
                    //{
                    //    Response.Cookies["UserName"].Value = JObj1["UserName"].ToString();
                    //    Response.Cookies["Password"].Value = JObj1["Password"].ToString();
                    //    Response.Cookies["UserName"].Expires = DateTime.Now.AddDays(30);
                    //    Response.Cookies["Password"].Expires = DateTime.Now.AddDays(30);
                    //}
                    //else
                    //{
                    //    Response.Cookies["UserName"].Expires = DateTime.Now.AddDays(-1);
                    //    Response.Cookies["Password"].Expires = DateTime.Now.AddDays(-1);

                    //}
                }

            }
            catch (Exception ex)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        //User Sign Out Logic
        public JsonResult UserSignOut()
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                UserProperties UP = (UserProperties)Session["UP"];

                string Token = Session["Token"].ToString();

                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/UserSignOut");
                JR.Data = clt.MakeRequest("POST", Token, iAppUtils.HttpContentType.json).ResponseBody;
                // New code 
                Response.Cookies["UserName"].Value = "";
                Response.Cookies["Password"].Value = "";
                /// code
                FormsAuthentication.SignOut();
                Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Cache.SetNoStore();
                Session.Clear();
                Session.Abandon();

            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        [Authorize]
        public JsonResult GetOtpToChangePassword(string UID)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/GetOtpToChangePassword");
                string responsebody = clt.MakeRequest("POST", UID, HttpContentType.json).ResponseBody;
                JR.Data = responsebody;
                return JR;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }



        public JsonResult GetMeOTPToMobileForFP(string UID)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/GetMeOTPToMobileForFP");
                JR.Data = clt.MakeRequest("POST", UID, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }



        /// <summary>
        /// Resend OTP for first time login
        /// </summary>
        /// <param name="UID">User ID</param>
        /// <returns>Resend OTP for firsttime login</returns>
        /// 
        
        public JsonResult ResendOTPFirstLogin(string UID)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/ResendOTPFirstLogin");
                JR.Data = clt.MakeRequest("POST", UID, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            var json = new JavaScriptSerializer().Serialize(JR.Data);
           
            return JR;
        }

        
        public JsonResult SendPasswordtoMail(string UID)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/SendPasswordtoMail");
                JR.Data = clt.MakeRequest("POST", UID, iAppUtils.HttpContentType.json).ResponseBody;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }


        [Authorize]
        public JsonResult ChangePassword(string result)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/Changepassword");
                JR.Data = clt.MakeRequest("POST", result, HttpContentType.json).ResponseBody;
            }
            catch (Exception)
            {
                JR.Data = "FALSE";
            }

            return JR;
        }



        /// <summary>
        /// Check Users Session (Validate User Properties)
        /// </summary>
        /// <returns>Session Validity</returns>
        /// 
        [Authorize]
        public JsonResult CheckUserSession()
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                if (Session["Token"].ToString() == "EXPIRED" && User.Identity.Name == "")
                {
                    JR.Data = "TRUE";
                }
                else if (User.Identity.Name == "" || User.Identity.Name == null || Session["Token"].ToString() == "" || Session["Token"] == null)
                {
                    JR.Data = "FALSE";
                }
                else
                {
                    UserProperties UP = (UserProperties)Session["UP"];
                    string UserProps = JsonConvert.SerializeObject(UP);
                    if (UP.Token == "EXPIRED")
                    {
                        JR.Data = "TRUE";
                    }
                    else
                    {
                        HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/CheckUserSession");
                        JR.Data = clt.MakeRequest("POST", UserProps, iAppUtils.HttpContentType.json).ResponseBody;
                    }
                }
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();

            string[] cookies = Request.Cookies.AllKeys;
            HttpCookie uname = new HttpCookie("111");
            HttpCookie pwd = new HttpCookie("222");
            if (uname != null && pwd != null)
            {
                uname.Expires = DateTime.Now.AddDays(-1d);
                Response.Cookies.Add(uname);
                pwd.Expires = DateTime.Now.AddDays(-1d);
                Response.Cookies.Add(pwd);
            }
            //disablebrowserbackbutton();

            return RedirectToAction("LogOn", "LogOn");
        }

        
        public ActionResult Landing_Page()
        {
            return View();
        }


        public ActionResult SessionExpire()
        {
            return View();
        }


        public void disablebrowserbackbutton()
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoServerCaching();
            Response.Cache.SetNoStore();
        }

        [HttpPost]
        public ActionResult TestSession()
        {
            Session["Check_Page_Refresh"] = DateTime.Now.ToString();
            return View();
        }

        
        public JsonResult generateCaptcha()
        {
            string Result = string.Empty;

            try
            {
                //Random r = new Random();
                //string imgname = r.Next().ToString();
                System.Drawing.FontFamily family = new System.Drawing.FontFamily("Arial");
                CaptchaImage img = new CaptchaImage(150, 50, family);
                //string text = img.CreateRandomText(4) + img.CreateRandomText(3);
                string text = (img.CreateRandomText(6)).ToUpper();
                img.SetText(text);

                

                img.GenerateImage();
                img.Image.Save(Server.MapPath("~/Images/CapImg_") + text + ".png", System.Drawing.Imaging.ImageFormat.Png);

                JObject JObj = new JObject();
                JObj.Add("Path", "CapImg_" + text + ".png");
                JObj.Add("Text", text);
                Result = JsonConvert.SerializeObject(JObj);
                return Json(Result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX)
            {
                Result = "FALSE";
                return Json(Result, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult ValidateCaptch(string data)
        {
            JsonResult jrst = new JsonResult();
            Newtonsoft.Json.Linq.JObject obj = Newtonsoft.Json.Linq.JObject.Parse(data);
            if ((string)obj["Captcha"] == Session["captchaText"].ToString())
            {
                jrst.Data = "true";
                //m_lbMessage.ForeColor = Color.Green;
                //m_lbMessage.Text = "Valid";
            }
            else
            {
                jrst.Data = "false";
                //m_lbMessage.ForeColor = Color.Red;
                //m_lbMessage.Text = "Invalid";
            }
            return jrst;
        }



        #region User Login Image selection
        public JsonResult SaveUserLoginImage(string Name)
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/SaveUserLoginImage");
                string responsebody = clt.MakeRequest("POST", Name, HttpContentType.json).ResponseBody;
                JR.Data = responsebody;
                return JR;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }

        public JsonResult GetLoginImages()
        {
            JsonResult JR = new JsonResult();
            JR.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            try
            {
                iAppUtils.HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/GetLoginImages");
                string responsebody = clt.MakeRequest("POST", "", HttpContentType.json).ResponseBody;
                JR.Data = responsebody;
                return JR;
            }
            catch (Exception EX)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }
        #endregion



        public ActionResult BlockAccount(string LoginData)
        {
            JsonResult JR = new JsonResult();
            try
            {
                HttpClient clt = new iAppUtils.HttpClient(ConfigurationManager.AppSettings["ServiceURL"] + "LoginService/BlockAccount");
                JR.Data = clt.MakeRequest("POST", LoginData, iAppUtils.HttpContentType.json).ResponseBody;

                if (JR.Data.ToString() == "FALSE")
                {
                }
                else if (JR.Data.ToString() == "404")
                {
                }
                else if (JR.Data.ToString() == "BLOCKED")
                {
                }
                else if (JR.Data.ToString() == "INACTIVE")
                {
                }
                else if (JR.Data.ToString() == "PasswordExpired")
                {
                    JObject JObj1 = JObject.Parse(LoginData);
                    UserProperties UP = new UserProperties();
                    UP.UserCode = JObj1["UserName"].ToString();
                    UP.Token = "EXPIRED";
                    Session["Token"] = "EXPIRED";
                    Session["UP"] = UP;

                    FormsAuthentication.SetAuthCookie(JObj1["UserName"].ToString(), false);

                }
                else
                {
                    JObject JObj = JObject.Parse(JR.Data.ToString());
                    JObject JObj1 = JObject.Parse(LoginData);
                    UserProperties UP = new UserProperties();

                    FormsAuthentication.SetAuthCookie(JObj1["UserName"].ToString(), false);

                    //string REM = (JObj1["RememberMe"]).ToString();

                    UP.UserCode = JObj["UserCode"].ToString().Trim();

                    Session["DisplayName"] = JObj["UserName"].ToString().Trim();

                    UP.UserName = JObj["UserName"].ToString().Trim();
                    UP.UserType = JObj["RoleName"].ToString().Trim();
                    UP.UserTypeCode = JObj["RoleCode"].ToString().Trim();
                    UP.SITEDETAIL_CODE = JObj["SITE_DETAIL_CODE"].ToString().Trim();
                    UP.COMPANYDETAIL_CODE = JObj["COMPANY_DETAIL_CODE"].ToString().Trim();

                    UP.UserStateCode = JObj["StateCode"].ToString().Trim();
                    UP.UserStateName = JObj["StateName"].ToString().Trim();
                    UP.UserZoneCode = JObj["ZoneCode"].ToString().Trim();
                    UP.UserZoneName = JObj["ZoneName"].ToString().Trim();


                    UP.Token = JObj["TOKEN"].ToString().Trim();
                    // UP.State = JObj["SalesRegion"].ToString().Trim();

                    Session["Token"] = JObj["TOKEN"].ToString().Trim();
                    Session["UP"] = UP;

                    Session["FirstLogin"] = JObj["FirstLogin"].ToString().Trim();
                    Session["UserRole"] = JObj["RoleCode"].ToString().Trim();

                    if (Session["UserRole"].ToString() == "STOCKIST")
                    {

                        Session["UnnatiEnrolledCustomer"] = JObj["UnnatiEnrolledCustomer"].ToString().Trim();
                        if (JObj["UnnatiEnrolledCustomer"].ToString().Trim() == "Yes")
                        {
                            Session["UnnatiEnrolledMembershipID"] = JObj["UnnatiEnrolledMembershipID"].ToString().Trim();
                            Session["UnnatiEnrolledCustomerZone"] = JObj["UnnatiEnrolledCustomerZone"].ToString().Trim();
                            Session["UnnatiEnrolledCustomerState"] = JObj["UnnatiEnrolledCustomerState"].ToString().Trim();
                            Session["UnnatiEnrolledCustomerDistrict"] = JObj["UnnatiEnrolledCustomerDistrict"].ToString().Trim();
                        }
                        else
                        {

                        }
                    }

                    // Storing in Local cookies
                    Response.Cookies["IPAddress"].Value = JObj1["IPAddress"].ToString();
                    Response.Cookies["Device"].Value = JObj1["Device"].ToString();
                    Response.Cookies["Browser"].Value = JObj1["Browser"].ToString();
                    Response.Cookies["TOKEN"].Value = JObj["TOKEN"].ToString();

                    Response.Cookies["IPAddress"].Expires = DateTime.Now.AddDays(30);
                    Response.Cookies["Device"].Expires = DateTime.Now.AddDays(30);
                    Response.Cookies["Browser"].Expires = DateTime.Now.AddDays(30);
                    Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(30);


                    // END


                    //if (REM == "True")
                    //{
                    //    Response.Cookies["UserName"].Value = JObj1["UserName"].ToString();
                    //    Response.Cookies["Password"].Value = JObj1["Password"].ToString();
                    //    Response.Cookies["UserName"].Expires = DateTime.Now.AddDays(30);
                    //    Response.Cookies["Password"].Expires = DateTime.Now.AddDays(30);
                    //}
                    //else
                    //{
                    //    Response.Cookies["UserName"].Expires = DateTime.Now.AddDays(-1);
                    //    Response.Cookies["Password"].Expires = DateTime.Now.AddDays(-1);

                    //}
                }

            }
            catch (Exception ex)
            {
                JR.Data = "FALSE";
            }
            return JR;
        }

    }
}
