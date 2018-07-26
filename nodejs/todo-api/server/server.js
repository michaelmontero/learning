const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 7979;

var { Todo } = require("./models/Todo");
var { User } = require("./models/User");
var { TodoService } = require("./services/todo.services");

var app = express();
app.use(bodyParser.json());

app.post("/todo", (req, res)=>{
  var todo = new Todo({
    text : req.body.text
  });
  res.json(TodoService.add(todo));
});

app.listen(port, ()=>{
  console.log(`Serve started on port ${port}`)
})
