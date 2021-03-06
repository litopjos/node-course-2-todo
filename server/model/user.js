var mongoose = require('mongoose');
const validator = require ('validator');
const jwt = require ('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type:String,
    required: true,
    trim:true,
    minlength: 1,
    unique:true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type:String,
    required:true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  var user = this;

  var userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);

};

// Instance Method: generateAuthToken()
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access},'abc123').toString();

  user.tokens.push({access,token});
  return user.save().then(()=>{
    return token;
  });
}

// Model Method: findByToken()
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    console.log(token);
    try {
      decoded = jwt.verify(token,"abc123");
      console.log(decoded);

    } catch(e) {
      return new Promise((resolve,reject)=>{
        reject();
      })
      console.log("error:",e);
    }

    return User.findOne({
      _id: decoded._id,
      // The quotes is because tokens is an array.
      'tokens.token': token,
      'tokens.access': 'auth'
    });


}


var User = mongoose.model("User", UserSchema);

module.exports = {User};
