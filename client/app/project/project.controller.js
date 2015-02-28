'use strict';

angular.module('qiApp').controller('ProjectCtrl', function ($scope, $http, $modal, socket, Auth, $location) {
    $scope.user = Auth.getCurrentUser();

    $scope.createProjectModal = function (form) {
        var modalInstance = $modal.open({
            templateUrl: "/components/modal/modal_createproject.html",
            size: "md",
            controller: CreateProjectModalCtrl
        });
        modalInstance.result.then(function (ctrl) {
            if (ctrl) {
                socket.syncUpdateUser(Auth.getCurrentUser());
                console.log("Form Submitted");
            }
        });
    };

    var CreateProjectModalCtrl = function ($scope, $modalInstance) {
        $scope.project = {};
        $scope.errors = {};
        $scope.pickImage = function () {
            filepicker.setKey("Ash9bU3IkR1Cf41AiwTAjz");
            filepicker.pick({
                mimetypes: ['image/*'],
                container: 'modal',
                services: ['COMPUTER']
            }, function (Blob) {
                $scope.project.blob = Blob;
                filepicker.read(Blob, { base64encode: true }, function (imgdata) {
                    $scope.$apply(function () {
                        $scope.imageSrc = 'data:image/png;base64,' + imgdata;
                        console.log("Read successful!");
                    });
                }, function (fperror) {
                    console.log(fperror.toString());
                });
            }, function (FPError) {
                console.log(FPError.toString());
            });
        };
        $scope.createProject = function (form) {
            console.log($scope.form.$error)
            $scope.submitted = true;
            if (form.$valid && $scope.project.blob) {
                $scope.project.project_image_url = $scope.project.blob.url;
                $http.post("/api/projects", $scope.project).success(function (data) {
                    $modalInstance.close(true);
                }).error(function (data) {

                });
                $modalInstance.close(true);
            } else {
                console.log("Form Invalid");
            }
        };
    };
    $scope.cancel = function () {
        $modalInstance.close(false);
    };

});

