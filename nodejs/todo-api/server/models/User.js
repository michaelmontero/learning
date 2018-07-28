const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const secret = "some_secret";

var UserSchema = new mongoose.Schema({
  email :  {
    required : true,
    type : String,
    trim : true,
    minLength : 4,
    unique : true,
    validate :{
      validator : validator.isEmail,
      message : `{VALUE} is not a valid email`
    }
  },
  password :{
    type : String,
    required : true,
    minLength : 6
  },
   tokens : [{
     "access" : {
        type : String,
        require : true
      },
      "token" : {
        type : String,
        require : true
      }
    }]
});

UserSchema.statics.findByToken = function(token){
  var decoded;
  try{
    decoded = jwt.verify(token, secret);
  }catch(e){ 
    return Promise.reject(e);
  }
  return User.findOne({ 
      _id : decoded._id,
      'tokens.token' : token,
      'tokens.access': 'auth'
    });
}

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ["_id","email"]);
};

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = "auth";
  var token = jwt.sign({ _id : user._id.toHexString(), access},secret).toString();

  user.tokens = user.tokens.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  });
};

var User = mongoose.model("User", UserSchema );

module.exports = {User};
