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
    
    public partial class SFDC_ADV_JOURNEY_PLAN_DETAILs
    {
        public SFDC_ADV_JOURNEY_PLAN_DETAILs()
        {
            this.SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES = new HashSet<SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES>();
            this.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs = new HashSet<SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs>();
            this.SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs1 = new HashSet<SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs>();
        }
    
        public int ID { get; set; }
        public string JOURNEY_PLAN_NAME { get; set; }
        public string SALES_EMPLOYEE_CODE { get; set; }
        public string PLAN_FOR_MONTH { get; set; }
        public System.DateTime PLAN_CREATED_DATE { get; set; }
        public string STATUS { get; set; }
        public string VISIT_PLANED_COUNT { get; set; }
        public string ACTUAL_VISIT_COUNT { get; set; }
        public string VISIT_PLANED_DISTRICT_COUNT { get; set; }
        public string ACTUAL_VISIT_DISTRICT_COUNT { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public Nullable<System.DateTime> REPORTER_MODIFIED_DATE { get; set; }
    
        public virtual ICollection<SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES> SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES { get; set; }
        public virtual ICollection<SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs> SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs { get; set; }
        public virtual ICollection<SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs> SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs1 { get; set; }
    }
}