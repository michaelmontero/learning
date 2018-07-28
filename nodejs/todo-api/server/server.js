require("./config/config.js");
var {mongose} = require("./db/mongoose");
var {ObjectId} = require("mongodb");
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
});

app.get("/todo/:id", (req, res)=>{
  var id = req.params.id;
  if(ObjectId.isValid(id)){
    Todo.findById(id).then((todo)=>{
      if(!todo){
        res.send([])
      }
      res.send(todo);
    });
  }else{
    res.status(422).send([]);
  }
});

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
