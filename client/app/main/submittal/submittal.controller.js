'use strict';

angular.module('qiApp').controller('SubmittalCtrl', function ($scope, $location) {
    $scope.projectID = $location.path().substring($location.path().indexOf("/", 1) + 1);
    $scope.isCreatingSubmittal = false;
    $scope.createSubmittal = function() {
        $scope.isCreatingSubmittal = true;
    };
    $scope.leaveCreateSubmittal = function() {
        $scope.isCreatingSubmittal = false;
    }
});
