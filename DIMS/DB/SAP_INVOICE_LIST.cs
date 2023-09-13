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
    
    public partial class SAP_INVOICE_LIST
    {
        public int ID { get; set; }
        public long BILLING_DOC_NO { get; set; }
        public System.DateTime INVOICE_DATE { get; set; }
        public string TOTAL_INVOICE_VALUE { get; set; }
        public string STOCKIST_PRICING_GROUP { get; set; }
        public string PLANT_DESCRIPTION { get; set; }
        public string MATERIAL_CODE { get; set; }
        public string MATERIAL_DESC { get; set; }
        public decimal BILL_QTY { get; set; }
        public string GROSS_WEIGHT_MT { get; set; }
        public string BILL_TO_PARTY_CODE { get; set; }
        public string BILL_TO_PARTY_NAME { get; set; }
        public string SHIP_TO_PARTY_CODE { get; set; }
        public string SHIP_TO_PARTY_NAME { get; set; }
        public string AGENT_CODE { get; set; }
        public string AGENT_NAME { get; set; }
        public string SALES_EMPLOYEE { get; set; }
        public long EXCISE_INV_NO { get; set; }
        public string TRANSPORTER_NAME { get; set; }
        public string VEHICLE_NO { get; set; }
        public string DRIVER_MOB_NO { get; set; }
        public Nullable<System.DateTime> MATERIAL_RECEIPT_DATE { get; set; }
        public string STOCKIST_REMARK { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
    
        public virtual DimsUser DimsUser { get; set; }
    }
}