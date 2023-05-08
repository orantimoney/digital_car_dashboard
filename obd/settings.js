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

io.on('connection', (socket) => {

  socket.on('settings', (outputJson) => {
    console.log('\n\n\n\n\n TEST');
    
    outputJson = JSON.stringify(outputJson);
    fs.writeFile(__dirname + "/../config.json", outputJson , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
});

});