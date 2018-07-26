var {mongose} = require("./../db/mongoose");

var { Todo } = require("./../models/Todo");
var { User } = require("./../models/User");

var add = (todo)=>{
  todo.save().then((doc)=>{
    return doc;
  },(e)=>{
      return {e};
  });
};

module.exports = {
  TodoService : {
    add
  }
};
