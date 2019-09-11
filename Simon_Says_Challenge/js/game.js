// Debug
//$("h1").on("mouseover", nextSequence);

// Var
var battle_msg = ["Follow ME!",
				  "Simon Says...",
				  "Are we going to Play?",]

var button_colors = ["red","blue","green","yellow"];
var game_pattern = [];
var randNum = 0
var chosen_color = "";

var blue_snd = new Audio("sounds/blue.mp3");
var green_snd = new Audio("sounds/green.mp3");
var red_snd = new Audio("sounds/red.mp3");
var yellow_snd = new Audio("sounds/yellow.mp3");
var wrong_snd = new Audio("sounds/wrong.mp3");

// Start Game on Title Click
$("h1").on("click", startGame);

// Button Clicks
$(".btn").on("click", function (event) {
	var event_id = event.target.id;
	//debug
	//console.log(event.target.id);
	if (event_id == 'blue'){ blue_snd.play()}
	if (event_id == 'green'){ green_snd.play()}
	if (event_id == 'red'){ red_snd.play()}
	if (event_id == 'yellow'){ yellow_snd.play()}

	$("#" + event_id).addClass("pressed");
	
	setTimeout(function(){
		$("#" + event_id).removeClass("pressed");
	}, 100); // .1 second
});

function nextSequence () {
	randNum = Math.floor((Math.random()*4));
	game_pattern.push(button_colors[randNum]);
	console.log(game_pattern);
}

function simonSays () {
	console.log("Starting new Game");

}

function startGame () {
	game_pattern = [];
	chosen_color = "";

	$("h1").text(battle_msg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Reset Game");

	simonSays();
}
