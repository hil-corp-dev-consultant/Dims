//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DIMS.DB
{
    using System;
    using System.Collections.Generic;
    
    public partial class REPORT_PROJECT_DISCOUNT_WITH_COMMISSION
    {
        public int ID { get; set; }
        public string REQUSET_CREATEDBY { get; set; }
        public string DISCOUNTID { get; set; }
        public string STOCKIST_CODE { get; set; }
        public string STOCKIST_NAME { get; set; }
        public string DISTRICT { get; set; }
        public string STATE { get; set; }
        public string ZONE { get; set; }
        public Nullable<System.DateTime> CREATED_DATE { get; set; }
        public Nullable<double> AGREED_RATE_INR { get; set; }
        public Nullable<double> COMMISSION { get; set; }
        public Nullable<double> EXPECTED_SALE { get; set; }
        public Nullable<double> EXPECTED_NSR { get; set; }
        public Nullable<int> REQUEST_STATUS { get; set; }
        public string DESCRIPTION { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string CUSTOMER_CODE { get; set; }
        public string CUSTMER_NAME { get; set; }
        public string REQUESTBY_CODE_NAME { get; set; }
        public Nullable<double> PriceCardrate { get; set; }
    }
}
