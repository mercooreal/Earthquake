var http = require('http');
var mongoose = require('mongoose');
var Earthquake = mongoose.model('Earthquake')

exports.fetchData = function (req, res) {
	http.get('http://earthquake-report.com/feeds/recent-eq?json', function (response) {
		console.log('Fetching earthquakes...');

		var data = "";

		response.on('data', function (chunk) {
			data += chunk;
		});

		response.on('end', function() {
			data = JSON.parse(data);
			
			data.forEach(function (earthquake) {
				earthquake = new Earthquake({
					title: earthquake.title,
				    magnitude: Number(earthquake.magnitude),
				    location: earthquake.location,
				    depth: Number(earthquake.depth),
				    latitude: Number(earthquake.latitude),
				    longitude: Number(earthquake.longitude),
				    date_time: new Date(Date.parse(earthquake.date_time)),
				    link: earthquake.link
				});

				Earthquake.findOne({title: earthquake.title, date_time: earthquake.date_time}, function (err,eq) {
					if (err)
						return err;

					if (!eq) {
						earthquake.save(function (err) {
							if (err)
								return err;

							console.log('Inserted new earthquake');
						});
					}
				});
			});
		});
	}).on('error', function (err) {
		console.log(err);
	});
}