const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res) {
  let day = date();
  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "work list", newListItems: workItems});
});

app.listen(3000, function(){
  console.log("Server on port 3000");
});
