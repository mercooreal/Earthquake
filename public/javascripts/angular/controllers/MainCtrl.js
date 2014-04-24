'use strict'

function MainController($scope, $rootScope, Auth) {
	$scope.signIn = function() {
		Auth.signIn({
			username: $scope.username,
			password: $scope.password
		}, function(user) {
			$scope.user = user;
			$rootScope.$emit('auth_success');
		}, function(res) {
			if (res.status === 404) {
				$scope.authFail = true;
			}
		});
	}
};

angular.module('eqApp.controllers').controller('MainController', ['$scope', '$rootScope', 'Auth', MainController]);