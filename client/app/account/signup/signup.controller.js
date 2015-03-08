'use strict';

angular.module('qiApp')
  .controller('SignupCtrl', function ($scope, Auth, $location,$stateParams, $http, $modal) {
    $scope.user = {};
    $scope.errors = {};
    $scope.companies = [];
   $http.get('/api/users/roles/info').success(function(data){
       $scope.roles = data;
   });
   $http.get("/api/messages/"+ $stateParams.messageId).success(function(data){
      $scope.user.user_email = data.message_email;
      $scope.projectId = data.message_project;
      $http.get("/api/tbl_user_company_projects/project/" + data.message_project).success(function(info){
        info.forEach(function(item){
          $scope.companies.push(item.link_company);
        });
      });
   });


    // $scope.$watch("showCompanyForm", function() {
    //   console.log($scope.showCompanyForm === true)
    // })
  
  $scope.showCompanyForm = "no";
  $scope.openModal = function() {
    var modalInstance = $modal.open({
        templateUrl: "/components/modal/modal_createcompany.html",
        size: "md",
        controller : function($scope) {
          $scope.createCompany = function (form) {
              $scope.submitted = true;
              if (form.$valid) {
                  $http.post('/api/companies/',$scope.company).then(function (data) {
                      $modalInstance.close(data);
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
                  console.log("Form Invalid");
              }
          };
        }
    });
    modalInstance.result.then(function (ctrl) {
        if (ctrl) {
            console.log("modal closed");
        }
    });
  };

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
              $http.post('/api/companies/' + $scope.projectId, $scope.company).then(function(company){
                $scope.user.link_projects = [];
                $scope.user.link_projects.push($scope.projectId);
                  Auth.createUser($scope.user).then(function (user) {
                      $http.post('/api/tbl_user_company_projects',{
                        link_user :  Auth.getCurrentUser()._id,
                        link_company : company._id,
                        link_project : $scope.projectId
                      }).success(function(){
                          $location.path('/project');
                      });
                  }).catch(function (err) {
                      err = err.data;
                      $scope.errors = {};
                      // Update validity of form fields that match the mongoose errors
                      angular.forEach(err.errors, function (error, field) {
                          form[field].$setValidity('mongoose', false);
                          $scope.errors[field] = error.message;
                      });
                  });
              }).catch(function(err){
                form.companyName.$setValidity('mongoose', false);
                $scope.errors.companyName = err.data;
              });
          }
      }
        // $scope.submitted = true;
        // if (form.$valid && $scope.user.blob) {
        //     if ($scope.user.password === $scope.user.confirmPassword) {
        //         $scope.user.user_profile_url = $scope.user.blob.url;
        //         Auth.createUser($scope.user).then(function () {
        //             $location.path('/project');
        //             $modalInstance.close(true);
        //         }).catch(function (err) {
        //             err = err.data;
        //             $scope.errors = {};
        //             // Update validity of form fields that match the mongoose errors
        //             angular.forEach(err.errors, function (error, field) {
        //                 form[field].$setValidity('mongoose', false);
        //                 $scope.errors[field] = error.message;
        //             });
        //         });
        //     } else {
        //         alert("Confirm password and password don't match!");
        //     }
        // } else {
        //     console.log("Form Invalid");
        // }
    };

  });
