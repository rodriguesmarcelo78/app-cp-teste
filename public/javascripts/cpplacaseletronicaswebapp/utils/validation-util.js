(function () {
    'use strict';

    angular.module('cpPlacasEletronicasWebApp')
    .factory("validation", function() {
        return function(field, validator, $scope) {       
            if (eval("$scope.form." + field + ".$error." + validator) && ($scope.form.$submitted || eval("$scope.form." + field + ".$touched"))) {  
                return true;
            } else {
                return false;
            }       
        };
    });  

}());
