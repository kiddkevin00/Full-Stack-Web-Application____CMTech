'use strict';

angular.module('qiApp').controller('ScheduleCtrl', function($scope, $stateParams, $http, $modal, socket) {
    //$scope.project._id = $stateParams.projectID;
    $scope.isOpen = true;

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
            $scope.updateProjectForm = data;
            delete $scope.updateProjectForm["link_daily_report"];
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
                if (!$scope.companies[d.link_company._id]) {
                    var temp = [];
                    temp.push(d.link_user);
                    socket.syncUpdateSingle("company", d.link_company);
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

    var UpdateCompanyModalCtrl = function($scope, $modalInstance, company) {
        $scope.company = company;
        $scope.createCompany = function(form) {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $http.put('/api/companies/' + $scope.company._id, $scope.company).then(function(data) {
                    $modalInstance.close(data.data);
                });
            } else {
                console.log("Form Invalid");
            }
        };
        $scope.cancel = function() {
            $modalInstance.close();
        };

    };
    $scope.updateCompany = function(id, company) {
        var new_company = {
            _id: id,
            company_name: company.company_name,
            company_title: company.company_title,
            company_address: company.company_address
        }
        var modalInstance = $modal.open({
            templateUrl: "/components/modal/modal_updatecompany.html",
            size: "md",
            controller: UpdateCompanyModalCtrl,
            resolve: {
                company: function() {
                    return new_company;
                }
                // user : function(){
                //   return user;
                // }
            }
        });
        modalInstance.result.then(function(data) {
            if (data) {
                _.merge(company, data);
            }
        });
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
    var UpdatePersonModalCtrl = function($scope, $modalInstance, user, $http) {
        $scope.user = user;
        $scope.createPerson = function() {
            $http.put('/api/users/' + user._id, $scope.user).success(function(data) {
                $modalInstance.close(data.data);
            })
        };
        $scope.cancel = function() {
            $scope.viewOnly = true;
            $modalInstance.close(false);
        };
        // company section

        // persons section
        $scope.projectUsers = [];
        $scope.getProjectUsers = function() {
            $http.get("/api/tbl_user_company_projects/project/" + $scope.project._id).success(function(data) {
                $scope.projectAllInfo = data;
                $scope.companies = {};
                data.forEach(function(d) {
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
    }
});

