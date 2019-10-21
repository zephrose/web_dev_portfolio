// Battle Messages
var battleMsg = ["Follow ME!",
				  "Simon Says...",
				  "Are we going to Play?",];

// Simon Insults
var youLostMsg = ["Take Off The Blindfold!",
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
	buttonColors : ["red","blue","green","yellow"],
	gamePattern : [],
	playerPattern : [],
	strict: false,
}

// Start Game on Title Click
$("h1").on("click", startGame);

// Button Clicks
$(".btn").on("click", function (event) {	
	var eventId = event.target.id;
	
	if (game.count != 0) {
		addToPlayer(eventId);
	}
});

function startGame () {
	clearGame();
}

function clearGame () {
	// Reset our Game
	game.gamePattern = [];
	game.count = 0;

	// New Battle Msg
	$("h1").text(battleMsg[Math.floor((Math.random()*3))]);
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
	game.gamePattern.push(game.buttonColors[Math.floor((Math.random()*4))]);
	showMoves();
	console.log(game.gamePattern);
}

function showMoves() {
	var i = 0;
	var moves = setInterval(function () {
		playGame(game.gamePattern[i]);
		i++;
		if (i >= game.gamePattern.length) {
			clearInterval(moves);
		}
	}, 600);

	clearPlayer();
}

function clearPlayer () {
	game.playerPattern = [];
}

function addToPlayer (color) {
	game.playerPattern.push(color);
	console.log(game.playerPattern);
	playerTurn(color);
}

function playerTurn (currentLevel) {
	if (game.playerPattern[game.playerPattern.length - 1] !== 
		game.gamePattern[game.playerPattern.length - 1]) {
		if (game.strict) {
			gameOver();
		} else {
			tryAgain();
		}
	} else {
		playGame(currentLevel);
		var check = game.playerPattern.length === game.gamePattern.length;
		console.log(check);
		if (check) {
			nextMove();
		}
	}
}

function gameOver () {
	wrong.play();
	$("h1").text(youLostMsg[Math.floor((Math.random()*3))]);
	$("#sub-text span").text("Click Title To Start Game");

	$("body").addClass("game-over");

	setTimeout(function(){
		$("body").removeClass("game-over");
	}, 100); // .1 second
}

function tryAgain () {
	wrong.play();
	$("h1").text(youLostMsg[Math.floor((Math.random()*3))]);

	showMoves();

	setTimeout(function() {
		$("h1").text(battleMsg[Math.floor((Math.random()*3))]);
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


