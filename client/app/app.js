'use strict';

angular.module('qiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ui.select'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    // $stateProvider.state('expire', {
    //     url: '/expire',
    //     templateUrl: '/components/error/expire.html'
    // })
    //$urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise( function($injector, $location) {
      console.log('otherwi')
        var $state = $injector.get("$state");
      //  $state.go("app.home");
    });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          if(response.status === 406) {
            console.log("406");
            $location.path('/expire');
          }
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, $state) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/');
        } 
        else if(!$rootScope.project) {
          $location.path('/project');
          //event.preventDefault();
        //  return;
       }
      });
    });
  });