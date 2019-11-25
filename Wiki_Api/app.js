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





app.listen(port, function() {
  console.log("Server started on port " + port);
});