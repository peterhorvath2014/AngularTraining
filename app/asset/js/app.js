angular.element(document).ready(function () {
    UUI.Vertical_Menu.init({
        open: true
    });
});

myApp = angular.module("myApp", ["ngStorage", 'ui.router', 'angular-loading-bar']);

myApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

myApp.directive('lkRepeat', function ($log) {
    return {
        priority: 5,
        transclude: 'element',
        compile: function (element, attr, linker) {
            return function ($scope, $element, $attr) {
                var myLoop = $attr.lkRepeat,
                    match = myLoop.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
                    indexString = match[1],
                    collectionString = match[2],
                    parent = $element.parent(),
                    elements = [];

                // $watchCollection is called everytime the collection is modified
                $scope.$watchCollection(collectionString, function (collection) {
                    var i, block, childScope;

                    // check if elements have already been rendered
                    if (elements.length > 0) {
                        // if so remove them from DOM, and destroy their scope
                        for (i = 0; i < elements.length; i++) {
                            elements[i].el.remove();
                            elements[i].scope.$destroy();
                        };
                        elements = [];
                    }
                    collection.sort;
                    for (i = 0; i < collection.length; i++) {

                        // create a new scope for every element in the collection.
                        childScope = $scope.$new();
                        // pass the current element of the collection into that scope
                        childScope[indexString] = collection[i];

                        linker(childScope, function (clone) {
                            // clone the transcluded element, passing in the new scope.
                            parent.append(clone); // add to DOM
                            block = {};
                            block.el = clone;
                            block.scope = childScope;
                            block.scope.$index = i;
                            elements.push(block);
                        });
                    };
                });
            }
        }
    }
});

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/scheduleTable")

    $stateProvider
        .state('scheduleTable', {
            url: "/scheduleTable",
            templateUrl: "asset/js/trainSchedule/scheduleTable.html"
        })
        .state('scheduleDiagram', {
            url: "/scheduleDiagram",
            templateUrl: "asset/js/trainSchedule/scheduleDiagram.html",
            controller: function ($scope) {
                $scope.drawDiagram();
            }
        })
        .state('walletDiagram', {
            url: "/walletDiagram",
            templateUrl: "asset/js/trainSchedule/walletDiagram.html",
            controller: function ($scope) {
                $scope.drawWalletDiagram();
            }
        })
});

myApp.directive("validateTargetCity", function ($log) {
    // requires an isloated model
    return {
        // restrict to an attribute type.
        restrict: 'A',
        // element must have ng-model attribute.
        require: 'ngModel',
        link: function (scope, ele, attrs, ctrl) {

            // add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function (value) {
                if (value) {
                    // test and set the validity after update.
                    $log.debug(scope.validTargetCities);
                    var valid = (scope.validTargetCities.indexOf(value) > -1);
                    ctrl.$setValidity('invalidTargetCity', valid);
                }

                // if it's valid, return the value to the model, 
                // otherwise return undefined.
                return valid ? value : undefined;
            });

        }
    }
});