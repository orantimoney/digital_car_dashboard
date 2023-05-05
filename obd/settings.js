var fs = require('fs');
var http = require("http");
var socket_io = require("socket.io");
var httpServer = (0, http.createServer)();

var io = new socket_io.Server(httpServer, {
    cors: {
        origin: '*'
    }
});

httpServer.listen(3000);

console.log('test');

io.on("connection", function (socket) {
    console.log("connection established")
});

io.on("settingsChange", (outputJson) => {
    console.log(outputJson);
    fs.writeFile(__dirname + "/../config-test2.json", outputJson , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
});
