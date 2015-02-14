'use strict';

angular.module('qiApp').controller('MainHomeCtrl', function ($scope, $stateParams) {
    $scope.projectID = $stateParams.projectID;
});
