'use strict';

angular.module('qiApp').controller('ChangeOrderCtrl', function ($scope, $stateParams) {
    $scope.projectID = $stateParams.projectID;
});
