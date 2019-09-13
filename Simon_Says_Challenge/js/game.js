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
var user_pattern = [];
var level = 0;
var user_sequence = 0;
var randNum = 0;

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

	playButtonSequence(event_id);

	checkAnswer(level);
	//nextSequence();
});

function startGame () {
	// Reset our Game
	game_pattern = [];
	user_pattern = [];
	level = 0;

	// New Battle Msg
	$("h1").text(battle_msg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Reset Game");

	nextSequence();
}

function nextSequence () {
	level++;
	$("#level span").text("Level : " + level);

	randNum = Math.floor((Math.random()*4));
	btnColor = button_colors[randNum];
	game_pattern.push(btnColor);

	setTimeout(function(){
		playButtonSequence(game_pattern[level-1]);
	}, 1200); // 1.2sec delay
}

function  checkAnswer (currentLevel) {
	// Dont do check against the player if not started
	if (game_pattern === undefined || game_pattern.length == 0) {return;}
	if (user_pattern === undefined || user_pattern.length == 0) {return;}

	// // Check for correctness
	// if (user_sequence != currentLevel) {
	// 	if (game_pattern[user_sequence] != user_pattern[user_sequence]) {
	// 		gameOver();
	// 	}
	// 	user_sequence++;
	// } else if (user_sequence == currentLevel) {
	//
	// }

	if (game_pattern[currentLevel-1] === user_pattern[currentLevel-1]) {
		nextSequence();
	} else {
		gameOver();
	}
}

function gameOver () {
	wrong_snd.play()
	$("h1").text(you_lost_msg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Start Game");

	$("body").addClass("game-over");
	setTimeout(function(){
		$("body").removeClass("game-over");
	}, 100); // .1 second
}

function playButtonSequence (color) {
	playButtonSound(color);
	playButtonPress(color);
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
