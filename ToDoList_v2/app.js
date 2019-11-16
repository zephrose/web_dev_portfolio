//jshint esversion:6
// Require
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

// App
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// DB connection
mongoose.connect(
                "mongodb://localhost:27017/todolistDB", 
                {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
                );

// Schema
const itemSchema = new mongoose.Schema({
  name: String
});

// Model
const Item = mongoose.model("Item", itemSchema);

// Input
const shopping = new Item({
  name: "Shopping"
});

const cooking = new Item({
  name: "Cooking"
});

const eating = new Item({
  name: "Eating"
});

// const defaultItems = [shopping, cooking, eating];

// Item.insertMany(defaultItems, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     console.log("Successfully Insert Multiple Records.")
//   }
// });

// Path
app.get("/", function(req, res) {

  const day = date.getDate();

  Item.find(function(err, todoList) {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {listTitle: day, newListItems: todoList});
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const newItem = new Item({
    name: itemName
  });
  newItem.save();

  res.redirect("/");

});

app.post("/remove", function(req, res) {

  const todoId = req.body.todoItem;

  Item.findByIdAndRemove(todoId, function(err) { 
   if(err){
     console.log(err);
   } else {
    console.log("Record " + todoId + " successfully removed.");
    res.redirect("/");
   }
  });
  
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

// Listen
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
