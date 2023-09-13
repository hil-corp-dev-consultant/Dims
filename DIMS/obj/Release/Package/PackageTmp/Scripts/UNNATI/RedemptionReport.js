DIMS.controller('UnnatiRedemptionReportCtrl', function ($scope, $location, DIMSFactory, $compile) {

    UnnatiRedemptionScope = $scope;
    $('#undo_redo_to').empty();

    $scope.templatesettings = { HeaderTitle: "UnnatiRedemptionReportCtrl" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    var UserCode = $("#USERCODE_UnnatiRedemption").val();
    var UserType = $("#USERTYPE_UnnatiRedemption").val();
    var StateName = $("#StateName_UnnatiRedemption").val();

    
    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        ReportName: "UnnatiRedemption"
    });

    $scope.DownloadFile = function (typeoffile) {

        var FileName = "RedemptionReport";
        if ($scope.RedemptionFromDate == "" || $scope.RedemptionFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.RedemptionToDate == "" || $scope.RedemptionToDate == undefined) {
            alert("To Date cannot be empty");
        }

        else if ($("#RedemptionReport_Table tbody tr").length <= 0) {
            alert("No Data Available");
        }
        else {
            var STDATE = ($scope.RedemptionFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.RedemptionToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            if (!$('#RedemptionReport_Table').DataTable().data().count()) {
                alert("No Data Available");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];


            var WhereCondition = "";
            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                } else {
                    //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
                    WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";

                }

            }
            else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
               // WhereCondition += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

            }
            else if (UserType == "SH") {
                //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereCondition += " AND  UPPER(STATE)='" + $("#StateName_UnnatiRedemption").val().toUpperCase() + "'";
                //  WhereCondition += " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                // WhereCondition += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                // WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_REDEMPTION WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
                //WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
                WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

            }
            else if (UserType == "TM") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_REDEMPTION where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
                // WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
                WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            }
            else {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
            }

            //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";


           

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiRedemption",
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
                    HideLoader();
                }
            });
        }
    }
    // Column names for default or user selected
    ShowLoader();
    DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
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

    // GET REDEMPTION REPORT WITH FROM AND TO DATE
    $scope.GetRedemptionReport = function () {

        if ($scope.RedemptionFromDate == "" || $scope.RedemptionFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.RedemptionToDate == "" || $scope.RedemptionToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.RedemptionFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.RedemptionToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];
            var WhereCondition = "";
            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                   // WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                     WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";

                }
                else {
                  //  WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "' AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";

                    //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
                }
            }
            else if (UserType == "ZH" || UserType == "ZSC"||UserType=="RCC") {
                //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                //WhereCondition += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

            }
            else if (UserType == "SH") {
                //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereCondition += " AND  UPPER(STATE)='" + $("#StateName_UnnatiRedemption").val().toUpperCase() + "'";
              //  WhereCondition += " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                // WhereCondition += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
               // WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                  WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_REDEMPTION WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
                //WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
                  WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

            }
            else if (UserType == "TM") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_REDEMPTION where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
               // WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
                  WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            }
            else {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
            }

            // var WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiRedemption",
                WhereClause: WhereCondition,
                "Type": "Get"

            });
            ShowLoader();
            DIMSFactory.getReportData(Data).success(function (response) {


                getLookUpData_Reports_ServerSideBinding("", "", "", "RedemptionReport_Table", UserSelectedColumnName);

                var RD = SumQuantity(WhereCondition, "RedemptionReport");

                if (RD == "") {
                    $("#Points_TOTAL").val("");
                }
                else {
                    $(".PageTotals").css('display', 'block');
                    RD = JSON.parse(RD);
                    $("#Points_TOTAL").val(RD[0]["Points_TOTAL"]);
                }
                HideLoader();
            }).error(function () {
                alert("Technical error has been occured");
                HideLoader();
            });
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
            }
            HideLoader();
        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });

      

        if (ControllerName != "UnnatiRedemptionReportCtrl") {
            ControllerName = "UnnatiRedemptionReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiRedemptionReportCtrl");

            $compile(elem.contents())(UnnatiRedemptionScope);
        }

        $("#ColumnEditingModal").modal('show');

    }


    // View Columns selected
    $scope.ViewColumnEditing = function () {

        if ($scope.RedemptionFromDate == "" || $scope.RedemptionFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.RedemptionToDate == "" || $scope.RedemptionToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.RedemptionFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.RedemptionToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

            var WhereCondition = "";
            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" || UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'";
                } else {
                    WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "'";

                    //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "' AND STATUS='Ordered'  ";
                }

            }
            else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
               // WhereCondition += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";
            }
            else if (UserType == "SH") {
                //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereCondition += " AND  UPPER(STATE)='" + $("#StateName_UnnatiRedemption").val().toUpperCase() + "'";
                //  WhereCondition += " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                // WhereCondition += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                // WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_REDEMPTION WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
                //WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
                WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

            }
            else if (UserType == "TM") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_REDEMPTION where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
                // WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
                WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            }

            else {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'";
            }
            // var WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";

            DIMSFactory.ViewColumnEditing("UnnatiRedemption", UserCode, WhereCondition, $("#RedemptionFromDate").val(), $("#RedemptionToDate").val());

        }
    }

    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        if ($scope.RedemptionFromDate == "" || $scope.RedemptionFromDate == undefined) {
            alert("From Date cannot be empty");
        } else if ($scope.RedemptionToDate == "" || $scope.RedemptionToDate == undefined) {
            alert("To Date cannot be empty");
        } else {
            var STDATE = ($scope.RedemptionFromDate).split('/');
            var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
            var startDateValuecmp = startDateValue.getTime();
            var ENDATE = ($scope.RedemptionToDate).split('/');
            var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
            var endDateValuecmp = endDateValue.getTime();

            if (startDateValuecmp > endDateValuecmp) {
                alert("To Date cannot be less than From Date");
                return;
            }
            var finalStartDate = STDATE[2] + "-" + STDATE[1] + "-" + STDATE[0];
            var finalEndDate = ENDATE[2] + "-" + ENDATE[1] + "-" + ENDATE[0];

            ShowLoader();

            // var WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";

            var WhereCondition = "";
            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                    WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                } else {
                    WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";

                    //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "' ";
                }
            }
            else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
                //WhereCondition += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereCondition += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";
            }
            else if (UserType == "SH") {
                //WhereCondition = " WHERE CONVERT(DATE,ORDER_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,ORDER_DATE)<='" + finalEndDate + "'  ";
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereCondition += " AND  UPPER(STATE)='" + $("#StateName_UnnatiRedemption").val().toUpperCase() + "'";
                //  WhereCondition += " AND UPPER(STATE) IN ( select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                // WhereCondition += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                // WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                WhereCondition += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";

                // WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_REDEMPTION WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))) ";
                //WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";
                WhereCondition += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

            }
            else if (UserType == "TM") {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "'  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_REDEMPTION where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')))) ";
                // WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
                WhereCondition += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            }
            else {
                WhereCondition = " WHERE CONVERT(DATE,STATUS_CHANGE_DATE)>= '" + finalStartDate + "' AND CONVERT(DATE,STATUS_CHANGE_DATE)<='" + finalEndDate + "' ";
            }

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiRedemption",
                WhereClause: WhereCondition,
                "Type": "Get"

            });

            DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiRedemption", UserCode, WhereCondition, Data, "RedemptionReport_Table");
            HideLoader();
        }

    }

});