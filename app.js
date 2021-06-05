//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
var items = ["buy food", "cook food", "eat food"];
let workitems=[];

app.get("/", function(req, res) {
  var today = new Date();
  var currentday = today.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-us", options);

  res.render("list", {
    listtitle: day,
    newlistitems: items
  });


});


app.post("/", function(req, res) {
  var item = req.body.add;

  if(req.body.list=="work"){
    workitems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
      res.redirect("/");
  }


});
app.get("/work",function(req,res){
  res.render("list",{listtitle:"work",newlistitems:workitems});

});


app.listen(3000, function(req, res) {
  console.log("server running");
})
