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
    
    public partial class cms_complaint_assign_STO
    {
        public int ID { get; set; }
        public Nullable<int> COMPLAINT_TRACKING_NO { get; set; }
        public string DOC_SERIES_CODE { get; set; }
        public string USER_ROLE_CODE { get; set; }
        public string USER_ROLE_NAME { get; set; }
        public string USER_CODE { get; set; }
        public string USER_NAME { get; set; }
        public Nullable<System.DateTime> COMPLAINT_DATE { get; set; }
        public string CREATED_BY { get; set; }
        public Nullable<System.DateTime> CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
    }
}
