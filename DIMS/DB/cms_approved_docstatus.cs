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
    
    public partial class cms_approved_docstatus
    {
        public int APP_LIST_ID { get; set; }
        public int ID { get; set; }
        public string DOC_NUM { get; set; }
        public string DOC_STATUS { get; set; }
        public string ORIGINATOR { get; set; }
        public Nullable<System.DateTime> ORIGINATED_ON { get; set; }
        public string DOC_CODE { get; set; }
        public string APPROVER { get; set; }
        public string ACTION_PERFORM { get; set; }
        public Nullable<System.DateTime> ACTION_ON { get; set; }
        public string DOC_SERIES_CODE { get; set; }
        public string REMARKS { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string INACTIVE { get; set; }
        public string ORIGIN_REMARKS { get; set; }
        public Nullable<int> STAGE { get; set; }
        public string REJECTED { get; set; }
        public string ACTION_FLAG { get; set; }
        public string PROCESS_INSTANCE { get; set; }
        public Nullable<int> VERSION { get; set; }
        public Nullable<int> WF_ID { get; set; }
        public Nullable<int> DRAFT_NUM { get; set; }
        public Nullable<int> COMPLAINT_NO { get; set; }
        public Nullable<int> COMPLAINT_ID { get; set; }
        public int CMPL_MNGMT_ID { get; set; }
    }
}
