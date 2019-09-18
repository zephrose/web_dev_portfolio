const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// Set our port to listen
var port = 3000;

// Serve up our assets for the sites
// Some Magic going on here, trust it xD
app.use(express.static("sites/public"));
app.use(bodyParser.urlencoded({extended: true}));

// GETs
// Hello World
app.get("/", function (req, res) {
	console.log(req);
	res.send("<h1>Hello World!</h1>");
});

// Advanced : Serve up our drum project
app.get("/drums", function (req, res) {
	res.sendFile(path.join(__dirname + "/sites/drums/drums.html"));
});

app.get("/calc", function (req, res) {
	res.sendFile(path.join(__dirname + "/sites/calculator/calculator.html"));
});

// Something about me
app.get("/about", function (req, res) {
	res.sendFile(path.join(__dirname + "/site/about.html"));
});

// POSTs
app.post("/calc", function (req, res) {
	var total = Number(req.body.num1) + Number(req.body.num2);
	res.send("Total is : " + total);
});

// Start our Server
app.listen(port, function () {
	console.log("Server Start : " + port);
});