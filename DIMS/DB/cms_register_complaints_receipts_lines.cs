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
    
    public partial class cms_register_complaints_receipts_lines
    {
        public int LINE_ID { get; set; }
        public string PRODUCT_CODE { get; set; }
        public string INVOICE_NO { get; set; }
        public Nullable<System.DateTime> INVOICE_DATE { get; set; }
        public string batch_no { get; set; }
        public Nullable<int> Received_Qty { get; set; }
        public Nullable<int> Defective_Qty { get; set; }
        public string DEFECT_TYPE_CODE { get; set; }
        public string REMARKS { get; set; }
        public int ID { get; set; }
        public Nullable<double> SIZE { get; set; }
        public Nullable<double> GROSS_WEIGHT { get; set; }
        public string TYPE_OF_DEFECT { get; set; }
    
        public virtual cms_register_complaints cms_register_complaints { get; set; }
    }
}