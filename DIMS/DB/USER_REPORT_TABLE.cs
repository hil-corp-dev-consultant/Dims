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
    
    public partial class USER_REPORT_TABLE
    {
        public int ID { get; set; }
        public string REPORT_NAME { get; set; }
        public string JSON_STRING { get; set; }
        public string QUERY { get; set; }
        public string USER_CODE { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
    }
}
