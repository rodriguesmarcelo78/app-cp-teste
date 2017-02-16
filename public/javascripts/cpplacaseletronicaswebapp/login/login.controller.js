(function() {
    
    'use strict';

    angular.module("cpPlacasEletronicasWebApp").controller('LoginCtrl', ["$scope", "validation", "LoginService", "$mdToast", "toast", "$location",
    function ($scope, validation, LoginService, $mdToast, toast, $location) {

        $scope.errorMessages = error_messages;
        $scope.btnLoginDisabled = false;  

        //-- Username -- //
        $scope.showUsernameError = function() {     
            var usernameRequired    = validation('username','required', $scope);
            var usernameInvalid     = $scope.form.username.$error.login_invalid;
            return usernameRequired || usernameInvalid;
        };
        //-- Password --  //
        $scope.showPasswordError = function() {
            var passwordError = validation('password','required', $scope);
            return passwordError;            
        };

        function cleanInvalidFields() {
            $scope.form.username.$setValidity("login_invalid", true);
        };

        // -- LOGIN Button -- //
        $scope.login = function (user) {
            cleanInvalidFields();
            if ($scope.form.$valid) {
                $scope.btnLoginDisabled = true;
                LoginService.authenticate(user)
                .then(function () {
                    $scope.btnLoginDisabled = false;  
                	$location.path('/home');
                }, function (error) {
                    $scope.btnLoginDisabled = false;  
                	toast(error.data, $mdToast);                	
                });
            }
        };


    }]);
}());