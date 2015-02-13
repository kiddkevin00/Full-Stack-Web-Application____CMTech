'use strict';

describe('Controller: TransmittalCtrl', function () {

  // load the controller's module
  beforeEach(module('qiApp'));

  var TransmittalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransmittalCtrl = $controller('TransmittalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
