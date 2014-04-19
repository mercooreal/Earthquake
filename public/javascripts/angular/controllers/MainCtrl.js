'use strict'

function MainController($scope, Earthquake) {
	$scope.saveEq = function() {
		Earthquake.post({
			title: $scope.title,
		    magnitude: $scope.magnitude,
		    location: $scope.location,
		    depth: $scope.depth,
		    latitude: $scope.latitude,
		    longitude: $scope.longitude,
		    date_time: $scope.date_time,
		    link: $scope.link
		}, function(res) {
			console.log('Earthquake created');
		});
	}
};

angular.module('eqApp.controllers').controller('MainController', ['$scope', 'Earthquake', MainController]);