(function() {
    
    'use strict';

    angular.module("cpPlacasEletronicasWebApp").factory('LoginService', ["$q", "$http",
    function ($q, $http) {

        var authenticate = function(user) {
            var deffered = $q.defer();
            $http.post('/user/authenticateWEB', {usuario: user.username, senha: user.password})
            .then(function() {
                deffered.resolve();
            }, function(errorMessage) {
                deffered.reject(errorMessage);
            });
            return deffered.promise;
        };

        return {
            authenticate: authenticate
        }

    }]);
}());