var Emitter = require("events");

var emitter = new Emitter();
emitter.on("save", ()=>{
    console.log("Document saved");
});

emitter.emit("save");