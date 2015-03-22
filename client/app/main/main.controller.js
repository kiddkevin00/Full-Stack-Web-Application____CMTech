'use strict';

angular.module('qiApp').controller('MainCtrl', function ($scope, $http, socket, $location ) {
    //$scope.projectID = $location.path().substring($location.path().indexOf("/", 1) + 1);
});

$(document).ready(function () {
    $(document).on('click', ".cmtech-tabs > .nav-tabs a", function () {
        var index = $(this).attr('id').slice(-1);
        $(".cmtech-tabs").css({
            "margin-top": "5px",
            "width": "100%",
            "background": "url('/assets/images/tab" + index + ".png')",
            "background-size": "100%",
            "background-repeat": "no-repeat"
        });
    })

});
