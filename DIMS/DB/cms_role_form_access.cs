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
    
    public partial class cms_role_form_access
    {
        public int ID { get; set; }
        public string ROLE_CODE { get; set; }
        public string FORM_CODE { get; set; }
        public Nullable<bool> IS_VIEW { get; set; }
        public Nullable<bool> IS_ADD { get; set; }
        public Nullable<bool> IS_UPDATE { get; set; }
        public Nullable<bool> IS_APPROVE { get; set; }
        public Nullable<bool> IS_EXPORT_TO_EXCEL { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
    }
}