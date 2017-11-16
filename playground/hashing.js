// const {SHA256} = require('crypto-js');
//
// var message = "I am king";
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash : SHA256(JSON.stringify(data)+'somestring').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data)+'somestring').toString();
//
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data CHANGED');
// }

var jwt = require('jsonwebtoken');

var data = {
  id: 4
};

var token = jwt.sign(data, "123");
console.log(token);

var decoded = jwt.verify(token,"123");
console.log("decoded:",decoded);
