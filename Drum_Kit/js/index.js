// Vars
var drumsBtn = document.querySelectorAll(".drum");
var tom_1_drum = new Audio("sounds/tom-1.mp3");
var tom_2_drum = new Audio("sounds/tom-2.mp3");
var tom_3_drum = new Audio("sounds/tom-3.mp3");
var tom_4_drum = new Audio("sounds/tom-4.mp3");
var snare_drum = new Audio("sounds/snare.mp3");
var crash_drum = new Audio("sounds/crash.mp3");
var kick_drum = new Audio("sounds/kick-bass.mp3");

// Set Handle
for (var i = 0; i < drumsBtn.length; i++) {
	drumsBtn[i].addEventListener("click", handleClick);
}

function handleClick() {

	// switch (this.innerHTML) {
	// 	case 'w':
	// 		tom_1_drum.play();
	// 	break;
	// 	case 'a':
	// 		tom_2_drum.play();
	// 	break;
	// 	case 's':
	// 		tom_3_drum.play();
	// 	break;
	// 	case 'd':
	// 		tom_4_drum.play();
	// 	break;
	// 	case 'j':
	// 		snare_drum.play();
	// 	break;
	// 	case 'k':
	// 		crash_drum.play();
	// 	break;
	// 	case 'l':
	// 		kick_drum.play();
	// 	break;
	//
	// 	default : console.log(this.innerHTML); break;
	//
	// }

	if (this.innerHTML == 'w'){ tom_1_drum.play(); }
	if (this.innerHTML == 'a'){ tom_2_drum.play(); }
	if (this.innerHTML == 's'){ tom_3_drum.play(); }
	if (this.innerHTML == 'd'){ tom_4_drum.play(); }
	if (this.innerHTML == 'j'){ snare_drum.play(); }
	if (this.innerHTML == 'k'){ crash_drum.play(); }
	if (this.innerHTML == 'l'){ kick_drum.play(); }


}
