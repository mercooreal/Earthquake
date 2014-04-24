'use strict'

function MainController($scope, Auth) {
	$scope.signIn = function() {
		Auth.signIn({
			username: $scope.username,
			password: $scope.password
		}, function(user) {
			$scope.user = user;
		});
	}
};

angular.module('eqApp.controllers').controller('MainController', ['$scope', 'Auth', MainController]);