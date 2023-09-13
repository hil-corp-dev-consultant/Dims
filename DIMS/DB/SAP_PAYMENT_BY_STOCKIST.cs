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
    
    public partial class SAP_PAYMENT_BY_STOCKIST
    {
        public int ID { get; set; }
        public long STOCKIST_ID { get; set; }
        public string STOCKIST_NAME { get; set; }
        public string SALES_EMPLOYEE { get; set; }
        public string ZONE { get; set; }
        public string STATE { get; set; }
        public string TERRITORY { get; set; }
        public string LOCATION { get; set; }
        public decimal AMOUNT_PAID { get; set; }
        public System.DateTime PAYMENT_DATE { get; set; }
        public long CHECK_FUND { get; set; }
        public string DOC_NO { get; set; }
        public string TYPE { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
    
        public virtual DimsUser DimsUser { get; set; }
    }
}
