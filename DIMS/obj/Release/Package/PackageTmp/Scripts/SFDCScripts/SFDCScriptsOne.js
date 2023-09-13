
DIMS.factory('DIMSSFDCFactoryOne', function ($http) {
    return {
        getTempData: function () {
            return $http.get('../../Home/getData');
        },
        getMasterData: function (masterType) {
            return $http({ url: '../../Home/getMasterData', method: 'POST', data: { MasterType: masterType } });
        }
    }

});
var CreateTargetScope = "";
DIMS.controller('CreateTargetControl', function ($scope, $location, DIMSSFDCFactoryOne, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Create Target" };
    $scope.go = function (path) {
        $location.path(path);
    };
    CreateTargetScope = $scope;
    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var DocumentCode = "CRT";
        var PrdCategoryCode = "";
        var PrdTypeCode = "";
        var Data = JSON.stringify({
            MasterType: MasterType,
            DocumentCode: DocumentCode,
            UserCode: $("#UserCode").val(),
            UserType: $("#SessionUserTypeCode").val()
        });
        if (MasterType == "StateMasterInZone") {
            var ZonalCode = $("#ZonalCode").val();
            Data = JSON.stringify({
                MasterType : 'StateMasterInZone',
                ZoneCode: ZonalCode
            });
        }
        DIMSSFDCFactoryOne.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }

    angular.element(document).ready(function () {

        if ($routeParams.ID == "" || $routeParams.ID == undefined || $routeParams.ID == null) {
            $("#FormIdentity").val("");
        }
        else {

            $("#FormIdentity").val($routeParams.ID);
            GetCreateTargetForEdit($routeParams.ID);

        }
    });
});

function GetState(obj) {
    CreateTargetScope.$apply(function () {
        $("#StateCode").val($(obj).children().eq(1).html());
        $("#StateName").val($(obj).children().eq(2).html());

        $("#StateHeadEmpCode").val($(obj).children().eq(3).html());
        $("#StateHeadName").val($(obj).children().eq(4).html());

        $("#CreateTargetTable tbody").empty();

        GetChildTableData();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


function GetZone(obj) {
    CreateTargetScope.$apply(function () {

        $("#ZonalCode").val($(obj).children().eq(1).html());
        $("#ZonalName").val($(obj).children().eq(2).html());


        $("#StateCode").val("");
        $("#StateName").val("");

        $("#StateHeadEmpCode").val("");
        $("#StateHeadName").val("");
        $("#StateTarget").val("");

        $("#CreateTargetTable tbody").empty();
        $("#CreateTargetTable tbody").remove();

        $('#CreateTargetTable').DataTable({
            'bDestroy': true,
            'bFilter': false,
            'scroll': true,
            'paging': false,
            'ordering': false,
            'info': false
        });

        //GetChildTableData();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}




DIMS.controller('CreateTargetListControl', function ($scope, $location, DIMSSFDCFactoryOne, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Create Target" };
    $scope.go = function (path) {
        $location.path(path);
    };

    var Data = JSON.stringify({
        MasterType: "CreateTargetList",
        ID: ""
    });

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
    });

    $('#CreateTargetList').dataTable();

    //DIMSSFDCFactory.getMasterData(Data).success(function (response) {

    //    $('#CreateTargetList tbody').empty();
    //    $("#CreateTargetList").DataTable();

    //    var Result = JSON.parse(response.tabledata);

    //    for (var i = 0; i < Result.length; i++) {
    //        $('#CreateTargetList').dataTable().fnAddData(
    //            [
    //                Result[i]["ID"],
    //                Result[i]["ZonalSalesHead"],
    //                Result[i]["StateName"],
    //                Result[i]["StateHeadEmpCode"],
    //                Result[i]["StateHeadName"],
    //                Result[i]["MonthYear"],
    //                Result[i]["StateTarget"]

    //            ]);
    //    }

    //    $('#CreateTargetList tbody').on('click', 'tr', function () {
    //        try {
    //            var ID = $(this).find('td:eq(0)').text();
    //            if ($(this).hasClass('selected')) {
    //                $(this).removeClass('selected');
    //            }
    //            else {
    //                $("#CreateTargetList").DataTable().$('tr.selected').removeClass('selected');
    //                $(this).addClass('selected');
    //            }
    //            if (ID != "") {
    //                var scope = angular.element($("#CreateTargetID")).scope();
    //                scope.$apply(function () {
    //                    scope.go("CreateTarget/" + ID);
    //                })
    //            }
    //        }
    //        catch (e) {
    //            alert("Error : " + e);
    //        }
    //    });
    //});
});


DIMS.controller('SalesProcessDashboard', function ($scope, $location, DIMSSFDCFactoryOne, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Create Target" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };

});

DIMS.controller('RevenueDashboard', function ($scope, $location, DIMSSFDCFactoryOne, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "RevenueDashboard" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
});