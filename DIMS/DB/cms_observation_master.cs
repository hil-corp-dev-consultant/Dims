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
    
    public partial class cms_observation_master
    {
        public int ID { get; set; }
        public string OBSERVATION_CODE { get; set; }
        public string OBSERVATION_NAME { get; set; }
        public string OBSERVATION_DESCRIPTION { get; set; }
        public string CREATED_BY { get; set; }
        public Nullable<System.DateTime> CREATED_DATE { get; set; }
        public Nullable<int> PRODUCT_CATEGORY_ID { get; set; }
        public string PRODUCT_CATEGORY_CODE { get; set; }
        public string PRODUCT_CATEGORY_NAME { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string LAST_ACTION { get; set; }
        public string ACTIVE { get; set; }
        public string REMARKS { get; set; }
        public Nullable<int> PRODUCT_TYPE_ID { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
        public string PRODUCT_TYPE_NAME { get; set; }
    }
}
