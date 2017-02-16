(function() {
    
    'use strict';

    angular.module("cpPlacasEletronicasWebApp")
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'javascripts/cpplacaseletronicaswebapp/home/home.html',
            controller: 'HomeCtrl'
        });
    });

}());