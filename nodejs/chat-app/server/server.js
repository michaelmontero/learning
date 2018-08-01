const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const port = process.env.PORT || 3000;
const partialPath = path.join(__dirname,'../public');
const app = express();

const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(partialPath));

io.on("connection", (socket)=>{
    socket.emit("newEmail", {
        "from" : "monterom334@gmail.com",
        "text" : "Some message",
        "subject" : "Learning"
    });

    socket.on("createMessage",(message)=>{
        console.log("New message is comming", JSON.stringify(message, undefined, 2));
    });

    socket.on("newMessage",(message)=>{
        console.log(JSON.stringify(message, undefined, 2));
    });

    io.on("disconnect",(socket)=>{
        console.log("Disconected");
    });
});

server.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});