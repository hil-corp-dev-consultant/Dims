
DIMS.controller('UnnatiTransactionDetailReportCtrl', function ($scope, $location, DIMSFactory, $compile) {
    $('#undo_redo_to').empty();
    UnnatiTransactionDetailReportScope = $scope;
    $scope.TransactionDetailTypeOfTransaction = "Earning";
    $scope.templatesettings = { HeaderTitle: "UnnatiTransactionDetailReportCtrl" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };

    var UserCode = $("#USERCODE_UnnatiTransactionDetail").val();
    var UserType = $("#USERTYPE_UnnatiTransactionDetail").val();

    var StateName = $("#StateName_UnnatiTransactionDetail").val();
   // alert(StateName);
    // UserCode = "561";
    $scope.TransactionDetailTypeOfTransaction = "ALL";
    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        ReportName: "UnnatiTransactionDetail"
    });

    $scope.DownloadFile = function (typeoffile) {

        var FileName = "TransactionDetailReport";
        if ($scope.TransactionDetailFromDate == "" || $scope.TransactionDetailFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionDetailToDate == "" || $scope.TransactionDetailToDate == undefined) {
            alert("To Date cannot be empty");
        }        
        else if ($("#TransactionDetailReportTable tbody tr").length <= 0) {

            alert("No Data Available");
        }
        else {
            var STDATE = ($scope.TransactionDetailFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionDetailToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }

            if (!$('#TransactionDetailReportTable').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }

            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];


            var WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "'  AND (STATUS='Approved' OR STATUS='')  ";
            $scope.TransactionDetailTypeOfTransaction = "Earning"
            if ($scope.TransactionDetailTypeOfTransaction == "ALL") {
                WhereCondition += "";

            } else if ($scope.TransactionDetailTypeOfTransaction == "Earning") {
                WhereCondition += " AND TYPE_OF_TRANSACTION = 'EARNING'";
            } else if ($scope.TransactionDetailTypeOfTransaction == "Redemption") {
                WhereCondition += " AND TYPE_OF_TRANSACTION = 'REDEMPTION'";
            }

            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
                } else {
                    WhereCondition = WhereCondition + " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
                }

            }
            else if (UserType == "ZH" || UserType == "RCC" || UserType == "ZSC") {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
               // WhereCondition = WhereCondition + " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";
            }
            else if (UserType == "SH") {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
                // WhereCondition = WhereCondition + " AND  UPPER(STATE)='" + $("#StateName_UnnatiTransactionDetail").val().toUpperCase() + "'";
                //WhereCondition = WhereCondition + " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select  MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
              
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
                // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_TRANSACTIONS WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
                WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
            }
            else if (UserType == "TM") {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_TRANSACTIONS where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
                WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            }
            else {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
            }
            //WhereCondition += " ORDER BY ID DESC";
           // WhereCondition = WhereCondition + " AND TRANSACTION_ID not like '[_]%' ";

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiTransactionDetail",
                WhereClause: WhereCondition

            });
            $.ajax({

                url: '../../Home/SetInputData',
                type: "POST",
                datatype: "JSON",
                data: { InputData: Data, ReportType: typeoffile, FileName: FileName },
                async: false,
                cache: false,
                beforeSend: function () {
                    ShowLoader();
                },
                success: function (response) {
                    window.location.href = '../../Home/GenerateReport';
                },
                complete: function () {
                    HideLoader();
                },
                error: function () {
                    alert("Technical error has been occured.Please try again later");

                }
            });
        }
    }
    DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
        ShowLoader();
        var Result = JSON.parse(response.tabledata);

        if (Result != "") {
            $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
         
            if (Result.hasOwnProperty('UserListColumnNames')) {
                var data1 = JSON.parse(Result["UserListColumnNames"]);

                var selectedcolumnname = data1["ColumnNames"];

                CustomColumnID = Result["UserListID"];
                $('#undo_redo_to').empty();
                var ColArray = new Array();
                for (var i = 0; i < selectedcolumnname.length; i++) {
                    ColArray.push({
                        "data": selectedcolumnname[i],
                        "name": selectedcolumnname[i], "bSortable": true

                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            } else {

                var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                var selectedcolumnname = data1["ColumnNames"];

                CustomColumnID = "0";

                $('#undo_redo_to').empty();
                var ColArray = new Array();
                for (var i = 0; i < selectedcolumnname.length; i++) {
                    ColArray.push({
                        "data": selectedcolumnname[i],
                        "name": selectedcolumnname[i]
                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            }


            HideLoader();
        }

    }).error(function () {
        alert("Technical error has been occured");
        HideLoader();
    });


    $scope.GetTransactionDetailReport = function () {
        if ($scope.TransactionDetailFromDate == "" || $scope.TransactionDetailFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.TransactionDetailToDate == "" || $scope.TransactionDetailToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.TransactionDetailFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.TransactionDetailToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }


            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            var WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "'  AND (STATUS='Approved' OR STATUS='') ";
            if ($scope.TransactionDetailTypeOfTransaction == "ALL") {
                WhereCondition += "";

            } else if ($scope.TransactionDetailTypeOfTransaction == "Earning") {
                WhereCondition += " AND TYPE_OF_TRANSACTION = 'EARNING'";
            } else if ($scope.TransactionDetailTypeOfTransaction == "Redemption") {
                WhereCondition += " AND TYPE_OF_TRANSACTION = 'REDEMPTION'";
            }
           
            //WhereCondition += " ORDER BY ID DESC";
            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
                } else {
                    WhereCondition =WhereCondition+ " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
                }

            }
            else if (UserType == "ZH" || UserType == "RCC" || UserType == "ZSC") {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
                //WhereCondition = WhereCondition + " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

            }
            else if (UserType == "SH") {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
                // WhereCondition = WhereCondition + " AND  UPPER(STATE)='" + $("#StateName_UnnatiTransactionDetail").val().toUpperCase() + "'";
               // WhereCondition = WhereCondition + " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                //WhereCondition += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";

            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
               
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
                // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_TRANSACTIONS WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
                WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
            }
            else if (UserType == "TM") {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_TRANSACTIONS where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
                WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            }
            else {
                WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
            }
           // WhereCondition = WhereCondition + " AND TRANSACTION_ID not like '[_]%' ";

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiTransactionDetail",
                WhereClause: WhereCondition, "Type": "Get"

            });
            //ShowLoader();

            DIMSFactory.getReportData(Data).success(function (response) {

                getLookUpData_Reports_ServerSideBinding("", "", "", "TransactionDetailReportTable", UserSelectedColumnName);

                var RD = SumQuantity(WhereCondition, "TDR_Quantity");

                if (RD == "") {
                    $("#Quantity_No_TOTAL").val("");
                    $("#SUM_Points").val("");
                }
                else {
                    $(".PageTotals").css('display', 'block');
                    RD = JSON.parse(RD);
                    $("#Quantity_No_TOTAL").val(RD[0]["Quantity_No_TOTAL"]);
                    $("#SUM_Points").val(RD[0]["SUM_Points"]);
                }
                HideLoader();
            }).error(function (data, status) {

            });
            HideLoader();
        }
    }

    // Open popup for columns selection
    $scope.OpenColumnEditing = function () {

        DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
            ShowLoader();
            var Result = JSON.parse(response.tabledata);

            if (Result != "") {
                $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
           
                if (Result.hasOwnProperty('UserListColumnNames')) {
                    var data1 = JSON.parse(Result["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = Result["UserListID"];
                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i], "bSortable": true

                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                } else {

                    var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = "0";

                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i]
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                }



                $('#undo_redo').empty();

                var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

                for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
                    $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
                }


                //  $('#undo_redo').refresh();

                $('#undo_redo').multiselect();



                HideLoader();
            }

        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });

        if (ControllerName != "UnnatiTransactionDetailReportCtrl") {
            ControllerName = "UnnatiTransactionDetailReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiTransactionDetailReportCtrl");

            $compile(elem.contents())(UnnatiTransactionDetailReportScope);
        }

        $("#ColumnEditingModal").modal('show');

    }

    $scope.ViewColumnEditing = function () {

        var STDATE = ($scope.TransactionDetailFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.TransactionDetailToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }
        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
        var WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "'  AND (STATUS='Approved' OR STATUS='') ";
        if ($scope.TransactionDetailTypeOfTransaction == "ALL") {
            WhereCondition += "";

        } else if ($scope.TransactionDetailTypeOfTransaction == "Earning") {
            WhereCondition += " AND TYPE_OF_TRANSACTION = 'EARNING'";
        } else if ($scope.TransactionDetailTypeOfTransaction == "Redemption") {
            WhereCondition += " AND TYPE_OF_TRANSACTION = 'REDEMPTION'";
        }
        //WhereCondition += " ORDER BY ID DESC";
        if (UserType == "STOCKIST") {
            if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
            } else {
                WhereCondition = WhereCondition + " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
            }

        }
        else if (UserType == "ZH" || UserType == "RCC" || UserType == "ZSC") {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
            //WhereCondition = WhereCondition + " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

        }
        else if (UserType == "SH") {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
            // WhereCondition = WhereCondition + " AND  UPPER(STATE)='" + $("#StateName_UnnatiTransactionDetail").val().toUpperCase() + "'";
           // WhereCondition = WhereCondition + " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            // WhereCondition += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select  MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";

        }
        else if (UserType == "FSO" || UserType == "FSO_BU2") {
           
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
            // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_TRANSACTIONS WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
            WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
        }
        else if (UserType == "TM") {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
            //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_TRANSACTIONS where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
            WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
        }
        else {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
        }
       // WhereCondition = WhereCondition + " AND TRANSACTION_ID not like '[_]%' ";

        DIMSFactory.ViewColumnEditing("UnnatiTransactionDetail", UserCode, WhereCondition, $("#TransactionDetailFromDate").val(), $("#TransactionDetailToDate").val());

    }

    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        var STDATE = ($scope.TransactionDetailFromDate).split('/');
        var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
        var startDateValuecmp = startDateValue.getTime();
        var ENDATE = ($scope.TransactionDetailToDate).split('/');
        var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
        var endDateValuecmp = endDateValue.getTime();

        if (startDateValuecmp > endDateValuecmp) {
            alert("To Date cannot be less than From Date");
            return;
        }
        var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
        var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
        var WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "'  AND (STATUS='Approved' OR STATUS='') ";
        if ($scope.TransactionDetailTypeOfTransaction == "ALL") {
            WhereCondition += "";

        } else if ($scope.TransactionDetailTypeOfTransaction == "Earning") {
            WhereCondition += " AND TYPE_OF_TRANSACTION = 'EARNING'";
        } else if ($scope.TransactionDetailTypeOfTransaction == "Redemption") {
            WhereCondition += " AND TYPE_OF_TRANSACTION = 'REDEMPTION'";
        }
        if (UserType == "STOCKIST") {
            if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                WhereCondition = " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
            } else {
                WhereCondition = WhereCondition + " WHERE CONVERT(DATE, REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE, REWARD_POSTING_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'  AND (STATUS='Approved' OR STATUS='') ";
            }

        }
        else if (UserType == "ZH" || UserType == "RCC" || UserType == "ZSC") {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
            //WhereCondition = WhereCondition + " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

        }
        else if (UserType == "SH") {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
            // WhereCondition = WhereCondition + " AND  UPPER(STATE)='" + $("#StateName_UnnatiTransactionDetail").val().toUpperCase() + "'";
            //WhereCondition = WhereCondition + " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            //WhereCondition += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";

        }
        else if (UserType == "FSO" || UserType == "FSO_BU2") {
         
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
            // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_TRANSACTIONS WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
            WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
        }
        else if (UserType == "TM") {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='') ";
            //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_TRANSACTIONS where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
            WhereCondition = WhereCondition + " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
        }
        else {
            WhereCondition = " WHERE CONVERT(DATE,REWARD_POSTING_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,REWARD_POSTING_DATE)<='" + finalEndDate + "' AND (STATUS='Approved' OR STATUS='')  ";
        }
       // WhereCondition = WhereCondition + " AND TRANSACTION_ID not like '[_]%' ";

        WhereCondition += " ";
        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiTransactionDetail",
            WhereClause: WhereCondition,
            "Type": "Get"

        });
        ShowLoader();
        DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiTransactionDetail", UserCode, WhereCondition, Data, "TransactionDetailReportTable");
        HideLoader();


    }

});