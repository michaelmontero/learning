var mongoose = require("mongoose");

const url = "mongodb://localhost:27017";
const dataBaseName = "Todo";

mongoose.Promise = global.Promise;
mongoose.connect(`${url}/${dataBaseName}`,{ useNewUrlParser: true });

module.exports = { mongoose };
