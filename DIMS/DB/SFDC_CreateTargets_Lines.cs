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
    
    public partial class SFDC_CreateTargets_Lines
    {
        public int ID { get; set; }
        public int HeaderId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeRoleDesignation { get; set; }
        public string OverallSalesVolumeTarget { get; set; }
        public string KeyStockistVolume { get; set; }
        public string NoofStockistBilled { get; set; }
        public string OverallCCSheetVolume { get; set; }
    
        public virtual SFDC_CreateTargets SFDC_CreateTargets { get; set; }
        public virtual SFDC_CreateTargets SFDC_CreateTargets1 { get; set; }
    }
}