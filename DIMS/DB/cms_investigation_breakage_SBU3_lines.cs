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
    
    public partial class cms_investigation_breakage_SBU3_lines
    {
        public int LINE_ID { get; set; }
        public int ID { get; set; }
        public string PROD_CODE { get; set; }
        public string PROD_NAME { get; set; }
        public string INVOICE_NO { get; set; }
        public Nullable<System.DateTime> INVOICE_DATE { get; set; }
        public string BATCHNO { get; set; }
        public Nullable<double> SUPPLIED_QTY { get; set; }
        public Nullable<double> DEFECT_QTY { get; set; }
        public Nullable<double> ACT_DEFECT_QTY { get; set; }
        public string TRANSPORTER { get; set; }
        public string REMARKS { get; set; }
        public string DEFECT_TYPE_CODE { get; set; }
        public string DEFECT_TYPE_NAME { get; set; }
    }
}
