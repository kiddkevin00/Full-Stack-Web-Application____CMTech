'use strict';

describe('Controller: SubmittalCtrl', function () {

  // load the controller's module
  beforeEach(module('qiApp'));

  var SubmittalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmittalCtrl = $controller('SubmittalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
