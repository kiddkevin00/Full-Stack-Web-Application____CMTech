'use strict';

angular.module('qiApp').controller('DailyReportCtrl', function ($rootScope,$scope, $stateParams, $http, socket, Auth) {
    //$scope.project._id = $stateParams.projectID;
    $scope.user = Auth.getCurrentUser();
    // $scope.steel_detail = [];
    // $scope.concrete_detail = [];
    // $scope.report_issues = [];
    // $scope.report_other_issues = [];
    // $scope.report_concrete = [];
    // $scope.report_steel = [];
    $scope.report = {
      report_concrete : {
        detail : []
      },
      report_steel : {
        detail :[]
      },
      report_create_date : new Date()
    };
    $http.get('/api/projects/' + $scope.project._id).success(function(data){
    	$scope.project = data;
      $scope.report.report_number = _.max(data.link_daily_report,function(item){
        return item.report_number;
      }).report_number + 1;
      if(!data.link_daily_report.length) $scope.report.report_number = 1;
      $scope.reports =_.groupBy(data.link_daily_report,function(item){
        item.report_create_date = new Date(item.report_create_date);
        var date = moment(item.report_create_date);
        item.day = date.format('dddd');
        item.format_date = date.format('MMM D,YYYY');
        return date.format('MMM YYYY');
      });
      //console.log(test)
      for(var  key in $scope.reports) {
         console.log(key);
         socket.syncUpdates('report',$scope.reports[key]);
      }
      
    	socket.syncUpdateSingle("project",$scope.project,function(){
          var data = $scope.project;
          $scope.report.report_number = _.max(data.link_daily_report,function(item){
            return item.report_number;
          }).report_number + 1;
          if(!data.link_daily_report.length) $scope.report.report_number = 1;
          $scope.reports =_.groupBy(data.link_daily_report,function(item){
            item.report_create_date = new Date(item.report_create_date);
            var date = moment(item.report_create_date);
            item.day = date.format('dddd');
            item.format_date = date.format('MMM D,YYYY');
            return date.format('MMM YYYY');
          });
      });
    });

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
     uploadcare.SingleWidget('#concrete').onChange(function(file) {
       if (file) {
         file.done(function(info) {
        // Handle uploaded file info.
           $scope.concrete_photo_uuid = info.uuid;
           $scope.concrete_imageSrc = info.originalUrl + "-/resize/170x100/";
           $scope.safeApply();
           // $http.post('/api/reports',{id : info.uuid}).success(function(){
           // 	console.log("done");
           // });
         });
       }
       else {
        uploadcare.SingleWidget('#concrete').value(null);
        $scope.concrete_imageSrc = "";
        $scope.safeApply();
       }
     });
     uploadcare.SingleWidget('#steel').onChange(function(file) {

       if (file) {
         file.done(function(info) {
        // Handle uploaded file info.
           $scope.steel_photo_uuid = info.uuid;
           $scope.steel_imageSrc = info.originalUrl + "-/resize/170x100/";
           $scope.safeApply();
         });
       }
       else {
        uploadcare.SingleWidget('#steel').value(null);
        $scope.steel_imageSrc = "";
        $scope.safeApply();
       }
     });

     $scope.createReport = function(){
        $scope.isEditForm = true;
        var data = $scope.project;
        $scope.report.report_number = _.max(data.link_daily_report,function(item){
          return item.report_number;
        }).report_number + 1;
        if(!data.link_daily_report.length) $scope.report.report_number = 1;
     }
     $scope.editReports = function(report) {
        // $scope.concrete_imageSrc = report.report_concrete.concrete_photo_url;
        // $scope.steel_imageSrc = report.report_steel.steel_photo_url;
        uploadcare.SingleWidget('#concrete').value(report.report_concrete.concrete_photo_url);
        uploadcare.SingleWidget('#steel').value(report.report_steel.steel_photo_url);
        $scope.report = report;
        $scope.isEditForm =true;
     };

     $scope.cancel = function() {
       $scope.concrete_imageSrc = "";
       $scope.steel_imageSrc = "";
        uploadcare.SingleWidget('#concrete').value(null);
        uploadcare.SingleWidget('#steel').value(null);
        var data = $scope.project;
        $scope.report = {
          report_concrete : {
            detail : []
          },
          report_steel : {
            detail :[]
          },
          report_create_date : new Date()
        };
       $scope.isEditForm = false;
     }
     $scope.save = function() {
       $scope.report.link_user  = $scope.user._id;
       $scope.report.link_project =  $scope.project._id;
       var promise;
       if($scope.report._id) {
          promise = $http.put("/api/reports/" + $scope.report._id,{
                       concrete_photo_uuid :  $scope.concrete_photo_uuid,
                       steel_photo_uuid :  $scope.steel_photo_uuid, 
                       report: $scope.report
                     });
       } else {
          promise = $http.post("/api/reports/",{
                       concrete_photo_uuid :  $scope.concrete_photo_uuid,
                       steel_photo_uuid :  $scope.steel_photo_uuid, 
                       report: $scope.report
                     });
       }
       promise.then(function(data){
            uploadcare.SingleWidget('#concrete').value(null);
            uploadcare.SingleWidget('#steel').value(null);
            $scope.report = {
              report_concrete : {
                detail : []
              },
              report_steel : {
                detail :[]
              },
              report_create_date : new Date()
            };
           $scope.isEditForm = false;
       });
       // $http.post("/api/reports/",{
       //   concrete_photo_uuid :  $scope.concrete_photo_uuid,
       //   steel_photo_uuid :  $scope.steel_photo_uuid, 
       //   report: $scope.report
       // }).success(function(){
       //    uploadcare.SingleWidget('#concrete').value(null);
       //    uploadcare.SingleWidget('#steel').value(null);
       //    $scope.report = {
       //      report_concrete : {
       //        detail : []
       //      },
       //      report_steel : {
       //        detail :[]
       //      },
       //report_create_date : new Date()
       //    };
       // });
     }
});
