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
    
    public partial class SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES
    {
        public int ID { get; set; }
        public int HEADER_ID { get; set; }
        public string SALES_EMPLOYEE_CODE { get; set; }
        public string PLAN_FOR_MONTH { get; set; }
        public string ACTUAL_VISITING_DATE { get; set; }
        public string SALES_DISTRICT { get; set; }
    
        public virtual SFDC_ADV_JOURNEY_PLAN_DETAILs SFDC_ADV_JOURNEY_PLAN_DETAILs { get; set; }
    }
}