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
    
    public partial class cms_survey_criteria_master
    {
        public int ID { get; set; }
        public string SURVEY_CRITERIA_CODE { get; set; }
        public string SURVEY_CRITERIA_NAME { get; set; }
        public string SURVEY_CRITERIA_DESCRIPTION { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string LAST_ACTION { get; set; }
        public string ACTIVE { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
        public string PRODUCT_CATEGORY_CODE { get; set; }
        public string BREAKAGE_CATEGORY_CODE { get; set; }
    }
}
