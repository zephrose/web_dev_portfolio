const express = require("express");
const app = express();
const path = require("path");

// Set our port to listen
var port = 3000;

// Serve up our assets for the sites
// Some Magic going on here, trust it xD
app.use(express.static("sites/public"));

// Hello World
app.get("/", function (req, res) {
	console.log(req);
	res.send("<h1>Hello World!</h1>");
});

// Advanced : Serve up our drum project
app.get("/drums", function (req, res) {
	res.sendFile(path.join(__dirname + "/sites/drums/drums.html"));
});

// Something about me
app.get("/about", function (req, res) {
	res.sendFile(path.join(__dirname + "/site/about.html"));
});

// Start our Server
app.listen(port, function () {
	console.log("Server Start : " + port);
});