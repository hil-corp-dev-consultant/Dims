using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DIMS.Models
{
    public class UserProperties
    {
        public string UserCode { set; get; }
        public string UserName { set; get; }
        public string Token { set; get; }
        public string UserType { set; get; }
        public string UserTypeCode { set; get; }
        public string COMPANYDETAIL_CODE { set; get; }
        public string SITEDETAIL_CODE { set; get; }

        public string UserStateCode { set; get; }
        public string UserStateName { set; get; }

        public string UserZoneCode { set; get; }
        public string UserZoneName { set; get; }

        //public string State { get; set; }

        public string SAP_DashboardAccess { get; set; }

        //svprasadk 17-06-2020 SBU 1 requirement to bulk assign complaints start
        public string USER_PRODUCT_TYPE_CODE { set; get; }
        //svprasadk 17-06-2020 SBU 1 requirement to bulk assign complaints end

    }
}