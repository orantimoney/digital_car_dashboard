// Device name VEEPEAK - for demonstration purposes

var noble = require('@abandonware/noble');
const Queue = require("promise-queue");
const { allowedNodeEnvironmentFlags } = require('process');
noble.startScanning([], true);

var serviceUUIDs = [];
var allowDuplicates = false;
var found = false;

noble.on('stateChange', function(state) {
  if (state === 'poweredOn' && found == false) {
    noble.startScanning(serviceUUIDs, allowDuplicates);
    console.log("Powered On")
  } else if (found = false) {
    noble.stopScanning();
    console.log("Powered Off")
  }
});

noble.on('scanStart', ()=>console.log("Scanning started"))
noble.on('scanStop', ()=>console.log("Scanning stopped"))

noble.on('discover', function(peripheral) {
    console.log("\n\nDiscovered something!");


      console.log('\nperipheral with ID ' + peripheral.id + ' found');
      var advertisement = peripheral.advertisement;
      console.log(advertisement);

      if(advertisement.localName == 'VEEPEAK') {
        console.log('\n\n\n FOUND ********* \n\n\n')
        noble.stopScanning();
        peripheral.connect(function(device) {
<<<<<<< Updated upstream
          btSerialConnection = new(require('bluetooth-serial-port')).BluetoothSerialPort();
	  found = true;
=======
>>>>>>> Stashed changes
        });
      }

      peripheral.on('disconnect', function() {
        console.log("Peripheral disconnected");
        process.exit(0);
      });
    });
