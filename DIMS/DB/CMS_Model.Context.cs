﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class cmsEntities : DbContext
    {
        public cmsEntities()
            : base("name=cmsEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<BACKUP_06292017_sap_outstanding_details> BACKUP_06292017_sap_outstanding_details { get; set; }
        public DbSet<Backup_20_7_2017> Backup_20_7_2017 { get; set; }
        public DbSet<Bak_dims_sync_log> Bak_dims_sync_log { get; set; }
        public DbSet<Bak_dimsusersliginlog> Bak_dimsusersliginlog { get; set; }
        public DbSet<Bak_sapinvoicelist> Bak_sapinvoicelist { get; set; }
        public DbSet<Bak_sappaymentbystockist> Bak_sappaymentbystockist { get; set; }
        public DbSet<Bak_sappendingcforms> Bak_sappendingcforms { get; set; }
        public DbSet<Bak_userdefaultreporttable> Bak_userdefaultreporttable { get; set; }
        public DbSet<Bak_userreporttable> Bak_userreporttable { get; set; }
        public DbSet<bck_sap_invoice_header_data_010916_1900> bck_sap_invoice_header_data_010916_1900 { get; set; }
        public DbSet<bck_sap_invoice_item_data_010916_1900> bck_sap_invoice_item_data_010916_1900 { get; set; }
        public DbSet<bckup_dimsAuditlog> bckup_dimsAuditlog { get; set; }
        public DbSet<cms_approved_docstatus> cms_approved_docstatus { get; set; }
        public DbSet<cms_area_master> cms_area_master { get; set; }
        public DbSet<cms_breakage_categeory_master> cms_breakage_categeory_master { get; set; }
        public DbSet<cms_cause_master> cms_cause_master { get; set; }
        public DbSet<cms_city> cms_city { get; set; }
        public DbSet<cms_colour_for_cc_sheet> cms_colour_for_cc_sheet { get; set; }
        public DbSet<cms_communicateNote_sequence> cms_communicateNote_sequence { get; set; }
        public DbSet<cms_compensation> cms_compensation { get; set; }
        public DbSet<cms_compensation_Approved> cms_compensation_Approved { get; set; }
        public DbSet<cms_compensation_breakage_others_lines> cms_compensation_breakage_others_lines { get; set; }
        public DbSet<cms_compensation_breakage_sheeting_lines> cms_compensation_breakage_sheeting_lines { get; set; }
        public DbSet<cms_compensation_CCSheets> cms_compensation_CCSheets { get; set; }
        public DbSet<cms_compensation_mode_master> cms_compensation_mode_master { get; set; }
        public DbSet<cms_compensation_msf> cms_compensation_msf { get; set; }
        public DbSet<cms_compensation_msf_BU3> cms_compensation_msf_BU3 { get; set; }
        public DbSet<cms_compensation_recommendation_lines> cms_compensation_recommendation_lines { get; set; }
        public DbSet<cms_compensation_recommlines_BU3> cms_compensation_recommlines_BU3 { get; set; }
        public DbSet<cms_compensation_supply_details_BU3> cms_compensation_supply_details_BU3 { get; set; }
        public DbSet<cms_complain_assign> cms_complain_assign { get; set; }
        public DbSet<cms_complaint_category_master> cms_complaint_category_master { get; set; }
        public DbSet<cms_complaint_mode_master> cms_complaint_mode_master { get; set; }
        public DbSet<cms_complaint_priority_master> cms_complaint_priority_master { get; set; }
        public DbSet<cms_complaint_severity_master> cms_complaint_severity_master { get; set; }
        public DbSet<cms_complaint_stage_master> cms_complaint_stage_master { get; set; }
        public DbSet<CMS_COMPLAINT_STATUS> CMS_COMPLAINT_STATUS { get; set; }
        public DbSet<cms_complaint_type_master> cms_complaint_type_master { get; set; }
        public DbSet<cms_control_measures_master> cms_control_measures_master { get; set; }
        public DbSet<cms_corrective_action_master> cms_corrective_action_master { get; set; }
        public DbSet<cms_corrective_chosen_permanent_lines> cms_corrective_chosen_permanent_lines { get; set; }
        public DbSet<cms_corrective_emergency_response_lines> cms_corrective_emergency_response_lines { get; set; }
        public DbSet<cms_corrective_implement_permanent_lines> cms_corrective_implement_permanent_lines { get; set; }
        public DbSet<cms_corrective_ImplementedCorrectiveActionDetails_lines> cms_corrective_ImplementedCorrectiveActionDetails_lines { get; set; }
        public DbSet<cms_corrective_interim_containment_lines> cms_corrective_interim_containment_lines { get; set; }
        public DbSet<cms_corrective_measures> cms_corrective_measures { get; set; }
        public DbSet<cms_corrective_measures_msf> cms_corrective_measures_msf { get; set; }
        public DbSet<cms_corrective_observations_lines> cms_corrective_observations_lines { get; set; }
        public DbSet<cms_corrective_PreventiveActionsDetails_lines> cms_corrective_PreventiveActionsDetails_lines { get; set; }
        public DbSet<cms_corrective_root_causes_escape_lines> cms_corrective_root_causes_escape_lines { get; set; }
        public DbSet<cms_corrective_team_involved_lines> cms_corrective_team_involved_lines { get; set; }
        public DbSet<cms_corrective_verification_lines> cms_corrective_verification_lines { get; set; }
        public DbSet<cms_corrective_VerificationPreventiveActionsDetails_lines> cms_corrective_VerificationPreventiveActionsDetails_lines { get; set; }
        public DbSet<cms_country> cms_country { get; set; }
        public DbSet<cms_defect_type_master> cms_defect_type_master { get; set; }
        public DbSet<cms_department> cms_department { get; set; }
        public DbSet<cms_depo_master> cms_depo_master { get; set; }
        public DbSet<cms_dimensions_for_ac_sheet> cms_dimensions_for_ac_sheet { get; set; }
        public DbSet<cms_dimensions_for_cc_sheet> cms_dimensions_for_cc_sheet { get; set; }
        public DbSet<cms_dimentions_for_division> cms_dimentions_for_division { get; set; }
        public DbSet<cms_documentmaster> cms_documentmaster { get; set; }
        public DbSet<cms_documentseries> cms_documentseries { get; set; }
        public DbSet<cms_employee_customer_configuration> cms_employee_customer_configuration { get; set; }
        public DbSet<cms_employee_role_configuration> cms_employee_role_configuration { get; set; }
        public DbSet<cms_employeemaster> cms_employeemaster { get; set; }
        public DbSet<cms_employeetype> cms_employeetype { get; set; }
        public DbSet<cms_form_action_master> cms_form_action_master { get; set; }
        public DbSet<cms_form_master> cms_form_master { get; set; }
        public DbSet<cms_investigation> cms_investigation { get; set; }
        public DbSet<cms_investigation_breakage_inspection_sheet> cms_investigation_breakage_inspection_sheet { get; set; }
        public DbSet<cms_investigation_breakage_others_lines> cms_investigation_breakage_others_lines { get; set; }
        public DbSet<cms_investigation_breakage_SBU3_lines> cms_investigation_breakage_SBU3_lines { get; set; }
        public DbSet<cms_investigation_breakage_sheeting_lines> cms_investigation_breakage_sheeting_lines { get; set; }
        public DbSet<cms_investigation_invoice_lines> cms_investigation_invoice_lines { get; set; }
        public DbSet<cms_investigation_msf> cms_investigation_msf { get; set; }
        public DbSet<cms_investigation_msf_BU3> cms_investigation_msf_BU3 { get; set; }
        public DbSet<cms_investigation_observations_lines> cms_investigation_observations_lines { get; set; }
        public DbSet<cms_investigation_site_observations_sheet_lines> cms_investigation_site_observations_sheet_lines { get; set; }
        public DbSet<cms_investigator_type_master> cms_investigator_type_master { get; set; }
        public DbSet<cms_location_master> cms_location_master { get; set; }
        public DbSet<cms_log_string> cms_log_string { get; set; }
        public DbSet<cms_master_config> cms_master_config { get; set; }
        public DbSet<cms_menu> cms_menu { get; set; }
        public DbSet<cms_menu_view> cms_menu_view { get; set; }
        public DbSet<cms_observation_master> cms_observation_master { get; set; }
        public DbSet<cms_organization_level> cms_organization_level { get; set; }
        public DbSet<cms_plant_for_product_master> cms_plant_for_product_master { get; set; }
        public DbSet<cms_plant_master> cms_plant_master { get; set; }
        public DbSet<cms_plant_producttype_lines> cms_plant_producttype_lines { get; set; }
        public DbSet<cms_preventive_action_master> cms_preventive_action_master { get; set; }
        public DbSet<cms_preventive_lines> cms_preventive_lines { get; set; }
        public DbSet<cms_preventive_verification_lines> cms_preventive_verification_lines { get; set; }
        public DbSet<cms_print_upload> cms_print_upload { get; set; }
        public DbSet<cms_problem_master> cms_problem_master { get; set; }
        public DbSet<cms_problemimpact_master> cms_problemimpact_master { get; set; }
        public DbSet<cms_product_category_master> cms_product_category_master { get; set; }
        public DbSet<cms_product_master> cms_product_master { get; set; }
        public DbSet<cms_product_type_master> cms_product_type_master { get; set; }
        public DbSet<cms_recovery_type_master> cms_recovery_type_master { get; set; }
        public DbSet<cms_register_complaints> cms_register_complaints { get; set; }
        public DbSet<cms_register_complaints_emp_lines> cms_register_complaints_emp_lines { get; set; }
        public DbSet<cms_register_complaints_msf> cms_register_complaints_msf { get; set; }
        public DbSet<cms_register_complaints_receipts_lines> cms_register_complaints_receipts_lines { get; set; }
        public DbSet<cms_register_complaints_supply_lines> cms_register_complaints_supply_lines { get; set; }
        public DbSet<cms_report_config> cms_report_config { get; set; }
        public DbSet<cms_reports> cms_reports { get; set; }
        public DbSet<cms_response_action_master> cms_response_action_master { get; set; }
        public DbSet<cms_role_form_access> cms_role_form_access { get; set; }
        public DbSet<cms_sales_for_product_master> cms_sales_for_product_master { get; set; }
        public DbSet<cms_sales_representative> cms_sales_representative { get; set; }
        public DbSet<cms_size_for_ac_sheet> cms_size_for_ac_sheet { get; set; }
        public DbSet<cms_state> cms_state { get; set; }
        public DbSet<cms_supplier_type_master> cms_supplier_type_master { get; set; }
        public DbSet<cms_survey_criteria_master> cms_survey_criteria_master { get; set; }
        public DbSet<cms_thickness_for_cc_sheet> cms_thickness_for_cc_sheet { get; set; }
        public DbSet<cms_units_for_product_master> cms_units_for_product_master { get; set; }
        public DbSet<cms_unitsofmesaurement> cms_unitsofmesaurement { get; set; }
        public DbSet<cms_user_role_master> cms_user_role_master { get; set; }
        public DbSet<cms_usermaster_producttype_lines> cms_usermaster_producttype_lines { get; set; }
        public DbSet<cms_userrole_producttype_lines> cms_userrole_producttype_lines { get; set; }
        public DbSet<cms_users> cms_users { get; set; }
        public DbSet<cms_users_auth> cms_users_auth { get; set; }
        public DbSet<cms_users_roles> cms_users_roles { get; set; }
        public DbSet<cms_work_flow_users> cms_work_flow_users { get; set; }
        public DbSet<cms_workflow_approverlist> cms_workflow_approverlist { get; set; }
        public DbSet<cms_zone_master> cms_zone_master { get; set; }
        public DbSet<cms_zone_state_mapping> cms_zone_state_mapping { get; set; }
        public DbSet<COLUMN_MAPPING> COLUMN_MAPPING { get; set; }
        public DbSet<creditdebit_13072016> creditdebit_13072016 { get; set; }
        public DbSet<DailySalesTrackerEmail> DailySalesTrackerEmails { get; set; }
        public DbSet<DIMS_EmployeeDetails> DIMS_EmployeeDetails { get; set; }
        public DbSet<DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION> DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION { get; set; }
        public DbSet<DIMS_PARTNER_ISSUE_HISTORYs> DIMS_PARTNER_ISSUE_HISTORYs { get; set; }
        public DbSet<DIMS_SFDC_PARTNER_ISSUE> DIMS_SFDC_PARTNER_ISSUE { get; set; }
        public DbSet<dims_sync_audit_log> dims_sync_audit_log { get; set; }
        public DbSet<Dims_UserLoginImages> Dims_UserLoginImages { get; set; }
        public DbSet<DimsSystemConfiguration> DimsSystemConfigurations { get; set; }
        public DbSet<DimsUser> DimsUsers { get; set; }
        public DbSet<DimsUsersLoginAuditLog> DimsUsersLoginAuditLogs { get; set; }
        public DbSet<Discount_Structure_Status> Discount_Structure_Status { get; set; }
        public DbSet<Discount_Structures> Discount_Structures { get; set; }
        public DbSet<dummy> dummies { get; set; }
        public DbSet<Freight_Upload> Freight_Upload { get; set; }
        public DbSet<GET_CSO_ROLES> GET_CSO_ROLES { get; set; }
        public DbSet<HIL_ZONAL_COORDINATORS> HIL_ZONAL_COORDINATORS { get; set; }
        public DbSet<Net_Billings> Net_Billings { get; set; }
        public DbSet<Net_Billings_Status> Net_Billings_Status { get; set; }
        public DbSet<New_cms_zone_state_mapping> New_cms_zone_state_mapping { get; set; }
        public DbSet<NOTIFICATION> NOTIFICATIONs { get; set; }
        public DbSet<PartnerIssues_Email_Configurations> PartnerIssues_Email_Configurations { get; set; }
        public DbSet<payment_terms_master> payment_terms_master { get; set; }
        public DbSet<Pricing_Card_Rates> Pricing_Card_Rates { get; set; }
        public DbSet<Project_Discount_Direct_Billings> Project_Discount_Direct_Billings { get; set; }
        public DbSet<Project_Discount_Direct_Billings_Status> Project_Discount_Direct_Billings_Status { get; set; }
        public DbSet<REPORT_PROJECT_DISCOUNT_WITH_COMMISSION> REPORT_PROJECT_DISCOUNT_WITH_COMMISSION { get; set; }
        public DbSet<sap_credit_debit> sap_credit_debit { get; set; }
        public DbSet<sap_customer_account_group> sap_customer_account_group { get; set; }
        public DbSet<sap_customer_category_master> sap_customer_category_master { get; set; }
        public DbSet<sap_customer_credit_master> sap_customer_credit_master { get; set; }
        public DbSet<sap_customer_group_master> sap_customer_group_master { get; set; }
        public DbSet<sap_customer_master> sap_customer_master { get; set; }
        public DbSet<sap_customer_pricing_group_master> sap_customer_pricing_group_master { get; set; }
        public DbSet<sap_customer_sales_master> sap_customer_sales_master { get; set; }
        public DbSet<sap_customer_type_master> sap_customer_type_master { get; set; }
        public DbSet<sap_distribution_channel_master> sap_distribution_channel_master { get; set; }
        public DbSet<sap_division_master> sap_division_master { get; set; }
        public DbSet<SAP_FINANCIAL_ACCOUNTING> SAP_FINANCIAL_ACCOUNTING { get; set; }
        public DbSet<sap_invoice_header_data> sap_invoice_header_data { get; set; }
        public DbSet<sap_invoice_item_data> sap_invoice_item_data { get; set; }
        public DbSet<SAP_INVOICE_LIST> SAP_INVOICE_LIST { get; set; }
        public DbSet<sap_invoice_pricing_text_master> sap_invoice_pricing_text_master { get; set; }
        public DbSet<SAP_OLD_CUST> SAP_OLD_CUST { get; set; }
        public DbSet<sap_outstanding_details> sap_outstanding_details { get; set; }
        public DbSet<SAP_PAYMENT_BY_STOCKIST> SAP_PAYMENT_BY_STOCKIST { get; set; }
        public DbSet<SAP_PENDING_C_FORM> SAP_PENDING_C_FORM { get; set; }
        public DbSet<sap_pending_c_forms> sap_pending_c_forms { get; set; }
        public DbSet<SAP_SALES_AND_DISTRIBUTION> SAP_SALES_AND_DISTRIBUTION { get; set; }
        public DbSet<sap_sales_district> sap_sales_district { get; set; }
        public DbSet<sap_sales_group> sap_sales_group { get; set; }
        public DbSet<SAP_SALES_OFFICE> SAP_SALES_OFFICE { get; set; }
        public DbSet<sap_sales_organization> sap_sales_organization { get; set; }
        public DbSet<SFDC_ADD_COUNTERs> SFDC_ADD_COUNTERs { get; set; }
        public DbSet<SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES> SFDC_ADV_JOURNEY_PLAN_ACTUAL_VISITING_DATES { get; set; }
        public DbSet<SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs> SFDC_ADV_JOURNEY_PLAN_CUSTOMER_DETAILs { get; set; }
        public DbSet<SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs> SFDC_ADV_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs { get; set; }
        public DbSet<SFDC_ADV_JOURNEY_PLAN_DETAILs> SFDC_ADV_JOURNEY_PLAN_DETAILs { get; set; }
        public DbSet<SFDC_CONFIGURE_HOLIDAY_STATE> SFDC_CONFIGURE_HOLIDAY_STATE { get; set; }
        public DbSet<SFDC_CONFIGURE_HOLIDAYS> SFDC_CONFIGURE_HOLIDAYS { get; set; }
        public DbSet<SFDC_COUNTER_DETAILs> SFDC_COUNTER_DETAILs { get; set; }
        public DbSet<SFDC_CREATE_DAILY_ORDERs> SFDC_CREATE_DAILY_ORDERs { get; set; }
        public DbSet<SFDC_CREATE_JOURNEY_PLAN_DETAILs> SFDC_CREATE_JOURNEY_PLAN_DETAILs { get; set; }
        public DbSet<SFDC_CREATE_PARTNER_ISSUES> SFDC_CREATE_PARTNER_ISSUES { get; set; }
        public DbSet<SFDC_CreateTargets> SFDC_CreateTargets { get; set; }
        public DbSet<SFDC_CreateTargets_Lines> SFDC_CreateTargets_Lines { get; set; }
        public DbSet<SFDC_CustomerTye> SFDC_CustomerTye { get; set; }
        public DbSet<SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS> SFDC_DAILY_ORDER_AC_SHEET_PRODUCT_DETAILS { get; set; }
        public DbSet<SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS> SFDC_DAILY_ORDER_CC_SHEET_PRODUCT_DETAILS { get; set; }
        public DbSet<SFDC_DAILY_ORDER_PRODUCT_DETAILS> SFDC_DAILY_ORDER_PRODUCT_DETAILS { get; set; }
        public DbSet<SFDC_DAILY_ORDERs> SFDC_DAILY_ORDERs { get; set; }
        public DbSet<SFDC_DEPO_COORDINATORs> SFDC_DEPO_COORDINATORs { get; set; }
        public DbSet<SFDC_ID_GENERATIONs> SFDC_ID_GENERATIONs { get; set; }
        public DbSet<SFDC_INVENTORY_TRACK_DETAILs> SFDC_INVENTORY_TRACK_DETAILs { get; set; }
        public DbSet<SFDC_INVENTORY_TRACK_DETAILS_COMPANY> SFDC_INVENTORY_TRACK_DETAILS_COMPANY { get; set; }
        public DbSet<SFDC_INVENTORY_TRACK_DETAILS_COMPANY_ScoreCard> SFDC_INVENTORY_TRACK_DETAILS_COMPANY_ScoreCard { get; set; }
        public DbSet<SFDC_INVENTORY_TRACK_DETAILs_ScoreCard> SFDC_INVENTORY_TRACK_DETAILs_ScoreCard { get; set; }
        public DbSet<SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs> SFDC_JOURNEY_PLAN_CUSTOMER_DETAILs { get; set; }
        public DbSet<SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs> SFDC_JOURNEY_PLAN_CUSTOMER_VISITING_DATEs { get; set; }
        public DbSet<SFDC_JOURNEY_PLAN_DETAILs> SFDC_JOURNEY_PLAN_DETAILs { get; set; }
        public DbSet<SFDC_JOURNEY_PLAN_STOCKIST_DETAILs> SFDC_JOURNEY_PLAN_STOCKIST_DETAILs { get; set; }
        public DbSet<SFDC_JOURNEY_PLAN_STOCKIST_VISITING_DATEs> SFDC_JOURNEY_PLAN_STOCKIST_VISITING_DATEs { get; set; }
        public DbSet<SFDC_KEY_STOCKIST_LIST> SFDC_KEY_STOCKIST_LIST { get; set; }
        public DbSet<SFDC_MARKET_MAPS> SFDC_MARKET_MAPS { get; set; }
        public DbSet<SFDC_PLANT_COORDINATORs> SFDC_PLANT_COORDINATORs { get; set; }
        public DbSet<SFDC_SALES_HUDDLE_MONTHLY_ATTENDENCEs> SFDC_SALES_HUDDLE_MONTHLY_ATTENDENCEs { get; set; }
        public DbSet<SFDC_SALES_HUDDLE_WEEKLYs> SFDC_SALES_HUDDLE_WEEKLYs { get; set; }
        public DbSet<SFDC_SALES_HUDDLES> SFDC_SALES_HUDDLES { get; set; }
        public DbSet<SFDC_SALES_HUDDLES_POPUP_DATAs> SFDC_SALES_HUDDLES_POPUP_DATAs { get; set; }
        public DbSet<SFDC_Save_COUNTER_DETAILs> SFDC_Save_COUNTER_DETAILs { get; set; }
        public DbSet<SFDC_SCHEME_DETAILS> SFDC_SCHEME_DETAILS { get; set; }
        public DbSet<SFDC_SCORECARD_LIST> SFDC_SCORECARD_LIST { get; set; }
        public DbSet<SMS_GATEWAY_SETTING> SMS_GATEWAY_SETTING { get; set; }
        public DbSet<SMS_MODEM_SETTING> SMS_MODEM_SETTING { get; set; }
        public DbSet<SPM_ZH_JOURNEY_PLAN_DETAILS> SPM_ZH_JOURNEY_PLAN_DETAILS { get; set; }
        public DbSet<StateWiseDiscount> StateWiseDiscounts { get; set; }
        public DbSet<tbl_Employee> tbl_Employee { get; set; }
        public DbSet<UNNATI_MAIL_CATEGORY> UNNATI_MAIL_CATEGORY { get; set; }
        public DbSet<UNNATI_MEMBER_ENROLLMENT> UNNATI_MEMBER_ENROLLMENT { get; set; }
        public DbSet<UNNATI_MEMBER_LOGIN> UNNATI_MEMBER_LOGIN { get; set; }
        public DbSet<UNNATI_REDEMPTION> UNNATI_REDEMPTION { get; set; }
        public DbSet<UNNATI_REWARDS_CATALOG> UNNATI_REWARDS_CATALOG { get; set; }
        public DbSet<UNNATI_TRANSACTIONS> UNNATI_TRANSACTIONS { get; set; }
        public DbSet<USER_DEFAULT_REPORT_TABLE> USER_DEFAULT_REPORT_TABLE { get; set; }
        public DbSet<USER_REPORT_TABLE> USER_REPORT_TABLE { get; set; }
        public DbSet<cms_approved_docstatus_ICC> cms_approved_docstatus_ICC { get; set; }
        public DbSet<cms_approved_docstatus_STO> cms_approved_docstatus_STO { get; set; }
        public DbSet<cms_checkFortune20> cms_checkFortune20 { get; set; }
        public DbSet<cms_complaint_assign_ICC> cms_complaint_assign_ICC { get; set; }
        public DbSet<cms_complaint_assign_STO> cms_complaint_assign_STO { get; set; }
        public DbSet<CMS_COMPLAINT_STATUS_ICC> CMS_COMPLAINT_STATUS_ICC { get; set; }
        public DbSet<CMS_COMPLAINT_STATUS_STO> CMS_COMPLAINT_STATUS_STO { get; set; }
        public DbSet<cms_COMPLAINT_STATUS_TRACKING> cms_COMPLAINT_STATUS_TRACKING { get; set; }
        public DbSet<CMS_DASHBOARD_TABLE> CMS_DASHBOARD_TABLE { get; set; }
        public DbSet<cms_fortune20_product_category_master> cms_fortune20_product_category_master { get; set; }
        public DbSet<CMS_INV_Material_Supply_Details_SBU3_STO> CMS_INV_Material_Supply_Details_SBU3_STO { get; set; }
        public DbSet<CMS_INV_Supply_Details_SBU3_STO> CMS_INV_Supply_Details_SBU3_STO { get; set; }
        public DbSet<cms_investigation_backup230220211245> cms_investigation_backup230220211245 { get; set; }
        public DbSet<cms_investigation_breakage_SBU8_lines> cms_investigation_breakage_SBU8_lines { get; set; }
        public DbSet<cms_investigation_ICC> cms_investigation_ICC { get; set; }
        public DbSet<cms_investigation_msf_BU8> cms_investigation_msf_BU8 { get; set; }
        public DbSet<cms_investigation_STO> cms_investigation_STO { get; set; }
        public DbSet<CMS_PARTY_TYPE> CMS_PARTY_TYPE { get; set; }
        public DbSet<CMS_RC_Material_Supply_Details_STO> CMS_RC_Material_Supply_Details_STO { get; set; }
        public DbSet<cms_register_complaints_backup230220211225> cms_register_complaints_backup230220211225 { get; set; }
        public DbSet<cms_register_complaints_icc> cms_register_complaints_icc { get; set; }
        public DbSet<cms_register_complaints_sto> cms_register_complaints_sto { get; set; }
        public DbSet<CMS_TYPE_OF_COMPLAINTS> CMS_TYPE_OF_COMPLAINTS { get; set; }
        public DbSet<CMS_USER_ROLE_PRODUCT_TYPE_MAPPING> CMS_USER_ROLE_PRODUCT_TYPE_MAPPING { get; set; }
        public DbSet<cms_zone_state_mapping_backup_08012019> cms_zone_state_mapping_backup_08012019 { get; set; }
        public DbSet<cms_zone_state_mapping_new> cms_zone_state_mapping_new { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<NOTIFICATION_BACKUP_13102020> NOTIFICATION_BACKUP_13102020 { get; set; }
        public DbSet<sap_credit_debit_note> sap_credit_debit_note { get; set; }
        public DbSet<sysdiagram> sysdiagrams { get; set; }
        public DbSet<cms_compensation_Approved_BU> cms_compensation_Approved_BU { get; set; }
        public DbSet<cms_organization_level_11052018> cms_organization_level_11052018 { get; set; }
        public DbSet<CMS_RC_Supply_Details_STO> CMS_RC_Supply_Details_STO { get; set; }
        public DbSet<DailyLoginAuditTrackerEmail> DailyLoginAuditTrackerEmails { get; set; }
        public DbSet<DailySalesTrackerEmailsNew> DailySalesTrackerEmailsNews { get; set; }
        public DbSet<DIMS_EmployeeDetails_bkp_24102019> DIMS_EmployeeDetails_bkp_24102019 { get; set; }
        public DbSet<Plant_QA_Employees_Mails> Plant_QA_Employees_Mails { get; set; }
        public DbSet<SalesReturnEmail> SalesReturnEmails { get; set; }
        public DbSet<sap_credit_debit_bkp_14052018_> sap_credit_debit_bkp_14052018_ { get; set; }
        public DbSet<sap_credit_debit_bkp_perfect_15052018> sap_credit_debit_bkp_perfect_15052018 { get; set; }
        public DbSet<SystemSetting> SystemSettings { get; set; }
        public DbSet<Tbl_Exception_Notification> Tbl_Exception_Notification { get; set; }
    }
}
