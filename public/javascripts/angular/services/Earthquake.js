'use strict'

function Earthquake($resource) {
	var apiUrl = '/api/earthquakes';
	return $resource(apiUrl, { id : '@id'}, {
		'get': {
			method: 'GET',
			isArray: true
		},
		'post': {
			method: 'POST'
		},
		'delete': {
			url: apiUrl + '/:id',
			method: 'DELETE'
		}
	});
};

angular.module('eqApp.services').factory('Earthquake', ['$resource', Earthquake]);