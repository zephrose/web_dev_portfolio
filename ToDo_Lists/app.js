const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// Setup Our App
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const port = 3000; // Change to 'process.env.PORT' if deploying to remote environment.

const items = [];
const workItems = [];

// Home
app.get("/", function (req, res) {

	let currentDay = date.getDate();

	res.render('list', {listTitle: currentDay, todoItems: items});

});

app.post("/", function (req, res) {

	let item = req.body.newItem;

	if (req.body.list === "Work" ) {
		workItems.push(item);
		redirect("/work");
	} else {
		items.push(item);
	}

	res.redirect("/");
	
});

// Work
app.get("/work", function(req, res) { 
	res.render('list', {listTitle: "Work List", todoItems: workItems} );
});

app.post("/work", function(req, res) {
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
});

// About
app.get("/about", function(req, res) {
	res.render("about");
});

app.listen(port, function () {
	console.log("Listening on port : " + port);
});