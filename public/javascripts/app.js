(function() {
    'use strict';

    angular.module("cpPlacasEletronicasWebApp", ["ngRoute", "angular-loading-bar", "ngMaterial", "ngAnimate"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'javascripts/cpplacaseletronicaswebapp/login/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });         
    });

}());
