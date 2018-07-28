var mongoose = require("mongoose");

const dataBaseName = "Todo";
const url = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(url,{ useNewUrlParser: true });

module.exports = { mongoose };
