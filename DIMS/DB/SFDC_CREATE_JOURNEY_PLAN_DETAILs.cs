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
    
    public partial class SFDC_CREATE_JOURNEY_PLAN_DETAILs
    {
        public SFDC_CREATE_JOURNEY_PLAN_DETAILs()
        {
            this.SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs = new HashSet<SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs>();
            this.SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs1 = new HashSet<SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs>();
            this.SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs = new HashSet<SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs>();
            this.SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs1 = new HashSet<SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs>();
        }
    
        public int ID { get; set; }
        public string JOURNEY_PLAN_NAME { get; set; }
        public string SALES_EMPLOYEE_CODE { get; set; }
        public string PLAN_FOR_MONTH { get; set; }
        public System.DateTime PLAN_CREATED_DATE { get; set; }
        public string STATUS { get; set; }
        public System.DateTime VISIT_PLANED_DATE { get; set; }
        public System.DateTime ACTUAL_VISIT_DATE { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
    
        public virtual ICollection<SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs> SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs { get; set; }
        public virtual ICollection<SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs> SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs1 { get; set; }
        public virtual ICollection<SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs> SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs { get; set; }
        public virtual ICollection<SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs> SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs1 { get; set; }
    }
}
