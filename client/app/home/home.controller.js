'use strict';

angular.module('qiApp').controller('HomeCtrl', function ($scope, $http, $modal, $location, Auth) {
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
        $scope.country = {};
        $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'}
        ];

        $scope.user = {};
        $scope.errors = {};
        $scope.selectImage = function () {
            filepicker.setKey("Ash9bU3IkR1Cf41AiwTAjz");
            filepicker.pick({
                mimetypes: ['image/*', 'text/plain'],
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
            if (!$scope.user.blob) {
                alert("Please upload a photo!")
            } else if (form.$valid) {
                if ($scope.user.password === $scope.user.confirmPassword) {
//                    console.log("password matched!")
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
        $scope.roles = [];
        $http.get("/api/companys/show/roles").success(function(data) {
            console.log(data)
        }).error(function(data) {

        });
        $scope.createCompany = function (form) {
            if (form.$valid) {
//                console.log($scope.company);
                // (TODO) HTTP POST REQUEST TO CREATE A COMPANY
                $http.post("/api/companys", $scope.company).success(function(data) {
                    console.log(data);
                }).error(function(data) {

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
