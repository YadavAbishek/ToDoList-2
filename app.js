const express = require("express");
const bodyParser = require("body-parser");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const mongoose  = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

require('dotenv').config();

app.set('view engine', 'ejs');

mongoose.connect(process.env.mongo_connect_url);

var items = [];

var ToDoList = mongoose.model("ToDoList", {
  name: String
});

app.get("/", function(req, res){
  var today = new Date();

  // if(currentDay==6 || currentDay==0){
  //   day = "Weekend"
  // }
  // else{
  //   day = "Weekday";
  // }


  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  var day = today.toLocaleDateString("en-US", options);


  //
  // switch(currentDay){
  //   case 0:
  //     day="sun";
  //     break;
  //
  //   case 1:
  //     day="mon";
  //     break;
  //
  //   case 2:
  //     day="tue";
  //     break;
  //
  //   case 3:
  //     day="wed";
  //     break;
  //
  //   case 4:
  //     day="thurs";
  //     break;
  //
  //   case 5:
  //     day="fri";
  //     break;
  //
  //   case 6:
  //     day="sat";
  //     break;
  //
  //   default:
  //     colsole.log("Error: current day is equal to: " + currentDay);
  // }

  // day += "day";

  // const dom = new JSDOM('list');
  //
  // console.log(dom.window.document.querySelectorAll("#item_in_database#item_check").checked);

  // list_present.forEach((element)=>{
  //   console.log(element.item_check);
  // });

  ToDoList.find().then((result)=>{
    res.render('list', {kindofDay: day, newListItems: result});
  }).catch((err) => console.log(err));

});

app.post("/delete", (req, res) => {
  const toDelete = req.body.checkbox;

  ToDoList.deleteOne({"_id" : toDelete}).catch((err)=>console.log(err));
  res.redirect("/");
})

app.post("/" , (req, res) => {
  var item_to_be_added = req.body.newItem;

  const item = new ToDoList({name: item_to_be_added});
  item.save();

  res.redirect("/");
})

app.listen(PORT, function(){
  console.log("Server is Started Successfully");
});
