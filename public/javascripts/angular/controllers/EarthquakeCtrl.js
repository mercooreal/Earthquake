'use strict'

function EarthquakeController($scope, Earthquake) {
	$scope.getEquakes = function () {
		Earthquake.getEquakes({
			limit: 10,
			skip: $scope.equakes
		}, function(equakes) {
			$scope.equakes = equakes;
		});
	}
	$scope.getEquakes();

	$scope.save = function() {
		Earthquake.postEquake({
			title: $scope.title,
		    magnitude: $scope.magnitude,
		    location: $scope.location,
		    depth: $scope.depth,
		    latitude: $scope.latitude,
		    longitude: $scope.longitude,
		    date_time: $scope.date_time,
		    link: $scope.link
		}, function(res) {
			$scope.getEquakes();
		});
	}

	$scope.delete = function(eq, index) {
		Earthquake.deleteEquake({
			id: eq._id
		}, function(res) {
			$scope.equakes.splice(index, 1);
		});
	}

	$scope.generateTime = function() {
		$scope.date_time = new Date().toISOString();
	}
};

angular.module('eqApp.controllers').controller('EarthquakeController', ['$scope', 'Earthquake', EarthquakeController]);