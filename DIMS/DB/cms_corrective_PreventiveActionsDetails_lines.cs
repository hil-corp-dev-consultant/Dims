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
    
    public partial class cms_corrective_PreventiveActionsDetails_lines
    {
        public int LINE_ID { get; set; }
        public int ID { get; set; }
        public string ActionCode { get; set; }
        public string ActionName { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> TARGET_DATE { get; set; }
        public Nullable<System.DateTime> ACTUAL_DATE { get; set; }
        public string RelatedTo { get; set; }
        public string REMARKS { get; set; }
    }
}
