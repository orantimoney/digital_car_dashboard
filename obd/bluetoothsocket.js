
const obd = require("./bluetoothconnection.js");
const winston = require("winston");
const noble = require("@abandonware/noble");

var logger = new winston.createLogger({
    transports: [
        new (winston.transports.Console)()
    ]
});
winston.format.cli(logger);


noble.on("stateChange", function(state) {
    winston.info("BLE state changed", {state});
    if ('poweredOn' === state) {
        winston.info("BLE start scanning for new devices");
        noble.startScanning(['fc3414b5e7eb075ac0f13b16dfafadf6']);
        setTimeout(() => {
            winston.info("BLE stop scanning for new devices");
            noble.stopScanning();
        }, 10 * 1000);
    }
});

noble.on("discover", function(peripheral) {
    var obdDevice = new obd.obd(peripheral);
    setInterval(() => {
        Promise.all([bulb.getName(), bulb.getColor(), bulb.getBrightness()]).then((data) => {
            console.log("bulb: name: " + data[0] + ", current color: " + data[1].current + ", target color: " + data[1].target + ", current brightness: " + data[2]);
        }).catch(e => {
            winston.error(e);
        });
    }, 1000 * 2);
});