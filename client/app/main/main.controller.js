'use strict';

angular.module('qiApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
$(document).ready(function () {
    $(document).on('click', ".cmtech-tabs > .nav-tabs a" ,function() {
      var index = $(this).attr('id').slice(-1);
      $(".cmtech-tabs").css({
        "margin-top": "15px",
        "height": "700px",
        "width": "100%",
        "background": "url('/assets/images/tab" + index + ".png')",
        "background-size": "100% 100%",
        "background-repeat": "no-repeat"
      });
    })

});