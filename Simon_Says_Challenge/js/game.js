// Debug
//$("h1").on("mouseover", nextSequence);

// Var
var battle_msg = ["Follow ME!",
				  "Simon Says...",
				  "Are we going to Play?",];

var you_lost_msg = ["Take Off The Blindfold!",
				  	"Simon Didn't Say...",
				  	"Want To Play Again?",];				  

var button_colors = ["red","blue","green","yellow"];
var game_pattern = [];
var audio_pattern = [];
var user_pattern = [];
var index = 0;
var randNum = 0;
var chosen_color = "";

var runGame = 1;

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
	
	user_pattern.push(event_id);

	playButtonSound(event_id);

	playButtonPress(event_id);

	console.log(user_pattern);
});


function simonSays () {
	console.log("Starting new Game");
	
	// Get our first Button
	nextSequence();


	

}

function startGame () {
	//game_pattern = [];
	// audio_pattern = [];
	user_pattern = [];
	chosen_color = "";

	$("h1").text(battle_msg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Reset Game");

	simonSays();
}

function nextSequence () {
	randNum = Math.floor((Math.random()*4));
	addColorSoundSequence(button_colors[randNum]);
	playSequence();
}

function addColorSoundSequence (color) {
	game_pattern.push(color);
	if (color == 'blue'){ audio_pattern.push(blue_snd);}
	if (color == 'green'){ audio_pattern.push(green_snd);}
	if (color == 'red'){ audio_pattern.push(red_snd);}
	if (color == 'yellow'){ audio_pattern.push(yellow_snd);}
	console.log(audio_pattern);
	console.log(game_pattern);
}

function playSequence () {
	index = 0;
	playSoundInSequence(audio_pattern[index]);
}

function endGame () {
	wrong_snd.play()
	$("h1").text(you_lost_msg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Start Game");
}

function playSoundInSequence (audio) {

	if (!audio || !(audio instanceof Audio)) return;

	audio.addEventListener('ended', function() {
	  index++;
	  playSoundInSequence(audio_pattern[index]);
	})
	audio.play();

}

function playButtonSound (color) {
	if (color == 'blue'){ blue_snd.play()}
	if (color == 'green'){ green_snd.play()}
	if (color == 'red'){ red_snd.play()}
	if (color == 'yellow'){ yellow_snd.play()}
}

function playButtonPress (color) {
	$("#" + color).addClass("pressed");
	
	setTimeout(function(){
		$("#" + color).removeClass("pressed");
	}, 100); // .1 second
}
