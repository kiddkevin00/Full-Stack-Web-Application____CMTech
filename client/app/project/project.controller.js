'use strict';

angular.module('qiApp').controller('ProjectCtrl', function ($scope, $http, $modal, socket, Auth) {
        $scope.user = Auth.getCurrentUser();
        $scope.user.$promise.then(function () {
            $scope.user.rows = [];
            var row = [];
            for (var i = 0; i < $scope.user.projects.length; i++) {
                if (i % 3 === 0) {
                    if (row.length !== 0) {
                        $scope.user.rows.push(row);
                        row = [];
                    }
                    row.push($scope.user.projects[i]);
                } else {
                    row.push($scope.user.projects[i]);
                }
            }
            if (row.length !== 0) {
                $scope.user.rows.push(row);
            }
            console.log($scope.user.rows)
        });

        $scope.createProjectModal = function (form) {
            var modalInstance = $modal.open({
                templateUrl: "/components/modal/modal_createproject.html",
                size: "md",
                controller: CreateProjectModalCtrl,
                resolved: {
                    $location: function () {
                        return $location;
                    },
                    Auth: function () {
                        return Auth;
                    },
                    socket: function () {
                        return socket;
                    }

                }
            });
            modalInstance.result.then(function (ctrl) {
                if (ctrl) {
                    socket.syncUpdateUser(Auth.getCurrentUser());
                    console.log("hello", $scope.user.rows)
                    console.log("modal closed");
                }
            });
        };

        var CreateProjectModalCtrl = function ($scope, $modalInstance) {
            //                console.log(Auth)
            $scope.project = {};
            $scope.errors = {};
            $scope.selectImage = function () {
                filepicker.setKey("Ash9bU3IkR1Cf41AiwTAjz");
                filepicker.pick({
                    mimetypes: ['image/*', 'text/plain'],
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
            $scope.createProject = function () {
                console.log($scope.project.blob.url)
                $scope.submitted = true
                //            if (form.$valid) {
                var data = {
                    name: $scope.project.name,
                    number: $scope.project.number,
                    address: $scope.project.address,
                    city: $scope.project.city,
                    zip: $scope.project.zipcode,
                    project_url: $scope.project.blob.url
                };
                $http.post("/api/projects", data).success(function (data) {
                    $modalInstance.close(true);
                }).error(function (data) {


                });

                //                $modalInstance.close(true);
                //            }
            };
            $scope.cancel = function () {
                $modalInstance.close(false);
            }

        };
    });
