var mongoose = require('mongoose');
var geoip = require('geoip-lite');
var geolib = require('geolib');
var gr = require('../tasks/gr');
var Earthquake = mongoose.model('Earthquake');

exports.getEquakes = function (req ,res) {
	Earthquake
	.find()
	.limit(req.query.limit || 20)
	.skip(req.query.skip)
	.lean()
	.select('-__v')
	.sort({date_time: -1})
	.exec(function (err, equakes) {
		if (err)
			return res.send(500, {err: err});

		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if (ip == '127.0.0.1')
			return res.send(200, equakes);

		var ll = geoip.lookup(ip).ll;

		var userLoc = {
			latitude: ll[0],
			longitude: ll[1]
		};

		for (var i = 0; i < equakes.length; i++) {
			var quakeLoc = {
				latitude: equakes[i].latitude,
				longitude: equakes[i].longitude
			}		

			/*if (geolib.getDistance(quakeLoc, userLoc) <= (req.query.radius * 1000)) {
				equakes[i].danger = 'medium';
			}*/
			equakes[i].aftershocks = gr.getAftershocks(equakes[i], req.query.a || 0.5, req.query.b || 1);

			var distance = geolib.getDistance(quakeLoc, userLoc) / 1000;

			if (distance <= 50) {
				equakes[i].danger = 'high';
			} else if (distance <= 100) {
				equakes[i].danger = 'medium';
			} else if (distance <= 200) {
				equakes[i].danger = 'low';
			} else {
				equakes[i].danger = 'none';
			}
		}
		
		return res.send(200, equakes);
	});
}

exports.insertEq = function (req, res) {
	var eq = req.body;

	eq = new Earthquake(eq);

	eq.save(function (err) {
		if (err) 
			return res.send(500, {err: err});

		res.send(201, {msg: 'OK'})
	});
}

exports.deleteEq = function (req, res) {
	Earthquake
	.findById(req.params.id)
	.exec(function (err, eq) {
		if (err)
			return res.send(500, {err: err});

		eq.remove(function(err) {
			if (err)
				return res.send(500, {err: err});

			res.send(200, {msg: 'OK'});
		});
	});
}

exports.deleteAll = function (req, res) {
	Earthquake.remove({}, function(err) {
		if (err)
			return res.send(500, err);

		res.send(200);
	});
}

exports.getLocation = function (req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	var geo = geoip.lookup(ip);

	res.send(200, {
		add: ip,
		loc: geo
	});
}