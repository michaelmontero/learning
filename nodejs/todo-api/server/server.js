var {mongose} = require("./db/mongoose");

var { Todo } = require("./models/Todo");
var { User } = require("./models/User");

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 7979;

var app = express();
app.use(bodyParser.json());

app.get("/todos", (req, res)=>{
  Todo.find({}).then((todos)=>{
    res.send({todos})
  }, (err)=>{
    res.status(400).send({err})
  });
})

app.post("/todo", (req, res)=>{
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
      res.status(400).send(e);
  });

});

app.listen(port, ()=>{
  console.log(`Serve started on port ${port}`)
})

module.exports = {app};
