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
    
    public partial class NOTIFICATION
    {
        public int ID { get; set; }
        public string SEND_FROM { get; set; }
        public string SUBJECT { get; set; }
        public string MESSAGE_BODY { get; set; }
        public string EMPLOYEE_CODE { get; set; }
        public string FSO_CONCERNED { get; set; }
        public string COMPLAINT_CUSTOMER_CODE { get; set; }
        public string EMPLOYEE_STATE { get; set; }
        public string EMPLOYEE_ZONE { get; set; }
        public System.DateTime NOTIFICATION_DATE { get; set; }
        public string CREATED_BY { get; set; }
        public Nullable<System.DateTime> CREATED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string READ_UNREAD { get; set; }
        public string ROLE_CODE { get; set; }
        public string MODULE_NAME { get; set; }
    }
}