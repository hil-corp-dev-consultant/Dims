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
    
    public partial class cms_report_config
    {
        public int ID { get; set; }
        public string USER_CODE { get; set; }
        public int REPORT_ID { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string LAST_ACTION { get; set; }
        public string ACTIVE { get; set; }
    
        public virtual cms_reports cms_reports { get; set; }
    }
}
