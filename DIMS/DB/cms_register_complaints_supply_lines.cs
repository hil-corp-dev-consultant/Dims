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
    
    public partial class cms_register_complaints_supply_lines
    {
        public int LINE_ID { get; set; }
        public string PRODUCT_CODE { get; set; }
        public string INVOICE_NO { get; set; }
        public Nullable<System.DateTime> INVOICE_DATE { get; set; }
        public Nullable<int> QTY_SUPPLIED { get; set; }
        public string TRANSPORTER { get; set; }
        public string REMARKS { get; set; }
        public int ID { get; set; }
        public Nullable<double> SIZE { get; set; }
        public string batch_no { get; set; }
        public string DEFECT_TYPE_CODE { get; set; }
        public Nullable<int> BreakageQtyNos { get; set; }
    }
}
