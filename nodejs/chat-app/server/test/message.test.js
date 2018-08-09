const expect = require("expect");
var {generateMessage} = require("./../util/message");

describe("generateMessage", ()=>{
    it("Should generate a message object", () => {
        var from = "Michael";
        var text = "Some ramdon text";
        var message =  generateMessage(from, text);

        expect(message.createAt).toBeAn("number");
        expect(message).toInclude({from, text});
    });
});