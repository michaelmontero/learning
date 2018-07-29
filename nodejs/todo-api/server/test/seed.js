
const { ObjectID } = require("mongodb");
const { Todo } = require("./../models/Todo");

const todos = [
    { 
        _id : new ObjectID(),
        text : "Todo 1" 
    },
    { 
        _id : new ObjectID(),
        text : "Todo 2" ,
        completed : true,
        completedAt : 333
    }];

const populateTodos = (done)=>{
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then(()=>done())
  .catch(e => done(e));
};

module.exports = {
    todos, 
    populateTodos
};