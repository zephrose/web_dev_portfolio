//jshint esverion: 6

// Require
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// App
const app = express();
const port = process.env.PORT;

// Mail
const api_region = "us20";
const api_base = "https://"+api_region+".api.mailchimp.com/3.0/";
const mc_key = "ba2ba2511307e0e04011e35af897aac3-"+api_region;
const mc_listId = "a9e5cc128a";

// App Uses
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

// APIs
// GET
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.get("/failed", function (req, res) {
	res.redirect("/");
});

// POST
app.post("/", function (req, res) {
	var firstName = req.body.fName;
	var lastName = req.body.lName;
	var email = req.body.email;

	console.log("{ " + firstName + " : First Name, " + lastName + " : Last Name, " + email + " : Email }");

	var data = {
		members: [
			{
				email_address: email, 
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};

	var jsonData = JSON.stringify(data);

	var options = {
		method: "POST",
		url: api_base+"lists/"+mc_listId,
		headers: {
			"Authorization": "authKey " + mc_key
		},
		
		body: jsonData
	};

	request(options, function(err, resp, body){
		if (err) {
			console.log(err);
			res.send("Unsuccessful Request : " + err);
		} else {
			console.log(resp.statusCode);
			if (resp.statusCode === 200) {
				res.sendFile(__dirname + "/success.html");
			} else {
				res.sendFile(__dirname + "/fail.html");
			}
		}
	});
});

// Listening on 
app.listen(port || 3000, function () {
	console.log("Server Listening on port : " + port);
});
