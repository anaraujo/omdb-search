const PORT = process.env.PORT || 3000

var express = require('express');
var app = express();
var request = require('request');
app.set( 'view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.redirect('/movies');
});

app.get('/movies', function(req, res) {
	res.render('main');
});

app.listen(PORT, process.env.IP, function() {
	console.log('Movie App has started!!');
});