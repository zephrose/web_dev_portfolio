//jshint esverion: 6

// Require
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// App
const app = express();
const port = 3000;

// API Endpoints
const btc_avg = "https://apiv2.bitcoinaverage.com";
const btc_glb_ticker = "/indices/global/ticker/";

// App Uses
app.use(bodyParser.urlencoded({extended: true}));

// APIs
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	console.log(req.body);

	var reqUrl = btc_avg + btc_glb_ticker + req.body.crypto + req.body.fiat;

	request(reqUrl, function(error, response, body) {
		var resBody = JSON.parse(body);
		res.write("<h1>As of "+ resBody.display_timestamp +"</h1>");
		res.write("<h2>"+ req.body.crypto +" Weekly Average</h2>");
		res.write("<h2>"+ resBody.open.week + " per " + req.body.fiat +" currency</h2>");
		res.send();
	});
});

// Listening on 
app.listen(port, function() {
	console.log("Server Listening on port : " + port)
});