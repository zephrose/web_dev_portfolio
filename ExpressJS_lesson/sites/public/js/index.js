// Vars
var drumsBtn = document.querySelectorAll(".drum");
var tom_1_drum = new Audio("sounds/tom-1.mp3");
var tom_2_drum = new Audio("sounds/tom-2.mp3");
var tom_3_drum = new Audio("sounds/tom-3.mp3");
var tom_4_drum = new Audio("sounds/tom-4.mp3");
var snare_drum = new Audio("sounds/snare.mp3");
var crash_drum = new Audio("sounds/crash.mp3");
var kick_drum = new Audio("sounds/kick-bass.mp3");

// Set Handles
document.addEventListener("keydown", handleKeyboard);

for (var i = 0; i < drumsBtn.length; i++) {
	drumsBtn[i].addEventListener("click", handleClick);
}

function handleClick() {
	playDrumKit(this.innerHTML);
}

function handleKeyboard(prs_key) {
	playDrumKit(prs_key.key);
}

// Make the instruments play
function playDrumKit(event) {

	if (event == 'w'){ tom_1_drum.play(); whichDrum(event);}
	if (event == 'a'){ tom_2_drum.play(); whichDrum(event);}
	if (event == 's'){ tom_3_drum.play(); whichDrum(event);}
	if (event == 'd'){ tom_4_drum.play(); whichDrum(event);}
	if (event == 'j'){ snare_drum.play(); whichDrum(event);}
	if (event == 'k'){ crash_drum.play(); whichDrum(event);}
	if (event == 'l'){ kick_drum.play(); whichDrum(event);}

}

function whichDrum(event) {
	
	var playing_instrument = document.querySelector("." + event)
	
	playing_instrument.classList.add("pressed");
	
	setTimeout(function(){
		playing_instrument.classList.remove("pressed");
	}, 100); // .1 second

}