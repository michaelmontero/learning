const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/Todo");
const {todos, populateTodos} = require("./seed");

beforeEach(populateTodos);

describe("POST /todos => CREATE NEW TODO", ()=>{
  it("It should create a new todo", (done) =>{
    var text = "Testing..";

    request(app)
      .post("/todo")
      .send({text})
      .expect(200)
      .expect((res) =>{
          expect(res.body.text).toBe(text);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });
});

  describe("POST /todos=>invalid data", ()=>{
    it("Should not create any data with invalid body data", (done)=>{
      request(app)
      .post("/todo")
      .send({})
      .expect(400)
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        Todo.find({}).then((todos)=>{
          expect(todos.length).toBe(2)
          done();
        });
      });
    });
  });

describe("GET /todos", ()=>{
  it("Should return all todos", (done)=>{
      request(app)
      .get("/todos")
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
