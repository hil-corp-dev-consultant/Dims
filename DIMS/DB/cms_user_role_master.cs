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
    
    public partial class cms_user_role_master
    {
        public cms_user_role_master()
        {
            this.cms_userrole_producttype_lines = new HashSet<cms_userrole_producttype_lines>();
        }
    
        public int ID { get; set; }
        public string USER_ROLE_CODE { get; set; }
        public string USER_ROLE_NAME { get; set; }
        public string USER_ROLE_DESCRIPTION { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string LAST_ACTION { get; set; }
        public string ACTIVE { get; set; }
        public string REMARKS { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
        public string DEPARTMENT_CODE { get; set; }
        public string ACCESS_LEVEL { get; set; }
        public string STOCK_TRANSFER { get; set; }
    
        public virtual ICollection<cms_userrole_producttype_lines> cms_userrole_producttype_lines { get; set; }
    }
}
