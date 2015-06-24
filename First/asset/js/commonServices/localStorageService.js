myApp.service('localStorageService', ['$log', '$window', function localStorageService($log, $window) {
    return {
        getDataFromLocalStorage: function (key) {
            var dataFromStorage = "";
            if ($window.Storage) {
                dataFromStorage = angular.fromJson(($window.localStorage && $window.localStorage.getItem(key)));
                $log.debug("Local storage is supported. " + key + ": " + dataFromStorage);
            } else {
                $log.debug("Local storage is not supported.");
            }
            return angular.fromJson(dataFromStorage);
        },
        setDataToLocalStorage: function (key, value) {
            if ($window.Storage) {
                $log.debug("Local storage is supported. Saving " + key + ": " + value);
                ($window.localStorage && $window.localStorage.setItem(key, angular.toJson(value)));
            } else {
                $log.debug("Local storage is not supported.");
            }
        }
    }
}]);