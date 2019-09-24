//jshint esverion: 6

// Require
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// App
const app = express();
const port = 3000;

// API Endpoints
const btc_base = "https://apiv2.bitcoinaverage.com/";
const btc_glb_ticker = "indices/global/ticker/";
const btc_glb_convert = "convert/global";

// App Uses
app.use(bodyParser.urlencoded({extended: true}));

// APIs
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	// console.log(req.body);

	var reqUrl = btc_base + btc_glb_convert; // + req.body.crypto + req.body.fiat;

	var options = {
		url : reqUrl,
		method : "GET",
		qs : { from :  req.body.crypto, to : req.body.fiat, amount : req.body.amount }
	};

	request(options, function(error, response, body) {
		var resBody = JSON.parse(body);
		res.write("<h1>As of "+ resBody.time +"</h1>");
		res.write("<h2>"+ req.body.amount + " " + req.body.crypto +
				  " would convert to "+ resBody.price +" "+ req.body.fiat +"</h2>");
		res.send();
	});
});

// Listening on 
app.listen(port, function() {
	console.log("Server Listening on port : " + port)
});