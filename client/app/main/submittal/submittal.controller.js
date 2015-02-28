'use strict';

angular.module('qiApp').controller('SubmittalCtrl', function ($scope, $http, $stateParams, Auth) {
    $scope.projectID = $stateParams.projectID;
    $scope.isSubmittalFormView = false;
    $scope.projectInfo = {};
    $scope.userInfo = {};
    $scope.submittals = [];
    console.log($scope.submittals)
    $scope.approver = {};
    $scope.distributor = {};
    $scope.distributors = [];
    $scope.createSubmittalForm = {
        submittal_attachments: []
    };

    // get project info
    $scope.getProjectInfo = function () {
        $http.get("/api/projects/" + $scope.projectID).success(function (data) {
//            console.log(data);

            $scope.projectInfo.projectName = data.project_name;
            $scope.projectInfo.projectAddress = data.project_address;
        }).error(function (data) {

        })
    };

    // get user info
    $scope.getUserInfo = function () {
        Auth.getCurrentUser().$promise.then(function (data) {
//            console.log(data);
//            $scope.userInfo = data;
        })
    };

    $scope.getSubmittals = function () {
        $http.get("/api/submittals").success(function (data) {
//            console.log(data);
            //            console.log(data.submittal_issue_date)
            //            data.submittal_issue_date = new Date(data.submittal_issue_date);
            //            console.log(data.submittal_issue_date)
            //            data.submittal_due_date = new Date(data.submittal_due_date);
            $scope.submittals = data;

        }).error(function (data) {

        })
    };

    $scope.getProjectUsers = function() {
        $http.get("/api/users").success(function(data) {
//            console.log(data);
            $scope.projectUsers = data;
        }).error(function(data) {

        });

    };

    $scope.gotoCreateSubmittalForm = function () {
        $scope.isSubmittalFormView = true;
    };
    $scope.leaveCreateSubmittal = function () {
        $scope.isSubmittalFormView = false;
    };

    $scope.$watchCollection("distributor", function(oldVal, newVal) {
        if ($scope.distributor.selected) {
            $scope.distributors.push($scope.distributor.selected);
        }
       console.log($scope.distributors);
    });

    $scope.pickPDF = function() {
        filepicker.setKey("Ash9bU3IkR1Cf41AiwTAjz");
        filepicker.pick({
            extension: '.pdf',
            container: 'modal',
            services: ['COMPUTER']
        }, function (Blob) {
            $scope.createSubmittalForm.submittal_attachments.push({
                pdf_file_name : Blob.filename,
                pdf_url : Blob.url
            });
            $scope.$apply();
        }, function (FPError) {
            console.log(FPError.toString());
        });
    };

    $scope.createSubmittal = function (form) {
        if ($scope.distributor.selected && $scope.approver.selected) {
            console.log($scope.distributor.selected._id, $scope.approver.selected._id);
            $scope.createSubmittalForm.link_approver = $scope.projectUser.selected._id;
            $scope.createSubmittalForm.link_distributors = $scope.distributor.selected._id;
        }

//        $http.post("/api/submittals", $scope.createSubmittalForm).success(function (data) {
//            console.log(data);
//            $scope.getSubmittals();
//            // (TODO) reset all previous input
//
//            $scope.isSubmittalFormView = false;
//        }).error(function (data) {
//
//        });
    };


});
