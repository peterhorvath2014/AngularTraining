'use strict';

/**
 * @ngdoc function
 * @name secondApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the secondApp
 */
angular.module('secondApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
