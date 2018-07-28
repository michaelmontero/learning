require("./config/config.js");

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const {mongose} = require("./db/mongoose");
const {ObjectId} = require("mongodb");
const { Todo } = require("./models/Todo");
const { User } = require("./models/User");
const {authenticate} = require("./middleware/authenticate");

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

app.post("/user", (req, res)=>{
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
  user.generateAuthToken().then((token)=>{
    res.header("x-auth", token).send(user);
  }).catch((err)=>{
    res.status(400).send(err);
  });
});

app.get("/user/me", authenticate, (req, res)=>{
    res.send(req.user);
});

app.listen(port, ()=>{
  console.log(`Serve started on port ${port}`)
})

module.exports = {app};
