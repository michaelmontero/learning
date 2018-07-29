var env = process.env.NODE_ENV || "development";

if(env == "test" || env == "development"){
  var config = require("./config.json")[env];
  
  Object.keys(config).forEach((key)=>{
      process.env[key] = config[key];
  });
}