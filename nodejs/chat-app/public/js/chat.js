(function(){
    var socket = io();

    socket.on("connect", function(){
        console.log("Connected to server");
    });

    socket.on("newMessage", function(data){
            var list = jQuery("<li></li>");
            list.text(`${data.from}: ${data.text}`);
            jQuery("#message-list").append(list);
    });

    jQuery("#button-send").click(function(e){
        e.preventDefault();
        socket.emit("createMessage", {
            "from" : "User 1",
            "text" : jQuery("#message-text").val()
        },function(data){
            console.log(`From server ${data}`);
        });
    })
    

    socket.on("disconnect", function(){
        console.log("Disconected from server.");
    });

}());