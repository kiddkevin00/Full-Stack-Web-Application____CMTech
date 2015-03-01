'use strict';

angular.module('qiApp').controller('ScheduleCtrl', function($scope, $stateParams) {
  $scope.projectID = $stateParams.projectID;
  $scope.updateProjectForm = {};
  $scope.gotoUpdateProjectForm = function(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

  };
  $scope.leaveUpdateProjectForm = function() {

  }



  $scope.addPerson = function(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

});

