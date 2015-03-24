'use strict';

angular.module('qiApp').controller('ScheduleCtrl', function($rootScope, $scope, $stateParams, $http, $modal) {
    //$scope.project._id = $stateParams.projectID;

    // project section
    $scope.viewOnly = true;
    $scope.updateProjectForm = {};
    $scope.getProjectInfo = function() {
        $http.get("/api/projects/" + $scope.project._id).success(function(data) {
            if (data.project_plan_start) {
                data.project_plan_start = new Date(moment(data.project_plan_start).format('YYYY-MM-DD'));
            }
            if (data.project_plan_complete) {
                data.project_plan_complete = new Date(moment(data.project_plan_complete).format('YYYY-MM-DD'));
            }
            delete data["link_daily_report"];
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
        console.log($scope.updateProjectForm)
        $http.put("/api/projects/" + $scope.project._id, $scope.updateProjectForm).success(function(data) {
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
        $http.get("/api/tbl_user_company_projects/project/" + $scope.project._id).success(function(data) {
            $scope.projectAllInfo = data;
            $scope.companies = {};
            data.forEach(function(d) {
                console.log(d)
                if (!$scope.companies[d.link_company._id]) {
                    var temp = [];
                    temp.push(d.link_user);
                    $scope.companies[d.link_company._id] = {
                        company_name: d.link_company.company_name,
                        company_title: d.link_company.company_title,
                        company_address: d.link_company.company_address,
                        users: temp
                    }
                } else {
                    $scope.companies[d.link_company._id].users.push(d.link_user);
                }
            });
        }).error(function(data) {

        });
    };
    $scope.createPersonModal = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

    };
    $scope.updatePersonModal = function(user) {
        // if (event) {
        //   event.preventDefault();
        //   event.stopPropagation();
        // }
        var modalInstance = $modal.open({
            templateUrl: "/components/modal/modal_updateuser.html",
            size: "md",
            controller: UpdatePersonModalCtrl,
            resolve: {
                user: function() {
                    return user;
                }
            }
        });
        modalInstance.result.then(function(ctrl) {
            if (ctrl) {

            }
        });
    };
    var UpdatePersonModalCtrl = function($scope, $modalInstance, user) {
        $scope.user = user;
        $scope.createPerson = function() {

        };
        $scope.cancel = function() {

        };

    };

});

