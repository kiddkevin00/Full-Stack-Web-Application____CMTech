'use strict';

angular.module('qiApp')
  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('project', {
        url: '/project',
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      }).state('detail', {
      	url: '/project',
      	abstract: true,
      	templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).state('detail.report', {
      	url: '/:projectId',
      	templateUrl : '/components/tabs/daily_report.html',
      }).state('detail.home', {
      	url: '/:projectId',
      	templateUrl : '/components/tabs/home.html',
      });
  });