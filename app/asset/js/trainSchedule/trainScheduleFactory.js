myApp.factory('trainScheduleFactory', ['$http', '$q', '$log', '$localStorage', function trainScheduleFactory($http, $q, $log, $localStorage) {
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
            if (angular.isObject($localStorage[to])) {
                return $q.when($localStorage[to]);
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
                            $localStorage[to] = response.data;
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
            return (angular.isArray($localStorage.targetCities) ? $localStorage.targetCities : defaultCities);
        },
        removeCity: function (idx) {
            $localStorage.targetCities.splice(idx, 1)
            return $localStorage.targetCities;
        },
        addCity: function (cityName) {
            if ($localStorage.targetCities.indexOf(cityName) == -1) {
                $localStorage.targetCities.push(cityName);
            }
            return $localStorage.targetCities;
        },
        resetToDefaultCities: function () {
            $localStorage.targetCities = defaultCities;
            return $localStorage.targetCities;
        },
        getDataForDiagram: function (actualData) {
            var x = ['x'];
            angular.forEach(actualData, function (value) {
                this.push(value.starttime);
            }, x);

            var data1 = ['data1'];
            angular.forEach(actualData, function (value) {
                var totaltimeArray = value.totaltime.split(":");
                this.push(parseInt(totaltimeArray[0]) * 60 + parseInt(totaltimeArray[1]));
            }, data1);

            var result = []
            result.push(x);
            result.push(data1);

            return result;
        }
    }
            }]);