const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

describe("POST /todos", ()=>{
  it("It should create a new todo", (done) =>{
    var text = "Testing..";

    request(app)
      .post("/todo")
      .send({text});
      .expect(200)
      .expect((res) =>{
          expect(res.body.text).toBe(text);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todo.length).toBe(1);
          expect(todo[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });
})
