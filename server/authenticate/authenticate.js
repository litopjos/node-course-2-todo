var {User} = require ('./../model/user.js');

// authenticate middleware
var authenticate = (req,res,next)=>{
 // token from the request header
 var token = req.header('x-auth');

 // Check token and obtain user credentials associated with the token.
 // Logic should be a Model method in the User collection.

 User.findByToken(token)
 .then((user)=>{
   console.log('findByToken ok:' , user);
   if (!user) {
     // This will cause the catch() block below to be executed.
     return Promise.reject();
   }

   req.user = user;
   req.token = token;

   next();
 })
 .catch ((e)=>{
   console.log('error in findByToken:',e);
   res.status(401).send();
 })
}

module.exports = {authenticate};
