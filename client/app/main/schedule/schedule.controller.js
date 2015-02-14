'use strict';

angular.module('qiApp').controller('ScheduleCtrl', function ($scope, $stateParams) {
    $scope.projectID = $stateParams.projectID;
});
