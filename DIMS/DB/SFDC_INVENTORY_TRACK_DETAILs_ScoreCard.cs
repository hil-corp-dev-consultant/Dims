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
    
    public partial class SFDC_INVENTORY_TRACK_DETAILs_ScoreCard
    {
        public int ID { get; set; }
        public string CUSTOMER_CODE { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string CUSTOMER_TYPE { get; set; }
        public Nullable<double> CURRENT_STOCK_IN_HIL { get; set; }
        public Nullable<System.DateTime> LAST_UPDATED_DATE_AND_TIME { get; set; }
        public System.DateTime NEXT_VISIT_PLAN_DATETIME { get; set; }
        public string REGISTER_AVAILABLE { get; set; }
        public Nullable<double> AVERAGE_MONTHLY_SALE { get; set; }
        public Nullable<double> NO_OF_DAYS_OF_STOCK { get; set; }
        public string Created_By { get; set; }
        public string Journeyplan_Actual_Id { get; set; }
        public string Journeyplan_Id { get; set; }
    }
}
