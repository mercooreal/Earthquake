'use strict'

function Earthquake($resource) {
	var apiUrl = '/api/earthquakes';
	return $resource(apiUrl, { id : '@id'}, {
		'getEquakes': {
			method: 'GET',
			isArray: true
		},
		'postEquake': {
			method: 'POST'
		},
		'deleteEquake': {
			url: apiUrl + '/:id',
			method: 'DELETE'
		}
	});
};

angular.module('eqApp.services').factory('Earthquake', ['$resource', Earthquake]);