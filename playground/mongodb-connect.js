// test comment
const {MongoClient,ObjectID} = require('mongodb');

var id = new ObjectID();
console.log(id.getTimestamp());

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }

  console.log('connected');

//   db.collection('ToDos').insertOne({
//     text: 'Something to do',
//     completed: false},
//     (err,result)=>{
//       if (err) {
//         return console.log('Unable to insert ToDos',err);
//       }
//
//       console.log(JSON.stringify(result.ops));
//     })
//
//   db.close();
// })

// db.collection('Users').insertOne({
//   name: 'Joselito Pe',
//   age: 50,
//   location: 'Gasan,Marinduque'
//   },
//   (err,result)=>{
//     if (err) {
//       return console.log('Unable to insert ut Users',err);
//     }
//
//     console.log(JSON.stringify(result.ops));
//   })
//

// })

  // db.collection('ToDos').find({_id:new ObjectID('59f579464f6a7306a8fc6106')}).toArray().then((docs)=>{
  //   console.log('To Dos collection:',docs);
  // },(err)=>{
  //   console.log('unable to obtain ToDos collection',err);
  // });

  // db.collection('ToDos').find().count().then((count)=>{
  //   console.log(`To Dos collection count: ${count}`);
  // },(err)=>{
  //   console.log('unable to obtain ToDos collection count',err);
  // });

  db.collection('Users').find({name:'Joselito Pe'}).toArray().then((docs)=>{
    console.log('Users collection having a specific name:',docs);
  },(err)=>{
    console.log('unable to obtain Users collection',err);
  });

  db.close();
})
