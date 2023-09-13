DIMS.controller('UnnatiPointBalanceReportCtrl', function ($scope, $location, DIMSUnnatiFactory, DIMSFactory, $compile) {
    UnnatiPointBalanceListScope = $scope;
    $('#undo_redo_to').empty();
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    }
    var UserCode = $("#USERCODE_UnnatiPointBalance").val();
    var UserType = $("#USERTYPE_UnnatiPointBalance").val();
    var StateName = $("#StateName_UnnatiPointBalance").val();
    
    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        ReportName: "UnnatiPointBalance"
    });
    $scope.DownloadFile = function (typeoffile) {

        var FileName = "PointBalanceReport";
        if ($scope.MinimumBalancePt == "" || $scope.MinimumBalancePt == undefined) {
            alert("Please Enter Min Point Balance");
        } else if ($scope.MaximumBalancePt == "" || $scope.MaximumBalancePt == undefined) {
            alert("Please Enter Max Point Balance");
        }
        else if ($("#PointBalanceReportList tbody tr").length <= 0) {
            alert("No Data Available");
        }
        else {

            if (isNaN($scope.MinimumBalancePt)) {
                alert("Please Enter only number in Min Point Balance");
                return false;
            }
            if (isNaN($scope.MaximumBalancePt)) {
                alert("Please Enter only number in Max Point Balance");
                return false;
            }
            if (parseInt($scope.MinimumBalancePt) > parseInt($scope.MaximumBalancePt)) {
                alert("Minimum Point Balance cannot be greater than Maximum Point Balance");
                return false;
            }

            if (!$('#PointBalanceReportList').DataTable().data().count()) {
                alert("No Data Available");
                return false;
            }
            var WhereClause = "";

            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                    WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                } else {
                    //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  "
                    WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";

                }
            }

            else if (UserType == "ZH" || UserType == "ZSC"||UserType=="RCC") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //WhereClause += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                  WhereClause += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";
            }
            else if (UserType == "SH") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //   WhereClause += " AND  UPPER(STATE)='" + StateName.toUpperCase() + "'";
                //WhereClause += " AND UPPER(STATE) IN (select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                // WhereClause += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                //WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";

            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) ";
                WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

            }
            else if (UserType == "TM") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
                WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";

            }
            else {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  "
            }

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiPointBalance",
                WhereClause: WhereClause

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
    // Get Point Balance report with inputs Mini and Maximum points
    $scope.GetPointBalanceReport = function () {
        if ($scope.MinimumBalancePt == "" || $scope.MinimumBalancePt == undefined) {
            alert("Please Enter Min Point Balance");
        } else if ($scope.MaximumBalancePt == "" || $scope.MaximumBalancePt == undefined) {
            alert("Please Enter Max Point Balance");
        }
        else {

            if (isNaN($scope.MinimumBalancePt)) {
                alert("Please Enter only number in Min Point Balance");
                return false;
            }
            if (isNaN($scope.MaximumBalancePt)) {
                alert("Please Enter only number in Max Point Balance");
                return false;
            }
            if (parseInt($scope.MinimumBalancePt) > parseInt($scope.MaximumBalancePt)) {
                alert("Minimum Point Balance cannot be greater than Maximum Point Balance");
                return false;
            }

            var WhereClause = "";
            if (UserType == "STOCKIST") {
                if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {

                    WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
                } else {
                    WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";


                    // WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  "
                }

            }
            else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //WhereClause += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
                WhereClause += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

            }
            else if (UserType == "SH") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //   WhereClause += " AND  UPPER(STATE)='" + StateName.toUpperCase() + "'";
                //WhereClause += " AND UPPER(STATE) IN (select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
               // WhereClause += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                //WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
                WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";

            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) ";
                WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

            }
            else if (UserType == "TM") {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
                //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
                  WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";

            }
            else {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            }

            var Data = JSON.stringify({
                ID: UserCode,
                UserCode: UserCode,
                ReportName: "UnnatiPointBalance",
                WhereClause: WhereClause,
                "Type": "Get"

            });
            ShowLoader();
            DIMSFactory.getReportData(Data).success(function (response) {


                getLookUpData_Reports_ServerSideBinding("", "", "", "PointBalanceReportList", UserSelectedColumnName);

                var RD = SumQuantity(WhereClause, "PointBalanceReport");

                if (RD == "") {
                    $("#Total_Members").val("");
                    $("#SUM_Points").val("");
                }
                else {
                    $(".PageTotals").css('display', 'block');
                    RD = JSON.parse(RD);
                    $("#Total_Members").val(RD[0]["Total_Members"]);
                    $("#SUM_Points").val(RD[0]["Total_Points"]);
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


                HideLoader();

                $('#undo_redo').empty();
                var ColumnNames = JSON.parse($scope.UserDefaultListColumnNames);

                for (var i = 0; i < ColumnNames["ColumnNames"].length; i++) {
                    $("#undo_redo").append($("<option></option>").val(ColumnNames["ColumnNames"][i]).html(ColumnNames["ColumnNames"][i]));
                }


                //   $('#undo_redo').refresh();

                $('#undo_redo').multiselect();
            }

        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });

        if (ControllerName != "UnnatiPointBalanceReportCtrl") {
            ControllerName = "UnnatiPointBalanceReportCtrl";
            var elem = angular.element('#ColumnEditingModal');
            elem.removeAttr('ng-controller');
            elem.attr('ng-controller', "UnnatiPointBalanceReportCtrl");

            $compile(elem.contents())(UnnatiPointBalanceListScope);
        }

        $("#ColumnEditingModal").modal('show');

    }

    // View Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.ViewColumnEditing = function () {

        var WhereClause = "";
        if (UserType == "STOCKIST") {
            if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
            } else {
                //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  "
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";

            }

        }
        else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //  WhereClause += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            WhereClause += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

        }
        else if (UserType == "SH") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //   WhereClause += " AND  UPPER(STATE)='" + StateName.toUpperCase() + "'";
            //WhereClause += " AND UPPER(STATE) IN (select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            // WhereClause += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            //WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";

        }
        else if (UserType == "FSO" || UserType == "FSO_BU2") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) ";
            WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

        }
        else if (UserType == "TM") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";

        }

        else {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  "
        }
        DIMSFactory.ViewColumnEditing("UnnatiPointBalance", UserCode, WhereClause,'1/1/2016','1/1/2016');

    }
    // Save Column selected it is like preview.We will send reportname,usercode and where condition to function
    $scope.SaveColumnEditingData = function () {
        ShowLoader();
        var WhereClause = "";
        if (UserType == "STOCKIST") {
            if (UnnatiMembershipID != "" && UnnatiMembershipID != undefined) {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";
            } else {
                WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  AND  MEMBERSHIP_ID='" + UnnatiMembershipID + "' ";

                //WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  "
            }

        }

        else if (UserType == "ZH" || UserType == "ZSC" || UserType == "RCC") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //WhereClause += " AND UPPER(ZONE) IN ( select distinct ZONE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            WhereClause += " AND UPPER(ZONE) IN (SELECT DISTINCT csv.ZONE_NAME 'ZONE_NAME' FROM cms_employee_customer_configuration ecc INNER JOIN CUSTOMER_SALES_VIEW csv on cast(ecc.CUSTOMER_CODE as int)=cast(csv.cust_code as int) WHERE ecc.ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%') AND csv.ZONE!='')";

        }
        else if (UserType == "SH") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //   WhereClause += " AND  UPPER(STATE)='" + StateName.toUpperCase() + "'";
            //WhereClause += " AND UPPER(STATE) IN (select distinct State from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID IN(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from  cms_organization_level where EMPLOYEE_CODE='" + UserCode + "')) and EMPLOYEE_CODE !='' and ORG_LEVEL_NAME like 'FSO%')))";
            // WhereClause += " AND UPPER(STATE) IN (select distinct STATE from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct STATE from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            //WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";
            WhereClause += " AND UPPER(STATE) IN (select distinct (CASE WHEN State_Name='Orissa' THEN 'Odisha' WHEN State_Name='Pondicherry' THEN 'Puducherry' WHEN State_Name='Chattisgarh' THEN 'Chhattisgarh'   ELSE State_Name END) AS  'STATE' from CUSTOMER_SALES_VIEW where cust_code in(select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union  select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))) union select distinct (CASE WHEN STATE='Orissa' THEN 'Odisha' WHEN STATE='Pondicherry' THEN 'Puducherry' WHEN STATE='Chattisgarh' THEN 'Chhattisgarh'   ELSE STATE END ) AS  'STATE' from UNNATI_MEMBER_ENROLLMENT where MEMBERSHIP_ID in(select MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE IN(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'FSO%' union all select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where parent_id =(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "') and ORG_LEVEL_NAME like 'TM%'))))";

        }
        else if (UserType == "FSO" || UserType == "FSO_BU2") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT CUSTOMER_CODE FROM  DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) ";
            WhereClause += " AND  MEMBERSHIP_ID IN (SELECT DISTINCT(MEMBERSHIP_ID) FROM UNNATI_MEMBER_ENROLLMENT WHERE  CUSTOMER_CODE  IN (SELECT CUSTOMER_CODE FROM  CMS_EMPLOYEE_CUSTOMER_CONFIGURATION WHERE ORG_LEVEL_ID IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "')) union all SELECT DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE IN (SELECT ORG_LEVEL_ID FROM CMS_ORGANIZATION_LEVEL WHERE EMPLOYEE_CODE='" + UserCode + "'))";

        }
        else if (UserType == "TM") {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  ";
            //WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select distinct CUSTOMER_CODE from DIMS_MEMBERSHIPID_CUSTOMER_CONFIGURATION where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";
            WhereClause += " AND  MEMBERSHIP_ID IN (select distinct MEMBERSHIP_ID from UNNATI_MEMBER_ENROLLMENT where CUSTOMER_CODE in (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in(select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) union all select DISTINCT MEMBERSHIP_ID FROM  UNNATI_MEMBER_ENROLLMENT WHERE CUSTOMER_CODE in (select ORG_LEVEL_ID from cms_organization_level where PARENT_ID in (select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='" + UserCode + "'))) ";

        }
        else {
            WhereClause = " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + "  "
        }
        var Data = JSON.stringify({
            ID: UserCode,
            UserCode: UserCode,
            ReportName: "UnnatiPointBalance",
            WhereClause: WhereClause,
            "Type": "Get"

        });

        DIMSFactory.SaveColumnEditingData_InputParameter("UnnatiPointBalance", UserCode, " where POINT_BALANCE>=" + $scope.MinimumBalancePt + " and POINT_BALANCE<=" + $scope.MaximumBalancePt + " ", Data, "PointBalanceReportList");
        HideLoader();



    }

});