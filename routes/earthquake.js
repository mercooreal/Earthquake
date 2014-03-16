var mongoose = require('mongoose');
var Earthquake = mongoose.model('Earthquake');

exports.getEQuakes = function (req,res) {
	Earthquake
	.find()
	.limit(req.query.limit)
	.skip(req.query.skip)
	.exec(function (err, equakes) {
		if (err)
			return res.send(500, "The server blew up \(X.X)/");

		res.send(200, req.connection.remoteAddress);
	})
}