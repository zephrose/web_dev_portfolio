
$("h1").on("mouseover", function() {
	$(".title").css("color", "purple");
});

$("button.blue").click(function () {
	$(".title").css("color", "blue");
});
	
$("button.red").click(function () {
	$(".title").css("color", "red");
});

$("button.green").click(function () {
	$(".title").css("color", "green");
});

$("button.reset").click(function () {
	$(".title").css("color", "green");
	$(".title").text("Welcome To JQuery")
});

$("body").keypress(function (event) {
	$(".title").text(event.key)
});


