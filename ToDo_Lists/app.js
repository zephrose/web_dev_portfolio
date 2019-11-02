const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// Setup Our App
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const port = 3000; // Change to 'process.env.PORT' if deploying to remote environment.

var items = [];

app.get("/", function (req, res) {
	
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	var today = new Date();
	var currentDay = today.toLocaleDateString("en-US", options);
	
	res.render('list', {weekday: currentDay, todoItems: items});

});

app.post("/", function (req, res) {

	console.log(req.body.todoItem);
	items.push(req.body.todoItem);

	res.redirect("/");
	
});

app.listen(port, function () {
	console.log("Listening on port : " + port);
});