var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.signIn = function (req ,res) {
	User.findOne({
		username: req.body.username,
		password: req.body.password
	})
	.exec(function (err, user) {
		if (err) 
			return res.send(500, err);

		if (!user)
			return res.send(404);

		res.send(200, user);
	});
}