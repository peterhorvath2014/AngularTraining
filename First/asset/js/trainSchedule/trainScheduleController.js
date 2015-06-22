myApp.controller('trainScheduleController', function trainScheduleController($scope, trainScheduleFactory) {
    angular.element(document).ready(function () {
        UUI.Vertical_Menu.init({
            open: true
        });
    });
    $scope.defaultTitle = "Welcome at EPAM Dream Tours!";
    $scope.defaultSelectedTitlePrefix = "Selected route is: ";

    $scope.title = $scope.defaultTitle;
    $scope.targetCity = "";
    $scope.showScheduleTable = false;
    $scope.showLoading = false;

    $scope.data = trainScheduleFactory.getCities();

    $scope.actualScheduleList = [];

    $scope.log = function (message) {
        if (message instanceof Object) {
            console.log(JSON.stringify(message));
        } else {
            console.log(message);
        }
    };

    $scope.log("data: " + JSON.stringify($scope.data));

    $scope.hideSchedule = function() {
        $scope.showScheduleTable = false;
    }
    
    $scope.refreshScheduleFromElvira = function(targetCity) {
        $scope.log("targetCity: " + targetCity);
        $scope.targetCity = targetCity;
        $scope.showLoading = true;
    	var promise = trainScheduleFactory.getScheduleFromElvira(targetCity);
    	promise.then(function(data) {
            $scope.log(data);
            $scope.actualScheduleList = data.timetable;
            $scope.showLoading = false;
            $scope.showScheduleTable = true;
    	}, function(error) {
    		console.log('failure loading data', error);
            $scope.showLoading = false;
    	});
        
    }
});