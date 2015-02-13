'use strict';

describe('Controller: RfiCtrl', function () {

  // load the controller's module
  beforeEach(module('qiApp'));

  var RfiCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RfiCtrl = $controller('RfiCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
