'use strict';

describe('Controller: ChangeOrderCtrl', function () {

  // load the controller's module
  beforeEach(module('qiApp'));

  var ChangeOrderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangeOrderCtrl = $controller('ChangeOrderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
