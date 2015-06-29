myApp.controller('trainScheduleController', ['$scope', '$log', 'trainScheduleFactory', '$localStorage', function trainScheduleController($scope, $log, trainScheduleFactory, $localStorage) {
    angular.element(document).ready(function () {
        UUI.Vertical_Menu.init({
            open: true
        });
    });
    $scope.defaultTitle = "Welcome at EPAM Dream Tours!";
    $scope.defaultSelectedTitlePrefix = "Selected route is: ";
    $scope.title = $scope.defaultTitle;
    $scope.date = "";
    $scope.targetCity = "";
    $scope.showScheduleTable = false;
    $scope.showLoading = false;
    $scope.targetCities = trainScheduleFactory.getCities();
    $scope.actualScheduleList = [];
    $scope.$storage = $localStorage;

    $scope.hideSchedule = function () {
        $scope.searchText = "";
        $scope.showScheduleTable = false;
    }

    $scope.refreshScheduleFromElvira = function (targetCity) {
        $log.debug("targetCity: " + targetCity);
        $scope.targetCity = targetCity;
        $scope.hideSchedule();
        $scope.showLoading = true;
        var promise = trainScheduleFactory.getScheduleFromElvira(targetCity);

        promise.then(function (data) {
            $log.debug(data);
            $scope.actualScheduleList = data.timetable;
            $scope.date = data.date;
            $scope.showLoading = false;
            $scope.showScheduleTable = true;
            $scope.drawDiagram();
            $scope.drawDiagram();
        }, function (error) {
            console.log('failure loading data', error);
            $scope.showLoading = false;
        });

    }

    function removeAccents(value) {
        return value
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ő/g, 'o')
            .replace(/ö/g, 'o')
            .replace(/õ/g, 'o')
            .replace(/ü/g, 'u')
            .replace(/ú/g, 'u')
            .replace(/ű/g, 'u')
            .replace(/ú/g, 'u')
            .replace(/û/g, 'u');
    }

    $scope.ignoreAccents = function (item) {
        $log.debug("$scope.searchText: " + $scope.searchText);
        $log.debug(item);
        if (!$scope.searchText) {
            return true;
        }
        var text = removeAccents(item.start.toLowerCase())
        var search = removeAccents($scope.searchText.toLowerCase());
        return text.indexOf(search) > -1;
    };

    $scope.removeCityFromMenu = function (idx) {
        $scope.targetCities = trainScheduleFactory.removeCity(idx);
    }

    $scope.addCityToMenu = function (newTargetCity) {
        $log.debug(newTargetCity);
        $scope.refreshScheduleFromElvira(newTargetCity);
        $scope.targetCities = trainScheduleFactory.addCity(newTargetCity);
        $scope.targetCityText = "";
    }

    $scope.resetToDefaultCities = function () {
        $scope.targetCities = trainScheduleFactory.resetToDefaultCities();
    }

    var formatTime = d3.time.format("%H:%M");
	var formatMinutes = function(d) {
		return formatTime(new Date(2012, 0, 1, 0, d));
	}
    
    $scope.drawDiagram = function () {
        $scope.chart = c3.generate({
            bindto: '#totalTimeDiagram',
            data: {
                x: 'x',
                xFormat: '%H:%M',
                columns: trainScheduleFactory.getDataForDiagram($scope.actualScheduleList),
                names: {
                    data1: 'Total time',
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%H:%M'
                    }
                },
                y: {
                    tick: {
                        format: formatMinutes
                    }
                },
            }
        });
    }
}]);