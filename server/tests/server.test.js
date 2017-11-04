const expect = require ('expect');
const request = require ('supertest');

const {app} = require('./../server.js');
const {ToDo} = require('./../model/todo');

beforeEach((done)=>{
  ToDo.remove({}).then(()=>done());
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

describe('post /TODOS', ()=>{
  it ('should create a new todo', (done)=>{
    var text = 'Test ToDo text again';


    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err) {
          return done(err);
        }

        ToDo.find().then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        })
      })
      .catch((e)=>{
          done(e);
      });
  })
});
