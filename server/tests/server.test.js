const expect = require ('expect');
const request = require ('supertest');
const {ObjectID} = require ('mongodb');

const {app} = require('./../server.js');
const {ToDo} = require('./../model/todo');

var todos= [
  {
    _id: new ObjectID(),
    text: "first todo"
  },
  {
    _id: new ObjectID(),
    text: "2nd to do"
  }
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

describe ('GET /todos:id', ()=>{
  it ('should return todo doc', (done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it ('should return 400 due to invalid _id', (done)=>{
    request(app)
      .get(`/todos/ghibkhkjh`)
      .expect(400)
      .end(done);
  });

  it ('should return 404 due to doc doest exist', (done)=>{
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

});

describe ('DELETE /todos/:id', ()=>{
  it('should remove a todo',(done)=>{
    var id = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(id);
      })
      .end((err,res)=>{
        if (err) {
          return done(err);
        }

        ToDo.findById(id)
          .then((todo)=>{
          expect(todo).toNotExist();
          done();
          })
          .catch(e=>done(e));
      })
  });

  it('should return a 404 when todo not found',(done)=>{
    var id = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  })

  it('should return a 404 if objet id is invalid',(done)=>{
    request(app)
      .delete(`/todos/ghibkhkjh`)
      .expect(404)
      .end(done);
  })
})
