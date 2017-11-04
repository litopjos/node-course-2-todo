var mongoose = require('mongoose');

//mongoose.promise = global.Promise;
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/ToDoApp');

module.exports = {mongoose};
