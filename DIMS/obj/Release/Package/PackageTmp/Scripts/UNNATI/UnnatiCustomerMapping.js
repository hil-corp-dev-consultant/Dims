// DEVELOPED BY :SHIVA KIRAN
// ORGANISATION :ENVISION
// CLIENT: HIL 
// CREATED DATE :14-04-2016
// MODIFIED DATE:14-04-2016

// IT IS USED FOR UNNATI USER MAPPING SCREEN
DIMS.controller('UnnatiCustomerMappingCtrl', function ($scope, $location, DIMSUnnatiFactory, $compile) {
    var UserCode = $("#USERCODE_UnnatiCustomerMapping").val();
    var UserType = $("#USERTYPE_UnnatiCustomerMapping").val();
   // UserCode = "561";
    $scope.CustomerMappingddl = "UnMapped";
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    var Data = JSON.stringify({

        UserCode: UserCode,
        CustomerType: $("#CustomerMappingddl").val()
    });
    var PreviousCustomerCode = "";
    var TableReference;
    ShowLoader();
    DIMSUnnatiFactory.getUnnatiEnrollmentData(Data).success(function (response) {
        //var Result = JSON.parse(response.tabledata);
        $("#UnnatiUserMapping_Table").dataTable().fnDestroy();
        var tableUserMapping = $("#UnnatiUserMapping_Table").DataTable({

            "bDestroy": true,
            "bSortable": true,
            'scroll': true, "order": [[0, "desc"]],
            "processing": true, // for show progress bar
            "serverSide": true, // for process server side
            "filter": true, // this is for disable filter (search box)
            "orderMulti": false, // for disable multiple column at once
            
            "ajax": {
                "url": "../../Unnati/LoadUnnatiDashBoardData",
                "type": "POST",
                "datatype": "json"
            }
        , "columns": [
                        { "data": "Membership ID", "name": "Membership ID", "bSortable": "true" },
                        { "data": "Member Name", "name": "Member Name", "bSortable": "true" },
                        { "data": "Member Type", "name": "Member Type", "bSortable": "true" },
                        { "data": "Enrollment Date", "name": "Enrollment Date", "bSortable": "true" },
                        { "data": "Zone", "name": "Zone", "bSortable": "true" },
                        { "data": "District", "name": "District", "bSortable": "true" },
                        { "data": "State", "name": "State", "bSortable": "true" },
                        { "data": "Customer Code", "name": "Customer Code", "bSortable": "true" ,"class":"Edit"}

        ]
        });

        myCallbackFunction = function (updatedCell, updatedRow) {
            var MembershipID = InlineeditingTable.row(PreviousRowData).data();
          

            var Data1 = JSON.stringify({
                UserCode: UserCode,
                CustomerID: updatedCell.data(),
                MembershipID: MembershipID["Membership ID"]
            });
            DIMSUnnatiFactory.updateCustomerID(Data1).success(function (response) {
                var Result_CUSTOMERID = (response.tabledata);

                if (Result_CUSTOMERID != "") {
                    if (Result_CUSTOMERID == "Invalid Customer Code") {
                        alert("Invalid Customer Code");
                        var columns = InlineeditingTable.row(PreviousRowData).data();
                        columns[7] = InlinePreviousCellValue;
                        InlineeditingTable.row(PreviousRowData).data(columns).draw(false);
                        //InlineeditingTable.fnStandingRedraw();
                    }
                    else if (Result_CUSTOMERID == "CustomerID is already assigned to another membershipID") {
                        alert("CustomerID is already assigned to another membershipID");
                        var columns = InlineeditingTable.row(PreviousRowData).data();
                        columns[7] = InlinePreviousCellValue;
                        InlineeditingTable.row(PreviousRowData).data(columns).draw(false);
                    }
                    else if (Result_CUSTOMERID == "true") {
                        alert("Successfully Updated");
                        var columns = InlineeditingTable.row(PreviousRowData).data();
                        columns[7] = InlinePreviousCellValue;
                        InlineeditingTable.row(PreviousRowData).data(columns).draw(false);

                    } else if (Result_CUSTOMERID == "false") {
                        alert("Error in updation");
                        var columns = InlineeditingTable.row(PreviousRowData).data();
                        columns[7] = InlinePreviousCellValue;
                        InlineeditingTable.row(PreviousRowData).data(columns).draw(false);
                    }
                }


            });

        }
        tableUserMapping.MakeCellsEditable({
            "onUpdate": myCallbackFunction,
            "inputCss": 'my-input-class',
            "columns": [7],
            "allowNulls": {
                "columns": [7],
                "errorClass": 'error'
            },
            "confirmationButton": {
                "confirmCss": 'my-confirm-class',
                "cancelCss": 'my-cancel-class'
            },
             "onkeypress": 'OnlyNumber'
        });
        TableReference = tableUserMapping;
        HideLoader();
    });
   
    


    $scope.GetCustomerDetails = function () {
        var Data = JSON.stringify({
            UserCode: UserCode,
            CustomerType: $("#CustomerMappingddl").val()
        });
        var PreviousCustomerCode = "";
        ShowLoader();
        DIMSUnnatiFactory.getUnnatiEnrollmentData(Data).success(function (response) {
            TableReference.draw();
            HideLoader();
        });

    }


    $scope.DownloadFile = function (typeoffile) {

        var FileName = "Unnati_Customer_Mapping";
        

            var Data = JSON.stringify({
                UserCode: UserCode,
                CustomerType: $("#CustomerMappingddl").val(),
                ReportName: "Unnati_Customer_Mapping",
                "searchvalue": $('input[type=search]').val()

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
                    window.location.href = '../../Home/GenerateReport_Discounts';
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



});