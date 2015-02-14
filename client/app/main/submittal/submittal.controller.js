'use strict';

angular.module('qiApp').controller('SubmittalCtrl', function ($scope, $location) {
    $scope.projectID = $location.path().substring($location.path().indexOf("/", 1) + 1);
    $scope.isCreatingSubmittal = false;
    $scope.createSubmittalView = function() {
        $scope.isCreatingSubmittal = true;
    };
    $scope.createSubmittal = function() {
        // TODO..

    }
    $scope.leaveCreateSubmittal = function() {
        $scope.isCreatingSubmittal = false;
    };
});
