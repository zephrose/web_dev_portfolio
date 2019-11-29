//jshint esversion:6

// Requires
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

// App
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Port
let port = process.env.PORT;
if (port == null || port == "") { port = 3000; }

// DB Connection
mongoose.connect(
			"mongodb://localhost:27017/wikiDB", 
			{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
		);

// Schema
const articleSchema = new mongoose.Schema({
	title: String,
	content: String
});

// Model
const Article = mongoose.model("Article", articleSchema);

// ROUTES
app.get("/articles", function(req, res) {
	Article.find(function(err, foundArticles) {
		if (!err) {
			console.log(foundArticles);
			res.send(foundArticles);
		} else {
			console.log(err);
			res.send(err);
		}
	});
});

app.post("/articles", function(req, res) {
	if (req.body.title != "") {
		const newArticle = new Article({
			title: req.body.title,
			content: req.body.content
		});
		newArticle.save(function(err){
			if (!err) {
				console.log("Save Successful");
				res.status(200).send("Save Successful");
			} else {
				console.log("Save unsuccessful : ")
				res.status(500).send("Error attempting to Save Content : " + err);
			}
		});	
	} else {
		console.log("No title in body. Review contents of body and try again.");
		res.status(400).send("No title in body. Review contents of body and try again.");
	}	
});

app.listen(port, function() {
  console.log("Server started on port " + port);
});