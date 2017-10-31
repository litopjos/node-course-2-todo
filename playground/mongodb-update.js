// test comment 2
const {MongoClient,ObjectID} = require('mongodb');

var id = new ObjectID();
console.log(id.getTimestamp());

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected');

  // db.collection('ToDos').findOneAndUpdate(
  //   {_id: new ObjectID("59f8621a4f6a7306a8fcc167")},
  //   { $set :{completed:true }
  //   },
  //   {returnOriginal:false}).then((result)=>{
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate(
    {_id: new ObjectID("59f457feea58702530ae3e6a")},
    { $set :{name: 'Joselito Pe' },
      $inc: {age:1}
    },
    {returnOriginal:false}).then((result)=>{
      console.log(result);
    });



  db.close();
})
