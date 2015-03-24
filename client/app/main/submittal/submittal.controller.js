'use strict';

angular.module('qiApp').controller('SubmittalCtrl', function($scope, $http, $stateParams, Auth) {
    //$scope.project._id = $stateParams.projectID;
    $scope.isSubmittalFormView = false;
    $scope.viewOnly = false;
    $scope.projectInfo = {};
    $scope.userInfo = {};
    $scope.submittals = [];
    $scope.projectUsers = [];
    $scope.approver = {};
    $scope.distributor = {};
    $scope.distributors = [];
    $scope.createSubmittalForm = {
        submittal_attachments: [],
        link_distributors: []
    };
    // get project info
    $scope.getProjectInfo = function() {
        $http.get("/api/projects/" + $scope.project._id).success(function(data) {
            $scope.projectInfo.projectName = data.project_name;
            $scope.projectInfo.projectAddress = data.project_address;
        }).error(function(data) {

        })
    };
    // get user info
    $scope.getUserInfo = function() {
        Auth.getCurrentUser().$promise.then(function(data) {
            $scope.userInfo = data;
        })
    };
    // get submittals
    $scope.getSubmittals = function() {
        $http.get("/api/submittals").success(function(data) {
            for (var item in data) {
                if (data[item].submittal_issue_date) {
                    data[item].submittal_issue_date = moment(data[item].submittal_issue_date).format('MM.DD.YY');
                }
                if (data[item].submittal_due_date) {
                    data[item].submittal_due_date = moment(data[item].submittal_due_date).format('MM.DD.YY');
                }
                if (data[item].submittal_response_date) {
                    data[item].submittal_response_date = moment(data[item].submittal_response_date).format('MM.DD.YY');
                }
            }
            $scope.submittals = data;
        }).error(function(data) {

        })
    };
    // get project users
    $scope.getProjectUsers = function() {
        $http.get("/api/users").success(function(data) {
            $scope.projectUsers = data;
        }).error(function(data) {

        });
    };
    // goto create submittal form view
    $scope.gotoCreateSubmittalForm = function(resetForm, submittal) {
        if (resetForm) {
            $scope.createSubmittalForm = {
                link_distributors: [],
                submittal_attachments: []
            };
            $scope.distributors = [];
        }
        if (submittal) {
            $scope.viewOnly = true;
            if (submittal.submittal_issue_date) {
                submittal.submittal_issue_date = new Date(moment(submittal.submittal_issue_date).format('YYYY-MM-DD'));
            }
            if (submittal.submittal_due_date) {
                submittal.submittal_due_date = new Date(moment(submittal.submittal_due_date).format('YYYY-MM-DD'));
            }
            if (submittal.submittal_response_date) {
                submittal.submittal_response_date = new Date(moment(submittal.submittal_response_date).format('YYYY-MM-DD'));
            }
            if (submittal.link_approver) {
                $http.get("/api/users/" + submittal.link_approver).success(function(data) {
                    $scope.approverView = data;
                })
            }
            if (submittal.link_distributors) {
                for (var item in submittal.link_distributors) {
                    $http.get("/api/users/" + submittal.link_distributors[item]).success(function(data) {
                        $scope.distributors.push(data);
                    })
                }
            }
            $scope.createSubmittalForm = submittal;
            $scope.isSubmittalFormView = true;
        } else {
            $scope.isSubmittalFormView = true;
        }
    };
    // leave create submittal form view
    $scope.leaveCreateSubmittalForm = function(resetForm) {
        if ($scope.viewOnly) {
            resetForm = true;
            $scope.viewOnly = false;
        }
        if (resetForm) {
            $scope.createSubmittalForm = {
                link_distributors: [],
                submittal_attachments: []
            };
            $scope.distributors = [];
        }
        $scope.getSubmittals();
        $scope.isSubmittalFormView = false;
    };
    // handle selecting multiple distributors
    $scope.$watchCollection("distributor", function(oldVal, newVal) {
        if ($scope.distributor.selected) {
            $scope.distributors.push($scope.distributor.selected);
            for (var item in $scope.projectUsers) {
                if ($scope.projectUsers[item]._id === $scope.distributor.selected._id) {
                    $scope.projectUsers.splice(item, 1);
                }
            }
        }
    });
    // select PDF file(s)
    $scope.pickPDF = function() {
        filepicker.setKey("Ash9bU3IkR1Cf41AiwTAjz");
        filepicker.pick({
            extension: '.pdf',
            container: 'modal',
            services: ['COMPUTER']
        }, function(Blob) {
            $scope.$apply(function() {
                $scope.createSubmittalForm.submittal_attachments.push({
                    pdf_file_name: Blob.filename,
                    pdf_url: Blob.url
                });
            });
        }, function(FPError) {
            console.log(FPError.toString());
        });
    };
    $scope.removeDistributorList = function(distributor) {
        for (var item in $scope.distributors) {
            if ($scope.distributors[item]._id === distributor._id) {
                $scope.distributors.splice(item, 1);
            }
        }
    };
    $scope.removeAttachmentList = function(attachment) {
        for (var item in $scope.createSubmittalForm.submittal_attachments) {
            if ($scope.createSubmittalForm.submittal_attachments[item].pdf_url === attachment.pdf_url) {
                $scope.createSubmittalForm.submittal_attachments.splice(item, 1);
            }
        }
    };
    // submit submittal form
    $scope.createSubmittal = function(form) {
        if ($scope.approver.selected) {
            $scope.createSubmittalForm.link_approver = $scope.approver.selected._id;
        }
        if ($scope.distributors.length !== 0) {
            for (var item in $scope.distributors) {
                $scope.createSubmittalForm.link_distributors.push($scope.distributors[item]._id);
            }
        }
        if ($scope.createSubmittalForm._submittal_description2) {
            $scope.createSubmittalForm.submittal_description += $scope.createSubmittalForm._submittal_description2;
        }
        $http.post("/api/submittals", $scope.createSubmittalForm).success(function(data) {
            $scope.createSubmittalForm = {
                link_distributors: [],
                submittal_attachments: []
            };
            $scope.distributors = [];
            $scope.approver = {};
            $scope.distributor = {};
            $scope.getSubmittals();
            $scope.getProjectUsers();
            $scope.isSubmittalFormView = false;
        }).error(function(data) {

        });
    };
    // delete submittal
    $scope.deleteSubmittal = function(form) {
        $http.delete("/api/submittals/" + $scope.createSubmittalForm._id).success(function(data) {
            $scope.leaveCreateSubmittalForm(true)
            console.log("submittal deleted");
        }).error(function(data) {

        });
    };
});
