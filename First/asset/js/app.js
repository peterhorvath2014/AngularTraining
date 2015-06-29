myApp = angular.module("myApp", ["ngStorage", 'ui.router']);

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
})