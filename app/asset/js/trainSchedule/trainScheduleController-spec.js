describe('trainScheduleController', function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.targetCity', function() {
    it('should equal empty string', function() {
      var $scope = {};
      var controller = $controller('trainScheduleController', { $scope: $scope });
      
      expect($scope.targetCity).toEqual('');
    });
  });
});