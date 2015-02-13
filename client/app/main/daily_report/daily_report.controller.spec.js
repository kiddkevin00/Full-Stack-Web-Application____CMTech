'use strict';

describe('Controller: DailyReportCtrl', function () {

  // load the controller's module
  beforeEach(module('qiApp'));

  var DailyReportCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DailyReportCtrl = $controller('DailyReportCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
