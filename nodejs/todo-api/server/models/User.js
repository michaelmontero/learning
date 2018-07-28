const mongoose = require("mongoose");
const validator = require("validator");

var User = mongoose.model("User",  {
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

module.exports = {User};
