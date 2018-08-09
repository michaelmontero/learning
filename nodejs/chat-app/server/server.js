const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const {generateMessage} = require("./util/message");

const port = process.env.PORT || 3000;
const partialPath = path.join(__dirname,'../public');
const app = express();

const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(partialPath));

io.on("connection", (socket)=>{

    socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app"));

    socket.broadcast.emit("newMessage", generateMessage("Admin","New user has joined"));
    
    socket.on("createMessage",(message)=>{
        console.log("createMessage", message);
        io.emit("newMessage", generateMessage(message.from, message.text));
    });

    socket.on("disconnect",()=>{
        console.log("User disconected");
    });
});

server.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});