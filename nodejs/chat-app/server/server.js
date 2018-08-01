const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;
const partialPath = path.join(__dirname,'../public');
const app = express();

app.use(express.static(partialPath));

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});