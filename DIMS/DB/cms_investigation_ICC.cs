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
    
    public partial class cms_investigation_ICC
    {
        public int ID { get; set; }
        public string STATE_CODE { get; set; }
        public string COMPLAINT_TRACKING_NO { get; set; }
        public string INVESTIGATOR_TYPE_CODE { get; set; }
        public Nullable<System.DateTime> COMPLAINT_RECEIVED_DATE { get; set; }
        public string INVESTIGATION_DONE_BY_CODE { get; set; }
        public string DOC_SERIES_CODE { get; set; }
        public Nullable<System.DateTime> COMPLAINT_REGISTERED_DATE { get; set; }
        public Nullable<System.DateTime> VISITED_DATE { get; set; }
        public Nullable<System.DateTime> INVESTIGATION_DATE { get; set; }
        public Nullable<System.DateTime> COMPLAINT_ATTENDED_DATE { get; set; }
        public Nullable<System.DateTime> PREVIOUS_VISITED_DATE { get; set; }
        public string INVESTIGATION_STATUS { get; set; }
        public string DELAY_CHECK { get; set; }
        public Nullable<int> DELAY_DAYS { get; set; }
        public string DELAY_REASON { get; set; }
        public string SALES_REPRESENTATIVE_CODE { get; set; }
        public Nullable<System.DateTime> APPROVED_DATE { get; set; }
        public string NOTICE_TYPE { get; set; }
        public string ATTACHMENTS { get; set; }
        public string NATURE_OF_COMPLAINT { get; set; }
        public string OBSERVATIONS_BY_OFFICIAL { get; set; }
        public string REMARKS { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string COMPLAINT_REGISTERED_CODE { get; set; }
        public string COMPLAINT_REGISTERED_DOC_SERIES_CODE { get; set; }
        public Nullable<int> COMPLAINT_REGISTERED_DOC_NUM { get; set; }
        public string COMPLAIN_DESC { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
        public string CANCEL_REMARKS { get; set; }
        public Nullable<System.DateTime> CANCEL_DATE { get; set; }
        public string CANCEL_BY { get; set; }
        public string APPROVED_BY { get; set; }
        public string DOC_STATUS { get; set; }
        public string CUSTOMER_CODE { get; set; }
    }
}
