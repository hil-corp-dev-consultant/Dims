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
    
    public partial class cms_usermaster_producttype_lines
    {
        public int LINE_ID { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
        public int ID { get; set; }
        public string PRODUCT_CATEGORY_CODE { get; set; }
        public string USER_CODE { get; set; }
    
        public virtual cms_users cms_users { get; set; }
    }
}
