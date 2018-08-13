var moment = require("moment");

var generateMessage = (from, text) =>{
    return {
        from,
        text,
        createAt : moment().valueOf()
    }
};

var generateLocationMessage = (from, cords) =>{
    return {
        from,
        url : `http://www.google.com/maps/?q=${cords.latitude},${cords.longitude}`,
        createAt : moment().valueOf()
    }
};

module.exports = {generateMessage,generateLocationMessage};