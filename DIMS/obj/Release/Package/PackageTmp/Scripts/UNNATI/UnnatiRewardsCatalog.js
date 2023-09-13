DIMS.controller('UnnatiRewardsCatalogPointsCtrl', function ($scope, $location, DIMSFactory, DIMSUnnatiFactory, $compile) {
    //var UserCode = $("#USERCODE_UnnatiReward").val();
    //var UserType = $("#USERTYPE_UnnatiReward").val();
    // UserCode = "561";

    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };


});