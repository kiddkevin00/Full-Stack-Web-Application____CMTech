'use strict';

angular.module('qiApp').controller('DailyReportCtrl', function ($scope, $stateParams, $http) {
    $scope.projectID = $stateParams.projectID;
    $scope.edit = false;
    $http.get('/api/projects/' + $scope.projectID).success(function(data){
    	$scope.project = data;
    });
    $http.get('/api/reports/project/'+ $scope.projectID).success(function(data){
    	$scope.reports = data;
    });
     uploadcare.SingleWidget('#concrete').onChange(function(file) {
       if (file) {
         file.done(function(info) {
        // Handle uploaded file info.
        console.log(info)
           $scope.uuid = info.uuid;
           $http.post('/api/reports',{id : info.uuid}).success(function(){
           	console.log("done");
           });
         });
       };
     });
     uploadcare.SingleWidget('#steel').onChange(function(file) {
       if (file) {
         file.done(function(info) {
        // Handle uploaded file info.
        console.log(info)
           $scope.uuid = info.uuid;
           $http.post('/api/reports',{id : info.uuid}).success(function(){
           	console.log("done");
           });
         });
       };
     });
});
