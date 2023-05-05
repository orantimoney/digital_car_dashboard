import fs from 'fs';

import 'bootstrap';

import { io } from "socket.io-client";

const URL = "http://localhost:3000/";
const socket = io(URL, { autoConnect: true});

import datatest from '../../.././config.json';
console.log(datatest.hostname);
datatest.hostname = 'test';

const config = fs.readFileSync(__dirname + '/../../../config.json', 'utf8');

console.log(JSON.parse(config));

var data = JSON.parse(config);

console.log(data.hostname);
console.log(data.devicename);
console.log(data.connectiontype);

document.getElementById('hostname').value = data.hostname;
document.getElementById('devicename').value = data.devicename;
document.getElementById('connectiontype').value = data.connectiontype;

const form = document.getElementById("settings");
document.getElementById("sddt").addEventListener("click", submit());

socket.on("connection", function (socket) {
    console.log('connected');
    var hostname = document.getElementById('hostname').value;
    var devicename = document.getElementById('devicename').value;
    var connectiontype = document.getElementById('connectiontype').value;

    var outputJson = {
        "hostname": hostname,
        "devicename": devicename,
        "connectiontype": connectiontype
    };

    socket.emit('settingsChange', outputJson);
});

function submit(){
    console.log('submission');
    var hostname = document.getElementById('hostname').value;
    var devicename = document.getElementById('devicename').value;
    var connectiontype = document.getElementById('connectiontype').value;

    var outputJson = {
        "hostname": hostname,
        "devicename": devicename,
        "connectiontype": connectiontype
    };

    socket.emit('settingsChange', outputJson);
        
}