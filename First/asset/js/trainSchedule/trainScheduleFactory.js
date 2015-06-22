myApp.factory('trainScheduleFactory', function trainScheduleFactory($http, $q) {
    return {
        getScheduleFromElvira: function (to) {
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

        },
        getCities: function () {
            return [
                "Szeged",
                "Debrecen",
                "Kecskemét",
                "Eger",
                "Pécs",
                "Győr",
                "Székesfehérvár"
            ];
        }
    }
});