'use strict';

angular.module('qiApp')
    .filter('chunk', function () {
        return _.memoize(_.chunk);
    });