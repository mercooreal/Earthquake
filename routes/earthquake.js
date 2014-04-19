var mongoose = require('mongoose');
var geoip = require('geoip-lite');
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

exports.getLocation = function (req,res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	var geo = geoip.lookup(ip);

	res.send(200, {
		add: ip,
		loc: geo
	});
}