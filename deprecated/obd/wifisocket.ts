var net = require('net');

var connection = new net.Socket();
connection.connect(35000, '192.168.0.10', function() {
  console.log('Connected');
})

connection.on('data', function(data){
  console.log(data.toString());
})

connection.on('close', function(){
  console.log('connection closed');
})

//coolant temp
connection.write('0105\r\n');
//intake manifold pressure
connection.write('010B\r\n');
//engine speed (revs)
connection.write('010C\r\n');
//vehicle speed (mph/kph)
connection.write('010D\r\n');