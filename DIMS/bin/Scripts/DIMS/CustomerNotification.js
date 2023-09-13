
function GetCustomerNotification() {
    var LoggedType = $("#LoggedinUserType").val();

    if (LoggedType == "STOCKIST") {
        GetCustomerNotificationFromDB();
        $("#CustomerNotificationList").modal('show');
    }
}


function GetCustomerNotificationFromDB() {
    var LoggedType = $("#LoggedinUserType").val();

    if (LoggedType == "STOCKIST") {

        $.ajax({
            type: 'POST',
            url: '../Users/GetCustomerNotificationCount',
            async: true,
            success: function (response) {
                if (response == "") {
                }
                else {
                    response = JSON.parse(response);

                    var TotalCount = 0;
                    var HTMLCode = "";

                    for (var i = 0; i < response.length; i++) {
                        TotalCount = TotalCount + parseInt(response[i]["COUNT"]);

                        HTMLCode = HTMLCode + "<tr>";

                        HTMLCode = HTMLCode + "<td onclick='GetNotificationsList(\"" + response[i]["MODULE_NAME"] + "\")' style='padding-left:5%;'> You have " + response[i]["COUNT"] + " " + response[i]["MODULE_NAME"] + " Notifications</td>"

                        HTMLCode = HTMLCode + "</tr>";
                    }

                    $("#CustomerNotificationTable").empty();
                    $("#CustomerNotificationTable").append(HTMLCode);
                    $("#NotificationCount").text(TotalCount);

                }
            }
        });

    }
    else {
    }
}



function GetNotificationsList(ModuleName) {
    /*
    $.ajax({
        type: 'POST',
        url: '../Users/GetCustomerNotificationList',
        data: { ModuleName: ModuleName },
        async: true,
        success: function (response) {
        }
    });
    */

}