(function(){
    var socket = io();

    socket.on("connect", function(){
        console.log("Connected to server");
    });

    socket.on("newMessage", function(data){
        var formattedTime = moment(data.createAt).format("h:mm a");
        
        var list = $("<li></li>");
        list.text(`${data.from} ${formattedTime}: ${data.text} `);
        console.log(data)
        $("#messages").append(list);
    });

    socket.on("newLocation", function(data){
        var list = $("<li></li>");
        var formattedTime = moment(data.createAt).format("h:mm a");
        var a = $(`<a target="_blank">My current location</a>`);
        list.text(`${data.from}: ${formattedTime}`);
        a.attr("href", data.url);
        list.append(a);
        $("#messages").append(list);
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