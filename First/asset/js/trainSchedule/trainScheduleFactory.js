myApp.factory('trainScheduleFactory', ['$http', '$q', '$log', 'localStorageService', function trainScheduleFactory($http, $q, $log, localStorageService) {
    var defaultCities = [
                "Szeged",
                "Debrecen",
                "Kecskemét",
                "Eger",
                "Pécs",
                "Győr",
                "Székesfehérvár"
            ];

    return {
        getScheduleFromElvira: function (to) {
            var routeFromLocalStorage = localStorageService.getDataFromLocalStorage(to);
            if (angular.isObject(routeFromLocalStorage)) {
                return $q.when(routeFromLocalStorage);
            } else {
                return $http({
                    url: 'http://apiv2.oroszi.net/elvira',
                    method: "GET",
                    params: {
                        "from": "budapest",
                        "to": to
                    }
                }).then(
                    function (response) {
                        if (typeof response.data === 'object') {
                            localStorageService.setDataToLocalStorage(to, response.data);
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    },
                    function (response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
            }
        },
        getCities: function () {
            var targetCities = defaultCities;
            var targetCitiesFromLocalStorage = localStorageService.getDataFromLocalStorage('targetCities');
            if (!angular.isArray(targetCitiesFromLocalStorage)) {
                localStorageService.setDataToLocalStorage('targetCities', angular.toJson(defaultCities));
            } else {
                targetCities = targetCitiesFromLocalStorage;
            }
            $log.log("targetCities: " + targetCities);
            return targetCities;
        },
        removeCity: function (idx) {
            var targetCities = defaultCities;
            var targetCitiesFromLocalStorage = localStorageService.getDataFromLocalStorage('targetCities');
            if (angular.isArray(targetCitiesFromLocalStorage)) {
                targetCitiesFromLocalStorage.splice(idx, 1);
                localStorageService.setDataToLocalStorage('targetCities', targetCitiesFromLocalStorage);
                targetCities = targetCitiesFromLocalStorage;
            }
            $log.log("targetCities: " + targetCities);
            return targetCities;
        },
        resetToDefaultCities: function () {
            var targetCities = defaultCities;
            var targetCitiesFromLocalStorage = localStorageService.getDataFromLocalStorage('targetCities');
            localStorageService.setDataToLocalStorage('targetCities', angular.toJson(defaultCities));
            $log.log("targetCities: " + targetCities);
            return targetCities;
        }
    }
            }]);