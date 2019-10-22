// node fizzbuzz.js
// Change 'ourRange' for smaller/larger values

var ourRange = 1000;
var fizz = "fizz";
var buzz = "buzz";

function fizzbuzz (number) {
	if (number % 15 === 0) {
		return fizz+buzz;
	}
	if (number % 5 === 0) {
		return buzz;
	}
	if (number % 3 === 0) {
		return fizz;
	}
	return number;
}

for (let i = 0; i <= ourRange; i++) {
	console.log(fizzbuzz(i));
}
