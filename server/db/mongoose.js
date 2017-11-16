var mongoose = require('mongoose');

//mongoose.promise = global.Promise;
mongoose.Promise = require('bluebird');
mongoose.connect(process.env_MONGODB_URI);

module.exports = {mongoose};
