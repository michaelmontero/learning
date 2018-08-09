var generateMessage = (from, text) =>{
    return {
        from,
        text,
        createAt : new Date().getTime()
    }
};

var generateLocationMessage = (from, cords) =>{
    return {
        from,
        url : `http://www.google.com/maps/?q=${cords.latitude},${cords.longitude}`,
        createAt : new Date().getTime()
    }
};

module.exports = {generateMessage,generateLocationMessage};