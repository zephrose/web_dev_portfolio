//jshint esverion: 6

// Require
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// App
const app = express();
const port = 3000;

// App Uses
app.use(bodyParser.urlencoded({extended: true}));

// APIs
// GET
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});


// POST

// Something here


// Listening on 
app.listen(port, function() {
	console.log("Server Listening on port : " + port)
});
