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
// ARTICLES
app.route("/articles")
	.get(function(req, res) {
		Article.find(function(err, foundArticles) {
			if (!err) {
				console.log(foundArticles);
				res.send(foundArticles);
			} else {
				console.log(err);
				res.send(err);
			}
		})
	})
	.post(function(req, res) {
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
	})
	.delete(function(req, res) {
		Article.deleteMany({}, function(err) {
			if (!err) {
				console.log("Delete All Articles");
				res.status(200).send("All Articles Deleted");
			} else {
				res.status(500).send("Something went wrong with the deletion. Please check and try again : " + err);
			}
		});
	});

// ARTICLES/:PARAM
app.route("/articles/:articleTitle")
	.get(function(req, res) {
		Article.find({ title: req.params.articleTitle }, null, function(err, foundArticle) {
			if (!err) {
				console.log(foundArticle);
				res.status(200).send(foundArticle);
			} else {
				console.log(err);
				res.status(400).send(err);
			}
		});
	})
	.put(function(req, res) {
		Article.updateOne({ title: req.params.articleTitle }, 
					   { title: req.body.title, content: req.body.content },
					   function(err, result){
					   	if (!err) {
					   		console.log(result);
					   		res.send("number of documents updated : " + result.n);
					   	} else {
					   		console.log(err);
					   	}
		});
	})
	.patch(function(req, res) {
		Article.updateOne({ title: req.params.articleTitle }, 
					   { content: req.body.content },
					   function(err, result){
					   	if (!err) {
					   		console.log(result);
					   		res.send("number of documents updated : " + result.n);
					   	} else {
					   		console.log(err);
					   	}
		});
	});

app.listen(port, function() {
  console.log("Server started on port " + port);
});