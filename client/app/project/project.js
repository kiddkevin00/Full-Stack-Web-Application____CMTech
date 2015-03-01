'use strict';

angular.module('qiApp').config(function ($stateProvider) {
    $stateProvider.state('project', {
        url: '/project',
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
    })
});