var OBDReader = require('./obd.js');
var btOBDReader = new OBDReader();
var dataReceivedMarker = {};

var http = require("http");
var socket_io = require("socket.io");
var httpServer = (0, http.createServer)();
var fs = require('fs')

var io = new socket_io.Server(httpServer, {
    cors: {
        origin: '*'
    }
});

httpServer.listen(3000);

var date = new Date();

var logs = fs.createWriteStream('../logs/' + 'test.txt' , {flags: 'a'});


btOBDReader.on('connected', function () {

    this.addPoller("vss") // vehicle speed in km/h;
    this.addPoller("rpm");
    this.addPoller("temp");
    this.addPoller("map");

    this.startPolling(1000); //Request all values each second.
});

const mphConversionCoefficient = 1.609; // divide km/h by 1.609 for mph
const kpatoBarCoefficient = 100 // 100 kpa = 1 bar

btOBDReader.on('dataReceived', function (data) {
    dataReceivedMarker = data;
	date = new Date();
	data['date'] = date;
	console.log(data);
 	var json = JSON.stringify(data);
	logs.write(json + "");

    switch (data['name']) {
    case("vss"):
        io.emit("mph", data["value"]/mphConversionCoefficient);
        return
    case("rpm"):
        io.emit("rpm", data["value"]);
        return
    case("temp"):
        io.emit("coolanttemp", data["value"]);
        return;
    case("map"):
        io.emit("manipressure", data["value"]/kpatoBarCoefficient)
        return
    default:
        console.log('invalid headers!');
        return
    }
});

// Use first device with 'obd' in the name
btOBDReader.autoconnect('VEEPEAK');
