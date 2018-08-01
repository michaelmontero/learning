var generateMessage = (from, text) =>{
    return {
        from,
        text,
        createAt : new Date().getDate()
    }
};

module.exports = {generateMessage};