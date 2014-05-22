exports.getAftershocks = function(equake, a, b) {
	var res = [];

	var a = a || 1;
	var b = b || 1;

	var mag = (equake.magnitude * b) - a;

	var count = 10;

	while (mag > 2) {
		res.push({
			count: count,
			mag: (mag - 1).toFixed(2)
		});

		count *= 10;
		mag -= 1; 
	}

	return res;
}