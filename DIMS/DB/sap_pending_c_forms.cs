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
    
    public partial class sap_pending_c_forms
    {
        public int ID { get; set; }
        public string CUSTOMER_CODE { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string ZONE { get; set; }
        public string STATE { get; set; }
        public string BUSINESS { get; set; }
        public string DOC_NO { get; set; }
        public string FINANCIAL_YEAR { get; set; }
        public Nullable<System.DateTime> BILL_DATE { get; set; }
        public string MONTH { get; set; }
        public string QUARTER { get; set; }
        public Nullable<decimal> TAXABLE_TURNOVER { get; set; }
        public string SOURCE_LOCATION { get; set; }
        public string STATUS { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public bool DEL_FLAG { get; set; }
        public string SAP_CODE { get; set; }
    }
}