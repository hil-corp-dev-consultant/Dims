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
    
    public partial class Freight_Upload
    {
        public int Id { get; set; }
        public string PlantName { get; set; }
        public string PlantCode { get; set; }
        public string StorageLocation { get; set; }
        public Nullable<decimal> ExciseDutyRate { get; set; }
        public Nullable<decimal> DepotExpenses { get; set; }
        public Nullable<decimal> Freight { get; set; }
    }
}