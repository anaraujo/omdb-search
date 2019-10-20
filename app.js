const PORT = process.env.PORT || 3000

var express = require("express");
var app = express();
var request = require("request");
app.set( "view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
	var query = req.query.search;
	var url = "http://omdbapi.com/?apikey=a3a773d5&s=" + query;

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("search", {data: data, query: query});
		}
	});
});

app.get("/results", function(req, res) {
	var query = req.query.search;
	var url = "http://omdbapi.com/?apikey=a3a773d5&s=" + query;

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});
});

app.listen(PORT, process.env.IP, function() {
	console.log("Movie App has started!!");
});