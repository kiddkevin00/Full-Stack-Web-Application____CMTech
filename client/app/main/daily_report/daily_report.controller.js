'use strict';

angular.module('qiApp').controller('DailyReportCtrl', function ($scope, $stateParams) {
    $scope.projectID = $stateParams.projectID;
});
