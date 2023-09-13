using DIMS.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DIMS.Controllers
{
    //VIKAS G, 3-1-2022 REQUIREMENT OF SECURITY ISSUES, Multiple Vulnerability in DIMS.HIL.IN START
    //[EnableThrottling(PerSecond = 2, PerMinute = 10, PerHour = 30, PerDay = 300)]
    public class InvoiceController : Controller
    {
        //
        // GET: /Invoice/

        public ActionResult StatementAccount()
        {
            return View();
        }
        public ActionResult StatementAccount1()
        {
            return View();
        }
    }
}
