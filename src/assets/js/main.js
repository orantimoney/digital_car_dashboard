// Import all of Bootstrap's JS
import 'bootstrap';

import { io } from "socket.io-client";

const URL = "http://localhost:3000/";
const socket = io(URL, { autoConnect: true});




socket.on("mph", (mph) => {
    console.log(mph);
    document.getElementById('speed').innerText = mph;
    socket.emit("retrievespeed");
});

socket.on("retrievespeed", (mph) => {
    console.log(mph);
    document.getElementById('speed').innerText = mph;
});

socket.on("coolanttemp", (temp) => {
    console.log(temp);
    document.getElementById('cooltemp').innerText = temp + '°C';
});

socket.on("revcounter", (rpm) => {
    console.log(rpm);
    rpmpercent = 7000/rpm;
    document.getElementById("revbar").style.width = rpmpercent+"%";
});

socket.on("manipressure", (bar) => {
    console.log(bar);
    document.getElementById('manip').innerText = bar + ' BAR';
});


