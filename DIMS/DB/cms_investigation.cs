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
    
    public partial class cms_investigation
    {
        public cms_investigation()
        {
            this.cms_investigation_breakage_sheeting_lines = new HashSet<cms_investigation_breakage_sheeting_lines>();
            this.cms_investigation_observations_lines = new HashSet<cms_investigation_observations_lines>();
            this.cms_investigation_msf = new HashSet<cms_investigation_msf>();
        }
    
        public int ID { get; set; }
        public System.DateTime COMPLAINT_RECEIVED_DATE { get; set; }
        public string COMPLAINT_NUMBER { get; set; }
        public string CUSTOMER_REMARKS { get; set; }
        public string REMARKS { get; set; }
        public string ObservationByQAF { get; set; }
        public string NatureOfComplaint { get; set; }
        public string EMPLOYEE_CODE { get; set; }
        public string INVESTIGATOR_TYPE_CODE { get; set; }
        public Nullable<System.DateTime> VISITED_DATE { get; set; }
        public Nullable<System.DateTime> PREVIOUS_VISITED_DATE { get; set; }
        public string Product_Category_Code { get; set; }
        public string Product_Code { get; set; }
        public string Customer_Code { get; set; }
        public string Customer_type_Code { get; set; }
        public string Project_Party { get; set; }
        public string cusomer_location { get; set; }
        public string Customer_Address { get; set; }
        public string Phone_Number { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string ZONE_CODE { get; set; }
        public string AREA_CODE { get; set; }
        public string PLANT_CODE { get; set; }
        public string DEPO_CODE { get; set; }
        public string STATE_CODE { get; set; }
        public string Observations_by_Investigator { get; set; }
        public string SUPPLIER_TYPE_CODE { get; set; }
        public string Supplied_From_Name { get; set; }
        public Nullable<System.DateTime> Date_Supply_From { get; set; }
        public string Invoice_Based { get; set; }
        public string Observations_by_official { get; set; }
        public string CREATED_BY { get; set; }
        public System.DateTime CREATED_DATE { get; set; }
        public string SITEDETAIL_CODE { get; set; }
        public string COMPANYDETAIL_CODE { get; set; }
        public string MODIFIED_BY { get; set; }
        public Nullable<System.DateTime> MODIFIED_DATE { get; set; }
        public string LAST_ACTION { get; set; }
        public string ACTIVE { get; set; }
        public Nullable<int> DRAFT_NUM { get; set; }
        public Nullable<int> DOC_NUM { get; set; }
        public string DOC_SERIES_CODE { get; set; }
        public Nullable<System.DateTime> DOC_DATE { get; set; }
        public string DOC_STATUS { get; set; }
        public Nullable<System.DateTime> APPROVED_DATE { get; set; }
        public string complaint_register_code { get; set; }
        public string complaint_register_doc_Series { get; set; }
        public Nullable<int> complaint_register_doc_num { get; set; }
        public string COMPLAIN_DESC { get; set; }
        public string CONTACT_PERSON { get; set; }
        public Nullable<System.DateTime> COMPLAINED_REGISTER_DATE { get; set; }
        public Nullable<System.DateTime> COMPLAINED_ATTENDED_DATE { get; set; }
        public string FREQUENCY_BASED { get; set; }
        public Nullable<System.DateTime> Date_Supply_To { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public Nullable<double> Total_Breakage { get; set; }
        public Nullable<double> Total_Recovery { get; set; }
        public Nullable<double> Net_Loss { get; set; }
        public Nullable<int> DELAY_DAYS { get; set; }
        public string DELAY_REASON { get; set; }
        public string DELAY_CHECK { get; set; }
        public string PRODUCT_TYPE_CODE { get; set; }
        public string CITY_CODE { get; set; }
        public Nullable<double> TOTAL_BREAKAGE_TONS { get; set; }
        public Nullable<double> TOTAL_RECOVERY_TONS { get; set; }
        public Nullable<double> NET_LOSS_TONS { get; set; }
        public string COMPLAINT_TYPE_CODE { get; set; }
        public string COMPLAINT_CATEGORY_CODE { get; set; }
        public string MATERIAL_BELONGS_TO_CODE { get; set; }
        public string STOCKIEST_CODE { get; set; }
        public string SUB_STOCKIEST { get; set; }
        public string MULTIPLE_INVOICE { get; set; }
        public string ALL_INVOICE_NO { get; set; }
        public string ALL_INVOICE_DATE { get; set; }
        public string END_CUSTOMER_DETAILS { get; set; }
        public Nullable<double> TOTAL_SUPPLY { get; set; }
        public Nullable<double> TOTAL_SUPPLY_TON { get; set; }
        public string COMPLAINT_DESC_SALES { get; set; }
        public string CANCEL_REMARKS { get; set; }
        public Nullable<System.DateTime> CANCEL_DATE { get; set; }
        public string CANCEL_BY { get; set; }
        public string MESSAGE_TYPE { get; set; }
        public string COMPLAINT_TRACKING_NO { get; set; }
        public string SITE_ADDRESS { get; set; }
        public string ProductDetails { get; set; }
        public string InvoiceDetails { get; set; }
        public string NoticeType { get; set; }
        public string SALES_REPRESENTATIVE_CODE { get; set; }
        public string Investigation_Done_By_CODE { get; set; }
        public string APPROVED_BY { get; set; }
        public string ATTACHMENTS { get; set; }
        public string COMPENSATION_MODE_CODE { get; set; }
        public Nullable<double> COMPENSATION_IN_METERS_SHEET { get; set; }
        public Nullable<double> COMPENSATION_IN_TONS { get; set; }
        public string COMPENSATION_IN__METER_WORDS_SHEET { get; set; }
        public Nullable<double> RECOMMENDED_SIZE { get; set; }
        public Nullable<double> OTHER_SIZE { get; set; }
        public Nullable<int> COMPENSATION_IN_NO { get; set; }
        public string COMPENSATION_IN_WORD { get; set; }
        public string COMPENSATION_IN_METER_OTHER { get; set; }
        public Nullable<double> COMPENSATION_IN_CUBIC_METER { get; set; }
        public string ISSUE_CREDIT_NOTE { get; set; }
        public Nullable<double> AMOUNT_CREDITED { get; set; }
        public string COMMENTS_APPROVALS_SALES_OTHERS { get; set; }
        public string party_type { get; set; }
        public string SubStockiest_Code { get; set; }
        public string SubStockiest_Name { get; set; }
        public string SubStockiest_Address { get; set; }
        public string SubStockiest_Number { get; set; }
        public Nullable<int> COMPLAINT_TYPE { get; set; }
        public Nullable<int> is_rejectable { get; set; }
        public string CREATED_IN { get; set; }
    
        public virtual ICollection<cms_investigation_breakage_sheeting_lines> cms_investigation_breakage_sheeting_lines { get; set; }
        public virtual ICollection<cms_investigation_observations_lines> cms_investigation_observations_lines { get; set; }
        public virtual ICollection<cms_investigation_msf> cms_investigation_msf { get; set; }
    }
}
