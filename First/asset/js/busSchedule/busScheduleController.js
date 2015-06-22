myApp.controller('busScheduleController', function busScheduleController($scope, busScheduleFactory) {
    angular.element(document).ready(function () {
        UUI.Vertical_Menu.init({
            open: true
        });
    });
    $scope.defaultTitle = "Welcome at EPAM Dream Tours!";
    $scope.defaultSelectedTitlePrefix = "Selected target is: ";

    $scope.title = $scope.defaultTitle;
    $scope.targetCity = "";
    $scope.showScheduleTable = false;

    $scope.data = busScheduleFactory.getSchedule();

    $scope.actualScheduleList = [];

    $scope.log = function (message) {
        if (message instanceof Object) {
            console.log(JSON.stringify(message));
        } else {
            console.log(message);
        }
    };

    $scope.log("data: " + JSON.stringify($scope.data));

    $scope.refreshSchedule = function (targetKey, targetValue) {
        $scope.log("targetKey: " + targetKey);
        $scope.log(targetValue);
        $scope.actualScheduleList = targetValue;
        $scope.targetCity = $scope.defaultSelectedTitlePrefix + targetKey;
        $scope.showScheduleTable = true;
    }
    
    $scope.hideSchedule = function() {
        $scope.showScheduleTable = false;
    }
});