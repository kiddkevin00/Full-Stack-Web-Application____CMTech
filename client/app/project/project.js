'use strict';

angular.module('qiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project', {
        url: '/project',
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      }).state('detail', {
      	url: '/project/:projectId',
      	templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).state('detail.report', {
      	url: '/report',
      	templateUrl : '/components/tabs/daily_report.html',
      });
  });