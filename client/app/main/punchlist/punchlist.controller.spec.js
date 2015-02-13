'use strict';

describe('Controller: PunchlistCtrl', function () {

  // load the controller's module
  beforeEach(module('qiApp'));

  var PunchlistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PunchlistCtrl = $controller('PunchlistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
