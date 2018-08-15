(function(){
    var socket = io();

    function scrollToBottom(){
        var messages = $("#messages");
        var newMessage = messages.children("li:last-child");

        var clientHeight = messages.prop("clientHeight");
        var scrollTop = messages.prop("scrollTop");
        var scrollHeight = messages.prop("scrollHeight");

        var messageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();

        if(clientHeight  + messageHeight + lastMessageHeight + scrollTop >= scrollHeight){
            messages.scrollTop(scrollHeight);
        }
    }

    socket.on("connect", function(){
        console.log("Connected to server");
    });

    socket.on("newMessage", function(data){
        data.createAt = moment(data.createAt).format("h:mm a");
        var template = $("#message-template").html();
        var html = Mustache.render(template, data);
        $("#messages").append(html);
        scrollToBottom();
    });

    socket.on("newLocation", function(data){
        data.createAt = moment(data.createAt).format("h:mm a");
        var template = $("#location-template").html();
        var html = Mustache.render(template, data);
        $("#messages").append(html);
        scrollToBottom();
    });

    $("#button-send").click(function(e){
        e.preventDefault();
        var messageText = $("#message-text");
        socket.emit("createMessage", {
            "from" : "User 1",
            "text" : messageText.val()
        },function(data){
            messageText.val("");
        });
    });    

    socket.on("disconnect", function(){
        console.log("Disconected from server.");
    });

    var locationButton = $("#send-location");
    locationButton.click(()=>{        
        if(!navigator.geolocation){
            return alert("Novigation is not supported in you browser");
        }
        locationButton.prop("disabled", "disabled").text("Sending location...");
        navigator.geolocation.getCurrentPosition((position)=>{            
            socket.emit("createLocationMessage", {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
            locationButton.removeAttr("disabled").text("Send location");
        }, (err)=>{
            locationButton.removeAttr("disabled").text("Send location");
            alert("Enable to fetch location");
        });
    });
}());