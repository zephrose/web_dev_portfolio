//jshint esverion: 6

// Require
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// App
const app = express();
const port = 3000;

// Encoding
app.use(bodyParser.urlencoded({extended: true}));

// APIs
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	// console.log(req.body.crypto);

	request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" 
			+ req.body.crypto 
			+ req.body.fiat,
			function(err, res, body) {
		console.log(body);
	});
});

// Listening on 
app.listen(port, function() {
	console.log("Server Listening on port : " + port)
});