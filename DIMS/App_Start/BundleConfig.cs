using System.Web;
using System.Web.Optimization;

namespace DIMS
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleTable.EnableOptimizations = true;
            bundles.IgnoreList.Clear();
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/Angularjs").Include(
                         "~/Scripts/angular.min.js",
                         "~/Scripts/angular-route.min.js",
                //"~/Scripts/angular-ui.router.min.js",
                          "~/Scripts/DIMS/App.js",
                          "~/Scripts/DIMS/CorrectiveMeasure.js",
                          "~/Scripts/DIMS/Compensation.js",
                          "~/Scripts/DIMS/ComplaintApprovals.js",
                          "~/Scripts/DIMS/ComplaintRegistration.js",
                          "~/Scripts/DIMS/ComplaintReports.js",
                          "~/Scripts/DIMS/Investigation.js",
                          "~/Scripts/DIMS/Masters.js",
                          "~/Scripts/DIMS/Crypto.js",

                          // Unnati scripts
                           "~/Scripts/UNNATI/PointBalanceReport.js",
                          "~/Scripts/UNNATI/RedemptionReport.js",
                          "~/Scripts/UNNATI/MemberLogin.js",
                          "~/Scripts/UNNATI/EmployeeRedemptionReport.js",
                          "~/Scripts/UNNATI/EnrollmentDetailsReport.js",
                          "~/Scripts/UNNATI/TransactionDetailReport.js",
                          "~/Scripts/UNNATI/TransactionStatusReport.js",
                          "~/Scripts/UNNATI/TransactionSummaryReport.js",
                          "~/Scripts/UNNATI/TransactionVelocityReport.js",
                          "~/Scripts/UNNATI/UnnatiDashBoard.js",
                          "~/Scripts/UNNATI/UnnatiCustomerMapping.js",
                          "~/Scripts/UNNATI/UnnatiRewardsCatalog.js",
                // unnati scripts

                //reports scripts
                 "~/Scripts/Reports/DiscountStructure.js",
                 "~/Scripts/Reports/NetBilling.js",
                  "~/Scripts/Reports/ProjectDiscountWithCommisssion.js",
                  "~/Scripts/Reports/ProjectWithDirectBilling.js",
                  "~/Scripts/DIMS/ComplaintRegistration_STO.js",
                 "~/Scripts/DIMS/Investigation_STO.js",
                 //"~/Scripts/DIMS/FinancialTransactionsBU3Script.js",
                 "~/Scripts/DIMS/ComplaintReports_STO.js"
                         //"~/Scripts/DIMS/ComplaintReports_ICC.js",
                         //"~/Scripts/DIMS/ComplaintRegistration_ICC.js",
                 //"~/Scripts/DIMS/Investigation_ICC.js",
                 //"~/Scripts/DIMS/ComplaintApprovals_ICC.js"
                  //,
                 //reports scripts
                 // svprasadk 05-08-2020 SBU3 Stock Transfer implementation start
                 //"~/Scripts/DIMS/ComplaintRegistration_STO.js",
                 //"~/Scripts/DIMS/Investigation_STO.js",
                         // svprasadk 05-08-2020 SBU3 Stock Transfer implementation end
                         // svprasadk 27-11-2020 Invoices Tab for SBU3 start
                         //"~/Scripts/DIMS/FinancialTransactionsBU3Script.js",
                         // svprasadk 27-11-2020 Invoices Tab for SBU3 end
                         //svprasadk 05-02-2021 SBU3 Stock Transfer and informal complaint status report start
                         //"~/Scripts/DIMS/ComplaintReports_STO.js",
                         //"~/Scripts/DIMS/ComplaintReports_ICC.js",
                 //svprasadk 05-02-2021 SBU3 Stock Transfer and informal complaint status report start
                 // svprasadk 08-02-2021 SBU3 Informal Customer Complaint implementation start
                 //"~/Scripts/DIMS/ComplaintRegistration_ICC.js",
                 //"~/Scripts/DIMS/Investigation_ICC.js",
                         // svprasadk 08-02-2021 SBU3 Informal Customer Complaint implementation end
                         //svprasadk 12-02-2021 SBU3 Informal Customer Complaint implementation start
                         //"~/Scripts/DIMS/ComplaintApprovals_ICC.js"
                         //svprasadk 12-02-2021 SBU3 Informal Customer Complaint implementation end
                         ));

            bundles.Add(new ScriptBundle("~/bundles/AllJs").Include(
                //"~/plugins/jQuery/jQuery-2.1.4.min.js",
                //"~/bootstrap/DataTables-1.10.5/js/jquery.js",
                //    "~/plugins/jQueryUI/jquery-ui.min1.js",
                //  "~/bootstrap/DataTables-1.10.5/js/jquery.dataTables.min.js",
                //"~/bootstrap/js/bootstrap.min.js",
                //"~/bootstrap/js/fileinput.js",

                        // "~/bootstrap/DataTables-1.10.5/js/dataTables.responsive.js",

                        "~/plugins/jQueryUI/raphael-min.js",
                        "~/plugins/morris/morris.min.js",
                        "~/plugins/sparkline/jquery.sparkline.min.js",
                        "~/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js",
                        "~/plugins/jvectormap/jquery-jvectormap-world-mill-en.js",
                        "~/plugins/knob/jquery.knob.js",
                        "~/plugins/jQueryUI/moment.min.js",
                //"~/plugins/daterangepicker/daterangepicker.js",
                //"~/plugins/datepicker/bootstrap-datepicker.js",
                        "~/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js",
                        "~/plugins/slimScroll/jquery.slimscroll.min.js",
                //"~/plugins/fastclick/fastclick.min.js",
                //"~/dist/js/app.min.js",
                //"~/dist/js/pages/dashboard.js",
                        "~/dist/js/demo.js",
                         "~/Scripts/ImagePicker/image-picker.min.js"

                        ));


            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/bundles/Allcss").Include(
                "~/bootstrap/css/bootstrap.min.css",
                "~/bootstrap/css/fileinput.css",

                //"~/dist/css/AdminLTE.min.css",
                "~/dist/css/skins/_all-skins.css",
                "~/plugins/iCheck/flat/blue.css",
                "~/plugins/morris/morris.css",
                "~/plugins/jvectormap/jquery-jvectormap-1.2.2.css",
                //"~/plugins/datepicker/datepicker3.css",
                //"~/plugins/daterangepicker/daterangepicker-bs3.css",
                "~/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css",
                "~/Scripts/ImagePicker/image-picker.css"
               

                //"~/bootstrap/font-awesome/css/font-awesome.min.css",
                //"~/bootstrap/ionicons/css/ionicons.min.css"
                ));

            bundles.Add(new StyleBundle("~/bundles/DataTablecss").Include(
                //"~/bootstrap/css/bootstrap.min.css",

                  //     "~/bootstrap/font-awesome/css/font-awesome.min.css",
                      "~/bootstrap/DataTables-1.10.5/css/jquery.dataTables.css",
                      "~/bootstrap/DataTables-1.10.5/css/dataTables.responsive.css"
                      //,
                      //"~/bootstrap/css/buttons.dataTables.min.css",
                      //"~/bootstrap/css/select.dataTables.min.css",
                      //"~/bootstrap/css/editor.dataTables.min.css"

           ));




            bundles.Add(new ScriptBundle("~/bundles/DataTable").Include(
                //"~/bootstrap/DataTables-1.10.5/js/jquery.js",
                       "~/bootstrap/DataTables-1.10.5/js/jquery.dataTables.min.js",
                       "~/bootstrap/DataTables-1.10.5/js/dataTables.responsive.js"
                //       ,
                //       "~/bootstrap/js/dataTables.buttons.min.js",
                //       "~/bootstrap/js/dataTables.select.min.js",

                //"~/bootstrap/js/dataTables.editor.min.js"

           ));

            bundles.Add(new StyleBundle("~/bundles/Logincss").Include(
               "~/bootstrap/css/bootstrap.min.css",

                "~/bootstrap/font-awesome/css/font-awesome.min.css",
               "~/bootstrap/DataTables-1.10.5/css/jquery.dataTables.css",
               "~/bootstrap/DataTables-1.10.5/css/dataTables.responsive.css",
                  "~/Scripts/ImagePicker/image-picker.css"
    ));
            bundles.Add(new ScriptBundle("~/bundles/LoginJs").Include(
                "~/bootstrap/DataTables-1.10.5/js/jquery.js",
                     "~/bootstrap/DataTables-1.10.5/js/jquery.dataTables.min.js",
                     "~/bootstrap/DataTables-1.10.5/js/dataTables.responsive.js",
                "~/bootstrap/js/bootstrap.min.js",
                "~/Scripts/ImagePicker/image-picker.min.js"

         ));
        }
    }
}