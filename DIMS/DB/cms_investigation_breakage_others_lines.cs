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
    
    public partial class cms_investigation_breakage_others_lines
    {
        public int LINE_ID { get; set; }
        public string INVOICE_NO { get; set; }
        public Nullable<System.DateTime> INVOICE_DATE { get; set; }
        public string PRODUCT_DETAILS { get; set; }
        public Nullable<double> SUPPLIED_QTY { get; set; }
        public string TRANSPORTER { get; set; }
        public string COMPLAINT_DESCRIBED_SALES { get; set; }
        public string RECOVERY_POSSIABLE { get; set; }
        public string Attachments { get; set; }
        public string REMARKS { get; set; }
        public int ID { get; set; }
        public string OBSERVATION_BY_QFA { get; set; }
        public string PRODUCT_CODE { get; set; }
        public Nullable<double> SIZE { get; set; }
        public Nullable<double> BREAKAGE_QTY { get; set; }
        public string batch_no { get; set; }
        public Nullable<double> PLANT_NET_LOSS { get; set; }
        public string MATERIAL_BELONGS_TO_CODE { get; set; }
        public string PRODUCT_SUPPLIED_FROM_CODE { get; set; }
        public string DEFECT_TYPE_CODE { get; set; }
    }
}
