
var SessionUserCodeName = "";
var SessionUserCode = "";
var Noti_SessionUserType = "";
var NotificationFact;
DIMS.factory('DIMSNotificationFact', function ($http) {
    return {
        getTempData: function () {
            return $http.get('../../Home/getData');
        },
        getMasterData: function (masterType) {
            return $http({ url: '../../Home/getMasterData', method: 'POST', data: { MasterType: masterType } });
        },
        SendNotificationData: function (data) {
            return $http({ url: '../../Home/SendNotification', method: 'POST', data: { data: data } });
        },
        GetNotificationData: function (Data) {
            return $http({ url: '../../Home/GetNotificationData', method: 'POST', data: { data: Data } });
        },
        updateNotificationData: function (Data) {
            return $http({ url: '../../Home/updateNotificationData', method: 'POST', data: { data: Data } });
        }
    }
});





DIMS.controller('Notification', function ($scope, $location, DIMSNotificationFact) {
    var table;
    // var table12;
    NotificationFact = DIMSNotificationFact;
    angular.element(document).ready(function () {
        var width = $(window).width(), height = $(window).height();//---------
        var totalheight = height - 191;
        // var totalheight = height - 148;//--------    
        if (height <= 800) {
            totalheight = height - 148;
        }
        $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
        $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------

        table = $('#NotificationList').DataTable({
            scrollY: "200px",
            scrollX: true,
            scrollCollapse: true,
            paging: true,
            fixedColumns: {
                leftColumns: 0
            },
            "aaSorting": []
        });

        //table12 = $('#Manual_Notification').DataTable({
        //    scrollY: "200px",
        //    scrollX: true,
        //    scrollCollapse: true,
        //    paging: true,
        //    fixedColumns: {
        //        leftColumns: 0
        //    },
        //    "aaSorting": []
        //});
        ShowLoader();
        var Data = JSON.stringify({
            ListType: "NotificationList",
            User_Code: SessionUserCode,
            User_Type: Noti_SessionUserType,
            FilterValue: "NO"
        });
        DIMSNotificationFact.GetNotificationData(Data).success(function (res) {
            if ((res != "Session is Fail or Error Occured") && (res != "No Data") && (res != "")) {
                var Result = JSON.parse(res);
                if (Result.CMS_TABLE != "") {
                    $('#NotificationList').dataTable().fnClearTable();
                    for (var i = 0; i < Result.CMS_TABLE.length; i++) {
                        if (Noti_SessionUserType == "") {
                            $('#NotificationList').dataTable().fnAddData([Result.CMS_TABLE[i]["ID"], Result.CMS_TABLE[i]["SEND_FROM"], Result.CMS_TABLE[i]["SUBJECT"], Result.CMS_TABLE[i]["COMPLAINT_CUSTOMER_NAME"], Result.CMS_TABLE[i]["FSO_CONSERN_NAME"], Result.CMS_TABLE[i]["STATE_DESC"], Result.CMS_TABLE[i]["ZONE_NAME"], Result.CMS_TABLE[i]["NOTIFICATION_DATE"]]);
                        } else {
                            $('#NotificationList').dataTable().fnAddData([Result.CMS_TABLE[i]["ID"], Result.CMS_TABLE[i]["SEND_FROM"], Result.CMS_TABLE[i]["SUBJECT"], Result.CMS_TABLE[i]["COMPLAINT_CUSTOMER_NAME"], Result.CMS_TABLE[i]["FSO_CONSERN_NAME"], Result.CMS_TABLE[i]["STATE_DESC"], Result.CMS_TABLE[i]["ZONE_NAME"], Result.CMS_TABLE[i]["NOTIFICATION_DATE"]]);
                        }
                    }
                    HideLoader();
                } else {
                    $('#NotificationList').dataTable().fnClearTable();
                    HideLoader();
                }
                //if (Result.Manual != "") {
                //    $('#Manual_Notification').dataTable().fnClearTable();
                //    for (var i = 0; i < Result.Manual.length; i++) {
                //        $('#Manual_Notification').dataTable().fnAddData([Result.CMS_TABLE[i]["ID"], Result.Manual[i]["SEND_FROM"], Result.Manual[i]["SUBJECT"], Result.Manual[i]["EMPLOYEE_NAME"], Result.Manual[i]["NOTIFICATION_DATE"]]);
                //    }
                //} else {
                //    $('#Manual_Notification').dataTable().fnClearTable();
                //    HideLoader();
                //}

            } else {
                // $('#Manual_Notification').dataTable().fnClearTable();
                $('#NotificationList').dataTable().fnClearTable();
                HideLoader();
            }
        });
    });

});

DIMS.controller('AddNotification', function ($scope, $location, DIMSNotificationFact) {
    var width = $(window).width(), height = $(window).height();//---------
    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------   

    // $scope.SendDate = TODAY_DATE;

    //$scope.SendFrom = DisplayName + " <" + SessionValue + ">";
    //$scope.SendFrom = SessionUserCodeName;
    //$scope.Getdata = function (Methodname, MasterType, Heading) {
    //    var JsonData = JSON.stringify({
    //        "MasterType": MasterType
    //    });
    //    DIMSNotificationFact.getMasterData(JsonData).success(function (res) {
    //        getLookUpData_Notification(res, Methodname, Heading);
    //    });
    //}

    $scope.SendNotification = function () {

        var SendTo = [];
        $('input[name=optcheckbox_Sendto]:checked').map(function () {
            SendTo.push($(this).val());
        });
        SendTo = SendTo.toString();
        var SendDate = $('#SendDate').val();
        var SendFrom = $('#SendFrom').val();
        var Subject = $('#Subject').val();
        var Message = $('#Message').val();
        var checkboxischecked = $('input[type="checkbox"]').is(':checked');
        if (checkboxischecked == "false" || checkboxischecked == false) {
            alert("Please Select To");
        }
        else if (Subject == "" || Subject == null) {
            alert("Please enter subject");
        }
        else if (Message == "" || Message == null) {
            alert("Please enter Message");
        } else {
            ShowLoader();
            var data = JSON.stringify({
                "SendTo": SendTo,
                "SendDate": SendDate,
                "SendFrom": SendFrom,
                "Subject": Subject,
                "Message": Message
            });
            DIMSNotificationFact.SendNotificationData(data).success(function (res) {
                var response = res.tabledata;
                HideLoader();
                if (response == "Save") {
                    alert("Notification Sent Successfully");
                    $scope.go('Notification');
                } else if (response == "FALSE") {
                    alert("Error Occured");
                } else {
                    alert(response);
                }
            });

        }
    }

});

function getLookUpData_Notification(response, name, pageHeading) {

    if (response.tabledata == "[]" || response.tabledata == "") {
        alert("No Data Available");
        return;
    }
    //alert(response);
    //alert(name);
    //alert(pageHeading);
    var data = JSON.parse(response.tabledata);
    var element = angular.element('#LookUpModal');
    element.modal('show');
    $("#PopHeading").text(pageHeading);

    if (data == "") {

        $("#MasterStatus").text("No Records found");
        //$("#PopUpTable").dataTable().fnDestroy();
        $('#PopUpTable').empty();
    } else {
        //$('.modal-body').find('.btn btn-info').remove();
        $("#MasterStatus").text("");

        $("#PopUpTable").dataTable().fnDestroy();
        $('#PopUpTable').empty();

        var columns = addAllColumnHeaders(data, "PopUpTable");

        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr style="cursor:pointer;" />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {

                var cellValue = data[i][columns[colIndex]];
                if (colIndex == 1) {
                    cellValue = cellValue + " <input type='checkbox' data-value='' onclick=" + name + "(this," + cellValue + ") class='NotificationCheckedUsers'/>";
                }
                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#PopUpTable").append(row$);
        }

        $("#PopUpTable tr td:nth-child(1)").hide();
        $("#PopUpTable tr th:nth-child(1)").hide();

        var table = $("#PopUpTable").dataTable({
            "bDestroy": true,
            'scroll': true, "order": [[0, "desc"]]
        });
        $('<button type="button" class="btn btn-info" onclick="selectedUsers()">Done</button>').insertBefore('.table-responsive');

        $('#PopUpTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }
}

var TableValues = new Array();
var EmployeeCodes = new Array();
function GetNotification(obj, empcode) {
    EmployeeCodes.push({
        "EmployeeCode": empcode
    });
    var EmpCode = empcode + " < " + $(obj).parent().next().next().html() + " > ";
    TableValues.push(EmpCode);
}

function selectedUsers() {
    if (TableValues.length == 0) {
        alert("Please select atleast one User")
    } else {
        $('#SendTo').val(TableValues);
    }
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function NotificationFilterchange() {
    ShowLoader();
    var NotificationValue = $('#NotificationFilter').val();
    // alert(NotificationValue);
    var Data = JSON.stringify({
        ListType: "NotificationList",
        User_Code: SessionUserCode,
        User_Type: Noti_SessionUserType,
        FilterValue: NotificationValue
    });
    NotificationFact.GetNotificationData(Data).success(function (res) {
        if ((res != "Session is Fail or Error Occured") && (res != "No Data") && (res != "")) {
            var Result = JSON.parse(res);
            var READ_UNREAD_COUNT = 0;
            if (Result.CMS_TABLE != "") {
                $('#NotificationList').dataTable().fnClearTable();
                for (var i = 0; i < Result.CMS_TABLE.length; i++) {
                    $('#NotificationList').dataTable().fnAddData([Result.CMS_TABLE[i]["ID"], Result.CMS_TABLE[i]["SEND_FROM"], Result.CMS_TABLE[i]["SUBJECT"], Result.CMS_TABLE[i]["COMPLAINT_CUSTOMER_NAME"], Result.CMS_TABLE[i]["FSO_CONSERN_NAME"], Result.CMS_TABLE[i]["STATE_DESC"], Result.CMS_TABLE[i]["ZONE_NAME"], Result.CMS_TABLE[i]["NOTIFICATION_DATE"]]);
                    if (Result.CMS_TABLE[i].READ_UNREAD == "NO" || Result.CMS_TABLE[i].READ_UNREAD == "No" || Result.CMS_TABLE[i].READ_UNREAD == "no") {
                        READ_UNREAD_COUNT++;
                    }
                }
                console.log(READ_UNREAD_COUNT);
                if (READ_UNREAD_COUNT > 0) {
                    $('#read_unread_count').text(READ_UNREAD_COUNT);
                    $('#read_unread_count_textbox').val(READ_UNREAD_COUNT);
                }                
                HideLoader();
            } else {
                $('#NotificationList').dataTable().fnClearTable();
                HideLoader();
            }
            //if (Result.Manual != "") {
            //    $('#Manual_Notification').dataTable().fnClearTable();
            //    for (var i = 0; i < Result.Manual.length; i++) {
            //        $('#Manual_Notification').dataTable().fnAddData([Result.CMS_TABLE[i]["ID"], Result.Manual[i]["SEND_FROM"], Result.Manual[i]["SUBJECT"], Result.Manual[i]["EMPLOYEE_NAME"], Result.Manual[i]["NOTIFICATION_DATE"]]);
            //    }
            //} else {
            //    $('#Manual_Notification').dataTable().fnClearTable();
            //    HideLoader();
            //}

        } else {
            // $('#Manual_Notification').dataTable().fnClearTable();
            $('#NotificationList').dataTable().fnClearTable();
            HideLoader();
        }
    });
}

function updateNotificationData(notificationId) {
    //var notificationId = $('#notificationId').val();
    if ($('#notificationId').val() != "" && typeof $('#notificationId').val() != "undefined") {
        var Data = JSON.stringify({
            ID: notificationId
        });
        NotificationFact.updateNotificationData(Data).success(function (res) {
            if (res != "FALSE") {
                console.log("Notification Read");
                var READ_UNREAD_COUNT = 0;
                READ_UNREAD_COUNT = $('#read_unread_count_textbox').val() - 1;
                $('#read_unread_count').text(READ_UNREAD_COUNT);
                $('#read_unread_count_textbox').val(READ_UNREAD_COUNT);
            } else {
                console.log('Notification not updated');
            }
        });
    } else {
        console.log('Notification Id : ', $('#notificationId').val())
    }    
}

//var ajax_call = function () {
//    alert("asdf");
//    //your jQuery ajax code
//};

//var interval = 1000 * 60 * 1; // where X is your every X minutes


//setInterval(ajax_call, interval);