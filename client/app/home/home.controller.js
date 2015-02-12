'use strict';

angular.module('qiApp')
  .controller('HomeCtrl', function ($scope, $modal) {
  	$scope.signupModal = function () {
  	    var modalInstance = $modal.open({
  	        templateUrl: "/components/modal/modal_signup.html",
  	        size: "md",
  	        controller: SignupModalCtrl,
  	        resolved: {
  	            $location: function () {
  	                return $location;
  	            },
  	            Auth: function () {
  	                return Auth;
  	            }
  	        }
  	    });
  	    modalInstance.result.then(function (ctrl) {
  	        if (ctrl) {
  	            console.log("modal closed");
  	        }
  	    });
  	};

  	var SignupModalCtrl = function ($scope, $modalInstance, Auth, $location) {
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
  	           // alert("Please upload a photo!")
  	        } else if (form.$valid) {
  	            console.log("valid!");
  	            if ($scope.user.password === $scope.user.confirmPassword) {
  	                console.log("password matched!")
  	                Auth.createUser({
  	                    first_name: $scope.user.firstName,
  	                    last_name: $scope.user.lastName,
  	                    email: $scope.user.email,
  	                    password: $scope.user.password,
  	                    phone: $scope.user.phoneNumber,
  	                    profile_picture: $scope.user.blob.url
  	                }).then(function () {
  	                    $location.path('/main');
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
  	            console.log("form invalid!")
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
  	        controller: LoginModalCtrl,
  	        resolved: {
  	            $location: function () {
  	                return $location;
  	            },
  	            Auth: function () {
  	                return Auth;
  	            }
  	        }
  	    });
  	    modalInstance.result.then(function (ctrl) {
  	        if (ctrl) {
  	            console.log("modal closed");
  	        }
  	    });
  	}
  	var LoginModalCtrl = function ($scope, $modalInstance, Auth, $location) {
  	    $scope.user = {};
  	    $scope.errors = {};
  	    $scope.login = function (form) {
  	        $scope.submitted = true
  	        if (form.$valid) {
  	            Auth.login({
  	                email: $scope.user.email,
  	                password: $scope.user.password
  	            }).then(function () {
  	                $location.path('/project');
  	                $modalInstance.close(true);
  	            }).catch(function (err) {
  	                $scope.errors.other = err.message;
  	            });
  	        }
  	    };
  	    $scope.cancel = function () {
  	        $modalInstance.close(false);
  	    };
  	}
    $scope.message = 'Hello';
  });
