using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using DIMS.Helpers;

namespace DIMS
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

            //var throttleFilter = new ThrottlingFilter
            //{
            //    Policy = new ThrottlePolicy(perSecond: 1, perMinute: 10, perHour: 60 * 10, perDay: 600 * 10)
            //    {
            //        IpThrottling = true
            //    },
            //    Repository = new CacheRepository()
            //};

            //filters.Add(throttleFilter);

        }
    }
}