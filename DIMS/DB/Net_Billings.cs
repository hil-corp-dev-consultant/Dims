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
    
    public partial class Net_Billings
    {
        public Net_Billings()
        {
            this.Net_Billings_Status = new HashSet<Net_Billings_Status>();
        }
    
        public int Id { get; set; }
        public string Net_Billing_Id { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime Created_Date { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string Zone { get; set; }
        public string Customer_Code { get; set; }
        public string Customer_Name { get; set; }
        public System.DateTime Net_Billing_Valid_From { get; set; }
        public System.DateTime Net_Billing_Valid_To { get; set; }
        public double Net_Billing_Rate { get; set; }
        public Nullable<double> Expected_Sale { get; set; }
        public double Price_card_Rate { get; set; }
        public double Expected_Nsr { get; set; }
        public string Description { get; set; }
        public string Created_Name { get; set; }
    
        public virtual ICollection<Net_Billings_Status> Net_Billings_Status { get; set; }
    }
}
