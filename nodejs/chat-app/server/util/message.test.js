const expect = require("expect");
var {generateMessage} = require("./message");

describe("generateMessage", ()=>{
    if("Should generate a message object", ()=>{
        var from = "Michael";
        var text = "Some ramdon text";
        var message =  generateMessage(from, text);

        expect(message.createAt).toBe("number");
        expect(message).toInclude({from, text});
    });
});