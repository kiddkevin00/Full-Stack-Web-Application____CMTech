'use strict';

angular.module('qiApp').controller('DailyReportCtrl', function ($scope, $location) {
    $scope.projectID = $location.path().substring($location.path().indexOf("/", 1) + 1);
});
