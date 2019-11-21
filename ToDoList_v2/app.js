//jshint esversion:6
// Require
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

// App
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// DB connection
mongoose.connect(
                "mongodb+srv://webdev:P%4055word123@cluster0-webdevbootcamp-gpcbp.mongodb.net/todolistDB?retryWrites=true&w=majority", 
                {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
                );

// Schema
const itemSchema = new mongoose.Schema({
  name: String
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

// Model
const Item = mongoose.model("Item", itemSchema);

const List = mongoose.model("List", listSchema);

// Path
app.get("/", function(req, res) {

  // const day = date.getDate();

  Item.find(function(err, todoList) {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {listTitle: "Today", newListItems: todoList});
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  if ( listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+listName);
    });    
  }  

});

app.post("/remove", function(req, res) {

  const todoId = req.body.todoItem;
  const listName = req.body.listName;

  if ( listName === "Today" ) {
    Item.findByIdAndRemove(todoId, function(err) { 
     if(err){
       console.log(err);
     } else {
      console.log("Record " + todoId + " successfully removed.");
      res.redirect("/");
     }
    });
  } else {
    List.findOneAndUpdate(
      {name: listName},
      {$pull: {items: {_id: todoId}}},
      function(err, foundList) {
        if (!err){
          res.redirect("/"+listName);
        }
      });
  }  
  
});

app.get("/:customListName", function(req,res){

  const customListName = _.capitalize(req.params.customListName); 

  List.findOne( {name: customListName}, function(err, foundList) {
    if(err){ console.log(err); } 
    else {
      if ( !foundList ) {
        const list = new List({
          name: customListName,
          items: []
        });
        list.save();
        res.redirect("/"+customListName);
      } else {
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }    
  });  
});

app.get("/about", function(req, res){
  res.render("about");
});

// Listen
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
