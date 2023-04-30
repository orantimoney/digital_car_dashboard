// Device name VEEPEAK - for demonstration purposes

var noble = require('@abandonware/noble');
const obd = require("./bluetoothconnection.js");
const Queue = require("promise-queue");
const { allowedNodeEnvironmentFlags } = require('process');
const Obd = require('./bluetoothconnection.js');
noble.startScanning([], true);

var serviceUUIDs = [];
var allowDuplicates = false;

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(serviceUUIDs, allowDuplicates);
    console.log("Powered On")
  } else {
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
          var carScanner = new Obd(peripheral);
          console.log(carScanner.getRPM());
        });
      }
      

      peripheral.on('disconnect', function() {
        console.log("Peripheral disconnected");
        process.exit(0);
      });
    
    });
  
