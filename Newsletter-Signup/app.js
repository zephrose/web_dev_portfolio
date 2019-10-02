//jshint esverion: 6

// Require
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// App
const app = express();
const port = 3000;

// App Uses
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

// APIs
// GET
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});


// POST
app.post("/", function (req, res) {
	var firstName = req.body.fName;
	var lastName = req.body.lName;
	var email = req.body.email;

	console.log(firstName + " : First Name - " + lastName + " : Last Name - " + email + " : Email");
});
// Something here


// Listening on 
app.listen(port, function() {
	console.log("Server Listening on port : " + port);
});
