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
    
    public partial class Project_Discount_Direct_Billings_Status
    {
        public string Billing_Id { get; set; }
        public string Status { get; set; }
        public int Id { get; set; }
    
        public virtual Project_Discount_Direct_Billings Project_Discount_Direct_Billings { get; set; }
    }
}