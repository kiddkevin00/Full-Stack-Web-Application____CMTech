'use strict';

angular.module('qiApp').controller('DailyReportCtrl', function ($scope, $stateParams) {
    $scope.projectID = $stateParams.projectID;
     uploadcare.SingleWidget('[role=uploadcare-uploader]').onChange(function(file) {
       if (file) {
         file.done(function(info) {
        // Handle uploaded file info.
           $scope.uuid = info.uuid;
         });
       };
     });
});
