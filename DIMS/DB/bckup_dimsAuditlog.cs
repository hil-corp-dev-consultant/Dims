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
    
    public partial class bckup_dimsAuditlog
    {
        public int ID { get; set; }
        public string USER_CODE { get; set; }
        public string USER_NAME { get; set; }
        public string TOKEN { get; set; }
        public Nullable<System.DateTime> LOGIN_DATETIME { get; set; }
        public Nullable<System.DateTime> LOGOUT_DATETIME { get; set; }
        public string DEVICE_TYPE { get; set; }
        public string IPADDRESS { get; set; }
        public string BROWSER { get; set; }
    }
}
