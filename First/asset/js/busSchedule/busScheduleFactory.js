myApp.factory('busScheduleFactory', function busScheduleFactory($http, $q) {
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

        getSchedule: function () {
            return {
                "Szeged": [{
                    "startTime": "10:00",
                    "type": "economy"
             }, {
                    "startTime": "11:00",
                    "type": "express"
             }, {
                    "startTime": "12:00",
                    "type": "economy"
             }, {
                    "startTime": "13:00",
                    "type": "express"
             }, {
                    "startTime": "14:00",
                    "type": "economy"
             }, {
                    "startTime": "15:00",
                    "type": "express"
             }],
                "Debrecen": [{
                    "startTime": "10:10",
                    "type": "economy"
             }, {
                    "startTime": "11:10",
                    "type": "express"
             }, {
                    "startTime": "12:10",
                    "type": "economy"
             }, {
                    "startTime": "13:10",
                    "type": "express"
             }, {
                    "startTime": "14:10",
                    "type": "economy"
             }, {
                    "startTime": "15:10",
                    "type": "express"
             }],
                "Kecskemet": [{
                    "startTime": "10:20",
                    "type": "economy"
             }, {
                    "startTime": "11:20",
                    "type": "express"
             }, {
                    "startTime": "12:20",
                    "type": "economy"
             }, {
                    "startTime": "13:20",
                    "type": "express"
             }, {
                    "startTime": "14:20",
                    "type": "economy"
             }, {
                    "startTime": "15:20",
                    "type": "express"
             }]
            };
        }
    }
});