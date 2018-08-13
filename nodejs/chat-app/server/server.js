const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage, generateLocationMessage} = require("./util/message");

const partialPath = path.join(__dirname,'../public');
app.use(express.static(partialPath));

io.on("connection", (socket)=>{

    socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app"));

    //Welcome message
    socket.broadcast.emit("newMessage", generateMessage("Admin","New user has joined"));
    
    socket.on("createMessage",(message, callback)=>{
        message = generateMessage(message.from, message.text);
        io.emit("newMessage", message);
        callback(0);
    });

    socket.on("createLocationMessage", (coords)=>{
        io.emit("newLocation",generateLocationMessage("Admin",coords));
    });

    socket.on("disconnect",()=>{
        socket.broadcast.emit("newMessage", generateMessage("Admin","User has left"));
    });
});

server.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});