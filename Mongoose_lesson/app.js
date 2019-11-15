// Requires
var mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb://localhost:27017/gamesDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Schema
const gameSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Must specify a game name"]
	},
	rating: {
		type: Number,
		min: [1, "Rating cannot be less than 1"],
		max: [10, "Rating cannot be more than 10"]
	},
	review: String
});

const characterSchema = new mongoose.Schema({
	name: String,
	age: Number,
	game: gameSchema	
});

// Model
const gameModel = mongoose.model("Game", gameSchema);
const characterModel = mongoose.model("Character", characterSchema);

// Input
const game = new gameModel({
	name: "Nier: Automata",
	rating: 9.2,
	review: "The Anticipated Sequal to the timeless classic \'Nier\'"
});

game.save();

const character = new characterModel({
	name: "2B",
	age: 28,
	game: game	
});

// Save
character.save();
// characterModel.insertMany([character_1, character_2, character_3], function(err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		mongoose.connection.close();
// 		console.log("Successfully Insert Multiple Records.")
// 	}
// });


// Deletes
// gameModel.deleteOne({name: "Mirage"}, function(err) { 
// 	if(err){
// 		console.log(err);
// 	} else {
// 		mongoose.connection.close();
// 	}
// });

// characterModel.deleteOne({name: "Nier"}, function(err) { 
// 	if(err){
// 		console.log(err);
// 	} else {
// 		mongoose.connection.close();
// 	}
// });

// characterModel.deleteMany({game: "Nier"}, function(err) { 
// 	if(err){
// 		console.log(err);
// 	} else {
// 		mongoose.connection.close();
// 	}
// });

// Find
gameModel.find(function(err, games) {
	if(err){
		console.log(err);
	} else {
		mongoose.connection.close();
		// console.log(games);
		games.forEach(function(game){
			console.log("Game : " + game.name + " - Review : " + game.review);
		});
	}
});

characterModel.find(function(err, chars) {
	if(err){
		console.log(err);
	} else {
		mongoose.connection.close();
		// console.log(chars);
		chars.forEach(function(char){
			console.log("Game : " + char.game + " - Name : " + char.name);
		});		
	}
});


