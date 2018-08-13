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

    socket.on("newLocation", function(data){
        var list = jQuery("<li></li>");
        var a = jQuery(`<a target="_blank">My current location</a>`);
        list.text(`${data.from}: `);
        a.attr("href", data.url);
        list.append(a);
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
    });    

    socket.on("disconnect", function(){
        console.log("Disconected from server.");
    });

    var locationButton = jQuery("#send-location");
    locationButton.click(()=>{
        if(!navigator.geolocation){
            return alert("Novigation is not supported in you browser");
        }
        navigator.geolocation.getCurrentPosition((position)=>{            
            socket.emit("createLocationMessage", {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
        }, (err)=>{
            alert("Enable to fetch location");
        });
    });
}());