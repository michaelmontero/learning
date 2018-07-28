const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const secret = "some secret";

var UserSchema = new mongoose.Schema({
  email :  {
    required : true,
    type : String,
    trim : true,
    minLength : 4,
    unique : true,
    validate :{
      validator : validator.isEmail,
      message : `{VALUE } is not a valid email`
    }
  },
  password :{
    type : String,
    required : true,
    minLength : 6
  },
  token : [{
    access :{
      type : String,
      require : true
    },
    token : {
      type : String,
      require : true
    }
  }]  
});

UserSchema.static.findByToken = function(token){
  var user = this;
  var decoded;
  try{
    decoded = jwt.verify(token, secret);
  }catch(e){ }
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

  user.token = user.token.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  });
};

var User = mongoose.model("User", UserSchema );

module.exports = {User};
