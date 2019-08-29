var drumsBtn = document.querySelectorAll(".drum");

for (var i = 0; i < drumsBtn.length; i++) {
	drumsBtn[i].addEventListener("click", handleClick);
}

function handleClick() {
	alert("Someone Clicked ME!");
}

