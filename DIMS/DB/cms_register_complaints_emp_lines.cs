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
    
    public partial class cms_register_complaints_emp_lines
    {
        public int LINE_ID { get; set; }
        public string USER_ROLE { get; set; }
        public string USER_CODE { get; set; }
        public string EMPLOYEE_CODE { get; set; }
        public string REMARKS { get; set; }
        public int ID { get; set; }
    
        public virtual cms_register_complaints cms_register_complaints { get; set; }
    }
}
