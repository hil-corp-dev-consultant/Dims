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
    
    public partial class SFDC_CREATE_DAILY_ORDERs
    {
        public SFDC_CREATE_DAILY_ORDERs()
        {
            this.SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS = new HashSet<SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS>();
            this.SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS = new HashSet<SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS>();
            this.SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS1 = new HashSet<SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS>();
            this.SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS1 = new HashSet<SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS>();
        }
    
        public int ID { get; set; }
        public string DIMS_ORDER_NO { get; set; }
        public System.DateTime DIMS_ORDER_DATE { get; set; }
        public string SALES_ORDER_NUMBER { get; set; }
        public Nullable<System.DateTime> SALES_ORDER_DATE { get; set; }
        public string SALES_EMPLOYEE_CODE { get; set; }
        public string DELIVERY_SOURCE { get; set; }
        public string SALES_CO_ORDINATOR_CODE { get; set; }
        public string CUSTOMER_CODE { get; set; }
        public string RETAILER_CODE { get; set; }
        public Nullable<bool> CFROM_REQUIRED { get; set; }
        public Nullable<bool> PROJECT_CUSTOMER { get; set; }
        public string DELIVERY_TYPE { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string BILL_TO_ADDRESS { get; set; }
        public string SHIP_TO_ADDRESS { get; set; }
        public Nullable<double> CREDIT_LIMIT { get; set; }
        public Nullable<double> CURRENT_OUT_STANDING { get; set; }
        public string PRODUCT_CATEGORY_NAME { get; set; }
        public string PLANT_DEPO_NAME { get; set; }
        public string PLANT_DEPO_EMAIL { get; set; }
        public string ORDER_FROM { get; set; }
        public string ORDER_STATUS { get; set; }
    
        public virtual ICollection<SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS> SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS { get; set; }
        public virtual ICollection<SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS> SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS { get; set; }
        public virtual ICollection<SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS> SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS1 { get; set; }
        public virtual ICollection<SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS> SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS1 { get; set; }
    }
}
