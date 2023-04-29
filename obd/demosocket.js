"use strict";
exports.__esModule = true;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*'
    }
});
httpServer.listen(3000);
io.on("connection", function (socket) {
    var mph = Math.random() * 30;
    socket.emit("mph", mph);
    socket.emit("test", mph);
});
io.on("retrievespeed", function (socket) {
    var mph = 29;
    socket.emit("retrievespeed", mph);
});
var i = 0;
setInterval(function () {
    if (i > 100)
        i = 0;
    i++;
    var mph = Math.random() * 120;
    mph = Math.round(mph);
    io.emit("mph", mph);
    var temp = Math.random() * 30;
    temp = Math.round(temp);
    io.emit('coolanttemp', temp);
    var rpm = Math.random() * 6000;
    rpm = Math.round(rpm);
    io.emit('revcounter', rpm);
    var manipressure = Math.random() * 3;
    manipressure = Math.round(manipressure * 10) / 10;
    io.emit('manipressure', manipressure);
}, 1000);
