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
    
    public partial class cms_corrective_root_causes_escape_lines
    {
        public int LINE_ID { get; set; }
        public string CAUSE_CODE { get; set; }
        public string CAUSE_NAME { get; set; }
        public string DESCRIPTION { get; set; }
        public string FINDINGS { get; set; }
        public string REMARKS { get; set; }
        public int ID { get; set; }
        public string RELATED_TO_CODE { get; set; }
        public string RELATED_TO_NAME { get; set; }
    
        public virtual cms_corrective_measures cms_corrective_measures { get; set; }
    }
}
