'use strict';

angular.module('qiApp').config(function ($stateProvider) {
    $stateProvider.state('main', {
	    url: '/main',
	    abstract: true,
	    templateUrl: '/app/main/main.html',
	    controller: 'MainCtrl'
  	}).state('main.home', {
        url: '/:projectID',
        templateUrl: '/app/main/main_home/main_home.html',
        controller: 'MainHomeCtrl'
    }).state('main.daily_report', {
        url: '/:projectID',
        templateUrl: '/app/main/daily_report/daily_report.html',
        controller: 'DailyReportCtrl'
    }).state('main.change_order', {
        url: '/:projectID',
        templateUrl: '/app/main/change_order/change_order.html',
        controller: 'ChangeOrderCtrl'
    }).state('main.rfi', {
  		url: '/:projectID',
  		templateUrl: '/app/main/rfi/rfi.html',
  		controller: 'RfiCtrl'
  	}).state('main.submittal', {
        url: '/:projectID',
        templateUrl: '/app/main/submittal/submittal.html',
        controller: 'SubmittalCtrl'
    }).state('main.transmittal', {
        url: '/:projectID',
        templateUrl: '/app/main/transmittal/transmittal.html',
        controller: 'TransmittalCtrl'
    }).state('main.punchlist', {
        url: '/:projectID',
        templateUrl: '/app/main/punchlist/punchlist.html',
        controller: 'PunchlistCtrl'
    }).state('main.schedule', {
        url: '/:projectID',
        templateUrl: '/app/main/directory/directory.html',
        controller: 'ScheduleCtrl'
    })
});
