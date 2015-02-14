'use strict';

angular.module('qiApp').controller('PunchlistCtrl', function ($scope, $stateParams) {
    $scope.projectID = $stateParams.projectID;
});
