const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear" , () => {
    return new Date().getFullYear();
});
hbs.registerHelper("capitalizeHelper", (text)=> {
    return text.toUpperCase();
});

app.use((req, res,next)=>{
    var now = new Date().toString();
    var text = `Request url: ${req.url}-Method: ${req.method}-Time: ${now}`;
    fs.appendFileSync("serve.log", text + "\n");
    next();
});

// app.use((req, res, next) =>{
//   res.render("maintance.hbs");
// });

app.use(express.static(__dirname + '/public'));

var data = {
  title : "Some title",
}

app.get("/", (req, res) => {
  res.render("home.hbs",data);
});

app.get("/about", (req, res) =>{
    res.render("about.hbs",data);
});

app.listen(7878, ()=>{
  console.log("Server running on port 7878");
});
