const PORT = process.env.PORT || 3000

var express = require("express");
var app = express();
var request = require("request");
app.set( "view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
	var results = "a";
	res.render("search", {results: results});
});

app.listen(PORT, process.env.IP, function() {
	console.log("Movie App has started!!");
});