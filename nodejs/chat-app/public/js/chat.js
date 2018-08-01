(function(){
    var socket = io();

    socket.on("connect", function(){
        console.log("Connected to server");
    });

    socket.on("newMessage", function(data){
        console.log("New message", JSON.stringify(data, undefined, 2));
    });

    socket.emit("createMessage", {
        "from" : "monterom334@gmail.com",
        "text" : "Some message",
        "subject" : "Learning"
    });

    socket.on("disconnect", function(){
        console.log("Disconected from server.");
    });
}());