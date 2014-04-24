'use strict'

function Auth($resource) {
	var apiUrl = '/api/signin';
	return $resource(apiUrl, {}, {
		'signIn': {
			method: 'POST'
		}
	});
};

angular.module('eqApp.services').factory('Auth', ['$resource', Auth]);