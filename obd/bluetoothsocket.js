var noble = require('@abandonware/noble');
const { allowedNodeEnvironmentFlags } = require('process');
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

console.log(serviceUUIDs);

noble.on('scanStart', ()=>console.log("Scanning started"))
noble.on('scanStop', ()=>console.log("Scanning stopped"))

noble.on('discover', function(peripheral) {
    console.log("Discovered something!");

    
    
      console.log('peripheral with ID ' + peripheral.id + ' found');
      console.log(peripheral.address);
      var advertisement = peripheral.advertisement;
      console.log(JSON.stringify(advertisement));
  
      peripheral.on('disconnect', function() {
        console.log("Peripheral disconnected");
        process.exit(0);
      });
  
      peripheral.on('connect', ()=>console.log("Peripheral connected"));
    
      peripheral.connect(function(error) {
        peripheral.discoverServices("a0521000-2a63-479e-9d0a-09dfa7c8fd98",()=>console.log("Service discovered"));
  
      });
    });
  
