const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


var items=[];

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

  res.render('list', {kindofDay: day, newListItems: items});
});

app.post("/" , (req, res) => {
  var item = req.body.newItem;

  items.push(item);

  res.redirect("/");
})

app.listen(3000, function(){
  console.log("listening at port 3000");
});
