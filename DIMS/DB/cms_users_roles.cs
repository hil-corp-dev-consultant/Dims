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
    
    public partial class cms_users_roles
    {
        public int ID { get; set; }
        public string ROLE_NAME { get; set; }
        public int USER_ID { get; set; }
        public string ACTIVE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
    
        public virtual cms_users cms_users { get; set; }
        public virtual cms_users cms_users1 { get; set; }
    }
}
