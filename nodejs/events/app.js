var Emitter = require("./emiter");

var emitter = new Emitter();
emitter.on("save", ()=>{
    console.log("Document saved");
});

emitter.emit("save");