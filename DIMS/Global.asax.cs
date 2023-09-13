using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace DIMS
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static string SBU3_Code = "50002561";// the global variable'sfor sbu3
        protected void Application_Start()
        {
            try
            {
                ServicePointManager.SecurityProtocol = (SecurityProtocolType)16320;
            }
            catch (NotSupportedException ex1)
            {
                try
                {
                    ServicePointManager.SecurityProtocol = (SecurityProtocolType)4032;
                }
                catch (NotSupportedException ex2)
                {
                    try
                    {
                        ServicePointManager.SecurityProtocol = (SecurityProtocolType)960;
                    }
                    catch (NotSupportedException ex3)
                    {
                        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;
                    }
                }
            }
            //AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

         
        }
        //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
        protected void Application_PreSendRequestHeaders(object sender, EventArgs e)
        {
            HttpContext.Current.Response.Headers.Remove("X-Powered-By");
            HttpContext.Current.Response.Headers.Remove("X-AspNet-Version");
            HttpContext.Current.Response.Headers.Remove("X-AspNetMvc-Version");
            HttpContext.Current.Response.Headers.Remove("Server");
        }

        //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN END
    }
}