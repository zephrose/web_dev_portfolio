//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeContent = "Welcome! Thank you visiting my personal Blog. Below is the journey I have taken, and continue to take, on becoming a full fledged web develop.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render('home', {homeCont: homeContent, posts: posts});
});

app.get("/about", function(req, res) {
	res.render('about', {aboutCont: aboutContent});
});

app.get("/contact", function(req, res) {
	res.render('contact', {contactCont: contactContent});
});

app.get("/compose", function(req, res) {
	res.render('compose', {});
});

app.post("/compose", function(req, res) {
	posts.push({title: req.body.blog_title, body: req.body.blog_message});
	res.redirect("/");
});

app.get("/posts/:postId", function(req, res) { 
	
	if (posts === undefined || posts.length === 0) { 
		console.log("No Posts Populated"); 
	}

	let postId = req.params.postId;
	let foundPost = posts.find(function(post) { 
		return _.lowerCase(post.title) === _.lowerCase(req.params.postId); 
	});

	if ( foundPost != undefined ) {
		console.log("Post Present...\n" + foundPost.title + " : " + foundPost.body);
		res.render("post", {title: foundPost.title, body: foundPost.body});
	} else {
		console.log(req.params.postId + " - postId : Post does not exist...");
		res.redirect("/");
	}
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
