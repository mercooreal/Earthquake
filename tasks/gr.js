exports.getAftershocks = function(equake, a, b) {
	var res = [];

	var a = a || 1;
	var b = b || 1;

	var mag = (equake.magnitude * b) - a;

	var count = 10;

	while (mag >= 1) {
		res.push({
			count: count,
			mag: mag - 1
		});

		count *= 10;
		mag -= 1; 
	}

	return res;
}