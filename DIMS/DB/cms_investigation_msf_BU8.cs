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
    
    public partial class cms_investigation_msf_BU8
    {
        public int LINE_ID { get; set; }
        public int ID { get; set; }
        public string ProdCode { get; set; }
        public string PlantCode { get; set; }
        public string SuppTypeCode { get; set; }
        public string SuppNameCode { get; set; }
        public string UOM { get; set; }
        public Nullable<double> SupplyQty { get; set; }
        public Nullable<double> DefQty { get; set; }
        public Nullable<double> ActDftQty { get; set; }
    }
}
