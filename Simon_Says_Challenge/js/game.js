// Battle Messages
var battle_msg = ["Follow ME!",
				  "Simon Says...",
				  "Are we going to Play?",];

// Simon Insults
var you_lost_msg = ["Take Off The Blindfold!",
				  	"Simon Didn't Say...",
				  	"Want To Play Again?",];

// Button Sounds
var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");

// Game object
var game = {
	count : 0,
	button_colors : ["red","blue","green","yellow"],
	game_pattern : [],
	user_pattern : [],
	strict: false,
}

// Start Game on Title Click
$("h1").on("click", startGame);

// Button Clicks
$(".btn").on("click", function (event) {
	var event_id = event.target.id;

	addToPlayer(event_id);

	//playGame(event_id);

	//checkAnswer(level);
	//nextSequence();
});

function startGame () {
	clearGame();
}

function clearGame () {
	// Reset our Game
	game_pattern = [];
	level = 0;

	// New Battle Msg
	$("h1").text(battle_msg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Reset Game");

	// Start the next move
	nextMove();
}

function nextMove () {
	// Update our level count
	game.count++;
	$("#level span").text("Level : " + game.count);

	// Gen Next Move
	generateMove();	
}

function generateMove () {
	game.game_pattern.push(game.button_colors[Math.floor((Math.random()*4))]);
	showMoves();
	console.log(game.game_pattern);
}

function showMoves() {
	var i = 0;
	var moves = setInterval(function () {
		playGame(game.game_pattern[i]);
		i++;
		if (i >= game.game_pattern.length) {
			clearInterval(moves);
		}
	}, 600);

	clearPlayer();
}

function clearPlayer () {
	game.user_pattern = [];
}

function addToPlayer (color) {
	game.user_pattern.push(color);
	console.log(game.user_pattern);
	playTurn(color);
}

function playTurn (currentLevel) {
	if (game.user_pattern[game.user_pattern.length - 1] !== 
		game.game_pattern[game.game_pattern.length - 1]) {
		if (game.strict) {
			gameOver();
		} else {
			tryAgain();
		}
	} else {
		playGame(currentLevel);
		var check = game.user_pattern.length === game.game_pattern.length;
		if (check) {
			nextMove();
		}
	}
}

function gameOver () {
	wrong.play();
	$("h1").text(you_lost_msg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Start Game");

	$("body").addClass("game-over");

	setTimeout(function(){
		$("body").removeClass("game-over");
	}, 100); // .1 second

	startGame();
}

function tryAgain () {
	wrong.play();
	$("h1").text(you_lost_msg[Math.floor((Math.random()*3))]);

	showMoves();

	setTimeout(function() {
		$("h1").text(battle_msg[Math.floor((Math.random()*3))]);
	}, 1000); 
}

function playGame (color) {
	$("#" + color).addClass("pressed");
	playSound(color);
	setTimeout(function(){
		$("#" + color).removeClass("pressed");
	}, 100); // .1 second
}

function playSound (color) {
	if (color == 'blue'){ blue.play(); }
	if (color == 'green'){ green.play(); }
	if (color == 'red'){ red.play(); }
	if (color == 'yellow'){ yellow.play(); }
}


