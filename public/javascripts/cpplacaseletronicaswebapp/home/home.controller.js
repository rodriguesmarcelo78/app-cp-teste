(function() {
    
    'use strict';

    angular.module("cpPlacasEletronicasWebApp").controller('HomeCtrl', ["$scope", "$mdSidenav",
    function ($scope, $mdSidenav) {
        
		$scope.openLeftMenu = function() {
    		$mdSidenav('left').toggle();
  		};

    }]);
}());