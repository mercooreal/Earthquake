var http = require('http');

exports.getEQuakes = function (req, res) {
	http.get('http://earthquake-report.com/feeds/recent-eq?json', function (res) {
		console.log("Got response: " + res.statusCode);
	}).on('error', function (err) {
		console.log(err);
	});
}