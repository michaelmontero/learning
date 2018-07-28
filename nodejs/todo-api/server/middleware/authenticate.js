const {User} = require("./../models/User");

var authenticate = (req, res, next) => {
  var token = req.header("x-auth");
  User.findByToken(token).then((user)=>{
      if(!user){
          return Promise.reject("Invalid user token");
      }
    req.user = user;
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(400).send(e)
  });
};

module.exports = {authenticate};