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

    socket.emit("newMessage", {
        from : "Admin",
        text : "Welcome to the chat app"
    });

    socket.broadcast.emit("newMessage", {
        from : "Admin",
        text : "New user has joined",
        "createdAt" : new Date().getTime()
    });
    
    socket.on("disconnect",()=>{
        console.log("User disconected");
    });
});

server.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});