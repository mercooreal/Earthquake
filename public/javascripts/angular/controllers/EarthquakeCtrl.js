'use strict'

function EarthquakeController($scope, $rootScope, Earthquake) {
	$scope.equakes = [];
	
	$scope.getEquakes = function () {
		Earthquake.getEquakes({
			limit: 10,
			skip: $scope.equakes.length
		}, function(equakes) {
			equakes.forEach(function(eq) {
				$scope.equakes.push(eq);
			});
		});
	}

	$scope.saveEq = function() {
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

	$scope.deleteEq = function(eq, index) {
		Earthquake.deleteEquake({
			id: eq._id
		}, function(res) {
			$scope.equakes.splice(index, 1);
		});
	}

	$scope.deleteAll = function() {
		Earthquake.deleteAll({}, function(res) {
			$scope.equakes = [];
		});
	}

	$scope.generateTime = function() {
		$scope.date_time = new Date().toISOString();
	}

	$rootScope.$on('auth_success', $scope.getEquakes);
};

angular.module('eqApp.controllers').controller('EarthquakeController', ['$scope', '$rootScope', 'Earthquake', EarthquakeController]);