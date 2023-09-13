DIMS.controller('UnnatiEmployeeRedemptionReportCtrl', function ($scope, $location, DIMSUnnatiFactory) {


    $scope.templatesettings = { HeaderTitle: "UnnatiEmployeeRedemptionReportCtrl" };
    $scope.go = function (path) {

        $location.path(path);
    };



});