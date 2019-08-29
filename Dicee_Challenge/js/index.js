// Random Numbers
randomNumber1 = 0;
randomNumber2 = 0;

function getRandomNum() {
	return (Math.floor(Math.random() * 6) + 1);
}

function whoWon(theVictor) {
	document.querySelector("h1").innerHTML = theVictor;
}

function setDiceImg(d1, d2) {
	var dice = document.querySelectorAll("img");
	dice[0].setAttribute("src", "images/dice" + d1 + ".png");
	dice[1].setAttribute("src", "images/dice" + d2 + ".png");
}

function playDiceGame() {
	randomNumber1 = getRandomNum();
	randomNumber2 = getRandomNum();

	if (randomNumber1 > randomNumber2) {
		whoWon("Player 1 Wins!");
	} else if (randomNumber1 < randomNumber2) {
		whoWon("Player 2 Wins!");
	} else {
		whoWon("Draw!");
	}

	setDiceImg(randomNumber1, randomNumber2);
}