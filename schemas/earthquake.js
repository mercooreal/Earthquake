var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var earthquakeSchema = new Schema({
	title: String,
    magnitude: Number,
    location: String,
    depth: Number,
    latitude: Number,
    longitude: Number,
    date_time: Date,
    link: String
});

mongoose.model('Earthquake', earthquakeSchema);