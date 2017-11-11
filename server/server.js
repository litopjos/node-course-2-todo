var express = require('express');
var bodyparser = require ('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require ('./db/mongoose.js');
var {User} = require ('./model/user.js');
var {ToDo} = require ('./model/todo.js');

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

app.listen(3000, ()=>{
  console.log ('started on port 3000');
})

module.exports = {app};
