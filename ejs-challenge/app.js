//jshint esversion:6

// Requires
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

// TODO: Move this...
const homeContent = "Welcome! Thank you visiting my personal Blog. Below is the journey I have taken, and continue to take, on becoming a full fledged web develop.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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
			"mongodb://localhost:27017/blogDB", 
			{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
		);

// Schema
const postSchema = new mongoose.Schema({
	title: String,
	post: String
});

// Model
const Post = mongoose.model("Post", postSchema);

// Routing
app.get("/", function(req, res) {

	Post.find(function(err, posts) {
	    if (err) {
	    	console.log(err);
	    } else {
	    	res.render("home", {homeCont: homeContent, posts: posts});
	    }
	});

});

app.get("/compose", function(req, res) {
	res.render('compose', {});
});

app.post("/compose", function(req, res) {

	const newPost = new Post({
		title: req.body.blog_title,
		post: req.body.blog_message
	});
	newPost.save(function(err){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/");
		}
	});

});

app.get("/post/:postId", function(req, res) { 

	let postId = req.params.postId;

	Post.findOne({_id: postId}, function(err, foundPost) {
		if (err) {
			console.log(err);
		} else {
			res.render("post", {title: foundPost.title, post: foundPost.post});	
		}      
    }); 

});

app.get("/about", function(req, res) {
	res.render('about', {aboutCont: aboutContent});
});

app.get("/contact", function(req, res) {
	res.render('contact', {contactCont: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
