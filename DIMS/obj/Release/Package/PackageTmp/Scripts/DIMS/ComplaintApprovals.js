DIMS.controller('ComplaintPendingApprovalCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Complaint Status Report" };
    $scope.go = function (path) {
        $location.path(path);
    };

});
DIMS.controller('ComplaintsAssigningCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Complaint Status Report" };
    $scope.go = function (path) {
        $location.path(path);
    };

});
DIMS.controller('ComplaintsApprovalReportCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Complaint Status Report" };
    $scope.go = function (path) {
        $location.path(path);
    };

});
DIMS.controller('PendingApprovalCommercialCtrl', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Complaint Status Report" };
    $scope.go = function (path) {
        $location.path(path);
    };

});