const expect = require ('expect');
const request = require ('supertest');

const {app} = require('./../server.js');
const {ToDo} = require('./../model/todo');

var todos= [
  { text: "first todo"},
  { text: "2nd to do"}
];

beforeEach((done)=>{
  ToDo.remove({}).then(()=>{
      return ToDo.insertMany(todos);
  }).then(()=>done());
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

        ToDo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      })

  })
});

describe ('GET /todos', ()=>{
  it ('should return 2 todos', (done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end((err,res)=>{
        if(err) {
          return done(err);
        }
        done();
      })
      // .catch((e)=>{
      //     done(e);
      // });
  });
});
