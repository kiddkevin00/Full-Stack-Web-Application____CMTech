'use strict';

angular.module('qiApp').controller('SubmittalCtrl', function ($scope, $stateParams) {
    $scope.projectID = $stateParams.projectID;
    $scope.isCreatingSubmittal = false;
    $scope.createSubmittalView = function() {
        $scope.isCreatingSubmittal = true;
    };
    $scope.createSubmittal = function(form) {
//        console.log($scope.createSubmittalForm)
        // (TODO) HTTP POST REQUEST..


    }
    $scope.leaveCreateSubmittal = function() {
        $scope.isCreatingSubmittal = false;
    };
});
