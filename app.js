
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//mongoose.connect('mongodb://localhost/earthquake');
mongoose.connect('mongodb://HcbGKYsBmhKU:OuzgJdnMdabT@dbs004.mongosoup.de/cc_HcbGKYsBmhKU');

var db = mongoose.connection;

db.on('error',console.error.bind(console,'Connection Failed.'));
db.once('open',function() {
	console.log('Connected to MongoDB');
});

var schema_path = './schemas';

fs.readdirSync(schema_path).forEach(function(file) {
	if (~file.indexOf('.js'))
		require(schema_path + '/' + file);
});

console.log('Schemas initialized');

var fetch = require('./tasks/fetch')
/*
fetch.fetchData();
setInterval(fetch.fetchData, 30 * 60 * 1000);*/

console.log('Tasks set up');

var routes = require('./routes');
var eq = require('./routes/earthquake');

app.get('/', routes.index);
app.get('/api/earthquakes', eq.getEquakes);
app.post('/api/earthquakes', eq.insertEq);
app.get('/api/location', eq.getLocation);

console.log('Routes initialized');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});