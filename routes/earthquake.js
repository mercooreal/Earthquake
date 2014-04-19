var mongoose = require('mongoose');
var Earthquake = mongoose.model('Earthquake');

exports.getEquakes = function (req ,res) {
	Earthquake
	.find()
	.limit(req.query.limit || 5)
	.skip(req.query.skip)
	.lean()
	.select('-__v')
	.sort({date_time: -1})
	.exec(function (err, equakes) {
		if (err)
			return res.send(500, "The server blew up \(X.X)/");

		return res.send(200, equakes);
	});
}

exports.insertEq = function (req, res) {
	var eq = req.body;

	eq = new Earthquake(eq);

	eq.save(function (err) {
		if (err) {
			return res.send(500,{msg: "Couldn't create earthquake"});
		}

		res.send(201, {msg: 'OK'})
	});
}