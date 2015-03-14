'use strict';

angular.module('qiApp').controller('HomeCtrl', function($rootScope, $scope, $http, $modal, $location, Auth) {
    // sign up modal
    $scope.signupModal = function() {
        var modalInstance = $modal.open({
            templateUrl: "/components/modal/modal_signup.html",
            size: "md",
            controller: SignupModalCtrl,
            resolve: {
                roles: function() {
                    return $http.get('/api/users/roles/info').then(function(data) {
                        return data.data;
                    })
                }
            }
        });
        modalInstance.result.then(function(ctrl) {
            if (ctrl) {
                console.log("modal closed");
            }
        });
    };
    // sign up controller
    var SignupModalCtrl = function($scope, $modalInstance, Auth, $location, roles) {
        $scope.roles = roles;
        $rootScope.getCompanies = function() {
            $http.get("api/companies").success(function(data) {
                $scope.companies = data;
            }).error(function(data) {
                console.log("Error on Companies GET API")
            });
        };

        $scope.company = {};
        $scope.user = {};
        $scope.errors = {};
        $scope.pickImage = function() {
            filepicker.setKey("Ash9bU3IkR1Cf41AiwTAjz");
            filepicker.pick({
                mimetypes: ['image/*'],
                container: 'modal',
                services: ['COMPUTER']
            }, function(Blob) {
                $scope.user.blob = Blob;
                filepicker.read(Blob, { base64encode: true }, function(imgdata) {
                    $scope.$apply(function() {
                        $scope.imageSrc = 'data:image/png;base64,' + imgdata;
                        console.log("Read successful!");
                    });
                }, function(fperror) {
                    console.log(fperror.toString());
                });
            }, function(FPError) {
                console.log(FPError.toString());
            });
        };
        $scope.signup = function(form) {
            $scope.submitted = true;
            if (form.$valid && $scope.user.blob) {
                if ($scope.user.password === $scope.user.confirmPassword) {
                    $scope.user.user_profile_url = $scope.user.blob.url;
                    Auth.createUser($scope.user).then(function() {
                        $location.path('/project');
                        $modalInstance.close(true);
                    }).catch(function(err) {
                        err = err.data;
                        $scope.errors = {};
                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function(error, field) {
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
        $scope.cancel = function() {
            $modalInstance.close(false);
        };
    };
    // login modal
    $scope.loginModal = function() {
        var modalInstance = $modal.open({
            templateUrl: "/components/modal/modal_login.html",
            size: "md",
            controller: LoginModalCtrl
        });
        modalInstance.result.then(function(ctrl) {
            if (ctrl) {
                console.log("Form Submitted");
            }
        });
    };
    // login modal controller
    var LoginModalCtrl = function($scope, $modalInstance, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};
        $scope.login = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.login({
                    user_email: $scope.user.user_email,
                    password: $scope.user.password
                }).then(function() {
                    $location.path('/project');
                    $modalInstance.close(true);
                }).catch(function(err) {
                    $scope.errors.other = err.message;
                });
            } else {
                console.log("Form Invalid")
            }
        };
        $scope.cancel = function() {
            $modalInstance.close(false);
        };
    };
    // slide show
    $scope.myInterval = 5000;
    $scope.slides = [];
    for (var item = 1; item <= 4; item++) {
        $scope.slides.push({image: "/assets/images/s" + item + ".jpg"});
    }
});
