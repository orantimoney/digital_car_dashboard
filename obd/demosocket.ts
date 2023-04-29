import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

httpServer.listen(3000);

io.on("connection", (socket) => {
    var mph = Math.random()*30;
    socket.emit("mph", mph);
    socket.emit("test", mph);
});

io.on("retrievespeed", (socket) => {
  var mph = 29;
  socket.emit("retrievespeed", mph);
});

var i = 0;
setInterval(function() {
  if (i >100)
      i = 0;
      i++;
      var mph = Math.random()*30;
      mph = Math.round(mph);
      io.emit("retrievespeed", mph);

      var temp = Math.random()*30;
      temp = Math.round(temp);
      io.emit('coolanttemp', temp);

      var rpm = Math.random()*7000;
      rpm = Math.round(rpm);
      io.emit('revcounter', rpm);

      var manipressure = Math.random()*3
      manipressure = Math.round(manipressure * 10) / 10;
      io.emit('manipressure', manipressure);
},100);



