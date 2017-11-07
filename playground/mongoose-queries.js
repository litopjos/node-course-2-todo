var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');
var {ToDo} = require('./../server/model/todo');
var {User} = require('./../server/model/user');

var id = "59fb1be0d94a6d643b8a63c4";

if(!ObjectID.isValid(id)) {
  console.log('invalid id');
}
// ToDo.find({_id:id}).then(
//   (todos) =>{
//     console.log(todos);
//   }
// );
//
// ToDo.findOne({_id:id}).then(
//   (todos) =>{
//     console.log(todos);
//   }
// );

// ToDo.findById(id)
// .then(
//   (todo) =>{
//     console.log(todo);
//   }
//   // (err) =>{
//   //   console.log("error:",err);
//   // }
// )
// .catch ((e) => {
//   console.log('catch error:',e);
// });

User.findById(id)
.then(
  (user) =>{
    if (!user) {
      console.log('cant find user');
    }
    console.log(user);
  }
  // (err) =>{
  //   console.log("error:",err);
  // }
)
.catch ((e) => {
  console.log('catch error:',e);
});
