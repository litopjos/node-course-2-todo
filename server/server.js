var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.port = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp';
} else if (env === test) {
  process.env.port = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest';
}

console.log (`Database: ${process.env.MONGODB_URI}`)

var express = require('express');
var bodyparser = require ('body-parser');
var _ = require('lodash');

var {ObjectID} = require('mongodb');
var {mongoose} = require ('./db/mongoose.js');
var {User} = require ('./model/user.js');
var {ToDo} = require ('./model/todo.js');

const port = process.env.PORT;

var app = express();

app.use(bodyparser.json());

app.post("/todos",  (req,res)=>{
  console.log(req.body);
  console.log('hey there');

  var todo = new ToDo({
    text: req.body.text
  });

  todo.save().then(
    (doc)=>{
      res.send(doc);
    },

    (e)=>{
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req,res)=> {
  ToDo.find().then(
    (todos)=>{
      res.send({todos});
    },

    (e)=>{
      res.status(400).send(e);
    }
  );
});

app.get("/todos/:id", (req,res)=> {
  if(!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("invalid id");
  }

  var id = req.params.id;
  ToDo.findById(id)
  .then(
    (todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }
  )
  .catch ((e)=>{
    return res.status(400).send(e);
  })

});

app.delete("/todos/:id",(req,res)=>{
  console.log('delete');
  if(!ObjectID.isValid(req.params.id)) {
    return res.status(404).send("invalid id");
  }

  var id = req.params.id;
  ToDo.findByIdAndRemove(id)
  .then( (todo)=>{
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  })
  .catch ((e)=>{
    res.status(400).send();
  })

});

// Route to update a ToDo resource
app.patch("/todos/:id",(req,res)=>{

  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send("invalid id");
  }

  if(_.isBoolean(body.completed) && body.completed ) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  ToDo.findByIdAndUpdate(id, {$set:body}, {new:true})
  .then( (todo)=>{
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  })
  .catch ((e)=>{
    res.status(400).send();
  })

});


app.listen(3000, ()=>{
  console.log (`started and listening on port ${port}`);
})

module.exports = {app};
