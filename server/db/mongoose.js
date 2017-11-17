var mongoose = require('mongoose');

//mongoose.promise = global.Promise;
mongoose.Promise = require('bluebird');


//mongoose.connect(process.env_MONGODB_URI)
//console.log("mongo connect",process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .catch((e)=>{
    console.log("err:",e);
  })

module.exports = {mongoose};
