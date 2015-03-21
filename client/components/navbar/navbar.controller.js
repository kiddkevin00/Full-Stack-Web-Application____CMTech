'use strict';

angular.module('qiApp').controller('NavbarCtrl', function($rootScope,$scope, socket,$http,$location, Auth,$state, $modal, $log) {
    // init view control
    $scope.isCollapsed = true;
    // $scope.isLoggedIn = Auth.isLoggedIn;
    // $scope.isAdmin = Auth.isAdmin;

    // init
    $scope.pickProject = function(){
        if(!$rootScope.project) {
            $state.go('project');
            return;
        }
        if($state.current.name === 'project') return $state.go('main.home',{projectID : $rootScope.project._id});
        $state.go($state.current.name,{projectID : $rootScope.project._id});
//        if ($state.current)
//        $http.get('/api/projects/' + $rootScope.project._id).success(function(data){
//          $rootScope.project = data;
//          socket.syncUpdateSingle("project",$scope.project);
//           $state.go($state.current.name,{projectID : $rootScope.project._id});
//        });
    }
    $scope.getCurrentUser = Auth.getCurrentUser;
    // logout
    $scope.logout = function() {
        Auth.logout();
        $location.path('/');
    };
    // login modal
    $scope.loginModal = function () {
        var modalInstance = $modal.open({
            templateUrl: "components/modal/modal_login.html",
            size: "md",
            controller: LoginModalCtrl
        });
    };
    // login modal controller
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

    // FOR TESTING ONLY
//    $scope.items = [
//        'The first choice!',
//        'And another choice for you.',
//        'but wait! A third!'
//    ];
//
//    $scope.status = {
//        isopen: false
//    };
//
//    $scope.toggled = function(open) {
//        $log.log('Dropdown is now: ', open);
//    };
//
//    $scope.toggleDropdown = function($event) {
//        $event.preventDefault();
//        $event.stopPropagation();
//        $scope.status.isopen = !$scope.status.isopen;
//    };

});