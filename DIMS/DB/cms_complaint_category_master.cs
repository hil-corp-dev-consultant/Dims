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
    
    public partial class cms_complaint_category_master
    {
        public int ID { get; set; }
        public string COMPLAINT_CATEGORY_CODE { get; set; }
        public string COMPLAINT_CATEGORY_NAME { get; set; }
        public string COMPLAINT_CATEGORY_DESC { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string COMPLAINT_TYPE_CODE { get; set; }
        public string LAST_ACTION { get; set; }
        public string ACTIVE { get; set; }
        public Nullable<decimal> SALES_ORG { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
    }
}
