const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = "auth";
  var token = jwt.sign({ _id : user._id.toHexString(), access},"Some secret").toString();

  user.token = user.token.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  });
};

var User = mongoose.model("User", UserSchema );

module.exports = {User};
