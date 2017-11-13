var express = require('express');
var bodyparser = require ('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require ('./db/mongoose.js');
var {User} = require ('./model/user.js');
var {ToDo} = require ('./model/todo.js');

const port = process.env.PORT || 3000;

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



app.listen(3000, ()=>{
  console.log (`started and listening on port 3000 ${port}`);
})

module.exports = {app};
