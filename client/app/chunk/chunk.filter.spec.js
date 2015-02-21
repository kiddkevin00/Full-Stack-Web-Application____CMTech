'use strict';

describe('Filter: chunk', function () {

  // load the filter's module
  beforeEach(module('qiApp'));

  // initialize a new instance of the filter before each test
  var chunk;
  beforeEach(inject(function ($filter) {
    chunk = $filter('chunk');
  }));

  it('should return the input prefixed with "chunk filter:"', function () {
    var text = 'angularjs';
    expect(chunk(text)).toBe('chunk filter: ' + text);
  });

});
