'use strict';

angular.module('qiApp').controller('ScheduleCtrl', function($scope, $stateParams, $http) {
    $scope.projectID = $stateParams.projectID;

    // project section
    $scope.viewOnly = true;
    $scope.updateProjectForm = {};
    $scope.getProjectInfo = function() {
        $http.get("/api/projects/" + $scope.projectID).success(function(data) {
            if (data.project_plan_start) {
                data.project_plan_start = new Date(moment(data.project_plan_start).format('YYYY-MM-DD'));
            }
            if (data.project_plan_complete) {
                data.project_plan_complete= new Date(moment(data.project_plan_complete).format('YYYY-MM-DD'));
            }
            $scope.updateProjectForm = data;

        }).error(function(data) {

        })
    };
    $scope.editUpdateProjectForm = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        $scope.viewOnly = false;

    };
    $scope.viewUpdateProjectForm = function() {
        $scope.viewOnly = true;

    };
    $scope.updateProjectInfo = function() {
        if ($scope.updateProjectForm._project_scope2) {
            $scope.updateProjectForm.project_scope += $scope.updateProjectForm._project_scope2;
        }
        if ($scope.updateProjectForm._project_scope3) {
            $scope.updateProjectForm.project_scope += $scope.updateProjectForm._project_scope3;
        }
        $http.put("/api/projects/" + $scope.projectID, $scope.updateProjectForm).success(function(data) {
            $scope.updateProjectForm = {};
            $scope.getProjectInfo();
            $scope.viewOnly = true;
        }).error(function(data) {

        });

    };
    $scope.cancel = function() {
        $scope.viewOnly = true;
        $scope.getProjectInfo();
    };
    // company section

    // persons section
    $scope.projectUsers = [];
    $scope.getProjectUsers = function() {
        $http.get("/api/users").success(function(data) {

            $scope.projectUsers = data;
            console.log($scope.projectUsers )
        }).error(function(data) {

        });
    };
    $scope.addPerson = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

});

