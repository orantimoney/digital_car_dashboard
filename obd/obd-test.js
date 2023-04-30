var OBDReader = require('./obd.js');
var btOBDReader = new OBDReader();
var dataReceivedMarker = {};

btOBDReader.on('connected', function () {
   // this.requestValueByName("vss"); //vss = vehicle speed sensor

    this.addPoller("vss");
    this.addPoller("rpm");
    this.addPoller("temp");
    this.addPoller("load_pct");
    this.addPoller("map");

    this.startPolling(1000); //Request all values each second.
});

btOBDReader.on('dataReceived', function (data) {
    console.log(data);
    console.log('test');
    dataReceivedMarker = data;
});

// Use first device with 'obd' in the name
btOBDReader.autoconnect('VEEPEAK');
