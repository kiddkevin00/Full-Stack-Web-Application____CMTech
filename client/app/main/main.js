'use strict';

angular.module('qiApp').config(function ($stateProvider) {
    $stateProvider.state('main', {
	    url: '/main',
	    abstract: true,
	    templateUrl: 'app/main/main.html',
	    controller: 'MainCtrl'
  	}).state('main.home', {
      url: '/:projectId', 
      templateUrl: 'app/main/main_home/main_home.html'
    }).state('main.rfi', {
  		url: '/:projectId',
  		templateUrl: '/app/main/rfi/rfi.html'
  		// controller: 'RfiCtrl.js'
  	}).state('main.submittal', {
      url: '/:projectId',
      templateUrl: '/app/main/submittal/submittal.html'
    })
});

//home daily_report change_order rfi submittal transmittal 
//punchlist schedule