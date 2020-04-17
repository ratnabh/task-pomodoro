const express = require("express");
const bodyparser = require("body-parser");
const Task = require("./models/Task");
var cron = require("node-cron");
const task = require("./router/task");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ananya:LDO9F8tc1Yq88dcu@cluster0-bxzzc.mongodb.net/pomodoro?retryWrites=true&w=majority",
  () => {
    console.log("connected to db");
  }
);
var cors = require("cors");
const app = express();



cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
  
      Task.find({} , (err, users) => {
          if(err) return console.log(err)
  
          users.map(user => {
              console.log(user)
              let d=Date.now()
              if(user.dateToBeDeleted<d){
                console.log('needs to be deleted')
                user.remove()
              }
          })
      })
  
});





app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(express.static('client/build'));
app.use(task);
// app.use(postroute)
const port = process.env.PORT || 5000;
app.listen(port);
