(function() {
    'use strict';

    angular.module('cpPlacasEletronicasWebApp')
    .factory("toast", function() {
        return function(text, $mdToast) {       
            $mdToast.show(
                $mdToast.simple()
                    .content(text)
                    .position('top right')
                    .hideDelay(3000)
            );

        };

    });

}());

