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
    
    public partial class cms_compensation_Approved_BU
    {
        public int ID { get; set; }
        public Nullable<int> TRACKING_NO { get; set; }
        public string CUSTOMER_CODE { get; set; }
        public Nullable<double> APPROVED_QUANTITY { get; set; }
        public Nullable<double> APPROVED_VALUE { get; set; }
        public Nullable<double> BILLED_QUANTITY { get; set; }
        public string SALES_EMP { get; set; }
        public Nullable<System.DateTime> APPROVED_DATE { get; set; }
        public string DOC_TYPE { get; set; }
        public string SizeRecomandation { get; set; }
        public string OtherSize { get; set; }
        public string ProductDivision { get; set; }
        public string PRODUCT_TYPE { get; set; }
    }
}
