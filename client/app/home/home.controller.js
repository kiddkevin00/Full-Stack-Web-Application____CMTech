'use strict';

angular.module('qiApp').controller('HomeCtrl', function ($rootScope, $scope, $http, $modal, $location, Auth) {
    $scope.signupModal = function () {
        var modalInstance = $modal.open({
            templateUrl: "/components/modal/modal_signup.html",
            size: "md",
            controller: SignupModalCtrl
        });
        modalInstance.result.then(function (ctrl) {
            if (ctrl) {
                console.log("modal closed");
            }
        });
    };
    var SignupModalCtrl = function ($scope, $modalInstance, Auth, $location) {
        $rootScope.getCompanies();
        $rootScope.getCompanies = function () {
            $http.get("api/companies").success(function (data) {
//                console.log(data)
                $scope.companies = data;
            }).error(function (data) {
                console.log("Error on Companies GET API")
            });
        };

        $scope.company = {};
        $scope.user = {};
        $scope.errors = {};
        $scope.pickImage = function () {
            filepicker.setKey("Ash9bU3IkR1Cf41AiwTAjz");
            filepicker.pick({
                mimetypes: ['image/*'],
                container: 'modal',
                services: ['COMPUTER']
            }, function (Blob) {
                $scope.user.blob = Blob;
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
        $scope.signup = function (form) {
            $scope.submitted = true;
            if (form.$valid && $scope.user.blob) {
                if ($scope.user.password === $scope.user.confirmPassword) {
                    $scope.user.user_profile_url = $scope.user.blob.url;
                    Auth.createUser($scope.user).then(function () {
                        $location.path('/project');
                        $modalInstance.close(true);
                    }).catch(function (err) {
                        err = err.data;
                        $scope.errors = {};
                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
                } else {
                    alert("Confirm password and password don't match!");
                }
            } else {
                console.log("Form Invalid");
            }
        };
        $scope.cancel = function () {
            $modalInstance.close(false);
        };

        $scope.createCompanyModal = function () {
            var modalInstance = $modal.open({
                templateUrl: "/components/modal/modal_createcompany.html",
                size: "md",
                controller: CreateCompanyModalCtrl
            });
            modalInstance.result.then(function (ctrl) {
                if (ctrl) {
                    console.log("modal closed");
                }
            });
        };
    };

    var CreateCompanyModalCtrl = function ($rootScope, $scope, $modalInstance) {
        $scope.company = {};
        $scope.errors = {};
        $http.get("/api/companies/roles/info").success(function (data) {
//            console.log(data);
            $scope.companyRoles = data;
        }).error(function (data) {

        });
        $scope.createCompany = function (form) {
            if (form.$valid) {
                //                console.log($scope.company);
                // (TODO) HTTP POST REQUEST TO CREATE A COMPANY
                $http.post("/api/companies", $scope.company).success(function (data) {
                    console.log(data);
                    $rootScope.getCompanies();
                    $modalInstance.close(true);

                }).error(function (data) {

                });
                // (TODO) UPDATE ROOTSCOPE FOR COMPANY LIST

            } else {
                console.log("Form Invalid");
            }
        };
        $scope.cancel = function () {
            $modalInstance.close(false);
        };
    };

    $scope.loginModal = function () {
        var modalInstance = $modal.open({
            templateUrl: "/components/modal/modal_login.html",
            size: "md",
            controller: LoginModalCtrl
        });
        modalInstance.result.then(function (ctrl) {
            if (ctrl) {
                console.log("Form Submitted");
            }
        });
    };
    var LoginModalCtrl = function ($scope, $modalInstance, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};
        $scope.login = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.login({
                    user_email: $scope.user.user_email,
                    password: $scope.user.password
                }).then(function () {
                    $location.path('/project');
                    $modalInstance.close(true);
                }).catch(function (err) {
                    $scope.errors.other = err.message;
                });
            } else {
                console.log("Form Invalid")
            }
        };
        $scope.cancel = function () {
            $modalInstance.close(false);
        };
    };
});
